import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Cable,
  Calculator,
  Zap,
  ShieldCheck,
  BookOpen,
  Thermometer,
  AlertTriangle,
  CheckCircle2,
  FileText,
  TrendingDown,
  ClipboardCheck,
} from 'lucide-react';

export default function CableSizingGuideBS7671Page() {
  return (
    <GuideTemplate
      title="Cable Sizing Guide BS 7671 | How to Size Cables | Elec-Mate"
      description="Complete cable sizing guide using BS 7671:2018+A3:2024. The 5-step process: design current, protective device, correction factors (Ca, Cg, Ci, Cf), tabulated current, and voltage drop check. Reference methods, worked examples, and adiabatic verification."
      datePublished="2025-06-20"
      dateModified="2026-02-14"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'Cable Sizing Guide BS 7671', href: '/guides/cable-sizing-guide-bs-7671' },
      ]}
      tocItems={[
        { id: 'overview', label: 'Cable Sizing Overview' },
        { id: 'five-step-process', label: 'The 5-Step Process' },
        { id: 'reference-methods', label: 'Reference Methods (A to G)' },
        { id: 'correction-factors', label: 'Correction Factor Tables' },
        { id: 'worked-examples', label: 'Worked Examples' },
        { id: 'adiabatic-check', label: 'Adiabatic Equation Check' },
        { id: 'appendix-4', label: 'Appendix 4 Tables Explained' },
        { id: 'how-to', label: 'Step-by-Step Process' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="BS 7671 Guide"
      badgeIcon={Cable}
      heroTitle={
        <>
          Cable Sizing Guide <span className="text-yellow-400">BS 7671</span>
          <br />
          How to Size Cables
        </>
      }
      heroSubtitle="Cable sizing to BS 7671 follows a five-step process: determine the design current, select the protective device, apply correction factors, choose the cable from Appendix 4, and verify voltage drop. This guide covers every step with worked examples, reference methods, and the adiabatic check."
      readingTime={18}
      keyTakeaways={[
        'Cable sizing follows 5 steps: design current (Ib), protective device (In), correction factors (Ca, Cg, Ci, Cf), tabulated current (It = In / correction factors), and voltage drop check.',
        'Correction factors account for ambient temperature (Ca from Table 4B1), grouping (Cg from Table 4C1), thermal insulation (Ci = 0.5 if fully enclosed, 0.89 one side), and BS 3036 fuses (Cf = 0.725).',
        'The reference method (A through G) determines the current-carrying capacity of the cable — Method A (enclosed in insulated wall) has the lowest ratings, while Method E (on perforated tray) has the highest.',
        'After selecting the cable, verify voltage drop using mV/A/m values from Appendix 4: maximum 3% for lighting (6.9V) and 5% for other circuits (11.5V) from a 230V supply.',
        "Elec-Mate's cable sizing calculator handles all 5 steps automatically — enter your load, conditions, and cable run, and get the correct cable size with voltage drop and fault current verification.",
      ]}
      sections={[
        {
          id: 'overview',
          heading: 'Cable Sizing to BS 7671 — Overview',
          content: (
            <>
              <p>
                Correct cable sizing is one of the most fundamental design tasks in electrical
                installation. A cable that is too small will overheat under load, potentially
                causing a fire or damaging the insulation. A cable that is too large wastes material
                and money. BS 7671:2018+A3:2024 provides a systematic process for selecting the
                correct cable size based on the load, the installation conditions, and the
                protective device.
              </p>
              <p>
                The process uses the current-carrying capacity tables in Appendix 4 of BS 7671,
                combined with correction factors that account for the specific installation
                conditions. The result is a cable that can safely carry the design current under the
                worst-case conditions it will encounter, while keeping the voltage drop within
                acceptable limits.
              </p>
              <p>
                While the process can be done manually using the tables in the brown book, it
                involves multiple lookups and calculations that are easy to get wrong. This is why
                many electricians use a cable sizing calculator — and why Elec-Mate has built every
                Appendix 4 table and correction factor into its{' '}
                <SEOInternalLink href="/calculators/cable-sizing">
                  cable sizing calculator
                </SEOInternalLink>
                .
              </p>
            </>
          ),
        },
        {
          id: 'five-step-process',
          heading: 'The 5-Step Cable Sizing Process',
          content: (
            <>
              <div className="space-y-6">
                <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400">
                      1
                    </span>
                    <h3 className="font-bold text-white text-lg">
                      Determine the Design Current (I<sub>b</sub>)
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    The design current is the maximum current the cable must carry in normal
                    service. For single-phase circuits: I<sub>b</sub> = P / (V x cos phi). For
                    three-phase circuits: I<sub>b</sub> = P / (root 3 x V<sub>L</sub> x cos phi).
                    For a resistive load (heaters, immersion, electric shower), the power factor is
                    1.0. For motors and fluorescent lighting, the power factor is typically
                    0.8-0.85. For domestic circuits with a fixed rating (e.g., 32A ring circuit, 20A
                    radial), the design current is simply the expected maximum load.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400">
                      2
                    </span>
                    <h3 className="font-bold text-white text-lg">
                      Select the Protective Device (I<sub>n</sub>)
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Choose a protective device with a rated current I<sub>n</sub> greater than or
                    equal to I<sub>b</sub>. Standard MCB ratings are 6, 10, 16, 20, 25, 32, 40, 50,
                    and 63A. Standard RCBO ratings are the same. The protective device must also be
                    appropriate for the load type: Type B for general circuits (trips at 3-5 times
                    rated current), Type C for motor loads (5-10 times), and Type D for high inrush
                    loads like transformers (10-20 times).
                  </p>
                </div>

                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400">
                      3
                    </span>
                    <h3 className="font-bold text-white text-lg">
                      Apply Correction Factors and Calculate I<sub>t</sub>
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    The correction factors account for conditions that reduce the cable's ability to
                    dissipate heat. Divide the protective device rating by the product of all
                    applicable correction factors to get the minimum tabulated current rating:
                  </p>
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <p className="text-white font-mono text-center">
                      I<sub>t</sub> = I<sub>n</sub> / (C<sub>a</sub> x C<sub>g</sub> x C<sub>i</sub>{' '}
                      x C<sub>f</sub>)
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400">
                      4
                    </span>
                    <h3 className="font-bold text-white text-lg">Select Cable from Appendix 4</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Find the appropriate Appendix 4 table for the cable type and installation method
                    (reference method). Select a cable with a tabulated current-carrying capacity I
                    <sub>z</sub> greater than or equal to I<sub>t</sub>. This ensures the cable can
                    carry the full load current even under the worst-case derating conditions.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400">
                      5
                    </span>
                    <h3 className="font-bold text-white text-lg">Verify Voltage Drop</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Calculate the{' '}
                    <SEOInternalLink href="/guides/voltage-drop-limits-bs-7671">
                      voltage drop
                    </SEOInternalLink>{' '}
                    using VD = mV/A/m x I<sub>b</sub> x L / 1000 and compare against the BS 7671
                    limits: 3% for lighting (6.9V from 230V) and 5% for other circuits (11.5V from
                    230V). If the voltage drop exceeds the limit, increase the cable size and
                    recalculate.
                  </p>
                </div>
              </div>
              <SEOAppBridge
                title="All 5 Steps — Done in Seconds"
                description="Elec-Mate's cable sizing calculator handles the entire 5-step process. Enter the load, protective device, installation conditions, and cable run — get the correct cable size with voltage drop and fault current verification. Every Appendix 4 table and correction factor is built in."
                icon={Calculator}
              />
            </>
          ),
        },
        {
          id: 'reference-methods',
          heading: 'Reference Methods (A to G)',
          content: (
            <>
              <p>
                The reference method describes how the cable is installed. This is critical because
                the installation method determines how effectively the cable can dissipate heat —
                and therefore its current-carrying capacity. A cable clipped directly to a surface
                (Method C) can dissipate heat much better than the same cable enclosed in an
                insulated wall (Method A), so it has a higher current rating.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Reference Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                      A
                    </span>
                    <div>
                      <h4 className="font-bold text-white">
                        Enclosed in conduit in an insulated wall
                      </h4>
                      <p className="text-white text-sm leading-relaxed">
                        Lowest ratings. The cable is surrounded by insulation on all sides, severely
                        restricting heat dissipation. Common in domestic rewires where cables run
                        through insulated stud walls.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                      B
                    </span>
                    <div>
                      <h4 className="font-bold text-white">
                        Enclosed in conduit on a wall or in trunking
                      </h4>
                      <p className="text-white text-sm leading-relaxed">
                        Slightly better than Method A as the conduit or trunking is mounted on a
                        surface, allowing some heat dissipation from the exterior.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                      C
                    </span>
                    <div>
                      <h4 className="font-bold text-white">Clipped direct to a surface</h4>
                      <p className="text-white text-sm leading-relaxed">
                        Good heat dissipation. Cable is clipped directly to a wall, ceiling, or
                        other surface. The most common method for domestic T&E cable clipped to
                        joists in accessible locations.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                      D
                    </span>
                    <div>
                      <h4 className="font-bold text-white">Direct buried in the ground</h4>
                      <p className="text-white text-sm leading-relaxed">
                        Used for SWA cables buried in the ground. The thermal conductivity of the
                        soil affects the rating. Common for supplies to outbuildings, garages, and
                        EV chargers.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                      E
                    </span>
                    <div>
                      <h4 className="font-bold text-white">
                        On perforated cable tray (horizontal or vertical)
                      </h4>
                      <p className="text-white text-sm leading-relaxed">
                        Excellent heat dissipation with air circulation on all sides. High current
                        ratings. Common in commercial and industrial installations.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                      F
                    </span>
                    <div>
                      <h4 className="font-bold text-white">On non-perforated cable tray</h4>
                      <p className="text-white text-sm leading-relaxed">
                        Similar to Method E but with reduced air circulation from the bottom.
                        Slightly lower ratings than perforated tray.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                      G
                    </span>
                    <div>
                      <h4 className="font-bold text-white">Spaced from a surface</h4>
                      <p className="text-white text-sm leading-relaxed">
                        Cable supported on brackets or cleats spaced away from the surface. Free air
                        circulation gives the highest current ratings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 my-4">
                <p className="text-white text-sm leading-relaxed">
                  <strong className="text-yellow-400">Important:</strong> If a cable run uses
                  multiple installation methods along its route, you must use the worst-case (lowest
                  rating) reference method for the entire cable length. For example, if a cable is
                  clipped direct (Method C) for most of its run but passes through an insulated wall
                  for 2 metres (Method A), the Method A rating applies.
                </p>
              </div>
            </>
          ),
        },
        {
          id: 'correction-factors',
          heading: 'Correction Factor Tables',
          content: (
            <>
              <p>
                Four correction factors may apply to a cable sizing calculation. Each factor is a
                decimal less than or equal to 1.0 that increases the required tabulated current by
                reducing the divisor:
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Thermometer className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      C<sub>a</sub> — Ambient Temperature (Table 4B1)
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    The Appendix 4 current ratings assume an ambient temperature of 30C. If the
                    ambient temperature is higher, the cable cannot dissipate heat as effectively,
                    and the rating must be reduced.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-white">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-2 pr-4 font-semibold">Ambient Temp</th>
                          <th className="text-left py-2 pr-4 font-semibold">Ca (70C PVC)</th>
                          <th className="text-left py-2 font-semibold">Ca (90C XLPE)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5">
                          <td className="py-2 pr-4">25C</td>
                          <td className="py-2 pr-4">1.03</td>
                          <td className="py-2">1.02</td>
                        </tr>
                        <tr className="border-b border-white/5 bg-yellow-500/5">
                          <td className="py-2 pr-4 font-semibold">30C</td>
                          <td className="py-2 pr-4 font-semibold">1.00</td>
                          <td className="py-2 font-semibold">1.00</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-2 pr-4">35C</td>
                          <td className="py-2 pr-4">0.94</td>
                          <td className="py-2">0.96</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-2 pr-4">40C</td>
                          <td className="py-2 pr-4">0.87</td>
                          <td className="py-2">0.91</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-2 pr-4">45C</td>
                          <td className="py-2 pr-4">0.79</td>
                          <td className="py-2">0.87</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">50C</td>
                          <td className="py-2 pr-4">0.71</td>
                          <td className="py-2">0.82</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Cable className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      C<sub>g</sub> — Grouping (Table 4C1)
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    When cables are grouped together, they heat each other up and cannot dissipate
                    heat as effectively. The grouping factor depends on the number of circuits and
                    the arrangement:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-white">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-2 pr-4 font-semibold">No. of Circuits</th>
                          <th className="text-left py-2 pr-4 font-semibold">Bunched</th>
                          <th className="text-left py-2 font-semibold">Single Layer (Touching)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5">
                          <td className="py-2 pr-4">1</td>
                          <td className="py-2 pr-4">1.00</td>
                          <td className="py-2">1.00</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-2 pr-4">2</td>
                          <td className="py-2 pr-4">0.80</td>
                          <td className="py-2">0.85</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-2 pr-4">3</td>
                          <td className="py-2 pr-4">0.70</td>
                          <td className="py-2">0.79</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-2 pr-4">4</td>
                          <td className="py-2 pr-4">0.65</td>
                          <td className="py-2">0.75</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-2 pr-4">6</td>
                          <td className="py-2 pr-4">0.57</td>
                          <td className="py-2">0.72</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">9</td>
                          <td className="py-2 pr-4">0.50</td>
                          <td className="py-2">0.70</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      C<sub>i</sub> — Thermal Insulation
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Cables in contact with or enclosed in thermal insulation require significant
                    derating. If the cable is totally surrounded by thermal insulation for more than
                    0.5 metres: C<sub>i</sub> = 0.5 (a massive derating — the cable can carry only
                    half its normal current). If the cable touches insulation on one side only: C
                    <sub>i</sub> = 0.89. This is one of the most commonly missed correction factors,
                    particularly in loft spaces where insulation is being retrofitted around
                    existing cables.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      C<sub>f</sub> — BS 3036 Semi-Enclosed Fuse Factor
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    If the circuit is protected by a BS 3036 semi-enclosed (rewirable) fuse, apply C
                    <sub>f</sub> = 0.725. This accounts for the higher fusing factor of rewirable
                    fuses compared to MCBs. For MCBs, RCBOs, and BS 88 HRC fuses, C<sub>f</sub> =
                    1.0 (no correction needed). BS 3036 fuses are rarely installed in new work but
                    may still be encountered in existing installations.
                  </p>
                </div>
              </div>
              <SEOAppBridge
                title="Automatic Correction Factor Application"
                description="Enter the ambient temperature, number of grouped circuits, insulation conditions, and fuse type — Elec-Mate applies Ca, Cg, Ci, and Cf automatically. No manual table lookups, no multiplication errors. The calculator uses the exact values from BS 7671 Tables 4B1 and 4C1."
                icon={Thermometer}
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
                    Example 1: 32A Ring Final Circuit
                  </h3>
                  <div className="space-y-2 text-white text-sm leading-relaxed">
                    <p>
                      <strong>Load:</strong> Domestic ring final circuit, design current 20A
                      (typical mixed load)
                    </p>
                    <p>
                      <strong>Protective device:</strong> 32A Type B MCB
                    </p>
                    <p>
                      <strong>Conditions:</strong> Clipped direct (Method C), 30C ambient, not
                      grouped, not in thermal insulation
                    </p>
                    <p>
                      <strong>Correction factors:</strong> Ca = 1.0, Cg = 1.0, Ci = 1.0, Cf = 1.0
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mt-4">
                    <p className="text-white font-mono text-sm">
                      I<sub>t</sub> = 32 / (1.0 x 1.0 x 1.0 x 1.0) = 32A
                    </p>
                  </div>
                  <p className="text-white text-sm mt-3 leading-relaxed">
                    From Table 4D5A, 2.5mm2 T&E clipped direct has I<sub>z</sub> = 27A per
                    conductor. Since this is a ring circuit, both legs share the load, so 2.5mm2 is
                    adequate. Voltage drop for a 50m ring with 20A load: VD = (18 x 20 x 25) / 1000
                    = 9.0V (within 11.5V limit). <strong>Result: 2.5mm2 T&E.</strong>
                  </p>
                </div>

                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
                  <h3 className="font-bold text-white text-lg mb-4">
                    Example 2: 20A Radial Circuit (Kitchen)
                  </h3>
                  <div className="space-y-2 text-white text-sm leading-relaxed">
                    <p>
                      <strong>Load:</strong> Kitchen socket radial, design current 18A
                    </p>
                    <p>
                      <strong>Protective device:</strong> 20A Type B RCBO
                    </p>
                    <p>
                      <strong>Conditions:</strong> Enclosed in insulated wall (Method A) for 3m,
                      then clipped direct — use Method A (worst case), 30C ambient, grouped with 2
                      other circuits, not in thermal insulation
                    </p>
                    <p>
                      <strong>Correction factors:</strong> Ca = 1.0, Cg = 0.80, Ci = 1.0, Cf = 1.0
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mt-4">
                    <p className="text-white font-mono text-sm">
                      I<sub>t</sub> = 20 / (1.0 x 0.80 x 1.0 x 1.0) = 25A
                    </p>
                  </div>
                  <p className="text-white text-sm mt-3 leading-relaxed">
                    From Table 4D5A, 2.5mm2 T&E Method A has I<sub>z</sub> = 20A — not enough. 4mm2
                    T&E Method A has I<sub>z</sub> = 27A — sufficient (27 &ge; 25).{' '}
                    <strong>Result: 4mm2 T&E.</strong>
                  </p>
                </div>

                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
                  <h3 className="font-bold text-white text-lg mb-4">
                    Example 3: Lighting Circuit (Loft Space)
                  </h3>
                  <div className="space-y-2 text-white text-sm leading-relaxed">
                    <p>
                      <strong>Load:</strong> First-floor lighting, design current 5A
                    </p>
                    <p>
                      <strong>Protective device:</strong> 6A Type B MCB
                    </p>
                    <p>
                      <strong>Conditions:</strong> Method C where clipped to joists, but touching
                      loft insulation on one side for 6m. 35C in loft space. Grouped with 1 other
                      circuit.
                    </p>
                    <p>
                      <strong>Correction factors:</strong> Ca = 0.94, Cg = 0.80, Ci = 0.89, Cf = 1.0
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mt-4">
                    <p className="text-white font-mono text-sm">
                      I<sub>t</sub> = 6 / (0.94 x 0.80 x 0.89 x 1.0) = 6 / 0.669 = 8.97A
                    </p>
                  </div>
                  <p className="text-white text-sm mt-3 leading-relaxed">
                    From Table 4D5A, 1.0mm2 T&E Method C has I<sub>z</sub> = 15A — sufficient.
                    1.5mm2 also works with I<sub>z</sub> = 20A. Voltage drop for 1.5mm2 with 5A over
                    18m: VD = (29 x 5 x 18) / 1000 = 2.61V (within 6.9V lighting limit).{' '}
                    <strong>Result: 1.5mm2 T&E (standard for lighting).</strong>
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'adiabatic-check',
          heading: 'Adiabatic Equation — Fault Current Check',
          content: (
            <>
              <p>
                After selecting the cable based on current-carrying capacity and voltage drop, there
                is one final check: verifying that the cable can withstand fault current without
                damage. This uses the adiabatic equation:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <p className="text-white font-mono text-lg text-center mb-4">
                  k<sup>2</sup>S<sup>2</sup> &ge; I<sup>2</sup>t
                </p>
                <div className="space-y-2 text-white text-sm">
                  <p>
                    <strong className="text-yellow-400">k</strong> = Cable factor (115 for
                    PVC/copper line conductor, 143 for PVC/copper CPC)
                  </p>
                  <p>
                    <strong className="text-yellow-400">S</strong> = Cross-sectional area of the
                    conductor in mm2
                  </p>
                  <p>
                    <strong className="text-yellow-400">I</strong> = Prospective fault current in
                    amps
                  </p>
                  <p>
                    <strong className="text-yellow-400">t</strong> = Disconnection time of the
                    protective device in seconds
                  </p>
                </div>
              </div>
              <p>
                If k<sup>2</sup>S<sup>2</sup> is greater than or equal to I<sup>2</sup>t, the cable
                can withstand the fault current. If not, the cable must be upsized. In practice,
                this check rarely fails for domestic installations because the prospective fault
                current is relatively low and the disconnection times are fast. However, it is an
                essential check on commercial and industrial installations where fault levels can be
                significantly higher.
              </p>
              <p>
                For more detail, see the{' '}
                <SEOInternalLink href="/calculators/adiabatic-equation">
                  adiabatic equation calculator
                </SEOInternalLink>{' '}
                guide.
              </p>
              <SEOAppBridge
                title="70+ Calculators — All BS 7671 Based"
                description="Elec-Mate has 70+ electrical calculators including cable sizing, voltage drop, adiabatic equation, conduit fill, trunking fill, Zs lookup, diversity, max demand, prospective fault current, and more. All based on BS 7671:2018+A3:2024. All work offline."
                icon={Calculator}
              />
            </>
          ),
        },
        {
          id: 'appendix-4',
          heading: 'Appendix 4 Tables Explained',
          content: (
            <>
              <p>
                Appendix 4 of BS 7671 contains the current-carrying capacity and voltage drop tables
                for all standard cable types and installation methods. Understanding which table to
                use is the first step in using them correctly.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Main Appendix 4 Tables</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Table 4D5A</strong> — PVC twin and earth
                      and singles in conduit. The most commonly used table for domestic
                      installations. Columns for Reference Methods A, B, and C.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Table 4D4A</strong> — PVC multicore
                      armoured cables (SWA). Used for buried cables, supplies to outbuildings, and
                      external circuits. Includes Method D (direct buried) ratings.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Table 4E4A</strong> — XLPE/LSF singles in
                      conduit or trunking. Higher temperature rating (90C) gives higher
                      current-carrying capacity than PVC equivalent.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Table 4B1</strong> — Ambient temperature
                      correction factors (Ca).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Table 4C1</strong> — Grouping correction
                      factors (Cg).
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Each current-carrying capacity table has multiple columns corresponding to different
                reference methods. Ensure you read the correct column for your installation method.
                The voltage drop columns in each table provide the mV/A/m values for both
                single-phase and three-phase circuits.
              </p>
            </>
          ),
        },
      ]}
      howToHeading="How to Size a Cable — Step-by-Step"
      howToDescription="Follow this process to size any cable to BS 7671:2018+A3:2024 using the Appendix 4 tables and correction factors."
      howToSteps={[
        {
          name: 'Calculate the design current',
          text: 'Determine the design current (Ib) from the load. For single-phase: Ib = P / (V x cos phi). For three-phase: Ib = P / (root 3 x VL x cos phi). For domestic circuits with known ratings (32A ring, 20A radial), use the expected maximum load current.',
        },
        {
          name: 'Select the protective device',
          text: 'Choose a protective device with rated current In greater than or equal to Ib. Standard MCB ratings: 6, 10, 16, 20, 25, 32, 40, 50, 63A. Select the appropriate type: Type B for general, Type C for motors, Type D for high inrush loads.',
        },
        {
          name: 'Identify correction factors and calculate It',
          text: 'Determine the applicable correction factors: Ca (ambient temperature from Table 4B1), Cg (grouping from Table 4C1), Ci (thermal insulation — 0.5 if fully enclosed, 0.89 one side), and Cf (0.725 for BS 3036 fuses, 1.0 for MCBs). Calculate It = In / (Ca x Cg x Ci x Cf).',
        },
        {
          name: 'Select cable from Appendix 4',
          text: 'Find the correct Appendix 4 table for your cable type and installation method (reference method A through G). Select a cable with tabulated current-carrying capacity Iz greater than or equal to It. Use the worst-case reference method if the cable route includes multiple installation methods.',
        },
        {
          name: 'Verify voltage drop and fault current withstand',
          text: 'Calculate voltage drop: VD = mV/A/m x Ib x L / 1000. Compare against 3% for lighting (6.9V) or 5% for other circuits (11.5V from 230V). If voltage drop exceeds the limit, increase the cable size. Then check the adiabatic equation (k2S2 >= I2t) to verify the cable can withstand fault current. If both checks pass, the cable is correctly sized.',
        },
      ]}
      faqs={[
        {
          question: 'What is the cable sizing process in BS 7671?',
          answer:
            'Cable sizing to BS 7671 follows five steps: (1) Determine the design current (Ib) from the load. (2) Select a protective device with rated current In greater than or equal to Ib. (3) Apply correction factors for ambient temperature (Ca), grouping (Cg), thermal insulation (Ci), and semi-enclosed fuse factor (Cf) to calculate the minimum tabulated current It = In / (Ca x Cg x Ci x Cf). (4) Select a cable from the appropriate Appendix 4 table with current-carrying capacity Iz greater than or equal to It for the correct reference method. (5) Verify that the voltage drop does not exceed 3% for lighting or 5% for other circuits, and that the cable can withstand fault current (adiabatic equation check). If either check fails, increase the cable size and re-verify.',
        },
        {
          question: 'What are the BS 7671 correction factors for cable sizing?',
          answer:
            'There are four correction factors: Ca (ambient temperature correction from Table 4B1 — e.g., 0.87 at 40C for 70C PVC cable), Cg (grouping correction from Table 4C1 — e.g., 0.70 for 3 circuits bunched together), Ci (thermal insulation correction — 0.5 if the cable is totally surrounded by thermal insulation for more than 0.5m, 0.89 if touching insulation on one side only), and Cf (semi-enclosed fuse factor — 0.725 for BS 3036 rewirable fuses, 1.0 for MCBs and RCBOs). All applicable factors multiply together as a divisor: It = In / (Ca x Cg x Ci x Cf). Missing any factor can result in an undersized cable.',
        },
        {
          question: 'What size cable do I need for a 32A circuit?',
          answer:
            'It depends on the installation conditions. In ideal conditions (30C ambient, single circuit, not in thermal insulation, MCB protection, Reference Method C clipped direct), 4mm2 twin and earth is typically adequate for a 32A circuit with Iz = 37A. However, if the cable passes through thermal insulation, is grouped with other circuits, or the ambient temperature is above 30C, you may need 6mm2 or even 10mm2. For example, with Cg = 0.80 (grouped with one other circuit) and Ci = 0.89 (touching insulation one side), It = 32 / (0.80 x 0.89) = 44.9A, which requires 6mm2 cable (Iz = 47A for Method C). Always calculate rather than assume.',
        },
        {
          question: 'What is the difference between Reference Method A and Method C?',
          answer:
            'Reference Method A is for cables enclosed in conduit in an insulated wall (or enclosed in an insulated wall without conduit — commonly domestic T&E in insulated stud walls). The cable is surrounded by insulation which restricts heat dissipation, resulting in the lowest current-carrying capacity ratings. Reference Method C is for cables clipped directly to a surface, which allows much better heat dissipation and therefore higher current ratings. For example, 2.5mm2 T&E has Iz = 20A for Method A but Iz = 27A for Method C. The correct method depends on the actual installation route — use the worst-case method for any portion of the cable run.',
        },
        {
          question: 'Does Elec-Mate have a cable sizing calculator?',
          answer:
            'Yes. Elec-Mate has a comprehensive cable sizing calculator that handles the entire five-step process. Enter the load (kW or amps), protective device type and rating, cable type, installation method (reference method), ambient temperature, number of grouped circuits, thermal insulation conditions, and cable run length. The calculator applies all correction factors automatically using the exact BS 7671 table values, selects the correct cable size, verifies voltage drop against the 3% or 5% limit, and checks the adiabatic equation for fault current withstand. It also has a cable derating calculator, conduit fill calculator, and trunking fill calculator — all BS 7671 based. The calculators work offline, so you can use them on site without a signal.',
        },
        {
          question: 'What happens if I undersize a cable?',
          answer:
            'An undersized cable will overheat under load because it cannot dissipate the heat generated by the current flowing through it. Over time, this overheating degrades the cable insulation, which can lead to insulation failure, short circuits, and ultimately fire. The protective device (MCB or fuse) will not necessarily trip because the cable may be carrying a current below the trip threshold of the device but above the safe continuous current rating of the cable. This is exactly the scenario that correct cable sizing prevents — the cable must be rated to carry the full load current under worst-case conditions without exceeding its maximum operating temperature.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/voltage-drop-limits-bs-7671',
          title: 'Voltage Drop Limits BS 7671',
          description: 'Voltage drop limits and calculation with worked examples.',
          icon: TrendingDown,
          category: 'Guide',
        },
        {
          href: '/calculators/cable-sizing',
          title: 'Cable Sizing Calculator',
          description: 'Calculate the correct cable size with all correction factors.',
          icon: Calculator,
          category: 'Calculator',
        },
        {
          href: '/calculators/voltage-drop',
          title: 'Voltage Drop Calculator',
          description: 'Calculate voltage drop with Appendix 4 mV/A/m values.',
          icon: Zap,
          category: 'Calculator',
        },
        {
          href: '/calculators/adiabatic-equation',
          title: 'Adiabatic Equation Calculator',
          description: 'Verify fault current withstand for any cable.',
          icon: ShieldCheck,
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
          href: '/guides/testing-sequence',
          title: 'Testing Sequence Guide',
          description: 'The correct order of tests for initial verification.',
          icon: ClipboardCheck,
          category: 'Testing',
        },
      ]}
      ctaHeading="Size Cables in Seconds, Not Minutes"
      ctaSubheading="Every Appendix 4 table and correction factor built in. Enter your load and conditions — get the right cable instantly. Plus voltage drop, adiabatic check, and 67 more calculators. 7-day free trial."
    />
  );
}
