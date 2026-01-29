import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Science-Based Targets - HNC Module 6 Section 4.4";
const DESCRIPTION = "Master the Science Based Targets initiative (SBTi): 1.5°C alignment, absolute and intensity targets, near-term and net-zero commitments, validation process, sector pathways, and progress tracking for building services sustainability.";

const quickCheckQuestions = [
  {
    id: "sbti-definition",
    question: "What does the Science Based Targets initiative (SBTi) provide?",
    options: ["Voluntary sustainability guidelines", "A framework for setting emissions targets aligned with climate science", "Renewable energy procurement standards", "Building energy certification"],
    correctIndex: 1,
    explanation: "The SBTi provides a clearly defined pathway for companies to set greenhouse gas emissions reduction targets aligned with what climate science says is necessary to limit global warming to 1.5°C or well-below 2°C."
  },
  {
    id: "pathway-difference",
    question: "What is the key difference between 1.5°C and 2°C pathways?",
    options: ["Only the target year differs", "1.5°C requires faster and deeper emissions cuts", "2°C is no longer accepted by SBTi", "There is no practical difference"],
    correctIndex: 1,
    explanation: "The 1.5°C pathway requires significantly faster and deeper emissions reductions - approximately 4.2% annual reduction compared to 2.5% for well-below 2°C - to maintain a 50% probability of limiting warming."
  },
  {
    id: "target-types",
    question: "An intensity target measures emissions reduction relative to:",
    options: ["Total company emissions", "A business metric such as revenue or floor area", "Competitor performance", "National averages"],
    correctIndex: 1,
    explanation: "Intensity targets express emissions relative to a business metric (e.g., kgCO2e per m² or per £million revenue), allowing companies to reduce emissions intensity while potentially growing their absolute operations."
  },
  {
    id: "near-term-timeframe",
    question: "What is the typical timeframe for SBTi near-term targets?",
    options: ["1-3 years", "5-10 years from submission", "By 2050", "20+ years"],
    correctIndex: 1,
    explanation: "Near-term science-based targets cover a 5-10 year timeframe from the date of target submission, requiring concrete action plans and measurable progress within a business-relevant planning horizon."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which organisation administers the Science Based Targets initiative?",
    options: [
      "United Nations Environment Programme",
      "A partnership of CDP, UN Global Compact, WRI, and WWF",
      "International Energy Agency",
      "World Business Council for Sustainable Development"
    ],
    correctAnswer: 1,
    explanation: "The SBTi is a partnership between CDP (formerly Carbon Disclosure Project), the United Nations Global Compact, World Resources Institute (WRI), and the World Wide Fund for Nature (WWF)."
  },
  {
    id: 2,
    question: "What is required for SBTi target validation?",
    options: ["Self-certification by the company", "Third-party verification of emissions data only", "Submission to SBTi for technical assessment against criteria", "Government approval"],
    correctAnswer: 2,
    explanation: "Companies must submit their targets to the SBTi for validation, where technical experts assess whether targets meet the initiative's criteria for ambition, scope, and methodology before official approval."
  },
  {
    id: 3,
    question: "For a 1.5°C-aligned target, what minimum annual linear reduction rate is typically required?",
    options: ["1.5% per year", "2.5% per year", "4.2% per year", "7% per year"],
    correctAnswer: 2,
    explanation: "1.5°C-aligned targets typically require a minimum 4.2% annual linear reduction in absolute emissions, calculated from a base year to achieve the necessary reductions by 2030 consistent with climate science."
  },
  {
    id: 4,
    question: "What are Scope 1 emissions in the GHG Protocol framework?",
    options: [
      "Emissions from purchased electricity",
      "Direct emissions from owned or controlled sources",
      "Emissions from the supply chain",
      "Emissions from employee commuting"
    ],
    correctAnswer: 1,
    explanation: "Scope 1 covers direct GHG emissions from sources owned or controlled by the company, such as on-site fuel combustion, company vehicles, and refrigerant leaks from owned equipment."
  },
  {
    id: 5,
    question: "When must companies include Scope 3 emissions in their science-based targets?",
    options: [
      "Always, regardless of significance",
      "When Scope 3 emissions exceed 40% of total emissions",
      "Only for manufacturing companies",
      "Scope 3 is always optional"
    ],
    correctAnswer: 1,
    explanation: "SBTi requires companies to set Scope 3 targets when these emissions represent 40% or more of total Scope 1, 2, and 3 emissions, recognising the materiality threshold for supply chain impact."
  },
  {
    id: 6,
    question: "What is the SBTi Net-Zero Standard requirement for residual emissions?",
    options: [
      "All emissions must reach zero",
      "Residual emissions (typically 5-10%) must be neutralised through carbon removal",
      "Residual emissions can be offset with carbon credits",
      "No specific requirement for residual emissions"
    ],
    correctAnswer: 1,
    explanation: "The Net-Zero Standard requires companies to reduce emissions by at least 90% (typically 90-95%) and neutralise residual emissions through permanent carbon dioxide removal, not conventional offsetting."
  },
  {
    id: 7,
    question: "What distinguishes absolute targets from intensity targets?",
    options: [
      "Absolute targets are more ambitious",
      "Absolute targets measure total emissions; intensity targets measure emissions per unit of activity",
      "Intensity targets are not accepted by SBTi",
      "There is no meaningful difference"
    ],
    correctAnswer: 1,
    explanation: "Absolute targets set a fixed reduction in total emissions (e.g., 50% reduction by 2030), while intensity targets set reduction relative to a business metric (e.g., 30% reduction in kgCO2e/m²)."
  },
  {
    id: 8,
    question: "For the buildings sector, what does the SBTi sector pathway address?",
    options: [
      "Only new construction requirements",
      "Decarbonisation trajectory for operational emissions from commercial and residential buildings",
      "Embodied carbon in building materials only",
      "Tenant behaviour change programmes"
    ],
    correctAnswer: 1,
    explanation: "The SBTi buildings sector pathway provides specific guidance for decarbonising operational emissions (heating, cooling, lighting, equipment) from commercial and residential building portfolios."
  },
  {
    id: 9,
    question: "What is the commitment letter stage in the SBTi process?",
    options: [
      "Final validation of targets",
      "Public commitment to develop science-based targets within 24 months",
      "Annual progress reporting requirement",
      "Certification of net-zero status"
    ],
    correctAnswer: 1,
    explanation: "The commitment letter is an initial public declaration that a company intends to set science-based targets, with a requirement to submit targets for validation within 24 months of signing."
  },
  {
    id: 10,
    question: "How often must companies with validated SBTi targets report progress?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 2,
    explanation: "Companies with validated targets must report their emissions and progress towards targets annually, typically through CDP disclosure or equivalent public reporting mechanisms."
  },
  {
    id: 11,
    question: "What is the base year in SBTi target setting?",
    options: [
      "Always 2015 (Paris Agreement year)",
      "The reference year against which emission reductions are measured",
      "The year targets are submitted",
      "Always the most recent complete year"
    ],
    correctAnswer: 1,
    explanation: "The base year is the reference point against which emission reductions are measured. It must be representative, have verified data, and typically should not be more than two years prior to submission."
  },
  {
    id: 12,
    question: "What happens if a company fails to meet its validated science-based target?",
    options: [
      "Automatic removal from SBTi",
      "Financial penalties apply",
      "Reputational impact and potential removal if consistently off-track without remediation",
      "No consequences as targets are voluntary"
    ],
    correctAnswer: 2,
    explanation: "While SBTi does not impose financial penalties, companies face reputational consequences and potential removal from the initiative if they consistently fail to demonstrate progress and do not take corrective action."
  }
];

