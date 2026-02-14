import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Wrench,
  Cable,
  Home,
  ShieldCheck,
  AlertTriangle,
  HardHat,
  Ruler,
  FileCheck2,
  ClipboardCheck,
  Calculator,
  BookOpen,
  CircuitBoard,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/installation' },
  { label: 'First Fix', href: '/guides/first-fix-electrical' },
];

const tocItems = [
  { id: 'what-is-first-fix', label: 'What Is First Fix?' },
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
  'First fix electrical covers all cabling, containment, back boxes, and infrastructure installed before plastering — getting it wrong means chasing out finished walls later.',
  'Cable routes must comply with BS 7671 safe zones (Regulation 522.6.202) to prevent future damage from nails, screws, and fixings driven into walls by other trades or occupants.',
  'Coordination with plumbers, plasterers, and carpenters is essential — agree back box positions, chase depths, and board access points before anyone starts work.',
  'Part P notification is required for new circuits in dwellings, new consumer units, and work in special locations (bathrooms, kitchens with new circuits, swimming pools, saunas).',
  "Elec-Mate's AI circuit designer helps plan the full first fix layout — circuit allocation, cable routes, and containment — before you pick up a drill.",
];

const faqs = [
  {
    question: 'What exactly is included in first fix electrical?',
    answer:
      'First fix electrical covers everything that is installed before the walls are plastered and the floors are laid. This includes running cables from the consumer unit position to each accessory position, installing back boxes (metal or dry-lining boxes) at the correct height for switches, sockets, and fused spurs, fitting cable containment (trunking, conduit, or cable tray) where required, installing ceiling roses or downlight housings, running cables for smoke and heat detectors, pulling cables for data and TV points, and installing temporary supplies for the build if needed. First fix does not include fitting the accessories themselves (faceplates, switches, sockets) — that is second fix. The cables are left coiled at each accessory position, ready for the plasterer to work around them and the electrician to return for second fix.',
  },
  {
    question: 'What are the BS 7671 safe zones for cable routes?',
    answer:
      'BS 7671 Regulation 522.6.202 defines prescribed zones (safe zones) where cables can be installed in walls to minimise the risk of damage from nails, screws, and fixings. Cables must be run horizontally or vertically from an accessory position (socket, switch, or other fixed electrical equipment). Horizontal runs must be within 150mm of the ceiling or floor. Vertical runs must be directly above or below the accessory, within 150mm of the corner of the wall, or within a defined zone around door and window frames. Cables outside safe zones must either be protected by an RCD with a rated residual current not exceeding 30mA, enclosed in earthed metallic containment, or buried at a depth of at least 50mm from the finished wall surface. In practice, staying within safe zones is the simplest approach and avoids reliance on RCD protection for mechanical protection.',
  },
  {
    question: 'How deep should cable chases be in walls?',
    answer:
      'BS 7671 does not specify a maximum chase depth in the Wiring Regulations themselves — chase depth limits come from the Building Regulations Approved Document A (Structure). For standard blockwork and brick walls, horizontal chases should be no deeper than one-third of the wall thickness and vertical chases no deeper than one-third of the wall thickness. For 100mm blockwork, this means a maximum chase depth of approximately 33mm. Chases should not be positioned back-to-back on opposite sides of a wall. For stud partition walls, cables are typically run through drilled holes in the timber studs or noggings, and chase depths are not applicable — but cables must be kept clear of the screw line where plasterboard will be fixed. Cable clips or grommets should be used where cables pass through studs to prevent abrasion.',
  },
  {
    question: 'Do I need to notify Building Control before starting first fix?',
    answer:
      'Under Part P of the Building Regulations (England and Wales), certain electrical work in dwellings must be notified to the local Building Control body before work starts. Notifiable work includes the installation of a new circuit, the installation of a new consumer unit, and any electrical work in a special location such as a bathroom, a room containing a shower, a swimming pool, or a sauna. If you are registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or similar), you can self-certify the work and notify Building Control through the scheme. If you are not registered with a competent person scheme, you must notify Building Control before starting the work, and they will arrange inspection at appropriate stages. For a full rewire or new build, this typically means a Building Control inspection at first fix stage (before plastering) and at completion.',
  },
  {
    question: 'What cables should I use for first fix in a new build?',
    answer:
      'For domestic first fix in a new build, the standard cable types are Twin and Earth (T+E) flat profile cable to BS 7671 and BS 6004. Common sizes are 1.0mm2 for lighting circuits, 2.5mm2 for socket ring circuits and radial socket circuits up to 20A, 4.0mm2 for dedicated cooker circuits, immersion heater circuits, or radial circuits up to 32A, 6.0mm2 for larger cooker circuits or electric shower circuits up to 40A, and 10.0mm2 for higher-rated shower or cooker circuits. For fire alarm cables, use fire-resistant cable (e.g., FP200 Gold or equivalent) to BS 5839. For data and telecommunications, Cat6 UTP cable is standard for future-proofing. All cables should be BASEC or equivalent approved. Cable colours follow BS 7671: brown (L), blue (N), green/yellow (E) for single phase T+E cable. Use cable markers or sleeving where cores are used for switching (e.g., the blue core of a switch drop must be sleeved brown to indicate it is a switched live).',
  },
  {
    question: 'How do I coordinate first fix electrical with the plumber?',
    answer:
      'Coordination with the plumber is critical to avoid clashes. Before first fix starts, agree the following: positions of boiler, cylinder, and any mechanical ventilation units (these need electrical supplies and switching), routes for heating pipes (to avoid running cables directly above or below heating pipes, which can affect cable current-carrying capacity), positions of bathroom and kitchen accessories (to ensure electrical back boxes do not clash with pipe runs in the wall), position of the consumer unit (ensure it is not directly above a boiler or water cylinder, and that there is adequate clearance for working on the board). On new build sites, the electrical and plumbing first fix often happen simultaneously, so daily coordination is essential. A clash discovered after plastering is expensive to fix — it means chasing out finished walls, which damages the plaster, wastes time, and creates friction with the builder.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/second-fix-electrical',
    title: 'Second Fix Electrical',
    description:
      'The companion guide to first fix — covering accessory fitting, consumer unit wiring, testing, and EIC certification.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/tools/ai-circuit-designer',
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
    href: '/guides/part-p-building-regulations',
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
          cables, containment, back boxes, and mounting points that will be concealed behind the
          finished surfaces. Everything installed at first fix must be correct before it is covered
          up, because accessing it afterwards means damaging the finished building.
        </p>
        <p>
          On a typical domestic new build or full rewire, first fix accounts for roughly 60-70% of
          the total installation time. It involves running all cables from the{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations">
            consumer unit position
          </SEOInternalLink>{' '}
          to every switch, socket, light, and fixed appliance position in the property. It also
          includes installing containment (conduit, trunking, or cable tray), fitting back boxes
          into walls, and pulling cables for smoke detectors, data points, and any specialist
          systems.
        </p>
        <p>
          The quality of first fix directly determines the quality of the finished installation.
          Cables routed outside{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> safe
          zones risk damage from future fixings. Back boxes fitted at the wrong height or in the
          wrong position mean awkward accessory placements that the customer will notice.
          Containment that is too small for the number of cables creates overheating risks and makes
          pulling cables difficult.
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
          that minimises the risk of damage during and after construction, complies with BS 7671
          safe zone requirements, and allows the cable to carry its design current without
          overheating.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-3">BS 7671 Safe Zones (Regulation 522.6.202)</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Horizontal runs</strong> — within 150mm of the top of the wall (ceiling
                line) or within 150mm of the bottom of the wall (floor line).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vertical runs</strong> — directly above or below an accessory position
                (switch, socket, spur, etc.), or within 150mm of a wall corner.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Door and window frames</strong> — within 150mm of the edge of the frame.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outside safe zones</strong> — cables must be protected by 30mA RCD, enclosed
                in earthed metallic containment, or buried at 50mm depth minimum.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, planning cable routes before starting drilling and chasing saves significant
          time. Mark out accessory positions on the walls, plan the cable runs from each position
          back to the consumer unit, and identify any crossings or shared routes where containment
          will be needed.
        </p>
        <p>
          For timber-framed properties, cables are typically run through drilled holes in joists and
          studs rather than chased into masonry. Holes in joists must be positioned in the centre
          third of the joist depth, drilled on the neutral axis, and spaced at least three diameters
          apart. Notches are generally avoided in modern construction — drilled holes are stronger.
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
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Metal back boxes (for masonry walls)</strong> — 25mm or 35mm deep for
                standard switches and sockets, 47mm deep for dimmer switches and some smart switches
                that have deeper mechanisms. Use galvanised steel boxes with earth terminals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dry-lining boxes (for plasterboard walls)</strong> — cavity-fixing boxes
                that grip the plasterboard when tightened. Available in single, double, and triple
                gang sizes. Ensure the box depth does not exceed the plasterboard-to-stud gap.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard heights</strong> — sockets at 450mm from finished floor level
                (centre of box), switches at 1200mm from finished floor level (centre of box). These
                are not regulatory requirements but industry standard and Building Regulations
                Approved Document M recommendations for accessibility.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cooker switch position</strong> — within 2m of the cooker but not directly
                above it (to avoid reaching over hot surfaces). Typically fitted at 1350mm from
                finished floor level.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Allow sufficient cable at each back box position for the second fix electrician to work
          comfortably. Leave at least 200mm of cable protruding from each box. This gives enough
          length to strip, terminate, and push back into the box without straining the connections.
        </p>
      </>
    ),
  },
  {
    id: 'containment-systems',
    heading: 'Containment Systems: Conduit, Trunking, and Cable Tray',
    content: (
      <>
        <p>
          Containment protects cables from mechanical damage, simplifies cable management, and
          provides a professional finish in exposed or surface-mounted installations. The choice of
          containment depends on the installation environment, the number of cables, and whether the
          containment will be concealed or visible.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">PVC Conduit</h3>
            <p className="text-white text-sm leading-relaxed">
              Round PVC conduit (20mm or 25mm) is used for concealed runs in masonry walls and
              floors. Cables are pulled through after the conduit is fixed. Maximum fill rate is 40%
              of the internal cross-sectional area (BS 7671 Regulation 522.8.1). PVC conduit is not
              suitable for high-temperature environments or where mechanical impact resistance is
              needed — use steel conduit instead.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Steel Conduit</h3>
            <p className="text-white text-sm leading-relaxed">
              Galvanised steel conduit provides mechanical protection and can serve as a CPC
              (circuit protective conductor) if properly installed with bush, coupler, and earth
              continuity. Used in commercial and industrial environments where PVC would not provide
              adequate protection. Steel conduit must be earthed throughout its length.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">PVC Trunking</h3>
            <p className="text-white text-sm leading-relaxed">
              Mini-trunking and dado trunking are used for surface-mounted cable management,
              commonly in commercial offices and retail premises. Available in various sizes from
              16x16mm to 100x50mm and larger. Use Elec-Mate's{' '}
              <SEOInternalLink href="/guides/trunking-fill-calculator">
                trunking fill calculator
              </SEOInternalLink>{' '}
              to check the cable count does not exceed the 45% fill rate.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Cable Tray and Basket</h3>
            <p className="text-white text-sm leading-relaxed">
              Cable tray (perforated or ladder type) and cable basket are used in commercial and
              industrial installations for running large numbers of cables over long distances.
              Cables are laid on top of the tray rather than enclosed. Cable tray provides good
              ventilation, which reduces derating for grouping.
            </p>
          </div>
        </div>
        <p>
          When calculating containment fill rates, use Elec-Mate's{' '}
          <SEOInternalLink href="/guides/conduit-fill-calculator">
            conduit fill calculator
          </SEOInternalLink>{' '}
          to verify the cables fit within the maximum permitted fill percentage. Overfilled
          containment makes cable pulling difficult, can damage cable insulation, and reduces
          current-carrying capacity due to inadequate heat dissipation.
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
          First fix electrical rarely happens in isolation. On any building project — whether a new
          build, extension, or rewire — the electrician must coordinate with plumbers, plasterers,
          carpenters, and the main contractor. Poor coordination is one of the most common causes of
          delays and rework.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plumber</strong> — agree positions for boiler supply, cylinder immersion,
                unvented cylinder controls, underfloor heating manifold, and any mechanical
                ventilation. Avoid running cables directly above or below hot water pipes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plasterer</strong> — all first fix must be complete and signed off before
                plastering starts. Back boxes should be flush with the finished plaster surface (not
                recessed behind it, and not protruding). Agree the plaster thickness and set back
                boxes accordingly — typically 12-15mm for one-coat plaster.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Carpenter</strong> — coordinate stud positions for dry-lining boxes, agree
                joist drilling positions for cable runs, and confirm kitchen unit layout for worktop
                socket and switch positions. Cables run through joists must be in the centre third
                of the joist depth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main contractor</strong> — agree the programme, access arrangements, and any
                temporary supplies needed for the build. First fix typically follows structural work
                and precedes plastering in the build sequence.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use Elec-Mate's <SEOInternalLink href="/tools/quoting-app">quoting app</SEOInternalLink>{' '}
          to produce a clear first fix specification and quote that details every accessory
          position, circuit allocation, and containment requirement. Sharing this with the builder
          and other trades at the start of the project prevents misunderstandings and keeps the
          programme on track.
        </p>
        <SEOAppBridge
          title="Plan and price first fix jobs accurately"
          description="Elec-Mate's quoting app lets you build a detailed first fix specification with material lists, labour estimates, and professional quotes. Send the quote to the builder before you start — no surprises, no underpricing."
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
          work notifiable. This means the work must either be carried out by a registered competent
          person (who can self-certify) or notified to Building Control before it starts.
        </p>
        <p>
          First fix work that is notifiable under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Installation of a new circuit — any new circuit added to an existing or new consumer
                unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Consumer unit replacement or relocation — including the installation of a new
                consumer unit in a new build.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Any electrical work in a special location — bathrooms, rooms containing a shower,
                swimming pools, saunas, and hot tub enclosures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                A full rewire or new build electrical installation — the entire installation is
                notifiable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are registered with NICEIC, NAPIT, ELECSA, or another competent person scheme, you
          can self-certify the work. You complete the installation, carry out initial verification
          testing, issue the{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>
          , and notify Building Control through your scheme. The scheme issues a Building
          Regulations Compliance Certificate to the customer.
        </p>
        <p>
          If you are not registered with a competent person scheme, you must notify Building Control
          before starting the work. They will inspect at first fix stage (before plastering) and at
          completion. Building Control charges a fee for this inspection — the amount varies by
          local authority.
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
          time a mistake is discovered, it often requires opening up walls or ceilings to fix. These
          are the most common first fix errors:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cables outside safe zones without protection</strong> — running cables
                diagonally across walls or at random heights without RCD protection or earthed
                metallic containment. This is a direct breach of BS 7671 Regulation 522.6.202.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not leaving enough cable at back box positions</strong> — leaving only
                50-100mm of cable makes second fix termination difficult and increases the risk of
                poor connections. Leave at least 200mm.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wrong back box depth</strong> — fitting a 25mm back box for a dimmer switch
                that needs 35mm or 47mm. The switch mechanism will not fit, requiring the box to be
                replaced after plastering.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Forgetting smoke detector cables</strong> — Building Regulations require
                interlinked smoke and heat detectors. The interconnect cable must be run at first
                fix. Adding it after plastering means surface-mounted cable or chasing out walls.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not photographing cable routes</strong> — take photos of every cable run
                before plastering. This provides a record for future reference and can be attached
                to the EIC as supporting evidence.
              </span>
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
          Before signing off first fix and allowing plastering to proceed, work through this
          checklist to ensure nothing has been missed:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                All cables are run to every accessory position — sockets, switches, lights, spurs,
                cooker, shower, smoke detectors, data points, EV charger, outdoor lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                All cables follow safe zone routes (vertical/horizontal from accessories, within
                150mm of corners, ceiling, or floor).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                All back boxes are fitted at the correct height and depth, with at least 200mm of
                cable protruding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Containment is installed where required, with cable fill within maximum limits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Cables are labelled or identified at both ends (at the accessory position and at the
                consumer unit position). This saves hours at second fix.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Photos taken of all concealed cable routes before plastering.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Consumer unit position marked and cables dressed ready for second fix board
                installation.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Design the full installation before you start drilling"
          description="Elec-Mate's AI circuit designer creates a complete circuit schedule, cable sizing, and board layout from your job specification. Plan the first fix properly — avoid rework, reduce material waste, and finish faster."
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
      title="First Fix Electrical | What's Involved UK Guide"
      description="Complete guide to first fix electrical work in the UK. Cable routing, safe zones, back boxes, containment, coordination with other trades, and Part P notification requirements under BS 7671."
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Cable}
      heroTitle={
        <>
          First Fix Electrical:{' '}
          <span className="text-yellow-400">Getting the Hidden Infrastructure Right</span>
        </>
      }
      heroSubtitle="First fix is the foundation of every electrical installation. Cable routing, back boxes, containment, and coordination with other trades must be right before the plaster goes on — because mistakes discovered after plastering are expensive to fix. This guide covers everything you need to know."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About First Fix Electrical"
      relatedPages={relatedPages}
      ctaHeading="Plan First Fix Jobs Properly"
      ctaSubheading="Elec-Mate's AI circuit designer, cable sizing calculator, and quoting app help you plan, price, and deliver first fix work professionally. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
