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
  { id: 'risk-assessment', label: 'The Risk Assessment (443.4)' },
  { id: 'spd-types', label: 'Type 1, Type 2 and Type 3 SPDs' },
  { id: 'installation', label: 'Installing SPDs at the Consumer Unit' },
  { id: 'coordination', label: 'Coordination with Protective Devices' },
  { id: 'cost-benefit', label: 'Cost vs Benefit Analysis' },
  { id: 'insurance', label: 'Insurance Implications' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Chapter 44 of BS 7671 covers protection against overvoltage caused by atmospheric origin (lightning) and switching overvoltages. Amendment 2 introduced the requirement for a risk assessment to determine whether SPDs (Surge Protection Devices) are needed.',
  'Regulation 443.4 requires that where the consequence of an overvoltage includes risk to human life (for example, in medical locations or safety services) or affects installations with public services or cultural heritage, SPDs shall be provided. For all other installations, a risk assessment determines whether SPDs are required.',
  'In practice, following the Amendment 2 risk assessment, SPDs are required for the vast majority of new domestic installations. The cost of equipment that could be damaged by a transient overvoltage (smart home systems, IT equipment, appliances with electronic controls) almost always exceeds the cost of installing SPDs.',
  'Type 1 SPDs protect against direct lightning strikes and are installed at the origin of the installation. Type 2 SPDs protect against indirect lightning and switching surges, also at the origin. Type 3 SPDs provide fine protection at individual equipment locations.',
  'SPDs must be coordinated with the upstream protective device (MCB or fuse). The SPD manufacturer specifies the maximum recommended backup fuse or MCB rating. If the SPD is installed after the main switch but before the RCD, the disconnection of the SPD backup fuse does not affect the rest of the installation.',
];

const faqs = [
  {
    question: 'When are SPDs required under BS 7671?',
    answer:
      'Under Regulation 443.4, SPDs are required where the consequence of an overvoltage event includes risk to human life, affects public services or cultural heritage, or affects commercial or industrial installations where business continuity is critical. For all other installations (including domestic), a risk assessment is carried out to determine whether the cost of the potential damage from an overvoltage event exceeds the cost of installing SPDs. In practice, the risk assessment almost always concludes that SPDs are required for new domestic installations because the value of electronic equipment in a modern home (smart TVs, computers, broadband routers, smart home systems, electronic white goods) significantly exceeds the cost of an SPD (approximately 50 to 150 pounds for the device plus installation time).',
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
            BS 7671:2018+A3:2024
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
          Amendment 2 to BS 7671 (2022) significantly strengthened the overvoltage protection
          requirements by introducing a risk assessment process (Regulation 443.4) that, in
          practice, means SPDs are now required for the majority of new installations. This guide
          explains the risk assessment, SPD types, installation methods, and the practical and
          commercial implications.
        </p>
      </>
    ),
  },
  {
    id: 'regulation-443',
    heading: 'Regulation 443 — When SPDs Are Required',
    content: (
      <>
        <p>Regulation 443.4 sets out the circumstances under which SPDs must be provided:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CloudLightning className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory — risk to life:</strong> SPDs shall be provided where an
                overvoltage could result in serious injury or loss of human life. This includes
                medical locations, safety services (fire alarms, emergency lighting), and
                installations where equipment failure could endanger people.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CloudLightning className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory — public services and heritage:</strong> SPDs shall be provided
                where an overvoltage could affect public services, telecommunications, or cultural
                heritage structures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CloudLightning className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Risk assessment — all other installations:</strong> For all other
                installations (including standard domestic and commercial), a risk assessment shall
                be carried out. If the risk assessment determines that the cost of damage from an
                overvoltage event exceeds the cost of providing SPDs, then SPDs shall be installed.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The risk assessment is not optional — it is a mandatory step. Even if you decide not to
          install SPDs, you must document the risk assessment and justify the decision. In practice,
          the outcome nearly always favours installing SPDs, which is why the industry has moved
          strongly towards SPDs as standard in new installations.
        </p>
      </>
    ),
  },
  {
    id: 'risk-assessment',
    heading: 'The Risk Assessment (Regulation 443.4)',
    content: (
      <>
        <p>
          The risk assessment compares the cost of potential damage from a transient overvoltage
          against the cost of installing SPDs. The assessment considers:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lightning density</strong> — the number of lightning flashes per square
                kilometre per year in the area. The UK average is approximately 0.5 to 1 flash per
                square kilometre per year, but this varies by region (higher in the south and east
                of England, lower in Scotland).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply type</strong> — overhead supply lines are more exposed to
                lightning-induced surges than underground cables. Rural properties with overhead
                lines are at higher risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Value of equipment at risk</strong> — the replacement cost of electronic
                equipment in the installation. In a modern domestic installation, this typically
                includes: smart TV (500 to 2000 pounds), computer/laptop (500 to 2000 pounds),
                broadband router (100 pounds), smart home hub (200 pounds), electronic white goods
                (1000 to 3000 pounds), boiler electronics (200 to 500 pounds), and EV charger
                electronics (200 to 500 pounds). Total: 2,700 to 8,200 pounds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost of SPD installation</strong> — a Type 2 SPD module costs 50 to 150
                pounds for the device, plus a 32A MCB for backup protection, plus installation time
                (approximately 30 to 60 minutes). Total installed cost: approximately 100 to 250
                pounds.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When the value of equipment at risk (2,700 pounds and above) is compared to the cost of
          SPD installation (100 to 250 pounds), the outcome is clear. For any installation with
          electronic equipment worth more than the cost of the SPD (which is virtually every modern
          home), SPDs are required.
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm">
              <strong>Document the assessment:</strong> Whether you install SPDs or not, the risk
              assessment must be documented. Record it on the EIC or as a separate document. If you
              decide not to install SPDs (for example, in an agricultural outbuilding with no
              electronic equipment), the risk assessment provides the justification.
            </p>
          </div>
        </div>
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
              <p>Installation time: 30 to 60 minutes</p>
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
      description="Complete guide to Chapter 44 of BS 7671 — overvoltage protection and SPD requirements. Risk assessment under Regulation 443.4, Type 1/2/3 SPDs, installation at consumer unit, coordination with protective devices, cost vs benefit analysis, and insurance implications."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulation Deep-Dive"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Chapter 44: <span className="text-yellow-400">Overvoltage and SPD Requirements</span>
        </>
      }
      heroSubtitle="SPDs are now required for most new installations following the Amendment 2 risk assessment. This guide explains when SPDs are needed, the three types, how to install and coordinate them, and the cost/benefit case for your customers."
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
