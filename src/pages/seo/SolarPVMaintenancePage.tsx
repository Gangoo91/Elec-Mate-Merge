import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Sun,
  Zap,
  PoundSterling,
  ShieldCheck,
  ClipboardCheck,
  AlertTriangle,
  FileCheck2,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Solar Guides', href: '/solar-pv-system-design' },
  { label: 'Solar Panel Maintenance', href: '/solar-pv-maintenance' },
];

const tocItems = [
  { id: 'annual-inspection', label: 'Annual Inspection Checklist' },
  { id: 'cleaning', label: 'Panel Cleaning' },
  { id: 'inverter-replacement', label: 'Inverter Replacement' },
  { id: 'optimiser-checks', label: 'Optimiser & Microinverter Checks' },
  { id: 'monitoring', label: 'Monitoring System Setup' },
  { id: 'mcs-vs-diy', label: 'MCS Installer vs DIY Maintenance' },
  { id: 'output-drops', label: 'What to Check If Output Drops' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An annual inspection by a qualified electrician is recommended for all grid-connected solar PV systems. MCS Operational and Maintenance (O&M) guidelines suggest inspections at least every two years; annual is best practice.',
  'Professional panel cleaning costs £100–£200 for a typical UK domestic system and is recommended every 1–3 years depending on location (urban/agricultural areas accumulate more soiling).',
  'String inverters have an expected lifespan of 10–15 years — shorter than the 25-year panel warranty. Budget for at least one inverter replacement during the system lifetime. Replacement cost: £500–£1,500 for a residential string inverter.',
  'Optimisers and microinverters have longer rated lifespans (20–25 years) but individual unit failure can cause partial array output loss. Per-panel monitoring is the key benefit of these technologies.',
  'A monitoring system (most modern inverters include one) should alert the owner within 24 hours of a generation shortfall. If the system has not generated for 48 hours during daylight, investigate immediately.',
  'Electrical maintenance work on the PV system (including inverter replacement and fault investigation on DC circuits) must be carried out by a qualified electrician competent in PV systems — DC voltages can be lethal.',
];

const faqs = [
  {
    question: 'How often should solar panels be serviced in the UK?',
    answer:
      'MCS guidelines recommend a full operational and maintenance inspection at least every two years, but annual inspections are considered best practice by most UK solar installers. The inspection should cover the physical condition of the panels, mounting system, DC and AC cables, inverter, and all isolation points. In the UK, airborne soiling (particularly in agricultural areas near dusty roads, or urban areas with high particulate pollution) can reduce output by 5–15% if panels are not cleaned regularly. An annual or biennial clean is recommended alongside the inspection.',
  },
  {
    question: 'Do I need a qualified electrician to service my solar panels?',
    answer:
      'Physical cleaning of the panels can be carried out by a competent adult with appropriate access equipment, though professional cleaning companies with specialist tools generally achieve better results. However, any electrical work — including inverter checks, testing DC and AC circuits, replacing fuses or DC isolators, and any fault investigation — must be carried out by a qualified electrician who is competent in solar PV systems. DC circuits on a solar array can remain live even when the AC isolator is switched off, and voltages up to 600–1,000 V DC are present during daylight hours.',
  },
  {
    question: 'How much does it cost to clean solar panels professionally in the UK?',
    answer:
      'Professional solar panel cleaning in the UK typically costs £100–£200 for a standard domestic system (10–15 panels) on a single-storey roof accessible with a ladder and extending pole. Two-storey or difficult access roofs, or systems requiring scaffolding or specialist access equipment, cost more — £150–£400. Some cleaning companies use deionised water with soft brush systems to avoid streaking. Annual cleaning is recommended in urban areas and areas with significant bird activity, tree pollen, or agricultural dust.',
  },
  {
    question: 'How long does a solar inverter last and how much does replacement cost?',
    answer:
      'String inverters typically have a rated lifespan of 10–15 years, with most manufacturers offering a 5–10 year warranty extendable to 15–25 years for an additional cost. The inverter is the most likely component to require replacement during a 25-year system lifetime. Replacement cost for a residential string inverter (3–5 kW) is typically £500–£1,000 for the unit plus £150–£300 for installation and commissioning. Like-for-like replacements require DNO re-notification. Upgrading to a hybrid inverter during replacement (to add battery capability) typically costs £800–£1,500 for the unit plus installation.',
  },
  {
    question: 'My solar panels seem to be producing less energy than expected. What should I check?',
    answer:
      'First check the obvious: is it a particularly cloudy period? Compare against historical generation data for the same time of year. If generation is persistently below expectations, check the inverter display or monitoring portal for fault codes. Common causes include: soiled panels (check visually — bird droppings, moss, and leaf debris cause significant shading losses); inverter fault (error code will indicate the issue); a failed string or individual panel (visible on optimiser/microinverter monitoring); a failed DC isolator causing the string to be disconnected; or grid voltage issues preventing export (check for "grid fault" codes). If you cannot identify the cause from the monitoring data, commission a professional inspection with thermal imaging.',
  },
  {
    question: 'What is thermal imaging and when should it be used?',
    answer:
      'Thermal imaging (using an infrared camera) identifies panels with abnormal temperature profiles, which indicate faults such as hot spots (caused by cell damage, bypass diode failure, or shading), delamination, and solder joint failure. Hot spots on a single cell can cause permanent panel damage and create a fire risk over time. Thermal imaging inspections cost £150–£400 and are recommended where monitoring data indicates underperformance that cannot be explained by soiling, or as part of a comprehensive annual inspection on larger systems. A drone-mounted thermal camera provides the most thorough coverage.',
  },
  {
    question: 'Can I monitor my solar panels remotely?',
    answer:
      'Yes — most modern inverters include integrated Wi-Fi and connect to the manufacturer\'s monitoring platform (e.g., SolarEdge mySolarEdge, Fronius Solar.web, Solis Cloud, Givenergy App). These platforms display real-time and historical generation data, energy self-consumption vs export, and battery state of charge (where applicable). Most platforms provide email or push notification alerts if the system stops generating. For systems with older inverters without built-in monitoring, third-party monitoring devices such as the Efergy or Solar Analytics systems can be retrofitted. A generation meter reading logged weekly or monthly provides a simple baseline check.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/solar-pv-system-design',
    title: 'Solar PV System Design',
    description: 'System sizing, string design, inverter types, DC cable sizing, and G99/G98 notification.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/solar-battery-storage-installation',
    title: 'Solar Battery Storage Installation',
    description: 'AC-coupled vs DC-coupled storage, popular batteries, costs, and MCS requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/solar-pv-grants',
    title: 'Solar Panel Grants UK 2025',
    description: 'Smart Export Guarantee, 0% VAT, ECO4, and funding options explained.',
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
    id: 'annual-inspection',
    heading: 'Annual Solar PV Inspection Checklist',
    content: (
      <>
        <p>
          An annual inspection by a qualified electrician maintains system performance, identifies
          developing faults before they cause damage or safety issues, and satisfies most
          manufacturer warranty conditions. The inspection should cover:
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Panel condition:</strong> Inspect for physical damage (cracked glass,
                delamination, discolouration, hot spots), soiling (bird droppings, moss, lichen,
                leaf debris), and ensure no panels have shifted position within the mounting system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mounting system:</strong> Check all rail clamps, roof fixings, and
                inter-panel connectors for corrosion, loosening, or mechanical damage. In coastal
                areas or marine environments, check for salt corrosion on aluminium rails and
                stainless fasteners.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DC cabling and connectors:</strong> Inspect accessible DC cables for UV
                degradation, chafing, and connector integrity. MC4 connectors should be checked
                for secure engagement and signs of arcing or discolouration. Any damaged cable
                must be replaced immediately — do not use insulating tape as a repair on DC
                PV cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DC and AC isolators:</strong> Test operation of the roof-level DC isolator,
                inverter DC isolator, and AC isolator. Check for signs of overheating (discolouration,
                melting) around isolator terminals. Replace if any doubt about condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inverter:</strong> Check the inverter display for fault history, note any
                recorded errors. Clean the ventilation slots (dust accumulation reduces cooling
                efficiency and lifespan). Verify that the inverter firmware is up to date.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing and surge protection:</strong> Check earthing continuity of the
                array frame and mounting system. Inspect surge protection devices (SPDs) — most
                include a visual indicator showing if the SPD has operated and needs replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generation review:</strong> Compare actual annual generation (from the meter
                or monitoring portal) against the predicted yield from the original MCS design.
                A shortfall of more than 20% warrants further investigation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cleaning',
    heading: 'Solar Panel Cleaning: Professional vs DIY',
    content: (
      <>
        <p>
          In the UK, panels accumulate soiling from rainfall (which provides partial self-cleaning),
          bird droppings, pollen, airborne dust, and in rural areas, agricultural dust and
          fertiliser particles. Soiling losses of 5–15% are common where panels are not cleaned
          regularly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional cleaning — £100–£200:</strong> A professional service uses
                purified (deionised) water with a soft-bristle brush or water-fed pole system.
                Deionised water leaves no mineral residue on drying, preventing streaking. Annual
                professional cleaning is recommended for systems in urban areas, near trees, or
                with persistent bird activity. The cost is typically recovered in improved
                generation within one season.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DIY cleaning guidance:</strong> Use purified or filtered water — tap water
                leaves calcium deposits. A soft brush or sponge on an extendable pole, used from
                ground level or with appropriate fall protection, is effective for light soiling.
                Never use abrasive materials, high-pressure washers (which can damage inter-cell
                connections), or detergents that can leave residue. Clean in the morning before
                panels become hot — thermal shock from cold water on hot panels can cause micro-cracking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety:</strong> Never access the roof without appropriate fall protection.
                DC circuits remain live during daylight — do not touch cable connections or
                connectors during cleaning. If in doubt, contact a professional cleaning company
                with solar PV experience.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'inverter-replacement',
    heading: 'Inverter Replacement: Lifespan and Costs',
    content: (
      <>
        <p>
          The inverter is the component most likely to require replacement during a solar PV
          system's lifetime. Unlike panels (warranted for 25–30 years), string inverters typically
          have a rated lifespan of 10–15 years.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>When to replace:</strong> Signs that an inverter is failing include
                increasing frequency of fault codes, reduced generation during good weather,
                audible rattling or buzzing from internal fans, overheating shutdowns, and
                display failure. Inverters more than 12 years old should be proactively assessed
                for replacement to prevent unexpected failure and generation loss.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Like-for-like replacement:</strong> £500–£1,500 for the inverter plus
                £150–£300 installation. Ensure the replacement inverter is compatible with the
                existing string configuration. Re-notification to the DNO may be required if the
                inverter model changes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Upgrade opportunity:</strong> Inverter replacement is an ideal opportunity
                to upgrade to a hybrid inverter for future battery capability, or to a model with
                better monitoring and grid services. The additional cost compared to a like-for-like
                replacement is often modest.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'optimiser-checks',
    heading: 'Optimiser and Microinverter Checks',
    content: (
      <>
        <p>
          Systems fitted with DC power optimisers (e.g., SolarEdge, Tigo) or microinverters
          (e.g., Enphase) benefit from per-panel monitoring that makes fault diagnosis much easier.
          Annual checks should include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monitor individual unit performance:</strong> The monitoring portal for
                SolarEdge, Enphase Enlighten, or Tigo systems shows the output of each
                optimiser/microinverter. Any unit showing consistently lower output than its
                neighbours (accounting for shading) warrants physical inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Failed unit replacement:</strong> Individual optimiser failure is
                relatively rare (failure rates of less than 1% per year are typical) but the
                impact on a single panel is significant. Replacement of a failed SolarEdge P401
                optimiser costs approximately £70–£120 for the unit plus labour. Microinverter
                replacement costs £100–£200 per unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Communication issues:</strong> Optimiser monitoring systems use
                power-line communication (PLC) or RF. If units show as offline in the portal
                but are physically operational, check the gateway/hub firmware and Wi-Fi
                connection before assuming hardware failure.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'monitoring',
    heading: 'Setting Up a Monitoring System',
    content: (
      <>
        <p>
          A monitoring system provides real-time and historical generation data, enabling early
          detection of performance issues and helping customers understand how their system is
          performing. Most modern inverters include integrated monitoring.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inverter manufacturer portals:</strong> Most inverters (SolarEdge,
                Fronius, Growatt, Givenergy, Solis) provide free cloud monitoring via a dedicated
                app. The installer should commission and configure the monitoring at handover,
                with the customer set up on the app with their own login credentials.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Alert configuration:</strong> Enable email or push notification alerts
                for generation failure. A well-configured monitoring system should alert within
                24 hours if the system has not generated during normal daylight hours. Some
                platforms (e.g., SolarEdge, Fronius) offer automated fault detection with
                diagnostic reports.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Third-party monitoring:</strong> For older systems without built-in
                monitoring, clamp-based monitors (e.g., Emporia, Solar Analytics, or a smart
                home energy monitor) can be retrofitted to the AC generation circuit. These
                measure AC output and cannot provide panel-level data, but are sufficient to
                detect system-level faults.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mcs-vs-diy',
    heading: 'MCS Installer vs DIY Maintenance',
    content: (
      <>
        <p>
          Understanding which maintenance tasks require a qualified professional and which
          can be handled by the system owner is important for both safety and cost management.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS installer required:</strong> Any work on DC circuits (replacing
                connectors, isolators, string fuses, or DC cabling); inverter replacement;
                adding battery storage; modifying the string configuration; carrying out periodic
                electrical inspection and testing in accordance with BS 7671; and any work that
                triggers Part P notification. DC voltages on a solar array are live during
                daylight hours and cannot be isolated without specialist equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>System owner can do:</strong> Panel cleaning (with appropriate access
                safety); monitoring portal review and alert configuration; resetting the inverter
                after a grid fault (following manufacturer guidance — typically switching the AC
                isolator off and on); logging generation meter readings; and reporting faults to
                the installer.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'output-drops',
    heading: 'What to Check If Solar Output Drops',
    content: (
      <>
        <p>
          If your monitoring system or generation meter readings suggest output has fallen
          significantly, work through these checks systematically before calling an engineer:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weather comparison:</strong> Compare against the same period last year
                using the monitoring portal's historical data. UK irradiance varies significantly
                — a 30% generation shortfall is normal during an overcast fortnight compared to
                a sunny one.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inverter fault codes:</strong> Check the inverter display or monitoring
                portal for active or historic fault codes. Common faults include: grid overvoltage
                (the grid voltage is too high for the inverter to export — a growing issue in areas
                with high solar penetration); DC isolation failure (indicates a fault on the DC
                side); and communication errors (monitoring issue rather than generation fault).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual panel check:</strong> From ground level, check for obvious soiling,
                bird debris, or new shading sources (a tree that has grown, a new structure
                nearby). A single dirty or shaded panel on a standard string configuration can
                reduce the whole string's output significantly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call an engineer if:</strong> The inverter shows a persistent fault code,
                the system has not generated for more than two consecutive sunny days, you can
                smell burning near the inverter, or your monitoring data shows a sudden step-change
                in output that is not weather-related.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Building a Solar Maintenance Business',
    content: (
      <>
        <p>
          Annual solar PV maintenance contracts are an excellent source of recurring revenue for
          electricians who hold MCS certification. The UK has over 1.3 million solar PV
          installations — a large and growing base of systems requiring annual inspection,
          occasional cleaning, inverter replacement, and battery retrofit work.
        </p>
        <SEOAppBridge
          title="Manage solar maintenance jobs with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for job management, quoting, and certification. Issue inspection reports and EICs on your phone. 7-day free trial."
          icon={Sun}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SolarPVMaintenancePage() {
  return (
    <GuideTemplate
      title="Solar Panel Maintenance UK | Solar PV Servicing & Cleaning Guide"
      description="Complete guide to solar panel maintenance in the UK. Annual inspection checklist, professional cleaning costs £100–£200, inverter replacement, optimiser checks, monitoring setup, MCS installer vs DIY, and what to do if output drops."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Solar Maintenance Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Solar Panel Maintenance UK:{' '}
          <span className="text-yellow-400">Servicing & Cleaning Guide</span>
        </>
      }
      heroSubtitle="Everything homeowners and electricians need to know about maintaining solar PV systems in the UK — annual inspection checklists, cleaning costs, inverter lifespans, monitoring setup, and diagnosing output drops."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar Panel Maintenance"
      relatedPages={relatedPages}
      ctaHeading="Manage Solar PV Maintenance with Elec-Mate"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for job management, certification, and quoting. Issue solar maintenance reports on your phone. 7-day free trial, cancel anytime."
    />
  );
}
