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
  BookOpen,
  CircuitBoard,
  CloudLightning,
  Scale,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Chapter 44', href: '/guides/chapter-44-overvoltage-protection' },
];

const tocItems = [
  { id: 'overview', label: 'Chapter 44 Overview' },
  { id: 'regulation-443', label: 'Reg 443.4.1 — When SPDs Are Required' },
  { id: 'risk-assessment', label: 'The Default Rule & Owner Declaration' },
  { id: 'spd-types', label: 'Type 1, Type 2 and Type 3 SPDs' },
  { id: 'switching-overvoltages', label: 'Reg 443.4.2 — Switching Overvoltages' },
  { id: 'installation', label: 'Installing SPDs at the Consumer Unit' },
  { id: 'coordination', label: 'Coordination with Protective Devices' },
  { id: 'cost-benefit', label: 'Cost vs Benefit Analysis' },
  { id: 'insurance', label: 'Insurance Implications' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Chapter 44 of BS 7671:2018+A4:2026 covers protection against transient overvoltages of atmospheric origin (lightning) transmitted by the supply and switching overvoltages generated within the installation. A4:2026 redrafted Regulation 443.4 and deleted the old risk-assessment method (Reg 443.5) and Annex A443 (calculated risk level, CRL) entirely — need is now decided on the consequence of an overvoltage, not a CRL calculation.',
  'Regulation 443.4.1 requires protection against transient overvoltages wherever the consequence could result in: (a) serious injury to, or loss of, human life; or (c) significant financial or data loss. Limb (b) was deleted by the BS 7671:2018+A2:2022 Corrigendum (May 2023), so only two active consequence limbs remain. In these cases SPDs shall be provided with no further assessment.',
  'For all other installations, Regulation 443.4.1 sets a default-on position: protection shall be provided unless the owner of the installation declares it is not required — on the basis that any loss or damage is tolerable and that they accept the risk of equipment damage and any consequential loss. That owner declaration is the only compliant route to omission, and should be retained with the installation documentation.',
  'Type 1 SPDs protect against partial lightning currents (10/350 µs waveform) and are installed at the origin of the installation. Type 2 SPDs protect against indirect lightning and switching surges (8/20 µs waveform), also at the origin / consumer unit. Type 3 SPDs provide fine protection close to individual equipment, used in addition to (never instead of) an upstream device.',
  'Regulation 443.4.2 is a separate limb: where equipment is likely to produce switching overvoltages or disturbances exceeding the rated impulse voltage of Table 443.2 — motors, transformers, capacitor banks, storage units, high-current loads — protection shall be considered regardless of the Reg 443.4.1 outcome.',
  'For an installation at 230/400 V, the voltage protection level (Up) of the installed SPD assembly shall not exceed 2.5 kV (Reg 534.4.4.2). It is recommended that Up does not exceed an 80% safety margin of the Category II required rated impulse voltage from Table 443.2 — i.e. a target of 2.0 kV — because the SPD connecting leads add inductive voltage drop.',
];

const faqs = [
  {
    question: 'When are SPDs required under BS 7671?',
    answer:
      'Under Regulation 443.4.1 (A4:2026), protection against transient overvoltages shall be provided where the consequence of an overvoltage could result in: (a) serious injury to, or loss of, human life; or (c) significant financial or data loss. Limb (b) was deleted by the BS 7671:2018+A2:2022 Corrigendum (May 2023), leaving two active consequence limbs. In those cases SPDs are required with no further assessment. For all other installations, Regulation 443.4.1 still sets protection as the default: it shall be provided unless the owner of the installation declares it is not required, on the basis that any loss or damage is tolerable and that they accept the risk of equipment damage and any consequential loss. That owner declaration is the only compliant route to omission and should be retained with the installation documentation. The old risk-assessment method (former Reg 443.5) and the calculated-risk-level annex have been deleted, so there is no longer a CRL calculation as the operative compliance mechanism.',
  },
  {
    question: 'What is the difference between Type 1, Type 2 and Type 3 SPDs?',
    answer:
      'Type 1 SPDs (also called Type 1 test class) are designed to handle the high-energy surges from a direct lightning strike to the building or its lightning protection system. They discharge massive surge currents (up to 100kA). Type 1 SPDs are installed at the origin of the installation and are mandatory where the building has an external lightning protection system (LPS). Type 2 SPDs handle indirect lightning surges (from a strike to the supply network or nearby ground) and switching surges from the supply. They are the most common SPD type in domestic installations and are installed at the consumer unit. Type 3 SPDs provide fine protection at the point of use — they clamp residual surges that pass the Type 2 device. Type 3 SPDs are plug-in devices or are built into socket outlets and equipment. For most domestic installations, a Type 2 SPD at the consumer unit is sufficient.',
  },
  {
    question: 'How do I install an SPD at a consumer unit?',
    answer:
      'The SPD is connected between line and earth (and neutral and earth) at the consumer unit. Most SPD manufacturers provide a self-contained module that mounts on a DIN rail next to the consumer unit or within it (if space permits). The SPD must be connected with the shortest possible cable length — long cable runs reduce the effectiveness of the SPD because the inductance of the cable limits the speed of surge clamping. The maximum recommended cable length from the SPD to the busbars is typically 500mm (the shorter the better). The SPD requires a dedicated backup fuse or MCB to disconnect it from the supply if it fails. This backup device is separate from the main switch and from the RCD(s).',
  },
  {
    question: 'Does the SPD need its own MCB or fuse?',
    answer:
      'Yes. The SPD must be protected by a backup overcurrent protective device. When an SPD reaches the end of its life (after absorbing many surges), it can fail short-circuit, which would draw excessive current. The backup device disconnects the failed SPD from the supply. The SPD manufacturer specifies the maximum rating for the backup fuse or MCB — typically 32A or 40A for domestic Type 2 SPDs. The backup device should be positioned so that its operation does not disconnect any other circuits. Ideally, the SPD and its backup fuse are connected directly after the main switch but before the RCD(s), so that a failed SPD is disconnected without tripping any RCDs or MCBs serving the installation.',
  },
  {
    question: 'Do SPDs protect against all types of surge?',
    answer:
      'SPDs protect against transient overvoltages — brief, high-voltage spikes lasting microseconds to milliseconds. These are caused by lightning (direct and indirect) and switching events on the supply network. SPDs do not protect against sustained overvoltages (for example, a neutral fault causing the supply voltage to rise to 400V) — that requires a separate device called a voltage-operated protection device (VOPD) or sustained overvoltage protection. Some SPD manufacturers include built-in sustained overvoltage protection, but this is not a standard feature of all SPDs. Check the SPD specification if sustained overvoltage protection is required.',
  },
  {
    question: 'What is the SPD status indicator?',
    answer:
      'Most Type 2 SPDs include a visual status indicator — typically a green/red window or LED. Green indicates the SPD is functional. Red indicates the SPD has failed and needs replacement. Some SPDs also include a remote signalling contact that can be connected to an alarm or building management system. During periodic inspection, checking the SPD status indicator is part of the visual inspection. An SPD showing a fault condition should be replaced. The SPD status should be recorded on the EICR schedule of inspections.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/spd-chapter-443-a4-2026',
    title: 'SPD Chapter 443 (A4:2026)',
    description: 'Surge protection risk assessment, Type 1/2/3, EICR coding.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/regulation-411-automatic-disconnection',
    title: 'Regulation 411 — ADS Explained',
    description:
      'Automatic disconnection of supply and its coordination with overvoltage protection.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/regulation-418-supplementary-protection',
    title: 'Regulation 418 — Supplementary Protection',
    description: 'RCD additional protection and coordination with SPD backup devices.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description: 'Consumer unit selection, SPD accommodation, and protective device coordination.',
    icon: CircuitBoard,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Record SPD installation details and risk assessment outcomes on EIC certificates.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study SPD inspection, overvoltage risk assessment, and Chapter 44 requirements for C&G 2391.',
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
    heading: 'Chapter 44: Overvoltage and SPD Requirements',
    content: (
      <>
        <p>
          Chapter 44 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          covers protection of electrical installations against overvoltage — specifically transient
          overvoltages of atmospheric origin (lightning) and switching overvoltages from the supply
          network or within the installation.
        </p>
        <p>
          Transient overvoltages are brief but intense voltage spikes that can reach thousands of
          volts. They damage or destroy electronic equipment, degrade cable insulation, and can
          cause arcing that leads to fires. Modern installations are more vulnerable than ever
          because they contain far more electronic equipment — LED drivers, smart home controllers,
          broadband routers, heat pump controllers, EV charger electronics — all of which are
          sensitive to voltage spikes.
        </p>
        <p>
          BS 7671:2018+A4:2026 redrafted Regulation 443.4, fundamentally changing how SPD need is
          determined. The previous risk-assessment method (former Reg 443.5) and Annex A443 (the
          calculated risk level, CRL) have been deleted in full. Instead, protection is required
          based on the <em>consequence</em> of an overvoltage event — two consequence limbs that
          always require protection (Reg 443.4.1), plus a default-on rule for all other
          installations that can only be set aside by a formal owner declaration. In practice, this
          means SPDs are required for the vast majority of new installations. This guide explains the
          regulatory framework, SPD types, installation methods, and the practical and commercial
          implications.
        </p>
      </>
    ),
  },
  {
    id: 'regulation-443',
    heading: 'Regulation 443.4.1 — When SPDs Are Required',
    content: (
      <>
        <p>
          Regulation 443.4 (Overvoltage control) is the parent clause; the operative requirement
          sits in <strong>Regulation 443.4.1</strong>. It lists the consequence limbs where
          protection against transient overvoltages <strong>shall</strong> be provided with no
          further assessment required — regardless of installation type. Two limbs are active;
          limb (b) was deleted by the BS 7671:2018+A2:2022 Corrigendum (May 2023):
        </p>
        <div className="overflow-hidden rounded-2xl border border-white/10 my-4">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-white/[0.06] text-white">
                <th className="px-4 py-3 font-semibold w-16">Limb</th>
                <th className="px-4 py-3 font-semibold">Consequence that triggers mandatory protection</th>
              </tr>
            </thead>
            <tbody className="text-white/90">
              <tr className="border-t border-white/10 bg-red-900/20">
                <td className="px-4 py-3 font-bold align-top">(a)</td>
                <td className="px-4 py-3">
                  <strong>Serious injury to, or loss of, human life.</strong> Includes medical
                  locations and any installation where equipment failure could endanger people.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="px-4 py-3 font-bold align-top text-white/50">(b)</td>
                <td className="px-4 py-3 text-white/60">
                  <em>Deleted by BS 7671:2018+A2:2022, Corrigendum (May 2023).</em>
                </td>
              </tr>
              <tr className="border-t border-white/10 bg-blue-900/20">
                <td className="px-4 py-3 font-bold align-top">(c)</td>
                <td className="px-4 py-3">
                  <strong>Significant financial or data loss.</strong> Covers premises where supply
                  loss or equipment damage from a transient would carry material commercial cost —
                  shops, offices, server rooms, data-dependent operations.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          For all installations not caught by limbs (a) or (c) above, Regulation 443.4.1 still
          requires protection by default — it may only be omitted via a formal owner declaration.
          See the section below on the declaration mechanism. The previous edition&apos;s
          calculated-risk-level method has been deleted, so there is no CRL figure to compute.
        </p>
      </>
    ),
  },
  {
    id: 'risk-assessment',
    heading: 'Regulation 443.4.1 — The Default Rule and Owner Declaration',
    content: (
      <>
        <p>
          For all installations not caught by the mandatory consequence limbs in Regulation 443.4.1,
          Regulation 443.4.1 sets a <strong>default-on position: SPDs shall be provided.</strong>{' '}
          The A4:2026 framework is not a cost/benefit test — the starting point is that protection
          is required. The only compliant route to omit SPDs in a non-critical installation is a
          formal written <strong>owner declaration</strong>.
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-white text-sm font-semibold mb-2">
                Owner Declaration — What Is Required (Reg 443.4.1)
              </p>
              <p className="text-white text-sm mb-2">The owner declaration must state that:</p>
              <ul className="list-disc list-inside text-white text-sm space-y-1 ml-2">
                <li>any loss or damage from a transient overvoltage is tolerable to them; and</li>
                <li>they accept the risk of equipment damage and any consequential loss.</li>
              </ul>
              <p className="text-white text-sm mt-2">
                The declaration must be{' '}
                <strong>recorded and retained with the installation documentation</strong> —
                retained with the EIC or as a separate document signed by the owner. It does not
                remove any other regulatory obligations under BS 7671 or statutory law.
              </p>
            </div>
          </div>
        </div>
        <p>
          In practice, most owners of modern properties will not sign a declaration of this kind,
          given the value of electronic equipment at risk. A modern domestic installation may
          contain smart TVs, computers, broadband routers, smart home systems, electronic white
          goods, boiler controls, and EV charger electronics — total replacement value: 2,700 to
          8,200+ pounds. Against an installed SPD cost of approximately 100 to 250 pounds, the owner
          declaration route is rarely used.
        </p>
        <p>
          Note: the formal risk-assessment method (former Regulation 443.5) and Annex A443, which
          set out a calculated risk level (CRL) using factors such as lightning flash density and
          overhead-versus-underground supply, no longer form part of the compliance decision.
          A4:2026 deleted both in full, so there is no CRL figure to calculate against a threshold.
        </p>
      </>
    ),
  },
  {
    id: 'spd-types',
    heading: 'Type 1, Type 2 and Type 3 SPDs',
    content: (
      <>
        <p>
          SPDs are classified by their test class, which determines the energy level they can handle
          and their intended position in the installation:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <CloudLightning className="w-5 h-5 text-red-400" />
              Type 1 SPD
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Designed to handle direct lightning current (10/350 microsecond waveform). Type 1 SPDs
              are installed at the origin of the installation — at the main distribution board or
              between the meter and the consumer unit. They discharge very high energy surges (up to
              100kA impulse current). Type 1 SPDs are required where the building has an external
              lightning protection system (LPS) to BS EN 62305, or where the supply is via overhead
              line and the risk assessment identifies a high lightning exposure. In most standard
              domestic installations without an LPS, Type 1 is not required.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <CloudLightning className="w-5 h-5 text-blue-400" />
              Type 2 SPD
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Designed to handle indirect lightning surges and switching surges (8/20 microsecond
              waveform). Type 2 SPDs are the most common type installed in domestic and small
              commercial installations. They are installed at the consumer unit or main distribution
              board. Typical discharge capacity is 20 to 40kA. Type 2 SPDs clamp the line voltage to
              their rated voltage protection level (Up) within nanoseconds of the surge arriving;
              for a 230/400 V installation that installed Up must not exceed 2.5 kV (Reg 534.4.4.2).
              For most domestic installations, a Type 2 SPD at the consumer unit provides adequate
              protection.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <CloudLightning className="w-5 h-5 text-green-400" />
              Type 3 SPD
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Provides fine protection at the point of use. Type 3 SPDs have a lower energy handling
              capacity but clamp to a lower residual voltage, close to the equipment being
              protected — either as plug-in adapters, built into socket outlets, or as dedicated
              modules near sensitive equipment. Type 3 SPDs are used in addition to (not instead of)
              Type 1 or Type 2 devices. They mop up residual surges that the upstream SPD did not
              fully clamp, and matter where the protective distance from the consumer-unit SPD is
              long (see coordination below).
            </p>
          </div>
        </div>
        <p>
          For combined protection, the SPDs must be coordinated. A Type 2 device at the consumer
          unit handles the bulk of the surge energy, and a Type 3 device near the equipment provides
          fine clamping. BS 7671 flags the protective distance directly: where the distance between
          the SPD and the equipment to be protected exceeds <strong>10 metres</strong>, oscillations
          can drive the voltage at the equipment terminals up to twice the SPD&apos;s voltage
          protection level — so additional coordinated SPDs closer to the equipment, or an SPD with
          a lower protection level, should be considered (Reg 534.4.4.2).
        </p>
        <div className="overflow-hidden rounded-2xl border border-white/10 my-4">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-white/[0.06] text-white">
                <th className="px-4 py-3 font-semibold">Property</th>
                <th className="px-4 py-3 font-semibold text-red-300">Type 1</th>
                <th className="px-4 py-3 font-semibold text-blue-300">Type 2</th>
                <th className="px-4 py-3 font-semibold text-green-300">Type 3</th>
              </tr>
            </thead>
            <tbody className="text-white/90">
              <tr className="border-t border-white/10">
                <td className="px-4 py-3 font-medium">Test waveform</td>
                <td className="px-4 py-3">10/350 µs (Iimp)</td>
                <td className="px-4 py-3">8/20 µs (In/Imax)</td>
                <td className="px-4 py-3">Combination wave</td>
              </tr>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className="px-4 py-3 font-medium">Protects against</td>
                <td className="px-4 py-3">Partial direct lightning current</td>
                <td className="px-4 py-3">Indirect lightning + switching surges</td>
                <td className="px-4 py-3">Residual surges at the equipment</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="px-4 py-3 font-medium">Typical position</td>
                <td className="px-4 py-3">Origin of installation</td>
                <td className="px-4 py-3">Consumer unit / main board</td>
                <td className="px-4 py-3">At/near the appliance</td>
              </tr>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className="px-4 py-3 font-medium">Domestic need</td>
                <td className="px-4 py-3">Only where an external LPS is fitted</td>
                <td className="px-4 py-3">The usual choice at the board</td>
                <td className="px-4 py-3">Optional, for sensitive kit</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-base mb-3">
            Overvoltage Categories — Required Rated Impulse Voltage (Uw), Table 443.2
          </h3>
          <p className="text-white text-sm leading-relaxed mb-4">
            Equipment is classified into four overvoltage categories (I–IV), each with a minimum
            rated impulse voltage (Uw) from Table 443.2. The values below are the required figures
            for a <strong>230/400 V</strong> installation (the 300 V line-to-neutral row of the
            table):
          </p>
          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-white/[0.06] text-white">
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Required Uw</th>
                  <th className="px-4 py-3 font-semibold">Example equipment</th>
                </tr>
              </thead>
              <tbody className="text-white/90">
                <tr className="border-t border-white/10 bg-blue-900/20">
                  <td className="px-4 py-3 font-bold">IV</td>
                  <td className="px-4 py-3 font-mono">6 kV</td>
                  <td className="px-4 py-3">Origin of installation: energy meter, telecontrol systems</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="px-4 py-3 font-bold">III</td>
                  <td className="px-4 py-3 font-mono">4 kV</td>
                  <td className="px-4 py-3">Fixed installation: distribution boards, switchgear</td>
                </tr>
                <tr className="border-t border-white/10 bg-green-900/20">
                  <td className="px-4 py-3 font-bold">II</td>
                  <td className="px-4 py-3 font-mono">2.5 kV</td>
                  <td className="px-4 py-3">Current-using equipment: domestic appliances, tools</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="px-4 py-3 font-bold">I</td>
                  <td className="px-4 py-3 font-mono">1.5 kV</td>
                  <td className="px-4 py-3">Sensitive electronic equipment (needs upstream SPDs)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-white text-sm leading-relaxed mt-4">
            Regulation 534.4.4.2 sets the selection rule: for a 230/400 V installation the voltage
            protection level (Up) of the installed SPD assembly{' '}
            <strong>shall not exceed 2.5 kV</strong>, because the SPD connecting leads add an
            inductive voltage drop. Note 2 to that regulation recommends Up does not exceed an{' '}
            <strong>80% safety margin</strong> of the Category II required rated impulse voltage
            from Table 443.2 — i.e. a target of <strong>2.0 kV</strong> (0.8 × 2.5 kV). It also
            warns that beyond a 10 m protective distance the terminal voltage can reach twice Up.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'switching-overvoltages',
    heading: 'Regulation 443.4.2 — Switching Overvoltages (Commercial and Industrial)',
    content: (
      <>
        <p>
          Regulation 443.4.2 introduces a separate and independent limb of the overvoltage
          assessment. Where equipment is likely to produce switching overvoltages or disturbances,
          protection against those overvoltages <strong>shall be considered</strong> — regardless of
          whether the installation falls into Reg 443.4 categories or has an owner declaration under
          Reg 443.4.1.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Variable-frequency drives (VFDs / inverters)</strong> — produce high-energy
                switching transients on every switching cycle. Common in HVAC systems, pump
                controls, and motor starters in commercial and industrial premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large motors and motor starters</strong> — switching large inductive loads
                generates voltage spikes. Star-delta starters and direct-on-line starters are
                particularly prone to producing switching disturbances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power factor correction capacitors</strong> — switching capacitor banks
                causes high-frequency transient overvoltages that propagate through the
                installation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Reg 443.4.2 obligation is to <em>consider</em> protection — the designer or installer
          shall assess whether SPDs or other suppression measures (RC snubbers, line reactors) are
          needed. This is a common gap in commercial and industrial surveys: installers familiar
          with domestic SPD practice may apply the Reg 443.4.1 framework and overlook the separate
          switching-overvoltage assessment entirely.
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm">
              <strong>EICR implication:</strong> Where VFDs, large motors, or capacitor banks are
              present and no switching overvoltage assessment has been carried out or documented,
              this is a codeable observation (C2 or C3 depending on the degree of risk to sensitive
              equipment sharing the same distribution board).
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'installation',
    heading: 'Installing SPDs at the Consumer Unit',
    content: (
      <>
        <p>
          Correct installation is critical for SPD effectiveness. The key principles are short cable
          lengths, correct connection position, and proper backup protection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable length</strong> — the total cable length from the SPD to the line
                busbar and from the SPD to the earth bar must be as short as possible — ideally less
                than 500mm combined. Long cable runs add inductance, which reduces the SPD's ability
                to clamp fast transients. Route cables directly; do not coil excess cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Connection position</strong> — the SPD should be connected after the main
                switch but before the RCD(s). This ensures that the SPD surge discharge current does
                not flow through the RCD (which could cause nuisance tripping) and that a failed SPD
                can be disconnected by its backup device without affecting the rest of the
                installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Backup protection</strong> — a dedicated MCB or fuse (typically 32A or as
                specified by the SPD manufacturer) is installed in series with the SPD. If the SPD
                fails end-of-life, the backup device disconnects it. The backup device must not
                exceed the maximum rating specified by the SPD manufacturer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth connection</strong> — the SPD diverts surge current to earth. The
                earth connection must be low impedance. Connect to the main earthing terminal (MET)
                with the shortest possible cable run. In TT installations, the earth electrode
                resistance must be low enough for the SPD to operate effectively.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Many consumer unit manufacturers now offer integrated SPD modules that mount directly on
          the DIN rail within the consumer unit, with short pre-formed connections to the busbars.
          These are the preferred option for new installations as they minimise cable lengths and
          simplify installation.
        </p>
      </>
    ),
  },
  {
    id: 'coordination',
    heading: 'Coordination with Protective Devices',
    content: (
      <>
        <p>
          The SPD must be coordinated with both its backup protective device and the upstream supply
          fuse. Coordination ensures that the SPD can discharge surge currents without the backup
          device operating (which would disconnect the SPD during a surge), and that a failed SPD is
          disconnected before the upstream fuse blows.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Backup device rating</strong> — the SPD manufacturer specifies the maximum
                backup fuse or MCB rating. Using a backup device with a higher rating than specified
                means the SPD may not be disconnected quickly enough if it fails. Using a lower
                rating means the backup device may operate during a surge, disconnecting the SPD
                when it is needed most.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD coordination</strong> — surge currents flowing through an RCD can cause
                nuisance tripping. Position the SPD before (upstream of) the RCD so that surge
                currents do not pass through the RCD coil. If the consumer unit layout makes this
                difficult, some SPD manufacturers offer models with integrated RCD surge immunity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply fuse coordination</strong> — in the event of an SPD short-circuit
                failure, the backup MCB must operate before the supply fuse. This is normally
                achieved automatically because the backup MCB (32A) is rated lower than the supply
                fuse (typically 60A to 100A), but it should be verified for each installation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-benefit',
    heading: 'Cost vs Benefit Analysis for Electricians',
    content: (
      <>
        <p>
          From a business perspective, SPDs represent an opportunity for electricians. The
          regulation now effectively mandates SPDs for most new installations, which means every
          consumer unit change, rewire, and new installation should include SPD provision. The
          figures below are <strong>indicative market guidance</strong> to frame the conversation —
          not a quote — and will vary by SPD type, board, and region.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Cost</h3>
            <div className="text-white text-sm leading-relaxed space-y-2">
              <p>Type 2 SPD module: 50 to 150 pounds</p>
              <p>Backup MCB (32A): 5 to 10 pounds</p>
              <p>Cable and sundries: 5 to 10 pounds</p>
              <p>Installation time: 60 to 90 minutes (new-build 45–60 min; retrofit 90 min)</p>
              <p>
                <strong>Total installed cost: 100 to 250 pounds</strong>
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Value to Customer</h3>
            <div className="text-white text-sm leading-relaxed space-y-2">
              <p>Protection of electronic equipment worth 2,700 to 8,200+ pounds</p>
              <p>Reduced risk of data loss</p>
              <p>Protection of smart home investment</p>
              <p>Potential insurance benefit (documented protection)</p>
              <p>
                <strong>Clear cost/benefit in customer's favour</strong>
              </p>
            </div>
          </div>
        </div>
        <p>
          When quoting for a consumer unit change or rewire, include the SPD as a line item with a
          brief explanation of the regulation requirement and the protection it provides. Most
          customers will accept the additional cost without question when they understand it
          protects their expensive electronics.
        </p>
        <SEOAppBridge
          title="Include SPDs in your quotes automatically"
          description="Elec-Mate's quoting app includes SPD line items with standard descriptions and pricing. Add SPDs to every consumer unit and rewire quote with one tap."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'insurance',
    heading: 'Insurance Implications',
    content: (
      <>
        <p>
          The insurance landscape around SPDs is evolving. While no UK insurer currently requires
          SPDs as a condition of cover for standard domestic buildings and contents policies, there
          are several insurance-related considerations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Claims evidence</strong> — if a surge event damages equipment and the
                homeowner makes an insurance claim, the insurer may ask whether the installation
                complied with current regulations. If the installation was new or recently modified
                and did not include SPDs (contrary to the BS 7671 requirement), this could
                complicate the claim.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-value homes</strong> — insurers of high-value properties (those with
                specialist home insurance policies) may specifically inquire about surge protection
                as part of the risk assessment for the policy. Documented SPD installation
                strengthens the property's risk profile.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial premises</strong> — business insurance policies, particularly
                those covering IT equipment and business interruption, may offer premium reductions
                or more favourable terms where surge protection is documented. This is particularly
                relevant for businesses with significant IT infrastructure.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians, the insurance angle is a useful selling point. While you should not make
          specific claims about insurance benefits (refer the customer to their insurer), you can
          legitimately point out that having documented surge protection, installed to current
          regulations, is a positive factor in any future insurance claim for surge damage.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function Chapter44OvervoltageProtectionPage() {
  return (
    <GuideTemplate
      title="Chapter 44 BS 7671 | Overvoltage & SPD Requirements"
      description="Complete guide to Chapter 44 of BS 7671 — overvoltage protection and SPD requirements. Risk assessment under Regulation 443.4, Type 1/2/3 SPDs…"
      datePublished="2026-03-27"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulation Deep-Dive"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Chapter 44: <span className="text-yellow-400">Overvoltage and SPD Requirements</span>
        </>
      }
      heroSubtitle="Under BS 7671:2018+A4:2026, SPDs are required by default for most installations — omission requires a formal written owner declaration. This guide explains the Reg 443.4.1 consequence limbs, the owner declaration mechanism, SPD types, installation, and the commercial case for your customers."
      answerBox={{
        question: 'When are SPDs required under BS 7671 (Chapter 44)?',
        answer:
          'Under Regulation 443.4.1 (A4:2026), surge protective devices shall be provided wherever a transient overvoltage could cause serious injury or loss of life, or significant financial or data loss. For all other installations protection is still the default — it may only be omitted if the owner declares any loss is tolerable and accepts the risk.',
      }}
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About SPDs and Overvoltage Protection"
      relatedPages={relatedPages}
      ctaHeading="Quote SPDs and Document Risk Assessments on Site"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for professional quoting, on-site EIC certificates, and overvoltage risk assessment documentation. 7-day free trial, cancel anytime."
    />
  );
}
