import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Calculator,
  FileText,
  Receipt,
  TrendingUp,
  Briefcase,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Truck,
  Wrench,
  BarChart3,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/going-self-employed-electrician' },
  { label: 'Tax Guide', href: '/guides/electrician-tax-guide-uk' },
];

const tocItems = [
  { id: 'self-assessment-basics', label: 'Self-Assessment Basics' },
  { id: 'allowable-expenses', label: 'Allowable Expenses' },
  { id: 'mileage-and-van-costs', label: 'Mileage and Van Costs' },
  { id: 'tools-and-equipment', label: 'Tools and Equipment' },
  { id: 'cis-deductions', label: 'CIS Deductions' },
  { id: 'vat-threshold', label: 'VAT Threshold and Registration' },
  { id: 'ltd-vs-sole-trader', label: 'Ltd Company vs Sole Trader' },
  { id: 'record-keeping', label: 'Record Keeping with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Self-employed electricians must register with HMRC and file a Self-Assessment tax return by 31 January each year — late filing triggers an automatic £100 penalty.',
  'You can claim allowable expenses including tools, materials, van costs, insurance, training, phone bills, and workwear — reducing your taxable profit pound for pound.',
  'The VAT registration threshold is £90,000 (2025/26). Once your taxable turnover exceeds this in any rolling 12-month period, you must register within 30 days.',
  'CIS deductions (20% or 30%) are not a final tax — they are advance payments that offset your Self-Assessment bill, and you may be owed a refund.',
  'Elec-Mate tracks every expense, receipt, and invoice automatically — giving you a real-time view of profit and making your tax return straightforward.',
];

const faqs = [
  {
    question: 'When do I need to file my Self-Assessment tax return?',
    answer:
      'The Self-Assessment tax return for the tax year ending 5 April must be filed by 31 January the following year if you file online, or 31 October if you file a paper return. For example, the 2025/26 tax year (6 April 2025 to 5 April 2026) has an online filing deadline of 31 January 2027. If you miss the deadline, HMRC charges an automatic £100 penalty — even if you owe no tax. After 3 months late, daily penalties of £10 per day apply (up to 90 days). After 6 months, a further penalty of 5% of the tax due or £300 (whichever is greater) is charged. After 12 months, another 5% or £300 penalty applies. Payment of tax owed is also due by 31 January. If you expect a tax bill over £1,000, HMRC may also require payments on account — two advance payments in January and July based on the previous year tax bill.',
  },
  {
    question: 'What expenses can I claim as a self-employed electrician?',
    answer:
      'You can claim any expense that is wholly and exclusively for business purposes. Common allowable expenses for electricians include: tools and test equipment (multifunction testers, hand tools, PPE), materials purchased for jobs, van running costs (fuel, insurance, MOT, servicing, repairs), phone and internet bills (business proportion), insurance premiums (public liability, professional indemnity), training and CPD courses (18th Edition, 2391, AM2), professional body memberships (NICEIC, NAPIT, JIB, IET), accountancy fees, stationery and printing, workwear and safety boots, software subscriptions (including Elec-Mate), and marketing costs. You cannot claim for personal expenses, clothing that is not specifically for work, or fines and penalties. Mixed-use expenses (like a phone used for both personal and business) must be apportioned — you can only claim the business proportion.',
  },
  {
    question: 'Should I be a sole trader or a limited company?',
    answer:
      'As a sole trader, you pay Income Tax on your profits at 20% (basic rate), 40% (higher rate), or 45% (additional rate), plus Class 2 and Class 4 National Insurance. As a limited company director, you can pay yourself a small salary (usually at the NI threshold) and take the rest as dividends, which are taxed at lower rates (8.75% basic, 33.75% higher). However, a limited company has additional costs: Companies House filing, corporation tax returns, accountancy fees (typically £1,000 to £2,000 per year), and more complex record-keeping. The crossover point where a limited company becomes more tax-efficient is generally around £40,000 to £50,000 profit per year — but this depends on your personal circumstances. Many electricians start as sole traders and incorporate later when their profits grow. An accountant can model both scenarios for your specific situation.',
  },
  {
    question: 'How do CIS deductions work for electricians?',
    answer:
      'If you work as a subcontractor for a CIS-registered contractor, they will deduct 20% from your labour payments (or 30% if you are not registered with HMRC for CIS). These deductions are paid to HMRC on your behalf and count as advance payments towards your Income Tax and National Insurance bill. When you file your Self-Assessment tax return, you declare the gross income and the CIS deductions already paid. If the deductions exceed your actual tax liability, you will receive a refund. To register for CIS and get the 20% rate (rather than 30%), contact HMRC or register online. You will need your UTR (Unique Taxpayer Reference) and National Insurance number. You can also apply for gross payment status if you meet the turnover and compliance criteria — meaning no deductions are taken at source.',
  },
  {
    question: 'Do I need to register for VAT as an electrician?',
    answer:
      'You must register for VAT if your taxable turnover exceeds £90,000 in any rolling 12-month period (the 2025/26 threshold). You can also register voluntarily below this threshold. Once registered, you charge VAT at 20% on your invoices and reclaim VAT on business purchases. Domestic electrical work (new installations, rewires) in qualifying properties may be eligible for the reduced 5% VAT rate under certain conditions. Most electricians use the VAT Flat Rate Scheme, which simplifies accounting — you charge 20% VAT to customers but pay HMRC a fixed percentage of your gross turnover (typically 14.5% for electrical services in the first year with the 1% discount). The difference is your profit. MTD (Making Tax Digital) requires VAT-registered businesses to keep digital records and submit VAT returns using compatible software.',
  },
  {
    question: 'Can I claim for my van as a business expense?',
    answer:
      'Yes. If the van is used solely for business, you can claim 100% of the running costs (fuel, insurance, road tax, MOT, servicing, repairs, parking, tolls) and claim capital allowances on the purchase price. Under the Annual Investment Allowance (AIA), you can deduct the full cost of a van (up to £1 million) from your profits in the year of purchase. If the van is used for both business and personal travel, you must apportion the costs and only claim the business proportion. Alternatively, you can use the simplified mileage method: 45p per mile for the first 10,000 business miles and 25p per mile thereafter. You cannot use both methods — choose either actual costs or simplified mileage and stick with it. Leased vans follow different rules: lease payments are an allowable revenue expense, but you cannot claim capital allowances on a leased vehicle.',
  },
  {
    question: 'What records do I need to keep for HMRC?',
    answer:
      'HMRC requires you to keep records of all income and expenses for at least 5 years after the 31 January submission deadline. This includes: invoices issued to customers, receipts for all business expenses, bank statements, CIS payment and deduction statements (from contractors), mileage logs (if claiming vehicle costs), and records of any assets purchased (tools, van, equipment). Under Making Tax Digital for Income Tax (MTD for ITSA), which is being phased in from April 2026 for those earning over £50,000, you will need to keep digital records and submit quarterly updates to HMRC. Elec-Mate captures every invoice, expense, and receipt digitally — giving you a complete audit trail that is always ready for your accountant or an HMRC enquiry.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/cis-for-electricians',
    title: 'CIS for Electricians',
    description:
      'Complete guide to the Construction Industry Scheme — registration, deduction rates, monthly returns, and DRC VAT.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/guides/hourly-rate-calculator-electrician',
    title: 'Hourly Rate Calculator',
    description:
      'Work out your true hourly rate including overheads, profit margin, and non-billable time.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/going-self-employed-electrician',
    title: 'Going Self-Employed',
    description:
      'Step-by-step guide to setting up as a self-employed electrician — registration, pricing, and getting work.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-insurance-uk',
    title: 'Electrician Insurance UK',
    description:
      'What insurance cover you need as a self-employed electrician — public liability, PI, tools, and van.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/debt-recovery-electricians',
    title: 'Debt Recovery for Electricians',
    description:
      'How to get paid on time — payment terms, late payment interest, and small claims court.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/invoice-generator',
    title: 'Invoice App',
    description:
      'Create and send professional invoices from your phone. Track payments, send reminders, and export for your accountant.',
    icon: Receipt,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'self-assessment-basics',
    heading: 'Self-Assessment: The Basics Every Electrician Must Know',
    content: (
      <>
        <p>
          If you are self-employed as an electrician — whether as a sole trader or a partner in a
          business — you must register with HMRC for Self-Assessment and file a tax return every
          year. This applies from the moment you start trading, even if you are also employed
          elsewhere and paying tax through PAYE.
        </p>
        <p>
          Registration is straightforward. Go to the HMRC website, register as self-employed, and
          you will receive a Unique Taxpayer Reference (UTR) — usually within 10 working days. You
          must register by 5 October in the second tax year of trading. For example, if you start
          trading in June 2025, you must register by 5 October 2026.
        </p>
        <p>
          The tax year runs from 6 April to 5 April. Your Self-Assessment return covers all income
          and expenses within that period. You must file online by 31 January after the end of the
          tax year and pay any tax owed by the same date. If your previous year tax bill was over
          £1,000, HMRC will also require two payments on account — advance payments in January and
          July based on the previous year liability.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Income Tax rates (2025/26):</strong> 0% on the first £12,570 (personal
                allowance), 20% on £12,571 to £50,270, 40% on £50,271 to £125,140, 45% above
                £125,140.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Class 2 National Insurance:</strong> £3.45 per week if profits exceed the
                Small Profits Threshold (£6,725). Paid through Self-Assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Class 4 National Insurance:</strong> 6% on profits between £12,570 and
                £50,270, plus 2% on profits above £50,270.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The single most effective way to reduce your tax bill is to claim every allowable expense.
          Every pound of legitimate business expense reduces your taxable profit by a pound — and at
          the 20% basic rate, that saves you 20p in tax plus National Insurance.
        </p>
      </>
    ),
  },
  {
    id: 'allowable-expenses',
    heading: 'Allowable Expenses: What You Can Claim',
    content: (
      <>
        <p>
          HMRC allows you to deduct expenses that are "wholly and exclusively" for business
          purposes. For electricians, the list is extensive. The key is to capture every receipt and
          record every expense — because if you cannot prove it, you cannot claim it.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tools and test equipment:</strong> Multifunction testers, hand tools, drill
                bits, fixings, PPE, hi-vis, safety boots. If a single item costs under £1,000, you
                can deduct the full cost as a revenue expense. Items over £1,000 (like a high-end
                multifunction tester) are capital items and qualify for the Annual Investment
                Allowance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Materials:</strong> Cable, trunking, back boxes, switches, sockets, consumer
                units, RCDs, MCBs — anything you purchase for a job. If you include materials in
                your invoice to the customer, the cost is an expense and the invoice amount is
                income. The profit is the difference.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Van costs:</strong> Fuel, insurance, road tax, MOT, servicing, repairs,
                tyres, breakdown cover, parking, tolls, congestion charges. If the van is used
                solely for business, claim 100%. If mixed use, apportion to the business percentage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance:</strong> Public liability, professional indemnity, employers
                liability, tools cover, van insurance. All fully deductible as business expenses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Training and qualifications:</strong> 18th Edition (C&G 2382), Inspection
                and Testing (C&G 2391), AM2, EV charging, solar PV, fire alarm courses. CPD courses,
                books, and online training subscriptions are all allowable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional memberships:</strong> NICEIC, NAPIT, ELECSA, JIB, IET, ECA
                registration fees, competent person scheme fees, CSCS card renewal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Software and subscriptions:</strong> Elec-Mate, accounting software,
                certification apps, design software, cloud storage. All allowable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The golden rule: if you spent money to earn money, it is probably an allowable expense.
          When in doubt, keep the receipt and ask your accountant. Elec-Mate's{' '}
          <SEOInternalLink href="/tools/expense-tracker">expenses tracker</SEOInternalLink> lets you
          photograph receipts on the spot, categorise them, and export everything your accountant
          needs at year end.
        </p>
        <SEOAppBridge
          title="Never miss an allowable expense again"
          description="Elec-Mate's expenses tracker captures every receipt, categorises it automatically, and gives you a real-time profit figure. When your accountant asks for your records, export everything in one tap."
          icon={Receipt}
        />
      </>
    ),
  },
  {
    id: 'mileage-and-van-costs',
    heading: 'Mileage and Van Costs: Two Methods, One Choice',
    content: (
      <>
        <p>
          You have two options for claiming vehicle costs, and you must choose one method and stick
          with it for the life of that vehicle.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Method 1: Actual Costs</h3>
            <p className="text-white text-sm leading-relaxed">
              Claim the actual costs of running the van: fuel, insurance, road tax, MOT, servicing,
              repairs, tyres, breakdown cover, parking, and tolls. If the van is used partly for
              personal travel, you must keep a mileage log and calculate the business percentage.
              You also claim capital allowances on the purchase price — the Annual Investment
              Allowance lets you deduct the full cost (up to £1 million) in the year of purchase.
              This method is more work but often gives a higher deduction, especially if you have a
              newer van with high finance or depreciation costs.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Method 2: Simplified Mileage</h3>
            <p className="text-white text-sm leading-relaxed">
              Use HMRC's flat-rate mileage allowance: 45p per mile for the first 10,000 business
              miles per year, then 25p per mile after that. This rate covers fuel, insurance,
              servicing, and depreciation — you cannot claim those costs separately. You still need
              to keep a mileage log showing each journey (date, destination, purpose, miles). This
              method is simpler and can be better for older, low-value vans with cheap running
              costs. You cannot use simplified mileage for a leased vehicle.
            </p>
          </div>
        </div>
        <p>
          Most electricians driving 20,000 to 30,000 business miles per year find that actual costs
          give a larger deduction — but it depends on the van, its age, and the finance arrangement.
          A good accountant can model both scenarios for you in your first year and recommend the
          better option.
        </p>
        <p>
          Whichever method you choose, you need a mileage log. HMRC can request this during an
          enquiry, and without it, your vehicle expense claim could be disallowed entirely. The log
          must show the date, start point, destination, purpose of the journey, and miles driven.
        </p>
      </>
    ),
  },
  {
    id: 'tools-and-equipment',
    heading: 'Tools and Equipment: Capital Allowances',
    content: (
      <>
        <p>
          As an electrician, your test equipment and tools are essential business assets. How you
          claim them depends on the cost:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Items under £1,000:</strong> Deduct the full cost as a revenue expense in
                the year of purchase. This covers most hand tools, drill bits, fixings, PPE, and
                lower-cost test equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Items over £1,000:</strong> These are capital items. Claim them through the
                Annual Investment Allowance (AIA), which lets you deduct the full cost (up to £1
                million per year) from your taxable profits in the year of purchase. A multifunction
                tester costing £1,200 is deducted in full.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replacement tools:</strong> If you replace a tool on a like-for-like basis,
                the cost of the replacement is an allowable expense. If you upgrade to a
                significantly better tool, the upgrade element is a capital cost.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Keep receipts for every tool purchase — even a £5 pack of drill bits. These small
          purchases add up over the year, and every one is a deductible expense. If you buy tools
          from a trade counter and pay cash, ask for a VAT receipt. If you buy online, save the
          order confirmation and delivery note.
        </p>
        <p>
          If a tool is stolen or damaged beyond repair, you can claim the loss as an expense. Your{' '}
          <SEOInternalLink href="/guides/electrician-insurance-uk">tools insurance</SEOInternalLink>{' '}
          payout (if any) would be treated as income, and the replacement cost as an expense.
        </p>
      </>
    ),
  },
  {
    id: 'cis-deductions',
    heading: 'CIS Deductions: Understanding Your Payslip',
    content: (
      <>
        <p>
          If you work as a subcontractor for a{' '}
          <SEOInternalLink href="/guides/cis-for-electricians">
            CIS-registered contractor
          </SEOInternalLink>
          , they are legally required to deduct tax from your labour payments before paying you. The
          deduction rate depends on your registration status:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>20% deduction:</strong> You are registered with HMRC for CIS. The contractor
                deducts 20% from the labour element of your payment (not materials) and pays it to
                HMRC on your behalf.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>30% deduction:</strong> You are not registered with HMRC for CIS. The
                contractor must deduct 30% from the labour element. Registering is free and takes a
                few minutes — there is no reason to be on the 30% rate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>0% deduction (gross payment status):</strong> If you meet HMRC's criteria
                (minimum £30,000 annual turnover, clean compliance record, up-to-date tax returns),
                you can apply for gross payment status. No deductions are taken, and you pay your
                tax through Self-Assessment as normal.
              </span>
            </li>
          </ul>
        </div>
        <p>
          CIS deductions are not a tax in themselves — they are advance payments towards your Income
          Tax and National Insurance. When you file your Self-Assessment return, you declare your
          gross CIS income and the total deductions already paid. If the deductions exceed your
          actual tax liability, HMRC will refund the difference. Many electricians who have
          significant expenses end up receiving CIS refunds.
        </p>
        <p>
          Keep every CIS payment and deduction statement from every contractor you work for. You
          will need these to complete your tax return accurately. If a contractor does not provide a
          statement, chase it — without it, you cannot claim the deduction credit.
        </p>
      </>
    ),
  },
  {
    id: 'vat-threshold',
    heading: 'VAT: Threshold, Registration, and Schemes',
    content: (
      <>
        <p>
          The VAT registration threshold for 2025/26 is £90,000. If your taxable turnover exceeds
          this in any rolling 12-month period, you must register for VAT within 30 days. You can
          also register voluntarily below this threshold if it benefits your business.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard VAT accounting:</strong> Charge 20% VAT on your invoices. Reclaim
                VAT on all business purchases. Submit quarterly VAT returns. The difference between
                VAT charged and VAT reclaimed is paid to (or refunded by) HMRC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flat Rate Scheme (FRS):</strong> Charge 20% VAT to customers but pay HMRC a
                fixed percentage of your gross turnover (14.5% for electrical services in year one
                with the 1% new business discount, then 15.5%). You cannot reclaim VAT on purchases
                (except capital items over £2,000). Simpler record-keeping.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic Reverse Charge (DRC):</strong> If you supply CIS-regulated services
                to another VAT-registered contractor, the DRC applies. You do not charge VAT on the
                invoice — the customer accounts for it. This affects your cash flow and your VAT
                return.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Voluntary registration can be beneficial if you buy a lot of materials and want to reclaim
          the VAT. However, it adds 20% to your prices for domestic customers who cannot reclaim VAT
          — making you less competitive against non-VAT-registered competitors. If most of your work
          is for VAT-registered businesses (commercial work, subcontracting), this is less of an
          issue.
        </p>
        <p>
          Making Tax Digital (MTD) requires all VAT-registered businesses to keep digital records
          and submit VAT returns using compatible software. Spreadsheets alone are no longer
          acceptable — you need digital record-keeping software. Elec-Mate's{' '}
          <SEOInternalLink href="/tools/invoice-generator">invoice app</SEOInternalLink> and{' '}
          <SEOInternalLink href="/tools/expense-tracker">expenses tracker</SEOInternalLink> provide
          the digital records you need for MTD compliance.
        </p>
      </>
    ),
  },
  {
    id: 'ltd-vs-sole-trader',
    heading: 'Limited Company vs Sole Trader: Which Is Right for You?',
    content: (
      <>
        <p>
          Most electricians start as sole traders because it is simple — register with HMRC, start
          trading, file a tax return once a year. But as your profits grow, a limited company can
          save you thousands in tax. Here is the comparison:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Sole Trader</h3>
            <p className="text-white text-sm leading-relaxed">
              Simple to set up and run. File one Self-Assessment return per year. Pay Income Tax and
              National Insurance on profits. Personally liable for business debts. Lower accountancy
              costs (£200 to £500 per year). No Companies House filing. All profits are yours — no
              distinction between business and personal money. Ideal for electricians earning under
              £40,000 to £50,000 profit.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Limited Company</h3>
            <p className="text-white text-sm leading-relaxed">
              The company is a separate legal entity. Pay Corporation Tax (25% for 2025/26, with a
              19% small profits rate for profits under £50,000). Pay yourself a small salary (at the
              NI threshold) and take remaining profits as dividends (taxed at 8.75% basic rate).
              Limited liability protects personal assets. Higher accountancy costs (£1,000 to £2,000
              per year). Annual Companies House filing required. More tax-efficient above £40,000 to
              £50,000 profit.
            </p>
          </div>
        </div>
        <p>
          The decision is not just about tax. A limited company gives you limited liability —
          meaning your personal assets (house, savings) are protected if the business runs into
          financial difficulty. It also looks more professional to some clients and contractors.
          However, it adds administrative burden: company bank account, corporation tax returns,
          confirmation statements, and annual accounts.
        </p>
        <p>
          Many electricians start as sole traders and incorporate when profits consistently exceed
          £40,000 to £50,000. Your accountant can model the exact tax saving based on your specific
          numbers.
        </p>
      </>
    ),
  },
  {
    id: 'record-keeping',
    heading: 'Record Keeping: How Elec-Mate Makes Tax Simple',
    content: (
      <>
        <p>
          Good record keeping is the foundation of a low tax bill. If you cannot prove an expense,
          you cannot claim it. If you lose a receipt, you lose the deduction. Most electricians hate
          paperwork — but it costs money to ignore it.
        </p>
        <p>
          Elec-Mate is built to solve this problem. Every business tool you use on the app creates a
          digital record that feeds into your financial overview:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Expenses Tracker</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photograph receipts on the spot. The app reads the amount, date, and supplier
                  automatically. Categorise as tools, materials, fuel, insurance, training, or any
                  custom category. Every expense is stored, searchable, and exportable.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Invoice App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Create and send professional invoices from your phone. Every invoice is recorded
                  as income. Track which invoices are paid, unpaid, or overdue. Export a complete
                  income record for your accountant at year end.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cash Flow Planner</h4>
                <p className="text-white text-sm leading-relaxed">
                  See your income, expenses, and profit in real time. Forecast your tax bill based
                  on current trading. Plan for VAT payments and payments on account. No surprises
                  when January arrives.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <BarChart3 className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Business Analytics</h4>
                <p className="text-white text-sm leading-relaxed">
                  Job profitability reports show you which types of work make the most money. See
                  your average job value, profit margin, and hourly rate across all jobs. Make
                  data-driven decisions about which work to pursue.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          The result: when your accountant asks for your records, you export everything from
          Elec-Mate in one tap. Income, expenses, receipts, mileage — all categorised and ready. No
          shoebox of crumpled receipts. No spreadsheet you forgot to update since March.
        </p>
        <SEOAppBridge
          title="Track every penny — income, expenses, and profit"
          description="Elec-Mate gives you a complete financial picture of your business. Capture receipts, send invoices, track cash flow, and see your real-time profit. Export everything for your accountant. 7-day free trial."
          icon={TrendingUp}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianTaxGuidePage() {
  return (
    <GuideTemplate
      title="Electrician Tax Guide UK 2026 | Self-Employed & Ltd"
      description="Complete UK tax guide for self-employed electricians and limited companies. Covers self-assessment, allowable expenses, mileage, tools, CIS deductions, VAT threshold, and record keeping for HMRC."
      datePublished="2026-01-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Tax Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Electrician Tax Guide UK 2026:{' '}
          <span className="text-yellow-400">Self-Employed and Limited Company</span>
        </>
      }
      heroSubtitle="Every self-employed electrician needs to understand self-assessment, allowable expenses, CIS deductions, and VAT. This guide covers everything — from registering with HMRC to choosing between sole trader and limited company, with practical advice on reducing your tax bill legally."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Tax"
      relatedPages={relatedPages}
      ctaHeading="Track Expenses and Invoices in One App"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to track expenses, send invoices, and manage cash flow. Every receipt captured, every invoice tracked, every penny accounted for. 7-day free trial, cancel anytime."
    />
  );
}
