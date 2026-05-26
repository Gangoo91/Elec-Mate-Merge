/**
 * Module 6 · Section 4 · Subsection 3 — Embodied Carbon
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Whole life carbon, material selection, life cycle stages, EPDs, and reduction strategies for sustainable MEP design
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Embodied Carbon - HNC Module 6 Section 4.3';
const DESCRIPTION =
  'Master embodied carbon assessment for building services: whole life carbon, material selection, life cycle stages A-D, EPDs, MEP carbon impacts, and reduction strategies for sustainable design.';

const quickCheckQuestions = [
  {
    id: 'embodied-carbon-definition',
    question: 'What is embodied carbon?',
    options: [
      'Primary and secondary at the same voltage, no electrical connection between them',
      'Standardised launch conditions for repeatable measurements',
      'Carbon emissions from materials, construction, and end of life',
      'To provide visual representation of electrical systems and component locations',
    ],
    correctIndex: 2,
    explanation:
      'Embodied carbon represents the total carbon emissions associated with materials and construction processes, including raw material extraction, manufacturing, transport, installation, maintenance, and end-of-life treatment.',
  },
  {
    id: 'life-cycle-stage-a1-a3',
    question: 'What do life cycle stages A1-A3 represent?',
    options: [
      'Loading requirements, penetration needs, and support requirements',
      'About 50 N/mm² of conductor cross-section (≈ 5 kg/mm²)',
      'The Control of Asbestos Regulations 2012',
      'Product stage (raw materials, transport, manufacturing)',
    ],
    correctIndex: 3,
    explanation:
      "Stages A1-A3 cover the product stage: A1 is raw material extraction, A2 is transport to manufacturer, and A3 is manufacturing. This is often called 'cradle to gate' embodied carbon.",
  },
  {
    id: 'epd-purpose',
    question: 'What is the purpose of an Environmental Product Declaration (EPD)?',
    options: [
      'Annual energy consumption estimates representing typical conditions',
      'That settings match designer\\\\\\\\\\\\\\\'s requirements',
      'All escape routes and specified safety features',
      'To provide verified environmental impact data for products',
    ],
    correctIndex: 3,
    explanation:
      "EPDs provide independently verified, comparable data on a product's environmental impacts across its life cycle, including embodied carbon, based on standardised Life Cycle Assessment methodology to EN 15804.",
  },
  {
    id: 'module-d',
    question: 'What does Module D represent in whole life carbon assessment?',
    options: [
      'Benefits beyond the building life cycle (reuse, recycling)',
      'To provide rigidity and prevent the frame from racking (parallelogramming)',
      '28 days, extendable to 42 days with the referring party\\\\\\\\\\\\\\\'s consent',
      'Possible insulation breakdown or contamination',
    ],
    correctIndex: 0,
    explanation:
      'Module D captures benefits and loads beyond the system boundary - including material reuse, recycling, and energy recovery potential. It represents the circular economy potential of materials at end of life.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which life cycle stage typically accounts for the largest proportion of embodied carbon in MEP systems?',
    options: [
      'A4 - Transport to site',
      'A1-A3 - Product stage',
      'B2 - Maintenance',
      'C3 - Waste processing',
    ],
    correctAnswer: 1,
    explanation:
      'The product stage (A1-A3) typically represents 70-80% of total embodied carbon in MEP systems, covering raw material extraction, manufacturing, and factory-gate transport.',
  },
  {
    id: 2,
    question: 'What is the typical embodied carbon range for copper cable per kilogram?',
    options: [
      '4.0-6.0 kgCO₂e/kg',
      '0.5-1.0 kgCO₂e/kg',
      '1.5-3.0 kgCO₂e/kg',
      '8.0-12.0 kgCO₂e/kg',
    ],
    correctAnswer: 2,
    explanation:
      'Virgin copper cable has embodied carbon of approximately 2.0-3.0 kgCO₂e/kg. Using recycled copper content can reduce this significantly, with high-recycled content cables achieving around 1.5 kgCO₂e/kg.',
  },
  {
    id: 3,
    question:
      'According to RICS Whole Life Carbon Assessment methodology, which stages are mandatory for reporting?',
    options: [
      'A1-A3 and B6 only',
      'A1-A5 only',
      'All stages A-D',
      'A1-A5, B1-B5, C1-C4',
    ],
    correctAnswer: 3,
    explanation:
      'RICS methodology requires reporting of A1-A5 (product and construction), B1-B5 (use stage excluding operational energy), and C1-C4 (end of life). Module D is reported separately as it extends beyond the building boundary.',
  },
  {
    id: 4,
    question:
      "What percentage of a typical commercial building's whole life carbon is embodied carbon?",
    options: [
      '40-60%',
      '25-35%',
      '10-15%',
      '80-90%',
    ],
    correctAnswer: 0,
    explanation:
      "Embodied carbon typically represents 40-60% of whole life carbon in modern commercial buildings with efficient operational performance. As operational carbon reduces through grid decarbonisation, embodied carbon's proportion increases.",
  },
  {
    id: 5,
    question: 'Which MEP component typically has the highest embodied carbon intensity?',
    options: [
      'Steel cable tray',
      'Copper busbars',
      'Plastic conduit',
      'PVC trunking',
    ],
    correctAnswer: 1,
    explanation:
      "Copper busbars have very high embodied carbon intensity at approximately 2.5-3.5 kgCO₂e/kg due to copper's energy-intensive extraction and refining. Aluminium busbars offer a lower-carbon alternative at ~8.0 kgCO₂e/kg despite higher mass.",
  },
  {
    id: 6,
    question: "What does 'cradle to grave' encompass in life cycle assessment?",
    options: [
      'Raw material extraction to factory gate (A1-A3)',
      'Construction to operation only (A4-B7)',
      'Raw material extraction to end of life disposal (A-C)',
      'Operation to demolition (B-C)',
    ],
    correctAnswer: 2,
    explanation:
      'Cradle to grave encompasses all life cycle stages from raw material extraction (cradle) through manufacturing, construction, use, and end of life treatment (grave) - stages A1 through C4.',
  },
  {
    id: 7,
    question: 'Which design stage offers the greatest opportunity to reduce embodied carbon?',
    options: [
      'Detailed design (RIBA Stage 4)',
      'Technical design (RIBA Stage 5)',
      'Construction (RIBA Stage 6)',
      'Concept design (RIBA Stage 2)',
    ],
    correctAnswer: 3,
    explanation:
      'Concept design (RIBA Stage 2) offers the greatest opportunity for embodied carbon reduction as fundamental decisions about system types, capacities, and spatial strategies can be influenced. By Stage 4, most decisions are locked in.',
  },
  {
    id: 8,
    question: 'What is the typical embodied carbon of steel cable containment per metre run?',
    options: [
      '2.0-4.0 kgCO₂e/m',
      '6.0-10.0 kgCO₂e/m',
      '0.5-1.0 kgCO₂e/m',
      '15.0-25.0 kgCO₂e/m',
    ],
    correctAnswer: 0,
    explanation:
      'Heavy-gauge steel cable tray (100mm wide) has embodied carbon of approximately 2.5-4.0 kgCO₂e per metre. Lighter cable basket or recycled content steel can reduce this to 1.5-2.5 kgCO₂e/m.',
  },
  {
    id: 9,
    question: 'Stage B4 in the life cycle represents:',
    options: [
      'Maintenance activities',
      'Replacement of building elements',
      'Repair of components',
      'Refurbishment of the whole building',
    ],
    correctAnswer: 1,
    explanation:
      "B4 covers replacement of building elements during the building's reference study period. For MEP, this includes planned replacement of components like luminaires, distribution boards, and mechanical equipment that have shorter lifespans than the building.",
  },
  {
    id: 10,
    question: 'Which refrigerant property is most relevant to embodied carbon assessment?',
    options: [
      'Flammability rating',
      'Thermal conductivity',
      'Global Warming Potential (GWP)',
      'Operating pressure',
    ],
    correctAnswer: 2,
    explanation:
      'Global Warming Potential (GWP) directly impacts embodied carbon calculations. High-GWP refrigerants like R410A (GWP 2088) contribute significantly to embodied carbon, while low-GWP alternatives like R32 (GWP 675) or R290 (GWP 3) offer substantial reductions.',
  },
  {
    id: 11,
    question: 'What is the primary standard for EPDs in construction products in Europe?',
    options: [
      'ISO 14001',
      'BREEAM',
      'BS 7671',
      'EN 15804',
    ],
    correctAnswer: 3,
    explanation:
      'EN 15804 provides the core product category rules for EPDs in the construction sector, ensuring consistent methodology and comparability. It defines the life cycle stages A1-D and reporting requirements.',
  },
  {
    id: 12,
    question:
      "To achieve a BREEAM 'Excellent' rating, what embodied carbon reduction is typically required for MEP systems?",
    options: [
      '15-20% below baseline',
      '30% below baseline',
      '5% below baseline',
      '10% below baseline',
    ],
    correctAnswer: 0,
    explanation:
      "BREEAM Mat 01 requires demonstrating embodied carbon reductions. For 'Excellent' ratings, projects typically need to achieve 15-20% reductions through material specification, system optimisation, and use of recycled content or low-carbon alternatives.",
  },
];

const faqs = [
  {
    question: 'How does embodied carbon differ from operational carbon?',
    answer:
      "Operational carbon covers emissions from energy consumed during building use (heating, cooling, lighting, equipment). Embodied carbon covers emissions from materials and construction activities - it's 'locked in' at completion and cannot be reduced through operational efficiency. As buildings become more energy efficient and grids decarbonise, embodied carbon becomes proportionally more significant, potentially representing 50-70% of whole life carbon for Net Zero buildings.",
  },
  {
    question: 'Why is early design stage assessment important?',
    answer:
      "The potential to influence embodied carbon reduces dramatically as design progresses. At RIBA Stage 2, fundamental decisions about system types, spatial strategies, and servicing approaches can achieve 30-50% reductions. By Stage 4, specifications are largely fixed and only marginal improvements (5-15%) are possible through product substitution. This 'carbon lock-in' means opportunities missed early cannot be recovered later.",
  },
  {
    question: 'How do I obtain embodied carbon data for MEP products?',
    answer:
      'Primary sources include: (1) Product-specific EPDs from manufacturers - these provide verified, accurate data; (2) Generic EPD databases like CIBSE TM65, WRAP, or ICE Database; (3) Manufacturer product data sheets with carbon declarations; (4) Industry sector EPDs for product categories. Where specific data is unavailable, use conservative generic values and flag data quality in assessments.',
  },
  {
    question: 'What are the key strategies to reduce MEP embodied carbon?',
    answer:
      'Priority strategies include: (1) Design out unnecessary systems through passive design and load reduction; (2) Right-size systems to avoid overcapacity; (3) Specify high recycled content materials, especially for copper and steel; (4) Choose products with verified EPDs showing lower carbon; (5) Design for longevity to reduce replacement cycles; (6) Plan for end-of-life recovery through design for disassembly; (7) Consider low-GWP refrigerants in HVAC systems.',
  },
  {
    question: 'How does refrigerant choice affect MEP embodied carbon?',
    answer:
      'Refrigerant leakage and end-of-life losses are included in embodied carbon calculations. High-GWP refrigerants like R410A (GWP 2088) can contribute significantly - a typical VRF system with 50kg charge experiencing 3% annual leakage adds ~3,000 kgCO₂e per year. Switching to R32 (GWP 675) or natural refrigerants like CO₂ (GWP 1) can reduce this by 60-99%.',
  },
  {
    question: 'What is the RICS Whole Life Carbon Assessment methodology?',
    answer:
      'The RICS Professional Statement (2017, updated 2023) provides a standardised methodology for calculating and reporting whole life carbon in buildings. It requires assessment of modules A1-A5, B1-B5, C1-C4 with separate reporting of B6-B7 (operational) and Module D (beyond boundary). It mandates 60-year reference study periods, consistent data sources, and clear reporting of assumptions and data quality.',
  },
];

const HNCModule6Section4_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section4")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 4 · Subsection 3"
            title="Embodied Carbon"
            description="Whole life carbon, material selection, life cycle stages, EPDs, and reduction strategies for sustainable MEP design"
            tone="purple"
          />

          <TLDR
            points={[
              "Embodied carbon is the lifecycle GHG emissions from materials, transport, construction, maintenance, refurbishment, demolition and disposal — modelled per EN 15978 across stages A1–A5 (product/construction), B1–B5 (use/maintenance), C1–C4 (end-of-life), and D (beyond system boundary).",
              "For new building services, embodied carbon typically accounts for 25–50% of whole-life carbon — and as operational carbon falls (lower grid intensity, lower energy use), embodied is becoming the dominant share.",
              "EPDs (Environmental Product Declarations to EN 15804) are the data source — increasingly mandated by RICS Whole Life Carbon Assessment 2nd edition (effective July 2024).",
            ]}
          />

          <RegsCallout
            source="RICS Whole Life Carbon Assessment for the Built Environment (2nd edition, 2023, effective July 2024)"
            clause="A whole life carbon assessment shall report embodied and operational carbon emissions across all life cycle stages (A1–C4 and D) in accordance with EN 15978, using product-specific EPDs (EN 15804) wherever available, with industry-average data only used where EPDs are unavailable. Reporting shall use the BS EN 15978 functional unit (kgCO₂e/m² GIA) and shall identify carbon hotspots and reduction opportunities."
            meaning={
              <>
                RICS WLCA 2nd edition is now the UK standard — referenced by GLA London Plan, by major developers, and increasingly by tender requirements. EPDs are the primary data source; generic ICE database data is a fallback only. The assessment is iterative — Stage 2 baseline, Stage 4 detailed, Stage 6 as-built — informing design decisions, not just reporting after the fact.
              </>
            }
            cite="Source: RICS Whole Life Carbon Assessment for the Built Environment, 2nd edition (2023) — rics.org"
          />

          <LearningOutcomes
            outcomes={[
              "Define embodied carbon and whole life carbon concepts",
              "Apply life cycle assessment stages A1-D to MEP systems",
              "Interpret Environmental Product Declarations (EPDs)",
              "Compare embodied carbon of common MEP materials",
              "Identify carbon reduction strategies at each design stage",
              "Apply RICS methodology for whole life carbon assessment",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Understanding Embodied Carbon">
            <p>Embodied carbon represents the total greenhouse gas emissions associated with materials and construction processes throughout a building's life cycle. Unlike operational carbon which can be reduced through efficient management and grid decarbonisation, embodied carbon is 'locked in' once construction is complete.</p>
            <p><strong>Components of embodied carbon:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Product stage (A1-A3):</strong> Raw material extraction, transport, manufacturing - typically 70-80% of total</li>
              <li><strong>Construction (A4-A5):</strong> Transport to site and installation activities</li>
              <li><strong>In-use (B1-B5):</strong> Maintenance, repair, replacement of components</li>
              <li><strong>End of life (C1-C4):</strong> Deconstruction, transport, processing, disposal</li>
            </ul>
            <p><strong>Whole Life Carbon Framework</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Product:</strong> A1-A3 — Raw material supply, transport to factory, manufacturing</li>
              <li><strong>Construction:</strong> A4-A5 — Transport to site, installation and construction processes</li>
              <li><strong>Use:</strong> B1-B5 — Use, maintenance, repair, replacement, refurbishment</li>
              <li><strong>Operational:</strong> B6-B7 — Operational energy and water use</li>
              <li><strong>End of Life:</strong> C1-C4 — Deconstruction, transport, waste processing, disposal</li>
              <li><strong>Beyond Life:</strong> D — Reuse, recovery, recycling potential (reported separately)</li>
            </ul>
            <p><strong>Critical insight:</strong> For highly efficient buildings, embodied carbon can represent 50-70% of whole life carbon, making upfront material choices increasingly important for Net Zero targets.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Life Cycle Stages in Detail">
            <p>Understanding each life cycle stage enables targeted carbon reduction strategies. The EN 15804 framework provides standardised modules that form the basis for EPDs and whole life carbon assessments.</p>
            <p><strong>Product Stage (A1-A3)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>A1:</strong> Raw material extraction and processing</li>
              <li><strong>A2:</strong> Transport to manufacturing plant</li>
              <li><strong>A3:</strong> Manufacturing and packaging</li>
              <li>Often called 'cradle to gate'</li>
              <li>Typically 70-80% of embodied carbon</li>
            </ul>
            <p><strong>Construction Stage (A4-A5)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>A4:</strong> Transport from factory to site</li>
              <li><strong>A5:</strong> Installation and construction waste</li>
              <li>Includes site energy use</li>
              <li>Waste factor typically 3-10%</li>
              <li>Usually 5-15% of embodied carbon</li>
            </ul>
            <p><strong>Use Stage (B1-B7)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>B1:</strong> Use (emissions from product itself)</li>
              <li><strong>B2:</strong> Maintenance activities</li>
              <li><strong>B3:</strong> Repair</li>
              <li><strong>B4:</strong> Replacement (major for MEP)</li>
              <li><strong>B5:</strong> Refurbishment</li>
            </ul>
            <p><strong>End of Life (C1-C4) and Beyond (D)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>C1:</strong> Deconstruction/demolition</li>
              <li><strong>C2:</strong> Transport to waste processing</li>
              <li><strong>C3:</strong> Waste processing for reuse</li>
              <li><strong>C4:</strong> Disposal</li>
              <li><strong>D:</strong> Benefits beyond boundary</li>
            </ul>
            <p><strong>B4 Replacement Cycles for MEP Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>LED luminaires:</strong> 15-20 years — 2-3 cycles</li>
              <li><strong>Distribution boards:</strong> 25-30 years — 1-2 cycles</li>
              <li><strong>Cables and containment:</strong> 40-60 years — 0-1 cycle</li>
              <li><strong>HVAC plant:</strong> 15-25 years — 2-3 cycles</li>
              <li><strong>BMS controllers:</strong> 10-15 years — 3-5 cycles</li>
            </ul>
            <p><strong>Design consideration:</strong> B4 replacement can double the embodied carbon of short-lifespan components over a 60-year reference study period.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="MEP Embodied Carbon and EPDs">
            <p>MEP systems typically contribute 15-25% of a building's total embodied carbon. Environmental Product Declarations (EPDs) provide verified, comparable data for material selection decisions based on the EN 15804 standard.</p>
            <p><strong>Typical MEP Material Embodied Carbon Values</strong></p>
            <p><strong>Electrical Materials</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Copper cable (virgin): 2.5-3.0 kgCO₂e/kg</li>
              <li>Copper cable (recycled): 1.2-1.8 kgCO₂e/kg</li>
              <li>Aluminium cable: 8.0-10.0 kgCO₂e/kg</li>
              <li>Steel cable tray: 1.8-2.5 kgCO₂e/kg</li>
              <li>PVC conduit: 2.0-3.0 kgCO₂e/kg</li>
              <li>Steel trunking: 2.0-2.8 kgCO₂e/kg</li>
            </ul>
            <p><strong>Mechanical Materials</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Steel ductwork: 2.0-2.8 kgCO₂e/kg</li>
              <li>Copper pipework: 2.5-3.5 kgCO₂e/kg</li>
              <li>Galvanised steel pipe: 2.2-3.0 kgCO₂e/kg</li>
              <li>Mineral wool insulation: 1.0-1.5 kgCO₂e/kg</li>
              <li>PIR insulation: 4.0-6.0 kgCO₂e/kg</li>
              <li>Cast iron radiators: 1.5-2.0 kgCO₂e/kg</li>
            </ul>
            <p><strong>Understanding EPDs</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Type III EPD:</strong> Third-party verified environmental declaration to EN 15804</li>
              <li><strong>GWP (A1-A3):</strong> Global Warming Potential for product stage - key comparison metric</li>
              <li><strong>Functional unit:</strong> Basis of comparison (e.g., per kg, per metre, per luminaire)</li>
              <li><strong>Reference service life:</strong> Expected lifespan affecting B4 calculations</li>
              <li><strong>Programme operator:</strong> Scheme under which EPD is registered (e.g., IBU, BRE)</li>
            </ul>
            <p><strong>Refrigerant Carbon Impact</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>R410A:</strong> 2,088 — 2,088 kgCO₂e — Split AC, VRF</li>
              <li><strong>R32:</strong> 675 — 675 kgCO₂e — Split AC, small chillers</li>
              <li><strong>R134a:</strong> 1,430 — 1,430 kgCO₂e — Chillers</li>
              <li><strong>R290 (Propane):</strong> 3 — 3 kgCO₂e — Heat pumps</li>
              <li><strong>R744 (CO₂):</strong> 1 — 1 kgCO₂e — Commercial refrigeration</li>
            </ul>
            <p><strong>Data sources:</strong> Use CIBSE TM65, ICE Database, or manufacturer EPDs. Where product-specific EPDs are unavailable, use generic data with conservative assumptions.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Reduction Strategies and RICS Methodology">
            <p>Effective embodied carbon reduction requires intervention at the right design stage. The RICS Whole Life Carbon Assessment methodology provides a standardised approach for calculating, comparing, and reporting building carbon.</p>
            <p><strong>Carbon Reduction Hierarchy</strong></p>
            <p>1. Build Less / Avoid</p>
            <p>Question the need - can existing systems be retained or refurbished?</p>
            <p>2. Design Efficiently</p>
            <p>Reduce loads through passive design, right-size systems, optimise routing</p>
            <p>3. Specify Low-Carbon</p>
            <p>Choose materials with EPDs, high recycled content, low-GWP refrigerants</p>
            <p>4. Design for Longevity</p>
            <p>Extend component life, design for maintenance access, future adaptability</p>
            <p><strong>MEP-Specific Reduction Strategies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Right-sizing systems:</strong> 10-30% — Accurate load calculations, avoid over-design</li>
              <li><strong>Recycled copper content:</strong> 30-50% — Specify high recycled content cables</li>
              <li><strong>Optimised containment:</strong> 20-40% — Efficient routing, shared risers, lighter gauges</li>
              <li><strong>Low-GWP refrigerants:</strong> 60-99% — R32, R290, CO₂ systems instead of R410A</li>
              <li><strong>Extended luminaire life:</strong> 25-40% — Quality products with 50,000+ hour life</li>
            </ul>
            <p><strong>RICS Whole Life Carbon Requirements</strong></p>
            <p><strong>Reference study period:</strong> 60 years (standard building life)</p>
            <p><strong>Mandatory modules:</strong> A1-A5, B1-B5, C1-C4</p>
            <p><strong>Separate reporting:</strong> B6-B7 (operational), Module D (beyond boundary)</p>
            <p><strong>Data hierarchy:</strong> Product EPD {'>'} Industry EPD {'>'} Generic database</p>
            <p><strong>Unit:</strong> kgCO₂e/m² GIA for benchmarking</p>
            <p><strong>Reporting:</strong> Clear statement of inclusions, exclusions, and data quality</p>
            <p><strong>Early action imperative:</strong> 80% of embodied carbon is determined by RIBA Stage 3. By Stage 5, only marginal improvements through product substitution remain possible.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Cable Embodied Carbon Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate embodied carbon for 500m of 95mm² 4-core armoured cable.</p>
            <p>Given:</p>
            <p>Cable mass: 4.2 kg/m</p>
            <p>Total mass: 500m × 4.2 kg/m = 2,100 kg</p>
            <p>Virgin copper coefficient: 2.8 kgCO₂e/kg</p>
            <p>Calculation (A1-A3):</p>
            <p>Embodied carbon = 2,100 kg × 2.8 kgCO₂e/kg</p>
            <p>= 5,880 kgCO₂e</p>
            <p>With 50% recycled content (coefficient 2.0 kgCO₂e/kg):</p>
            <p>= 2,100 kg × 2.0 kgCO₂e/kg</p>
            <p>= 4,200 kgCO₂e (29% reduction)</p>
            <p>
              <strong>Example 2: Refrigerant Lifecycle Carbon</strong>
            </p>
            <p><strong>Scenario:</strong> Compare whole life refrigerant carbon for R410A vs R32 VRF system.</p>
            <p>System parameters:</p>
            <p>Refrigerant charge: 45 kg</p>
            <p>Annual leakage rate: 3%</p>
            <p>Service life: 20 years</p>
            <p>End of life recovery: 80%</p>
            <p>R410A (GWP 2088):</p>
            <p>Initial charge: 45 × 2,088 = 93,960 kgCO₂e</p>
            <p>Annual leakage: 1.35 kg × 2,088 = 2,819 kgCO₂e/yr</p>
            <p>20-year leakage: 56,380 kgCO₂e</p>
            <p>End of life loss (20%): 9 kg × 2,088 = 18,792 kgCO₂e</p>
            <p>Total: 169,132 kgCO₂e</p>
            <p>R32 (GWP 675):</p>
            <p>Initial charge: 45 × 675 = 30,375 kgCO₂e</p>
            <p>20-year leakage: 18,225 kgCO₂e</p>
            <p>End of life loss: 6,075 kgCO₂e</p>
            <p>Total: 54,675 kgCO₂e (68% reduction)</p>
            <p>
              <strong>Example 3: B4 Replacement Impact</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate whole life embodied carbon including replacements for lighting.</p>
            <p>Installation parameters:</p>
            <p>Number of luminaires: 200</p>
            <p>Carbon per luminaire (A1-A3): 25 kgCO₂e</p>
            <p>Building reference period: 60 years</p>
            <p>Option A - Standard LED (15-year life):</p>
            <p>Replacements in 60 years: 3 cycles (initial + 3)</p>
            <p>Total luminaire carbon: 200 × 25 × 4 = 20,000 kgCO₂e</p>
            <p>Option B - Premium LED (25-year life):</p>
            <p>Carbon per luminaire: 32 kgCO₂e (higher quality)</p>
            <p>Replacements in 60 years: 2 cycles (initial + 1)</p>
            <p>Total luminaire carbon: 200 × 32 × 2.4 = 15,360 kgCO₂e</p>
            <p>Premium option: 23% lower whole life carbon despite higher unit cost</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Embodied Carbon Assessment Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Define system boundaries and reference study period (typically 60 years)</li>
              <li>List all MEP components and materials with quantities</li>
              <li>Source carbon coefficients: EPDs first, then generic databases</li>
              <li>Include A1-A5, B1-B5, C1-C4 as minimum scope</li>
              <li>Calculate B4 replacements based on component lifespans</li>
              <li>Document assumptions, exclusions, and data quality</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Product stage (A1-A3): <strong>70-80%</strong> of embodied carbon</li>
              <li>MEP contribution: <strong>15-25%</strong> of building embodied carbon</li>
              <li>Copper cable: <strong>2.5-3.0 kgCO₂e/kg</strong> (virgin)</li>
              <li>Reference study period: <strong>60 years</strong> (RICS standard)</li>
              <li>R410A GWP: <strong>2,088</strong> vs R32: <strong>675</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Ignoring B4 replacements:</strong> Short-lifespan components multiply carbon</li>
                <li><strong>Forgetting refrigerants:</strong> High-GWP refrigerants can dominate HVAC carbon</li>
                <li><strong>Using outdated data:</strong> Generic databases may not reflect current manufacturing</li>
                <li><strong>Late assessment:</strong> Waiting until Stage 4/5 limits reduction options</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="Embodied carbon target met by switching from new switchgear to refurbished"
            situation={
              <>
                A 5,000 m² office refurbishment is targeting LETI Band B for embodied carbon (≤625 kgCO₂e/m² A1–A5). The proposed all-new MEP package modelled at 720. Looking at hotspots: switchgear (15 t), new HVAC plant (45 t) and copper cabling (28 t) account for over half the M&E embodied carbon.
              </>
            }
            whatToDo={
              <>
                Three reduction strategies: (1) re-use existing switchgear (de-rate or refurbish in-situ — typical 60–80% embodied carbon saving on the asset); (2) specify high-recycled-content plant (chillers, AHUs with EPDs showing 30%+ recycled); (3) replace copper cabling with aluminium where current rating allows (40–60% embodied saving but technical assessment needed). Combined, these can pull the total below 625. Document each substitution with an EPD-backed calculation.
              </>
            }
            whyItMatters={
              <>
                Embodied carbon in M&E is dominated by metals — switchgear (steel + copper), cabling (copper), refrigeration plant (copper + steel). The biggest reduction lever is reuse, not replacement. Specifying "new" without challenge typically wastes 30–50% of the embodied carbon budget. RICS WLCA forces this to be measured and reported.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Lifecycle stages (EN 15978): A1–A5 (product + construction), B (use + maintenance), C (end-of-life), D (beyond boundary).",
              "EPDs (EN 15804) are the primary data source — product-specific declarations.",
              "RICS WLCA 2nd edition (July 2024) is the UK methodology.",
              "LETI bands for embodied carbon (A1–A5): Band A ≤500, Band B ≤625, Band C ≤775 kgCO₂e/m².",
              "M&E embodied carbon dominated by metals — switchgear, cabling, refrigerant plant.",
              "Reuse > recycle > new with high recycled content.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section4-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Operational carbon
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section4-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Science-based targets
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section4_3;
