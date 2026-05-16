/**
 * Module 7 · Section 3 · Subsection 1 — Legal forms: sole trader, Ltd, partnership
 * Maps to C&G 2365-03 / Unit 308 / LO1 — supplementary depth
 *   Extends LO1 (career planning + roles in building services engineering) with
 *   apprentice-relevant material on the legal-form side of self-employment.
 *   Most directly supports AC 1.6 "Define the different roles in building services engineering".
 *
 * The legal forms a UK electrical business can take — sole trader,
 * partnership, Limited company, LLP — and what each means for tax (HMRC),
 * registration (Companies House), liability protection, accounting and
 * IR35. Plus the practical reality of choosing the right form for a small
 * electrical firm starting out.
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

const TITLE = 'Legal forms: sole trader, Ltd, partnership | Level 3 Module 7.3.1 | Elec-Mate';
const DESCRIPTION =
  'Sole trader, partnership, Ltd company, LLP — what each legal form means for tax (HMRC), registration (Companies House), liability, accounting and IR35. Choosing the right form for a small electrical firm.';

const checks = [
  {
    id: 'mod7-s3-sub1-sole-trader',
    question: "What is a sole trader and what's the headline tax position?",
    options: [
      "Same as a Ltd company.",
      "Sole trader = an individual who trades on their own account, with no separate legal entity between them and the business. You and the business are legally one. Tax: register with HMRC for Self Assessment; profits taxed as your personal income (income tax + Class 2/4 National Insurance). Liability: unlimited — your personal assets (house, car, savings) are at risk for business debts. Simplest form to set up; most common starting point for a one-person electrical firm.",
      "Sole trader is a type of Ltd.",
      "Only for partnerships.",
    ],
    correctIndex: 1,
    explanation:
      "Sole trader is the simplest legal form — no Companies House registration, no formal accounts to file, just a Self Assessment tax return each January. You keep all the profit (after tax) and you're personally liable for all the debts. Suitable for a one-person electrical firm with low risk and no external investment. Many electricians start as sole traders and convert to Ltd as the business grows.",
  },
  {
    id: 'mod7-s3-sub1-ltd',
    question:
      "What's the practical difference between trading as a sole trader and a Ltd company?",
    options: [
      "No difference.",
      "Ltd company = a separate legal entity registered with Companies House, distinct from its directors and shareholders. The company contracts, owns assets, owes debts. Directors have limited liability (in normal trading; not protected against fraud or wrongful trading). Tax: company pays Corporation Tax (currently 19-25% on profits); directors typically take a modest salary plus dividends (different tax treatment). Annual filing requirements with both Companies House and HMRC.",
      "Ltd is just a marketing name.",
      "Only for big firms.",
    ],
    correctIndex: 1,
    explanation:
      "Ltd is a fundamental legal change — the business becomes a separate legal person. Limited liability protects directors' personal assets in normal trading (subject to important exceptions). Tax structure changes — instead of paying personal income tax on all profits you pay Corporation Tax on company profit and personal tax on what you draw out (salary + dividends). Annual filing burden is greater than sole trader. Worth it as the business grows or risk profile increases.",
  },
  {
    id: 'mod7-s3-sub1-ir35',
    question:
      "What's IR35 and why does it matter for an electrician working through a Ltd company?",
    options: [
      "Just a tax form.",
      "IR35 (the 'off-payroll working rules') is HMRC anti-avoidance legislation that targets disguised employment — situations where a worker uses a Ltd company structure to provide services that would otherwise be employment. If HMRC determines the engagement is 'inside IR35', the income is taxed broadly as employment income (loss of dividend tax efficiency). For an electrician contracting through a personal services company on a long-term single-client engagement IR35 risk is real.",
      "Doesn't apply to electricians.",
      "Only for IT contractors.",
    ],
    correctIndex: 1,
    explanation:
      "IR35 is most familiar from the IT contracting world but applies to any 'personal services company' arrangement. For an electrician working through their own Ltd company on a long-term single-client engagement (especially if working alongside the client's employees on similar terms), HMRC may determine the engagement is inside IR35 — tax efficiency disappears and PAYE-equivalent deductions apply. Get specialist advice before structuring long-term single-client work as Ltd.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does Companies House do?",
    options: [
      "Sells houses.",
      "Companies House is the UK's Government registrar of companies. It receives and publishes company information — incorporation, registered office, directors, shareholders, annual accounts, annual confirmation statement. All UK Ltd companies and LLPs must register with Companies House and file annual returns. Public information is searchable free at companies-house.gov.uk.",
      "Only Welsh companies.",
      "Just an architectural body.",
    ],
    correctAnswer: 1,
    explanation:
      "Companies House is the public register of companies. Anyone (customers, suppliers, banks, prospective employees) can look up your company's directors, registered office and accounts. Filing requirements include the annual confirmation statement (£13 fee, typically once a year) and annual accounts (filed within 9 months of year-end for small companies). Late filing carries automatic penalties.",
  },
  {
    id: 2,
    question: "What's HMRC and what does it expect from a sole trader?",
    options: [
      "Same as Companies House.",
      "HMRC is His Majesty's Revenue and Customs — the UK tax authority. For a sole trader: register for Self Assessment within 3 months of starting trading; file a Self Assessment tax return each January; pay income tax and Class 2/4 National Insurance on profits; potentially register for VAT if turnover exceeds £85,000/year. HMRC also handles PAYE if you have employees.",
      "Only for VAT.",
      "Only for PAYE.",
    ],
    correctAnswer: 1,
    explanation:
      "HMRC is the unavoidable tax counterparty for any UK trader. Sole trader registration is via the HMRC Self Assessment portal — straightforward, but late registration carries penalties. The £85,000 VAT threshold applies to all UK businesses regardless of legal form. Many electricians cross the threshold without realising and face VAT registration backdating.",
  },
  {
    id: 3,
    question: "What's a partnership and why is it less common than sole trader or Ltd?",
    options: [
      "Same as Ltd.",
      "Partnership = two or more people trading together without forming a Ltd company. Partnership is governed by the Partnership Act 1890 (very old statute). Each partner has unlimited personal liability for partnership debts including those incurred by other partners. Tax: each partner files Self Assessment on their share of profits. Less common than sole trader (one-person) or Ltd (limited liability) because you get unlimited liability AND have to share decisions with another partner.",
      "Only for accountants.",
      "Only Scottish form.",
    ],
    correctAnswer: 1,
    explanation:
      "Partnership combines the worst of both worlds — unlimited personal liability (like sole trader) with the friction of shared decision-making (like a company). For two electricians wanting to work together, the modern practical choice is usually a Ltd company with both as directors/shareholders, OR an LLP (Limited Liability Partnership) which adds limited liability. Pure partnership is rare and typically used only when partners specifically want a partnership structure.",
  },
  {
    id: 4,
    question: "What's an LLP and how does it differ from a Ltd?",
    options: [
      "Same as Ltd.",
      "LLP = Limited Liability Partnership, a hybrid form created by the Limited Liability Partnerships Act 2000. Partners have limited liability (like Ltd directors) but the partnership is taxed as a partnership (members file Self Assessment on share of profits, no Corporation Tax). Common in professional services (law, accountancy) but rare in trades. For an electrical firm with multiple working partners LLP is sometimes considered as an alternative to Ltd.",
      "Only for lawyers.",
      "Only for plumbers.",
    ],
    correctAnswer: 1,
    explanation:
      "LLP is a legitimate choice for multi-partner firms wanting limited liability without Corporation Tax overhead. Filing requirements at Companies House are similar to Ltd. Less common in trades because the practical benefits over Ltd (with directors' loans / dividends) are modest for a small firm. Consider LLP if you have multiple working partners and want partnership tax treatment.",
  },
  {
    id: 5,
    question: "When does it make sense to convert from sole trader to Ltd?",
    options: [
      "Never.",
      "Common triggers: profits exceed £40-50k/year (where Ltd's lower-cost dividend tax structure starts to outweigh the extra admin); contracts increasingly require Ltd-only counterparties (some commercial clients refuse to engage sole traders); risk profile grows (more employees, larger contracts, higher liability exposure); raising external investment (impossible as sole trader); planning succession or sale of the business (Ltd is sellable, sole trader isn't).",
      "Only after 50 years.",
      "Always immediately.",
    ],
    correctAnswer: 1,
    explanation:
      "The Ltd vs sole trader decision is partly tax-driven (Ltd is more tax-efficient above ~£40-50k profit) and partly risk/control-driven. Many electricians convert in year 3-5 of trading as profits grow and risk profile changes. Conversion is a one-way step practically — you incorporate the existing trade into a new Ltd company and the sole trader business ceases. Get accountant advice on timing and on transferring goodwill.",
  },
  {
    id: 6,
    question: "What's a 'directors loan account' and why does it matter?",
    options: [
      "Doesn't exist.",
      "A director's loan account (DLA) is the running record of money flowing between a director and the Ltd company — money the director lends to the company (positive DLA balance for the director) or money the director takes out of the company beyond declared salary and dividends (negative / overdrawn DLA, which is a director's loan from the company). Overdrawn DLAs above £10,000 attract benefit-in-kind tax; long-term overdrawn DLAs attract Section 455 tax (32.5% on the loan).",
      "Only for partnerships.",
      "Only at year-end.",
    ],
    correctAnswer: 1,
    explanation:
      "DLA management is a common point of confusion for new Ltd company directors. You can't just 'take money out' of a Ltd company — every withdrawal is either salary (PAYE), dividend (declared from profits), expense (legitimate business cost) or director's loan (with tax consequences). Get an accountant to set up monthly drawdown structure that respects the categories. Sloppy DLA management leads to unexpected tax bills.",
  },
  {
    id: 7,
    question: "What's the VAT threshold and what happens when you cross it?",
    options: [
      "There's no threshold.",
      "Currently £90,000 of VAT-taxable turnover in any rolling 12-month period (£85,000 was the long-standing figure, raised to £90,000 in April 2024). When you cross the threshold you must register for VAT within 30 days and start charging VAT (currently 20% standard rate) on your invoices. Quarterly VAT returns. You can reclaim VAT paid on business purchases. For a busy electrical firm crossing the threshold is a significant administrative event.",
      "£10,000.",
      "£10 million.",
    ],
    correctAnswer: 1,
    explanation:
      "VAT registration is a major operational change. You must charge VAT on all standard-rated work (most electrical work is standard-rated 20%); domestic customers see your prices effectively rise 20%; commercial customers don't care because they reclaim. Many electrical firms approaching the threshold deliberately manage turnover to stay below; others cross deliberately to access reclaim of VAT on materials and equipment. Plan the crossing carefully.",
  },
  {
    id: 8,
    question: "What insurance does a Ltd electrical company need?",
    options: [
      "None.",
      "Public Liability (PL, typically £5-10m cover, £200-500/year), Employers' Liability (EL, statutory minimum £5m under the Employers' Liability (Compulsory Insurance) Act 1969 — required if you have any employees), Professional Indemnity (PI, £1-2m cover for design liability if you do any design work, £300-800/year), Tools-in-Transit insurance, Business Vehicle insurance for company vans. Plus director and officer cover for the directors personally.",
      "Just car insurance.",
      "Only PL.",
    ],
    correctAnswer: 1,
    explanation:
      "Insurance stack is a serious cost item but non-negotiable. EL insurance is legally required if you have any employees — apprentices count. PL is effectively required by all commercial clients and most CPS schemes. PI matters if you do any design work because design liability outlives the install. Get an insurance broker who specialises in trade — Hiscox, NICEIC Insurance, NAPIT Insurance, ECA Insure are common providers.",
  },
];

const faqs = [
  {
    question: "Should I start as sole trader or go straight to Ltd?",
    answer:
      "Common advice: start as sole trader for the first year unless you have specific reasons to go Ltd immediately (high-risk contracts, external investment, succession planning). Sole trader admin is much lighter while you're learning the business. Convert to Ltd when profits justify the tax efficiency (~£40-50k/year) or when risk/control reasons emerge. Get accountant advice on the specific decision for your circumstances.",
  },
  {
    question: "How much does it cost to set up a Ltd company?",
    answer:
      "Companies House charge £50 for online incorporation (£71 by post). Many people use formation agents (£15-100 for a basic incorporation package). Annual ongoing costs: confirmation statement £34/year (online), accountant fees typically £600-1,500/year for a small Ltd company, accounting software (Xero, QuickBooks, FreeAgent) £15-30/month. Total first-year cost roughly £800-2,000 depending on accountant choice and software.",
  },
  {
    question: "Do I need an accountant?",
    answer:
      "Sole trader can DIY Self Assessment if you're disciplined and turnover is modest. Ltd company practically needs an accountant — Corporation Tax, PAYE, VAT, statutory accounts and Companies House filings are too easy to get wrong. Specialist trade accountants understand CIS (Construction Industry Scheme), van/tool capital allowances, materials VAT and the typical electrical-trade pattern. Worth the £600-1,500/year for peace of mind.",
  },
  {
    question: "What's CIS and does it apply to me?",
    answer:
      "CIS = Construction Industry Scheme — HMRC's tax deduction scheme for construction trades. If you sub-contract electrical work to other firms (or if you're sub-contracted by a main contractor), CIS applies. Contractors deduct 20% (registered) or 30% (unregistered) from labour payments, paid to HMRC against your future tax bill. Electrical work on construction sites is in scope. Domestic-only work is outside scope. Register with HMRC for CIS if you sub-contract.",
  },
  {
    question: "What if I want to add a partner / employee later?",
    answer:
      "Sole trader: can become an Employer (separate registration for PAYE) without changing legal form, OR convert to partnership/Ltd to bring in a true partner. Ltd: add directors and/or shareholders through the company (much easier to add structure). Most growing firms convert to Ltd before adding partners because the Ltd structure handles ownership and decision-making cleanly. Get legal advice on partner agreements.",
  },
  {
    question: "What's an FRS105 and FRS102?",
    answer:
      "FRS 105 (Financial Reporting Standard for Microentities) and FRS 102 are the UK accounting standards small companies file under. FRS 105 is for very small companies (turnover <£632k, balance sheet <£316k, employees &lt;10) and is simpler. FRS 102 (Section 1A) is for slightly larger small companies. Your accountant will choose the appropriate standard. Affects what level of detail goes in your filed accounts.",
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 7 · Section 3 · Subsection 1"
            title="Legal forms: sole trader, Ltd, partnership"
            description="Sole trader, partnership, Ltd company, LLP — what each means for tax (HMRC), registration (Companies House), liability, accounting and IR35. Choosing the right form for a small electrical firm."
            tone="emerald"
          />

          <TLDR
            points={[
              "Four main legal forms: sole trader (simplest, unlimited liability), partnership (rare, unlimited shared liability), LLP (limited liability + partnership tax), Ltd company (separate legal entity, limited liability, Corporation Tax).",
              "Sole trader: register with HMRC for Self Assessment, file annual return, pay income tax + NI on profits. No Companies House.",
              "Ltd company: register with Companies House (£50), file annual accounts + confirmation statement, Corporation Tax on profits, directors take salary + dividends.",
              "Conversion trigger: profits exceed £40-50k/year, larger contracts, risk profile growth, succession planning.",
              "VAT registration mandatory above £90,000 turnover; CIS applies to construction sub-contracting; IR35 risk on long-term single-client Ltd engagements.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to C&G 2365-03 / Unit 308 / LO1 / AC 1.3 — identify the differences between employment and self-employment routes in building services engineering.",
              "Distinguish between sole trader, partnership, LLP and Ltd company forms in UK law.",
              "State the registration and filing requirements for each form (HMRC for sole trader, HMRC + Companies House for Ltd / LLP).",
              "Explain the key tax differences (income tax + NI for sole trader vs Corporation Tax + salary/dividends for Ltd).",
              "Identify when conversion from sole trader to Ltd typically makes sense.",
              "Identify VAT registration threshold (£90,000) and CIS scheme for construction sub-contracting.",
              "Identify IR35 risk for personal services companies on long-term single-client engagements.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The four legal forms</ContentEyebrow>

          <ConceptBlock
            title="Sole trader, partnership, LLP, Ltd — the headline differences"
            plainEnglish="UK businesses can be structured in four main legal forms. Sole trader is the simplest — you trade as yourself. Partnership extends sole trader to two or more people sharing the business (and the liability). LLP adds limited liability to the partnership form. Ltd company creates a separate legal entity distinct from its directors and shareholders. Each form has different registration, tax, accounting and liability consequences."
            onSite="For a one-person electrical firm starting out, sole trader is the practical default — minimal admin, all profits flow through your Self Assessment. As the business grows, the conversion to Ltd becomes attractive — limited liability protects personal assets, tax structure becomes more efficient above £40-50k profit, larger commercial clients prefer Ltd counterparties. Most established electrical firms in the UK are Ltd companies."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Sole trader
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  You and the business are one. HMRC Self Assessment, no Companies House.
                  Unlimited personal liability. Simplest setup; lightest admin; least tax-
                  efficient at higher profits.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Partnership
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Two or more people trading together. Partnership Act 1890. Each partner
                  unlimited liability for partnership debts. Each partner files own Self
                  Assessment. Rare in modern trades.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  LLP (Limited Liability Partnership)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Hybrid: limited liability + partnership taxation. Companies House
                  registration required. Common in professional services; rare in trades.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Ltd company
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Separate legal entity. Companies House + HMRC. Corporation Tax on
                  profits. Limited liability for directors. Standard form for established
                  UK electrical firms.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Tax structure compared</ContentEyebrow>

          <ConceptBlock
            title="Tax: sole trader vs Ltd — different mechanisms, different efficiency"
            plainEnglish="Sole trader profits are taxed as your personal income — income tax (20% basic rate, 40% higher rate, 45% additional rate) plus Class 2 NI (small fixed weekly amount) and Class 4 NI (9% above the threshold, 2% above the upper threshold). Ltd company profits are taxed via Corporation Tax (currently 19% small profits rate, 25% main rate); the directors then pay personal tax on what they extract (typically a modest PAYE salary up to NI threshold, plus dividends taxed at 8.75% / 33.75% / 39.35% depending on band)."
            onSite="The Ltd structure becomes more tax-efficient as profits grow because dividend tax rates are lower than income tax rates in the equivalent bands. Below ~£40-50k of profits the difference is modest and the extra admin of Ltd outweighs the saving. Above that threshold Ltd typically wins. Plan with an accountant who knows trade-business specifics."
          >
            <p>
              Headline tax comparison for a typical small electrical firm:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sole trader at £30k profit</strong> &mdash; roughly &pound;3,500
                income tax + &pound;2,000 Class 4 NI + &pound;180 Class 2 NI = ~&pound;5,700
                deductions; net &pound;24,300.
              </li>
              <li>
                <strong>Ltd at £30k profit, all dividends</strong> &mdash; Corporation Tax
                ~&pound;5,700 (19% small profits rate); director takes &pound;24,300 as
                dividend, no further tax (within personal allowance + tax-free dividend
                allowance). Net similar to sole trader but admin much heavier.
              </li>
              <li>
                <strong>Sole trader at £80k profit</strong> &mdash; ~&pound;19,400 income
                tax + ~&pound;3,800 Class 4 NI + Class 2 NI = ~&pound;23,400 deductions;
                net ~&pound;56,600.
              </li>
              <li>
                <strong>Ltd at £80k profit, salary + dividends</strong> &mdash; Corporation
                Tax ~&pound;15,000-18,000; director takes &pound;12k salary + ~&pound;48k
                dividends; net typically ~&pound;60-63k. Better outcome than sole trader.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>IR35 and CIS</ContentEyebrow>

          <ConceptBlock
            title="IR35 — disguised employment risk for personal services companies"
            plainEnglish="IR35 (the 'off-payroll working rules') is HMRC anti-avoidance legislation targeting situations where a worker uses a Ltd company structure to provide services that are effectively employment. If HMRC determines the engagement is 'inside IR35', the income is taxed broadly as employment income — losing the dividend tax efficiency that's the main reason for using a Ltd structure for personal services."
            onSite="For an electrician trading through their own Ltd as a one-person sub-contractor on a long-term single-client engagement (especially if integrated into the client's gang on similar terms to employees), IR35 risk is real. Get specialist advice before structuring long-term single-client work as Ltd. For multi-client electrical firms doing varied work the IR35 risk is much lower."
          >
            <p>
              IR35 status indicators (HMRC CEST tool):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Substitution &mdash; can you send another worker in your place?</li>
              <li>Control &mdash; does the client direct your work in detail?</li>
              <li>Mutuality of obligation &mdash; is there an ongoing obligation to offer/accept work?</li>
              <li>Equipment &mdash; do you provide your own tools and equipment?</li>
              <li>Financial risk &mdash; do you bear genuine financial risk?</li>
              <li>Integration &mdash; are you integrated into the client&apos;s organisation?</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="CIS — Construction Industry Scheme tax deductions"
            plainEnglish="CIS is HMRC's tax deduction scheme for construction trades. If you sub-contract electrical work to other firms, OR if you're sub-contracted by a main contractor, CIS applies. The contractor deducts 20% (CIS-registered sub-contractor) or 30% (unregistered) from labour payments and pays it to HMRC against your future tax bill. Materials are excluded from the deduction. CIS deductions are reconciled against your final tax position at year-end."
            onSite="Most apprentices and improvers won't deal with CIS personally because they're employed (PAYE) rather than sub-contracted. But once you set up your own firm and sub-contract to main contractors, CIS becomes part of your monthly tax cycle. Register with HMRC for CIS as soon as you start sub-contracting."
          >
            <p>
              CIS in practice for an electrical sub-contractor:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Register for CIS with HMRC.</li>
              <li>Verify status with each contractor before they pay.</li>
              <li>Receive labour payment minus 20% CIS deduction.</li>
              <li>Receive materials payment in full (no CIS on materials).</li>
              <li>Contractor pays the 20% to HMRC against your tax account.</li>
              <li>At year-end, CIS deductions credit against your final Income Tax / Corporation Tax bill.</li>
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
            source="Companies Act 2006 — incorporation and directors' duties (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The Companies Act 2006 governs UK Ltd companies. Headline provisions:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Incorporation through Companies House (online or paper).
                  </li>
                  <li>
                    Directors&apos; statutory duties (s.171-177): act within powers, promote
                    success of company, exercise reasonable care/skill/diligence, avoid
                    conflicts of interest, declare interests in proposed transactions, not
                    accept benefits from third parties.
                  </li>
                  <li>
                    Annual confirmation statement and annual accounts filing requirements.
                  </li>
                  <li>
                    Limited liability: shareholders liable only for the value of their shares
                    (subject to wrongful trading and fraud exceptions).
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                Setting up a Ltd company makes you a director with statutory duties. These
                are real legal obligations, not formalities. Failure to discharge them can
                expose you personally despite the &quot;limited liability&quot; structure.
                Keep accurate books, declare conflicts of interest, don&apos;t trade
                insolvent, file accounts on time. A good accountant helps you stay on the
                right side.
              </>
            }
            cite="Source: Companies Act 2006 (c.46), Part 10 (Company directors) — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.2(3) (employer safety policy)"
            clause={
              <>
                &quot;Except in such cases as may be prescribed, it shall be the duty of every
                employer to prepare and as often as may be appropriate revise a written
                statement of his general policy with respect to the health and safety at work
                of his employees and the organisation and arrangements for the time being in
                force for carrying out that policy, and to bring the statement and any
                revision of it to the notice of all of his employees.&quot;
              </>
            }
            meaning={
              <>
                Once you employ anyone (including apprentices) HASAWA s.2(3) requires you to
                prepare a written health and safety policy. The HSE provides template
                policies suitable for small firms. The duty applies regardless of legal form
                &mdash; sole trader with one employee, partnership, Ltd, all the same. Plan
                the H&amp;S policy alongside the legal-form decision.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.2(3)."
          />

          <RegsCallout
            source="Income Tax (Earnings and Pensions) Act 2003 — IR35 / off-payroll working (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  ITEPA 2003 Part 2 Chapter 8 (and the off-payroll working rules in Chapter
                  10) set the framework for HMRC&apos;s anti-avoidance rules on personal
                  services companies. The core test is whether, hypothetically, the worker
                  would be an employee if the intermediary (e.g. the worker&apos;s Ltd
                  company) were ignored.
                </p>
                <p>
                  HMRC publishes the CEST (Check Employment Status for Tax) tool at gov.uk to
                  help determine status.
                </p>
              </>
            }
            meaning={
              <>
                IR35 is real and well-enforced. For an electrician trading through their own
                Ltd on a long-term single-client engagement, get specialist advice on IR35
                status. Use HMRC&apos;s CEST tool as a starting point. Multi-client electrical
                firms doing varied work for different customers face minimal IR35 risk.
              </>
            }
            cite="Source: Income Tax (Earnings and Pensions) Act 2003 (c.1), Part 2 Chapters 8 and 10 — paraphrased from legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Going Ltd too early to chase tax efficiency"
            whatHappens={
              <>
                Newly self-employed electrician sets up Ltd company in month 1 expecting
                immediate tax savings. Profits in year 1 are &pound;25k while building up
                the customer base. Accountant fees (&pound;1,200), Companies House filings,
                accounting software (&pound;400/year) and the structural overhead actually
                cost more than the marginal tax saving at that income level. Sole trader
                would have been simpler and similarly tax-efficient at &pound;25k.
              </>
            }
            doInstead={
              <>
                Start as sole trader for year 1 unless you have specific reasons for Ltd
                (high-risk contract, external investment, succession planning). Reassess at
                year-end. Convert to Ltd when profits comfortably exceed &pound;40-50k or
                when other Ltd-driving reasons emerge. The conversion is a one-evening job
                with an accountant; doing it 12 months later costs nothing extra.
              </>
            }
          />

          <Scenario
            title="Two electricians want to set up together — sole trader, partnership or Ltd?"
            situation={
              <>
                You and a colleague (both JIB Approved Electricians) want to set up an
                electrical firm together. Equal partners, equal investment of time. Initial
                expectation: &pound;60-80k of combined profit in year 1, growing. You need to
                pick a legal form. Pure sole trader doesn&apos;t work because there are two
                of you. Options: partnership, LLP, or Ltd company. Which makes most sense?
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; rule out unincorporated partnership</strong>. Pure
                partnership (Partnership Act 1890) gives you unlimited liability for each
                other&apos;s actions. If your partner makes a mistake that triggers a
                liability claim, you&apos;re personally on the hook for the debt. Modern
                trades practically don&apos;t use unincorporated partnerships for this
                reason.
                <br /><br />
                <strong>Step 2 &mdash; weigh LLP vs Ltd</strong>. LLP gives limited
                liability with partnership tax (each partner taxed on share of profits via
                Self Assessment). Ltd gives limited liability with Corporation Tax + salary
                /dividends. At your expected profit level Ltd is typically more tax-efficient
                because of the lower dividend tax rates compared to higher-rate income tax.
                Plus Ltd is more familiar to commercial clients.
                <br /><br />
                <strong>Step 3 &mdash; agree shareholding and decision-making</strong>.
                Equal partners suggests 50/50 shareholding with both as directors. But
                50/50 can deadlock decisions &mdash; agree a deadlock-resolution clause in
                a shareholders&apos; agreement (drafted by a solicitor; cost
                &pound;800-1,500). Worth doing properly upfront.
                <br /><br />
                <strong>Step 4 &mdash; set up the Ltd company</strong>. Companies House
                online incorporation &pound;50 (or use a formation agent). Open business
                bank account. Register for Corporation Tax with HMRC. Register for CIS if
                sub-contracting. Set up payroll if employing anyone. Engage an accountant
                for ongoing support.
                <br /><br />
                <strong>Step 5 &mdash; document everything</strong>. Shareholders&apos;
                agreement, employment contracts (yes, even for owner-directors),
                directors&apos; remuneration policy, expense policy, dividend declaration
                process. The paperwork upfront is the protection later if the partnership
                goes sideways.
              </>
            }
            whyItMatters={
              <>
                Two-person electrical partnerships go wrong more often than sole-trader
                firms because relationship dynamics get tangled with business decisions. The
                Ltd structure with proper documentation gives you the framework to handle
                disputes professionally. The cost (&pound;800-2,000 first year incl.
                solicitor) is a fraction of what an undocumented partnership dispute would
                cost in legal fees and lost goodwill.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Tax mechanics and the £85k VAT cliff</ContentEyebrow>

          <ConceptBlock
            title="The Ltd company tax stack — Corporation Tax, salary, dividends, NI"
            plainEnglish="A Ltd electrical company in 2024-25 typically pays Corporation Tax at 19% on profits up to £50,000, sliding to 25% above £250,000 (with marginal relief between). Director-shareholders typically draw a small salary (often set at the secondary NI threshold ~£12,570 to maximise personal allowance use without triggering NI) plus dividends from after-tax profits. Dividend tax is 8.75% basic rate, 33.75% higher rate, 39.35% additional rate (with a £500 dividend allowance for 2024-25). The combined effective tax rate on profits taken as dividends is typically 25-35% — usually lower than equivalent PAYE plus employer NI on the same gross."
            onSite="The Ltd company tax efficiency advantage has shrunk significantly since 2016 (when dividend tax allowance was £5,000) but a small Ltd electrical firm still typically nets 5-12% more take-home than the same earnings via sole trader. The advantage compounds at higher profit levels. Get a small-firm accountant from day one — fees ~£800-1,500/year for annual accounts + corporation tax + payroll, which is dwarfed by the tax savings and the avoided HMRC penalties for missed filings. DIY accounting is false economy."
          >
            <p>
              Ltd company tax stack at a glance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Corporation Tax</strong> &mdash; 19% on first &pound;50k profit, 25% above &pound;250k, marginal in between.
              </li>
              <li>
                <strong>Director salary</strong> &mdash; typically ~&pound;12,570 (personal allowance, secondary NI threshold).
              </li>
              <li>
                <strong>Dividends</strong> &mdash; 8.75% / 33.75% / 39.35% by tax band, &pound;500 allowance.
              </li>
              <li>
                <strong>Employer NI</strong> &mdash; saved by paying dividends instead of additional salary.
              </li>
              <li>
                <strong>Pension contributions</strong> &mdash; employer pension allowable as Corp Tax deductible expense.
              </li>
              <li>
                <strong>Annual filings</strong> &mdash; Confirmation Statement (Companies House, &pound;34), Accounts (Companies House + HMRC), CT600 (HMRC).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The £85,000 VAT registration cliff and how to manage it"
            plainEnglish="UK VAT registration becomes compulsory once your taxable turnover exceeds £85,000 in any rolling 12-month period (2024-25 threshold; check current via gov.uk). Cross the threshold and you have 30 days to register and start charging 20% VAT on labour and materials. For a domestic-focused electrical firm this is a major commercial event — your customers (typically homeowners who can't reclaim VAT) effectively see a 20% price rise. Many small firms deliberately stay just below the threshold (sometimes called 'bunching down') to avoid the customer-facing price hike. Above ~£100k turnover the maths usually works out either way; in the £85-100k zone it's awkward."
            onSite="If you're scaling toward the threshold, plan deliberately. Three options: (1) stay under by capping work intake — limits growth but preserves price competitiveness on domestic; (2) cross deliberately and absorb 20% margin compression for 6-12 months while customer base adapts; (3) re-position toward commercial customers (who reclaim VAT) where VAT registration is invisible to them. Many electrical firms cross the threshold by adding a second van (more turnover) or by adding renewables (PV/EV/HP installs are higher-value per job). The Flat Rate Scheme (currently 9.5% sector rate for general construction) can simplify VAT admin in the first year of registration."
          >
            <p>
              VAT registration practical decision points:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Threshold</strong> &mdash; &pound;85,000 rolling 12-month taxable turnover (2024-25).
              </li>
              <li>
                <strong>Deadline</strong> &mdash; 30 days from threshold breach to register.
              </li>
              <li>
                <strong>Standard scheme</strong> &mdash; 20% on outputs, reclaim 20% on inputs (vans, tools, materials, fuel).
              </li>
              <li>
                <strong>Flat Rate Scheme</strong> &mdash; 9.5% on gross turnover for construction, simpler admin.
              </li>
              <li>
                <strong>Cash Accounting</strong> &mdash; only pay VAT when customers pay you (helps cash flow).
              </li>
              <li>
                <strong>Reverse Charge VAT</strong> &mdash; specific construction industry scheme for B2B work, no VAT charged but customer accounts.
              </li>
              <li>
                <strong>De-registration</strong> &mdash; possible if turnover drops below ~&pound;83,000.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="IR35 and the off-payroll working rules — why CIS through a Ltd matters"
            plainEnglish="IR35 (now formally the off-payroll working rules) targets disguised employment — workers who set up a Ltd company to provide services that look like employment but aren't taxed as employment. Since April 2021 the responsibility for determining IR35 status moved to the engaging client (medium and large businesses) — they assess each contract and tax PAYE if the contract is 'inside IR35'. For an electrical Ltd company sub-contracting to a main contractor, this matters: a long-term contract on one site with one contractor looks employment-like and may be deemed inside IR35, costing the contractor 20-25% of their take-home."
            onSite="Most electrical sub-contracting through CIS is fine — short-term, project-based, with multiple clients across the year. The IR35 risk rises if you're effectively working full-time for one main contractor for 12+ months on the same site doing the same role. Mitigation: work for multiple clients across the year, retain genuine business risk (tools, vehicles, indemnity), don't accept staff-equivalent perks (notice periods, paid leave, line management). If unsure, get an IR35 review from a specialist adviser (~£300-500) before signing a long contract. Getting it wrong can mean a backdated tax bill running £10-30k."
          >
            <p>
              IR35 status indicators:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Outside IR35 (genuine self-employment)</strong> &mdash; multiple clients, project-based, own tools, can substitute, business risk.
              </li>
              <li>
                <strong>Inside IR35 (deemed employment)</strong> &mdash; single client, ongoing role, integrated in client team, no substitution allowed.
              </li>
              <li>
                <strong>Status determination</strong> &mdash; client's responsibility for medium/large engagers (since April 2021).
              </li>
              <li>
                <strong>HMRC CEST tool</strong> &mdash; online check, indicative only.
              </li>
              <li>
                <strong>Mitigation</strong> &mdash; multiple clients, no exclusive contracts, avoid staff-equivalent perks.
              </li>
              <li>
                <strong>Penalties</strong> &mdash; backdated PAYE + NI + interest if HMRC reclassifies.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Companies Act 2006 director duties — the legal reality of running a Ltd"
            plainEnglish="When you sign on as a Ltd company director you accept statutory duties under the Companies Act 2006 ss.171-177: act within your powers, promote the success of the company, exercise independent judgement, exercise reasonable care/skill/diligence, avoid conflicts of interest, not accept benefits from third parties, declare interests in proposed transactions. Breach can result in personal liability (the Ltd shield doesn't protect you from your own director duty breaches), disqualification (up to 15 years under the Company Directors Disqualification Act 1986), and in serious cases criminal prosecution."
            onSite="Most one-person electrical Ltds are run informally by the sole director-shareholder who's also the only employee. The director duties still apply — keeping company accounts separate from personal, maintaining proper books, filing on time, declaring conflicts (e.g. if you sell company assets to yourself at undervalue, that's a breach). Get an accountant from day one. Use a separate business bank account from the start. File the Confirmation Statement annually on time (£34, missed = strike-off proceedings). Filing accounts late triggers automatic penalties starting at £150 and escalating. Take the duties seriously — they're individually enforceable, not company-shielded."
          >
            <p>
              Companies Act 2006 director duties (paraphrased):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>s.171</strong> &mdash; Act within your powers (the company's constitution).
              </li>
              <li>
                <strong>s.172</strong> &mdash; Promote the success of the company for the benefit of members.
              </li>
              <li>
                <strong>s.173</strong> &mdash; Exercise independent judgement.
              </li>
              <li>
                <strong>s.174</strong> &mdash; Exercise reasonable care, skill and diligence.
              </li>
              <li>
                <strong>s.175</strong> &mdash; Avoid conflicts of interest.
              </li>
              <li>
                <strong>s.176</strong> &mdash; Not accept benefits from third parties.
              </li>
              <li>
                <strong>s.177</strong> &mdash; Declare interest in proposed transactions or arrangements.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Companies Act 2006 — s.172 (Duty to promote the success of the company)"
            clause={
              <>
                "A director of a company must act in the way he considers, in good faith, would be most likely to
                promote the success of the company for the benefit of its members as a whole, and in doing so have
                regard (amongst other matters) to — (a) the likely consequences of any decision in the long term,
                (b) the interests of the company's employees, (c) the need to foster the company's business
                relationships with suppliers, customers and others, (d) the impact of the company's operations on the
                community and the environment, (e) the desirability of the company maintaining a reputation for high
                standards of business conduct, and (f) the need to act fairly as between members of the company."
              </>
            }
            meaning={
              <>
                Section 172 is the headline director duty and the most-cited in disputes. For a small electrical Ltd
                with one director-shareholder it's mostly common sense — make decisions that build the business
                long-term, treat employees and customers fairly, maintain a reputation for high standards. It becomes
                pointed when there's a dispute (e.g. director-shareholder splits in a partnership Ltd, family
                businesses with multiple shareholders) — the courts use s.172 as the framework for assessing director
                conduct. As a one-person Ltd you typically won't be challenged but still need to be able to evidence
                you've considered these factors in major decisions.
              </>
            }
            cite="Source: Companies Act 2006 (c.46)."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Four UK legal forms: sole trader (simplest, unlimited liability), partnership (rare, unlimited shared liability), LLP (limited liability + partnership tax), Ltd company (separate entity, limited liability, Corporation Tax).",
              "Sole trader: HMRC Self Assessment registration, annual return, income tax + Class 2/4 NI on profits. No Companies House. Lightest admin.",
              "Ltd company: Companies House registration (£50 online), annual confirmation statement + accounts, Corporation Tax, directors take salary + dividends. Separate legal entity protects personal assets.",
              "Conversion sole trader → Ltd typically triggered by profits exceeding £40-50k, larger contracts, risk profile growth, or succession planning. Get accountant advice on timing.",
              "VAT registration mandatory above £90,000 turnover (rolling 12-month). Quarterly VAT returns; reclaim VAT on materials.",
              "CIS (Construction Industry Scheme) applies to construction sub-contracting — 20% labour deduction at source for registered sub-contractors.",
              "IR35 risk for personal services companies on long-term single-client engagements; use HMRC CEST tool for status check.",
              "Insurance stack: Public Liability £5-10m, Employer's Liability £5m (mandatory if employing under EL Compulsory Insurance Act 1969), Professional Indemnity for design work.",
              "Companies Act 2006 directors' duties (s.171-177) apply to all Ltd directors — real legal obligations, not formalities.",
            ]}
          />

          <Quiz title="Legal forms for an electrical business — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 2 — Career pathways
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section3-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.2 Insurance stack
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
