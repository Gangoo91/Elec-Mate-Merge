import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Calculator,
  PoundSterling,
  ClipboardCheck,
  FileCheck2,
  Users,
  TrendingUp,
  Briefcase,
  Building2,
  Handshake,
  Globe,
  Search,
  Shield,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/how-to-get-first-electrical-customer' },
  { label: 'Commercial Work', href: '/guides/finding-commercial-electrical-work' },
];

const tocItems = [
  { id: 'overview', label: 'Why Go Commercial?' },
  { id: 'tender-websites', label: 'Tender Websites and Portals' },
  { id: 'networking', label: 'Networking and Relationships' },
  { id: 'fm-companies', label: 'FM Companies and Facilities' },
  { id: 'frameworks', label: 'Frameworks and Approved Lists' },
  { id: 'subcontracting', label: 'Subcontracting to Main Contractors' },
  { id: 'qualifications-needed', label: 'Qualifications and Accreditations' },
  { id: 'pricing-commercial', label: 'Pricing Commercial Work' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Commercial electrical work typically pays 20% to 40% more per hour than domestic work, but requires more accreditations, insurance, and admin. The trade-off is worth it if you manage the overhead.',
  'Tender websites (Contracts Finder, Find a Tender, MyTenders) list thousands of electrical contracts. Most small businesses never look at these — the competition for smaller contracts (under £50,000) is surprisingly low.',
  'FM (facilities management) companies are one of the best routes into regular commercial work. They need reliable local electricians for maintenance, call-outs, and small projects across their property portfolios.',
  'Subcontracting to a main contractor gets you onto commercial sites without needing to win the contract yourself. Start as a subcontractor, build your reputation, then bid directly.',
  'SSIP accreditation (SafeContractor, CHAS, Constructionline) is effectively mandatory for commercial work. Without it, you will not get past the pre-qualification stage on most tenders.',
];

const faqs = [
  {
    question: 'What qualifications do I need for commercial electrical work?',
    answer:
      'Beyond your standard electrical qualifications (City and Guilds 2391/2394/2395 or equivalent, and 18th Edition), commercial clients and main contractors typically require: SSIP accreditation (SafeContractor, CHAS, or Constructionline — from £300 to £600/year), CSCS card (ECS gold card for qualified electricians — £36), public liability insurance of at least £2 million (many clients require £5 million or £10 million), employers liability insurance if you have any employees, and professional indemnity insurance. Some clients also require ISO 9001 quality management certification, though this is usually only mandatory for larger contracts (above £100,000). NICEIC or NAPIT registration is expected as standard.',
  },
  {
    question: 'How do I find commercial tenders?',
    answer:
      'Start with free government portals: Contracts Finder (contracts above £12,000 from public sector bodies) and Find a Tender (larger contracts, formerly OJEU). For private sector tenders, use Constructionline (which doubles as an SSIP scheme and a tender portal), CompeteFor (free, especially active around major projects), and paid services like MyTenders or Tracker. Many local councils publish tenders on their own procurement portals — register with every council in your working area. Also check social housing associations, NHS trusts, and university procurement pages. Set up email alerts so you are notified immediately when relevant tenders are published.',
  },
  {
    question: 'What is an FM company and how do I get work from them?',
    answer:
      'An FM (facilities management) company manages buildings on behalf of their owners — offices, retail units, warehouses, schools, hospitals. Companies like Mitie, CBRE, Cushman and Wakefield, and hundreds of smaller regional FM firms need local electrical contractors for reactive maintenance (emergency call-outs), planned preventative maintenance (PPM — testing, inspection, lamp replacement), and small projects (office refits, additional circuits). To get on their books, contact the local branch or procurement team directly, provide your accreditations, insurance, and a company profile, and ask to be added to their approved supplier list. FM work provides steady, regular income — ideal alongside project work.',
  },
  {
    question: 'Should I subcontract or go direct to the client?',
    answer:
      'Start by subcontracting. Subcontracting to a main contractor means they win the contract, manage the client relationship, and coordinate the project — you provide the electrical labour and expertise. You get paid less than the end-client price (typically 15% to 25% less), but you avoid the overhead of tendering, project management, and client risk. As you build your reputation and accreditations, start bidding for smaller contracts directly. Many successful electrical businesses maintain a mix: subcontract on larger projects, go direct on smaller ones.',
  },
  {
    question: 'How much insurance do I need for commercial work?',
    answer:
      'The minimum for most commercial clients is £2 million public liability, but £5 million is increasingly standard and £10 million is required for larger contracts and main contractors. Employers liability of £10 million is a legal requirement if you have employees (including subcontractors on your payroll). Professional indemnity of £500,000 to £1 million is expected for design-and-install work. Increasing your public liability from £2 million to £5 million typically adds £100 to £200/year to your premium — a small cost compared to the work it unlocks. Always check the specific requirements in the tender documentation before bidding.',
  },
  {
    question: 'What is SSIP and why do I need it?',
    answer:
      'SSIP stands for Safety Schemes in Procurement. It is a mutual recognition scheme for health and safety pre-qualification. If you hold one SSIP-accredited scheme (such as SafeContractor, CHAS, or Constructionline), it is recognised by all other SSIP members. This means you only need one accreditation, not several. Most commercial clients and main contractors require SSIP accreditation as a minimum pre-qualification requirement — without it, your tender will be rejected before anyone reads it. SafeContractor costs from £300/year for a sole trader, CHAS from £350/year, and Constructionline from £300/year (Silver level, which includes SSIP). Apply well before you need it — the assessment can take 2 to 6 weeks.',
  },
  {
    question: 'How long does it take to break into commercial work?',
    answer:
      'Allow 6 to 12 months from deciding to pursue commercial work to landing your first contract. The first 2 to 3 months are spent getting accreditations, upgrading insurance, and building your company profile. The next 3 to 6 months involve registering on tender portals, contacting FM companies, networking, and submitting bids. Your first win may come from subcontracting or an FM company rather than a direct tender. Once you have 2 to 3 completed commercial projects and references, the pace accelerates significantly — references and track record are everything in commercial work.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-estimating-guide',
    title: 'Electrical Estimating Guide',
    description:
      'Price your commercial work correctly — labour rates, material markup, and contingency.',
    icon: Calculator,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-business-plan-template',
    title: 'Electrical Business Plan',
    description:
      'Financial projections and growth strategy for expanding into commercial work.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/health-safety-policy-electrician',
    title: 'Health and Safety Policy',
    description:
      'Template structure and legal requirements — essential for commercial accreditation.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-project-handover-guide',
    title: 'Project Handover Guide',
    description:
      'Documentation, client walkthroughs, and warranty — commercial clients expect thoroughness.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/hiring-first-employee-electrician',
    title: 'Hiring Your First Employee',
    description:
      'Scale your team for commercial contracts — PAYE, pensions, and true employment costs.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Professional electrical certificates for commercial installations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Go Commercial? The Numbers Make Sense',
    content: (
      <>
        <p>
          Domestic work is the bread and butter for most sole-trader electricians, but
          commercial electrical work offers higher day rates, longer projects, repeat
          business, and more predictable income. A domestic electrician might earn £200 to
          £350 per day. A commercial electrician on the same level of qualification can earn
          £280 to £450 per day.
        </p>
        <p>
          The barrier to entry is not skill — if you can wire a house to BS 7671, you can
          wire an office. The barrier is accreditation, insurance, and knowing where to find
          the work. This guide covers all three.
        </p>
        <p>
          You do not have to choose one or the other. Many successful electrical businesses
          maintain a mix of domestic and commercial work — domestic for quick cash flow,
          commercial for higher margins and steady contracts.
        </p>
      </>
    ),
  },
  {
    id: 'tender-websites',
    heading: 'Tender Websites and Portals',
    content: (
      <>
        <p>
          Tenders are formal invitations to bid on a contract. The client publishes the scope
          of work, specification, and deadline — you submit your price and credentials.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Contracts Finder (Free)</h4>
                <p className="text-white text-sm leading-relaxed">
                  Government-run portal listing all public sector contracts above £12,000.
                  Councils, NHS trusts, schools, MOD, housing associations. Search for
                  "electrical installation", "electrical maintenance", "periodic inspection".
                  Set up email alerts for your area and trade.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Constructionline (From £300/year)</h4>
                <p className="text-white text-sm leading-relaxed">
                  SSIP accreditation AND a tender portal in one. Over 10,000 buyers use
                  Constructionline to find contractors. Silver level includes SSIP
                  accreditation. Gold level adds additional certification. Registration also
                  gets you onto many main contractor approved lists automatically.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">CompeteFor (Free)</h4>
                <p className="text-white text-sm leading-relaxed">
                  Links businesses to contract opportunities from major projects. Particularly
                  active around large infrastructure and development projects. Free to register
                  and bid. Good for subcontracting opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'networking',
    heading: 'Networking and Building Relationships',
    content: (
      <>
        <p>
          Many commercial contracts — especially smaller ones — are never publicly tendered.
          They go to electricians the client already knows and trusts. Building relationships
          is how you access this hidden market.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Handshake className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Build relationships with builders and main contractors.</strong> Attend
                local construction networking events, join the Federation of Master Builders
                events, and contact local main contractors directly. Offer to be their go-to
                electrical subcontractor. Reliability wins more commercial work than price.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Handshake className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Connect with architects and building services consultants.</strong> They
                specify the electrical work and often recommend contractors to their clients.
                A good relationship with two or three local architectural practices can
                generate a steady stream of work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Handshake className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Join your local Chamber of Commerce.</strong> Membership is £100 to
                £500/year depending on your area. The networking events connect you with local
                business owners who need electrical work — office fit-outs, retail units,
                warehouses.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fm-companies',
    heading: 'FM Companies: Your Route to Regular Income',
    content: (
      <>
        <p>
          Facilities management companies manage buildings on behalf of their owners. They
          need local electrical contractors for three types of work:
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Reactive</h3>
            <p className="text-white text-sm leading-relaxed">
              Emergency call-outs: power failures, tripping RCDs, faulty lighting. Typically
              4-hour response. Rates: £50 to £80/hour plus materials, or fixed call-out fee
              of £120 to £200.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">PPM</h3>
            <p className="text-white text-sm leading-relaxed">
              Planned preventative maintenance: EICR testing, emergency lighting testing,
              PAT testing, lamp replacement schedules. Steady, predictable work — often on a
              12-month contract.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Small Projects</h3>
            <p className="text-white text-sm leading-relaxed">
              Office refits, additional circuits, lighting upgrades, EV charger installations.
              Quoted per job. Good margins if you price accurately.
            </p>
          </div>
        </div>
        <p>
          <strong>How to approach FM companies:</strong> Research which FM companies manage
          properties in your area (LinkedIn is useful for this). Contact their procurement
          or supply chain team. Provide your accreditations, insurance certificates, a company
          profile, and two or three references. Ask to be added to their approved supplier
          list. Follow up monthly until you get your first instruction.
        </p>
      </>
    ),
  },
  {
    id: 'frameworks',
    heading: 'Frameworks and Approved Supplier Lists',
    content: (
      <>
        <p>
          A framework agreement is a pre-qualification process. Once accepted, you can bid
          on contracts within the framework without going through full pre-qualification
          each time. This saves enormous amounts of admin.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white text-sm">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local council frameworks</strong> — many councils maintain frameworks for
                electrical work across their properties (schools, offices, social housing).
                Check your local council procurement pages for framework opportunities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Housing association frameworks</strong> — social housing providers need
                electrical contractors for rewires, testing, and upgrades. Large volumes,
                repeat work, predictable income. Register with housing associations in your area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>NHS Supply Chain</strong> — NHS trusts procure electrical work through
                frameworks. The pre-qualification is rigorous but the contracts are long-term
                and well-paid.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'subcontracting',
    heading: 'Subcontracting: Your First Step into Commercial',
    content: (
      <>
        <p>
          Subcontracting means working under a main contractor on their contract. They manage
          the client, the programme, and the overall project — you provide the electrical
          labour and expertise.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Advantages</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>No tendering or client management overhead</li>
              <li>The main contractor carries the project risk</li>
              <li>Access to sites and clients you could not reach alone</li>
              <li>Builds your commercial track record and references</li>
              <li>Steady work if you build a good relationship</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Watch Out For</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Payment terms: 30 to 60 days is common, some push to 90</li>
              <li>Retentions: 2.5% to 5% held for 6 to 12 months after completion</li>
              <li>Variations: get written approval for any extra work before doing it</li>
              <li>CIS (Construction Industry Scheme): tax deducted at source (20% or 30%)</li>
              <li>Programme pressure: you work to their schedule, not yours</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'qualifications-needed',
    heading: 'Qualifications and Accreditations for Commercial Work',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-3 text-white text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>SSIP accreditation (SafeContractor/CHAS/Constructionline)</span>
              <strong className="text-yellow-400">Essential</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>CSCS/ECS card</span>
              <strong className="text-yellow-400">Essential</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>NICEIC or NAPIT registration</span>
              <strong className="text-yellow-400">Essential</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Public liability insurance (£5M minimum)</span>
              <strong className="text-yellow-400">Essential</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Professional indemnity insurance</span>
              <strong className="text-yellow-400">Recommended</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Asbestos awareness training</span>
              <strong className="text-yellow-400">Essential (commercial sites)</strong>
            </div>
            <div className="flex justify-between pb-2">
              <span>ISO 9001 / ISO 14001</span>
              <strong className="text-yellow-400">Larger contracts only</strong>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'pricing-commercial',
    heading: 'Pricing Commercial Work',
    content: (
      <>
        <p>
          Commercial work is priced differently from domestic. Per-point pricing does not
          work — instead, use a detailed schedule of quantities or day rates.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4">Commercial Day Rates (2026)</h4>
          <div className="space-y-3 text-white text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Qualified electrician (sole trader, direct to client)</span>
              <strong className="text-yellow-400">£280 to £400/day</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Qualified electrician (subcontract to main contractor)</span>
              <strong className="text-yellow-400">£220 to £320/day</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Approved electrician (commercial/industrial specialist)</span>
              <strong className="text-yellow-400">£300 to £450/day</strong>
            </div>
            <div className="flex justify-between pb-2">
              <span>Electrician&apos;s mate (improver/labourer)</span>
              <strong className="text-yellow-400">£150 to £200/day</strong>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Take the First Step',
    content: (
      <>
        <p>
          Breaking into commercial work does not happen overnight, but the steps are clear:
          get your accreditations, register on tender portals, contact FM companies, and
          start building relationships with main contractors. The first contract is the
          hardest — after that, your track record does the selling.
        </p>
        <SEOAppBridge
          title="Manage commercial and domestic work in one place"
          description="Elec-Mate handles quoting, certification, invoicing, and job management for both domestic and commercial electrical work. 7-day free trial."
          icon={Building2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FindingCommercialWorkPage() {
  return (
    <GuideTemplate
      title="Finding Commercial Electrical Work UK 2026 | Contractor Guide"
      description="How to find commercial electrical work. Tender websites, FM companies, networking, frameworks, subcontracting, and the accreditations you need. Practical guide for UK electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          Finding Commercial Electrical Work:{' '}
          <span className="text-yellow-400">Higher Rates, Bigger Contracts</span>
        </>
      }
      heroSubtitle="Tender websites, FM companies, frameworks, and subcontracting — the practical routes into commercial electrical work for UK electricians. Accreditations, pricing, and how to land your first contract."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Commercial Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Manage Commercial Work Professionally"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for quoting, certification, and job management. Professional documentation that commercial clients expect. 7-day free trial, cancel anytime."
    />
  );
}
