/**
 * Module 6 · Section 6 · Subsection 4 — Whole Life Carbon Assessment
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   RICS methodology, life cycle stages, data sources, benchmarking, and reduction strategies for building services
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

const TITLE = 'Whole Life Carbon Assessment - HNC Module 6 Section 6.4';
const DESCRIPTION =
  'Master Whole Life Carbon Assessment for building services: RICS methodology, life cycle stages (Modules A-D), data sources (EPDs, ICE database), benchmarking against LETI targets, and reduction strategies for MEP systems.';

const quickCheckQuestions = [
  {
    id: 'wlc-definition',
    question: 'What does Whole Life Carbon (WLC) assessment measure?',
    options: [
      'Using dedicated conduits, trunking, or trays exclusively for emergency circuits',
      'Notify the scheme and provide certificate to customer and local authority',
      'BS EN 60900 — rated to 1,000 V AC / 1,500 V DC and individually tested',
      'Total carbon emissions from cradle to grave including embodied and operational carbon',
    ],
    correctIndex: 3,
    explanation:
      "Whole Life Carbon assessment measures the total carbon emissions across a building's entire life cycle, including both embodied carbon (materials, construction, maintenance, end-of-life) and operational carbon (energy use during occupancy).",
  },
  {
    id: 'module-a',
    question:
      "Which life cycle module covers the 'product stage' including raw material extraction and manufacturing?",
    options: [
      'Module D (Beyond system boundary)',
      'Module B (Use stage)',
      'Module C (End-of-life)',
      'Module A1-A3 (Product stage)',
    ],
    correctIndex: 3,
    explanation:
      "Module A1-A3 covers the product stage: A1 is raw material extraction and supply, A2 is transport to manufacturer, and A3 is manufacturing. This represents the 'cradle-to-gate' embodied carbon of materials.",
  },
  {
    id: 'epd-purpose',
    question: 'What is an Environmental Product Declaration (EPD)?',
    options: [
      'Maintaining a consistent sleep and wake time, even on weekends',
      'The percentage of consumption variation explained by degree days',
      'The processing of raw sensor signals to make them suitable for the control system',
      'A standardised document reporting verified environmental impacts of a product',
    ],
    correctIndex: 3,
    explanation:
      'An EPD is a standardised, third-party verified document that reports the environmental impacts of a product based on Life Cycle Assessment. EPDs follow ISO 14025 and EN 15804 standards, providing reliable data for WLC calculations.',
  },
  {
    id: 'leti-benchmark',
    question: 'What is the LETI 2030 target for whole life carbon in non-domestic buildings?',
    options: [
      '1500 kgCO2e/m2',
      '100 kgCO2e/m2',
      '300 kgCO2e/m2',
      '600 kgCO2e/m2',
    ],
    correctIndex: 3,
    explanation:
      'LETI (London Energy Transformation Initiative) sets a 2030 target of 600 kgCO2e/m2 for whole life carbon in non-domestic buildings, with an aspirational 2050 target of 350 kgCO2e/m2. These benchmarks drive industry decarbonisation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'According to RICS methodology, what is the standard study period for whole life carbon assessment?',
    options: [
      '25 years',
      '60 years',
      '50 years',
      '100 years',
    ],
    correctAnswer: 1,
    explanation:
      'RICS Professional Statement specifies a 60-year study period as the standard for whole life carbon assessment. This aligns with BS EN 15978 and allows consistent benchmarking across projects.',
  },
  {
    id: 2,
    question:
      'Which module covers carbon emissions from building maintenance and replacement during use?',
    options: [
      'Module C2 (Transport to disposal)',
      'Module A5 (Construction process)',
      'Module B4 (Replacement)',
      'Module D (Reuse potential)',
    ],
    correctAnswer: 2,
    explanation:
      'Module B4 covers replacement of building components during the use stage. For MEP systems with 15-25 year lifespans, multiple replacement cycles must be accounted for within the 60-year study period.',
  },
  {
    id: 3,
    question: 'What does Module D represent in life cycle assessment?',
    options: [
      'Carbon stored in bio-based materials like timber',
      'Embodied carbon coefficients for construction materials',
      'Reducing system sizes through fabric-first approach',
      'Benefits and loads beyond the system boundary (recycling credits)',
    ],
    correctAnswer: 3,
    explanation:
      "Module D accounts for potential benefits beyond the building's life cycle, such as recycling, recovery, or reuse potential. It must be reported separately as it represents avoided emissions in future product systems.",
  },
  {
    id: 4,
    question: 'The ICE Database provides:',
    options: [
      'Embodied carbon coefficients for construction materials',
      'Energy performance benchmarks for buildings',
      'Only UK construction material carbon factors',
      'Building regulations compliance data',
    ],
    correctAnswer: 0,
    explanation:
      "The Inventory of Carbon and Energy (ICE) Database, developed by the University of Bath, provides embodied carbon coefficients (kgCO2e/kg) for construction materials. It's widely used in the UK when product-specific EPDs are unavailable.",
  },
  {
    id: 5,
    question: 'Which data source provides the most accurate embodied carbon values?',
    options: [
      'Generic industry databases',
      'Product-specific EPDs',
      'Estimated values',
      'National averages',
    ],
    correctAnswer: 1,
    explanation:
      'Product-specific EPDs provide the most accurate embodied carbon data as they are based on actual manufacturing processes and third-party verified. The data hierarchy is: product-specific EPD > manufacturer EPD > industry average EPD > generic database.',
  },
  {
    id: 6,
    question:
      "What percentage of a building's whole life carbon do MEP systems typically represent?",
    options: [
      '5-10%',
      '40-50%',
      '15-25%',
      '60-70%',
    ],
    correctAnswer: 2,
    explanation:
      "MEP systems typically account for 15-25% of a building's whole life carbon, primarily due to shorter replacement cycles (15-25 years vs 60+ years for structure) and energy-intensive materials like copper, aluminium, and refrigerants.",
  },
  {
    id: 7,
    question: 'Which refrigerant property is measured in Global Warming Potential (GWP)?',
    options: [
      'RIBA Stages 2, 3, 4 and completion',
      'Carbon stored in bio-based materials like timber',
      'Module B4 accounts for replacement cycles',
      'Equivalent CO2 impact per kg released',
    ],
    correctAnswer: 3,
    explanation:
      'GWP measures the climate impact of a refrigerant relative to CO2 over a specified time period (typically 100 years). R-410A has a GWP of 2088, meaning 1kg released equals 2088 kg CO2e. Lower GWP alternatives like R-32 (GWP 675) reduce embodied carbon risk.',
  },
  {
    id: 8,
    question: 'RICS requires WLC assessment at which project stages?',
    options: [
      'RIBA Stages 2, 3, 4 and completion',
      'Previous certificates and drawings',
      'It compensates for cable resistance',
      'Full fall protection system',
    ],
    correctAnswer: 0,
    explanation:
      'RICS Professional Statement requires WLC assessment at RIBA Stage 2 (Concept Design), Stage 3 (Developed Design), Stage 4 (Technical Design), and as-built completion. Early assessment enables design optimisation when changes are still feasible.',
  },
  {
    id: 9,
    question: 'What is the primary strategy for reducing operational carbon in MEP design?',
    options: [
      'Equivalent CO2 impact per kg released',
      'Reducing system sizes through fabric-first approach',
      'Embodied carbon coefficients for construction materials',
      'Benefits and loads beyond the system boundary (recycling credits)',
    ],
    correctAnswer: 1,
    explanation:
      'A fabric-first approach reduces heating/cooling loads through better insulation, airtightness, and passive design, enabling smaller MEP systems. This reduces both operational carbon (lower energy use) and embodied carbon (less equipment).',
  },
  {
    id: 10,
    question: 'Which copper cable alternative can reduce embodied carbon by approximately 50%?',
    options: [
      'Steel conductors',
      'Silver conductors',
      'Aluminium conductors',
      'Copper-clad aluminium',
    ],
    correctAnswer: 2,
    explanation:
      'Aluminium conductors have approximately 50% lower embodied carbon than copper. While requiring larger cross-sections for equivalent current capacity, aluminium is increasingly used for submains and distribution where termination methods allow.',
  },
  {
    id: 11,
    question: "What does 'biogenic carbon' refer to in WLC assessment?",
    options: [
      'Embodied carbon coefficients for construction materials',
      'Reducing system sizes through fabric-first approach',
      'Equivalent CO2 impact per kg released',
      'Carbon stored in bio-based materials like timber',
    ],
    correctAnswer: 3,
    explanation:
      'Biogenic carbon is carbon sequestered from the atmosphere by plants and stored in bio-based materials. Timber products store biogenic carbon, which may be released at end-of-life. RICS requires biogenic carbon to be reported separately.',
  },
  {
    id: 12,
    question:
      'A cable tray system is replaced twice during a 60-year building life. How is this captured in WLC?',
    options: [
      'Module B4 accounts for replacement cycles',
      'Only the final installation is counted',
      'Only the initial installation is counted',
      'Replacements are excluded from assessment',
    ],
    correctAnswer: 0,
    explanation:
      'Module B4 (Replacement) captures the embodied carbon of all replacement cycles within the study period. If cable tray has a 20-year life, two replacements (at years 20 and 40) would be included, effectively tripling the B4 carbon impact.',
  },
];

const faqs = [
  {
    question: "What's the difference between embodied carbon and operational carbon?",
    answer:
      'Embodied carbon (Modules A1-A5, B1-B5, C1-C4) is the carbon emitted during material extraction, manufacturing, transport, construction, maintenance, replacement, and end-of-life. Operational carbon (Module B6) is the carbon from energy used during building operation. As buildings become more energy-efficient, embodied carbon represents an increasing proportion of whole life carbon - often 50%+ in low-energy buildings.',
  },
  {
    question: 'How do I calculate WLC for MEP systems without product EPDs?',
    answer:
      'When product-specific EPDs are unavailable, use data hierarchy: (1) manufacturer-provided data, (2) industry-average EPDs for the product category, (3) generic databases like ICE v3.0 or One Click LCA. Document data sources and quality levels. RICS requires transparency about data limitations and recommends sensitivity analysis for significant assumptions.',
  },
  {
    question: 'Why is refrigerant leakage included in WLC assessment?',
    answer:
      'Refrigerant leakage (Module B1 - Use) can significantly impact WLC due to high GWP values. A typical commercial chiller with R-410A (GWP 2088) leaking 5% annually could emit 100+ kgCO2e/kW cooling capacity over 20 years from leakage alone. Assessment includes both initial charge and annual leakage rates, making low-GWP refrigerant selection a key decarbonisation strategy.',
  },
  {
    question: 'How does the circular economy affect WLC assessment?',
    answer:
      'Circular economy principles can reduce WLC through: (1) Design for disassembly enabling material reuse, (2) Specifying recycled content materials, (3) Designing modular systems that can be relocated, (4) Selecting equipment with take-back schemes. Module D credits can be claimed for demonstrated reuse/recycling potential, though these must be reported separately and cannot offset Modules A-C.',
  },
  {
    question: 'What MEP systems have the highest embodied carbon impact?',
    answer:
      'Highest impact MEP systems typically include: (1) Refrigeration and cooling plant due to refrigerants and copper content, (2) Electrical distribution due to copper cabling and transformer cores, (3) Ductwork and pipework due to steel/copper mass, (4) Photovoltaic systems due to silicon and aluminium content. However, PV and heat pumps often achieve carbon payback within 2-5 years through operational savings.',
  },
  {
    question: 'Is WLC assessment mandatory in the UK?',
    answer:
      "Currently, WLC assessment is required for London Plan referral projects (2021 onwards) and many local authorities are adopting requirements. The UK Government's Net Zero Strategy signals mandatory WLC reporting is likely. BREEAM Outstanding now requires WLC assessment, and many clients specify it contractually. The 2025 Building Regulations review may introduce WLC requirements nationally.",
  },
];

const HNCModule6Section6_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section6")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 6 · Subsection 4"
            title="Whole Life Carbon Assessment"
            description="RICS methodology, life cycle stages, data sources, benchmarking, and reduction strategies for building services"
            tone="purple"
          />

          <TLDR
            points={[
              "Whole Life Carbon Assessment (WLCA) reports embodied + operational carbon across a building's lifecycle — A1–A5 (product/construction), B (use/maintenance), C (end-of-life), D (beyond system boundary) per EN 15978.",
              "RICS Whole Life Carbon Assessment 2nd edition (effective July 2024) is the UK methodology — supersedes the 1st edition (2017) and is referenced by GLA London Plan, BREEAM, and increasingly tender requirements.",
              "For new construction, embodied carbon (A1–A5) typically 25–50% of WLCA — and as operational carbon falls (lower grid intensity), embodied is becoming the dominant share, requiring early-stage design intervention.",
            ]}
          />

          <RegsCallout
            source="RICS Whole Life Carbon Assessment for the Built Environment (2nd edition, 2023, effective July 2024)"
            clause="A whole life carbon assessment shall report embodied carbon emissions across product stages A1-A3 (cradle-to-gate), construction process stages A4-A5, use stages B1-B5 (use, maintenance, repair, replacement, refurbishment), end-of-life stages C1-C4, and module D (loads and benefits beyond the system boundary). The assessment shall be reported in kgCO₂e per m² gross internal area and shall use product-specific Environmental Product Declarations (EPDs) compliant with EN 15804 wherever available."
            meaning={
              <>
                RICS WLCA 2nd edition is now the UK standard. EPDs are the primary data source; ICE database fallback only. Iterative assessment at Stage 2 (baseline), Stage 4 (detailed), Stage 6 (as-built) — informing design, not just reporting after the fact. London Plan requires WLCA submission for major referable schemes.
              </>
            }
            cite="Source: RICS Whole Life Carbon Assessment for the Built Environment, 2nd edition (2023) — rics.org"
          />

          <LearningOutcomes
            outcomes={[
              "Apply RICS whole life carbon methodology to MEP projects",
              "Identify and calculate carbon across all life cycle stages (Modules A-D)",
              "Select appropriate data sources including EPDs and ICE database",
              "Benchmark designs against LETI and RIBA 2030 targets",
              "Implement embodied and operational carbon reduction strategies",
              "Assess MEP system contributions to whole life carbon",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="RICS Methodology Fundamentals">
            <p>The RICS Professional Statement "Whole life carbon assessment for the built environment" (2nd edition, 2023) provides the standardised methodology for calculating whole life carbon in UK construction projects. It aligns with BS EN 15978 and establishes consistent approaches for assessment, reporting, and benchmarking.</p>
            <p><strong>RICS WLC Framework Components:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>System boundary:</strong> Defines what is included/excluded from assessment</li>
              <li><strong>Study period:</strong> 60 years as standard (can vary for specific building types)</li>
              <li><strong>Functional unit:</strong> kgCO2e per m2 GIA (Gross Internal Area)</li>
              <li><strong>Life cycle modules:</strong> A1-A5, B1-B7, C1-C4, D as per EN 15978</li>
            </ul>
            <p><strong>Assessment Requirements by RIBA Stage</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Stage 2 - Concept:</strong> Simplified (elemental) — Benchmark data, early estimates</li>
              <li><strong>Stage 3 - Developed:</strong> Detailed (system level) — Generic database + some EPDs</li>
              <li><strong>Stage 4 - Technical:</strong> Comprehensive (product level) — Product-specific EPDs preferred</li>
              <li><strong>Completion:</strong> As-built verification — Actual products, quantities verified</li>
            </ul>
            <p><strong>WLC Calculation Formula</strong></p>
            <p>WLC = Embodied Carbon + Operational Carbon</p>
            <p>WLC = (A1-A5 + B1-B5 + C1-C4) + (B6 + B7)</p>
            <p>Where:</p>
            <p>A1-A5 = Product & construction stage</p>
            <p>B1-B5 = Use stage (maintenance, replacement)</p>
            <p>B6-B7 = Operational energy and water</p>
            <p>C1-C4 = End-of-life stage</p>
            <p><strong>Key principle:</strong> Module D (benefits beyond system boundary) must be reported separately and cannot offset Modules A-C.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Life Cycle Stages (Modules A-D)">
            <p>EN 15978 defines life cycle stages using a modular structure. Understanding each module enables accurate carbon accounting and identifies reduction opportunities across the building's lifetime.</p>
            <p><strong>Module A: Product and Construction Stage</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>A1:</strong> Raw material extraction — Copper ore mining, bauxite extraction</li>
              <li><strong>A2:</strong> Transport to manufacturer — Ore to smelter, components to factory</li>
              <li><strong>A3:</strong> Manufacturing — Cable production, AHU assembly, panel wiring</li>
              <li><strong>A4:</strong> Transport to site — Factory to construction site delivery</li>
              <li><strong>A5:</strong> Construction/installation — Site energy, waste, temporary works</li>
            </ul>
            <p><strong>Module B: Use Stage</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>B1:</strong> Use (refrigerant leakage)</li>
              <li><strong>B2:</strong> Maintenance (filter changes, servicing)</li>
              <li><strong>B3:</strong> Repair (component failures)</li>
              <li><strong>B4:</strong> Replacement (equipment end-of-life)</li>
              <li><strong>B5:</strong> Refurbishment (major upgrades)</li>
              <li><strong>B6:</strong> Operational energy use</li>
              <li><strong>B7:</strong> Operational water use</li>
            </ul>
            <p><strong>Module C & D: End-of-Life</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>C1:</strong> Deconstruction/demolition</li>
              <li><strong>C2:</strong> Transport to waste processing</li>
              <li><strong>C3:</strong> Waste processing for reuse/recycling</li>
              <li><strong>C4:</strong> Disposal (landfill, incineration)</li>
              <li><strong>D:</strong> Reuse/recycling benefits (reported separately)</li>
            </ul>
            <p><strong>Module B4 Replacement Calculation</strong></p>
            <p>For a 60-year study period with MEP equipment lifespans:</p>
            <p>Number of replacements = (Study period / Equipment life) - 1</p>
            <p>Examples:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Chiller (25-year life): 60/25 - 1 = 1.4 → 1 replacement</li>
              <li>LED luminaires (15-year life): 60/15 - 1 = 3 replacements</li>
              <li>Cable tray (30-year life): 60/30 - 1 = 1 replacement</li>
            </ul>
            <p><strong>MEP impact:</strong> Module B4 often dominates MEP embodied carbon due to multiple replacement cycles - a key reason to specify durable equipment.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Data Sources and Calculation Methodology">
            <p>Accurate WLC assessment requires reliable carbon data. A hierarchy of data sources ensures calculations use the best available information while maintaining transparency about data quality.</p>
            <p><strong>Data Source Hierarchy (Best to Acceptable)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1:</strong> Product-specific EPD — Highest — Daikin VRV EPD for specific model</li>
              <li><strong>2:</strong> Manufacturer EPD (product group) — High — Schneider switchgear range EPD</li>
              <li><strong>3:</strong> Industry-average EPD — Medium — FETA heat pump average EPD</li>
              <li><strong>4:</strong> Generic database (ICE, Ecoinvent) — Acceptable — ICE v3.0 copper cable factor</li>
              <li><strong>5:</strong> Proxy/estimated data — Low — Similar product extrapolation</li>
            </ul>
            <p><strong>Key MEP Carbon Factors (ICE v3.0)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Copper (primary): <strong>2.71 kgCO2e/kg</strong></li>
              <li>Copper (recycled 60%): <strong>1.78 kgCO2e/kg</strong></li>
              <li>Aluminium (primary): <strong>6.67 kgCO2e/kg</strong></li>
              <li>Aluminium (recycled): <strong>0.43 kgCO2e/kg</strong></li>
              <li>Steel (galvanised): <strong>2.76 kgCO2e/kg</strong></li>
              <li>PVC: <strong>3.10 kgCO2e/kg</strong></li>
              <li>XLPE insulation: <strong>2.50 kgCO2e/kg</strong></li>
            </ul>
            <p><strong>Refrigerant GWP Values (AR5)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>R-410A: <strong>2088</strong> GWP100</li>
              <li>R-32: <strong>675</strong> GWP100</li>
              <li>R-134a: <strong>1430</strong> GWP100</li>
              <li>R-1234yf: <strong>4</strong> GWP100</li>
              <li>R-290 (propane): <strong>3</strong> GWP100</li>
              <li>R-744 (CO2): <strong>1</strong> GWP100</li>
              <li>R-717 (ammonia): <strong>0</strong> GWP100</li>
            </ul>
            <p><strong>EPD Resources for MEP</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>EPD International:</strong> epd-international.com - Global programme operator</li>
              <li><strong>IBU:</strong> ibu-epd.com - German EPD programme (many MEP products)</li>
              <li><strong>BRE EPD:</strong> greenbooklive.com - UK-verified EPDs</li>
              <li><strong>One Click LCA:</strong> Built-in database with 200,000+ materials</li>
              <li><strong>EC3 (Embodied Carbon in Construction Calculator):</strong> Open database</li>
            </ul>
            <p><strong>Best practice:</strong> Document all data sources in the WLC report and clearly identify data quality levels for transparency and future updates.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Benchmarking and Reduction Strategies">
            <p>Industry benchmarks provide targets for WLC performance. Understanding these benchmarks and implementing reduction strategies enables MEP designers to contribute to decarbonisation goals whilst maintaining system performance.</p>
            <p><strong>LETI and RIBA Whole Life Carbon Targets</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Office:</strong> 1100 kgCO2e/m2 — 600 kgCO2e/m2 — 350 kgCO2e/m2</li>
              <li><strong>Residential:</strong> 800 kgCO2e/m2 — 500 kgCO2e/m2 — 300 kgCO2e/m2</li>
              <li><strong>School:</strong> 900 kgCO2e/m2 — 540 kgCO2e/m2 — 325 kgCO2e/m2</li>
              <li><strong>Healthcare:</strong> 1400 kgCO2e/m2 — 800 kgCO2e/m2 — 500 kgCO2e/m2</li>
            </ul>
            <p><strong>MEP Carbon Reduction Hierarchy</strong></p>
            <p><strong>1. Build Less (Demand Reduction)</strong></p>
            <p>Fabric-first approach, passive design, reduce conditioned floor area</p>
            <p><strong>2. Build Clever (Design Optimisation)</strong></p>
            <p>Right-size systems, hybrid solutions, efficient distribution</p>
            <p><strong>3. Build Efficiently (Low Carbon Materials)</strong></p>
            <p>Low-GWP refrigerants, recycled content, aluminium cables</p>
            <p><strong>4. Build for Longevity (Extended Life)</strong></p>
            <p>Durable equipment, design for maintenance, modular systems</p>
            <p><strong>MEP Embodied Carbon Strategies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Specify <strong>low-GWP refrigerants</strong> (R-32, R-290)</li>
              <li>Use <strong>aluminium submains</strong> where feasible</li>
              <li>Specify <strong>high recycled content</strong> materials</li>
              <li>Design for <strong>extended equipment life</strong></li>
              <li>Use <strong>prefabricated modules</strong> (reduced waste)</li>
              <li>Optimise <strong>cable sizing</strong> (balance Cu vs losses)</li>
            </ul>
            <p><strong>MEP Operational Carbon Strategies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Support <strong>fabric-first</strong> to reduce loads</li>
              <li>Maximise <strong>heat pump COPs</strong> (SCOP &gt;4)</li>
              <li>Implement <strong>demand-controlled ventilation</strong></li>
              <li>Use <strong>high-efficiency motors</strong> (IE4/IE5)</li>
              <li>Integrate <strong>smart controls</strong> and BMS</li>
              <li>Design for <strong>renewable energy</strong> integration</li>
            </ul>
            <p><strong>MEP Contribution to Building WLC (Typical Office)</strong></p>
            <p><strong>Carbon payback:</strong> Technologies like PV and heat pumps have embodied carbon but typically achieve carbon payback within 2-5 years through operational savings - always assess whole life impact, not just upfront carbon.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Cable Embodied Carbon Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate embodied carbon for 500m of 95mm2 4-core XLPE/SWA copper cable.</p>
            <p>Given:</p>
            <p>- Cable mass: 4.2 kg/m (from manufacturer data)</p>
            <p>- Copper content: approximately 65% by mass</p>
            <p>- Steel armour: approximately 20% by mass</p>
            <p>- XLPE/PVC: approximately 15% by mass</p>
            <p>Calculation:</p>
            <p>Total cable mass = 500m x 4.2 kg/m = 2,100 kg</p>
            <p>Copper = 2,100 x 0.65 x 2.71 kgCO2e/kg =  <span>3,700 kgCO2e</span></p>
            <p>Steel = 2,100 x 0.20 x 2.76 kgCO2e/kg =  <span>1,159 kgCO2e</span></p>
            <p>XLPE/PVC = 2,100 x 0.15 x 2.80 kgCO2e/kg =  <span>882 kgCO2e</span></p>
            <p>Total A1-A3 = 5,741 kgCO2e (5.74 tCO2e)</p>
            <p>Note: If using aluminium conductor equivalent:</p>
            <p>Al mass for 95mm2 equivalent ≈ 50% of Cu mass</p>
            <p>Al carbon = 1,050 x 0.43 (recycled) =  <span>451 kgCO2e</span></p>
            <p>Saving: ~3,250 kgCO2e (87% reduction on conductor)</p>
            <p>
              <strong>Example 2: Refrigerant Leakage Impact (Module B1)</strong>
            </p>
            <p><strong>Scenario:</strong> Compare lifetime refrigerant emissions for two 200kW chiller options.</p>
            <p>Option A: R-410A chiller</p>
            <p>- Refrigerant charge: 45 kg</p>
            <p>- Annual leakage rate: 5%</p>
            <p>- GWP: 2088</p>
            <p>Initial charge carbon = 45 x 2088 = 93,960 kgCO2e</p>
            <p>Annual leakage = 45 x 0.05 x 2088 = 4,698 kgCO2e/year</p>
            <p>20-year leakage = 4,698 x 20 = <span>93,960 kgCO2e</span></p>
            <p>Option B: R-32 chiller</p>
            <p>- Refrigerant charge: 35 kg (lower charge)</p>
            <p>- Annual leakage rate: 5%</p>
            <p>- GWP: 675</p>
            <p>Initial charge carbon = 35 x 675 = 23,625 kgCO2e</p>
            <p>20-year leakage = 35 x 0.05 x 675 x 20 =  <span>23,625 kgCO2e</span></p>
            <p>Refrigerant carbon saving: ~70,000 kgCO2e (70 tCO2e)</p>
            <p>
              <strong>Example 3: Module B4 Replacement Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate 60-year embodied carbon for LED lighting installation.</p>
            <p>Given:</p>
            <p>- 200 LED luminaires at 8 kgCO2e each (A1-A3)</p>
            <p>- LED driver life: 15 years</p>
            <p>- LED module life: 15 years</p>
            <p>- Housing reuse potential: 60 years</p>
            <p>Initial installation (A1-A3):</p>
            <p>200 x 8 = <span>1,600 kgCO2e</span></p>
            <p>Replacements over 60 years (B4):</p>
            <p>Number of driver/module replacements = 60/15 - 1 = 3</p>
            <p>Replacement carbon (driver + LED) = 4 kgCO2e per luminaire</p>
            <p>B4 = 200 x 4 x 3 = <span>2,400 kgCO2e</span></p>
            <p>Total lighting WLC:</p>
            <p>A1-A3 + B4 = 1,600 + 2,400 = <span>4,000 kgCO2e</span></p>
            <p>Note: B4 is 60% of total - longer-life LEDs reduce WLC significantly</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>WLC Assessment Checklist for MEP:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Define system boundary - which MEP systems are included?</li>
              <li>Establish study period (60 years standard) and equipment lifespans</li>
              <li>Collect bill of quantities for all MEP elements</li>
              <li>Source carbon data (prioritise EPDs over generic databases)</li>
              <li>Calculate A1-A5 (upfront) carbon for all equipment and materials</li>
              <li>Include B1 refrigerant leakage for HVAC systems</li>
              <li>Calculate B4 replacement cycles based on equipment lifespans</li>
              <li>Model B6 operational energy using dynamic simulation</li>
              <li>Benchmark against LETI/RIBA targets for the building type</li>
            </ul>
            <p>
              <strong>Key Benchmark Values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>LETI 2030 WLC target: <strong>600 kgCO2e/m2</strong> (non-domestic)</li>
              <li>MEP embodied carbon: <strong>15-25%</strong> of building total</li>
              <li>MEP services benchmark: <strong>100-200 kgCO2e/m2</strong></li>
              <li>Standard study period: <strong>60 years</strong></li>
              <li>Typical equipment lives: HVAC plant 20-25 years, lighting 15 years</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Ignoring B4 replacements</strong> - can double MEP embodied carbon</li>
                <li><strong>Using outdated carbon factors</strong> - grid decarbonisation changes B6</li>
                <li><strong>Omitting refrigerant leakage</strong> - can be 50%+ of HVAC carbon</li>
                <li><strong>Mixing data quality levels</strong> without documentation</li>
                <li><strong>Including Module D in main totals</strong> - must report separately</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="WLCA at Stage 4 reveals embodied is now bigger than operational"
            situation={
              <>
                A net-zero-aligned office building is targeting LETI Band B for both operational EUI (≤55 kWh/m²/year) and embodied carbon A1–A5 (≤625 kgCO₂e/m²). Stage 4 WLCA shows operational carbon (60-year life) at 850 kgCO₂e/m² (15 kWh/m²/year × 0.140 kgCO₂/kWh × 60 years), but embodied (A1–A5) at 720 kgCO₂e/m² — over the LETI band B target.
              </>
            }
            whatToDo={
              <>
                Embodied carbon reduction strategies in M&E: (1) re-use rather than replace switchgear, distribution boards, key MEP plant where possible; (2) specify EPD-backed plant with high recycled content (chillers, AHUs); (3) substitute aluminium for copper cabling where current rating allows; (4) reduce belt-and-braces over-specification (containment sized for actual cable population, not 100% spare capacity); (5) refrigerant choice — R32, R454B, R290 over R410A. Combined, these typically yield 15-30% A1–A5 reduction. Re-model and verify against the LETI band.
              </>
            }
            whyItMatters={
              <>
                Operational carbon falls every year as the grid decarbonises — embodied is once-and-done. For a building completing in 2026 with a 60-year life, embodied may already be larger than operational over the lifetime. M&E embodied is dominated by metals (switchgear, cabling, refrigeration plant); M&E designers must now manage embodied as a first-order design decision, not an afterthought.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "WLCA = embodied + operational carbon over building life per EN 15978.",
              "RICS WLCA 2nd edition (July 2024) is the UK methodology.",
              "A1–A5 embodied = product + construction stages (the headline number).",
              "B1–B5 use phase + C1–C4 end-of-life round out WLCA.",
              "EPDs (EN 15804) primary data source; ICE database fallback.",
              "M&E embodied dominated by metals — reuse > recycle > new with high recycled.",
              "GLA London Plan + BREEAM + private clients increasingly mandate WLCA submission.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section6-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Integrated design process
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section6-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Circular economy principles
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section6_4;
