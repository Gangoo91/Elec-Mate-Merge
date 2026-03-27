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
  AlertTriangle,
  Leaf,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Solar Guides', href: '/guides/solar-panel-installation' },
  { label: 'Solar Panel Installation Leeds', href: '/solar-panel-installation-leeds' },
];

const tocItems = [
  { id: 'overview', label: 'Solar in Leeds & Yorkshire' },
  { id: 'costs', label: 'Installation Costs 2025' },
  { id: 'savings', label: 'Savings & Payback Period' },
  { id: 'grants', label: 'Grants & Incentives' },
  { id: 'smart-export', label: 'Smart Export Guarantee' },
  { id: 'system-design', label: 'System Design for Yorkshire' },
  { id: 'regulations', label: 'Regulations & MCS Certification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A typical 4kWp solar PV system in Leeds costs £6,000 to £9,000 installed, with payback periods of 7 to 11 years depending on energy usage and export tariff.',
  'Yorkshire receives an average of 3.2 to 3.5 peak sun hours per day, making solar PV a viable investment despite the North of England\'s reputation for cloud cover.',
  'The Smart Export Guarantee (SEG) requires energy suppliers with 150,000+ customers to pay for electricity exported to the grid. Rates range from 1p to 24p per kWh depending on the supplier.',
  'All solar PV installations must be carried out by an MCS-certified installer. MCS certification is required to claim SEG payments and access most grant schemes.',
  'Battery storage is increasingly popular in Yorkshire, adding £2,500 to £5,000 to installation cost but significantly improving self-consumption and reducing reliance on grid electricity.',
];

const faqs = [
  {
    question: 'How much does solar panel installation cost in Leeds?',
    answer:
      'In Leeds, a typical 4kWp solar PV system costs between £6,000 and £9,000 fully installed, including panels, inverter, mounting system, and electrical work. Smaller 3kWp systems start at around £5,000, while larger 6kWp systems can reach £10,000 to £14,000. Battery storage adds £2,500 to £5,000. Prices vary depending on roof type, access, system complexity, and installer. Always obtain at least three quotes from MCS-certified installers.',
  },
  {
    question: 'Does solar work well in Leeds given the Yorkshire weather?',
    answer:
      'Yes. Leeds and West Yorkshire receive approximately 3.2 to 3.5 peak sun hours per day annually — less than London (3.8) but comparable to many German regions where solar PV has been highly successful for decades. Modern monocrystalline panels perform well in diffuse light conditions. A 4kWp system in Leeds typically generates 3,200 to 3,800 kWh per year, covering 75 to 100% of an average household\'s electricity needs.',
  },
  {
    question: 'Are there any grants for solar panels in Leeds?',
    answer:
      'There are currently no universal government grants for residential solar PV in England. However, several routes exist: the Great British Insulation Scheme and ECO4 scheme can fund solar for eligible low-income households; local authority grants are occasionally available through West Yorkshire Combined Authority and Leeds City Council; and the 0% VAT rate on residential solar installations (since April 2022) effectively provides a 20% saving. Always check current schemes as availability changes.',
  },
  {
    question: 'What is the Smart Export Guarantee and how much will I earn in Leeds?',
    answer:
      'The Smart Export Guarantee (SEG) is a government-mandated scheme requiring large energy suppliers to pay households for electricity exported to the grid. Rates vary by supplier from around 1p to 24p per kWh. A Leeds household with a 4kWp system typically exports 1,200 to 1,800 kWh per year, earning £120 to £430 annually depending on the tariff. Octopus Energy, E.ON Next, and Ovo Energy have historically offered competitive SEG rates.',
  },
  {
    question: 'Do I need planning permission for solar panels in Leeds?',
    answer:
      'In most cases, no. Solar panels on residential properties in Leeds are permitted development under Schedule 2, Part 14, Class A of the Town and Country Planning (General Permitted Development) (England) Order 2015, provided they do not protrude more than 200mm from the roof surface and the property is not in a conservation area or a listed building. Conservation areas in Leeds include Headingley, Chapel Allerton, and parts of the city centre — check with Leeds City Council if your property is affected.',
  },
  {
    question: 'How long does solar panel installation take in Leeds?',
    answer:
      'A standard residential solar PV installation in Leeds takes one to two days for a straightforward roof installation. This includes mounting the racking system, fitting the panels, installing the inverter, and connecting to the consumer unit. DNO (National Grid Electricity Distribution in Yorkshire) notification is required for systems over 3.68kW and can add two to four weeks for G99 approval before commissioning. Your MCS-certified installer should handle DNO notification as part of the installation.',
  },
  {
    question: 'What size solar system do I need for my Leeds home?',
    answer:
      'The right system size depends on your energy consumption, roof space, and budget. A typical Leeds household using 3,500 kWh per year is well suited to a 4kWp system (10 to 14 panels). Homes with electric vehicles or heat pumps benefit from larger 6 to 10kWp systems. East or west-facing roofs are viable but generate around 15 to 20% less than a south-facing 30° pitch. Your MCS-certified installer should carry out a full site survey and shading analysis before sizing the system.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/solar-panel-installation-cardiff',
    title: 'Solar Panel Installation Cardiff',
    description: 'Solar PV costs, Welsh Government grants, and MCS requirements in Cardiff.',
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
    heading: 'Solar Panel Installation in Leeds and Yorkshire',
    content: (
      <>
        <p>
          Leeds and the wider West Yorkshire region have seen rapid growth in residential solar PV
          installations over the past five years. Rising electricity prices, 0% VAT on solar
          installations, and improving panel technology have made solar PV a financially compelling
          investment for Yorkshire homeowners.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Yorkshire solar resource</strong> — Leeds receives approximately 1,100 to
                1,200 peak sun hours per year, sufficient to generate 900 to 1,050 kWh per kWp
                installed annually. A 4kWp system generates 3,600 to 4,200 kWh — enough to cover
                the majority of a typical household's electricity needs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Growing market</strong> — West Yorkshire Combined Authority and Leeds City
                Council have committed to ambitious net zero targets, with residential solar PV
                playing a key role. Installer capacity in the Leeds area has expanded significantly,
                increasing competition and reducing installation costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Carbon impact</strong> — a 4kWp solar system in Leeds avoids approximately
                1.0 to 1.2 tonnes of CO₂ per year, based on the current UK grid carbon intensity.
                Over a 25-year system life, this represents 25 to 30 tonnes of avoided emissions.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Yorkshire's mix of Victorian terraces, semi-detached inter-war homes, and modern new
          builds all offer solar opportunities. South-facing roofs at 30 to 40 degrees are optimal,
          but east or west-facing installations remain viable with modern high-efficiency panels.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Solar Panel Installation Costs in Leeds (2025)',
    content: (
      <>
        <p>
          Installation costs in Leeds are broadly in line with the national average, with some
          variation based on roof type, scaffolding requirements, and system complexity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3kWp system</strong> — £4,500 to £6,500. Suitable for smaller homes or
                limited roof space. Typically 8 to 10 panels.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4kWp system</strong> — £6,000 to £9,000. The most popular size for a
                three-bedroom semi-detached or terrace in Leeds. Typically 10 to 13 panels.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6kWp system</strong> — £9,000 to £14,000. Suits larger homes or those with
                EVs and heat pumps. Typically 15 to 18 panels.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery storage add-on</strong> — £2,500 to £5,000 for a 5 to 10kWh
                battery. Popular brands include Tesla Powerwall, Givenergy, and SolarEdge.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All prices include 0% VAT (since April 2022 under the Energy Saving Materials relief).
          Labour costs in Leeds are typically 10 to 15% lower than London but broadly comparable
          to other Northern English cities. Scaffolding on Yorkshire stone terraces or awkward roof
          pitches can add £400 to £800 to the total.
        </p>
      </>
    ),
  },
  {
    id: 'savings',
    heading: 'Savings and Payback Period',
    content: (
      <>
        <p>
          Financial returns from solar PV in Leeds come from two sources: reduced electricity bills
          (self-consumption) and Smart Export Guarantee (SEG) payments for exported electricity.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-consumption savings</strong> — a Leeds household consuming 50% of its
                solar generation (roughly 1,750 kWh on a 4kWp system) saves approximately £525
                to £700 per year at current electricity prices of 30 to 40p per kWh.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>SEG export income</strong> — exporting 50% of generation at an average SEG
                rate of 10p per kWh adds £175 to £210 per year. Higher SEG tariffs (up to 24p)
                can significantly increase this figure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Combined annual benefit</strong> — total financial benefit of £700 to
                £910 per year for a 4kWp system. This gives a payback period of approximately
                7 to 11 years on an £8,000 installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery impact</strong> — adding a battery increases self-consumption to
                75 to 90%, saving an additional £200 to £350 per year but adding 5 to 7 years to
                the overall payback period depending on battery cost.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'grants',
    heading: 'Grants and Incentives for Leeds Homeowners',
    content: (
      <>
        <p>
          England does not currently offer a universal residential solar grant, but several
          targeted schemes can help reduce upfront costs for eligible Leeds households.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>0% VAT on solar installations</strong> — the most universally accessible
                saving. Since April 2022, residential solar PV installations attract 0% VAT rather
                than 20%. On an £8,000 system this saves £1,600.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECO4 scheme</strong> — for low-income households receiving qualifying
                benefits, ECO4 can fund solar PV as part of a whole-home energy efficiency
                package. Contact Leeds City Council or an ECO4 registered installer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>West Yorkshire Combined Authority</strong> — periodically offers
                retrofit grants and low-interest green loans for energy improvements including
                solar. Check the West Yorkshire Retrofit programme for current availability.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Green mortgages and loans</strong> — several lenders offer preferential
                rates for energy improvements. Barclays, NatWest, and Nationwide have offered
                green additional borrowing products that can be used for solar installation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'smart-export',
    heading: 'Smart Export Guarantee (SEG) in Yorkshire',
    content: (
      <>
        <p>
          The Smart Export Guarantee replaced the Feed-in Tariff (FiT) in January 2020. Unlike
          the FiT, SEG rates are set competitively by each supplier rather than by government,
          so shopping around for the best tariff is important for Leeds solar owners.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Eligibility</strong> — your solar PV system must be MCS-certified and
                installed by an MCS-certified installer. You need an export smart meter (most
                Yorkshire homes now have these via Northern Powergrid).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Best rates (2025)</strong> — rates change frequently. As of 2025, top
                rates include Octopus Outgoing Agile (up to 24p per kWh at peak times), E.ON
                Next Drive Export (up to 15p), and OVO Greener Energy Export (around 12p). The
                minimum rate offered by obligated suppliers is typically 1p to 4p — always
                compare before signing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switching your SEG tariff</strong> — you can switch your SEG supplier
                independently of your import tariff. Many Leeds solar owners use a specialist
                export tariff with one supplier while buying electricity from another.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'system-design',
    heading: 'System Design Considerations for Yorkshire',
    content: (
      <>
        <p>
          Yorkshire's building stock and climate present specific considerations for solar PV
          system design that differ from southern England.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Yorkshire stone roofs</strong> — many Leeds properties have Yorkshire stone
                slate or clay pantile roofs. These require specialist mounting solutions and
                experienced roofers working alongside the solar installer. Factor in £300 to £500
                additional cost for stone roof installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shading analysis</strong> — urban Leeds has significant shading from
                chimneys, trees, and neighbouring properties. A professional shading analysis
                (using tools like PVGis or Solargis) is essential. Micro-inverters or power
                optimisers (DC-DC converters) can mitigate partial shading losses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Roof orientation</strong> — south-facing is optimal but east/west splits
                are increasingly common in Leeds terraces where rear roofs face varied directions.
                An east/west split generates around 15 to 20% less annually but produces a
                more even daily generation profile.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DNO notification</strong> — National Grid Electricity Distribution
                (NGED) covers Yorkshire. G98 notification (systems up to 3.68kW) is straightforward
                and handled by your installer. G99 applications (over 3.68kW) require formal
                approval and can take two to eight weeks. Plan installation timelines accordingly.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and MCS Certification',
    content: (
      <>
        <p>
          Solar PV installations in the UK must comply with several technical standards and
          regulatory requirements. MCS certification is non-negotiable for SEG eligibility and
          most grant schemes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS certification</strong> — the Microgeneration Certification Scheme
                (MCS) certifies both installers and products. Always check that your Leeds
                installer is MCS-certified at mcs.org.uk before agreeing a contract.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance</strong> — all electrical work must comply with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                (the IET Wiring Regulations). The connection of the solar inverter to the consumer
                unit is notifiable work under Building Regulations Part P and must be carried out
                by a competent person registered with a scheme such as NICEIC or NAPIT.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 engineering recommendation</strong> — the connection of solar PV
                to the low voltage distribution network must comply with ENA Engineering
                Recommendation G98 (systems up to 3.68kW per phase) or G99 (larger systems).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire safety</strong> — solar PV arrays on roofs must comply with the
                requirements of Approved Document B (Fire Safety) regarding access for firefighters.
                DC isolators must be installed and clearly labelled.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Solar PV Work in Leeds',
    content: (
      <>
        <p>
          The solar PV installation market in Leeds and West Yorkshire is growing rapidly. Qualified
          electricians with MCS certification can capture a significant share of this work,
          particularly as the market matures and homeowners seek electricians with broader
          electrical expertise alongside solar knowledge.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Solar Jobs Professionally</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to produce detailed, professional solar PV quotes on site. Include system size,
                  panel count, inverter specification, estimated generation, and SEG earnings
                  projections — all in a PDF you can send before leaving the property.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EV Charging Upsell</h4>
                <p className="text-white text-sm leading-relaxed">
                  Many Leeds solar customers also want EV chargers. A solar-integrated EV charger
                  (such as myenergi Zappi) maximises self-consumption and adds significant value.
                  Quoting both jobs together improves your conversion rate and average job value.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your solar installation business in Leeds with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate to quote solar PV and EV charger jobs, manage certificates, and run their business from their phone. 7-day free trial."
          icon={Sun}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SolarPanelInstallationLeedsPage() {
  return (
    <GuideTemplate
      title="Solar Panel Installation Leeds 2025 | Solar PV Yorkshire"
      description="Complete guide to solar panel installation in Leeds and West Yorkshire. Costs, savings, payback periods, grants, Smart Export Guarantee, MCS certification, and system design for Yorkshire homes."
      datePublished="2025-01-01"
      dateModified="2025-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Solar Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Solar Panel Installation Leeds 2025:{' '}
          <span className="text-yellow-400">Costs, Savings & Yorkshire Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about solar panel installation in Leeds and West Yorkshire — costs from £4,500, savings calculations, Smart Export Guarantee, grants, planning rules, and how to find an MCS-certified installer."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar Panels in Leeds"
      relatedPages={relatedPages}
      ctaHeading="Quote Solar PV Jobs in Leeds on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to quote solar PV installations, manage MCS certificates, and grow their business. 7-day free trial, cancel anytime."
    />
  );
}
