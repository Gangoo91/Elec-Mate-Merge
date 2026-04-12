import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Building2,
  Zap,
  AlertTriangle,
  FileCheck2,
  Wrench,
  ShieldCheck,
  Wifi,
  Users,
  Lightbulb,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Cost Guides', href: '/guides/electrical-cost-guides' },
  { label: 'Office Electrical Cost', href: '/office-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'cost-breakdown', label: 'Cost Breakdown' },
  { id: 'per-desk-costs', label: 'Per-Desk Estimates' },
  { id: 'power-circuits', label: 'Power Circuits & Data Points' },
  { id: 'lighting', label: 'Office Lighting' },
  { id: 'emergency-fire', label: 'Emergency Lighting & Fire Alarms' },
  { id: 'building-regs', label: 'Building Regulations & Compliance' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A small office electrical fit-out (up to 10 desks) typically costs £2,000 to £8,000, covering power circuits, data points, emergency lighting, and fire alarm connections.',
  'A useful rule of thumb is £500 to £1,500 per desk for a full electrical and data installation, depending on specification level and whether a dedicated IT room or server cabinet is required.',
  'Emergency lighting to BS 5266 is a legal requirement in commercial office premises and must be installed by a qualified electrician, tested on completion, and retested annually.',
  'A fire alarm system to BS 5839 is required in most commercial office buildings. A simple L2 or M system for a small office costs £1,500 to £4,000 for supply and installation.',
  'All commercial electrical work is notifiable. In England and Wales, commercial premises do not fall under Part P (which covers domestic only) — instead, compliance is with Building Regulations Part B (fire) and the Electricity at Work Regulations 1989.',
];

const faqs = [
  {
    question: 'How much does office electrical fit-out cost?',
    answer:
      'A small office electrical fit-out (up to 10 desks) typically costs £2,000 to £8,000. This range covers power circuits, socket outlets at each workstation, data points (Cat6 or Cat6A), emergency lighting, and integration with the fire alarm system. The cost per desk typically ranges from £500 to £1,500 depending on specification. Larger offices (10 to 30 desks) typically cost £8,000 to £25,000. Serviced office fit-outs in London attract labour rates 25 to 40 per cent higher than the national average.',
  },
  {
    question: 'What electrical work is included in an office fit-out?',
    answer:
      'A typical office electrical fit-out includes: distribution board (consumer unit) installation, power circuits serving desktop and floor boxes at workstations, dedicated circuits for the server room or IT cabinet, data cabling (Cat6/Cat6A) to every desk and access point, emergency lighting throughout the escape route and open plan area, fire alarm call points and detector heads (or integration with a building system), general lighting to the appropriate lux level for office work (300-500 lux at desk height), and reception/common area feature lighting. External signage and CCTV power are often additional.',
  },
  {
    question: 'Is emergency lighting required in an office?',
    answer:
      'Yes. BS 5266-1 (Emergency Lighting — Code of Practice) and the Regulatory Reform (Fire Safety) Order 2005 require emergency lighting in commercial premises including offices. Emergency lighting must illuminate escape routes, exit signs, and areas of high risk for a minimum of 1 hour (3 hours for larger premises) in the event of mains failure. Emergency lighting must be installed, commissioned, and tested by a competent person, and a completion certificate (NAPIT ECA or similar) must be issued.',
  },
  {
    question: 'What is the standard lux level for office lighting?',
    answer:
      'CIBSE Lighting Guide LG7 recommends an average maintained illuminance of 300 to 500 lux at desk height for general office areas, with 500 lux for areas requiring detailed work such as drawing offices. Display screen equipment (DSE) workstations require careful avoidance of glare — indirect or recessed LED panels with appropriate UGR (Unified Glare Rating) not exceeding 19 are the current standard for modern offices.',
  },
  {
    question: 'Does office electrical work need Building Regulations approval?',
    answer:
      'Commercial premises (including offices) are not subject to Part P of the Building Regulations, which only covers domestic dwellings. However, office electrical work is governed by the Electricity at Work Regulations 1989 (which requires electrical systems to be maintained safely), Building Regulations Part B (fire safety, relevant to emergency lighting and fire alarm systems), and Building Regulations Part L (energy efficiency, relevant to lighting controls). All commercial electrical work should be carried out by a qualified electrician with commercial experience.',
  },
  {
    question: 'How much do data points cost in an office?',
    answer:
      'Cat6 data point installation costs £80 to £150 per outlet, including supply and installation of the faceplate, cable from the nearest patch panel or switch, and termination. A structured cabling installation for a 10-desk office with 20 data points, a 24-port patch panel, and a comms cabinet costs £2,500 to £5,000 depending on the cable run lengths and the quality of the cabling infrastructure.',
  },
  {
    question: 'What electrical certificates are required for a commercial office fit-out?',
    answer:
      'A commercial office fit-out requires an Electrical Installation Certificate (EIC) covering all new electrical work, an emergency lighting commissioning certificate to BS 5266, and a fire alarm commissioning certificate to BS 5839 where a new or extended fire alarm system is installed. For larger premises, an Electrical Installation Condition Report (EICR) may also be required by the building landlord before handover.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/retail-electrical-cost',
    title: 'Retail Shop Electrical Fit-Out Cost',
    description:
      'Electrical costs for retail shop fit-outs, display lighting, till points, and CCTV.',
    icon: Building2,
    category: 'Cost Guide',
  },
  {
    href: '/guides/emergency-lighting-cost',
    title: 'Emergency Lighting Installation Cost',
    description:
      'Emergency lighting installation costs, BS 5266 requirements, and testing obligations.',
    icon: Lightbulb,
    category: 'Cost Guide',
  },
  {
    href: '/guides/fire-alarm-installation-cost',
    title: 'Fire Alarm Installation Cost',
    description:
      'Fire alarm system installation costs for commercial premises, BS 5839 compliance.',
    icon: AlertTriangle,
    category: 'Cost Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Create professional commercial electrical fit-out quotes from your phone.',
    icon: FileCheck2,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Office Electrical Fit-Out — What Is Involved',
    content: (
      <>
        <p>
          Fitting out an office for commercial occupation involves a broad range of electrical work
          beyond simply installing sockets and lights. Power distribution, data infrastructure,
          emergency lighting, and fire alarm integration must all be coordinated and installed to
          the relevant standards. The cost varies considerably with office size, specification
          level, and location.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small office (up to 10 desks)</strong> — £2,000 to £8,000. Power circuits,
                data points, emergency lighting, and fire alarm integration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium office (10–30 desks)</strong> — £8,000 to £25,000. More complex
                distribution, structured cabling, server room power, dedicated UPS circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large office (30+ desks)</strong> — £25,000 to £80,000+. Three-phase
                distribution, raised access flooring power, BMS integration, full emergency lighting
                and Grade A fire alarm system.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These figures cover the electrical and data installation only. HVAC power connections,
          kitchen and breakout area fitout, and external signage are typically priced separately.
        </p>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Office Electrical Cost Breakdown',
    content: (
      <>
        <p>Understanding where the money goes helps with budgeting and scope decisions.</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution board and mains installation</strong> — £800 to £3,000.
                Commercial distribution board, main switch, sub-circuit MCBs or RCBOs, and
                connection to incoming supply. Scale with office size.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power circuits and socket outlets</strong> — £80 to £200 per outlet. Desktop
                power modules, under-desk power, and floor boxes in open plan areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Data cabling</strong> — £80 to £150 per data point. Cat6 or Cat6A structured
                cabling to every desk, conference room, and Wi-Fi access point. Patch panel and
                comms cabinet additional.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Office lighting</strong> — £100 to £350 per luminaire fitted. Recessed LED
                panels with DALI or 0-10V dimming, occupancy sensors, and daylight sensors for Part
                L compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting</strong> — £150 to £400 per fitting. Maintained or
                non-maintained units throughout escape routes and open plan areas. Commissioning
                certificate required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm system</strong> — £1,500 to £6,000 for a complete small office
                system. Includes panel, smoke detectors, heat detectors, manual call points,
                sounders, and commissioning certificate to{' '}
                <SEOInternalLink href="/guides/bs-5839-fire-alarm-standard">
                  BS 5839-1
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
    id: 'per-desk-costs',
    heading: 'Per-Desk Electrical Installation Estimates',
    content: (
      <>
        <p>
          A useful budgeting tool for office fit-outs is the per-desk electrical cost. This figure
          covers the power and data points at each workstation position.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basic specification (4 power outlets, 2 data points per desk)</strong> —
                £400 to £600 per desk. Standard 13A socket outlets at desk height or in a desktop
                power module, and two Cat6 data outlets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mid-range specification (6 power, 4 data per desk)</strong> — £700 to £1,000
                per desk. Includes USB-A and USB-C charging outlets, four Cat6 data points, and a
                floor box or under-desk cable trunking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High specification (hot-desk or multi-monitor)</strong> — £1,000 to £1,500
                per desk. Floor boxes with 8 power outlets, 4 Cat6 data, and integrated HDMI and USB
                connections. Raised access flooring assumed.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These per-desk figures do not include shared costs such as the distribution board,
          emergency lighting, fire alarm system, and server room — which are fixed costs spread
          across the whole installation.
        </p>
      </>
    ),
  },
  {
    id: 'power-circuits',
    heading: 'Power Circuits and Data Points',
    content: (
      <>
        <p>
          Power distribution in a commercial office is more complex than in a domestic installation.
          Multiple sub-circuits, zone metering, and data infrastructure all need to be coordinated.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>General power circuits</strong> — 20A radial or 32A ring final circuits
                serving desktop outlets. Size the number of circuits to avoid exceeding 50% of the
                circuit capacity under simultaneous load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated IT circuits</strong> — server racks, network switches, and UPS
                units need a dedicated circuit sized for their full load, ideally with a UPS on the
                critical IT supplies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Structured data cabling</strong> — Cat6 or Cat6A to TIA-568 or ISO 11801
                standards. Every desk, conference room, and Wi-Fi access point requires at least two
                data points. PoE (Power over Ethernet) access points also need data cabling rather
                than separate power.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AV and conferencing power</strong> — dedicated circuits for projectors,
                displays, and video conferencing equipment. HDMI, USB, and power in conference room
                tables require planning at the first-fix stage.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'lighting',
    heading: 'Office Lighting — Specification and Cost',
    content: (
      <>
        <p>
          Office lighting must meet the lux levels recommended by CIBSE LG7 and comply with Building
          Regulations Part L (conservation of fuel and power), which requires lighting controls
          including occupancy sensors and daylight linking in new commercial fit-outs.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>General open-plan office</strong> — 300 to 500 lux average, UGR ≤ 19.
                Recessed LED panels with DALI dimming. Occupancy sensors in low-traffic areas.
                Typical cost: £120 to £250 per luminaire plus wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meeting rooms</strong> — dimmable LED panels, scene control for
                presentations and video calls. Motorised blinds integration for daylight control.
                Typically £200 to £400 per fitting plus control wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reception and common areas</strong> — feature lighting, indirect coves, and
                decorative pendants. Higher specification materials. Budget £300 to £700 per feature
                light point plus wiring.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'emergency-fire',
    heading: 'Emergency Lighting and Fire Alarm Systems',
    content: (
      <>
        <p>
          Emergency lighting and fire alarm systems are mandatory in commercial offices and must be
          designed, installed, and commissioned by a qualified person. They are a significant cost
          element that is sometimes underestimated in office fit-out budgets.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting (BS 5266-1)</strong> — required throughout all escape
                routes, open plan working areas, and areas of high risk. Non-maintained LED
                emergency units cost £150 to £300 each fitted and commissioned. A small office
                typically needs 8 to 20 units.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm system (BS 5839-1)</strong> — an L2 or M (manual only) system for
                a small office costs £1,500 to £4,000 supply and install. Includes panel, manual
                call points, smoke detectors, sounders, and a commissioning certificate. Larger
                offices require an L1 system with full coverage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Integration with building systems</strong> — if the office is in a
                multi-tenant building, the fire alarm may need to interface with the building's main
                fire alarm panel. This adds complexity and cost — allow £500 to £2,000 for
                integration work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Emergency lighting and fire alarm commissioning certificates must be kept by the employer
          or building manager. Annual testing of the emergency lighting system is a legal
          requirement under the Regulatory Reform (Fire Safety) Order 2005.
        </p>
      </>
    ),
  },
  {
    id: 'building-regs',
    heading: 'Building Regulations and Compliance',
    content: (
      <>
        <p>
          Commercial office electrical work is governed by different regulations to domestic work.
          Part P does not apply to commercial premises. Instead, the key frameworks are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989</strong> — requires that electrical
                systems are constructed, maintained, and operated to prevent danger. All commercial
                electrical work must be carried out by a competent person.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Part B (Fire Safety)</strong> — governs emergency
                lighting and fire detection/alarm systems. Relevant to all commercial fit-outs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Part L (Energy Efficiency)</strong> — requires
                energy-efficient lighting and controls in commercial buildings. LED luminaires with
                occupancy sensors and daylight linking are required in most new commercial fit-outs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC on completion</strong> — an{' '}
                <SEOInternalLink href="/eic-certificate">
                  Electrical Installation Certificate
                </SEOInternalLink>{' '}
                must be issued for all new commercial electrical installations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Commercial Office Fit-Out Work',
    content: (
      <>
        <p>
          Office fit-out projects are high-value, multi-phase jobs that reward electricians who can
          manage a programme, co-ordinate with other trades, and deliver accurate costings. The main
          failure modes are underquoting data cabling and underestimating the emergency lighting and
          fire alarm scope.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Data Cabling Accurately</h4>
                <p className="text-white text-sm leading-relaxed">
                  Data cabling is often underquoted in commercial fit-outs. Count every data point,
                  measure every cable run, and price the patch panel, comms cabinet, and termination
                  time separately. Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build an itemised BOM that captures every element.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificate Everything</h4>
                <p className="text-white text-sm leading-relaxed">
                  Commercial clients expect full documentation — EIC, emergency lighting
                  commissioning certificate, and fire alarm commissioning certificate. Issue the{' '}
                  <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> on site after
                  testing. Follow up with the emergency lighting and fire alarm certificates within
                  48 hours. This is the professional standard that wins repeat business.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify commercial office electrical fit-outs with Elec-Mate"
          description="Create professional itemised electrical fit-out quotes, issue EICs on site, and manage multi-phase commercial projects. Join 1,000+ UK electricians. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function OfficeElectricalCostPage() {
  return (
    <GuideTemplate
      title="Office Electrical Fit Out Cost UK 2025 | Commercial Office Wiring"
      description="Office electrical fit-out costs in the UK for 2025. Small office £2,000–£8,000, per-desk estimates £500–£1,500. Power circuits, data points, emergency lighting, fire alarms, and Building Regulations compliance explained."
      datePublished="2025-01-01"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Office Electrical Fit-Out Cost UK 2025:{' '}
          <span className="text-yellow-400">Commercial Office Wiring Prices</span>
        </>
      }
      heroSubtitle="Detailed breakdown of commercial office electrical fit-out costs in the UK for 2025 — small office from £2,000, per-desk estimates, power circuits and data points, office lighting, emergency lighting to BS 5266, fire alarm systems to BS 5839, and compliance requirements."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Office Electrical Fit-Out Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Your Office Electrical Fit-Out in Minutes"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate to create professional commercial electrical fit-out quotes with itemised power, data, emergency lighting, and fire alarm costs. 7-day free trial, cancel anytime."
    />
  );
}