const faqs = [
  {
    question: "How does SBTi differ from net-zero pledges?",
    answer: "While many net-zero pledges lack specific methodology or rely heavily on carbon offsets, SBTi provides a rigorous, science-based framework. The SBTi Net-Zero Standard requires deep decarbonisation (90%+ emissions reduction) before addressing residual emissions, and only accepts permanent carbon removal - not conventional offsetting - to neutralise the remaining 5-10%. This ensures targets align with actual climate science rather than aspirational statements."
  },
  {
    question: "Can small and medium enterprises (SMEs) set science-based targets?",
    answer: "Yes, SBTi offers a streamlined route for SMEs (fewer than 500 employees and non-subsidiaries of larger companies). The SME target-setting route provides simplified criteria and reduced costs while maintaining scientific rigour. SMEs commit to halving Scope 1 and 2 emissions by 2030, measure and reduce Scope 3 emissions, and report annually. This makes science-based target setting accessible regardless of company size."
  },
  {
    question: "How do science-based targets apply to building services contractors?",
    answer: "Building services contractors must address multiple emission sources: direct emissions from company vehicles and site equipment (Scope 1), purchased electricity for offices and operations (Scope 2), and supply chain emissions including materials, subcontractors, and installed equipment energy use (Scope 3). The buildings sector pathway provides specific intensity metrics (kgCO2e/m²) relevant to contractors managing building portfolios."
  },
  {
    question: "What is the relationship between SBTi and carbon offsetting?",
    answer: "For near-term targets (5-10 years), SBTi does not accept carbon offsets or credits as a means of achieving emission reduction targets - actual operational reductions are required. However, carbon credits can fund climate action beyond the value chain. For net-zero targets, only permanent carbon dioxide removal (not avoidance credits) can address the final 5-10% of residual emissions that cannot be eliminated."
  },
  {
    question: "How often must science-based targets be recalculated?",
    answer: "Targets should be recalculated every five years at minimum to reflect the latest climate science. Recalculation is also required following significant changes such as mergers, acquisitions, divestitures, or shifts in business focus that materially change the emissions profile. This ensures targets remain aligned with evolving scientific understanding and company circumstances."
  },
  {
    question: "What role does the buildings sector play in global emissions?",
    answer: "Buildings account for approximately 40% of global energy-related CO2 emissions, with building operations responsible for 28% (heating, cooling, lighting) and construction/materials for 11% (embodied carbon). This makes the buildings sector critical for achieving Paris Agreement goals and explains why SBTi has developed specific sector pathways and intensity metrics for real estate and construction companies."
  }
];

