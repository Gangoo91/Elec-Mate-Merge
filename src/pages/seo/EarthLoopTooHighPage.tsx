import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Zap,
  Search,
  Wrench,
  ShieldCheck,
  Calculator,
  FileCheck2,
  GraduationCap,
  ClipboardCheck,
  Activity,
  Cable,
  Link2,
  Gauge,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Troubleshooting', href: '/guides/troubleshooting' },
  { label: 'Earth Loop Too High', href: '/guides/earth-loop-impedance-too-high' },
];

const tocItems = [
  { id: 'what-is-zs', label: 'What Is Earth Loop Impedance?' },
  { id: 'maximum-values', label: 'Maximum Values per BS 7671' },
  { id: 'common-causes', label: 'Common Causes of High Zs' },
  { id: 'loose-connections', label: 'Loose Connections' },
  { id: 'long-cable-runs', label: 'Long Cable Runs' },
  { id: 'undersized-cpcs', label: 'Undersized CPCs' },
  { id: 'how-to-fix', label: 'How to Fix High Zs' },
  { id: 'supplementary-bonding', label: 'Supplementary Bonding Solutions' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Earth fault loop impedance (Zs) must be low enough that the protective device (MCB, fuse, or RCD) disconnects the supply within the maximum disconnection time specified by BS 7671 — 0.4 seconds for socket circuits and 5 seconds for fixed equipment circuits.',
  'The most common causes of high Zs readings are loose connections at terminals, long cable runs with undersized conductors, corroded earth connections, and high-impedance supply earthing arrangements.',
  'BS 7671 Table 41.3 and Table 41.4 list the maximum Zs values for each type and rating of protective device — these tables are essential reference for every electrician.',
  'If the Zs at the furthest point of a circuit exceeds the BS 7671 maximum for the protective device, the circuit must be treated as non-compliant — typically a C2 (Potentially Dangerous) observation on an EICR.',
  "Elec-Mate's Zs calculator looks up the maximum permitted earth loop impedance for any MCB, RCBO, or fuse type and rating, and compares your measured value against it instantly on site.",
];

const faqs = [
  {
    question: 'What is the maximum Zs for a 32 A Type B MCB?',
    answer:
      'For a 32 A Type B MCB, BS 7671 Table 41.3 gives a maximum Zs of 1.37 ohms at the furthest point of the circuit. This value assumes a disconnection time of 0.4 seconds, which applies to all socket-outlet circuits and circuits supplying portable equipment. However, this is the value at the maximum operating temperature of the conductors. When testing a cold circuit (which is the normal condition during periodic inspection), you should compare your measured Zs against a value reduced by a factor of 0.8 — giving a maximum measured Zs of approximately 1.10 ohms. This 80% rule accounts for the fact that conductor resistance increases with temperature, and the BS 7671 tabulated values are for conductors at their maximum operating temperature. If your measured Zs at the furthest point is above 1.10 ohms (cold), the circuit may not disconnect within the required time when the conductors are at full load temperature.',
  },
  {
    question: 'Why is my Zs higher at the end of the circuit than at the distribution board?',
    answer:
      'This is entirely normal and expected. The earth fault loop impedance increases along the length of a circuit because the impedance of the phase conductor and the CPC (circuit protective conductor) both add to the external earth fault loop impedance (Ze). At the distribution board, the Zs is approximately equal to Ze (the supply impedance up to the consumer unit). At the first socket, it includes Ze plus the impedance of the cable from the board to that socket. At the furthest point of the circuit, it includes Ze plus the full cable impedance (R1+R2) of the entire circuit run. This is why the Zs must be measured at the furthest point from the supply — that is where the impedance is highest and where the protective device will take longest to operate in the event of an earth fault. For ring circuits, the Zs at any point on the ring is Ze + (R1+R2)/4, because the fault current can flow through both legs of the ring simultaneously.',
  },
  {
    question: 'Can I use an RCD to compensate for high Zs?',
    answer:
      'An RCD (or RCBO) with a rated residual operating current of 30 mA will trip at very low fault currents — typically 15 to 25 mA. This means the Zs can be much higher before the RCD fails to operate. BS 7671 Regulation 411.5.3 permits a maximum Zs of 1667 ohms for a 30 mA RCD (calculated as 50 V touch voltage divided by 30 mA). In practice, this means that almost any circuit protected by a 30 mA RCD will have a Zs well within the RCD operating limit. However, the circuit must still meet the disconnection time requirements for the overcurrent protective device (MCB or fuse) to protect against line-to-neutral faults and overloads, which the RCD does not detect. So while an RCD provides additional protection for earth faults, you should not rely on it as the primary means of fault protection if the Zs is too high for the MCB to operate within the required time — the MCB must still be able to clear faults within its own Zs limits for overcurrent protection.',
  },
  {
    question: 'How do I measure Zs safely?',
    answer:
      'Earth fault loop impedance is a live test — it must be performed with the circuit energised. Before testing, ensure the installation is safe to work on and that you have appropriate PPE. Use a calibrated multifunction tester (Megger, Metrel, or equivalent) set to the loop impedance function. Connect the test leads to the phase, neutral, and earth terminals at the point of measurement — typically the furthest socket on the circuit. The instrument briefly creates a controlled earth fault and measures the resulting impedance. For circuits protected by an RCD, use the "no-trip" or "non-trip" loop impedance mode on your tester — this uses a reduced test current that will not trip the RCD. Note that no-trip readings are slightly less accurate than standard readings. Record the measured Zs on the schedule of test results and compare it against the BS 7671 maximum for the protective device type and rating. If the reading exceeds the maximum, investigate the cause before concluding the circuit is non-compliant.',
  },
  {
    question: 'What should I do if Zs is too high on an old TT installation?',
    answer:
      "TT installations (where the means of earthing is by the consumer's own earth electrode rather than the supply company's earth) inherently have much higher earth fault loop impedance than TN-S or TN-C-S installations. The resistance of a single earth rod can be anywhere from 10 ohms to over 200 ohms, depending on soil conditions, rod length, and electrode type. For a TT installation, BS 7671 requires RCD protection on all circuits (Regulation 411.5.2), and the maximum Zs is determined by the RCD characteristics rather than the MCB alone. For a 30 mA RCD on a TT system, the maximum Zs is 1667 ohms (50 V / 0.03 A). Most TT installations will be well within this limit. However, if the earth electrode resistance is exceptionally high (above 200 ohms), consider improving the earthing arrangement — driving additional earth rods, using longer rods, or using chemical earth enhancement compounds to reduce the electrode resistance. The measured electrode resistance should be recorded on the EICR.",
  },
  {
    question: 'Does cable size affect earth loop impedance?',
    answer:
      'Yes, cable size has a direct and significant effect on Zs. The impedance of the circuit conductors (R1 for the phase conductor and R2 for the CPC) is determined by the conductor cross-sectional area, the conductor material (copper or aluminium), and the cable length. Smaller conductors have higher resistance per metre. For example, 1.0 mm squared twin and earth cable has an R1+R2 of approximately 36.2 milliohms per metre (at 20 degrees Celsius), while 2.5 mm squared twin and earth has approximately 22.4 milliohms per metre. On a long cable run, using 1.0 mm squared instead of 1.5 mm squared can push the Zs above the BS 7671 maximum. This is particularly relevant for lighting circuits on long runs — a 10-metre run adds 0.36 ohms with 1.0 mm squared cable versus 0.24 ohms with 1.5 mm squared. The CPC size is also critical: in twin and earth cable, the CPC is one size smaller than the line and neutral conductors (e.g., 1.0 mm squared CPC in 2.5 mm squared cable), which means the CPC often contributes more impedance than the line conductor.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/calculators',
    title: 'Zs Calculator',
    description:
      'Look up the maximum Zs for any MCB, RCBO, or fuse type and compare with your measured value.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description:
      'The correct order of dead and live tests for periodic inspection per BS 7671 and GN3.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanning and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description:
      'Understand C1, C2, C3, and FI codes — including how to classify high Zs findings.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-arrangements',
    title: 'Earthing Arrangements Guide',
    description:
      'TN-S, TN-C-S, TT — understand earthing systems and how they affect loop impedance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering earth fault loop impedance testing.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-zs',
    heading: 'What Is Earth Fault Loop Impedance?',
    content: (
      <>
        <p>
          Earth fault loop impedance (Zs) is the total impedance of the path that earth fault
          current takes when a live conductor comes into contact with an earthed part. This path
          starts at the transformer winding, runs through the phase conductor to the point of the
          fault, through the fault itself, through the CPC (circuit protective conductor) back to
          the distribution board, through the main earthing terminal, through the means of earthing
          (supply company earth or earth electrode), and back to the transformer.
        </p>
        <p>
          The reason Zs matters is simple: when an earth fault occurs, the fault current must be
          large enough to operate the protective device (MCB, fuse, or RCD) within the maximum
          disconnection time specified by{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>. The
          lower the Zs, the higher the fault current, and the faster the protective device trips. If
          Zs is too high, the fault current is too low, and the protective device may not trip at
          all — leaving the fault energised and creating a risk of electric shock and fire.
        </p>
        <p>
          Zs is made up of two components: Ze (the external earth fault loop impedance — everything
          from the transformer to the consumer unit) and R1+R2 (the impedance of the circuit phase
          conductor and CPC from the consumer unit to the point of measurement). The formula is Zs =
          Ze + R1+R2.
        </p>
      </>
    ),
  },
  {
    id: 'maximum-values',
    heading: 'Maximum Zs Values per BS 7671',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 sets maximum Zs values for each type and rating of protective device.
          These values ensure that in the event of an earth fault, the protective device will
          disconnect the supply within the required time — 0.4 seconds for circuits supplying socket
          outlets and portable equipment, and 5 seconds for circuits supplying fixed equipment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type B MCB (most domestic circuits):</strong> Maximum Zs ranges from 13.68
                ohms (6 A) down to 0.86 ohms (50 A). Common values: 6 A = 7.67 ohms, 10 A = 4.60
                ohms, 16 A = 2.73 ohms, 20 A = 2.30 ohms, 32 A = 1.37 ohms, 40 A = 1.09 ohms (all at
                0.4s disconnection).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type C MCB (inductive loads):</strong> Maximum Zs values are lower because
                Type C MCBs require higher fault currents to trip magnetically. 6 A = 3.83 ohms, 10
                A = 2.30 ohms, 16 A = 1.37 ohms, 32 A = 0.68 ohms (at 0.4s disconnection).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>30 mA RCD (additional protection):</strong> Maximum Zs of 1667 ohms. This
                very high limit means that RCD protection effectively resolves most Zs compliance
                issues for earth fault protection — but overcurrent protection via the MCB must
                still be adequate.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When comparing your measured Zs against the tabulated maximum, apply the 80% rule. The BS
          7671 tabulated values assume conductors at their maximum operating temperature. When you
          test a circuit that is not carrying load (cold), the conductor resistance is lower. To
          account for this, multiply the tabulated Zs by 0.8 — your measured (cold) value must be
          below this reduced figure. For example, the 32 A Type B maximum of 1.37 ohms becomes 1.10
          ohms for comparison with cold test results.
        </p>
        <SEOAppBridge
          title="Zs calculator — instant lookup on site"
          description="Select the protective device type and rating, and Elec-Mate's Zs calculator shows the BS 7671 maximum earth loop impedance. Enter your measured value and the app tells you instantly whether the circuit passes or fails — including the 80% temperature correction."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'common-causes',
    heading: 'Common Causes of High Earth Loop Impedance',
    content: (
      <>
        <p>
          When your Zs reading exceeds the BS 7671 maximum for the protective device, the fault lies
          somewhere in the earth fault loop. The cause could be in the external supply (high Ze), in
          the circuit wiring (high R1+R2), or both. Here are the most common causes, starting with
          the most frequently encountered.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <Link2 className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Loose or Corroded Connections</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every connection in the earth fault loop adds resistance. A loose terminal, a
                  corroded earth clamp, a poorly made joint, or an oxidised connection at the main
                  earthing terminal can add enough impedance to push Zs above the maximum. This is
                  the single most common cause of unexpectedly high Zs readings — and the simplest
                  to fix.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-orange-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Long Cable Runs</h4>
                <p className="text-white text-sm leading-relaxed">
                  The longer the cable run, the higher the R1+R2 component of Zs. A circuit running
                  30 metres in 2.5 mm squared twin and earth will add approximately 0.67 ohms to the
                  Zs. On a 32 A Type B MCB (maximum Zs 1.37 ohms at operating temperature, 1.10 ohms
                  cold), that 0.67 ohms consumes more than half the available budget. Add a Ze of
                  0.50 ohms and you are already at 1.17 ohms — over the cold limit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Activity className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Undersized CPC</h4>
                <p className="text-white text-sm leading-relaxed">
                  In twin and earth cable, the CPC is one size smaller than the line and neutral
                  conductors. The CPC in 2.5 mm squared cable is 1.5 mm squared; the CPC in 1.5 mm
                  squared cable is 1.0 mm squared. The CPC often contributes more resistance per
                  metre than the line conductor. On long runs, this smaller CPC is the limiting
                  factor for Zs compliance.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  High External Earth Fault Loop Impedance (Ze)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  The Ze is determined by the supply company infrastructure and the earthing
                  arrangement. TT installations have inherently high Ze because the earth path
                  includes the consumer earth electrode and the general mass of earth. Even TN-C-S
                  supplies can have elevated Ze if the PEN conductor is long or undersized. If the
                  Ze is high, there is less room for R1+R2 before Zs exceeds the limit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Poor Main Earthing Arrangement</h4>
                <p className="text-white text-sm leading-relaxed">
                  A corroded main earth clamp on the water pipe, a broken or missing main bonding
                  conductor, a loose connection at the main earthing terminal, or an earth electrode
                  in dry or sandy soil can all add significant impedance to the earth fault loop.
                  Always check the main earthing arrangement when you find high Zs readings across
                  multiple circuits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'loose-connections',
    heading: 'Loose Connections: The Most Common Culprit',
    content: (
      <>
        <p>
          In the majority of cases where Zs readings are marginally above the BS 7671 maximum, the
          cause is one or more loose or high-resistance connections in the earth fault loop. Every
          terminal, joint, and clamp in the path adds a small amount of resistance. When several
          connections are slightly loose or corroded, the cumulative effect can be enough to push Zs
          over the limit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main earthing terminal:</strong> Check that the main earth conductor is
                securely connected and the terminal is clean and tight. Corrosion at this point
                affects every circuit in the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution board earth bar:</strong> Check every CPC connection on the
                earth bar. Loose earth connections at the board are extremely common, especially in
                older installations where the earth bar screws have worked loose over time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket and accessory terminals:</strong> Every socket, switch, and junction
                box on the circuit has earth terminals. A single loose earth connection in a socket
                on a radial circuit breaks the earth continuity to every point downstream.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply earth connection:</strong> On TN-S installations, check the earth
                clamp on the cable sheath. On TN-C-S installations, check the supply company earth
                terminal. Corrosion or looseness at these points elevates Ze for the entire
                installation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The fix is straightforward: re-make the connection. Clean the terminal, strip back to
          bright copper if the conductor is tarnished, tighten to the manufacturer's recommended
          torque, and retest. A single re-tightened connection can reduce Zs by 0.1 to 0.5 ohms —
          often enough to bring a marginal circuit back into compliance.
        </p>
      </>
    ),
  },
  {
    id: 'long-cable-runs',
    heading: 'Long Cable Runs: When Distance Is the Problem',
    content: (
      <>
        <p>
          Conductor resistance is proportional to length. On long cable runs — common in large
          houses, converted barns, commercial units, and circuits feeding outbuildings — the R1+R2
          component of Zs can be too high for the protective device, even with perfect connections
          and a healthy supply earth.
        </p>
        <p>
          Consider a radial socket circuit using 2.5 mm squared twin and earth cable running 25
          metres from the distribution board to the furthest socket. The R1+R2 for 2.5/1.5 mm
          squared cable is approximately 22.4 milliohms per metre (at 20 degrees Celsius), giving a
          total R1+R2 of 0.56 ohms. With a Ze of 0.35 ohms (typical for a TN-C-S supply), the Zs at
          the furthest point is 0.91 ohms — which passes for a 32 A Type B MCB. But extend that run
          to 40 metres and the R1+R2 becomes 0.90 ohms, giving a Zs of 1.25 ohms — which exceeds the
          1.10 ohm cold limit.
        </p>
        <p>Solutions for long cable runs include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Increase the cable size:</strong> Using 4.0 mm squared instead of 2.5 mm
                squared reduces R1+R2 and brings Zs back within limits. This is the most common
                design solution for long runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Add a separate CPC:</strong> Running a separate, larger CPC alongside the
                twin and earth cable reduces R2. For example, a 4.0 mm squared separate CPC in
                parallel with the 1.5 mm squared CPC in the cable significantly lowers the R2
                component.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use a lower-rated MCB:</strong> A 20 A Type B MCB has a maximum Zs of 2.30
                ohms instead of 1.37 ohms for a 32 A. If the circuit loading permits, reducing the
                MCB rating extends the allowable cable length significantly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Relocate the distribution board:</strong> In some cases (new builds,
                extensions), positioning a sub-distribution board closer to the load reduces cable
                lengths and therefore R1+R2 for individual circuits.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'undersized-cpcs',
    heading: 'Undersized CPCs: The Hidden Impedance',
    content: (
      <>
        <p>
          The circuit protective conductor (CPC) — the earth wire — is often the weakest link in the
          earth fault loop. In standard twin and earth cable, the CPC is one size smaller than the
          line and neutral conductors. This smaller cross-section means higher resistance per metre,
          and R2 often contributes more to Zs than R1.
        </p>
        <p>
          For 2.5 mm squared twin and earth cable, the CPC is 1.5 mm squared. The R1+R2 per metre is
          made up of approximately 7.41 milliohms (R1, the 2.5 mm squared line conductor) plus
          approximately 12.10 milliohms (R2, the 1.5 mm squared CPC) — the CPC contributes 63% of
          the total circuit impedance. If you used a 2.5 mm squared CPC instead, the R1+R2 would
          drop from 19.51 to 14.82 milliohms per metre — a 24% reduction.
        </p>
        <p>
          On circuits where high Zs is caused by the CPC size, the solution is to install a
          supplementary CPC of adequate size alongside the existing cable. This additional earth
          conductor runs in parallel with the existing CPC, reducing the combined R2 and therefore
          the overall Zs. The supplementary CPC must be correctly connected at both ends (at the
          distribution board earth bar and at the accessory earth terminal) and must be adequately
          sized per BS 7671 Table 54.7.
        </p>
      </>
    ),
  },
  {
    id: 'how-to-fix',
    heading: 'How to Fix High Earth Loop Impedance',
    content: (
      <>
        <p>
          The approach to fixing high Zs depends on which component of the earth fault loop is
          causing the problem. Start by measuring Ze at the origin of the installation and R1+R2 for
          the circuit. This tells you whether the issue is in the external supply, the circuit
          wiring, or both.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Measure Ze at the consumer unit.</strong> If Ze is higher than the supply
              company declared value, check the main earth connection. For TN-S, check the sheath
              clamp. For TN-C-S, check the supply company earth terminal. Clean and re-tighten if
              necessary.
            </li>
            <li>
              <strong>Measure R1+R2 for the faulty circuit.</strong> Use the continuity of ring
              final circuit test (for rings) or end-to-end continuity test (for radials) to
              determine R1+R2. Compare with the calculated value based on cable size and length. If
              measured R1+R2 is significantly higher than calculated, there is a high-resistance
              connection in the circuit.
            </li>
            <li>
              <strong>Check all connections.</strong> Inspect and re-tighten every terminal on the
              circuit — at the board, at each accessory, and at any junction boxes. A single loose
              earth connection can add 0.2 to 0.5 ohms.
            </li>
            <li>
              <strong>If connections are sound and R1+R2 is inherently high</strong> (long cable
              run, small CPC), consider upgrading the cable, adding a supplementary CPC, or reducing
              the MCB rating if the load permits.
            </li>
            <li>
              <strong>If Ze is inherently high</strong> (TT installation, long service cable),
              ensure all circuits are RCD-protected and verify Zs is within the RCD operating
              limits. Consider improving the earth electrode arrangement.
            </li>
          </ol>
        </div>
        <p>
          After completing any remedial work, retest Zs at the furthest point of the circuit and
          record the new reading on the schedule of test results. Issue the appropriate certificate
          for the remedial work — an{' '}
          <SEOInternalLink href="/guides/electrical-certificate-types-uk">
            Electrical Installation Certificate or Minor Works Certificate
          </SEOInternalLink>{' '}
          depending on the scope of work.
        </p>
        <SEOAppBridge
          title="Record Zs readings by voice — hands-free on site"
          description="With Elec-Mate's voice test entry, speak your earth loop impedance readings and the app fills in the schedule of test results. Say 'Ring 1, Zs 0.89' and the value is recorded, validated against BS 7671, and flagged if it exceeds the maximum."
          icon={Gauge}
        />
      </>
    ),
  },
  {
    id: 'supplementary-bonding',
    heading: 'Supplementary Bonding as a Last Resort',
    content: (
      <>
        <p>
          Supplementary equipotential bonding is sometimes proposed as a solution to high Zs, but it
          is important to understand what it does and does not achieve. Supplementary bonding
          connects exposed-conductive-parts (metal pipework, metallic baths, radiators) to the
          circuit protective conductor, reducing the touch voltage in the event of an earth fault.
          It does not reduce Zs or increase fault current — it protects by ensuring that all
          metalwork in the area rises to the same potential during a fault.
        </p>
        <p>
          Under BS 7671 Regulation 415.2, supplementary bonding can be used as an additional
          protective measure in locations of increased risk (such as bathrooms). However, it is not
          a substitute for adequate Zs. The circuit must still meet the disconnection time
          requirements, or alternative measures (such as RCD protection) must be provided.
        </p>
        <p>
          In practice, if Zs is too high for the MCB to disconnect within the required time, the
          recommended approach is:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                First, fix the root cause — tighten connections, upgrade cable, or improve the
                earthing arrangement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                If the root cause cannot be fully resolved, ensure the circuit is protected by a 30
                mA RCD or RCBO, which will provide earth fault disconnection at much lower fault
                currents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Apply supplementary bonding in locations of increased risk as an additional measure
                — never as the sole protective measure.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Record all supplementary bonding on the EICR or EIC and note the reason for its
          installation. Elec-Mate's{' '}
          <SEOInternalLink href="/guides/ai-tools-for-electricians">
            AI fault diagnosis tool
          </SEOInternalLink>{' '}
          can recommend the appropriate protective measures based on your measured Zs, the
          protective device type, and the installation characteristics.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EarthLoopTooHighPage() {
  return (
    <GuideTemplate
      title="Earth Loop Impedance Too High | How to Fix It"
      description="Complete guide to diagnosing and fixing high earth fault loop impedance (Zs). Covers BS 7671 maximum values, loose connections, long cable runs, undersized CPCs, supplementary bonding, and practical solutions for UK electricians."
      datePublished="2025-06-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting"
      badgeIcon={AlertTriangle}
      heroTitle={
        <>
          Earth Loop Impedance Too High?{' '}
          <span className="text-yellow-400">How to Find the Cause and Fix It</span>
        </>
      }
      heroSubtitle="When Zs exceeds the BS 7671 maximum for the protective device, the circuit cannot be guaranteed to disconnect safely during an earth fault. This guide explains why Zs goes high, how to identify loose connections, long cable runs, and undersized CPCs, and what to do about it."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About High Earth Loop Impedance"
      relatedPages={relatedPages}
      ctaHeading="Check Zs Limits Instantly on Site"
      ctaSubheading="Zs calculator, voice test entry, AI fault diagnosis, and digital EICR certificates. Join 430+ UK electricians using Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
