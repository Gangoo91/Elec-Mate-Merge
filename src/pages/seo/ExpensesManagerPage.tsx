import BusinessTemplate from '@/pages/seo/templates/BusinessTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Receipt,
  Briefcase,
  PoundSterling,
  Car,
  Wrench,
  Fuel,
  Camera,
  FolderOpen,
  TrendingUp,
  ShieldCheck,
  Calculator,
  FileText,
  Zap,
  BarChart3,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Business Tools', href: '/tools' },
  { label: 'Expenses Manager', href: '/tools/expenses-manager-electrician' },
];

const tocItems = [
  { id: 'why-track-expenses', label: 'Why Track Expenses' },
  { id: 'hmrc-categories', label: 'HMRC Expense Categories' },
  { id: 'mileage-tracking', label: 'Mileage Tracking' },
  { id: 'materials-and-tools', label: 'Materials and Tools' },
  { id: 'receipt-management', label: 'Receipt Management' },
  { id: 'tax-savings', label: 'Tax Savings' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Every legitimate business expense reduces your taxable profit and therefore your Income Tax and National Insurance bill -- missing deductible expenses is like handing money to HMRC.',
  'Electricians can claim mileage at 45p per mile for the first 10,000 miles and 25p thereafter, or claim actual vehicle costs -- whichever gives the larger deduction.',
  'Materials, tools, test equipment, calibration, PPE, insurance, certification body fees, training, phone, software subscriptions, and accountancy fees are all allowable expenses.',
  'HMRC requires receipts and records to be kept for at least 5 years -- a shoebox of crumpled receipts is not a system. Digital capture is faster, safer, and audit-ready.',
  'Making Tax Digital (MTD) for Income Tax Self Assessment starts April 2026 for those earning over GBP 50,000, making real-time expense tracking essential rather than optional.',
];

const stats = [
  { value: 'GBP 3,200', label: 'Average tax saved per year with proper expense tracking' },
  { value: '45p/mi', label: 'HMRC mileage rate (first 10,000 miles)' },
  { value: '5 yrs', label: 'HMRC record keeping requirement' },
  { value: '< 30s', label: 'Time to snap and log a receipt' },
];

const faqs = [
  {
    question: 'What expenses can electricians claim against tax?',
    answer:
      'As a self-employed electrician, you can claim any expense that is wholly and exclusively for business purposes. This includes materials purchased for jobs, tools and test equipment (either as a one-off purchase or annual capital allowances for items over a certain value), van or vehicle costs (either actual costs or HMRC mileage rates), fuel, insurance (public liability, professional indemnity, employers liability, tool cover), certification body fees (NICEIC, NAPIT, ELECSA), training and CPD courses, accountancy fees, phone and internet (business proportion), software subscriptions (including Elec-Mate), workwear and PPE, parking and tolls, and business use of home (a flat rate or proportional claim). You cannot claim for personal expenses, fines and penalties, clothing that is not specialist workwear, or entertaining clients.',
  },
  {
    question: 'Should I use HMRC mileage rates or actual vehicle costs?',
    answer:
      'It depends on your situation. HMRC simplified mileage rates are 45p per mile for the first 10,000 business miles and 25p per mile thereafter. This covers fuel, insurance, servicing, depreciation, and road tax -- you cannot claim these separately if you use mileage rates. Actual vehicle costs involve tracking every expense related to your vehicle (fuel, insurance, servicing, MOT, road tax, finance payments, depreciation) and then calculating the business-use percentage. If you drive a newer or more expensive van with high finance costs, actual costs often give a larger deduction. If you drive an older, fully paid-off van, mileage rates are often better. Elec-Mate calculates both methods and shows you which gives the greater tax saving. You must choose one method and stick with it for the life of that vehicle.',
  },
  {
    question: 'How long must I keep expense records?',
    answer:
      'HMRC requires you to keep business records for at least 5 years after the 31 January Self Assessment submission deadline for the relevant tax year. For example, records for the 2025-26 tax year (ending 5 April 2026) must be kept until 31 January 2032. If you file your return late, you must keep records for 5 years from the date you actually file. Records include receipts, invoices, bank statements, mileage logs, and any other evidence of income and expenditure. Digital records are accepted by HMRC and are generally safer than paper receipts, which fade and can be lost. Elec-Mate stores all your expense records digitally with automatic cloud backup.',
  },
  {
    question: 'What is Making Tax Digital and how does it affect expense tracking?',
    answer:
      'Making Tax Digital (MTD) for Income Tax Self Assessment is being phased in from April 2026 for sole traders and landlords with income over GBP 50,000, and from April 2027 for those with income over GBP 30,000. Under MTD, you must keep digital records and submit quarterly updates to HMRC using compatible software, rather than a single annual Self Assessment return. This means your income and expenses must be recorded digitally and kept up to date throughout the year, not compiled in a rush at year-end. Elec-Mate is designed to support MTD compliance by capturing expenses in real time, categorising them according to HMRC categories, and storing them in a digital format ready for quarterly submission.',
  },
  {
    question: 'Can I claim for tools and test equipment?',
    answer:
      'Yes. Tools and test equipment are allowable business expenses. Small items (hand tools, basic accessories) can be claimed in full as a revenue expense in the year you buy them. Larger items -- such as a multifunction tester (GBP 600-GBP 1,200), an SDS drill, or a van -- may need to be claimed through capital allowances. The Annual Investment Allowance (AIA) currently allows you to claim 100% of the cost of qualifying capital expenditure up to GBP 1 million per year, so in practice most electricians can claim the full cost of any tool or equipment purchase in the year it is bought. Calibration costs for test instruments are also fully deductible as a revenue expense.',
  },
  {
    question: 'How do I track fuel expenses for my van?',
    answer:
      'If you use HMRC simplified mileage rates, you do not need to track individual fuel purchases -- the mileage rate covers fuel, along with all other vehicle running costs. Simply record the business miles you drive each day (start mileage, end mileage, destination, and purpose of the journey) and multiply by 45p for the first 10,000 miles or 25p thereafter. If you use actual vehicle costs instead, you must keep every fuel receipt and record the total fuel expenditure for the year. You then calculate the business-use percentage (business miles divided by total miles) and claim that percentage of total fuel costs. A fuel card can simplify this by providing a single monthly statement of all fuel purchases.',
  },
  {
    question: 'Can I claim for using my home as an office?',
    answer:
      'Yes. If you use part of your home for business purposes -- for example, a room where you do admin, produce certificates, manage your accounts, or store tools and materials -- you can claim a proportion of your household costs. HMRC offers a simplified flat-rate deduction: GBP 10 per month if you work from home 25-50 hours per month, GBP 18 per month for 51-100 hours, and GBP 26 per month for 101+ hours. Alternatively, you can calculate the actual business proportion of your rent or mortgage interest, council tax, electricity, gas, water, and internet. The actual-cost method usually gives a larger deduction but requires more detailed record keeping. Most sole-trader electricians use the simplified method for convenience.',
  },
];

const features = [
  {
    icon: Camera,
    title: 'Receipt Scanner',
    description:
      'Snap a photo of any receipt on site and it is captured, dated, and categorised automatically. No more losing paper receipts or forgetting to record expenses.',
  },
  {
    icon: Car,
    title: 'Mileage Tracker',
    description:
      'Log business miles with start and end readings, or let GPS track your journeys automatically. Calculates your mileage deduction at 45p or 25p per mile.',
  },
  {
    icon: FolderOpen,
    title: 'HMRC Categories',
    description:
      'Every expense is categorised according to HMRC allowable expense categories -- materials, tools, vehicle costs, insurance, training, and more. Ready for Self Assessment.',
  },
  {
    icon: TrendingUp,
    title: 'Running Tax Estimate',
    description:
      'See your estimated tax liability in real time as you log expenses throughout the year. No more nasty surprises at Self Assessment time.',
  },
  {
    icon: FileText,
    title: 'Export for Accountant',
    description:
      'Export your complete expense records as a CSV, PDF, or direct sync to Xero and QuickBooks. Your accountant gets clean, categorised data with no gaps.',
  },
  {
    icon: ShieldCheck,
    title: 'MTD Ready',
    description:
      'Designed for Making Tax Digital compliance. Real-time digital record keeping, quarterly-ready reporting, and HMRC-compatible data formats.',
  },
];

const sections = [
  {
    id: 'why-track-expenses',
    heading: 'Why Expense Tracking Matters for Electricians',
    content: (
      <>
        <p>
          Every pound you spend on legitimate business expenses reduces your taxable profit. If you
          are a basic-rate taxpayer, every missed expense costs you 29p in unnecessary tax (20%
          Income Tax plus 9% Class 4 National Insurance). If you are a higher-rate taxpayer, the
          cost rises to 42p per pound. Over a year, the typical self-employed electrician has GBP
          8,000 to GBP 15,000 in deductible expenses -- missing even 10% of these means paying GBP
          230 to GBP 630 more tax than you need to.
        </p>
        <p>
          The problem is not that electricians do not know expenses are deductible. The problem is
          that capturing them is inconvenient. You buy materials at the wholesaler and stuff the
          receipt in your van door pocket. You fill up with fuel and the receipt goes in your
          wallet. You pay for parking and forget to record it. By the time your accountant asks for
          your records at year-end, half the receipts have faded, a quarter are lost, and you cannot
          remember what the rest were for.
        </p>
        <p>
          <strong className="text-yellow-400">
            The solution is simple: record expenses as they happen.
          </strong>{' '}
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/expenses-manager-electrician">
            Expenses Manager
          </SEOInternalLink>{' '}
          lets you snap a receipt photo, enter the amount, select the category, and link it to a job
          -- all in under 30 seconds, on your phone, on site. The expense is stored securely in the
          cloud, categorised for HMRC, and synced to your accounting software. No paper, no
          shoeboxes, no year-end panic.
        </p>
        <p>
          For electricians running their own business, expense tracking is not just about tax
          savings. It also feeds into{' '}
          <SEOInternalLink href="/tools/job-profitability-calculator">
            job profitability calculations
          </SEOInternalLink>
          , helping you understand which jobs make money and which eat into your margins. When you
          know that a rewire consumed GBP 1,800 in materials rather than the GBP 1,500 you quoted,
          you can adjust your pricing for the next one.
        </p>
      </>
    ),
  },
  {
    id: 'hmrc-categories',
    heading: 'HMRC Allowable Expense Categories for Electricians',
    content: (
      <>
        <p>
          HMRC allows self-employed individuals to deduct expenses that are incurred wholly and
          exclusively for business purposes. For electricians, the main allowable categories are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Key Deductible Expense Categories</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Materials and stock:</strong> Cable, accessories, consumer units, MCBs,
                RCBOs, SPDs, trunking, conduit, fixings, fire hoods, labels, and all other materials
                purchased for jobs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Tools and equipment:</strong> Hand tools, power tools, test instruments,
                ladders, access equipment, and calibration costs. Covered by Annual Investment
                Allowance for larger items.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Vehicle costs:</strong> Either HMRC mileage rates (45p/25p) or actual costs
                including fuel, insurance, servicing, MOT, road tax, finance, and depreciation.
                Choose one method per vehicle.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Insurance:</strong> Public liability, professional indemnity, employers
                liability, tool and equipment cover, commercial van insurance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Professional fees:</strong> Certification body membership (NICEIC, NAPIT,
                ELECSA), accountancy fees, legal costs, and subscription fees for business software.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Training and CPD:</strong> 18th Edition updates, 2391 courses, AM2,
                manufacturer training, and any course that maintains or improves your existing
                skills.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate pre-populates these categories so you do not have to guess which HMRC category
          each expense falls into. When you buy materials, select "Materials" and it is coded
          correctly. When you pay for insurance, select "Insurance" and it maps to the right line on
          your Self Assessment return.
        </p>
        <SEOAppBridge
          title="Automatic Expense Categorisation"
          description="Every expense you log is automatically categorised for HMRC. Materials, tools, vehicle, insurance, training, professional fees -- all mapped to the correct Self Assessment lines. Export directly to your accountant or sync to Xero and QuickBooks."
          icon={FolderOpen}
        />
      </>
    ),
  },
  {
    id: 'mileage-tracking',
    heading: 'Mileage Tracking for Electricians',
    content: (
      <>
        <p>
          Vehicle expenses are typically the second-largest business cost for electricians after
          materials. Whether you use HMRC mileage rates or claim actual vehicle costs, accurate
          mileage records are essential.
        </p>
        <p>
          <strong className="text-yellow-400">HMRC simplified mileage rates</strong> are the easier
          option. You record every business journey (date, start mileage, end mileage, destination,
          and reason for the trip) and claim 45p per mile for the first 10,000 business miles in the
          tax year, and 25p per mile after that. For an electrician driving 15,000 business miles
          per year, the mileage deduction is GBP 5,750 (10,000 times 45p plus 5,000 times 25p). At
          basic-rate tax, that saves GBP 1,668 in tax.
        </p>
        <p>
          <strong className="text-yellow-400">Actual vehicle costs</strong> may give a larger
          deduction if you drive a newer van with high finance payments. You claim the business-use
          proportion of total vehicle costs: fuel, insurance, servicing, MOT, road tax, finance or
          lease payments, breakdown cover, and depreciation (or capital allowances). If your van
          costs GBP 8,000 per year to run and 80% of your mileage is business use, you claim GBP
          6,400. Elec-Mate calculates both methods and shows you which produces the larger
          deduction.
        </p>
        <p>
          The key requirement is a contemporaneous mileage log -- a record made at the time of each
          journey, not reconstructed from memory months later. HMRC can ask to see your mileage log
          during an investigation, and a log created after the fact is unlikely to be accepted.
          Elec-Mate's mileage tracker records each journey as you make it, with optional GPS
          tracking for automatic route recording.
        </p>
        <SEOAppBridge
          title="Mileage Tracker with GPS"
          description="Log every business journey with a tap. Record manually with start and end odometer readings, or enable GPS tracking to capture routes automatically. Elec-Mate calculates your deduction at 45p or 25p per mile and compares against actual vehicle costs."
          icon={Car}
        />
      </>
    ),
  },
  {
    id: 'materials-and-tools',
    heading: 'Tracking Materials and Tool Expenses',
    content: (
      <>
        <p>
          Materials purchased for jobs are a direct business expense and fully deductible against
          your income. The key is recording them accurately and linking them to specific jobs, which
          serves two purposes: it ensures you claim the deduction for tax, and it shows you the true
          profitability of each job.
        </p>
        <p>
          When you visit the wholesaler, snap the receipt before you even leave the car park. Open
          Elec-Mate, tap "Add Expense", photograph the receipt, enter the total, select "Materials"
          as the category, and link it to the relevant job. The whole process takes less than 30
          seconds. If you pay on a trade account, you can also photograph the monthly statement and
          reconcile all purchases at once.
        </p>
        <p>
          <strong className="text-yellow-400">Tool expenses</strong> work slightly differently
          depending on the cost. Small tools (screwdrivers, side cutters, drill bits) are claimed as
          a revenue expense in the year of purchase. Larger items -- a{' '}
          <SEOInternalLink href="/guides/electrician-tool-list-uk">
            multifunction tester
          </SEOInternalLink>
          , an SDS drill, or a van -- may be claimed through capital allowances. Under the Annual
          Investment Allowance (AIA), you can claim 100% of qualifying capital expenditure up to GBP
          1 million per year, so in practice most electricians claim the full cost immediately.
        </p>
        <p>
          Do not forget to claim for calibration of test instruments -- this is a revenue expense,
          typically GBP 50 to GBP 120 per instrument, and many electricians overlook it. Similarly,
          replacement batteries, test leads, and accessories for your instruments are all
          deductible.
        </p>
      </>
    ),
  },
  {
    id: 'receipt-management',
    heading: 'Digital Receipt Management',
    content: (
      <>
        <p>
          Paper receipts are the enemy of good expense tracking. They fade in sunlight, smudge in
          your pocket, get lost in the van, and end up in an unorganised heap at year-end. HMRC
          accepts digital copies of receipts as valid evidence, so there is no reason to rely on
          paper.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Best Practice for Receipt Management
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Photograph immediately:</strong> Snap the receipt the moment you receive it.
                Do not wait until you get home -- it will be lost or forgotten by then.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FolderOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Categorise at capture:</strong> Select the correct HMRC category when you
                photograph the receipt. Sorting hundreds of uncategorised receipts at year-end is
                miserable work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Link to jobs:</strong> Tag each expense with the relevant job so you can
                track job-level profitability and provide your accountant with a clear breakdown.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Cloud backup:</strong> Ensure your receipt images are backed up to the
                cloud. If your phone is lost or damaged, your records must survive.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate stores every receipt image securely in the cloud, linked to the expense record,
          the job, and the HMRC category. You can search by date, category, job, or amount. When
          your accountant needs your records, export them as a PDF report with receipt images
          attached, or sync directly to Xero or QuickBooks.
        </p>
      </>
    ),
  },
  {
    id: 'tax-savings',
    heading: 'How Proper Expense Tracking Saves You Tax',
    content: (
      <>
        <p>
          The maths is straightforward. Every deductible expense reduces your taxable profit. At the
          basic rate, you save 29p in tax for every GBP 1 of allowable expenses (20% Income Tax plus
          9% Class 4 NI). At the higher rate, you save 42p per pound.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Example: Annual Tax Savings</h3>
          <p className="text-white mb-3">
            A sole-trader electrician with GBP 55,000 turnover and the following expenses:
          </p>
          <ul className="space-y-2 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">Materials: GBP 8,000</span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">Vehicle (mileage at 15,000 miles): GBP 5,750</span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">Insurance: GBP 1,200</span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">Tools and calibration: GBP 800</span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                Training, phone, software, accountancy: GBP 2,250
              </span>
            </li>
          </ul>
          <p className="text-white mt-4 font-semibold">
            Total deductible expenses: GBP 18,000. Tax saving at basic rate: GBP 5,220. Missing just
            10% of these expenses costs you GBP 522 in extra tax.
          </p>
        </div>
        <p>
          Many electricians also miss smaller deductions that add up: parking (GBP 300-GBP 500 per
          year), workwear and PPE (GBP 100-GBP 300), stationery and printing (GBP 50-GBP 100),
          use-of-home allowance (GBP 120-GBP 312), and business bank account fees. Individually
          small, collectively significant. See our{' '}
          <SEOInternalLink href="/tools/cash-flow-planner">cash flow planner</SEOInternalLink> for
          managing the timing of these payments alongside your income.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/tools/cash-flow-planner',
    title: 'Cash Flow Planner',
    description: 'Forecast your cash position and spot shortfalls before they become crises.',
    icon: TrendingUp,
    category: 'Business Tool',
  },
  {
    href: '/tools/job-profitability-calculator',
    title: 'Job Profitability Calculator',
    description:
      'Calculate true profit margins on every job including materials, labour, and overheads.',
    icon: BarChart3,
    category: 'Business Tool',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description: 'AI-powered cost estimation and professional PDF quotes for electrical work.',
    icon: FileText,
    category: 'Business Tool',
  },
  {
    href: '/tools/electrician-invoice-app',
    title: 'Invoice App',
    description:
      'Digital invoicing with Stripe payments, automatic reminders, and accounting sync.',
    icon: Receipt,
    category: 'Business Tool',
  },
  {
    href: '/guides/going-self-employed-electrician',
    title: 'Going Self-Employed',
    description: 'Complete guide to setting up as a self-employed electrician in the UK.',
    icon: Briefcase,
    category: 'Business Guide',
  },
  {
    href: '/guides/how-to-price-electrical-jobs',
    title: 'How to Price Electrical Jobs',
    description: 'Pricing methodology covering materials, labour, overheads, and profit margin.',
    icon: PoundSterling,
    category: 'Business Guide',
  },
];

export default function ExpensesManagerPage() {
  return (
    <BusinessTemplate
      title="Expenses Manager for Electricians | Track & Claim"
      description="Track mileage, materials, tools, fuel, and receipts for your electrical business. HMRC-compliant expense categories, digital receipt capture, and real-time tax estimates. Stop missing deductible expenses."
      datePublished="2025-06-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Tools"
      badgeIcon={Receipt}
      heroTitle={
        <>
          Expenses Manager <span className="text-yellow-400">for UK Electricians</span>
        </>
      }
      heroSubtitle="Track every business expense on your phone as it happens. Snap receipts, log mileage, categorise for HMRC, and see your running tax liability in real time. Stop handing money to HMRC by missing deductible expenses."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      stats={stats}
      sections={sections}
      features={features}
      featuresHeading="Expenses Manager Features"
      featuresSubheading="Purpose-built expense tracking for UK electrical businesses. Every feature designed to save you tax and save you time."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Expense Tracking"
      relatedPages={relatedPages}
      ctaHeading="Stop Missing Deductible Expenses"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to track expenses, maximise tax deductions, and keep HMRC-compliant records. 7-day free trial, cancel anytime."
      pagePath="/tools/expenses-manager-electrician"
    />
  );
}
