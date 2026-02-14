import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Battery,
  Calculator,
  Zap,
  Shield,
  BookOpen,
  BarChart3,
  Clock,
  Server,
  FileCheck2,
  Gauge,
  AlertTriangle,
  Plug,
} from 'lucide-react';

export default function BatteryBackupCalculatorPage() {
  return (
    <ToolTemplate
      title="Battery Backup Calculator | UPS Sizing Tool"
      description="Calculate battery backup capacity and UPS sizing for any load. Covers load assessment, runtime calculation, battery Ah requirements, and UPS kVA rating selection. Free UK electrical calculator for electricians and designers."
      datePublished="2026-01-25"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Battery Backup Calculator', href: '/tools/battery-backup-calculator' },
      ]}
      tocItems={[
        { id: 'what-is-ups-sizing', label: 'What Is UPS Sizing?' },
        { id: 'load-assessment', label: 'Load Assessment' },
        { id: 'runtime-calculation', label: 'Runtime Calculation' },
        { id: 'battery-capacity', label: 'Battery Capacity (Ah)' },
        { id: 'ups-rating-selection', label: 'UPS Rating Selection' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Part of 50+ Calculators"
      badgeIcon={Battery}
      heroTitle={
        <>
          <span className="text-yellow-400">Battery Backup Calculator</span> — Size Your UPS and
          Battery Bank Correctly
        </>
      }
      heroSubtitle="Calculate the UPS rating and battery capacity needed to keep critical loads running during a power outage. Enter the load in watts or VA, choose the required runtime, and get an instant recommendation for UPS size and battery Ah. Part of Elec-Mate's 50+ calculators for UK electricians."
      heroFeaturePills={[
        { icon: Battery, label: 'Battery Sizing' },
        { icon: Server, label: 'UPS Rating' },
        { icon: Clock, label: 'Runtime Calc' },
        { icon: Shield, label: 'BS 7671' },
      ]}
      readingTime={10}
      keyTakeaways={[
        'UPS sizing requires accurate load assessment in both watts (real power) and VA (apparent power) to account for power factor.',
        'Battery capacity in amp-hours (Ah) is calculated from the load current, required runtime, battery voltage, and a derating factor for discharge rate and temperature.',
        'A typical UPS should be loaded to no more than 75-80% of its rated capacity to allow for inrush currents and future load growth.',
        "Runtime is not linear — a battery providing 30 minutes at half load does not provide 60 minutes at quarter load due to Peukert's effect.",
        'Elec-Mate calculates UPS rating, battery Ah, and expected runtime instantly, taking derating factors and efficiency losses into account.',
      ]}
      sections={[
        {
          id: 'what-is-ups-sizing',
          heading: 'What Is UPS Sizing and Why Does It Matter?',
          content: (
            <>
              <p>
                A UPS (uninterruptible power supply) provides battery backup power to critical
                electrical loads when the mains supply fails. UPS sizing means selecting a UPS with
                the correct power rating (kVA or kW) and battery capacity (Ah) to support the
                connected loads for the required runtime during a power outage.
              </p>
              <p>
                Getting UPS sizing wrong has direct consequences. An undersized UPS will overload
                and shut down, defeating its purpose. An oversized UPS wastes capital expenditure,
                occupies unnecessary floor space, and operates at poor efficiency. Incorrect battery
                sizing leads to runtime shorter than expected — a server room that was supposed to
                have 30 minutes of backup actually runs out of battery in 15 minutes.
              </p>
              <p>
                Electricians encounter UPS installations in server rooms, data centres, hospital
                critical care areas, retail point-of-sale systems, security installations, emergency
                lighting central battery systems, and increasingly in domestic settings for home
                offices and network equipment. The{' '}
                <SEOInternalLink href="/tools/max-demand-calculator">
                  maximum demand calculator
                </SEOInternalLink>{' '}
                helps determine the total load that the UPS needs to support, while the{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                ensures the cables feeding the UPS are correctly rated.
              </p>
            </>
          ),
          appBridge: {
            title: 'Calculate UPS Size and Battery Capacity',
            description:
              'Enter your load in watts or VA, select the required runtime, and Elec-Mate recommends the UPS rating and battery Ah. Includes derating factors for discharge rate and ambient temperature.',
            icon: Battery,
          },
        },
        {
          id: 'load-assessment',
          heading: 'Load Assessment — Watts vs VA',
          content: (
            <>
              <p>
                The first step in UPS sizing is accurately assessing the load. You need two values:
                the load in watts (W) and the load in volt-amperes (VA). These are different because
                most electrical loads have a power factor less than 1.0.
              </p>
              <p>
                <strong className="text-yellow-400">Watts (W)</strong> is the real power consumed by
                the load — the power that does useful work and generates heat.{' '}
                <strong className="text-yellow-400">Volt-amperes (VA)</strong> is the apparent power
                — the product of voltage and current. The relationship is: W = VA x Power Factor.
              </p>
              <p>
                Computer servers typically have a power factor of 0.9-0.99 (with active PFC power
                supplies). Older computer equipment may have a power factor of 0.6-0.7. UPS units
                are rated in VA (or kVA) and in watts (or kW). You must ensure that neither the VA
                rating nor the W rating of the UPS is exceeded.
              </p>
              <p>
                For example, a 3 kVA UPS with a 0.9 power factor can deliver 2,700 W. If your load
                is 2,500 W at 0.95 power factor, the VA load is 2,500 / 0.95 = 2,632 VA. This is
                within the 3 kVA rating and within the 2,700 W rating, so the UPS is adequate. The{' '}
                <SEOInternalLink href="/tools/power-factor-calculator">
                  power factor calculator
                </SEOInternalLink>{' '}
                helps you convert between watts and VA if you only have one value.
              </p>
            </>
          ),
        },
        {
          id: 'runtime-calculation',
          heading: 'Runtime Calculation',
          content: (
            <>
              <p>
                Runtime is the length of time the UPS can sustain the connected load on battery
                power alone, with no mains supply. It depends on the battery capacity, the load
                current, and the UPS inverter efficiency.
              </p>
              <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
                <p className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">
                  Runtime (hrs) = (Battery Ah x Battery V x Efficiency) / Load (W)
                </p>
                <p className="mt-3 text-sm text-white">
                  Typical UPS inverter efficiency is 0.85-0.95. Battery Ah must be derated for
                  discharge rate.
                </p>
              </div>
              <p>
                This formula gives a theoretical runtime. In practice, battery capacity decreases at
                high discharge rates (Peukert's effect), in cold temperatures, and as batteries age.
                A new battery rated at 100 Ah may deliver only 80 Ah at a high discharge rate, and
                only 70 Ah after three years of service.
              </p>
              <p>
                For critical applications, designers typically apply an ageing factor of 0.8
                (assuming the battery has 80% of its rated capacity at end of design life) and a
                temperature derating factor if the ambient temperature exceeds 20 degrees Celsius.
                Elec-Mate applies these factors automatically, giving you a realistic runtime
                estimate rather than an optimistic theoretical value.
              </p>
              <p>
                Common runtime requirements include 5-10 minutes for a graceful server shutdown, 30
                minutes for extended operation during short outages, and 2-8 hours for critical
                healthcare and security systems. The{' '}
                <SEOInternalLink href="/tools/electrical-load-schedule">
                  load schedule calculator
                </SEOInternalLink>{' '}
                helps you list and total all the loads that need battery backup.
              </p>
            </>
          ),
        },
        {
          id: 'battery-capacity',
          heading: 'Battery Capacity — Amp-Hours (Ah)',
          content: (
            <>
              <p>
                Battery capacity is measured in amp-hours (Ah) at a specific discharge rate. A
                battery rated at 100 Ah at the C10 rate means it can deliver 10 amps for 10 hours.
                However, the same battery may only deliver 65-75 Ah at the C1 rate (65-75 amps for 1
                hour) due to Peukert's effect — the faster you discharge a lead-acid battery, the
                less total energy you get.
              </p>
              <p>The formula to calculate the required battery capacity is:</p>
              <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
                <p className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">
                  Ah = (Load W x Runtime hrs) / (Battery V x Efficiency x Ageing Factor)
                </p>
                <p className="mt-3 text-sm text-white">
                  Typical values: efficiency 0.9, ageing factor 0.8 for end-of-life sizing
                </p>
              </div>
              <p>
                For example, a 1,000 W load requiring 30 minutes (0.5 hours) of runtime from a 48 V
                battery bank: Ah = (1,000 x 0.5) / (48 x 0.9 x 0.8) = 500 / 34.56 = 14.5 Ah. You
                would select a battery of at least 17-18 Ah to provide margin.
              </p>
              <p>
                Most UPS systems use sealed lead-acid (SLA/VRLA) batteries with a design life of 3-5
                years (standard) or 10 years (long-life). Lithium-ion batteries are increasingly
                used in modern UPS systems, offering longer life, lower weight, and better
                performance at high discharge rates. The choice affects both the initial cost and
                the ongoing replacement schedule. Understanding{' '}
                <SEOInternalLink href="/tools/three-phase-power-calculator">
                  three-phase power calculations
                </SEOInternalLink>{' '}
                is essential when sizing UPS systems for larger commercial installations.
              </p>
            </>
          ),
          appBridge: {
            title: 'Battery Ah Calculator with Derating',
            description:
              'Elec-Mate calculates the required battery Ah including discharge rate derating, temperature correction, and ageing factor. Get a realistic capacity figure, not a theoretical one.',
            icon: Gauge,
          },
        },
        {
          id: 'ups-rating-selection',
          heading: 'Selecting the Right UPS Rating',
          content: (
            <>
              <p>
                Once you know the load (in both W and VA) and the required runtime, you can select
                the UPS. The UPS rating must satisfy three requirements:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">VA rating</span> — the UPS VA rating
                  must be at least 125% of the total load VA to allow for inrush currents and future
                  growth. A 2,000 VA load requires a 2,500 VA (2.5 kVA) UPS minimum.
                </li>
                <li>
                  <span className="font-semibold text-white">Watt rating</span> — the UPS watt
                  rating must exceed the total load watts. A 3 kVA UPS with 0.9 power factor
                  delivers 2,700 W — do not connect a 2,800 W load to it.
                </li>
                <li>
                  <span className="font-semibold text-white">Battery runtime</span> — the UPS must
                  either have internal batteries sufficient for the required runtime, or support
                  external battery cabinets to extend runtime.
                </li>
              </ul>
              <p>
                Standard UPS sizes for single-phase installations are 600 VA, 1 kVA, 1.5 kVA, 2 kVA,
                3 kVA, 5 kVA, 6 kVA, and 10 kVA. For three-phase installations, sizes range from 10
                kVA to 800 kVA or more. The UPS input circuit must be protected by an appropriately
                rated MCB and the cables sized for the input current, which includes the battery
                charging current in addition to the load current.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'List all loads requiring battery backup',
          text: 'Identify every piece of equipment that must remain powered during an outage. Record the nameplate power rating in watts and the power factor for each load.',
        },
        {
          name: 'Total the load in watts and VA',
          text: 'Sum the watt values for total real power. Convert to VA using the power factor of each load: VA = W / PF. Sum the VA values for total apparent power.',
        },
        {
          name: 'Determine the required runtime',
          text: 'Decide how long the UPS must sustain the load — 5 minutes for graceful shutdown, 30 minutes for short outages, or longer for critical systems.',
        },
        {
          name: 'Enter values into the calculator',
          text: 'Input total watts, total VA, required runtime, and battery voltage. The calculator recommends the UPS kVA rating and required battery Ah.',
        },
        {
          name: 'Review and select equipment',
          text: 'Compare the calculated requirements against available UPS models. Select a UPS that meets or exceeds both the VA and watt ratings, with the required runtime.',
        },
      ]}
      howToHeading="How to Size a UPS — Step by Step"
      howToDescription="Five steps from load assessment to UPS and battery selection."
      features={[
        {
          icon: Calculator,
          title: 'Instant UPS Sizing',
          description:
            'Enter load watts, VA, and required runtime. Get an instant UPS kVA recommendation with battery Ah calculation including all derating factors.',
        },
        {
          icon: Battery,
          title: 'Battery Ah Calculator',
          description:
            'Calculates required battery capacity with Peukert derating, temperature correction, and end-of-life ageing factor for realistic sizing.',
        },
        {
          icon: Clock,
          title: 'Runtime Estimation',
          description:
            'Enter a UPS model and battery configuration to calculate expected runtime. Accounts for inverter efficiency and battery discharge characteristics.',
        },
        {
          icon: Gauge,
          title: 'Load vs Capacity Display',
          description:
            'Visual gauge showing UPS load percentage. Green for comfortable loading, amber for approaching capacity, red for overloaded.',
        },
        {
          icon: AlertTriangle,
          title: 'Overload Warnings',
          description:
            'Warns if the load exceeds the UPS VA or watt rating. Flags configurations that would result in insufficient runtime.',
        },
        {
          icon: Shield,
          title: 'BS 7671 Circuit Design',
          description:
            "Recommends MCB rating and cable size for the UPS input circuit, accounting for charging current and load current. Part of Elec-Mate's 50+ calculators.",
        },
      ]}
      featuresHeading="Battery Backup Calculator Features"
      featuresSubheading="Everything you need to correctly size UPS systems and battery banks for any application."
      faqs={[
        {
          question: 'What size UPS do I need for a server rack?',
          answer:
            'The required UPS size depends on the total power consumption of the servers, switches, and storage devices in the rack. A typical small business server rack draws 1,500-3,000 W, requiring a 3-5 kVA UPS. Measure the actual load using a power meter or calculate from the server power supply ratings. Allow 25% headroom above the measured load for inrush currents and future growth. For redundancy, many installations use N+1 UPS configurations with two smaller units rather than one large unit.',
        },
        {
          question: 'How long will a UPS last on battery?',
          answer:
            "Runtime depends on the battery capacity and the connected load. A 1 kVA UPS with internal batteries typically provides 5-15 minutes of runtime at full load. External battery cabinets can extend this to 1-4 hours. The runtime is not linear — halving the load does not double the runtime because of Peukert's effect in lead-acid batteries. Use the Elec-Mate calculator for accurate runtime estimates rather than relying on the manufacturer's simplified runtime charts.",
        },
        {
          question: 'What is the difference between online and line-interactive UPS?',
          answer:
            'An online (double-conversion) UPS continuously converts mains AC to DC and back to AC, providing the cleanest power with zero transfer time. It is recommended for sensitive equipment. A line-interactive UPS normally passes mains power through directly, switching to battery only when the mains fails — with a transfer time of 2-4 ms. Line-interactive units are cheaper and more efficient but provide less protection against power quality issues. For server rooms and data centres, online UPS is the standard choice.',
        },
        {
          question: 'How often should UPS batteries be replaced?',
          answer:
            'Standard sealed lead-acid (VRLA) batteries in UPS systems have a design life of 3-5 years and should be replaced every 3-4 years in normal conditions. High-temperature environments accelerate battery degradation — for every 10 degrees C above 20 degrees C, battery life is roughly halved. Long-life batteries have a 10-year design life but cost more. Lithium-ion batteries last 8-15 years but have a higher upfront cost. Regular battery testing (at least annually) helps predict when replacement is needed.',
        },
        {
          question: 'Do I need a dedicated circuit for a UPS?',
          answer:
            'For UPS systems above 1 kVA, a dedicated circuit is strongly recommended. The circuit must be sized for the full UPS input current, which includes both the load current and the battery charging current. A 3 kVA UPS may draw 16-20 A during normal operation (load plus charging). The circuit should be protected by an appropriately rated MCB and the cable sized in accordance with BS 7671 current-carrying capacity tables.',
        },
        {
          question: 'Can I use a UPS for emergency lighting?',
          answer:
            'A UPS can technically power emergency lighting, but purpose-built central battery emergency lighting systems are preferred because they are designed to meet BS 5266-1 requirements, including 3-hour duration, automatic testing, and fault reporting. A standard UPS does not provide the automatic testing and monitoring functions required by BS 5266-1. If a UPS is used, it must be dedicated to the emergency lighting function and must not serve other loads that could drain the battery during an outage.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/max-demand-calculator',
          title: 'Maximum Demand Calculator',
          description:
            'Calculate total maximum demand with IET diversity allowances for sizing supply and UPS systems.',
          icon: BarChart3,
          category: 'Calculators',
        },
        {
          href: '/tools/power-factor-calculator',
          title: 'Power Factor Calculator',
          description:
            'Convert between watts, VA, and kVA. Calculate power factor for UPS load assessment.',
          icon: Gauge,
          category: 'Calculators',
        },
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'Size cables for UPS input and output circuits to BS 7671 current-carrying capacity tables.',
          icon: Calculator,
          category: 'Calculators',
        },
        {
          href: '/tools/three-phase-power-calculator',
          title: 'Three-Phase Power Calculator',
          description:
            'Calculate three-phase power for larger UPS systems and commercial battery backup installations.',
          icon: Zap,
          category: 'Calculators',
        },
        {
          href: '/tools/electrical-load-schedule',
          title: 'Load Schedule Calculator',
          description:
            'Build a circuit-by-circuit load schedule to determine total UPS load with diversity applied.',
          icon: Plug,
          category: 'Calculators',
        },
        {
          href: '/tools/electrical-testing-calculators',
          title: 'All Electrical Calculators',
          description:
            '50+ BS 7671 calculators for cable sizing, Zs verification, voltage drop, and more.',
          icon: Calculator,
          category: 'Tools',
        },
      ]}
      ctaHeading="Size your UPS correctly every time"
      ctaSubheading="Join UK electricians using Elec-Mate's 50+ calculators for on-site and design work. 7-day free trial, cancel anytime."
      toolPath="/tools/battery-backup-calculator"
    />
  );
}
