import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  BellRing,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  ClipboardCheck,
  Search,
  Clock,
  Settings,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Fault Finding', href: '/guides/electrical-fault-finding' },
  { label: 'Fire Alarm Fault Finding', href: '/fire-alarm-fault-finding' },
];

const tocItems = [
  { id: 'zone-faults', label: 'Zone Faults' },
  { id: 'detector-contamination', label: 'Detector Contamination' },
  { id: 'panel-faults', label: 'Panel Faults' },
  { id: 'power-supply', label: 'Power Supply Issues' },
  { id: 'bs5839-compliance', label: 'BS 5839 Compliance' },
  { id: 'competent-person', label: 'When to Use a Competent Person' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Fire alarm systems must comply with BS 5839-1:2017 (fire detection and alarm systems for buildings — code of practice for design, installation, commissioning, and maintenance). Maintenance must be carried out by a competent person at least every 6 months.',
  'Zone faults — where the panel reports that a zone has an open or short circuit — are among the most common fire alarm faults. They are caused by wiring faults, device failures, or incorrect device connections within the zone loop.',
  "Detector contamination is the most common cause of false alarms from optical smoke detectors. Dust, insects, and steam ingress cause the detector's optical chamber to scatter light and trigger a fire signal. Contaminated detectors must be cleaned or replaced.",
  'Fire alarm panel faults — including CPU errors, memory corruption, and power supply module failure — require investigation by a competent fire alarm engineer, not a general electrician. Working inside a fire alarm panel without appropriate training risks disabling the fire detection system.',
  'Any person carrying out maintenance, testing, or fault finding on a fire alarm system should be competent in accordance with BS 5839-1:2017. In practice, this means being trained and experienced in fire alarm systems, not merely holding a general electrical qualification.',
];

const faqs = [
  {
    question: 'Why does my fire alarm keep going off for no reason?',
    answer:
      'Repeated false alarms (false activations without a fire condition) from a fire detection system are most commonly caused by: detector contamination (dust, insects, or cooking fumes in or near the detector), inappropriate detector type for the environment (ionisation detectors near kitchens, optical detectors in dusty areas), low standby battery causing voltage-related false activations, or wiring faults causing intermittent signal noise on the zone loop. The BS 5839-1:2017 false alarm management protocol requires investigation and rectification after more than 10 false alarms per zone per year.',
  },
  {
    question: 'What is a fire alarm zone fault?',
    answer:
      'A zone fault is reported by the fire alarm panel when the resistance or continuity of a zone circuit is outside the acceptable range. An open-circuit zone fault (resistance too high or infinite) can be caused by a broken wire, a failed detector, or a loose terminal connection. A short-circuit zone fault (resistance too low) can be caused by insulation damage between conductors, a failed device, or water ingress into a detector or junction box. The affected zone loses its detection capability until the fault is rectified.',
  },
  {
    question: 'How often must a fire alarm be serviced?',
    answer:
      'BS 5839-1:2017 recommends that fire alarm systems in commercial and public buildings are inspected and tested at least every 6 months by a competent person, with routine testing by the responsible person carried out weekly (for larger systems) or as specified in the system log book. Domestic Grade D systems (stand-alone detectors with mains power) should have their batteries tested monthly and the entire system tested annually. More frequent servicing is required in high-risk environments.',
  },
  {
    question: 'Can a general electrician service a fire alarm?',
    answer:
      'A general electrician can carry out electrical work on the mains supply to the fire alarm panel (the dedicated circuit from the consumer unit) and can replace a detector of the same type and specifications without reprogramming on a conventional system. However, fault finding on the fire alarm panel itself, reprogramming an addressable system, or commissioning or modifying a fire alarm installation requires a competent fire alarm engineer — someone trained and experienced specifically in fire alarm systems, which is a separate competency from general electrical installation work.',
  },
  {
    question: 'What is the difference between a conventional and addressable fire alarm?',
    answer:
      'A conventional fire alarm divides the building into zones, each with a wired loop of detectors and call points. When a device activates, the panel identifies the zone but not the specific device. An addressable (intelligent) fire alarm gives each device a unique address; when a device activates or reports a fault, the panel identifies the precise device. Addressable systems are required in larger or more complex premises under BS 5839-1 and make fault finding significantly easier — the panel identifies the specific device rather than just the zone.',
  },
  {
    question: 'What should I do if the fire alarm panel shows a fault but no alarm?',
    answer:
      'A fault condition (typically shown by an amber LED and a fault description on the panel display) indicates a problem with the fire alarm system that does not represent an active fire signal. The building does not need to be evacuated. Record the fault description, investigate the cause using the guidance in this page, and arrange for a competent fire alarm engineer to rectify the fault as soon as practicable. The fault log in the fire alarm log book must be updated. Do not simply silence and ignore repeated fault conditions.',
  },
  {
    question: 'My fire alarm is chirping or beeping — what does this mean?',
    answer:
      'A repeated chirping or beeping sound from a fire alarm panel or sounder, without a full alarm activation, almost always indicates a power supply fault — most commonly a low or failing standby battery. Some panels emit a slow beep for a mains power loss and a faster beep for a low battery. Check the panel display for a fault message, check that the mains supply to the panel is intact, and arrange battery replacement if indicated. Do not silence a chirping alarm and leave it uninvestigated.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/emergency-lighting-fault-finding',
    title: 'Emergency Lighting Fault Finding',
    description: 'Battery failure, charging circuit faults, and BS 5266 testing requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/security-alarm-electrical-fault',
    title: 'Security Alarm Electrical Fault',
    description: 'Tamper alerts, low battery, power supply faults, and communication failures.',
    icon: BellRing,
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
    href: '/tools/fire-alarm-certificate',
    title: 'Fire Alarm Certificate App',
    description: 'Generate fire alarm installation and commissioning certificates on site.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/hmo-electrical-requirements',
    title: 'HMO Electrical Requirements',
    description:
      'Fire alarm and emergency lighting requirements for Houses in Multiple Occupation.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'zone-faults',
    heading: 'Zone Faults',
    content: (
      <>
        <p>
          A zone fault is one of the most common conditions displayed on a fire alarm panel. It
          indicates that the resistance of the zone detection loop is outside the panel's acceptable
          range — either too high (open circuit) or too low (short circuit). A zone in fault
          condition cannot detect a fire condition in that area until the fault is rectified, making
          prompt investigation essential.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open-circuit zone fault</strong> — caused by a broken conductor in the zone
                wiring, a loose or corroded terminal connection, or a failed detector or call point.
                On a conventional system, isolate sections of the zone loop to locate the break. On
                an addressable system, the panel identifies the specific device or loop segment
                where the open circuit exists.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Short-circuit zone fault</strong> — caused by insulation damage between the
                two conductors of the zone loop (often due to mechanical damage, rodent attack, or
                water ingress), an incorrectly wired device, or a device with an internal short
                circuit. Short-circuit faults on conventional systems render the entire zone
                inoperative. Addressable systems with short-circuit isolators (SCI) can isolate the
                fault and maintain operation of the remaining devices on the loop.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Device failure</strong> — a detector or call point with an internal fault
                can cause a zone fault. On addressable systems, the panel identifies the specific
                device address. Replace the device with the correct specified type and re-commission
                if required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Interim measures</strong> — while a zone fault is active, the fire risk
                assessment for the premises must be reviewed. Where an entire zone is out of
                service, additional fire watch patrols or temporary detection measures may be
                required. Notify the responsible person and record the fault condition in the fire
                alarm log book.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'detector-contamination',
    heading: 'Detector Contamination',
    content: (
      <>
        <p>
          Detector contamination is the leading cause of false alarms in optical smoke detection
          systems and one of the most common reasons for detector failure. In the UK, the fire and
          rescue services attend over 200,000 false alarm activations per year — a significant
          proportion of which are caused by contaminated or inappropriately sited detectors.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dust contamination</strong> — the most common contaminant in optical smoke
                detectors. Dust particles settle in or near the optical chamber and scatter light,
                creating a signal that the detector interprets as smoke. Detectors in dusty
                environments (construction sites, food production, woodworking) require more
                frequent inspection and cleaning or should be replaced with a detector type more
                suitable for the environment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insect intrusion</strong> — insects entering the optical chamber of a smoke
                detector are a well-documented cause of false alarms. Inspect detectors in areas
                with insect activity and consider insect-resistant detector designs for vulnerable
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Steam and cooking fumes</strong> — detectors located too close to kitchens,
                shower rooms, or steam sources are exposed to high humidity and aerosol particles
                that can trigger false alarms. Exclusion zones around kitchens and bathrooms are
                specified in BS 5839-1 — detectors should not be located within 1.5 m of permanently
                open kitchen doorways.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cleaning procedure</strong> — approved cleaning of a smoke detector involves
                careful vacuuming of the detector chamber using a soft brush attachment. Never use
                compressed air (which forces contamination deeper into the chamber), cleaning
                solvents, or water. If the detector continues to false alarm after cleaning, replace
                it.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'panel-faults',
    heading: 'Fire Alarm Panel Faults',
    content: (
      <>
        <p>
          The fire alarm control panel (FACP) is the system hub — it monitors all zone loops and
          devices, processes fire and fault signals, and controls output functions including
          sounders, evacuation interfaces, and remote signalling. Panel faults require immediate
          attention from a competent fire alarm engineer.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>System fault / CPU fault</strong> — a fault reported against the panel
                itself (rather than a zone or device) indicates an internal panel hardware or
                software fault. This may be a failed output module, a firmware corruption, or a
                hardware component failure. Do not attempt to open the panel or probe the
                electronics — contact the fire alarm installer or manufacturer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Memory or programming fault</strong> — addressable fire alarm panels store
                device programming in non-volatile memory. Memory corruption (typically caused by a
                voltage transient or battery failure during programming) can cause the panel to
                report all devices as faulted or to behave erratically. A programming reload from a
                backup may be required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sounder or relay module fault</strong> — a fault on the sounder supply
                circuit or relay output module will prevent the sounders or ancillary outputs from
                operating during a fire signal. This is a critical life-safety fault — the building
                evacuation signalling capability is compromised. Arrange urgent repair.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Isolating a faulty zone or device on a fire alarm panel using the panel's own isolation
          function is within the capability of a trained user. Opening the panel enclosure to work
          on the electronics is not — this must be done by a competent fire alarm engineer.
        </p>
      </>
    ),
  },
  {
    id: 'power-supply',
    heading: 'Power Supply Issues',
    content: (
      <>
        <p>
          Fire alarm control panels require a reliable mains power supply and a standby battery
          capable of maintaining system operation for a minimum period following mains failure. BS
          5839-1:2017 specifies minimum standby durations based on the premises category.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mains power loss</strong> — the panel should indicate mains power loss via
                an amber LED and continue operating from the standby battery. The mains supply
                circuit (a dedicated final circuit from the consumer unit, fused at 6 A) must be
                restored as soon as possible. A mains supply that is frequently interrupting —
                without a known power cut — indicates a wiring fault or MCB problem on the dedicated
                circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standby battery fault</strong> — a battery fault reported by the panel
                indicates that the standby battery has failed, is not connected, or is not accepting
                charge. Replace with the battery type and capacity specified in the panel
                documentation. BS 5839-1 requires a minimum standby duration of 24 hours (or 72
                hours for certain premises categories) plus 30 minutes of alarm operation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PSU module failure</strong> — the power supply unit within the fire alarm
                panel converts mains AC to the panel's DC operating voltage and charges the standby
                battery. A failed PSU module causes both mains power fault and battery fault
                indicators. PSU replacement must be carried out by a competent fire alarm engineer
                using the correct spare part for the panel model.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bs5839-compliance',
    heading: 'BS 5839 Compliance and Legal Requirements',
    content: (
      <>
        <p>
          BS 5839-1:2017 is the UK code of practice for fire detection and alarm systems in
          buildings. While it is not itself a statutory document, it is referenced in guidance to
          the Regulatory Reform (Fire Safety) Order 2005, which imposes legal duties on responsible
          persons in non-domestic premises. Non-compliance with BS 5839-1 can result in enforcement
          action by the fire authority.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Six-monthly servicing</strong> — BS 5839-1 recommends inspection and testing
                of commercial fire alarm systems at not less than six-monthly intervals by a
                competent person. At each visit, all detectors, call points, sounders, and panel
                functions must be tested. The service certificate and log book must be updated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weekly testing (larger systems)</strong> — in buildings with a large
                installed base of detectors, a different zone or call point should be tested each
                week on a rolling basis. This ensures all devices are tested at least annually
                between formal service visits. Results must be recorded in the log book.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm log book</strong> — the log book must record every test, every
                fault event and its resolution, every false alarm, and all maintenance work carried
                out on the system. The log book should be kept adjacent to the fire alarm panel and
                be readily accessible to the fire authority on request.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BAFE certification</strong> — the British Approvals for Fire Equipment
                (BAFE) scheme provides third-party certification for fire alarm maintenance
                companies. Many insurance policies and local authority licence conditions require
                that fire alarm maintenance is carried out by a BAFE-registered company.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'competent-person',
    heading: 'When to Use a Competent Person',
    content: (
      <>
        <p>
          The term "competent person" in the context of fire alarm systems has a specific meaning
          under BS 5839-1:2017. It refers to a person who has sufficient training, experience, and
          knowledge of fire alarm systems to safely carry out the work in question — which is a
          higher bar than a general electrical qualification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Work requiring a fire alarm competent person</strong> — fault finding on
                zone loops and devices, detector replacement on addressable systems requiring
                programming, panel configuration or reprogramming, commissioning, any modification
                to the system design, and all formal servicing visits. This is the majority of fire
                alarm work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Work a general electrician can carry out</strong> — the dedicated mains
                supply circuit to the fire alarm panel, including the MCB, cable, and termination at
                the panel. This is standard electrical installation work. The electrician should not
                need to access the panel's internal electronics.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not disable or silence persistent faults</strong> — a fire alarm fault
                that cannot be resolved must be reported to the responsible person and a competent
                fire alarm engineer called promptly. In the interim, the fault condition should be
                left on the panel display (not permanently silenced) and recorded in the log book.
                Silencing a persistent fault without investigation creates a false sense of
                security.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Fire Alarm Electrical Work and Certification',
    content: (
      <>
        <p>
          Electricians working in commercial premises will regularly encounter fire alarm systems as
          part of EICR work, new installation projects, and maintenance contracts. Understanding the
          boundary between electrical installation work and fire alarm engineering is essential for
          both safety and liability reasons.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <BellRing className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Fire Alarm on the EICR</h4>
                <p className="text-white text-sm leading-relaxed">
                  When carrying out an EICR on commercial premises, inspect and test the dedicated
                  mains supply circuit to the fire alarm panel. Record the circuit details, test
                  results, and note the fire alarm system type in the schedule of particulars. Use
                  the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to capture all observations and generate the report on site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Fire Alarm Installation Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  If you are a competent fire alarm engineer, use the{' '}
                  <SEOInternalLink href="/tools/fire-alarm-certificate">
                    Elec-Mate fire alarm certificate app
                  </SEOInternalLink>{' '}
                  to generate installation and commissioning certificates on site. Covers system
                  type, zone schedule, device schedule, test results, and BS 5839-1 compliance
                  fields.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage fire alarm electrical work with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for EICRs, fire alarm certificates, and BS 7671-compliant documentation. 7-day free trial."
          icon={BellRing}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FireAlarmFaultFindingPage() {
  return (
    <GuideTemplate
      title="Fire Alarm Fault Finding | Fire Detection System Problems UK"
      description="Fire alarm fault? This guide covers zone faults, detector contamination, panel faults, power supply issues, BS 5839 compliance, and when to use a competent fire alarm engineer."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fault Finding Guide"
      badgeIcon={BellRing}
      heroTitle={
        <>
          Fire Alarm Fault Finding:{' '}
          <span className="text-yellow-400">Fire Detection System Problems Explained</span>
        </>
      }
      heroSubtitle="Your fire alarm is showing a fault condition, producing false alarms, or failing to function correctly. This guide covers zone faults, detector contamination, panel faults, power supply issues, BS 5839 compliance, and when you must use a competent fire alarm engineer."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Fire Alarm Faults"
      relatedPages={relatedPages}
      ctaHeading="Manage Fire Alarm Electrical Work with Elec-Mate"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICRs, fire alarm certificates, and compliant documentation. 7-day free trial, cancel anytime."
    />
  );
}
