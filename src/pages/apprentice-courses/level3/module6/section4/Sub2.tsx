/**
 * Module 6 · Section 4 · Subsection 2 — Reference Methods (A–G and 100–103)
 * Maps to C&G 2365-03 / Unit 305 / LO2 / AC 2.5
 *   AC 2.5 — "Assess and select suitable wiring systems and equipment appropriate to the situation and use"
 * Layered: 2366-03 Unit 304 / AC 4.2; 5393-03 Unit 104 / AC 4.2
 *
 * The methods catalogue. What each Reference Method actually describes,
 * where each one is used in real installations, and how to pick the right
 * one (or pick the worst one, when a single cable crosses multiple
 * environments).
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
  'Reference Methods A–G and 100–103 (4.2) | Level 3 Module 6.4.2 | Elec-Mate';
const DESCRIPTION =
  'The BS 7671 install-method catalogue. Methods A through G for everyday wiring, Methods 100–103 for cables in thermal insulation. Practical examples for each, and the worst-section-governs rule for cables that cross multiple environments.';

const checks = [
  {
    id: 'method-c-vs-b',
    question:
      "A 70 °C T&E radial is clipped direct to the joists in a ceiling void with the joists on edge. Which Reference Method applies?",
    options: [
      'Method A — single insulated conductor enclosed in conduit in a thermally insulated wall.',
      'Method B — multi-core cable enclosed in conduit or trunking on a wall.',
      'Method 102 — cable embedded in thermal insulation on more than one face.',
      'Method C — clipped direct to a non-metallic surface in still air.',
    ],
    correctIndex: 3,
    explanation:
      "Joists with the cable clipped to them and air around the cable is a textbook Method C install — single layer, free convection on three sides, the timber joist providing only minor heat-sinking. Method 102 would only apply if loft insulation were laid touching the cable on one side. Method A and B both require an enclosure.",
  },
  {
    id: 'method-100-pick',
    question:
      "A 1.5 mm² lighting circuit runs across a loft floor totally buried in 200 mm of mineral-wool insulation for the entire run. Which method applies?",
    options: [
      'Method 103 — cable totally enclosed in thermal insulation, length 0.5 m or longer.',
      'Method 101 — cable surrounded by thermal insulation, length 0.5 m or longer.',
      'Method 102 — cable on one side of a thermally insulated wall.',
      'Method 100 — cable surrounded by thermal insulation, length under 0.5 m.',
    ],
    correctIndex: 0,
    explanation:
      "Method 103 covers cables totally enclosed in thermal insulation for runs of 0.5 m or longer — the most punishing of the four insulation methods because the cable cannot shed heat in any direction. Method 100 is for short total enclosures (under 0.5 m). Method 101 is for cables in contact with insulation on one face. Method 102 is for cables embedded in insulation on more than one face but not totally enclosed.",
  },
  {
    id: 'worst-section',
    question:
      'A 25 m circuit has 22 m clipped direct (Method C, It ≈ 47 A at 6 mm²) and 3 m totally buried in loft insulation (Method 103, It ≈ 29 A at 6 mm²). The required tabulated It for the cable selection comes from which method?',
    options: [
      'Method C — the longest section governs, so the 22 m clipped-direct portion sets the tabulated It.',
      'An average of the two methods weighted by length — (22 × 47 + 3 × 29) / 25 ≈ 44.8 A.',
      'Method 103 — the worst section governs because the cable will reach its temperature limit there first.',
      'Whichever method gives the lower derate factor when Ca and Cg are also applied along each section.',
    ],
    correctIndex: 2,
    explanation:
      "The worst section always governs. The cable can only be as good as its hottest point — if the 3 m in insulation hits 70 °C, the cable is at its temperature limit even though the rest of the run has loads of headroom. You either size the entire run on Method 103 (here, that pushes you up to 16 mm²) or you re-engineer the install to remove the insulation contact (clear a channel, ventilate, re-route).",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "How many Reference Methods does BS 7671 Appendix 4 actually publish in everyday use, and what is the structural division between A–G and 100–103?",
    options: [
      "A through G are for single-phase circuits and 100–103 are for three-phase circuits, reflecting the different heat each produces.",
      "A through G cover non-insulation install methods (clipped, in conduit, in trunking, in cable tray, buried, free air); 100–103 cover the cases where the cable is in thermal insulation. The two families exist because in-insulation derating is built into the tabulated value rather than applied as a separate Ci.",
      "A through G are for thermoplastic cables and 100–103 are for thermosetting cables, because the two insulation types dissipate heat differently.",
      "A through G are the everyday domestic methods and 100–103 are the industrial high-current methods for cables above 35 mm².",
    ],
    correctAnswer: 1,
    explanation:
      "Methods A–G describe the everyday non-insulation cases and rely on Ca / Cg / Ci being applied separately. Methods 100–103 cover cables in thermal insulation — the in-insulation derate is folded into the tabulated value so you do not double-count Ci. The split is structural: pick from A–G if the cable is not sat in insulation; pick from 100–103 if it is.",
  },
  {
    id: 2,
    question: "Method A in BS 7671 Appendix 4 describes which install configuration?",
    options: [
      "Multi-core cable clipped direct to a non-metallic surface in still air.",
      "Multi-core cable on a perforated cable tray with free air circulation on all sides.",
      "A single insulated conductor in conduit in a thermally insulated wall.",
      "Cable direct-buried in the ground in contact with the surrounding soil.",
    ],
    correctAnswer: 2,
    explanation:
      "Method A: single insulated conductor in conduit in a thermally insulated wall — the worst of the conduit-in-wall cases because the wall insulation reduces heat dissipation. Used for boxed-out commercial walls, plasterboard partitions with insulation, and any conduit run buried in masonry that has been overclad with insulation.",
  },
  {
    id: 3,
    question: "Method C describes which install?",
    options: [
      'A single insulated conductor enclosed in conduit in a thermally insulated wall.',
      'Multi-core cable totally enclosed in thermal insulation for the full run.',
      'Cable installed in a duct buried in the ground with soil-resistivity correction.',
      'Multi-core cables clipped direct to a non-metallic surface in still air.',
    ],
    correctAnswer: 3,
    explanation:
      "Method C: multi-core cables clipped direct to a non-metallic surface (timber joist, plasterboard, plaster wall) in still air. The bread-and-butter domestic install for T&E. Higher CCC than Methods A or B because the cable can convect freely on most of its surface.",
  },
  {
    id: 4,
    question:
      'Method E is for cables installed in free air. Why does it generally give a higher tabulated CCC than Method C, even for the same cable?',
    options: [
      "Method E (cable on a cable ladder, single-layer, with at least one cable diameter spacing) allows free convection on all sides, which is more efficient cooling than Method C's clipped-against-a-surface arrangement.",
      "A poor power factor increases current draw for the same real power, causing overheating in cables and equipment, increased losses, higher electricity costs from reactive power charges, and may indicate failing capacitors that need replacement during maintenance",
      "Allows third-party devices and energy management systems to access real-time energy consumption data from the smart meter via the ZigBee Home Area Network — enabling automated energy management, tariff optimisation and demand-side response",
      "The installation uses a TN-S earthing arrangement with a separate neutral and earth, requiring the neutral to be switched along with the three phases to prevent neutral current circulating between sources",
    ],
    correctAnswer: 0,
    explanation:
      "Method E is the most efficient cooling environment in the everyday catalogue — spaced single-layer on a ladder or perforated tray, with air free to circulate around the entire cable surface. Method C ties the cable to a wall or joist, which removes one face from convective cooling. The thermal headroom difference shows up as a higher It value in Method E.",
  },
  {
    id: 5,
    question:
      "Method 102 in BS 7671 Appendix 4 covers which install?",
    options: [
      'Emotional exhaustion impairs concentration, cynicism reduces teamwork and communication, and reduced efficacy leads to poor decision-making — all increasing safety risks',
      'Cable in contact with a thermally conductive wall on one face, with insulation on more than one other face but not totally enclosed.',
      'A knowledge test, a practical assessment, and a professional discussion supported by a portfolio of evidence',
      'To check that the arrangements set out in the construction phase plan are being implemented, that risks are being controlled, and to identify areas for improvement',
    ],
    correctAnswer: 1,
    explanation:
      "Method 102 covers the partial-enclosure case — cable embedded in insulation on more than one face but not totally surrounded. Common in modern construction where T&E sits in studwork between layers of mineral wool, with air space at the top and bottom of the run. It derates between Method 101 and Method 103, reflecting the partial heat-shedding capacity.",
  },
  {
    id: 6,
    question:
      "A cable runs through three different environments along its length. The CCC calc must use:",
    options: [
      'The Reference Method of the longest section, weighting the others by their length.',
      'The Reference Method of the section nearest the protective device, where fault current is highest.',
      'The Reference Method of the worst section — the section with the lowest tabulated CCC.',
      'An average of all three Reference Methods, since the cable shares heat along its whole length.',
    ],
    correctAnswer: 2,
    explanation:
      "Worst section governs. Cables fail at their hottest point first — if any section of the run cannot dissipate heat fast enough at the design current, the entire cable is non-compliant. You must size for the worst install method on the route.",
  },
  {
    id: 7,
    question:
      "A 6 mm² T&E with tabulated It = 47 A in Method C drops to It ≈ 29 A in Method 103. The percentage reduction tells you what about cables in thermal insulation?",
    options: [
      "Thermal insulation actually improves CCC by protecting the cable from ambient temperature swings — the reduction is a rounding artefact in the tables.",
      "The reduction applies only to the short section in insulation, so the rest of the cable still carries the full 47 A.",
      "Burying a cable in insulation roughly doubles its CCC because the surrounding material spreads the heat over a larger area.",
      "Burying a cable in insulation removes about 38 percent of its CCC because heat cannot escape — the same conductor with the same insulation cooks at much lower current.",
    ],
    correctAnswer: 3,
    explanation:
      "Total enclosure in thermal insulation reduces effective heat dissipation dramatically — the air gap that would normally allow convection is replaced by a layer that is specifically designed to resist heat flow. The CCC drops by roughly a third to a half depending on CSA. That is why Method 103 is the most punishing column in the table and the most common driver of size-up decisions.",
  },
  {
    id: 8,
    question:
      "When sizing a sub-main on SWA (Steel Wire Armoured) cable buried in the ground, which Reference Method and which additional correction factor apply?",
    options: [
      "Method D (direct buried) or method C if in a duct, plus a soil-thermal-resistivity correction factor from Table 4B3.",
      "Method E (free air), because the armour dissipates heat as effectively as open air regardless of burial.",
      "Method C (clipped direct), with no additional correction because the soil keeps the cable cool.",
      "Method 103 (in thermal insulation), because buried soil behaves thermally like loft insulation.",
    ],
    correctAnswer: 0,
    explanation:
      "Buried SWA uses Method D (direct contact with soil) or a duct method (typically Method C with a duct correction). Soil thermal resistivity varies with soil type and moisture; BS 7671 Table 4B3 publishes the correction. Damp clay carries heat better than dry sand, so the same cable buried in clay carries more current than the same cable buried in sand.",
  },
];

const faqs = [
  {
    question: "Why does BS 7671 not just publish one number for each cable and stop messing about with methods?",
    answer:
      "Because heat dissipation is install-dependent and a single number would have to assume the worst case to be safe — which would massively over-size the cable for the easy cases. Methods exist so the table can give you the real CCC for the real install, not a one-size-fits-all bottom line. The price you pay is having to pick the right method; the saving is everywhere from 20 percent CSA on a Method E install to a CSA bracket on a Method C install.",
  },
  {
    question: "What is the difference between Method 100 and Method 103 — they both involve total enclosure in insulation?",
    answer:
      "Length. Method 100 covers very short total enclosures (under 0.5 m) — the kind of brief excursion through an insulated wall plate where the surrounding cable can still help cool the embedded section. Method 103 covers total enclosures of 0.5 m or longer, where the embedded section is on its own thermally and has to cope with the full heat output. The CCC difference is meaningful: a brief enclosure derates only slightly; a long enclosure derates hard.",
  },
  {
    question: "How do I tell Method B from Method E in a commercial trunking install?",
    answer:
      "Method B is single conductors in trunking or conduit, where the trunking limits the air available for convection. Method E is single-layer cables on a perforated cable tray or ladder with at least one cable diameter spacing between cables and the support — free air all around. If the trunking lid is on and the cable bundle fills more than 45 percent of the trunking cross-section, you are firmly in Method B. If the cables are spaced on an open ladder with a clear view of the ceiling, you are in Method E. The difference is one full CSA bracket on a busy circuit.",
  },
  {
    question: "Does the worst-section rule apply to grouping (Cg) as well as to install methods?",
    answer:
      "Yes. If a cable is grouped with five others for 10 m and then runs alone for 30 m, the Cg from the 10 m grouped section governs the entire calc — because the cable’s temperature in the grouped section is what sets its operating-temperature ceiling. There is a small relaxation in BS 7671 (Note 14, Appendix 4 §5.1) for very brief grouping (under about a metre), but the principle is the same as for install methods: the cable can only be as good as its hottest point.",
  },
  {
    question: "Where does the 'in conduit in a thermally insulated wall' Method A actually show up on real jobs?",
    answer:
      "Plasterboard partitions on commercial fit-outs, modern timber-frame house builds with conduit chased into the studs, and any retrofit where conduit has been buried in masonry that the customer has subsequently insulated externally. It is more common than apprentices realise — the giveaway is conduit you cannot easily see because it is plastered or boarded over, with insulation on the cold side. Method A is conservative and the right pick for those installs.",
  },
  {
    question: "Can I use Method E figures for a cable that I have just spaced from a wall with proprietary cleats?",
    answer:
      "Only if the cleats actually space the cable at least one cable diameter from the wall, and the cable is in still air with no thermal enclosure. Most domestic wall cleats hold the cable too close to the wall to qualify — you are usually still in Method C territory. Method E in BS 7671 has tight geometric requirements: spacing, ventilation, single layer. If you cannot demonstrably meet all three, do not claim the Method E CCC values.",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 6 · Section 4 · Subsection 2"
            title="Reference Methods A–G and 100–103"
            description="The BS 7671 install-method catalogue. Methods A through G for cable in conduit, in trunking, on tray, clipped or in free air; Methods 100–103 for cable in thermal insulation. Practical examples for each, plus the worst-section-governs rule that decides the calc when a single cable crosses two or three environments."
            tone="cyan"
          />

          <TLDR
            points={[
              'BS 7671 Appendix 4 splits cable install configurations into two families: Methods A–G for everyday non-insulation cases (clipped, in conduit, in trunking, on tray, in free air, buried) and Methods 100–103 for cables in thermal insulation. The two families exist because in-insulation derating is built into the table value rather than applied as a separate factor.',
              'Each method has tight geometric requirements — you do not get to pick the most generous method just because the cable is roughly in that configuration. Method E demands single-layer with spacing; Method C demands free convection on at least three faces. Misclassify the install and the CCC you read is wrong.',
              'When a single cable crosses multiple environments — typical of any loft / void / wall route — the worst section governs the calc. The cable can only be as good as its hottest point.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the Reference Method that applies to each section of a cable run, using the BS 7671 Appendix 4 catalogue.",
              "Distinguish between Methods A–G (non-insulation) and Methods 100–103 (in thermal insulation), and apply the correct correction-factor regime for each.",
              "Apply the worst-section-governs rule to cables that cross multiple environments along their length.",
              "Recognise the tight geometric requirements for each method (spacing for Method E, free convection for Method C, conduit fill for Method B) and decline to use a method when those requirements are not met.",
              "Pick the Reference Method that matches the cable family being used (thermoplastic vs thermosetting, multi-core vs single-core) and read the matching column of the relevant Appendix 4 table.",
              "Recognise when re-engineering the install (re-routing, ventilating, removing insulation contact) is a cheaper and safer fix than sizing up the cable to satisfy a worst-method derate.",
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="Why Reference Methods exist at all"
            plainEnglish="Heat escapes from a cable at different rates depending on what surrounds it. Sat in still air on a tray, heat leaves easily and the cable can carry a lot of current. Buried in mineral wool with no air movement, heat barely leaves and the same cable cooks. Reference Methods are the formal catalogue of these install configurations."
            onSite="The method you pick is the single biggest factor in the CCC you end up with — a 6 mm² T&E in Method E carries roughly twice what the same cable carries in Method 103. Get the method right and the calc resolves cleanly; get it wrong and you are either over-engineering or risking an install that ages prematurely."
          >
            <p>
              When you read a column of Appendix 4 Table 4D5, the It value is the answer to a specific question: at the reference ambient of 30 °C, with the cable installed in this exact configuration, what is the maximum continuous current that brings the conductor to its insulation-temperature limit. Different configurations dissipate heat differently, so different methods give different It values for the same cable.
            </p>
            <p>
              The classification matters because heat-dissipation modelling is intricate — the IEC committees that produce these values run heat-balance calculations that account for cable geometry, surrounding-medium thermal conductivity, convective and radiative cooling, and any thermal coupling between adjacent cables. Each Reference Method is the result of one such calculation. There is no universal safe CCC; only CCC for a given install.
            </p>
            <p>
              The standard publishes around a dozen methods (A through G in the everyday catalogue, plus 100–103 for thermal insulation cases, plus a few specialised methods for buried cables and free air). For the L3 designer, the workload is to pick the right method for each section of each circuit and apply the matching column.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 523.1 (Installation methods and reference methods)"
            clause="The current-carrying capacity of conductors shall be determined by reference to the installation method, the insulation type and the ambient temperature, in accordance with the appropriate tables of Appendix 4 or by another method giving equivalent safety."
            meaning={
              <>
                Reg 523.1 makes the use of Appendix 4 (or an equivalent) mandatory for CCC
                determination. Equivalent safety opens the door to manufacturer data
                or specialist software for non-standard cables, but for everyday work the
                Appendix 4 / OSG route is what an inspector expects to see in the design
                paperwork. The Reference Method is part of the calc you must record.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 523.1; methods catalogue in Appendix 4."
          />

          <SectionRule />

          <ContentEyebrow>The non-insulation methods (A–G)</ContentEyebrow>

          <ConceptBlock
            title="Method A — single conductor in conduit in a thermally insulated wall"
            plainEnglish="A conduit chased into a wall that has insulation behind it. The insulation is not touching the cable directly, but it is reducing the wall’s ability to act as a heat sink."
            onSite="Common in modern timber-frame houses and commercial fit-outs where conduit runs in studwork and the studwork is filled with mineral wool. The conduit isolates the cable mechanically; the wall insulation isolates it thermally. Both effects derate the CCC."
          >
            <p>
              Geometry: a single insulated conductor (or a small group of conductors) inside a conduit that is itself buried in or against an insulated wall. Heat dissipation is limited because:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>The conduit walls trap a layer of still air around the cable.</li>
              <li>The wall insulation prevents heat reaching the room beyond.</li>
              <li>The cable cannot convect into open air at any point.</li>
            </ul>
            <p>
              Result: among the lowest CCC of any method for the same cable. Used wherever conduit is concealed in insulated construction — typical commercial fit-out walls and modern domestic stud partitions.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Method B — single conductor in conduit on a wall"
            plainEnglish="A conduit clipped to a wall in the open. Air can move around the conduit, the wall acts as a partial heat sink, but the conduit still traps still air around the cable."
            onSite="Surface conduit on a workshop wall, plant-room walls with steel galvanised conduit, any commercial install where the cable is not concealed but is in a conduit. More common than Method A on industrial work."
          >
            <p>
              Geometry: single insulated conductors in a conduit clipped to a wall in the open. The wall provides one face of heat-sinking; the conduit’s outer surface convects freely into the room air. CCC is higher than Method A but lower than Method C (clipped direct) because the conduit’s trapped air still adds a thermal layer between the cable and the room.
            </p>
            <p>
              Watch the conduit fill. BS 7671 Method B implicitly assumes the conduit is not packed full of cables — if you have stuffed eight singles into a 20 mm conduit, the spacing factor is exceeded and you are no longer at Method B CCC. The cables are in effect grouped within the conduit and you must apply Cg on top.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Method C — multi-core cable clipped direct to a non-metallic surface"
            plainEnglish="The bread-and-butter domestic install. T&E clipped to joists or to plasterboard with the cable hanging in still air, free to convect on most of its surface. Roughly the highest CCC you get without going to Method E or free air."
            onSite="The default for any T&E run that is not concealed in insulation. If your cable is clipped to a timber joist with no mineral wool packed against it, you are in Method C. Read the Method C column of Table 4D5."
          >
            <p>
              Geometry: a multi-core cable clipped direct to a non-metallic surface (timber joist, plasterboard, plaster) in still air. The surface is non-metallic so it does not function as a meaningful heat sink, and the cable is in open air on at least three of four faces.
            </p>
            <p>
              Method C is the dominant install method on domestic final circuits. A typical T&E radial in a loft is Method C for any section that is not buried in insulation; an extension to that radial that runs in the wall cavity (clipped to studs in still air) is also Method C; a sub-main from a CU to a tail-fed garage that is clipped to a brick wall outside is Method C as well.
            </p>
            <p>
              The cable must genuinely be in still air for Method C to apply. If the cable is sat in a wall cavity that is filled with insulation around it, you have moved to Method 102 or 103. If the cable is clipped to a metallic surface (e.g. a steel beam or a metal-clad surface), you have moved to a different effective method that BS 7671 sometimes treats more generously and sometimes more conservatively depending on the metal’s thermal mass.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Method E — cable in free air, single layer, with spacing"
            plainEnglish="Cable on a perforated tray or ladder with air free to circulate on all sides and at least one cable diameter of space between cables. The most efficient cooling configuration in the everyday catalogue — the highest CCC."
            onSite="Industrial cable tray installs, commercial plant-room cable runs, sub-mains routed through ceiling voids on ladder. The CCC uplift over Method C is meaningful, sometimes a CSA bracket. Worth pursuing on long runs where copper cost matters."
          >
            <p>
              Geometry requirements (and they are tight):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single-layer install — cables not stacked.</li>
              <li>Spacing of at least one cable diameter between adjacent cables.</li>
              <li>Tray or ladder must be perforated (so air can rise through it from below).</li>
              <li>Cable in still air — no enclosure, no thermal coupling to a wall.</li>
            </ul>
            <p>
              Miss any one of those and you are no longer in Method E. Stack the cables — you are grouped, Cg applies. Run them touching — grouping again. Lay them on a solid sheet rather than perforated tray — cooling is reduced and the CCC drops.
            </p>
            <p>
              On commercial designs, Method E is often the cheapest way to size a sub-main — a 70 mm² thermosetting four-core in Method E carries appreciably more than the same cable in Method C, sometimes enough to drop a bracket and save real money on copper. The trade-off is the install: a perforated ladder with proper spacing is more labour and more material than a clipped run.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Method D — buried cable (direct or in duct)"
            plainEnglish="Cable below ground, either in direct contact with soil or pulled through a duct. Soil is a moderate thermal conductor; a duct adds an air gap and reduces effective cooling slightly."
            onSite="Sub-mains to outbuildings, garden EV chargers on a buried SWA, supplies to lighting bollards. The soil-thermal-resistivity correction factor (Table 4B3) is part of this method — a damp clay site supports more current than a dry sandy one."
          >
            <p>
              Geometry: cable buried at the standard reference depth (usually 0.7 m for direct burial; 0.6 m for duct) in soil of standard thermal resistivity (2.5 K·m/W is the BS 7671 reference). The tabulated CCC values assume those conditions; corrections are applied for non-standard depth, non-standard resistivity, or grouped buried cables.
            </p>
            <p>
              Damp clay has thermal resistivity around 1.0 K·m/W (carries heat better than the reference) so the correction is above 1.0 — you can carry more current. Dry sand can hit 3.0 K·m/W (worse than the reference) and the correction goes below 1.0. BS 7671 Table 4B3 gives the values, and good practice is to do a soil thermal-resistivity test before designing any large buried sub-main, especially on new-build sites where the topsoil has been disturbed.
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

          <ContentEyebrow>The thermal-insulation methods (100–103)</ContentEyebrow>

          <ConceptBlock
            title="Methods 100–103 — the four flavours of in-insulation install"
            plainEnglish="Once a cable touches loft mineral wool, cavity-fill foam, or any thermally insulating material, it cannot dissipate heat the same way. BS 7671 publishes four insulation-specific methods (100, 101, 102, 103) covering the spectrum from brief contact to total enclosure."
            onSite="Modern building regs push insulation everywhere, and the cable runs nearly always cross at least one insulated zone. Reading the right Method 100–103 column is the difference between an install that lasts decades and one that ages out in five to seven years."
          >
            <p>
              The four methods cover increasing degrees of thermal isolation:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Method 100</strong> — cable totally surrounded by thermal insulation for a length under 0.5 m. The brief excursion case: a cable that pops through an insulated wall plate, or briefly traverses an insulated zone before re-emerging into clear air. Derate is modest because the surrounding cable in clear air helps cool the embedded section by conduction along the conductor.
              </li>
              <li>
                <strong>Method 101</strong> — cable in contact with a thermally insulated wall on one face, the other face in clear air. Common where T&E sits against the back of a stud cavity insulation board with the room face of the cavity vented or boarded but not insulated. Derate is meaningful but moderate — the cable can still convect on three faces.
              </li>
              <li>
                <strong>Method 102</strong> — cable embedded in insulation on more than one face (typically two or three faces) but not totally enclosed. The everyday partial-fill case: T&E in a stud wall sat between layers of mineral wool, with air gaps top and bottom. Derate is significant.
              </li>
              <li>
                <strong>Method 103</strong> — cable totally enclosed in thermal insulation for a length of 0.5 m or longer. The worst case: full burial in loft mineral wool, full encapsulation in foam-filled cavities, or full surround by spray-foam insulation. Derate is brutal — typically 35–50 percent of the Method C value for the same cable.
              </li>
            </ul>
            <p>
              <strong>Critical:</strong> the Ci correction for thermal insulation is built into the tabulated It values for Methods 100–103. You do <em>not</em> apply Ci as a separate multiplier on top — that would double-count the derate and over-engineer the cable. Pick the method, read the column, apply only Ca and Cg from there.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Appendix 4, Section 5.4 (Cables installed in thermal insulation)"
            clause="Where a cable is installed in or surrounded by thermal insulation, the current-carrying capacity shall be reduced. For Methods 100, 101, 102 and 103, the reduction is incorporated in the tabulated values; Ci shall not be applied separately. Where the cable is in contact with thermal insulation but not addressed by these methods, Ci shall be derived from the rating of the cable installation method using the principles of Section 5."
            meaning={
              <>
                The standard is unambiguous: if you have picked a Method 100–103 column,
                the in-insulation derate is already in the number, so do not apply Ci on top.
                If the install is unusual and not covered by the four methods (e.g. cable
                touching insulation only on one short section of a longer run), the standard
                lets you derive a custom Ci from first principles — but for the everyday
                cases, picking the right method is the entire job.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Appendix 4 §5.4; tabulated values in Tables 4D5, 4E5 etc."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Worst section governs</ContentEyebrow>

          <ConceptBlock
            title="When a single cable crosses multiple environments"
            plainEnglish="Real cable runs hardly ever stay in one Reference Method end to end. Out of the CU — Method B (in trunking). Through the wall — Method A (conduit in insulated wall). Across the loft — Method C (clipped direct) for most of it, with 3 m in Method 103 (loft insulation) where the route crosses the eaves. The CCC calc must size for the worst section, end of."
            onSite="Picture the route as a series of sections, each with its own method. List the It at your candidate CSA in each method. The smallest It across the route is the one that governs. Often the way to upsize the cable is to re-engineer the worst section rather than buy a bigger conductor."
          >
            <p>
              The principle is thermal: a cable’s steady-state temperature in any section is set by the heat-balance in <em>that section</em>, not the average across the run. If the 3 m loft-insulation section reaches 70 °C while the rest of the run is sat at 50 °C, the cable as a whole is at its operating-temperature limit — the rest of the run’s headroom does not help.
            </p>
            <p>
              Mechanically, the rule means you must walk the route on site (or read the survey carefully), identify every change of install method, and pick the one that gives the lowest tabulated It at your candidate CSA. That is the column you take into the calc.
            </p>
            <p>
              The reverse is also true: if you can re-engineer the worst section out of the run, the calc resolves at a smaller CSA. Clear a 3 m channel through the loft insulation so the cable runs in clear air and the entire calc moves from Method 103 to Method C, often saving a CSA bracket. The labour cost of clearing the channel is usually less than the material cost of the larger cable, plus the heavier glands and terminations it brings.
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
            source="BS 7671:2018+A4:2026 — Appendix 4, Section 5.1 (General notes on the use of correction factors)"
            clause="Where, throughout the run of a cable, the conditions of installation vary, the rating shall be determined for the most onerous conditions encountered, taking account of the disposition of cables in the most onerous section."
            meaning={
              <>
                This is the verbatim worst-section-governs rule. The standard puts it in
                Section 5.1 of Appendix 4 because it applies universally — to install
                methods, to grouping, to ambient temperatures. Wherever a cable’s
                conditions vary along its length, the calc must be done for the worst
                conditions. Inspectors will look for evidence in the design paperwork that
                you actually walked the route and identified the worst section, especially
                on installs where loft insulation, sub-floor voids or external runs are
                involved.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Appendix 4, Section 5.1."
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Calling a tray-mounted cable Method E without checking the spacing"
            whatHappens={
              <>
                The drawing says &quot;ladder rack, single layer&quot; and the apprentice reads
                Method E off the table. On site the cables end up touching each other, single layer
                but no spacing, and on a warm summer afternoon two of the bunched cables are
                already running at the cable’s temperature limit. The CCC the calc claimed is
                15–20 percent above what the install actually delivers — and the cable
                ages prematurely.
              </>
            }
            doInstead={
              <>
                Method E demands at least one cable diameter spacing between cables on the tray,
                a perforated ladder or tray (not a solid sheet), and free air all around the run.
                If the tray is solid, the cables are touching, or the run is in a tight ceiling
                void with no air movement, you are not in Method E — you are in Method C with
                grouping (Cg) on top. Always validate the geometry against the table’s
                geometric requirements before reading the column.
              </>
            }
          />

          <Scenario
            title="A 60 m sub-main route hits Method 103 for the last 4 m"
            situation={
              <>
                You are designing a 100 A sub-main from a domestic CU to a detached garage 60 m
                away. The route is mostly external SWA clipped to a fence (Method E, generous
                CCC) and then enters the garage through a wall plate that the customer has just
                had spray-foamed. The last 4 m of the run is totally enclosed in spray foam —
                Method 103 territory. At 100 A the SWA you specced for Method E is borderline;
                the same SWA in Method 103 fails the calc by 12 A.
              </>
            }
            whatToDo={
              <>
                Two engineering options. (1) Re-size the entire 60 m run to satisfy Method 103
                across that 4 m section — expensive, because the bigger cable also drives
                bigger glands, bigger terminations and a heavier pull. (2) Re-engineer the 4 m
                so it is no longer Method 103: clear a sleeve through the spray foam, run the
                cable in conduit with an air gap, or re-route the wall entry to a non-foamed
                area. Option 2 is almost always cheaper and gives a better install. Document
                the design choice and the install detail on the cable schedule.
              </>
            }
            whyItMatters={
              <>
                Modern building regulations are pushing more and more thermal insulation into
                the building envelope, and electricians are increasingly meeting Method 103
                conditions on routes that historically would have been Method C all the way.
                The rule of thumb: any cable that crosses an insulated envelope wall will
                spend a few metres in Method 102 or 103. Plan for it at design stage rather
                than discover it on site.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 Appendix 4 publishes Reference Methods A–G for everyday non-insulation install configurations and Methods 100–103 for cables in thermal insulation. The two families have different correction-factor regimes — Methods 100–103 build the in-insulation derate into the tabulated It value, so you never apply Ci on top.',
              'Method C (clipped direct, multi-core, non-metallic surface, still air) is the dominant install method for domestic T&E final circuits. Method E (single layer on perforated ladder with spacing) is the most generous CCC in the catalogue — used on commercial sub-mains where copper cost matters.',
              'Methods 100, 101, 102 and 103 cover increasing degrees of thermal isolation. Method 103 (total enclosure for runs of 0.5 m or longer) is the most punishing — typical CCC reduction is 35–50 percent versus Method C for the same cable.',
              'Each method has tight geometric requirements that must actually be met on site. Method E demands single-layer with one cable diameter spacing on perforated tray; Method C demands free convection on three faces. Misclassification gives the wrong CCC.',
              'When a cable crosses multiple environments along its route, the worst section governs the calc. The cable can only be as good as its hottest point — you must size for the section with the lowest tabulated It.',
              'Re-engineering the worst section (clearing a channel through insulation, re-routing around a hot zone, ventilating a ceiling void) is often cheaper than sizing up the entire cable. Look for those opportunities at design stage.',
              'Soil thermal resistivity affects buried cables (Method D) significantly. Damp clay supports more current than dry sand. BS 7671 Table 4B3 publishes the correction factors; on serious buried sub-mains, get the soil tested.',
            ]}
          />

          <Quiz title="Reference Methods — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section4-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.1 Current-carrying capacity
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section4-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.3 Correction factors Ca, Cg, Ci
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
