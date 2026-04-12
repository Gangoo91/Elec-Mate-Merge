import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Calculator,
  Shield,
  Briefcase,
  FileCheck2,
  TrendingUp,
  Users,
  PiggyBank,
  CheckCircle,
  AlertTriangle,
  Scale,
  Building,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/how-to-get-first-electrical-customer' },
  { label: 'Dividend vs Salary', href: '/guides/dividend-vs-salary-electrician' },
];

const tocItems = [
  { id: 'overview', label: 'Why the Split Matters' },
  { id: 'optimal-salary', label: 'Optimal Salary 2026/27' },
  { id: 'dividend-tax', label: 'Dividend Tax Rates' },
  { id: 'corporation-tax', label: 'Corporation Tax' },
  { id: 'worked-example', label: 'Worked Example: £60k Profit' },
  { id: 'ni-thresholds', label: 'National Insurance Thresholds' },
  { id: 'ir35', label: 'IR35 Implications' },
  { id: 'accountant-vs-diy', label: 'Accountant vs DIY' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The optimal director salary for 2026/27 is £12,570 — the personal allowance. This uses your tax-free allowance, qualifies as a qualifying year for state pension, and is deducted as a business expense before corporation tax.',
  'Dividend tax rates are lower than income tax: 8.75% (basic rate), 33.75% (higher rate), and 39.35% (additional rate). The £1,000 dividend allowance means the first £1,000 of dividends is tax-free.',
  'Corporation tax is 19% on profits up to £50,000 (small profits rate) and 25% on profits over £250,000. Between £50,000 and £250,000, marginal relief applies — the effective rate tapers between 19% and 25%.',
  'For a limited company electrician with £60,000 profit: optimal salary of £12,570 plus dividends of approximately £39,100 results in a total tax burden of approximately £8,400 — compared to approximately £14,200 as a sole trader on the same income.',
  'IR35 rules determine whether HMRC considers you a "disguised employee." If most of your work is for one client and they control how and when you work, HMRC may treat your income as employment income — negating the tax benefits of a limited company.',
];

const faqs = [
  {
    question:
      'What is the most tax-efficient salary to pay myself as a limited company electrician?',
    answer:
      'For the 2026/27 tax year, the most common recommendation is a salary of £12,570 — the personal allowance. At this level, you pay no income tax on the salary (it falls within your tax-free personal allowance), no employee National Insurance (the primary threshold is £12,570), and the company pays no employer National Insurance (the secondary threshold is £9,100, so there IS a small employer NI cost of approximately £480 at this salary level). The salary is deducted as a business expense, reducing your corporation tax bill. Some accountants recommend a lower salary of £9,100 (the secondary NI threshold) to avoid employer NI entirely, but this means you lose the tax-free benefit of the personal allowance on the remaining £3,470. For most electricians, £12,570 is the optimal figure.',
  },
  {
    question: 'How are dividends taxed in 2026/27?',
    answer:
      'Dividends are taxed at lower rates than salary income: 8.75% within the basic rate band (income up to £50,270), 33.75% within the higher rate band (income from £50,270 to £125,140), and 39.35% within the additional rate band (income above £125,140). The first £1,000 of dividends falls within the dividend allowance and is tax-free. Your salary uses up part of your income tax bands first — so if your salary is £12,570 (the personal allowance), you have £37,700 of basic rate band remaining before dividends are taxed at the higher rate. Dividends do NOT attract National Insurance contributions, which is the primary tax advantage of taking dividends instead of a higher salary.',
  },
  {
    question: 'How does corporation tax work for small electrical companies?',
    answer:
      'For the 2026/27 tax year, the small profits rate of corporation tax is 19% on profits up to £50,000. The main rate is 25% on profits above £250,000. Between £50,000 and £250,000, marginal relief applies — the effective rate gradually increases from 19% to 25%. The marginal rate in this band is approximately 26.5%, which means each additional pound of profit between £50,000 and £250,000 is taxed at a higher effective rate. For most sole electricians operating through a limited company, profits will be below £50,000 after salary deduction, so the 19% rate applies. Corporation tax is calculated on profits after all allowable business expenses, including your director salary.',
  },
  {
    question: 'Should I be a sole trader or limited company?',
    answer:
      'The tax benefits of a limited company generally start to outweigh the extra administration costs when your annual profit exceeds £30,000 to £35,000. Below this level, the accountancy fees, filing requirements, and administrative burden of a limited company may not be worth the tax saving. Above £50,000 profit, the savings become significant — typically £3,000 to £6,000 per year compared to sole trader tax. However, tax is not the only consideration: a limited company provides limited liability (your personal assets are protected if the business is sued), looks more professional to some clients, and makes it easier to bring in partners or sell the business. The downsides are higher accountancy costs (£800-£1,500/year vs £200-£500 for a sole trader), more filing requirements, and less flexibility in extracting money.',
  },
  {
    question: 'What is IR35 and how does it affect electricians?',
    answer:
      'IR35 is HMRC legislation designed to identify "disguised employment" — people who work like employees but invoice through a limited company to pay less tax. If IR35 applies to a contract, the income from that contract is taxed as if you were an employee (PAYE income tax and National Insurance), eliminating the tax benefits of the salary/dividend split. IR35 is most likely to apply if: you work exclusively or primarily for one client, the client controls how, when, and where you work, you use the client\'s tools and equipment, and you cannot send a substitute. For electricians doing domestic work for multiple customers, IR35 is rarely an issue. For electricians on long-term contracts with a single commercial client or main contractor, it is a significant risk. If in doubt, get a contract review from an IR35 specialist.',
  },
  {
    question: 'Can I take all the profit as dividends and pay no salary?',
    answer:
      'Technically, yes — there is no legal requirement to pay yourself a salary. However, this is not recommended for two reasons. First, you miss out on your personal allowance (£12,570 of tax-free income). The company would pay 19% corporation tax on that £12,570 and you would then pay 8.75% dividend tax on it — a combined effective rate of approximately 26%. If you took it as salary instead, you would pay 0% tax and 0% employee NI (within the personal allowance). Second, without a salary above the lower earnings limit (£6,396 in 2026/27), the year does not count as a qualifying year for state pension purposes. Most accountants recommend a salary of at least £12,570.',
  },
  {
    question: 'How much does an accountant cost for a limited company electrician?',
    answer:
      'For a limited company electrician, a good accountant typically charges £800 to £1,500 per year. This usually includes: preparation and filing of annual accounts, corporation tax return, personal self-assessment tax return, monthly or quarterly bookkeeping, payroll (processing your director salary), VAT returns (if VAT registered), and general tax advice. Some accountants charge less (£500-£800) but offer fewer services — check what is included. The accountancy fee is a tax-deductible business expense and the tax savings from proper planning typically exceed the fee many times over. DIY accounting is possible using software like FreeAgent or Xero (£20-£40/month), but you need a solid understanding of tax rules to optimise your salary/dividend split correctly.',
  },
  {
    question: 'When should I take dividends — monthly or annually?',
    answer:
      'You can take dividends at any frequency — monthly, quarterly, or annually. Most limited company electricians take monthly dividends (like a regular salary top-up) for consistent cash flow. Legally, dividends must be declared at a board meeting and minuted (even if you are the sole director — the minute can be brief). You must have sufficient distributable reserves (retained profit after tax) to pay the dividend — paying dividends from money the company does not have is illegal. Your accountant can advise on a monthly dividend amount that keeps you within the basic rate band while leaving enough in the company for corporation tax and business expenses.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrician-pension-self-employed',
    title: 'Self-Employed Pension Guide',
    description: 'NEST, SIPP, tax relief, and retirement planning for self-employed electricians.',
    icon: PiggyBank,
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
    href: '/guides/electrician-business-insurance',
    title: 'Business Insurance Guide',
    description:
      'Public liability, professional indemnity, and all the insurance you need as an electrician.',
    icon: Shield,
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
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Professional PDF quotes that help you win more work and grow your limited company turnover.',
    icon: FileCheck2,
    category: 'Tool',
  },
  {
    href: '/guides/hiring-first-employee-electrician',
    title: 'Hiring Your First Employee',
    description: 'PAYE, employers liability, pensions, and the true cost of bringing on staff.',
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
    heading: 'Why the Salary/Dividend Split Matters',
    content: (
      <>
        <p>
          If you operate your electrical business through a limited company, how you extract money
          from the company makes a significant difference to your tax bill. Take too much as salary
          and you pay unnecessary National Insurance. Take everything as dividends and you miss out
          on your personal allowance and state pension credits.
        </p>
        <p>
          The optimal strategy is to pay yourself a carefully calculated salary (to use your
          personal allowance and qualify for state pension) and take the rest as dividends (which
          are taxed at lower rates and attract no National Insurance). Getting this split right can
          save you £3,000 to £6,000+ per year compared to being a sole trader on the same income.
        </p>
        <p>
          This guide uses 2026/27 tax year figures and explains the optimal split for electricians
          at different profit levels.
        </p>
      </>
    ),
  },
  {
    id: 'optimal-salary',
    heading: 'Optimal Director Salary 2026/27',
    content: (
      <>
        <p>
          The optimal salary depends on balancing three factors: using your personal allowance,
          minimising National Insurance, and qualifying for state pension.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2 text-white text-sm">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-blue-400" /> Option A: £12,570 Salary
              </h4>
              <ul className="space-y-2">
                <li>
                  Income tax: <strong className="text-yellow-400">£0</strong> (within personal
                  allowance)
                </li>
                <li>
                  Employee NI: <strong className="text-yellow-400">£0</strong> (below primary
                  threshold)
                </li>
                <li>
                  Employer NI: <strong className="text-yellow-400">~£480</strong> (13.8% above
                  £9,100)
                </li>
                <li>
                  State pension: <strong className="text-green-400">Qualifying year</strong>
                </li>
                <li>
                  Corp tax saving: <strong className="text-yellow-400">£2,390</strong> (19% of
                  £12,570)
                </li>
              </ul>
              <p className="text-white text-xs mt-3">Most accountants recommend this option</p>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-green-400" /> Option B: £9,100 Salary
              </h4>
              <ul className="space-y-2">
                <li>
                  Income tax: <strong className="text-yellow-400">£0</strong> (within personal
                  allowance)
                </li>
                <li>
                  Employee NI: <strong className="text-yellow-400">£0</strong> (below primary
                  threshold)
                </li>
                <li>
                  Employer NI: <strong className="text-yellow-400">£0</strong> (at secondary
                  threshold)
                </li>
                <li>
                  State pension: <strong className="text-green-400">Qualifying year</strong> (above
                  LEL)
                </li>
                <li>
                  Corp tax saving: <strong className="text-yellow-400">£1,729</strong> (19% of
                  £9,100)
                </li>
              </ul>
              <p className="text-white text-xs mt-3">
                Avoids employer NI but wastes £3,470 of personal allowance
              </p>
            </div>
          </div>
        </div>
        <p>
          <strong>Our recommendation:</strong> £12,570 salary. The £480 of employer NI is more than
          offset by the corporation tax saving of £2,390 on the salary, plus you fully utilise your
          personal allowance. The net benefit over the £9,100 option is approximately £180 per year
          — small, but there is no reason to leave it on the table.
        </p>
      </>
    ),
  },
  {
    id: 'dividend-tax',
    heading: 'Dividend Tax Rates 2026/27',
    content: (
      <>
        <p>
          After paying yourself the optimal salary, the remaining profit (after corporation tax) can
          be extracted as dividends. Dividends are taxed at lower rates than salary and attract no
          National Insurance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-3 text-white text-sm">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
              <h4 className="font-bold text-white mb-2">Basic Rate</h4>
              <p className="text-yellow-400 text-2xl font-bold">8.75%</p>
              <p className="text-white text-xs mt-2">
                On dividends within the basic rate band (income up to £50,270)
              </p>
            </div>
            <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4">
              <h4 className="font-bold text-white mb-2">Higher Rate</h4>
              <p className="text-yellow-400 text-2xl font-bold">33.75%</p>
              <p className="text-white text-xs mt-2">
                On dividends within the higher rate band (£50,270–£125,140)
              </p>
            </div>
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
              <h4 className="font-bold text-white mb-2">Additional Rate</h4>
              <p className="text-yellow-400 text-2xl font-bold">39.35%</p>
              <p className="text-white text-xs mt-2">On dividends above £125,140 total income</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-2">Dividend Allowance</h4>
          <p className="text-white text-sm">
            The first <strong className="text-yellow-400">£1,000</strong> of dividend income each
            year is tax-free (the dividend allowance). This applies regardless of your other income.
            Dividends above £1,000 are taxed at the rates above.
          </p>
        </div>
        <p>
          <strong>Key point:</strong> Dividends do NOT attract National Insurance contributions.
          This is the primary reason the salary/dividend split saves money compared to taking
          everything as salary. On salary, you would pay 8% employee NI plus 13.8% employer NI (a
          combined rate of 21.8% on top of income tax). On dividends, you pay only dividend tax.
        </p>
      </>
    ),
  },
  {
    id: 'corporation-tax',
    heading: 'Corporation Tax 2026/27',
    content: (
      <>
        <p>
          Before you can take dividends, the company must pay corporation tax on its profits. The
          rate depends on the level of profit.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Small Profits Rate</h3>
            <p className="text-yellow-400 text-2xl font-bold mb-2">19%</p>
            <p className="text-white text-sm leading-relaxed">
              Applies to companies with profits up to £50,000. Most sole electricians operating
              through a limited company fall into this band after deducting their salary, business
              expenses, and pension contributions.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Main Rate</h3>
            <p className="text-yellow-400 text-2xl font-bold mb-2">25%</p>
            <p className="text-white text-sm leading-relaxed">
              Applies to companies with profits above £250,000. Between £50,000 and £250,000,
              marginal relief applies — the effective rate gradually increases from 19% to 25%. The
              marginal rate in this band is approximately 26.5%.
            </p>
          </div>
        </div>
        <p>
          <strong>Important:</strong> Corporation tax is calculated on profits AFTER deducting your
          director salary, employer NI contributions, pension contributions, and all other allowable
          business expenses. If your company has £60,000 of profit before salary and you pay
          yourself £12,570, corporation tax is calculated on £60,000 - £12,570 - £480 (employer NI)
          = £46,950. At 19%, that is £8,921 of corporation tax.
        </p>
      </>
    ),
  },
  {
    id: 'worked-example',
    heading: 'Worked Example: £60,000 Company Profit',
    content: (
      <>
        <p>
          Here is a complete worked example for a limited company electrician with £60,000 of
          company profit before director remuneration in 2026/27.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-yellow-400" /> Step-by-Step Calculation
          </h4>
          <div className="space-y-3 text-white text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Company profit before salary</span>
              <strong>£60,000</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Director salary</span>
              <strong className="text-red-400">-£12,570</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Employer NI (13.8% on £12,570 - £9,100)</span>
              <strong className="text-red-400">-£479</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Taxable profit</span>
              <strong>£46,951</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Corporation tax (19%)</span>
              <strong className="text-red-400">-£8,921</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Distributable profit (available for dividends)</span>
              <strong>£38,030</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Dividend allowance (first £1,000 tax-free)</span>
              <strong className="text-green-400">£0 tax</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Dividend tax (8.75% on £37,030)</span>
              <strong className="text-red-400">-£3,240</strong>
            </div>
            <div className="flex justify-between pt-2">
              <span className="font-bold">Total take-home</span>
              <strong className="text-yellow-400 text-lg">£47,360</strong>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Total tax paid (all taxes)</span>
              <strong className="text-red-400">£12,640</strong>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Effective tax rate</span>
              <strong className="text-yellow-400">21.1%</strong>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Comparison: Same Income as Sole Trader</h4>
          <div className="space-y-2 text-white text-sm">
            <p>Sole trader with £60,000 profit:</p>
            <p>Income tax: £9,486 (20% on £37,700 + 40% on £9,730)</p>
            <p>Class 2 NI: £179</p>
            <p>Class 4 NI: £2,262 + £195 = £2,457</p>
            <p>
              Total tax and NI: <strong className="text-red-400">£12,122</strong>
            </p>
            <p>
              Take-home: <strong>£47,878</strong>
            </p>
            <p className="pt-2 font-bold">
              Ltd company saving: approximately <span className="text-yellow-400">-£518/year</span>{' '}
              at this profit level
            </p>
            <p className="text-xs mt-2">
              Note: At £60k profit, the Ltd company advantage is modest. The saving increases
              significantly above £60k and once you factor in pension contributions through the
              company. Accountancy fees (£800-£1,500/year) may offset the saving at this level.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'ni-thresholds',
    heading: 'National Insurance Thresholds 2026/27',
    content: (
      <>
        <p>
          Understanding National Insurance thresholds is critical to optimising your salary level.
          Here are the key figures for 2026/27.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2 text-white text-sm">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
              <h4 className="font-bold text-white mb-3">Employee NI (Class 1 Primary)</h4>
              <ul className="space-y-2">
                <li>
                  Lower earnings limit: <strong className="text-yellow-400">£6,396/year</strong>
                </li>
                <li>
                  Primary threshold: <strong className="text-yellow-400">£12,570/year</strong>
                </li>
                <li>
                  Upper earnings limit: <strong className="text-yellow-400">£50,270/year</strong>
                </li>
                <li>
                  Rate: <strong className="text-yellow-400">8%</strong> (threshold to UEL)
                </li>
                <li>
                  Rate above UEL: <strong className="text-yellow-400">2%</strong>
                </li>
              </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
              <h4 className="font-bold text-white mb-3">Employer NI (Class 1 Secondary)</h4>
              <ul className="space-y-2">
                <li>
                  Secondary threshold: <strong className="text-yellow-400">£9,100/year</strong>
                </li>
                <li>
                  Rate: <strong className="text-yellow-400">13.8%</strong> (above threshold)
                </li>
                <li>
                  Employment allowance: <strong className="text-yellow-400">£10,500</strong>
                </li>
                <li className="text-white text-xs mt-2">
                  Note: Single-director companies with no other employees cannot claim the
                  employment allowance
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          <strong>Key insight:</strong> At a salary of £12,570, you are above the lower earnings
          limit (£6,396) which means the year counts for state pension, but below the primary
          threshold so employee NI is £0. Employer NI is payable on the amount above £9,100 (=
          £3,470 at 13.8% = approximately £479), but this is a tax-deductible business expense.
        </p>
      </>
    ),
  },
  {
    id: 'ir35',
    heading: 'IR35: The Risk for Limited Company Electricians',
    content: (
      <>
        <p>
          IR35 is anti-avoidance legislation that targets "disguised employment." If HMRC determines
          that your limited company relationship with a client is really an employment relationship,
          your income from that client is taxed as employment income — you lose the salary/dividend
          tax advantage.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2 text-white text-sm">
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
              <h4 className="font-bold text-white mb-3">Likely Outside IR35</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  <span>Multiple domestic customers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  <span>You decide when and how to do the work</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  <span>You use your own tools and van</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  <span>You can send a substitute to do the work</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  <span>You bear financial risk (fix mistakes at your own cost)</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
              <h4 className="font-bold text-white mb-3">Likely Inside IR35</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <span>One main client provides most of your income</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <span>The client tells you when and where to work</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <span>The client provides tools and equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <span>You cannot send someone else in your place</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <span>You are paid a fixed day rate regardless of output</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          <strong>For domestic electricians</strong> with a broad customer base, IR35 is rarely an
          issue.{' '}
          <strong>For electricians subcontracting to one or two main contractors full-time</strong>,
          IR35 is a genuine risk that should be assessed by a specialist.
        </p>
      </>
    ),
  },
  {
    id: 'accountant-vs-diy',
    heading: 'Accountant vs DIY: Is It Worth Paying?',
    content: (
      <>
        <p>
          Running a limited company involves more filing and compliance than being a sole trader.
          You need to decide whether to handle it yourself or use an accountant.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Using an Accountant</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Cost: £800–£1,500/year (tax deductible)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>They handle all filings, payroll, and tax returns</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Proactive tax planning (pension contributions, timing of dividends)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Reduces risk of errors, penalties, and HMRC enquiries</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Frees your time to earn money on the tools</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">DIY with Software</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Cost: £240–£480/year (FreeAgent, Xero, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Automated invoicing, bank feeds, and MTD compliance</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>You need to understand tax rules to optimise properly</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Errors are your responsibility (penalties, interest)</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Takes 3–5 hours per month of your time</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          <strong>Our view:</strong> For a limited company, an accountant is almost always worth it.
          The tax savings from proper planning typically exceed the fee, and the hours you save can
          be spent earning on the tools. A good accountant pays for themselves.
        </p>
        <SEOAppBridge
          title="Earn more, keep more"
          description="Elec-Mate helps you quote professionally, certify on site, and manage your jobs — so your limited company is more profitable. 7-day free trial."
          icon={PoundSterling}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function DividendVsSalaryElectricianPage() {
  return (
    <GuideTemplate
      title="Dividend vs Salary for Electricians | Ltd Company Tax 2026"
      description="Optimal salary and dividend split for electricians with a limited company. 2026/27 tax rates, corporation tax, NI thresholds, worked example for £60k profit, IR35 implications, and when to use an accountant."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Tax Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Dividend vs Salary for Electricians:{' '}
          <span className="text-yellow-400">Optimise Your Ltd Company Tax in 2026</span>
        </>
      }
      heroSubtitle="How you extract money from your limited company determines how much tax you pay. The right salary/dividend split can save you thousands per year. This guide covers optimal salary, dividend tax rates, corporation tax, NI thresholds, a full worked example, IR35 risks, and whether you need an accountant."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Dividend vs Salary"
      relatedPages={relatedPages}
      ctaHeading="Grow Your Limited Company Revenue"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for quoting, certification, and job management. Professional tools that help your limited company earn more. 7-day free trial, cancel anytime."
    />
  );
}
