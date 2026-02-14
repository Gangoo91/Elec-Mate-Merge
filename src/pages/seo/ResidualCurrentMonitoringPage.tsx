import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Activity,
  Shield,
  Zap,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  ShieldCheck,
  FileCheck2,
  Calculator,
  GraduationCap,
  Car,
  Settings,
  BarChart3,
  Cable,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Residual Current Monitoring', href: '/guides/residual-current-monitoring' },
];

const tocItems = [
  { id: 'what-is-rcm', label: 'What Is Residual Current Monitoring?' },
  { id: 'rcm-vs-rcd', label: 'RCM vs RCD' },
  { id: 'applications', label: 'Applications' },
  { id: 'ev-charging', label: 'RCM in EV Charging' },
  { id: 'bs7671-requirements', label: 'BS 7671 Requirements' },
  { id: 'type-a-vs-type-b', label: 'Type A vs Type B Monitoring' },
  { id: 'dc-fault-detection', label: 'DC Fault Detection' },
  { id: 'installation-maintenance', label: 'Installation and Maintenance' },
  { id: 'elec-mate-rcm', label: 'RCM Documentation with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Residual current monitoring (RCM) continuously monitors earth leakage current in a circuit without automatically disconnecting the supply. It alerts the operator when residual current exceeds a set threshold, allowing planned maintenance rather than unplanned shutdowns.',
  'RCM differs from an RCD: an RCD disconnects the supply when a fault is detected; an RCM monitors and alerts but does not trip. RCM is used where automatic disconnection would cause unacceptable consequences (data centres, hospitals, process lines).',
  'EV chargers commonly use an integrated residual current monitoring device (RCMU) to detect DC fault currents above 6 mA, allowing a standard Type A RCD upstream instead of an expensive Type B RCD.',
  'BS 7671:2018+A3:2024 and the IET Code of Practice for EV Charging specify when RCM is required or acceptable as an alternative to automatic disconnection.',
  'Elec-Mate documents RCM device details on electrical certificates, including the device type, threshold setting, and alarm configuration — meeting the documentation requirements for inspection and testing.',
];

const faqs = [
  {
    question: 'What is the difference between an RCM and an RCD?',
    answer:
      'An RCD (Residual Current Device) detects residual current (earth leakage) and automatically disconnects the supply when the leakage exceeds its rated tripping current (typically 30 mA for personal protection, 100 mA or 300 mA for fire protection). It is a protective device that acts without human intervention. An RCM (Residual Current Monitor) also detects residual current, but instead of disconnecting the supply, it generates an alarm — visual, audible, or sent to a building management system. The circuit continues to operate. RCM is used in situations where automatic disconnection would cause greater harm than the fault itself: hospitals where life-support equipment must not be interrupted, data centres where server power must be maintained, and industrial processes where sudden shutdown could cause safety hazards or significant financial loss.',
  },
  {
    question: 'Where is residual current monitoring required by BS 7671?',
    answer:
      'BS 7671:2018+A3:2024 recognises residual current monitoring in several contexts. Regulation 411.6 addresses IT earthing systems (unearthed systems) where an insulation monitoring device (IMD) is used — this is a form of continuous monitoring. Regulation 531.3 covers residual current devices including monitoring types. The IET Guidance Note 3 (Inspection and Testing) and the IET Code of Practice for EV Charging provide specific guidance on when RCM is appropriate. For EV charging, the IET CoP allows an integrated RCMU (residual current monitoring unit) within the charger to detect DC fault currents as an alternative to an external Type B RCD. This is the most common application of RCM that UK electricians encounter in practice.',
  },
  {
    question: 'What is an RCMU in an EV charger?',
    answer:
      'An RCMU (Residual Current Monitoring Unit) is a device integrated into many EV chargers that continuously monitors for DC residual current on the charging circuit. If the RCMU detects a DC fault current above 6 mA, it disconnects the charger internally. This removes the need for an external Type B RCD upstream of the charger, which would cost significantly more (a Type B RCD typically costs over £200 compared to approximately £30 for a Type A RCD). Most reputable EV charger manufacturers now include an RCMU as standard, and their installation manuals specify that only a Type A RCD (30 mA) is required upstream. The RCMU handles the DC component of fault protection, while the upstream Type A RCD handles AC and pulsating DC fault protection.',
  },
  {
    question: 'Can residual current monitoring replace an RCD?',
    answer:
      'In general, no — RCM cannot replace an RCD for personal protection (protection against electric shock). BS 7671 requires automatic disconnection of supply for protection against electric shock in most installations, which means an RCD that physically disconnects the circuit. RCM alerts but does not disconnect. However, in specific applications where automatic disconnection is not appropriate (IT systems, medical locations, certain industrial installations), residual current monitoring combined with other protective measures can provide an equivalent level of safety. The decision to use RCM instead of an RCD must be made by the designer and documented in the design documentation. In the EV charging context, the RCMU inside the charger does disconnect the charger (not the circuit) — so it functions more like a specialised RCD within the charger itself.',
  },
  {
    question: 'What threshold should I set an RCM to?',
    answer:
      'The alarm threshold for an RCM depends on the application and the normal background leakage current of the circuit. For personal safety monitoring (where an RCD provides the primary protection), the RCM alarm is typically set at 50% to 70% of the RCD operating current — for example, 15 mA to 20 mA on a circuit protected by a 30 mA RCD. This gives an early warning that leakage is building up before the RCD trips. For fire protection monitoring (300 mA circuits), the alarm might be set at 150 mA to 200 mA. For insulation monitoring in IT systems, the alarm threshold is typically set based on the insulation resistance that represents the minimum acceptable level. The key principle is that the RCM alarm gives time to investigate and plan maintenance before the fault reaches a level that causes a trip or a safety hazard.',
  },
  {
    question: 'How does Type B residual current monitoring differ from Type A?',
    answer:
      'Type A monitoring detects AC sinusoidal residual currents and pulsating DC residual currents. These are the most common types of fault current in standard electrical installations. Type A is suitable for most domestic and commercial applications. Type B monitoring detects everything that Type A detects, plus smooth DC residual currents. Smooth DC fault currents can occur in installations with variable speed drives (VSDs), DC-side faults in solar PV inverters, and certain types of EV charger. Smooth DC can also blind a Type A RCD — meaning a DC fault could prevent the Type A device from detecting a subsequent AC fault. Type B monitoring and protection is more expensive but essential where smooth DC fault currents are a possibility. The EV charger RCMU is specifically designed to handle the DC component, which is why it can replace an external Type B RCD.',
  },
  {
    question: 'Do I need to test RCM devices during an EICR?',
    answer:
      'Yes. Any protective device in the installation, including RCM devices, should be verified during a periodic inspection (EICR). The EICR should record the presence of the RCM device, its type, its rated threshold, and whether it is functioning correctly. For RCM devices with test buttons, the test button should be operated to confirm the alarm activates. For EV charger RCMUs, the charger manufacturer installation manual will specify the test procedure — many chargers have a self-test function that runs automatically on each charging session. The inspector should verify that the RCMU is present and that the upstream RCD is of the correct type (typically Type A when an RCMU is installed). The RCM details should be recorded in the schedule of circuit details or observations on the EICR.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/rcd-testing-guide',
    title: 'RCD Testing Guide',
    description:
      'Complete guide to RCD testing procedures, trip times, and test sequences for UK electricians.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/iet-code-of-practice-ev',
    title: 'IET Code of Practice EV Charging',
    description:
      'Complete guide to EV charger installations including RCM requirements and O-PEN protection.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/guides/afdd-guide',
    title: 'AFDD Guide',
    description:
      'Arc fault detection devices — where they are required and how they work alongside RCDs and RCMs.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete reference to the current IET Wiring Regulations including Amendment 3.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates with full test result recording including RCM device documentation.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with training modules covering all testing procedures including RCD and RCM verification.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-rcm',
    heading: 'What Is Residual Current Monitoring?',
    content: (
      <>
        <p>
          Residual current monitoring (RCM) is a method of continuously measuring the earth leakage
          current (residual current) flowing in a circuit and generating an alarm when that current
          exceeds a pre-set threshold. Unlike a residual current device (RCD), which automatically
          disconnects the supply when a fault is detected, an RCM simply monitors and alerts —
          leaving the circuit energised and allowing the operator to investigate and plan
          maintenance.
        </p>
        <p>
          The technology works on the same principle as an RCD: a current transformer (toroid)
          surrounds the live and neutral conductors. In a healthy circuit, the current flowing out
          through the live conductor and returning through the neutral conductor is equal, and the
          net magnetic flux in the toroid is zero. If current is leaking to earth (through damaged
          insulation, a fault, or a person touching a live part), the outgoing and return currents
          are no longer equal, and the difference is detected by the toroid. The RCM processes this
          signal and triggers an alarm if it exceeds the threshold.
        </p>
        <p>
          RCM is used in situations where automatic disconnection would cause greater problems than
          the fault itself. Examples include: hospital critical care areas where power interruption
          could affect life-support equipment; data centres where server power must be maintained;
          industrial process lines where sudden shutdown could cause product damage, environmental
          contamination, or safety hazards; and installations where high availability is paramount.
        </p>
        <p>
          For UK electricians, the most common encounter with RCM technology is in EV charger
          installations, where an integrated RCMU (Residual Current Monitoring Unit) detects DC
          fault currents as an alternative to an external Type B RCD.
        </p>
      </>
    ),
  },
  {
    id: 'rcm-vs-rcd',
    heading: 'RCM vs RCD: What Is the Difference?',
    content: (
      <>
        <p>
          Understanding the distinction between RCM and RCD is essential for correct specification
          and installation:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white text-lg mb-3">RCD (Residual Current Device)</h4>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Detects residual current</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Automatically disconnects the supply</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>No human intervention needed</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Primary protection against electric shock</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Required by BS 7671 for most circuits</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h4 className="font-bold text-white text-lg mb-3">RCM (Residual Current Monitor)</h4>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <Activity className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Detects residual current</span>
              </li>
              <li className="flex items-start gap-2">
                <Activity className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Generates an alarm (does not disconnect)</span>
              </li>
              <li className="flex items-start gap-2">
                <Activity className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Requires human response to the alarm</span>
              </li>
              <li className="flex items-start gap-2">
                <Activity className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Used where disconnection is unacceptable</span>
              </li>
              <li className="flex items-start gap-2">
                <Activity className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Predictive maintenance tool</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          In practice, RCM and RCD are often used together. The{' '}
          <SEOInternalLink href="/guides/rcd-testing-guide">RCD</SEOInternalLink> provides automatic
          disconnection for fault protection, while the RCM provides early warning of degrading
          insulation or developing faults — allowing planned maintenance before the RCD trips and
          causes an unplanned outage.
        </p>
      </>
    ),
  },
  {
    id: 'applications',
    heading: 'Applications of Residual Current Monitoring',
    content: (
      <>
        <p>
          RCM is used across a range of critical installations where continuity of supply is
          essential:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Data centres:</strong> server power must be maintained 24/7. An RCM alarm
                allows the operations team to schedule maintenance during a planned window rather
                than suffering an unplanned RCD trip.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hospitals and medical locations:</strong> Group 2 medical locations
                (operating theatres, ICU) use IT earthing systems with insulation monitoring devices
                (a specialised form of RCM) to maintain supply continuity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industrial process lines:</strong> sudden disconnection of a chemical
                process, food production line, or metal smelting operation could cause safety
                hazards, product loss, or environmental damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charging:</strong> integrated RCMUs in EV chargers monitor for DC fault
                currents, allowing the use of less expensive Type A RCDs upstream. This is the most
                common RCM application for domestic electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Renewable energy systems:</strong> solar PV inverters and battery storage
                systems can produce DC fault currents that require monitoring.
              </span>
            </li>
          </ul>
        </div>
        <SEOInternalLink href="/guides/ev-charger-installation">
          See also: EV Charger Installation Guide for practical RCMU guidance
        </SEOInternalLink>
      </>
    ),
  },
  {
    id: 'ev-charging',
    heading: 'Residual Current Monitoring in EV Charging',
    content: (
      <>
        <p>
          The most common encounter with RCM for UK electricians is in EV charger installations.
          During AC charging, the charger converts AC to DC within the vehicle's onboard charger. If
          a fault develops in this conversion process, a DC component can appear on the AC circuit.
          A standard Type A RCD detects AC and pulsating DC faults but can be blinded by smooth DC —
          meaning a DC fault could prevent the Type A RCD from detecting a subsequent AC fault.
        </p>
        <p>
          The solution to this problem is either a Type B RCD (which detects all types of residual
          current including smooth DC) or an integrated RCMU within the charger that specifically
          monitors for DC fault currents above 6 mA. When the RCMU detects a DC fault, it
          disconnects the charger internally.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Cost Comparison</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <p className="text-white font-bold mb-1">Type B RCD (external)</p>
              <p className="text-2xl font-bold text-yellow-400">£200 to £350+</p>
              <p className="text-white text-sm mt-1">
                Detects all fault types. Expensive. Takes DIN rail space. Always required if charger
                has no built-in DC detection.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <p className="text-white font-bold mb-1">Type A RCD + charger RCMU</p>
              <p className="text-2xl font-bold text-yellow-400">£25 to £40</p>
              <p className="text-white text-sm mt-1">
                Type A RCD cost only. RCMU is built into the charger at no additional cost.
                Acceptable per IET CoP when charger has integrated DC detection.
              </p>
            </div>
          </div>
        </div>
        <p>
          Most reputable EV charger manufacturers (Zappi, Easee, Pod Point, Ohme, Wallbox, and
          others) now include an RCMU as standard. Their installation manuals specify that only a
          Type A RCD is required upstream. Always check the manufacturer documentation before
          specifying the protection devices — if the charger does not have integrated DC fault
          detection, a Type B RCD is mandatory.
        </p>
        <SEOAppBridge
          title="Document RCM devices on EV charger certificates"
          description="Elec-Mate's EV charger certificate template includes fields for RCMU type, manufacturer, and verification status. Record the protection arrangement accurately for scheme compliance and inspection readiness."
          icon={Car}
        />
      </>
    ),
  },
  {
    id: 'bs7671-requirements',
    heading: 'BS 7671 Requirements for Residual Current Monitoring',
    content: (
      <>
        <p>
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          addresses residual current monitoring in several regulations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 411.6 (IT Systems):</strong> requires an insulation monitoring
                device (IMD) to monitor the insulation resistance of the installation and generate
                an alarm on first fault. This is the original RCM application in BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 531.3:</strong> covers the selection and erection of RCDs,
                including guidance applicable to residual current monitoring devices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 722 (EV Charging):</strong> Section 722 specifically addresses
                electric vehicle charging installations and references the need for appropriate
                residual current protection including DC fault detection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IET Code of Practice for EV Charging (5th Edition):</strong> provides
                detailed guidance on RCMU requirements, acceptable alternatives to Type B RCDs, and
                the testing/verification of RCM devices during commissioning.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The key principle in BS 7671 is that automatic disconnection of supply is the primary
          method of fault protection (Regulation 411.3). RCM is not a substitute for this — it is an
          additional measure used in specific circumstances where automatic disconnection is not
          appropriate, or where early warning of developing faults is beneficial.
        </p>
      </>
    ),
  },
  {
    id: 'type-a-vs-type-b',
    heading: 'Type A vs Type B Residual Current Monitoring',
    content: (
      <>
        <p>
          Residual current devices and monitoring systems are classified by the type of fault
          current they can detect:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white text-lg mb-3">Type A</h4>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>AC sinusoidal residual currents</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Pulsating DC residual currents</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Suitable for most domestic circuits</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Cost: £25 to £40 (RCCB/RCBO)</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h4 className="font-bold text-white text-lg mb-3">Type B</h4>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <span>Everything Type A detects</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <span>Plus smooth DC residual currents</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <span>Required for VSDs, EV without RCMU</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <span>Cost: £200 to £350+</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          The significant cost difference between Type A and Type B devices is a key driver for the
          adoption of integrated RCMUs in EV chargers. By building DC fault detection into the
          charger itself, the manufacturer eliminates the need for an external Type B device —
          saving the installer and customer £150 to £300 per installation.
        </p>
        <p>
          There is also a Type F RCD, which detects the same fault types as Type A plus certain
          high-frequency residual currents generated by variable speed drives. Type F sits between
          Type A and Type B in capability and cost. It is specified for some inverter-driven
          equipment but is less commonly encountered than Type A and Type B.
        </p>
      </>
    ),
  },
  {
    id: 'dc-fault-detection',
    heading: 'DC Fault Detection and Why It Matters',
    content: (
      <>
        <p>
          DC fault currents are becoming increasingly common in modern electrical installations due
          to the proliferation of power electronic devices: EV chargers, solar PV inverters, battery
          storage systems, variable speed drives, and switch-mode power supplies. These devices
          convert between AC and DC, and faults can inject a DC component onto the AC circuit.
        </p>
        <p>
          The problem with DC fault current is that it can saturate the core of a Type AC or Type A
          RCD. When the core is saturated, the device may fail to detect a subsequent AC fault
          current — effectively rendering the RCD blind. This is a genuine safety concern: the
          circuit appears to be protected, but the RCD may not operate when needed.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">DC Blinding Risk</h4>
              <p className="text-white text-sm leading-relaxed">
                A smooth DC fault current as low as 6 mA can begin to affect the operation of a Type
                A RCD. At higher DC levels, the RCD may fail to trip at all — even with a
                significant AC fault current present. This is why DC fault detection (via Type B RCD
                or integrated RCMU) is essential in circuits supplying equipment with DC outputs.
              </p>
            </div>
          </div>
        </div>
        <p>
          The 6 mA DC threshold used by EV charger RCMUs comes from the IEC 62955 standard, which
          specifies the requirements for residual direct current detecting devices (RDC-DD) for EV
          charging. When the RCMU detects DC leakage above 6 mA, it disconnects the charger —
          preventing core saturation of the upstream Type A RCD.
        </p>
        <SEOInternalLink href="/guides/iet-code-of-practice-ev">
          See also: IET Code of Practice for EV Charging — detailed guidance on DC protection
        </SEOInternalLink>
      </>
    ),
  },
  {
    id: 'installation-maintenance',
    heading: 'Installation and Maintenance of RCM Systems',
    content: (
      <>
        <p>
          RCM devices should be installed and maintained following the manufacturer instructions and
          the relevant standards. Key considerations include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correct positioning:</strong> the RCM current transformer must encircle all
                live and neutral conductors of the circuit being monitored. The protective earth
                conductor must not pass through the toroid.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Threshold setting:</strong> set the alarm threshold based on the normal
                background leakage and the protection level required. Too low and the alarm will
                trigger on normal leakage; too high and genuine faults will not be detected early.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Alarm routing:</strong> ensure the alarm output is connected to a monitoring
                system that is attended 24/7 (building management system, alarm panel, or
                notification service). An alarm that nobody sees serves no purpose.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and verification:</strong> RCM devices should be tested during
                commissioning and during periodic inspections. Verify the alarm threshold, test
                button operation, and alarm routing. For EV charger RCMUs, follow the manufacturer
                test procedure.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'elec-mate-rcm',
    heading: 'Documenting RCM with Elec-Mate',
    content: (
      <>
        <p>
          Proper documentation of RCM devices is essential for inspection readiness and scheme
          compliance. Elec-Mate makes it easy:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">RCM on Electrical Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Record the RCM device type, manufacturer, threshold setting, and alarm
                  configuration in the schedule of circuit details. Elec-Mate's certificate
                  templates include fields for these details — ensuring nothing is missed.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EV Charger RCMU Verification</h4>
                <p className="text-white text-sm leading-relaxed">
                  The EV charger certificate template includes a dedicated section for RCMU
                  verification — confirming the charger has integrated DC fault detection and the
                  upstream protection is correctly specified.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Document every protection device correctly"
          description="Elec-Mate's certificate templates include dedicated fields for RCM devices, RCMU verification, and RCD type selection. Professional documentation that satisfies assessors and inspectors. 7-day free trial."
          icon={Activity}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ResidualCurrentMonitoringPage() {
  return (
    <GuideTemplate
      title="Residual Current Monitoring | RCM Guide UK"
      description="Complete guide to residual current monitoring (RCM) for UK electricians. RCM vs RCD, EV charger RCMU requirements, BS 7671 regulations, Type A vs Type B monitoring, DC fault detection, and how to document RCM devices on electrical certificates."
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Protection Guide"
      badgeIcon={Activity}
      heroTitle={
        <>
          Residual Current Monitoring:{' '}
          <span className="text-yellow-400">The Complete RCM Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Everything you need to know about residual current monitoring. RCM vs RCD differences, EV charger RCMU requirements, BS 7671 regulations, Type A vs Type B monitoring, DC fault detection, and documentation requirements for electrical certificates."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Residual Current Monitoring"
      relatedPages={relatedPages}
      ctaHeading="Document Protection Devices Professionally"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for electrical certificates with full protection device documentation. RCM, RCD, RCMU, and AFDD details captured correctly every time. 7-day free trial, cancel anytime."
    />
  );
}
