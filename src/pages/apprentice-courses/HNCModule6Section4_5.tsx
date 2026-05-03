/**
 * Module 6 · Section 4 · Subsection 5 — Carbon Offsetting
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Offset types, quality standards, additionality, permanence and the role of offsetting in net-zero strategies
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

const TITLE = 'Carbon Offsetting - HNC Module 6 Section 4.5';
const DESCRIPTION =
  'Master carbon offsetting for net-zero strategies: offset types, quality standards, additionality, permanence, verification frameworks, and the role of offsetting in achieving carbon neutrality.';

const quickCheckQuestions = [
  {
    id: 'offset-types',
    question:
      'What is the fundamental difference between carbon avoidance and carbon removal offsets?',
    options: [
      'Avoidance is cheaper than removal',
      'Avoidance prevents emissions; removal extracts CO2 already in the atmosphere',
      'Removal is only for voluntary markets',
      'Avoidance offsets expire after 10 years',
    ],
    correctIndex: 1,
    explanation:
      'Carbon avoidance offsets prevent emissions that would otherwise occur (e.g., protecting forests, renewable energy projects), while removal offsets actively extract CO2 from the atmosphere (e.g., direct air capture, afforestation).',
  },
  {
    id: 'additionality',
    question:
      "Why is 'additionality' considered the most critical quality criterion for carbon offsets?",
    options: [
      'It ensures offsets are permanent',
      'It guarantees the project would not have happened without offset funding',
      'It means offsets can be counted multiple times',
      'It relates to project location requirements',
    ],
    correctIndex: 1,
    explanation:
      'Additionality ensures the emission reduction would not have occurred without the revenue from selling offsets. Without additionality, purchasing offsets does not create any real climate benefit - you are paying for something that would have happened anyway.',
  },
  {
    id: 'permanence',
    question: "What is the main risk associated with 'permanence' in nature-based carbon offsets?",
    options: [
      'Projects may become too expensive',
      'Stored carbon can be released back to atmosphere through fires, disease, or land-use change',
      'Verification standards may change',
      'Market prices fluctuate over time',
    ],
    correctIndex: 1,
    explanation:
      'Nature-based solutions like forests face reversal risks - fires, pests, disease, or future deforestation can release stored carbon back into the atmosphere, negating the offset benefit. This is why permanence monitoring and buffer pools are essential.',
  },
  {
    id: 'offset-hierarchy',
    question: 'According to best practice guidance, when should organisations use carbon offsets?',
    options: [
      'As the primary strategy for achieving net-zero',
      'Only for residual emissions after maximising internal reductions',
      'For all Scope 3 emissions',
      'Whenever they are cheaper than internal reduction measures',
    ],
    correctIndex: 1,
    explanation:
      'The mitigation hierarchy requires organisations to first avoid emissions, then reduce what cannot be avoided, and only then offset residual emissions that cannot be eliminated through other means. Offsets should be a last resort, not a first choice.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which type of carbon offset directly removes CO2 from the atmosphere?',
    options: [
      'Renewable energy projects',
      'Avoided deforestation (REDD+)',
      'Direct air capture with carbon storage (DACCS)',
      'Energy efficiency improvements',
    ],
    correctAnswer: 2,
    explanation:
      'Direct air capture with carbon storage (DACCS) physically removes CO2 from ambient air and stores it permanently. Renewable energy, REDD+, and efficiency projects are avoidance/reduction offsets that prevent emissions rather than removing existing atmospheric CO2.',
  },
  {
    id: 2,
    question: "What does the 'Gold Standard' certification indicate about a carbon offset project?",
    options: [
      'It uses gold-plated equipment',
      'It meets rigorous criteria including additionality, verification, and sustainable development benefits',
      'It is the cheapest available option',
      'It is government-funded',
    ],
    correctAnswer: 1,
    explanation:
      'Gold Standard is a premium certification requiring projects to demonstrate additionality, undergo independent verification, and deliver measurable sustainable development benefits beyond carbon reduction, such as community health improvements or biodiversity protection.',
  },
  {
    id: 3,
    question: "What is 'double counting' in the context of carbon offsets?",
    options: [
      "Counting the same offset twice in an organisation's inventory",
      'When both the project developer and offset buyer claim the same emission reduction',
      'Using two different verification standards',
      'Purchasing offsets from two different projects',
    ],
    correctAnswer: 1,
    explanation:
      "Double counting occurs when the same emission reduction is claimed by multiple parties - for example, both the host country (for national targets) and the purchasing company. The Paris Agreement's Article 6 establishes 'corresponding adjustments' to prevent this.",
  },
  {
    id: 4,
    question:
      'Which verification standard is most widely used for voluntary carbon market offsets?',
    options: ['ISO 14001', 'Verified Carbon Standard (VCS/Verra)', 'BREEAM', 'PAS 2080'],
    correctAnswer: 1,
    explanation:
      'The Verified Carbon Standard (VCS), managed by Verra, is the most widely used standard in the voluntary carbon market, certifying over 1,800 projects and issuing more than 1 billion carbon credits. It provides methodology frameworks and registry infrastructure.',
  },
  {
    id: 5,
    question:
      'What is the Science Based Targets initiative (SBTi) guidance on using offsets for Scope 1 and 2 emissions?',
    options: [
      'Offsets can be used to meet 100% of targets',
      'Offsets should only be used for residual emissions after 90%+ reduction',
      'Offsets are required for all target-setting',
      'Offsets are not permitted under any circumstances',
    ],
    correctAnswer: 1,
    explanation:
      'SBTi requires companies to reduce Scope 1 and 2 emissions by at least 90% by the net-zero target year. Only residual emissions (maximum 10%) can be addressed through high-quality carbon removals, not avoidance offsets. This ensures real decarbonisation.',
  },
  {
    id: 6,
    question: "What is 'leakage' in the context of carbon offset projects?",
    options: [
      'Physical leakage of captured CO2',
      'When emission reductions in one area cause increases elsewhere',
      'Loss of offset credits due to market changes',
      'Verification gaps in monitoring',
    ],
    correctAnswer: 1,
    explanation:
      'Leakage occurs when protecting one forest from logging simply shifts deforestation to another unprotected area. Effective offset projects must account for leakage risk, either by expanding project boundaries or applying discount factors to credit calculations.',
  },
  {
    id: 7,
    question: 'What is the typical permanence requirement for high-quality carbon removal offsets?',
    options: [
      '5-10 years',
      '25-50 years',
      '100+ years (ideally 1,000+ years)',
      'No specific requirement',
    ],
    correctAnswer: 2,
    explanation:
      'High-quality carbon removal standards require storage for 100+ years minimum, with premium standards like the Oxford Principles recommending 1,000+ years. This reflects the long atmospheric lifetime of CO2 and the need for removals to genuinely counterbalance emissions.',
  },
  {
    id: 8,
    question: 'Which of the following is NOT a recognised carbon offset project type?',
    options: [
      'Biochar production and soil application',
      'Enhanced weathering of minerals',
      'Carbon capture during cement production',
      'Purchasing renewable energy certificates (RECs)',
    ],
    correctAnswer: 3,
    explanation:
      'Renewable Energy Certificates (RECs) represent the environmental attributes of renewable electricity generation but do not themselves constitute carbon offsets. They cannot be used to claim emission reductions in carbon inventories - they relate to energy sourcing, not offsetting.',
  },
  {
    id: 9,
    question:
      "What is the 'Oxford Offsetting Principles' recommendation for offset portfolio composition over time?",
    options: [
      'Use only the cheapest available offsets',
      'Shift progressively from avoidance to removal offsets, and from short-lived to long-lived storage',
      'Maintain a 50/50 split between project types',
      'Focus exclusively on local projects',
    ],
    correctAnswer: 1,
    explanation:
      'The Oxford Offsetting Principles recommend a transition pathway: organisations should shift from emission avoidance/reduction offsets toward carbon removal offsets, and from short-lived storage (forests) toward long-lived storage (geological) as technologies mature and scale.',
  },
  {
    id: 10,
    question: "What is a 'buffer pool' in the context of nature-based carbon offsets?",
    options: [
      'A financial reserve for project costs',
      'A percentage of credits held back to cover potential reversal events',
      'A geographic zone around the project boundary',
      'A waiting period before credits can be traded',
    ],
    correctAnswer: 1,
    explanation:
      'Buffer pools require a percentage of generated credits (typically 10-20%) to be held in reserve to compensate for potential reversals across the portfolio. If a project experiences fire or other loss, buffer credits can be cancelled to maintain overall integrity.',
  },
  {
    id: 11,
    question:
      'Under the Paris Agreement Article 6, what mechanism prevents double counting between countries?',
    options: [
      'Carbon tariffs',
      'Corresponding adjustments to national inventories',
      'Mandatory offset quotas',
      'International offset taxes',
    ],
    correctAnswer: 1,
    explanation:
      'Corresponding adjustments require the host country to add the transferred emission reductions back to its national inventory when credits are sold internationally, ensuring the reduction is only counted by the purchasing country. This maintains environmental integrity of national targets.',
  },
  {
    id: 12,
    question: 'What is the primary criticism of using avoided deforestation (REDD+) offsets?',
    options: [
      'They are too expensive',
      'Baseline setting is difficult, leading to credits for forests that were never at risk',
      'They only work in tropical regions',
      'They require too much land',
    ],
    correctAnswer: 1,
    explanation:
      "REDD+ projects face significant baseline challenges - determining what would have happened without the project is inherently uncertain. Critics argue many projects generate credits for forests that faced little actual deforestation threat, undermining additionality and crediting 'phantom' reductions.",
  },
];

const faqs = [
  {
    question: 'Are carbon offsets the same as carbon credits?',
    answer:
      "The terms are often used interchangeably but have subtle differences. A carbon credit is a tradeable certificate representing one tonne of CO2e reduction or removal. A carbon offset is the action of using credits to compensate for emissions elsewhere. In practice, 'buying offsets' means purchasing and retiring carbon credits. The distinction matters for accounting - credits are instruments; offsetting is the action of claiming neutralisation.",
  },
  {
    question: "Can my organisation claim 'carbon neutral' using only offsets?",
    answer:
      'Technically yes, but this approach faces increasing criticism and regulatory scrutiny. PAS 2060 (carbon neutrality standard) requires demonstrating commitment to emission reductions alongside offsetting. The UK Competition and Markets Authority has warned against misleading claims where offsets substitute for genuine decarbonisation. Best practice is to reduce first, offset residual emissions, and communicate transparently about the balance.',
  },
  {
    question: 'How do I verify that carbon offsets are legitimate?',
    answer:
      "Look for offsets certified by recognised standards: Verified Carbon Standard (Verra), Gold Standard, American Carbon Registry, or Climate Action Reserve. Check the registry for unique serial numbers - each credit should be traceable and show 'retired' status once used. Review project documentation for third-party verification reports. Be wary of uncertified offsets or unusually cheap credits without transparent provenance.",
  },
  {
    question: 'What is the difference between compliance and voluntary carbon markets?',
    answer:
      'Compliance markets are mandatory schemes created by regulation (e.g., EU Emissions Trading System) where covered entities must hold allowances for their emissions. Voluntary markets are where organisations and individuals purchase offsets voluntarily to meet corporate commitments or personal goals. Compliance markets have stricter rules and typically higher prices; voluntary markets offer more flexibility but variable quality.',
  },
  {
    question: 'Should building services projects use offsets for embodied carbon?',
    answer:
      'Offsets can address residual embodied carbon after material selection and design optimisation, but should not replace genuine reduction efforts. PAS 2080 (carbon management in infrastructure) emphasises the mitigation hierarchy. For building services, prioritise: low-carbon materials, efficient design, extended equipment life, circular economy approaches. Use high-quality removal offsets for genuinely unavoidable embodied emissions, with transparent reporting.',
  },
  {
    question: 'How will carbon offset markets change with net-zero deadlines approaching?',
    answer:
      'Expect increasing demand for high-quality removal offsets as more organisations reach their target years with residual emissions. Prices for credible offsets are likely to rise substantially. Avoidance offsets may become less accepted for corporate claims. Regulatory frameworks (including UK and EU) are tightening rules around offset claims. Organisations should plan for rising costs and reduced availability of premium credits.',
  },
];

const HNCModule6Section4_5 = () => {
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
            eyebrow="Module 6 · Section 4 · Subsection 5"
            title="Carbon Offsetting"
            description="Offset types, quality standards, additionality, permanence and the role of offsetting in net-zero strategies"
            tone="purple"
          />

          <TLDR
            points={[
              "Carbon offsets are credits from emission-reduction or removal projects (renewable energy, reforestation, direct air capture) used to \"offset\" residual emissions that cannot be eliminated at source — measured in tonnes CO₂e.",
              "Quality varies enormously — robust offsets must demonstrate additionality (would not have happened without the funding), permanence (removal is durable), and verification (independent audit) under standards such as Verra VCS, Gold Standard, or Woodland Carbon Code (UK).",
              "In SBTi-aligned strategy, offsets are explicitly the last resort — applicable only to residual emissions after the science-based reduction trajectory (typically ≤10% of base-year emissions by 2050), and ideally removals (DAC, biochar, BECCS) not avoidance.",
            ]}
          />

          <RegsCallout
            source="ISO 14068-1:2023 Carbon Neutrality + Advertising Standards Authority guidance"
            clause="A claim of carbon neutrality shall be supported by a documented emissions reduction plan demonstrating action to reduce emissions in line with relevant climate science, with offsetting used only for residual emissions after maximum feasible reduction. Offsets shall be of demonstrated quality (verified to a recognised standard, additional, permanent, with no double-counting) and shall be retired and reported transparently. Misleading claims of neutrality or net-zero may breach the CAP Code or the BCAP Code and be subject to ASA enforcement."
            meaning={
              <>
                ISO 14068 (replacing PAS 2060) is the international standard for substantiated carbon-neutrality claims. The ASA has banned multiple "carbon-neutral" marketing claims in the UK for relying on low-quality offsets without supporting reduction action — effectively making rigorous offsetting compliance a marketing-and-legal issue, not just an environmental one.
              </>
            }
            cite="Source: ISO 14068-1:2023 — iso.org; ASA rulings on environmental claims — asa.org.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Distinguish between avoidance and removal carbon offsets",
              "Evaluate offset quality using additionality and permanence criteria",
              "Apply verification standards including Gold Standard and VCS",
              "Position offsetting correctly within the mitigation hierarchy",
              "Assess criticisms and limitations of carbon offset approaches",
              "Integrate offsetting into organisational net-zero strategies",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Carbon Offset Types">
            <p>Carbon offsets represent verified emission reductions or removals that can be used to compensate for emissions occurring elsewhere. The fundamental distinction lies between offsets that prevent emissions from happening (avoidance/reduction) and those that remove existing CO2 from the atmosphere.</p>
            <p><strong>Two fundamental offset categories:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Avoidance/reduction offsets:</strong> Prevent emissions that would otherwise occur - protecting forests, displacing fossil fuels with renewables, improving efficiency</li>
              <li><strong>Removal offsets:</strong> Extract CO2 already in the atmosphere - afforestation, direct air capture, enhanced weathering, biochar</li>
            </ul>
            <p><strong>Common Offset Project Types</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Avoidance:</strong> Renewable energy — Displaces fossil fuel generation</li>
              <li><strong>REDD+ (avoided deforestation):</strong> Prevents forest carbon release</li>
              <li><strong>Clean cookstoves:</strong> Reduces fuel consumption</li>
              <li><strong>Methane capture (landfill/agriculture):</strong> Destroys potent GHG</li>
              <li><strong>Removal:</strong> Afforestation/reforestation — Trees absorb atmospheric CO2</li>
              <li><strong>Direct air capture (DAC):</strong> Chemical capture from ambient air</li>
              <li><strong>Biochar:</strong> Stable carbon in soil</li>
              <li><strong>Enhanced weathering:</strong> Mineral carbonation</li>
            </ul>
            <p><strong>Critical distinction:</strong> For genuine net-zero claims, only removal offsets can balance residual emissions - avoidance offsets reduce global emissions but do not neutralise the buyer's own emissions.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Quality Criteria and Standards">
            <p>Not all carbon offsets deliver equivalent climate benefits. Robust quality criteria distinguish credible offsets from those that may not represent real emission reductions. Understanding these criteria is essential for responsible procurement.</p>
            <p><strong>Additionality</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Would project happen without offset revenue?</li>
              <li>Must demonstrate financial/barrier additionality</li>
              <li>Excludes legally required actions</li>
              <li>Most debated quality criterion</li>
            </ul>
            <p><strong>Permanence</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>How long will carbon stay stored?</li>
              <li>Forests: reversal risk (fire, disease)</li>
              <li>Geological storage: 1,000+ years</li>
              <li>Buffer pools mitigate reversal risk</li>
            </ul>
            <p><strong>Verification</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Independent third-party assessment</li>
              <li>Quantification methodology review</li>
              <li>Ongoing monitoring requirements</li>
              <li>Registry tracking and retirement</li>
            </ul>
            <p><strong>No Leakage or Double Counting</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Leakage: emissions shift elsewhere</li>
              <li>Double counting: multiple claims</li>
              <li>Corresponding adjustments under Paris Agreement</li>
              <li>Unique serial number per credit</li>
            </ul>
            <p><strong>Major Verification Standards</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Verified Carbon Standard (VCS/Verra):</strong> All project types — Largest voluntary market registry, 1B+ credits issued</li>
              <li><strong>Gold Standard:</strong> Development co-benefits — Requires UN SDG contributions, premium pricing</li>
              <li><strong>American Carbon Registry (ACR):</strong> North American projects — Compliance and voluntary markets</li>
              <li><strong>Climate Action Reserve (CAR):</strong> North American projects — California compliance programme eligible</li>
              <li><strong>Puro.earth:</strong> Carbon removals only — Engineered removal focus, 100+ year permanence</li>
            </ul>
            <p><strong>Quality guidance:</strong> Prioritise certified credits with clear additionality demonstration, appropriate permanence for your claims, and transparent registry tracking to retirement.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Offsetting in Net-Zero Strategies">
            <p>Carbon offsetting occupies a specific position within the mitigation hierarchy - it should address residual emissions only after all practicable reduction measures have been implemented. Understanding this hierarchy is critical for credible net-zero strategies.</p>
            <p><strong>The Mitigation Hierarchy</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Priority 1:</strong> AVOID</li>
              <li><strong>Priority 2:</strong> REDUCE</li>
              <li><strong>Priority 3:</strong> SUBSTITUTE</li>
              <li><strong>Priority 4:</strong> OFFSET</li>
            </ul>
            <p><strong>SBTi Net-Zero Standard Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>90%+ reduction:</strong> Scope 1 and 2 emissions must be reduced by at least 90% before offsetting</li>
              <li><strong>Removal only:</strong> Only carbon removal offsets (not avoidance) can be used for residual emissions</li>
              <li><strong>High quality:</strong> Removals must meet strict permanence and verification criteria</li>
              <li><strong>Beyond value chain:</strong> Separate from internal abatement investments</li>
            </ul>
            <p><strong>Offset Portfolio Evolution (Oxford Principles)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Near-term (2025):</strong> Primarily avoidance with some removal — Mix of short and long-lived</li>
              <li><strong>Medium-term (2030):</strong> Increasing removal proportion — Shift toward long-lived storage</li>
              <li><strong>Long-term (2040+):</strong> Predominantly or exclusively removal — Long-lived storage dominant</li>
              <li><strong>Net-zero target year:</strong> High-quality removal only — Permanent geological/equivalent</li>
            </ul>
            <p><strong>Building services application:</strong> For MEP contractors pursuing net-zero, prioritise operational energy efficiency, low-carbon materials, and supplier engagement before considering offsets for genuinely unavoidable embodied or operational emissions.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Criticisms, Limitations and Best Practice">
            <p>Carbon offsetting faces significant criticisms that must be understood to use offsets responsibly. These limitations do not invalidate offsetting entirely but require careful consideration and transparent communication.</p>
            <p><strong>Key Criticisms of Carbon Offsetting</strong></p>
            <p><strong>Additionality Challenges</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Counterfactual baseline inherently uncertain</li>
              <li>Some projects would occur anyway</li>
              <li>Gaming of additionality tests</li>
              <li>Renewable energy additionality declining</li>
            </ul>
            <p><strong>Permanence Risks</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Forest fires increasing with climate change</li>
              <li>Reversal undermines climate benefit</li>
              <li>Buffer pools may be insufficient</li>
              <li>Long-term monitoring uncertain</li>
            </ul>
            <p><strong>Moral Hazard</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>'Licence to pollute' criticism</li>
              <li>May delay genuine decarbonisation</li>
              <li>Perception of buying way out</li>
              <li>Greenwashing concerns</li>
            </ul>
            <p><strong>Market Integrity Issues</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Quality varies significantly</li>
              <li>Opaque pricing</li>
              <li>Double counting risks</li>
              <li>Regulatory fragmentation</li>
            </ul>
            <p><strong>Recent Controversies</strong></p>
            <p>Investigative reporting has revealed quality issues in major offset programmes, including REDD+ projects credited for protecting forests that faced little deforestation threat. The Integrity Council for the Voluntary Carbon Market (ICVCM) is developing Core Carbon Principles to improve standards. Organisations should conduct due diligence beyond relying solely on certification.</p>
            <p><strong>Best Practice Guidance for Offset Use</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Mitigation hierarchy first:</strong> Document reduction efforts before offsetting; set internal carbon price to drive efficiency</li>
              <li><strong>High-quality credits only:</strong> Verify certification, review project documentation, check registry status</li>
              <li><strong>Transition toward removals:</strong> Plan portfolio evolution from avoidance to removal over time</li>
              <li><strong>Transparent communication:</strong> Report offsets separately from reductions; avoid misleading neutrality claims</li>
              <li><strong>Due diligence:</strong> Go beyond certification to assess project-specific risks and co-benefits</li>
            </ul>
            <p><strong>Practical guidance:</strong> Treat offsetting as insurance for unavoidable emissions, not a substitute for decarbonisation. Allocate budget to removal offsets and plan for price increases as demand grows.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Evaluating Offset Quality</strong>
            </p>
            <p><strong>Scenario:</strong> An MEP contractor is offered forest protection offsets at GBP 8/tCO2e. Assess quality.</p>
            <p>Quality assessment checklist:</p>
            <p>1. Certification: Check for VCS/Gold Standard certification</p>
            <p>2. Additionality: Review project documentation</p>
            <p>- Was forest genuinely at risk of deforestation?</p>
            <p>- What is the baseline methodology?</p>
            <p>Warning: Very low price may indicate quality issues</p>
            <p>3. Permanence: Assess reversal risk</p>
            <p>- What is the buffer pool percentage?</p>
            <p>- Fire/disease history in region?</p>
            <p>4. Registry: Verify on Verra/Gold Standard registry</p>
            <p>- Unique serial numbers assigned?</p>
            <p>- Will credits be retired in your name?</p>
            <p>Recommendation: Request third-party verification report</p>
            <p>Consider paying premium for higher-quality credits</p>
            <p>
              <strong>Example 2: Building an Offset Strategy</strong>
            </p>
            <p><strong>Scenario:</strong> Develop an offset strategy for a building services company targeting net-zero by 2040.</p>
            <p>Phase 1 (2024-2027): Foundation</p>
            <p>- Complete Scope 1, 2, 3 inventory</p>
            <p>- Set science-based reduction targets</p>
            <p>- Begin offset procurement for engagement</p>
            <p>- Mix: 70% avoidance, 30% removal</p>
            <p>Phase 2 (2028-2033): Transition</p>
            <p>- Achieve 50% absolute reduction</p>
            <p>- Increase removal proportion</p>
            <p>- Mix: 40% avoidance, 60% removal</p>
            <p>Phase 3 (2034-2040): Net-Zero</p>
            <p>- Achieve 90%+ reduction</p>
            <p>- Removals only for residual emissions</p>
            <p>- Mix: 100% high-permanence removal</p>
            <p>Budget planning: Assume 3-5x price increase for removals by 2040</p>
            <p>
              <strong>Example 3: Calculating Residual Emissions</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate offset requirements for a net-zero building project.</p>
            <p>Project: Commercial office building MEP installation</p>
            <p>Embodied carbon assessment:</p>
            <p>Total embodied carbon: 450 tCO2e</p>
            <p>Reduction through design: -120 tCO2e (27%)</p>
            <p>Low-carbon materials: -85 tCO2e (19%)</p>
            <p>Supplier engagement: -45 tCO2e (10%)</p>
            <p>-----</p>
            <p>Residual to offset: 200 tCO2e (44%)</p>
            <p>Offset procurement:</p>
            <p>Removal credits required: 200 tCO2e</p>
            <p>Assumed price (2024): GBP 120/tCO2e</p>
            <p>Total offset budget: GBP 24,000</p>
            <p>Demonstrate 56% reduction before offsetting</p>
            <p>Document in sustainability report with reduction evidence</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Offset Quality Assessment Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify certification by recognised standard (VCS, Gold Standard, etc.)</li>
              <li>Review additionality documentation and baseline methodology</li>
              <li>Assess permanence risk and buffer pool adequacy</li>
              <li>Check registry for unique serial numbers and retirement process</li>
              <li>Evaluate co-benefits (biodiversity, community development)</li>
              <li>Consider price as quality indicator (very cheap = higher risk)</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>SBTi net-zero: <strong>90%+ reduction</strong> required before offsetting</li>
              <li>Permanence target: <strong>100+ years</strong> (ideally 1,000+)</li>
              <li>Buffer pools: <strong>10-20%</strong> of credits held for reversal</li>
              <li>One credit: <strong>1 tonne CO2e</strong> reduced or removed</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Using offsets first</strong> - Always exhaust reduction options before offsetting</li>
                <li><strong>Choosing on price alone</strong> - Cheap credits often have quality issues</li>
                <li><strong>Claiming carbon neutral without transparency</strong> - Separate offset claims from reductions</li>
                <li><strong>Ignoring portfolio evolution</strong> - Plan transition toward removals over time</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="Voluntary carbon market reform devalues retired credits"
            situation={
              <>
                A property company purchased 50,000 tonnes of REDD+ (avoided deforestation) credits in 2021 to offset annual operational emissions. Investigative journalism in 2023 questioned the additionality of many REDD+ projects; in 2024 the Voluntary Carbon Market Integrity Initiative (VCMI) tightened quality criteria. The company's historic offsets no longer meet the new standard for net-zero claims.
              </>
            }
            whatToDo={
              <>
                Three-stage response: (1) accelerate operational emission reductions to reduce future offset reliance; (2) shift offset purchasing from avoidance (REDD+) to removals (DAC, biochar, BECCS) — much more expensive but credible; (3) update marketing claims to remove "carbon neutral" wording where the supporting offsets no longer meet ISO 14068. Long-term: re-baseline to SBTi methodology where offsets are explicitly minimised, not maximised.
              </>
            }
            whyItMatters={
              <>
                The voluntary carbon market is in active reform. Avoidance-based credits (which were the bulk of the market) are losing credibility; removal credits are scarce and expensive. Any organisation building a sustainability strategy on offsetting needs a transition plan to direct emission reduction — and to higher-quality offsets at much higher prices (£100/tCO₂e+ for DAC vs £5–15 for avoidance).
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Offsets = credits from emission reduction (avoidance) or removal projects.",
              "Quality criteria: additionality, permanence, verification, no double-counting.",
              "Standards: Verra VCS, Gold Standard, Woodland Carbon Code (UK), Plan Vivo.",
              "SBTi treats offsets as last resort — only for residual ≤10% emissions by 2050.",
              "Removals (DAC, biochar, BECCS) are higher quality than avoidance (REDD+).",
              "ISO 14068-1 (2023) replaces PAS 2060 for substantiated neutrality claims.",
              "ASA enforcement — misleading offsetting claims are now actively challenged.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section4-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Science-based targets
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section4-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Net-zero pathways
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section4_5;
