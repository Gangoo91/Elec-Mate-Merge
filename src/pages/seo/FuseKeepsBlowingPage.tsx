import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  Search,
  Cable,
  Wrench,
  Zap,
  CircuitBoard,
  ClipboardCheck,
  Phone,
  Lightbulb,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Fuse Keeps Blowing', href: '/guides/fuse-keeps-blowing' },
];

const tocItems = [
  { id: 'overview', label: 'Why Does My Fuse Keep Blowing?' },
  { id: 'how-fuses-work', label: 'How Fuses Work' },
  { id: 'common-causes', label: 'Common Causes' },
  { id: 'overloaded-circuits', label: 'Overloaded Circuits' },
  { id: 'short-circuits', label: 'Short Circuits' },
  { id: 'appliance-faults', label: 'Faulty Appliances' },
  { id: 'what-to-do', label: 'What to Do When a Fuse Blows' },
  { id: 'when-to-call', label: 'When to Call an Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A fuse that keeps blowing is a protective device doing its job — it is detecting a fault or overload and disconnecting the circuit to prevent damage, overheating, or fire.',
  'The three most common causes are overloaded circuits (too many appliances drawing more current than the fuse rating), short circuits (live conductor touching neutral or earth), and faulty appliances with internal insulation breakdown.',
  'Never replace a blown fuse with one of a higher rating. The fuse rating is matched to the cable size — a higher-rated fuse allows more current than the cable can safely carry, creating a fire risk.',
  'If the same fuse blows repeatedly, unplug all appliances from that circuit and replace the fuse. If it blows again with nothing plugged in, the fault is in the fixed wiring and requires an electrician.',
  'Modern consumer units use MCBs (miniature circuit breakers) instead of rewireable fuses. If your installation still has rewireable fuses, a consumer unit upgrade provides better protection and faster disconnection times.',
  'Regulation 411.3.3 of BS 7671 requires that, where RCD protection is used, the RCD shall disconnect all live conductors of the circuit. RCDs protect against earth faults that fuses alone cannot detect quickly enough.',
];

const faqs = [
  {
    question: 'Why does my fuse keep blowing for no apparent reason?',
    answer:
      'There is always a reason — fuses do not blow without cause. The fault may not be obvious because it could be intermittent (a loose connection that arcs under load), concealed (damaged cable inside a wall), or caused by an appliance with an internal fault that is not visible externally. If you cannot identify the cause by the process of elimination (unplugging appliances one at a time), an electrician can use insulation resistance testing and other diagnostic methods to find the fault.',
  },
  {
    question: 'Can I replace a 3A fuse with a 13A fuse?',
    answer:
      'Absolutely not. The fuse rating must match the circuit or appliance it protects. A 3A fuse in a plug protects a cable rated for low-current appliances (lamps, phone chargers). Replacing it with a 13A fuse means the cable could carry over four times its safe capacity before the fuse blows. This causes the cable to overheat, potentially melting the insulation and starting a fire. Always replace a fuse with the same rating — it is printed on the appliance or in the manual.',
  },
  {
    question: 'What is the difference between a fuse blowing and a trip switch tripping?',
    answer:
      'A fuse is a sacrificial device — when it blows, the wire inside melts and the fuse must be replaced. A trip switch (MCB — miniature circuit breaker) is a reusable device that mechanically disconnects and can be reset by flipping the switch back on. Both protect against overcurrent, but MCBs respond faster, are more precise, and do not need replacement after each fault. If your consumer unit still uses rewireable fuses, upgrading to MCBs is recommended.',
  },
  {
    question: 'Why does the fuse only blow at certain times of day?',
    answer:
      'This strongly suggests an overload rather than a dead short circuit. At certain times — typically mornings and evenings — you use more appliances simultaneously (kettle, toaster, microwave, hair dryer). The combined current exceeds the fuse rating and it blows. Map out which appliances are running when the fuse blows, add up their wattages, and compare with the fuse rating multiplied by 230V. If the total exceeds the limit, you need to redistribute appliances across different circuits or have additional circuits installed.',
  },
  {
    question: 'Is it safe to keep replacing a blown fuse?',
    answer:
      'Replacing a blown fuse once is fine — that is what fuses are designed for. However, if the same fuse blows repeatedly, simply replacing it each time is dangerous because you are ignoring the underlying fault. Each time the fuse blows, there was a fault event — overcurrent, short circuit, or earth fault — that needs to be found and fixed. Repeated fault events can progressively damage wiring insulation, making the eventual failure more severe.',
  },
  {
    question: 'My fuse blows when I plug in a specific appliance. What should I do?',
    answer:
      'If one specific appliance consistently causes the fuse to blow, the most likely cause is an internal fault in that appliance — typically insulation breakdown causing a short circuit or earth fault. Stop using the appliance immediately. If it is a plug fuse (the small fuse inside the plug) that blows, the fault is in the appliance or its lead. If it is the main circuit fuse or MCB that trips, the fault current is higher and the appliance should not be used until it has been inspected and repaired by a qualified repair technician or replaced.',
  },
  {
    question: 'What size fuse should I use?',
    answer:
      'For plug fuses in the UK: most appliances up to 700W (3A x 230V) use a 3A fuse — this includes lamps, televisions, computers, phone chargers, and most audio equipment. Appliances above 700W use a 13A fuse — this includes kettles, toasters, irons, heaters, and washing machines. The correct fuse rating is usually marked on the appliance or in the manual. For circuit fuses in the consumer unit, the rating is determined by the cable size and circuit design — this should only be changed by a qualified electrician.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/tripped-mcb-wont-reset',
    title: "Tripped MCB Won't Reset",
    description:
      'What to do when your circuit breaker trips and refuses to reset — causes and solutions.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-upgrade',
    title: 'Consumer Unit Upgrade Guide',
    description: 'Upgrading from rewireable fuses to modern MCBs and RCBOs for better protection.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-fault-finding',
    title: 'Electrical Fault Finding Guide',
    description: 'Systematic fault finding for electricians investigating repeated fuse failures.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Guide',
    description: 'What an EICR involves and how it detects faults that cause fuses to blow.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/washing-machine-tripping-electrics',
    title: 'Washing Machine Tripping Electrics',
    description: 'Why washing machines cause fuses and RCDs to trip and how to diagnose the fault.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/ring-circuit-fault-finding',
    title: 'Ring Circuit Fault Finding',
    description: 'Diagnosing faults on ring final circuits including overloaded and broken rings.',
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
    heading: 'Why Does My Fuse Keep Blowing?',
    content: (
      <>
        <p>
          A fuse that blows once is doing its job — it detected a fault and disconnected the circuit
          to keep you safe. A fuse that keeps blowing is telling you that the fault is still there
          and needs to be found and fixed.
        </p>
        <p>
          Fuses are overcurrent protection devices. They contain a thin wire (or cartridge element)
          that melts when the current flowing through it exceeds its rated capacity. This
          disconnection prevents the circuit cables from overheating, which could cause insulation
          damage and fire.
        </p>
        <p>
          This guide covers why fuses blow, the most common causes, what you can safely check
          yourself, and when you need to call a qualified electrician. If you are an electrician,
          the later sections cover systematic{' '}
          <SEOInternalLink href="/guides/electrical-fault-finding">
            fault finding approaches
          </SEOInternalLink>{' '}
          for repeated fuse failures.
        </p>
      </>
    ),
  },
  {
    id: 'how-fuses-work',
    heading: 'How Fuses Work',
    content: (
      <>
        <p>
          Understanding how a fuse works helps you understand why it blows. A fuse is a deliberately
          weak point in the circuit — it is designed to fail before the cable does.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plug fuses (BS 1362)</strong> — the small cylindrical cartridge fuse inside
                a UK plug. Available in 3A and 13A ratings (other ratings exist but are less
                common). The fuse element melts when current exceeds the rating for a sustained
                period.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewireable fuses (BS 3036)</strong> — older consumer unit fuses with a thin
                wire stretched between two terminals. When current exceeds the rating, the wire
                melts and must be replaced with the correct gauge of fuse wire. These have a lower
                fusing factor than cartridge fuses, meaning they are less precise.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cartridge fuses (BS 88 / BS 1361)</strong> — used in older consumer units
                and some fused connection units. More precise than rewireable fuses but still
                sacrificial — they must be replaced after blowing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCBs (miniature circuit breakers)</strong> — the modern replacement for
                fuses in consumer units. They trip (disconnect) on overcurrent and can be reset.
                MCBs do not blow — they trip. If your consumer unit has MCBs, see our{' '}
                <SEOInternalLink href="/guides/tripped-mcb-wont-reset">
                  tripped MCB guide
                </SEOInternalLink>{' '}
                instead.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-causes',
    heading: 'Common Causes of Blown Fuses',
    content: (
      <>
        <p>
          There are three fundamental reasons a fuse blows. Every blown fuse falls into one of these
          categories:
        </p>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">1. Overload</h4>
            <p className="text-white text-sm leading-relaxed">
              Too many appliances drawing more current than the fuse rating. The current exceeds the
              rated capacity for long enough to melt the fuse element. This is the most common cause
              and is covered in detail in the next section.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h4 className="font-bold text-white mb-2">2. Short circuit</h4>
            <p className="text-white text-sm leading-relaxed">
              A live conductor touches the neutral or earth conductor, creating a very low
              resistance path. The current spikes to hundreds or thousands of amps and the fuse
              blows almost instantly. Short circuits can occur inside appliances, in damaged cables,
              or at faulty connections.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h4 className="font-bold text-white mb-2">3. Earth fault</h4>
            <p className="text-white text-sm leading-relaxed">
              Current leaks from a live conductor to earth — typically through damaged insulation
              touching a metal enclosure. Earth faults may not always blow fuses quickly enough,
              which is why Regulation 411.3.3 of BS 7671 requires RCD protection to disconnect all
              live conductors rapidly when earth fault current is detected.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'overloaded-circuits',
    heading: 'Overloaded Circuits',
    content: (
      <>
        <p>
          Circuit overloading is the most common cause of repeatedly blown fuses. It happens when
          the total current drawn by all appliances on a circuit exceeds the fuse rating.
        </p>
        <p>
          A typical domestic ring final circuit is protected by a 32A MCB or 30A fuse. This sounds
          like a generous capacity, but high-power appliances use a surprising amount of current:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Kettle: 13A (3kW)</span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Fan heater: 13A (3kW)</span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Washing machine: 10A (2.2kW)</span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Tumble dryer: 11A (2.5kW)</span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Iron: 11A (2.5kW)</span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Microwave: 6A (1.4kW)</span>
            </li>
          </ul>
        </div>
        <p>
          Running a kettle, iron, and microwave simultaneously on the same circuit draws 30A — right
          at the limit. Add a TV and a lamp and the fuse blows. The solution is to spread high-power
          appliances across different circuits, or have additional circuits installed.
        </p>
        <p>
          For plug fuses, the arithmetic is simpler. A single socket with a 13A fuse can power
          appliances up to 3kW. If an extension lead is plugged in and the total load of all
          appliances on that extension exceeds 13A, the plug fuse will blow.
        </p>
      </>
    ),
  },
  {
    id: 'short-circuits',
    heading: 'Short Circuits',
    content: (
      <>
        <p>
          A short circuit causes a sudden, massive spike in current. The fuse blows almost instantly
          — often with a visible flash or a popping sound. Short circuits are more dangerous than
          overloads because the fault current can be extremely high.
        </p>
        <p>Common causes of short circuits include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damaged cable insulation</strong> — a nail or screw driven through a cable
                in the wall bridges the live and neutral conductors. This can happen years after the
                cable was installed if someone drills or fixes something to the wall.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Faulty appliance</strong> — internal wiring breakdown inside an appliance
                allows live and neutral conductors to touch. This is common in older appliances with
                degraded insulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Poor workmanship</strong> — incorrectly wired connections, stray strands of
                conductor bridging terminals, or insufficient cable stripping can create short
                circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Water ingress</strong> — water is a conductor. If water enters a junction
                box, socket, or light fitting, it can bridge live and neutral or live and earth,
                causing a short circuit or earth fault.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If a fuse blows instantly when replaced (without any appliances plugged in), a short
          circuit in the fixed wiring is almost certain. Do not keep replacing fuses — call an
          electrician.
        </p>
      </>
    ),
  },
  {
    id: 'appliance-faults',
    heading: 'Faulty Appliances',
    content: (
      <>
        <p>
          A single faulty appliance is one of the most common causes of a repeatedly blown fuse. The
          diagnosis is straightforward: if the fuse only blows when a specific appliance is plugged
          in and switched on, that appliance is the problem.
        </p>
        <p>Common appliance faults that blow fuses include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Motor burnout</strong> — appliances with motors (washing machines, vacuum
                cleaners, food processors) can develop short circuits in the motor windings when
                insulation breaks down.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heating element failure</strong> — kettles, irons, and immersion heaters
                have elements that can short-circuit to the casing when the insulation deteriorates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damaged flex</strong> — the flexible cable between the plug and the
                appliance can be damaged by kinking, crushing, or wear. Internal conductor damage
                can cause intermittent short circuits.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you suspect an appliance fault, stop using it immediately. Have it inspected by a
          qualified repair technician or replace it. Do not attempt to repair mains-powered
          appliances yourself unless you are competent to do so.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-do',
    heading: 'What to Do When a Fuse Blows',
    content: (
      <>
        <p>When a fuse blows, follow this systematic process to identify the cause safely:</p>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Step 1: Switch off and unplug</h4>
            <p className="text-white text-sm leading-relaxed">
              Turn off the main switch at the consumer unit if the fuse is a circuit fuse. Unplug
              all appliances from the affected circuit. If it is a plug fuse, simply unplug the
              appliance.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">
              Step 2: Replace the fuse with the correct rating
            </h4>
            <p className="text-white text-sm leading-relaxed">
              Replace the blown fuse with one of exactly the same rating. Never use a higher-rated
              fuse. For rewireable fuses, use the correct gauge of fuse wire. For cartridge fuses,
              use the exact same type and rating.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Step 3: Switch on without any appliances</h4>
            <p className="text-white text-sm leading-relaxed">
              Restore power to the circuit with all appliances still unplugged. If the fuse blows
              immediately, the fault is in the fixed wiring — call an electrician. If it holds, move
              to step 4.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">
              Step 4: Reconnect appliances one at a time
            </h4>
            <p className="text-white text-sm leading-relaxed">
              Plug in and switch on each appliance individually, waiting a minute between each. If
              the fuse blows when a specific appliance is connected, that appliance is faulty. If it
              blows only when several are running simultaneously, the circuit is overloaded.
            </p>
          </div>
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
          Some fuse problems can be resolved by identifying and removing a faulty appliance or
          reducing the load on a circuit. Others require professional investigation. Call an
          electrician in these situations:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fuse blows with nothing plugged in</strong> — this indicates a fault in the
                fixed wiring. Do not keep replacing fuses. Isolate the circuit and call an
                electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell or scorch marks</strong> — signs of overheating at a
                connection point. This is a fire risk. Isolate the circuit and call an electrician
                as an emergency.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Same fuse blows repeatedly</strong> — more than twice in a short period
                indicates a persistent fault. Continuing to replace fuses without finding the cause
                risks further damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple circuits affected</strong> — if fuses blow on more than one
                circuit, the problem may be at the consumer unit or the supply. This needs
                professional diagnosis.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Old rewireable fuse board</strong> — if your consumer unit still uses
                rewireable fuses, consider a{' '}
                <SEOInternalLink href="/guides/consumer-unit-upgrade">
                  consumer unit upgrade
                </SEOInternalLink>{' '}
                to modern MCBs and RCDs for better protection and faster disconnection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An electrician investigating repeated fuse failures will carry out insulation resistance
          tests, check for short circuits, measure circuit loads, and inspect all accessible
          connections. They may recommend a full{' '}
          <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> if the
          installation has not been inspected recently.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Diagnosing Repeated Fuse Failures',
    content: (
      <>
        <p>
          When a customer reports a fuse that keeps blowing, use this systematic diagnostic
          approach:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">1. History and Context</h4>
                <p className="text-white text-sm leading-relaxed">
                  Establish when the fuse blows (time of day, which appliances running), how often,
                  and whether anything changed recently (new appliance, building work, water leak).
                  This narrows the diagnosis significantly before you open a single cover.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">2. Insulation Resistance Testing</h4>
                <p className="text-white text-sm leading-relaxed">
                  With the circuit isolated and all loads disconnected, test IR at 500V DC: L-E,
                  N-E, L-N. Minimum acceptable value is 1 megohm per BS 7671 Table 6.3. Low readings
                  indicate insulation breakdown — then subdivide the circuit to locate the fault.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">3. Load Assessment</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use a clamp meter to measure actual circuit current under normal load conditions.
                  Compare with the fuse or MCB rating. For ring circuits, check that the ring is
                  complete — a broken ring forces all current through one leg, effectively halving
                  the circuit capacity.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">4. Remediate and Document</h4>
                <p className="text-white text-sm leading-relaxed">
                  Fix the root cause — replace damaged cable, repair or replace the faulty
                  appliance, redistribute loads, or add circuits as needed. Consider recommending a
                  consumer unit upgrade if the customer still has rewireable fuses. Issue a{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works Certificate
                  </SEOInternalLink>{' '}
                  for any remedial work carried out.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Document fault finding with professional certificates"
          description="Elec-Mate's certificate apps let you complete Minor Works Certificates and EICRs on your phone with test results, observation codes, and instant PDF export. Join 1,000+ UK electricians."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FuseKeepsBlowingPage() {
  return (
    <GuideTemplate
      title="Fuse Keeps Blowing | Causes & What to Do"
      description="Why does your fuse keep blowing? Learn the common causes — overloaded circuits, short circuits, faulty appliances — what to do step by step, and when to call an electrician. UK safety guide for homeowners and electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting"
      badgeIcon={Zap}
      heroTitle={
        <>
          Fuse Keeps Blowing: <span className="text-yellow-400">Causes and What to Do</span>
        </>
      }
      heroSubtitle="A fuse that keeps blowing is a warning sign. This guide explains the three main causes — overloaded circuits, short circuits, and faulty appliances — tells you what to check safely, and explains when to call an electrician."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Blown Fuses"
      relatedPages={relatedPages}
      ctaHeading="Diagnose and Document Electrical Faults on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for AI fault diagnosis, insulation resistance recording, and professional certificates. 7-day free trial, cancel anytime."
    />
  );
}
