import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  Search,
  Clock,
  Settings,
  WifiOff,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Fault Finding', href: '/guides/electrical-fault-finding' },
  { label: 'EV Charger Not Working', href: '/ev-charger-not-working' },
];

const tocItems = [
  { id: 'error-codes', label: 'Error Codes Explained' },
  { id: 'evse-communication', label: 'EVSE Communication Faults' },
  { id: 'supply-voltage', label: 'Supply Voltage Issues' },
  { id: 'rcd-tripping', label: 'RCD Nuisance Tripping' },
  { id: 'earthing-faults', label: 'Earthing Faults' },
  { id: 'when-to-call', label: 'When to Call an Installer' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Most home EV charger faults fall into five categories: error codes and EVSE communication failures, supply voltage problems, RCD nuisance tripping, earthing faults, and vehicle-side issues — understanding which category applies narrows diagnosis significantly.',
  'EVSE (Electric Vehicle Supply Equipment) communicates with the vehicle via the IEC 61851-1 pilot signal. A fault in this signal — often caused by a damaged cable, corroded connector, or faulty control board — will prevent charging from starting.',
  'Nuisance RCD tripping on EV charger circuits is common and is frequently caused by DC leakage from the vehicle\'s on-board charger. An RCD Type B (or Type A with DC leakage protection) is required under BS 7671:2018+A2:2022 Regulation 722.531.2.',
  'Earthing faults on EV charger installations — particularly missing or high-resistance earth paths — are a safety hazard and will prevent the EVSE from authorising a charge session. The installation must comply with BS 7671 Section 722.',
  'Only OZEV-approved (formerly OLEV-approved) installers should carry out rectification work on a home EV charger installation. Using an unapproved installer may invalidate the manufacturer warranty and any OZEV grant conditions.',
];

const faqs = [
  {
    question: 'Why does my EV charger show a red light but the car does nothing?',
    answer:
      'A solid or flashing red light typically indicates a fault condition detected by the EVSE. Common causes include a failed pilot signal (damaged cable or corroded connector), a supply voltage outside the acceptable range (usually 207 V to 253 V for a 230 V nominal supply), an earth fault detected by the EVSE\'s internal monitoring, or a tripped protective device on the dedicated circuit. Check the consumer unit for a tripped MCB or RCD before calling an engineer.',
  },
  {
    question: 'Why does my RCD keep tripping when I plug in my EV charger?',
    answer:
      'EV on-board chargers produce a small DC leakage current that can trip standard Type AC or Type A RCDs. BS 7671:2018+A2:2022 Regulation 722.531.2 requires RCD Type B, or a Type A RCD with additional DC leakage protection, on EV charger circuits. If your installation has an older Type AC RCD, upgrading to Type B or fitting an EV-specific Type A+DC device will usually resolve nuisance tripping. This work must be carried out by a qualified electrician.',
  },
  {
    question: 'My EV charger worked fine and then suddenly stopped — what happened?',
    answer:
      'Sudden failure on an otherwise working installation often indicates a supply issue (mains voltage dip, blown fuse, or tripped protective device), a firmware error in the charger unit (many smart chargers update overnight and can fail mid-update), a Wi-Fi connectivity loss preventing a smart charger from authenticating, or a vehicle-side fault. Restart the charger at the mains, check the manufacturer\'s app for error codes, and attempt a charge with a different vehicle if possible to isolate the fault.',
  },
  {
    question: 'Can I reset my home EV charger myself?',
    answer:
      'A soft reset (switching the unit off at the dedicated circuit breaker, waiting 30 seconds, and switching back on) is safe and often resolves temporary firmware or communication errors. Some units also have a physical reset button. However, you should not open the charger enclosure, adjust wiring, or attempt repairs yourself. If a reset does not resolve the fault, contact the manufacturer or an OZEV-approved installer.',
  },
  {
    question: 'What is the pilot signal on an EV charger?',
    answer:
      'The pilot signal is a ±12 V square wave sent by the EVSE (charger) to the vehicle on the control pilot pin of the Type 2 connector. The vehicle responds by applying a resistor that changes the signal amplitude. The EVSE reads the amplitude to determine whether a vehicle is connected (9 V), ready to charge (6 V), or requesting ventilation (3 V). A pilot signal outside these values — often caused by a damaged cable, dirty connector, or faulty control board — will prevent the charge session from starting.',
  },
  {
    question: 'Do I need a dedicated circuit for my home EV charger?',
    answer:
      'Yes. BS 7671:2018+A2:2022 Section 722 and most charger manufacturer installation requirements specify a dedicated final circuit for an EV charger rated at 7.4 kW (32 A single-phase) or higher. The circuit should be wired in 6 mm² cable (or 10 mm² for longer runs) with appropriate RCD protection. Sharing the circuit with other loads is not compliant and will cause nuisance tripping and potentially damage the vehicle\'s on-board charger.',
  },
  {
    question: 'When must I call an OZEV-approved installer?',
    answer:
      'You must use an OZEV-approved (Office for Zero Emission Vehicles) installer for any electrical work on a home EV charger installation — including fault finding and rectification — if you wish to maintain OZEV grant eligibility, manufacturer warranty, and Building Regulations compliance. OZEV approval is separate from NICEIC or NAPIT registration, though many registered electricians also hold OZEV approval. Check the OZEV approved installer list before commissioning any work.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description: 'Complete guide to home EV charger installation requirements under BS 7671 Section 722.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-types-explained',
    title: 'RCD Types Explained',
    description: 'Type AC, Type A, Type B, and Type F RCDs — which to use and why.',
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
  {
    href: '/tools/ev-charging-certificate',
    title: 'EV Charging Certificate',
    description: 'Generate EV charger installation certificates on site with Elec-Mate.',
    icon: Zap,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'error-codes',
    heading: 'EV Charger Error Codes Explained',
    content: (
      <>
        <p>
          Home EV chargers communicate faults through LED indicators, app notifications, and numeric
          or alphanumeric error codes. The exact codes vary by manufacturer, but the underlying
          fault categories are consistent across all EVSE equipment.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>E01 / CP fault</strong> — control pilot signal error. The EVSE cannot
                establish correct communication with the vehicle. Check the Type 2 cable for
                physical damage, clean the connector contacts, and try a different cable if
                available. If the fault persists with a known-good cable, the EVSE control board
                may be faulty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>E02 / Earth fault</strong> — the EVSE has detected an earth continuity
                or leakage fault. This is a safety interlock — the unit will not authorise charging
                until the earth path is verified. Do not attempt to defeat this interlock. An
                OZEV-approved electrician must inspect the earth conductor continuity and the
                protective bonding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>E03 / Over-voltage / Under-voltage</strong> — the supply voltage is
                outside the EVSE's acceptable operating window. UK nominal supply is 230 V with a
                permitted tolerance of +10%/−6% (216.2 V to 253 V under BS EN 50160). Values
                outside this range indicate a distribution network problem or a high-resistance
                connection in the supply cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>E04 / Over-temperature</strong> — the EVSE internal temperature has
                exceeded its operating limit. This can be caused by prolonged high-current charging
                in an enclosed space, inadequate ventilation around the unit, or an internal
                component failure. Allow the unit to cool before attempting a restart.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Network / authentication errors (smart chargers)</strong> — smart chargers
                that require cloud authentication (OCPP protocol) will refuse to start a charge
                session if the network connection is lost or the server is unavailable. Check Wi-Fi
                signal at the charger location, restart the router, and check the manufacturer's
                service status page.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always check the manufacturer's app or web portal first — most modern smart chargers log
          fault events with timestamps and error descriptions that significantly narrow the diagnosis.
        </p>
      </>
    ),
  },
  {
    id: 'evse-communication',
    heading: 'EVSE Communication Faults',
    content: (
      <>
        <p>
          The IEC 61851-1 standard defines how an EVSE (Electric Vehicle Supply Equipment) communicates
          with the vehicle. This communication happens via the control pilot (CP) and proximity pilot
          (PP) pins of the Type 2 connector. Faults in this communication path are one of the most
          common causes of home EV chargers appearing to work but failing to start a charge session.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <WifiOff className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damaged Type 2 cable</strong> — the most common EVSE communication fault.
                Inspect the cable along its full length for cuts, crushing, or heat damage. Pay
                particular attention to the area near the connectors where stress concentrates.
                Replace the cable if any damage is found — do not attempt to splice or repair it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <WifiOff className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Corroded or contaminated connectors</strong> — the Type 2 connector pins
                can corrode or accumulate contamination in outdoor installations. Inspect the
                connector contacts visually. Some manufacturers supply cleaning kits; others
                recommend replacement of the cable assembly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <WifiOff className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Faulty EVSE control board</strong> — if the cable tests good and the
                vehicle charges normally on another EVSE, the fault is in the charger's control
                electronics. Control board replacement is a warranty or manufacturer repair item
                and should not be attempted by the end user.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <WifiOff className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vehicle-side faults</strong> — some charge failures are caused by the
                vehicle's on-board charger (OBC) rather than the EVSE. Test with a different
                vehicle or a public charger to confirm. Vehicle OBC faults require dealership
                diagnosis.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'supply-voltage',
    heading: 'Supply Voltage Issues',
    content: (
      <>
        <p>
          Home EV chargers are among the highest continuous loads in a residential electrical
          installation — a 7.4 kW (32 A) charger running for 8 hours overnight draws significantly
          more energy than most other appliances. Supply voltage problems that are imperceptible
          under normal loads can become apparent when the EV charger is running.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Low incoming voltage</strong> — voltage below 216 V at the charger
                terminals (under BS EN 50160 limits) can trigger under-voltage protection. Measure
                the voltage at the consumer unit and at the charger terminals under full load. A
                significant voltage drop between the two points indicates an undersized or
                deteriorated supply cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High earth-neutral voltage</strong> — on a TN-C-S (PME) supply, the
                earth-neutral voltage should be less than 1 V. A higher value may indicate a poor
                neutral connection in the supply network. This can cause leakage-based RCD tripping
                and EVSE earth fault errors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage transients and harmonics</strong> — switching loads (inverters,
                VFDs) on the same distribution network can introduce voltage transients. Smart
                charger control electronics are sensitive to these. A surge protection device (SPD)
                at the consumer unit, required under BS 7671:2018+A2:2022 Regulation 443, can
                mitigate transient damage to the EVSE.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If low voltage is confirmed under load, the supply network operator (DNO) must be informed.
          The DNO is responsible for maintaining supply voltage within statutory limits to the
          meter terminals.
        </p>
      </>
    ),
  },
  {
    id: 'rcd-tripping',
    heading: 'RCD Nuisance Tripping',
    content: (
      <>
        <p>
          RCD nuisance tripping is one of the most frequently reported problems with home EV charger
          installations. Understanding the cause is essential — tripping is a safety response and
          should not be defeated by substituting a less sensitive RCD.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>DC leakage from on-board charger</strong> — the most common cause of
                nuisance tripping. Vehicle on-board chargers can produce a small DC component in
                their leakage current. Type AC and Type A RCDs are not designed to respond to DC
                leakage and can become desensitised or permanently biased open — which means they
                may fail to trip on a genuine AC fault. BS 7671:2018+A2:2022 Regulation 722.531.2
                requires either an RCD Type B, or a Type A RCD with an additional device providing
                DC leakage protection up to 6 mA. Compliant installation is essential.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation deterioration</strong> — if the installation cable has
                deteriorated insulation (particularly in outdoor or underground runs), leakage
                current may be sufficient to trip a correctly rated RCD. A 500 V DC insulation
                resistance test between conductors and between phase and earth should be performed
                on the circuit wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shared RCD with other loads</strong> — if the EV charger circuit shares
                an RCD with other circuits, accumulated leakage from multiple sources can sum to
                exceed the trip threshold. BS 7671 Section 722 requires a dedicated circuit for
                EV charging, which should also have its own RCD.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Never remove or bypass an RCD on an EV charger circuit. If nuisance tripping is occurring,
          the correct response is to identify and address the root cause with a qualified electrician.
        </p>
      </>
    ),
  },
  {
    id: 'earthing-faults',
    heading: 'Earthing Faults on EV Charger Installations',
    content: (
      <>
        <p>
          EV chargers incorporate earth continuity monitoring as a fundamental safety feature. The
          EVSE will not authorise a charging session if the earth path resistance is above the
          equipment's threshold — typically a few ohms. Earthing faults are therefore both a
          safety concern and a cause of operational failure.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Broken or missing earth conductor</strong> — the earth conductor in the
                EV charger circuit must have low resistance continuity from the charger back plate
                to the main earthing terminal. A broken or omitted earth conductor will trigger
                the EVSE earth fault interlock. This is confirmed with a low-resistance earth
                continuity test (R1+R2 measurement).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT supply earthing</strong> — properties with a TT earthing system
                (common in rural areas) require a local earth electrode. The electrode resistance
                must be low enough to ensure RCD operation under fault conditions. A high-resistance
                electrode can prevent the EVSE earth fault monitor from being satisfied.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME prohibition on outdoor sockets</strong> — BS 7671:2018+A2:2022
                Regulation 722.411.4 prohibits the use of the PME earthing terminal (TN-C-S) for
                outdoor EV charging points connected to the general mass of earth. An additional
                earth electrode is required in these situations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Corrosion at earth connections</strong> — outdoor EV charger installations
                are exposed to weather. Earth terminal connections within the charger enclosure and
                at the consumer unit can corrode over time, increasing resistance. Inspect and
                retighten all earth connections as part of routine maintenance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-call',
    heading: 'When to Call an OZEV-Approved Installer',
    content: (
      <>
        <p>
          Some EV charger faults can be resolved by the vehicle owner without specialist
          intervention — a soft reset, a cable swap, or a router restart. However, any fault
          involving the electrical installation itself requires a qualified electrician, and
          specifically an OZEV-approved installer for grant-related compliance.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call immediately</strong> — any earth fault error that persists after a
                soft reset, RCD tripping that cannot be explained by a simple load issue, visible
                scorch marks or burning smell from the charger or consumer unit, or water ingress
                into the charger enclosure. Switch off the dedicated circuit and do not use the
                charger until inspected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call as soon as convenient</strong> — persistent error codes that are not
                resolved by a soft reset, supply voltage readings outside the BS EN 50160 limits,
                nuisance RCD tripping more than once per month, or any physical damage to the
                charger enclosure or cable management.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify OZEV approval</strong> — check that your chosen electrician is
                listed on the OZEV approved installer register before commissioning any remedial
                work. OZEV approval is required to maintain compliance with grant conditions and
                to issue the correct completion documentation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Fault Finding and Certification',
    content: (
      <>
        <p>
          EV charger fault finding is a growing area of work for domestic electricians. As the
          UK EV fleet grows — there are now over a million registered EVs — the installed base
          of home chargers requiring maintenance and remediation is expanding rapidly.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Settings className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EV Charger Installation Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/ev-charging-certificate">
                    Elec-Mate EV charging certificate app
                  </SEOInternalLink>{' '}
                  to complete installation and minor works certificates on site. Covers BS 7671
                  Section 722 requirements, RCD type recording, earthing arrangement, and
                  OZEV compliance fields.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR for EV Charger Circuits</h4>
                <p className="text-white text-sm leading-relaxed">
                  When carrying out an EICR on a property with an existing EV charger, verify
                  RCD type, earth conductor continuity, and PME compliance at the charger location.
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to record observations against the specific circuit and generate the report on site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Certificate EV charger installations with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate to certificate EV charger installations, complete EICRs, and generate BS 7671-compliant documentation on site. 7-day free trial."
          icon={Zap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerNotWorkingPage() {
  return (
    <GuideTemplate
      title="EV Charger Not Working | Home EV Charger Fault Finding UK"
      description="Home EV charger not working? This guide explains error codes, EVSE communication faults, supply voltage issues, RCD nuisance tripping, earthing faults, and when to call an OZEV-approved installer."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fault Finding Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          EV Charger Not Working:{' '}
          <span className="text-yellow-400">Home EV Charger Fault Finding</span>
        </>
      }
      heroSubtitle="Your home EV charger has stopped working, is showing an error, or keeps tripping the RCD. This guide explains the five most common fault categories — error codes, EVSE communication, supply voltage, RCD tripping, and earthing — and tells you when to call an OZEV-approved installer."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Faults"
      relatedPages={relatedPages}
      ctaHeading="Certificate EV Charger Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EV charger installation certificates, EICRs, and BS 7671-compliant documentation. 7-day free trial, cancel anytime."
    />
  );
}
