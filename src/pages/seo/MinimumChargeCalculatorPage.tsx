import BusinessTemplate from '@/pages/seo/templates/BusinessTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calculator,
  PoundSterling,
  Target,
  Clock,
  TrendingUp,
  AlertTriangle,
  Receipt,
  Briefcase,
  Car,
  Wrench,
  ShieldCheck,
} from 'lucide-react';

const PAGE_PATH = '/tools/minimum-charge-calculator';

export default function MinimumChargeCalculatorPage() {
  return (
    <BusinessTemplate
      title="Minimum Charge Calculator for Electricians"
      description="Calculate the minimum amount you should charge for a callout or small job so labour, travel, overheads, and profit are covered every time."
      datePublished="2026-04-12"
      dateModified="2026-04-12"
      breadcrumbs={[
        { label: 'Business Tools', href: '/tools' },
        { label: 'Minimum Charge Calculator', href: PAGE_PATH },
      ]}
      tocItems={[
        { id: 'what-is-minimum-charge', label: 'What Is a Minimum Charge?' },
        { id: 'what-it-must-cover', label: 'What It Must Cover' },
        { id: 'how-to-calculate', label: 'How to Calculate It' },
        { id: 'small-jobs-callouts', label: 'Small Jobs and Callouts' },
        { id: 'pricing-mistakes', label: 'Pricing Mistakes' },
        { id: 'features', label: 'Elec-Mate Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Business Calculators"
      badgeIcon={Target}
      heroTitle={
        <>
          Minimum Charge Calculator
          <span className="block text-yellow-400 mt-1">For UK Electricians</span>
        </>
      }
      heroSubtitle="If your minimum charge is too low, the small jobs that keep the diary moving can quietly destroy your margin. This calculator helps you set a floor price that covers travel, time, overheads, and profit before you even pick up a screwdriver."
      readingTime={8}
      stats={[
        { value: '£80-£140', label: 'Typical electrician minimum charge in many UK regions' },
        { value: '30-90', label: 'Minutes often lost to travel, parking, and setup on small jobs' },
        { value: '£15+', label: 'Profit often lost when electricians underprice short visits' },
        { value: '1 rule', label: 'Never price a job below its real cost floor' },
      ]}
      keyTakeaways={[
        'Your minimum charge should cover travel time, on-site labour, overhead allocation, vehicle cost, admin, and a profit margin.',
        'Short jobs are often the easiest work to underprice because electricians focus on task duration and forget travel, parking, materials collection, and certificate admin.',
        'A strong minimum charge protects the diary: even when the task is small, the visit still contributes properly to fixed costs and profit.',
        'The right minimum charge depends on your region, workload, business model, and whether the visit is domestic, commercial, reactive, or emergency.',
        'Elec-Mate links pricing tools, quotes, invoices, and certificates so the number you calculate can become the minimum charge you actually use in the field.',
      ]}
      sections={[
        {
          id: 'what-is-minimum-charge',
          heading: 'What Is a Minimum Charge and Why Does It Matter?',
          content: (
            <>
              <p>
                Your minimum charge is the lowest amount you can charge for a visit without losing
                money. It is the price floor for short callouts, quick remedials, minor fault
                finding, and small domestic jobs that might only take 20 to 40 minutes on site but
                still consume a meaningful part of your day.
              </p>
              <p>
                Many electricians think in terms of the task itself: "It is only changing a light
                fitting" or "it is just one socket fault." The problem is that the task duration is
                only part of the cost. There is travel, parking, loading materials, writing up the
                job, invoicing, and the dead time between appointments. Your minimum charge exists
                to cover all of that.
              </p>
              <p>
                If you already know your monthly cost base from the{' '}
                <SEOInternalLink href="/tools/break-even-calculator">break-even calculator</SEOInternalLink>
                , the minimum charge is the practical number that stops you accepting small jobs
                below that cost floor.
              </p>
            </>
          ),
          appBridge: {
            title: 'Set a Proper Price Floor',
            description:
              'Use Elec-Mate to calculate your real minimum charge, then carry it straight into quotes and invoices so the number is actually used on site.',
            icon: Target,
          },
        },
        {
          id: 'what-it-must-cover',
          heading: 'What Your Minimum Charge Must Cover',
          content: (
            <>
              <p>
                A proper minimum charge is not just "one hour labour." It needs to absorb all the
                hidden cost that comes with showing up.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Travel time</strong> including traffic, parking, walking to site, and
                      unloading.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Vehicle cost</strong> including fuel, maintenance, insurance, and
                      depreciation.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Business overheads</strong> such as software, phone, accountancy,
                      scheme fees, and non-billable admin time.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Basic materials and consumables</strong> even when the main item is
                      client-supplied or inexpensive.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Profit</strong> because staying busy without margin is not a good
                      business model.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                If you miss any of those, your "small" jobs become the visits that fill the day but
                do not move the business forward.
              </p>
            </>
          ),
        },
        {
          id: 'how-to-calculate',
          heading: 'How to Calculate the Right Minimum Charge',
          content: (
            <>
              <p>
                Start with your target effective hourly rate, then add the non-productive time and
                direct visit costs around it. For many electricians, a one-hour on-site task
                actually occupies 90 minutes to two hours of the working day once travel and admin
                are included.
              </p>
              <p>
                A simple method is:
              </p>
              <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4 text-white">
                <p className="font-semibold">
                  Minimum Charge = Labour Block + Travel Cost + Overhead Allocation + Consumables +
                  Profit Margin
                </p>
              </div>
              <p>
                For example, if your target charge-out rate is £65 per hour, the visit consumes 90
                minutes of real time, travel/parking costs are £12, consumables are £5, and you
                want a modest profit buffer, a minimum charge of £95 to £110 may be far more
                sensible than charging "just one hour".
              </p>
              <p>
                Use the{' '}
                <SEOInternalLink href="/electrician-hourly-rate">hourly rate calculator</SEOInternalLink>{' '}
                to get the labour rate right first, then use this tool to stop short jobs slipping
                under it.
              </p>
            </>
          ),
        },
        {
          id: 'small-jobs-callouts',
          heading: 'Small Jobs, Callouts, and Reactive Work',
          content: (
            <>
              <p>
                The minimum charge matters most on jobs where scope is small or uncertain:
                replacement accessories, nuisance-tripping visits, minor remedials after an EICR,
                and short commercial maintenance visits.
              </p>
              <p>
                Reactive work is especially dangerous to underprice because the job often includes
                diagnosis, discussion, and a second trip for parts. A client may hear "quick job",
                but your business still has to absorb the full visit cost. A clear minimum charge
                prevents awkward conversations and protects your margin before the job even starts.
              </p>
              <p>
                It also makes quoting easier. If the first line of every small job is built on a
                sensible minimum charge, your team stays consistent and the client gets a clearer
                explanation of what the visit actually covers.
              </p>
            </>
          ),
          appBridge: {
            title: 'Turn Small Jobs Into Profitable Work',
            description:
              'Calculate your price floor once, then reuse it across callouts, quotes, invoices, and remedial visits inside Elec-Mate.',
            icon: Receipt,
          },
        },
        {
          id: 'pricing-mistakes',
          heading: 'The Pricing Mistakes That Quietly Kill Margin',
          content: (
            <>
              <p>
                Most electricians do not lose margin because of one huge pricing mistake. They lose
                it through dozens of underpriced short visits across the month.
              </p>
              <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                    <span>Charging only for time on site and ignoring travel and admin.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                    <span>Using the same minimum charge for domestic, commercial, and emergency work.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                    <span>Letting client pressure push the price below the real cost floor.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                    <span>Failing to review the minimum charge as fuel, labour, and overheads rise.</span>
                  </li>
                </ul>
              </div>
              <p>
                If you want pricing to improve materially, build the number into the workflow rather
                than keeping it as a note in your head. That is when it starts changing quote
                quality in the real world.
              </p>
            </>
          ),
        },
      ]}
      features={[
        {
          icon: Calculator,
          title: 'Business Cost Inputs',
          description:
            'Bring fixed costs, vehicle costs, and working-pattern assumptions into the minimum-charge calculation instead of guessing.',
        },
        {
          icon: PoundSterling,
          title: 'Profit-Aware Pricing',
          description:
            'Set a minimum charge that covers costs and still leaves margin instead of merely breaking even.',
        },
        {
          icon: Receipt,
          title: 'Quote and Invoice Continuity',
          description:
            'Use the number in your quotes and invoices so your calculated minimum charge becomes a real business rule.',
        },
        {
          icon: ShieldCheck,
          title: 'Consistent Team Pricing',
          description:
            'Keep pricing consistent across your team so different operatives do not undercut the same type of visit.',
        },
        {
          icon: Clock,
          title: 'Callout-Friendly Logic',
          description:
            'Account for the real time a short visit consumes, not just the minutes spent with tools in hand.',
        },
        {
          icon: TrendingUp,
          title: 'Linked Commercial Tools',
          description:
            'Pair the minimum-charge tool with break-even, hourly-rate, and profitability pages to strengthen the whole pricing workflow.',
        },
      ]}
      faqs={[
        {
          question: 'What is a good minimum charge for an electrician?',
          answer:
            'It depends on your region, costs, and visit profile, but many electricians need a minimum charge somewhere around £80 to £140 for ordinary domestic visits once travel, overheads, and profit are included. The right figure is the one that protects your margin, not the one that sounds easiest to say.',
        },
        {
          question: 'Is the minimum charge the same as my hourly rate?',
          answer:
            'No. Your hourly rate is a labour benchmark. Your minimum charge is the lowest acceptable total visit price. A short job can still justify a higher minimum charge than one hour of labour because it consumes travel time, vehicle cost, admin time, and diary space.',
        },
        {
          question: 'Should I use the same minimum charge for every type of job?',
          answer:
            'Not always. Domestic planned work, commercial maintenance, reactive fault finding, and emergency callouts often justify different minimum charges because the cost and disruption profile is different.',
        },
        {
          question: 'How often should I review my minimum charge?',
          answer:
            'Review it whenever fuel, wages, overheads, or working patterns change materially. At a minimum, most electricians should review it every 6 to 12 months rather than leaving it fixed for years.',
        },
        {
          question: 'How does this relate to break-even?',
          answer:
            'Break-even tells you the revenue level needed to cover all costs over a period. The minimum charge is the practical job-level floor that stops individual visits being priced below that reality.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/break-even-calculator',
          title: 'Break-Even Calculator',
          description: 'Work out how many billable days or jobs you need each month to cover your costs.',
          icon: Target,
          category: 'Business Calculators',
        },
        {
          href: '/electrician-hourly-rate',
          title: 'Electrician Hourly Rate',
          description: 'Set an hourly rate that covers overheads, non-billable time, and profit.',
          icon: PoundSterling,
          category: 'Business Guide',
        },
        {
          href: '/tools/business-cost-calculator',
          title: 'Business Cost Calculator',
          description: 'Capture the real overheads that should feed into your minimum-charge logic.',
          icon: Briefcase,
          category: 'Business Calculators',
        },
        {
          href: '/tools/job-profitability-calculator',
          title: 'Job Profitability Calculator',
          description: 'Check whether the jobs you are winning are genuinely producing profit.',
          icon: TrendingUp,
          category: 'Business Calculators',
        },
        {
          href: '/electrical-quoting-app',
          title: 'Electrical Quoting App',
          description: 'Turn your pricing rules into professional quotes on site without losing margin.',
          icon: Receipt,
          category: 'Tool',
        },
      ]}
      ctaHeading="Protect Every Small Job From Margin Creep"
      ctaSubheading="Use Elec-Mate to calculate your minimum charge, apply it in quotes and invoices, and keep short visits profitable instead of just busy."
      pagePath={PAGE_PATH}
    />
  );
}
