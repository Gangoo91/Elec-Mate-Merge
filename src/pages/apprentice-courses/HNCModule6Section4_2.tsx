/**
 * Module 6 · Section 4 · Subsection 2 — Operational Carbon
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Energy-related emissions, regulated vs unregulated loads, benchmarking methodologies, and carbon reduction strategies
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

const TITLE = 'Operational Carbon - HNC Module 6 Section 4.2';
const DESCRIPTION =
  'Master operational carbon assessment for building services: energy-related emissions, regulated vs unregulated loads, benchmarking methodologies, and carbon reduction strategies.';

const quickCheckQuestions = [
  {
    id: 'operational-carbon-definition',
    question: 'What does operational carbon refer to?',
    options: [
      'Carbon emitted during construction',
      'Carbon emissions from building materials production',
      'Carbon sequestered by building vegetation',
      'Carbon emissions from energy use during building operation',
    ],
    correctIndex: 3,
    explanation:
      "Operational carbon refers to the greenhouse gas emissions resulting from the energy consumed during the operational phase of a building - heating, cooling, lighting, ventilation, and equipment use over the building's lifetime.",
  },
  {
    id: 'regulated-energy',
    question: 'Which of these is classified as a regulated energy load under Part L?',
    options: [
      'Lifts and escalators',
      'Desktop computers and monitors',
      'Kitchen appliances in a commercial building',
      'Space heating from the central HVAC system',
    ],
    correctIndex: 3,
    explanation:
      'Regulated loads are those controlled by Building Regulations Part L and include fixed building services: heating, cooling, hot water, ventilation, and fixed lighting. Space heating from central HVAC is regulated; computers, kitchen appliances, and lifts are unregulated.',
  },
  {
    id: 'eui-benchmark',
    question: 'What does Energy Use Intensity (EUI) measure?',
    options: [
      'Energy consumption per unit floor area per year (kWh/m²/year)',
      'Events that are likely to happen or could reasonably be expected',
      'Record the significant findings of the COSHH assessment in writing',
      'Report it to their employer and seek occupational health assessment',
    ],
    correctIndex: 0,
    explanation:
      'Energy Use Intensity (EUI) measures energy consumption normalised by floor area, typically expressed as kWh/m²/year. This allows meaningful comparison between buildings of different sizes and enables benchmarking against sector targets.',
  },
  {
    id: 'carbon-hierarchy',
    question: 'In the carbon reduction hierarchy, which action should be prioritised first?',
    options: [
      'PVC degrades above 70°C — then it cracks, then it burns',
      'Power supplied to field devices through communication cables',
      'Reduce energy demand through fabric and efficiency',
      'When additional insulation or identification is required',
    ],
    correctIndex: 2,
    explanation:
      'The carbon reduction hierarchy prioritises actions: first reduce demand (fabric efficiency, controls, behaviour), then improve system efficiency, then decarbonise supply (renewables, low-carbon fuels), and only offset as a last resort for residual emissions.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'According to CIBSE TM46, what is the typical electricity benchmark for a general office building?',
    options: [
      '50 kWh/m²/year',
      '95 kWh/m²/year',
      '150 kWh/m²/year',
      '220 kWh/m²/year',
    ],
    correctAnswer: 1,
    explanation:
      'CIBSE TM46 provides benchmark values for Display Energy Certificates. A general office has a typical electricity benchmark of 95 kWh/m²/year and fossil-thermal benchmark of 120 kWh/m²/year.',
  },
  {
    id: 2,
    question:
      "What percentage of a typical commercial building's total carbon footprint does operational carbon represent over a 60-year lifespan?",
    options: [
      '90-95%',
      '20-30%',
      '60-80%',
      '40-50%',
    ],
    correctAnswer: 2,
    explanation:
      "Operational carbon typically accounts for 60-80% of a building's whole-life carbon footprint over a 60-year period. As the grid decarbonises and buildings become more efficient, this proportion is decreasing, making embodied carbon relatively more significant.",
  },
  {
    id: 3,
    question:
      'Which document defines the methodology for calculating regulated energy in new buildings?',
    options: [
      'Yes, but only under supervision',
      'Building Management System',
      'Check documentation and plan tests',
      'SAP/SBEM (Part L compliance)',
    ],
    correctAnswer: 3,
    explanation:
      'SAP (Standard Assessment Procedure) for dwellings and SBEM (Simplified Building Energy Model) for non-domestic buildings are the approved methodologies under Part L for calculating regulated energy and carbon emissions for Building Regulations compliance.',
  },
  {
    id: 4,
    question:
      'In a typical office building, unregulated loads (plug loads) typically account for what percentage of total electricity consumption?',
    options: [
      '25-40%',
      '10-20%',
      '50-60%',
      '70-80%',
    ],
    correctAnswer: 0,
    explanation:
      "Unregulated loads (computers, equipment, small power) typically account for 25-40% of total electricity consumption in offices. This significant proportion is not addressed by Part L compliance, creating a 'performance gap' between design predictions and actual consumption.",
  },
  {
    id: 5,
    question: 'What is the UK grid electricity carbon factor used for 2025 carbon calculations?',
    options: [
      '0.136 kgCO₂e/kWh',
      '0.193 kgCO₂e/kWh',
      '0.519 kgCO₂e/kWh',
      '0.233 kgCO₂e/kWh',
    ],
    correctAnswer: 1,
    explanation:
      'The UK grid electricity carbon factor for 2025 is approximately 0.193 kgCO₂e/kWh (SAP 10.2 methodology). This represents significant decarbonisation from historical values (0.519 in 2013) due to renewable energy growth and coal phase-out.',
  },
  {
    id: 6,
    question: 'Display Energy Certificates (DECs) are required for which buildings?',
    options: [
      'Investigate, rectify, and retest before certification',
      'Not all loads operate at maximum simultaneously',
      'Public buildings over 250m² frequently visited by the public',
      'Adjusting artificial lighting based on available natural light',
    ],
    correctAnswer: 2,
    explanation:
      'DECs are required for public authority buildings over 250m² that are frequently visited by the public. They display actual measured energy performance (A-G rating) based on operational data, unlike EPCs which show design predictions.',
  },
  {
    id: 7,
    question:
      'Which strategy provides the greatest operational carbon reduction per pound invested in a typical existing building?',
    options: [
      'Installing solar PV panels',
      'Installing battery storage',
      'Replacing the boiler with a heat pump',
      'Upgrading to LED lighting with controls',
    ],
    correctAnswer: 3,
    explanation:
      'LED lighting upgrades with intelligent controls typically offer the best carbon reduction per pound invested, with payback periods of 2-4 years and 60-80% energy savings. They also reduce cooling loads. Heat pumps and PV are effective but have longer paybacks.',
  },
  {
    id: 8,
    question: "What does the term 'performance gap' refer to in building energy?",
    options: [
      'The difference between design predictions and actual operational energy consumption',
      'The gap between renewable generation and demand',
      'The difference between summer and winter energy use',
      'The difference between peak and baseload consumption',
    ],
    correctAnswer: 0,
    explanation:
      'The performance gap refers to the difference between predicted energy consumption (from design calculations like SBEM) and actual measured operational consumption. Studies show buildings often use 2-5 times more energy than predicted.',
  },
  {
    id: 9,
    question:
      'According to LETI (London Energy Transformation Initiative), what is the target operational energy use intensity for a new office building?',
    options: [
      '35 kWh/m²/year',
      '55 kWh/m²/year',
      '90 kWh/m²/year',
      '120 kWh/m²/year',
    ],
    correctAnswer: 1,
    explanation:
      'LETI recommends an operational EUI target of 55 kWh/m²/year for new office buildings to achieve net zero carbon. This is significantly lower than typical practice (150-300 kWh/m²/year) and requires integrated design, efficient systems, and good controls.',
  },
  {
    id: 10,
    question:
      'Which building services system typically has the highest operational carbon impact in a UK office building?',
    options: [
      'Basic operation verification',
      'Cat5e or higher Ethernet cable',
      'Space heating and cooling',
      'Reduce current or resistance',
    ],
    correctAnswer: 2,
    explanation:
      'Space heating and cooling (HVAC) typically accounts for 40-50% of operational energy in UK office buildings, making it the largest contributor to operational carbon. This makes HVAC efficiency and low-carbon heating critical for decarbonisation.',
  },
  {
    id: 11,
    question: "What is sub-metering's primary role in operational carbon management?",
    options: [
      'The module\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s communication address and point configuration',
      'Heat cannot dissipate effectively through thermal insulation',
      'A detailed assessment focused on a particular activity or operation',
      'To identify consumption patterns and target reduction opportunities',
    ],
    correctAnswer: 3,
    explanation:
      'Sub-metering enables disaggregation of energy consumption by end-use, time, and zone. This data identifies inefficiencies, tracks performance against benchmarks, verifies savings from interventions, and supports behavioural change programmes.',
  },
  {
    id: 12,
    question: 'In the NABERS UK energy rating scheme, what does a 5-star rating represent?',
    options: [
      'Market-leading, exceptional performance',
      'Good practice performance',
      'Minimum legal compliance',
      'Typical market performance',
    ],
    correctAnswer: 0,
    explanation:
      'NABERS UK rates operational energy performance from 1 to 6 stars. A 5-star rating represents market-leading performance (top 10-15% of buildings). A 6-star rating indicates exceptional, aspirational performance beyond current best practice.',
  },
];

const faqs = [
  {
    question: 'What is the difference between regulated and unregulated energy?',
    answer:
      'Regulated energy covers fixed building services controlled by Building Regulations Part L: heating, cooling, ventilation, hot water, and fixed lighting. Unregulated energy covers all other uses: plug loads (computers, equipment), catering, lifts, external lighting, and process loads. Part L compliance calculations only address regulated energy, yet unregulated loads often account for 25-40% of actual consumption in commercial buildings.',
  },
  {
    question: 'How is operational carbon calculated?',
    answer:
      'Operational carbon is calculated by multiplying energy consumption by appropriate carbon emission factors. For electricity: kWh consumed × grid carbon factor (currently ~0.193 kgCO₂e/kWh). For gas: kWh consumed × 0.183 kgCO₂e/kWh (including upstream emissions). Total operational carbon = (electricity × electricity factor) + (gas × gas factor) + (other fuels × respective factors). Results are typically expressed as kgCO₂e/m²/year.',
  },
  {
    question: "Why does a 'performance gap' exist between design and operation?",
    answer:
      "The performance gap arises from multiple factors: design assumptions differ from actual occupancy/usage patterns; unregulated loads aren't included in compliance calculations; commissioning may be incomplete; controls aren't optimised; building fabric may underperform due to construction quality; and occupant behaviour varies from assumptions. Studies show actual consumption is typically 2-5 times higher than design predictions.",
  },
  {
    question: "How do I benchmark a building's operational performance?",
    answer:
      "Use CIBSE TM46 benchmarks for DECs (typical and good practice values by building type), LETI targets for new buildings, or NABERS UK ratings for offices. Calculate your building's EUI (total energy ÷ floor area), then compare against the appropriate benchmark. Consider normalising for occupancy hours, climate (degree days), and building type. Separate analysis of electricity and fossil fuels provides additional insight.",
  },
  {
    question: 'What operational carbon reduction strategies are most effective?',
    answer:
      'The most effective strategies follow the carbon hierarchy: 1) Reduce demand through improved controls, BMS optimisation, and occupancy scheduling; 2) Improve efficiency via LED lighting, variable speed drives, and heat recovery; 3) Decarbonise supply through heat pumps, solar PV, and green electricity tariffs; 4) Monitor and verify through sub-metering and M&V protocols. Quick wins include lighting controls, HVAC scheduling, and plug load management.',
  },
  {
    question: 'How will grid decarbonisation affect operational carbon strategies?',
    answer:
      "As the UK grid decarbonises (targeting 100% clean power by 2035), electricity's carbon factor will decrease significantly. This makes electrification (heat pumps, induction cooking) increasingly advantageous over gas. However, it also means embodied carbon becomes proportionally more significant in whole-life assessments. Design strategies should prioritise energy efficiency regardless of carbon factors, as this future-proofs buildings and reduces costs.",
  },
];

const HNCModule6Section4_2 = () => {
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
            eyebrow="Module 6 · Section 4 · Subsection 2"
            title="Operational Carbon"
            description="Energy-related emissions, regulated vs unregulated loads, benchmarking methodologies, and carbon reduction strategies"
            tone="purple"
          />

          <TLDR
            points={[
              "Operational carbon is in-use energy emissions — regulated loads (heating, cooling, ventilation, lighting, hot water — covered by Part L) plus unregulated loads (small power, IT, lifts, kitchen, vertical transport — outside Part L but typically 30–60% of actual use).",
              "The carbon intensity of UK electricity has fallen from 460 gCO₂/kWh (2014) to ~140 gCO₂/kWh (2024) — making electrification the fastest carbon win for heating.",
              "Energy Use Intensity (EUI, kWh/m²/year) is the headline benchmark — LETI 2030 targets are 35 (residential), 55 (offices), 65 (schools) kWh/m²/year for net-zero-aligned new build.",
            ]}
          />

          <RegsCallout
            source="GLA (London Plan) Energy Hierarchy + LETI Climate Emergency Design Guide + RIBA 2030 Climate Challenge"
            clause="New major developments in London shall demonstrate compliance with the energy hierarchy: (1) Be Lean — use less energy through fabric and passive design; (2) Be Clean — supply energy efficiently using low-carbon heat; (3) Be Green — exploit local renewable resources. The proposal shall achieve at least a 35% reduction in regulated CO₂ emissions beyond Part L requirements, with the residual emissions offset through a payment to the carbon offset fund."
            meaning={
              <>
                The London Plan energy hierarchy + 35% improvement is the toughest UK regional standard — most other authorities are catching up. RIBA 2030 Climate Challenge sets voluntary EUI targets for all UK practice; LETI design guides translate these into specific m²/W limits, lighting density limits, and DHW design rules.
              </>
            }
            cite="Source: London Plan 2021 Policy SI2 — london.gov.uk; RIBA 2030 Climate Challenge — riba.org"
          />

          <LearningOutcomes
            outcomes={[
              "Define operational carbon and its relationship to building energy use",
              "Distinguish between regulated and unregulated energy loads",
              "Apply benchmarking methodologies including CIBSE TM46 and EUI metrics",
              "Explain the carbon reduction hierarchy and prioritisation",
              "Identify effective reduction strategies for building services",
              "Calculate operational carbon using appropriate emission factors",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Understanding Operational Carbon">
            <p>Operational carbon encompasses all greenhouse gas emissions resulting from energy consumption during a building's use phase. Over a typical 60-year building lifespan, operational carbon represents 60-80% of whole-life carbon emissions, making it the primary focus for decarbonisation efforts.</p>
            <p><strong>Key components of operational carbon:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Direct emissions (Scope 1):</strong> On-site fuel combustion (gas boilers, generators)</li>
              <li><strong>Indirect emissions (Scope 2):</strong> Purchased electricity and district heating</li>
              <li><strong>Energy sources:</strong> Grid electricity, natural gas, oil, biomass, district systems</li>
              <li><strong>End uses:</strong> Heating, cooling, ventilation, lighting, equipment, hot water</li>
            </ul>
            <p><strong>Operational Carbon Calculation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Grid electricity:</strong> 0.193 kgCO₂e/kWh — SAP 10.2 methodology; decreasing annually</li>
              <li><strong>Natural gas:</strong> 0.183 kgCO₂e/kWh — Including upstream emissions; relatively stable</li>
              <li><strong>Heating oil:</strong> 0.247 kgCO₂e/kWh — Higher than gas; declining use</li>
              <li><strong>LPG:</strong> 0.214 kgCO₂e/kWh — Common in off-grid locations</li>
              <li><strong>Biomass (wood pellets):</strong> 0.015 kgCO₂e/kWh — Low operational carbon; consider supply chain</li>
            </ul>
            <p><strong>Grid Decarbonisation Trajectory</strong></p>
            <p><strong>2013:</strong> 0.519 kgCO₂e/kWh (coal-heavy mix)</p>
            <p><strong>2020:</strong> 0.233 kgCO₂e/kWh (renewable growth)</p>
            <p><strong>2025:</strong> 0.193 kgCO₂e/kWh (current)</p>
            <p><strong>2035 target:</strong> Near zero (100% clean power commitment)</p>
            <p>This trajectory makes electrification (heat pumps) increasingly advantageous over gas heating.</p>
            <p><strong>Design implication:</strong> As grid electricity decarbonises, operational carbon reduction increasingly depends on energy efficiency rather than fuel switching.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Regulated vs Unregulated Energy">
            <p>Building Regulations Part L distinguishes between regulated energy (controlled by compliance calculations) and unregulated energy (not addressed by Part L). Understanding this distinction is crucial for predicting actual building performance and closing the 'performance gap'.</p>
            <p><strong>Regulated Loads (Part L)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Space heating systems (boilers, heat pumps)</li>
              <li>Space cooling (chillers, DX systems)</li>
              <li>Mechanical ventilation (AHUs, extract fans)</li>
              <li>Domestic hot water heating</li>
              <li>Fixed internal lighting</li>
              <li>Pumps and fans for HVAC</li>
            </ul>
            <p><strong>Unregulated Loads (Not Part L)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Plug loads (computers, monitors, equipment)</li>
              <li>Server rooms and data centres</li>
              <li>Lifts and escalators</li>
              <li>Catering equipment</li>
              <li>External and decorative lighting</li>
              <li>Process loads and specialist equipment</li>
            </ul>
            <p><strong>Typical Energy Split by Building Type</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>General office:</strong> 60-75% — 25-40% — IT equipment, small power, lifts</li>
              <li><strong>Retail (large):</strong> 50-65% — 35-50% — Refrigeration, escalators, display</li>
              <li><strong>Hospital:</strong> 45-60% — 40-55% — Medical equipment, catering, lifts</li>
              <li><strong>School:</strong> 70-85% — 15-30% — IT suites, catering, sports facilities</li>
              <li><strong>Hotel:</strong> 55-70% — 30-45% — Catering, laundry, lifts, leisure</li>
            </ul>
            <p><strong>The Performance Gap</strong></p>
            <p>Buildings typically consume 2-5 times more energy than Part L predictions because:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Unregulated loads are excluded from compliance calculations</li>
              <li>• Actual occupancy patterns differ from design assumptions</li>
              <li>• Systems may not be properly commissioned or maintained</li>
              <li>• Occupant behaviour varies from modelled assumptions</li>
              <li>• Building fabric may underperform due to construction quality</li>
            </ul>
            <p><strong>Practical implication:</strong> Design teams should model total energy (regulated + unregulated) to predict realistic performance and set meaningful operational targets.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Benchmarking Methodologies">
            <p>Benchmarking enables comparison of building performance against industry standards and best practice. The primary metric is Energy Use Intensity (EUI), expressed as kWh/m²/year, which normalises consumption by floor area for meaningful comparison.</p>
            <p><strong>Energy Use Intensity (EUI) Calculation</strong></p>
            <p><span>EUI =</span> Total Annual Energy Consumption (kWh) ÷ Gross Internal Area (m²)</p>
            <p><span>Example office building:</span></p>
            <p>Annual electricity: 475,000 kWh</p>
            <p>Annual gas: 300,000 kWh</p>
            <p>GIA: 5,000 m²</p>
            <p>EUI = (475,000 + 300,000) ÷ 5,000 = 155 kWh/m²/year</p>
            <p><strong>CIBSE TM46 Benchmarks (Selected Building Types)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>General office (nat vent):</strong> 95 — 120 — ~130</li>
              <li><strong>General office (air-con):</strong> 128 — 107 — ~160</li>
              <li><strong>Primary school:</strong> 32 — 113 — ~100</li>
              <li><strong>Hospital (clinical):</strong> 90 — 300 — ~280</li>
              <li><strong>Hotel:</strong> 105 — 200 — ~220</li>
              <li><strong>Retail (supermarket):</strong> 365 — 105 — ~350</li>
            </ul>
            <p><strong>LETI Net Zero Targets</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Office:</strong> 55 kWh/m²/year</li>
              <li><strong>School:</strong> 65 kWh/m²/year</li>
              <li><strong>Residential:</strong> 35 kWh/m²/year</li>
              <li><strong>Hotel:</strong> 85 kWh/m²/year</li>
              <li><strong>Retail:</strong> 70 kWh/m²/year</li>
            </ul>
            <p>Total operational energy including unregulated</p>
            <p><strong>NABERS UK Rating Scale</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>6 stars:</strong> Exceptional (market-leading)</li>
              <li><strong>5 stars:</strong> Excellent (top 10-15%)</li>
              <li><strong>4 stars:</strong> Good (above average)</li>
              <li><strong>3 stars:</strong> Average (typical)</li>
              <li><strong>2 stars:</strong> Below average</li>
              <li><strong>1 star:</strong> Poor performance</li>
            </ul>
            <p>Based on actual metered performance</p>
            <p><strong>Display Energy Certificate (DEC) Ratings</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>A (0-25):</strong> Exceptional performance, significantly below benchmark</li>
              <li><strong>B (26-50):</strong> Good performance, below benchmark</li>
              <li><strong>C (51-75):</strong> Typical performance, around benchmark</li>
              <li><strong>D (76-100):</strong> At benchmark (D100 = TM46 typical value)</li>
              <li><strong>E-G (101+):</strong> Above benchmark, poor performance</li>
            </ul>
            <p><strong>Benchmarking tip:</strong> Always compare like with like - normalise for occupancy hours, climate zone, and building function before drawing conclusions.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Carbon Reduction Strategies">
            <p>The carbon reduction hierarchy prioritises strategies by effectiveness and permanence. Following this hierarchy ensures resources are directed to interventions with the greatest impact and longest-lasting benefits.</p>
            <p><strong>Carbon Reduction Hierarchy</strong></p>
            <p><strong>Reduce Demand</strong></p>
            <p>Fabric efficiency, controls optimisation, occupancy scheduling, behaviour change</p>
            <p><strong>Improve Efficiency</strong></p>
            <p>LED lighting, variable speed drives, heat recovery, high-efficiency plant</p>
            <p><strong>Decarbonise Supply</strong></p>
            <p>Heat pumps, solar PV, green tariffs, district heating, biomass</p>
            <p><strong>Offset Residual</strong></p>
            <p>Carbon credits, verified offsets (last resort for unavoidable emissions)</p>
            <p><strong>Building Services Reduction Strategies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lighting:</strong> LED retrofit with DALI controls — 60-80% — 2-4 years</li>
              <li><strong>HVAC:</strong> Variable speed drives on fans/pumps — 30-50% — 2-3 years</li>
              <li><strong>Heating:</strong> Air source heat pump (replacing gas) — 60-70% carbon — 7-12 years</li>
              <li><strong>Controls:</strong> BMS optimisation and scheduling — 10-20% — 1-2 years</li>
              <li><strong>Ventilation:</strong> Demand-controlled ventilation (CO₂) — 20-40% — 3-5 years</li>
              <li><strong>Generation:</strong> Rooftop solar PV — 10-30% electricity — 6-10 years</li>
            </ul>
            <p><strong>Quick Wins (Low Cost, High Impact)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>HVAC scheduling optimisation</li>
              <li>Setpoint adjustments (±1°C = ~8% energy)</li>
              <li>Lighting time scheduling</li>
              <li>Equipment switch-off campaigns</li>
              <li>Boiler/chiller sequencing</li>
            </ul>
            <p><strong>Strategic Investments (Higher Cost, Transformational)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heat pump installation</li>
              <li>Building fabric upgrades</li>
              <li>Solar PV with battery storage</li>
              <li>Full LED lighting replacement</li>
              <li>Advanced BMS with AI optimisation</li>
            </ul>
            <p><strong>Monitoring and Verification (M&V)</strong></p>
            <p>Essential for demonstrating actual savings and maintaining performance:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• <strong>Sub-metering:</strong> Disaggregate consumption by end-use (lighting, HVAC, small power)</li>
              <li>• <strong>Baselining:</strong> Establish pre-intervention performance for comparison</li>
              <li>• <strong>Normalisation:</strong> Adjust for weather (degree days) and occupancy</li>
              <li>• <strong>IPMVP:</strong> International Performance Measurement and Verification Protocol</li>
              <li>• <strong>Continuous monitoring:</strong> Automated alerts for performance drift</li>
            </ul>
            <p><strong>Key principle:</strong> The cheapest and cleanest kilowatt-hour is the one you never use. Prioritise demand reduction before considering renewable generation.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Calculating Operational Carbon</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate annual operational carbon for an office building.</p>
            <p>Given data:</p>
            <p>Annual electricity: 450,000 kWh</p>
            <p>Annual gas: 280,000 kWh</p>
            <p>GIA: 4,000 m²</p>
            <p>Carbon factors (2025):</p>
            <p>Electricity: 0.193 kgCO₂e/kWh</p>
            <p>Gas: 0.183 kgCO₂e/kWh</p>
            <p>Calculation:</p>
            <p>Electricity carbon = 450,000 × 0.193 = 86,850 kgCO₂e</p>
            <p>Gas carbon = 280,000 × 0.183 = 51,240 kgCO₂e</p>
            <p>Total carbon = 86,850 + 51,240 = 138,090 kgCO₂e</p>
            <p>Carbon intensity = 138,090 ÷ 4,000 = 34.5 kgCO₂e/m²/year</p>
            <p>EUI = (450,000 + 280,000) ÷ 4,000 = 182.5 kWh/m²/year</p>
            <p>
              <strong>Example 2: DEC Rating Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Determine the DEC rating for a naturally ventilated office.</p>
            <p>Building data:</p>
            <p>Actual electricity: 75 kWh/m²/year</p>
            <p>Actual gas (heating): 95 kWh/m²/year</p>
            <p>TM46 benchmarks (nat vent office):</p>
            <p>Electricity benchmark: 95 kWh/m²</p>
            <p>Fossil-thermal benchmark: 120 kWh/m²</p>
            <p>Calculate Operational Rating (OR):</p>
            <p>Electricity ratio = 75 ÷ 95 = 0.79</p>
            <p>Gas ratio = 95 ÷ 120 = 0.79</p>
            <p>Weighted OR ≈ 79</p>
            <p>DEC Rating = C (OR 79 falls in 51-75 band)</p>
            <p>This building performs 21% better than the TM46 typical benchmark</p>
            <p>
              <strong>Example 3: LED Retrofit Carbon Savings</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate carbon and cost savings from LED lighting upgrade.</p>
            <p>Current system:</p>
            <p>Fluorescent lighting: 45,000 kWh/year</p>
            <p>Operating hours: 2,500 hrs/year</p>
            <p>LED system:</p>
            <p>Expected consumption: 18,000 kWh/year (60% reduction)</p>
            <p>Carbon calculation:</p>
            <p>Current carbon = 45,000 × 0.193 = 8,685 kgCO₂e</p>
            <p>LED carbon = 18,000 × 0.193 = 3,474 kgCO₂e</p>
            <p>Carbon saving = 5,211 kgCO₂e/year (60% reduction)</p>
            <p>Cost calculation (at £0.28/kWh):</p>
            <p>Energy saving = 27,000 kWh/year</p>
            <p>Cost saving = £7,560/year</p>
            <p>Project cost: £22,000</p>
            <p>Simple payback = 2.9 years</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Operational Carbon Assessment Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Collect at least 12 months of energy bills (electricity, gas, other fuels)</li>
              <li>Verify floor area (GIA) and determine building classification</li>
              <li>Calculate EUI and compare against CIBSE TM46 benchmarks</li>
              <li>Apply current carbon factors to calculate emissions</li>
              <li>Identify regulated vs unregulated load split where possible</li>
              <li>Document occupancy patterns and operating hours</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Electricity carbon factor: <strong>0.193 kgCO₂e/kWh</strong> (2025)</li>
              <li>Gas carbon factor: <strong>0.183 kgCO₂e/kWh</strong></li>
              <li>Typical office EUI: <strong>150-250 kWh/m²/year</strong></li>
              <li>LETI office target: <strong>55 kWh/m²/year</strong></li>
              <li>Performance gap: <strong>2-5× design predictions</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Ignoring unregulated loads</strong> - they can be 25-40% of total consumption</li>
                <li><strong>Using outdated carbon factors</strong> - grid electricity factors change annually</li>
                <li><strong>Comparing dissimilar buildings</strong> - always normalise for type and occupancy</li>
                <li><strong>Offsetting before reducing</strong> - follow the carbon hierarchy correctly</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="Performance gap of 70% on a Part L compliant office"
            situation={
              <>
                An office achieved Part L compliance with predicted EUI of 75 kWh/m²/year (regulated only). Twelve months of half-hourly metering shows actual total EUI at 195 kWh/m²/year — 2.6× design. Of the gap, ~30 kWh/m² is unregulated load (IT, kitchens, lifts) not modelled in SBEM, and ~90 kWh/m² is operational drift (BMS schedules, HVAC overrides, weekend running).
              </>
            }
            whatToDo={
              <>
                Convene a performance review — typically the BMS commissioning engineer, FM team, tenant occupier and original M&E designer. Verify (1) BMS scheduling matches commissioned strategy; (2) HVAC setpoints have not drifted; (3) lighting controls are functioning. Re-commission to design intent. Engage tenant on small power baseline (PCs, multi-screens, kitchen plug load). Set up annual TM22 energy audit to track. Report findings via a CIBSE TM63 In-Use Performance review.
              </>
            }
            whyItMatters={
              <>
                Part L design compliance is the floor, not the target. Net-zero-aligned buildings need post-occupancy verification — the gap between predicted and actual energy use is typically 30–80% for non-domestic, and the difference is mostly operational, not design. Soft Landings + TM63 + ISO 50001 are the institutional response.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Regulated loads = HVAC, lighting, hot water (covered by Part L).",
              "Unregulated loads = IT, small power, lifts, catering — outside Part L but 30–60% of real-world use.",
              "Grid carbon intensity falling — 460 gCO₂/kWh (2014) to ~140 (2024).",
              "EUI (Energy Use Intensity) headline benchmark in kWh/m²/year.",
              "LETI 2030 targets: 35 (resi), 55 (office), 65 (school) kWh/m²/year.",
              "Performance gap typically 30–80% non-dom — mostly operational schedule drift.",
              "CIBSE TM22 (energy audit) + TM61–63 (in-use performance) = the operational toolkit.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section4-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Carbon fundamentals
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section4-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Embodied carbon
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section4_2;
