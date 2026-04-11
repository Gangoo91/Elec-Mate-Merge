import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Scale,
  PoundSterling,
  Users,
  AlertTriangle,
  FileCheck2,
  Building2,
  CheckCircle2,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business Guides', href: '/guides/electrical-business-growth' },
  { label: 'Electrical Business Partnership', href: '/electrical-business-partnership' },
];

const tocItems = [
  { id: 'structures-compared', label: 'Partnership vs LLP vs Ltd' },
  { id: 'partnership-agreement', label: 'Partnership Agreement Essentials' },
  { id: 'profit-sharing', label: 'Profit Sharing' },
  { id: 'liability', label: 'Liability' },
  { id: 'registering-hmrc', label: 'Registering with HMRC' },
  { id: 'pros-cons', label: 'Pros and Cons for Electricians' },
  { id: 'dissolving', label: 'Dissolving a Partnership' },
  { id: 'for-electricians', label: 'Running the Partnership with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A standard general partnership in England and Wales has unlimited liability — each partner is personally liable for all the debts of the business, including debts incurred by the other partner.',
  'A Limited Liability Partnership (LLP) gives partners limited liability (similar to a limited company) while retaining the flexible profit-sharing and tax treatment of a partnership.',
  'A written partnership agreement is not legally required but is strongly recommended — without one, the Partnership Act 1890 applies, which may not reflect how you actually want to run the business.',
  'Both partners in a general partnership must register with HMRC as self-employed and file individual Self Assessment tax returns. The partnership itself also files a partnership tax return (SA800).',
  'Dissolving a partnership without a dissolution agreement can be costly and contentious — always agree an exit strategy in the partnership agreement before starting the business together.',
];

const faqs = [
  {
    question: 'What is the difference between a general partnership and an LLP?',
    answer:
      'In a general partnership, all partners are jointly and severally liable for all the debts of the business. If the partnership cannot pay its debts, creditors can pursue any partner personally — including for debts the other partner incurred without your knowledge. A Limited Liability Partnership (LLP) gives each partner limited liability: they are only liable for their own negligence or wrongdoing and the amount they have contributed. An LLP must be registered at Companies House and file annual accounts and a confirmation statement, which are publicly visible. The tax treatment of both structures is similar (partners pay income tax on their share of profit), but an LLP has more administrative requirements.',
  },
  {
    question: 'Do I need a written partnership agreement?',
    answer:
      'No — a partnership can exist without a written agreement, even informally. However, without one, the Partnership Act 1890 applies as default. Under the Act, profits are split equally regardless of capital contributed or hours worked, any partner can dissolve the partnership at any time by giving notice, and there are no provisions for what happens when a partner dies or becomes incapacitated. A written agreement allows you to set profit-sharing ratios, decision-making rights, capital contribution rules, and exit procedures that actually reflect your intentions.',
  },
  {
    question: 'How do we split profits in an electrical partnership?',
    answer:
      'Profit splitting arrangements should be set out in the partnership agreement. Common approaches for electricians include: equal split (straightforward, works well when both partners contribute equally); capital contribution-based split (partners who invested more capital receive a higher share); work-based split (each partner draws a salary from the business before the remainder is split); and a combination model (fixed "salary" drawings, then surplus profits split by agreed ratio). Whatever you agree, the split should reflect the actual economic contribution of each partner and be reviewed regularly as the business grows.',
  },
  {
    question: 'How does a partnership register with HMRC?',
    answer:
      'Each partner must register with HMRC as self-employed by 5 October following the end of the first tax year in which they had self-employment income. The partnership itself must also register a nominated partner to file the annual Partnership Tax Return (SA800). The SA800 shows the total income and expenses of the partnership; each partner then includes their share of the profit on their individual Self Assessment return (SA100). There is no separate partnership tax — each partner pays income tax and Class 4 National Insurance on their share of profit via Self Assessment.',
  },
  {
    question:
      'What happens to scheme registrations (NICEIC/NAPIT) when two electricians partner up?',
    answer:
      'Scheme registrations are typically held by the business (as an entity) rather than just an individual. When you form a partnership, you will generally need to notify your scheme body of the change in business structure and re-register the partnership. This usually involves an assessment of the new business, confirmation that all responsible persons (partners) are competent, and payment of the registration fee. Do not assume your existing sole trader registration automatically transfers — check with your scheme body before starting trading as a partnership.',
  },
  {
    question: 'Can one partner leave the partnership without dissolving the whole business?',
    answer:
      'This depends entirely on what the partnership agreement says. Under the Partnership Act 1890, any change in partners technically dissolves the old partnership and creates a new one. A well-drafted partnership agreement will include provisions for a departing partner — how their share is valued, how it is paid out (lump sum, instalments), and how the remaining partner(s) can continue the business. Without these provisions, the departing partner can demand immediate dissolution and their share of the assets, which could force the sale of tools, vehicles, and other business assets.',
  },
  {
    question: 'Is a limited company better than a partnership for electricians?',
    answer:
      "A limited company (Ltd) offers limited liability, potential tax efficiencies (corporation tax at 25%, ability to pay dividends, and pension contributions through the company), and a more professional image for commercial clients. However, it requires more administration (Companies House filings, annual accounts, directors' responsibilities) and has less flexibility in profit distribution. Many electricians start as a partnership and convert to a limited company as the business grows. The right answer depends on your risk profile, projected profits, and how much administrative overhead you are willing to manage.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/hiring-electrical-apprentices',
    title: 'Hiring Electrical Apprentices',
    description: 'ESFA funding, JIB registration, and your responsibilities as an employer.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/managing-electrical-subcontractors',
    title: 'Managing Electrical Subcontractors',
    description: 'How to check competency, set up contracts, and manage subcontractor quality.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/electrical-salary-benchmarking',
    title: 'Electrician Salary Benchmarking',
    description: 'JIB grade rates, London weighting, and how to benchmark pay in 2025.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote jobs quickly on site and send professional PDFs to clients.',
    icon: FileCheck2,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'structures-compared',
    heading: 'Partnership vs LLP vs Limited Company: Which Is Right for You?',
    content: (
      <>
        <p>
          When two electricians decide to work together formally, there are three main legal
          structures to choose from: a general partnership, a Limited Liability Partnership (LLP),
          or a limited company. Each has different implications for liability, tax, and
          administration.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>General partnership</strong> — the simplest structure. No registration
                required (though you must notify HMRC). Partners pay income tax on their share of
                profits via Self Assessment. Unlimited personal liability for all business debts.
                The Partnership Act 1890 applies by default unless you have a written agreement.
                Best for smaller, lower-risk businesses between trusted parties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limited Liability Partnership (LLP)</strong> — must be registered at
                Companies House (£50 online registration). Partners have limited liability — they
                are not personally liable for the other partner's negligence or debts beyond their
                agreed contribution. Must file accounts and a confirmation statement at Companies
                House annually (publicly visible). Tax treatment is the same as a general
                partnership. Preferred for professional practices where one partner may not want to
                bear responsibility for the other's errors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limited company</strong> — separate legal entity from its shareholders.
                Directors and shareholders (who may be the same people) have limited liability.
                Corporation tax at 25% (or 19% on profits up to £50,000 under the small profits
                rate). More administrative obligations but potentially more tax-efficient at higher
                profit levels. Required for some commercial and public sector contracts.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For most electricians starting a working partnership, a general partnership with a good
          written agreement is the simplest starting point. If the business becomes more complex or
          turnover grows significantly, conversion to an LLP or limited company is straightforward.
        </p>
      </>
    ),
  },
  {
    id: 'partnership-agreement',
    heading: 'Partnership Agreement Essentials',
    content: (
      <>
        <p>
          A partnership agreement is the foundational document of your business relationship. Even a
          simple one covering the key points is far better than no agreement at all. Have a
          solicitor draft or review it — a few hundred pounds now can prevent tens of thousands of
          pounds in disputes later.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Business name and purpose</strong> — state the trading name, the nature of
                the business (electrical contracting), and the geographic area of operation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Capital contributions</strong> — how much each partner is contributing at
                the outset (cash, tools, vehicles) and whether interest is payable on capital
                accounts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Profit and loss sharing</strong> — the agreed ratio for sharing profits and
                losses. This can be different from the capital contribution ratio.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Decision-making</strong> — which decisions can each partner make alone
                (day-to-day operational decisions) and which require agreement of all partners
                (taking on significant debt, new partners, changes to the business).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Drawings and salary</strong> — how much each partner can draw from the
                business, and whether a fixed "salary" is paid before profit is calculated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Exit provisions</strong> — what happens when a partner wants to leave,
                retires, becomes incapacitated, or dies. How is their share valued and paid out?
                Does the other partner have right of first refusal?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-compete clause</strong> — to prevent a departing partner immediately
                setting up in competition and soliciting clients. Must be reasonable in scope and
                duration (typically 6 to 12 months within a defined geographic area).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'profit-sharing',
    heading: 'Profit Sharing Arrangements',
    content: (
      <>
        <p>
          Disagreements about money are the most common reason partnerships fail. Getting the
          profit-sharing arrangement right at the outset — and building in a review mechanism —
          prevents resentment as the business grows.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equal split</strong> — 50/50 is the default under the Partnership Act 1890
                and works well when both partners contribute equally in time, skill, and capital.
                Simple to administer but may cause friction if one partner consistently does more
                work or brings in more revenue.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Salary first, then profit share</strong> — both partners take an agreed
                "salary" from the business before profit is calculated. The remainder is then split
                by the agreed ratio. This approach rewards time worked and is more equitable when
                one partner works more hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Revenue-weighted split</strong> — each partner earns a commission on the
                revenue they bring in, with overheads shared equally. Works well when partners have
                very different client bases or specialisms (e.g., one focuses on domestic work, the
                other on commercial).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual review</strong> — build in a formal annual review of the profit
                split. As the business grows and roles evolve, the original arrangement may no
                longer reflect each partner's contribution. An agreed review mechanism prevents the
                conversation becoming confrontational.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'liability',
    heading: 'Liability in a General Partnership',
    content: (
      <>
        <p>
          The most significant risk of a general partnership is unlimited joint and several
          liability. Every partner is personally responsible for all the debts of the partnership,
          including debts incurred by the other partner without your knowledge.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Joint and several liability</strong> — if the partnership cannot pay a debt,
                the creditor can pursue either or both partners individually for the full amount.
                You can be held liable for work your partner did badly, materials they ordered, or a
                loan they took in the partnership name.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional indemnity insurance</strong> — essential to cover claims
                arising from negligent work. In a partnership, both partners need to be covered.
                Check that your PI policy covers the acts and omissions of both partners and any
                employees.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>LLP as the solution</strong> — if unlimited liability is a concern, an LLP
                is the obvious solution. Each partner is liable only for their own acts of
                negligence or fraud, not those of the other partner. An LLP also provides a cleaner
                structure if the partnership takes on employees or takes on more complex commercial
                work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'registering-hmrc',
    heading: 'Registering the Partnership with HMRC',
    content: (
      <>
        <p>
          Both partners must individually register as self-employed with HMRC. In addition, the
          partnership itself must be registered and a nominated partner must be designated to file
          the annual partnership tax return.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Register by 5 October</strong> — each partner must register with HMRC by 5
                October following the end of the first tax year in which they started trading. Use
                the SA400 form to register the partnership and SA401 to register as a partner. You
                can register online via your Government Gateway account.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unique Taxpayer Reference (UTR)</strong> — the partnership gets its own UTR,
                separate from the individual partners' UTRs. The nominated partner files the SA800
                Partnership Return using the partnership UTR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>VAT registration</strong> — if the partnership's combined turnover exceeds
                the VAT registration threshold (£90,000 from April 2024), the partnership must
                register for VAT. The partnership registers as a single entity, not the individual
                partners separately.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pros-cons',
    heading: 'Pros and Cons of a Partnership for Electricians',
    content: (
      <>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Advantages</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Shared workload — two electricians can take on more work and cover each other's
                holidays and sickness.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Complementary skills — one partner may excel at commercial work, the other at
                domestic, creating a more versatile business.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Shared capital — combined resources can fund larger tool purchases, a van, or a
                workshop without either partner overextending.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Simple setup — no Companies House registration required for a general partnership;
                HMRC registration only.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Disadvantages</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Unlimited liability — each partner is personally liable for all business debts,
                including those incurred by the other partner.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Shared decision-making — disputes can arise if partners have different views on
                pricing, growth, or work standards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Exit complexity — dissolving a partnership without a pre-agreed exit arrangement can
                be protracted and costly.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dissolving',
    heading: 'Dissolving a Partnership',
    content: (
      <>
        <p>
          All partnerships eventually come to an end, whether by mutual agreement, one partner
          leaving, retirement, or breakdown of the relationship. Having an exit procedure in the
          partnership agreement makes dissolution far less painful.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Valuing the business</strong> — agree upfront how the business will be
                valued if a partner leaves. Common methods include net assets (book value of assets
                less liabilities), goodwill (a multiple of average profit), or a third-party
                valuation. The method should be stated in the partnership agreement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notifying HMRC</strong> — when the partnership ends, notify HMRC, file a
                final partnership tax return (SA800), and each partner files their individual Self
                Assessment return for the final trading period. Do not forget to de-register for VAT
                if applicable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scheme registration</strong> — notify your scheme body (NICEIC, NAPIT, etc.)
                of the dissolution. The remaining electrician can re-register as a sole trader, or
                the new business structure can apply for registration in its own right.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Client notification</strong> — inform clients of the change in business
                structure, particularly those with ongoing contracts. Confirm which partner (or the
                new entity) will be responsible for fulfilling existing obligations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Running the Partnership with Elec-Mate',
    content: (
      <>
        <p>
          Once the partnership is up and running, shared visibility of jobs, certificates, and
          finances is essential. Elec-Mate's{' '}
          <SEOInternalLink href="/tools/job-scheduling">job scheduling</SEOInternalLink>,{' '}
          <SEOInternalLink href="/tools/electrical-quoting-app">quoting</SEOInternalLink>, and
          certificate tools give both partners real-time visibility of the business from their own
          phones.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Both Partners, One Business Account</h4>
                <p className="text-white text-sm leading-relaxed">
                  Both partners can access the same{' '}
                  <SEOInternalLink href="/tools/job-scheduling">Elec-Mate account</SEOInternalLink>,
                  see each other's scheduled jobs, issue certificates, and track invoices. No more
                  emailing each other spreadsheets.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificates in the Partnership Name</h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue all electrical certificates — EICRs, EICs, minor works — in the
                  partnership's trading name, with the correct scheme registration number.
                  Professional PDFs sent to clients directly from site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your electrical partnership with Elec-Mate"
          description="Job scheduling, electrical certificates, quoting, and invoicing for two-person electrical partnerships. Join 1,000+ UK electricians using Elec-Mate. 7-day free trial."
          icon={Building2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalBusinessPartnershipPage() {
  return (
    <GuideTemplate
      title="Electrical Business Partnership UK | Starting a Partnership with Another Electrician"
      description="Complete guide to starting an electrical business partnership in the UK. Partnership vs LLP vs Ltd company, partnership agreement essentials, profit sharing, unlimited liability risks, registering with HMRC, and how to dissolve a partnership."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          Electrical Business Partnership UK:{' '}
          <span className="text-yellow-400">Complete Setup Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about starting a partnership with another electrician — choosing the right structure, drafting a partnership agreement, splitting profits, managing unlimited liability, registering with HMRC, and planning your exit."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Business Partnerships"
      relatedPages={relatedPages}
      ctaHeading="Manage your electrical partnership with Elec-Mate"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for job scheduling, electrical certificates, quoting, and invoicing. 7-day free trial, cancel anytime."
    />
  );
}
