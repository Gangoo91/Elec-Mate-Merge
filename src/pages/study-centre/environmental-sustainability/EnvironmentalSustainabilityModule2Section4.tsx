import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Recycle,
  BarChart3,
  ClipboardList,
  Users,
  TrendingDown,
  Leaf,
  LinkIcon,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "swmp-regs-2008-status",
    question:
      "What is the current legal status of the Site Waste Management Plans Regulations 2008?",
    options: [
      "They remain fully mandatory for all construction projects over £300,000",
      "They were revoked in 2013 but SWMPs remain best practice and are often required by BREEAM, CEEQUAL, and clients",
      "They were replaced by the Environment Act 2021 which mandates SWMPs for all projects",
      "They only apply in Scotland and Wales; England has no SWMP requirement",
    ],
    correctIndex: 1,
    explanation:
      "The Site Waste Management Plans Regulations 2008 were revoked in December 2013 as part of the Red Tape Challenge. However, SWMPs remain widely recognised as best practice for construction waste management. They are frequently required as prerequisites for BREEAM and CEEQUAL assessments, demanded by clients in contract conditions, and specified as planning conditions by local authorities. The construction industry continues to use SWMPs voluntarily because they deliver genuine cost savings, improve resource efficiency, and demonstrate environmental responsibility.",
  },
  {
    id: "waste-forecasting-purpose",
    question:
      "What is the primary purpose of waste forecasting within a SWMP?",
    options: [
      "To calculate the exact cost of skip hire for the entire project duration",
      "To estimate waste types and quantities by trade or element so that appropriate management actions can be planned in advance",
      "To determine the number of operatives needed on site each week",
      "To satisfy the Environment Agency's annual waste reporting requirement",
    ],
    correctIndex: 1,
    explanation:
      "Waste forecasting is the process of estimating the types and quantities of waste that will be generated during construction, broken down by trade, work package, or building element. This enables the project team to plan appropriate waste management actions in advance — including segregation arrangements, skip and container provision, recycling and recovery routes, and disposal destinations. Accurate forecasting also supports designing out waste at the planning stage, setting realistic diversion targets, and benchmarking performance against WRAP data. Without forecasting, waste management becomes reactive rather than proactive.",
  },
  {
    id: "wrap-role-construction",
    question:
      "What was WRAP's 'Halving Waste to Landfill' commitment, and what was its significance?",
    options: [
      "A legally binding regulation requiring all construction companies to halve their landfill waste by 2020",
      "A voluntary industry commitment supported by WRAP to halve the amount of construction waste sent to landfill by 2012, compared to 2008 levels",
      "A European Union directive mandating 50% recycling of all construction and demolition waste",
      "A government tax incentive scheme offering rebates to contractors who reduced landfill waste by 50%",
    ],
    correctIndex: 1,
    explanation:
      "The 'Halving Waste to Landfill' commitment was a voluntary industry initiative supported by WRAP (the Waste and Resources Action Programme). It aimed to reduce the amount of construction, demolition, and excavation waste sent to landfill by 50% by 2012, compared to 2008 levels. The commitment was signed by major contractors, clients, and industry bodies. It was significant because it demonstrated that voluntary action, supported by benchmarking data, practical tools, and case studies, could achieve substantial reductions in landfill waste. WRAP provided the resources, guidance, and monitoring framework that enabled the industry to track progress and share best practice.",
  },
];

