import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Wrench,
  Cable,
  Home,
  FileCheck2,
  ClipboardCheck,
  Calculator,
  CircuitBoard,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared styles
// -------------------------------------------------------------------

// Cards run edge-to-edge on phones (the article column is px-5), inset from sm: up.
const cardCn =
  '-mx-5 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] ' +
  'p-5 my-5 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6';

const tableWrapCn = `${cardCn} overflow-x-auto`;

const listCn = 'space-y-3 text-white marker:text-elec-yellow list-disc pl-5';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/installation' },
  { label: 'First Fix', href: '/guides/first-fix-electrical' },
];

const tocItems = [
  { id: 'what-is-first-fix', label: 'What Is First Fix?' },
  { id: 'first-vs-second', label: 'First Fix vs Second Fix' },
  { id: 'cable-routing', label: 'Cable Routing and Safe Zones' },
  { id: 'back-boxes', label: 'Back Boxes and Mounting Points' },
  { id: 'containment-systems', label: 'Containment Systems' },
  { id: 'coordination', label: 'Coordination with Other Trades' },
  { id: 'part-p-notification', label: 'Part P Notification' },
  { id: 'common-mistakes', label: 'Common First Fix Mistakes' },
  { id: 'first-fix-checklist', label: 'First Fix Completion Checklist' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'First fix is everything installed before the plaster goes on — cables, containment, back boxes and drops. Second fix is the accessories, the consumer unit and the testing.',
  'A cable in a wall or partition is governed by Table 52.1 (Regulation 522.6.202). At A4:2026 the requirements previously in Regulation 522.6.203 were relocated into that table, so depth from the surface and whether the wall contains metallic parts now decide what protection is needed.',
  'A prescribed zone is within 150 mm of the top of the wall, within 150 mm of an angle formed by two adjoining walls, or horizontally and vertically from any point, accessory or switchgear. There is no prescribed zone at the floor line.',
  'A cable passing through a joist must be at least 50 mm from the top or bottom of the joist, or comply with Regulation 522.6.204 (Regulation 522.6.201).',
  'Regulation 411.3.4 requires 30 mA RCD additional protection for AC final circuits supplying luminaires within domestic premises — every lighting circuit needs an RCD-protected way on the board schedule.',
  'Regulation 421.1.7 was redrafted at A4:2026: AFDDs are a requirement on socket-outlet final circuits up to 32 A in high rise residential buildings, HMOs, purpose-built student accommodation and care homes, and recommended in all other premises. Decide this before you order the consumer unit.',
  'Part P notification is required for new circuits in dwellings, new consumer units, and work in special locations such as bathrooms and rooms containing a shower.',
];

const faqs = [
  {
    question: 'What exactly is included in first fix electrical?',
    answer:
      'First fix electrical covers everything that is installed before the walls are plastered and the floors are laid. This includes running cables from the consumer unit position to each accessory position, installing back boxes (metal or dry-lining boxes) at the correct height for switches, sockets and fused spurs, fitting cable containment (trunking, conduit or cable tray) where required, installing ceiling roses or downlight housings, running cables for smoke and heat detectors, pulling cables for data and TV points, and installing temporary supplies for the build if needed. First fix does not include fitting the accessories themselves (faceplates, switches, sockets) — that is second fix. The cables are left coiled at each accessory position, ready for the plasterer to work around them and the electrician to return for second fix.',
  },
  {
    question: 'What are the BS 7671 safe zones for cable routes?',
    answer:
      'Under BS 7671:2018+A4:2026, a cable installed in a wall or partition must comply with Table 52.1 (Regulation 522.6.202). The footnote to Table 52.1 defines a prescribed zone as a zone within 150 mm from the top of the wall or partition, or within 150 mm of an angle formed by two adjoining walls or partitions. A prescribed zone can also be formed horizontally and vertically from any point, accessory or switchgear located on the wall, and wiring from any circuit can be installed in such a zone. Where the location of the accessory, point or switchgear can be determined from the reverse side, a zone formed on one side of a wall or partition of 100 mm thickness or less extends to the reverse side. There is no prescribed zone at the floor line. What the zone buys you depends on the rest of Table 52.1: in a wall without metallic parts, a cable less than 50 mm from the surface must be in a prescribed zone and have additional protection by a 30 mA RCD with the characteristics of Regulation 415.1.1, or instead comply with Regulation 522.6.204 (for example an earthed metallic covering or earthed conduit). At 50 mm or more in a wall without metallic parts, no additional impact protection is required. If the wall or partition contains metallic parts — a metal-stud partition, for instance — protection is required at any depth.',
  },
  {
    question: 'How deep should cable chases be in walls?',
    answer:
      'BS 7671 does not specify a maximum chase depth — chase depth limits are a structural matter and come from the Building Regulations Approved Document A (Structure) and the masonry design standards it refers to. Vertical chases are limited to a proportion of the wall thickness, and horizontal chases are limited more tightly again because they cut across the load path; check the current Approved Document A figures for the wall thickness you are working with rather than working from a rule of thumb. Chases should not be positioned back to back on opposite sides of a wall. For stud partition walls, cables are run through drilled holes in the timber studs or noggings and chase depths do not apply — but the cable must be kept clear of the screw line where plasterboard will be fixed, and grommets or bushes should be used where cables pass through metal studs to prevent abrasion. Whatever the chase depth, the electrical requirement is unchanged: the cable still has to satisfy Table 52.1 of BS 7671 for its depth below the finished surface.',
  },
  {
    question: 'Do I need to notify Building Control before starting first fix?',
    answer:
      'Under Part P of the Building Regulations (England and Wales), certain electrical work in dwellings must be notified to the local Building Control body before work starts. Notifiable work includes the installation of a new circuit, the installation of a new consumer unit, and any electrical work in a special location such as a bathroom, a room containing a shower, a swimming pool or a sauna. If you are registered with a competent person scheme (NICEIC, NAPIT, ELECSA or similar), you can self-certify the work and notify Building Control through the scheme. If you are not registered with a competent person scheme, you must notify Building Control before starting the work, and they will arrange inspection at appropriate stages. For a full rewire or new build, this typically means a Building Control inspection at first fix stage (before plastering) and at completion.',
  },
  {
    question: 'What cables should I use for first fix in a new build?',
    answer:
      'For domestic first fix in a new build, the standard cable is flat twin and earth (T+E) to BS 6004, or BS 7211 where a low smoke halogen-free cable is specified. The usual starting points are 1.0 mm² for lighting, 2.5 mm² for socket ring final circuits and smaller socket radials, 4.0 mm² for a cooker or immersion heater circuit, and 6.0 mm² or 10.0 mm² for a shower or a larger cooker. Treat those as starting points only — the size that actually goes in has to be confirmed against the circuit design current, the reference method for the route, grouping, ambient temperature, thermal insulation and volt drop, which is what the cable sizing calculator is for. For fire detection and fire alarm wiring, use a fire-resistant cable to BS 7629-1 (for example FP200 Gold or equivalent) selected to meet the standard or enhanced grade required by BS 5839-1. For data, Cat6 is the usual domestic choice. Cable colours follow BS 7671 Table 51: brown for line, blue for neutral, green-and-yellow for the protective conductor. Where a blue core is used as a switched line — the classic switch drop — it has to be identified as a line conductor at its terminations, so oversleeve it brown.',
  },
  {
    question: 'Do cables in insulated walls or loft spaces need to be derated?',
    answer:
      'Yes — this is one of the most commonly overlooked first fix issues in new builds. Regulation 523.9 says that for a single cable likely to be totally surrounded by thermally insulating material over a length of 0.5 m or more, the current-carrying capacity shall be taken, in the absence of more precise information, as 0.5 times the current-carrying capacity for that cable clipped direct to a surface and open (Reference Method C). For shorter lengths in insulation the derating factors in Section 2.6 of Appendix 4 apply: 0.88 at 50 mm, 0.78 at 100 mm, 0.63 at 200 mm, 0.51 at 400 mm and 0.5 at 500 mm or more. Those factors are appropriate to conductor sizes up to 10 mm² in insulation with a thermal conductivity greater than 0.04 W/m·K. In Part L-compliant new builds, external walls, loft spaces and ceiling voids are heavily insulated, so a large share of the cable runs in those areas are affected. The practical consequence at first fix is simple: a halved rating is a big reduction, and a cable chosen from a clipped-direct figure can be undersized before it is even installed. Size the cables against the actual route before ordering materials, not after.',
  },
  {
    question: 'How do I coordinate first fix electrical with the plumber?',
    answer:
      'Coordination with the plumber is critical to avoid clashes. Before first fix starts, agree the following: positions of boiler, cylinder and any mechanical ventilation units (these need electrical supplies and switching), routes for heating pipes (to avoid running cables directly above or below heating pipes, which affects cable current-carrying capacity), positions of bathroom and kitchen accessories (to ensure electrical back boxes do not clash with pipe runs in the wall), and the position of the consumer unit (not directly above a boiler or water cylinder, with adequate clearance for working on the board). On new build sites, the electrical and plumbing first fix often happen simultaneously, so daily coordination is essential. A clash discovered after plastering is expensive to fix — it means chasing out finished walls, which damages the plaster, wastes time and creates friction with the builder.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/rams-for-full-rewire',
    title: 'RAMS for Full Rewire',
    description: 'Domestic rewire RAMS — first/second fix, dust, asbestos.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/second-fix-electrical',
    title: 'Second Fix Electrical',
    description:
      'The companion guide to first fix — covering accessory fitting, consumer unit wiring, testing, and EIC certification.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/ai-circuit-designer',
    title: 'AI Circuit Designer',
    description:
      'Plan circuit layouts, cable routes, and board schedules with AI assistance before starting first fix.',
    icon: CircuitBoard,
    category: 'Tool',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables correctly for every circuit before ordering materials for first fix.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Understand which electrical work requires notification and how competent person schemes work.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/new-build-electrical',
    title: 'New Build Electrical',
    description:
      'Complete guide to electrical requirements for new build properties including EV charging and smoke detectors.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/house-rewire-guide',
    title: 'House Rewire Guide',
    description:
      'Full rewire guidance covering both first and second fix stages with pricing and timescales.',
    icon: Cable,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-first-fix',
    heading: 'What Is First Fix Electrical?',
    content: (
      <>
        <p>
          First fix electrical is the stage of an electrical installation that takes place before
          the walls are plastered and the floors are finished. It is the hidden infrastructure — the
          cables, containment, back boxes and mounting points that will be concealed behind the
          finished surfaces. Everything installed at first fix must be correct before it is covered
          up, because accessing it afterwards means damaging the finished building.
        </p>
        <p>
          On a typical domestic new build or full rewire, first fix accounts for the larger share of
          the total installation time. It involves running all cables from the{' '}
          <SEOInternalLink href="/consumer-unit-regulations">
            consumer unit position
          </SEOInternalLink>{' '}
          to every switch, socket, light and fixed appliance position in the property. It also
          includes installing containment (conduit, trunking or cable tray), fitting back boxes into
          walls, and pulling cables for smoke detectors, data points and any specialist systems.
        </p>
        <p>
          The quality of first fix directly determines the quality of the finished installation.
          Cables routed outside{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> safe
          zones risk damage from future fixings. Back boxes fitted at the wrong height or in the
          wrong position mean awkward accessory placements that the customer will notice.
          Containment that is too small for the number of cables makes pulling cables difficult and
          restricts heat dissipation.
        </p>
      </>
    ),
  },
  {
    id: 'first-vs-second',
    heading: 'First Fix vs Second Fix: What Happens When',
    content: (
      <>
        <p>
          First and second fix are the same installation split by the plasterer. Anything that has
          to be buried goes in at first fix; anything that can be screwed on afterwards waits for
          second fix. Getting the split right is mostly a scheduling problem — you need two visits
          booked around the wet trades, not one.
        </p>
        <div className={tableWrapCn}>
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 pr-4 font-semibold whitespace-nowrap">Element</th>
                <th className="text-left py-3 pr-4 font-semibold">First fix (before plaster)</th>
                <th className="text-left py-3 font-semibold">Second fix (after decoration)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-3 pr-4 font-semibold">Cables</td>
                <td className="py-3 pr-4">
                  Run from the board position to every outlet, left long and coiled at each box
                </td>
                <td className="py-3">Stripped, sleeved and terminated into the accessory</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold">Back boxes</td>
                <td className="py-3 pr-4">
                  Chased into masonry or fixed to studs, set to the finished plaster line
                </td>
                <td className="py-3">Faceplate fixed to the box, grommets and gasket checked</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold">Accessories</td>
                <td className="py-3 pr-4">None fitted</td>
                <td className="py-3">
                  Sockets, switches, spurs, ceiling roses, downlights, extract fans
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold">Consumer unit</td>
                <td className="py-3 pr-4">
                  Position agreed and marked, circuit cables dressed in and labelled
                </td>
                <td className="py-3">
                  Board fitted, circuits connected, RCD and AFDD ways allocated, schedule completed
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold">Containment</td>
                <td className="py-3 pr-4">
                  Conduit, trunking, tray and capping installed and cables drawn in
                </td>
                <td className="py-3">Lids, covers and accessory boxes made off</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold">Testing</td>
                <td className="py-3 pr-4">
                  Continuity and insulation resistance on the concealed work before it is covered
                </td>
                <td className="py-3">
                  Full initial verification and the Electrical Installation Certificate
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold">Position in the programme</td>
                <td className="py-3 pr-4">
                  After the structure is weathertight, before the plasterer
                </td>
                <td className="py-3">After plastering, decoration and floor coverings</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Regulation 641.1 is the reason the testing splits across both visits: every installation
          shall, <em>during erection</em> and on completion before being put into service, be
          inspected and tested to verify, so far as is reasonably practicable, that the requirements
          of BS 7671 have been met. Once the plaster is on, the concealed work can no longer be
          inspected — so the inspection has to happen while it is still open.
        </p>
      </>
    ),
  },
  {
    id: 'cable-routing',
    heading: 'Cable Routing and Safe Zones',
    content: (
      <>
        <p>
          Cable routing is the most critical aspect of first fix. Every cable must follow a route
          that minimises the risk of damage during and after construction, complies with BS 7671,
          and allows the cable to carry its design current without overheating.
        </p>
        <h3 className="mt-6 text-base font-semibold text-white">
          What counts as a prescribed zone
        </h3>
        <p>
          Regulation 522.6.202 requires a cable installed in a wall or partition to comply with
          Table 52.1. The footnote to that table defines the prescribed zones:
        </p>
        <div className={cardCn}>
          <ul className={listCn}>
            <li>Within 150 mm from the top of the wall or partition.</li>
            <li>Within 150 mm of an angle formed by two adjoining walls or partitions.</li>
            <li>
              Horizontally and vertically from any point, accessory or switchgear located on the
              wall. Wiring from any circuit can be installed in such a zone.
            </li>
          </ul>
          <p className="mt-4 text-white">
            Where the location of the accessory, point or switchgear can be determined from the
            reverse side, a zone formed on one side of a wall or partition 100 mm thick or less
            extends to the reverse side.
          </p>
          <p className="mt-3 text-white">
            There is no prescribed zone at the floor line. A run dropped to skirting level and taken
            horizontally gets nothing from the zone rules — plan routes accordingly.
          </p>
        </div>
        <h3 className="mt-6 text-base font-semibold text-white">
          Table 52.1 — what a cable in a wall actually needs
        </h3>
        <p>
          A4:2026 relocated the old Regulation 522.6.203 requirements into Table 52.1, so the
          protection now depends on two things: how deep the cable sits below the finished surface,
          and whether the wall or partition contains metallic parts.
        </p>
        <div className={tableWrapCn}>
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 pr-4 font-semibold">Wall construction</th>
                <th className="text-left py-3 pr-4 font-semibold">Cable less than 50 mm deep</th>
                <th className="text-left py-3 font-semibold">Cable 50 mm or more deep</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-3 pr-4 font-semibold">Without metallic parts</td>
                <td className="py-3 pr-4">
                  Installed in a prescribed zone <strong>and</strong> given additional protection by
                  an RCD with the characteristics of Regulation 415.1.1; or comply with Regulation
                  522.6.204
                </td>
                <td className="py-3">No additional impact protection required</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold">With metallic parts</td>
                <td className="py-3 pr-4">
                  Installed in a prescribed zone <strong>and</strong> given additional protection by
                  an RCD with the characteristics of Regulation 415.1.1; or installed in a
                  prescribed zone <strong>and</strong> comply with Regulation 522.6.204
                </td>
                <td className="py-3">
                  Given additional protection by an RCD with the characteristics of Regulation
                  415.1.1; or comply with Regulation 522.6.204
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Regulation 415.1.1 is the 30 mA figure: an RCD with a rated residual operating current not
          exceeding 30 mA, recognised in AC systems as additional protection. The practical catch is
          the bottom row — a metal-stud partition contains metallic parts, so a cable in it needs
          protection at <em>any</em> depth, not just under 50 mm.
        </p>
        <h3 className="mt-6 text-base font-semibold text-white">
          The Regulation 522.6.204 alternatives
        </h3>
        <p>Where Table 52.1 allows Regulation 522.6.204 instead of an RCD, the cable shall:</p>
        <div className={cardCn}>
          <ul className={listCn}>
            <li>
              incorporate an earthed metallic covering complying with the requirements of BS 7671
              for a protective conductor of the circuit concerned, the cable complying with BS 5467,
              BS 6724, BS 7846, BS 8436 or BS EN 60702-1; or
            </li>
            <li>
              be installed in earthed conduit complying with BS EN 61386-21 and satisfying the
              requirements of BS 7671 for a protective conductor; or
            </li>
            <li>
              be enclosed in earthed trunking or ducting complying with BS EN 50085-2-1 and
              satisfying the requirements of BS 7671 for a protective conductor; or
            </li>
            <li>
              be provided with mechanical protection against damage sufficient to prevent
              penetration of the cable by nails, screws and the like; or
            </li>
            <li>
              form part of a SELV or PELV circuit meeting the requirements of Regulation 414.4.
            </li>
          </ul>
        </div>
        <h3 className="mt-6 text-base font-semibold text-white">
          Cables through joists and battens
        </h3>
        <p>
          Regulation 522.6.201 covers the floors and ceilings. A cable installed under a floor or
          above a ceiling shall be run in a position where it is not liable to be damaged by contact
          with the floor or ceiling or their fixings. A cable passing through a joist within a floor
          or ceiling construction, or through a ceiling support such as under floorboards, shall be
          installed at least 50 mm measured vertically from the top, or bottom as appropriate, of
          the joist or batten — or comply with Regulation 522.6.204.
        </p>
        <p>
          That 50 mm is the electrical rule. The structural rules for where you are allowed to drill
          a joist at all — position along the span, hole diameter relative to joist depth, spacing
          between holes, and the general preference for drilled holes over notches — come from the
          Building Regulations and the timber design guidance, not from BS 7671. On a new build,
          confirm them with the frame designer before you start boring holes.
        </p>
        <h3 className="mt-6 text-base font-semibold text-white">
          Two A4:2026 changes that decide your board
        </h3>
        <p>
          Both of these are consumer unit decisions, and both have to be made at first fix — before
          the board position is fixed and the unit is ordered.
        </p>
        <div className={cardCn}>
          <h4 className="font-semibold text-white">
            Regulation 411.3.4 — 30 mA RCD on domestic lighting
          </h4>
          <p className="mt-2 text-white">
            Within domestic (household) premises, additional protection by an RCD with a rated
            residual operating current not exceeding 30 mA shall be provided for AC final circuits
            supplying luminaires. This is a "shall", not a recommendation. At first fix it means
            every lighting circuit you run has to be assigned to an RCD-protected way on the board
            schedule.
          </p>
          <div className="border-t border-white/[0.1] mt-5 pt-5">
            <h4 className="font-semibold text-white">
              Regulation 421.1.7 — AFDDs, required in four building types
            </h4>
            <p className="mt-2 text-white">
              A4:2026 redrafted this regulation, and it is no longer a flat recommendation. AFDDs
              conforming to BS EN 62606 <strong>shall</strong> be provided for single-phase AC final
              circuits supplying socket-outlets with a rated current not exceeding 32 A in high rise
              residential buildings (HRRBs), houses in multiple occupation (HMOs), purpose-built
              student accommodation, and care homes. For all other premises, AFDDs are{' '}
              <strong>recommended</strong> for the same circuits. Where used, AFDDs shall be placed
              at the origin of the circuit to be protected, which drives both the type of board and
              the number of ways you need. The note to the regulation assumes a high rise
              residential building is over 18 m in height or in excess of six storeys, whichever is
              met first.
            </p>
          </div>
        </div>
        <p>
          In practice, planning cable routes before drilling and chasing saves significant time.
          Mark out accessory positions on the walls, plan the runs from each position back to the
          consumer unit, and identify any crossings or shared routes where containment will be
          needed.
        </p>
      </>
    ),
  },
  {
    id: 'back-boxes',
    heading: 'Back Boxes and Mounting Points',
    content: (
      <>
        <p>
          Back boxes (also called pattress boxes) are installed at first fix to provide a mounting
          point for the accessories that will be fitted at second fix. Getting back box selection
          and positioning right at first fix avoids problems later.
        </p>
        <div className={cardCn}>
          <ul className={listCn}>
            <li>
              <strong>Metal back boxes (masonry walls)</strong> — 25 mm or 35 mm deep for standard
              switches and sockets, 47 mm deep for dimmer switches and some smart switches that have
              deeper mechanisms. Use galvanised steel boxes with an earth terminal.
            </li>
            <li>
              <strong>Dry-lining boxes (plasterboard walls)</strong> — cavity-fixing boxes that grip
              the plasterboard when tightened. Available in single, double and triple gang sizes.
              Check the box depth against the plasterboard-to-stud gap before you cut.
            </li>
            <li>
              <strong>Standard heights</strong> — sockets at 450 mm and switches at 1200 mm from
              finished floor level, measured to the centre of the box. These are not BS 7671
              requirements; they are the industry defaults and they sit inside the accessibility
              range that Building Regulations Approved Document M works to.
            </li>
            <li>
              <strong>Cooker switch position</strong> — beside the cooker rather than above it, so
              nobody has to reach over a hot hob to isolate. Around 1350 mm from finished floor
              level is common practice, and within reach of the appliance it controls.
            </li>
          </ul>
        </div>
        <p>
          Allow sufficient cable at each back box position for the second fix electrician to work
          comfortably. Leave at least 200 mm of cable protruding from each box. That is enough
          length to strip, terminate and push back into the box without straining the connections.
        </p>
      </>
    ),
  },
  {
    id: 'containment-systems',
    heading: 'Containment Systems: Conduit, Trunking and Cable Tray',
    content: (
      <>
        <p>
          Containment protects cables from mechanical damage, simplifies cable management, and
          provides a professional finish in exposed or surface-mounted installations. The choice
          depends on the installation environment, the number of cables, and whether the containment
          will be concealed or visible.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-5">
          <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-5">
            <h3 className="font-semibold text-white text-base mb-2">PVC conduit</h3>
            <p className="text-white text-sm leading-relaxed">
              Round PVC conduit (20 mm or 25 mm) is used for concealed runs in masonry walls and
              floors, with the cables drawn in after the conduit is fixed. Regulation 522.8.2
              requires a conduit or ducting system buried in the structure to be completely erected
              between access points before any cable is drawn in — so it has to be finished, not
              half-finished, before you pull.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-5">
            <h3 className="font-semibold text-white text-base mb-2">Steel conduit</h3>
            <p className="text-white text-sm leading-relaxed">
              Galvanised steel conduit provides mechanical protection and can serve as the circuit
              protective conductor — Regulation 543.2.1(f) recognises a metal conduit or metallic
              cable management system as a protective conductor, provided it satisfies the rest of
              Section 543 for continuity and cross-sectional area. That means every coupler, bush
              and box has to be made off properly, and the continuity has to be tested.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-5">
            <h3 className="font-semibold text-white text-base mb-2">PVC trunking</h3>
            <p className="text-white text-sm leading-relaxed">
              Mini-trunking and dado trunking are used for surface-mounted cable management,
              commonly in commercial offices and retail premises, in sizes from 16x16 mm upwards.
              Use Elec-Mate's{' '}
              <SEOInternalLink href="/tools/trunking-fill-calculator">
                trunking fill calculator
              </SEOInternalLink>{' '}
              to check the cable count against the capacity of the section you have specified.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-5">
            <h3 className="font-semibold text-white text-base mb-2">Cable tray and basket</h3>
            <p className="text-white text-sm leading-relaxed">
              Cable tray (perforated or ladder type) and cable basket are used in commercial and
              industrial installations for running large numbers of cables over long distances.
              Cables are laid on the tray rather than enclosed, which ventilates them and reduces
              the grouping penalty compared with the same cables bunched in an enclosure.
            </p>
          </div>
        </div>
        <p>
          BS 7671 does not publish a numerical fill percentage for conduit or trunking. Capacity is
          worked out from the cable factor and conduit or trunking factor tables in the IET On-Site
          Guide, which take account of the run length and the number of bends. Elec-Mate's{' '}
          <SEOInternalLink href="/tools/conduit-fill-calculator">
            conduit fill calculator
          </SEOInternalLink>{' '}
          does that arithmetic for you. What BS 7671 does require is Regulation 522.8.1: the wiring
          system shall be selected and erected to avoid damage to the sheath or insulation of cables
          and their terminations during installation, use or maintenance, and lubricants that can
          have a detrimental effect on the cable or wiring system are not permitted.
        </p>
      </>
    ),
  },
  {
    id: 'coordination',
    heading: 'Coordination with Other Trades',
    content: (
      <>
        <p>
          First fix electrical rarely happens in isolation. On any building project — new build,
          extension or rewire — the electrician must coordinate with plumbers, plasterers,
          carpenters and the main contractor. Poor coordination is one of the most common causes of
          delay and rework.
        </p>
        <div className={cardCn}>
          <ul className={listCn}>
            <li>
              <strong>Plumber</strong> — agree positions for the boiler supply, cylinder immersion,
              unvented cylinder controls, underfloor heating manifold and any mechanical
              ventilation. Avoid running cables directly above or below hot water pipes.
            </li>
            <li>
              <strong>Plasterer</strong> — all first fix must be complete and signed off before
              plastering starts. Back boxes should finish flush with the plastered surface, neither
              recessed behind it nor proud of it. Agree the plaster thickness and set the boxes to
              suit.
            </li>
            <li>
              <strong>Carpenter</strong> — coordinate stud positions for dry-lining boxes, agree
              joist drilling positions, and confirm the kitchen unit layout before you set worktop
              socket and switch heights. Cables through joists still have to meet the 50 mm rule in
              Regulation 522.6.201, so the holes have to suit both trades.
            </li>
            <li>
              <strong>Main contractor</strong> — agree the programme, access arrangements and any
              temporary supplies needed for the build. First fix follows structural work and
              precedes plastering in the build sequence.
            </li>
          </ul>
        </div>
        <p>
          Use Elec-Mate's{' '}
          <SEOInternalLink href="/electrical-quoting-app">quoting app</SEOInternalLink> to produce a
          first fix specification and quote that details every accessory position, circuit
          allocation and containment requirement. Sharing it with the builder and the other trades
          at the start of the project prevents misunderstandings and keeps the programme on track.
        </p>
        <SEOAppBridge
          title="Build the first fix specification once"
          description="Elec-Mate's quoting app turns a first fix spec into material lists, labour estimates and a professional quote you can send from your phone."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'part-p-notification',
    heading: 'Part P Notification for First Fix Work',
    content: (
      <>
        <p>
          Part P of the Building Regulations (England and Wales) makes certain domestic electrical
          work notifiable. The work must either be carried out by a registered competent person, who
          can self-certify, or notified to Building Control before it starts.
        </p>
        <p>
          First fix work that is notifiable under{' '}
          <SEOInternalLink href="/part-p-building-regulations">Part P</SEOInternalLink> includes:
        </p>
        <div className={cardCn}>
          <ul className={listCn}>
            <li>
              Installation of a new circuit — any new circuit added to an existing or new consumer
              unit.
            </li>
            <li>
              Consumer unit replacement or relocation, including the installation of a new consumer
              unit in a new build.
            </li>
            <li>
              Any electrical work in a special location — bathrooms, rooms containing a shower,
              swimming pools, saunas and hot tub enclosures.
            </li>
            <li>
              A full rewire or new build installation — the entire installation is notifiable.
            </li>
          </ul>
        </div>
        <p>
          If you are registered with NICEIC, NAPIT, ELECSA or another competent person scheme, you
          can self-certify. You complete the installation, carry out initial verification, issue the{' '}
          <SEOInternalLink href="/eic-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>
          , and notify Building Control through your scheme. The scheme issues a Building
          Regulations Compliance Certificate to the customer.
        </p>
        <p>
          If you are not registered with a competent person scheme, you must notify Building Control
          before starting the work. They will inspect at first fix stage, before plastering, and
          again at completion. Building Control charges a fee for this inspection and the amount
          varies by local authority.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common First Fix Mistakes to Avoid',
    content: (
      <>
        <p>
          First fix mistakes are expensive because they are hidden behind finished surfaces. By the
          time one is discovered it usually means opening up a wall or a ceiling. These are the ones
          that come back most often:
        </p>
        <div className={cardCn}>
          <ul className={listCn}>
            <li>
              <strong>Cables outside a prescribed zone with nothing else in place</strong> — running
              diagonally across walls or at arbitrary heights, with no 30 mA RCD and no earthed
              metallic containment. Table 52.1 gives you options, but it does not give you none.
            </li>
            <li>
              <strong>Treating a metal-stud partition like a timber one</strong> — a wall containing
              metallic parts needs protection at any depth. The 50 mm let-off only applies to walls
              without metallic parts.
            </li>
            <li>
              <strong>Not leaving enough cable at back box positions</strong> — 50 to 100 mm makes
              second fix termination awkward and increases the risk of a poor connection. Leave at
              least 200 mm.
            </li>
            <li>
              <strong>Wrong back box depth</strong> — a 25 mm box for a dimmer that needs 35 mm or
              47 mm. The mechanism will not fit, and the box has to be replaced after plastering.
            </li>
            <li>
              <strong>Forgetting the smoke detector interconnect</strong> — interlinked smoke and
              heat detectors are a Building Regulations requirement. The interconnect has to be run
              at first fix or you are surface-clipping it later.
            </li>
            <li>
              <strong>Not photographing cable routes</strong> — photograph every run before
              plastering. It is a record for the next person and it can be attached to the EIC as
              supporting evidence.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'first-fix-checklist',
    heading: 'First Fix Completion Checklist',
    content: (
      <>
        <p>
          Before signing off first fix and letting the plasterer in, work through this checklist to
          make sure nothing has been missed:
        </p>
        <div className={cardCn}>
          <ul className={listCn}>
            <li>
              Cables run to every accessory position — sockets, switches, lights, spurs, cooker,
              shower, smoke detectors, data points, EV charger, outdoor lighting.
            </li>
            <li>
              EV charger circuit sized and consumer unit capacity assessed. Regulation 722.311.201
              allows load curtailment, including load reduction or disconnection, either
              automatically or manually, to be taken into account when determining maximum demand of
              the installation or part of it.
            </li>
            <li>
              Every cable in a wall checked against Table 52.1 for its depth and the wall
              construction — prescribed zone, 30 mA RCD, or a Regulation 522.6.204 method.
            </li>
            <li>
              Cables through joists at least 50 mm from the top or bottom, or protected to
              Regulation 522.6.204.
            </li>
            <li>
              Every lighting circuit allocated to a 30 mA RCD-protected way on the board schedule
              (Regulation 411.3.4).
            </li>
            <li>
              AFDD requirement settled for the premises type before the consumer unit is ordered
              (Regulation 421.1.7).
            </li>
            <li>
              Back boxes at the correct height and depth, set to the plaster line, with at least 200
              mm of cable protruding.
            </li>
            <li>Containment installed where required and cables drawn in.</li>
            <li>
              Cables labelled at both ends — at the accessory position and at the consumer unit
              position. This saves hours at second fix.
            </li>
            <li>
              Continuity and insulation resistance tested on everything about to be covered, and the
              results recorded. Regulation 641.1 requires inspection and testing during erection as
              well as on completion.
            </li>
            <li>Photographs taken of all concealed cable routes before plastering.</li>
            <li>Consumer unit position marked and cables dressed ready for second fix.</li>
          </ul>
        </div>
        <SEOAppBridge
          title="Design the full installation before you start drilling"
          description="Elec-Mate's AI circuit designer creates a complete circuit schedule, cable sizing and board layout from your job specification."
          icon={CircuitBoard}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FirstFixElectricalPage() {
  return (
    <GuideTemplate
      title="First Fix Electrical: What It Is vs Second Fix"
      description="First fix is the cabling, back boxes and containment fitted before plastering. Zones within 150 mm, Table 52.1, 50 mm through joists, then second fix."
      datePublished="2025-07-01"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Cable}
      heroTitle={
        <>
          First Fix Electrical:{' '}
          <span className="text-elec-yellow">Getting the Hidden Infrastructure Right</span>
        </>
      }
      heroSubtitle="First fix is the foundation of every electrical installation. Cable routing, back boxes, containment and coordination with other trades have to be right before the plaster goes on, because mistakes discovered afterwards are expensive to put right. This guide covers the BS 7671 rules that decide each of them."
      readingTime={12}
      answerBox={{
        question: 'What is first fix in electrical installation?',
        answer:
          'First fix is the electrical work done before the walls are plastered and the floors are laid: running cables, fitting back boxes, installing containment and drilling joists. Cables in a wall must satisfy Table 52.1 of BS 7671, and cables through joists must be at least 50 mm from the top or bottom edge. Second fix — accessories, the consumer unit and testing — follows once the plaster is dry.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About First Fix Electrical"
      relatedPages={relatedPages}
      ctaHeading="Plan First Fix Jobs Properly"
      ctaSubheading="Elec-Mate's AI circuit designer, cable sizing calculator and quoting app help you plan, price and deliver first fix work professionally. Join 1,000+ UK electricians. 7-day free trial."
    />
  );
}
