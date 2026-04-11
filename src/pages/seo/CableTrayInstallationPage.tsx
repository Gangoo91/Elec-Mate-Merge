import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Layers,
  ShieldCheck,
  AlertTriangle,
  Wrench,
  Zap,
  Building2,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation Guides', href: '/guides/cable-installation' },
  { label: 'Cable Tray Installation', href: '/cable-tray-installation' },
];

const tocItems = [
  { id: 'what-is-cable-tray', label: 'What is Cable Tray?' },
  { id: 'types', label: 'Types of Cable Tray' },
  { id: 'materials', label: 'Materials and Finishes' },
  { id: 'support-spacing', label: 'Support Spacing' },
  { id: 'earthing', label: 'Earthing Cable Tray' },
  { id: 'fill-ratio', label: 'Fill Ratio and Cable Loading' },
  { id: 'ordering-and-cutting', label: 'Ordering and Cutting' },
  { id: 'commercial-installation', label: 'Typical Commercial Installation' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Cable tray is an open-top metal or plastic channel used to support and route multiple cables in commercial and industrial installations — it reduces installation time significantly compared to threading cables individually through conduit.',
  'Hot-dip galvanised steel cable tray is the standard specification for most commercial installations. Stainless steel is used in food production, pharmaceutical, and marine environments where corrosion resistance is critical.',
  'Support spacing for cable tray is typically 1500mm for straight runs of standard perforated tray, reducing to 900mm at bends and tee-pieces. Heavy cables or widely spaced supports can cause permanent deflection.',
  'Cable tray must be earthed as a system by bonding sections together with earth bonds and connecting the system to the main earthing terminal. The tray must not be relied upon as the sole circuit protective conductor for cables installed within it.',
  'The fill ratio for cable tray should not exceed approximately 40% of the tray cross-sectional area to allow heat dissipation and future cable additions, and to maintain cable current ratings.',
];

const faqs = [
  {
    question: 'What is the difference between perforated and solid bottom cable tray?',
    answer:
      'Perforated cable tray has punched holes in the base and sides, which allows air circulation around cables (important for current rating), reduces the weight of the tray itself, and makes it easier to tie cables with cable ties through the perforations. Solid bottom (return flange) tray has a solid base without perforations. It is used where the cables need additional mechanical protection from below, where cables are being routed in an area with falling debris, or where the installation is exposed to the elements and perforated tray would allow water, dust, or pests to contact the cables. Perforated tray is the most common choice for indoor commercial installations.',
  },
  {
    question: 'How do I earth cable tray?',
    answer:
      'Cable tray must be bonded and earthed as a system. Individual tray sections are joined with earth bonds (short lengths of green/yellow conductor or braided earth straps) clamped to the tray at each joint. This ensures earth continuity along the length of the run even if the physical joint between sections has a high resistance due to paint or corrosion. The tray system must be connected to the main earthing terminal (MET) of the installation with a suitably sized earth conductor. The cross-section of the earth conductor is determined by the prospective fault current and disconnection time — follow BS 7671 Regulation 543 for sizing.',
  },
  {
    question: 'Can I use cable tray as a circuit protective conductor?',
    answer:
      'No. Cable tray should not be relied upon as the sole circuit protective conductor (CPC/earth) for cables installed within it. The tray does not provide a reliable low-impedance earth path for fault protection — connections between tray sections can be high resistance, and the tray itself can be removed without isolating associated circuits. Each cable must have its own CPC as required by BS 7671. The tray earthing system is for extraneous conductive parts bonding, not for circuit earth protection.',
  },
  {
    question: 'What support spacing is required for cable tray?',
    answer:
      "Support spacing depends on the tray type, size, loading, and the span between supports. For standard medium-duty perforated cable tray (up to 100mm wide) in typical commercial installations, supports at 1500mm centres on straight horizontal runs are common. Heavier trays (150mm–600mm wide) may require closer support spacing due to the increased self-weight and cable loading. At bends, tees, and reducers, additional supports close to the fitting are required. Always check the tray manufacturer's load/span tables for the specific product — different manufacturers have different load ratings for the same nominal tray width.",
  },
  {
    question: 'What is the maximum fill for cable tray?',
    answer:
      'A fill ratio of approximately 40% of the tray cross-sectional area is the generally accepted maximum for new installations. This ensures adequate heat dissipation from the cables (maintaining their current ratings), allows space for cable ties and routing, and provides some capacity for future cable additions. Exceeding 40% fill does not create an immediate safety hazard, but it reduces cable current ratings due to heat build-up (BS 7671 Appendix 4 grouping factors apply) and makes future maintenance and additions significantly more difficult.',
  },
  {
    question: 'Does cable tray need fire stopping where it passes through walls?',
    answer:
      "Yes. Where cable tray — and the cables installed on it — passes through a fire-rated wall, floor, or ceiling, the penetration must be fire stopped with an approved intumescent system. The fire stop must seal around both the tray and all cables to maintain the fire compartmentation of the building. Approved fire stopping systems must be installed by a competent person following the manufacturer's instructions, and the installed system must be recorded on a fire stopping schedule as part of the building's fire safety documentation.",
  },
  {
    question: 'What width cable tray do I need?',
    answer:
      'Cable tray width is determined by the number and diameter of cables to be installed, the fill ratio limit, and any future expansion allowance. Standard widths are 50mm, 75mm, 100mm, 150mm, 225mm, 300mm, 450mm, and 600mm. As a practical guide, lay out the cables that will be installed in a single layer and measure the total width, then add at least 20% for cable ties and future additions. For mixed cable sizes, allow a single layer where possible — cables stacked on top of each other create heat management problems and make maintenance very difficult.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/cable-basket-installation',
    title: 'Wire Cable Basket Installation',
    description:
      'Wiremesh cable basket (Cablofil type) — advantages, support, and data centre use.',
    icon: Layers,
    category: 'Guide',
  },
  {
    href: '/conduit-installation-guide',
    title: 'Conduit Installation Guide',
    description: 'Steel and PVC conduit — bending, threading, fire stopping, and earthing.',
    icon: Wrench,
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
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: Building2,
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
    id: 'what-is-cable-tray',
    heading: 'What is Cable Tray?',
    content: (
      <>
        <p>
          Cable tray is an open-top channel or ladder-shaped support system used in commercial and
          industrial electrical installations to route and support multiple cables. It provides a
          rigid, accessible, and cost-effective alternative to threading cables through conduit
          where large numbers of cables run along a common route.
        </p>
        <p>
          Cable tray is found in virtually every commercial and industrial building in the UK — from
          office blocks and retail units to hospitals, data centres, and manufacturing facilities.
          Electricians installing commercial systems will encounter cable tray regularly, and the
          ability to plan, order, and install it efficiently is a core commercial skill.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Speed</strong> — cables can be laid in tray quickly without threading
                through conduit. Multiple cables can be installed simultaneously. This makes tray
                significantly faster to install on large commercial projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accessibility</strong> — cables in open tray can be inspected, added to, and
                removed without disturbing the tray structure. This is a significant advantage over
                enclosed conduit for installations that change over time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat dissipation</strong> — perforated tray allows air circulation around
                cables, maintaining their current-carrying capacity better than enclosed conduit
                systems.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Cable tray installation must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          and the relevant sections of the IET Wiring Regulations covering cable support, grouping
          factors, and protection against mechanical damage.
        </p>
      </>
    ),
  },
  {
    id: 'types',
    heading: 'Types of Cable Tray',
    content: (
      <>
        <p>
          The three main types of cable tray used in UK commercial and industrial installations each
          have different characteristics that make them suitable for different applications.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Perforated cable tray</strong> — the standard choice for most commercial
                installations. A pressed steel tray with punched holes in the base and sides for
                ventilation and cable tie fixing. Available in light, medium, and heavy duty
                ratings. The most versatile and widely available type.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solid bottom (return flange) tray</strong> — pressed steel tray with a solid
                base without perforations. The sides fold inward at the top to form a return flange
                that adds rigidity. Used where cables need additional protection from below, in
                areas with falling debris, or in outdoor/semi-exposed locations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ladder cable tray</strong> — consists of two parallel side rails connected
                by rungs, similar in appearance to a ladder. Provides very good ventilation and is
                used for large power cables in industrial installations. The open structure between
                rungs allows easy access to individual cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wire mesh (basket tray)</strong> — formed from welded wire mesh. Very
                lightweight, flexible, and easy to cut and modify on site. Widely used for data and
                communications cables, and increasingly used for power cables in commercial and data
                centre applications. See the{' '}
                <SEOInternalLink href="/cable-basket-installation">
                  cable basket guide
                </SEOInternalLink>{' '}
                for full details.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'materials',
    heading: 'Materials and Finishes',
    content: (
      <>
        <p>
          Cable tray is manufactured from several materials with different corrosion resistance and
          cost profiles. Selecting the correct material for the environment is essential for a
          durable installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hot-dip galvanised (HDG) steel</strong> — the standard specification for
                commercial and industrial installations. The zinc coating provides excellent
                corrosion protection for indoor and sheltered outdoor use. HDG tray to BS EN ISO
                1461 is the most cost-effective and widely available option.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pre-galvanised (mill-galvanised) steel</strong> — lighter zinc coating than
                HDG, applied before the tray is formed. Cheaper than HDG but offers less corrosion
                protection. Suitable for dry indoor installations only. Cut edges are unprotected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stainless steel (304 or 316 grade)</strong> — used in food production,
                pharmaceutical manufacturing, marine environments, and wet areas where galvanised
                steel would corrode. Grade 316 offers greater corrosion resistance than 304 in
                chloride-rich environments. Significantly more expensive than galvanised steel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PVC (uPVC) tray</strong> — non-conductive, lightweight, and completely
                corrosion-resistant. Used in chemical environments where metallic tray would
                corrode, and in telecommunications rooms where metallic tray could cause
                interference. Not suitable for power cable applications requiring earthed cable
                management.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'support-spacing',
    heading: 'Support Spacing for Cable Tray',
    content: (
      <>
        <p>
          Cable tray must be adequately supported to prevent deflection under cable loading.
          Excessive deflection is unsightly, can cause stress on cable sheaths at low points, and
          may indicate that the tray is inadequately supported for the load it carries.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Straight horizontal runs</strong> — typically 1200mm to 1500mm support
                centres for light and medium-duty tray with modest cable loading. For heavy-duty
                tray or heavily loaded tray, reduce to 900mm. Always check the manufacturer's
                load/span tables for the specific product.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>At bends and fittings</strong> — support within 300mm either side of bends,
                tees, reducers, and crosses. Fittings create point loads and concentrate stress in
                the tray structure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vertical runs</strong> — support at 1200mm to 1500mm centres. Cable weight
                on vertical tray must be managed with cable cleats or ties at regular intervals —
                cables must not be allowed to sag down in vertical tray sections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Suspended installations</strong> — threaded rod hangers, channel brackets,
                and wall brackets are the common support methods. All supports must be fixed into
                structural elements (concrete, steel, blockwork) — not into lightweight partitions
                or suspended ceiling grids.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earthing',
    heading: 'Earthing Cable Tray Systems',
    content: (
      <>
        <p>
          Cable tray is an extraneous conductive part under BS 7671 and must be bonded and earthed.
          This is a mandatory requirement — unearthed metallic cable management systems are a common
          EICR observation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section bonding</strong> — fit earth bonds (green/yellow conductor or
                braided earth strap) at every joint between tray sections, whether the physical
                joint is a bolted splice plate or a tray fitting. Paint and corrosion on joint faces
                increase contact resistance — earth bonds bypass this.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>System earth connection</strong> — connect the tray system to the main
                earthing terminal with an appropriate earth conductor. The run length and
                prospective fault current determine the required conductor cross-section per BS 7671
                Regulation 543.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not a circuit CPC</strong> — the tray earthing system is not a substitute
                for the circuit protective conductor within each cable. Every cable installed in the
                tray must have its own CPC as required by BS 7671.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fill-ratio',
    heading: 'Fill Ratio and Cable Loading',
    content: (
      <>
        <p>
          The fill ratio of cable tray affects cable current ratings due to heat dissipation, future
          maintenance, and the practical ability to install cables without damaging existing ones.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>40% maximum fill</strong> — the tray cross-sectional area occupied by cables
                (including cable sheaths) should not exceed approximately 40%. This allows adequate
                air circulation, space for cable ties, and future additions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grouping derating</strong> — cables installed in groups on tray have their
                current ratings reduced by the grouping factors in BS 7671 Appendix 4 Table 4C1. The
                more cables grouped together, the lower the derating factor. This must be accounted
                for in cable sizing calculations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Segregation</strong> — power cables and data/communications cables should be
                run on separate tray systems, or separated by a divider within the same tray, to
                prevent electromagnetic interference.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ordering-and-cutting',
    heading: 'Ordering and Cutting Cable Tray',
    content: (
      <>
        <p>
          Efficient ordering and cutting of cable tray reduces waste and installation time. Taking
          off quantities accurately from drawings before ordering is a key commercial skill.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard lengths</strong> — cable tray is typically supplied in 3m lengths.
                Order fittings (bends, tees, reducers, crosses) separately and include in the
                take-off.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cutting</strong> — cut cable tray with an angle grinder with a cutting disc,
                a hacksaw, or a jigsaw with a metal-cutting blade. Always deburr cut edges with a
                file to prevent cable sheath damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Touch-up after cutting</strong> — apply cold zinc spray or touch-up paint to
                all cut edges on galvanised tray to restore corrosion protection. Bare steel edges
                will rust rapidly in humid environments.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'commercial-installation',
    heading: 'Typical Commercial Cable Tray Installation',
    content: (
      <>
        <p>
          A typical commercial cable tray installation in an office or retail building follows a
          structured sequence to ensure a neat, correctly supported, and compliant result.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1. Set out the route</strong> — mark the tray route on walls, columns, and
                ceilings. Coordinate with other services (HVAC, plumbing, structural steel) to avoid
                clashes before fixing supports.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2. Fix supports</strong> — install wall brackets, ceiling drops, or channel
                (Unistrut/Strut) supports at the required spacing. Fix into structural elements
                only. Use M8 or M10 threaded rod for suspended drops.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3. Install tray sections</strong> — lay tray sections onto supports and
                connect with splice plates and M6 bolts. Install bends, tees, and reducers at
                changes of direction and size.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4. Earth bond and connect</strong> — fit earth bonds at every joint. Connect
                the tray to the MET. Test continuity of the earthing system before installing
                cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>5. Install and secure cables</strong> — draw cables into position and tie at
                regular intervals using cable ties or strapping. Maintain segregation between power
                and data circuits.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Certifying Commercial Installations',
    content: (
      <>
        <p>
          Commercial installations involving cable tray must be certified with an Electrical
          Installation Certificate (EIC) covering all circuits installed. The EIC must include
          verification of earth continuity for the tray earthing system and correct grouping
          derating applied to cable sizing.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Certify Commercial Installations on Site
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to complete Electrical Installation Certificates for commercial projects on site.
                  Record test results, circuit details, and cable tray earthing continuity — issue
                  the PDF before you leave.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete commercial installation certificates on your phone"
          description="Elec-Mate's EIC and EICR apps help you certify commercial cable tray installations on site. Record circuit tests, earth continuity, and installation details — instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CableTrayInstallationPage() {
  return (
    <GuideTemplate
      title="Cable Tray Installation UK | Commercial & Industrial Cable Management"
      description="Complete UK guide to cable tray installation. Types (perforated, solid bottom, ladder, wire mesh), materials (hot-dip galvanised, stainless steel, PVC), support spacing, earthing requirements, fill ratio, and typical commercial installation sequence."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Layers}
      heroTitle={
        <>
          Cable Tray Installation UK:{' '}
          <span className="text-yellow-400">Commercial Cable Management Guide</span>
        </>
      }
      heroSubtitle="Everything electricians need to know about cable tray — types, materials, support spacing, earthing, fill ratio, ordering and cutting, and the complete sequence for a typical commercial installation."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Cable Tray Installation"
      relatedPages={relatedPages}
      ctaHeading="Complete Commercial Installation Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate to certify commercial installations on site. Record circuit details, earth continuity, and test results — instant PDF export. 7-day free trial."
    />
  );
}
