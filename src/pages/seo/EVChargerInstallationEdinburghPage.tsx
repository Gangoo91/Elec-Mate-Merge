import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Calculator,
  Zap,
  FileCheck2,
  PoundSterling,
  Car,
  Plug,
  MapPin,
  Building2,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'EV Charger Installation Cost', href: '/guides/ev-charger-installation-cost' },
  { label: 'Edinburgh', href: '/guides/ev-charger-installation-edinburgh' },
];

const tocItems = [
  { id: 'overview', label: 'EV Charger Installation in Edinburgh' },
  { id: 'costs', label: 'Edinburgh Installation Costs' },
  { id: '7kw-vs-22kw', label: '7kW vs 22kW Chargers' },
  { id: 'smart-chargers', label: 'Smart Chargers' },
  { id: 'section-722', label: 'Section 722 and Scottish Regulations' },
  { id: 'conservation-areas', label: 'Conservation Areas and Listed Buildings' },
  { id: 'dno-notification', label: 'SSEN DNO Notification' },
  { id: 'grants', label: 'OZEV Grant and Edinburgh Incentives' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A domestic 7kW EV charger installation in Edinburgh typically costs between £800 and £1,500, reflecting the city\'s higher labour rates compared with other Scottish cities and the complexity of its Georgian and Victorian stone-built tenement housing stock.',
  'Edinburgh is served by SP Energy Networks (SPEN) as the Distribution Network Operator. All EV charger installations must be notified under G98 before the charger is energised.',
  'Scotland uses the Building Standards system — not Part P. In Edinburgh, EV charger installations must comply with City of Edinburgh Council Building Standards requirements.',
  'Edinburgh has a high proportion of conservation areas and listed buildings. Charger mounting and cable routing in the New Town, Old Town, and other conservation areas requires careful planning to avoid the need for Listed Building Consent.',
  'The OZEV EV chargepoint grant (up to £350) is available to Edinburgh flat owners and tenants, including those in the city\'s extensive tenement stock.',
];

const faqs = [
  {
    question: 'How much does it cost to install an EV charger in Edinburgh in 2026?',
    answer:
      'A standard 7kW home EV charger installation in Edinburgh costs between £800 and £1,500 in 2026. Edinburgh has slightly higher labour rates than Glasgow, reflecting the city\'s higher cost of living. Straightforward installations on modern semis in areas such as Corstorphine, Morningside, and Liberton sit at the lower end. Georgian and Victorian tenement properties in the New Town, Marchmont, and Bruntsfield — with their stone walls, sash windows, and communal parking constraints — are more complex and sit at the higher end. Electrician day rates in Edinburgh are typically £320 to £420.',
  },
  {
    question: 'Which DNO covers Edinburgh for EV charger notification?',
    answer:
      'SP Energy Networks (SPEN) is the Distribution Network Operator for Edinburgh and the wider central Scotland and south Scotland area. All domestic EV charger installations must be notified to SPEN under G98 before the charger is connected. For standard 7kW single-phase chargers (up to 16A per phase), G98 is a notification — no prior approval is required. Three-phase 22kW chargers require G99 prior approval from SPEN, which can take 4 to 10 weeks.',
  },
  {
    question: 'Do I need special permission to install an EV charger in an Edinburgh conservation area?',
    answer:
      'Potentially, yes. Edinburgh has extensive conservation areas, including the World Heritage Site encompassing the Old Town and New Town. Installing external equipment such as an EV charger on the front elevation of a listed building may require Listed Building Consent from the City of Edinburgh Council. Even in conservation areas where the building is not listed, permitted development rights may be restricted. It is essential to check with the City of Edinburgh Council Planning department before installing any external equipment or routing cables through the fabric of a listed building.',
  },
  {
    question: 'Can I install an EV charger in an Edinburgh tenement flat?',
    answer:
      'It is possible where a private parking space is available. Edinburgh tenement flats frequently have communal drying greens or shared rear courts rather than individual parking spaces. Where a private or allocated parking space exists (in basement garages or rear yards), a charger can be installed with consent from the property managers or other owners in the tenement. The OZEV EV chargepoint grant (up to £350) is available to Edinburgh tenement flat owners. In many Edinburgh locations, reliance on the city\'s public ChargePlace Scotland network is the practical alternative.',
  },
  {
    question: 'Is the OZEV grant available for EV charger installation in Edinburgh?',
    answer:
      'Yes. The OZEV EV chargepoint grant covers up to 75% of the installation cost, capped at £350, for flat owners and tenants across the UK including Edinburgh. Homeowners in houses are not eligible. The OZEV-approved installer applies for the grant on your behalf. Edinburgh does not currently operate a separate local authority grant scheme for home EV charger installation.',
  },
  {
    question: 'Does Scotland use Part P for EV charger installations?',
    answer:
      'No. Part P of the Building Regulations applies only in England and Wales. Scotland has its own Building Standards system under the Building (Scotland) Act 2003. EV charger installations in Edinburgh must comply with City of Edinburgh Council Building Standards. SELECT-registered electricians can self-certify electrical work under the Scottish Building Standards system. NICEIC and NAPIT-registered electricians are also recognised in Scotland, but it is essential to confirm that their registration covers Scottish Building Standards notification.',
  },
  {
    question: 'What is the ChargePlace Scotland network in Edinburgh?',
    answer:
      'ChargePlace Scotland is the national public EV charging network funded by Transport Scotland. Edinburgh has an extensive network of ChargePlace Scotland charge points across the city, including on-street, car park, and rapid charger locations. The network provides an alternative for Edinburgh residents who cannot install a home charger — particularly tenement flat residents without private parking. Charging on ChargePlace Scotland is typically more expensive per kWh than home charging but significantly cheaper than fuel.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/ev-charger-installation-cost',
    title: 'EV Charger Installation Cost UK',
    description:
      'National price guide for EV charger installation covering all charger types and cost factors.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'Complete technical guide to EV charger installation covering Section 722, earthing, and testing.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size the cable for your EV charger circuit with automatic derating and voltage drop checks.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete the Electrical Installation Certificate for EV charger installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Consumer unit upgrade requirements — often needed when adding a 32A EV charger circuit.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/electrician/edinburgh',
    title: 'Electrician in Edinburgh',
    description:
      'Find qualified electricians in Edinburgh for EV charger installation and other electrical work.',
    icon: MapPin,
    category: 'Location',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'EV Charger Installation in Edinburgh: What to Expect',
    content: (
      <>
        <p>
          Edinburgh has one of the highest rates of EV ownership in Scotland, driven by the city's
          professional demographic, high average incomes, and strong environmental awareness. The
          city's housing stock, however, presents real challenges for home EV charger installation:
          Georgian and Victorian stone-built tenements dominate much of the inner city, with limited
          off-street parking, stone walls that are difficult to route cables through, and extensive
          conservation area designations.
        </p>
        <p>
          Modern suburbs such as Corstorphine, Liberton, Fairmilehead, and the newer developments
          around South Gyle and Craigmillar offer more straightforward installation conditions —
          semis and detached houses with driveways, modern consumer units, and easy cable routes.
        </p>
        <p>
          Scotland's regulatory framework applies here: Building Standards under the{' '}
          <strong>Building (Scotland) Act 2003</strong>, not Part P. The DNO is{' '}
          <strong>SP Energy Networks (SPEN)</strong>. All installations must comply with BS 7671
          Section 722.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Edinburgh EV Charger Installation Costs (2026)',
    content: (
      <>
        <p>
          Edinburgh commands slightly higher electrician rates than other Scottish cities, reflecting
          the city's overall higher cost of living. Day rates typically run from £320 to £420 for a
          qualified electrician in Edinburgh.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Typical Edinburgh Costs (7kW Single-Phase, 2026)
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simple installation (modern semi/detached, short cable run)</strong> —
                £800 to £1,100. Suburban Edinburgh: Corstorphine, Liberton, Morningside newer-build
                areas, South Gyle, Craigmillar.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard installation (inter-war semi, 8–15m cable run)</strong> — £1,050
                to £1,300. Common across south Edinburgh suburbs: Marchmont, Bruntsfield, Morningside
                inter-war, Newington.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complex installation (tenement, long run, stone walls, earth rod)</strong>{' '}
                — £1,300 to £1,800+. Georgian and Victorian properties in the New Town, Old Town,
                Stockbridge, and Dean Village. Stone wall cable routing, PME earthing works, and
                factor consent add cost and lead time.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: '7kw-vs-22kw',
    heading: '7kW vs 22kW EV Chargers for Edinburgh Homes',
    content: (
      <>
        <p>
          A 7kW single-phase charger is the right choice for virtually all Edinburgh domestic
          properties. Three-phase 22kW chargers require a three-phase supply — uncommon in
          Edinburgh residential properties — and G99 prior approval from SPEN (4 to 10 weeks).
          For a household that drives typical daily distances, a 7kW charger charging overnight
          provides ample range restoration. Only commercial premises or ultra-high-mileage users
          should consider 22kW.
        </p>
      </>
    ),
  },
  {
    id: 'smart-chargers',
    heading: 'Smart Charger Requirements',
    content: (
      <>
        <p>
          The Electric Vehicles (Smart Charge Points) Regulations 2021 apply throughout Great
          Britain. All new home EV charger installations in Edinburgh must use a compliant smart
          charger with off-peak scheduling, internet connectivity, and energy metering.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Off-peak tariff scheduling</strong> — Edinburgh households on Octopus Go,
                EDF GoElectric, or similar tariffs can cut overnight charging costs by 50 to 70%
                versus standard rates. Smart charger scheduling does this automatically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar integration</strong> — for Edinburgh homes with solar PV (less common
                than in southern England, but growing), smart chargers like Zappi can divert surplus
                solar generation to EV charging before exporting to the grid.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remote monitoring</strong> — app control allows Edinburgh commuters to
                schedule charging to complete before their morning departure, ensuring a full charge
                regardless of when they plug in the night before.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'section-722',
    heading: 'Section 722 and Scottish Building Standards',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 Section 722 applies throughout the UK including Edinburgh. The key
          requirements — dedicated circuit, appropriate RCD protection, and earthing on PME supplies
          — are identical to those in England and Wales.
        </p>
        <p>
          The regulatory notification framework differs:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Standards, not Part P</strong> — Scotland does not use the Part P
                competent person scheme. Electrical work is notifiable under the Building (Scotland)
                Regulations 2004. SELECT-registered electricians self-certify under the Scottish
                Building Standards system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>City of Edinburgh Council Building Standards</strong> — the relevant
                authority for building standards notifications in Edinburgh. Confirm your electrician's
                registration covers Scottish Building Standards self-certification before commissioning
                work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME earthing (Regulation 722.411.4.1)</strong> — most Edinburgh properties
                are on PME supplies. Outdoor EV charging on a PME supply requires an earth rod or
                charger with integrated PEN fault detection. This is a technical requirement, not a
                Scottish-specific one — it applies across the UK.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'conservation-areas',
    heading: 'Conservation Areas and Listed Buildings in Edinburgh',
    content: (
      <>
        <p>
          Edinburgh has more listed buildings per capita than any other UK city outside London. The
          Old Town and New Town form a UNESCO World Heritage Site, and the city has over 50
          conservation areas. This creates specific constraints for EV charger installation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed Building Consent</strong> — installing a charger on the external wall
                of a listed building, or routing cables through the fabric of a listed building, may
                require Listed Building Consent from the City of Edinburgh Council. Failure to obtain
                consent is a criminal offence. Check listing status before proceeding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation area restrictions</strong> — even in conservation areas where
                the building is not individually listed, permitted development rights may be limited.
                The City of Edinburgh Council planning team can advise on what is permissible without
                a planning application.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Internal routing</strong> — where external mounting is restricted, internal
                cable routing from the consumer unit to a garage or rear parking area may be the only
                option. This adds cost but avoids planning complications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stone walls</strong> — traditional Edinburgh stone construction makes wall
                chasing for concealed cable runs extremely difficult and time-consuming. Surface
                trunking in discrete locations is often the practical solution.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno-notification',
    heading: 'SPEN DNO Notification for Edinburgh EV Charger Installations',
    content: (
      <>
        <p>
          <strong>SP Energy Networks (SPEN)</strong> covers Edinburgh and the wider Lothians area.
          Every EV charger installation must be notified to SPEN before the charger is energised.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 (standard domestic 7kW)</strong> — notification via SPEN online portal.
                No prior approval needed. Can proceed after submitting notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 (three-phase/commercial)</strong> — prior approval required, 4 to 10
                weeks. For 22kW three-phase chargers and multi-unit installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installer responsibility</strong> — the installing electrician submits the
                notification. Confirm it is included in your quote. Failure to notify SPEN before
                energising the charger can result in disconnection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'grants',
    heading: 'OZEV Grant and Edinburgh Incentives',
    content: (
      <>
        <p>
          Edinburgh residents can access the following funding for EV charger installation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV EV chargepoint grant</strong> — up to £350 for flat owners and
                tenants. Available to Edinburgh tenement flat owners. The OZEV-approved installer
                applies on your behalf.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ChargePlace Scotland</strong> — Transport Scotland's public charging network
                provides an alternative for Edinburgh residents who cannot install a home charger.
                Edinburgh has good ChargePlace Scotland coverage, particularly in the city centre and
                major car parks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace Charging Scheme</strong> — Edinburgh businesses can claim up to
                £350 per socket (up to 40 sockets) for workplace EV charger installations via the
                OZEV scheme.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Installations in Edinburgh',
    content: (
      <>
        <p>
          Edinburgh is a strong and growing market for EV charger installation. High EV ownership
          rates and a mix of property types create consistent demand. Electricians working in
          Edinburgh should hold SELECT registration or equivalent recognition under Scottish Building
          Standards, and should be familiar with the city's conservation area requirements.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pricing Edinburgh Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Factor in Edinburgh day rates (£320 to £420), stone wall routing challenges, listed
                  building and conservation area constraints, PME earthing requirements, and factor
                  consent timescales for tenement installations. Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build itemised quotes on site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Scottish Compliance</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every installation requires an{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>
                  , SPEN G98 notification, and Building Standards notification under the Scottish
                  system. Confirm SELECT or equivalent registration covers Edinburgh before quoting.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify Edinburgh EV installations"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certification. Professional quotes and certificates from your phone."
          icon={Car}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerInstallationEdinburghPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Edinburgh 2026 | Costs, DNO, Scottish Regulations"
      description="How much does EV charger installation cost in Edinburgh in 2026? Local costs, SPEN DNO notification, OZEV grant, Scottish Building Standards, conservation area guidance, and Section 722 compliance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Edinburgh Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          EV Charger Installation Edinburgh:{' '}
          <span className="text-yellow-400">Costs, DNO, and Scottish Regulations 2026</span>
        </>
      }
      heroSubtitle="Local costs for EV charger installation in Edinburgh, SPEN DNO notification, OZEV grant, Scottish Building Standards vs Part P, conservation area and listed building guidance, and Section 722 compliance."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in Edinburgh"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify EV Charger Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
