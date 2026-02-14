import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Flame,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calculator,
  BookOpen,
  Brain,
  Cable,
  Zap,
  Shield,
  ClipboardCheck,
} from 'lucide-react';

export default function FP200CableGuidePage() {
  return (
    <GuideTemplate
      title="FP200 Cable Guide | Fire Performance Cable UK"
      description="Complete guide to FP200 and fire performance cables for UK electrical installations. Fire survival ratings, where fire-resistant cable is required (fire alarm, emergency lighting), installation methods, testing, BS EN 50200, and comparison with MICC cable."
      datePublished="2025-06-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'FP200 Cable', href: '/guides/fp200-cable-guide' },
      ]}
      tocItems={[
        { id: 'what-is-fp200', label: 'What Is FP200 Cable?' },
        { id: 'construction', label: 'Cable Construction' },
        { id: 'where-required', label: 'Where Fire-Resistant Cable Is Required' },
        { id: 'installation', label: 'Installation Methods' },
        { id: 'fire-ratings', label: 'Fire Ratings & Standards' },
        { id: 'testing', label: 'Testing FP200 Installations' },
        { id: 'alternatives', label: 'FP200 Alternatives & Comparisons' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Installation Guide"
      badgeIcon={Flame}
      heroTitle={
        <>
          FP200 Cable Guide
          <br />
          <span className="text-yellow-400">Fire Performance Cable UK</span>
        </>
      }
      heroSubtitle="FP200 cable is the most widely used fire-resistant cable in UK electrical installations. This guide covers its construction, fire survival performance, where fire-resistant cable is required by regulations, installation methods, testing procedures, and how it compares to MICC and other fire performance cables."
      readingTime={11}
      keyTakeaways={[
        'FP200 cable maintains circuit integrity for a minimum of 120 minutes at 830 degrees Celsius (PH120 classification), ensuring fire alarm and emergency lighting circuits continue to function during a fire.',
        'Fire-resistant cable is required by BS 5839-1 for fire alarm mains wiring, BS 5266 for centrally supplied emergency lighting, and where Building Regulations mandate fire-surviving circuits for smoke ventilation and other safety systems.',
        'FP200 uses silicone rubber insulation under an LSZH (Low Smoke Zero Halogen) outer sheath — the silicone forms a ceramic barrier when exposed to fire, maintaining insulation even after the outer sheath burns away.',
        'FP200 cable can be stripped, terminated, and tested using standard methods — unlike MICC cable, it does not require specialised seals or moisture protection.',
        'Elec-Mate includes fire alarm and emergency lighting certificate forms with cable type fields, insulation resistance recording, and BS 5839/BS 5266 compliance validation.',
      ]}
      sections={[
        {
          id: 'what-is-fp200',
          heading: 'What Is FP200 Cable?',
          content: (
            <>
              <p>
                FP200 is a trade name (manufactured by Prysmian, formerly BICC) that has become the
                generic term for fire performance cables in the UK electrical industry. The cable is
                designed to maintain circuit integrity during a fire — it continues to carry current
                and supply connected equipment even while exposed to extreme temperatures and direct
                flame.
              </p>
              <p>
                The cable is used for circuits where maintaining power during a fire is essential
                for life safety: fire detection and alarm systems, emergency lighting, smoke
                ventilation, voice alarm systems, and other safety-critical circuits. Without
                fire-resistant cabling, these circuits would fail within minutes of a fire starting,
                precisely when they are most needed.
              </p>
              <p>
                FP200 cable has become the standard specification for fire-resistant wiring in the
                majority of UK commercial, industrial, and residential installations. It offers a
                practical balance between fire performance (meeting all required standards), ease of
                installation (standard stripping and termination methods), and cost (significantly
                cheaper than{' '}
                <SEOInternalLink href="/guides/micc-cable-guide">
                  MICC mineral insulated cable
                </SEOInternalLink>
                ).
              </p>
              <p>
                Other manufacturers produce equivalent fire performance cables under different trade
                names — Firetuf (AEI Cables), Firesafe (Draka/Prysmian), Firecel (Cleveland Cable),
                and others. These cables are manufactured to the same standards and provide
                equivalent fire performance. The term "FP200" is used generically throughout this
                guide, but the information applies to all BS EN 50200 PH120-rated fire performance
                cables.
              </p>
            </>
          ),
        },
        {
          id: 'construction',
          heading: 'Cable Construction',
          content: (
            <>
              <p>
                FP200 cable uses a multi-layer construction specifically engineered to survive fire
                conditions. Understanding the construction helps explain both its fire performance
                and its handling characteristics.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">
                  FP200 Cable Layers (Inside to Outside)
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Solid copper conductors</strong> — Plain
                      annealed copper, typically 1.5 mm squared or 2.5 mm squared for fire alarm and
                      emergency lighting applications. Available up to 4.0 mm squared for higher
                      current circuits.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Silicone rubber insulation</strong> — Each
                      conductor is insulated with silicone rubber. This is the key fire performance
                      layer — when exposed to fire, the silicone rubber does not burn but instead
                      converts to a ceramic (silicon dioxide) that maintains its insulating
                      properties. The conductors remain electrically separated even when the cable
                      is exposed to direct flame.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Mica glass tape</strong> — A layer of mica
                      glass tape is wrapped around each insulated conductor. Mica is a natural
                      mineral that is chemically stable at temperatures exceeding 1,000 degrees
                      Celsius. This tape provides an additional fire barrier and mechanical support
                      for the ceramic insulation layer formed from the silicone.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Circuit protective conductor</strong> — A
                      bare copper CPC is laid alongside the insulated conductors (similar to the
                      earth in twin and earth cable).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Aluminium moisture barrier</strong> — A
                      laminated aluminium tape wraps around the core assembly, providing a moisture
                      barrier and electromagnetic screening.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">LSZH outer sheath</strong> — The outermost
                      layer is a Low Smoke Zero Halogen (LSZH) thermoplastic sheath, coloured white
                      (standard) or red (for fire alarm circuits). LSZH sheaths produce minimal
                      smoke and no toxic halogen gases (such as hydrogen chloride) when exposed to
                      fire, unlike PVC sheaths which produce dense toxic smoke.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                The cable is typically available in 2-core (for standard fire alarm and emergency
                lighting circuits) and 3-core plus earth configurations. Enhanced versions with
                additional mechanical protection (steel wire armour) are available for installations
                requiring both fire performance and mechanical protection — designated FP200 Gold
                with armour.
              </p>
            </>
          ),
        },
        {
          id: 'where-required',
          heading: 'Where Fire-Resistant Cable Is Required',
          content: (
            <>
              <p>
                Several British Standards and Building Regulations require fire-resistant cabling
                for specific safety-critical circuits. Understanding which circuits require
                fire-resistant cable is essential for correct specification.
              </p>
              <div className="space-y-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-2">
                    Fire Detection and Alarm Systems (BS 5839)
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    <SEOInternalLink href="/guides/bs5839-fire-alarm-standard">
                      BS 5839-1
                    </SEOInternalLink>{' '}
                    requires that cables forming part of a fire alarm system maintain circuit
                    integrity during fire. For Category L (life protection) and Category P (property
                    protection) systems in commercial and industrial buildings, fire-resistant cable
                    is required for the mains supply to the fire alarm panel, for circuits
                    connecting the panel to sounders and call points in different fire compartments,
                    and for interconnecting cables between panels in networked systems. For domestic
                    fire alarm systems to BS 5839-6, fire-resistant cable is required for Grade A
                    (commercial-style) systems but not for Grade D (mains-powered smoke alarms with
                    integral battery backup).
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-2">
                    Emergency Lighting (BS 5266)
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    <SEOInternalLink href="/guides/bs5266-emergency-lighting">
                      BS 5266-1
                    </SEOInternalLink>{' '}
                    requires fire-resistant cabling for centrally supplied emergency lighting
                    systems. In these systems, a central battery unit or generator supplies multiple
                    emergency luminaires via a distribution network. The supply cables must survive
                    the fire to ensure the luminaires continue to operate during evacuation.
                    Self-contained emergency luminaires (with individual batteries) do not require
                    fire-resistant supply cables because they switch to battery power when the mains
                    fails.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-2">Smoke Ventilation Systems</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Power supplies to smoke ventilation fans, damper actuators, and control panels
                    must use fire-resistant cable. Smoke ventilation systems are critical to
                    evacuation safety — they keep escape routes clear of smoke so occupants can see
                    and breathe during evacuation. The cables must survive the fire for the system
                    to function.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-2">Voice Alarm and PA Systems</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Where voice alarm systems are integrated with the fire alarm for managed
                    evacuation (common in large commercial buildings, shopping centres, and public
                    venues), the cabling must be fire-resistant to maintain the ability to give
                    evacuation instructions throughout the building during a fire.
                  </p>
                </div>
              </div>
              <SEOAppBridge
                title="Fire Alarm Certificate Generator"
                description="Elec-Mate generates BS 5839 fire alarm certificates with cable type selection (FP200, MICC, standard), system category, zone details, and complete test results. Digital forms ensure nothing is missed on fire-critical installations."
                icon={FileText}
              />
            </>
          ),
        },
        {
          id: 'installation',
          heading: 'Installation Methods for FP200 Cable',
          content: (
            <>
              <p>
                One of the main advantages of FP200 cable over MICC is its ease of installation.
                FP200 can be handled, stripped, and terminated using standard cable preparation
                tools and methods. However, there are specific considerations that differ from
                standard PVC cables.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">
                  FP200 Installation Requirements
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Cable clips and fixings</strong> — Use
                      fire-rated cable clips or cleats to ensure the cable remains in position
                      during a fire. Standard plastic cable clips will melt and release the cable,
                      potentially allowing it to fall and be damaged. Metal clips, fire-rated
                      P-clips, or dedicated fire performance cable cleats should be used.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Segregation from other cables</strong> —
                      Where FP200 cables run alongside standard PVC cables, ensure adequate
                      segregation. In a fire, burning PVC cables can produce enough heat to damage
                      adjacent FP200 cables, and the mechanical collapse of melting PVC cables can
                      physically damage FP200 runs. Where possible, route fire-resistant cables in a
                      separate containment system.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Bending radius</strong> — FP200 cable has
                      a minimum bending radius of 6 times the overall cable diameter. The silicone
                      rubber insulation is less flexible than PVC, and sharp bends can crack the
                      insulation, compromising fire performance. Use gradual bends and avoid
                      kinking.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Stripping and termination</strong> — Strip
                      the LSZH outer sheath carefully to avoid damaging the aluminium tape and
                      silicone insulation beneath. Use a proper cable stripping tool set for the
                      correct diameter. The silicone insulation can be stripped using standard wire
                      strippers, but take care not to nick or cut the copper conductor.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Fire barriers</strong> — Where FP200
                      cables pass through fire compartment walls and floors, fire-rated penetration
                      seals (fire stops) must be used. The penetration seal must be tested and
                      certified for use with the specific cable type and size. Standard builders'
                      foam or mastic is not acceptable as a fire stop.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                FP200 cable is typically installed on the surface using{' '}
                <SEOInternalLink href="/guides/electrical-conduit-guide">conduit</SEOInternalLink>{' '}
                or{' '}
                <SEOInternalLink href="/guides/trunking-installation-guide">
                  trunking
                </SEOInternalLink>{' '}
                in commercial installations, or clipped direct to structural surfaces. When
                installed in conduit or trunking, ensure the containment system itself is fire-rated
                if the cable route passes through fire compartments, or install appropriate fire
                stops at each compartment boundary.
              </p>
            </>
          ),
        },
        {
          id: 'fire-ratings',
          heading: 'Fire Ratings and Standards',
          content: (
            <>
              <p>
                Fire-resistant cables are classified according to their fire survival performance.
                The key standards for fire performance cable in the UK are:
              </p>
              <div className="space-y-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-2">
                    BS EN 50200 — Circuit Integrity Under Fire
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    This standard tests the cable's ability to maintain circuit integrity (continue
                    carrying current) while exposed to fire. The cable is mounted in a test furnace
                    and exposed to a temperature of at least 830 degrees Celsius with direct flame
                    impingement, while an electrical load is applied. The cable must continue to
                    function for the required duration. The classifications are PH30 (30 minutes),
                    PH60 (60 minutes), PH90 (90 minutes), and PH120 (120 minutes). FP200 cable meets
                    the PH120 classification — 120 minutes at 830 degrees Celsius.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-2">
                    BS 8434-2 — Enhanced Fire Resistance (with Water Spray)
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    This UK standard adds a water spray element to the fire test, simulating the
                    effect of sprinkler activation or fire hose operation during a fire. The cable
                    must survive both fire and water simultaneously. This is a more demanding test
                    than BS EN 50200 alone and is increasingly specified for high-risk
                    installations. FP200 cable meeting BS 8434-2 Category 2 provides 120 minutes
                    survival with water spray.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-2">
                    BS EN 60332 — Flame Propagation
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    This standard tests whether a cable propagates flame — that is, whether the
                    cable itself burns and spreads fire along its length. All fire-resistant cables
                    must pass this test. FP200 cable passes BS EN 60332-1 (single cable test) and BS
                    EN 60332-3 (bunched cable test), confirming it will not spread fire along cable
                    routes.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-2">BS EN 61034 — Smoke Density</h3>
                  <p className="text-white text-sm leading-relaxed">
                    This standard measures the smoke density produced when the cable burns. LSZH
                    (Low Smoke Zero Halogen) sheaths produce minimal smoke, maintaining visibility
                    in escape routes. FP200 cable meets BS EN 61034, producing significantly less
                    smoke than PVC-sheathed alternatives. This is a critical property for cables
                    installed in enclosed spaces, corridors, and stairwells.
                  </p>
                </div>
              </div>
              <p>
                When specifying fire-resistant cable, always check the specific fire performance
                requirement of the application standard. BS 5839-1 for fire alarm systems and BS
                5266-1 for emergency lighting both specify minimum fire resistance durations and
                test standards that the cable must meet.
              </p>
            </>
          ),
        },
        {
          id: 'testing',
          heading: 'Testing FP200 Cable Installations',
          content: (
            <>
              <p>
                Testing FP200 cable installations follows the standard{' '}
                <SEOInternalLink href="/guides/testing-sequence">
                  BS 7671 testing sequence
                </SEOInternalLink>
                . Unlike MICC cable, FP200 does not have moisture sensitivity issues, so insulation
                resistance testing is generally straightforward.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">FP200 Cable Test Sequence</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Continuity of protective conductors
                      </strong>{' '}
                      — Measure the continuity of the CPC (earth conductor) through the cable run.
                      Record R1+R2 for each circuit. For fire alarm and emergency lighting circuits,
                      also verify the continuity of the circuit wiring to ensure all devices are
                      correctly connected.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Insulation resistance</strong> — Test
                      between all conductors and between each conductor and the CPC/screen at 500V
                      DC. New FP200 cable should read above 100 megaohms. Low readings may indicate
                      installation damage — check for nicks in the silicone insulation caused during
                      stripping, cable pulling, or bending.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Earth fault loop impedance</strong> —
                      Measure Zs for power circuits supplied by FP200 cable (emergency lighting
                      central battery supplies, smoke ventilation fan circuits). Verify against the
                      maximum permitted Zs for the protective device.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Functional testing</strong> — Test the
                      fire alarm system to BS 5839 requirements (zone testing, cause and effect,
                      sounder levels) and emergency lighting to BS 5266 requirements (duration test,
                      illumination levels). Record results on the appropriate certificate forms.
                    </span>
                  </li>
                </ul>
              </div>
              <SEOAppBridge
                title="Emergency Lighting Certificate Forms"
                description="Elec-Mate generates BS 5266 emergency lighting certificates with luminaire schedules, duration test results, illumination levels, and cable type documentation. Complete digital certification for fire-critical lighting installations."
                icon={ClipboardCheck}
              />
            </>
          ),
        },
        {
          id: 'alternatives',
          heading: 'FP200 Alternatives and Comparisons',
          content: (
            <>
              <p>
                While FP200 (Prysmian) is the most recognised fire performance cable brand in the
                UK, several other manufacturers produce equivalent cables that meet the same
                standards. Understanding the alternatives helps when sourcing materials and
                comparing quotes.
              </p>
              <div className="space-y-4 my-6">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <h3 className="font-bold text-white text-lg mb-2">Firetuf (AEI Cables)</h3>
                  <p className="text-white text-sm leading-relaxed">
                    AEI Cables' fire-resistant range. Similar construction to FP200 with silicone
                    rubber insulation and LSZH sheath. Meets PH120 classification. Available in
                    2-core and 3-core configurations. Competitively priced against FP200.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <h3 className="font-bold text-white text-lg mb-2">Firecel (Cleveland Cable)</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Cleveland Cable's fire performance cable range. PH120-rated with LSZH sheath.
                    Available with optional SWA for installations requiring both fire resistance and
                    mechanical protection.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <h3 className="font-bold text-white text-lg mb-2">
                    MICC Cable (Pyrotenax and others)
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    <SEOInternalLink href="/guides/micc-cable-guide">MICC cable</SEOInternalLink>{' '}
                    provides significantly higher fire performance than FP200 (surviving over 1,000
                    degrees Celsius vs approximately 830 degrees Celsius), but is more expensive,
                    harder to install, and requires specialised termination. MICC is specified for
                    the most demanding applications — large commercial buildings, hospitals,
                    high-rise residential — where absolute maximum fire performance is required.
                  </p>
                </div>
              </div>
              <p>
                When substituting one fire-resistant cable brand for another, always verify that the
                replacement meets the same fire performance classification (PH120, BS 8434-2
                Category 2, etc.) required by the specification. Different brands may have different
                construction details, and the fire performance must be verified from the
                manufacturer's test certificates, not assumed from the cable appearance.
              </p>
              <SEOInternalLink href="/guides/how-to-size-cables-bs-7671">
                Cable sizing for fire-resistant cables
              </SEOInternalLink>{' '}
              follows the same BS 7671 process but uses the current-carrying capacity values
              specific to the cable type from the manufacturer's data sheets, as FP200 may not
              appear directly in the standard Appendix 4 tables.
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Is FP200 cable required for domestic fire alarms?',
          answer:
            'It depends on the system grade. For Grade A fire alarm systems (commercial-style systems with a central panel, separate detectors, and sounders) installed in domestic premises under BS 5839-6, fire-resistant cable such as FP200 is required for the mains supply and interconnecting wiring. For Grade D systems (the most common domestic fire alarm — mains-powered smoke alarms with integral battery backup, interconnected by a simple cable), standard PVC cable can be used for the interconnection because each alarm has its own battery backup and does not rely on the mains cable surviving a fire. For Grade F systems (battery-powered alarms with no mains supply), no fixed wiring is required.',
        },
        {
          question: 'Can FP200 cable be installed in conduit or trunking?',
          answer:
            'Yes, FP200 cable can be installed in conduit or trunking. When doing so, the conduit or trunking itself does not need to be fire-rated unless it passes through a fire compartment wall or floor — in that case, fire-rated penetration seals (fire stops) must be used at each compartment boundary. When installing FP200 in conduit or trunking alongside standard PVC cables, ensure adequate segregation to prevent melting PVC from damaging the fire-resistant cable during a fire.',
        },
        {
          question: 'What is the difference between FP200 and standard twin and earth cable?',
          answer:
            'The fundamental difference is fire performance. Standard twin and earth cable uses PVC insulation and sheath, which melts at approximately 105 degrees Celsius and burns at higher temperatures, producing dense toxic smoke containing hydrogen chloride gas. The circuit fails within minutes of fire exposure. FP200 cable uses silicone rubber insulation (which converts to an insulating ceramic under fire) and an LSZH outer sheath. It maintains circuit integrity for at least 120 minutes at 830 degrees Celsius, produces minimal smoke, and emits no toxic halogen gases. FP200 cable costs more per metre than standard T&E (typically 2 to 3 times more) and is slightly stiffer to handle due to the silicone insulation.',
        },
        {
          question: 'Does FP200 cable need special clips?',
          answer:
            'Yes. Fire-rated cable clips or cleats should be used for FP200 cable. Standard plastic cable clips will melt and release the cable during a fire, allowing it to fall and potentially be damaged. Metal clips, fire-rated P-clips (with steel base and fire-resistant clips), or dedicated fire performance cable cleats maintain the cable in position during a fire, ensuring it continues to function. The clip spacing should follow the cable manufacturer guidance — typically every 300 mm for horizontal runs and every 400 mm for vertical runs.',
        },
        {
          question: 'How long does FP200 cable survive in a fire?',
          answer:
            'FP200 cable is rated PH120, meaning it maintains circuit integrity (continues to carry current and supply connected equipment) for a minimum of 120 minutes when exposed to temperatures of at least 830 degrees Celsius with direct flame impingement. This is tested to BS EN 50200. Enhanced versions tested to BS 8434-2 also survive water spray during the fire test, simulating sprinkler or fire hose conditions. In practice, the cable often survives significantly longer than the minimum 120 minutes, but the rated value is the guaranteed minimum.',
        },
        {
          question: 'Can I use FP200 cable for standard circuits?',
          answer:
            'Yes, FP200 cable can be used for any circuit, not just fire-critical circuits. Some electricians use FP200 for all wiring in high-risk premises such as timber-framed buildings, listed buildings, and properties with thatched roofs, providing an additional level of fire protection throughout the installation. The current-carrying capacity of FP200 is similar to standard PVC cable of the same size (the silicone rubber insulation has a similar temperature rating for normal operation), so it can be sized using the same BS 7671 tables. The main disadvantage is cost — using FP200 for all circuits typically doubles the cable cost.',
        },
        {
          question: 'Does Elec-Mate include FP200 cable in its tools?',
          answer:
            'Yes. Elec-Mate certificate forms include cable type selection fields where you can specify FP200, MICC, or other fire-resistant cable types. The fire alarm certificate (BS 5839) and emergency lighting certificate (BS 5266) forms include specific fields for cable type, fire resistance rating, and installation method. The AI regulations agent can advise on when fire-resistant cable is required for specific applications. Cable sizing calculators support FP200 current-carrying capacity values.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/micc-cable-guide',
          title: 'MICC Cable Guide',
          description: 'Mineral insulated cable for maximum fire performance.',
          icon: Shield,
          category: 'Guide',
        },
        {
          href: '/guides/bs5839-fire-alarm-standard',
          title: 'BS 5839 Fire Alarm Standard',
          description: 'Fire detection and alarm system requirements.',
          icon: ShieldCheck,
          category: 'Regulations',
        },
        {
          href: '/guides/bs5266-emergency-lighting',
          title: 'BS 5266 Emergency Lighting',
          description: 'Emergency lighting standards and testing.',
          icon: Zap,
          category: 'Regulations',
        },
        {
          href: '/guides/fire-alarm-certificate',
          title: 'Fire Alarm Certificate',
          description: 'Generating BS 5839 certificates digitally.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/guides/how-to-size-cables-bs-7671',
          title: 'Cable Sizing Guide',
          description: 'BS 7671 cable sizing for all cable types.',
          icon: Calculator,
          category: 'Guide',
        },
        {
          href: '/guides/swa-cable-installation',
          title: 'SWA Cable Installation',
          description: 'Armoured cable for outdoor and underground runs.',
          icon: Cable,
          category: 'Installation',
        },
      ]}
      ctaHeading="Certify Fire-Critical Installations"
      ctaSubheading="Elec-Mate's fire alarm and emergency lighting certificates document FP200 cable installations with full test results and compliance checks. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
