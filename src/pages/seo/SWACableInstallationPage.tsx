import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Cable,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calculator,
  BookOpen,
  Brain,
  Zap,
  Wrench,
  Layers,
  ClipboardCheck,
} from 'lucide-react';

export default function SWACableInstallationPage() {
  return (
    <GuideTemplate
      title="SWA Cable Installation | Armoured Cable Guide UK"
      description="Complete guide to SWA (Steel Wire Armoured) cable installation in the UK. Cable selection, burial depth requirements, gland types, bonding the armour, underground and outdoor runs, testing procedures, and BS 7671 compliance for domestic and commercial installations."
      datePublished="2025-06-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Installation', href: '/guides' },
        { label: 'SWA Cable', href: '/guides/swa-cable-installation' },
      ]}
      tocItems={[
        { id: 'what-is-swa', label: 'What Is SWA Cable?' },
        { id: 'cable-selection', label: 'Cable Selection & Sizing' },
        { id: 'burial-depth', label: 'Burial Depth Requirements' },
        { id: 'glands-termination', label: 'Glands & Termination' },
        { id: 'bonding-armour', label: 'Bonding the Armour' },
        { id: 'outdoor-underground', label: 'Outdoor & Underground Runs' },
        { id: 'testing', label: 'Testing SWA Installations' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Installation Guide"
      badgeIcon={Cable}
      heroTitle={
        <>
          SWA Cable Installation
          <br />
          <span className="text-yellow-400">Armoured Cable Guide UK</span>
        </>
      }
      heroSubtitle="Steel Wire Armoured (SWA) cable is the standard choice for outdoor, underground, and exposed wiring in UK electrical installations. This guide covers cable selection, burial depth, gland types and termination, bonding the steel wire armour, testing procedures, and full BS 7671 compliance requirements."
      readingTime={14}
      keyTakeaways={[
        'SWA cable must be terminated using the correct cable gland (CW, CX, or BW type) to maintain the mechanical and earth continuity of the steel wire armour. Incorrect glands compromise both protection and the CPC path.',
        'BS 7671 requires a minimum burial depth of 500 mm for cables without additional mechanical protection, or shallower with cable tiles, duct, or other protection. Route marker tape must be placed 150 mm above the cable.',
        'The steel wire armour can serve as the circuit protective conductor (CPC) provided the armour cross-sectional area meets the requirements of BS 7671 Table 54.7 or the adiabatic equation.',
        'SWA cable does not require RCD protection when used in walls, as the earthed metallic covering satisfies BS 7671 Regulation 411.3.4 — this is a key advantage over twin and earth cable.',
        'Elec-Mate includes cable sizing calculators with SWA current-carrying capacity tables, voltage drop verification, and the adiabatic equation check for armour as CPC.',
      ]}
      sections={[
        {
          id: 'what-is-swa',
          heading: 'What Is SWA Cable?',
          content: (
            <>
              <p>
                Steel Wire Armoured (SWA) cable is a heavy-duty power cable with an outer layer of
                galvanised steel wires providing mechanical protection and an earth continuity path.
                It is the standard cable type for underground installations, outdoor wiring, and any
                situation where the cable is exposed to potential mechanical damage.
              </p>
              <p>
                SWA cable construction consists of several layers: copper (or aluminium) conductors,
                PVC or XLPE insulation on each conductor, an inner PVC bedding sheath, the steel
                wire armour layer, and an outer PVC oversheath. The steel wire armour provides
                substantial mechanical protection against impact, crushing, and penetration — making
                the cable suitable for direct burial, surface mounting on walls, and installation in
                exposed locations.
              </p>
              <p>
                SWA cable is available in a wide range of sizes from 1.5 mm squared to 400 mm
                squared and above, in 2-core, 3-core, 4-core, and 5-core configurations. For most
                domestic and light commercial installations, 2-core and 3-core SWA in sizes from 2.5
                mm squared to 25 mm squared covers the majority of applications — including supplies
                to outbuildings, garages, EV chargers, garden offices, and external lighting.
              </p>
              <p>
                The key advantage of SWA cable over standard twin and earth (T&E) cable is its
                mechanical protection and the earthed metallic covering. Under BS 7671, cables with
                an earthed metallic covering are exempt from the requirement for additional RCD
                protection when installed in walls (Regulation 411.3.4), and the armour provides an
                inherent CPC that does not rely on a separate earth conductor.
              </p>
            </>
          ),
        },
        {
          id: 'cable-selection',
          heading: 'Cable Selection and Sizing',
          content: (
            <>
              <p>
                Selecting the correct SWA cable follows the same{' '}
                <SEOInternalLink href="/guides/how-to-size-cables-bs-7671">
                  BS 7671 cable sizing process
                </SEOInternalLink>{' '}
                as any other cable type, but with specific tables for SWA current-carrying capacity
                and voltage drop values.
              </p>
              <p>
                The installation method determines which current-carrying capacity table to use. SWA
                cable is commonly installed using Reference Method D (direct buried), Reference
                Method C (clipped direct to a surface), or Reference Method B (in trunking or
                conduit). Each method has different current ratings because the cable's ability to
                dissipate heat varies with the installation method.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">
                  Key Sizing Considerations for SWA
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Insulation type</strong> — PVC-insulated
                      SWA (BS 5467) has a maximum conductor temperature of 70 degrees Celsius.
                      XLPE-insulated SWA (BS 5467) has a maximum of 90 degrees Celsius and carries
                      significantly higher current for the same conductor size.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Number of cores</strong> — 2-core SWA is
                      used for single-phase circuits (line and neutral, with the armour as CPC).
                      3-core SWA is used where a separate CPC conductor is needed or for three-phase
                      supplies. 4-core is used for three-phase with neutral.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Voltage drop</strong> — SWA cables are
                      often used for longer runs (to outbuildings, across sites). Longer runs mean
                      higher voltage drop, which may require upsizing the cable beyond the minimum
                      for current-carrying capacity. Always verify voltage drop using the mV/A/m
                      values from BS 7671 Appendix 4.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Ground temperature</strong> — For direct
                      burial, the soil temperature and thermal resistivity affect the cable rating.
                      BS 7671 assumes a ground temperature of 20 degrees Celsius and a soil thermal
                      resistivity of 2.5 K.m/W for standard ratings. Different conditions require
                      correction factors.
                    </span>
                  </li>
                </ul>
              </div>
              <SEOAppBridge
                title="SWA Cable Sizing Calculator"
                description="Elec-Mate's cable sizing calculator includes all BS 7671 Appendix 4 tables for SWA cable — PVC and XLPE insulation, all installation methods, correction factors for ground temperature and soil resistivity, voltage drop verification, and armour CPC check. Size SWA cables in seconds."
                icon={Calculator}
              />
            </>
          ),
        },
        {
          id: 'burial-depth',
          heading: 'Burial Depth Requirements',
          content: (
            <>
              <p>
                When installing SWA cable underground, BS 7671 and the IET On-Site Guide provide
                guidance on minimum burial depth. The requirements depend on the location and
                whether additional mechanical protection is provided.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">Without Protection</h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    Minimum 500 mm burial depth below finished ground level. This applies to general
                    areas such as gardens, driveways, and fields where the cable is direct-buried
                    with no additional mechanical protection.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    Route marker tape (yellow warning tape marked "CAUTION — ELECTRIC CABLE BELOW")
                    must be placed at least 150 mm above the cable to warn anyone digging in the
                    area.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">With Protection</h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    Where additional mechanical protection is provided — such as cable tiles,
                    concrete troughs, or duct — the cable may be installed at a shallower depth.
                    Cable tiles placed directly above the cable provide impact resistance and a
                    visual warning during excavation.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    Under roads and areas subject to heavy vehicular traffic, a minimum depth of 600
                    mm is recommended even with SWA cable, due to the increased risk of damage from
                    construction vehicles and resurfacing work.
                  </p>
                </div>
              </div>
              <p>
                The cable route should be recorded on the installation drawings and provided to the
                client. For domestic installations, a simple sketch showing the cable route, depth,
                and key reference points (distance from walls, fences, and other permanent features)
                is essential. This prevents future damage when the client or their gardener digs in
                the area.
              </p>
              <p>
                Where SWA cable crosses under a road, driveway, or patio, it should be installed in
                a duct (typically 63 mm or 100 mm diameter MDPE or PVC duct) to allow future
                replacement without excavation. The duct should extend at least 300 mm beyond the
                edge of the hard surface on each side.
              </p>
              <SEOInternalLink href="/guides/earthing-arrangements">
                Earthing arrangements for outdoor installations
              </SEOInternalLink>{' '}
              — check PME restrictions for supplies extending outside the main equipotential zone.
            </>
          ),
        },
        {
          id: 'glands-termination',
          heading: 'Cable Glands and Termination',
          content: (
            <>
              <p>
                Correct termination of SWA cable is critical for both mechanical integrity and earth
                continuity. The cable gland grips the steel wire armour, provides strain relief, and
                maintains the electrical connection between the armour and the enclosure or earth
                system.
              </p>
              <p>
                There are three main types of cable gland used with SWA cable in UK installations:
              </p>
              <div className="space-y-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-2">CW Gland (Indoor Use)</h3>
                  <p className="text-white text-sm leading-relaxed">
                    The CW (Cable Wire) gland is the standard indoor gland for SWA cable. It
                    consists of a body, a compression ring (cone), an armour lock ring, and a back
                    nut. The compression ring bites into the steel wire armour to provide mechanical
                    grip and earth continuity. CW glands are rated IP40 and are suitable for dry
                    indoor environments. They are the most commonly used gland type for consumer
                    unit and distribution board entries.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-2">
                    CX Gland (Outdoor / Weatherproof)
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    The CX gland adds a neoprene shroud (outer seal) to the CW gland design,
                    providing weatherproof sealing to IP68 when fully assembled. CX glands are used
                    for outdoor installations, underground cable entries, and any location where the
                    gland may be exposed to moisture. The shroud seals around the cable oversheath,
                    preventing water ingress at the termination point.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-2">
                    BW Gland (Lead-Sheathed Cable)
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    BW glands are designed for cable types with a continuous metallic sheath rather
                    than wire armour — such as MICC cable or older lead-sheathed cables. They are
                    not used with standard SWA cable but are mentioned here to avoid confusion when
                    sourcing glands.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">
                  Correct SWA Gland Installation
                </h3>
                <ul className="space-y-3 text-white text-sm leading-relaxed">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Strip the outer sheath to expose the wire armour. Strip length depends on
                      gland size — typically 30 to 50 mm for domestic sizes.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Cut the wire armour cleanly with SWA cutters (not a hacksaw, which leaves
                      jagged edges). Fan out the wires evenly around the inner bedding sheath.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Fit the gland body through the enclosure knockout. Tighten the locknut on the
                      outside to secure the gland body to the enclosure.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Feed the cable into the gland body. Position the compression ring over the
                      fanned armour wires and tighten the back nut to compress the ring onto the
                      armour. This must be tight enough to grip securely but not so tight that it
                      damages the armour wires.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      For CX glands, slide the shroud over the cable oversheath and tighten to
                      create the weatherproof seal.
                    </span>
                  </li>
                </ul>
              </div>
            </>
          ),
        },
        {
          id: 'bonding-armour',
          heading: 'Bonding the Steel Wire Armour',
          content: (
            <>
              <p>
                The steel wire armour of SWA cable serves as an earth continuity path and must be
                bonded at both ends to ensure effective fault protection. The gland provides the
                primary bonding connection between the armour and the metallic enclosure (consumer
                unit, distribution board, junction box, or metal accessory).
              </p>
              <p>
                For the armour to serve as the sole CPC for the circuit, its cross-sectional area
                must meet the requirements of BS 7671. Table 54.7 sets out the minimum CPC size
                based on the line conductor size, and the adiabatic equation (k squared S squared
                greater than or equal to I squared t) must be verified to ensure the armour can
                withstand the prospective fault current for the disconnection time of the protective
                device.
              </p>
              <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-6">
                <h3 className="font-bold text-yellow-400 text-lg mb-3">
                  When Is a Separate CPC Needed?
                </h3>
                <div className="space-y-3 text-white text-sm leading-relaxed">
                  <p>
                    In most domestic installations using 2-core SWA cable (sizes up to 16 mm
                    squared), the steel wire armour cross-sectional area is sufficient to act as the
                    CPC. However, there are situations where an additional CPC conductor may be
                    required:
                  </p>
                  <ul className="space-y-2 mt-3">
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        Where the adiabatic equation check shows the armour cannot withstand the
                        prospective fault current — typically with larger cables and high fault
                        levels.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        Where the armour resistance is too high to achieve the required earth fault
                        loop impedance (Zs) for the protective device to disconnect within the
                        required time.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        Where the installation specification requires a separate CPC for additional
                        reliability — some commercial and industrial specifications mandate this.
                      </span>
                    </li>
                  </ul>
                  <p className="mt-3">
                    In these cases, use 3-core SWA cable and connect the third core as the CPC,
                    bonded in parallel with the armour at both ends.
                  </p>
                </div>
              </div>
              <p>
                At the supply end, ensure the gland makes a solid connection to the metallic
                consumer unit or distribution board enclosure. At the load end, if the cable
                terminates at a non-metallic enclosure (such as a plastic isolator or junction box),
                an{' '}
                <SEOInternalLink href="/guides/earthing-arrangements">earth tail</SEOInternalLink>{' '}
                must be connected from the gland earth tag to the circuit earth terminal.
              </p>
            </>
          ),
        },
        {
          id: 'outdoor-underground',
          heading: 'Outdoor and Underground Installation',
          content: (
            <>
              <p>
                SWA cable is the cable of choice for outdoor and underground wiring in the UK. Its
                mechanical armour provides protection against accidental damage during gardening,
                landscaping, and construction work, and the cable is rated for direct burial without
                additional ducting (though ducting is recommended under hard surfaces for future
                maintenance access).
              </p>
              <div className="space-y-4 my-6">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">Trench preparation</h3>
                      <p className="text-white text-sm leading-relaxed">
                        Dig the trench to the required depth (minimum 500 mm) with a flat bottom.
                        Remove any sharp stones, rocks, or debris that could damage the cable
                        oversheath. Place a 50 mm layer of fine sand or sifted soil at the bottom of
                        the trench as a bedding layer. Lay the cable on the bedding, then cover with
                        another 50 mm layer of sand or sifted soil before backfilling.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">Warning tape and markers</h3>
                      <p className="text-white text-sm leading-relaxed">
                        Place yellow warning tape marked "CAUTION — ELECTRIC CABLE BELOW" at least
                        150 mm above the cable. This provides an early warning to anyone digging in
                        the area. At cable route changes of direction and at each end, install
                        permanent route markers (posts, plaques, or indelible markings on adjacent
                        structures) so the cable route can be traced in future.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">Building entry</h3>
                      <p className="text-white text-sm leading-relaxed">
                        Where the cable enters a building, use a duct through the wall to prevent
                        damage from building movement and to maintain the building's weather seal.
                        The duct should be sealed at both ends with duct sealant to prevent moisture
                        and vermin entry. The cable should rise vertically from ground level to the
                        entry point — avoid running horizontally along the outside of the building
                        at low level where it is vulnerable to damage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                For{' '}
                <SEOInternalLink href="/guides/ev-charger-installation">
                  EV charger installations
                </SEOInternalLink>
                , SWA cable from the consumer unit to an external charge point is the standard
                approach. Check PME restrictions if the supply is TN-C-S — a separate earth
                electrode may be required for the charge point installation.
              </p>
              <SEOAppBridge
                title="AI Installation Guide for SWA Cable"
                description="Elec-Mate's AI installer agent provides step-by-step guidance for SWA cable installations. Describe your job — garage supply, garden office, EV charger, external lighting — and get tailored installation guidance including cable size, gland type, burial requirements, and testing procedures."
                icon={Brain}
              />
            </>
          ),
        },
        {
          id: 'testing',
          heading: 'Testing SWA Cable Installations',
          content: (
            <>
              <p>
                Testing an SWA cable installation follows the standard{' '}
                <SEOInternalLink href="/guides/testing-sequence">
                  BS 7671 testing sequence
                </SEOInternalLink>
                , but with specific attention to the armour continuity, insulation resistance
                between cores and armour, and the earth fault loop impedance through the armour CPC.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">SWA Cable Test Sequence</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Continuity of the armour CPC</strong> —
                      Measure the resistance of the armour between both glands using a
                      low-resistance ohmmeter. This verifies the glands are making good contact with
                      the armour and the armour is continuous. Record the R2 value (armour
                      resistance) for the R1+R2 calculation.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Insulation resistance</strong> — Test
                      between all conductors and between each conductor and the armour at 500V DC
                      (for circuits up to 500V). Minimum acceptable reading is 1 megaohm, but new
                      SWA cable should read well above 100 megaohms. Low readings between a
                      conductor and the armour indicate insulation damage — possibly caused during
                      installation (over-bending, crushing, or damage from gland installation).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Earth fault loop impedance (Zs)</strong> —
                      Measure Zs at the far end of the SWA cable circuit with the circuit energised.
                      The Zs value includes the armour resistance as the CPC return path. Verify the
                      measured Zs does not exceed 80% of the maximum permitted Zs for the protective
                      device (to account for temperature variation).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Polarity</strong> — Verify correct
                      polarity at all points. For 2-core SWA, confirm that the brown core is
                      connected to line and the blue core to neutral at both ends.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Record all test results on the{' '}
                <SEOInternalLink href="/guides/eic-certificate">
                  Electrical Installation Certificate
                </SEOInternalLink>{' '}
                schedule of test results. For SWA circuits, note the armour resistance separately as
                this is a useful reference for future periodic inspection — an increase in armour
                resistance may indicate corrosion or deterioration of the gland connections.
              </p>
              <SEOAppBridge
                title="Digital Test Result Recording"
                description="Record SWA cable test results directly into Elec-Mate's digital certificate forms. The app validates readings against BS 7671 limits, flags any values outside tolerance, and generates professional PDF certificates for your client."
                icon={ClipboardCheck}
              />
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What depth should SWA cable be buried?',
          answer:
            'BS 7671 and the IET On-Site Guide recommend a minimum burial depth of 500 mm below finished ground level for SWA cable without additional mechanical protection. Where additional protection is provided (cable tiles, concrete troughs, or duct), the cable may be installed at a shallower depth. Under roads and areas subject to heavy vehicular traffic, 600 mm minimum is recommended even with SWA cable. Yellow warning tape marked "CAUTION — ELECTRIC CABLE BELOW" must be placed at least 150 mm above the cable. Always record the cable route on the installation drawings and provide this to the client.',
        },
        {
          question: 'Can the SWA armour be used as the earth conductor?',
          answer:
            'Yes, the steel wire armour of SWA cable can serve as the circuit protective conductor (CPC) provided the cross-sectional area of the armour meets the requirements of BS 7671. This must be verified using Table 54.7 (minimum CPC sizes based on line conductor size) and the adiabatic equation (k squared S squared greater than or equal to I squared t) to confirm the armour can withstand the prospective fault current. For most domestic installations using 2-core SWA cable up to 16 mm squared, the armour cross-sectional area is sufficient. For larger cables or higher fault levels, a separate CPC conductor (using 3-core SWA) may be required.',
        },
        {
          question: 'What type of gland should I use for SWA cable?',
          answer:
            'For indoor terminations, use CW (Cable Wire) glands — rated IP40, suitable for dry environments. For outdoor or weatherproof terminations, use CX glands — these add a neoprene shroud that seals around the cable oversheath, providing IP68 weatherproof protection. BW glands are for lead-sheathed or smooth-bore armoured cables, not standard SWA. Always use the correct gland size for the cable outer diameter — an incorrect size will not grip the armour properly and will compromise both mechanical integrity and earth continuity.',
        },
        {
          question: 'Does SWA cable need RCD protection?',
          answer:
            'Not in all cases. BS 7671 Regulation 411.3.4 requires RCD protection for cables installed in walls at less than 50 mm depth unless the cable has an earthed metallic covering. SWA cable has an earthed metallic covering (the steel wire armour), so it is exempt from this specific RCD requirement. However, the circuit may still require RCD protection for other reasons — for example, if it supplies socket outlets up to 32A, or if it supplies mobile equipment intended for outdoor use. The exemption only applies to the cable-in-wall requirement, not to the general RCD requirements for socket outlets and outdoor circuits.',
        },
        {
          question: 'Can SWA cable be installed on the surface rather than underground?',
          answer:
            'Yes, SWA cable is suitable for surface mounting. It can be clipped directly to walls, ceilings, and structural steelwork using appropriate saddle clips or cable cleats. When surface-mounted, SWA cable uses Reference Method C (clipped direct) current-carrying capacity ratings from BS 7671 Appendix 4, which are higher than the Reference Method D (direct burial) ratings because the cable can dissipate heat more effectively in free air. Surface-mounted SWA cable should be supported at appropriate intervals — typically every 300 to 450 mm horizontally and every 400 to 600 mm vertically, depending on cable size.',
        },
        {
          question: 'What is the difference between PVC and XLPE SWA cable?',
          answer:
            'PVC-insulated SWA cable has a maximum conductor operating temperature of 70 degrees Celsius, while XLPE (Cross-Linked Polyethylene) insulated SWA has a maximum of 90 degrees Celsius. The higher temperature rating of XLPE cable means it can carry significantly more current for the same conductor size — typically 15 to 25 percent more than PVC. XLPE SWA is also more resistant to thermal ageing and performs better at sustained high temperatures. For long cable runs where voltage drop is the limiting factor rather than current rating, PVC SWA is perfectly adequate. For heavily loaded circuits or where cable size must be minimised, XLPE SWA provides a useful advantage.',
        },
        {
          question: 'How does Elec-Mate help with SWA cable installations?',
          answer:
            'Elec-Mate provides several tools for SWA cable work. The cable sizing calculator includes all BS 7671 Appendix 4 tables for SWA cable — both PVC and XLPE insulation types, all installation methods, correction factors for ground temperature and soil resistivity, and automatic voltage drop verification. The adiabatic equation calculator checks whether the armour can serve as the CPC. The AI installer agent provides step-by-step installation guidance tailored to your specific job. And the digital certificate forms record all test results with validation against BS 7671 limits.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/how-to-size-cables-bs-7671',
          title: 'Cable Sizing Guide',
          description: 'Complete BS 7671 cable sizing process with correction factors.',
          icon: Calculator,
          category: 'Guide',
        },
        {
          href: '/guides/earthing-arrangements',
          title: 'Earthing Arrangements',
          description: 'TN-S, TN-C-S, TT systems and PME restrictions.',
          icon: ShieldCheck,
          category: 'Guide',
        },
        {
          href: '/guides/micc-cable-guide',
          title: 'MICC Cable Guide',
          description: 'Mineral insulated cable properties and termination.',
          icon: Cable,
          category: 'Guide',
        },
        {
          href: '/guides/ev-charger-installation',
          title: 'EV Charger Installation',
          description: 'SWA cable for EV charger supplies and PME considerations.',
          icon: Zap,
          category: 'Installation',
        },
        {
          href: '/guides/testing-sequence',
          title: 'Testing Sequence Guide',
          description: 'BS 7671 initial verification testing procedures.',
          icon: ClipboardCheck,
          category: 'Guide',
        },
        {
          href: '/guides/voltage-drop-bs7671',
          title: 'Voltage Drop Guide',
          description: 'Voltage drop calculations for longer cable runs.',
          icon: Wrench,
          category: 'Guide',
        },
      ]}
      ctaHeading="Size and Certify SWA Installations"
      ctaSubheading="Elec-Mate's cable sizing calculator, AI installer, and digital certificates cover every SWA cable job. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
