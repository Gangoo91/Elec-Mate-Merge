import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Settings,
  Info,
  ClipboardCheck,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Wiring Guides', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'UK Earthing Systems Guide', href: '/earthing-systems-guide' },
];

const tocItems = [
  { id: 'what-is-earthing', label: 'What Is an Earthing System?' },
  { id: 'tns', label: 'TN-S — Separate Neutral and Protective' },
  { id: 'tncs', label: 'TN-C-S — PME Combined then Split' },
  { id: 'tt', label: 'TT — Earth Electrode System' },
  { id: 'pme-limitations', label: 'PME Conditions and Limitations' },
  { id: 'ev-charging', label: 'Earthing Systems and EV Charging' },
  { id: 'outbuildings', label: 'Outbuildings, Caravans and TT' },
  { id: 'earth-loop-impedance', label: 'Earth Loop Impedance Differences' },
  { id: 'identifying', label: 'Identifying the Earthing System' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The earthing system type determines how fault current returns to the source and directly affects earth loop impedance, disconnection times, and the type of protective measures required.',
  'TN-S systems have separate neutral (N) and protective earth (PE) conductors throughout — typically found in older properties served by concentric wiring or properties with a separate earth terminal at the cut-out.',
  'TN-C-S (PME) systems combine N and PE in the network (PEN conductor) and split them at the consumer\'s installation — the most common system in the UK, supplied by the DNO\'s PME terminal.',
  'TT systems use a local earth electrode — required for outbuildings, caravans, marinas, and any installation where the PME earth terminal is not available or suitable.',
  'PME earthing must not be extended to outbuildings, caravans, static caravans, or locations accessible to livestock due to the risk of dangerous touch voltages under open-circuit neutral conditions.',
  'EV charge points require specific earthing considerations — TN-C-S supplies need a PME earth electrode system or PME earthing prohibition check; TT supplies may require an earth electrode at the charge point.',
];

const faqs = [
  {
    question: 'What is the difference between TN-S and TN-C-S earthing?',
    answer:
      'In a TN-S system, the neutral conductor (N) and the protective earth conductor (PE) are separate throughout the entire network, from the transformer to the consumer\'s installation. The installation earth terminal connects to a dedicated PE conductor. In a TN-C-S system (commonly called PME — Protective Multiple Earthing), the neutral and protective earth are combined as a single PEN conductor in the distribution network. At the consumer\'s installation, the PEN conductor is split into separate N and PE conductors. TN-C-S is now the most common system for new domestic connections in the UK.',
  },
  {
    question: 'What is PME earthing and why does it have limitations?',
    answer:
      'PME (Protective Multiple Earthing) is the earthing arrangement used in TN-C-S systems. The distribution network\'s combined PEN conductor is connected to earth at multiple points (at the substation and at consumers\' installations). The consumer\'s installation earth is taken from the DNO\'s PME terminal. The limitation of PME arises from the risk of a broken neutral: if the PEN conductor breaks upstream of the consumer, the consumer\'s earth terminal — and everything connected to it — can rise to line voltage potential relative to true earth. This is why PME earthing must not be extended to locations where people or livestock might simultaneously contact the PME earth and true earth (outbuildings, caravans, swimming pools, marinas).',
  },
  {
    question: 'When is a TT earthing system required?',
    answer:
      'A TT system (where the installation earth is provided by a local earth electrode rather than the DNO\'s earth terminal) is required in several situations: where the DNO cannot provide a PME terminal; for outbuildings that are separate structures; for caravans and static caravans; for marinas and caravan parks; for agricultural premises where livestock may contact earthed equipment; and for any installation where extending PME earthing would create an unacceptable risk. The installation of a TT system requires a suitable earth electrode (usually a copper earth rod) and RCD protection to ensure disconnection times are achieved given the typically higher earth loop impedance.',
  },
  {
    question: 'Why is earth loop impedance (Zs) different between TN-S and TT systems?',
    answer:
      'Earth loop impedance (Zs) is the impedance of the fault current loop from the source, through the protective conductors, through the fault, and back to the source. In TN-S and TN-C-S systems, the fault current returns via low-impedance metallic conductors, resulting in Zs values typically in the range of 0.1 to 1.0 ohms. In TT systems, the fault current returns via the soil between the installation earth electrode and the DNO\'s substation earth. Soil impedance is much higher — TT system Zs values are typically 20 to 200 ohms or more. This high impedance means overcurrent devices (MCBs/fuses) cannot reliably clear faults, which is why TT systems always require RCD protection for disconnection.',
  },
  {
    question: 'How do I identify which earthing system I have?',
    answer:
      'The most reliable method is to check the DNO\'s supply head (cut-out). A TN-S supply will have a separate earth terminal and neutral terminal at the cut-out, with the earth connection going to the PE conductor. A TN-C-S (PME) supply will have a PME earth terminal clearly marked, usually with a label. A TT supply will have no DNO-provided earth terminal — the installation will have its own earth electrode, typically an earth rod driven into the ground near the consumer unit. You can also contact the DNO to confirm the supply type for a specific address.',
  },
  {
    question: 'Can I extend PME earthing to my garden building?',
    answer:
      'No. PME earthing must not be extended to outbuildings, garden offices, sheds, garages (that are separate structures), or any building that is a separate structure from the main property. This is not merely best practice — it is a requirement of the Electricity Safety, Quality and Continuity Regulations 2002 and is reinforced by BS 7671. The outbuilding must be supplied via a TT system using its own earth electrode, or via an insulating separation supply, or via a separation supply. The supply cable between the main building and outbuilding must have no metallic armour or screen connected to the main building\'s earth.',
  },
  {
    question: 'What earthing arrangement is required for EV charge points?',
    answer:
      'EV charge point earthing depends on the supply earthing system. For TN-C-S (PME) supplies, BS 7671 18th Edition requires either: an earth electrode at the charge point location that provides a combined PME and electrode earthing arrangement (to limit touch voltage if the neutral is lost), or confirmation that the charge point has an integral protective measure against loss of earth (some devices provide this automatically). For TT supplies, the charge point must be on the TT earth system. The specific requirements are detailed in the EV charging regulations section of BS 7671 and the relevant IET Code of Practice for Electric Vehicle Charging Equipment Installation.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/bonding-conductors-guide',
    title: 'Bonding Conductors Guide',
    description: 'Main and supplementary bonding — sizing, routing and when it can be omitted.',
    icon: Settings,
    category: 'Guide',
  },
  {
    href: '/rcd-types-guide',
    title: 'RCD Types UK Guide',
    description: 'RCCB, RCBO, SRCD and RCDM explained with BS 7671 requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR requirements, compliance deadlines, and common defects.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-earthing',
    heading: 'What Is an Earthing System?',
    content: (
      <>
        <p>
          An earthing system is the arrangement by which the electrical installation is connected
          to earth (the general mass of the earth) to ensure that exposed metallic parts of
          equipment and the installation are maintained at earth potential under fault conditions.
          Earthing provides a low-impedance path for fault current to flow, enabling protective
          devices (MCBs, fuses, RCDs) to operate and disconnect the supply before dangerous
          voltages or temperatures develop.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection against electric shock</strong> — if a live conductor contacts
                exposed metalwork (a fault to earth), the earthing system ensures fault current
                flows via the protective conductor rather than through a person who touches the
                metalwork. The fault current is high enough to operate the protective device quickly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection against fire</strong> — by ensuring rapid disconnection of
                earth faults, the earthing system limits the duration and magnitude of arcing that
                could ignite surrounding materials.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 classification</strong> — BS 7671 18th Edition classifies earthing
                systems using a two or three-letter code based on IEC 60364 standards. The letters
                describe the relationship between the supply source and earth, and the relationship
                between the installation's exposed conductive parts and earth.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The three earthing system types used in UK public electricity supply installations are
          TN-S, TN-C-S, and TT. Each has different characteristics affecting earth loop impedance,
          the types of protective measures required, and restrictions on where the earthing
          arrangement can be extended.
        </p>
      </>
    ),
  },
  {
    id: 'tns',
    heading: 'TN-S — Separate Neutral and Protective Conductors',
    content: (
      <>
        <p>
          In a TN-S system, the supply source (transformer) has one point directly earthed, and the
          exposed conductive parts of the installation are connected to that earth point via a
          protective conductor (PE) that is entirely separate from the neutral conductor (N). The
          two conductors are separate throughout the entire network.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Where it is found</strong> — TN-S is increasingly rare in new UK
                installations. It is typically found in older properties served by concentric wiring
                (where the outer sheath of the service cable acts as the PE), in properties with
                an armoured service cable where the armouring is used as the PE, and in some
                industrial and commercial installations with dedicated earth conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Identification</strong> — at the DNO cut-out, a TN-S supply will have
                separate earth and neutral terminals. The earth terminal is connected to the
                cable's metallic sheath or armour rather than the neutral conductor. The neutral
                and earth are not bonded together at the cut-out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth loop impedance</strong> — TN-S systems typically have Zs values in
                the range of 0.1 to 0.8 ohms at the consumer's installation, depending on the
                cable length and cross-sectional area. This relatively low impedance means MCBs
                and fuses can reliably clear earth faults within the required disconnection times.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Degradation risk</strong> — in concentric wiring systems, the outer sheath
                (PE conductor) can corrode over time. This is an important inspection point during
                EICRs on older properties — a corroded sheath increases Zs and may compromise the
                effectiveness of overcurrent device tripping under fault conditions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'tncs',
    heading: 'TN-C-S — PME (Protective Multiple Earthing)',
    content: (
      <>
        <p>
          In a TN-C-S system, the neutral and protective earth are combined as a single PEN
          (Protective Earth and Neutral) conductor in the distribution network. At the consumer's
          installation, the PEN conductor is split into separate N and PE conductors. This
          arrangement is called Protective Multiple Earthing (PME) and is by far the most common
          earthing system for new domestic connections in the UK.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DNO PME terminal</strong> — the DNO provides a combined N/E terminal at
                the cut-out, usually labelled "PME Earth Terminal" or marked with the combined
                N/PE symbol. The installation's main earthing terminal and the neutral are both
                connected to this terminal and bonded together within the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Low earth loop impedance</strong> — TN-C-S systems typically have Zs values
                of 0.1 to 0.6 ohms, similar to TN-S. This allows MCBs and fuses to clear earth
                faults reliably. RCDs are required for additional protection on specified circuits
                (socket outlets, etc.) but are not the primary means of earth-fault disconnection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open-circuit neutral risk</strong> — the critical limitation of PME is that
                if the PEN conductor breaks upstream of the consumer, the consumer's earth terminal
                can rise to line voltage. Everything connected to the installation's earth — exposed
                metalwork, bonded pipework — becomes live relative to true earth. This is the reason
                for the restrictions on extending PME to certain locations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'tt',
    heading: 'TT — Earth Electrode System',
    content: (
      <>
        <p>
          In a TT system, the installation's earth is provided by a local earth electrode (typically
          a copper earth rod driven into the ground) that is entirely independent of the DNO's
          neutral. The supply source is earthed at the substation, but the consumer's installation
          has no metallic connection to that earth — fault current must return via the soil.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Where it is required</strong> — TT is required for outbuildings (separate
                structures), caravans, static caravans, caravan parks, marinas, agricultural
                premises, and any location where PME earthing is prohibited or the DNO cannot
                provide an earth terminal. Some rural properties on overhead supply lines may also
                have TT systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>High earth loop impedance</strong> — because fault current returns via soil
                rather than a metallic conductor, Zs values on TT systems are typically 20 to 200
                ohms or higher, depending on soil type, moisture content, and electrode design.
                At these impedances, overcurrent devices (MCBs) cannot operate within the required
                disconnection times — RCD protection is mandatory on TT systems for this reason.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode testing</strong> — the earth electrode resistance must be
                measured during installation and at each EICR. The electrode resistance (Ra) in
                ohms multiplied by the RCD rating (IΔn) in amps must not exceed 50V, per BS 7671.
                For a 30mA RCD: Ra × 0.03 ≤ 50, meaning Ra must not exceed approximately 1,667 ohms
                — achievable with a well-installed electrode, though lower is always better.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>No bonding to main building's earth</strong> — where a TT outbuilding is
                fed from a TN-C-S main building, the supply cable must have no metallic armour or
                screen connected to the main building's earth. An SWA cable's armouring must be
                isolated at the outbuilding end, or an XLPE/LSF cable in plastic conduit used.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pme-limitations',
    heading: 'PME Conditions and Limitations',
    content: (
      <>
        <p>
          The Electricity Safety, Quality and Continuity Regulations 2002 (ESQCR) and BS 7671 both
          place restrictions on where PME earthing can and cannot be extended. These limitations
          exist because of the open-circuit neutral risk inherent in TN-C-S systems.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outbuildings</strong> — PME earthing must not be extended to a structure
                that is a separate building from the main installation. Even a detached garage
                requires a TT supply or an alternative protective measure. This is one of the most
                commonly misunderstood requirements in domestic electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Caravans and mobile homes</strong> — PME earthing is prohibited for caravan
                supplies. Static caravans and touring caravans require TT supplies with RCD
                protection. The caravan industry standard (BS EN 60309 / BS 7671 Part 7) reflects
                this requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Livestock locations</strong> — agricultural premises where livestock have
                access to earthed metalwork must not use PME earthing. Animals are more susceptible
                to electric shock than humans (lower body resistance, multiple contact points)
                and may receive dangerous touch voltages under PME open-neutral conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Marinas and boatyards</strong> — shore supply to boats must use TT or
                isolation transformer supplies. Extending PME to marina pontoons creates stray
                current corrosion and touch-voltage risks.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ev-charging',
    heading: 'Earthing Systems and EV Charging',
    content: (
      <>
        <p>
          EV charge points have specific earthing requirements that depend on the installation's
          earthing system. BS 7671 18th Edition and the IET Code of Practice for Electric Vehicle
          Charging Equipment Installation both address these requirements in detail.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TN-C-S (PME) supplies</strong> — an earth electrode must be installed at
                the charge point location, bonded to the charge point's earth terminal, to provide
                a combined PME/electrode earthing arrangement. This limits the touch voltage to a
                safe level if the neutral is lost. Alternatively, charge points with integral
                protective measures against loss-of-earth (including automatic disconnection) may
                be used without an additional electrode, subject to the device's documentation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT supplies</strong> — the charge point must be on the TT earth system.
                A Type A or Type B RCD must protect the charge point circuit. The earth electrode
                resistance must be verified to ensure the RCD trip condition (Ra × IΔn ≤ 50V)
                is met.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD type for EV circuits</strong> — EV charge point circuits require a
                Type A or Type B RCD (not Type AC) because the charging electronics can produce
                pulsating DC residual currents that Type AC RCDs cannot detect reliably.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'outbuildings',
    heading: 'Outbuildings, Caravans and TT Earthing',
    content: (
      <>
        <p>
          Supplying a separate outbuilding (garden office, garage, workshop, studio) is one of the
          most common domestic electrical jobs that requires a TT earthing system. Getting the
          earthing arrangement wrong is one of the most common and dangerous errors in this type
          of work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth rod installation</strong> — the earth rod should be driven vertically
                into the ground to a sufficient depth to achieve adequate electrode resistance
                (typically 1.2m or more, with multiple rods or horizontal electrodes where
                soil resistance is high). The rod must be accessible for testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply cable selection</strong> — use a cable with no metallic sheath
                or armour connected to the main building's earth terminal. An unarmoured cable
                in a protective conduit, or an SWA cable with the armouring isolated at the
                outbuilding end, are both acceptable. Never connect SWA armouring to both the
                main building's PME earth and the outbuilding's TT earth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection mandatory</strong> — all circuits in TT outbuildings must
                be protected by RCDs because the high earth loop impedance prevents MCBs from
                clearing earth faults within required times. An RCCB or RCBOs at the outbuilding
                distribution board is essential.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification</strong> — an outbuilding supply installation is notifiable
                work requiring an Electrical Installation Certificate (EIC). The test results must
                include electrode resistance measurement, Zs for each circuit, and RCD test results.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earth-loop-impedance',
    heading: 'Earth Loop Impedance Differences Between Systems',
    content: (
      <>
        <p>
          Earth loop impedance (Zs) is the total impedance of the fault current loop and is
          fundamental to determining whether protective devices will operate within the required
          disconnection time under fault conditions. The earthing system has a major influence
          on Zs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>TN-S and TN-C-S</strong> — Zs is typically 0.1 to 1.0 ohm for final
                circuits. Low Zs means high fault current, which reliably trips MCBs within 0.4
                seconds (for circuits up to 32A) or 5 seconds (for distribution circuits). RCDs
                are not needed as the primary means of disconnection, but are required for
                additional protection on specified circuit types.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT systems</strong> — Zs is typically 20 to 200 ohms or more. At these
                impedances, a phase-to-earth fault would produce only 1.2 to 12 amperes of fault
                current — far below the trip threshold of any MCB or fuse. RCDs are therefore
                the primary means of disconnection in TT systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Impact on EICR assessment</strong> — measured Zs values must be compared
                against the maximum Zs values in BS 7671 Appendix 3 for the specific protective
                device. A TT system's Zs values will always appear extremely high in absolute
                terms but are acceptable because RCD protection is confirmed to operate correctly
                at those impedances.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'identifying',
    heading: 'Identifying the Earthing System on Site',
    content: (
      <>
        <p>
          Correctly identifying the earthing system is an essential step before carrying out any
          electrical installation work or EICR. Misidentifying the earthing system can lead to
          incorrect protective measures being specified.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the cut-out and meter</strong> — the supply head (cut-out) and meter
                cabinet usually show the earthing arrangement. A clearly labelled PME terminal
                indicates TN-C-S. A separate earth terminal connected to cable sheath or armour
                indicates TN-S. No DNO earth terminal indicates TT.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contact the DNO</strong> — for certainty, contact the Distribution Network
                Operator (Western Power Distribution, UK Power Networks, Northern Powergrid, etc.)
                and request confirmation of the earthing system for the specific address. This is
                the most reliable method and is particularly important for commercial installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check previous certificates</strong> — the earthing system should be
                recorded on previous EICRs and EICs for the property. However, always verify
                physically — the system may have changed or been recorded incorrectly.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Earthing System Documentation',
    content: (
      <>
        <p>
          The earthing system must be correctly identified and documented on the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> and{' '}
          <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink>. Errors in
          earthing system identification are among the most consequential mistakes on electrical
          certificates, as they affect the interpretation of all Zs measurements and the
          assessment of protective device adequacy.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Record Earthing System on Certificate</h4>
                <p className="text-white text-sm leading-relaxed">
                  The earthing system type (TN-S, TN-C-S, TT) must be recorded on the EIC or
                  EICR, along with the method of earthing (DNO terminal, earth electrode, etc.)
                  and the measured earth electrode resistance where applicable. Use the
                  Elec-Mate app to complete all sections correctly with built-in guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EICRs and EICs with correct earthing system documentation"
          description="Join 430+ UK electricians using Elec-Mate for on-site EICR and EIC completion. Built-in guidance for earthing system identification, AI board scanning, and instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EarthingSystemsGuidePage() {
  return (
    <GuideTemplate
      title="UK Earthing Systems Guide | TN-S, TN-C-S, TT Systems Explained"
      description="Complete guide to UK earthing systems. TN-S, TN-C-S (PME) and TT explained with PME limitations, EV charging requirements, outbuilding supplies, earth loop impedance differences, and how to identify the earthing system on site."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Wiring Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          UK Earthing Systems Guide:{' '}
          <span className="text-yellow-400">TN-S, TN-C-S and TT Explained</span>
        </>
      }
      heroSubtitle="A complete practical guide to earthing systems used in UK electrical installations — TN-S, TN-C-S (PME) and TT explained with BS 7671 requirements, PME limitations, EV charging earthing, outbuilding supplies, and earth loop impedance differences between systems."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About UK Earthing Systems"
      relatedPages={relatedPages}
      ctaHeading="Complete Earthing Documentation Correctly on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR and EIC completion with correct earthing system documentation, AI board scanning, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
