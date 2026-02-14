import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Briefcase,
  Users,
  GraduationCap,
  PoundSterling,
  ShieldCheck,
  FileText,
  Truck,
  Scale,
  Receipt,
  Calculator,
  ClipboardCheck,
  Brain,
  Building,
  TrendingUp,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides' },
  { label: 'Contractor Guide', href: '/guides/electrical-contractor-guide' },
];

const tocItems = [
  { id: 'overview', label: 'Running an Electrical Contracting Business' },
  { id: 'sole-trader-to-ltd', label: 'Sole Trader to Limited Company' },
  { id: 'employing-staff', label: 'Employing Staff' },
  { id: 'apprentices', label: 'Taking On Apprentices' },
  { id: 'cis-obligations', label: 'CIS and Tax Obligations' },
  { id: 'insurance', label: 'Insurance Requirements' },
  { id: 'fleet-management', label: 'Fleet and Vehicle Management' },
  { id: 'pricing-profitability', label: 'Pricing and Profitability' },
  { id: 'systems-tools', label: 'Systems and Tools' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Moving from sole trader to limited company typically makes financial sense once profits exceed approximately £30,000-£40,000 per year — the corporation tax rate of 25% (for profits over £250,000) or the small profits rate of 19% is more tax-efficient than higher-rate income tax.',
  'Employing your first electrician or apprentice brings legal obligations including employer liability insurance (minimum £5 million), PAYE registration, workplace pensions auto-enrolment, and compliance with the Employment Rights Act 1996.',
  'The Construction Industry Scheme (CIS) requires contractors to deduct 20% (or 30% for unregistered subcontractors) from labour payments and report these deductions to HMRC monthly — failure to comply attracts penalties and interest.',
  'Electrical apprenticeships are funded by the Education and Skills Funding Agency (ESFA) — for employers with a payroll under £3 million, the government pays 95% of training costs, making apprentices a cost-effective way to grow your team.',
  'Elec-Mate gives your entire team access to certificates, calculators, AI tools, and training on their phones — one subscription covers everything your operatives need on site, from EICR forms to RAMS generation.',
];

const faqs = [
  {
    question: 'When should I switch from sole trader to limited company?',
    answer:
      'The tipping point is typically when your annual profits reach £30,000 to £40,000. As a sole trader, you pay income tax on all profits — 20% on the basic rate band, 40% above £50,270 (2025/26). A limited company pays corporation tax at 19% (small profits rate for profits under £50,000) or 25% (main rate for profits over £250,000), with a marginal relief taper in between. The company director takes a salary up to the National Insurance primary threshold (approximately £12,570 per year) and the remainder as dividends, which attract lower tax rates than employment income. However, a limited company has additional administrative costs — annual accounts, confirmation statements, corporation tax returns, and potentially higher accountancy fees. Speak to an accountant who specialises in construction sector businesses to model the tax saving based on your specific circumstances. Other benefits of a limited company include limited liability (your personal assets are protected if the business fails), a more professional image for winning larger contracts, and the ability to retain profits in the company for future investment.',
  },
  {
    question: 'What insurance do I need as an electrical contractor with employees?',
    answer:
      'The minimum insurance requirements are: employers liability insurance (EL) — legally required once you employ anyone, minimum cover of £5 million (most policies provide £10 million). You must display the EL certificate or make it available to employees. Public liability insurance (PL) — not legally required but essential in practice. Most main contractors and clients require £2 million minimum, with £5 million or £10 million increasingly standard for commercial work. Professional indemnity insurance (PI) — covers claims arising from errors in your professional advice, design, or certification work. Increasingly required for design-and-build contracts and any work involving AI-generated designs or calculations. Contractors all-risks insurance — covers tools, materials, and work in progress against theft, damage, and loss on site. Fleet insurance — if you have company vehicles, a fleet policy is more cost-effective than individual policies once you have 3 or more vehicles. You should also consider key person insurance, personal accident cover, and income protection for yourself as the business owner.',
  },
  {
    question: 'How does the Construction Industry Scheme (CIS) work?',
    answer:
      'The Construction Industry Scheme (CIS) is an HMRC scheme that requires contractors in the construction industry to deduct money from payments to subcontractors and pass it to HMRC. As a contractor (someone who pays subcontractors for construction work), you must register with HMRC as a contractor under CIS, verify each subcontractor with HMRC before making the first payment, deduct 20% from labour payments to registered subcontractors (or 30% for unregistered subcontractors), file a monthly CIS return with HMRC by the 19th of each month, and pay the deductions to HMRC by the 22nd of each month (or 19th if paying by post). Materials and VAT are excluded from the deduction — only the labour element is subject to CIS deduction. Subcontractors can apply for gross payment status (no deductions) if they meet HMRC criteria, including a clean compliance history and meeting a minimum turnover threshold. Failure to operate CIS correctly can result in penalties, interest, and a compliance review from HMRC. It is one of the most common areas where growing electrical contractors make mistakes.',
  },
  {
    question: 'How much does it cost to employ an apprentice electrician?',
    answer:
      'The direct costs of employing an apprentice electrician include: wages — the National Minimum Wage for apprentices (aged under 19, or aged 19+ in the first year of the apprenticeship) is £6.40 per hour (2025/26 rate). For apprentices aged 19+ beyond their first year, the standard NMW/NLW for their age applies. Many employers pay above the minimum to attract better candidates. Employers National Insurance contributions — 13.8% on earnings above the secondary threshold. Workplace pension contributions — minimum 3% employer contribution under auto-enrolment. Training costs — for employers with a payroll below £3 million (no Apprenticeship Levy obligation), the government pays 95% of the training costs and you pay the remaining 5%. For a Level 3 Installation Electrician apprenticeship, the total training cost is typically £18,000 (ESFA funding band), so your contribution is approximately £900 over the duration of the apprenticeship. Employers with fewer than 50 employees who take on an apprentice aged 16-18 pay 0% of the training costs — the government covers 100%. Additional costs include tools, PPE, workwear, test equipment, and supervision time.',
  },
  {
    question: 'Do I need to register with NICEIC or NAPIT as a contractor?',
    answer:
      'Registration with a competent person scheme (NICEIC, NAPIT, ELECSA, or BRE Certification) is not legally required, but it is effectively essential for a professional electrical contracting business. Without registration, you cannot self-certify notifiable electrical work under Part P of the Building Regulations — instead, Building Control must inspect and certify the work, which adds cost and delay. Most commercial clients, main contractors, and local authorities require scheme registration as a minimum condition for tendering. Registration also provides access to technical support, updates on regulation changes, and regular assessment visits that help maintain standards. Costs vary between schemes but typically include an application fee (£300-£600), an annual subscription (£500-£1,200 depending on the scheme and business size), and periodic assessment visit fees. The return on investment is significant — scheme registration opens up work opportunities, enables self-certification, and gives clients confidence in your competence.',
  },
  {
    question: 'How do I manage quality when I have multiple operatives on different sites?',
    answer:
      'Quality management becomes a challenge as soon as you have more than one team on site simultaneously. Key strategies include: standardised processes — use the same certificate app and documentation system across your entire team so that every EICR, EIC, and Minor Works certificate follows the same format and standard. Elec-Mate allows all your operatives to access the same certificate templates, calculators, and AI tools on their phones. Site supervision — establish a regular programme of site visits to check quality of work, particularly for newer or less experienced operatives. Use photos and the AI board scanner to review completed work remotely. Training and CPD — invest in ongoing training for all operatives, not just apprentices. Elec-Mate includes structured training courses that your team can complete on their phones. Checklists and sign-offs — create standard checklists for common job types (board changes, rewires, testing) that operatives must complete before leaving site. Review and feedback — review a sample of completed certificates and test results regularly. Use any errors as training opportunities rather than disciplinary issues.',
  },
  {
    question: 'What fleet vehicles work best for electrical contractors?',
    answer:
      'The ideal fleet vehicle depends on the type of work your team does. For domestic electricians, a medium van such as a Ford Transit Custom, Volkswagen Transporter, or Vauxhall Vivaro provides enough space for tools, test equipment, materials, and a consumer unit or two without being too large for residential streets and driveways. For commercial electricians carrying containment, cable drums, and distribution boards, a long-wheelbase high-roof van (Ford Transit, Mercedes Sprinter, or Volkswagen Crafter) is more appropriate. Consider electric vehicles — the UK government offers grants for electric vans, and the tax benefits are significant (0% BIK rate for company vans, lower running costs, and access to clean air zones). The upfront cost premium is offset by lower fuel, maintenance, and tax costs over the vehicle lifetime. For fleet management, install vehicle tracking (for insurance discounts, efficiency, and accountability), standardise the racking system across your fleet (Bott, Sortimo, or Modul-System), and establish a regular maintenance schedule. The average electrical contractor replaces fleet vehicles every 4-5 years or 100,000 miles.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/how-to-price-electrical-jobs',
    title: 'How to Price Electrical Jobs',
    description:
      'Pricing strategies for electrical work — day rates, fixed prices, materials markup, and profit margins.',
    icon: PoundSterling,
    category: 'Business',
  },
  {
    href: '/guides/starting-electrical-business',
    title: 'Starting an Electrical Business',
    description:
      'Complete guide to starting your own electrical business in the UK as a sole trader or limited company.',
    icon: Briefcase,
    category: 'Business',
  },
  {
    href: '/tools/ai-cost-engineer',
    title: 'AI Cost Engineer',
    description:
      'Produce itemised quotes with real UK trade pricing and labour estimates. Ensure consistent pricing across your team.',
    icon: Receipt,
    category: 'AI Tool',
  },
  {
    href: '/tools/rams-generator',
    title: 'RAMS Generator',
    description:
      'Generate site-specific risk assessments and method statements for your team. Consistent H&S documentation across all sites.',
    icon: ClipboardCheck,
    category: 'Health & Safety',
  },
  {
    href: '/guides/apprentice-portfolio-guide',
    title: 'Apprentice Portfolio Guide',
    description:
      'Guide to building an apprentice evidence portfolio. Help your apprentices meet their qualification requirements.',
    icon: GraduationCap,
    category: 'Apprentice',
  },
  {
    href: '/guides/cpd-for-electricians',
    title: 'CPD for Electricians',
    description:
      'Continuing professional development options for your team. Keep qualifications current and standards high.',
    icon: TrendingUp,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Running an Electrical Contracting Business in the UK',
    content: (
      <>
        <p>
          Growing from a sole trader with a van and a multi-function tester to a contracting
          business with employees, apprentices, multiple vehicles, and a pipeline of commercial
          projects is one of the most rewarding — and most challenging — transitions in the
          electrical trade.
        </p>
        <p>
          The technical side of the work stays the same. What changes is everything else: managing
          people, dealing with HMRC, handling CIS deductions, securing adequate insurance,{' '}
          <SEOInternalLink href="/guides/how-to-price-electrical-jobs">
            pricing work profitably
          </SEOInternalLink>{' '}
          at scale, maintaining quality across multiple sites, and keeping on top of the
          administrative burden that comes with running a business rather than just doing a job.
        </p>
        <p>
          This guide covers the practical aspects of running and growing an electrical contracting
          business in the UK — from the decision to incorporate, through employing your first staff
          member and taking on apprentices, to managing a fleet, handling CIS, and building systems
          that let you scale without sacrificing quality.
        </p>
      </>
    ),
  },
  {
    id: 'sole-trader-to-ltd',
    heading: 'Sole Trader to Limited Company: When to Make the Switch',
    content: (
      <>
        <p>
          Most electricians start as sole traders because it is simple — you register with HMRC for
          Self Assessment, file one tax return per year, and pay income tax and Class 2/4 National
          Insurance on your profits. There is no requirement to file accounts with Companies House,
          no annual confirmation statements, and minimal administrative overhead.
        </p>
        <p>
          As your profits grow, however, the tax efficiency of a limited company becomes
          significant. Here is a simplified comparison:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Sole Trader</h3>
            <p className="text-white text-sm leading-relaxed">
              All profits are taxed as personal income. Income tax at 20% on profits between £12,571
              and £50,270, then 40% above £50,270. Class 4 NI at 6% on profits between £12,570 and
              £50,270. Simple administration. No requirement to file accounts publicly. Unlimited
              personal liability — your personal assets are at risk if the business incurs debts.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Limited Company</h3>
            <p className="text-white text-sm leading-relaxed">
              Company pays corporation tax on profits — 19% (small profits rate) to 25% (main rate).
              Director takes a small salary (up to the NI threshold) and the remainder as dividends,
              which are taxed at 8.75% (basic rate) or 33.75% (higher rate). More complex
              administration — annual accounts, corporation tax return, payroll, VAT (if
              registered). Limited liability — personal assets are protected. More professional
              image for commercial contracts.
            </p>
          </div>
        </div>
        <p>
          The break-even point is typically around £30,000-£40,000 in annual profits, though the
          exact figure depends on your personal circumstances. Speak to an accountant who
          understands the construction sector before making the switch. The one-off cost of
          incorporation is minimal (£12 to £50 to register with Companies House), but the ongoing
          administrative costs are higher — budget approximately £1,500-£3,000 per year for an
          accountant to handle your company accounts, corporation tax return, and payroll.
        </p>
      </>
    ),
  },
  {
    id: 'employing-staff',
    heading: 'Employing Your First Staff Member',
    content: (
      <>
        <p>
          Taking on your first employee is the single biggest step in growing from a sole trader to
          a contracting business. It doubles your capacity, opens up larger jobs, and creates the
          potential for genuine business growth. It also brings a raft of legal obligations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employer's Liability Insurance</strong> — legally required from day one.
                Minimum £5 million cover (most policies provide £10 million). You must display the
                certificate or make it accessible to employees.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PAYE registration</strong> — register as an employer with HMRC before your
                first employee's start date. You must operate PAYE, deducting income tax and
                National Insurance from wages and paying employer's NI on top.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace pension</strong> — auto-enrolment applies from the first employee.
                You must set up a qualifying workplace pension scheme and enrol eligible employees.
                Minimum employer contribution is 3% of qualifying earnings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employment contract</strong> — you must provide a written statement of
                employment terms on or before the employee's first day. This must include pay rate,
                hours of work, holiday entitlement, notice periods, and other key terms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and safety</strong> — once you have 5 or more employees, you must
                have a written health and safety policy. Regardless of employee count, you have a
                duty to assess risks, provide training, and ensure a safe working environment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The employee vs subcontractor question is important. HMRC's employment status rules
          determine whether a worker is an employee or a self-employed subcontractor, and getting
          this wrong can result in significant tax liabilities and penalties. If you are currently
          self-employed and considering your options, see our{' '}
          <SEOInternalLink href="/guides/electrician-self-employed">
            electrician self-employed guide
          </SEOInternalLink>{' '}
          for more detail. Use the HMRC Check Employment Status for Tax (CEST) tool to determine the
          correct status, but be aware that CEST is not always definitive — take professional advice
          for borderline cases.
        </p>
      </>
    ),
  },
  {
    id: 'apprentices',
    heading: 'Taking On Apprentices',
    content: (
      <>
        <p>
          Apprentices are one of the most cost-effective ways to grow your team. The government
          funding model means that for most small electrical contractors, 95% (or 100% in some
          cases) of the training costs are covered by the Education and Skills Funding Agency
          (ESFA).
        </p>
        <p>
          The Level 3 Installation Electrician apprenticeship typically takes 3 to 4 years and
          covers all the theory and practical skills needed to become a qualified electrician,
          including BS 7671, inspection and testing, installation work, and health and safety.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Funding: What You Actually Pay</h4>
                <p className="text-white text-sm leading-relaxed">
                  For employers with a payroll below £3 million (no Apprenticeship Levy), the
                  government pays 95% of the training costs. For a Level 3 Installation Electrician
                  apprenticeship at the maximum funding band of £18,000, your contribution is
                  approximately £900 over the full duration. If you have fewer than 50 employees and
                  the apprentice is aged 16-18, you pay nothing — 100% government funded. You can
                  also claim a £1,000 incentive payment for taking on an apprentice aged 16-18.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">What You Need to Provide</h4>
                <p className="text-white text-sm leading-relaxed">
                  As the employer, you provide: real work experience across all aspects of
                  electrical installation, a qualified supervisor (your supervising electrician
                  should hold the relevant qualifications and have sufficient experience), time off
                  for college or training provider attendance (typically one day per week or block
                  release), tools, PPE, and workwear, and support for their{' '}
                  <SEOInternalLink href="/guides/ojt-evidence-guide">
                    on-the-job training (OJT) evidence
                  </SEOInternalLink>{' '}
                  portfolio. Elec-Mate includes apprentice training courses and portfolio building
                  tools that your apprentice can access on their phone.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Finding and Selecting Apprentices</h4>
                <p className="text-white text-sm leading-relaxed">
                  Advertise through the government's Find an Apprenticeship service, your local
                  college or training provider, social media, and word of mouth. Look for candidates
                  who are physically fit, good with their hands, willing to learn, and reliable —
                  the technical knowledge comes with training. Interview candidates on site if
                  possible and give them a practical task (such as stripping and terminating a short
                  length of cable) to assess manual dexterity and attention to detail.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Train your apprentices with Elec-Mate"
          description="Structured training courses for Level 2 and Level 3 electrical apprentices. OJT evidence tracking, EPA preparation, and BS 7671 study resources — all on their phone. Included in every subscription."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'cis-obligations',
    heading: 'CIS: Construction Industry Scheme Obligations',
    content: (
      <>
        <p>
          The Construction Industry Scheme (CIS) is one of the most common areas where growing
          electrical contractors get into trouble with HMRC. If you pay subcontractors for
          construction work (which includes electrical installation), you are a contractor under CIS
          and must comply with the scheme.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Register as a CIS contractor</strong> — before making your first payment to
                a subcontractor, register with HMRC as a CIS contractor. You can register online
                through your HMRC business tax account.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify subcontractors</strong> — before making the first payment to any
                subcontractor, verify them with HMRC. HMRC will confirm the subcontractor's
                registration status and the deduction rate to apply (0% for gross, 20% for
                registered, 30% for unregistered).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Make deductions correctly</strong> — deduct the correct percentage from the
                labour element of each payment. Materials, plant hire, and VAT are excluded from the
                deduction. Provide the subcontractor with a written statement showing the gross
                amount, materials deducted, and CIS deduction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>File monthly returns</strong> — submit a CIS return to HMRC by the 19th of
                each month, reporting all payments and deductions made in the previous tax month.
                Late filing attracts an automatic £100 penalty per month per return.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pay deductions to HMRC</strong> — pay the total CIS deductions to HMRC by
                the 22nd of each month (or 19th if paying by cheque). Late payment attracts
                interest.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Common CIS mistakes include forgetting to verify new subcontractors (resulting in 30%
          deductions instead of 20%), failing to file monthly returns on time, deducting CIS from
          materials as well as labour, and not providing subcontractors with payment and deduction
          statements. An accountant experienced in construction can set up your CIS processes
          correctly from the start and save you from costly errors.
        </p>
      </>
    ),
  },
  {
    id: 'insurance',
    heading: 'Insurance Requirements for Electrical Contractors',
    content: (
      <>
        <p>
          As your business grows, your insurance requirements increase. The following covers are
          essential:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employer's Liability (EL)</strong> — legally required. Minimum £5 million,
                typically £10 million. Must be in place from the moment you employ anyone, including
                apprentices. You can be fined up to £2,500 for every day you are uninsured.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public Liability (PL)</strong> — covers claims from third parties for injury
                or property damage arising from your work. £2 million is the minimum for domestic
                work; £5 million or £10 million is standard for commercial contracts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional Indemnity (PI)</strong> — covers claims arising from
                professional advice, design errors, or certification mistakes. Increasingly required
                by clients and main contractors, particularly for design-and-build work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contractors All-Risks</strong> — covers tools, materials, and work in
                progress against theft, damage, fire, and flood while on site or in transit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fleet/Motor Trade Insurance</strong> — covers all your business vehicles. A
                fleet policy is typically cheaper per vehicle than individual policies once you have
                3 or more vehicles.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use a specialist construction insurance broker rather than a general insurance comparison
          site. Construction insurance is a specialist area, and a broker who understands the
          electrical contracting sector will ensure you have the correct level of cover for your
          specific activities and contractual obligations. For more on starting out, see our{' '}
          <SEOInternalLink href="/guides/starting-electrical-business">
            starting an electrical business guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'fleet-management',
    heading: 'Fleet and Vehicle Management',
    content: (
      <>
        <p>
          Your fleet is one of the largest overhead costs in an electrical contracting business. For
          a contractor with 5 vans, the annual cost of vehicle finance, insurance, fuel,
          maintenance, and road tax can easily exceed £50,000 per year. Managing this efficiently
          has a direct impact on profitability.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Finance options</strong> — outright purchase, hire purchase (HP), contract
                hire, or finance lease. Contract hire is increasingly popular because it includes
                maintenance and provides a fixed monthly cost. HP allows you to own the vehicle at
                the end of the agreement and claim capital allowances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric vehicles</strong> — electric vans attract significant tax benefits:
                0% benefit-in-kind (BIK) rate for company vans, 100% first-year capital allowance,
                lower running costs (approximately 4p per mile vs 15p per mile for diesel), and
                exemption from clean air zone charges. The range of electric vans is now sufficient
                for most domestic and light commercial electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Van racking</strong> — standardise the racking system across your fleet so
                that any operative can work from any van. Bott, Sortimo, and Modul-System are the
                main commercial racking suppliers. A well-organised van saves time on every job.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vehicle tracking</strong> — GPS tracking systems provide real-time location
                data, driving behaviour analysis, and historical route information. Benefits include
                reduced insurance premiums (many insurers offer 10-15% discounts for tracked
                fleets), improved efficiency (route optimisation), and accountability.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing-profitability',
    heading: 'Pricing and Profitability at Scale',
    content: (
      <>
        <p>
          Pricing becomes more critical as you grow. When it is just you, an underpriced job costs
          you a day's profit. When you have five operatives, an underpriced job costs five days'
          worth of wages, vehicle costs, and overheads. Consistent, accurate pricing across your
          team is essential for profitability.
        </p>
        <p>Key principles for pricing as a contractor:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Know your true overhead rate</strong> — add up all your fixed costs (vehicle
                costs, insurance, office/yard rent, software subscriptions, accountancy, phone
                bills, scheme registration fees) and divide by the number of billable hours across
                your team. This gives you the overhead cost per operative hour, which must be
                covered before you make any profit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Charge rate vs pay rate</strong> — if you pay an electrician £20 per hour,
                your charge-out rate must be at least £40-£50 per hour to cover employer's NI,
                pension contributions, holiday pay, sick pay, vehicle costs, overheads, and profit.
                The charge-out rate should be 2x to 2.5x the pay rate as a minimum.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standardise pricing</strong> — use the same pricing tool across your team so
                that quotes are consistent regardless of who produces them. Elec-Mate's{' '}
                <SEOInternalLink href="/tools/ai-cost-engineer">AI Cost Engineer</SEOInternalLink>{' '}
                produces itemised quotes from a job description, ensuring consistent pricing with
                real UK trade data.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Track profitability per job, per operative, and per job type. If board changes are
          consistently profitable but rewires are marginal, adjust your{' '}
          <SEOInternalLink href="/guides/rewire-cost-uk">rewire pricing</SEOInternalLink>. If one
          operative consistently takes longer than others on the same job types, investigate whether
          the issue is speed, quality, or scope management. Use Elec-Mate's{' '}
          <SEOInternalLink href="/tools/cash-flow-planner">cash flow planner</SEOInternalLink> to
          track your business finances alongside job profitability.
        </p>
        <SEOAppBridge
          title="Consistent pricing across your entire team"
          description="Elec-Mate's AI Cost Engineer generates itemised quotes from a job description. Every operative produces quotes with the same materials pricing, labour rates, and profit margin. No more inconsistent quoting from different team members."
          icon={Receipt}
        />
      </>
    ),
  },
  {
    id: 'systems-tools',
    heading: 'Systems and Tools for Growing Contractors',
    content: (
      <>
        <p>
          The tools and systems you use as a sole trader rarely scale to a multi-operative
          contractor business. What works when it is just you — a notebook for jobs, a spreadsheet
          for quotes, WhatsApp for client communication — breaks down when you have a team to
          manage.
        </p>
        <p>Key systems to implement as you grow:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification platform</strong> — all your electricians producing
                certificates from the same app ensures consistency, compliance, and easy access to
                historical records. Elec-Mate provides EICR, EIC, Minor Works, Fire Alarm, Emergency
                Lighting, PAT Testing, EV Charger, and Solar PV certificates on one platform, with
                every operative accessing the same templates and tools on their phone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quoting and invoicing</strong> — standardise your quoting process so that
                every quote has a consistent format, accurate pricing, and clear terms. Elec-Mate
                includes AI-powered quoting and invoicing tools that produce professional documents
                from a job description.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and safety documentation</strong> — generate RAMS for every job.
                Elec-Mate's{' '}
                <SEOInternalLink href="/tools/rams-generator">RAMS Generator</SEOInternalLink>{' '}
                produces site-specific risk assessments from a job description, ensuring your team
                has compliant H&S documentation on every site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Training and CPD</strong> — keep your team's skills current with structured
                training. Elec-Mate includes 18th Edition courses, inspection and testing training,
                and CPD resources that your electricians and apprentices can access on their phones.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="One app for your entire team"
          description="Certificates, calculators, AI tools, quoting, invoicing, RAMS, and training — all in one app. Every operative in your business gets the same professional tools on their phone. Scale your contracting business with Elec-Mate."
          icon={Briefcase}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianContractorGuidePage() {
  return (
    <GuideTemplate
      title="Electrical Contractor Guide | Running a Team UK"
      description="Complete guide to growing an electrical contracting business in the UK. Sole trader to limited company, employing staff, apprenticeships, CIS obligations, insurance, fleet management, pricing at scale, and building systems for growth."
      datePublished="2025-09-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Briefcase}
      heroTitle={
        <>
          Electrical Contractor Guide:{' '}
          <span className="text-yellow-400">Running and Growing a Team</span>
        </>
      }
      heroSubtitle="From sole trader to limited company, employing your first electrician to managing a fleet of vans — this guide covers everything you need to know about running and growing an electrical contracting business in the UK. CIS, insurance, apprenticeships, pricing, and the systems that let you scale."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Running an Electrical Contracting Business"
      relatedPages={relatedPages}
      ctaHeading="Give Your Team the Tools They Need"
      ctaSubheading="Certificates, AI quoting, RAMS, calculators, and training — one app for every electrician and apprentice in your business. 7-day free trial, cancel anytime."
    />
  );
}
