import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Activity,
  Zap,
  Calculator,
  Gauge,
  BarChart3,
  Shield,
  Cable,
  Settings,
  Thermometer,
  Layers,
  Building2,
  CheckCircle2,
} from 'lucide-react';

export default function BusbarSizingCalculatorPage() {
  return (
    <ToolTemplate
      title="Busbar Sizing Calculator | Current Rating Tool"
      description="Calculate busbar cross-section area and current rating for copper and aluminium busbars. Considers current density, voltage drop, temperature rise, and short-circuit withstand. Part of 50+ free electrical calculators in Elec-Mate."
      datePublished="2026-02-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Busbar Sizing Calculator', href: '/tools/busbar-sizing-calculator' },
      ]}
      tocItems={[
        { id: 'what-is-busbar-sizing', label: 'What Is Busbar Sizing?' },
        { id: 'copper-vs-aluminium', label: 'Copper vs Aluminium' },
        { id: 'current-density', label: 'Current Density Method' },
        { id: 'temperature-rise', label: 'Temperature Rise' },
        { id: 'voltage-drop', label: 'Voltage Drop in Busbars' },
        { id: 'short-circuit-withstand', label: 'Short-Circuit Withstand' },
        { id: 'worked-examples', label: 'Worked Examples' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Busbar Calculator"
      badgeIcon={Activity}
      heroTitle={
        <>
          <span className="text-yellow-400">Busbar Sizing Calculator</span> — Current Rating and
          Cross-Section Tool
        </>
      }
      heroSubtitle="Enter the required current rating, busbar material, and installation conditions. The calculator determines the correct busbar dimensions, verifies temperature rise, calculates voltage drop, and checks short-circuit withstand capacity. Size busbars with confidence."
      heroFeaturePills={[
        { icon: Activity, label: 'Current Rating' },
        { icon: Layers, label: 'Cross-Section' },
        { icon: Thermometer, label: 'Temperature Rise' },
        { icon: Shield, label: 'Short-Circuit Check' },
      ]}
      readingTime={12}
      toolPath="/tools/busbar-sizing-calculator"
      keyTakeaways={[
        'Busbar current rating is determined by the cross-sectional area and the maximum allowable current density: typically 1.2 A/mm² for copper busbars in enclosed panels and up to 2.0 A/mm² for busbars in free air.',
        'Copper busbars have approximately 60% higher current carrying capacity than equivalent aluminium busbars, but aluminium is lighter and less expensive per unit length.',
        'Temperature rise is the governing design factor — BS EN 61439-1 limits the temperature rise of busbars in switchgear assemblies to 70K above ambient (105°C total at 35°C ambient).',
        'Short-circuit withstand must be verified using the adiabatic equation: minimum CSA = root(I²t) / k, where k is 176 for copper and 76 for aluminium busbars.',
        'Elec-Mate calculates busbar sizing for copper and aluminium, with temperature rise, voltage drop, and short-circuit verification all built in.',
      ]}
      sections={[
        {
          id: 'what-is-busbar-sizing',
          heading: 'What Is Busbar Sizing?',
          content: (
            <>
              <p>
                Busbar sizing is the process of selecting the correct cross-sectional dimensions for
                a conductor bar (busbar) that carries electrical current within switchgear
                assemblies, distribution boards, busbar trunking systems, and power distribution
                infrastructure. Busbars are used instead of cables where high currents need to be
                distributed efficiently within a compact space.
              </p>
              <p>The sizing process must satisfy four independent requirements:</p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ul className="space-y-4 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Current carrying capacity</strong> — the busbar must carry the full
                      load current without exceeding the maximum allowable temperature.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Temperature rise</strong> — the busbar temperature must not exceed the
                      limits set by the enclosure standard (BS EN 61439) under sustained load
                      conditions.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Voltage drop</strong> — the resistive voltage drop along the busbar
                      length must be within acceptable limits, particularly for long busbar trunking
                      runs.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Short-circuit withstand</strong> — the busbar must withstand the
                      thermal and mechanical effects of the prospective short-circuit current for
                      the time taken by the protective device to clear the fault.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                In practice, either the temperature rise or the short-circuit withstand usually
                governs the busbar size. The Elec-Mate busbar sizing calculator checks all four
                criteria simultaneously and highlights which one is the governing factor.
              </p>
            </>
          ),
        },
        {
          id: 'copper-vs-aluminium',
          heading: 'Copper vs Aluminium Busbars',
          content: (
            <>
              <p>
                Busbars are manufactured from either copper (Cu) or aluminium (Al). Each material
                has distinct properties that affect the busbar sizing and the overall design of the
                switchgear assembly.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 my-4">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <h3 className="font-bold text-white text-lg mb-3">Copper Busbars</h3>
                  <ul className="space-y-2 text-white text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Resistivity: 17.2 n-ohm-m at 20°C</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Density: 8,900 kg/m³</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Current density: 1.2-2.0 A/mm²</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>k factor (adiabatic): 176</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Higher current capacity per mm²</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>More compact installation</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <h3 className="font-bold text-white text-lg mb-3">Aluminium Busbars</h3>
                  <ul className="space-y-2 text-white text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Resistivity: 28.3 n-ohm-m at 20°C</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Density: 2,700 kg/m³</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Current density: 0.8-1.2 A/mm²</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>k factor (adiabatic): 76</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>67% lighter than copper</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Lower material cost per metre</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p>
                Copper is the standard choice for most switchgear and distribution board busbars due
                to its higher conductivity and mechanical strength. Aluminium is preferred for long
                busbar trunking runs where weight is a concern, and for high-current applications
                where the lower material cost offsets the need for a larger cross-section. Many
                modern busbar trunking systems use aluminium conductors with copper-plated or
                tin-plated contact surfaces to prevent oxide build-up at connections.
              </p>
            </>
          ),
        },
        {
          id: 'current-density',
          heading: 'Current Density Method',
          content: (
            <>
              <p>
                The current density method is the most common approach to busbar sizing. The
                required cross-sectional area is calculated by dividing the design current by the
                allowable current density for the busbar material and installation conditions.
              </p>
              <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4 text-center">
                <p className="text-xl font-mono font-bold text-yellow-400">A = I / J</p>
                <div className="mt-4 text-left max-w-md mx-auto space-y-1 text-sm text-white">
                  <p>
                    <strong className="text-yellow-400">A</strong> = required cross-sectional area
                    in mm²
                  </p>
                  <p>
                    <strong className="text-yellow-400">I</strong> = design current in amperes
                  </p>
                  <p>
                    <strong className="text-yellow-400">J</strong> = allowable current density in
                    A/mm²
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">
                  Typical Current Density Values
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Copper, enclosed panel:</strong> 1.2 A/mm² — the most conservative
                      value, used for busbars inside enclosed switchgear with limited ventilation.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Copper, ventilated enclosure:</strong> 1.6 A/mm² — for busbars inside
                      ventilated panels or trunking with adequate airflow.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Copper, free air:</strong> 2.0 A/mm² — for exposed busbars with
                      unrestricted airflow, such as open busbar systems in substations.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Aluminium, enclosed panel:</strong> 0.8 A/mm² — lower than copper due
                      to the higher resistivity of aluminium.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Aluminium, free air:</strong> 1.2 A/mm² — equivalent to copper in an
                      enclosed panel.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                For example, a copper busbar in an enclosed panel carrying 800A would require a
                minimum cross-section of 800 / 1.2 = 667 mm². A standard busbar size of 50mm x 15mm
                (750 mm²) would be selected.
              </p>
            </>
          ),
        },
        {
          id: 'temperature-rise',
          heading: 'Temperature Rise',
          content: (
            <>
              <p>
                Temperature rise is typically the governing factor in busbar sizing. As current
                flows through the busbar, resistive heating (I²R losses) causes the busbar
                temperature to rise above ambient. The temperature must not exceed the limits set by
                the enclosure standard.
              </p>
              <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-3">
                  BS EN 61439-1 Temperature Limits
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Bare copper/aluminium busbars:</strong> maximum temperature rise of
                      70K above ambient (maximum 105°C at 35°C ambient).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Insulated busbars:</strong> maximum temperature depends on the
                      insulation class — typically 90°C or 105°C for common insulation types.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Connection points:</strong> bolted connections must not exceed 105°C
                      for bare connections or 90°C for insulated connections (due to the higher
                      resistance at joints).
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                The temperature rise depends on the I²R losses, the surface area of the busbar
                (which determines heat dissipation), the orientation of the busbar (vertical busbars
                dissipate heat better than horizontal due to convection), the proximity of other
                heat sources, and the enclosure ventilation. Multiple busbars per phase (stacked or
                spaced) increase the surface area and improve current capacity per unit of conductor
                material.
              </p>
              <p>
                The Elec-Mate busbar sizing calculator computes the temperature rise based on the
                busbar dimensions, material properties, and installation configuration, alerting you
                if the temperature limit is exceeded.
              </p>
            </>
          ),
        },
        {
          id: 'voltage-drop',
          heading: 'Voltage Drop in Busbars',
          content: (
            <>
              <p>
                Voltage drop in busbars is calculated using the same fundamental principle as cable
                voltage drop — the current flowing through the resistance of the conductor produces
                a voltage drop proportional to the current and the conductor length.
              </p>
              <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4 text-center">
                <p className="text-xl font-mono font-bold text-yellow-400">Vd = I x R x L</p>
                <div className="mt-4 text-left max-w-md mx-auto space-y-1 text-sm text-white">
                  <p>
                    <strong className="text-yellow-400">Vd</strong> = voltage drop in volts
                  </p>
                  <p>
                    <strong className="text-yellow-400">I</strong> = current in amperes
                  </p>
                  <p>
                    <strong className="text-yellow-400">R</strong> = resistance per metre (ohm/m),
                    calculated from resistivity and cross-sectional area
                  </p>
                  <p>
                    <strong className="text-yellow-400">L</strong> = busbar length in metres
                  </p>
                </div>
              </div>
              <p>
                For short busbars within a distribution board (typically less than 1 metre), the
                voltage drop is negligible and rarely a concern. For long busbar trunking runs
                (which can extend tens of metres through a building), the voltage drop must be
                calculated and verified against the{' '}
                <SEOInternalLink href="/tools/voltage-drop-calculator">
                  BS 7671 voltage drop limits
                </SEOInternalLink>{' '}
                of 3% for lighting and 5% for other circuits.
              </p>
              <p>
                Note that busbar resistance increases with temperature — the resistance at operating
                temperature is higher than at 20°C. The calculator uses the resistance at the
                expected operating temperature for an accurate voltage drop calculation.
              </p>
            </>
          ),
        },
        {
          id: 'short-circuit-withstand',
          heading: 'Short-Circuit Withstand',
          content: (
            <>
              <p>
                Busbars must be able to withstand the thermal and mechanical effects of a short
                circuit for the time it takes the protective device to clear the fault. The thermal
                withstand is checked using the adiabatic equation, and the mechanical withstand is
                checked by calculating the electromagnetic forces between the busbars during the
                fault.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Thermal Withstand Check</h3>
                <div className="text-center mb-4">
                  <p className="text-xl font-mono font-bold text-yellow-400">
                    A<sub>min</sub> = root(I²t) / k
                  </p>
                </div>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>
                        A<sub>min</sub>
                      </strong>{' '}
                      = minimum cross-sectional area in mm²
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>I²t</strong> = let-through energy of the protective device in A²s
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>k</strong> = 176 for copper busbars, 76 for aluminium busbars
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                The mechanical forces during a short circuit can be enormous. The force between two
                parallel busbars carrying fault current is proportional to the square of the current
                and inversely proportional to the distance between them. For high fault levels
                (above 25kA), the busbar support structures must be designed to withstand these
                forces — this may require closer spacing of busbar supports, stronger fixings, or
                additional bracing.
              </p>
              <p>
                The{' '}
                <SEOInternalLink href="/tools/prospective-fault-current-calculator">
                  prospective fault current calculator
                </SEOInternalLink>{' '}
                can determine the fault level at the point where the busbar is installed, which is
                the input needed for the short-circuit withstand check.
              </p>
            </>
          ),
          appBridge: {
            title: 'Busbar sizing with fault current verification',
            description:
              "Elec-Mate's busbar sizing calculator checks current density, temperature rise, voltage drop, and short-circuit withstand in one calculation. Enter the design current and fault level, select copper or aluminium, and get the correct busbar dimensions. Works offline on site.",
            icon: Activity,
          },
        },
        {
          id: 'worked-examples',
          heading: 'Worked Examples',
          content: (
            <>
              <div className="space-y-6">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">
                    Example 1: Main Distribution Board Busbar
                  </h3>
                  <div className="space-y-2 text-white leading-relaxed text-sm">
                    <p>
                      A main distribution board requires a 630A copper busbar in an enclosed panel.
                      The prospective short-circuit current is 25kA with a disconnection time of 0.1
                      seconds.
                    </p>
                    <p className="font-mono text-white">
                      Current density method: A = 630 / 1.2 ={' '}
                      <strong className="text-yellow-400">525 mm²</strong>
                    </p>
                    <p className="font-mono text-white">
                      Short-circuit check: A = root(25000² x 0.1) / 176 = root(62,500,000) / 176 =
                      7906 / 176 = <strong className="text-yellow-400">44.9 mm²</strong>
                    </p>
                    <p>
                      The current density requirement governs (525 mm² vs 44.9 mm²). Select a
                      standard busbar: 40mm x 15mm (600 mm²) or 50mm x 12mm (600 mm²).
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">
                    Example 2: Busbar Trunking Run
                  </h3>
                  <div className="space-y-2 text-white leading-relaxed text-sm">
                    <p>
                      A 1600A aluminium busbar trunking run is 30 metres long, feeding a three-phase
                      distribution board. Calculate the voltage drop.
                    </p>
                    <p className="font-mono text-white">
                      Required CSA: 1600 / 0.8 ={' '}
                      <strong className="text-yellow-400">2000 mm²</strong> per phase
                    </p>
                    <p className="font-mono text-white">
                      Resistance at 70°C: (28.3 x 10⁻⁶ x 1.20) / (2000 x 10⁻⁶) = 0.0170 ohm/m
                    </p>
                    <p className="font-mono text-white">
                      Vd = 1600 x 0.0170 x 30 / 1000 ={' '}
                      <strong className="text-yellow-400">0.82V per phase</strong>
                    </p>
                    <p>
                      As a percentage of 230V: 0.82 / 230 x 100 = 0.36% — well within the 5% limit.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Determine the design current',
          text: 'Calculate the maximum continuous current the busbar must carry. This is the diversified maximum demand of all circuits fed from the busbar, taking into account load diversity and future growth.',
        },
        {
          name: 'Select the busbar material',
          text: 'Choose copper or aluminium based on the application. Copper is standard for switchgear busbars. Aluminium is used for long busbar trunking runs where weight and cost are factors.',
        },
        {
          name: 'Calculate the cross-sectional area',
          text: 'Divide the design current by the allowable current density for the material and installation type. Select the next standard busbar size above the calculated area.',
        },
        {
          name: 'Verify temperature rise',
          text: 'Calculate the I²R heating and verify the busbar temperature does not exceed the BS EN 61439-1 limit of 105°C (70K rise above 35°C ambient) under sustained full load.',
        },
        {
          name: 'Check voltage drop',
          text: 'For busbar trunking runs, calculate the voltage drop along the busbar length. Verify it is within the BS 7671 limits of 3% for lighting and 5% for other circuits.',
        },
        {
          name: 'Verify short-circuit withstand',
          text: 'Check that the busbar cross-section can withstand the thermal effects of the prospective short-circuit current using the adiabatic equation. Verify the busbar supports can withstand the electromagnetic forces.',
        },
      ]}
      howToHeading="How to Size a Busbar"
      howToDescription="Follow these six steps to select the correct busbar dimensions for any distribution board, switchgear assembly, or busbar trunking installation."
      features={[
        {
          icon: Calculator,
          title: 'Instant Sizing Calculation',
          description:
            'Enter the design current and installation conditions. The calculator determines the minimum busbar cross-section and selects the nearest standard busbar size.',
        },
        {
          icon: Layers,
          title: 'Copper and Aluminium',
          description:
            'Full support for both copper and aluminium busbars with accurate material properties. Compare the two materials side by side for any given current rating.',
        },
        {
          icon: Thermometer,
          title: 'Temperature Rise Verification',
          description:
            'Calculates the busbar temperature under sustained load and verifies compliance with BS EN 61439-1 temperature limits. Flags busbars that will overheat.',
        },
        {
          icon: Gauge,
          title: 'Voltage Drop Calculation',
          description:
            'Calculates the resistive voltage drop along the busbar length, accounting for temperature-dependent resistance. Essential for long busbar trunking runs.',
        },
        {
          icon: Shield,
          title: 'Short-Circuit Withstand Check',
          description:
            'Verifies the busbar can withstand the thermal effects of the prospective fault current using the adiabatic equation with correct k factors for copper and aluminium.',
        },
        {
          icon: Settings,
          title: 'Standard Sizes Database',
          description:
            'Built-in database of standard busbar dimensions. The calculator selects the nearest standard size above the calculated requirement, eliminating guesswork.',
        },
      ]}
      featuresHeading="Busbar Sizing Calculator Features"
      featuresSubheading="Everything you need to size busbars correctly for distribution boards, switchgear, and busbar trunking systems."
      faqs={[
        {
          question: 'What is the maximum current density for copper busbars?',
          answer:
            'The maximum allowable current density for copper busbars depends on the installation conditions. For busbars inside enclosed switchgear panels with limited ventilation, the typical maximum is 1.2 A/mm². For busbars in ventilated enclosures, the limit increases to approximately 1.6 A/mm². For busbars in free air with unrestricted convection, up to 2.0 A/mm² is acceptable. These values ensure the busbar temperature rise remains within the limits set by BS EN 61439-1 (70K above ambient for bare busbars). Higher current densities cause more resistive heating and can exceed the temperature limit, degrading insulation and increasing connection resistance at joints.',
        },
        {
          question: 'Should I use copper or aluminium busbars?',
          answer:
            'Copper is the standard choice for busbars within distribution boards and switchgear assemblies. It has higher conductivity (allowing smaller cross-sections), higher mechanical strength, and excellent corrosion resistance. Aluminium is preferred for long busbar trunking runs (rising mains, horizontal distribution in large buildings) where the weight saving is significant — aluminium is only one-third the weight of copper for a given volume. Aluminium is also less expensive per unit length, which matters for long runs. The main disadvantage of aluminium is that it forms an oxide layer on exposed surfaces that increases contact resistance — this is managed by using plated contact surfaces (tin or silver) at all connection points. In practice, most panel busbars are copper and most busbar trunking systems offer both copper and aluminium options.',
        },
        {
          question: 'How do I calculate busbar short-circuit withstand?',
          answer:
            'The thermal withstand of a busbar under short-circuit conditions is checked using the adiabatic equation from BS 7671: minimum cross-sectional area = root(I²t) / k, where I is the prospective short-circuit current in amperes, t is the disconnection time of the protective device in seconds, and k is a material constant (176 for copper, 76 for aluminium). The calculated minimum area must be less than the actual busbar cross-section. For example, with a fault current of 25kA and a disconnection time of 0.1 seconds using a copper busbar: minimum area = root(25000² x 0.1) / 176 = 7906 / 176 = 44.9 mm². Any copper busbar with a cross-section greater than 44.9 mm² will withstand this fault. The mechanical forces also need checking for high fault levels.',
        },
        {
          question: 'What is busbar trunking and when is it used?',
          answer:
            'Busbar trunking (also called busway) is a pre-fabricated system of enclosed busbars used for power distribution in commercial and industrial buildings. It consists of aluminium or copper busbars enclosed in a sheet metal housing, with standardised tap-off points at regular intervals where distribution boards or individual circuits can be connected. Busbar trunking is used instead of large cables for high-current distribution (typically 250A to 5000A). It is commonly used for rising mains in multi-storey buildings, horizontal power distribution in large open-plan buildings, and factory floor distribution where flexible tap-off points are needed. Busbar trunking is faster to install than equivalent cable systems, takes up less space, and allows easy modification by adding or relocating tap-off points.',
        },
        {
          question: 'How does busbar orientation affect current rating?',
          answer:
            'Busbar orientation significantly affects heat dissipation and therefore current rating. A vertically mounted flat busbar dissipates heat more effectively than a horizontally mounted one because vertical orientation promotes natural convection — hot air rises past the busbar surfaces, creating an air flow that carries heat away. A horizontal busbar oriented on its edge (narrow face up) is better than flat (wide face up) because the edge orientation allows convection on both faces. For multiple busbars per phase, spacing them apart (typically one busbar thickness) allows air to circulate between them, further improving heat dissipation. The Elec-Mate calculator accounts for busbar orientation when calculating temperature rise.',
        },
      ]}
      faqHeading="Frequently Asked Questions About Busbar Sizing"
      relatedPages={[
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'Size cables to BS 7671 with automatic correction factors, voltage drop, and fault current verification.',
          icon: Cable,
          category: 'Tool',
        },
        {
          href: '/tools/prospective-fault-current-calculator',
          title: 'Prospective Fault Current Calculator',
          description:
            'Calculate the prospective short-circuit current at any point in the installation for busbar withstand verification.',
          icon: Zap,
          category: 'Tool',
        },
        {
          href: '/tools/transformer-sizing-calculator',
          title: 'Transformer Sizing Calculator',
          description:
            'Calculate transformer kVA rating for the installation feeding the busbar distribution system.',
          icon: Activity,
          category: 'Tool',
        },
        {
          href: '/tools/voltage-drop-calculator',
          title: 'Voltage Drop Calculator',
          description:
            'Calculate voltage drop for busbar trunking runs and cable circuits to verify BS 7671 compliance.',
          icon: BarChart3,
          category: 'Tool',
        },
        {
          href: '/tools/motor-starting-current-calculator',
          title: 'Motor Starting Current Calculator',
          description:
            'Calculate motor starting current for busbars feeding motor distribution boards with DOL and star-delta starting.',
          icon: Gauge,
          category: 'Tool',
        },
        {
          href: '/guides/three-phase-installation',
          title: 'Three-Phase Installation Guide',
          description:
            'Complete guide to three-phase installations including distribution board design, busbar selection, and testing.',
          icon: Building2,
          category: 'Guide',
        },
      ]}
      ctaHeading="Size Busbars in Seconds on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site calculations. Busbar sizing, cable sizing, voltage drop, and 50+ other calculators. 7-day free trial, cancel anytime."
    />
  );
}
