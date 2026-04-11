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
  { label: 'Solar Guides', href: '/solar-panel-installation-glasgow' },
  { label: 'Solar Panel Installation Glasgow', href: '/solar-panel-installation-glasgow' },
];

const tocItems = [
  { id: 'overview', label: 'Solar in Glasgow — Overview' },
  { id: 'irradiance', label: 'Glasgow Solar Irradiance' },
  { id: 'scottish-planning', label: 'Scottish Planning Rules for Glasgow' },
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
  'Glasgow receives approximately 800–880 kWh of solar irradiation per kWp per year — comparable to Edinburgh. Solar PV is economically viable at current electricity prices, with growing installation numbers across the city.',
  'A typical 4kW residential solar PV system in Glasgow costs £5,500 to £8,000 fully installed and generates approximately 2,700–3,100 kWh per year.',
  "Scotland operates under Scottish Building Standards (not England's Building Regulations). Glasgow solar PV installations must comply with Section 6 of the Scottish Building Standards Technical Handbooks and must be notified to Glasgow City Council's Building Standards team.",
  'Planning rules in Scotland operate under the Town and Country Planning (General Permitted Development) (Scotland) Amendment Order 2012. Glasgow has numerous conservation areas, particularly in the West End, where planning permission may be required.',
  'The Smart Export Guarantee (SEG) applies in Scotland on the same terms as England. MCS certification is mandatory for SEG eligibility — verify your installer at mcscertified.com before signing any contract.',
];

