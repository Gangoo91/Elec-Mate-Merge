import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { FileCheck2, Layers, ShieldCheck, Wrench, Zap } from 'lucide-react';

// -------------------------------------------------------------------
// Shared presentation classes
// -------------------------------------------------------------------

/** Card: edge-to-edge on phones, inset and rounded from sm: up. */
const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] ' +
  'p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

/** Table shell: scrolls inside itself so the page body never moves sideways. */
const tableWrapCn =
  '-mx-4 overflow-x-auto border-y border-white/[0.14] bg-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x';

const thCn = 'whitespace-nowrap px-4 py-3 text-left font-semibold';
const tdCn = 'px-4 py-3 align-top';
const tdKeyCn = 'px-4 py-3 align-top font-medium';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation Guides', href: '/guides/cable-installation' },
  { label: 'Wire Cable Basket Installation', href: '/cable-basket-installation' },
];

const tocItems = [
  { id: 'what-is-cable-basket', label: 'What is Wire Cable Basket?' },
  { id: 'sizes-and-types', label: 'Sizes, Types and Finishes' },
  { id: 'cable-sizing', label: 'Cable Sizing on Basket' },
  { id: 'support-requirements', label: 'Support Requirements' },
  { id: 'earthing', label: 'Earthing Wire Mesh Basket' },
  { id: 'segregation', label: 'Power and Data Separation' },
  { id: 'advantages', label: 'Advantages over Solid Tray' },
  { id: 'cost-vs-tray', label: 'Cost vs Solid Cable Tray' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Wire cable basket — commonly known by the brand name Cablofil (manufactured by Legrand) — is a cable management system made from welded steel wire mesh, offering a lightweight, flexible alternative to pressed steel cable tray.',
  'Because the mesh is open, cables on basket are rated as being in free air. BS 7671 Appendix 4 takes the current-carrying capacity for cables on a perforated tray (holes covering at least 30% of the base) or on a cable ladder as Reference Method E or F.',
  'Grouping is the factor that usually forces an upsize on a loaded basket. The free-air grouping factors are in Appendix 4 Table 4C4 (multicore, Reference Method E) and Table 4C5 (single-core, Reference Method F) — not the bunched factors in Table 4C1.',
  'Wire mesh basket can be cut and modified on site with side cutters or bolt croppers and shaped with a bending tool, which cuts installation time on complex routes.',
  'Basket is a metallic cable management system. Regulation 543.2.1(f) recognises it as something that may serve as a protective conductor, so joints must be bonded, continuity must be verified, and the earthing conductor sized from Table 54.7 (Regulation 543.1.4) or by the adiabatic equation in Regulation 543.1.3.',
  'Where the specification of the data cabling is not known, BS 7671 informative Annex A444 recommends a minimum 200mm separation between power cabling on open metallic containment (welded mesh basket) and information technology cabling.',
];

const faqs = [
  {
    question: 'What is Cablofil cable basket?',
    answer:
      'Cablofil is the leading brand name for wire mesh cable basket, manufactured by Legrand. Cablofil cable basket is constructed from galvanised steel wire welded into a mesh pattern, formed into a channel shape. The brand name Cablofil is used generically by many UK electricians to refer to any wire mesh cable basket, in the same way as other brand names become generic terms. Other manufacturers produce similar products, including OBO Bettermann and Niedax. BS 7671 does not define "cable basket" as a term — for current-rating purposes it is treated as a perforated cable tray or a cable ladder, both of which take Reference Method E or F.',
  },
  {
    question: 'What reference method applies to cables on wire cable basket?',
    answer:
      'Reference Method E or F — the free-air methods. Appendix 4 of BS 7671 states that a perforated cable tray has a regular pattern of holes occupying at least 30% of the area of the base, and that the current-carrying capacity for cables attached to perforated cable trays should be taken as Reference Method E or F. It also states that for a cable ladder system, where supporting metalwork under the cables occupies less than 10% of the plan area, the current-carrying capacity should be taken as Reference Method E or F. Wire mesh basket sits comfortably inside both descriptions. By contrast, an unperforated tray, or one whose holes occupy less than 30% of the base, is rated as Reference Method C.',
  },
  {
    question: 'Can cable basket be used for power cables?',
    answer:
      'Yes. Wire cable basket is suitable for both power cables and data/communications cables, and is used extensively for power distribution in commercial buildings and data centres. For power circuits, the basket must be earthed as a system, and cable sizing must apply the BS 7671 Appendix 4 correction factors — Ca for ambient temperature (Table 4B1), Cg for grouping (Tables 4C4 and 4C5 for free air) and Ci for thermal insulation where cables leave the basket. Manufacturers typically recommend keeping cross-sectional fill to around 40% to preserve ventilation, but that figure is manufacturer guidance, not a BS 7671 threshold — the regulatory mechanism for maintaining current ratings is the Cg grouping calculation in Appendix 4.',
  },
  {
    question: 'How do you earth wire cable basket?',
    answer:
      "Bond section-to-section with earth bond connectors at every joint, and connect the system to the installation's main earthing terminal. Cablofil and other manufacturers supply clip-on earth bond connectors that attach to the wire mesh without drilling. The protective conductor cross-section is either selected from BS 7671 Table 54.7 (Regulation 543.1.4) or calculated using the adiabatic equation in Regulation 543.1.3 from the earth fault current and the disconnection time of the upstream device. Where that conductor is a separate conductor rather than part of a cable or an enclosure, Regulation 543.1.1 sets a floor of 2.5mm² copper equivalent if it is mechanically protected and 4mm² if it is not. Regulation 543.3.2 requires every connection and joint to be accessible for inspection, testing and maintenance.",
  },
  {
    question: 'What support spacing is required for cable basket?',
    answer:
      "BS 7671 does not tabulate support spacing for cable containment — it requires only that wiring systems be supported so they are not liable to premature collapse in the event of fire (Regulation 521.10.202). Spacing comes from the manufacturer's load/span tables. As a general guide, standard Cablofil CF54 series basket requires supports at 1500mm centres maximum for horizontal runs with typical cable loading. Wider baskets and heavy cable loads need closer spacing, and additional supports are required within 300mm of bends, tees and changes of direction. Always confirm against the load/span table for the series and the actual cable load.",
  },
  {
    question: 'How far apart should power and data cables be on basket?',
    answer:
      'Where the specification and intended application of the data cabling are known, BS 7671 points to BS EN 50174-2 and BS EN 50174-3. Where they are not known, informative Annex A444 of BS 7671 recommends a minimum separation of 200mm in free air, and Table A444.1 allows that to be reduced by the containment used on the power cabling: 200mm where there is no containment or open metallic containment (the screening performance of a welded mesh steel basket of 50mm x 100mm mesh, ladders excluded), 150mm for perforated open metallic containment, and no separation beyond that provided by the containment itself for solid metallic containment. Separately, Regulation 444.6.2 sets a minimum 130mm between information and communications technology cables and discharge, neon and high-intensity discharge lamps.',
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
      "Wire cable basket can be used to support and route fire-resistant cables such as FP200 Gold and MICC cable, subject to the fire strategy for the building. Regulation 521.10.202 requires wiring systems to be supported so they are not liable to premature collapse in the event of fire, and its NOTE 2 states that cables installed in or on steel cable containment systems are deemed to meet that requirement. Note carefully what that regulation is for: NOTE 5 states its intent is to prevent the general collapse of wiring systems that would hinder evacuation, rescue or firefighter access — it is expressly not intended to provide support that maintains circuit integrity for life safety or firefighting applications. Those requirements sit in Chapter 56 and in BS 5266, BS 5839 and BS 8519, so follow the fire engineer's design and the cable manufacturer's fixing requirements for circuit integrity.",
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

        <h3 className="pt-2 text-base font-semibold text-white">
          How BS 7671 classifies it
        </h3>
        <p>
          BS 7671 has no definition of &ldquo;cable basket&rdquo;. For current-rating purposes it
          falls under the descriptions Appendix 4 gives for perforated cable tray and cable ladder,
          and both take the free-air reference methods:
        </p>
        <div className={tableWrapCn + ' my-4'}>
          <table className="w-full min-w-[30rem] text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06]">
                <th className={thCn}>Support</th>
                <th className={thCn}>Appendix 4 description</th>
                <th className={thCn}>Reference method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className={tdKeyCn}>Perforated tray</td>
                <td className={tdCn}>Holes occupy at least 30% of the area of the base</td>
                <td className={tdCn}>E or F</td>
              </tr>
              <tr>
                <td className={tdKeyCn}>Cable ladder</td>
                <td className={tdCn}>
                  Supporting metalwork under the cables occupies less than 10% of the plan area
                </td>
                <td className={tdCn}>E or F</td>
              </tr>
              <tr>
                <td className={tdKeyCn}>Unperforated tray</td>
                <td className={tdCn}>No holes, or holes under 30% of the base area</td>
                <td className={tdCn}>C</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Wire mesh basket sits comfortably inside the first two, so cables on basket are rated as
          being in free air — the same basis as a perforated cable tray. That single fact drives the
          whole sizing exercise, because it determines both the base current-carrying capacity
          column you read and the grouping table you correct it with.
        </p>

        <h3 className="pt-2 text-base font-semibold text-white">Why installers choose it</h3>
        <div className={cardCn + ' my-4'}>
          <dl className="space-y-4 text-white">
            <div>
              <dt className="font-semibold">Fast installation</dt>
              <dd className="mt-1">
                Cables are laid into the open mesh rather than threaded, and route changes are made
                on site without waiting for factory fittings.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Open and accessible</dt>
              <dd className="mt-1">
                Cables can be seen, identified and accessed without removing a lid, so later
                additions are straightforward.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Lightweight</dt>
              <dd className="mt-1">
                Wire basket weighs considerably less than equivalent solid steel tray, reducing
                structural loading and making handling easier.
              </dd>
            </div>
          </dl>
        </div>
        <p>
          Cable basket must be installed in compliance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          requirements for cable support, grouping, segregation and earthing.
        </p>
      </>
    ),
  },
  {
    id: 'sizes-and-types',
    heading: 'Sizes, Types and Finishes',
    content: (
      <>
        <p>
          Cablofil and equivalent wire basket systems come in a range of widths, depths and wire
          diameters. The table below summarises the specification ranges you will meet on UK
          commercial projects — these are manufacturer product ranges, not BS 7671 figures, so
          confirm against the catalogue for the series you are pricing.
        </p>
        <div className={tableWrapCn + ' my-4'}>
          <table className="w-full min-w-[30rem] text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06]">
                <th className={thCn}>Dimension</th>
                <th className={thCn}>Typical range</th>
                <th className={thCn}>Most common</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className={tdKeyCn}>Width</td>
                <td className={tdCn}>50mm &ndash; 600mm</td>
                <td className={tdCn}>100 / 150 / 200 / 300 / 450mm</td>
              </tr>
              <tr>
                <td className={tdKeyCn}>Depth</td>
                <td className={tdCn}>35mm &ndash; 105mm</td>
                <td className={tdCn}>54mm (standard commercial)</td>
              </tr>
              <tr>
                <td className={tdKeyCn}>Wire diameter</td>
                <td className={tdCn}>~2.9mm &ndash; 5mm</td>
                <td className={tdCn}>2.9mm (Cablofil CF54 series)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="pt-2 text-base font-semibold text-white">Choosing a width</h3>
        <p>
          Size the width from a cable fill calculation, then check the result against the grouping
          derating covered in the cable sizing section below. Manufacturers typically recommend a
          maximum cross-sectional fill of around 40% to
          preserve ventilation and keep cables in something close to free-air conditions. That 40%
          figure is manufacturer guidance and appears nowhere in BS 7671 — the standard controls
          heating through the C<sub>g</sub> grouping factor instead, and it is that calculation, not
          the fill percentage, that decides whether conductors need upsizing. Deeper basket (the
          105mm deep-section profile, for example) and heavier wire allow higher cable volumes and
          wider support spans.
        </p>

        <h3 className="pt-2 text-base font-semibold text-white">Finishes by environment</h3>
        <div className={tableWrapCn + ' my-4'}>
          <table className="w-full min-w-[30rem] text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06]">
                <th className={thCn}>Finish</th>
                <th className={thCn}>Where it is suitable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className={tdKeyCn}>Pre-galvanised (electro-galvanised)</td>
                <td className={tdCn}>
                  Indoor, dry use only. The thin zinc coating corrodes rapidly in damp or external
                  conditions.
                </td>
              </tr>
              <tr>
                <td className={tdKeyCn}>Hot-dip galvanised (HDG)</td>
                <td className={tdCn}>
                  Indoor, and sheltered outdoor use where not in direct contact with weather.
                </td>
              </tr>
              <tr>
                <td className={tdKeyCn}>PVC coated</td>
                <td className={tdCn}>
                  Humid or mildly corrosive environments, including wash-down areas.
                </td>
              </tr>
              <tr>
                <td className={tdKeyCn}>Stainless steel 316</td>
                <td className={tdCn}>
                  Fully exposed outdoor, marine and corrosive environments where galvanising will
                  not last.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'cable-sizing',
    heading: 'Cable Sizing on Basket: BS 7671 Appendix 4',
    content: (
      <>
        <p>
          Start from the tabulated current-carrying capacity (I<sub>t</sub>) for your cable type in
          the Reference Method E or F column of the relevant Appendix 4 table, then apply the
          correction factors that actually bear on a basket installation.
        </p>
        <div className={tableWrapCn + ' my-4'}>
          <table className="w-full min-w-[32rem] text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06]">
                <th className={thCn}>Factor</th>
                <th className={thCn}>What it corrects for</th>
                <th className={thCn}>BS 7671 source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className={tdKeyCn}>
                  C<sub>a</sub>
                </td>
                <td className={tdCn}>
                  Ambient temperature above 30&deg;C (ceiling voids, plant rooms)
                </td>
                <td className={tdCn}>Appendix 4, Table 4B1</td>
              </tr>
              <tr>
                <td className={tdKeyCn}>
                  C<sub>g</sub>
                </td>
                <td className={tdCn}>Grouping — mutual heating from other circuits on the basket</td>
                <td className={tdCn}>
                  Table 4C4 (multicore, Method E) / Table 4C5 (single-core, Method F)
                </td>
              </tr>
              <tr>
                <td className={tdKeyCn}>
                  C<sub>i</sub>
                </td>
                <td className={tdCn}>
                  Contact with thermal insulation where cables leave the basket
                </td>
                <td className={tdCn}>Reg 523.9; Appendix 4 Section 2.6</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={cardCn + ' my-4'}>
          <dl className="space-y-4 text-white">
            <div>
              <dt className="font-semibold">
                C<sub>a</sub> — ambient temperature
              </dt>
              <dd className="mt-1">
                Where the ambient temperature in the ceiling void or plant room exceeds 30&deg;C,
                apply the factor from Table 4B1. For 70&deg;C thermoplastic (PVC) cables at 40&deg;C
                ambient, C<sub>a</sub> = 0.87. Table 4B1 stops at 60&deg;C for that insulation —
                above that the entry is a dash and a different cable type is needed.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">
                C<sub>g</sub> — grouping (the one that bites)
              </dt>
              <dd className="mt-1">
                Because basket is rated as free air, the grouping factor comes from Appendix 4 Table
                4C4 for multicore cables (Reference Method E) or Table 4C5 for circuits of
                single-core cables (Reference Method F) — <strong>not</strong> the bunched and
                enclosed factors in Table 4C1, which are more severe and do not apply here. The
                free-air tables are read against the number of cables, the number of tiers of tray
                or ladder, and whether the cables are touching or spaced; the factor falls as any of
                those increases. Look up the value for your actual arrangement rather than carrying
                a remembered figure — on a loaded basket this derating, not the fill percentage, is
                what forces an upsize.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">
                C<sub>i</sub> — thermal insulation
              </dt>
              <dd className="mt-1">
                Does not normally apply on open basket, but does apply if cables leave the basket
                and pass through or touch thermal insulation. Regulation 523.9 requires a cable
                totally surrounded by insulation over 0.5m or more to be taken at 0.5 times its
                Reference Method C rating; for lengths under 0.5m the factors in Appendix 4 Section
                2.6 apply, for conductor sizes up to 10mm&sup2;.
              </dd>
            </div>
          </dl>
        </div>

        <h3 className="pt-2 text-base font-semibold text-white">Putting it together</h3>
        <p>
          The derated capacity is I<sub>z</sub> = I<sub>t</sub> &times; C<sub>a</sub> &times; C
          <sub>g</sub> (&times; C<sub>i</sub> where it applies). Regulation 433.1.1 then requires
          the protective device to satisfy I<sub>b</sub> &le; I<sub>n</sub> &le; I<sub>z</sub> — the
          rated current of the device must be at least the design current of the circuit and must
          not exceed the lowest current-carrying capacity of any conductor in it. Regulation
          433.1.1(c) adds that the current causing effective operation of the device must not exceed
          1.45 &times; I<sub>z</sub>.
        </p>
      </>
    ),
  },
  {
    id: 'support-requirements',
    heading: 'Support Requirements for Wire Cable Basket',
    content: (
      <>
        <p>
          Wire cable basket must be supported well enough to prevent deflection under cable loading;
          because the mesh is flexible it will sag more than rigid pressed steel tray if supports are
          too far apart. BS 7671 does not tabulate spacing for containment — the figures below are
          typical manufacturer guidance, and you should confirm them against the load/span table for
          the series and the cable load you are actually installing.
        </p>
        <div className={tableWrapCn + ' my-4'}>
          <table className="w-full min-w-[30rem] text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06]">
                <th className={thCn}>Location</th>
                <th className={thCn}>Typical max support spacing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className={tdKeyCn}>Horizontal straight run (CF54, standard load)</td>
                <td className={tdCn}>1500mm centres</td>
              </tr>
              <tr>
                <td className={tdKeyCn}>Heavily loaded or wide basket</td>
                <td className={tdCn}>1200mm or 1000mm centres</td>
              </tr>
              <tr>
                <td className={tdKeyCn}>Either side of a bend, tee or direction change</td>
                <td className={tdCn}>Within 300mm of the fitting</td>
              </tr>
              <tr>
                <td className={tdKeyCn}>Vertical run</td>
                <td className={tdCn}>1200mm centres, plus cleats or ties for cable weight</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="pt-2 text-base font-semibold text-white">
          Regulation 521.10.202 — support in fire
        </h3>
        <p>
          Regulation 521.10.202 requires wiring systems to be supported such that they will not be
          liable to premature collapse in the event of a fire. It applies throughout the
          installation, not only on escape routes.
        </p>
        <div className={cardCn + ' my-4'}>
          <dl className="space-y-4 text-white">
            <div>
              <dt className="font-semibold">Steel basket is deemed to comply</dt>
              <dd className="mt-1">
                NOTE 2 to the regulation states that cables installed in or on steel cable
                containment systems are deemed to meet its requirements — which is a strong argument
                for steel basket over non-metallic containment on any route where fire performance
                is scrutinised.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Plastic clips and ties cannot be the sole support</dt>
              <dd className="mt-1">
                NOTE 3 states that the regulation precludes the use of non-metallic cable clips or
                cable ties as the sole means of support, including where cables are suspended under
                cable tray. Use steel or copper clips, saddles or ties (NOTE 4), and keep the
                hangers and fixings metallic too.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">It is not a circuit-integrity requirement</dt>
              <dd className="mt-1">
                NOTE 5 is explicit that the intent is to prevent general collapse of wiring systems
                that would hinder evacuation, rescue or firefighter access — not to maintain circuit
                integrity for life safety or firefighting. Those requirements sit in Chapter 56 and
                in BS 5266, BS 5839 and BS 8519.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Support the joints, not just the spans</dt>
              <dd className="mt-1">
                Joints are the weakest point in a basket run, so position supports close to every
                connector and fitting rather than at mid-span only. Threaded rod hangers with the
                manufacturer&apos;s brackets are the usual method for suspended runs; wall brackets
                and ceiling clips for surface work. Fix into structural elements, not lightweight
                partitions.
              </dd>
            </div>
          </dl>
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
          Wire cable basket is a metallic cable management system — part of the wiring system, so
          not an extraneous-conductive-part, which BS 7671 Part 2 defines as a conductive part
          liable to introduce a potential and <em>not</em> forming part of the electrical
          installation. Regulation 543.2.1(f) recognises a metal conduit, metallic cable management
          system or other electrically continuous support system for conductors as something that
          may serve as a protective conductor, which is why continuity across the whole run matters
          and why it is bonded back to the main earthing terminal.
        </p>
        <div className={cardCn + ' my-4'}>
          <dl className="space-y-4 text-white">
            <div>
              <dt className="font-semibold">Bond at every joint</dt>
              <dd className="mt-1">
                Fit an earth bond at every connection between basket sections. The mechanical joint
                alone cannot be relied on for continuity — mesh-to-mesh contact through a galvanised
                finish can be a high resistance. Cablofil and other manufacturers supply clip-on
                earth bond connectors that attach to the wire mesh without drilling, which is
                appreciably quicker than the bolted bonds used on pressed steel tray.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Size the conductor from Table 54.7 or the adiabatic</dt>
              <dd className="mt-1">
                Regulation 543.1.1 gives two routes: calculate to Regulation 543.1.3 (the adiabatic
                equation, valid for disconnection times up to 5s), or select from Table 54.7 under
                Regulation 543.1.4. Where Table 54.7 produces a non-standard size, the next larger
                standard size is used. Where the protective conductor is a separate conductor rather
                than part of a cable, formed by conduit/ducting/trunking, or contained in an
                enclosure formed by a wiring system, Regulation 543.1.1 sets a floor of 2.5mm&sup2;
                copper equivalent if mechanically protected and 4mm&sup2; if not.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Keep connections accessible</dt>
              <dd className="mt-1">
                Regulation 543.3.2 requires every connection and joint in a protective conductor to
                be accessible for inspection, testing and maintenance, except as allowed by
                Regulation 526.3. Plan bond positions so they are not buried behind later
                trades&apos; work. Make the system earth connection at the origin of the basket run,
                nearest the distribution board or panel.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Test and record the continuity</dt>
              <dd className="mt-1">
                Regulation 643.2.1(a) requires the continuity of conductors and of connections to
                exposed-conductive-parts and extraneous-conductive-parts to be verified by a
                measurement of resistance of the protective conductors, including protective bonding
                conductors. In practice, test with a low-resistance ohmmeter between the origin
                earth connection and remote sections of basket; a well-bonded system reads a
                fraction of an ohm. Record the readings on the schedule of test results.
              </dd>
            </div>
          </dl>
        </div>
      </>
    ),
  },
  {
    id: 'segregation',
    heading: 'Power and Data Separation on Basket',
    content: (
      <>
        <p>
          Run power and data on separate basket wherever the design allows. Regulation 444.6.1
          states that Band II (low voltage) and Band I (extra-low voltage) cables sharing the same
          cable management system or the same route shall be installed according to Regulations
          528.1 and 528.2, and adds that circuits of the same voltage band might also need
          segregating: electrical safety and electromagnetic compatibility can produce different
          requirements, and the design must meet both.
        </p>
        <p>
          Regulation 528.1 sets out the permitted methods, one of which — item (d) — is cables
          installed on a cable tray system where physical separation is provided by a partition. So
          a divider down a shared basket is an explicitly recognised arrangement. (Regulation 528.2
          is often mis-cited here: it deals with crossings and proximity of <em>underground</em>{' '}
          telecommunication and power cables, where a minimum 100mm clearance or a fire-retardant
          partition is required. Its NOTE 2 is the useful part above ground — it points to BS 6701
          and the BS EN 50174 series for communications segregation.)
        </p>

        <h3 className="pt-2 text-base font-semibold text-white">
          How much separation — Annex A444
        </h3>
        <p>
          Where the specification and intended application of the data cable are known, BS 7671
          directs you to BS EN 50174-2 and BS EN 50174-3. Where they are not, informative Annex A444
          recommends a minimum of 200mm in free air, reducible according to the containment used on
          the power cabling:
        </p>
        <div className={tableWrapCn + ' my-4'}>
          <table className="w-full min-w-[32rem] text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06]">
                <th className={thCn}>Containment on the power cabling</th>
                <th className={thCn}>Minimum separation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className={tdKeyCn}>
                  No containment, or open metallic containment (A)
                  <span className="mt-1 block font-normal">
                    Screening equivalent to welded mesh steel basket of 50mm x 100mm mesh (ladders
                    excluded), or steel tray under 1.0mm wall with more than 20% perforation
                  </span>
                </td>
                <td className={tdCn}>200mm</td>
              </tr>
              <tr>
                <td className={tdKeyCn}>
                  Perforated open metallic containment (B)
                  <span className="mt-1 block font-normal">
                    Steel tray of 1.0mm wall thickness with no more than 20% perforation
                  </span>
                </td>
                <td className={tdCn}>150mm</td>
              </tr>
              <tr>
                <td className={tdKeyCn}>
                  Solid metallic containment (C)
                  <span className="mt-1 block font-normal">
                    Fully enclosed steel containment, minimum 1.5mm wall thickness
                  </span>
                </td>
                <td className={tdCn}>
                  No physical separation beyond that provided by the containment
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Two practical points from the notes to that table: no part of a cable within the
          containment should sit less than 10mm below the top of the barrier, and the separation for
          solid containment is in addition to anything provided by a divider or barrier. Annex A444
          is informative, and its recommendations assume the design current in the LV circuits does
          not exceed 600A among other conditions — so on a large distribution basket, check the
          assumptions hold before leaning on the reduced figures.
        </p>
        <p>
          Separately, Regulation 444.6.2 requires a minimum distance of 130mm between information
          and communications technology cables and discharge, neon and mercury vapour (or other
          high-intensity discharge) lamps, with low energy lamps counted as discharge sources.
        </p>
      </>
    ),
  },
  {
    id: 'advantages',
    heading: 'Advantages over Solid Cable Tray',
    content: (
      <>
        <p>
          Wire basket has become the default in UK data centres, server rooms and exposed-ceiling
          commercial fit-outs. The reasons are practical rather than regulatory.
        </p>
        <div className={cardCn + ' my-4'}>
          <dl className="space-y-4 text-white">
            <div>
              <dt className="font-semibold">Airflow around the cables</dt>
              <dd className="mt-1">
                The open mesh lets air circulate on all sides, which is what puts the installation in
                the free-air reference methods and keeps localised heat out of tightly bunched
                groups. In raised-floor data centres the same property keeps the under-floor plenum
                clear.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">On-site flexibility</dt>
              <dd className="mt-1">
                Cut with side cutters, crop with bolt croppers, form with the manufacturer&apos;s
                bending tool or over a former. No metal saw or angle grinder needed, so route
                changes and additions happen the same day rather than waiting on factory fittings.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Cable identification</dt>
              <dd className="mt-1">
                Cables are visible from below, above and through the sides, which makes fault-finding
                and later additions far quicker than in enclosed conduit or lidded trunking. In data
                centres the same basket carries overhead power distribution and Cat6/Cat6A
                structured cabling on separate runs.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Gentler on cable sheaths</dt>
              <dd className="mt-1">
                Round wire presents a smooth surface to the sheath. Cut sections of pressed steel
                tray leave sharp edges that need dressing before cables are pulled over them.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Appearance</dt>
              <dd className="mt-1">
                Exposed-services ceilings are commonly specified with wire basket rather than solid
                tray, and it is available in powder-coat finishes for projects where the services
                are part of the architecture.
              </dd>
            </div>
          </dl>
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
          Wire basket generally costs more per metre in material than equivalent pressed steel
          perforated tray, and that premium has to be weighed against the labour saving. The figures
          below are indicative market guidance to frame the trade-off — they are not a quote, and
          installed cost varies by project, route complexity and supplier.
        </p>
        <div className={tableWrapCn + ' my-4'}>
          <table className="w-full min-w-[32rem] text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06]">
                <th className={thCn}>Factor</th>
                <th className={thCn}>Wire basket vs perforated tray</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className={tdKeyCn}>Material cost per metre</td>
                <td className={tdCn}>
                  Typically ~20&ndash;40% higher than equivalent HDG perforated tray
                </td>
              </tr>
              <tr>
                <td className={tdKeyCn}>Installation labour</td>
                <td className={tdCn}>
                  Often ~15&ndash;30% lower on complex routes — on-site cutting and bending, clip-on
                  earth bonds, faster cable laying
                </td>
              </tr>
              <tr>
                <td className={tdKeyCn}>Programme</td>
                <td className={tdCn}>
                  Faster on fast-track fit-outs; routes adapt on site without waiting for factory
                  fittings
                </td>
              </tr>
              <tr>
                <td className={tdKeyCn}>Where tray still wins</td>
                <td className={tdCn}>
                  Long straight runs, cables needing protection from below, fixed routes that will
                  not change
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          On a large project with hundreds of metres the material premium is real, but the labour
          and programme savings can partially or fully offset it — so compare on a project-specific
          installed-cost basis rather than headline material price. Where routes are long, straight
          and unlikely to change, pressed steel solid-bottom or perforated tray is often better
          value. See the{' '}
          <SEOInternalLink href="/cable-tray-installation">
            cable tray installation guide
          </SEOInternalLink>{' '}
          for the direct comparison.
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
          Commercial work on basket needs the same certification as any other installation: earth
          continuity of the containment verified and recorded under Regulation 643.2.1, the grouping
          factors actually applied to the cable sizing, and power/data separation evidenced. Record
          the continuity readings on the schedule of test results rather than leaving them as a tick.
        </p>
        <SEOAppBridge
          title="Complete commercial installation certificates on your phone"
          description="Record test results, earth continuity readings and circuit details on site with the Elec-Mate EIC and EICR apps, and generate the PDF before you leave."
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
      title="Wire Cable Basket Sizes: 50-600mm, Method E/F"
      description="Cable basket widths run 50-600mm (100/150/200/300/450mm common), 54mm standard depth, typical supports 1500mm centres. Free air: Reference Method E or F."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Layers}
      answerBox={{
        question: 'What is wire cable basket and what is it used for?',
        answer:
          'Wire cable basket is a cable management system made from welded steel wire mesh formed into a channel. It is a lighter, faster-to-install alternative to pressed steel cable tray, used to route power and data cables in commercial buildings and data centres. Its open mesh gives excellent airflow, easy cable identification and on-site flexibility. Like all metallic cable management, it must be earthed.',
        detail:
          'Cables on basket are rated as being in free air. BS 7671 Appendix 4 takes the current-carrying capacity for cables on a perforated tray — holes covering at least 30% of the base — or on a cable ladder as Reference Method E or F.',
      }}
      heroTitle={
        <>
          Wire Cable Basket Installation UK:{' '}
          <span className="text-elec-yellow">Wiremesh Tray Guide</span>
        </>
      }
      heroSubtitle="Everything electricians need on wire cable basket (Cablofil type) — sizes and finishes, the reference method and grouping factors that drive cable sizing, support spacing, earthing, power/data separation and cost against solid tray."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Wire Cable Basket"
      relatedPages={relatedPages}
      ctaHeading="Complete Commercial Certificates on Your Phone"
      ctaSubheading="Join 1,600+ UK electricians using Elec-Mate to certify commercial cable basket installations on site. Record test results and earth continuity — instant PDF export. 7-day free trial."
    />
  );
}
