import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Power,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  Search,
  Cable,
  Wrench,
  Zap,
  CircuitBoard,
  Plug,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'No Electricity in Part of House', href: '/guides/no-electricity-in-part-of-house' },
];

const tocItems = [
  { id: 'overview', label: 'Why Has Part of My House Lost Power?' },
  { id: 'quick-checks', label: 'Quick Checks You Can Do Yourself' },
  { id: 'tripped-mcb', label: 'Tripped MCB: The Most Common Cause' },
  { id: 'loose-connections', label: 'Loose Connections at the Consumer Unit' },
  { id: 'damaged-cable', label: 'Damaged Cables' },
  { id: 'shared-neutral', label: 'Shared Neutral Issues in Older Properties' },
  { id: 'ring-main-break', label: 'Ring Main Break' },
  { id: 'blown-fuse', label: 'Blown Cartridge Fuse in Older Boards' },
  { id: 'when-to-call', label: 'When to Call an Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The most common reason for losing electricity in part of your house is a tripped MCB (Miniature Circuit Breaker) at the consumer unit. This is usually easy to fix by resetting the breaker — but if it trips again, there is an underlying fault.',
  'A loose connection at the consumer unit can cause intermittent power loss to one or more circuits. This is a fire hazard and requires an electrician to retorque all connections.',
  'Damaged cables — caused by DIY work, rodent damage, or age-related insulation breakdown — can cause a complete loss of power on the affected circuit.',
  'In older properties with shared neutral wiring, a break in the shared neutral conductor can cause some circuits to lose power while others develop dangerous overvoltage.',
  'A break in a ring final circuit may not cause a total loss of power but can result in some sockets on the ring losing supply while others continue to work.',
  'Properties with older consumer units using cartridge fuses (BS 1361 or BS 88) may have a blown fuse — the fuse carrier needs to be pulled out and the fuse tested or replaced.',
];

const faqs = [
  {
    question: 'Why have I lost power in some rooms but not others?',
    answer:
      'Your home is divided into separate electrical circuits, each protected by its own MCB (circuit breaker) or fuse in the consumer unit. Common circuits include upstairs lights, downstairs lights, kitchen sockets, upstairs sockets, cooker, and shower. When one circuit loses power, it means the protection device for that specific circuit has tripped or the circuit has a fault. Other circuits on different breakers continue to work normally. Check your consumer unit to see if any breaker has tripped to the middle or "off" position.',
  },
  {
    question: 'Is it dangerous to have no power in part of my house?',
    answer:
      'The loss of power itself is not dangerous — the circuit is disconnected. However, the cause of the power loss may be dangerous. If the MCB tripped, it detected a fault (overcurrent or short circuit) and disconnected for safety. If the power loss is caused by a loose connection, that connection is generating heat and is a fire risk even though no power is flowing to the circuit. If power returns intermittently (flickering on and off), there is an unstable connection that needs urgent investigation.',
  },
  {
    question: 'Why do my sockets work but my lights do not?',
    answer:
      'Sockets and lights are on separate circuits with separate breakers. If your lights are off but sockets work, the lighting circuit breaker has tripped or blown. Check the consumer unit — the breaker labelled "Lights" (usually a 6A MCB) will be in the tripped position. If the breaker has not tripped, the fault may be a loose connection at the consumer unit on the lighting circuit terminals, or a wiring fault in the lighting circuit itself.',
  },
  {
    question: 'What if only one socket has stopped working?',
    answer:
      'If a single socket is dead while others on the same circuit work, the most likely cause is a loose connection at that specific socket (either in the socket itself or at a junction box feeding it). On a ring final circuit, the socket is supplied from two directions — if one side of the ring is broken near that socket, it may lose power while the rest of the ring continues from the other direction. Less commonly, the cable to that socket may be damaged. An electrician can test continuity and identify the break.',
  },
  {
    question: 'Can a tripped RCD cause partial power loss?',
    answer:
      'Yes. In a split-load consumer unit (the most common modern type), there are usually two RCDs, each covering a group of circuits. If one RCD trips, all the circuits it protects lose power, while the circuits on the other RCD continue to work. This is why you might lose power to, say, all upstairs sockets and the kitchen lights, but still have power to downstairs sockets and upstairs lights. Check for a tripped RCD — it is the larger switch, usually with a "T" (test) button.',
  },
  {
    question: 'My consumer unit has old-style fuses, not switches — what do I do?',
    answer:
      'Older consumer units use fuse carriers instead of MCBs. Each fuse carrier holds either a rewirable fuse (with fuse wire visible) or a cartridge fuse (a small cylinder). Pull out each fuse carrier in turn and check the fuse. Rewirable fuses show a broken wire when blown. Cartridge fuses need testing with a multimeter (continuity test) as you cannot see inside them. Replace blown fuses with the correct rating. If you have a rewirable fuse board, consider upgrading to a modern consumer unit with MCBs or RCBOs for better protection.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/trip-switch-keeps-going-off',
    title: 'Trip Switch Keeps Going Off',
    description: 'Why your trip switch keeps tripping — MCB vs RCD, causes, and how to find the fault.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-fault-finding',
    title: 'Electrical Fault Finding Guide',
    description: 'Systematic approach to diagnosing electrical faults in domestic installations.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-upgrade',
    title: 'Consumer Unit Upgrade Guide',
    description: 'Upgrading from old fuse boards to modern RCBO consumer units.',
    icon: CircuitBoard,
    category: 'Guide',
  },
  {
    href: '/guides/ring-circuit-fault-finding',
    title: 'Ring Circuit Fault Finding',
    description: 'How to diagnose and repair faults on ring final circuits including broken rings.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Guide',
    description: 'What an EICR involves and how it detects faults causing power loss.',
    icon: FileCheck2,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Has Part of My House Lost Power?',
    content: (
      <>
        <p>
          You walk into a room and the lights do not come on. Or you notice that the sockets in one
          part of the house are dead while the rest of the house has power. Losing electricity in
          part of your house is unsettling, but it is almost always caused by something
          straightforward and fixable.
        </p>
        <p>
          Your home's electrical system is divided into separate circuits — typically including
          separate circuits for upstairs lights, downstairs lights, kitchen sockets, ring final
          circuits for other sockets, the cooker, the shower, and any other dedicated supplies. Each
          circuit has its own protective device (MCB, fuse, or RCBO) in the consumer unit. When one
          circuit loses power, it is usually because the protective device for that circuit has
          tripped or blown, or there is a fault in the wiring of that specific circuit.
        </p>
        <p>
          This guide covers every common cause — from the simple (a tripped breaker) to the more
          involved (shared neutral faults in older properties). It tells you what you can check
          yourself and when you need a qualified electrician. For electricians, the later sections
          cover{' '}
          <SEOInternalLink href="/guides/electrical-fault-finding">
            fault finding techniques
          </SEOInternalLink>{' '}
          for partial power loss scenarios.
        </p>
      </>
    ),
  },
  {
    id: 'quick-checks',
    heading: 'Quick Checks You Can Do Yourself',
    content: (
      <>
        <p>
          Before calling an electrician, these checks take less than five minutes and resolve the
          majority of partial power loss situations:
        </p>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">1. Check the consumer unit</h4>
            <p className="text-white text-sm leading-relaxed">
              Open the consumer unit cover and look at all the switches. If any MCB is in the middle
              or "off" position, that circuit has tripped. Try pushing it firmly to the "on" position.
              If it stays on, the problem may have been a transient fault. If it trips again
              immediately, there is an active fault on that circuit — do not keep resetting it.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">2. Check the RCD</h4>
            <p className="text-white text-sm leading-relaxed">
              If you have a split-load consumer unit, check whether one of the RCDs (the larger
              switches with a test button) has tripped. A tripped RCD takes out all circuits in its
              group, which can cause a confusing pattern of some rooms with power and some without.
              Reset the RCD by pushing it firmly to "on".
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">3. Check your neighbours</h4>
            <p className="text-white text-sm leading-relaxed">
              If the power loss does not match your circuit layout (for example, you have lost one
              phase in a three-phase supply, or the power loss is intermittent), check whether your
              neighbours have power. A supply fault from the distribution network operator (DNO) can
              cause partial power loss. If your neighbours are also affected, contact your DNO (found
              on your electricity bill).
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">4. Check for a prepayment meter</h4>
            <p className="text-white text-sm leading-relaxed">
              If you have a prepayment meter, check the credit. Some prepayment meters disconnect
              individual circuits when credit runs out, rather than cutting all power at once. Top up
              the meter if the balance is zero or in emergency credit.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'tripped-mcb',
    heading: 'Tripped MCB: The Most Common Cause',
    content: (
      <>
        <p>
          A tripped MCB is by far the most common reason for losing power in part of your house. The
          MCB has detected either an overcurrent (too many appliances drawing too much current) or a
          short circuit (a fault causing a sudden current surge) and has disconnected to protect the
          circuit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>If the MCB resets and holds</strong> — the trip was likely caused by a
                momentary overload or a transient fault. Monitor the circuit. If it trips again,
                investigate further using the{' '}
                <SEOInternalLink href="/guides/trip-switch-keeps-going-off">
                  trip switch troubleshooting guide
                </SEOInternalLink>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>If the MCB trips immediately on reset</strong> — there is a hard fault on the
                circuit (short circuit or major overcurrent). Do not keep resetting. An electrician
                needs to locate and repair the fault before the circuit can be used.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>If the MCB trips after a few minutes</strong> — the fault is intermittent or
                building up over time. This could be a thermal overload (the MCB heats up under
                excessive load and trips) or a developing fault in an appliance or cable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Remember that an MCB protects a specific circuit. Check the label on the consumer unit to
          identify which circuit the tripped MCB controls — this tells you which area of the house is
          affected and helps narrow down the cause.
        </p>
      </>
    ),
  },
  {
    id: 'loose-connections',
    heading: 'Loose Connections at the Consumer Unit',
    content: (
      <>
        <p>
          A loose connection at the consumer unit is more serious than a tripped MCB. If a cable
          connection to an MCB or busbar becomes loose, the circuit can lose power intermittently or
          completely. This is also a significant fire risk because loose connections generate heat.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Signs of a Loose Connection</h3>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Power to a circuit flickers or cuts out intermittently</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Lights on a circuit dim or brighten unexpectedly</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>A burning or hot plastic smell near the consumer unit</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Discolouration or scorch marks on the consumer unit</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>The consumer unit feels warm when you touch the cover</span>
            </li>
          </ul>
        </div>
        <p>
          If you notice any of these signs, do not attempt to investigate inside the consumer unit
          yourself. The busbars inside carry the full supply current and are at mains voltage. Call
          an electrician to inspect the consumer unit, retorque all connections, and replace any
          damaged components.
        </p>
      </>
    ),
  },
  {
    id: 'damaged-cable',
    heading: 'Damaged Cables',
    content: (
      <>
        <p>
          A damaged cable can cause a complete loss of power to part of a circuit or trip the
          protective device. Cable damage occurs in several ways:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DIY damage</strong> — drilling into a wall, screwing into a floor, or nailing
                into a joist without checking for cables first. This is extremely common and can
                sever a conductor or damage insulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rodent damage</strong> — rats and mice chew through cable insulation,
                exposing conductors. This can cause short circuits, earth faults, or open circuits
                depending on the extent of the damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Age-related degradation</strong> — very old cable (particularly rubber-insulated
                cable from pre-1960s installations) becomes brittle and the insulation cracks,
                exposing conductors. This can cause intermittent faults as the cracked insulation
                makes and breaks contact.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal damage</strong> — cables that have been overloaded or run near heat
                sources can have their insulation degraded. Downlighter cables in contact with
                halogen transformer housings are a common example.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Cable damage inside walls, floors, and ceiling voids is invisible from outside. An
          electrician uses insulation resistance testing and continuity testing to locate the damaged
          section, and may need to replace a cable run if the damage is significant.
        </p>
      </>
    ),
  },
  {
    id: 'shared-neutral',
    heading: 'Shared Neutral Issues in Older Properties',
    content: (
      <>
        <p>
          This is a more complex issue found primarily in older UK properties (pre-1980s). In a
          shared neutral arrangement, two or more circuits share a common neutral conductor back to
          the consumer unit. This was a common and acceptable wiring practice at the time, but it
          creates a specific problem when the shared neutral is interrupted.
        </p>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">What Happens When a Shared Neutral Breaks</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            When the shared neutral conductor breaks or becomes disconnected, the circuits that share
            it are effectively connected in series rather than in parallel. This causes:
          </p>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>Some circuits may lose power completely</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>Other circuits may receive higher-than-normal voltage, potentially damaging appliances</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>Lights may become abnormally bright on one circuit while dim on another</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>Voltage at sockets becomes unpredictable and load-dependent</span>
            </li>
          </ul>
        </div>
        <p>
          <strong>If you notice lights getting abnormally bright, switch off the main switch
          immediately and call an electrician.</strong> Overvoltage can damage sensitive electronics
          and appliances, and is a sign of a neutral fault that needs urgent repair. An electrician
          will test for shared neutrals, locate the break, and repair or rewire the affected circuits.
        </p>
      </>
    ),
  },
  {
    id: 'ring-main-break',
    heading: 'Ring Main Break',
    content: (
      <>
        <p>
          Most UK socket circuits are wired as ring final circuits — the cable starts at the consumer
          unit, loops through every socket on the circuit, and returns to the consumer unit. This
          means each socket is fed from two directions, and the load is shared between the two legs
          of the ring.
        </p>
        <p>
          When the ring breaks (a disconnection at one point in the ring), the circuit effectively
          becomes a radial circuit supplied from one end. Sockets between the break and the far end
          of the ring may lose power entirely, or the circuit may continue to work but with the full
          load concentrated on one leg of the ring — which can cause overheating.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Some sockets work, some do not</strong> — sockets on one side of the break
                continue to work from one leg; sockets on the other side lose power if the break is
                a complete disconnection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The MCB trips under load</strong> — a broken ring concentrates current on one
                leg. The single cable may overheat under full load, or a loose connection at the break
                point may arc and trip the MCB.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common break points</strong> — back of socket terminals (loose screws),
                junction boxes under floors, and connections inside ceiling roses where ring circuits
                pass through lighting points.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A broken ring is not always obvious because many sockets may continue to work. It is
          typically discovered during an{' '}
          <SEOInternalLink href="/guides/eicr-certificate">
            EICR inspection
          </SEOInternalLink>{' '}
          when the electrician performs a ring continuity test, or when an investigation is triggered
          by tripping or partial power loss.
        </p>
      </>
    ),
  },
  {
    id: 'blown-fuse',
    heading: 'Blown Cartridge Fuse in Older Boards',
    content: (
      <>
        <p>
          If your consumer unit uses fuse carriers instead of MCBs (common in properties built before
          the 1990s), a blown fuse is the equivalent of a tripped MCB. There are two types:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">Rewirable Fuses (BS 3036)</h4>
            <p className="text-white text-sm leading-relaxed">
              These have a visible piece of fuse wire between two screw terminals. When blown, the
              wire will be broken — you can see it through the front of the fuse carrier. To replace,
              switch off the main switch, remove the fuse carrier, unscrew the old wire, thread new
              fuse wire of the correct rating through the carrier, and reinsert. Always use the
              correct rating wire — using a higher rating is extremely dangerous.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">Cartridge Fuses (BS 1361)</h4>
            <p className="text-white text-sm leading-relaxed">
              These use a small cylindrical fuse (similar to a plug fuse but larger). You cannot see
              whether the fuse is blown by looking at it — you need to test it with a multimeter
              (continuity test) or try a replacement. Cartridge fuses are colour-coded by rating:
              white (5A), blue (15A), yellow (20A), red (30A), green (45A).
            </p>
          </div>
        </div>
        <p>
          If you are replacing fuses regularly on the same circuit, the circuit has a recurring fault
          that needs investigating. Fuse boards also provide no RCD protection, which is a
          significant safety concern. Consider a{' '}
          <SEOInternalLink href="/guides/consumer-unit-upgrade">
            consumer unit upgrade
          </SEOInternalLink>{' '}
          to a modern MCB/RCBO board for better protection and convenience.
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
          If resetting the breaker or replacing a fuse restores power and it stays on, you may not
          need an electrician immediately (but monitor the situation). Here is when you definitely need
          professional help:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency</strong> — burning smell from the consumer unit, abnormally bright
                lights (possible neutral fault), scorch marks on the consumer unit or any socket, or
                the MCB will not reset at all. Switch off the main switch and call an electrician
                immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Urgent</strong> — power loss is intermittent (flickering, cutting in and out),
                the MCB trips repeatedly after reset, you have lost power with no obvious tripped
                breaker, or a fuse blows immediately on replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Routine</strong> — the MCB reset successfully and is holding, but you want
                the circuit investigated to find out why it tripped. Or you have an older fuse board
                and want to discuss upgrading to a modern consumer unit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An electrician will perform continuity testing, insulation resistance testing, and load
          measurements to identify the fault. For recurring issues, a full{' '}
          <SEOInternalLink href="/guides/eicr-certificate">
            EICR
          </SEOInternalLink>{' '}
          will identify all defects across the entire installation and prioritise them by severity.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Diagnosing Partial Power Loss',
    content: (
      <>
        <p>
          Partial power loss calls require you to quickly narrow down whether the issue is at the
          consumer unit, in the circuit wiring, or at a specific point:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <CircuitBoard className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">1. Consumer Unit Inspection</h4>
                <p className="text-white text-sm leading-relaxed">
                  Visually inspect the consumer unit for signs of overheating (discolouration, melted
                  plastic, burning smell). Test voltage at the affected MCB output terminals with the
                  MCB on — no voltage indicates a supply-side issue (loose connection on busbar or
                  incoming cable). Retorque all connections on affected circuits. Check the incoming
                  supply — measure voltage at the main switch to rule out DNO supply faults.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">2. Circuit Testing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Perform continuity testing (R1, R2, R1+R2) on the affected circuit. For ring final
                  circuits, carry out the full ring continuity test to verify the ring is complete and
                  identify any break points. Test insulation resistance at 500V DC (L-E, N-E, L-N) —
                  minimum 1 megohm. Low readings indicate cable damage or moisture ingress. Use the
                  half-split technique to narrow down the fault location on long cable runs.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">3. Shared Neutral Detection</h4>
                <p className="text-white text-sm leading-relaxed">
                  If the customer reports abnormally bright lights or damaged appliances, suspect a
                  neutral fault. Test neutral-to-earth voltage at several points — elevated N-E
                  voltage indicates a high-impedance neutral connection or break. Check for shared
                  neutrals at junction boxes and the consumer unit. Multi-core cables running between
                  circuits in older properties are the typical location.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">4. Repair and Certify</h4>
                <p className="text-white text-sm leading-relaxed">
                  Repair the fault and test the circuit thoroughly before re-energising. Issue a{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works Certificate
                  </SEOInternalLink>{' '}
                  for the repair work. If the investigation reveals wider installation issues (shared
                  neutrals, degraded cables, inadequate protection), recommend and quote for a full
                  EICR and any necessary remedial works.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Record test results and issue certificates on your phone"
          description="Elec-Mate lets you complete EICRs and Minor Works Certificates on site with full test result recording. AI-powered fault diagnosis, observation codes, and instant professional PDF export."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NoElectricityInPartOfHousePage() {
  return (
    <GuideTemplate
      title="No Electricity in Part of House | Causes & Fixes"
      description="Lost electricity in part of your house? Learn the causes — tripped MCB, loose connections, damaged cables, shared neutral faults, ring main breaks, and blown fuses. What to check yourself and when to call an electrician."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Common Problem"
      badgeIcon={Power}
      heroTitle={
        <>
          No Electricity in Part of House:{' '}
          <span className="text-yellow-400">Causes and Fixes</span>
        </>
      }
      heroSubtitle="Part of your house has lost power. This guide covers every common cause — from a simple tripped breaker to shared neutral faults in older properties — tells you what to check yourself, and explains when to call an electrician."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Partial Power Loss"
      relatedPages={relatedPages}
      ctaHeading="Diagnose Power Loss and Certify Repairs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for AI fault diagnosis, circuit testing records, and professional certificates. 7-day free trial, cancel anytime."
    />
  );
}
