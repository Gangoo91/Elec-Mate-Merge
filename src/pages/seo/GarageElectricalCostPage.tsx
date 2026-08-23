import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { PoundSterling, Home, FileCheck2, Building2, Car } from 'lucide-react';

// -------------------------------------------------------------------
// Shared surfaces — edge-to-edge on mobile, inset from sm: up
// -------------------------------------------------------------------

const cardCn =
  '-mx-5 my-5 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] ' +
  'p-5 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6';

const noteCn =
  '-mx-5 my-5 border-y border-blue-500/25 bg-blue-500/10 p-5 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6';

const scrollCn = '-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0';

const tableCn = 'w-full min-w-[520px] text-left text-[13.5px] text-white';
const thCn = 'whitespace-nowrap py-3 pr-4 align-bottom font-semibold text-white';
const tdCn = 'py-3 pr-4 align-top text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Cost Guides', href: '/guides/electrical-cost-guides' },
  { label: 'Garage Electrical Cost', href: '/garage-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Costs at a Glance' },
  { id: 'detached-garage', label: 'Detached Garage Costs' },
  { id: 'integral-garage', label: 'Integral Garage Costs' },
  { id: 'armoured-cable', label: 'Armoured Cable & Trenching' },
  { id: 'consumer-unit', label: 'Garage Consumer Unit' },
  { id: 'ev-charger', label: 'EV Charger Add-On' },
  { id: 'building-regs', label: 'Building Regulations & Part P' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A detached garage electrical installation typically costs £800 to £2,000. The main variable is the length of the armoured cable run from the house and whether trenching through a driveway or garden is required.',
  'An integral (attached) garage is simpler at £400 to £800, because the cable run is short and no external trenching is required.',
  'A cable buried in the ground must incorporate an earthed armour or metal sheath suitable for use as a protective conductor, unless it is run in a conduit or duct giving equivalent mechanical protection (BS 7671 Reg 522.8.10). In practice that means SWA. Trenching, sand bedding and cable covers add £20 to £50 per metre.',
  'BS 7671 sets no numeric burial depth for a domestic supply — Reg 522.8.10 requires only "a sufficient depth to avoid being damaged by any reasonably foreseeable disturbance of the ground". The familiar 600 mm figure comes from the notes to the caravan park and marina sections (Regs 708.521.7.2 and 730.521.101.3.2), and the trade applies it as the working minimum.',
  'A garage with more than one final circuit needs its own distribution board, because Reg 314.4 requires every final circuit to be connected to a separate way. Expect £300 to £600 for a small garage consumer unit.',
  'Adding a 7 kW EV charger costs an additional £600 to £1,200 as a standalone job (excluding the charger unit), but only £200 to £400 if the cable and consumer unit are being installed anyway.',
];