const faqs = [
  {
    question:
      "Are SWMPs legally required in England?",
    answer:
      "No. Since the revocation of the SWMP Regulations 2008 in December 2013, there is no standalone legal requirement to produce a SWMP in England. However, SWMPs may be effectively required through other routes: BREEAM and CEEQUAL assessments typically require a SWMP as a prerequisite for waste management credits; many clients and principal contractors include SWMP requirements in their contract conditions; local planning authorities may impose conditions requiring waste management plans; and the Considerate Constructors Scheme (CCS) expects sites to demonstrate responsible waste management. In practice, most professionally managed construction projects in the UK still produce a SWMP or equivalent waste management plan because it is recognised as best practice and delivers genuine financial and environmental benefits.",
  },
  {
    question:
      "What is the difference between a SWMP and a Construction Environmental Management Plan (CEMP)?",
    answer:
      "A SWMP focuses specifically on waste management — forecasting waste types and quantities, identifying waste management actions (reuse, recycling, recovery, disposal), assigning responsibilities, and tracking actual performance against forecasts. A CEMP is a broader document that covers all environmental aspects of the construction project, including dust and air quality, noise and vibration, water pollution prevention, ecology and biodiversity, contaminated land, energy use, and waste management. The SWMP is often incorporated as a section or appendix within the wider CEMP. The two documents are complementary: the CEMP provides the overarching environmental management framework, while the SWMP provides the detailed waste-specific planning and tracking. Both should be live documents that are updated as the project progresses.",
  },
  {
    question:
      "How do WRAP benchmarks help with waste forecasting?",
    answer:
      "WRAP (the Waste and Resources Action Programme) published benchmark data for construction waste generation rates, typically expressed as tonnes of waste per £100,000 of project value or per 100 m² of floor area, broken down by building type (residential, commercial, education, healthcare, etc.) and waste stream (timber, plasterboard, packaging, concrete, metals, etc.). These benchmarks allow project teams to estimate expected waste quantities before construction begins, even when detailed design information is not yet available. They also provide a baseline against which actual performance can be compared — enabling teams to identify whether they are performing better or worse than the industry average and to set realistic improvement targets. WRAP benchmarks have been widely adopted across the UK construction industry and are referenced in BREEAM, CEEQUAL, and many client sustainability strategies.",
  },
  {
    question:
      "What role does a waste champion play on a construction site?",
    answer:
      "A waste champion is a designated individual on the construction site who takes lead responsibility for implementing the SWMP and promoting good waste management practices. Their role typically includes: ensuring waste segregation areas are properly set up, labelled, and maintained; delivering toolbox talks on waste management to site operatives and subcontractors; monitoring skip and container contents to prevent contamination of recyclable waste streams; collecting waste transfer notes and maintaining the waste management records; tracking actual waste quantities against the SWMP forecast and reporting variances; liaising with waste carriers and recycling facilities; conducting waste audits to identify improvement opportunities; and championing behavioural change across the site team. The waste champion does not need to be a full-time role — on smaller projects it is often combined with the site manager or environmental adviser role — but having a named individual with clear accountability is essential for effective waste management.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "The SWMP Regulations 2008 required a site waste management plan for all construction projects in England with an estimated cost exceeding which threshold?",
    options: [
      "£100,000",
      "£200,000",
      "£300,000",
      "£500,000",
    ],
    correctAnswer: 2,
    explanation:
      "Under the SWMP Regulations 2008, a site waste management plan was required for all construction projects in England with an estimated cost exceeding £300,000. Projects exceeding £500,000 had additional requirements including more detailed waste forecasting and the recording of actual waste data. The regulations were revoked in 2013, but these thresholds helped establish the principle that larger projects should have formal waste management planning — a principle that continues through voluntary best practice, client requirements, and assessment schemes.",
  },
  {
    id: 2,
    question:
      "Which of the following is NOT typically included in a SWMP?",
    options: [
      "Project details (client, contractor, site address, project description)",
      "Waste forecasting by type and estimated quantity",
      "Details of the structural engineer's design calculations",
      "Waste management actions aligned to the waste hierarchy",
    ],
    correctAnswer: 2,
    explanation:
      "A SWMP typically includes project details, waste forecasting (types and quantities), waste management actions (how each waste stream will be managed in accordance with the waste hierarchy), responsible persons, waste carrier and destination details, and a record of actual waste arisings. Structural engineering design calculations are not part of a SWMP — they belong in the structural design package. However, the SWMP may reference design decisions that reduce waste (such as standardised dimensions or off-site manufacture), which is an example of designing out waste at the planning stage.",
  },
  {
    id: 3,
    question:
      "WRAP benchmarks for construction waste are typically expressed as:",
    options: [
      "Cost per tonne of waste produced",
      "Number of skips per week of construction activity",
      "Tonnes of waste per £100,000 of project value or per 100 m² of floor area",
      "Percentage of materials purchased that become waste",
    ],
    correctAnswer: 2,
    explanation:
      "WRAP benchmarks are typically expressed as tonnes of waste per £100,000 of project value or per 100 m² of floor area, broken down by building type and waste stream. This standardised format allows meaningful comparison between projects of different sizes and types. For example, a new-build residential project might benchmark at around 10-15 tonnes of waste per £100,000 of project value, while a refurbishment project might be significantly higher due to strip-out waste. These benchmarks enable project teams to set targets, forecast waste quantities, and measure performance against industry norms.",
  },
  {
    id: 4,
    question:
      "When implementing a SWMP on site, which of the following is the MOST effective way to ensure subcontractors comply with waste segregation requirements?",
    options: [
      "Including a penalty clause in the subcontract for non-compliance",
      "A combination of clear signage, induction training, toolbox talks, regular monitoring, and a named waste champion",
      "Relying on the waste carrier to sort mixed waste at the transfer station",
      "Issuing a written memo to all subcontractors at project commencement",
    ],
    correctAnswer: 1,
    explanation:
      "Effective waste segregation on construction sites requires a multi-faceted approach: clear and consistent signage at every waste container and skip; waste management content in the site induction for all operatives; regular toolbox talks reinforcing correct segregation practices; a named waste champion who monitors compliance and addresses issues promptly; and regular audits of skip and container contents. While contractual obligations and financial incentives have a role, behavioural change is best achieved through visible leadership, clear communication, practical arrangements, and consistent enforcement. Relying on downstream sorting at a transfer station is less effective and more costly than source segregation on site.",
  },
  {
    id: 5,
    question:
      "How can Building Information Modelling (BIM) support waste management on construction projects?",
    options: [
      "BIM automatically disposes of waste through robotic systems",
      "BIM enables accurate material quantification, off-site manufacture coordination, and clash detection — all of which help reduce waste generation",
      "BIM replaces the need for a SWMP entirely",
      "BIM is only useful for demolition waste, not new-build waste",
    ],
    correctAnswer: 1,
    explanation:
      "BIM supports waste management in several important ways. Accurate material quantification from the model reduces over-ordering, which is a major source of construction waste. Coordination between disciplines through clash detection reduces abortive work and rework. BIM facilitates the use of standardised components and off-site manufacture (such as pre-fabricated elements and modular construction), which generates significantly less waste than traditional site-based construction. Design optimisation within BIM can identify opportunities to use standard material sizes, reducing cutting waste. While BIM does not replace a SWMP, it provides much better data to inform waste forecasting and supports the principle of designing out waste at the earliest project stage.",
  },
  {
    id: 6,
    question:
      "What is the primary purpose of monitoring actual waste data against SWMP forecasts during a construction project?",
    options: [
      "To calculate the exact landfill tax liability for the project",
      "To identify variances, take corrective action where waste is exceeding forecasts, and continuously improve waste management performance",
      "To satisfy the requirements of the Waste Electrical and Electronic Equipment (WEEE) Regulations",
      "To determine the structural integrity of the completed building",
    ],
    correctAnswer: 1,
    explanation:
      "Monitoring actual waste data against SWMP forecasts serves several critical purposes: it identifies variances early so that corrective action can be taken (for example, if timber waste is significantly exceeding the forecast, the team can investigate the cause — over-ordering, poor storage, design changes — and address it); it enables the project to track progress towards waste diversion targets; it provides evidence for BREEAM and CEEQUAL assessments; it generates data for benchmarking against WRAP norms and for informing future project forecasts; and it demonstrates to clients, regulators, and the public that waste is being managed responsibly. Without monitoring, the SWMP is simply a paper exercise with no mechanism for improvement.",
  },
  {
    id: 7,
    question:
      "WRAP's 'Halving Waste to Landfill' commitment aimed to reduce construction waste sent to landfill by 50% by which year?",
    options: [
      "2010",
      "2012",
      "2015",
      "2020",
    ],
    correctAnswer: 1,
    explanation:
      "WRAP's 'Halving Waste to Landfill' was a voluntary commitment by the UK construction industry to reduce the amount of construction, demolition, and excavation waste sent to landfill by 50% by 2012, compared to a 2008 baseline. The commitment was signed by major contractors, clients, developers, and industry bodies. WRAP provided tools, guidance, benchmarks, and case studies to support the industry in achieving this target. The initiative was widely regarded as successful in driving significant reductions in landfill waste and in raising awareness of resource efficiency across the construction sector.",
  },
  {
    id: 8,
    question:
      "How should a SWMP integrate with a Construction Environmental Management Plan (CEMP)?",
    options: [
      "The SWMP and CEMP are entirely separate documents with no connection",
      "The SWMP should replace the CEMP as it covers all environmental aspects",
      "The SWMP is typically incorporated as a dedicated section or appendix within the CEMP, with cross-references to other environmental controls",
      "The CEMP should be attached as an appendix to the SWMP",
    ],
    correctAnswer: 2,
    explanation:
      "The SWMP is typically incorporated as a dedicated section or appendix within the wider CEMP, with cross-references to related environmental controls. For example, the CEMP may contain sections on dust management (which links to waste handling and skip management), water pollution prevention (which links to the storage and disposal of liquid wastes), and contaminated land (which links to the management of hazardous waste). The SWMP provides the detailed waste-specific planning, while the CEMP provides the overarching environmental management framework. Both documents should be aligned with the project's health and safety plan (particularly for hazardous waste handling) and with contractor obligations under the project contract.",
  },
];

