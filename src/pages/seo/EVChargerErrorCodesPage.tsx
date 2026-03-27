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
  Cable,
  Wrench,
  Phone,
  Car,
  CircuitBoard,
  PlugZap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'EV Charger Error Codes', href: '/guides/ev-charger-error-codes' },
];

const tocItems = [
  { id: 'overview', label: 'Understanding EV Charger Errors' },
  { id: 'zappi-codes', label: 'Zappi Error Codes' },
  { id: 'pod-point-codes', label: 'Pod Point Error Codes' },
  { id: 'andersen-codes', label: 'Andersen Error Codes' },
  { id: 'rcd-trip', label: 'RCD Tripping on EV Chargers' },
  { id: 'earth-fault', label: 'Earth Fault Indicators' },
  { id: 'overcurrent', label: 'Overcurrent Protection Faults' },
  { id: 'communication-fault', label: 'Communication Faults' },
  { id: 'when-to-call', label: 'When to Call an Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'EV charger error codes vary by manufacturer but typically fall into categories: RCD trip, earth fault, overcurrent, communication fault, and temperature fault. Understanding the category helps determine urgency.',
  'Regulation 411.3.3 of BS 7671 requires RCD protection with a rated residual operating current not exceeding 30mA for circuits supplying socket-outlets with a rated current not exceeding 32A. EV charger circuits must comply with this requirement.',
  'Zappi, Pod Point, and Andersen chargers each display errors differently — Zappi uses LED colour sequences, Pod Point uses app notifications and LED patterns, and Andersen uses display screen codes.',
  'Earth fault errors are safety-critical. If your charger reports an earth fault, do not attempt to override or reset repeatedly. The charger is detecting a genuine protective conductor issue that needs professional investigation.',
  'Many EV charger faults are caused by installation issues rather than charger defects — incorrect earthing arrangements, inadequate cable sizing, or incompatible RCD types are common root causes.',
  'Type A RCDs may not detect smooth DC fault currents that can occur with EV charger rectification. BS 7671 Regulation 722.531.2 requires Type A RCD protection as a minimum for EV charging circuits, and Type B or Type B+ may be required depending on the charger manufacturer.',
];

const faqs = [
  {
    question: 'Why does my EV charger keep tripping the RCD?',
    answer:
      'EV chargers can trip RCDs for several reasons. The most common is an incompatible RCD type — many chargers produce small DC leakage currents during charging that can cause Type AC RCDs to malfunction. BS 7671 Regulation 722.531.2 requires at minimum a Type A RCD for EV charging circuits, and some manufacturers specify Type B or Type B+. Other causes include genuine earth faults in the charger or vehicle, moisture ingress (particularly in outdoor installations), or a faulty charger. If the RCD trips every time charging begins, the RCD type is the most likely issue. If it trips intermittently, moisture or a developing fault in the charger or vehicle is more likely.',
  },
  {
    question: 'What does an earth fault error mean on my EV charger?',
    answer:
      'An earth fault error means the charger has detected current flowing through the protective earth conductor when it should not be. This is a safety-critical indication. The fault could be in the charger itself, in the charging cable, in the vehicle\'s onboard charger, or in the fixed wiring between the consumer unit and the charger. Do not repeatedly reset the charger to override this error — it exists to prevent electric shock. Have a qualified electrician test the circuit, including insulation resistance testing at 500V DC on the fixed wiring, and earth fault loop impedance measurement to verify the protective conductor is intact.',
  },
  {
    question: 'My Zappi shows a flashing red light — what does it mean?',
    answer:
      'A flashing red light on a Zappi charger typically indicates a fault condition. The specific fault depends on the flash pattern: rapid flashing usually indicates an earth fault or RCD trip, while slow flashing may indicate a communication error with the CT clamp or hub. Check the myenergi app for a specific error code and description. If the error persists after a power cycle (turning off the charger circuit at the consumer unit for 30 seconds, then restoring), contact a qualified electrician or myenergi support with the specific error code.',
  },
  {
    question: 'Can I reset my EV charger myself?',
    answer:
      'You can safely perform a basic reset by turning off the charger circuit at the consumer unit, waiting 30 seconds, and turning it back on. This resolves many transient communication faults and software glitches. However, if the charger displays an earth fault, overcurrent, or temperature error, a simple reset may clear the display but will not fix the underlying problem. Repeatedly resetting a charger that is reporting safety faults is dangerous — the charger is detecting a real condition. If the error returns after one reset, call a qualified electrician.',
  },
  {
    question: 'Why does my EV charger show an overcurrent fault?',
    answer:
      'An overcurrent fault means the charger has detected current exceeding its rated capacity. This can be caused by an issue in the vehicle\'s onboard charger drawing more current than negotiated, a fault in the charger\'s current measurement circuitry, or — more commonly — the charger\'s current limit has been set higher than the circuit can safely supply. Check that the charger\'s maximum current setting matches the circuit\'s capacity (the cable size and protective device rating). A 32A charger on a circuit protected by a 32A MCB with 6mm twin and earth cable is at its maximum — any additional load on the circuit could trigger an overcurrent condition.',
  },
  {
    question: 'What RCD type do I need for an EV charger?',
    answer:
      'BS 7671 Regulation 722.531.2 requires at minimum a Type A RCD for EV charging circuits. However, many charger manufacturers — including myenergi (Zappi) and Andersen — require or recommend Type A RCD protection with the charger\'s built-in DC fault detection, or an external Type B RCD. A Type AC RCD is not suitable for EV charging circuits because it cannot detect the DC fault components that EV chargers can produce. If your existing consumer unit has Type AC RCDs, the EV charger circuit will need its own Type A or Type B RCBO, or the charger must have integrated DC fault protection.',
  },
  {
    question: 'My Pod Point charger is offline — how do I fix it?',
    answer:
      'A Pod Point charger showing as offline in the app typically has a communication fault rather than an electrical fault. Check your Wi-Fi signal strength at the charger location — Pod Point chargers need a reliable connection to the Pod Point servers. If the charger\'s LED shows a steady green or white light, the charger itself is operational and the issue is purely communication. Try restarting your router and power-cycling the charger. If the charger LED shows red or amber, there may be an electrical fault requiring professional attention. Pod Point\'s support team can remotely diagnose communication issues.',
  },
  {
    question: 'Is it safe to charge my car if the charger previously showed an error?',
    answer:
      'If the charger displayed a transient error (communication fault, timeout) that cleared after a single reset and has not returned, it is generally safe to resume charging. If the charger displayed a safety-related error (earth fault, overcurrent, temperature fault) and you reset it once and it has been operating normally for several charge cycles, monitor it but it is likely safe. However, if a safety error has occurred more than once, do not continue charging until a qualified electrician has inspected the installation. Repeated safety errors indicate a real fault that could result in electric shock or fire.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Guide',
    description: 'How an EICR can identify issues with EV charger circuits and earthing arrangements.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-upgrade',
    title: 'Consumer Unit Upgrade',
    description: 'Upgrading to accommodate EV charger circuits with correct RCD types.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-fault-finding',
    title: 'Electrical Fault Finding',
    description: 'Systematic approach to diagnosing electrical faults including EV charger circuits.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description: 'BS 7671 requirements for consumer units including EV charging circuit protection.',
    icon: Cable,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Understanding EV Charger Error Codes',
    content: (
      <>
        <p>
          Your EV charger is displaying an error code, a warning light, or has stopped charging
          mid-session. Before you panic, understand that EV chargers have multiple layers of built-in
          safety monitoring, and error codes are the charger doing its job — detecting a condition
          and protecting you, your vehicle, and your property.
        </p>
        <p>
          EV charger errors generally fall into five categories: RCD trip (earth leakage detected),
          earth fault (protective conductor issue), overcurrent (too much current flowing),
          communication fault (loss of connection to app/server/vehicle), and temperature fault
          (overheating). The first three are safety-critical and require professional investigation if
          they persist. Communication and temperature faults are often resolved with simple steps.
        </p>
        <p>
          This guide covers the most common error codes from the three most popular UK home charger
          brands — Zappi (myenergi), Pod Point, and Andersen — and explains what each error means,
          what you can do, and when to call a qualified electrician. If you are an electrician, the
          later sections cover the{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations">
            BS 7671 regulations
          </SEOInternalLink>{' '}
          specific to EV charging circuits.
        </p>
      </>
    ),
  },
  {
    id: 'zappi-codes',
    heading: 'Zappi (myenergi) Error Codes',
    content: (
      <>
        <p>
          The myenergi Zappi is one of the most popular home EV chargers in the UK, largely due to
          its solar diversion capability. Zappi communicates errors through its display screen, LED
          colours, and the myenergi app.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault 1 / Red flash — Earth fault detected.</strong> The Zappi's built-in
                earth monitoring has detected current on the protective conductor. Stop charging.
                Check the charging cable for damage. If the fault persists after a power cycle, have
                an electrician test the circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault 3 — Overcurrent.</strong> The charger has detected current exceeding
                the configured maximum. Verify the charger's current limit matches the circuit
                rating. Check for other loads on the same circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault 6 — RCD self-test failure.</strong> The Zappi performs periodic RCD
                self-tests. A failure indicates the internal RCD may not operate correctly. Do not
                use the charger until inspected by an electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CT clamp communication error.</strong> The Zappi cannot read the CT clamp
                data. Check the CT clamp connection at the charger and at the meter tails. This
                affects solar diversion but is not a safety issue — the charger can still operate in
                standard mode.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Waiting for EV / Pilot fault.</strong> The charger is not detecting a valid
                signal from the vehicle. Try unplugging and re-inserting the charging cable firmly.
                Check the cable connector for debris or damage. If the issue persists with multiple
                vehicles, the charger's pilot circuit may be faulty.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pod-point-codes',
    heading: 'Pod Point Error Codes',
    content: (
      <>
        <p>
          Pod Point chargers are widely installed through partnerships with car manufacturers and
          energy companies. They communicate status primarily through LED colours and the Pod Point app.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Red LED — Fault condition.</strong> A solid or flashing red LED indicates the
                charger has detected a fault. The Pod Point app will typically show a specific error
                message. Power-cycle the charger once. If the red LED returns, contact Pod Point
                support or a qualified electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Amber LED — Charging paused or limited.</strong> The charger has reduced or
                paused charging, often due to load management detecting high household demand, a
                temperature limit, or a scheduled charging window. Check the app for the specific
                reason.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Offline in app.</strong> The charger has lost its connection to Pod Point
                servers. This is a communication issue, not a safety fault. The charger may still
                charge locally. Check Wi-Fi signal strength and restart your router.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Charge session ending prematurely.</strong> If the charger stops before the
                vehicle is fully charged, check whether the vehicle's onboard charge timer or limit
                is set. Also check for RCD trips at the consumer unit — the charger may be restarting
                after each trip and losing the session.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'andersen-codes',
    heading: 'Andersen Error Codes',
    content: (
      <>
        <p>
          Andersen chargers (Andersen A2 and A3) are premium UK-designed chargers with a distinctive
          wooden fascia. They display status through the front LED and the Andersen Konnect+ app.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Red pulsing — Critical fault.</strong> The charger has detected a serious
                issue such as an earth fault or internal component failure. Do not use. Isolate at
                the consumer unit and contact Andersen or a qualified electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Amber pulsing — Warning condition.</strong> Common causes include
                temperature limit reached (charger is throttling to cool down), load management
                active (reducing charge rate to stay within supply limits), or a minor communication
                issue.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Connection error in Konnect+ app.</strong> The charger cannot reach
                Andersen's servers. Check Wi-Fi or 4G connectivity. The charger will still function
                for basic charging without a server connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PlugZap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vehicle not charging / pilot error.</strong> The charger cannot establish
                communication with the vehicle. Try re-seating the cable connector. Clean the
                connector pins if dirty. Test with a different vehicle if available to determine
                whether the fault is charger-side or vehicle-side.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-trip',
    heading: 'RCD Tripping on EV Chargers',
    content: (
      <>
        <p>
          RCD tripping is the single most common EV charger fault reported by homeowners. The cause
          is often not the charger itself but the type of RCD protecting the circuit.
        </p>
        <p>
          Regulation 411.3.3 of BS 7671 requires RCD protection with a rated residual operating
          current not exceeding 30mA for circuits supplying socket-outlets rated up to 32A. EV
          charger circuits must have this protection.
        </p>
        <p>
          However, the type of RCD matters significantly for EV charging. Regulation 722.531.2
          specifically addresses EV charging circuits and requires at minimum a Type A RCD. The
          reason is technical but important:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type AC RCD</strong> — detects sinusoidal AC fault currents only. Not
                suitable for EV charging. May trip erratically or fail to trip when needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type A RCD</strong> — detects sinusoidal AC and pulsating DC fault currents.
                The minimum requirement under Regulation 722.531.2 for EV circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type B RCD</strong> — detects AC, pulsating DC, and smooth DC fault
                currents. Required by some charger manufacturers, particularly for three-phase
                installations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If your EV charger circuit is protected by a Type AC RCD (common in older consumer units),
          this is the most likely cause of repeated RCD tripping. The solution is to install a Type A
          or Type B RCBO dedicated to the EV circuit, or to upgrade the consumer unit.
        </p>
      </>
    ),
  },
  {
    id: 'earth-fault',
    heading: 'Earth Fault Indicators',
    content: (
      <>
        <p>
          An earth fault error on an EV charger is a safety-critical indication that should never be
          ignored or repeatedly overridden. The charger is detecting current flowing through the
          protective earth conductor — current that should be flowing only through the live and
          neutral conductors.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Possible Causes of Earth Fault Errors</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Damaged charging cable — insulation breakdown allowing current to reach the earth conductor or cable screen</span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Moisture ingress — water in the charger enclosure, cable connector, or vehicle charging port</span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Vehicle onboard charger fault — the vehicle's internal charging electronics have developed an earth leakage</span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Fixed wiring fault — damaged cable between consumer unit and charger, particularly where cable passes through walls or underground</span>
            </li>
          </ul>
        </div>
        <p>
          An electrician investigating an earth fault on an EV charger circuit should perform
          insulation resistance testing at 500V DC on the fixed wiring with the charger disconnected,
          earth fault loop impedance testing, and visual inspection of all connections. If the fixed
          wiring tests satisfactorily, the fault is in the charger or the vehicle.
        </p>
      </>
    ),
  },
  {
    id: 'overcurrent',
    heading: 'Overcurrent Protection Faults',
    content: (
      <>
        <p>
          Overcurrent faults indicate the charger is detecting more current flowing than it is
          configured to deliver. This is distinct from an RCD trip — overcurrent is about the
          magnitude of current, not earth leakage.
        </p>
        <p>
          Common causes include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Charger current limit set too high</strong> — a 7kW charger drawing 32A on
                a circuit with 6mm cable and a 32A MCB is at its absolute maximum. The charger
                should be set to 30A or lower to provide a safety margin.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shared circuit</strong> — if the EV charger does not have a dedicated
                circuit and shares with other loads, the combined current may exceed the protective
                device rating. EV chargers should always have a dedicated circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply voltage variation</strong> — a low supply voltage causes the charger
                to draw more current to deliver the same power. On properties with long service
                cables or at the end of the distribution network, voltage can drop below 216V during
                peak demand.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'communication-fault',
    heading: 'Communication Faults',
    content: (
      <>
        <p>
          Communication faults are the least safety-critical category of EV charger errors but the
          most frustrating for owners. These typically fall into two types:
        </p>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">Charger-to-server communication</h4>
            <p className="text-white text-sm leading-relaxed">
              The charger cannot reach the manufacturer's cloud servers (Wi-Fi/4G issues). This
              affects app control, scheduling, smart tariff switching, and solar diversion on some
              chargers. Basic charging usually still works. Check Wi-Fi signal strength at the
              charger, restart the router, and check for manufacturer server outages.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">Charger-to-vehicle communication (pilot signal)</h4>
            <p className="text-white text-sm leading-relaxed">
              The charger and vehicle communicate via the control pilot signal in the charging cable.
              This negotiates the maximum charge rate and confirms safety checks before power flows.
              A pilot fault prevents charging entirely. Causes include a damaged cable, dirty
              connector pins, a fault in the vehicle's charge port, or a charger control board
              issue.
            </p>
          </div>
        </div>
        <p>
          If the charger-to-vehicle communication fails with one vehicle but works with another, the
          fault is vehicle-side. If it fails with all vehicles, the fault is charger-side.
        </p>
      </>
    ),
  },
  {
    id: 'when-to-call',
    heading: 'When to Call an Electrician',
    content: (
      <>
        <p>
          Not every EV charger error requires an electrician. Here is the urgency scale:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call immediately</strong> — burning smell from charger or consumer unit,
                visible damage or scorch marks, charger enclosure is hot to the touch, MCB or RCD
                trips violently (with a bang) rather than clicking off.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call within 24-48 hours</strong> — persistent earth fault error after one
                reset, RCD trips every time charging starts, overcurrent fault that returns after
                reset, charger RCD self-test failure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Arrange at convenience</strong> — intermittent RCD tripping (once a week or
                less), charger charging at a lower rate than expected, intermittent communication
                faults.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-white mt-0.5 shrink-0" />
              <span>
                <strong>Contact manufacturer first</strong> — communication/app faults only, charger
                firmware updates, scheduling issues, solar diversion calibration. These are
                typically resolved by the manufacturer's support team without an electrician visit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When calling an electrician for EV charger issues, look for one with specific EV charger
          installation experience and ideally certification from the charger manufacturer (such as
          myenergi Approved Installer or OZEV-approved installer). EV charger circuits have specific
          requirements under Section 722 of BS 7671 that not all electricians are familiar with.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Diagnosing EV Charger Faults',
    content: (
      <>
        <p>
          When called to investigate EV charger errors, a systematic approach saves time and ensures
          the root cause is identified rather than just the symptom.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">1. Verify RCD Type</h4>
                <p className="text-white text-sm leading-relaxed">
                  Check the RCD type protecting the EV circuit. Regulation 722.531.2 requires Type A
                  as a minimum. If a Type AC is fitted, this is likely the root cause of tripping
                  faults. Recommend upgrade to Type A RCBO or Type B if specified by the charger
                  manufacturer.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">2. Test Fixed Wiring</h4>
                <p className="text-white text-sm leading-relaxed">
                  Isolate the charger and test the fixed wiring: insulation resistance at 500V DC
                  (L-E, N-E, L-N — minimum 1 megohm), continuity of protective conductor (R1+R2),
                  and earth fault loop impedance (Zs). Compare Zs with the maximum permitted for the
                  protective device. For a 32A Type B MCB, the maximum Zs is 1.37 ohms at the origin.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">3. Check Installation Compliance</h4>
                <p className="text-white text-sm leading-relaxed">
                  Verify the installation meets Section 722 requirements: dedicated circuit, correct
                  cable sizing for continuous load (Section 722.531.1 notes that EV charging is a
                  continuous load and must be rated accordingly), correct RCD type, and appropriate
                  earthing arrangement. Many faults are caused by non-compliant original installations.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Document EV charger faults professionally"
          description="Elec-Mate's certificate apps let you complete EICRs and Minor Works Certificates for EV charger installations on your phone with photo evidence and instant PDF export."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerErrorCodesPage() {
  return (
    <GuideTemplate
      title="EV Charger Error Codes | Zappi, Pod Point & Andersen Guide"
      description="Common EV charger error codes explained — Zappi, Pod Point, and Andersen. RCD trips, earth faults, overcurrent, and communication faults. What each code means and when to call an electrician."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EV Charging"
      badgeIcon={Car}
      heroTitle={
        <>
          EV Charger Error Codes:{' '}
          <span className="text-yellow-400">What They Mean</span>
        </>
      }
      heroSubtitle="Your EV charger is showing an error. This guide covers the most common fault codes from Zappi, Pod Point, and Andersen chargers — including RCD trips, earth faults, overcurrent, and communication errors — and tells you what to do next."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Errors"
      relatedPages={relatedPages}
      ctaHeading="Diagnose and Document EV Charger Faults on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for AI fault diagnosis, EV charger testing documentation, and professional certificates. 7-day free trial, cancel anytime."
    />
  );
}
