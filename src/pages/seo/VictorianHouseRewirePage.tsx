import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  PoundSterling,
  Home,
  ClipboardCheck,
  Zap,
  ShieldCheck,
  FileCheck2,
  HardHat,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Property Guides', href: '/guides/period-property-electrical' },
  { label: 'Victorian House Rewire', href: '/victorian-house-rewire' },
];

const tocItems = [
  { id: 'why-rewire', label: 'Why Victorian Wiring Is Dangerous' },
  { id: 'wiring-types', label: 'Identifying Original Wiring' },
  { id: 'consumer-units', label: 'Cast Iron Consumer Units' },
  { id: 'solid-walls', label: 'Solid Wall Challenges' },
  { id: 'cornicing', label: 'Cornicing and Period Features' },
  { id: 'rewire-costs', label: 'Rewire Costs 2026' },
  { id: 'epc', label: 'EPC and Energy Improvements' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Rubber-insulated wiring installed before the 1960s becomes brittle and cracks with age. The insulation breaks down under heat, vibration, and simply the passage of time — leaving live conductors exposed inside walls and ceiling voids.',
  'Knob-and-tube wiring (common in Victorian properties built before 1920) has no earth conductor. Without an earth, RCD protection cannot operate correctly and the risk of electric shock is significantly higher.',
  'Cast iron consumer units (fuse boards) cannot accept modern RCD or RCBO protection. They pose a serious fire risk if the rewirable fuses are incorrectly rated or replaced with wire of the wrong gauge.',
  'A full rewire of a Victorian terraced house typically costs £3,000 to £8,000 depending on size, number of circuits, and the difficulty of routing cables through solid masonry walls. Larger Victorian townhouses can exceed £10,000.',
  'An EICR on an unmodernised Victorian property will almost always return a C1 or C2 outcome, making the installation Unsatisfactory under BS 7671:2018+A3:2024.',
];

const faqs = [
  {
    question: 'How do I know if my Victorian house still has the original wiring?',
    answer:
      'Key signs include round pin sockets (5A or 15A), a cast iron or Bakelite fuse board, light fittings with twisted cloth-covered cable, and cables that run in metal or rubber conduit rather than plastic. An electrician carrying out an EICR will open socket and light fittings to inspect the cable type and insulation condition. Rubber-insulated cables become brown or black with age and the insulation crumbles when touched.',
  },
  {
    question: 'Is it safe to live in a Victorian house with old wiring?',
    answer:
      'Victorian wiring can remain functional for years without an incident, but the risk increases significantly over time. The two primary dangers are fire (from insulation breakdown causing arcing) and electric shock (from absent earth conductors or degraded insulation). A qualified electrician should carry out an EICR to assess the current condition. If the installation is assessed as Unsatisfactory, the risks are real and a rewire should be prioritised.',
  },
  {
    question: 'How long does it take to rewire a Victorian house?',
    answer:
      'A typical Victorian terraced house with three bedrooms takes 5 to 10 working days to rewire. Solid masonry walls (no cavity) make routing cables significantly harder than in modern houses — electricians must chase channels in plaster and masonry, or run surface conduit. Larger Victorian townhouses or those with complex layouts can take 2 to 3 weeks. The property is usually habitable during the rewire, though there will be periods without power.',
  },
  {
    question:
      'Do I need planning permission or listed building consent to rewire a Victorian house?',
    answer:
      'Standard Victorian properties do not require planning permission for an electrical rewire. However, if your property is Grade I or Grade II listed, you will need listed building consent before carrying out any works that affect the character of the building — including chasing new cable routes into original plasterwork. See our listed building electrical guide for full details.',
  },
  {
    question: 'What is knob-and-tube wiring and is it still found in UK Victorian properties?',
    answer:
      'Knob-and-tube wiring uses ceramic knobs to support conductors and ceramic tubes where cables pass through structural timbers. It was common in UK properties built before approximately 1920. The critical problem is the absence of any earth conductor — the system uses only a live and a neutral wire. This means modern RCD protection cannot provide earth fault protection. Insurance companies may refuse cover or charge higher premiums for properties with knob-and-tube wiring.',
  },
  {
    question: 'Can I rewire a Victorian house without replastering?',
    answer:
      'In most cases, no — not if the cables are to be chased into the walls. Cable channels (chases) are cut into plaster and masonry, cables are installed and buried, and the walls are made good. Some electricians offer a "first fix only" service where the homeowner arranges plastering separately. Alternatively, surface-mounted mini-trunking or conduit can be used in less visible areas, avoiding the need to chase walls entirely. This approach is common in loft conversions and garages.',
  },
  {
    question: 'Will rewiring a Victorian house improve its EPC rating?',
    answer:
      'A rewire alone does not directly improve an EPC rating, as the SAP calculation focuses on heating systems, insulation, and renewables. However, a rewire enables the installation of energy-saving LED lighting throughout (which does contribute to EPC), and it makes the property safe to install modern heating controls, heat pumps, and EV charging points — all of which can significantly improve the EPC rating. An unmodernised Victorian property often sits at EPC band E or F, and electrification of heating is one of the most effective routes to band C or above.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/period-property-electrical',
    title: 'Period Property Electrical Guide',
    description:
      'General guide covering all pre-1966 properties — what to look for at survey and EICR importance.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/edwardian-house-electrical',
    title: 'Edwardian House Electrical Guide',
    description:
      'Electrical hazards and rewiring considerations for 1900–1910 Edwardian properties.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/listed-building-electrical',
    title: 'Listed Building Electrical Guide',
    description:
      'Rewiring Grade I and II listed Victorian properties — consent, conservation officers, and sympathetic installation.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
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
    id: 'why-rewire',
    heading: 'Why Victorian Wiring Is Dangerous',
    content: (
      <>
        <p>
          Victorian properties built between approximately 1837 and 1901 represent a significant
          portion of the UK housing stock, particularly in cities such as London, Manchester,
          Birmingham, and Bristol. Many of these properties were wired — or had their original gas
          lighting systems converted to electricity — between the 1890s and the 1950s. The wiring
          installed during this period is now approaching or exceeding 70 to 130 years of age.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rubber insulation breakdown</strong> — early electrical cables used rubber
                insulation, often with a woven cotton or jute braid over the top. Rubber degrades
                naturally over time, accelerated by heat from overloaded circuits. The insulation
                becomes brittle, cracks, and ultimately crumbles — leaving live conductors exposed
                inside walls, ceiling voids, and floor voids. This is a serious fire risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lead-sheathed wiring</strong> — some Victorian properties have lead-sheathed
                cables where the outer sheath is lead rather than rubber or PVC. Lead sheathing
                provides some mechanical protection but the insulation inside still degrades.
                Lead-sheathed cables are immediately identifiable by their dull grey metallic outer
                sheath.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No earth conductor</strong> — wiring installed before the mid-1960s often
                has only a live and a neutral conductor, with no earth. Under BS 7671:2018+A3:2024,
                a missing protective earth conductor is classified as a C1 or C2 observation
                depending on the context. Without an earth, fault protection relies entirely on
                overcurrent devices (fuses), which may not operate quickly enough to prevent injury
                or fire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloaded circuits</strong> — Victorian wiring was designed for a fraction
                of the electrical loads present in modern homes. A Victorian house originally wired
                for a few lighting circuits and one or two power points is now expected to supply
                dishwashers, washing machines, electric showers, multiple televisions, computers,
                and phone chargers. Overloading aged cables accelerates insulation degradation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            EICR (Electrical Installation Condition Report)
          </SEOInternalLink>{' '}
          on an unmodernised Victorian property will almost always return a Satisfactory outcome
          only if significant modernisation work has already been carried out. Original
          installations will typically generate C1 and C2 observations making the report
          Unsatisfactory.
        </p>
      </>
    ),
  },
  {
    id: 'wiring-types',
    heading: 'Identifying Original Wiring in Victorian Properties',
    content: (
      <>
        <p>
          Before commissioning a rewire, it is worth understanding what type of wiring is present.
          This helps an electrician provide an accurate quote and plan the scope of work. The
          following wiring types are most commonly found in Victorian properties.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Knob-and-tube (pre-1920)</strong> — individual conductors run through
                ceramic knobs nailed to joists and through ceramic tubes at penetration points. No
                earth conductor. Conductors may be cloth-covered or rubber-insulated. This wiring
                system has no mechanical protection between conductors and structural timber — a
                serious fire risk if the insulation has degraded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lead-sheathed and VIR (1900s–1950s)</strong> — Vulcanised India Rubber (VIR)
                insulated cables with a lead sheath or woven braid outer covering. Often run in
                steel or brass conduit, particularly for ring final circuits installed after World
                War Two. The rubber insulation inside the conduit degrades even though the conduit
                itself remains intact.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Early PVC (1950s–1966)</strong> — PVC-insulated cables began appearing in UK
                properties from the early 1950s. Pre-1966 PVC wiring is significantly better than
                rubber but is now over 60 years old, may lack adequate earth conductors, and was
                installed to older wiring regulations. An EICR will assess whether it remains
                adequate for continued use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Round pin sockets</strong> — the presence of 5A or 15A round pin sockets (BS
                546) is a reliable indicator that the wiring has not been modernised. Round pin
                sockets cannot accept modern 13A square pin plugs, so any extensions or adaptors in
                use present an additional hazard.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'consumer-units',
    heading: 'Cast Iron Consumer Units and Original Fuse Boards',
    content: (
      <>
        <p>
          Victorian and Edwardian properties that have had some electrical work carried out may have
          a cast iron or Bakelite consumer unit (fuse board) installed between the 1940s and 1960s.
          These units were common in post-war housing improvement programmes but are now considered
          obsolete and potentially dangerous.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — cast iron consumer units predate the
                introduction of RCD (Residual Current Device) protection. Under Regulation 411.3.3
                of BS 7671, RCD protection at 30mA is required on socket-outlet circuits. Without
                RCD protection, a person receiving an electric shock may not be protected from a
                potentially fatal current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuses</strong> — original fuse boards use rewirable fuse wire
                rather than modern circuit breakers. If a previous occupant has replaced a blown
                fuse with wire of an incorrect rating (or even a nail or piece of foil), the circuit
                has no meaningful overcurrent protection. This is a significant fire risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-combustible enclosure requirement</strong> — modern consumer units must
                have a non-combustible enclosure (steel) following Amendment 3 to BS 7671. Cast iron
                units are technically non-combustible but cannot accept modern protective devices.
                Replacing a cast iron consumer unit with a modern metal-clad unit is a significant
                improvement even if the underlying wiring is not replaced at the same time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Replacing a consumer unit alone (without rewiring) costs approximately £400 to £900 for a
          typical Victorian property. This does not address the underlying wiring condition but does
          provide modern RCD protection and circuit breakers. In many cases, however, the existing
          wiring is not suitable for connection to a new consumer unit without further remedial
          work.
        </p>
      </>
    ),
  },
  {
    id: 'solid-walls',
    heading: 'Solid Wall Challenges — No Cavity',
    content: (
      <>
        <p>
          One of the most significant practical challenges in rewiring a Victorian house is the
          absence of a cavity wall. Victorian properties were built with solid brick or stone
          external walls, typically 225mm (9 inch) or 340mm (13 inch) brickwork. There is no cavity
          through which cables can be routed — every cable must either be chased into the masonry or
          surface-mounted.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Chasing masonry</strong> — cutting cable channels (chases) into Victorian
                brickwork is significantly harder and more time-consuming than chasing modern
                blockwork. The bricks are harder and denser, the lime mortar requires careful
                handling, and the depth of plasterwork varies. Chasing adds considerable time to the
                rewire — typically 20 to 40 per cent more than an equivalent modern property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Making good</strong> — once cables are chased in and fixed, the channels
                must be filled and made good. In a Victorian property with original horsehair
                plaster or lime render, matching the existing finish is difficult and may require a
                specialist plasterer. The electrician will typically leave the chases filled with
                bonding coat; a plasterer or decorator finishes the surface.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surface mounting</strong> — in some areas (loft spaces, garages, utility
                rooms, and areas that will be covered by kitchen units) cables can be run in surface
                conduit or mini-trunking to avoid chasing. This is faster and cheaper but less
                aesthetically acceptable in main living areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Floor voids</strong> — Victorian properties with suspended timber ground
                floors offer an alternative route for cables running at low level. Socket outlet
                cables can often be run beneath floorboards rather than through walls, reducing the
                amount of chasing required on the ground floor.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cornicing',
    heading: 'Preserving Cornicing, Coving, and Period Features',
    content: (
      <>
        <p>
          Victorian properties are prized for their original architectural features — deep plaster
          cornicing, ceiling roses, dado rails, picture rails, and decorative coving. These features
          add significant value to a property but create challenges for electricians routing cables
          to ceiling lighting points and wall switches.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ceiling roses</strong> — original Victorian ceiling roses are often large,
                deeply moulded plaster features. Routing new lighting cables without disturbing the
                rose requires careful work from the floor above. Where this is not possible, the
                rose can be carefully removed, cables routed, and the rose refitted. Electricians
                experienced in period properties understand how to do this without damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cornicing</strong> — deep Victorian cornice runs around the perimeter of
                ceiling at wall junctions. New cables cannot pass through cornice without cutting
                into it. Experienced electricians route cables down from above (through the floor
                void of the room above) to avoid disturbing the cornice entirely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Picture rails</strong> — cables can sometimes be discretely run behind
                picture rails where they exist. Some electricians use this as a practical route for
                switch drops, particularly in reception rooms where cornicing makes wall chasing
                very difficult.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Decorator involvement</strong> — a Victorian house rewire is invariably
                followed by significant redecoration. It is worth planning the rewire and decoration
                as a single project, scheduling the electrician first and the decorator second, to
                minimise disruption and ensure all making-good is properly covered before the final
                finish is applied.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rewire-costs',
    heading: 'Rewire Costs for Victorian Houses (2026)',
    content: (
      <>
        <p>
          The cost of rewiring a Victorian house varies considerably depending on the size of the
          property, the number of circuits required, the difficulty of cable routing through solid
          walls and period features, and the location. The following figures represent typical costs
          for a full rewire including consumer unit, all circuits, sockets, switches, and lighting
          points. Making good (plastering) is usually quoted separately.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom Victorian terrace</strong> — £3,000 to £5,000. Typically 10 to
                14 circuits. Solid wall construction adds 1 to 2 days compared to a modern
                equivalent. London prices typically 20 to 30 per cent higher.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom Victorian terrace</strong> — £4,500 to £7,000. The most common
                Victorian property type. Double-fronted Victorians may fall at the higher end of
                this range.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four or five-bedroom Victorian townhouse</strong> — £6,000 to £12,000+.
                Three-storey properties with multiple reception rooms, large kitchens, and original
                features require considerably more labour. Listed properties at the upper end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement only</strong> — £400 to £900. Replaces the fuse
                board with a modern metal-clad unit with RCD protection, but does not address the
                condition of the existing wiring. Only appropriate where the wiring has already been
                assessed as adequate.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices do not include VAT (which applies at the standard rate on labour and
          materials for residential electrical work) or making good. Always obtain at least three
          quotes from NICEIC- or NAPIT-registered electricians and ask each to specify the scope of
          work in writing.
        </p>
      </>
    ),
  },
  {
    id: 'epc',
    heading: 'EPC Improvements Following a Victorian House Rewire',
    content: (
      <>
        <p>
          Rewiring a Victorian house does not directly improve its Energy Performance Certificate
          (EPC) rating — the SAP methodology focuses on heating, insulation, and renewables rather
          than the condition of fixed wiring. However, a modern electrical installation is a
          precondition for many of the improvements that do improve EPC ratings.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>LED lighting throughout</strong> — replacing all lighting circuits with LED
                fittings contributes directly to the EPC SAP calculation under the lighting section.
                A rewire provides the opportunity to fit modern LED downlighters and pendants on
                properly rated circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Air source heat pump readiness</strong> — an air source heat pump (ASHP)
                requires a modern electrical supply with adequate earthing and an appropriately
                rated circuit. Victorian wiring cannot safely supply an ASHP. A rewire is therefore
                a prerequisite for heat pump installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charging point</strong> — an EV charger requires a dedicated circuit with
                RCD protection and earthing. A rewired Victorian house can accommodate a 7kW home
                charger, which is not possible with original wiring or a cast iron consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV and battery storage</strong> — solar panels and battery storage
                systems require a modern consumer unit and appropriate earthing. A rewired Victorian
                property can accommodate a solar PV system, which is one of the most effective ways
                to improve an EPC rating from E or F to C or above.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Many Victorian houses in England currently have EPC ratings of E, F, or G. Government
          policy is moving towards requiring rented properties to achieve EPC band C by 2028. For
          landlords with Victorian properties, a rewire is often the necessary first step in a
          broader programme of improvement.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Victorian House Rewire Work',
    content: (
      <>
        <p>
          Victorian house rewires are some of the most rewarding — and most challenging — work
          available to domestic electricians. The combination of solid wall construction, period
          features, and genuinely hazardous original wiring requires experience, planning, and good
          communication with the client.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR First — Then Quote the Rewire</h4>
                <p className="text-white text-sm leading-relaxed">
                  Carry out an{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    EICR with the Elec-Mate app
                  </SEOInternalLink>{' '}
                  before quoting a rewire. The EICR documents the existing condition, identifies all
                  hazards, and gives the client a clear picture of why the rewire is necessary. It
                  also protects you — you have a documented baseline before any work starts.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote and Invoice on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to produce a professional quote for the rewire before you leave the property.
                  Victorian house rewires are high-value jobs — a professional quote presented on
                  the day significantly improves conversion rates.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage Victorian house rewires with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, professional quoting, and job management. AI board scanning, voice test entry, instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function VictorianHouseRewirePage() {
  return (
    <GuideTemplate
      title="Rewiring a Victorian House UK | Victorian Property Electrical Guide"
      description="Complete guide to rewiring a Victorian house in the UK. Rubber and lead-sheathed wiring dangers, knob-and-tube systems, cast iron consumer units, solid wall challenges, cornicing preservation, rewire costs £3,000–£8,000+, and EPC improvements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Property Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Rewiring a Victorian House:{' '}
          <span className="text-yellow-400">Costs, Hazards & What to Expect</span>
        </>
      }
      heroSubtitle="Victorian properties built before 1901 often contain rubber-insulated wiring, lead-sheathed cables, knob-and-tube systems, and cast iron fuse boards. This guide covers the real dangers, the challenges of rewiring through solid masonry walls, how to preserve cornicing and period features, and rewire costs of £3,000 to £8,000 or more."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Victorian House Rewiring"
      relatedPages={relatedPages}
      ctaHeading="Complete Victorian House EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
