import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Shield,
  PoundSterling,
  Users,
  Wrench,
  AlertTriangle,
  Briefcase,
  FileCheck2,
  TrendingUp,
  Car,
  CheckCircle,
  Scale,
  Lock,
  Monitor,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/how-to-get-first-electrical-customer' },
  { label: 'Business Insurance', href: '/guides/electrician-business-insurance' },
];

const tocItems = [
  { id: 'overview', label: 'Insurance Overview' },
  { id: 'public-liability', label: 'Public Liability' },
  { id: 'professional-indemnity', label: 'Professional Indemnity' },
  { id: 'employers-liability', label: 'Employers Liability' },
  { id: 'other-cover', label: 'Other Cover Types' },
  { id: 'typical-costs', label: 'Typical Costs' },
  { id: 'choosing-provider', label: 'Choosing a Provider' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Public liability insurance is not legally required for sole traders, but it is effectively essential. Most competent person schemes (NICEIC, NAPIT, ELECSA) require it, and many customers and main contractors will not hire you without it. Cover of £1 million to £5 million is standard.',
  'Professional indemnity insurance covers you if your design work or advice causes a client financial loss. If you design circuits, specify equipment, or sign off on installations, professional indemnity is important.',
  'Employers liability insurance IS a legal requirement if you employ anyone — including apprentices, subcontractors on your PAYE, or part-time admin staff. The minimum cover level is £5 million and you can be fined £2,500 per day without it.',
  'A typical sole trader electrician pays £300 to £800 per year for a combined business insurance policy covering public liability (£2m), professional indemnity, personal accident, and tool cover.',
  'Cyber insurance is increasingly relevant if you store customer data, take online payments, or use cloud-based business software. A data breach can cost thousands in fines, notification costs, and lost business.',
];

const faqs = [
  {
    question: 'Is public liability insurance a legal requirement for electricians?',
    answer:
      'No — public liability insurance is not a legal requirement for sole trader or limited company electricians. However, it is effectively essential for several reasons. First, most competent person schemes (NICEIC, NAPIT, ELECSA) require you to hold public liability insurance as a condition of registration. Without scheme membership, you cannot self-certify notifiable work under Part P of the Building Regulations. Second, most main contractors, housing associations, and commercial clients require you to provide a public liability insurance certificate before you can start work. Third, a single claim for property damage or personal injury caused by your work could run into tens or hundreds of thousands of pounds — enough to bankrupt a sole trader.',
  },
  {
    question: 'How much public liability cover do I need?',
    answer:
      'For most domestic electricians, £1 million to £2 million of public liability cover is standard and sufficient. If you work on commercial or industrial projects, or if you subcontract to larger firms, they may require £5 million or even £10 million. Check the requirements of your competent person scheme and your major clients. The cost difference between £1 million and £5 million of cover is often only £50 to £100 per year, so it is worth opting for higher cover. If in doubt, go for £5 million — it covers virtually all situations.',
  },
  {
    question: 'Do I need professional indemnity insurance?',
    answer:
      'If you design electrical installations, specify equipment, provide energy assessments, produce reports, or give advice that clients rely on financially, then yes — professional indemnity insurance protects you if that advice or design turns out to be wrong and causes a financial loss. For example, if you design a circuit that turns out to be undersized and the client has to pay for it to be ripped out and redone, professional indemnity covers your liability. If you purely carry out installation work to someone else\'s design, professional indemnity is less critical — but increasingly, electricians are designing and installing, which blurs the line.',
  },
  {
    question: 'When do I need employers liability insurance?',
    answer:
      'Employers liability insurance is a legal requirement from the moment you employ anyone. This includes full-time employees, part-time employees, apprentices, temporary staff, and in some cases subcontractors who work under your direction and control. The minimum cover level is £5 million (most policies provide £10 million). You must display the certificate at your place of work (or make it available electronically). The fine for not having employers liability insurance is £2,500 per day. If you are a sole trader with no employees, you do not need it — but the moment you take on an apprentice or hire help, you must have it in place before they start.',
  },
  {
    question: 'What does personal accident insurance cover?',
    answer:
      'Personal accident insurance pays out a lump sum or weekly benefit if you are injured and unable to work. As a self-employed electrician, you have no employer to pay sick pay. If you fall off a ladder, injure your back, or damage your hands and cannot work for weeks or months, personal accident insurance provides income replacement. Weekly benefits typically range from £200 to £750 per week, with lump sums for permanent disability or death. This is separate from income protection insurance, which covers illness as well as accidents. For electricians, who face daily physical risks, personal accident cover is strongly recommended.',
  },
  {
    question: 'How much does electrician business insurance cost?',
    answer:
      'For a sole trader electrician with no employees, a combined business insurance policy typically costs £300 to £800 per year. This usually includes public liability (£1-2m), professional indemnity, personal accident, and sometimes tool cover. The exact price depends on your turnover, the type of work you do (domestic vs commercial), your claims history, your postcode, and the cover levels you choose. Adding employers liability (when you take on staff) adds approximately £100 to £300 per year. Business insurance is a tax-deductible expense — you claim the full premium against your profits.',
  },
  {
    question: 'Can I get business insurance monthly?',
    answer:
      'Yes. Most business insurance providers offer monthly payment options, typically with a small surcharge (5-10% over the annual premium). For a £500 annual policy, expect to pay approximately £45 to £50 per month. Some providers charge no additional fee for monthly payments. Monthly payment makes it easier to manage cash flow, particularly when starting out. However, paying annually is usually cheaper overall and one less thing to manage.',
  },
  {
    question: 'Do I need cyber insurance as an electrician?',
    answer:
      'If you store customer data (names, addresses, contact details, payment information) digitally — in a CRM, email, cloud storage, or business app — then a cyber security incident could expose that data. Under UK GDPR, you have obligations to protect personal data and notify the ICO of breaches. Cyber insurance covers the costs of dealing with a data breach: forensic investigation, notification to affected customers, regulatory fines, legal costs, and business interruption. For a sole trader, this is a relatively low risk, but the consequences can be disproportionately expensive. Cyber cover can often be added to a business insurance policy for £50 to £150 per year.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrician-tool-insurance',
    title: 'Tool Insurance Guide',
    description:
      'Dedicated tool cover — types, providers, van security discounts, and claims process.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-get-first-electrical-customer',
    title: 'Getting Your First Customer',
    description:
      'Starting your electrical business — registration, pricing, insurance, and finding customers.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/hiring-first-employee-electrician',
    title: 'Hiring Your First Employee',
    description:
      'Employers liability requirements, PAYE, pensions, and the true cost of employment.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/guides/mileage-claims-electricians',
    title: 'Mileage Claims for Electricians',
    description:
      'HMRC mileage rates and what travel qualifies as a tax-deductible business expense.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Professional PDF quotes with itemised pricing — include insurance overhead in your rates.',
    icon: FileCheck2,
    category: 'Tool',
  },
  {
    href: '/guides/electrician-pension-self-employed',
    title: 'Self-Employed Pension Guide',
    description:
      'NEST, SIPP, tax relief, and how much to save for retirement as a self-employed electrician.',
    icon: PoundSterling,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Business Insurance: What Every Electrician Needs',
    content: (
      <>
        <p>
          Business insurance protects you from the financial consequences of things going wrong —
          property damage, personal injury, faulty advice, data breaches, tool theft, and being
          unable to work. Without it, a single claim could wipe out your savings and your business.
        </p>
        <p>
          The right insurance package depends on your circumstances: whether you are a sole trader
          or limited company, whether you have employees, the type of work you do, and the size of
          your projects. This guide breaks down each type of cover, explains when you need it, and
          gives you realistic cost expectations.
        </p>
        <p>
          All business insurance premiums are tax-deductible — you claim them as a business expense
          against your profits.
        </p>
      </>
    ),
  },
  {
    id: 'public-liability',
    heading: 'Public Liability Insurance',
    content: (
      <>
        <p>
          Public liability insurance is the most important policy for any working electrician. It
          covers you if your work causes injury to a third party or damage to their property.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" /> What Public Liability Covers
          </h4>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
              <span>A customer trips over your cable and breaks their wrist — medical costs and compensation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
              <span>You accidentally drill through a water pipe and flood the kitchen — repair costs and water damage</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
              <span>A fire starts due to your installation work — property damage and legal defence costs</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
              <span>Your ladder damages a customer's parquet flooring — repair or replacement costs</span>
            </li>
          </ul>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-4 text-centre">
            <p className="font-bold text-white text-lg">£1 Million</p>
            <p className="text-white text-sm">Minimum for most domestic work and competent person schemes</p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-4 text-centre">
            <p className="font-bold text-white text-lg">£2-5 Million</p>
            <p className="text-white text-sm">Standard for established electricians and commercial work</p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-4 text-centre">
            <p className="font-bold text-white text-lg">£10 Million</p>
            <p className="text-white text-sm">Required by some main contractors and large commercial projects</p>
          </div>
        </div>
        <p>
          <strong>Cost:</strong> Public liability insurance for a sole trader electrician typically
          costs £100 to £300 per year for £1-2 million of cover, rising to £200 to £500 for
          £5 million. The cost increases with your turnover, the number of employees, and your
          claims history.
        </p>
      </>
    ),
  },
  {
    id: 'professional-indemnity',
    heading: 'Professional Indemnity Insurance',
    content: (
      <>
        <p>
          Professional indemnity (PI) insurance covers you if your professional advice, design work,
          or recommendations cause a client financial loss. This is separate from public liability,
          which covers physical injury and property damage.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">When You Need PI Insurance</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>You design electrical installations (circuit design, cable calculations)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>You specify equipment or materials for clients</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>You produce reports, surveys, or condition assessments</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>You provide energy performance certificates or assessments</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Clients rely on your advice for purchasing decisions</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Example Scenarios</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>You design a circuit with inadequate cable sizing — client pays for re-work</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>You recommend the wrong type of consumer unit — client has to replace it</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Your EICR report misses a defect that later causes damage</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Your energy assessment leads a client to make poor investment decisions</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          <strong>Cost:</strong> Professional indemnity cover of £100,000 to £250,000 typically costs
          £50 to £150 per year as a standalone policy. It is often included in combined business
          insurance packages at no extra cost.
        </p>
      </>
    ),
  },
  {
    id: 'employers-liability',
    heading: 'Employers Liability Insurance (Legal Requirement)',
    content: (
      <>
        <p>
          Employers liability insurance is the only business insurance that is a legal requirement in
          the UK. If you employ anyone — even one person, even part-time — you must have employers
          liability insurance with a minimum of £5 million cover.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
            <Scale className="w-5 h-5 text-red-400" /> Legal Requirements
          </h4>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span><strong>Required from day one</strong> — must be in place before your first employee starts</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span><strong>Minimum cover: £5 million</strong> (most policies provide £10 million as standard)</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span><strong>Fine: £2,500 per day</strong> for every day you operate without employers liability insurance</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span><strong>Fine: £1,000</strong> for failing to display the certificate (or make it accessible electronically)</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span><strong>Applies to:</strong> full-time, part-time, temporary staff, apprentices, and some subcontractors</span>
            </li>
          </ul>
        </div>
        <p>
          <strong>Cost:</strong> Employers liability insurance typically costs £100 to £300 per year
          for a small electrical firm with 1-3 employees. The cost rises with the number of
          employees, the type of work they do, and your claims history.
        </p>
        <p>
          <strong>Exception:</strong> If you are a sole trader with no employees, or a single-director
          limited company with no other staff, you do not need employers liability insurance. But the
          moment you hire anyone — including an apprentice — you must have it.
        </p>
      </>
    ),
  },
  {
    id: 'other-cover',
    heading: 'Other Cover Types Worth Considering',
    content: (
      <>
        <p>
          Beyond the three core policies, several additional cover types are relevant to electricians.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Tool and Equipment Cover</h4>
                <p className="text-white text-sm leading-relaxed">
                  Covers your tools and test equipment against theft, accidental damage, and
                  sometimes breakdown. Essential for electricians carrying £5,000+ of kit. See our
                  dedicated{' '}
                  <SEOInternalLink href="/guides/electrician-tool-insurance">
                    tool insurance guide
                  </SEOInternalLink>
                  {' '}for full details.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Car className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Van Insurance</h4>
                <p className="text-white text-sm leading-relaxed">
                  Commercial van insurance covering your vehicle for business use. Make sure
                  your policy covers business use (not just social/domestic/commuting). If you use
                  your van for carrying tools and materials to job sites, you need "carriage of own
                  goods" cover.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Personal Accident / Income Protection</h4>
                <p className="text-white text-sm leading-relaxed">
                  Pays a weekly or monthly benefit if you are injured or ill and cannot work.
                  Self-employed electricians have no employer sick pay — if you are off work, your
                  income stops. Personal accident cover is simpler and cheaper; income protection
                  covers illness too but costs more.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Scale className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Legal Expenses Insurance</h4>
                <p className="text-white text-sm leading-relaxed">
                  Covers legal costs for disputes with customers, suppliers, employees, or HMRC.
                  Employment tribunals, contract disputes, and tax investigations can generate
                  thousands in legal fees. Typically £50 to £100 per year for up to £100,000 of
                  legal costs cover.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <Monitor className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cyber Insurance</h4>
                <p className="text-white text-sm leading-relaxed">
                  If you store customer data digitally (names, addresses, payment details), take
                  card payments, or use cloud-based business software, a data breach could trigger
                  GDPR obligations and costs. Cyber insurance covers forensic investigation,
                  notification costs, regulatory fines, and business interruption. Typically £50 to
                  £150 per year.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'typical-costs',
    heading: 'Typical Costs for Electrician Business Insurance',
    content: (
      <>
        <p>
          Business insurance costs vary depending on your turnover, location, claims history, and
          the cover levels you choose. Here are realistic cost ranges for 2026.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2 text-white text-sm">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
              <h4 className="font-bold text-white mb-3">Sole Trader (No Employees)</h4>
              <ul className="space-y-2">
                <li>Public liability (£2m): <strong className="text-yellow-400">£100–£250/year</strong></li>
                <li>Professional indemnity: <strong className="text-yellow-400">£50–£150/year</strong></li>
                <li>Personal accident: <strong className="text-yellow-400">£50–£150/year</strong></li>
                <li>Tool cover (£10k): <strong className="text-yellow-400">£100–£300/year</strong></li>
                <li className="pt-2 border-t border-white/10">
                  <strong>Combined policy: </strong>
                  <strong className="text-yellow-400">£300–£800/year</strong>
                </li>
              </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
              <h4 className="font-bold text-white mb-3">Small Firm (1-5 Employees)</h4>
              <ul className="space-y-2">
                <li>Public liability (£5m): <strong className="text-yellow-400">£200–£500/year</strong></li>
                <li>Employers liability (£10m): <strong className="text-yellow-400">£100–£300/year</strong></li>
                <li>Professional indemnity: <strong className="text-yellow-400">£100–£250/year</strong></li>
                <li>Tool cover + fleet: <strong className="text-yellow-400">£300–£800/year</strong></li>
                <li className="pt-2 border-t border-white/10">
                  <strong>Combined policy: </strong>
                  <strong className="text-yellow-400">£700–£1,800/year</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          <strong>Tax deduction:</strong> All business insurance premiums are fully tax-deductible.
          A £600 combined policy effectively costs £480 after basic rate tax relief (20%), or £360
          after higher rate relief (40%).
        </p>
      </>
    ),
  },
  {
    id: 'choosing-provider',
    heading: 'Choosing an Insurance Provider',
    content: (
      <>
        <p>
          You can buy electrician business insurance from specialist trade insurers, general business
          insurance brokers, or comparison sites. Here is what to consider.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist trade insurers</strong> (Rhino Trade Insurance, Kingsbridge,
                Tradesman Saver) understand electrical work and offer policies tailored to
                electricians. Claims handling tends to be faster because they are familiar with trade
                risks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Comparison and aggregator sites</strong> (Simply Business, PolicyBee,
                Superscript) let you compare multiple quotes quickly. Useful for finding the best
                price, but check the policy wording carefully — cheaper is not always better.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance brokers</strong> can find you a policy and handle claims on your
                behalf. Useful if you have complex requirements (multiple employees, commercial
                projects, high turnover) or a claims history that makes direct purchase difficult.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Key factors:</strong> check cover limits, excess amounts, exclusions,
                claims process, and whether the policy is "claims made" (covers claims made during
                the policy period) or "claims occurring" (covers incidents during the policy period
                regardless of when the claim is made). "Claims occurring" is better.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Get the Right Cover',
    content: (
      <>
        <p>
          Insurance is not exciting, but it is one of the foundations of a professional electrical
          business. Get it right from the start and it protects you silently in the background.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Review Annually</h4>
                <p className="text-white text-sm leading-relaxed">
                  Your insurance needs change as your business grows. If your turnover increases,
                  you take on employees, or you start commercial work, your cover needs to increase
                  too. Review your policy at each renewal and adjust accordingly.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Build It Into Your Rates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Insurance is a cost of doing business. Factor it into your hourly rate or job
                  pricing using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  {' '}so customers are paying for your professionalism, not eating into your profit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Keep Certificates Accessible</h4>
                <p className="text-white text-sm leading-relaxed">
                  Store digital copies of your insurance certificates on your phone. Main
                  contractors and commercial clients often ask for proof of insurance before you can
                  start work. Being able to send it immediately looks professional and avoids delays.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your business professionally"
          description="Elec-Mate helps you quote, certify, and manage your electrical business from your phone. Professional tools for professional electricians. 7-day free trial."
          icon={Shield}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianBusinessInsurancePage() {
  return (
    <GuideTemplate
      title="Electrician Business Insurance UK 2026 | What You Need"
      description="Complete guide to business insurance for UK electricians. Public liability, professional indemnity, employers liability, tool cover, personal accident, cyber insurance. Typical costs £300-£800/year for sole traders."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Insurance Guide"
      badgeIcon={Shield}
      heroTitle={
        <>
          Electrician Business Insurance UK 2026:{' '}
          <span className="text-yellow-400">What You Need and What It Costs</span>
        </>
      }
      heroSubtitle="Public liability, professional indemnity, employers liability, tool cover, and more. This guide explains every type of business insurance relevant to UK electricians, when you need each one, realistic costs, and how to choose the right provider."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Business Insurance"
      relatedPages={relatedPages}
      ctaHeading="Build a Professional Electrical Business"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for quoting, certification, and job management. Professional tools that make you look professional. 7-day free trial, cancel anytime."
    />
  );
}
