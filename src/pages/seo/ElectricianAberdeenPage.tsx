import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  ShieldCheck,
  Building2,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  GraduationCap,
  Landmark,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Electrician in Aberdeen', href: '/electricians/aberdeen' },
];

const tocItems = [
  { id: 'overview', label: 'Aberdeen Overview' },
  { id: 'regulations', label: 'Scottish Building Standards' },
  { id: 'dno', label: 'SSEN Distribution Network' },
  { id: 'property-types', label: 'Aberdeen Property Types' },
  { id: 'oil-gas', label: 'Oil and Gas Industry Electrical Work' },
  { id: 'pricing', label: 'Electrician Rates in Aberdeen' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Aberdeen is in Scotland — Part P of the Building Regulations does not apply. Electrical work is governed by Scottish Building Standards (Technical Handbook Section 4: Safety), and building warrants are required for notifiable work. BS 7671 applies UK-wide.',
  'SSEN (Scottish and Southern Electricity Networks) is the Distribution Network Operator for Aberdeen and the north of Scotland. DNO notifications for solar PV, battery storage, EV chargers, and new connections go through SSEN.',
  'Aberdeen has a large stock of granite-built terraced and semi-detached properties. Solid granite walls make cable concealment difficult, and surface-mounted trunking is standard for rewires in older granite housing.',
  'The oil and gas industry creates significant demand for specialist electrical work — offshore module assembly, subsea equipment testing, and onshore industrial installations require additional qualifications including CompEx certification.',
  'Aberdeen labour rates are among the highest in Scotland, driven by competition from the offshore industry. Skilled electricians can earn significantly more than the Scottish average.',
];

const faqs = [
  {
    question: 'Does Part P apply to electrical work in Aberdeen?',
    answer:
      'No. Part P of the Building Regulations applies only to England and Wales. Aberdeen is in Scotland, where electrical work in dwellings is regulated under Scottish Building Standards — specifically Section 4 (Safety) of the Technical Handbook — Domestic. A building warrant is required from Aberdeen City Council Building Standards before starting notifiable work such as a rewire, consumer unit replacement, or new installation. An Electrical Installation Certificate (EIC) is required as evidence of compliance with BS 7671:2018+A3:2024 on completion.',
  },
  {
    question: 'Who is the DNO for Aberdeen?',
    answer:
      'SSEN (Scottish and Southern Electricity Networks) is the Distribution Network Operator for Aberdeen and the north and north-east of Scotland. All connection applications, capacity upgrade requests, and generation notifications (G98 for installations up to 16A per phase, G99 for larger systems) go through SSEN. SSEN also handles EV charger notifications for installations above 7.4 kW single-phase or 11 kW three-phase.',
  },
  {
    question: 'How much does an electrician cost in Aberdeen?',
    answer:
      'Aberdeen electrician rates in 2026 are among the highest in Scotland, reflecting competition with the offshore energy sector for skilled labour. Typical rates: hourly rate £50 to £75 for a qualified, registered electrician; day rate £350 to £550 for a sole trader. Common fixed-price jobs: consumer unit replacement £700 to £1,100, full rewire (3-bed granite semi) £4,500 to £7,000, EICR £200 to £320, EV charger installation £900 to £1,400. Emergency call-out rates are £90 to £130 per hour.',
  },
  {
    question: 'What are the challenges of electrical work in Aberdeen granite properties?',
    answer:
      "Aberdeen's granite-built properties — terraces and semis built between 1870 and 1940 — have solid stone walls with no cavity. Running cables through solid granite is impractical, so surface-mounted trunking (mini-trunking or dado trunking) is standard for rewires. Cable runs tend to be longer than in cavity-wall properties, requiring careful voltage drop calculations. Pre-1980s granite properties may also contain asbestos in textured ceiling coatings, floor tiles, and pipe lagging — an asbestos survey is advisable before invasive work.",
  },
  {
    question: 'Do Aberdeen electricians need SELECT registration?',
    answer:
      'SELECT (the trade association for the electrical, plumbing, and renewables industries in Scotland) is the leading trade body for Scottish electricians. SELECT-registered contractors can certify work through the SELECT Certification Services scheme, which simplifies the building warrant process. While NICEIC and NAPIT are also accepted in Scotland, many Aberdeen customers and house factors specifically look for SELECT registration. It is strongly recommended for any electrician building a practice in Aberdeen.',
  },
  {
    question: 'What is CompEx certification and do Aberdeen electricians need it?',
    answer:
      "CompEx is a certification scheme for those working in explosive atmospheres — environments where flammable gases, vapours, dusts, or fibres may be present. Aberdeen's offshore oil and gas industry creates significant demand for CompEx-certified electricians, both for onshore fabrication yards and support facilities. CompEx units cover Ex equipment inspection, maintenance, and installation. While CompEx is not required for standard domestic and commercial work, it significantly increases earning potential for Aberdeen electricians working in the energy sector.",
  },
  {
    question: 'How does the SELECT building warrant process work in Aberdeen?',
    answer:
      'For notifiable electrical work in Aberdeen, a building warrant must be obtained from Aberdeen City Council Building Standards before work begins. The warrant application requires details of the proposed work, and a fee is payable based on the value of the work. On completion, a completion certificate is submitted along with the EIC as evidence of compliance. SELECT-registered contractors can use the SELECT Certification Services scheme, which streamlines the process — the contractor certifies the work and submits directly, reducing the need for council inspection in most cases.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on site — required for building warrant completion in Aberdeen.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Aberdeen rental properties and periodic inspections.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for long surface-mounted trunking routes in Aberdeen granite properties.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Aberdeen — SSEN notifications and granite property considerations.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote granite property rewires, consumer unit upgrades, and EV installations with Aberdeen pricing.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering inspection and testing procedures.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Electrician in Aberdeen: What You Need to Know',
    content: (
      <>
        <p>
          Aberdeen is Scotland's third-largest city and the centre of the UK's offshore oil and gas
          industry. With a population of around 230,000 and a strong economy driven by energy,
          universities, and a growing tech and life sciences sector, Aberdeen offers electricians a
          diverse and well-paid market.
        </p>
        <p>
          The city's housing stock is dominated by granite-built properties — solid stone terraces
          and semis from the Victorian and Edwardian eras, alongside interwar council housing and
          modern new-build estates in the suburbs. The offshore industry creates specialist demand
          for CompEx-certified electricians in onshore fabrication facilities, and the city's strong
          economy drives healthy demand for domestic and commercial electrical services.
        </p>
        <p>
          This guide covers Scottish Building Standards (not Part P), the local DNO (SSEN), the
          challenges of granite property work, the offshore industry's influence on the local
          market, pricing, and practical tools for electricians working in Aberdeen.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Scottish Building Standards: Not Part P',
    content: (
      <>
        <p>
          Aberdeen electricians work under Scottish Building Standards, not the Building Regulations
          for England and Wales. This is a critical distinction for any electrician moving from
          south of the border or taking on Scottish work:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technical Handbook Section 4 (Safety)</strong> — the Scottish equivalent of
                Part P. Requires electrical installations to comply with BS 7671 and to be designed,
                installed, inspected, and tested by a competent person. The electrical standard (BS
                7671:2018+A3:2024) is identical — only the compliance route differs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building warrants</strong> — required before starting notifiable work
                (rewires, consumer unit replacements, new installations). Obtained from Aberdeen
                City Council Building Standards. There is no self-certification route without a
                warrant — unlike England, where competent person scheme members can self-certify
                without prior council involvement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Completion certificates</strong> — submitted to the council after work is
                finished, with the EIC attached as evidence of BS 7671 compliance. The council may
                inspect before accepting the certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELECT registration</strong> — strongly recommended for Aberdeen
                electricians. SELECT's Certification Services scheme streamlines the building
                warrant process and is well recognised by Aberdeen customers, letting agents, and
                local authorities.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'SSEN: Aberdeen Distribution Network Operator',
    content: (
      <>
        <p>
          <strong>SSEN (Scottish and Southern Electricity Networks)</strong> is the DNO for Aberdeen
          and the north of Scotland. All DNO-related work in Aberdeen goes through SSEN:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and capacity upgrades</strong> — SSEN handles all new supply
                connections, service upgrades (e.g., from 60A to 100A for EV charger or heat pump),
                and diversity of supply questions for multi-occupancy buildings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notifications</strong> — solar PV, battery storage, and other
                generation equipment. G98 for systems up to 16A per phase is a simple online
                notification. G99 for larger systems requires prior approval and can take several
                weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing arrangements</strong> — Aberdeen properties are predominantly
                TN-C-S (PME) or TN-S. Older granite properties with original lead-sheathed service
                cables may have TN-S earthing. Always confirm the earthing arrangement at the intake
                before specifying protective devices and before adding PME-incompatible equipment
                such as outdoor installations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Aberdeen Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Aberdeen's housing is defined by granite — dense, grey, and beautiful, but challenging for
          electricians. Here are the main property types and their electrical characteristics:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Granite Terraces and Semis</h3>
            <p className="text-white text-sm leading-relaxed">
              Built between 1870 and 1940, these solid granite properties dominate the west end and
              inner suburbs. Solid stone walls mean no cavity for cables — surface-mounted
              mini-trunking is standard. Asbestos surveys recommended in pre-1985 properties. Areas:
              West End, Rosemount, Torry, Kittybrewster.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Interwar Council Housing</h3>
            <p className="text-white text-sm leading-relaxed">
              1920s–1940s council-built properties in areas such as Northfield, Mastrick, and
              Summerhill. These have cavity walls and are more amenable to concealed wiring.
              Original wiring is often overdue for replacement, with rewirable fuse boards and
              rubber-insulated cables common.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War and Modern Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Post-war estates in Bridge of Don, Dyce, and Portlethen (south of Aberdeen) are built
              with cavity walls and standard cable routing. Modern new-builds feature current
              consumer units and EV charger provisions. Work is typically additions, modifications,
              and EV charger installations.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial and Industrial</h3>
            <p className="text-white text-sm leading-relaxed">
              Aberdeen's harbour, airport business park, and Altens industrial estate host
              significant commercial and light industrial electrical work. Energy sector facilities
              at the Aberdeen Energy Park and fabrication yards at the harbour require specialist
              knowledge and, in many cases, CompEx certification.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'oil-gas',
    heading: 'Oil and Gas Industry Electrical Work in Aberdeen',
    content: (
      <>
        <p>
          Aberdeen's offshore oil and gas industry creates significant demand for specialist
          electrical work that goes beyond standard domestic and commercial installations.
          Electricians working in this sector need additional qualifications:
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>CompEx certification</strong> — required for working in explosive
                atmospheres. CompEx covers inspection, maintenance, and installation of Ex-rated
                electrical equipment in Zone 0, Zone 1, and Zone 2 hazardous areas. CompEx units are
                assessed through practical examination at approved centres. Aberdeen has several
                CompEx training providers due to local demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Offshore survival training</strong> — electricians working offshore need
                BOSIET (Basic Offshore Safety Induction and Emergency Training) and MIST (Minimum
                Industry Safety Training). These are separate from electrical qualifications but
                required for offshore access.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Day rates</strong> — offshore and specialist onshore rates are significantly
                higher than standard domestic work. Offshore electricians typically earn £400 to
                £700 per day depending on the platform and contract type. Onshore fabrication yard
                rates are £45 to £80 per hour.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Even for domestically-focused electricians, Aberdeen's oil industry connection means
          customers with high disposable incomes who value quality and are less price-sensitive than
          in many UK cities.
        </p>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Aberdeen (2026)',
    content: (
      <>
        <p>
          Aberdeen commands the highest electrician rates in Scotland, reflecting competition for
          skilled labour with the offshore sector. Typical rates in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£50 — £75</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£350 — £550</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£90 — £130/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£700 — £1,100</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed granite semi)</span>
                  <span className="font-semibold">£4,500 — £7,000</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£200 — £320</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£900 — £1,400</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Granite property rewires command a premium over standard cavity-wall rewires due to the
          need for surface-mounted trunking, longer cable runs, and the time required to plan and
          execute tidy trunking routes in period properties.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Aberdeen',
    content: (
      <>
        <p>
          Aberdeen offers some of the best earning potential in Scotland for qualified electricians.
          The combination of high-value granite property work, a buoyant rental market, strong
          commercial demand, and proximity to the offshore sector creates a diverse and well-paid
          workload.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC and EICR Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  and <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> on
                  site for Scottish building warrant compliance. Issue professional documentation
                  before you leave the property.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing for Granite Rewires</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  to size cables correctly for the longer trunking routes common in Aberdeen granite
                  properties. Voltage drop compliance is critical on extended surface routes.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price Aberdeen granite property jobs accurately with the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Account for surface-mounted trunking labour, longer cable runs, and the premium
                  Aberdeen customers expect for quality work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Aberdeen electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for Scottish Building Standards compliance and granite property challenges. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianAberdeenPage() {
  return (
    <GuideTemplate
      title="Electrician in Aberdeen | Local Electricians 2026"
      description="Find qualified electricians in Aberdeen. Scottish Building Standards, SSEN DNO, SELECT registration, granite property rewiring, CompEx certification for oil and gas, and Aberdeen electrician rates for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Aberdeen"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Aberdeen: <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Aberdeen's granite-built properties, Scottish Building Standards, and proximity to the offshore oil and gas industry create a unique electrical market. Find SELECT and NICEIC registered electricians with local expertise."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Aberdeen"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Aberdeen Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for Scottish regulations and the challenges of granite property work. 7-day free trial."
    />
  );
}
