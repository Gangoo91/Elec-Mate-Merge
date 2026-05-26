/**
 * Module 6 · Section 4 · Subsection 1 — Carbon Fundamentals
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Carbon accounting, GHG Protocol, Scope 1/2/3 emissions, emission factors, and reporting frameworks for building services
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

const TITLE = 'Carbon Fundamentals - HNC Module 6 Section 4.1';
const DESCRIPTION =
  'Master carbon accounting fundamentals for building services: GHG Protocol, Scope 1/2/3 emissions, emission factors, carbon intensity, CO2e calculations, and reporting frameworks for electrical installations.';

const quickCheckQuestions = [
  {
    id: 'ghg-protocol',
    question: 'What is the primary purpose of the GHG Protocol?',
    options: [
      'To set clear expectations, goals, boundaries, and review dates for the mentoring relationship',
      'Comprehensive testing schedules and digital submission capability',
      'To provide a standardised framework for measuring and reporting greenhouse gas emissions',
      'Because the kilogram is the unit of mass; weight is a force, and force has its own unit',
    ],
    correctIndex: 2,
    explanation:
      'The GHG Protocol provides a standardised framework for organisations to measure, manage, and report their greenhouse gas emissions. It is the most widely used international accounting standard for carbon emissions.',
  },
  {
    id: 'scope-2-definition',
    question: 'Scope 2 emissions in the GHG Protocol refer to:',
    options: [
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013',
      'Poor connections in protective conductor path',
      'Indirect emissions from purchased electricity, heat, and steam',
      'Maintained in an efficient state, in efficient working order and in good repair',
    ],
    correctIndex: 2,
    explanation:
      'Scope 2 covers indirect emissions from the generation of purchased electricity, steam, heating, and cooling consumed by the reporting organisation. For buildings, this is typically the largest emission source.',
  },
  {
    id: 'co2e-meaning',
    question: 'What does CO2e (carbon dioxide equivalent) represent?',
    options: [
      'A metric converting all GHGs to equivalent CO2 impact based on global warming potential',
      'It allows appropriate response to the unexpected while maintaining focus on priorities',
      'To evaluate risks by likelihood and impact to prioritise responses',
      'It can move palletised loads of much greater weight with minimal effort',
    ],
    correctIndex: 0,
    explanation:
      'CO2e converts all greenhouse gases to their equivalent impact in terms of carbon dioxide, using their global warming potential (GWP). This allows different gases like methane and nitrous oxide to be compared on a common scale.',
  },
  {
    id: 'emission-factor-unit',
    question: 'What is the typical unit for UK grid electricity emission factors?',
    options: [
      'kW/CO2',
      'CO2/year',
      'tonnes/MW',
      'kgCO2e/kWh',
    ],
    correctIndex: 3,
    explanation:
      'UK grid emission factors are expressed in kgCO2e/kWh (kilograms of carbon dioxide equivalent per kilowatt-hour). This allows direct calculation of emissions by multiplying energy consumption by the emission factor.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which organisation publishes the most widely used greenhouse gas accounting standards?',
    options: [
      'Systems designed to fail in a safe condition',
      'World Resources Institute and WBCSD (GHG Protocol)',
      'Only long enough to confirm operation (short duration)',
      'Measure and check against the drawing',
    ],
    correctAnswer: 1,
    explanation:
      'The GHG Protocol, developed by the World Resources Institute and World Business Council for Sustainable Development, is the most widely used international accounting standard for greenhouse gas emissions.',
  },
  {
    id: 2,
    question:
      'A gas boiler in an office building produces direct combustion emissions. Which scope category applies?',
    options: [
      'Scope 3',
      'Scope 0',
      'Scope 1',
      'Scope 2',
    ],
    correctAnswer: 2,
    explanation:
      'Scope 1 covers direct emissions from sources owned or controlled by the organisation, including combustion of fuels in stationary equipment like boilers and furnaces.',
  },
  {
    id: 3,
    question:
      'An office building consumes 500,000 kWh of electricity annually. Using an emission factor of 0.207 kgCO2e/kWh, what are the Scope 2 emissions?',
    options: [
      'Adapting to technical progress',
      'Decreases UGR (better glare control)',
      'Green and yellow bi-colour',
      '103,500 kgCO2e (103.5 tCO2e)',
    ],
    correctAnswer: 3,
    explanation:
      'Emissions = Consumption × Emission Factor = 500,000 kWh × 0.207 kgCO2e/kWh = 103,500 kgCO2e or 103.5 tonnes CO2e.',
  },
  {
    id: 4,
    question: 'Which of the following is NOT a Scope 3 emission category?',
    options: [
      'Electricity consumed in owned buildings',
      'Purchased goods and services',
      'Business travel by employees',
      'Waste generated in operations',
    ],
    correctAnswer: 0,
    explanation:
      'Electricity consumed in owned buildings is a Scope 2 emission (indirect from purchased energy). Scope 3 covers all other indirect emissions in the value chain including business travel, purchased goods, and waste.',
  },
  {
    id: 5,
    question: 'The UK grid carbon intensity has been decreasing primarily due to:',
    options: [
      'Large UK companies and LLPs meeting size thresholds',
      'Growth in renewable energy and phase-out of coal',
      'Electricity consumed in owned buildings',
      'Grid average emission factors for the region',
    ],
    correctAnswer: 1,
    explanation:
      'UK grid carbon intensity has fallen dramatically due to the growth of renewable energy (especially offshore wind) and the phase-out of coal-fired power stations. The UK grid is now one of the lowest carbon in Europe.',
  },
  {
    id: 6,
    question: 'What is the global warming potential (GWP) of methane (CH4) over 100 years?',
    options: [
      '1',
      'Approximately 265',
      'Approximately 28',
      'Approximately 1,000',
    ],
    correctAnswer: 2,
    explanation:
      'Methane has a GWP of approximately 28 over 100 years, meaning 1 tonne of methane has the same warming effect as 28 tonnes of CO2. This is why methane leaks from gas systems are significant.',
  },
  {
    id: 7,
    question:
      'For a building with both gas heating and electric cooling, the gas consumption would be reported under:',
    options: [
      'Both Scope 1 and Scope 2',
      'Scope 2 only',
      'Scope 3 only',
      'Scope 1 only',
    ],
    correctAnswer: 3,
    explanation:
      'Gas combustion in on-site boilers is a direct emission (Scope 1). The electricity for cooling would be Scope 2. Gas consumption is always Scope 1 when burned on-site, regardless of the end use.',
  },
  {
    id: 8,
    question: "The 'location-based' method for Scope 2 accounting uses:",
    options: [
      'Grid average emission factors for the region',
      'Renewable energy certificates',
      'Supplier-specific emission factors',
      'Actual measured emissions at the power station',
    ],
    correctAnswer: 0,
    explanation:
      'Location-based Scope 2 accounting uses grid average emission factors for the geographic location where electricity is consumed, reflecting the average emissions intensity of the local grid.',
  },
  {
    id: 9,
    question: 'Which reporting framework requires disclosure of climate-related financial risks?',
    options: [
      'GHG Protocol',
      'TCFD',
      'SECR',
      'ISO 14064',
    ],
    correctAnswer: 1,
    explanation:
      'The Task Force on Climate-related Financial Disclosures (TCFD) framework requires organisations to disclose climate-related risks and opportunities, including governance, strategy, risk management, and metrics.',
  },
  {
    id: 10,
    question: "A building's embodied carbon refers to emissions from:",
    options: [
      'Scheduled updates with testing and rollback capability',
      'Lights energised continuously, operating from normal and emergency supplies',
      'Manufacturing, transport, and installation of building materials and systems',
      'Fire panel relay outputs were wired to wrong BMS input terminals',
    ],
    correctAnswer: 2,
    explanation:
      'Embodied carbon includes all emissions associated with manufacturing, transporting, and installing building materials and systems. For electrical installations, this includes cables, switchgear, and equipment.',
  },
  {
    id: 11,
    question: 'Under SECR, which organisations must report energy and carbon information?',
    options: [
      'Electricity consumed in owned buildings',
      'Grid average emission factors for the region',
      'Growth in renewable energy and phase-out of coal',
      'Large UK companies and LLPs meeting size thresholds',
    ],
    correctAnswer: 3,
    explanation:
      'Streamlined Energy and Carbon Reporting (SECR) applies to large UK companies and LLPs meeting certain size thresholds (turnover, employees, or balance sheet). It requires disclosure of energy use and emissions in annual reports.',
  },
  {
    id: 12,
    question:
      'If the UK grid emission factor is 0.207 kgCO2e/kWh and a client switches to a 100% renewable tariff with REGOs, their Scope 2 market-based emissions become:',
    options: [
      'Zero or near-zero',
      'Half the grid factor',
      'The same (0.207 kgCO2e/kWh)',
      'Double the grid factor',
    ],
    correctAnswer: 0,
    explanation:
      'Under market-based Scope 2 accounting, electricity backed by Renewable Energy Guarantees of Origin (REGOs) can be reported as zero or near-zero emissions, as the renewable attributes are contractually claimed.',
  },
];

const faqs = [
  {
    question: "What's the difference between location-based and market-based Scope 2 reporting?",
    answer:
      'Location-based reporting uses grid average emission factors for your geographic area, reflecting the actual emissions from the local grid mix. Market-based reporting uses supplier-specific factors or contractual instruments like REGOs, allowing organisations to claim lower emissions if they purchase renewable electricity. The GHG Protocol requires organisations to report both methods for transparency.',
  },
  {
    question: 'Why are Scope 3 emissions often the largest but hardest to report?',
    answer:
      'Scope 3 covers the entire value chain - from purchased materials and services to product use and end-of-life disposal. For most organisations, Scope 3 represents 70-90% of total emissions. However, data collection is challenging as it relies on suppliers and customers. Many organisations start with the most significant categories (e.g., purchased goods, business travel) before expanding coverage.',
  },
  {
    question: 'How do emission factors change over time, and why does this matter?',
    answer:
      'Emission factors are updated annually to reflect changes in the energy mix. The UK grid factor has fallen from 0.5 kgCO2e/kWh in 2010 to around 0.2 kgCO2e/kWh today due to renewable growth. Using current factors ensures accurate reporting and shows the benefit of electrification as the grid decarbonises. Always use the factor corresponding to the reporting year.',
  },
  {
    question: 'How should electrical contractors account for their own carbon footprint?',
    answer:
      'Electrical contractors should account for: Scope 1 - company vehicle fuel, generator fuel on sites; Scope 2 - office and depot electricity; Scope 3 - materials purchased (cables, equipment), waste disposal, employee commuting, subcontractor activities. Many clients now require carbon reporting in tenders, making this commercially important.',
  },
  {
    question: 'What is the relationship between carbon intensity and time of use?',
    answer:
      "Grid carbon intensity varies throughout the day based on the generation mix. It's typically lowest during sunny/windy periods when renewables dominate, and highest during evening peaks when gas plants ramp up. Smart building controls can shift flexible loads (EV charging, thermal storage) to low-carbon periods, reducing Scope 2 emissions without changing total consumption.",
  },
  {
    question: 'How do REGOs (Renewable Energy Guarantees of Origin) work?',
    answer:
      "REGOs are certificates issued for each MWh of renewable electricity generated. Energy suppliers can purchase REGOs to offer 'green' tariffs, allowing customers to claim the renewable attributes. Under market-based Scope 2 reporting, electricity backed by REGOs can be reported as zero emissions. However, the physical electricity consumed still comes from the grid mix - REGOs represent a contractual claim, not physical delivery of renewable electrons.",
  },
];

const HNCModule6Section4_1 = () => {
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
            eyebrow="Module 6 · Section 4 · Subsection 1"
            title="Carbon Fundamentals"
            description="Carbon accounting, GHG Protocol, Scope 1/2/3 emissions, emission factors, and reporting frameworks for building services"
            tone="purple"
          />

          <TLDR
            points={[
              "Carbon accounting follows the GHG Protocol — Scope 1 (direct emissions, e.g. site gas burnt), Scope 2 (purchased electricity), Scope 3 (value chain — embodied materials, waste, business travel, downstream use of products).",
              "CO₂e (carbon dioxide equivalent) aggregates the seven Kyoto greenhouse gases by their 100-year Global Warming Potential — methane × 28, N₂O × 273, HFCs from refrigerants × 1,000–14,000+.",
              "UK government emission factors (BEIS / DESNZ) are updated annually — use the conversion factors for the relevant reporting year, not historic averages.",
            ]}
          />

          <RegsCallout
            source="UK Greenhouse Gas Emissions Trading Scheme + Streamlined Energy and Carbon Reporting (SECR)"
            clause="A quoted company shall report the total greenhouse gas emissions (in tonnes of CO2e) within Scope 1 and Scope 2 of the GHG Protocol. A large unquoted company or LLP meeting the size thresholds shall report the same plus an intensity ratio and energy efficiency actions taken in the financial year. Reporting shall use the conversion factors published annually by the Department for Energy Security and Net Zero (DESNZ) for the relevant reporting period."
            meaning={
              <>
                SECR is mandatory annual disclosure for ~12,000 large UK organisations. The methodology mirrors the GHG Protocol Corporate Standard. For building services projects, this means project carbon emissions feed the client's SECR return — accurate Scope 1/2 data and supporting documentation must be supplied at handover.
              </>
            }
            cite="Source: SI 2018/1155 The Companies (Directors' Report) and Limited Liability Partnerships (Energy and Carbon Report) Regulations — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Apply the GHG Protocol framework to building carbon accounting",
              "Distinguish between Scope 1, 2, and 3 emissions with examples",
              "Calculate building carbon emissions using emission factors",
              "Understand CO2e and global warming potential concepts",
              "Navigate UK reporting requirements (SECR, TCFD)",
              "Analyse grid carbon intensity and its implications for design",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="GHG Protocol and Carbon Accounting">
            <p>The Greenhouse Gas Protocol provides the world's most widely used standards for measuring and reporting greenhouse gas emissions. Developed by the World Resources Institute and World Business Council for Sustainable Development, it forms the foundation of corporate carbon accounting and most regulatory frameworks.</p>
            <p><strong>Key GHG Protocol Principles:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Relevance:</strong> Information must serve decision-making needs of users</li>
              <li><strong>Completeness:</strong> Account for all emission sources within the boundary</li>
              <li><strong>Consistency:</strong> Use consistent methodologies for meaningful comparison</li>
              <li><strong>Transparency:</strong> Disclose assumptions, methods, and data sources</li>
              <li><strong>Accuracy:</strong> Reduce uncertainties as far as practicable</li>
            </ul>
            <p><strong>The Three Emission Scopes</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Scope 1:</strong> Direct emissions from owned/controlled sources — Gas boilers, backup generators, company vehicles, refrigerant leaks</li>
              <li><strong>Scope 2:</strong> Indirect emissions from purchased energy — Grid electricity, purchased heat/steam, district cooling</li>
              <li><strong>Scope 3:</strong> All other indirect emissions in value chain — Materials, construction, waste, commuting, water supply</li>
            </ul>
            <p><strong>Key insight:</strong> For most commercial buildings, Scope 2 (electricity) represents 60-80% of operational emissions, making electrical efficiency a primary decarbonisation lever.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Scope Emissions in Detail">
            <p>Understanding the boundaries and calculation methods for each scope is essential for accurate carbon accounting. Each scope requires different data sources, emission factors, and reporting approaches.</p>
            <p><strong>Scope 1 Sources</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Natural gas combustion</li>
              <li>Oil/diesel combustion</li>
              <li>Company vehicle fleet</li>
              <li>Refrigerant losses (F-gases)</li>
              <li>Backup generator fuel</li>
            </ul>
            <p><strong>Scope 2 Sources</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Grid electricity</li>
              <li>Purchased heat</li>
              <li>Purchased steam</li>
              <li>District cooling</li>
              <li>Two methods: location/market</li>
            </ul>
            <p><strong>Scope 3 Categories</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Purchased goods/services</li>
              <li>Business travel</li>
              <li>Employee commuting</li>
              <li>Waste disposal</li>
              <li>Upstream/downstream transport</li>
            </ul>
            <p><strong>Scope 2 Accounting Methods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Location-based:</strong> Grid average for location — Reflects actual grid emissions; required for regulatory reporting</li>
              <li><strong>Market-based:</strong> Supplier-specific or contractual — Reflects purchasing decisions; allows renewable tariff claims</li>
            </ul>
            <p><strong>Scope 3 Categories (GHG Protocol)</strong></p>
            <p><strong>Upstream:</strong> 1. Purchased goods/services, 2. Capital goods, 3. Fuel/energy activities, 4. Transport (upstream), 5. Waste, 6. Business travel, 7. Commuting, 8. Leased assets (upstream)</p>
            <p><strong>Downstream:</strong> 9. Transport (downstream), 10. Processing, 11. Product use, 12. End-of-life, 13. Leased assets (downstream), 14. Franchises, 15. Investments</p>
            <p><strong>Reporting requirement:</strong> The GHG Protocol requires dual reporting of both location-based and market-based Scope 2 emissions for transparency.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="CO2e and Emission Factors">
            <p>Carbon dioxide equivalent (CO2e) is the universal metric for comparing different greenhouse gases. Emission factors convert activity data (energy consumption, fuel use) into carbon emissions, enabling organisations to calculate their carbon footprint.</p>
            <p><strong>Global Warming Potential (GWP-100)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Carbon dioxide:</strong> CO2 — 1 — Combustion, grid electricity</li>
              <li><strong>Methane:</strong> CH4 — 28 — Gas leaks, incomplete combustion</li>
              <li><strong>Nitrous oxide:</strong> N2O — 265 — Combustion byproduct</li>
              <li><strong>HFCs (refrigerants):</strong> Various — 140-11,700 — HVAC refrigerant leaks</li>
              <li><strong>SF6:</strong> SF6 — 23,500 — HV switchgear insulation</li>
            </ul>
            <p><strong>UK Government Conversion Factors (2023)</strong></p>
            <p><strong>Electricity</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Grid electricity: <strong>0.207 kgCO2e/kWh</strong></li>
              <li>Transmission losses: 0.018 kgCO2e/kWh</li>
              <li>Well-to-tank: 0.024 kgCO2e/kWh</li>
            </ul>
            <p><strong>Fuels</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Natural gas: <strong>0.183 kgCO2e/kWh</strong></li>
              <li>Gas oil (diesel): 0.256 kgCO2e/kWh</li>
              <li>LPG: 0.214 kgCO2e/kWh</li>
            </ul>
            <p><strong>Carbon Calculation Formula</strong></p>
            <p>Carbon Emissions = Activity Data × Emission Factor</p>
            <p>Where:</p>
            <p>- Activity data = energy consumption (kWh), fuel use (litres), etc.</p>
            <p>- Emission factor = kgCO2e per unit of activity</p>
            <p>Example:</p>
            <p>1,000,000 kWh electricity × 0.207 kgCO2e/kWh = 207,000 kgCO2e =  <strong>207 tCO2e</strong></p>
            <p><strong>Important:</strong> UK Government conversion factors are published annually by DESNZ (formerly BEIS) and should be used for the reporting year in question. Historical comparisons should use year-appropriate factors.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Grid Carbon Intensity and Reporting Frameworks">
            <p>Grid carbon intensity varies by time and location, reflecting the generation mix. Understanding these variations enables optimised building operation and accurate carbon reporting under various regulatory frameworks.</p>
            <p><strong>UK Grid Carbon Intensity Trends</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>2010:</strong> 0.500 — Coal-dominated generation</li>
              <li><strong>2015:</strong> 0.412 — Gas replacing coal</li>
              <li><strong>2020:</strong> 0.233 — Renewable growth, coal phase-out</li>
              <li><strong>2023:</strong> 0.207 — Offshore wind expansion</li>
              <li><strong>2035 (target):</strong> ~0.050 — Decarbonised grid target</li>
            </ul>
            <p><strong>Real-Time Carbon Intensity</strong></p>
            <p>Grid carbon intensity varies throughout the day, typically:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lowest:</strong> Sunny/windy afternoons (solar + wind peak) - can drop below 0.100 kgCO2e/kWh</li>
              <li><strong>Highest:</strong> Winter evening peaks (5-7pm) when gas plants run - can exceed 0.300 kgCO2e/kWh</li>
              <li><strong>Implication:</strong> Shifting flexible loads (EV charging, thermal storage) to low-carbon periods reduces emissions</li>
            </ul>
            <p><strong>UK Carbon Reporting Frameworks</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>SECR:</strong> Large UK companies/LLPs — Energy use, emissions, intensity ratio in annual report</li>
              <li><strong>TCFD:</strong> Listed companies, large asset owners — Climate risk disclosure, scenario analysis</li>
              <li><strong>ESOS:</strong> Large undertakings (250+ employees) — Energy audits every 4 years</li>
              <li><strong>ISO 14064:</strong> Voluntary — GHG inventory, verification, project accounting</li>
              <li><strong>SBTi:</strong> Voluntary commitment — Science-based reduction targets (1.5°C pathway)</li>
            </ul>
            <p><strong>SECR Reporting Requirements</strong></p>
            <p><strong>Applies to:</strong> UK companies meeting 2 of 3 criteria: turnover &gt;£36m, balance sheet &gt;£18m, &gt;250 employees</p>
            <p><strong>Must disclose:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>UK energy use (electricity, gas, transport fuel) in kWh</li>
              <li>Associated GHG emissions (Scope 1 and 2 minimum) in tCO2e</li>
              <li>At least one intensity ratio (e.g., kgCO2e/m², tCO2e/£m turnover)</li>
              <li>Methodology used and previous year comparison</li>
              <li>Energy efficiency actions taken</li>
            </ul>
            <p><strong>Design implication:</strong> As the grid decarbonises, electrification of heating (heat pumps) becomes increasingly favourable compared to gas. A heat pump with COP of 3.0 using grid electricity already has lower carbon than a 90% efficient gas boiler at current grid factors.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Office Building Annual Carbon Footprint</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate Scope 1 and 2 emissions for a 5,000 m² office building.</p>
            <p>Given data:</p>
            <p>Annual electricity consumption: 450,000 kWh</p>
            <p>Annual gas consumption: 200,000 kWh</p>
            <p>Emission factors (2023):</p>
            <p>Electricity: 0.207 kgCO2e/kWh</p>
            <p>Natural gas: 0.183 kgCO2e/kWh</p>
            <p>Calculations:</p>
            <p><strong>Scope 1 (gas):</strong></p>
            <p>200,000 kWh × 0.183 kgCO2e/kWh = 36,600 kgCO2e =  <span>36.6 tCO2e</span></p>
            <p><strong>Scope 2 (electricity):</strong></p>
            <p>450,000 kWh × 0.207 kgCO2e/kWh = 93,150 kgCO2e =  <span>93.2 tCO2e</span></p>
            <p><strong>Total operational carbon:</strong>  <span>129.8 tCO2e/year</span></p>
            <p><strong>Carbon intensity:</strong> 129,750 kgCO2e ÷ 5,000 m² =  <span>25.95 kgCO2e/m²/year</span></p>
            <p>
              <strong>Example 2: Impact of Renewable Electricity Tariff</strong>
            </p>
            <p><strong>Scenario:</strong> Compare location-based vs market-based Scope 2 reporting.</p>
            <p>Building electricity: 450,000 kWh/year</p>
            <p>Tariff: 100% REGO-backed renewable electricity</p>
            <p><strong>Location-based Scope 2:</strong></p>
            <p>450,000 × 0.207 = 93,150 kgCO2e =  <span>93.2 tCO2e</span></p>
            <p>(Uses grid average - reflects actual grid emissions)</p>
            <p><strong>Market-based Scope 2:</strong></p>
            <p>450,000 × 0.000 = 0 kgCO2e = <span>0 tCO2e</span></p>
            <p>(REGO-backed renewable tariff - zero emission factor)</p>
            <p>Note: Both figures must be reported under GHG Protocol</p>
            <p>
              <strong>Example 3: Heat Pump vs Gas Boiler Carbon Comparison</strong>
            </p>
            <p><strong>Scenario:</strong> Compare carbon emissions for 100,000 kWh heating demand.</p>
            <p>Heating demand: 100,000 kWh/year</p>
            <p><strong>Option A: Gas boiler (92% efficient)</strong></p>
            <p>Gas input: 100,000 ÷ 0.92 = 108,696 kWh</p>
            <p>Emissions: 108,696 × 0.183 = 19,891 kgCO2e =  <span>19.9 tCO2e</span></p>
            <p><strong>Option B: Air source heat pump (COP 3.0)</strong></p>
            <p>Electricity input: 100,000 ÷ 3.0 = 33,333 kWh</p>
            <p>Emissions: 33,333 × 0.207 = 6,900 kgCO2e =  <span>6.9 tCO2e</span></p>
            <p>Heat pump saves: 65% carbon reduction</p>
            <p>As grid decarbonises, this advantage increases further</p>
            <p>
              <strong>Example 4: Refrigerant Leak Emissions</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate Scope 1 emissions from HVAC refrigerant loss.</p>
            <p>Chiller system refrigerant: R-410A</p>
            <p>System charge: 50 kg</p>
            <p>Annual leakage rate: 5% (typical)</p>
            <p>R-410A GWP: 2,088</p>
            <p><strong>Calculation:</strong></p>
            <p>Annual leakage: 50 kg × 5% = 2.5 kg</p>
            <p>CO2e emissions: 2.5 kg × 2,088 = 5,220 kgCO2e =  <span>5.2 tCO2e</span></p>
            <p>This is often overlooked but can be significant!</p>
            <p>Low-GWP alternatives (R-32, R-290) reduce this substantially</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Building Carbon Accounting Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Collect 12 months of energy bills (electricity, gas, other fuels)</li>
              <li>Identify any on-site combustion sources (boilers, generators, vehicles)</li>
              <li>Record refrigerant types and any top-up quantities</li>
              <li>Obtain current year UK Government conversion factors</li>
              <li>Calculate Scope 1 (direct) and Scope 2 (electricity) separately</li>
              <li>Calculate both location-based and market-based Scope 2</li>
            </ul>
            <p>
              <strong>Key Emission Factors to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>UK grid electricity: <strong>~0.207 kgCO2e/kWh</strong> (2023)</li>
              <li>Natural gas: <strong>~0.183 kgCO2e/kWh</strong></li>
              <li>Grid electricity transmission losses: <strong>~0.018 kgCO2e/kWh</strong></li>
              <li>Methane GWP: <strong>28</strong> (100-year)</li>
              <li>Common refrigerant R-410A GWP: <strong>2,088</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Using wrong year factors</strong> - always use factors for the reporting year</li>
                <li><strong>Forgetting transmission losses</strong> - add these to electricity figures for full Scope 2</li>
                <li><strong>Ignoring refrigerant leaks</strong> - high-GWP refrigerants can be a major Scope 1 source</li>
                <li><strong>Mixing units</strong> - ensure kWh for energy, kgCO2e for emissions, convert to tonnes where appropriate</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="Refrigerant leak destroys a year of operational savings"
            situation={
              <>
                A 200 kW VRF system uses R410A refrigerant (GWP 2,088). After 3 years of operation, an annual F-Gas inspection finds a 12 kg leak — equivalent to 25 tonnes CO₂e (12 × 2.088). The client's SECR report shows a year-on-year emissions increase, partially wiping out the savings from a heat-pump space heating retrofit.
              </>
            }
            whatToDo={
              <>
                Immediate F-Gas remediation — locate, repair, leak test, recharge with reclaimed refrigerant where possible. Update the maintenance regime: F-Gas inspection frequency rises with system charge size (&gt;5 tCO₂e annual; &gt;50 tCO₂e quarterly with leak detection). Consider transition to lower-GWP refrigerant (R32 = 675, R454B = 467, R290 propane = 3) at next major service or replacement. Report the leak in SECR with the F-Gas remediation actions.
              </>
            }
            whyItMatters={
              <>
                Refrigerant leakage is the most under-reported source of building-services emissions. A 1% per-year leakage rate on a high-GWP system can match the operational electricity emissions of the same system — so the GWP and leak rate determine real-world climate impact as much as the COP does. The F-Gas Regulation 517/2014 phase-down is forcing the industry to lower-GWP refrigerants by 2030.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Scope 1 = direct (gas burnt on site, refrigerant leaks, fleet diesel).",
              "Scope 2 = purchased electricity (location-based or market-based methodology).",
              "Scope 3 = value chain — typically the largest scope, includes embodied carbon.",
              "CO₂e aggregates GHGs by GWP100 — methane ×28, refrigerants 1,000–14,000+.",
              "DESNZ (formerly BEIS) publishes UK emission factors annually — use the right year.",
              "SECR is mandatory for ~12,000 UK companies — annual Scope 1/2 disclosure.",
              "F-Gas Regulation drives refrigerant phase-down — high-GWP refrigerants becoming uneconomic.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Carbon reduction strategies
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section4-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Operational carbon
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section4_1;
