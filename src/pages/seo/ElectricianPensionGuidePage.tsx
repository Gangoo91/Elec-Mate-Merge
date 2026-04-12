import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PiggyBank,
  PoundSterling,
  Shield,
  Calculator,
  TrendingUp,
  Clock,
  Briefcase,
  FileCheck2,
  Users,
  CheckCircle,
  AlertTriangle,
  Calendar,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/how-to-get-first-electrical-customer' },
  { label: 'Pension Guide', href: '/guides/electrician-pension-self-employed' },
];

const tocItems = [
  { id: 'overview', label: 'Why Pensions Matter' },
  { id: 'no-auto-enrolment', label: 'No Auto-Enrolment for Self-Employed' },
  { id: 'pension-types', label: 'Pension Types Compared' },
  { id: 'tax-relief', label: 'Tax Relief Explained' },
  { id: 'how-much', label: 'How Much to Save' },
  { id: 'state-pension', label: 'State Pension Qualification' },
  { id: 'retirement-planning', label: 'Retirement Planning' },
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Self-employed electricians are NOT auto-enrolled into a pension. Nobody is doing this for you — if you do not set up and contribute to a pension yourself, you will have nothing beyond the state pension at retirement.',
  'The government adds 25% to your pension contributions through basic rate tax relief. If you pay in £100, HMRC tops it up to £125 automatically. Higher rate taxpayers can claim an additional 20% back through self-assessment.',
  'NEST pension is the simplest option: low fees (0.3% annual management charge), government-backed, designed for self-employed people. You can contribute as little as £10 per month.',
  'The rule of thumb: take half your age when you start and contribute that percentage of your income. Start at 30? Save 15% of your income. Start at 40? Save 20%. The earlier you start, the less you need to save.',
  'You need 35 qualifying years of National Insurance contributions to get the full new state pension (£221.20 per week in 2026/27). Check your NI record on the HMRC app or gov.uk — gaps can be filled.',
];

