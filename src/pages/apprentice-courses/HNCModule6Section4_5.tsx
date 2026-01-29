import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Carbon Offsetting - HNC Module 6 Section 4.5";
const DESCRIPTION = "Master carbon offsetting for net-zero strategies: offset types, quality standards, additionality, permanence, verification frameworks, and the role of offsetting in achieving carbon neutrality.";

const quickCheckQuestions = [
  {
    id: "offset-types",
    question: "What is the fundamental difference between carbon avoidance and carbon removal offsets?",
    options: ["Avoidance is cheaper than removal", "Avoidance prevents emissions; removal extracts CO2 already in the atmosphere", "Removal is only for voluntary markets", "Avoidance offsets expire after 10 years"],
    correctIndex: 1,
    explanation: "Carbon avoidance offsets prevent emissions that would otherwise occur (e.g., protecting forests, renewable energy projects), while removal offsets actively extract CO2 from the atmosphere (e.g., direct air capture, afforestation)."
  },
  {
    id: "additionality",
    question: "Why is 'additionality' considered the most critical quality criterion for carbon offsets?",
    options: ["It ensures offsets are permanent", "It guarantees the project would not have happened without offset funding", "It means offsets can be counted multiple times", "It relates to project location requirements"],
    correctIndex: 1,
    explanation: "Additionality ensures the emission reduction would not have occurred without the revenue from selling offsets. Without additionality, purchasing offsets does not create any real climate benefit - you are paying for something that would have happened anyway."
  },
  {
    id: "permanence",
    question: "What is the main risk associated with 'permanence' in nature-based carbon offsets?",
    options: ["Projects may become too expensive", "Stored carbon can be released back to atmosphere through fires, disease, or land-use change", "Verification standards may change", "Market prices fluctuate over time"],
    correctIndex: 1,
    explanation: "Nature-based solutions like forests face reversal risks - fires, pests, disease, or future deforestation can release stored carbon back into the atmosphere, negating the offset benefit. This is why permanence monitoring and buffer pools are essential."
  },
  {
    id: "offset-hierarchy",
    question: "According to best practice guidance, when should organisations use carbon offsets?",
    options: ["As the primary strategy for achieving net-zero", "Only for residual emissions after maximising internal reductions", "For all Scope 3 emissions", "Whenever they are cheaper than internal reduction measures"],
    correctIndex: 1,
    explanation: "The mitigation hierarchy requires organisations to first avoid emissions, then reduce what cannot be avoided, and only then offset residual emissions that cannot be eliminated through other means. Offsets should be a last resort, not a first choice."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which type of carbon offset directly removes CO2 from the atmosphere?",
    options: [
      "Renewable energy projects",
      "Avoided deforestation (REDD+)",
      "Direct air capture with carbon storage (DACCS)",
      "Energy efficiency improvements"
    ],
    correctAnswer: 2,
    explanation: "Direct air capture with carbon storage (DACCS) physically removes CO2 from ambient air and stores it permanently. Renewable energy, REDD+, and efficiency projects are avoidance/reduction offsets that prevent emissions rather than removing existing atmospheric CO2."
  },
  {
    id: 2,
    question: "What does the 'Gold Standard' certification indicate about a carbon offset project?",
    options: ["It uses gold-plated equipment", "It meets rigorous criteria including additionality, verification, and sustainable development benefits", "It is the cheapest available option", "It is government-funded"],
    correctAnswer: 1,
    explanation: "Gold Standard is a premium certification requiring projects to demonstrate additionality, undergo independent verification, and deliver measurable sustainable development benefits beyond carbon reduction, such as community health improvements or biodiversity protection."
  },
  {
    id: 3,
    question: "What is 'double counting' in the context of carbon offsets?",
    options: [
      "Counting the same offset twice in an organisation's inventory",
      "When both the project developer and offset buyer claim the same emission reduction",
      "Using two different verification standards",
      "Purchasing offsets from two different projects"
    ],
    correctAnswer: 1,
    explanation: "Double counting occurs when the same emission reduction is claimed by multiple parties - for example, both the host country (for national targets) and the purchasing company. The Paris Agreement's Article 6 establishes 'corresponding adjustments' to prevent this."
  },
  {
    id: 4,
    question: "Which verification standard is most widely used for voluntary carbon market offsets?",
    options: [
      "ISO 14001",
      "Verified Carbon Standard (VCS/Verra)",
      "BREEAM",
      "PAS 2080"
    ],
    correctAnswer: 1,
    explanation: "The Verified Carbon Standard (VCS), managed by Verra, is the most widely used standard in the voluntary carbon market, certifying over 1,800 projects and issuing more than 1 billion carbon credits. It provides methodology frameworks and registry infrastructure."
  },
  {
    id: 5,
    question: "What is the Science Based Targets initiative (SBTi) guidance on using offsets for Scope 1 and 2 emissions?",
    options: [
      "Offsets can be used to meet 100% of targets",
      "Offsets should only be used for residual emissions after 90%+ reduction",
      "Offsets are required for all target-setting",
      "Offsets are not permitted under any circumstances"
    ],
    correctAnswer: 1,
    explanation: "SBTi requires companies to reduce Scope 1 and 2 emissions by at least 90% by the net-zero target year. Only residual emissions (maximum 10%) can be addressed through high-quality carbon removals, not avoidance offsets. This ensures real decarbonisation."
  },
  {
    id: 6,
    question: "What is 'leakage' in the context of carbon offset projects?",
    options: [
      "Physical leakage of captured CO2",
      "When emission reductions in one area cause increases elsewhere",
      "Loss of offset credits due to market changes",
      "Verification gaps in monitoring"
    ],
    correctAnswer: 1,
    explanation: "Leakage occurs when protecting one forest from logging simply shifts deforestation to another unprotected area. Effective offset projects must account for leakage risk, either by expanding project boundaries or applying discount factors to credit calculations."
  },
  {
    id: 7,
    question: "What is the typical permanence requirement for high-quality carbon removal offsets?",
    options: [
      "5-10 years",
      "25-50 years",
      "100+ years (ideally 1,000+ years)",
      "No specific requirement"
    ],
    correctAnswer: 2,
    explanation: "High-quality carbon removal standards require storage for 100+ years minimum, with premium standards like the Oxford Principles recommending 1,000+ years. This reflects the long atmospheric lifetime of CO2 and the need for removals to genuinely counterbalance emissions."
  },
  {
    id: 8,
    question: "Which of the following is NOT a recognised carbon offset project type?",
    options: [
      "Biochar production and soil application",
      "Enhanced weathering of minerals",
      "Carbon capture during cement production",
      "Purchasing renewable energy certificates (RECs)"
    ],
    correctAnswer: 3,
    explanation: "Renewable Energy Certificates (RECs) represent the environmental attributes of renewable electricity generation but do not themselves constitute carbon offsets. They cannot be used to claim emission reductions in carbon inventories - they relate to energy sourcing, not offsetting."
  },
  {
    id: 9,
    question: "What is the 'Oxford Offsetting Principles' recommendation for offset portfolio composition over time?",
    options: [
      "Use only the cheapest available offsets",
      "Shift progressively from avoidance to removal offsets, and from short-lived to long-lived storage",
      "Maintain a 50/50 split between project types",
      "Focus exclusively on local projects"
    ],
    correctAnswer: 1,
    explanation: "The Oxford Offsetting Principles recommend a transition pathway: organisations should shift from emission avoidance/reduction offsets toward carbon removal offsets, and from short-lived storage (forests) toward long-lived storage (geological) as technologies mature and scale."
  },
  {
    id: 10,
    question: "What is a 'buffer pool' in the context of nature-based carbon offsets?",
    options: [
      "A financial reserve for project costs",
      "A percentage of credits held back to cover potential reversal events",
      "A geographic zone around the project boundary",
      "A waiting period before credits can be traded"
    ],
    correctAnswer: 1,
    explanation: "Buffer pools require a percentage of generated credits (typically 10-20%) to be held in reserve to compensate for potential reversals across the portfolio. If a project experiences fire or other loss, buffer credits can be cancelled to maintain overall integrity."
  },
  {
    id: 11,
    question: "Under the Paris Agreement Article 6, what mechanism prevents double counting between countries?",
    options: [
      "Carbon tariffs",
      "Corresponding adjustments to national inventories",
      "Mandatory offset quotas",
      "International offset taxes"
    ],
    correctAnswer: 1,
    explanation: "Corresponding adjustments require the host country to add the transferred emission reductions back to its national inventory when credits are sold internationally, ensuring the reduction is only counted by the purchasing country. This maintains environmental integrity of national targets."
  },
  {
    id: 12,
    question: "What is the primary criticism of using avoided deforestation (REDD+) offsets?",
    options: [
      "They are too expensive",
      "Baseline setting is difficult, leading to credits for forests that were never at risk",
      "They only work in tropical regions",
      "They require too much land"
    ],
    correctAnswer: 1,
    explanation: "REDD+ projects face significant baseline challenges - determining what would have happened without the project is inherently uncertain. Critics argue many projects generate credits for forests that faced little actual deforestation threat, undermining additionality and crediting 'phantom' reductions."
  }
];