const faqs = [
  {
    question: 'Is solar worth it in Glasgow?',
    answer:
      "Yes, though the economics are more marginal than in southern England. Glasgow receives approximately 800–880 kWh/kWp/year of solar irradiation. At current electricity prices above 24p/kWh, a 4kW system generates enough electricity to save £250–£350/year on electricity bills, plus Smart Export Guarantee income. Glasgow's higher rainfall and cloud cover do not prevent solar generation — panels generate from daylight, not just sunshine. Modern high-efficiency panels perform better in diffuse light conditions than older technology, narrowing the gap between Scottish and English performance.",
  },
  {
    question: 'How much does solar panel installation cost in Glasgow in 2025?',
    answer:
      "A typical 4kW system in Glasgow costs £5,500 to £8,000 fully installed. Glasgow prices are broadly similar to Edinburgh, reflecting Scotland's smaller pool of MCS-certified installers compared to England. Larger 6kW systems typically cost £8,000 to £12,000. Adding battery storage adds £2,500 to £5,000. Solar panels attract 0% VAT across the UK since February 2024.",
  },
  {
    question: 'What are the Scottish Building Standards for solar PV in Glasgow?',
    answer:
      "Scotland has its own building standards system separate from England's Building Regulations. Solar PV in Glasgow falls under Section 6 (Energy) of the Scottish Building Standards Technical Handbooks (Domestic). Installations must be notified to Glasgow City Council's Building Standards department before work commences. The Scottish Building Standards reference BS 7671 for electrical work — Section 712 (Solar Photovoltaic Power Supply Systems) applies to all Glasgow solar installations. MCS-certified installers can self-certify under the Approved Certifier of Construction scheme where eligible.",
  },
  {
    question: 'Do I need planning permission for solar panels in Glasgow?',
    answer:
      "Most domestic solar PV in Glasgow is permitted development under the Town and Country Planning (General Permitted Development) (Scotland) Amendment Order 2012. Key conditions are that panels must not protrude more than 200mm above the roof surface and must not be on a wall visible from a road. Glasgow has numerous conservation areas — particularly in the West End (Kelvinside, Dowanhill, North Kelvinside), Merchant City, and parts of the Southside. Front-elevation installations in conservation areas may require planning permission. Contact Glasgow City Council's planning department if your property is in a designated area.",
  },
  {
    question: 'Does the Smart Export Guarantee apply in Glasgow?',
    answer:
      'Yes. The Smart Export Guarantee applies across Great Britain — England, Scotland, and Wales. Glasgow homeowners qualify for SEG on exactly the same terms as English homeowners, provided their installation is MCS-certified and they have a suitable smart meter. Current SEG rates (2025) are 3p–20p per kWh exported, depending on the supplier and tariff. Scottish Power and SSE (both with Scottish roots) offer competitive SEG tariffs alongside national suppliers such as Octopus Energy and E.ON Next.',
  },
  {
    question: 'What MCS certification is required for Glasgow solar installations?',
    answer:
      'MCS certification requirements are identical across the UK. Your installer must hold a current MCS certificate (verify at mcscertified.com), the panels and inverter must be MCS-certified products, and you must receive an MCS installation certificate on completion. This is required for SEG registration. The installer must also comply with Scottish Building Standards Section 6 and issue an Electrical Installation Certificate for the PV wiring under BS 7671 Section 712.',
  },
  {
    question: 'Are there any Scottish Government grants for solar panels in Glasgow?',
    answer:
      'The Scottish Government has historically offered home energy grants through Home Energy Scotland, including some support for renewable energy systems. Check current availability at homeenergyscotland.org or call 0808 808 2282. Eligibility typically depends on household income, property EPC rating, and the type of improvement being funded. The UK-wide Smart Export Guarantee remains the main ongoing financial incentive for solar, available to all eligible installations regardless of income.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/solar-panel-installation-edinburgh',
    title: 'Solar Panel Installation Edinburgh',
    description:
      'Edinburgh solar guide — Scottish planning, World Heritage Site rules, and building standards.',
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
    href: '/solar-panel-installation-london',
    title: 'Solar Panel Installation London',
    description: 'London solar PV guide with costs, planning rules, and SEG information.',
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
    heading: 'Solar Panel Installation in Glasgow — Is It Worth It?',
    content: (
      <>
        <p>
          Glasgow is Scotland's largest city and has seen growing solar PV uptake over the past
          decade. The question of whether solar is worth it in Glasgow comes down to a simple
          calculation: at current electricity prices, even Glasgow's lower solar irradiance delivers
          meaningful savings, and those savings compound over a 25-year system life.
        </p>
        <p>
          Glasgow homeowners also benefit from the Smart Export Guarantee, earning income on surplus
          electricity exported to the grid. The main differences from installing solar in England
          are the regulatory framework — Scottish Building Standards rather than Building
          Regulations — and Scottish planning rules that require more careful navigation in
          Glasgow's conservation areas.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Glasgow irradiance:</strong> ~800–880 kWh/kWp/year. Broadly similar to
                Edinburgh. Lower than England but viable for solar economics at 24p+/kWh electricity
                prices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scottish regulations:</strong> Scottish Building Standards (not England's
                Building Regulations). Notification to Glasgow City Council's Building Standards
                required before work commences.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS and SEG:</strong> Identical requirements to England. MCS certification
                mandatory for Smart Export Guarantee eligibility.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'irradiance',
    heading: 'Glasgow Solar Irradiance',
    content: (
      <>
        <p>
          Glasgow sits at approximately 55.9°N latitude, similar to Edinburgh but with a slightly
          different microclimate due to its west-coast Atlantic position. Glasgow receives somewhat
          more cloud cover than Edinburgh but also has milder temperatures. Solar irradiance across
          the two cities is broadly similar.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>South-facing optimum:</strong> A south-facing roof at 35 degrees in Glasgow
                achieves approximately 830–880 kWh/kWp/year. East or west-facing roofs achieve
                around 660–750 kWh/kWp/year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Summer vs winter:</strong> Glasgow's long summer days (17+ hours daylight in
                June) generate strong summer output. Winter generation is significantly lower.
                Annual output is therefore more front-loaded to spring and summer than southern
                England, where generation is distributed more evenly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Glasgow housing:</strong> Glasgow's traditional sandstone tenements and
                terraces are widespread. Many have shared roofs requiring all residents' agreement
                for installation. Suburban Glasgow — Bearsden, Milngavie, Newton Mearns, Clarkston —
                has more conventional housing with better solar installation potential.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'scottish-planning',
    heading: 'Scottish Planning Rules for Glasgow Solar PV',
    content: (
      <>
        <p>
          Glasgow's planning rules for solar PV operate under the Scottish planning framework. While
          most domestic solar remains permitted development, Glasgow's significant number of
          conservation areas requires careful checking before installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permitted development:</strong> Most residential rooftop solar in Glasgow is
                permitted development under the Town and Country Planning (General Permitted
                Development) (Scotland) Amendment Order 2012. Panels must not protrude more than
                200mm above the roof surface.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation areas:</strong> Glasgow's conservation areas include the West
                End (Kelvinside, Dowanhill, North Kelvinside, Hyndland), Merchant City, parts of the
                Southside (Shawlands, Strathbungo), and Great Western Road corridor. Front-facing
                installations in conservation areas may not be permitted development — check with
                Glasgow City Council's planning department.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed buildings:</strong> Glasgow has significant listed building stock —
                the Victorian and Edwardian architecture of the West End and city centre is
                extensively listed. Check Historic Environment Scotland's database. Planning
                permission and Listed Building Consent required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pre-application advice:</strong> Glasgow City Council offers a
                pre-application advice service for planning queries. Use this if your property may
                fall within a conservation area or have any listed designation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'scottish-building-standards',
    heading: 'Scottish Building Standards for Glasgow Solar Installations',
    content: (
      <>
        <p>
          Scotland's building standards system is entirely separate from the Building Regulations
          that apply in England and Wales. This is a critical difference for installers working
          across both sides of the border.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 6 (Energy):</strong> Glasgow solar PV installations fall under
                Section 6 of the Scottish Building Standards Technical Handbooks (Domestic). Section
                6.2 covers electrical fixtures; Section 6.9 covers renewable energy systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notification before work:</strong> Glasgow City Council's Building Standards
                department must be notified before work commences — not after. This differs from
                some English permitted development notification processes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certifier of Construction:</strong> Scotland's Approved Certifier of
                Construction scheme allows eligible firms to self-certify certain types of work.
                MCS-certified installers should confirm whether their certification enables
                self-certification under this Scottish scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 referenced by Scottish standards:</strong> Scottish Building
                Standards reference BS 7671 for electrical requirements. Section 712 (Solar
                Photovoltaic Power Supply Systems) therefore applies in Glasgow as in England. An{' '}
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
    heading: 'System Sizes for Glasgow Properties',
    content: (
      <>
        <p>
          Glasgow's housing stock is diverse — from traditional red and blonde sandstone tenements
          to inter-war semis, post-war council houses, and modern new builds in the suburbs. System
          size selection depends on roof type, orientation, and available space.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3kW system:</strong> Suitable for smaller properties with limited roof
                space. Output: approximately 1,900–2,200 kWh/year in Glasgow. Cost: £4,500–£6,500.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4kW system:</strong> Most popular choice for Glasgow semis and detached
                houses in the suburbs. Output: approximately 2,700–3,100 kWh/year. Cost:
                £5,500–£8,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6kW system:</strong> Larger suburban properties in Bearsden, Milngavie,
                Newton Mearns, and East Kilbride. Output: approximately 4,000–4,800 kWh/year. Cost:
                £8,000–£12,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenements:</strong> Possible where the building has a south-facing roof with
                south-facing sections and all owners agree. A formal agreement between owners (or
                the Owners' Association where one exists) is recommended before commissioning.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Solar Panel Installation Costs in Glasgow (2025)',
    content: (
      <>
        <p>
          Glasgow installation costs are broadly similar to Edinburgh — slightly higher than the
          English national average due to a smaller local installer market. The following are fully
          installed costs including panels, inverter, mounting, cabling, and commissioning.
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
                <strong>Battery storage:</strong> £2,500–£5,000 additional. 0% VAT when installed at
                the same time as solar panels.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Home Energy Scotland (0808 808 2282) should be consulted for any current Scottish
          Government grant support for solar PV in Glasgow. Eligibility criteria and scheme
          availability change — contact them for up-to-date information.
        </p>
      </>
    ),
  },
  {
    id: 'seg',
    heading: 'Smart Export Guarantee (SEG) in Glasgow',
    content: (
      <>
        <p>
          The Smart Export Guarantee applies across Great Britain. Glasgow homeowners access the
          same export tariff rates as English homeowners, subject to the same MCS eligibility
          requirements.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Requirements:</strong> MCS-certified installation and products, capacity
                under 5MW, and a smart export meter. Identical requirements to England.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Glasgow export estimate:</strong> A 4kW system generating 2,800 kWh/year
                with 40% self-consumption exports approximately 1,680 kWh/year. At 8p/kWh:
                approximately £134/year in SEG income.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scottish suppliers:</strong> Scottish Power and SSE (originally Scottish and
                Southern Energy) both offer SEG tariffs and have strong coverage in Glasgow. Octopus
                Energy's Outgoing Octopus tariff is also available in Scotland.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switching providers:</strong> You can switch SEG supplier at any time.
                Review available rates at the Ofgem SEG register annually.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mcs',
    heading: 'MCS Certification for Glasgow Solar Installations',
    content: (
      <>
        <p>
          MCS certification is mandatory for SEG eligibility and applies identically across the UK.
          Glasgow has fewer MCS-certified solar installers per capita than England — careful
          verification is important.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify at mcscertified.com:</strong> Search for current MCS-certified
                installers in the Glasgow area. Confirm the certificate is current, not lapsed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS installation certificate:</strong> Must be issued on completion.
                Required for SEG registration and important for property sales — Scottish property
                solicitors increasingly request MCS documentation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate:</strong> Must be issued for the PV
                wiring under BS 7671 Section 712, referenced by Scottish Building Standards Section
                6.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scottish Building Standards compliance:</strong> Confirm your installer is
                familiar with notification requirements to Glasgow City Council's Building Standards
                department (or can self-certify through the Approved Certifier of Construction
                scheme).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'battery-storage',
    heading: 'Battery Storage in Glasgow',
    content: (
      <>
        <p>
          Battery storage enhances the economics of Glasgow solar installations by capturing summer
          daytime generation for evening use, and enabling cheap overnight grid charging in winter
          months when solar output is low.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-consumption increase:</strong> Without battery: 25–35% of solar
                generation used on-site. With a 5–10kWh battery: 60–80%. This is especially valuable
                in Glasgow where generation is concentrated in summer months and daytime hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Winter grid charging:</strong> Glasgow winters see very limited solar
                generation. Many Glasgow homeowners programme their battery to charge from the grid
                on cheap overnight tariffs (Economy 7, Octopus Agile) and discharge in the evening —
                delivering savings independent of solar generation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recommended capacity:</strong> A 5–10kWh battery suits most Glasgow
                residential installations. Higher capacity is less cost-effective in Glasgow due to
                limited winter solar. Focus on maximising self-consumption of summer generation
                rather than over-sizing battery capacity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost:</strong> £2,500–£5,000 additional. 0% VAT when installed at the same
                time as solar panels.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'payback',
    heading: 'Solar Panel Payback Period in Glasgow',
    content: (
      <>
        <p>
          Glasgow's payback periods are broadly similar to Edinburgh and longer than southern
          England, reflecting the lower irradiance. Rising electricity prices continue to improve
          these figures year on year.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual savings (4kW, no battery):</strong> 2,800 kWh generated × 40%
                self-consumption × 24p/kWh = £269/year. SEG: 1,680 kWh exported × 8p/kWh =
                £134/year. Total: ~£403/year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Payback period:</strong> At £7,000 installed and £403/year benefit:
                approximately 17–18 years without battery. With battery increasing self-consumption
                to 70%: annual savings rise to ~£530+, improving payback to 14–16 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long-term perspective:</strong> A Glasgow system installed in 2025 will
                generate electricity until 2050+. Even with a 17-year payback, the subsequent 8–13
                years of near-free electricity represent significant lifetime value. Electricity
                price inflation accelerates this return.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-installer',
    heading: 'Finding an MCS-Certified Solar Installer in Glasgow',
    content: (
      <>
        <p>
          Scotland has fewer MCS-certified solar installers than England. Careful verification and
          selection is important for Glasgow homeowners.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS register:</strong> Search mcscertified.com for Glasgow and Central
                Scotland installers. Verify current (not lapsed) certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scottish planning knowledge:</strong> Prioritise installers with
                demonstrated experience of Glasgow City Council's planning and building standards
                processes, particularly for properties in conservation areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Home Energy Scotland:</strong> Call 0808 808 2282 for independent advice on
                local MCS-certified installers and any available Scottish Government funding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get three quotes:</strong> Even with fewer local installers, obtain at least
                three quotes. Prices vary in the Scottish market. Require a written system design
                report with PVGIS-modelled generation figures for your specific postcode and roof
                before committing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Solar PV Work in Glasgow and Scotland',
    content: (
      <>
        <p>
          Glasgow's solar market is growing and the lower density of local MCS-certified installers
          creates opportunity for qualified electricians who invest in the right qualifications and
          regulatory knowledge. Electricians who understand Scottish Building Standards are
          particularly well placed.
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
                  wiring on site. BS 7671 Section 712 applies in Scotland — the EIC requirements are
                  identical to England. Send the PDF to the client before leaving site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Scottish Building Standards Premium</h4>
                <p className="text-white text-sm leading-relaxed">
                  Electricians who are familiar with Scottish Building Standards notification
                  requirements command a premium in the Glasgow market. Position your business as
                  specialists and quote at appropriate rates using the{' '}
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

export default function SolarPanelInstallationGlasgowPage() {
  return (
    <GuideTemplate
      title="Solar Panel Installation Glasgow 2025 | Solar PV Scotland"
      description="Solar panel installation in Glasgow 2025: Scottish Building Standards, conservation area planning rules, costs £5,500–£8,000, irradiance ~840 kWh/kWp/year, Smart Export Guarantee, and MCS certification guide."
      datePublished="2025-01-01"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Solar Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Solar Panel Installation Glasgow:{' '}
          <span className="text-yellow-400">Scotland Guide 2025</span>
        </>
      }
      heroSubtitle="Complete guide to solar PV installation in Glasgow — Scottish Building Standards, conservation area planning rules, costs from £5,500, irradiance data, Smart Export Guarantee, MCS certification, and realistic payback periods."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar Panel Installation in Glasgow"
      relatedPages={relatedPages}
      ctaHeading="Complete Solar PV Certificates On Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site solar EICs, quoting, and business management. 7-day free trial, cancel anytime."
    />
  );
}
