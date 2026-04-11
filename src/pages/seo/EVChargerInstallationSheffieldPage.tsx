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
  MapPin,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'EV Charger Installation Cost', href: '/guides/ev-charger-installation-cost' },
  { label: 'Sheffield', href: '/ev-charger-installation-sheffield' },
];

const tocItems = [
  { id: 'overview', label: 'EV Charger Installation in Sheffield' },
  { id: 'costs', label: 'Sheffield Installation Costs' },
  { id: 'grants', label: 'Grants and Incentives' },
  { id: 'section-722', label: 'Section 722 Compliance' },
  { id: 'pme-earthing', label: 'PME Earthing in Sheffield' },
  { id: 'dno-notification', label: 'Northern Powergrid DNO Notification' },
  { id: 'terrain', label: "Sheffield's Hilly Terrain and Cable Routing" },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A 7kW home EV charger installation in Sheffield typically costs £800 to £1,200, with most properties in the lower half of that range due to competitive local labour rates.',
  'The OZEV EV chargepoint grant provides up to £350 for eligible flat owners and tenants — applied for by an OZEV-approved installer on your behalf.',
  'Northern Powergrid is the DNO for Sheffield. G98 notification is required before energising any domestic 7kW EV charger; G99 approval needed for three-phase 22kW installations.',
  'BS 7671:2018 Section 722 governs all EV charging installations. PME earthing arrangements are common in Sheffield, often requiring an earth rod for outdoor charger locations.',
  "Sheffield's hilly topography means some properties have unusually long cable routes from consumer unit to parking, particularly on steep terrace streets — factor this into quotes.",
  'NICEIC and NAPIT-registered electricians can self-certify EV charger installations to Part P of the Building Regulations without a separate building control application.',
];

