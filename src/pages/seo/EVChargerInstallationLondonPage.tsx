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
  { label: 'London', href: '/guides/ev-charger-installation-london' },
];

const tocItems = [
  { id: 'overview', label: 'EV Charger Installation in London' },
  { id: 'costs', label: 'London Installation Costs' },
  { id: 'property-challenges', label: 'London Property Challenges' },
  { id: 'section-722', label: 'Section 722 Compliance' },
  { id: 'pme-earthing', label: 'PME Earthing Considerations' },
  { id: 'dno-notification', label: 'UKPN DNO Notification' },
  { id: 'grants', label: 'London Grants and Incentives' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A domestic 7kW EV charger installation in London typically costs between £900 and £1,800 total, reflecting higher labour rates and the complexity of older or terraced properties.',
  'London is served by UK Power Networks (UKPN). All EV charger installations must be notified under G98/G99 via the UKPN online portal before the charger is energised.',
  'Terraced houses and Victorian conversions — common across London — often require longer cable runs from the consumer unit to the front or rear of the property, increasing material and labour costs.',
  'Regulation 722.411.4.1 requires careful attention to earthing arrangements. On PME supplies (the majority in London), a local earth electrode or TT arrangement at the charger may be needed for outdoor installations.',
  'Flat owners and tenants can apply for the EV chargepoint grant (up to £350). Several London boroughs offer additional on-street charging and residential parking bay schemes.',
];

const faqs = [
  {
    question: 'How much does it cost to install an EV charger in London in 2026?',
    answer:
      'A standard 7kW home EV charger installation in London costs between £900 and £1,800 in 2026. The higher end reflects London labour rates (typically £50 to £70 per hour for a qualified electrician), longer cable runs in terraced or period properties, and potential consumer unit upgrades. A straightforward installation on a modern detached or semi-detached house with a garage sits at the lower end. Victorian terraces where the consumer unit is at the rear and the parking is at the front can push costs towards the higher end.',
  },
  {
    question: 'Which DNO covers London for EV charger notification?',
    answer:
      'UK Power Networks (UKPN) is the Distribution Network Operator for the whole of London. All EV charger installations must be notified to UKPN under Engineering Recommendation G98 (for single-phase domestic installations up to 16A per phase). Notification is submitted online through the UKPN website. For standard 7kW chargers, G98 is a simple notification — no prior approval is needed. Three-phase or larger installations require G99 approval, which can take 4 to 10 weeks.',
  },
  {
    question: 'Can I install an EV charger on a London terraced house?',
    answer:
      'Yes, but the installation is often more complex and expensive than on a detached property. In many London terraces, the consumer unit is at the rear of the house while the only parking is at the front on the street or in a front bay. This means a cable run of 15 to 25 metres through the property or underground. Cable routing, containment, and voltage drop all need careful consideration. Some boroughs also require planning permission for front-mounted chargers on listed buildings or in conservation areas.',
  },
  {
    question: 'Are there EV charger grants for London residents?',
    answer:
      'The national EV chargepoint grant is available to flat owners and tenants (not homeowners in houses), covering up to 75% of installation cost capped at £350. Beyond this, several London boroughs run their own schemes. The Mayor of London Electric Vehicle Infrastructure Strategy supports on-street residential chargepoint schemes in boroughs including Westminster, Lambeth, Hackney, and Wandsworth. Check your borough council website for current local schemes.',
  },
  {
    question: 'Do I need an earth rod for an EV charger in London?',
    answer:
      'It depends on the earthing arrangement. Most London properties have a PME (TN-C-S) supply. Regulation 722.411.4.1 and the IET Code of Practice for EV Charging require that where a vehicle is connected outdoors on a PME supply, additional earthing measures are taken. This typically means installing a local earth electrode (earth rod) and creating a TT arrangement at the charger, or using a charger with PEN fault detection. Your electrician will assess the specific earthing requirements during the survey.',
  },
  {
    question: 'Can I install an EV charger in a London flat?',
    answer:
      'It is possible but involves additional hurdles. You need permission from the freeholder or management company, a dedicated parking space, and a viable cable route from the electricity supply to the charger location. Shared parking areas may require load management systems if multiple residents install chargers. Flat owners are eligible for the EV chargepoint grant (up to £350). Some London housing associations and developers are proactively installing charging infrastructure in communal parking areas.',
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
    href: '/electrician/london',
    title: 'Electrician in London',
    description:
      'Find qualified electricians in London for EV charger installation and other electrical work.',
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
    heading: 'EV Charger Installation in London: What to Expect',
    content: (
      <>
        <p>
          London has the highest concentration of electric vehicles in the UK. With the Ultra Low
          Emission Zone (ULEZ) covering the entire Greater London area and congestion charge
          exemptions for zero-emission vehicles, demand for home EV charger installation across
          London is consistently high.
        </p>
        <p>
          But London presents unique challenges. The city's housing stock is dominated by Victorian
          and Edwardian terraces, purpose-built flats, and converted period properties — none of
          which were designed with off-street EV charging in mind. Labour rates are higher than the
          national average, parking is often on-street, and many properties sit in conservation areas
          with planning restrictions.
        </p>
        <p>
          This guide covers the real costs of EV charger installation in London, the specific
          property challenges you will encounter, the DNO notification process through{' '}
          <strong>UK Power Networks (UKPN)</strong>, and the grants available to London residents.
          Whether you are a homeowner getting quotes or an electrician pricing London jobs, the
          numbers here reflect actual London market conditions in 2026.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'London EV Charger Installation Costs',
    content: (
      <>
        <p>
          London installation costs run 10% to 25% higher than the national average, driven by
          higher electrician day rates, more complex cable routing in older properties, and the
          frequency of consumer unit upgrades on ageing installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Typical London Costs (7kW Single-Phase, 2026)</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simple installation (detached/semi, short cable run)</strong> — £900 to
                £1,300. Charger mounted near consumer unit, existing board has spare capacity.
                Typical for newer-build houses in outer London boroughs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard installation (terraced house, medium cable run)</strong> — £1,300
                to £1,600. Cable run of 10 to 15 metres through the property, possible board
                upgrade. The most common London domestic installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complex installation (long run, board upgrade, earthing work)</strong> —
                £1,600 to £2,200+. Cable run of 15 to 25 metres, consumer unit replacement, earth
                rod installation, civil works for underground cable routing. Common for Victorian
                terraces with rear consumer units and front parking.
              </span>
            </li>
          </ul>
        </div>
        <p>
          London electrician labour rates typically range from £50 to £70 per hour, compared to £35
          to £50 nationally. A standard installation takes 4 to 6 hours; complex jobs can run to a
          full day or more.
        </p>
      </>
    ),
  },
  {
    id: 'property-challenges',
    heading: 'London Property Challenges for EV Charger Installation',
    content: (
      <>
        <p>
          London's housing stock creates specific challenges that affect both cost and feasibility:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian and Edwardian terraces</strong> — the consumer unit is often at
                the rear of the property (under the stairs or in the kitchen), while parking is at
                the front. This means a cable run of 15 to 25 metres through the house, along walls,
                through floors, or underground via a front garden trench. Containment and making
                good add time and materials.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flats and converted properties</strong> — shared parking, freeholder
                permission requirements, and communal electrical risers complicate installations.
                Load management may be needed where multiple flats share a supply. Cable routing
                through communal areas requires building management approval.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>On-street parking only</strong> — many London properties have no off-street
                parking. On-street EV charging requires a cable channel across the pavement (some
                boroughs permit this with a cable cover) or reliance on public charging
                infrastructure. Installation of a charger on the property boundary requires careful
                consideration of cable protection and public safety.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation areas and listed buildings</strong> — charger mounting on the
                front elevation may require planning permission. Check with your borough planning
                department before committing to an installation location. Internal cable routing may
                be the only option.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ageing consumer units</strong> — many London properties still have older
                consumer units without RCD protection. Adding a 32A EV charger circuit often triggers
                a full{' '}
                <SEOInternalLink href="/guides/consumer-unit-regulations">
                  consumer unit upgrade
                </SEOInternalLink>{' '}
                to meet current regulations, adding £300 to £800 to the total cost.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'section-722',
    heading: 'Section 722 Compliance for London Installations',
    content: (
      <>
        <p>
          All EV charger installations in London must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 722. The key requirements are the same across the UK, but London's housing stock
          means certain requirements are triggered more frequently:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit (Regulation 722.533.101)</strong> — each EV charger
                requires a dedicated circuit. In London's older consumer units, this often means
                there is no spare way available, triggering a board upgrade or the addition of a
                separate enclosure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection (Regulation 722.531.101)</strong> — the EV circuit must be
                protected by an appropriate RCD. Where the charger can produce DC residual currents,
                a Type B RCD or a Type A RCD with integrated DC fault detection (6mA DC RDC-DD) is
                required. Most quality charger units include integrated DC protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing (Regulation 722.411.4.1)</strong> — earthing arrangements require
                particular attention. The majority of London properties are on PME supplies, where
                additional protective measures are needed for outdoor EV charging points. See the PME
                earthing section below.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing for long runs</strong> — the long cable runs common in London
                terraces require careful{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing
                </SEOInternalLink>{' '}
                to account for voltage drop. A 20-metre run in 6mm2 cable for a 32A load is close
                to the voltage drop limit; 10mm2 may be needed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pme-earthing',
    heading: 'PME Earthing Considerations in London',
    content: (
      <>
        <p>
          The vast majority of London properties are supplied via a PME (Protective Multiple
          Earthing) system, also known as TN-C-S. Regulation 722.411.4.1 and the IET Code of
          Practice for EV Charging Equipment Installation set out specific requirements where EV
          charging equipment is installed on a PME supply and the vehicle connection point is
          outdoors.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">The PME Risk</h3>
            <p className="text-white text-sm leading-relaxed">
              On a PME supply, if the PEN (combined neutral-earth) conductor is lost between the
              transformer and the property, the earthed metalwork of the property — and anything
              connected to it, including an EV being charged — can rise to a dangerous potential.
              Because the vehicle is simultaneously in contact with the ground (via tyres on a wet
              surface) and the PME earth (via the charging cable), this creates a shock risk.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Solutions</h3>
            <p className="text-white text-sm leading-relaxed">
              The IET Code of Practice offers several approaches: installing a local TT earthing
              arrangement (earth rod) at the charger with appropriate RCD protection; using a charger
              with integrated PEN fault detection; or, where the charger is in a building (e.g.
              inside a garage), the PME earth may be acceptable subject to an assessment. Most London
              installations for outdoor chargers use an earth rod, tested to confirm adequate
              resistance.
            </p>
          </div>
        </div>
        <p>
          The earth rod installation adds approximately £80 to £150 to the installation cost,
          including the rod, clamp, and testing. For London properties with paved front gardens or
          driveways, finding a suitable location for the earth rod can be challenging — it needs to
          be driven into natural earth, not through concrete.
        </p>
      </>
    ),
  },
  {
    id: 'dno-notification',
    heading: 'UKPN DNO Notification for London EV Charger Installations',
    content: (
      <>
        <p>
          <strong>UK Power Networks (UKPN)</strong> is the DNO for the whole of London, covering all
          32 boroughs and the City of London. Every EV charger installation must be notified to UKPN
          before the charger is connected.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 notification (standard domestic)</strong> — for single-phase 7kW
                chargers (up to 32A), submit a G98 notification via the UKPN online portal. This is
                a notification, not an application — you can proceed with the installation. UKPN
                processes these automatically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 application (three-phase/commercial)</strong> — for 22kW three-phase
                chargers or multiple charge points, G99 requires prior approval from UKPN. Allow 4
                to 10 weeks for processing. UKPN may conduct a network capacity assessment,
                particularly in areas with high EV charger density.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Network capacity</strong> — in some London areas with heavy EV charger
                uptake, UKPN may flag capacity constraints. This is more common in dense residential
                streets where multiple properties have installed chargers. In rare cases, a supply
                upgrade may be needed.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The installer (not the homeowner) is responsible for submitting the DNO notification. If
          you are getting quotes, confirm that the electrician includes DNO notification in their
          price. Failure to notify can result in UKPN requiring disconnection.
        </p>
      </>
    ),
  },
  {
    id: 'grants',
    heading: 'London Grants and Incentives for EV Charger Installation',
    content: (
      <>
        <p>
          Several funding options are available to London residents looking to install an EV charger:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV chargepoint grant (national)</strong> — available to flat owners and
                tenants only (not homeowners in houses). Covers up to 75% of installation cost,
                capped at £350 per installation point. Applied for by the OZEV-approved installer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Borough on-street charging schemes</strong> — multiple London boroughs
                including Westminster, Lambeth, Hackney, Wandsworth, Brent, and Islington have
                installed or are expanding lamp-post chargers and dedicated on-street charging bays.
                These are council-funded and free or low-cost to residents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace Charging Scheme</strong> — London businesses can claim up to £350
                per socket (up to 40 sockets) for workplace EV charger installations. This is a
                national scheme administered by OZEV.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mayor of London EV Infrastructure Strategy</strong> — the GLA is investing
                in rapid charging hubs and supporting borough-level on-street charging rollouts.
                While this does not directly fund home installations, it improves the overall
                charging ecosystem for London residents.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Installations in London',
    content: (
      <>
        <p>
          London is the most active market for domestic EV charger installation in the UK. Higher
          property values, ULEZ incentives, and dense EV ownership mean consistent demand. But
          London jobs come with their own pricing considerations:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pricing London Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Factor in London labour rates (£50 to £70/hour), longer cable runs (average 12 to
                  18 metres in terraced properties), frequent consumer unit upgrades, parking
                  restrictions affecting van access, and the time cost of congestion. Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build accurate itemised quotes on site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certification and Compliance</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every EV charger installation requires an{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>
                  , UKPN G98/G99 notification, and (if the property has no existing Part P
                  notification) building control notification. Complete all documentation on your
                  phone from site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify London EV installations"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certification. Professional quotes and certificates from your phone — built for electricians on the move."
          icon={Car}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerInstallationLondonPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation London 2026 | Costs, DNO, and Grants"
      description="How much does EV charger installation cost in London in 2026? Local costs, UKPN DNO notification, London borough grants, terraced house cable routing, PME earthing requirements, and Section 722 compliance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="London Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          EV Charger Installation London:{' '}
          <span className="text-yellow-400">Costs, DNO, and Grants 2026</span>
        </>
      }
      heroSubtitle="Local costs for EV charger installation across London, UKPN DNO notification process, London borough grants, terraced house and flat challenges, PME earthing considerations, and Section 722 compliance."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in London"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify EV Charger Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
