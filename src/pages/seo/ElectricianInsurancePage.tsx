import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Shield,
  PoundSterling,
  Calculator,
  Receipt,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Truck,
  Wrench,
  Users,
  FileText,
  TrendingUp,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/going-self-employed-electrician' },
  { label: 'Insurance', href: '/guides/electrician-insurance-uk' },
];

const tocItems = [
  { id: 'why-insurance', label: 'Why You Need Insurance' },
  { id: 'public-liability', label: 'Public Liability Insurance' },
  { id: 'professional-indemnity', label: 'Professional Indemnity' },
  { id: 'employers-liability', label: 'Employers Liability' },
  { id: 'tools-cover', label: 'Tools and Equipment Cover' },
  { id: 'van-insurance', label: 'Van Insurance' },
  { id: 'typical-costs', label: 'Typical Costs' },
  { id: 'choosing-provider', label: 'Choosing the Right Provider' },
  { id: 'claiming', label: 'Making a Claim' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Public liability insurance is essential for every electrician — most competent person schemes (NICEIC, NAPIT, ELECSA) require it as a condition of registration.',
  'Professional indemnity insurance covers claims arising from faulty advice, incorrect design, or certification errors — increasingly important for electricians issuing certificates.',
  'Employers liability insurance is a legal requirement if you employ anyone, including apprentices — with a £2,500 daily fine for non-compliance.',
  'Tools and equipment cover protects your livelihood — a stolen multifunction tester costs £1,000+ to replace, and your van insurance may not cover tools inside the vehicle.',
  'All insurance premiums are fully allowable business expenses — every pound spent reduces your taxable profit.',
];

const faqs = [
  {
    question: 'How much public liability insurance do I need as an electrician?',
    answer:
      'The standard requirement is £2 million public liability cover for domestic work. Most competent person schemes (NICEIC, NAPIT, ELECSA) require a minimum of £2 million as a condition of registration. For commercial work, clients typically require £5 million or £10 million cover — check the requirements in the contract or tender documents before quoting. Some main contractors and local authorities require £10 million as standard. The cost difference between £2 million and £5 million cover is often only £50 to £100 per year, so it is worth getting the higher level if you do any commercial work. The policy covers injury to third parties (members of the public, clients, tenants) and damage to third-party property caused by your work — for example, if you drill through a water pipe and flood a customer flat.',
  },
  {
    question: 'Do I need professional indemnity insurance as an electrician?',
    answer:
      'Professional indemnity (PI) insurance covers claims arising from professional advice, design work, or certification errors. As an electrician, you issue electrical certificates (EICs, EICRs, Minor Works) that certify the safety of an installation. If a certificate contains an error — for example, you certify an installation as satisfactory when it has a defect that later causes injury or damage — the affected party could bring a professional negligence claim against you. PI insurance covers the legal costs and any damages awarded. While PI insurance is not a legal requirement for electricians, it is increasingly recommended — particularly if you carry out inspection and testing work, design electrical installations, or issue certificates that other parties rely on. Many competent person schemes now recommend or require PI cover. Typical cover levels are £100,000 to £500,000.',
  },
  {
    question: 'Is employers liability insurance a legal requirement?',
    answer:
      'Yes, if you employ anyone — including apprentices, labourers, or other electricians — you must have employers liability insurance with a minimum cover of £5 million. This is a legal requirement under the Employers Liability (Compulsory Insurance) Act 1969. The fine for not having employers liability insurance is £2,500 for every day you are not insured. The insurance covers claims from employees who are injured or become ill as a result of their work. Even if your apprentice trips over a cable and breaks their wrist, they could bring a claim. You must display the employers liability certificate at your place of work (or make it available electronically). If you are a sole trader with no employees, you do not need employers liability insurance — but the moment you take on an apprentice, a labourer, or a subcontractor who works under your direct supervision, the requirement kicks in.',
  },
  {
    question: 'Does my van insurance cover tools stolen from the van?',
    answer:
      'Usually not — or only up to a low limit. Standard van insurance policies typically exclude tools and equipment from the vehicle, or cover them only up to £250 to £500. A multifunction tester alone costs £800 to £1,500, and the average electrician carries £3,000 to £8,000 of tools and equipment in their van. You need separate tools cover (also called plant and tools insurance or inland transit cover) to protect your equipment. This covers tools whether they are in the van, on site, or in transit. Some insurers offer combined van and tools policies. Check the policy wording carefully — some policies require the van to be locked and alarmed, or exclude theft from an unattended vehicle. Keep an up-to-date inventory of your tools with serial numbers and photos. This makes the claims process much faster if you need to make a claim.',
  },
  {
    question: 'Can I claim insurance costs as a business expense?',
    answer:
      'Yes. All insurance premiums related to your business are fully allowable expenses for tax purposes. This includes public liability, professional indemnity, employers liability, tools and equipment cover, van insurance, and personal accident cover (if it is a business policy). The premiums reduce your taxable profit pound for pound. For example, if your total insurance costs are £1,500 per year and you pay tax at the 20% basic rate, the tax saving is £300 — plus National Insurance savings on top. Keep records of all insurance payments. Elec-Mate expenses tracker lets you photograph your insurance documents and categorise them as business expenses automatically.',
  },
  {
    question: 'What does public liability insurance NOT cover?',
    answer:
      'Public liability insurance covers injury to third parties and damage to third-party property caused by your work. It does not cover: damage to your own property or tools (that is a separate policy), claims from employees (that is employers liability), professional negligence or certification errors (that is professional indemnity), defective workmanship or the cost of redoing your own work (that is typically excluded unless it caused third-party damage), deliberate or criminal acts, contractual liabilities (unless specifically endorsed), or work outside the UK (unless the policy has a worldwide extension). It also does not cover fines, penalties, or regulatory action. Read the policy wording carefully and discuss exclusions with your broker. The cheapest policy may have the most exclusions.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/going-self-employed-electrician',
    title: 'Going Self-Employed',
    description:
      'Complete guide to setting up as a self-employed electrician — registration, pricing, insurance, and more.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-tax-guide-uk',
    title: 'Electrician Tax Guide UK',
    description:
      'Claim insurance as an allowable expense and reduce your tax bill. Full guide to electrician tax.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/hourly-rate-calculator-electrician',
    title: 'Hourly Rate Calculator',
    description:
      'Factor insurance costs into your hourly rate to ensure your pricing covers all overheads.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/cis-for-electricians',
    title: 'CIS for Electricians',
    description:
      'Construction Industry Scheme guide — deduction rates, registration, and monthly returns.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/guides/debt-recovery-electricians',
    title: 'Debt Recovery for Electricians',
    description:
      'Payment terms, late payment interest, small claims court, and credit control advice.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/expense-tracker',
    title: 'Expenses Tracker',
    description:
      'Track insurance payments and all business expenses. Photograph receipts and export for your accountant.',
    icon: Receipt,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-insurance',
    heading: 'Why Every Electrician Needs Insurance',
    content: (
      <>
        <p>
          Electrical work carries inherent risk. A wiring error can cause a fire. A loose connection
          can cause an electric shock. A poorly installed consumer unit can fail catastrophically.
          Even if you are careful, experienced, and competent, things can go wrong — and when they
          do, the financial consequences can be devastating.
        </p>
        <p>
          Insurance protects you from those consequences. If a customer's property is damaged, if
          someone is injured, if a certificate you issued turns out to be wrong — insurance covers
          the claim and the legal costs. Without it, you are personally liable, and a single
          significant claim could wipe out your savings, your van, your tools, and your business.
        </p>
        <p>
          Beyond protection, insurance is often a requirement. Most{' '}
          <SEOInternalLink href="/guides/going-self-employed-electrician">
            competent person schemes
          </SEOInternalLink>{' '}
          (NICEIC, NAPIT, ELECSA) require public liability insurance as a condition of registration.
          Many main contractors require proof of insurance before you can work on their sites.
          Commercial clients and local authorities often specify minimum cover levels in their
          contracts. And if you employ anyone, employers liability insurance is a legal requirement.
        </p>
        <p>
          The good news: insurance for electricians is relatively affordable, and every premium is a
          fully allowable business expense — reducing your{' '}
          <SEOInternalLink href="/guides/electrician-tax-guide-uk">taxable profit</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'public-liability',
    heading: 'Public Liability Insurance: The Essential Cover',
    content: (
      <>
        <p>
          Public liability insurance is the most important policy for any electrician. It covers
          claims from third parties (members of the public, customers, tenants, passers-by) for
          injury or property damage caused by your work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What it covers:</strong> Injury to a third party caused by your work (for
                example, a customer receives an electric shock from a faulty installation). Damage
                to third-party property (for example, you drill through a pipe and flood the flat
                below). Legal defence costs if a claim is brought against you, even if it turns out
                to be unfounded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cover levels:</strong> £2 million is the standard minimum for domestic work
                and is required by most competent person schemes. £5 million is recommended if you
                do any commercial work. £10 million may be required by main contractors and local
                authorities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical cost:</strong> £150 to £400 per year for a sole trader electrician
                with £2 million cover. £250 to £600 for £5 million cover. Premiums depend on your
                turnover, the type of work you do, and your claims history.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Public liability is the one policy you absolutely cannot operate without. If you are
          registering with a competent person scheme, sorting your insurance is one of the first
          steps. Keep your certificate of insurance somewhere accessible — you will need to show it
          to scheme assessors, main contractors, and sometimes customers.
        </p>
      </>
    ),
  },
  {
    id: 'professional-indemnity',
    heading: 'Professional Indemnity Insurance: Protecting Your Certificates',
    content: (
      <>
        <p>
          Professional indemnity (PI) insurance covers claims arising from professional advice,
          design, or certification that turns out to be wrong. For electricians, the most common
          scenario is a certificate that contains an error — for example, certifying an installation
          as satisfactory when it has a defect.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR errors:</strong> You carry out an EICR and mark the installation as
                Satisfactory. Six months later, a fire starts due to a fault you should have
                detected. The landlord or their insurer brings a professional negligence claim
                against you.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design errors:</strong> You design an electrical installation and specify
                undersized cable or incorrect protection. The installation fails, causing damage.
                The client claims for the cost of rectification and any consequential losses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Advice errors:</strong> You advise a client that their existing installation
                is adequate when it is not. They rely on your advice and suffer a loss. PI insurance
                covers the claim.
              </span>
            </li>
          </ul>
        </div>
        <p>
          PI insurance is particularly important for electricians who carry out{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">landlord EICRs</SEOInternalLink>,
          design electrical installations, or provide consultancy services. Cover levels typically
          range from £100,000 to £500,000. The cost is modest — usually £80 to £200 per year for a
          sole trader.
        </p>
        <p>
          Important: PI insurance is a "claims made" policy, meaning it covers claims made during
          the policy period, regardless of when the work was done. If you cancel your PI insurance,
          you lose cover for all past work. Consider "run-off" cover if you stop trading.
        </p>
      </>
    ),
  },
  {
    id: 'employers-liability',
    heading: 'Employers Liability Insurance: A Legal Requirement',
    content: (
      <>
        <p>
          If you employ anyone — even one person, even part-time, even an apprentice — you are
          legally required to have employers liability insurance with a minimum cover of £5 million.
          This is not optional. The fine for not having it is £2,500 per day.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The legal requirement:</strong> The Employers Liability (Compulsory
                Insurance) Act 1969 requires all employers to have employers liability insurance.
                The minimum cover is £5 million (most policies provide £10 million). The certificate
                must be displayed at your place of work or made available electronically to
                employees.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who counts as an employee:</strong> Anyone working under a contract of
                employment — including full-time, part-time, temporary, and apprentice employees.
                Some subcontractors may also be considered employees if they work under your direct
                supervision and control, even if they are nominally self-employed. HMRC and insurers
                look at the reality of the working relationship, not just the label.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical cost:</strong> £50 to £200 per year for a small electrical business
                with 1 to 3 employees. The cost increases with the number of employees and the
                nature of the work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are a sole trader with no employees, you do not need employers liability insurance.
          But the moment you take on an apprentice or hire a mate to help on a bigger job, you need
          it. Get it in place before the employee starts work, not after.
        </p>
      </>
    ),
  },
  {
    id: 'tools-cover',
    heading: 'Tools and Equipment Cover: Protecting Your Livelihood',
    content: (
      <>
        <p>
          Your tools are your livelihood. A typical electrician carries £3,000 to £8,000 of tools
          and test equipment in their van — and replacing everything after a theft can take weeks
          and cost thousands.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What it covers:</strong> Theft, accidental damage, and loss of hand tools,
                power tools, test equipment, and other work equipment. Cover applies whether the
                tools are in the van, on site, at your home, or in transit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Van insurance limitations:</strong> Most van insurance policies exclude
                tools and equipment or cover them only up to a very low limit (£250 to £500). Your
                multifunction tester alone may cost more than this. Do not rely on van insurance for
                tools cover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical cost:</strong> £100 to £300 per year for £5,000 to £10,000 of tools
                cover. Some insurers offer combined van and tools policies. The excess (the amount
                you pay towards each claim) is usually £100 to £250.
              </span>
            </li>
          </ul>
        </div>
        <p>
          To make a tools claim easy, keep an up-to-date inventory. List every significant item with
          its make, model, serial number, date of purchase, and cost. Photograph your tool kit
          regularly. If you buy a new tester or power tool, add it to the list and update your
          insurer about the total value. Elec-Mate's{' '}
          <SEOInternalLink href="/tools/expense-tracker">expenses tracker</SEOInternalLink> can help
          — every tool purchase you log is a record of what you own and what it cost.
        </p>
      </>
    ),
  },
  {
    id: 'van-insurance',
    heading: 'Van Insurance: Business Use Classification',
    content: (
      <>
        <p>
          Your van is essential to your business, and getting the right insurance classification is
          critical. Using a van for work without the correct insurance class is illegal — and any
          claim made under an incorrect policy could be refused.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Class 1 (Social, Domestic, Pleasure):</strong> Personal use only. Does not
                cover any business use — including driving to and from work. Not suitable for
                electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Class 2 (SDP + Commuting):</strong> Covers driving to a fixed place of work.
                Not suitable if you drive to different sites each day.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Class 3 (Business Use):</strong> Covers driving for business purposes,
                including travelling between sites, visiting customers, and collecting materials.
                This is the minimum class for a self-employed electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hire and Reward / Carriage of Goods:</strong> Needed if you carry materials
                or goods for other people as part of a commercial delivery service. Most
                electricians do not need this unless they also run a delivery or courier service.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Most electricians need Class 3 business use cover at minimum. If you have an apprentice or
          employee who also drives the van, make sure they are named on the policy or covered under
          an "any driver" extension. Van insurance is a fully allowable business expense — include
          it in your{' '}
          <SEOInternalLink href="/guides/hourly-rate-calculator-electrician">
            hourly rate calculation
          </SEOInternalLink>{' '}
          to ensure your pricing covers all vehicle costs.
        </p>
      </>
    ),
  },
  {
    id: 'typical-costs',
    heading: 'How Much Does Electrician Insurance Cost?',
    content: (
      <>
        <p>
          Insurance costs vary depending on your turnover, the type of work you do, your location,
          your claims history, and the cover levels you choose. Here are typical annual costs for a
          sole trader electrician in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability (£2 million):</strong> £150 to £400 per year
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional indemnity (£250,000):</strong> £80 to £200 per year
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employers liability (£10 million):</strong> £50 to £200 per year (1 to 3
                employees)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tools cover (£5,000 to £10,000):</strong> £100 to £300 per year
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Van insurance (business use):</strong> £600 to £1,500 per year (depending on
                vehicle, age, location, NCB)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total (excluding van):</strong> £380 to £1,100 per year for a sole trader
              </span>
            </li>
          </ul>
        </div>
        <p>
          Many insurers offer combined trade packages that bundle public liability, professional
          indemnity, tools cover, and personal accident into a single policy — often at a lower
          total cost than buying each cover separately. Compare combined packages from specialist
          trade insurers alongside individual policies from general insurers.
        </p>
        <p>
          Remember: every pound of insurance premium is a tax-deductible business expense. At the
          20% basic rate, £1,000 of insurance costs you £800 after tax relief — plus you get the
          National Insurance saving on top.
        </p>
        <SEOAppBridge
          title="Track insurance costs alongside all business expenses"
          description="Elec-Mate's expenses tracker captures every business cost including insurance premiums, tool purchases, fuel, and materials. See your real profit in real time and export everything for your accountant."
          icon={Receipt}
        />
      </>
    ),
  },
  {
    id: 'choosing-provider',
    heading: 'Choosing the Right Insurance Provider',
    content: (
      <>
        <p>
          Not all insurance policies are created equal. The cheapest quote may have the most
          exclusions, the highest excess, or the worst claims process. Here is what to look for when
          comparing electrician insurance:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist trade insurer vs general insurer.</strong> Specialist trade
                insurers (like Hiscox, Markel, Zurich, or Rhino Trade Insurance) understand
                electrical work and write policies tailored to the trade. General insurers may use
                generic construction policies that do not fit your work as well.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Policy wording.</strong> Read the exclusions carefully. Does the policy
                cover work at height? Underground work? Work in occupied properties? Hot works
                (soldering)? Does it cover damage to existing structures caused by your work?
                Exclusions in the small print can leave you exposed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Excess amount.</strong> The excess is the amount you pay towards each claim
                before the insurance kicks in. A £250 excess on a £500 tools claim means the insurer
                pays only £250. Lower excess usually means a higher premium — balance the two.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Claims process.</strong> How easy is it to make a claim? Is there a 24-hour
                claims line? How long does settlement typically take? Check reviews from other
                tradespeople.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use a broker who specialises in trade insurance — they can compare multiple insurers and
          find the best combination of cover, price, and policy wording for your specific situation.
          Alternatively, get direct quotes from 3 to 4 specialist trade insurers and compare them
          yourself.
        </p>
      </>
    ),
  },
  {
    id: 'claiming',
    heading: 'Making an Insurance Claim: What to Do',
    content: (
      <>
        <p>
          When something goes wrong, the way you handle the immediate aftermath can affect whether
          your claim is accepted and how quickly it is settled. Here is the process:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Make the situation safe.</strong> If there is an immediate danger (fire,
                live exposed conductors, water leak), take steps to make it safe. Isolate the supply
                if necessary. Call emergency services if required. Your first duty is safety.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Document everything.</strong> Take photographs of the damage, the work you
                were doing, and the surrounding area. Write down exactly what happened, when, and
                who was present. Keep any damaged materials or components as evidence. The more
                documentation you have, the smoother the claim will be.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notify your insurer immediately.</strong> Most policies require you to
                notify the insurer within a set period (24 to 48 hours for some claims). Do not
                delay. Call the claims line, provide the details, and follow their instructions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not admit liability.</strong> Be helpful and cooperative, but do not tell
                the customer or anyone else that you accept fault. Let the insurer investigate and
                determine liability. Admitting fault before the insurer has assessed the claim can
                complicate the process.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For tools theft, report the theft to the police and get a crime reference number — your
          insurer will require this. Having a pre-existing tools inventory with serial numbers and
          photos will speed up the settlement significantly.
        </p>
        <SEOAppBridge
          title="Keep a digital record of every tool and expense"
          description="Elec-Mate's expenses tracker creates a digital audit trail of every tool purchase, complete with receipts and amounts. If you ever need to make a tools insurance claim, the inventory is already there."
          icon={Wrench}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianInsurancePage() {
  return (
    <GuideTemplate
      title="Electrician Insurance UK 2026 | What Cover Do You Need?"
      description="Complete guide to insurance for UK electricians. Covers public liability, professional indemnity, employers liability, tools cover, van insurance, typical costs, and how to choose the right provider."
      datePublished="2026-01-18"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Insurance Guide"
      badgeIcon={Shield}
      heroTitle={
        <>
          Electrician Insurance UK 2026:{' '}
          <span className="text-yellow-400">What Cover Do You Actually Need?</span>
        </>
      }
      heroSubtitle="Public liability, professional indemnity, employers liability, tools cover, and van insurance — which policies do you need, how much do they cost, and what do they actually cover? This guide explains every type of insurance for UK electricians with real costs and practical advice."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Insurance"
      relatedPages={relatedPages}
      ctaHeading="Track All Business Expenses Including Insurance"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to track expenses, send invoices, and manage their business. Every insurance payment captured, every tool purchase logged, every receipt stored. 7-day free trial, cancel anytime."
    />
  );
}
