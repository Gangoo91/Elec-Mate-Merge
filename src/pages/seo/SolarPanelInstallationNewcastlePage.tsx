import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Sun,
  PoundSterling,
  Zap,
  Home,
  CheckCircle,
  AlertTriangle,
  Battery,
  FileCheck2,
  TrendingUp,
  MapPin,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Solar Guides', href: '/guides/solar-panel-installation' },
  { label: 'Solar Panel Installation Newcastle', href: '/solar-panel-installation-newcastle' },
];

const tocItems = [
  { id: 'northeast-solar-viability', label: 'Is Solar Viable in the Northeast?' },
  { id: 'irradiance-data', label: 'Newcastle Irradiance Data' },
  { id: 'system-costs', label: 'System Costs 2025' },
  { id: 'seg-export-payments', label: 'Smart Export Guarantee' },
  { id: 'council-solar-schemes', label: 'Council Solar Schemes' },
  { id: 'battery-storage', label: 'Battery Storage' },
  { id: 'planning-permission', label: 'Planning Permission' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Newcastle and the Northeast receive approximately 950 to 1,000 peak sun hours per year — lower than southern England but still commercially viable for solar PV, as demonstrated by Germany\'s thriving solar market at similar latitudes.',
  'A 4kW solar PV system in Newcastle typically costs £5,500 to £8,500 installed, generating approximately 3,100 to 3,400 kWh per year on a south-facing 35° pitch roof.',
  'Only MCS-certified installers can register systems for the Smart Export Guarantee (SEG), which pays for surplus electricity exported to the grid — rates up to 15p/kWh are available from Octopus Energy.',
  'Newcastle City Council and Gateshead Council have both invested in renewable energy initiatives and social housing solar programmes. Private homeowners can benefit from ECO4 funding if they meet eligibility criteria.',
  'Battery storage is particularly valuable in the Northeast given shorter winter days — a 9.5kWh battery can increase self-consumption from 30% to 70%, significantly improving the economics.',
];

const faqs = [
  {
    question: 'Is solar worth it in Newcastle given the Northeast climate?',
    answer:
      'Yes — solar PV is viable and increasingly popular in Newcastle. The Northeast receives approximately 950 to 1,000 peak sun hours per year, compared to 1,200 to 1,400 in southern England. While this reduces annual generation, the economics still stack up given that electricity costs approximately 24p/kWh (2025 average). A 4kW system in Newcastle generates around 3,100 to 3,400 kWh per year, saving £500 to £650 annually through self-consumption. Germany, which has a solar installation rate far higher than the UK, receives similar irradiance to Newcastle in its northern regions.',
  },
  {
    question: 'How much does solar panel installation cost in Newcastle?',
    answer:
      'A typical 4kW solar PV system in Newcastle costs between £5,500 and £8,500 fully installed, including panels, inverter, mounting hardware, electrical connection, scaffolding, commissioning, and MCS registration. A 6kW system costs approximately £8,000 to £12,000. Northeast prices are broadly comparable with the national average, though scaffolding costs for properties with difficult roof access (such as many Tyne and Wear terraced streets) can push prices up. Always get at least three quotes from MCS-certified installers.',
  },
  {
    question: 'What is the Smart Export Guarantee and how does it work in Newcastle?',
    answer:
      'The Smart Export Guarantee (SEG) requires larger energy suppliers to pay solar panel owners for surplus electricity they export to the grid. You must have an MCS-certified installation and a smart meter. SEG rates in 2025 range from 3.5p/kWh (fixed rate suppliers) to 15p/kWh at peak times (Octopus Energy\'s Outgoing Octopus tariff). A 4kW system in Newcastle exporting 30 to 40 per cent of its generation (930 to 1,360 kWh) could earn £45 to £200 per year in SEG payments. The SEG scheme is not time-limited, unlike the old Feed-in Tariff.',
  },
  {
    question: 'Are there any Newcastle council or Northeast solar grants?',
    answer:
      'There are no mainstream direct grants for solar purchase in 2025. However, Newcastle City Council\'s Warm Homes programme and Gateshead Council\'s energy efficiency schemes include solar panels for eligible low-income households under the ECO4 scheme. The Great British Insulation Scheme also covers some solar measures. The North East Combined Authority has also funded community energy projects. The most significant financial incentives for private homeowners are 0% VAT on installation (until March 2027) and SEG export payments.',
  },
  {
    question: 'Do I need planning permission for solar panels in Newcastle?',
    answer:
      'Most residential solar installations in Newcastle qualify as permitted development under Schedule 2, Part 14, Class A of the GPDO 2015. No planning permission is required provided panels do not project more than 200mm from the roof plane and meet other standard conditions. However, properties in conservation areas (including parts of Jesmond, Gosforth, and Tynemouth) may have restrictions if the panel-bearing roof faces a highway. Listed buildings require both planning permission and listed building consent. Check with Newcastle City Council\'s planning department if your property is in a designated area.',
  },
  {
    question: 'What size solar system should I install in Newcastle?',
    answer:
      'For a typical Newcastle family home (three or four bedrooms, annual electricity use of 3,500 to 4,500 kWh), a 4kW system is the most popular choice. It typically covers 70 to 90 per cent of daytime electricity consumption. If you have an electric vehicle or are planning to get one, a 6kW system significantly reduces charging costs. If your roof area is limited or budget is tight, a 3kW system is a viable entry point. Your MCS-certified installer will assess your roof and recommend the optimal system size based on available area, orientation, and shading.',
  },
  {
    question: 'How long does a solar panel installation take in Newcastle?',
    answer:
      'A standard residential solar PV installation in Newcastle typically takes one to two days from scaffolding erection to commissioning. Scaffolding is usually erected the day before, panels and inverter are installed on day one, electrical connection and testing on day two, followed by scaffolding removal. The MCS installer must then register the installation in the MCS database within 10 working days. You can apply to your energy supplier for SEG once you have received the MCS installation certificate, which your installer should provide promptly after registration.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/solar-panel-installation-nottingham',
    title: 'Solar Panel Installation Nottingham',
    description: 'East Midlands solar guide with costs, irradiance data, and SEG payments.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description: 'Home EV charger installation, OZEV grants, and Section 722 compliance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/electrician-salary-newcastle',
    title: 'Electrician Salary Newcastle',
    description: 'Northeast England electrician pay rates, employed vs self-employed.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote solar and EV installations on-site with instant PDF generation.',
    icon: FileCheck2,
    category: 'Tool',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Amendment 3 wiring regulations — key changes for solar and EV installations.',
    icon: FileCheck2,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'northeast-solar-viability',
    heading: 'Is Solar PV Viable in the Northeast of England?',
    content: (
      <>
        <p>
          A common misconception is that the Northeast of England is too cloudy for solar panels
          to be worthwhile. In reality, Newcastle and the surrounding Tyne and Wear area receive
          sufficient solar irradiance to make PV commercially viable for most homeowners. The
          economic case for solar in the Northeast has strengthened significantly as electricity
          prices have risen and panel costs have fallen.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The Germany comparison</strong> — Germany has one of the highest
                solar installation rates in the world, yet Hamburg and Berlin receive similar
                annual irradiance to Newcastle (approximately 950 to 1,050 kWh/m²/year).
                The argument that the Northeast is "too far north" for solar simply does not
                hold up to comparison.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity price effect</strong> — at 24p/kWh (2025 average), every
                unit of solar electricity you self-consume saves you money. The same unit
                generated in Newcastle has the same financial value as one generated in London,
                even though London generates slightly more units per kWp installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Northeast seasonal variation</strong> — the Northeast experiences
                more pronounced seasonal variation than southern England. Summer generation
                is excellent; December and January see significantly reduced output. Battery
                storage and time-of-use tariffs can help manage this variation effectively.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Solar PV in Newcastle typically achieves payback in 9 to 14 years on a system with a
          25 to 30-year lifespan. At current electricity prices, the lifetime return on a
          £7,000 system is often £15,000 to £25,000 in combined bill savings and export payments.
        </p>
      </>
    ),
  },
  {
    id: 'irradiance-data',
    heading: 'Newcastle Solar Irradiance Data',
    content: (
      <>
        <p>
          Understanding the solar resource available in Newcastle helps set realistic expectations
          for system performance and financial returns.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual irradiance</strong> — Newcastle upon Tyne receives approximately
                950 to 1,000 kWh/m²/year of global horizontal irradiance (GHI). South-facing
                tilted surfaces at 35° receive slightly more — approximately 1,050 to
                1,100 kWh/m²/year — due to optimal angle relative to the sun's path.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly variation</strong> — June and July are peak generation months
                with long days (up to 17 hours of daylight). December and January see much
                shorter days (7 to 8 hours) and lower sun angles. A 4kW system might generate
                450 to 550 kWh in June but only 80 to 120 kWh in December.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specific yield</strong> — in Newcastle, a well-installed 4kW south-facing
                system achieves approximately 775 to 850 kWh/kWp per year. Compare with
                900 to 1,000 kWh/kWp for London and 750 to 800 kWh/kWp for Aberdeen.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shading considerations</strong> — coastal haar (sea fog) around the
                Tyne estuary can temporarily reduce generation in late spring and summer
                mornings. North-facing properties or those shaded by trees, chimney stacks,
                or neighbouring buildings will generate significantly less than south-facing
                equivalents.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'system-costs',
    heading: 'Solar Panel System Costs in Newcastle (2025)',
    content: (
      <>
        <p>
          The following are typical 2025 installed prices for Newcastle and the wider Northeast
          England region (Tyne and Wear, County Durham, Northumberland).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3kW system (8–10 panels)</strong> — £4,500 to £6,800. Generates
                approximately 2,350 to 2,600 kWh per year in Newcastle. Best for smaller
                properties or limited roof space.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4kW system (10–13 panels)</strong> — £5,500 to £8,500. The most
                popular residential size. Generates approximately 3,100 to 3,400 kWh per
                year. Covers a large proportion of a typical family home's electricity use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6kW system (15–18 panels)</strong> — £8,000 to £12,000. Recommended
                for larger households, EV owners, or those aiming for maximum self-sufficiency.
                Generates approximately 4,650 to 5,100 kWh per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery storage add-on</strong> — £3,500 to £6,500 for a 9.5–10kWh
                battery installed alongside the solar system. Given the Northeast's winter
                generation dip, a battery is particularly valuable for capturing summer
                evening surplus.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All prices include panels, inverter, mounting hardware, cabling, consumer unit
          connection, commissioning, MCS registration, and scaffolding. VAT on residential
          solar installations is 0% until March 2027.
        </p>
      </>
    ),
  },
  {
    id: 'seg-export-payments',
    heading: 'Smart Export Guarantee Payments',
    content: (
      <>
        <p>
          The Smart Export Guarantee (SEG) pays solar panel owners for surplus electricity
          exported to the grid. The scheme replaced the Feed-in Tariff (closed April 2019)
          and is available to all MCS-certified solar installations regardless of size (up to 5MW).
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Best 2025 SEG rates</strong> — Octopus Energy's Outgoing Octopus
                tariff offers up to 15p/kWh at peak times (4pm to 7pm weekdays) with a
                variable rate at other times; E.ON Next offers 5.5p/kWh fixed; Ovo Energy
                offers 5p/kWh fixed; British Gas offers 4.5p/kWh fixed. Rates change
                periodically — compare at the time of your installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Newcastle earnings estimate</strong> — a 4kW system in Newcastle
                exporting around 35 per cent of its 3,100 to 3,400 kWh annual generation
                (approximately 1,085 to 1,190 kWh) could earn £55 to £180 per year depending
                on the tariff chosen.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart meter requirement</strong> — a functioning smart meter is
                required for SEG. If you do not have one, your energy supplier is obliged
                to offer to install one. Half-hourly smart meter data is used to calculate
                your export payments accurately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switching supplier</strong> — you can switch energy supplier and
                still maintain your SEG. Your new supplier must also offer an SEG tariff
                if they have 150,000 or more domestic customers. Switching regularly to
                get the best rate is permitted.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'council-solar-schemes',
    heading: 'Newcastle Council and Northeast Solar Schemes',
    content: (
      <>
        <p>
          Various public sector initiatives in Newcastle and the wider Northeast can help
          homeowners and businesses access solar PV at reduced cost or with additional support.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECO4 scheme</strong> — the government's Energy Company Obligation
                (ECO4) scheme funds energy efficiency measures, including solar PV, for
                low-income households and those in fuel poverty. Newcastle City Council
                operates a Warm Homes programme that channels ECO4 funding to eligible
                residents. Contact Newcastle City Council's housing team to check eligibility.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>North East Combined Authority</strong> — the NECA has supported
                community energy projects across the region and published guidance on
                renewable energy investment. Check the NECA website for current initiatives.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Great British Insulation Scheme</strong> — the GBIS scheme, managed
                by Ofgem, funds insulation and some energy efficiency measures for eligible
                households. Solar panels are not directly funded under GBIS but the scheme
                may improve the economics of solar by reducing heating demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>0% VAT relief</strong> — the most broadly available financial benefit.
                All residential solar PV installations benefit from 0% VAT on supply and
                installation until March 2027 under the Energy-Saving Materials relief.
                This saves approximately £500 to £1,000 on a typical system compared to the
                standard 20% VAT rate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'battery-storage',
    heading: 'Battery Storage in the Northeast',
    content: (
      <>
        <p>
          Battery storage is particularly valuable in the Northeast of England because of the
          pronounced seasonal generation difference between summer and winter. A battery enables
          households to capture more of their summer surplus and use it in the evenings, improving
          year-round economics.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-consumption uplift</strong> — without battery storage, a typical
                Newcastle household self-consumes 25 to 35 per cent of solar generation
                (daytime use only). Adding a 9.5kWh battery can increase this to 60 to
                75 per cent, substantially improving bill savings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Popular systems 2025</strong> — GivEnergy All-in-One (9.5kWh,
                £3,800 to £5,200 installed), Solis hybrid with PYLONTECH stack (10kWh,
                £4,500 to £6,500 installed), Tesla Powerwall 3 (13.5kWh, £9,000 to
                £12,000 installed). GivEnergy is particularly popular with Northeast
                installers for its reliability and support.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Octopus Intelligent/Go integration</strong> — hybrid battery systems
                can be programmed to charge from the grid overnight at cheap-rate tariffs
                (Octopus Go from 7p/kWh, Intelligent Octopus from 9p/kWh) and discharge
                during the day, reducing bills even in winter when solar generation is low.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'planning-permission',
    heading: 'Planning Permission for Solar in Newcastle',
    content: (
      <>
        <p>
          The majority of residential solar installations in Newcastle are permitted development
          and do not require planning permission.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permitted development</strong> — under Schedule 2, Part 14, Class A
                of the GPDO 2015, solar panels are permitted development on most residential
                roofs. Panels must not project more than 200mm above the roof plane and must
                not be higher than the highest part of the roof (excluding chimney).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation areas in Newcastle</strong> — parts of Jesmond,
                Gosforth, Tynemouth, and the Ouseburn Valley have conservation area
                designations. In these areas, panels on a roof that faces a highway
                require planning permission. Contact Newcastle City Council's planning
                department to check your specific address.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed buildings</strong> — permitted development rights do not
                apply to listed buildings. Any solar installation on a listed building
                requires planning permission and listed building consent. These are rarely
                granted for panels on principal elevations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lawful Development Certificate</strong> — if you are unsure whether
                your installation qualifies as permitted development, apply for an LDC from
                Newcastle City Council. The fee is approximately £120 for a residential
                application and provides legal certainty before proceeding.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Solar PV Work in the Northeast',
    content: (
      <>
        <p>
          Solar PV is one of the most in-demand additional skills for electricians in Newcastle
          and the Northeast. Electricians with City and Guilds 2399 (Solar PV Design, Installation,
          and Commissioning) or equivalent, combined with MCS certification, can command day
          rates of £350 to £600+ for solar installation work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Electrical Installation Certificates On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certification app
                  </SEOInternalLink>{' '}
                  to complete EICs for solar AC connections on site. AI-assisted form
                  completion, BS 7671 compliant, and instant PDF export mean the certificate
                  is ready for the customer before you leave.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Solar Installations Professionally</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate professional, itemised solar quotes using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Include panels, inverter, mounting, scaffolding, electrical connection,
                  and MCS registration in a clear PDF that wins jobs.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your solar PV business in the Northeast with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site certification, professional quoting, and job management. Complete EICs for solar installations before you leave site. 7-day free trial."
          icon={Sun}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SolarPanelInstallationNewcastlePage() {
  return (
    <GuideTemplate
      title="Solar Panel Installation Newcastle 2025 | Solar PV Northeast England"
      description="Solar panel installation in Newcastle 2025. Northeast irradiance data, real cost examples £5,500–£8,500 for 4kW system, Smart Export Guarantee payments, council solar schemes, and battery storage options for Northeast England."
      datePublished="2025-01-01"
      dateModified="2025-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Solar Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Solar Panel Installation Newcastle:{' '}
          <span className="text-yellow-400">2025 Northeast Guide</span>
        </>
      }
      heroSubtitle="Is solar worth it in Newcastle? Yes — and here's the data to prove it. Northeast England irradiance levels, real 2025 cost examples, Smart Export Guarantee payments, council schemes, battery storage options, and planning permission guidance for Tyne and Wear homeowners."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar Panel Installation in Newcastle"
      relatedPages={relatedPages}
      ctaHeading="Complete Solar Installation Certificates On Site"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EIC completion, professional quoting, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
