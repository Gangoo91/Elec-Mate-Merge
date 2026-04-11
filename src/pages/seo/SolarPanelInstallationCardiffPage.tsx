import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Sun,
  PoundSterling,
  Zap,
  ShieldCheck,
  ClipboardCheck,
  TrendingUp,
  Home,
  FileCheck2,
  Leaf,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Solar Guides', href: '/guides/solar-panel-installation' },
  { label: 'Solar Panel Installation Cardiff', href: '/solar-panel-installation-cardiff' },
];

const tocItems = [
  { id: 'overview', label: 'Solar in Cardiff & Wales' },
  { id: 'welsh-grants', label: 'Welsh Government Grants' },
  { id: 'costs', label: 'Installation Costs 2025' },
  { id: 'savings', label: 'Savings & Payback Period' },
  { id: 'smart-export', label: 'Smart Export Guarantee' },
  { id: 'planning', label: 'Planning & Conservation Areas' },
  { id: 'regulations', label: 'Regulations & MCS Certification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "Cardiff and South Wales benefit from the Warm Homes Programme — the Welsh Government's flagship energy efficiency scheme that can provide free or subsidised solar PV for eligible households on low incomes or benefits.",
  'A typical 4kWp solar PV system in Cardiff costs £6,000 to £9,000 installed. Cardiff receives approximately 3.4 to 3.7 peak sun hours per day — comparable to Bristol and the South West.',
  'Solar installations in Cardiff conservation areas (including Pontcanna, Cathedral Road, and Roath Park) require prior approval from Cardiff Council. Listed building consent may be required for listed properties.',
  'The Smart Export Guarantee pays Cardiff homeowners for electricity exported to the grid. Top SEG tariffs in 2025 range from 10p to 24p per kWh, earning £150 to £430 per year for a 4kWp system.',
  'All solar PV installations must be MCS-certified and comply with BS 7671:2018+A3:2024. The connection to the consumer unit is notifiable work under Part P (Building Regulations for England) — but in Wales, Building Regulations Part L applies.',
];

const faqs = [
  {
    question: 'Are there Welsh Government grants for solar panels in Cardiff?',
    answer:
      "Yes. The Welsh Government's Warm Homes Programme (delivered by local councils and registered social landlords) offers free or heavily subsidised energy efficiency improvements including solar PV for eligible households. Eligibility is based on income, benefit receipt, and property energy rating. Cardiff residents should contact Cardiff Council or visit the Welsh Government's Warm Homes portal. The Nest scheme (delivered by Swalec/Welsh Government) also provides free measures for households in or at risk of fuel poverty.",
  },
  {
    question: 'How much does solar panel installation cost in Cardiff?',
    answer:
      'In Cardiff, a typical 4kWp solar PV system costs between £6,000 and £9,000 fully installed, including panels, inverter, mounting, and electrical connection. This includes 0% VAT (applicable since April 2022). Smaller 3kWp systems start at around £4,500 to £6,000, while larger 6kWp systems with battery storage can cost £12,000 to £18,000. Cardiff labour rates are broadly in line with the national average — slightly below London but above rural Wales.',
  },
  {
    question: 'Does solar work well in Cardiff?',
    answer:
      "Yes. Cardiff benefits from its position in South Wales, which receives more sunshine than most of England north of Bristol. Cardiff averages approximately 3.4 to 3.7 peak sun hours per day annually. A 4kWp system in Cardiff typically generates 3,800 to 4,200 kWh per year — enough to cover 80 to 100% of an average Welsh household's electricity consumption.",
  },
  {
    question: 'Do I need planning permission for solar panels in Cardiff?',
    answer:
      "In most cases, no. Residential solar panels are permitted development under the Town and Country Planning (General Permitted Development) Order 1995 (as amended for Wales). However, properties in Cardiff's conservation areas (including Pontcanna, Cathedral Road, Roath Park, and parts of Whitchurch) may require prior approval. Listed buildings require listed building consent. Always check with Cardiff Planning Department if your property is in a conservation area or is listed.",
  },
  {
    question: 'What is the Warm Homes Programme and how do I apply in Cardiff?',
    answer:
      "The Warm Homes Programme is the Welsh Government's energy efficiency scheme replacing the previous Nest and Arbed schemes. It offers free energy efficiency improvements — potentially including solar PV — to households that are fuel poor or at risk of fuel poverty. Eligibility depends on income, benefit receipt, and your home's EPC rating. Cardiff residents can apply via Cardiff Council's housing energy team or the Welsh Government's Warm Homes portal. The scheme is delivered through Local Area Co-ordinators in each county.",
  },
  {
    question: 'Which DNO covers Cardiff and what notification is required?',
    answer:
      'Cardiff and South Wales are covered by National Grid Electricity Distribution (formerly Western Power Distribution). G98 notification is required for systems up to 3.68kW per phase — this is handled by your MCS-certified installer within 28 days of installation. Larger systems (over 3.68kW) require G99 formal approval, which typically takes two to eight weeks. Your installer should submit the G99 application before installation begins.',
  },
  {
    question: 'Do Welsh Building Regulations differ from English regulations for solar?',
    answer:
      'Wales has its own Building Regulations, which broadly mirror those of England but are administered separately. Solar PV electrical work in Wales must comply with the Building Regulations 2010 (as applied in Wales), including Part L (conservation of fuel and power) and the electrical safety requirements. Competent Person Schemes (NICEIC, NAPIT, ELECSA) operate across Wales as in England. BS 7671:2018+A3:2024 applies equally in Wales as the wiring regulations standard.',
  },
  {
    question: 'Is battery storage worth it in Cardiff?',
    answer:
      'Battery storage can significantly improve the economics of a Cardiff solar installation by increasing self-consumption from around 30 to 50% to 70 to 90%. At current electricity prices of 30 to 40p per kWh, a 10kWh battery saving 2,000 additional kWh per year yields £600 to £800 extra annual savings. At a battery cost of £3,000 to £5,000, the battery-specific payback is 5 to 8 years — reasonable given battery warranties of 10 years and system life of 25+ years.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/solar-panel-installation-leeds',
    title: 'Solar Panel Installation Leeds',
    description: 'Solar PV costs, savings, and MCS requirements for Leeds and Yorkshire.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/solar-panel-installation-sheffield',
    title: 'Solar Panel Installation Sheffield',
    description: 'Solar PV installation guide for Sheffield and South Yorkshire.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/guides/ev-charging-installation',
    title: 'EV Charger Installation',
    description: 'Home EV charger installation costs, grants, and regulations.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote solar PV and EV charger jobs on your phone with instant PDF.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR requirements, compliance deadlines, and penalties.',
    icon: Home,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Solar Panel Installation in Cardiff and Wales',
    content: (
      <>
        <p>
          Cardiff and the surrounding Vale of Glamorgan and Rhondda Cynon Taf areas are among the
          fastest-growing solar markets in Wales. South Wales receives more sunshine than most of
          northern England, and the Welsh Government's active energy efficiency programme makes
          Cardiff an attractive location for solar investment.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cardiff's solar resource</strong> — Cardiff receives approximately 1,250 to
                1,350 peak sun hours per year, generating 950 to 1,100 kWh per kWp installed
                annually. A 4kWp system in Cardiff typically produces 3,800 to 4,400 kWh per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Welsh net zero ambitions</strong> — Wales has committed to reach net zero by
                2050 under the Environment (Wales) Act 2016. The Welsh Government's Future Wales
                National Plan 1 specifically supports renewable energy generation, and local
                planning authorities in Cardiff are supportive of residential solar PV.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cardiff housing stock</strong> — Cardiff's mix of Victorian terraces
                (Pontcanna, Roath, Canton), Edwardian semis, and modern new builds all present solar
                opportunities. The city's rapid population growth and new-build development has
                increased demand for integrated solar installations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'welsh-grants',
    heading: 'Welsh Government Grants and Schemes',
    content: (
      <>
        <p>
          Wales has distinct energy support schemes that differ from those available in England.
          Cardiff homeowners should investigate these Welsh-specific routes before paying full price
          for a solar installation.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warm Homes Programme</strong> — the Welsh Government's primary energy
                efficiency scheme, replacing the previous Nest and Arbed schemes. Provides free
                energy efficiency measures, potentially including solar PV, for households in fuel
                poverty or at risk. Cardiff Council administers this locally. Contact Cardiff's
                housing energy team or visit warminwales.co.uk to check eligibility.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECO4 (UK-wide)</strong> — the Energy Company Obligation scheme operates in
                Wales as in England. Households receiving qualifying benefits (Universal Credit,
                Child Tax Credit, Pension Credit, etc.) may qualify for free solar panels as part of
                an ECO4 package. Local energy charities in Cardiff can help households navigate
                applications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>0% VAT on solar installations</strong> — applicable across the UK since
                April 2022. On an £8,000 Cardiff installation, this saves £1,600 compared to
                pre-2022 prices. Ensure your installer applies 0% VAT on the invoice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Optimised Retrofit Programme</strong> — a Welsh Government programme
                supporting whole-house retrofit including solar PV in social housing and some
                private homes. Delivered through local authorities and registered social landlords
                in Cardiff.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Grant availability changes frequently. Cardiff residents should check with Cardiff
          Council's housing team and the Welsh Government's energy efficiency portal for the most
          current information before commissioning a solar installation.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Solar Panel Installation Costs in Cardiff (2025)',
    content: (
      <>
        <p>
          Cardiff installation costs are broadly in line with the national average. Labour costs are
          generally lower than London and the South East but higher than rural Wales.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3kWp system</strong> — £4,500 to £6,500. Suitable for smaller Cardiff
                terraces or households with limited roof space. Typically 8 to 10 panels.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4kWp system</strong> — £6,000 to £9,000. The most popular size for a
                three-bedroom Cardiff semi or terrace. Typically 10 to 13 panels.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6kWp system</strong> — £9,500 to £14,000. Suitable for larger properties or
                homes with heat pumps and EVs. Typically 15 to 18 panels.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery storage</strong> — £2,500 to £5,000 for a 5 to 10kWh unit. Popular
                choices in Cardiff include Givenergy, Tesla Powerwall, and Solax. Increasingly
                bundled with solar at a reduced combined price.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Victorian Cardiff terraces in Roath, Canton, and Pontcanna may incur additional costs for
          slate roof mounting and scaffolding. Conservation area restrictions can also add planning
          costs. Always obtain at least three quotes from MCS-certified Cardiff installers.
        </p>
      </>
    ),
  },
  {
    id: 'savings',
    heading: 'Savings and Payback Period for Cardiff Homes',
    content: (
      <>
        <p>
          Cardiff's slightly higher solar yield compared to northern England improves financial
          returns. Combined with the SEG and current electricity prices, solar PV is a compelling
          investment for most Cardiff homeowners.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual generation (4kWp, Cardiff)</strong> — 3,800 to 4,400 kWh per year.
                Consuming 50% on site saves approximately £570 to £880 per year at 30 to 40p per
                kWh.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>SEG export income</strong> — exporting 50% at an average of 10p per kWh
                earns approximately £190 to £220 per year. Higher SEG tariffs can double this.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total annual benefit</strong> — £760 to £1,100 per year. Payback period of 6
                to 10 years on a £8,000 installation. Systems typically last 25 to 30 years,
                providing 15 to 20 years of returns after payback.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Property value uplift</strong> — research by Zoopla and the Energy Saving
                Trust suggests solar panels can add 1 to 4% to property values in Wales — up to
                £6,000 to £12,000 on an average Cardiff home.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'smart-export',
    heading: 'Smart Export Guarantee for Cardiff Homeowners',
    content: (
      <>
        <p>
          The SEG operates identically in Wales as in England. Cardiff homeowners with MCS-certified
          solar PV systems can register with any obligated SEG supplier, regardless of who supplies
          their electricity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Current best rates (2025)</strong> — Octopus Outgoing Agile (time-of-use, up
                to 24p at peak), E.ON Next Drive Export (up to 15p), Ovo Greener Energy Export
                (around 12p). Rates change regularly — compare at Ofgem's SEG register.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart meter requirement</strong> — to claim SEG payments, you need a smart
                meter. National Grid Electricity Distribution (covering South Wales) installs smart
                meters for free. Contact your electricity supplier to arrange installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Combining with time-of-use tariffs</strong> — pairing an SEG export tariff
                with a time-of-use import tariff (such as Octopus Go or Agile) allows Cardiff solar
                owners to charge batteries cheaply overnight and export at peak daytime prices —
                maximising both self-consumption and export income.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'planning',
    heading: 'Planning Permission and Conservation Areas in Cardiff',
    content: (
      <>
        <p>
          Cardiff has a number of conservation areas and a significant stock of listed buildings
          where permitted development rights for solar panels may be restricted or removed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cardiff conservation areas</strong> — include Pontcanna, Cathedral Road,
                Roath Park, Whitchurch Village, Llandaff, and parts of the city centre. Permitted
                development rights for solar panels may be limited in these areas. Prior approval
                from Cardiff Council's Planning Department may be required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed buildings</strong> — Cardiff has numerous listed buildings,
                particularly in Pontcanna, Cathays, and the Victorian terraces of Canton. Listed
                building consent is required for solar panel installation on or within the curtilage
                of a listed building. Consent may be granted for discreet rear-facing installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flat roofs</strong> — ground-mounted or flat-roof installations are treated
                differently to sloped roof installations. Panels on flat roofs should not be visible
                from a public road to benefit from permitted development rights.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technical requirement</strong> — panels must not protrude more than 200mm
                from the roof plane and must be removed when no longer needed. The installation must
                not result in the total area of panels exceeding the total area of the roof surface
                from which they protrude.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Cardiff Council's planning portal allows you to check whether your property is in a
          conservation area. When in doubt, submit a pre-application enquiry — Cardiff Council's
          planning team is generally supportive of solar applications where they are appropriately
          sited.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and MCS Certification in Wales',
    content: (
      <>
        <p>
          Solar PV installations in Cardiff must comply with Welsh Building Regulations, BS 7671,
          and the MCS installation standards. Wales operates its own Building Regulations framework.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Welsh Building Regulations</strong> — solar PV electrical work in Cardiff
                must comply with the Building Regulations 2010 (as applied in Wales). Part L
                (conservation of fuel and power) applies and actively supports solar PV. Electrical
                work must be self-certified by a registered competent person or notified to the
                local building control authority.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS certification</strong> — the Microgeneration Certification Scheme is
                required for SEG eligibility and most Welsh Government grant schemes. Check that
                your installer is MCS-certified at mcs.org.uk.{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                governs all electrical work including inverter connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DNO (Distribution Network Operator)</strong> — National Grid Electricity
                Distribution (NGED, formerly Western Power Distribution) covers South Wales. G98
                notification is handled by your installer for systems up to 3.68kW. G99 approval for
                larger systems should begin well before installation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Solar PV Work in Cardiff and Wales',
    content: (
      <>
        <p>
          Cardiff's combination of Welsh Government grant programmes, growing new-build market, and
          renovation activity in the city's Victorian terrace stock creates substantial demand for
          MCS-certified solar PV installers. Welsh-speaking electricians have an additional
          advantage when working with local authority and housing association contracts.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote with Welsh Grant Information</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to produce professional solar PV quotes that include Welsh Government grant
                  eligibility notes, SEG earnings projections, and estimated payback periods — all
                  in a branded PDF sent before leaving the property.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Leaf className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Warm Homes Programme Opportunity</h4>
                <p className="text-white text-sm leading-relaxed">
                  MCS-certified installers registered with the Warm Homes Programme can access a
                  steady pipeline of funded solar PV work across Cardiff. Contact Cardiff Council's
                  housing energy team to register as an approved contractor.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your solar installation business in Cardiff with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate to quote solar PV jobs, manage MCS certificates, and run their business from their phone. 7-day free trial."
          icon={Sun}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SolarPanelInstallationCardiffPage() {
  return (
    <GuideTemplate
      title="Solar Panel Installation Cardiff 2025 | Solar PV Wales"
      description="Complete guide to solar panel installation in Cardiff. Welsh Government grants (Warm Homes Programme), costs, SEG payments, planning rules for conservation areas, and MCS certification requirements."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Solar Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Solar Panel Installation Cardiff 2025:{' '}
          <span className="text-yellow-400">Welsh Grants, Costs & Solar PV Wales</span>
        </>
      }
      heroSubtitle="Everything Cardiff homeowners need to know about solar panel installation — Welsh Government grants via the Warm Homes Programme, costs from £4,500, SEG payments, conservation area planning rules, and finding an MCS-certified Cardiff installer."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar Panels in Cardiff"
      relatedPages={relatedPages}
      ctaHeading="Quote Solar PV Jobs in Cardiff on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate to quote solar PV installations, manage certificates, and grow their business across Wales. 7-day free trial, cancel anytime."
    />
  );
}
