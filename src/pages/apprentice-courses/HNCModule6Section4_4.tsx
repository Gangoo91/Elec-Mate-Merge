/**
 * Module 6 · Section 4 · Subsection 4 — Science-Based Targets
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   SBTi framework, 1.5°C alignment, target setting, and progress tracking for building services sustainability
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

const TITLE = 'Science-Based Targets - HNC Module 6 Section 4.4';
const DESCRIPTION =
  'Master the Science Based Targets initiative (SBTi): 1.5°C alignment, absolute and intensity targets, near-term and net-zero commitments, validation process, sector pathways, and progress tracking for building services sustainability.';

const quickCheckQuestions = [
  {
    id: 'sbti-definition',
    question: 'What does the Science Based Targets initiative (SBTi) provide?',
    options: [
      'A circuit containing both series and parallel combinations',
      'Provides both line and phase voltages for different loads',
      'They have a stated period (minimum 21 days) to put the breach right, with right of appeal',
      'A framework for setting emissions targets aligned with climate science',
    ],
    correctIndex: 3,
    explanation:
      'The SBTi provides a clearly defined pathway for companies to set greenhouse gas emissions reduction targets aligned with what climate science says is necessary to limit global warming to 1.5°C or well-below 2°C.',
  },
  {
    id: 'pathway-difference',
    question: 'What is the key difference between 1.5°C and 2°C pathways?',
    options: [
      'Total weight of cables and containment',
      'Comply with the applicable standards specified for them.',
      'Regulations 411.3.1.1 and 411.3.1.2',
      '1.5°C requires faster and deeper emissions cuts',
    ],
    correctIndex: 3,
    explanation:
      'The 1.5°C pathway requires significantly faster and deeper emissions reductions - approximately 4.2% annual reduction compared to 2.5% for well-below 2°C - to maintain a 50% probability of limiting warming.',
  },
  {
    id: 'target-types',
    question: 'An intensity target measures emissions reduction relative to:',
    options: [
      'A business metric such as revenue or floor area',
      'Compact size with good heat dissipation',
      'Slight differences in fibre backscatter characteristics',
      'To prevent electromagnetic interference and ensure safety',
    ],
    correctIndex: 0,
    explanation:
      'Intensity targets express emissions relative to a business metric (e.g., kgCO2e per m² or per £million revenue), allowing companies to reduce emissions intensity while potentially growing their absolute operations.',
  },
  {
    id: 'near-term-timeframe',
    question: 'What is the typical timeframe for SBTi near-term targets?',
    options: [
      'Running cables diagonally',
      'Two parallel lines with S2',
      'If they employ 5 or more people',
      '5-10 years from submission',
    ],
    correctIndex: 3,
    explanation:
      'Near-term science-based targets cover a 5-10 year timeframe from the date of target submission, requiring concrete action plans and measurable progress within a business-relevant planning horizon.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which organisation administers the Science Based Targets initiative?',
    options: [
      'One arm raised with an open palm facing the operator',
      'A partnership of CDP, UN Global Compact, WRI, and WWF',
      'Continued operation during internet outages',
      'Report it and do not use until repaired/replaced',
    ],
    correctAnswer: 1,
    explanation:
      'The SBTi is a partnership between CDP (formerly Carbon Disclosure Project), the United Nations Global Compact, World Resources Institute (WRI), and the World Wide Fund for Nature (WWF).',
  },
  {
    id: 2,
    question: 'What is required for SBTi target validation?',
    options: [
      'When Scope 3 emissions exceed 40% of total emissions',
      'Public commitment to develop science-based targets within 24 months',
      'Submission to SBTi for technical assessment against criteria',
      'The reference year against which emission reductions are measured',
    ],
    correctAnswer: 2,
    explanation:
      "Companies must submit their targets to the SBTi for validation, where technical experts assess whether targets meet the initiative's criteria for ambition, scope, and methodology before official approval.",
  },
  {
    id: 3,
    question:
      'For a 1.5°C-aligned target, what minimum annual linear reduction rate is typically required?',
    options: [
      '2.5% per year',
      '1.5% per year',
      '7% per year',
      '4.2% per year',
    ],
    correctAnswer: 3,
    explanation:
      '1.5°C-aligned targets typically require a minimum 4.2% annual linear reduction in absolute emissions, calculated from a base year to achieve the necessary reductions by 2030 consistent with climate science.',
  },
  {
    id: 4,
    question: 'What are Scope 1 emissions in the GHG Protocol framework?',
    options: [
      'Direct emissions from owned or controlled sources',
      'Emissions from purchased electricity',
      'Emissions from the supply chain',
      'Emissions from employee commuting',
    ],
    correctAnswer: 0,
    explanation:
      'Scope 1 covers direct GHG emissions from sources owned or controlled by the company, such as on-site fuel combustion, company vehicles, and refrigerant leaks from owned equipment.',
  },
  {
    id: 5,
    question: 'When must companies include Scope 3 emissions in their science-based targets?',
    options: [
      'Public commitment to develop science-based targets within 24 months',
      'When Scope 3 emissions exceed 40% of total emissions',
      'The reference year against which emission reductions are measured',
      'Direct emissions from owned or controlled sources',
    ],
    correctAnswer: 1,
    explanation:
      'SBTi requires companies to set Scope 3 targets when these emissions represent 40% or more of total Scope 1, 2, and 3 emissions, recognising the materiality threshold for supply chain impact.',
  },
  {
    id: 6,
    question: 'What is the SBTi Net-Zero Standard requirement for residual emissions?',
    options: [
      'Submission to SBTi for technical assessment against criteria',
      'Absolute targets measure total emissions; intensity targets measure emissions per unit of activity',
      'Residual emissions (typically 5-10%) must be neutralised through carbon removal',
      'Reputational impact and potential removal if consistently off-track without remediation',
    ],
    correctAnswer: 2,
    explanation:
      'The Net-Zero Standard requires companies to reduce emissions by at least 90% (typically 90-95%) and neutralise residual emissions through permanent carbon dioxide removal, not conventional offsetting.',
  },
  {
    id: 7,
    question: 'What distinguishes absolute targets from intensity targets?',
    options: [
      'Decarbonisation trajectory for operational emissions from commercial and residential buildings',
      'Residual emissions (typically 5-10%) must be neutralised through carbon removal',
      'Reputational impact and potential removal if consistently off-track without remediation',
      'Absolute targets measure total emissions; intensity targets measure emissions per unit of activity',
    ],
    correctAnswer: 3,
    explanation:
      'Absolute targets set a fixed reduction in total emissions (e.g., 50% reduction by 2030), while intensity targets set reduction relative to a business metric (e.g., 30% reduction in kgCO2e/m²).',
  },
  {
    id: 8,
    question: 'For the buildings sector, what does the SBTi sector pathway address?',
    options: [
      'Decarbonisation trajectory for operational emissions from commercial and residential buildings',
      'Reputational impact and potential removal if consistently off-track without remediation',
      'Residual emissions (typically 5-10%) must be neutralised through carbon removal',
      'Public commitment to develop science-based targets within 24 months',
    ],
    correctAnswer: 0,
    explanation:
      'The SBTi buildings sector pathway provides specific guidance for decarbonising operational emissions (heating, cooling, lighting, equipment) from commercial and residential building portfolios.',
  },
  {
    id: 9,
    question: 'What is the commitment letter stage in the SBTi process?',
    options: [
      'Direct emissions from owned or controlled sources',
      'Public commitment to develop science-based targets within 24 months',
      'Submission to SBTi for technical assessment against criteria',
      'The reference year against which emission reductions are measured',
    ],
    correctAnswer: 1,
    explanation:
      'The commitment letter is an initial public declaration that a company intends to set science-based targets, with a requirement to submit targets for validation within 24 months of signing.',
  },
  {
    id: 10,
    question: 'How often must companies with validated SBTi targets report progress?',
    options: [
      'Monthly',
      'Quarterly',
      'Annually',
      'Every 5 years',
    ],
    correctAnswer: 2,
    explanation:
      'Companies with validated targets must report their emissions and progress towards targets annually, typically through CDP disclosure or equivalent public reporting mechanisms.',
  },
  {
    id: 11,
    question: 'What is the base year in SBTi target setting?',
    options: [
      'Residual emissions (typically 5-10%) must be neutralised through carbon removal',
      'Public commitment to develop science-based targets within 24 months',
      'Direct emissions from owned or controlled sources',
      'The reference year against which emission reductions are measured',
    ],
    correctAnswer: 3,
    explanation:
      'The base year is the reference point against which emission reductions are measured. It must be representative, have verified data, and typically should not be more than two years prior to submission.',
  },
  {
    id: 12,
    question: 'What happens if a company fails to meet its validated science-based target?',
    options: [
      'Reputational impact and potential removal if consistently off-track without remediation',
      'Decarbonisation trajectory for operational emissions from commercial and residential buildings',
      'Public commitment to develop science-based targets within 24 months',
      'Absolute targets measure total emissions; intensity targets measure emissions per unit of activity',
    ],
    correctAnswer: 0,
    explanation:
      'While SBTi does not impose financial penalties, companies face reputational consequences and potential removal from the initiative if they consistently fail to demonstrate progress and do not take corrective action.',
  },
];

const faqs = [
  {
    question: 'How does SBTi differ from net-zero pledges?',
    answer:
      'While many net-zero pledges lack specific methodology or rely heavily on carbon offsets, SBTi provides a rigorous, science-based framework. The SBTi Net-Zero Standard requires deep decarbonisation (90%+ emissions reduction) before addressing residual emissions, and only accepts permanent carbon removal - not conventional offsetting - to neutralise the remaining 5-10%. This ensures targets align with actual climate science rather than aspirational statements.',
  },
  {
    question: 'Can small and medium enterprises (SMEs) set science-based targets?',
    answer:
      'Yes, SBTi offers a streamlined route for SMEs (fewer than 500 employees and non-subsidiaries of larger companies). The SME target-setting route provides simplified criteria and reduced costs while maintaining scientific rigour. SMEs commit to halving Scope 1 and 2 emissions by 2030, measure and reduce Scope 3 emissions, and report annually. This makes science-based target setting accessible regardless of company size.',
  },
  {
    question: 'How do science-based targets apply to building services contractors?',
    answer:
      'Building services contractors must address multiple emission sources: direct emissions from company vehicles and site equipment (Scope 1), purchased electricity for offices and operations (Scope 2), and supply chain emissions including materials, subcontractors, and installed equipment energy use (Scope 3). The buildings sector pathway provides specific intensity metrics (kgCO2e/m²) relevant to contractors managing building portfolios.',
  },
  {
    question: 'What is the relationship between SBTi and carbon offsetting?',
    answer:
      'For near-term targets (5-10 years), SBTi does not accept carbon offsets or credits as a means of achieving emission reduction targets - actual operational reductions are required. However, carbon credits can fund climate action beyond the value chain. For net-zero targets, only permanent carbon dioxide removal (not avoidance credits) can address the final 5-10% of residual emissions that cannot be eliminated.',
  },
  {
    question: 'How often must science-based targets be recalculated?',
    answer:
      'Targets should be recalculated every five years at minimum to reflect the latest climate science. Recalculation is also required following significant changes such as mergers, acquisitions, divestitures, or shifts in business focus that materially change the emissions profile. This ensures targets remain aligned with evolving scientific understanding and company circumstances.',
  },
  {
    question: 'What role does the buildings sector play in global emissions?',
    answer:
      'Buildings account for approximately 40% of global energy-related CO2 emissions, with building operations responsible for 28% (heating, cooling, lighting) and construction/materials for 11% (embodied carbon). This makes the buildings sector critical for achieving Paris Agreement goals and explains why SBTi has developed specific sector pathways and intensity metrics for real estate and construction companies.',
  },
];

const HNCModule6Section4_4 = () => {
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
            eyebrow="Module 6 · Section 4 · Subsection 4"
            title="Science-Based Targets"
            description="SBTi framework, 1.5°C alignment, target setting, and progress tracking for building services sustainability"
            tone="purple"
          />

          <TLDR
            points={[
              "Science-Based Targets initiative (SBTi) certifies corporate emission reduction targets aligned with limiting warming to 1.5°C — covering Scope 1, Scope 2 and (where material) Scope 3 emissions.",
              "For the built environment, the SBTi Buildings Sector Guidance (2024) sets pathways for new construction (operational + embodied) and existing building retrofit — the institutional reference for net-zero corporate strategy.",
              "Targets are typically near-term (5–10 years, e.g. 50% reduction by 2030 vs base year) plus long-term net-zero (typically 2040–2050) with annual disclosure to CDP and progress validation.",
            ]}
          />

          <RegsCallout
            source="SBTi Corporate Net-Zero Standard Version 1.2 + SBTi Buildings Sector Guidance"
            clause="A near-term science-based target shall reduce absolute Scope 1 and Scope 2 emissions by at least 42% by 2030 compared to a 2020 base year, and shall set a Scope 3 target where Scope 3 represents at least 40% of total emissions. The long-term target shall achieve at least a 90% reduction in absolute emissions by no later than 2050, with any residual emissions abated through carbon removals to achieve net-zero. For built-environment companies, both operational and embodied carbon shall be addressed."
            meaning={
              <>
                SBTi is the strictest mainstream net-zero methodology — much tougher than vague "net-zero by 2050" pledges. The 42% by 2030 absolute reduction target effectively rules out reliance on offsetting for the bulk of decarbonisation. Built-environment targets must address embodied carbon, which is increasingly difficult to reduce by 42% without supply-chain intervention.
              </>
            }
            cite="Source: SBTi Corporate Net-Zero Standard v1.2 (2023); SBTi Buildings Sector Science-Based Target Setting Guidance (2024) — sciencebasedtargets.org"
          />

          <LearningOutcomes
            outcomes={[
              "Explain the SBTi framework and validation process",
              "Distinguish between 1.5°C and well-below 2°C pathways",
              "Apply absolute and intensity target methodologies",
              "Differentiate near-term targets from net-zero commitments",
              "Describe sector pathways for buildings and construction",
              "Implement progress tracking and annual reporting requirements",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="The SBTi Framework">
            <p>The Science Based Targets initiative (SBTi) provides a rigorous framework for companies to set greenhouse gas emission reduction targets aligned with climate science. Established as a partnership between CDP, the UN Global Compact, World Resources Institute (WRI), and WWF, SBTi translates global climate goals into actionable corporate targets.</p>
            <p><strong>Core principles of science-based targets:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Science-aligned:</strong> Targets consistent with keeping global warming to 1.5°C or well-below 2°C</li>
              <li><strong>Scope coverage:</strong> Must address Scope 1, 2, and significant Scope 3 emissions</li>
              <li><strong>Time-bound:</strong> Clear deadlines with measurable interim milestones</li>
              <li><strong>Independently validated:</strong> Assessed by SBTi technical experts before approval</li>
            </ul>
            <p><strong>Temperature Pathway Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1.5°C aligned:</strong> ~4.2% per year — 50% reduction from base year — Required for new submissions</li>
              <li><strong>Well-below 2°C:</strong> ~2.5% per year — 25-30% reduction — Legacy targets only</li>
              <li><strong>2°C aligned:</strong> ~1.5% per year — ~15% reduction — No longer accepted</li>
            </ul>
            <p><strong>SBTi Validation Process</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Step 1:</strong> Commit</li>
              <li><strong>Step 2:</strong> Develop</li>
              <li><strong>Step 3:</strong> Submit</li>
              <li><strong>Step 4:</strong> Validate</li>
              <li><strong>Step 5:</strong> Communicate</li>
            </ul>
            <p><strong>Key point:</strong> Since July 2022, SBTi only accepts 1.5°C-aligned targets for new submissions, reflecting updated climate science urgency.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Target Types and Methodologies">
            <p>SBTi offers multiple approaches to target setting, allowing companies to select methodologies appropriate to their sector, size, and emissions profile. Understanding these options is essential for developing credible, achievable targets.</p>
            <p><strong>Absolute Targets</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fixed reduction in total emissions</li>
              <li>E.g., "Reduce Scope 1 & 2 by 50% by 2030"</li>
              <li>Clear, unambiguous commitment</li>
              <li>Challenging if business is growing</li>
            </ul>
            <p><strong>Intensity Targets</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reduction relative to business metric</li>
              <li>E.g., "30% reduction in kgCO2e/m²"</li>
              <li>Allows for business growth</li>
              <li>Must still drive absolute reductions</li>
            </ul>
            <p><strong>GHG Protocol Scopes</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Scope 1:</strong> Direct emissions from owned sources — Company vehicles, site generators, gas heating</li>
              <li><strong>Scope 2:</strong> Indirect emissions from purchased energy — Office electricity, workshop power, site electricity</li>
              <li><strong>Scope 3:</strong> All other indirect emissions — Materials, subcontractors, employee commuting, installed equipment operation</li>
            </ul>
            <p><strong>Target Setting Methods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Absolute Contraction Approach (ACA):</strong> All companies reduce at same rate regardless of starting point</li>
              <li><strong>Sectoral Decarbonisation Approach (SDA):</strong> Sector-specific pathways allocating remaining carbon budget</li>
              <li><strong>Economic Intensity Approach:</strong> Reduction in emissions per value-added (less common)</li>
              <li><strong>Physical Intensity Approach:</strong> Reduction per physical unit (m², kWh, tonne produced)</li>
            </ul>
            <p><strong>Scope 3 threshold:</strong> If Scope 3 emissions exceed 40% of total emissions, companies must set a separate Scope 3 target covering at least 67% of total Scope 3 emissions.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Near-Term and Net-Zero Targets">
            <p>SBTi distinguishes between near-term science-based targets (5-10 years) and long-term net-zero targets. Both are essential: near-term targets drive immediate action while net-zero targets provide the ultimate destination aligned with climate stabilisation.</p>
            <p><strong>Near-Term Targets (5-10 Years)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Coverage:</strong> 95%+ of emissions — 67%+ of emissions (if &gt;40%)</li>
              <li><strong>Ambition level:</strong> 1.5°C aligned (~4.2%/year) — Well-below 2°C minimum</li>
              <li><strong>Timeframe:</strong> 5-10 years from submission — 5-10 years from submission</li>
              <li><strong>Offsetting:</strong> Not accepted — Not accepted</li>
            </ul>
            <p><strong>SBTi Net-Zero Standard Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Deep decarbonisation:</strong> Reduce all scopes by at least 90% (typically 90-95%)</li>
              <li><strong>Neutralise residual:</strong> Address remaining 5-10% through permanent carbon removal only</li>
              <li><strong>No conventional offsets:</strong> Avoidance credits cannot substitute for actual reductions</li>
              <li><strong>Sector timeline:</strong> Buildings must reach net-zero by 2050 at latest</li>
              <li><strong>Interim targets:</strong> Near-term targets required as stepping stones</li>
            </ul>
            <p><strong>Carbon Removal vs Offsetting</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Removal (accepted):</strong> Permanently removing CO2 from atmosphere</li>
              <li>Examples: Direct air capture, biochar, enhanced weathering</li>
              <li><strong>Offsetting (not accepted):</strong> Funding emission avoidance elsewhere</li>
              <li>Examples: Avoided deforestation, renewable energy credits</li>
            </ul>
            <p><strong>Beyond Value Chain Mitigation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Carbon credits can fund additional climate action</li>
              <li>Does not count towards target achievement</li>
              <li>Demonstrates broader climate leadership</li>
              <li>Supports transition of wider economy</li>
            </ul>
            <p><strong>Critical distinction:</strong> Net-zero requires actual emissions to approach zero through operational changes - it is not achieved by purchasing enough offsets to balance remaining emissions.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Buildings Sector Pathway and Reporting">
            <p>The buildings sector has a critical role in achieving global climate goals, accounting for approximately 40% of energy-related CO2 emissions. SBTi provides sector-specific guidance through the Buildings Pathway, with intensity metrics particularly relevant to building services professionals.</p>
            <p><strong>Buildings Sector Intensity Metrics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>kgCO2e/m² (operational):</strong> Building portfolio performance — &lt;20 kgCO2e/m² for offices</li>
              <li><strong>kgCO2e/kWh (energy):</strong> Energy supply decarbonisation — &lt;0.15 kgCO2e/kWh</li>
              <li><strong>kgCO2e/£M revenue:</strong> Economic intensity — Varies by business type</li>
            </ul>
            <p><strong>Annual Reporting Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Emissions inventory:</strong> Complete Scope 1, 2, and relevant Scope 3 categories</li>
              <li><strong>Progress tracking:</strong> Compare current emissions against target trajectory</li>
              <li><strong>Methodology consistency:</strong> Use same calculation approach as base year</li>
              <li><strong>Disclosure platform:</strong> Report through CDP or equivalent public mechanism</li>
              <li><strong>Recalculation triggers:</strong> Document any base year adjustments</li>
            </ul>
            <p><strong>Building Services Contractor Scope 3 Categories</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Purchased goods:</strong> Materials, equipment, consumables — Very high (30-50%)</li>
              <li><strong>4. Upstream transport:</strong> Material delivery to sites — Medium (5-10%)</li>
              <li><strong>6. Business travel:</strong> Flights, hotels, taxis — Low (1-3%)</li>
              <li><strong>7. Employee commuting:</strong> Staff travel to work/sites — Medium (5-15%)</li>
              <li><strong>11. Use of sold products:</strong> Lifetime energy of installed systems — Very high (often largest)</li>
            </ul>
            <p><strong>Building services insight:</strong> For contractors, Category 11 (use of sold products) often dominates Scope 3 - the lifetime operational emissions of installed HVAC, lighting, and electrical systems typically exceed all other emission sources combined.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Setting an Absolute Near-Term Target</strong>
            </p>
            <p><strong>Scenario:</strong> An MEP contractor with 2020 base year emissions wants to set a 1.5°C-aligned target.</p>
            <p>Base year (2020) emissions:</p>
            <p>Scope 1: 850 tCO2e (vehicles, site equipment)</p>
            <p>Scope 2: 320 tCO2e (offices, workshops)</p>
            <p>Total Scope 1+2: 1,170 tCO2e</p>
            <p>Target calculation (1.5°C aligned):</p>
            <p>Required reduction: 4.2% linear annual reduction</p>
            <p>Target year: 2030 (10 years from base)</p>
            <p>Cumulative reduction: 42% by 2030</p>
            <p>Target emissions: 1,170 × (1 - 0.42) = 679 tCO2e</p>
            <p>Target: "Reduce absolute Scope 1 and 2 emissions 42% by 2030 from 2020 base year"</p>
            <p>
              <strong>Example 2: Intensity Target for Building Portfolio</strong>
            </p>
            <p><strong>Scenario:</strong> A facilities management company sets a buildings sector intensity target.</p>
            <p>Base year portfolio performance:</p>
            <p>Total operational emissions: 15,000 tCO2e</p>
            <p>Managed floor area: 250,000 m²</p>
            <p>Base intensity: 60 kgCO2e/m²</p>
            <p>SBTi buildings pathway requirement:</p>
            <p>2030 benchmark: ~35 kgCO2e/m² (commercial offices)</p>
            <p>Required reduction: (60-35)/60 = 42%</p>
            <p>Implementation approach:</p>
            <p>LED lighting upgrades: -15 kgCO2e/m²</p>
            <p>HVAC optimisation: -8 kgCO2e/m²</p>
            <p>Renewable electricity: -5 kgCO2e/m²</p>
            <p>Target: "Reduce building portfolio intensity to 35 kgCO2e/m² by 2030"</p>
            <p>
              <strong>Example 3: Scope 3 Assessment for Contractor</strong>
            </p>
            <p><strong>Scenario:</strong> Determining if Scope 3 targets are required for an electrical contractor.</p>
            <p>Emissions screening:</p>
            <p>Scope 1: 500 tCO2e</p>
            <p>Scope 2: 200 tCO2e</p>
            <p>Scope 3 (estimated): 4,800 tCO2e</p>
            <p>- Purchased materials: 2,100 tCO2e</p>
            <p>- Subcontractors: 1,200 tCO2e</p>
            <p>- Employee commuting: 400 tCO2e</p>
            <p>- Use of products (lifetime): 1,100 tCO2e</p>
            <p>Threshold calculation:</p>
            <p>Total: 500 + 200 + 4,800 = 5,500 tCO2e</p>
            <p>Scope 3 percentage: 4,800/5,500 = 87%</p>
            <p>Result: 87% &gt; 40% threshold - Scope 3 target REQUIRED</p>
            <p>Must set target covering 67%+ of Scope 3 (3,216+ tCO2e)</p>
            <p>
              <strong>Example 4: Net-Zero Pathway Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Planning a net-zero commitment for 2050.</p>
            <p>Current emissions profile (2024):</p>
            <p>Total all scopes: 10,000 tCO2e</p>
            <p>Net-Zero Standard requirements:</p>
            <p>Minimum reduction: 90%</p>
            <p>Maximum residual: 10% = 1,000 tCO2e</p>
            <p>Required abatement: 9,000 tCO2e through actual reductions</p>
            <p>Pathway milestones:</p>
            <p>2030 near-term: 5,800 tCO2e (-42%)</p>
            <p>2040 interim: 2,500 tCO2e (-75%)</p>
            <p>2050 net-zero: 1,000 tCO2e (-90%)</p>
            <p>Residual emissions neutralisation:</p>
            <p>1,000 tCO2e requires permanent carbon removal</p>
            <p>Options: Direct air capture, biochar, enhanced weathering</p>
            <p>Note: Conventional offsets cannot achieve net-zero status</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>SBTi Implementation Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Complete comprehensive GHG inventory across all scopes</li>
              <li>Identify base year with reliable, verified data</li>
              <li>Screen Scope 3 categories to assess 40% threshold</li>
              <li>Select appropriate target type (absolute vs intensity)</li>
              <li>Use SBTi target-setting tools for pathway calculation</li>
              <li>Document methodology and assumptions for validation</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1.5°C pathway: <strong>4.2% annual reduction</strong></li>
              <li>Scope 3 threshold: <strong>&gt;40% of total requires target</strong></li>
              <li>Scope 3 coverage: <strong>67% minimum for target</strong></li>
              <li>Net-zero: <strong>90%+ reduction</strong> plus carbon removal</li>
              <li>Commitment deadline: <strong>24 months to submit targets</strong></li>
              <li>Buildings: <strong>40% of global energy emissions</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Relying on offsets:</strong> SBTi requires actual emissions reductions for near-term targets</li>
                <li><strong>Ignoring Scope 3:</strong> Often the largest source, especially for contractors</li>
                <li><strong>Inconsistent methodology:</strong> Base year and reporting must use same approach</li>
                <li><strong>Static targets:</strong> Failing to recalculate after significant business changes</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="Client SBTi commitment forces embodied-carbon clause into JCT contract"
            situation={
              <>
                A property developer signed an SBTi commitment in 2023. Their 2030 target requires Scope 3 (mostly embodied carbon in new build) to fall 30% per m² vs 2020 baseline. The current pipeline of speculative offices is on track to miss by ~15 percentage points. The client now requires every new construction contract to include an embodied carbon target with contractual penalties.
              </>
            }
            whatToDo={
              <>
                Update procurement and contract documentation: (1) JCT 2024 with bespoke amendment clauses for embodied carbon target (kgCO₂e/m² A1–A5) with verification at handover; (2) Tender evaluation weighted on EPD-backed material specifications; (3) Pre-construction WLCA at Stage 2 with target ranges; (4) Quarterly embodied carbon reporting during construction. Brief the supply chain — most M&E subcontractors have not done this and will need EPDs from suppliers.
              </>
            }
            whyItMatters={
              <>
                SBTi is moving from corporate disclosure into project specification. Contractors and consultants who cannot quote embodied carbon will progressively lose work as developer pipelines align to SBTi. The technical capability to measure, report and reduce embodied carbon is becoming a core M&E design competence.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "SBTi = Science Based Targets initiative — most rigorous mainstream net-zero methodology.",
              "Near-term: ≥42% reduction Scope 1+2 by 2030 vs 2020 base year.",
              "Long-term: ≥90% reduction by 2050 with residual offsets only.",
              "Scope 3 mandatory if ≥40% of total emissions — for property developers this means embodied carbon.",
              "SBTi Buildings Sector Guidance (2024) is the built-environment reference.",
              "Annual disclosure to CDP and target progress validation required.",
              "Moving from corporate disclosure into project contracts and tender evaluation criteria.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section4-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Embodied carbon
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section4-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Carbon offsetting
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section4_4;
