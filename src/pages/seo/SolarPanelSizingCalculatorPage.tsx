import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calculator,
  Sun,
  Zap,
  Activity,
  Shield,
  Cable,
  FileCheck2,
  Gauge,
  Battery,
  BarChart3,
  Compass,
  Building,
} from 'lucide-react';

export default function SolarPanelSizingCalculatorPage() {
  return (
    <ToolTemplate
      title="Solar Panel Sizing Calculator UK | Free Tool"
      description="Calculate solar panel system size for UK installations. Determine kWp capacity, estimate annual yield based on roof orientation and tilt, assess battery storage requirements, and check G98/G99 grid connection limits. Part of 50+ free electrical calculators."
      datePublished="2026-01-30"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Solar Panel Sizing Calculator', href: '/tools/solar-panel-sizing-calculator' },
      ]}
      tocItems={[
        { id: 'solar-sizing-basics', label: 'Solar Sizing Basics' },
        { id: 'kwp-calculation', label: 'kWp Calculation' },
        { id: 'roof-orientation', label: 'Roof Orientation and Tilt' },
        { id: 'annual-yield', label: 'Annual Yield Estimation' },
        { id: 'battery-sizing', label: 'Battery Storage Sizing' },
        { id: 'g98-g99', label: 'G98/G99 Grid Connection' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="UK Solar Data"
      badgeIcon={Sun}
      heroTitle={
        <>
          <span className="text-yellow-400">Solar Panel Sizing Calculator</span> — Design PV Systems
          for UK Roofs
        </>
      }
      heroSubtitle="Calculate the optimal solar panel system size for any UK property. Enter the roof dimensions, orientation, and electricity consumption. Get a recommended kWp capacity, estimated annual yield, battery sizing guidance, and G98/G99 grid connection classification."
      heroFeaturePills={[
        { icon: Sun, label: 'kWp Calculation' },
        { icon: Compass, label: 'Orientation Factor' },
        { icon: Battery, label: 'Battery Sizing' },
        { icon: Shield, label: 'G98/G99 Limits' },
      ]}
      readingTime={11}
      keyTakeaways={[
        'A typical UK domestic solar PV system is 3-4kWp, using 8-10 panels of 400-430W each, and generates approximately 3,000-4,000kWh per year depending on location and orientation.',
        'South-facing roofs at a tilt of 30-40 degrees produce the highest annual yield in the UK — approximately 850-1,050kWh per kWp installed, depending on geographic location.',
        'East and west-facing systems produce approximately 85-90% of the yield of a south-facing system, but spread generation more evenly across the day, which can improve self-consumption.',
        'Systems up to 3.68kW (single-phase) or 11.04kW (three-phase) can connect under G98 (simplified notification). Larger systems require G99 (full application) to the DNO.',
        'Battery storage of 5-10kWh is typical for domestic systems, allowing surplus daytime generation to be stored for evening use and increasing self-consumption from 30-40% to 60-80%.',
      ]}
      sections={[
        {
          id: 'solar-sizing-basics',
          heading: 'Solar Panel Sizing Basics for UK Installations',
          content: (
            <>
              <p>
                Solar panel sizing is the process of determining the optimal system capacity
                (measured in kilowatts peak, or kWp) for a specific property. The goal is to match
                the solar generation to the property's electricity consumption, available roof
                space, and budget — while complying with grid connection regulations and building
                regulations.
              </p>
              <p>
                In the UK, solar panel installations have grown significantly. With electricity
                prices remaining above 20p per kWh, a well-sized solar PV system can save a typical
                household between £500 and £1,200 per year on electricity bills, depending on the
                system size, self-consumption rate, and whether battery storage is included.
              </p>
              <p>
                For electricians, solar PV represents one of the fastest-growing areas of work. The
                electrical installation must comply with BS 7671 Part 712 (Solar Photovoltaic Power
                Supply Systems), and the grid connection must meet Engineering Recommendation G98 or
                G99. The{' '}
                <SEOInternalLink href="/tools/eic-certificate">EIC certificate</SEOInternalLink> for
                the solar installation must record the system details, inverter specifications, and
                AC/DC isolation arrangements.
              </p>
              <p>
                The Elec-Mate solar sizing calculator handles the design calculations, while the{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                and{' '}
                <SEOInternalLink href="/tools/voltage-drop-calculator">
                  voltage drop calculator
                </SEOInternalLink>{' '}
                verify the AC and DC cabling for the installation.
              </p>
            </>
          ),
          appBridge: {
            title: 'Size Solar PV Systems in Minutes',
            description:
              'Enter the roof dimensions, orientation, and electricity consumption. The calculator recommends the optimal kWp, estimates annual yield, and checks G98/G99 limits.',
            icon: Sun,
          },
        },
        {
          id: 'kwp-calculation',
          heading: 'kWp Calculation — How Many Panels Do You Need?',
          content: (
            <>
              <p>
                The system capacity in kilowatts peak (kWp) is determined by the number and wattage
                of the solar panels. Modern residential solar panels typically range from 370W to
                430W per panel. A standard UK domestic system uses 8-12 panels, giving a total
                capacity of 3-5kWp.
              </p>
              <p>
                The kWp calculation starts with either the available roof space or the desired
                annual generation. Working from roof space:
              </p>
              <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4 text-center">
                <p className="text-xl font-mono font-bold text-yellow-400">
                  Number of panels = Available area / Panel area
                </p>
                <p className="text-xl font-mono font-bold text-yellow-400 mt-2">
                  System kWp = Number of panels x Panel wattage / 1000
                </p>
                <div className="mt-3 text-left max-w-md mx-auto space-y-1 text-sm text-white">
                  <p>
                    <strong className="text-yellow-400">Standard panel size:</strong> approximately
                    1.7m x 1.0m (1.7m²)
                  </p>
                  <p>
                    <strong className="text-yellow-400">Typical panel wattage:</strong> 400W
                    (0.4kWp)
                  </p>
                  <p>
                    <strong className="text-yellow-400">10 panels:</strong> 10 x 0.4 = 4.0kWp system
                  </p>
                </div>
              </div>
              <p>
                Working from electricity consumption: a typical UK household uses 3,000-4,000kWh per
                year. In southern England, each kWp generates approximately 900-1,000kWh per year on
                a south-facing roof. So a 3.5-4.0kWp system roughly matches the annual consumption
                of an average household — though not all generation will be consumed on site due to
                the mismatch between generation (daytime) and consumption (evening).
              </p>
            </>
          ),
        },
        {
          id: 'roof-orientation',
          heading: 'Roof Orientation and Tilt Angle',
          content: (
            <>
              <p>
                The orientation (compass direction) and tilt angle of the roof have a significant
                impact on the annual energy yield of a solar PV system. In the UK, the optimal
                orientation is due south (180° azimuth) at a tilt angle of 30-40 degrees. This
                maximises exposure to the sun throughout the year.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <p className="font-semibold text-white mb-3">
                  Orientation factors (relative to south-facing at 30° tilt):
                </p>
                <ul className="space-y-1 text-white text-sm">
                  <li>
                    <strong className="text-yellow-400">South (180°):</strong> 100% — optimal
                    orientation
                  </li>
                  <li>
                    <strong className="text-yellow-400">South-east / South-west:</strong> 95-97% —
                    minimal loss
                  </li>
                  <li>
                    <strong className="text-yellow-400">East (90°) / West (270°):</strong> 85-90% —
                    good for spreading generation
                  </li>
                  <li>
                    <strong className="text-yellow-400">North-east / North-west:</strong> 65-75% —
                    reduced but viable
                  </li>
                  <li>
                    <strong className="text-yellow-400">North (0°):</strong> 55-65% — generally not
                    recommended
                  </li>
                </ul>
              </div>
              <p>
                East and west-facing systems are increasingly popular because they spread generation
                across the morning and afternoon, improving self-consumption rates. A split system —
                panels on both east and west-facing roof slopes — can generate similar total energy
                to a south-facing system while providing a more useful generation profile for
                households that are occupied during the day.
              </p>
              <p>
                Shading from trees, chimneys, dormers, and neighbouring buildings reduces yield.
                Even partial shading of a single panel can significantly reduce the output of the
                entire string (unless optimisers or microinverters are used). A thorough site survey
                is essential before finalising the panel layout.
              </p>
            </>
          ),
        },
        {
          id: 'annual-yield',
          heading: 'Estimating Annual Yield in the UK',
          content: (
            <>
              <p>
                The annual energy yield of a solar PV system depends on the system size (kWp),
                geographic location (solar irradiance), orientation, tilt, shading, and system
                losses. In the UK, the expected yield varies significantly by region:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <p className="font-semibold text-white mb-3">
                  Typical annual yield per kWp installed (south-facing, 30° tilt):
                </p>
                <ul className="space-y-1 text-white text-sm">
                  <li>
                    <strong className="text-yellow-400">South-west England:</strong> 1,000-1,050
                    kWh/kWp
                  </li>
                  <li>
                    <strong className="text-yellow-400">South-east England:</strong> 950-1,000
                    kWh/kWp
                  </li>
                  <li>
                    <strong className="text-yellow-400">Midlands:</strong> 880-930 kWh/kWp
                  </li>
                  <li>
                    <strong className="text-yellow-400">North England:</strong> 830-880 kWh/kWp
                  </li>
                  <li>
                    <strong className="text-yellow-400">Scotland:</strong> 780-850 kWh/kWp
                  </li>
                  <li>
                    <strong className="text-yellow-400">Northern Ireland:</strong> 800-870 kWh/kWp
                  </li>
                </ul>
              </div>
              <p>
                System losses typically account for 10-20% reduction from the theoretical maximum
                yield. These include inverter efficiency (typically 96-98%), cable losses (1-2%),
                panel degradation over time (0.5% per year), soiling (1-3%), and temperature losses
                (panels are less efficient above 25°C). The Elec-Mate calculator applies standard
                loss factors to give a realistic yield estimate.
              </p>
              <p>
                For financial calculations, multiply the annual yield by the current electricity
                rate (typically 20-30p per kWh) to estimate the annual saving. The{' '}
                <SEOInternalLink href="/tools/power-consumption-calculator">
                  power consumption calculator
                </SEOInternalLink>{' '}
                can help assess the household consumption profile to determine what proportion of
                solar generation will be consumed on site versus exported to the grid.
              </p>
            </>
          ),
          appBridge: {
            title: 'UK-Specific Yield Estimates',
            description:
              'The solar calculator uses UK solar irradiance data by region to give accurate yield estimates. Enter your postcode area and get a location-specific prediction.',
            icon: BarChart3,
          },
        },
        {
          id: 'battery-sizing',
          heading: 'Battery Storage Sizing',
          content: (
            <>
              <p>
                Battery storage allows surplus solar generation during the day to be stored and used
                in the evening when household consumption is highest. Without a battery, a typical
                household self-consumes only 30-40% of solar generation — the remainder is exported
                to the grid at a lower rate (typically 4-15p per kWh under the Smart Export
                Guarantee). With a correctly sized battery, self-consumption can increase to 60-80%.
              </p>
              <p>
                The optimal battery size depends on the daily surplus generation and evening
                consumption pattern. For a typical 4kWp system generating 10-12kWh per day in
                summer, a 5-10kWh battery captures most of the surplus without being oversized for
                winter when generation is lower.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <p className="font-semibold text-white mb-3">Typical battery sizing guidance:</p>
                <ul className="space-y-1 text-white text-sm">
                  <li>
                    <strong className="text-yellow-400">Small system (2-3kWp):</strong> 3-5kWh
                    battery
                  </li>
                  <li>
                    <strong className="text-yellow-400">Medium system (3-5kWp):</strong> 5-10kWh
                    battery
                  </li>
                  <li>
                    <strong className="text-yellow-400">Large system (5-8kWp):</strong> 10-13kWh
                    battery
                  </li>
                  <li>
                    <strong className="text-yellow-400">Very large (8kWp+):</strong> 13-20kWh or
                    multiple units
                  </li>
                </ul>
              </div>
              <p>
                Battery installations require specific electrical design considerations under BS
                7671 Part 712 and the battery manufacturer's installation requirements. Isolation,
                ventilation, and fire safety must be considered. The{' '}
                <SEOInternalLink href="/tools/electrical-testing-calculators">
                  electrical testing calculators
                </SEOInternalLink>{' '}
                in Elec-Mate include tests specific to battery energy storage systems.
              </p>
            </>
          ),
        },
        {
          id: 'g98-g99',
          heading: 'G98 and G99 Grid Connection Requirements',
          content: (
            <>
              <p>
                Any solar PV system connected to the electricity grid must comply with the relevant
                Engineering Recommendation for grid connection. The classification depends on the
                total generation capacity:
              </p>
              <div className="grid gap-4 sm:grid-cols-2 my-4">
                <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
                  <h4 className="font-bold text-yellow-400 text-lg mb-2">G98 — Simplified</h4>
                  <p className="text-white text-sm mb-2">For systems up to and including:</p>
                  <ul className="space-y-1 text-white text-sm">
                    <li>3.68kW per phase (single-phase)</li>
                    <li>11.04kW total (three-phase)</li>
                  </ul>
                  <p className="text-white text-sm mt-2">
                    Notification only — inform the DNO within 28 days of commissioning. No
                    pre-approval required.
                  </p>
                </div>
                <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
                  <h4 className="font-bold text-yellow-400 text-lg mb-2">G99 — Full Application</h4>
                  <p className="text-white text-sm mb-2">For systems exceeding:</p>
                  <ul className="space-y-1 text-white text-sm">
                    <li>3.68kW per phase (single-phase)</li>
                    <li>11.04kW total (three-phase)</li>
                  </ul>
                  <p className="text-white text-sm mt-2">
                    Full application to the DNO required before installation. May require network
                    studies and reinforcement works.
                  </p>
                </div>
              </div>
              <p>
                The G98 limit of 3.68kW per phase is based on 16A at 230V. This means most domestic
                single-phase systems of up to approximately 9 panels (9 x 410W = 3.69kWp) are close
                to the G98 boundary. The Elec-Mate calculator checks the inverter AC output against
                the G98/G99 threshold and flags when a G99 application is required.
              </p>
              <p>
                It is important to note that the G98/G99 limit applies to the inverter AC output
                power, not the panel DC capacity. A 4kWp panel array with a 3.6kW inverter would
                qualify under G98 because the AC export is limited to 3.6kW. The{' '}
                <SEOInternalLink href="/guides/bs7671-eighteenth-edition">
                  BS 7671 eighteenth edition
                </SEOInternalLink>{' '}
                provides the regulatory framework for the electrical installation side.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Survey the roof',
          text: 'Measure the available roof area, note the orientation (compass bearing), tilt angle, and any shading obstructions. Each panel requires approximately 1.7m² of unshaded roof space.',
        },
        {
          name: 'Determine electricity consumption',
          text: 'Check the property electricity bills or smart meter data to find the annual consumption in kWh. A typical UK household uses 3,000-4,000kWh per year. Higher consumption supports a larger system.',
        },
        {
          name: 'Calculate the system size',
          text: 'Divide the available roof area by the panel area to find the maximum number of panels. Multiply by the panel wattage to get the system kWp. Compare against the consumption to check the system is appropriately sized.',
        },
        {
          name: 'Estimate the annual yield',
          text: 'Multiply the system kWp by the location-specific yield factor (800-1,050kWh per kWp depending on UK region) and adjust for orientation and tilt. Apply system loss factors (typically 15-20%).',
        },
        {
          name: 'Check G98/G99 classification',
          text: 'Compare the inverter AC output power against the G98 limit (3.68kW single-phase, 11.04kW three-phase). If the system exceeds these limits, a G99 application to the DNO is required before installation.',
        },
      ]}
      howToHeading="How to Size a Solar PV System"
      howToDescription="Five steps to calculate the optimal solar panel system size for a UK property."
      features={[
        {
          icon: Sun,
          title: 'kWp System Sizing',
          description:
            'Calculate the optimal system capacity based on roof space, electricity consumption, and budget. Supports panels from 300W to 450W with standard dimensions.',
        },
        {
          icon: Compass,
          title: 'Orientation and Tilt Factors',
          description:
            'Apply UK-specific orientation and tilt correction factors. Calculates yield for south, east, west, and split-orientation systems with any roof pitch.',
        },
        {
          icon: BarChart3,
          title: 'Annual Yield Estimation',
          description:
            'Region-specific UK yield data from Cornwall to Scotland. Applies standard system loss factors for realistic energy generation predictions.',
        },
        {
          icon: Battery,
          title: 'Battery Sizing Guidance',
          description:
            'Recommends battery capacity based on surplus generation and consumption patterns. Calculates self-consumption improvement with and without storage.',
        },
        {
          icon: Shield,
          title: 'G98/G99 Classification',
          description:
            'Automatically checks the inverter AC output against G98/G99 grid connection limits and advises whether simplified notification or full DNO application is required.',
        },
        {
          icon: Gauge,
          title: 'Financial Payback Estimate',
          description:
            'Estimates annual savings based on current UK electricity rates and export tariffs. Calculates simple payback period for the system investment.',
        },
      ]}
      featuresHeading="Solar Sizing Calculator Features"
      featuresSubheading="Complete solar PV system design tool for UK electricians — from panel layout to grid connection classification."
      faqs={[
        {
          question: 'How many solar panels do I need for a 3-bedroom house?',
          answer:
            'A typical 3-bedroom UK house uses approximately 3,000-3,500kWh of electricity per year and usually has enough south or east/west-facing roof space for 8-12 panels. Using 400W panels, 10 panels would give a 4kWp system generating approximately 3,400-4,000kWh per year (depending on location and orientation) — roughly matching the annual consumption. However, the optimal number depends on the specific roof dimensions, shading, orientation, budget, and whether battery storage is included. More panels are worthwhile if you have an EV charger or heat pump that increases electricity consumption.',
        },
        {
          question: 'What is the maximum solar panel system under G98?',
          answer:
            'Under G98 (simplified notification), the maximum inverter AC output is 3.68kW per phase for single-phase connections (16A at 230V) and 11.04kW total for three-phase connections. This is an inverter limit, not a panel limit. You can install more panel capacity (kWp) than the inverter rating — for example, a 4.5kWp panel array with a 3.6kW inverter qualifies under G98 because the AC output is limited to 3.6kW. This "oversizing" of panels relative to the inverter is common and improves performance in low-light conditions.',
        },
        {
          question: 'Which roof orientation is best for solar panels in the UK?',
          answer:
            'Due south (180° compass bearing) at a tilt angle of 30-40 degrees produces the highest annual yield in the UK. However, south-east and south-west orientations produce 95-97% of the south-facing yield and are excellent choices. East and west-facing systems produce 85-90% of the south-facing yield but spread generation across the morning and afternoon, which can improve self-consumption for households occupied during the day. Even north-facing roofs can produce 55-65% of the south-facing yield, though this is generally not recommended for cost-effectiveness.',
        },
        {
          question: 'How much electricity does a 4kWp solar system generate in the UK?',
          answer:
            'A 4kWp solar PV system in the UK typically generates between 3,200 and 4,200kWh per year, depending on the location and orientation. In south-west England with a south-facing roof at 30° tilt, expect approximately 4,000-4,200kWh per year. In Scotland with the same orientation, expect approximately 3,200-3,400kWh. East or west-facing systems produce approximately 85-90% of these figures. Generation is heavily weighted towards spring and summer — a 4kWp system might generate 15-20kWh per day in June but only 3-5kWh per day in December.',
        },
        {
          question: 'What size battery do I need with solar panels?',
          answer:
            'For a typical 3-5kWp domestic solar system, a battery capacity of 5-10kWh is usually optimal. The battery should be sized to store the daily surplus generation — the difference between what the panels produce and what the household consumes during daylight hours. For a household that is away during the day (typical UK pattern), approximately 60-70% of a 4kWp system generation is surplus and could be stored. A 5kWh battery captures most of the surplus in winter and shoulder months, while a 10kWh battery is better for maximising summer self-consumption. Oversizing the battery is generally not cost-effective as it will rarely be fully charged in winter.',
        },
        {
          question: 'Do I need to notify the DNO when installing solar panels?',
          answer:
            'Yes. All grid-connected solar PV systems require notification to the distribution network operator (DNO). For systems up to 3.68kW per phase (single-phase) or 11.04kW total (three-phase), the G98 simplified notification process applies — you simply notify the DNO within 28 days of commissioning using a standard form. For larger systems, a G99 full application must be submitted before installation. The DNO has 45 working days to respond and may require network studies or reinforcement works. The installer is responsible for submitting the notification or application. Failure to notify the DNO is a common compliance issue found during inspections.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/power-consumption-calculator',
          title: 'Power Consumption Calculator',
          description:
            'Calculate annual electricity consumption and running costs for individual appliances and whole households.',
          icon: Activity,
          category: 'Calculators',
        },
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'Size AC and DC cables for solar PV installations to BS 7671 with voltage drop checks.',
          icon: Cable,
          category: 'Calculators',
        },
        {
          href: '/tools/ev-charger-load-calculator',
          title: 'EV Charger Load Calculator',
          description:
            'Assess the combined load of EV charging and solar PV on the domestic supply.',
          icon: Zap,
          category: 'Calculators',
        },
        {
          href: '/tools/max-demand-calculator',
          title: 'Maximum Demand Calculator',
          description:
            'Calculate total installation demand including solar PV export and battery storage.',
          icon: BarChart3,
          category: 'Calculators',
        },
        {
          href: '/tools/eic-certificate',
          title: 'EIC Certificate',
          description:
            'Issue an Electrical Installation Certificate for solar PV installations with BS 7671 Part 712 compliance.',
          icon: FileCheck2,
          category: 'Certificates',
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
      ctaHeading="Design solar PV systems with precision"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for solar sizing, cable calculations, and certification. 7-day free trial, cancel anytime."
      toolPath="/tools/solar-panel-sizing-calculator"
    />
  );
}
