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
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Solar Guides', href: '/solar-panel-installation-edinburgh' },
  { label: 'Solar Panel Installation Edinburgh', href: '/solar-panel-installation-edinburgh' },
];

const tocItems = [
  { id: 'overview', label: 'Solar in Edinburgh — Scotland Overview' },
  { id: 'irradiance', label: 'Edinburgh Solar Irradiance' },
  { id: 'scottish-planning', label: 'Scottish Planning Rules' },
  { id: 'scottish-building-standards', label: 'Scottish Building Standards' },
  { id: 'system-sizes', label: 'System Sizes and Output' },
  { id: 'costs', label: 'Installation Costs 2025' },
  { id: 'seg', label: 'Smart Export Guarantee (SEG)' },
  { id: 'mcs', label: 'MCS Certification' },
  { id: 'battery-storage', label: 'Battery Storage' },
  { id: 'payback', label: 'Payback Period' },
  { id: 'finding-installer', label: 'Finding an Installer' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Edinburgh receives approximately 800–900 kWh of solar irradiation per kWp per year — lower than England but solar PV is still economically viable at current electricity prices, with hundreds of successful installations across the city.',
  'Scotland operates under Scottish Building Standards (not the Building Regulations that apply in England and Wales). Solar PV installations in Edinburgh must comply with Section 6 (Energy) of the Scottish Building Standards.',
  'Planning permission rules for solar PV in Scotland differ from England. Most domestic solar PV in Edinburgh is permitted development under the Town and Country Planning (General Permitted Development) (Scotland) Amendment Order 2012, but Edinburgh\'s World Heritage Site and Conservation Areas have different restrictions.',
  'The Smart Export Guarantee applies in Scotland on the same terms as England. MCS certification is mandatory for SEG eligibility — this requirement is identical across the UK.',
  'BS 7671 is used for electrical wiring design in Scotland (Scottish Building Standards reference BS 7671 for electrical requirements). Section 712 covers solar PV wiring.',
];

const faqs = [
  {
    question: 'Is solar worth it in Edinburgh?',
    answer:
      'Yes, though with a lower return than southern England. Edinburgh receives approximately 800–900 kWh/kWp/year of solar irradiation. A 4kW system generates roughly 2,700–3,200 kWh/year — around 25–30% less than a comparable system in London and around 35–40% less than Bristol. However, at current electricity prices above 24p/kWh, these generation levels still deliver meaningful electricity savings and Smart Export Guarantee income. Edinburgh solar installations have become increasingly common as panel prices have fallen and electricity prices have risen.',
  },
  {
    question: 'What are the planning rules for solar panels in Edinburgh?',
    answer:
      'Planning permission rules for solar PV in Scotland operate under the Town and Country Planning (General Permitted Development) (Scotland) Amendment Order 2012. Most domestic solar PV is permitted development, subject to conditions including that panels must not protrude more than 200mm above the roof surface. However, Edinburgh is a UNESCO World Heritage Site and has numerous conservation areas. Domestic solar panels within the World Heritage Site area and many of Edinburgh\'s conservation areas require planning permission — contact City of Edinburgh Council\'s planning department before proceeding if your property is in a designated area.',
  },
  {
    question: 'Do Scottish Building Standards apply instead of Building Regulations?',
    answer:
      'Yes. Scotland has its own building standards system, separate from the Building Regulations that apply in England and Wales. Solar PV installations in Edinburgh fall under Section 6 (Energy) of the Scottish Building Standards (Technical Handbooks — Domestic). The Scottish Building Standards Section 6 references relevant British Standards including BS 7671 for electrical work. Installers must notify installations to the local authority building standards department (or self-certify through an approved certifier of construction scheme). MCS-certified installers can use the MCS scheme for self-certification in Scotland.',
  },
  {
    question: 'How much does solar panel installation cost in Edinburgh in 2025?',
    answer:
      'A typical 4kW system in Edinburgh costs £5,500 to £8,000 fully installed. Edinburgh prices are typically 5–10% higher than the national average due to fewer local installers competing for work in Scotland compared to England, higher travel costs, and some additional complexity on Edinburgh\'s sandstone tenement properties. Larger 6kW systems typically cost £8,000 to £12,000. Battery storage adds £2,500 to £5,000. Solar panels attract 0% VAT across the UK since February 2024.',
  },
  {
    question: 'Does the Smart Export Guarantee apply in Scotland?',
    answer:
      'Yes. The Smart Export Guarantee applies across Great Britain — England, Scotland, and Wales. Edinburgh homeowners qualify for SEG on exactly the same terms as English homeowners, provided their installation is MCS-certified and they have a suitable smart meter. Current SEG rates (2025) are 3p–20p per kWh exported depending on the supplier and tariff chosen.',
  },
  {
    question: 'What MCS certification is required for Edinburgh solar installations?',
    answer:
      'MCS certification requirements are identical across the UK. Your installer must hold a current MCS certificate (verify at mcscertified.com), the panels and inverter must be MCS-certified products, and you should receive an MCS installation certificate on completion. This certificate is required for SEG registration. The installer must also comply with Scottish Building Standards Section 6 and issue an Electrical Installation Certificate for the PV wiring under BS 7671 Section 712.',
  },
  {
    question: 'What is the payback period for solar in Edinburgh?',
    answer:
      'The typical payback period for a 4kW solar PV system in Edinburgh is 12–16 years, longer than southern England due to lower irradiance. A 4kW system generating 2,900 kWh/year with 40% self-consumption at 24p/kWh saves approximately £278/year. Add SEG income of approximately £120/year. Total annual benefit: ~£398/year. At £7,000 installed cost, payback is approximately 17–18 years without battery, improving to 13–15 years when battery storage raises self-consumption to 70%. Rising electricity prices improve these figures year on year.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/solar-panel-installation-glasgow',
    title: 'Solar Panel Installation Glasgow',
    description: 'Glasgow solar guide — Scotland-specific planning rules and Scottish Building Standards.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/solar-panel-installation-london',
    title: 'Solar Panel Installation London',
    description: 'London solar PV guide with costs, planning rules, and SEG information.',
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
    description: 'Complete guide to BS 7671:2018+A3:2024 including Section 712 (Solar PV).',
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
    heading: 'Solar Panel Installation in Edinburgh — Scotland Overview',
    content: (
      <>
        <p>
          Edinburgh's solar PV market has grown substantially in recent years. While Scotland
          receives less solar irradiation than southern England, the economics of solar have
          improved dramatically as electricity prices have risen and panel costs have fallen.
          Edinburgh homeowners are now installing solar PV for the same fundamental reason as
          homeowners across the UK — to reduce electricity bills and earn Smart Export Guarantee
          income.
        </p>
        <p>
          Scotland's regulatory framework for solar PV differs from England in two key areas:
          the planning system (Scottish planning rules and the World Heritage Site designation
          that covers much of Edinburgh's Old and New Towns) and building standards (Scottish
          Building Standards rather than England's Building Regulations). Understanding these
          differences is essential for any Edinburgh homeowner or installer.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Edinburgh irradiance:</strong> ~800–900 kWh/kWp/year. Lower than England
                but sufficient for viable solar economics at current electricity prices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scottish regulations:</strong> Scottish Building Standards apply (not
                England's Building Regulations). Scottish planning rules under the Town and
                Country Planning (Scotland) Act 1997 and the 2012 GPDO Amendment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SEG and MCS:</strong> The Smart Export Guarantee and MCS certification
                requirements are identical to England. There is no Scottish-specific scheme.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'irradiance',
    heading: 'Edinburgh Solar Irradiance Data',
    content: (
      <>
        <p>
          Edinburgh is at latitude 55.9°N — one of the most northerly capital cities in the UK.
          This latitude means shorter winter days and a more pronounced seasonal variation in
          solar output than southern England. Despite this, Edinburgh's irradiance levels are
          sufficient for solar PV to deliver meaningful savings.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>South-facing optimum:</strong> A south-facing roof at 35 degrees in
                Edinburgh achieves approximately 850–900 kWh/kWp/year. East or west-facing
                roofs achieve around 680–760 kWh/kWp/year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Seasonal profile:</strong> Edinburgh summers (May–August) are excellent
                for solar. Long Scottish summer days (Edinburgh sees 17+ hours of daylight at
                midsummer) partially offset the lower sun angle. Winter months are significantly
                lower — panels may generate only 5–15% of peak summer output in December/January.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenement properties:</strong> Edinburgh's traditional sandstone tenements
                present challenges — shared roofs, south-facing orientation not always available,
                and additional planning complexity. Installer site surveys are particularly
                important for tenement properties.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'scottish-planning',
    heading: 'Scottish Planning Rules for Solar PV in Edinburgh',
    content: (
      <>
        <p>
          Scotland's planning framework for solar PV is set out in the Town and Country Planning
          (General Permitted Development) (Scotland) Amendment Order 2012. The rules are broadly
          similar to England but there are important differences, particularly in Edinburgh.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permitted development in Scotland:</strong> Most domestic solar PV is
                permitted development. Panels must not protrude more than 200mm above the roof
                surface. Additional conditions apply in designated areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Edinburgh Old and New Towns World Heritage Site:</strong> Much of central
                Edinburgh is a UNESCO World Heritage Site. Planning permission is required for
                solar PV installations that are visible from public areas within the World Heritage
                Site. This covers large areas of the city centre, Canongate, Grassmarket, New Town,
                and Calton Hill areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation areas:</strong> Edinburgh has numerous conservation areas
                beyond the World Heritage Site. Contact City of Edinburgh Council's planning
                department to confirm whether your property requires planning permission.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed buildings:</strong> Planning permission and Listed Building Consent
                are required. Edinburgh has an exceptionally high concentration of listed buildings —
                check the Historic Environment Scotland database before proceeding.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The City of Edinburgh Council provides a pre-application advice service for planning
          queries. Given Edinburgh's complex designation landscape, this is worth using before
          commissioning an installation in any area of the city.
        </p>
      </>
    ),
  },
  {
    id: 'scottish-building-standards',
    heading: 'Scottish Building Standards — How They Differ from England',
    content: (
      <>
        <p>
          This is a critical difference for Edinburgh homeowners and installers. Scotland has
          its own building standards system, entirely separate from the Building Regulations
          that apply in England and Wales.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scottish Building Standards — Section 6 (Energy):</strong> Solar PV
                installations fall within Section 6 of the Scottish Building Standards Technical
                Handbooks (Domestic). Section 6.2 covers electrical fixtures and fittings; Section
                6.9 covers renewable energy systems. All solar installations must comply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notification requirement:</strong> Unlike some work in England that falls
                below the building notice threshold, solar PV installations in Scotland must be
                notified to the local authority's building standards department before work
                commences (not after). City of Edinburgh Council's Building Standards team
                handles this.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certifier of Construction scheme:</strong> Scotland operates an Approved
                Certifier of Construction scheme that allows approved firms to self-certify certain
                types of work. MCS-certified solar installers may be able to self-certify through
                this scheme. Confirm with your installer before proceeding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 still applies:</strong> Scottish Building Standards reference BS
                7671 for electrical installation requirements. Section 712 (Solar Photovoltaic
                Power Supply Systems) therefore applies to all Edinburgh solar PV installations.
                An{' '}
                <SEOInternalLink href="/tools/eicr-certificate">
                  Electrical Installation Certificate
                </SEOInternalLink>{' '}
                must be issued for the PV wiring.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'system-sizes',
    heading: 'System Sizes for Edinburgh Properties',
    content: (
      <>
        <p>
          Edinburgh's housing stock presents specific challenges for solar PV. The city's
          sandstone tenement blocks have shared roofs (requiring all owners' agreement), while
          the Georgian New Town properties have complex roof structures. Suburban Edinburgh —
          Corstorphine, Morningside, Portobello, and Joppa — has a more conventional housing
          stock with better solar installation potential.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3kW system:</strong> Smaller properties with limited roof space. Output:
                approximately 2,000–2,400 kWh/year in Edinburgh. Cost: £4,500–£6,500.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4kW system:</strong> Most popular for suburban Edinburgh houses and
                bungalows. Output: approximately 2,700–3,200 kWh/year. Cost: £5,500–£8,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6kW system:</strong> Larger detached properties in suburban Edinburgh.
                Output: approximately 4,000–4,800 kWh/year. Cost: £8,000–£12,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenements:</strong> Technically possible where the building has a
                south-facing roof section and all owners in the tenement agree. Stair
                associations should be consulted before proceeding.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Solar Panel Installation Costs in Edinburgh (2025)',
    content: (
      <>
        <p>
          Edinburgh solar installation costs are generally 5–15% higher than the English average
          due to a smaller pool of local installers, higher travel costs for specialist components,
          and the additional complexity of working within Edinburgh's planning and building
          standards environment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3kW:</strong> £4,500–£6,500 installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4kW:</strong> £5,500–£8,000 installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6kW:</strong> £8,000–£12,000 installed.
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
          The Scottish Government has historically offered home energy efficiency grants through
          Home Energy Scotland. Check the current availability of any Scottish-specific grant
          support for solar PV, as these schemes change. Home Energy Scotland (0808 808 2282)
          is the first point of contact for Scottish Government energy grant advice.
        </p>
      </>
    ),
  },
  {
    id: 'seg',
    heading: 'Smart Export Guarantee (SEG) in Edinburgh',
    content: (
      <>
        <p>
          The Smart Export Guarantee applies equally across Scotland. Edinburgh homeowners can
          register with any eligible SEG supplier and benefit from the same export tariff rates
          as English homeowners.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Requirements:</strong> MCS-certified installation, MCS-certified products,
                capacity under 5MW, and a smart export meter. Identical to England.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Edinburgh export estimate:</strong> A 4kW system generating 2,900 kWh/year
                with 40% self-consumption exports approximately 1,740 kWh/year. At 8p/kWh:
                approximately £139/year in SEG income.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Current SEG rates:</strong> 3p–20p/kWh depending on supplier and tariff.
                Compare at the Ofgem SEG register. Scottish suppliers including Scottish Power and
                SSE offer SEG tariffs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mcs',
    heading: 'MCS Certification for Edinburgh Solar Installations',
    content: (
      <>
        <p>
          MCS certification requirements are identical across the UK. Verify your installer's
          current certificate before proceeding.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify at mcscertified.com:</strong> Check current MCS installer
                certification. Scotland has fewer MCS-certified solar installers per capita
                than England — verify carefully.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS certificate on completion:</strong> Required for SEG registration
                and property documentation. Important in Edinburgh where property sales require
                extensive documentation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate:</strong> Must be issued for the
                PV wiring under BS 7671 Section 712, referenced by Scottish Building Standards
                Section 6.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'battery-storage',
    heading: 'Battery Storage in Edinburgh',
    content: (
      <>
        <p>
          Battery storage provides significant benefits for Edinburgh solar installations.
          Scotland's long summer days produce substantial daytime generation, much of which
          occurs when households are at work. A battery stores this generation for evening use.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Summer generation:</strong> Edinburgh's long summer days (up to 17+ hours
                of daylight) produce peak daily generation well above household consumption for
                several months. A 10kWh battery can fully charge on summer days and provide
                electricity through the evening and night.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Winter grid charging:</strong> In Edinburgh winters, solar generation
                is low. A battery can be charged from the grid on cheap overnight tariffs
                (Economy 7, Octopus Agile) and discharged in evening peak hours — useful year-round.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost:</strong> £2,500–£5,000 additional. 0% VAT when installed at the
                same time as solar panels.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'payback',
    heading: 'Solar Payback Period in Edinburgh',
    content: (
      <>
        <p>
          Edinburgh's payback periods are longer than southern England due to lower irradiance,
          but rising electricity prices continue to improve the economics year on year.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual savings (4kW, no battery):</strong> 2,900 kWh generated × 40%
                self-consumption × 24p/kWh = £278/year. SEG: 1,740 kWh exported × 8p/kWh =
                £139/year. Total: ~£417/year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Payback period:</strong> At £7,000 installed and £417/year benefit:
                approximately 17 years without battery. With battery increasing self-consumption
                to 70%: annual savings rise to ~£550+, improving payback to 14–16 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long-term view:</strong> Over a 25-year system life, even Edinburgh's
                longer payback period results in substantial net returns. A system installed
                in 2025 with 8-year payback achieved by 2033 would then generate free electricity
                until 2050+.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-installer',
    heading: 'Finding an MCS-Certified Solar Installer in Edinburgh',
    content: (
      <>
        <p>
          Scotland has fewer MCS-certified solar installers per capita than England. Careful
          verification is important.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS register:</strong> Search mcscertified.com for current Edinburgh and
                central Scotland installers. Verify certificates are not lapsed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scottish planning expertise:</strong> Choose an installer familiar with
                Edinburgh's World Heritage Site and conservation area planning requirements.
                Ask specifically whether they have experience with Edinburgh City Council
                planning applications for solar PV.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scottish Building Standards compliance:</strong> Confirm your installer
                is familiar with the notification requirements to Edinburgh City Council's
                Building Standards department (or can self-certify through an approved scheme).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Home Energy Scotland:</strong> The Home Energy Scotland advice service
                (0808 808 2282) can provide guidance on finding local MCS-certified installers
                and any current Scottish Government grant support.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Solar PV Work in Edinburgh and Scotland',
    content: (
      <>
        <p>
          Scotland's solar installation market is growing. MCS-certified electricians who also
          understand Scottish Building Standards notification requirements are in demand. The
          additional regulatory knowledge required for Edinburgh work commands premium pricing.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue Solar EICs On Site in Scotland</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  to complete the Electrical Installation Certificate for your PV wiring on site.
                  BS 7671 Section 712 applies in Scotland as in England — the EIC requirements
                  are identical.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Charge Premium for Planning Knowledge</h4>
                <p className="text-white text-sm leading-relaxed">
                  Edinburgh solar installers who can navigate the World Heritage Site and conservation
                  area planning requirements command higher fees. Position your business as Edinburgh
                  planning specialists and quote using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
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
          description="Join 430+ UK electricians using Elec-Mate for on-site solar certificates, instant quoting, and business management. 7-day free trial, cancel anytime."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SolarPanelInstallationEdinburghPage() {
  return (
    <GuideTemplate
      title="Solar Panel Installation Edinburgh 2025 | Solar PV Scotland"
      description="Solar panel installation in Edinburgh 2025: Scottish Building Standards, World Heritage Site planning rules, costs £5,500–£8,000, irradiance ~850 kWh/kWp/year, Smart Export Guarantee, and MCS certification guide."
      datePublished="2025-01-01"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Solar Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Solar Panel Installation Edinburgh:{' '}
          <span className="text-yellow-400">Scotland Guide 2025</span>
        </>
      }
      heroSubtitle="Solar PV in Edinburgh comes with Scotland-specific planning and building standards requirements. Complete guide covering Scottish Building Standards, World Heritage Site planning rules, costs, Smart Export Guarantee, MCS certification, and realistic payback periods."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar Panel Installation in Edinburgh"
      relatedPages={relatedPages}
      ctaHeading="Complete Solar PV Certificates On Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site solar EICs, quoting, and business management. 7-day free trial, cancel anytime."
    />
  );
}
