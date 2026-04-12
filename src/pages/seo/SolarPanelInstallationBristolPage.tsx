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
  TrendingUp,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Solar Guides', href: '/solar-panel-installation-bristol' },
  { label: 'Solar Panel Installation Bristol', href: '/solar-panel-installation-bristol' },
];

const tocItems = [
  { id: 'overview', label: 'Solar in Bristol — Why the South West Leads' },
  { id: 'irradiance', label: 'South West Solar Irradiance' },
  { id: 'system-sizes', label: 'System Sizes and Output' },
  { id: 'costs', label: 'Installation Costs 2025' },
  { id: 'seg', label: 'Smart Export Guarantee (SEG)' },
  { id: 'planning', label: 'Planning Permission in Bristol' },
  { id: 'mcs', label: 'MCS Certification' },
  { id: 'battery-storage', label: 'Battery Storage' },
  { id: 'payback', label: 'Payback Period' },
  { id: 'finding-installer', label: 'Finding an Installer' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Bristol and the South West enjoy some of the best solar irradiance in England — approximately 1,050–1,150 kWh/kWp/year, making it one of the most favourable locations in the UK for solar PV.',
  "A typical 4kW residential solar PV system in Bristol costs £5,000 to £7,500 fully installed and generates approximately 3,700–4,400 kWh per year — enough to cover most of the average household's annual electricity demand.",
  'Bristol has one of the strongest solar installation markets in England, with numerous MCS-certified installers competing for work. This drives competitive pricing and high installation quality.',
  'The Smart Export Guarantee (SEG) requires MCS certification — ensure your installer holds a current MCS certificate. Bristol homeowners can access the same SEG rates as the rest of England.',
  'BS 7671 Section 712 covers solar PV wiring requirements. All installations must comply and the installer must issue an Electrical Installation Certificate (EIC) for the PV installation wiring.',
];

const faqs = [
  {
    question: 'Is Bristol a good location for solar panels?',
    answer:
      'Yes — Bristol is one of the best locations in England for solar PV. The South West receives approximately 1,050–1,150 kWh/kWp/year of solar irradiation, making it one of the highest irradiance regions in the UK. This means a 4kW system in Bristol generates approximately 15–20% more electricity per year than the same system in Manchester, and around 10% more than London. Combined with a mature installer market and competitive costs, Bristol offers among the best solar economics in England.',
  },
  {
    question: 'How much does solar panel installation cost in Bristol in 2025?',
    answer:
      'A typical 4kW system in Bristol costs £5,000 to £7,500 fully installed, including panels, inverter, mounting, cabling, and commissioning. The Bristol and South West market is competitive, with many MCS-certified installers serving the area. Larger 6kW systems typically cost £7,000 to £10,000. Adding battery storage adds £2,500 to £5,000. Solar panels attract 0% VAT since February 2024.',
  },
  {
    question: 'How much electricity will solar panels generate in Bristol?',
    answer:
      'A south-facing 4kW system at 35 degrees pitch in Bristol will generate approximately 3,700–4,400 kWh per year — significantly more than the same system in northern England. The average UK household uses approximately 3,500 kWh/year, so a 4kW Bristol system can potentially cover 100% or more of annual electricity demand (before considering battery storage). East-west facing arrays achieve around 80–85% of south-facing output.',
  },
  {
    question: 'Do I need planning permission for solar panels in Bristol?',
    answer:
      'Most domestic solar PV installations in Bristol are permitted development — no planning permission required. However, Bristol has numerous conservation areas (including Clifton, Redland, Cotham, and Hotwells) and a significant number of listed buildings. Solar panels on front elevations in conservation areas are not permitted development. Bristol City Council should be consulted if your property is within a conservation area or is listed. South Gloucestershire, Bath, and other nearby authorities may have their own Article 4 directions.',
  },
  {
    question: 'What is the payback period for solar panels in Bristol?',
    answer:
      "Bristol's excellent irradiance means payback periods are among the shortest in England. A 4kW system generating 4,000 kWh/year with 40% self-consumption at 24p/kWh saves approximately £384/year on electricity. Add SEG income of approximately £175/year (2,400 kWh exported at 8p/kWh). Total annual benefit: ~£559/year. At £6,500 installed, payback is approximately 11–12 years. Adding a battery that raises self-consumption to 70% can reduce effective payback to 9–10 years.",
  },
  {
    question: 'Does Bristol have any solar grants or incentives in 2025?',
    answer:
      "There are no dedicated Bristol-specific solar grants in 2025. However, the UK Government's ECO4 scheme and the Great British Insulation Scheme may fund solar panels for low-income households as part of broader energy efficiency packages — eligibility depends on household income and property EPC rating. The Smart Export Guarantee (SEG) is the main ongoing financial incentive, available to all eligible installations regardless of income. Bristol City Council has historically supported community energy initiatives — check with the council for any current local schemes.",
  },
  {
    question: 'Which wiring regulations apply to solar PV in Bristol?',
    answer:
      'All solar PV installations in Bristol (and across the UK) must comply with BS 7671:2018+A3:2024, specifically Section 712 (Solar Photovoltaic Power Supply Systems). Key requirements include DC isolation and string protection, surge protection devices where required by risk assessment, correct labelling at inverter, consumer unit and meter positions, and appropriate earthing of the PV array. The installer must issue an Electrical Installation Certificate for the installation wiring and notify the work to building control (typically via a competent person scheme).',
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
    href: '/solar-panel-installation-manchester',
    title: 'Solar Panel Installation Manchester',
    description: 'North West solar guide — irradiance data, costs, and MCS requirements.',
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
    heading: 'Solar Panel Installation in Bristol — Why the South West Leads',
    content: (
      <>
        <p>
          Bristol and the wider South West region consistently rank among the top UK locations for
          solar PV investment. The combination of high irradiance, a large and competitive installer
          market, progressive homeowners keen on renewable energy, and rising electricity prices has
          made Bristol one of England's most active solar installation cities.
        </p>
        <p>
          The South West receives approximately 1,050–1,150 kWh/kWp/year of solar irradiation —
          roughly 10–15% more than London and 20–30% more than Manchester. This higher output
          translates directly into shorter payback periods and greater lifetime returns. A 4kW
          system in Bristol generates enough electricity to cover most or all of a typical
          household's annual electricity demand.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>South West irradiance advantage:</strong> ~1,050–1,150 kWh/kWp/year. Among
                the highest irradiance figures in England, comparable to parts of the South East
                coast.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4kW output in Bristol:</strong> Approximately 3,700–4,400 kWh/year on a
                south-facing roof — compared to 2,900–3,600 kWh in Manchester. This is the
                generation difference that drives Bristol's shorter payback periods.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competitive market:</strong> Bristol and the South West have a mature solar
                installation market with many MCS-certified installers. This drives competitive
                pricing and high installation standards.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'irradiance',
    heading: 'South West Solar Irradiance — Bristol in Context',
    content: (
      <>
        <p>
          Solar irradiance in the South West is shaped by the region's southerly latitude,
          prevailing Atlantic weather, and relatively low urban shading compared to London. The
          PVGIS tool provides detailed irradiance data for any Bristol or South West postcode.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bristol optimum:</strong> South-facing roof at 35 degrees achieves
                approximately 1,050–1,100 kWh/kWp/year. The coastal and rural parts of Somerset and
                Devon can exceed 1,150 kWh/kWp/year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Seasonal variation:</strong> South West summers are excellent for solar
                production. June, July, and August generate the majority of annual output. Winter
                months produce 10–20% of peak summer generation but still contribute meaningfully.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>East-west arrays:</strong> Many Bristol Victorian terraces with east-west
                orientation still achieve 800–900 kWh/kWp/year — above Manchester's south-facing
                optimum. Bristol's irradiance advantage makes even sub-optimal orientations viable.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'system-sizes',
    heading: 'System Sizes for Bristol Properties',
    content: (
      <>
        <p>
          Bristol's housing stock ranges from Georgian and Victorian terraces in Clifton and
          Totterdown, to Edwardian semis in Horfield and Fishponds, to modern new builds in Bradley
          Stoke and Emersons Green. Each property type has different solar potential.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3kW system:</strong> Smaller terraces and flats. ~8–10 panels. Output:
                approximately 2,800–3,300 kWh/year in Bristol. Cost: £3,800–£5,500.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4kW system:</strong> Most popular. ~10–14 panels. Output: approximately
                3,700–4,400 kWh/year. Can cover 100%+ of average household electricity demand. Cost:
                £5,000–£7,500.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6kW system:</strong> Larger homes, properties with EV chargers or heat
                pumps. ~14–18 panels. Output: approximately 5,600–6,600 kWh/year. Cost:
                £7,000–£10,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bristol new builds:</strong> Modern new builds in North Bristol are often
                solar-ready with strong south-facing roof orientations and no shading. Many
                developers now pre-install solar as standard.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Solar Panel Installation Costs in Bristol (2025)',
    content: (
      <>
        <p>
          Bristol's competitive installer market means solar costs are broadly in line with the
          national average, and often below London prices. The following are fully installed costs
          including panels, inverter, mounting hardware, DC and AC cabling, and commissioning.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3kW:</strong> £3,800–£5,500 installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4kW:</strong> £5,000–£7,500 installed. The best-value system size for most
                Bristol homeowners.
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
                <strong>Battery storage:</strong> £2,500–£5,000 additional. 0% VAT when installed at
                the same time as solar panels.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Scaffolding is typically included in Bristol installer quotes. Georgian and early
          Victorian properties in Clifton and Redland may require more complex scaffold structures
          due to roof height, which can add £300–£600 to the total cost.
        </p>
      </>
    ),
  },
  {
    id: 'seg',
    heading: 'Smart Export Guarantee (SEG) for Bristol Homeowners',
    content: (
      <>
        <p>
          The Smart Export Guarantee is available to all eligible Bristol homeowners on the same
          terms as the rest of England. Bristol's higher generation means more electricity available
          to export, increasing annual SEG income.
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
                <strong>Bristol export estimate:</strong> A 4kW system generating 4,000 kWh/year
                with 40% self-consumption exports approximately 2,400 kWh/year. At 8p/kWh SEG rate,
                that is ~£192/year — higher than equivalent London or Manchester systems due to
                Bristol's greater output.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rate comparison:</strong> Current SEG rates (2025): 3p–20p/kWh. Compare at
                the Ofgem SEG register before registering with a supplier. Review rates annually as
                you can switch SEG provider without penalty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Previous FiT recipients:</strong> If your system was installed before April
                2019 and registered for the Feed-in Tariff (FiT), you continue to receive FiT
                payments for the remaining term. You cannot register for SEG if you receive FiT.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'planning',
    heading: 'Planning Permission for Solar Panels in Bristol',
    content: (
      <>
        <p>
          Bristol presents some specific planning considerations due to its significant conservation
          area coverage and listed building stock. However, the majority of domestic solar PV
          installations remain permitted development.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permitted development:</strong> Applies to most residential rooftop solar
                where panels do not protrude more than 200mm from the roof surface and are not on a
                front elevation facing a highway.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bristol conservation areas:</strong> Clifton, Redland, Cotham, Hotwells,
                Kingsdown, and St Paul's are among Bristol's conservation areas. Front-elevation
                panels are not permitted development. Rear-roof panels on properties within
                conservation areas typically remain within permitted development — verify with
                Bristol City Council's planning team.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed buildings:</strong> Full planning permission required. Bristol has
                extensive listed building coverage, particularly in Clifton, the city centre, and
                inner suburbs. Check the Historic England register.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building regulations:</strong> All solar PV installations must be notified
                to building control. MCS-certified installers self-certify through a competent
                person scheme, avoiding a separate building regulations application.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mcs',
    heading: 'MCS Certification — Requirements for Bristol Solar Installations',
    content: (
      <>
        <p>
          MCS certification requirements apply uniformly across England. Bristol's large pool of
          MCS-certified installers means finding a qualified contractor is straightforward.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify at mcscertified.com:</strong> Check your installer's current MCS
                certificate before signing any contract. Lapsed certificates mean your installation
                will not qualify for SEG.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS installation certificate:</strong> Issued on completion. Required for
                SEG registration. Important for property sales — buyers' solicitors increasingly
                check for MCS documentation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate:</strong> The installer must issue an
                EIC for the solar PV wiring in compliance with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671 Section 712
                </SEOInternalLink>
                . This should be provided to you as part of your installation documentation pack.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'battery-storage',
    heading: 'Battery Storage in Bristol',
    content: (
      <>
        <p>
          Bristol's high solar generation makes battery storage particularly attractive. Without a
          battery, a typical Bristol household exports a large proportion of its solar generation
          during peak midday hours when the household is unoccupied. A battery captures this surplus
          for evening use.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-consumption without battery:</strong> A working household in Bristol
                typically self-consumes only 25–35% of solar generation midday peaks. The rest is
                exported at SEG rates (3p–20p/kWh) rather than displacing imported electricity
                (24p+/kWh).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-consumption with battery:</strong> A 5–10kWh battery raises
                self-consumption to 60–80%, ensuring you use the majority of your high-irradiance
                Bristol generation at full electricity price value.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bristol solar + battery economics:</strong> Higher generation means a larger
                battery capacity is justified in Bristol than in lower-irradiance locations. A 10kWh
                battery paired with a 4–6kW system gives the best overall performance. Cost:
                £3,000–£5,000 additional.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'payback',
    heading: 'Solar Panel Payback Period in Bristol',
    content: (
      <>
        <p>
          Bristol's irradiance advantage gives it some of the shortest solar payback periods in
          England outside of the far South East.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual savings (4kW, no battery):</strong> 4,000 kWh generated × 40%
                self-consumption × 24p/kWh = £384/year. SEG: 2,400 kWh exported × 8p/kWh =
                £192/year. Total: ~£576/year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Payback period:</strong> At £6,500 installed cost and £576/year benefit:
                approximately 11–12 years without battery. With battery increasing self-consumption
                to 70%: annual benefit rises to ~£700+, shortening effective payback to 9–10 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bristol irradiance premium:</strong> A Bristol system generates
                approximately 10–30% more electricity than the same system in northern England. Over
                a 25-year system life, that additional generation is worth thousands of pounds in
                avoided electricity purchases.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-installer',
    heading: 'Finding an MCS-Certified Installer in Bristol',
    content: (
      <>
        <p>
          Bristol has one of the highest concentrations of MCS-certified solar installers per capita
          in England. Use the following criteria to identify a reputable contractor.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS register:</strong> Verify current certification at mcscertified.com. The
                South West has a large number of certified installers — you should be able to get at
                least three local quotes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar Trade Association (STA):</strong> STA member installers commit to a
                code of conduct and are a useful additional quality check for Bristol homeowners.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local references:</strong> Bristol's established solar market means
                experienced installers will have many references in the city. Ask for case studies
                from similar property types (Victorian terrace, Georgian flat, modern new build).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PVGIS design report:</strong> Require a written system design document with
                modelled annual generation for your specific roof. Reputable Bristol installers
                provide this as standard.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Solar PV Work in Bristol and the South West',
    content: (
      <>
        <p>
          Bristol and the South West are among the busiest solar installation markets in England.
          MCS-certified electricians with the City and Guilds 2399 or equivalent qualification are
          in sustained demand. The region's high irradiance also drives a strong battery storage
          retrofit market for existing solar installations.
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
                  to complete the Electrical Installation Certificate for your solar PV wiring on
                  site. Send the PDF to the client before leaving — no evening paperwork in the
                  South West's busy installer market.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Battery Retrofit Opportunity</h4>
                <p className="text-white text-sm leading-relaxed">
                  Bristol has thousands of solar installations from the FiT era (2010–2019) that do
                  not have battery storage. Battery retrofit work is a high-margin, growing revenue
                  stream. Quote battery storage immediately on any new installation or service visit
                  using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your solar PV business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site solar certificates, instant quoting, and business management. 7-day free trial, cancel anytime."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SolarPanelInstallationBristolPage() {
  return (
    <GuideTemplate
      title="Solar Panel Installation Bristol 2025 | Solar PV Southwest"
      description="Solar panel installation in Bristol 2025: costs £5,000–£7,500, South West irradiance ~1,100 kWh/kWp/year. Smart Export Guarantee, MCS certification, conservation area planning, battery storage, and payback period guide."
      datePublished="2025-01-01"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Solar Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Solar Panel Installation Bristol:{' '}
          <span className="text-yellow-400">Costs & Guide 2025</span>
        </>
      }
      heroSubtitle="Bristol and the South West enjoy some of the best solar irradiance in England. Complete guide to solar PV installation — costs from £5,000, irradiance data, Smart Export Guarantee, MCS certification, conservation area planning rules, and payback periods."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar Panel Installation in Bristol"
      relatedPages={relatedPages}
      ctaHeading="Complete Solar PV Certificates On Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site solar EICs, quoting, and business management. 7-day free trial, cancel anytime."
    />
  );
}