const faqs = [
  {
    question: 'Am I auto-enrolled into a pension as a self-employed electrician?',
    answer:
      'No. Auto-enrolment only applies to employees. As a self-employed sole trader or partnership, no one is legally required to enrol you into a pension or make contributions on your behalf. You must set up and contribute to a pension yourself. If you operate through a limited company and pay yourself a salary through PAYE, you are technically both employer and employee — in theory auto-enrolment applies, but in practice most single-director companies are exempt. Either way, you need to take responsibility for your own pension savings.',
  },
  {
    question: 'What is the best pension for a self-employed electrician?',
    answer:
      'For most self-employed electricians, NEST (National Employment Savings Trust) is the best starting point. It was specifically designed for people without access to a workplace pension, has very low fees (0.3% annual management charge after the first contribution charge is removed), accepts contributions from £10 per month, and is government-backed. If you want more investment choices and are comfortable managing your own investments, a SIPP (Self-Invested Personal Pension) from a provider like Vanguard, AJ Bell, or Hargreaves Lansdown gives you access to a wider range of funds. If you want simplicity and low fees, NEST. If you want control and flexibility, a SIPP.',
  },
  {
    question: 'How does pension tax relief work for self-employed people?',
    answer:
      'When you contribute to a pension, the government adds basic rate tax relief (20%) automatically. This works on a "relief at source" basis: you pay in £80 and the pension provider claims £20 from HMRC, giving you £100 in your pension pot. Effectively, a £100 contribution only costs you £80. If you are a higher rate taxpayer (40%), you can claim an additional £20 back through your self-assessment tax return — so a £100 pension contribution effectively costs you only £60. The annual allowance for pension contributions with tax relief is £60,000 (2026/27), or 100% of your earnings if lower. Most self-employed electricians are well within this limit.',
  },
  {
    question: 'How much should I save into a pension each month?',
    answer:
      'A widely used rule of thumb is: take half your age when you start saving and contribute that percentage of your pre-tax income. If you start at 25, save 12.5%. At 30, save 15%. At 40, save 20%. For a self-employed electrician earning £45,000 per year who starts at age 30, that is £6,750 per year or £562 per month. This might feel like a lot, but remember that tax relief effectively reduces the cost by 20-40%. The reality is that most electricians start their pension late — if you are starting in your 40s, you will need to save aggressively. Even £200 per month from age 30 grows to approximately £180,000 by age 67 (assuming 5% annual growth after fees).',
  },
  {
    question: 'What happens to my pension if my income varies month to month?',
    answer:
      'This is a genuine concern for self-employed electricians whose income fluctuates with the seasons and job pipeline. The good news is that personal pensions and NEST allow flexible contributions. You can set up a low regular monthly amount (even £50 per month) and then make additional lump sum payments in good months. Some electricians prefer to save a percentage of each job into a separate savings account and then transfer it to their pension quarterly. There is no penalty for varying your contributions or skipping months during quiet periods.',
  },
  {
    question: 'Should I use a SIPP or a personal pension?',
    answer:
      'A SIPP (Self-Invested Personal Pension) is a type of personal pension that gives you full control over your investments — you choose the funds, shares, or assets your money goes into. A standard personal pension (from a provider like NEST, Scottish Widows, or Aviva) offers a smaller range of pre-built investment options and the provider makes most investment decisions. If you are comfortable choosing your own investments and want lower ongoing fees, a SIPP is usually better. If you want to set it up and forget about it, a personal pension with a default fund is simpler. The tax treatment is identical — both get the same tax relief.',
  },
  {
    question: 'Can I access my pension before age 57?',
    answer:
      'The minimum pension age is rising to 57 in 2028 (currently 55). You cannot access your pension before this age without paying significant tax penalties — up to 55% of the amount withdrawn. There are very limited exceptions for serious ill health. Be extremely wary of any company that offers to help you access your pension early — these are almost always scams and you will lose a large proportion of your pot to tax charges and their fees. Your pension is for retirement. If you need accessible savings for emergencies, keep a separate emergency fund in a savings account.',
  },
  {
    question: 'Do I still get a state pension if I am self-employed?',
    answer:
      'Yes, provided you have enough qualifying years of National Insurance contributions. Self-employed people pay Class 2 NI (£3.45 per week in 2026/27) and Class 4 NI (6% on profits between £12,570 and £50,270, plus 2% above £50,270). Class 2 contributions count towards your state pension qualifying years. You need 35 qualifying years for the full new state pension and at least 10 qualifying years to get anything at all. Check your NI record at gov.uk/check-national-insurance-record — if you have gaps, you may be able to fill them by paying voluntary contributions.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/dividend-vs-salary-electrician',
    title: 'Dividend vs Salary Guide',
    description:
      'Optimal salary and dividend split for electricians operating through a limited company.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-business-insurance',
    title: 'Business Insurance Guide',
    description: 'Public liability, professional indemnity, and employers liability explained.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/mileage-claims-electricians',
    title: 'Mileage Claims for Electricians',
    description:
      'HMRC mileage rates and what travel qualifies as a tax-deductible business expense.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-get-first-electrical-customer',
    title: 'Getting Your First Customer',
    description:
      'Starting your electrical business — registration, pricing, insurance, and marketing.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Professional PDF quotes with itemised pricing — grow your revenue to fund your pension.',
    icon: FileCheck2,
    category: 'Tool',
  },
  {
    href: '/guides/hiring-first-employee-electrician',
    title: 'Hiring Your First Employee',
    description:
      'Auto-enrolment duties, PAYE, and the true cost of employment for electrical businesses.',
    icon: Users,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Pensions Matter for Self-Employed Electricians',
    content: (
      <>
        <p>
          As a self-employed electrician, you are building a business — but are you building a
          retirement? Most employees are auto-enrolled into a workplace pension from their first
          day. Self-employed people are not. If you do not set up a pension yourself, you will have
          nothing beyond the state pension when you stop working.
        </p>
        <p>
          The full new state pension is £221.20 per week (2026/27) — that is £11,502 per year. It is
          not enough to live comfortably, and it is certainly not enough to maintain the lifestyle
          that a successful electrician is used to.
        </p>
        <p>
          Electrical work is physically demanding. Most electricians cannot realistically work at
          the same pace in their 60s and 70s. A pension gives you the freedom to slow down, choose
          your jobs, or stop entirely when you are ready — not when your body forces you to.
        </p>
      </>
    ),
  },
  {
    id: 'no-auto-enrolment',
    heading: 'No Auto-Enrolment: You Are on Your Own',
    content: (
      <>
        <p>
          Auto-enrolment is the system that requires employers to set up workplace pensions and
          contribute on behalf of their employees. It does not apply to self-employed sole traders
          or partners.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" /> The Self-Employed Pension Gap
          </h4>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span>No employer to set up a pension for you</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span>
                No employer contributions (employed electricians typically get 3-5% on top of their
                salary)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span>No automatic deduction — you have to actively choose to save</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
              <span>
                You DO still get government tax relief on contributions (25% top-up at basic rate)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
              <span>You CAN contribute to any personal pension or SIPP of your choice</span>
            </li>
          </ul>
        </div>
        <p>
          Research by the DWP shows that only 16% of self-employed people in the UK are actively
          saving into a pension. For electricians specifically, the proportion is thought to be
          higher (many are financially aware), but there is still a significant pension savings gap
          among tradespeople.
        </p>
      </>
    ),
  },
  {
    id: 'pension-types',
    heading: 'Pension Types Compared',
    content: (
      <>
        <p>
          There are three main pension options available to self-employed electricians. Each has
          different features, fees, and levels of control.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-3 text-white text-sm">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <PiggyBank className="w-4 h-4 text-blue-400" /> NEST Pension
              </h4>
              <ul className="space-y-2">
                <li>
                  Annual charge: <strong className="text-yellow-400">0.3%</strong>
                </li>
                <li>
                  Min contribution: <strong className="text-yellow-400">£10/month</strong>
                </li>
                <li>
                  Investment choice: <strong className="text-yellow-400">Limited (5 funds)</strong>
                </li>
                <li>
                  Setup: <strong className="text-yellow-400">Free, online</strong>
                </li>
                <li className="text-white text-xs mt-2">Best for: simplicity and low fees</li>
              </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" /> SIPP
              </h4>
              <ul className="space-y-2">
                <li>
                  Annual charge: <strong className="text-yellow-400">0.15-0.45%</strong>
                </li>
                <li>
                  Min contribution: <strong className="text-yellow-400">Varies (often £0)</strong>
                </li>
                <li>
                  Investment choice:{' '}
                  <strong className="text-yellow-400">Full (1000s of funds)</strong>
                </li>
                <li>
                  Setup: <strong className="text-yellow-400">Free, online</strong>
                </li>
                <li className="text-white text-xs mt-2">Best for: control and fund choice</li>
              </ul>
            </div>
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400" /> Personal Pension
              </h4>
              <ul className="space-y-2">
                <li>
                  Annual charge: <strong className="text-yellow-400">0.5-1.5%</strong>
                </li>
                <li>
                  Min contribution: <strong className="text-yellow-400">£25-50/month</strong>
                </li>
                <li>
                  Investment choice: <strong className="text-yellow-400">Moderate</strong>
                </li>
                <li>
                  Setup: <strong className="text-yellow-400">Via provider or adviser</strong>
                </li>
                <li className="text-white text-xs mt-2">Best for: hands-off with guidance</li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          <strong>Our recommendation:</strong> Start with NEST if you just want to get going with
          minimal hassle. Move to a SIPP once your pot reaches £10,000+ and you want more control
          over your investments. Avoid personal pensions with charges above 0.75% — the fee
          difference compounds significantly over 30+ years.
        </p>
      </>
    ),
  },
  {
    id: 'tax-relief',
    heading: 'Tax Relief: Free Money from the Government',
    content: (
      <>
        <p>
          Pension tax relief is the single biggest incentive for saving into a pension. The
          government effectively gives you free money on every contribution you make.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Basic Rate Taxpayer (20%)</h3>
            <p className="text-white text-sm leading-relaxed">
              You pay £80 into your pension. HMRC tops it up to £100 automatically (relief at
              source). Every £100 in your pension only costs you £80. Over a year, if you contribute
              £400 per month (£4,800), the government adds £1,200 — giving you £6,000 in your
              pension pot.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Higher Rate Taxpayer (40%)</h3>
            <p className="text-white text-sm leading-relaxed">
              You get the same 20% top-up at source, PLUS you claim an additional 20% back through
              your self-assessment tax return. Every £100 in your pension only costs you £60. If you
              earn over £50,270, pension contributions are one of the most tax-efficient things you
              can do with your money.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Worked Example</h3>
          <div className="text-white text-sm space-y-2">
            <p>Self-employed electrician, profit £45,000, basic rate taxpayer</p>
            <p>Pays £400/month into NEST pension (£4,800/year)</p>
            <p>
              HMRC adds 25% tax relief: £4,800 becomes{' '}
              <strong className="text-yellow-400">£6,000 in the pension</strong>
            </p>
            <p>Tax saving on self-assessment: reduces taxable profit by £6,000</p>
            <p>
              Income tax saved: £6,000 x 20% = <strong className="text-yellow-400">£1,200</strong>
            </p>
            <p>
              Class 4 NI saved: £6,000 x 6% = <strong className="text-yellow-400">£360</strong>
            </p>
            <p className="font-bold text-yellow-400 pt-2">
              Effective cost of £6,000 pension contribution: £3,240
            </p>
          </div>
        </div>
        <p>
          <strong>Important:</strong> The annual allowance for pension contributions with tax relief
          is £60,000 (2026/27) or 100% of your annual earnings, whichever is lower. Most
          self-employed electricians are well within this limit.
        </p>
      </>
    ),
  },
  {
    id: 'how-much',
    heading: 'How Much Should You Save?',
    content: (
      <>
        <p>
          The amount you need to save depends on when you start, when you want to retire, and what
          income you want in retirement. Here is a practical framework.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">The "Half Your Age" Rule</h4>
          <p className="text-white text-sm mb-4">
            Take the age you start saving and halve it. That is the percentage of your pre-tax
            income you should aim to save each year (including tax relief).
          </p>
          <div className="grid gap-3 sm:grid-cols-4 text-white text-sm">
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3 text-centre">
              <p className="font-bold text-green-400">Start at 25</p>
              <p>Save 12.5%</p>
              <p className="text-xs mt-1">£469/month on £45k</p>
            </div>
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3 text-centre">
              <p className="font-bold text-blue-400">Start at 30</p>
              <p>Save 15%</p>
              <p className="text-xs mt-1">£562/month on £45k</p>
            </div>
            <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-3 text-centre">
              <p className="font-bold text-yellow-400">Start at 35</p>
              <p>Save 17.5%</p>
              <p className="text-xs mt-1">£656/month on £45k</p>
            </div>
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-centre">
              <p className="font-bold text-red-400">Start at 40</p>
              <p>Save 20%</p>
              <p className="text-xs mt-1">£750/month on £45k</p>
            </div>
          </div>
        </div>
        <p>
          These amounts include the government tax relief top-up. So "save 15%" means the total
          going into the pension is 15% of your income — your actual cash outlay is lower because of
          tax relief.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-3">What Could Your Pot Be Worth?</h4>
          <div className="text-white text-sm space-y-2">
            <p>£300/month from age 30 to 67 (37 years) at 5% growth after fees:</p>
            <p className="font-bold text-yellow-400 text-lg">Approximately £375,000</p>
            <p>£500/month from age 30 to 67 (37 years) at 5% growth after fees:</p>
            <p className="font-bold text-yellow-400 text-lg">Approximately £625,000</p>
            <p className="text-xs mt-2">
              These are illustrative projections. Actual returns will vary based on investment
              performance.
            </p>
          </div>
        </div>
        <p>
          <strong>The key message:</strong> starting early matters far more than the amount. £200
          per month from age 25 will give you a bigger pot than £400 per month from age 40, because
          of compound growth.
        </p>
      </>
    ),
  },
  {
    id: 'state-pension',
    heading: 'State Pension: Know Your Entitlement',
    content: (
      <>
        <p>
          The new state pension is a foundation — not a complete retirement plan. Understanding how
          it works ensures you are building on solid ground.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full state pension:</strong> £221.20 per week (£11,502/year) in 2026/27. You
                need 35 qualifying years of National Insurance contributions to receive the full
                amount.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum qualifying years:</strong> You need at least 10 qualifying years to
                receive any state pension. Between 10 and 35 years, you receive a proportional
                amount (for example, 20 years = 20/35ths of the full pension).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-employed contributions:</strong> Class 2 NI contributions (£3.45/week)
                count towards your qualifying years. If you file a self-assessment tax return and
                pay your NI, each year should count automatically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check your record:</strong> Go to gov.uk/check-national-insurance-record or
                use the HMRC app. It shows how many qualifying years you have, any gaps, and your
                projected state pension amount. If you have gaps, you can often fill them by paying
                voluntary Class 3 contributions (£17.45/week).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>State pension age:</strong> Currently 66, rising to 67 between 2026 and
                2028, and expected to rise further. Plan on the basis that you may not receive your
                state pension until 68 or later.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'retirement-planning',
    heading: 'Retirement Planning for Electricians',
    content: (
      <>
        <p>
          A pension is the cornerstone of retirement planning, but it is not the only tool
          available. Successful electricians typically build retirement income from multiple
          sources.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <PiggyBank className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pension (Tax-Advantaged)</h4>
                <p className="text-white text-sm leading-relaxed">
                  Your primary retirement savings vehicle. Benefits from tax relief on
                  contributions, tax-free growth inside the pot, and 25% tax-free lump sum at
                  retirement. The rest is taxed as income when you withdraw it, but most retirees
                  are in a lower tax bracket than during their working years.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">ISA (Tax-Free Access)</h4>
                <p className="text-white text-sm leading-relaxed">
                  A Stocks and Shares ISA allows you to invest up to £20,000 per year with all
                  growth and withdrawals completely tax-free. Unlike a pension, you can access it at
                  any age without penalty. Useful for bridging the gap if you want to slow down
                  before your pension becomes accessible at age 57.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Briefcase className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Business Value</h4>
                <p className="text-white text-sm leading-relaxed">
                  If you build a successful electrical business with employees, recurring contracts,
                  and a strong reputation, the business itself has value. You may be able to sell
                  it, bring in a partner, or wind it down gradually — extracting value over several
                  years. This is not a pension replacement, but it is part of the picture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'getting-started',
    heading: 'Getting Started: Set Up Your Pension Today',
    content: (
      <>
        <p>
          The best time to start a pension was when you first went self-employed. The second best
          time is today. Here is exactly how to get started.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1. Check your NI record.</strong> Go to
                gov.uk/check-national-insurance-record. Make sure you have no gaps. If you do,
                consider filling them with voluntary contributions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2. Choose a provider.</strong> For simplicity, open a NEST account at
                nestyourpension.org.uk. For more control, open a SIPP with Vanguard, AJ Bell, or
                similar. Both can be done online in 15 minutes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3. Set up a direct debit.</strong> Even £100 per month is a start. Set it up
                to leave your account on the day after your quietest billing day — treat it like a
                bill, not an option.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4. Increase annually.</strong> Each year, increase your contribution by
                £25–£50 per month. You will barely notice the difference month to month, but over a
                career it adds up to tens of thousands of pounds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>5. Claim your tax relief.</strong> If you are a higher rate taxpayer, make
                sure your accountant includes pension contributions on your self-assessment return
                to claim the additional 20% relief.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Build a more profitable business"
          description="Elec-Mate helps you quote professionally, certify on site, and manage your jobs — so you earn more and have more to put into your future. 7-day free trial."
          icon={PiggyBank}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianPensionGuidePage() {
  return (
    <GuideTemplate
      title="Self-Employed Electrician Pension Guide UK 2026"
      description="Complete pension guide for self-employed electricians. NEST, SIPP, personal pension compared. Tax relief explained, how much to save, state pension qualification, and retirement planning."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Financial Guide"
      badgeIcon={PiggyBank}
      heroTitle={
        <>
          Self-Employed Electrician Pension Guide 2026:{' '}
          <span className="text-yellow-400">Secure Your Future, Start Now</span>
        </>
      }
      heroSubtitle="No one is saving for your retirement except you. Self-employed electricians are not auto-enrolled into a pension. This guide explains your options (NEST, SIPP, personal pension), how tax relief gives you 25-40% extra, how much to save, and how to build a pension that matches your ambitions."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Self-Employed Pensions"
      relatedPages={relatedPages}
      ctaHeading="Earn More, Save More, Retire Better"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for quoting, certification, and job management. The more efficiently you run your business, the more you can invest in your future. 7-day free trial, cancel anytime."
    />
  );
}