const faqs = [
  {
    question: 'How much does it cost to wire a detached garage?',
    answer:
      'Wiring a detached garage typically costs £800 to £2,000 for a complete installation. That covers SWA armoured cable from the house consumer unit, trenching if an underground route is used, a small consumer unit in the garage, lighting and socket circuits, and testing and certification. The main cost variable is the cable run length — a 10-metre run across a garden costs significantly less than a 30-metre run under a concrete driveway.',
  },
  {
    question: 'How much does it cost to rewire an existing garage?',
    answer:
      'Rewiring an existing garage that already has a sound supply typically costs £400 to £800 — the same range as a fresh integral garage installation, because the work is the same: new lighting and socket circuits, a small consumer unit if the existing board is obsolete, then testing and certification. If the incoming supply cable is also being replaced — for example an old unarmoured cable buried without protection — add the SWA and trenching costs, which takes a detached garage back into the £800 to £2,000 range.',
  },
  {
    question: 'What type of cable is used to supply a garage?',
    answer:
      'Regulation 522.8.10 of BS 7671 requires a cable buried in the ground to incorporate an earthed armour or metal sheath suitable for use as a protective conductor, unless it is installed in a conduit or duct providing equivalent protection against mechanical damage. In practice that means Steel Wire Armoured (SWA) cable — commonly 6mm² for a standard domestic garage supply, or 10mm² where an EV charger is planned or the run is long. The actual size must be confirmed against Appendix 4 for the reference method used, and against the voltage drop limits in Appendix 4 Table 4Ab. Above-ground SWA on the exterior of a building is also acceptable and avoids trenching altogether.',
  },
  {
    question: 'Do I need a consumer unit in my garage?',
    answer:
      'If the garage has more than one final circuit — a lighting circuit and a socket circuit, for example — then yes. Regulation 314.4 requires each final circuit to be connected to a separate way in a distribution board, and Regulation 462.2 requires every circuit to have a means of isolation for all live conductors. A small two to four way board at the point where the supply enters the garage satisfies both. For an integral garage it is common for the circuits to sit on the main house board instead, which is equally compliant, though a local board gives better discrimination when something trips.',
  },
  {
    question: 'How deep does the cable need to be buried?',
    answer:
      'BS 7671 does not give a depth for a domestic buried supply. Regulation 522.8.10 requires buried cables, conduits and ducts to be "at a sufficient depth to avoid being damaged by any reasonably foreseeable disturbance of the ground", and requires the route to be marked with cable covers or a suitable marker tape. The 600 mm figure everyone quotes comes from a note to the caravan park section (Reg 708.521.7.2) and the same note in the marina section (Reg 730.521.101.3.2), where 0.6 m is described as generally considered a minimum. The trade uses it as the working minimum for garden runs. Laying the cable on a bed of sharp sand with sand above it, then marker tape above that, is standard good practice rather than a BS 7671 requirement.',
  },
  {
    question: 'Can I use a normal twin and earth cable to supply my garage?',
    answer:
      'No. Regulation 522.8.10 requires a cable buried in the ground to have an earthed armour or metal sheath suitable for use as a protective conductor, unless it is in a conduit or duct providing equivalent mechanical protection. Standard PVC twin and earth has neither, and Regulation 522.3.1 also requires the wiring system to suffer no damage from ingress of water — which rules twin and earth out even inside a duct that fills with groundwater. Use SWA. Twin and earth buried directly is a departure that cannot be certified, and it will be picked up on any subsequent EICR.',
  },
  {
    question: 'Does garage electrical work need Building Regulations approval?',
    answer:
      'In England and Wales, installing a new circuit to supply a garage, or installing or replacing a consumer unit, is notifiable work under Part P of the Building Regulations. Minor work such as adding a socket to an existing garage circuit outside a special location is generally not notifiable. Where an electrician is registered with a competent person scheme such as NICEIC or NAPIT, they self-certify and notify building control on your behalf, and you receive a Building Regulations Compliance Certificate alongside the Electrical Installation Certificate. Scotland and Northern Ireland have their own building standards regimes.',
  },
  {
    question: 'How much does trenching for a garage cable cost?',
    answer:
      'Trenching costs depend on the surface and the length of the run. Through a garden or lawn, expect £15 to £25 per metre for digging, cable covers and reinstatement. Through an existing concrete driveway, costs rise to £30 to £60 per metre because of breaking out and reinstating the concrete. A typical 15-metre garden run therefore adds £225 to £375. Running the cable above ground along an exterior wall avoids trenching entirely.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/outbuilding-electrical-cost',
    title: 'Outbuilding Electrical Cost',
    description: 'Costs for supplying a garden office, workshop, or outbuilding with electricity.',
    icon: Building2,
    category: 'Cost Guide',
  },
  {
    href: '/guides/house-extension-electrical-cost',
    title: 'House Extension Electrical Cost',
    description: 'Single and double-storey house extension electrical installation costs.',
    icon: Home,
    category: 'Cost Guide',
  },
  {
    href: '/guides/ev-charger-installation-cost',
    title: 'EV Charger Installation Cost',
    description: 'Full breakdown of home EV charger installation costs and grant eligibility.',
    icon: Car,
    category: 'Cost Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Create professional garage and outbuilding electrical quotes from your phone.',
    icon: FileCheck2,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Garage Electrical Costs at a Glance',
    content: (
      <>
        <div className={cardCn}>
          <div className={scrollCn}>
            <table className={tableCn}>
              <thead>
                <tr className="border-b border-white/20">
                  <th className={thCn}>Job</th>
                  <th className={thCn}>Typical cost</th>
                  <th className={thCn}>What it covers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className={`${tdCn} font-semibold`}>Detached garage, full install</td>
                  <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                    £800 – £2,000
                  </td>
                  <td className={tdCn}>
                    SWA cable, trenching through garden, small consumer unit, lighting and socket
                    circuits, testing and certification
                  </td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>Integral (attached) garage</td>
                  <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                    £400 – £800
                  </td>
                  <td className={tdCn}>
                    Circuits fed from the main house consumer unit through the party wall. No
                    external cable run, no trenching
                  </td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>Rewire an existing garage</td>
                  <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                    £400 – £800
                  </td>
                  <td className={tdCn}>
                    New lighting and socket circuits on a sound existing supply, small board if
                    needed, testing and certification
                  </td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>EV charger, added to the same job</td>
                  <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                    £200 – £400
                  </td>
                  <td className={tdCn}>
                    Marginal cost of a 32 A circuit when the supply cable and board are being
                    installed anyway. Charger unit not included
                  </td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>EV charger, standalone job</td>
                  <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                    £600 – £1,200
                  </td>
                  <td className={tdCn}>
                    Circuit and installation as a separate visit. Charger unit not included
                  </td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>Trenching, per metre</td>
                  <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                    £15 – £60
                  </td>
                  <td className={tdCn}>
                    £15 – £25 through lawn or soft ground, £30 – £60 through concrete
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="mt-8 text-[17px] font-semibold tracking-tight text-white">
          What actually drives the price
        </h3>
        <p>
          Three things decide where in the range a garage job lands: whether the garage is attached
          or detached, how far the cable has to travel, and what it has to travel under. A 10-metre
          run across a lawn and a 25-metre run under a concrete driveway are the same electrical
          design and completely different jobs on the day.
        </p>
        <p>
          In England and Wales, installing the new circuit that supplies a garage — and installing or
          replacing a consumer unit — is notifiable under Part P of the Building Regulations. An
          electrician registered with a competent person scheme self-certifies the work, so no
          separate building control application is needed.
        </p>
      </>
    ),
  },
  {
    id: 'detached-garage',
    heading: 'Detached Garage Electrical Costs',
    content: (
      <>
        <p>
          A detached garage installation means running an armoured cable from the main house consumer
          unit to the garage, usually underground. Cost scales almost entirely with the length and
          difficulty of that run.
        </p>
        <div className={cardCn}>
          <div className={scrollCn}>
            <table className={tableCn}>
              <thead>
                <tr className="border-b border-white/20">
                  <th className={thCn}>Cable run</th>
                  <th className={thCn}>Typical cost</th>
                  <th className={thCn}>Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className={`${tdCn} font-semibold`}>Up to 10 m, through garden</td>
                  <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                    £800 – £1,200
                  </td>
                  <td className={tdCn}>
                    Usually one day. 6mm² SWA, trench through lawn, small consumer unit, one lighting
                    circuit, one socket circuit
                  </td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>10 – 25 m, mixed surfaces</td>
                  <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                    £1,200 – £1,600
                  </td>
                  <td className={tdCn}>
                    Longer run, likely trenching through a path or patio, higher materials cost
                  </td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>Over 25 m, or under a driveway</td>
                  <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                    £1,600 – £2,000+
                  </td>
                  <td className={tdCn}>
                    Diamond cutting or boring through the slab, significant reinstatement, and
                    possibly a larger cable to hold the voltage drop
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="mt-8 text-[17px] font-semibold tracking-tight text-white">
          Why long runs cost more than the extra cable
        </h3>
        <p>
          Beyond about 25 metres the cable stops being sized purely on current-carrying capacity and
          starts being sized on voltage drop. Section 525 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
          requires the voltage at fixed current-using equipment to stay within its product standard,
          and Regulation 525.202 deems that satisfied where the drop from the origin of the
          installation to the load point stays inside the figures in Appendix 4, Table 4Ab — 3 % for
          lighting and 5 % for other uses. Stepping from 6mm² to 10mm² to hold that figure adds
          material cost across the whole run, not just the extra metres.
        </p>
      </>
    ),
  },
  {
    id: 'integral-garage',
    heading: 'Integral Garage Electrical Costs',
    content: (
      <>
        <p>
          An integral or attached garage shares a wall with the house, which removes the external
          cable run, the armoured cable and the trenching from the job entirely. Circuits are fed
          from the main house consumer unit through the party wall.
        </p>
        <div className={cardCn}>
          <div className={scrollCn}>
            <table className={tableCn}>
              <thead>
                <tr className="border-b border-white/20">
                  <th className={thCn}>Scope</th>
                  <th className={thCn}>Typical cost</th>
                  <th className={thCn}>What it covers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className={`${tdCn} font-semibold`}>Lighting and sockets only</td>
                  <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                    £400 – £600
                  </td>
                  <td className={tdCn}>
                    One lighting circuit, one socket circuit (ring final or radial), tested and
                    certified. Assumes the existing board has spare ways
                  </td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>Plus consumer unit upgrade</td>
                  <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                    £800 – £1,200
                  </td>
                  <td className={tdCn}>
                    New consumer unit in the house to Reg 421.1.201, plus all garage circuits
                  </td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>Plus EV charger</td>
                  <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                    £1,000 – £1,800
                  </td>
                  <td className={tdCn}>
                    Dedicated 32 A EV circuit, board work if required, charger installation. Charger
                    unit not included
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>
          Inside an integral garage, standard 2.5mm² twin and earth is fine for the socket circuit
          provided it runs in a permitted zone or is mechanically protected. Because the run stays
          within the building structure, no armoured cable is needed.
        </p>
        <p>
          Socket-outlets rated up to 32 A need additional protection by a 30 mA RCD under Regulation
          411.3.3 — which in a garage matters, because that is exactly where extension leads and
          outdoor power tools get plugged in.
        </p>
      </>
    ),
  },
  {
    id: 'armoured-cable',
    heading: 'SWA Armoured Cable and Trenching',
    content: (
      <>
        <p>
          Regulation 522.8.10 is the one that decides the cable. A cable buried in the ground must
          incorporate an earthed armour or metal sheath — or both — suitable for use as a protective
          conductor, unless it is installed in a conduit or duct that provides equivalent protection
          against mechanical damage. For a domestic garage supply that means SWA in practice.
        </p>

        <h3 className="mt-8 text-[17px] font-semibold tracking-tight text-white">
          Cable size, depth and marking
        </h3>
        <div className={cardCn}>
          <div className={scrollCn}>
            <table className={tableCn}>
              <thead>
                <tr className="border-b border-white/20">
                  <th className={thCn}>Decision</th>
                  <th className={thCn}>What applies</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className={`${tdCn} font-semibold`}>Standard domestic supply</td>
                  <td className={tdCn}>
                    6mm² SWA is the usual starting point for lighting, sockets and a small workshop.
                    The final size must be confirmed against the Appendix 4 table for the reference
                    method actually used — direct in the ground and in a duct in the ground are
                    different columns — and against the protective device rating.
                  </td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>EV charger supply</td>
                  <td className={tdCn}>
                    A 7 kW charger draws around 32 A for long periods. On longer runs 10mm² SWA is
                    commonly needed to keep the total voltage drop within the 5 % allowed for
                    &ldquo;other uses&rdquo; in Appendix 4, Table 4Ab.
                  </td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>Burial depth</td>
                  <td className={tdCn}>
                    Reg 522.8.10 requires &ldquo;a sufficient depth to avoid being damaged by any
                    reasonably foreseeable disturbance of the ground&rdquo; and gives no figure. The
                    familiar 0.6 m comes from notes to the caravan park and marina sections (Regs
                    708.521.7.2 and 730.521.101.3.2) and is the working minimum the trade applies to
                    garden runs.
                  </td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>Marking the route</td>
                  <td className={tdCn}>
                    Reg 522.8.10 requires the location of buried cables to be marked by cable covers
                    or a suitable marker tape, and buried conduits and ducts to be suitably
                    identified. Sand bedding above and below the cable is good practice rather than a
                    BS 7671 requirement.
                  </td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>Overhead alternative</td>
                  <td className={tdCn}>
                    Where trenching is not viable, an insulated overhead run on a catenary is an
                    option and is far cheaper than cutting a driveway. BS 7671 gives no general
                    height for a domestic span; the benchmark installers work to is the 3.5 m — and 6
                    m where vehicles pass beneath — set for caravan parks and marinas in Regs
                    708.521.7.3 and 730.521.101.3.3.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'consumer-unit',
    heading: 'Garage Consumer Unit',
    content: (
      <>
        <p>
          Once a garage has more than one final circuit it needs a distribution board of its own.
          Regulation 314.4 requires each final circuit to be connected to a separate way in a
          distribution board, and Regulation 462.2 requires every circuit to have a means of
          isolation for all live conductors. A small board where the supply enters the garage
          satisfies both and keeps a fault in the garage off the house board.
        </p>
        <div className={cardCn}>
          <div className={scrollCn}>
            <table className={tableCn}>
              <thead>
                <tr className="border-b border-white/20">
                  <th className={thCn}>Board</th>
                  <th className={thCn}>Fitted cost</th>
                  <th className={thCn}>Suits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className={`${tdCn} font-semibold`}>Small, 4 way</td>
                  <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                    £300 – £450
                  </td>
                  <td className={tdCn}>
                    One lighting circuit, one socket circuit, one or two spares. RCBOs or dual RCD
                  </td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>Larger, 6 – 8 way</td>
                  <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                    £400 – £600
                  </td>
                  <td className={tdCn}>
                    Adds an EV charger circuit, a workshop power circuit, outdoor sockets and
                    security lighting
                  </td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>Lockable isolator</td>
                  <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                    Add £40 – £90
                  </td>
                  <td className={tdCn}>
                    Reg 462.3 lists padlocking and lockable enclosures as ways of preventing
                    inadvertent re-closure. Worth it where the garage is shared or let
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={noteCn}>
          <p className="mb-2 text-[15px] font-semibold text-white">
            What BS 7671:2018+A4:2026 asks for
          </p>
          <ul className="list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-white marker:text-white">
            <li>
              <strong>Enclosure.</strong> In domestic premises, consumer units and similar switchgear
              assemblies must comply with BS EN 61439-3 and have a non-combustible enclosure, or sit
              inside a non-combustible cabinet (Reg 421.1.201). The note to that regulation gives
              ferrous metal such as steel as an example of a non-combustible material.
            </li>
            <li>
              <strong>Certification.</strong> Regulation 644.1 requires an Electrical Installation
              Certificate on the model in Appendix 6 for a new installation, or for an addition or
              alteration — explicitly including the replacement of a distribution board or consumer
              unit. Under Reg 644.3 it must carry the Schedule of Inspection and the Schedules of
              Circuit Details and Test Results.
            </li>
            <li>
              <strong>AFDDs.</strong> Regulation 421.1.7 requires arc fault detection devices to
              BS EN 62606 on single-phase AC final circuits supplying socket-outlets rated up to 32 A
              in high rise residential buildings, houses in multiple occupation, purpose-built
              student accommodation and care homes. For all other premises — including an ordinary
              domestic garage — the same regulation <em>recommends</em> them rather than requiring
              them. Where fitted, they go at the origin of the circuit being protected.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ev-charger',
    heading: 'EV Charger Add-On to a Garage Installation',
    content: (
      <>
        <p>
          If the garage is being wired anyway, adding an EV charger circuit costs a fraction of what
          the same charger costs as a standalone visit. The supply cable, the trench and the
          consumer unit are the expensive parts, and they are already paid for.
        </p>
        <div className={cardCn}>
          <div className={scrollCn}>
            <table className={tableCn}>
              <thead>
                <tr className="border-b border-white/20">
                  <th className={thCn}>Route</th>
                  <th className={thCn}>Cost</th>
                  <th className={thCn}>Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className={`${tdCn} font-semibold`}>Added to the garage job</td>
                  <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                    £200 – £400
                  </td>
                  <td className={tdCn}>
                    7 kW / 32 A circuit only. Cable and board already covered by the main job
                  </td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>Standalone installation</td>
                  <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                    £600 – £1,200
                  </td>
                  <td className={tdCn}>Separate visit, separate cable route and board work</td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>Charger unit itself</td>
                  <td className={`${tdCn} whitespace-nowrap font-semibold text-elec-yellow`}>
                    £500 – £900
                  </td>
                  <td className={tdCn}>
                    Typical range for a smart charger. Not included in either figure above
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="mt-8 text-[17px] font-semibold tracking-tight text-white">
          Sizing the supply for a charger
        </h3>
        <p>
          A 7 kW charger needs a dedicated 32 A circuit and draws close to that continuously, so the
          supply SWA has to be sized for the load with the correction factors that apply to its
          actual reference method — depth of burial, grouping with other circuits and any thermal
          insulation. On runs over roughly 20 metres, 10mm² SWA is commonly what the voltage drop
          calculation lands on. Full detail is in the{' '}
          <SEOInternalLink href="/guides/ev-charger-installation-cost">
            EV charger installation cost guide
          </SEOInternalLink>
          .
        </p>
        <p>
          On grants: the domestic Electric Vehicle Homecharge Scheme closed to most homeowners in
          2022. The remaining chargepoint grants are aimed at flat owner-occupiers, renters,
          landlords and workplaces, and are administered by the Office for Zero Emission Vehicles
          (OZEV). Check current eligibility on GOV.UK before you promise a customer a contribution —
          the schemes and the amounts change.
        </p>
      </>
    ),
  },
  {
    id: 'building-regs',
    heading: 'Building Regulations and Part P',
    content: (
      <>
        <p>
          In England and Wales, installing a new circuit to supply a garage, and installing or
          replacing a consumer unit, is notifiable work under Part P of the Building Regulations.
          That applies whether the garage is detached or integral. Minor work on an existing circuit
          outside a special location is generally not notifiable. Scotland and Northern Ireland
          operate their own building standards regimes.
        </p>
        <div className={cardCn}>
          <div className={scrollCn}>
            <table className={tableCn}>
              <thead>
                <tr className="border-b border-white/20">
                  <th className={thCn}>Document</th>
                  <th className={thCn}>What it is and why it matters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className={`${tdCn} font-semibold`}>Electrical Installation Certificate</td>
                  <td className={tdCn}>
                    The{' '}
                    <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> records the
                    design, construction, inspection and test results, and is required by Reg 644.1.
                    It is the compliance evidence solicitors routinely ask for on garage and
                    outbuilding work when a property is sold.
                  </td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>
                    Building Regulations Compliance Certificate
                  </td>
                  <td className={tdCn}>
                    Issued when an electrician registered with a competent person scheme such as
                    NICEIC or NAPIT self-certifies the work and notifies building control on your
                    behalf. Without a registered electrician, the alternative is a building control
                    application before the work starts.
                  </td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>EV chargepoint notification</td>
                  <td className={tdCn}>
                    The new circuit is notifiable under Part P in the usual way. Separately, a new
                    chargepoint is normally notified to the distribution network operator; most EV
                    installers handle that as part of the job.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Garage Electrical Work',
    content: (
      <>
        <p>
          Garage installations are good bread-and-butter work. The scope is well defined, the design
          is routine, and an EV charger is an easy upsell once the supply cable and board are already
          on the quote.
        </p>

        <h3 className="mt-8 text-[17px] font-semibold tracking-tight text-white">
          Walk the cable route before you price it
        </h3>
        <p>
          Never quote a detached garage from the doorstep. Measure the route, note every surface it
          crosses, and find out what is already under the driveway. Quote the trenching as its own
          line item so the customer can see what the ground is costing them, and so a change of route
          does not eat your margin.
        </p>

        <h3 className="mt-8 text-[17px] font-semibold tracking-tight text-white">
          Always price the EV option
        </h3>
        <p>
          If the customer has a car, put the charger on the quote as a priced option rather than
          mentioning it. Adding a 32 A circuit while the trench is open costs a few hundred pounds;
          coming back for it later costs four figures. Showing both figures side by side is what
          closes it — the{' '}
          <SEOInternalLink href="/electrical-quoting-app">quoting app</SEOInternalLink> will produce
          the with-and-without version for you.
        </p>

        <SEOAppBridge
          title="Quote garage electrical installations professionally with"
          description="Create itemised garage electrical quotes with armoured cable, trenching, consumer unit, and EV charger options. Issue EICs on site."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GarageElectricalCostPage() {
  return (
    <GuideTemplate
      title="Garage Wiring Cost UK: Detached £800–£2,000"
      description="Detached garage electrical installation costs £800–£2,000, integral garage £400–£800. SWA cable and trenching costs, consumer unit, EV charger add-on."
      datePublished="2026-01-01"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Garage Electrical Installation Cost UK 2026:{' '}
          <span className="text-yellow-400">Garage Wiring Prices</span>
        </>
      }
      heroSubtitle="Detailed breakdown of garage electrical installation costs in the UK for 2026 — detached garage from £800, integral garage from £400, SWA armoured cable and trenching costs, garage consumer unit, EV charger add-ons, and Part P compliance."
      readingTime={10}
      answerBox={{
        question: 'How much does it cost to wire or rewire a garage in the UK?',
        answer:
          'A detached garage electrical installation typically costs £800 to £2,000, and an integral garage £400 to £800. Rewiring an existing garage on a sound existing supply also runs £400 to £800. Trenching adds £15 to £25 per metre through a garden, or £30 to £60 through concrete.',
        detail:
          'The single biggest variable is the SWA cable run from the house and what it has to cross. Adding a 7 kW EV charger while the trench is open costs £200 to £400 rather than £600 to £1,200 as a separate job.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Garage Electrical Installation Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Your Garage Electrical Installation in Minutes"
      ctaSubheading="Join 1,600+ UK electricians using Elec-Mate to create professional garage electrical quotes with armoured cable, trenching, and EV charger options. 7-day free trial, cancel anytime."
    />
  );
}