const faqs = [
  {
    question: "Are carbon offsets the same as carbon credits?",
    answer: "The terms are often used interchangeably but have subtle differences. A carbon credit is a tradeable certificate representing one tonne of CO2e reduction or removal. A carbon offset is the action of using credits to compensate for emissions elsewhere. In practice, 'buying offsets' means purchasing and retiring carbon credits. The distinction matters for accounting - credits are instruments; offsetting is the action of claiming neutralisation."
  },
  {
    question: "Can my organisation claim 'carbon neutral' using only offsets?",
    answer: "Technically yes, but this approach faces increasing criticism and regulatory scrutiny. PAS 2060 (carbon neutrality standard) requires demonstrating commitment to emission reductions alongside offsetting. The UK Competition and Markets Authority has warned against misleading claims where offsets substitute for genuine decarbonisation. Best practice is to reduce first, offset residual emissions, and communicate transparently about the balance."
  },
  {
    question: "How do I verify that carbon offsets are legitimate?",
    answer: "Look for offsets certified by recognised standards: Verified Carbon Standard (Verra), Gold Standard, American Carbon Registry, or Climate Action Reserve. Check the registry for unique serial numbers - each credit should be traceable and show 'retired' status once used. Review project documentation for third-party verification reports. Be wary of uncertified offsets or unusually cheap credits without transparent provenance."
  },
  {
    question: "What is the difference between compliance and voluntary carbon markets?",
    answer: "Compliance markets are mandatory schemes created by regulation (e.g., EU Emissions Trading System) where covered entities must hold allowances for their emissions. Voluntary markets are where organisations and individuals purchase offsets voluntarily to meet corporate commitments or personal goals. Compliance markets have stricter rules and typically higher prices; voluntary markets offer more flexibility but variable quality."
  },
  {
    question: "Should building services projects use offsets for embodied carbon?",
    answer: "Offsets can address residual embodied carbon after material selection and design optimisation, but should not replace genuine reduction efforts. PAS 2080 (carbon management in infrastructure) emphasises the mitigation hierarchy. For building services, prioritise: low-carbon materials, efficient design, extended equipment life, circular economy approaches. Use high-quality removal offsets for genuinely unavoidable embodied emissions, with transparent reporting."
  },
  {
    question: "How will carbon offset markets change with net-zero deadlines approaching?",
    answer: "Expect increasing demand for high-quality removal offsets as more organisations reach their target years with residual emissions. Prices for credible offsets are likely to rise substantially. Avoidance offsets may become less accepted for corporate claims. Regulatory frameworks (including UK and EU) are tightening rules around offset claims. Organisations should plan for rising costs and reduced availability of premium credits."
  }
];

