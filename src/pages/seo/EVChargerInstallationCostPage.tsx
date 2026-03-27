import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Calculator,
  Zap,
  FileCheck2,
  PoundSterling,
  Cable,
  GraduationCap,
  Car,
  Plug,
  ClipboardCheck,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'EV Charger Installation Cost', href: '/guides/ev-charger-installation-cost' },
];

const tocItems = [
  { id: 'overview', label: 'EV Charger Installation Overview' },
  { id: 'charger-unit-costs', label: 'Charger Unit Costs' },
  { id: 'installation-costs', label: 'Installation and Labour Costs' },
  { id: 'total-costs', label: 'Total Cost by Charger Type' },
  { id: 'section-722', label: 'Section 722 Requirements' },
  { id: 'dno-notification', label: 'DNO Notification and OZEV Grant' },
  { id: 'factors', label: 'Factors Affecting Price' },
  { id: 'for-electricians', label: 'For Electricians: Quoting EV Installations' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A domestic 7kW EV charger installation in the UK typically costs between £800 and £1,500 total, including the charger unit, installation labour, testing, and certification.',
  'BS 7671:2018+A3:2024 Section 722 governs the electrical requirements for EV charging equipment, including dedicated circuit protection, RCD type selection, and earthing arrangements.',
  'Regulation 722.411.4.1 requires careful attention to earthing arrangements for EV chargepoints, including earth electrode resistance, earth fault loop impedance limits, and PME supply restrictions where a vehicle may be connected outdoors.',
  'Regulation 722.531.101 mandates appropriate RCD protection for EV chargepoints, requiring Type A RCDs with DC fault detection capability or Type B RCDs where the charger can produce DC residual currents above 6mA.',
  'DNO notification under G98/G99 is required for all EV charger installations. The OZEV (formerly OLEV) grant scheme has been replaced by local authority schemes in most areas.',
];

const faqs = [
  {
    question: 'How much does it cost to install a 7kW EV charger at home in 2026?',
    answer:
      'A typical 7kW home EV charger installation costs between £800 and £1,500 in 2026. This includes the charger unit (£300 to £700), installation labour including cable run and consumer unit connection (£350 to £600), testing and certification (£50 to £100), and DNO notification. Straightforward installations where the charger is mounted on a garage wall close to the consumer unit are at the lower end. Longer cable runs, earthing upgrades, or consumer unit replacement push the cost higher.',
  },
  {
    question: 'What type of RCD is required for an EV charger?',
    answer:
      'BS 7671 Regulation 722.531.101 requires that EV chargepoints are protected by an appropriate RCD type. Most modern EV chargers contain internal electronics that can produce DC residual currents during charging. A Type A RCD only detects AC and pulsating DC fault currents — it cannot detect smooth DC fault currents. Therefore, either a Type B RCD (which detects DC residual currents) must be used, or the charger must have an integrated DC fault detection device (6mA DC RDC-DD) that allows it to be used with a Type A RCD. Most quality charger units (Zappi, Andersen, Wallbox, Pod Point) include integrated DC protection, allowing use of the more common and affordable Type A RCBO.',
  },
  {
    question: 'Do I need to notify the DNO when installing an EV charger?',
    answer:
      'Yes. All EV charger installations must be notified to the Distribution Network Operator (DNO) under Engineering Recommendation G98 (for single-phase domestic installations up to 16A per phase) or G99 (for three-phase or larger installations). G98 is a simple notification — the installer submits the form and can proceed. G99 requires prior approval and can take several weeks. For a standard 7kW single-phase charger drawing 32A, G98 applies. Failure to notify can result in the DNO requiring disconnection.',
  },
  {
    question: 'Is the OZEV grant still available for home EV charger installation?',
    answer:
      'The original OZEV (Office for Zero Emission Vehicles) Electric Vehicle Homecharge Scheme (EVHS) closed to homeowners in March 2022. It has been replaced by the EV chargepoint grant, which is now available only to tenants and flat owners (not homeowners in houses). The grant covers up to 75% of the installation cost, capped at £350 per installation point. Some local authorities offer additional grants or incentives. The OZEV Workplace Charging Scheme is still available for businesses, covering up to £350 per socket for up to 40 sockets.',
  },
  {
    question: 'Can I install an EV charger on a TT earthing system?',
    answer:
      'Yes, but additional precautions apply. On a TT system, the earth fault loop impedance (Zs) is typically much higher than on a TN system, which affects the disconnection time of protective devices. Regulation 722.411.4.1 requires attention to the earth electrode resistance and fault loop impedance limits. The RCBO protecting the EV circuit will need to be rated and selected to achieve disconnection within the required time at the measured Zs value. In practice, TT installations often require a dedicated earth rod for the EV charger circuit, tested to confirm adequate resistance.',
  },
  {
    question: 'What cable size is needed for a 7kW EV charger?',
    answer:
      'A 7kW single-phase EV charger draws approximately 32A. The cable must be sized for 32A continuous load with appropriate derating factors for the installation method, ambient temperature, and cable grouping. For a typical domestic installation using 6mm2 twin and earth cable (Reference Method C — clipped direct), the maximum cable run is approximately 28 metres before voltage drop becomes a concern. For longer runs, 10mm2 cable may be required. If the cable runs underground (for a detached garage, for example), SWA (steel wire armoured) cable is the standard choice.',
  },
  {
    question: 'How long does an EV charger installation take?',
    answer:
      'A straightforward domestic EV charger installation typically takes 3 to 5 hours. This includes mounting the charger, running the cable from the consumer unit, making the electrical connections, configuring the charger, testing the circuit, and completing the EIC. More complex installations — where the cable runs through multiple rooms, underground, or where the consumer unit needs upgrading — can take a full day.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'Complete technical guide to EV charger installation covering Section 722, earthing, and testing.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size the cable for your EV charger circuit with automatic derating and voltage drop checks.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Check voltage drop on long EV charger cable runs to garages and driveways.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete the Electrical Installation Certificate for EV charger installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'May need a consumer unit upgrade to add the EV charger circuit — check the requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/battery-storage-installation',
    title: 'Battery Storage Installation',
    description:
      'Pair EV charging with battery storage for smart charging and solar self-consumption.',
    icon: Plug,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'EV Charger Installation: What It Costs and What You Need to Know',
    content: (
      <>
        <p>
          Electric vehicle ownership in the UK is growing rapidly. With petrol and diesel car sales
          declining and the 2035 ban on new combustion engine vehicles approaching, installing a home
          EV charger is one of the most in-demand electrical jobs in the country. For homeowners, it
          is a practical necessity. For electricians, it is a reliable and growing revenue stream.
        </p>
        <p>
          But EV charger installation is not a simple plug-and-play job. It requires compliance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 722 (which specifically governs EV charging equipment), correct RCD type selection,
          appropriate earthing arrangements, DNO notification, and proper testing and certification.
        </p>
        <p>
          This guide breaks down every cost element — from the charger unit itself to the cable,
          labour, and certification — and explains the regulatory requirements that affect the
          installation. Whether you are a homeowner getting quotes or an electrician pricing the
          work, you will find the numbers you need here.
        </p>
      </>
    ),
  },
  {
    id: 'charger-unit-costs',
    heading: 'EV Charger Unit Costs: What the Hardware Costs',
    content: (
      <>
        <p>
          The charger unit itself is a significant portion of the total cost. Prices vary
          considerably depending on the power output, features, and brand. Here are typical 2026
          prices:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Domestic Charger Units (7kW Single-Phase)</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Budget (no-name or basic brands)</strong> — £250 to £400. These units are
                functional but may lack smart features, app control, or integrated DC protection.
                Check carefully whether a Type B RCD is needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mid-range (Zappi, Pod Point, Wallbox Pulsar)</strong> — £400 to £700. Smart
                charging, app control, solar PV diversion (Zappi), and integrated DC fault
                detection. These are the most commonly installed units in the UK.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Premium (Andersen A2, Tesla Wall Connector, Easee One)</strong> — £700 to
                £1,100. Design-led units, advanced load management, dynamic tariff integration, and
                premium build quality.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Commercial and Three-Phase Chargers</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>22kW three-phase (workplace/commercial)</strong> — £1,000 to £2,500 per
                unit. Faster charging for company fleets and workplace car parks. Requires a
                three-phase supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DC rapid chargers (50kW+)</strong> — £15,000 to £50,000+ per unit.
                Commercial installations for forecourts, service stations, and fleet depots. These
                require significant electrical infrastructure upgrades.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For most domestic installations, a mid-range 7kW charger in the £400 to £700 range
          provides the best balance of features, reliability, and value. Always check that the
          charger unit has integrated DC fault detection (6mA DC RDC-DD) — this allows use of a
          Type A RCBO instead of the more expensive Type B RCD.
        </p>
      </>
    ),
  },
  {
    id: 'installation-costs',
    heading: 'Installation and Labour Costs',
    content: (
      <>
        <p>
          The installation cost covers the electrician's labour, the cable and accessories, and the
          testing and certification. This is where the variability lies — a simple garage wall mount
          costs significantly less than a cable run across an entire house and underground to a
          detached garage.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Simple Installation</h3>
            <p className="text-white text-sm leading-relaxed">
              Charger mounted on the garage wall or house exterior, within 5 metres of the consumer
              unit. Cable run through the wall or along the surface. No consumer unit upgrade
              needed. Labour: £250 to £400. Cable and accessories: £50 to £100. Testing and EIC:
              £50 to £80.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Complex Installation</h3>
            <p className="text-white text-sm leading-relaxed">
              Longer cable run (10 to 25 metres), possibly underground in SWA cable. Consumer unit
              upgrade or new way needed. May require earthing upgrades on TT systems. Labour: £400
              to £700. Cable and accessories: £150 to £400. Consumer unit work: £150 to £400.
              Testing and EIC: £50 to £80.
            </p>
          </div>
        </div>
        <p>
          The cable itself can be a significant cost for longer runs. A 15-metre run of 6mm2 SWA
          cable costs approximately £60 to £90. A 25-metre run in 10mm2 SWA costs £120 to £180.
          Underground cable runs also require trenching and duct installation, which adds labour
          time and materials.
        </p>
        <p>
          Use the{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            cable sizing calculator
          </SEOInternalLink>{' '}
          to determine the correct cable size for your specific installation, factoring in cable
          length, installation method, ambient temperature, and grouping.
        </p>
      </>
    ),
  },
  {
    id: 'total-costs',
    heading: 'Total EV Charger Installation Cost by Type',
    content: (
      <>
        <p>
          Here are realistic total costs for EV charger installations in the UK in 2026, covering
          the charger unit, all materials, labour, testing, certification, and DNO notification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>7kW single-phase, simple installation</strong> — £800 to £1,200 total.
                Mid-range charger (£450 to £650), short cable run, existing consumer unit has a
                spare way. The most common domestic installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>7kW single-phase, complex installation</strong> — £1,200 to £2,000 total.
                Longer cable run (underground SWA), consumer unit upgrade, earthing improvements.
                Typical for detached garages or properties needing board upgrades.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>22kW three-phase, workplace</strong> — £2,500 to £5,000 per charge point.
                Three-phase charger unit, dedicated sub-distribution board, load management
                controller, longer cable runs, and commercial certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multi-point commercial installation</strong> — £3,000 to £8,000+ per charge
                point depending on infrastructure requirements. Load balancing, back-office
                software, payment systems, civil works for cable routing, and potentially DNO
                supply upgrade.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Quote EV charger installations with confidence"
          description="Elec-Mate's AI cost engineer helps you build accurate, itemised quotes for EV charger installations. Cable sizing, material costs, and professional PDF quotes — all from your phone."
          icon={Car}
        />
      </>
    ),
  },
  {
    id: 'section-722',
    heading: 'Section 722: BS 7671 Requirements for EV Charging',
    content: (
      <>
        <p>
          Section 722 of BS 7671:2018+A3:2024 contains the specific requirements for the electrical
          installation of electric vehicle charging equipment (EVSE). These requirements apply in
          addition to the general requirements of BS 7671. Here are the key points every electrician
          and informed homeowner should understand:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit (Regulation 722.533.101)</strong> — each EV charger must
                be supplied by a dedicated circuit from the consumer unit or distribution board.
                The circuit protective device must be correctly rated for the charger's maximum
                demand (typically 32A for a 7kW charger).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection (Regulation 722.531.101)</strong> — the EV charger circuit must be
                protected by an appropriate RCD. Where the EVSE can produce DC residual currents, a
                Type B RCD or a Type A RCD combined with a DC fault detection device (6mA DC
                RDC-DD) is required. Most quality domestic chargers include integrated DC
                protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing (Regulation 722.411.4.1)</strong> — particular attention is required
                for earthing arrangements. On PME (TN-C-S) supplies, a local earth electrode may be
                required as a protective measure. Earth fault loop impedance must be verified to
                ensure protective devices disconnect within the required time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME considerations</strong> — where the supply is PME (which is the
                majority of UK domestic supplies), there are specific requirements for EV charging.
                The IET Code of Practice for Electric Vehicle Charging Equipment Installation
                provides detailed guidance on PME earthing options, including the use of a TT
                arrangement at the charger with a local earth electrode.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/iet-code-of-practice-ev">
            IET Code of Practice for EV Charging
          </SEOInternalLink>{' '}
          provides additional practical guidance beyond BS 7671, including worked examples for
          different earthing scenarios, cable sizing for continuous loads, and installation methods
          for various charger locations.
        </p>
      </>
    ),
  },
  {
    id: 'dno-notification',
    heading: 'DNO Notification and the OZEV Grant',
    content: (
      <>
        <p>
          Every EV charger installation must be notified to the Distribution Network Operator (DNO).
          This is a regulatory requirement under the Electricity Safety, Quality and Continuity
          Regulations (ESQCR) and the DNO connection agreement.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">G98 Notification</h3>
            <p className="text-white text-sm leading-relaxed">
              For domestic single-phase installations up to 16A per phase (which covers all standard
              7kW chargers drawing up to 32A on single phase), G98 is a straightforward
              notification. The installer submits the form to the DNO and can proceed with the
              installation. No prior approval is needed. Processing is typically automatic.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">G99 Application</h3>
            <p className="text-white text-sm leading-relaxed">
              For three-phase chargers or installations exceeding 16A per phase, G99 requires
              prior approval from the DNO before the charger can be connected. This process can
              take 4 to 10 weeks and may involve a network capacity assessment. Plan ahead for
              commercial and three-phase domestic installations.
            </p>
          </div>
        </div>
        <p>
          Regarding grants: the original OZEV Homecharge Scheme closed to homeowners in March 2022.
          The current EV chargepoint grant is available to tenants and flat owners only, covering up
          to 75% of installation cost (capped at £350). The Workplace Charging Scheme remains
          available for businesses at up to £350 per socket. Some local authorities and energy
          companies offer additional incentives — check the Energy Saving Trust website for current
          schemes in your area.
        </p>
      </>
    ),
  },
  {
    id: 'factors',
    heading: 'Factors That Affect EV Charger Installation Cost',
    content: (
      <>
        <p>
          The range in EV charger installation costs is driven by several variables:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable run length</strong> — the single biggest variable. A 3-metre cable
                run costs virtually nothing extra; a 25-metre underground SWA cable run can add
                £300 to £500 in materials and labour.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit capacity</strong> — if the existing consumer unit has no spare
                ways or insufficient capacity for a 32A circuit, a board upgrade or replacement
                adds £300 to £800.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing system</strong> — TT systems require earth electrode testing and
                may need a new earth rod. PME systems require compliance with the IET Code of
                Practice regarding protective earthing at the charger location.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil works</strong> — underground cable runs require trenching (minimum
                500mm depth with cable tiles or markers). If the trench crosses a driveway, the
                cost of cutting and reinstating the surface can be significant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Charger choice</strong> — the price difference between a budget and premium
                charger unit is £400 to £600. Most electricians recommend mid-range units with
                smart features and integrated DC protection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting EV Charger Installations',
    content: (
      <>
        <p>
          EV charger installation is one of the highest-growth sectors in domestic electrical work.
          A well-quoted EV installation delivers strong margins, repeat business (the customer will
          recommend you to friends and neighbours), and positions you in a market that is only going
          to grow.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI-Powered Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build itemised EV installation quotes. Charger unit, cable (auto-sized for the
                  run length), RCBO, earth rod if needed, labour, testing, and DNO notification —
                  all itemised with your margins. Professional PDF sent to the customer from site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size the cable correctly on the survey with the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Input the load (32A continuous), cable length, installation method, and ambient
                  temperature — get the correct cable size with voltage drop confirmation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Certificate</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  on your phone after installation and testing. Voice-entry for test results,
                  auto-populated circuit details, and instant PDF export. Professional documentation
                  the customer expects.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win more EV charger installations"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certification. Quote EV installations accurately and deliver professional results. 7-day free trial."
          icon={Car}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerInstallationCostPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Cost UK 2026 | Complete Price Guide"
      description="How much does EV charger installation cost in the UK in 2026? Complete price guide covering 7kW home chargers, 22kW commercial units, Section 722 requirements, RCD types, DNO notification, and OZEV grants."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={Car}
      heroTitle={
        <>
          EV Charger Installation Cost:{' '}
          <span className="text-yellow-400">Complete UK Price Guide 2026</span>
        </>
      }
      heroSubtitle="How much does it really cost to install an EV charger at home or at work? This guide breaks down charger unit prices, installation labour, Section 722 compliance, RCD selection, DNO notification, and the factors that affect the final bill."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify EV Charger Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certificates for EV charger installations. 7-day free trial, cancel anytime."
    />
  );
}
