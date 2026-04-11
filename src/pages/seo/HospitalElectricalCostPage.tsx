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
  Activity,
  Battery,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Commercial Electrical', href: '/guides/commercial-electrical-installation-cost' },
  { label: 'Hospital Electrical Cost', href: '/hospital-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Hospital Electrical Overview' },
  { id: 'htm0601', label: 'HTM 06-01 Compliance' },
  { id: 'medical-grade', label: 'Medical Grade Electrical Systems' },
  { id: 'essential-services', label: 'Essential Services & UPS' },
  { id: 'ward-department', label: 'Costs Per Ward & Department' },
  { id: 'theatres', label: 'Operating Theatres' },
  { id: 'fire-emergency', label: 'Fire Alarm & Emergency Lighting' },
  { id: 'cost-breakdown', label: 'Cost Breakdown 2025' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Hospital electrical installations are among the most expensive per square metre of any building type in the UK. NHS guidance HTM 06-01 (Electrical Services Supply and Distribution) sets out the mandatory design and installation requirements for all NHS healthcare premises.',
  'A typical acute hospital ward electrical installation costs £80,000–£180,000 per ward depending on size and patient dependency level. Operating theatres cost £150,000–£400,000+ each for the complete electrical systems.',
  'Essential electrical services in hospitals must maintain supply to critical loads (operating theatres, ICU, life-support equipment) within 0.5 seconds of a mains failure. This requires automatic transfer switching (ATS) and UPS systems throughout the facility.',
  'Medical IT systems (isolated power supplies — IPS) are mandatory in Group 2 medical locations (operating theatres, ICUs, cardiac catheterisation labs) under BS 7671 Section 710. IPS panels, isolation monitors, and insulation fault locators are expensive but non-negotiable.',
  "The NHS's Net Zero ambition (Delivering a Net Zero National Health Service, 2020) means solar PV, battery storage, and low-carbon energy infrastructure are increasingly specified as part of major hospital capital projects.",
];

