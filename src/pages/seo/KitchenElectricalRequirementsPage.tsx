import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  AlertTriangle,
  PoundSterling,
  Home,
  ClipboardCheck,
  ShieldCheck,
  Zap,
  Flame,
  CheckCircle2,
  Wind,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Kitchen Electrical Requirements', href: '/kitchen-electrical-requirements' },
];

const tocItems = [
  { id: 'zone-requirements', label: 'Kitchen Zone Requirements' },
  { id: 'socket-positions', label: 'Socket Positions — 300mm Rule' },
  { id: 'cooker-circuit', label: 'Cooker Circuit Specification' },
  { id: 'dishwasher-socket', label: 'Dishwasher and Washing Machine' },
  { id: 'fridge-circuit', label: 'Fridge and Freezer Circuits' },
  { id: 'extractor-fan', label: 'Extractor Fan Wiring' },
  { id: 'rcd-protection', label: 'RCD Protection in Kitchen Circuits' },
  { id: 'part-p', label: 'Part P Notification for Kitchen Rewires' },
  { id: 'typical-costs', label: 'Typical Costs for Kitchen Electrical Work' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Socket outlets must not be installed within 300mm of the inner edge of a sink, including sinks set into worktops. This is specified in BS 7671:2018+A3:2024 Section 703 (Rooms Containing a Bath or Shower) as adapted for kitchen installations and is widely recognised in industry practice for areas containing a sink.',
  'A cooker circuit for a full-size electric range (7.2kW to 13kW) typically requires 6mm² twin and earth cable on a 32A or 40A circuit breaker, with a dedicated cooker control unit and isolator switch.',
  'All kitchen socket circuits must be protected by a 30mA RCD under Regulation 411.3.3 of BS 7671. This is one of the most commonly missed requirements in kitchen installations and one of the most common C2 findings on domestic EICRs.',
  'Kitchen electrical work that involves adding new circuits, replacing a consumer unit, or fitting a new cooker circuit constitutes notifiable work under Part P of the Building Regulations. Always use a registered competent person or notify building control.',
  'A full kitchen rewire for a medium-sized kitchen typically costs £800 to £2,500 depending on the number of circuits, socket and switch upgrades, and whether the consumer unit needs replacing. These costs should be incorporated into any kitchen refurbishment budget.',
];

const faqs = [
  {
    question: 'Can you put a socket next to a kitchen sink?',
    answer:
      'Socket outlets must not be placed within 300mm of the inner edge of a sink. This applies both horizontally and vertically. The 300mm exclusion zone applies to the sink basin itself, not the surrounding worktop. Sockets positioned more than 300mm from the sink are permitted. Shaver sockets complying with BS EN 61558-2-5 are not subject to this restriction and can be positioned closer to the sink, but standard 13A socket outlets cannot. The restriction reflects the risk of water ingress and contact between wet hands and socket outlets in proximity to a water source.',
  },
  {
    question: 'What cable size do I need for an electric cooker?',
    answer:
      "For a full-size electric range cooker (typically 6kW to 13kW), 6mm² twin and earth (T&E) cable on a 32A or 40A MCB is standard. For smaller electric hobs or range cookers up to 7.2kW (approximately 30A at 240V), a 6mm² cable on a 32A breaker is appropriate. For larger ranges over 10kW, a 10mm² cable on a 45A circuit may be required — always calculate the design current in accordance with BS 7671 Chapter 43. The cooker circuit should terminate at a dedicated cooker control unit with an integrated switch and socket outlet. The circuit breaker must be Type B or Type C depending on the cooker's starting characteristics.",
  },
  {
    question: 'Does a kitchen need RCD protection?',
    answer:
      'Yes. All socket-outlet circuits rated up to 32A in a domestic kitchen must be protected by a 30mA RCD under Regulation 411.3.3 of BS 7671. This is a mandatory requirement, not a recommendation. The kitchen is one of the highest-risk rooms in a dwelling for electric shock — water, wet hands, and high-load appliances are all present. Where an existing kitchen installation lacks RCD protection on socket circuits, this is typically recorded as a C2 (potentially dangerous) observation on an EICR.',
  },
  {
    question: 'Does a dishwasher need its own circuit?',
    answer:
      'A dishwasher does not require a dedicated circuit as a legal requirement under BS 7671, but a dedicated spur or radial circuit is good practice. A dishwasher typically draws 10A to 13A during the heating cycle. Running this alongside other high-draw appliances on a shared ring circuit can cause nuisance tripping. A fused connection unit (FCU) rated at 13A, connected as a spur from the ring main, provides a local isolation point and is a tidier solution than a trailing flex to a socket behind the dishwasher. The FCU should be accessible without moving the appliance.',
  },
  {
    question: 'Do I need planning permission for kitchen electrical work?',
    answer:
      'Kitchen electrical work does not require planning permission. However, it is notifiable under Part P of the Building Regulations in England where it involves adding a new circuit, modifying an existing circuit in a kitchen, or replacing a consumer unit. Work must be either carried out by a registered competent person (who self-certifies and notifies building control automatically) or notified to the local authority building control before work begins. Failure to obtain a Building Regulations certificate can cause difficulties when selling the property.',
  },
  {
    question: 'What is an extractor fan wiring requirement for a kitchen?',
    answer:
      "A kitchen extractor fan (cooker hood or canopy extractor) is typically wired as a fused spur from the ring main, with the FCU (fused connection unit) rated at 3A or 5A depending on the fan's rated current. The FCU should be positioned where it can be operated without reaching over a cooking hob. Integrated extractor fans in cooker hoods are often connected to the cooker circuit via the cooker control unit's socket outlet — check the fan's rated current to ensure the socket outlet and fuse are suitably rated. Humidity-controlled or timer-controlled extractors may require additional switching.",
  },
  {
    question: 'How many sockets should a kitchen have?',
    answer:
      'There is no minimum legal requirement for the number of kitchen socket outlets, but as a guide, a well-equipped kitchen should have a minimum of six double socket outlets above the worktop in addition to any dedicated appliance connections (dishwasher, washing machine, fridge-freezer, microwave). Islands or peninsulas should have additional sockets. Under-worktop or in-worktop sockets (with flush pop-up units) can supplement wall outlets where wall space is limited. All sockets must comply with the 300mm sink clearance requirement.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/home-office-electrical-guide',
    title: 'Home Office Electrical Guide',
    description:
      'Dedicated circuits, data points, garden office power, and UPS for working from home.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/new-home-electrical-checklist',
    title: 'New Home Electrical Checklist',
    description:
      'Things to do when moving into a new property — RCDs, smoke detectors, meter registration.',
    icon: Home,
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
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
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
    id: 'zone-requirements',
    heading: 'Kitchen Zone Requirements Under BS 7671',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 (the Wiring Regulations) does not define kitchen zones in the same
          way it defines bathroom zones under Section 701. However, specific requirements apply to
          kitchen installations, particularly in relation to socket positions near sinks and RCD
          protection on all circuits. Kitchen electrical work must also comply with Part P of the
          Building Regulations.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>No standard socket within 300mm of a sink</strong> — socket outlets (13A BS
                1363 type) must not be installed within 300mm measured horizontally from the inner
                edge of the sink bowl. This requirement is widely referenced in industry guidance
                and competent person scheme technical guidance. The restriction reflects the risk of
                water contact with socket outlets in close proximity to a water source.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection on all socket circuits</strong> — Regulation 411.3.3 of BS
                7671 requires 30mA RCD protection on all socket-outlet circuits in domestic
                premises. The kitchen is a particularly high-risk location due to the presence of
                water, conductive work surfaces, and frequent use of portable appliances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat detectors not smoke detectors</strong> — kitchens should be fitted with
                a heat detector rather than an optical smoke detector. Steam and cooking particles
                cause persistent false alarms from smoke detectors positioned in kitchen areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gas appliances and bonding</strong> — where gas appliances are present, main
                protective bonding of the gas service pipe is required under Regulation 411.3.1.2 of
                BS 7671. The bonding conductor must be connected at the main bonding point, not at
                the appliance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'socket-positions',
    heading: 'Socket Positions — The 300mm Sink Rule',
    content: (
      <>
        <p>
          The 300mm exclusion zone around kitchen sinks is one of the most frequently discussed
          requirements in domestic kitchen electrical installations. Understanding what the rule
          covers — and what it does not — is important for designing kitchen electrical layouts.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Measurement from the sink basin edge</strong> — the 300mm is measured
                horizontally from the inner edge of the sink bowl. For sinks set into a worktop, the
                measurement starts from the inner rim of the sink cutout in the worktop, not from
                the outer edge of the worktop unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Applies in all directions</strong> — the exclusion zone applies in all
                horizontal directions from the sink edge. A socket directly to the side of the sink,
                directly in front, or at a diagonal must all be at least 300mm from the basin edge.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Above the worktop and below</strong> — sockets above the worktop (the most
                common position) must still comply. Sockets below the worktop (for under-counter
                appliances) must also be positioned at least 300mm from the sink basin edge measured
                in plan.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shaver socket units are exempt</strong> — BS EN 61558-2-5 shaver supply
                units (which are isolated from the mains supply) are not subject to the 300mm
                restriction. Standard 13A socket outlets are the subject of the exclusion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>In-worktop pop-up sockets</strong> — pop-up socket units installed in the
                worktop surface must also respect the 300mm clearance. Flush-mounted worktop sockets
                near a sink are a common non-compliance found during kitchen EICR inspections.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, a standard double socket outlet positioned 300mm or more from the sink edge
          means the nearest socket on a typical kitchen run will be positioned at least one socket
          width beyond the sink unit edge. Plan the kitchen electrical layout before finalising
          worktop and unit positions.
        </p>
      </>
    ),
  },
  {
    id: 'cooker-circuit',
    heading: 'Cooker Circuit Specification',
    content: (
      <>
        <p>
          A cooker circuit is one of the highest-load circuits in a domestic installation. Incorrect
          sizing is a safety and compliance risk. Always calculate the design current in accordance
          with BS 7671 Section 434 and Appendix 4 before selecting the cable and protective device.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard electric range (6kW to 13kW)</strong> — 6mm² twin and earth cable,
                32A or 40A Type B MCB (or RCBO), terminated at a dedicated cooker control unit. The
                cooker control unit must be positioned within sight of and accessible to the cooker,
                not concealed behind or above it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large range cooker (over 10kW)</strong> — 10mm² SWA or T&amp;E cable, 40A or
                45A MCB. Some large range cookers (Aga-style, commercial-grade domestic) can draw up
                to 20kW at full load. Always check the cooker's rated current from the
                manufacturer's data sheet.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Separate hob and oven</strong> — where a separate hob and oven are used
                rather than a range, each can typically be connected to a single 6mm² circuit if the
                combined assessed load (calculated using BS 7671 diversity allowances) is within the
                circuit's capacity. A separate connection unit for each appliance is safer and
                allows independent isolation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cooker control unit with socket</strong> — most domestic cooker control
                units include an integrated 13A socket outlet. This socket is protected by the
                control unit's switch and is useful for a kettle or toaster in the immediate
                vicinity. The socket must comply with the 300mm sink rule.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Induction hob considerations</strong> — induction hobs have a high starting
                current (inrush current) compared to their rated running current. For hobs rated
                7.2kW and above, a Type C MCB may be appropriate to prevent nuisance tripping on
                start-up. Confirm with the hob manufacturer.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dishwasher-socket',
    heading: 'Dishwasher and Washing Machine Electrical Connections',
    content: (
      <>
        <p>
          Dishwashers and washing machines are high-draw appliances (typically 10A to 13A during the
          heating cycle) that benefit from dedicated electrical connections rather than sharing a
          ring main with other kitchen appliances.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fused connection unit (FCU) recommended</strong> — a 13A FCU, wired as a
                non-fused spur from the ring main, provides a local isolation point and a permanent
                connection that avoids the appliance being accidentally unplugged. Position the FCU
                where it can be reached without moving the appliance, typically at a height of 800mm
                to 1,000mm above finished floor level in an adjacent unit or on the wall beside the
                appliance space.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlet as an alternative</strong> — a socket outlet behind the
                dishwasher is a common alternative to an FCU. This allows the appliance to be
                unplugged for maintenance. Where a socket is used, ensure it is accessible (the
                appliance can be moved) and positioned to respect the 300mm sink rule if the
                dishwasher is adjacent to the sink unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Washing machine in a kitchen</strong> — same requirements as a dishwasher.
                Where a washing machine is positioned in the kitchen, an FCU or socket behind the
                appliance is appropriate. The connection must be on an RCD-protected circuit under
                Regulation 411.3.3 of BS 7671.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fridge-circuit',
    heading: 'Fridge and Freezer Circuits',
    content: (
      <>
        <p>
          Fridge-freezers and standalone freezers have a practical consideration that affects their
          electrical connection: they must never be accidentally switched off. This influences the
          best approach to their connection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unswitched socket or FCU</strong> — connect a fridge or freezer to an
                unswitched socket outlet or an FCU without a switch. A switched socket risks the
                appliance being accidentally turned off. An FCU with a pilot light and no accessible
                switch is ideal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit for a chest freezer</strong> — a dedicated radial circuit
                for a large chest freezer (particularly one used for food storage in a utility room
                or garage) provides protection against nuisance tripping from other appliances on
                the circuit. A 13A radial circuit on 2.5mm² T&amp;E is more than sufficient.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD consideration for freezers</strong> — a fridge or freezer on an
                RCD-protected circuit risks food loss if the RCD trips due to another appliance on
                the same circuit. Individual RCBOs (one per circuit) allow the fridge circuit to
                remain live if another circuit trips. This is a good reason to specify individual
                RCBOs rather than a dual-RCD split board in kitchen installations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'extractor-fan',
    heading: 'Extractor Fan Wiring in Kitchens',
    content: (
      <>
        <p>
          Kitchen extractor fans (cooker hoods and canopy extractors) require a permanent electrical
          connection rather than a plug and socket, as they are fixed appliances. The wiring method
          depends on the type of extractor and its position.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wind className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fused connection unit (FCU)</strong> — the standard connection for a cooker
                hood extractor. A 3A or 5A FCU (depending on the fan's rated current), wired as a
                spur from the ring main, provides a local isolation point. The FCU should be within
                reach without requiring the user to lean over or near the hob.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wind className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Connection via cooker control unit</strong> — many cooker hoods are
                connected to the integrated socket in the cooker control unit. This is acceptable
                where the fan's rated current is within the socket's fuse rating. Check the fan
                specification — most kitchen extractor fans draw less than 2A.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wind className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Timer and humidity control wiring</strong> — extractor fans with built-in
                timers or humidity sensors that run after the control switch is turned off require a
                permanent live supply in addition to the switched live. Confirm the wiring
                requirements from the fan's installation instructions before connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wind className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Part F</strong> — kitchen ventilation is regulated
                under Building Regulations Part F (Ventilation) as well as Part P (Electrical
                Safety). Where a new extractor fan or replacement is installed in an existing
                dwelling, ensure the ventilation rate complies with Table 1.2 of Approved Document F
                (minimum 60 litres per second adjacent to the hob or 30 litres per second elsewhere
                in the kitchen).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection for Kitchen Circuits',
    content: (
      <>
        <p>
          RCD (Residual Current Device) protection on kitchen circuits is a mandatory requirement
          under BS 7671, yet it remains one of the most common deficiencies found during domestic
          EICR inspections, particularly in properties with older installations.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 411.3.3 requirement</strong> — all socket-outlet circuits rated
                up to 32A in domestic premises must be protected by a 30mA RCD. This requirement has
                been in successive editions of BS 7671 since the 17th Edition (2008) and is
                non-negotiable in a compliant kitchen installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>How RCD protection is provided</strong> — in a modern kitchen, RCD
                protection is typically provided by the RCDs or RCBOs in the consumer unit. A
                split-load consumer unit with dual RCDs provides RCD protection on all circuits.
                Individual RCBOs provide protection per circuit, which avoids an entire side of the
                board tripping if one appliance faults.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Upgrading existing kitchens</strong> — where an existing kitchen ring main
                has no RCD protection (common in pre-2008 installations), a consumer unit with RCDs
                must be installed, or the ring main circuit breaker must be replaced with an RCBO,
                to achieve compliance. This work is notifiable under Part P.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 observation on EICR</strong> — absence of RCD protection on kitchen
                socket circuits is classified as C2 (potentially dangerous) on an EICR under BS 7671
                Section 631. This makes the EICR Unsatisfactory and requires remedial action within
                28 days for landlord properties.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification for Kitchen Electrical Work',
    content: (
      <>
        <p>
          Part P of the Building Regulations (England) requires that certain electrical work in
          dwellings is either carried out by a registered competent person or notified to the local
          authority building control before work begins. Kitchen electrical work commonly triggers
          Part P notification requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notifiable kitchen electrical work</strong> — adding a new circuit (cooker
                circuit, dedicated appliance circuit), replacing a consumer unit, modifying a
                circuit in a kitchen, bathroom, or outdoors. These are designated special locations
                under Schedule 4 of the Building Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-notifiable kitchen electrical work</strong> — replacing a like-for-like
                socket outlet, switch, or fixed luminaire in a kitchen is not notifiable, provided
                no new wiring is required. Replacing a socket with a different type (e.g., adding
                USB outlets) is also non-notifiable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — electricians registered with NICEIC,
                NAPIT, ELECSA, or other approved competent person schemes can self-certify
                notifiable work and notify building control automatically. The homeowner receives a
                Building Regulations completion certificate at no additional cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consequences of non-notification</strong> — failure to notify kitchen
                electrical work that should have been notified is a breach of Building Regulations.
                When you sell the property, the lack of a completion certificate will be identified
                by the buyer's solicitor. Retrospective regularisation is possible but requires an
                EICR and may require remedial work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always use a registered competent person for kitchen electrical work. The certificate they
          issue is a permanent record of compliance that will be required when you sell or let the
          property.
        </p>
      </>
    ),
  },
  {
    id: 'typical-costs',
    heading: 'Typical Costs for Kitchen Electrical Work (2026)',
    content: (
      <>
        <p>
          Kitchen electrical work varies widely in cost depending on the scope of works, the age of
          the existing installation, and your location. Use these 2026 indicative prices when
          budgeting for a kitchen refurbishment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New cooker circuit (6mm², 32A RCBO)</strong> — £300 to £600 including
                materials, labour, and certification. Higher cost if the consumer unit does not have
                a spare way.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement (standard domestic)</strong> — £400 to £900
                including the unit, labour, and Building Regulations certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional socket outlets (per double socket, surface chase)</strong> — £100
                to £200 per double socket outlet including materials, chasing, and making good.
                First fix (before plastering) is significantly cheaper.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dishwasher or washing machine FCU</strong> — £80 to £150 per FCU including
                materials and labour.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extractor fan wiring (FCU spur)</strong> — £80 to £180 depending on cable
                run length and access.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full kitchen rewire (new circuits, sockets, switches)</strong> — £800 to
                £2,500 for a medium-sized kitchen. This includes all new socket outlets, cooker
                circuit, appliance spurs, lighting circuit, consumer unit, and certification. London
                and South East prices are typically 20 to 30 per cent higher.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR after kitchen refurbishment</strong> — £150 to £300. Recommended after
                significant kitchen electrical works to confirm compliance and provide a record for
                future sale or rental.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices exclude VAT (5% applies to residential electrical works), redecoration after
          chasing, and any associated plumbing or gas work. Always obtain two or three written
          quotes from registered electricians before proceeding with significant kitchen electrical
          works.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Kitchen Electrical Work and Certification',
    content: (
      <>
        <p>
          Kitchen electrical work is among the most common and consistent domestic installation
          work. A kitchen refurbishment project regularly involves new circuits, a consumer unit
          upgrade, and certification under Part P — all within a single visit.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certify Kitchen Work on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Kitchen circuits require an Electrical Installation Certificate (EIC) or a Minor
                  Works Certificate depending on scope. Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  to complete and issue the certificate on the day of completion. Customers expect
                  same-day certification — and it keeps your Part P obligations clear.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote the Full Kitchen Scope</h4>
                <p className="text-white text-sm leading-relaxed">
                  Kitchen enquiries often expand from a single cooker circuit to a full consumer
                  unit upgrade, new socket layouts, and appliance spurs. Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to quickly price the full scope and present a professional written quote that wins
                  the whole job.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Certify kitchen electrical work faster with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EIC and EICR completion, Part P certification, and instant quoting. Issue certificates and quotes before you leave the job. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function KitchenElectricalRequirementsPage() {
  return (
    <GuideTemplate
      title="Kitchen Electrical Requirements UK | Kitchen Wiring Regulations Guide"
      description="Complete guide to kitchen electrical requirements in the UK. Socket positions (300mm from sink), cooker circuit specification, dishwasher wiring, RCD protection requirements, Part P notification, and 2026 costs for kitchen electrical work."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Wiring Regulations Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Kitchen Electrical Requirements UK:{' '}
          <span className="text-yellow-400">Wiring Regulations and Costs Explained</span>
        </>
      }
      heroSubtitle="Kitchen electrical installations must meet specific requirements under BS 7671 and Part P of the Building Regulations. This guide covers zone requirements, the 300mm sink rule for socket positions, cooker circuit specification, RCD protection, Part P notification, and 2026 costs for typical kitchen electrical work."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Kitchen Electrical Regulations"
      relatedPages={relatedPages}
      ctaHeading="Certify Kitchen Electrical Work on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC and EICR completion, instant PDF export, and same-day quoting. Issue Part P certificates before you leave the job. 7-day free trial."
    />
  );
}
