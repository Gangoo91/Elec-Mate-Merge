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
  { id: 'regulation-443', label: 'Regulation 443 — When SPDs Are Required' },
  { id: 'risk-assessment', label: 'Reg 443.4.1 — Owner Declaration' },
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
  'Chapter 44 of BS 7671:2018+A4:2026 covers protection against overvoltage caused by atmospheric origin (lightning) and switching overvoltages. A4:2026 redrafted Section 443: the old AQ lightning-density criteria no longer apply — protection is now required based on the consequence of an overvoltage, not its likelihood.',
  'Regulation 443.4 sets four mandatory categories where SPDs shall be provided without any risk assessment: (a) risk to human life; (b) public services or cultural heritage; (c) interruption of commercial or industrial activity; (d) large numbers of co-located individuals. For all other installations, Regulation 443.4.1 applies.',
  'Under Regulation 443.4.1, the default position is that SPDs shall be provided. The only route to omit them in a non-critical installation is a formal written owner declaration stating that any loss or damage is tolerable and that the owner accepts the risk. The declaration must be retained with the installation documentation and EIC.',
  'Type 1 SPDs protect against direct lightning strikes and are installed at the origin of the installation. Type 2 SPDs protect against indirect lightning and switching surges, also at the origin. Type 3 SPDs provide fine protection at individual equipment locations.',
  'Regulation 443.4.2 introduces a separate limb: where equipment is likely to produce switching overvoltages or disturbances — such as variable-frequency drives, large motors, or power factor correction capacitors — protection against those overvoltages shall be considered regardless of the Reg 443.4.1 assessment.',
  'SPDs must be coordinated with the upstream protective device (MCB or fuse). The SPD manufacturer specifies the maximum recommended backup fuse or MCB rating. If the SPD is installed after the main switch but before the RCD, the disconnection of the SPD backup fuse does not affect the rest of the installation.',
];

const faqs = [
  {
    question: 'When are SPDs required under BS 7671?',
    answer:
      'Under Regulation 443.4 (A4:2026), SPDs shall be provided without further assessment where the consequence of an overvoltage could: (a) result in serious injury or loss of human life; (b) interrupt public services or damage cultural heritage; (c) interrupt commercial or industrial activity; or (d) affect a large number of co-located individuals. For all other installations, Regulation 443.4.1 applies: SPDs shall be provided by default. The only route to omit them is a formal written owner declaration stating that any loss or damage is tolerable and that the owner accepts the risk of equipment damage and consequential loss. That declaration must be retained with the installation documentation. There is no longer a cost/benefit test as the operative compliance mechanism — omission requires the owner declaration route.',
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
          BS 7671:2018+A4:2026 redrafted Chapter 44 and Section 443, fundamentally changing how SPD
          need is determined. The old AQ lightning-density criteria no longer apply. Instead,
          protection is required based on the consequence of an overvoltage event — with four
          mandatory categories (Reg 443.4) and a default-on rule for all other installations (Reg
          443.4.1) that can only be set aside by a formal owner declaration. In practice, this means
          SPDs are required for the vast majority of new installations. This guide explains the
          regulatory framework, SPD types, installation methods, and the practical and commercial
          implications.
        </p>
      </>
    ),
  },
  {
    id: 'regulation-443',
    heading: 'Regulation 443 — When SPDs Are Required',
    content: (
      <>
        <p>
          Regulation 443.4 sets out four categories where SPDs <strong>shall</strong> be provided
          with no further assessment required. These are mandatory regardless of installation type:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CloudLightning className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>(a) Mandatory — risk to life:</strong> SPDs shall be provided where an
                overvoltage could result in serious injury or loss of human life. This includes
                medical locations, safety services (fire alarms, emergency lighting), and
                installations where equipment failure could endanger people.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CloudLightning className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>(b) Mandatory — public services and heritage:</strong> SPDs shall be
                provided where an overvoltage could interrupt public services or cause damage to
                cultural heritage. This covers essential public infrastructure and structures or
                items of cultural significance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CloudLightning className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>(c) Mandatory — commercial or industrial activity:</strong> SPDs shall be
                provided where an overvoltage could result in interruption of commercial or
                industrial activity. This directly applies to shops, offices, factories, and any
                premises where supply loss or equipment damage from a transient would have material
                commercial consequences.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CloudLightning className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>(d) Mandatory — large numbers of co-located individuals:</strong> SPDs shall
                be provided where an overvoltage could affect a large number of co-located
                individuals — for example, hotels, schools, residential care homes, and sports
                venues.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For all installations not covered by (a) to (d) above, Regulation 443.4.1 applies — see
          the section below on the owner declaration mechanism.
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
          For all installations not caught by the four mandatory categories in Regulation 443.4,
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
          Note: the AQ lightning-density criteria (lightning flash density, overhead vs underground
          supply) that were used under previous editions no longer form part of the compliance
          decision. A4:2026 removed them from Section 443 entirely.
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
              board. Typical discharge capacity is 20 to 40kA. Type 2 SPDs clamp the supply voltage
              to a safe level (typically below 1500V) within nanoseconds of the surge arriving. For
              most domestic installations, a Type 2 SPD at the consumer unit provides adequate
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
              capacity but clamp the voltage to a very low level (below 800V). They are installed
              within 5 metres of the equipment being protected — either as plug-in adapters, built
              into socket outlets, or as dedicated modules near sensitive equipment. Type 3 SPDs are
              used in addition to (not instead of) Type 1 or Type 2 devices. They mop up residual
              surges that the upstream SPD did not fully clamp.
            </p>
          </div>
        </div>
        <p>
          For combined protection, the SPDs must be coordinated. A Type 2 device at the consumer
          unit handles the bulk of the surge energy, and a Type 3 device at the equipment provides
          fine clamping. The cable distance between Type 2 and Type 3 must be at least 5 metres (or
          an inductance decoupling device must be used) to ensure correct energy sharing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-base mb-3">
            Overvoltage Categories (Table 443.2) and Voltage Protection Level (Reg 534.4.8)
          </h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            Equipment is classified into four overvoltage categories (I–IV) with corresponding
            required rated impulse voltages (Uw) from Table 443.2. At 230/400 V nominal, the
            required values are: Category I = 1.5 kV (sensitive electronics, protected equipment);
            Category II = 2.5 kV (appliances, tools, most domestic equipment); Category III = 4 kV
            (distribution boards, switchgear, cables); Category IV = 6 kV (origin of installation,
            metering equipment, overhead line apparatus).
          </p>
          <p className="text-white text-sm leading-relaxed">
            Regulation 534.4.8 Note 2 recommends that the voltage protection level (Vp) of a
            selected SPD should not exceed{' '}
            <strong>80% of the equipment's required rated impulse voltage</strong> for overvoltage
            category II (2.5 kV at 230/400 V). This gives a recommended maximum Vp of 2.0 kV for
            protecting most domestic and commercial equipment. The figures of 1.5 kV (Type 3) and
            below 2.5 kV (Type 2) cited by manufacturers correspond to this framework — not
            arbitrary marketing claims.
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
          consumer unit change, rewire, and new installation should include SPD provision.
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
      heroSubtitle="Under BS 7671:2018+A4:2026, SPDs are required by default for most installations — omission requires a formal written owner declaration. This guide explains the Reg 443.4 mandatory categories, the Reg 443.4.1 owner declaration mechanism, SPD types, installation, and the commercial case for your customers."
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
