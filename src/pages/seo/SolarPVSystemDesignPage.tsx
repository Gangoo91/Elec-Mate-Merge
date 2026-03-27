import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Sun,
  Zap,
  Calculator,
  FileCheck2,
  PoundSterling,
  ShieldCheck,
  ClipboardCheck,
  AlertTriangle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Solar Guides', href: '/solar-pv-system-design' },
  { label: 'Solar PV System Design', href: '/solar-pv-system-design' },
];

const tocItems = [
  { id: 'system-sizing', label: 'System Sizing & kWp Calculation' },
  { id: 'string-design', label: 'String Design' },
  { id: 'inverter-sizing', label: 'Inverter Sizing & Types' },
  { id: 'dc-cable-sizing', label: 'DC Cable Sizing' },
  { id: 'ac-connection', label: 'AC Connection' },
  { id: 'dno-notification', label: 'G99/G98 DNO Notification' },
  { id: 'mcs-design', label: 'MCS Design Requirements' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'System size (kWp) is calculated from available roof area, panel wattage, and annual consumption — a typical UK home uses 3,500 kWh/year and a 3–4 kWp system will offset the majority of daytime demand.',
  'String design must account for UK irradiance data, minimum and maximum inverter input voltages (Vmp × panels must fall within the MPPT window), and shading analysis.',
  'Three inverter topologies are available: string inverters (lowest cost), microinverters (per-panel optimisation), and hybrid inverters (battery-ready). Each has different design implications.',
  'DC cable sizing under BS 7671 Section 712 must account for temperature correction, voltage drop (max 3% recommended), and short-circuit current from multiple strings.',
  'G99 notification is required for systems ≥ 16 A per phase; G98 self-certification covers systems below this threshold. Both require DNO approval before export.',
  'MCS 001 governs all MCS-certified installations and mandates a detailed design assessment, shading analysis, and energy yield estimate using PVGIS or equivalent software.',
];

const faqs = [
  {
    question: 'How do I calculate the right system size (kWp) for a UK home?',
    answer:
      'Start with the household\'s annual electricity consumption (typically 3,500 kWh/year for a three-bedroom home). Divide by the expected annual yield per kWp in the UK (approximately 850–950 kWh/kWp in southern England, 750–850 kWh/kWp further north). A 3.5 kWp system in London yields roughly 3,150 kWh/year, meeting around 90% of daytime demand. You must also check available roof area — a 400 Wp panel is approximately 1.7 m², so a 3.5 kWp system requires around 15 m² of unshaded, south-facing roof.',
  },
  {
    question: 'What is the difference between G98 and G99 DNO notification?',
    answer:
      'G98 (Engineering Recommendation G98) applies to single-phase systems up to 3.68 kW (16 A) per phase. These can be self-certified by the installer and connected without prior DNO approval, though the DNO must be notified within 28 days of commissioning. G99 (Engineering Recommendation G99) applies to larger systems — anything above 16 A per phase — and requires prior DNO approval before connection. The DNO has up to 45 working days to respond to a G99 application. Most domestic systems fall under G98; larger domestic or commercial systems fall under G99.',
  },
  {
    question: 'What does BS 7671 Section 712 cover for PV systems?',
    answer:
      'BS 7671:2018+A3:2024 Section 712 (Solar Photovoltaic Power Supply Systems) sets out specific requirements for PV installations including: isolation and switching arrangements, protection against overvoltage (surge protection devices on DC and AC sides), cable selection and installation (UV-resistant, double-insulated DC cabling), earthing and bonding of the PV array, protection against fire (appropriate cable management), and labelling requirements including warning labels at all points of isolation.',
  },
  {
    question: 'How many panels can I put on one string?',
    answer:
      'The number of panels per string is determined by the inverter\'s MPPT input voltage window. Multiply the panel\'s Voc (open circuit voltage) by 1.15 (UK temperature correction factor for cold weather) and ensure this does not exceed the inverter\'s maximum DC input voltage. Multiply Vmp (voltage at maximum power) by the number of panels and ensure it falls within the inverter\'s MPPT voltage range at the expected operating temperature. Most residential string inverters accept 1–2 strings; use optimisers or microinverters where shading affects individual panels.',
  },
  {
    question: 'What cable type must be used for DC wiring on a solar PV system?',
    answer:
      'DC wiring between the array and the inverter must use cable rated for PV applications — typically double-insulated, UV-resistant, single-core 4 mm² or 6 mm² solar cable (TÜV EN 50618 or equivalent). Standard twin-and-earth cable is not suitable for DC PV circuits. Cables must be physically separated or protected against damage, and positive and negative conductors must be routed together to minimise the loop area and reduce electromagnetic interference.',
  },
  {
    question: 'Is MCS certification required for all solar PV installations?',
    answer:
      'MCS certification is required for the installation to qualify for the Smart Export Guarantee (SEG), most grant schemes, and some mortgage and insurance requirements. While it is technically possible to install PV without MCS certification, the customer loses access to export payments and any grant funding. All reputable installers should hold MCS certification under the MCS 001 standard. The installer must also be registered with a competent person scheme such as NICEIC or NAPIT for the electrical work under BS 7671 Section 712.',
  },
  {
    question: 'What shading analysis is required for MCS design?',
    answer:
      'MCS 001 requires a shading analysis as part of the design assessment. Tools such as PVGIS (European Commission), Solar Pathfinder, or the SolarEdge Designer include shading analysis. The design must document annual shading losses. Where shading exceeds acceptable limits, the design must include optimisers or microinverters to mitigate the impact. The yield estimate submitted with the MCS certificate must reflect actual shading losses rather than an idealised calculation.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/solar-battery-storage-installation',
    title: 'Solar Battery Storage Installation',
    description: 'AC-coupled vs DC-coupled storage, popular batteries, costs, and MCS requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/solar-pv-maintenance',
    title: 'Solar Panel Maintenance',
    description: 'Annual inspection checklist, cleaning, inverter replacement, and output monitoring.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/solar-pv-grants',
    title: 'Solar Panel Grants UK 2025',
    description: 'Smart Export Guarantee, 0% VAT, ECO4, and Home Energy Scotland loan explained.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/mcs-certification-guide',
    title: 'MCS Certification Guide',
    description: 'How to become MCS certified, costs, annual audit, and MCS 001 standard.',
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
    id: 'system-sizing',
    heading: 'System Sizing: kWp Calculation for UK Homes',
    content: (
      <>
        <p>
          The first step in any solar PV design is determining the appropriate system size, expressed
          in kilowatt-peak (kWp). This is the rated output of the array under Standard Test
          Conditions (STC: 1,000 W/m² irradiance, 25°C cell temperature, AM1.5 spectrum).
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — Establish annual consumption:</strong> Check the customer's
                electricity bills. A typical UK three-bedroom home uses 3,500 kWh/year; a
                four-bedroom home with an EV charger may use 6,000–8,000 kWh/year. Higher
                consumption justifies a larger system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — Apply UK yield factor:</strong> In the UK, 1 kWp of south-facing
                panels at 35° tilt generates approximately 850–950 kWh/year in southern England and
                750–850 kWh/year in Scotland. East/west splits yield 15–20% less than south-facing.
                Use PVGIS for a location-specific figure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — Check roof area:</strong> A 400 Wp panel is approximately 1.7 m².
                A 4 kWp system requires 10 panels and approximately 17 m² of usable roof area.
                Exclude areas affected by shading, vents, skylights, and the required 300 mm
                perimeter clearance under most MCS guidelines.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4 — Consider self-consumption:</strong> Larger systems export more
                and self-consume proportionally less. For a home without battery storage, a system
                sized to meet 80–100% of annual consumption is typically optimal. Adding battery
                storage improves self-consumption and justifies a larger array.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Current panel technology offers 400–430 Wp per panel for standard 60/66-cell modules,
          with premium panels reaching 450–500 Wp. Higher wattage panels reduce the number required
          and are increasingly cost-effective for UK installations.
        </p>
      </>
    ),
  },
  {
    id: 'string-design',
    heading: 'String Design for UK PV Arrays',
    content: (
      <>
        <p>
          String design determines how panels are electrically connected to the inverter. Each
          string is a series connection of panels — voltage adds, current stays constant. Getting
          string design right is critical to system performance and inverter longevity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum string voltage:</strong> Multiply the panel Voc by the number of
                panels, then apply a temperature correction for UK winter conditions. Use a
                temperature coefficient of approximately −0.29%/°C and assume a minimum ambient
                temperature of −10°C (giving a correction factor of approximately ×1.15). The
                resulting voltage must not exceed the inverter's maximum DC input voltage (typically
                600 V for residential, 1,000 V for commercial).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MPPT window:</strong> Multiply the panel Vmp by the number of panels and
                check that the resulting voltage falls within the inverter's MPPT (Maximum Power
                Point Tracking) voltage range at the expected operating temperature range. Both
                cold-weather (low irradiance, high voltage) and hot-weather (high irradiance, lower
                voltage) conditions must be checked.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shading and orientation:</strong> Panels on the same string must be on the
                same roof plane with the same orientation and tilt. Mixing south-facing and
                east-facing panels on one string dramatically reduces yield. Where shading is
                unavoidable, use DC power optimisers (e.g., SolarEdge, Tigo) or microinverters to
                mitigate mismatch losses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>String fusing:</strong> BS 7671 Section 712 requires consideration of
                reverse current protection. Where more than two strings are connected in parallel,
                string fuses or combiner boxes must be used to protect against reverse current
                damage. Single-string systems generally do not require fusing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'inverter-sizing',
    heading: 'Inverter Sizing: String vs Micro vs Hybrid',
    content: (
      <>
        <p>
          The inverter converts DC power from the array into AC power for the property and grid.
          Three main topologies are used in UK residential and small commercial installations,
          each with distinct design implications.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>String inverters</strong> — a single inverter handles one or more strings.
                The most cost-effective solution for unshaded, south-facing roofs. Inverter rating
                is typically sized at 80–100% of the array kWp (slight undersizing, known as DC
                clipping, is acceptable and often improves energy harvest in the UK's low-irradiance
                climate). Leading brands include SolarEdge, SMA, Fronius, and Growatt.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Microinverters</strong> — one small inverter per panel, eliminating string
                mismatch losses and providing per-panel monitoring. Ideal for complex roofs, partial
                shading, and east/west splits. Higher upfront cost but improved yield in challenging
                installations. Enphase is the dominant brand in the UK market.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hybrid inverters</strong> — combines a solar inverter with a battery
                charge controller. Required for DC-coupled battery storage (e.g., Givenergy, Solis,
                Growatt SPF). If battery storage is planned now or in the future, specifying a
                hybrid inverter avoids the cost of replacing the inverter when storage is added.
                Most hybrid inverters also include backup power functionality.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For UK residential installations, a 3.6 kW single-phase inverter is the most common
          choice for systems up to 4 kWp. Systems above 3.68 kW (16 A) require G99 notification
          to the DNO. Three-phase inverters are used where the property has a three-phase supply,
          balancing load across phases.
        </p>
      </>
    ),
  },
  {
    id: 'dc-cable-sizing',
    heading: 'DC Cable Sizing Under BS 7671 Section 712',
    content: (
      <>
        <p>
          DC wiring between the PV array and the inverter operates under continuous load conditions
          and must be sized in accordance with BS 7671:2018+A3:2024 Section 712, using specialist
          PV cable rated for outdoor and UV-exposed environments.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable type:</strong> Use EN 50618 (H1Z2Z2-K) double-insulated, halogen-free,
                UV-resistant solar DC cable. Standard twin-and-earth is not suitable. Minimum
                cross-section is typically 4 mm² for residential strings; 6 mm² for longer runs
                or higher current strings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Current rating:</strong> DC cable must be rated for 1.25 × Isc (short
                circuit current) of the string to allow for irradiance exceeding STC. Apply
                temperature derating for roof-mounted cables (installation method B or clipped
                direct in high-temperature environments).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage drop:</strong> Limit DC voltage drop to 3% (MCS 001 recommendation)
                between the array and the inverter DC input. Longer cable runs may require 6 mm²
                cable to keep voltage drop within limits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Routing and protection:</strong> Positive and negative conductors must be
                run together (or in the same conduit) to minimise loop inductance. Cables must be
                mechanically protected where accessible and labelled at both ends. Arc fault
                detection devices (AFCI) are now available and recommended where cables pass through
                occupied spaces.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ac-connection',
    heading: 'AC Connection Requirements',
    content: (
      <>
        <p>
          The AC output of the inverter must be connected to the property's consumer unit via a
          dedicated AC isolator and appropriately sized AC cable. The connection point and protection
          arrangements must comply with BS 7671 Section 712 and the inverter manufacturer's
          installation requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>AC isolator:</strong> A clearly labelled, lockable AC isolator must be
                installed adjacent to the inverter. This allows safe isolation of the inverter from
                the AC side without switching off the consumer unit. The isolator must be rated for
                the inverter output current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generation meter:</strong> A generation meter records total electricity
                produced by the system. Required for SEG export tariff applications. Many modern
                inverters include an integrated generation meter via their monitoring portal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit connection:</strong> The inverter AC output connects to a
                spare way in the existing consumer unit (or a new sub-board). The circuit must be
                protected by an appropriately rated MCB. RCD protection is provided by the inverter's
                built-in RCD function (most modern inverters include Type B RCD detection) and the
                consumer unit's existing RCD.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Export limiting:</strong> Where the DNO requires export limiting (common
                for G99 connections or where the local network is constrained), the inverter must
                be configured with a CT clamp or smart meter connection to limit export to the
                agreed level.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno-notification',
    heading: 'G99/G98 DNO Notification',
    content: (
      <>
        <p>
          All grid-connected solar PV systems must be notified to the Distribution Network
          Operator (DNO) before or after commissioning, depending on the system size. The relevant
          Engineering Recommendations are G98 (small systems) and G99 (larger systems).
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 — systems up to 16 A per phase (≤ 3.68 kW single-phase):</strong> The
                installer self-certifies and notifies the DNO within 28 days of commissioning.
                No prior approval is required. The DNO may inspect or request information but
                cannot normally object. The vast majority of UK residential systems fall under G98.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 — systems above 16 A per phase:</strong> Prior DNO application and
                approval is required before the system can be connected. The DNO has up to 45
                working days to respond. G99 applications require detailed design documentation
                including single-line diagrams, protection settings, and anti-islanding details.
                Budget for potential reinforcement costs if the local network is constrained.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart Export Guarantee (SEG) metering:</strong> Following DNO approval,
                the customer must apply to an SEG licensee (energy supplier) for an export tariff.
                A smart meter or export meter is required. DNO notification numbers should be
                included in the SEG application.
              </span>
            </li>
          </ul>
        </div>
        <p>
          DNO notification is separate from building regulations notification (which requires a
          Microgeneration Installation Certificate via a competent person scheme) and MCS
          certification. All three are required for a compliant, grant-eligible installation.
        </p>
      </>
    ),
  },
  {
    id: 'mcs-design',
    heading: 'MCS Design Requirements (MCS 001)',
    content: (
      <>
        <p>
          MCS 001 (Microgeneration Installation Standard: Issue 3.0) is the technical standard
          governing MCS-certified solar PV installations in the UK. Compliance is mandatory for
          installations to qualify for the Smart Export Guarantee and most grant schemes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design assessment:</strong> The installer must carry out a formal design
                assessment documenting system size, panel and inverter specifications, string
                configuration, shading analysis, roof orientation and tilt, and an energy yield
                estimate using PVGIS or equivalent software.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shading analysis:</strong> Horizon shading, near shading (chimneys, dormer
                windows, trees), and self-shading must all be assessed. Where shading losses exceed
                acceptable thresholds, the design must use optimisers or microinverters to
                mitigate the impact on yield.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS Product Directory:</strong> All panels, inverters, and batteries must
                be listed on the MCS Product Directory to be used in an MCS-certified installation.
                Check the directory before specifying products — not all panels available in the
                UK are listed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation certificate:</strong> On completion, the installer must issue
                an MCS Installation Certificate (MIC) and Handover Pack to the customer. The MIC
                is the document the customer needs for SEG applications, insurance, and property
                sales. It is registered on the MCS database.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Solar PV Design Documentation',
    content: (
      <>
        <p>
          MCS-certified solar PV installations require thorough design documentation before work
          begins and a complete certification package on completion. Organised electricians who
          produce professional design packages win more work and complete MCS paperwork faster.
        </p>
        <SEOAppBridge
          title="Certificate solar PV installations with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for electrical certification. Complete MCS installation certificates, EICRs, and Electrical Installation Certificates on your phone with instant PDF export. 7-day free trial."
          icon={Sun}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SolarPVSystemDesignPage() {
  return (
    <GuideTemplate
      title="Solar PV System Design UK | Designing a Solar Panel System"
      description="Complete guide to solar PV system design in the UK. kWp calculation, string design, inverter sizing, DC cable sizing, AC connection, G99/G98 DNO notification, and MCS 001 design requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Solar PV Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Solar PV System Design UK:{' '}
          <span className="text-yellow-400">Complete Design Guide</span>
        </>
      }
      heroSubtitle="Everything you need to design a solar PV system in the UK — from kWp sizing and string design to inverter selection, DC cable sizing, G99/G98 DNO notification, and MCS 001 compliance."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar PV System Design"
      relatedPages={relatedPages}
      ctaHeading="Manage Solar PV Installations with Elec-Mate"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for certification, quoting, and job management. Complete MCS documentation on your phone. 7-day free trial, cancel anytime."
    />
  );
}
