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
  { label: 'Manchester', href: '/guides/ev-charger-installation-manchester' },
];

const tocItems = [
  { id: 'overview', label: 'EV Charger Installation in Manchester' },
  { id: 'costs', label: 'Manchester Installation Costs' },
  { id: 'property-challenges', label: 'Manchester Property Challenges' },
  { id: 'section-722', label: 'Section 722 Compliance' },
  { id: 'pme-earthing', label: 'PME Earthing Considerations' },
  { id: 'dno-notification', label: 'Electricity North West DNO Notification' },
  { id: 'grants', label: 'Manchester Grants and Incentives' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A domestic 7kW EV charger installation in Manchester typically costs between £800 and £1,500 total, slightly below London but reflecting the prevalence of terraced housing with longer cable runs.',
  'Manchester is served by Electricity North West (ENW). All EV charger installations must be notified under G98/G99 via the ENW online portal.',
  'Manchester has a high proportion of Victorian and Edwardian terraced houses, particularly in areas like Didsbury, Chorlton, Fallowfield, and Levenshulme. These properties often require longer cable runs from rear consumer units to front-of-house parking.',
  'Regulation 722.411.4.1 requires careful earthing arrangements. On PME supplies, a local earth electrode or TT arrangement at the charger may be needed for outdoor charging points.',
  'Greater Manchester Clean Air Zone plans have increased EV adoption. Flat owners and tenants can apply for the national EV chargepoint grant (up to £350), and the GM Combined Authority supports public charging rollouts.',
];

const faqs = [
  {
    question: 'How much does it cost to install an EV charger in Manchester in 2026?',
    answer:
      'A standard 7kW home EV charger installation in Manchester costs between £800 and £1,500 in 2026. A straightforward installation on a semi-detached or detached house with a driveway and short cable run sits at the lower end (£800 to £1,100). Manchester terraced houses — common in Didsbury, Chorlton, and Levenshulme — typically cost £1,100 to £1,500 due to longer cable runs and more frequent consumer unit upgrades.',
  },
  {
    question: 'Which DNO covers Manchester for EV charger notification?',
    answer:
      'Electricity North West (ENW) is the Distribution Network Operator for Greater Manchester and the surrounding region. All EV charger installations must be notified to ENW under Engineering Recommendation G98 (for single-phase domestic installations). Notification is submitted online through the ENW website. For standard 7kW chargers, G98 is a simple notification — no prior approval is needed.',
  },
  {
    question: 'Can I install an EV charger on a Manchester terraced house?',
    answer:
      'Yes. Manchester has a large stock of terraced houses, particularly the two-up two-down and bay-fronted terraces across South and East Manchester. The main challenge is the cable run distance — the consumer unit is typically at the rear of the house while parking is at the front. Expect a cable run of 12 to 20 metres. Cable routing options include surface-mounted trunking through the house, underground via the front garden, or externally along the wall. The longer run increases material costs and may require 10mm2 cable to manage voltage drop.',
  },
  {
    question: 'Are there EV charger grants for Manchester residents?',
    answer:
      'The national EV chargepoint grant is available to flat owners and tenants (not homeowners in houses), covering up to 75% of installation cost capped at £350. The Greater Manchester Combined Authority (GMCA) has invested in public charging infrastructure through the Electric Vehicle Charging Infrastructure Strategy, including on-street charging and rapid charging hubs. Check the GMCA and your local council websites for current schemes.',
  },
  {
    question: 'Do I need planning permission for an EV charger in Manchester?',
    answer:
      'Most domestic EV charger installations are covered by permitted development rights and do not require planning permission. However, if your property is in a conservation area (parts of Didsbury, Castlefield, Ancoats, and other areas) or is a listed building, you may need planning approval for external mounting. Check with Manchester City Council or your borough planning department before installation.',
  },
  {
    question: 'What certificate does an electrician need to issue after installing an EV charger in Manchester?',
    answer:
      'After installing an EV charger in Manchester, the electrician must issue an Electrical Installation Certificate (EIC) or Minor Electrical Installation Works Certificate (MEIWC), depending on whether the installation constitutes a new circuit or a modification to an existing one. A new dedicated circuit from the consumer unit requires an EIC. The electrician must also notify Electricity North West (ENW) under G98 within 28 days of commissioning, and the installation must be notified to Building Control — either through a Competent Person Scheme (such as NICEIC or NAPIT) or directly via a Building Control application.',
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
    href: '/electrician/manchester',
    title: 'Electrician in Manchester',
    description:
      'Find qualified electricians in Manchester for EV charger installation and other electrical work.',
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
    heading: 'EV Charger Installation in Manchester: What to Expect',
    content: (
      <>
        <p>
          Greater Manchester is one of the fastest-growing EV markets outside London. The region's
          Clean Air Zone plans, investment in charging infrastructure, and the city-region's push
          towards net zero by 2038 have all driven strong demand for home EV charger installation
          across Manchester, Salford, Stockport, Trafford, and the surrounding boroughs.
        </p>
        <p>
          Manchester's housing stock presents a mix of challenges. The inner suburbs are dominated by
          Victorian and Edwardian terraces — from the bay-fronted houses of Chorlton and Didsbury to
          the two-up two-downs of Levenshulme and Longsight. Newer estates in outer areas like
          Wythenshawe, Sale, and Bury offer simpler installations with driveways and garages.
        </p>
        <p>
          This guide covers the real costs of EV charger installation in Manchester, the specific
          property challenges, the DNO notification process through{' '}
          <strong>Electricity North West (ENW)</strong>, and the grants and incentives available to
          Manchester residents.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Manchester EV Charger Installation Costs',
    content: (
      <>
        <p>
          Manchester installation costs are broadly in line with the national average, though
          terraced housing pushes the average slightly higher than comparable cities with more
          detached stock.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Typical Manchester Costs (7kW Single-Phase, 2026)</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simple installation (detached/semi, driveway)</strong> — £800 to £1,100.
                Charger near consumer unit, short cable run, existing board has spare capacity.
                Typical for newer estates in Trafford, Stockport, and Bury.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard installation (terraced house, medium cable run)</strong> — £1,100
                to £1,400. Cable run of 10 to 15 metres through the property, possible board
                upgrade. Common across Chorlton, Didsbury, and Levenshulme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complex installation (long run, board upgrade, earthing)</strong> — £1,400
                to £1,800+. Cable run of 15 to 25 metres, consumer unit replacement, earth rod
                installation, underground cable routing. Common for back-to-back terraces.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Manchester electrician labour rates typically range from £40 to £55 per hour. A standard
          installation takes 4 to 6 hours; complex terraced house jobs can take a full day.
        </p>
      </>
    ),
  },
  {
    id: 'property-challenges',
    heading: 'Manchester Property Challenges for EV Charger Installation',
    content: (
      <>
        <p>
          Manchester's housing stock creates specific challenges:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian and Edwardian terraces</strong> — the most common property type in
                inner Manchester. Consumer units are typically at the rear (kitchen or under-stairs),
                with parking at the front of the property. Cable runs of 12 to 20 metres are
                standard. Bay-fronted terraces in Chorlton and Didsbury often have slightly longer
                runs due to the depth of the property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Back-to-back terraces</strong> — some areas of East Manchester still have
                back-to-back or through terraces with no rear access. These can be particularly
                challenging as the only cable route may be internally through the full length of the
                house.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Converted mills and apartments</strong> — Manchester's Ancoats, Northern
                Quarter, and Castlefield areas have many converted industrial buildings now used as
                flats. Shared parking, communal electrics, and management company restrictions all
                complicate EV charger installation. Load management may be required for multiple
                chargers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>On-street parking</strong> — many inner Manchester terraces have no
                off-street parking. Running a cable across the pavement to charge from a lamp-post
                or a wall-mounted charger on the property boundary requires careful consideration of
                safety and potential cable protection solutions. Some residents opt for dedicated
                on-street charging bays where the council provides them.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'section-722',
    heading: 'Section 722 Compliance for Manchester Installations',
    content: (
      <>
        <p>
          All EV charger installations in Manchester must comply with{' '}
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
                <strong>Dedicated circuit (Regulation 722.533.101)</strong> — each EV charger
                requires its own dedicated circuit from the consumer unit. Many Manchester terraces
                have older boards with no spare ways, requiring an upgrade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection (Regulation 722.531.101)</strong> — the EV circuit must have
                appropriate RCD protection. Where the charger can produce DC residual currents, a
                Type B RCD or a Type A RCD with integrated DC fault detection (6mA DC RDC-DD) is
                required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing (Regulation 722.411.4.1)</strong> — particular attention is needed
                for earthing arrangements on PME supplies. Most Manchester properties are on PME,
                requiring additional protective measures for outdoor EV charging.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing</strong> — use the{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                to size correctly for Manchester's longer terraced-house cable runs. Voltage drop on
                a 20-metre 6mm2 cable at 32A is close to the limit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pme-earthing',
    heading: 'PME Earthing Considerations in Manchester',
    content: (
      <>
        <p>
          Most Manchester properties have a PME (TN-C-S) supply. Regulation 722.411.4.1 and the IET
          Code of Practice for EV Charging Equipment Installation require additional earthing
          measures where the vehicle connection point is outdoors on a PME supply.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">The PME Risk</h3>
            <p className="text-white text-sm leading-relaxed">
              On a PME supply, loss of the PEN conductor between the transformer and the property
              can cause earthed metalwork to rise to a dangerous potential. A vehicle connected via
              a charging cable is simultaneously in contact with the PME earth and the ground,
              creating a shock risk. This is why additional earthing measures are mandated.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Solutions</h3>
            <p className="text-white text-sm leading-relaxed">
              Options include a local TT earthing arrangement (earth rod) at the charger with RCD
              protection, a charger with integrated PEN fault detection, or — where the charger is
              inside a building such as a garage — the PME earth may be acceptable. Most Manchester
              outdoor installations use an earth rod. For terraced houses with paved front areas,
              finding soil access for the rod may require lifting a paving slab.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-notification',
    heading: 'Electricity North West DNO Notification for Manchester',
    content: (
      <>
        <p>
          <strong>Electricity North West (ENW)</strong> is the DNO for Greater Manchester, Lancashire,
          Cumbria, Cheshire, and Merseyside. Every EV charger installation must be notified to ENW.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 notification</strong> — for standard 7kW single-phase chargers, submit a
                G98 notification via the ENW online portal. This is a notification, not an
                application — you can proceed with the installation immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 application</strong> — for three-phase chargers or commercial
                multi-point installations, G99 requires prior approval from ENW. Allow 4 to 10
                weeks.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The installer submits the notification — not the homeowner. Confirm that DNO notification
          is included in any quotes you receive.
        </p>
      </>
    ),
  },
  {
    id: 'grants',
    heading: 'Manchester Grants and Incentives for EV Charger Installation',
    content: (
      <>
        <p>
          Funding options available to Manchester residents:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV chargepoint grant (national)</strong> — available to flat owners and
                tenants only. Covers up to 75% of installation cost, capped at £350.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>GM Electric Vehicle Charging Strategy</strong> — the Greater Manchester
                Combined Authority (GMCA) is rolling out public charging infrastructure including
                rapid hubs and on-street charging. While not a direct home installation grant, it
                supports the broader charging ecosystem.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace Charging Scheme</strong> — Manchester businesses can claim up to
                £350 per socket (up to 40 sockets) for workplace charger installations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Installations in Manchester',
    content: (
      <>
        <p>
          Manchester and the surrounding boroughs offer strong, consistent demand for EV charger
          installation. The mix of terraced housing (which generates higher-value jobs due to
          complexity) and newer estates (which provide volume) makes it an attractive market.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pricing Manchester Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Factor in terraced house cable runs (12 to 20 metres average), frequent board
                  upgrades, and earth rod installations on PME supplies. Use Elec-Mate's{' '}
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
                <h4 className="font-bold text-white mb-1">Certification</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    EIC certificate
                  </SEOInternalLink>{' '}
                  on your phone after installation and testing. ENW G98 notification, Part P
                  building control notification, and professional PDF certificate — all from site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify Manchester EV installations"
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

export default function EVChargerInstallationManchesterPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Manchester 2026 | Costs, DNO, and Grants"
      description="How much does EV charger installation cost in Manchester in 2026? Local costs, Electricity North West DNO notification, Manchester grants, terraced house challenges, PME earthing, and Section 722 compliance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Manchester Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          EV Charger Installation Manchester:{' '}
          <span className="text-yellow-400">Costs, DNO, and Grants 2026</span>
        </>
      }
      heroSubtitle="Local costs for EV charger installation across Greater Manchester, Electricity North West DNO notification, local grants, terraced house cable routing challenges, and Section 722 compliance."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in Manchester"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify EV Charger Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
