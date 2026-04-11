import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Wrench,
  PoundSterling,
  ShieldCheck,
  Zap,
  Droplets,
  FileCheck2,
  Sun,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Fault Finding Guides', href: '/guides/fault-finding' },
  { label: 'Outdoor Socket Fault Finding', href: '/outdoor-socket-fault-finding' },
];

const tocItems = [
  { id: 'outdoor-socket-requirements', label: 'Outdoor Socket Requirements' },
  { id: 'rcd-protection', label: 'RCD Protection' },
  { id: 'ip-rating', label: 'IP Rating & Weatherproofing' },
  { id: 'rcd-tripping', label: 'RCD Tripping' },
  { id: 'earth-faults', label: 'Earth Faults' },
  { id: 'circuit-faults', label: 'Circuit & Wiring Faults' },
  { id: 'water-ingress', label: 'Water Ingress' },
  { id: 'repair-costs', label: 'Repair & Installation Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'All outdoor sockets in UK gardens must be protected by a 30mA RCD under BS 7671 Regulation 411.3.3. An outdoor socket without RCD protection is a C2 (potentially dangerous) observation on an EICR.',
  'Outdoor sockets must be rated at minimum IP44 (splash-proof), though IP55 or IP65 is recommended for exposed positions. Using an indoor socket outdoors is dangerous and will cause rapid failure from water ingress.',
  'An outdoor socket that trips the RCD has developed an earth leakage fault — most commonly water ingress into the socket enclosure, a damaged supply cable, or a faulty appliance connected to it.',
  'Outdoor socket installation is notifiable work under Part P of the Building Regulations in England and Wales. An Electrical Installation Certificate must be issued by a registered electrician on completion.',
  'Never use an outdoor socket in wet conditions via an extension lead unless the extension reel is specifically rated for outdoor use (IP44 or higher) and is fully unwound to prevent overheating.',
];

const faqs = [
  {
    question: 'Why is my outdoor socket not working?',
    answer:
      'The most common causes are: a tripped RCD or MCB at the consumer unit, water ingress into the socket enclosure causing an earth fault, a tripped RCD socket if the outdoor socket has a built-in RCD, a damaged supply cable, or the socket being switched off at an indoor fused connection unit (FCU). Check the consumer unit first. If the outdoor circuit breaker or RCD has tripped, reset it once and observe — if it trips again, there is a genuine fault requiring an electrician.',
  },
  {
    question: 'Do outdoor sockets need RCD protection?',
    answer:
      'Yes. Under BS 7671:2018+A3:2024 Regulation 411.3.3, all outdoor socket outlets rated up to 32A must be protected by a 30mA RCD. This applies whether the socket is on a dedicated outdoor circuit or extended from an indoor ring main. If your outdoor socket is not RCD protected, it is a C2 (potentially dangerous) finding that must be rectified. An electrician can add RCD protection at the consumer unit (RCBO), at an outdoor consumer unit, or by fitting an RCD socket as the outdoor outlet.',
  },
  {
    question: 'What IP rating does an outdoor socket need?',
    answer:
      'Outdoor sockets must have an IP rating appropriate for their location. The minimum requirement for a covered, sheltered position (such as under an eave) is IP44 (splash-proof). For exposed positions subject to rain, IP55 is recommended. The socket must also be fitted with a spring-loaded weatherproof cover that keeps the socket sealed when not in use. Using an indoor socket outdoors, even temporarily, is dangerous and illegal.',
  },
  {
    question: 'Can I add an outdoor socket myself?',
    answer:
      'In England and Wales, adding an outdoor socket is notifiable work under Part P of the Building Regulations. You can legally carry out the work yourself as a homeowner, but you must notify the local authority building control before starting and pay an inspection fee (typically £150 to £300). Alternatively, hire an electrician registered with NICEIC, NAPIT, or ELECSA who can self-certify the work and issue an Electrical Installation Certificate at no additional regulatory cost.',
  },
  {
    question: 'My outdoor socket keeps tripping the RCD — what is the fault?',
    answer:
      'Repeated RCD tripping from an outdoor socket indicates current leaking to earth. The fault is usually: water inside the socket enclosure creating a leakage path, a faulty appliance connected to the socket (try unplugging all appliances and resetting — if the RCD holds, the appliance is the fault), or a damaged supply cable with degraded insulation. An electrician will perform insulation resistance testing on the socket enclosure, the supply cable, and any fixed wiring to locate the fault.',
  },
  {
    question: 'Is it safe to use an outdoor socket in the rain?',
    answer:
      'A correctly installed, IP-rated outdoor socket with RCD protection is designed to be safe in rain. The weatherproof cover must be closed when the socket is not in use. Do not use a standard extension reel outdoors in rain — extension reels wound on a drum overheat and are not weatherproof unless specifically rated for outdoor use. If using power tools outdoors, ensure the RCD protection is functioning (test the RCD button monthly).',
  },
  {
    question: 'How much does it cost to install a new outdoor socket?',
    answer:
      'Installing a new dedicated outdoor socket circuit typically costs £200 to £500 all-in. This includes the socket, weatherproof enclosure, outdoor-rated cable, consumer unit connection, RCD protection, and Electrical Installation Certificate. If the socket can be extended from an existing nearby indoor circuit, the cost is lower — typically £150 to £300. Prices vary significantly by region and by the complexity of the cable route.',
  },
  {
    question: 'What is a fused connection unit (FCU) and do I need one for an outdoor socket?',
    answer:
      'A fused connection unit (FCU) is a fixed connection point with a built-in cartridge fuse, used to connect a spur or appliance from a ring main without a plug and socket connection. An outdoor socket spur from a ring main must be protected by a fused connection unit (typically 13A fused for a single socket spur) or by an RCBO at the consumer unit. The FCU also provides a convenient switch to isolate the outdoor socket without visiting the consumer unit.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/garden-lighting-fault-finding',
    title: 'Garden Lighting Fault Finding',
    description: 'RCD protection, IP ratings, cable damage, transformer faults, and repair costs.',
    icon: Sun,
    category: 'Fault Finding',
  },
  {
    href: '/garage-door-electrical-fault',
    title: 'Garage Door Electrical Fault',
    description:
      'Motor control board faults, limit switches, safety sensors, and power supply issues.',
    icon: Wrench,
    category: 'Fault Finding',
  },
  {
    href: '/guides/electrical-safety-check',
    title: 'Electrical Safety Check Guide',
    description: 'When to get an electrical installation checked and what is tested.',
    icon: ShieldCheck,
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
    id: 'outdoor-socket-requirements',
    heading: 'Outdoor Socket Requirements Under BS 7671',
    content: (
      <>
        <p>
          Outdoor socket outlets in the UK must comply with BS 7671:2018+A3:2024 (the 18th Edition
          Wiring Regulations), which sets specific requirements for outdoor electrical installations
          that go significantly beyond those for indoor sockets. The key differences relate to
          protection against electric shock, mechanical protection of the enclosure, and resistance
          to environmental ingress.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection mandatory</strong> — all outdoor socket outlets rated up to
                32A must be protected by a 30mA residual current device under Regulation 411.3.3. No
                exceptions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP44 minimum ingress protection</strong> — outdoor sockets must be housed in
                an enclosure rated at minimum IP44 (protected against solid objects over 1mm and
                against splashing water from any direction). Exposed positions require IP55 or IP65.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weatherproof cover</strong> — the socket must be fitted with a spring-loaded
                cover that keeps the socket face sealed and protected from rain when not in use. The
                cover must remain closed by spring pressure alone — it should not rely on the user
                to close it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correct cable type</strong> — outdoor sockets must be supplied via cable
                suitable for the installation method. Underground cable must be armoured (SWA) or in
                protective conduit. Surface-run cable on exterior walls must be rated for outdoor UV
                exposure or installed in outdoor-rated conduit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P notification</strong> — installing a new outdoor socket or modifying
                the outdoor circuit is notifiable under Part P Building Regulations in England and
                Wales. An Electrical Installation Certificate must be issued.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection for Outdoor Sockets',
    content: (
      <>
        <p>
          The 30mA RCD requirement for outdoor sockets has existed in the wiring regulations since
          the 17th Edition (2008). Many older outdoor sockets installed before 2008 lack RCD
          protection — this is one of the most common C2 (potentially dangerous) findings when
          electricians carry out EICRs on domestic properties.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Options for adding RCD protection</strong> — (1) Replace the MCB at the
                consumer unit with an RCBO (combined MCB and RCD) — cleanest solution, protects only
                the outdoor circuit; (2) Add an RCD upstream of the outdoor socket at the consumer
                unit or a sub-board; (3) Replace the outdoor socket with an RCD socket (has a
                built-in 30mA RCD) — useful where consumer unit work is not practical.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD socket with built-in protection</strong> — an RCD socket replaces the
                standard socket outlet and provides 30mA RCD protection at the point of use. It has
                test and reset buttons on the front face. This is a practical solution for adding
                protection to an outdoor socket that is already installed, without modifying the
                consumer unit. The RCD socket must itself be housed in a weatherproof enclosure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing outdoor RCDs</strong> — press the RCD test button monthly. The RCD
                should trip immediately. If it does not trip, the RCD has failed and the socket must
                not be used until the RCD is replaced. A functioning RCD is the primary protection
                against electric shock from an outdoor socket fault.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ip-rating',
    heading: 'IP Rating & Weatherproofing',
    content: (
      <>
        <p>
          The IP (Ingress Protection) rating of an outdoor socket enclosure determines how well it
          is protected against water and dust. The rating system is defined in BS EN 60529. Choosing
          the correct IP rating for the installation environment prevents water ingress faults.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP44</strong> — minimum for outdoor sockets. Protected against splash water
                from any direction. Suitable for covered positions under a porch, eave, or canopy
                where direct rain does not reach the socket face.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP55</strong> — water jet resistant. Suitable for most exposed external wall
                positions. The recommended minimum for new outdoor socket installations in exposed
                positions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP65</strong> — fully dust-tight and water jet resistant. Recommended for
                positions subject to pressure washing, heavy rain from multiple directions, or
                significant dust (near building works, in farmyards, etc.).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plug-in adaptors and extension reels</strong> — any plug-in accessory used
                outdoors must also have an appropriate IP rating. Standard indoor extension leads
                are not rated for outdoor use. Outdoor extension reels must be fully unwound during
                use to prevent overheating.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-tripping',
    heading: 'RCD Tripping — Diagnosing the Fault',
    content: (
      <>
        <p>
          An outdoor socket that trips the RCD when used, or that causes the RCD to trip when the
          circuit is first switched on, has developed an earth leakage fault. Systematic diagnosis
          identifies the fault source before calling an electrician.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — disconnect all appliances</strong> — unplug everything from the
                outdoor socket. Reset the RCD. If the RCD holds with nothing connected, the fault is
                in one of the appliances that was plugged in. Reconnect appliances one at a time,
                resetting the RCD between each, to identify the faulty appliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — check the socket enclosure</strong> — inspect the socket enclosure
                for visible water, condensation, or debris. If the enclosure contains water, isolate
                the circuit and allow the socket to dry out completely before testing. A socket that
                has flooded will need to be replaced even after drying, as the contacts will have
                corroded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  Step 3 — call an electrician if the RCD trips with nothing connected
                </strong>
                — if the RCD trips immediately when the circuit is energised even with the socket
                empty, the fault is in the socket enclosure itself or in the supply cable. This
                requires insulation resistance testing by a qualified electrician to locate the
                fault.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earth-faults',
    heading: 'Earth Faults in Outdoor Socket Circuits',
    content: (
      <>
        <p>
          Earth faults in outdoor socket circuits can arise from degraded cable insulation, corroded
          socket contacts, or water bridging between live parts and the earthed enclosure.
          Insulation resistance testing is the definitive test.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance testing</strong> — after safe isolation, disconnect
                the outdoor socket from the supply. Using a multifunction tester set to 500V DC
                insulation resistance, measure between: (1) live and earth; (2) neutral and earth;
                (3) live and neutral. All readings should be above 1MΩ (BS 7671 minimum for existing
                installations). New installations must read above 200MΩ.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth continuity</strong> — verify the earth conductor is continuous from
                the socket back to the consumer unit. A broken or missing earth connection means the
                socket has no fault protection — any fault to the metal enclosure would make the
                enclosure live. Earth continuity is measured using the low-resistance ohms function
                on a multifunction tester.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extraneous conductive parts</strong> — metal posts, fence posts, and other
                metal structures in the garden can become live if they come into contact with a
                damaged cable or faulty fitting. Ensure no metal garden structures are in contact
                with electrical cables or luminaire enclosures. Where metal garden structures are
                bonded to electrical earthing, this must be done by a qualified electrician in
                accordance with BS 7671.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'circuit-faults',
    heading: 'Circuit & Wiring Faults',
    content: (
      <>
        <p>
          Outdoor sockets can develop circuit faults independent of the socket enclosure itself — in
          the supply cable, at junction points, or at the consumer unit connection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open-circuit neutral</strong> — a broken neutral connection causes the
                socket to appear dead (nothing operates) but the socket face may still be live at
                the line terminal. This is a dangerous condition — the socket appears safe to touch
                but is live. Always prove dead with a voltage indicator before investigating any
                fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Undersized or overloaded circuit</strong> — if the outdoor socket is
                connected to an existing ring main that is already heavily loaded, adding high-draw
                garden appliances (pressure washers, hedge trimmers, power tools) can overload the
                circuit and cause the MCB to trip. A dedicated outdoor socket circuit avoids this
                issue.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fused spur fault</strong> — if the outdoor socket is on a fused spur from an
                indoor ring main, the fuse in the fused connection unit (FCU) may have blown. Check
                the FCU and replace the fuse cartridge (typically 3A or 13A depending on the load)
                if the fuse has failed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'water-ingress',
    heading: 'Water Ingress Into Outdoor Sockets',
    content: (
      <>
        <p>
          Water ingress is the most common cause of outdoor socket faults. Even correctly rated
          enclosures can develop ingress over time as gaskets degrade and fixing points allow
          moisture pathways.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection and maintenance</strong> — inspect outdoor sockets annually.
                Check the weatherproof cover closes and springs back correctly. Inspect the
                enclosure fixing screws — these are a common water entry point. Check the cable
                entry point is sealed with an appropriately sized cable gland and that the gland is
                correctly tightened.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Drying out vs replacement</strong> — a socket that has been wet but not
                corroded may work correctly after drying out completely (allow 72 hours in a warm,
                dry environment). However, once the contacts have corroded, the socket should be
                replaced. Corroded contacts have increased resistance, which can cause overheating
                and fire risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correctly installed covers</strong> — the weatherproof cover must be the
                correct type for the socket and installed with the drain hole at the bottom to allow
                any water that enters to drain away rather than pool inside the enclosure. Many
                ingress faults occur because the enclosure was installed upside-down or without the
                drain hole.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'repair-costs',
    heading: 'Outdoor Socket Repair & Installation Costs — 2026',
    content: (
      <>
        <p>
          Costs for outdoor socket repair and installation vary by the nature of the fault and
          whether a new circuit is required. Here are typical UK costs for 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket replacement (like-for-like)</strong> — £60 to £120 all-in. Socket and
                enclosure £15 to £40, labour £45 to £80. A Minor Works Certificate must be issued.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Adding RCD protection to existing socket</strong> — £80 to £200. Options
                include replacing the socket with an RCD socket (£80 to £130) or adding an RCBO at
                the consumer unit (£120 to £200 including labour).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable repair (minor — surface run)</strong> — £80 to £200. Replacing a
                section of surface-run outdoor cable and issuing a certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underground cable repair</strong> — £150 to £400. Excavating to locate and
                repair the damaged section, fitting an underground junction enclosure or replacing
                the full cable run, reinstatement, and certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New outdoor socket circuit</strong> — £200 to £500 from consumer unit to
                single outdoor position, including armoured or outdoor-rated cable, RCD protection,
                weatherproof enclosure, and Electrical Installation Certificate. Double or twin
                socket, or longer cable run, increases cost.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Outdoor Socket Work',
    content: (
      <>
        <p>
          Outdoor socket installation is notifiable work under Part P of the Building Regulations in
          England and Wales. Electricians registered with NICEIC, NAPIT, or ELECSA can self-certify
          the work. A Minor Electrical Installation Works Certificate is required for simple socket
          replacements; an Electrical Installation Certificate is required for new circuits or
          significant modifications.
        </p>
        <p>Key checklist for any outdoor socket installation or repair:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>30mA RCD protection confirmed and tested (Regulation 411.3.3)</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>IP rating of enclosure appropriate for the installation position</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>Earth continuity measured and within limits</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>Insulation resistance above 1MΩ (existing) or 200MΩ (new)</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>Cable route recorded and provided to customer</span>
            </li>
          </ul>
        </div>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Issue Certificates Before Leaving Site
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Elec-Mate Minor Works Certificate app
                  </SEOInternalLink>{' '}
                  to complete and issue the certificate on site. Record test results, circuit
                  details, and observations directly on your phone. Instant PDF to the customer — no
                  chasing paperwork later.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete outdoor electrical certificates on your phone"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site Minor Works certificates, EICs, and instant quoting. No evening paperwork. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function OutdoorSocketFaultFindingPage() {
  return (
    <GuideTemplate
      title="Outdoor Socket Not Working | External Socket Fault Finding UK"
      description="Outdoor socket fault finding guide for UK homeowners and electricians. RCD protection requirements, IP ratings, weatherproof requirements, circuit faults, earth faults, water ingress, and 2026 repair costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fault Finding Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Outdoor Socket Not Working:{' '}
          <span className="text-yellow-400">External Socket Fault Finding</span>
        </>
      }
      heroSubtitle="Complete fault finding guide for outdoor and external sockets — RCD protection requirements under BS 7671, IP rating requirements, RCD tripping diagnosis, earth faults, circuit faults, water ingress, and typical repair and installation costs for 2026."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions — Outdoor Socket Faults"
      relatedPages={relatedPages}
      ctaHeading="Complete Outdoor Electrical Certificates On Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for Minor Works certificates, EICs, and on-site quoting. No evening paperwork. 7-day free trial, cancel anytime."
    />
  );
}
