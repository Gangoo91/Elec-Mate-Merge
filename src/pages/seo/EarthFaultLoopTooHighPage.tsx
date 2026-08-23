import { Fragment } from 'react';
import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { CalculatorSurface } from '@/components/calculators/shared';
import EarthFaultLoopCalculator from '@/components/apprentice/calculators/EarthFaultLoopCalculator';
import {
  AlertTriangle,
  Zap,
  ShieldCheck,
  ClipboardCheck,
  Calculator,
  Activity,
  CheckCircle2,
  Cable,
  FileText,
  Gauge,
  Search,
  Wrench,
  Globe,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Max Earth Loop Impedance (Zs): 32A Type B 1.37Ω';
const PAGE_DESCRIPTION =
  'BS 7671 Table 41.3 max Zs: 32 A Type B 1.37Ω, 20 A 2.19Ω, 6 A 7.28Ω — site limit is 0.8× that (1.10Ω at 32 A). Plus the 5 causes of high Zs and the fixes.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  {
    label: 'Earth Fault Loop Impedance Too High',
    href: '/guides/earth-fault-loop-impedance-too-high',
  },
];

const tocItems = [
  { id: 'what-too-high-means', label: 'What "Too High" Means' },
  { id: 'max-zs-table', label: 'Maximum Zs Table (41.3)' },
  { id: 'calculator', label: 'Check Your Zs Reading' },
  { id: 'common-causes', label: 'Common Causes' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'when-to-report-dno', label: 'When to Report to DNO' },
  { id: 'zs-validation', label: 'Zs Validation with Elec-Mate' },
  { id: 'faq', label: 'FAQs' },
  { id: 'related', label: 'Related Guides' },
];

const keyTakeaways = [
  '"Too high" Zs means the earth fault loop impedance exceeds the maximum value permitted by BS 7671 — Table 41.3 (BS 7671:2018+A4:2026, Reg 411.4.202) for circuits protected by circuit breakers (MCBs/MCCBs), or Table 41.2 (Reg 411.4.201) for circuits protected by fuses — meaning the protective device may not disconnect quickly enough during an earth fault.',
  'The most common causes of high Zs are a poor main earth connection (loose, corroded, or high-resistance), long cable runs with small CPC, high external earth fault loop impedance (Ze) from the supply, and loose or corroded connections in the earth path.',
  'For TT earthing systems, high Zs is inherent because the earth return path goes through the general mass of earth — RCD protection (not overcurrent protection) is the primary means of fault disconnection on TT systems.',
  "Elec-Mate's Zs lookup calculator instantly shows the maximum permitted earth fault loop impedance for any BS 7671 protective device, so you can verify compliance on site without carrying the tables.",
  'If the external earth fault loop impedance (Ze) is abnormally high (above 0.8 ohms on a TN-S system or above 0.35 ohms on a TN-C-S system), report this to the Distribution Network Operator (DNO) as it indicates a problem with the supply earth.',
];

