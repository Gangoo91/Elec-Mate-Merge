import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Shield,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calculator,
  BookOpen,
  Brain,
  Cable,
  Zap,
  Flame,
  ClipboardCheck,
} from 'lucide-react';

export default function MICCCableGuidePage() {
  return (
    <GuideTemplate
      title="MICC Cable Guide | Mineral Insulated Copper Clad"
      description="Complete guide to MICC (Mineral Insulated Copper Clad) cable. Properties, fire performance, where to use MICC cable, termination and sealing, testing procedures, BS EN 60702, and comparison with FP200 fire performance cable for UK electrical installations."
      datePublished="2025-06-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'MICC Cable', href: '/guides/micc-cable-guide' },
      ]}
      tocItems={[
        { id: 'what-is-micc', label: 'What Is MICC Cable?' },
        { id: 'properties', label: 'Properties & Performance' },
        { id: 'where-to-use', label: 'Where to Use MICC Cable' },
        { id: 'termination', label: 'Termination & Sealing' },
        { id: 'fire-performance', label: 'Fire Performance' },
        { id: 'testing', label: 'Testing MICC Installations' },
        { id: 'micc-vs-fp200', label: 'MICC vs FP200 Cable' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Specialist Cable Guide"
      badgeIcon={Shield}
      heroTitle={
        <>
          MICC Cable Guide
          <br />
          <span className="text-yellow-400">Mineral Insulated Copper Clad</span>
        </>
      }
      heroSubtitle="Mineral Insulated Copper Clad (MICC) cable is the ultimate fire-performance cable for UK electrical installations. This guide covers its unique properties, fire survival capability, correct termination and sealing, testing procedures, and the BS EN 60702 standard — essential knowledge for fire alarm, emergency lighting, and critical circuit installations."
      readingTime={13}
      keyTakeaways={[
        'MICC cable can withstand temperatures exceeding 1,000 degrees Celsius and continue to function during a fire — it will not burn, produce toxic fumes, or propagate flame. The magnesium oxide insulation is completely incombustible.',
        'Correct termination using pot seals or compression glands is critical — the magnesium oxide insulation is hygroscopic (absorbs moisture) and will fail insulation resistance tests if not properly sealed against moisture ingress.',
        'MICC cable is manufactured to BS EN 60702 and is specified where circuit integrity during fire is essential — fire alarm systems, emergency lighting, smoke ventilation, fire-fighting lifts, and sprinkler pump supplies.',
        'The copper sheath of MICC cable serves as both the mechanical protection and the circuit protective conductor (CPC). The sheath must be bonded at every termination point.',
        'Elec-Mate includes MICC cable in its cable sizing calculators and certificate forms, with specific guidance for fire alarm and emergency lighting installations.',
      ]}
      sections={[
        {
          id: 'what-is-micc',
          heading: 'What Is MICC Cable?',
          content: (
            <>
              <p>
                Mineral Insulated Copper Clad (MICC) cable — also known by the trade name Pyrotenax
                — is a specialised cable type consisting of copper conductors insulated with
                compressed magnesium oxide powder, enclosed within a seamless copper outer sheath.
                The entire cable is a solid, continuous metallic structure with no organic materials
                that could burn or decompose.
              </p>
              <p>
                The construction is remarkably simple: one or more solid copper conductors are
                surrounded by densely packed magnesium oxide (MgO) powder, which provides electrical
                insulation. The assembly is enclosed in a seamless drawn copper tube that serves as
                both the mechanical protection and the circuit protective conductor. The cable is
                manufactured by drawing the assembly through a series of dies, compressing the MgO
                powder and reducing the overall diameter to the required size.
              </p>
              <p>
                MICC cable is available in single-conductor (light duty), 2-core, 3-core, 4-core,
                7-core, 12-core, and 19-core configurations, in conductor sizes from 1.0 mm squared
                to 240 mm squared. For fire alarm and emergency lighting installations, the most
                common sizes are 1.5 mm squared 2-core and 1.5 mm squared 3-core. For power circuits
                requiring fire survival, larger sizes are used.
              </p>
              <p>
                The cable is manufactured to BS EN 60702-1 (cable specification) and BS EN 60702-2
                (terminations), which replaced the older BS 6207. It is classified as{' '}
                <SEOInternalLink href="/guides/fp200-cable-guide">
                  fire-resistant cable
                </SEOInternalLink>{' '}
                but goes far beyond the minimum requirements of standard fire-resistant cables —
                MICC can operate continuously at 250 degrees Celsius and survive short-term exposure
                to over 1,000 degrees Celsius.
              </p>
            </>
          ),
        },
        {
          id: 'properties',
          heading: 'Properties and Performance',
          content: (
            <>
              <p>
                MICC cable has several unique properties that make it the premium choice for
                critical electrical circuits. Understanding these properties is essential for
                correct specification, installation, and maintenance.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">Key Properties of MICC Cable</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Fire survival</strong> — The magnesium
                      oxide insulation melts at 2,852 degrees Celsius and the copper sheath melts at
                      1,083 degrees Celsius. In a standard building fire (typically 800 to 1,000
                      degrees Celsius), the cable continues to function. No organic materials exist
                      in the cable to burn, produce smoke, or emit toxic fumes.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Moisture sensitivity</strong> — Magnesium
                      oxide is hygroscopic — it readily absorbs moisture from the atmosphere. If the
                      cable ends are left unsealed, moisture penetrates the MgO insulation and
                      insulation resistance drops dramatically, often to below 1 megaohm. This is
                      the most common issue with MICC cable and the reason correct sealing is
                      critical.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Small external diameter</strong> — For a
                      given current rating, MICC cable has a much smaller diameter than conventional
                      PVC or XLPE cable. A 2.5 mm squared 2-core MICC cable is only about 7.6 mm in
                      diameter, compared to approximately 10 mm for 2.5 mm squared T&E. This makes
                      it ideal for space-constrained installations.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">High current rating</strong> — The MgO
                      insulation can operate continuously at much higher temperatures than PVC (250
                      degrees Celsius vs 70 degrees Celsius), giving MICC cable significantly higher
                      current-carrying capacity for the same conductor size. This is especially
                      advantageous in congested cable routes.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Mechanical strength</strong> — The solid
                      copper sheath provides excellent mechanical protection. MICC cable can
                      withstand crushing, impact, and vibration that would damage conventional
                      cables. It does not require additional mechanical protection in most
                      installations.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Long life</strong> — With no organic
                      materials to deteriorate, MICC cable has an indefinite operational life.
                      Installations from the 1950s remain fully functional today. The cable does not
                      suffer from the thermal ageing that affects PVC and XLPE cables.
                    </span>
                  </li>
                </ul>
              </div>
            </>
          ),
        },
        {
          id: 'where-to-use',
          heading: 'Where to Use MICC Cable',
          content: (
            <>
              <p>
                MICC cable is specified where circuit integrity during fire is essential — the cable
                must continue to supply power to critical safety systems even while the building is
                on fire. The relevant standards and regulations define specific applications:
              </p>
              <div className="space-y-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-2">
                    Fire Detection and Alarm Systems
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    BS 5839-1 (fire detection and alarm systems for buildings) requires that cables
                    serving fire alarm systems in certain categories maintain circuit integrity
                    during fire. MICC cable meets the enhanced fire resistance requirements and is
                    the traditional choice for fire alarm mains wiring in commercial and industrial
                    premises. For domestic fire alarm installations to{' '}
                    <SEOInternalLink href="/guides/bs5839-fire-alarm-standard">
                      BS 5839-6
                    </SEOInternalLink>
                    , MICC or standard fire-resistant cable may be used depending on the system
                    category.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-2">Emergency Lighting</h3>
                  <p className="text-white text-sm leading-relaxed">
                    <SEOInternalLink href="/guides/bs5266-emergency-lighting">
                      BS 5266
                    </SEOInternalLink>{' '}
                    requires fire-resistant cabling for centrally supplied emergency lighting
                    systems. MICC cable ensures that the emergency lighting supply survives the
                    fire, providing illumination for evacuation routes even in severe fire
                    conditions.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-2">Smoke Ventilation Systems</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Smoke ventilation (smoke extract) systems must operate during a fire to clear
                    smoke from escape routes. The power supply cables to smoke extract fans, damper
                    actuators, and control panels must maintain circuit integrity during fire,
                    making MICC cable the standard specification.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-2">
                    Fire-Fighting Lifts and Sprinkler Pumps
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    Fire-fighting lifts must remain operational during a fire to allow firefighter
                    access to upper floors. Sprinkler pump motors must continue to run to maintain
                    water supply. Both applications require fire-surviving power cables, and MICC
                    cable is the standard choice for these critical supplies.
                  </p>
                </div>
              </div>
              <p>
                MICC cable is also used in harsh industrial environments — petrochemical plants,
                steelworks, power stations — where its resistance to heat, fire, moisture, oil, and
                mechanical damage makes it superior to any organic-insulated cable.
              </p>
            </>
          ),
        },
        {
          id: 'termination',
          heading: 'Termination and Sealing',
          content: (
            <>
              <p>
                Correct termination of MICC cable is the most critical aspect of the installation.
                The magnesium oxide insulation must be sealed against moisture ingress at every
                termination point — if the seal fails, moisture enters the MgO, insulation
                resistance drops, and the cable will fail insulation resistance testing and may trip
                RCD protection.
              </p>
              <p>There are two main termination methods for MICC cable:</p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">Pot Seal (Traditional)</h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    The traditional pot seal consists of a brass pot (disc) that is soldered or
                    crimped onto the stripped copper sheath. The pot is filled with a sealing
                    compound (historically a two-part epoxy, now often silicone-based) that
                    completely encapsulates the exposed MgO insulation and the conductor tails. The
                    conductor tails (PVC-insulated extensions) emerge from the seal for connection
                    to the accessory or equipment.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    Pot seals require skill and practice to install correctly. The key steps are:
                    clean the copper sheath thoroughly, fit the brass pot squarely onto the sheath,
                    solder or crimp the pot, attach the conductor tails (by crimping or screw
                    connection), fill the pot with sealant, and fit the PVC shroud.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">Compression Gland (Modern)</h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    Modern compression glands (screw-on type) simplify MICC termination. The gland
                    body screws onto the stripped copper sheath, and a compression olive seals the
                    sheath. An internal insulating disc separates the conductors and provides the
                    moisture seal. Pre-insulated conductor tails are attached using push-fit or
                    screw terminals within the gland.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    Compression glands are faster to install than pot seals and are less dependent
                    on the installer's soldering skill. They are now the preferred termination
                    method for most new installations.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-6">
                <h3 className="font-bold text-yellow-400 text-lg mb-3">
                  Critical Sealing Precautions
                </h3>
                <ul className="space-y-3 text-white text-sm leading-relaxed">
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Never leave MICC cable ends exposed, even temporarily. Cap cut ends
                      immediately with heat-shrink or self-amalgamating tape until ready for
                      termination.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      If MICC cable has absorbed moisture, it can often be dried out by passing
                      current through the conductors to heat the MgO insulation. This drives
                      moisture out through the unsealed end. Monitor insulation resistance during
                      the drying process.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Always test insulation resistance immediately after sealing, before connecting
                      to the circuit. A properly sealed MICC cable should read above 100 megaohms.
                      If the reading is low, the seal has failed and must be remade.
                    </span>
                  </li>
                </ul>
              </div>
              <SEOAppBridge
                title="Fire Alarm Certificate Forms"
                description="Elec-Mate's fire alarm certificate forms include specific fields for cable type (MICC, FP200), insulation resistance results, and fire alarm system categories. Generate professional BS 5839 certificates with all required test data."
                icon={FileText}
              />
            </>
          ),
        },
        {
          id: 'fire-performance',
          heading: 'Fire Performance and Standards',
          content: (
            <>
              <p>
                MICC cable provides the highest level of fire performance of any cable type
                available. Its fire survival characteristics are governed by BS EN 60702 and tested
                to the fire resistance classification standards that define how cables behave under
                fire conditions.
              </p>
              <p>The key fire performance characteristics of MICC cable are:</p>
              <ul className="space-y-3 my-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Circuit integrity under fire</strong> — MICC
                    cable maintains circuit integrity (continues to carry current) during a fire. In
                    standard fire tests (BS EN 50200 / BS 8434-2), MICC cable survives for periods
                    well in excess of the minimum requirements. It will continue to function until
                    the copper sheath melts at 1,083 degrees Celsius.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Zero flame propagation</strong> — MICC cable
                    cannot propagate flame. There are no organic materials to burn, so the cable
                    will not contribute to fire spread along cable routes. This is a significant
                    advantage over organic-insulated cables, even fire-rated types, which can
                    propagate flame under extreme conditions.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Zero smoke and toxic gas emission</strong> —
                    Because there are no organic materials, MICC cable produces no smoke and no
                    toxic gases during a fire. In enclosed spaces such as corridors, stairwells, and
                    plant rooms, this is a critical safety advantage — smoke inhalation is the
                    leading cause of death in building fires.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Water resistance during fire</strong> — MICC
                    cable can withstand water spray (from sprinklers or fire hoses) while energised
                    and at elevated temperatures. This is important for fire-fighting lift supplies
                    and sprinkler pump circuits that must operate during active fire-fighting
                    operations.
                  </span>
                </li>
              </ul>
              <p>
                The relevant standard for MICC cable is BS EN 60702-1 (specification for cables) and
                BS EN 60702-2 (specification for terminations). These replaced the older BS 6207
                standard. Fire resistance testing is carried out to BS EN 50200 (circuit integrity
                under fire), with cables meeting the PH120 classification (120 minutes circuit
                integrity at 830 degrees Celsius or above).
              </p>
            </>
          ),
        },
        {
          id: 'testing',
          heading: 'Testing MICC Cable Installations',
          content: (
            <>
              <p>
                Testing MICC cable installations follows the standard{' '}
                <SEOInternalLink href="/guides/testing-sequence">
                  BS 7671 testing sequence
                </SEOInternalLink>
                , but with particular attention to insulation resistance. The insulation resistance
                test is the primary indicator of whether the cable seals are intact and the MgO
                insulation is dry.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">MICC Cable Test Procedures</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Insulation resistance</strong> — Test
                      between each conductor and the copper sheath, and between conductors, at 500V
                      DC. New, properly sealed MICC cable should give readings well above 100
                      megaohms, often exceeding 500 megaohms. Readings below 2 megaohms indicate
                      moisture ingress, and the seal must be inspected and remade. Readings that
                      start high and gradually drop during the test indicate moisture being driven
                      into the MgO by the test voltage.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Continuity of the copper sheath</strong> —
                      Measure the resistance of the copper sheath between the termination points
                      using a low-resistance ohmmeter. This verifies the sheath is continuous and
                      the termination glands are making good contact. Record the R2 value for Zs
                      calculations.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Earth fault loop impedance</strong> —
                      Measure Zs at the far end of the MICC cable circuit. The copper sheath serves
                      as the CPC, and its resistance contributes to the total Zs. Verify against the
                      maximum permitted Zs for the protective device.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Polarity and functional tests</strong> —
                      Standard polarity verification and functional testing of the connected
                      equipment (fire alarm panel, emergency lighting luminaires, etc.).
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                During{' '}
                <SEOInternalLink href="/guides/periodic-inspection">
                  periodic inspection
                </SEOInternalLink>
                , pay particular attention to the insulation resistance of MICC circuits. A gradual
                decline in insulation resistance over successive inspections indicates progressive
                moisture ingress, usually at a deteriorating seal. This should be recorded as a C3
                observation (improvement recommended) or C2 (potentially dangerous) if the readings
                drop below acceptable levels.
              </p>
              <SEOAppBridge
                title="Record MICC Test Results Digitally"
                description="Elec-Mate's certificate forms capture insulation resistance readings with trend analysis — compare current readings against previous inspection results to identify deteriorating MICC cable seals before they become a safety issue."
                icon={ClipboardCheck}
              />
            </>
          ),
        },
        {
          id: 'micc-vs-fp200',
          heading: 'MICC vs FP200 Cable',
          content: (
            <>
              <p>
                MICC cable and FP200 (fire performance) cable are both used for fire-critical
                circuits, but they are fundamentally different products with different performance
                characteristics, installation requirements, and costs.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">MICC Cable</h3>
                  <ul className="space-y-2 text-white text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Inorganic insulation — will not burn</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Survives temperatures over 1,000 degrees Celsius</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Zero smoke and toxic gas emission</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <span>
                        Requires specialised termination (pot seals or compression glands)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <span>Moisture-sensitive (MgO is hygroscopic)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <span>Higher material cost and installation time</span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">FP200 Cable</h3>
                  <ul className="space-y-2 text-white text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Fire-resistant insulation (silicone rubber under LSZH sheath)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Easy to terminate — standard stripping and connection methods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Not moisture-sensitive — no sealing concerns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Lower cost and faster installation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <span>Lower fire temperature survival than MICC</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <span>Some smoke emission at very high temperatures</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p>
                For most fire alarm and emergency lighting installations in standard commercial and
                domestic buildings, FP200 or equivalent fire-resistant cable provides adequate fire
                performance and is significantly easier and cheaper to install than MICC. MICC cable
                is reserved for the most demanding applications — large commercial buildings,
                high-rise residential, hospitals, critical infrastructure — where the absolute
                maximum fire performance is required and the installation budget supports the
                additional cost.
              </p>
              <p>
                The{' '}
                <SEOInternalLink href="/guides/fp200-cable-guide">
                  FP200 cable guide
                </SEOInternalLink>{' '}
                provides detailed specification and installation guidance for fire performance
                cables.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Why does MICC cable fail insulation resistance tests?',
          answer:
            'The most common reason for MICC cable failing insulation resistance tests is moisture ingress into the magnesium oxide (MgO) insulation. MgO is hygroscopic — it readily absorbs moisture from the atmosphere. If the cable termination seals (pot seals or compression glands) are damaged, improperly made, or have deteriorated over time, moisture enters the MgO and dramatically reduces its insulation resistance. Low readings between a conductor and the copper sheath are the classic symptom. The remedy is to inspect all seals, remake any that are suspect, and if necessary, dry out the cable by passing current through the conductors to heat the MgO and drive out moisture. Always test insulation resistance immediately after resealing to confirm the repair is effective.',
        },
        {
          question: 'Can MICC cable be bent on site?',
          answer:
            'Yes, MICC cable can be bent on site, but it requires care and the correct technique. The minimum bending radius for MICC cable is 6 times the cable outer diameter (6D) for cables up to 10 mm diameter, and 8 times for larger cables. Bending should be done gradually using a bending spring or tube bender — never use pliers or make sharp kinks, as this can crack the copper sheath or damage the MgO insulation. Once cracked, the sheath cannot be repaired and the cable must be replaced. Use purpose-made MICC bending tools for precise bends at junction boxes and equipment entries.',
        },
        {
          question: 'How long does MICC cable last?',
          answer:
            'MICC cable has an effectively indefinite operational life. Because there are no organic materials in the construction, there is no mechanism for thermal ageing, UV degradation, or chemical deterioration that limits the life of conventional cables. Properly installed and sealed MICC cable from the 1950s and 1960s remains fully functional today. The only factors that limit the practical life of MICC cable are physical damage (impact, crushing, or corrosion of the copper sheath in aggressive environments) and seal deterioration. During periodic inspection, monitor insulation resistance readings — stable, high readings indicate the cable and seals remain in excellent condition.',
        },
        {
          question: 'Is MICC cable more expensive than FP200?',
          answer:
            'Yes, significantly. MICC cable typically costs 3 to 5 times more per metre than equivalent FP200 fire-resistant cable, and the specialised termination components (pot seals or compression glands) add further cost. Installation time is also longer due to the specialised termination process. For a typical fire alarm system in a medium-sized commercial building, using MICC cable might cost 2 to 3 times more than using FP200 for the cable installation alone. However, MICC cable provides substantially higher fire performance and a longer operational life, so the lifetime cost comparison is more favourable.',
        },
        {
          question: 'What is a pot seal on MICC cable?',
          answer:
            'A pot seal is the traditional termination method for MICC cable. It consists of a small brass pot (disc) that is soldered or crimped onto the stripped end of the copper sheath. The pot is then filled with a sealing compound (historically a two-part epoxy resin, now often silicone-based sealant) that encapsulates the exposed magnesium oxide insulation and the conductor connection points. PVC-insulated conductor tails emerge from the seal for connection to accessories or equipment. The seal must be completely moisture-tight to prevent the hygroscopic MgO from absorbing atmospheric moisture. Making a reliable pot seal requires training and practice.',
        },
        {
          question: 'Can MICC cable be used for power circuits?',
          answer:
            'Yes, MICC cable is available in sizes suitable for power circuits up to 240 mm squared and above. It is commonly used for fire-fighting lift motor supplies, sprinkler pump supplies, smoke ventilation fan motors, and other power circuits that must survive fire. The current-carrying capacity of MICC cable is higher than equivalent-sized PVC cable because the MgO insulation can operate at much higher temperatures. BS 7671 Appendix 4 includes current-carrying capacity tables specifically for MICC cable at various sheath temperatures.',
        },
        {
          question: 'Does Elec-Mate include MICC cable in its calculators?',
          answer:
            'Yes. Elec-Mate cable sizing calculators include MICC cable current-carrying capacity tables from BS 7671 Appendix 4 for all standard installation methods and sheath temperatures. The calculator applies the relevant correction factors, verifies voltage drop, and checks fault current withstand. The certificate forms include fields for recording MICC cable type, insulation resistance results, and seal condition — all essential data for fire alarm and emergency lighting installations.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/fp200-cable-guide',
          title: 'FP200 Cable Guide',
          description: 'Fire performance cable specification and installation.',
          icon: Flame,
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
          href: '/guides/swa-cable-installation',
          title: 'SWA Cable Installation',
          description: 'Armoured cable for outdoor and underground runs.',
          icon: Cable,
          category: 'Installation',
        },
        {
          href: '/guides/how-to-size-cables-bs-7671',
          title: 'Cable Sizing Guide',
          description: 'Complete BS 7671 cable sizing process.',
          icon: Calculator,
          category: 'Guide',
        },
        {
          href: '/guides/insulation-resistance-test',
          title: 'Insulation Resistance Testing',
          description: 'IR test procedures for all cable types.',
          icon: ClipboardCheck,
          category: 'Testing',
        },
      ]}
      ctaHeading="Certify Fire-Critical Installations"
      ctaSubheading="Elec-Mate's fire alarm and emergency lighting certificates support MICC cable documentation with full test result validation. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
