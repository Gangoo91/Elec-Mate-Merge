import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Car,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Zap,
  Cable,
  GraduationCap,
  ClipboardCheck,
  Info,
  Calculator,
  Plug,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Section 722 EV Charging', href: '/guides/section-722-ev-charging-complete-guide' },
];

const tocItems = [
  { id: 'overview', label: 'Section 722 Overview' },
  { id: 'dedicated-circuit', label: 'Dedicated Circuit Requirements' },
  { id: 'rcd-protection', label: 'RCD Types and Selection' },
  { id: 'earthing', label: 'Earthing and PME Restrictions (722.411.4.1)' },
  { id: 'pme-solutions', label: 'PME Solutions and Earth Electrodes' },
  { id: 'load-management', label: 'Load Management and Demand' },
  { id: 'cable-selection', label: 'Cable Selection and Sizing' },
  { id: 'external-influences', label: 'External Influences and IP Ratings' },
  { id: 'testing', label: 'Testing and Certification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Section 722 of BS 7671:2018+A3:2024 requires a dedicated circuit for each EV charging point, protected by an appropriate RCD.',
  'Regulation 722.411.4.1 restricts the use of PME (TN-C-S) earthing for EV charging — an earth electrode or other permitted arrangement is required where the charging point is outdoors or in a location accessible to livestock.',
  'A Type A RCD is the minimum for Mode 3 EV charging equipment with integral DC leakage protection. Where the charger does not have integral DC leakage detection, a Type B RCD is required.',
  'Load management (smart charging) is essential where the existing supply cannot support the additional EV charging demand without exceeding the supply capacity.',
  'The IET Code of Practice for Electric Vehicle Charging Equipment Installation provides detailed guidance supplementing BS 7671 Section 722.',
];

const faqs = [
  {
    question: 'Why can I not use the PME earth for an outdoor EV charger?',
    answer:
      'Regulation 722.411.4.1 restricts the use of PME (Protective Multiple Earthing, i.e. TN-C-S) earthing for EV charging installations where the charging equipment is outdoors or accessible from outside the equipotential zone of the building. The concern is that a loss of the PEN conductor (combined neutral and earth) in the DNO supply cable would cause the exposed-conductive-parts of the EV charger — and the vehicle connected to it — to rise to a dangerous potential relative to true earth. Because the vehicle is in contact with the ground (via its tyres, and the user is standing on the ground), this creates a shock risk that the building main bonding cannot mitigate. The solution is to install a local earth electrode (TT arrangement for the EV circuit) or use one of the other permitted methods in the IET Code of Practice, such as an earth mat or protective earth connection to a structural earth.',
  },
  {
    question: 'Do I need a Type B RCD for every EV charger?',
    answer:
      'Not necessarily. If the EV charging equipment has built-in DC fault detection (as most Mode 3 smart chargers now do), a Type A RCD is sufficient. The charger manufacturer documentation will state whether the unit includes DC leakage detection to 6mA. If the charger does NOT include DC leakage protection, a Type B or Type B+ RCD is required per Regulation 722.531.3.101. Type B RCDs are significantly more expensive, so specifying a charger with integral DC detection is the cost-effective approach. Always check the charger manufacturer data sheet and installation manual.',
  },
  {
    question: 'What cable size do I need for a 7.4kW EV charger?',
    answer:
      'A 7.4kW single-phase EV charger draws approximately 32A. The cable must be sized for continuous load at 32A, accounting for the installation method, ambient temperature, grouping with other cables, and voltage drop. For a typical domestic installation using 6mm² twin and earth (6242Y) clipped direct (Reference Method C), the maximum cable run is approximately 26m before voltage drop exceeds 5%. For longer runs or less favourable installation methods, 10mm² cable may be required. SWA (steel wire armoured) cable is commonly used for outdoor runs — 4mm² SWA is sufficient for most domestic 7.4kW installations up to about 30m. Use a cable sizing calculator to verify for your specific installation conditions.',
  },
  {
    question: 'Is EV charger installation Part P notifiable work?',
    answer:
      'Yes. Installing a new circuit for an EV charger is notifiable work under Part P of the Building Regulations (England and Wales). It must be either self-certified through a competent person scheme (NICEIC, NAPIT, ELECSA, etc.) or notified to Building Control before work begins. The Building Regulations also require compliance with the infrastructure requirements of Part S (applicable to new dwellings and buildings undergoing material change of use), which mandates EV charging provision.',
  },
  {
    question: 'Can I install two EV chargers on one circuit?',
    answer:
      'No. Regulation 722.312 requires each EV charging point to be supplied by its own dedicated final circuit from the distribution board. Two chargers require two circuits, each with their own overcurrent protection and RCD. This ensures that a fault on one charger does not affect the other and allows independent control of each charging point. For multiple chargers, a load management system is usually essential to avoid exceeding the supply capacity.',
  },
  {
    question: 'What earth electrode resistance is acceptable for an EV charger TT circuit?',
    answer:
      'The earth electrode resistance must be low enough to ensure automatic disconnection within the required time. For a TT installation protected by a 30mA RCD, the maximum earth electrode resistance (Ra) is calculated as Ra x I Delta n is no greater than 50V. With a 30mA RCD: 50V / 0.03A = 1,667 ohms maximum. In practice, a resistance below 200 ohms is considered good, and the IET Code of Practice recommends achieving as low a resistance as reasonably practicable. The electrode must be tested and the result recorded on the EIC.',
  },
  {
    question: 'Do I need to notify the DNO when installing an EV charger?',
    answer:
      'Yes, in most cases. If the EV charger is rated above 13.8kW (single-phase) or the total installation demand including the charger exceeds the rating of the supply fuse, the DNO must be notified. Even for standard 7.4kW domestic chargers, the DNO (or their agent) should be notified under the Electricity Safety, Quality and Continuity Regulations. Many DNOs have online notification forms. Smart chargers that comply with the Electric Vehicles (Smart Charge Points) Regulations 2021 are a legal requirement for domestic installations and include built-in demand management.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description: 'Practical step-by-step guide to installing domestic and commercial EV chargers.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for EV charger circuits with automatic voltage drop checking.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/iet-code-of-practice-ev',
    title: 'IET Code of Practice EV',
    description: 'Overview of the IET Code of Practice for Electric Vehicle Charging.',
    icon: Info,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete EV charger Electrical Installation Certificates on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/ev-charger-certificate',
    title: 'EV Charger Certificate',
    description: 'Purpose-built certificate for EV charging equipment installation.',
    icon: Plug,
    category: 'Certificate',
  },
  {
    href: '/training/ev-charging-course',
    title: 'EV Charging Course',
    description: 'Study the IET Code of Practice with structured training modules.',
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
    heading: 'Section 722: Electric Vehicle Charging Installations',
    content: (
      <>
        <p>
          Section 722 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          sets out the particular requirements for the supply of electric vehicles. With the UK
          government mandate to phase out new petrol and diesel car sales, EV charger installation
          has become one of the fastest-growing areas of electrical work.
        </p>
        <p>
          Section 722 covers Mode 2 (portable charger plugged into a domestic socket — not
          recommended for regular use), Mode 3 (dedicated wall-mounted or post-mounted charger with
          control pilot), and Mode 4 (DC rapid charger — typically commercial). Most domestic and
          small commercial installations are Mode 3.
        </p>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/iet-code-of-practice-ev">
            IET Code of Practice for Electric Vehicle Charging Equipment Installation
          </SEOInternalLink>{' '}
          supplements Section 722 with detailed practical guidance on earthing arrangements, cable
          selection, load management, and commissioning. Both documents should be read together.
        </p>
      </>
    ),
  },
  {
    id: 'dedicated-circuit',
    heading: 'Dedicated Circuit Requirements',
    content: (
      <>
        <p>
          Regulation 722.312 requires that each EV charging point is supplied by its own dedicated
          final circuit. This means a separate MCB or RCBO at the distribution board for each
          charger, with no other loads sharing that circuit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-phase 7.4kW</strong>: the standard domestic charger. 32A dedicated
                circuit, Type A or Type B RCD (depending on charger specification), earth electrode
                where PME supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-phase 3.6kW</strong>: used where the supply is limited or load
                management reduces the charge rate. 16A circuit, same RCD and earthing requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase 11kW or 22kW</strong>: commercial and some domestic
                installations. Requires a three-phase supply and 16A or 32A three-phase circuit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The circuit must be designed as a continuously-rated load — EV charging can run for hours
          at the full rated current. No diversity can be applied to a single EV charger circuit.
        </p>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Types and Selection',
    content: (
      <>
        <p>
          Regulation 722.531.3.101 requires appropriate RCD protection for EV charging circuits. The
          type of RCD depends on the charger design:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Charger WITH DC Detection</h3>
            <p className="text-white text-sm leading-relaxed">
              If the EV charger has built-in DC fault current detection (to 6mA), a Type A RCD
              (30mA) is sufficient. Most modern Mode 3 smart chargers include this feature. Check
              the manufacturer data sheet for confirmation. This is the most common and
              cost-effective arrangement.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Charger WITHOUT DC Detection</h3>
            <p className="text-white text-sm leading-relaxed">
              If the charger does not include DC fault detection, a Type B or Type B+ RCD is
              required. Type B RCDs detect both AC and DC residual currents. They are significantly
              more expensive than Type A (often over 10 times the cost), which is why chargers with
              integral DC detection are strongly preferred.
            </p>
          </div>
        </div>
        <p>
          The RCD must be rated at 30mA for additional protection. A Type AC RCD must not be used
          for EV charging circuits — the minimum is Type A. Using a Type AC RCD could fail to detect
          DC-component fault currents from the vehicle charger electronics, creating a shock risk.
        </p>
      </>
    ),
  },
  {
    id: 'earthing',
    heading: 'Earthing and PME Restrictions: Regulation 722.411.4.1',
    content: (
      <>
        <p>
          Regulation 722.411.4.1 is the most significant requirement in Section 722 and the one that
          causes the most confusion. It restricts the use of PME (TN-C-S) earthing for EV charging
          installations.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">The PME Problem</h3>
          <p className="text-white text-sm leading-relaxed mb-4">
            Most UK domestic supplies are TN-C-S (PME). The combined PEN conductor in the DNO supply
            cable serves as both neutral and earth. If the PEN conductor breaks (open PEN fault),
            all metalwork connected to the PME earth rises to a dangerous voltage relative to true
            earth. Inside the building, the main bonding creates an equipotential zone — so the
            person touching a radiator and a metal socket faceplate is protected because both are at
            the same potential.
          </p>
          <p className="text-white text-sm leading-relaxed">
            An EV charger installed outside the building (on a driveway, in a car port, or on an
            external wall) is outside this equipotential zone. A person standing on the ground while
            touching the vehicle being charged could receive a shock from the voltage difference
            between the PME earth and true earth. This is why Regulation 722.411.4.1 requires
            additional earthing measures.
          </p>
        </div>
        <p>
          The regulation requires that where the EV charger is connected to a PME supply and the
          charging point is accessible from outside the main equipotential zone, an earth electrode
          must be provided, or one of the alternative arrangements described in the IET Code of
          Practice must be used.
        </p>
      </>
    ),
  },
  {
    id: 'pme-solutions',
    heading: 'PME Solutions and Earth Electrodes',
    content: (
      <>
        <p>
          The IET Code of Practice for Electric Vehicle Charging Equipment Installation describes
          several approaches to satisfy Regulation 722.411.4.1:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode (TT for EV circuit)</strong>: install a local earth rod and
                connect it to the EV charger circuit protective conductor. The charger circuit
                operates as TT, protected by a 30mA RCD. The main installation remains TN-C-S. This
                is the most common solution.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protective earth connection to structural earth</strong>: where the building
                has a suitable structural earth (foundation earth electrode, steel-framed building),
                this can be used as the earth for the EV circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth mat</strong>: a conductive mat installed beneath the standing area
                where the user connects the vehicle, bonded to the charger earth. This ensures the
                user and the charger are at the same potential. Less common in domestic work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Charger with PEN fault detection</strong>: some modern chargers include
                integral PEN fault detection that disconnects the supply if a PEN conductor failure
                is detected. Where fitted, the PME earth may be used directly. Check the charger
                manufacturer documentation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For TN-S supplies (separate neutral and earth from the DNO), the PME restriction does not
          apply because there is no PEN conductor. For existing TT supplies, the charger circuit
          uses the existing TT earth arrangement. Always verify the earthing system type before
          designing the EV charger circuit.
        </p>
      </>
    ),
  },
  {
    id: 'load-management',
    heading: 'Load Management and Demand',
    content: (
      <>
        <p>
          A 7.4kW EV charger adds 32A of continuous load to the installation. The typical UK
          domestic supply is 60A or 80A (100A in newer properties). Adding an EV charger to a
          property with an electric shower (40A), electric cooker (30A), and other loads can easily
          exceed the supply capacity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum demand assessment</strong>: before installing an EV charger, assess
                the maximum demand of the existing installation (using diversity per the IET On-Site
                Guide) and verify that the supply can support the additional load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart charging</strong>: the Electric Vehicles (Smart Charge Points)
                Regulations 2021 require that domestic EV chargers must be "smart" — capable of
                responding to signals to shift charging to off-peak periods. This is a legal
                requirement, not optional.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dynamic load management</strong>: a CT clamp on the meter tails monitors the
                total installation demand in real time. The charger reduces its charge rate when
                other loads are high and increases it when demand drops. This avoids exceeding the
                supply fuse rating.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the maximum demand assessment shows the supply is insufficient even with load
          management, the DNO must be contacted to request a supply upgrade before installation.
        </p>
      </>
    ),
  },
  {
    id: 'cable-selection',
    heading: 'Cable Selection and Sizing',
    content: (
      <>
        <p>
          The cable for an EV charger circuit must be sized for a continuously-rated 32A load (for
          7.4kW) with appropriate correction factors applied:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SWA cable</strong>: steel wire armoured cable is the standard choice for
                outdoor runs (driveway, garage, car port). 4mm² 3-core SWA is typically suitable for
                runs up to 30m at 32A. The SWA armour provides the circuit protective conductor
                (cpc). SWA must be correctly terminated with glands at both ends.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Twin and earth</strong>: 6mm² twin and earth (6242Y) is suitable for
                internal runs (Reference Method C) up to approximately 26m. For longer runs or
                clipped to a surface outdoors, 10mm² may be required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage drop</strong>: BS 7671 limits voltage drop to 5% for lighting and 5%
                for other uses (from the origin of the installation). For a 32A circuit, voltage
                drop must be checked carefully on longer runs. Use the{' '}
                <SEOInternalLink href="/tools/voltage-drop-calculator">
                  voltage drop calculator
                </SEOInternalLink>{' '}
                to verify.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Size EV charger cables instantly"
          description="Elec-Mate's cable sizing calculator handles SWA and twin-and-earth for EV charger circuits. Enter the charger rating, cable run, and installation method for instant results."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'external-influences',
    heading: 'External Influences and IP Ratings',
    content: (
      <>
        <p>
          EV chargers installed outdoors are subject to environmental conditions that affect
          equipment selection and cable routing:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP rating</strong>: outdoor EV chargers must be rated at least IP54
                (protection against dust ingress and water splashing from any direction). Most
                commercial EV chargers are rated IP54 or IP65 as standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mechanical protection</strong>: chargers on driveways or car parks must be
                protected against vehicle impact. Bollards or a raised plinth are common solutions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable burial depth</strong>: underground SWA cable must be buried at a
                minimum depth of 500mm (600mm under roads) and protected by cable tiles or ducting.
                Route markers should be installed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'testing',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>
          The EV charger installation must be tested and certified in accordance with BS 7671. The
          testing includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Continuity of protective conductors (including SWA armour if applicable)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Insulation resistance (500V DC, minimum 1 megohm)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Polarity verification</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Earth electrode resistance (where a local earth electrode is installed for TT
                arrangement)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Earth fault loop impedance (Zs) — note the maximum Zs for TT with 30mA RCD
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>RCD operation (x1 and x5 rated residual current, plus ramp test)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Functional test — verify the charger communicates with the vehicle and charges
              </span>
            </li>
          </ul>
        </div>
        <p>
          An <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> must be issued.
          The certificate should note the earthing arrangement used for the EV circuit (particularly
          if a local earth electrode is installed on a PME supply), the RCD type, and the earth
          electrode resistance. Many installers also complete a specific{' '}
          <SEOInternalLink href="/tools/ev-charger-certificate">
            EV charger certificate
          </SEOInternalLink>{' '}
          alongside the EIC.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Growing Your EV Business',
    content: (
      <>
        <p>
          EV charger installation is a high-demand market with strong margins. A typical domestic
          installation is worth £800 to £1,500 for the electrical work (excluding the charger unit).
          To install EV chargers, you need competence in the IET Code of Practice for Electric
          Vehicle Charging (often delivered as a one-day course) and registration with a competent
          person scheme for Part P self-certification.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing for EV Circuits</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size SWA and twin-and-earth cables for EV charger circuits with the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Automatic voltage drop check and derating for burial depth and ambient
                  temperature.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EV Certificates on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the EIC and EV charger certificate on site. Record earth electrode
                  resistance, RCD test results, and charger details. Instant PDF to the customer.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify EV charger installations"
          description="Join 1,000+ UK electricians using Elec-Mate for EV charger cable sizing, professional quoting, and on-site certification. 7-day free trial."
          icon={Car}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function Section722EVChargingGuidePage() {
  return (
    <GuideTemplate
      title="Section 722 EV Charging | BS 7671 Electric Vehicle Charging Guide"
      description="Complete guide to Section 722 of BS 7671 — EV charger dedicated circuits, RCD types, PME earthing restrictions (722.411.4.1), earth electrodes, load management, and cable selection for UK electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulation Guide"
      badgeIcon={Car}
      heroTitle={
        <>
          Section 722 EV Charging:{' '}
          <span className="text-yellow-400">Complete BS 7671 Electric Vehicle Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about EV charger installations under BS 7671 Section 722. Dedicated circuits, RCD selection, PME earthing restrictions under Regulation 722.411.4.1, earth electrodes, load management, and cable sizing."
      readingTime={20}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Section 722 EV Charging"
      relatedPages={relatedPages}
      ctaHeading="Size Cables and Certify EV Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EV charger cable sizing, quoting, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
