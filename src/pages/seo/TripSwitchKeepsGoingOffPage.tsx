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
  Droplets,
  Power,
  Plug,
  CircuitBoard,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Trip Switch Keeps Going Off', href: '/guides/trip-switch-keeps-going-off' },
];

const tocItems = [
  { id: 'overview', label: 'Why Does My Trip Switch Keep Going Off?' },
  { id: 'mcb-vs-rcd', label: 'MCB vs RCD: Understanding the Difference' },
  { id: 'overloaded-circuit', label: 'Overloaded Circuits' },
  { id: 'earth-fault', label: 'Earth Faults' },
  { id: 'moisture-ingress', label: 'Moisture Ingress' },
  { id: 'faulty-appliance', label: 'How to Find a Faulty Appliance' },
  { id: 'consumer-unit', label: 'When Your Consumer Unit Needs Replacing' },
  { id: 'when-to-call', label: 'When to Call an Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A "trip switch" can be either an MCB (Miniature Circuit Breaker) or an RCD (Residual Current Device). They trip for completely different reasons, and knowing which one is tripping tells you what type of fault you have.',
  'An MCB trips because of overcurrent — too much current flowing through the circuit. This is caused by overloading (too many appliances) or a short circuit (live touching neutral or earth). MCBs protect the cable from overheating.',
  'An RCD trips because of an earth fault — current is leaking to earth through an unintended path. This could be a faulty appliance, damaged cable, or moisture. RCDs protect people from electric shock. Under Regulation 411.3.3 of BS 7671, additional protection by an RCD rated at 30mA is required for socket outlets up to 32A and mobile equipment up to 32A for outdoor use.',
  'The most common cause of repeated tripping is a faulty appliance. You can identify it by unplugging everything, resetting the trip, and plugging appliances back in one at a time until it trips again.',
  'Moisture ingress — from rain entering an outdoor socket, a leaking pipe near wiring, or condensation in a junction box — is a very common cause of RCD tripping, especially in autumn and winter.',
  'If your consumer unit is old (rewirable fuses, no RCD protection), repeated tripping may indicate it is time for a consumer unit upgrade to provide proper circuit-by-circuit protection with RCBOs.',
];

const faqs = [
  {
    question: 'What is the difference between an MCB and an RCD?',
    answer:
      'An MCB (Miniature Circuit Breaker) protects against overcurrent — it trips when too much current flows through the circuit, caused by overloading or a short circuit. Each circuit has its own MCB. An RCD (Residual Current Device) protects against earth faults — it trips when it detects current leaking to earth, which could indicate a shock hazard. An RCD typically covers multiple circuits. An RCBO combines both functions in a single device, providing overcurrent and earth fault protection per circuit.',
  },
  {
    question: 'Why does my RCD trip at night?',
    answer:
      'An RCD tripping at night is often caused by appliances that cycle on and off automatically — the most common culprit is a fridge or freezer. As the compressor motor ages, insulation breakdown in the motor windings causes a small earth leakage current. During the day, this may not be noticed because other loads mask the issue. At night, when the motor starts and the leakage spike occurs, the RCD trips. Another cause is outdoor lighting with moisture ingress — dew and condensation form overnight and create an earth fault path.',
  },
  {
    question: 'Can I just hold the trip switch up?',
    answer:
      'No. If a trip switch will not stay in the "on" position, it is detecting an active fault. Holding it, taping it, or wedging it is extremely dangerous and defeats the safety protection. The fault must be found and repaired. If the trip switch resets but trips again within minutes or hours, the fault is intermittent and still needs investigation. Never bypass or disable a trip switch.',
  },
  {
    question: 'Why does my trip switch go off when I use the shower?',
    answer:
      'Electric showers draw a very high current (typically 36A to 48A for a 9.5kW to 10.8kW shower). If the MCB trips, the circuit may be underrated for the shower, or the MCB itself may be faulty. If the RCD trips, there is likely an earth fault in the shower unit — water and steam can cause insulation breakdown in older shower units. Electric showers should be on a dedicated circuit with appropriate MCB rating and RCD protection. Have an electrician check the shower circuit.',
  },
  {
    question: 'My trip switch trips and I cannot reset it — what do I do?',
    answer:
      'If the trip switch will not reset at all (it springs back to the off or middle position immediately), there is a hard fault on the circuit — typically a short circuit or a major earth fault. Do not keep trying to reset it. If it is an individual MCB, you have lost one circuit and can use the rest of the house normally. If it is the main RCD, you may lose power to multiple circuits. In either case, call an electrician. While waiting, you can try unplugging all appliances on the affected circuit and then attempting to reset — if it holds, plug appliances back one at a time to find the faulty one.',
  },
  {
    question: 'How often should trip switches trip?',
    answer:
      'In a healthy installation with modern appliances, trip switches should rarely trip. An occasional MCB trip when you accidentally overload a circuit (running too many high-power appliances at once) is normal. But regular or repeated tripping — more than once or twice a year — indicates a fault that needs investigating. Frequent RCD tripping in particular should never be ignored, as it indicates current is leaking to earth, which is a potential shock or fire hazard.',
  },
  {
    question: 'Should I upgrade to RCBOs?',
    answer:
      'RCBOs (Residual Current Breaker with Overcurrent protection) combine MCB and RCD protection in a single device, one per circuit. The main advantage is that an earth fault on one circuit only trips that one RCBO, rather than an RCD tripping and taking out multiple circuits. If your current consumer unit uses a split-load arrangement (one or two RCDs covering groups of circuits), upgrading to a full RCBO board provides much better selectivity and convenience. It is a worthwhile upgrade, especially if you experience nuisance tripping affecting multiple circuits.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-upgrade',
    title: 'Consumer Unit Upgrade Guide',
    description: 'Why and when to upgrade your consumer unit to modern RCBO protection.',
    icon: CircuitBoard,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-fault-finding',
    title: 'Electrical Fault Finding Guide',
    description: 'Systematic approach to diagnosing electrical faults including tripping circuits.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description: 'Current regulations for consumer units including RCD and RCBO requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Guide',
    description: 'How an EICR identifies faults causing repeated tripping and other installation defects.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/no-electricity-in-part-of-house',
    title: 'No Electricity in Part of House',
    description: 'When a tripped breaker leaves part of your home without power — causes and fixes.',
    icon: Power,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Does My Trip Switch Keep Going Off?',
    content: (
      <>
        <p>
          The trip switch keeps flipping off, plunging part or all of your house into darkness. You
          push it back up, it holds for a while, then trips again. This is one of the most common
          electrical problems in UK homes, and one of the most searched-for — because it is
          frustrating, disruptive, and can feel alarming.
        </p>
        <p>
          The trip switch is doing its job. It is a safety device designed to disconnect the circuit
          when it detects a fault. The question is not "why is it tripping?" but "what fault is it
          detecting?" Understanding the answer starts with knowing which type of trip switch is
          tripping — because MCBs and RCDs trip for completely different reasons.
        </p>
        <p>
          This guide explains the difference clearly, covers every common cause, shows you how to
          isolate a faulty appliance yourself, and tells you when you need a qualified electrician.
          If you are an electrician, the later sections cover{' '}
          <SEOInternalLink href="/guides/electrical-fault-finding">
            systematic fault finding
          </SEOInternalLink>{' '}
          for tripping circuits.
        </p>
      </>
    ),
  },
  {
    id: 'mcb-vs-rcd',
    heading: 'MCB vs RCD: Understanding the Difference',
    content: (
      <>
        <p>
          This is the single most important thing to understand about tripping. Look at your consumer
          unit (the box with the switches, usually near your front door or under the stairs). You
          will see two types of switch:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white mb-2">MCB (Miniature Circuit Breaker)</h4>
            <p className="text-white text-sm leading-relaxed mb-3">
              MCBs are the smaller switches, usually in a row. Each one protects a single circuit
              (e.g., "Kitchen sockets", "Upstairs lights", "Cooker"). They are typically rated at
              6A, 10A, 16A, 20A, or 32A.
            </p>
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
              <p className="text-white text-sm leading-relaxed">
                <strong>An MCB trips because of overcurrent.</strong> This means more current is
                flowing through the circuit than the MCB is rated for. There are two causes:
                <strong> overloading</strong> (too many appliances drawing too much current) or a
                <strong> short circuit</strong> (live conductor touching neutral or earth, causing a
                massive current surge). MCBs protect the cable from overheating and catching fire.
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h4 className="font-bold text-white mb-2">RCD (Residual Current Device)</h4>
            <p className="text-white text-sm leading-relaxed mb-3">
              RCDs are the larger switches, usually one or two in the consumer unit. They often have
              a "T" or "Test" button on the front. Each RCD protects a group of circuits.
            </p>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
              <p className="text-white text-sm leading-relaxed">
                <strong>An RCD trips because of an earth fault.</strong> It continuously compares the
                current flowing out on the live conductor with the current returning on the neutral.
                If there is a difference (even as small as 30 milliamps), it means current is leaking
                to earth through an unintended path — possibly through a person. The RCD disconnects
                in milliseconds to prevent electric shock. Regulation 411.3.3 of BS 7671 requires
                additional RCD protection (rated residual operating current not exceeding 30mA) for
                all socket outlets rated up to 32A and for mobile equipment rated up to 32A used
                outdoors.
              </p>
            </div>
          </div>
        </div>
        <p>
          <strong>Why this matters:</strong> If an MCB is tripping, the fault is overcurrent — look
          for overloaded circuits or short circuits. If the RCD is tripping, the fault is earth
          leakage — look for faulty appliances, damaged cables, or moisture ingress. If you have
          RCBOs (which combine both functions), the tripped device tells you both the circuit and the
          type of fault.
        </p>
      </>
    ),
  },
  {
    id: 'overloaded-circuit',
    heading: 'Overloaded Circuits: Too Many Appliances',
    content: (
      <>
        <p>
          An overloaded circuit is the simplest and most common cause of MCB tripping. The total
          current drawn by all the appliances on one circuit exceeds the MCB rating, and the MCB
          trips to protect the cable.
        </p>
        <p>
          This typically happens in kitchens, where high-power appliances are concentrated. A ring
          final circuit protected by a 32A MCB can supply up to 7.36kW — but a kettle (3kW), a
          toaster (2kW), a microwave (1.4kW), and a dishwasher (2.2kW) running simultaneously draw
          8.6kW (37A), exceeding the circuit capacity.
        </p>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Signs of an Overloaded Circuit</h3>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>The MCB trips when you switch on a specific high-power appliance</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>It only trips when multiple appliances are running at the same time</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>The MCB resets fine and holds until you load the circuit up again</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>You are using extension leads to plug many appliances into a limited number of sockets</span>
            </li>
          </ul>
        </div>
        <p>
          The fix is straightforward: reduce the load on the circuit by staggering high-power
          appliance use (do not run the kettle and toaster at the same time), or have an electrician
          install additional circuits to distribute the load. In kitchens, a dedicated circuit for
          high-power appliances is often the best solution.
        </p>
      </>
    ),
  },
  {
    id: 'earth-fault',
    heading: 'Earth Faults: Current Leaking Where It Should Not',
    content: (
      <>
        <p>
          An earth fault occurs when current finds an unintended path to earth. This could be through
          damaged cable insulation allowing the live conductor to touch the metal conduit or back box,
          a faulty appliance with a breakdown in its internal insulation, or water creating a
          conductive path between live parts and earth.
        </p>
        <p>
          Earth faults cause RCD tripping. The RCD detects the imbalance between live and neutral
          current (because some current is flowing to earth instead of returning via neutral) and
          disconnects the circuit. This is a critical safety function — the same earth fault that
          trips the RCD could deliver a lethal shock to a person if the RCD were not present.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Common Earth Fault Locations</h3>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damaged cables</strong> — cables nicked by screws or nails during DIY work,
                crushed cables under floorboards, or aged cable with degraded insulation
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Faulty appliances</strong> — washing machines, dishwashers, and tumble dryers
                are common culprits due to the combination of motors, water, and heat
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor circuits</strong> — garden lighting, outdoor sockets, and pond pumps
                are exposed to weather and are frequent earth fault sources
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Immersion heaters</strong> — the heating element is submerged in water, and
                insulation breakdown allows current to leak through the water to the cylinder
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'moisture-ingress',
    heading: 'Moisture Ingress: The Seasonal Culprit',
    content: (
      <>
        <p>
          Moisture is one of the most common causes of RCD tripping, and it often catches homeowners
          by surprise because it is intermittent and seasonal. Water is a conductor — when it gets
          into electrical enclosures, it creates a path for current to leak to earth, tripping the
          RCD.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor sockets and lights</strong> — rain can enter through damaged gaskets,
                cracked enclosures, or poorly sealed cable entries. This is the number one cause of
                RCD tripping in autumn and winter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Junction boxes in loft spaces</strong> — condensation forms on cold surfaces
                in lofts, particularly during temperature changes. Water droplets on terminal blocks
                create earth leakage paths.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bathroom and kitchen fittings</strong> — steam and condensation can enter
                light fittings, extractor fan terminals, and downlight housings. Recessed downlights
                in bathroom ceilings are particularly vulnerable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underground cables</strong> — SWA cables supplying garden buildings or
                outhouses can be damaged by garden work or have corroded glands allowing water entry.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If your RCD trips mainly during wet weather, after rain, or during cold snaps, moisture
          ingress is the most likely cause. An electrician can isolate individual circuits and use
          insulation resistance testing to identify which circuit has the moisture problem.
        </p>
      </>
    ),
  },
  {
    id: 'faulty-appliance',
    heading: 'How to Find a Faulty Appliance',
    content: (
      <>
        <p>
          If your RCD or MCB trips repeatedly, a faulty appliance is often the cause. You can identify
          which appliance is responsible using this simple isolation technique:
        </p>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Step 1: Unplug everything</h4>
            <p className="text-white text-sm leading-relaxed">
              Go around the house and unplug every appliance from every socket on the affected circuit
              (or all circuits if the RCD has tripped). Physically unplug them — do not just switch off
              at the socket, as some faults occur even when the appliance is switched off but still
              plugged in.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Step 2: Reset the trip switch</h4>
            <p className="text-white text-sm leading-relaxed">
              With everything unplugged, reset the tripped MCB or RCD. If it holds in the "on"
              position, the fault is in one of the appliances you unplugged. If it still trips with
              everything unplugged, the fault is in the fixed wiring — call an electrician.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Step 3: Plug in one appliance at a time</h4>
            <p className="text-white text-sm leading-relaxed">
              Plug in one appliance, switch it on, and wait a minute. If the trip holds, that
              appliance is fine — leave it plugged in and move to the next one. When you plug in the
              faulty appliance, the trip switch will go off again. That is your culprit.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Step 4: Deal with the faulty appliance</h4>
            <p className="text-white text-sm leading-relaxed">
              Once identified, leave the faulty appliance unplugged. If it is under warranty, contact
              the manufacturer. If it is an older appliance (washing machine, dishwasher, tumble
              dryer), it may need repair or replacement. Do not continue using an appliance that trips
              the RCD — it has an earth fault that could cause a shock.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'consumer-unit',
    heading: 'When Your Consumer Unit Needs Replacing',
    content: (
      <>
        <p>
          Sometimes the problem is not a single fault but the consumer unit itself. If your consumer
          unit is old or inadequate, it may contribute to tripping problems or fail to provide proper
          protection:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuses (no MCBs)</strong> — if your consumer unit still uses
                rewirable fuses with fuse wire, it provides no RCD protection at all. A fault that
                would trip an RCD in a modern board goes undetected, creating a shock hazard. Upgrading
                to a modern consumer unit with MCBs or RCBOs provides circuit-level protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single RCD covering all circuits</strong> — a single RCD means one earth fault
                on any circuit trips the entire house. This is the cause of "the whole house goes off"
                complaints. Upgrading to a split-load board (two RCDs) or a full RCBO board gives much
                better selectivity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plastic consumer unit</strong> — since January 2016 (Amendment 3 to BS 7671),
                consumer units in domestic premises must be enclosed in a non-combustible material
                (metal). A plastic consumer unit does not meet current regulations and should be
                replaced. See our{' '}
                <SEOInternalLink href="/guides/consumer-unit-upgrade">
                  consumer unit upgrade guide
                </SEOInternalLink>{' '}
                for more detail.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Worn or faulty MCBs</strong> — MCBs can degrade over time, particularly if
                they have tripped many times. A worn MCB may trip at a lower current than its rating,
                causing nuisance tripping. An electrician can test the MCB trip characteristics and
                replace any that are out of specification.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-call',
    heading: 'When to Call an Electrician',
    content: (
      <>
        <p>
          Some tripping situations you can resolve yourself (overloaded circuit, faulty appliance
          identification). Others require an electrician:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency</strong> — the trip switch will not reset at all, there is a
                burning smell from the consumer unit, the consumer unit is warm or hot to the touch,
                or you can see scorch marks. Isolate the main switch and call an electrician
                immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Urgent</strong> — the trip switch trips with everything unplugged (fault is
                in the fixed wiring), the RCD trips randomly with no apparent pattern, or the same MCB
                trips repeatedly even with reduced load on the circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Routine</strong> — you have identified a faulty appliance causing the
                tripping (remove the appliance from use), or the tripping only occurs during wet
                weather (suggesting moisture ingress that needs tracing). Arrange an inspection at
                your convenience.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When the electrician visits, they will use insulation resistance testing, earth fault loop
          impedance testing, and circuit-by-circuit isolation to identify the fault. They may
          recommend a full{' '}
          <SEOInternalLink href="/guides/eicr-certificate">
            EICR
          </SEOInternalLink>{' '}
          if the installation has not been inspected recently, as repeated tripping can be
          symptomatic of wider installation problems.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Systematic Fault Finding for Tripping',
    content: (
      <>
        <p>
          Tripping call-outs require systematic diagnosis. Resist the urge to start changing
          components before you have identified the fault:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">1. Identify Which Device Is Tripping</h4>
                <p className="text-white text-sm leading-relaxed">
                  Confirm whether it is an MCB, RCD, or RCBO tripping. This determines your fault
                  finding path — overcurrent (MCB) or earth fault (RCD). Check all devices in the
                  consumer unit, not just the one the customer points to. A customer saying "the trip
                  switch" may not know which device has tripped.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">2. Isolate and Test Circuit by Circuit</h4>
                <p className="text-white text-sm leading-relaxed">
                  For RCD tripping: turn off all MCBs under the tripped RCD. Reset the RCD. Turn on
                  MCBs one at a time. When the RCD trips, you have identified the faulty circuit. For
                  that circuit, perform insulation resistance testing at 500V DC (L-E, N-E minimum 1
                  megohm). Low insulation resistance on L-E or N-E indicates the earth fault location
                  (further testing or half-split isolation narrows it down).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">3. Check Common Culprits</h4>
                <p className="text-white text-sm leading-relaxed">
                  Outdoor circuits (check all IP-rated enclosures for moisture), immersion heater
                  (disconnect and test insulation resistance), cooker connection (check the terminal
                  block behind the cooker for heat damage), and shower (check element insulation).
                  For MCB tripping on ring circuits, check the ring is continuous — a broken ring
                  concentrates load on one leg and can cause overcurrent tripping at lower-than-expected
                  loads.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">4. Document and Certify</h4>
                <p className="text-white text-sm leading-relaxed">
                  Record your test results and remedial actions. If the work involves replacing a
                  consumer unit or adding circuits, a full{' '}
                  <SEOInternalLink href="/guides/electrical-installation-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  is required. For repairs to existing circuits, issue a{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works Certificate
                  </SEOInternalLink>.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Diagnose and document tripping faults on your phone"
          description="Elec-Mate's AI fault diagnosis helps you systematically identify tripping causes. Complete test schedules, EICRs, and Minor Works Certificates on site with instant PDF export."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function TripSwitchKeepsGoingOffPage() {
  return (
    <GuideTemplate
      title="Trip Switch Keeps Going Off | Why & How to Fix"
      description="Trip switch keeps tripping? Learn why — MCB vs RCD tripping explained, overloaded circuits, earth faults, moisture ingress, faulty appliance isolation, and when your consumer unit needs replacing. Guide for UK homeowners and electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Common Problem"
      badgeIcon={Zap}
      heroTitle={
        <>
          Trip Switch Keeps Going Off:{' '}
          <span className="text-yellow-400">Why and How to Fix</span>
        </>
      }
      heroSubtitle="Your trip switch keeps tripping and you want to know why. This guide explains the difference between MCB and RCD tripping, covers every common cause, shows you how to find a faulty appliance, and tells you when to call an electrician."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Trip Switches"
      relatedPages={relatedPages}
      ctaHeading="Diagnose Tripping Faults and Certify Repairs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for AI fault diagnosis, test result recording, and professional certificates. 7-day free trial, cancel anytime."
    />
  );
}
