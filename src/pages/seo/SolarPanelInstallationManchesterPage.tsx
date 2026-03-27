import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Sun,
  PoundSterling,
  Zap,
  ShieldCheck,
  FileCheck2,
  AlertTriangle,
  CheckCircle,
  Battery,
  Search,
  CloudRain,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Solar Guides', href: '/solar-panel-installation-manchester' },
  { label: 'Solar Panel Installation Manchester', href: '/solar-panel-installation-manchester' },
];

const tocItems = [
  { id: 'overview', label: 'Solar in Manchester — Is It Worth It?' },
  { id: 'irradiance', label: 'Manchester Solar Irradiance' },
  { id: 'system-sizes', label: 'System Sizes and Output' },
  { id: 'costs', label: 'Installation Costs 2025' },
  { id: 'seg', label: 'Smart Export Guarantee (SEG)' },
  { id: 'planning', label: 'Planning Permission' },
  { id: 'mcs', label: 'MCS Certification' },
  { id: 'battery-storage', label: 'Battery Storage' },
  { id: 'payback', label: 'Payback Period' },
  { id: 'finding-installer', label: 'Finding an Installer' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Manchester receives approximately 850–950 kWh of solar irradiation per kWp per year — lower than the South East but sufficient to make solar PV economically viable at current electricity prices above 24p per kWh.',
  'A typical 4kW residential solar PV system in Manchester costs £5,000 to £7,500 fully installed and generates approximately 2,900–3,600 kWh per year.',
  'Manchester\'s higher rainfall and cloud cover do not prevent solar generation — panels generate electricity from daylight, not just direct sunshine, and modern high-efficiency panels perform better in diffuse light than older technology.',
  'MCS certification is mandatory to qualify for Smart Export Guarantee (SEG) payments. Without an MCS-certified installer and MCS-certified products, your system will not be eligible for export payments.',
  'BS 7671 Section 712 (Solar Photovoltaic Power Supply Systems) applies to all PV installations in Manchester, requiring appropriate DC isolation, surge protection, earthing, and labelling.',
];

const faqs = [
  {
    question: 'Does solar actually work in Manchester given the weather?',
    answer:
      'Yes. Solar panels generate electricity from daylight, not just direct sunshine. Manchester receives approximately 850–950 kWh of solar irradiation per kWp per year — around 15–20% less than London and around 30% less than the South West. However, at current electricity prices of 24p+ per kWh, even Manchester\'s lower irradiance delivers meaningful savings. Modern high-efficiency monocrystalline panels also perform better in the diffuse light conditions common in the North West. Solar PV is well-established across Greater Manchester, Lancashire, and Cheshire with thousands of successful residential installations.',
  },
  {
    question: 'How much does solar panel installation cost in Manchester in 2025?',
    answer:
      'A typical 4kW residential solar PV system in Manchester costs between £5,000 and £7,500 fully installed. Manchester prices are slightly lower than London due to lower labour rates and fewer access complications. Larger 6kW systems typically cost £7,000 to £10,000. Adding battery storage adds £2,500 to £5,000. All solar panels attract 0% VAT since February 2024.',
  },
  {
    question: 'How much electricity will solar panels generate in Manchester?',
    answer:
      'A 4kW system in Manchester will generate approximately 2,900–3,600 kWh per year, depending on roof orientation, pitch, and shading. A south-facing roof at 30–40 degrees achieves the best output. East-west split arrays are popular on semi-detached and terraced properties where south-facing roof space is limited. Even on overcast days, modern panels continue to generate electricity at reduced output — typically 10–25% of peak capacity.',
  },
  {
    question: 'What is the Smart Export Guarantee and how do I claim it in Manchester?',
    answer:
      'The Smart Export Guarantee (SEG) requires major electricity suppliers to pay you for electricity you export to the grid. There is no regional difference between Manchester and the rest of England — the scheme applies equally nationwide. To claim SEG, your system must be installed by an MCS-certified installer using MCS-certified equipment, you must have (or get) a smart meter, and you must register with an eligible supplier\'s SEG tariff. Rates currently range from 3p to 20p per kWh. You can switch SEG provider at any time.',
  },
  {
    question: 'Do I need planning permission for solar panels on my Manchester home?',
    answer:
      'Most domestic solar PV installations in Manchester are permitted development and do not require planning permission. The key conditions are that panels must not protrude more than 200mm above the roof surface and must not be on a wall or roof slope facing a highway. Listed buildings require planning permission and potentially Listed Building Consent. Properties in conservation areas may have restrictions on front-elevation panels. Manchester has several conservation areas, particularly in the city centre and suburbs such as Didsbury and Chorlton — check with Manchester City Council or your local borough before proceeding.',
  },
  {
    question: 'What MCS certification do I need for solar in Manchester?',
    answer:
      'Both the installation company and the equipment must be MCS-certified. You can verify installer certification at mcscertified.com. On completion, you should receive an MCS installation certificate, which you use to register for SEG with your energy supplier. The installation must also comply with BS 7671 Section 712 and the installer must issue an Electrical Installation Certificate (EIC) for the PV wiring.',
  },
  {
    question: 'What is the payback period for solar panels in Manchester?',
    answer:
      'The typical payback period for a 4kW solar PV system in Manchester is 9–13 years. With lower irradiance than southern England, annual savings are slightly lower — a 4kW system generating 3,200 kWh/year with 40% self-consumption at 24p/kWh saves approximately £307/year on electricity. Add SEG income of around £120–£150/year on exports. At a £6,000 installed cost, total payback is around 11–12 years. Adding a battery that raises self-consumption to 70% significantly improves the savings figure.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/solar-panel-installation-london',
    title: 'Solar Panel Installation London',
    description: 'London solar PV guide with costs, planning rules, and SEG information.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/solar-panel-installation-birmingham',
    title: 'Solar Panel Installation Birmingham',
    description: 'Solar panel installation guide for Birmingham and the West Midlands.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/solar-panel-installation-edinburgh',
    title: 'Solar Panel Installation Edinburgh',
    description: 'Scotland-specific solar guide including Scottish Building Standards.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to the 18th Edition wiring regulations including Section 712.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete electrical inspection reports on your phone with AI board scanning.',
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
    heading: 'Solar Panel Installation in Manchester — Is It Worth It?',
    content: (
      <>
        <p>
          The most common question Manchester homeowners ask about solar is whether the North West
          weather makes it worth the investment. The answer is yes — with an important caveat.
          Manchester receives less solar irradiation than the South East, but it receives enough
          to make solar PV economically viable when electricity prices are above 24p per kWh. Solar
          panels do not need sunshine to generate electricity. They generate from daylight, and
          even overcast Manchester days produce meaningful output.
        </p>
        <p>
          Thousands of solar PV systems are already installed across Greater Manchester, Lancashire,
          and Cheshire. Homeowners in Salford, Trafford, Stockport, Bury, and Bolton are all
          benefiting from reduced electricity bills and Smart Export Guarantee income. The economics
          have improved substantially since the Feed-in Tariff era because electricity prices have
          risen sharply while solar panel costs have fallen dramatically.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CloudRain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Manchester irradiance:</strong> ~850–950 kWh/kWp/year — around 10–15%
                less than London, 25–30% less than the South West. Still sufficient for viable
                solar economics.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Diffuse light performance:</strong> Modern monocrystalline panels are
                optimised for diffuse light conditions. The gap between Manchester and southern
                England performance has narrowed significantly with newer panel technology.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity price effect:</strong> At 24p+/kWh, every kWh generated by
                your panels saves real money. The higher the electricity price, the shorter the
                payback period — regardless of location.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'irradiance',
    heading: 'Manchester Solar Irradiance — Understanding the Data',
    content: (
      <>
        <p>
          Solar irradiance data is the starting point for any solar PV assessment. Manchester's
          irradiance figures are published by the European Commission's PVGIS (Photovoltaic
          Geographical Information System) tool, which provides free estimates for any UK location.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>South-facing optimum:</strong> A south-facing roof at 35 degrees pitch
                achieves approximately 900–950 kWh/kWp/year in the Manchester area. This is the
                benchmark figure used in payback calculations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>East-west arrays:</strong> A split east-west array (half facing east, half
                west) on a semi-detached property achieves approximately 80–85% of south-facing
                output, but spreads generation more evenly across the day — often better for
                self-consumption.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shading assessment:</strong> Tree shading and surrounding buildings are
                more impactful in Manchester's terraced housing stock than orientation. A reputable
                installer should perform a shading analysis using the installer's survey.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS system design:</strong> MCS-certified installers are required to use
                PVGIS or equivalent software to produce a system design report with modelled annual
                generation figures. Request this document before committing to any installation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'system-sizes',
    heading: 'System Sizes for Manchester Properties',
    content: (
      <>
        <p>
          Greater Manchester has a diverse housing stock — Victorian terraces, Edwardian semis,
          post-war council houses, and modern new builds. The right system size depends on your
          available roof space, electricity consumption, and budget.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3kW system:</strong> Suits terraced houses and flats with limited roof
                space. Output: approximately 2,200–2,850 kWh/year in Manchester. Cost: £4,000–£5,500.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4kW system:</strong> Most popular for 3-bedroom semis and terraces.
                Output: approximately 2,900–3,600 kWh/year. Cost: £5,000–£7,500.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6kW system:</strong> Suitable for larger detached homes or high-consumption
                households (EV chargers, heat pumps). Output: approximately 4,350–5,400 kWh/year.
                Cost: £7,000–£10,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Roof space:</strong> Modern 400–450W panels require approximately 2m² each.
                A 4kW system needs roughly 20–25m² of suitable roof space. Many Manchester semis
                and detached homes can accommodate 6kW+ with east-west arrays.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Solar Panel Installation Costs in Manchester (2025)',
    content: (
      <>
        <p>
          Manchester solar installation costs are generally 5–10% lower than London due to lower
          labour rates, simpler roof access on many property types, and fewer congestion-related
          overhead costs. The following prices are fully installed including panels, inverter,
          mounting hardware, cabling, Generation Meter, and commissioning.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3kW system:</strong> £4,000–£5,500 installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4kW system:</strong> £5,000–£7,500 installed. The most popular choice
                for Manchester residential properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6kW system:</strong> £7,000–£10,000 installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery storage addition:</strong> £2,500–£5,000 for a 5–10kWh system.
                Solar panels and batteries installed together attract 0% VAT.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Scaffolding is required for most installations and is typically included in the quoted
          price. On mid-terrace Manchester properties, shared scaffolding with neighbouring
          properties can sometimes reduce costs — worth discussing with your installer.
        </p>
      </>
    ),
  },
  {
    id: 'seg',
    heading: 'Smart Export Guarantee (SEG) in Manchester',
    content: (
      <>
        <p>
          The Smart Export Guarantee applies equally across England, Scotland, and Wales — there
          is no regional variation. Manchester homeowners are eligible for the same SEG rates as
          anywhere in the country, provided their system meets the MCS requirements.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Eligibility:</strong> MCS-certified installation, MCS-certified products,
                system under 5MW capacity, and a smart meter capable of half-hourly export
                measurement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Current rates (2025):</strong> 3p–20p per kWh exported. Competitive tariffs
                include Octopus Outgoing (variable, tracks wholesale prices), E.ON Next Export, and
                British Gas Solar Export. Compare at the Ofgem SEG register before registering.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Manchester export estimate:</strong> A 4kW system generating 3,200 kWh/year
                with 40% self-consumption exports approximately 1,920 kWh/year. At 8p/kWh SEG rate,
                that is approximately £154/year in export income.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switching providers:</strong> You can change SEG provider at any time
                without affecting your installation or system warranty. Review available rates
                annually to ensure you are getting the best deal.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'planning',
    heading: 'Planning Permission in Manchester',
    content: (
      <>
        <p>
          Solar PV installations on domestic properties in Manchester are generally permitted
          development. However, Greater Manchester contains a number of conservation areas and
          listed buildings where additional restrictions apply.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permitted development:</strong> Applies to most domestic rooftop
                installations where panels do not protrude more than 200mm from the roof surface
                and are not on a front wall or roof slope visible from a highway.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation areas:</strong> Notable Manchester conservation areas include
                parts of Ancoats, Northern Quarter, Didsbury, Chorlton, and Altrincham town centre.
                Front-elevation panels are not permitted development in conservation areas — contact
                your relevant borough council.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed buildings:</strong> Full planning permission and potentially Listed
                Building Consent are required. Manchester has significant listed building stock,
                particularly in the city centre and inner suburbs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mcs',
    heading: 'MCS Certification for Manchester Solar Installations',
    content: (
      <>
        <p>
          MCS certification requirements are identical across the UK. Manchester homeowners should
          verify MCS status before commissioning any installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify at mcscertified.com:</strong> Check that your installer holds a
                current (not lapsed) MCS certificate. The MCS register shows certified installers
                by postcode area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS installation certificate:</strong> Issued on completion of the
                installation. Required to register for SEG. Keep this document safely as you will
                need it if you sell your property or switch energy supplier.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate:</strong> The installer must also issue
                an EIC for the AC and DC wiring in compliance with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671 Section 712
                </SEOInternalLink>
                .
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'battery-storage',
    heading: 'Battery Storage in Manchester',
    content: (
      <>
        <p>
          Battery storage is particularly valuable in Manchester because the lower irradiance means
          more of your generation occurs at lower output levels throughout the day rather than
          concentrated peak midday bursts. A battery ensures you capture and use as much of your
          generation as possible.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-consumption uplift:</strong> Without battery, typical Manchester
                household self-consumes 25–35% of solar generation. With a 5–10kWh battery:
                60–80% self-consumption. This significantly improves the economics in a lower
                irradiance location.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grid charging:</strong> On days of limited solar generation (winter, heavy
                cloud), many Manchester homeowners programme their battery to charge from the grid
                on cheap overnight tariffs (Octopus Agile, Economy 7) and discharge in the evening
                peak.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost:</strong> £2,500–£5,000 additional. 0% VAT when installed at the
                same time as panels.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'payback',
    heading: 'Solar Panel Payback Period in Manchester',
    content: (
      <>
        <p>
          Manchester's lower irradiance means the payback period is typically 1–3 years longer
          than equivalent systems in southern England. However, rising electricity prices have
          significantly improved the economics in recent years.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual savings estimate:</strong> 4kW system generating 3,200 kWh/year
                with 40% self-consumption at 24p/kWh = £307/year electricity savings. SEG income
                at 8p/kWh on 1,920 kWh exported = ~£154/year. Total annual benefit: ~£461/year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Payback period:</strong> At £6,000 installed and £461/year benefit:
                approximately 13 years. Adding a battery that raises self-consumption to 70%
                increases annual savings to ~£550+ and shortens effective payback. Payback range:
                10–14 years depending on specific circumstances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long-term returns:</strong> A system installed in 2025 will continue
                generating past 2050. With 25-year panel warranties and inverter replacements
                every 10–15 years, the long-term return on investment is substantial.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-installer',
    heading: 'Finding an MCS-Certified Installer in Manchester',
    content: (
      <>
        <p>
          Greater Manchester has a healthy pool of MCS-certified solar installers. Use the
          following criteria to select a trustworthy contractor.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS register:</strong> Verify current certification at mcscertified.com.
                Search by postcode to find local installers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RECC membership:</strong> The Renewable Energy Consumer Code (RECC) provides
                additional consumer protection. RECC members must follow a code of practice covering
                sales, contracts, and after-sales service.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local references:</strong> Ask for references from Manchester-area
                installations. A reputable local installer should be able to provide recent case
                studies from properties in similar conditions to yours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>System design document:</strong> Require a written system design report
                using PVGIS or equivalent, showing modelled annual generation for your specific
                roof before you sign any contract.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Solar PV Work in Manchester',
    content: (
      <>
        <p>
          The solar PV market in Greater Manchester is growing steadily. MCS-certified electricians
          with the City and Guilds 2399 qualification and NICEIC or NAPIT registration are well
          placed to benefit from this demand.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue Solar EICs On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  to complete the Electrical Installation Certificate for your PV installation
                  wiring on site. Generate a professional PDF and email it to the client on the
                  day of commissioning.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Battery Retrofits Immediately</h4>
                <p className="text-white text-sm leading-relaxed">
                  After completing a solar installation, generate a battery storage quote on the
                  spot using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Battery retrofits are growing rapidly in the North West and represent a
                  high-margin revenue stream.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your solar PV business with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site certification, instant quoting, and business management. 7-day free trial, cancel anytime."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SolarPanelInstallationManchesterPage() {
  return (
    <GuideTemplate
      title="Solar Panel Installation Manchester 2025 | Solar PV Northwest"
      description="Solar panel installation in Manchester 2025: costs £5,000–£7,500, irradiance ~900 kWh/kWp/year. Smart Export Guarantee, MCS certification, planning permission, battery storage, and payback period guide for the North West."
      datePublished="2025-01-01"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Solar Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Solar Panel Installation Manchester:{' '}
          <span className="text-yellow-400">Costs & Guide 2025</span>
        </>
      }
      heroSubtitle="Does solar work in Manchester? Yes — here is the complete guide to solar PV in the North West, covering irradiance data, costs from £5,000, Smart Export Guarantee, MCS certification, planning permission, and realistic payback periods."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar Panel Installation in Manchester"
      relatedPages={relatedPages}
      ctaHeading="Complete Solar PV Certificates On Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site solar EICs, quoting, and business management. 7-day free trial, cancel anytime."
    />
  );
}
