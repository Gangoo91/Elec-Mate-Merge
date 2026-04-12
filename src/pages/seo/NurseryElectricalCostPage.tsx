import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Calculator,
  Baby,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Wrench,
  Building2,
  Flame,
  Thermometer,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Nursery Electrical Cost', href: '/guides/nursery-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Nursery Electrical Overview' },
  { id: 'child-safety', label: 'Child Safety and Socket Outlets' },
  { id: 'emergency-lighting', label: 'Emergency Lighting Requirements' },
  { id: 'fire-alarm', label: 'Fire Alarm Systems' },
  { id: 'heating', label: 'Low-Level Heating and Controls' },
  { id: 'cost-breakdown', label: 'Cost Breakdown by Nursery Size' },
  { id: 'regulations', label: 'Regulations and Ofsted Requirements' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Nursery Work' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Nursery electrical installation costs £5,000 to £18,000 in 2026 depending on the number of rooms, fire alarm specification, emergency lighting extent, heating controls, and the level of kitchen equipment.',
  'Socket covers (plug-in blanking covers) are NOT recommended by the NHS, the Royal Society for the Prevention of Accidents (RoSPA), or the Department of Health. BS 1363 sockets have built-in shutters that provide adequate child protection.',
  'Fire alarm systems to BS 5839-1 are a legal requirement in nursery premises. The system category (typically L2 or L1) is determined by the fire risk assessment and must cover all areas where children sleep.',
  'Emergency lighting to BS 5266-1 is required in all nursery premises, with particular attention to areas where young children may be sleeping, nappy changing areas, and corridors used for evacuation.',
  'Low-level heating with safe surface temperatures is essential. Panel heaters and underfloor heating are preferred over exposed radiators with hot surfaces. Thermostatic control prevents overheating.',
];

