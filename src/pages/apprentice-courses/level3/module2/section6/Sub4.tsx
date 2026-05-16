/**
 * Module 2 · Section 6 · Subsection 4 — Environmental Product Declarations, cable mfr disclosures, recycled content
 * City & Guilds 2365-03 / Unit 301 / Sustainable working practices
 *
 * Layered depth: 2357 Unit 602 ELTK02 / LO3 supplementary — environmental product information,
 * EN 15804 framework for construction product EPDs, BS EN 50625 series for cable recycling,
 * and the rising disclosure expectations from BREEAM, LEED and the UK Net-Zero Carbon Buildings
 * Standard for embodied carbon in electrical materials.
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
  'EPDs, cable disclosures and recycled content (6.4) | Level 3 Module 2.6.4 | Elec-Mate';
const DESCRIPTION =
  'Environmental Product Declarations under EN 15804, BS EN 50625 cable recycling standards, and how cable manufacturer environmental disclosures inform specification on BREEAM and net-zero projects. The data behind embodied carbon, recycled content and end-of-life recyclability for the materials an electrician orders every day.';

const checks = [
  {
    id: 'l3-m2-s6-sub4-epd-purpose',
    question:
      "A specification on a BREEAM Excellent commercial fit-out asks for cables and accessories with EPDs verified to EN 15804. What does that mean and why does the specifier care?",
    options: [
      "It means the products must be made from recycled material only.",
      "An Environmental Product Declaration (EPD) is a standardised, third-party-verified document that quantifies the life-cycle environmental impacts of a construction product across a defined set of indicators (global warming potential, ozone depletion, acidification, eutrophication, abiotic resource depletion, water use and several others). EN 15804 is the European standard that sets the methodology, scope rules and reporting format. The specifier wants EPD-backed products because the BREEAM Mat 01 credit (and similar credits in LEED, WELL and the UK Net-Zero Carbon Buildings Standard) award points for products with verified third-party EPDs that allow embodied-carbon comparisons across alternatives.",
      "It is a manufacturer marketing badge with no technical meaning.",
      "It is a UK-specific term that does not apply post-Brexit.",
    ],
    correctIndex: 1,
    explanation:
      "EPDs are the construction industry's standardised environmental data sheet. EN 15804 sets the methodology so that an EPD from one manufacturer can be compared like-for-like with an EPD from another. The specifier on a BREEAM project needs the data because the credit scoring depends on quantitative comparisons across the bill of materials. As an electrician you do not produce the EPD but you do need to know what is being asked when a spec calls for EPD-backed cable or accessories.",
  },
  {
    id: 'l3-m2-s6-sub4-recycled-copper',
    question:
      "A cable manufacturer claims their installation cable contains 60% recycled copper. What does that figure actually tell you, and what does it not?",
    options: [
      "It tells you the cable is 60% lighter than virgin-copper cable.",
      "It tells you that 60% of the copper mass in the conductor came from recycled (post-consumer or post-industrial) copper feedstock rather than primary mined copper. Recycled copper carries roughly 15-20% of the embodied carbon of primary copper because the energy-intensive smelting from ore is avoided. What it does not tell you is the recycled content of the insulation polymer, the bedding, the sheath, the steel armour or the drum packaging. A complete environmental picture needs the full EPD, not just one headline number.",
      "It tells you the cable will only last 60% as long.",
      "It tells you the cable has 60% lower copper conductivity.",
    ],
    correctIndex: 1,
    explanation:
      "Recycled content is one of the most useful single environmental metrics for cable because copper smelting from ore is one of the most energy-intensive steps in the cable life cycle. A 60% recycled-copper conductor carries materially lower embodied carbon than a 100% primary-copper equivalent. But conductor is not the whole cable — the polymer sheath, the steel armour, the packaging all carry their own embodied carbon. The right document is the EPD because it covers the whole product, not just the headline conductor.",
  },
  {
    id: 'l3-m2-s6-sub4-cable-recycling',
    question:
      "What does BS EN 50625 cover and why does it matter to a contractor stripping out old cable on a refurbishment?",
    options: [
      "It is the cable rating standard for fire-protected conditions.",
      "BS EN 50625 is a series of European standards covering the collection, logistics, treatment and recycling of waste electrical and electronic equipment, including the WEEE-specific cable streams that come out of strip-out work. It defines best-practice processes for recovering copper, aluminium and polymer fractions from waste cable while minimising emissions of regulated substances. Specifying a BS EN 50625 compliant recycling route for stripped-out cable feeds into the BREEAM Wst credits, satisfies the waste hierarchy duty under regulation 12, and protects the contractor against accusations of routing cable to substandard processors that simply burn the polymer to recover the copper.",
      "It is a UK-only standard with no European equivalent.",
      "It only applies to fibre-optic cable.",
    ],
    correctIndex: 1,
    explanation:
      "Cable recycling has historically been a problem area because the cheapest way to separate copper from PVC sheath is open burning, which is illegal in the EU and UK but happens in unregulated jurisdictions to which UK waste cable can be exported. BS EN 50625 sets the European best-practice standard for compliant recycling. Routing your strip-out cable through a BS EN 50625 compliant processor is the simplest defence against the cable ending up at an open-burning site overseas.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is an Environmental Product Declaration (EPD) and what standard governs its preparation in the construction sector?",
    options: [
      "A product warranty document.",
      "An EPD is a standardised, third-party-verified document that quantifies the life-cycle environmental impacts of a construction product across a defined set of indicators. EN 15804 (in the UK retained as BS EN 15804+A2) is the European standard that sets the methodology, scope rules, indicator list and reporting format for construction product EPDs. EPDs are prepared under a Product Category Rule (PCR) for the product type and are verified by an independent third party before publication.",
      "A safety data sheet.",
      "A test certificate for product compliance.",
    ],
    correctAnswer: 1,
    explanation:
      "EN 15804 is the methodology backbone for construction product EPDs across Europe and the UK. The same product family (e.g. installation cable) has a single Product Category Rule which all manufacturers follow, allowing direct comparison between competing products. EPDs are typically valid for five years and are publicly available through programme operators like EPD International, IBU, INIES and the UK Build Carbon Neutral platform.",
  },
  {
    id: 2,
    question:
      "Which life-cycle stages does an EN 15804 EPD typically cover for a construction product like cable?",
    options: [
      "Manufacture only.",
      "The full life cycle is broken into modules: A1-A3 product stage (raw material supply, transport to factory, manufacturing); A4-A5 construction stage (transport to site, installation); B1-B7 use stage (use, maintenance, repair, replacement, refurbishment, operational energy and water use); C1-C4 end-of-life stage (deconstruction, transport, waste processing, disposal); and D benefits and loads beyond the system boundary (recycling and recovery beyond end of life). Different EPDs cover different module sets — A1-A3 cradle-to-gate is the most common minimum; A1-C4 plus D is the most complete cradle-to-grave with recycling credits.",
      "Use stage only.",
      "Disposal stage only.",
    ],
    correctAnswer: 1,
    explanation:
      "The modular structure lets specifiers compare products at the same scope. A cable EPD that only covers A1-A3 (manufacturing) cannot be directly compared with a competitor EPD that covers A1-C4 plus D (full life cycle). Reading the scope before reading the headline number is the key skill. BREEAM Mat 01 typically requires at least cradle-to-gate (A1-A3) coverage and rewards higher coverage with more credits.",
  },
  {
    id: 3,
    question:
      "Why is recycled copper content the single most useful environmental metric for installation cable?",
    options: [
      "It is not particularly useful.",
      "Because primary copper smelting from ore is one of the most energy-intensive industrial processes globally. Recycled copper requires roughly 15-20% of the energy of primary copper to produce, which translates to a corresponding reduction in embodied carbon for the conductor portion of the cable. Cable is overwhelmingly copper by mass (or aluminium for some larger sizes), so the conductor dominates the embodied carbon calculation. A high-recycled-content conductor is therefore one of the largest single levers for reducing cable embodied carbon at specification stage.",
      "Because copper recycling reduces conductor resistance.",
      "Because recycled copper is cheaper at point of sale.",
    ],
    correctAnswer: 1,
    explanation:
      "Conductor mass dominates cable embodied carbon, and copper smelting dominates conductor embodied carbon. Recycled copper short-circuits the smelting step and so delivers proportionally large embodied-carbon savings. Major UK cable manufacturers (Prysmian, Nexans, BICC, Doncaster Cables, AEI Cables) all now publish recycled-content figures and EPDs for their main installation cable lines. On a BREEAM project the cable specification will normally call out a minimum recycled content as well as an EPD.",
  },
  {
    id: 4,
    question:
      "What is a Product Category Rule (PCR) in the EPD framework?",
    options: [
      "A product safety standard.",
      "A PCR is a published rulebook that defines the methodology for preparing an EPD for a specific product category — for example installation cable, luminaires, switchgear or insulation. It specifies the functional unit (e.g. one metre of cable of given specification), the system boundary, the data requirements, the calculation methodology and the reporting format. All manufacturers preparing EPDs for that product category follow the same PCR, ensuring like-for-like comparability across competing products. PCRs are managed by EPD programme operators such as EPD International, IBU and INIES.",
      "A pricing rulebook.",
      "A regulatory permit.",
    ],
    correctAnswer: 1,
    explanation:
      "PCRs are what makes EPDs comparable. Without a PCR, every manufacturer would calculate things differently and the headline numbers would be meaningless. The PCR is essentially the recipe that all EPDs in a category must follow. Updates to PCRs (typically every five years) require all EPDs in scope to be re-issued, which is why some EPDs lapse and need refreshing.",
  },
  {
    id: 5,
    question:
      "Why does the BREEAM Mat 01 credit give weight to EPDs and how does that affect cable specification?",
    options: [
      "It does not give weight to EPDs.",
      "Mat 01 (Environmental impact of materials) awards points for using construction products with verified third-party EPDs because they enable life-cycle assessment of the building materials and so reward designers for choosing lower-impact options. On a target BREEAM rating (typically Very Good or Excellent on commercial UK projects) the Mat 01 credit can be the difference between achieving the rating and missing it. That feeds back into the cable spec — the specifier asks for EPD-backed cable from the wholesaler, the wholesaler asks the manufacturer, the manufacturer publishes EPDs to stay on tender lists. The market signal is real.",
      "It only applies to insulation, not cable.",
      "It is voluntary on BREEAM projects.",
    ],
    correctAnswer: 1,
    explanation:
      "BREEAM is the most widely used environmental certification scheme on UK commercial buildings. Mat 01 specifically rewards products with verified EPDs because they enable like-for-like comparison and embodied-carbon optimisation. The same principle applies in LEED (US/global) and the UK Net-Zero Carbon Buildings Standard. As an electrician you do not need to be a BREEAM assessor but you do need to recognise the spec call-outs and to source compliant cable from the wholesaler.",
  },
  {
    id: 6,
    question:
      "What does BS EN 50625 series cover and why is it the right reference for cable recycling on a strip-out project?",
    options: [
      "Cable installation methods only.",
      "BS EN 50625 is a series of European standards setting best-practice requirements for the collection, logistics, treatment and recycling of waste electrical and electronic equipment, including cable streams generated during strip-out and installation. It covers the de-pollution, separation and material recovery processes and sets emission limits to prevent illegal open-burning of cable to recover copper. Routing strip-out cable through a BS EN 50625 compliant recycler protects against the cable ending up in unregulated overseas burning operations and provides documented compliance with the waste hierarchy duty.",
      "Cable testing methods only.",
      "Only fibre-optic cable.",
    ],
    correctAnswer: 1,
    explanation:
      "The cable recycling supply chain has a chequered history because cheap copper recovery historically meant burning the PVC sheath off in open pits, releasing dioxins and other regulated substances. BS EN 50625 codifies the European best-practice alternative — mechanical separation, controlled treatment and proper material recovery. Asking the wholesaler or waste carrier to confirm BS EN 50625 compliance is the simplest specification check.",
  },
  {
    id: 7,
    question:
      "What is the difference between a manufacturer-specific EPD and an industry-average EPD?",
    options: [
      "There is no difference.",
      "A manufacturer-specific EPD reports the actual life-cycle impacts of a specific product manufactured at a specific factory by a specific producer. An industry-average EPD reports the average impacts across all members of an industry association making a similar product. Manufacturer-specific EPDs allow real comparison between competing products; industry-average EPDs only allow comparison between product categories. BREEAM gives more weight to manufacturer-specific EPDs because they reward producers that genuinely outperform their peers, not those that simply benefit from a category average.",
      "Industry-average EPDs are non-verifiable.",
      "Manufacturer-specific EPDs are voluntary, industry-average ones are mandatory.",
    ],
    correctAnswer: 1,
    explanation:
      "Manufacturer-specific EPDs are the gold standard for project specification because they reflect the actual product. Industry-average EPDs are useful for early-stage building life-cycle assessment when the actual products are not yet selected. The cable industry has a mix of both — major UK manufacturers publish manufacturer-specific EPDs for their core ranges; smaller manufacturers may rely on industry-average EPDs from trade associations. The spec normally distinguishes the two.",
  },
  {
    id: 8,
    question:
      "An apprentice asks the wholesaler for the EPD on a particular brand of meter tail. The wholesaler does not have one. What is the right next step?",
    options: [
      "Order the cable anyway and ignore the spec.",
      "Ask the manufacturer directly via their technical support or sustainability team — most major UK cable and accessory manufacturers publish EPDs on their website or supply on request. If the manufacturer does not publish an EPD for that product, that fact alone is relevant to the project specifier because the spec called for EPD-backed products. The right action is to flag the missing EPD to the project specifier and either source an EPD-backed equivalent from another manufacturer or request a written derogation from the spec. Documenting the search and the decision protects the contractor against later challenge.",
      "Throw the spec out and use whatever is in stock.",
      "Tell the customer EPDs are not required.",
    ],
    correctAnswer: 1,
    explanation:
      "Spec compliance is a real contractual obligation on a BREEAM or net-zero project. The right routine is: search for EPD, escalate to manufacturer, source equivalent from competitor if needed, document the decision. As an apprentice you will not run the procurement decision but you do need to know that EPD requests are routine, that EPDs are typically free to obtain, and that asking the question early prevents a much bigger problem at handover.",
  },
];

const faqs = [
  {
    question: "How long is an EN 15804 EPD valid for and what triggers a re-issue?",
    answer:
      "EPDs are typically valid for five years from publication, after which they must be re-verified or re-issued. A re-issue is also triggered by significant changes to the product (formulation change, new manufacturing site, material substitution) or by updates to the underlying Product Category Rule. Older EPDs continue to appear on manufacturer websites past their validity date — always check the issue and validity dates before relying on the data. Programme operator websites (EPD International, IBU, INIES, BRE Global) maintain authoritative lists of currently valid EPDs.",
  },
  {
    question: "What is the difference between embodied carbon and operational carbon?",
    answer:
      "Operational carbon is the CO2 emissions from energy consumed by a building during its operating life — heating, cooling, lighting, plant. Embodied carbon is the CO2 emissions from the manufacture, transport, installation, maintenance, replacement and end-of-life processing of all the materials in the building. As buildings have become more energy-efficient (lower operational carbon) and the grid has decarbonised, embodied carbon has risen as a proportion of whole-life carbon. The Royal Institute of British Architects (RIBA) and the UK Net-Zero Carbon Buildings Standard now require embodied carbon assessment on most large projects, and EPDs for the materials are the input data for that assessment.",
  },
  {
    question: "Where can I find EPDs for the cable I am about to install?",
    answer:
      "Three main routes. First, the cable manufacturer website — Prysmian, Nexans, BICC, Doncaster Cables, AEI Cables, Eland Cables and most major UK cable producers publish EPDs and sustainability data online. Second, the EPD programme operator websites — EPD International, IBU, INIES, BRE Global and the UK Build Carbon Neutral platform host searchable EPD libraries. Third, the wholesaler — major wholesalers (Edmundson, CEF, Rexel, Yesss, Newey and Eyre) increasingly publish EPDs alongside product data sheets on their commerce platforms and can supply EPDs on request for trade customers.",
  },
  {
    question: "Is recycled aluminium worth the same as recycled copper for embodied-carbon reduction?",
    answer:
      "Aluminium recycling delivers an even larger relative embodied-carbon saving than copper recycling — primary aluminium production from bauxite is the most energy-intensive metal smelting process and recycled aluminium uses roughly 5% of the energy of primary aluminium. So a high-recycled-content aluminium conductor cable can have very low embodied carbon for the conductor portion. Aluminium has different design considerations (lower conductivity, larger cross-sections, oxide film handling at terminations) but on larger sub-mains and SWA installations recycled-content aluminium is a documented embodied-carbon win on net-zero projects.",
  },
  {
    question: "Do small electrical accessories like sockets and switches need EPDs?",
    answer:
      "On BREEAM and net-zero specifications, increasingly yes — Mat 01 covers the whole bill of materials, not just structural materials. Major switchgear and accessory manufacturers (MK Electric, Schneider, Hager, Crabtree, Wylex, Contactum, Click Scolmore) now publish EPDs or environmental product information for their core ranges. Smaller manufacturers may not yet publish EPDs and that fact alone can affect tender outcomes on environmentally specified projects. The market is moving toward universal EPD publication driven by the BREEAM and net-zero specification routes.",
  },
  {
    question: "What is greenwashing in this context and how do I spot it?",
    answer:
      "Greenwashing in product environmental claims typically involves headline statements (eco-friendly, sustainable, green) without verifiable third-party evidence. The defence against greenwashing is the EPD itself — a verified EPD is a documented and standardised statement that can be checked against the underlying methodology. Key red flags: claims without an EPD reference, claims based on a single attribute (e.g. recycled content) without whole-product context, EPDs from non-recognised programme operators, expired EPDs presented as current, and EPDs that do not cover the modules implied by the marketing claim. The Competition and Markets Authority Green Claims Code is the UK regulatory backstop against misleading environmental claims.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6 · Subsection 4"
            title="EPDs, cable manufacturer disclosures and recycled content"
            description="Environmental Product Declarations under EN 15804, BS EN 50625 cable recycling standards, and how cable manufacturer environmental disclosures inform specification on BREEAM, LEED and net-zero projects. The verified data behind embodied carbon, recycled content and end-of-life recyclability for the materials an electrician orders every day."
            tone="emerald"
          />

          <TLDR
            points={[
              "An Environmental Product Declaration (EPD) is a standardised, third-party-verified document that quantifies a product life-cycle environmental impacts. EN 15804 is the European methodology standard for construction products.",
              "BREEAM Mat 01, LEED and the UK Net-Zero Carbon Buildings Standard all reward EPD-backed specification because EPDs enable like-for-like embodied-carbon comparison between competing products.",
              "Recycled copper carries roughly 15-20% of the embodied carbon of primary copper. Recycled aluminium carries roughly 5%. Conductor recycled content is one of the largest single levers on cable embodied carbon.",
              "BS EN 50625 series sets European best-practice standards for cable and WEEE recycling — the right reference to specify on strip-out projects to avoid cable ending up at unregulated overseas burning operations.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Define an Environmental Product Declaration (EPD) and explain the role of EN 15804 in construction product environmental disclosure.",
              "Identify the typical life-cycle modules (A1-A5, B1-B7, C1-C4, D) covered by a construction product EPD and recognise which modules a given EPD includes.",
              "Explain the relationship between recycled conductor content and embodied carbon for installation cable, and identify the dominant role of conductor mass in cable embodied carbon calculations.",
              "Recognise the BS EN 50625 series as the European best-practice standard for WEEE and cable recycling, and explain its role in protecting against illegal open-burning of cable for copper recovery.",
              "Distinguish manufacturer-specific from industry-average EPDs and explain why BREEAM and LEED give more weight to the former.",
              "Apply a structured approach to spotting greenwashing in product environmental claims, using the verified EPD as the underlying evidence base.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>EPDs — the construction-industry environmental data sheet</ContentEyebrow>

          <ConceptBlock
            title="EN 15804 — one methodology, comparable across every manufacturer"
            plainEnglish="An Environmental Product Declaration (EPD) is a standardised, third-party-verified document that quantifies the life-cycle environmental impacts of a construction product across a defined set of indicators — global warming potential, ozone depletion, acidification, eutrophication, abiotic resource depletion, water use and several others. EN 15804 (in the UK as BS EN 15804+A2) is the European standard that sets the methodology, the indicator list, the reporting format and the verification requirements. Every EPD published under EN 15804 is prepared in the same way, allowing direct numerical comparison between competing products."
            onSite="On a BREEAM, LEED or UK Net-Zero Carbon Buildings Standard project the spec will routinely call out EPD requirements for the major bill-of-materials items including cable, accessories, luminaires and switchgear. The contractor sources EPDs from the manufacturer (or from the wholesaler if they hold them) and supplies them with the project record documentation. As the apprentice you may be asked to source EPDs — knowing what they are, where to find them, and what to do if a supplier does not have one is part of the role on environmentally specified projects."
          >
            <p>
              The structure of a typical EN 15804 EPD:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Functional unit</strong> — the unit of measure the EPD applies to,
                e.g. one metre of installation cable of stated cross-sectional area, one
                square metre of insulation board, one luminaire of stated lumen output.
                EPD numbers are reported per functional unit.
              </li>
              <li>
                <strong>System boundary</strong> — the life-cycle modules covered,
                expressed as A1-A3 (cradle-to-gate), A1-A5 (cradle-to-handover), A1-C4
                (cradle-to-grave) or A1-C4 plus D (cradle-to-grave with recycling
                credits).
              </li>
              <li>
                <strong>Indicator results</strong> — quantitative values for each
                environmental indicator. Global warming potential (GWP) in kg CO2
                equivalent per functional unit is the headline figure most often quoted.
              </li>
              <li>
                <strong>Underlying data</strong> — the specific data sources used for
                each input (energy mix, transport assumptions, raw material data),
                disclosed for traceability.
              </li>
              <li>
                <strong>Verification statement</strong> — independent third-party
                verification confirming the EPD complies with EN 15804 and the relevant
                Product Category Rule. The verifier is named.
              </li>
              <li>
                <strong>Validity dates</strong> — issue date and expiry date (typically
                five years).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 15804:2012+A2:2019 — Sustainability of construction works — Environmental product declarations — Core rules for the product category of construction products"
            clause={
              <>
                BS EN 15804+A2 specifies the Core Rules for environmental product
                declarations for any construction product or service. It defines the
                indicators of environmental impact, the parameters and life-cycle stages
                to be reported, the rules for inventory data and the rules for third-party
                verification. EPDs developed in accordance with BS EN 15804+A2 are
                comparable when they cover the same functional unit, the same life-cycle
                stages and the same Product Category Rule.
              </>
            }
            meaning={
              <>
                EN 15804+A2 is the methodology backbone for every construction product
                EPD across Europe and the UK. The 2019 amendment (the +A2 part)
                significantly expanded the indicator list and tightened the comparability
                requirements, which is why older EPDs published under the original 2012
                version are gradually being replaced. As the spec consumer you should
                check that an EPD is published under +A2 (or later) for current
                specification compliance.
              </>
            }
            cite="Source: BS EN 15804:2012+A2:2019 (paraphrased); full text via BSI Knowledge or the British Standards online catalogue."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Cable manufacturer environmental disclosures</ContentEyebrow>

          <ConceptBlock
            title="Where cable embodied carbon comes from and how recycled content moves the needle"
            plainEnglish="Cable is overwhelmingly metal by mass — typically 70-90% copper or aluminium conductor depending on cross-section. The polymer insulation, sheath and bedding contribute the remainder. Steel armour adds significant mass on SWA cable. In an EN 15804 EPD for installation cable the conductor manufacturing dominates the embodied-carbon calculation because primary copper smelting from ore and primary aluminium smelting from bauxite are among the most energy-intensive industrial processes globally. Recycled copper requires roughly 15-20% of the energy of primary copper, and recycled aluminium roughly 5% of primary aluminium. So the recycled conductor content is the single largest lever on cable embodied carbon."
            onSite="On a BREEAM Excellent or net-zero project the cable spec will normally call out a minimum recycled-content figure as well as an EPD requirement. Major UK cable manufacturers including Prysmian, Nexans, BICC, Doncaster Cables, AEI Cables and Eland Cables now publish recycled-content figures and EPDs for their core installation cable lines. The wholesaler can normally supply both on request. As the apprentice you do not negotiate the spec but you do need to recognise the call-outs and source compliant cable from the wholesaler. Substituting a non-EPD or non-recycled-content cable for a spec-compliant one is a real contractual breach on a BREEAM project."
          >
            <p>
              Where the embodied carbon sits in a typical 6491X 2.5 mm singles cable:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Copper conductor</strong> — typically 70-80% of cable mass and
                60-70% of embodied carbon. Recycled-content conductor cuts this fraction
                substantially.
              </li>
              <li>
                <strong>PVC insulation</strong> — typically 20-30% of cable mass and
                15-25% of embodied carbon. Bio-based plasticisers and recycled-content PVC
                are emerging options on premium product lines.
              </li>
              <li>
                <strong>LSZH (low-smoke zero-halogen) variants</strong> — replace PVC with
                halogen-free polymers. Higher embodied carbon per kg of polymer in some
                LSZH grades but reduce in-fire toxic emissions and so are specified for
                escape routes and high-occupancy buildings under BS 7671 and the Building
                Regs Approved Document B.
              </li>
              <li>
                <strong>Steel armour (SWA)</strong> — adds significant mass on armoured
                cable. Recycled-content steel is well established and reduces this
                contribution.
              </li>
              <li>
                <strong>Cable drum</strong> — typically wood with steel reinforcement. The
                drum is reused or recycled by the manufacturer; included in EPD scope as
                packaging.
              </li>
              <li>
                <strong>Transport</strong> — from factory to wholesaler to site. Material
                density makes transport carbon a measurable but smaller contribution than
                conductor manufacturing. Electric and biofuel logistics are slowly cutting
                this fraction.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50625 series — Collection logistics treatment requirements for WEEE (Waste Electrical and Electronic Equipment)"
            clause={
              <>
                The BS EN 50625 series sets out best-practice requirements for the
                collection, logistics, de-pollution, treatment and recycling of waste
                electrical and electronic equipment, including cable streams generated in
                construction strip-out. It covers process emissions, recovery rates,
                quality of recovered fractions and prohibition of practices such as open
                burning of cable for copper recovery. Compliance is verified through
                independent audit against the standard.
              </>
            }
            meaning={
              <>
                BS EN 50625 is the European answer to a long-standing problem in the
                global cable recycling supply chain: the cheapest way to separate copper
                from PVC sheath has historically been open burning, which releases
                dioxins and other regulated substances and which UK and EU law prohibits.
                Some waste cable from UK sites has historically been exported to
                jurisdictions where open burning is unregulated. Specifying BS EN 50625
                compliance for cable recycling on strip-out projects is the most
                effective single check against this — a 50625 compliant recycler does
                mechanical separation and proper material recovery. Most major UK
                wholesalers and waste carriers can confirm 50625 compliance for the
                downstream recycling route.
              </>
            }
            cite="Source: BS EN 50625 series (paraphrased summary); full standards via BSI Knowledge or the British Standards online catalogue."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>From spec to install — the apprentice workflow</ContentEyebrow>

          <ConceptBlock
            title="Reading a sustainability spec call-out and acting on it"
            plainEnglish="On a BREEAM, LEED or UK Net-Zero Carbon Buildings Standard project the electrical spec will typically include a sustainability section calling out EPD requirements, recycled-content minimums, end-of-life recyclability targets and sometimes specific certification schemes. Reading the spec carefully at order stage is the difference between compliant procurement and an awkward derogation conversation at handover. The wholesaler is your first call for sourcing EPD-backed and recycled-content products; the manufacturer technical or sustainability team is the escalation route if the wholesaler cannot supply the documentation."
            onSite="A typical workflow on a BREEAM Excellent commercial fit-out: receive the cable take-off from the design pack, identify the spec-required EPD and recycled-content thresholds, place the order with the wholesaler specifying the requirements, receive the EPD pack from the wholesaler with the cable delivery, retain the EPD pack with the project record documentation, supply to the BREEAM assessor at the assessment stage. Where the wholesaler cannot supply the EPD or where the recycled-content figure falls short, escalate early to the project manager or M&E lead — most spec-required substitutions can be authorised quickly if requested early but become difficult to retro-fit at handover."
          >
            <p>
              The apprentice checklist for a sustainability-specified project:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Read the spec at order stage</strong> — note any EPD,
                recycled-content, BS EN 50625 or net-zero certification call-outs.
              </li>
              <li>
                <strong>Source from EPD-publishing manufacturers</strong> — major UK
                cable and accessory manufacturers publish EPDs on their websites or supply
                on request through the wholesaler.
              </li>
              <li>
                <strong>Check EPD validity</strong> — issue date and expiry date are on
                every EPD; older EPDs may be expired even if still hosted on a website.
              </li>
              <li>
                <strong>Check the EPD scope</strong> — confirm the modules covered (A1-A3
                cradle-to-gate, A1-C4 cradle-to-grave, etc.) match the spec
                requirements.
              </li>
              <li>
                <strong>Retain the EPDs</strong> — file with the project record
                documentation so they are available at BREEAM or net-zero assessment.
              </li>
              <li>
                <strong>Document substitutions in writing</strong> — if a spec-required
                product is not available, escalate to the project manager and document
                the substitution and the alternative EPD evidence in writing.
              </li>
              <li>
                <strong>Specify cable recycling route</strong> — for strip-out cable,
                confirm with the waste carrier or wholesaler that the downstream recycler
                holds BS EN 50625 compliance documentation.
              </li>
              <li>
                <strong>Avoid headline-claim substitutions</strong> — never substitute a
                non-EPD product because the manufacturer claim sounds similar; the
                BREEAM assessor wants the verified EPD, not the marketing copy.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Embodied carbon vs operational carbon</ContentEyebrow>

          <ConceptBlock
            title="Why embodied carbon now matters as much as operational carbon"
            plainEnglish="For most of the last forty years construction sustainability discussion has focused on operational carbon — the energy a building consumes during its working life. As buildings have become more energy-efficient (better insulation, better glazing, smarter controls, more efficient lighting and HVAC) and as the grid has decarbonised, operational carbon per square metre has fallen sharply. Embodied carbon — the carbon emitted in manufacturing, transporting, installing, maintaining and ultimately disposing of the building materials — has not fallen at the same rate, partly because materials production is harder to decarbonise than electricity generation. The result is that on a modern, well-insulated UK building the embodied carbon can equal or exceed the operational carbon over a 60-year life."
            onSite="For an electrical contractor this matters because cable, switchgear, luminaires and accessories all contribute to embodied carbon, and the choice of products at procurement stage is the largest single lever the contractor has on the project carbon footprint. The UK Net-Zero Carbon Buildings Standard (published in pilot form in 2024) explicitly addresses both operational and embodied carbon and requires whole-life carbon disclosure on most large new buildings. EPDs for the bill-of-materials items are the input data for the embodied carbon calculation. As the apprentice you will not run the calculation but you do need to source the EPDs and document the procurement so the calculation can be done correctly."
          >
            <p>
              How embodied and operational carbon split on a typical commercial UK
              building over a 60-year life:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Operational carbon (energy consumed in use)</strong> — typically
                40-60% of whole-life carbon on a modern Part L compliant building, down
                from 80-90% on a 1980s building. The fall is driven by better fabric,
                better controls and grid decarbonisation.
              </li>
              <li>
                <strong>Embodied carbon (materials and construction)</strong> —
                correspondingly risen to 40-60% of whole-life carbon. Concrete, steel
                and aluminium dominate; electrical materials are typically 5-15% of
                embodied carbon by mass and value.
              </li>
              <li>
                <strong>Maintenance and replacement</strong> — captured in modules B1-B5
                of the EN 15804 EPD framework. Lighting refurbishments, switchgear
                replacements and HVAC overhauls all carry embodied carbon that
                accumulates over the building life.
              </li>
              <li>
                <strong>End-of-life</strong> — captured in modules C1-C4. Recovery and
                recycling credits in module D partly offset the disposal carbon.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>EPD programme operators and where to find data</ContentEyebrow>

          <ConceptBlock
            title="Programme operators — the trusted libraries of EN 15804 EPDs"
            plainEnglish="EPDs are not published unilaterally by manufacturers — they are issued through programme operators that manage the underlying Product Category Rules, accredit the third-party verifiers, host the EPD libraries and provide the trust framework for the whole system. Major programme operators serving the UK construction sector include EPD International (Sweden), IBU (Germany), INIES (France), BRE Global EPD (UK) and the UK Build Carbon Neutral platform. Each operates a publicly searchable library of currently-valid EPDs. A spec call-out for an EN 15804 EPD will normally accept any EPD from any recognised programme operator."
            onSite="The wholesaler is the first port of call for EPDs on routine procurement. For specialist or larger items where the wholesaler does not hold the documentation, the manufacturer technical or sustainability team will supply the EPD on request. As a third-line approach the programme operator websites let you search by manufacturer name or product category to find current EPDs. The EPDs themselves are typically PDFs of 10-30 pages covering the methodology, the system boundary, the indicator results and the verification statement. Storing the EPDs alongside the project record documentation is part of the procurement compliance routine."
          >
            <p>
              Major EPD programme operators serving the UK construction sector:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EPD International (the International EPD System)</strong> —
                Sweden-based, the largest global programme operator, hosts EPDs from
                manufacturers worldwide. Searchable at environdec.com.
              </li>
              <li>
                <strong>IBU (Institut Bauen und Umwelt)</strong> — Germany-based, strong
                presence in European construction product EPDs.
              </li>
              <li>
                <strong>INIES</strong> — France-based, hosts the French national EPD
                database with significant European reach.
              </li>
              <li>
                <strong>BRE Global EPD</strong> — UK-based, operated by the Building
                Research Establishment, hosts EPDs prepared specifically for the UK
                construction context.
              </li>
              <li>
                <strong>UK Build Carbon Neutral</strong> — a UK-focused platform
                aggregating EPDs and embodied carbon data for the UK construction
                sector.
              </li>
              <li>
                <strong>UL Environment</strong> — North American programme operator,
                also accepted by some UK and global specifications.
              </li>
              <li>
                <strong>EPD Norge</strong> — Norway-based, mainly Nordic EPDs but
                accepted by EN 15804 specifications.
              </li>
            </ul>
            <p>
              All recognised programme operators follow EN 15804 and use accredited
              third-party verifiers. EPDs from any of them are accepted by BREEAM, LEED
              and the UK Net-Zero Carbon Buildings Standard provided they are current
              and cover the required modules.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The Green Claims Code and anti-greenwashing</ContentEyebrow>

          <ConceptBlock
            title="The CMA Green Claims Code — the UK regulatory backstop against greenwashing"
            plainEnglish="The Competition and Markets Authority (CMA) published the Green Claims Code in 2021 to address rising concerns about misleading environmental claims by businesses. The Code applies to any business making environmental claims to UK consumers and sets out six principles: claims must be truthful and accurate, must be clear and unambiguous, must not omit or hide material information, must compare like with like, must consider the full life cycle, and must be substantiated by evidence. The Code is enforceable through the Consumer Protection from Unfair Trading Regulations 2008. The Advertising Standards Authority enforces equivalent rules for advertising specifically. Both regulators have taken action against businesses for unsubstantiated green claims."
            onSite="For an electrical contractor or installer the Green Claims Code matters in two directions. First, when communicating with customers about the environmental performance of installed systems — claims like sustainable, eco-friendly or carbon-neutral need substantiation, normally via verified EPDs and authoritative emission factor data. Vague or unverifiable marketing claims expose the business to regulatory action. Second, when sourcing products — the Green Claims Code gives the buyer a structured basis for challenging supplier marketing claims that are not backed by EPDs or other verifiable evidence. The structured approach to evidence aligns naturally with EPD-backed procurement on BREEAM and net-zero projects."
          >
            <p>
              Common greenwashing patterns to watch for in supplier marketing material:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Vague language</strong> — sustainable, eco-friendly, green, low-
                impact without quantification or verification.
              </li>
              <li>
                <strong>Single-attribute claims</strong> — emphasis on one positive
                attribute (e.g. recycled content) without context for the whole product
                impact.
              </li>
              <li>
                <strong>Irrelevant claims</strong> — claims about attributes that are
                already legally required (e.g. lead-free for products that have been
                lead-free for 20 years under RoHS).
              </li>
              <li>
                <strong>False comparisons</strong> — comparison against a worst-case or
                outdated alternative rather than current best-in-class.
              </li>
              <li>
                <strong>Unverified third-party claims</strong> — references to
                certifications or schemes that do not exist or that the product is not
                actually certified to.
              </li>
              <li>
                <strong>Future commitments dressed as current performance</strong> —
                claims based on intentions or pilot programmes rather than current
                product performance.
              </li>
              <li>
                <strong>Hidden trade-offs</strong> — claims that emphasise one
                environmental benefit while omitting offsetting environmental costs.
              </li>
            </ul>
            <p>
              The defence against all of these is the same: require the EPD itself
              under EN 15804, check the issue date and module coverage, and treat
              marketing copy as supplementary rather than substitute evidence.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Recycled content and material flows in cable</ContentEyebrow>

          <ConceptBlock
            title="The cable industry recycled-content economy — and why it works"
            plainEnglish="Cable is one of the most recycled product categories in the construction sector, with established secondary copper and aluminium markets that have operated for decades. The economic logic is straightforward: copper at spot price is valuable enough that scrap copper is collected, sorted and remelted into new product without subsidy. Cable manufacturers buy recycled copper feedstock alongside primary copper from mines and smelters. The proportion of recycled feedstock varies by manufacturer and by product line, but figures of 30-70% recycled copper content in installation cable are now widely achievable and increasingly disclosed in EPDs and sustainability reports."
            onSite="On the install side this matters because the cable you take to scrap on a strip-out today re-enters the cable supply chain as recycled feedstock for new cable in the future. The closed-loop economy depends on installers actually segregating cable copper for scrap rather than putting it in skips. The financial incentive aligns with the environmental incentive — clean cable copper at scrap fetches close to spot price and offsets some of the disposal cost on the rest of the WEEE stream. Treating cable as a valuable material rather than as waste is both commercially smart and the lowest-friction way to support the circular economy in the trade."
          >
            <p>
              The cable copper recycled-content closed loop:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Strip-out</strong> — installer segregates cable copper at the
                strip-out, separates from sheath where worthwhile.
              </li>
              <li>
                <strong>Scrap merchant</strong> — Scrap Metal Dealers Act 2013
                registered dealer buys the copper, weighs and grades it.
              </li>
              <li>
                <strong>Secondary copper smelter</strong> — combines clean scrap with
                lower-grade scrap and remelts to deliver high-purity copper for
                manufacturing.
              </li>
              <li>
                <strong>Cable manufacturer</strong> — buys recycled and primary copper
                feedstock, draws and stranded into new conductor, extrudes new cable.
              </li>
              <li>
                <strong>Wholesaler distribution</strong> — new cable shipped through the
                wholesaler distribution network.
              </li>
              <li>
                <strong>Installer purchase</strong> — installer buys the new cable for
                the next install. The recycled fraction in the new cable came from
                strip-outs done years earlier across the trade.
              </li>
            </ul>
            <p>
              The closed loop is one of the rare examples in the construction sector
              where commercial incentive and environmental benefit fully align. The
              friction points are mostly downstream contamination — cable copper
              contaminated with steel armour or polymer that has not been cleanly
              separated lowers the grade and the price. Clean segregation at strip-out
              keeps the loop efficient.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The UK Net-Zero Carbon Buildings Standard</ContentEyebrow>

          <ConceptBlock
            title="The Net-Zero Carbon Buildings Standard — the rising spec on UK projects"
            plainEnglish="The UK Net-Zero Carbon Buildings Standard was published in pilot form in 2024 by a cross-industry coalition (UKGBC, RIBA, RICS, CIBSE, IStructE, BBP, BRE and others) to provide a single agreed UK definition of net-zero performance for buildings. The standard sets project-level limits on whole-life carbon (operational and embodied combined), benchmarked against an industry-agreed trajectory toward net-zero by 2050. Compliance requires verified embodied carbon assessment of all major building elements (including electrical and mechanical services), verified operational energy modelling, and ongoing in-use performance verification. EPDs for the bill-of-materials items are the input data for the embodied carbon assessment."
            onSite="For an electrical contractor the standard is reshaping the spec landscape on commercial and high-profile residential projects. Where a project targets compliance with the Net-Zero Carbon Buildings Standard the electrical spec will normally call for EPD-backed cable and accessories, recycled-content thresholds, end-of-life recyclability targets, and (in some cases) take-back commitments from the manufacturer. The procurement and documentation routine described in this subsection is exactly what the standard requires the contractor to evidence. Building familiarity with the standard now positions both the apprentice and the firm for the rising market expectation. The standard is technical and detailed but the contractor-facing implications boil down to one principle: source EPD-backed products and document the sourcing decisions."
          >
            <p>
              What the Net-Zero Carbon Buildings Standard requires that affects
              electrical contracting:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Embodied carbon assessment</strong> — verified life-cycle
                assessment of the building bill of materials, with EPDs as the input
                data. Electrical materials (cable, switchgear, luminaires, accessories)
                are included.
              </li>
              <li>
                <strong>Whole-life carbon limit</strong> — project-level upper limit on
                operational plus embodied carbon over a 60-year reference study
                period. The limit varies by building type and is benchmarked against
                the net-zero trajectory.
              </li>
              <li>
                <strong>Operational energy modelling</strong> — verified operational
                energy use, including the electrical loads (lighting, small power, EV
                charging, IT). The contractor controls the as-installed efficiency
                through specification and commissioning.
              </li>
              <li>
                <strong>In-use performance verification</strong> — actual operational
                performance verified against the modelled performance, with corrective
                action where the building underperforms.
              </li>
              <li>
                <strong>Procurement evidence</strong> — documented evidence of EPD
                sourcing, recycled-content thresholds, end-of-life recyclability and
                take-back commitments. Most of this is the standard procurement
                documentation already used on BREEAM projects.
              </li>
              <li>
                <strong>Reporting transparency</strong> — public reporting of the
                building whole-life carbon performance against the limit.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Substituting cable mid-job to whatever is in stock without checking the EPD requirement"
            whatHappens={
              <>
                A BREEAM Excellent commercial fit-out spec calls out cable from a specific
                manufacturer with a published EPD and at least 50% recycled copper
                content. The wholesaler is out of stock part-way through the install. The
                apprentice grabs an equivalent-spec cable from a different manufacturer
                that does not publish an EPD and continues. At project handover the
                BREEAM assessor reviews the cable EPDs and notices the substitution. The
                contractor cannot evidence Mat 01 compliance for the affected circuits
                and the project loses the credit. On a tight target rating the missing
                credit can drop the project from Excellent to Very Good, which can
                trigger contractual penalties or affect the customer reputation.
              </>
            }
            doInstead={
              <>
                Where the spec-required cable is unavailable, escalate the substitution
                to the project manager or M&E lead in writing before installing the
                substitute. Source the alternative from another manufacturer that does
                publish an EPD, ideally with comparable or better recycled content.
                Document the substitution and the alternative EPD evidence in the
                project record. Most spec-required substitutions can be authorised
                quickly if requested early — the problem is unauthorised silent
                substitution that emerges at the assessment stage.
              </>
            }
          />

          <CommonMistake
            title="Treating manufacturer marketing claims as equivalent to verified EPDs"
            whatHappens={
              <>
                A cable manufacturer publishes a glossy sustainability brochure with
                claims like sustainable, eco-friendly and low-carbon — but no EPD. The
                contractor procures the cable based on the brochure assuming the claims
                are equivalent to a verified EPD. At BREEAM assessment the marketing
                claims are not accepted as evidence — Mat 01 specifically requires
                third-party verified EPDs prepared under EN 15804. The cable does not
                count toward the credit and the contractor has to either substitute or
                accept the credit loss.
              </>
            }
            doInstead={
              <>
                Always require the EPD itself, not the marketing brochure. The EPD will
                cite EN 15804 (or BS EN 15804+A2), name a third-party verifier, state a
                validity period, and provide quantitative indicator values. Marketing
                copy without an EPD is not evidence under any of the major construction
                sustainability assessment schemes. The Competition and Markets Authority
                Green Claims Code is the UK regulatory backstop against misleading
                environmental marketing claims, and BREEAM, LEED and the UK Net-Zero
                Carbon Buildings Standard all require verified EPDs for material credit
                claims.
              </>
            }
          />

          <Scenario
            title="BREEAM Excellent fit-out — the EPD scramble at handover"
            situation={
              <>
                You are on a BREEAM Excellent commercial fit-out approaching practical
                completion. The BREEAM assessor has scheduled a documentation review next
                week and has requested EPDs for all electrical bill-of-materials items.
                The procurement file contains EPDs for the cable and most accessories,
                but the emergency lighting batteries, the smoke alarm system and several
                of the smaller switches have no EPD documentation. The project manager
                asks if you can sort it.
              </>
            }
            whatToDo={
              <>
                Triage the missing items in order of contribution to the Mat 01 credit
                — EPDs for high-mass items (cable, conduit, switchgear) matter more than
                for small accessories. For each missing item, check the manufacturer
                website first, then call the manufacturer technical or sustainability
                team. Many manufacturers publish EPDs on dedicated sustainability portals
                that are not linked from the main product pages. Where an EPD is not
                published, ask whether one is in preparation or whether an industry-
                average EPD is available through the trade association (e.g. Lighting
                Industry Association EPDs cover some smaller luminaire categories).
                Compile what is available, document the gaps in writing, and present the
                pack to the BREEAM assessor with a clear gap analysis. Lessons-learned
                from this scramble should feed into the procurement spec for the next
                project — EPD requirements need to be in the procurement document, not
                discovered at handover.
              </>
            }
            whyItMatters={
              <>
                The EPD scramble at handover is one of the most common pain points on
                sustainability-specified projects. The fix is to bake EPD requirements
                into the procurement spec from the start so the requirement flows
                downstream to the wholesaler and manufacturer. As an apprentice working
                on these projects you will see the scramble happen, and the
                pattern-recognition is itself useful — when you progress into project
                management or buying you will know to ask the EPD question at order
                stage rather than at handover.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.1 (design documentation framework)"
            clause={
              <>
                The information required as a basis for design is stated in Regulations 132.2 to
                132.5. The requirements to which the design shall conform are stated in
                Regulations 132.6 to 132.16. Designers shall therefore determine and record the
                information listed in 132.2–132.5 to demonstrate conformity with subsequent
                design requirements.
              </>
            }
            meaning={
              <>
                Design documentation is the regulatory home for low-carbon product choices. EPD
                evidence and embodied-carbon figures sit alongside the technical data the
                designer is already gathering under Regs 132.2–132.5. Recording the choice and
                the rationale on the design pack ties the sustainability claim to the regulatory
                record.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.1 framework."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Environmental Product Declarations (EPDs) are standardised, third-party-verified life-cycle environmental impact statements for construction products. EN 15804 is the European methodology standard.",
              "BREEAM Mat 01, LEED and the UK Net-Zero Carbon Buildings Standard reward EPD-backed specification because EPDs enable like-for-like embodied-carbon comparison.",
              "Recycled copper carries roughly 15-20% of the embodied carbon of primary copper. Recycled aluminium carries roughly 5% of primary aluminium. Conductor recycled content is the largest single lever on cable embodied carbon.",
              "Major UK cable manufacturers (Prysmian, Nexans, BICC, Doncaster Cables, AEI Cables, Eland Cables) now publish EPDs and recycled-content figures for core installation cable lines.",
              "BS EN 50625 series sets European best-practice standards for WEEE and cable recycling. Specifying 50625 compliance protects against cable export to unregulated open-burning operations.",
              "Manufacturer-specific EPDs are preferred over industry-average EPDs because they reflect the actual product performance and reward genuine outperformance.",
              "EPDs are typically valid for five years. Always check the issue and expiry dates before relying on the data.",
              "Greenwashing is the use of headline environmental claims without verified third-party evidence. The defence is to require the EPD itself, not the marketing brochure.",
            ]}
          />

          <Quiz title="EPDs, cable disclosures and recycled content — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section6-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.3 Hazardous waste, EPR and the hierarchy
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section6-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.5 Scope 1 / 2 / 3 emissions and carbon literacy
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
