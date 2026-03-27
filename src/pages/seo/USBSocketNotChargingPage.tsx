import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Usb,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  Search,
  Cable,
  Wrench,
  Zap,
  Thermometer,
  BadgeCheck,
  ShoppingCart,
  Plug,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'USB Socket Not Charging', href: '/guides/usb-socket-not-charging' },
];

const tocItems = [
  { id: 'overview', label: 'Why Is My USB Socket Not Charging?' },
  { id: 'common-causes', label: 'Common Causes' },
  { id: 'power-delivery', label: 'USB-A vs USB-C: Power Delivery Limits' },
  { id: 'thermal-shutdown', label: 'Thermal Shutdown Protection' },
  { id: 'replacing-usb-socket', label: 'Replacing a USB Socket' },
  { id: 'quality-brands', label: 'Quality Brands vs Cheap Imports' },
  { id: 'when-to-call', label: 'When to Call an Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The most common reason a USB socket stops charging is internal USB module failure. The USB charging module is a separate electronic component inside the socket that converts 230V mains to 5V DC. It has a limited lifespan, and budget units fail significantly faster than quality brands.',
  'USB-A ports on wall sockets typically deliver up to 2.1A (10.5W), while USB-C ports can deliver up to 3A (15W) or more with Power Delivery. If your device charges slowly, the USB port may not provide enough current for your device — this is a limitation, not a fault.',
  'Many USB sockets have internal thermal shutdown protection. If the USB module overheats (from heavy use, poor ventilation, or high ambient temperature), it shuts down to prevent damage. It will restart when it cools, causing intermittent charging.',
  'Replacing a USB socket with a like-for-like unit in the same location and on the same circuit is generally non-notifiable work. However, the mains connections behind the socket require competent electrical work — if in doubt, use an electrician.',
  'Quality matters significantly with USB sockets. Budget imports often use inferior components, have poor thermal management, and fail within 1 to 2 years. Quality brands (British General, MK, Schneider) use better components and typically last much longer.',
  'The mains socket part of a USB socket outlet usually continues to work even when the USB module fails. If the mains sockets are also dead, the problem is the circuit, not the USB module.',
];

const faqs = [
  {
    question: 'Why has my USB socket stopped charging?',
    answer:
      'The most likely cause is internal failure of the USB charging module. This is the electronic component inside the socket that converts 230V AC mains to the 5V DC your device needs. These modules contain capacitors and voltage regulators that degrade over time, especially in budget units. The mains socket part usually continues to work even when the USB module fails. Try a different device and cable first to rule those out — if multiple devices fail to charge, the USB module has failed and the socket needs replacing.',
  },
  {
    question: 'Can I replace a USB socket myself?',
    answer:
      'If you are replacing like-for-like (same type of socket, same location, same wiring), this is generally considered non-notifiable minor works. However, you will be working with mains voltage wiring behind the socket faceplate. You must isolate the circuit at the consumer unit before starting, and you need to be competent to reconnect the live, neutral, and earth conductors correctly. If you are not confident working with mains wiring, use a qualified electrician — it is a quick job for them and ensures it is done safely.',
  },
  {
    question: 'Why does my phone charge slowly from the USB wall socket?',
    answer:
      'Wall socket USB ports typically provide lower power than a dedicated charger. A USB-A port on a wall socket typically delivers 2.1A at 5V (10.5W), while modern phone chargers can deliver 20W to 65W or more using fast-charging protocols. The wall socket cannot match this speed because it uses a simple 5V output without fast-charging negotiation. USB-C wall sockets are better, typically delivering 3A at 5V (15W), but still slower than a dedicated fast charger. For the fastest charging, use the charger supplied with your device.',
  },
  {
    question: 'Is it safe to leave devices plugged into a USB wall socket overnight?',
    answer:
      'Yes, from a quality USB socket from a reputable manufacturer. Modern devices manage their own charging and stop drawing current when the battery is full. Quality USB sockets also have overcurrent and thermal protection. However, budget or counterfeit sockets may lack these protections. If you notice the socket getting warm during charging, or if the USB port shows signs of discolouration or damage, stop using it and have it replaced.',
  },
  {
    question: 'Why does my USB socket get warm?',
    answer:
      'Some warmth is normal during charging — the USB module converts 230V AC to 5V DC, and this conversion is not perfectly efficient. The lost energy becomes heat. A well-designed socket manages this heat safely. However, if the socket is uncomfortably warm or hot to the touch, it may indicate a failing USB module, poor thermal design (common in budget sockets), or overloading (charging multiple high-draw devices simultaneously). Replace a socket that runs hot — it is a potential fire risk.',
  },
  {
    question: 'Should I get USB-A or USB-C wall sockets?',
    answer:
      'USB-C is the better choice for new installations. USB-C provides higher charging power (typically 3A vs 2.1A for USB-A), is the standard for all modern phones, tablets, and laptops, and is futureproof. Many devices are now supplied with only a USB-C cable and no USB-A option. For maximum flexibility, choose a socket with both USB-A and USB-C ports — this covers older and newer devices. Avoid sockets with only USB-A, as this format is being phased out for charging.',
  },
  {
    question: 'Can a faulty USB socket damage my phone?',
    answer:
      'A quality USB socket from a reputable manufacturer is very unlikely to damage your phone — the output is regulated to 5V and your phone has its own protection circuits. However, a cheap or counterfeit socket with poor voltage regulation could potentially output higher-than-expected voltage, which could damage sensitive electronics. This is one of the reasons to use quality branded sockets. If a USB port causes your device to display a charging error or the device becomes very hot during charging, stop using that port immediately.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/warm-plug-or-socket',
    title: 'Warm Plug or Socket',
    description: 'What to do if a plug or socket is warm — causes, fire risk, and when to call an electrician.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-fault-finding',
    title: 'Electrical Fault Finding Guide',
    description: 'Systematic fault finding approach for diagnosing socket and circuit faults.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description: 'Understanding circuit protection in your consumer unit.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Guide',
    description: 'How an EICR assesses socket outlets and identifies defective equipment.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/minor-works-certificate',
    title: 'Minor Works Certificate',
    description: 'Documentation for socket replacement and minor electrical works.',
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
    heading: 'Why Is My USB Socket Not Charging?',
    content: (
      <>
        <p>
          You plug your phone into the USB port on the wall socket, and nothing happens. No charging
          indicator, no response at all. Or perhaps it worked yesterday but today it is dead. USB
          wall sockets have become extremely popular in UK homes — they are convenient, they save
          carrying separate chargers, and they look neat. But they have a weak point: the built-in
          USB charging module.
        </p>
        <p>
          Unlike a standard socket outlet, which is a simple electromechanical device with very few
          failure modes, a USB socket contains an active electronic circuit — a miniature power
          supply that converts 230V AC mains down to 5V DC. This electronic module has a limited
          lifespan and is the component that almost always fails first.
        </p>
        <p>
          This guide explains why USB sockets stop charging, the difference between USB-A and USB-C
          power delivery, why quality matters, and when replacement is needed. If you are an
          electrician, the later sections cover what to advise customers and the technical details of
          USB socket replacement.
        </p>
      </>
    ),
  },
  {
    id: 'common-causes',
    heading: 'Common Causes of USB Socket Failure',
    content: (
      <>
        <p>
          Before assuming the USB socket is faulty, rule out the device and cable first. Try a
          different cable, try a different device, and try the other USB port if there are two. If
          none of these work, the USB module has likely failed. Here are the common causes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Usb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>USB module internal failure</strong> — this is by far the most common cause.
                The internal power supply module contains electrolytic capacitors, voltage regulators,
                and other electronic components that degrade over time. Budget units are particularly
                prone to early failure (1 to 2 years), while quality units typically last 5 to 8
                years. When the module fails, the USB ports stop working entirely — the mains socket
                part usually continues to work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal shutdown</strong> — many USB modules have thermal protection that
                shuts the output off when the module overheats. This can be triggered by charging
                multiple devices simultaneously, high ambient temperature (sockets near radiators or
                in direct sunlight), or poor heat dissipation in the socket design. The USB port
                appears dead, then works again after cooling — creating intermittent charging.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damaged USB port</strong> — the physical USB-A or USB-C port can be damaged
                by inserting the cable at an angle, forcing the wrong connector, or general wear and
                tear. A damaged port may not make proper contact with the cable, preventing charging.
                Check for bent pins (USB-A) or debris in the port (USB-C).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mains supply issue</strong> — if the mains socket part of the USB socket is
                also not working, the problem is the circuit, not the USB module. Check whether the
                MCB has tripped at the consumer unit. If only the USB ports are dead but the mains
                sockets work, the USB module has failed internally.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incompatible device or cable</strong> — some older USB sockets do not
                properly negotiate charging with newer devices, particularly those requiring USB Power
                Delivery protocols. The device may not recognise the socket as a charger and refuse to
                draw current. This is a compatibility limitation rather than a fault.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'power-delivery',
    heading: 'USB-A vs USB-C: Power Delivery Limits',
    content: (
      <>
        <p>
          Understanding the power delivery capabilities of your USB wall socket helps explain why
          charging may be slow or why some devices do not charge at all:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white mb-2">USB-A Ports (Rectangular)</h4>
            <p className="text-white text-sm leading-relaxed mb-3">
              The original USB format found in most older USB wall sockets.
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold shrink-0">•</span>
                <span>Typical output: 5V at 2.1A (10.5W) — shared between ports if both are used</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold shrink-0">•</span>
                <span>Budget units may deliver only 1A (5W) — painfully slow for modern phones</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold shrink-0">•</span>
                <span>No fast-charging protocol support — limited to basic 5V charging</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold shrink-0">•</span>
                <span>Adequate for phones, fitness trackers, earbuds, and small devices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold shrink-0">•</span>
                <span>Too slow for tablets and completely unable to charge laptops</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h4 className="font-bold text-white mb-2">USB-C Ports (Oval/Reversible)</h4>
            <p className="text-white text-sm leading-relaxed mb-3">
              The modern standard, increasingly common in newer USB wall sockets.
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold shrink-0">•</span>
                <span>Typical output: 5V at 3A (15W) — significantly faster than USB-A</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold shrink-0">•</span>
                <span>Some premium sockets support USB-PD (Power Delivery) up to 30W or more</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold shrink-0">•</span>
                <span>USB-PD can negotiate higher voltages (9V, 12V, 20V) for faster charging</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold shrink-0">•</span>
                <span>Good for phones, tablets, and some laptops (with PD support)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold shrink-0">•</span>
                <span>The connector is reversible — no more trying to insert it the wrong way up</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          If your device charges slowly from a USB wall socket but charges quickly from the charger
          that came with it, the wall socket is not faulty — it simply does not deliver as much power
          as the dedicated charger. This is a very common misunderstanding.
        </p>
      </>
    ),
  },
  {
    id: 'thermal-shutdown',
    heading: 'Thermal Shutdown Protection',
    content: (
      <>
        <p>
          Quality USB sockets include thermal shutdown circuitry that cuts the USB output when the
          internal temperature exceeds a safe limit (typically 85-100°C at the module). This is a
          safety feature, not a fault — but it can be confusing because the USB port appears to stop
          working for no obvious reason.
        </p>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Causes of USB Module Overheating</h3>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Charging multiple devices simultaneously</strong> — two devices drawing
                maximum current doubles the heat generated by the USB module
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>High ambient temperature</strong> — sockets near radiators, in direct
                sunlight, or in poorly ventilated spaces start at a higher baseline temperature
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simultaneous mains load</strong> — if the mains socket is powering a
                high-current appliance (e.g., a fan heater at 13A) while the USB ports are charging,
                the total heat in the socket increases
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Poor socket design</strong> — budget sockets with cramped internal layouts
                and no heat sinking overheat more quickly than well-designed units
              </span>
            </li>
          </ul>
        </div>
        <p>
          If your USB socket stops charging after a period of use but works again after being left
          idle for a while, thermal shutdown is likely the cause. Consider upgrading to a
          better-quality socket with improved thermal management, or reduce the simultaneous load
          on the socket.
        </p>
      </>
    ),
  },
  {
    id: 'replacing-usb-socket',
    heading: 'Replacing a USB Socket',
    content: (
      <>
        <p>
          When the USB module fails, the entire socket outlet usually needs replacing (the USB module
          is not separately replaceable in most designs). Here is what you need to know:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Like-for-like is non-notifiable</strong> — replacing a USB socket with
                another USB socket in the same location, using the same wiring, is generally
                considered non-notifiable minor works under Building Regulations Part P. No
                certificate is required, though an electrician should still test the circuit after
                replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Deeper back boxes may be needed</strong> — USB sockets are deeper than
                standard sockets because of the USB module. If you are upgrading from a standard
                socket to a USB socket for the first time, you may need a deeper back box (35mm
                instead of 25mm). This requires chasing out the wall slightly deeper.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit isolation is essential</strong> — always isolate the circuit at the
                consumer unit before removing the socket faceplate. Verify the circuit is dead using a
                voltage tester before touching any wiring. Mains voltage (230V) can be lethal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring connections</strong> — USB sockets have the same terminal layout as
                standard sockets (L, N, E). Simply reconnect the cables in the same arrangement.
                On ring circuits, there will be two sets of cables (two lives, two neutrals, two
                earths). Ensure all terminals are tight.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'quality-brands',
    heading: 'Quality Brands vs Cheap Imports',
    content: (
      <>
        <p>
          The quality of USB wall sockets varies enormously, and this directly affects reliability,
          safety, and charging performance. This is one area where buying cheap really does cost more
          in the long run:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Quality Brands</h4>
            <p className="text-white text-sm leading-relaxed mb-3">
              Manufacturers such as British General (BG), MK, Schneider Electric, Knightsbridge,
              and Hamilton produce USB sockets that meet full UK safety standards:
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <BadgeCheck className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Proper thermal management with heat sinking and adequate clearances</span>
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Quality electrolytic capacitors rated for long life at elevated temperatures</span>
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Overcurrent, overvoltage, short circuit, and thermal shutdown protection</span>
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Accurate voltage regulation (stable 5V output regardless of load)</span>
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>BS 1363 certified with genuine third-party testing</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Budget Imports and Unbranded Units</h4>
            <p className="text-white text-sm leading-relaxed mb-3">
              Cheap USB sockets, often sold online for a fraction of the price, frequently have
              serious shortcomings:
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Low-quality capacitors that fail prematurely (often within 1 to 2 years)</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Minimal or no thermal protection — overheating risk</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Inaccurate voltage regulation — may output higher or lower than 5V</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Insufficient creepage and clearance distances (electrical safety standards)</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Fake or self-certified CE/UKCA marks — not independently tested</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          The price difference between a budget USB socket and a quality one is typically only a few
          pounds. Given that the socket is connected to your mains supply and used daily, the small
          extra cost for a reputable brand is well worth it for safety and reliability.
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
          Most USB socket failures are straightforward — the USB module has died and the socket needs
          replacing. Here is when to call a professional:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Urgent</strong> — the USB socket is hot to the touch, there is a burning
                smell, the faceplate is discoloured or shows scorch marks, or both the mains sockets
                and USB ports have stopped working (possible circuit fault). Stop using the socket
                and have it inspected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Soon</strong> — the USB ports have stopped working and you want the socket
                replaced but are not confident doing the mains wiring yourself. This is routine work
                for an electrician — typically a 15 to 20 minute job.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Routine</strong> — you want to upgrade from USB-A to USB-C sockets, add USB
                sockets where you currently have standard sockets, or replace multiple USB sockets
                as part of a wider refresh.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are replacing a USB socket yourself, always isolate the circuit at the consumer
          unit first and verify it is dead with a voltage tester. If you are not sure which breaker
          controls the socket, switch off the main switch.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: USB Socket Replacement Notes',
    content: (
      <>
        <p>
          USB socket replacements are quick, straightforward jobs, but there are a few technical
          points to be aware of:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">1. Back Box Depth</h4>
                <p className="text-white text-sm leading-relaxed">
                  USB sockets are deeper than standard socket outlets due to the USB module mounted
                  behind the faceplate. Most require a 35mm deep back box (standard sockets use 25mm).
                  If replacing a standard socket with a USB socket for the first time, you may need
                  to chase the back box hole deeper or use a surface-mounted pattress. Some slimline
                  USB sockets are designed to fit 25mm back boxes — check the product specifications.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">2. Circuit Testing After Replacement</h4>
                <p className="text-white text-sm leading-relaxed">
                  After replacement, verify the connections are correct and tight. Test insulation
                  resistance (particularly L-E, which can be affected if the USB module has a fault
                  to earth). Check earth continuity (R1+R2) at the socket. Test the RCD operates
                  correctly with a socket tester. Verify the USB output is functional by connecting a
                  device.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShoppingCart className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">3. Advise on Quality</h4>
                <p className="text-white text-sm leading-relaxed">
                  When the customer asks you to supply the replacement, recommend a quality brand.
                  Explain that the price difference is small but the lifespan and safety difference
                  is significant. Recommend USB-C or combo USB-A/USB-C sockets for futureproofing.
                  Advise against purchasing unbranded sockets from marketplace websites — they are
                  the ones you will be replacing again in 18 months.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">4. Certification</h4>
                <p className="text-white text-sm leading-relaxed">
                  Like-for-like USB socket replacement is generally non-notifiable under Part P and
                  does not require a certificate. However, issuing a{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works Certificate
                  </SEOInternalLink>{' '}
                  is good practice — it documents the work, provides the customer with a record, and
                  demonstrates your professionalism. If the replacement involves any new wiring or
                  circuit modifications, a certificate is required.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Issue socket replacement certificates in minutes"
          description="Elec-Mate lets you complete Minor Works Certificates on your phone with pre-filled templates. Add test results, observations, and export professional PDFs on site. Join 430+ UK electricians."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function USBSocketNotChargingPage() {
  return (
    <GuideTemplate
      title="USB Socket Not Charging | Why & What to Do"
      description="USB wall socket not charging your phone? Learn why — internal module failure, USB-A vs USB-C power limits, thermal shutdown, quality vs cheap brands — and whether to replace it yourself or call an electrician."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Common Problem"
      badgeIcon={Usb}
      heroTitle={
        <>
          USB Socket Not Charging:{' '}
          <span className="text-yellow-400">Why and What to Do</span>
        </>
      }
      heroSubtitle="Your USB wall socket has stopped charging. This guide explains the most common causes — internal module failure, power delivery limits, thermal shutdown — covers quality brands vs cheap imports, and tells you when to replace it or call an electrician."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About USB Socket Problems"
      relatedPages={relatedPages}
      ctaHeading="Document Socket Work with Professional Certificates"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for Minor Works Certificates, EICR reports, and AI-powered tools. 7-day free trial, cancel anytime."
    />
  );
}
