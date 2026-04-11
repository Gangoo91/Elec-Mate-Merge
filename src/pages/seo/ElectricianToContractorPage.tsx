import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Briefcase,
  PoundSterling,
  ShieldCheck,
  Wrench,
  TrendingUp,
  Users,
  FileCheck2,
  Calculator,
  GraduationCap,
  Star,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career Guides', href: '/guides/electrician-career-ladder-uk' },
  { label: 'Electrician to Contractor', href: '/guides/from-electrician-to-electrical-contractor' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'starting-out', label: 'Starting Out' },
  { id: 'first-jobs', label: 'Getting Your First Jobs' },
  { id: 'pricing', label: 'Pricing and Estimating' },
  { id: 'insurance', label: 'Essential Insurance' },
  { id: 'hiring', label: 'When to Hire Your First Employee' },
  { id: 'tendering', label: 'Tendering for Larger Work' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Setting up as a self-employed electrician requires Part P registration (NAPIT, NICEIC, or equivalent), public liability insurance (minimum £2m, usually £5m), and basic business administration setup.',
  'Essential insurance for self-employed and small electrical contractors includes Public Liability Insurance (PLI), Contractor All Risks, Professional Indemnity, and Employers Liability (£5m statutory minimum once you hire staff).',
  'Most electrical contractors find that hiring their first employee becomes viable when annual billings consistently exceed £120,000 to £150,000 — at which point the principal can no longer service the workload alone and the risk/reward of employing justifies the overhead.',
  'Accurate pricing is the single most important skill for a new electrical contractor. Underpricing kills businesses; overpricing loses jobs. Use a structured approach: materials at cost, labour at a rate that covers your costs plus profit, and a margin on the total.',
  'Growing a domestic electrical business requires a systematic approach to referrals, reviews, and local marketing — not just word of mouth. Professionalism in every customer interaction (quoting, certification, invoicing) compounds into reputation over time.',
];

