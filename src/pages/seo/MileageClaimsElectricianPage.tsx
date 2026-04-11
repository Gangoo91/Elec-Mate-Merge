import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Car,
  PoundSterling,
  Calculator,
  ClipboardCheck,
  FileCheck2,
  Users,
  Wrench,
  TrendingUp,
  Briefcase,
  MapPin,
  Fuel,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/how-to-get-first-electrical-customer' },
  { label: 'Mileage Claims', href: '/guides/mileage-claims-electricians' },
];

const tocItems = [
  { id: 'overview', label: 'Mileage Claims Overview' },
  { id: 'hmrc-rates', label: 'HMRC Mileage Rates 2026/27' },
  { id: 'van-vs-car', label: 'Van vs Car Rules' },
  { id: 'what-qualifies', label: 'What Travel Qualifies' },
  { id: 'workplace-rules', label: 'The Workplace Rules' },
  { id: 'record-keeping', label: 'Record Keeping Requirements' },
  { id: 'simplified-vs-actual', label: 'Simplified Expenses vs Actual Costs' },
  { id: 'ev-mileage', label: 'Electric Vehicle Mileage' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'HMRC simplified mileage rates for cars: 45p per mile for the first 10,000 business miles, then 25p per mile after that. These rates cover fuel, insurance, road tax, MOT, servicing, and depreciation — you cannot claim those costs separately if you use simplified expenses.',
  'Vans do NOT qualify for the 45p/25p simplified mileage rate. If you use a van, you must claim actual costs (fuel, insurance, road tax, repairs, depreciation) and calculate the business-use percentage.',
  'Travel from home to a permanent workplace (such as your own workshop or office) is NOT an allowable business expense. Travel from home to a customer site or temporary workplace IS allowable.',
  'You must keep a mileage log for every business journey: date, start and end locations, purpose of the journey, and miles driven. HMRC can and does request these records during enquiries.',
  'The HMRC advisory rate for electric vehicles is 7p per mile (2026/27). If you drive an EV, using actual costs with capital allowances is almost always more tax-efficient than the advisory rate.',
];

const faqs = [
  {
    question: 'Can I claim mileage from home to a customer site?',
    answer:
      'Yes — if you are self-employed and your home is your business base (which it is for most self-employed electricians), travel from home to a customer site is a business journey and the mileage is an allowable expense. This applies to each different customer site you visit. The key rule is that the site must be a temporary workplace — somewhere you attend for a specific job and then leave. If you work at the same site continuously for more than 24 months, HMRC may reclassify it as a permanent workplace, at which point travel to that site is no longer allowable.',
  },
  {
    question: 'What is the difference between simplified expenses and actual costs for a van?',
    answer:
      'Simplified expenses (the 45p/25p mileage rate) are only available for cars and motorcycles — NOT for vans. If you drive a van, you MUST use the actual costs method. This means you claim the actual amounts you spend on fuel, insurance, road tax, MOT, servicing, repairs, tyres, breakdown cover, and depreciation (or lease payments). You then calculate the percentage of total miles that were business miles and apply that percentage to the total costs. For example, if 80% of your miles are business miles and your total van running costs are £6,000, you can claim £4,800. Keep all receipts and a complete mileage log. The actual costs method often produces a larger deduction than simplified expenses, particularly for vans with high annual costs.',
  },
  {
    question: 'Do I need to keep a mileage log for every journey?',
    answer:
      'Yes. HMRC requires a contemporaneous record of every business journey. The record must include: the date, the starting point and destination, the purpose of the journey (for example, "Consumer unit upgrade at 14 Oak Road, Bristol"), and the distance in miles. You can keep this log in a notebook, a spreadsheet, or an app. The critical point is that you record each journey at the time — HMRC does not accept mileage logs reconstructed after the fact. If you are investigated and cannot produce a mileage log, HMRC may disallow your entire mileage claim, resulting in additional tax, interest, and potentially penalties.',
  },
  {
    question: 'Can I claim the 45p rate if I use my personal car for some jobs?',
    answer:
      'Yes — if you use your personal car (not a van) for business journeys, you can claim the simplified mileage rate of 45p per mile for the first 10,000 business miles and 25p per mile thereafter. This rate covers all running costs including fuel, insurance, road tax, MOT, servicing, and depreciation. You cannot claim any of these costs separately on top of the mileage rate. If you use the simplified mileage rate for a car, you must continue using it for that vehicle — you cannot switch to actual costs later. Choose whichever method gives you the larger deduction in your first year and stick with it for that vehicle.',
  },
  {
    question: 'What counts as a temporary workplace vs a permanent workplace?',
    answer:
      'A temporary workplace is a site you attend for a specific job or project and then leave. For most self-employed electricians, every customer site is a temporary workplace — you go there to do a job and then you leave. A permanent workplace is somewhere you attend regularly as part of a continuing arrangement. If you rent a workshop or office, that is a permanent workplace — travel from home to your workshop is commuting and NOT an allowable expense. The 24-month rule applies to longer projects: if you work at the same site continuously (or attend it regularly) for more than 24 months, it becomes a permanent workplace. This mainly affects electricians on long-term commercial contracts.',
  },
  {
    question: 'How much can I save with mileage claims in a year?',
    answer:
      'The tax saving depends on your total business miles and your tax rate. Example for a car: if you drive 15,000 business miles per year, your claim is (10,000 x 45p) + (5,000 x 25p) = £4,500 + £1,250 = £5,750. At the basic tax rate (20%), this saves you £1,150 in income tax plus approximately £530 in Class 4 National Insurance — a total saving of approximately £1,680. At the higher tax rate (40%), the income tax saving doubles to £2,300. For a van on actual costs, the deduction can be even larger if your running costs are high. Mileage claims are one of the most significant tax deductions available to self-employed electricians — make sure you are claiming every eligible mile.',
  },
  {
    question: 'Can I claim mileage to the electrical wholesaler?',
    answer:
      'Yes — travel to collect materials for a specific job is a business journey and the mileage is allowable. Travel to a wholesaler to collect materials for stock (not for a specific job) is also allowable as long as it is for your business. Keep a record of the journey including the purpose. If you combine a trip to the wholesaler with a customer visit, record the total business mileage for the full journey.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/how-to-get-first-electrical-customer',
    title: 'Getting Your First Customer',
    description:
      'Starting your electrical business — insurance, registration, pricing, and finding customers.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-van-setup-guide',
    title: 'Electrician Van Setup Guide',
    description:
      'Set up your van for maximum efficiency — racking, tool storage, security, and branding.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/compare/checkatrade-vs-mybuilder-vs-bark',
    title: 'Checkatrade vs MyBuilder vs Bark',
    description:
      'Compare lead generation platforms — costs, lead quality, and the right choice for your business.',
    icon: TrendingUp,
    category: 'Comparison',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Include travel costs in your quotes. Professional PDF quotes with itemised pricing.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/guides/hiring-first-employee-electrician',
    title: 'Hiring Your First Employee',
    description:
      'PAYE, pensions, and the true cost of employment — including vehicle and mileage implications.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete certificates on site and reduce unnecessary return trips. Saves time and mileage.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Mileage Claims: One of Your Biggest Tax Deductions',
    content: (
      <>
        <p>
          If you are a self-employed electrician, you likely drive 10,000 to 25,000 business miles
          per year — visiting customer sites, collecting materials from the wholesaler, attending
          training, and driving between jobs. Every one of those miles is a tax-deductible business
          expense.
        </p>
        <p>
          Many electricians either do not claim mileage at all (leaving thousands of pounds of tax
          relief on the table) or claim incorrectly (risking penalties if HMRC investigates). This
          guide explains exactly what you can claim, the correct rates, the rules for vans vs cars,
          what travel qualifies, and how to keep records that satisfy HMRC.
        </p>
        <p>
          The rules are different depending on whether you drive a car or a van, and whether you use
          simplified expenses or actual costs. Getting this right can save you £1,000 to £3,000+ per
          year in tax and National Insurance.
        </p>
      </>
    ),
  },
  {
    id: 'hmrc-rates',
    heading: 'HMRC Mileage Rates 2026/27',
    content: (
      <>
        <p>
          HMRC publishes approved mileage rates for self-employed individuals using their own
          vehicle for business. These are the rates for the 2026/27 tax year:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-3 text-white text-sm">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <Car className="w-4 h-4 text-blue-400" /> Cars
              </h4>
              <ul className="space-y-2">
                <li>
                  First 10,000 miles: <strong className="text-yellow-400">45p per mile</strong>
                </li>
                <li>
                  After 10,000 miles: <strong className="text-yellow-400">25p per mile</strong>
                </li>
                <li className="text-white text-xs mt-2">
                  Covers fuel, insurance, road tax, MOT, servicing, depreciation
                </li>
              </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <Fuel className="w-4 h-4 text-green-400" /> Vans
              </h4>
              <ul className="space-y-2">
                <li>
                  Simplified rate: <strong className="text-yellow-400">NOT available</strong>
                </li>
                <li>
                  Must use: <strong className="text-yellow-400">Actual costs</strong>
                </li>
                <li className="text-white text-xs mt-2">
                  Claim real costs x business-use percentage
                </li>
              </ul>
            </div>
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" /> Electric Vehicles
              </h4>
              <ul className="space-y-2">
                <li>
                  Advisory fuel rate: <strong className="text-yellow-400">7p per mile</strong>
                </li>
                <li>
                  Or use: <strong className="text-yellow-400">Actual costs</strong>
                </li>
                <li className="text-white text-xs mt-2">
                  Actual costs with capital allowances usually better
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          <strong>Important:</strong> The 45p/25p rate is a "simplified expense" — it replaces
          claiming actual running costs. If you use simplified mileage, you cannot also claim fuel,
          insurance, road tax, or any other vehicle running cost. You choose one method or the other
          for each vehicle, and once chosen, you must continue with that method for that vehicle.
        </p>
      </>
    ),
  },
  {
    id: 'van-vs-car',
    heading: 'Van vs Car: Different Rules Apply',
    content: (
      <>
        <p>
          This is where many electricians get caught out. HMRC treats cars and vans differently for
          mileage purposes.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Cars: Simplified Expenses</h3>
            <p className="text-white text-sm leading-relaxed">
              If you use a car for business, you can claim the simplified mileage rate (45p/25p).
              This is straightforward: multiply your business miles by the rate, and that is your
              deduction. No need to keep fuel receipts, insurance documents, or service records for
              tax purposes (though you should still keep them for your own records). The downside is
              that you cannot claim capital allowances on the vehicle purchase price — the mileage
              rate is deemed to include depreciation.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Vans: Actual Costs Only</h3>
            <p className="text-white text-sm leading-relaxed">
              If you use a van, you MUST claim actual costs. Add up all your van running costs for
              the year: fuel, insurance, road tax, MOT, servicing, repairs, tyres, breakdown cover,
              parking, tolls, and either capital allowances on the purchase price or lease payments.
              Calculate the percentage of your total miles that are business miles (for example,
              15,000 business miles out of 18,000 total = 83%). Apply that percentage to your total
              costs. Keep every receipt and a complete mileage log.
            </p>
          </div>
        </div>
        <p>
          <strong>Why the difference?</strong> HMRC classifies vehicles by type. A van is defined as
          a goods vehicle with a design weight not exceeding 3,500kg — this includes all standard
          panel vans used by electricians (Transit Custom, Vivaro, etc.). The simplified mileage
          rates were designed for cars used partly for business, not for commercial vehicles.
        </p>
      </>
    ),
  },
  {
    id: 'what-qualifies',
    heading: 'What Travel Qualifies as a Business Journey',
    content: (
      <>
        <p>
          Not every journey in your vehicle is a business journey. Understanding the rules prevents
          overclaiming (which can result in penalties) and underclaiming (which costs you money).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Allowable:</strong> Home to customer site, customer site to customer site,
                home/site to electrical wholesaler, travel to training courses, travel to your
                accountant, travel to business meetings, travel to your competent person scheme
                assessment, travel to collect or return hire equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>NOT allowable:</strong> Home to a permanent workplace (your own workshop,
                office, or storage unit that you attend regularly), personal journeys, commuting to
                a site where you work continuously for more than 24 months.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mixed journeys:</strong> If you make a personal stop during a business
                journey (for example, dropping off children at school on the way to a customer
                site), you can still claim the business mileage — but claim the direct route
                distance, not the actual distance driven via the detour.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'workplace-rules',
    heading: 'The "Workplace" Rules: Where HMRC Draws the Line',
    content: (
      <>
        <p>
          The concept of a "workplace" is critical to mileage claims. Get this wrong and you could
          face a nasty surprise during an HMRC enquiry.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Home as business base</strong> — most self-employed electricians operate
                from home. Your home is your business base, not your permanent workplace (assuming
                you do not have a separate workshop). Travel from home to any temporary workplace
                (customer site) is therefore a business journey.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workshop or storage unit</strong> — if you rent a workshop, storage unit, or
                office that you attend regularly, that is a permanent workplace. Travel between home
                and that location is commuting and is NOT allowable. However, travel from that
                workshop to a customer site IS allowable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The 24-month rule</strong> — if you attend the same site regularly and
                expect to do so for more than 24 months, HMRC considers it a permanent workplace
                from the start. This mainly affects electricians on long-term maintenance contracts
                or commercial projects. Once the 24-month threshold is breached (or is expected to
                be breached), travel to that site is no longer allowable.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'record-keeping',
    heading: 'Record Keeping: What HMRC Requires',
    content: (
      <>
        <p>
          HMRC requires contemporaneous records — meaning you record each journey at or around the
          time it happens, not at the end of the year from memory. If you cannot produce records
          during an enquiry, HMRC can disallow your entire mileage claim.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>For every business journey, record:</strong> the date, starting point (for
                example, "Home"), destination (for example, "14 Oak Road, Bristol — consumer unit
                upgrade"), miles driven, and the purpose of the journey. A simple spreadsheet,
                notebook, or mileage tracking app is sufficient.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>For actual costs (vans):</strong> keep all fuel receipts, insurance renewal
                documents, road tax confirmation, MOT certificate, service and repair invoices, tyre
                receipts, breakdown cover confirmation, and the vehicle purchase invoice or lease
                agreement. Record your total annual mileage (business + personal) from odometer
                readings at the start and end of the tax year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retention period:</strong> HMRC requires you to keep records for at least 5
                years after the 31 January filing deadline for the relevant tax year. For the
                2026/27 tax year (filed by 31 January 2028), keep records until at least 31 January
                2033.
              </span>
            </li>
          </ul>
        </div>
        <p>
          <strong>Mileage tracking apps</strong> such as MileIQ, Driversnote, and HMRC's own
          receipts app can automate much of this. GPS-based apps record journeys automatically — you
          just need to classify each one as business or personal. The monthly cost (typically £5 to
          £10) is itself a tax-deductible business expense.
        </p>
      </>
    ),
  },
  {
    id: 'simplified-vs-actual',
    heading: 'Simplified Expenses vs Actual Costs: Which Is Better?',
    content: (
      <>
        <p>
          If you use a car (not a van), you have a choice: simplified mileage rate or actual costs.
          The right answer depends on your circumstances.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Choose Simplified (45p/25p) If:</h3>
            <p className="text-white text-sm leading-relaxed">
              You drive a car (not a van). Your vehicle running costs are relatively low. You want
              simple record keeping — just a mileage log, no fuel receipts. You drive fewer than
              15,000 business miles per year. Your car is relatively inexpensive. You do not want to
              track every single vehicle expense.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Choose Actual Costs If:</h3>
            <p className="text-white text-sm leading-relaxed">
              You drive a van (you have no choice — actual costs only). Your vehicle running costs
              are high (expensive car, high fuel consumption, frequent repairs). You have recently
              purchased or financed the vehicle and can claim capital allowances. Your business-use
              percentage is very high (80%+). You are comfortable keeping detailed records and
              receipts.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Example Comparison</h3>
          <div className="grid gap-4 sm:grid-cols-2 text-white text-sm">
            <div>
              <p className="font-bold mb-2">Simplified (Car, 15,000 business miles)</p>
              <p>(10,000 x 45p) + (5,000 x 25p)</p>
              <p>= £4,500 + £1,250</p>
              <p className="font-bold text-yellow-400">= £5,750 deduction</p>
            </div>
            <div>
              <p className="font-bold mb-2">Actual Costs (Van, 15,000 of 18,000 total miles)</p>
              <p>Total costs: £7,200/year</p>
              <p>Business %: 83%</p>
              <p>Capital allowance: £2,000</p>
              <p className="font-bold text-yellow-400">= £7,976 deduction</p>
            </div>
          </div>
        </div>
        <p>
          In this example, actual costs produce a larger deduction — which is typical for vans with
          high running costs. Ask your accountant to calculate both methods in your first year to
          determine which is more beneficial. Remember: once you choose simplified mileage for a
          car, you cannot switch to actual costs for that vehicle later.
        </p>
      </>
    ),
  },
  {
    id: 'ev-mileage',
    heading: 'Electric Vehicle Mileage Rates',
    content: (
      <>
        <p>
          Electric vehicles are increasingly popular among electricians — the fuel savings are
          significant, and there is a natural alignment between installing EV chargers and driving
          an EV yourself. The tax treatment for EVs is also favourable.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Advisory electricity rate</strong> — HMRC's advisory fuel rate for fully
                electric vehicles is 7p per mile (2026/27). This is used when an employer reimburses
                an employee for business mileage in a company electric car. For self-employed
                individuals, it provides a reference point but you are not limited to it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simplified mileage for EVs</strong> — if you use the simplified mileage rate
                (45p/25p) for an electric car, the full rate applies — the same as a petrol or
                diesel car. At 45p per mile with near-zero running costs, this can be extremely
                advantageous for the first 10,000 business miles.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Actual costs for electric vans</strong> — if you drive an electric van, you
                claim actual costs (fuel/electricity, insurance, etc.) plus capital allowances. New
                electric vans qualify for 100% first-year allowances — you can deduct the full
                purchase price against your profits in the year of purchase, which is a substantial
                tax benefit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Home charging costs</strong> — if you charge your EV at home for business
                use, the electricity cost is an allowable business expense (proportioned by business
                use). You can use a smart plug or dedicated EV charger with energy monitoring to
                track the amount of electricity used for business charging.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For most self-employed electricians buying a new electric van, the combination of 100%
          first-year capital allowance, low running costs, and actual costs deduction makes an EV
          one of the most tax-efficient vehicles you can operate.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Keep More of What You Earn',
    content: (
      <>
        <p>
          Mileage claims are one of the easiest ways to reduce your tax bill — but only if you keep
          proper records. Here is how to make it effortless.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Track Every Journey</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use a mileage tracking app or a simple spreadsheet. Record every business journey
                  on the day it happens. Five minutes per day saves you thousands at tax time and
                  protects you in an HMRC enquiry.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Include Travel in Your Quotes</h4>
                <p className="text-white text-sm leading-relaxed">
                  Factor travel time and costs into your job pricing. Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to build travel into your quotes transparently.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certify on Site, Save Trips</h4>
                <p className="text-white text-sm leading-relaxed">
                  Completing{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    certificates on site
                  </SEOInternalLink>{' '}
                  means fewer return trips to hand over paperwork. Every trip saved is mileage saved
                  — and time you can spend on the next paid job.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage your jobs and reduce unnecessary travel"
          description="Elec-Mate helps you quote, certify, and manage jobs from your phone — reducing paperwork trips and putting more money in your pocket. 7-day free trial."
          icon={Car}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MileageClaimsElectricianPage() {
  return (
    <GuideTemplate
      title="Mileage Claims for Electricians UK 2026 | Tax Guide"
      description="Complete guide to mileage claims for self-employed electricians. HMRC rates (45p/25p), van vs car rules, what travel qualifies, record keeping, simplified expenses vs actual costs, and EV mileage rates."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Tax Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Mileage Claims for Electricians UK 2026:{' '}
          <span className="text-yellow-400">Claim Every Mile, Keep More Money</span>
        </>
      }
      heroSubtitle="Most self-employed electricians drive 10,000 to 25,000 business miles per year. Claiming mileage correctly can save you £1,000 to £3,000+ in tax annually. This guide covers HMRC rates, van vs car rules, what qualifies as business travel, record keeping, and EV mileage."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Mileage Claims"
      relatedPages={relatedPages}
      ctaHeading="Save Time and Mileage with On-Site Tools"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for quoting, certification, and job management. Complete everything on site, reduce return trips, and keep more of what you earn. 7-day free trial, cancel anytime."
    />
  );
}
