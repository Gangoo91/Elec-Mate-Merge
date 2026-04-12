import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileText,
  AlertTriangle,
  PoundSterling,
  Clock,
  ShieldCheck,
  Home,
  Building2,
  Zap,
  ClipboardCheck,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Finance Guides', href: '/guides/electrician-finance' },
  { label: 'Electrician Mortgage Guide', href: '/electrician-mortgage' },
];

const tocItems = [
  { id: 'self-employed-mortgage', label: 'Getting a Mortgage as a Self-Employed Electrician' },
  { id: 'years-of-accounts', label: '2–3 Years of Accounts (SA302)' },
  { id: 'accountant-presentation', label: 'Presenting Your Income Correctly' },
  { id: 'contractor-mortgage', label: 'Contractor Mortgages (Day Rate)' },
  { id: 'best-lenders', label: 'Which Lenders Are Good for Self-Employed?' },
  { id: 'deposit', label: 'Deposit Requirements' },
  { id: 'improve-chances', label: 'How to Improve Your Application' },
  { id: 'for-electricians', label: 'Managing Your Finances with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Most high-street lenders require 2 to 3 years of self-employed accounts (SA302 tax year overviews from HMRC) to assess income for a mortgage. Some specialist lenders will consider 1 year of accounts.',
  'Lenders look at your net profit (for sole traders) or salary plus dividends (for limited company directors) to calculate the income multiple. Retaining profit in your company reduces your assessable income for mortgage purposes.',
  'Contractor mortgages allow day-rate contractors to be assessed on their day rate (multiplied by 46 or 48 working weeks per year) rather than accounts income. This is particularly useful for CIS electricians on long-term contracts.',
  'A larger deposit (10% minimum, 15–20% for better rates) and a clean credit history significantly improve your chances and the interest rates available to you as a self-employed borrower.',
  'Using a mortgage broker who specialises in self-employed and contractor mortgages is strongly recommended. They know which lenders are most accommodating and can prevent unnecessary credit searches that damage your credit score.',
];

const faqs = [
  {
    question: 'Can I get a mortgage as a self-employed electrician?',
    answer:
      'Yes, absolutely. Self-employed electricians get mortgages every day. The process is more involved than for PAYE employees, primarily because lenders need to assess your income from accounts and tax returns rather than payslips. The key requirements are: typically 2 to 3 years of self-employed trading history with accounts prepared by a qualified accountant; SA302 tax year overviews or tax calculations from HMRC for the relevant years; a clean or near-clean credit record; and a deposit (minimum 5% through Help to Buy, though 10% or more gives access to significantly better rates). Specialist lenders and mortgage brokers experienced with self-employed applicants can access products not available on the high street.',
  },
  {
    question: 'What is an SA302 and why do mortgage lenders want it?',
    answer:
      'An SA302 is a tax calculation summary produced by HMRC based on your self-assessment return. It shows your total income, tax deductions, and tax paid for a given tax year. Mortgage lenders use SA302s to verify your income as declared to HMRC. You can download SA302s from your HMRC online account (under Self Assessment, then Tax Return Options). Most lenders also request the accompanying tax year overview, which shows whether the tax shown on the SA302 was actually paid. Some lenders accept accountant-certified accounts in addition to or instead of SA302s, but this varies.',
  },
  {
    question: 'How many years of accounts do I need for a mortgage?',
    answer:
      'Most mainstream lenders require 2 to 3 years of self-employed accounts. They typically average the income across those years, or use the most recent year if it is lower. Some lenders, including a number of specialist providers, will consider applications with just 1 year of accounts — useful for electricians who recently went self-employed. Having less than 1 year of trading history makes getting a mortgage very difficult, though not impossible with a specialist lender and a larger deposit.',
  },
  {
    question: 'What income do lenders use for a self-employed electrician?',
    answer:
      "For sole traders, lenders typically use your net profit as shown on your self-assessment return and accounts. For limited company directors, most lenders use salary plus dividends drawn. Some more flexible lenders will also consider retained profit within the company. The income multiple (how much you can borrow relative to your income) is typically 4 to 4.5 times your assessed income, though some lenders offer up to 5 or even 5.5 times in certain circumstances. Your accountant's role in presenting your income accurately is important — but note that artificially inflating income for mortgage purposes is mortgage fraud.",
  },
  {
    question: 'What is a contractor mortgage and is it available for electricians?',
    answer:
      'A contractor mortgage is a mortgage product designed for people who work on contract rather than in permanent employment. Instead of using accounts or SA302s, the lender assesses income based on your day rate multiplied by a number of working weeks (typically 46 or 48 per year, reflecting holidays and breaks). For example, a day rate of £300 multiplied by 46 weeks x 5 days = £69,000 assessable income. This is particularly useful for electricians working on long-term CIS contracts where their day rate is significantly higher than their declared taxable profit after expenses. You typically need to evidence the day rate with a current contract.',
  },
  {
    question: 'Which mortgage lenders are best for self-employed electricians?',
    answer:
      "Halifax and Nationwide are among the more self-employed-friendly high-street lenders, particularly for applicants with 2+ years of clean accounts. Halifax will sometimes accept 1 year of accounts in stronger cases. For more complex situations — recent change from employment to self-employment, CIS subcontractors, limited company directors with retained profit — specialist lenders such as Bluestone Mortgages, Precise Mortgages, Aldermore, Kent Reliance, and Pepper Money are often more accommodating. Lenders' criteria change frequently, so always use a mortgage broker who works with self-employed applicants to identify the right lender for your specific situation.",
  },
  {
    question: 'How large a deposit do I need as a self-employed electrician?',
    answer:
      'A minimum deposit of 5% is technically available (through certain schemes) but in practice most self-employed applicants find that mainstream lenders require 10% (90% LTV). A 15% or 20% deposit opens up significantly better interest rates and a wider choice of lenders. A larger deposit also reduces your monthly repayments and the amount of interest paid over the mortgage term. If you are a first-time buyer, schemes such as the Mortgage Guarantee Scheme may make lower deposits more accessible, though availability and criteria change.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/self-assessment-electrician',
    title: 'Self-Assessment for Electricians',
    description:
      'SA302 comes from your self-assessment return — complete guide to filing correctly.',
    icon: FileText,
    category: 'Finance Guide',
  },
  {
    href: '/utr-number-electrician',
    title: 'UTR Number for Electricians',
    description: 'How to register for self-assessment and get your UTR from HMRC.',
    icon: ClipboardCheck,
    category: 'Finance Guide',
  },
  {
    href: '/electrical-business-valuation',
    title: 'Electrical Business Valuation',
    description: 'How much is your electrical business worth if you decide to sell?',
    icon: Building2,
    category: 'Finance Guide',
  },
  {
    href: '/cis-guide-electrician',
    title: 'CIS Guide for Electricians',
    description: 'How CIS works and how day-rate contractor mortgages use your CIS income.',
    icon: PoundSterling,
    category: 'Finance Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Professional invoicing to support your income evidence for mortgage applications.',
    icon: Zap,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'self-employed-mortgage',
    heading: 'Getting a Mortgage as a Self-Employed Electrician',
    content: (
      <>
        <p>
          Self-employed electricians face additional steps when applying for a mortgage compared to
          PAYE employees, but securing a mortgage on competitive terms is entirely achievable with
          the right preparation. The fundamental challenge is that lenders cannot rely on payslips
          and P60s — they need to assess your income from self-assessment records and accounts,
          which requires more documentation and sometimes a specialist lender.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>What lenders are assessing</strong> — lenders want to understand your
                sustainable income. They look at your track record of earnings over 2 to 3 years,
                your tax returns (SA302s), and your prepared accounts. Consistency of income is
                valued; a declining income trend can be a red flag.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Income multiples</strong> — lenders typically offer 4 to 4.5 times your
                assessed annual income. Some specialist lenders offer up to 5 times for
                well-qualified applicants. The income used varies by lender — see the sections below
                on sole trader vs limited company income assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Credit score matters</strong> — a clean credit history is important. Check
                your credit report (Experian, Equifax, or TransUnion) before applying. Resolve any
                errors, reduce credit card balances, and avoid applying for new credit in the 3 to 6
                months before your mortgage application.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <p className="text-white text-sm">
            <strong>Disclaimer:</strong> This guide provides general information about mortgages for
            self-employed electricians. Mortgage products, lender criteria, and interest rates
            change frequently. Always consult a qualified, FCA-regulated mortgage broker for advice
            specific to your financial circumstances.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'years-of-accounts',
    heading: 'Two to Three Years of Accounts: The SA302 Requirement',
    content: (
      <>
        <p>
          The SA302 (tax calculation) is the primary income evidence document for self-employed
          mortgage applicants. Most mainstream lenders require SA302s for the 2 to 3 most recent tax
          years, plus the corresponding tax year overviews showing that the tax was paid.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How to get your SA302</strong> — log in to your HMRC online account at
                gov.uk/personal-tax-account, navigate to Self Assessment, and select Tax Return
                Options. You can download or print SA302s for each year you have filed a return.
                Your accountant can also provide these.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Income used — sole traders</strong> — for sole traders, lenders use your net
                profit after expenses (as shown on your SA302) as your income. Some lenders average
                the two or three years; others use the lowest year or the most recent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Income used — limited company directors</strong> — for directors, most
                mainstream lenders use salary plus dividends drawn from the company. Some more
                flexible lenders also add a share of net profit retained in the company. The
                retained profit approach can significantly increase your assessed income if you
                leave money in the company.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Only 1 year of accounts?</strong> — if you have been self-employed for less
                than two years, you are limited to specialist lenders who accept 1 year of accounts.
                You will typically need a larger deposit (15% or more) and may face higher interest
                rates. Plan ahead — if you are considering buying in 2 or 3 years, start building
                your accounts history now.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'accountant-presentation',
    heading: 'Using an Accountant to Present Your Income Correctly',
    content: (
      <>
        <p>
          An experienced accountant can make a meaningful difference to your mortgage application —
          not by inflating your income (which would be fraud) but by ensuring your income is
          presented accurately and completely.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certified accounts</strong> — some lenders accept accountant-certified
                accounts as an alternative or supplement to SA302s. These are accounts signed off by
                a qualified accountant (ACCA, ICAEW, or CIMA). Having professionally prepared
                accounts demonstrates income reliability.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tax efficiency vs mortgage income</strong> — tax-efficient accounting
                (claiming all allowable expenses, retaining profit in a limited company) often
                reduces your declared income for mortgage purposes. Discuss this trade-off with your
                accountant if you are planning a property purchase — you may wish to adjust your
                approach in the years before applying.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reference letter</strong> — some lenders accept a reference letter from your
                accountant confirming the nature of your self-employment, your income level, and the
                likelihood of continued trading. This can help in borderline cases.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'contractor-mortgage',
    heading: 'Contractor Mortgages: Day Rate x 46 Weeks',
    content: (
      <>
        <p>
          If you work on fixed-term contracts (common for CIS electricians working long-term with a
          single main contractor), you may qualify for a contractor mortgage assessment based on
          your day rate rather than your accounts income.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How day rate assessment works</strong> — the lender multiplies your
                contracted day rate by 46 or 48 working weeks (allowing for holidays and gaps
                between contracts) and by 5 working days. This gives an annualised income figure
                used for affordability assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Example</strong> — a day rate of £350, assessed over 46 weeks x 5 days,
                gives an annualised income of £80,500. At a 4.5x multiple, this supports a mortgage
                of approximately £362,000. This is often significantly higher than the same
                electrician's declared profit after expenses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contract evidence required</strong> — you will need to provide your current
                contract showing your day rate and contract duration. Most lenders require at least
                12 months of contracting history and a contract with remaining duration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lenders offering contractor assessment</strong> — Halifax, Barclays,
                Kensington, and several specialist lenders offer contractor mortgage products. A
                specialist broker can match you with the most suitable lender.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'best-lenders',
    heading: 'Which Lenders Are Good for Self-Employed Electricians?',
    content: (
      <>
        <p>
          Lender criteria for self-employed borrowers varies considerably. Some high-street lenders
          are relatively accommodating; others have rigid requirements that make them unsuitable for
          many electricians. Here is a general guide — but always use a broker as criteria change
          frequently.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Halifax</strong> — generally considered one of the more flexible mainstream
                lenders for self-employed. Accepts 1 year of accounts in some circumstances. Can use
                salary plus dividends plus net profit for limited company directors in some cases.
                Popular first choice for many self-employed applicants.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nationwide</strong> — requires 2 years of accounts and uses a net profit
                approach for sole traders. Can be competitive on rates for clean, well-documented
                applications. Less flexible than Halifax on income assessment but strong on rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist lenders — Bluestone, Aldermore, Precise, Pepper Money</strong>—
                these lenders specialise in complex income situations including self-employed,
                adverse credit, and non-standard properties. Rates are typically higher than
                mainstream lenders, but criteria are more accommodating for electricians with
                complex income, limited accounts history, or mixed CIS and private income.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use a whole-of-market broker</strong> — the single best step you can take is
                using a whole-of-market mortgage broker who regularly works with self-employed
                clients. They will identify the right lender for your specific circumstances without
                you making multiple unsuccessful credit applications that damage your credit score.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'deposit',
    heading: 'Deposit Requirements for Electrician Mortgages',
    content: (
      <>
        <p>
          The size of your deposit has a significant impact on the rates available to you and your
          likelihood of approval as a self-employed borrower.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>5% deposit (95% LTV)</strong> — the minimum available through some schemes,
                but very few mainstream lenders will accept this for self-employed applicants with
                only 1 to 2 years of accounts. Limited choice of products and higher rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>10% deposit (90% LTV)</strong> — the practical minimum for most
                self-employed mortgage applications on the mainstream market. Opens up a much wider
                range of lenders and products.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>15–25% deposit (75–85% LTV)</strong> — the ideal range for self-employed
                borrowers. Access to the most competitive interest rates, the widest lender choice,
                and the greatest chance of approval even with imperfect accounts history.
              </span>
            </li>
          </ul>
        </div>
        <p>
          As a self-employed electrician, building your deposit while also managing CIS tax payments
          and quarterly VAT returns requires careful financial planning. Setting aside money
          regularly from every job — into a dedicated savings account — is the most reliable
          approach.
        </p>
      </>
    ),
  },
  {
    id: 'improve-chances',
    heading: 'How to Improve Your Mortgage Application as an Electrician',
    content: (
      <>
        <p>
          The following steps, taken in the months and years before applying, can materially improve
          your mortgage prospects:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>File returns on time, every year</strong> — late self-assessment returns are
                a red flag for lenders. A clean HMRC compliance record demonstrates financial
                reliability and also maintains your eligibility for CIS gross payment status.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use a qualified accountant</strong> — professionally prepared and certified
                accounts carry more weight with lenders than self-prepared returns. Build a
                relationship with an accountant who understands the trades.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Manage your credit score</strong> — check your credit report and resolve any
                errors. Do not apply for new credit (credit cards, car finance) in the 3 to 6 months
                before your mortgage application. Keep credit card balances below 30% of the limit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep your business account separate</strong> — use a dedicated business bank
                account for all business income and expenses. Clear separation between personal and
                business finances makes accounts preparation easier and cleaner for lenders to
                review.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Keeping Your Financial Records Mortgage-Ready with Elec-Mate',
    content: (
      <>
        <p>
          Clean, organised financial records are the foundation of a strong mortgage application.
          The easier it is for your accountant to prepare your accounts, the more accurate and
          professional the resulting SA302 and certified accounts will be.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Complete Income Records for Your Accountant
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Use{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate's invoicing tool
                  </SEOInternalLink>{' '}
                  to raise professional invoices for every job. Every invoice is stored with date,
                  client, and amount — a complete income record your accountant can use to prepare
                  accurate accounts and SA302s.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Home className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Professional Image Builds Lender Confidence
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Professional invoices, consistent use of a business bank account, and organised
                  records all contribute to the impression of a well-run business. This matters to
                  mortgage underwriters who are trying to assess whether your income is reliable and
                  sustainable.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional invoicing and records for your mortgage application"
          description="Join 1,000+ UK electricians using Elec-Mate for professional invoicing and job records. Give your accountant a clean income record — essential for your SA302 and mortgage application. 7-day free trial."
          icon={Home}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianMortgagePage() {
  return (
    <GuideTemplate
      title="Electrician Mortgage UK | Getting a Mortgage as Self-Employed Electrician"
      description="Complete guide to getting a mortgage as a self-employed electrician in the UK — SA302 requirements, 2-3 years of accounts, contractor day rate mortgages, which lenders accept self-employed applicants (Halifax, Nationwide, specialist lenders), and deposit requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Finance Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Electrician Mortgage UK:{' '}
          <span className="text-yellow-400">Getting a Mortgage as Self-Employed</span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about getting a mortgage while self-employed — SA302 and accounts requirements, how lenders assess your income, contractor day rate mortgages, which lenders are self-employed-friendly, and how to improve your application."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Mortgages for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Professional Records for Your Mortgage Application"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for professional invoicing and job records. Give your accountant everything needed for accurate SA302s and certified accounts. 7-day free trial, cancel anytime."
    />
  );
}
