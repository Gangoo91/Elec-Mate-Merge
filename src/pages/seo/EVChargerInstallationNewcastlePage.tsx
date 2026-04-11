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
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'EV Charger Installation Cost', href: '/guides/ev-charger-installation-cost' },
  { label: 'Newcastle', href: '/ev-charger-installation-newcastle' },
];

const tocItems = [
  { id: 'overview', label: 'EV Charger Installation in Newcastle' },
  { id: 'costs', label: 'Newcastle Installation Costs' },
  { id: 'ozev-grants', label: 'OZEV Grants (Up to £350)' },
  { id: 'section-722', label: 'Section 722 Compliance' },
  { id: 'pme-earthing', label: 'PME Earthing Considerations' },
  { id: 'dno-notification', label: 'Northern Powergrid DNO Notification' },
  { id: 'approved-installers', label: 'OZEV-Approved Installers' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A 7kW home EV charger installation in Newcastle typically costs £800 to £1,200 all-in, making the North East one of the more affordable regions in the UK for home EV charging.',
  'The OZEV EV chargepoint grant provides up to £350 towards installation costs for flat owners and tenants — OZEV-approved installers apply on your behalf.',
  'Northern Powergrid is the Distribution Network Operator (DNO) for the Newcastle and wider North East region. G98 notification is required before energising any domestic EV charger.',
  'BS 7671:2018 Section 722 governs all EV charging installations. Regulation 722.411.4.1 requires specific earthing measures on PME supplies, which are common across Newcastle.',
  'All EV charger installations must be carried out by a Part P-competent electrician. NICEIC and NAPIT members can self-certify the installation to Building Regulations.',
  "Newcastle's housing stock includes a mix of Tyne and Wear terraces, semis, and newer builds — most offer straightforward cable runs at the lower end of the cost range.",
];

const faqs = [
  {
    question: 'How much does EV charger installation cost in Newcastle in 2026?',
    answer:
      'A standard 7kW home EV charger installation in Newcastle costs between £800 and £1,200 in 2026. This includes the charger unit, a dedicated 32A circuit from the consumer unit, earthing arrangements, and DNO notification. Labour rates in Newcastle and the wider North East are lower than the national average at £35 to £50 per hour. Complex installations involving long cable runs or consumer unit upgrades sit at the upper end. A 22kW three-phase charger typically costs £1,200 to £2,000 installed.',
  },
  {
    question: 'What is the OZEV EV chargepoint grant and can I claim it in Newcastle?',
    answer:
      'The OZEV (Office for Zero Emission Vehicles) EV chargepoint grant provides up to £350 towards the cost of a home EV charger installation. It is available to flat owners and tenants across the UK, including Newcastle. Homeowners in houses are not eligible. The grant is claimed by an OZEV-approved installer on your behalf — you do not apply directly. To qualify, you must own or lease an eligible plug-in vehicle. Your OZEV-approved installer will handle the paperwork and deduct the grant from your invoice.',
  },
  {
    question: 'Which DNO covers Newcastle for EV charger notification?',
    answer:
      "Northern Powergrid is the Distribution Network Operator for Newcastle, Gateshead, Sunderland, and the wider North East region. All EV charger installations must be notified to Northern Powergrid under Engineering Recommendation G98 before the charger is energised. For standard 7kW single-phase chargers, G98 is a simple notification — no prior approval is required. Three-phase 22kW chargers require G99 approval, which can take several weeks. The installer submits the notification on the homeowner's behalf.",
  },
  {
    question: 'Do I need an OZEV-approved installer for EV charger installation in Newcastle?',
    answer:
      'You need an OZEV-approved installer if you wish to claim the EV chargepoint grant. OZEV-approved installers are vetted by the government and must be registered with an approved body. All OZEV-approved installers must also be Part P-competent and members of a recognised competent person scheme such as NICEIC or NAPIT. Even without a grant, it is strongly recommended to use an NICEIC or NAPIT-registered electrician to ensure the installation is self-certified to Building Regulations.',
  },
  {
    question: 'Do I need a Part P certificate for an EV charger installation in Newcastle?',
    answer:
      'Yes. Installing an EV charger circuit involves notifiable electrical work under Part P of the Building Regulations. The electrician must either be registered with a competent person scheme (such as NICEIC or NAPIT) and self-certify the work, or submit a building control application to Newcastle City Council. NICEIC and NAPIT members handle this automatically. An Electrical Installation Certificate (EIC) must also be issued for every EV charger installation under BS 7671 Section 722.',
  },
  {
    question: 'Can I install a 7kW EV charger on a Newcastle terrace?',
    answer:
      'Yes. Most Newcastle terraces and semis are well-suited to EV charger installation. The typical cable run from the consumer unit to a driveway or garage is 5 to 15 metres, which is manageable and keeps costs at the lower end. Where parking is at the front of a terrace and the consumer unit is at the rear, a longer run through the property may be needed, adding cost. An earthing survey is needed to confirm the earthing arrangement, particularly on PME (TN-C-S) supplies where an earth rod may be required for outdoor chargers.',
  },
  {
    question: 'How long does EV charger installation take in Newcastle?',
    answer:
      'A standard 7kW home EV charger installation in Newcastle takes between 3 and 6 hours for a qualified electrician. This includes installing the dedicated circuit, mounting the charger, earthing, and testing. A straightforward installation in a modern house with a garage takes around 3 to 4 hours. More complex installations involving longer cable runs, consumer unit upgrades, or earth rod installation may take a full day. The electrician will also complete DNO notification and issue the EIC before leaving.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/ev-charger-installation-cost',
    title: 'EV Charger Installation Cost UK',
    description:
      'National price guide covering all charger types, cost factors, and regional price differences.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'Complete technical guide covering Section 722, earthing, DNO notification, and testing requirements.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size the cable for your EV charger circuit with automatic voltage drop checks.',
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
    href: '/electrician/newcastle',
    title: 'Electrician in Newcastle',
    description:
      'Find NICEIC and NAPIT-registered electricians in Newcastle for EV charger installation.',
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
    heading: 'EV Charger Installation in Newcastle: What to Expect',
    content: (
      <>
        <p>
          Newcastle upon Tyne and the wider North East are seeing rapid growth in electric vehicle
          adoption, driven by improving EV model availability, falling battery costs, and UK
          Government targets to end the sale of new petrol and diesel cars. Home EV charger
          installation is the most convenient and cost-effective way to charge an electric vehicle,
          providing a full charge overnight from a 7kW wallbox.
        </p>
        <p>
          The good news for Newcastle residents is that home EV charger installation is generally
          more affordable here than in London or the South East. Labour rates are lower, cable runs
          are shorter in most properties, and the North East's housing stock — a mix of post-war
          semis, terraces, and newer builds — lends itself to straightforward installations.
        </p>
        <p>
          This guide covers the real costs of EV charger installation in Newcastle, the OZEV grant
          of up to £350 available to eligible residents, the <strong>Northern Powergrid</strong> DNO
          notification process, Part P compliance requirements, and what to look for when choosing
          an OZEV-approved installer. Whether you are getting quotes for your home or an electrician
          pricing North East jobs, this guide reflects current 2026 market conditions.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Newcastle EV Charger Installation Costs 2026',
    content: (
      <>
        <p>
          Newcastle is among the more affordable cities in the UK for home EV charger installation.
          Lower labour rates and typically shorter cable runs mean most domestic installations fall
          comfortably within the £800 to £1,200 range for a 7kW charger.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Typical Newcastle Installation Costs (2026)
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simple installation (detached/semi, garage or short driveway)</strong> —
                £800 to £1,000. Charger mounted close to the consumer unit, short cable run of 3 to
                8 metres, no board upgrade required. The most common Newcastle scenario for post-war
                semis.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard installation (terrace, medium cable run)</strong> — £900 to £1,100.
                Cable run of 8 to 15 metres, possible board upgrade, earth rod where PME supply is
                present. Typical for Tyne and Wear terraces with a front driveway.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complex installation (long cable run, board upgrade)</strong> — £1,100 to
                £1,400. Cable run over 15 metres, consumer unit replacement needed, earth rod and TT
                arrangement. Less common but occurs where consumer unit is at the rear and parking
                is at the front.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>22kW three-phase charger</strong> — £1,200 to £2,000 installed. Requires a
                three-phase supply (not all Newcastle properties have this) and G99 approval from
                Northern Powergrid. Suitable for properties with very high mileage usage or multiple
                EVs.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electrician labour rates in Newcastle and the North East typically range from £35 to £50
          per hour. A standard EV charger installation takes 3 to 5 hours, making most jobs a
          half-day to full-day booking.
        </p>
      </>
    ),
  },
  {
    id: 'ozev-grants',
    heading: 'OZEV EV Chargepoint Grant: Up to £350 for Newcastle Residents',
    content: (
      <>
        <p>
          The <strong>OZEV EV chargepoint grant</strong> (formerly the OLEV grant) provides up to
          £350 towards the cost of a home EV charger installation. In Newcastle, where total
          installation costs typically fall in the £800 to £1,200 range, this grant represents a
          meaningful saving of up to 30 to 40% for eligible applicants.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Grant Eligibility</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flat owners and tenants</strong> — eligible for up to £350 per chargepoint.
                You must own or lease a qualifying plug-in vehicle (or have one on order). The grant
                covers 75% of the installation cost up to the £350 cap.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Homeowners in houses</strong> — no longer eligible for the domestic
                chargepoint grant as of April 2022. However, the Workplace Charging Scheme (up to
                £350 per socket, 40 sockets maximum) remains available for Newcastle businesses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV-approved installer required</strong> — only OZEV-approved installers
                can apply for the grant on your behalf. They deduct the grant from the invoice you
                pay. Confirm your installer's OZEV approval before booking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart charger requirement</strong> — the Electric Vehicles (Smart Charge
                Points) Regulations 2021 require all new home EV chargers to be smart chargers
                capable of scheduled and off-peak charging. OZEV-approved installers will only
                install compliant smart charger models.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The application process is handled entirely by your installer. You provide evidence of
          vehicle ownership or lease, the installer submits the claim, and OZEV reimburses the
          installer directly. There is no paperwork for the homeowner beyond confirming eligibility.
        </p>
      </>
    ),
  },
  {
    id: 'section-722',
    heading: 'Section 722 Compliance for Newcastle EV Charger Installations',
    content: (
      <>
        <p>
          All EV charger installations in Newcastle must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 722 — Locations containing electric vehicle charging points. The key regulations
          that apply to most Newcastle domestic installations are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit (Regulation 722.533.101)</strong> — the EV charger must be
                on its own dedicated final circuit. This typically means a 32A Type B MCB from the
                consumer unit, protected with appropriate RCD protection. If the consumer unit has
                no spare ways, a board upgrade or sub-board may be needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection (Regulation 722.531.101)</strong> — the EV charger circuit
                requires RCD protection. For chargers that produce DC residual currents, a Type B
                RCD or a Type A RCD with a separate 6mA DC RDC-DD device is required. Most modern
                smart chargers have integrated DC fault protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart charger compliance</strong> — under the Electric Vehicles (Smart
                Charge Points) Regulations 2021, all new home EV chargers must support smart
                charging functionality, randomised delay, and demand side response. Chargers must be
                capable of remote control and scheduling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing for voltage drop</strong> — all cable sizing must be calculated
                to ensure voltage drop does not exceed 3% for lighting circuits or 5% for other
                circuits under BS 7671. Use{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  Elec-Mate's cable sizing calculator
                </SEOInternalLink>{' '}
                to verify cable selection for the actual cable run length.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing (Regulation 722.411.4.1)</strong> — specific earthing requirements
                apply where the charger connection point is outdoors and the supply is PME. See the
                PME earthing section below.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pme-earthing',
    heading: 'PME Earthing Considerations in Newcastle',
    content: (
      <>
        <p>
          The majority of Newcastle properties are supplied on a PME (TN-C-S) earthing arrangement.
          Regulation 722.411.4.1 and the IET Code of Practice for EV Charging Equipment Installation
          require that additional earthing measures are taken where an EV charging point is
          installed outdoors on a PME supply.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">The PME Risk</h3>
            <p className="text-white text-sm leading-relaxed">
              On a PME supply, a broken PEN conductor between the distribution transformer and the
              property can cause dangerous touch voltages on earthed metalwork — including the EV
              being charged outdoors. The vehicle tyres provide limited isolation and a wet driveway
              can create a shock risk if the PEN conductor fails.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Solutions for Newcastle</h3>
            <p className="text-white text-sm leading-relaxed">
              The IET Code of Practice recommends installing a local earth electrode (earth rod) at
              the charger to create a TT arrangement, or using a charger with integrated PEN fault
              detection. Where the charger is inside a garage or carport (rather than fully
              outdoors), the PME earth may be acceptable subject to an assessment by the installing
              electrician.
            </p>
          </div>
        </div>
        <p>
          An earth rod installation in Newcastle adds approximately £80 to £150 to the cost,
          including the rod, clamp, and continuity and resistance testing. Most Newcastle properties
          with gardens or grass verges have suitable ground conditions for earth rod installation.
        </p>
      </>
    ),
  },
  {
    id: 'dno-notification',
    heading: 'Northern Powergrid DNO Notification for Newcastle Installations',
    content: (
      <>
        <p>
          <strong>Northern Powergrid</strong> is the Distribution Network Operator for Newcastle,
          Gateshead, the Tyne and Wear region, and the wider North East of England. G98 notification
          to Northern Powergrid is a legal requirement before any domestic EV charger is connected
          to the network.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 notification (7kW single-phase, standard domestic)</strong> — submit
                online via the Northern Powergrid portal before energising the charger. This is a
                post-installation notification for single-phase chargers up to 3.68kW per phase
                (16A). For 7kW (32A single-phase), G98 notification applies. No prior approval is
                required; the installer notifies and connects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 application (22kW three-phase)</strong> — three-phase chargers and
                commercial installations require G99 prior approval from Northern Powergrid. Allow 4
                to 10 weeks for assessment. Northern Powergrid will assess network capacity in the
                relevant street before approving.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installer responsibility</strong> — the installing electrician is
                responsible for submitting DNO notification. Confirm this is included in the quoted
                price before booking. Failure to notify Northern Powergrid can result in the charger
                being required to be disconnected until notification is complete.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'approved-installers',
    heading: 'Choosing an OZEV-Approved EV Charger Installer in Newcastle',
    content: (
      <>
        <p>
          Selecting the right installer for your EV charger in Newcastle ensures the work is safe,
          compliant, and eligible for available grants. Here is what to look for:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV-approved status</strong> — essential if you are claiming the EV
                chargepoint grant. Check the OZEV approved installer register at gov.uk before
                booking. OZEV-approved installers have passed checks on their qualifications,
                insurance, and previous installation quality.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registration</strong> — Part P self-certification requires
                membership of a competent person scheme. NICEIC and NAPIT are the two main schemes
                for electricians in the UK. Members are independently assessed and can self-certify
                electrical work to Building Regulations without involving building control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV installation experience</strong> — ask installers about their experience
                specifically with EV charger installations. The earthing assessment, DNO
                notification process, and smart charger commissioning are specific skills. A general
                electrician may not be familiar with all aspects of Section 722 compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation included</strong> — the installer should provide an Electrical
                Installation Certificate (EIC), a Minor Electrical Installation Works Certificate or
                EIC as appropriate, Northern Powergrid G98 notification confirmation, and
                manufacturer commissioning documentation. Ask for these to be included in the quoted
                price.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Installations in Newcastle',
    content: (
      <>
        <p>
          Newcastle and the North East represent a growing market for domestic EV charger
          installation. EV uptake is accelerating across the region and electricians who can offer a
          complete, compliant installation service — including OZEV grant processing — are well
          positioned to win work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pricing Newcastle EV Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Factor in North East labour rates (£35 to £50/hour), typical cable run distances
                  (5 to 15 metres for most Newcastle semis and terraces), earth rod costs where
                  needed, and Northern Powergrid notification time. Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build accurate itemised quotes on site, including all materials and
                  certification costs.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certification on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every EV charger installation requires an{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  signed by the designer, constructor, and inspector. Complete and issue the EIC
                  from your phone before you leave site. Elec-Mate's certificate app includes all
                  required test result fields for Section 722 installations.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify EV charger installations in Newcastle"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certification. Complete EV charger quotes and certificates from your phone — built for electricians working across the North East."
          icon={Car}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerInstallationNewcastlePage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Newcastle | Home EV Charging Newcastle 2026"
      description="EV charger installation costs in Newcastle 2026: 7kW charger £800-1,200 installed, OZEV grants up to £350, Northern Powergrid DNO notification, OZEV-approved installers, Part P compliance, and Section 722 earthing requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Newcastle Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          EV Charger Installation Newcastle:{' '}
          <span className="text-yellow-400">Costs, OZEV Grants, and Compliance 2026</span>
        </>
      }
      heroSubtitle="Home EV charger installation in Newcastle costs £800 to £1,200 for a 7kW wallbox. Covers OZEV grants of up to £350, Northern Powergrid DNO notification, OZEV-approved installers, Part P compliance, and Section 722 earthing requirements."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in Newcastle"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify EV Charger Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
