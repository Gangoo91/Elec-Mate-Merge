import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Building,
  Zap,
  ShieldCheck,
  CheckCircle2,
  FileText,
  ClipboardCheck,
  Cable,
  Calculator,
  Lightbulb,
  Plug,
  Brain,
  AlertTriangle,
} from 'lucide-react';

export default function ElectricalExtensionGuidePage() {
  return (
    <GuideTemplate
      title="House Extension Electrics | Wiring & Regulations Guide"
      description="Complete guide to electrical wiring for house extensions in the UK. Covers new circuit design, connecting to existing distribution boards, Part P notification, lighting and socket layouts, external circuits, and how to plan the electrical work alongside the building project."
      datePublished="2026-01-12"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Installation', href: '/guides' },
        { label: 'Extension Electrics', href: '/guides/house-extension-electrics' },
      ]}
      tocItems={[
        { id: 'planning-electrics', label: 'Planning Extension Electrics' },
        { id: 'new-circuits', label: 'New Circuits Required' },
        { id: 'connecting-existing', label: 'Connecting to Existing Distribution' },
        { id: 'lighting-design', label: 'Lighting Design for Extensions' },
        { id: 'socket-layout', label: 'Socket Layout & Positioning' },
        { id: 'external-circuits', label: 'External & Garden Circuits' },
        { id: 'part-p-notification', label: 'Part P Notification' },
        { id: 'how-to', label: 'Step-by-Step Process' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Guide"
      badgeIcon={Building}
      heroTitle={
        <>
          House Extension Electrics
          <br />
          <span className="text-yellow-400">Wiring & Regulations Guide</span>
        </>
      }
      heroSubtitle="Wiring a house extension involves designing new circuits, connecting to the existing distribution board (or installing a sub-main), coordinating with the building project timeline, and ensuring compliance with Part P and BS 7671. This guide covers every aspect of extension electrics — from initial planning through to testing and certification."
      readingTime={12}
      keyTakeaways={[
        'A house extension typically requires at least one new lighting circuit and one new socket circuit. Kitchen extensions, bi-fold doors with external lighting, and outbuilding supplies may need additional dedicated circuits.',
        'The existing consumer unit must have sufficient spare ways for the new circuits. If not, a sub-distribution board fed by a sub-main cable from the main consumer unit is the correct solution — not doubling up circuits on existing ways.',
        'All new electrical work in a house extension is notifiable under Part P of the Building Regulations. The electrician must either be registered with a competent person scheme or the work must be inspected by Building Control.',
        'First fix electrical work should be coordinated with the builder — cables must be installed before plastering, insulation, and boarding. Late changes are costly because walls and ceilings must be opened up again.',
        'External circuits for garden lighting, patio sockets, and security lighting must be protected by 30mA RCD, and cables must be rated for outdoor use or installed in suitable conduit.',
      ]}
      sections={[
        {
          id: 'planning-electrics',
          heading: 'Planning the Electrics for a House Extension',
          content: (
            <>
              <p>
                The electrical design for a house extension should be planned at the same time as
                the architectural design — not as an afterthought once building work has started.
                The position of the consumer unit, cable routes through the existing house to the
                extension, socket and light positions, and external circuit requirements all affect
                the building work and must be agreed before the builder starts.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Start With the Homeowner's Requirements
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Discuss what the extension will be used for. A kitchen extension has very
                    different electrical requirements to a bedroom extension or a home office. Key
                    questions: How many sockets are needed and where? What lighting style is
                    preferred (recessed downlights, pendants, track lighting)? Are there any
                    dedicated circuits required (cooker, dishwasher, boiling water tap, electric
                    underfloor heating)? Does the homeowner want external lighting, outdoor sockets,
                    or{' '}
                    <SEOInternalLink href="/guides/ev-charger-installation">
                      EV charger
                    </SEOInternalLink>{' '}
                    preparation?
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Cable className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Assess the Existing Installation
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Before designing the extension circuits, assess the existing consumer unit.
                    Count spare ways available. Check the condition of existing wiring — if the
                    existing installation has significant deficiencies, these should be discussed
                    with the homeowner before adding new circuits to it. Consider whether the
                    incoming supply and main fuse are adequate for the additional demand. An{' '}
                    <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> on the
                    existing installation before starting extension work is strongly recommended.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Coordinate With the Builder</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    The builder needs to know where cables will run so that suitable chase routes,
                    floor voids, and wall cavities are maintained. First fix electrical work must
                    happen after the structure is weather-tight but before insulation, boarding, and
                    plastering. Agree the programme with the builder and confirm your attendance
                    dates for first fix and second fix. Late arrival for first fix delays the entire
                    project.
                  </p>
                </div>
              </div>
              <SEOAppBridge
                title="AI Circuit Designer for Extension Planning"
                description="Elec-Mate's AI Circuit Designer generates a complete circuit specification for your extension. Enter the room dimensions, intended use, and appliance list — the AI recommends the number and type of circuits, cable sizes, protective device ratings, and consumer unit requirements."
                icon={Brain}
              />
            </>
          ),
        },
        {
          id: 'new-circuits',
          heading: 'New Circuits Required for a House Extension',
          content: (
            <>
              <p>
                The number of new circuits depends on the size and use of the extension. As a guide,
                the following circuits are typically required:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Standard Extension Circuits</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Lighting circuit</strong> — 1.0mm² or
                      1.5mm² twin-and-earth, protected by a 6A RCBO. One circuit typically serves
                      the entire extension unless there are more than 10-12 lighting points.
                      Consider separate circuits for the extension and any new external lighting.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Ring final or radial socket circuit
                      </strong>{' '}
                      — 2.5mm² twin-and-earth for a ring final (32A RCBO) or a radial circuit (20A
                      or 32A RCBO depending on cable size). One circuit is sufficient for a
                      single-room extension; larger extensions may need two.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Cooker circuit</strong> — 6.0mm²
                      twin-and-earth, 32A RCBO, if the extension includes a kitchen with an electric
                      cooker or hob. Use{' '}
                      <SEOInternalLink href="/calculators/cable-sizing">
                        cable sizing calculations
                      </SEOInternalLink>{' '}
                      to confirm the correct size based on the cooker's rated current.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Underfloor heating circuit</strong> — If
                      electric underfloor heating is specified, this typically requires a dedicated
                      radial circuit sized for the heating mat's current draw. The thermostat is
                      wired between the circuit and the heating mat.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">External circuits</strong> — Garden
                      lighting, external sockets, security lighting, and patio heaters may each
                      require dedicated circuits depending on the load and cable run.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Smoke and heat detectors in the extension must be mains-powered and interconnected
                with the existing detection system in the main house — this is a Building
                Regulations requirement.
              </p>
            </>
          ),
        },
        {
          id: 'connecting-existing',
          heading: 'Connecting to the Existing Distribution Board',
          content: (
            <>
              <p>
                The new circuits for the extension must connect to the property's electrical
                distribution. There are two main approaches, depending on the capacity of the
                existing consumer unit.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Option 1: Add to Existing Consumer Unit
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    If the existing consumer unit has sufficient spare ways (at least as many as the
                    number of new circuits), the new circuits can be connected directly. Each new
                    circuit gets its own RCBO. This is the simplest and most cost-effective
                    approach. However, adding circuits to an existing consumer unit still requires a
                    full{' '}
                    <SEOInternalLink href="/guides/eic-certificate">
                      Electrical Installation Certificate (EIC)
                    </SEOInternalLink>{' '}
                    for the new work, not just a Minor Works Certificate, because new circuits are
                    being added.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Option 2: Install a Sub-Distribution Board
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    If the existing consumer unit is full, or if the extension is large enough to
                    warrant its own distribution, a sub-distribution board can be installed in the
                    extension. This is fed by a sub-main cable from a spare way in the main consumer
                    unit (or a dedicated way added to the main board). The sub-main is sized to
                    carry the maximum demand of all the extension circuits. A typical sub-main for a
                    domestic extension is 10mm² or 16mm² twin-and-earth, protected by a suitably
                    rated device at the main board.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">What Not to Do</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Never double up circuits on existing ways — connecting two circuits to one MCB
                    or RCBO is not compliant with BS 7671 and creates an overload risk. Never spur
                    new circuits from existing socket outlets as a way of avoiding adding circuits
                    to the consumer unit — a spur is an addition to an existing circuit, not a new
                    circuit. Each new circuit in the extension must have its own protective device
                    at the distribution board.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'lighting-design',
          heading: 'Lighting Design for House Extensions',
          content: (
            <>
              <p>
                The lighting design in a modern extension typically goes beyond simple pendant
                fittings. Homeowners expect a professional lighting scheme that creates the right
                ambience and provides task lighting where needed.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Common Lighting Arrangements</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Recessed downlights</strong> — The most
                      common choice for kitchen and living room extensions. Typically 5W-10W LED
                      GU10 or integrated LED fittings. Space at 60-90cm centres for even coverage.
                      Consider fire-rated downlight cans where the ceiling is a fire barrier (e.g.,
                      between floors).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Pendant lighting</strong> — Over kitchen
                      islands, dining tables, and feature areas. Allow for separate switching from
                      the main ceiling lights so the homeowner can create different lighting scenes.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Under-cabinet lighting</strong> — LED
                      strip or puck lights under kitchen wall units for worktop task lighting. These
                      can be on the main lighting circuit or on a separate switched fused connection
                      unit.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">External soffit lighting</strong> —
                      Recessed or surface-mounted LED fittings in the extension's soffit or fascia.
                      Provides ambience for outdoor entertaining and security lighting. Must be
                      rated for outdoor use (IP44 minimum).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Dimming</strong> — Many homeowners want
                      dimmable lighting in extensions. Ensure LED-compatible dimmers are specified —
                      trailing-edge dimmers for LED, not leading-edge dimmers designed for halogen.
                      Check the LED manufacturer's dimmer compatibility list.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                All lighting switch positions should be agreed with the homeowner during the design
                phase. Consider{' '}
                <SEOInternalLink href="/guides/wiring-colours-uk">
                  wiring colour conventions
                </SEOInternalLink>{' '}
                for switched live and two-way switching installations.
              </p>
            </>
          ),
        },
        {
          id: 'socket-layout',
          heading: 'Socket Layout and Positioning',
          content: (
            <>
              <p>
                The number and position of socket outlets in the extension should be planned based
                on the room's intended use. BS 7671 does not specify a minimum number of sockets,
                but the IET Guidance Note 1 and the NHBC standards provide recommendations.
              </p>
              <div className="space-y-3 mt-4">
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Kitchen Extension</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Allow for 6-8 double socket outlets above the worktop, plus dedicated
                      connections for fixed appliances (oven, hob, dishwasher, washing machine,
                      boiling water tap, fridge/freezer). Position worktop sockets 150mm-200mm above
                      worktop level. Consider USB charging sockets for at least one or two
                      positions.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Living/Dining Extension</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Allow for double sockets at each seating position, TV/media wall, and any
                      likely desk or table locations. A minimum of 4-6 doubles for a typical
                      single-room extension. Consider floor outlets for central positions away from
                      walls (e.g., kitchen island power, central dining table).
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Home Office Extension</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Multiple doubles at desk level, at least one data point (CAT6 alongside
                      mains), and consider a dedicated circuit for computing equipment if the
                      homeowner has significant IT infrastructure. A separate lighting circuit with
                      task lighting above the desk area is beneficial.
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-4">
                Standard socket mounting height is 450mm from finished floor level (centre of
                plate). Mounting sockets higher — at 600mm or even desk height (1050mm) — can be
                more convenient in some situations and improves accessibility. Discuss preferences
                with the homeowner during the design phase.
              </p>
            </>
          ),
        },
        {
          id: 'external-circuits',
          heading: 'External and Garden Circuits',
          content: (
            <>
              <p>
                House extensions often include new external circuits for garden lighting, patio
                sockets, and security lighting. These have specific requirements under BS 7671:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">30mA RCD protection</strong> — All outdoor
                      circuits must be protected by a 30mA RCD. With RCBO boards, this is automatic.
                      On dual-RCD boards, ensure external circuits are on an RCD-protected side.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Cable type</strong> — Cables buried in the
                      ground must be SWA (steel wire armoured) cable or standard cable in suitable
                      conduit. SWA cable must be buried at a minimum depth of 500mm (or deeper if
                      subject to vehicle traffic). Mark the route with warning tape above the cable.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">IP rating</strong> — External accessories
                      must have a suitable IP rating. IP44 minimum for sheltered locations, IP65 or
                      IP66 for exposed locations. Outdoor socket outlets should be IP66 rated with a
                      weatherproof enclosure.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Part P notification</strong> — New outdoor
                      circuits are notifiable under{' '}
                      <SEOInternalLink href="/guides/part-p-building-regulations">
                        Part P
                      </SEOInternalLink>{' '}
                      and must be included on the EIC for the extension work.
                    </span>
                  </li>
                </ul>
              </div>
              <SEOAppBridge
                title="Cable Sizing for Extension Circuits"
                description="Elec-Mate's cable sizing calculator handles every circuit in your extension project — ring finals, radials, lighting circuits, cooker circuits, and sub-main cables. Enter the circuit parameters and get the correct cable size with all derating factors applied automatically."
                icon={Calculator}
              />
            </>
          ),
        },
        {
          id: 'part-p-notification',
          heading: 'Part P Notification for Extension Electrics',
          content: (
            <>
              <p>
                All new electrical work in a house extension is notifiable under{' '}
                <SEOInternalLink href="/guides/part-p-building-regulations">
                  Part P of the Building Regulations
                </SEOInternalLink>
                . This includes every new circuit, the connection to the existing distribution, and
                any outdoor circuits. The work requires a full Electrical Installation Certificate
                (EIC), not a Minor Works Certificate.
              </p>
              <p>There are two routes to compliance:</p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Route 1: Competent Person Scheme
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    If the electrician is registered with a competent person scheme (NICEIC, NAPIT,
                    Elecsa, etc.), they can self-certify the work. The scheme provider issues a
                    Building Regulations Compliance Certificate to the homeowner. This is the most
                    common route for professional electricians — it avoids the need for a separate
                    Building Control inspection and is faster and cheaper for the homeowner.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Route 2: Building Control Notification
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    If the electrician is not registered with a competent person scheme, the
                    homeowner must notify Building Control before the work starts. Building Control
                    will inspect the work and issue a completion certificate. This adds cost
                    (Building Control fees) and time (waiting for inspection appointments). For
                    extension projects, Building Control is usually already involved for the
                    structural work, so this route can be coordinated with the overall building
                    project.
                  </p>
                </div>
              </div>
              <p className="mt-4">
                The EIC for extension work must cover the design, construction, and testing of all
                new circuits. Use{' '}
                <SEOInternalLink href="/guides/eic-certificate">
                  Elec-Mate's digital EIC form
                </SEOInternalLink>{' '}
                to complete the certificate on site with all test results validated automatically.
              </p>
            </>
          ),
        },
      ]}
      howToHeading="House Extension Electrics — Step-by-Step"
      howToDescription="Planning and installing electrics for a house extension from design to certification."
      howToSteps={[
        {
          name: 'Design the circuit layout with the homeowner',
          text: "Walk through the extension plans and agree every socket, light, and switch position. Identify all dedicated circuits (cooker, underfloor heating, external circuits). Design the circuit schedule and cable routes. Check the existing consumer unit for spare capacity. Use Elec-Mate's AI Circuit Designer for a compliant specification.",
        },
        {
          name: 'Coordinate with the builder and agree the programme',
          text: 'Confirm dates for first fix (after weather-tight, before insulation and boarding) and second fix (after plastering). Agree cable routes through the existing house if the consumer unit is not adjacent to the extension. Ensure the builder leaves suitable access for cable runs through floors and walls.',
        },
        {
          name: 'First fix — run cables and install back boxes',
          text: 'Run all cables from the consumer unit or sub-board position to every accessory point. Install back boxes in agreed positions. Clip cables at correct intervals per BS 7671. Install fire-rated downlight cans and any conduit runs. Label all cables at both ends. Install smoke and heat detector cables.',
        },
        {
          name: 'Second fix — fit accessories, connect, and test',
          text: 'After plastering is complete, fit all accessories (sockets, switches, light fittings, cooker connection). Connect all circuits at the consumer unit or sub-board. Carry out the full testing sequence — continuity, insulation resistance, polarity, earth fault loop impedance, prospective fault current, and RCD tests.',
        },
        {
          name: 'Complete the EIC and submit Part P notification',
          text: 'Complete the Electrical Installation Certificate with all design, construction, and test data. Submit Part P notification through the competent person scheme or coordinate with Building Control. Issue copies of the EIC to the homeowner. Provide the circuit chart for the consumer unit.',
        },
      ]}
      faqs={[
        {
          question: 'How many circuits does a house extension need?',
          answer:
            'A minimum of two circuits — one lighting circuit and one socket circuit — is typical for a single-room extension. A kitchen extension usually needs additional dedicated circuits for the cooker, dishwasher, and possibly electric underfloor heating. External lighting and outdoor sockets require separate circuits. A large extension may need 5-8 new circuits in total. The exact number depends on the room size, intended use, and appliance requirements.',
        },
        {
          question:
            'Can I extend my existing circuits into the extension instead of adding new ones?',
          answer:
            'Extending existing circuits (e.g., adding spurs from an existing ring final) into the extension is technically possible but not recommended. New rooms in an extension should have their own circuits for safety and practical reasons — if a circuit fault occurs, only the extension circuits are affected, not the existing house circuits. BS 7671 does not prohibit extending existing circuits, but industry best practice and Part P requirements for new circuits make dedicated circuits the standard approach.',
        },
        {
          question: 'What if my consumer unit is full and has no spare ways?',
          answer:
            'If the existing consumer unit has no spare ways, the correct solution is to install a sub-distribution board in the extension, fed by a sub-main cable from the main consumer unit. The sub-main requires one spare way in the main board. If even that is not available, the main consumer unit may need to be upgraded to a larger board — which is a separate notifiable piece of work requiring its own EIC. Never double up circuits on existing protective devices to avoid adding a new board.',
        },
        {
          question: 'Do I need Part P for an extension?',
          answer:
            'Yes. All new electrical circuits in a house extension are notifiable under Part P of the Building Regulations. This includes lighting, sockets, dedicated appliance circuits, and external circuits. The electrician must either self-certify through a competent person scheme (NICEIC, NAPIT, etc.) or the homeowner must notify Building Control before the work starts. A full Electrical Installation Certificate (EIC) is required for all new circuits.',
        },
        {
          question: 'When should the electrician be on site during the extension build?',
          answer:
            'There are two main attendance periods: first fix and second fix. First fix should happen after the structure is weather-tight (roof on, walls up, windows in) but before insulation, boarding, and plastering. This is when cables are run and back boxes installed. Second fix happens after plastering — this is when accessories are fitted, circuits are connected, tested, and commissioned. Allow 1-2 days for first fix and 1-2 days for second fix on a typical single-room extension.',
        },
        {
          question: 'How does Elec-Mate help with extension projects?',
          answer:
            'Elec-Mate streamlines every aspect of extension electrics. The AI Circuit Designer generates a compliant circuit specification from the room requirements. The cable sizing calculator handles all derating factors for each circuit. The digital EIC form captures all test results on site and validates them against BS 7671 limits. The app generates professional PDF certificates and handles Part P documentation — all from your phone or tablet on the job.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/house-rewire-guide',
          title: 'House Rewire Guide',
          description: 'Full guide to house rewiring including first and second fix.',
          icon: Zap,
          category: 'Guide',
        },
        {
          href: '/guides/consumer-unit-change',
          title: 'Consumer Unit Change',
          description: 'Consumer unit replacement and sub-board installation.',
          icon: Zap,
          category: 'Guide',
        },
        {
          href: '/guides/part-p-building-regulations',
          title: 'Part P Building Regulations',
          description: 'Which electrical work requires Part P notification.',
          icon: FileText,
          category: 'Regulation',
        },
        {
          href: '/calculators/cable-sizing',
          title: 'Cable Sizing Calculator',
          description: 'Calculate correct cable sizes for extension circuits.',
          icon: Calculator,
          category: 'Calculator',
        },
        {
          href: '/guides/eic-certificate',
          title: 'EIC Certificate',
          description: 'How to complete the EIC for new installation work.',
          icon: ClipboardCheck,
          category: 'Certification',
        },
        {
          href: '/guides/ev-charger-installation',
          title: 'EV Charger Installation',
          description: 'Adding EV charger preparation during extension work.',
          icon: Plug,
          category: 'Guide',
        },
      ]}
      ctaHeading="Design and Certify Extension Electrics With Elec-Mate"
      ctaSubheading="AI Circuit Designer, cable sizing calculator, digital EIC forms, and Part P documentation — everything for extension projects in one app. 7-day free trial, cancel anytime."
    />
  );
}
