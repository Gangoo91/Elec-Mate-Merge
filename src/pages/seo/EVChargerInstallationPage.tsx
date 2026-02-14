import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Car,
  Zap,
  ShieldCheck,
  PoundSterling,
  ClipboardCheck,
  Calculator,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Cable,
  Activity,
  Brain,
} from 'lucide-react';

export default function EVChargerInstallationPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation UK 2026 | Requirements & Cost"
      description="Complete guide to EV charger installation in the UK. Types of chargers, installation requirements, RCD and earthing regulations, IET Code of Practice, OZEV grant, DNO notification, Part P, and costs from £800 to £1,500."
      datePublished="2025-03-10"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'EV Charger Installation', href: '/guides/ev-charger-installation' },
      ]}
      tocItems={[
        { id: 'types-of-charger', label: 'Types of EV Charger' },
        { id: 'installation-requirements', label: 'Installation Requirements' },
        { id: 'earthing-pme', label: 'Earthing & PME Considerations' },
        { id: 'rcd-protection', label: 'RCD & Circuit Protection' },
        { id: 'iet-code-of-practice', label: 'IET Code of Practice' },
        { id: 'cost', label: 'Installation Costs' },
        { id: 'grants', label: 'OZEV Grant' },
        { id: 'dno-part-p', label: 'DNO & Part P Notification' },
        { id: 'how-to', label: 'Step-by-Step Installation' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="High Value Guide"
      badgeIcon={Car}
      heroTitle={
        <>
          EV Charger Installation UK
          <br />
          <span className="text-yellow-400">Requirements, Regulations & Cost</span>
        </>
      }
      heroSubtitle="EV charger installation is one of the fastest-growing areas of domestic electrical work. This guide covers everything an electrician needs to know — charger types, cable sizing, earthing requirements, RCD selection, IET Code of Practice compliance, grants, DNO notification, and realistic costs."
      readingTime={18}
      keyTakeaways={[
        'A standard domestic EV charger is 7kW single-phase (32A) and requires a dedicated circuit from the consumer unit with no diversity applied — the cable and protective device must be rated for 32A continuously.',
        'On PME (TN-C-S) supplies, the EV charging circuit must use a separate TT earth electrode — the PME earth must not be used (BS 7671 Regulation 722.411.4.1).',
        'RCD protection must be at least Type A with 6mA DC detection, or Type B RCD if the charger does not have built-in DC residual current monitoring.',
        'The OZEV Electric Vehicle Homecharge Scheme grant provides up to £350 towards installation costs for eligible properties — the installer must be OZEV-approved.',
        'Typical all-in cost for a domestic 7kW EV charger installation is £800 to £1,500 including the charger unit, cable, protective devices, earth rod (if needed), testing, and certification.',
      ]}
      sections={[
        {
          id: 'types-of-charger',
          heading: 'Types of EV Charger',
          content: (
            <>
              <p>
                Electric vehicle chargers are categorised by their power output and the type of
                electrical supply they require. For domestic and small commercial installations in
                the UK, there are three main options.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-yellow-400 text-2xl mb-1">3.6 kW</h3>
                  <h4 className="font-bold text-white mb-3">Slow Charger (16A Single Phase)</h4>
                  <p className="text-white text-sm leading-relaxed">
                    Draws 16A from a single-phase supply. Adds approximately 10-15 miles of range
                    per hour of charging. Suitable for overnight charging where the vehicle is
                    parked for 8-12 hours. Less common for dedicated wallbox installations but
                    sometimes used where the supply capacity is limited and load management is not
                    possible. Cable sizing is simpler due to the lower current demand.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-2xl mb-1">7 kW</h3>
                  <h4 className="font-bold text-white mb-3">Fast Charger (32A Single Phase)</h4>
                  <p className="text-white text-sm leading-relaxed">
                    The standard for domestic installations. Draws 32A from a single-phase supply.
                    Adds approximately 20-30 miles of range per hour. Fully charges most EVs
                    overnight in 6-8 hours. This is the charger type covered by the OZEV grant
                    scheme and the IET Code of Practice. Requires a dedicated 32A circuit with no
                    diversity, appropriate{' '}
                    <SEOInternalLink href="/calculators/cable-sizing">cable sizing</SEOInternalLink>
                    , and RCD protection.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-yellow-400 text-2xl mb-1">22 kW</h3>
                  <h4 className="font-bold text-white mb-3">Fast Charger (32A Three Phase)</h4>
                  <p className="text-white text-sm leading-relaxed">
                    Requires a three-phase supply, which most domestic properties do not have. Adds
                    approximately 60-80 miles of range per hour. Primarily used in commercial
                    settings — workplaces, car parks, fleet depots. The vehicle must also support
                    three-phase AC charging (many do not — they have a single-phase onboard charger
                    regardless of the supply). Installation is significantly more complex and
                    expensive.
                  </p>
                </div>
              </div>
              <p>
                For the vast majority of domestic installations, the 7 kW single-phase charger is
                the correct choice. It provides a practical charging rate for overnight use and is
                compatible with the standard single-phase supply available to almost every UK
                property. The rest of this guide focuses primarily on 7 kW single-phase
                installations.
              </p>
            </>
          ),
        },
        {
          id: 'installation-requirements',
          heading: 'Installation Requirements',
          content: (
            <>
              <p>
                Installing an EV charger is not simply mounting a wallbox and running a cable. BS
                7671 Section 722 sets out specific requirements for EV charging circuits, and the
                IET Code of Practice for Electric Vehicle Charging Equipment Installation provides
                detailed guidance. The key requirements are:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">
                  BS 7671 Section 722 Requirements
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Dedicated circuit (Regulation 722.531.3.101)
                      </strong>{' '}
                      — Each EV charging point must be supplied by its own dedicated circuit from
                      the distribution board. The circuit must not supply any other load.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Continuous duty rating</strong> — The
                      cable, protective device, and all connections must be rated for the full load
                      current (32A) drawn continuously. No diversity is applied to EV charging
                      circuits because the vehicle can charge at maximum rate for extended periods.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Cable sizing</strong> — Minimum 6mm² PVC
                      twin-and-earth (for short runs clipped direct). 10mm² required for longer runs
                      to meet the{' '}
                      <SEOInternalLink href="/calculators/voltage-drop">
                        5% voltage drop limit
                      </SEOInternalLink>
                      . SWA (steel wire armoured) cable for external underground runs.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        PME earthing restrictions (Regulation 722.411.4.1)
                      </strong>{' '}
                      — On PME supplies, the EV circuit protective conductor must NOT be connected
                      to the PME earth terminal. A separate TT earth electrode is required.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        30 mA RCD protection (Regulation 722.411.3.2)
                      </strong>{' '}
                      — Type A RCD minimum, with additional 6 mA DC protection (built into most
                      modern chargers) or Type B RCD if no built-in DC detection.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Local isolation</strong> — A means of
                      isolation must be provided adjacent to the charger for maintenance and
                      emergency disconnection.
                    </span>
                  </li>
                </ul>
              </div>
              <SEOAppBridge
                title="Cable Sizing Calculator for EV Circuits"
                description="Elec-Mate's cable sizing calculator handles EV charger circuits with all the specific requirements — 32A continuous load, voltage drop calculation, derating factors for installation method, grouping, and ambient temperature. Get the right cable size first time."
                icon={Calculator}
              />
            </>
          ),
        },
        {
          id: 'earthing-pme',
          heading: 'Earthing and PME Considerations',
          content: (
            <>
              <p>
                The earthing arrangement is one of the most critical — and most commonly
                misunderstood — aspects of EV charger installation. The majority of UK domestic
                properties have a TN-C-S (PME) earthing system, which creates a specific safety
                concern for EV charging.
              </p>
              <p>
                On a PME supply, the neutral and earth are combined in the supply cable as a single
                PEN conductor. If this PEN conductor breaks (an "open PEN" fault), the voltage on
                the PME earth terminal can rise to a dangerous level — potentially up to 230V.
                Because an EV charging cable provides a direct metallic connection between the
                installation earth and the vehicle chassis (which a person may be touching), this
                creates a risk of fatal electric shock.
              </p>
              <p>
                BS 7671 Regulation 722.411.4.1 addresses this by requiring that, on PME supplies,
                the EV charging circuit must use a separate TT earth electrode — a copper-clad earth
                rod driven into the ground — rather than the PME earth. This ensures the vehicle
                earth is completely independent of the PME system. The EV circuit is then protected
                by a 30 mA RCD, which will trip if the earth electrode resistance and the fault
                current produce a touch voltage exceeding 50V.
              </p>
              <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5 my-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-2">Critical Installation Point</h4>
                    <p className="text-white text-sm leading-relaxed">
                      The TT earth electrode conductor must be run separately from the consumer unit
                      to the earth rod — it must not be connected to the PME earth bar. The RCD
                      protecting the EV circuit must only protect TT-earthed circuits, not any
                      PME-earthed circuits. Getting this wrong defeats the purpose of the separate
                      earth and leaves the installation non-compliant.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                For properties with an existing TN-S earthing system (earth provided by the cable
                sheath) or TT system (existing earth electrode), the separate earth rod may not be
                required — but the 30 mA RCD protection is still mandatory. Always check the{' '}
                <SEOInternalLink href="/guides/earthing-arrangements">
                  earthing arrangement
                </SEOInternalLink>{' '}
                before specifying the installation design.
              </p>
            </>
          ),
        },
        {
          id: 'rcd-protection',
          heading: 'RCD and Circuit Protection',
          content: (
            <>
              <p>
                The circuit protection for an EV charger must address both overcurrent and earth
                fault conditions. The standard protective device arrangement for a domestic 7 kW
                charger is:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">Standard Arrangement</h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    <strong className="text-white">32A Type A RCBO (30 mA)</strong> — where the
                    charger has built-in 6 mA DC residual current detection. Most modern domestic
                    chargers (Zappi, Ohme, Pod Point, Easee, Wallbox) include this DC detection,
                    allowing the use of a Type A device rather than the more expensive Type B.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    The charger monitors for DC residual currents internally and disconnects if the
                    DC component exceeds 6 mA. The Type A RCBO in the consumer unit then provides
                    protection against AC and pulsating DC fault currents.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">Alternative Arrangement</h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    <strong className="text-white">32A Type B RCD + MCB (or Type B RCBO)</strong> —
                    where the charger does not have built-in DC detection. A Type B RCD detects
                    smooth DC fault currents that a Type A cannot. This is more expensive (Type B
                    RCDs cost £150-£300 compared to £30-£50 for a Type A RCBO) but is essential
                    where the fault current may have a DC component.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    Always check the charger manufacturer's installation manual for the specific RCD
                    type required.
                  </p>
                </div>
              </div>
              <p>
                The circuit breaker rating should be 32A for a standard 7 kW single-phase charger. A
                Type C characteristic is typically specified (rather than Type B) because the
                charger may draw brief inrush currents on start-up that could nuisance trip a Type B
                device. Again, check the manufacturer's specification.
              </p>
            </>
          ),
        },
        {
          id: 'iet-code-of-practice',
          heading: 'IET Code of Practice for EV Charging',
          content: (
            <>
              <p>
                The IET Code of Practice for Electric Vehicle Charging Equipment Installation is the
                definitive guidance document for EV charger installations in the UK. It supplements
                BS 7671 Section 722 with detailed, practical guidance on every aspect of the
                installation. While the Code of Practice is not a regulation in itself, it is widely
                regarded as the industry standard and is referenced by competent person schemes,
                manufacturers, and grant bodies.
              </p>
              <p>The Code of Practice covers:</p>
              <ul className="space-y-2 my-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Charging modes and connector types</strong> —
                    Detailed explanation of Mode 1, 2, 3, and 4 charging and the Type 1, Type 2,
                    CCS, and CHAdeMO connectors.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Supply assessment</strong> — How to assess
                    whether the existing supply can accommodate the additional load, including
                    maximum demand calculation and load management options.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Earthing assessment</strong> — The PME earthing
                    considerations, TT earth electrode installation, and earth electrode resistance
                    testing.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Circuit design</strong> — Cable selection,
                    voltage drop, protection coordination, and installation methods.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Certification requirements</strong> — What must
                    be documented on the EIC and the additional EV-specific documentation required.
                  </span>
                </li>
              </ul>
              <SEOAppBridge
                title="EV Charger Certificate in Elec-Mate"
                description="Elec-Mate has a dedicated EV Charger Certificate form that follows the IET Code of Practice structure. It includes the PME assessment checklist, load management documentation, and all Section 722-specific fields — ensuring nothing is missed during certification."
                icon={FileText}
              />
            </>
          ),
        },
        {
          id: 'cost',
          heading: 'How Much Does an EV Charger Installation Cost in 2026?',
          content: (
            <>
              <p>
                The total cost of a domestic EV charger installation depends on the charger unit
                chosen, the complexity of the cable run, whether an earth rod is needed, and any
                upgrades required to the existing electrical installation.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Typical UK Costs (2026)</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">Charger unit (7 kW wallbox)</h4>
                      <p className="text-white text-sm">Ohme, Zappi, Pod Point, Easee, etc.</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">£300 - £800</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">Installation labour</h4>
                      <p className="text-white text-sm">
                        Including cable, protective device, testing, EIC
                      </p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">£400 - £700</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">Earth rod (if PME supply)</h4>
                      <p className="text-white text-sm">Copper-clad rod, connections, testing</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">£80 - £150</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">Consumer unit upgrade (if needed)</h4>
                      <p className="text-white text-sm">Additional way, new board if full</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">£100 - £600</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                    <div>
                      <h4 className="font-bold text-white">Total installed (typical)</h4>
                      <p className="text-white text-sm">Standard domestic installation</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-xl">£800 - £1,500</span>
                  </div>
                </div>
              </div>
              <p>
                The wide range reflects the variability of installations. A simple job — charger
                next to the consumer unit, short cable run, existing spare way in the board — can be
                at the lower end. A complex job — charger in a detached garage requiring a long SWA
                cable run, earth rod, consumer unit upgrade, and load management — will be at the
                higher end or potentially above it.
              </p>
              <SEOAppBridge
                title="AI Cost Engineer for EV Installations"
                description="Get an accurate quote for any EV charger installation in seconds. Elec-Mate's AI Cost Engineer factors in charger type, cable run length, earth rod requirement, consumer unit work, and your local labour rates — all backed by real trade pricing data."
                icon={PoundSterling}
              />
            </>
          ),
        },
        {
          id: 'grants',
          heading: 'OZEV Grant (Electric Vehicle Homecharge Scheme)',
          content: (
            <>
              <p>
                The Office for Zero Emission Vehicles (OZEV) — formerly the Office for Low Emission
                Vehicles (OLEV) — has offered various grant schemes to support domestic EV charger
                installations. The most well-known is the Electric Vehicle Homecharge Scheme (EVHS),
                which provided up to £350 towards installation costs.
              </p>
              <p>
                As of 2026, the availability and specific terms of government grants change
                regularly. The EVHS has been through several iterations, with eligibility criteria
                shifting over time. Currently, the grant is primarily available for:
              </p>
              <ul className="space-y-2 my-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Renters and flat-dwellers</strong> —
                    Owner-occupiers of houses were removed from eligibility in April 2022, but
                    renters and residents of flats and apartments may still be eligible.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Workplace Charging Scheme</strong> — Businesses
                    can claim up to £350 per socket (up to 40 sockets) for workplace EV charger
                    installations.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Local authority schemes</strong> — Some local
                    councils offer additional grants or funding for residential EV charging,
                    particularly for on-street charging solutions.
                  </span>
                </li>
              </ul>
              <p>
                To claim any OZEV grant, the installer must be OZEV-approved and registered with a
                competent person scheme. The installation must comply with BS 7671 and the IET Code
                of Practice. Comprehensive documentation is required — including the{' '}
                <SEOInternalLink href="/guides/ev-charger-certificate">
                  EV charger certificate
                </SEOInternalLink>
                , photographs, and DNO notification evidence. Incomplete documentation is the most
                common reason for grant rejection.
              </p>
            </>
          ),
        },
        {
          id: 'dno-part-p',
          heading: 'DNO Notification and Part P Requirements',
          content: (
            <>
              <p>
                EV charger installation involves two separate notification requirements: the
                Distribution Network Operator (DNO) and Building Regulations Part P.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">DNO Notification</h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    Under the Electricity Safety, Quality and Continuity Regulations (ESQCR) 2002,
                    the DNO must be notified before connecting any significant new load. A 7 kW EV
                    charger drawing 32A is a significant addition to a domestic supply. Most DNOs
                    require notification through their online portal.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    The DNO notification serves two purposes: it allows the DNO to check that the
                    local network can handle the additional load, and it helps with network planning
                    as EV uptake grows. In some cases, the DNO may require a supply upgrade (e.g.,
                    from 60A to 100A fuse) before the charger can be connected.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">Part P Notification</h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    Installing a new circuit for an EV charger is notifiable under{' '}
                    <SEOInternalLink href="/guides/part-p-building-regulations">
                      Part P of the Building Regulations
                    </SEOInternalLink>
                    . The work must be either self-certified through a competent person scheme or
                    notified to building control.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    A full Electrical Installation Certificate (EIC) is required for the new
                    circuit. The EIC must include all the Section 722 specific requirements — PME
                    assessment, earthing details, load management documentation, and complete test
                    results. A Minor Works Certificate is not appropriate.
                  </p>
                </div>
              </div>
              <p>
                The maximum demand of the property — including the new EV charger — must be assessed
                before installation. Elec-Mate includes a{' '}
                <SEOInternalLink href="/calculators/max-demand">
                  maximum demand calculator
                </SEOInternalLink>{' '}
                that factors in the EV charger load and checks it against the supply fuse rating.
              </p>
            </>
          ),
        },
      ]}
      howToHeading="How to Install an EV Charger — Step-by-Step Process"
      howToSteps={[
        {
          name: 'Site survey and supply assessment',
          text: 'Visit the property and assess the existing electrical installation. Record the earthing arrangement (TN-C-S, TN-S, or TT), supply fuse rating, and current maximum demand. Determine the cable route from the consumer unit to the charger location. Identify whether an earth rod is needed (PME supply), whether the consumer unit has a spare way, and whether the supply capacity is adequate for the additional 32A load.',
        },
        {
          name: 'Notify DNO and check grant eligibility',
          text: 'Submit the DNO notification through their online portal before starting work. Check whether the customer qualifies for the OZEV grant and, if so, submit the grant application. Confirm the charger specification with the customer — charger make and model, tethered vs untethered cable, smart charging features, and colour options.',
        },
        {
          name: 'Install the earth rod (if PME supply)',
          text: 'Drive a copper-clad earth rod into the ground near the charger location. Connect the earth electrode conductor and run it back to the consumer unit separately from the PME earthing system. Measure the earth electrode resistance (Ra) using the appropriate test method. The combined product of Ra and the RCD operating current must not exceed 50V.',
        },
        {
          name: 'Install the cable and protective device',
          text: 'Install the cable from the consumer unit to the charger location using the correct installation method. For internal runs, use twin-and-earth cable (6mm² minimum for short runs, 10mm² for longer runs). For external underground runs, use SWA cable buried at minimum 500mm depth with cable covers and route marker tape. Install the 32A Type A RCBO (or Type B if required) in the consumer unit.',
        },
        {
          name: 'Mount the charger and connect',
          text: 'Mount the wallbox at the correct height (manufacturer specification, typically 1-1.5m from ground to centre). Connect the supply cable to the charger following the manufacturer installation instructions. Install a local isolator adjacent to the charger if not built into the unit. Commission the charger — connect to Wi-Fi, set up the smart charging schedule, and configure load management if a CT clamp is fitted.',
        },
        {
          name: 'Test, certify, and notify',
          text: 'Carry out the full testing sequence: continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance, prospective fault current, and RCD operating time. Complete the Electrical Installation Certificate with all Section 722 specific documentation. Submit Part P notification through your competent person scheme. Issue the certificate to the customer and retain your copy.',
        },
      ]}
      faqs={[
        {
          question: 'Do I need a separate earth rod for every EV charger installation?',
          answer:
            'Only if the property has a PME (TN-C-S) earthing system, which is the majority of UK domestic properties. BS 7671 Regulation 722.411.4.1 requires that the EV charging circuit uses a separate TT earth electrode on PME supplies. If the property already has a TN-S earthing system (earth from cable sheath) or an existing TT system, a separate earth rod may not be required — but the 30 mA RCD protection is still mandatory in all cases. Always verify the earthing arrangement at the property before specifying the installation. The earthing type should be confirmed by measuring the external earth fault loop impedance (Ze) and inspecting the supply arrangement at the meter.',
        },
        {
          question: 'What cable size do I need for a 7kW EV charger?',
          answer:
            'For a standard 7 kW (32A) EV charger on a single-phase supply, the minimum cable size depends on the installation method, cable type, and circuit length. For PVC twin-and-earth cable (6242Y) clipped direct, 6mm² is the minimum for short runs (typically up to 20-25 metres depending on derating factors). For longer runs, 10mm² is often required to keep the voltage drop within the 5% limit (11.5V on a 230V supply). For external underground runs using SWA cable, 4mm² may be sufficient for shorter distances, but 6mm² is more commonly used for future-proofing. Always perform a voltage drop calculation specific to your circuit — Elec-Mate includes a cable sizing calculator that handles all the derating factors and voltage drop requirements for EV circuits.',
        },
        {
          question: 'How long does an EV charger installation take?',
          answer:
            'A straightforward domestic EV charger installation typically takes half a day to a full day — approximately 3 to 6 hours. This includes mounting the wallbox, running the cable from the consumer unit, installing the protective device, fitting the earth rod (if needed on a PME supply), testing, and commissioning the charger. More complex installations — long cable runs to detached garages, consumer unit upgrades, supply fuse changes, or difficult access routes — can extend to a full day or slightly longer. The time also depends on the cable route: running cable through a finished property is slower than routing it externally along walls.',
        },
        {
          question: 'Can I install a 22kW three-phase charger at home?',
          answer:
            'Only if your property has a three-phase electricity supply, which the vast majority of UK homes do not. Residential properties are almost always supplied with single-phase (230V), which limits you to 7 kW maximum charging speed. Upgrading to a three-phase supply requires a significant investment — typically £3,000 to £10,000 depending on the distance from the nearest three-phase supply point — plus ongoing higher standing charges. Additionally, many EVs have single-phase onboard chargers and cannot take advantage of a three-phase supply even if one is available. For most domestic users, a 7 kW single-phase charger provides perfectly adequate overnight charging (6-8 hours for a full charge).',
        },
        {
          question: 'What happens if the maximum demand exceeds the supply fuse rating?',
          answer:
            'If the total maximum demand of the property (including the new 32A EV charger) exceeds the supply fuse rating, you have three options. First, install a load management device — a CT clamp on the supply tails that monitors total current in real time and dynamically reduces the charger output when other loads are active. This is the most cost-effective solution and is built into most modern smart chargers. Second, request a supply upgrade from the DNO — increasing the fuse from 60A to 80A or 100A. This may be free or may involve a charge, and typically takes 4-12 weeks. Third, reduce the charger current setting — some chargers can be configured to charge at 24A (5.5 kW) instead of 32A (7 kW), reducing the demand. Load management is the preferred solution in most cases.',
        },
        {
          question: 'Do I need to be OZEV-approved to install EV chargers?',
          answer:
            'You do not need to be OZEV-approved to install EV chargers — any qualified, Part P registered electrician can carry out the installation. However, to claim the OZEV Electric Vehicle Homecharge Scheme grant on behalf of the customer, the installer must be OZEV-approved. Becoming OZEV-approved requires registration with a competent person scheme, completion of the manufacturer-specific installation training for the charger brands you install, and maintaining adequate public liability insurance. Many charger manufacturers (Zappi, Ohme, Pod Point) also require installers to complete their own brand-specific training before they will supply chargers for installation.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/ev-charger-certificate',
          title: 'EV Charger Certificate',
          description: 'How to complete a Section 722 compliant EV charger certificate.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/calculators/cable-sizing',
          title: 'Cable Sizing Calculator',
          description: 'Calculate the correct cable size for EV charging circuits.',
          icon: Calculator,
          category: 'Calculator',
        },
        {
          href: '/calculators/voltage-drop',
          title: 'Voltage Drop Calculator',
          description: 'Verify voltage drop compliance for long cable runs.',
          icon: Activity,
          category: 'Calculator',
        },
        {
          href: '/guides/earthing-arrangements',
          title: 'Earthing Arrangements',
          description: 'TN-S, TN-C-S, and TT earthing systems explained.',
          icon: Cable,
          category: 'Guide',
        },
        {
          href: '/guides/part-p-building-regulations',
          title: 'Part P Building Regulations',
          description: 'Understanding notification requirements for electrical work.',
          icon: ShieldCheck,
          category: 'Regulations',
        },
        {
          href: '/calculators/circuit-breaker-sizing',
          title: 'Circuit Breaker Sizing',
          description: 'MCB and RCBO selection for different circuit types.',
          icon: Zap,
          category: 'Calculator',
        },
      ]}
      ctaHeading="Install EV Chargers With Confidence"
      ctaSubheading="EV charger certificates, cable sizing, maximum demand calculator, and AI Circuit Designer — all in Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
