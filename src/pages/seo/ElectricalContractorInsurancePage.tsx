import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  PoundSterling,
  FileCheck2,
  CheckCircle2,
  Wrench,
  Car,
  Zap,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Business', href: '/electrician-business-insurance' },
  { label: 'Electrical Contractor Insurance', href: '/electrical-contractor-insurance' },
];

const tocItems = [
  { id: 'public-liability', label: 'Public Liability Insurance' },
  { id: 'employers-liability', label: "Employer's Liability Insurance" },
  { id: 'professional-indemnity', label: 'Professional Indemnity Insurance' },
  { id: 'tool-insurance', label: 'Tool Insurance' },
  { id: 'van-insurance', label: 'Van Insurance for Electricians' },
  { id: 'scheme-requirements', label: 'NICEIC and NAPIT Insurance Requirements' },
  { id: 'costs', label: 'Insurance Costs 2026' },
  { id: 'for-electricians', label: 'For Electricians: Protecting Your Business' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Public liability insurance is not a legal requirement for sole traders, but it is required by virtually all competent person schemes (NICEIC, NAPIT, ELECSA) and most commercial clients. The minimum cover recommended for electrical contractors is £2 million, with £5 million the industry standard.',
  "Employer's liability insurance is a legal requirement under the Employers' Liability (Compulsory Insurance) Act 1969 if you employ any member of staff, including part-time workers, casual labour, and labour-only subcontractors. The legal minimum is £5 million indemnity. Failure to hold valid EL insurance is a criminal offence with fines of up to £2,500 per day.",
  'Professional indemnity insurance (PI) covers claims arising from professional advice or design that causes financial loss to a client. Essential for contractors who produce electrical designs, specifications, or system designs as part of their service.',
  'Tool insurance covers the theft or accidental damage of tools and test equipment. Standard home contents or van insurance typically excludes tools used for trade. A separate tools policy covering up to £10,000 costs approximately £150 to £350 per year.',
  'Total annual insurance costs for a sole trader electrician in the UK typically range from £900 to £2,500, depending on turnover, the type of work undertaken, and the level of cover chosen.',
];

const faqs = [
  {
    question: 'Is public liability insurance a legal requirement for electricians?',
    answer:
      'Public liability (PL) insurance is not a legal requirement for sole traders or limited companies in the UK. However, it is required by all major competent person schemes as a condition of registration. NICEIC requires a minimum of £2 million PL cover; most schemes and commercial clients require £5 million. Operating without PL insurance means you would personally bear the cost of any claim — legal defence costs alone can run to tens of thousands of pounds even for claims that are ultimately dismissed. PL insurance is effectively mandatory for any practising electrician.',
  },
  {
    question: "What is employer's liability insurance and when is it required?",
    answer:
      "Employer's liability (EL) insurance is a legal requirement under the Employers' Liability (Compulsory Insurance) Act 1969 for any business that employs staff. This includes permanent employees, part-time workers, temporary workers, and — importantly for electrical contractors — labour-only subcontractors where you direct their work and they work exclusively for you. The legal minimum indemnity limit is £5 million per occurrence, though most insurers offer £10 million as standard. HMRC and the Health and Safety Executive (HSE) can inspect your EL certificate. Fines for non-compliance are up to £2,500 per day.",
  },
  {
    question: 'Do I need professional indemnity insurance as an electrician?',
    answer:
      'Professional indemnity (PI) insurance is not a standard requirement for installation electricians but becomes essential if you provide design services, produce specifications, or offer consultancy advice as part of your business. If a client relies on your professional advice and suffers a financial loss as a result of an error in that advice or design, PI insurance covers your legal defence costs and any settlement. As more electricians offer EV charger design, solar PV system design, or building services design, PI becomes increasingly relevant. Premiums start at approximately £200 to £500 per year for modest turnover.',
  },
  {
    question: 'Does van insurance cover tools left in the vehicle overnight?',
    answer:
      'Standard commercial vehicle insurance typically does not include cover for tools left in the vehicle overnight, or limits claims to a relatively low amount (£500 to £1,000). Specialist trade van insurance policies include tools cover as an optional add-on, but the level of cover and the conditions (e.g., tools must be stored in a locked, fixed storage box) vary significantly between insurers. Read the policy exclusions carefully. The most reliable approach is a dedicated tool insurance policy in addition to your van insurance, as this provides clearer and more comprehensive cover without the ambiguity of van policy add-ons.',
  },
  {
    question: 'What do NICEIC and NAPIT require in terms of insurance?',
    answer:
      'NICEIC (National Inspection Council for Electrical Installation Contracting) requires registered businesses to hold a minimum of £2 million public liability insurance. NAPIT (National Association of Professional Inspectors and Testers) has a similar requirement. Both schemes require you to provide evidence of current insurance at annual assessment. Many contractors carry £5 million PL to satisfy commercial clients who specify this minimum in their procurement requirements. Neither NICEIC nor NAPIT mandate professional indemnity or tool insurance, though both are advisable depending on the scope of your work.',
  },
  {
    question: 'How much does electrical contractor insurance cost per year?',
    answer:
      'Costs vary significantly based on turnover, number of employees, type of work, and claims history. Indicative 2026 annual premiums: public liability insurance (£5m, sole trader) — £400 to £900; employer\'s liability (£10m, 1–3 employees) — £300 to £600; professional indemnity (£1m, design services) — £200 to £500; tool insurance (£10,000 cover) — £150 to £350; van insurance (commercial, sole trader) — £1,500 to £3,000. Total annual insurance cost for a sole trader without employees typically falls between £900 and £1,500. A small company with employees should budget £2,000 to £4,500 or more.',
  },
  {
    question: 'Can I get a combined electrical contractor insurance policy?',
    answer:
      'Yes. Many specialist trade insurance providers offer combined package policies designed for electrical contractors. These bundle public liability, employer\'s liability, professional indemnity, and tool insurance into a single policy with a single renewal date and a combined premium. Combined packages are often more cost-effective than buying each element separately and simplify administration. Providers with specialist electrical contractor packages include Simply Business, Tradesman Saver, Markel, and Hiscox Trade. Always compare the specific cover limits and exclusions, not just the premium.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrician-business-insurance',
    title: 'Electrician Business Insurance Overview',
    description: 'Overview of all insurance types recommended for electricians running their own business.',
    icon: ShieldCheck,
    category: 'Business Guide',
  },
  {
    href: '/niceic-registration',
    title: 'NICEIC Registration Guide',
    description: 'How to register with NICEIC as a sole trader or company — requirements, costs, and assessment.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/electrician-hourly-rate',
    title: 'Electrician Hourly Rate Guide 2026',
    description: 'Regional rates, callout charges, emergency premiums, and how to price electrical jobs.',
    icon: PoundSterling,
    category: 'Business Guide',
  },
  {
    href: '/electrician-tool-insurance',
    title: 'Electrician Tool Insurance',
    description: 'How tool insurance works, what to look for in a policy, and the best providers for electricians.',
    icon: Wrench,
    category: 'Business Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'public-liability',
    heading: 'Public Liability Insurance for Electrical Contractors',
    content: (
      <>
        <p>
          Public liability (PL) insurance protects your business against claims from members
          of the public or clients who suffer injury or property damage as a result of your
          work or negligence. For an electrician, this includes a wide range of scenarios
          — from a client tripping over cable on site to a fire caused by a wiring fault
          attributed to your installation.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum cover: £2 million</strong> — NICEIC, NAPIT, and ELECSA all
                require at least £2 million PL cover as a condition of registration. This
                is the absolute floor, not a recommendation. Most claims settle for far less,
                but legal defence costs on a complex claim can exhaust a £2 million policy
                quickly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industry standard: £5 million</strong> — the majority of commercial
                clients, principal contractors, and local authorities specify £5 million PL
                as a minimum in their procurement requirements. If you want to work commercially,
                £5 million cover is effectively mandatory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>What PL does not cover</strong> — faulty workmanship or materials
                that fail (this is a defects claim, covered separately or under contract law);
                deliberate acts; claims from employees (covered by employer&apos;s liability);
                and professional advice errors (covered by professional indemnity).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost: £400 to £900/year</strong> — for a sole trader with annual
                turnover under £300,000, doing standard domestic and commercial work,
                £5 million PL cover costs approximately £400 to £900 per year. Specialist
                or higher-risk work (HV, industrial) will increase premiums.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'employers-liability',
    heading: "Employer's Liability Insurance: A Legal Requirement",
    content: (
      <>
        <p>
          Employer&apos;s liability (EL) insurance is a legal requirement under the Employers&apos;
          Liability (Compulsory Insurance) Act 1969 for any UK business that employs staff.
          Unlike public liability, this is not a matter of choice — it is the law.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who needs EL insurance</strong> — any business employing permanent,
                part-time, temporary, casual, or seasonal workers. Labour-only subcontractors
                (LOSC) who work exclusively for you and under your direction may legally
                be treated as employees for EL purposes. Always seek advice if you are unsure
                whether your subcontractors constitute employees.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Legal minimum: £5 million per occurrence</strong> — most insurers
                provide £10 million as standard, as the legal minimum is considered low relative
                to modern compensation awards. You must display your EL certificate in your
                workplace and make it available to HSE inspectors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalty for non-compliance</strong> — the HSE can impose fines of
                up to £2,500 for each day you operate without valid EL insurance. There is
                no upper limit on the total fine. This is a criminal liability, not a civil
                matter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sole traders with no employees</strong> — if you are genuinely a
                sole trader with no employees, labour-only subcontractors, or casual workers,
                you are not legally required to hold EL insurance. However, as soon as you
                take on any helper, even informally, the requirement applies.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'professional-indemnity',
    heading: 'Professional Indemnity Insurance for Electrical Contractors',
    content: (
      <>
        <p>
          Professional indemnity (PI) insurance covers claims arising from errors,
          omissions, or negligence in professional services including design, advice,
          and specification. It is distinct from public liability and covers financial
          loss rather than physical injury or property damage.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When PI is relevant</strong> — if you produce electrical designs,
                load calculations, specifications, energy assessments, or provide consultancy
                advice as part of your service, PI is essential. An error in a design that
                causes the client financial loss (e.g., an undersized cable causing equipment
                damage or a failed inspection) could result in a PI claim.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When PI is less critical</strong> — pure installation contractors
                who follow a client&apos;s specification without producing any design themselves
                have lower PI exposure. If you are installing to a consultant engineer&apos;s
                specification, the design risk sits with the consultant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retroactive cover</strong> — PI insurance works on a &quot;claims made&quot;
                basis. You must have cover in place when a claim is made, not just when
                the work was done. This means you need to maintain PI insurance continuously
                or purchase retroactive cover to protect against claims on historic work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'tool-insurance',
    heading: 'Tool Insurance for Electricians',
    content: (
      <>
        <p>
          Tools and test equipment represent a significant capital investment for any electrician.
          A multifunction tester, insulation resistance tester, clamp meter, and hand tools
          can total £3,000 to £8,000 or more. Standard home contents and van insurance
          typically exclude trade tools.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What tool insurance covers</strong> — theft of tools from your van,
                from site, or from your home (if specified); accidental damage to tools while
                in use; and sometimes mechanical breakdown for electronic test equipment.
                Policy terms vary — read the exclusions carefully.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common exclusions</strong> — theft from an unattended vehicle unless
                the tools are in a locked, fixed storage box; theft from overnight storage
                in a vehicle that does not have an alarm; and wear and tear. Many policies
                require you to have a Thatcham-rated van alarm and locked metal toolbox
                as a condition of cover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintaining an inventory</strong> — tool insurance claims require
                evidence of ownership and value. Maintain a photographic inventory of your
                tools with serial numbers and purchase receipts. Update it whenever you
                buy significant new equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost: £150 to £350/year</strong> — for £10,000 of tool cover,
                annual premiums are typically £150 to £350 depending on claims history
                and policy conditions. Some specialist trade insurers include tool cover
                as part of a package policy with PL and EL.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'van-insurance',
    heading: 'Van Insurance for Electrical Contractors',
    content: (
      <>
        <p>
          Your van is your mobile workshop and one of your highest-value assets. Standard
          private car insurance does not cover a vehicle used for trade — you need specific
          commercial vehicle insurance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial vehicle insurance</strong> — covers your van for
                business use, including travel between job sites. Specify &quot;carriage of own
                tools and equipment&quot; to ensure your policy covers the purpose for which
                you are using the vehicle. A standard private car policy is void if
                you are involved in an accident while using the vehicle for trade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Modified vehicles</strong> — many electricians fit internal shelving,
                racking, and vault boxes to their vans. These modifications must be declared
                to your insurer. Undisclosed modifications can invalidate a claim.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tools in transit cover</strong> — confirm whether your van policy
                includes tools in transit or whether you need a separate endorsement. &quot;Tools
                in transit&quot; cover protects tools while they are being transported but may
                not cover tools left in a parked vehicle overnight.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost: £1,500 to £3,000/year</strong> — van insurance for an electrical
                contractor varies based on vehicle value, location, claims history, and
                security measures. Fitting a GPS tracker and Thatcham-approved alarm can
                reduce premiums by 10 to 20 per cent.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'scheme-requirements',
    heading: 'NICEIC and NAPIT Insurance Requirements',
    content: (
      <>
        <p>
          Registration with NICEIC, NAPIT, ELECSA, or another approved competent person
          scheme is a condition of self-certifying notifiable electrical work. All schemes
          have minimum insurance requirements that must be met at registration and maintained
          throughout membership.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC requirements</strong> — minimum £2 million public liability
                insurance. Evidence must be provided at annual reassessment. NICEIC does
                not currently mandate professional indemnity or employer&apos;s liability
                (though EL is a legal requirement if you employ staff). The NICEIC may
                request to see your insurance schedule rather than just the certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT requirements</strong> — minimum £2 million public liability
                insurance required for all NAPIT registered businesses. Higher levels of
                cover may be required for specific work types (e.g., commercial, industrial,
                or specialist systems).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial client requirements</strong> — commercial clients,
                principal contractors, and public sector bodies frequently require £5 million
                PL and £10 million EL as minimum conditions for being added to approved
                supplier lists. Check the requirements of each client before tendering.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Track your compliance and certification with Elec-Mate"
          description="Keep your NICEIC registration documents, insurance certificates, and compliance records organised with Elec-Mate. Join 430+ UK electrical contractors."
          icon={ShieldCheck}
        />
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Electrical Contractor Insurance Costs in 2026',
    content: (
      <>
        <p>
          The following costs are indicative for 2026. Premiums vary based on turnover,
          number of employees, location, type of work, and claims history. Always obtain
          at least three quotes before purchasing any business insurance policy.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability (£5m, sole trader)</strong> — £400 to £900/year.
                Specialist work (HV, industrial, data centre) increases premiums to £800 to
                £1,500+.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employer&apos;s liability (£10m, 1–3 employees)</strong> — £300 to
                £600/year. Premiums scale with payroll and type of work. Higher-risk work
                (scaffolding, working at height) increases premiums significantly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional indemnity (£1m, design services)</strong> — £200 to
                £500/year for a sole trader with modest design turnover. Increases with
                the value and complexity of design work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tool insurance (£10,000 cover)</strong> — £150 to £350/year.
                Multi-year policies with no claims discount can reduce this to £100 to
                £200/year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Combined package policies</strong> — PL + EL + PI + tools combined
                packages typically cost £900 to £2,500/year for a sole trader or small
                business. Package policies are generally better value than buying individual
                policies separately.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Running a Compliant, Protected Business',
    content: (
      <>
        <p>
          Having the right insurance is one pillar of a protected electrical business. Equally
          important is ensuring your certification, quoting, and invoicing processes are
          professional and legally compliant.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue Compliant Certificates on Every Job</h4>
                <p className="text-white text-sm leading-relaxed">
                  A valid certificate is your first line of defence in any insurance or
                  liability claim. If your work is challenged, a properly completed and
                  signed EIC or EICR demonstrates you carried out the work correctly.
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  to ensure every job has a compliant, timestamped certificate.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote and Invoice in Writing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Written quotes and invoices protect you in any payment dispute. A signed
                  quote is also evidence of the scope of work agreed — essential if a client
                  later claims you caused damage outside the agreed scope. Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to produce professional documentation on every job.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Protect your business with professional documentation"
          description="Join 430+ UK electricians using Elec-Mate for compliant certificates, professional quotes, and organised job records. 7-day free trial — no credit card required."
          icon={Zap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalContractorInsurancePage() {
  return (
    <GuideTemplate
      title="Electrical Contractor Insurance UK 2026 | PL, EL, PI and Tools Guide"
      description="Complete guide to insurance for electrical contractors in the UK. Public liability (minimum £2m, typically £5m), employer's liability (legal requirement, £5m minimum), professional indemnity, tool insurance, van insurance, NICEIC/NAPIT requirements, and 2026 costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Electrical Contractor Insurance UK:{' '}
          <span className="text-yellow-400">What You Need and How Much It Costs in 2026</span>
        </>
      }
      heroSubtitle="Insurance is essential for every electrical contractor. This guide explains the four main types of cover — public liability, employer's liability, professional indemnity, and tool insurance — along with van insurance, NICEIC and NAPIT requirements, and 2026 cost estimates for sole traders and small electrical businesses."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Contractor Insurance"
      relatedPages={relatedPages}
      ctaHeading="Run a Professional, Compliant Electrical Business"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for compliant certificates, professional quotes, and organised job management. 7-day free trial."
    />
  );
}
