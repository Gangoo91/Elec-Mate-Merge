import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  Zap,
  AlertTriangle,
  Activity,
  Cable,
  BookOpen,
  GraduationCap,
  FileCheck2,
  Search,
  Settings,
  Brain,
  HeartPulse,
  TestTube,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'What Is an RCD', href: '/guides/what-is-an-rcd' },
];

const tocItems = [
  { id: 'what-is-rcd', label: 'What Is an RCD?' },
  { id: 'how-rcds-work', label: 'How RCDs Work' },
  { id: 'why-30ma', label: 'Why 30mA?' },
  { id: 'rcd-types', label: 'Types of RCD' },
  { id: 'rcd-vs-rcbo', label: 'RCD vs RCBO' },
  { id: 'when-required', label: 'When RCDs Are Required' },
  { id: 'why-rcds-trip', label: 'Why RCDs Trip' },
  { id: 'testing-rcds', label: 'Testing RCDs' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An RCD (Residual Current Device) protects against electric shock by detecting earth leakage current. It compares the current flowing out on the line conductor with the current returning on the neutral — if there is a difference, current is leaking to earth.',
  'A 30mA RCD is the standard for personal protection. It trips when the leakage current reaches 30mA (0.03A) — below the level that can cause a fatal electric shock in most circumstances.',
  'RCDs do not protect against overcurrent. They work alongside MCBs — the MCB protects the cable from overload and short circuit, while the RCD protects people from earth faults.',
  'An RCBO combines RCD and MCB protection in a single device, giving each circuit its own independent earth leakage protection. This prevents a fault on one circuit tripping the supply to multiple circuits.',
  'BS 7671 requires RCD protection (rated 30mA or less) for all socket outlets rated up to 32A, all circuits in bathrooms, and all cables concealed in walls at a depth less than 50mm.',
];

const faqs = [
  {
    question: 'What does an RCD actually detect?',
    answer:
      "An RCD detects an imbalance between the current flowing out on the line conductor and the current returning on the neutral conductor. Under normal conditions, these two currents are equal — every milliamp that flows out on the line returns on the neutral. If current leaks to earth (for example, through a person touching a live part, or through damaged cable insulation), the returning neutral current is less than the outgoing line current. The RCD's core transformer detects this difference. When the difference reaches the rated sensitivity (typically 30mA), the RCD trips and disconnects the supply. The RCD does not measure voltage or detect overcurrent — it only detects the imbalance caused by earth leakage.",
  },
  {
    question: 'Can an RCD save your life?',
    answer:
      "A 30mA RCD significantly reduces the risk of fatal electric shock, but it is not a guarantee. The 30mA trip threshold was chosen because research shows that a current of 30mA flowing through the body for a short duration (less than 40 milliseconds at 30mA, which is well within the RCD's operating time) is unlikely to cause ventricular fibrillation in a healthy adult. However, an RCD cannot protect against all electric shock scenarios. It cannot protect against contact between line and neutral (for example, touching both conductors simultaneously), because no current flows to earth — the line and neutral currents remain balanced. It also cannot protect if the shock current path does not go through the RCD. Nevertheless, RCDs have saved countless lives since their widespread adoption and are one of the most important safety devices in any installation.",
  },
  {
    question: 'Why does my RCD keep tripping?',
    answer:
      'Persistent RCD tripping indicates that current is leaking to earth somewhere on one of the circuits protected by that RCD. Common causes include: a faulty appliance with damaged insulation (try unplugging appliances one at a time to identify the culprit), moisture ingress in an outdoor socket, junction box, or light fitting, deteriorated cable insulation (especially in older properties), a faulty immersion heater element, or cumulative leakage from multiple appliances that individually are within limits but combined exceed 30mA. If the RCD trips immediately when switched on, suspect a hard fault (damaged cable, water ingress). If it trips intermittently, suspect a marginal leakage that varies with conditions (temperature, humidity). A qualified electrician can measure the leakage current on each circuit using a clamp meter to identify the source. See our guide on nuisance tripping for more detail.',
  },
  {
    question: 'What is the difference between an RCD and an RCBO?',
    answer:
      "An RCD (Residual Current Device) provides earth leakage protection only. It does not protect against overcurrent — that is the MCB's job. In a typical split-load consumer unit, one RCD protects a group of circuits (each with its own MCB). The problem is selectivity: if any one of those circuits develops an earth fault, the RCD trips and disconnects all the circuits in that group. An RCBO (Residual Current Breaker with Overcurrent protection) combines both RCD and MCB protection in a single device. Each circuit gets its own independent earth leakage protection. If one circuit develops a fault, only that RCBO trips — the other circuits remain live. This is why RCBO boards are increasingly popular in new installations. The trade-off is cost — an RCBO board costs more than a split-load board with two RCDs.",
  },
  {
    question: 'How do I test the RCD test button?',
    answer:
      'Every RCD has a test button on the front, usually marked "T" or "Test." Pressing this button creates a controlled earth leakage (by passing a small current through an internal resistor from line to earth, bypassing the neutral), which should cause the RCD to trip. The test button should be pressed regularly — BS 7671 recommends quarterly (every 3 months) for domestic installations. The test button only confirms that the trip mechanism works — it does not verify the trip time. To verify the trip time (which must be within 300ms at rated current and 40ms at 5 times rated current), an electrician uses a calibrated RCD tester during an EICR. If the test button does not trip the RCD, the device is faulty and must be replaced immediately — this is a C1 (Danger Present) observation.',
  },
  {
    question: 'Do all circuits need RCD protection?',
    answer:
      'Under BS 7671:2018, RCD protection rated at 30mA or less is required for: all socket outlet circuits rated up to 32A (Regulation 411.3.3), all circuits in bathrooms and shower rooms (Part 7, Section 701), all circuits supplying mobile equipment for use outdoors (Regulation 411.3.3), all cables concealed in walls or partitions at a depth less than 50mm from the surface (Regulation 522.6.202), and cables concealed in walls containing metal parts regardless of depth. In practice, this means almost every circuit in a modern domestic installation requires 30mA RCD protection. Circuits that may be excluded include fire alarm circuits, emergency lighting circuits, and freezer circuits (where loss of supply could cause significant loss), but even these are increasingly being RCD-protected with time-delayed or Type S (selective) RCDs to maintain protection while improving discrimination.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/what-is-a-circuit-breaker',
    title: 'What Is a Circuit Breaker?',
    description: 'How MCBs work, thermal and magnetic trip mechanisms, and Type B, C, D explained.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/rcbo-vs-rcd-mcb',
    title: 'RCBO vs RCD + MCB',
    description:
      'When to use RCBOs instead of a split-load board — selectivity, cost, and practical guidance.',
    icon: Settings,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description: 'Step-by-step fault-finding guide for persistent RCD tripping.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-testing-procedure',
    title: 'RCD Testing Procedure',
    description:
      'Complete procedure for testing RCDs during an EICR — trip times, ramp tests, and recording results.',
    icon: TestTube,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-types-explained',
    title: 'RCD Types Explained',
    description: 'Type AC, A, B, F, and S RCDs — when to use each type and why it matters.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-acronyms-glossary',
    title: 'Electrical Acronyms Glossary',
    description: 'A-Z reference of every electrical acronym used in UK installation work.',
    icon: BookOpen,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-rcd',
    heading: 'What Is an RCD?',
    content: (
      <>
        <p>
          An RCD (Residual Current Device) is a life-saving protective device fitted in the consumer
          unit or distribution board. Its job is to detect earth leakage current — current that is
          flowing to earth through an unintended path, such as through a person's body or through
          damaged cable insulation — and disconnect the supply before the leakage can cause a fatal
          electric shock or a fire.
        </p>
        <p>
          Every modern domestic installation in the UK has RCD protection. You will see RCDs as wide
          devices in the consumer unit, typically rated at 63A or 80A with a 30mA sensitivity, each
          protecting a group of circuits. Alternatively, the installation may use{' '}
          <SEOInternalLink href="/guides/rcbo-vs-rcd-mcb">RCBOs</SEOInternalLink> — individual
          devices that combine RCD and MCB protection for each circuit.
        </p>
        <p>
          The RCD is arguably the most important protective device in a domestic installation. While
          an <SEOInternalLink href="/guides/what-is-a-circuit-breaker">MCB</SEOInternalLink>{' '}
          protects the cable from overcurrent, the RCD protects <strong>people</strong> from
          electric shock. The two devices serve different purposes and are both essential.
        </p>
      </>
    ),
  },
  {
    id: 'how-rcds-work',
    heading: 'How RCDs Work: The Core Balance Transformer',
    content: (
      <>
        <p>
          The operating principle of an RCD is elegantly simple. Inside the device is a toroidal
          (ring-shaped) transformer core with two windings — the line conductor and the neutral
          conductor both pass through the core.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Normal conditions:</strong> The current flowing out on the line conductor
                equals the current returning on the neutral conductor. The two magnetic fields in
                the core are equal and opposite, so they cancel out. The net magnetic flux in the
                core is zero. No signal is generated. The RCD remains closed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth fault conditions:</strong> Some current leaks to earth (through a
                person, through damaged insulation, through moisture). The neutral current is now
                less than the line current — the difference is the leakage current flowing to earth.
                The magnetic fields no longer cancel. A net flux appears in the core, which induces
                a voltage in a third sensing winding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Trip:</strong> When the induced voltage exceeds the threshold (corresponding
                to the rated residual current — typically 30mA), it energises a trip coil that
                releases a mechanical latch, opening the main contacts and disconnecting the supply.
                The entire process takes less than 40 milliseconds.
              </span>
            </li>
          </ul>
        </div>
        <p>
          This is why the RCD is sometimes called a "core balance" device or a "current balance"
          device — it works by detecting the imbalance between line and neutral currents.
        </p>
      </>
    ),
  },
  {
    id: 'why-30ma',
    heading: 'Why 30mA? The Threshold That Saves Lives',
    content: (
      <>
        <p>
          The 30mA (0.03A) trip threshold is not arbitrary. It is based on research into the
          physiological effects of electric current on the human body.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <HeartPulse className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>1mA:</strong> Threshold of perception — you can just feel the current as a
                tingling sensation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HeartPulse className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>5mA:</strong> Maximum "let-go" current — above this, muscles contract
                involuntarily and you may not be able to release your grip on the conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HeartPulse className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>30mA:</strong> Below the threshold for ventricular fibrillation in most
                healthy adults if the duration is short (less than about 40ms). This is why a 30mA
                RCD that trips within 40ms provides effective protection against fatal electric
                shock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HeartPulse className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>75-100mA:</strong> Ventricular fibrillation becomes likely. At this level,
                the heart rhythm is disrupted and cardiac arrest can occur.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HeartPulse className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Above 300mA:</strong> Severe burns, respiratory arrest, and almost certain
                fatal injury.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The 30mA RCD trips before the current through the body reaches a level that would cause
          fibrillation, provided the exposure time is short. This is the fundamental reason why BS
          7671 requires 30mA RCD protection on circuits that present the highest risk of direct or
          indirect contact — socket outlets, bathrooms, outdoor circuits, and concealed cables.
        </p>
        <SEOAppBridge
          title="Record RCD test results on site"
          description="Elec-Mate records RCD trip times, ramp test results, and test button confirmations directly into the EICR schedule of test results. Voice entry means you can speak the results while holding the test leads."
          icon={Activity}
        />
      </>
    ),
  },
  {
    id: 'rcd-types',
    heading: 'Types of RCD: Type AC, A, B, F, and S',
    content: (
      <>
        <p>
          Not all RCDs are the same. Different types are designed to detect different waveforms of
          leakage current. See our detailed{' '}
          <SEOInternalLink href="/guides/rcd-types-explained">RCD types guide</SEOInternalLink> for
          the full breakdown.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type AC:</strong> Detects sinusoidal (AC) earth leakage only. The most basic
                type. Being phased out in favour of Type A for most applications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type A:</strong> Detects sinusoidal AC and pulsating DC earth leakage. The
                standard minimum for most domestic circuits. Required by BS 7671 for circuits
                supplying electronic equipment that could produce pulsating DC fault currents (which
                is most modern equipment).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type B:</strong> Detects AC, pulsating DC, and smooth DC earth leakage.
                Required for circuits supplying equipment with three-phase rectifiers or frequency
                inverters — such as{' '}
                <SEOInternalLink href="/guides/ev-charger-installation-guide">
                  EV chargers
                </SEOInternalLink>{' '}
                and variable speed drives.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type F:</strong> Like Type A but with enhanced detection for high-frequency
                fault currents from frequency inverter-controlled equipment. Used for circuits
                supplying washing machines, air conditioning units, and similar inverter-driven
                appliances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type S (Selective/Time-Delayed):</strong> Has an intentional delay before
                tripping (typically 40-500ms depending on fault current). Used upstream of standard
                RCDs to provide discrimination — the downstream RCD trips first, limiting the
                affected circuits. The time delay means Type S should not be used as the sole
                protection for personal safety.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-vs-rcbo',
    heading: 'RCD vs RCBO: Why Selectivity Matters',
    content: (
      <>
        <p>
          In a traditional split-load consumer unit, two RCDs each protect a group of circuits. If
          any circuit in a group develops an earth fault, the RCD trips and disconnects{' '}
          <strong>all</strong> circuits in that group. This means a faulty toaster can knock out the
          lights, the fridge, and the heating — everything on that RCD.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Split-Load (2x RCD)</h3>
            <p className="text-white text-sm leading-relaxed">
              Two RCDs, each protecting a group of circuits (typically 5-8 circuits each). Cost
              effective. The downside is that a fault on any circuit trips the entire group. Common
              in older consumer units and budget installations.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Full RCBO Board</h3>
            <p className="text-white text-sm leading-relaxed">
              Every circuit has its own{' '}
              <SEOInternalLink href="/guides/rcbo-vs-rcd-mcb">RCBO</SEOInternalLink>. A fault on one
              circuit trips only that circuit — everything else stays on. Better selectivity, better
              for the occupant. Higher initial cost, but increasingly the standard for new
              installations and consumer unit upgrades.
            </p>
          </div>
        </div>
        <p>
          For landlords and commercial properties, an RCBO board is particularly valuable. A tripped
          RCD that takes out the freezer, the fire alarm, or the server room can cause significant
          damage and liability. With individual RCBOs, the impact of any single fault is contained
          to the affected circuit.
        </p>
      </>
    ),
  },
  {
    id: 'when-required',
    heading: 'When BS 7671 Requires RCD Protection',
    content: (
      <>
        <p>
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          requires 30mA RCD protection for the following:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All socket outlet circuits rated up to 32A</strong> (Regulation 411.3.3).
                This covers all domestic ring circuits and radial socket circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All circuits in bathrooms and shower rooms</strong> (Section 701). This
                includes lighting, extract fans, heated towel rails, and shaver sockets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuits supplying mobile equipment for outdoor use</strong> (Regulation
                411.3.3). This covers garden sockets, power tool supplies, and any outdoor
                equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cables concealed in walls at less than 50mm depth</strong> (Regulation
                522.6.202). Unless protected by a 30mA RCD or enclosed in earthed metallic
                containment or protected by a 30mA RCD.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cables in walls or partitions containing metal parts</strong> regardless of
                depth — unless the cable is in earthed metallic containment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, this means almost every circuit in a modern domestic installation requires
          30mA RCD protection. The few exceptions (such as smoke alarm circuits) are typically
          protected anyway because it is simpler to RCD-protect everything than to create an
          unprotected group.
        </p>
      </>
    ),
  },
  {
    id: 'why-rcds-trip',
    heading: 'Why RCDs Trip: Common Causes of Earth Leakage',
    content: (
      <>
        <p>
          An RCD trips because current is leaking to earth. Finding the source is a systematic
          process. See our detailed{' '}
          <SEOInternalLink href="/guides/rcd-keeps-tripping">
            RCD keeps tripping guide
          </SEOInternalLink>{' '}
          for the full fault-finding procedure.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Faulty Appliance</h4>
                <p className="text-white text-sm leading-relaxed">
                  The most common cause. A washing machine with a failing heater element, a kettle
                  with internal corrosion, or any appliance with damaged insulation can leak current
                  to earth. Unplug appliances one at a time and reset the RCD to identify the
                  culprit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Moisture Ingress</h4>
                <p className="text-white text-sm leading-relaxed">
                  Water in an outdoor socket, a leaking roof dripping onto a junction box, or
                  condensation in a light fitting. Moisture provides a path for current to leak to
                  earth. Often worse in wet weather or after rain.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Deteriorated Cable Insulation</h4>
                <p className="text-white text-sm leading-relaxed">
                  In older properties, the PVC insulation on cables can degrade over time —
                  especially in hot locations (near boilers, in lofts during summer) or where cables
                  have been damaged during building work. The{' '}
                  <SEOInternalLink href="/guides/insulation-resistance-test">
                    insulation resistance test
                  </SEOInternalLink>{' '}
                  during an EICR identifies this.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cumulative Leakage</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every appliance has a small, normal standing leakage current (typically 0.5-3.5mA
                  each). When many appliances are connected to circuits protected by the same RCD,
                  the cumulative leakage can approach or exceed 30mA — causing nuisance tripping
                  even though no single appliance is faulty. This is a design issue best solved by
                  splitting circuits across multiple RCDs or using RCBOs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'testing-rcds',
    heading: 'Testing RCDs During an EICR',
    content: (
      <>
        <p>
          During an <SEOInternalLink href="/guides/eicr-for-landlords">EICR</SEOInternalLink>, the
          electrician tests each RCD to verify it trips correctly. The tests include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TestTube className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test button check:</strong> Press the test button. The RCD must trip. If it
                does not, the device is faulty — C1 observation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TestTube className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rated current test (1x IΔn):</strong> Inject 30mA using a calibrated
                RCD tester. The RCD must trip within 300ms. If it does not, the device is
                non-compliant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TestTube className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>5x rated current test (5x IΔn):</strong> Inject 150mA. The RCD must trip
                within 40ms. This verifies fast disconnection under higher fault currents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TestTube className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Half rated current test (0.5x IΔn):</strong> Inject 15mA. The RCD must{' '}
                <strong>not</strong> trip. This confirms the RCD is not over-sensitive.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TestTube className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ramp test (optional but recommended):</strong> Gradually increase the test
                current from zero until the RCD trips. The trip current should be between 50% and
                100% of the rated sensitivity (15-30mA for a 30mA RCD).
              </span>
            </li>
          </ul>
        </div>
        <p>
          All test results are recorded on the schedule of test results section of the EICR. The
          trip times must be compared against the maximum permitted values to determine compliance.
        </p>
        <SEOAppBridge
          title="Complete EICR certificates with AI assistance"
          description="Elec-Mate walks you through every test, records RCD trip times by voice entry, cross-references against BS 7671 limits, and flags any non-compliant results automatically. Complete the certificate on your phone, on site."
          icon={Brain}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function WhatIsAnRCDPage() {
  return (
    <GuideTemplate
      title="What Is an RCD? | Residual Current Device Explained"
      description="Plain English guide to RCDs (Residual Current Devices). How RCDs work, why 30mA is the trip threshold, RCD vs RCBO, RCD types explained, when RCDs are required by BS 7671, and common causes of RCD tripping."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Electrical Basics"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          What Is an RCD?{' '}
          <span className="text-yellow-400">Residual Current Devices Explained</span>
        </>
      }
      heroSubtitle="An RCD could save your life. It detects earth leakage current and disconnects the supply in milliseconds — before the current through your body can cause a fatal electric shock. This guide explains how RCDs work, why 30mA matters, and when BS 7671 requires them."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About RCDs"
      relatedPages={relatedPages}
      ctaHeading="Record RCD Test Results on Your Phone"
      ctaSubheading="Elec-Mate records RCD trip times, cross-references BS 7671 limits, and flags non-compliant results automatically. Voice entry, AI assistance, and professional PDF export. 7-day free trial."
    />
  );
}
