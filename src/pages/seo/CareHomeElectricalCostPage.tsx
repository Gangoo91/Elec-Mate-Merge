import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Zap,
  AlertTriangle,
  FileCheck2,
  Building2,
  ShieldCheck,
  ClipboardCheck,
  Heart,
  Bell,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Commercial Electrical', href: '/guides/commercial-electrical-installation-cost' },
  { label: 'Care Home Electrical Cost', href: '/care-home-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Care Home Electrical Overview' },
  { id: 'nurse-call', label: 'Nurse Call Systems' },
  { id: 'assisted-bathing', label: 'Assisted Bathing Electrical' },
  { id: 'emergency-lighting', label: 'Emergency Lighting (BS 5266)' },
  { id: 'fire-alarm', label: 'Fire Alarm to BS 5839 Cat L1' },
  { id: 'anti-ligature', label: 'Anti-Ligature Considerations' },
  { id: 'eicr-frequency', label: 'EICR Frequency for Care Homes' },
  { id: 'cost-breakdown', label: 'Cost Breakdown 2025' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A complete electrical installation for a new 40-bed residential care home typically costs £180,000–£350,000 including nurse call, fire alarm to BS 5839-1 Category L1, emergency lighting, and assisted bathing wiring.',
  'Nurse call (warden call) systems are a regulatory requirement for care homes registered with the Care Quality Commission (CQC). Systems must comply with BS 8670 and provide both local call and central monitoring capability.',
  'Fire alarm systems in residential care homes must meet BS 5839-1 Category L1 (full property coverage with automatic detection in every room) — a far higher standard than most commercial premises, reflecting the vulnerability of residents.',
  'Assisted bathing rooms and shower rooms in care homes are classified as Location 7 (Bath and shower rooms) under BS 7671. All electrical installations in these zones must meet the enhanced protective measures specified in BS 7671 Section 701.',
  "CQC inspections assess the suitability and functionality of the electrical environment. An expired or unsatisfactory EICR is a significant governance risk that can affect the home's CQC rating.",
];

