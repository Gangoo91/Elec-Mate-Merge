import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  ClipboardCheck,
  CheckCircle2,
  DollarSign,
  FileCheck2,
  BookOpen,
  Award,
  GraduationCap,
  Briefcase,
  Brain,
  Building,
  Calendar,
  Package,
  Users,
  Truck,
  Target,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Electrical Project Planning | Tender to Completion';
const PAGE_DESCRIPTION =
  'Complete guide to electrical project planning from tender review to handover. Pricing, programming, material procurement, labour planning, site setup, testing coordination, commissioning, O&M documentation, and project close-out for UK electrical contractors.';

const breadcrumbs = [
  { label: 'Business', href: '/guides' },
  { label: 'Project Planning', href: '/guides/electrical-project-planning' },
];

const tocItems = [
  { id: 'tender-review', label: 'Tender Review & Pricing' },
  { id: 'pre-construction', label: 'Pre-Construction Planning' },
  { id: 'programming', label: 'Programming the Works' },
  { id: 'material-procurement', label: 'Material Procurement' },
  { id: 'labour-planning', label: 'Labour Planning' },
  { id: 'site-setup', label: 'Site Setup & Mobilisation' },
  { id: 'testing-and-commissioning', label: 'Testing & Commissioning' },
  { id: 'handover', label: 'Handover & Close-Out' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Successful electrical project planning starts at tender stage — errors in pricing, programme assumptions, or scope interpretation at this stage cascade through the entire project and can turn a profitable job into a loss.',
  'A detailed installation programme, linked to the main construction programme, is essential for coordinating electrical work with other trades and ensuring resources are available when needed.',
  'Material procurement must be managed proactively, with long-lead items (switchgear, transformers, generators) ordered months in advance. Late material deliveries are one of the most common causes of programme delay.',
  'Labour planning requires forecasting the number and type of electricians needed week by week, balancing the cost of labour against the programme requirements. Under-resourcing delays the programme; over-resourcing erodes the margin.',
  'Elec-Mate supports project planning with AI-powered cost engineering, professional testing and certification tools, and digital documentation that streamlines the handover process.',
];

const faqs = [
  {
    question: 'How do you plan an electrical installation project?',
    answer:
      "Electrical project planning follows a structured process from tender to handover. Start by thoroughly reviewing the tender documents — drawings, specifications, schedules, and the main contractor's programme. Price the job accurately, including materials, labour, subcontractors, preliminaries, overheads, and profit. Once awarded, hold a pre-construction meeting to review the design, clarify any queries, and agree the programme. Develop a detailed installation programme showing the sequence of work (containment first, then cabling, then termination, then testing). Identify long-lead materials and place orders early. Create a labour histogram showing the number of electricians needed each week. Set up site storage, welfare arrangements, and tool inventory. During construction, manage progress against the programme, adjust resources as needed, and maintain quality documentation. Plan the testing and commissioning phase well in advance, ensuring adequate time and qualified testers. Prepare handover documentation including as-built drawings, test certificates, O&M manuals, and commissioning records.",
  },
  {
    question: 'How do you price an electrical project?',
    answer:
      "Pricing an electrical project requires a systematic approach to ensure nothing is missed. Start with a thorough review of the drawings and specification to understand the full scope of work. Perform a detailed material take-off from the drawings, quantifying every item from containment and cable to accessories and switchgear. Price the materials using supplier quotations for major items and pricing books or past project data for smaller items. Calculate the labour element by estimating the number of hours required for each work activity using industry-standard labour norms (such as those published by the ECA or derived from your company's own historical data). Add preliminaries (site setup, supervision, temporary installations, welfare contribution, craneage), subcontractor costs, design fees, testing costs, commissioning costs, and overheads. Finally, apply a profit margin appropriate to the risk and market conditions. The tender price must also account for inflation (on longer projects), contingency for unforeseen work, and any commercial adjustments to win the work. Elec-Mate's AI Cost Engineer can assist with pricing by analysing job descriptions and generating material and labour estimates.",
  },
  {
    question: 'What is a construction programme for electrical work?',
    answer:
      'A construction programme for electrical work is a detailed schedule showing every activity required to complete the electrical installation, the sequence in which activities must be carried out, the duration of each activity, and the dependencies between activities. The programme is typically presented as a Gantt chart using software such as Microsoft Project, Primavera P6, or Asta Powerproject. The electrical programme must be linked to the main construction programme so that electrical activities align with the completion of preceding work by other trades (for example, containment cannot be installed until the ceiling grid is in place). Key milestones include first fix completion, second fix start, panel installation, testing start, commissioning, and handover. The programme is a living document that is updated regularly to reflect actual progress and any changes to the main programme.',
  },
  {
    question: 'How long before a project should you order switchgear?',
    answer:
      'Switchgear lead times vary depending on the type and complexity of the equipment, the manufacturer, and current market conditions. As a general guide: standard consumer units and small distribution boards have lead times of 1-2 weeks. Standard three-phase distribution boards have lead times of 4-8 weeks. Main switchboards and motor control centres (MCCs) have lead times of 12-20 weeks. Transformers have lead times of 16-30 weeks. Generators have lead times of 20-40 weeks. These lead times can extend significantly during periods of high demand or supply chain disruption. The golden rule is to review lead times at tender stage and include them in the pre-construction programme. Long-lead items should be ordered as soon as the contract is awarded — waiting until the project is underway before ordering switchgear is a common mistake that causes programme delays and cost overruns. Always get written lead time confirmations from suppliers and track delivery dates actively.',
  },
  {
    question: 'What documentation is needed for electrical project handover?',
    answer:
      'Electrical project handover documentation (the O&M package) typically includes: as-built drawings showing the final installed arrangement (which may differ from the design drawings due to site changes); an electrical installation certificate (EIC) or electrical installation condition report (EICR) as appropriate; schedule of test results for every circuit; distribution board schedules updated to reflect the final circuit arrangement; cable schedules showing cable types, sizes, routes, and containment references; commissioning records for all systems (lighting control, fire alarm, emergency lighting, BMS interface); manufacturer product data sheets and installation manuals for all major equipment; warranty certificates; a maintenance schedule specifying routine maintenance requirements for all electrical equipment; and a health and safety file contribution covering residual risks and safe maintenance procedures. This documentation package is a CDM 2015 requirement and a contractual obligation on virtually all projects.',
  },
  {
    question: 'How does Elec-Mate support electrical project planning?',
    answer:
      'Elec-Mate provides tools that support multiple stages of the project planning process. The AI Cost Engineer analyses job descriptions and generates material and labour estimates to support pricing. The RAMS Generator creates site-specific risk assessments and method statements for the pre-construction phase. The testing and certification tools (EICR, EIC, minor works) produce professional, compliant test documentation during the testing phase. The digital certificate management system tracks team qualifications for CDM compliance. The calculators (cable sizing, voltage drop, maximum demand, fault current) support design verification and value engineering. During handover, the professional PDF export feature produces high-quality documentation that meets client expectations. For electrical contractors managing multiple projects, having all these tools in one platform with cloud storage and sync significantly reduces administrative overhead.',
  },
];

const sections = [
  {
    id: 'tender-review',
    heading: 'Tender Review and Pricing',
    content: (
      <>
        <p>
          Every successful electrical project starts with a thorough tender review. The decisions
          made at this stage — how you interpret the scope, how you price the materials and labour,
          and how you assess the programme — determine whether the project will be profitable or
          problematic. Cutting corners at tender stage to submit a low price is the single most
          common cause of project failure in electrical contracting.
        </p>
        <p>
          The tender review process begins with a detailed study of the drawings, specification,
          schedules, and any other contract documents. Every page of the specification must be read
          — not skimmed — because the specification often contains requirements that are not shown
          on the drawings, such as specific product brands, testing requirements, spare capacity
          provisions, and commissioning obligations. Missing a specification clause can mean the
          difference between winning profitably and losing money.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Material Take-Off</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              A systematic, drawing-by-drawing quantification of every material item required. This
              includes containment (tray, trunking, conduit, basket), cable (power, data, fire
              alarm, emergency lighting), accessories (switches, sockets, isolators), distribution
              equipment (boards, switchgear), luminaires, and specialist items. A missed cable tray
              route or an under-counted socket schedule can cost thousands. Cross-reference the
              drawings with the specification to ensure product selections are compliant.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Labour Estimation</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Labour is typically the largest single cost element in an electrical contract.
              Estimation requires breaking the work into activities and applying labour norms (hours
              per unit of installation) to each activity. Industry-standard norms provide a starting
              point, but they must be adjusted for site conditions — working at height takes longer
              than working at floor level; installing in an occupied building takes longer than in
              an empty shell; working in a cleanroom or data centre takes longer than in a standard
              office. Experienced estimators adjust norms based on their knowledge of the specific
              site conditions.
            </p>
          </div>
        </div>
        <p className="mt-6">
          The tender price must also account for{' '}
          <SEOInternalLink href="/guides/how-to-price-electrical-jobs">
            preliminaries
          </SEOInternalLink>{' '}
          (supervision, site setup, temporary installations, welfare, security), design fees if
          applicable, testing and commissioning costs, and overhead and profit. Submitting a price
          that is too low to cover the actual cost of the work is not competitive — it is
          commercially reckless.
        </p>
        <SEOAppBridge
          title="AI Cost Engineer for pricing support"
          description="Elec-Mate's AI Cost Engineer analyses job descriptions and generates material schedules and labour estimates using real-world pricing data. Cross-check your take-offs, validate your estimates, and price with confidence."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'pre-construction',
    heading: 'Pre-Construction Planning',
    content: (
      <>
        <p>
          The period between winning the contract and starting on site is critical. Pre-construction
          planning sets the foundation for a well-run project. Skipping or rushing this phase leads
          to problems that compound throughout the project.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Pre-Construction Activities</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Design review and RFIs</strong> — Review the
                design in detail, raise requests for information (RFIs) for any ambiguities or
                clashes, and resolve design issues before work starts. Discovering a problem in the
                office costs a fraction of discovering it on site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Programme development</strong> — Create a
                detailed electrical installation programme linked to the main contractor's
                programme. Identify critical path activities, milestones, and dependencies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Long-lead procurement</strong> — Identify items
                with extended lead times and place orders immediately. Switchboards, MCCs,
                transformers, and generators must be ordered months in advance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">RAMS preparation</strong> — Develop risk
                assessments and method statements for all major work activities. Submit to the
                principal contractor for review and approval before work starts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Labour mobilisation</strong> — Confirm the
                workforce for the start date. Ensure all operatives have current CSCS cards, ECS
                cards, site-specific inductions, and any project-specific training.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Subcontractor engagement</strong> — If using
                specialist subcontractors (fire alarm, data, security, BMS), agree scope, price,
                programme, and quality requirements before the project starts.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'programming',
    heading: 'Programming the Electrical Works',
    content: (
      <>
        <p>
          The electrical installation programme is the roadmap for the entire project. A well-built
          programme enables proactive management — anticipating problems before they occur and
          allocating resources where they are needed most. A poor programme (or no programme at all)
          leads to reactive firefighting, where problems are only addressed when they become crises.
        </p>
        <p>
          The programme should be structured in phases that reflect the natural sequence of
          electrical installation work: containment (first fix), cabling, accessories and equipment
          installation (second fix), termination, testing, commissioning, and handover. Within each
          phase, activities should be broken down by area or zone so that progress can be tracked
          geographically as well as chronologically.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Programme Key Milestones</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-medium">Containment start</span>
              </div>
              <span className="text-white text-sm">First fix begins</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-medium">Cable pulling start</span>
              </div>
              <span className="text-white text-sm">After containment complete</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-medium">Panel installation</span>
              </div>
              <span className="text-white text-sm">After builder's work complete</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-medium">Second fix start</span>
              </div>
              <span className="text-white text-sm">After ceiling/wall finishes</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-medium">Testing start</span>
              </div>
              <span className="text-white text-sm">After termination complete</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-medium">Handover</span>
              </div>
              <span className="text-white text-sm">After commissioning complete</span>
            </div>
          </div>
        </div>
        <p>
          The programme must be updated regularly (weekly on most projects) to reflect actual
          progress. When activities slip, the site manager must identify the cause, assess the
          impact on downstream activities, and develop recovery measures — which may include
          additional labour, extended hours, or re-sequencing work.
        </p>
      </>
    ),
  },
  {
    id: 'material-procurement',
    heading: 'Material Procurement',
    content: (
      <>
        <p>
          Material procurement is one of the most critical aspects of electrical project planning.
          Late deliveries, wrong specifications, and insufficient quantities all cause programme
          delays and cost overruns. A disciplined procurement process, managed proactively from the
          pre-construction phase onwards, prevents these problems.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Long-Lead Items</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Main switchboards, motor control centres, transformers, generators, and specialist
              luminaires can have lead times of 12-40 weeks. These must be ordered as soon as the
              contract is awarded, with design information finalised early enough to allow
              manufacture. Late ordering of long-lead items is one of the most common and most
              expensive mistakes in electrical contracting. Always get written confirmation of lead
              times and track delivery dates actively.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Bulk Materials</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Cable, containment, conduit, and accessories are typically ordered in bulk based on
              the tender take-off quantities, with deliveries phased to match the programme.
              Ordering everything at once and storing it on site is wasteful (ties up cash, risks
              damage and theft) and is not feasible on space-constrained sites. Phased deliveries
              aligned to the installation sequence are more efficient. Maintain a material tracker
              to monitor deliveries against requirements.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Specification Compliance</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Every material must comply with the contract specification. Substituting non-specified
              products without formal approval is a contractual breach that can result in the
              material being rejected, ripped out, and replaced at your cost. If a specified product
              is unavailable or prohibitively expensive, submit a formal substitution request with a
              technical comparison demonstrating that the alternative meets the same performance
              requirements. Get written approval before ordering.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'labour-planning',
    heading: 'Labour Planning',
    content: (
      <>
        <p>
          Labour is the largest variable cost on an electrical project and the most difficult
          resource to manage. Getting the right number of electricians, with the right skills, on
          site at the right time is the key to delivering on programme and within budget.
        </p>
        <p>
          Labour planning starts with a histogram — a bar chart showing the number of electricians
          required each week throughout the project. The histogram is derived from the programme:
          each activity has an associated labour requirement (calculated from the estimated hours
          and the planned duration), and the histogram aggregates these requirements across all
          concurrent activities.
        </p>
        <p>
          The typical labour profile for an electrical project ramps up gradually during first fix,
          peaks during the main cabling and second fix period, and tapers off during testing and
          commissioning. Managing this ramp-up and ramp-down requires careful coordination with HR,
          recruitment agencies, and subcontractors to ensure electricians are available when needed
          and released when the demand drops.
        </p>
        <p>
          A common mistake is under-resourcing early in the project (to save money) and then trying
          to recover lost time with excessive labour later. This approach is almost always more
          expensive than the planned labour profile because overtime rates, travel and accommodation
          costs for agency labour, and the inefficiency of congested working areas all increase
          costs. Equally, over-resourcing leads to electricians standing around waiting for access
          or materials, which wastes money and damages morale.
        </p>
        <p>
          The site manager must monitor actual labour against the planned histogram weekly and
          adjust as necessary. Variances should be reported to the project manager with an
          explanation of the cause and the proposed corrective action.
        </p>
      </>
    ),
  },
  {
    id: 'site-setup',
    heading: 'Site Setup and Mobilisation',
    content: (
      <>
        <p>
          A well-organised site setup saves time and money throughout the project. The initial
          mobilisation period — setting up storage, establishing tool inventory, arranging welfare,
          and inducting the first operatives — sets the tone for the entire project.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Mobilisation Checklist</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Secure material storage container — lockable, weatherproof, and accessible
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Tool inventory — power tools, hand tools, test equipment, access equipment
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Temporary electrical supply for tools and lighting in work areas</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>PPE stock — hard hats, hi-vis, safety boots, gloves, eye protection</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Site office space with drawings, specifications, and IT access</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Welfare arrangements confirmed with the principal contractor</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>First aid kit, fire extinguisher, and emergency procedures displayed</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                {' '}
                <SEOInternalLink href="/guides/permit-to-work-electrician">
                  RAMS and permit
                </SEOInternalLink>{' '}
                systems agreed with principal contractor
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'testing-and-commissioning',
    heading: 'Testing and Commissioning',
    content: (
      <>
        <p>
          Testing and commissioning is where the quality of the installation is formally verified.
          Inadequate planning of this phase is a frequent cause of delayed handovers and contractual
          disputes. The testing and commissioning programme must be planned from the outset, not
          treated as an afterthought at the end of the project.
        </p>
        <p>
          The testing phase requires qualified testers (holding{' '}
          <SEOInternalLink href="/guides/city-guilds-2391">City & Guilds 2391</SEOInternalLink> or
          equivalent), calibrated test instruments, completed installation work (testing incomplete
          circuits is pointless), and adequate time in the programme. On larger projects, a
          dedicated testing team is engaged, and their access must be coordinated so they can test
          areas in sequence as installation completes.
        </p>
        <p>
          The testing sequence follows the requirements of{' '}
          <SEOInternalLink href="/guides/testing-sequence">BS 7671 Chapter 64</SEOInternalLink>:
          continuity of protective conductors, continuity of ring final circuit conductors,
          insulation resistance, polarity, earth fault loop impedance, prospective fault current,
          and RCD operation. Every test result must be recorded on the schedule of test results and
          any failures investigated and rectified before the circuit can be certified.
        </p>
        <p>
          Commissioning follows testing and involves energising systems and verifying that they
          operate as intended. Lighting control systems, fire alarm interfaces, emergency lighting,
          BMS integration, and metering all require commissioning by competent persons.
          Commissioning records must demonstrate that each system functions correctly under normal
          and fault conditions.
        </p>
        <SEOAppBridge
          title="Professional testing and certification tools"
          description="Elec-Mate's testing tools produce BS 7671-compliant EICs, EICRs, and minor works certificates with integrated schedule of test results. Professional PDF output, digital storage, and cloud sync across all devices."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'handover',
    heading: 'Handover and Project Close-Out',
    content: (
      <>
        <p>
          Handover is the formal transfer of the completed electrical installation from the
          contractor to the client. A smooth handover requires months of preparation — leaving
          documentation to the last week is a guaranteed route to a stressful, incomplete, and
          unprofessional close-out.
        </p>
        <p>
          The handover documentation package (often called the O&M manual or health and safety file
          contribution) should be compiled throughout the project, not assembled at the end. As each
          area is tested and commissioned, the relevant documentation should be finalised and added
          to the package. This incremental approach spreads the workload and ensures nothing is
          missed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Handover Documentation Package</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOInternalLink href="/guides/eic-certificate">
                  Electrical Installation Certificate (EIC)
                </SEOInternalLink>{' '}
                or equivalent certification for all installations
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Schedule of test results for every circuit, every distribution board</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>As-built drawings reflecting the final installed arrangement</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Commissioning records for all systems</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Manufacturer product data and maintenance schedules</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Warranty certificates for all major equipment</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Health and safety file contribution covering residual risks</span>
            </li>
          </ul>
        </div>
        <p>
          The final step is the defects liability period (typically 12 months), during which the
          contractor is responsible for rectifying any defects that emerge. Good project management
          during construction minimises defects at handover, which in turn reduces the cost and
          disruption of the defects period.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/how-to-price-electrical-jobs',
    title: 'How to Price Electrical Jobs',
    description: 'Pricing strategies, labour rates, and material mark-ups for electrical work.',
    icon: DollarSign,
    category: 'Guide',
  },
  {
    href: '/guides/starting-electrical-business',
    title: 'Starting an Electrical Business',
    description: 'Setting up your own electrical contracting company in the UK.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/eic-certificate',
    title: 'EIC Certificate Guide',
    description: 'How to complete an Electrical Installation Certificate correctly.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence',
    title: 'Testing Sequence Guide',
    description: 'The correct BS 7671 testing sequence from continuity to RCD testing.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-site-manager',
    title: 'Electrical Site Manager Guide',
    description: 'Role, responsibilities, and career path for site managers.',
    icon: Building,
    category: 'Guide',
  },
  {
    href: '/tools/rams-generator',
    title: 'AI RAMS Generator',
    description: 'Generate CDM-compliant risk assessments and method statements.',
    icon: Brain,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalProjectPlanningPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-07-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={ClipboardCheck}
      heroTitle={
        <>
          Electrical Project Planning:{' '}
          <span className="text-yellow-400">From Tender to Completion</span>
        </>
      }
      heroSubtitle="The complete guide to planning and managing electrical installation projects. Tender review, pricing, programming, material procurement, labour planning, testing coordination, and professional handover — everything an electrical contractor needs to deliver projects successfully."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Professional project tools for electrical contractors"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for AI-powered cost engineering, professional testing and certification, and digital documentation. Plan better, deliver better. 7-day free trial, cancel anytime."
    />
  );
}
