import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Layers,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calculator,
  BookOpen,
  Brain,
  Cable,
  Zap,
  Wrench,
  ClipboardCheck,
  Grid3X3,
} from 'lucide-react';

export default function TrunkingInstallationGuidePage() {
  return (
    <GuideTemplate
      title="Trunking Installation Guide | Types & Sizing UK"
      description="Complete guide to electrical trunking for UK installations. PVC trunking, metal trunking, dado trunking, skirting trunking, mini trunking, compartmental trunking, sizing calculations, segregation rules, BS 7671 requirements, and installation best practice."
      datePublished="2025-06-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Installation', href: '/guides' },
        { label: 'Trunking Guide', href: '/guides/trunking-installation-guide' },
      ]}
      tocItems={[
        { id: 'overview', label: 'What Is Electrical Trunking?' },
        { id: 'pvc-trunking', label: 'PVC Trunking' },
        { id: 'metal-trunking', label: 'Metal Trunking' },
        { id: 'specialised', label: 'Specialised Trunking Types' },
        { id: 'sizing', label: 'Trunking Sizing & Fill' },
        { id: 'segregation', label: 'Cable Segregation Rules' },
        { id: 'installation', label: 'Installation Best Practice' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Installation Guide"
      badgeIcon={Layers}
      heroTitle={
        <>
          Trunking Installation Guide
          <br />
          <span className="text-yellow-400">Types & Sizing UK</span>
        </>
      }
      heroSubtitle="Electrical trunking provides a versatile, accessible cable containment system for commercial, industrial, and domestic installations. This guide covers PVC trunking, metal trunking, dado and skirting systems, mini trunking, compartmental trunking for cable segregation, sizing calculations, and installation best practice to BS 7671."
      readingTime={12}
      keyTakeaways={[
        'Trunking fill calculation uses the 45% space factor rule — the total cross-sectional area of all cables must not exceed 45% of the trunking internal usable space, ensuring cables can be laid in and withdrawn without damage.',
        'BS 7671 Regulation 528.1 requires segregation of circuits at different voltages or from different sources. Compartmental trunking provides physical barriers between cable categories without needing separate containment systems.',
        'Metal trunking can serve as the CPC when all joints maintain electrical continuity. A separate CPC is still recommended as a supplementary measure for reliability.',
        'Dado trunking combines power, data, and telecommunications in a single system at desk height — the standard solution for commercial office fit-outs.',
        'Elec-Mate includes a trunking fill calculator that handles all standard trunking sizes and cable types, plus digital certificates for documenting commercial installations.',
      ]}
      sections={[
        {
          id: 'overview',
          heading: 'What Is Electrical Trunking?',
          content: (
            <>
              <p>
                Electrical trunking is a rectangular or square-section enclosure used to contain and
                protect electrical cables. Unlike{' '}
                <SEOInternalLink href="/guides/electrical-conduit-guide">conduit</SEOInternalLink>,
                which uses a round tube through which cables must be pulled or drawn, trunking has a
                removable lid or cover that allows cables to be laid in from the top or side. This
                makes trunking significantly easier to install cables into, and more importantly,
                easier to add, remove, or modify cables after the initial installation.
              </p>
              <p>
                Trunking is classified as a wiring system under BS 7671 Chapter 52 and is widely
                used in commercial, industrial, and domestic installations. It is particularly
                common in office fit-outs, retail premises, schools, hospitals, and any environment
                where cable routes need to be accessible for future modifications.
              </p>
              <p>
                The main types of trunking used in UK electrical installations are PVC trunking,
                galvanised steel (metal) trunking, dado (perimeter) trunking, skirting trunking,
                mini trunking, and compartmental trunking. Each type is designed for specific
                applications and environments.
              </p>
              <p>
                Trunking is available in a wide range of sizes, from 16 mm by 16 mm mini trunking
                for a single data cable up to 300 mm by 300 mm heavy-duty metal trunking for main
                cable distribution routes in large commercial and industrial buildings.
              </p>
            </>
          ),
        },
        {
          id: 'pvc-trunking',
          heading: 'PVC Trunking',
          content: (
            <>
              <p>
                PVC trunking is the most common type for domestic and light commercial
                installations. It is lightweight, easy to cut and fit, requires no earthing, and is
                available in white, black, and woodgrain finishes. PVC trunking is non-conductive,
                so it cannot serve as a CPC, and all cables within it must include their own
                protective conductor.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">Common PVC Trunking Sizes</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Mini trunking (16 x 16 mm to 40 x 25 mm)
                      </strong>{' '}
                      — Used for individual cable runs, data cables, telephone wiring, and small
                      domestic installations. Self-adhesive backing is available for quick
                      installation on smooth surfaces without drilling.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Standard trunking (40 x 40 mm to 100 x 50 mm)
                      </strong>{' '}
                      — The workhorse size range for most commercial installations. Accommodates
                      multiple power and data circuits. Used for cable distribution routes along
                      walls and ceilings in offices, shops, and public buildings.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Large trunking (100 x 100 mm and above)
                      </strong>{' '}
                      — Used for main distribution routes in larger commercial and light industrial
                      installations. Available up to 150 x 150 mm in PVC, though for larger sizes
                      metal trunking is generally preferred for its greater rigidity and mechanical
                      protection.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                PVC trunking fittings include internal and external angles, flat angles, tees, end
                caps, couplers, and accessory boxes (for mounting socket outlets and data points
                directly into the trunking). All major manufacturers produce comprehensive fitting
                ranges that allow the trunking to follow complex routes while maintaining a neat,
                professional appearance.
              </p>
              <p>
                PVC trunking has similar temperature limitations to PVC conduit — it should not be
                used in environments where temperatures regularly exceed 60 degrees Celsius or fall
                below minus 5 degrees Celsius. For these environments, metal trunking or specialist
                high-temperature trunking should be specified.
              </p>
            </>
          ),
        },
        {
          id: 'metal-trunking',
          heading: 'Metal Trunking',
          content: (
            <>
              <p>
                Galvanised steel trunking is the standard containment system for commercial and
                industrial cable distribution. It provides superior mechanical protection, fire
                resistance, and can serve as a CPC when properly installed with continuity at all
                joints. Metal trunking is also required in certain applications where
                electromagnetic screening of cables is needed.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">Advantages</h3>
                  <ul className="space-y-2 text-white text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        Superior mechanical protection — impact, crushing, and penetration
                        resistance
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Can serve as the CPC when continuity is maintained at all joints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Fire-resistant — does not burn, melt, or produce toxic fumes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        Greater rigidity — spans longer distances between fixings without sagging
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        Available in large sizes — up to 300 x 300 mm for main distribution routes
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">Considerations</h3>
                  <ul className="space-y-2 text-white text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <span>Heavier than PVC — requires more substantial fixings and brackets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <span>Sharp edges — cable insulation can be damaged during installation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <span>Requires earthing and continuity checking at every joint</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <span>Higher cost than PVC trunking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <span>Can corrode in wet or chemically aggressive environments</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p>
                When using metal trunking as the CPC, every joint, bend, and tee must provide
                verified electrical continuity. Many trunking manufacturers supply pre-galvanised
                trunking with integral earth bonding straps at joints. Where this is not provided,
                separate earth continuity straps or bonding conductors must be installed across each
                joint. The continuity of the trunking CPC must be verified during initial testing.
              </p>
              <p>
                Metal trunking with lid access from the top or front is used for cable distribution
                routes. Cable ladder and cable tray systems (open metalwork supports without covers)
                are used in plant rooms, risers, and industrial settings where cable access and
                ventilation are priorities over enclosure protection.
              </p>
            </>
          ),
        },
        {
          id: 'specialised',
          heading: 'Specialised Trunking Types',
          content: (
            <>
              <p>
                Beyond standard PVC and metal trunking, several specialised trunking types are
                designed for specific applications and environments.
              </p>
              <div className="space-y-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-2">
                    Dado Trunking (Perimeter Trunking)
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    Dado trunking is a multi-compartment system designed to run around the perimeter
                    of a room at desk height (typically 800 to 1000 mm above floor level). It
                    provides a surface-mounted distribution system for power, data, and telephone
                    services without the need for floor boxes or under-floor wiring. Dado trunking
                    typically has 2 or 3 compartments — one for mains power cables, one for
                    data/network cables, and one for telephone or other low-voltage services. The
                    compartments are physically separated by internal dividers that provide the
                    cable segregation required by BS 7671.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-2">Skirting Trunking</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Skirting trunking replaces the conventional timber skirting board with a
                    trunking profile that looks like a skirting board but contains cable
                    compartments. It runs at floor level around the room perimeter and is commonly
                    used in domestic and residential refurbishments where a neat, unobtrusive cable
                    distribution system is needed. Skirting trunking typically has 2 compartments —
                    one for power cables and one for data or telephone cables.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-2">Floor Trunking</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Floor trunking is installed within or beneath the floor structure to provide
                    cable distribution routes across open-plan floor areas. It feeds floor boxes
                    (service outlets) that provide power, data, and telephone connections at
                    individual desk positions. Floor trunking is cast into concrete floor slabs
                    during construction or installed in raised access floor voids. It is the
                    standard solution for modern open-plan offices.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-2">Lighting Trunking</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Lighting trunking is a specialised system that combines cable containment with
                    luminaire mounting. The trunking carries the lighting circuit cables and
                    provides built-in adaptor plates for mounting fluorescent or LED luminaires
                    directly onto the trunking. This eliminates the need for separate cable
                    management and luminaire mounting points. Lighting trunking is widely used in
                    commercial and industrial environments — warehouses, production facilities,
                    retail spaces, and offices.
                  </p>
                </div>
              </div>
              <SEOInternalLink href="/guides/led-downlight-installation">
                LED downlight installation
              </SEOInternalLink>{' '}
              covers luminaire connections and fire-rated fittings used with trunking-fed lighting
              circuits.
            </>
          ),
        },
        {
          id: 'sizing',
          heading: 'Trunking Sizing and Fill Calculation',
          content: (
            <>
              <p>
                Trunking sizing follows a similar principle to conduit fill calculation, but with a
                slightly different space factor. For trunking, the maximum cable fill is 45% of the
                usable internal cross-sectional area (compared to 40% for conduit). The higher fill
                percentage is acceptable because cables are laid into trunking from the open top
                rather than pulled through, reducing the risk of installation damage.
              </p>
              <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-6">
                <h3 className="font-bold text-yellow-400 text-lg mb-3">
                  The 45% Space Factor Rule
                </h3>
                <div className="space-y-3 text-white text-sm leading-relaxed">
                  <p>
                    The total cross-sectional area of all cables (measured over the insulation) must
                    not exceed 45% of the usable internal cross-sectional area of the trunking. This
                    ensures cables can be laid in neatly, withdrawn for maintenance, and new cables
                    added in future without excessive disturbance to existing cables.
                  </p>
                  <p>
                    The usable internal area is the actual space available after accounting for
                    internal dividers, cable ties, and any other fittings that reduce the available
                    space. For compartmental trunking, calculate the fill for each compartment
                    separately.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">
                  Common Trunking Sizes and Capacity
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-white">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 pr-4 font-semibold">Trunking Size</th>
                        <th className="text-left py-2 pr-4 font-semibold">Internal Area</th>
                        <th className="text-left py-2 pr-4 font-semibold">45% Fill Area</th>
                        <th className="text-left py-2 font-semibold">Approx. 2.5 mm sq Singles</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4">25 x 16 mm</td>
                        <td className="py-2 pr-4">265 mm sq</td>
                        <td className="py-2 pr-4">119 mm sq</td>
                        <td className="py-2">7</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4">40 x 25 mm</td>
                        <td className="py-2 pr-4">700 mm sq</td>
                        <td className="py-2 pr-4">315 mm sq</td>
                        <td className="py-2">20</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4">50 x 50 mm</td>
                        <td className="py-2 pr-4">1,936 mm sq</td>
                        <td className="py-2 pr-4">871 mm sq</td>
                        <td className="py-2">57</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4">100 x 50 mm</td>
                        <td className="py-2 pr-4">4,096 mm sq</td>
                        <td className="py-2 pr-4">1,843 mm sq</td>
                        <td className="py-2">121</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4">150 x 75 mm</td>
                        <td className="py-2 pr-4">9,588 mm sq</td>
                        <td className="py-2 pr-4">4,315 mm sq</td>
                        <td className="py-2">284</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <SEOAppBridge
                title="Trunking Fill Calculator"
                description="Elec-Mate's trunking fill calculator covers all standard trunking sizes and cable types. Select the trunking, add your cables, and get instant fill percentage with pass or fail indication. Essential for commercial installation design and certification."
                icon={Calculator}
              />
            </>
          ),
        },
        {
          id: 'segregation',
          heading: 'Cable Segregation Rules',
          content: (
            <>
              <p>
                BS 7671 Regulation 528.1 requires that cables of different voltage bands and cables
                from different systems be segregated to prevent interference and ensure safety.
                Within trunking, segregation is achieved using physical barriers (compartmental
                trunking) or by maintaining defined spacing between cable groups.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">
                  BS 7671 Segregation Requirements
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Band I and Band II circuits</strong> —
                      Extra-low voltage circuits (Band I — SELV, PELV, telecommunications, data)
                      must be segregated from mains voltage circuits (Band II — 230V/400V power)
                      unless the Band I cables are insulated for the highest voltage present. In
                      compartmental trunking, Band I and Band II cables run in separate compartments
                      with a physical barrier between them.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Fire alarm circuits</strong> — BS 5839-1
                      requires that fire alarm cables are segregated from other cables to prevent a
                      fire on non-fire-alarm circuits from damaging the fire alarm wiring. Fire
                      alarm cables must either be in a separate trunking compartment with a
                      fire-resistant barrier or in a completely separate containment system.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Data cables and power cables</strong> —
                      While BS 7671 does not specifically require segregation between data and power
                      cables of the same voltage band, in practice, data cables (particularly
                      unshielded Category 5e and Category 6) should be segregated from power cables
                      to prevent electromagnetic interference that degrades data transmission
                      performance. The typical recommended separation is at least 50 mm or a
                      physical barrier.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Cables from different sources</strong> —
                      Cables supplied from different sources (for example, mains and generator, or
                      mains and UPS) should be segregated to prevent a fault on one system affecting
                      the other. This is particularly important in installations with backup power
                      systems.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Compartmental trunking solves the segregation problem elegantly — a single trunking
                profile with 2 or 3 internal compartments provides separate cable channels with
                physical barriers meeting the segregation requirements of BS 7671. This is
                significantly more cost-effective than running separate trunking systems for each
                cable category.
              </p>
              <SEOInternalLink href="/guides/bs7671-eighteenth-edition">
                BS 7671 18th Edition guide
              </SEOInternalLink>{' '}
              covers the full segregation requirements in detail.
            </>
          ),
        },
        {
          id: 'installation',
          heading: 'Installation Best Practice',
          content: (
            <>
              <p>
                Professional trunking installation requires careful planning, accurate measurement,
                and attention to detail. A well-installed trunking system looks clean and
                professional, provides easy access for future modifications, and maintains cable
                protection throughout its life.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">
                  Trunking Installation Guidelines
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Route planning</strong> — Plan the
                      trunking route to follow logical paths — along walls at a consistent height,
                      parallel to architectural features, and with minimal changes of direction.
                      Avoid routes that cross doorways, windows, or areas where the trunking will be
                      visually intrusive or physically vulnerable.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Fixing centres</strong> — Fix trunking at
                      maximum 600 mm centres for PVC and 900 mm centres for metal trunking. Fix
                      within 150 mm of every joint, bend, and accessory. Ensure fixings are
                      appropriate for the wall or ceiling construction — masonry fixings for brick
                      or block, plasterboard fixings for stud walls, or threaded rod and channel for
                      suspended ceilings.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Joints and fittings</strong> — Use
                      manufacturer fittings for all bends, tees, and junctions. Do not attempt to
                      mitre or cut PVC trunking to create angles — the result will be untidy and may
                      leave sharp edges that damage cable insulation. All fittings should be neatly
                      finished with no gaps or misalignment.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Lid retention</strong> — Ensure trunking
                      lids click securely into place and do not spring open under their own tension.
                      In metal trunking, lid retaining clips or screws prevent lids from falling
                      during maintenance. Check all lids are secure after cable installation.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Fire barriers</strong> — Where trunking
                      passes through fire compartment walls or floors, fire-rated internal barriers
                      must be installed within the trunking at the point of penetration. The barrier
                      must be tested and certified for the trunking type and size. Standard trunking
                      lids do not provide a fire barrier.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                For commercial installations, provide clear labelling on the trunking system
                identifying the cable categories in each compartment and the circuit identification
                of each cable. This is essential for future maintenance and modifications — an
                unlabelled trunking system full of unidentified cables is extremely difficult to
                work with safely.
              </p>
              <SEOAppBridge
                title="Commercial Installation Certificates"
                description="Elec-Mate generates EIC and EICR certificates for commercial installations with full circuit schedules, containment system details, and segregation documentation. Professional PDF output for your clients and building control."
                icon={FileText}
              />
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What is the maximum fill for electrical trunking?',
          answer:
            'The maximum fill for trunking is 45% of the usable internal cross-sectional area. This is the space factor specified in the IET On-Site Guide and is consistent with BS 7671 guidance. The 45% fill allows cables to be laid in neatly, withdrawn for maintenance, and new cables added in future without excessive disturbance. For compartmental trunking, calculate the fill for each compartment separately. The 45% fill for trunking is slightly higher than the 40% fill for conduit because cables are laid into trunking from the top rather than pulled through, reducing installation friction and the risk of insulation damage.',
        },
        {
          question: 'Do I need to segregate power and data cables in trunking?',
          answer:
            'BS 7671 Regulation 528.1 requires segregation between circuits of different voltage bands — Band I (extra-low voltage including data) and Band II (mains voltage). If data cables are not insulated to the mains voltage level, they must be in a separate compartment from power cables with a physical barrier. In practice, most commercial data cables (Cat 5e, Cat 6) are not insulated to 230V standards, so segregation is required. Additionally, even where segregation is not strictly required by BS 7671, separating data cables from power cables prevents electromagnetic interference that can degrade data transmission performance. Compartmental trunking with separate power and data compartments is the standard solution.',
        },
        {
          question: 'Can metal trunking be used as the earth conductor?',
          answer:
            'Yes, metal trunking can serve as the circuit protective conductor (CPC) provided electrical continuity is maintained at every joint, bend, tee, and accessory in the system. The trunking manufacturer should provide earth bonding straps or continuity links at each joint. Where these are not provided, separate earth continuity conductors must be installed across each joint. However, it is good practice to install a separate CPC alongside the circuit cables as a supplementary measure, even when using the trunking as the primary CPC. This provides redundancy and is required by some specifications. The continuity of the trunking CPC must be tested and verified during initial verification.',
        },
        {
          question: 'What is dado trunking and where is it used?',
          answer:
            'Dado trunking is a multi-compartment perimeter trunking system installed at desk height (typically 800 to 1000 mm above floor level) around the walls of a room. It provides surface-mounted distribution for power, data, and telephone services. The trunking typically has 2 or 3 compartments with physical dividers that provide cable segregation. Socket outlets, data points, and telephone outlets are mounted directly into the trunking using purpose-made accessory plates. Dado trunking is the standard solution for commercial office fit-outs where services need to be distributed around the room perimeter without under-floor wiring or floor boxes.',
        },
        {
          question: 'How do I fire-stop trunking through compartment walls?',
          answer:
            'Where trunking passes through a fire compartment wall or floor, a fire-rated internal barrier must be installed within the trunking at the point of penetration. Purpose-made trunking fire barriers are available from manufacturers such as Hilti, Promat, and Quelfire. The barrier must be tested and certified for the specific trunking type, size, and fire rating required (typically 30, 60, or 120 minutes). The barrier fills the internal space of the trunking and is sealed around the cables using intumescent material that expands in a fire to seal any gaps. Simply filling the trunking with cement, fire foam, or standard sealant is not acceptable — the fire stop must be a tested and certified system.',
        },
        {
          question: 'What is the difference between trunking and cable tray?',
          answer:
            'Trunking is an enclosed containment system with a base and a removable lid or cover. It provides full mechanical protection and containment for the cables. Cable tray is an open metalwork support system (either perforated steel or wire mesh) that supports cables from below but does not enclose them. Cable tray is used in plant rooms, risers, ceiling voids, and industrial environments where cable access and ventilation are priorities and where the cables are not exposed to mechanical damage from the general building occupants. Trunking is used in occupied areas where a neat appearance and cable protection are required.',
        },
        {
          question: 'Does Elec-Mate include a trunking fill calculator?',
          answer:
            'Yes. Elec-Mate includes a dedicated trunking fill calculator that covers all standard trunking sizes (PVC and metal) and all common cable types and sizes. Select the trunking type and size, add the cables you need to install, and the calculator shows the fill percentage with a clear pass or fail indication against the 45% space factor rule. For compartmental trunking, you can calculate the fill for each compartment separately. The calculator is essential for commercial installation design and certification.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/electrical-conduit-guide',
          title: 'Electrical Conduit Guide',
          description: 'PVC, steel, and flexible conduit types and sizing.',
          icon: Wrench,
          category: 'Installation',
        },
        {
          href: '/guides/how-to-size-cables-bs-7671',
          title: 'Cable Sizing Guide',
          description: 'BS 7671 cable sizing for singles in containment.',
          icon: Calculator,
          category: 'Guide',
        },
        {
          href: '/tools/trunking-fill-calculator',
          title: 'Trunking Fill Calculator',
          description: 'Instant trunking fill calculation for all sizes.',
          icon: Calculator,
          category: 'Tool',
        },
        {
          href: '/guides/reference-methods',
          title: 'Reference Methods Guide',
          description: 'BS 7671 installation methods for trunking systems.',
          icon: BookOpen,
          category: 'Guide',
        },
        {
          href: '/guides/first-fix-electrical',
          title: 'First Fix Electrical',
          description: 'Trunking installation during the first fix phase.',
          icon: Cable,
          category: 'Installation',
        },
        {
          href: '/guides/bs7671-eighteenth-edition',
          title: 'BS 7671 18th Edition',
          description: 'Full wiring regulations including segregation rules.',
          icon: ShieldCheck,
          category: 'Regulations',
        },
      ]}
      ctaHeading="Design and Document Trunking Installations"
      ctaSubheading="Elec-Mate's trunking fill calculator, cable sizing tools, and commercial certificates support every trunking installation. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
