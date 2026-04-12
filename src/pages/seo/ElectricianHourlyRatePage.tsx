import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  MapPin,
  Clock,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Zap,
  Car,
  ShieldCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Business', href: '/hourly-rate-calculator-guide' },
  { label: 'Electrician Hourly Rate', href: '/electrician-hourly-rate' },
];

const tocItems = [
  { id: 'uk-rates-2026', label: 'UK Electrician Hourly Rates 2026' },
  { id: 'regional-rates', label: 'Regional Rate Breakdown' },
  { id: 'sole-trader-vs-firm', label: 'Sole Trader vs Larger Firm' },
  { id: 'callout-charges', label: 'Callout Charges' },
  { id: 'emergency-rates', label: 'Emergency and Out-of-Hours Rates' },
  { id: 'overhead-breakdown', label: 'Van, Tools, Insurance and Overheads' },
  { id: 'pricing-jobs', label: 'How to Price Electrical Jobs' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Confidently' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Electrician hourly rates in London range from £65 to £90 per hour in 2026. South East rates are £55 to £75/hr, Midlands and North £40 to £60/hr, and Scotland £45 to £65/hr. Rates outside London have increased by approximately 8 to 12 per cent since 2023 due to materials and fuel inflation.',
  'The majority of qualified electricians charge between £45 and £75 per hour for standard domestic work. Specialist work (EV charger installation, solar PV, HV systems) attracts a premium of 20 to 40 per cent above standard rates.',
  'Emergency and out-of-hours rates are typically 1.5x to 2x the standard rate. A London electrician charging £70/hr standard may charge £105 to £140/hr for an emergency callout on a weekend or bank holiday.',
  'A typical sole trader electrician working 220 chargeable days per year at £55/hr (8 hours per day) generates £96,800 gross revenue — but after van, tools, insurance, fuel, certification, and accountancy costs, net profit is typically £45,000 to £65,000.',
  'Always provide a written quote before starting work, not just an hourly rate. Most domestic clients prefer a fixed price. Hourly rates are used for fault-finding, maintenance visits, and jobs where scope cannot be determined in advance.',
];

const faqs = [
  {
    question: 'What is the average hourly rate for an electrician in the UK in 2026?',
    answer:
      'The average electrician hourly rate across the UK in 2026 is approximately £50 to £65 per hour for a self-employed sole trader. This figure varies significantly by region: London and South East rates average £70 to £85/hr, while the North of England and Scotland average £45 to £60/hr. These are rates charged to the end client, not take-home pay. After overheads, a sole trader at £55/hr is typically netting £30 to £40 per hour worked.',
  },
  {
    question: 'Why do London electricians charge so much more than elsewhere?',
    answer:
      'London rates are higher for several compounding reasons: the cost of living in London means electricians need to earn more to maintain a comparable lifestyle; parking, congestion charges, and the ULEZ emission zone add daily operating costs (£15 to £30 per day in central London); travel time between jobs is greater; and demand consistently exceeds supply of qualified electricians in London, particularly for specialist work. A London electrician may spend one to two hours per day in traffic that generates no income, which must be factored into their charge-out rate.',
  },
  {
    question: 'What is a typical callout charge for an electrician?',
    answer:
      'Most electricians charge a callout or minimum visit fee to cover travel, initial assessment, and the first period of work. Typical callout charges are £50 to £100 for domestic work, often covering the first 30 to 60 minutes of labour. After the callout period, standard hourly rates apply. Some electricians absorb the callout into their first hour charge rather than itemising it separately. For commercial clients, callout charges are typically £80 to £150 and are agreed in maintenance contracts in advance.',
  },
  {
    question: 'How much extra do electricians charge for emergency work?',
    answer:
      'Emergency and out-of-hours work is typically charged at 1.5x to 2x the standard rate. A sole trader charging £55/hr in normal hours may charge £80 to £110/hr for an evening or weekend emergency. Bank holidays typically attract the highest premium at 2x to 2.5x. A minimum charge applies regardless of how short the emergency job is — most electricians set a minimum of 2 hours for any emergency callout to cover the inconvenience and preparation time.',
  },
  {
    question: 'Should I charge by the hour or give a fixed price?',
    answer:
      'For most domestic installation jobs (consumer unit replacement, new circuits, socket additions), fixed pricing is strongly recommended. Clients prefer certainty, and a fixed price protects you if the job is straightforward. For fault-finding, reactive maintenance, and inspection work where the scope is genuinely unknown, hourly charging is appropriate. Always set a maximum time estimate and communicate it to the client before starting. Never start work on an open-ended hourly basis without agreeing a maximum charge.',
  },
  {
    question: 'What overheads should I include when calculating my hourly rate?',
    answer:
      "Your minimum viable hourly rate must cover: target annual income, van running costs (fuel, insurance, maintenance, depreciation — typically £6,000 to £12,000/year), tool replacement and maintenance (£1,000 to £3,000/year), public liability and employer's liability insurance (£500 to £1,500/year), NICEIC or NAPIT registration (£400 to £800/year), mobile phone, software (Elec-Mate, accounting, etc.), accountancy fees (£500 to £1,500/year), and non-chargeable time (quoting, travel, admin — typically 30 to 40 per cent of your working day). Divide your total annual costs plus target income by your chargeable hours to arrive at your minimum rate.",
  },
  {
    question: 'Do electricians charge VAT on top of their hourly rate?',
    answer:
      'Electricians registered for VAT (turnover exceeds £90,000 per year as of 2026, or voluntarily registered below this threshold) must charge VAT at 20% on labour and materials. Residential electrical work does not qualify for the reduced 5% VAT rate (which applies to energy-efficiency measures such as insulation). When comparing quotes, always check whether quoted rates are inclusive or exclusive of VAT. A sole trader not VAT-registered and charging £55/hr is directly comparable to a VAT-registered firm charging £46/hr plus VAT.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/hourly-rate-calculator-guide',
    title: 'Hourly Rate Calculator for Electricians',
    description:
      'Step-by-step guide to calculating your minimum viable hourly rate as a sole trader.',
    icon: PoundSterling,
    category: 'Business Guide',
  },
  {
    href: '/electrical-contractor-insurance',
    title: 'Electrical Contractor Insurance Guide',
    description:
      "Public liability, employer's liability, professional indemnity, and tool insurance explained.",
    icon: ShieldCheck,
    category: 'Business Guide',
  },
  {
    href: '/electrician-salary-benchmarking',
    title: 'Electrician Salary Benchmarking 2026',
    description:
      'Regional salary data for electricians, foremen, and electrical engineers across the UK.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Create professional quotes and invoices on your phone in under 3 minutes.',
    icon: FileCheck2,
    category: 'Tool',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'uk-rates-2026',
    heading: 'UK Electrician Hourly Rates in 2026',
    content: (
      <>
        <p>
          Electrician hourly rates in the UK have increased consistently over the past three years,
          driven by rising fuel costs, materials inflation, and strong demand for qualified
          electricians. The rates below reflect what electricians are charging their clients in
          2026, not what they take home.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard domestic rate (UK average)</strong> — £48 to £68 per hour. A
                qualified sole trader electrician in most parts of the UK charges within this range
                for standard domestic installation and maintenance work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial and industrial rate (UK average)</strong> — £55 to £80 per hour.
                Commercial work typically attracts a higher rate due to more complex specifications,
                testing requirements, and documentation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist work premium</strong> — EV charger installation, solar PV, data
                centres, HV systems, and fire alarm work attract a 20 to 40 per cent premium above
                standard rates, reflecting additional qualifications, specialist equipment, and
                certification requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Materials — typically not included in hourly rate</strong> — electricians
                generally charge for materials separately, either at trade price plus a mark-up
                (typically 15 to 25%) or at a flat agreed rate. Always clarify with the client
                whether the quoted rate includes or excludes materials.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regional-rates',
    heading: 'Regional Electrician Rates: A UK Breakdown',
    content: (
      <>
        <p>
          Where you work is one of the most significant factors in determining what you can charge.
          The following regional rates are for qualified sole trader electricians doing domestic and
          light commercial work in 2026.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>London (inner)</strong> — £70 to £90 per hour. Central London rates reflect
                the congestion charge, ULEZ costs (up to £12.50/day), parking charges, high cost of
                living, and strong demand. Top specialists in London regularly charge £90 to
                £110/hr.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>London (outer) and South East</strong> — £55 to £75 per hour. Areas
                including Kent, Essex, Surrey, and the Home Counties. Lower operating costs than
                inner London but strong demand from high-income residential clients.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>South West</strong> — £50 to £70 per hour. Bristol, Bath, Exeter, and the
                wider South West. Strong demand in coastal areas and from second-home owners.
                Seasonal fluctuations in some rural areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Midlands</strong> — £45 to £65 per hour. Birmingham, Nottingham, Leicester,
                Derby. Strong commercial and industrial sector. Domestic rates towards the lower end
                of this range in lower-income residential areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>North of England</strong> — £40 to £60 per hour. Manchester, Leeds,
                Sheffield, Newcastle. Rate variation is significant — Manchester city centre rates
                approach South East levels while rural Yorkshire and County Durham rates are at the
                lower end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scotland</strong> — £45 to £65 per hour. Edinburgh and Glasgow at the higher
                end; rural Highlands and Islands at or below the lower end. The oil and gas sector
                in Aberdeen supports premium rates for industrial electricians (£65 to £90/hr).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wales and Northern Ireland</strong> — £38 to £55 per hour. Lower average
                rates reflecting lower average incomes. Cardiff and Belfast city centres trend
                towards the upper end of local ranges.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'sole-trader-vs-firm',
    heading: 'Sole Trader vs Larger Electrical Firm: Rate Differences',
    content: (
      <>
        <p>
          Clients often compare rates between sole traders and larger electrical contractors.
          Understanding why rates differ — and what they pay for — helps you position your pricing
          confidently.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sole trader rates</strong> — typically £45 to £75/hr. Lower overheads than a
                company (no employer&apos;s NI on employees, smaller office costs, no management
                layer). Can offer competitive prices while maintaining healthy margins. Clients deal
                directly with the qualified electrician on the job.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small electrical company (1–5 electricians)</strong> — typically £55 to
                £80/hr. Higher overhead structure: employer&apos;s NI contributions, office
                administration, management time, and greater insurance requirements. Can offer more
                scheduling flexibility and backup cover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium to large contractor</strong> — typically £75 to £120/hr (often quoted
                as a day rate for planned works). High overhead, project management, dedicated
                estimating teams, and accreditations for commercial and public sector work. Often
                the only option for large commercial or infrastructure projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Labour-only subcontract rate</strong> — £28 to £50/hr (labour only, no
                materials, no certification). This is what a qualified electrician receives when
                working as a subcontractor for a main contractor. Not a consumer-facing rate — do
                not benchmark your charge-out rate against this.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'callout-charges',
    heading: 'Callout Charges: What to Include and How to Structure Them',
    content: (
      <>
        <p>
          A callout charge covers the cost of your time and transport to attend a job, regardless of
          how long the work takes once you arrive. It is a legitimate and standard part of
          electrical pricing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical domestic callout charge</strong> — £50 to £100, covering travel and
                the first 30 to 60 minutes on site. Clearly communicate to the client that this is
                charged regardless of outcome (including situations where you attend and find no
                fault).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum charge</strong> — set a minimum charge of 1 to 2 hours for any
                visit. A 20-minute job still costs you travel time and vehicle running costs. A £35
                minimum charge for a 15-minute job is appropriate and expected by most clients.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Travel time</strong> — charging for travel time is standard practice. Many
                electricians charge 50% of their standard rate for travel beyond a set radius (e.g.,
                10 miles from base). Clearly state this policy when quoting.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'emergency-rates',
    heading: 'Emergency and Out-of-Hours Rates',
    content: (
      <>
        <p>
          Emergency electrical work — power failures, tripped circuits that cannot be reset, exposed
          live conductors — justifies a premium rate. Clients calling in a genuine emergency expect
          to pay more, and your pricing should reflect the inconvenience and readiness cost of
          providing this service.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Evening and weekend (out of hours)</strong> — 1.5x standard rate. A standard
                rate of £55/hr becomes £82.50/hr. Most electricians define &quot;out of hours&quot;
                as weekdays after 6pm and all day Saturday.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sunday and bank holiday emergency</strong> — 2x standard rate. A standard
                rate of £55/hr becomes £110/hr. Bank holiday callouts often attract an additional
                fixed premium of £50 to £100 on top of the doubled rate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum emergency call charge</strong> — typically 2 hours at the emergency
                rate. Attending a job that takes 30 minutes at midnight costs you the same in
                preparation, travel, and disruption as a 2-hour job. A 2-hour minimum is standard
                and fair.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Communicate rates clearly upfront</strong> — state your emergency rates
                clearly when the client calls, before you attend. A client who agrees to your
                emergency rate before you arrive will not dispute it afterwards. Disputes about
                rates are almost always caused by a failure to communicate the rate before starting
                work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'overhead-breakdown',
    heading: 'Van, Tools, Insurance and Overhead Costs',
    content: (
      <>
        <p>
          Understanding your true costs is essential to setting a rate that keeps your business
          profitable. Many electricians underestimate their overhead and undercharge as a result.
          The following annual cost estimates are for a typical UK sole trader electrician in 2026.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Van (fuel, insurance, maintenance, depreciation)</strong> — £7,000 to
                £14,000 per year. A modern transit-style van costs £5,000 to £8,000/year in
                depreciation alone if purchased new. Fuel adds £3,000 to £6,000 depending on mileage
                and fuel type. Van insurance for a commercial vehicle with tools is £1,500 to
                £3,000/year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tools and test equipment</strong> — £1,000 to £3,500 per year. Multifunction
                testers, insulation resistance testers, clamp meters, hand tools, and consumables. A
                quality multifunction tester (Megger MFT1741 or equivalent) represents a one-off
                cost of £500 to £900 with ongoing calibration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — £400 to £900/year for £5m public
                liability cover. Essential for any client-facing work. See the{' '}
                <SEOInternalLink href="/electrical-contractor-insurance">
                  electrical contractor insurance guide
                </SEOInternalLink>{' '}
                for full detail on required cover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registration</strong> — £400 to £800/year depending on
                scheme tier and business size. Required to self-certify notifiable work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Software, phone, accounting</strong> — £800 to £2,000/year. Elec-Mate
                (certificates and quoting), accounting software, phone contract, and accountancy
                fees if you use a bookkeeper or accountant.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Total annual overhead (excluding your own income) for a sole trader typically falls
          between £12,000 and £25,000. This must be earned before you pay yourself a penny. Use this
          figure in your rate calculation: (target annual income + annual overhead) divided by
          chargeable hours per year equals your minimum charge-out rate.
        </p>
      </>
    ),
  },
  {
    id: 'pricing-jobs',
    heading: 'How to Price Electrical Jobs: Fixed Price vs Hourly',
    content: (
      <>
        <p>
          Most experienced electricians use fixed-price quotes for the majority of domestic work and
          reserve hourly charging for reactive and diagnostic work. Here is how to decide which
          approach to use and how to set the price.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fixed price — use for installation work</strong> — consumer unit
                replacements, new circuits, rewires, and appliance installations are all well-suited
                to fixed pricing. Estimate the time based on your experience, add materials at cost
                plus mark-up, and quote a single all-inclusive price. Clients prefer this and it
                protects your margin on straightforward jobs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hourly rate — use for fault-finding and investigation</strong> — when you do
                not know what you will find, quote an hourly rate with an estimated maximum.
                &quot;Fault-finding at £60/hr, estimated 1 to 3 hours&quot; is honest and protects
                both you and the client.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Materials mark-up</strong> — charge materials at trade price plus 15 to 25
                per cent. This compensates for the time spent sourcing, ordering, and carrying
                materials, and is standard practice. Clients who query this are comparing your trade
                price to the retail price they see online — explain that you carry stock, manage
                suppliers, and return unused materials.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Always confirm in writing</strong> — a written quote protects both parties.
                Use the{' '}
                <SEOInternalLink href="/electrical-quoting-app">
                  Elec-Mate quoting app
                </SEOInternalLink>{' '}
                to produce a professional written quote before you start work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quote and Invoice Professionally',
    content: (
      <>
        <p>
          Knowing your rate is only part of the picture. Presenting it professionally, converting
          quotes to invoices efficiently, and following up on payment keeps your business
          financially healthy.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote on Site, Win More Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  Clients who receive a professional, written quote on the day of a site visit are
                  significantly more likely to accept than those who receive one a day later. Use
                  the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to produce itemised, professional quotes from your phone in under three minutes.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Issue Certificates and Invoices Together
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue the certificate and the invoice before you leave the job. Clients who
                  receive their certificate and invoice together are more likely to pay promptly.
                  Elec-Mate handles both — complete the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR or EIC</SEOInternalLink> and
                  convert the job to an invoice in the same session.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, invoice, and certify — all from your phone"
          description="Join 1,000+ UK electricians using Elec-Mate to produce professional quotes, certificates, and invoices on site. Stop losing jobs to slower competitors. 7-day free trial."
          icon={Zap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianHourlyRatePage() {
  return (
    <GuideTemplate
      title="Electrician Hourly Rate UK 2026 | Regional Rates, Callouts and Pricing Guide"
      description="What electricians charge per hour in the UK in 2026. Regional rates: London £65–£90/hr, South East £55–£75/hr, Midlands/North £40–£60/hr, Scotland £45–£65/hr. Emergency rates (1.5x–2x), callout charges, overhead breakdown, and how to price jobs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Pricing Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Electrician Hourly Rate UK 2026:{' '}
          <span className="text-yellow-400">Regional Rates, Callouts and How to Price Jobs</span>
        </>
      }
      heroSubtitle="Electrician hourly rates vary significantly across the UK in 2026. This guide covers what electricians charge by region (London £65–£90/hr, Midlands/North £40–£60/hr), how sole trader rates compare to larger firms, callout charge structures, emergency and out-of-hours premiums (1.5x–2x), overhead calculations, and how to price electrical jobs confidently."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Hourly Rates"
      relatedPages={relatedPages}
      ctaHeading="Quote and Invoice Like a Professional with Elec-Mate"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate to produce professional quotes, certificates, and invoices on site. 7-day free trial, no credit card required."
    />
  );
}
