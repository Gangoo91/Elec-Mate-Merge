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
  { label: 'Cable Selection Guide BS 7671', href: '/cable-selection-guide' },
];

const tocItems = [
  { id: 'cable-selection-overview', label: 'Cable Selection Principles' },
  { id: 'te-cable', label: 'T&E — Twin and Earth Flat Cable' },
  { id: 'swa-cable', label: 'SWA — Steel Wire Armoured Cable' },
  { id: 'micc-cable', label: 'MICC — Mineral Insulated Cable' },
  { id: 'fp200-cable', label: 'FP200 — Fire Resistant Cable' },
  { id: 'flexible-cables', label: 'SY, CY and Other Flexible Cables' },
  { id: 'current-capacity', label: 'Current-Carrying Capacity' },
  { id: 'voltage-drop', label: 'Voltage Drop' },
  { id: 'mechanical-protection', label: 'Mechanical Protection' },
  { id: 'environment', label: 'Environmental Considerations' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Cable selection must consider four key factors: current-carrying capacity (determined by load and installation method), voltage drop (maximum 3% for lighting, 5% for other circuits from the origin of the installation), mechanical protection, and environmental conditions.',
  'Twin and Earth (T&E) flat cable is the standard for domestic final circuits in the UK — suitable for concealed or surface installation in normal environments but not for direct burial or external use without additional protection.',
  'SWA (Steel Wire Armoured) cable is the standard for underground supplies, external supplies, and any installation requiring mechanical protection — the armour provides both protection and a CPC (in conjunction with a separate earth in some cases).',
  'MICC (Mineral Insulated) cable offers exceptional fire performance and is used in critical circuits (fire alarms, emergency lighting, life safety systems) where circuit integrity must be maintained during a fire.',
  'FP200 (and similar fire-resistant cables) provide circuit integrity for a specified time at defined temperatures — used for fire alarm wiring, emergency lighting, and similar applications where MICC is not specified.',
  'The installation method (clipped direct, in conduit, in trunking, buried direct) dramatically affects the current-carrying capacity of a cable — correction factors must be applied for grouping, ambient temperature, and thermal insulation.',
];

const faqs = [
  {
    question: 'What cable should I use for a domestic ring final circuit?',
    answer:
      'The standard cable for a domestic ring final circuit (socket outlets) in the UK is 2.5mm² Twin and Earth (T&E) flat cable, typically 2.5mm²/1.5mm² (2.5mm² live conductors, 1.5mm² circuit protective conductor). This is specified for a ring final circuit protected by a 32A MCB when installed in a standard domestic environment, clipped to surface or concealed in wall. Where the cable passes through or is covered by thermal insulation, the current-carrying capacity is reduced and a larger conductor size or alternative installation method may be required.',
  },
  {
    question: 'What is the difference between SWA and SY cable?',
    answer:
      'SWA (Steel Wire Armoured) cable has a rigid steel wire armour applied over the insulated cores and provides substantial mechanical protection, making it suitable for underground burial, external installations, and industrial environments. SY cable is a flexible control cable with a braided steel wire screen (not rigid armour) applied over PVC insulation. SY is used for flexible connections to machinery, control panels, and equipment that requires both flexibility and screening against electromagnetic interference. SY is not suitable for direct burial or as a fixed wiring cable in the way SWA is.',
  },
  {
    question: 'Can I use T&E cable outdoors?',
    answer:
      'Standard PVC-insulated T&E cable (grey sheath) is not suitable for direct exposure to UV light, extreme temperatures, or moisture over extended periods. For external surface-mounted wiring, either use a cable rated for outdoor use (LSF or XLPE insulated), install standard T&E in UV-resistant conduit, or use SWA cable. For underground runs, SWA cable direct-buried or XLPE-insulated cable in duct is appropriate. Never leave standard T&E exposed to sunlight as the PVC sheath degrades and becomes brittle over time.',
  },
  {
    question: 'When must I use FP200 or MICC cable?',
    answer:
      'FP200 (fire-resistant cable) or MICC (Mineral Insulated) cable must be used for circuits that need to maintain circuit integrity during a fire — primarily fire alarm circuits, emergency lighting circuits, voice alarm systems, and life safety systems. BS 5839 (fire alarm systems) specifies the cable requirements for fire alarm wiring. BS 5266 (emergency lighting) specifies requirements for emergency lighting cable. MICC is the gold standard for circuit integrity (typically 3 hours at 950°C) while FP200 provides enhanced protection (typically 1 to 2 hours at defined temperatures). The designer should specify the appropriate cable based on the building\'s fire strategy.',
  },
  {
    question: 'What does voltage drop mean and how does it affect cable selection?',
    answer:
      'Voltage drop is the reduction in voltage along a cable due to the cable\'s resistance. The greater the current, the longer the cable run, and the smaller the conductor, the greater the voltage drop. BS 7671 18th Edition limits voltage drop to 3% of the nominal supply voltage for lighting circuits (7.2V on a 230V supply) and 5% for other circuits (11.5V on a 230V supply). Excessive voltage drop causes equipment to underperform and can cause lamps and motors to run inefficiently. On long cable runs, voltage drop may require a larger conductor than the current-carrying capacity alone would dictate.',
  },
  {
    question: 'How does thermal insulation affect cable current capacity?',
    answer:
      'When T&E cable is enclosed in or covered by thermal insulation (loft insulation, wall insulation), the cable\'s ability to dissipate heat is severely restricted. BS 7671 requires significant derating of the cable\'s current-carrying capacity in these conditions. A 2.5mm² T&E clipped direct might carry 27A, but the same cable totally enclosed in thermal insulation may only carry around 10-13A, depending on the installation method. Where cable passes through insulation for short distances (≤500mm), partial derating applies. This is why cable in insulated walls or lofts must be assessed carefully, and why larger cable or a different installation route may be needed.',
  },
  {
    question: 'What is CY cable and when is it used?',
    answer:
      'CY cable is a flexible cable with a tinned copper wire braid screen applied over PVC insulation, enclosed in a clear or coloured PVC outer sheath. The braid provides electromagnetic screening (shielding) against interference. CY cable is used for instrumentation, control, and data circuits in industrial and commercial environments where electromagnetic interference (EMI) could affect signal integrity. Like SY cable, CY is not suitable for fixed wiring as a replacement for armoured cable — it is designed for flexible or semi-fixed control and instrumentation applications.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/installation-methods-guide',
    title: 'Cable Installation Methods BS 7671',
    description: 'Reference installation methods, correction factors for grouping and temperature.',
    icon: Settings,
    category: 'Guide',
  },
  {
    href: '/earthing-systems-guide',
    title: 'Earthing Systems Guide',
    description: 'TN-S, TN-C-S and TT earthing systems explained with practical examples.',
    icon: Zap,
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
    description: 'Landlord EICR requirements, compliance deadlines, and common cable defects.',
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
    id: 'cable-selection-overview',
    heading: 'Cable Selection Principles Under BS 7671',
    content: (
      <>
        <p>
          Selecting the correct cable for an electrical installation is one of the most fundamental
          skills in electrical engineering. The wrong cable can result in overheating, fire, circuit
          failure, or shock hazard. BS 7671 18th Edition provides the framework for cable
          selection, requiring the designer or installer to consider four primary factors.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Current-carrying capacity (Iz)</strong> — the cable must carry the
                design current continuously without exceeding its maximum conductor temperature.
                The tabulated current capacity (from BS 7671 Appendix 4) must be corrected for
                the actual installation method, grouping, ambient temperature, and the presence
                of thermal insulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage drop</strong> — the cable must not cause excessive voltage drop
                from the supply origin to the furthest point of the circuit. BS 7671 limits
                voltage drop to 3% for lighting and 5% for other circuits from the origin of
                the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mechanical protection</strong> — the cable must withstand the mechanical
                stresses of its installed location, including impact, abrasion, crushing, and
                rodent damage. Where the cable itself does not provide adequate mechanical
                protection, additional protective measures (conduit, trunking, armour) must
                be provided.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Environmental conditions</strong> — the cable must be suitable for the
                temperature range, UV exposure, moisture, chemicals, and other environmental
                factors of its installation location. PVC-insulated cables have a maximum
                conductor temperature of 70°C; XLPE cables are rated to 90°C; MICC cables
                can withstand temperatures up to and beyond 250°C in some configurations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These four factors interact — a cable may be adequately sized for current capacity but
          need to be increased to meet voltage drop requirements on a long run, or a cable suitable
          for current capacity may need a protective conduit to provide adequate mechanical
          protection in a workshop environment.
        </p>
      </>
    ),
  },
  {
    id: 'te-cable',
    heading: 'T&E — Twin and Earth Flat Cable',
    content: (
      <>
        <p>
          Twin and Earth (T&E) flat cable — formally called flat twin with earth cable — is the
          most widely used cable in UK domestic electrical installations. It consists of two
          PVC-insulated conductors (line and neutral) and an uninsulated circuit protective
          conductor (CPC), all encased in a grey PVC flat outer sheath.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common sizes</strong> — 1.0mm² for lighting circuits (protected by 6A
                MCB), 1.5mm² for lighting circuits where voltage drop is a concern, 2.5mm² for
                socket outlet ring final circuits (protected by 32A MCB), 4mm² and 6mm² for
                cooker circuits, 6mm² and 10mm² for electric showers and larger loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CPC sizing</strong> — in standard T&E cable, the CPC is one size smaller
                than the live conductors. For 1.0mm² live conductors, the CPC is 1.0mm² (same
                size). For 1.5mm² live conductors, the CPC is 1.0mm². For 2.5mm² live conductors,
                the CPC is 1.5mm². The CPC must be sleeved in green/yellow insulation where it
                is accessible at accessories or the consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Suitable for</strong> — surface or concealed installation in domestic and
                commercial buildings in normal environments. Not suitable for external use without
                UV protection, not suitable for direct burial, not suitable for locations with
                excessive heat, chemicals, or mechanical damage risk without additional protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal insulation</strong> — T&E passing through or covered by thermal
                insulation must be derated significantly. Where possible, route T&E cable clear
                of insulation. Where the cable must pass through insulation, ensure the conductor
                size is adequate for the derated current capacity.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'swa-cable',
    heading: 'SWA — Steel Wire Armoured Cable',
    content: (
      <>
        <p>
          Steel Wire Armoured (SWA) cable is the standard cable for underground installation,
          external supplies, sub-main distribution, and any situation where mechanical protection
          is required. The steel wire armour provides both mechanical protection and — in some
          configurations — serves as the circuit protective conductor.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Construction</strong> — SWA cable has XLPE or PVC insulated conductors
                (individual or multicore), an inner bedding, galvanised steel wire armour, and
                a PVC outer sheath. The standard sheath colour for LV cables is black; power
                distribution cables may use other colours. XLPE-insulated SWA (XLPE/SWA/PVC)
                is preferred for most new installations due to its higher temperature rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Armour as CPC</strong> — the steel wire armour can be used as the circuit
                protective conductor, but its resistance is higher than a copper conductor of
                the same cross-sectional area. The impedance of the armour must be checked against
                the adiabatic equation (S² = I²t/k²) to confirm it is adequate as a CPC for the
                circuit's fault current and disconnection time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outbuilding supplies</strong> — SWA is the standard cable for underground
                supplies to outbuildings, though the armour must not be bonded to both the main
                building's PME earth and the outbuilding's TT earth. Where a TT outbuilding is
                being supplied, either use unarmoured cable in duct or isolate the SWA armour
                at the outbuilding end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burial depth</strong> — SWA cables for direct burial should be installed
                at a depth of at least 500mm in gardens and areas unlikely to be disturbed, and
                at least 600mm in footpaths. In areas subject to traffic loading, greater depths
                or additional protection (cable tiles, warning tape) should be provided.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'micc-cable',
    heading: 'MICC — Mineral Insulated Copper Clad Cable',
    content: (
      <>
        <p>
          Mineral Insulated Copper Clad (MICC) cable — commonly called MI cable or Pyrotenax (a
          trade name) — consists of one or more copper conductors embedded in magnesium oxide
          (MgO) mineral insulation, enclosed in a seamless copper outer sheath. MICC offers
          exceptional fire performance, chemical resistance, and longevity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire performance</strong> — MICC cable maintains circuit integrity at
                temperatures up to 250°C and beyond in certain configurations, for extended
                periods during a fire. This makes it the preferred cable for fire alarm circuits,
                emergency lighting, sprinkler system controls, and other life-safety systems
                requiring the highest level of circuit integrity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Termination</strong> — MICC cable requires specialised copper compression
                pot seals at each termination to exclude moisture from the hygroscopic MgO
                insulation. Incorrect termination is the most common cause of MICC cable failure.
                Pot seals must be installed correctly and the completed termination tested for
                insulation resistance before energising.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Longevity</strong> — MICC cable has an extremely long service life — MICC
                installations from the 1950s and 1960s are still in service in many buildings.
                The copper sheath and MgO insulation do not degrade in the way PVC and XLPE
                polymers do.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost and skill requirement</strong> — MICC cable and fittings are
                significantly more expensive than PVC alternatives, and correct installation
                requires specific training and tools. Incorrect termination of MICC can result
                in low insulation resistance, moisture ingress, and eventual circuit failure.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fp200-cable',
    heading: 'FP200 and Fire-Resistant Cables',
    content: (
      <>
        <p>
          FP200 (Fire Performance 200) is a proprietary enhanced fire-resistant cable manufactured
          by Draka/Prysmian. Generic fire-resistant cables conforming to BS 7629 or BS 8434 are
          also available. These cables provide circuit integrity for a defined period at a defined
          temperature, making them suitable for fire alarm, emergency lighting, and other
          life-safety circuits where MICC is not specified.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit integrity ratings</strong> — fire-resistant cables are tested to
                specific temperature/time profiles defined in BS EN 50200 and related standards.
                FP200 Gold, for example, provides circuit integrity of 30 minutes at 930°C with
                mechanical shock. The specific rating required depends on the building's fire
                strategy and the applicable standard (BS 5839 for fire alarms, BS 5266 for
                emergency lighting).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Easier to install than MICC</strong> — FP200 and similar fire-resistant
                cables use standard cable terminations (screw terminals) and do not require
                specialised pot seals. They are therefore quicker and cheaper to install than
                MICC, while still providing enhanced fire performance over standard PVC cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Colour coding</strong> — FP200 cables are typically red-sheathed to
                distinguish them from standard wiring cables, reflecting their life-safety
                function and enabling quick identification during maintenance and inspection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'flexible-cables',
    heading: 'SY, CY and Flexible Cable Types',
    content: (
      <>
        <p>
          Flexible cables are used for connections to portable equipment, machinery with moving
          parts, and control panels. The most common types in UK industrial and commercial
          installations are SY (screened flexible cable), CY (screened flexible cable with
          tinned copper braid), and standard flexible cords.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SY cable</strong> — multi-core PVC flexible cable with galvanised steel
                wire braid screen and clear PVC outer sheath. Provides mechanical protection
                (the steel braid) and some electromagnetic screening. Used for flexible machine
                connections, control panels, and where both flexibility and mechanical protection
                are needed. Not suitable as fixed wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CY cable</strong> — similar to SY but uses tinned copper wire braid
                instead of steel, providing better electromagnetic shielding. Used for
                instrumentation, encoder, and data circuits where EMI screening is the primary
                requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rubber flexible cords</strong> — heat-resistant rubber or silicone rubber
                flexible cords are used for connections to equipment operating at elevated
                temperatures (ovens, industrial heating elements, luminaires with high-temperature
                lamps). Standard PVC flexible cord has a maximum conductor temperature of 70°C;
                heat-resistant rubber cords are rated to 85°C or higher.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'current-capacity',
    heading: 'Current-Carrying Capacity and Correction Factors',
    content: (
      <>
        <p>
          The current-carrying capacity of a cable depends on the conductor size, the cable
          construction, and critically — the installation method. BS 7671 Appendix 4 provides
          tabulated current ratings for different cable types and installation methods. These
          tabulated values must be corrected by applying the relevant correction factors before
          comparing against the design current and protective device rating.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grouping correction factor (Cg)</strong> — when multiple cables are
                installed together (in a bundle, in multi-way trunking, or clipped side by side),
                each cable reduces the heat dissipation available to its neighbours. The grouping
                correction factor reduces the tabulated current capacity accordingly. For example,
                three circuits in a bundle may require a Cg of approximately 0.7, reducing the
                effective current capacity by 30%.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ambient temperature correction (Ca)</strong> — the tabulated current
                ratings in BS 7671 assume a reference ambient temperature (typically 30°C).
                Where the installation location is hotter (roof spaces, boiler rooms, industrial
                environments), the current capacity must be reduced. Where it is cooler, the
                capacity may be increased.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal insulation correction (Ci)</strong> — cables passing through or
                enclosed in thermal insulation have severely restricted heat dissipation. A cable
                totally surrounded by thermal insulation (such as a T&E cable buried in mineral
                wool insulation) requires a reduction factor that can reduce the effective current
                capacity to less than 50% of the clipped-direct rating.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The effective current capacity (It) = tabulated rating × Ca × Cg × Ci. This must equal
          or exceed the nominal current of the protective device (In) and must be at least equal
          to the design current (Ib).
        </p>
      </>
    ),
  },
  {
    id: 'voltage-drop',
    heading: 'Voltage Drop Calculations',
    content: (
      <>
        <p>
          Voltage drop is a critical check for long cable runs, large loads, and any circuit where
          equipment performance depends on maintaining adequate supply voltage at the point of use.
          BS 7671 18th Edition sets maximum voltage drop limits from the origin of the installation
          to any point in the installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum permitted voltage drop</strong> — 3% for lighting circuits and
                5% for power/other circuits, measured from the origin of the installation (typically
                the supply terminals at the consumer unit). On a 230V supply, this equates to a
                maximum of 6.9V for lighting and 11.5V for power circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage drop formula</strong> — voltage drop (mV) = (mV/A/m) × Ib × L,
                where (mV/A/m) is the millivolt drop per ampere per metre from BS 7671 Appendix 4,
                Ib is the design current in amperes, and L is the one-way length of the cable in
                metres. For a ring final circuit, the length used is half the total ring length.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When to upsize</strong> — if the calculated voltage drop exceeds the
                limit, increase the conductor size. For example, upgrading from 2.5mm² to 4mm²
                T&E approximately halves the voltage drop per unit length. On very long runs,
                multiple steps up in conductor size may be required.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mechanical-protection',
    heading: 'Mechanical Protection Requirements',
    content: (
      <>
        <p>
          BS 7671 requires that cables are protected against mechanical damage appropriate to
          their installation environment. The cable's own construction may provide sufficient
          protection, or additional protective measures (conduit, trunking, armour) may be needed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cables in walls</strong> — BS 7671 requires cables concealed in walls at
                less than 50mm depth to be protected by earthed metallic conduit, mechanically
                robust cover, or a 30mA RCD. In practice, T&E run in designated cable zones
                (vertically above or horizontally from accessories) satisfies this requirement
                in domestic installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underground cables</strong> — cables buried underground require either
                armoured cable (SWA), or cables in protective duct, or cables with appropriate
                mechanical protection. Cable tiles and warning tape above the cable provide
                additional protection and warning during excavation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industrial and workshop environments</strong> — cables in areas subject
                to impact, chemical exposure, vehicle movement, or fork-lift traffic require
                substantial mechanical protection. SWA, metallic conduit, or cable in significant
                physical barriers (cable trays with covers, cable ducts) are appropriate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'environment',
    heading: 'Environmental Considerations for Cable Selection',
    content: (
      <>
        <p>
          The installation environment affects both the choice of cable type and the cable's
          long-term performance. Selecting a cable that is not rated for its environment leads
          to premature failure and potential safety hazards.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>UV exposure</strong> — standard PVC insulation and sheath degrades under
                prolonged UV exposure, becoming brittle and cracking. For external or roof-mounted
                cables exposed to sunlight, use XLPE-insulated cables, UV-stable LSF cables, or
                standard cables installed in UV-resistant conduit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Chemical environments</strong> — PVC is resistant to many common chemicals
                but is attacked by certain solvents, acids, and oils. In garages, workshops, and
                chemical processing environments, check the cable manufacturer's chemical
                resistance data before specifying. LSF (Low Smoke and Fume) cables may have
                different chemical resistance to standard PVC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-temperature environments</strong> — for cables near boilers, ovens,
                or industrial heat sources, select cables with appropriate temperature ratings.
                XLPE is rated to 90°C conductor temperature (versus 70°C for PVC). MICC and
                silicone rubber cables are rated for higher temperatures still.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damp and wet locations</strong> — cables in bathrooms, swimming pools,
                agricultural buildings, and other damp locations must have insulation and sheath
                materials rated for the moisture exposure level. The IP rating of the cable's
                terminations and accessories must also be appropriate for the location.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Cable Selection Documentation',
    content: (
      <>
        <p>
          Cable selection decisions must be documented on the{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>{' '}
          (EIC) and its Schedule of Test Results. The conductor size, insulation type, and
          installation method must be recorded for each circuit.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Record Cable Details on EIC</h4>
                <p className="text-white text-sm leading-relaxed">
                  For each circuit on the Schedule of Test Results, record the conductor csa,
                  insulation type, reference installation method, and any correction factors applied.
                  This information is essential for future EICR inspections to verify that the
                  cable is correctly sized for its protective device and installation conditions.
                  Use the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to complete all circuit details on site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EICs and EICRs with full cable documentation on your phone"
          description="Join 430+ UK electricians using Elec-Mate for on-site EIC and EICR completion with conductor size recording, AI board scanning, and instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CableSelectionGuidePage() {
  return (
    <GuideTemplate
      title="Cable Selection Guide BS 7671 | Choosing the Right Cable UK"
      description="Complete cable selection guide for UK electrical installations under BS 7671. T&E flat twin, SWA armoured, MICC mineral insulated, FP200 fire resistant, SY and CY flexible cables — current capacity, voltage drop, mechanical protection, and environmental considerations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Wiring Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Cable Selection Guide BS 7671:{' '}
          <span className="text-yellow-400">Choosing the Right Cable for UK Installations</span>
        </>
      }
      heroSubtitle="A complete practical guide to cable selection for UK electrical installations — T&E, SWA, MICC, FP200, SY and CY cables explained with BS 7671 current capacity requirements, voltage drop limits, mechanical protection, environmental considerations, and correction factors."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Cable Selection"
      relatedPages={relatedPages}
      ctaHeading="Document Cable Selections and Complete EICs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EIC and EICR completion with full circuit documentation, AI board scanning, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
