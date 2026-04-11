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
  Cable,
  Flame,
  Bell,
  Home,
  Building,
  ClipboardCheck,
  Wrench,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Fire Alarm Installation Cost', href: '/guides/fire-alarm-installation-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Fire Alarm Installation Overview' },
  { id: 'domestic-vs-commercial', label: 'Domestic vs Commercial Systems' },
  { id: 'domestic-grades', label: 'Domestic Grades: LD1, LD2, LD3' },
  { id: 'material-costs', label: 'Material Costs Breakdown' },
  { id: 'labour-costs', label: 'Labour and Installation Costs' },
  { id: 'total-costs', label: 'Total Costs by System Type' },
  { id: 'bs5839', label: 'BS 5839 Requirements' },
  { id: 'certification', label: 'Certification and Testing' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Fire Alarm Work' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Domestic fire alarm installation costs range from £250 for a basic LD3 system (smoke alarms in escape routes only) to £2,000+ for a comprehensive LD1 system with detectors in every habitable room.',
  'BS 5839 Part 6 covers domestic fire detection and alarm systems (houses, flats, HMOs). BS 5839 Part 1 covers commercial and non-domestic premises.',
  'Since June 2022, all new-build homes in England must have interlinked smoke alarms on every storey, with heat alarms in kitchens — complying with a minimum of LD2 under BS 5839 Part 6.',
  'Regulation 421.1 of BS 7671 requires fire-resistant wiring for fire alarm circuits in multi-storey residential buildings, and physical segregation of fire alarm circuits from general power and lighting.',
  'A fire alarm certificate must be issued after every installation, confirming compliance with BS 5839. Elec-Mate supports fire alarm certification on mobile.',
];

