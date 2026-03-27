import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldAlert,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  BatteryLow,
  Wifi,
  Search,
  Clock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Fault Finding', href: '/guides/electrical-fault-finding' },
  { label: 'Security Alarm Electrical Fault', href: '/security-alarm-electrical-fault' },
];

const tocItems = [
  { id: 'tamper-alerts', label: 'Tamper Alerts' },
  { id: 'low-battery', label: 'Low Battery Faults' },
  { id: 'power-supply', label: 'Power Supply Faults' },
  { id: 'communication', label: 'Communication Faults' },
  { id: 'reset-vs-engineer', label: 'When to Reset vs Call an Engineer' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Intruder alarm panels display fault conditions as a combination of LED indicators, displayed text, and audible tones. Understanding what each fault type means — tamper, low battery, power supply, line fault, or zone fault — is essential before attempting any reset or repair.',
  'Tamper alerts are a deliberate security feature. They are triggered when a detector cover is removed, a cable is cut, or the panel enclosure is opened without authorisation. Tamper alerts should never be disabled — investigate the cause and rectify it.',
  'Standby battery failure is the most common cause of security alarm faults in older installations. Most alarm panels specify a 12 V sealed lead-acid battery with a nominal 12 Ah capacity; a battery that fails to hold charge below 11.5 V under load must be replaced.',
  'A security alarm that is sounding in fault mode (intermittent bell or sounder activations at irregular intervals, often at night) is almost always suffering from a low battery, mains power loss, or communication system fault rather than a genuine intruder detection.',
  'Any work on the mains power supply section of a security alarm system must be carried out by a qualified electrician. The alarm panel transformer or switched-mode power supply unit is connected to the mains and must be treated as live electrical equipment.',
];

const faqs = [
  {
    question: 'Why is my security alarm beeping intermittently?',
    answer:
      'Intermittent beeping from a security alarm panel — particularly a series of short beeps or a slow regular tone — almost always indicates a fault condition rather than an intruder alert. The most common causes are a low or failing standby battery (voltage below approximately 11.5 V), a mains power supply fault (power cut, blown fuse, or failed transformer), a tamper alert on a detector or cable, or a communication system fault on a monitored system. Refer to the panel\'s user manual to identify the fault from the LED or display pattern.',
  },
  {
    question: 'My alarm has triggered a false alarm — how do I stop it?',
    answer:
      'To silence a false alarm, enter your valid user code at the keypad. This will disarm the system and silence the external sounder. Do not enter an engineer code unless you are the installing engineer — using the engineer code in an emergency may alter system programming. Once silent, identify the cause of the false alarm (check the panel display for the zone that triggered) before re-arming the system. Repeat false alarms from a specific zone require investigation by an engineer.',
  },
  {
    question: 'How long should my alarm battery last?',
    answer:
      'The standby battery in a typical domestic intruder alarm panel should last 3 to 5 years under normal conditions. A battery that fails within 2 years of installation may indicate a fault in the charging circuit (incorrect float voltage), a battery that has been deep-discharged by a prolonged mains failure, or a substandard replacement battery. Replace with the exact battery specification from the panel manual — incorrect capacity or chemistry can damage the charging circuit.',
  },
  {
    question: 'What is a tamper alert on a security alarm?',
    answer:
      'A tamper alert is generated when the tamper circuit — a normally-closed loop that monitors the integrity of detector covers, cable ducts, and the panel enclosure — is broken. Tamper circuits are a mandatory security feature of compliant alarm systems. A tamper alert should never be ignored or disabled — investigate which device has triggered (the panel display usually identifies the zone or device) and rectify the cause: re-fit a detector cover, repair a cut cable, or address unauthorised access to the panel.',
  },
  {
    question: 'My alarm panel shows a line fault — what does this mean?',
    answer:
      'A line fault on a monitored alarm system indicates that the communication path between the alarm panel and the monitoring centre (alarm receiving centre, ARC) has failed. This can be a telephone line fault, a broadband failure, a GSM SIM issue (expired, no signal, or blocked), or a dualpath communication failure. Line faults do not prevent the alarm from sounding locally but mean that the ARC will not receive alerts. Check broadband and mobile signal first, then contact the alarm company.',
  },
  {
    question: 'Can I replace my alarm battery myself?',
    answer:
      'Replacing the standby battery in most domestic alarm panels is within the capability of a competent DIY user, provided you follow the correct procedure: disarm the system, open the panel enclosure (this will trigger a tamper alert — note the existing programming before proceeding), disconnect the battery, connect the replacement (observing polarity), replace the enclosure, and acknowledge the tamper alert. However, if the panel is monitored, inform the ARC before and after battery replacement. If in doubt, contact the installing engineer.',
  },
  {
    question: 'When should I call an alarm engineer rather than a general electrician?',
    answer:
      'For most security alarm faults — zone faults, detector replacements, battery replacement, communication faults, and panel reprogramming — you need a specialist alarm engineer or security systems installer, not a general electrician. A general electrician is appropriate for faults on the dedicated mains supply circuit to the alarm panel (fused spur, consumer unit circuit, or mains wiring) but should not work on the alarm panel itself or its low-voltage wiring. For monitored systems, the ARC can often provide remote diagnostic support.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/fire-alarm-fault-finding',
    title: 'Fire Alarm Fault Finding',
    description: 'Zone faults, detector contamination, panel faults, and BS 5839 compliance.',
    icon: ShieldAlert,
    category: 'Guide',
  },
  {
    href: '/guides/emergency-lighting-fault-finding',
    title: 'Emergency Lighting Fault Finding',
    description: 'Battery failure, charging circuit faults, and BS 5266 testing requirements.',
    icon: ShieldCheck,
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
    id: 'tamper-alerts',
    heading: 'Tamper Alerts',
    content: (
      <>
        <p>
          The tamper circuit is one of the most important security features of a compliant intruder
          alarm installation. Every detection device, cable run, and the panel enclosure itself is
          monitored by a normally-closed tamper loop. Any break in this loop — whether caused by
          a detector cover being removed, a cable being cut, or an attempted intrusion into the
          panel — generates an immediate tamper alert.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Detector lid tamper</strong> — the most common tamper alert. A PIR or
                magnetic contact detector has had its cover removed, either accidentally (loose
                screw, impact) or deliberately. Identify the triggering device from the panel
                display, inspect it, and re-fit the cover securely. If the cover is missing or
                damaged, the detector must be replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable tamper / anti-cut</strong> — some installations include anti-cut
                monitoring on the zone wiring. A cable that has been cut, pinched, or developed
                an open circuit will trigger this tamper. Cable tampers in accessible locations
                (loft voids, cupboards) are a known vulnerability — investigate and repair the
                cable run.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Panel enclosure tamper</strong> — the panel cabinet has a tamper switch
                that triggers if the lid is removed. If this alert is showing without a legitimate
                reason for the panel to have been opened, treat this as a potential security
                incident — check that the panel has not been interfered with.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Never disable the tamper circuit</strong> — defeat of the tamper circuit
                on an alarm system is a security vulnerability. If the tamper alert cannot be
                cleared after investigation, call an alarm engineer — do not programme out the
                tamper function.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'low-battery',
    heading: 'Low Battery Faults',
    content: (
      <>
        <p>
          Standby battery failure is the most frequently encountered security alarm fault. The
          standby battery maintains system operation during mains power loss — it is a critical
          life-safety component for monitored systems and a compliance requirement for most
          commercial alarm installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BatteryLow className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Low battery threshold</strong> — most alarm panels generate a low battery
                warning when the standby battery voltage drops below approximately 11.5 V under
                load. This is typically 6 to 12 months before the battery fails completely, giving
                time for planned replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BatteryLow className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Night-time sounder activation</strong> — a low standby battery causes
                the alarm to sound intermittently, often in the early hours of the morning when
                ambient temperature is lowest (cold reduces battery voltage). This is a common
                and extremely disruptive fault. Replace the battery to resolve it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BatteryLow className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wireless detector batteries</strong> — in wireless alarm systems, each
                detector has its own battery, typically a lithium primary cell rated for 3 to 5
                years. Battery alerts from wireless detectors are shown on the panel display by
                zone or device. Replace wireless detector batteries in pairs (where applicable)
                and record the date.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BatteryLow className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Charging circuit fault</strong> — if a replacement battery also rapidly
                discharges, the fault is in the panel's battery charging circuit rather than the
                battery itself. The charging circuit is part of the panel electronics and requires
                engineer investigation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'power-supply',
    heading: 'Power Supply Faults',
    content: (
      <>
        <p>
          The mains power supply section of a security alarm panel converts 230 V AC to the
          low-voltage DC required by the panel electronics, detectors, and sounder circuits.
          A mains power fault will cause the system to run from the standby battery — a temporary
          measure that becomes a fault condition if the mains is not restored within a reasonable
          time.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mains power loss indication</strong> — most panels display a mains power
                fault (often a yellow or amber LED labelled AC or MAINS) when the 230 V supply
                to the panel is interrupted. The system continues to operate from the standby
                battery. Check for a tripped fused spur or MCB before assuming a panel fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Blown transformer fuse</strong> — the alarm panel transformer or SMPS
                may have an internal thermal fuse or a replaceable fuse on the panel PCB. A blown
                fuse is usually caused by a voltage transient, a fault in the bell or detector
                circuit, or an ageing transformer. This requires engineer attention — working inside
                an alarm panel on the mains section requires electrical competence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Failed transformer or SMPS</strong> — an alarm panel power supply that
                fails to charge the battery or provide operating voltage, confirmed by measuring
                the DC output, indicates a failed transformer or SMPS unit. Replacement requires
                the correct approved part for the panel model.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A general electrician can check and rectify the mains supply circuit to the alarm panel
          (the fused spur, the MCB, and the 230 V supply cable). Work inside the panel enclosure
          should be left to an alarm engineer.
        </p>
      </>
    ),
  },
  {
    id: 'communication',
    heading: 'Communication Faults on Monitored Systems',
    content: (
      <>
        <p>
          Monitored alarm systems send alerts to an alarm receiving centre (ARC) via telephone
          line, broadband, or GSM/4G cellular link. A communication fault means the ARC cannot
          receive alerts — the alarm will still sound locally, but police or key holder response
          will not be triggered.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PSTN line fault</strong> — traditional telephone line monitoring is being
                superseded by IP and cellular communication as the PSTN is phased out across the
                UK (scheduled completion 2027). Systems relying solely on PSTN should be upgraded
                to IP or cellular communication before the line is withdrawn.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP / broadband communication fault</strong> — broadband outages,
                router failures, or changes to router settings (firewall rules, IP address
                changes) can break IP signalling. Most IP alarm communicators require a static
                IP or a router that supports port forwarding to the alarm panel. Check broadband
                connectivity and router settings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>GSM / 4G cellular fault</strong> — cellular communicators rely on mobile
                network coverage. A SIM that has expired, been deactivated, or is out of credit
                will cause a communication fault. Check the SIM status with the alarm company and
                verify mobile network coverage at the panel location.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'reset-vs-engineer',
    heading: 'When to Reset Yourself vs When to Call an Engineer',
    content: (
      <>
        <p>
          Knowing when it is appropriate to reset an alarm fault yourself, and when to call a
          qualified alarm engineer, can save time and cost while keeping the system secure.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe to reset yourself</strong> — a low battery alert where you have
                already replaced the battery (acknowledging the fault clears the alert),
                a tamper alert caused by a detector cover you have re-fitted securely,
                a mains power loss alert following a known power cut that has now been restored,
                or a false alarm from a zone that you have identified and addressed (clean a dirty
                detector lens, re-fit a loose magnetic contact).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call an alarm engineer</strong> — any fault code you cannot identify from
                the manual, a tamper alert with no obvious physical cause, the alarm sounding
                during the set period without a zone trigger, a zone that repeatedly triggers
                false alarms, or any work that requires opening the panel enclosure and accessing
                the PCB or mains wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call an electrician (not the alarm company)</strong> — for a blown fuse
                or tripped MCB on the dedicated mains supply circuit to the alarm panel, damaged
                mains supply cable, or to advise on surge protection for the supply circuit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Security Alarm Electrical Work',
    content: (
      <>
        <p>
          Electricians are frequently asked to attend security alarm faults — particularly when
          the fault presents as a mains supply problem. Understanding the boundary between
          electrical installation work and alarm systems engineering helps set clear expectations
          with clients.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldAlert className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR and Security Alarm Systems</h4>
                <p className="text-white text-sm leading-relaxed">
                  When carrying out an EICR on a property with a security alarm, inspect and test
                  the dedicated mains supply circuit (typically a fused spur or small MCB). Note
                  the presence of the alarm system in the schedule of particulars. Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to record observations and generate the report on site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Minor Works on Alarm Supply Circuits</h4>
                <p className="text-white text-sm leading-relaxed">
                  Replacing a fused spur, adding surge protection, or rectifying a supply cable
                  fault on an alarm circuit requires a Minor Works Certificate. Use the{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Elec-Mate Minor Works app
                  </SEOInternalLink>{' '}
                  to generate compliant documentation on site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Generate electrical certificates on your phone with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for EICRs, minor works certificates, and BS 7671-compliant documentation. 7-day free trial."
          icon={ShieldAlert}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SecurityAlarmElectricalFaultPage() {
  return (
    <GuideTemplate
      title="Security Alarm Electrical Fault | Alarm Wiring Problems UK"
      description="Security alarm fault? This guide covers tamper alerts, low battery, power supply faults, communication faults, and when to reset versus call an alarm engineer."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fault Finding Guide"
      badgeIcon={ShieldAlert}
      heroTitle={
        <>
          Security Alarm Electrical Fault:{' '}
          <span className="text-yellow-400">Alarm Wiring Problems Explained</span>
        </>
      }
      heroSubtitle="Your security alarm is beeping, showing a fault indicator, or sounding unexpectedly. This guide explains tamper alerts, low battery faults, power supply problems, and communication failures — and tells you when to reset yourself versus when to call an engineer."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Security Alarm Faults"
      relatedPages={relatedPages}
      ctaHeading="Generate Electrical Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EICRs, minor works certificates, and BS 7671-compliant documentation. 7-day free trial, cancel anytime."
    />
  );
}
