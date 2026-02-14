import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Calculator,
  Zap,
  Cable,
  ShieldCheck,
  BookOpen,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  TrendingDown,
  ClipboardCheck,
} from 'lucide-react';

export default function VoltageDropGuideBS7671Page() {
  return (
    <GuideTemplate
      title="Voltage Drop Limits BS 7671 | How to Calculate | Elec-Mate"
      description="Complete guide to voltage drop limits and calculations to BS 7671:2018+A3:2024. Regulation 525.1 limits (3% lighting, 5% other), the mV/A/m formula with worked examples, Appendix 4 tables, and temperature correction explained."
      datePublished="2025-07-01"
      dateModified="2026-02-14"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'Voltage Drop Limits BS 7671', href: '/guides/voltage-drop-limits-bs-7671' },
      ]}
      tocItems={[
        { id: 'what-is-voltage-drop', label: 'What Is Voltage Drop?' },
        { id: 'bs7671-limits', label: 'BS 7671 Voltage Drop Limits' },
        { id: 'how-to-calculate', label: 'How to Calculate Voltage Drop' },
        { id: 'worked-examples', label: 'Worked Examples' },
        { id: 'appendix-4', label: 'Appendix 4 Tables Explained' },
        { id: 'temperature-correction', label: 'Temperature Correction' },
        { id: 'when-it-matters', label: 'When Voltage Drop Matters Most' },
        { id: 'three-phase', label: 'Three-Phase Voltage Drop' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="BS 7671 Guide"
      badgeIcon={TrendingDown}
      heroTitle={
        <>
          Voltage Drop Limits <span className="text-yellow-400">BS 7671</span>
          <br />
          How to Calculate
        </>
      }
      heroSubtitle="Voltage drop is one of the five checks in the cable sizing process. BS 7671 Regulation 525.1 sets the maximum permitted voltage drop at 3% for lighting circuits and 5% for other circuits. This guide covers the limits, the formula, worked examples, and when voltage drop matters most."
      readingTime={15}
      keyTakeaways={[
        'BS 7671 Regulation 525.1 limits voltage drop to 3% for lighting circuits (6.9V from a 230V supply) and 5% for all other circuits (11.5V from a 230V supply).',
        'The formula is: VD = mV/A/m x Ib x L / 1000, where mV/A/m comes from the Appendix 4 tables, Ib is the design current in amps, and L is the cable length in metres.',
        'Voltage drop matters most on long cable runs, lighting circuits (tighter 3% limit), high-current loads like showers and EV chargers, and motor loads where low voltage can prevent starting.',
        'For three-phase 400V circuits, the limits are 12V for lighting (3%) and 20V for other circuits (5%), using three-phase mV/A/m values from Appendix 4.',
        "Elec-Mate's voltage drop calculator does the calculation instantly — enter the cable type, length, and load, and get the result with a pass/fail indication against BS 7671 limits.",
      ]}
      sections={[
        {
          id: 'what-is-voltage-drop',
          heading: 'What Is Voltage Drop?',
          content: (
            <>
              <p>
                Voltage drop is the reduction in voltage that occurs as electrical current flows
                through a cable. All cables have resistance, and that resistance causes a voltage
                loss between the supply end (the distribution board) and the load end (the socket,
                light, or appliance). The longer the cable, the higher the current, and the smaller
                the conductor — the greater the voltage drop.
              </p>
              <p>
                Excessive voltage drop can cause problems. Lighting circuits may produce dim or
                flickering lights. Motor loads may fail to start or run inefficiently. Electronic
                equipment may malfunction or shut down. In extreme cases, equipment can be damaged.
                BS 7671 sets maximum voltage drop limits to ensure that the voltage at the load is
                high enough for equipment to operate correctly and safely.
              </p>
              <p>
                Voltage drop is part of the{' '}
                <SEOInternalLink href="/guides/cable-sizing-guide-bs-7671">
                  cable sizing process
                </SEOInternalLink>
                . After selecting a cable based on its current-carrying capacity and correction
                factors, you must verify that the voltage drop across the cable length does not
                exceed the BS 7671 limits. If it does, you need to increase the cable size until the
                voltage drop is within limits.
              </p>
            </>
          ),
        },
        {
          id: 'bs7671-limits',
          heading: 'BS 7671 Voltage Drop Limits (Regulation 525.1)',
          content: (
            <>
              <p>
                BS 7671 Regulation 525.1 sets the maximum permitted voltage drop from the origin of
                the installation to the load. The limits differ depending on the circuit type:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Maximum Voltage Drop Limits</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-white">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 pr-4 font-semibold">Circuit Type</th>
                        <th className="text-left py-3 pr-4 font-semibold">Percentage</th>
                        <th className="text-left py-3 pr-4 font-semibold">230V Single-Phase</th>
                        <th className="text-left py-3 font-semibold">400V Three-Phase</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-3 pr-4 font-semibold">
                          <span className="flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-yellow-400" />
                            Lighting
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-yellow-400 font-bold">3%</td>
                        <td className="py-3 pr-4 font-bold">6.9V</td>
                        <td className="py-3 font-bold">12V</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-semibold">
                          <span className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            All other circuits
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-yellow-400 font-bold">5%</td>
                        <td className="py-3 pr-4 font-bold">11.5V</td>
                        <td className="py-3 font-bold">20V</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p>
                These limits apply from the origin of the installation (the main switch or
                distribution board) to the most distant point on the circuit. For installations
                supplied from a private LV supply (such as a generator or transformer), the limits
                may be relaxed — BS 7671 permits up to 6% for lighting and 8% for other circuits in
                these cases (Regulation 525.1.1).
              </p>
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 my-4">
                <p className="text-white text-sm leading-relaxed">
                  <strong className="text-yellow-400">Important:</strong> The voltage drop values of
                  6.9V and 11.5V assume a nominal supply voltage of 230V. The actual UK supply
                  voltage can vary between 216.2V and 253V (230V -6% / +10%). The voltage drop limit
                  applies at the nominal voltage, not the worst-case low voltage.
                </p>
              </div>
            </>
          ),
        },
        {
          id: 'how-to-calculate',
          heading: 'How to Calculate Voltage Drop',
          content: (
            <>
              <p>The voltage drop formula for single-phase circuits is straightforward:</p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <p className="text-white font-mono text-lg text-center mb-4">
                  VD = (mV/A/m x I<sub>b</sub> x L) / 1000
                </p>
                <div className="space-y-2 text-white text-sm">
                  <p>
                    <strong className="text-yellow-400">VD</strong> = Voltage drop in volts
                  </p>
                  <p>
                    <strong className="text-yellow-400">mV/A/m</strong> = Millivolts per amp per
                    metre (from Appendix 4 tables)
                  </p>
                  <p>
                    <strong className="text-yellow-400">
                      I<sub>b</sub>
                    </strong>{' '}
                    = Design current in amps (the actual load current)
                  </p>
                  <p>
                    <strong className="text-yellow-400">L</strong> = One-way cable length in metres
                    (route length, not straight-line distance)
                  </p>
                </div>
              </div>
              <p>
                The mV/A/m value is specific to each cable type, cable size, and installation
                method. It is found in the voltage drop columns of the Appendix 4 current-carrying
                capacity tables. Each table provides both single-phase (two-column) and three-phase
                (three-column) mV/A/m values.
              </p>
              <p>
                The result is in volts. Compare it against the appropriate limit — 6.9V for lighting
                or 11.5V for other circuits (single-phase 230V). If the voltage drop exceeds the
                limit, you need to increase the cable size or reduce the cable length.
              </p>
              <SEOAppBridge
                title="Voltage Drop Calculator — Instant Results"
                description="Enter the cable type, cable size, length, and load current. Elec-Mate calculates the voltage drop instantly and shows a clear pass/fail against BS 7671 limits. Also built into the cable sizing calculator so voltage drop is automatically checked when you size a cable."
                icon={Calculator}
              />
            </>
          ),
        },
        {
          id: 'worked-examples',
          heading: 'Worked Examples',
          content: (
            <>
              <div className="space-y-6">
                <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6">
                  <h3 className="font-bold text-yellow-400 text-lg mb-4">
                    Example 1: Domestic Ring Circuit
                  </h3>
                  <div className="space-y-2 text-white text-sm leading-relaxed">
                    <p>
                      <strong>Circuit:</strong> Ring final circuit, 2.5mm2 twin and earth, Reference
                      Method C (clipped direct)
                    </p>
                    <p>
                      <strong>
                        Design current (I<sub>b</sub>):
                      </strong>{' '}
                      25A (typical domestic ring circuit load)
                    </p>
                    <p>
                      <strong>Cable length:</strong> 50m total ring length (longest route to the
                      most distant socket = 25m)
                    </p>
                    <p>
                      <strong>mV/A/m:</strong> 18 mV/A/m (from Table 4D5A, 2.5mm2, column for
                      Reference Method C)
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mt-4">
                    <p className="text-white font-mono text-sm">
                      VD = (18 x 25 x 25) / 1000 = <strong>11.25V</strong>
                    </p>
                    <p className="text-white text-sm mt-2">
                      11.25V is within the 5% limit (11.5V) — but only just.{' '}
                      <span className="text-yellow-400 font-semibold">Marginal pass.</span>
                    </p>
                  </div>
                  <p className="text-white text-sm mt-3 leading-relaxed">
                    Note: For a ring circuit, the voltage drop is calculated using the design
                    current and half the total ring length (the longest route to the most distant
                    point). If the ring becomes unbalanced (which happens in practice), the actual
                    voltage drop may be higher. Consider 4mm2 cable for long ring circuits.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
                  <h3 className="font-bold text-white text-lg mb-4">Example 2: Lighting Circuit</h3>
                  <div className="space-y-2 text-white text-sm leading-relaxed">
                    <p>
                      <strong>Circuit:</strong> Lighting radial, 1.5mm2 twin and earth, Reference
                      Method A (enclosed in insulated wall)
                    </p>
                    <p>
                      <strong>
                        Design current (I<sub>b</sub>):
                      </strong>{' '}
                      6A (typical domestic lighting circuit)
                    </p>
                    <p>
                      <strong>Cable length:</strong> 20m to the furthest luminaire
                    </p>
                    <p>
                      <strong>mV/A/m:</strong> 29 mV/A/m (from Table 4D5A, 1.5mm2)
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mt-4">
                    <p className="text-white font-mono text-sm">
                      VD = (29 x 6 x 20) / 1000 = <strong>3.48V</strong>
                    </p>
                    <p className="text-white text-sm mt-2">
                      3.48V is within the 3% lighting limit (6.9V).{' '}
                      <span className="text-green-400 font-semibold">Compliant.</span>
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
                  <h3 className="font-bold text-white text-lg mb-4">
                    Example 3: EV Charger (Long Run)
                  </h3>
                  <div className="space-y-2 text-white text-sm leading-relaxed">
                    <p>
                      <strong>Circuit:</strong> 32A radial for 7.4kW EV charger, 6mm2 twin and
                      earth, Reference Method C
                    </p>
                    <p>
                      <strong>
                        Design current (I<sub>b</sub>):
                      </strong>{' '}
                      32A
                    </p>
                    <p>
                      <strong>Cable length:</strong> 30m (consumer unit to detached garage)
                    </p>
                    <p>
                      <strong>mV/A/m:</strong> 7.3 mV/A/m (from Table 4D5A, 6mm2)
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mt-4">
                    <p className="text-white font-mono text-sm">
                      VD = (7.3 x 32 x 30) / 1000 = <strong>7.01V</strong>
                    </p>
                    <p className="text-white text-sm mt-2">
                      7.01V is within the 5% power limit (11.5V).{' '}
                      <span className="text-green-400 font-semibold">Compliant.</span>
                    </p>
                  </div>
                  <p className="text-white text-sm mt-3 leading-relaxed">
                    If the cable run were 50m instead: VD = (7.3 x 32 x 50) / 1000 = 11.68V — this
                    would <strong className="text-red-400">exceed the 5% limit</strong> and require
                    upsizing to 10mm2 cable.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'appendix-4',
          heading: 'Appendix 4 Tables Explained',
          content: (
            <>
              <p>
                The mV/A/m values used in voltage drop calculations come from the voltage drop
                columns in the Appendix 4 current-carrying capacity tables of BS 7671. Each table
                covers a specific cable type, and within each table, the mV/A/m values vary by cable
                size and number of cores.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Key Appendix 4 Tables</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Table 4D5A</strong> — Single-core and
                      multicore 70C thermoplastic (PVC) insulated cables. The most commonly used
                      table for domestic T&E cable.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Table 4E4A</strong> — Single-core 90C
                      thermosetting (XLPE/LSF) insulated cables in conduit or trunking.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Table 4D4A</strong> — Multicore armoured
                      cables (SWA) with thermoplastic insulation.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Table 4J4A</strong> — Mineral-insulated
                      cables (MICC).
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Each table provides two sets of mV/A/m values: one for single-phase (two conductors
                carrying current) and one for three-phase (three conductors carrying current).
                Ensure you use the correct column for your circuit type. The mV/A/m values account
                for both the resistance and the reactance of the cable — for smaller cables,
                resistance dominates; for larger cables, reactance becomes significant.
              </p>
              <SEOAppBridge
                title="Every Appendix 4 Table Built In"
                description="Elec-Mate's voltage drop calculator and cable sizing calculator have every Appendix 4 table built in. Select the cable type and size, and the correct mV/A/m value is used automatically. No need to look up tables — just enter your parameters and get the result."
                icon={BookOpen}
              />
            </>
          ),
        },
        {
          id: 'temperature-correction',
          heading: 'Temperature Correction for Voltage Drop',
          content: (
            <>
              <p>
                The mV/A/m values in Appendix 4 are given at the conductor's maximum operating
                temperature (70C for PVC, 90C for XLPE). In practice, the conductor operating
                temperature depends on the load current and the ambient temperature. If the cable is
                not fully loaded, the conductor temperature will be lower than the maximum, and the
                actual voltage drop will be less than the calculated value.
              </p>
              <p>
                BS 7671 Appendix 4 provides a correction formula for when a more precise voltage
                drop is needed. The corrected mV/A/m value accounts for the actual conductor
                temperature:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <p className="text-white font-mono text-sm mb-4">
                  mV/A/m (corrected) = mV/A/m (tabulated) x [230 + t<sub>p</sub> - (C<sub>a</sub>
                  <sup>2</sup> - I<sub>b</sub>
                  <sup>2</sup>/I<sub>t</sub>
                  <sup>2</sup>) x (t<sub>p</sub> - 30)] / (230 + t<sub>p</sub>)
                </p>
                <div className="space-y-1 text-white text-xs">
                  <p>
                    <strong>
                      t<sub>p</sub>
                    </strong>{' '}
                    = Maximum conductor operating temperature (70C for PVC)
                  </p>
                  <p>
                    <strong>
                      C<sub>a</sub>
                    </strong>{' '}
                    = Ambient temperature correction factor applied
                  </p>
                  <p>
                    <strong>
                      I<sub>b</sub>
                    </strong>{' '}
                    = Design current
                  </p>
                  <p>
                    <strong>
                      I<sub>t</sub>
                    </strong>{' '}
                    = Tabulated current-carrying capacity of the cable
                  </p>
                </div>
              </div>
              <p>
                In most domestic situations, the simpler calculation using the tabulated mV/A/m
                value directly is sufficient and gives a conservative (worst-case) result. The
                temperature correction is most useful in borderline cases where the calculated
                voltage drop is just above the limit — the correction may bring it within limits and
                avoid unnecessarily upsizing the cable.
              </p>
            </>
          ),
        },
        {
          id: 'when-it-matters',
          heading: 'When Voltage Drop Matters Most',
          content: (
            <>
              <p>
                Voltage drop is not always the determining factor in cable sizing — for short cable
                runs with moderate loads, the current-carrying capacity usually dictates the cable
                size, and voltage drop is well within limits. However, there are common situations
                where voltage drop becomes the critical factor:
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Long Cable Runs</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Any cable run over 20 metres should be checked for voltage drop. Circuits to
                    detached garages, garden offices, outbuildings, and{' '}
                    <SEOInternalLink href="/guides/ev-charger-installation">
                      EV chargers
                    </SEOInternalLink>{' '}
                    in driveways often involve cable runs of 30-50 metres or more. At these
                    distances, voltage drop can easily exceed the 5% limit and may require a cable
                    size one or two steps larger than the current-carrying capacity alone would
                    suggest.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Lighting Circuits</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Lighting circuits have the tighter 3% limit (6.9V), making voltage drop more
                    likely to be the critical factor. This is particularly relevant for long
                    lighting circuits in commercial buildings, warehouses, and large domestic
                    properties where cable runs to distant luminaires can be substantial.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">High-Current Loads</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Electric showers (32-45A), cookers (30-45A), and EV chargers (32A) draw high
                    currents that produce significant voltage drop even on moderate cable lengths. A
                    10.8kW shower on a 15-metre run of 10mm2 cable produces a voltage drop of about
                    3V — well within limits. But the same shower on a 40-metre run produces about
                    8V, pushing close to the limit.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Cable className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Motor Loads</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Motors draw significantly higher current during starting than during running. If
                    the voltage drop is already near the limit at running current, the starting
                    current may cause sufficient voltage drop to prevent the motor starting at all.
                    For motor circuits, it is good practice to keep the running voltage drop well
                    below the 5% limit to allow for starting current.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'three-phase',
          heading: 'Three-Phase Voltage Drop',
          content: (
            <>
              <p>
                For three-phase circuits, the same formula applies, but you use the three-phase
                mV/A/m values from Appendix 4 (these are different from the single-phase values) and
                compare against the three-phase limits:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <p className="text-white font-mono text-sm mb-4">
                  VD = (mV/A/m [3-phase] x I<sub>b</sub> x L) / 1000
                </p>
                <div className="space-y-2 text-white text-sm">
                  <p>
                    <strong className="text-yellow-400">3% lighting limit:</strong> 400V x 0.03 =
                    12V
                  </p>
                  <p>
                    <strong className="text-yellow-400">5% other limit:</strong> 400V x 0.05 = 20V
                  </p>
                </div>
              </div>
              <p>
                Three-phase mV/A/m values are lower than single-phase values for the same cable
                because the voltage drop calculation accounts for three conductors sharing the load.
                The three-phase values are typically about 87% (1/root 3) of the single-phase values
                for the resistive component.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Three-Phase Worked Example</h3>
                <div className="space-y-2 text-white text-sm leading-relaxed">
                  <p>
                    <strong>Circuit:</strong> Three-phase distribution to a sub-board, 16mm2 4-core
                    SWA, Reference Method D (direct buried)
                  </p>
                  <p>
                    <strong>
                      Design current (I<sub>b</sub>):
                    </strong>{' '}
                    60A per phase
                  </p>
                  <p>
                    <strong>Cable length:</strong> 35m
                  </p>
                  <p>
                    <strong>mV/A/m (3-phase):</strong> 2.4 mV/A/m (from Table 4D4A, 16mm2 SWA,
                    three-phase column)
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mt-4">
                  <p className="text-white font-mono text-sm">
                    VD = (2.4 x 60 x 35) / 1000 = <strong>5.04V</strong>
                  </p>
                  <p className="text-white text-sm mt-2">
                    5.04V is within the 5% limit (20V for 400V three-phase).{' '}
                    <span className="text-green-400 font-semibold">Compliant.</span>
                  </p>
                </div>
              </div>
              <SEOAppBridge
                title="Single-Phase and Three-Phase Calculations"
                description="Elec-Mate's voltage drop calculator handles both single-phase and three-phase circuits. Select the supply type, enter the cable details and load, and get an instant result with the correct mV/A/m value from the appropriate Appendix 4 table. Works offline on site."
                icon={Zap}
              />
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What is the maximum voltage drop allowed in BS 7671?',
          answer:
            'BS 7671 Regulation 525.1 sets the maximum voltage drop at 3% for lighting circuits and 5% for all other circuits, measured from the origin of the installation to the load. From a 230V single-phase supply, this equates to 6.9V for lighting and 11.5V for power circuits. From a 400V three-phase supply, the limits are 12V for lighting and 20V for other circuits. These limits apply to the installation side only — the supply side voltage drop (from the transformer to the meter) is the responsibility of the Distribution Network Operator and is not included in the BS 7671 limit.',
        },
        {
          question: 'How do I find the mV/A/m value for a cable?',
          answer:
            'The mV/A/m value is found in the voltage drop columns of the appropriate Appendix 4 table in BS 7671. The table depends on the cable type — Table 4D5A for PVC twin and earth, Table 4D4A for SWA cables, Table 4E4A for XLPE singles in conduit, and so on. Within each table, find the row for your cable size (in mm2) and look at the voltage drop column. There are separate columns for single-phase and three-phase — use the correct one for your circuit. The mV/A/m value already accounts for both resistance and reactance of the cable, so no further adjustment is needed for smaller cable sizes.',
        },
        {
          question: 'What happens if the voltage drop is too high?',
          answer:
            'If the calculated voltage drop exceeds the BS 7671 limit, you have two options: increase the cable size (a larger conductor has lower resistance and therefore lower mV/A/m value), or reduce the cable run length. In practice, reducing cable length is rarely possible — the route is usually dictated by the building layout. So the most common solution is to go up one or two cable sizes. For example, if 2.5mm2 cable gives a voltage drop of 13V on a long run, moving to 4mm2 may reduce it below 11.5V. If not, 6mm2 will almost certainly bring it within limits.',
        },
        {
          question: 'Does voltage drop apply to ring circuits differently?',
          answer:
            'Yes. Ring circuits are calculated differently because the current can flow in both directions around the ring. The effective cable length for voltage drop is half the total ring length (the longest route from the board to the most distant socket around the ring). The design current used is typically the actual load on the ring, not the protective device rating. However, ring circuits can become unbalanced if loads are concentrated on one side, which increases the effective voltage drop beyond the calculated value. For long ring circuits, it is good practice to use 4mm2 cable instead of 2.5mm2 to provide a margin against unbalanced loading.',
        },
        {
          question: 'Can I use Elec-Mate to calculate voltage drop?',
          answer:
            'Yes. Elec-Mate has a dedicated voltage drop calculator that does the calculation instantly. Enter the cable type, cable size, installation method, circuit length, and design current — the calculator applies the correct mV/A/m value from the appropriate Appendix 4 table and gives you the voltage drop in volts with a clear pass or fail indication against the BS 7671 limit. The voltage drop check is also built into the cable sizing calculator, so when you size a cable, voltage drop is automatically verified as part of the process. Both calculators work offline, so you can use them on site without a signal.',
        },
        {
          question: 'Is voltage drop the same as power loss?',
          answer:
            'Voltage drop and power loss are related but not the same thing. Voltage drop is the reduction in voltage across the cable due to its resistance — it is measured in volts. Power loss is the energy dissipated as heat in the cable due to its resistance — it is measured in watts. The power loss equals the voltage drop multiplied by the current (P = VD x Ib). While BS 7671 sets limits on voltage drop rather than power loss, the associated power loss can be significant on long, high-current circuits. For example, a 10V voltage drop at 32A equates to 320W of power being wasted as heat in the cable, which also contributes to conductor temperature rise.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/cable-sizing-guide-bs-7671',
          title: 'Cable Sizing Guide BS 7671',
          description: 'The complete 5-step cable sizing process with worked examples.',
          icon: Cable,
          category: 'Guide',
        },
        {
          href: '/calculators/voltage-drop',
          title: 'Voltage Drop Calculator',
          description: 'Calculate voltage drop instantly with BS 7671 Appendix 4 tables.',
          icon: Calculator,
          category: 'Calculator',
        },
        {
          href: '/calculators/cable-sizing',
          title: 'Cable Sizing Calculator',
          description: 'Size cables with automatic voltage drop verification.',
          icon: Zap,
          category: 'Calculator',
        },
        {
          href: '/guides/bs-7671-18th-edition',
          title: 'BS 7671 18th Edition Guide',
          description: 'Complete overview of the 18th Edition Wiring Regulations.',
          icon: BookOpen,
          category: 'Regulations',
        },
        {
          href: '/guides/ev-charger-installation',
          title: 'EV Charger Installation Guide',
          description: 'Circuit design and cable sizing for EV charger installations.',
          icon: Zap,
          category: 'Guide',
        },
        {
          href: '/calculators/adiabatic-equation',
          title: 'Adiabatic Equation Calculator',
          description: 'Verify fault current withstand after sizing cables.',
          icon: ShieldCheck,
          category: 'Calculator',
        },
      ]}
      ctaHeading="Calculate Voltage Drop in Seconds"
      ctaSubheading="Every Appendix 4 table built in. Enter cable type, length, and load — get an instant pass/fail result. Plus 70 more calculators, 8 certificate types, and 8 AI agents. 7-day free trial."
    />
  );
}