const faqs = [
  {
    question: 'How much does nursery electrical installation cost in 2026?',
    answer:
      'Nursery electrical installation costs £5,000 to £18,000 in 2026. A small nursery (2 to 3 rooms, 20 children) in an existing building requiring power, lighting, fire alarm, and emergency lighting costs £5,000 to £8,000. A medium nursery (4 to 6 rooms, 40 to 60 children) with commercial kitchen, multiple sleep rooms, and full fire alarm costs £8,000 to £13,000. A large purpose-built nursery (8+ rooms, 80+ children) with comprehensive fire alarm, emergency lighting, CCTV, access control, and full kitchen costs £13,000 to £18,000 or more.',
  },
  {
    question: 'Should I install socket covers in a nursery?',
    answer:
      'No. Socket covers (plastic plug-in blanking devices) are NOT recommended by the NHS, RoSPA (Royal Society for the Prevention of Accidents), or the Electrical Safety Council. Modern BS 1363 socket outlets have integral shutters that prevent children from inserting objects into the live and neutral contacts. Socket covers can actually compromise safety — some designs can be inserted incorrectly, defeating the shutter mechanism and exposing live parts. The correct approach is to use standard BS 1363 sockets with functioning shutters, installed at appropriate heights where possible, with 30mA RCD protection per Regulation 411.3.3 of BS 7671.',
  },
  {
    question: 'What fire alarm system does a nursery need?',
    answer:
      'Nurseries require a fire alarm system to BS 5839-1. The system category is determined by the fire risk assessment, but Category L2 (coverage of escape routes plus rooms opening onto escape routes plus high-risk areas) is the most common requirement. In nurseries where children sleep (sleep rooms for babies and toddlers), Category L1 (full coverage of the entire building) may be required by the fire risk assessor. The system should include smoke detectors in all occupied rooms, heat detectors in the kitchen, manual call points at exits, and sounders/visual beacons throughout. An addressable system is recommended for larger nurseries.',
  },
  {
    question: 'What emergency lighting is required in a nursery?',
    answer:
      'Emergency lighting to BS 5266-1 is required in all nursery premises. Self-contained LED emergency fittings with 3-hour duration should illuminate all escape routes, exits, stairways, and areas where children sleep. Sleep rooms require particular attention — staff must be able to safely evacuate sleeping children in a power failure. Illuminated emergency exit signs are required at all exits. A typical 6-room nursery needs 10 to 15 emergency fittings plus exit signs, costing £1,000 to £2,500 installed.',
  },
  {
    question: 'What heating is safe for a nursery?',
    answer:
      'Nursery heating must have safe surface temperatures that will not burn young children. BS EN 60335-2-30 recommends surface temperatures below 75 degrees Celsius for radiators, but nursery guidance typically requires much lower temperatures (below 43 degrees Celsius for surfaces accessible to children). Options include low-surface-temperature (LST) panel heaters (designed for healthcare and childcare settings), underfloor heating (no accessible hot surfaces), and standard radiators with low-surface-temperature guards. Thermostatic controls in each room prevent overheating. Electrical heating costs £300 to £800 per room including the heater, circuit, and thermostat.',
  },
  {
    question: 'Does a nursery need CCTV?',
    answer:
      'CCTV is not a legal requirement for nurseries, but many nurseries install it for safeguarding, security, and parental reassurance. If CCTV is installed, it must comply with the Data Protection Act 2018 and GDPR. Internal cameras in play areas and common areas cost £200 to £400 per camera installed. External cameras for entrance security cost £150 to £350 per camera. A recording system (NVR with 4 to 8 cameras) costs £500 to £1,200. Total CCTV installation for a medium nursery: £2,000 to £5,000.',
  },
  {
    question: 'What Ofsted requirements apply to nursery electrical installations?',
    answer:
      'Ofsted inspects nurseries against the Early Years Foundation Stage (EYFS) framework, which requires that premises and equipment are safe and suitable. Ofsted inspectors will check for a valid Electrical Installation Condition Report (EICR), functioning fire alarm system with regular test records, emergency lighting, socket outlets with functioning shutters (not socket covers), safe heating with no accessible hot surfaces, and adequate lighting levels in all rooms. An up-to-date EICR (maximum 5 years old, or as recommended by the previous report) is essential for Ofsted registration.',
  },
  {
    question: 'How long does a nursery electrical installation take?',
    answer:
      'A nursery electrical installation typically takes 1 to 3 weeks. A small nursery conversion (existing building, basic fit-out) takes 1 to 2 weeks. A medium nursery with full fire alarm, emergency lighting, and kitchen takes 2 to 3 weeks. A large purpose-built nursery can take 3 to 4 weeks for the electrical package. The fire alarm system requires separate commissioning (1 to 2 days) after the main installation is complete. Coordinate with the Ofsted registration timeline — the electrical installation must be complete and certificated before the Ofsted registration visit.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/commercial-rewire-cost',
    title: 'Commercial Rewire Cost',
    description: 'Full commercial electrical installation costs per square metre.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description: 'Distribution board costs for commercial installations.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates for nursery premises.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote nursery electrical work with fire alarm, emergency lighting, and heating.',
    icon: Calculator,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Nursery Electrical Overview',
    content: (
      <>
        <p>
          Nursery electrical installation requires careful consideration of child safety, fire
          protection, emergency provisions, and Ofsted compliance. It is specialist work where
          getting the details right is critical — both for the safety of very young children and for
          the nursery's ability to pass Ofsted registration and ongoing inspections.
        </p>
        <p>
          The electrical installation must support a safe environment for children from birth to 5
          years, including play areas, sleep rooms, nappy changing facilities, a commercial or
          semi-commercial kitchen, staff areas, and secure entry systems. Fire alarm and emergency
          lighting are legal requirements, not optional extras.
        </p>
      </>
    ),
  },
  {
    id: 'child-safety',
    heading: 'Child Safety and Socket Outlets',
    content: (
      <>
        <p>
          Child safety around electrical installations is often misunderstood. The most common
          misconception is that socket covers (plug-in plastic blanking devices) improve safety.
          They do not — and can actually make things worse.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Socket Covers: NOT Recommended</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                The NHS, RoSPA, the Electrical Safety Council, and FatallyFlawed.org.uk all advise
                AGAINST the use of socket covers. They are not a safety device.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                BS 1363 sockets have integral shutters that prevent access to live parts. A child
                cannot insert an object into a single hole — both shutters must be operated
                simultaneously by a plug.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Some socket covers can be inserted upside down, opening the shutter mechanism and
                exposing live contacts — the opposite of the intended safety effect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Socket covers can become choking hazards if removed by children. They are small
                enough to be swallowed by toddlers.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Correct Approach to Socket Safety</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Use standard BS 1363 socket outlets with functioning integral shutters.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Install socket outlets at a higher level (1,200mm to 1,500mm) in rooms used by
                under-3s, where practical.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Ensure all socket circuits have 30mA RCD protection per Regulation 411.3.3 of BS
                7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Keep trailing cables out of reach — use wall-mounted equipment and socket positions
                that minimise cable runs across play areas.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting Requirements',
    content: (
      <>
        <p>
          Emergency lighting is a critical safety provision in nursery premises. In a power failure,
          staff must be able to safely evacuate children — including sleeping babies and toddlers —
          in conditions of adequate illumination.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Emergency Lighting Provision</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Escape routes</strong> — Minimum 1 lux on the centre line of all corridors,
                stairways, and routes to final exits. Self-contained LED fittings with 3-hour
                duration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sleep rooms</strong> — Emergency lighting must provide sufficient
                illumination for staff to identify and safely lift sleeping children from cots.
                Minimum 1 lux at cot level is recommended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nappy changing areas</strong> — Emergency lighting allows staff to safely
                complete nappy changing and remove a child from the changing table during a power
                failure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Exit signs</strong> — Illuminated emergency exit signs at all exits from the
                nursery. Internal exit signs above doors between rooms used for emergency egress.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Emergency lighting for a medium nursery (6 rooms) costs £1,000 to £2,500 installed,
          including self-contained fittings and illuminated exit signs.
        </p>
      </>
    ),
  },
  {
    id: 'fire-alarm',
    heading: 'Fire Alarm Systems',
    content: (
      <>
        <p>
          A fire alarm system to BS 5839-1 is a legal requirement in nursery premises under the
          Regulatory Reform (Fire Safety) Order 2005. The system category is determined by the fire
          risk assessment.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Category L2 (Typical)</h3>
            <p className="text-white text-sm leading-relaxed">
              Coverage of escape routes, rooms opening onto escape routes, and high-risk areas. This
              is the most common requirement for nurseries without sleep rooms. Smoke detectors on
              escape routes, heat detectors in the kitchen, manual call points at exits, sounders
              throughout. Cost: £2,000 to £5,000 for a medium nursery.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Category L1 (Sleep Rooms)</h3>
            <p className="text-white text-sm leading-relaxed">
              Full coverage of the entire building. Required where the fire risk assessment
              identifies sleeping risk — which applies to most nurseries that offer sleep time for
              babies and toddlers. Smoke detectors in every room, heat detectors in the kitchen,
              manual call points, sounders, and visual beacons. Cost: £3,000 to £8,000 for a medium
              nursery.
            </p>
          </div>
        </div>
        <p>
          The fire alarm system requires separate commissioning and a commissioning certificate to
          BS 5839-1. Ongoing weekly testing and annual servicing are mandatory requirements.
        </p>
      </>
    ),
  },
  {
    id: 'heating',
    heading: 'Low-Level Heating and Controls',
    content: (
      <>
        <p>
          Heating in nursery premises must provide comfortable temperatures whilst protecting
          children from burn injuries on hot surfaces. Room temperatures of 18 to 22 degrees Celsius
          are recommended for nursery rooms.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LST panel heaters</strong> — Low-surface-temperature panel heaters (maximum
                43 degrees Celsius surface temperature) designed for healthcare and childcare
                settings. Cost: £200 to £500 per heater installed including dedicated circuit and
                room thermostat. Manufacturers: Stelrad, Dimplex, Creda.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underfloor heating</strong> — Electric underfloor heating mat or cable
                system. No accessible hot surfaces. Cost: £40 to £80 per square metre for the
                heating mat, plus £150 to £300 per room for thermostat and wiring. Particularly
                suitable for baby rooms where children spend time on the floor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Radiator guards</strong> — Where existing hot-water radiators are retained,
                LST radiator guards prevent direct contact with hot surfaces. Guards cost £100 to
                £250 per radiator (not electrical work, but inform the client).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermostatic controls</strong> — Individual room thermostats (£30 to £80
                each installed) allow precise temperature control in each room. Programmable
                thermostats reduce energy costs by lowering temperatures outside nursery hours.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Cost Breakdown by Nursery Size',
    content: (
      <>
        <p>Here are realistic total electrical installation costs for nurseries in 2026:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small nursery, 2 to 3 rooms (£5,000 to £8,000)</strong> — Consumer unit,
                power and lighting circuits, basic L2 fire alarm, emergency lighting, kitchen power
                (semi-commercial), entry intercom, socket outlets at raised height in children's
                rooms. 1 to 2 weeks installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium nursery, 4 to 6 rooms (£8,000 to £13,000)</strong> — Distribution
                board with RCBOs and SPD, L1 or L2 fire alarm with addressable panel, full emergency
                lighting, commercial kitchen power, LST heating and controls, CCTV provisions,
                access control wiring, outdoor play area lighting. 2 to 3 weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large nursery, 8+ rooms (£13,000 to £18,000+)</strong> — Full 3-phase
                distribution, L1 addressable fire alarm, comprehensive emergency lighting, full
                commercial kitchen, LST heating throughout with BMS, CCTV system, access control,
                outdoor lighting and power, PA system, sensory room wiring. 3 to 4 weeks.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Quote nursery electrical with fire safety provisions"
          description="Elec-Mate's quoting app handles fire alarm systems, emergency lighting, LST heating, and Ofsted-compliant electrical specifications. Professional PDF quotes for nursery fit-outs."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and Ofsted Requirements',
    content: (
      <>
        <p>
          Nursery electrical installations must comply with BS 7671 and meet the expectations of
          both fire safety legislation and Ofsted registration requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671:2018+A3:2024</strong> — Full compliance required. RCD protection per
                Regulation 411.3.3 on all socket outlets. An EIC must be issued on completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulatory Reform (Fire Safety) Order 2005</strong> — Fire alarm and
                emergency lighting are mandatory. The fire risk assessment determines the specific
                requirements. Regular testing and maintenance records must be kept.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ofsted EYFS framework</strong> — Premises must be safe and suitable. Ofsted
                inspectors check for valid EIC/EICR, functioning fire alarm and emergency lighting,
                safe heating, appropriate socket provision, and no socket covers. Maintenance
                records and test logs are reviewed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations</strong> — Part P applies if the nursery is in a
                domestic building conversion. Part B (fire safety) applies to all nursery premises.
                Fire alarm and emergency lighting must satisfy the Building Regulations as well as
                BS 5839-1 and BS 5266-1.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Nursery Work',
    content: (
      <>
        <p>
          Nursery electrical work is specialist commercial work with clear regulatory requirements.
          Here are practical tips for quoting:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Baby className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Check the Fire Risk Assessment</h4>
                <p className="text-white text-sm leading-relaxed">
                  The fire risk assessment determines the fire alarm category and emergency lighting
                  requirements. If the nursery does not have a fire risk assessment, advise them to
                  commission one before you quote — otherwise you are guessing the fire alarm
                  specification.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Flame className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Include Fire Alarm Commissioning</h4>
                <p className="text-white text-sm leading-relaxed">
                  Fire alarm commissioning to BS 5839-1 requires a separate certificate and zone
                  plan. Budget 1 to 2 days for commissioning a medium nursery system. Include this
                  in your quote — it is often forgotten and causes disputes at handover.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Ofsted-Ready Documentation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Provide a comprehensive{' '}
                  <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink>, fire alarm
                  commissioning certificate, emergency lighting commissioning certificate, and a
                  summary document listing all safety provisions. This helps the nursery pass Ofsted
                  registration and is a strong selling point for your quote.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote nursery fit-outs with Ofsted compliance"
          description="Elec-Mate's quoting app handles nursery electrical work with fire alarm, emergency lighting, LST heating, and Ofsted-compliant documentation. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NurseryElectricalCostPage() {
  return (
    <GuideTemplate
      title="Nursery Electrical Cost 2026 | UK Childcare Premises Guide"
      description="How much does nursery electrical installation cost in 2026? UK guide covering child safety, fire alarm, emergency lighting, LST heating, Ofsted requirements, and realistic costs from £5,000 to £18,000."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Nursery Electrical Cost:{' '}
          <span className="text-yellow-400">UK Childcare Premises Guide 2026</span>
        </>
      }
      heroSubtitle="What does nursery electrical installation cost? This guide covers child safety provisions, fire alarm systems, emergency lighting, low-surface-temperature heating, Ofsted requirements, and realistic pricing from £5,000 to £18,000 — for nursery owners and electrical contractors."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Nursery Electrical Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Nursery Electrical with Fire Safety and Ofsted Compliance"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for nursery quoting with fire alarm specifications, emergency lighting, and Ofsted-ready documentation. 7-day free trial."
    />
  );
}
