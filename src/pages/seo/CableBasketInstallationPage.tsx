import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Layers,
  ShieldCheck,
  Wrench,
  Zap,
  Building2,
  ClipboardCheck,
  PoundSterling,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation Guides', href: '/guides/cable-installation' },
  { label: 'Wire Cable Basket Installation', href: '/cable-basket-installation' },
];

const tocItems = [
  { id: 'what-is-cable-basket', label: 'What is Wire Cable Basket?' },
  { id: 'advantages', label: 'Advantages of Wire Mesh Basket' },
  { id: 'sizes-and-types', label: 'Sizes and Types' },
  { id: 'support-requirements', label: 'Support Requirements' },
  { id: 'earthing', label: 'Earthing Wire Mesh Basket' },
  { id: 'data-centre-use', label: 'Data Centre and Commercial Use' },
  { id: 'cost-vs-tray', label: 'Cost vs Solid Cable Tray' },
  { id: 'cable-sizing', label: 'Cable Sizing on Basket' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Wire cable basket — commonly known by the brand name Cablofil (manufactured by Legrand) — is a cable management system made from welded steel wire mesh, offering a lightweight, flexible alternative to pressed steel cable tray.',
  'Cable basket is particularly popular in data centres, server rooms, and modern commercial offices due to its excellent airflow, ease of cable installation and identification, and clean aesthetic.',
  'Wire mesh basket can be cut and modified on site with side cutters or bolt croppers, and shaped using a bending tool — no specialist cutting equipment needed. This significantly reduces installation time on complex routes.',
  'Like all metallic cable management, wire cable basket must be earthed — section joints must be bonded and the system must be connected to the main earthing terminal.',
  'Cable basket is generally more expensive per metre than equivalent perforated steel cable tray of the same width, though the on-site flexibility and faster cable installation can partially offset the material cost premium — always compare on a project-specific installed cost basis.',
  'Cable sizing on basket requires applying BS 7671 Appendix 4 correction factors: Ca (ambient temperature), Cg (grouping derating for bundled cables), and Ci (thermal insulation) as applicable. Manufacturers additionally recommend keeping the cross-sectional fill to around 40% as a practical ventilation guideline — note this is manufacturer guidance, not a specific BS 7671 threshold.',
];

const faqs = [
  {
    question: 'What is Cablofil cable basket?',
    answer:
      'Cablofil is the leading brand name for wire mesh cable basket, manufactured by Legrand. Cablofil cable basket is constructed from galvanised steel wire welded into a mesh pattern, formed into a channel shape. The brand name Cablofil is used generically by many UK electricians to refer to any wire mesh cable basket, in the same way as other brand names become generic terms. Other manufacturers produce similar products, including OBO Bettermann and Niedax.',
  },
  {
    question: 'Can cable basket be used for power cables?',
    answer:
      'Yes. Wire cable basket is suitable for both power cables and data/communications cables. For power cable installations, the basket must be earthed as a system, and cable sizing calculations must include the BS 7671 Appendix 4 correction factors — Ca (ambient temperature), Cg (grouping) and Ci (thermal insulation) as applicable. Manufacturers typically recommend keeping the cross-sectional fill to around 40% as a practical guideline to preserve ventilation and avoid stacking cables into a dense bundle; note that this 40% figure is manufacturer guidance, not a specific BS 7671 threshold — the regulatory mechanism for maintaining current ratings is the Cg grouping derating calculation required by Appendix 4. Cable basket is used extensively for power distribution in commercial buildings and data centres.',
  },
  {
    question: 'How do you earth wire cable basket?',
    answer:
      "Wire cable basket must be bonded section-to-section with earth bond connectors at every joint, and the system must be connected to the installation's main earthing terminal with a suitably sized earth conductor. Cablofil and other manufacturers supply clip-on earth bond connectors that attach to the wire mesh without requiring drilling or separate hardware. The earth conductor cross-section is determined either from BS 7671 Table 54.7 (Regulation 543.1.1) or by the adiabatic calculation in Regulation 543.1.3, taking into account the maximum earth fault current and disconnection time of the upstream protective device.",
  },
  {
    question: 'What support spacing is required for cable basket?',
    answer:
      "Support spacing for wire cable basket depends on the basket width, wire diameter, and cable loading. As a general guide, standard Cablofil CF54 series basket (2.9mm wire) requires supports at 1500mm centres maximum for horizontal runs with typical cable loading. Wider baskets and heavy cable loads require closer support spacing — refer to the manufacturer's load/span tables. At bends, tees, and changes of direction, additional supports within 300mm of the fitting are required.",
  },
  {
    question: 'Can cable basket be used outdoors?',
    answer:
      'Standard hot-dip galvanised (HDG) wire basket is suitable for sheltered outdoor use where it is not in direct contact with weather. For fully exposed outdoor installations, stainless steel (316 grade) wire basket is required. PVC-coated wire basket is also available and provides good corrosion resistance for external or humid environments. Standard pre-galvanised (electro-galvanised) basket is for indoor dry use only — the thin zinc coating will corrode rapidly in outdoor or humid conditions.',
  },
  {
    question: 'How do you bend cable basket?',
    answer:
      'Cablofil cable basket can be shaped using a dedicated basket bending tool (supplied by Cablofil/Legrand) that folds the basket without cutting. For gentle bends, the basket can be bent by hand or over a suitable former — the wire mesh construction allows controlled deformation without cracking. For right-angle bends and tees, purpose-made corner pieces and tee connectors can be ordered, or the basket can be cut and re-formed on site using the bending tool. This on-site flexibility is one of the major advantages over pressed steel tray, which requires factory-made fittings for all changes of direction.',
  },
  {
    question: 'Is cable basket suitable for fire-resistant cable installations?',
    answer:
      "Wire cable basket can be used to support and route fire-resistant cables such as FP200 Gold and MICC cable, subject to the fire strategy for the building. The basket itself is not fire-rated, but BS 7671 Regulation 521.10.202 requires wiring systems to be supported such that they will not be liable to premature collapse in the event of fire — so the supports and fixings (not just the cable) must be metal and survive long enough to keep the cables in place. Fire-resistant cables in basket will maintain their circuit integrity for their rated period only while those supports hold. Where a fire-rated cable management assembly is specified, follow the fire engineer's design and the cable manufacturer's fixing requirements.",
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
    href: '/fp200-gold-cable-guide',
    title: 'FP200 Gold Cable Guide',
    description: 'Fire-resistant cable for fire alarm and emergency lighting — BS 7629-1 guide.',
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
    id: 'what-is-cable-basket',
    heading: 'What is Wire Cable Basket?',
    content: (
      <>
        <p>
          Wire cable basket (commonly referred to as Cablofil, after the leading brand) is a cable
          management system constructed from galvanised steel wire welded into a rectangular mesh
          pattern and formed into a channel shape. It is an alternative to pressed steel cable tray,
          offering a lighter, more flexible, and faster-to-install solution for routing multiple
          cables in commercial and data centre environments.
        </p>
        <p>
          The wire mesh construction gives cable basket its key advantages: excellent ventilation
          around cables, easy visual identification of installed cables, and the ability to cut and
          shape the basket on site using basic hand tools. Unlike pressed steel tray, which requires
          factory-made fittings for bends and tees, cable basket can be cut with side cutters and
          shaped by hand for simple route changes.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fast installation</strong> — cables are simply laid into the open mesh
                basket without threading. Route changes can be made on site without factory
                fittings. Installation rates are significantly faster than conduit and faster than
                traditional cable tray on complex routes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open and accessible</strong> — the wire mesh construction allows cables to
                be seen, identified, and accessed without removing the tray. Future cable additions
                are easy to make.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lightweight</strong> — wire basket weighs significantly less than equivalent
                solid steel tray, reducing structural loading and making handling on site easier.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Cable basket must be installed in compliance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          requirements for cable support, grouping, and earthing of extraneous conductive parts.
        </p>
      </>
    ),
  },
  {
    id: 'advantages',
    heading: 'Advantages of Wire Mesh Cable Basket',
    content: (
      <>
        <p>
          Wire cable basket offers several practical advantages over both pressed steel tray and
          conduit systems that make it the preferred choice for many modern commercial and data
          centre installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Excellent airflow</strong> — the open wire mesh construction allows air to
                circulate freely around cables in all directions. This maintains cable current
                ratings at their rated values and prevents localised heat build-up in tightly
                bunched cable groups.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>On-site flexibility</strong> — cut with side cutters, cropped with bolt
                croppers, bent using the Cablofil bending tool or by hand. No metal saw or angle
                grinder required for modifications. Route changes and additions can be made quickly
                during installation and post-completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable identification</strong> — cables in wire basket are visible from
                below, above, and through the sides. This makes fault-finding and identification
                dramatically easier than cables inside enclosed conduit or covered tray lids.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Clean appearance</strong> — wire basket has a modern, clean aesthetic that
                suits contemporary commercial office fit-outs where the ceiling services are left
                exposed. Many architects specify Cablofil-type basket in preference to solid tray
                for aesthetic reasons.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No sharp edges on cables</strong> — the round wire construction presents a
                smooth surface to cable sheaths. Pressed steel tray has sharp edges at cut sections
                that can damage cable sheaths — wire basket is inherently gentler on cables.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'sizes-and-types',
    heading: 'Sizes and Types of Wire Cable Basket',
    content: (
      <>
        <p>
          Cablofil and equivalent wire basket systems are available in a range of widths, depths,
          and wire diameters to suit different applications and cable loadings. The table below
          summarises the typical specification ranges you will encounter on UK commercial projects.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold">Dimension</th>
                <th className="px-4 py-3 font-semibold">Typical range</th>
                <th className="px-4 py-3 font-semibold">Most common</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-3 font-medium">Width</td>
                <td className="px-4 py-3">50mm – 600mm</td>
                <td className="px-4 py-3">100 / 150 / 200 / 300 / 450mm</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Depth</td>
                <td className="px-4 py-3">35mm – 105mm</td>
                <td className="px-4 py-3">54mm (standard commercial)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Wire diameter</td>
                <td className="px-4 py-3">~3mm – 5mm+</td>
                <td className="px-4 py-3">2.9mm (Cablofil CF54 series)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Choose width based on a cable fill calculation. Manufacturers typically recommend a
          maximum cross-sectional fill of around 40% as a practical guide to preserve ventilation
          and keep cables in something close to free-air conditions — note that this 40% figure is
          manufacturer guidance, not a specific BS 7671 threshold. Deeper basket (e.g. the 105mm
          deep-section profile) and heavier wire allow higher cable volumes and wider support
          spans.
        </p>
        <h4 className="font-bold text-white mt-6 mb-3">Finishes by environment</h4>
        <div className="grid sm:grid-cols-2 gap-3 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <p className="font-semibold text-yellow-400 mb-1">Pre-galvanised (electro-galvanised)</p>
            <p className="text-sm text-white/90">Indoor, dry use only. The thin zinc coating
              corrodes rapidly in damp or external conditions.</p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <p className="font-semibold text-yellow-400 mb-1">Hot-dip galvanised (HDG)</p>
            <p className="text-sm text-white/90">Indoor and sheltered outdoor use where not in
              direct contact with weather.</p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <p className="font-semibold text-yellow-400 mb-1">PVC coated</p>
            <p className="text-sm text-white/90">Humid or mildly corrosive environments; good
              corrosion resistance for external or wash-down areas.</p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <p className="font-semibold text-yellow-400 mb-1">Stainless steel 316</p>
            <p className="text-sm text-white/90">Fully exposed outdoor, marine and corrosive
              environments where galvanising will not last.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'support-requirements',
    heading: 'Support Requirements for Wire Cable Basket',
    content: (
      <>
        <p>
          Wire cable basket must be adequately supported to prevent deflection under cable loading.
          The flexible nature of wire mesh means it will sag more than rigid pressed steel tray if
          supports are spaced too widely. The figures below are typical manufacturer guidance — always
          confirm against the specific load/span table for the basket series and cable load you are
          installing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Typical max support spacing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-3 font-medium">Horizontal straight run (CF54, standard load)</td>
                <td className="px-4 py-3">1500mm centres</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Heavily loaded or wide basket</td>
                <td className="px-4 py-3">1200mm or 1000mm centres</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Either side of a bend, tee or direction change</td>
                <td className="px-4 py-3">Within 300mm of the fitting</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Vertical run</td>
                <td className="px-4 py-3">1200mm centres (plus cable ties/cleats for cable weight)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Support against premature collapse in fire</strong> — BS 7671 Regulation
                521.10.202 requires wiring systems to be supported such that they will not be liable
                to premature collapse in the event of fire, and this applies throughout the
                installation. For basket, that means using metal supports and fixings on escape
                routes rather than relying on plastic cable ties or fixings that would fail early in
                a fire and let cables fall.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Joints are the weak point</strong> — joints in wire basket are the weakest
                point in the run, so position supports close to every connector and fitting rather
                than mid-span only.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Support types</strong> — threaded rod hangers with Cablofil hanger brackets
                are the most common method for suspended installations. Wall brackets and ceiling
                clips are used for surface-mounted basket. Fix into structural elements only — not
                lightweight partitions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earthing',
    heading: 'Earthing Wire Cable Basket',
    content: (
      <>
        <p>
          Wire cable basket is a metallic extraneous conductive part under BS 7671 and must be
          bonded and connected to earth. The earthing method for wire basket is simpler than for
          pressed steel tray because clip-on earth bond connectors require no drilling.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Clip-on earth bonds</strong> — Cablofil and other manufacturers supply
                clip-on earth bond connectors that attach to the wire mesh at joints. These are
                faster to install than the bolted earth bonds required for pressed steel tray and
                provide a reliable connection without drilling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bond at every joint</strong> — fit an earth bond at every connection between
                basket sections. The physical joint alone cannot be relied upon for earth continuity
                — the mesh contact may have high resistance due to the galvanised finish.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>System earth connection</strong> — connect the wire basket system to the
                main earthing terminal with a suitably sized earth conductor. Protective conductor
                cross-section is determined either from BS 7671 Table 54.7 (Regulation 543.1.1) or
                by the adiabatic calculation in Regulation 543.1.3, taking account of the maximum
                earth fault current and the disconnection time of the upstream protective device.
                The connection point should be at the origin of the basket run, nearest the
                distribution board or panel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and certifying basket earthing</strong> — earth continuity of the
                basket system must be verified and recorded on the Electrical Installation
                Certificate (EIC) or EICR. The presence and adequacy of circuit protective
                conductors is a required inspection item, grounded in BS 7671 Regulation 411.3.1 and
                Section 543, confirming both continuity and correct sizing. In practice, test
                between the origin earth connection and remote sections of basket with a
                low-resistance ohmmeter; results should be a fraction of an ohm for a well-bonded
                system. Record all readings on the schedule of test results.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'data-centre-use',
    heading: 'Data Centre and Commercial Use',
    content: (
      <>
        <p>
          Wire cable basket has become the dominant cable management system in UK data centres and
          server rooms, and is widely used in modern commercial office fit-outs. Its combination of
          speed, flexibility, and excellent airflow makes it ideally suited to these environments.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Data centres</strong> — wire basket is used for both overhead power
                distribution cabling and for Cat6/Cat6A structured cabling. The open mesh allows
                cable identification by sight, easy patch cable routing, and addition of new cables
                without disruption to existing runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Under-floor cable management</strong> — in raised floor data centres, wire
                basket is used in the under-floor plenum to route power and data cables to cabinet
                positions. The mesh allows maximum airflow under the floor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial offices</strong> — exposed-ceiling fit-outs often specify wire
                basket in preference to solid tray for aesthetic reasons. The clean lines and
                light-industrial look of wire basket suit contemporary design briefs. Available in
                white powder-coat finish for premium projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable segregation</strong> — separate wire basket runs should be used for
                power and data cables. BS 7671 addresses this through Regulation 528.1 (proximity to
                other electrical services, including separation of Band I extra-low-voltage/data
                circuits from Band II low-voltage power circuits) and Regulation 528.2 (proximity of
                communications cables). Where power and data basket runs must share a space, a
                central divider or physical separation should be maintained; the commonly cited
                200mm figure derives from structured-cabling standards (CENELEC EN 50174) and cable
                manufacturers&apos; EMC guidance rather than a specific BS 7671 distance — refer to
                the data cabling system specification and manufacturer guidance for the required
                separation in your installation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-vs-tray',
    heading: 'Cost vs Solid Cable Tray',
    content: (
      <>
        <p>
          Wire cable basket is generally more expensive per metre in material cost than equivalent
          pressed steel perforated cable tray, but this premium must be assessed against the
          installation labour saving. The figures below are indicative market guidance to frame the
          trade-off — they are not a quote, and the actual installed cost varies by project, route
          complexity and supplier.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold">Factor</th>
                <th className="px-4 py-3 font-semibold">Wire basket vs perforated tray</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-3 font-medium">Material cost per metre</td>
                <td className="px-4 py-3">Typically ~20–40% higher than equivalent HDG perforated tray</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Installation labour</td>
                <td className="px-4 py-3">Often ~15–30% lower on complex routes (on-site cutting/bending, clip-on earth bonds, faster cable laying)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Programme</td>
                <td className="px-4 py-3">Faster on fast-track fit-outs — routes adapt on site without waiting for factory fittings</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Best where tray wins</td>
                <td className="px-4 py-3">Long straight runs, cables needing protection from below, fixed routes that won't change</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          On a large project with hundreds of metres of basket the material premium is significant,
          but the labour and programme savings can partially or fully offset it — so always compare
          on a project-specific installed-cost basis rather than on headline material price. Where
          routes are long, straight and unlikely to change, pressed steel solid-bottom or perforated
          tray is often better value. See the{' '}
          <SEOInternalLink href="/cable-tray-installation">cable tray installation guide</SEOInternalLink>{' '}
          for a direct comparison.
        </p>
      </>
    ),
  },
  {
    id: 'cable-sizing',
    heading: 'Cable Sizing on Basket: BS 7671 Appendix 4',
    content: (
      <>
        <p>
          Selecting the correct cable size for a wire basket installation requires applying the BS
          7671 Appendix 4 correction factors to the base current-carrying capacity (I<sub>z</sub>).
          The three factors most relevant to basket installations are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold">Factor</th>
                <th className="px-4 py-3 font-semibold">What it corrects for</th>
                <th className="px-4 py-3 font-semibold">BS 7671 source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-3 font-medium">C<sub>a</sub></td>
                <td className="px-4 py-3">Ambient temperature above 30&deg;C (e.g. ceiling voids, plant rooms)</td>
                <td className="px-4 py-3">Table 4B1</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">C<sub>g</sub></td>
                <td className="px-4 py-3">Grouping — mutual heating from other circuits sharing the basket</td>
                <td className="px-4 py-3">Tables 4C4 / 4C5 (free-air methods E/F)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">C<sub>i</sub></td>
                <td className="px-4 py-3">Contact with thermal insulation elsewhere on the route</td>
                <td className="px-4 py-3">Reg 523 / Appendix 4</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C<sub>a</sub> — ambient temperature</strong> — if the ambient temperature in
                the ceiling void or plant room exceeds 30&deg;C, apply the C<sub>a</sub> factor from
                BS 7671 Appendix 4 Table 4B1. For example, at 40&deg;C ambient C<sub>a</sub> = 0.87
                for 70&deg;C thermoplastic (PVC) cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C<sub>g</sub> — grouping</strong> — this is the critical factor on a loaded
                basket. Because the open mesh has more than 30% free area, cables on basket are rated
                to Reference Method E or F (free air), so the grouping factor comes from BS 7671
                Appendix 4 <strong>Tables 4C4 (multicore) and 4C5 (single-core)</strong> — not the
                bunched/enclosed factors in Table 4C1. The free-air factors are less severe: for a
                single perforated tray of touching multicore cables, Table 4C4 gives around 0.87 for
                two cables, reducing as more cables and tiers are added. Spacing cables apart (one
                cable diameter or more) reduces the derating further. On a fully loaded basket this
                grouping derating — not the fill percentage — is the primary driver for upsizing
                conductors, so always look up the factor for the actual number of cables and the
                installation arrangement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C<sub>i</sub> — thermal insulation</strong> — does not normally apply on open
                basket, but applies if cables leave the basket and pass through or are in contact
                with thermal insulation elsewhere on their route.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The combined derated capacity is: I<sub>z</sub>(derated) = I<sub>t</sub>(tabulated)
          &times; C<sub>a</sub> &times; C<sub>g</sub> (&times; C<sub>i</sub> where it applies). The
          selected conductor must satisfy I<sub>z</sub> &ge; I<sub>n</sub> (the nominal current of
          the protective device). Take the base tabulated current-carrying capacity for your cable
          type from the relevant Appendix 4 current-carrying-capacity table using the Reference
          Method E or F column for free-air / tray installation.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Certifying Wire Basket Installations',
    content: (
      <>
        <p>
          Commercial installations using wire cable basket must be certified with the appropriate
          Electrical Installation Certificate, including verification of tray earth continuity,
          correct grouping factors applied to cable sizing, and cable segregation between power and
          data circuits.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue Commercial Certificates on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to complete and issue Electrical Installation Certificates for commercial cable
                  basket installations on site. Record test results, earth continuity readings, and
                  circuit details — generate the PDF before you leave.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete commercial installation certificates on your phone"
          description="Elec-Mate's EIC and EICR apps help you certify commercial cable basket installations on site."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CableBasketInstallationPage() {
  return (
    <GuideTemplate
      title="Wire Cable Basket Installation UK | Wiremesh Tray Guide"
      description="Complete UK guide to wire cable basket installation (Cablofil type). Advantages, sizes, support requirements, earthing, data centre and commercial use…"
      datePublished="2026-03-27"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Layers}
      answerBox={{
        question: 'What is wire cable basket and what is it used for?',
        answer:
          'Wire cable basket is a cable management system made from welded steel wire mesh formed into a channel. It is a lighter, faster-to-install alternative to pressed steel cable tray, used to route power and data cables in commercial buildings and data centres. Its open mesh gives excellent airflow, easy cable identification and on-site flexibility. Like all metallic cable management, it must be earthed.',
        detail:
          'Because the open mesh has more than 30% free area, cables on basket are rated to Reference Method E or F (free air) under BS 7671 — the same basis as a perforated cable tray.',
      }}
      heroTitle={
        <>
          Wire Cable Basket Installation UK:{' '}
          <span className="text-yellow-400">Wiremesh Tray Guide</span>
        </>
      }
      heroSubtitle="Everything electricians need to know about wire cable basket (Cablofil type) — advantages over solid tray, sizes and types, support requirements, earthing, data centre and commercial use, and cost comparison."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Wire Cable Basket"
      relatedPages={relatedPages}
      ctaHeading="Complete Commercial Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate to certify commercial cable basket installations on site. Record test results and earth continuity — instant PDF export. 7-day free trial."
    />
  );
}