const HNCModule6Section4_4 = () => {
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
            <span>Module 6.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Science-Based Targets
          </h1>
          <p className="text-white/80">
            SBTi framework, 1.5°C alignment, target setting, and progress tracking for building services sustainability
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>SBTi:</strong> Science-based framework for emissions targets</li>
              <li className="pl-1"><strong>1.5°C pathway:</strong> ~4.2% annual reduction required</li>
              <li className="pl-1"><strong>Near-term:</strong> 5-10 year validated targets</li>
              <li className="pl-1"><strong>Net-zero:</strong> 90%+ reduction plus carbon removal</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Buildings:</strong> 40% of global energy emissions</li>
              <li className="pl-1"><strong>Scope 1:</strong> Site equipment, company vehicles</li>
              <li className="pl-1"><strong>Scope 2:</strong> Purchased electricity</li>
              <li className="pl-1"><strong>Scope 3:</strong> Supply chain, installed systems</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the SBTi framework and validation process",
              "Distinguish between 1.5°C and well-below 2°C pathways",
              "Apply absolute and intensity target methodologies",
              "Differentiate near-term targets from net-zero commitments",
              "Describe sector pathways for buildings and construction",
              "Implement progress tracking and annual reporting requirements"
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

        {/* Section 1: The SBTi Framework */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The SBTi Framework
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Science Based Targets initiative (SBTi) provides a rigorous framework for companies to set greenhouse
              gas emission reduction targets aligned with climate science. Established as a partnership between CDP,
              the UN Global Compact, World Resources Institute (WRI), and WWF, SBTi translates global climate goals
              into actionable corporate targets.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Core principles of science-based targets:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Science-aligned:</strong> Targets consistent with keeping global warming to 1.5°C or well-below 2°C</li>
                <li className="pl-1"><strong>Scope coverage:</strong> Must address Scope 1, 2, and significant Scope 3 emissions</li>
                <li className="pl-1"><strong>Time-bound:</strong> Clear deadlines with measurable interim milestones</li>
                <li className="pl-1"><strong>Independently validated:</strong> Assessed by SBTi technical experts before approval</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Temperature Pathway Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Pathway</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Annual Reduction</th>
                      <th className="border border-white/10 px-3 py-2 text-left">2030 Target</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1.5°C aligned</td>
                      <td className="border border-white/10 px-3 py-2">~4.2% per year</td>
                      <td className="border border-white/10 px-3 py-2">50% reduction from base year</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Required for new submissions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Well-below 2°C</td>
                      <td className="border border-white/10 px-3 py-2">~2.5% per year</td>
                      <td className="border border-white/10 px-3 py-2">25-30% reduction</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Legacy targets only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2°C aligned</td>
                      <td className="border border-white/10 px-3 py-2">~1.5% per year</td>
                      <td className="border border-white/10 px-3 py-2">~15% reduction</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">No longer accepted</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">SBTi Validation Process</p>
              <div className="text-sm space-y-1">
                <p><span className="text-white/60">Step 1:</span> <span className="text-white">Commit</span> - Sign commitment letter (24 months to submit targets)</p>
                <p><span className="text-white/60">Step 2:</span> <span className="text-white">Develop</span> - Set targets using SBTi methodologies and tools</p>
                <p><span className="text-white/60">Step 3:</span> <span className="text-white">Submit</span> - Complete Target Submission Form for validation</p>
                <p><span className="text-white/60">Step 4:</span> <span className="text-white">Validate</span> - SBTi assesses against criteria (typically 4-6 months)</p>
                <p><span className="text-white/60">Step 5:</span> <span className="text-white">Communicate</span> - Announce validated targets publicly</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Since July 2022, SBTi only accepts 1.5°C-aligned targets for new submissions, reflecting updated climate science urgency.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Target Types and Methodologies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Target Types and Methodologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              SBTi offers multiple approaches to target setting, allowing companies to select methodologies
              appropriate to their sector, size, and emissions profile. Understanding these options is essential
              for developing credible, achievable targets.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Absolute Targets</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Fixed reduction in total emissions</li>
                  <li className="pl-1">E.g., "Reduce Scope 1 & 2 by 50% by 2030"</li>
                  <li className="pl-1">Clear, unambiguous commitment</li>
                  <li className="pl-1">Challenging if business is growing</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Intensity Targets</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Reduction relative to business metric</li>
                  <li className="pl-1">E.g., "30% reduction in kgCO2e/m²"</li>
                  <li className="pl-1">Allows for business growth</li>
                  <li className="pl-1">Must still drive absolute reductions</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">GHG Protocol Scopes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Scope</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Definition</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Services Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Scope 1</td>
                      <td className="border border-white/10 px-3 py-2">Direct emissions from owned sources</td>
                      <td className="border border-white/10 px-3 py-2">Company vehicles, site generators, gas heating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Scope 2</td>
                      <td className="border border-white/10 px-3 py-2">Indirect emissions from purchased energy</td>
                      <td className="border border-white/10 px-3 py-2">Office electricity, workshop power, site electricity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Scope 3</td>
                      <td className="border border-white/10 px-3 py-2">All other indirect emissions</td>
                      <td className="border border-white/10 px-3 py-2">Materials, subcontractors, employee commuting, installed equipment operation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Target Setting Methods</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Absolute Contraction Approach (ACA):</strong> All companies reduce at same rate regardless of starting point</li>
                <li className="pl-1"><strong>Sectoral Decarbonisation Approach (SDA):</strong> Sector-specific pathways allocating remaining carbon budget</li>
                <li className="pl-1"><strong>Economic Intensity Approach:</strong> Reduction in emissions per value-added (less common)</li>
                <li className="pl-1"><strong>Physical Intensity Approach:</strong> Reduction per physical unit (m², kWh, tonne produced)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Scope 3 threshold:</strong> If Scope 3 emissions exceed 40% of total emissions, companies must set a separate Scope 3 target covering at least 67% of total Scope 3 emissions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Near-Term vs Net-Zero Targets */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Near-Term and Net-Zero Targets
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              SBTi distinguishes between near-term science-based targets (5-10 years) and long-term net-zero
              targets. Both are essential: near-term targets drive immediate action while net-zero targets
              provide the ultimate destination aligned with climate stabilisation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Near-Term Targets (5-10 Years)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Scope 1 & 2</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Scope 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Coverage</td>
                      <td className="border border-white/10 px-3 py-2">95%+ of emissions</td>
                      <td className="border border-white/10 px-3 py-2">67%+ of emissions (if &gt;40%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ambition level</td>
                      <td className="border border-white/10 px-3 py-2">1.5°C aligned (~4.2%/year)</td>
                      <td className="border border-white/10 px-3 py-2">Well-below 2°C minimum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Timeframe</td>
                      <td className="border border-white/10 px-3 py-2">5-10 years from submission</td>
                      <td className="border border-white/10 px-3 py-2">5-10 years from submission</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Offsetting</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Not accepted</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Not accepted</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">SBTi Net-Zero Standard Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Deep decarbonisation:</strong> Reduce all scopes by at least 90% (typically 90-95%)</li>
                <li className="pl-1"><strong>Neutralise residual:</strong> Address remaining 5-10% through permanent carbon removal only</li>
                <li className="pl-1"><strong>No conventional offsets:</strong> Avoidance credits cannot substitute for actual reductions</li>
                <li className="pl-1"><strong>Sector timeline:</strong> Buildings must reach net-zero by 2050 at latest</li>
                <li className="pl-1"><strong>Interim targets:</strong> Near-term targets required as stepping stones</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-white mb-2">Carbon Removal vs Offsetting</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li><strong>Removal (accepted):</strong> Permanently removing CO2 from atmosphere</li>
                  <li>Examples: Direct air capture, biochar, enhanced weathering</li>
                  <li><strong>Offsetting (not accepted):</strong> Funding emission avoidance elsewhere</li>
                  <li>Examples: Avoided deforestation, renewable energy credits</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-white mb-2">Beyond Value Chain Mitigation</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>Carbon credits can fund additional climate action</li>
                  <li>Does not count towards target achievement</li>
                  <li>Demonstrates broader climate leadership</li>
                  <li>Supports transition of wider economy</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical distinction:</strong> Net-zero requires actual emissions to approach zero through operational changes - it is not achieved by purchasing enough offsets to balance remaining emissions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Buildings Sector Pathway and Reporting */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Buildings Sector Pathway and Reporting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The buildings sector has a critical role in achieving global climate goals, accounting for approximately
              40% of energy-related CO2 emissions. SBTi provides sector-specific guidance through the Buildings Pathway,
              with intensity metrics particularly relevant to building services professionals.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Buildings Sector Intensity Metrics</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Metric</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">2030 Target Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">kgCO2e/m² (operational)</td>
                      <td className="border border-white/10 px-3 py-2">Building portfolio performance</td>
                      <td className="border border-white/10 px-3 py-2">&lt;20 kgCO2e/m² for offices</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">kgCO2e/kWh (energy)</td>
                      <td className="border border-white/10 px-3 py-2">Energy supply decarbonisation</td>
                      <td className="border border-white/10 px-3 py-2">&lt;0.15 kgCO2e/kWh</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">kgCO2e/£M revenue</td>
                      <td className="border border-white/10 px-3 py-2">Economic intensity</td>
                      <td className="border border-white/10 px-3 py-2">Varies by business type</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Annual Reporting Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Emissions inventory:</strong> Complete Scope 1, 2, and relevant Scope 3 categories</li>
                <li className="pl-1"><strong>Progress tracking:</strong> Compare current emissions against target trajectory</li>
                <li className="pl-1"><strong>Methodology consistency:</strong> Use same calculation approach as base year</li>
                <li className="pl-1"><strong>Disclosure platform:</strong> Report through CDP or equivalent public mechanism</li>
                <li className="pl-1"><strong>Recalculation triggers:</strong> Document any base year adjustments</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Contractor Scope 3 Categories</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Significance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Purchased goods</td>
                      <td className="border border-white/10 px-3 py-2">Materials, equipment, consumables</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Very high (30-50%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Upstream transport</td>
                      <td className="border border-white/10 px-3 py-2">Material delivery to sites</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Medium (5-10%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6. Business travel</td>
                      <td className="border border-white/10 px-3 py-2">Flights, hotels, taxis</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Low (1-3%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7. Employee commuting</td>
                      <td className="border border-white/10 px-3 py-2">Staff travel to work/sites</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Medium (5-15%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">11. Use of sold products</td>
                      <td className="border border-white/10 px-3 py-2">Lifetime energy of installed systems</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Very high (often largest)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Building services insight:</strong> For contractors, Category 11 (use of sold products) often dominates Scope 3 - the lifetime operational emissions of installed HVAC, lighting, and electrical systems typically exceed all other emission sources combined.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Setting an Absolute Near-Term Target</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> An MEP contractor with 2020 base year emissions wants to set a 1.5°C-aligned target.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Base year (2020) emissions:</p>
                <p className="ml-4">Scope 1: 850 tCO2e (vehicles, site equipment)</p>
                <p className="ml-4">Scope 2: 320 tCO2e (offices, workshops)</p>
                <p className="ml-4">Total Scope 1+2: 1,170 tCO2e</p>
                <p className="mt-2 text-white/60">Target calculation (1.5°C aligned):</p>
                <p className="ml-4">Required reduction: 4.2% linear annual reduction</p>
                <p className="ml-4">Target year: 2030 (10 years from base)</p>
                <p className="ml-4">Cumulative reduction: 42% by 2030</p>
                <p className="ml-4">Target emissions: 1,170 × (1 - 0.42) = 679 tCO2e</p>
                <p className="mt-2 text-green-400">Target: "Reduce absolute Scope 1 and 2 emissions 42% by 2030 from 2020 base year"</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Intensity Target for Building Portfolio</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A facilities management company sets a buildings sector intensity target.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Base year portfolio performance:</p>
                <p className="ml-4">Total operational emissions: 15,000 tCO2e</p>
                <p className="ml-4">Managed floor area: 250,000 m²</p>
                <p className="ml-4">Base intensity: 60 kgCO2e/m²</p>
                <p className="mt-2 text-white/60">SBTi buildings pathway requirement:</p>
                <p className="ml-4">2030 benchmark: ~35 kgCO2e/m² (commercial offices)</p>
                <p className="ml-4">Required reduction: (60-35)/60 = 42%</p>
                <p className="mt-2 text-white/60">Implementation approach:</p>
                <p className="ml-4">LED lighting upgrades: -15 kgCO2e/m²</p>
                <p className="ml-4">HVAC optimisation: -8 kgCO2e/m²</p>
                <p className="ml-4">Renewable electricity: -5 kgCO2e/m²</p>
                <p className="mt-2 text-green-400">Target: "Reduce building portfolio intensity to 35 kgCO2e/m² by 2030"</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Scope 3 Assessment for Contractor</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Determining if Scope 3 targets are required for an electrical contractor.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Emissions screening:</p>
                <p className="ml-4">Scope 1: 500 tCO2e</p>
                <p className="ml-4">Scope 2: 200 tCO2e</p>
                <p className="ml-4">Scope 3 (estimated): 4,800 tCO2e</p>
                <p className="ml-8">- Purchased materials: 2,100 tCO2e</p>
                <p className="ml-8">- Subcontractors: 1,200 tCO2e</p>
                <p className="ml-8">- Employee commuting: 400 tCO2e</p>
                <p className="ml-8">- Use of products (lifetime): 1,100 tCO2e</p>
                <p className="mt-2 text-white/60">Threshold calculation:</p>
                <p className="ml-4">Total: 500 + 200 + 4,800 = 5,500 tCO2e</p>
                <p className="ml-4">Scope 3 percentage: 4,800/5,500 = 87%</p>
                <p className="mt-2 text-red-400">Result: 87% &gt; 40% threshold - Scope 3 target REQUIRED</p>
                <p className="mt-2 text-green-400">Must set target covering 67%+ of Scope 3 (3,216+ tCO2e)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Net-Zero Pathway Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Planning a net-zero commitment for 2050.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Current emissions profile (2024):</p>
                <p className="ml-4">Total all scopes: 10,000 tCO2e</p>
                <p className="mt-2 text-white/60">Net-Zero Standard requirements:</p>
                <p className="ml-4">Minimum reduction: 90%</p>
                <p className="ml-4">Maximum residual: 10% = 1,000 tCO2e</p>
                <p className="ml-4">Required abatement: 9,000 tCO2e through actual reductions</p>
                <p className="mt-2 text-white/60">Pathway milestones:</p>
                <p className="ml-4">2030 near-term: 5,800 tCO2e (-42%)</p>
                <p className="ml-4">2040 interim: 2,500 tCO2e (-75%)</p>
                <p className="ml-4">2050 net-zero: 1,000 tCO2e (-90%)</p>
                <p className="mt-2 text-white/60">Residual emissions neutralisation:</p>
                <p className="ml-4">1,000 tCO2e requires permanent carbon removal</p>
                <p className="ml-4">Options: Direct air capture, biochar, enhanced weathering</p>
                <p className="mt-2 text-yellow-400">Note: Conventional offsets cannot achieve net-zero status</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">SBTi Implementation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Complete comprehensive GHG inventory across all scopes</li>
                <li className="pl-1">Identify base year with reliable, verified data</li>
                <li className="pl-1">Screen Scope 3 categories to assess 40% threshold</li>
                <li className="pl-1">Select appropriate target type (absolute vs intensity)</li>
                <li className="pl-1">Use SBTi target-setting tools for pathway calculation</li>
                <li className="pl-1">Document methodology and assumptions for validation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">1.5°C pathway: <strong>4.2% annual reduction</strong></li>
                <li className="pl-1">Scope 3 threshold: <strong>&gt;40% of total requires target</strong></li>
                <li className="pl-1">Scope 3 coverage: <strong>67% minimum for target</strong></li>
                <li className="pl-1">Net-zero: <strong>90%+ reduction</strong> plus carbon removal</li>
                <li className="pl-1">Commitment deadline: <strong>24 months to submit targets</strong></li>
                <li className="pl-1">Buildings: <strong>40% of global energy emissions</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Relying on offsets:</strong> SBTi requires actual emissions reductions for near-term targets</li>
                <li className="pl-1"><strong>Ignoring Scope 3:</strong> Often the largest source, especially for contractors</li>
                <li className="pl-1"><strong>Inconsistent methodology:</strong> Base year and reporting must use same approach</li>
                <li className="pl-1"><strong>Static targets:</strong> Failing to recalculate after significant business changes</li>
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
                <p className="font-medium text-white mb-1">SBTi Target Requirements</p>
                <ul className="space-y-0.5">
                  <li>1.5°C pathway: ~4.2% annual reduction</li>
                  <li>Scope 1+2: 95%+ coverage required</li>
                  <li>Scope 3: Target if &gt;40% of total</li>
                  <li>Near-term: 5-10 year timeframe</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Net-Zero Standard</p>
                <ul className="space-y-0.5">
                  <li>90%+ actual emission reductions</li>
                  <li>Residual 5-10% via carbon removal</li>
                  <li>No conventional offsetting</li>
                  <li>Buildings: 2050 deadline</li>
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
            <Link to="../h-n-c-module6-section4-5">
              Next: Carbon Reporting Frameworks
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section4_4;
