import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calculator,
  BookOpen,
  Brain,
  Cable,
  Zap,
  Layers,
  ClipboardCheck,
} from 'lucide-react';

export default function ElectricalConduitsGuidePage() {
  return (
    <GuideTemplate
      title="Electrical Conduit Guide | Types, Sizing & Installation"
      description="Complete guide to electrical conduit for UK installations. PVC conduit, galvanised steel conduit, flexible conduit, sizes, bending techniques, draw wires, conduit fill calculation, BS 7671 requirements, and installation best practice for domestic and commercial work."
      datePublished="2025-06-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Installation', href: '/guides' },
        { label: 'Conduit Guide', href: '/guides/electrical-conduit-guide' },
      ]}
      tocItems={[
        { id: 'overview', label: 'What Is Electrical Conduit?' },
        { id: 'pvc-conduit', label: 'PVC Conduit' },
        { id: 'steel-conduit', label: 'Steel Conduit' },
        { id: 'flexible-conduit', label: 'Flexible Conduit' },
        { id: 'sizing', label: 'Conduit Sizing & Fill' },
        { id: 'bending', label: 'Bending Techniques' },
        { id: 'installation', label: 'Installation Best Practice' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Installation Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Electrical Conduit Guide
          <br />
          <span className="text-yellow-400">Types, Sizing & Installation</span>
        </>
      }
      heroSubtitle="Electrical conduit provides mechanical protection and a neat, professional containment system for cables in domestic, commercial, and industrial installations. This guide covers PVC conduit, galvanised steel conduit, flexible conduit, sizing and fill calculations, bending techniques, and installation best practice to BS 7671."
      readingTime={13}
      keyTakeaways={[
        'PVC conduit is the most common type for domestic and light commercial work — available in round (20 mm, 25 mm, 32 mm) and oval (16 mm, 20 mm) sizes, it is easy to bend, cut, and install, and does not require earthing.',
        'Galvanised steel conduit (GI conduit) is used in commercial, industrial, and hazardous area installations. It provides superior mechanical protection and can serve as the CPC when installed with proper continuity at all joints.',
        'Conduit fill calculation determines the maximum number of cables that can be drawn into a conduit run. BS 7671 limits conduit fill to 40% of the internal cross-sectional area to allow heat dissipation and prevent cable damage during installation.',
        'Bending conduit correctly requires practice — use a conduit bending spring for PVC and a proper conduit bender (Hilmor or similar) for steel. Avoid kinks and maintain the minimum bending radius to prevent cable damage.',
        'Elec-Mate includes a conduit fill calculator that checks cable capacity for all standard conduit sizes, cable types, and combinations — essential for commercial and industrial installation design.',
      ]}
      sections={[
        {
          id: 'overview',
          heading: 'What Is Electrical Conduit?',
          content: (
            <>
              <p>
                Electrical conduit is a tube or channel used to protect and route electrical cables
                within a building or structure. It serves three primary purposes: mechanical
                protection of the cables from physical damage, providing a defined cable route for
                neat and professional installation, and in some cases, acting as the circuit
                protective conductor (CPC) for the circuits it contains.
              </p>
              <p>
                Conduit is classified as a wiring system under BS 7671 Chapter 52, which sets out
                the requirements for the selection and erection of wiring systems. The choice of
                conduit type, size, and installation method depends on the environment (indoor or
                outdoor, domestic or industrial), the number and type of cables to be contained, the
                required level of mechanical protection, and any specific environmental conditions
                such as temperature, moisture, or chemical exposure.
              </p>
              <p>
                In the UK, the three main types of conduit used in electrical installations are PVC
                (polyvinyl chloride) conduit, galvanised steel (GI) conduit, and flexible conduit.
                Each has distinct characteristics, advantages, and applications. Understanding when
                to use each type — and how to size and install it correctly — is fundamental to
                professional electrical installation work.
              </p>
              <SEOInternalLink href="/guides/trunking-installation-guide">
                See our trunking installation guide
              </SEOInternalLink>{' '}
              for the alternative containment system used where larger cable capacities or
              surface-mounted distribution is required.
            </>
          ),
        },
        {
          id: 'pvc-conduit',
          heading: 'PVC Conduit',
          content: (
            <>
              <p>
                PVC (polyvinyl chloride) conduit is the most widely used conduit type in domestic
                and light commercial electrical installations. It is lightweight, easy to cut and
                bend, corrosion-resistant, and significantly cheaper than steel conduit. PVC conduit
                does not conduct electricity, so it does not require earthing and cannot serve as a
                CPC.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">PVC Conduit Types and Sizes</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Round PVC conduit</strong> — Available in
                      20 mm, 25 mm, and 32 mm nominal sizes (referring to the outside diameter).
                      White or black finish. 20 mm is the standard for domestic installations
                      (lighting and power circuits). 25 mm is used where more cables are needed or
                      where larger cables are run. 32 mm is used for heavy-duty or multi-circuit
                      runs.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Oval PVC conduit</strong> — Available in
                      16 mm and 20 mm sizes. Oval conduit is designed for installation within
                      plastered walls — its flat profile allows it to be channelled into brickwork
                      or blockwork and plastered over without creating excessive depth. It is the
                      standard for first-fix domestic work where cables need to run within walls.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Heavy gauge vs light gauge</strong> — PVC
                      conduit is available in light gauge (for surface mounting where moderate
                      protection is needed) and heavy gauge (for greater impact resistance). Heavy
                      gauge PVC conduit is rated as protection against mechanical impact and is
                      required where the cable route is exposed to potential damage.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                PVC conduit fittings include bends (90-degree and 45-degree), tees, elbows,
                inspection bends, couplers, saddles, and terminal boxes. All joints are made using
                solvent cement (PVC adhesive), which creates a permanent, airtight bond. For some
                applications, push-fit fittings are available that allow easier disassembly but do
                not provide the same seal as solvent-welded joints.
              </p>
              <p>
                A key limitation of PVC conduit is temperature sensitivity. Standard PVC conduit
                becomes brittle at temperatures below minus 5 degrees Celsius and softens above 60
                degrees Celsius. It should not be used in direct sunlight for extended periods (UV
                degradation), near heat sources, or in cold-store environments. For these
                applications, steel conduit or special high-temperature PVC conduit should be used
                instead.
              </p>
            </>
          ),
        },
        {
          id: 'steel-conduit',
          heading: 'Galvanised Steel Conduit',
          content: (
            <>
              <p>
                Galvanised steel (GI) conduit is the standard containment system for commercial,
                industrial, and hazardous area electrical installations. It provides superior
                mechanical protection, fire resistance, and electromagnetic screening compared to
                PVC conduit. The galvanised finish provides corrosion resistance in normal
                environments.
              </p>
              <p>
                Steel conduit is available in 20 mm and 25 mm nominal sizes (the most common for
                general installation work) and 32 mm, 38 mm, and 50 mm for heavy-duty and
                multi-circuit applications. It is supplied in standard 3.75-metre lengths and is
                joined using threaded couplers, locknuts, and bushes.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">Advantages</h3>
                  <ul className="space-y-2 text-white text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        Excellent mechanical protection against impact, crushing, and penetration
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Can serve as the CPC when installed with proper continuity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Fire-resistant — does not burn or produce toxic fumes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Electromagnetic screening for sensitive circuits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        Temperature-stable — operates from minus 25 to over 200 degrees Celsius
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">Considerations</h3>
                  <ul className="space-y-2 text-white text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <span>Heavier and more difficult to handle than PVC</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <span>Requires threading equipment and bending machine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <span>More expensive than PVC conduit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <span>Requires earthing and continuity verification at all joints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <span>
                        Can corrode in aggressive environments (chemical plants, coastal areas)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <p>
                When steel conduit is used as the CPC, all joints must maintain electrical
                continuity. Threaded joints with proper coupling and locknut installation provide
                this continuity. Where the conduit route includes accessories or junction boxes, an
                earth continuity strap or flyover lead should be used to bridge the joint and ensure
                unbroken continuity.
              </p>
            </>
          ),
        },
        {
          id: 'flexible-conduit',
          heading: 'Flexible Conduit',
          content: (
            <>
              <p>
                Flexible conduit provides mechanical protection for cables where a rigid conduit run
                is impractical — typically for the final connection to equipment that vibrates,
                moves, or needs to be repositioned for maintenance. It is used between a rigid
                conduit system and the equipment connection point.
              </p>
              <div className="space-y-4 my-6">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <h3 className="font-bold text-white text-lg mb-2">PVC Flexible Conduit</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Standard PVC flexible conduit (corrugated or smooth bore) provides light to
                    moderate mechanical protection. It is commonly used for final connections to
                    luminaires, small motors, and equipment mounted on vibrating structures.
                    Available in 20 mm, 25 mm, and 32 mm sizes. PVC flexible conduit does not
                    provide an earth continuity path and cannot serve as a CPC.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <h3 className="font-bold text-white text-lg mb-2">
                    Metal Flexible Conduit (Copex)
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    Metal flexible conduit (often called Copex, after a major brand) uses
                    interlocking galvanised steel strip with a PVC outer covering. It provides much
                    better mechanical protection than PVC flexible conduit and can carry an earth
                    continuity path through the interlocking metal construction. Available in sizes
                    from 16 mm to 50 mm. Metal flexible conduit is specified for connections to
                    motors, transformers, and industrial equipment where vibration and movement are
                    present.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <h3 className="font-bold text-white text-lg mb-2">LSZH Flexible Conduit</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Low Smoke Zero Halogen flexible conduit is specified where fire performance and
                    low smoke emission are required — typically in commercial buildings, transport
                    infrastructure, and public buildings. LSZH flexible conduit produces minimal
                    smoke and no toxic halogen gases when exposed to fire.
                  </p>
                </div>
              </div>
              <p>
                Flexible conduit should only be used for the minimum length necessary — it should
                not be used as a substitute for rigid conduit over long runs. The typical maximum
                recommended length for a flexible section is 450 mm to 600 mm, though this depends
                on the application. Always use appropriate adaptors to connect flexible conduit to
                rigid conduit or equipment enclosures.
              </p>
            </>
          ),
        },
        {
          id: 'sizing',
          heading: 'Conduit Sizing and Fill Calculation',
          content: (
            <>
              <p>
                Selecting the correct conduit size is essential for a successful installation. Too
                small, and cables cannot be drawn in without damage. Too large, and the installation
                is unnecessarily expensive and bulky. BS 7671 limits the proportion of conduit
                internal area that can be occupied by cables — this is the conduit fill calculation.
              </p>
              <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-6">
                <h3 className="font-bold text-yellow-400 text-lg mb-3">The 40% Fill Rule</h3>
                <div className="space-y-3 text-white text-sm leading-relaxed">
                  <p>
                    BS 7671 limits conduit fill to approximately 40% of the internal cross-sectional
                    area of the conduit. This 40% maximum applies to the total cross-sectional area
                    of all cables (measured over the insulation) as a proportion of the internal
                    area of the conduit.
                  </p>
                  <p>
                    The 40% limit serves two purposes: it ensures cables can be drawn into the
                    conduit without excessive force (which could damage the insulation), and it
                    provides sufficient air space around the cables for heat dissipation. Cables
                    packed too tightly in a conduit overheat because they cannot dissipate the heat
                    generated by the current flowing through them.
                  </p>
                  <p>
                    For longer conduit runs or runs with multiple bends, a lower fill percentage
                    (typically 35% or even 30%) is advisable to reduce drawing friction and prevent
                    cable damage during installation.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">
                  Conduit Internal Areas (Standard Sizes)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-white">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 pr-4 font-semibold">Conduit Size</th>
                        <th className="text-left py-2 pr-4 font-semibold">Internal Diameter</th>
                        <th className="text-left py-2 pr-4 font-semibold">Internal Area</th>
                        <th className="text-left py-2 font-semibold">40% Fill Area</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4">20 mm PVC</td>
                        <td className="py-2 pr-4">17.1 mm</td>
                        <td className="py-2 pr-4">230 mm squared</td>
                        <td className="py-2">92 mm squared</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4">25 mm PVC</td>
                        <td className="py-2 pr-4">21.2 mm</td>
                        <td className="py-2 pr-4">353 mm squared</td>
                        <td className="py-2">141 mm squared</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4">32 mm PVC</td>
                        <td className="py-2 pr-4">27.6 mm</td>
                        <td className="py-2 pr-4">598 mm squared</td>
                        <td className="py-2">239 mm squared</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4">20 mm Steel</td>
                        <td className="py-2 pr-4">16.1 mm</td>
                        <td className="py-2 pr-4">204 mm squared</td>
                        <td className="py-2">81 mm squared</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4">25 mm Steel</td>
                        <td className="py-2 pr-4">21.1 mm</td>
                        <td className="py-2 pr-4">350 mm squared</td>
                        <td className="py-2">140 mm squared</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <SEOAppBridge
                title="Conduit Fill Calculator"
                description="Elec-Mate's conduit fill calculator instantly determines the maximum number of cables for any conduit size and cable combination. Select the conduit type and size, add the cables, and the calculator shows the fill percentage with a clear pass or fail indication."
                icon={Calculator}
              />
            </>
          ),
        },
        {
          id: 'bending',
          heading: 'Bending Techniques',
          content: (
            <>
              <p>
                The ability to produce neat, accurate bends in conduit is one of the key skills for
                an electrician. Poor bending results in kinks, flattened sections, and restrictive
                bends that prevent cables from being drawn through and look unprofessional.
              </p>
              <div className="space-y-4 my-6">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">PVC conduit bending</h3>
                      <p className="text-white text-sm leading-relaxed">
                        PVC conduit is bent using heat — either a bending spring inserted into the
                        conduit (for simple bends) or a PVC conduit bending machine that applies
                        heat and pressure simultaneously (for precise, repeatable bends). When using
                        a bending spring, heat the conduit evenly with a hot air gun along the
                        section to be bent, then bend it smoothly around the spring. Allow the
                        conduit to cool completely before removing the spring. Avoid overheating,
                        which causes the PVC to blister and weaken.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">Steel conduit bending</h3>
                      <p className="text-white text-sm leading-relaxed">
                        Steel conduit is bent using a mechanical conduit bender (Hilmor or
                        equivalent). The bender provides leverage and a former that guides the
                        conduit into a smooth curve without kinking. Common bends include 90-degree
                        sets, double sets (for negotiating obstructions), bridge bends (for crossing
                        other conduit runs), and kick bends (for transitioning from horizontal to
                        vertical). Accurate measurement, marking, and bender positioning are
                        essential for producing bends that meet the required dimensions and angles.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">Common bending mistakes</h3>
                      <p className="text-white text-sm leading-relaxed">
                        Kinks occur when the bend is too tight or the bending force is applied at a
                        point rather than distributed along the bend radius. Flattening occurs when
                        the conduit is overbent or bent without proper support. Both defects
                        restrict cable pulling space, increase friction, and can damage cable
                        insulation during installation. If a conduit section is kinked or flattened,
                        it must be replaced — do not attempt to straighten and re-use it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                The minimum bending radius for conduit depends on the type and size. For PVC
                conduit, the minimum internal bending radius is typically 4 times the conduit
                diameter. For steel conduit, the minimum is typically 2.5 times the diameter when
                using a proper bending machine. Always check the manufacturer's specifications for
                the specific conduit type being used.
              </p>
            </>
          ),
        },
        {
          id: 'installation',
          heading: 'Installation Best Practice',
          content: (
            <>
              <p>
                A well-installed conduit system should be mechanically secure, provide a continuous
                and unobstructed path for cable drawing, and present a neat, professional
                appearance. Following installation best practice prevents problems during cable
                pulling and reduces the risk of future cable damage.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">Conduit Installation Rules</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Draw points</strong> — Install inspection
                      bends, tees, or draw boxes at regular intervals along the conduit run to allow
                      cables to be drawn in stages. The maximum distance between draw points depends
                      on the conduit size and the number of bends — as a general rule, no more than
                      two 90-degree bends between draw points, and a maximum straight run of 10 to
                      15 metres.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Draw wires</strong> — Install a draw wire
                      (galvanised steel wire or nylon cord) in the conduit during installation,
                      before the conduit is fixed in its final position. This makes cable pulling
                      much easier than trying to push a draw wire through a completed and fixed
                      conduit run.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Fixings</strong> — Conduit must be
                      securely fixed at regular intervals. For surface-mounted conduit: saddles at
                      every 600 to 900 mm on horizontal runs, 900 to 1200 mm on vertical runs, and
                      within 300 mm of every fitting (bend, tee, box). The conduit should not sag
                      between fixings.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Expansion joints</strong> — PVC conduit
                      expands with temperature changes. On long straight runs (over 6 metres),
                      install an expansion coupling to accommodate thermal expansion and prevent the
                      conduit from bowing or cracking at fixed joints.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Bush at entries</strong> — Where conduit
                      enters a box, panel, or enclosure, fit a bush on the inside of the entry to
                      protect cable insulation from the sharp edge of the conduit or the knockout
                      hole. For steel conduit, a brass or nylon bush is essential to prevent the
                      cable insulation from being cut by the threaded conduit end.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                For commercial and industrial installations, the conduit system is typically
                installed during the first fix phase, before walls are lined and ceilings are
                closed. This allows the conduit to be concealed within the building fabric. For
                surface-mounted conduit in finished buildings (refurbishments, additions), ensure
                the conduit is routed neatly, level and plumb, with consistent fixing centres.
              </p>
              <SEOInternalLink href="/guides/first-fix-electrical">
                First fix electrical guide
              </SEOInternalLink>{' '}
              — covers conduit installation as part of the first fix sequence.
              <SEOAppBridge
                title="AI Installation Guide"
                description="Elec-Mate's AI installer agent provides conduit sizing guidance, bend calculations, and installation sequences. Describe your job and get tailored recommendations for conduit type, size, fixings, and cable routing."
                icon={Brain}
              />
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What size conduit do I need for domestic wiring?',
          answer:
            'For most domestic installations, 20 mm round PVC conduit is the standard. It accommodates the typical domestic cables: three 1.5 mm squared singles (for a lighting circuit) or three 2.5 mm squared singles (for a ring or radial socket circuit) within the 40% fill limit. For heavier circuits (cooker, shower) using larger cables, or where multiple circuits share a conduit run, 25 mm conduit may be needed. Oval PVC conduit (16 mm or 20 mm) is used within plastered walls for channelled-in wiring. Always verify the conduit fill calculation before installation to confirm the cables will fit.',
        },
        {
          question: 'Can PVC conduit be used outdoors?',
          answer:
            'Standard white PVC conduit can be used outdoors for short-term exposure, but it will degrade over time due to UV (ultraviolet) radiation from sunlight, causing it to become brittle and yellow. For permanent outdoor installations, use UV-resistant black PVC conduit, which contains UV stabilisers that significantly slow the degradation process. Alternatively, use galvanised steel conduit for outdoor installations where mechanical protection is also a concern. All outdoor conduit installations should include drainage points at low points in the run to prevent water accumulating inside the conduit.',
        },
        {
          question: 'How many cables can I fit in 20 mm conduit?',
          answer:
            "The number depends on the cable type and size. Using the 40% fill rule for 20 mm PVC conduit (internal area approximately 230 mm squared, 40% fill area approximately 92 mm squared): approximately 7 to 8 individual 1.5 mm squared singles (each approximately 10.8 mm squared including insulation), or approximately 5 to 6 individual 2.5 mm squared singles (each approximately 15.2 mm squared). For twin and earth cables (which are significantly larger in cross-section due to the flat profile), the fill is more restrictive — typically only 1 to 2 twin and earth cables per 20 mm conduit. Elec-Mate's conduit fill calculator gives exact numbers for any cable combination.",
        },
        {
          question: 'Do I need to earth PVC conduit?',
          answer:
            'No. PVC conduit is an insulating material and does not require earthing. It cannot serve as a circuit protective conductor (CPC) because it does not conduct electricity. All cables installed in PVC conduit must include their own CPC — either a separate CPC conductor within the conduit, or a cable type that includes an integral CPC (such as twin and earth cable or singles with a separate earth conductor). If steel conduit is used, it must be earthed and can serve as the CPC provided continuity is maintained at all joints.',
        },
        {
          question: 'What is the maximum number of bends between draw points?',
          answer:
            'The general recommendation is no more than two 90-degree bends (or the equivalent — four 45-degree bends equals two 90-degree bends) between draw points. This limits the friction during cable pulling and prevents excessive force that could damage cable insulation. For long straight runs without bends, the maximum distance between draw points is typically 10 to 15 metres. For runs with tight bends, additional draw points may be needed. Where cable pulling is difficult despite adequate draw points, use cable lubricant (cable pulling compound) to reduce friction — never use washing-up liquid or oil, which can damage PVC cable insulation.',
        },
        {
          question: 'When should I use steel conduit instead of PVC?',
          answer:
            'Steel conduit should be used in the following situations: commercial and industrial installations where higher mechanical protection is needed, where the conduit needs to serve as the CPC (avoiding the need for separate earth conductors), where fire resistance is required (steel does not burn or produce toxic fumes), in hazardous areas (ATEX zones) where sparking from cable damage must be prevented, where electromagnetic screening is required for sensitive circuits, and in environments with extreme temperatures (cold stores, boiler rooms) where PVC would be unsuitable. In domestic work, PVC conduit is almost always adequate unless specific conditions require the additional protection of steel.',
        },
        {
          question: 'Does Elec-Mate have a conduit fill calculator?',
          answer:
            'Yes. Elec-Mate includes a dedicated conduit fill calculator that covers all standard conduit sizes (PVC and steel, round and oval) and all common cable types and sizes. Select the conduit type and size, add the cables you need to install, and the calculator shows the fill percentage with a clear indication of whether the combination is within the 40% limit. The calculator also accounts for the cable cross-sectional area including insulation (not just the conductor area), ensuring accurate fill calculations.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/trunking-installation-guide',
          title: 'Trunking Installation Guide',
          description: 'PVC, metal, and compartmental trunking types and sizing.',
          icon: Layers,
          category: 'Installation',
        },
        {
          href: '/guides/how-to-size-cables-bs-7671',
          title: 'Cable Sizing Guide',
          description: 'BS 7671 cable sizing including singles in conduit.',
          icon: Calculator,
          category: 'Guide',
        },
        {
          href: '/guides/first-fix-electrical',
          title: 'First Fix Electrical',
          description: 'Conduit and cable installation during first fix.',
          icon: Wrench,
          category: 'Installation',
        },
        {
          href: '/guides/swa-cable-installation',
          title: 'SWA Cable Installation',
          description: 'Armoured cable as an alternative to conduit runs.',
          icon: Cable,
          category: 'Installation',
        },
        {
          href: '/guides/reference-methods',
          title: 'Reference Methods Guide',
          description: 'BS 7671 installation methods A to G explained.',
          icon: BookOpen,
          category: 'Guide',
        },
        {
          href: '/tools/conduit-fill-calculator',
          title: 'Conduit Fill Calculator',
          description: 'Instant conduit fill calculation for all sizes.',
          icon: Calculator,
          category: 'Tool',
        },
      ]}
      ctaHeading="Calculate Conduit Fill Instantly"
      ctaSubheading="Elec-Mate's conduit fill calculator, cable sizing tools, and digital certificates support every commercial and domestic conduit installation. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