const faqs = [
  {
    question: 'How much does a care home electrical installation cost in the UK?',
    answer:
      'A complete electrical installation for a new 40-bed residential care home typically costs £180,000–£350,000. This includes power and lighting for bedrooms, communal areas, and clinical spaces; nurse call wiring and central panel; fire alarm to BS 5839-1 Category L1; emergency lighting to BS 5266-1; assisted bathing room electrical (Section 701); and staff call/emergency pull cord systems. Nursing homes with clinical rooms, medical gas electrical interlocks, and more complex nurse call systems sit at the upper end. Per-bed cost is approximately £4,500–£9,000.',
  },
  {
    question: 'What nurse call system standard applies to UK care homes?',
    answer:
      'Nurse call and warden call systems in UK care homes must comply with BS 8670:2005 (Systems for patient and staff call). BS 8670 specifies performance requirements, call categories, response time monitoring, and system documentation. CQC (Care Quality Commission) inspectors assess whether the nurse call system is functional, tested, and documented. A system that does not meet BS 8670 requirements is a compliance risk that can result in an adverse CQC finding.',
  },
  {
    question: 'What fire alarm category does a care home need?',
    answer:
      'Residential care homes require a Category L1 fire alarm system under BS 5839-1. Category L1 means full coverage automatic fire detection throughout the entire property — every bedroom, communal area, corridor, kitchen, plant room, and roof void. This is the highest category of detection coverage. An L1 system in a 40-bed care home will typically include 100–200+ detectors and require an addressable panel. The rationale is that residents may be unable to self-evacuate, requiring the earliest possible detection to allow staff-assisted evacuation.',
  },
  {
    question: 'What are the electrical requirements for care home bathrooms?',
    answer:
      'Assisted bathing rooms and shower rooms in care homes are classified as Location 7 (Bath and shower rooms) under BS 7671 Section 701. Zone 0 (inside the bath/shower) — no electrical equipment permitted. Zone 1 (above the bath up to 2.25m) — only SELV equipment at 12V maximum, or specific IPX4-rated equipment. Zone 2 (0.6m horizontal from bath rim) — IPX4 minimum. Outside zones — RCD protection required on all circuits. Shaver sockets must be to BS 3052 (isolated, Class II transformer). Emergency pull cords for patient assistance must comply with BS 8670.',
  },
  {
    question: 'What are anti-ligature electrical requirements in care homes?',
    answer:
      'Anti-ligature requirements apply specifically to mental health wards and secure/enhanced residential units, not standard residential care homes. Where anti-ligature specifications are required (typically in specialist dementia or mental health units), the electrical design must eliminate or reduce all horizontal projections that could be used as anchor points. In practice this means: flush or semi-flush light fittings (no surface-mounted pendants), concealed cable containment, tamper-resistant switch and socket faceplate covers, recessed pull cord end pieces for nurse call, and flush-mounted emergency call buttons.',
  },
  {
    question: 'How often does a care home need an EICR?',
    answer:
      'The recommended EICR interval for care homes and nursing homes is five years, consistent with BS 7671 guidance for commercial and similar premises. However, the Care Quality Commission (CQC) expects to see documentary evidence of electrical safety compliance at inspection. Many care home operators schedule EICRs every 3–4 years to provide a safety margin and to demonstrate proactive governance. An EICR for a 40-bed care home typically costs £800–£2,000 depending on board count and the scope of nurse call and life-safety systems included.',
  },
  {
    question: 'What is an emergency pull cord system in a care home?',
    answer:
      'Emergency pull cords are a component of the nurse call system required in bathrooms, en-suite shower rooms, and assisted bathing rooms. They allow a resident who has fallen or requires assistance to summon help. The pull cord must hang to within 100mm of the floor so it can be reached by a person on the ground. Electrically, the pull cord unit connects to the nurse call data bus or, in simpler systems, triggers a dedicated alarm circuit. BS 8670 specifies the response categories and the visual/audible alarm requirements at the central monitoring point.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/hospital-electrical-cost',
    title: 'Hospital Electrical Installation Cost',
    description:
      'HTM 06-01 compliance, medical grade supply, UPS, and essential services for hospitals.',
    icon: Heart,
    category: 'Guide',
  },
  {
    href: '/school-electrical-cost',
    title: 'School Electrical Installation Cost',
    description:
      'BB93 compliance, ICT infrastructure, emergency lighting, and solar PV for schools.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/commercial-electrical-installation-cost',
    title: 'Commercial Electrical Installation Cost',
    description: 'Complete UK commercial electrical cost guide for all building types.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete commercial EICRs on your phone with AI board scanning.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/eic-certificate',
    title: 'Electrical Installation Certificate App',
    description: 'Complete EICs on site with instant PDF export — no evening admin.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Care Home Electrical Installation: Regulatory Context',
    content: (
      <>
        <p>
          Care home electrical installations are subject to a more extensive regulatory framework
          than typical commercial premises. The Care Quality Commission (CQC) regulates residential
          and nursing homes under the Health and Social Care Act 2008, and its inspection regime
          assesses the safety of the physical environment — including electrical systems — alongside
          care quality and governance.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>CQC Registration Condition 15</strong> — requires that premises used for the
                purposes of a regulated activity are safe, clean, and suitable. This includes the
                electrical installation. CQC inspectors will ask to see EICR documentation,
                emergency lighting test records, and fire alarm service records.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Resident vulnerability</strong> — the key driver for higher electrical
                standards in care homes is the vulnerability of residents. Many are unable to
                self-evacuate, which is why fire alarm Category L1 (full coverage automatic
                detection) is the minimum standard, and why emergency lighting coverage must be
                comprehensive.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overlapping standards</strong> — care home electrical design involves: BS
                7671:2018+A3:2024 (wiring regulations), BS 5839-1 (fire alarms), BS 5266-1
                (emergency lighting), BS 8670 (nurse call), and HTM 08-03 (healthcare laundry
                guidance where applicable). Each standard must be met independently.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'nurse-call',
    heading: 'Nurse Call Systems to BS 8670',
    content: (
      <>
        <p>
          The nurse call (or warden call) system is one of the most critical electrical systems in a
          care home. It allows residents to summon assistance from any room, enables staff to
          respond efficiently, and provides a management record of call patterns and response times.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Room call points</strong> — each bedroom requires at minimum a combined call
                unit with a call button (accessible from the bed), an over-door light (red when call
                is active), and a reset button. Modern IP-based systems use corridor display units
                to direct staff to the correct room without requiring paging.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bathroom and shower room pull cords</strong> — mandatory in all assisted
                bathrooms and shower rooms. Pull cord must hang to within 100mm of the floor. The
                pull cord unit generates a separate category call (typically a higher-priority
                emergency call) at the central panel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Central monitoring</strong> — BS 8670 requires a central monitoring point
                (nurses' station or duty room) with a visual and audible indication of all active
                calls, call category, and room identification. Many modern systems add staff
                location (DECT or RFID) so call routing can direct the nearest available staff
                member.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical installation costs</strong> — nurse call installation for a
                40-bed care home: £15,000–£35,000 depending on system tier (conventional versus
                IP-based), number of bedrooms, and whether staff location is included. Cabling is
                typically Category 5/6 structured cabling on modern IP systems or dedicated 2-core
                screened on conventional.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'assisted-bathing',
    heading: 'Assisted Bathing Room Electrical Installation',
    content: (
      <>
        <p>
          Assisted bathing rooms (hoist baths, assisted shower rooms, wet rooms) in care homes are
          classified under BS 7671 Section 701 (Locations Containing a Bath or Shower). The
          combination of high-voltage electrical equipment (hoists, height-adjustable baths, drying
          systems) and wet environments requires careful application of the zone system and
          protective measures specified in Section 701.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hoist track power supply</strong> — ceiling hoists require a dedicated
                circuit, typically 13A or 16A single-phase. The hoist track must be positioned to
                avoid Zone 1 above the bath. Battery-powered hoists eliminate the need for a
                permanent overhead supply but require a dedicated charging point outside the wet
                zone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Height-adjustable bath electrical</strong> — powered height-adjustable baths
                (Arjo, Gainsborough, and similar) draw 1–3kW and require a 13A or 16A supply with
                isolation within sight of the bath. Where the bath has integrated thermostatic
                temperature control and Jacuzzi functions, a 32A circuit may be required. All
                circuits in the bathroom must be RCD-protected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supplementary equipotential bonding</strong> — Regulation 701.415.2 requires
                supplementary bonding of all simultaneously accessible conductive parts in bathroom
                zones. This includes the bath, hoist track, water pipes, heating pipes, and any
                metal door frames, connected to the main earthing terminal via 4mm² or larger
                bonding conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency nurse call pull cord</strong> — mandatory in every assisted
                bathing room. Pull cord must be accessible from the floor. The call unit's
                electrical connection to the nurse call system bus must be outside Zone 1.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting to BS 5266-1',
    content: (
      <>
        <p>
          Emergency lighting in care homes must provide comprehensive coverage across all escape
          routes, communal areas, and resident bedrooms. The vulnerability of the resident
          population means that emergency lighting design must go beyond the minimum requirements of
          BS 5266-1 to ensure safe evacuation under all fire and power failure scenarios.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>3-hour minimum duration</strong> — BS 5266-1 requires a minimum 3-hour
                duration for emergency lighting in residential premises (including care homes). This
                reflects the time required for staff-assisted evacuation of dependent residents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bedroom coverage</strong> — while BS 5266-1 does not always require
                emergency lighting in individual bedrooms in other premises types, the fire risk
                assessment for a care home typically recommends emergency lighting in each bedroom
                to allow staff to locate and assist residents during an evacuation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Assisted bathrooms and wet rooms</strong> — emergency lighting is essential
                in these areas where residents may be partially clothed or in baths/showers during a
                fire alarm activation. IP-rated emergency fittings (IPX4 minimum) are required in
                wet zones.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation cost</strong> — emergency lighting for a 40-bed care home:
                £8,000–£18,000 depending on floor area, number of floors, and specification.
                Self-test luminaires (BS EN 62034) are recommended to simplify the mandatory monthly
                and annual test regime.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fire-alarm',
    heading: 'Fire Alarm to BS 5839-1 Category L1',
    content: (
      <>
        <p>
          The Category L1 fire alarm specification for care homes is the highest level of automatic
          detection coverage defined in BS 5839-1. It requires automatic fire detectors in every
          room and space within the building — not just escape routes and communal areas. The
          rationale is that residents may require staff-assisted evacuation and the earliest
          possible detection maximises the time available.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Detector types</strong> — optical smoke detectors in bedrooms and corridors;
                heat detectors in kitchens (to avoid cooking-related false alarms); combined
                smoke/CO detectors in plant rooms where fuel-burning equipment is present; beam
                detectors in large open communal spaces (dining rooms, lounges) where point
                detectors would be impractical.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Addressable panel</strong> — with 100–300+ detectors across a typical 40-bed
                care home, an addressable fire alarm panel is the only practical choice. Addressable
                systems allow the exact location of each detector activation to be identified at the
                panel, enabling staff to respond to the correct location immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Alarm sounders</strong> — care homes with residents who have hearing
                impairment should have visual (strobe) alarm devices in bedrooms, assisted
                bathrooms, and communal areas in addition to standard audible sounders. The sound
                pressure level in each bedroom at the alarm sounder must meet BS 5839-1 requirements
                to wake sleeping residents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm installation cost</strong> — Category L1 addressable fire alarm
                for a 40-bed care home: £18,000–£40,000 including panel, detectors, sounders, visual
                alarms, cable installation, commissioning, and BS 5839-1 commissioning certificate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'anti-ligature',
    heading: 'Anti-Ligature Electrical Considerations',
    content: (
      <>
        <p>
          Anti-ligature electrical specifications apply to mental health facilities, specialist
          dementia care units, and any care environment where there is assessed risk of self-harm.
          Standard residential care homes do not typically require full anti-ligature electrical
          design, but dementia-specific units increasingly specify anti-ligature features as part of
          a person-centred design approach.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Anti-ligature light fittings</strong> — flush or semi-flush LED panels with
                tamper-resistant fixings. No surface-mounted pendants, chains, or downlighters with
                exposed lamp holders. Concealed or flush driver modules. IP rating to suit the
                environment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switch and socket covers</strong> — tamper-resistant switch and socket
                outlets with concealed screw fixings. Some specifications require key-operated or
                staff-only accessible socket outlets to prevent residents accessing power for unsafe
                appliances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pull cord end pieces</strong> — nurse call emergency pull cords must use
                anti-ligature end fittings that eliminate horizontal projections. Specialist
                anti-ligature cord ends (soft loop type, maximum 25mm projection) are available from
                nurse call system manufacturers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Concealed containment</strong> — cables are run in concealed conduit within
                the wall structure or in solid-fill cable ducts flush with the surface. No
                surface-mounted trunking with removable lids in resident bedroom or bathroom areas.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-frequency',
    heading: 'EICR Frequency and Compliance for Care Homes',
    content: (
      <>
        <p>
          Electrical safety compliance documentation is scrutinised by CQC inspectors. A care home
          with an expired or unsatisfactory EICR is at risk of an adverse CQC finding under
          Regulation 15 (Premises and Equipment), which can affect the home's overall CQC rating and
          lead to compliance notices.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recommended EICR interval</strong> — five years maximum. Many care home
                operators use a 3–4 year cycle to allow remedial work to be completed well before
                the next CQC inspection cycle.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope of EICR in a care home</strong> — the EICR must cover all fixed
                electrical installations including nurse call wiring (insulation resistance only —
                functional testing is carried out by the nurse call engineer), fire alarm power
                supply circuits (tested in conjunction with the fire alarm service), and all
                emergency lighting circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost</strong> — EICR for a 40-bed care home: £800–£2,000. Larger nursing
                homes (80+ beds) with multiple distribution boards: £1,500–£3,500. EICRs should be
                scheduled during periods of lower occupancy where possible to minimise disruption to
                residents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work</strong> — C1 or C2 observations must be remedied before the
                installation can be deemed satisfactory. In an occupied care home, circuit outages
                must be planned with the home manager to ensure that life-safety systems (nurse
                call, fire alarm, emergency lighting) remain operational at all times during
                remedial works.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Care Home Electrical Installation Cost Breakdown 2025',
    content: (
      <>
        <p>
          Costs are for new-build installations, labour and materials excluding VAT. A 40-bed
          residential care home is used as the reference building.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>General power and lighting (bedrooms and communal)</strong> —
                £60,000–£110,000. Includes DALI lighting control, socket outlets, and all wiring to
                bedrooms, communal lounges, dining rooms, corridors, and offices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nurse call system (IP-based, 40 beds)</strong> — £15,000–£35,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Assisted bathing room electrical (per room)</strong> — £3,000–£6,000. Hoist
                supply, height-adjustable bath circuit, supplementary bonding, pull cord.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm to BS 5839-1 Category L1</strong> — £18,000–£40,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting to BS 5266-1 (3-hour)</strong> — £8,000–£18,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchen and laundry electrical</strong> — £8,000–£20,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CCTV and access control</strong> — £5,000–£12,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total — 40-bed residential care home</strong> —{' '}
                <strong>£180,000–£350,000</strong>. Nursing homes with clinical rooms and medical
                gas electrical interlocks: £280,000–£450,000+.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Care Home and Healthcare Electrical Work',
    content: (
      <>
        <p>
          Care home electrical contracts require detailed knowledge of BS 7671 Section 701, BS
          5839-1 Category L1, BS 5266-1, and BS 8670. Electricians who develop expertise in this
          sector and can demonstrate CQC compliance knowledge are in high demand from care home
          operators and NHS property service contractors.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue Certificates That Satisfy CQC</h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> and{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  direct from your phone with full PDF documentation. Care home operators need
                  certificates they can present immediately to CQC inspectors.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage care home electrical contracts with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for healthcare sector quoting, EICR completion, and EIC certification. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CareHomeElectricalCostPage() {
  return (
    <GuideTemplate
      title="Care Home Electrical Installation Cost UK 2025 | Healthcare Electrical"
      description="Care home electrical installation costs UK 2025. Nurse call systems to BS 8670, assisted bathing electrical, emergency lighting, fire alarm to BS 5839-1 Category L1, anti-ligature design, EICR frequency. 40-bed home £180,000–£350,000."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Healthcare Electrical Guide"
      badgeIcon={Heart}
      heroTitle={
        <>
          Care Home Electrical Installation Cost UK 2025:{' '}
          <span className="text-yellow-400">Healthcare Electrical Guide</span>
        </>
      }
      heroSubtitle="Complete cost guide for UK care home and nursing home electrical installations. Nurse call systems to BS 8670, assisted bathing electrical, emergency lighting, fire alarm to BS 5839-1 Category L1, anti-ligature design, and EICR compliance. Typical 40-bed home: £180,000–£350,000."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: Care Home Electrical Installation Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certificate Care Home Electrical Work on Site"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for healthcare sector quoting, EICR completion, and EIC certification. 7-day free trial, cancel anytime."
    />
  );
}