export default function EnvironmentalSustainabilityModule2Section4() {
  useSEO({
    title:
      "Site Waste Management Plans | Environmental & Sustainability Module 2.4",
    description:
      "Site Waste Management Plans (SWMPs) — purpose, content, waste forecasting, implementation, monitoring, WRAP benchmarks, and integration with CEMPs for construction professionals.",
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
            <Link to="../environmental-sustainability-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <FileText className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-500 text-xs font-semibold">
              MODULE 2 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Site Waste Management Plans
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Planning, forecasting, implementing, and monitoring construction
            waste &mdash; from SWMP content and WRAP benchmarks to integration
            with CEMPs and contractor obligations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>SWMP:</strong> A plan that forecasts, manages, and
                records construction waste
              </li>
              <li>
                <strong>Status:</strong> No longer mandatory (revoked 2013)
                but still best practice
              </li>
              <li>
                <strong>Content:</strong> Project details, waste forecasts,
                management actions, tracking
              </li>
              <li>
                <strong>WRAP:</strong> Industry benchmarks and resource
                efficiency tools
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">
              For Electricians
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Cable waste:</strong> Off-cuts, damaged lengths, and
                packaging are your main waste streams
              </li>
              <li>
                <strong>Segregation:</strong> Separate copper, PVC, WEEE, and
                packaging at source
              </li>
              <li>
                <strong>Toolbox talks:</strong> Attend waste management
                briefings and follow site rules
              </li>
              <li>
                <strong>BREEAM:</strong> Your waste data contributes to the
                project&rsquo;s assessment score
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose and history of SWMPs, including the revocation of the 2008 Regulations",
              "Identify when a SWMP should be used despite no longer being legally mandatory",
              "Describe the key contents of a SWMP including waste forecasting and management actions",
              "Explain how WRAP benchmarks and BIM support waste forecasting and designing out waste",
              "Outline the roles and responsibilities for implementing a SWMP on site",
              "Describe monitoring, reporting, and corrective action processes for waste management",
              "Explain WRAP's role and the Halving Waste to Landfill commitment",
              "Describe how a SWMP integrates with CEMPs, quality management, and health and safety plans",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is a SWMP? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">01</span>
            What Is a SWMP?
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>Site Waste Management Plan (SWMP)</strong> is a
                structured document that describes how construction waste will
                be managed throughout the lifecycle of a project &mdash; from
                planning and forecasting through to on-site implementation,
                monitoring, and close-out. Its fundamental purpose is to ensure
                that waste is{" "}
                <strong>
                  minimised, properly segregated, and diverted from landfill
                </strong>{" "}
                wherever practicable, in accordance with the waste hierarchy
                (prevention, reuse, recycling, recovery, disposal).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Historical Context
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[56px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      2008
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        SWMP Regulations 2008
                      </p>
                      <p>
                        The Site Waste Management Plans Regulations 2008 made
                        SWMPs a{" "}
                        <strong className="text-white">legal requirement</strong>{" "}
                        in England for all construction projects with an
                        estimated cost exceeding £300,000. Projects over
                        £500,000 had additional requirements including detailed
                        waste recording. The regulations applied to all
                        construction, demolition, and civil engineering work.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[56px] h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">
                      2013
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Revocation
                      </p>
                      <p>
                        The SWMP Regulations were{" "}
                        <strong className="text-white">
                          revoked in December 2013
                        </strong>{" "}
                        as part of the Government&rsquo;s Red Tape Challenge,
                        which aimed to reduce regulatory burden on businesses.
                        The rationale was that the Duty of Care (under the
                        Environmental Protection Act 1990) and landfill tax
                        already provided sufficient incentives for responsible
                        waste management.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[56px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      Today
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Best Practice
                      </p>
                      <p>
                        Despite revocation, SWMPs remain{" "}
                        <strong className="text-white">
                          widely recognised as best practice
                        </strong>{" "}
                        across the UK construction industry. They are frequently
                        required by BREEAM and CEEQUAL assessments, client
                        sustainability strategies, planning conditions, and the
                        Considerate Constructors Scheme. Most major contractors
                        and public sector clients continue to mandate SWMPs as
                        standard practice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Recycle className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">
                    Key Principle
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    A SWMP is not just a compliance document &mdash; it is a
                    practical management tool.
                  </strong>{" "}
                  When used properly, a SWMP drives real cost savings through
                  reduced waste disposal charges, recovered material value,
                  lower landfill tax exposure, and reduced material
                  over-ordering. It also demonstrates environmental
                  responsibility to clients, regulators, and the public.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: When to Use a SWMP */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">02</span>
            When to Use a SWMP
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Although SWMPs are no longer a standalone legal requirement in
                England, there are{" "}
                <strong>
                  numerous situations where a SWMP is required or expected
                </strong>{" "}
                as a condition of contract, assessment, or planning. In
                practice, best practice guidance recommends producing a SWMP
                for all construction projects, regardless of size or value.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  When a SWMP Is Typically Required or Expected
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        BREEAM assessments:
                      </strong>{" "}
                      The BREEAM Wst 01 (Construction waste management) credit
                      requires a SWMP or equivalent waste management plan as a
                      prerequisite. Without a compliant SWMP, the project
                      cannot achieve waste management credits, which may
                      jeopardise the target BREEAM rating.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        CEEQUAL assessments:
                      </strong>{" "}
                      CEEQUAL (the sustainability assessment for civil
                      engineering and infrastructure) similarly requires
                      evidence of structured waste management planning for
                      waste and resource efficiency credits.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Client requirements:
                      </strong>{" "}
                      Most public sector clients (central government, local
                      authorities, NHS trusts, universities) and many private
                      sector clients include SWMP requirements in their
                      employer&rsquo;s requirements or contract conditions.
                      Government Construction Strategy targets and net zero
                      carbon commitments reinforce this expectation.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Planning conditions:
                      </strong>{" "}
                      Local planning authorities may impose conditions requiring
                      the submission and approval of a waste management plan
                      before construction commences, particularly for larger
                      developments or environmentally sensitive sites.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Considerate Constructors Scheme (CCS):
                      </strong>{" "}
                      The CCS monitors expect registered sites to demonstrate
                      responsible waste management, including evidence of waste
                      reduction targets, segregation, and diversion from
                      landfill. A SWMP provides this evidence.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Best practice for all projects:
                      </strong>{" "}
                      Even where none of the above apply, a SWMP is recommended
                      for all projects because it provides a structured
                      framework for managing waste cost-effectively, complying
                      with the Duty of Care, and demonstrating environmental
                      responsibility. The cost of producing a SWMP is minimal
                      compared to the potential savings.
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">
                    Practical Tip:
                  </strong>{" "}
                  Start the SWMP at the earliest project stage &mdash;
                  ideally during design development &mdash; so that waste
                  prevention measures (designing out waste) can be incorporated
                  before construction begins. A SWMP written after construction
                  starts is reactive rather than proactive and misses the
                  greatest opportunities for waste reduction.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: SWMP Content */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">03</span>
            SWMP Content
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A comprehensive SWMP should contain the following key elements,
                which together provide a complete picture of how waste will be
                managed throughout the project lifecycle.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Essential SWMP Content
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Project Details
                      </p>
                      <p>
                        Client name, principal contractor, site address, project
                        description, estimated cost, programme dates, and SWMP
                        author. This provides the administrative context for
                        the plan and enables traceability.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Waste Forecasting
                      </p>
                      <p>
                        Estimated types and quantities of waste expected to be
                        generated, broken down by trade, work package, or
                        building element. This should include European Waste
                        Catalogue (EWC) codes where practicable and distinguish
                        between hazardous and non-hazardous waste.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Waste Management Actions
                      </p>
                      <p>
                        For each waste stream, how it will be managed in
                        accordance with the waste hierarchy &mdash; prevention
                        measures, reuse opportunities, recycling routes,
                        recovery options, and (as a last resort) disposal
                        arrangements. This is the core of the SWMP.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Responsible Persons
                      </p>
                      <p>
                        Named individuals responsible for waste management on
                        site &mdash; including the waste champion, site
                        manager, environmental adviser, and any trade-specific
                        responsibilities. Clear accountability is essential.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Waste Carriers &amp; Destinations
                      </p>
                      <p>
                        Details of registered waste carriers, transfer stations,
                        recycling facilities, and disposal sites that will be
                        used. All waste carriers must hold a valid Environment
                        Agency registration. Waste transfer notes and
                        consignment notes must be obtained and retained.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      6
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Actual Waste Records
                      </p>
                      <p>
                        As the project progresses, actual waste arisings should
                        be recorded alongside the forecasts &mdash; enabling
                        comparison, variance analysis, and corrective action.
                        This turns the SWMP into a live management tool rather
                        than a static document.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The level of detail in a SWMP should be{" "}
                <strong>proportionate to the scale and complexity</strong> of
                the project. A small refurbishment may need only a simple
                one-page plan, while a major new-build development will require
                a comprehensive document with detailed forecasts for every
                trade package.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Waste Forecasting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">04</span>
            Waste Forecasting
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Waste forecasting is the process of{" "}
                <strong>
                  estimating the types and quantities of waste that will be
                  generated during construction
                </strong>
                , before work begins on site. Accurate forecasting is the
                foundation of effective waste management &mdash; it enables the
                project team to plan segregation arrangements, procure
                appropriate containers, negotiate waste management contracts,
                and set realistic diversion targets.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Forecasting Methods
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        WRAP benchmarks:
                      </strong>{" "}
                      WRAP published industry benchmark data for waste
                      generation rates by building type, expressed as tonnes per
                      £100,000 of project value or per 100 m&sup2; of floor
                      area. These benchmarks allow quick high-level estimates
                      even before detailed design is complete.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Trade-by-trade estimation:
                      </strong>{" "}
                      As design develops, waste can be estimated by trade or
                      work package &mdash; for example, brickwork, carpentry,
                      drylining, mechanical and electrical, plastering,
                      painting, and finishes. Each trade generates
                      characteristic waste streams (timber off-cuts, plasterboard
                      off-cuts, cable waste, packaging, fixings containers).
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        BIM-based quantification:
                      </strong>{" "}
                      Building Information Modelling (BIM) enables accurate
                      material take-offs from the digital model. By comparing
                      the materials needed with the materials ordered
                      (including allowances for cutting, waste, and
                      contingency), the project team can estimate waste
                      quantities with greater precision than benchmark-only
                      approaches.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Historical project data:
                      </strong>{" "}
                      Contractors with mature waste management systems use
                      data from previous similar projects to calibrate
                      forecasts. This is often the most accurate method
                      because it reflects the contractor&rsquo;s actual
                      practices, supply chain, and site management standards.
                    </span>
                  </div>
                </div>
              </div>

              {/* Waste Forecasting Example Table */}
              <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-transparent border border-emerald-500/30 rounded-xl p-5 sm:p-6">
                <p className="text-sm font-medium text-white mb-1 text-center">
                  Waste Forecasting Example Table
                </p>
                <p className="text-xs text-white/50 mb-4 text-center">
                  Typical waste streams for a new-build commercial project
                </p>
                <div className="overflow-x-auto -mx-2">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="py-2 px-2 text-emerald-400 font-semibold text-xs uppercase tracking-wide">
                          Waste Stream
                        </th>
                        <th className="py-2 px-2 text-emerald-400 font-semibold text-xs uppercase tracking-wide">
                          EWC Code
                        </th>
                        <th className="py-2 px-2 text-emerald-400 font-semibold text-xs uppercase tracking-wide">
                          Est. Tonnes
                        </th>
                        <th className="py-2 px-2 text-emerald-400 font-semibold text-xs uppercase tracking-wide">
                          Management Route
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-white/80">
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-2 text-white font-medium">Timber</td>
                        <td className="py-2 px-2">17 02 01</td>
                        <td className="py-2 px-2">12.5</td>
                        <td className="py-2 px-2">Reuse / recycling (biomass)</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-2 text-white font-medium">Plasterboard</td>
                        <td className="py-2 px-2">17 08 02</td>
                        <td className="py-2 px-2">8.0</td>
                        <td className="py-2 px-2">Closed-loop recycling</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-2 text-white font-medium">Concrete / rubble</td>
                        <td className="py-2 px-2">17 01 01</td>
                        <td className="py-2 px-2">25.0</td>
                        <td className="py-2 px-2">Crush &amp; reuse as aggregate</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-2 text-white font-medium">Metals (inc. cable)</td>
                        <td className="py-2 px-2">17 04 07</td>
                        <td className="py-2 px-2">4.5</td>
                        <td className="py-2 px-2">Recycling (scrap merchant)</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-2 text-white font-medium">Packaging</td>
                        <td className="py-2 px-2">15 01 06</td>
                        <td className="py-2 px-2">6.0</td>
                        <td className="py-2 px-2">Recycling / take-back</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-2 text-white font-medium">Mixed inert</td>
                        <td className="py-2 px-2">17 09 04</td>
                        <td className="py-2 px-2">10.0</td>
                        <td className="py-2 px-2">MRF sorting / recovery</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 text-white font-medium">WEEE</td>
                        <td className="py-2 px-2">20 01 36</td>
                        <td className="py-2 px-2">0.5</td>
                        <td className="py-2 px-2">WEEE compliance scheme</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-white/40 text-center mt-4">
                  EWC = European Waste Catalogue. MRF = Materials Recovery
                  Facility. Figures are illustrative.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">
                    Designing Out Waste
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The greatest waste reduction opportunities exist at the{" "}
                  <strong className="text-white">design stage</strong>, before
                  construction begins. Strategies include: using standard
                  material sizes to minimise cutting waste; specifying off-site
                  manufacture and modular construction; designing for
                  deconstruction and material recovery at end of life;
                  avoiding over-specification; and coordinating between design
                  disciplines to prevent abortive work and rework. BIM is a
                  powerful tool for identifying these opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Implementing the SWMP */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">05</span>
            Implementing the SWMP
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A SWMP is only effective if it is{" "}
                <strong>actively implemented on site</strong>. This requires
                clear roles and responsibilities, effective communication, and
                practical arrangements that make it easy for operatives to
                manage waste correctly.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Roles and Responsibilities
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      <Users className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Site Manager / Project Manager
                      </p>
                      <p>
                        Overall responsibility for ensuring the SWMP is
                        implemented. Allocates resources, sets expectations, and
                        ensures waste management is included in project reviews
                        and progress meetings.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      <Users className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Waste Champion
                      </p>
                      <p>
                        A designated individual with day-to-day responsibility
                        for waste management. Monitors segregation, delivers
                        toolbox talks, collects waste data, liaises with waste
                        carriers, and identifies improvement opportunities.
                        The waste champion is the &ldquo;go-to&rdquo; person for
                        all waste-related queries on site.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      <Users className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Subcontractors &amp; Operatives
                      </p>
                      <p>
                        All site personnel are responsible for following waste
                        segregation rules, using designated containers, keeping
                        work areas tidy, and reporting any waste management
                        issues. Waste management expectations should be clearly
                        communicated through inductions and toolbox talks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Practical Implementation Measures
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Site induction:
                      </strong>{" "}
                      Include waste management expectations in the site
                      induction for all personnel &mdash; segregation rules,
                      container locations, prohibited items, and reporting
                      procedures. Every person on site should understand the
                      waste management arrangements.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Toolbox talks:
                      </strong>{" "}
                      Deliver regular toolbox talks on waste management topics
                      &mdash; the waste hierarchy, segregation, hazardous waste
                      handling, packaging reduction, and skip management. Short,
                      practical, and trade-specific talks are most effective.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Signage:
                      </strong>{" "}
                      Clear, consistent, and photographic signage on every skip
                      and waste container showing what waste types are accepted
                      and what is prohibited. Colour-coded signage aligned with
                      national waste stream colours improves compliance.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Skip management:
                      </strong>{" "}
                      Locate skips and containers as close to the work areas as
                      practicable. Provide segregated skips for the main waste
                      streams (timber, plasterboard, metals, inert, general).
                      Ensure skips are not overfilled, are collected promptly
                      when full, and are covered or enclosed where necessary
                      to prevent wind-blown litter or rainwater ingress.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Material storage:
                      </strong>{" "}
                      Proper material storage reduces waste from weather
                      damage, contamination, and accidental breakage. Store
                      materials off the ground, undercover where possible, and
                      in a logical sequence that matches the construction
                      programme.
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">
                    Common Implementation Failures
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The most common reasons SWMPs fail to deliver results include:
                  the plan is written but never communicated to site teams;
                  segregation containers are provided but not maintained or
                  labelled; there is no named waste champion with clear
                  accountability; waste data is not collected or reviewed; and
                  subcontractors are not held to contractual waste management
                  obligations. A SWMP must be a{" "}
                  <strong className="text-white">living document</strong>, not
                  a shelf document.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Monitoring & Reporting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">06</span>
            Monitoring &amp; Reporting
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Monitoring waste data against SWMP forecasts is essential for{" "}
                <strong>
                  identifying variances, taking corrective action, and
                  continuously improving
                </strong>{" "}
                waste management performance. Without monitoring, the SWMP is
                a planning exercise with no feedback loop.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Monitoring Activities
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      <BarChart3 className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Tracking Actual vs Forecast
                      </p>
                      <p>
                        Record actual waste quantities by type as the project
                        progresses. Compare actual figures against the SWMP
                        forecast at regular intervals (typically monthly).
                        Investigate significant variances &mdash; is timber
                        waste exceeding the forecast because of design changes,
                        poor cutting practices, or material damage?
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      <ClipboardList className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Waste Data Collection
                      </p>
                      <p>
                        Data sources include waste transfer notes (which record
                        the type, quantity, waste carrier, and destination for
                        every waste collection), weighbridge tickets, skip
                        collection records, and on-site weighing where
                        available. Some waste management contractors provide
                        online portals with real-time waste data dashboards.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      <FileText className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Monthly Reports
                      </p>
                      <p>
                        Produce monthly waste reports showing total waste
                        generated, waste by type, diversion rate (percentage
                        diverted from landfill), comparison against forecast
                        and targets, and any corrective actions taken. Present
                        these reports at project progress meetings to maintain
                        visibility and accountability.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      <TrendingDown className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Corrective Actions
                      </p>
                      <p>
                        Where monitoring identifies problems (contaminated
                        recycling skips, waste exceeding forecast, poor
                        segregation compliance), take prompt corrective action.
                        This may include additional toolbox talks, improved
                        signage, repositioning containers, discussions with
                        specific subcontractors, or changes to material
                        ordering practices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Waste Audits
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    Regular waste audits (typically quarterly or at key project
                    milestones) provide a deeper assessment of waste management
                    performance. A waste audit typically involves:
                  </p>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Physical inspection of skip and container contents to
                      assess segregation quality
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Review of waste transfer notes and consignment notes for
                      completeness and accuracy
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Comparison of actual performance against SWMP targets and
                      WRAP benchmarks
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Identification of best practice and improvement
                      opportunities
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Verification that hazardous waste is being handled,
                      stored, and disposed of correctly
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">
                    BREEAM Evidence:
                  </strong>{" "}
                  For BREEAM Wst 01 credits, the project must provide evidence
                  of waste monitoring including: the pre-construction SWMP with
                  waste forecasts and targets; waste transfer notes and
                  consignment notes; and a post-completion SWMP review
                  comparing actual performance against forecasts. Diversion
                  rates of 85% or more from landfill are typically required for
                  higher BREEAM ratings.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: WRAP and Resource Efficiency */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">07</span>
            WRAP and Resource Efficiency
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>WRAP</strong> (the Waste and Resources Action Programme)
                is a UK charity that works with businesses, governments, and
                individuals to{" "}
                <strong>
                  promote resource efficiency and reduce waste
                </strong>
                . WRAP has been instrumental in driving improvements in
                construction waste management through research, benchmarking,
                guidance, and industry engagement.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  WRAP&rsquo;s Key Contributions to Construction Waste
                  Management
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Waste benchmarks:
                      </strong>{" "}
                      WRAP collected and published waste generation benchmark
                      data from thousands of construction projects, enabling
                      the industry to compare performance and set improvement
                      targets. These benchmarks remain widely referenced in
                      SWMPs and sustainability assessments.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Net Waste Tool:
                      </strong>{" "}
                      An online tool that enabled project teams to estimate waste
                      generation, set targets, and report performance. The tool
                      facilitated consistent data collection across the
                      industry.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Designing out waste guidance:
                      </strong>{" "}
                      WRAP published practical guidance on how design decisions
                      affect waste generation, including case studies
                      demonstrating the benefits of off-site manufacture,
                      standard component sizes, and design for deconstruction.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Halving Waste to Landfill:
                      </strong>{" "}
                      A voluntary industry commitment to reduce construction
                      waste sent to landfill by 50% by 2012, compared to 2008
                      levels. The commitment was signed by major contractors,
                      clients, and industry bodies and was widely regarded as
                      successful in driving significant reductions.
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Resource Efficiency Action Plans
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    WRAP promoted the concept of{" "}
                    <strong className="text-white">
                      resource efficiency action plans
                    </strong>{" "}
                    that go beyond waste management to consider the efficient
                    use of all resources &mdash; materials, water, and energy
                    &mdash; throughout the construction process. Key elements
                    include:
                  </p>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Material procurement optimisation &mdash; ordering the
                      right quantities, reducing over-ordering and wastage
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Reuse of materials on site and between projects &mdash;
                      reuse exchanges, material passports, salvage before
                      demolition
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Water efficiency during construction &mdash; metering,
                      rainwater harvesting, recycled water for wheel washing
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Energy efficiency on site &mdash; efficient temporary
                      lighting, plant selection, smart meters, renewable
                      energy for site compounds
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">
                    Case Study: Good Practice
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Leading UK contractors have achieved{" "}
                  <strong className="text-white">
                    diversion rates of 95% or more
                  </strong>{" "}
                  from landfill through a combination of: rigorous source
                  segregation on site; closed-loop recycling partnerships
                  (particularly for plasterboard and packaging); designing out
                  waste through BIM and off-site manufacture; supplier take-back
                  schemes; and a strong culture of resource efficiency driven
                  from senior management. WRAP case studies documented savings
                  of £20,000&ndash;£100,000+ on individual projects through
                  improved waste management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Integrating with Other Plans */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">08</span>
            Integrating with Other Plans
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A SWMP does not exist in isolation. It must be{" "}
                <strong>
                  integrated with the project&rsquo;s other management plans
                </strong>{" "}
                to ensure consistency, avoid duplication, and maximise
                effectiveness. The key integration points are with the CEMP,
                quality management system, health and safety plan, and
                contractor obligations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Integration Points
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      <LinkIcon className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Construction Environmental Management Plan (CEMP)
                      </p>
                      <p>
                        The SWMP is typically incorporated as a dedicated
                        section or appendix within the CEMP. The CEMP provides
                        the overarching environmental management framework,
                        including dust, noise, water, ecology, and contaminated
                        land controls. Waste management links to many of these
                        &mdash; for example, dust from waste handling, water
                        pollution from liquid waste, and contaminated land
                        requiring hazardous waste management. Cross-references
                        between the SWMP and CEMP sections ensure joined-up
                        management.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      <LinkIcon className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Quality Management
                      </p>
                      <p>
                        Quality failures generate waste &mdash; rework,
                        rejected materials, and defective components all
                        contribute to the waste stream. Integrating waste
                        management with quality management helps identify the
                        root causes of waste generation. If a particular
                        subcontractor is generating excessive waste due to
                        poor workmanship, this is both a quality issue and a
                        waste issue that should be addressed together.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      <LinkIcon className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Health &amp; Safety Plan
                      </p>
                      <p>
                        Waste management has direct health and safety
                        implications. Manual handling of waste materials,
                        exposure to hazardous waste (asbestos, lead paint,
                        chemical containers), fire risk from combustible waste
                        accumulation, and slip/trip hazards from poor
                        housekeeping all require coordination between the SWMP
                        and the project&rsquo;s health and safety plan under
                        CDM 2015. The construction phase plan should reference
                        waste management arrangements and vice versa.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      <LinkIcon className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Contractor Obligations
                      </p>
                      <p>
                        Subcontractors and trade contractors must be
                        contractually obligated to comply with the SWMP. This
                        should be included in subcontract conditions, covered
                        during pre-start meetings, and monitored throughout the
                        works. Key obligations include: segregating waste at
                        source, using designated containers, reporting waste
                        data, minimising waste through good working practices,
                        and removing their own hazardous waste where
                        applicable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Effective integration means that waste management is not
                treated as an isolated environmental issue but as an{" "}
                <strong>
                  integral part of the project&rsquo;s overall management
                  system
                </strong>
                . When waste management is embedded in quality, health and
                safety, and environmental management processes, it becomes part
                of the project culture rather than an add-on activity.
              </p>
            </div>
          </div>
        </section>

        {/* SWMP Lifecycle Flowchart */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">
            SWMP Lifecycle Flowchart
          </h2>
          <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-transparent border border-emerald-500/30 rounded-xl p-5 sm:p-6">
            <p className="text-sm text-white/60 mb-5 text-center">
              The SWMP lifecycle from design through to project close-out
            </p>

            {/* Stage 1: Design */}
            <div className="flex justify-center mb-4">
              <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-lg px-4 py-3 text-center max-w-xs w-full">
                <p className="text-emerald-400 text-xs font-semibold mb-1 uppercase tracking-wide">
                  Stage 1 &mdash; Design
                </p>
                <p className="text-white text-sm font-bold">
                  Design Out Waste
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Standard sizes, off-site manufacture, BIM coordination
                </p>
              </div>
            </div>

            {/* Connector */}
            <div className="flex justify-center mb-4">
              <div className="w-px h-6 bg-emerald-500/40" />
            </div>

            {/* Stage 2: Pre-Construction */}
            <div className="flex justify-center mb-4">
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center max-w-xs w-full">
                <p className="text-emerald-400 text-xs font-semibold mb-1 uppercase tracking-wide">
                  Stage 2 &mdash; Pre-Construction
                </p>
                <p className="text-white text-sm font-bold">
                  Prepare the SWMP
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Forecast waste, set targets, identify carriers &amp;
                  destinations
                </p>
              </div>
            </div>

            {/* Connector */}
            <div className="flex justify-center mb-4">
              <div className="w-px h-6 bg-emerald-500/40" />
            </div>

            {/* Stage 3: Construction */}
            <div className="flex justify-center mb-4">
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center max-w-xs w-full">
                <p className="text-amber-400 text-xs font-semibold mb-1 uppercase tracking-wide">
                  Stage 3 &mdash; Construction
                </p>
                <p className="text-white text-sm font-bold">
                  Implement &amp; Monitor
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Segregation, toolbox talks, waste champion, data collection
                </p>
              </div>
            </div>

            {/* Connector */}
            <div className="flex justify-center mb-4">
              <div className="w-px h-6 bg-emerald-500/40" />
            </div>

            {/* Stage 4: Review */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center">
                <p className="text-amber-400 text-xs font-semibold mb-1 uppercase tracking-wide">
                  Monthly
                </p>
                <p className="text-white text-sm font-bold">
                  Report &amp; Correct
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Actual vs forecast, corrective actions, progress meetings
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center">
                <p className="text-amber-400 text-xs font-semibold mb-1 uppercase tracking-wide">
                  Quarterly
                </p>
                <p className="text-white text-sm font-bold">
                  Waste Audit
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Skip inspections, data review, improvement opportunities
                </p>
              </div>
            </div>

            {/* Connector */}
            <div className="flex justify-center mb-4">
              <div className="w-px h-6 bg-emerald-500/40" />
            </div>

            {/* Stage 5: Close-out */}
            <div className="flex justify-center">
              <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-lg px-4 py-3 text-center max-w-xs w-full">
                <p className="text-emerald-400 text-xs font-semibold mb-1 uppercase tracking-wide">
                  Stage 5 &mdash; Close-Out
                </p>
                <p className="text-white text-sm font-bold">
                  Final SWMP Review
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Final data, lessons learned, BREEAM evidence, benchmarking
                </p>
              </div>
            </div>

            <p className="text-xs text-white/40 text-center mt-5">
              The SWMP is a live document &mdash; updated continuously
              throughout the project lifecycle
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-2-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-3">
              Next: Module 3
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
