import BusinessTemplate from '@/pages/seo/templates/BusinessTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  PoundSterling,
  TrendingUp,
  Calculator,
  BarChart3,
  Receipt,
  Briefcase,
  Clock,
  Target,
  Users,
  Scale,
  Lightbulb,
  FileText,
} from 'lucide-react';

const PAGE_PATH = '/tools/pricing-strategy-electrician';

export default function PricingStrategyElectricianPage() {
  return (
    <BusinessTemplate
      title="Pricing Strategy for Electricians | Maximise Profit"
      description="Master pricing for your electrical business. Fixed price vs day rate vs hourly — learn when to use each, pricing psychology for electricians, and how to quote jobs that win work and make profit."
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Business Tools', href: '/tools' },
        { label: 'Pricing Strategy', href: PAGE_PATH },
      ]}
      tocItems={[
        { id: 'pricing-models', label: 'Pricing Models Explained' },
        { id: 'fixed-price', label: 'Fixed Price Quoting' },
        { id: 'day-rate', label: 'Day Rate Pricing' },
        { id: 'hourly-rate', label: 'Hourly Rate Pricing' },
        { id: 'pricing-psychology', label: 'Pricing Psychology' },
        { id: 'quoting-tips', label: 'Quoting Tips That Win Work' },
        { id: 'features', label: 'Elec-Mate Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Business Strategy"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Pricing Strategy
          <span className="block text-yellow-400 mt-1">For Electricians Who Want to Profit</span>
        </>
      }
      heroSubtitle="The difference between a struggling electrician and a thriving one often comes down to pricing. Not how hard you work — but how smartly you price. This guide covers fixed price, day rate, and hourly pricing models, when to use each, and the psychology behind quotes that win profitable work."
      readingTime={11}
      stats={[
        { value: '35%', label: 'Profit margin target for labour-only electrical work' },
        { value: '£280', label: 'Average UK electrician day rate in 2025' },
        { value: '3x', label: 'More likely to win work with professional quotes' },
        { value: '14', label: 'Business calculators in Elec-Mate' },
      ]}
      keyTakeaways={[
        'Fixed price quotes are best for defined jobs (board changes, rewires, socket additions) where you can accurately estimate time and materials.',
        'Day rates work well for open-ended work, commercial projects, and when working under a main contractor who manages the programme.',
        'Your minimum hourly rate must cover labour, overheads, profit margin, and holiday or sick pay allowance — not just what feels like a fair wage.',
        'Professional, itemised quotes win more work than verbal estimates and protect you from scope creep.',
        'Pricing psychology matters — how you present your price affects whether clients accept it, not just the number itself.',
      ]}
      sections={[
        {
          id: 'pricing-models',
          heading: 'Three Pricing Models Every Electrician Must Understand',
          content: (
            <>
              <p>
                Every electrical job can be priced using one of three models: fixed price (a single
                quoted amount for a defined scope of work), day rate (a fixed daily charge with the
                total depending on how many days the job takes), or hourly rate (charging by the
                hour with a final bill based on actual time spent). Each has advantages and
                disadvantages, and the right choice depends on the job type, client type, and how
                well you can estimate the work involved.
              </p>
              <p>
                Most successful electricians use all three models depending on the situation. The
                key is understanding when each model works in your favour and when it works against
                you. Get this wrong and you either lose money on jobs (underpriced fixed quotes) or
                lose jobs entirely (overpriced quotes because you padded for uncertainty).
              </p>
              <p>
                Before choosing a pricing model, you need to know your{' '}
                <SEOInternalLink href="/tools/business-cost-calculator">
                  true business costs
                </SEOInternalLink>
                . Your price must cover materials, your labour at a fair rate, a share of your
                business overheads (van, tools, insurance, certification), and a profit margin. If
                you do not know your overhead cost per hour, your pricing is guesswork.
              </p>
            </>
          ),
        },
        {
          id: 'fixed-price',
          heading: 'Fixed Price Quoting — When and How',
          content: (
            <>
              <p>
                <strong className="text-yellow-400">Fixed price</strong> means giving the client a
                single, all-inclusive price for the job before you start. The client knows exactly
                what they will pay, and you take on the risk that the job might take longer or cost
                more than estimated. The upside is that if you complete the job efficiently, you
                keep the difference — and your effective hourly rate can be significantly higher
                than a day rate.
              </p>
              <p>
                Fixed pricing works best for jobs with a clearly defined scope: consumer unit
                upgrades, additional socket or lighting circuits, EICR inspections, EV charger
                installations, and full rewires (once you have surveyed the property). These are
                jobs where an experienced electrician can estimate time and materials with
                reasonable accuracy based on past experience.
              </p>
              <p>
                <strong className="text-yellow-400">How to build a fixed price:</strong> Calculate
                your material costs (including 5% to 10% wastage), estimate labour hours (be honest,
                include travel, testing, and certification time), multiply labour hours by your
                fully-loaded rate (labour + overheads), add your profit margin (typically 20% to
                35%), and add a contingency of 5% to 10% for unexpected complications. Elec-Mate's{' '}
                <SEOInternalLink href="/tools/job-profitability-calculator">
                  job profitability calculator
                </SEOInternalLink>{' '}
                helps you build quotes using this exact structure.
              </p>
              <p>
                <strong className="text-yellow-400">The risk with fixed pricing:</strong> If you
                underestimate the time or hit unexpected problems (asbestos, hidden wiring, access
                issues), you absorb the extra cost. This is why a thorough site survey is essential
                before quoting fixed price, and why your quote should clearly state what is included
                and excluded.
              </p>
            </>
          ),
          appBridge: {
            title: 'Build Professional Fixed Price Quotes',
            description:
              "Elec-Mate's quoting app calculates materials, labour, overheads, and profit margin automatically. Send branded PDF quotes that clients can accept with a single tap.",
            icon: FileText,
          },
        },
        {
          id: 'day-rate',
          heading: 'Day Rate Pricing — Predictable Income',
          content: (
            <>
              <p>
                <strong className="text-yellow-400">Day rate</strong> pricing charges the client a
                fixed amount per day (typically 8 hours on site). The total cost depends on how many
                days the job takes. The client takes on the risk that the job might take longer than
                expected, while you have the certainty of earning your rate for every day worked.
              </p>
              <p>
                Day rates are common for commercial work, especially when working under a main
                contractor. They work well for open-ended or poorly defined work where it is
                difficult to estimate the total duration — fault-finding, remedial work on existing
                installations, commercial fit-outs where the scope evolves, and new-build work where
                your programme depends on other trades.
              </p>
              <p>
                <strong className="text-yellow-400">Current UK day rates (2025):</strong> The
                average electrician day rate in the UK is approximately £250 to £320 for domestic
                work and £280 to £400 for commercial work. London and the South East command higher
                rates (£320 to £450). Specialist work (data centres, hospital, hazardous areas) can
                command £400 to £600 per day. Your rate should be based on your costs and desired
                profit, not just what others charge.
              </p>
              <p>
                <strong className="text-yellow-400">Calculating your day rate:</strong> Start with
                your desired annual income (say £50,000). Add your annual business overheads (say
                £15,000). Divide by your annual billable days (typically 220 to 230 after holidays,
                training, and admin). That gives you £283 per day as a minimum — before profit. Add
                your target profit margin and you have your day rate. Use the{' '}
                <SEOInternalLink href="/tools/business-cost-calculator">
                  business cost calculator
                </SEOInternalLink>{' '}
                to get your exact overhead figure.
              </p>
            </>
          ),
        },
        {
          id: 'hourly-rate',
          heading: 'Hourly Rate Pricing — Transparent but Risky',
          content: (
            <>
              <p>
                <strong className="text-yellow-400">Hourly rate</strong> pricing charges the client
                for every hour worked. It is the most transparent model for the client (they can see
                exactly what they are paying for) but the most risky for you, because clients tend
                to watch the clock and question every hour.
              </p>
              <p>
                Hourly rates work best for small, quick jobs (adding a socket, swapping a light
                fitting, minor fault-finding) where a fixed quote would be disproportionately high
                relative to the work involved, and for reactive or emergency work where you cannot
                estimate duration in advance.
              </p>
              <p>
                <strong className="text-yellow-400">Setting your hourly rate:</strong> Your hourly
                rate must cover your labour, a share of your overheads, and profit. Calculate it the
                same way as the day rate but divide by 8 (or 7.5 if that is your standard day). From
                the example above, the minimum is approximately £35 per hour — but most electricians
                charge £45 to £65 per hour for domestic work and £55 to £80 for commercial work. Do
                not forget that you cannot bill every hour of the day — travel, admin, and downtime
                reduce your billable hours to approximately 6 per day on average.
              </p>
              <p>
                <strong className="text-yellow-400">Minimum call-out charge:</strong> Always set a
                minimum call-out charge (typically equivalent to 1 to 2 hours) to cover travel time
                and the opportunity cost of accepting a small job. Without this, a 30-minute job
                that takes an hour of travel costs you money.
              </p>
            </>
          ),
        },
        {
          id: 'pricing-psychology',
          heading: 'Pricing Psychology for Electricians',
          content: (
            <>
              <p>
                How you present your price is almost as important as the price itself. Pricing
                psychology is not about tricks or manipulation — it is about framing your value in a
                way that helps clients make confident decisions.
              </p>
              <p>
                <strong className="text-yellow-400">Anchor with value, not cost:</strong> When
                presenting a quote, lead with what the client gets — compliance with BS 7671, a safe
                installation, a 6-year EICR certificate, peace of mind — before showing the price. A
                client who understands the value is less likely to focus solely on the number.
              </p>
              <p>
                <strong className="text-yellow-400">Offer options:</strong> Instead of a single
                price, offer two or three options. For example, a consumer unit upgrade could be
                quoted as: Option A — like-for-like board replacement (£850), Option B — board
                upgrade with SPD protection (£1,100), Option C — full upgrade with whole-house surge
                protection and additional circuits (£1,600). Most clients choose the middle option,
                and you earn more than with a single quote.
              </p>
              <p>
                <strong className="text-yellow-400">Professional presentation matters:</strong> A
                branded PDF quote with your logo, clear scope of work, terms and conditions, and
                professional layout signals that you are a serious business. Clients trust
                professional quotes more than handwritten estimates or text messages. Elec-Mate
                generates professional quotes automatically from your job details.
              </p>
              <p>
                <strong className="text-yellow-400">Speed wins:</strong> The first electrician to
                send a professional quote often wins the job, even if they are not the cheapest.
                Clients interpret a fast response as professionalism and reliability. Elec-Mate lets
                you build and send quotes from your phone while still on the site survey.
              </p>
            </>
          ),
        },
        {
          id: 'quoting-tips',
          heading: 'Quoting Tips That Win Profitable Work',
          content: (
            <>
              <p>
                <strong className="text-yellow-400">Be specific about scope:</strong> Vague quotes
                lead to disputes. State exactly what is included (number of circuits, positions of
                accessories, cable routes, testing and certification) and what is excluded (making
                good, decoration, builders work, disposal). This protects you from scope creep and
                gives the client confidence in what they are paying for.
              </p>
              <p>
                <strong className="text-yellow-400">Include your certification body logo:</strong>{' '}
                If you are NICEIC, NAPIT, or ELECSA registered, include the logo on your quote. It
                signals competence and compliance, and many clients specifically look for registered
                electricians. Use the{' '}
                <SEOInternalLink href="/tools/best-quoting-app">best quoting app</SEOInternalLink>{' '}
                features in Elec-Mate to add these automatically.
              </p>
              <p>
                <strong className="text-yellow-400">Set clear payment terms:</strong> State when
                payment is due (on completion, 7 days, 14 days), whether you require a deposit, and
                what payment methods you accept. Offering card payment via Stripe significantly
                reduces the time to get paid. The{' '}
                <SEOInternalLink href="/tools/cash-flow-planner">cash flow planner</SEOInternalLink>{' '}
                tracks payment timelines automatically.
              </p>
              <p>
                <strong className="text-yellow-400">Quote validity period:</strong> Always include a
                validity period (14 to 30 days is standard). This protects you from material price
                increases and prevents clients from accepting a months-old quote when your costs
                have changed. Elec-Mate timestamps every quote and flags expired ones.
              </p>
              <p>
                <strong className="text-yellow-400">Follow up:</strong> If you have not heard back
                within a week, follow up with a polite message. Many electricians lose work simply
                because they never chased the quote. Elec-Mate can send automatic follow-up
                reminders so you never forget.
              </p>
            </>
          ),
          appBridge: {
            title: 'Quote, Invoice, and Get Paid — All in One App',
            description:
              'Elec-Mate builds professional quotes in minutes, converts them to invoices with one tap, and tracks payment status with automatic reminders. Stop losing money on admin.',
            icon: PoundSterling,
          },
        },
      ]}
      features={[
        {
          icon: FileText,
          title: 'Professional PDF Quotes',
          description:
            'Generate branded quotes with your logo, scope of work, terms, and payment options. Send from your phone while on site.',
        },
        {
          icon: Calculator,
          title: 'Automatic Cost Calculation',
          description:
            'Enter materials and labour hours — Elec-Mate calculates overheads, margin, and final price. Never miss a cost again.',
        },
        {
          icon: Target,
          title: 'Profit Margin Targets',
          description:
            'Set your desired margin and the calculator shows you the price needed. Compare against market rates to stay competitive.',
        },
        {
          icon: Clock,
          title: 'Quote Tracking',
          description:
            'Track every quote from sent to viewed to accepted or declined. Know your win rate and average response time.',
        },
        {
          icon: Scale,
          title: 'Multi-Option Quotes',
          description:
            'Offer clients 2 or 3 pricing tiers in a single quote. Increase your average job value by 25% with upsell options.',
        },
        {
          icon: Lightbulb,
          title: 'AI Price Suggestions',
          description:
            "Elec-Mate's AI cost engineer analyses your job details and suggests competitive prices based on UK market data and your cost base.",
        },
      ]}
      featuresHeading="How Elec-Mate Helps You Price Profitably"
      featuresSubheading="Stop guessing your prices. Use data, cost analysis, and professional quoting tools to win work at the right margin."
      faqs={[
        {
          question: 'Should electricians use fixed price or day rate?',
          answer:
            'It depends on the job type. Fixed price is better for well-defined jobs where you can accurately estimate time and materials — consumer unit upgrades, additional circuits, EICR inspections, EV charger installations, and full rewires after a thorough survey. Day rate is better for open-ended or unpredictable work — fault-finding, remedial work on existing installations, commercial fit-outs where the scope evolves, and work under a main contractor. Most successful electricians use both models, choosing based on the specific job and client. The key is knowing your costs accurately so whichever model you use, you are pricing to profit.',
        },
        {
          question: 'What is a good day rate for an electrician in 2025?',
          answer:
            'The average UK electrician day rate in 2025 is approximately £250 to £320 for domestic work and £280 to £400 for commercial work. London and the South East typically command higher rates of £320 to £450. Specialist work such as data centres, hospitals, or hazardous areas can command £400 to £600 per day. However, the right day rate for you depends on your specific costs, not averages. Calculate your desired annual income, add your annual business overheads, and divide by your billable days (typically 220 to 230 per year) to find your minimum day rate. Then add your target profit margin.',
        },
        {
          question: 'How do I stop clients choosing the cheapest quote?',
          answer:
            'Clients who choose solely on price are often not the clients you want — they tend to be more demanding, slower to pay, and less likely to recommend you. To attract quality clients, focus on value rather than price: present professional, detailed quotes that explain the scope and benefits, include your certification body credentials, show evidence of insurance, highlight relevant experience and qualifications, and follow up promptly. Offering options (basic, standard, premium) also shifts the conversation from "how much" to "which option" — and most clients choose the middle tier.',
        },
        {
          question: 'How much should I mark up materials?',
          answer:
            'Most electricians mark up materials by 10% to 25%. The markup covers your time sourcing and purchasing materials, the cost of carrying stock in your van, delivery charges, and the risk of unused or returned materials. For large material orders on commercial jobs, a 10% to 15% markup is standard. For smaller domestic jobs where you are buying from a trade counter, 15% to 25% is reasonable. Some electricians prefer to show materials at cost and charge a higher labour rate instead — this can be more transparent but may result in clients questioning every line item.',
        },
        {
          question: 'How do I handle price increases from suppliers?',
          answer:
            "Material prices in the electrical industry fluctuate regularly, particularly for copper cable. Protect yourself by including a quote validity period (14 to 30 days) on every quote, so clients cannot accept an old quote after prices have risen. For larger projects that span several weeks, include a price variation clause in your terms that allows you to pass on material cost increases above a certain threshold (typically 5% to 10%). Keep your material pricing database up to date — Elec-Mate's built-in pricing data reflects current UK trade prices and is updated regularly.",
        },
      ]}
      relatedPages={[
        {
          href: '/tools/business-cost-calculator',
          title: 'Business Cost Calculator',
          description:
            'Calculate your true business running costs so every quote covers your real overheads.',
          icon: Calculator,
          category: 'Business Calculators',
        },
        {
          href: '/tools/job-profitability-calculator',
          title: 'Job Profitability Calculator',
          description:
            'Track the true profit on every job including all hidden costs and overhead allocation.',
          icon: TrendingUp,
          category: 'Business Calculators',
        },
        {
          href: '/tools/best-quoting-app',
          title: 'Best Quoting App for Electricians',
          description:
            'Build and send professional quotes from your phone. Win more work with branded PDF quotes.',
          icon: FileText,
          category: 'App Features',
        },
        {
          href: '/tools/business-analytics-electrician',
          title: 'Business Analytics Dashboard',
          description:
            'Track your win rate, average job value, and revenue trends across all your work.',
          icon: BarChart3,
          category: 'Business Tools',
        },
        {
          href: '/tools/cash-flow-planner',
          title: 'Cash Flow Planner',
          description: 'Forecast income from accepted quotes and plan your cash position ahead.',
          icon: Briefcase,
          category: 'Business Calculators',
        },
        {
          href: '/tools/customer-management-electrician',
          title: 'Customer Management CRM',
          description: 'Track quote history, job records, and repeat work for every customer.',
          icon: Users,
          category: 'Business Tools',
        },
      ]}
      ctaHeading="Price Every Job for Profit"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to quote accurately, track profitability, and build a business that pays what you deserve. 7-day free trial, cancel anytime."
      extraSchemas={[
        {
          '@type': 'SoftwareApplication',
          name: 'Elec-Mate Pricing & Quoting Tools',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web, iOS, Android',
          description:
            'Professional quoting, pricing strategy, and job costing tools for UK electricians. Fixed price, day rate, and hourly pricing with automatic overhead and margin calculation.',
          url: 'https://elec-mate.com/tools/pricing-strategy-electrician',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'GBP',
            description: '7-day free trial, then from £9.99/month',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '430',
            bestRating: '5',
          },
        },
      ]}
      pagePath={PAGE_PATH}
    />
  );
}
