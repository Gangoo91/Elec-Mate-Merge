import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calculator,
  Car,
  Zap,
  Activity,
  Shield,
  Cable,
  FileCheck2,
  Gauge,
  Battery,
  Network,
  BarChart3,
  Building,
} from 'lucide-react';

export default function EVChargerLoadCalculatorPage() {
  return (
    <ToolTemplate
      title="EV Charger Load Calculator | Demand Assessment"
      description="Calculate EV charger electrical load for single and three-phase installations. Assess demand, apply diversity for multiple chargers, check PME earthing considerations, and verify supply capacity to BS 7671 and IET guidance. Part of 50+ free electrical calculators."
      datePublished="2026-01-28"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'EV Charger Load Calculator', href: '/tools/ev-charger-load-calculator' },
      ]}
      tocItems={[
        { id: 'ev-charger-loads', label: 'EV Charger Electrical Loads' },
        { id: 'single-vs-three-phase', label: 'Single vs Three-Phase' },
        { id: 'load-management', label: 'Load Management Systems' },
        { id: 'diversity-multiple', label: 'Diversity for Multiple Chargers' },
        { id: 'pme-considerations', label: 'PME Earthing Considerations' },
        { id: 'supply-capacity', label: 'Supply Capacity Assessment' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="IET Code of Practice"
      badgeIcon={Car}
      heroTitle={
        <>
          <span className="text-yellow-400">EV Charger Load Calculator</span> — Demand Assessment
          for Electric Vehicle Installations
        </>
      }
      heroSubtitle="Calculate the electrical load for EV charger installations. Single-phase 7kW, three-phase 22kW, or multiple charger sites with diversity. Check supply capacity, PME earthing requirements, and cable sizing in one integrated calculation."
      heroFeaturePills={[
        { icon: Car, label: 'EV Installations' },
        { icon: Zap, label: 'Load Assessment' },
        { icon: Network, label: 'PME Checks' },
        { icon: Battery, label: 'Smart Charging' },
      ]}
      readingTime={11}
      keyTakeaways={[
        'A standard 7kW single-phase EV charger draws approximately 32A at 230V — equivalent to the load of a full ring final circuit and a significant addition to any domestic supply.',
        'Three-phase 22kW chargers draw approximately 32A per phase at 400V, providing much faster charging but requiring a three-phase supply connection.',
        'Load management (smart charging) systems can dynamically limit EV charger current to avoid exceeding the available supply capacity, as required by the 2022 EV chargepoint regulations.',
        'For multiple EV chargers, diversity factors from the IET Code of Practice for Electric Vehicle Charging Equipment Installation allow reduced cable and supply sizing.',
        'PME (TN-C-S) earthing requires additional protective measures for EV charging — either an earth electrode with protective equipotential bonding, or a charging unit with PEN fault detection.',
      ]}
      sections={[
        {
          id: 'ev-charger-loads',
          heading: 'EV Charger Electrical Loads Explained',
          content: (
            <>
              <p>
                Electric vehicle chargers place a substantial and sustained load on the electrical
                supply. Unlike most domestic appliances that cycle on and off or draw variable
                power, an EV charger draws a near-constant current for several hours — often
                overnight. Understanding these loads is essential for correct{' '}
                <SEOInternalLink href="/tools/max-demand-calculator">
                  maximum demand assessment
                </SEOInternalLink>{' '}
                and supply capacity verification.
              </p>
              <p>
                The most common domestic EV charger in the UK is a 7kW single-phase unit, which
                draws approximately 32A at 230V. This is a dedicated circuit requiring a 32A MCB or
                RCBO, 6mm² cable for most run lengths, and a Type A (or better) 30mA RCD. The
                charger typically runs for 4-8 hours per charge, depending on the vehicle battery
                capacity and state of charge.
              </p>
              <p>
                For commercial and workplace installations, three-phase 22kW chargers are common.
                These draw approximately 32A per phase at 400V and can charge an EV in 1-3 hours.
                Rapid DC chargers (50kW and above) are typically limited to forecourt and public
                charging locations and require specialist power supplies beyond the scope of
                standard BS 7671 installation design.
              </p>
              <p>
                The{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                in Elec-Mate includes specific EV charger presets that account for the sustained
                nature of the load when sizing cables and selecting protective devices.
              </p>
            </>
          ),
          appBridge: {
            title: 'Calculate EV Charger Load Instantly',
            description:
              'Enter the charger rating, supply type, and number of units. The calculator determines the total demand, recommends cable sizes, and checks supply capacity in seconds.',
            icon: Car,
          },
        },
        {
          id: 'single-vs-three-phase',
          heading: 'Single-Phase vs Three-Phase EV Charging',
          content: (
            <>
              <p>
                The choice between single-phase and three-phase EV charging depends on the available
                supply, the desired charging speed, and the cost implications. Most UK domestic
                properties have a single-phase 100A supply, which limits EV charging to 7kW maximum
                (32A at 230V).
              </p>
              <div className="grid gap-4 sm:grid-cols-2 my-4">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <h4 className="font-bold text-yellow-400 text-lg mb-2">Single-Phase (7kW)</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>32A at 230V</li>
                    <li>20-30 miles of range per hour</li>
                    <li>6-8 hours for full charge (typical EV)</li>
                    <li>Available on all domestic supplies</li>
                    <li>6mm² or 10mm² cable (depending on length)</li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <h4 className="font-bold text-yellow-400 text-lg mb-2">Three-Phase (22kW)</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>32A per phase at 400V</li>
                    <li>60-80 miles of range per hour</li>
                    <li>1-3 hours for full charge</li>
                    <li>Requires three-phase supply</li>
                    <li>6mm² or 10mm² 4-core SWA cable</li>
                  </ul>
                </div>
              </div>
              <p>
                Not all electric vehicles can accept three-phase charging. Many popular models in
                the UK (including some Tesla variants) have single-phase onboard chargers limited to
                7kW, even when connected to a three-phase supply. It is important to check the
                vehicle specification before recommending a three-phase charger installation. The{' '}
                <SEOInternalLink href="/tools/three-phase-power-calculator">
                  three-phase power calculator
                </SEOInternalLink>{' '}
                can help verify the per-phase current for balanced and unbalanced loads.
              </p>
            </>
          ),
        },
        {
          id: 'load-management',
          heading: 'Load Management and Smart Charging',
          content: (
            <>
              <p>
                The Electric Vehicles (Smart Charge Points) Regulations 2021, which came into force
                on 30 June 2022, require all new domestic and workplace EV chargepoints to be
                "smart" — capable of adjusting their charging rate in response to signals. From an
                electrical design perspective, load management is critical because it allows the
                charger to reduce its current draw when the total site load approaches the supply
                capacity.
              </p>
              <p>There are two main types of load management:</p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Static Load Management</p>
                      <p className="text-white text-sm">
                        The charger is set to a fixed maximum current that, combined with the
                        estimated maximum demand of the rest of the installation, does not exceed
                        the supply capacity. For example, on a 100A supply with an estimated
                        existing load of 60A, the charger would be limited to 30-35A.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Dynamic Load Management</p>
                      <p className="text-white text-sm">
                        A current transformer (CT clamp) on the main supply monitors the total site
                        load in real time. The charger dynamically adjusts its current to use only
                        the available spare capacity, ramping up when other loads reduce and
                        throttling back when they increase.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <p>
                Dynamic load management is the preferred approach because it maximises charging
                speed while preventing supply overload. The Elec-Mate calculator models both
                approaches and can determine whether load management is needed based on the existing{' '}
                <SEOInternalLink href="/tools/max-demand-calculator">
                  maximum demand
                </SEOInternalLink>{' '}
                and the supply capacity.
              </p>
            </>
          ),
        },
        {
          id: 'diversity-multiple',
          heading: 'Diversity for Multiple EV Chargers',
          content: (
            <>
              <p>
                When installing multiple EV chargers — for example, in a car park, housing
                development, or fleet depot — it is unrealistic to assume all chargers will be
                drawing full current simultaneously. Diversity factors allow the electrical design
                to account for the statistical likelihood that chargers will be used at different
                times and at varying power levels.
              </p>
              <p>
                The IET Code of Practice for Electric Vehicle Charging Equipment Installation
                provides diversity factors based on the number of chargers:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <ul className="space-y-1 text-white text-sm">
                  <li>
                    <strong className="text-yellow-400">1 charger:</strong> 1.00 (no diversity)
                  </li>
                  <li>
                    <strong className="text-yellow-400">2 chargers:</strong> 0.80
                  </li>
                  <li>
                    <strong className="text-yellow-400">5 chargers:</strong> 0.60
                  </li>
                  <li>
                    <strong className="text-yellow-400">10 chargers:</strong> 0.50
                  </li>
                  <li>
                    <strong className="text-yellow-400">20 chargers:</strong> 0.40
                  </li>
                  <li>
                    <strong className="text-yellow-400">50+ chargers:</strong> 0.30
                  </li>
                </ul>
              </div>
              <p>
                These factors significantly reduce the total demand calculation for multi-charger
                installations. For example, ten 7kW chargers without diversity would require a 70kW
                supply (approximately 300A at 230V). With a 0.50 diversity factor, the assessed
                demand drops to 35kW (approximately 150A), which may be feasible on an existing
                supply. The{' '}
                <SEOInternalLink href="/tools/diversity-factor-calculator">
                  diversity factor calculator
                </SEOInternalLink>{' '}
                in Elec-Mate applies these factors automatically for multi-charger installations.
              </p>
            </>
          ),
          appBridge: {
            title: 'Multi-Charger Load Assessment Made Simple',
            description:
              'Enter the number of chargers and their ratings. The calculator applies IET diversity factors and determines the total assessed demand for supply sizing.',
            icon: BarChart3,
          },
        },
        {
          id: 'pme-considerations',
          heading: 'PME Earthing Considerations for EV Charging',
          content: (
            <>
              <p>
                One of the most critical considerations for EV charger installations is the earthing
                arrangement. The majority of UK domestic properties use a TN-C-S (PME) earthing
                system, where the neutral and earth are combined in the supply cable (the PEN
                conductor) and separated at the origin of the installation.
              </p>
              <p>
                PME earthing presents a specific risk for EV charging because the vehicle is
                simultaneously connected to the electrical supply (via the charging cable) and to
                true earth (via its tyres on the ground). If the PEN conductor were to become open
                circuit (a PEN fault), the vehicle body could rise to a dangerous potential relative
                to true earth.
              </p>
              <p>
                The IET Code of Practice and BS 7671 Regulation 722.411.4.1 require additional
                protective measures when EV charging equipment is connected to a PME supply. The
                acceptable solutions include:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Earth electrode with protective equipotential bonding:
                      </strong>{' '}
                      Install a local earth electrode (earth rod) and connect it to the protective
                      conductor of the EV circuit, providing a TT-like earth path independent of the
                      PME system.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Charger with PEN fault detection:</strong>{' '}
                      Some EV chargers include built-in PEN fault detection that disconnects the
                      supply if a PEN conductor fault is detected. This eliminates the need for a
                      separate earth electrode.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                The Elec-Mate calculator flags PME earthing requirements automatically when you
                specify a TN-C-S earthing system and an EV charger installation. For more
                information on{' '}
                <SEOInternalLink href="/guides/earthing-arrangements">
                  earthing arrangements
                </SEOInternalLink>
                , see our dedicated guide.
              </p>
            </>
          ),
        },
        {
          id: 'supply-capacity',
          heading: 'Assessing Supply Capacity',
          content: (
            <>
              <p>
                Before installing any EV charger, you must verify that the existing electrical
                supply has sufficient spare capacity to accommodate the additional load. A standard
                UK domestic supply is typically 60A or 100A single-phase, provided by the
                distribution network operator (DNO).
              </p>
              <p>
                Adding a 7kW (32A) EV charger to a 60A supply is particularly challenging because
                the charger alone consumes more than half the total supply capacity. If the existing
                installation already draws 40-50A during peak demand (evening cooking, heating,
                lighting), the combined load would exceed the 60A supply. In this case, options
                include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>
                  Requesting a supply upgrade from the DNO (from 60A to 100A, or from single-phase
                  to three-phase)
                </li>
                <li>
                  Implementing dynamic load management to limit the charger when other loads are
                  high
                </li>
                <li>
                  Reducing the charger current from 32A to a lower setting (e.g., 16A / 3.6kW)
                </li>
                <li>Scheduling charging to off-peak hours when other loads are minimal</li>
              </ul>
              <p>
                The{' '}
                <SEOInternalLink href="/tools/max-demand-calculator">
                  maximum demand calculator
                </SEOInternalLink>{' '}
                helps you assess the existing installation demand, and the EV charger load
                calculator determines whether there is sufficient headroom for the charger. The
                results can be documented on the{' '}
                <SEOInternalLink href="/tools/eic-certificate">EIC certificate</SEOInternalLink> for
                the charger installation.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Determine the charger specification',
          text: 'Note the EV charger power rating (typically 3.6kW, 7kW, 11kW, or 22kW), the supply type (single-phase or three-phase), and the number of units to be installed.',
        },
        {
          name: 'Assess the existing supply',
          text: 'Check the incoming supply capacity (main fuse rating), the earthing system (TN-S, TN-C-S, or TT), and the existing maximum demand. This determines how much spare capacity is available for the EV charger.',
        },
        {
          name: 'Calculate the total demand',
          text: 'Add the EV charger load to the existing maximum demand. For multiple chargers, apply the IET diversity factors. Check that the total demand does not exceed the supply capacity.',
        },
        {
          name: 'Check PME earthing requirements',
          text: 'If the earthing system is TN-C-S (PME), determine the additional protective measures needed — either a local earth electrode or a charger with PEN fault detection.',
        },
        {
          name: 'Size the cable and protective device',
          text: 'Select the cable size and MCB/RCBO rating for the EV charger circuit. A 7kW charger typically requires a 32A Type B MCB/RCBO and 6mm² cable, but check voltage drop for longer runs.',
        },
      ]}
      howToHeading="How to Assess EV Charger Load"
      howToDescription="Five steps to calculate the electrical load and design the supply for an EV charger installation."
      features={[
        {
          icon: Car,
          title: 'EV Charger Load Calculation',
          description:
            'Calculate the electrical load for 3.6kW, 7kW, 11kW, and 22kW EV chargers. Single-phase and three-phase options with automatic current calculation.',
        },
        {
          icon: BarChart3,
          title: 'Diversity for Multiple Chargers',
          description:
            'Apply IET Code of Practice diversity factors for multi-charger installations. Automatically reduces the assessed demand based on the number of chargers.',
        },
        {
          icon: Network,
          title: 'PME Earthing Assessment',
          description:
            'Flags PME earthing requirements and recommends additional protective measures including earth electrode installation or PEN fault detection chargers.',
        },
        {
          icon: Battery,
          title: 'Load Management Guidance',
          description:
            'Determines whether static or dynamic load management is needed based on existing demand and supply capacity. Recommends the appropriate approach.',
        },
        {
          icon: Cable,
          title: 'Cable and Device Sizing',
          description:
            'Recommends cable sizes and protective device ratings for the EV charger circuit, including voltage drop verification for long cable runs.',
        },
        {
          icon: Gauge,
          title: 'Supply Capacity Check',
          description:
            'Compares the total assessed demand against the available supply capacity and flags when a DNO supply upgrade may be required.',
        },
      ]}
      featuresHeading="EV Charger Calculator Features"
      featuresSubheading="Complete EV charging installation design tool — from demand assessment to cable sizing."
      faqs={[
        {
          question: 'How many amps does a 7kW EV charger draw?',
          answer:
            'A 7kW single-phase EV charger draws approximately 30.4A at 230V (Power = Voltage x Current, so Current = 7000 / 230 = 30.4A). In practice, these chargers are designed for a 32A circuit, protected by a 32A MCB or RCBO. The charger draws this current continuously for the duration of the charge — typically 4-8 hours for a full charge from empty — making it one of the highest sustained loads in a domestic installation.',
        },
        {
          question: 'Can I install an EV charger on a 60A supply?',
          answer:
            'It is possible but requires careful assessment. A 7kW EV charger draws 32A, which is more than half of a 60A supply. If the existing maximum demand during the charging period (typically overnight) is below 28-30A, the supply may be adequate. Dynamic load management can help by reducing the charger current when other loads are high. If the supply is insufficient, you can either request a DNO upgrade to 100A (which may be free under the DNO obligation) or reduce the charger to a lower power setting such as 3.6kW (16A).',
        },
        {
          question: 'Do I need an earth rod for an EV charger on PME?',
          answer:
            'If the installation has a TN-C-S (PME) earthing system, BS 7671 Regulation 722.411.4.1 requires additional protective measures for EV charging circuits. The most common solution is to install a local earth electrode (earth rod) connected to the protective conductor of the EV charger circuit. The earth electrode resistance should ideally be below 200 ohms (though lower is better). An alternative is to use an EV charger with built-in PEN fault detection, which eliminates the need for a separate earth electrode. Your local DNO may have additional requirements.',
        },
        {
          question: 'What is the diversity factor for 10 EV chargers?',
          answer:
            'The IET Code of Practice for Electric Vehicle Charging Equipment Installation recommends a diversity factor of 0.50 for 10 EV chargers. This means the total assessed demand is 50% of the sum of all charger ratings. For ten 7kW chargers, the undiversified total would be 70kW, but with diversity applied, the assessed demand is 35kW. This diversity factor is based on the assumption that not all chargers will be in use simultaneously and that charge rates vary as vehicles approach full charge.',
        },
        {
          question: 'What size cable do I need for a 7kW EV charger?',
          answer:
            'A 7kW single-phase EV charger requires a dedicated circuit with a minimum cable size of 6mm² twin and earth (for runs up to approximately 25 metres, depending on installation method) or 10mm² for longer runs where voltage drop is a concern. The circuit should be protected by a 32A RCBO (Type A, 30mA) or a 32A MCB with a separate Type A RCD. Type A RCD protection is specified because EV chargers can produce DC fault currents that a standard Type AC RCD would not detect. Some installations use SWA cable for the external run from the consumer unit to the charger location.',
        },
        {
          question: 'What are the 2022 smart charging regulations?',
          answer:
            'The Electric Vehicles (Smart Charge Points) Regulations 2021, which came into force on 30 June 2022, require all new domestic and workplace EV chargepoints sold in the UK to have smart functionality. This means the charger must be able to send and receive data, respond to signals to adjust charging rate, provide a randomised delay function to prevent grid stress, and allow the user to override smart functions. The charger must also default to off-peak charging times. These regulations affect the charger specification but do not change the electrical installation requirements under BS 7671.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/max-demand-calculator',
          title: 'Maximum Demand Calculator',
          description:
            'Calculate the total maximum demand for an installation including EV charger loads.',
          icon: BarChart3,
          category: 'Calculators',
        },
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'Size cables to BS 7671 with automatic correction factors and voltage drop checks.',
          icon: Cable,
          category: 'Calculators',
        },
        {
          href: '/tools/three-phase-power-calculator',
          title: 'Three-Phase Power Calculator',
          description:
            'Calculate three-phase power, current, and load balancing for commercial EV installations.',
          icon: Activity,
          category: 'Calculators',
        },
        {
          href: '/tools/diversity-factor-calculator',
          title: 'Diversity Factor Calculator',
          description:
            'Apply diversity factors to multi-circuit installations including multiple EV chargers.',
          icon: Calculator,
          category: 'Calculators',
        },
        {
          href: '/guides/earthing-arrangements',
          title: 'Earthing Arrangements Guide',
          description:
            'TN-S, TN-C-S, and TT earthing systems explained with PME considerations for EV charging.',
          icon: Network,
          category: 'Guides',
        },
        {
          href: '/tools/eic-certificate',
          title: 'EIC Certificate',
          description:
            'Issue an Electrical Installation Certificate for EV charger installations with full BS 7671 compliance.',
          icon: FileCheck2,
          category: 'Certificates',
        },
      ]}
      ctaHeading="Design EV charger installations with confidence"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EV charger load assessment and cable sizing. 7-day free trial, cancel anytime."
      toolPath="/tools/ev-charger-load-calculator"
    />
  );
}
