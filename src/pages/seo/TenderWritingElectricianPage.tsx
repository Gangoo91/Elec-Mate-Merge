import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileText,
  PoundSterling,
  ClipboardList,
  AlertTriangle,
  ShieldCheck,
  Users,
  BookOpen,
  Building2,
  CheckCircle,
  Briefcase,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business Guides', href: '/guides/business' },
  { label: 'Tender Writing for Electricians', href: '/tender-writing-electrician' },
];

const tocItems = [
  { id: 'understanding-tenders', label: 'Understanding Electrical Tenders' },
  { id: 'reading-employers-requirements', label: "Employer's Requirements" },
  { id: 'prelims', label: 'Pricing Prelims' },
  { id: 'labour-rates', label: 'Labour Rates' },
  { id: 'materials-markup', label: 'Materials Markup' },
  { id: 'programme', label: 'Programme and Programme Float' },
  { id: 'hs-documentation', label: 'H&S Documentation' },
  { id: 'contract-types', label: 'NEC and JCT Contracts' },
  { id: 'common-mistakes', label: 'Common Mistakes That Lose Tenders' },
  { id: 'for-electricians', label: 'Tools to Help You Win' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A winning electrical tender is won on preliminaries, programme credibility, and health and safety documentation — not just on the lowest price.',
  "Always read the Employer's Requirements (ERs) and contract conditions in full before pricing. Onerous conditions and unlimited liability clauses can make a low-price tender financially catastrophic.",
  'Prelims typically account for 8 to 15 per cent of contract value on commercial electrical jobs. Under-pricing prelims is one of the most common reasons electrical contractors lose money on tender.',
  'NEC4 Engineering and Construction Subcontract (ECS) and JCT Design and Build are the two most common contract forms in commercial electrical work. Understanding compensation events (NEC) and loss and expense (JCT) is essential to recovering cost on site.',
  'The Housing Grants, Construction and Regeneration Act 1996 (as amended by the Local Democracy, Economic Development and Construction Act 2009) gives subcontractors statutory rights to interim payments and adjudication — know these rights before you sign any subcontract.',
];

const faqs = [
  {
    question: 'What is a prelims section in an electrical tender?',
    answer:
      'Preliminaries (prelims) cover the costs of running the contract that are not directly attributable to labour or materials. For an electrical contractor this includes site management, attendance at site meetings, temporary supplies and lighting, welfare facilities (if not provided by the main contractor), tools and plant, testing equipment, PPE, site signage, insurance, bonds, and warranty costs. On commercial projects prelims typically represent 8 to 15 per cent of contract value. Many electrical contractors underprice prelims and then find their overhead is not recovered.',
  },
  {
    question: 'What labour rate should I use in my electrical tender?',
    answer:
      "Your all-in labour rate must cover the electrician's base hourly rate, National Insurance contributions (13.8 per cent employer's NI), holiday pay (12.07 per cent of pay for workers on zero-hours or pro-rata for salaried), pension contributions (minimum 3 per cent employer under auto-enrolment), industry sick pay (if JIB-registered), travel time and allowances if applicable, and your overhead recovery rate. In 2026 a realistic all-in rate for a qualified electrician in London is £55 to £75 per hour, and £42 to £55 outside London. Do not use apprentice labour rates in your tender unless you have confirmed the programme allows for supervision.",
  },
  {
    question: 'How much should I mark up materials in an electrical tender?',
    answer:
      'A standard materials markup for electrical contractors is 15 to 25 per cent on trade price. This covers your purchasing costs, delivery, site storage and losses, handling, and the administrative cost of procurement. On specialist or long-lead items (switchgear, containment systems, distribution boards) consider a higher markup to account for procurement risk. Always check tender documents for "open book" or "schedule of rates" requirements — some public sector contracts require you to declare your markup percentage and may cap it.',
  },
  {
    question: 'What is the difference between NEC and JCT contracts for electricians?',
    answer:
      "NEC4 (particularly the Engineering and Construction Subcontract) uses a compensation event mechanism: any change to scope, delay caused by the main contractor, or event not at the subcontractor's risk is a compensation event that must be notified within eight weeks. Failing to notify in time can forfeit your entitlement. JCT uses loss and expense claims and extension of time (EOT) applications. JCT design and build contracts are common in housing and commercial fit-out. NEC3/NEC4 is dominant in infrastructure, rail, utilities, and public sector work. Whichever form you use, read the Z clauses (NEC) or amendments (JCT) carefully — these are where onerous bespoke terms are inserted.",
  },
  {
    question: 'What H&S documents do I need to include with my electrical tender?',
    answer:
      "A tender submission for commercial electrical work typically requires: a company health and safety policy, method statements for key activities (cable installation, containment, termination, testing), risk assessment index, evidence of CDM 2015 competence (CDM coordinator appointment if principal contractor, or pre-construction information acknowledgement as a contractor), CHAS or equivalent accreditation certificate, public and employers' liability insurance certificates, and relevant staff qualification records (C&G 2382, 2391, IPAF, PASMA, asbestos awareness). Large clients may also require ISO 45001 certification or Safe Contractor approval.",
  },
  {
    question: 'How do I price a programme for an electrical tender?',
    answer:
      'Your programme should be resource-loaded — meaning each activity has labour allocated to it so the reviewer can see how you will achieve the programme. Use a Gantt chart (Asta Powerproject, Microsoft Project, or even a well-presented Excel programme). Include programme float: if you quote a programme with zero float you are telling the client you have no contingency for delays. A realistic programme with 10 to 15 per cent float is more credible than an optimistic programme that will clearly slip. Show key interfaces with other trades (first and second fix, commissioning, handover) and any long-lead item delivery milestones.',
  },
  {
    question: "What is an Employer's Requirements document?",
    answer:
      "The Employer's Requirements (ERs) are the client's technical specification for the project, usually produced by the M&E consultant or the client's design team. They define the system types required (lighting, power, containment, fire alarm, BMS integration), performance standards, commissioning requirements, O&M manual format, and often the preferred manufacturers. Always read the ERs alongside the contract conditions. Contradictions between the ERs and the contract drawings are common and must be clarified via tender queries before submission — pricing an ambiguity incorrectly after award can be very costly.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/quote-writing-guide',
    title: 'Quote Writing Guide',
    description: 'Professional quote structure for domestic and commercial electrical work.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/subcontracting-guide',
    title: 'Subcontracting Guide',
    description: 'How to find main contractors and protect your payment rights as a subcontractor.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/contract-templates-electrician',
    title: 'Contract Templates',
    description: 'What to include in electrical contractor agreements and customer contracts.',
    icon: ClipboardList,
    category: 'Guide',
  },
  {
    href: '/electrical-framework-contracts',
    title: 'Framework Contracts',
    description: 'How to get on local authority and NHS approved contractor lists.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Build professional quotes and tenders with materials pricing built in.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'understanding-tenders',
    heading: 'Understanding Commercial Electrical Tenders',
    content: (
      <>
        <p>
          A commercial electrical tender is a formal submission in response to a request for tender
          (RFT) or invitation to tender (ITT) from a main contractor, developer, or client. It is
          different from a domestic quote in almost every respect: the documentation is more
          extensive, the pricing methodology is more structured, and the contract terms carry
          significantly more risk.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-stage tendering</strong> — the client issues full tender documents
                (drawings, specification, BoQ if applicable, contract conditions) and all tenderers
                price from the same information. Common on straightforward commercial fit-out and
                domestic housing projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-stage tendering</strong> — stage one is a competitive tender on
                preliminary costs and overhead and profit percentage; stage two involves the
                preferred contractor in the design development before final price agreement. More
                common on complex commercial, healthcare, and education projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Negotiated tender</strong> — the client approaches one contractor directly,
                usually based on an existing relationship or framework appointment. Requires the
                same documentation rigour but without direct price competition.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Before committing to a tender, assess your bid/no-bid criteria. Tendering costs real money
          — estimator time, drawing take-off, supplier enquiries. Only tender for work you can
          genuinely deliver and have a realistic chance of winning.
        </p>
      </>
    ),
  },
  {
    id: 'reading-employers-requirements',
    heading: "Reading and Pricing the Employer's Requirements",
    content: (
      <>
        <p>
          The Employer's Requirements (ERs) are the technical heart of any tender. They define what
          the client wants built, to what standard, and with what level of performance. Failing to
          read them in full before pricing is one of the most expensive mistakes an electrical
          contractor can make.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technical specification</strong> — defines system types (small power,
                lighting, containment, fire detection, emergency lighting, BMS interface), materials
                standards, cable types and ratings, containment specification, and commissioning
                requirements. Price to the specification, not to a lesser standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Drawings and design information</strong> — check drawing issue status.
                Tender drawings marked "for information" or "preliminary" carry more design risk
                than "for construction" drawings. If the design is incomplete, price a design
                allowance and state your assumptions clearly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>O&amp;M and commissioning</strong> — many ERs require full O&amp;M manuals,
                as-installed drawings (CAD or Revit), commissioning witnessed by the client's
                engineer, and extended defects liability periods (12 to 24 months is common). These
                all have a cost — include them.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tender queries</strong> — raise all ambiguities in writing before the tender
                submission deadline. Clarification questions and answers (Q&amp;As) are usually
                issued to all tenderers and become part of the contract documents. Never make
                assumptions on ambiguous scope — query it.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'prelims',
    heading: 'Pricing Preliminaries Correctly',
    content: (
      <>
        <p>
          Preliminaries (prelims) cover all contract costs that are not direct labour or materials.
          They are often the section that electrical contractors most consistently under-price,
          resulting in contracts that technically break even on measured work but lose money
          overall.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Site management</strong> — electrical site manager or working foreman cost
                for the duration of the project. Include their travel, accommodation if required,
                site vehicle, phone, and laptop.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing equipment</strong> — calibrated multifunction testers, loop
                impedance testers, insulation resistance testers. Include calibration costs
                (typically annual) and replacement batteries.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Site attendance and meetings</strong> — time for site progress meetings,
                subcontractor co-ordination meetings, design team meetings. On a 12-month project
                with weekly meetings, this is a significant cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance and bonds</strong> — performance bonds (typically 10 per cent of
                contract value), parent company guarantees, and any additional insurance
                requirements specified in the contract.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overhead and profit</strong> — your company overhead recovery (typically 10
                to 15 per cent of turnover) plus your target profit margin (5 to 10 per cent on
                commercial subcontract work). State these as separate line items where the tender
                format allows.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'labour-rates',
    heading: 'Building Accurate Labour Rates',
    content: (
      <>
        <p>
          Your all-in labour rate is the foundation of your tender pricing. An incorrect rate — even
          by a few pounds per hour — will result in a significant pricing error across a contract
          with thousands of man-hours.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Base hourly rate</strong> — either JIB rates (published annually) or your
                own employment contracts. The JIB 2026 rate for an Approved Electrician is £20.12
                per hour. For self-employed labour-only subcontractors, agree the rate before the
                job, ensure CIS deductions are applied (20 per cent for registered, 30 per cent for
                unregistered), and issue a subcontract agreement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Oncosts</strong> — add employers' NI (13.8 per cent above the secondary
                threshold), holiday pay (12.07 per cent for workers without fixed holiday
                entitlement), pension (minimum 3 per cent employer contribution), JIB contributions
                if applicable, and any enhanced sick pay.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Productivity allowance</strong> — experienced estimators apply a
                productivity factor to account for non-productive time (travel between floors,
                waiting for lifts, tool collection, safety briefings). A factor of 0.85 to 0.90 is
                typical for commercial site work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Build a labour rate spreadsheet template and update it at least twice per year to reflect
          NI thresholds, JIB rate changes, and National Minimum Wage uplifts (effective April each
          year).
        </p>
      </>
    ),
  },
  {
    id: 'materials-markup',
    heading: 'Materials Markup and Procurement Risk',
    content: (
      <>
        <p>
          Materials pricing in a tender must account not just for the cost of materials, but for the
          risk of price increases between tender and delivery, procurement cost, and waste.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard markup</strong> — 15 to 25 per cent on trade price is the
                commercial norm for electrical materials. This covers delivery, storage, handling,
                waste, and procurement overhead. For high-value items (switchgear, distribution
                boards) consider a lower percentage markup in absolute terms but ensure the margin
                in pounds covers your risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Price fluctuation</strong> — on contracts longer than six months, include a
                price fluctuation clause in your tender or add a contingency for material price
                increases. Copper cable prices are particularly volatile and can move 15 to 20 per
                cent in a year. The NEC4 Option X1 price adjustment mechanism exists for this
                purpose.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long-lead items</strong> — switchgear, specialist luminaires, and custom
                distribution boards can have lead times of 16 to 26 weeks. Order these immediately
                after award. In your tender, flag lead times as a programme risk and request an
                early order commitment within the contract conditions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'programme',
    heading: 'Programme and Programme Float',
    content: (
      <>
        <p>
          Your construction programme is one of the most scrutinised documents in a tender
          submission. A credible, resource-loaded programme demonstrates competence and gives the
          client confidence that you understand how to deliver the works.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Resource loading</strong> — allocate labour to each activity so the reviewer
                can verify you have sufficient resource to achieve the programme. Show the number of
                electricians on site per phase.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Trade interfaces</strong> — show dependencies with other trades: when
                first-fix containment must be complete for plasterboard, when second-fix can begin
                after decorating, when power-on is needed for commissioning. Demonstrating awareness
                of trade interfaces impresses clients.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Float</strong> — include 10 to 15 per cent programme float to reflect real
                site conditions. Under NEC4, total float belongs to the project (not the
                contractor), but terminal float (at the end of your programme) is yours. Protect
                your terminal float carefully.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long-lead milestones</strong> — mark the order date for switchgear and other
                long-lead items as a programme milestone. This creates a contractual record that
                delay in award or access will affect the programme.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hs-documentation',
    heading: 'Health and Safety Documentation',
    content: (
      <>
        <p>
          H&amp;S documentation is a mandatory part of any commercial electrical tender. Under the
          Construction (Design and Management) Regulations 2015 (CDM 2015), every contractor on a
          notifiable project must demonstrate competence in health and safety management.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Company H&amp;S policy</strong> — must be signed and dated within the last
                12 months. State your health and safety objectives and arrangements. For companies
                of five or more employees this is a legal requirement under the Health and Safety at
                Work etc. Act 1974.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RAMS (Risk Assessment and Method Statement)</strong> — produce RAMS for each
                key electrical activity: cable installation and termination, working at height, work
                on or near live conductors, and use of power tools. The{' '}
                <SEOInternalLink href="/health-safety-audit-electrician">
                  H&amp;S audit guide
                </SEOInternalLink>{' '}
                covers RAMS in detail.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accreditation</strong> — CHAS (Contractors Health and Safety Assessment
                Scheme) or Constructionline Gold are accepted as pre-qualification evidence by most
                main contractors. Renew these annually and include the current certificate in every
                tender.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance evidence</strong> — public liability (minimum £5m, many clients
                require £10m), employers' liability (minimum £5m, legally required if you employ
                anyone), and professional indemnity if your scope includes design.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use the{' '}
          <SEOInternalLink href="/tools/rams-generator">Elec-Mate RAMS generator</SEOInternalLink>{' '}
          to produce professional RAMS documents that meet commercial tender requirements. Having
          well-structured RAMS ready to customise saves hours per tender.
        </p>
      </>
    ),
  },
  {
    id: 'contract-types',
    heading: 'NEC4 and JCT Contracts: What Electricians Need to Know',
    content: (
      <>
        <p>
          Understanding the contract form is not optional — it governs how you get paid, how changes
          are valued, and what happens when things go wrong. The two most common forms in UK
          commercial electrical work are NEC4 and JCT.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NEC4 Engineering and Construction Subcontract (ECS)</strong> — used
                extensively in public sector, infrastructure, utilities, and healthcare. The
                compensation event mechanism requires you to notify any event that affects your
                scope or programme within eight weeks. Failure to notify extinguishes your
                entitlement. Early warnings are a positive obligation under NEC — use them.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>JCT Design and Build 2016</strong> — common in commercial fit-out, housing,
                and education. Changes are valued as variations. Loss and expense is recoverable for
                regular progress matters (access, late information, disruption). Extension of time
                applications must be made in writing as soon as delay is reasonably apparent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Housing Grants, Construction and Regeneration Act 1996</strong> — gives
                every construction contractor (including electrical subcontractors) the right to
                interim payments at intervals of not less than 28 days, the right to suspend for
                non-payment after giving seven days' notice, and the right to adjudicate any
                dispute. These rights cannot be contracted out of on construction contracts.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always read the Z clauses in NEC4 contracts and the amendments schedule in JCT contracts.
          These are where main contractors insert conditions that modify standard terms — sometimes
          dramatically increasing your risk exposure. If in doubt, seek legal advice before signing.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes That Lose Electrical Tenders',
    content: (
      <>
        <p>
          Most electrical tenders are not lost on price alone. They are lost on the quality of the
          submission, the credibility of the programme, the completeness of the H&amp;S
          documentation, and sometimes on pricing errors that make the tender uncompetitive or
          financially unviable.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not reading the full specification</strong> — pricing to drawings alone and
                missing specification requirements (cable ratings, containment type, commissioning
                obligations) results in scope gaps that cost money post-award.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Under-pricing prelims</strong> — forgetting to include site management,
                testing equipment, site meetings, insurance uplift, and overhead recovery in the
                prelims section is one of the most common and costly errors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not pricing design risk</strong> — on design and build contracts, if you are
                accepting design responsibility for any part of the electrical works, you need
                professional indemnity insurance and a design allowance in your price.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Submitting late</strong> — most tender systems are electronic and close at a
                precise time. A submission received one minute after the deadline is typically
                rejected automatically. Allow time for upload, checking, and confirmation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unqualified clarifications</strong> — stating "price excludes X" in your
                submission without formal tender query confirmation can lead to disputes. Raise
                exclusions formally during the tender period and get written responses.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Tools to Help You Win Commercial Tenders',
    content: (
      <>
        <p>
          Winning commercial electrical tenders consistently requires a system — for pricing, for
          documentation, and for tracking what works. The right tools reduce the time cost of
          tendering and improve the quality of your submissions.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote and Tender Pricing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to build structured price submissions with materials and labour breakdown. Export
                  to PDF for professional tender submissions. See also the{' '}
                  <SEOInternalLink href="/quote-writing-guide">quote writing guide</SEOInternalLink>{' '}
                  for domestic and smaller commercial jobs.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">RAMS and H&S Documentation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate professional Risk Assessments and Method Statements with the Elec-Mate
                  RAMS generator. Build a library of activity-specific RAMS that you can customise
                  for each tender — saving hours per submission and improving quality.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win more commercial electrical tenders with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for professional quoting, RAMS generation, and business management. Build better tender submissions in less time. 7-day free trial."
          icon={Briefcase}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function TenderWritingElectricianPage() {
  return (
    <GuideTemplate
      title="How to Write Electrical Tenders UK | Winning Tender Guide"
      description="How to price and write winning tenders for commercial electrical contracts. Prelims, labour rates, materials markup, programme, H&S documentation, NEC/JCT contracts, and common mistakes that lose tenders."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={FileText}
      heroTitle={
        <>
          How to Write Electrical Tenders:{' '}
          <span className="text-yellow-400">Winning Commercial Work in the UK</span>
        </>
      }
      heroSubtitle="A complete guide to pricing and writing winning tenders for commercial electrical contracts — prelims, labour rates, materials markup, programme, H&S documentation, NEC4 and JCT contracts, and the common mistakes that lose tenders before the price is even read."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Tender Writing"
      relatedPages={relatedPages}
      ctaHeading="Build Professional Electrical Tenders with Elec-Mate"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for structured quoting, RAMS generation, and business management tools. 7-day free trial, cancel anytime."
    />
  );
}
