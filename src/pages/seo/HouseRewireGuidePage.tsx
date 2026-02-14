import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Home,
  Zap,
  ShieldCheck,
  PoundSterling,
  ClipboardCheck,
  Calculator,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Cable,
  Clock,
  Camera,
  Brain,
  Hammer,
} from 'lucide-react';

export default function HouseRewireGuidePage() {
  return (
    <GuideTemplate
      title="House Rewire Guide UK | What's Involved & What to Expect"
      description="Complete guide to house rewiring in the UK. Signs you need a rewire, what's involved in first fix and second fix, typical timeline for a 3-bed house, Part P notification, certificates required, and how to minimise disruption."
      datePublished="2025-05-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'House Rewire Guide', href: '/guides/house-rewire-guide' },
      ]}
      tocItems={[
        { id: 'signs-of-rewire', label: 'Signs a Rewire Is Needed' },
        { id: 'what-is-involved', label: 'What a Rewire Involves' },
        { id: 'first-fix', label: 'First Fix' },
        { id: 'second-fix', label: 'Second Fix' },
        { id: 'timeline', label: 'Typical Timeline' },
        { id: 'planning', label: 'Planning the Rewire' },
        { id: 'part-p-certs', label: 'Part P & Certificates' },
        { id: 'disruption', label: 'Minimising Disruption' },
        { id: 'how-to', label: 'Step-by-Step Process' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          House Rewire Guide UK
          <br />
          <span className="text-yellow-400">What's Involved & What to Expect</span>
        </>
      }
      heroSubtitle="A full house rewire is one of the biggest electrical jobs in domestic work. This guide explains when a rewire is needed, what the process involves from first fix to second fix, how long it takes, what it costs, and how homeowners can prepare for minimal disruption."
      readingTime={17}
      keyTakeaways={[
        'If the property has old rubber or lead-sheathed cable, rewirable fuses, no earth conductor, or fails an EICR with multiple C1/C2 observations, a rewire is almost certainly needed.',
        'A full rewire involves two main phases: first fix (stripping out old cables, installing new cables and back boxes) and second fix (fitting accessories, connecting, testing, and commissioning).',
        'A typical 3-bedroom semi-detached house takes 1 to 2 weeks to rewire, depending on the number of circuits, ease of access, and how much plastering is needed.',
        'A rewire is notifiable under Part P and requires a full Electrical Installation Certificate (EIC) — not a Minor Works Certificate.',
        'Planning the rewire room by room with the homeowner avoids costly changes mid-job and ensures every socket, light, and switch position is agreed before first fix begins.',
      ]}
      sections={[
        {
          id: 'signs-of-rewire',
          heading: 'Signs a House Needs Rewiring',
          content: (
            <>
              <p>
                Not every old property needs a complete rewire. The age of the wiring alone is not a
                reliable indicator — PVC-insulated cable installed in the 1970s can still be in
                excellent condition if it was installed correctly and has not been subjected to
                damage, overheating, or moisture. The condition of the insulation and connections
                matters more than the age.
              </p>
              <p>
                However, there are clear signs that a rewire is needed or should be seriously
                considered:
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Cable className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Old Rubber or Lead-Sheathed Cable
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Properties built before the 1960s often have rubber-insulated cable (VIR —
                    vulcanised india rubber) or lead-sheathed cable. Rubber insulation degrades over
                    time, becoming brittle and cracking. When disturbed — even by normal thermal
                    cycling — the insulation can crumble away, exposing bare conductors. Lead
                    sheaths can corrode, particularly in damp conditions. If the property has this
                    type of cable, a rewire is strongly recommended even if it appears to be
                    functioning correctly, because the insulation will continue to deteriorate and
                    the risk of faults increases with every year.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Rewirable Fuse Board</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    A rewirable fuse board with porcelain or Bakelite fuse holders indicates an
                    installation that has not been updated in decades. While the fuses themselves
                    can provide overcurrent protection, there is no RCD protection, the fuse wire
                    can be replaced with the wrong rating, and the board is likely a plastic or
                    wooden enclosure. A{' '}
                    <SEOInternalLink href="/guides/consumer-unit-change">
                      consumer unit change
                    </SEOInternalLink>{' '}
                    alone may not be sufficient if the wiring behind the board is also in poor
                    condition.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">No Earth Conductor</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Very old wiring systems used only live and neutral conductors with no separate
                    earth (CPC — circuit protective conductor). Without an earth, there is no path
                    for fault current to flow, which means protective devices cannot operate under
                    an earth fault condition and metallic parts of accessories and appliances cannot
                    be earthed. This is extremely dangerous and is invariably classified as C1
                    (Danger Present) during an EICR.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Failing EICR</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    An{' '}
                    <SEOInternalLink href="/guides/eicr-certificate">
                      Electrical Installation Condition Report (EICR)
                    </SEOInternalLink>{' '}
                    that returns multiple C1 (Danger Present) or C2 (Potentially Dangerous)
                    observations across different circuits indicates systemic deterioration. If the
                    insulation resistance readings are consistently low (below 1 MΩ) across multiple
                    circuits, if there are loose connections throughout, or if the wiring does not
                    meet basic safety standards, a full rewire is the most cost-effective and safest
                    solution — patching individual faults in an installation that is failing
                    throughout is rarely worthwhile.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Physical Symptoms</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Flickering lights, burning smells from sockets or switches, warm switch plates,
                    discoloured or scorched outlets, tripping fuses or RCDs, and electric shocks
                    from appliances or switches are all symptoms of wiring faults that may indicate
                    the need for a rewire. Any of these should be investigated by a qualified
                    electrician immediately.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'what-is-involved',
          heading: 'What Does a House Rewire Involve?',
          content: (
            <>
              <p>
                A full house rewire replaces all the cables, accessories (sockets, switches, light
                fittings), and the consumer unit in the property. The existing wiring is removed and
                new cable is run throughout the house, with new back boxes and accessories
                installed. The work is carried out in two main phases: first fix and second fix.
              </p>
              <p>The scope of a rewire typically includes:</p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">New consumer unit</strong> — Metal
                      enclosure, RCBOs or dual RCD with MCBs, SPD, correctly sized main switch. See
                      the{' '}
                      <SEOInternalLink href="/guides/consumer-unit-change">
                        consumer unit change guide
                      </SEOInternalLink>{' '}
                      for full details.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">New cables throughout</strong> —
                      Twin-and-earth cable (typically 2.5mm² for sockets, 1.5mm² for lighting,
                      1.0mm² for some lighting, larger sizes for cooker, shower, and other
                      high-current circuits) run from the consumer unit to every accessory point.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">New accessories</strong> — All sockets,
                      switches, light fittings, spurs, connection units, cooker connections, and
                      other accessories replaced.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Updated earthing and bonding</strong> —
                      Main earthing conductor, main bonding conductors to gas, water, and oil,
                      supplementary bonding where required.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Smoke and heat alarms</strong> —
                      Mains-powered interconnected smoke detectors on every floor and heat detectors
                      in kitchens, as required by Building Regulations.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Outdoor circuits</strong> — External
                      sockets, security lighting, garden lighting connections included in the rewire
                      scope.
                    </span>
                  </li>
                </ul>
              </div>
              <SEOAppBridge
                title="AI Circuit Designer for Rewire Planning"
                description="Elec-Mate's AI Circuit Designer helps plan the complete circuit layout for a rewire — number of ring finals, radials, lighting circuits, dedicated circuits, and the consumer unit specification. Enter the property details and get a compliant circuit design in minutes."
                icon={Brain}
              />
            </>
          ),
        },
        {
          id: 'first-fix',
          heading: 'First Fix: Cables and Back Boxes',
          content: (
            <>
              <p>
                First fix is the heavy phase of the rewire. This is where the old cables are
                stripped out, new cable routes are cut into walls (chased), back boxes are
                installed, and new cables are pulled throughout the property. First fix is the most
                disruptive phase — it involves lifting floorboards, chasing plaster, drilling
                through joists, and working in every room.
              </p>
              <h3 className="font-bold text-white text-lg mt-6 mb-3">
                What Happens During First Fix
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Strip Out</h4>
                    <p className="text-white text-sm leading-relaxed">
                      The existing wiring is disconnected and removed. Old sockets, switches, and
                      light fittings are taken out. Floorboards are lifted to access the cable
                      routes under the floors. In some cases, old cables are left in place if they
                      are inaccessible (e.g., buried in solid concrete floors) and simply
                      disconnected at both ends.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Chasing and Routing</h4>
                    <p className="text-white text-sm leading-relaxed">
                      New cable routes are chased into plaster or brick using a chasing machine or
                      SDS drill. Channels are cut vertically from the back box position to the
                      ceiling or floor level. Horizontal chases are avoided where possible (BS 7671
                      safe zones require cables in walls to run vertically or horizontally from
                      accessories). Holes are drilled through joists and noggins for cable runs
                      under floors and through walls.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Back Boxes and Cable Installation</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Metal back boxes are fitted into the chased channels at every socket, switch,
                      and accessory position. New cables are run from the consumer unit location to
                      each back box, following the agreed circuit layout. Cables are clipped or
                      supported at regular intervals as required by BS 7671. Junction boxes are
                      installed where needed for lighting circuits.
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-4">
                At the end of first fix, the property will have cables protruding from back boxes in
                every room, the consumer unit position prepared, and all cables labelled and ready
                for connection. The property is usually without power during much of first fix — a
                temporary supply from a neighbouring property or a generator may be arranged for
                essential use.
              </p>
              <SEOAppBridge
                title="Cable Sizing Calculator — Right First Time"
                description="Elec-Mate's cable sizing calculator ensures every cable in the rewire is correctly specified. Enter the circuit type, load, cable length, and installation method — the calculator applies all derating factors and checks voltage drop automatically."
                icon={Calculator}
              />
            </>
          ),
        },
        {
          id: 'second-fix',
          heading: 'Second Fix: Accessories, Testing & Commissioning',
          content: (
            <>
              <p>
                Second fix happens after the plasterer has been in (if needed) and the chases have
                been filled. This is where the installation comes together — accessories are fitted,
                circuits are connected at the consumer unit, and the complete testing and
                commissioning process is carried out.
              </p>
              <h3 className="font-bold text-white text-lg mt-6 mb-3">
                What Happens During Second Fix
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Fit Accessories</h4>
                    <p className="text-white text-sm leading-relaxed">
                      All socket outlets, switches, light fittings, cooker connection units, spurs,
                      and other accessories are fitted to the back boxes and connected. Light
                      pendants are wired, bathroom accessories are installed, and any specialist
                      items (shaver sockets, cooker isolators, outdoor sockets) are connected.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Consumer Unit Connection</h4>
                    <p className="text-white text-sm leading-relaxed">
                      The new consumer unit is mounted and all circuits are connected to their
                      designated protective devices. The main earth and bonding conductors are
                      connected. The circuit chart is prepared and fixed inside the consumer unit
                      door.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Testing and Commissioning</h4>
                    <p className="text-white text-sm leading-relaxed">
                      The full{' '}
                      <SEOInternalLink href="/guides/testing-sequence">
                        testing sequence
                      </SEOInternalLink>{' '}
                      is carried out on every circuit: continuity of protective conductors (R1+R2),
                      insulation resistance at 500V DC, polarity verification, earth fault loop
                      impedance (Zs), prospective fault current (PSCC and PEFC), and RCD operating
                      times. This is the most time-consuming part of second fix — a 10-circuit
                      domestic rewire can take 2-3 hours to test completely.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    4
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Certification and Handover</h4>
                    <p className="text-white text-sm leading-relaxed">
                      The Electrical Installation Certificate (EIC) is completed with all test
                      results, circuit details, and installation information. Part P notification is
                      submitted. The homeowner receives the EIC, circuit chart, and operating
                      instructions for the new consumer unit and smoke alarms.
                    </p>
                  </div>
                </div>
              </div>
              <SEOAppBridge
                title="EIC Certificate for Rewire Sign-Off"
                description="Elec-Mate's digital EIC form handles rewire certification from start to finish. Enter all test results on site, the app validates every value against BS 7671, and you generate a professional PDF certificate ready to issue before you leave."
                icon={FileText}
              />
            </>
          ),
        },
        {
          id: 'timeline',
          heading: 'Typical Timeline for a House Rewire',
          content: (
            <>
              <p>
                The duration of a rewire depends on the size of the property, the number of
                circuits, the ease of access (solid floors vs suspended timber floors), and whether
                the property is occupied during the work.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Typical Timescales</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">1-bed flat</h4>
                      <p className="text-white text-sm">4-6 circuits</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">3 - 5 days</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">2-bed terraced house</h4>
                      <p className="text-white text-sm">6-8 circuits</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">5 - 7 days</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                    <div>
                      <h4 className="font-bold text-white">3-bed semi-detached</h4>
                      <p className="text-white text-sm">8-12 circuits (most common)</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">7 - 10 days</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">4-bed detached</h4>
                      <p className="text-white text-sm">10-16 circuits</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">10 - 14 days</span>
                  </div>
                </div>
              </div>
              <p>
                These timescales assume one or two electricians working full-time and include both
                first fix and second fix but{' '}
                <strong className="text-white">exclude plastering</strong>. After first fix, a gap
                of 1-3 days is usually needed for the plasterer to fill the chases and make good.
                The plaster must be dry before second fix begins (typically 24-48 hours for chase
                filling). Add the plastering time to the electrical timescales for the total project
                duration.
              </p>
              <p>
                Working in an occupied property is slower because rooms must be cleared before work
                begins, furniture must be protected from dust, and temporary power must be
                maintained wherever possible. An empty property (e.g., a renovation before moving
                in) can be significantly faster because access is unrestricted.
              </p>
            </>
          ),
        },
        {
          id: 'planning',
          heading: 'Planning the Rewire',
          content: (
            <>
              <p>
                Good planning is the difference between a smooth rewire and a frustrating one. The
                most common source of delays and additional costs is changes to the specification
                mid-job — "Can we add a socket here?" or "Actually, I want the light switch on the
                other wall." Every change after first fix cables have been run means pulling new
                cable, chasing new channels, and potentially replastering.
              </p>
              <h3 className="font-bold text-white text-lg mt-6 mb-3">
                Room-by-Room Planning Approach
              </h3>
              <p>
                Walk through every room with the homeowner before starting work. For each room,
                agree:
              </p>
              <ul className="space-y-2 my-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Socket positions and quantities</strong> — Where
                    do they want sockets? How many per wall? Double or single? Consider furniture
                    layout, TV positions, bedside tables, desk positions, kitchen worktop
                    appliances.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Light fitting positions and switching</strong> —
                    Ceiling rose or downlights? One-way, two-way, or intermediate switching? Dimmer
                    switches? Where should switches be positioned relative to door openings?
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Dedicated circuits</strong> — Electric shower,
                    cooker, immersion heater, electric heating, storage heaters, garden office
                    supply, EV charger, security system, outdoor lighting.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Data and networking</strong> — While not strictly
                    electrical, many homeowners want CAT6 data cables run alongside the mains
                    wiring. This is easiest to do during first fix when the floors and walls are
                    open.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Future-proofing</strong> — Consider{' '}
                    <SEOInternalLink href="/guides/ev-charger-installation">
                      EV charger
                    </SEOInternalLink>{' '}
                    cable runs, smart home infrastructure, and additional ways in the consumer unit
                    for circuits that may be needed later.
                  </span>
                </li>
              </ul>
              <SEOAppBridge
                title="Board Scanner for Existing Installations"
                description="Before starting a rewire, use Elec-Mate's Board Scanner to photograph the existing consumer unit and extract all circuit data automatically. This creates a complete digital record of the old installation and helps plan the new circuit layout."
                icon={Camera}
              />
            </>
          ),
        },
        {
          id: 'part-p-certs',
          heading: 'Part P Notification and Certificates Required',
          content: (
            <>
              <p>
                A full house rewire is notifiable under{' '}
                <SEOInternalLink href="/guides/part-p-building-regulations">
                  Part P of the Building Regulations
                </SEOInternalLink>
                . This is one of the most significant categories of notifiable work — it involves
                the complete replacement of the electrical installation.
              </p>
              <p>
                The certification requirement for a rewire is a full{' '}
                <strong className="text-white">Electrical Installation Certificate (EIC)</strong>.
                This is not a Minor Works Certificate (which is only appropriate for small additions
                or alterations to existing circuits). The EIC must include:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Design section</strong> — Confirming the
                      rewire design complies with BS 7671. This includes the circuit schedule,
                      consumer unit specification, cable sizing, RCD arrangement, and earthing and
                      bonding design.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Construction section</strong> — Confirming
                      the installation work has been carried out in accordance with the design and
                      BS 7671.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Inspection and testing section</strong> —
                      With a complete schedule of test results for every circuit. This includes
                      R1+R2, insulation resistance, Zs, PSCC, polarity, and RCD test results.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                The EIC must be signed by the designer, installer, and inspector. On a domestic
                rewire, the same electrician typically fills all three roles. The certificate is
                issued to the homeowner, and a copy is retained by the electrician for at least six
                years (or as required by the competent person scheme). The Part P notification is
                submitted through the competent person scheme, which then issues a Building
                Regulations Compliance Certificate to the homeowner.
              </p>
            </>
          ),
        },
        {
          id: 'disruption',
          heading: 'Minimising Disruption During a Rewire',
          content: (
            <>
              <p>
                A house rewire is inherently disruptive — there is no way around the fact that
                floors need to be lifted, walls need to be chased, and the power will be off for
                extended periods. However, careful planning can reduce the impact on the household.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Work Room by Room</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Rather than stripping out the entire house at once, work through one room or one
                    floor at a time. This allows the family to use other parts of the house while
                    one area is being worked on. It takes slightly longer but is far less disruptive
                    for an occupied property.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Maintain a Temporary Supply</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Keep at least one circuit live (typically the kitchen or a socket circuit on a
                    floor not being worked on) so the household has access to power for essentials —
                    fridge, kettle, phone charging. If this is not possible, a temporary supply from
                    an extension lead to a neighbouring property (with their permission) or a small
                    generator can provide basic power.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Coordinate with Other Trades</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    If the rewire is part of a larger renovation, coordinate with plasterers,
                    decorators, and any other trades. The typical sequence is: electrician first
                    fix, then plasterer fills chases and makes good, then electrician second fix,
                    then decorator paints. Getting this sequence wrong (e.g., chasing after
                    plastering) creates rework and delays.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Protect Furniture and Flooring</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Chasing walls creates a significant amount of dust. Use dust sheets to cover
                    furniture, seal doorways with plastic sheeting to contain dust to the work area,
                    and use a dustless chasing machine where possible. Carpet should be rolled back
                    and protected where floorboards are being lifted.
                  </p>
                </div>
              </div>
            </>
          ),
        },
      ]}
      howToHeading="House Rewire — Step-by-Step Process"
      howToSteps={[
        {
          name: 'Survey and design the new installation',
          text: 'Walk through every room with the homeowner and agree socket, switch, and light positions. Design the circuit layout including ring finals, radials, lighting circuits, and dedicated circuits. Specify the consumer unit, cable sizes, and accessories. Calculate maximum demand for the new installation. Photograph and document the existing installation using the Elec-Mate Board Scanner.',
        },
        {
          name: 'First fix — strip out and install new cables',
          text: 'Strip out old wiring, lift floorboards, chase walls for new cable routes, install back boxes, and run new cables from the consumer unit position to every accessory point throughout the property. Label every cable at both ends. Install mains smoke and heat detectors. This phase takes 3-7 days depending on the property size.',
        },
        {
          name: 'Plastering and making good',
          text: 'Allow the plasterer to fill all cable chases, make good around back boxes, and repair any areas of wall or ceiling disturbed during first fix. Wait for the plaster to dry (typically 24-48 hours for chase filling) before proceeding to second fix. This gap is usually 1-3 days.',
        },
        {
          name: 'Second fix — fit accessories and connect',
          text: 'Fit all socket outlets, switches, light fittings, and other accessories. Connect all circuits at the consumer unit. Install and connect the SPD. Make up earth and bonding connections. Commission smoke and heat alarms. This phase takes 2-4 days depending on the number of circuits and accessories.',
        },
        {
          name: 'Test every circuit and commission',
          text: 'Carry out the full testing sequence on every circuit: continuity (R1+R2), insulation resistance (500V DC), polarity, earth fault loop impedance (Zs), prospective fault current (PSCC/PEFC), and RCD operating times. Verify all test results against BS 7671 limits. Commission all circuits — check every socket, switch, and light operates correctly.',
        },
        {
          name: 'Complete the EIC and notify Part P',
          text: 'Complete the Electrical Installation Certificate with all design, construction, and test data. Prepare the circuit schedule and fix the circuit chart inside the consumer unit. Submit Part P notification through the competent person scheme. Issue copies of the EIC to the homeowner. Provide operating instructions for the new consumer unit and smoke alarm system.',
        },
      ]}
      faqs={[
        {
          question: 'How much does a house rewire cost in the UK in 2026?',
          answer:
            'The cost of a full house rewire varies significantly depending on the property size, number of circuits, and location. For a typical 3-bedroom semi-detached house with 8-12 circuits, expect to pay between £3,500 and £6,000 including materials, labour, testing, the EIC, and Part P notification. A 2-bedroom terraced house is typically £2,500 to £4,000, while a 4-bedroom detached house can be £5,000 to £8,000 or more. These prices exclude plastering (£500-£1,000 additional) and redecorating. Prices vary by region — London and the South East are typically 20-30% higher than the North and Midlands. VAT is usually included for domestic work. Always get at least three detailed quotes that specify exactly what is included.',
        },
        {
          question: 'Can I live in the house during a rewire?',
          answer:
            'Yes, in most cases you can stay in the property during a rewire, although it will be disruptive. The electrician should work room by room or floor by floor, allowing you to use the unaffected areas. There will be periods without electricity — particularly during the consumer unit changeover — but a competent electrician will maintain a temporary supply wherever possible. Expect dust from wall chasing, noise from power tools, and limited access to certain rooms during the work. If you have the option to stay elsewhere for the first fix phase (the most disruptive 3-5 days), this makes the work faster and more comfortable for both you and the electrician.',
        },
        {
          question: 'Does a rewire add value to a property?',
          answer:
            'A rewire does not typically add value in the same way a new kitchen or extension does — buyers do not pay more for new wiring. However, a property with a failing EICR or visibly old wiring (rewirable fuses, no earth) will be significantly harder to sell and may be subject to a price reduction. Buyers, mortgage surveyors, and conveyancers increasingly ask for a valid EICR, and a satisfactory report requires the installation to be in reasonable condition. A full rewire with a clean EIC and satisfactory EICR removes a major obstacle to sale. It also reduces insurance risk — some insurers will refuse to cover properties with known electrical defects.',
        },
        {
          question: 'How do I know if my house has been rewired?',
          answer:
            'Check the consumer unit first. If it has modern MCBs or RCBOs in a metal enclosure, the installation has been updated at some point (though the consumer unit alone may have been replaced without a full rewire). Look at the cables behind a socket plate — if they are grey or white PVC-sheathed twin-and-earth cable, the wiring is relatively modern (post-1960s). If the cable is black rubber-insulated with fabric braiding, or has a lead sheath, the wiring is very old and likely original. Check the earth conductor — modern cables have a bare copper earth conductor inside the outer sheath. Very old installations have no earth conductor at all. If in doubt, commission an EICR from a qualified electrician — this will assess the condition of the entire installation and identify any circuits that need attention.',
        },
        {
          question: 'Do all the cables need replacing in a rewire, or can some be reused?',
          answer:
            'The decision to reuse existing cables depends on their condition, not their age. If an existing cable has PVC insulation in good condition, passes the insulation resistance test (above 1 MΩ at 500V DC), is the correct size for the circuit, and is correctly routed in safe zones, it may not need replacing. However, in a "full rewire," the expectation is that all cables are replaced — this is what the customer is paying for and it is the only way to guarantee the condition of every circuit. Partial rewires (replacing some circuits but not others) are common in properties where access is difficult — for example, cables in solid concrete floors may be left in place if they test satisfactorily and are supplemented with new circuits on accessible routes. This approach requires careful documentation on the EIC.',
        },
        {
          question: 'What happens between first fix and second fix?',
          answer:
            'Between first fix and second fix, the plasterer fills all the cable chases with bonding coat and skim plaster, and makes good around back boxes and any other disturbance to walls and ceilings. This typically takes 1-2 days for the plastering work itself, plus 24-48 hours for the plaster to dry sufficiently for second fix to proceed. During this gap, the electrician is usually not on site — this is an opportunity to schedule other trades (plumber, joiner) or for the homeowner to do any preparation work. The property will have a temporary supply during this period, but some areas may be inaccessible while the plaster dries.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/rewire-cost-uk',
          title: 'Rewire Cost UK',
          description: 'Detailed cost breakdown for house rewires by property type.',
          icon: PoundSterling,
          category: 'Guide',
        },
        {
          href: '/guides/consumer-unit-change',
          title: 'Consumer Unit Change',
          description: 'Complete guide to consumer unit replacement.',
          icon: Zap,
          category: 'Guide',
        },
        {
          href: '/calculators/cable-sizing',
          title: 'Cable Sizing Calculator',
          description: 'Calculate correct cable sizes for every circuit in the rewire.',
          icon: Calculator,
          category: 'Calculator',
        },
        {
          href: '/guides/eic-certificate',
          title: 'EIC Certificate',
          description: 'How to complete the Electrical Installation Certificate.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/guides/first-fix-guide',
          title: 'First Fix Guide',
          description: 'Detailed guide to electrical first fix procedures.',
          icon: Hammer,
          category: 'Guide',
        },
        {
          href: '/guides/second-fix-guide',
          title: 'Second Fix Guide',
          description: 'Accessories, connections, and commissioning procedures.',
          icon: ClipboardCheck,
          category: 'Guide',
        },
      ]}
      ctaHeading="Plan and Certify Rewires With Elec-Mate"
      ctaSubheading="Cable sizing, max demand calculator, Board Scanner, EIC forms, and AI Circuit Designer — everything for a rewire in one app. 7-day free trial, cancel anytime."
    />
  );
}
