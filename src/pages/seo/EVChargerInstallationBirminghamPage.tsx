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
  { label: 'Birmingham', href: '/guides/ev-charger-installation-birmingham' },
];

const tocItems = [
  { id: 'overview', label: 'EV Charger Installation in Birmingham' },
  { id: 'costs', label: 'Birmingham Installation Costs' },
  { id: 'property-challenges', label: 'Birmingham Property Challenges' },
  { id: 'section-722', label: 'Section 722 Compliance' },
  { id: 'pme-earthing', label: 'PME Earthing Considerations' },
  { id: 'dno-notification', label: 'WPD DNO Notification' },
  { id: 'grants', label: 'Birmingham Grants and Incentives' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A domestic 7kW EV charger installation in Birmingham typically costs between £800 and £1,500 total, in line with the national average. Terraced housing in inner areas pushes costs towards the higher end.',
  'Birmingham is served by National Grid Electricity Distribution (formerly Western Power Distribution). All EV charger installations must be notified under G98/G99.',
  'Birmingham Clean Air Zone (CAZ) charges apply to older vehicles entering the city centre, driving increased EV adoption and charger demand across the West Midlands.',
  'Regulation 722.411.4.1 requires careful earthing arrangements on PME supplies. A local earth electrode or TT arrangement at the charger may be needed for outdoor installations.',
  'Flat owners and tenants can apply for the national EV chargepoint grant (up to £350). Birmingham City Council supports public charging infrastructure expansion through the West Midlands Combined Authority.',
];

const faqs = [
  {
    question: 'How much does it cost to install an EV charger in Birmingham in 2026?',
    answer:
      'A standard 7kW home EV charger installation in Birmingham costs between £800 and £1,500 in 2026. Semi-detached houses with driveways in areas like Solihull, Sutton Coldfield, and Harborne are at the lower end (£800 to £1,100). Victorian terraces in Moseley, Kings Heath, and Balsall Heath, where longer cable runs and board upgrades are common, sit at the higher end (£1,100 to £1,500).',
  },
  {
    question: 'Which DNO covers Birmingham for EV charger notification?',
    answer:
      'National Grid Electricity Distribution (NGED), formerly Western Power Distribution (WPD), is the DNO for Birmingham and the wider West Midlands. All EV charger installations must be notified under G98 (for standard 7kW single-phase chargers) via the NGED online portal. G98 is a simple notification — no prior approval is needed.',
  },
  {
    question: 'Has the Birmingham Clean Air Zone increased EV charger demand?',
    answer:
      'Yes. The Birmingham Clean Air Zone, which charges older vehicles entering the city centre, has been a significant driver of EV adoption across the West Midlands. This has increased demand for both home and workplace EV charger installations, particularly among tradespeople and commuters who regularly enter the CAZ.',
  },
  {
    question: 'Are there EV charger grants for Birmingham residents?',
    answer:
      'The national EV chargepoint grant is available to flat owners and tenants (not homeowners in houses), covering up to 75% of installation cost capped at £350. The West Midlands Combined Authority (WMCA) is investing in public and on-street charging infrastructure through its EV strategy. Check your local council website for current schemes.',
  },
  {
    question: 'Do I need an earth rod for an EV charger in Birmingham?',
    answer:
      'Most Birmingham properties have a PME (TN-C-S) supply. Regulation 722.411.4.1 requires additional earthing measures where a vehicle is connected outdoors on a PME supply. This typically means installing a local earth electrode (earth rod) at the charger location. Your electrician will assess the specific earthing requirements during the survey.',
  },
  {
    question: 'How long does an EV charger installation take in Birmingham?',
    answer:
      'A standard domestic 7kW EV charger installation in Birmingham typically takes 2 to 4 hours for a straightforward property with a driveway and consumer unit close to the charger location. More complex installations — such as Victorian terraces in areas like Moseley or Kings Heath where the cable must run through the property from a rear consumer unit to a front parking position — can take 4 to 8 hours. The electrician must also complete the NGED G98 notification, issue an Electrical Installation Certificate, and register the installation with a Building Control body or Competent Person Scheme.',
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
      'Complete technical guide covering Section 722, earthing, RCD selection, and testing.',
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
    href: '/electrician/birmingham',
    title: 'Electrician in Birmingham',
    description:
      'Find qualified electricians in Birmingham for EV charger installation and other electrical work.',
    icon: MapPin,
    category: 'Location',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Consumer unit upgrade requirements — often needed when adding a 32A EV charger circuit.',
    icon: ShieldCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'EV Charger Installation in Birmingham: What to Expect',
    content: (
      <>
        <p>
          Birmingham is the UK's second-largest city and a major hub for EV adoption. The
          Birmingham Clean Air Zone (CAZ), which charges older polluting vehicles entering the city
          centre, has accelerated the switch to electric vehicles across the West Midlands. Home EV
          charger installation demand is strong and growing.
        </p>
        <p>
          Birmingham's housing stock is diverse — from Victorian terraces in Moseley and Kings Heath
          to 1930s semis across Sutton Coldfield and Solihull, and modern estates in areas like
          Longbridge and Selly Oak. Each property type presents different installation challenges
          and costs.
        </p>
        <p>
          This guide covers the real costs of EV charger installation in Birmingham, property-specific
          challenges, the DNO notification process through{' '}
          <strong>National Grid Electricity Distribution (NGED)</strong>, and available grants.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Birmingham EV Charger Installation Costs',
    content: (
      <>
        <p>
          Birmingham installation costs are in line with the national average. Labour rates are
          moderate compared to London, and the mix of property types means a wide cost range
          depending on the specific installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Typical Birmingham Costs (7kW Single-Phase, 2026)</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simple installation (semi/detached, driveway)</strong> — £800 to £1,100.
                Charger near consumer unit, short cable run. Typical for 1930s semis in Sutton
                Coldfield, Solihull, and Hall Green.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard installation (terraced, medium cable run)</strong> — £1,100 to
                £1,400. Cable run of 10 to 15 metres, possible board upgrade. Common in Moseley,
                Kings Heath, and Balsall Heath.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complex installation (long run, board upgrade, earthing)</strong> — £1,400
                to £1,800+. Consumer unit replacement, earth rod, underground cable. Common for
                older properties with limited electrical infrastructure.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Birmingham electrician labour rates typically range from £38 to £52 per hour. A standard
          installation takes 4 to 6 hours.
        </p>
      </>
    ),
  },
  {
    id: 'property-challenges',
    heading: 'Birmingham Property Challenges for EV Charger Installation',
    content: (
      <>
        <p>
          Birmingham's property stock presents a range of challenges:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian terraces (Moseley, Kings Heath, Balsall Heath)</strong> — rear
                consumer units with front parking mean cable runs of 12 to 20 metres. These
                properties often have older electrical installations that need upgrading alongside
                the charger installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1930s semi-detached (Sutton Coldfield, Hall Green, Solihull)</strong> —
                typically the easiest installations. Most have driveways or garages, and the cable
                run from the consumer unit is often short. These properties usually have adequate
                board capacity, though older boards may need upgrading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>City centre flats and apartments</strong> — the Jewellery Quarter, Digbeth,
                and central Birmingham have significant apartment stock. Shared parking, communal
                electrics, and management company approvals complicate installations. Load management
                is often needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Older consumer units</strong> — many Birmingham properties still have
                rewirable fuse boards or early MCB boards without RCD protection. Adding a 32A EV
                circuit often triggers a full{' '}
                <SEOInternalLink href="/guides/consumer-unit-regulations">
                  consumer unit upgrade
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
    id: 'section-722',
    heading: 'Section 722 Compliance for Birmingham Installations',
    content: (
      <>
        <p>
          All EV charger installations in Birmingham must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 722:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit (Regulation 722.533.101)</strong> — each charger requires
                a dedicated circuit from the consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection (Regulation 722.531.101)</strong> — appropriate RCD type
                required. Type B RCD or Type A with integrated DC fault detection (6mA DC RDC-DD).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing (Regulation 722.411.4.1)</strong> — additional earthing measures on
                PME supplies for outdoor charging points.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing</strong> — use the{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                to size correctly for the cable run distance and installation method.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pme-earthing',
    heading: 'PME Earthing Considerations in Birmingham',
    content: (
      <>
        <p>
          Most Birmingham properties are on a PME (TN-C-S) supply. Regulation 722.411.4.1 requires
          additional earthing protection where a vehicle is charged outdoors on a PME supply.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">The PME Risk</h3>
            <p className="text-white text-sm leading-relaxed">
              Loss of the PEN conductor on a PME supply can cause earthed metalwork to rise to a
              dangerous potential. A vehicle connected via a charging cable creates a simultaneous
              connection to the PME earth and the ground, producing a shock risk.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Solutions</h3>
            <p className="text-white text-sm leading-relaxed">
              A local TT earthing arrangement (earth rod) at the charger with RCD protection, or a
              charger with integrated PEN fault detection. For chargers inside a garage, the PME
              earth may be acceptable. Birmingham's suburban properties often have garden areas
              suitable for earth rod installation.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-notification',
    heading: 'NGED DNO Notification for Birmingham EV Charger Installations',
    content: (
      <>
        <p>
          <strong>National Grid Electricity Distribution (NGED)</strong>, formerly Western Power
          Distribution (WPD), is the DNO for Birmingham and the West Midlands. Every EV charger
          installation must be notified.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 notification</strong> — for standard 7kW single-phase chargers, submit
                via the NGED online portal. Simple notification — proceed immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 application</strong> — for three-phase or commercial installations,
                prior approval required. Allow 4 to 10 weeks.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'grants',
    heading: 'Birmingham Grants and Incentives for EV Charger Installation',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV chargepoint grant (national)</strong> — available to flat owners and
                tenants. Up to 75% of installation cost, capped at £350.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>West Midlands Combined Authority (WMCA)</strong> — investing in public and
                on-street charging infrastructure across the region. Check the WMCA website for
                current schemes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace Charging Scheme</strong> — Birmingham businesses can claim up to
                £350 per socket (up to 40 sockets).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Installations in Birmingham',
    content: (
      <>
        <p>
          Birmingham and the West Midlands offer strong demand for EV charger installation, boosted
          by the Clean Air Zone and growing EV ownership. The diverse housing stock means a range of
          job types from quick driveway installs to complex terraced house projects.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pricing Birmingham Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build accurate itemised quotes. Factor in cable run distance, board upgrade
                  likelihood, and earth rod requirements.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certification</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    EIC certificate
                  </SEOInternalLink>{' '}
                  on your phone after installation and testing. NGED notification, Part P building
                  control, and professional PDF certificate — all from site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify Birmingham EV installations"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certification. 7-day free trial, cancel anytime."
          icon={Car}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerInstallationBirminghamPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Birmingham 2026 | Costs, DNO, and Grants"
      description="How much does EV charger installation cost in Birmingham in 2026? Local costs, NGED DNO notification, Clean Air Zone impact, property challenges, PME earthing, and Section 722 compliance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Birmingham Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          EV Charger Installation Birmingham:{' '}
          <span className="text-yellow-400">Costs, DNO, and Grants 2026</span>
        </>
      }
      heroSubtitle="Local costs for EV charger installation across Birmingham and the West Midlands, NGED DNO notification, Clean Air Zone impact, property challenges, and Section 722 compliance."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in Birmingham"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify EV Charger Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