const faqs = [
  {
    question: 'What do I need to set up as a self-employed electrician?',
    answer:
      'The minimum requirements to legally operate as a self-employed electrician in the UK are: register as self-employed with HMRC, join a Part P competent person scheme (NAPIT, NICEIC, ELECSA, or similar) if you intend to do notifiable domestic work, take out public liability insurance (minimum £2m, usually £5m for domestic work), have a basic business bank account, and have or obtain the necessary qualifications (18th Edition, relevant NVQ/SVQ Level 3, and a testing qualification if you will carry out EICRs). Beyond these basics, you will need a van (or access to a vehicle), tools, and sufficient start-up capital to cover materials for your first jobs before you are paid. Many electricians start working evenings and weekends for themselves while still employed, building up customer base and income before going full-time self-employed.',
  },
  {
    question: 'How do I get my first customers as a new electrical contractor?',
    answer:
      'The most effective methods for building a customer base as a new electrical contractor are: personal network — friends, family, and former colleagues are your first customers and your first source of referrals; estate agents and letting agents — offer competitive EICR pricing to build relationships that generate recurring work; online presence — a basic professional website and a Google Business Profile with your address and contact details are essential for appearing in local search results; review platforms — Checkatrade, Rated People, Trustpilot, and Google Reviews; local Facebook groups and Next-door for community-based word of mouth; and leaflet drops in target streets after completing a job in an area. Professionalism in every interaction — responding quickly, arriving on time, keeping customers informed, and producing professional documentation — is the single most powerful marketing tool for a trades business.',
  },
  {
    question: 'How should I price my electrical work?',
    answer:
      'Accurate pricing requires understanding your true cost base. The components of a properly priced electrical job are: materials (bought at trade prices — use a Trade Point or Rexel account), labour (your time, costed at a rate that covers your costs plus a reasonable profit — for a sole trader in 2026, a fully loaded labour rate of £200 to £350 per day is the usual range outside London, depending on work type and region), overhead (van costs, insurance, tools, accountancy, phone, scheme membership — typically £15,000 to £25,000 per year for a sole trader), and profit margin (on the total job price, not just materials — 15 to 25% net profit is a reasonable target for a healthy small electrical business). The most common pricing mistake by new contractors is failing to include overhead in their day rate — charging only for labour and materials without accounting for the cost of running the business.',
  },
  {
    question: 'What insurance do I need as a self-employed electrician?',
    answer:
      'Essential insurance for a self-employed electrician: (1) Public Liability Insurance (PLI) — covers third-party injury or property damage caused by your work. Minimum £2m, usually £5m for domestic work. Most scheme memberships (NICEIC, NAPIT) require you to hold PLI. (2) Contractor All Risks — covers your tools, equipment, and materials on site. Essential if you carry significant tool stock in your van. (3) Professional Indemnity Insurance — covers claims arising from errors in your advice or design (increasingly important as electricians take on more design responsibility, particularly for EV, solar PV, and battery storage). (4) Van insurance — commercial vehicle insurance for use in the course of your business (not covered by standard personal vehicle insurance). Tool and equipment insurance is usually added to the van policy or taken as a standalone. If you have employees, Employers Liability Insurance at a minimum of £5m is a legal requirement.',
  },
  {
    question: 'When should I hire my first employee?',
    answer:
      "The decision to hire your first employee is one of the most significant in a small electrical contractor's business development. The general rule of thumb is: hire when you are consistently turning down work because you cannot service the demand alone, and when your annual billings are at a level where the additional cost of an employee (salary, NI, pension, holiday pay, tools) is comfortably covered by the additional revenue they generate. For most electrical contractors, this point is reached at annual billings of £120,000 to £150,000. At this level, a competent electrician employee generating £80,000 to £100,000 of additional annual billing (above their cost) creates a viable business case. Before hiring, consider whether subcontracting is a better alternative — taking on a self-employed labourer or electrician on a job-by-job basis to manage demand peaks without the fixed overhead of employment.",
  },
  {
    question: 'How do I tender for larger commercial electrical work?',
    answer:
      'Tendering for larger commercial work (£10,000 to £100,000+ projects) requires: a professional company profile and track record (clients want evidence of similar completed projects); appropriate insurance (PLI up to £5m or £10m, professional indemnity, contractor all risks); scheme membership (NICEIC, NAPIT, or ECA membership); the ability to provide a full, itemised tender with labour, materials, and preliminaries clearly separated; CHAS, Constructionline, or equivalent supply chain accreditation (required by most main contractors and some public sector clients); RAMS (Risk Assessment and Method Statement) capability; and financial stability (some clients require accounts or a credit reference). Start by tendering for smaller commercial jobs (£5,000 to £30,000) to build a track record and develop your estimating accuracy before moving to larger work.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrician-career-ladder-uk',
    title: 'Electrician Career Ladder UK',
    description: 'Complete career progression from apprentice to electrical director.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-retirement-planning-uk',
    title: 'Electrician Retirement Planning',
    description: 'Pensions, business value, and planning for retirement as a contractor.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-salary-london',
    title: 'Electrician Salary in London',
    description: 'What self-employed electricians earn in London — rates and sectors.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Build professional quotes in minutes — win more work.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete installation certificates on site, on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/specialist-electrician-routes-uk',
    title: 'Specialist Electrician Routes',
    description: 'High-value specialist areas to differentiate your business.',
    icon: Star,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'From Electrician to Electrical Contractor: Building Your Own Business',
    content: (
      <>
        <p>
          Going from employed electrician to running your own electrical contracting business is one
          of the most common career moves in the trade — and one of the most financially rewarding
          for those who approach it systematically. The majority of small electrical contractors in
          the UK are former employed electricians who built their own customer base and business
          over time.
        </p>
        <p>
          The transition is not without risk. Irregular income, business administration overhead,
          chasing payments, pricing work accurately, and managing growth all require skills and
          disciplines that employment does not develop. But for electricians with strong technical
          skills, good customer manner, and a methodical approach to their business, self-employment
          or building a small electrical contracting company consistently delivers higher lifetime
          earnings than staying employed.
        </p>
        <p>
          This guide covers the practical steps: setting up correctly, getting your first customers,
          pricing work accurately, the essential insurance you must carry, and knowing when to hire.
        </p>
      </>
    ),
  },
  {
    id: 'starting-out',
    heading: 'Starting Out: The Legal and Practical Basics',
    content: (
      <>
        <p>
          Before taking your first job as a self-employed electrician, make sure the following
          foundations are in place:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Register as self-employed with HMRC</strong> — do this as soon as you start
                trading. You have until 5 October after the end of the tax year in which you first
                trade. Penalty for late registration can apply. Consider whether a limited company
                structure offers better tax efficiency — speak to an accountant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P competent person scheme</strong> — join NAPIT, NICEIC, ELECSA, or
                equivalent to self-certify notifiable domestic electrical work. Without scheme
                membership, you must notify every job to local building control, adding cost and
                delay. Annual fees range from approximately £300 to £1,000 depending on the scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — arrange cover before your first job. A
                minimum of £2m is typically required; £5m is more appropriate for domestic work and
                is required by many clients and main contractors. Annual cost: £300 to £700 for a
                sole trader.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Business bank account</strong> — keep business and personal finances
                separate from day one. This makes bookkeeping, VAT returns, and tax returns
                significantly easier and protects personal assets if trading as a limited company.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Van and commercial insurance</strong> — your vehicle must be insured for
                commercial use (carrying tools and equipment in the course of business). Standard
                personal vehicle insurance does not cover business use. Tool insurance can be added
                to most commercial vehicle policies.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Quote professionally from your first job"
          description="Elec-Mate gives new electrical contractors professional quoting, invoicing, and certificate tools — so you look established from day one. Start your 7-day free trial."
          icon={Briefcase}
        />
      </>
    ),
  },
  {
    id: 'first-jobs',
    heading: 'Getting Your First Jobs',
    content: (
      <>
        <p>
          Building a customer base takes time and consistency. The most effective approaches for a
          new electrical contractor:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Personal network first</h4>
                <p className="text-white text-sm leading-relaxed">
                  Start with people who already know and trust you. Family, friends, neighbours,
                  former colleagues. Do these jobs to an exceptional standard — every satisfied
                  customer in your personal network is your most effective marketing channel. A
                  personal recommendation converts at a far higher rate than any advertisement.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Star className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Online reviews and local listings</h4>
                <p className="text-white text-sm leading-relaxed">
                  Set up a Google Business Profile, Checkatrade listing, and Facebook business page.
                  Ask every satisfied customer to leave a Google review. A business with 20+
                  positive reviews and a 4.8-star rating converts significantly better than one with
                  no reviews. This compounds over time.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Briefcase className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Letting agents and estate agents</h4>
                <p className="text-white text-sm leading-relaxed">
                  A good relationship with two or three local letting agents generates consistent
                  EICR and remedial work. Visit in person, introduce yourself, leave a business
                  card, and follow up. Offer a competitive per-certificate rate and guaranteed fast
                  turnaround — these are the two things letting agents care about most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Pricing and Estimating Your Electrical Work',
    content: (
      <>
        <p>
          Accurate pricing is the most important skill in a small electrical contracting business.
          Too low and you cannot make a profit; too high and you lose the work. A structured
          approach to pricing removes guesswork:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — Calculate your annual overhead</strong>. Add up all fixed and
                variable costs: van (finance/lease/depreciation, insurance, fuel, servicing, road
                tax), tools (purchase and replacement), scheme membership, insurance, accountancy,
                phone and broadband, professional subscriptions, marketing. Divide by the number of
                billable days you expect per year (typically 200 to 220 for a sole trader). This
                gives your overhead cost per day.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — Set your labour rate</strong>. Add your desired annual salary
                (before tax) to your annual overhead, divide by billable days. This is your
                break-even day rate. Add your profit margin target (15 to 25%) to get your selling
                day rate. In 2026, a well-run sole trader in most UK regions should be achieving a
                selling day rate of £250 to £400+ depending on location and work type.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — Price materials at cost plus margin</strong>. Add your trade price
                for materials plus a margin (typically 15 to 30%) to cover procurement time, waste,
                and the risk of price changes between ordering and invoicing. Never supply materials
                at cost — the material margin is a legitimate part of the job profit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4 — Add contingency and checking time</strong>. Most jobs contain
                unforeseen elements — add 10 to 20% contingency on the labour element of complex
                jobs (rewires, older properties, fault-finding). Include time for tidying up,
                testing, certification, and customer handover.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Build and send professional quotes in minutes"
          description="Elec-Mate's quoting app calculates materials, labour, and testing — producing professional PDF quotes sent directly from your phone. Win more work and get paid faster."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'insurance',
    heading: 'Essential Insurance for Electrical Contractors',
    content: (
      <>
        <p>
          Insurance is not optional for an electrical contractor. The consequences of working
          uninsured — a house fire traced to your installation, a client who trips over your cable
          run — can be financially catastrophic. The essential covers:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public Liability Insurance (PLI)</strong> — covers claims from third parties
                (clients, members of the public) for injury or property damage caused by your work.
                Minimum £2m; £5m is the standard for domestic electrical work. Most NICEIC and NAPIT
                registered contractors carry £5m as a minimum.
                <em>
                  {' '}
                  Legal minimum: none set by statute, but scheme membership usually requires it.
                </em>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contractor All Risks</strong> — covers your tools, materials, and equipment
                in transit, on site, and in your van. Claims for tool theft from vans are common.
                Most commercial van insurance policies offer tool cover as an add-on.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional Indemnity Insurance</strong> — covers claims arising from
                errors in your professional advice or design recommendations. Increasingly important
                as electricians take on more design responsibility (EV charging infrastructure,
                solar PV systems, battery storage). Minimum £500k; £1m recommended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employers Liability Insurance (ELI)</strong> — <em>legally required</em>
                as soon as you employ anyone (including part-time and temporary workers). Statutory
                minimum: £5m. Failure to hold ELI when employing staff is a criminal offence, with
                fines of up to £2,500 per day.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hiring',
    heading: 'When to Hire Your First Employee',
    content: (
      <>
        <p>
          The decision to hire your first employee is a major business milestone. The key indicators
          that it is time to hire:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual billings consistently above £120,000–£150,000</strong> — at this
                level, the additional cost of an employee (salary £28,000–£38,000, employer NI
                approximately £3,000–£4,500, pension, holiday, tools) is comfortably supportable
                from the additional revenue they generate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Turning down work regularly</strong> — if you are declining enquiries
                because you are fully booked, you are leaving revenue on the table. An employee who
                generates their own cost plus a margin transforms this into profit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Forward order book of 8–12 weeks</strong> — if you have consistent work
                booked 8 to 12 weeks ahead, you have the visibility to support an employment
                commitment. Hiring on a shorter forward book is higher risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consider subcontracting first</strong> — before employing, consider engaging
                a self-employed electrician on a job-by-job basis to manage demand peaks. This gives
                flexibility without the fixed overhead of employment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When you hire, ensure you register as an employer with HMRC, set up RTI (Real Time
          Information) payroll reporting, arrange Employers Liability Insurance, and issue a written
          contract of employment within 1 day of employment starting (a legal requirement under the
          Employment Rights Act 1996 as amended).
        </p>
      </>
    ),
  },
  {
    id: 'tendering',
    heading: 'Tendering for Larger Commercial Work',
    content: (
      <>
        <p>
          Moving from domestic into commercial tendering opens access to higher-value contracts. The
          requirements for commercial tendering:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply chain accreditation</strong> — CHAS (Contractors Health and Safety
                Assessment Scheme), Constructionline, or Safe Contractor are required by most main
                contractors and public sector clients. Apply for CHAS as a first step — it covers
                health and safety, insurance, and business compliance in a single audit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RAMS capability</strong> — commercial clients and main contractors require
                Risk Assessment and Method Statements (RAMS) for all notifiable work. Invest time in
                developing standard RAMS templates for your common work types.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tender document quality</strong> — a professional, detailed tender with
                itemised labour, materials, and preliminaries wins more than an equivalent price
                submitted on a handwritten quote. Use your quoting software to produce a
                professional document.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>References and portfolio</strong> — keep records of completed commercial
                projects with photographs, client contact details for references, and copies of the
                electrical completion documentation. This builds the evidence base that wins the
                next contract.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianToContractorPage() {
  return (
    <GuideTemplate
      title="From Electrician to Electrical Contractor UK | Complete Business Guide"
      description="How UK electricians go self-employed and build a contracting business — Part P registration, pricing, essential insurance (PLI £2m min, ELI £5m statutory), when to hire your first employee, and tendering for commercial work."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Briefcase}
      heroTitle={
        <>
          From Electrician to Contractor:{' '}
          <span className="text-yellow-400">Building Your Own Electrical Business</span>
        </>
      }
      heroSubtitle="The practical guide to going self-employed and building a successful electrical contracting business — from your first job to hiring your first employee and tendering for commercial work."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Starting an Electrical Contracting Business"
      relatedPages={relatedPages}
      ctaHeading="Run Your Electrical Business Professionally from Day One"
      ctaSubheading="Elec-Mate gives electrical contractors professional quoting, on-site certification, and job management tools. 1,000+ UK electricians. 7-day free trial."
    />
  );
}