const faqs = [
  {
    question: 'How much does EV charger installation cost in Sheffield in 2026?',
    answer:
      'A standard 7kW home EV charger installation in Sheffield costs between £800 and £1,200 in 2026. This includes the charger unit, a dedicated 32A circuit from the consumer unit, earthing arrangements, G98 DNO notification, and an Electrical Installation Certificate. Labour rates in Sheffield are in line with other Yorkshire cities at £38 to £52 per hour. Simple installations in modern semis with a garage sit at £800 to £950. More complex jobs with longer cable runs or consumer unit upgrades reach £1,100 to £1,200.',
  },
  {
    question: 'Is the OZEV EV chargepoint grant available in Sheffield?',
    answer:
      'Yes. The OZEV EV chargepoint grant is a national scheme available to flat owners and tenants across the UK including Sheffield. It provides up to £350 (75% of installation cost) per chargepoint. Homeowners in houses are not eligible. The grant is processed by your OZEV-approved installer, who deducts it from your invoice. You must own or have a confirmed order for an eligible plug-in vehicle. Sheffield City Council and South Yorkshire Mayoral Combined Authority also support EV infrastructure expansion, though direct residential grants beyond the national scheme are limited.',
  },
  {
    question: 'Which DNO covers Sheffield for EV charger installation?',
    answer:
      'Northern Powergrid is the Distribution Network Operator for Sheffield and the wider South Yorkshire area. All domestic EV charger installations must be notified to Northern Powergrid under Engineering Recommendation G98 before the charger is energised. For 7kW single-phase chargers, G98 is a straightforward notification submitted by your installer — no prior approval is needed. Three-phase 22kW chargers require G99 prior approval, which can take several weeks.',
  },
  {
    question: "Does Sheffield's hilly topography affect EV charger installation costs?",
    answer:
      "It can. Sheffield's distinctive hillside terraces — particularly in areas like Crookes, Walkley, Hillsborough, and the Valleys — sometimes have steeply sloped driveways or yards that create challenges for charger mounting and cable routing. Where a property is on a steep slope, cable runs from the consumer unit to a parking position at the bottom of the garden may be longer than expected. Cable containment on steep external walls also needs careful planning. Always ask your installer to assess the specific cable route before agreeing a fixed price.",
  },
  {
    question: 'Do I need an earth rod for an EV charger in Sheffield?',
    answer:
      'Probably, if the charger is outdoors. Most Sheffield properties are on a PME (TN-C-S) supply. Regulation 722.411.4.1 requires that where an EV charging point is outdoors on a PME supply, a local earth electrode (earth rod) is installed to create a TT arrangement, or the charger must have integrated PEN fault detection. Your electrician will carry out an earthing assessment during the survey and advise on the required approach. An earth rod adds approximately £80 to £150 to the installation cost.',
  },
  {
    question: 'Can I get an EV charger installed in a Sheffield terrace or maisonette?',
    answer:
      'Yes. Most Sheffield terraces have off-street parking at the front or rear, making EV charger installation feasible. The typical cable run for a Sheffield terrace is 5 to 15 metres. Where a terrace has a rear yard accessed through a back entry, and parking is at the front, the cable run can be longer and more complex. For maisonettes or upper-floor flats, you will need freeholder permission and a viable cable route. OZEV-approved installers can advise on feasibility during a free survey.',
  },
  {
    question: 'How long does EV charger installation take in Sheffield?',
    answer:
      'A standard 7kW EV charger installation in Sheffield takes 3 to 5 hours for a qualified electrician. Simple installations on modern properties with a garage or short driveway take 3 to 4 hours. Installations involving longer cable runs, consumer unit upgrades, or earth rod installation take 5 to 7 hours and may be a full-day booking. The electrician will complete Northern Powergrid G98 notification and issue an Electrical Installation Certificate before leaving site.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/ev-charger-installation-cost',
    title: 'EV Charger Installation Cost UK',
    description:
      'National price guide for EV charger installation covering all charger types and regions.',
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
    description: 'Size the cable for your EV charger circuit with voltage drop checks.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete EIC certificates for EV charger installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description: 'Consumer unit upgrade requirements when adding a 32A EV charger circuit.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/electrician/sheffield',
    title: 'Electrician in Sheffield',
    description:
      'Find NICEIC and NAPIT-registered electricians in Sheffield for EV charger installation.',
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
    heading: 'EV Charger Installation in Sheffield: What to Expect',
    content: (
      <>
        <p>
          Sheffield is embracing electric vehicles at a growing rate, with residents across the city
          replacing petrol and diesel cars ahead of the UK's 2035 zero-emission vehicle mandate.
          Home EV charger installation provides the most convenient and cost-effective charging
          solution, allowing a full charge overnight from a dedicated 7kW wallbox.
        </p>
        <p>
          Sheffield presents a varied picture for EV charger installation. The city's housing stock
          ranges from post-war semis and modern new builds in the south and west of the city to
          stone-built Victorian terraces on steep hillsides across Hillsborough, Walkley, Crookes,
          and the Valleys. Most properties have off-street parking, which keeps installation
          feasibility high, though the city's distinctive topography occasionally creates longer or
          more complex cable routes.
        </p>
        <p>
          This guide covers the real costs of EV charger installation in Sheffield in 2026, the OZEV
          grant of up to £350 for eligible residents, the <strong>Northern Powergrid</strong> DNO
          notification process, Part P compliance, and how Sheffield's hilly terrain can affect
          cable routing and costs.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Sheffield EV Charger Installation Costs 2026',
    content: (
      <>
        <p>
          Sheffield offers competitive pricing for EV charger installation, reflecting Yorkshire's
          lower-than-London labour rates and the accessibility of most residential properties for a
          standard cable route installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Typical Sheffield Installation Costs (2026)
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simple installation (semi or detached, garage or short driveway)</strong> —
                £800 to £1,000. Charger mounted close to the consumer unit, cable run of 3 to 8
                metres, existing board has a spare way. Typical for Sheffield's south-west semis and
                new builds in areas like Dore, Totley, and Mosborough.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard installation (terrace, medium run, earth rod)</strong> — £900 to
                £1,100. Cable run of 8 to 15 metres, PME earth rod required, possible MCB addition.
                Typical for Sheffield terraces in Hillsborough, Burngreave, or Attercliffe with a
                front-of-house parking area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complex installation (steep terrace, long run, board upgrade)</strong> —
                £1,100 to £1,400. Cable run over 15 metres on steep slopes or through the property,
                full consumer unit upgrade needed, or underground cable route required. More common
                on Walkley, Crookes, or Rivelin Valley properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>22kW three-phase charger</strong> — £1,200 to £2,000 installed. Requires an
                existing three-phase supply and G99 approval from Northern Powergrid. Typical for
                commercial premises or high-mileage drivers with a suitable supply.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Labour rates for qualified electricians in Sheffield range from £38 to £52 per hour. A
          typical EV charger installation takes 3 to 5 hours, making it a half-day to full-day job
          depending on complexity.
        </p>
      </>
    ),
  },
  {
    id: 'grants',
    heading: 'Grants and Incentives for Sheffield EV Charger Installation',
    content: (
      <>
        <p>
          Sheffield residents can access national grant support for EV charger installation through
          OZEV:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV chargepoint grant (OZEV)</strong> — up to £350 for flat owners and
                tenants who own or lease an eligible plug-in vehicle. Covers 75% of installation
                cost capped at £350. Applied for by your OZEV-approved installer — no paperwork for
                the homeowner beyond confirming vehicle ownership.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace Charging Scheme</strong> — Sheffield businesses can claim up to
                £350 per socket (maximum 40 sockets) for workplace EV charging points. Administered
                by OZEV. Requires an OZEV-approved installer and a registered business.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart Export Guarantee compatibility</strong> — Sheffield residents with
                solar PV can maximise savings by pairing an EV smart charger with solar export
                tariffs and off-peak overnight charging. Smart charger scheduling is a legal
                requirement under the Electric Vehicles (Smart Charge Points) Regulations 2021.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'section-722',
    heading: 'Section 722 Compliance for Sheffield EV Charger Installations',
    content: (
      <>
        <p>
          All EV charger installations in Sheffield must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 722. The key requirements are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated final circuit (Regulation 722.533.101)</strong> — a 32A dedicated
                circuit from the consumer unit. If no spare way exists, a consumer unit upgrade or
                separate enclosure is needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection (Regulation 722.531.101)</strong> — appropriate RCD
                protection is required. Most smart chargers include integrated DC fault protection,
                satisfying the requirement for a Type B RCD or Type A with 6mA DC RDC-DD.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart charger compliance</strong> — the Electric Vehicles (Smart Charge
                Points) Regulations 2021 require all new home EV chargers to support smart
                scheduling and demand side response. Non-compliant chargers cannot be installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing and voltage drop</strong> — on longer Sheffield cable runs, use{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  Elec-Mate's cable sizing calculator
                </SEOInternalLink>{' '}
                to verify voltage drop stays within the 5% limit. 6mm² cable is typically suitable
                for runs up to 15 metres; 10mm² may be needed for longer runs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pme-earthing',
    heading: 'PME Earthing Considerations in Sheffield',
    content: (
      <>
        <p>
          The majority of Sheffield properties are on a PME (TN-C-S) earthing arrangement. Under
          Regulation 722.411.4.1 and the IET Code of Practice for EV Charging Equipment
          Installation, outdoor EV charging points on PME supplies require specific protective
          measures.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Why PME Needs Attention</h3>
            <p className="text-white text-sm leading-relaxed">
              On a PME supply, a broken PEN conductor (shared neutral and earth) between the
              distribution transformer and the property can cause dangerous touch voltages on
              earthed metalwork. A vehicle being charged outdoors is particularly at risk because
              the tyres provide limited isolation from the ground, especially on wet driveways.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Sheffield Solutions</h3>
            <p className="text-white text-sm leading-relaxed">
              Installing a local earth electrode (earth rod) at the charger to create a TT earthing
              arrangement is the most common approach for Sheffield outdoor chargers. Alternatively,
              chargers with built-in PEN fault detection can be used on a PME supply without a
              separate earth rod. Where the charger is fully inside a garage or enclosed carport, a
              risk assessment may allow the PME earth to be retained.
            </p>
          </div>
        </div>
        <p>
          Sheffield's ground conditions are generally favourable for earth rod installation. The
          typical additional cost is £80 to £150, including the rod, clamp, and testing to confirm
          adequate earth resistance values.
        </p>
      </>
    ),
  },
  {
    id: 'dno-notification',
    heading: 'Northern Powergrid DNO Notification for Sheffield',
    content: (
      <>
        <p>
          <strong>Northern Powergrid</strong> is the Distribution Network Operator for Sheffield and
          South Yorkshire. Every EV charger installation must be notified to Northern Powergrid
          before the charger is switched on.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 notification (7kW single-phase)</strong> — submit online via Northern
                Powergrid's portal. This is a notification, not an application — the installer
                proceeds with connection and notifies concurrently. Processing is largely automated
                for standard domestic installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 application (22kW three-phase)</strong> — prior approval required before
                installation. Allow 4 to 10 weeks for Northern Powergrid to assess network capacity.
                More common for commercial premises or multi-unit residential developments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installer responsibility</strong> — the electrician submits the DNO
                notification, not the homeowner. Confirm DNO notification is included in the quoted
                price. Non-notified installations are not compliant and may need to be disconnected.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'terrain',
    heading: "Sheffield's Hilly Terrain and EV Charger Cable Routing",
    content: (
      <>
        <p>
          Sheffield is famously hilly — a city built across seven hills, much like Rome. This
          topography has a real impact on EV charger installation, particularly for properties on
          steep residential streets:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sloped driveways</strong> — steep driveways require careful charger
                positioning to ensure cable connections remain protected from water ingress and
                physical damage. The charger may need to be mounted higher on a wall to ensure the
                cable reaches the vehicle's charge port without trailing on the ground.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hillside terrace back entries</strong> — many Sheffield terraces on
                hillsides have parking accessed through a back entry below the property level. Cable
                routes from the consumer unit (inside the house) to a charger at the lower rear of
                the property can be longer and more complex than expected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underground routes on steep slopes</strong> — where an overhead cable route
                is not feasible, underground cable routing may be required, especially on steep
                embankments. This adds to the cost but provides a neater and more durable
                installation. An armoured cable (SWA) is typically used for underground runs.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always ask your installer to carry out a site survey before agreeing a fixed price for a
          Sheffield EV charger installation. Complex terrain can significantly affect the time and
          materials required.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Work in Sheffield',
    content: (
      <>
        <p>
          Sheffield and South Yorkshire's growing EV market represents steady work for
          NICEIC-registered and NAPIT-registered electricians. Sheffield's varied housing and
          terrain mean no two jobs are identical — good site surveys and accurate quoting are
          essential.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pricing Sheffield EV Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Factor in Yorkshire labour rates (£38 to £52/hour), site survey time for complex
                  terrain, earth rod costs, Northern Powergrid notification, and certification. Use
                  Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    electrical quoting app
                  </SEOInternalLink>{' '}
                  to build itemised quotes that account for all job-specific variables.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Certification on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  from your phone before leaving site. Every EV charger installation requires a full
                  EIC signed by designer, constructor, and inspector under BS 7671 Section 722.
                  Elec-Mate's certificate app covers all required test fields and can be emailed to
                  the customer instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify Sheffield EV charger installations"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certification. Complete EV charger quotes and certificates from your phone — built for electricians working across Sheffield and South Yorkshire."
          icon={Car}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerInstallationSheffieldPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Sheffield | Home EV Charging Sheffield 2026"
      description="EV charger installation costs in Sheffield 2026: 7kW charger £800-1,200 installed, OZEV grants up to £350, Northern Powergrid DNO notification, PME earthing, Part P compliance, and Sheffield terrain considerations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Sheffield Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          EV Charger Installation Sheffield:{' '}
          <span className="text-yellow-400">Costs, Grants, and Compliance 2026</span>
        </>
      }
      heroSubtitle="Home EV charger installation in Sheffield costs £800 to £1,200 for a 7kW wallbox. Covers OZEV grants up to £350, Northern Powergrid G98 notification, PME earthing requirements, and Sheffield's unique terrain considerations."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in Sheffield"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify EV Charger Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
