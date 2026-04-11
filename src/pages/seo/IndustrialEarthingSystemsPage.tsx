import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Shield,
  AlertTriangle,
  Settings,
  Zap,
  FileCheck2,
  Activity,
  Cpu,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Industrial Guides', href: '/industrial-electrical-installation' },
  { label: 'Industrial Earthing Systems', href: '/industrial-earthing-systems' },
];

const tocItems = [
  { id: 'earthing-system-types', label: 'Earthing System Types' },
  { id: 'tn-s-industrial', label: 'TN-S for Industrial Premises' },
  { id: 'tn-c-s-industrial', label: 'TN-C-S (PME) Considerations' },
  { id: 'tt-industrial', label: 'TT Systems in Industry' },
  { id: 'supplementary-bonding', label: 'Supplementary Equipotential Bonding' },
  { id: 'emc-earthing', label: 'EMC Earthing for Electronic Equipment' },
  { id: 'lightning-protection', label: 'Lightning Protection Integration (BS EN 62305)' },
  { id: 'measurement-testing', label: 'Measurement and Testing' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'TN-S (Protective Earth and Neutral separated throughout) is the preferred earthing system for large industrial premises because it provides a low-impedance earth path and avoids stray currents on the protective conductor.',
  'TN-C-S (PME) introduces multiple earth references along the combined PEN conductor — in industrial premises with significant single-phase loads this can create hazardous touch voltages on exposed metalwork under PEN conductor failure.',
  'TT systems (earth electrode only, no metallic connection to the supply earthing) require RCDs on all circuits and a low earth electrode resistance (typically less than 200 Ω for 30 mA RCD protection).',
  'Supplementary equipotential bonding in process areas (compressor rooms, switchrooms, chemical plant) connects all simultaneously accessible metal parts to the same potential, reducing touch voltage to safe levels even under fault conditions.',
  'EMC earthing (star-point earthing for electronic equipment, separate analogue and digital earth bars) must be integrated with the main protective earthing system — they cannot be independent floating references in most industrial installations.',
  'Lightning protection systems (LPS) designed to BS EN 62305 must be bonded to the main earth bar; the SPD (surge protective device) installation at the main distribution board is also part of the integrated earthing strategy.',
];

const faqs = [
  {
    question: 'What is the difference between TN-S and TN-C-S earthing in an industrial context?',
    answer:
      'In a TN-S system, the protective earth (PE) conductor and the neutral (N) conductor are kept separate throughout the installation. The transformer neutral is earthed at the substation, and a separate PE conductor is run to all equipment. This is the safest arrangement for industrial premises as there are no stray currents on the PE conductor and no risk of the PE becoming live if the neutral conductor fails. In a TN-C-S (PME) system, the supply cable uses a combined PEN conductor (earth and neutral in one conductor). At the point of entry to the premises, PEN is separated into PE and N. The risk in TN-C-S is that if the PEN conductor fails upstream, the neutral terminal in the installation rises to line voltage — any metalwork connected to PE becomes live at line voltage. This is a particular concern in industrial premises with large unbalanced single-phase loads.',
  },
  {
    question: 'When is a TT earthing system required for an industrial installation?',
    answer:
      'A TT earthing system (using an earth electrode with no metallic connection to the supply earth) is used where the DNO cannot provide an earth terminal (common in rural areas), where a private HV/LV transformer is used and the designer chooses to create a separate TT earth, or where the installer wants to avoid the risks associated with TN-C-S PME earthing (e.g., in agricultural premises or marinas where the BS 7671 Appendix 11 prohibition of PME applies). TT systems require RCD protection on all circuits and a sufficiently low earth electrode resistance to ensure disconnection time requirements are met (Ra × IΔn ≤ 50 V).',
  },
  {
    question: 'What is supplementary equipotential bonding and when is it required?',
    answer:
      'Supplementary equipotential bonding (SEB) connects all simultaneously accessible extraneous conductive parts (metal pipework, structural steelwork, machinery frames, cable trays) to the main protective conductor, ensuring they are all at the same potential. BS 7671 Regulation 415.2 requires SEB where the automatic disconnection requirements cannot be met within the required time, or where touch voltage could exceed 50 V under fault conditions. In industrial process areas, SEB is commonly required in: switchrooms and motor control centres, compressor rooms, chemical process areas with conductive pipework, and anywhere that the earth fault loop impedance is high enough that disconnection time cannot be guaranteed within limits.',
  },
  {
    question: 'What is star-point earthing for electronic equipment and why does it matter?',
    answer:
      'Star-point (radial) earthing connects each item of electronic equipment back to a single common earth reference point using individual earth conductors that radiate like spokes from the central point. This prevents earth return currents from one piece of equipment flowing through the earth connections of adjacent equipment, which would create voltage differences and introduce noise into sensitive circuits. Star-point earthing is recommended for PLC systems, power quality analysers, instrumentation, and communications equipment. It must ultimately connect to the main earthing terminal of the installation — it cannot be a floating separate earth, which would be dangerous and non-compliant with BS 7671.',
  },
  {
    question: 'How does lightning protection integrate with the electrical earthing system?',
    answer:
      'BS EN 62305-3 (Lightning Protection — Physical damage to structures) requires the lightning protection system (LPS) earth termination network to be bonded to all other earthing systems in and around the structure, including the electrical installation main earth bar, structural steelwork, water and gas pipework entry points, and telecommunications cable screens. The purpose is to ensure that when a lightning strike current flows, all earthed metalwork in the building rises to the same potential simultaneously — preventing dangerous potential differences (side flash) between the LPS and nearby conductive parts. Surge protective devices (SPDs) at the main distribution board are also required to protect equipment from conducted lightning surges entering via the supply cables.',
  },
  {
    question: 'What earth electrode resistance values are required for industrial installations?',
    answer:
      'The required earth electrode resistance depends on the earthing system and the fault protection method. For TT systems: Ra × IΔn ≤ 50 V, where Ra is the electrode resistance and IΔn is the RCD operating current. With a 30 mA RCD, Ra must be ≤ 1667 Ω (in practice aim for less than 200 Ω for safety margin). For lightning protection: BS EN 62305-3 recommends less than 10 Ω for each earth termination electrode, with interconnection of all electrodes to achieve the lowest practicable overall resistance. For functional earthing of electronic equipment, the lower the impedance the better — typically aim for less than 1 Ω at power frequency. Earth electrode resistance is measured using a four-terminal earth resistance test set (fall-of-potential method).',
  },
  {
    question: 'What test equipment is needed for industrial earthing system testing?',
    answer:
      'The principal instruments required are: an earth resistance tester (4-terminal Wenner method or 3-terminal fall-of-potential method) for measuring earth electrode resistance; a clamp-type earth resistance tester (non-disruptive method for testing electrodes that cannot be disconnected from the system); a loop impedance tester with a high current output (typically 20–25 A) for measuring earth fault loop impedance in industrial premises with low loop impedance; a phase rotation meter for confirming phase sequence; and a power quality analyser for measuring neutral-to-earth voltage (which indicates stray currents or earthing problems in TN-C-S systems). All instruments must be calibrated and used in accordance with BS EN 61557 (Electrical safety in low-voltage distribution systems).',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/transformer-installation-guide',
    title: 'Transformer Installation Guide',
    description:
      'Oil-filled vs dry-type transformers, DNO notification, commissioning, and maintenance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/generator-installation-guide',
    title: 'Generator Installation Guide',
    description: 'Standby generators, ATS, DNO requirements, earthing, and load bank testing.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/plc-electrical-installation',
    title: 'PLC Electrical Installation',
    description: 'Panel design, I/O wiring, earthing for noise immunity, and cable segregation.',
    icon: Cpu,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-installation-certificate',
    title: 'Electrical Installation Certificate',
    description:
      'Complete EICs on your phone and export PDF instantly for industrial installations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'earthing-system-types',
    heading: 'Earthing System Types in UK Industrial Premises',
    content: (
      <>
        <p>
          The earthing system defines how the supply source (transformer neutral or generator
          neutral) is connected to earth, and how exposed conductive parts of equipment are
          connected to earth. BS 7671 adopts the IEC system of designations using two-letter codes.
          Understanding which earthing system is in use is fundamental to designing fault
          protection, selecting protective devices, and ensuring safety in industrial premises.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>TN-S</strong> — Terre-Neutre Séparé. The supply neutral is earthed at the
                source (transformer). A separate protective earth (PE) conductor, independent of the
                neutral, is provided throughout the installation. Preferred for large industrial
                premises with private HV/LV substation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>TN-C-S</strong> — Terre-Neutre Combiné-Séparé. The supply uses a combined
                PEN conductor (protective and neutral combined). At the point of entry to the
                premises (or at the main distribution board), PEN is separated into PE and N. Also
                known as PME (Protective Multiple Earthing) in the UK. The most common system for
                DNO-supplied commercial premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT</strong> — Terre-Terre. The supply neutral is earthed at the source, but
                the installation earth uses a local earth electrode with no metallic connection to
                the supply earth. Used in agricultural premises, marinas, caravan sites, and rural
                installations where PME is prohibited or unavailable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IT</strong> — Isolé-Terre. The supply is not connected to earth (isolated
                neutral). Used in medical locations (operating theatres, cardiac care) and some
                marine applications. A first fault does not cause disconnection, but an insulation
                monitoring device (IMD) must be fitted to detect the first fault.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'tn-s-industrial',
    heading: 'TN-S Earthing for Industrial Premises',
    content: (
      <>
        <p>
          TN-S is the preferred earthing system for large industrial premises operating their own
          HV/LV substation. With a private transformer, the installer has control over the earthing
          arrangement and can provide a clean, low-impedance TN-S earth without the complications of
          PME. The transformer neutral is connected to an earth electrode at the substation, and a
          copper PE conductor of adequate size is run from the main earth bar to all distribution
          boards and equipment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth conductor sizing</strong> — BS 7671 Regulation 543.1 requires the
                protective conductor to be sized in accordance with Table 54.7 (adiabatic equation)
                or Table 54.2 (simplified method). For industrial supply cables, the PE conductor is
                typically 50–300 mm² copper depending on the phase conductor size and the expected
                fault current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main earth bar (MEB)</strong> — all earthing conductors, bonding conductors,
                and protective conductors must terminate at a single main earthing terminal (MET).
                The MET is connected to the transformer neutral earth via the main protective
                conductor. The MET must be accessible for testing and clearly labelled.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main protective bonding</strong> — all extraneous conductive parts entering
                the building (water pipes, gas pipes, structural steelwork, air conditioning
                pipework, compressed air lines) must be connected to the MET with main bonding
                conductors. Size per BS 7671 Table 54.8 — typically 10 mm² copper minimum for
                domestic, 25 mm² or more for industrial.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrode design</strong> — the substation earth electrode must achieve a
                resistance low enough to ensure fault current is sufficient for protective device
                operation. For TN-S, the electrode resistance contributes to the earth fault loop
                impedance; this must not be so high that disconnection times exceed BS 7671
                requirements.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'tn-c-s-industrial',
    heading: 'TN-C-S (PME) Considerations in Industrial Premises',
    content: (
      <>
        <p>
          TN-C-S (PME) is the DNO's standard earthing arrangement for most UK commercial and
          industrial premises supplied at LV. The DNO connects the cable PEN conductor to earth at
          multiple points along the distribution network and provides an earthing terminal (the DNO
          earth) at the cut-out. PME is convenient but introduces specific risks in industrial
          premises that the designer must address.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>PEN conductor failure risk</strong> — if the PEN conductor fails between the
                last earth connection and the premises, the installation neutral floats to line
                voltage. All metalwork connected to the PME earth becomes live at line voltage.
                Unbalanced single-phase loads in industrial premises can cause significant neutral
                current — increasing the risk of PEN conductor failure through overloading or
                corrosion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Where PME is prohibited</strong> — BS 7671 Appendix 11 prohibits the use of
                PME earthing in agricultural premises, caravan parks, marinas, and locations
                accessible to livestock. In these locations, a TT earthing system with local earth
                electrode must be used.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mitigation measures</strong> — where PME is used in industrial premises with
                large unbalanced loads, consider: monitoring the neutral-to-earth voltage (alarm if
                it exceeds 10 V, which indicates stray neutral current on the PE conductor);
                ensuring all three-phase loads are balanced; limiting the proportion of single-phase
                load; and considering a private earth electrode as a supplementary earth in addition
                to the DNO PME earth.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'tt-industrial',
    heading: 'TT Systems in Industrial Premises',
    content: (
      <>
        <p>
          TT systems use a local earth electrode to provide the installation earth with no metallic
          connection back to the supply transformer neutral. This avoids the risk of PME PEN
          conductor failure, but introduces the challenge of achieving a sufficiently low earth
          electrode resistance and the requirement for RCD protection on all circuits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD requirement</strong> — BS 7671 Regulation 411.5.2 requires that in TT
                systems, the product Ra × IΔn ≤ 50 V, where Ra is the sum of resistances of the
                earth electrode and protective conductor, and IΔn is the residual operating current
                of the RCD. In practice, RCDs must be fitted on all circuits in a TT system to
                ensure the 50 V safety criterion is met.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode installation</strong> — for TT systems in industrial
                premises, deep driven rod electrodes (typically 1.2–2.4 m copper-clad steel rods, or
                sectional rods driven to 6 m or more in high-resistivity soil) or ring electrodes
                are used. In high-resistivity ground (chalk, rock), chemical earth electrodes or
                deep bore electrodes may be required to achieve adequate resistance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrode resistance testing</strong> — earth electrode resistance must be
                measured at installation and periodically thereafter using the three-terminal
                fall-of-potential method (BS EN 61557-5). The test must be carried out with any test
                spikes at a sufficient distance from the electrode to avoid interference. Results
                should be recorded and trended over time.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'supplementary-bonding',
    heading: 'Supplementary Equipotential Bonding in Process Areas',
    content: (
      <>
        <p>
          In industrial process areas, multiple items of plant and pipework are simultaneously
          accessible. Under earth fault conditions, touch voltages between different items of plant
          can exceed safe limits unless supplementary equipotential bonding is provided. BS 7671
          Regulation 415.2 permits supplementary bonding as an alternative to achieving automatic
          disconnection within the required time.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What to bond</strong> — all simultaneously accessible extraneous conductive
                parts: process pipework (steam, water, chemical), structural steelwork, vessel
                frames, conveyor structures, cable tray/ladder, and exposed conductive parts of
                equipment. Bonding must be to the protective conductor of the circuit supplying the
                equipment (not to a remote earth point).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conductor sizing</strong> — supplementary bonding conductors must meet the
                requirement of BS 7671 Regulation 415.2.2: the resistance R of the bonding conductor
                must satisfy R ≤ 50 V / Ia, where Ia is the operating current of the protective
                device. In practice, supplementary bonding conductors in industrial premises are
                typically 4–16 mm² copper, mechanically protected (clipped or in conduit) and
                labelled "Safety Electrical Connection — Do Not Remove".
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulating flanges</strong> — process pipework sometimes incorporates
                insulating flanges (dielectric unions) to prevent galvanic corrosion. If insulating
                flanges are present, the electrical bonding strategy must be reviewed — bonding
                across insulating flanges may defeat their purpose, and the earthing of pipework on
                each side of the flange must be considered separately.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'emc-earthing',
    heading: 'EMC Earthing for Electronic Equipment',
    content: (
      <>
        <p>
          Electronic equipment (PLCs, VFDs, power analysers, SCADA systems, instrumentation)
          requires a low-impedance, low-noise earth reference for correct operation. Standard safety
          earthing (which may carry noise currents from contactors, VFDs, and other equipment) is
          often not suitable as a signal reference without additional measures. BS EN 61000-5-2
          provides guidance on earthing and cabling in installations for EMC.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Star-point earthing</strong> — each item of electronic equipment has its own
                earth conductor running directly back to a central earth reference bar (star point).
                The star point connects to the main earth bar via a single low-impedance conductor.
                No earth currents from one piece of equipment can flow through the earth of another.
                This is the preferred topology for sensitive analogue instrumentation and PLC
                systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Separate analogue earth bar</strong> — in panels containing both power
                electronics and precision analogue instrumentation, use a separate analogue earth
                bar connected to the main earth bar at a single point. VFD earth currents and
                contactor switching transients on the main earth bar do not then flow through the
                analogue earth reference.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable screen earthing</strong> — screen conductors of signal cables (4–20
                mA, 0–10 V, fieldbus) must be terminated at the panel end using 360° EMC cable
                glands bonded to the panel EMC earth bar. This drains high-frequency induced noise
                from the cable screen to earth. Screens must remain continuous and must not be
                pigtailed (pigtail connections have high inductance at RF and are ineffective above
                a few MHz).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not a floating earth</strong> — EMC star-point earthing must ultimately
                connect to the main earthing terminal of the installation. A completely separate
                "clean earth" that is not bonded to the safety earth is dangerous (it can rise to
                line voltage under fault conditions) and non-compliant with BS 7671 — it is NOT an
                acceptable arrangement regardless of what some equipment manufacturers specify.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'lightning-protection',
    heading: 'Lightning Protection Integration (BS EN 62305)',
    content: (
      <>
        <p>
          Lightning protection systems (LPS) must be bonded to all other earthing systems in the
          structure. BS EN 62305-3 (Lightning Protection — Physical damage to structures and life
          hazard) is the UK standard for structural lightning protection. BS EN 62305-4 covers
          electrical and electronic systems within structures. The integrated earthing strategy must
          satisfy both standards.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth termination network bonding</strong> — the LPS earth electrode ring
                (or system of rods) must be connected to the electrical installation main earth bar,
                structural steelwork foundation earth, and all other earthing systems at a single
                point (or at multiple points via the ring conductor). BS EN 62305-3 requires earth
                electrodes to be interconnected where practicable to reduce the overall earth
                resistance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipotential bonding at service entry points</strong> — all metallic
                services entering the structure (power cables, water pipes, gas pipes, data cables,
                CCTV cables) must be bonded to the LPS at their point of entry into the structure.
                This prevents step voltages inside the building when a lightning current flows
                through the earth. SPDs (Surge Protective Devices) are used for conductors that
                cannot be directly bonded (live power conductors, data cables without earthed
                screen).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SPD installation at MDB</strong> — BS EN 62305-4 and BS 7671 Section 534
                require SPDs at the main distribution board (Type 1 or combined Type 1+2) where the
                building has a lightning protection system or is in an exposed location. SPDs must
                be connected between each line conductor and earth with the shortest possible lead
                lengths (ideally less than 0.5 m total). SPD earth connections must be to the main
                earth bar, not to a local earth electrode.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LPS design and risk assessment</strong> — BS EN 62305-2 provides the risk
                assessment methodology for determining whether an LPS is required and what level of
                protection (LPL I to LPL IV) is needed. LPS design and installation is specialist
                work — all LPS installations should be designed and inspected by a competent
                lightning protection engineer (ATLAS registered or equivalent).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'measurement-testing',
    heading: 'Measurement and Testing of Industrial Earthing Systems',
    content: (
      <>
        <p>
          The Electricity at Work Regulations 1989 require that earthing systems are maintained in a
          condition to prevent danger. This requires periodic measurement and testing. BS EN 61557
          series covers electrical safety measurement methods for low-voltage distribution systems,
          including earthing measurements. Test records must be retained.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth fault loop impedance testing</strong> — measured using a loop
                impedance tester at each distribution board and at selected final circuits. Verify
                that the measured Zs allows the protective device to operate within the required
                disconnection time (0.4 s for socket outlets, 5 s for fixed equipment in TN
                systems). Record Zs values and compare with calculated maximum permissible Zs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode resistance measurement</strong> — four-terminal fall-of-
                potential method (BS EN 61557-5). Current and voltage spikes driven into the ground
                at specified distances from the electrode under test. Results sensitive to season
                (higher in dry summer), so test in dry conditions and record soil conditions.
                Alternatively use a clamp meter method for in-service testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance measurement</strong> — phase-to-earth IR testing (500
                VDC for LV circuits) verifies insulation integrity. Deteriorating IR values indicate
                moisture ingress or insulation degradation. Trend results over successive tests.
                Very low IR values indicate an earth leakage path that may cause nuisance RCD
                tripping or fire risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Neutral-to-earth voltage monitoring</strong> — in TN-C-S (PME) installations
                with large unbalanced loads, measure the neutral-to-earth voltage at the main
                distribution board under maximum loading conditions. Voltage above 10 V indicates
                significant neutral current flowing on the PE conductor — this should be
                investigated and corrected to prevent nuisance tripping and potential hazard.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Industrial Earthing Certification',
    content: (
      <>
        <p>
          Industrial earthing system installation and testing is high-value work that requires
          specialist knowledge. All new earthing installations and major modifications require an
          Electrical Installation Certificate. Periodic inspections of industrial electrical
          installations (typically every 3–5 years) require an Electrical Installation Condition
          Report (EICR), which must include{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            observation codes
          </SEOInternalLink>{' '}
          for any earthing deficiencies found.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICs and EICRs on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-installation-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to record earth fault loop impedance test results, electrode resistance values,
                  insulation resistance measurements, and bonding details on your phone during the
                  inspection. Export a professional PDF certificate before you leave the site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Industrial earthing system certification with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for industrial EIC and EICR completion, earthing test records, and instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function IndustrialEarthingSystemsPage() {
  return (
    <GuideTemplate
      title="Industrial Earthing Systems UK | Factory Earthing Guide"
      description="Complete guide to industrial earthing systems in the UK. TN-S, TN-C-S (PME), and TT systems for factories and process plant — supplementary bonding, EMC earthing, lightning protection integration to BS EN 62305, and testing methods."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Industrial Guide"
      badgeIcon={Shield}
      heroTitle={
        <>
          Industrial Earthing Systems UK:{' '}
          <span className="text-yellow-400">Factory Earthing Guide</span>
        </>
      }
      heroSubtitle="Comprehensive guide to industrial earthing systems in the UK — TN-S, TN-C-S (PME), and TT earthing for factories and process plant, supplementary equipotential bonding, EMC star-point earthing for electronic equipment, lightning protection integration to BS EN 62305, and earthing measurement and testing methods."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Industrial Earthing Systems"
      relatedPages={relatedPages}
      ctaHeading="Complete Industrial Electrical Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC and EICR completion, earthing test records, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
