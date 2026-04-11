import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Sun,
  PoundSterling,
  Zap,
  ShieldCheck,
  Home,
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
  { label: 'Solar Guides', href: '/guides/solar-panel-installation-london' },
  { label: 'Solar Panel Installation London', href: '/guides/solar-panel-installation-london' },
];

const tocItems = [
  { id: 'overview', label: 'Solar in London — Overview' },
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
  'A typical 4kW residential solar PV system in London costs £5,000 to £8,000 fully installed and can generate approximately 3,400 to 4,000 kWh per year — enough to cover a large share of the average household electricity demand.',
  'London receives around 1,000 kWh of solar irradiation per kWp per year — lower than southern Europe but sufficient to make solar PV economically viable, particularly with rising electricity prices.',
  'Most domestic solar PV installations in London do not require planning permission under permitted development rights, but listed buildings and conservation areas are exceptions.',
  'To qualify for the Smart Export Guarantee (SEG), your installation must be carried out by an MCS-certified installer and the system must be MCS-certified. Without MCS certification you cannot receive SEG payments.',
  'BS 7671 Section 712 (Solar Photovoltaic Power Supply Systems) sets out the wiring regulations requirements for PV installations, including isolation, protection, and labelling.',
];

const faqs = [
  {
    question: 'How much does solar panel installation cost in London in 2025?',
    answer:
      'A typical 4kW residential solar PV system in London costs between £5,000 and £8,000 fully installed, including panels, inverter, mounting hardware, DC and AC cabling, and commissioning. Larger 6kW systems typically cost £7,500 to £11,000. London prices are slightly higher than the national average due to elevated labour rates, more complex roof access in terraced properties, and parking costs. Adding a battery storage system typically adds £2,500 to £5,000 to the total cost.',
  },
  {
    question: 'How much electricity will solar panels generate in London?',
    answer:
      'London receives approximately 1,000 kWh of solar irradiation per kilowatt-peak (kWp) per year. A 4kW (4kWp) system will therefore generate around 3,400 to 4,000 kWh per year in typical London conditions, accounting for system losses. South-facing roofs at a pitch of 30 to 40 degrees achieve the best output. East- or west-facing roofs produce around 80 per cent of south-facing output. Flat roofs fitted with angled mounting frames also perform well.',
  },
  {
    question: 'Do I need planning permission for solar panels in London?',
    answer:
      'Most domestic solar PV installations in London do not require planning permission because they fall within permitted development rights under the Town and Country Planning (General Permitted Development) (England) Order 2015. The key conditions are that panels must not protrude more than 200mm from the roof surface and must not be installed on a wall facing a highway. However, planning permission is required for listed buildings and properties within designated conservation areas, Article 4 direction areas, or Areas of Outstanding Natural Beauty. Always check with your London borough council before installation if your property has any designations.',
  },
  {
    question: 'What is the Smart Export Guarantee and how does it work?',
    answer:
      'The Smart Export Guarantee (SEG) is a government-backed scheme that requires licensed electricity suppliers with 150,000 or more domestic customers to offer a tariff paying you for electricity you export to the grid. To qualify, your solar PV installation must be MCS-certified (Microgeneration Certification Scheme) and under 5MW in capacity. SEG rates vary by supplier — as of 2025, rates typically range from 3p to 20p per kWh exported. You can switch SEG providers at any time to find the best rate. SEG replaced the Feed-in Tariff (FiT) scheme, which closed to new applicants in April 2019.',
  },
  {
    question: 'What is MCS certification and why is it required?',
    answer:
      'The Microgeneration Certification Scheme (MCS) is a quality assurance framework for small-scale renewable energy installations. MCS certification is required for two reasons: first, it ensures the installation meets quality and safety standards; second, it is a mandatory condition for claiming Smart Export Guarantee payments. Only installations carried out by MCS-certified installers using MCS-certified products qualify for SEG. Always verify that your installer holds a current MCS certificate before signing any contract.',
  },
  {
    question: 'What is the payback period for solar panels in London?',
    answer:
      'The payback period for a typical 4kW solar PV system in London is currently 8 to 12 years, depending on your electricity tariff, self-consumption rate, and SEG income. With average electricity prices above 24p per kWh, a household that self-consumes 50 per cent of its solar generation and exports the rest will typically save £600 to £900 per year. Adding battery storage shortens the payback period by increasing self-consumption, but extends the overall investment recovery time due to the additional upfront cost.',
  },
  {
    question: 'Which wiring regulations apply to solar PV installations?',
    answer:
      'Solar PV installations in England must comply with BS 7671:2018+A3:2024, specifically Section 712 (Solar Photovoltaic Power Supply Systems). Key requirements include: appropriate DC isolation and string fuse protection, surge protection devices (SPDs) for both DC and AC sides where the risk assessment indicates their need, correct labelling at the inverter, consumer unit, and meter, and appropriate earthing of the PV array. The installation must also be notified to the local building control authority (or via a competent person scheme) as it constitutes electrical installation work.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/solar-panel-installation-manchester',
    title: 'Solar Panel Installation Manchester',
    description:
      'Solar PV costs, irradiance data, and finding MCS-certified installers in Manchester.',
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
    href: '/solar-panel-installation-bristol',
    title: 'Solar Panel Installation Bristol',
    description: 'Bristol solar PV guide — strong SW irradiance, costs, and SEG details.',
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
    heading: 'Solar Panel Installation in London — Is It Worth It?',
    content: (
      <>
        <p>
          London is not the sunniest city in the world, but solar PV installations across the
          capital are generating real savings for homeowners and businesses. With electricity prices
          above 24p per kWh, every kilowatt-hour your panels generate is a kilowatt-hour you do not
          pay for. Combine that with Smart Export Guarantee payments for surplus electricity and the
          economics of solar in London make compelling sense in 2025.
        </p>
        <p>
          London receives approximately 1,000 kWh of solar irradiation per kilowatt-peak (kWp) per
          year. A south-facing roof at 30 to 40 degrees pitch achieves peak performance, but
          east-west split arrays, flat-roof angled frames, and even north-facing arrays with modern
          high-efficiency panels are increasingly viable. The key is matching system size to your
          actual consumption patterns.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>London irradiance:</strong> ~1,000 kWh/kWp/year — lower than the South West
                but sufficient for strong economic returns at current electricity prices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical system:</strong> 4kW (10–14 panels) for a 3-bedroom house. Output:
                3,400–4,000 kWh/year. Covers 50–80% of average household electricity use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>London suitability:</strong> The vast majority of London's terraced houses,
                semi-detached homes, and purpose-built properties have south-facing or east-west
                roof sections suitable for solar PV.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'system-sizes',
    heading: 'System Sizes and Expected Output',
    content: (
      <>
        <p>
          Choosing the right system size for a London property depends on roof space, available
          budget, electricity consumption, and whether battery storage will be added. Most
          residential installations fall between 3kW and 6kW.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3kW system</strong> — suits flats and smaller terraced houses. Approximately
                8–10 panels. Expected output: 2,700–3,000 kWh/year in London. Typical cost:
                £4,000–£6,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4kW system</strong> — most popular choice for 3–4 bedroom London homes.
                Approximately 10–14 panels. Expected output: 3,400–4,000 kWh/year. Typical cost:
                £5,000–£8,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6kW system</strong> — suits larger detached homes or properties with high
                electricity use (EV charging, heat pumps). Approximately 14–18 panels. Expected
                output: 5,100–6,000 kWh/year. Typical cost: £7,500–£11,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial systems</strong> — London commercial properties often install
                10kW+ systems on flat roofs. These may require planning permission and are subject
                to additional{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671 Section 712
                </SEOInternalLink>{' '}
                design considerations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Modern monocrystalline panels typically offer 400–450W per panel, meaning a 4kW system
          requires as few as 9–10 panels on a standard London roof. High-efficiency panels
          (Sunpower, REC Alpha, Panasonic) can achieve more output in constrained roof spaces, which
          is particularly relevant for London's many terraced properties.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Solar Panel Installation Costs in London (2025)',
    content: (
      <>
        <p>
          London solar installation costs are slightly above the national average, primarily due to
          higher labour rates, scaffolding costs for terraced properties, and parking and congestion
          zone charges. The following prices are for fully installed systems including panels,
          inverter, mounting hardware, DC wiring, AC connection to the consumer unit, Generation
          Meter, and commissioning.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3kW system:</strong> £4,000–£6,000 installed. Suitable for smaller London
                properties and flats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4kW system:</strong> £5,000–£8,000 installed. The most common London
                residential installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6kW system:</strong> £7,500–£11,000 installed. Larger properties, those with
                EV chargers, or high electricity consumers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery storage addition:</strong> £2,500–£5,000 for a 5–10kWh battery
                (e.g., GivEnergy, SolarEdge, Tesla Powerwall). Increases self-consumption from ~30%
                to ~70–80%.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Solar panels attract zero VAT as of February 2024 (reduced from 5% to 0%), which
          represents a meaningful saving on a typical London installation. Labour costs are not
          VAT-zero rated for solar, but the panel and inverter components — which make up the
          majority of system cost — are VAT-free.
        </p>
      </>
    ),
  },
  {
    id: 'seg',
    heading: 'Smart Export Guarantee (SEG) — Getting Paid for Your Solar',
    content: (
      <>
        <p>
          The Smart Export Guarantee (SEG) requires licensed electricity suppliers with 150,000 or
          more domestic customers to offer a tariff paying you for electricity exported to the
          national grid. It replaced the Feed-in Tariff, which closed to new applicants in April
          2019.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS certification is mandatory</strong> — your installation must be carried
                out by an MCS-certified installer and the system must hold MCS certification.
                Without this, you cannot register for SEG regardless of your supplier.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart meter required</strong> — your energy supplier will need to install or
                verify a smart meter capable of measuring export. Most London homes already have or
                can easily get a smart meter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>2025 SEG rates:</strong> Typically 3p–20p per kWh exported, depending on
                supplier and tariff. Octopus Energy's Outgoing Octopus, E.ON Next Export, and
                British Gas Export tend to offer competitive rates. Compare before registering.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Income estimate:</strong> A 4kW London system that exports ~50% of its
                generation (approximately 1,700–2,000 kWh/year) at 8p per kWh would earn around
                £136–£160 per year in SEG payments, in addition to savings on imported electricity.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'planning',
    heading: 'Planning Permission for Solar Panels in London',
    content: (
      <>
        <p>
          In most cases, domestic solar PV installations in London are permitted development — you
          do not need to apply for planning permission. However, there are important exceptions
          relevant to London's built environment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permitted development conditions:</strong> Panels must not protrude more
                than 200mm from the roof surface, must not be on a wall or roof slope that faces a
                highway, and must be removed when no longer needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed buildings:</strong> Planning permission and (for Grade I and II*
                buildings) Listed Building Consent are required. Many central London properties are
                listed — check the Historic England register before proceeding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation areas:</strong> London has hundreds of conservation areas.
                Solar panels are not permitted development on a principal elevation (front) in a
                conservation area. Rear-roof installations may still be permitted development.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Article 4 directions:</strong> Some London boroughs have Article 4
                directions removing permitted development rights in specific streets or areas. Check
                with your borough council's planning department.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All solar PV installations must be notified to the local building control authority as
          they constitute electrical installation work. MCS-certified installers can self-certify
          their work through a competent person scheme, avoiding the need for a separate building
          regulations application.
        </p>
      </>
    ),
  },
  {
    id: 'mcs',
    heading: 'MCS Certification — Why It Matters',
    content: (
      <>
        <p>
          The Microgeneration Certification Scheme (MCS) is the industry quality standard for
          small-scale renewable energy installations in the UK. MCS certification is not optional if
          you want to claim SEG payments or access any government-backed incentives.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS-certified installer:</strong> The installation company must hold a
                current MCS certificate. You can verify this on the MCS website (mcscertified.com).
                MCS-certified installers must meet standards covering design, installation,
                commissioning, and customer service.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS-certified products:</strong> Panels and inverters must also be
                MCS-certified. Reputable manufacturers' products are almost all MCS-listed. Check
                the MCS product database before accepting any equipment substitution.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS installation certificate:</strong> You should receive an MCS
                installation certificate upon completion. This is your proof of eligibility for SEG
                and is required by energy suppliers when you register for an export tariff.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance:</strong> All MCS-certified installations must comply
                with BS 7671 Section 712. The installer must issue an{' '}
                <SEOInternalLink href="/tools/eicr-certificate">
                  Electrical Installation Certificate (EIC)
                </SEOInternalLink>{' '}
                for the PV installation wiring.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'battery-storage',
    heading: 'Battery Storage — Maximising Your Solar Investment',
    content: (
      <>
        <p>
          Adding a battery storage system to your London solar PV installation significantly
          increases the proportion of solar electricity you actually use. Without a battery, most
          solar energy generated during peak midday hours is exported to the grid when occupants are
          at work. A battery stores that surplus energy for use in the evening.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-consumption uplift:</strong> Without a battery, a typical London
                household self-consumes around 25–35% of solar generation. Adding a 5–10kWh battery
                typically raises self-consumption to 60–80%.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Popular systems:</strong> GivEnergy, SolarEdge, Solis, and Tesla Powerwall
                are among the most commonly installed battery systems in London. Capacity typically
                ranges from 5kWh to 13.5kWh for residential installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost:</strong> Battery systems add £2,500–£5,000 to the total installation
                cost. Batteries are VAT-exempt when installed alongside solar panels on the same
                job.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grid charging:</strong> Many battery systems can also be charged from the
                grid during cheap overnight Agile or Economy 7 tariffs, providing savings even on
                cloudy days.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'payback',
    heading: 'Payback Period — When Does Solar Pay for Itself?',
    content: (
      <>
        <p>
          The payback period for a London solar PV system depends on three variables: the cost of
          the installation, the value of electricity saved (self-consumption), and the SEG income
          earned on exports. At current electricity prices the economics are favourable.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical saving:</strong> A 4kW London system generating 3,600 kWh/year, with
                40% self-consumption (1,440 kWh) at 24p/kWh, saves approximately £346/year on
                electricity bills. SEG income at 8p/kWh on 2,160 kWh exported adds ~£173/year. Total
                annual benefit: ~£519/year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Payback period:</strong> At £6,500 installed cost and £519/year benefit,
                payback is approximately 12.5 years. Adding a battery that raises self-consumption
                to 70% improves annual savings to ~£650+ but extends overall payback if the battery
                adds £3,500 to costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>System lifetime:</strong> Quality solar panels carry 25–30 year performance
                warranties. Once payback is achieved, a further 15–20 years of near-free electricity
                follows. Modern inverters typically last 10–15 years before replacement
                (£500–£1,500).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Rising electricity prices, time-of-use tariffs, EV ownership, and heat pumps all improve
          the economics of solar in London. Homeowners who combine solar with an EV charger and
          battery storage often achieve payback in 8–10 years.
        </p>
      </>
    ),
  },
  {
    id: 'finding-installer',
    heading: 'Finding an MCS-Certified Solar Installer in London',
    content: (
      <>
        <p>
          London has a large and competitive solar installation market. Quality varies significantly
          — use the following checklist to identify a trustworthy MCS-certified installer.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify MCS certification:</strong> Check the installer's current MCS
                certificate at mcscertified.com. Certificates expire and must be renewed. An
                installer who has lapsed is not eligible to issue MCS certificates for your system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registration:</strong> Confirm the installer is registered
                with a competent person scheme for electrical work. This ensures BS 7671 compliance
                and enables self-certification of the electrical installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get three quotes:</strong> London solar prices vary. Obtain at least three
                quotes on a like-for-like basis (same system size, panel brand, and inverter). Be
                wary of quotes significantly below market rate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check reviews and references:</strong> Ask for references from recent London
                installations. Check Trustpilot, Google Reviews, and Which? Trusted Traders. The
                Solar Trade Association (STA) and RECC (Renewable Energy Consumer Code) membership
                provides additional consumer protection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Solar PV Work in London',
    content: (
      <>
        <p>
          Solar PV installation is a growth market in London. Electricians who hold the City and
          Guilds 2399 (Design, Installation, and Commissioning of Photovoltaic Systems) or
          equivalent qualification, combined with MCS installer certification, can command premium
          rates in London's competitive market.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue Solar PV EICs On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  to complete the Electrical Installation Certificate for PV wiring on site.
                  Generate a professional PDF and email it to the client before you leave — no
                  evening paperwork.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Battery Storage Add-Ons</h4>
                <p className="text-white text-sm leading-relaxed">
                  When completing a solar installation, quote battery storage immediately using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Battery retrofits are a high-margin, growing revenue stream for London solar
                  electricians.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your solar PV business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site certification, instant quoting, and business management. Complete solar EICs on your phone. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SolarPanelInstallationLondonPage() {
  return (
    <GuideTemplate
      title="Solar Panel Installation London 2025 | Solar PV London Costs"
      description="Solar panel installation costs in London 2025: 4kW system £5,000–£8,000. London generates ~1,000 kWh/kWp/year. Smart Export Guarantee, MCS certification, planning permission, and finding certified installers."
      datePublished="2025-01-01"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Solar Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Solar Panel Installation London:{' '}
          <span className="text-yellow-400">Costs & Guide 2025</span>
        </>
      }
      heroSubtitle="Everything you need to know about solar PV installation in London — system sizes, costs from £5,000, Smart Export Guarantee, MCS certification, planning permission, battery storage, and payback periods."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar Panel Installation in London"
      relatedPages={relatedPages}
      ctaHeading="Complete Solar PV Certificates On Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site solar EICs, quoting, and business management. 7-day free trial, cancel anytime."
    />
  );
}
