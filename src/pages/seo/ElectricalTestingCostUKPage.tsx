import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  FileCheck2,
  ShieldCheck,
  Calculator,
  ClipboardCheck,
  GraduationCap,
  Home,
  Building2,
  Zap,
  Receipt,
  Camera,
  BarChart3,
  Search,
  FileText,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Testing Cost UK', href: '/guides/electrical-testing-cost-uk' },
];

const tocItems = [
  { id: 'testing-overview', label: 'Testing Cost Overview' },
  { id: 'eicr-pricing', label: 'EICR Pricing by Property' },
  { id: 'pat-testing-rates', label: 'PAT Testing Rates' },
  { id: 'initial-verification', label: 'Initial Verification Costs' },
  { id: 'periodic-inspection', label: 'Periodic Inspection Fees' },
  { id: 'pricing-your-testing', label: 'Pricing Your Testing Work' },
  { id: 'tools-that-save-time', label: 'Tools That Save Time' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'EICR costs range from £120 for a small flat to £2,000+ for large commercial premises, with 3-bedroom houses typically £180 to £280.',
  'PAT testing is commonly priced at £1 to £3 per item for bulk work, or £60 to £120 per hour for smaller jobs with fewer appliances.',
  'Initial verification (EIC) costs are usually included in the installation price, but standalone EIC inspections for new builds run £150 to £400.',
  'The biggest hidden cost in testing work is post-site paperwork — eliminating it with Elec-Mate can recover over 100 billable hours per year.',
  'Electricians who complete certificates and quotes on site earn more per day than those who spend evenings typing up results at home.',
];

const faqs = [
  {
    question: 'How much does an EICR cost for a 3-bedroom house in 2026?',
    answer:
      'A standard 3-bedroom house with a single consumer unit and 8 to 12 circuits typically costs £180 to £280 for an EICR in 2026. Properties with extensions, loft conversions, outbuildings, or additional distribution boards will be at the higher end. London and South East prices are typically 10 to 25% above the national average. This price covers the inspection, testing, and report only — remedial work is quoted and charged separately.',
  },
  {
    question: 'How much should I charge per appliance for PAT testing?',
    answer:
      'For bulk PAT testing (offices, schools, landlord properties with many appliances), the standard rate is £1 to £3 per item. For smaller jobs with fewer than 20 appliances, an hourly rate of £60 to £120 per hour is more appropriate because the setup and travel time is the same regardless of the number of items. Some electricians offer tiered pricing: for example, £2.50 per item for the first 50, £1.50 per item for 51 to 200, and £1.00 per item for 201+. Always factor in your travel time, the time to label each appliance, and the time to produce the register and certificates.',
  },
  {
    question: 'What is the difference between initial verification and periodic inspection?',
    answer:
      'Initial verification is the testing and certification carried out when a new installation or alteration is completed. It confirms the work meets BS 7671 before being put into service and results in an Electrical Installation Certificate (EIC) or Minor Works Certificate. Periodic inspection is the regular re-testing of an existing installation to check it remains safe. It results in an Electrical Installation Condition Report (EICR). Initial verification is the responsibility of the installing electrician. Periodic inspection can be carried out by any competent person scheme registered electrician.',
  },
  {
    question: 'How often does an installation need periodic inspection?',
    answer:
      'The recommended maximum intervals for periodic inspection are set out in BS 7671 and IET Guidance Note 3. For domestic properties, the interval is every 10 years (or on change of occupancy). For privately rented properties, the Electrical Safety Standards Regulations 2020 require an EICR every 5 years. For commercial premises, the typical interval is 5 years. For industrial installations, it is 3 years. Swimming pools, caravan parks, and other special locations have shorter intervals. The inspector may also recommend a shorter interval based on the condition of the installation.',
  },
  {
    question: 'Should I charge separately for the EICR report or include it in the testing price?',
    answer:
      'The EICR report is the product — it is what the client is paying for. Your price should cover the inspection, testing, and report production. Never separate the report from the inspection in your pricing as it devalues your service. However, you should separate remedial work from the inspection. The EICR tells the client what is wrong; the remedial quote tells them what it costs to fix. Presenting both together maximises your chance of winning the remedial work.',
  },
  {
    question: 'Is PAT testing a legal requirement in the UK?',
    answer:
      'PAT testing is not specifically required by law, but the Electricity at Work Regulations 1989 require that all electrical equipment used in the workplace is maintained in a safe condition. PAT testing is the most common way to demonstrate compliance with this requirement. The Health and Safety Executive (HSE) states that employers must ensure equipment is safe but does not mandate a specific method or frequency. In practice, most businesses, landlords, and public buildings carry out PAT testing annually or biennially to satisfy their duty of care and insurance requirements.',
  },
  {
    question: 'How does Elec-Mate help with electrical testing and certification?',
    answer:
      'Elec-Mate provides 8 digital certificate types (EICR, EIC, Minor Works, PAT Testing, EV Charger, Emergency Lighting, Fire Alarm, and Solar PV), 70 electrical calculators built to BS 7671, an AI board scanner that pre-fills board data from a photo, voice test entry so you can dictate results hands-free, and 8 AI agents that answer regulation questions on site. The result is faster testing, faster report completion, and no post-site paperwork. Most electricians save 30 to 45 minutes per certificate.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanner and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-cost-uk',
    title: 'EICR Cost UK 2026',
    description:
      'Detailed EICR pricing by property type — flats, houses, HMOs, and commercial premises.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/pat-testing-guide-uk',
    title: 'PAT Testing Guide',
    description:
      'Complete guide to PAT testing in the UK — regulations, classes, testing procedures, and labelling.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-test',
    title: 'Insulation Resistance Testing',
    description:
      'How to carry out insulation resistance testing to BS 7671 with test voltages and pass/fail values.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description: 'The correct order for dead and live testing as required by BS 7671 and GN3.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-price-electrical-jobs',
    title: 'How to Price Electrical Jobs',
    description:
      'Framework for pricing all types of electrical work — labour, materials, overheads, and profit margin.',
    icon: BarChart3,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'testing-overview',
    heading: 'Electrical Testing Cost in the UK: 2026 Overview',
    content: (
      <>
        <p>
          Electrical testing is a core revenue stream for UK electricians. Whether you specialise in
          periodic inspection, initial verification, or{' '}
          <SEOInternalLink href="/guides/pat-testing-guide-uk">PAT testing</SEOInternalLink>,
          getting your pricing right is the difference between profitable work and burning out on
          thin margins.
        </p>
        <p>
          The testing market has grown significantly since the Electrical Safety Standards in the
          Private Rented Sector (England) Regulations 2020 made EICRs a legal requirement for all
          privately rented properties. With approximately 4.4 million private rented households in
          England, demand for{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR certificates</SEOInternalLink> is
          substantial and recurring.
        </p>
        <p>
          This guide covers every type of electrical testing cost — EICR pricing by property size,
          PAT testing rates, initial verification fees, and periodic inspection costs for both
          domestic and commercial installations. All prices reflect 2026 UK market rates.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-pricing',
    heading: 'EICR Pricing by Property Size',
    content: (
      <>
        <p>
          EICR pricing varies by property size, number of circuits, number of distribution boards,
          and the age and condition of the installation. The prices below are for the inspection and
          report only — remedial work is additional.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Home className="w-6 h-6 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">1-Bedroom Flat</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-sm text-white mb-1">Price Range</div>
                <div className="text-xl font-bold text-yellow-400">£120 — £180</div>
              </div>
              <div>
                <div className="text-sm text-white mb-1">Circuits</div>
                <div className="text-xl font-bold text-white">4 — 8</div>
              </div>
              <div>
                <div className="text-sm text-white mb-1">Time on Site</div>
                <div className="text-xl font-bold text-white">1.5 — 2.5 hrs</div>
              </div>
            </div>
            <p className="text-white text-sm leading-relaxed">
              The quickest domestic EICR. A single consumer unit with few circuits means testing is
              fast. Be cautious with older conversion flats that may have shared circuits or
              inadequate earthing.
            </p>
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Home className="w-6 h-6 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">3-Bedroom House</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-sm text-white mb-1">Price Range</div>
                <div className="text-xl font-bold text-yellow-400">£180 — £280</div>
              </div>
              <div>
                <div className="text-sm text-white mb-1">Circuits</div>
                <div className="text-xl font-bold text-white">8 — 14</div>
              </div>
              <div>
                <div className="text-sm text-white mb-1">Time on Site</div>
                <div className="text-xl font-bold text-white">2.5 — 4 hrs</div>
              </div>
            </div>
            <p className="text-white text-sm leading-relaxed">
              The bread-and-butter of landlord EICRs. Extensions, loft conversions, and outbuilding
              supplies often add a second distribution board, pushing prices towards the higher end.
            </p>
          </div>

          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">HMO / Commercial</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-sm text-white mb-1">Price Range</div>
                <div className="text-xl font-bold text-yellow-400">£250 — £2,000+</div>
              </div>
              <div>
                <div className="text-sm text-white mb-1">Circuits</div>
                <div className="text-xl font-bold text-white">15 — 100+</div>
              </div>
              <div>
                <div className="text-sm text-white mb-1">Time on Site</div>
                <div className="text-xl font-bold text-white">Half day — multiple days</div>
              </div>
            </div>
            <p className="text-white text-sm leading-relaxed">
              HMOs and commercial premises are the highest-value EICRs. Multiple boards, specialist
              circuits, three-phase supplies, and coordination with tenants or business operations
              all justify premium pricing. Large commercial installations are typically priced on a
              day rate of £300 to £500.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="AI Board Scanner pre-fills EICR data from a photo"
          description="Point your phone at the consumer unit. Elec-Mate reads MCB/RCBO ratings, circuit details, and board layout — so the EICR starts half-complete before you pick up a test instrument."
          icon={Camera}
        />
      </>
    ),
  },
  {
    id: 'pat-testing-rates',
    heading: 'PAT Testing Rates in 2026',
    content: (
      <>
        <p>
          <SEOInternalLink href="/guides/pat-testing-guide-uk">PAT testing</SEOInternalLink> is
          commonly priced per item for bulk work or per hour for smaller jobs. The pricing model you
          choose depends on the number of appliances and the client type.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-sm font-semibold text-white">Pricing Model</th>
                  <th className="p-4 text-sm font-semibold text-yellow-400 text-right">Rate</th>
                  <th className="p-4 text-sm font-semibold text-white">Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    model: 'Per item (bulk)',
                    rate: '£1 — £3',
                    best: 'Offices, schools, landlords with 50+ items',
                  },
                  {
                    model: 'Per item (small job)',
                    rate: '£3 — £5',
                    best: 'Small businesses with 10 — 30 items',
                  },
                  {
                    model: 'Hourly rate',
                    rate: '£60 — £120/hr',
                    best: 'Mixed jobs under 20 items',
                  },
                  {
                    model: 'Day rate',
                    rate: '£300 — £500/day',
                    best: 'Large sites, factories, universities',
                  },
                ].map((row, i) => (
                  <tr key={row.model} className={i < 3 ? 'border-b border-white/5' : ''}>
                    <td className="p-4 text-sm text-white">{row.model}</td>
                    <td className="p-4 text-sm text-yellow-400 font-semibold text-right">
                      {row.rate}
                    </td>
                    <td className="p-4 text-sm text-white">{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p>
          PAT testing can be a profitable add-on service when offered alongside EICR inspections. A
          landlord who needs an EICR on a rented property often also needs PAT testing on appliances
          provided with the tenancy. Offering both in a single visit reduces travel time and
          increases your revenue per job.
        </p>
      </>
    ),
  },
  {
    id: 'initial-verification',
    heading: 'Initial Verification and EIC Costs',
    content: (
      <>
        <p>
          Initial verification is the testing and certification carried out when a new electrical
          installation or alteration is completed. It results in an{' '}
          <SEOInternalLink href="/guides/electrical-certificate-types-uk">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          or a Minor Works Certificate, depending on the scope of work.
        </p>
        <p>
          For most electricians, the cost of initial verification is built into the installation
          price. You do not quote separately for the EIC — it is part of the job. However, there are
          situations where standalone initial verification is needed:
        </p>
        <div className="space-y-4 my-4">
          {[
            {
              title: 'New build sign-off',
              description:
                'A building control body or approved inspector may require an EIC from a registered competent person. If the installing electrician is not scheme-registered, a separate inspector must be engaged. Typical cost: £150 to £400 depending on property size.',
            },
            {
              title: 'Third-party verification',
              description:
                'Some clients, contractors, or local authorities require initial verification by an independent third party (not the installing electrician). This adds a layer of quality assurance. Typical cost: £200 to £500.',
            },
            {
              title: 'Commercial handover',
              description:
                'Large commercial installations often require initial verification documentation as part of the handover package. This may include full schedule of test results, circuit charts, as-built drawings, and the EIC. Typical cost: included in the contract sum.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-5"
            >
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'periodic-inspection',
    heading: 'Periodic Inspection Fees and Intervals',
    content: (
      <>
        <p>
          Periodic inspection (EICR) frequencies are recommended by BS 7671 and{' '}
          <SEOInternalLink href="/guides/bs7671-18th-edition-guide">
            IET Guidance Note 3
          </SEOInternalLink>
          . The required interval affects how often clients need your services and therefore how you
          build long-term relationships.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-sm font-semibold text-white">Installation Type</th>
                  <th className="p-4 text-sm font-semibold text-yellow-400 text-right">
                    Max Interval
                  </th>
                  <th className="p-4 text-sm font-semibold text-white">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    type: 'Domestic (owner-occupied)',
                    interval: '10 years',
                    notes: 'Or on change of occupancy',
                  },
                  {
                    type: 'Private rented',
                    interval: '5 years',
                    notes: 'Legal requirement since 2020',
                  },
                  {
                    type: 'Commercial',
                    interval: '5 years',
                    notes: 'Insurance may require shorter',
                  },
                  {
                    type: 'Industrial',
                    interval: '3 years',
                    notes: 'Harsh environments may need more',
                  },
                  {
                    type: 'Swimming pools',
                    interval: '1 year',
                    notes: 'Special location requirements',
                  },
                  {
                    type: 'Caravan parks',
                    interval: '1 year',
                    notes: 'Seasonal inspection common',
                  },
                ].map((row, i) => (
                  <tr key={row.type} className={i < 5 ? 'border-b border-white/5' : ''}>
                    <td className="p-4 text-sm text-white">{row.type}</td>
                    <td className="p-4 text-sm text-yellow-400 font-semibold text-right">
                      {row.interval}
                    </td>
                    <td className="p-4 text-sm text-white">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p>
          Building a client base of landlords, letting agents, and commercial property managers who
          need periodic inspections at regular intervals creates a predictable, recurring income
          stream. Track inspection due dates using Elec-Mate and proactively contact clients before
          their next EICR is due.
        </p>
      </>
    ),
  },
  {
    id: 'pricing-your-testing',
    heading: 'How to Price Your Testing Work Profitably',
    content: (
      <>
        <p>
          The most common mistake electricians make with testing work is undercharging because they
          fail to account for the full cost of their time. The testing itself is only part of the
          job — you also need to factor in travel, report completion, and administration.
        </p>
        <div className="space-y-4 my-4">
          {[
            {
              title: 'Calculate your true hourly rate',
              description:
                'Add up all your annual costs (van, insurance, tools, calibration, scheme membership, software, training, tax) and divide by your billable hours (typically 1,400 to 1,600 per year). Add a 20 to 40% profit margin. Most experienced electricians in 2026 should target £45 to £65/hr outside London, or £55 to £80/hr in the South East.',
            },
            {
              title: 'Include every minute of the job',
              description:
                'A 3-hour EICR is not a 3-hour job. Add travel time (30 to 60 minutes each way), report completion (30 to 90 minutes if done manually), and admin (booking, confirmation, sending the report). A "3-hour" EICR often consumes 5 to 6 hours of your day when done manually.',
            },
            {
              title: 'Eliminate post-site paperwork',
              description:
                'This is the single biggest way to increase profitability. If you save 45 minutes per certificate by completing everything on site with Elec-Mate, and you do 3 certificates per week, that is over 100 hours recovered per year — worth £5,000+ at a £50/hr rate.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-5"
            >
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SEOAppBridge
          title="Complete certificates on site, not at home"
          description="Elec-Mate's voice test entry, AI board scanner, and instant PDF delivery mean you leave site with the certificate done, the quote sent, and the invoice raised. No desk time, no double-handling."
          icon={Receipt}
        />
      </>
    ),
  },
  {
    id: 'tools-that-save-time',
    heading: 'Elec-Mate Tools That Save Testing Time',
    content: (
      <>
        <p>
          Every minute saved on a testing job is a minute you can spend on the next one. Elec-Mate
          is built to eliminate the administrative overhead of electrical testing and certification.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Board Scanner</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photograph the consumer unit and the AI reads MCB/RCBO ratings, circuit details,
                  and board layout. The{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> starts
                  pre-filled with board data — saving 15 to 30 minutes per inspection.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">70 Electrical Calculators</h4>
                <p className="text-white text-sm leading-relaxed">
                  Zs verification, prospective fault current, voltage drop, cable sizing,{' '}
                  <SEOInternalLink href="/guides/insulation-resistance-test">
                    insulation resistance
                  </SEOInternalLink>
                  , and dozens more. All built to BS 7671:2018+A3:2024.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">8 Certificate Types</h4>
                <p className="text-white text-sm leading-relaxed">
                  EICR, EIC, Minor Works, PAT Testing, EV Charger, Emergency Lighting, Fire Alarm,
                  and Solar PV. All digitally signed with PDF export and instant delivery by email
                  or WhatsApp.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Defect Code AI</h4>
                <p className="text-white text-sm leading-relaxed">
                  Describe a defect in plain English and the AI returns the correct{' '}
                  <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                    observation code
                  </SEOInternalLink>{' '}
                  with the matching BS 7671 regulation number. No more flicking through GN3.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalTestingCostUKPage() {
  return (
    <GuideTemplate
      title="Electrical Testing Cost UK 2026 | EICR & PAT Prices"
      description="Complete guide to electrical testing costs in the UK for 2026. EICR pricing by property size, PAT testing rates, initial verification fees, periodic inspection costs, and how to price your testing work profitably."
      datePublished="2025-06-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Pricing Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Electrical Testing Cost UK 2026:{' '}
          <span className="text-yellow-400">EICR and PAT Prices</span>
        </>
      }
      heroSubtitle="How much should you charge for EICRs, PAT testing, initial verification, and periodic inspections in 2026? This guide covers every type of electrical testing cost in the UK, with pricing tables by property size and practical advice on maximising your testing profitability."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Testing Costs"
      relatedPages={relatedPages}
      ctaHeading="Earn more from every testing job"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to complete certificates on site, generate remedial quotes, and eliminate post-site paperwork. 7-day free trial, cancel anytime."
    />
  );
}