const faqs = [
  {
    question: 'How much does a hospital electrical installation cost in the UK?',
    answer:
      'Hospital electrical installation is among the most expensive of any building type, driven by HTM 06-01 compliance requirements, medical grade power systems, UPS infrastructure, and the essential services requirements for life-critical areas. New-build acute hospital costs for the complete electrical installation (excluding medical gas but including essential services, UPS, life-safety systems) are typically £350–£700 per square metre of gross internal area (GIA). A 500-bed acute hospital (approximately 75,000m² GIA) may have an electrical installation value of £25,000,000–£50,000,000. Individual ward refurbishments: £80,000–£180,000 per ward. Operating theatres: £150,000–£400,000+ each.',
  },
  {
    question: 'What is HTM 06-01 and why does it matter for hospital electrical installations?',
    answer:
      'HTM 06-01 (Health Technical Memorandum 06-01 — Electrical Services Supply and Distribution) is the NHS England guidance document that sets out the design, installation, and maintenance requirements for electrical services in NHS healthcare premises. It supplements BS 7671 and must be used alongside it. HTM 06-01 covers: design of electrical distribution systems, essential services provisions, switchgear and UPS requirements, earthing and protection, electrical safety management, and the documentation required at handover. All electrical work on NHS premises must be carried out in accordance with HTM 06-01 and be independently witnessed and verified.',
  },
  {
    question: 'What is a Group 2 medical location and what electrical systems does it require?',
    answer:
      "BS 7671 Section 710 classifies medical locations into Group 1 (where failure of supply does not immediately endanger a patient's life — wards, corridors, consultation rooms) and Group 2 (where failure of supply to applied parts used on or in the patient would immediately endanger life — operating theatres, ICUs, catheterisation labs, cardiac surgery wards). Group 2 locations require: medical IT systems (isolated power supplies, IPS) to provide a fault-tolerant power supply with insulation monitoring; automatic changeover to essential services within 0.5 seconds; equipotential bonding to IEC 60364-7-710; and additional RCD protection requirements.",
  },
  {
    question: 'What is a medical IT system (isolated power supply)?',
    answer:
      'A Medical IT system consists of an isolation transformer (IT — Isolated Terre, meaning the neutral is not connected to earth) that provides a secondary voltage supply with no connection to earth. A line insulation monitor (LIM) continuously monitors the insulation resistance of the secondary circuit and provides an alarm if it falls below approximately 50kΩ. This means a first fault to earth does not cause a circuit breaker to trip and disconnect the supply — critical in an operating theatre where supply continuity is life-critical. The alarm allows time for the fault to be located and rectified in a controlled manner. Each Medical IT panel costs £4,000–£12,000 depending on capacity.',
  },
  {
    question: 'What UPS systems are required in hospitals?',
    answer:
      'Hospitals require multiple levels of UPS protection. Static UPS systems (double-conversion, online) protect individual critical loads (workstations, servers, monitoring equipment) — typically 1–20kVA per unit. Central UPS systems protect entire critical distribution boards (operating theatre suites, ICU, pharmacy) — typically 20–500kVA. Diesel generators provide standby generation for essential services and must reach full load within 15 seconds of mains failure under HTM 06-01. The combination of UPS and generator ensures no break in supply to Group 2 locations. A hospital standby generation system (1MVA generator): £300,000–£600,000 installed.',
  },
  {
    question: 'How often does a hospital need an electrical inspection?',
    answer:
      "HTM 06-01 requires that healthcare electrical installations are subject to a formal inspection and testing programme. The frequency is risk-based: Group 2 medical locations (operating theatres, ICU) require annual inspection and testing of all critical systems including IPS panels, ATS, and emergency systems. General ward and clinical areas: every 5 years. Life-safety systems (emergency lighting, fire alarm) have their own annual service requirements. All test results must be recorded in the hospital's electrical safety management system.",
  },
  {
    question: 'What is the cost of an operating theatre electrical installation?',
    answer:
      'An operating theatre electrical installation is one of the most expensive single-room electrical installations in any building type. A typical UK acute hospital operating theatre electrical installation costs £150,000–£400,000 including: Medical IT system (IPS panel, isolation transformer, LIM): £15,000–£35,000. UPS for anaesthetic and monitoring equipment: £8,000–£25,000. Luminaire infrastructure (surgical lights, task lighting, circadian zone lighting): £20,000–£60,000. Pendants (anaesthetic, surgical — electrical infrastructure): £25,000–£80,000. Emergency lighting and essential services: £8,000–£20,000. Control systems and nurse call: £5,000–£15,000. General power, containment, and earthing: £25,000–£80,000.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/care-home-electrical-cost',
    title: 'Care Home Electrical Installation Cost',
    description:
      'Nurse call systems, assisted bathing electrical, fire alarms to BS 5839-1 Category L1.',
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
    href: '/industrial-electrical-cost',
    title: 'Industrial Electrical Installation Cost',
    description: 'Per square metre estimates, 3-phase distribution, motor control for factories.',
    icon: Zap,
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
    description: 'Complete healthcare facility EICRs on your phone with AI board scanning.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Hospital Electrical Installation: Scale and Complexity',
    content: (
      <>
        <p>
          Hospital electrical installations represent the highest standard of electrical engineering
          in the built environment. The combination of HTM 06-01 compliance requirements, BS 7671
          Section 710 medical location provisions, essential services infrastructure, and the
          absolute requirement for supply continuity to life-critical equipment means that hospital
          electrical work is fundamentally different from any other building type.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Essential services hierarchy</strong> — hospital electrical systems are
                divided into normal supply (utility mains), essential services (generator-backed),
                and critical essential services (UPS-backed and generator-backed for Group 2
                locations). HTM 06-01 defines which loads must be on which supply level.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medical location classification</strong> — BS 7671 Section 710 classifies
                every room and area by its patient dependency level (Group 0, 1, or 2). Group 2
                locations (operating theatres, ICU, cardiac labs) require Medical IT systems and
                have the most stringent electrical requirements of any building in the UK.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Life-safety systems</strong> — emergency lighting to{' '}
                <SEOInternalLink href="/guides/emergency-lighting-bs5266">
                  BS 5266-1
                </SEOInternalLink>
                , fire alarm to{' '}
                <SEOInternalLink href="/guides/fire-alarm-installation-cost">
                  BS 5839-1
                </SEOInternalLink>
                , nurse call, public address and voice alarm (PAVA), and patient entertainment
                systems — all must coexist and be separately documented.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist contractors</strong> — NHS hospital electrical work is typically
                carried out by contractors with specific healthcare sector accreditation (NICEIC
                Healthcare Approved, or equivalent) and is subject to independent commissioning and
                verification by the client's authorised engineer (electrical).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'htm0601',
    heading: 'HTM 06-01 Compliance Requirements',
    content: (
      <>
        <p>
          Health Technical Memorandum 06-01 (Electrical Services Supply and Distribution) is the
          definitive guidance document for electrical installations in NHS England healthcare
          premises. It must be read alongside BS 7671 and takes precedence where requirements
          differ.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution system design</strong> — HTM 06-01 requires a ring-main or
                dual-fed distribution architecture for essential services to ensure continuity of
                supply if a cable section is lost. Single-radial feeds to essential services boards
                are not acceptable. This significantly increases cable costs compared to equivalent
                commercial installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switchgear and automatic transfer</strong> — all essential services panels
                must have automatic transfer switching (ATS) with a maximum changeover time to
                generator supply of 15 seconds (5 seconds for critical essential services). ATS
                panels must be tested regularly and documented.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing and bonding</strong> — hospitals require multiple earthing systems:
                TN-S (utility supply), IT (Medical IT in Group 2 locations), and equipotential
                bonding in clinical areas. All equipotential bonding must be to IEC 60364-7-710 and
                independently tested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation and handover</strong> — HTM 06-01 requires comprehensive
                as-built drawings, test results, commissioning records, O&M manuals, and a formal
                handover to the client's authorised engineer (electrical). Documentation
                requirements are far more extensive than for standard commercial projects.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'medical-grade',
    heading: 'Medical Grade Electrical Systems',
    content: (
      <>
        <p>
          Medical grade electrical systems are those designed specifically for clinical environments
          where supply failure or electrical fault could directly endanger patient life. The primary
          medical grade electrical system is the Medical IT (Isolated Power Supply) system mandated
          in Group 2 locations by BS 7671 Section 710.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medical IT panel (IPS)</strong> — contains the isolation transformer, line
                insulation monitor (LIM), and distribution to medical outlets. The LIM continuously
                monitors insulation and sounds an alarm at the first fault — without tripping the
                circuit. Cost per panel: £4,000–£12,000. A typical operating theatre complex may
                have 6–12 IPS panels.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surgical pendants (electrical infrastructure)</strong> — surgical and
                anaesthetic pendants deliver electrical power, medical gas, data, and lighting to
                the patient zone without floor-level cables. The electrical infrastructure for each
                pendant arm (conduit, cable, connection box) costs £3,000–£8,000 to install. The
                pendant itself is a separate procurement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medical outlets</strong> — IEC 60309 (BS EN 60309) blue 16A or 32A
                industrial outlets are used in clinical areas for medical equipment connection.
                These are more robust than standard 13A sockets and are colour-coded to distinguish
                between normal, essential, and critical essential supplies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipotential bonding rail</strong> — a copper equipotential bonding rail is
                installed in each clinical area, connected to the hospital earth bar. All metal
                equipment frames in the clinical area are bonded to this rail to prevent potential
                differences that could cause microshock.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'essential-services',
    heading: 'Essential Services and UPS Systems',
    content: (
      <>
        <p>
          Hospital essential electrical services are the systems that maintain power to
          life-critical loads when the normal utility supply fails. HTM 06-01 defines three
          categories of supply and the transfer times required for each.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>No-break supply (UPS)</strong> — provides uninterrupted power to the most
                critical loads: operating theatre lighting and equipment, ICU life-support, cardiac
                monitoring. Achieved by online double-conversion UPS systems with battery autonomy
                of 15–60 minutes pending generator start. Cost per 20kVA UPS unit: £8,000–£20,000. A
                large theatre complex may require central UPS of 100–500kVA: £60,000–£200,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Essential services (generator within 15 seconds)</strong> — covers critical
                clinical areas, emergency lighting, fire alarm, lift power, and key HVAC systems.
                Achieved by automatic transfer switching to standby generator. Hospital generators:
                500kVA–4MVA depending on bed count. A 1MVA hospital generator set: £200,000–£500,000
                installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Normal supply</strong> — non-critical loads (outpatient waiting areas,
                offices, catering non-essential equipment, car parks) remain on normal utility
                supply only. These loads are shed under generator running to reduce generator
                demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ATS (Automatic Transfer Switching)</strong> — ATS panels monitor the mains
                supply and automatically switch to generator upon failure. Open-transition ATS
                (brief supply break) for non-critical loads; closed-transition ATS (no break) for
                critical loads. ATS panel cost: £3,000–£20,000 depending on current rating and
                transition type.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ward-department',
    heading: 'Electrical Costs Per Ward and Department',
    content: (
      <>
        <p>
          Hospital electrical costs are often expressed on a per-ward or per-department basis for
          budgeting and planning purposes. The figures below represent 2025 costs for UK NHS acute
          hospital refurbishment projects.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>General acute ward (28–32 beds)</strong> — £80,000–£140,000. Group 1 medical
                location requirements. Nurse call, bedhead trunking with IEC 60309 outlets, staff
                base lighting, emergency lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High dependency unit (HDU, 8–12 beds)</strong> — £120,000–£220,000. Elevated
                outlet density, enhanced monitoring infrastructure, partial Group 2 requirements at
                some bed positions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Intensive Care Unit (ICU, 8–12 beds)</strong> — £180,000–£380,000. Full
                Group 2 requirements, Medical IT systems, UPS, extensive bedhead infrastructure,
                higher outlet density (20–30+ outlets per bed position).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outpatient department (per suite)</strong> — £40,000–£90,000. Consultation
                rooms, waiting areas, reception, basic clinical rooms. Group 1 requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pharmacy</strong> — £35,000–£80,000. Controlled drug security systems, cold
                storage monitoring circuits, laboratory lighting, UPS for dispensing systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Radiology / imaging department</strong> — £90,000–£200,000. High-power
                imaging equipment (MRI, CT — kVA loads requiring dedicated 3-phase supply), RF
                screening (MRI rooms), UPS for imaging systems.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'theatres',
    heading: 'Operating Theatre Electrical Installations',
    content: (
      <>
        <p>
          Operating theatres are the most electrically complex and expensive single-room
          installations in the built environment. The combination of Group 2 medical location
          requirements, laminar flow HVAC electrical integration, surgical lighting infrastructure,
          and supply resilience requirements make theatre electrical work highly specialised.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medical IT system (IPS)</strong> — each operating theatre requires at least
                one dedicated Medical IT panel (typically 8–16kVA transformer). Some larger theatres
                require two IPS panels (one for anaesthetic zone, one for surgical zone). Cost per
                IPS panel: £6,000–£14,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surgical lighting</strong> — ceiling-mounted surgical luminaires (Maquet,
                Trumpf, Stryker) require a 13A–32A circuit and structural reinforcement to the
                ceiling slab. A twin-dome surgical light with satellite display arm: £18,000–£50,000
                for the fitting. Electrical infrastructure: £2,500–£5,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Anaesthetic machine circuit</strong> — a dedicated 32A 3-phase circuit for
                the anaesthetic machine. This circuit must be on the Medical IT system and
                UPS-backed. Separate circuit for the anaesthetic agent evacuator (scavenging system
                blower).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>TIVA (Total Intravenous Anaesthesia) infrastructure</strong> — ceiling- or
                pendant-mounted syringe driver bars require power, data, and nurse call integration.
                Electrical supply: 4 x 13A IEC outlets per bar position.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A complete four-theatre suite (four operating theatres, anaesthetic rooms, scrub rooms,
          recovery) typically costs £2,500,000–£5,000,000 for the complete MEP (mechanical,
          electrical, and plumbing) package, of which electrical typically represents 30–40%.
        </p>
      </>
    ),
  },
  {
    id: 'fire-emergency',
    heading: 'Fire Alarm and Emergency Lighting in Hospitals',
    content: (
      <>
        <p>
          Hospital fire alarm and emergency lighting systems must comply with BS 5839-1 and BS
          5266-1 respectively, with additional requirements imposed by HTM 06-01, the NHS Fire
          Safety Policy, and Firecode (the NHS fire safety guidance series).
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm — Category L1</strong> — hospitals require full property coverage
                automatic detection (Category L1 to BS 5839-1) across all areas including patient
                rooms, plant rooms, and roof voids. An addressable fire alarm system is mandatory
                for a building of this complexity. Large hospitals may have 1,000–5,000+ detectors
                on a single fire alarm system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Refuge communication systems</strong> — fire-fighting lifts and refuge areas
                must have two-way voice communication systems (compliant with BS 5839-9) linked to
                the building management centre. These are wired as part of the fire alarm
                installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting — 3 hours minimum</strong> — BS 5266-1 requires 3-hour
                emergency lighting duration for premises with sleeping accommodation. Central
                battery systems (CBS) are the norm in large hospitals, providing centralised battery
                management and monitoring for the entire emergency lighting installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>PAVA (Public Address and Voice Alarm)</strong> — large hospitals require a
                BS 5839-8 compliant PAVA system for emergency announcement and evacuation
                management. PAVA system installation for a district general hospital:
                £80,000–£250,000.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Hospital Electrical Installation Cost Breakdown 2025',
    content: (
      <>
        <p>
          The following costs are indicative for a new-build or major refurbishment of a 200-bed
          district general hospital (approximately 30,000m² GIA). Labour and materials excluding
          VAT.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HV/LV distribution and main switchgear</strong> — £800,000–£2,000,000. HV
                substation, main LV switchboards, essential services switchgear, cable routes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standby generation (2 x 1MVA generators)</strong> — £600,000–£1,200,000.
                Includes generators, fuel storage, ATS panels, and containment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>UPS systems (theatre suite and ICU)</strong> — £400,000–£900,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medical IT systems (IPS panels)</strong> — £150,000–£350,000. Operating
                theatres, ICU, cardiac labs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ward and clinical electrical (8 wards, 2 ICU)</strong> —
                £1,200,000–£2,500,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Operating theatres (4 theatres complete)</strong> — £600,000–£1,600,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm (Cat L1, addressable)</strong> — £300,000–£700,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting (CBS, 3-hour)</strong> — £200,000–£500,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total — 200-bed district general hospital</strong> —{' '}
                <strong>£8,000,000–£18,000,000</strong>. Per m²: £270–£600. New-build 500-bed acute
                hospital total electrical: £25,000,000–£50,000,000.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Healthcare Electrical',
    content: (
      <>
        <p>
          Hospital and healthcare electrical work is a specialist discipline that requires specific
          training, accreditation, and an understanding of HTM 06-01, BS 7671 Section 710, and the
          NHS's authorised engineer (electrical) governance structure. Contractors who develop this
          specialism work on high-value, long-term NHS frameworks.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Document Complex Installations</h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  for each phase of hospital electrical work. Generate{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> for
                  periodic inspections — critical in an environment where documentation is required
                  by the authorised engineer and the NHS estates team.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage healthcare electrical contracts with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for healthcare sector quoting, EIC and EICR completion, and multi-board inspection management. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HospitalElectricalCostPage() {
  return (
    <GuideTemplate
      title="Hospital Electrical Cost UK | Healthcare Electrical Installation Costs"
      description="Hospital electrical installation costs UK 2025. HTM 06-01 compliance, Medical IT systems, essential services, UPS, standby generation, operating theatres. Costs per ward and department. 200-bed DGH: £8m–£18m."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Healthcare Electrical Guide"
      badgeIcon={Heart}
      heroTitle={
        <>
          Hospital Electrical Installation Cost UK:{' '}
          <span className="text-yellow-400">Healthcare Electrical Guide 2025</span>
        </>
      }
      heroSubtitle="Complete cost guide for UK hospital and NHS healthcare electrical installations. HTM 06-01 compliance, Medical IT systems (IPS), essential services, UPS, standby generation, operating theatre electrical, and costs per ward and department. 200-bed district general hospital: £8,000,000–£18,000,000."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: Hospital Electrical Installation Costs"
      relatedPages={relatedPages}
      ctaHeading="Document Healthcare Electrical Projects with Elec-Mate"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for healthcare sector quoting, EIC and EICR completion, and multi-board inspection management. 7-day free trial, cancel anytime."
    />
  );
}
