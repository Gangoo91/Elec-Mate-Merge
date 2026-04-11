import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileText,
  PoundSterling,
  Users,
  ShieldCheck,
  AlertTriangle,
  Building2,
  ClipboardList,
  CheckCircle,
  Briefcase,
  Scale,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business Guides', href: '/guides/business' },
  { label: 'Electrical Subcontracting Guide', href: '/subcontracting-guide' },
];

const tocItems = [
  { id: 'what-is-subcontracting', label: 'What Is Electrical Subcontracting?' },
  { id: 'finding-main-contractors', label: 'Finding Main Contractors' },
  { id: 'chas-constructionline', label: 'CHAS and Constructionline' },
  { id: 'pricing-to-win', label: 'Pricing to Win Subcontract Work' },
  { id: 'direct-vs-labour-only', label: 'Direct vs Labour-Only Subcontracting' },
  { id: 'cis-deductions', label: 'CIS Tax Deductions' },
  { id: 'protecting-payment', label: 'Protecting Payment — Construction Act 1996' },
  { id: 'subcontract-agreements', label: 'Subcontract Agreements' },
  { id: 'for-electricians', label: 'Tools for Subcontractors' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "The Housing Grants, Construction and Regeneration Act 1996 (as amended) gives every electrical subcontractor the right to interim payments at intervals of not less than 28 days, the right to suspend work for non-payment after seven days' notice, and the right to refer any payment dispute to adjudication.",
  'CIS (Construction Industry Scheme) deductions apply to most electrical subcontracting work. Registered subcontractors have 20 per cent deducted at source; unregistered subcontractors have 30 per cent deducted. Register with HMRC before starting subcontract work.',
  'CHAS accreditation and Constructionline registration are the most widely accepted pre-qualification credentials in the UK construction sector. Without at least CHAS, most national main contractors will not add you to their supply chain.',
  'Labour-only subcontracting (you supply labour; the main contractor supplies materials) carries lower risk but lower margin. Direct subcontracting (you supply materials and labour) carries higher margin but more commercial risk.',
  'Never start subcontract work without a signed subcontract agreement or at minimum a written order. Verbal agreements are very difficult to enforce and leave your payment rights unprotected.',
];

const faqs = [
  {
    question: 'How do I find main contractors to subcontract electrical work to?',
    answer:
      "The most effective routes to finding main contractors are: trade bodies (the ECA and NICEIC both have contractor directories and networking events); regional construction associations (e.g. Constructing Excellence regional clubs); attending supply chain events organised by major contractors (Willmott Dixon, Wates, Kier, and others regularly hold supply chain days); Constructionline and Approved Contractors registers (main contractors search these directly); direct marketing (researching active projects on the Planning Portal and approaching the main contractor before they go to tender); and referrals from existing contacts. Cold approaches to main contractors' procurement teams are far less effective than networking or coming through a recognised framework.",
  },
  {
    question: 'What is CHAS and do I need it?',
    answer:
      "CHAS (Contractors Health and Safety Assessment Scheme) is a pre-qualification accreditation that assesses your health and safety management against a standard set of criteria. It is one of the most widely recognised schemes in UK construction and is accepted by the vast majority of main contractors as evidence of H&S competence. Without CHAS or an equivalent (Safe Contractor, Constructionline Health and Safety), most national main contractors will not place you on their supply chain register. CHAS accreditation costs from around £300 per year for a sole trader and requires submission of your health and safety policy, risk assessments, employer's liability insurance, and other documentation.",
  },
  {
    question: 'What is the Construction Industry Scheme (CIS) and how does it affect me?',
    answer:
      'The Construction Industry Scheme (CIS) requires main contractors (and other contractors who pay subcontractors for construction work) to deduct tax at source from payments to subcontractors and pay it directly to HMRC. If you are a registered CIS subcontractor, the deduction rate is 20 per cent of labour (materials are exempt from deduction). If you are unregistered, the rate is 30 per cent. You reclaim the deducted tax through your tax return or as a credit against PAYE if you have employees. Register as a CIS subcontractor through HMRC before you invoice any main contractor — deductions at 30 per cent significantly affect your cashflow.',
  },
  {
    question: 'What payment rights do I have as an electrical subcontractor?',
    answer:
      "The Housing Grants, Construction and Regeneration Act 1996 (as amended by the Local Democracy, Economic Development and Construction Act 2009) gives you: the right to interim payments at intervals of not less than 28 days; the right to receive a payment notice within five days of the payment due date, or to issue your own payment notice (a default payment notice) if the payer fails to issue one; the right to receive a pay less notice at least seven days before the final date for payment if the payer intends to pay less than the notified amount; the right to suspend work if payment is not made by the final date, after giving seven days' written notice; and the right to refer any payment dispute to adjudication (a statutory right that cannot be contracted out of).",
  },
  {
    question:
      'What is the difference between direct subcontracting and labour-only subcontracting?',
    answer:
      'In a direct subcontract, you supply both materials and labour. You take responsibility for procurement, material costs, and delivery risk. Your margin is higher because you earn on both materials and labour, but your commercial exposure is greater. In a labour-only subcontract, the main contractor supplies all materials; you supply only labour. This reduces your financial risk (no material procurement, no price exposure) but your margin is lower because you only earn on your labour. Labour-only subcontractors are paid a lower rate per hour than direct subcontractors because the main contractor carries the material cost. Both forms are common in electrical subcontracting.',
  },
  {
    question: 'What should my subcontract agreement include?',
    answer:
      'A subcontract agreement should include: the scope of works; the contract sum and payment schedule; the contract conditions (usually the main contract back-to-back, or a standard form such as the ECA Domestic Subcontract); retention terms (typically 3 to 5 per cent, released in two halves at practical completion and end of defects liability period); the programme and access dates; variations procedure; notification requirements (particularly important under NEC contracts); insurance requirements; CDM duties; and dispute resolution (adjudication under the Construction Act). Never sign a subcontract that contains pay-when-paid clauses (prohibited under the Construction Act except in contractor insolvency), unlimited liability clauses, or time-bar clauses that are tighter than the statutory minimums without taking legal advice.',
  },
  {
    question: 'How do I price competitively for subcontract electrical work?',
    answer:
      'Pricing for subcontract work requires a different approach to domestic quoting. You need to account for: your all-in labour rate (base rate plus all oncosts); materials at net cost plus your markup; preliminary costs specific to your scope (site attendance, testing equipment, management time for site meetings); a programme float to reflect real site conditions; and a risk allowance for scope ambiguity. Check the main contract conditions before pricing — particularly liquidated damages (LDs) clauses, which flow down to subcontracts and can significantly increase your risk. Submit tender queries in writing before the deadline on anything unclear.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tender-writing-electrician',
    title: 'Tender Writing Guide',
    description: 'How to price and write winning tenders for commercial electrical contracts.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/quote-writing-guide',
    title: 'Quote Writing Guide',
    description:
      'Professional quote structure and pricing strategy for domestic and commercial work.',
    icon: ClipboardList,
    category: 'Guide',
  },
  {
    href: '/contract-templates-electrician',
    title: 'Contract Templates',
    description: 'What to include in electrical contractor agreements and customer contracts.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/electrical-framework-contracts',
    title: 'Framework Contracts',
    description: 'Getting on local authority and NHS approved contractor lists.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/health-safety-audit-electrician',
    title: 'H&S Audit Guide',
    description: 'CDM 2015, RAMS, CHAS, and H&S documentation for electrical contractors.',
    icon: ShieldCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-subcontracting',
    heading: 'What Is Electrical Subcontracting?',
    content: (
      <>
        <p>
          Electrical subcontracting means carrying out electrical work for a main contractor or
          specialist contractor rather than directly for a building owner. The main contractor holds
          the primary contract with the client and subcontracts specialist trades — including
          electrical — to specialist firms.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Advantages of subcontracting</strong> — regular volume of work from
                established clients; less time spent on marketing and quoting; access to larger
                projects than you could win directly; simplified administration (the main contractor
                manages the client relationship); opportunities to build long-term supply chain
                relationships.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Disadvantages</strong> — lower margin than direct-to-client work; payment
                can be slower (main contractor payment terms are typically 30 to 45 days); exposure
                to main contractor insolvency; less control over programme and site conditions;
                complex contract conditions with significant liability clauses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who uses subcontractors?</strong> — national and regional main contractors
                (Wates, Willmott Dixon, Vistry, Galliford Try, Morgan Sindall and others), M&amp;E
                management contractors, specialist M&amp;E contractors who subcontract installation
                to smaller firms, housing developers, and facilities management companies.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-main-contractors',
    heading: 'Finding Main Contractors Who Need Electrical Subcontractors',
    content: (
      <>
        <p>
          Getting on main contractor supply chains requires a proactive approach. Main contractors
          do not typically advertise for subcontractors in the way clients advertise for contractors
          — you need to make yourself known before the work exists.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Constructionline and Achilles</strong> — the leading supply chain databases
                used by main contractors to find and vet subcontractors. Registration gives you
                visibility to hundreds of main contractors searching for electrical subcontractors
                in your region. Constructionline Silver is the minimum acceptable level for most
                national contractors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply chain days</strong> — major contractors regularly hold regional
                supply chain events where subcontractors can meet procurement teams. Sign up for
                notifications from contractors who are active in your area. The Electrical
                Contractors' Association (ECA) often promotes these events to members.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Planning Portal research</strong> — identify projects with planning
                permission in your area and research who the main contractor is likely to be.
                Approach their procurement team before tendering begins. Early engagement
                significantly improves your chances of being invited to tender.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Trade bodies and networking</strong> — ECA regional groups, NICEIC
                contractor events, and local construction industry groups are all routes to meeting
                main contractor procurement staff. In-person relationships remain one of the most
                effective ways to get on tender lists.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'chas-constructionline',
    heading: 'CHAS, Constructionline, and Pre-Qualification',
    content: (
      <>
        <p>
          Pre-qualification credentials are the gatekeepers to main contractor supply chains.
          Without the right accreditations, you will not be invited to tender regardless of your
          technical ability. These are the most important ones to obtain.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CHAS</strong> — Contractors Health and Safety Assessment Scheme. Accepted by
                over 50,000 buyers in UK construction. Annual fee from approximately £300 for sole
                traders. Required: H&amp;S policy, risk assessments, employer's liability insurance,
                public liability insurance, method statements for key activities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Constructionline</strong> — a supply chain management and pre-qualification
                database. Silver level adds financial assessment and quality management to the CHAS
                health and safety requirements. Gold level adds an onsite audit. Most national
                contractors require Constructionline Silver as a minimum.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe Contractor</strong> — an alternative H&amp;S accreditation to CHAS,
                operated by Alcumus. Widely accepted by facilities management contractors, housing
                associations, and retail sector clients. Some clients specify Safe Contractor rather
                than CHAS — check client requirements before applying.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ISO 9001</strong> — quality management system certification. Required by
                some public sector frameworks and larger private sector clients. More expensive and
                time-consuming to obtain but opens significant additional procurement opportunities.
                Often required above a certain contract value threshold.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The{' '}
          <SEOInternalLink href="/health-safety-audit-electrician">
            H&amp;S audit guide
          </SEOInternalLink>{' '}
          covers the documentation you need to assemble for CHAS and Constructionline accreditation,
          including RAMS templates and CDM 2015 compliance.
        </p>
      </>
    ),
  },
  {
    id: 'pricing-to-win',
    heading: 'Pricing to Win Subcontract Electrical Work',
    content: (
      <>
        <p>
          Subcontract pricing requires the same discipline as direct tendering but with additional
          consideration of the main contract conditions that flow down to your subcontract.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Read the main contract conditions</strong> — liquidated damages (LDs)
                clauses in the main contract typically flow down to subcontracts. If the main
                contractor faces LDs of £5,000 per day for late completion, they may seek to pass
                these to you if delay is in your section. Price this risk explicitly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retention</strong> — most subcontracts include retention (typically 3 to 5
                per cent) held until practical completion (half released) and end of defects
                liability period (balance released). Price retention costs into your tender — you
                are effectively financing the retention amount.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Programme risk</strong> — subcontractors often bear programme risk from
                delays caused by other trades or the main contractor's programme management. Include
                a programme risk allowance and use the notification provisions in the contract
                (compensation events under NEC, extension of time under JCT) to protect your
                position when delays occur.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For detailed guidance on building your tender price, see the{' '}
          <SEOInternalLink href="/tender-writing-electrician">
            electrical tender writing guide
          </SEOInternalLink>
          , which covers prelims, labour rates, materials markup, and programme pricing in detail.
        </p>
      </>
    ),
  },
  {
    id: 'direct-vs-labour-only',
    heading: 'Direct Subcontracting vs Labour-Only Subcontracting',
    content: (
      <>
        <p>
          The distinction between direct and labour-only subcontracting affects your pricing, your
          CIS obligations, your VAT position, and your commercial risk exposure.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Direct subcontracting</strong> — you supply materials and labour. You earn
                margin on both. You manage procurement, carry material price risk, and are
                responsible for delivery. VAT applies to the full contract value (materials and
                labour). CIS deductions apply to the labour element only (verified by the gross
                amount less the cost of materials, as evidenced by invoices).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Labour-only subcontracting</strong> — you supply labour only; the main
                contractor supplies materials. Lower margin but lower risk. CIS deductions apply to
                the whole payment (since there are no materials to deduct). Domestic reverse charge
                VAT applies if both you and the main contractor are VAT-registered and the main
                contractor is not the end client — this is a common compliance issue that electrical
                subcontractors get wrong.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic reverse charge VAT</strong> — since March 2021, the domestic
                reverse charge applies to most subcontract electrical work between VAT-registered
                businesses in the construction sector. If the reverse charge applies, you do not
                charge VAT on your invoice — the main contractor self-accounts for the VAT. Get
                advice from an accountant familiar with construction VAT before issuing your first
                subcontract invoice.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cis-deductions',
    heading: 'CIS Tax Deductions — What Electrical Subcontractors Must Know',
    content: (
      <>
        <p>
          The Construction Industry Scheme (CIS) is administered by HMRC and applies to almost all
          payments from contractors to subcontractors for construction work, including electrical
          installation. Non-compliance with CIS carries significant penalties.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Register before you start</strong> — register as a CIS subcontractor with
                HMRC before receiving your first subcontract payment. A registered subcontractor has
                20 per cent deducted; an unregistered subcontractor has 30 per cent deducted. The
                deduction is a prepayment of tax — it does not mean you pay tax twice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gross payment status</strong> — once you meet HMRC's criteria (turnover
                threshold, tax compliance record), you can apply for gross payment status, meaning
                no CIS deduction is made from your payments. You then pay your tax directly through
                self-assessment. This significantly improves cashflow.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly statements</strong> — main contractors must provide a monthly CIS
                deduction statement showing the gross amount paid, the deduction made, and the net
                amount paid. Keep these statements — you need them to reclaim deductions through
                your tax return.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'protecting-payment',
    heading: 'Protecting Your Payment — Construction Act 1996',
    content: (
      <>
        <p>
          The Housing Grants, Construction and Regeneration Act 1996 (as amended by the Local
          Democracy, Economic Development and Construction Act 2009) gives electrical subcontractors
          powerful statutory rights that cannot be contracted out of. Know these rights — they are
          your most important financial protection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to interim payments</strong> — you are entitled to interim payments at
                intervals of not less than 28 days throughout the contract. The main contractor must
                issue a payment notice within five days of the payment due date specifying the
                amount they propose to pay.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Default payment notice</strong> — if the main contractor fails to issue a
                payment notice, you can issue your own (a "payee's payment notice" or "default
                payment notice") for the amount you consider due. This becomes the notified sum and
                must be paid by the final date for payment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pay less notice</strong> — a main contractor who intends to pay less than
                the notified sum must issue a pay less notice at least seven days before the final
                date for payment. Without a valid pay less notice, the full notified sum is due.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Suspension</strong> — if the main contractor fails to pay by the final date
                for payment, you have the right to suspend work after giving seven days' written
                notice. Suspension is a powerful remedy — use it as a last resort but know that you
                have the right.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Adjudication</strong> — any dispute under a construction contract can be
                referred to adjudication at any time. An adjudicator's decision is binding and
                enforceable immediately (it can be enforced through the courts within weeks). This
                is the fastest and most cost-effective way to resolve payment disputes.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Pay-when-paid clauses (where the main contractor only pays you when the client pays them)
          are prohibited under the Construction Act, except in the event of the client's insolvency.
          If a main contractor tries to include such a clause in your subcontract, it is
          unenforceable.
        </p>
      </>
    ),
  },
  {
    id: 'subcontract-agreements',
    heading: 'Subcontract Agreements — What to Look Out For',
    content: (
      <>
        <p>
          Never start work without a signed subcontract or at minimum a written order. The
          subcontract governs your rights and obligations — signing one that contains onerous
          clauses can make financially sound projects into loss-making ones.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unlimited liability clauses</strong> — some main contractor subcontracts
                attempt to make you liable for all consequential losses arising from your default.
                For an electrical subcontractor, this could mean liability for the main contractor's
                liquidated damages, loss of profit, and client claims. Resist or cap your liability.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Short notification time bars</strong> — some contracts require you to notify
                compensation events or variations within a very short period (14 days or less) on
                pain of losing your entitlement. Read these provisions carefully and set up a system
                to notify in time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design responsibility</strong> — some subcontracts include design
                obligations (design of containment systems, cable sizing, circuit protection). If
                you accept design responsibility, you need professional indemnity insurance. If you
                did not quote a design fee, raise this before signing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retention release conditions</strong> — check what triggers retention
                release. Some contracts tie retention to the main contract practical completion and
                defects certificate rather than your section. This can mean waiting years for your
                retention.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The ECA (Electrical Contractors' Association) publishes a standard domestic subcontract
          form and provides members with contract advice. Membership is worth considering if you
          intend to build a significant subcontracting business.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Tools for Electrical Subcontractors',
    content: (
      <>
        <p>
          Running a successful electrical subcontracting business requires good administration:
          programme tracking, payment applications, variation records, and H&amp;S documentation.
          The right tools make this manageable without a dedicated office team.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Payment Applications and Invoicing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Track your subcontract payment applications and invoices with Elec-Mate. Set
                  reminders for payment due dates, record pay less notices received, and track
                  outstanding retentions. See also the{' '}
                  <SEOInternalLink href="/tender-writing-electrician">
                    tender writing guide
                  </SEOInternalLink>{' '}
                  for pricing your next subcontract bid.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">RAMS for Subcontract Tenders</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate professional RAMS documents for every activity in your subcontract scope
                  using the Elec-Mate RAMS generator. Build a library of pre-approved RAMS that you
                  can customise for each tender — the most time-efficient approach for contractors
                  tendering regularly.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your electrical subcontracting business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for professional quoting, RAMS generation, invoice management, and AI business support. 7-day free trial, cancel anytime."
          icon={Briefcase}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SubcontractingGuidePage() {
  return (
    <GuideTemplate
      title="Electrical Subcontracting Guide UK | How to Subcontract Electrical Work"
      description="How to find main contractors, get CHAS and Constructionline, price to win subcontract work, protect your payment rights under the Construction Act 1996, understand CIS deductions, and navigate direct vs labour-only subcontracting."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Users}
      heroTitle={
        <>
          Electrical Subcontracting Guide UK:{' '}
          <span className="text-yellow-400">How to Find Work and Protect Your Payment</span>
        </>
      }
      heroSubtitle="How to find main contractors, get CHAS and Constructionline, price winning subcontract bids, protect your payment rights under the Construction Act 1996, handle CIS deductions, and navigate direct vs labour-only subcontracting."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Subcontracting"
      relatedPages={relatedPages}
      ctaHeading="Manage Your Subcontracting Business with Elec-Mate"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for professional quoting, RAMS generation, and AI business support. 7-day free trial, cancel anytime."
    />
  );
}
