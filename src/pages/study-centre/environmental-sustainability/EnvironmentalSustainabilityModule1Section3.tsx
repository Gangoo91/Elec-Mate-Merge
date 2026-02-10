import { ArrowLeft, CheckCircle, AlertTriangle, FileSearch, ClipboardList, Leaf, Shield, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "eia-schedule1-vs-schedule2",
    question: "What is the key difference between a Schedule 1 and a Schedule 2 project under the Town and Country Planning (EIA) Regulations 2017?",
    options: [
      "Schedule 1 projects are voluntary; Schedule 2 projects are mandatory",
      "Schedule 1 projects always require an EIA; Schedule 2 projects require screening to determine whether an EIA is needed",
      "Schedule 1 projects are only for government developments; Schedule 2 projects are for private developments",
      "Schedule 1 projects require a Strategic Environmental Assessment; Schedule 2 projects require an Environmental Impact Assessment"
    ],
    correctIndex: 1,
    explanation: "Schedule 1 projects always require an EIA due to their scale and nature (e.g. power stations, chemical installations, motorways). Schedule 2 projects require a screening opinion from the local planning authority to determine whether the project is likely to have significant environmental effects and therefore needs an EIA. Screening considers factors such as size, location sensitivity, and potential impact."
  },
  {
    id: "eia-environmental-statement",
    question: "What is the purpose of the non-technical summary within an Environmental Statement?",
    options: [
      "To provide a simplified version of the project drawings for contractors",
      "To present the key findings in accessible language so that the public and non-specialist consultees can understand the environmental effects",
      "To replace the full Environmental Statement when the project is minor",
      "To provide a legal disclaimer for the developer"
    ],
    correctIndex: 1,
    explanation: "The non-technical summary (NTS) is a mandatory component of the Environmental Statement. Its purpose is to present the key findings of the EIA in plain, accessible language so that members of the public, elected councillors, and non-specialist consultees can understand the likely environmental effects of the proposed development and the mitigation measures proposed. It must cover all topics addressed in the full ES but without technical jargon."
  },
  {
    id: "eia-mitigation-hierarchy",
    question: "What is the correct order of the mitigation hierarchy used in Environmental Impact Assessment?",
    options: [
      "Compensate, reduce, remedy, avoid",
      "Reduce, avoid, compensate, remedy",
      "Avoid, reduce, remedy, compensate",
      "Remedy, avoid, reduce, compensate"
    ],
    correctIndex: 2,
    explanation: "The mitigation hierarchy follows the order: avoid (prevent the impact from occurring through design changes), reduce (minimise the impact where avoidance is not possible), remedy (restore or rehabilitate the affected environment after impact), and compensate (offset residual impacts that cannot be avoided, reduced, or remedied). The hierarchy prioritises prevention over cure, and compensation is always the last resort."
  }
];