const HNCModule6Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Carbon Offsetting
          </h1>
          <p className="text-white/80">
            Offset types, quality standards, additionality, permanence and the role of offsetting in net-zero strategies
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Avoidance offsets:</strong> Prevent emissions occurring elsewhere</li>
              <li className="pl-1"><strong>Removal offsets:</strong> Extract CO2 from atmosphere</li>
              <li className="pl-1"><strong>Quality criteria:</strong> Additionality, permanence, verification</li>
              <li className="pl-1"><strong>Net-zero role:</strong> Last resort for residual emissions only</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Embodied carbon:</strong> May require offsetting residual emissions</li>
              <li className="pl-1"><strong>Operational carbon:</strong> Reduce first through efficiency</li>
              <li className="pl-1"><strong>Client requirements:</strong> Net-zero building targets</li>
              <li className="pl-1"><strong>Standards:</strong> PAS 2060, PAS 2080 compliance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between avoidance and removal carbon offsets",
              "Evaluate offset quality using additionality and permanence criteria",
              "Apply verification standards including Gold Standard and VCS",
              "Position offsetting correctly within the mitigation hierarchy",
              "Assess criticisms and limitations of carbon offset approaches",
              "Integrate offsetting into organisational net-zero strategies"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Carbon Offset Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Carbon Offset Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Carbon offsets represent verified emission reductions or removals that can be used to compensate
              for emissions occurring elsewhere. The fundamental distinction lies between offsets that prevent
              emissions from happening (avoidance/reduction) and those that remove existing CO2 from the atmosphere.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Two fundamental offset categories:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Avoidance/reduction offsets:</strong> Prevent emissions that would otherwise occur - protecting forests, displacing fossil fuels with renewables, improving efficiency</li>
                <li className="pl-1"><strong>Removal offsets:</strong> Extract CO2 already in the atmosphere - afforestation, direct air capture, enhanced weathering, biochar</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Offset Project Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Project Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Mechanism</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2" rowSpan={4}>Avoidance</td>
                      <td className="border border-white/10 px-3 py-2">Renewable energy</td>
                      <td className="border border-white/10 px-3 py-2">Displaces fossil fuel generation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">REDD+ (avoided deforestation)</td>
                      <td className="border border-white/10 px-3 py-2">Prevents forest carbon release</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Clean cookstoves</td>
                      <td className="border border-white/10 px-3 py-2">Reduces fuel consumption</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Methane capture (landfill/agriculture)</td>
                      <td className="border border-white/10 px-3 py-2">Destroys potent GHG</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2" rowSpan={4}>Removal</td>
                      <td className="border border-white/10 px-3 py-2">Afforestation/reforestation</td>
                      <td className="border border-white/10 px-3 py-2">Trees absorb atmospheric CO2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Direct air capture (DAC)</td>
                      <td className="border border-white/10 px-3 py-2">Chemical capture from ambient air</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Biochar</td>
                      <td className="border border-white/10 px-3 py-2">Stable carbon in soil</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Enhanced weathering</td>
                      <td className="border border-white/10 px-3 py-2">Mineral carbonation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical distinction:</strong> For genuine net-zero claims, only removal offsets can balance residual emissions - avoidance offsets reduce global emissions but do not neutralise the buyer's own emissions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Quality Criteria */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Quality Criteria and Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Not all carbon offsets deliver equivalent climate benefits. Robust quality criteria distinguish
              credible offsets from those that may not represent real emission reductions. Understanding these
              criteria is essential for responsible procurement.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Additionality</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Would project happen without offset revenue?</li>
                  <li className="pl-1">Must demonstrate financial/barrier additionality</li>
                  <li className="pl-1">Excludes legally required actions</li>
                  <li className="pl-1">Most debated quality criterion</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Permanence</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">How long will carbon stay stored?</li>
                  <li className="pl-1">Forests: reversal risk (fire, disease)</li>
                  <li className="pl-1">Geological storage: 1,000+ years</li>
                  <li className="pl-1">Buffer pools mitigate reversal risk</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Verification</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Independent third-party assessment</li>
                  <li className="pl-1">Quantification methodology review</li>
                  <li className="pl-1">Ongoing monitoring requirements</li>
                  <li className="pl-1">Registry tracking and retirement</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">No Leakage or Double Counting</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Leakage: emissions shift elsewhere</li>
                  <li className="pl-1">Double counting: multiple claims</li>
                  <li className="pl-1">Corresponding adjustments under Paris Agreement</li>
                  <li className="pl-1">Unique serial number per credit</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Major Verification Standards</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Standard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Focus</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Features</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Verified Carbon Standard (VCS/Verra)</td>
                      <td className="border border-white/10 px-3 py-2">All project types</td>
                      <td className="border border-white/10 px-3 py-2">Largest voluntary market registry, 1B+ credits issued</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Gold Standard</td>
                      <td className="border border-white/10 px-3 py-2">Development co-benefits</td>
                      <td className="border border-white/10 px-3 py-2">Requires UN SDG contributions, premium pricing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">American Carbon Registry (ACR)</td>
                      <td className="border border-white/10 px-3 py-2">North American projects</td>
                      <td className="border border-white/10 px-3 py-2">Compliance and voluntary markets</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Climate Action Reserve (CAR)</td>
                      <td className="border border-white/10 px-3 py-2">North American projects</td>
                      <td className="border border-white/10 px-3 py-2">California compliance programme eligible</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Puro.earth</td>
                      <td className="border border-white/10 px-3 py-2">Carbon removals only</td>
                      <td className="border border-white/10 px-3 py-2">Engineered removal focus, 100+ year permanence</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Quality guidance:</strong> Prioritise certified credits with clear additionality demonstration, appropriate permanence for your claims, and transparent registry tracking to retirement.
            </p>
          </div>
        </section>

        {/* Section 3: Offsetting in Net-Zero Strategies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Offsetting in Net-Zero Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Carbon offsetting occupies a specific position within the mitigation hierarchy - it should address
              residual emissions only after all practicable reduction measures have been implemented. Understanding
              this hierarchy is critical for credible net-zero strategies.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">The Mitigation Hierarchy</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Priority 1:</span> <span className="text-white">AVOID</span> - Eliminate emission sources entirely</p>
                <p><span className="text-white/60">Priority 2:</span> <span className="text-white">REDUCE</span> - Minimise emissions through efficiency</p>
                <p><span className="text-white/60">Priority 3:</span> <span className="text-white">SUBSTITUTE</span> - Switch to lower-carbon alternatives</p>
                <p><span className="text-white/60">Priority 4:</span> <span className="text-white">OFFSET</span> - Neutralise genuinely residual emissions</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SBTi Net-Zero Standard Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>90%+ reduction:</strong> Scope 1 and 2 emissions must be reduced by at least 90% before offsetting</li>
                <li className="pl-1"><strong>Removal only:</strong> Only carbon removal offsets (not avoidance) can be used for residual emissions</li>
                <li className="pl-1"><strong>High quality:</strong> Removals must meet strict permanence and verification criteria</li>
                <li className="pl-1"><strong>Beyond value chain:</strong> Separate from internal abatement investments</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Offset Portfolio Evolution (Oxford Principles)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Timeframe</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Avoidance vs Removal</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Storage Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Near-term (2025)</td>
                      <td className="border border-white/10 px-3 py-2">Primarily avoidance with some removal</td>
                      <td className="border border-white/10 px-3 py-2">Mix of short and long-lived</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Medium-term (2030)</td>
                      <td className="border border-white/10 px-3 py-2">Increasing removal proportion</td>
                      <td className="border border-white/10 px-3 py-2">Shift toward long-lived storage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Long-term (2040+)</td>
                      <td className="border border-white/10 px-3 py-2">Predominantly or exclusively removal</td>
                      <td className="border border-white/10 px-3 py-2">Long-lived storage dominant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Net-zero target year</td>
                      <td className="border border-white/10 px-3 py-2">High-quality removal only</td>
                      <td className="border border-white/10 px-3 py-2">Permanent geological/equivalent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Building services application:</strong> For MEP contractors pursuing net-zero, prioritise operational energy efficiency, low-carbon materials, and supplier engagement before considering offsets for genuinely unavoidable embodied or operational emissions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Criticisms and Limitations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Criticisms, Limitations and Best Practice
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Carbon offsetting faces significant criticisms that must be understood to use offsets responsibly.
              These limitations do not invalidate offsetting entirely but require careful consideration and
              transparent communication.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Criticisms of Carbon Offsetting</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Additionality Challenges</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Counterfactual baseline inherently uncertain</li>
                    <li>Some projects would occur anyway</li>
                    <li>Gaming of additionality tests</li>
                    <li>Renewable energy additionality declining</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Permanence Risks</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Forest fires increasing with climate change</li>
                    <li>Reversal undermines climate benefit</li>
                    <li>Buffer pools may be insufficient</li>
                    <li>Long-term monitoring uncertain</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Moral Hazard</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>'Licence to pollute' criticism</li>
                    <li>May delay genuine decarbonisation</li>
                    <li>Perception of buying way out</li>
                    <li>Greenwashing concerns</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Market Integrity Issues</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Quality varies significantly</li>
                    <li>Opaque pricing</li>
                    <li>Double counting risks</li>
                    <li>Regulatory fragmentation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Recent Controversies</p>
              <p className="text-sm text-white">
                Investigative reporting has revealed quality issues in major offset programmes, including REDD+ projects
                credited for protecting forests that faced little deforestation threat. The Integrity Council for the
                Voluntary Carbon Market (ICVCM) is developing Core Carbon Principles to improve standards. Organisations
                should conduct due diligence beyond relying solely on certification.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice Guidance for Offset Use</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Principle</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Implementation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mitigation hierarchy first</td>
                      <td className="border border-white/10 px-3 py-2">Document reduction efforts before offsetting; set internal carbon price to drive efficiency</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High-quality credits only</td>
                      <td className="border border-white/10 px-3 py-2">Verify certification, review project documentation, check registry status</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transition toward removals</td>
                      <td className="border border-white/10 px-3 py-2">Plan portfolio evolution from avoidance to removal over time</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transparent communication</td>
                      <td className="border border-white/10 px-3 py-2">Report offsets separately from reductions; avoid misleading neutrality claims</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Due diligence</td>
                      <td className="border border-white/10 px-3 py-2">Go beyond certification to assess project-specific risks and co-benefits</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical guidance:</strong> Treat offsetting as insurance for unavoidable emissions, not a substitute for decarbonisation. Allocate budget to removal offsets and plan for price increases as demand grows.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Evaluating Offset Quality</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> An MEP contractor is offered forest protection offsets at GBP 8/tCO2e. Assess quality.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Quality assessment checklist:</p>
                <p className="mt-2">1. Certification: Check for VCS/Gold Standard certification</p>
                <p>2. Additionality: Review project documentation</p>
                <p className="ml-4">- Was forest genuinely at risk of deforestation?</p>
                <p className="ml-4">- What is the baseline methodology?</p>
                <p className="ml-4 text-orange-400">Warning: Very low price may indicate quality issues</p>
                <p className="mt-2">3. Permanence: Assess reversal risk</p>
                <p className="ml-4">- What is the buffer pool percentage?</p>
                <p className="ml-4">- Fire/disease history in region?</p>
                <p className="mt-2">4. Registry: Verify on Verra/Gold Standard registry</p>
                <p className="ml-4">- Unique serial numbers assigned?</p>
                <p className="ml-4">- Will credits be retired in your name?</p>
                <p className="mt-2 text-green-400">Recommendation: Request third-party verification report</p>
                <p className="text-green-400">Consider paying premium for higher-quality credits</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Building an Offset Strategy</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Develop an offset strategy for a building services company targeting net-zero by 2040.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Phase 1 (2024-2027): Foundation</p>
                <p className="ml-4">- Complete Scope 1, 2, 3 inventory</p>
                <p className="ml-4">- Set science-based reduction targets</p>
                <p className="ml-4">- Begin offset procurement for engagement</p>
                <p className="ml-4">- Mix: 70% avoidance, 30% removal</p>
                <p className="mt-2">Phase 2 (2028-2033): Transition</p>
                <p className="ml-4">- Achieve 50% absolute reduction</p>
                <p className="ml-4">- Increase removal proportion</p>
                <p className="ml-4">- Mix: 40% avoidance, 60% removal</p>
                <p className="mt-2">Phase 3 (2034-2040): Net-Zero</p>
                <p className="ml-4">- Achieve 90%+ reduction</p>
                <p className="ml-4">- Removals only for residual emissions</p>
                <p className="ml-4">- Mix: 100% high-permanence removal</p>
                <p className="mt-2 text-green-400">Budget planning: Assume 3-5x price increase for removals by 2040</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Calculating Residual Emissions</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate offset requirements for a net-zero building project.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Project: Commercial office building MEP installation</p>
                <p className="mt-2">Embodied carbon assessment:</p>
                <p className="ml-4">Total embodied carbon: 450 tCO2e</p>
                <p className="ml-4">Reduction through design: -120 tCO2e (27%)</p>
                <p className="ml-4">Low-carbon materials: -85 tCO2e (19%)</p>
                <p className="ml-4">Supplier engagement: -45 tCO2e (10%)</p>
                <p className="ml-4">-----</p>
                <p className="ml-4">Residual to offset: 200 tCO2e (44%)</p>
                <p className="mt-2">Offset procurement:</p>
                <p className="ml-4">Removal credits required: 200 tCO2e</p>
                <p className="ml-4">Assumed price (2024): GBP 120/tCO2e</p>
                <p className="ml-4">Total offset budget: GBP 24,000</p>
                <p className="mt-2 text-green-400">Demonstrate 56% reduction before offsetting</p>
                <p className="text-green-400">Document in sustainability report with reduction evidence</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Offset Quality Assessment Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify certification by recognised standard (VCS, Gold Standard, etc.)</li>
                <li className="pl-1">Review additionality documentation and baseline methodology</li>
                <li className="pl-1">Assess permanence risk and buffer pool adequacy</li>
                <li className="pl-1">Check registry for unique serial numbers and retirement process</li>
                <li className="pl-1">Evaluate co-benefits (biodiversity, community development)</li>
                <li className="pl-1">Consider price as quality indicator (very cheap = higher risk)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">SBTi net-zero: <strong>90%+ reduction</strong> required before offsetting</li>
                <li className="pl-1">Permanence target: <strong>100+ years</strong> (ideally 1,000+)</li>
                <li className="pl-1">Buffer pools: <strong>10-20%</strong> of credits held for reversal</li>
                <li className="pl-1">One credit: <strong>1 tonne CO2e</strong> reduced or removed</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using offsets first</strong> - Always exhaust reduction options before offsetting</li>
                <li className="pl-1"><strong>Choosing on price alone</strong> - Cheap credits often have quality issues</li>
                <li className="pl-1"><strong>Claiming carbon neutral without transparency</strong> - Separate offset claims from reductions</li>
                <li className="pl-1"><strong>Ignoring portfolio evolution</strong> - Plan transition toward removals over time</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Offset Quality Criteria</p>
                <ul className="space-y-0.5">
                  <li>Additionality - would not happen without offset revenue</li>
                  <li>Permanence - carbon stored long-term (100+ years)</li>
                  <li>Verification - third-party assessed and certified</li>
                  <li>No double counting - unique, retired credits only</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Major Standards</p>
                <ul className="space-y-0.5">
                  <li>VCS/Verra - largest voluntary market registry</li>
                  <li>Gold Standard - development co-benefits required</li>
                  <li>Puro.earth - removal-only focus</li>
                  <li>ICVCM Core Carbon Principles - emerging quality framework</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section4-6">
              Next: Section 4.6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section4_5;
