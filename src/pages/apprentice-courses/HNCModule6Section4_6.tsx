import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Net-Zero Pathways - HNC Module 6 Section 4.6";
const DESCRIPTION = "Master net-zero pathway development for buildings: carbon hierarchy, reduction roadmaps, technology options, interim targets, verification frameworks, and building services role in decarbonisation.";

const quickCheckQuestions = [
  {
    id: "net-zero-definition",
    question: "What does 'net-zero carbon' mean for a building?",
    options: ["The building generates no carbon emissions", "Carbon emissions are balanced by verified offsets or removals", "The building uses only renewable energy", "The building has zero operational energy consumption"],
    correctIndex: 1,
    explanation: "Net-zero carbon means that any residual carbon emissions from a building are balanced by verified carbon offsets or removals, resulting in no net contribution to atmospheric CO2. This includes both operational and potentially embodied carbon."
  },
  {
    id: "carbon-hierarchy",
    question: "In the carbon reduction hierarchy, which approach should be prioritised first?",
    options: ["Offset remaining emissions", "Switch to low-carbon energy sources", "Reduce energy demand through efficiency", "Avoid carbon-intensive activities where possible"],
    correctIndex: 3,
    explanation: "The carbon hierarchy follows: Avoid, Reduce, Replace, Offset. Avoiding carbon-intensive activities (such as eliminating fossil fuel systems) should always be the first priority before pursuing efficiency improvements, fuel switching, or offsetting."
  },
  {
    id: "interim-targets",
    question: "Why are interim targets important in a net-zero pathway?",
    options: ["They are legally required by building regulations", "They provide measurable milestones to track progress and maintain momentum", "They reduce the overall cost of decarbonisation", "They are only needed for public sector buildings"],
    correctIndex: 1,
    explanation: "Interim targets (such as 2030 milestones) provide measurable checkpoints that help organisations track progress, maintain momentum, identify if actions are having the desired effect, and make course corrections if needed."
  },
  {
    id: "verification",
    question: "What is the primary purpose of third-party verification in net-zero claims?",
    options: ["To reduce the cost of carbon offsets", "To provide credibility and prevent greenwashing", "To satisfy planning requirements", "To qualify for government grants"],
    correctIndex: 1,
    explanation: "Third-party verification provides independent assurance that net-zero claims are credible, based on robust methodology, and not greenwashing. This builds trust with stakeholders and ensures claims can withstand scrutiny."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The UK legally binding net-zero target requires reaching net-zero greenhouse gas emissions by which year?",
    options: [
      "2030",
      "2040",
      "2050",
      "2060"
    ],
    correctAnswer: 2,
    explanation: "The UK Climate Change Act was amended in 2019 to set a legally binding target of net-zero greenhouse gas emissions by 2050, making the UK the first major economy to pass such legislation."
  },
  {
    id: 2,
    question: "According to the UKGBC framework, 'net-zero carbon in operation' for a building requires:",
    options: ["Zero energy consumption", "All energy from on-site renewables", "Reduced operational energy with residual emissions offset", "Demolition and rebuild with low-carbon materials"],
    correctAnswer: 2,
    explanation: "UKGBC's net-zero carbon in operation definition requires reducing operational energy consumption as far as possible, then offsetting residual emissions through verified carbon offsets or green tariff procurement."
  },
  {
    id: 3,
    question: "In the carbon hierarchy, 'Replace' refers to:",
    options: [
      "Replacing old buildings with new efficient ones",
      "Switching to low or zero-carbon energy sources",
      "Replacing offset credits with better alternatives",
      "Replacing energy meters with smart meters"
    ],
    correctAnswer: 1,
    explanation: "In the Avoid-Reduce-Replace-Offset hierarchy, 'Replace' means switching from high-carbon to low or zero-carbon energy sources, such as replacing gas boilers with heat pumps or fossil fuel electricity with renewables."
  },
  {
    id: 4,
    question: "What is the typical first step in developing a net-zero pathway for an existing building?",
    options: [
      "Install solar panels",
      "Conduct a detailed baseline carbon assessment",
      "Purchase carbon offsets",
      "Replace all lighting with LEDs"
    ],
    correctAnswer: 1,
    explanation: "A detailed baseline carbon assessment is essential as the first step to understand current emissions, identify major sources, and establish the starting point against which progress will be measured."
  },
  {
    id: 5,
    question: "Which technology option typically offers the greatest carbon reduction potential for space heating in UK buildings?",
    options: [
      "High-efficiency gas condensing boilers",
      "Biomass boilers",
      "Air source heat pumps",
      "Direct electric heating"
    ],
    correctAnswer: 2,
    explanation: "Air source heat pumps typically achieve 300-400% efficiency (COP 3-4), meaning they produce 3-4 units of heat for every unit of electricity consumed. Combined with the decarbonising grid, they offer the greatest long-term carbon reduction for heating."
  },
  {
    id: 6,
    question: "The Science Based Targets initiative (SBTi) requires corporate targets to be aligned with:",
    options: [
      "National building regulations",
      "Paris Agreement temperature goals (1.5degC or well-below 2degC)",
      "Industry sector averages",
      "BREEAM Outstanding ratings"
    ],
    correctAnswer: 1,
    explanation: "SBTi validates corporate emissions reduction targets that are aligned with the Paris Agreement goals of limiting global warming to 1.5degC or well-below 2degC, ensuring targets represent a fair share of required global reductions."
  },
  {
    id: 7,
    question: "What percentage of UK carbon emissions typically come from buildings (operational and embodied)?",
    options: [
      "Around 10%",
      "Around 25%",
      "Around 40%",
      "Around 60%"
    ],
    correctAnswer: 2,
    explanation: "Buildings account for approximately 40% of UK carbon emissions when including both operational emissions (heating, cooling, lighting, equipment) and embodied emissions from construction materials and processes."
  },
  {
    id: 8,
    question: "Which of these is NOT typically considered a Scope 1 emission for a building?",
    options: [
      "On-site gas combustion for heating",
      "Diesel generator operation",
      "Grid electricity consumption",
      "Fugitive refrigerant leaks"
    ],
    correctAnswer: 2,
    explanation: "Grid electricity consumption is a Scope 2 emission (indirect from purchased energy), not Scope 1. Scope 1 covers direct emissions from owned or controlled sources: on-site combustion, generators, and refrigerant leaks."
  },
  {
    id: 9,
    question: "A 'carbon budget' in pathway planning refers to:",
    options: [
      "The financial budget allocated for carbon reduction projects",
      "The cumulative amount of carbon that can be emitted while meeting a target",
      "The cost of carbon offsets over the pathway period",
      "The building's annual energy budget"
    ],
    correctAnswer: 1,
    explanation: "A carbon budget represents the total cumulative emissions permitted over a period while remaining on track for a net-zero target. It recognises that emissions reductions happen over time, not instantaneously."
  },
  {
    id: 10,
    question: "What is the primary role of building services engineers in achieving net-zero buildings?",
    options: [
      "Purchasing carbon offsets",
      "Designing and specifying low-carbon MEP systems that minimise operational emissions",
      "Certifying buildings as net-zero",
      "Manufacturing renewable energy equipment"
    ],
    correctAnswer: 1,
    explanation: "Building services engineers play a critical role by designing and specifying MEP systems (HVAC, lighting, controls) that minimise operational energy consumption and carbon emissions through efficient, low-carbon technology selection."
  },
  {
    id: 11,
    question: "Which verification standard specifically addresses net-zero carbon buildings in the UK?",
    options: [
      "ISO 9001",
      "PAS 2080",
      "UKGBC Net Zero Carbon Buildings Framework",
      "BREEAM Excellent"
    ],
    correctAnswer: 2,
    explanation: "The UKGBC Net Zero Carbon Buildings Framework Definition provides the UK industry-standard methodology for defining, calculating, and verifying net-zero carbon claims for buildings in both construction and operation."
  },
  {
    id: 12,
    question: "For a credible net-zero pathway, offsets should:",
    options: [
      "Be the primary strategy for carbon reduction",
      "Come from the cheapest available source",
      "Be used only for genuinely unavoidable residual emissions",
      "Replace the need for energy efficiency measures"
    ],
    correctAnswer: 2,
    explanation: "Credible net-zero pathways use offsets only for genuinely residual emissions that cannot be eliminated through efficiency, fuel switching, or on-site renewables. Offsets should be additional, permanent, and verified - never a substitute for direct action."
  }
];

