/**
 * Module 7 · Section 5 · Subsection 2 — Running your own electrical business
 * Maps to C&G 2365-03 / Unit 308 / LO3 / AC 3.x
 *   AC — "Identify the requirements for setting up and running an electrical business".
 *
 * Business structure decisions (sole trader vs limited company vs partnership),
 * essential registrations (HMRC, Companies House, VAT, CIS, ICO), financial
 * management (cash flow, invoicing, record-keeping), and the marketing
 * fundamentals that actually work for trade firms — reputation, reviews,
 * referrals and local presence.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Running your own electrical business | Level 3 Module 7.5.2 | Elec-Mate';
const DESCRIPTION =
  'Business structures, HMRC and Companies House registration, VAT, CIS, ICO, financial management, cash flow, marketing — the practical foundations of an electrical contracting business.';

const checks = [
  {
    id: 'mod7-s5-sub2-structure',
    question: 'What is the key difference between trading as a sole trader and as a limited company?',
    options: [
      'Sole traders earn more money than directors.',
      "Limited companies have separate legal personality — the company is liable for debts, not the individual director (subject to personal guarantees and director duties). Sole traders have unlimited personal liability — personal assets can be pursued for business debts.",
      'Only limited companies can employ staff.',
      "Sole traders don't pay any tax.",
    ],
    correctIndex: 1,
    explanation:
      "The big practical difference is liability. A limited company is its own legal entity; the director's personal assets are generally protected (with exceptions: personal guarantees given to suppliers, breaches of director duties under the Companies Act 2006, wrongful trading). A sole trader IS their business; debts and claims attach personally. There are tax-efficiency differences too at higher earnings (corporation tax + dividends vs income tax + NI), but liability is the headline difference.",
  },
  {
    id: 'mod7-s5-sub2-vat-threshold',
    question: 'When does VAT registration become mandatory?',
    options: [
      'Immediately when starting a business.',
      "When your VAT-taxable turnover over the previous 12 months exceeds the VAT registration threshold (currently £90,000, set by HMRC and updated periodically) — or when you expect to exceed it in the next 30 days.",
      'Only if you want to.',
      "Never for electrical businesses.",
    ],
    correctIndex: 1,
    explanation:
      "VAT registration is mandatory when rolling-12-month taxable turnover crosses the HMRC threshold (£90,000 from April 2024 — check current figure as it adjusts). You can also register voluntarily below the threshold if you primarily sell to other VAT-registered businesses (they can reclaim the VAT, so it costs them nothing, and you can reclaim VAT on your own purchases). Most domestic-focused sole traders stay below the threshold deliberately if they can; commercial-focused firms register voluntarily even below.",
  },
  {
    id: 'mod7-s5-sub2-cash-flow',
    question: 'Why is cash-flow management particularly critical for electrical contractors?',
    options: [
      "It isn't important.",
      "Because you typically pay for materials up-front (suppliers want 30 days at best) and pay staff weekly / monthly — but customers often pay 30-90 days after the work. The gap between cash out and cash in can sink a profitable business.",
      'Only large companies need to worry about cash flow.',
      'Cash flow only matters at year-end.',
    ],
    correctIndex: 1,
    explanation:
      "Cash flow kills more contracting businesses than lack of profit. Profitable-on-paper firms still go bust when customers pay slowly and suppliers, staff and HMRC need paying on time. The fundamentals: invoice the day work completes; chase debt actively; take deposits on larger jobs; negotiate supplier credit terms; maintain a cash reserve for quiet weeks. The Late Payment of Commercial Debts (Interest) Act 1998 also gives you a statutory right to interest and recovery costs on overdue B2B invoices.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which business structure offers the simplest setup with minimal paperwork?',
    options: ['Limited company.', 'Partnership.', 'Sole trader.', 'Limited liability partnership (LLP).'],
    correctAnswer: 2,
    explanation:
      "Sole trader is the simplest structure. Register with HMRC for Self Assessment online (free); start trading. Annual tax return is the main ongoing admin. No Companies House registration; no separate company accounts; profits flow directly to personal income. Trade-off: unlimited personal liability and (at higher earnings) less tax efficiency than incorporating.",
  },
  {
    id: 2,
    question: 'What is a Unique Taxpayer Reference (UTR) and when do you need one?',
    options: [
      'A reference number for your ECS card.',
      "A 10-digit reference number issued by HMRC when you register for Self Assessment as a self-employed individual or when you register a limited company. You need it for tax returns and HMRC correspondence; partners and directors each have their own.",
      "A company registration number from Companies House.",
      "A VAT registration number.",
    ],
    correctAnswer: 1,
    explanation:
      "The UTR is the 10-digit HMRC reference for your tax record. Self-employed individuals get one when registering for Self Assessment; limited companies get one when registered at Companies House (passed through to HMRC automatically). Directors also have personal UTRs for Self Assessment of dividend / salary income. Apply early — UTR issuance can take 1-3 weeks; you can't file returns without it.",
  },
  {
    id: 3,
    question: 'What is the Construction Industry Scheme (CIS)?',
    options: [
      'An insurance scheme for construction workers.',
      'An HMRC tax-deduction scheme — contractors in construction must deduct tax (20% for registered subcontractors, 30% for unregistered) from payments to subcontractors and pass it to HMRC. The subcontractor reconciles via their tax return.',
      'A training scheme for construction skills.',
      'A certification scheme for competent persons.',
    ],
    correctAnswer: 1,
    explanation:
      "CIS applies to construction-industry payments between businesses. If you're a contractor paying subcontractors, you must register as a contractor, verify each subcontractor with HMRC, deduct CIS tax at the correct rate, and submit monthly CIS returns. If you're a subcontractor, register so deductions are at 20% rather than 30%; gross-payment status is possible after a turnover and compliance history qualification. CIS is separate from VAT and is mandatory for construction sector payments.",
  },
  {
    id: 4,
    question: 'What should a business plan include?',
    options: [
      'Just your expected income.',
      "Business description, target market and competition, services and pricing strategy, financial projections (year 1 month-by-month, years 2-3 quarterly), marketing plan, operational plan. A working document, not a one-time exercise.",
      'Only financial figures.',
      'A business plan is not necessary.',
    ],
    correctAnswer: 1,
    explanation:
      "A meaningful business plan covers what you're doing, who you're selling to, who else is selling to them, how you'll price and market, and the money — projected revenue, costs, cash flow. Banks ask for one if you want a business loan or overdraft; you'll write one anyway just to think it through. Update at least annually; review monthly in year one against actual numbers.",
  },
  {
    id: 5,
    question: "Which insurance is a legal requirement if you employ staff?",
    options: [
      'Public liability insurance.',
      "Employers' Liability insurance — required by the Employers' Liability (Compulsory Insurance) Act 1969 for any employee (full-time, part-time, casual, apprentice). Minimum statutory cover is £5m; most policies provide £10m. Certificate must be displayed where employees can see it.",
      'Professional indemnity insurance.',
      'Tool insurance.',
    ],
    correctAnswer: 1,
    explanation:
      "Employers' Liability is the only insurance that's legally compulsory if you employ anyone. Statutory minimum £5m; £10m is typical. The Compulsory Insurance Act 1969 sets the framework; the HSE enforces. Penalty: up to £2,500 per day for trading without valid cover. Display the certificate (paper or electronic accessible to employees) on the premises.",
  },
  {
    id: 6,
    question: "What is the purpose of a trading name?",
    options: [
      'A legal requirement for all businesses.',
      "A business name that's different from your personal name (sole trader) or registered company name (limited company). Allows trading under a more professional or memorable brand. Must appear on business documents alongside your legal name.",
      'A name registered with Companies House.',
      'An alternative to registering with HMRC.',
    ],
    correctAnswer: 1,
    explanation:
      "Trading names aren't formally registered (unlike registered company names). Restrictions apply under the Business Names Act / Companies Act 2006: can't use names that imply certain credentials (e.g. 'Ltd' if not a limited company); must show your legal name and contact details on business documents alongside the trading name. Sole trader Joe Smith trading as 'Smith Electrical Services' must show 'Joe Smith trading as Smith Electrical Services' on invoices and letterheads.",
  },
  {
    id: 7,
    question: "When are Self Assessment tax payments typically due?",
    options: [
      '31 December each year.',
      "31 January following the end of the tax year (5 April), with payments on account for the following year due 31 January and 31 July.",
      '31 March each year.',
      'Whenever you can afford it.',
    ],
    correctAnswer: 1,
    explanation:
      "Self Assessment deadlines: paper return 31 October; online return 31 January. Tax payment 31 January (balancing payment plus first payment on account for next year). Second payment on account 31 July. Late filing penalty £100 immediate, escalates after 3 / 6 / 12 months. Late payment incurs interest plus 5% surcharges at 30 days / 6 months / 12 months. Keep cash reserved through the year.",
  },
  {
    id: 8,
    question: "What should you consider when setting your charge-out rate?",
    options: [
      'Only what competitors charge.',
      "Labour cost (your time + on-costs), overheads (van, insurance, tools, training, admin, scheme fees), materials margin, profit margin, local market rates, and the value you provide. Below true cost is unsustainable.",
      'The minimum wage.',
      'Only the cost of materials.',
    ],
    correctAnswer: 1,
    explanation:
      "Charge-out rate must cover all costs and a profit margin. Total annual costs ÷ chargeable hours = minimum sustainable rate. Most electricians' charge-out rates are 2-3× their hourly wage equivalent because of all the non-chargeable overhead time and costs. Match-the-competition pricing without knowing your real costs is the fastest route to bankruptcy. Know your numbers first; price within the market second.",
  },
];

const faqs = [
  {
    question: 'How much money do I need to start an electrical business?',
    answer:
      "Realistic minimum start-up budget: £15,000-£30,000 for a sole trader with van. Major items: van (used £8-15k, leased £200-400/month); tools and test equipment (£2-5k including a current-calibrated MFT); initial materials stock (£1-2k); insurance (PL £200-500/yr, EL if employing £300-500/yr, vehicle £1-2k/yr commercial); CPS scheme fees (£400-800/yr); marketing setup (website, signwriting, business cards, £500-2k); working capital for 3 months of expenses. You can start smaller working from home without a van for retail / first-fix sub-contracting work, but a van + tools is the typical baseline.",
  },
  {
    question: 'Should I register as a sole trader or limited company?',
    answer:
      "Sole trader is simpler (one HMRC registration; one tax return per year). Limited company offers liability protection (separate legal entity) and potential tax efficiency at higher earnings (corporation tax + dividends vs income tax + NI). Rough rule: under £40k profit, sole trader is fine; £40-60k profit, it depends; over £60k, limited company is usually more efficient. Many start sole trader and incorporate when profits cross the threshold. Talk to an accountant before deciding — the right answer depends on your specifics.",
  },
  {
    question: 'Do I need to join a competent person scheme immediately?',
    answer:
      "If you'll do any Part P notifiable work in dwellings (new circuits, consumer unit replacements, work in special locations), you either need scheme membership or must notify building control per job. CPS membership is dramatically cheaper for any volume of domestic work (~£500/yr vs £200-400 per notification). For commercial-only firms, no immediate need — but most still join one scheme for brand recognition.",
  },
  {
    question: 'How do I price my work competitively without undercharging?',
    answer:
      "Know your true costs first (total annual costs ÷ chargeable hours = minimum sustainable rate). Then look at local market — JIB rates, competitor visibility. Price within the market while ensuring all costs are covered plus a profit margin. Don't compete on price alone; compete on quality, reliability and service. If a customer wants the cheapest quote and you're not the cheapest, they're probably not your customer — let them go.",
  },
  {
    question: 'Should I use an accountant?',
    answer:
      "Not legally required (sole traders can DIY Self Assessment; small Ltd companies can DIY accounts in theory), but practically valuable for most. A good accountant saves more in tax-efficiency than they cost in fees; ensures compliance; catches mistakes; handles HMRC correspondence; gives you back the time. Typical cost: £300-500/yr for a sole trader's tax return; £800-2,000/yr for limited company accounts plus tax. Worth interviewing 2-3 before choosing.",
  },
  {
    question: 'How long before I can expect to be profitable?',
    answer:
      "Many electrical businesses turn profitable in year 1 if cost-controlled and work flows reasonably. Building a sustainable referral-driven client base typically takes 2-3 years. Plan to have savings or part-time income for the first 6-12 months in case the work pipeline takes longer than expected. The biggest year-1 risk isn't profitability — it's cash flow.",
  },
  {
    question: 'What marketing actually works for electrical contractors?',
    answer:
      "Top of the list: quality work + asking satisfied customers for reviews. Google reviews, Checkatrade, Trustpilot, Which? Trusted Trader — these compound over time and bring inbound work. Local Google Business Profile is essential and free. Word-of-mouth referrals from existing customers, other trades, builders and architects. Local networking (BNI, builders' merchants, trade events). Paid Google Ads work for specific high-margin services (consumer unit upgrades, EV chargers). Random leaflet drops and Facebook posts usually don't.",
  },
  {
    question: "What's auto-enrolment and when does it apply?",
    answer:
      "Auto-enrolment is the workplace pension obligation under the Pensions Act 2008. If you employ anyone over 22 earning over £10,000/yr, you must auto-enrol them into a qualifying workplace pension and contribute at least 3% of qualifying earnings (employee contributes 5%; total 8%). Set up the scheme before the first employee starts. NEST is the default government-backed option and is free to set up. The Pensions Regulator enforces; penalties for non-compliance.",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 7 · Section 5 · Subsection 2"
            title="Running your own electrical business"
            description="Business structures, HMRC and Companies House registration, VAT, CIS, ICO, financial management, cash flow and marketing fundamentals."
            tone="blue"
          />

          <TLDR
            points={[
              "Structure decision: sole trader (simple, unlimited liability) vs limited company (more admin, liability protection, potentially more tax-efficient at higher earnings). Most start sole trader, incorporate later.",
              "Essential registrations: HMRC Self Assessment (sole trader) or Companies House + HMRC (Ltd); VAT if turnover > £90k threshold; CIS if working in construction; ICO if processing personal data.",
              "Cash flow kills more contracting businesses than lack of profit — invoice immediately, chase debt actively, take deposits on larger work, keep cash reserves.",
              "Late Payment of Commercial Debts (Interest) Act 1998 gives statutory interest + recovery costs on overdue B2B invoices.",
              "Marketing that works for trade firms: quality work + online reviews + local Google Business Profile + word-of-mouth referrals. Random leaflet drops mostly don't.",
              "Employers' Liability insurance (£5m min) is legally compulsory if you employ anyone — Compulsory Insurance Act 1969.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to C&G 2365-03 / Unit 308 / LO3 — identify the requirements for setting up and running an electrical business.",
              "Compare sole trader, partnership, LLP and limited company structures on liability, tax and administration.",
              "List the essential UK registrations for an electrical contracting business — HMRC, Companies House, VAT, CIS, ICO.",
              "Identify the legally required insurances (Employers' Liability) and the practically essential ones (Public Liability, vehicle, tools).",
              "Explain why cash flow is the critical financial discipline for contractors and how to manage it.",
              "Describe the marketing fundamentals that actually generate work for trade firms — reviews, referrals, Google Business, local presence.",
              "Plan a sensible 12-month start-up budget covering equipment, insurance, scheme fees, marketing and working capital.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Choosing your business structure</ContentEyebrow>

          <ConceptBlock
            title="Sole trader vs limited company — liability, tax, administration"
            plainEnglish="The two practical options for most electrical contractors are sole trader and limited company. Sole trader: simplest setup (register with HMRC for Self Assessment, start trading), one annual tax return, profits taxed as personal income. Trade-off: unlimited personal liability — your house and savings can be pursued for business debts and claims (subject to insurance limits). Limited company: separate legal entity, registered at Companies House. More admin (statutory accounts, Confirmation Statement, corporation tax return). Profits taxed at corporation tax rates; you draw salary + dividends. Liability is generally limited to company assets (with exceptions for personal guarantees and director-duty breaches). At higher earnings (over ~£40-60k profit), the company structure is typically more tax-efficient."
            onSite="Most working electricians start sole trader (simpler, cheaper, quicker), and incorporate when profit crosses the efficiency threshold or when liability concerns grow (employing staff, larger commercial contracts). Talk to an accountant before deciding — your specific tax situation, family circumstances and growth plans all affect the right answer."
          >
            <p>
              Side-by-side at a glance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sole trader</strong> &mdash; HMRC registration only; one Self Assessment per year; personal income tax + Class 2 + Class 4 NI; unlimited personal liability; minimal admin.
              </li>
              <li>
                <strong>Partnership</strong> &mdash; similar to sole trader but with shared profits and shared unlimited liability between partners; partnership tax return plus individual returns.
              </li>
              <li>
                <strong>LLP (Limited Liability Partnership)</strong> &mdash; partnership with limited liability; less common for electrical firms.
              </li>
              <li>
                <strong>Limited company</strong> &mdash; Companies House + HMRC registrations; annual accounts, Confirmation Statement, corporation tax return; salary + dividends draw; liability limited to company assets (with exceptions).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Practical tax-efficiency thresholds"
            plainEnglish="The rule-of-thumb for when limited company becomes more tax-efficient than sole trader: roughly £40-60k of profit per year. Below that, the additional admin and accountancy cost (typically £800-2,000/year for Ltd accounts vs £300-500 for sole-trader Self Assessment) usually outweighs the tax savings. Above £60k profit, the corporation tax + dividends route typically saves several thousand pounds per year vs personal income tax + NI on the same amount. The exact threshold depends on current tax rates (which adjust annually) and your specific circumstances — get an accountant's view rather than relying on rules-of-thumb."
            onSite="If you're starting out: sole trader is almost always the right answer for year 1. Re-evaluate at year-end with your accountant once you know what profit actually looks like. Incorporating later is straightforward; you can transfer goodwill and assets to a new limited company. Don't over-think the structure decision in year 1 — get trading, get the cash coming in, optimise the structure once you have data."
          >
            <p>
              Things to discuss with an accountant before incorporating:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Your projected annual profit.</li>
              <li>Your other income sources (employed elsewhere? rental income?).</li>
              <li>Your spouse / partner&apos;s income (relevant for dividend splitting where appropriate).</li>
              <li>Your growth plans (employing staff, larger contracts, taking on debt).</li>
              <li>Your appetite for liability (commercial contracts at scale push toward Ltd).</li>
              <li>Your willingness to do the extra admin.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Essential registrations</ContentEyebrow>

          <ConceptBlock
            title="HMRC — Self Assessment and PAYE"
            plainEnglish="Every self-employed individual needs to register with HMRC for Self Assessment within 3 months of starting to trade (deadline: 5 October after the end of the tax year in which you started). HMRC issues a Unique Taxpayer Reference (UTR) — your tax record number. Annual return covers 6 April-5 April; filed online by 31 January; tax payment due 31 January with payments on account for the next year due 31 January and 31 July. If you employ anyone, you also need to register for PAYE — operates monthly with Real Time Information (RTI) submissions every time you pay an employee. Most accountants or payroll bureaux handle PAYE for a small monthly fee."
            onSite="Apply for the UTR early — issuance can take 1-3 weeks and you can't file returns without it. Set aside tax money through the year (typical: 25-30% of net profit for income tax + NI). Self-employment trap: HMRC payments on account mean you pay 150% of the year-1 tax bill in January of year 2 (full year-1 balance + 50% on account for year 2), then another 50% in July. Plan cash for that."
          >
            <p>
              HMRC registration sequence:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Self Assessment</strong> &mdash; online at gov.uk; within 3 months of starting trade; UTR issued 1-3 weeks.
              </li>
              <li>
                <strong>National Insurance</strong> &mdash; Class 2 (flat rate, paid via Self Assessment) and Class 4 (% of profits over threshold).
              </li>
              <li>
                <strong>VAT</strong> &mdash; if / when taxable turnover crosses the threshold (currently &pound;90,000).
              </li>
              <li>
                <strong>CIS</strong> &mdash; if working in construction industry; register as contractor and / or subcontractor.
              </li>
              <li>
                <strong>PAYE</strong> &mdash; if employing anyone; before first payday.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Companies House, VAT, CIS, ICO — the other registrations"
            plainEnglish="Beyond HMRC, the other typical registrations: Companies House — if forming a limited company, registration at companieshouse.gov.uk (£12 online); takes 24 hours; produces a Company Registration Number and Certificate of Incorporation. VAT — registration via HMRC online once you cross the £90k threshold (or voluntarily below it). CIS — Construction Industry Scheme; register if you're a contractor paying subcontractors, or as a subcontractor to get the lower 20% deduction rate. ICO — Information Commissioner's Office; if you process personal data (customer details, employee records — almost every business), you need to register and pay the data protection fee (£40-60/year for small businesses)."
            onSite="ICO registration is widely missed by small contractors. If you keep customer names, addresses, phone numbers, photos — you're processing personal data and need to register. Penalty for non-registration is up to £4,350. Apply at ico.org.uk; takes 10 minutes and £40 for the smallest businesses."
          >
            <p>
              Registration checklist for a new electrical business:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>HMRC Self Assessment (sole trader / partnership) &mdash; within 3 months of trading start.</li>
              <li>Companies House (Ltd / LLP) &mdash; before trading.</li>
              <li>VAT &mdash; when threshold crossed or voluntary registration desired.</li>
              <li>CIS &mdash; if construction-industry payments are involved.</li>
              <li>ICO &mdash; if processing personal data (almost certainly).</li>
              <li>PAYE &mdash; if employing anyone.</li>
              <li>The Pensions Regulator (TPR) &mdash; auto-enrolment compliance if employing.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <RegsCallout
            source="Companies Act 2006 — Section 9 (registration of a company)"
            clause={
              <>
                <p className="mb-2">
                  To form a limited company in the UK you register at Companies House under the
                  Companies Act 2006 with:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>A company name (must comply with Companies Act 2006 naming rules).</li>
                  <li>Registered office address.</li>
                  <li>At least one director (natural person).</li>
                  <li>Share capital and shareholders (private company minimum: one share).</li>
                  <li>Memorandum and Articles of Association.</li>
                  <li>Statement of capital and statement of proposed officers.</li>
                </ul>
                <p className="mt-2">
                  Online incorporation fee &pound;12; processing usually within 24 hours.
                </p>
              </>
            }
            meaning={
              <>
                Forming a limited company is straightforward and cheap. The hidden cost is the
                ongoing admin obligation: annual statutory accounts under sections 394 onwards,
                Confirmation Statement under section 853A, corporation tax return, and director
                duties under sections 170-177 (the seven general duties). Don&apos;t incorporate
                lightly; do incorporate when liability or tax efficiency genuinely justify it.
              </>
            }
            cite="Source: Companies Act 2006, s.9 (registration); s.170-177 (director duties); s.394 (accounts); s.853A (Confirmation Statement)."
          />

          <RegsCallout
            source="Employers' Liability (Compulsory Insurance) Act 1969 — Section 1"
            clause={
              <>
                <p className="mb-2">
                  &quot;Except as otherwise provided by this Act, every employer carrying on any
                  business in Great Britain shall insure, and maintain insurance, under one or more
                  approved policies with an authorised insurer or insurers against liability for
                  bodily injury or disease sustained by his employees, and arising out of and in
                  the course of their employment in Great Britain in that business.&quot;
                </p>
                <p className="mt-2">
                  Minimum statutory cover &pound;5,000,000. Penalty for trading without cover: up
                  to &pound;2,500 per day.
                </p>
              </>
            }
            meaning={
              <>
                Employers&apos; Liability is the only legally-compulsory insurance for most
                employers. The moment you employ anyone &mdash; apprentice, part-time, casual,
                family member &mdash; the Act applies. Display the certificate where employees can
                see it (paper on a notice board, or electronic with accessible link). The HSE
                enforces. Most package policies include &pound;10m EL cover; &pound;5m is the
                statutory minimum.
              </>
            }
            cite="Source: Employers' Liability (Compulsory Insurance) Act 1969, s.1; Employers' Liability (Compulsory Insurance) Regulations 1998 (SI 1998/2573)."
          />

          <SectionRule />

          <ContentEyebrow>Financial management — cash flow is everything</ContentEyebrow>

          <ConceptBlock
            title="Cash flow vs profit — the contractor's specific risk"
            plainEnglish="Profit is what's left after costs over a period; cash flow is the timing of money in and out. A profitable contractor can still go bust if customers pay slowly and suppliers / staff / HMRC need paying on time. The contractor's specific problem: you typically pay for materials up-front (suppliers want 30 days at best), pay staff weekly / monthly, pay VAT and corporation tax / income tax on a schedule — but customers often pay 30-60-90 days after invoice. The gap is funded from your cash reserves or borrowing. Run out of cash even briefly and you can't pay suppliers, lose credit terms, can't take on jobs that need material purchases up-front; spiral begins."
            onSite="Cash-flow discipline starts with invoicing the day the work completes. Take deposits on jobs over a certain size (typical: 25-50% of total). Chase overdue invoices actively — phone, email, escalate. Use the Late Payment of Commercial Debts Act 1998 statutory interest and recovery costs on B2B invoices. Negotiate supplier credit terms (most wholesalers offer 30-day accounts after a few months of trading). Maintain a cash reserve equivalent to 1-3 months of overhead — this absorbs slow weeks and late payments without crisis."
          >
            <p>
              Cash flow disciplines that work:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Invoice the same day</strong> &mdash; certificate issued = invoice issued.
              </li>
              <li>
                <strong>Deposits on larger jobs</strong> &mdash; typical 25-50% of total before work starts.
              </li>
              <li>
                <strong>Clear payment terms</strong> &mdash; 14 days for domestic, 30 days for commercial; state on the invoice.
              </li>
              <li>
                <strong>Active credit control</strong> &mdash; chase at day 7, day 14, day 21 post due date; escalate at day 30.
              </li>
              <li>
                <strong>Statutory interest</strong> &mdash; Late Payment Act 1998 gives 8% + BoE base on overdue B2B invoices.
              </li>
              <li>
                <strong>Supplier credit terms</strong> &mdash; ask for 30-day accounts after 3-6 months of regular ordering.
              </li>
              <li>
                <strong>Cash reserve</strong> &mdash; 1-3 months of overhead held as a buffer.
              </li>
              <li>
                <strong>Separate business bank account</strong> &mdash; cleaner records, easier tax, more professional.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Record-keeping and the accounting basics"
            plainEnglish="HMRC requires records of all income and expenses, supporting documents (receipts, invoices, bank statements) kept for at least 5 years after the 31 January filing deadline for sole traders (6 years for limited companies under Companies Act 2006). Practical approach: cloud accounting software (Xero, QuickBooks, FreeAgent — typically £15-40/month) auto-syncs to your business bank account and gives you real-time financial view; reduces the year-end pain dramatically. Photograph receipts on-site immediately (Receipt Bank, Dext, native phone apps); they're attached to the transaction in the accounting system. Bank reconciliation should be done weekly, not annually."
            onSite="Making Tax Digital (MTD) is HMRC's mandatory digital reporting requirement. MTD for VAT applies to all VAT-registered businesses already; MTD for Income Tax Self Assessment is rolling out from 2026 for sole traders and landlords above thresholds. Cloud accounting software handles MTD compliance automatically. If you're starting in 2026 onwards, start cloud-first; don't bother with paper or spreadsheet bookkeeping that you'll have to migrate."
          >
            <p>
              Record-keeping essentials:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Separate business bank account.</li>
              <li>Cloud accounting software (Xero / QuickBooks / FreeAgent).</li>
              <li>Receipt-capture app (photograph on-site, auto-attach to transactions).</li>
              <li>Weekly bank reconciliation.</li>
              <li>Monthly P&amp;L review &mdash; are you actually profitable this month?</li>
              <li>Quarterly cash-flow forecast &mdash; what does the next 3 months look like?</li>
              <li>Records kept 5 years (sole trader) / 6 years (Ltd) under Companies Act 2006.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="Late Payment of Commercial Debts (Interest) Act 1998"
            clause={
              <>
                <p className="mb-2">
                  Where a B2B contract for the supply of goods or services does not specify the
                  payment term, the Act implies a 30-day term. Overdue payments accrue statutory
                  interest at 8% over the Bank of England base rate from the due date. Suppliers
                  also have a statutory right to fixed recovery costs (banded by invoice value)
                  plus reasonable additional debt-recovery costs.
                </p>
              </>
            }
            meaning={
              <>
                The Late Payment Act gives small contractors a real lever on overdue commercial
                invoices. The 8% + base rate interest is meaningful (currently ~13% effective);
                fixed recovery costs add &pound;40-100 per invoice depending on banding. Use it
                in your terms and conditions; reference it in chase emails; apply it when
                appropriate. It doesn&apos;t apply to consumer invoices &mdash; that&apos;s under
                the Consumer Rights Act 2015 framework and the small claims court.
              </>
            }
            cite="Source: Late Payment of Commercial Debts (Interest) Act 1998 as amended by the Late Payment of Commercial Debts Regulations 2013 (SI 2013/395)."
          />

          <SectionRule />

          <ContentEyebrow>Marketing — what actually works</ContentEyebrow>

          <ConceptBlock
            title="Reputation-driven marketing — reviews, referrals, Google Business"
            plainEnglish="For electrical contractors, marketing is mostly reputation-management. The compounding flywheel: do quality work → ask for reviews → reviews build inbound trust → inbound enquiries convert better → more quality work → more reviews. The specific channels that work: Google reviews (most weight; show up in local search; ask every satisfied customer); Checkatrade / Trustpilot / Which? Trusted Trader (paid platforms but generate vetted enquiries); Google Business Profile (free, essential, drives local search visibility — keep photos, services, hours current). Word-of-mouth referrals from existing customers, other trades, builders and architects compound over years."
            onSite="Build review-asking into the job-completion routine. 'Here's your certificate; here's the invoice; if you've been happy with the work I'd really appreciate a Google review — here's the link.' Most customers do it if asked at the right moment. Don't ask if unhappy; address the issue first. Volume of reviews matters as much as average rating; aim for 20+ reviews over the first year. Photograph completed work (with customer permission for any identifiable property) for social and Google Business posts."
          >
            <p>
              Reputation-marketing channels that work:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Google reviews</strong> &mdash; ask every satisfied customer; most weight in local search.
              </li>
              <li>
                <strong>Google Business Profile</strong> &mdash; free, essential; keep photos, services, hours current.
              </li>
              <li>
                <strong>Checkatrade / Trustpilot / Which? Trusted Trader</strong> &mdash; paid platforms; vetted enquiries.
              </li>
              <li>
                <strong>CPS scheme &quot;Find a Contractor&quot;</strong> &mdash; NICEIC, NAPIT, ELECSA all have free listings for registered firms.
              </li>
              <li>
                <strong>Trade referrals</strong> &mdash; builders, architects, other trades; recommend each other.
              </li>
              <li>
                <strong>Existing customer referrals</strong> &mdash; happy customers tell friends; sometimes nudge with a referral incentive.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="What usually doesn't work — leaflet drops, generic social media, cold calling"
            plainEnglish="Marketing channels that look attractive but typically underperform for electrical contractors: random leaflet drops (cost £150-300 per 1,000 leaflets; typical response rate 0.1-0.5%; usually doesn't pay back); generic Facebook / Instagram posts of completed work to a small follower count (most followers are other electricians, not customers); cold calling local businesses (low conversion, high time cost); generic Google Ads without geographic and service targeting (burns budget on irrelevant clicks). These can work but only with strong targeting, compelling offer and tracked outcomes — which is more sophisticated than most small contractors set up. Default to reputation-driven channels first."
            onSite="The one paid channel that often works for trade firms: targeted Google Ads for high-margin specific services (consumer unit upgrades, EV chargers, fault-finding emergency callout). Tight geographic radius (5-10 miles), specific keywords, specific landing page, clear call-to-action, tracked enquiry source. Budget £200-500/month, measure cost-per-enquiry, kill it if not paying back. Don't run generic 'electrician London' ads without this discipline."
          >
            <p>
              Lower-success channels (use with caution):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Random leaflet drops without targeting or testing.</li>
              <li>Generic Facebook / Instagram posts to small follower bases.</li>
              <li>Cold calling businesses or homeowners.</li>
              <li>Generic Google Ads without geographic and service targeting.</li>
              <li>Buying email lists for cold outreach (also potentially UK GDPR / PECR breach).</li>
              <li>Paying for &quot;SEO services&quot; without checking what&apos;s actually being delivered.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Trading without setting tax money aside — January cash crunch"
            whatHappens={
              <>
                Sole trader has a strong first year &mdash; &pound;55k profit. Doesn&apos;t set tax
                money aside through the year; uses all the cash for living expenses and reinvesting in
                tools. Self Assessment lands in January: roughly &pound;14k income tax + NI on the
                year-1 profit, plus another &pound;7k payment on account for year 2. Total bill
                &pound;21k due 31 January. Trader has &pound;3k in the business account; can&apos;t
                pay. HMRC adds interest and surcharges; trader takes out an emergency credit-card or
                personal loan at high interest; cash-flow problem now compounding.
              </>
            }
            doInstead={
              <>
                Set aside 25-30% of every payment received into a separate tax-savings account.
                Don&apos;t touch it. At year-end, your accountant calculates the actual bill; you
                pay from the tax-savings account; surplus rolls forward. The payment-on-account
                trap (paying ~150% of year-1&apos;s tax in January of year 2) is the single biggest
                cash-flow shock for new sole traders &mdash; plan for it explicitly. Cloud
                accounting software shows a running tax estimate; check it monthly.
              </>
            }
          />

          <CommonMistake
            title="No deposits, no terms, slow invoicing — silent cash-flow strangle"
            whatHappens={
              <>
                Sole trader does &pound;6k consumer unit upgrade for a customer. Invoices a week
                after completion. Doesn&apos;t take a deposit, doesn&apos;t state payment terms, has
                no chase routine. Customer pays at day 67. Trader has paid &pound;1,800 in materials
                up-front on his credit card; the credit-card interest plus the chasing time has eaten
                most of the profit. Trader does this 8 times across the year; cash-flow problem is
                permanent.
              </>
            }
            doInstead={
              <>
                Standard practice: take 25-50% deposit on jobs over &pound;1,500; invoice the day
                work completes; state clear payment terms (14 days domestic, 30 days commercial);
                chase at day 7 / 14 / 21 / 30 post-due-date; apply Late Payment Act 1998 interest
                and recovery costs on overdue B2B invoices. Cash collected on time funds the next
                job&apos;s materials; cash collected late forces credit-card use and erodes margin.
                The discipline saves several percentage points of net margin.
              </>
            }
          />

          <Scenario
            title="You're going self-employed in 6 weeks — your start-up checklist"
            situation={
              <>
                You&apos;ve given notice at your employer; last day is 6 weeks away. You&apos;re
                going sole-trader, domestic + light commercial focus, working from home with a
                used van. You have &pound;12k in savings. What&apos;s the practical start-up
                checklist?
              </>
            }
            whatToDo={
              <>
                <strong>Week 6 (now) &mdash; register and plan</strong>. Register with HMRC for
                Self Assessment (UTR issued in 1-3 weeks; do this now). Register with ICO for
                data protection (&pound;40, online, 10 minutes). Open a business bank account
                (free from most challenger banks; Starling, Tide, Mettle); separate from personal
                banking from day one. Set up cloud accounting software (FreeAgent, QuickBooks Self
                Employed; ~&pound;15-25/month).
                <br /><br />
                <strong>Week 5 &mdash; insurances</strong>. Get quotes for Public Liability (&pound;2m
                min, typically &pound;200-400/yr); Tools-in-Transit / Goods-in-Vehicle; commercial
                vehicle insurance for the van. Buy. Document the certificates in a folder.
                <br /><br />
                <strong>Week 4 &mdash; CPS scheme application</strong>. Apply to one CPS scheme
                (NICEIC, NAPIT or ELECSA; pick on cost and assessor availability locally). Initial
                assessment is typically 4-8 weeks after application; book it now. Costs
                &pound;400-700 for assessment + first year fee.
                <br /><br />
                <strong>Week 3 &mdash; equipment audit</strong>. Check test equipment calibration
                (MFT must have a current calibration certificate &mdash; required by CPS schemes).
                Recalibrate or replace as needed. Stock initial materials: cable, accessories, your
                most-used consumables &mdash; aim for &pound;1,000-1,500 of starter stock.
                <br /><br />
                <strong>Week 2 &mdash; marketing setup</strong>. Get the van signwritten (about
                &pound;200-500). Business cards (&pound;30 for a few hundred). Google Business
                Profile created (free, 20 minutes; add photos, services, hours). Domain registered
                and a simple one-page website (Wix / Squarespace / Carrd; &pound;5-15/month). Set
                up your customer-quote and certificate templates.
                <br /><br />
                <strong>Week 1 &mdash; soft launch</strong>. Tell the network &mdash; family,
                friends, former colleagues, neighbours, trades you worked with. Most year-1
                enquiries come from existing relationships. Ask permission to add them to a mailing
                list / WhatsApp broadcast for occasional updates.
                <br /><br />
                <strong>Week 0 (day one) &mdash; first job</strong>. Issue your first proper
                quote. Issue your first proper invoice. Take your first deposit. Get your first
                Google review when the job completes. The flywheel starts.
                <br /><br />
                <strong>Budget across 6 weeks</strong>: roughly &pound;3-5k for scheme + insurance +
                equipment calibration + signwriting + initial stock; leaving &pound;7-9k of working
                capital from the &pound;12k savings. Treat the working capital as untouchable
                except for cash-flow gaps in the first 3-6 months.
              </>
            }
            whyItMatters={
              <>
                The 6-week pre-launch period is where most sole-trader contractors either set
                themselves up well or set themselves up to scramble in the first 6 months. A
                methodical checklist removes the &quot;I forgot to register for ICO&quot;-type
                surprises. Most importantly, sort the cash-flow discipline (separate account, deposit
                policy, invoicing-day routine, chasing schedule) BEFORE the first job &mdash; not
                in retrospect after the first late-payment crisis.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Sole trader vs limited company: sole trader for simplicity, limited company for liability protection and tax efficiency at higher earnings (~£40-60k+ profit).",
              "Essential registrations: HMRC Self Assessment (or Companies House + HMRC for Ltd), VAT when threshold crossed, CIS for construction, ICO for personal data.",
              "Employers' Liability insurance is the only legally compulsory insurance once you employ anyone — Compulsory Insurance Act 1969; £5m minimum statutory cover.",
              "Cash flow kills more profitable contractors than lack of profit — invoice immediately, take deposits, chase actively, keep cash reserves.",
              "Late Payment of Commercial Debts (Interest) Act 1998 gives 8% + base statutory interest plus fixed recovery costs on overdue B2B invoices.",
              "Set aside 25-30% of every payment for tax — payment-on-account in January of year 2 is the single biggest cash shock for new sole traders.",
              "Marketing that works: quality work + Google reviews + Google Business Profile + word-of-mouth referrals. Random leaflet drops mostly don't.",
              "Cloud accounting software (Xero, QuickBooks, FreeAgent) handles Making Tax Digital compliance and gives real-time financial view; ~£15-40/month.",
            ]}
          />

          <Quiz title="Running your own business — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section5-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.1 CVs and interviews
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section5-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.3 Setting up self-employed
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
