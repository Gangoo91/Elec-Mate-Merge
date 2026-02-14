import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calculator,
  Zap,
  Activity,
  Gauge,
  BarChart3,
  Shield,
  Cable,
  Settings,
  FileCheck2,
  Building2,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

export default function TransformerSizingCalculatorPage() {
  return (
    <ToolTemplate
      title="Transformer Sizing Calculator | kVA Rating Tool"
      description="Calculate transformer kVA rating for single-phase and three-phase installations. Considers load calculation, diversity factors, oversize allowance, and future capacity. Part of 50+ free electrical calculators in Elec-Mate."
      datePublished="2026-02-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Transformer Sizing Calculator', href: '/tools/transformer-sizing-calculator' },
      ]}
      tocItems={[
        { id: 'what-is-transformer-sizing', label: 'What Is Transformer Sizing?' },
        { id: 'single-phase-sizing', label: 'Single-Phase Sizing' },
        { id: 'three-phase-sizing', label: 'Three-Phase Sizing' },
        { id: 'diversity-oversize', label: 'Diversity and Oversize Factor' },
        { id: 'standard-ratings', label: 'Standard Transformer Ratings' },
        { id: 'worked-examples', label: 'Worked Examples' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="kVA Calculator"
      badgeIcon={Zap}
      heroTitle={
        <>
          <span className="text-yellow-400">Transformer Sizing Calculator</span> — Get the Right kVA
          Rating Every Time
        </>
      }
      heroSubtitle="Enter the connected load, power factor, and diversity. The calculator determines the correct transformer kVA rating for single-phase or three-phase installations, applies standard oversize factors, and selects from standard transformer ratings. No more undersized or oversized transformers."
      heroFeaturePills={[
        { icon: Zap, label: 'kVA Rating' },
        { icon: Calculator, label: 'Load Calculation' },
        { icon: Activity, label: 'Single & Three Phase' },
        { icon: Gauge, label: 'Oversize Factor' },
      ]}
      readingTime={10}
      toolPath="/tools/transformer-sizing-calculator"
      keyTakeaways={[
        'Transformer kVA rating is calculated as: kVA = Total Load (kW) / Power Factor for single-phase, or kVA = Total Load (kW) / Power Factor for three-phase — the formula is the same, but the load calculation differs.',
        'Diversity factors reduce the calculated maximum demand to reflect the fact that not all loads operate simultaneously — typically reducing the required transformer size by 20-40%.',
        'An oversize factor of 20-25% is commonly applied to allow for future load growth, motor starting currents, and non-linear load harmonics.',
        'Standard transformer ratings (kVA) follow a preferred range: 25, 50, 100, 200, 315, 500, 750, 1000, 1500, 2000 — always select the next standard size above the calculated requirement.',
        'Elec-Mate calculates transformer sizing instantly on your phone, with built-in diversity tables and standard rating selection.',
      ]}
      sections={[
        {
          id: 'what-is-transformer-sizing',
          heading: 'What Is Transformer Sizing?',
          content: (
            <>
              <p>
                Transformer sizing is the process of selecting a transformer with the correct
                kilovolt-ampere (kVA) rating to supply an electrical installation. The transformer
                must be large enough to supply the maximum demand of the connected loads without
                overheating or exceeding its rated capacity, but not so oversized that it operates
                inefficiently at a fraction of its rating.
              </p>
              <p>
                In the UK, transformers are used in a wide range of applications. Distribution
                transformers step down the 11kV or 33kV supply to 400V three-phase for commercial
                and industrial premises. Isolation transformers provide separated supplies for
                special locations under{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>
                . Control transformers provide reduced voltages for building management systems,
                lighting controls, and industrial control circuits.
              </p>
              <p>
                Selecting the correct transformer size requires calculating the total connected
                load, applying diversity factors, accounting for power factor, and adding an
                appropriate oversize allowance for future growth and transient loads. An undersized
                transformer will overheat, trip on overload, or fail prematurely. An oversized
                transformer wastes capital and operates less efficiently due to higher iron losses
                at light load.
              </p>
            </>
          ),
        },
        {
          id: 'single-phase-sizing',
          heading: 'Single-Phase Transformer Sizing',
          content: (
            <>
              <p>
                For single-phase transformers, the kVA rating is calculated from the total load in
                kilowatts and the power factor of the load:
              </p>
              <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4 text-center">
                <p className="text-xl font-mono font-bold text-yellow-400">
                  kVA = kW / Power Factor
                </p>
                <div className="mt-4 text-left max-w-md mx-auto space-y-1 text-sm text-white">
                  <p>
                    <strong className="text-yellow-400">kW</strong> = total diversified load in
                    kilowatts
                  </p>
                  <p>
                    <strong className="text-yellow-400">Power Factor</strong> = overall power factor
                    of the load (typically 0.8 to 0.95)
                  </p>
                </div>
              </div>
              <p>The current drawn from a single-phase transformer is:</p>
              <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4 text-center">
                <p className="text-xl font-mono font-bold text-yellow-400">I = kVA x 1000 / V</p>
                <div className="mt-4 text-left max-w-md mx-auto space-y-1 text-sm text-white">
                  <p>
                    <strong className="text-yellow-400">I</strong> = current in amperes
                  </p>
                  <p>
                    <strong className="text-yellow-400">V</strong> = secondary voltage (typically
                    230V or 110V)
                  </p>
                </div>
              </div>
              <p>
                For example, a single-phase load of 15kW at a power factor of 0.85 requires a
                transformer rated at: 15 / 0.85 = 17.6 kVA. The next standard rating above this is
                25 kVA.
              </p>
            </>
          ),
        },
        {
          id: 'three-phase-sizing',
          heading: 'Three-Phase Transformer Sizing',
          content: (
            <>
              <p>
                For three-phase transformers, the kVA rating calculation uses the same fundamental
                relationship between real power and apparent power:
              </p>
              <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4 text-center">
                <p className="text-xl font-mono font-bold text-yellow-400">
                  kVA = kW / Power Factor
                </p>
              </div>
              <p>The line current drawn from a three-phase transformer is:</p>
              <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4 text-center">
                <p className="text-xl font-mono font-bold text-yellow-400">
                  I = kVA x 1000 / (root 3 x V<sub>L</sub>)
                </p>
                <div className="mt-4 text-left max-w-md mx-auto space-y-1 text-sm text-white">
                  <p>
                    <strong className="text-yellow-400">I</strong> = line current in amperes
                  </p>
                  <p>
                    <strong className="text-yellow-400">
                      V<sub>L</sub>
                    </strong>{' '}
                    = line-to-line voltage (typically 400V)
                  </p>
                </div>
              </div>
              <p>
                For a three-phase load of 80kW at a power factor of 0.9, the required transformer
                rating is: 80 / 0.9 = 88.9 kVA. The next standard rating is 100 kVA. The line
                current on the secondary side would be: 100,000 / (1.732 x 400) = 144.3A. This
                determines the cable size and switchgear ratings needed on the secondary side.
              </p>
              <p>
                When sizing three-phase transformers, it is important to consider the phase balance.
                If the load is significantly unbalanced, the transformer must be sized for the
                highest loaded phase, not the average. Use the{' '}
                <SEOInternalLink href="/tools/three-phase-power-calculator">
                  three-phase power calculator
                </SEOInternalLink>{' '}
                to assess phase balance before sizing the transformer.
              </p>
            </>
          ),
        },
        {
          id: 'diversity-oversize',
          heading: 'Diversity and Oversize Factor',
          content: (
            <>
              <p>
                The connected load of an installation is rarely the same as the maximum demand.
                Diversity factors account for the fact that not all loads operate simultaneously.
                After applying diversity, an oversize factor is added to allow for future load
                growth and transient conditions.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Diversity Considerations</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Lighting loads</strong> — typically 90% diversity for commercial
                      buildings (not all areas are illuminated simultaneously).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Socket outlet loads</strong> — typically 40-60% diversity depending on
                      the number of outlets and building use.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Motor loads</strong> — the largest motor is taken at 100%, with
                      remaining motors at 80% or as determined by the process requirements.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Heating/cooling loads</strong> — typically 100% for the dominant
                      system (heating or cooling, not both simultaneously).
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-3">Oversize Factors</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>20% oversize</strong> — standard allowance for future load growth and
                      normal operational headroom.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>25% oversize</strong> — recommended where significant motor loads
                      exist (motor starting currents can be 6-8 times full load current).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>30% or more</strong> — for installations with high harmonic content
                      (VFDs, UPS systems, LED drivers) where the transformer must handle additional
                      heating from harmonic currents.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                The Elec-Mate{' '}
                <SEOInternalLink href="/tools/diversity-factor-calculator">
                  diversity factor calculator
                </SEOInternalLink>{' '}
                can help determine the diversified maximum demand before feeding the result into the
                transformer sizing calculation.
              </p>
            </>
          ),
          appBridge: {
            title: 'Transformer sizing with built-in diversity',
            description:
              "Elec-Mate's transformer sizing calculator includes IET diversity tables and standard oversize factors. Enter your load breakdown and get the correct kVA rating in seconds. Works offline on site.",
            icon: Calculator,
          },
        },
        {
          id: 'standard-ratings',
          heading: 'Standard Transformer Ratings (kVA)',
          content: (
            <>
              <p>
                Transformers are manufactured in standard kVA ratings. After calculating the
                required kVA, you must select the next standard rating above the calculated value.
                The standard ratings for oil-filled distribution transformers commonly available in
                the UK are:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    '25',
                    '50',
                    '100',
                    '160',
                    '200',
                    '250',
                    '315',
                    '400',
                    '500',
                    '630',
                    '750',
                    '800',
                    '1000',
                    '1250',
                    '1500',
                    '2000',
                  ].map((rating) => (
                    <div
                      key={rating}
                      className="text-center p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20"
                    >
                      <span className="text-lg font-bold text-yellow-400">{rating}</span>
                      <span className="text-sm text-white ml-1">kVA</span>
                    </div>
                  ))}
                </div>
              </div>
              <p>
                Dry-type transformers (cast resin) are available in similar ratings and are used
                where oil-filled transformers are not permitted — for example, inside buildings, in
                basements, or in areas where fire risk from transformer oil is unacceptable.
                Dry-type transformers are typically more expensive but require less maintenance and
                have no oil leakage risk.
              </p>
              <p>
                For site supply transformers (110V centre-tapped earth for construction sites),
                common ratings are 3 kVA, 5 kVA, 10 kVA, and 15 kVA single-phase, and 10 kVA, 15
                kVA, and 25 kVA three-phase.
              </p>
            </>
          ),
        },
        {
          id: 'worked-examples',
          heading: 'Worked Examples',
          content: (
            <>
              <div className="space-y-6">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">
                    Example 1: Small Commercial Unit
                  </h3>
                  <div className="space-y-2 text-white leading-relaxed text-sm">
                    <p>
                      A small office building has the following connected loads: lighting 12kW,
                      socket outlets 25kW, air conditioning 15kW, server room 8kW. Overall power
                      factor is 0.85.
                    </p>
                    <p className="font-mono text-white">
                      Total connected load = 12 + 25 + 15 + 8 = 60kW
                    </p>
                    <p className="font-mono text-white">
                      After diversity (estimated 0.7): 60 x 0.7 = 42kW
                    </p>
                    <p className="font-mono text-white">
                      kVA = 42 / 0.85 = <strong className="text-yellow-400">49.4 kVA</strong>
                    </p>
                    <p className="font-mono text-white">
                      With 20% oversize: 49.4 x 1.2 ={' '}
                      <strong className="text-yellow-400">59.3 kVA</strong>
                    </p>
                    <p>
                      Select the next standard rating:{' '}
                      <strong className="text-yellow-400">100 kVA</strong> (or 63 kVA if available
                      from the manufacturer).
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">
                    Example 2: Industrial Workshop
                  </h3>
                  <div className="space-y-2 text-white leading-relaxed text-sm">
                    <p>
                      An industrial unit has: lighting 8kW, socket outlets 15kW, three-phase motors
                      totalling 75kW (largest motor 30kW), heating 20kW. Overall power factor is
                      0.8.
                    </p>
                    <p className="font-mono text-white">
                      Motor diversity: largest at 100% (30kW) + remainder at 80% (45 x 0.8 = 36kW) =
                      66kW
                    </p>
                    <p className="font-mono text-white">
                      Other loads after diversity: (8 + 15 + 20) x 0.8 = 34.4kW
                    </p>
                    <p className="font-mono text-white">
                      Total diversified load = 66 + 34.4 = 100.4kW
                    </p>
                    <p className="font-mono text-white">
                      kVA = 100.4 / 0.8 = <strong className="text-yellow-400">125.5 kVA</strong>
                    </p>
                    <p className="font-mono text-white">
                      With 25% oversize (motors): 125.5 x 1.25 ={' '}
                      <strong className="text-yellow-400">156.9 kVA</strong>
                    </p>
                    <p>
                      Select the next standard rating:{' '}
                      <strong className="text-yellow-400">200 kVA</strong>.
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
          name: 'List all connected loads',
          text: 'Identify every electrical load that will be supplied by the transformer. Group them by type — lighting, socket outlets, motors, heating/cooling, specialist equipment. Record the rated power in kW for each load.',
        },
        {
          name: 'Apply diversity factors',
          text: 'Apply appropriate diversity factors to each load group to determine the maximum demand. Use IET On-Site Guide diversity tables or site-specific diversity based on the building usage pattern.',
        },
        {
          name: 'Determine the power factor',
          text: 'Estimate the overall power factor of the installation. Use 0.8 as a conservative default for mixed loads. For predominantly motor loads, use 0.75-0.85. For predominantly resistive loads, use 0.95-1.0.',
        },
        {
          name: 'Calculate the kVA requirement',
          text: 'Divide the total diversified load (kW) by the power factor to get the required kVA. This gives the apparent power that the transformer must be rated to deliver.',
        },
        {
          name: 'Apply the oversize factor',
          text: 'Add an oversize factor — typically 20% for general loads, 25% where significant motor loads exist, or 30% for installations with high harmonic content from VFDs and non-linear loads.',
        },
        {
          name: 'Select the standard transformer rating',
          text: 'Choose the next standard transformer kVA rating above the calculated requirement. Verify the secondary current is compatible with the available switchgear and cable sizes.',
        },
      ]}
      howToHeading="How to Size a Transformer"
      howToDescription="Follow these six steps to calculate the correct transformer kVA rating for any installation. The Elec-Mate calculator performs steps 2-6 automatically once you enter the load breakdown."
      features={[
        {
          icon: Calculator,
          title: 'Instant kVA Calculation',
          description:
            'Enter connected loads by type and the calculator applies diversity, power factor, and oversize to determine the correct transformer kVA rating.',
        },
        {
          icon: Activity,
          title: 'Single-Phase and Three-Phase',
          description:
            'Handles both single-phase and three-phase transformer sizing with the correct formulas and standard rating tables for each configuration.',
        },
        {
          icon: Gauge,
          title: 'Built-In Diversity Tables',
          description:
            'IET On-Site Guide diversity factors are built in. Select the building type and the calculator applies the correct diversity to each load group automatically.',
        },
        {
          icon: BarChart3,
          title: 'Load Breakdown Display',
          description:
            'Visual breakdown showing how each load group contributes to the total demand. Instantly see which loads are driving the transformer size.',
        },
        {
          icon: Settings,
          title: 'Adjustable Oversize Factor',
          description:
            'Set the oversize factor from 10% to 50% based on the installation requirements. The calculator recommends a default based on the load mix.',
        },
        {
          icon: Shield,
          title: 'Standard Rating Selection',
          description:
            'Automatically selects the next standard transformer kVA rating above the calculated requirement. Shows the full load secondary current for cable sizing.',
        },
      ]}
      featuresHeading="Transformer Sizing Calculator Features"
      featuresSubheading="Everything you need to size transformers correctly on site, with no internet connection required."
      faqs={[
        {
          question: 'What is the difference between kVA and kW for transformer sizing?',
          answer:
            'kW (kilowatts) measures real power — the actual power consumed by the load to do useful work. kVA (kilovolt-amperes) measures apparent power — the total power drawn from the supply, including both real power and reactive power. The relationship is kVA = kW / power factor. Transformers are rated in kVA because they must carry the total current, which is determined by the apparent power. A load of 80kW at a power factor of 0.8 draws 100 kVA from the transformer. The transformer does not care that 20% of the current is reactive — it still has to carry it, and it still generates heat in the windings.',
        },
        {
          question: 'What oversize factor should I use for transformer sizing?',
          answer:
            'The standard recommendation is 20% for general commercial installations with predominantly resistive loads (lighting, heating, socket outlets). For installations with significant motor loads, use 25% to accommodate motor starting currents, which can be 6-8 times the full load current for direct-on-line starting. For installations with a high proportion of non-linear loads (variable frequency drives, UPS systems, LED drivers with poor power factor), use 30% or more to account for harmonic heating in the transformer windings. If the installation is expected to grow significantly in the future, a higher oversize factor may be justified to avoid the cost of replacing the transformer later.',
        },
        {
          question: 'How does power factor affect transformer sizing?',
          answer:
            'Power factor has a direct effect on transformer sizing because it determines the relationship between the real power (kW) consumed by the load and the apparent power (kVA) the transformer must deliver. A lower power factor means more kVA is needed for the same kW load. For example, a 100kW load at a power factor of 1.0 requires a 100 kVA transformer. The same 100kW load at a power factor of 0.7 requires 100 / 0.7 = 143 kVA — a 43% increase in transformer size. Power factor correction equipment can improve the power factor, reducing the required transformer size and the current drawn from the supply.',
        },
        {
          question: 'Can I use the transformer sizing calculator for site supply transformers?',
          answer:
            'Yes. The Elec-Mate transformer sizing calculator handles all transformer types, including 110V centre-tapped earth transformers for construction sites. Enter the total connected load of the site equipment (drills, saws, lighting, small welders), apply appropriate diversity, and the calculator determines the correct site transformer kVA rating. Common site transformer ratings are 3 kVA, 5 kVA, and 10 kVA single-phase. For larger sites with three-phase equipment, the calculator handles three-phase site transformers as well.',
        },
        {
          question: 'What happens if a transformer is undersized or oversized?',
          answer:
            'An undersized transformer will overheat under full load, causing the thermal protection to trip and disconnect the supply. Prolonged overloading degrades the winding insulation, significantly shortening the transformer life. An oversized transformer wastes capital on unnecessary capacity and operates less efficiently at light load. All transformers have iron losses (core losses) that are constant regardless of load — these represent wasted energy when the transformer is lightly loaded. The optimal loading for efficiency is typically 50-75% of the transformer rated capacity. This is why the 20-25% oversize factor is a good compromise between reliability and efficiency.',
        },
      ]}
      faqHeading="Frequently Asked Questions About Transformer Sizing"
      relatedPages={[
        {
          href: '/tools/three-phase-power-calculator',
          title: 'Three-Phase Power Calculator',
          description:
            'Calculate three-phase power, current, and voltage for balanced and unbalanced loads with star and delta configurations.',
          icon: Activity,
          category: 'Tool',
        },
        {
          href: '/tools/max-demand-calculator',
          title: 'Max Demand Calculator',
          description:
            'Calculate the maximum demand for an electrical installation using IET On-Site Guide diversity factors.',
          icon: Gauge,
          category: 'Tool',
        },
        {
          href: '/tools/diversity-factor-calculator',
          title: 'Diversity Factor Calculator',
          description:
            'Apply IET diversity factors to reduce connected load to maximum demand for domestic and commercial installations.',
          icon: BarChart3,
          category: 'Tool',
        },
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'Size cables to BS 7671 with automatic correction factors, voltage drop, and fault current verification.',
          icon: Cable,
          category: 'Tool',
        },
        {
          href: '/tools/motor-starting-current-calculator',
          title: 'Motor Starting Current Calculator',
          description:
            'Calculate motor starting current for DOL, star-delta, soft starter, and VFD starting methods.',
          icon: Settings,
          category: 'Tool',
        },
        {
          href: '/guides/three-phase-installation',
          title: 'Three-Phase Installation Guide',
          description:
            'Complete guide to three-phase electrical installations including transformer selection, distribution, and testing.',
          icon: Building2,
          category: 'Guide',
        },
      ]}
      ctaHeading="Size Transformers in Seconds on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site calculations. 50+ calculators, 8 certificate types, and AI tools. 7-day free trial, cancel anytime."
    />
  );
}
