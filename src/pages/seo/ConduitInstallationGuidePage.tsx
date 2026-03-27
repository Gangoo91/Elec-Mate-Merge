import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Wrench,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Zap,
  Flame,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation Guides', href: '/guides/cable-installation' },
  { label: 'Conduit Installation Guide', href: '/conduit-installation-guide' },
];

const tocItems = [
  { id: 'types-of-conduit', label: 'Types of Conduit' },
  { id: 'steel-conduit', label: 'Heavy Gauge Steel Conduit' },
  { id: 'pvc-conduit', label: 'PVC Conduit' },
  { id: 'bending', label: 'Bending Conduit' },
  { id: 'draw-wires', label: 'Draw Wires and Threading Cables' },
  { id: 'junction-boxes', label: 'Junction Boxes and Outlets' },
  { id: 'thread-cutting', label: 'Thread Cutting for Steel Conduit' },
  { id: 'expansion', label: 'Expansion Couplings for Long Runs' },
  { id: 'earthing-conduit', label: 'Earthing Steel Conduit' },
  { id: 'fire-stopping', label: 'Fire Stopping at Penetrations' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Steel conduit (heavy gauge to BS EN 61386-21) provides excellent mechanical protection for cables and can itself serve as the circuit protective conductor when continuously threaded and bonded, but must be correctly earthed at both ends.',
  'PVC conduit is lighter, cheaper, and easier to cut and join than steel, but cannot serve as a CPC and provides no earthing function. It is suitable for surface wiring in domestic and light commercial applications.',
  'The minimum bend radius for conduit is specified in BS EN 61386 — typically 2.5× the conduit internal diameter for machine-bent heavy gauge steel conduit. Under-radius bends crush the conduit and make cable drawing impossible.',
  'Expansion couplings (slip couplings) must be fitted in steel and PVC conduit runs at intervals where the run crosses a structural expansion joint, and in PVC conduit runs exceeding approximately 6m, to accommodate thermal movement.',
  'All penetrations through fire-rated walls, floors, and ceilings must be fire stopped with an approved intumescent system — conduit alone does not maintain fire compartmentation and can act as a chimney for flame and smoke.',
];

const faqs = [
  {
    question: 'What is the difference between heavy gauge and light gauge (BESA) steel conduit?',
    answer:
      'Heavy gauge steel conduit (also called Class 3 or heavy wall) is manufactured to BS EN 61386-21 and is the standard for fixed electrical installation work. It has substantial wall thickness that allows it to be threaded and bent without collapsing, and provides the mechanical protection and earth continuity properties required by BS 7671. Light gauge conduit (BESA conduit, named after the British Engineering Standards Association) has thinner walls and is primarily used for surface-mounted flexible conduit drops to light fittings and equipment — it is not suitable for fixed wiring runs where mechanical protection or earth continuity is required.',
  },
  {
    question: 'Can steel conduit be used as the circuit protective conductor?',
    answer:
      'Yes, provided the conduit system is continuous, all joints are mechanically sound and electrically continuous, and the conduit is bonded and earthed at the origin of the installation. Under BS 7671, the steel conduit may serve as the CPC for circuits installed within it, provided the earth fault loop impedance measured at the furthest point meets the requirements of BS 7671 Table 41.2 for the relevant protective device. In practice, many installers include a separate earth conductor within the conduit as additional assurance, particularly on longer runs where conduit earth impedance may be marginal.',
  },
  {
    question: 'What is the minimum bend radius for conduit?',
    answer:
      'The minimum internal radius of a conduit bend is specified in BS EN 61386. For heavy gauge steel conduit, the minimum internal bend radius is 2.5× the conduit internal diameter for machine-formed (bender-formed) bends. Hand-formed bends in flexible conduit may have tighter minimum radii depending on the conduit type. Under-radius bends crush or kink the conduit, reduce the internal bore, and make cable drawing extremely difficult or impossible. A good conduit bend should maintain the full internal bore throughout.',
  },
  {
    question: 'How many cables can I install in a conduit?',
    answer:
      'The number of cables that can be installed in a conduit is limited by the conduit fill ratio. BS 7671 Appendix 4 Table 4J1 specifies the space factor method for determining conduit fill. As a practical guide, the total cross-sectional area of cables (including insulation) should not exceed 40% of the conduit internal cross-sectional area. This ensures cables can be drawn in without damage and allows for future additions. Exceeding this ratio makes cable drawing very difficult and can cause cable sheath damage.',
  },
  {
    question: 'Why does PVC conduit need expansion couplings?',
    answer:
      'PVC has a relatively high coefficient of thermal expansion — approximately 0.06mm per metre per degree Celsius. On a 10m PVC conduit run between fixed boxes, a temperature change of 30°C will cause the conduit to expand or contract by approximately 18mm. Without expansion couplings (slip couplings), this thermal movement can cause the conduit to buckle, pull out of boxes at joints, or crack fittings. Expansion couplings allow the conduit to slide axially while remaining watertight. They should be fitted at intervals of approximately 6m on straight runs and at every change of temperature zone.',
  },
  {
    question: 'Do I need to earth PVC conduit?',
    answer:
      'No. PVC conduit is non-conductive and cannot carry an earth path. PVC conduit does not need to be earthed and cannot serve as a circuit protective conductor. Cables installed in PVC conduit must each have their own CPC (the earth core within the cable) as required by BS 7671. PVC conduit boxes and accessories are also non-conductive — metal earthing is not required at these points. This is one of the practical advantages of PVC conduit over steel, as the earthing requirement is simplified.',
  },
  {
    question: 'What is the correct way to fire stop conduit penetrations?',
    answer:
      'When conduit passes through a fire-rated wall, floor, or ceiling, the annular gap between the conduit and the structure must be sealed with an approved intumescent fire stopping system. The conduit itself does not provide fire separation — the empty bore acts as a path for flame and smoke. Approved systems include intumescent putty, fire-rated mastics, and collar devices that expand in heat to crush and seal the conduit bore. The installed system must be documented on a fire stopping schedule. Fire stopping must be installed in accordance with the manufacturer\'s instructions and by a competent person.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/cable-tray-installation',
    title: 'Cable Tray Installation',
    description: 'Perforated, solid bottom, and ladder tray — commercial cable management guide.',
    icon: Layers,
    category: 'Guide',
  },
  {
    href: '/cable-basket-installation',
    title: 'Wire Cable Basket Installation',
    description: 'Wiremesh cable basket — advantages, support requirements, and data centre use.',
    icon: Layers,
    category: 'Guide',
  },
  {
    href: '/armoured-cable-installation',
    title: 'Armoured Cable (SWA) Installation',
    description: 'Steel Wire Armoured cable — types, burial depths, glands, and current ratings.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/fp200-gold-cable-guide',
    title: 'FP200 Gold Cable Guide',
    description: 'Fire-resistant cable for fire alarm and emergency lighting — BS 7629-1 guide.',
    icon: Flame,
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
    id: 'types-of-conduit',
    heading: 'Types of Conduit Used in UK Electrical Installations',
    content: (
      <>
        <p>
          Conduit is a hollow tube used to enclose and protect electrical cables. It provides
          mechanical protection, allows cables to be drawn in and out without disturbing the
          building fabric, and — in the case of steel conduit — provides an earth path for the
          cables within. Conduit is used in domestic, commercial, and industrial installations
          across the UK.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heavy gauge steel conduit (Class 3)</strong> — the standard for
                commercial and industrial fixed wiring. Manufactured to BS EN 61386-21.
                Threaded at joints and into boxes. Can be bent with a conduit bender to
                form sets, right-angle bends, and offsets. Can serve as the CPC when
                correctly earthed. Standard sizes: 16mm, 20mm, 25mm, 32mm, 50mm OD.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Light gauge steel conduit (BESA)</strong> — thinner wall, lighter
                weight. Used for flexible conduit drops to luminaires and equipment rather
                than fixed wiring runs. Not suitable for threading and not recommended for
                use as a CPC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PVC conduit (round and oval)</strong> — lightweight, non-conductive,
                corrosion-resistant. Easier to cut and join than steel. Cannot serve as a
                CPC. Used extensively in domestic surface wiring and commercial skirting
                and trunking installations. Oval conduit is used for chasing into plaster
                in domestic first fix.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flexible conduit</strong> — steel wire armoured flexible tube used
                for final connections to motors, luminaires, and equipment where vibration
                or movement is present. Must be used with appropriate end fittings for
                mechanical and earth continuity.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All conduit installations must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          and BS EN 61386 (conduit systems for cable management).
        </p>
      </>
    ),
  },
  {
    id: 'steel-conduit',
    heading: 'Heavy Gauge Steel Conduit — Properties and Uses',
    content: (
      <>
        <p>
          Heavy gauge steel conduit is the workhorse of commercial and industrial electrical
          wiring. Its combination of mechanical protection, earthing capability, and long service
          life makes it the standard specification for industrial premises, schools, hospitals,
          and commercial buildings where durability is paramount.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mechanical protection</strong> — steel conduit provides the highest
                level of mechanical protection for cables, suitable for areas subject to
                impact, vandalism, or accidental damage. It is the preferred system in
                factories, warehouses, and exposed industrial areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing function</strong> — a correctly installed and continuously
                threaded steel conduit system can serve as the circuit protective conductor
                (CPC/earth) for circuits within, per BS 7671 Regulation 543. All joints must
                be electrically continuous.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Finishes</strong> — bright (uncoated, for internal dry use), black
                enamel (additional corrosion protection), and hot-dip galvanised (for
                outdoor, damp, or humid environments). Stainless steel conduit is available
                for highly corrosive environments.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pvc-conduit',
    heading: 'PVC Conduit — Round and Oval Types',
    content: (
      <>
        <p>
          PVC conduit is widely used in domestic and light commercial electrical installations
          in the UK. It is cheaper, lighter, and easier to work with than steel conduit, but
          does not provide earthing capability and has lower mechanical strength.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Round PVC conduit</strong> — standard surface-mounted conduit for
                domestic and commercial skirting wiring, garage wiring, and utility rooms.
                Solvent-welded fittings for permanent joints. Standard sizes: 16mm, 20mm,
                25mm, 32mm OD.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Oval PVC conduit</strong> — used for chasing into plaster in domestic
                first fix wiring. The oval profile is lower profile in a plaster chase than
                round conduit and is easier to cover with plaster. Available in 16mm × 4mm
                and 25mm × 16mm nominal sizes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Expansion couplings required</strong> — in PVC conduit runs exceeding
                approximately 6m, expansion (slip) couplings must be fitted to accommodate
                thermal movement. Failing to include expansion couplings will result in
                buckling, cracking, or pull-out at box connections.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bending',
    heading: 'Bending Conduit — Radius Requirements and Technique',
    content: (
      <>
        <p>
          Conduit bending is a fundamental skill for any electrician working with steel conduit
          systems. A good bend maintains the full internal bore of the conduit, allowing cables
          to be drawn through easily after installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum bend radius</strong> — for heavy gauge steel conduit, the
                minimum internal radius is 2.5× the conduit internal diameter (approximately
                4× the external diameter). For 20mm OD conduit this gives a minimum internal
                radius of approximately 40mm. Tighter bends crush the conduit and make
                cable drawing impossible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conduit bender types</strong> — hand-operated benders (hickey benders)
                for 16mm and 20mm conduit; hydraulic or ratchet benders for 25mm and above.
                Always use a bender shoe matched to the conduit size — an undersized shoe
                will kink the conduit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right-angle bends</strong> — a 90° bend with a smooth radius. Mark
                the starting point of the bend on the conduit, insert into the bender at the
                mark, and apply steady pressure until the conduit reaches 90°. Verify with
                a set square. Overbent conduit can be gently straightened but will have
                internal deformation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sets and offsets</strong> — used to move the conduit run out of plane
                to clear obstacles. A set is two bends in opposite directions. An offset is
                a set where the conduit returns to parallel with the original run. Accurate
                measurement and marking is essential for neat sets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PVC conduit bending</strong> — PVC conduit can be bent using a spring
                bender (inserted inside the conduit) or a hot-air gun. Spring benders prevent
                the PVC from kinking during bending. Heat bending allows gentle curves but
                requires practice to avoid flattening the conduit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'draw-wires',
    heading: 'Draw Wires and Threading Cables Through Conduit',
    content: (
      <>
        <p>
          Draw wires (also called fish wires or pulling lines) are essential for threading
          cables through conduit runs, particularly in embedded or inaccessible conduit
          where the cable cannot be pushed through from one end.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Leave a draw wire</strong> — always leave a draw wire in the conduit
                during installation, even if cables are being installed immediately. The draw
                wire allows future cables to be pulled in without difficulty, particularly in
                long or bent runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Draw wire materials</strong> — galvanised steel draw wire (traditional),
                nylon draw tape (lighter and less likely to kink), and glass-fibre draw rods
                (for pushing through conduit when a draw wire is not present). Fish tapes are
                flexible flat steel strips wound on a reel for reaching through long runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable lubricant</strong> — apply cable pulling lubricant (pulling
                compound) to cables before drawing through long runs. This reduces friction
                significantly and prevents cable sheath damage on bends. Do not use grease,
                oil, or washing-up liquid — these can degrade cable insulation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'junction-boxes',
    heading: 'Junction Boxes and Conduit Outlet Boxes',
    content: (
      <>
        <p>
          Junction boxes (inspection elbows, tees, and boxes) are an essential part of a conduit
          system, providing access for drawing cables and housing connections.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection boxes</strong> — steel conduit boxes with removable covers
                allow access to the conduit run for cable drawing. BS 7671 requires that all
                joints and connections be accessible for inspection and maintenance. Inspection
                boxes should be positioned at bends and at regular intervals on long straight
                runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum run between draw boxes</strong> — in practice, the maximum
                run between access points should not exceed approximately 10m on straight
                runs, reducing to 5m on runs with multiple bends. Longer uninterrupted runs
                make cable drawing extremely difficult.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Steel vs plastic boxes</strong> — steel (BESA) back boxes for steel
                conduit runs; plastic back boxes for PVC conduit. The box depth must
                accommodate the conductors and any connections made within. Select box depth
                for the number and size of conductors.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'thread-cutting',
    heading: 'Thread Cutting for Steel Conduit',
    content: (
      <>
        <p>
          Steel conduit is joined at conduit boxes, couplers, and locknuts using threaded
          connections. Thread cutting is a necessary skill for steel conduit installation
          work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Die stock and dies</strong> — steel conduit threads are cut with a
                die stock holding the correct size die (16mm, 20mm, 25mm, 32mm). The die
                is run onto the cleaned and de-burred conduit end using cutting oil to
                lubricate and carry away swarf.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thread length</strong> — cut a minimum of 5 full thread turns for
                engagement in a standard coupler or box entry. Cut more for junction boxes
                with locknuts — the thread must engage fully with both the box entry and
                the locknut.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth continuity at threads</strong> — for steel conduit to serve
                as the CPC, threaded connections must be mechanically tight and electrically
                continuous. Loose or corroded threads create high-resistance earth paths.
                Check earth continuity throughout the completed installation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'expansion',
    heading: 'Expansion Couplings for Long Conduit Runs',
    content: (
      <>
        <p>
          Thermal expansion and contraction of conduit runs must be accommodated to prevent
          buckling, box pull-out, and mechanical damage.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PVC conduit</strong> — expansion (slip) couplings required at
                approximately every 6m on straight runs and wherever the conduit crosses
                a temperature change zone. PVC has a high coefficient of thermal expansion
                and will buckle without adequate expansion provisions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Steel conduit</strong> — expansion couplings are required wherever
                conduit crosses a structural expansion joint in a building, or in long exposed
                runs subject to large temperature variations (e.g., external conduit between
                buildings). In indoor commercial installations, steel conduit runs rarely
                require expansion couplings due to the low coefficient of expansion and
                controlled internal environment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth bond across expansion coupling</strong> — where an expansion
                coupling is fitted in a steel conduit run used as a CPC, a separate earth
                bond conductor must be fitted across the expansion coupling to maintain earth
                continuity. The expansion coupling itself does not maintain a reliable earth
                path as it is designed to slide.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earthing-conduit',
    heading: 'Earthing Steel Conduit',
    content: (
      <>
        <p>
          Steel conduit must be earthed as a system. Where it serves as the CPC, its earth
          impedance must be verified to meet BS 7671 requirements for the protective device
          installed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>System earth connection</strong> — the conduit system must be
                connected to the main earthing terminal at the origin of the installation.
                The connection point must be mechanically secure and electrically continuous.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth continuity testing</strong> — after completion, measure earth
                continuity from the furthest conduit box back to the MET using a low-resistance
                ohmmeter. The resistance must be low enough that the earth fault loop impedance
                at the furthest point meets BS 7671 Table 41.2 for the protective device.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common failure points</strong> — loose threaded connections, corroded
                joints, painted or coated conduit surfaces at connections, and locknuts not
                fully tightened. Insulating washers accidentally fitted at box entries will
                break the earth path.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fire-stopping',
    heading: 'Fire Stopping at Conduit Penetrations',
    content: (
      <>
        <p>
          Any penetration through a fire-rated structure by conduit — or by cables within
          conduit — must be fire stopped to maintain the fire compartmentation of the building.
          This is a Building Regulations requirement and a matter of life safety.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conduit alone is not fire stopping</strong> — steel and PVC conduit
                both have hollow bores that allow flame and combustion gases to pass through
                a fire-rated structure. The conduit must be sealed with an approved fire
                stopping product.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved products</strong> — intumescent putty, fire-rated mastic,
                intumescent collar devices (for PVC conduit — the collar expands in heat
                to crush and seal the conduit), and proprietary fire stop block systems. Each
                product must be installed per the manufacturer's instructions and data sheet.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation</strong> — fire stopping must be recorded on a
                fire stopping schedule, giving the location, product used, installer, and
                date of installation. This documentation forms part of the building's fire
                safety file under the Building Regulations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Certifying Conduit Installations',
    content: (
      <>
        <p>
          Conduit installations must be certified with the appropriate Electrical Installation
          Certificate, including earth continuity verification for steel conduit systems used
          as CPCs, and earth fault loop impedance measurements at the furthest points of the
          installation.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certify Conduit Installations on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to complete and issue Electrical Installation Certificates for conduit
                  wiring installations. Record earth continuity, insulation resistance,
                  and earth fault loop impedance results on site — instant PDF export.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete conduit installation certificates on your phone"
          description="Elec-Mate's EIC and EICR apps help you certify commercial conduit wiring installations on site. Record earth continuity, loop impedance, and test results — instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConduitInstallationGuidePage() {
  return (
    <GuideTemplate
      title="Conduit Installation Guide UK | Steel & Plastic Conduit Wiring"
      description="Complete UK guide to conduit installation. Heavy gauge steel vs PVC conduit, oval vs round, bending (radius requirements), draw wires, junction boxes, thread cutting, expansion couplings for long runs, earthing steel conduit, and fire stopping at penetrations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Conduit Installation Guide UK:{' '}
          <span className="text-yellow-400">Steel and Plastic Conduit Wiring</span>
        </>
      }
      heroSubtitle="The complete guide to conduit installation — heavy gauge steel, light gauge, and PVC conduit; bending; draw wires; thread cutting; expansion couplings; earthing steel conduit as a CPC; and fire stopping at penetrations."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Conduit Installation"
      relatedPages={relatedPages}
      ctaHeading="Complete Conduit Installation Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to certify wiring installations on site. Record earth continuity, loop impedance, and test results — instant PDF export. 7-day free trial."
    />
  );
}