const faqs = [
  {
    question: 'What is the maximum earth fault loop impedance for a 32A Type B MCB?',
    answer:
      "For a 32A Type B MCB, the maximum earth fault loop impedance (Zs) per BS 7671:2018+A4:2026 Table 41.3 (Reg 411.4.202) is 1.37 ohms. This is the value at which the MCB is guaranteed to trip within the required disconnection time for a 230 V circuit. In practice, Guidance Note 3 (GN3 Reg 1.16.9) applies the BS 7671 Appendix 3 acceptance equation with its 0.8 factor, which converts the tabulated limit to the maximum acceptable cold-measured site reading: 1.37 × 0.8 = 1.10 ohms. So the site-measured Zs should not exceed approximately 1.10 ohms to ensure compliance. GN3's maximum measured Zs tables (Appendix A) are referenced to an ambient of 10 °C — where you test at any other ambient temperature, apply the Table A7 correction factors. Elec-Mate's Zs lookup calculator applies the 0.8 factor automatically.",
  },
  {
    question: 'What causes high earth fault loop impedance on a TN-S system?',
    answer:
      'On a TN-S (separate earth) system, the earth return path runs through the cable sheath of the supply cable back to the transformer. High Zs on a TN-S system is typically caused by: a corroded or loose main earthing conductor connection at the earth clamp; a deteriorated lead sheath on the supply cable (the sheath IS the earth path on TN-S); long cable runs from the consumer unit to the circuit, particularly with undersized CPC; corroded or loose connections at accessories along the earth path; or a damaged protective conductor somewhere in the circuit. The typical Ze for a healthy TN-S supply is 0.8 ohms or less. If Ze exceeds this, the DNO should be contacted as the supply earth may be deteriorating.',
  },
  {
    question: 'Can I add a supplementary earth rod to reduce Zs?',
    answer:
      'You can install a supplementary earth rod to provide a parallel earth path, which will reduce the overall Zs measurement. However, this approach has limitations. On a TN-S or TN-C-S system, the main earth path should be through the supply — a supplementary earth rod is an additional measure, not a replacement for a properly functioning supply earth. On a TT system, an earth rod IS the primary earth path, and achieving a sufficiently low resistance depends on soil conditions. The earth electrode resistance must be low enough that the combined Zs allows the protective device to operate within the required disconnection time. In practice, most TT systems rely on RCD protection rather than overcurrent protection for earth fault disconnection, because achieving a sufficiently low earth electrode resistance for MCB disconnection is often impractical.',
  },
  {
    question: 'What is the difference between Ze and Zs?',
    answer:
      "Ze (external earth fault loop impedance) is the impedance of the earth fault loop external to the installation — from the transformer, through the supply cable, through the earth return path (cable sheath for TN-S, combined neutral-earth for TN-C-S, or general mass of earth for TT), and back to the transformer. This is the DNO's responsibility. Zs (total earth fault loop impedance) is the impedance of the entire earth fault loop, including both the external portion (Ze) and the internal portion (R1 + R2, where R1 is the line conductor resistance and R2 is the protective conductor resistance from the consumer unit to the furthest point of the circuit). The relationship is Zs = Ze + (R1 + R2). If Zs is too high, you need to determine whether the problem is in the external portion (Ze — report to DNO) or the internal portion (R1 + R2 — your responsibility to address).",
  },
  {
    question: 'How do I reduce R1+R2 to bring Zs within limits?',
    answer:
      "R1 + R2 is the combined resistance of the line conductor (R1) and the protective conductor (R2) of the circuit, measured from the distribution board to the furthest point. To reduce R1 + R2, you can: upsize the CPC (protective conductor) — for example, replacing a 1.0 mm CPC with a 2.5 mm or 4.0 mm CPC reduces R2 significantly; shorten the cable run where possible by taking a more direct route; install a larger cross-section cable for the entire circuit; or install a supplementary bonding conductor (a separate, larger CPC run alongside the existing cable). Elec-Mate's R1+R2 calculator lets you check the expected R1+R2 for any cable size and length, so you can verify that a proposed solution will bring Zs within the permitted maximum before starting the work.",
  },
  {
    question: 'What should I do if Zs is too high for the existing MCB?',
    answer:
      'If Zs exceeds the maximum for the existing MCB but is within limits for a different protective device, one option is to change the protective device. For example, the maximum Zs for a 20 A Type B MCB is 2.19 ohms, but for a 20 A Type C MCB it is 1.09 ohms (Type C has a higher magnetic trip multiple). Moving from Type B to Type C is only appropriate if the load characteristics require it. Alternatively, fitting an RCBO in place of the MCB ensures earth fault disconnection via the 30 mA RCD function, which operates independently of Zs. However, BS 7671 still requires automatic disconnection of supply (ADS): where an RCD is the device relied on, Reg 411.4.204 applies the maximum earth fault loop impedances of Table 41.5 (1 667 Ω at 30 mA), so Zs verification is not removed. In all cases, verify that the cable is adequately protected against thermal effects during a fault using the adiabatic equation of BS 7671 Reg 543.1.3.',
  },
];

