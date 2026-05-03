/**
 * Module 6 · Section 4 · Subsection 6 — Net-Zero Pathways
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Carbon hierarchy, reduction roadmaps, technology options, interim targets, and verification frameworks for building decarbonisation
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

const TITLE = 'Net-Zero Pathways - HNC Module 6 Section 4.6';
const DESCRIPTION =
  'Master net-zero pathway development for buildings: carbon hierarchy, reduction roadmaps, technology options, interim targets, verification frameworks, and building services role in decarbonisation.';

const quickCheckQuestions = [
  {
    id: 'net-zero-definition',
    question: "What does 'net-zero carbon' mean for a building?",
    options: [
      'The building generates no carbon emissions',
      'Carbon emissions are balanced by verified offsets or removals',
      'The building uses only renewable energy',
      'The building has zero operational energy consumption',
    ],
    correctIndex: 1,
    explanation:
      'Net-zero carbon means that any residual carbon emissions from a building are balanced by verified carbon offsets or removals, resulting in no net contribution to atmospheric CO2. This includes both operational and potentially embodied carbon.',
  },
  {
    id: 'carbon-hierarchy',
    question: 'In the carbon reduction hierarchy, which approach should be prioritised first?',
    options: [
      'Offset remaining emissions',
      'Switch to low-carbon energy sources',
      'Reduce energy demand through efficiency',
      'Avoid carbon-intensive activities where possible',
    ],
    correctIndex: 3,
    explanation:
      'The carbon hierarchy follows: Avoid, Reduce, Replace, Offset. Avoiding carbon-intensive activities (such as eliminating fossil fuel systems) should always be the first priority before pursuing efficiency improvements, fuel switching, or offsetting.',
  },
  {
    id: 'interim-targets',
    question: 'Why are interim targets important in a net-zero pathway?',
    options: [
      'They are legally required by building regulations',
      'They provide measurable milestones to track progress and maintain momentum',
      'They reduce the overall cost of decarbonisation',
      'They are only needed for public sector buildings',
    ],
    correctIndex: 1,
    explanation:
      'Interim targets (such as 2030 milestones) provide measurable checkpoints that help organisations track progress, maintain momentum, identify if actions are having the desired effect, and make course corrections if needed.',
  },
  {
    id: 'verification',
    question: 'What is the primary purpose of third-party verification in net-zero claims?',
    options: [
      'To reduce the cost of carbon offsets',
      'To provide credibility and prevent greenwashing',
      'To satisfy planning requirements',
      'To qualify for government grants',
    ],
    correctIndex: 1,
    explanation:
      'Third-party verification provides independent assurance that net-zero claims are credible, based on robust methodology, and not greenwashing. This builds trust with stakeholders and ensures claims can withstand scrutiny.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'The UK legally binding net-zero target requires reaching net-zero greenhouse gas emissions by which year?',
    options: ['2030', '2040', '2050', '2060'],
    correctAnswer: 2,
    explanation:
      'The UK Climate Change Act was amended in 2019 to set a legally binding target of net-zero greenhouse gas emissions by 2050, making the UK the first major economy to pass such legislation.',
  },
  {
    id: 2,
    question:
      "According to the UKGBC framework, 'net-zero carbon in operation' for a building requires:",
    options: [
      'Zero energy consumption',
      'All energy from on-site renewables',
      'Reduced operational energy with residual emissions offset',
      'Demolition and rebuild with low-carbon materials',
    ],
    correctAnswer: 2,
    explanation:
      "UKGBC's net-zero carbon in operation definition requires reducing operational energy consumption as far as possible, then offsetting residual emissions through verified carbon offsets or green tariff procurement.",
  },
  {
    id: 3,
    question: "In the carbon hierarchy, 'Replace' refers to:",
    options: [
      'Replacing old buildings with new efficient ones',
      'Switching to low or zero-carbon energy sources',
      'Replacing offset credits with better alternatives',
      'Replacing energy meters with smart meters',
    ],
    correctAnswer: 1,
    explanation:
      "In the Avoid-Reduce-Replace-Offset hierarchy, 'Replace' means switching from high-carbon to low or zero-carbon energy sources, such as replacing gas boilers with heat pumps or fossil fuel electricity with renewables.",
  },
  {
    id: 4,
    question:
      'What is the typical first step in developing a net-zero pathway for an existing building?',
    options: [
      'Install solar panels',
      'Conduct a detailed baseline carbon assessment',
      'Purchase carbon offsets',
      'Replace all lighting with LEDs',
    ],
    correctAnswer: 1,
    explanation:
      'A detailed baseline carbon assessment is essential as the first step to understand current emissions, identify major sources, and establish the starting point against which progress will be measured.',
  },
  {
    id: 5,
    question:
      'Which technology option typically offers the greatest carbon reduction potential for space heating in UK buildings?',
    options: [
      'High-efficiency gas condensing boilers',
      'Biomass boilers',
      'Air source heat pumps',
      'Direct electric heating',
    ],
    correctAnswer: 2,
    explanation:
      'Air source heat pumps typically achieve 300-400% efficiency (COP 3-4), meaning they produce 3-4 units of heat for every unit of electricity consumed. Combined with the decarbonising grid, they offer the greatest long-term carbon reduction for heating.',
  },
  {
    id: 6,
    question:
      'The Science Based Targets initiative (SBTi) requires corporate targets to be aligned with:',
    options: [
      'National building regulations',
      'Paris Agreement temperature goals (1.5degC or well-below 2degC)',
      'Industry sector averages',
      'BREEAM Outstanding ratings',
    ],
    correctAnswer: 1,
    explanation:
      'SBTi validates corporate emissions reduction targets that are aligned with the Paris Agreement goals of limiting global warming to 1.5degC or well-below 2degC, ensuring targets represent a fair share of required global reductions.',
  },
  {
    id: 7,
    question:
      'What percentage of UK carbon emissions typically come from buildings (operational and embodied)?',
    options: ['Around 10%', 'Around 25%', 'Around 40%', 'Around 60%'],
    correctAnswer: 2,
    explanation:
      'Buildings account for approximately 40% of UK carbon emissions when including both operational emissions (heating, cooling, lighting, equipment) and embodied emissions from construction materials and processes.',
  },
  {
    id: 8,
    question: 'Which of these is NOT typically considered a Scope 1 emission for a building?',
    options: [
      'On-site gas combustion for heating',
      'Diesel generator operation',
      'Grid electricity consumption',
      'Fugitive refrigerant leaks',
    ],
    correctAnswer: 2,
    explanation:
      'Grid electricity consumption is a Scope 2 emission (indirect from purchased energy), not Scope 1. Scope 1 covers direct emissions from owned or controlled sources: on-site combustion, generators, and refrigerant leaks.',
  },
  {
    id: 9,
    question: "A 'carbon budget' in pathway planning refers to:",
    options: [
      'The financial budget allocated for carbon reduction projects',
      'The cumulative amount of carbon that can be emitted while meeting a target',
      'The cost of carbon offsets over the pathway period',
      "The building's annual energy budget",
    ],
    correctAnswer: 1,
    explanation:
      'A carbon budget represents the total cumulative emissions permitted over a period while remaining on track for a net-zero target. It recognises that emissions reductions happen over time, not instantaneously.',
  },
  {
    id: 10,
    question:
      'What is the primary role of building services engineers in achieving net-zero buildings?',
    options: [
      'Purchasing carbon offsets',
      'Designing and specifying low-carbon MEP systems that minimise operational emissions',
      'Certifying buildings as net-zero',
      'Manufacturing renewable energy equipment',
    ],
    correctAnswer: 1,
    explanation:
      'Building services engineers play a critical role by designing and specifying MEP systems (HVAC, lighting, controls) that minimise operational energy consumption and carbon emissions through efficient, low-carbon technology selection.',
  },
  {
    id: 11,
    question:
      'Which verification standard specifically addresses net-zero carbon buildings in the UK?',
    options: [
      'ISO 9001',
      'PAS 2080',
      'UKGBC Net Zero Carbon Buildings Framework',
      'BREEAM Excellent',
    ],
    correctAnswer: 2,
    explanation:
      'The UKGBC Net Zero Carbon Buildings Framework Definition provides the UK industry-standard methodology for defining, calculating, and verifying net-zero carbon claims for buildings in both construction and operation.',
  },
  {
    id: 12,
    question: 'For a credible net-zero pathway, offsets should:',
    options: [
      'Be the primary strategy for carbon reduction',
      'Come from the cheapest available source',
      'Be used only for genuinely unavoidable residual emissions',
      'Replace the need for energy efficiency measures',
    ],
    correctAnswer: 2,
    explanation:
      'Credible net-zero pathways use offsets only for genuinely residual emissions that cannot be eliminated through efficiency, fuel switching, or on-site renewables. Offsets should be additional, permanent, and verified - never a substitute for direct action.',
  },
];

const faqs = [
  {
    question: 'What is the difference between net-zero carbon and carbon neutral?',
    answer:
      'While often used interchangeably, net-zero carbon typically follows a hierarchy where emissions must be reduced as far as possible before offsetting residual emissions. Carbon neutral can sometimes mean offsetting all emissions without necessarily prioritising reductions first. The UKGBC framework requires demonstrated emission reductions before offsetting can be claimed for net-zero.',
  },
  {
    question: 'Do building regulations require net-zero buildings?',
    answer:
      "Currently, UK building regulations do not mandate net-zero carbon buildings. However, Part L 2021 significantly tightened energy performance requirements, and the Future Homes Standard (expected 2025) will require new homes to be 'zero-carbon ready'. Many planning authorities now require net-zero commitments through planning conditions, particularly for major developments.",
  },
  {
    question: 'How should existing buildings approach net-zero pathways?',
    answer:
      'Existing buildings should: (1) Conduct a comprehensive energy audit and carbon baseline, (2) Prioritise fabric improvements (insulation, airtightness, glazing), (3) Upgrade to efficient building services (LED lighting, efficient HVAC, smart controls), (4) Electrify heating where feasible (heat pumps), (5) Install on-site renewables, (6) Procure green electricity, (7) Offset genuinely residual emissions. Timing often aligns with planned refurbishment or equipment replacement cycles.',
  },
  {
    question: 'What are science-based targets and how do they relate to net-zero?',
    answer:
      'Science-based targets are emissions reduction targets aligned with climate science - specifically what is needed to limit global warming to 1.5 degrees C or well-below 2 degrees C as per the Paris Agreement. They ensure corporate targets represent a fair share of required global reductions. A science-based net-zero target typically requires 90-95% absolute emissions reduction before any offsetting.',
  },
  {
    question: 'How do building services engineers contribute to net-zero pathways?',
    answer:
      'Building services engineers are essential to net-zero through: designing energy-efficient MEP systems, specifying low-carbon technologies (heat pumps, LED lighting, efficient chillers), optimising controls for minimal energy waste, enabling renewable energy integration, conducting energy modelling to predict performance, commissioning systems for optimal operation, and advising on technology roadmaps for decarbonisation.',
  },
  {
    question: "What makes a carbon offset 'high quality' for net-zero claims?",
    answer:
      'High-quality offsets must be: Additional (would not have happened without the offset finance), Permanent (carbon removed or avoided permanently), Verified (by recognised standards like Gold Standard or Verra VCS), Real (based on actual measured reductions), Not double-counted, and Preferably from removal projects rather than avoidance. UKGBC recommends offsets with co-benefits and transparent registries.',
  },
];

const HNCModule6Section4_6 = () => {
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
            eyebrow="Module 6 · Section 4 · Subsection 6"
            title="Net-Zero Pathways"
            description="Carbon hierarchy, reduction roadmaps, technology options, interim targets, and verification frameworks for building decarbonisation"
            tone="purple"
          />

          <TLDR
            points={[
              "Net-zero requires a hierarchy: reduce demand (passive design, fabric), then electrify (heat pumps replace combustion), then decarbonise supply (renewable PPAs, on-site PV), then offset only the residual that cannot be eliminated.",
              "For new build, LETI Climate Emergency Design Guide and the UKGBC Net Zero Carbon Buildings Framework are the institutional UK references — defining performance targets for both operational and embodied carbon.",
              "Verification is via post-occupancy measurement, not design modelling — the gap between predicted and actual performance is the single largest barrier to credible net-zero claims.",
            ]}
          />

          <RegsCallout
            source="UKGBC Net Zero Carbon Buildings Framework (2024) + UK Net Zero Carbon Buildings Standard (2024 pilot)"
            clause="A building shall achieve net-zero carbon (operational and embodied) by demonstrating in-use measured energy performance against published intensity targets (kWh/m²/year), embodied carbon performance against published intensity targets (kgCO₂e/m² GIA), and the residual annual carbon footprint offset using high-quality verified credits in accordance with the UKGBC carbon offsetting principles. Performance shall be re-verified annually for at least 5 years post-occupancy."
            meaning={
              <>
                The UK Net Zero Carbon Buildings Standard (2024 pilot, full release expected) is the first cross-industry-agreed UK definition of a net-zero building. It is performance-based (measured EUI, measured embodied carbon) — design intent statements alone do not qualify. Annual re-verification ties net-zero to operational reality, not handover-day modelling.
              </>
            }
            cite="Source: UKGBC Net Zero Carbon Buildings Framework (2024) — ukgbc.org; UK Net Zero Carbon Buildings Standard (2024) — nzcbuildings.co.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Define net-zero carbon and distinguish from carbon neutral",
              "Apply the carbon reduction hierarchy to building projects",
              "Develop net-zero pathways with interim targets",
              "Evaluate technology options for building decarbonisation",
              "Understand verification frameworks and UKGBC guidance",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Net-Zero Definitions and Context">
            <p>Net-zero carbon represents the critical goal of balancing greenhouse gas emissions with removals or offsets, resulting in no net contribution to climate change. For buildings, this encompasses both operational emissions (energy use) and increasingly embodied emissions (materials and construction).</p>
            <p><strong>Key definitions in net-zero terminology:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Net-zero carbon:</strong> Emissions reduced to minimum, residual balanced by verified offsets</li>
              <li><strong>Net-zero operational carbon:</strong> Zero net emissions from building energy use</li>
              <li><strong>Net-zero whole-life carbon:</strong> Includes operational and embodied carbon over building lifecycle</li>
              <li><strong>Carbon neutral:</strong> May rely more heavily on offsetting without prioritising reductions</li>
            </ul>
            <p><strong>UK Climate Policy Context</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>2019 Amendment:</strong> Net-zero by 2050 (legally binding) — All sectors must decarbonise</li>
              <li><strong>Sixth Carbon Budget:</strong> 78% reduction by 2035 (vs 1990) — Building sector transformation required</li>
              <li><strong>Future Homes Standard:</strong> 75-80% carbon reduction (new homes) — No fossil fuel heating in new homes</li>
              <li><strong>Part L 2021:</strong> 31% improvement (homes), 27% (non-domestic) — Stepping stone to net-zero</li>
            </ul>
            <p><strong>Critical point:</strong> Buildings account for approximately 40% of UK carbon emissions - decarbonising the built environment is essential to achieving national net-zero targets.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="The Carbon Reduction Hierarchy">
            <p>The carbon hierarchy provides a prioritised approach to decarbonisation, ensuring that the most effective and permanent measures are implemented before resorting to offsetting. This hierarchy is fundamental to credible net-zero pathways.</p>
            <p><strong>1. AVOID</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Eliminate fossil fuel systems</li>
              <li>Reduce building energy demand</li>
              <li>Optimise building form/orientation</li>
              <li>Question need for energy-intensive spaces</li>
            </ul>
            <p><strong>2. REDUCE</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Improve fabric efficiency</li>
              <li>Specify efficient MEP systems</li>
              <li>Implement smart controls</li>
              <li>Optimise system operation</li>
            </ul>
            <p><strong>3. REPLACE</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Switch to heat pumps</li>
              <li>Install on-site renewables</li>
              <li>Procure green electricity</li>
              <li>Connect to low-carbon heat networks</li>
            </ul>
            <p><strong>4. OFFSET</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Only for residual emissions</li>
              <li>High-quality verified credits</li>
              <li>Preferably removal-based</li>
              <li>Transparent and traceable</li>
            </ul>
            <p><strong>Applying the Hierarchy to Building Services</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Avoid:</strong> Reduce heat loss through fabric — Maximise daylight penetration</li>
              <li><strong>Reduce:</strong> Optimise heating setpoints/schedules — Install presence/daylight sensors</li>
              <li><strong>Replace:</strong> Install heat pump instead of boiler — Upgrade to high-efficacy LEDs</li>
              <li><strong>Offset:</strong> Purchase offsets for residual gas — Offset grid carbon factor</li>
            </ul>
            <p><strong>Best practice:</strong> Each level of the hierarchy should be exhausted before moving to the next. Offsets are a last resort, not a first choice.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Pathway Development and Technology Options">
            <p>A net-zero pathway provides a structured roadmap showing how an organisation or building will achieve net-zero carbon, including interim milestones, technology choices, and investment timelines aligned with equipment lifecycles and strategic planning.</p>
            <p><strong>Pathway Development Steps</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Baseline assessment:</strong> Comprehensive audit of current energy use and emissions</li>
              <li><strong>Target setting:</strong> Define end goal (net-zero by date) and interim milestones</li>
              <li><strong>Gap analysis:</strong> Identify what must change to bridge baseline to target</li>
              <li><strong>Measure identification:</strong> List all potential interventions with costs and impacts</li>
              <li><strong>Prioritisation:</strong> Sequence measures using hierarchy and lifecycle alignment</li>
              <li><strong>Financial planning:</strong> Develop investment plan and funding strategy</li>
              <li><strong>Implementation:</strong> Execute measures according to roadmap</li>
              <li><strong>Monitoring:</strong> Track progress and adjust pathway as needed</li>
            </ul>
            <p><strong>Technology Options for Building Decarbonisation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Air source heat pump:</strong> Space heating/cooling — 60-80% vs gas boiler — Requires electrical upgrade</li>
              <li><strong>Ground source heat pump:</strong> Heating/cooling (larger buildings) — 65-85% vs gas boiler — Higher COP, needs ground works</li>
              <li><strong>LED lighting:</strong> All lighting applications — 50-70% vs fluorescent — Quick payback, no barriers</li>
              <li><strong>Building management system:</strong> Controls optimisation — 10-30% across systems — Needs ongoing commissioning</li>
              <li><strong>Solar PV:</strong> On-site electricity generation — Reduces grid dependence — Roof space, orientation needed</li>
              <li><strong>Battery storage:</strong> Load shifting, PV optimisation — Enables higher renewable use — Adds cost, improves flexibility</li>
            </ul>
            <p><strong>Example: Office Building Net-Zero Pathway</strong></p>
            <p><strong>Baseline (2024):</strong> 850 tonnes CO2/year (gas heating, standard lighting, grid electricity)</p>
            <p><strong>2027 target:</strong> 600 tonnes (-30%) - LED retrofit, BMS upgrade, green tariff</p>
            <p><strong>2030 target:</strong> 300 tonnes (-65%) - Heat pump installation, solar PV</p>
            <p><strong>2035 target:</strong> 100 tonnes (-88%) - Additional efficiency, battery storage</p>
            <p><strong>2040 target:</strong> Net-zero - Offset remaining 100 tonnes with verified removals</p>
            <p><strong>Planning tip:</strong> Align major interventions with equipment replacement cycles (boilers typically 15-20 years) to avoid stranded assets and optimise whole-life costs.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Verification and Reporting Frameworks">
            <p>Credible net-zero claims require robust verification against recognised frameworks. The UKGBC Net Zero Carbon Buildings Framework provides the primary industry standard for the UK built environment, ensuring consistency and preventing greenwashing.</p>
            <p><strong>UKGBC Net Zero Carbon Buildings Framework</strong></p>
            <p><strong>Net-Zero Construction</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Calculate embodied carbon (A1-A5)</li>
              <li>Reduce through design optimisation</li>
              <li>Specify low-carbon materials</li>
              <li>Offset residual with verified credits</li>
              <li>Disclose publicly</li>
            </ul>
            <p><strong>Net-Zero Operation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reduce operational energy demand</li>
              <li>Increase renewable supply</li>
              <li>Measure actual performance</li>
              <li>Offset residual emissions</li>
              <li>Report annually and disclose</li>
            </ul>
            <p><strong>Verification Standards and Reporting</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>UKGBC Framework:</strong> UK buildings (construction/operation) — Hierarchy, reduction first, public disclosure</li>
              <li><strong>Science Based Targets (SBTi):</strong> Corporate emissions targets — Paris-aligned, 90%+ reduction before offset</li>
              <li><strong>GHG Protocol:</strong> Carbon accounting methodology — Scope 1, 2, 3 emissions categories</li>
              <li><strong>PAS 2080:</strong> Infrastructure carbon management — Whole-life carbon, value chain approach</li>
              <li><strong>NABERS UK:</strong> Operational performance rating — Actual (not design) energy performance</li>
            </ul>
            <p><strong>Building Services Role in Net-Zero Achievement</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Design:</strong> Specify low-carbon HVAC, efficient lighting, smart controls from project inception</li>
              <li><strong>Energy modelling:</strong> Predict operational carbon and test reduction scenarios</li>
              <li><strong>Technology selection:</strong> Advise on heat pumps, renewables, storage systems</li>
              <li><strong>Commissioning:</strong> Ensure systems operate as designed for optimal efficiency</li>
              <li><strong>Monitoring:</strong> Set up metering and analytics to track performance</li>
              <li><strong>Continuous improvement:</strong> Identify optimisation opportunities post-occupancy</li>
            </ul>
            <p><strong>Verification importance:</strong> Third-party verification ensures net-zero claims are credible, comparable, and defensible against accusations of greenwashing - essential for reputation and stakeholder trust.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Applying the Carbon Hierarchy</strong>
            </p>
            <p><strong>Scenario:</strong> A university is planning a new teaching building and wants to achieve net-zero operation. Apply the hierarchy.</p>
            <p>Carbon Hierarchy Application:</p>
            <p>1. AVOID:</p>
            <p>- No gas connection - all-electric design</p>
            <p>- Optimise building form to minimise heat loss</p>
            <p>- Maximise natural ventilation where possible</p>
            <p>2. REDUCE:</p>
            <p>- Enhanced fabric: U-values below Part L by 30%</p>
            <p>- High-efficacy LED lighting (150+ lm/W)</p>
            <p>- Demand-controlled ventilation with CO2 sensors</p>
            <p>- Smart BMS with predictive control</p>
            <p>3. REPLACE:</p>
            <p>- Air source heat pumps for heating/cooling</p>
            <p>- 200kWp rooftop solar PV array</p>
            <p>- 100% renewable electricity procurement</p>
            <p>4. OFFSET:</p>
            <p>- Purchase verified carbon removal credits</p>
            <p>- Estimated residual: 50 tonnes/year (grid factor)</p>
            <p>Result: Net-zero operational carbon from day one</p>
            <p>
              <strong>Example 2: Developing Interim Targets</strong>
            </p>
            <p><strong>Scenario:</strong> A commercial property owner has set a 2040 net-zero target. Develop interim milestones.</p>
            <p>Portfolio baseline (2024): 25,000 tonnes CO2/year</p>
            <p>Net-zero target: 2040</p>
            <p>Interim Milestones:</p>
            <p>2027 Target: 20,000 tonnes (-20%)</p>
            <p>- LED lighting retrofit (all buildings)</p>
            <p>- BMS upgrades and optimisation</p>
            <p>- Switch to 100% green electricity tariff</p>
            <p>2030 Target: 12,500 tonnes (-50%)</p>
            <p>- Heat pump installation (50% of portfolio)</p>
            <p>- Solar PV on suitable roofs</p>
            <p>- Advanced controls and analytics</p>
            <p>2035 Target: 5,000 tonnes (-80%)</p>
            <p>- Complete heat pump rollout</p>
            <p>- Battery storage for load shifting</p>
            <p>- Deep fabric retrofits where feasible</p>
            <p>2040 Target: Net-zero</p>
            <p>- Offset remaining ~2,500 tonnes</p>
            <p>- High-quality verified removal credits</p>
            <p>
              <strong>Example 3: Carbon Baseline Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate annual operational carbon for an office building.</p>
            <p>Energy consumption data:</p>
            <p>Gas (heating): 500,000 kWh/year</p>
            <p>Electricity: 800,000 kWh/year</p>
            <p>Carbon factors (2024 UK Government):</p>
            <p>Natural gas: 0.182 kgCO2/kWh</p>
            <p>Grid electricity: 0.207 kgCO2/kWh</p>
            <p>Carbon calculation:</p>
            <p>Gas: 500,000 x 0.182 = 91,000 kgCO2</p>
            <p>Elec: 800,000 x 0.207 = 165,600 kgCO2</p>
            <p>Total: 256,600 kgCO2 = 257 tonnes CO2/year</p>
            <p>Scope categorisation:</p>
            <p>Scope 1 (gas): 91 tonnes</p>
            <p>Scope 2 (electricity): 166 tonnes</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Net-Zero Pathway Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Conduct comprehensive energy audit and establish carbon baseline</li>
              <li>Define clear net-zero target date aligned with organisational strategy</li>
              <li>Set interim milestones (typically 2030, 2035) with specific reduction targets</li>
              <li>Identify all reduction measures using the hierarchy (Avoid-Reduce-Replace)</li>
              <li>Align interventions with equipment replacement cycles</li>
              <li>Develop investment plan with funding sources identified</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>UK net-zero target: <strong>2050</strong> (legally binding)</li>
              <li>Buildings' share of UK emissions: <strong>~40%</strong></li>
              <li>SBTi minimum reduction before offset: <strong>90%</strong></li>
              <li>Heat pump COP range: <strong>3-4</strong> (300-400% efficiency)</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Offsetting first:</strong> Using offsets before exhausting efficiency measures</li>
                <li><strong>Poor baseline:</strong> Inaccurate starting point undermines entire pathway</li>
                <li><strong>Missing interim targets:</strong> Without milestones, progress cannot be tracked</li>
                <li><strong>Low-quality offsets:</strong> Cheap offsets that lack additionality or permanence</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="Net-zero claim withdrawn after first-year performance gap"
            situation={
              <>
                A new-build office was marketed at handover as "operational net-zero in use" based on design predictions: 60 kWh/m²/year EUI offset by on-site PV + green tariff PPA. Twelve months of metered data shows actual EUI at 145 kWh/m²/year — exceeding PV generation and PPA contracted volume. Net-zero claim cannot be substantiated; ASA challenge follows.
              </>
            }
            whatToDo={
              <>
                Three-track response: (1) immediately remove the net-zero claim from marketing and update sustainability disclosures; (2) commission a performance gap investigation — typically BMS scheduling, HVAC overrides, and unregulated loads; (3) implement the operational adjustments (re-commission BMS, tenant engagement, additional sub-metering) and re-verify after 6 months. Going forward, claim "net-zero ready" or "designed to net-zero" until measured performance confirms — not at handover.
              </>
            }
            whyItMatters={
              <>
                Claiming net-zero on design intent is becoming a reputational and legal risk. The UK Net Zero Carbon Buildings Standard requires measured verification annually for 5 years. The performance gap is real, large and operational — and the only way to close it is structured aftercare (Soft Landings + TM63 + annual re-commissioning).
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Carbon hierarchy: reduce demand → electrify → decarbonise supply → offset residual.",
              "LETI + UKGBC are the UK institutional references for net-zero design.",
              "UK Net Zero Carbon Buildings Standard (2024 pilot) — first cross-industry definition.",
              "Performance-based (measured EUI, measured embodied carbon) not design intent.",
              "Annual re-verification for 5 years post-occupancy.",
              "Performance gap closure via Soft Landings + TM63 + structured aftercare.",
              "Marketing claim \"net-zero\" without measured verification is increasingly an ASA risk.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section4-5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Carbon offsetting
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section5-1")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Energy auditing
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section4_6;
