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
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Solar Guides', href: '/guides/solar-panel-installation' },
  { label: 'Solar Panel Installation Nottingham', href: '/solar-panel-installation-nottingham' },
];

const tocItems = [
  { id: 'nottingham-solar-viability', label: 'Is Solar Worth It in Nottingham?' },
  { id: 'system-costs', label: 'System Costs 2025' },
  { id: 'mcs-requirement', label: 'MCS Installer Requirement' },
  { id: 'seg-export-payments', label: 'Smart Export Guarantee' },
  { id: 'battery-storage', label: 'Battery Storage Options' },
  { id: 'planning-permission', label: 'Planning Permission' },
  { id: 'choosing-installer', label: 'Choosing an Installer' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A 4kW solar PV system in Nottingham typically costs £5,500 to £8,000 fully installed including inverter, mounting, and commissioning.',
  'Nottingham receives approximately 1,050 to 1,100 peak sun hours per year — enough for a 4kW system to generate around 3,400 to 3,600 kWh annually.',
  'Only MCS-certified installers can commission systems that qualify for the Smart Export Guarantee (SEG), which pays for surplus electricity exported to the grid.',
  'Most residential solar installations in Nottingham qualify as permitted development, meaning no planning permission is required — provided they meet height and protrusion limits.',
  'Adding a 9.5kWh battery storage system (such as the GivEnergy or Tesla Powerwall) typically adds £3,500 to £6,000 to the overall cost but significantly increases self-consumption.',
];

const faqs = [
  {
    question: 'How much does solar panel installation cost in Nottingham?',
    answer:
      'A typical 4kW solar PV system in Nottingham costs between £5,500 and £8,000 fully installed, including panels, inverter, mounting hardware, electrical connection, and commissioning. A 6kW system costs approximately £7,500 to £11,000. Prices vary depending on roof type (pitched slate and tile roofs are straightforward; flat roofs or east/west orientations cost more), panel brand, inverter specification, and whether scaffolding is required. These are 2025 market prices — get at least three quotes from MCS-certified installers.',
  },
  {
    question: 'How much electricity will solar panels generate in Nottingham?',
    answer:
      'Nottingham has an average annual solar irradiance of approximately 1,050 to 1,100 kWh/m² per year, which is lower than southern England but still commercially viable. A 4kW system with south-facing panels at 35° pitch typically generates 3,400 to 3,600 kWh per year. East- or west-facing roofs generate around 15 to 20 per cent less. The average UK household uses 3,500 to 4,000 kWh per year, so a 4kW system can cover a significant proportion of typical household demand.',
  },
  {
    question: 'Do I need planning permission for solar panels in Nottingham?',
    answer:
      'Most residential solar panel installations in Nottingham qualify as permitted development under Schedule 2, Part 14, Class A of the Town and Country Planning (General Permitted Development) (England) Order 2015. Key conditions: panels must not project more than 200mm from the roof surface, must not be installed on a roof that fronts a highway if the building is in a conservation area, and the system must be removed when no longer needed. Contact Nottingham City Council or Nottinghamshire County Council planning department if your property is listed or in a designated conservation area, as permitted development rights may not apply.',
  },
  {
    question: 'What is the Smart Export Guarantee and how much does it pay?',
    answer:
      'The Smart Export Guarantee (SEG) is a government-mandated scheme requiring larger energy suppliers to offer export tariffs to owners of small-scale renewable generators, including solar PV. Only MCS-certified systems qualify. SEG rates vary by supplier — as of 2025, Octopus Energy offers rates up to 15p/kWh under the Outgoing Octopus tariff, while other suppliers offer 3p to 8p/kWh. A 4kW system in Nottingham exporting around 30 to 40 per cent of its generation could earn £100 to £250 per year in SEG payments depending on the tariff chosen.',
  },
  {
    question: 'Is battery storage worth it in Nottingham?',
    answer:
      'Battery storage increases the self-consumption of solar generation by storing surplus daytime electricity for use in the evening. In Nottingham, a 9.5kWh battery (such as the GivEnergy All-in-One, Tesla Powerwall, or Solis hybrid system) typically costs £3,500 to £6,000 installed alongside a new solar system, or more if retrofitted later. Battery storage is most cost-effective for households with high evening electricity usage. Payback periods are typically 8 to 12 years for the battery component alone, but falling battery prices and rising electricity costs are improving this.',
  },
  {
    question: 'What does MCS certification mean for Nottingham solar installers?',
    answer:
      'MCS (Microgeneration Certification Scheme) certification is the industry standard for solar PV installers in the UK. MCS-certified installers are assessed against product and installer standards, carry appropriate insurance, and must register completed installations. Only MCS-certified installations qualify for the Smart Export Guarantee. In Nottingham, the NICEIC and NAPIT competent person schemes both include MCS-certified solar installers. Always verify an installer\'s MCS certification via the official MCS database before signing any contract.',
  },
  {
    question: 'Are there any Nottingham council solar schemes or grants?',
    answer:
      'Nottingham City Council has historically been active in renewable energy, operating its own Robin Hood Energy supplier (now closed) and the Nottingham Energy Partnership. The UK government\'s ECO4 scheme provides funding for energy efficiency measures including solar panels for low-income households and those in fuel poverty — contact Nottingham City Council\'s Warm Homes team for eligibility. The government\'s Great British Insulation Scheme may also include solar measures. There are no mainstream solar purchase grants as of 2025, but SEG payments, reduced bills, and 0% VAT on residential solar installations all reduce the effective cost.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/solar-panel-installation-newcastle',
    title: 'Solar Panel Installation Newcastle',
    description: 'Northeast England solar guide with irradiance data, costs, and SEG payments.',
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
    href: '/ev-charger-installation-coventry',
    title: 'EV Charger Installation Coventry',
    description: 'Coventry EV charger costs, OZEV grant, and NICEIC approved installers.',
    icon: Zap,
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
    id: 'nottingham-solar-viability',
    heading: 'Is Solar Worth It in Nottingham?',
    content: (
      <>
        <p>
          Nottingham sits at approximately 52.9°N latitude in the East Midlands. Solar irradiance
          here is lower than southern England but comparable to much of Germany, which has one of
          the highest solar installation rates in Europe. The city receives around 1,050 to 1,100
          peak sun hours per year, sufficient to make solar PV economically viable for most
          homeowners and businesses.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual generation estimate</strong> — a 4kW south-facing system at 35°
                pitch in Nottingham generates approximately 3,400 to 3,600 kWh per year. A 6kW
                system generates 5,100 to 5,400 kWh per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bill savings</strong> — with electricity at approximately 24p/kWh (2025
                average), a 4kW system can save £500 to £700 per year on electricity bills through
                self-consumption alone, before any SEG export payments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Payback period</strong> — at current electricity prices, a 4kW system
                costing £6,500 installed typically achieves payback in 8 to 12 years, with a
                system lifespan of 25 to 30 years. Panels typically come with 25-year performance
                guarantees.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nottingham-specific factors</strong> — the city's relatively flat
                topography means few shading issues from hills. Victorian terraced housing in areas
                such as The Meadows, Basford, and Radford may have north-facing rear roofs that
                are less suitable, but east/west installations remain viable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Solar PV is a long-term investment. Households planning to remain in their property for
          10 or more years are the best candidates. Solar installations also add value to a property
          — a 2023 Rightmove survey found that properties with solar panels sold for an average
          4 per cent premium compared to comparable properties without.
        </p>
      </>
    ),
  },
  {
    id: 'system-costs',
    heading: 'Solar Panel System Costs in Nottingham (2025)',
    content: (
      <>
        <p>
          Solar panel prices have fallen significantly over the past decade and have broadly
          stabilised. The following are typical 2025 installed prices for Nottingham and the
          surrounding East Midlands area.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3kW system (8–10 panels)</strong> — £4,500 to £6,500. Suitable for
                smaller properties or limited roof space. Generates approximately 2,600 to
                2,800 kWh per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4kW system (10–13 panels)</strong> — £5,500 to £8,000. The most popular
                residential system size. Generates approximately 3,400 to 3,600 kWh per year.
                Covers much of a typical family home's daytime electricity use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6kW system (15–18 panels)</strong> — £7,500 to £11,000. Recommended for
                larger households, home workers, or homes with electric vehicles. Generates
                approximately 5,100 to 5,400 kWh per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery storage add-on</strong> — £3,500 to £6,000 for a 9.5–10kWh
                battery (GivEnergy, Tesla Powerwall, or Solis). Installing at the same time as
                the solar system is significantly cheaper than retrofitting later.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All prices include panels, inverter, mounting hardware, DC and AC cabling, consumer unit
          connection, commissioning, MCS registration, and scaffolding for a standard pitched
          roof. VAT on residential solar PV installations is currently 0% until March 2027 under
          the Energy-Saving Materials VAT relief, making this a particularly cost-effective time
          to install.
        </p>
      </>
    ),
  },
  {
    id: 'mcs-requirement',
    heading: 'MCS Installer Requirement for SEG Eligibility',
    content: (
      <>
        <p>
          The Microgeneration Certification Scheme (MCS) is the UK industry standard for small-scale
          renewable energy installations. For Nottingham homeowners, MCS certification matters
          because only MCS-registered installations qualify for the Smart Export Guarantee (SEG)
          — the government scheme that pays for surplus electricity exported to the grid.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>What MCS guarantees</strong> — MCS-certified installers are assessed
                against installation standards (MIS 3002 for solar PV), use MCS-certified
                products, carry public liability and professional indemnity insurance, and must
                register each installation in the MCS database within 10 working days of
                commissioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>How to verify</strong> — use the MCS installer search at
                mcscertified.com/find-an-installer. Enter your Nottingham postcode to find
                local MCS-certified solar PV installers. Many are also registered with NICEIC
                or NAPIT for electrical competency.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-MCS installations</strong> — solar panels installed by
                non-MCS-certified contractors do not qualify for SEG payments, regardless of
                the quality of the installation. The panels will still generate electricity
                but you will be unable to register for export payments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS certificate</strong> — upon completion, the installer must provide
                you with an MCS installation certificate. Keep this document — it is required
                to apply for SEG and may be required when selling your property.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'seg-export-payments',
    heading: 'Smart Export Guarantee (SEG) Export Payments',
    content: (
      <>
        <p>
          The Smart Export Guarantee replaced the Feed-in Tariff (which closed to new applicants
          in April 2019) as the mechanism for paying solar panel owners for electricity they export
          to the grid. Unlike the old Feed-in Tariff, SEG rates are set by individual energy
          suppliers rather than the government.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Eligibility</strong> — systems up to 5MW in capacity with a smart meter
                installed. For residential solar, your 4kW or 6kW system will qualify provided
                it was installed by an MCS-certified installer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>2025 SEG rates</strong> — rates vary. Octopus Energy's Outgoing Octopus
                tariff offers up to 15p/kWh at peak times (4pm to 7pm) with a variable rate at
                other times. E.ON Next, Ovo Energy, and British Gas offer fixed rates of
                3.5p to 7.5p/kWh. Compare rates before committing to a supplier.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical earnings</strong> — a 4kW system in Nottingham exporting
                approximately 30 to 40 per cent of generation (1,000 to 1,400 kWh) could
                earn £50 to £210 per year depending on the tariff chosen. Export earnings
                are in addition to bill savings from self-consumption.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart meter requirement</strong> — you must have a smart meter installed
                (or agree to have one installed) to receive SEG payments. Smart meters record
                half-hourly export data, enabling accurate payment. Contact your energy supplier
                to arrange installation if you don't already have one.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'battery-storage',
    heading: 'Battery Storage Options for Nottingham Homes',
    content: (
      <>
        <p>
          Battery storage allows solar-generated electricity to be stored during the day and used
          in the evening when generation has stopped. In Nottingham, where cloudy periods are
          common between October and March, battery storage can substantially increase year-round
          self-sufficiency.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Popular battery systems in 2025</strong> — GivEnergy All-in-One
                (9.5kWh, £3,800 to £5,200 installed), Tesla Powerwall 3 (13.5kWh, £9,000 to
                £12,000 installed), Solis S6 hybrid with PYLONTECH battery stack (flexible
                capacity, £4,500 to £7,000 for 10kWh installed), Fox ESS (£4,000 to £5,500
                for 10kWh installed).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-consumption uplift</strong> — without battery storage, a typical
                household self-consumes 30 to 40 per cent of solar generation. With a 9.5kWh
                battery, self-consumption typically rises to 60 to 80 per cent, significantly
                reducing export and increasing bill savings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grid charging</strong> — hybrid inverter systems can also charge the
                battery from the grid overnight at cheap-rate tariffs (such as Octopus Go at
                7p/kWh) and discharge during the day, creating additional savings independent
                of solar generation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>VAT on battery storage</strong> — battery storage installed alongside
                a solar PV system is subject to 0% VAT until March 2027. Standalone battery
                installations (without solar) are also now eligible for 0% VAT on the battery
                element under the same relief.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'planning-permission',
    heading: 'Planning Permission for Solar in Nottingham',
    content: (
      <>
        <p>
          The majority of residential solar PV installations in Nottingham do not require planning
          permission. They are classed as permitted development under Schedule 2, Part 14, Class A
          of the Town and Country Planning (General Permitted Development) (England) Order 2015
          (as amended).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permitted development conditions</strong> — panels must not project
                more than 200mm above the plane of the roof surface; the installation must
                not be higher than the highest part of the roof (excluding the chimney);
                and when no longer required, the installation must be removed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation areas</strong> — if your property is in a conservation
                area (parts of The Park, Lace Market, and various Nottinghamshire villages
                have conservation area designations), panels must not be installed on a wall
                or roof that fronts a highway, a public open space, or a waterway. Planning
                permission is required for such installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed buildings</strong> — permitted development rights do not apply
                to listed buildings. Any solar installation on a listed building in Nottingham
                requires both planning permission and listed building consent from Nottingham
                City Council or Nottinghamshire County Council, which is rarely granted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flat roofs</strong> — solar panels on flat roofs are typically treated
                as ground-mounted systems and may require planning permission if the panels
                are visible from public viewpoints or if the installation exceeds certain
                height limits.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If in doubt, contact Nottingham City Council's planning department or apply for a
          Lawful Development Certificate (LDC) to confirm your installation is permitted
          development. Your MCS-certified installer should be familiar with local planning
          requirements and can advise on your specific roof.
        </p>
      </>
    ),
  },
  {
    id: 'choosing-installer',
    heading: 'Choosing a Solar Installer in Nottingham',
    content: (
      <>
        <p>
          Nottingham and the East Midlands have a healthy number of MCS-certified solar PV
          installers. The key is selecting one that is reputable, properly certified, and
          provides a thorough site survey before quoting.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify MCS certification</strong> — check the installer's MCS
                certificate number on the MCS database before signing any contract. MCS
                certification must be current, not expired.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get three quotes</strong> — prices vary considerably. Obtain at least
                three quotes from different MCS-certified Nottingham installers. Ensure all
                quotes include the same scope — panels, inverter, mounting, cabling,
                commissioning, scaffolding, and MCS registration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insist on a site survey</strong> — a reputable installer will conduct
                a proper site survey (in person or via satellite imagery tools such as Google
                Project Sunroof) before providing a quote. Surveys assess roof orientation,
                pitch, shading, structural suitability, and meter/consumer unit location.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check workmanship warranties</strong> — panels typically carry 25-year
                performance guarantees from the manufacturer. Inverters typically carry 10 to
                12-year warranties. Ask what workmanship warranty the installer provides —
                5 years minimum is reasonable.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Solar PV Work in Nottingham',
    content: (
      <>
        <p>
          Solar PV installation is one of the fastest-growing areas of residential electrical
          work in Nottingham and the East Midlands. Qualified electricians with additional solar
          PV training and MCS certification can command premium rates — solar PV installations
          typically pay significantly more per day than standard domestic work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EV Charging and Solar Commissioning Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certification app
                  </SEOInternalLink>{' '}
                  to complete electrical installation certificates for solar AC connections on
                  site. AI-assisted form completion and instant PDF export mean no evening
                  paperwork.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Solar Work Professionally</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate professional solar installation quotes on site using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Include materials, labour, scaffolding, and MCS registration fees in a
                  clear, itemised document.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your solar PV business with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site certification, quoting, and job management. Complete EICs and MWCs for solar installations before you leave site. 7-day free trial."
          icon={Sun}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SolarPanelInstallationNottinghamPage() {
  return (
    <GuideTemplate
      title="Solar Panel Installation Nottingham 2025 | Solar PV East Midlands"
      description="Solar panel installation costs in Nottingham 2025. Typical 4kW system costs £5,500–£8,000 installed. Nottingham irradiance data, MCS installer requirement, Smart Export Guarantee, battery storage, and planning permission guidance."
      datePublished="2025-01-01"
      dateModified="2025-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Solar Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Solar Panel Installation Nottingham:{' '}
          <span className="text-yellow-400">2025 Costs and Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about solar panel installation in Nottingham — typical 4kW system costs of £5,500 to £8,000, East Midlands irradiance data, MCS installer requirements, Smart Export Guarantee payments, battery storage options, and planning permission rules."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar Panel Installation in Nottingham"
      relatedPages={relatedPages}
      ctaHeading="Complete Solar Installation Certificates On Site"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EIC completion, professional quoting, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
