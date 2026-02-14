import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  PoundSterling,
  Calculator,
  FileText,
  Receipt,
  TrendingUp,
  Brain,
  Zap,
  BarChart3,
} from 'lucide-react';

export default function HowToPriceElectricalJobsPage() {
  return (
    <GuideTemplate
      title="How to Price Electrical Jobs UK 2026 | Pricing Guide"
      description="Complete guide to pricing electrical work in the UK. Covers day rates, fixed prices, per-point pricing, cost-plus, hourly rate calculation, material markup, common job prices, quoting tips, and payment terms for electricians."
      datePublished="2026-01-20"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'How to Price Electrical Jobs', href: '/guides/how-to-price-electrical-jobs' },
      ]}
      tocItems={[
        { id: 'pricing-methods', label: 'Pricing Methods' },
        { id: 'calculating-your-hourly-rate', label: 'Calculating Your Hourly Rate' },
        { id: 'material-markup', label: 'Material Markup' },
        { id: 'common-job-prices', label: 'Common Job Prices 2026' },
        { id: 'quoting-tips', label: 'Quoting Tips That Win Work' },
        { id: 'when-to-walk-away', label: 'When to Walk Away' },
        { id: 'payment-terms', label: 'Payment Terms and Deposits' },
        { id: 'tracking-profitability', label: 'Tracking Job Profitability' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Business Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          How to <span className="text-yellow-400">Price Electrical Jobs</span> UK — The 2026
          Pricing Guide
        </>
      }
      heroSubtitle="Getting your pricing right is the difference between a profitable electrical business and one that struggles. This guide covers every pricing method used by UK electricians, how to calculate your true hourly rate including overheads, material markup strategies, typical prices for common jobs in 2026, and practical tips for writing quotes that win work without leaving money on the table."
      readingTime={22}
      keyTakeaways={[
        'Your hourly rate must cover all overheads (van, tools, insurance, certification, fuel, phone, software, accountant) plus profit — not just your desired take-home pay.',
        'Fixed-price quoting wins more work than day rates for domestic customers because it removes uncertainty — but you must be accurate or you will lose money.',
        'Material markup of 15-25% on trade prices is standard in the UK electrical trade and covers your time sourcing, collecting, storing, and guaranteeing materials.',
        'Common 2026 prices: socket install £80-£150, consumer unit change £500-£1,200, full rewire £3,500-£10,000, EICR £150-£300 — but prices vary hugely by region and complexity.',
        'Always take a deposit (typically 30-50% for jobs over £500) and never start large jobs without a signed quote and deposit cleared.',
      ]}
      sections={[
        {
          id: 'pricing-methods',
          heading: 'Pricing Methods for Electrical Work',
          content: (
            <>
              <p>
                There are four main pricing methods used by UK electricians. Each has advantages and
                disadvantages, and most successful electricians use a combination depending on the
                type of work.
              </p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Day Rate</h3>
              <p>
                Charging a daily rate (typically £250-£450 per day in 2026 depending on region and
                experience) is simple and ensures you are paid for your time. Day rates work well
                for commercial work, ongoing contracts, and jobs where the scope is unclear upfront.
                However, domestic customers generally dislike day rates because they have no idea
                what the final bill will be. Day rates also penalise efficiency — the faster you
                work, the less you earn.
              </p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Fixed Price</h3>
              <p>
                Fixed-price quoting is the standard for domestic work and most one-off commercial
                jobs. You assess the job, calculate your costs (materials + labour + overheads +
                profit), and quote a single price for the complete job. The customer knows exactly
                what they will pay, which makes them more likely to accept the quote. The risk is
                yours — if the job takes longer than expected or you encounter unforeseen problems,
                you absorb the extra cost. This is why accurate estimation is critical.
              </p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Per-Point Pricing</h3>
              <p>
                Per-point pricing charges a fixed amount for each electrical point (socket, light,
                switch, spur). This is common for rewires and first-fix new builds. Typical
                per-point rates in 2026 are £80-£120 for a socket, £60-£100 for a light point, and
                £50-£80 for a switch — but these vary significantly by region and include the cable
                run back to the board. Per-point pricing is easy for both you and the customer to
                understand, but it can be unprofitable if cable runs are unusually long or access is
                difficult.
              </p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Cost-Plus</h3>
              <p>
                Cost-plus pricing (also called "time and materials" or "T&M") charges the customer
                for actual materials used plus your hourly rate plus an agreed markup or management
                fee. This works well for jobs where the scope genuinely cannot be determined in
                advance — fault finding, remedial work after a fire or flood, or complex commercial
                refurbishments. It removes your risk but requires careful record keeping and client
                trust. Always agree a budget ceiling with cost-plus work.
              </p>
            </>
          ),
        },
        {
          id: 'calculating-your-hourly-rate',
          heading: 'Calculating Your True Hourly Rate',
          content: (
            <>
              <p>
                Most new electricians make the same mistake: they decide they want to earn £30-£40
                per hour and use that as their rate. This ignores overheads, which are the real
                costs of running a business. Your hourly rate must cover everything, not just your
                take-home pay.
              </p>
              <p>Here is how to calculate your true hourly rate:</p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">
                Step 1: Calculate Your Annual Overheads
              </h3>
              <p>Add up every business cost for the year:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Van (lease, insurance, fuel, maintenance, MOT): £6,000-£12,000</li>
                <li>Tools and equipment (replacement and calibration): £1,000-£3,000</li>
                <li>
                  Insurance (public liability, professional indemnity, employers if applicable):
                  £800-£2,000
                </li>
                <li>Competent person scheme registration (NAPIT, NICEIC, etc.): £400-£800</li>
                <li>
                  Software and subscriptions (certification app, accounting, etc.): £500-£1,500
                </li>
                <li>Accountant fees: £500-£1,500</li>
                <li>Phone and data: £500-£800</li>
                <li>Workwear and PPE: £200-£500</li>
                <li>Training and CPD: £300-£1,000</li>
                <li>Marketing and website: £500-£2,000</li>
                <li>Office/storage costs: £0-£3,000</li>
              </ul>
              <p className="mt-4">
                A typical sole trader electrician's annual overheads are £12,000-£25,000 per year.
              </p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">
                Step 2: Calculate Your Available Billable Hours
              </h3>
              <p>
                You do not bill for 8 hours a day, 5 days a week, 52 weeks a year. Subtract holidays
                (5-6 weeks), sickness (1-2 weeks), admin time (quoting, invoicing, purchasing,
                travelling between jobs), and quiet periods. A realistic figure for a busy sole
                trader is 1,200-1,500 billable hours per year.
              </p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Step 3: Do the Maths</h3>
              <p>
                (Target salary + Annual overheads + Tax and NI provision) / Billable hours =
                Required hourly rate.
              </p>
              <p>
                Example: (£45,000 salary + £18,000 overheads + £12,000 tax/NI) / 1,400 hours =
                £53.57 per hour. That is your minimum rate — charge less and you are losing money.
              </p>

              <SEOAppBridge
                title="Hourly Rate Calculator — Know Your True Cost"
                description="Enter your target salary, overheads, and working hours. Elec-Mate calculates the hourly rate you need to charge to actually make the money you want after all costs and tax."
                icon={Calculator}
              />
            </>
          ),
        },
        {
          id: 'material-markup',
          heading: 'Material Markup',
          content: (
            <>
              <p>
                Material markup is not "ripping the customer off." It is compensation for your time
                and expertise in selecting the right materials, sourcing them from wholesalers,
                collecting or arranging delivery, storing them securely, and guaranteeing them as
                part of your installation warranty.
              </p>
              <p>
                The standard material markup in the UK electrical trade is 15-25% on trade prices.
                If you buy a consumer unit for £200 trade, you charge the customer £230-£250. If you
                buy cable for £80, you charge £92-£100. Some electricians mark up higher on small
                sundries (screws, grommets, earth sleeving, cable clips) because the time spent
                sourcing these items is disproportionate to their cost.
              </p>
              <p>There are two approaches to showing materials on a quote:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Itemised</span> — list every material
                  with a price. Some customers appreciate the transparency, but it also invites
                  price-checking and pushback. If the customer can buy the same consumer unit on
                  Amazon for £20 less than your price, they will ask why.
                </li>
                <li>
                  <span className="font-semibold text-white">Bundled</span> — quote a single price
                  for the complete job including all materials. This is simpler and avoids material
                  price negotiations. Most experienced electricians prefer this approach for
                  domestic work.
                </li>
              </ul>
              <p>
                Elec-Mate's{' '}
                <SEOInternalLink href="/tools/ai-cost-engineer">AI Cost Engineer</SEOInternalLink>{' '}
                lets you choose either approach. The AI generates a full itemised breakdown with
                trade prices and your chosen markup for your records, and you decide whether the
                customer sees the itemised version or a bundled price.
              </p>
            </>
          ),
        },
        {
          id: 'common-job-prices',
          heading: 'Common Job Prices in 2026',
          content: (
            <>
              <p>
                These are typical prices for common electrical jobs across the UK in 2026. Prices
                vary significantly by region (London and the South East are typically 20-40% higher
                than the Midlands and North), complexity, property type, and access conditions.
              </p>

              <div className="overflow-x-auto my-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="py-3 pr-4 text-white font-bold">Job</th>
                      <th className="py-3 pr-4 text-white font-bold">Typical Price Range</th>
                      <th className="py-3 text-white font-bold">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Additional socket</td>
                      <td className="py-3 pr-4">£80-£150</td>
                      <td className="py-3">Spur from existing ring. Surface or flush.</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Additional light point</td>
                      <td className="py-3 pr-4">£100-£200</td>
                      <td className="py-3">Includes switch. More for recessed downlights.</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Consumer unit change</td>
                      <td className="py-3 pr-4">£500-£1,200</td>
                      <td className="py-3">
                        Dual RCD or RCBO board. Includes EIC and notification.
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Full rewire (3-bed semi)</td>
                      <td className="py-3 pr-4">£3,500-£6,000</td>
                      <td className="py-3">
                        First and second fix, new CU, EIC. Excludes making good.
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Full rewire (4-bed detached)</td>
                      <td className="py-3 pr-4">£5,000-£10,000</td>
                      <td className="py-3">Larger property, more circuits, potentially 3-phase.</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">EICR (domestic)</td>
                      <td className="py-3 pr-4">£150-£300</td>
                      <td className="py-3">Depending on number of circuits and property size.</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">EV charger installation</td>
                      <td className="py-3 pr-4">£800-£1,500</td>
                      <td className="py-3">
                        Including charger unit, cable run, and EIC. Excludes OZEV grant.
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Electric shower install</td>
                      <td className="py-3 pr-4">£250-£500</td>
                      <td className="py-3">Electrical connection only. New cable run from CU.</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Outdoor socket</td>
                      <td className="py-3 pr-4">£120-£250</td>
                      <td className="py-3">
                        IP66 rated, RCD protected, from nearest circuit or new circuit.
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Fault finding (per hour)</td>
                      <td className="py-3 pr-4">£60-£90</td>
                      <td className="py-3">Charge separately from repair. Minimum 1 hour.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                These prices are guides only. Your prices should be based on your own hourly rate
                calculation, not on what others charge. If your overheads are higher (a new van on
                finance, for example), your prices need to be higher to maintain profitability.
              </p>

              <SEOAppBridge
                title="AI Cost Engineer — Accurate Job Pricing in Seconds"
                description="Describe any electrical job and the AI generates an itemised estimate with current UK trade pricing, realistic labour hours, and your profit margin applied. Stop guessing, start knowing."
                icon={Brain}
              />
            </>
          ),
        },
        {
          id: 'quoting-tips',
          heading: 'Quoting Tips That Win Work',
          content: (
            <>
              <p>
                Writing a good quote is a sales skill. The cheapest quote does not always win — in
                fact, suspiciously cheap quotes often lose because the customer assumes you are
                cutting corners. Here is how to write quotes that win work at a profitable price:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Respond quickly</span> — the first
                  electrician to quote often wins the job. Aim to quote within 24 hours of the site
                  visit. AI cost estimation tools make same-day quoting realistic even for complex
                  jobs.
                </li>
                <li>
                  <span className="font-semibold text-white">Be specific about scope</span> — list
                  exactly what is included and what is not. "Full rewire including 12 circuits, new
                  18th Edition consumer unit with SPD, all first and second fix, EIC and building
                  control notification. Excludes making good of plaster and decoration." This
                  prevents disputes later.
                </li>
                <li>
                  <span className="font-semibold text-white">Look professional</span> — a branded
                  PDF quote with your logo, company details, and clear formatting beats a text
                  message or handwritten note. It signals professionalism and builds trust.
                </li>
                <li>
                  <span className="font-semibold text-white">Explain the value</span> — do not just
                  list what you will do; explain why. "We will install a Type 2 SPD (surge
                  protection device) as recommended by BS 7671 to protect your electronics from
                  voltage surges." Customers who understand the value are less likely to shop around
                  on price.
                </li>
                <li>
                  <span className="font-semibold text-white">Include your credentials</span> — list
                  your competent person scheme registration, qualifications, and insurance on the
                  quote. This differentiates you from unregistered "part-timers" who quote lower.
                </li>
                <li>
                  <span className="font-semibold text-white">Follow up</span> — if you have not
                  heard back within a week, send a polite follow-up. Many customers fully intend to
                  accept your quote but simply forget to reply.
                </li>
              </ul>

              <SEOAppBridge
                title="Professional PDF Quotes — Sent From Site in Minutes"
                description="Elec-Mate's quoting app generates branded PDF quotes with your logo, itemised pricing, scope of works, and terms. Send to the client with one tap. They can view and accept online."
                icon={FileText}
              />
            </>
          ),
        },
        {
          id: 'when-to-walk-away',
          heading: 'When to Walk Away',
          content: (
            <>
              <p>
                Not every job is worth quoting. Knowing when to walk away from a job — or a customer
                — is an important business skill that many electricians learn the hard way. Walk
                away when:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">
                    The customer is shopping purely on price
                  </span>{' '}
                  — if the first and only question is "how much?", the customer will always pick the
                  cheapest quote regardless of quality. You will be undercut by someone willing to
                  work at a loss, and the customer will blame you if anything goes wrong anyway.
                </li>
                <li>
                  <span className="font-semibold text-white">The scope keeps changing</span> —
                  "while you are here, can you also..." is fine for small additions, but if the
                  customer is constantly expanding the scope without accepting the additional cost,
                  the job will be unprofitable.
                </li>
                <li>
                  <span className="font-semibold text-white">Access is unreasonable</span> — a job
                  that requires working in a filthy, infested, or structurally unsafe environment is
                  not worth any price. Your health and safety is non-negotiable.
                </li>
                <li>
                  <span className="font-semibold text-white">
                    The existing installation is dangerous
                  </span>{' '}
                  — if you find a dangerous installation and the customer refuses to authorise the
                  necessary remedial work, do not paper over it. Issue an at-risk notification and
                  walk away.
                </li>
                <li>
                  <span className="font-semibold text-white">Payment history is poor</span> — if a
                  commercial client has a reputation for slow payment or non-payment, either insist
                  on full payment upfront or decline the work. No amount of profit compensates for
                  not being paid at all.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: 'payment-terms',
          heading: 'Payment Terms and Deposits',
          content: (
            <>
              <p>
                Clear payment terms protect your cash flow and set expectations with the customer.
                Standard payment terms for UK electrical work:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Small jobs (under £500)</span> —
                  payment on completion is standard. Ask for payment before you leave site if
                  possible. Offer card payment (a card reader or online payment link) as well as
                  bank transfer to make it easy for the customer to pay immediately.
                </li>
                <li>
                  <span className="font-semibold text-white">Medium jobs (£500-£2,000)</span> — take
                  a 30-50% deposit before starting work, with the balance due on completion. The
                  deposit covers your material costs and demonstrates the customer's commitment.
                </li>
                <li>
                  <span className="font-semibold text-white">Large jobs (over £2,000)</span> — stage
                  payments are standard. For a rewire, a typical structure is 30% deposit, 40% at
                  first fix completion, and 30% on final completion. Never have more money invested
                  in a job than you have been paid.
                </li>
                <li>
                  <span className="font-semibold text-white">Commercial work</span> — 30-day payment
                  terms are common but can create significant cash flow pressure. Negotiate 14-day
                  terms if possible. Always issue invoices promptly — the payment clock starts when
                  the invoice is received, not when the work is completed.
                </li>
              </ul>
              <p>
                Always state your payment terms clearly on the quote. Include late payment charges
                (you are entitled to charge statutory interest of 8% plus the Bank of England base
                rate under the Late Payment of Commercial Debts (Interest) Act 1998) and make the
                consequences of non-payment clear.
              </p>

              <SEOAppBridge
                title="Invoice Builder — Bill From Site, Get Paid Faster"
                description="Create professional invoices with payment terms, VAT, and online payment links. Send from site the moment the job is done. Track payments and chase overdue invoices automatically."
                icon={Receipt}
              />
            </>
          ),
        },
        {
          id: 'tracking-profitability',
          heading: 'Tracking Job Profitability',
          content: (
            <>
              <p>
                Most electricians know how much they charge but have no idea which jobs actually
                make money. A consumer unit change quoted at £800 that takes 3 hours and £250 in
                materials is far more profitable than a rewire quoted at £5,000 that takes 6 days
                and £1,800 in materials — even though the rewire has a higher turnover.
              </p>
              <p>
                Tracking job profitability means recording actual costs (materials purchased, hours
                spent, travel costs) against each job and comparing them to the quoted price. Over
                time, this data reveals which job types are your most profitable, where you are
                consistently underquoting, and which customers generate the best margins.
              </p>
              <p>
                Elec-Mate's{' '}
                <SEOInternalLink href="/tools/job-profitability-calculator">
                  Job Profitability Calculator
                </SEOInternalLink>{' '}
                tracks actual costs against quoted prices for every job, showing your true profit
                margin. The{' '}
                <SEOInternalLink href="/tools/cash-flow-planner">Cash Flow Planner</SEOInternalLink>{' '}
                forecasts incoming payments and outgoing costs so you can see potential cash flow
                gaps before they become crises. Combined with the{' '}
                <SEOInternalLink href="/tools/electrical-quoting-app">quoting app</SEOInternalLink>{' '}
                and{' '}
                <SEOInternalLink href="/tools/electrician-invoice-app">
                  invoice builder
                </SEOInternalLink>
                , you have a complete financial management system built specifically for electrical
                contractors.
              </p>

              <SEOAppBridge
                title="Job Profitability Tracker — See Which Jobs Make Money"
                description="Track actual materials, hours, and costs against every quoted price. Elec-Mate shows your real profit margin per job, per customer, and per job type — so you can focus on the work that pays best."
                icon={BarChart3}
              />
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'How much should a self-employed electrician charge per hour in 2026?',
          answer:
            "The minimum hourly rate for a self-employed electrician in 2026 should be £45-£65 per hour, depending on your region and overheads. This is not your take-home pay — it is the rate you need to charge to cover your salary, all business overheads (van, tools, insurance, certification scheme, fuel, software, accountant), tax and National Insurance, and a reasonable profit margin. In London and the South East, rates of £55-£75 per hour are typical. In the Midlands and North, £40-£55 is more common. These rates translate to day rates of approximately £300-£450 per day based on 7-8 billable hours. Use Elec-Mate's hourly rate calculator to work out your exact figure based on your actual costs, because everyone's overheads are different.",
        },
        {
          question: 'Should I quote fixed price or day rate for domestic work?',
          answer:
            'Fixed price is almost always better for domestic work. Homeowners want to know the total cost upfront, and a clear fixed price removes uncertainty and makes them more likely to accept your quote. The exception is fault finding, where you cannot predict how long diagnosis will take — charge an hourly rate for the diagnosis phase and then quote a fixed price for the repair once you know what is wrong. For rewires and large projects, use staged payments (deposit, interim, and final payment) with the total fixed at the quoted price. The key to profitable fixed-price work is accurate estimation — which is why AI cost estimation tools are so valuable. They prevent the two most common mistakes: forgetting to include materials and underestimating labour time.',
        },
        {
          question: 'How much should I mark up materials?',
          answer:
            'A markup of 15-25% on trade prices is standard and expected in the UK electrical trade. This markup covers your time sourcing the correct materials, visiting the wholesaler or arranging delivery, storing materials securely, carrying stock in your van, and providing a warranty on the installation including the materials. Some electricians mark up higher on small sundries (cable clips, fixings, earth sleeving, connector blocks) because the time spent purchasing these items is disproportionate to their low individual cost. For large material purchases like consumer units, EV chargers, or solar panels, a lower percentage markup of 10-15% is common because the absolute profit in pounds is still significant. Never work on a supply-only basis where the customer provides materials — if you do not control the materials, you cannot guarantee the installation.',
        },
        {
          question: 'How do I handle price increases from wholesalers mid-job?',
          answer:
            'Include a clause in your quote terms stating that prices are valid for 30 days (or 14 days for volatile periods) and that material prices are subject to change if the customer delays acceptance. For large projects that span weeks or months, you have two options: buy all materials upfront and store them (which requires capital and storage space), or include a price escalation clause in the contract. A typical clause states: "Material prices are based on current trade pricing at the date of quotation. If material costs increase by more than 5% before purchase, the contract price will be adjusted accordingly with written notice to the client." This is fair and transparent. Most customers understand that material prices fluctuate — especially after the supply chain disruptions of recent years.',
        },
        {
          question: 'What is the best way to present a quote to win the job?',
          answer:
            'The most effective quotes are professional, specific, and prompt. Send a branded PDF with your logo and company details — not a text message or verbal estimate. Itemise the scope of works in plain English that the customer can understand ("install 8 new double sockets in positions agreed on site, including cable runs back to the consumer unit in PVC trunking, test and commission, and issue an Electrical Installation Certificate"). State clearly what is included and what is excluded ("excludes decoration, making good of plaster, and any remedial work to existing wiring discovered during installation"). Include your qualifications, competent person scheme registration, and insurance details. Quote within 24 hours of the site visit — the first quote received often wins. Elec-Mate\'s AI Cost Engineer and quoting app let you generate and send a professional quote from your van immediately after the site visit.',
        },
        {
          question: 'How do I deal with customers who say my price is too high?',
          answer:
            'First, do not automatically drop your price. If your pricing is based on a proper hourly rate calculation that covers all your costs and profit, your price is what it needs to be. Instead, explain the value: you are registered with a competent person scheme, fully insured, will notify Building Control, issue proper certification, and guarantee your work. If the customer has a cheaper quote, ask what it includes — cheaper quotes often exclude notification, certification, SPD installation, or testing. If the customer genuinely cannot afford the work, you have three options: reduce the scope (do fewer circuits or a simpler specification), offer staged payments to spread the cost, or politely decline the job. Never reduce your price just to win work — it sets a precedent, devalues your skills, and leads to resentment when you are working for less than you are worth.',
        },
        {
          question: 'Should I charge for site visits and quotations?',
          answer:
            'This depends on the type of work. For small domestic jobs (additional socket, light fitting, consumer unit change), free quotations are the norm and expected by customers. For larger jobs that require significant time to survey and price (full rewires, commercial fit-outs, large domestic projects), charging a survey fee of £30-£75 is increasingly common and filters out customers who are not serious. You can offer to deduct the survey fee from the final invoice if they accept your quote, which makes the fee more palatable. For specialist work like fault finding, always charge for your time from the moment you arrive — never diagnose for free and then quote for the repair. The diagnosis is the skilled part of the work and has value regardless of whether the customer proceeds with the repair.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/electrical-quoting-app',
          title: 'Electrical Quoting App',
          description:
            'Professional PDF quotes with AI cost estimation, material pricing, and one-tap send. Win more work with faster, better quotes.',
          icon: FileText,
          category: 'Business Tools',
        },
        {
          href: '/tools/electrician-invoice-app',
          title: 'Electrician Invoice App',
          description:
            'Create and send professional invoices from site. Track payments, chase overdue invoices, and sync with Xero or QuickBooks.',
          icon: Receipt,
          category: 'Business Tools',
        },
        {
          href: '/tools/job-profitability-calculator',
          title: 'Job Profitability Calculator',
          description:
            'Track actual costs against quoted prices for every job. See which job types and customers generate the best margins.',
          icon: BarChart3,
          category: 'Calculators',
        },
        {
          href: '/tools/ai-cost-engineer',
          title: 'AI Cost Engineer',
          description:
            'Describe any job and get an itemised estimate with real UK trade pricing and labour hours in under a minute.',
          icon: Brain,
          category: 'AI Tools',
        },
        {
          href: '/tools/cash-flow-planner',
          title: 'Cash Flow Planner',
          description:
            'Forecast incoming payments and outgoing costs. Spot cash flow gaps before they become crises.',
          icon: TrendingUp,
          category: 'Business Tools',
        },
        {
          href: '/tools/best-electrician-app-uk',
          title: 'Best Electrician App UK',
          description:
            'Compare electrician apps for certificates, quoting, invoicing, AI tools, and business management.',
          icon: Zap,
          category: 'Comparison',
        },
      ]}
      ctaHeading="Price Every Job Profitably With Elec-Mate"
      ctaSubheading="AI cost estimation, professional quoting, invoicing, job profitability tracking, and cash flow planning — all the business tools an electrician needs. Try free for 7 days."
    />
  );
}
