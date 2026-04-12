import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  FileCheck2,
  AlertTriangle,
  PoundSterling,
  Users,
  ClipboardCheck,
  Scale,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business Guides', href: '/guides/electrical-business-growth' },
  { label: 'Managing Electrical Subcontractors', href: '/managing-electrical-subcontractors' },
];

const tocItems = [
  { id: 'checking-competency', label: 'Checking Insurance & Competency' },
  { id: 'cis-registration', label: 'CIS Registration' },
  { id: 'subcontract-agreements', label: 'Written Subcontract Agreements' },
  { id: 'day-rates-measure', label: 'Day Rates vs Measure-and-Value' },
  { id: 'quality-control', label: 'Quality Control on Site' },
  { id: 'retention', label: 'Withholding Retention' },
  { id: 'poor-performance', label: 'Dealing with Poor Performance' },
  { id: 'ir35', label: 'IR35 Considerations' },
  { id: 'for-electricians', label: 'Tools for Managing Subcontractors' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always verify subcontractor competency via NICEIC, NAPIT, or ELECSA online registers before they set foot on site — verbal assurances are not sufficient.',
  'Subcontractors working in the construction industry must be registered with HMRC under the Construction Industry Scheme (CIS). You as the contractor must verify their CIS status before making payment.',
  'A written subcontract agreement protects both parties — it should cover scope, rate, payment terms, retention, liability, and termination rights.',
  'IR35 (off-payroll working rules) applies where a subcontractor working through a limited company would otherwise be deemed an employee. Since April 2021, medium and large businesses are responsible for determining IR35 status.',
  'Retention — typically 5% of the contract value held for six to twelve months — protects you against defects discovered after practical completion. Always include retention terms in your subcontract agreement.',
];

const faqs = [
  {
    question: 'How do I check if an electrical subcontractor is NICEIC or NAPIT registered?',
    answer:
      'Use the online "find a contractor" search tools on the NICEIC website (niceic.com) or the NAPIT website (napit.org.uk). Enter the company name or postcode to verify current registration. ELECSA (elecsa.co.uk) operates a similar register for its members. Do not rely on a photocopy of a certificate — always check directly with the scheme. Registration should be current (renewed annually) and should cover the specific type of work you are subcontracting.',
  },
  {
    question: "What is CIS and why do I need to verify my subcontractor's registration?",
    answer:
      "The Construction Industry Scheme (CIS) is HMRC's tax deduction scheme for the construction industry, which includes electrical contracting. When you pay a subcontractor, you must verify their CIS status with HMRC (via CIS Online or your accountant). If they are registered under CIS, deduct 20% from their payment and pay this to HMRC. If they are not registered, deduct 30%. Failing to operate CIS correctly exposes you to HMRC penalties regardless of what you agreed with the subcontractor.",
  },
  {
    question: 'What should a subcontract agreement include?',
    answer:
      'A written electrical subcontract agreement should cover: a clear scope of works (what is and is not included), the contract sum or rate (day rate or measure-and-value), payment terms (typically 30 days from invoice), CIS deduction confirmation, retention terms (usually 5% held for 6 to 12 months), liability and insurance requirements, defects rectification period, termination rights (grounds and notice period), and dispute resolution procedure. For contracts over £10,000 the Housing Grants, Construction and Regeneration Act 1996 (as amended) applies, giving both parties statutory rights to interim payments and adjudication.',
  },
  {
    question: 'What is the difference between a day rate and measure-and-value contract?',
    answer:
      'A day rate contract pays the subcontractor a fixed daily (or hourly) rate for time on site, regardless of output. It is simple to administer but gives you no certainty of final cost and little incentive for the subcontractor to work efficiently. A measure-and-value (or schedule of rates) contract pays for work done against agreed unit rates — for example £X per metre of conduit installed or £Y per circuit wired. It is more complex to administer but aligns subcontractor incentives with output and gives you better cost control on larger projects.',
  },
  {
    question: 'Can I withhold payment from a subcontractor for poor quality work?',
    answer:
      'Under the Housing Grants, Construction and Regeneration Act 1996, you are entitled to issue a Pay Less Notice if you intend to pay less than the notified sum. The notice must be issued before the prescribed period set out in your contract (typically five days before the final date for payment). Simply refusing to pay without issuing a Pay Less Notice in time is a breach of the contract and the subcontractor can refer the dispute to adjudication and potentially suspend work. Always follow the contractual notice procedure, even if the quality issue is clear-cut.',
  },
  {
    question: 'What is IR35 and does it apply to electrical subcontractors?',
    answer:
      "IR35 (now the off-payroll working rules) targets workers who provide services through a personal service company (PSC or limited company) but are effectively working as employees. Since April 2021, medium and large private sector businesses must determine the IR35 status of limited company subcontractors and, if they are inside IR35, deduct PAYE and NI before payment. Small businesses (turnover under £10.2m, fewer than 50 employees) are exempt from making this determination — the responsibility remains with the subcontractor's own company. Most genuinely self-employed electrical subcontractors are outside IR35, but if you are directing their work, controlling their hours, and providing equipment, the risk increases.",
  },
  {
    question: 'What should I do if a subcontractor refuses to rectify defective work?',
    answer:
      'First, issue a formal written notice specifying the defects and giving a reasonable time to rectify (typically 14 days). Keep photographic evidence and inspection records. If they still refuse, you can use withheld retention money to pay another contractor to carry out the remedial works. You may also have a claim against them under the subcontract agreement. If the contract value exceeds the small claims court threshold (£10,000 in England and Wales), consider referral to adjudication — it is fast (28-day decision) and relatively inexpensive compared to litigation.',
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
    href: '/electrical-business-partnership',
    title: 'Electrical Business Partnership',
    description: 'Partnership vs LLP vs Ltd — choosing the right structure for a joint venture.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-business-growth',
    title: 'Growing Your Electrical Business',
    description:
      'Strategies for scaling from sole trader to employer in the UK electrical industry.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote jobs quickly on site and send professional PDFs to clients instantly.',
    icon: FileCheck2,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'checking-competency',
    heading: 'Checking Insurance and Competency Before Work Starts',
    content: (
      <>
        <p>
          Your reputation is on the line when a subcontractor works under your name. A single poorly
          wired installation or missed test can cost you a client, a scheme registration, or worse.
          Verifying competency and insurance before work starts is non-negotiable.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scheme registration check</strong> — verify the subcontractor is currently
                registered with NICEIC (niceic.com), NAPIT (napit.org.uk), or ELECSA (elecsa.co.uk).
                Registration must be current and must cover the categories of work being
                subcontracted. A contractor registered only for domestic work should not be
                subcontracted for commercial or industrial installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — require a minimum of £1 million public
                liability insurance (£2 million or £5 million is common for commercial work). Ask
                for a copy of the certificate and check it is current and the limit is appropriate
                for the project. Note that the certificate shows the maximum liability per claim,
                not total per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employers' liability insurance</strong> — if the subcontractor has any
                employees (including labour-only subcontractors they bring with them), they must
                hold employers' liability insurance with a minimum cover of £5 million. This is a
                legal requirement under the Employers' Liability (Compulsory Insurance) Act 1969.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS Cards</strong> — check that all individuals working on site hold a
                current Electrotechnical Certification Scheme (ECS) Card at the appropriate grade
                for the work being undertaken. ECS Card verification is available via the ECS
                website or the ECS Check app.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cis-registration',
    heading: 'CIS Registration Verification',
    content: (
      <>
        <p>
          The Construction Industry Scheme (CIS) is a mandatory HMRC scheme for contractors and
          subcontractors in construction, which includes electrical work. Getting CIS wrong exposes
          you to significant financial penalties.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify before payment</strong> — before paying a subcontractor for the first
                time, verify their CIS status online via HMRC's CIS Online service or ask your
                accountant to do so. HMRC will confirm whether they are registered and at what rate
                (gross, standard 20%, or higher 30%).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Deduction and payment to HMRC</strong> — deduct the appropriate rate from
                the subcontractor's labour element (not materials). Pay the deduction to HMRC by the
                19th of each month and file your monthly CIS return. Keep records of all
                subcontractor verifications and payments for six years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CIS deduction statements</strong> — issue the subcontractor with a written
                deduction statement within 14 days of the end of each tax month. This shows the
                gross payment, deduction, and net payment. They use this to offset against their own
                tax liability.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalties for non-compliance</strong> — HMRC can charge penalties of £100 to
                £3,000 per return for late or incorrect CIS returns, and can also hold you liable
                for unpaid tax if you have not correctly operated the scheme. CIS compliance is not
                optional.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'subcontract-agreements',
    heading: 'Written Subcontract Agreements',
    content: (
      <>
        <p>
          A handshake deal with a subcontractor is a liability waiting to happen. A written
          subcontract agreement, even a simple one-page letter of intent for small jobs, protects
          both parties and prevents disputes over scope, payment, and liability.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope of works</strong> — define precisely what is included and excluded.
                "First fix wiring on the ground floor" is better than "electrical work". Ambiguous
                scopes lead to subcontractors claiming extras and you disputing them.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Payment terms</strong> — specify the rate (day rate, price per unit, or
                fixed price), payment intervals (weekly, monthly, or on milestones), and the date by
                which invoices must be submitted. The Housing Grants, Construction and Regeneration
                Act 1996 gives both parties a right to interim payments on contracts over 45 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retention</strong> — state the retention percentage (typically 5%), the
                amount held (of labour and materials, or labour only), and the release dates (half
                on practical completion, half at end of defects period — typically six to twelve
                months).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Termination rights</strong> — specify the grounds on which either party can
                terminate (e.g., persistent poor quality, failure to maintain programme, or
                insolvency) and the notice required. Without this, disputes about termination can be
                costly.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'day-rates-measure',
    heading: 'Managing Day Rates vs Measure-and-Value',
    content: (
      <>
        <p>
          The way you pay subcontractors has a significant effect on your cost control and their
          incentive to perform. Choose the right model for the type of work being subcontracted.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Day rate — best for variable scope work</strong> — use day rates when the
                scope is genuinely unpredictable (fault finding, remedial work, service upgrades on
                older properties). Agree the rate upfront, require timesheets signed by your
                foreman, and set a maximum number of days without a variation order.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Measure-and-value — best for production work</strong> — use schedule of
                rates for repetitive production work (wiring multiple identical units or house
                types). Agree unit rates before work starts, measure completed work at agreed
                intervals (typically weekly or monthly), and pay only for measured work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fixed price — best for defined scope projects</strong> — where the scope is
                fully defined and risks are understood, a fixed price gives you cost certainty.
                Ensure the fixed price includes all foreseeable risks and that the subcontractor has
                priced the design accurately. Variations must be agreed in writing before work is
                carried out.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'quality-control',
    heading: 'Quality Control on Site',
    content: (
      <>
        <p>
          Your name is on the certificates, even when a subcontractor does the work. Quality control
          visits and clear standards protect your reputation and your scheme registration.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection checklist</strong> — carry out a site inspection at key
                milestones (first fix completion, before boarding, second fix, test and
                commissioning). Use a written checklist that covers containment systems, cable
                identification, earthing and bonding, termination quality, and test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test results review</strong> — require the subcontractor to provide test
                results (Schedule of Test Results, IR tests, RCD tests) as the job progresses. Do
                not wait until handover to discover testing has not been carried out. You are
                responsible for the accuracy of any certificates issued under your scheme
                registration number.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Photographic records</strong> — take photographs at key stages (consumer
                unit before and after, earthing arrangement, any buried cables before boarding
                over). These protect you if queries arise later and demonstrate diligence to your
                scheme body if audited.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'retention',
    heading: 'Withholding Retention',
    content: (
      <>
        <p>
          Retention is a percentage of the contract value withheld until defects identified during a
          defined period after practical completion have been rectified. It is a standard feature of
          construction subcontracts and protects you against defective work discovered after the
          subcontractor has left site.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical retention rate</strong> — 5% of the contract value is standard for
                most electrical subcontracts. On a £20,000 subcontract, £1,000 is retained. Half
                (£500) is typically released at practical completion; the other half at the end of
                the defects liability period (six to twelve months).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Must be in the contract</strong> — you can only withhold retention if it is
                stated in the subcontract agreement. Withholding retention without a contractual
                right to do so is a breach of contract and the subcontractor can refer the dispute
                to adjudication.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Using retention for defects</strong> — if the subcontractor fails to rectify
                defects after written notice, you can use the withheld retention to fund a third
                party to carry out the remedial works. Document everything and keep invoices for the
                remedial work carried out.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'poor-performance',
    heading: 'Dealing with Poor Performance',
    content: (
      <>
        <p>
          Poor quality work, repeated absences, or failure to maintain programme are the most common
          reasons to terminate a subcontract. Acting early and following the correct process
          prevents the dispute escalating.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Raise issues immediately in writing</strong> — verbal warnings are
                forgotten. A simple email or WhatsApp message noting the issue and expected standard
                creates a paper trail. Follow up with a formal written notice if the issue
                continues.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Termination notice</strong> — most subcontracts include a right to terminate
                for material breach. Issue a written termination notice citing the specific grounds,
                giving the notice period stated in the contract. Take care not to terminate
                wrongfully — if your grounds are not watertight, you may end up owing the
                subcontractor for work done.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Secure the site</strong> — when terminating, take immediate steps to secure
                the site, photograph the state of the works, and take possession of any materials
                you have paid for. This prevents disputes about what was and was not completed at
                termination.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ir35',
    heading: 'IR35 Considerations for Electrical Subcontractors',
    content: (
      <>
        <p>
          IR35 — now formally the off-payroll working rules — targets arrangements where an
          individual provides services through a limited company but is effectively working as an
          employee. It is relevant when you engage a subcontractor who operates through a personal
          service company (PSC) rather than as a sole trader.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who determines status?</strong> — since April 2021, medium and large
                businesses (turnover above £10.2m or more than 50 employees) must determine the IR35
                status of limited company subcontractors and issue a Status Determination Statement
                (SDS). Small businesses are exempt — IR35 status determination remains the
                responsibility of the subcontractor's company.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Key IR35 indicators</strong> — HMRC looks at: whether you control how, when,
                and where the work is done (control); whether the subcontractor can send a
                substitute (substitution); and whether the subcontractor bears financial risk
                (financial risk). An electrician who works set hours, uses your equipment, and works
                exclusively for you is likely inside IR35.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical steps</strong> — use HMRC's Check Employment Status for Tax (CEST)
                tool before engaging a limited company subcontractor. Keep a record of your
                determination. If in doubt, engage the subcontractor as a self-employed individual
                (sole trader) rather than through their limited company, which removes the IR35
                complication entirely.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Tools for Managing Your Subcontractors',
    content: (
      <>
        <p>
          Managing multiple subcontractors across different sites is a significant administrative
          burden. Elec-Mate's{' '}
          <SEOInternalLink href="/tools/schedule-manager-electrician">job scheduling</SEOInternalLink> and{' '}
          <SEOInternalLink href="/electrical-quoting-app">quoting tools</SEOInternalLink> help
          you keep track of who is working where and at what cost.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Allocate Jobs to Subcontractors</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/schedule-manager-electrician">
                    Elec-Mate scheduler
                  </SEOInternalLink>{' '}
                  to assign jobs to subcontractors and track progress in real time. No more calls to
                  find out where someone is — the job status tells you.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificates Under Your Scheme Number</h4>
                <p className="text-white text-sm leading-relaxed">
                  When your subcontractor completes an installation, issue the certificate through
                  Elec-Mate under your scheme registration. All test results are stored against the
                  job record, making audits straightforward.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage subcontractors and jobs with Elec-Mate"
          description="Job scheduling, electrical certificates, quoting, and invoicing in one app built for UK electricians. Join 1,000+ electricians running their business with Elec-Mate. 7-day free trial."
          icon={Users}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ManagingSubcontractorsElectricianPage() {
  return (
    <GuideTemplate
      title="Managing Electrical Subcontractors UK | Subcontractor Management Guide"
      description="Complete guide to managing electrical subcontractors in the UK. Checking NICEIC/NAPIT registration, CIS verification, written subcontract agreements, day rates vs measure-and-value, quality control, retention, poor performance, and IR35 considerations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Users}
      heroTitle={
        <>
          Managing Electrical Subcontractors UK:{' '}
          <span className="text-yellow-400">Complete Guide</span>
        </>
      }
      heroSubtitle="How to check competency and insurance, verify CIS registration, set up written subcontract agreements, manage day rates vs measure-and-value, control quality on site, withhold retention, deal with poor performance, and navigate IR35."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Managing Electrical Subcontractors"
      relatedPages={relatedPages}
      ctaHeading="Manage your jobs and subcontractors with Elec-Mate"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for job scheduling, electrical certificates, quoting, and invoicing. 7-day free trial, cancel anytime."
    />
  );
}