const faqs = [
  {
    question: "What is the difference between net-zero carbon and carbon neutral?",
    answer: "While often used interchangeably, net-zero carbon typically follows a hierarchy where emissions must be reduced as far as possible before offsetting residual emissions. Carbon neutral can sometimes mean offsetting all emissions without necessarily prioritising reductions first. The UKGBC framework requires demonstrated emission reductions before offsetting can be claimed for net-zero."
  },
  {
    question: "Do building regulations require net-zero buildings?",
    answer: "Currently, UK building regulations do not mandate net-zero carbon buildings. However, Part L 2021 significantly tightened energy performance requirements, and the Future Homes Standard (expected 2025) will require new homes to be 'zero-carbon ready'. Many planning authorities now require net-zero commitments through planning conditions, particularly for major developments."
  },
  {
    question: "How should existing buildings approach net-zero pathways?",
    answer: "Existing buildings should: (1) Conduct a comprehensive energy audit and carbon baseline, (2) Prioritise fabric improvements (insulation, airtightness, glazing), (3) Upgrade to efficient building services (LED lighting, efficient HVAC, smart controls), (4) Electrify heating where feasible (heat pumps), (5) Install on-site renewables, (6) Procure green electricity, (7) Offset genuinely residual emissions. Timing often aligns with planned refurbishment or equipment replacement cycles."
  },
  {
    question: "What are science-based targets and how do they relate to net-zero?",
    answer: "Science-based targets are emissions reduction targets aligned with climate science - specifically what is needed to limit global warming to 1.5 degrees C or well-below 2 degrees C as per the Paris Agreement. They ensure corporate targets represent a fair share of required global reductions. A science-based net-zero target typically requires 90-95% absolute emissions reduction before any offsetting."
  },
  {
    question: "How do building services engineers contribute to net-zero pathways?",
    answer: "Building services engineers are essential to net-zero through: designing energy-efficient MEP systems, specifying low-carbon technologies (heat pumps, LED lighting, efficient chillers), optimising controls for minimal energy waste, enabling renewable energy integration, conducting energy modelling to predict performance, commissioning systems for optimal operation, and advising on technology roadmaps for decarbonisation."
  },
  {
    question: "What makes a carbon offset 'high quality' for net-zero claims?",
    answer: "High-quality offsets must be: Additional (would not have happened without the offset finance), Permanent (carbon removed or avoided permanently), Verified (by recognised standards like Gold Standard or Verra VCS), Real (based on actual measured reductions), Not double-counted, and Preferably from removal projects rather than avoidance. UKGBC recommends offsets with co-benefits and transparent registries."
  }
];