const faqs = [
  {
    question: 'How much does a domestic fire alarm system cost in 2026?',
    answer:
      'A domestic fire alarm system in 2026 costs between £250 and £2,000 depending on the grade and coverage. A basic LD3 system (interlinked alarms in escape routes only) for a typical 3-bedroom house costs £250 to £500. An LD2 system (escape routes plus high-risk rooms) costs £500 to £1,000. A comprehensive LD1 system (every habitable room) costs £1,000 to £2,000. These prices include materials, labour, testing, and certification.',
  },
  {
    question: 'What is the difference between LD1, LD2, and LD3?',
    answer:
      'These are grades defined in BS 5839 Part 6 for domestic fire detection systems. LD3 provides the minimum protection — smoke detectors in escape routes (hallways and landings) only. LD2 adds detectors in all rooms or areas that open onto escape routes and all high-risk rooms (kitchen and living room are typical high-risk rooms). LD1 provides comprehensive coverage with detectors in every habitable room including bedrooms, living areas, and circulation spaces. Higher grades provide earlier detection and more time for occupants to escape. LD2 is now the minimum requirement for new-build homes in England since the 2022 Building Regulations changes. Scotland requires LD2 in all homes regardless of tenure, with the additional requirement of a detector in the principal bedroom.',
  },
  {
    question: 'Do fire alarm circuits need fire-resistant cable?',
    answer:
      'For hardwired fire alarm systems in multi-storey residential buildings, BS 7671 Regulation 421.1 requires fire-resistant fixed wiring to maintain the supply to fire detection circuits during a specified fire exposure period. FP200 Gold or equivalent fire-resistant cable is the standard choice. The cable must also be physically and electrically segregated from general power and lighting circuits as required by Regulation 421.1. For simple domestic installations in single-family dwellings with mains-powered interlinked smoke alarms, standard PVC cable is acceptable as the detection devices have built-in battery backup.',
  },
  {
    question: 'Are interlinked smoke alarms a legal requirement?',
    answer:
      'In England, since June 2022, all new-build homes must have interlinked smoke alarms on every storey with a heat alarm in the kitchen. For rented properties (since October 2022), at least one smoke alarm must be installed on each storey and a carbon monoxide alarm in rooms with a fixed combustion appliance. Scotland has the most stringent requirements — since February 2022, all homes (regardless of tenure) must have interlinked fire detection meeting at least LD2 standard. Wales and Northern Ireland have their own requirements. Interlinking means that when one alarm activates, all alarms in the property sound simultaneously.',
  },
  {
    question: 'Conventional vs addressable fire alarm — which should I recommend?',
    answer:
      'For domestic installations and small commercial premises (under 10 zones), conventional fire alarm systems are the standard choice. They are simpler to install, maintain, and cost less. Each detection zone is wired as a circuit and the panel identifies which zone has activated, but not which specific detector. For larger commercial premises, addressable systems allow each detector to have a unique address — the panel identifies the exact location of activation, which is essential for rapid response in large buildings. Addressable systems cost 2 to 3 times more per point but offer superior diagnostics and maintenance capabilities.',
  },
  {
    question: 'How often do fire alarms need testing?',
    answer:
      'BS 5839 Part 1 (commercial) requires weekly testing of the alarm function (by activating a different call point each week, cycling through all call points over a year). Every 6 months, the system should be inspected and serviced by a competent fire alarm engineer. For domestic systems under BS 5839 Part 6, the householder should test each alarm monthly using the test button. Battery-only alarms should have batteries replaced annually. Mains-powered alarms with battery backup should be checked to confirm the mains supply is live and the battery backup is functional.',
  },
  {
    question: 'Can I install wireless fire alarms instead of hardwired?',
    answer:
      'Yes, wireless interlinked fire alarms are a practical alternative for retrofit installations where running new cables is difficult or disruptive. Modern wireless systems use radio frequency communication to interlink all detectors — when one activates, all sound. The reliability of wireless interlinking has improved significantly and many systems are now approved to BS 5839 Part 6. However, wireless alarms rely on battery power and require regular battery replacement or recharging. For new-build installations where cables can be run during construction, hardwired systems with battery backup are preferred as they provide continuous mains power with automatic failover.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/bs5839-fire-alarm-standard',
    title: 'BS 5839 Fire Alarm Standard',
    description:
      'Complete guide to BS 5839 Part 1 and Part 6, including system categories and grades.',
    icon: Flame,
    category: 'Guide',
  },
  {
    href: '/guides/smoke-alarm-regs',
    title: 'Smoke Alarm Regulations UK',
    description:
      'Current smoke and heat alarm requirements for new builds, rentals, and existing homes.',
    icon: Bell,
    category: 'Guide',
  },
  {
    href: '/tools/fire-alarm-certificate',
    title: 'Fire Alarm Certificate App',
    description: 'Complete fire alarm installation and commissioning certificates on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/fp200-cable-guide',
    title: 'FP200 Cable Guide',
    description:
      'Selection and installation guide for fire-resistant cable in fire alarm circuits.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Quote fire alarm installations with itemised detectors, cable, panels, and labour.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/hmo-electrical-requirements',
    title: 'HMO Electrical Requirements',
    description:
      'Fire alarm requirements are most stringent for HMOs — understand the full compliance picture.',
    icon: Building,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Fire Alarm Installation: What It Costs and Why It Matters',
    content: (
      <>
        <p>
          Fire alarm installation is life safety work. Getting it right means people get out alive.
          Getting it wrong — or not doing it at all — has consequences that go far beyond a failed
          inspection. This guide covers the real costs of fire alarm installation in the UK in 2026,
          from simple domestic interlinked smoke alarms to full commercial addressable systems.
        </p>
        <p>
          The regulatory landscape has tightened significantly in recent years. The 2022 Building
          Regulations changes in England now require all new homes to have interlinked detection
          meeting at least LD2 standard. Scotland went further, requiring all homes (new and
          existing) to meet LD2. Landlord obligations have expanded. HMOs have always had the most
          stringent requirements, and non-compliance carries serious criminal penalties.
        </p>
        <p>
          For electricians, fire alarm work is a growing and profitable specialism. The combination
          of regulatory pressure, new-build requirements, and retrofit demand means there is no
          shortage of work. But you need to understand{' '}
          <SEOInternalLink href="/guides/bs5839-fire-alarm-standard">BS 5839</SEOInternalLink> (both
          Part 1 for commercial and Part 6 for domestic), the wiring requirements under BS 7671, and
          how to certify the work correctly.
        </p>
      </>
    ),
  },
  {
    id: 'domestic-vs-commercial',
    heading: 'Domestic vs Commercial Fire Alarm Systems',
    content: (
      <>
        <p>
          The approach to fire alarm installation differs fundamentally between domestic and
          commercial premises, both in the applicable standards and the system complexity.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Domestic (BS 5839 Part 6)</h3>
            <p className="text-white text-sm leading-relaxed">
              Covers houses, flats, and HMOs. Systems range from standalone battery smoke alarms to
              fully hardwired interlinked systems with mains power and battery backup. Grades LD1,
              LD2, and LD3 define the coverage level. Detection is typically by optical smoke
              detectors in circulation spaces and heat detectors in kitchens. The system alerts
              occupants to evacuate — there is no control panel in the simplest systems.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial (BS 5839 Part 1)</h3>
            <p className="text-white text-sm leading-relaxed">
              Covers all non-domestic premises including offices, shops, factories, hotels, and care
              homes. Systems are either conventional (zone-based) or addressable (individual device
              identification). Categories L1 to L5 and M define protection levels. A control panel
              is always required, typically with zone indicators, fault monitoring, and connection
              to alarm sounders and call points. Larger systems interface with fire brigade
              automatic alarm transmission.
            </p>
          </div>
        </div>
        <p>
          The cost difference is substantial. A domestic system for a 3-bedroom house might cost
          £300 to £1,000. A commercial system for a small office might cost £2,000 to £5,000. A
          large commercial addressable system for a hotel or care home can cost £10,000 to £50,000
          or more.
        </p>
      </>
    ),
  },
  {
    id: 'domestic-grades',
    heading: 'Domestic Fire Alarm Grades: LD1, LD2, and LD3',
    content: (
      <>
        <p>
          BS 5839 Part 6 defines three grades of domestic fire detection. Understanding these grades
          is essential for quoting domestic fire alarm work correctly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LD3 — Escape route protection</strong> — smoke detectors in all circulation
                spaces forming part of escape routes (hallways, landings, stairwells). This is the
                minimum acceptable level and provides warning when smoke has reached the escape
                route. Suitable for existing homes where full coverage is not required by
                regulation. For a typical 3-bedroom, 2-storey house: 2 to 3 smoke detectors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>LD2 — Escape routes plus high-risk rooms</strong> — all LD3 coverage plus
                detectors in rooms that present a higher fire risk or rooms where fire could block
                escape. This typically adds the kitchen (heat detector), living room, principal
                bedroom, and any room opening directly onto the escape route. Now the minimum
                standard for all new-build homes in England and all homes in Scotland. For a typical
                3-bedroom house: 5 to 7 detectors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>LD1 — Comprehensive coverage</strong> — detectors in all areas of the
                dwelling including every habitable room, every circulation space, and storage areas
                exceeding 1m2. This provides the earliest possible detection regardless of fire
                origin. Recommended for HMOs, supported housing, and properties occupied by
                vulnerable persons. For a typical 3-bedroom house: 8 to 12 detectors.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When quoting, always confirm the required grade with reference to the applicable Building
          Regulations, the risk assessment for the property, and any requirements from the fire
          authority or landlord licensing conditions.
        </p>
      </>
    ),
  },
  {
    id: 'material-costs',
    heading: 'Material Costs Breakdown',
    content: (
      <>
        <p>
          Fire alarm material costs vary significantly depending on whether the system is domestic
          or commercial, mains-powered or battery, and wired or wireless.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Domestic System Components</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mains-powered interlinked smoke detector</strong> — £20 to £45 each. Optical
                smoke detection with built-in rechargeable battery backup. Aico, Kidde, and
                FireAngel are the leading UK brands.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mains-powered heat detector</strong> — £20 to £40 each. Fixed temperature or
                rate-of-rise detection (trade prices from £22.75 for Activ series heat detectors).
                Used in kitchens where smoke detectors would cause nuisance alarms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wireless interlinked smoke alarm</strong> — £30 to £70 each. Battery-powered
                with radio-frequency interlinking. Higher unit cost but no cable installation
                required — ideal for retrofit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable (for hardwired systems)</strong> — 1.5mm2 fire-resistant cable (FP200
                or equivalent): £1.50 to £3.00 per metre. A typical domestic installation requires
                20 to 40 metres. Dedicated fused connection unit marked "Smoke Detector": £16 to £24
                trade (Crabtree/Volex).
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Commercial System Components</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conventional fire alarm panel (2 to 8 zone)</strong> — £150 to £500. The
                central control unit that monitors all detection zones and activates sounders.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Addressable fire alarm panel</strong> — £500 to £3,000+ depending on loop
                capacity. Each device has a unique address for precise location identification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Detectors and call points</strong> — £15 to £50 each for conventional, £30
                to £100 each for addressable. Plus detector bases at £3 to £15 each.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sounders and beacons</strong> — £20 to £80 each. Wall-mounted or
                ceiling-mounted alarm sounders, with visual beacons for areas with high ambient
                noise or for hearing-impaired occupants.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'labour-costs',
    heading: 'Labour and Installation Costs',
    content: (
      <>
        <p>
          Labour costs depend heavily on the system type and the building construction. Hardwired
          installations in existing buildings require cable routing through walls, floors, and
          ceilings — which is significantly more labour-intensive than new-build first-fix.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic hardwired (retrofit)</strong> — £150 to £400 for a typical LD2
                installation with 5 to 7 detectors. Includes cable routing, detector mounting,
                connection to a dedicated fused spur, testing, and certification. Allow 3 to 6
                hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic wireless (retrofit)</strong> — £100 to £250 for a typical LD2
                installation. Faster installation as no cables to route. Mount detectors, configure
                interlinking, test, and certify. Allow 2 to 3 hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial conventional (small office/shop)</strong> — £800 to £2,000 for a
                system with 10 to 20 detection points. Panel installation, zone wiring in
                fire-resistant cable, detector and call point installation, sounder installation,
                commissioning, and certification. Allow 2 to 4 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial addressable (larger premises)</strong> — £2,000 to £10,000+ for
                labour depending on the number of devices, building complexity, and integration
                requirements. Allow 1 to 4 weeks for larger projects.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'total-costs',
    heading: 'Total Fire Alarm Installation Costs by System Type',
    content: (
      <>
        <p>
          Here are realistic total costs for fire alarm installations in 2026, covering all
          materials, labour, testing, and certification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic LD3 (escape routes only)</strong> — £250 to £500 total. 2 to 3
                interlinked smoke detectors, cable or wireless, testing, and certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic LD2 (escape routes plus high-risk rooms)</strong> — £500 to £1,000
                total. 5 to 7 detectors (smoke and heat), mains-powered with battery backup,
                hardwired or wireless interlinked. The current standard for new builds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic LD1 (comprehensive coverage)</strong> — £1,000 to £2,000 total. 8
                to 12 detectors covering every habitable room, hardwired with fire-resistant cable.
                Required for many HMOs and supported housing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial conventional (small premises)</strong> — £2,000 to £5,000 total.
                Control panel, 10 to 20 detection points, call points, sounders, fire-resistant
                wiring, commissioning, and certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial addressable (medium premises)</strong> — £5,000 to £15,000+
                total. Addressable panel, 30 to 100+ devices, loop wiring, integration with building
                systems, and full BS 5839 Part 1 commissioning.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Quote fire alarm installations accurately"
          description="Elec-Mate's quoting app helps you itemise every detector, call point, cable run, and panel. Build professional quotes for domestic and commercial fire alarm work with real pricing data."
          icon={Flame}
        />
      </>
    ),
  },
  {
    id: 'bs5839',
    heading: 'BS 5839: The Fire Detection and Alarm Standard',
    content: (
      <>
        <p>
          BS 5839 is the British Standard for fire detection and fire alarm systems. It is published
          in two main parts relevant to electrical contractors:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Part 1: Non-Domestic Premises</h3>
            <p className="text-white text-sm leading-relaxed">
              Covers the design, installation, commissioning, and maintenance of fire detection and
              alarm systems in all non-domestic buildings. Defines system categories: L1 to L5 (life
              protection) and M (manual system — call points only with no automatic detection).
              Specifies requirements for control panels, detection, alarming, wiring, power
              supplies, and interfacing with other fire safety systems.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Part 6: Domestic Premises</h3>
            <p className="text-white text-sm leading-relaxed">
              Covers fire detection and alarm systems in dwellings including houses, flats, and
              HMOs. Defines grades LD1, LD2, and LD3. Specifies types of system from Grade A
              (hardwired system with panel) through Grade F (battery-powered standalone alarms).
              Provides guidance on detector selection, positioning, interlinking, power supplies,
              and maintenance.
            </p>
          </div>
        </div>
        <p>
          In addition to BS 5839, BS 7671 contains requirements that affect fire alarm wiring.
          Regulation 421.1 requires fire-resistant wiring for fire alarm circuits in multi-storey
          residential buildings to maintain supply during fire. Regulation 421.1 also requires
          physical and electrical segregation of fire alarm circuits from general power and lighting
          in commercial premises to prevent interference and maintain alarm operation during faults.
          Regulation 133.2 requires identification of circuits powered by safety or standby sources,
          including fire alarm and emergency lighting circuits.
        </p>
      </>
    ),
  },
  {
    id: 'certification',
    heading: 'Certification and Testing Requirements',
    content: (
      <>
        <p>
          Every fire alarm installation must be certified. The certification requirements differ
          between domestic and commercial systems:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic systems</strong> — a fire alarm installation certificate confirming
                compliance with BS 5839 Part 6 and the grade achieved (LD1, LD2, or LD3). The
                electrical wiring also requires an EIC or Minor Works Certificate under BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial systems</strong> — a BS 5839 Part 1 commissioning certificate
                including system verification, zone testing, sounder level measurements, and cause
                and effect testing. A full set of as-built drawings and zone charts must be
                provided.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing</strong> — every detection device must be functionally tested to
                confirm it activates the alarm. Sound pressure levels must be measured to confirm
                adequate audibility in all occupied areas. Wiring must be tested for continuity,
                insulation resistance, and earth fault loop impedance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate supports{' '}
          <SEOInternalLink href="/tools/fire-alarm-certificate">
            fire alarm certification
          </SEOInternalLink>{' '}
          on mobile — complete the installation details, system design, test schedule, declarations,
          and generate a professional PDF certificate on site.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Fire Alarm Work',
    content: (
      <>
        <p>
          Fire alarm installation is specialist work that commands premium rates. The regulatory
          requirements are strict, the consequences of poor installation are serious, and customers
          (especially landlords and commercial property managers) understand that they are paying
          for compliance and life safety — not just a few smoke detectors.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Cost Engineer</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build itemised quotes for fire alarm installations. Detectors, call points,
                  cable, panel, sounders, labour, testing, and certification — all itemised with
                  your margins. Professional PDF quotes that win work.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Fire Alarm Certificate</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete{' '}
                  <SEOInternalLink href="/tools/fire-alarm-certificate">
                    fire alarm certificates
                  </SEOInternalLink>{' '}
                  on your phone. Installation details, system design, detection layout, test
                  schedule, and declarations — all in the app. PDF export on site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, install, and certify fire alarm systems"
          description="Join 1,000+ UK electricians using Elec-Mate for professional quoting, fire alarm certification, and on-site documentation. 7-day free trial."
          icon={Flame}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FireAlarmInstallationCostPage() {
  return (
    <GuideTemplate
      title="Fire Alarm Installation Cost UK 2026 | System Pricing Guide"
      description="How much does fire alarm installation cost in 2026? Complete UK pricing guide covering domestic LD1/LD2/LD3 grades, commercial conventional and addressable systems, BS 5839 requirements, material costs, and certification."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={Flame}
      heroTitle={
        <>
          Fire Alarm Installation Cost:{' '}
          <span className="text-yellow-400">UK System Pricing Guide 2026</span>
        </>
      }
      heroSubtitle="From domestic smoke alarms to full commercial addressable systems — this guide covers every cost element of fire alarm installation. Material prices, labour rates, BS 5839 grades, and certification requirements for electricians and property owners."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Fire Alarm Installation Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Fire Alarm Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for fire alarm quoting, certification, and on-site documentation. Professional results, every time. 7-day free trial, cancel anytime."
    />
  );
}
