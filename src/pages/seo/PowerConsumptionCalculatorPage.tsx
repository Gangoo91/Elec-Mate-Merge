import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calculator,
  Zap,
  Activity,
  PoundSterling,
  Gauge,
  BarChart3,
  Lightbulb,
  Plug,
  Cable,
  FileCheck2,
  Sun,
  Building,
} from 'lucide-react';

export default function PowerConsumptionCalculatorPage() {
  return (
    <ToolTemplate
      title="Power Consumption Calculator | kWh & Running Cost"
      description="Calculate power consumption in kWh and running costs for any electrical appliance. Convert wattage to annual energy use, compare running costs at current UK electricity rates, and identify high-consumption equipment. Part of 50+ free electrical calculators."
      datePublished="2026-02-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Power Consumption Calculator', href: '/tools/power-consumption-calculator' },
      ]}
      tocItems={[
        { id: 'understanding-power-consumption', label: 'Understanding Power Consumption' },
        { id: 'wattage-to-kwh', label: 'Wattage to kWh Conversion' },
        { id: 'uk-electricity-rates', label: 'UK Electricity Rates' },
        { id: 'common-appliance-consumption', label: 'Common Appliance Consumption' },
        { id: 'reducing-consumption', label: 'Reducing Consumption' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="UK Energy Rates"
      badgeIcon={Zap}
      heroTitle={
        <>
          <span className="text-yellow-400">Power Consumption Calculator</span> — kWh and Running
          Cost at UK Rates
        </>
      }
      heroSubtitle="Enter any appliance wattage and usage pattern. Instantly see the daily, monthly, and annual energy consumption in kWh, plus the running cost at current UK electricity rates. Compare appliances side by side to identify where energy savings are possible."
      heroFeaturePills={[
        { icon: Zap, label: 'Wattage to kWh' },
        { icon: PoundSterling, label: 'UK Running Cost' },
        { icon: BarChart3, label: 'Appliance Comparison' },
        { icon: Lightbulb, label: 'Energy Saving Tips' },
      ]}
      readingTime={8}
      keyTakeaways={[
        'Power consumption is calculated as kWh = Wattage x Hours used / 1000 — a 3kW electric heater running for 5 hours uses 15kWh, costing approximately £4.50 at current UK rates.',
        'The UK electricity unit rate under the Energy Price Guarantee is approximately 24.5p per kWh (as of early 2026), though tariffs vary by supplier and payment method.',
        'The five highest-consumption appliances in a typical UK home are the electric shower (8-10.5kW), immersion heater (3kW), electric oven (2-3kW), tumble dryer (2-3kW), and kettle (2-3kW).',
        'Standby consumption across all appliances in a typical UK household wastes approximately 300-500kWh per year — equivalent to £75-£125 annually at current rates.',
        'LED lighting uses approximately 80% less energy than traditional incandescent bulbs — replacing 10 old 60W bulbs with 8W LEDs saves approximately 1,900kWh and £465 per year.',
      ]}
      sections={[
        {
          id: 'understanding-power-consumption',
          heading: 'Understanding Power Consumption',
          content: (
            <>
              <p>
                Power consumption is the amount of electrical energy an appliance or device uses
                over a period of time. It is measured in kilowatt-hours (kWh), which is the standard
                unit used on electricity bills. One kWh is the energy consumed by a 1,000-watt
                appliance running for one hour — or equivalently, a 100-watt appliance running for
                10 hours.
              </p>
              <p>
                For electricians, understanding power consumption is essential for several reasons.
                When designing circuits, you need to know the load each appliance draws to calculate
                the{' '}
                <SEOInternalLink href="/tools/max-demand-calculator">
                  maximum demand
                </SEOInternalLink>{' '}
                of an installation. When advising customers, you can explain the running cost of
                different appliance choices — for example, comparing the cost of an electric shower
                versus a combi boiler, or an old storage heater versus a modern heat pump.
              </p>
              <p>
                The power consumption calculator converts between watts, kilowatts, amps, and kWh,
                and calculates running costs at the current UK electricity rate. It is a
                straightforward tool but one that electricians and customers use frequently —
                particularly when discussing EV charger costs, solar panel savings, or the economics
                of replacing old electrical equipment with more efficient alternatives.
              </p>
              <p>
                The calculator links directly to the{' '}
                <SEOInternalLink href="/tools/circuit-breaker-sizing-calculator">
                  circuit breaker sizing calculator
                </SEOInternalLink>{' '}
                when you need to move from power consumption assessment to circuit design.
              </p>
            </>
          ),
          appBridge: {
            title: 'Calculate Running Costs Instantly',
            description:
              'Enter any appliance wattage and hours of use. Get daily, monthly, and annual consumption in kWh plus running cost at current UK electricity rates.',
            icon: Zap,
          },
        },
        {
          id: 'wattage-to-kwh',
          heading: 'Converting Wattage to kWh',
          content: (
            <>
              <p>
                The conversion from wattage to kilowatt-hours is straightforward but is the most
                commonly requested calculation in energy assessment:
              </p>
              <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4 text-center">
                <p className="text-xl font-mono font-bold text-yellow-400">
                  kWh = (Watts x Hours) / 1000
                </p>
                <div className="mt-3 text-left max-w-md mx-auto space-y-1 text-sm text-white">
                  <p>
                    <strong className="text-yellow-400">Watts:</strong> the power rating of the
                    appliance
                  </p>
                  <p>
                    <strong className="text-yellow-400">Hours:</strong> the number of hours the
                    appliance runs
                  </p>
                  <p>
                    <strong className="text-yellow-400">1000:</strong> conversion from watts to
                    kilowatts
                  </p>
                </div>
              </div>
              <p>
                For example, an electric radiator rated at 2,000W (2kW) running for 8 hours per day:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <ul className="space-y-1 text-white text-sm">
                  <li>
                    <strong className="text-yellow-400">Daily:</strong> 2,000 x 8 / 1,000 = 16 kWh
                  </li>
                  <li>
                    <strong className="text-yellow-400">Monthly (30 days):</strong> 16 x 30 = 480
                    kWh
                  </li>
                  <li>
                    <strong className="text-yellow-400">Annual (365 days):</strong> 16 x 365 = 5,840
                    kWh
                  </li>
                  <li>
                    <strong className="text-yellow-400">Annual cost at 24.5p/kWh:</strong> 5,840 x
                    0.245 = £1,430.80
                  </li>
                </ul>
              </div>
              <p>
                This calculation assumes the appliance runs at full power for the stated duration.
                In reality, many appliances cycle on and off (such as a fridge or thermostatically
                controlled heater), so the actual consumption may be lower than the rated wattage
                would suggest. The power consumption calculator allows you to enter both the rated
                wattage and an estimated duty cycle to give a more accurate result.
              </p>
            </>
          ),
        },
        {
          id: 'uk-electricity-rates',
          heading: 'UK Electricity Rates (2025-2026)',
          content: (
            <>
              <p>
                Electricity prices in the UK are regulated by the Energy Price Guarantee, which sets
                a cap on the unit rate and standing charge that energy suppliers can charge domestic
                customers. As of early 2026, the typical UK electricity rate is approximately 24.5p
                per kWh, though this varies by supplier, tariff type, and payment method.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <p className="font-semibold text-white mb-3">Typical UK electricity rates:</p>
                <ul className="space-y-1 text-white text-sm">
                  <li>
                    <strong className="text-yellow-400">Standard variable tariff:</strong> 24-25p
                    per kWh
                  </li>
                  <li>
                    <strong className="text-yellow-400">Fixed tariff:</strong> 22-28p per kWh
                    (depends on provider and term)
                  </li>
                  <li>
                    <strong className="text-yellow-400">Economy 7 (off-peak):</strong> 10-14p per
                    kWh (overnight rate)
                  </li>
                  <li>
                    <strong className="text-yellow-400">Economy 7 (peak):</strong> 28-35p per kWh
                    (daytime rate)
                  </li>
                  <li>
                    <strong className="text-yellow-400">EV charger tariff:</strong> 7-10p per kWh
                    (overnight charging windows)
                  </li>
                  <li>
                    <strong className="text-yellow-400">Solar export (SEG):</strong> 4-15p per kWh
                    (varies by supplier)
                  </li>
                </ul>
              </div>
              <p>
                The standing charge (approximately 55-60p per day) is a fixed daily fee regardless
                of consumption. This means the effective cost per kWh is higher for low-consumption
                households. For electricians advising customers on{' '}
                <SEOInternalLink href="/tools/solar-panel-sizing-calculator">
                  solar panel installations
                </SEOInternalLink>{' '}
                or{' '}
                <SEOInternalLink href="/tools/ev-charger-load-calculator">
                  EV charger economics
                </SEOInternalLink>
                , understanding the tariff structure is essential for accurate cost-benefit
                calculations.
              </p>
            </>
          ),
        },
        {
          id: 'common-appliance-consumption',
          heading: 'Common Appliance Power Consumption',
          content: (
            <>
              <p>
                Understanding the power consumption of common household appliances helps
                electricians advise customers on energy efficiency, circuit loading, and the
                economics of equipment upgrades. Below are typical consumption figures for common UK
                household appliances:
              </p>
              <div className="space-y-3 my-4">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <h4 className="font-bold text-yellow-400 mb-3">High-Consumption Appliances</h4>
                  <ul className="space-y-1 text-white text-sm">
                    <li className="flex justify-between">
                      <span>Electric shower (9.5kW)</span>
                      <span className="text-yellow-400">~1,700 kWh/year</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Immersion heater (3kW)</span>
                      <span className="text-yellow-400">~2,000 kWh/year</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Electric oven (2.5kW)</span>
                      <span className="text-yellow-400">~600 kWh/year</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Tumble dryer (2.5kW)</span>
                      <span className="text-yellow-400">~500 kWh/year</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Washing machine (2kW)</span>
                      <span className="text-yellow-400">~250 kWh/year</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <h4 className="font-bold text-yellow-400 mb-3">
                    Moderate-Consumption Appliances
                  </h4>
                  <ul className="space-y-1 text-white text-sm">
                    <li className="flex justify-between">
                      <span>Fridge-freezer</span>
                      <span className="text-yellow-400">~250-400 kWh/year</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Dishwasher</span>
                      <span className="text-yellow-400">~250 kWh/year</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Television (55-inch LED)</span>
                      <span className="text-yellow-400">~100-150 kWh/year</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Desktop computer</span>
                      <span className="text-yellow-400">~150-300 kWh/year</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Kettle (3kW)</span>
                      <span className="text-yellow-400">~120-170 kWh/year</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <h4 className="font-bold text-yellow-400 mb-3">Low-Consumption Appliances</h4>
                  <ul className="space-y-1 text-white text-sm">
                    <li className="flex justify-between">
                      <span>LED light bulb (8W)</span>
                      <span className="text-yellow-400">~12 kWh/year</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Phone charger (5W)</span>
                      <span className="text-yellow-400">~4 kWh/year</span>
                    </li>
                    <li className="flex justify-between">
                      <span>WiFi router (12W)</span>
                      <span className="text-yellow-400">~105 kWh/year</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Laptop charger (45-65W)</span>
                      <span className="text-yellow-400">~40-60 kWh/year</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p>
                These figures assume typical UK usage patterns. Actual consumption varies with
                individual usage habits. The Elec-Mate power consumption calculator includes a
                database of common UK appliances with preset wattages, so you can quickly estimate
                the total household consumption or compare alternatives for your customers.
              </p>
            </>
          ),
          appBridge: {
            title: 'Compare Appliance Running Costs',
            description:
              'Add multiple appliances and see the total daily, monthly, and annual consumption and cost. Identify the biggest energy users and compare efficient alternatives.',
            icon: BarChart3,
          },
        },
        {
          id: 'reducing-consumption',
          heading: 'Reducing Power Consumption — Advice for Customers',
          content: (
            <>
              <p>
                As electricians, customers frequently ask for advice on reducing their electricity
                bills. The power consumption calculator helps you quantify the savings from
                different efficiency measures:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>
                  <strong className="text-white">LED lighting:</strong> Replacing 10 old 60W
                  incandescent or halogen bulbs with 8W LEDs saves approximately 1,900kWh per year
                  (assuming 5 hours daily use) — that is approximately £465 at current rates.
                </li>
                <li>
                  <strong className="text-white">Smart controls:</strong> Installing timers and
                  smart switches on immersion heaters, storage heaters, and other high-consumption
                  appliances can reduce unnecessary operation by 20-30%.
                </li>
                <li>
                  <strong className="text-white">EV smart charging:</strong> Charging an EV on an
                  off-peak tariff (7-10p per kWh) instead of the standard rate (24.5p) can save over
                  £600 per year for a typical 10,000-mile driver.
                </li>
                <li>
                  <strong className="text-white">Solar PV:</strong> A 4kWp{' '}
                  <SEOInternalLink href="/tools/solar-panel-sizing-calculator">
                    solar panel system
                  </SEOInternalLink>{' '}
                  generating 3,600kWh per year with 40% self-consumption saves approximately £350
                  per year plus export income.
                </li>
                <li>
                  <strong className="text-white">Standby elimination:</strong> Using switched socket
                  strips and turning off appliances at the wall can save 300-500kWh per year
                  (£75-£125).
                </li>
              </ul>
              <p>
                The{' '}
                <SEOInternalLink href="/tools/electrical-testing-calculators">
                  electrical calculator suite
                </SEOInternalLink>{' '}
                in Elec-Mate includes energy efficiency calculations alongside the standard BS 7671
                tools, giving you a comprehensive toolkit for both installation work and customer
                advisory.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Find the appliance wattage',
          text: 'Check the rating plate on the appliance (usually on the back or base) for the power rating in watts (W) or kilowatts (kW). If only amps are shown, multiply by the voltage (typically 230V) to get watts.',
        },
        {
          name: 'Estimate the daily usage hours',
          text: 'Determine how many hours per day the appliance runs. For cycling appliances (fridge, heater), estimate the percentage of time the compressor or element is actually running — typically 30-50% of the time the appliance is switched on.',
        },
        {
          name: 'Calculate daily kWh',
          text: 'Multiply the wattage by the hours of use, then divide by 1,000 to get the daily consumption in kWh. For example, a 2,000W heater running for 5 hours: 2,000 x 5 / 1,000 = 10 kWh per day.',
        },
        {
          name: 'Calculate the running cost',
          text: 'Multiply the daily kWh by the electricity unit rate (approximately 24.5p per kWh). Then multiply by 30 for monthly cost or 365 for annual cost. In the example above: 10 kWh x 24.5p = £2.45 per day, £73.50 per month, £894.25 per year.',
        },
        {
          name: 'Compare and optimise',
          text: 'Calculate the consumption of alternative appliances or efficiency measures. Compare the running costs side by side to quantify the potential savings. Use this information to advise customers or to assess the payback period of equipment upgrades.',
        },
      ]}
      howToHeading="How to Calculate Power Consumption"
      howToDescription="Five steps to calculate the energy consumption and running cost of any electrical appliance."
      features={[
        {
          icon: Calculator,
          title: 'Wattage to kWh Conversion',
          description:
            'Enter the appliance wattage and usage hours. Get daily, weekly, monthly, and annual consumption in kWh instantly with clear unit breakdowns.',
        },
        {
          icon: PoundSterling,
          title: 'UK Running Cost Calculator',
          description:
            'Calculates running costs at current UK electricity rates. Supports standard, Economy 7, and custom tariff rates for accurate cost estimates.',
        },
        {
          icon: BarChart3,
          title: 'Appliance Comparison Tool',
          description:
            'Compare the running costs of different appliances or efficiency alternatives side by side. Quantify savings from upgrades like LED lighting or efficient heating.',
        },
        {
          icon: Plug,
          title: 'Common Appliance Database',
          description:
            'Built-in database of UK appliance wattages. Select from common items like kettles, showers, heaters, and ovens without needing to look up the rating plate.',
        },
        {
          icon: Lightbulb,
          title: 'Energy Saving Calculations',
          description:
            'Calculates potential savings from efficiency measures. Compare old versus new equipment, LED versus halogen, peak versus off-peak charging, and more.',
        },
        {
          icon: Gauge,
          title: 'Works Offline',
          description:
            'Calculate power consumption and running costs anywhere with no internet connection. All appliance data and tariff rates stored locally on your device.',
        },
      ]}
      featuresHeading="Power Consumption Calculator Features"
      featuresSubheading="Calculate energy consumption and running costs for any appliance at current UK electricity rates."
      faqs={[
        {
          question: 'How do I calculate the running cost of an appliance?',
          answer:
            'To calculate the running cost, multiply the appliance wattage by the number of hours it runs, divide by 1,000 to convert to kWh, then multiply by the electricity unit rate. For example, a 2,000W fan heater running for 4 hours per day: (2,000 x 4) / 1,000 = 8 kWh per day. At 24.5p per kWh, that costs £1.96 per day, £58.80 per month, or £715.40 per year. For appliances that cycle (like fridges and thermostats), use the estimated actual running time rather than the total hours the appliance is plugged in.',
        },
        {
          question: 'How many kWh does a typical UK household use per year?',
          answer:
            'A typical UK household uses approximately 2,900 kWh per year (Ofgem medium consumption figure for a standard tariff customer). However, this varies widely: a single-person flat might use 1,500-2,000 kWh, while a larger family home with electric heating, an EV charger, or multiple occupants could use 5,000-8,000 kWh or more. Homes with electric central heating, heat pumps, or EV charging consume significantly more. The average has been increasing as households electrify heating and transport.',
        },
        {
          question: 'What is the most expensive appliance to run in a UK home?',
          answer:
            'The most expensive appliance to run depends on both the wattage and usage duration. An immersion heater (3kW) running for 2 hours daily costs approximately £535 per year. An electric shower (9.5kW) used for 30 minutes daily costs approximately £425 per year. Storage heaters or electric radiators can cost £500-£1,500 per year depending on the number and usage. A tumble dryer (2.5kW) used 4 times per week costs approximately £125 per year. The single highest annual cost is usually space heating if the property uses electric heating rather than gas.',
        },
        {
          question: 'How much does it cost to charge an electric car at home?',
          answer:
            'At the standard UK electricity rate of approximately 24.5p per kWh, charging a typical 60kWh EV battery from empty to full costs approximately £14.70. Most drivers charge from approximately 20% to 80%, costing around £8.80 per charge. If you drive 10,000 miles per year with an efficiency of 3.5 miles per kWh, annual charging costs approximately £700 at the standard rate. On an off-peak EV tariff (7-10p per kWh), the same annual charging costs only £200-£285 — a significant saving that the Elec-Mate calculator can quantify for your customers.',
        },
        {
          question: 'How much energy does LED lighting save compared to halogen?',
          answer:
            'LED bulbs use approximately 80-90% less energy than halogen or incandescent equivalents. A 50W halogen downlight replaced with a 5W LED equivalent saves 45W per bulb. If a kitchen has 8 downlights running for 5 hours per day, the halogen consumption is 8 x 50W x 5h / 1,000 = 2 kWh per day (£178.85 per year). The LED consumption is 8 x 5W x 5h / 1,000 = 0.2 kWh per day (£17.89 per year). Annual saving: £160.96 for just one room. Across a whole house with 20-30 halogen fittings, the total saving can exceed £400-£500 per year.',
        },
        {
          question: 'What is the difference between watts and kilowatt-hours?',
          answer:
            'Watts (W) measure power — the rate at which energy is used at any given moment. Kilowatt-hours (kWh) measure energy — the total amount of electricity consumed over a period of time. A 100W light bulb draws 100 watts of power. If it runs for 10 hours, it consumes 100 x 10 / 1,000 = 1 kWh of energy. Your electricity bill charges per kWh, not per watt. Two appliances with the same wattage can have very different running costs if one runs for longer. A 3kW kettle used for 10 minutes costs 1.2p, while a 3kW heater running for 8 hours costs £5.88.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/max-demand-calculator',
          title: 'Maximum Demand Calculator',
          description:
            'Calculate the total maximum demand for an electrical installation with diversity factors.',
          icon: BarChart3,
          category: 'Calculators',
        },
        {
          href: '/tools/solar-panel-sizing-calculator',
          title: 'Solar Panel Sizing Calculator',
          description:
            'Size a solar PV system for UK properties with yield estimates and battery guidance.',
          icon: Sun,
          category: 'Calculators',
        },
        {
          href: '/tools/ev-charger-load-calculator',
          title: 'EV Charger Load Calculator',
          description:
            'Calculate EV charger electrical load, running costs, and supply capacity requirements.',
          icon: Zap,
          category: 'Calculators',
        },
        {
          href: '/tools/circuit-breaker-sizing-calculator',
          title: 'Circuit Breaker Sizing Calculator',
          description:
            'Select the correct MCB rating based on appliance power consumption and circuit design current.',
          icon: Activity,
          category: 'Calculators',
        },
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'Size cables to BS 7671 based on the design current derived from power consumption calculations.',
          icon: Cable,
          category: 'Calculators',
        },
        {
          href: '/tools/electrical-testing-calculators',
          title: 'All 50+ Calculators',
          description:
            'Browse the full suite of BS 7671 electrical calculators for testing, sizing, and design.',
          icon: Calculator,
          category: 'Tools',
        },
      ]}
      ctaHeading="Calculate power consumption and running costs instantly"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for energy calculations, circuit design, and certification. 7-day free trial, cancel anytime."
      toolPath="/tools/power-consumption-calculator"
    />
  );
}
