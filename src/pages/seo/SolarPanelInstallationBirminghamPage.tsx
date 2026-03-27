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
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Solar Guides', href: '/solar-panel-installation-birmingham' },
  { label: 'Solar Panel Installation Birmingham', href: '/solar-panel-installation-birmingham' },
];

const tocItems = [
  { id: 'overview', label: 'Solar in Birmingham — Overview' },
  { id: 'irradiance', label: 'West Midlands Solar Irradiance' },
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
  'Birmingham and the West Midlands receive approximately 900–980 kWh of solar irradiation per kWp per year — broadly comparable to the East Midlands and slightly below London, making solar PV a viable investment at current electricity prices.',
  'A typical 4kW residential solar PV system in Birmingham costs £5,000 to £7,500 fully installed and can generate approximately 3,200–3,800 kWh per year.',
  'Birmingham City Council\'s large housing stock includes significant terraced and semi-detached property types that are well suited to solar PV installation.',
  'MCS certification is a mandatory requirement for Smart Export Guarantee (SEG) eligibility. Ensure your installer holds a current MCS certificate before signing any contract.',
  'BS 7671 Section 712 sets out the wiring regulations for solar PV installations. All Birmingham installations must comply and the installer must issue an Electrical Installation Certificate (EIC).',
];

const faqs = [
  {
    question: 'Is solar worth it in Birmingham?',
    answer:
      'Yes. Birmingham receives approximately 900–980 kWh/kWp/year of solar irradiation — slightly less than the South East but significantly better than northern England. At current electricity prices above 24p per kWh, a 4kW system generating 3,400 kWh/year can save £600–£850 per year when combined with Smart Export Guarantee income. The West Midlands is one of the most active solar PV markets in the Midlands, with competitive installer pricing and a good pool of MCS-certified contractors.',
  },
  {
    question: 'How much does solar panel installation cost in Birmingham in 2025?',
    answer:
      'A typical 4kW system in Birmingham costs £5,000 to £7,500 fully installed including panels, inverter, mounting hardware, cabling, and commissioning. Birmingham prices are generally lower than London. Larger 6kW systems cost approximately £7,000 to £10,000. Battery storage systems add £2,500 to £5,000. All solar panels attract 0% VAT since February 2024.',
  },
  {
    question: 'How much electricity will a 4kW solar system generate in Birmingham?',
    answer:
      'A south-facing 4kW system at 35 degrees pitch in Birmingham will generate approximately 3,200–3,800 kWh per year. East or west-facing roofs achieve around 80–85% of south-facing output. A typical Birmingham semi-detached with a south-facing rear roof is an ideal candidate for solar. Modern monocrystalline panels at 400–450W mean a 4kW system requires only 9–10 panels.',
  },
  {
    question: 'Do I need planning permission for solar panels in Birmingham?',
    answer:
      'Most domestic solar PV installations in Birmingham are permitted development, requiring no planning application. However, Birmingham has numerous conservation areas (including Moseley, Harborne, and parts of Edgbaston) where front-elevation panels are not permitted development. Listed buildings require full planning permission. Check with Birmingham City Council\'s planning department or the relevant borough council (Solihull, Sandwell, Dudley, Walsall, Wolverhampton) before proceeding if your property has any designation.',
  },
  {
    question: 'What is the Smart Export Guarantee and how much will I earn?',
    answer:
      'The Smart Export Guarantee (SEG) pays you for electricity you export to the grid. It applies equally across England — there is no regional variation. To qualify, your system must be MCS-certified and you must have a smart meter. A 4kW Birmingham system that exports approximately 1,800–2,000 kWh/year at 8p/kWh earns around £144–£160/year in SEG income. Rates vary by supplier (3p–20p) — compare at the Ofgem SEG register.',
  },
  {
    question: 'What MCS certification is required for Birmingham solar installations?',
    answer:
      'The installer must be MCS-certified (verify at mcscertified.com), the panels and inverter must be MCS-certified products, and you should receive an MCS installation certificate on completion. This certificate is required to register for SEG and is important documentation for property sales. The installer must also issue an Electrical Installation Certificate (EIC) for the PV wiring under BS 7671 Section 712.',
  },
  {
    question: 'What is the payback period for solar in Birmingham?',
    answer:
      'The typical payback period for a 4kW solar PV system in Birmingham is 9–12 years. With approximately 3,400 kWh/year generation and 40% self-consumption at 24p/kWh, annual electricity savings are approximately £326. Add SEG income of approximately £150/year. Total annual benefit: ~£476. At a £6,500 installed cost, payback is approximately 13–14 years without battery, or 9–11 years when battery storage raises self-consumption to 70–80%.',
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
    href: '/solar-panel-installation-manchester',
    title: 'Solar Panel Installation Manchester',
    description: 'North West solar guide covering Manchester and the surrounding region.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/solar-panel-installation-bristol',
    title: 'Solar Panel Installation Bristol',
    description: 'Bristol and South West solar guide — strong irradiance and competitive costs.',
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
    heading: 'Solar Panel Installation in Birmingham — Overview',
    content: (
      <>
        <p>
          Birmingham and the wider West Midlands region sit in a solar irradiance band that makes
          rooftop solar PV a sound investment. The city receives more sun than its northern
          counterparts and comparable irradiance to much of the East Midlands and South Wales.
          Combined with high electricity prices, a growing installer market, and access to the
          Smart Export Guarantee, solar PV is increasingly the first choice renewable energy
          upgrade for Birmingham homeowners.
        </p>
        <p>
          Birmingham's housing stock — dominated by Victorian and Edwardian terraces, post-war
          semis, and modern new builds — is broadly well suited to rooftop solar. South and
          south-west facing rear roofs are common on the city's terraced streets and provide
          good solar yields. Larger detached properties in areas such as Solihull, Sutton
          Coldfield, and Edgbaston can accommodate substantial 5kW+ systems.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>West Midlands irradiance:</strong> ~900–980 kWh/kWp/year. Comparable to
                the East Midlands; slightly below London and the South East; significantly better
                than the North West.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Best roof types:</strong> South-facing pitched roofs at 30–40 degrees.
                East-west split arrays on semi-detached properties. Flat-roof systems with angled
                frames on commercial and large domestic properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competitive market:</strong> The West Midlands has a large pool of
                MCS-certified solar installers, leading to competitive pricing and good installer
                choice for Birmingham homeowners.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'irradiance',
    heading: 'West Midlands Solar Irradiance Data',
    content: (
      <>
        <p>
          Understanding your property's solar resource is the foundation of any installation
          decision. The European Commission's PVGIS tool provides free irradiance data for any
          UK postcode, and reputable MCS-certified installers will use this (or equivalent
          software) to produce a system design report.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>South-facing optimum:</strong> A south-facing roof at 35 degrees in the
                Birmingham area achieves approximately 940–980 kWh/kWp/year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>East-west arrays:</strong> Achieve around 80–85% of south-facing output
                (approximately 750–830 kWh/kWp/year) but generate more evenly through the day.
                Beneficial for self-consumption if the household uses electricity in the morning
                and evening.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shading:</strong> Tree shading from the West Midlands' suburban
                streetscapes is worth assessing. Ask your installer to produce a shading analysis
                as part of the design report.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'system-sizes',
    heading: 'Recommended System Sizes for Birmingham Properties',
    content: (
      <>
        <p>
          System size selection should match roof space, budget, and electricity consumption.
          Birmingham's varied housing stock means different properties suit different system sizes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3kW:</strong> Suits terraced houses and smaller semis. ~8–10 panels.
                Output: approximately 2,400–2,850 kWh/year. Cost: £4,000–£5,500.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4kW:</strong> Most popular choice. ~10–14 panels. Output: approximately
                3,200–3,800 kWh/year. Cost: £5,000–£7,500.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6kW:</strong> Ideal for detached properties in Solihull, Sutton Coldfield,
                or Wolverhampton. ~14–18 panels. Output: approximately 4,800–5,700 kWh/year.
                Cost: £7,000–£10,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>With battery:</strong> Adding a 5–10kWh battery to any size system
                raises self-consumption from ~30% to ~70% and significantly improves financial
                returns. Add £2,500–£5,000 to installation cost.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Solar Panel Installation Costs in Birmingham (2025)',
    content: (
      <>
        <p>
          Birmingham solar installation costs are competitive. The West Midlands has a healthy
          installer market that keeps prices below London levels. The following are fully installed
          prices including panels, inverter, mounting, cabling, Generation Meter, and commissioning.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3kW:</strong> £4,000–£5,500 installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4kW:</strong> £5,000–£7,500 installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6kW:</strong> £7,000–£10,000 installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery storage:</strong> £2,500–£5,000 additional. 0% VAT when installed
                at the same time as solar panels.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Solar panels (and batteries installed at the same time) attract 0% VAT. Labour is
          charged at the standard VAT rate for those registered for VAT, but many smaller
          installers in the Birmingham area are not VAT-registered — verify this when comparing
          quotes.
        </p>
      </>
    ),
  },
  {
    id: 'seg',
    heading: 'Smart Export Guarantee (SEG) for Birmingham Homeowners',
    content: (
      <>
        <p>
          The Smart Export Guarantee applies across England, Scotland, and Wales. Birmingham
          homeowners qualify on the same basis as any other UK property owner, provided the
          MCS requirements are met.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Requirements:</strong> MCS-certified installation, MCS-certified products,
                capacity under 5MW, and a smart export meter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rate range:</strong> 3p–20p per kWh exported. Compare suppliers via Ofgem's
                SEG register. Octopus Energy, E.ON Next, and British Gas offer competitive export
                tariffs as of 2025.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual income estimate:</strong> A 4kW Birmingham system exporting
                ~1,800–2,000 kWh/year at 8p/kWh earns approximately £144–£160/year in SEG
                payments.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'planning',
    heading: 'Planning Permission in Birmingham and the West Midlands',
    content: (
      <>
        <p>
          Domestic solar PV on pitched roofs is generally permitted development across the West
          Midlands. Exceptions apply for listed buildings and properties in conservation areas.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permitted development:</strong> No planning application required for most
                residential solar PV. Panels must not protrude more than 200mm from the roof
                surface and must not be on a wall or roof slope visible from a highway.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation areas:</strong> Birmingham has conservation areas in Moseley,
                Bournville, Harborne, Edgbaston, and parts of Sutton Coldfield. Front-elevation
                installations are not permitted development. Rear-roof panels typically remain
                within permitted development.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed buildings:</strong> Planning permission required. Birmingham has
                a significant number of listed buildings — check the Historic England and
                Birmingham City Council registers.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mcs',
    heading: 'MCS Certification — Requirements for Birmingham Installations',
    content: (
      <>
        <p>
          MCS certification requirements apply uniformly across the UK. Verify your installer's
          current MCS certificate before signing any contract.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installer certification:</strong> Check mcscertified.com. MCS certificates
                expire — a lapsed certificate means your installation will not qualify for SEG.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Product certification:</strong> Panels and inverter must be on the MCS
                products list. Premium brands (LG, SunPower, REC, Solis, SolarEdge) are all
                MCS-listed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation:</strong> You must receive an MCS installation certificate
                and an{' '}
                <SEOInternalLink href="/tools/eicr-certificate">
                  Electrical Installation Certificate
                </SEOInternalLink>{' '}
                for the PV wiring under BS 7671 Section 712.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'battery-storage',
    heading: 'Battery Storage for Birmingham Solar Installations',
    content: (
      <>
        <p>
          Adding a battery to a Birmingham solar installation increases self-consumption from
          the typical 25–35% (without battery) to 60–80%, substantially improving the annual
          financial return.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Popular systems:</strong> GivEnergy, SolarEdge Energy Hub, Solis, and
                Tesla Powerwall are all widely installed across the West Midlands. Capacity
                typically ranges from 5kWh to 13.5kWh.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost:</strong> £2,500–£5,000 additional. Batteries installed at the same
                time as solar panels attract 0% VAT.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grid charging:</strong> On low-solar days, the battery can be charged
                from the grid on cheap overnight tariffs (Agile, Economy 7) and discharged during
                evening peak hours — valuable for Birmingham households on time-of-use tariffs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'payback',
    heading: 'Solar Panel Payback Period in Birmingham',
    content: (
      <>
        <p>
          Birmingham's solid irradiance means payback periods are comparable to the UK average,
          and significantly better than northern England.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual savings (4kW, no battery):</strong> 3,400 kWh generated × 40%
                self-consumption × 24p/kWh = £326/year savings. SEG: 2,040 kWh exported ×
                8p/kWh = £163/year. Total: ~£489/year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Payback period:</strong> At £6,500 installed cost and £489/year benefit:
                approximately 13 years without battery. With battery raising self-consumption to
                70%: annual savings rise to ~£650+, improving payback to 10–11 years (factoring
                in battery cost).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>25-year system life:</strong> After payback, a further 12–15 years of
                near-free electricity. Quality panels carry 25-year performance warranties;
                inverters require replacement after 10–15 years (£500–£1,500).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-installer',
    heading: 'Finding an MCS-Certified Solar Installer in Birmingham',
    content: (
      <>
        <p>
          The West Midlands has a competitive solar installation market. Use these criteria to
          identify a trustworthy installer.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify MCS status:</strong> Check mcscertified.com. Search by postcode
                to find current MCS-certified installers near you.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RECC membership:</strong> Renewable Energy Consumer Code membership
                provides consumer protection and an alternative dispute resolution process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three quotes minimum:</strong> Get at least three quotes on like-for-like
                system specifications. Significant price variations are common in the Birmingham
                market.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design report:</strong> Request a written system design report showing
                modelled annual generation using PVGIS data for your specific postcode and roof
                orientation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Solar PV Work in the West Midlands',
    content: (
      <>
        <p>
          Birmingham and the West Midlands represent one of the UK's largest solar installation
          markets outside London. Electricians with MCS certification and BS 7671 Section 712
          competency are in demand.
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
                  to complete and email the Electrical Installation Certificate for solar PV
                  wiring before leaving the installation site. No paper, no evening admin.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Battery Storage Quotes On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  After commissioning a solar installation, generate a battery storage quote
                  immediately using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . West Midlands homeowners are increasingly adding battery storage — make the
                  upsell before leaving site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your solar PV business with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site solar certificates, quoting, and business management. 7-day free trial, cancel anytime."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SolarPanelInstallationBirminghamPage() {
  return (
    <GuideTemplate
      title="Solar Panel Installation Birmingham 2025 | Solar PV West Midlands"
      description="Solar panel installation in Birmingham 2025: costs £5,000–£7,500, irradiance ~940 kWh/kWp/year. Smart Export Guarantee, MCS certification, planning permission, battery storage, and payback period for the West Midlands."
      datePublished="2025-01-01"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Solar Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Solar Panel Installation Birmingham:{' '}
          <span className="text-yellow-400">Costs & Guide 2025</span>
        </>
      }
      heroSubtitle="The complete guide to solar PV installation in Birmingham and the West Midlands — system sizes, costs from £5,000, irradiance data, Smart Export Guarantee, MCS certification, planning permission, and realistic payback periods."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar Panel Installation in Birmingham"
      relatedPages={relatedPages}
      ctaHeading="Complete Solar PV Certificates On Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site solar EICs, quoting, and business management. 7-day free trial, cancel anytime."
    />
  );
}
