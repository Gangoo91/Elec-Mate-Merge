import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Briefcase,
  PoundSterling,
  CheckCircle2,
  FileText,
  ClipboardCheck,
  AlertTriangle,
  ShieldCheck,
  Building,
  Handshake,
  Calculator,
  Receipt,
  Scale,
} from 'lucide-react';

export default function ElectricalSubcontractingGuidePage() {
  return (
    <GuideTemplate
      title="Electrical Subcontracting Guide | Working for Main Contractors"
      description="Complete guide to electrical subcontracting in the UK. Covers finding subcontract work, pricing subcontract jobs, CIS obligations, payment terms, contracts, day rates vs fixed price, and how to protect yourself when working for main contractors."
      datePublished="2026-01-05"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Business', href: '/guides' },
        { label: 'Subcontracting', href: '/guides/electrical-subcontracting' },
      ]}
      tocItems={[
        { id: 'what-is-subcontracting', label: 'What Is Subcontracting?' },
        { id: 'finding-work', label: 'Finding Subcontract Work' },
        { id: 'pricing-work', label: 'Pricing Subcontract Work' },
        { id: 'cis-obligations', label: 'CIS Obligations' },
        { id: 'payment-terms', label: 'Payment Terms & Protection' },
        { id: 'contracts', label: 'Contracts and Agreements' },
        { id: 'protecting-yourself', label: 'Protecting Yourself' },
        { id: 'how-to', label: 'Getting Started' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Business Guide"
      badgeIcon={Briefcase}
      heroTitle={
        <>
          Electrical Subcontracting Guide
          <br />
          <span className="text-yellow-400">Working for Main Contractors</span>
        </>
      }
      heroSubtitle="Subcontracting for main contractors and larger electrical firms is a common route for self-employed electricians to secure steady work without the overhead of finding domestic customers. However, subcontracting comes with its own challenges — CIS deductions, payment delays, contract disputes, and the balance between day rates and fixed-price work. This guide covers everything you need to know."
      readingTime={12}
      keyTakeaways={[
        'Subcontracting means working for a main contractor or larger electrical firm as a self-employed operative. The contractor wins the work, you deliver it. You are responsible for your own tax, insurance, and tools.',
        'CIS (Construction Industry Scheme) applies to most electrical subcontracting. The main contractor deducts 20% (registered) or 30% (unregistered) from your payments and passes it to HMRC as tax on your behalf. Register with HMRC for CIS before starting subcontract work.',
        'Day rates for electrical subcontractors in the UK typically range from £180 to £280 per day depending on experience, location, and sector. London and the South East command higher rates. Specialist sectors (data centres, healthcare, rail) pay premium rates.',
        'Always agree payment terms in writing before starting work. Standard terms are 30 days from invoice, but some main contractors push for 60 or even 90 days. Late payment is the biggest risk in subcontracting.',
        'Get a written subcontract agreement covering scope of work, payment terms, CIS registration details, insurance requirements, and dispute resolution before starting any job. Never rely on verbal agreements.',
      ]}
      sections={[
        {
          id: 'what-is-subcontracting',
          heading: 'What Is Electrical Subcontracting?',
          content: (
            <>
              <p>
                Electrical subcontracting is an arrangement where a{' '}
                <SEOInternalLink href="/guides/electrician-self-employed">
                  self-employed electrician
                </SEOInternalLink>{' '}
                works on projects secured by a main contractor, rather than finding and managing
                their own customers. The main contractor is responsible for the customer
                relationship, project management, and overall delivery. The subcontractor provides
                the labour (and sometimes materials) for the electrical work.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Handshake className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">How It Works</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    The main contractor wins a project — say, the electrical installation for a
                    new-build housing development or the rewire of a commercial building. They need
                    electricians to carry out the work. Rather than employing electricians directly
                    (with all the associated costs — PAYE, pension, holiday pay, sick pay), they
                    engage self-employed subcontractors who provide their labour on a day rate or
                    fixed-price basis. The subcontractor works on the contractor's project but is
                    not an employee.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Common Subcontracting Sectors</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    The most common sectors for electrical subcontracting are:{' '}
                    <strong className="text-white">new-build residential</strong> (housing
                    developments, apartment blocks),{' '}
                    <strong className="text-white">commercial fit-out</strong> (offices, retail,
                    restaurants), <strong className="text-white">industrial</strong> (warehouses,
                    factories, data centres), <strong className="text-white">social housing</strong>{' '}
                    (refurbishment programmes for housing associations), and{' '}
                    <strong className="text-white">public sector</strong> (schools, hospitals,
                    government buildings). Each sector has different working practices, rates, and
                    requirements.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Advantages of Subcontracting</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Steady work without the overhead of marketing, quoting, and customer management.
                    Access to larger, more interesting projects. No need for public liability claims
                    handling — the main contractor manages the customer relationship. Predictable
                    income (assuming reliable payment). Exposure to different types of work and
                    environments that build experience and skills.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Risks of Subcontracting</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Late payment or non-payment is the biggest risk. CIS deductions reduce your
                    immediate cash flow. You have less control over the work schedule and working
                    conditions. Some main contractors push the scope beyond what was agreed. IR35
                    status can be challenged by HMRC if the working arrangement looks more like
                    employment. You are dependent on the contractor for work — if they lose the
                    project, your work ends.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'finding-work',
          heading: 'Finding Subcontract Work',
          content: (
            <>
              <p>
                Finding reliable subcontract work is primarily about building relationships with
                main contractors and electrical firms who regularly need additional labour.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">
                  Where to Find Subcontract Work
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Direct approach to local contractors
                      </strong>{' '}
                      — Identify the electrical contractors in your area (Companies House,
                      NICEIC/NAPIT member lists, local trade directories) and approach them
                      directly. Many contractors do not advertise for subcontractors — they rely on
                      word of mouth and direct enquiries. A brief introduction email or phone call
                      stating your qualifications, experience, and availability is often enough.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Trade networking</strong> — Attend trade
                      events, wholesaler open days, and CPD training sessions. These are where
                      contractors meet potential subcontractors in an informal setting. Building
                      personal relationships is the most reliable route to regular work.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Online platforms</strong> — Sites like
                      PeoplePerHour, MyBuilder, and specialist trade platforms list subcontract
                      opportunities. LinkedIn is increasingly used for trade networking. Join
                      relevant LinkedIn groups and follow electrical contractors in your area.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Agencies</strong> — Electrical recruitment
                      agencies (Hays, Randstad, Manpower, specialist trade agencies) place
                      subcontractors on commercial and industrial projects. Agency rates are
                      typically lower than direct subcontracting because the agency takes a margin,
                      but the work is often more regular and payments are usually more reliable.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Word of mouth</strong> — The most common
                      source of subcontract work. Once you have completed a job well for one
                      contractor, they will call you back and recommend you to others. Reliability
                      and quality are the foundation of a subcontracting career.
                    </span>
                  </li>
                </ul>
              </div>
            </>
          ),
        },
        {
          id: 'pricing-work',
          heading: 'Pricing Subcontract Work',
          content: (
            <>
              <p>
                Subcontract work is priced in two main ways: day rates and fixed price. Each has
                advantages and risks, and the right approach depends on the type of work and the
                relationship with the contractor.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <PoundSterling className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Day Rates</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Day rates are the most common pricing model for subcontract electricians. You
                    are paid a fixed rate per day regardless of how much work is completed. This is
                    lower risk for the subcontractor — you are paid for your time even if the
                    project runs into delays or complications. Typical day rates for electrical
                    subcontractors in 2026:
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
                      <span className="text-white text-sm">Domestic (outside London)</span>
                      <span className="font-bold text-yellow-400">£180 - £220/day</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
                      <span className="text-white text-sm">Commercial (outside London)</span>
                      <span className="font-bold text-yellow-400">£200 - £250/day</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
                      <span className="text-white text-sm">London and South East</span>
                      <span className="font-bold text-yellow-400">£240 - £300/day</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                      <span className="text-white text-sm">
                        Specialist (data centres, healthcare)
                      </span>
                      <span className="font-bold text-yellow-400">£280 - £350/day</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Fixed Price (Price Work)</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Fixed-price subcontracting means agreeing a total price for the work before
                    starting. This carries more risk for the subcontractor — if the work takes
                    longer than expected, you absorb the extra time. However, fixed price can be
                    significantly more profitable if you can complete the work efficiently. Many
                    experienced subcontractors prefer price work because they can earn the
                    equivalent of £300-£400/day on work they know well. The key is accurate
                    estimation — use{' '}
                    <SEOInternalLink href="/guides/how-to-price-electrical-jobs">
                      proper pricing methods
                    </SEOInternalLink>{' '}
                    and never price from memory or gut feeling.
                  </p>
                </div>
              </div>
              <SEOAppBridge
                title="AI Cost Engineer for Accurate Pricing"
                description="Elec-Mate's AI Cost Engineer generates detailed cost breakdowns for any electrical job — labour hours, material quantities, overheads, and profit margin. Get accurate fixed prices for subcontract work based on real trade data, not guesswork."
                icon={Calculator}
              />
            </>
          ),
        },
        {
          id: 'cis-obligations',
          heading: 'CIS (Construction Industry Scheme) Obligations',
          content: (
            <>
              <p>
                The Construction Industry Scheme (CIS) is a tax deduction scheme operated by HMRC
                that applies to most electrical subcontracting work. Understanding CIS is essential
                for anyone working as a subcontractor in the construction industry.
              </p>
              <div className="space-y-3 mt-4">
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      Register with HMRC as a Subcontractor
                    </h4>
                    <p className="text-white text-sm leading-relaxed">
                      Before starting any subcontract work, register with HMRC for CIS. You can
                      register online or by phone. Once registered, your deduction rate drops from
                      30% (unregistered) to 20% (registered). Some long-established subcontractors
                      can apply for gross payment status (0% deductions), but this requires a track
                      record of tax compliance and minimum turnover thresholds.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">How CIS Deductions Work</h4>
                    <p className="text-white text-sm leading-relaxed">
                      When the main contractor pays you, they deduct CIS tax (20% for registered
                      subcontractors) from the labour element of the payment and pay it to HMRC on
                      your behalf. Materials are not subject to CIS deductions — only labour. The
                      contractor gives you a CIS payment and deduction statement showing the gross
                      amount, deduction, and net payment. Keep every statement — you need them for
                      your tax return.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">CIS and Your Tax Return</h4>
                    <p className="text-white text-sm leading-relaxed">
                      CIS deductions are not an additional tax — they are advance payments of your
                      income tax and National Insurance. When you file your Self Assessment tax
                      return, the CIS deductions are offset against your tax liability. If the
                      deductions exceed your actual tax due (common if you have significant
                      allowable expenses), you receive a refund from HMRC. Track your CIS deductions
                      in your{' '}
                      <SEOInternalLink href="/guides/electrician-accounting-software">
                        accounting software
                      </SEOInternalLink>{' '}
                      — Xero and QuickBooks both have built-in CIS handling.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      Important: Never Accept Cash Without CIS Documentation
                    </h4>
                    <p className="text-white text-sm leading-relaxed">
                      If a main contractor offers to pay you cash without CIS deductions or
                      documentation, this is a red flag. They are likely evading their CIS
                      obligations, which puts you at risk of HMRC investigation. Always insist on
                      proper CIS payment statements and ensure all payments go through your business
                      bank account.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'payment-terms',
          heading: 'Payment Terms and Protection',
          content: (
            <>
              <p>
                Late payment and non-payment are the biggest financial risks in subcontracting.
                Understanding standard payment terms and knowing how to protect yourself is
                essential.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Receipt className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Standard Payment Terms</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Standard payment terms for subcontract work are 30 days from invoice date. Some
                    larger contractors and construction companies operate on 45 or 60 days. Be wary
                    of any contractor pushing for 90-day terms — this creates serious cash flow
                    pressure for a small business. Payment terms should be agreed in writing before
                    work starts, not after the first invoice is submitted.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      The Late Payment of Commercial Debts Act
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Under the Late Payment of Commercial Debts (Interest) Act 1998, you have a
                    statutory right to charge interest on late payments at 8% above the Bank of
                    England base rate, plus a fixed compensation charge (£40 for debts up to
                    £999.99, £70 for debts up to £9,999.99, £100 for debts of £10,000+). Include a
                    reference to this legislation on your invoices. Most contractors pay on time
                    when they know you are aware of your rights.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Protecting Your Cash Flow</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Invoice promptly — do not wait until the end of the month. Invoice weekly on
                    day-rate work and at agreed milestones on fixed-price work. Chase overdue
                    invoices immediately, not after 60 days. Maintain a cash reserve of at least one
                    month's outgoings to cover payment delays. Consider invoice factoring or a
                    business credit facility for periods when payment delays create cash flow
                    pressure.
                  </p>
                </div>
              </div>
              <SEOAppBridge
                title="Invoicing and Cash Flow Tools"
                description="Elec-Mate's invoicing tools generate professional invoices on site — on completion of each job or at weekly intervals for day-rate work. Track payment status, send reminders, and use the cash flow planner to forecast your income across multiple subcontract projects."
                icon={Receipt}
              />
            </>
          ),
        },
        {
          id: 'contracts',
          heading: 'Contracts and Agreements',
          content: (
            <>
              <p>
                A written subcontract agreement protects both you and the main contractor. Never
                start work without one — verbal agreements are almost impossible to enforce when
                disputes arise.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">
                  What a Subcontract Agreement Should Cover
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Scope of work</strong> — A clear
                      description of what work is included and, equally important, what is excluded.
                      Vague scope descriptions lead to disputes about additional work and
                      variations.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Payment terms</strong> — Day rate or fixed
                      price, payment frequency (weekly, fortnightly, monthly), payment period (30
                      days from invoice), and the process for variations (additional work not in the
                      original scope).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">CIS details</strong> — Confirmation of
                      your CIS registration status, UTR number, and the applicable deduction rate.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Insurance requirements</strong> — Minimum
                      levels of public liability insurance, professional indemnity (if required),
                      and employers' liability (if you employ others). Typically £2-5 million public
                      liability for commercial subcontracting.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Qualifications and cards</strong> —
                      CSCS/ECS card requirements, competent person scheme membership, specific
                      qualifications for the project (e.g., 18th Edition, 2391, asbestos awareness).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Health and safety</strong> — Compliance
                      with the contractor's health and safety policy, RAMS requirements, site
                      induction, PPE standards. See the{' '}
                      <SEOInternalLink href="/guides/rams-generator">
                        RAMS generator guide
                      </SEOInternalLink>{' '}
                      for creating compliant method statements.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Dispute resolution</strong> — The process
                      for resolving disagreements — mediation before legal action, adjudication
                      under the Construction Act, or agreed arbitration.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                The JCT (Joint Contracts Tribunal) and NEC (New Engineering Contract) provide
                standard subcontract forms used widely in the UK construction industry. For smaller
                subcontract arrangements, a simpler bespoke agreement may be appropriate — but it
                should still cover all the points above.
              </p>
            </>
          ),
        },
        {
          id: 'protecting-yourself',
          heading: 'Protecting Yourself as a Subcontractor',
          content: (
            <>
              <p>
                Self-employed subcontractors have fewer protections than employees. Taking proactive
                steps to protect your interests is essential.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Insurance</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Maintain adequate public liability insurance — £2 million minimum for domestic
                    work, £5 million for commercial. If you employ anyone (including apprentices),
                    employers' liability insurance is a legal requirement. Professional indemnity
                    insurance covers claims arising from your design or advice. Keep certificates
                    current and provide copies to every contractor you work for.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Documentation</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Keep detailed records of all work carried out — daily logs, photographs,
                    material deliveries, and any instructions or variations received from the
                    contractor. If a dispute arises about what was agreed, your contemporaneous
                    records are your best defence. Elec-Mate's{' '}
                    <SEOInternalLink href="/guides/permit-to-work">
                      site documentation tools
                    </SEOInternalLink>{' '}
                    help you maintain a professional record of all work.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">IR35 Awareness</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    IR35 legislation targets "disguised employment" — where a worker operates as a
                    self-employed subcontractor but the working arrangement has all the
                    characteristics of employment (fixed hours, supplied equipment, no substitution
                    right, no financial risk). If HMRC determines your arrangement falls inside
                    IR35, you could be liable for additional tax and National Insurance. Ensure your
                    subcontract arrangement demonstrates genuine self-employment: you provide your
                    own tools, you can send a substitute, you take financial risk, and you work for
                    multiple clients. The{' '}
                    <SEOInternalLink href="/guides/starting-electrical-business">
                      starting a business guide
                    </SEOInternalLink>{' '}
                    covers employment status in more detail.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Handshake className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Diversify Your Clients</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Avoid depending on a single main contractor for all your work. If they go
                    through a quiet period, lose a contract, or go out of business, you lose all
                    your income. Aim to work for at least 2-3 different contractors and maintain
                    your own domestic customer base alongside subcontract work. This diversification
                    also strengthens your IR35 position by demonstrating you are genuinely in
                    business on your own account.
                  </p>
                </div>
              </div>
            </>
          ),
        },
      ]}
      howToHeading="Getting Started as an Electrical Subcontractor"
      howToDescription="Steps to begin working as a self-employed electrical subcontractor."
      howToSteps={[
        {
          name: 'Set up your self-employment and register for CIS',
          text: 'Register as self-employed with HMRC if you have not already done so. Register separately for the Construction Industry Scheme (CIS) as a subcontractor — this reduces your CIS deduction rate from 30% to 20%. Set up a business bank account and get accounting software to track your income, expenses, and CIS deductions.',
        },
        {
          name: 'Arrange insurance and get your qualifications in order',
          text: 'Obtain public liability insurance (minimum £2 million, ideally £5 million for commercial work). Ensure your ECS/CSCS card is current. Confirm your 18th Edition, 2391, and any other relevant qualifications are up to date. Gather copies of all certificates — main contractors will ask for them before you start.',
        },
        {
          name: 'Approach contractors and build relationships',
          text: 'Contact local electrical contractors, construction companies, and agencies. Prepare a brief profile of your qualifications, experience, and availability. Attend trade events and networking sessions. Start with one or two reliable contractors and build from there.',
        },
        {
          name: 'Agree terms and get everything in writing',
          text: 'Before starting any job, agree the rate (day rate or fixed price), payment terms, scope of work, and CIS arrangements in writing. Review the subcontract agreement carefully — check for unreasonable retention clauses, extended payment terms, or vague scope descriptions.',
        },
        {
          name: 'Invoice promptly and manage your cash flow',
          text: "Submit invoices weekly or at agreed milestones. Track CIS deductions and keep every payment statement. Chase overdue invoices immediately. Use Elec-Mate's invoicing tools and your accounting software to maintain a clear picture of your financial position at all times.",
        },
      ]}
      faqs={[
        {
          question: 'What is a typical day rate for an electrical subcontractor in the UK?',
          answer:
            'Day rates vary by location, sector, and experience. In 2026, typical rates are: £180-£220/day for domestic work outside London, £200-£250/day for commercial work outside London, £240-£300/day for London and the South East, and £280-£350/day for specialist sectors (data centres, healthcare, rail). These rates are before CIS deductions. Rates have been rising due to skills shortages in the electrical trade, particularly for experienced approved electricians with testing qualifications.',
        },
        {
          question: 'Do I have to register for CIS?',
          answer:
            'If you work as a subcontractor in the construction industry (which includes electrical work), you do not have to register for CIS — but you should. If you are not registered, the main contractor must deduct 30% from your payments instead of 20%. Registration is free and straightforward — you can register online or by phone with HMRC. You need your UTR (Unique Taxpayer Reference) and National Insurance number.',
        },
        {
          question: 'What insurance do I need for subcontracting?',
          answer:
            "At minimum, you need public liability insurance — £2 million for domestic work, £5 million for most commercial projects (some main contractors require £10 million). If you employ anyone, employers' liability insurance is a legal requirement (minimum £5 million). Professional indemnity insurance is increasingly requested for design-and-build projects. Personal accident and income protection insurance are optional but recommended for self-employed workers who have no sick pay or employer support.",
        },
        {
          question: 'How do I protect myself from non-payment?',
          answer:
            'Get payment terms in writing before starting work. Invoice promptly and chase overdue payments immediately. Keep detailed records of all work completed. Know your rights under the Late Payment of Commercial Debts Act. Consider credit-checking new contractors before accepting work. Do not let outstanding invoices accumulate — address payment issues early. For larger contracts, the Construction Act provides the right to adjudication for payment disputes.',
        },
        {
          question: 'What is the difference between subcontracting and being employed?',
          answer:
            "A genuine self-employed subcontractor: provides their own tools and equipment, can send a substitute to do the work, takes financial risk (on fixed-price work), works for multiple clients, controls how and when the work is done (not just what work is done), and invoices for their work. An employee: uses the employer's tools, cannot send a substitute, receives a fixed wage regardless of profitability, works exclusively for one employer, and has their working methods directed by the employer. If your arrangement looks more like employment, it may fall within IR35 and you could face additional tax liabilities.",
        },
        {
          question: 'How does Elec-Mate help with subcontracting?',
          answer:
            'Elec-Mate provides several tools valuable for subcontractors. The AI Cost Engineer generates accurate fixed-price quotes based on real trade data. The invoicing tools generate professional invoices on site. The cash flow planner forecasts income across multiple projects. The RAMS generator creates compliant method statements required by main contractors. And all certification forms (EIC, EICR, Minor Works) are available digitally for any testing and certification work required on subcontract projects.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/electrician-self-employed',
          title: 'Self-Employed Electrician Guide',
          description: 'Setting up as a self-employed electrician.',
          icon: Briefcase,
          category: 'Business',
        },
        {
          href: '/guides/how-to-price-electrical-jobs',
          title: 'How to Price Electrical Jobs',
          description: 'Accurate pricing for fixed-price subcontract work.',
          icon: PoundSterling,
          category: 'Business',
        },
        {
          href: '/guides/electrician-accounting-software',
          title: 'Accounting Software',
          description: 'Track CIS deductions and manage business finances.',
          icon: Calculator,
          category: 'Business',
        },
        {
          href: '/guides/starting-electrical-business',
          title: 'Starting an Electrical Business',
          description: 'From sole trader to limited company — business setup guide.',
          icon: Building,
          category: 'Business',
        },
        {
          href: '/guides/rams-generator',
          title: 'RAMS Generator',
          description: 'Create compliant risk assessments for main contractors.',
          icon: ClipboardCheck,
          category: 'Safety',
        },
        {
          href: '/guides/electrician-invoice-app',
          title: 'Electrician Invoice App',
          description: 'Professional invoicing from the job site.',
          icon: FileText,
          category: 'Business',
        },
      ]}
      ctaHeading="Run Your Subcontracting Business With Elec-Mate"
      ctaSubheading="AI pricing, professional invoicing, RAMS generator, cash flow planning, and digital certificates — everything a subcontractor needs in one app. 7-day free trial, cancel anytime."
    />
  );
}
