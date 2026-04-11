import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  GraduationCap,
  ClipboardCheck,
  Timer,
  Activity,
  BookOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Regulation 411', href: '/guides/regulation-411-automatic-disconnection' },
];

const tocItems = [
  { id: 'overview', label: 'What is ADS?' },
  { id: 'principle', label: 'The ADS Principle Explained' },
  { id: 'disconnection-times', label: 'Disconnection Times' },
  { id: 'zs-values', label: 'Zs Values and MCB Types' },
  { id: 'earthing-systems', label: 'TN-S, TN-C-S and TT Systems' },
  { id: 'testing', label: 'Practical Testing' },
  { id: 'worked-examples', label: 'Worked Examples' },
  { id: 'common-failures', label: 'Common ADS Failures' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Automatic Disconnection of Supply (ADS) is the most widely used protective measure in BS 7671. It relies on a protective device (MCB, fuse, or RCD) disconnecting the circuit fast enough to prevent electric shock when a fault occurs.',
  'Final circuits not exceeding 32A must disconnect within 0.4 seconds (Regulation 411.3.2.2). Distribution circuits and circuits exceeding 32A must disconnect within 5 seconds (Regulation 411.3.2.3).',
  'The maximum earth fault loop impedance (Zs) depends on the type and rating of the protective device. A Type B 32A MCB has a maximum Zs of 1.37 ohms at 70 degrees C, while a Type C 32A MCB has a maximum Zs of 0.68 ohms.',
  'TT systems cannot usually achieve ADS through overcurrent devices alone due to high earth fault loop impedance. An RCD is the standard protective device for TT installations (Regulation 411.5.2).',
  'Always measure Zs at the furthest point of every circuit during initial verification. Compare the measured value against the maximum tabulated Zs for the protective device — if Zs is too high, the circuit will not disconnect fast enough.',
];

const faqs = [
  {
    question: 'What is automatic disconnection of supply in BS 7671?',
    answer:
      'Automatic disconnection of supply (ADS) is a protective measure defined in Section 411 of BS 7671. It works by ensuring that when an earth fault occurs (for example, a live conductor touches an exposed-conductive-part), the protective device — an MCB, fuse, or RCD — disconnects the supply quickly enough to limit the duration of the touch voltage to a safe level. ADS requires two things working together: an effective earth fault current path (so sufficient fault current flows to operate the protective device) and a protective device that will trip within the required disconnection time for the measured earth fault loop impedance.',
  },
  {
    question: 'Why is 0.4 seconds the disconnection time for final circuits?',
    answer:
      'Regulation 411.3.2.2 requires a disconnection time not exceeding 0.4 seconds for final circuits not exceeding 32A in TN systems. This time is derived from the IEC time/current zones for the effects of electric shock. At the touch voltage levels that can occur in a 230V installation, 0.4 seconds is the maximum duration a person can be exposed before the risk of ventricular fibrillation becomes unacceptable. The 0.4-second requirement applies to circuits where the general public (including children) may come into contact with equipment — essentially all socket-outlet circuits and fixed equipment circuits up to 32A.',
  },
  {
    question: 'What is the difference between Zs and Ze?',
    answer:
      'Ze is the external earth fault loop impedance — the impedance of the fault path from the transformer, through the supply cable, and back to the origin of the installation. It is measured at the main earthing terminal with all circuits disconnected. Zs is the total earth fault loop impedance at any point in a circuit — it includes Ze plus the impedance of the circuit protective conductor (R2) and the line conductor (R1) from the origin to the point of measurement. Zs = Ze + (R1 + R2). The Zs value determines whether the protective device will disconnect within the required time. If Zs is too high, the fault current will be too low to trip the MCB or fuse fast enough.',
  },
  {
    question: 'Why do Type C MCBs have lower maximum Zs values than Type B?',
    answer:
      'Type B MCBs trip magnetically (instantaneously) between 3 and 5 times their rated current (In). Type C MCBs trip magnetically between 5 and 10 times In. Because a Type C MCB needs a higher fault current to achieve instantaneous tripping, the maximum permissible Zs must be lower to ensure that higher fault current can flow. For example, a 32A Type B MCB trips magnetically at 5 times 32A = 160A minimum, giving a maximum Zs of approximately 230V divided by 160A = 1.44 ohms. A 32A Type C MCB trips at 10 times 32A = 320A minimum, giving a maximum Zs of approximately 230V divided by 320A = 0.72 ohms. The published tables in BS 7671 include a correction for conductor temperature.',
  },
  {
    question: 'How do I test earth fault loop impedance on site?',
    answer:
      'Earth fault loop impedance is measured using a calibrated loop impedance tester. Connect the tester at the furthest point of the circuit (typically the last socket outlet on a ring or the end of a radial). The tester injects a brief test current and measures the impedance of the complete fault loop. Record the measured Zs value and compare it against the maximum tabulated Zs for the protective device type and rating (from Table 41.3 or 41.4 in BS 7671). The measured value must not exceed 80% of the tabulated maximum if you are testing at ambient temperature (to allow for conductor resistance increasing when cables are at their operating temperature). Alternatively, use the full tabulated value if you have corrected your measurement to 70 degrees C operating temperature.',
  },
  {
    question: 'Can an RCD be used to achieve ADS instead of relying on Zs?',
    answer:
      'Yes. Where the earth fault loop impedance is too high for an overcurrent device (MCB or fuse) to disconnect within the required time, an RCD can be used. Regulation 411.4.9 permits this in TN systems, and Regulation 411.5.2 makes RCDs the standard approach in TT systems. For a 30mA RCD to disconnect within 0.4 seconds, the maximum Zs is typically 1667 ohms (based on the 50V touch voltage limit: 50V divided by 0.03A). This is easily achievable on virtually any installation. However, the circuit must still have overcurrent protection — the RCD provides earth fault protection, and the MCB provides overcurrent protection. An RCBO combines both functions in one device.',
  },
  {
    question: 'What happens if Zs is marginally above the maximum permitted value?',
    answer:
      'If the measured Zs exceeds the maximum tabulated value for the protective device, the circuit does not comply with Regulation 411. The protective device will not disconnect the circuit within the required time during an earth fault. Options to resolve this include: using an RCD or RCBO on the circuit (which has a much higher maximum Zs); reducing the circuit length (shorter cable run means lower R1+R2); increasing the cable size (larger conductor cross-section means lower resistance); checking and improving connections (loose connections increase impedance); or changing the MCB type (for example, switching from Type C to Type B gives a higher maximum Zs). On an EICR, a marginally high Zs is typically coded C2 (potentially dangerous) because the protection may not operate within the required time.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/regulation-418-supplementary-protection',
    title: 'Regulation 418 — Supplementary Protection',
    description:
      'RCD additional protection requirements including 30mA RCDs, exemptions, and RCBO selection.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Calculate R1+R2 values and verify Zs for your circuits automatically.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Record Zs test results and protective device details on Electrical Installation Certificates.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-condition-report-guide',
    title: 'EICR Guide',
    description: 'How to assess and code ADS failures during periodic inspection and testing.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study loop impedance testing, ADS verification, and fault finding for C&G 2391.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What is Automatic Disconnection of Supply?',
    content: (
      <>
        <p>
          Automatic Disconnection of Supply (ADS) is the protective measure described in Section 411
          of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          . It is the most commonly applied protection against electric shock in UK electrical
          installations — virtually every circuit in a domestic or commercial installation relies on
          ADS.
        </p>
        <p>
          The principle is straightforward: if a fault occurs that makes an exposed-conductive-part
          live (for example, a live conductor contacts a metal enclosure), the protective device
          must disconnect the supply fast enough to prevent a lethal electric shock. ADS is not a
          single device — it is a combination of earthing, protective conductors, and protective
          devices working together.
        </p>
        <p>
          Understanding ADS is essential for every electrician. It determines how you select
          protective devices, how you size cables, how you design earthing arrangements, and what
          you test during initial verification and periodic inspection. If ADS fails, the
          consequence is a sustained touch voltage on metalwork that people can contact — a direct
          risk to life.
        </p>
      </>
    ),
  },
  {
    id: 'principle',
    heading: 'The ADS Principle Explained',
    content: (
      <>
        <p>Regulation 411.3.1.1 states that ADS requires the coordination of two elements:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>An earth fault current path</strong> — a low-impedance path from the point
                of the fault, through the protective conductor, back to the source (transformer
                neutral). This path must have sufficiently low impedance to allow enough fault
                current to flow to operate the protective device. The total impedance of this path
                is the earth fault loop impedance (Zs).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>A protective device that disconnects within the required time</strong> — an
                MCB, fuse, RCBO, or RCD that will operate within the maximum disconnection time
                specified by BS 7671 for the type of circuit and earthing system. The device must be
                selected so that the fault current flowing through the Zs path is sufficient to trip
                it within the required time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The relationship is governed by Ohm's law. When a line-to-earth fault occurs, the fault
          current (If) equals the supply voltage (Uo) divided by the earth fault loop impedance
          (Zs):
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <p className="text-white font-mono text-lg text-center">If = Uo / Zs</p>
          <p className="text-white text-sm mt-2 text-center">
            Where Uo = 230V (nominal), Zs = total earth fault loop impedance in ohms
          </p>
        </div>
        <p>
          If the fault current (If) is high enough, the MCB or fuse trips within the required time.
          If Zs is too high, the fault current is too low, the device takes too long to trip, and
          the person touching the faulty equipment is exposed to a dangerous voltage for too long.
        </p>
      </>
    ),
  },
  {
    id: 'disconnection-times',
    heading: 'Disconnection Times: 0.4s and 5s Rules',
    content: (
      <>
        <p>
          BS 7671 specifies maximum disconnection times in Regulation 411.3.2. The times differ
          depending on the type of circuit and the earthing system:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <Timer className="w-5 h-5 text-red-400" />
              0.4 Seconds
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Regulation 411.3.2.2 requires a maximum disconnection time of 0.4 seconds for final
              circuits not exceeding 32A in TN systems. This covers virtually all socket-outlet
              circuits, lighting circuits, and fixed equipment circuits in domestic and commercial
              installations. The 0.4-second time is based on the physiological effects of electric
              shock — at 230V touch voltage, 0.4 seconds is the threshold beyond which the risk of
              ventricular fibrillation becomes unacceptable.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <Timer className="w-5 h-5 text-amber-400" />5 Seconds
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Regulation 411.3.2.3 permits a maximum disconnection time of 5 seconds for
              distribution circuits in TN systems. A distribution circuit supplies one or more
              distribution boards (sub-mains) rather than directly supplying current-using
              equipment. The longer time is permitted because the exposed-conductive-parts of
              distribution circuits are generally not accessible to the general public and because
              simultaneous contact with earth and a distribution conductor is less likely.
            </p>
          </div>
        </div>
        <p>
          For TT systems, Table 41.1 in BS 7671 specifies a disconnection time of 0.2 seconds for
          final circuits not exceeding 32A, and 1 second for distribution circuits. These shorter
          times reflect the higher touch voltages that can occur in TT systems due to the earth
          electrode resistance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Summary: Maximum Disconnection Times</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-white text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 pr-4">System</th>
                  <th className="text-left py-2 pr-4">Final circuits up to 32A</th>
                  <th className="text-left py-2">Distribution circuits</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">TN-S / TN-C-S</td>
                  <td className="py-2 pr-4">0.4s</td>
                  <td className="py-2">5s</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">TT</td>
                  <td className="py-2 pr-4">0.2s</td>
                  <td className="py-2">1s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'zs-values',
    heading: 'Zs Values and MCB Types (B, C and D)',
    content: (
      <>
        <p>
          The maximum earth fault loop impedance (Zs) for a circuit depends on the type and rating
          of the protective device. BS 7671 Table 41.3 provides maximum Zs values for MCBs to BS EN
          60898 and RCBOs to BS EN 61009. The values differ significantly between Type B, C, and D
          MCBs because of their different magnetic trip thresholds:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">MCB Magnetic Trip Ranges</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type B</strong> — instantaneous trip between 3 and 5 times In. Used for
                resistive and lightly inductive loads (lighting, socket outlets, electric heating).
                Highest maximum Zs values because the lowest fault current is needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type C</strong> — instantaneous trip between 5 and 10 times In. Used for
                moderately inductive loads (small motors, fluorescent lighting, air conditioning).
                Lower maximum Zs because a higher fault current is needed to trip magnetically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type D</strong> — instantaneous trip between 10 and 20 times In. Used for
                highly inductive loads (large motors, transformers, X-ray machines). Lowest maximum
                Zs because the highest fault current is needed. Rarely used in domestic
                installations.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">
            Common Maximum Zs Values (0.4s, at 70 degrees C)
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-white text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 pr-4">Rating</th>
                  <th className="text-left py-2 pr-4">Type B</th>
                  <th className="text-left py-2 pr-4">Type C</th>
                  <th className="text-left py-2">Type D</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">6A</td>
                  <td className="py-2 pr-4">7.67 ohms</td>
                  <td className="py-2 pr-4">3.83 ohms</td>
                  <td className="py-2">1.92 ohms</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">10A</td>
                  <td className="py-2 pr-4">4.60 ohms</td>
                  <td className="py-2 pr-4">2.30 ohms</td>
                  <td className="py-2">1.15 ohms</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">16A</td>
                  <td className="py-2 pr-4">2.87 ohms</td>
                  <td className="py-2 pr-4">1.44 ohms</td>
                  <td className="py-2">0.72 ohms</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">20A</td>
                  <td className="py-2 pr-4">2.30 ohms</td>
                  <td className="py-2 pr-4">1.15 ohms</td>
                  <td className="py-2">0.57 ohms</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">32A</td>
                  <td className="py-2 pr-4">1.37 ohms</td>
                  <td className="py-2 pr-4">0.68 ohms</td>
                  <td className="py-2">0.34 ohms</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">40A</td>
                  <td className="py-2 pr-4">1.15 ohms</td>
                  <td className="py-2 pr-4">0.57 ohms</td>
                  <td className="py-2">0.29 ohms</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-white text-xs mt-3">
            Values from BS 7671 Table 41.3. These are at conductor operating temperature (70 degrees
            C). When testing at ambient temperature, the measured Zs must not exceed 80% of these
            values.
          </p>
        </div>
        <p>
          The practical impact is significant. A 32A ring final circuit protected by a Type B MCB
          allows a maximum Zs of 1.37 ohms. If the same circuit were protected by a Type C MCB
          (which would be unusual for a ring circuit, but illustrates the point), the maximum Zs
          drops to 0.68 ohms — almost half. This is why Type B MCBs are the standard choice for
          domestic circuits: they offer the most headroom on earth fault loop impedance.
        </p>
      </>
    ),
  },
  {
    id: 'earthing-systems',
    heading: 'ADS in TN-S, TN-C-S and TT Systems',
    content: (
      <>
        <p>
          The earthing system of the installation has a major impact on ADS. The earth fault loop
          impedance, the available fault current, and the choice of protective device all depend on
          whether the installation is TN-S, TN-C-S, or TT.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">TN-S (Separate Neutral and Earth)</h3>
            <p className="text-white text-sm leading-relaxed">
              The supply has a separate earth conductor — typically the lead sheath or steel wire
              armour of the supply cable. The Ze (external earth fault loop impedance) is typically
              0.35 to 0.8 ohms. ADS is straightforward in TN-S systems because the Ze is relatively
              low and predictable. The main concern is older TN-S supplies where the cable sheath
              may be deteriorating, increasing Ze over time.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              TN-C-S (PME — Protective Multiple Earthing)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              The supply neutral and earth are combined in a single PEN conductor, with the neutral
              earthed at multiple points throughout the network. The Ze is typically very low — 0.2
              to 0.35 ohms — giving excellent ADS performance. PME is the most common supply
              arrangement for new-build domestic properties in the UK. The low Ze means most
              circuits will achieve ADS with MCBs alone. However, PME carries a specific risk: if
              the PEN conductor is lost (broken neutral), the installation metalwork can rise to a
              dangerous potential.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">TT (Earth Electrode)</h3>
            <p className="text-white text-sm leading-relaxed">
              The installation has its own earth electrode — typically a driven rod. There is no
              metallic return path to the transformer; the fault current returns through the general
              mass of earth. The Ze is typically 20 to 200 ohms (or more), depending on soil
              conditions and electrode type. This high impedance means overcurrent devices (MCBs and
              fuses) cannot achieve ADS alone — the fault current is far too low to trip them within
              the required time. Regulation 411.5.2 requires an RCD as the protective device in TT
              systems. A 30mA RCD can achieve ADS with a Zs up to 1667 ohms, making it effective
              even with very high earth electrode resistance.
            </p>
          </div>
        </div>
        <p>
          When carrying out an{' '}
          <SEOInternalLink href="/guides/eicr-condition-report-guide">EICR</SEOInternalLink>, always
          confirm the earthing system type and measure Ze before assessing individual circuits. The
          earthing system determines whether ADS by overcurrent device alone is feasible or whether
          RCD protection is essential.
        </p>
      </>
    ),
  },
  {
    id: 'testing',
    heading: 'Practical Testing with a Loop Impedance Tester',
    content: (
      <>
        <p>
          Earth fault loop impedance testing is a core part of both initial verification (Regulation
          643.7) and periodic inspection. The test confirms that the Zs at the furthest point of
          each circuit is within the limits required for ADS.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Testing Procedure</h4>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — Confirm safe to test.</strong> Earth fault loop impedance testing
                is a live test. Confirm that RCDs are in circuit (the test instrument may trip them
                — use a non-trip earth loop tester if needed, or temporarily bypass the RCD for the
                test with appropriate precautions).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — Test at the furthest point.</strong> Connect the tester at the
                furthest point of the circuit. For a ring final circuit, test at each socket outlet
                — the highest reading is at the mid-point of the ring (the point electrically
                furthest from the origin in both directions). For a radial, test at the last point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — Record and compare.</strong> Record the measured Zs. If testing at
                ambient temperature (which is the normal case), the measured Zs must not exceed 80%
                of the maximum tabulated Zs (to allow for the conductor resistance increasing at
                operating temperature). Alternatively, multiply the measured (R1+R2) by the
                correction factor from Table I1 in the On-Site Guide and add to Ze.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4 — Assess compliance.</strong> If the measured Zs (corrected for
                temperature) exceeds the maximum tabulated value, the circuit does not comply with
                Section 411. Investigate the cause — high R1+R2 (long cable run, undersized
                conductor), high Ze (supply earth issue), or poor connections.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Record Zs test results digitally"
          description="Elec-Mate's schedule of test results auto-validates your Zs readings against the maximum permitted values for the protective device. Instant pass/fail indication on site."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'worked-examples',
    heading: 'Worked Examples',
    content: (
      <>
        <p>These examples demonstrate how to verify ADS compliance for common domestic circuits.</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
            <h4 className="font-bold text-white mb-3">
              Example 1: Ring Final Circuit (32A Type B MCB)
            </h4>
            <div className="space-y-2 text-white text-sm">
              <p>
                <strong>Given:</strong> Ze = 0.35 ohms (TN-C-S supply). Ring circuit in 2.5mm² T&E,
                60m total ring length. R1+R2 per metre from tables = 0.0246 ohms/m (at 20 degrees
                C).
              </p>
              <p>
                <strong>Calculate R1+R2 for the ring:</strong> For a ring circuit, the R1+R2 at the
                mid-point = (total R1+R2) / 4 = (60 x 0.0246) / 4 = 1.476 / 4 = 0.369 ohms at 20
                degrees C.
              </p>
              <p>
                <strong>Correct for operating temperature:</strong> Multiply by 1.20 (correction
                factor for 70 degrees C PVC): 0.369 x 1.20 = 0.443 ohms.
              </p>
              <p>
                <strong>Calculate Zs:</strong> Zs = Ze + R1+R2 = 0.35 + 0.443 = 0.793 ohms.
              </p>
              <p>
                <strong>Compare:</strong> Maximum Zs for 32A Type B MCB = 1.37 ohms. 0.793 ohms is
                well within the limit. <strong>Circuit complies.</strong>
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
            <h4 className="font-bold text-white mb-3">
              Example 2: Long Radial Circuit (20A Type B MCB)
            </h4>
            <div className="space-y-2 text-white text-sm">
              <p>
                <strong>Given:</strong> Ze = 0.72 ohms (TN-S supply, older area). Radial circuit in
                2.5mm² T&E, 30m cable run. R1+R2 per metre = 0.0246 ohms/m.
              </p>
              <p>
                <strong>Calculate R1+R2:</strong> 30 x 0.0246 = 0.738 ohms at 20 degrees C.
              </p>
              <p>
                <strong>Correct for temperature:</strong> 0.738 x 1.20 = 0.886 ohms.
              </p>
              <p>
                <strong>Calculate Zs:</strong> 0.72 + 0.886 = 1.606 ohms.
              </p>
              <p>
                <strong>Compare:</strong> Maximum Zs for 20A Type B MCB = 2.30 ohms. 1.606 ohms is
                within the limit. <strong>Circuit complies</strong> — but with less headroom than
                Example 1. On a TN-S supply with higher Ze, long cable runs consume more of the
                available Zs budget.
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6">
            <h4 className="font-bold text-white mb-3">
              Example 3: Failing Circuit (32A Type C MCB)
            </h4>
            <div className="space-y-2 text-white text-sm">
              <p>
                <strong>Given:</strong> Ze = 0.35 ohms. Ring circuit in 2.5mm² T&E, 60m total ring
                length. Type C MCB (incorrectly specified for a ring circuit).
              </p>
              <p>
                <strong>Zs at 70 degrees C:</strong> 0.35 + 0.443 = 0.793 ohms (same as Example 1).
              </p>
              <p>
                <strong>Compare:</strong> Maximum Zs for 32A Type C MCB = 0.68 ohms. 0.793 ohms
                exceeds the limit. <strong>Circuit does NOT comply.</strong> The Type C MCB needs a
                higher fault current to trip magnetically, but the circuit impedance is too high.
                Solution: change to a Type B MCB (maximum Zs = 1.37 ohms), or add RCD/RCBO
                protection.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-failures',
    heading: 'Common ADS Failures and How to Resolve Them',
    content: (
      <>
        <p>
          During inspection and testing, these are the most common reasons circuits fail ADS
          compliance:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>High Ze on TN-S supplies</strong> — older TN-S supplies with deteriorating
                lead sheath can have Ze values above 0.8 ohms. Combined with long circuit cable
                runs, Zs can exceed the limit. Solution: contact the DNO to check the supply earth,
                or add RCD protection to circuits at risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long cable runs</strong> — each metre of cable adds to R1+R2. Very long
                radial circuits (particularly in larger properties, outbuildings, or agricultural
                installations) can result in high Zs. Solution: increase cable size (lower
                resistance per metre), reduce circuit length, or protect with an RCD.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wrong MCB type</strong> — Type C or D MCBs used where Type B is appropriate.
                This is common in older commercial installations where Type C MCBs were fitted as
                standard. Solution: replace with Type B MCBs where the load characteristics permit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loose or corroded connections</strong> — poor connections in the protective
                conductor path increase impedance. This often manifests as inconsistent Zs readings
                between test points. Solution: inspect and tighten all connections in the circuit,
                particularly at accessories and junction boxes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Broken ring continuity</strong> — if a ring final circuit has a break in the
                ring (either line or CPC), the circuit operates as two radials. The Zs at the break
                point can be significantly higher than expected. Solution: carry out ring circuit
                continuity tests (R1, Rn, R2) to confirm the ring is intact.
              </span>
            </li>
          </ul>
        </div>
        <p>
          On an <SEOInternalLink href="/guides/eicr-condition-report-guide">EICR</SEOInternalLink>,
          a circuit that fails ADS is typically coded C2 (potentially dangerous) — the protective
          measure is impaired and may not operate in the event of a fault. If the touch voltage
          exceeds 50V AC and disconnection will not occur, a C1 code (danger present) may be
          appropriate.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function Regulation411AutoDisconnectionPage() {
  return (
    <GuideTemplate
      title="Regulation 411 | Automatic Disconnection of Supply Explained"
      description="Complete guide to Regulation 411 (Automatic Disconnection of Supply) in BS 7671. Disconnection times, Zs values, MCB types B/C/D, TN-S vs TN-C-S vs TT systems, loop impedance testing, and worked examples for electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulation Deep-Dive"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Regulation 411:{' '}
          <span className="text-yellow-400">Automatic Disconnection of Supply Explained</span>
        </>
      }
      heroSubtitle="ADS is the most important protective measure in BS 7671. This guide explains the principle, disconnection times, maximum Zs values for MCB types B/C/D, earthing system differences, practical loop impedance testing, and worked examples."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Regulation 411 and ADS"
      relatedPages={relatedPages}
      ctaHeading="Test, Record and Verify ADS Compliance on Site"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for loop impedance recording, automatic Zs validation, and on-site EIC/EICR certificates. 7-day free trial, cancel anytime."
    />
  );
}
