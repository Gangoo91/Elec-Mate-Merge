import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Sun,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  Search,
  TrendingDown,
  Zap,
  Settings,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Fault Finding', href: '/guides/electrical-fault-finding' },
  { label: 'Solar Panel Fault Finding', href: '/solar-panel-fault-finding' },
];

const tocItems = [
  { id: 'inverter-faults', label: 'Inverter Faults' },
  { id: 'dc-isolator', label: 'DC Isolator Issues' },
  { id: 'string-faults', label: 'String Faults' },
  { id: 'shading', label: 'Shading Problems' },
  { id: 'mcs-monitoring', label: 'MCS Monitoring' },
  { id: 'when-to-call', label: 'When to Call an MCS Installer' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "The most common cause of a solar PV system producing no output is an inverter fault — most inverters display fault codes and log events that make remote diagnosis straightforward via the manufacturer's monitoring app.",
  'DC isolator failures are a known issue on installations completed between 2010 and 2016. Faulty isolators can cause arc faults and fires; any DC isolator that is warm to the touch, discoloured, or showing increased contact resistance must be replaced immediately.',
  'String faults — caused by a failed panel, junction box failure, or broken string cable — cause partial output loss. The characteristic signature is one or more strings producing zero or reduced voltage while others remain normal.',
  'Shading from trees, chimneys, satellite dishes, or neighbouring buildings can reduce output by 10 to 40 per cent. MCS monitoring data showing consistent output reduction at predictable times of day typically points to a shading issue rather than an electrical fault.',
  'Any work on a solar PV electrical installation — including DC-side fault finding — must be carried out by an MCS-certified installer or a competent person with appropriate qualifications. The DC voltage on a string of panels can exceed 600 V and is present whenever there is daylight.',
];

const faqs = [
  {
    question: 'Why is my solar panel system not producing any electricity?',
    answer:
      'Zero output from a solar PV system is most commonly caused by an inverter fault or a tripped protective device. Check the inverter display or app for a fault code, check that the AC and DC isolators are in the ON position, and check the consumer unit for a tripped MCB on the generation circuit. If the inverter is showing a fault code and the protective devices are all closed, the fault is within the inverter or DC string — contact an MCS-certified installer.',
  },
  {
    question: 'My solar system is producing far less power than expected — what is wrong?',
    answer:
      'Partial output loss has several possible causes: partial shading from nearby objects (check for newly grown trees, new structures, or repositioned satellite dishes), a faulty panel or junction box on one string, soiling (dust, bird droppings, moss), DC isolator degradation, or inverter efficiency reduction. Compare current output against the monitoring history for the same time of year. A sudden drop suggests a fault; a gradual decline suggests soiling or shading.',
  },
  {
    question: 'My inverter is showing a fault code — what does it mean?',
    answer:
      "Inverter fault codes vary by manufacturer but fall into common categories: grid fault (inverter cannot synchronise with grid — check for a DNO power cut or local grid issue), isolation fault (DC insulation resistance has dropped — indicates a wiring or panel fault and requires immediate engineer attention), over-temperature (inverter too hot — check ventilation), and input voltage fault (string voltage too high or too low). The manufacturer's monitoring app or website usually explains the specific code and advises whether a self-reset is appropriate.",
  },
  {
    question: 'Can I reset my solar inverter myself?',
    answer:
      'A soft reset of the inverter (switching off via the AC isolator, waiting 30 seconds, then switching back on) is safe and often clears transient grid synchronisation faults. However, do not reset an inverter that is showing an isolation fault (insulation resistance alarm) — this indicates a potential wiring fault on the DC side that could create a fire or electric shock hazard. An isolation fault requires inspection by a qualified engineer before the system is restarted.',
  },
  {
    question: 'How dangerous is working on solar panels?',
    answer:
      'Solar PV systems present significant electrical hazards. The DC voltage on a string of panels can range from 200 V to over 1,000 V DC depending on the number of panels in series, and this voltage is present whenever there is any ambient light — it cannot be switched off. DC arcs at these voltages are sustained and extremely difficult to extinguish. Only persons with specific PV training (City and Guilds 2399 or equivalent) and appropriate insulated tools and PPE should work on the DC side of a solar installation.',
  },
  {
    question: 'What is an MCS-certified installer and do I need one?',
    answer:
      'MCS (Microgeneration Certification Scheme) is the quality standard for small-scale renewable energy installations in the UK. MCS certification is required for installers to certify new installations under the Smart Export Guarantee (SEG). For fault finding and repair work on existing systems, MCS certification is not strictly mandatory, but an MCS-certified installer will have the required competency and should be preferred. Using an unqualified person to work on the DC side of a solar installation is dangerous and may invalidate your insurance.',
  },
  {
    question: 'What is a DC arc fault on a solar installation?',
    answer:
      'A DC arc fault occurs when current jumps across a break or high-resistance connection in a DC circuit — most commonly at deteriorated DC isolator contacts, loose MC4 connector joints, or damaged cable insulation. DC arcs at PV system voltages are self-sustaining and can reach temperatures sufficient to ignite surrounding materials within seconds. DC arc fault circuit interrupters (DC-AFCI or AFDD) can detect and interrupt these faults; their installation is best practice on new PV systems and should be considered when servicing older installations.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/solar-pv-certificate',
    title: 'Solar PV Certificate App',
    description: 'Generate MCS-aligned Solar PV commissioning certificates on site with Elec-Mate.',
    icon: Sun,
    category: 'Certificate',
  },
  {
    href: '/guides/solar-pv-installation-guide',
    title: 'Solar PV Installation Guide',
    description: 'Complete guide to solar PV electrical installation requirements under BS 7671.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-fault-finding',
    title: 'Electrical Fault Finding',
    description: 'Systematic fault finding for domestic and commercial electrical installations.',
    icon: Search,
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
    id: 'inverter-faults',
    heading: 'Solar Inverter Faults',
    content: (
      <>
        <p>
          The inverter is the most complex component in a solar PV system and the most common source
          of faults. Modern string inverters monitor their own performance continuously and log
          fault events with timestamps, making remote diagnosis via the manufacturer's app or portal
          the first step in any fault investigation.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grid fault / grid disconnection</strong> — the inverter cannot synchronise
                with the grid frequency or voltage and has disconnected for safety (anti-islanding
                protection under G98/G99). Often a transient event that self-clears when the grid
                stabilises. If the fault recurs frequently, check for local grid quality issues with
                the distribution network operator (DNO).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation fault / insulation alarm</strong> — the inverter has detected that
                the DC insulation resistance between the PV string and earth has fallen below its
                minimum threshold (typically 1 MΩ). This can indicate damaged panel wiring, a faulty
                junction box, or water ingress into a connector. Do not reset the system — contact
                an MCS-certified installer immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Over-temperature shutdown</strong> — the inverter ambient or heatsink
                temperature has exceeded its operating limit. Common in summer with inadequate
                ventilation around wall-mounted inverters. Ensure a minimum clearance of 200 mm
                around the inverter on all sides as specified by most manufacturers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>MPPT / string voltage fault</strong> — the DC input voltage from the string
                is outside the inverter's maximum power point tracking (MPPT) window. This can occur
                if a panel has failed open-circuit (increasing string voltage) or failed
                short-circuit (reducing string voltage).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inverter end of life</strong> — string inverters typically have a service
                life of 10 to 15 years. Gradual efficiency reduction, increasing fan noise,
                capacitor swelling, or recurring faults on an older inverter may indicate that
                replacement is more cost-effective than repair.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dc-isolator',
    heading: 'DC Isolator Issues',
    content: (
      <>
        <p>
          DC isolators on solar PV installations — particularly those installed between
          approximately 2010 and 2016 — have been the subject of significant safety concerns.
          Certain isolator designs were found to suffer accelerated contact degradation, leading to
          increased contact resistance, overheating, and in some cases arc faults and fires.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warning signs of a failing DC isolator</strong> — the isolator enclosure is
                warm or hot to the touch during normal operation, the enclosure is discoloured or
                shows scorch marks, there is a burning smell near the isolator, or the system output
                has declined without another apparent cause. Any of these signs requires immediate
                action — switch off the system via the AC isolator and contact an MCS-certified
                installer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replacement requirement</strong> — the MHCLG and MCS issued guidance
                following a number of DC isolator fires. If your installation has the original DC
                isolator from 2010 to 2016 and it has not been inspected or replaced, arrange an
                inspection with an MCS-certified installer. Many installers offer free or subsidised
                DC isolator replacement campaigns.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contact resistance testing</strong> — a qualified engineer can measure
                contact resistance across the DC isolator contacts under load to identify
                degradation before it becomes a fire hazard. This is recommended as part of any
                periodic solar PV inspection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'string-faults',
    heading: 'String Faults',
    content: (
      <>
        <p>
          A string fault affects one or more panels within a series string, causing partial or total
          loss of output from that string. Multi-string inverters and systems with microinverters
          are more tolerant of single-panel faults, but series string systems (the most common
          configuration on UK residential roofs) will lose the entire string's output if one panel
          fails to conduct.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open-circuit panel failure</strong> — one panel in the string fails to
                conduct, breaking the series circuit. All panels in the string drop to zero output.
                The inverter will report a string voltage error. Diagnosis involves measuring open-
                circuit voltage across each panel to identify the failed unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Junction box failure</strong> — the junction box on the rear of each panel
                houses bypass diodes that allow current to route around shaded cells. Bypass diode
                failure can cause a panel to either block the string (open circuit) or short
                individual cells (reducing panel voltage). Junction box failures are identified by
                thermal imaging during irradiance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MC4 connector failure</strong> — the MC4 connectors used to link panels in a
                string can develop high-resistance connections due to incorrect mating, corrosion,
                or physical damage. High-resistance connections generate heat and can cause
                localised cable damage and arc faults. Visual inspection and IR thermography can
                identify hot connectors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>String cable damage</strong> — DC string cables routed across the roof can
                be damaged by UV degradation, physical abrasion, bird or vermin attack, or foot
                traffic during maintenance visits. Insulation damage causes leakage current,
                reducing insulation resistance and triggering the inverter isolation alarm.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'shading',
    heading: 'Shading Problems',
    content: (
      <>
        <p>
          Shading is a major cause of underperformance in UK solar PV systems. Even partial shading
          of a single cell in a series string can reduce the output of the entire string due to the
          bypass diode architecture. Identifying shading as the cause of underperformance requires
          comparing monitoring data against irradiance data for the location.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New shading sources</strong> — trees that have grown since installation, new
                neighbouring buildings, repositioned TV aerials or satellite dishes, and dormer
                extensions are common causes of shading that was not present during the original
                system design. Compare output against previous years at the same time of year to
                identify new shading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-shading</strong> — chimneys, roof features, and antenna masts on the
                same building can cast shadows at specific times of day. The shadow pattern is
                predictable — underperformance at a consistent time of day on sunny days suggests
                self-shading rather than a fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Soiling</strong> — bird droppings, leaves, moss, and dust accumulation shade
                individual cells and reduce output. Soiling is most prevalent in areas near woodland
                or with significant bird activity. Annual cleaning is recommended for most UK roof
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mitigation options</strong> — power optimisers or microinverters fitted to
                each panel allow module-level MPPT and dramatically reduce the impact of partial
                shading. For systems with significant new shading, retrofitting optimisers may be
                more cost-effective than other interventions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mcs-monitoring',
    heading: 'MCS Monitoring and Performance Tracking',
    content: (
      <>
        <p>
          MCS-certified installations are required to include a monitoring capability. Modern
          inverters provide cloud-connected monitoring that records generation data, fault events,
          and performance metrics. This data is the most powerful diagnostic tool available for
          fault finding without accessing the roof.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Performance ratio</strong> — the ratio of actual output to the theoretical
                maximum given the irradiance. A healthy UK residential system should maintain a
                performance ratio of 75 to 85 per cent. A sustained drop below 70 per cent (after
                accounting for temperature effects) warrants investigation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault event log</strong> — inverter monitoring platforms log every fault
                event with a timestamp and error code. Reviewing the fault log shows whether a fault
                is a one-off transient event or a recurring pattern that indicates a developing
                hardware problem.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>String-level monitoring</strong> — two-string and multi-MPPT inverters
                report voltage and current for each string independently. A discrepancy between
                strings under equal irradiance immediately localises the fault to the lower-output
                string and eliminates the inverter as the source.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-call',
    heading: 'When to Call an MCS-Certified Installer',
    content: (
      <>
        <p>
          Any electrical fault finding on the DC side of a solar PV installation requires a
          qualified person with specific PV training. The DC voltage present on a string of panels
          is potentially lethal and cannot be removed without covering the panels or waiting for
          darkness.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call immediately</strong> — any isolation fault alarm on the inverter, any
                burning smell or visible scorch marks near the DC isolator or inverter, any warm or
                discoloured DC isolator enclosure, or any physical damage to roof-mounted cables or
                connectors. Switch off via the AC isolator and call an MCS installer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call as soon as convenient</strong> — output below 70 per cent of expected
                performance for more than one week (after ruling out shading and soiling), recurring
                inverter fault codes, string voltage errors, or an inverter more than 12 years old
                that has not been serviced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify MCS certification</strong> — check the installer's MCS certificate
                number on the MCS installer database before commissioning work. MCS certification
                confirms the installer has the required training, tools, and insurance for PV
                electrical work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Solar PV Fault Finding and Certification',
    content: (
      <>
        <p>
          Solar PV fault finding and periodic inspection is an increasingly valuable specialist
          service. With over 1.3 million UK solar PV installations — many of them now 10 to 15 years
          old — there is growing demand for competent engineers who can diagnose faults, service
          aging systems, and issue compliant documentation.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Sun className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Solar PV Installation Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/solar-pv-certificate">
                    Elec-Mate Solar PV certificate app
                  </SEOInternalLink>{' '}
                  to generate commissioning certificates on site. Covers system design, test
                  results, DC isolator details, inverter data, and grid connection documentation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR for PV Installations</h4>
                <p className="text-white text-sm leading-relaxed">
                  When carrying out an EICR on a property with solar PV, the AC generation circuit
                  and export meter connection must be included. Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to record generation circuit test results and note the PV system details in the
                  schedule of particulars.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Certificate solar PV installations with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate to certificate solar PV installations, complete EICRs, and generate BS 7671-compliant documentation on site. 7-day free trial."
          icon={Sun}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SolarPanelFaultFindingPage() {
  return (
    <GuideTemplate
      title="Solar Panels Not Working | Solar PV Fault Finding Guide UK"
      description="Solar panels not working or underperforming? This guide covers inverter faults, DC isolator issues, string faults, shading problems, MCS monitoring, and when to call an MCS-certified installer."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fault Finding Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Solar Panels Not Working:{' '}
          <span className="text-yellow-400">Solar PV Fault Finding Guide</span>
        </>
      }
      heroSubtitle="Your solar PV system has stopped generating, is underperforming, or your inverter is showing a fault code. This guide explains the most common causes — inverter faults, DC isolator failures, string faults, shading — and tells you when you need an MCS-certified installer."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar Panel Faults"
      relatedPages={relatedPages}
      ctaHeading="Certificate Solar PV Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for solar PV commissioning certificates, EICRs, and BS 7671-compliant documentation. 7-day free trial, cancel anytime."
    />
  );
}