const faqs = [
  {
    question: "Does every construction project require an Environmental Impact Assessment?",
    answer: "No. Only certain types of development require an EIA. Schedule 1 projects under the Town and Country Planning (EIA) Regulations 2017 always require an EIA. These are large-scale developments such as power stations, motorways, chemical installations, and waste disposal facilities. Schedule 2 projects require a screening opinion from the local planning authority to determine whether the project is likely to have significant environmental effects. Many smaller developments, including most domestic building projects and minor commercial works, fall outside the scope of the EIA Regulations entirely."
  },
  {
    question: "What is the difference between an EIA and a Strategic Environmental Assessment (SEA)?",
    answer: "An EIA assesses the environmental effects of individual development projects (e.g. a new housing estate, a wind farm, or a road). A Strategic Environmental Assessment (SEA) assesses the environmental effects of plans and programmes at a higher strategic level (e.g. a local plan, a transport strategy, or an energy policy). SEA is governed by the Environmental Assessment of Plans and Programmes Regulations 2004, while EIA is governed by the Town and Country Planning (EIA) Regulations 2017. In practice, an SEA examines cumulative and strategic impacts across a region, while an EIA focuses on a specific site and project."
  },
  {
    question: "Who prepares the Environmental Statement and who pays for it?",
    answer: "The Environmental Statement is prepared by or on behalf of the developer, and the developer pays for all costs associated with the EIA process. In practice, the ES is typically prepared by a team of specialist environmental consultants covering topics such as ecology, noise, air quality, transport, landscape, heritage, and hydrology. The local planning authority reviews the ES but does not prepare it. The planning authority may also commission its own independent review of the ES at the developer's expense if required."
  },
  {
    question: "What happens if a project proceeds without a required EIA?",
    answer: "If a development that required EIA proceeds without one, the planning permission may be legally challenged and potentially quashed through judicial review. The local planning authority has enforcement powers to require the development to cease until the proper process is followed. In addition, EU-derived case law (which remains relevant as retained EU law) established that failure to carry out a required EIA is a procedural defect that can invalidate the planning permission entirely. Remedial action may include retrospective EIA, but this does not remove the risk of enforcement action or legal challenge."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The current UK regulations governing EIA for planning applications are the:",
    options: [
      "Environmental Protection Act 1990",
      "Town and Country Planning (EIA) Regulations 2017",
      "Environment Act 2021",
      "Planning and Compulsory Purchase Act 2004"
    ],
    correctAnswer: 1,
    explanation: "The Town and Country Planning (Environmental Impact Assessment) Regulations 2017 are the principal regulations governing EIA for planning applications in England. They transposed the requirements of EU Directive 2014/52/EU (amending Directive 2011/92/EU, itself a consolidation of the original 1985 Directive 85/337/EEC). The 2017 Regulations set out which projects require EIA, the screening and scoping procedures, the content of the Environmental Statement, and the consultation requirements."
  },
  {
    id: 2,
    question: "Which of the following is a Schedule 1 project that ALWAYS requires an EIA?",
    options: [
      "Construction of a new secondary school",
      "A small wind farm with 3 turbines",
      "A crude oil refinery or thermal power station over 300MW",
      "Extension of an existing residential development by 50 homes"
    ],
    correctAnswer: 2,
    explanation: "Crude oil refineries and thermal power stations with a heat output of 300MW or more are Schedule 1 projects under the 2017 Regulations. Schedule 1 projects always require an EIA regardless of their location or other factors. Other Schedule 1 projects include motorways, chemical installations, large waste disposal sites, and large dams. Schools, small wind farms, and residential extensions are not Schedule 1 projects, although they may be Schedule 2 depending on their scale and location."
  },
  {
    id: 3,
    question: "The first stage of the formal EIA process is:",
    options: [
      "Preparing the Environmental Statement",
      "Public consultation",
      "Screening — determining whether an EIA is required",
      "Monitoring environmental effects after construction"
    ],
    correctAnswer: 2,
    explanation: "Screening is the first stage of the formal EIA process. It determines whether a proposed development is likely to have significant environmental effects and therefore requires an EIA. For Schedule 1 projects, screening is unnecessary because EIA is always required. For Schedule 2 projects, the developer may request a screening opinion from the local planning authority, or the authority may issue one on its own initiative. Screening considers the nature, size, and location of the project."
  },
  {
    id: 4,
    question: "The purpose of the scoping stage in EIA is to:",
    options: [
      "Decide whether to grant planning permission",
      "Identify the key environmental topics and the scope of assessment to be covered in the Environmental Statement",
      "Calculate the cost of the development",
      "Monitor the construction phase for compliance"
    ],
    correctAnswer: 1,
    explanation: "Scoping identifies the key environmental topics and the level of detail that the Environmental Statement must address. It allows the developer, the local planning authority, and statutory consultees (such as Natural England, the Environment Agency, and Historic England) to agree on what needs to be assessed before the full EIA work begins. A scoping opinion from the LPA is not mandatory but is strongly recommended. It prevents the developer from wasting resources assessing topics that are not significant, and ensures that genuinely significant topics are covered properly."
  },
  {
    id: 5,
    question: "Which of the following is NOT a mandatory topic that must be assessed in an EIA under the 2017 Regulations?",
    options: [
      "Biodiversity (flora and fauna)",
      "Population and human health",
      "The developer's financial viability",
      "Climate (greenhouse gas emissions and vulnerability)"
    ],
    correctAnswer: 2,
    explanation: "The developer's financial viability is not a topic assessed in the EIA. The 2017 Regulations require assessment of: population and human health; biodiversity; land, soil, water, air, and climate; material assets, cultural heritage, and landscape; and the interaction between these factors. Financial viability may be relevant to other aspects of the planning application (e.g. affordable housing contributions) but it is not an environmental topic within the scope of EIA."
  },
  {
    id: 6,
    question: "In the mitigation hierarchy, 'compensate' means:",
    options: [
      "Paying a fine to the local authority for environmental damage",
      "Offsetting residual environmental impacts that cannot be avoided, reduced, or remedied — for example through biodiversity offsetting",
      "Reducing the scale of the development",
      "Relocating the project to a less sensitive site"
    ],
    correctAnswer: 1,
    explanation: "Compensation is the final step in the mitigation hierarchy, used when impacts cannot be avoided, reduced, or remedied. It involves offsetting residual impacts, for example through biodiversity offsetting (creating or enhancing habitats elsewhere to compensate for habitat lost at the development site). Under the Environment Act 2021, most developments in England must deliver a minimum 10% biodiversity net gain, which goes beyond simple compensation. Compensation does not mean paying a fine — it means delivering measurable environmental improvements elsewhere."
  },
  {
    id: 7,
    question: "A Construction Environmental Management Plan (CEMP) is typically:",
    options: [
      "A document prepared after the development is completed",
      "A plan secured through a planning condition that sets out how environmental impacts will be managed during the construction phase",
      "A replacement for the Environmental Statement",
      "A voluntary document that has no legal standing"
    ],
    correctAnswer: 1,
    explanation: "A CEMP is a practical document that sets out how environmental impacts will be managed during the construction phase of a development. It is typically secured through a planning condition (a requirement attached to the planning permission). The CEMP covers topics such as dust and air quality management, noise and vibration control, water pollution prevention, ecological protection, waste management, and working hours. It translates the mitigation commitments in the Environmental Statement into practical, enforceable measures for the construction contractor."
  },
  {
    id: 8,
    question: "Strategic Environmental Assessment (SEA) in the UK is governed by:",
    options: [
      "The Town and Country Planning (EIA) Regulations 2017",
      "The Environmental Assessment of Plans and Programmes Regulations 2004",
      "The Environment Act 2021",
      "The Wildlife and Countryside Act 1981"
    ],
    correctAnswer: 1,
    explanation: "SEA in the UK is governed by the Environmental Assessment of Plans and Programmes Regulations 2004, which transposed EU Directive 2001/42/EC (the SEA Directive) into UK law. These regulations require certain plans and programmes (such as local development plans, transport strategies, and waste management plans) to undergo environmental assessment before they are adopted. SEA is distinct from EIA, which applies to individual development projects rather than strategic plans."
  }
];