const sections = [
  {
    id: 'what-too-high-means',
    heading: 'What Does "Earth Fault Loop Impedance Too High" Mean?',
    content: (
      <>
        <p className="text-white">
          <strong className="text-white">Got a reading in front of you?</strong> Skip the theory and{' '}
          <a
            href="#calculator"
            className="font-semibold text-yellow-400 underline underline-offset-4 touch-manipulation"
          >
            check your Zs against the BS 7671 limit
          </a>{' '}
          — free, no sign-up.
        </p>
        <p>
          Earth fault loop impedance (Zs) is the total impedance of the path that fault current
          takes when a live conductor contacts earth — from the point of fault, through the
          protective conductor back to the distribution board, through the supply earth, and back to
          the transformer. BS 7671 sets maximum values for Zs because this impedance determines how
          much fault current flows during an earth fault, which in turn determines how quickly the
          protective device (MCB, fuse, or RCBO) disconnects the circuit.
        </p>
        <p>
          If Zs is too high, the fault current during an earth fault is too low to trip the
          protective device within the required disconnection time. On a TN system at 230 V, Table
          41.1 requires disconnection within 0.4 seconds — and Regulation 411.3.2.2 applies that to
          final circuits rated up to 63 A with one or more socket-outlets, and to final circuits
          rated up to 32 A supplying only fixed connected current-using equipment. Regulation
          411.3.2.3 permits 5 seconds for a distribution circuit and for any circuit not covered by
          411.3.2.2. (On a TT system the corresponding times are 0.2 s and 1 s.) If the protective
          device does not disconnect
          quickly enough, the metalwork of the faulty equipment remains energised for a dangerous
          period, creating a severe electric shock risk.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Where to Find Maximum Zs Values (BS 7671:2018+A4:2026)
          </h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">BS 7671 Table 41.2 (Reg 411.4.201):</strong>{' '}
                Maximum Zs values for circuits protected by fuses (BS 88-2, BS 88-3, BS 3036, BS
                1362) at a disconnection time of 0.4 s. Values depend on fuse type and rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">BS 7671 Table 41.3 (Reg 411.4.202):</strong>{' '}
                Maximum Zs values for circuits protected by circuit breakers (MCBs to BS EN 60898,
                RCBOs to BS EN 61009-1). Values depend on breaker type (B, C, or D) and rating. The
                table covers both the 0.4 s time of Reg 411.3.2.2 and the 5 s time of Reg 411.3.2.3
                — Types B and C print one row valid for both, and only Type D prints separate 0.4 s
                and 5 s rows.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">BS 7671 Table 41.4 (Reg 411.4.203):</strong>{' '}
                Maximum Zs values for fuse-protected distribution circuits or final circuits where a
                disconnection time of 5 s applies (Reg 411.3.2.3).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">GN3 0.8 Site Factor (GN3 Reg 1.16.9):</strong>{' '}
                Guidance Note 3 9th Ed:2022 applies the BS 7671 Appendix 3 acceptance equation
                Zs(measured) = 0.8 × (Uo / Ia). The 0.8 factor converts the tabulated limit to the
                maximum acceptable cold-measured site reading, accounting for conductor temperature
                under load. For example, the Table 41.3 value for a 32 A Type B MCB is 1.37 Ω — the
                maximum site reading is 1.10 Ω. GN3's maximum measured Zs tables in Appendix A are
                referenced to an ambient of 10 °C; test at any other ambient and the Table A7
                correction factors apply.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5 my-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <h3 className="font-bold text-white text-base">
              30 mA RCD Required on Domestic Lighting Circuits (Reg 411.3.4)
            </h3>
          </div>
          <p className="text-white text-sm leading-relaxed">
            BS 7671:2018+A4:2026 Regulation 411.3.4 requires that, within domestic (household)
            premises, AC final circuits supplying luminaires shall be provided with additional
            protection by an RCD with a rated residual operating current not exceeding 30 mA. This
            is not a new A4:2026 change — Reg 411.3.4 was introduced with BS 7671:2018 (the 18th
            Edition) and A4:2026 made no changes to Chapter 41. So any domestic lighting circuit
            designed after 31 December 2018 should already have it. Where high Zs is found on a
            lighting circuit during an EICR, fitting an RCBO addresses both the Zs disconnection
            requirement and the Reg 411.3.4 RCD obligation in a single device.
          </p>
        </div>
        <SEOAppBridge
          title="Zs Lookup Calculator"
          description="Enter the protective device type and rating and Elec-Mate instantly shows the maximum permitted Zs from BS 7671 Table 41.3 (MCBs) or Table 41.2 (fuses)…"
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'max-zs-table',
    heading: 'Maximum Zs Table — BS 7671 Table 41.3 (Type B, C, D MCB)',
    content: (
      <>
        <p>
          This is the table to check your reading against. The values below are the maximum permitted
          earth fault loop impedance (Zs) for circuit breakers at 230 V, 0.4 s disconnection (final
          circuits), from BS 7671:2018+A4:2026 Table 41.3. If your measured Zs is higher than the
          figure for your device, the circuit is non-compliant.
        </p>
        {/* grounded: printed BS 7671:2018+A4:2026 Table 41.3(a) Type B, 41.3(b) Type C, 41.3(c) Type D
            — Reg 411.4.202 (NOT 411.4.204, which is RCDs/Table 41.5), Up 230 V, Cmin 0.95.
            Type B = 230 x 0.95/(5·In), Type C = /(10·In), Type D 0.4 s = /(20·In).
            Cross-checked against src/data/zsLimits.ts, the canonical source. Do not re-derive. */}
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-1">
            Maximum Zs (&Omega;) — 230 V, 0.4 s disconnection
          </h3>
          <p className="text-white/70 text-xs mb-4">
            MCB to BS EN 60898 / RCBO to BS EN 61009-1 · tabulated values (apply the GN3 0.8 factor
            for the cold-measured site limit)
          </p>
          <div className="grid grid-cols-4 gap-2 text-sm">
            <div className="p-2 rounded bg-white/[0.08] text-center font-bold text-white">Rating</div>
            <div className="p-2 rounded bg-white/[0.08] text-center font-bold text-white">Type B</div>
            <div className="p-2 rounded bg-white/[0.08] text-center font-bold text-white">Type C</div>
            <div className="p-2 rounded bg-white/[0.08] text-center font-bold text-white">Type D</div>
            {(
              [
                ['6 A', '7.28', '3.64', '1.82'],
                ['16 A', '2.73', '1.37', '0.68'],
                ['20 A', '2.19', '1.09', '0.55'],
                ['32 A', '1.37', '0.68', '0.34'],
                ['40 A', '1.09', '0.55', '0.27'],
              ] as Array<[string, string, string, string]>
            ).map(([rating, b, c, d]) => (
              <Fragment key={rating}>
                <div className="p-2 rounded bg-white/[0.04] text-center text-white">{rating}</div>
                <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
                  {b}
                </div>
                <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
                  {c}
                </div>
                <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
                  {d}
                </div>
              </Fragment>
            ))}
          </div>
          <p className="text-white/70 text-xs mt-4">
            Values per BS 7671:2018+A4:2026 Table 41.3, Reg 411.4.202, 230 V, 0.4 s. A higher trip
            type needs a lower Zs (Type D needs roughly a quarter of the Type B limit). For the
            on-site pass/fail figure, multiply by 0.8 — e.g. a 32 A Type B limit of 1.37 &Omega;
            gives a maximum cold-measured site reading of 1.10 &Omega; (GN3 Reg 1.16.9, applying the
            BS 7671 Appendix 3 acceptance equation).
          </p>
        </div>
        <p>
          If your reading is over the figure for your device, work through the common causes below —
          start by measuring Ze at the origin to split the problem between the supply (Ze) and your
          circuit (R1+R2). If you need the maths from first principles, see our full{' '}
          <SEOInternalLink href="/guides/earth-fault-loop-impedance-calculation">
            earth fault loop impedance calculation
          </SEOInternalLink>{' '}
          guide.
        </p>
      </>
    ),
  },
  {
    id: 'calculator',
    heading: 'Check Your Zs Reading Against the Limit',
    content: (
      <>
        <p>
          Free to use, no sign-up and no email — enter your figures and get the answer on this page.
        </p>
        <p>
          Enter Ze and R1+R2 (or the Zs you measured directly), pick the protective device and the
          required disconnection time, and the calculator returns Zs, the prospective fault current,
          the tabulated maximum from Table 41.2, 41.3 or 41.4, and the 0.8 site limit — with a
          pass, marginal or fail verdict against both. Switch to TT and it checks R
          <sub>A</sub> × I<sub>Δn</sub> ≤ 50 V under Regulation 411.5.3(b) instead.
        </p>
        <CalculatorSurface>
          <EarthFaultLoopCalculator />
        </CalculatorSurface>
        <p>
          If the verdict is fail or marginal, measure Ze at the origin next — that splits the
          problem between the supply and your circuit, and the causes below follow that split.
        </p>
      </>
    ),
  },
  {
    id: 'common-causes',
    heading: 'Common Causes of High Zs',
    content: (
      <>
        <p>
          Since Zs equals Ze (external impedance) plus R1 + R2 (internal circuit impedance), a high
          Zs reading means either the external earth is poor, the internal circuit conductors have
          high resistance, or both. Understanding which component is elevated is essential for
          choosing the correct solution.
        </p>
        <div className="space-y-4 mt-4">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">1. Poor Earth Connection</h3>
                <p className="text-white text-sm leading-relaxed">
                  The most common cause. A loose, corroded, or damaged main earthing conductor,
                  earth clamp, or earth terminal increases the resistance of the earth path. On TN-S
                  systems, the earth clamp on the cable sheath often corrodes over decades. On
                  TN-C-S systems, a loose connection at the main earthing terminal can introduce
                  significant resistance. Check and retighten all earthing connections, and replace
                  corroded earth clamps with new BS 951 compliant clamps.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">2. Long Cable Runs</h3>
                <p className="text-white text-sm leading-relaxed">
                  Every metre of cable adds resistance to the earth fault loop. Long runs — common
                  on outbuilding circuits, detached garage circuits, and garden lighting —
                  accumulate enough R1 + R2 to push Zs above the permitted maximum. The problem is
                  compounded when the CPC is undersized relative to the cable length. For example, a
                  30-metre run of 2.5 mm twin and earth cable has an R1 + R2 of approximately 0.70
                  ohms, which when added to a typical Ze of 0.35 ohms gives a Zs of 1.05 ohms — very
                  close to the limit for a 32A Type B MCB.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">3. High Ze from the Supply</h3>
                <p className="text-white text-sm leading-relaxed">
                  Ze is the external earth fault loop impedance — the portion of the earth path that
                  belongs to the DNO's network. Typical values are 0.8 ohms or less for TN-S and
                  0.35 ohms or less for TN-C-S. If Ze is significantly higher than these values, the
                  supply earth may be deteriorating. On TN-S systems, a corroded lead cable sheath
                  increases Ze. On TN-C-S (PME) systems, a high Ze can indicate a poor neutral-earth
                  connection in the supply network. High Ze is the DNO's responsibility — report it.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">4. Loose Connections</h3>
                <p className="text-white text-sm leading-relaxed">
                  Every connection in the earth path — at the consumer unit, junction boxes,
                  accessory earth terminals, and the main earthing terminal — adds resistance. A
                  single loose connection can add several tenths of an ohm, potentially pushing Zs
                  above the maximum. Over time, connections loosen due to thermal cycling (heating
                  and cooling as load changes) and mechanical movement. Tightening all connections
                  in the earth path often reduces Zs by a measurable amount.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">5. Corroded Earth</h3>
                <p className="text-white text-sm leading-relaxed">
                  Corrosion at any point in the earth path increases resistance. This is
                  particularly common at earth clamps on metallic water or gas pipes (for bonding),
                  at the main earth terminal, and at the earth clamp on a TN-S cable sheath. Copper
                  conductors corrode less than the steel clamps used to attach them. Green verdigris
                  on copper or rust on clamps are visual indicators. Replace corroded clamps and
                  clean connection surfaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'solutions',
    heading: 'Solutions for High Zs',
    content: (
      <>
        <p>
          The correct solution depends on whether the high Zs is caused by external impedance (Ze —
          the DNO's responsibility) or internal impedance (R1 + R2 — your responsibility). Start by
          measuring Ze at the origin of the installation with all circuits isolated.
        </p>
        <div className="space-y-4 mt-4">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Check and Improve the Main Earth</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Inspect the main earthing conductor, the earth clamp (on TN-S), and the main earthing
              terminal. Check for corrosion, loose connections, and correct tightening torques.
              Replace corroded clamps with new BS 951 compliant types. Ensure the main earthing
              conductor is of adequate cross-sectional area per BS 7671 Table 54.7. This single step
              often reduces Zs by 0.1 to 0.3 ohms.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Cable className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Upsize the CPC</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              If R2 (protective conductor resistance) is the main contributor to high Zs, running a
              supplementary CPC of larger cross-sectional area alongside the existing cable can
              reduce R2 significantly. For example, replacing a 1.0 mm CPC with a separate 4.0 mm
              CPC run in parallel reduces R2 by approximately 75% for that circuit. Use Elec-Mate's
              R1+R2 calculator to check that the proposed CPC size gives a compliant Zs before
              starting the work.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Supplementary Bonding</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              In specific locations (bathrooms per Regulation 701.415.2, if the disconnection time
              cannot be met), supplementary bonding can provide an alternative means of shock
              protection by equalising potential between simultaneously accessible
              exposed-conductive-parts and extraneous-conductive-parts. This does not reduce Zs
              itself but provides additional protection where high Zs cannot be economically
              reduced.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Change the Protective Device</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              If Zs exceeds the limit for one device type but is within limits for another, changing
              the protective device may be appropriate. For example, a Type C MCB requires a higher
              fault current to magnetically trip than a Type B MCB, so it has a lower maximum Zs.
              However, changing from Type B to Type C is only appropriate if the load
              characteristics suit a Type C characteristic. Fitting an RCBO ensures earth fault
              disconnection via the 30 mA function regardless of Zs, though the adiabatic equation
              must still be checked to verify the CPC can withstand the fault energy.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14]">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Add a Local Earth Rod (TT Systems)</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              For TT earthing systems (common in rural areas), the earth path goes through the
              general mass of earth via an earth rod, which inherently has much higher impedance
              than a metallic return path. On TT systems, Zs will often exceed the MCB maximum
              values, which is why BS 7671 requires RCD protection (not overcurrent protection) as
              the primary means of fault disconnection in TT systems.
            </p>
            <p className="text-white text-sm leading-relaxed mt-2">
              BS 7671 Regulation 411.5.3 provides the quantitative RCD selection rule: R
              <sub>A</sub> × I<sub>Δn</sub> ≤ 50 V, where R<sub>A</sub> is the sum of the resistances
              of the earth electrode and the protective conductor connecting it to the
              exposed-conductive-parts (in ohms), and I<sub>Δn</sub> is the rated residual operating
              current of the RCD. Table 41.5 tabulates the result: 30 mA gives 1 667 Ω and 100 mA
              gives 500 Ω. Do not treat those as design targets — the note to Table 41.5 warns that
              the electrode resistance should be as low as practicable and that a value exceeding
              200 Ω may not be stable (see Reg 542.2.4). In practice, most TT installations use a
              100 mA time-delayed RCD at origin and 30 mA RCDs on final circuits. If the earth
              electrode resistance is too high, driving the earth rod deeper, using multiple rods in
              parallel, or treating the soil with bentonite can reduce R<sub>A</sub>.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <h3 className="font-bold text-white text-base">
              Consider AFDDs When Replacing Wiring or Consumer Units (Reg 421.1.7)
            </h3>
          </div>
          <p className="text-white text-sm leading-relaxed">
            BS 7671:2018+A4:2026 Regulation 421.1.7 <strong className="text-white">requires</strong>{' '}
            arc fault detection devices (AFDDs) conforming to BS EN 62606 on single-phase AC final
            circuits supplying socket-outlets rated not exceeding 32 A in four premises types: high
            rise residential buildings (HRRBs), houses in multiple occupation (HMOs), purpose-built
            student accommodation, and care homes. For all other premises AFDDs are{' '}
            <strong className="text-white">recommended</strong> on the same kind of circuit. Where
            used, they must be placed at the origin of the circuit protected. This is not new in
            A4:2026 — the requirement came in with A2:2022, and A4:2026 only reworded 421.1.7(a) to
            &ldquo;high rise residential buildings&rdquo;. When resolving high Zs by replacing wiring
            or fitting a new consumer unit, that is a sensible point to raise AFDDs with the client.
          </p>
        </div>
        <SEOAppBridge
          title="Earth Loop Impedance Calculator"
          description="Enter Ze and R1+R2, select the protective device, and Elec-Mate instantly tells you whether Zs is within the BS 7671 maximum."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'when-to-report-dno',
    heading: 'When to Report to the DNO',
    content: (
      <>
        <p>
          The external earth fault loop impedance (Ze) is the responsibility of the Distribution
          Network Operator (DNO). If Ze is abnormally high, it indicates a problem with the supply
          earth that the DNO must investigate and rectify. You should report to the DNO if:
        </p>
        <ul className="space-y-3 my-4">
          <li className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-white">TN-S system:</strong> Ze exceeds 0.8 ohms. The TN-S
              earth path runs through the lead sheath of the supply cable. A high Ze suggests the
              sheath is corroded, damaged, or has a poor connection at the cut-out.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-white">TN-C-S (PME) system:</strong> Ze exceeds 0.35 ohms. On
              a PME system, the neutral and earth are combined in the supply cable, giving
              inherently low Ze. A reading above 0.35 ohms suggests a poor neutral connection in the
              supply network.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-white">No earth provided:</strong> If the supply has no earth
              facility at all (sometimes found in very old TN-S installations where the sheath has
              completely corroded), the DNO must be informed and the installation may need to be
              converted to TT with a local earth rod.
            </span>
          </li>
        </ul>
        <p>
          Record the Ze value on the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> and note it as a
          Code C2 observation with a recommendation to contact the DNO. The DNO contact details for
          the region can be found on the Energy Networks Association website. Do not attempt to
          modify the DNO's equipment — this is illegal and dangerous.
        </p>
      </>
    ),
  },
  {
    id: 'zs-validation',
    heading: 'Zs Validation with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate provides several tools that help electricians verify earth fault loop impedance
          compliance quickly and accurately on site.
        </p>
        <SEOAppBridge
          title="Zs Lookup Calculator"
          description="Select any protective device type (BS 88-2 fuse, BS 88-3 fuse, BS 3036 fuse, BS 1362 fuse, Type B/C/D MCB) and rating…"
          icon={Calculator}
        />
        <SEOAppBridge
          title="R1+R2 Calculator"
          description="Enter the cable type, conductor size, and cable length, and Elec-Mate calculates the expected R1+R2 value."
          icon={Activity}
        />
        <p>
          The <SEOInternalLink href="/tools/eicr-certificate">schedule of tests</SEOInternalLink>{' '}
          auto-validates every Zs measurement against the maximum for the protective device recorded
          on the circuit schedule. Non-compliant readings are flagged immediately and the app
          suggests the appropriate EICR observation code.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/earth-fault-loop-impedance-calculation',
    title: 'Earth Fault Loop Impedance Calculation',
    description:
      'The Zs = Ze + (R1+R2) formula step by step — temperature correction, maximum values and worked examples.',
    icon: Calculator,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-testing-bs7671',
    title: 'Insulation Resistance Testing',
    description:
      'How to test IR and interpret results — the other critical dead test on the sequence.',
    icon: Gauge,
    category: 'Testing',
  },
  {
    href: '/guides/low-insulation-resistance',
    title: 'Low Insulation Resistance',
    description: 'Causes, diagnosis, and fixes when IR drops below the BS 7671 minimum.',
    icon: AlertTriangle,
    category: 'Troubleshooting',
  },
  {
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description: 'Earth leakage diagnosis — related to Zs when diagnosing earth fault conditions.',
    icon: ShieldCheck,
    category: 'Troubleshooting',
  },
  {
    href: '/guides/earthing-systems-tns-tncs-tt-explained',
    title: 'Earthing Arrangements',
    description: 'TN-S, TN-C-S, and TT earthing systems explained — how they affect Zs values.',
    icon: Globe,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate',
    description:
      'Recording and reporting Zs values on the Electrical Installation Condition Report.',
    icon: FileText,
    category: 'Certification',
  },
  {
    href: '/tools/earth-loop-impedance-calculator',
    title: 'Earth Loop Impedance Calculator',
    description: 'Calculate Zs from Ze and R1+R2, check compliance against BS 7671 maximums.',
    icon: Calculator,
    category: 'Calculator',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EarthFaultLoopTooHighPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      answerBox={{
        question: 'What does it mean if Zs is too high?',
        answer:
          'A "too high" Zs means the measured earth fault loop impedance exceeds the maximum BS 7671 permits for the protective device — Table 41.3 for circuit breakers or Table 41.2 for fuses — so the device may not disconnect quickly enough during an earth fault.',
        detail:
          'The most common causes are a poor main earth connection, long cable runs with a small CPC, high external impedance (Ze) from the supply, and loose or corroded connections in the earth path. On TT systems high Zs is inherent and protection relies on the RCD instead.',
      }}
      datePublished="2025-09-20"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting"
      badgeIcon={Activity}
      heroTitle={
        <>
          Earth Fault Loop Impedance Too High?
          <br />
          <span className="text-yellow-400">What It Means & What to Do</span>
        </>
      }
      heroSubtitle="A Zs value that exceeds the BS 7671 maximum means the protective device may not disconnect quickly enough during an earth fault — creating a serious electric shock risk. This guide explains what 'too high' means, every common cause, and the practical solutions available."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Verify Zs Compliance on Site with Elec-Mate"
      ctaSubheading="Zs lookup calculator, R1+R2 calculator, auto-validated schedule of tests, and digital EICR forms. Join 1,600+ UK electricians. 7-day free trial, cancel anytime."
    />
  );
}