const HNCModule6Section4_6 = () => {
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
            <span>Module 6.4.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Net-Zero Pathways
          </h1>
          <p className="text-white/80">
            Carbon hierarchy, reduction roadmaps, technology options, interim targets, and verification frameworks for building decarbonisation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Net-zero:</strong> Emissions balanced by verified offsets/removals</li>
              <li className="pl-1"><strong>Hierarchy:</strong> Avoid, Reduce, Replace, Offset</li>
              <li className="pl-1"><strong>UK target:</strong> Net-zero greenhouse gases by 2050</li>
              <li className="pl-1"><strong>Verification:</strong> Third-party assurance essential</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Buildings:</strong> ~40% of UK carbon emissions</li>
              <li className="pl-1"><strong>MEP role:</strong> Design low-carbon systems</li>
              <li className="pl-1"><strong>Key tech:</strong> Heat pumps, LEDs, smart controls</li>
              <li className="pl-1"><strong>Timeline:</strong> Pathway with interim milestones</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define net-zero carbon and distinguish from carbon neutral",
              "Apply the carbon reduction hierarchy to building projects",
              "Develop net-zero pathways with interim targets",
              "Evaluate technology options for building decarbonisation",
              "Understand verification frameworks and UKGBC guidance",
              "Explain the building services engineer's role in net-zero"
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

        {/* Section 1: Net-Zero Definitions and Context */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Net-Zero Definitions and Context
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Net-zero carbon represents the critical goal of balancing greenhouse gas emissions with
              removals or offsets, resulting in no net contribution to climate change. For buildings,
              this encompasses both operational emissions (energy use) and increasingly embodied
              emissions (materials and construction).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key definitions in net-zero terminology:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Net-zero carbon:</strong> Emissions reduced to minimum, residual balanced by verified offsets</li>
                <li className="pl-1"><strong>Net-zero operational carbon:</strong> Zero net emissions from building energy use</li>
                <li className="pl-1"><strong>Net-zero whole-life carbon:</strong> Includes operational and embodied carbon over building lifecycle</li>
                <li className="pl-1"><strong>Carbon neutral:</strong> May rely more heavily on offsetting without prioritising reductions</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK Climate Policy Context</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Milestone</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Target</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2019 Amendment</td>
                      <td className="border border-white/10 px-3 py-2">Net-zero by 2050 (legally binding)</td>
                      <td className="border border-white/10 px-3 py-2">All sectors must decarbonise</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sixth Carbon Budget</td>
                      <td className="border border-white/10 px-3 py-2">78% reduction by 2035 (vs 1990)</td>
                      <td className="border border-white/10 px-3 py-2">Building sector transformation required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Future Homes Standard</td>
                      <td className="border border-white/10 px-3 py-2">75-80% carbon reduction (new homes)</td>
                      <td className="border border-white/10 px-3 py-2">No fossil fuel heating in new homes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Part L 2021</td>
                      <td className="border border-white/10 px-3 py-2">31% improvement (homes), 27% (non-domestic)</td>
                      <td className="border border-white/10 px-3 py-2">Stepping stone to net-zero</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical point:</strong> Buildings account for approximately 40% of UK carbon emissions - decarbonising the built environment is essential to achieving national net-zero targets.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: The Carbon Reduction Hierarchy */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Carbon Reduction Hierarchy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The carbon hierarchy provides a prioritised approach to decarbonisation, ensuring that
              the most effective and permanent measures are implemented before resorting to offsetting.
              This hierarchy is fundamental to credible net-zero pathways.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-sm font-medium text-green-400 mb-2">1. AVOID</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Eliminate fossil fuel systems</li>
                  <li className="pl-1">Reduce building energy demand</li>
                  <li className="pl-1">Optimise building form/orientation</li>
                  <li className="pl-1">Question need for energy-intensive spaces</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="text-sm font-medium text-blue-400 mb-2">2. REDUCE</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Improve fabric efficiency</li>
                  <li className="pl-1">Specify efficient MEP systems</li>
                  <li className="pl-1">Implement smart controls</li>
                  <li className="pl-1">Optimise system operation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <p className="text-sm font-medium text-amber-400 mb-2">3. REPLACE</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Switch to heat pumps</li>
                  <li className="pl-1">Install on-site renewables</li>
                  <li className="pl-1">Procure green electricity</li>
                  <li className="pl-1">Connect to low-carbon heat networks</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <p className="text-sm font-medium text-purple-400 mb-2">4. OFFSET</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Only for residual emissions</li>
                  <li className="pl-1">High-quality verified credits</li>
                  <li className="pl-1">Preferably removal-based</li>
                  <li className="pl-1">Transparent and traceable</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Applying the Hierarchy to Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Hierarchy Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Heating Example</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Lighting Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Avoid</td>
                      <td className="border border-white/10 px-3 py-2">Reduce heat loss through fabric</td>
                      <td className="border border-white/10 px-3 py-2">Maximise daylight penetration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Reduce</td>
                      <td className="border border-white/10 px-3 py-2">Optimise heating setpoints/schedules</td>
                      <td className="border border-white/10 px-3 py-2">Install presence/daylight sensors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Replace</td>
                      <td className="border border-white/10 px-3 py-2">Install heat pump instead of boiler</td>
                      <td className="border border-white/10 px-3 py-2">Upgrade to high-efficacy LEDs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Offset</td>
                      <td className="border border-white/10 px-3 py-2">Purchase offsets for residual gas</td>
                      <td className="border border-white/10 px-3 py-2">Offset grid carbon factor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Each level of the hierarchy should be exhausted before moving to the next. Offsets are a last resort, not a first choice.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Pathway Development and Technology Options */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Pathway Development and Technology Options
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A net-zero pathway provides a structured roadmap showing how an organisation or building
              will achieve net-zero carbon, including interim milestones, technology choices, and
              investment timelines aligned with equipment lifecycles and strategic planning.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Pathway Development Steps</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Baseline assessment:</strong> Comprehensive audit of current energy use and emissions</li>
                <li className="pl-1"><strong>Target setting:</strong> Define end goal (net-zero by date) and interim milestones</li>
                <li className="pl-1"><strong>Gap analysis:</strong> Identify what must change to bridge baseline to target</li>
                <li className="pl-1"><strong>Measure identification:</strong> List all potential interventions with costs and impacts</li>
                <li className="pl-1"><strong>Prioritisation:</strong> Sequence measures using hierarchy and lifecycle alignment</li>
                <li className="pl-1"><strong>Financial planning:</strong> Develop investment plan and funding strategy</li>
                <li className="pl-1"><strong>Implementation:</strong> Execute measures according to roadmap</li>
                <li className="pl-1"><strong>Monitoring:</strong> Track progress and adjust pathway as needed</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Technology Options for Building Decarbonisation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Technology</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Carbon Saving</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air source heat pump</td>
                      <td className="border border-white/10 px-3 py-2">Space heating/cooling</td>
                      <td className="border border-white/10 px-3 py-2">60-80% vs gas boiler</td>
                      <td className="border border-white/10 px-3 py-2">Requires electrical upgrade</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ground source heat pump</td>
                      <td className="border border-white/10 px-3 py-2">Heating/cooling (larger buildings)</td>
                      <td className="border border-white/10 px-3 py-2">65-85% vs gas boiler</td>
                      <td className="border border-white/10 px-3 py-2">Higher COP, needs ground works</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED lighting</td>
                      <td className="border border-white/10 px-3 py-2">All lighting applications</td>
                      <td className="border border-white/10 px-3 py-2">50-70% vs fluorescent</td>
                      <td className="border border-white/10 px-3 py-2">Quick payback, no barriers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building management system</td>
                      <td className="border border-white/10 px-3 py-2">Controls optimisation</td>
                      <td className="border border-white/10 px-3 py-2">10-30% across systems</td>
                      <td className="border border-white/10 px-3 py-2">Needs ongoing commissioning</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Solar PV</td>
                      <td className="border border-white/10 px-3 py-2">On-site electricity generation</td>
                      <td className="border border-white/10 px-3 py-2">Reduces grid dependence</td>
                      <td className="border border-white/10 px-3 py-2">Roof space, orientation needed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Battery storage</td>
                      <td className="border border-white/10 px-3 py-2">Load shifting, PV optimisation</td>
                      <td className="border border-white/10 px-3 py-2">Enables higher renewable use</td>
                      <td className="border border-white/10 px-3 py-2">Adds cost, improves flexibility</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example: Office Building Net-Zero Pathway</p>
              <div className="text-sm space-y-2">
                <p><strong>Baseline (2024):</strong> 850 tonnes CO2/year (gas heating, standard lighting, grid electricity)</p>
                <p><strong>2027 target:</strong> 600 tonnes (-30%) - LED retrofit, BMS upgrade, green tariff</p>
                <p><strong>2030 target:</strong> 300 tonnes (-65%) - Heat pump installation, solar PV</p>
                <p><strong>2035 target:</strong> 100 tonnes (-88%) - Additional efficiency, battery storage</p>
                <p><strong>2040 target:</strong> Net-zero - Offset remaining 100 tonnes with verified removals</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Planning tip:</strong> Align major interventions with equipment replacement cycles (boilers typically 15-20 years) to avoid stranded assets and optimise whole-life costs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Verification and Reporting Frameworks */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Verification and Reporting Frameworks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Credible net-zero claims require robust verification against recognised frameworks.
              The UKGBC Net Zero Carbon Buildings Framework provides the primary industry standard
              for the UK built environment, ensuring consistency and preventing greenwashing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UKGBC Net Zero Carbon Buildings Framework</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Net-Zero Construction</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Calculate embodied carbon (A1-A5)</li>
                    <li>Reduce through design optimisation</li>
                    <li>Specify low-carbon materials</li>
                    <li>Offset residual with verified credits</li>
                    <li>Disclose publicly</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Net-Zero Operation</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Reduce operational energy demand</li>
                    <li>Increase renewable supply</li>
                    <li>Measure actual performance</li>
                    <li>Offset residual emissions</li>
                    <li>Report annually and disclose</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Verification Standards and Reporting</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Framework/Standard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UKGBC Framework</td>
                      <td className="border border-white/10 px-3 py-2">UK buildings (construction/operation)</td>
                      <td className="border border-white/10 px-3 py-2">Hierarchy, reduction first, public disclosure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Science Based Targets (SBTi)</td>
                      <td className="border border-white/10 px-3 py-2">Corporate emissions targets</td>
                      <td className="border border-white/10 px-3 py-2">Paris-aligned, 90%+ reduction before offset</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">GHG Protocol</td>
                      <td className="border border-white/10 px-3 py-2">Carbon accounting methodology</td>
                      <td className="border border-white/10 px-3 py-2">Scope 1, 2, 3 emissions categories</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PAS 2080</td>
                      <td className="border border-white/10 px-3 py-2">Infrastructure carbon management</td>
                      <td className="border border-white/10 px-3 py-2">Whole-life carbon, value chain approach</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">NABERS UK</td>
                      <td className="border border-white/10 px-3 py-2">Operational performance rating</td>
                      <td className="border border-white/10 px-3 py-2">Actual (not design) energy performance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Building Services Role in Net-Zero Achievement</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Design:</strong> Specify low-carbon HVAC, efficient lighting, smart controls from project inception</li>
                <li className="pl-1"><strong>Energy modelling:</strong> Predict operational carbon and test reduction scenarios</li>
                <li className="pl-1"><strong>Technology selection:</strong> Advise on heat pumps, renewables, storage systems</li>
                <li className="pl-1"><strong>Commissioning:</strong> Ensure systems operate as designed for optimal efficiency</li>
                <li className="pl-1"><strong>Monitoring:</strong> Set up metering and analytics to track performance</li>
                <li className="pl-1"><strong>Continuous improvement:</strong> Identify optimisation opportunities post-occupancy</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Verification importance:</strong> Third-party verification ensures net-zero claims are credible, comparable, and defensible against accusations of greenwashing - essential for reputation and stakeholder trust.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Applying the Carbon Hierarchy</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A university is planning a new teaching building and wants to achieve net-zero operation. Apply the hierarchy.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Carbon Hierarchy Application:</p>
                <p className="mt-2 text-green-400">1. AVOID:</p>
                <p className="ml-4">- No gas connection - all-electric design</p>
                <p className="ml-4">- Optimise building form to minimise heat loss</p>
                <p className="ml-4">- Maximise natural ventilation where possible</p>
                <p className="mt-2 text-blue-400">2. REDUCE:</p>
                <p className="ml-4">- Enhanced fabric: U-values below Part L by 30%</p>
                <p className="ml-4">- High-efficacy LED lighting (150+ lm/W)</p>
                <p className="ml-4">- Demand-controlled ventilation with CO2 sensors</p>
                <p className="ml-4">- Smart BMS with predictive control</p>
                <p className="mt-2 text-amber-400">3. REPLACE:</p>
                <p className="ml-4">- Air source heat pumps for heating/cooling</p>
                <p className="ml-4">- 200kWp rooftop solar PV array</p>
                <p className="ml-4">- 100% renewable electricity procurement</p>
                <p className="mt-2 text-purple-400">4. OFFSET:</p>
                <p className="ml-4">- Purchase verified carbon removal credits</p>
                <p className="ml-4">- Estimated residual: 50 tonnes/year (grid factor)</p>
                <p className="mt-2 text-green-400">Result: Net-zero operational carbon from day one</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Developing Interim Targets</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A commercial property owner has set a 2040 net-zero target. Develop interim milestones.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Portfolio baseline (2024): 25,000 tonnes CO2/year</p>
                <p>Net-zero target: 2040</p>
                <p className="mt-2">Interim Milestones:</p>
                <p className="mt-1">2027 Target: 20,000 tonnes (-20%)</p>
                <p className="ml-4">- LED lighting retrofit (all buildings)</p>
                <p className="ml-4">- BMS upgrades and optimisation</p>
                <p className="ml-4">- Switch to 100% green electricity tariff</p>
                <p className="mt-1">2030 Target: 12,500 tonnes (-50%)</p>
                <p className="ml-4">- Heat pump installation (50% of portfolio)</p>
                <p className="ml-4">- Solar PV on suitable roofs</p>
                <p className="ml-4">- Advanced controls and analytics</p>
                <p className="mt-1">2035 Target: 5,000 tonnes (-80%)</p>
                <p className="ml-4">- Complete heat pump rollout</p>
                <p className="ml-4">- Battery storage for load shifting</p>
                <p className="ml-4">- Deep fabric retrofits where feasible</p>
                <p className="mt-1">2040 Target: Net-zero</p>
                <p className="ml-4">- Offset remaining ~2,500 tonnes</p>
                <p className="ml-4">- High-quality verified removal credits</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Carbon Baseline Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate annual operational carbon for an office building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Energy consumption data:</p>
                <p className="ml-4">Gas (heating): 500,000 kWh/year</p>
                <p className="ml-4">Electricity: 800,000 kWh/year</p>
                <p className="mt-2">Carbon factors (2024 UK Government):</p>
                <p className="ml-4">Natural gas: 0.182 kgCO2/kWh</p>
                <p className="ml-4">Grid electricity: 0.207 kgCO2/kWh</p>
                <p className="mt-2">Carbon calculation:</p>
                <p className="ml-4">Gas: 500,000 x 0.182 = 91,000 kgCO2</p>
                <p className="ml-4">Elec: 800,000 x 0.207 = 165,600 kgCO2</p>
                <p className="mt-2 text-elec-yellow">Total: 256,600 kgCO2 = 257 tonnes CO2/year</p>
                <p className="mt-2">Scope categorisation:</p>
                <p className="ml-4">Scope 1 (gas): 91 tonnes</p>
                <p className="ml-4">Scope 2 (electricity): 166 tonnes</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Net-Zero Pathway Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Conduct comprehensive energy audit and establish carbon baseline</li>
                <li className="pl-1">Define clear net-zero target date aligned with organisational strategy</li>
                <li className="pl-1">Set interim milestones (typically 2030, 2035) with specific reduction targets</li>
                <li className="pl-1">Identify all reduction measures using the hierarchy (Avoid-Reduce-Replace)</li>
                <li className="pl-1">Align interventions with equipment replacement cycles</li>
                <li className="pl-1">Develop investment plan with funding sources identified</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">UK net-zero target: <strong>2050</strong> (legally binding)</li>
                <li className="pl-1">Buildings' share of UK emissions: <strong>~40%</strong></li>
                <li className="pl-1">SBTi minimum reduction before offset: <strong>90%</strong></li>
                <li className="pl-1">Heat pump COP range: <strong>3-4</strong> (300-400% efficiency)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Offsetting first:</strong> Using offsets before exhausting efficiency measures</li>
                <li className="pl-1"><strong>Poor baseline:</strong> Inaccurate starting point undermines entire pathway</li>
                <li className="pl-1"><strong>Missing interim targets:</strong> Without milestones, progress cannot be tracked</li>
                <li className="pl-1"><strong>Low-quality offsets:</strong> Cheap offsets that lack additionality or permanence</li>
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
                <p className="font-medium text-white mb-1">Carbon Hierarchy</p>
                <ul className="space-y-0.5">
                  <li>1. Avoid - Eliminate carbon-intensive activities</li>
                  <li>2. Reduce - Improve efficiency</li>
                  <li>3. Replace - Switch to low-carbon sources</li>
                  <li>4. Offset - Balance residual only</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Frameworks</p>
                <ul className="space-y-0.5">
                  <li>UKGBC Net Zero Carbon Buildings</li>
                  <li>Science Based Targets initiative (SBTi)</li>
                  <li>GHG Protocol (Scope 1, 2, 3)</li>
                  <li>PAS 2080 Carbon Management</li>
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
            <Link to="../h-n-c-module6-section5-1">
              Next: Section 5.1
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section4_6;