export default function EnvironmentalSustainabilityModule1Section3() {
  useSEO({
    title: "Environmental Impact Assessment | Environmental & Sustainability Module 1.3",
    description: "Environmental Impact Assessment: EIA Regulations 2017, screening, scoping, Environmental Statement, mitigation hierarchy, CEMPs, and Strategic Environmental Assessment for UK construction.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <FileSearch className="h-7 w-7 text-emerald-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-400 text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Environmental Impact Assessment
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding EIA legislation, the assessment process, Environmental Statements, mitigation measures, CEMPs, and Strategic Environmental Assessment in UK construction
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>EIA:</strong> A process to identify, predict, and evaluate environmental effects before development proceeds</li>
              <li><strong>Regulations:</strong> Town and Country Planning (EIA) Regulations 2017</li>
              <li><strong>Origin:</strong> EU Directive 85/337/EEC, retained in UK law</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>CEMP:</strong> Construction Environmental Management Plan controls site impacts</li>
              <li><strong>Mitigation:</strong> Avoid &rarr; Reduce &rarr; Remedy &rarr; Compensate</li>
              <li><strong>BNG:</strong> Minimum 10% biodiversity net gain required since 2024</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define Environmental Impact Assessment and explain its purpose in the UK planning system",
              "Describe the legislative framework including the EIA Regulations 2017 and EU Directive origins",
              "Distinguish between Schedule 1 and Schedule 2 projects and explain the screening process",
              "Outline the six stages of the EIA process from screening to monitoring",
              "Identify the mandatory content of an Environmental Statement including key assessment topics",
              "Explain the mitigation hierarchy, biodiversity net gain requirements, and the role of CEMPs",
              "Describe the purpose of Strategic Environmental Assessment and how it differs from EIA",
              "Apply EIA principles to construction scenarios relevant to electrical and building services work"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is an EIA? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">01</span>
            What Is an EIA?
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An <strong>Environmental Impact Assessment (EIA)</strong> is a systematic process used to identify,
                predict, evaluate, and mitigate the likely environmental effects of a proposed development
                <strong> before</strong> planning permission is granted. It ensures that decision-makers,
                statutory consultees, and the public have access to comprehensive environmental information
                when considering whether a development should proceed.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">Key Definition &mdash; Environmental Impact Assessment</p>
                <p className="text-sm text-white">
                  EIA is not a single document but a <strong>process</strong>. It involves screening, scoping,
                  preparing an Environmental Statement (ES), public consultation, decision-making, and
                  post-decision monitoring. The purpose is to ensure that environmental considerations are
                  fully integrated into the planning process, preventing harmful developments from proceeding
                  without proper scrutiny and mitigation.
                </p>
              </div>

              <p>
                The core purposes of EIA are to:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Core Purposes of EIA</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { purpose: "Inform decision-making", detail: "Provide the local planning authority with robust environmental information to make an informed decision on the planning application" },
                    { purpose: "Protect the environment", detail: "Identify significant environmental effects early so that harm can be avoided or minimised through design changes and mitigation" },
                    { purpose: "Enable public participation", detail: "Give the public and statutory consultees the opportunity to understand and comment on the environmental effects of a proposal" },
                    { purpose: "Promote sustainable development", detail: "Ensure that environmental costs are weighed alongside economic and social benefits in the planning balance" }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-emerald-400 mb-1">{item.purpose}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-base font-semibold text-white mt-6 mb-2">Legislative Framework</h3>

              <p>
                EIA in England is governed by the <strong>Town and Country Planning (Environmental Impact
                Assessment) Regulations 2017</strong>. These regulations transposed EU Directive 2014/52/EU
                (which amended the codified EIA Directive 2011/92/EU) into English law. The original EIA
                requirement came from <strong>EU Directive 85/337/EEC</strong>, first transposed into UK law
                in 1988.
              </p>

              <p>
                Following Brexit, the EIA Regulations 2017 were retained as part of UK domestic law through
                the European Union (Withdrawal) Act 2018. The core principles of EIA remain unchanged,
                although the UK government has the power to amend the regulations through secondary
                legislation. The Levelling Up and Regeneration Act 2023 introduced provisions for potential
                future reform of the environmental assessment regime, but at the time of writing the 2017
                Regulations remain the operative framework.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Legislation Timeline</p>
                <div className="space-y-3">
                  {[
                    { year: "1985", event: "EU Directive 85/337/EEC", detail: "Original EIA Directive requiring member states to assess the environmental effects of certain public and private projects before consent is given" },
                    { year: "1988", event: "First UK EIA Regulations", detail: "Town and Country Planning (Assessment of Environmental Effects) Regulations 1988 transposed the Directive into English law" },
                    { year: "2011", event: "EU Directive 2011/92/EU", detail: "Codified version consolidating all amendments to the original 1985 Directive into a single legislative instrument" },
                    { year: "2014", event: "EU Directive 2014/52/EU", detail: "Major amendment strengthening requirements for climate, biodiversity, disaster risk, and resource efficiency assessment" },
                    { year: "2017", event: "EIA Regulations 2017", detail: "Current English regulations transposing the 2014 amendments, including enhanced screening criteria, mandatory scoping content, and updated ES requirements" },
                    { year: "2018", event: "EU (Withdrawal) Act 2018", detail: "Retained the EIA Regulations as UK domestic law post-Brexit" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-black/30 rounded-lg p-3">
                      <span className="text-xs font-bold text-emerald-400 whitespace-nowrap mt-0.5">{item.year}</span>
                      <div>
                        <p className="text-xs font-medium text-white">{item.event}</p>
                        <p className="text-xs text-white/70">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Important Note</p>
                </div>
                <p className="text-sm text-white/80">
                  Separate EIA regulations exist for other consent regimes in England, including the
                  <strong> Infrastructure Planning (Environmental Impact Assessment) Regulations 2017</strong> for
                  Nationally Significant Infrastructure Projects (NSIPs) and specific EIA regulations for
                  forestry, marine, and agriculture. Scotland, Wales, and Northern Ireland have their own
                  EIA regulations, though all derive from the same EU Directive framework.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: When Is an EIA Required? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">02</span>
            When Is an EIA Required?
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not every development requires an EIA. The 2017 Regulations classify projects into two
                categories &mdash; <strong>Schedule 1</strong> and <strong>Schedule 2</strong> &mdash; which
                determine whether EIA is mandatory or subject to screening. Projects that do not fall into
                either Schedule are exempt from EIA requirements entirely.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">Key Principle</p>
                <p className="text-sm text-white">
                  EIA is required for projects that are likely to have <strong>significant effects on the
                  environment</strong> by virtue of their nature, size, or location. The Regulations use the
                  Schedule system to identify which projects have the potential for significant effects.
                </p>
              </div>

              {/* Schedule 1 vs Schedule 2 Comparison Grid */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 overflow-hidden">
                <p className="text-xs text-white/50 uppercase tracking-wider mb-4 text-center">Schedule 1 vs Schedule 2 &mdash; Comparison</p>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Schedule 1 */}
                  <div className="border-2 border-red-500/30 rounded-lg overflow-hidden">
                    <div className="bg-red-500/20 border-b border-red-500/30 px-4 py-3">
                      <p className="text-sm font-bold text-red-300">Schedule 1 &mdash; EIA Always Required</p>
                    </div>
                    <div className="p-4 space-y-3">
                      <p className="text-xs text-white/80">
                        These are large-scale, high-impact projects where significant environmental effects are
                        <strong> presumed</strong>. No screening is needed &mdash; EIA is mandatory.
                      </p>
                      <div className="space-y-2">
                        {[
                          "Crude oil refineries",
                          "Thermal power stations (>300MW heat output)",
                          "Nuclear power stations and reactors",
                          "Integrated chemical installations",
                          "Motorways and express roads",
                          "Railway lines for long-distance traffic",
                          "Airports with runways >2,100m",
                          "Trading ports and inland waterways for >1,350 tonne vessels",
                          "Waste disposal installations (incineration, chemical treatment, landfill) for hazardous waste",
                          "Groundwater abstraction >10 million m\u00B3/year"
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5" />
                            <span className="text-xs text-white/70">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Schedule 2 */}
                  <div className="border-2 border-amber-500/30 rounded-lg overflow-hidden">
                    <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-3">
                      <p className="text-sm font-bold text-amber-300">Schedule 2 &mdash; Screening Required</p>
                    </div>
                    <div className="p-4 space-y-3">
                      <p className="text-xs text-white/80">
                        These projects <strong>may</strong> have significant environmental effects depending on their
                        characteristics, location, and potential impact. Screening determines whether EIA is needed.
                      </p>
                      <div className="space-y-2">
                        {[
                          "Industrial estate developments (>0.5 hectare)",
                          "Urban development projects (>1 hectare in non-sensitive areas; >150 dwellings; >5 hectare site)",
                          "Wind farms (>2 turbines or hub height >15m)",
                          "Installations for hydroelectric energy (>0.5MW)",
                          "Overhead electrical power lines (>3km)",
                          "Pipelines for gas, oil, or chemicals (>800m)",
                          "Food processing and storage",
                          "Mineral extraction and deep drilling",
                          "Waste water treatment plants",
                          "Tourism and leisure developments (>1 hectare)"
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5" />
                            <span className="text-xs text-white/70">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-4 mt-4 justify-center">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
                    <span className="text-[10px] text-white/50">EIA always mandatory</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-amber-500/30 border border-amber-500/50" />
                    <span className="text-[10px] text-white/50">Screening determines requirement</span>
                  </div>
                </div>
              </div>

              <h3 className="text-base font-semibold text-white mt-6 mb-2">The Screening Process</h3>

              <p>
                For Schedule 2 projects, screening determines whether the project is likely to have significant
                environmental effects. The developer may request a <strong>screening opinion</strong> from the
                local planning authority (LPA), or the LPA may issue one on its own initiative. The screening
                decision considers three sets of criteria:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Screening Criteria (Schedule 3)</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { criterion: "Characteristics of the development", detail: "Size, design, cumulative effects, use of natural resources, waste production, pollution, nuisance, and accident risk" },
                    { criterion: "Location of the development", detail: "Sensitivity of the receiving environment including wetlands, coastal zones, nature reserves, densely populated areas, and landscapes of historical or cultural significance" },
                    { criterion: "Characteristics of potential impact", detail: "Extent, transboundary nature, magnitude, probability, onset, duration, frequency, reversibility, and cumulation of the impact" }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-emerald-400 mb-1">{item.criterion}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                The LPA must issue its screening opinion within <strong>3 weeks</strong> of receiving the
                request (or longer if agreed). If the developer disagrees with a positive screening opinion
                (i.e. the LPA says EIA is required), they may request a <strong>screening direction</strong> from
                the Secretary of State. The Secretary of State must issue the direction within 3 weeks.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Practical Point</p>
                </div>
                <p className="text-sm text-white/80">
                  For electrical infrastructure projects, the most relevant Schedule 2 categories include
                  <strong> overhead electrical power lines exceeding 3km</strong>,
                  <strong> electrical substations</strong>,
                  <strong> wind farms</strong>, and
                  <strong> solar farms</strong>. Even if your project falls below the applicable thresholds,
                  the LPA may still require EIA if the site is in or near a sensitive area such as a
                  Site of Special Scientific Interest (SSSI), Area of Outstanding Natural Beauty (AONB),
                  or flood zone.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The EIA Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">03</span>
            The EIA Process
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The EIA process consists of six principal stages, from screening through to post-decision
                monitoring. Each stage builds on the previous one, creating a structured framework for
                identifying, assessing, and mitigating environmental effects.
              </p>

              {/* EIA Process Flowchart */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 overflow-hidden">
                <p className="text-xs text-white/50 uppercase tracking-wider mb-4 text-center">EIA Process Flowchart &mdash; 6 Stages</p>

                <div className="relative mx-auto max-w-2xl space-y-3">
                  {[
                    { step: "1", title: "Screening", desc: "Is EIA required? Determine if the project is Schedule 1 (always), Schedule 2 (screening opinion needed), or exempt.", colour: "emerald" },
                    { step: "2", title: "Scoping", desc: "What should the EIA cover? Identify key topics, level of detail, and assessment methodology in consultation with the LPA and statutory consultees.", colour: "emerald" },
                    { step: "3", title: "Environmental Statement Preparation", desc: "Prepare the ES including baseline surveys, impact assessment, mitigation proposals, and non-technical summary. This is the main technical work.", colour: "emerald" },
                    { step: "4", title: "Consultation", desc: "Submit the ES with the planning application. Statutory consultees and the public are given the opportunity to review and comment on the environmental information.", colour: "emerald" },
                    { step: "5", title: "Decision", desc: "The LPA determines the application taking into account the ES, consultation responses, and all other material considerations. Conditions may be attached.", colour: "emerald" },
                    { step: "6", title: "Monitoring", desc: "Post-decision monitoring of significant adverse effects. The 2017 Regulations give LPAs the power to require monitoring measures as conditions of permission.", colour: "emerald" }
                  ].map((item, i, arr) => (
                    <div key={i} className="relative">
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center text-sm font-bold text-emerald-400">
                            {item.step}
                          </span>
                          {i < arr.length - 1 && (
                            <div className="w-0.5 h-6 bg-emerald-500/20 mt-1" />
                          )}
                        </div>
                        <div className="bg-black/30 rounded-lg p-3 flex-1">
                          <p className="text-sm font-semibold text-emerald-400 mb-1">{item.title}</p>
                          <p className="text-xs text-white/70">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-base font-semibold text-white mt-6 mb-2">Stage Detail: Screening</h3>

              <p>
                Screening is the gateway to the EIA process. For Schedule 1 projects, the answer is
                straightforward &mdash; EIA is always required. For Schedule 2 projects, the developer
                or LPA must determine whether the project is likely to have significant environmental
                effects by considering the characteristics, location, and potential impact (the three
                Schedule 3 criteria described above). The screening opinion is a formal written decision
                issued by the LPA.
              </p>

              <h3 className="text-base font-semibold text-white mt-6 mb-2">Stage Detail: Scoping</h3>

              <p>
                Scoping defines the boundaries of the assessment. The developer may request a
                <strong> scoping opinion</strong> from the LPA, which must be issued within <strong>5
                weeks</strong>. The LPA consults statutory bodies such as Natural England, the Environment
                Agency, and Historic England. Scoping identifies which environmental topics are significant
                for the project, what baseline surveys are needed, the assessment methodology, and any
                topics that can be scoped out (i.e. excluded from the assessment because they are not
                significant). A thorough scoping exercise prevents wasted effort and ensures focus on the
                topics that genuinely matter.
              </p>

              <h3 className="text-base font-semibold text-white mt-6 mb-2">Stage Detail: ES Preparation, Consultation, Decision &amp; Monitoring</h3>

              <p>
                Preparing the Environmental Statement is the most substantial stage, often taking 12-24
                months depending on the complexity of the project. It involves baseline surveys (e.g.
                ecological surveys, noise monitoring, air quality modelling), impact assessment, design
                iteration to reduce impacts, and the drafting of mitigation and monitoring strategies.
                Once submitted with the planning application, the ES is made available for public consultation
                (minimum 30 days). The LPA makes its decision taking the ES and consultation responses into
                account. Post-decision, the 2017 Regulations empower the LPA to require monitoring of
                significant adverse effects as a condition of permission.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardList className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Key Timescales</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-3 mt-3">
                  {[
                    { stage: "Screening opinion", time: "3 weeks" },
                    { stage: "Scoping opinion", time: "5 weeks" },
                    { stage: "ES preparation", time: "12-24 months (typical)" },
                    { stage: "Public consultation", time: "Minimum 30 days" },
                    { stage: "LPA decision (EIA applications)", time: "16 weeks (statutory target)" },
                    { stage: "Secretary of State screening direction", time: "3 weeks" }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-2">
                      <p className="text-[10px] font-medium text-emerald-400">{item.stage}</p>
                      <p className="text-xs text-white/80 font-semibold">{item.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Environmental Statement Content */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">04</span>
            Environmental Statement Content
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Environmental Statement (ES)</strong> is the principal document produced through
                the EIA process. It presents the findings of the assessment in a structured format that
                enables the LPA, statutory consultees, and the public to understand the environmental
                effects of the proposed development and the measures proposed to mitigate them.
              </p>

              <p>
                Schedule 4 of the 2017 Regulations sets out the information that must be included in the ES.
                The requirements are divided into mandatory information (Part 1) and additional information
                that may be required depending on the project (Part 2).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Mandatory ES Content (Schedule 4, Part 1)</p>
                <div className="space-y-3">
                  {[
                    { section: "Non-Technical Summary (NTS)", detail: "A summary of the entire ES in plain, accessible language. Must cover all topics assessed but without technical jargon. Designed for public and non-specialist readers. Often the most-read section of the ES." },
                    { section: "Description of the Development", detail: "The physical characteristics of the project including location, design, size, and land-use requirements during construction and operation. Must include demolition works, land-take, and production processes where relevant." },
                    { section: "Alternatives Considered", detail: "A description of the reasonable alternatives studied by the developer (e.g. alternative sites, layouts, designs, technologies, or the 'do nothing' scenario) and the reasons for selecting the chosen option." },
                    { section: "Baseline Conditions", detail: "Description of the relevant aspects of the current state of the environment (the 'baseline') and an outline of the likely evolution of the baseline without the development (the 'future baseline')." },
                    { section: "Assessment of Significant Effects", detail: "A description of the likely significant effects of the development on the environment covering direct, indirect, secondary, cumulative, transboundary, short-term, medium-term, long-term, permanent, and temporary effects during construction, operation, and decommissioning." },
                    { section: "Mitigation Measures", detail: "A description of the measures envisaged to avoid, prevent, reduce, or offset any identified significant adverse effects. Where appropriate, monitoring arrangements for those measures must also be described." },
                    { section: "Cumulative Effects", detail: "Assessment of the combined effects of the proposed development with other existing and approved developments. Cumulative assessment prevents 'salami-slicing' where individually minor projects combine to produce significant impacts." },
                    { section: "Assessment Methodology", detail: "A description of the forecasting methods and evidence used to identify and assess the significant effects, including any difficulties (technical deficiencies or gaps in knowledge) encountered." }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-emerald-400 mb-1">{item.section}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Quality and Adequacy</p>
                </div>
                <p className="text-sm text-white/80">
                  The LPA must not determine the planning application until it is satisfied that the ES
                  contains all the information required by Schedule 4. If the ES is inadequate, the LPA
                  can request <strong>further information</strong> under Regulation 25 of the 2017
                  Regulations. In practice, the quality of the ES is often challenged by statutory
                  consultees and third parties during the consultation period. A poor-quality ES can
                  delay the application significantly and may lead to refusal or judicial review.
                </p>
              </div>

              <p>
                A typical ES for a major development can run to several thousand pages, including technical
                appendices. The document is usually structured as a series of topic chapters (e.g. ecology,
                noise, air quality, landscape, transport, water resources, heritage) each following a
                consistent format: methodology, baseline conditions, assessment of effects, mitigation
                measures, and residual effects.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Key Assessment Topics */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">05</span>
            Key Assessment Topics
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The 2017 Regulations specify the environmental factors that must be assessed in the EIA.
                These factors were updated by the 2014 EU Directive to include explicit requirements for
                climate assessment and to strengthen the consideration of biodiversity, human health,
                and natural resources.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Mandatory Assessment Topics (Regulation 4(2))</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { topic: "Biodiversity", icon: "leaf", detail: "Effects on habitats, species, ecological networks, and ecosystem services. Includes protected species (bats, great crested newts, badgers), ancient woodland, and priority habitats. Must assess direct habitat loss, fragmentation, disturbance, pollution, and lighting impacts." },
                    { topic: "Population & Human Health", icon: "users", detail: "Effects on local communities including noise, air quality, visual amenity, access to services, employment, and community severance. Includes assessment of health determinants such as air pollution, contaminated land, and mental wellbeing." },
                    { topic: "Land & Soil", icon: "layers", detail: "Effects on land use, agricultural land quality (Best and Most Versatile land classification), soil structure and function, contaminated land, and geodiversity. Includes assessment of soil sealing, compaction, and erosion during construction." },
                    { topic: "Water", icon: "droplet", detail: "Effects on surface water and groundwater quality, hydrology, flood risk, water resources, and drainage. Includes assessment of pollution risk during construction, operational discharges, and the effects of climate change on flood risk." },
                    { topic: "Air Quality", icon: "wind", detail: "Effects on local and regional air quality including dust generation during construction, vehicle emissions, industrial emissions, and odour. Assessment against national air quality objectives and World Health Organisation guidelines." },
                    { topic: "Climate", icon: "thermometer", detail: "Two-fold assessment: (a) greenhouse gas emissions from the development (construction and operational carbon), and (b) the vulnerability of the development to climate change effects such as increased flooding, heatwaves, and drought." },
                    { topic: "Material Assets", icon: "package", detail: "Effects on infrastructure, transport networks, utilities, mineral resources, and waste management capacity. Includes assessment of resource consumption and the principles of circular economy." },
                    { topic: "Cultural Heritage", icon: "landmark", detail: "Effects on designated heritage assets (listed buildings, scheduled monuments, conservation areas, registered parks and gardens) and non-designated assets of archaeological or historic interest. Includes assessment of setting." },
                    { topic: "Landscape & Visual", icon: "mountain", detail: "Effects on landscape character, visual amenity, and designated landscapes (AONBs, National Parks). Assessment typically uses the Guidelines for Landscape and Visual Impact Assessment (GLVIA3) methodology." }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-emerald-400 mb-1">{item.topic}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Interactions Between Topics</p>
                </div>
                <p className="text-sm text-white/80">
                  The 2017 Regulations explicitly require assessment of the <strong>interaction between
                  the factors</strong> listed above. For example, air quality impacts may affect both
                  human health and biodiversity; water pollution may affect both ecology and drinking
                  water supply; and climate change may exacerbate flood risk, which in turn affects
                  population and material assets. A good ES considers these interactions rather than
                  treating each topic in isolation.
                </p>
              </div>

              <p>
                Not every topic will be significant for every project. The scoping stage determines which
                topics require detailed assessment. For example, a wind farm EIA might focus heavily on
                landscape, visual impact, biodiversity (birds and bats), noise, and cultural heritage,
                while a waste treatment facility might focus more on air quality, human health, water,
                and transport. Topics that are not significant can be &ldquo;scoped out&rdquo; with
                justification.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Mitigation & Enhancement */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">06</span>
            Mitigation &amp; Enhancement
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mitigation is at the heart of the EIA process. The purpose of identifying environmental
                effects is not merely to describe them but to <strong>avoid, reduce, remedy, or
                compensate</strong> for them. The EIA Regulations require the ES to describe the measures
                envisaged to prevent, reduce, and where possible offset any identified significant adverse
                effects.
              </p>

              <h3 className="text-base font-semibold text-white mt-6 mb-2">The Mitigation Hierarchy</h3>

              <p>
                The mitigation hierarchy is a universally recognised framework for managing environmental
                impacts. It establishes a clear order of preference, with avoidance at the top and
                compensation at the bottom.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Mitigation Hierarchy</p>
                <div className="space-y-3">
                  {[
                    { level: "1. Avoid", colour: "emerald", detail: "Prevent the impact from occurring in the first place through design changes, site selection, or phasing. This is the most effective form of mitigation. Example: relocating a building footprint to avoid ancient woodland." },
                    { level: "2. Reduce", colour: "emerald", detail: "Minimise the impact where avoidance is not possible. Example: installing acoustic barriers to reduce noise from a construction compound, or scheduling noisy works outside bird breeding season." },
                    { level: "3. Remedy", colour: "amber", detail: "Restore or rehabilitate the affected environment after the impact has occurred. Example: reinstating topsoil and replanting vegetation after pipeline installation, or restoring a watercourse after temporary diversion." },
                    { level: "4. Compensate", colour: "red", detail: "Offset residual impacts that cannot be avoided, reduced, or remedied. Compensation is always the last resort. Example: creating new habitat elsewhere to compensate for habitat lost at the development site (biodiversity offsetting)." }
                  ].map((item, i) => (
                    <div key={i} className={`bg-black/30 rounded-lg p-3 border-l-2 ${
                      item.colour === "emerald" ? "border-emerald-500/50" :
                      item.colour === "amber" ? "border-amber-500/50" :
                      "border-red-500/50"
                    }`}>
                      <p className={`text-xs font-bold mb-1 ${
                        item.colour === "emerald" ? "text-emerald-400" :
                        item.colour === "amber" ? "text-amber-400" :
                        "text-red-400"
                      }`}>{item.level}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-base font-semibold text-white mt-6 mb-2">Biodiversity Net Gain (BNG)</h3>

              <p>
                The <strong>Environment Act 2021</strong> introduced a mandatory requirement for most
                developments in England to deliver a minimum <strong>10% biodiversity net gain (BNG)</strong>.
                This requirement became mandatory for major developments from February 2024 and for minor
                developments from April 2024. BNG goes beyond the traditional mitigation hierarchy by
                requiring developments to leave biodiversity in a measurably better state than before.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Biodiversity Net Gain &mdash; Key Points</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                  {[
                    { point: "10% minimum", detail: "Developments must deliver at least a 10% increase in biodiversity value compared to the pre-development baseline, measured using the statutory biodiversity metric" },
                    { point: "30-year maintenance", detail: "Habitat created or enhanced for BNG must be maintained for a minimum of 30 years, secured through planning conditions or conservation covenants" },
                    { point: "Mitigation hierarchy first", detail: "BNG supplements the mitigation hierarchy — developers must still avoid and minimise impacts before using BNG to achieve the 10% uplift" },
                    { point: "On-site, off-site, or credits", detail: "BNG can be delivered on-site (preferred), off-site (through registered gain sites), or through purchasing statutory biodiversity credits from the government (last resort)" }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-emerald-400 mb-1">{item.point}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-base font-semibold text-white mt-6 mb-2">Mitigation Monitoring</h3>

              <p>
                The 2017 Regulations explicitly empower the LPA to require monitoring of significant adverse
                environmental effects as a condition of planning permission. Monitoring ensures that the
                mitigation measures described in the ES are actually implemented and are effective. Common
                monitoring requirements include ecological monitoring of translocated species, noise
                monitoring during construction, dust monitoring, water quality monitoring, and post-construction
                landscape and habitat management. Monitoring results may trigger additional mitigation if the
                original measures prove inadequate.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Enhancement vs Mitigation</p>
                </div>
                <p className="text-sm text-white/80">
                  Modern EIA practice increasingly emphasises <strong>enhancement</strong> alongside mitigation.
                  Enhancement means delivering positive environmental outcomes that go beyond simply reducing
                  harm &mdash; for example, creating new public green space, improving access to nature, installing
                  bird and bat boxes on buildings, incorporating green roofs and living walls, or enhancing the
                  ecological value of retained habitats. The National Planning Policy Framework (NPPF) encourages
                  developments to provide net gains for biodiversity and to take opportunities to improve local
                  environmental conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Construction Environmental Management Plans (CEMPs) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">07</span>
            Construction Environmental Management Plans (CEMPs)
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>Construction Environmental Management Plan (CEMP)</strong> is a practical document
                that translates the environmental mitigation commitments made in the Environmental Statement
                into enforceable, site-specific management measures for the construction phase of a
                development. It bridges the gap between the strategic commitments in the planning application
                and the day-to-day reality of managing environmental impacts on a live construction site.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">Key Definition &mdash; CEMP</p>
                <p className="text-sm text-white">
                  A CEMP is typically secured through a <strong>planning condition</strong> (a requirement
                  attached to the planning permission). The condition usually requires the CEMP to be
                  submitted to and approved by the LPA before construction begins. The principal contractor
                  is responsible for implementing the CEMP on site, but the developer remains ultimately
                  responsible for compliance with the planning condition.
                </p>
              </div>

              <h3 className="text-base font-semibold text-white mt-6 mb-2">Typical CEMP Content</h3>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">CEMP Structure &amp; Topics</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { topic: "Dust & Air Quality Management", detail: "Measures to control dust from demolition, earthworks, construction, and trackout. Includes wheel washing, damping down, covering stockpiles, and monitoring trigger levels." },
                    { topic: "Noise & Vibration Control", detail: "Construction noise limits, working hours restrictions (typically 07:00-19:00 Monday-Friday, 08:00-13:00 Saturday, no working Sundays/bank holidays), use of best practicable means (BPM), and vibration monitoring near sensitive receptors." },
                    { topic: "Water Pollution Prevention", detail: "Measures to prevent pollution of watercourses and groundwater including silt fencing, settlement ponds, bunded fuel storage, spill kits, and compliance with Environment Agency pollution prevention guidance (PPG/GPP)." },
                    { topic: "Ecological Protection", detail: "Protection of retained habitats and species during construction, including tree root protection areas (BS 5837), exclusion zones around badger setts, bat roost protection, nesting bird checks, and implementation of ecological mitigation licences." },
                    { topic: "Waste Management", detail: "Site Waste Management Plan principles: waste minimisation, segregation, reuse, recycling, and disposal hierarchy. Recording of waste types and quantities for duty of care compliance." },
                    { topic: "Traffic & Access Management", detail: "Construction traffic routes, delivery schedules, wheel washing, temporary road closures, banksman requirements, and measures to minimise disruption to local residents and road users." },
                    { topic: "Contaminated Land & Soils", detail: "Procedures for handling contaminated soils, unexpected contamination protocols, soil storage and reinstatement methods, and compliance with remediation strategy requirements." },
                    { topic: "Community Liaison", detail: "Communication strategy for informing local residents about construction activities, complaint procedures, site contact details, and advance notification of particularly disruptive works." }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-emerald-400 mb-1">{item.topic}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-base font-semibold text-white mt-6 mb-2">Implementation &amp; Enforcement</h3>

              <p>
                The CEMP is a living document that may be updated as construction progresses and conditions
                change. The principal contractor is responsible for ensuring that all site workers, including
                subcontractors such as electrical contractors, understand and comply with the CEMP requirements.
                This is typically achieved through site induction, toolbox talks, and environmental awareness
                briefings.
              </p>

              <p>
                The LPA has enforcement powers if the CEMP is not followed. Breach of a planning condition
                is a criminal offence under the Town and Country Planning Act 1990. In practice, the
                Environment Agency may also take enforcement action if construction activities cause or risk
                causing pollution to controlled waters, and Natural England may take action if protected
                species or habitats are harmed in breach of ecological mitigation commitments.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Relevance to Electrical Contractors</p>
                </div>
                <p className="text-sm text-white/80">
                  As an electrical contractor working on a construction site, you are required to comply with
                  the CEMP. This means following the specified working hours, dust and noise controls, waste
                  segregation requirements, and ecological exclusion zones. If you are laying cables through
                  areas identified as ecologically sensitive, or working near watercourses, you must follow
                  the CEMP procedures. Non-compliance can result in enforcement action against the developer,
                  which in turn may affect your contractual position. Always request a copy of the CEMP
                  during site induction and ask about any environmental constraints relevant to your scope
                  of work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Strategic Environmental Assessment (SEA) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">08</span>
            Strategic Environmental Assessment (SEA)
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While EIA assesses the environmental effects of individual development projects, <strong>Strategic
                Environmental Assessment (SEA)</strong> operates at a higher level, assessing the environmental
                effects of plans and programmes before they are adopted. SEA ensures that environmental
                considerations are integrated into strategic decision-making, influencing the policies and
                frameworks within which individual projects are later consented.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">Key Definition &mdash; Strategic Environmental Assessment</p>
                <p className="text-sm text-white">
                  SEA in the UK is governed by the <strong>Environmental Assessment of Plans and Programmes
                  Regulations 2004</strong>, which transposed EU Directive 2001/42/EC (the SEA Directive)
                  into UK law. The Regulations require an environmental assessment of plans and programmes
                  that are likely to have significant environmental effects and that are prepared for
                  agriculture, forestry, fisheries, energy, industry, transport, waste management, water
                  management, telecommunications, tourism, town and country planning, or land use.
                </p>
              </div>

              <h3 className="text-base font-semibold text-white mt-6 mb-2">EIA vs SEA &mdash; Key Differences</h3>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-emerald-500/10 rounded p-2 font-semibold text-emerald-400">Aspect</div>
                    <div className="bg-emerald-500/10 rounded p-2 font-semibold text-emerald-400">EIA</div>
                    <div className="bg-emerald-500/10 rounded p-2 font-semibold text-emerald-400">SEA</div>
                  </div>
                  {[
                    { aspect: "Subject", eia: "Individual development projects (e.g. a wind farm, housing estate, or road)", sea: "Plans and programmes (e.g. local plans, transport strategies, energy policies)" },
                    { aspect: "Legislation", eia: "Town and Country Planning (EIA) Regulations 2017", sea: "Environmental Assessment of Plans and Programmes Regulations 2004" },
                    { aspect: "EU origin", eia: "Directive 85/337/EEC (as amended)", sea: "Directive 2001/42/EC (SEA Directive)" },
                    { aspect: "Output", eia: "Environmental Statement (ES)", sea: "Environmental Report" },
                    { aspect: "Scale", eia: "Site-specific, detailed assessment of a single project", sea: "Strategic, broad assessment across a region or sector" },
                    { aspect: "Timing", eia: "Submitted with the planning application for the project", sea: "Prepared during plan-making, before the plan is adopted" },
                    { aspect: "Decision-maker", eia: "Local planning authority (or Secretary of State for NSIPs)", sea: "Plan-making authority (e.g. local council, government department)" },
                    { aspect: "Alternatives", eia: "Reasonable alternatives to the proposed project", sea: "Reasonable alternatives to the proposed plan or strategy" }
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-black/30 rounded p-2 font-medium text-white/90">{row.aspect}</div>
                      <div className="bg-black/30 rounded p-2 text-white/70">{row.eia}</div>
                      <div className="bg-black/30 rounded p-2 text-white/70">{row.sea}</div>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-base font-semibold text-white mt-6 mb-2">When Is SEA Required?</h3>

              <p>
                SEA is required for plans and programmes that are:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="space-y-2">
                  {[
                    "Required by legislative, regulatory, or administrative provisions (i.e. they are not voluntary)",
                    "Prepared for one of the specified sectors (agriculture, energy, industry, transport, waste, water, telecoms, tourism, planning, or land use)",
                    "Likely to have significant environmental effects, OR they set the framework for future development consent of projects listed in the EIA Regulations"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                Common examples of plans requiring SEA include local development plans (Local Plans), waste
                management plans, minerals plans, transport strategies, and flood risk management plans. The
                plan-making authority must carry out a screening assessment to determine whether SEA is
                required. Statutory consultees (Natural England, the Environment Agency, and Historic
                England) must be consulted on the screening decision.
              </p>

              <h3 className="text-base font-semibold text-white mt-6 mb-2">The SEA Process</h3>

              <p>
                The SEA process mirrors the EIA process at a strategic level. It involves screening
                (determining whether SEA is required), scoping (consulting statutory bodies on the content
                of the Environmental Report), preparing the Environmental Report, public consultation on
                the Report alongside the draft plan, and monitoring significant environmental effects
                after the plan is adopted. The Environmental Report assesses the likely significant effects
                of implementing the plan, considers reasonable alternatives, and proposes mitigation measures.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Relationship Between SEA and EIA</p>
                </div>
                <p className="text-sm text-white/80">
                  SEA and EIA are complementary processes. SEA assesses the environmental effects of the
                  strategic framework (the plan or programme), while EIA assesses the environmental effects
                  of individual projects that come forward under that framework. A robust SEA at the plan
                  stage can reduce the scope of EIA at the project stage by establishing strategic
                  environmental priorities, identifying areas of constraint and opportunity, and resolving
                  certain environmental issues at the strategic level. However, SEA does <strong>not</strong> replace
                  the need for EIA &mdash; individual projects within a plan area must still undergo their
                  own EIA where required by the EIA Regulations.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Practical Example</p>
                <p className="text-xs text-white/70">
                  A local council is preparing its Local Plan, which allocates 5,000 new homes across
                  10 sites. The Local Plan must undergo SEA to assess the strategic environmental effects
                  of this growth strategy &mdash; including the cumulative effects of allocating development
                  in particular locations. When individual housing developers bring forward planning
                  applications for each allocated site, the larger sites may require project-level EIA
                  to assess site-specific effects such as ecology, flooding, noise, and traffic. The
                  SEA informs the plan; the EIA informs the individual planning decision.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 3 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-1-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-1-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
