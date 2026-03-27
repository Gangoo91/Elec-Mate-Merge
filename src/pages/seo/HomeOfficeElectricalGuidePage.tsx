import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  AlertTriangle,
  PoundSterling,
  Home,
  Zap,
  ShieldCheck,
  Monitor,
  Wifi,
  Sun,
  Car,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/kitchen-electrical-requirements' },
  { label: 'Home Office Electrical Guide', href: '/home-office-electrical-guide' },
];

const tocItems = [
  { id: 'dedicated-circuit', label: 'Dedicated Circuit for Home Office' },
  { id: 'data-points', label: 'Data Point Installation' },
  { id: 'lighting-design', label: 'Lighting Design for Home Working' },
  { id: 'ev-charging', label: 'EV Charging from Home Office Circuit' },
  { id: 'garden-office', label: 'Garden Office Electrical Supply' },
  { id: 'planning-permission', label: 'Planning Permission for Garden Office' },
  { id: 'ups-protection', label: 'UPS for Computer Protection' },
  { id: 'expense-claims', label: 'Expense Claims for Electrical Work' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A dedicated radial or ring circuit for a home office is strongly recommended where high-load equipment (laser printers, workstations, NAS drives, monitors) is in regular use. A 20A radial circuit on 2.5mm T&E is typically appropriate for most home offices.',
  'Data cabling (Cat6 or Cat6A) installed at the same time as electrical work avoids the need for surface-mounted trunking later. Structured cabling installed in conduit provides flexibility for future upgrades without replastering.',
  'Lighting for a home office should achieve a minimum of 300 lux at the working plane per BS EN 12464-1, with task lighting to supplement general lighting. Colour temperature of 4000K (cool white) is recommended for focus and alertness.',
  'An external garden office requires a separate circuit from the main dwelling, typically using SWA (steel wire armoured) cable buried at 600mm depth. All circuits in a garden office must have 30mA RCD protection.',
  'A domestic UPS (Uninterruptible Power Supply) protects computers and network equipment from momentary power interruptions and voltage fluctuations. For a home business, equipment loss from a single power event can exceed the cost of UPS protection many times over.',
];

const faqs = [
  {
    question: 'Do I need a dedicated circuit for my home office?',
    answer:
      'There is no legal requirement to have a dedicated circuit for a home office, but it is strongly recommended where the office contains high-load equipment. A typical home office with a workstation, dual monitors, laser printer, NAS drive, and network equipment can draw 1,000 to 2,000W under load. Running this alongside other household loads on a shared ring circuit is unlikely to cause tripping, but a dedicated circuit provides cleaner power, reduces risk of nuisance tripping, and ensures the office has its own isolation point. A 20A radial circuit on 2.5mm T&E is the most common solution.',
  },
  {
    question: 'What data cabling should I install in a home office?',
    answer:
      'Cat6 is the minimum recommended for a new home office installation in 2026. Cat6 supports 10 Gigabit Ethernet at distances up to 55 metres, which is more than sufficient for home use. Cat6A (augmented) supports 10 Gigabit at up to 100 metres and is future-proof for higher bandwidth applications. Install more data points than you think you need — two points per desk position is a minimum, with additional points for access points, smart TVs, and network equipment. Cabling should be installed in conduit where possible to allow future replacement without replastering.',
  },
  {
    question: 'Can I claim tax relief on electrical work done for a home office?',
    answer:
      'The tax position on home office electrical work depends on your employment status. Self-employed individuals can claim a proportion of home running costs including electricity as a business expense, but capital expenditure (such as rewiring a room or installing a dedicated circuit) is treated as capital expenditure and may be subject to capital allowances rather than an immediate expense deduction. Employed individuals working from home cannot claim capital expenditure on home electrical work. Consult a qualified accountant before making any claim — HMRC rules on home office expenses are complex and frequently updated.',
  },
  {
    question: 'Do I need planning permission for a garden office with electrical supply?',
    answer:
      'The garden office structure itself usually falls within permitted development rights for domestic properties — provided it is no more than 2.5 metres high (if within 2 metres of a boundary), does not cover more than 50 per cent of the garden, and is not used as a separate dwelling. However, the electrical installation (sub-main from the house, buried SWA cable, consumer unit in the outbuilding) always requires notification under Part P of the Building Regulations, regardless of permitted development status. Listed buildings and properties in Conservation Areas have additional restrictions.',
  },
  {
    question: 'What size cable do I need to run electricity to a garden office?',
    answer:
      'The cable size depends on the load in the garden office and the length of the run. For a typical garden office with lighting, socket circuits, and a heater, a 6mm SWA (steel wire armoured) cable from the main consumer unit in the house is usually appropriate. The cable must be buried at a depth of at least 600mm in soft ground (450mm under a path or drive with suitable protection) or run in conduit. At the garden office end, a sub-consumer unit with its own RCD protection is required. All circuits in the garden office must have 30mA RCD protection under Regulation 411.3.3 of BS 7671.',
  },
  {
    question: 'What is a UPS and do I need one for my home office?',
    answer:
      'A UPS (Uninterruptible Power Supply) is a battery-backed power device that maintains supply to connected equipment during a mains power interruption. For a home office, a line-interactive UPS with a capacity of 1,000 to 1,500VA is appropriate for protecting a workstation, monitors, and network switch. The battery runtime is typically 10 to 30 minutes — long enough to save work and shut down gracefully. A UPS also conditions incoming mains power, filtering out voltage spikes and sags that can damage sensitive electronics. For a home business where downtime has a direct cost, a UPS is a sensible investment at £100 to £300.',
  },
  {
    question: 'What lighting level do I need in a home office?',
    answer:
      'BS EN 12464-1 recommends a maintained illuminance of 300 to 500 lux at the working plane for office tasks. A typical living room or bedroom converted to a home office often provides only 100 to 150 lux from existing ceiling lights — insufficient for sustained desk work. Supplement general lighting with a desk lamp providing 500 lux at the working surface. Avoid placing the monitor where it reflects overhead lighting (typical glare angle is 30 to 45 degrees above horizontal). Use a colour temperature of 4000K (cool white) for focus; avoid warm white (2700K) during working hours as it promotes drowsiness.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/kitchen-electrical-requirements',
    title: 'Kitchen Electrical Requirements',
    description: 'Zone requirements, socket positions, cooker circuits, and Part P compliance for kitchens.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/new-home-electrical-checklist',
    title: 'New Home Electrical Checklist',
    description: 'Things to do when moving into a new property — RCD tests, smoke detectors, meter registration.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/electrical-issues-house-value',
    title: 'How Electrical Issues Affect House Value',
    description: 'How rewires and electrical defects affect property value and mortgage lending.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'dedicated-circuit',
    heading: 'Dedicated Circuit for a Home Office',
    content: (
      <>
        <p>
          A home office draws significantly more power than a typical domestic room. A workstation,
          dual monitors, a laser printer, a NAS drive, a network switch, and supplementary lighting
          can collectively draw 1,500 to 2,500W under full load. While this load is within the
          capacity of a standard ring circuit, a dedicated circuit provides several practical advantages.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recommended circuit specification</strong> — a 20A radial circuit on
                2.5mm² twin and earth (T&amp;E) cable, protected by a 20A MCB and a 30mA
                RCBO. This provides a dedicated, isolated supply with 4.6kW capacity — more than
                sufficient for all typical home office equipment combined.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Number of sockets</strong> — install more sockets than you currently need.
                Six to eight double socket outlets per desk position is a reasonable target for a
                well-equipped office. Sockets at desk height (approximately 900mm from floor) or
                in a floor box reduce cable clutter. Avoid reliance on extension leads for
                permanent installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>USB-A and USB-C outlets</strong> — twin-USB socket outlets allow direct
                charging of phones, tablets, and peripherals without occupying standard socket
                positions. USB-C PD outlets (delivering 20W or more) are useful where laptops
                are used without their standard charger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switched spur for printer or server</strong> — a fused connection unit
                (FCU) with a local switch allows high-load equipment such as a laser printer or
                small server to be completely isolated when not in use, without having to access
                the consumer unit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All electrical work in a home office constitutes notifiable work under Part P of the
          Building Regulations. Use a registered competent person (NICEIC, NAPIT, or ELECSA)
          to ensure proper certification and building control notification.
        </p>
      </>
    ),
  },
  {
    id: 'data-points',
    heading: 'Data Point Installation for a Home Office',
    content: (
      <>
        <p>
          Structured data cabling installed at the same time as electrical work provides reliable,
          low-latency network connectivity that Wi-Fi cannot match for video conferencing, large
          file transfers, and cloud backup. Installing data cabling as first-fix work (before
          plastering) is far more cost-effective than retrofitting surface-mounted trunking later.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cat6 as a minimum</strong> — Cat6 supports 1 Gigabit Ethernet at all
                practical home distances and 10 Gigabit up to approximately 55 metres. For most
                home offices in 2026, Cat6 is entirely sufficient. Cat6A (augmented) provides
                10 Gigabit at up to 100 metres and is future-proof.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two data points per desk position</strong> — install a minimum of two
                data outlets per working position: one for the workstation and one for a second
                device or access point. Additional points for a monitor, NAS device, or VoIP
                phone are useful.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conduit for future-proofing</strong> — run data cable in conduit where
                possible. This allows cables to be pulled out and replaced as standards evolve
                (Cat8, optical fibre) without replastering. Conduit adds modest cost but
                significant long-term value.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Central patch panel</strong> — running all data cables back to a central
                patch panel (typically located near the consumer unit or in a hallway cupboard)
                gives maximum flexibility for network configuration. Each point can be patched
                to the router, a switch, or left unused.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'lighting-design',
    heading: 'Lighting Design for Home Working',
    content: (
      <>
        <p>
          Lighting quality has a measurable effect on productivity, eye strain, and alertness.
          A home office converted from a bedroom or reception room typically has insufficient
          lighting for sustained desk work without modifications.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Monitor className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Target illuminance</strong> — BS EN 12464-1 (Light and Lighting —
                Lighting of Work Places — Indoor Work Places) recommends a maintained
                illuminance of 300 lux for general office tasks (reading, writing) and
                500 lux for detailed visual tasks. Measure existing light levels with a
                free lux meter app to understand what you are starting with.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Monitor className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>General lighting</strong> — ceiling LED downlights are the most
                common solution. A 4W to 6W LED downlight delivers approximately 400 to
                600 lumens. For a 3m × 3m office, four to six downlights provide adequate
                general illuminance. Install on a dimmer to allow adjustment throughout
                the day.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Monitor className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Colour temperature</strong> — use 4000K (cool white) during working
                hours. Avoid 2700K (warm white) in a home office as it promotes relaxation
                rather than focus. Tunable white LED systems that shift colour temperature
                from warm in the morning to cool during peak working hours are available
                at modest cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Monitor className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Avoiding screen glare</strong> — position lights so they do not
                reflect directly off monitor screens. The critical zone is 30 to 45 degrees
                above the horizontal viewing angle. Downlights positioned directly above
                the desk are most problematic; side-mounted lighting or uplighting reduces
                direct screen reflection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ev-charging',
    heading: 'EV Charging from a Home Office Circuit',
    content: (
      <>
        <p>
          Running an EV charger from a home office circuit is occasionally considered where the
          office is close to the driveway or garage. In practice, this is rarely the right
          approach.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why a dedicated EV circuit is required</strong> — a 7kW home EV charger
                draws approximately 30A continuously. This exceeds the capacity of a standard
                home office radial circuit. An EV charger requires its own dedicated 32A radial
                circuit protected by a Type B RCBO (required for DC fault protection where no
                in-built DC detection is present) under the OZEV (Office for Zero Emission
                Vehicles) grant conditions and BS 7671 Section 722.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV grant eligibility</strong> — the Electric Vehicle Chargepoint Grant
                for renters and flat owners (and certain home installations) requires the charger
                to be installed by an OZEV-authorised installer. The installation must include
                appropriate protective devices and cable management. A separate dedicated circuit
                is a condition of grant eligibility.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart charging</strong> — a smart EV charger (required for any OZEV
                grant) allows scheduled charging at off-peak tariff times (typically overnight
                on Octopus Energy's Intelligent Tariff or similar). This significantly reduces
                charging costs and avoids daytime load coinciding with office equipment use.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An EV charger installation is notifiable under Part P of the Building Regulations.
          Use an OZEV-registered installer to ensure grant eligibility, correct protection,
          and proper certification.
        </p>
      </>
    ),
  },
  {
    id: 'garden-office',
    heading: 'Electrical Supply to a Garden Office',
    content: (
      <>
        <p>
          A garden office with electrical supply is one of the most popular home improvement
          projects in the post-pandemic era. The electrical installation requires careful planning
          to ensure safety, compliance, and sufficient capacity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sub-main cable</strong> — for a typical garden office with lighting,
                sockets, and a 2kW heater, 6mm² SWA (steel wire armoured) cable from the main
                dwelling consumer unit is appropriate. Longer runs or higher loads require larger
                cable — calculate volt drop in accordance with BS 7671 Section 525 to confirm.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burial depth</strong> — SWA cable must be buried at a minimum depth of
                600mm in garden areas (450mm under driveways and paths with suitable protection).
                Mark the route with cable protection tiles or warning tape at 150mm above the
                cable. Keep a record of the cable route with photographs taken before backfilling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Garden office consumer unit</strong> — the garden office must have its
                own consumer unit with a main switch and individual circuit breakers. All circuits
                must be protected by 30mA RCDs under Regulation 411.3.3 of BS 7671. An
                additional 30mA RCD at the point of supply in the main house provides additional
                protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing</strong> — the earthing system for the garden office must be
                carefully considered. Where the sub-main provides an earth from the house TN-C-S
                system, this is usually acceptable. Where there is any doubt about earth continuity
                over the buried cable run, a supplementary earth electrode at the garden office
                end provides additional protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heating consideration</strong> — electric panel heaters or infrared
                heaters are the most common heating solution for garden offices. A 1.5kW to
                2kW panel heater is sufficient for a well-insulated 10m² to 15m² space. Ensure
                the circuit is rated for the heater load. Oil-filled radiators are not recommended
                as unattended overnight heating in an outbuilding.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'planning-permission',
    heading: 'Planning Permission for a Garden Office with External Electrical Work',
    content: (
      <>
        <p>
          The planning position for garden offices is generally favourable under permitted
          development rights, but there are important conditions and exceptions to be aware of.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permitted development — structure</strong> — a single-storey garden
                office is typically permitted development provided: it is no more than 2.5m
                high if within 2m of a boundary (4m for a dual-pitched roof, 3m for any
                other roof); it does not cover more than 50% of the garden; it is not forward
                of the principal elevation; and it is not used as a separate dwelling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations always apply to the electrical installation</strong> —
                even where the structure is permitted development, the electrical installation
                is always notifiable under Part P of the Building Regulations. Use a registered
                competent person to ensure automatic notification and certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Exceptions to permitted development</strong> — listed buildings, properties
                in Article 2(3) designated areas (Conservation Areas, National Parks, AONBs), and
                properties where permitted development rights have been removed by condition
                require full planning permission. Check with your local planning authority before
                proceeding.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ups-protection',
    heading: 'UPS for Computer Protection in a Home Office',
    content: (
      <>
        <p>
          A UPS (Uninterruptible Power Supply) provides battery-backed power to connected equipment
          during a mains power interruption. For a home business, the cost of equipment failure
          or data loss from a single power event can far exceed the cost of UPS protection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What a UPS protects against</strong> — momentary power interruptions
                (the most common cause of unsaved data loss), voltage sags and surges that can
                damage sensitive electronics over time, and complete power failures that allow
                controlled shutdown.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sizing a UPS</strong> — add up the wattage of all equipment to be
                protected (workstation, monitors, NAS, network switch). Multiply by 1.4 to
                convert to VA (volt-amperes). A workstation drawing 300W plus monitors at
                100W plus network equipment at 50W = 450W × 1.4 = 630VA. A 1,000VA UPS
                provides comfortable headroom and typically 15 to 30 minutes of runtime.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Line-interactive vs online</strong> — line-interactive UPS units are
                the most cost-effective for home offices (£80 to £200 for a 1,000VA unit).
                Online (double-conversion) UPS units provide cleaner power with no switchover
                time but cost significantly more and are more appropriate for server rooms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery maintenance</strong> — UPS batteries typically need replacement
                every three to five years. Most UPS units alert the user when the battery
                deteriorates. Budget approximately £30 to £80 for a replacement battery set.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'expense-claims',
    heading: 'Expense Claims for Home Office Electrical Work',
    content: (
      <>
        <p>
          Whether you can claim tax relief on home office electrical work depends on your
          employment status, the nature of the work, and current HMRC rules. Always seek
          advice from a qualified accountant before making claims.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-employed — running costs</strong> — self-employed individuals can
                claim a proportion of home running costs (electricity bills) as a business
                expense. HMRC allows this on a time and space basis (percentage of home used
                for business × percentage of time used for business). The simplified flat-rate
                method (£10 to £26 per month depending on hours worked from home) is also
                available and requires no records of actual costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-employed — capital expenditure</strong> — electrical installations
                (dedicated circuits, garden office wiring) are capital expenditure rather than
                revenue expenditure. Capital allowances may be available, but the rules are
                complex. The Annual Investment Allowance (AIA) allows 100% first-year deduction
                on qualifying plant and machinery. Consult an accountant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employed — running costs</strong> — employees who must work from home
                can claim the HMRC flat rate of £6 per week (£312 per year) as a tax-free
                allowance for additional household costs. This can be claimed without receipts.
                Actual cost claims above this amount require detailed records and employer
                confirmation that home working is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employed — capital expenditure</strong> — employees cannot claim
                capital expenditure on home electrical installations as a business expense.
                The work may add value to the property (deductible against capital gains on
                eventual sale), but there is no income tax relief.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Tax rules change frequently. The information above is a general guide for 2026 and
          should not be relied upon as professional tax advice. Always consult a qualified
          accountant before making claims.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Home Office and Garden Office Work',
    content: (
      <>
        <p>
          Home office and garden office electrical installations are a growing source of high-value
          residential work. A typical garden office sub-main, consumer unit, and internal wiring
          job runs to £1,500 to £3,000 — and buyers often want data cabling, outdoor lighting,
          and EV charging quoted at the same time.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificate and Notify on the Day</h4>
                <p className="text-white text-sm leading-relaxed">
                  Garden office and home office work is notifiable under Part P. Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  to issue the Electrical Installation Certificate on completion. Homeowners
                  want their certificate quickly — it is often required for building control
                  sign-off and insurance purposes.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote the Full Scope</h4>
                <p className="text-white text-sm leading-relaxed">
                  Home office enquiries often grow once you meet the customer. Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to quickly add data cabling, garden lighting, EV charging, and additional
                  socket circuits to a quote. A comprehensive quote wins more work than a
                  minimum-scope tender.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Certificate home office and garden office work with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EIC completion, instant PDF export, and same-day quoting. Issue the certificate and quote the next job before you leave. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HomeOfficeElectricalGuidePage() {
  return (
    <GuideTemplate
      title="Home Office Electrical Guide UK | Wiring for Working from Home"
      description="Complete electrical guide for home offices in the UK. Dedicated circuits, data point installation, lighting design, EV charging, garden office power supply, planning permission, UPS protection, and expense claims for electrical work."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Home Office Guide"
      badgeIcon={Monitor}
      heroTitle={
        <>
          Home Office Electrical Guide UK:{' '}
          <span className="text-yellow-400">Wiring for Working from Home</span>
        </>
      }
      heroSubtitle="A well-wired home office improves reliability, productivity, and safety. This guide covers dedicated circuits, data cabling, lighting design, garden office electrical supply, planning rules, UPS protection, and HMRC expense claims for home office electrical work."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Home Office Electrical Installations"
      relatedPages={relatedPages}
      ctaHeading="Certificate Home Office Electrical Work on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EIC completion with AI assistance, instant PDF export, and same-day quoting. 7-day free trial, cancel anytime."
    />
  );
}
