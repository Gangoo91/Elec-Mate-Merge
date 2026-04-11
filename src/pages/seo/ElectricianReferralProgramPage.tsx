import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Users,
  Star,
  PoundSterling,
  Search,
  Globe,
  TrendingUp,
  CheckCircle2,
  Building2,
  Handshake,
  BarChart3,
  ShieldCheck,
  FileCheck2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business Guides', href: '/guides/growing-electrical-business' },
  { label: 'Electrician Referral Programme', href: '/electrician-referral-programme' },
];

const tocItems = [
  { id: 'why-referrals', label: 'Why Referrals Are Your Best Source of Work' },
  { id: 'key-relationships', label: 'Key Trade Relationships to Build' },
  { id: 'referral-fees', label: 'Referral Fees — When and How' },
  { id: 'estate-agents', label: 'Estate Agents and Letting Agents' },
  { id: 'reciprocal-networks', label: 'Reciprocal Referral Networks' },
  { id: 'referral-cards', label: 'Referral Cards and Materials' },
  { id: 'tracking-referrals', label: 'Tracking Referral Jobs' },
  { id: 'for-electricians', label: 'Elec-Mate for Referral Management' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Referral work is the highest quality, lowest cost, and highest conversion rate source of new business for most UK electricians. Referred customers arrive pre-sold on your credibility and are less price-sensitive than cold enquiries.',
  'The most valuable referral relationships for electricians are with builders, kitchen and bathroom fitters, plumbers, and heating engineers — trades that regularly encounter customers needing electrical work.',
  'Formal referral fees (paying a fixed amount or percentage per referred job) are legal and common in the trades, but must be transparent to the end customer if required by professional standards. They work best with formal written agreements.',
  'Estate agents and letting agents are an underutilised source of steady referral work — they regularly need reliable electricians for EICR certificates, remedial work, and new-let electrical checks.',
  'Reciprocal referral networks — groups of non-competing trades who refer each other — are more sustainable than one-directional referral relationships. A group of five to ten trusted trades can generate significant work for everyone involved.',
  'Tracking referral sources in your job management system lets you identify your most valuable referral partners and invest in those relationships appropriately.',
];

const faqs = [
  {
    question: 'Is it legal to pay referral fees as an electrician in the UK?',
    answer:
      'Yes — paying referral fees to other tradespeople is legal in the UK. There is no general law prohibiting cash referral fees between businesses. However, transparency matters: if you are referred through a platform (Checkatrade, a franchise network, etc.), check their terms — some prohibit off-platform referral arrangements. NICEIC, NAPIT, and ELECSA do not prohibit referral fees between registered electricians and other tradespeople. If you are doing work for consumers under a regulated context (financial services, for example), different rules apply — but standard domestic electrical referrals are straightforward. Document referral arrangements in writing to avoid disputes.',
  },
  {
    question: 'How much should I pay as a referral fee for electrical work?',
    answer:
      'Common referral fee structures for UK electricians: fixed fee per job (£25–£100 depending on job size), percentage of job value (typically 5–10 per cent), or reciprocal referrals (no money changes hands — you refer each other instead). For smaller jobs (EICR, socket additions), a fixed fee of £25–£50 is typical. For larger jobs (rewires, consumer unit upgrades, EV charger installations), a percentage (5–8 per cent) is more appropriate. Agree the structure upfront and in writing. Pay promptly — a referral partner who has to chase you for their fee will stop referring work.',
  },
  {
    question: 'How do I approach a builder or plumber about setting up a referral arrangement?',
    answer:
      'Start with tradespeople you already know — existing working relationships are the easiest to formalise. For new contacts, meet in person (on a shared job site is ideal) and have a direct conversation: "I work with a lot of builders and we often need reliable [electrical/plumbing] work on our projects. Are you interested in setting up a referral arrangement? I\'d refer my customers to you and vice versa." Most tradespeople are receptive because they face the same challenge you do — finding reliable partners to refer when customers ask. Bring a referral card or written proposal to make it concrete.',
  },
  {
    question: 'Are estate agents worth approaching for electrical referrals?',
    answer:
      'Yes — estate agents and letting agents are an excellent source of steady referral work, particularly for EICR certificates, remedial work, and landlord electrical checks. The key is positioning yourself as reliable and professional, not just cheap. Letting agents deal with large portfolios and cannot afford unreliable electricians — they will pay a fair price for someone who shows up on time, issues certificates promptly, and is easy to communicate with. Approach the property manager or senior lettings negotiator, not the branch manager. Bring evidence of your NICEIC registration, sample EICR certificates (redacted), and your turnaround times.',
  },
  {
    question: 'How do I set up a reciprocal referral network with other trades?',
    answer:
      'Start with two or three trades you already trust and work alongside. The most natural complementary trades for electricians are: builders (general), plumbers, heating engineers, kitchen fitters, bathroom fitters, and decorators. Agree informally to refer each other when customers ask for those services. As the group grows, consider meeting monthly — breakfast networking (BNI-style) or informal lunch — to share referrals, discuss customer situations, and strengthen relationships. Some networks formalise with written referral agreements and fee structures; others stay informal. Both models work — the key is trust and consistency.',
  },
  {
    question: 'How do I track which jobs came from referrals?',
    answer:
      'Add a "referral source" field to your job intake process — whether that is your CRM, your job management app, or even a simple spreadsheet. When a new customer enquires, ask how they heard about you and record it. At the end of each month, review which referral sources generated the most work and the highest value jobs. This data lets you identify your most valuable referral partners and invest in those relationships (more contact, referral gifts, reciprocal referrals) while deprioritising relationships that generate little work.',
  },
  {
    question: 'Should I use a formal referral agreement or just do it informally?',
    answer:
      'For relationships with individual tradespeople, an informal verbal agreement often works fine when there is existing trust. For more significant arrangements — a letting agent referring multiple EICRs per month, or a builder referring rewires on large development projects — a written agreement protects both parties. Keep it simple: one page covering the referral fee structure, payment timing, what constitutes a qualifying referral, and how to end the arrangement. This is not a legal contract that needs solicitor involvement — a clearly written email exchange that both parties confirm is sufficient for most purposes.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/growing-electrical-business',
    title: 'Growing Your Electrical Business',
    description: 'From sole trader to small team — systems, hiring, and scaling.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/customer-reviews-electrician',
    title: 'Getting Customer Reviews',
    description:
      'The natural complement to a referral strategy — reviews that reinforce referrals.',
    icon: Star,
    category: 'Guide',
  },
  {
    href: '/seo-for-electricians',
    title: 'SEO for Electricians',
    description: 'Online visibility to complement your referral network.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/electrician-business-website',
    title: 'Electrician Website Guide',
    description: 'Where referred customers land — make sure it converts.',
    icon: Globe,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Elec-Mate Quoting App',
    description: 'Send professional quotes to referral leads within minutes.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-referrals',
    heading: 'Why Referrals Are Your Best Source of Work',
    content: (
      <>
        <p>
          Referral work is qualitatively different from cold enquiries. A customer referred by a
          trusted tradesperson arrives with a built-in recommendation — they are already predisposed
          to hire you. This manifests in three measurable ways: higher conversion rate (less time
          persuading), less price sensitivity (they are not shopping around as aggressively), and
          higher lifetime value (referred customers are more likely to become loyal repeat customers
          and refer others in turn).
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Handshake className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Near-zero acquisition cost</strong> — a referred customer costs you nothing
                beyond the referral fee (if applicable) and the relationship maintenance time you
                invest in the referring partner. Compare this to Google Ads (£4–£15 per click, 5–10
                per cent conversion rate) or Checkatrade (£600–£1,500/year subscription plus
                competition from other members).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Handshake className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Higher conversion rate</strong> — a cold online enquiry converts to a booked
                job at perhaps 20–30 per cent. A warm referral from a trusted tradesperson converts
                at 60–80 per cent. The difference in time and effort required to win each type of
                job is significant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Handshake className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-reinforcing</strong> — great work on a referred job generates reviews
                and further referrals. The customer refers you to their neighbour; the builder
                refers you on their next project. A referral network, once established, generates
                compounding returns over time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Most experienced electricians find that after five or more years in business, referrals
          generate the majority of their work. Building this network actively and systematically,
          rather than waiting for it to develop organically, accelerates the timeline significantly.
        </p>
      </>
    ),
  },
  {
    id: 'key-relationships',
    heading: 'Key Trade Relationships to Build',
    content: (
      <>
        <p>
          The most valuable referral relationships for electricians are with trades that regularly
          encounter customers who need electrical work. Here is a priority-ordered list with the
          rationale for each.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">Builders and general contractors</strong>
                <span>
                  Your most valuable referral source. Builders regularly need electricians for
                  extensions, loft conversions, kitchen renovations, and new builds. A relationship
                  with even one active local builder can generate 10–30 jobs per year. Builders
                  value reliability above all — show up when you say you will and do quality work,
                  and the referrals will follow.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">Kitchen and bathroom fitters</strong>
                <span>
                  Every kitchen and bathroom installation requires electrical work — new circuits,
                  socket relocation, fan installation, underfloor heating controls. Kitchen fitters
                  who have a reliable electrician to recommend stand out from those who leave
                  customers to find their own. This is an ideal reciprocal relationship — you
                  recommend their fitting work; they recommend your electrical work.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">Plumbers and heating engineers</strong>
                <span>
                  Boiler and heat pump installations require electrical connections and often
                  trigger consumer unit issues. Smart heating systems need electrical work. Plumbers
                  working in bathrooms often encounter electrical problems. A mutual referral
                  arrangement with two or three plumbers can generate consistent work in both
                  directions.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">EV charger and solar installers</strong>
                <span>
                  If you do not install EV chargers or solar PV yourself, build relationships with
                  specialists who do. They need reliable electricians for consumer unit upgrades,
                  supply capacity work, and remedial issues before installation. If you do install
                  EV chargers, reciprocal referrals with solar installers work well — customers with
                  solar often want EV chargers and vice versa.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'referral-fees',
    heading: 'Referral Fees — When Legal, When Not, and How to Structure Them',
    content: (
      <>
        <p>
          Referral fees between UK tradespeople are legal and common. Understanding how to structure
          them fairly protects both sides of the arrangement and ensures it lasts.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fixed fee per job</strong> — simplest structure. Agree a fixed amount per
                referred job that converts: £25–£50 for smaller jobs (EICR, socket additions),
                £75–£150 for mid-range jobs (consumer unit upgrades), £150–£300 for larger jobs
                (rewires, EV charger installations). Easy to administer and easy to explain.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Percentage of job value</strong> — 5–8 per cent of the invoiced job value.
                Works well when job values vary widely. Requires more administration — you must
                share invoice values with the referring party or agree on a reporting basis.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reciprocal referrals (no money)</strong> — you refer their services; they
                refer yours. No money changes hands. Works best when referral volumes are roughly
                equal between parties and both businesses value the arrangement similarly. Simpler
                to manage and avoids the need for invoice sharing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Document the arrangement</strong> — a simple email exchange confirming the
                structure, the fee amount, what constitutes a qualifying referral, and payment
                timing is sufficient. Pay within 14 days of receiving payment from the customer.
                Late payment damages referral relationships faster than anything else.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Note: if you carry out work under a domestic building contract regulated by the FMB or
          similar, check whether their codes of conduct place any restrictions on referral fee
          arrangements. For most informal trade-to-trade arrangements, no such restrictions apply.
        </p>
      </>
    ),
  },
  {
    id: 'estate-agents',
    heading: 'Estate Agents and Letting Agents — An Underutilised Source',
    content: (
      <>
        <p>
          Letting agents manage large property portfolios and have a constant need for reliable
          electricians. EICR certificates for new tenancies, remedial work from EICR findings, and
          electrical checks for properties going on the market are all steady, predictable work.
          Building one good letting agent relationship can be worth 20–50 jobs per year.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who to approach</strong> — the property manager or senior lettings
                negotiator, not the branch manager. Property managers deal with maintenance issues
                daily and have direct influence over which contractors they use. In larger agencies,
                there may be a dedicated maintenance coordinator.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>What they need from you</strong> — reliability (showing up when booked),
                prompt certificate issue (agents are chasing landlords who are waiting on
                certificates), professional communication (email confirmation, on-site arrival time
                updates), and competitive but not rock-bottom pricing. Agents who use the cheapest
                electrician available spend twice as much time managing problems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>How to approach them</strong> — call the office and ask for the property
                manager. Explain that you are a local{' '}
                <SEOInternalLink href="/tools/eicr-certificate">
                  NICEIC-registered electrician
                </SEOInternalLink>{' '}
                specialising in landlord EICR certificates and remedial work, that you issue
                certificates the same day, and that you would like to be added to their preferred
                contractor list. Offer a free EICR on one of their properties as an introduction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Preferred contractor agreements</strong> — some larger agencies require
                contractors to sign a preferred supplier agreement covering insurance levels,
                response times, and pricing. These are standard and worth accepting if the volume of
                work justifies it.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'reciprocal-networks',
    heading: 'Building a Reciprocal Referral Network',
    content: (
      <>
        <p>
          A reciprocal referral network is a group of non-competing trades who refer customers to
          each other. It is more sustainable than one-directional referral relationships because
          value flows in all directions — everyone benefits, so everyone is motivated to maintain
          the relationships.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ideal network composition</strong> — builder, electrician (you), plumber,
                heating engineer, kitchen fitter, decorator, tiler, joiner, and possibly a property
                surveyor or estate agent. Each member covers a different trade, minimising
                competition. Five to ten members is the ideal size — small enough to know each
                other, large enough to cover all the trades homeowners commonly need.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How to start</strong> — identify two or three trades you already trust from
                working alongside them. Have an explicit conversation: "I'm trying to build a small
                referral network with reliable local trades. When my customers need a plumber, I'd
                recommend you — and if yours need an electrician, I'd hope you'd send them to me.
                Would you be interested?" Most will say yes immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Formalise with a WhatsApp group</strong> — a WhatsApp group for the network
                makes referral sharing easy. Members can post: "Customer needs a plumber in [area] —
                who's available this week?" It also builds the relationships that make referrals
                feel natural rather than transactional.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quality control</strong> — only refer tradespeople whose work you are
                confident in. Your reputation is attached to every referral you make. If a plumber
                you referred does a poor job, the customer's frustration will partly reflect on you.
                Vet network members before referring them, even informally.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'referral-cards',
    heading: 'Referral Cards and Materials',
    content: (
      <>
        <p>
          Physical materials make the referral process easier and more memorable. When a customer
          asks your builder contact for an electrician recommendation, handing over a professional
          referral card is more effective than reciting a phone number.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Referral cards for partners</strong> — give each referral partner a stack of
                your business cards. Better still, print cards specifically for referral use:
                "Referred by [Partner Name] — call [your number] for [X% discount / priority
                booking]." This tracks the referral source and gives the customer an incentive to
                use the referral.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Digital sharing</strong> — a professional PDF brochure (one page, listing
                your services, qualifications, and contact details) that partners can forward via
                WhatsApp is increasingly effective. When a builder's customer asks for an
                electrician, the builder can forward your brochure instantly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Partner landing pages</strong> — if you have a website, consider creating a
                simple landing page for each major referral partner: "Referred by [Builder Name]?
                Here's what we do and how to get in touch." This makes the referral feel more
                premium and makes tracking easier (you can see which partner page generates the most
                traffic).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'tracking-referrals',
    heading: 'Tracking Referral Jobs — Knowing What Is Working',
    content: (
      <>
        <p>
          Without tracking, you cannot know which referral relationships are generating the most
          value. Simple tracking lets you invest more time in high-performing relationships and
          address or drop underperforming ones.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask every new customer "How did you hear about us?"</strong> — make this
                part of your intake process. Record the answer in your job management system or CRM.
                Over time, this data reveals your most valuable sources of work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly referral review</strong> — once a month, spend five minutes
                reviewing how many jobs came from each referral source and what their total value
                was. This takes seconds if you have been recording referral sources consistently.
                Identify your top three referral sources and think about how to strengthen those
                relationships.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thank your referral partners</strong> — when a referral partner sends you
                work, acknowledge it promptly. Let them know the customer contacted you, thank them
                personally, and pay any agreed referral fee immediately. Regular positive
                reinforcement keeps referral relationships active and motivates partners to refer
                more.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'How Elec-Mate Supports Your Referral Business',
    content: (
      <>
        <p>
          Referral business lives and dies on your reputation for professionalism and reliability.
          The trades and agents who refer work to you are vouching for you personally — your
          performance on every referred job reflects directly on them. Professional systems underpin
          professional performance.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Certificates That Impress Letting Agents
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    EICR certificates
                  </SEOInternalLink>{' '}
                  on site the same day, in PDF format, sent directly to the letting agent's inbox.
                  Agents who work with electricians that issue certificates promptly stick with them
                  for years — this is genuinely rare and highly valued.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Track Referral Sources in Your Job Records
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Record how each customer found you in Elec-Mate's job management system. Over
                  time, your referral data shows which relationships generate the most work and the
                  highest value jobs — so you know where to invest your relationship-building time.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional tools for a referral-worthy electrical business"
          description="Join 1,000+ UK electricians using Elec-Mate for quoting, invoicing, job management, and certification. Run the kind of professional operation that agents and builders are proud to refer. 7-day free trial."
          icon={Users}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianReferralProgramPage() {
  return (
    <GuideTemplate
      title="Electrician Referral Programme UK | Building a Referral Network"
      description="How to build a referral network as a UK electrician — relationships with builders, plumbers, kitchen fitters, and estate agents; referral fee structures; reciprocal networks; and tracking referral jobs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Handshake}
      heroTitle={
        <>
          Electrician Referral Programme UK:{' '}
          <span className="text-yellow-400">Building Your Referral Network</span>
        </>
      }
      heroSubtitle="A practical guide to building a referral network as a UK electrician — relationships with builders, plumbers, kitchen fitters, and estate agents; how referral fees work; reciprocal networks; and tracking which sources generate your best work."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Referral Programmes"
      relatedPages={relatedPages}
      ctaHeading="Be the Electrician Every Trade Wants to Refer"
      ctaSubheading="Elec-Mate helps UK electricians deliver the professional, reliable service that generates referrals — same-day certificates, fast quotes, and organised job records. 7-day free trial."
    />
  );
}
