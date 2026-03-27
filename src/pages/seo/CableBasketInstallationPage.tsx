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
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Wire cable basket — commonly known by the brand name Cablofil (manufactured by Legrand) — is a cable management system made from welded steel wire mesh, offering a lightweight, flexible alternative to pressed steel cable tray.',
  'Cable basket is particularly popular in data centres, server rooms, and modern commercial offices due to its excellent airflow, ease of cable installation and identification, and clean aesthetic.',
  'Wire mesh basket can be cut and modified on site with side cutters or bolt croppers, and shaped using a bending tool — no specialist cutting equipment needed. This significantly reduces installation time on complex routes.',
  'Like all metallic cable management, wire cable basket must be earthed — section joints must be bonded and the system must be connected to the main earthing terminal.',
  'Cable basket typically costs 20–40% more per metre than equivalent perforated steel cable tray of the same width, but the installation labour saving partially offsets this material cost premium.',
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
      'Yes. Wire cable basket is suitable for both power cables and data/communications cables. For power cable installations, the basket must be earthed as a system, the fill ratio must not exceed approximately 40% (to maintain cable current ratings through adequate ventilation), and cable sizing calculations must include appropriate grouping derating factors as per BS 7671 Appendix 4. Cable basket is used extensively for power distribution in commercial buildings and data centres.',
  },
  {
    question: 'How do you earth wire cable basket?',
    answer:
      'Wire cable basket must be bonded section-to-section with earth bond connectors at every joint, and the system must be connected to the installation\'s main earthing terminal with a suitably sized earth conductor. Cablofil and other manufacturers supply clip-on earth bond connectors that attach to the wire mesh without requiring drilling or separate hardware. The earth conductor cross-section must be calculated per BS 7671 Regulation 543, taking into account the maximum earth fault current and disconnection time of the upstream protective device.',
  },
  {
    question: 'What support spacing is required for cable basket?',
    answer:
      'Support spacing for wire cable basket depends on the basket width, wire diameter, and cable loading. As a general guide, standard Cablofil CF54 series basket (2.9mm wire) requires supports at 1500mm centres maximum for horizontal runs with typical cable loading. Wider baskets and heavy cable loads require closer support spacing — refer to the manufacturer\'s load/span tables. At bends, tees, and changes of direction, additional supports within 300mm of the fitting are required.',
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
      'Wire cable basket can be used to support and route fire-resistant cables such as FP200 Gold and MICC cable, subject to the fire strategy for the building. The basket itself is not fire-rated, but fire-resistant cables installed in basket will maintain their circuit integrity for the rated period provided the basket supports do not fail and cause the cables to fall. Where a fire-rated cable management system is required (for circuits needing circuit integrity for 60 or 90 minutes), purpose-made fire-rated cable management systems should be specified. Always consult the fire engineer\'s specification.',
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
          Wire cable basket (commonly referred to as Cablofil, after the leading brand) is a
          cable management system constructed from galvanised steel wire welded into a rectangular
          mesh pattern and formed into a channel shape. It is an alternative to pressed steel cable
          tray, offering a lighter, more flexible, and faster-to-install solution for routing
          multiple cables in commercial and data centre environments.
        </p>
        <p>
          The wire mesh construction gives cable basket its key advantages: excellent ventilation
          around cables, easy visual identification of installed cables, and the ability to cut
          and shape the basket on site using basic hand tools. Unlike pressed steel tray, which
          requires factory-made fittings for bends and tees, cable basket can be cut with side
          cutters and shaped by hand for simple route changes.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fast installation</strong> — cables are simply laid into the open
                mesh basket without threading. Route changes can be made on site without
                factory fittings. Installation rates are significantly faster than conduit
                and faster than traditional cable tray on complex routes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open and accessible</strong> — the wire mesh construction allows
                cables to be seen, identified, and accessed without removing the tray. Future
                cable additions are easy to make.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lightweight</strong> — wire basket weighs significantly less than
                equivalent solid steel tray, reducing structural loading and making handling
                on site easier.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Cable basket must be installed in compliance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
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
          Wire cable basket offers several practical advantages over both pressed steel tray
          and conduit systems that make it the preferred choice for many modern commercial
          and data centre installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Excellent airflow</strong> — the open wire mesh construction allows
                air to circulate freely around cables in all directions. This maintains cable
                current ratings at their rated values and prevents localised heat build-up in
                tightly bunched cable groups.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>On-site flexibility</strong> — cut with side cutters, cropped with
                bolt croppers, bent using the Cablofil bending tool or by hand. No metal saw
                or angle grinder required for modifications. Route changes and additions can
                be made quickly during installation and post-completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable identification</strong> — cables in wire basket are visible
                from below, above, and through the sides. This makes fault-finding and
                identification dramatically easier than cables inside enclosed conduit or
                covered tray lids.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Clean appearance</strong> — wire basket has a modern, clean aesthetic
                that suits contemporary commercial office fit-outs where the ceiling services
                are left exposed. Many architects specify Cablofil-type basket in preference
                to solid tray for aesthetic reasons.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No sharp edges on cables</strong> — the round wire construction
                presents a smooth surface to cable sheaths. Pressed steel tray has sharp
                edges at cut sections that can damage cable sheaths — wire basket is
                inherently gentler on cables.
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
          Cablofil and equivalent wire basket systems are available in a range of widths,
          depths, and wire diameters to suit different applications and cable loadings.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Width range</strong> — standard widths from 50mm to 600mm. Common
                sizes in commercial installations are 100mm, 150mm, 200mm, 300mm, and
                450mm. Choose width based on cable fill calculation with 40% maximum fill.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Depth range</strong> — standard depths from 35mm to 105mm. Deeper
                basket allows higher cable volumes without exceeding width. 54mm depth is
                the most common for standard commercial applications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wire diameter</strong> — heavier wire provides greater load capacity
                and allows wider support spacing. Cablofil CF54 series uses 2.9mm wire as
                standard. CF105 deep-section basket uses heavier wire for larger span
                capability.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Finishes</strong> — pre-galvanised (indoor dry use), hot-dip
                galvanised (indoor/sheltered outdoor), PVC coated (humid or mild outdoor),
                and stainless steel 316 (corrosive outdoor or marine environments).
              </span>
            </li>
          </ul>
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
          The flexible nature of wire mesh means it will sag more than rigid pressed steel tray
          if supports are spaced too widely.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Horizontal straight runs</strong> — typically 1500mm maximum support
                spacing for Cablofil CF54 with standard cable loading. Reduce to 1200mm or
                1000mm for heavily loaded baskets or wide widths. Always check the
                manufacturer's load/span tables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>At fittings and route changes</strong> — install supports within
                300mm on each side of bends, tees, and changes of direction. Joints in
                wire basket are the weakest point in the system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Support types</strong> — threaded rod hangers with Cablofil hanger
                brackets are the most common support method for suspended installations.
                Wall brackets and ceiling clips are used for surface-mounted basket.
                All fixings into structural elements only — not lightweight partitions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vertical runs</strong> — support at maximum 1200mm centres for
                vertical cable basket. Cable weight on vertical runs must be managed with
                cable ties or dedicated cable cleats at regular intervals within the basket.
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
                <strong>Clip-on earth bonds</strong> — Cablofil and other manufacturers
                supply clip-on earth bond connectors that attach to the wire mesh at joints.
                These are faster to install than the bolted earth bonds required for pressed
                steel tray and provide a reliable connection without drilling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bond at every joint</strong> — fit an earth bond at every connection
                between basket sections. The physical joint alone cannot be relied upon for
                earth continuity — the mesh contact may have high resistance due to the
                galvanised finish.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>System earth connection</strong> — connect the wire basket system
                to the main earthing terminal with a suitably sized earth conductor, sized
                per BS 7671 Regulation 543. The connection point should be at the origin
                of the basket run, nearest the distribution board or panel.
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
          Wire cable basket has become the dominant cable management system in UK data centres
          and server rooms, and is widely used in modern commercial office fit-outs. Its
          combination of speed, flexibility, and excellent airflow makes it ideally suited
          to these environments.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Data centres</strong> — wire basket is used for both overhead power
                distribution cabling and for Cat6/Cat6A structured cabling. The open mesh
                allows cable identification by sight, easy patch cable routing, and addition
                of new cables without disruption to existing runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Under-floor cable management</strong> — in raised floor data centres,
                wire basket is used in the under-floor plenum to route power and data cables
                to cabinet positions. The mesh allows maximum airflow under the floor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial offices</strong> — exposed-ceiling fit-outs often specify
                wire basket in preference to solid tray for aesthetic reasons. The clean
                lines and light-industrial look of wire basket suit contemporary design
                briefs. Available in white powder-coat finish for premium projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable segregation</strong> — separate wire basket runs should be
                used for power and data cables. Where the runs must share a space, a central
                divider or a minimum separation of 200mm should be maintained to minimise
                electromagnetic interference on data circuits.
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
          installation labour saving.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Material cost</strong> — wire basket is typically 20–40% more expensive
                per metre than equivalent hot-dip galvanised perforated tray. On a large
                project with hundreds of metres of basket, this difference is significant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Labour saving</strong> — on-site bending and cutting without power
                tools, clip-on earth bonds, and faster cable installation into open basket
                can reduce installation labour by 15–30% on complex commercial routes
                compared to pressed steel tray requiring factory-made fittings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Programme saving</strong> — on fast-track commercial fit-outs where
                programme is critical, the ability to adapt basket routes on site without
                waiting for additional tray fittings can save days on the programme. Time
                savings have a real monetary value on tight commercial contracts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When to use solid tray instead</strong> — pressed steel solid bottom
                tray is better value where routes are long and straight, where cables need
                physical protection from below, or where the cable management system will
                not be changed over time. See the{' '}
                <SEOInternalLink href="/cable-tray-installation">
                  cable tray guide
                </SEOInternalLink>{' '}
                for comparison.
              </span>
            </li>
          </ul>
        </div>
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
          correct grouping factors applied to cable sizing, and cable segregation between power
          and data circuits.
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
                  to complete and issue Electrical Installation Certificates for commercial
                  cable basket installations on site. Record test results, earth continuity
                  readings, and circuit details — generate the PDF before you leave.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete commercial installation certificates on your phone"
          description="Elec-Mate's EIC and EICR apps help you certify commercial cable basket installations on site. Record earth continuity, circuit tests, and cable details — instant PDF export. 7-day free trial."
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
      description="Complete UK guide to wire cable basket installation (Cablofil type). Advantages, sizes, support requirements, earthing, data centre and commercial use, and honest cost comparison with solid steel cable tray."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Layers}
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
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to certify commercial cable basket installations on site. Record test results and earth continuity — instant PDF export. 7-day free trial."
    />
  );
}
