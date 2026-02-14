import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Battery,
  CheckCircle2,
  Zap,
  Calculator,
  AlertTriangle,
  ShieldCheck,
  FileText,
  Brain,
  Cable,
  ClipboardCheck,
  Gauge,
  Server,
} from 'lucide-react';

export default function UPSInstallationGuidePage() {
  return (
    <GuideTemplate
      title="UPS Installation Guide | Uninterruptible Power Supply"
      description="Complete guide to UPS installation for electricians. Covers online, offline, and line-interactive UPS types, sizing calculations, installation requirements, earthing, bypass switching, battery maintenance, and BS 7671 compliance for single-phase and three-phase UPS systems."
      datePublished="2025-09-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Installation', href: '/guides' },
        { label: 'UPS Installation', href: '/guides/ups-installation-guide' },
      ]}
      tocItems={[
        { id: 'what-is-ups', label: 'What Is a UPS?' },
        { id: 'ups-types', label: 'UPS Types Compared' },
        { id: 'sizing-a-ups', label: 'Sizing a UPS' },
        { id: 'installation-requirements', label: 'Installation Requirements' },
        { id: 'earthing-and-bonding', label: 'Earthing & Bonding' },
        { id: 'bypass-and-maintenance', label: 'Bypass & Maintenance' },
        { id: 'battery-management', label: 'Battery Management' },
        { id: 'testing-commissioning', label: 'Testing & Commissioning' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Installation Guide"
      badgeIcon={Battery}
      heroTitle={
        <>
          UPS Installation Guide
          <br />
          <span className="text-yellow-400">Uninterruptible Power Supply</span>
        </>
      }
      heroSubtitle="Uninterruptible power supplies protect critical loads from mains failure, voltage sags, surges, and frequency variations. From small desktop units to large three-phase systems, this guide covers UPS types, sizing, installation requirements, earthing considerations, maintenance, and how to test and commission a UPS installation to BS 7671."
      readingTime={15}
      keyTakeaways={[
        'There are three main UPS types: offline (standby), line-interactive, and online (double conversion). Online UPS provides the highest level of protection with zero transfer time and completely isolated output, but is the most expensive and generates the most heat.',
        'UPS sizing must account for the total VA/kW load of all connected equipment, the required runtime on battery, the power factor of the load, and a 20-30% headroom for future expansion. Under-sizing is the most common installation error.',
        'UPS batteries are the weakest link. Sealed lead-acid batteries have a typical design life of 3-5 years (standard) or 8-10 years (long-life). Regular battery testing and planned replacement schedules are essential for reliable UPS operation.',
        'Earthing a UPS system requires careful consideration. The UPS output may be a separately derived source (requiring its own earth reference) or a non-separately derived source (using the input earth). The earthing arrangement must be confirmed with the UPS manufacturer.',
        'A manual bypass switch must be installed to allow the UPS to be isolated for maintenance without interrupting power to the critical load. This is a fundamental installation requirement for any UPS over 3kVA.',
      ]}
      sections={[
        {
          id: 'what-is-ups',
          heading: 'What Is a UPS?',
          content: (
            <>
              <p>
                An uninterruptible power supply (UPS) is a device that provides emergency power to
                connected equipment when the mains supply fails. Unlike a standby generator, which
                takes 10-30 seconds to start and reach stable output, a UPS switches to battery
                power instantaneously (or near-instantaneously), ensuring that sensitive equipment
                experiences no interruption.
              </p>
              <p>
                UPS systems are used wherever a power interruption would cause data loss, equipment
                damage, safety risks, or financial loss. Common applications include server rooms,
                data centres, medical equipment, industrial control systems, CCTV and security
                systems, point-of-sale terminals, and telecommunications equipment.
              </p>
              <p>
                A UPS typically contains three main components: a rectifier/charger (which converts
                mains AC to DC and charges the batteries), a battery bank (which stores energy for
                use during a mains failure), and an inverter (which converts the DC battery power
                back to AC to supply the load). The arrangement and interaction of these components
                determines the UPS type and its performance characteristics.
              </p>
              <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-bold text-white text-lg">UPS vs Generator</h3>
                </div>
                <p className="text-white text-sm leading-relaxed">
                  A UPS and a generator serve different purposes. A UPS provides immediate,
                  short-duration power (minutes to hours) to bridge the gap during a mains failure.
                  A generator provides long-duration power (hours to days) but takes time to start.
                  In critical installations, both are used together — the UPS provides immediate
                  protection while the generator starts, then the generator takes over for extended
                  outages.
                </p>
              </div>
            </>
          ),
        },
        {
          id: 'ups-types',
          heading: 'UPS Types Compared',
          content: (
            <>
              <p>
                The three main UPS types differ in how they handle the mains supply during normal
                operation and how quickly they transfer to battery during a mains failure.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Battery className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Offline (Standby) UPS</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    The simplest and most affordable type. During normal operation, the load is
                    supplied directly from the mains — the UPS only activates when a mains failure
                    is detected. Transfer time is typically 5-12 milliseconds. Suitable for desktop
                    PCs, home networking equipment, and non-critical loads. Not suitable for
                    sensitive equipment that cannot tolerate any transfer time or voltage/frequency
                    variations.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Battery className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Line-Interactive UPS</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Adds an autotransformer (voltage regulator) to the offline design. This allows
                    the UPS to correct voltage sags and swells without switching to battery,
                    extending battery life. Transfer time is typically 2-4 milliseconds. Suitable
                    for small server rooms, network equipment, and point-of-sale systems. The most
                    popular type for small to medium business applications.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Battery className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Online (Double Conversion) UPS</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    The load is always supplied by the inverter, regardless of mains status. The
                    mains supply charges the batteries and powers the rectifier, but the load is
                    completely isolated from the mains by the double conversion process (AC to DC,
                    then DC back to AC). Transfer time is zero — there is no transfer because the
                    inverter is always running. Provides complete protection against all mains
                    disturbances. Essential for data centres, medical equipment, and any critical
                    load that cannot tolerate any power quality deviation.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Quick Comparison</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-white font-bold">Offline</span>
                    <span className="text-yellow-400 font-bold">5-12ms transfer</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-white font-bold">Line-Interactive</span>
                    <span className="text-yellow-400 font-bold">2-4ms transfer</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                    <span className="text-white font-bold">Online (Double Conversion)</span>
                    <span className="text-yellow-400 font-bold">0ms (no transfer)</span>
                  </div>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'sizing-a-ups',
          heading: 'Sizing a UPS',
          content: (
            <>
              <p>
                Correct UPS sizing is critical. An undersized UPS will overload during normal
                operation or fail to provide the required runtime on battery. An oversized UPS
                wastes money and may operate inefficiently at light loads.
              </p>
              <div className="space-y-3 mt-4">
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Calculate the Total Load</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Add up the VA (volt-ampere) rating or wattage of every piece of equipment that
                      will be connected to the UPS. Use the equipment's rated power consumption, not
                      the fuse rating or circuit breaker size. For IT equipment, the nameplate
                      rating is often significantly higher than the actual consumption — measuring
                      with a power meter gives a more accurate figure.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Account for Power Factor</h4>
                    <p className="text-white text-sm leading-relaxed">
                      UPS systems are rated in VA (apparent power) and kW (real power). The ratio
                      between them is the power factor. Most modern IT loads have a power factor of
                      0.9-1.0, while older equipment may be 0.6-0.8. The UPS must be sized to handle
                      both the VA and kW requirements of the load. A 10kVA UPS with a 0.9 power
                      factor can supply a maximum of 9kW of real power.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Determine Required Runtime</h4>
                    <p className="text-white text-sm leading-relaxed">
                      How long must the UPS support the load during a mains failure? For UPS systems
                      with a generator backup, 5-10 minutes may be sufficient (enough for the
                      generator to start and stabilise). For standalone UPS systems, 30-60 minutes
                      or more may be needed. Longer runtime requires larger (or additional) battery
                      banks.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    4
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Add Headroom</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Always add 20-30% headroom above the calculated load to allow for future
                      expansion, inrush currents during equipment startup, and battery degradation
                      over time. A UPS running at 70-80% of its rated capacity is in the optimal
                      efficiency range — both higher and lower loading reduce efficiency.
                    </p>
                  </div>
                </div>
              </div>
              <SEOAppBridge
                title="Max Demand Calculator"
                description="Elec-Mate's max demand calculator helps size the electrical supply for UPS installations, accounting for diversity, power factor, and future expansion. Calculate the total load before specifying UPS capacity."
                icon={Calculator}
              />
            </>
          ),
        },
        {
          id: 'installation-requirements',
          heading: 'Installation Requirements',
          content: (
            <>
              <p>
                UPS installation involves more than simply plugging in a box. Larger systems (above
                3kVA) require dedicated circuits, appropriate cable sizing, mechanical ventilation,
                and compliance with manufacturer specifications and{' '}
                <SEOInternalLink href="/guides/bs7671-eighteenth-edition">BS 7671</SEOInternalLink>.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">
                  Key Installation Considerations
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Dedicated supply circuit</strong> — The
                      UPS input should be supplied from a dedicated circuit at the consumer unit or
                      distribution board. The circuit protection must be sized for the UPS input
                      current, which can be significantly higher than the output current during
                      battery charging.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Cable sizing</strong> — Input and output
                      cables must be sized for the full rated current of the UPS, accounting for{' '}
                      <SEOInternalLink href="/guides/cable-sizing-guide">
                        derating factors
                      </SEOInternalLink>{' '}
                      for installation method, ambient temperature, and grouping. For three-phase
                      UPS systems, neutral current must be considered as it can exceed phase current
                      due to harmonic loads.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Ventilation and cooling</strong> — UPS
                      systems generate significant heat, particularly online double-conversion types
                      which are typically 92-96% efficient. A 10kVA UPS at 94% efficiency generates
                      600W of heat. The room must have adequate ventilation or air conditioning to
                      maintain the manufacturer's specified operating temperature range (typically
                      15-25 degrees C for optimal battery life).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Floor loading</strong> — Battery cabinets
                      are heavy. A single battery string for a 10kVA UPS can weigh 200-400kg. Verify
                      that the floor can support the weight, particularly on raised access floors or
                      upper storeys.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Emergency power off (EPO)</strong> — A
                      remote emergency power off button must be installed where required by fire
                      regulations or building management. The EPO should disconnect the UPS output
                      and bypass supply simultaneously, ensuring the load is completely
                      de-energised.
                    </span>
                  </li>
                </ul>
              </div>
            </>
          ),
        },
        {
          id: 'earthing-and-bonding',
          heading: 'Earthing and Bonding',
          content: (
            <>
              <p>
                Earthing a UPS system requires careful consideration because the UPS may or may not
                create a separately derived source. The earthing arrangement affects RCD operation,
                fault loop impedance, and the overall safety of the installation.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Non-Separately Derived Source</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Most single-phase UPS systems pass the neutral straight through from input to
                    output without any transformer isolation. In this configuration, the UPS output
                    is not a separately derived source — the earth reference comes from the incoming
                    supply. The earth conductor from the load connects back to the distribution
                    board or consumer unit earth bar as normal. This is the simplest arrangement and
                    is common for small to medium UPS systems.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Separately Derived Source</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Some larger UPS systems (particularly three-phase) include an isolation
                    transformer on the output. This creates a separately derived source — the output
                    neutral is not connected to the input neutral. In this case, a new earth
                    reference must be established at the UPS output transformer, with a
                    neutral-earth bond and a local earth electrode if required. This arrangement
                    must be clearly documented on the{' '}
                    <SEOInternalLink href="/guides/eic-certificate">EIC</SEOInternalLink> and the
                    earthing arrangement verified during commissioning.
                  </p>
                </div>
              </div>
              <p className="mt-4">
                In all cases, the UPS chassis must be bonded to the installation earth. Any external
                battery cabinets must also be bonded. The earth continuity through the UPS must be
                verified during{' '}
                <SEOInternalLink href="/guides/testing-sequence">testing</SEOInternalLink> — an open
                earth on the UPS output would leave connected equipment without a safety earth,
                creating a serious danger.
              </p>
            </>
          ),
        },
        {
          id: 'bypass-and-maintenance',
          heading: 'Bypass and Maintenance Switching',
          content: (
            <>
              <p>
                A UPS will eventually need maintenance — battery replacement, firmware updates, or
                component repair. Without a bypass switch, maintaining the UPS means switching off
                the load, which defeats the purpose of having a UPS in the first place.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Bypass Arrangements</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Internal automatic bypass</strong> — Built
                      into most UPS systems above 1kVA. Automatically transfers the load from
                      inverter to mains bypass if the inverter fails or is overloaded. This happens
                      without interruption but means the load is no longer protected by the UPS.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">External manual bypass switch</strong> — A
                      make-before-break rotary switch installed externally to the UPS. Allows the
                      load to be transferred to the mains bypass supply and the UPS to be completely
                      isolated for maintenance without any interruption to the load. Essential for
                      any UPS above 3kVA and recommended for all sizes.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Wrap-around bypass panel</strong> — A
                      complete bypass panel with input, output, and bypass contactors, plus manual
                      isolation for the UPS input and output. Used for large UPS systems (above
                      10kVA) and provides the most flexible maintenance access. The panel includes
                      interlocking to prevent paralleling the UPS inverter with the bypass supply.
                    </span>
                  </li>
                </ul>
              </div>
            </>
          ),
        },
        {
          id: 'battery-management',
          heading: 'Battery Management',
          content: (
            <>
              <p>
                The batteries are the most critical — and most failure-prone — component of any UPS
                system. A UPS with degraded batteries provides a false sense of security, as it will
                fail to support the load when a mains failure actually occurs.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Battery className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Battery Types</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Most UPS systems use valve-regulated lead-acid (VRLA) batteries — also called
                    sealed lead-acid (SLA) or maintenance-free batteries. Standard VRLA batteries
                    have a design life of 3-5 years; long-life VRLA batteries have a design life of
                    8-10 years. Larger data centre UPS systems may use nickel-cadmium (NiCd)
                    batteries (longer life but higher cost) or lithium-ion batteries (smaller,
                    lighter, longer life, but significantly more expensive and requiring battery
                    management systems).
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Temperature Effects</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Battery life is halved for every 10 degrees C above the recommended operating
                    temperature of 20-25 degrees C. A battery rated for 5 years at 20 degrees C will
                    last only 2.5 years at 30 degrees C and potentially less than 2 years at 35
                    degrees C. This is why UPS room ventilation and cooling are critical — the room
                    temperature directly affects the battery replacement cycle and operating costs.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Battery Testing and Replacement
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Regular battery testing is essential. Most UPS systems have a built-in battery
                    test that can be run automatically or manually. This test discharges the
                    batteries under load and measures the voltage drop to assess capacity. However,
                    a battery test only confirms whether the batteries can support the load right
                    now — it does not predict when they will fail. Battery impedance testing (using
                    a handheld battery analyser) is more predictive and should be carried out
                    annually. Plan to replace batteries at 80% of their design life — do not wait
                    for them to fail.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'testing-commissioning',
          heading: 'Testing and Commissioning',
          content: (
            <>
              <p>
                Testing a UPS installation includes both the standard electrical tests required by
                BS 7671 and UPS-specific functional tests.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">UPS Commissioning Tests</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Standard BS 7671 tests</strong> —
                      Continuity, insulation resistance, polarity, Zs, and PSCC on the UPS input and
                      output circuits. Note that insulation resistance testing must be done with the
                      UPS disconnected — applying 500V DC to UPS input or output terminals with the
                      UPS connected can damage the electronics.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Mains failure simulation</strong> —
                      Disconnect the mains input to the UPS and verify that the load transfers to
                      battery without interruption (or within the specified transfer time for
                      offline/line-interactive types). Check that the load remains stable during the
                      transfer and that the battery voltage and runtime are within specification.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Mains restore test</strong> — Re-apply the
                      mains supply and verify that the UPS transfers back from battery to mains
                      without interruption. Check that battery recharging begins automatically.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Bypass transfer test</strong> — Verify
                      that the internal bypass transfers the load to mains bypass without
                      interruption. Test the external manual bypass switch (if fitted) to confirm
                      make-before-break operation.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Runtime test</strong> — Run the UPS on
                      battery under the actual connected load and time how long it supports the load
                      before the low-battery shutdown. Compare against the manufacturer's runtime
                      specification at the measured load level.
                    </span>
                  </li>
                </ul>
              </div>
              <SEOAppBridge
                title="EIC for UPS Installations"
                description="Elec-Mate's digital EIC form handles UPS installation certification including supply characteristics, circuit details, and all test results. Record the complete commissioning data on site and generate a professional certificate immediately."
                icon={FileText}
              />
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What size UPS do I need for a server room?',
          answer:
            "Start by measuring the actual power consumption of all equipment that will be connected to the UPS — servers, switches, routers, storage, and any other IT equipment. Use a power meter at the PDU (power distribution unit) or calculate from equipment nameplates. Add up the total VA and kW figures. Then add 20-30% headroom for future expansion and inrush currents. For runtime, 10-15 minutes is typical if a generator backup is available; 30-60 minutes or more if the UPS is the only backup. A typical small server room with 2-4 servers and networking equipment might need a 6-10kVA online UPS. Always consult the UPS manufacturer's sizing tools for accurate battery runtime calculations.",
        },
        {
          question: 'How often should UPS batteries be replaced?',
          answer:
            'Standard VRLA batteries should be replaced every 3-4 years (design life is 5 years, but best practice is to replace at 80% of design life). Long-life VRLA batteries should be replaced every 7-8 years (design life 10 years). These are guidelines assuming the batteries operate at 20-25 degrees C. Higher temperatures significantly shorten battery life. Annual battery impedance testing helps predict when replacement is needed — if impedance increases by more than 25% from the baseline measurement, replacement should be planned regardless of age.',
        },
        {
          question: 'Can I install a UPS without a bypass switch?',
          answer:
            'Technically, yes, but it is strongly discouraged for any UPS above 3kVA. Without a bypass switch, any UPS maintenance requires the load to be switched off. For critical loads, this means planning a maintenance window, shutting down all connected equipment, carrying out the UPS maintenance, then restarting everything. A manual bypass switch allows the load to be transferred to the raw mains supply (without UPS protection) while the UPS is isolated for maintenance — the load is still powered, just temporarily unprotected. The cost of a bypass switch is minimal compared to the cost of planned downtime.',
        },
        {
          question: 'Does a UPS protect against lightning?',
          answer:
            'A UPS provides some protection against voltage transients, but it is not designed to handle direct or nearby lightning strikes. An online UPS provides the best transient protection because the load is always supplied by the inverter, which generates a clean output regardless of what appears on the input. However, a severe lightning strike can overwhelm the UPS input protection and damage the rectifier. For installations in lightning-prone areas, a surge protective device (SPD) should be installed at the consumer unit upstream of the UPS input. The combination of an SPD and a UPS provides comprehensive protection.',
        },
        {
          question: 'What earthing arrangement does a UPS need?',
          answer:
            "This depends on the UPS type. Most single-phase UPS systems pass the neutral through without isolation, so the output earth reference is the same as the input — no special earthing is needed. Some larger UPS systems with output isolation transformers create a separately derived source, which requires a new neutral-earth bond at the transformer and potentially a local earth electrode. Always check the UPS manufacturer's installation manual and confirm the earthing arrangement before commissioning. The earthing arrangement must be recorded on the EIC.",
        },
        {
          question: 'Can a UPS cause RCD tripping?',
          answer:
            'Yes. Online double-conversion UPS systems can cause RCD tripping because the high-frequency switching in the rectifier and inverter generates leakage currents that flow to earth through parasitic capacitances in the UPS and connected equipment. These leakage currents can be sufficient to trip a 30mA RCD. For this reason, UPS input circuits are often protected by an RCBO with a higher sensitivity (100mA or 300mA) or by an MCB alone (with the earth fault protection provided by the upstream distribution). Always consult the UPS manufacturer for guidance on RCD compatibility.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/eic-certificate',
          title: 'EIC Certificate',
          description: 'How to complete the Electrical Installation Certificate.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/calculators/cable-sizing',
          title: 'Cable Sizing Calculator',
          description: 'Size cables for UPS input and output circuits.',
          icon: Calculator,
          category: 'Calculator',
        },
        {
          href: '/guides/bs7671-eighteenth-edition',
          title: 'BS 7671 Guide',
          description: 'Full guide to the 18th Edition Wiring Regulations.',
          icon: ShieldCheck,
          category: 'Regulation',
        },
        {
          href: '/guides/testing-sequence',
          title: 'Testing Sequence Guide',
          description: 'The correct order of electrical tests.',
          icon: ClipboardCheck,
          category: 'Guide',
        },
        {
          href: '/calculators/max-demand',
          title: 'Max Demand Calculator',
          description: 'Calculate maximum demand for UPS sizing.',
          icon: Gauge,
          category: 'Calculator',
        },
        {
          href: '/guides/earthing-arrangements',
          title: 'Earthing Arrangements',
          description: 'TN-S, TN-C-S, and TT earthing explained.',
          icon: Zap,
          category: 'Guide',
        },
      ]}
      ctaHeading="Size, Install & Certify With Elec-Mate"
      ctaSubheading="Cable sizing, max demand calculator, EIC forms, and AI-powered circuit design for UPS installations and critical power systems. 7-day free trial, cancel anytime."
    />
  );
}
