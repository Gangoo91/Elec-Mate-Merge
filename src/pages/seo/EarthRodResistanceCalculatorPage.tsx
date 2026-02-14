import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calculator,
  Zap,
  Shield,
  BookOpen,
  BarChart3,
  Ruler,
  Layers,
  FileCheck2,
  Target,
  ArrowDownToLine,
  Combine,
  Globe,
} from 'lucide-react';

export default function EarthRodResistanceCalculatorPage() {
  return (
    <ToolTemplate
      title="Earth Rod Resistance Calculator | TT System Tool"
      description="Calculate earth rod resistance for TT earthing systems. Covers rod length, soil resistivity, parallel rod calculations, and achieving the required earth electrode resistance to BS 7671. Free UK electrical calculator."
      datePublished="2026-01-22"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        {
          label: 'Earth Rod Resistance Calculator',
          href: '/tools/earth-rod-resistance-calculator',
        },
      ]}
      tocItems={[
        { id: 'what-is-earth-rod-resistance', label: 'What Is Earth Rod Resistance?' },
        { id: 'tt-earthing-systems', label: 'TT Earthing Systems' },
        { id: 'calculation-formula', label: 'Calculation Formula' },
        { id: 'soil-resistivity', label: 'Soil Resistivity Values' },
        { id: 'parallel-rods', label: 'Parallel Earth Rods' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="BS 7671 Compliant"
      badgeIcon={Zap}
      heroTitle={
        <>
          <span className="text-yellow-400">Earth Rod Resistance Calculator</span> — Size Your Earth
          Electrode for TT Systems
        </>
      }
      heroSubtitle="Calculate earth electrode resistance for TT earthing installations. Input rod dimensions and soil type, and instantly determine whether your earth rod achieves the resistance required by BS 7671 for RCD protection. Part of Elec-Mate's 50+ electrical calculators."
      heroFeaturePills={[
        { icon: ArrowDownToLine, label: 'Rod Sizing' },
        { icon: Globe, label: 'Soil Resistivity' },
        { icon: Combine, label: 'Parallel Rods' },
        { icon: Shield, label: 'BS 7671' },
      ]}
      readingTime={9}
      keyTakeaways={[
        'Earth rod resistance depends on rod length, rod diameter, and soil resistivity — soil type is the dominant factor.',
        'For TT systems, the earth electrode resistance must be low enough that RA x IΔn ≤ 50 V, where RA is the earth electrode resistance and IΔn is the RCD rated residual operating current.',
        'With a 30 mA RCD, the maximum permitted earth electrode resistance is 1667 ohms (50 / 0.03). With a 100 mA RCD, it is 500 ohms.',
        'Parallel earth rods reduce the combined resistance — two rods spaced at least their length apart give approximately half the resistance of a single rod.',
        'Elec-Mate calculates earth rod resistance instantly for single and parallel rod configurations, with UK soil resistivity values built in.',
      ]}
      sections={[
        {
          id: 'what-is-earth-rod-resistance',
          heading: 'What Is Earth Rod Resistance and Why Does It Matter?',
          content: (
            <>
              <p>
                Earth rod resistance (also called earth electrode resistance) is the resistance
                between an earth rod driven into the ground and the general mass of earth. It is
                measured in ohms and determines how effectively fault current can flow to earth
                through the electrode. In a TT earthing system — where the installation's earth is
                provided by the consumer's own earth electrode rather than the supply company's
                earth — this resistance is critical for safety.
              </p>
              <p>
                The earth electrode resistance directly affects whether the protective device
                (almost always an RCD in TT systems) can disconnect the supply quickly enough in the
                event of an earth fault. BS 7671 requires that the product of the earth electrode
                resistance (RA) and the rated residual operating current of the RCD (IΔn) must not
                exceed 50 V. This ensures that touch voltages remain within safe limits during a
                fault condition.
              </p>
              <p>
                Electricians working on rural properties, agricultural installations, temporary
                supplies, and any site without a PME or TN-S earth from the DNO will need to install
                earth rods and verify the resistance. The{' '}
                <SEOInternalLink href="/tools/earth-loop-impedance-calculator">
                  earth loop impedance calculator
                </SEOInternalLink>{' '}
                is the companion tool for checking overall Zs values once the earth electrode is
                installed.
              </p>
            </>
          ),
          appBridge: {
            title: 'Calculate Earth Rod Resistance Instantly',
            description:
              'Enter rod length, diameter, and soil type. Elec-Mate calculates the expected resistance and tells you whether it meets BS 7671 requirements for your RCD rating.',
            icon: ArrowDownToLine,
          },
        },
        {
          id: 'tt-earthing-systems',
          heading: 'TT Earthing Systems — When You Need an Earth Rod',
          content: (
            <>
              <p>
                A TT earthing system is one where the installation earth is provided by an earth
                electrode (typically a driven earth rod) installed at the property, rather than by
                the electricity distributor. The first "T" stands for "terre" (earth) on the supply
                side — meaning the supply transformer neutral is earthed. The second "T" means the
                installation's exposed-conductive-parts are connected to earth via a local earth
                electrode, independently of the supply earth.
              </p>
              <p>
                TT systems are common in rural areas where the DNO supplies electricity via overhead
                lines without a PME (protective multiple earthing) terminal. They are also used for
                temporary electrical installations, agricultural buildings, caravan parks, marinas,
                and any situation where a reliable earth connection from the distributor is not
                available.
              </p>
              <p>
                The key characteristic of TT systems is that the earth fault loop impedance is much
                higher than in TN systems because the return path includes the resistance of the
                earth electrode and the general mass of earth. This means that overcurrent devices
                (MCBs, fuses) alone cannot provide adequate disconnection times — the fault current
                is too low to trip them quickly. This is why BS 7671 requires RCD protection on
                every circuit in a TT system. Understanding{' '}
                <SEOInternalLink href="/guides/earthing-arrangements">
                  earthing arrangements
                </SEOInternalLink>{' '}
                is fundamental to safe installation design.
              </p>
            </>
          ),
        },
        {
          id: 'calculation-formula',
          heading: 'Earth Rod Resistance Formula',
          content: (
            <>
              <p>
                The resistance of a single vertical earth rod driven into homogeneous soil is
                calculated using the formula:
              </p>
              <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
                <p className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">
                  R = (rho / 2 x pi x L) x ln(4L / d)
                </p>
                <p className="mt-3 text-sm text-white">
                  R = resistance (ohms), rho = soil resistivity (ohm-metres), L = rod length
                  (metres), d = rod diameter (metres), ln = natural logarithm
                </p>
              </div>
              <p>
                This formula shows that the three factors affecting earth rod resistance are soil
                resistivity (rho), rod length (L), and rod diameter (d). Of these, soil resistivity
                is by far the most significant — it varies by a factor of 100 or more between
                different soil types. Rod length has a moderate effect — doubling the rod length
                approximately halves the resistance. Rod diameter has relatively little effect
                because it appears inside a logarithm.
              </p>
              <p>
                In practice, this means that if you cannot achieve a low enough resistance with a
                single rod, your options are to use a longer rod, install parallel rods, or choose a
                location with lower soil resistivity. Increasing the rod diameter has very little
                benefit. These calculations feed into the overall{' '}
                <SEOInternalLink href="/tools/prospective-fault-current-calculator">
                  fault current assessment
                </SEOInternalLink>{' '}
                for the installation.
              </p>
            </>
          ),
        },
        {
          id: 'soil-resistivity',
          heading: 'Soil Resistivity Values for UK Soil Types',
          content: (
            <>
              <p>
                Soil resistivity is measured in ohm-metres and varies enormously depending on soil
                composition, moisture content, temperature, and mineral content. The following table
                gives typical values for common UK soil types:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-6">
                <div className="grid grid-cols-3 gap-px bg-white/10">
                  <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                    Soil Type
                  </div>
                  <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                    Resistivity (ohm-m)
                  </div>
                  <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                    Notes
                  </div>
                </div>
                {[
                  { soil: 'Marshy / waterlogged', resistivity: '5-40', notes: 'Best for earthing' },
                  { soil: 'Clay (wet)', resistivity: '8-50', notes: 'Good conductor' },
                  { soil: 'Clay (dry)', resistivity: '50-150', notes: 'Varies with moisture' },
                  { soil: 'Loam / garden soil', resistivity: '50-200', notes: 'Typical domestic' },
                  { soil: 'Sand (wet)', resistivity: '50-250', notes: 'Moderate' },
                  { soil: 'Sand (dry)', resistivity: '1,000-3,000', notes: 'Poor conductor' },
                  { soil: 'Gravel', resistivity: '300-5,000', notes: 'Very poor' },
                  { soil: 'Chalk', resistivity: '50-300', notes: 'Variable' },
                  { soil: 'Rock / granite', resistivity: '1,000-50,000', notes: 'Extremely poor' },
                ].map((row) => (
                  <div key={row.soil} className="grid grid-cols-3 gap-px bg-white/5">
                    <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">
                      {row.soil}
                    </div>
                    <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.resistivity}</div>
                    <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.notes}</div>
                  </div>
                ))}
              </div>
              <p>
                Soil resistivity varies significantly with depth. The top layer may be dry topsoil
                with high resistivity, while deeper layers may be wet clay with much lower
                resistivity. This is one reason why longer rods achieve lower resistance — they
                penetrate into moister, more conductive soil layers.
              </p>
              <p>
                For accurate results on critical installations, soil resistivity should be measured
                on site using the Wenner four-electrode method. For typical domestic TT
                installations, the estimated values above combined with an on-site earth electrode
                resistance test are sufficient.
              </p>
            </>
          ),
          appBridge: {
            title: 'UK Soil Types Built Into the Calculator',
            description:
              'Select your soil type from the dropdown and Elec-Mate uses the appropriate resistivity range. Or enter a measured value from a four-electrode soil resistivity test for maximum accuracy.',
            icon: Globe,
          },
        },
        {
          id: 'parallel-rods',
          heading: 'Parallel Earth Rods — Reducing Resistance',
          content: (
            <>
              <p>
                When a single earth rod cannot achieve a low enough resistance — typically in areas
                with high soil resistivity — additional rods can be installed in parallel to reduce
                the combined resistance. The rods must be spaced apart by at least their driven
                length to minimise interaction between their resistance zones.
              </p>
              <p>
                For two identical rods spaced at their length or more apart, the combined resistance
                is approximately half the resistance of a single rod. For three rods, the combined
                resistance is approximately one-third. In general, for N well-spaced identical rods:
              </p>
              <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
                <p className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">
                  R(combined) = R(single) / N
                </p>
                <p className="mt-3 text-sm text-white">
                  Approximate formula for N identical rods spaced at least L apart
                </p>
              </div>
              <p>
                If the rods are spaced closer together than their length, the resistance zones
                overlap, and the combined resistance is higher than the simple division suggests. A
                correction factor must be applied. Elec-Mate's calculator includes these correction
                factors — you enter the number of rods and the spacing, and the calculator returns
                the corrected combined resistance.
              </p>
              <p>
                The parallel rods must all be bonded together with a copper earth conductor, and the
                conductor must be protected against mechanical damage and corrosion. The bonding
                connections should be accessible for future testing. Correct{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing
                </SEOInternalLink>{' '}
                for the earthing conductor is essential. This is part of the overall{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR documentation</SEOInternalLink>{' '}
                for the installation.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Select single or parallel rod configuration',
          text: 'Choose whether you are calculating for a single earth rod or multiple parallel rods. For parallel rods, enter the number of rods and spacing distance.',
        },
        {
          name: 'Enter rod dimensions',
          text: 'Input the rod length (typically 1.2 m, 1.5 m, or 2.4 m for standard copper-bonded rods) and diameter (typically 5/8 inch or 16 mm).',
        },
        {
          name: 'Select soil type or enter resistivity',
          text: 'Choose the soil type from the built-in list to use typical UK resistivity values, or enter a measured resistivity value from a four-electrode test.',
        },
        {
          name: 'Enter the RCD rating',
          text: 'Input the rated residual operating current of the RCD protecting the installation (typically 30 mA or 100 mA). The calculator checks the RA x IΔn requirement.',
        },
        {
          name: 'Review the result',
          text: 'The calculator displays the calculated earth electrode resistance, the maximum permitted resistance for your RCD rating, and a clear pass/fail indication.',
        },
      ]}
      howToHeading="How to Use the Earth Rod Resistance Calculator"
      howToDescription="Five steps to determine whether your earth electrode meets BS 7671 requirements."
      features={[
        {
          icon: Calculator,
          title: 'Instant Resistance Calculation',
          description:
            'Enter rod dimensions and soil type. Get the calculated earth electrode resistance in seconds, with a pass/fail check against BS 7671 requirements.',
        },
        {
          icon: Globe,
          title: 'UK Soil Resistivity Database',
          description:
            'Built-in resistivity values for all common UK soil types — clay, loam, sand, chalk, gravel, and rock. Select the soil type or enter a measured value.',
        },
        {
          icon: Combine,
          title: 'Parallel Rod Calculations',
          description:
            'Calculate combined resistance for multiple earth rods with spacing correction factors. Determine how many rods are needed to achieve the target resistance.',
        },
        {
          icon: Target,
          title: 'RCD Compliance Check',
          description:
            'Automatically verifies that RA x IΔn ≤ 50 V for your chosen RCD rating. Clear pass/fail indication with the maximum permitted resistance displayed.',
        },
        {
          icon: BookOpen,
          title: 'BS 7671 Compliant',
          description:
            'All calculations follow BS 7671:2018+A3:2024 requirements for TT earthing systems. Verified against the IET Guidance Note 3 earthing section.',
        },
        {
          icon: BarChart3,
          title: 'What-If Analysis',
          description:
            'Quickly compare different rod lengths, soil conditions, and parallel configurations to find the most cost-effective solution for your site.',
        },
      ]}
      featuresHeading="Earth Rod Calculator Features"
      featuresSubheading="Purpose-built for electricians designing and installing TT earthing systems in the UK."
      faqs={[
        {
          question: 'What earth rod resistance do I need for a TT system with a 30 mA RCD?',
          answer:
            'BS 7671 requires that RA x IΔn ≤ 50 V, where RA is the earth electrode resistance and IΔn is the RCD rated residual operating current. For a 30 mA RCD: RA ≤ 50 / 0.03 = 1,667 ohms. In practice, most electricians aim for well below this — typically under 200 ohms — to provide a safety margin and account for seasonal variations in soil moisture that can increase resistance.',
        },
        {
          question: 'How deep should an earth rod be driven?',
          answer:
            'Standard earth rods for domestic TT installations are 1.2 m or 2.4 m long and are driven vertically into the ground so that the top of the rod is at least 600 mm below finished ground level. This depth protects the rod from mechanical damage and ensures it reaches soil that remains moist throughout the year. In areas with high soil resistivity, extension rods can be coupled together to achieve depths of 3 m, 4.8 m, or more. The deeper the rod, the lower the resistance.',
        },
        {
          question: 'Why is my earth rod resistance too high?',
          answer:
            'High earth rod resistance is almost always caused by high soil resistivity — dry sandy soil, gravel, chalk, or rock. Solutions include driving the rod deeper to reach moister soil layers, installing additional parallel rods spaced at least their length apart, relocating the rod to an area with better soil (garden bed vs gravel driveway), or using an earth mat or horizontal electrode in the trench. Watering the soil around the rod temporarily reduces resistance for testing but is not a permanent solution.',
        },
        {
          question: 'How do I test earth rod resistance on site?',
          answer:
            'Earth electrode resistance is tested using the fall-of-potential method with a dedicated earth electrode resistance tester. Three electrodes are used: the earth rod under test, a current electrode driven into the ground approximately 30-50 metres away, and a potential electrode driven at 62% of the distance between the other two (approximately 18-31 metres). The tester injects a test current and measures the voltage to calculate the resistance. This is documented in the IET Guidance Note 3 (GN3) and must be recorded on the electrical installation certificate.',
        },
        {
          question: 'Can I use the earthing conductor as the earth electrode?',
          answer:
            'No. The earthing conductor connects the main earthing terminal to the earth electrode — it is not the electrode itself. The earth electrode is the metallic component in direct contact with the ground — typically a driven rod, an earth mat, a buried tape, or a foundation earth electrode. The earthing conductor must be of adequate cross-sectional area (typically 16 mm² copper for domestic installations) and protected against corrosion and mechanical damage.',
        },
        {
          question: 'Does soil moisture affect earth rod resistance?',
          answer:
            'Yes, significantly. Soil resistivity drops as moisture content increases. A rod installed in summer when the soil is dry may show a resistance of 200 ohms, but the same rod in winter after heavy rain may show 50 ohms. The converse is also true — a rod that passes testing in winter may exceed the required resistance in a dry summer. This is why BS 7671 recommends testing in dry conditions when possible, and why a safety margin below the maximum permitted resistance is always advisable.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/earth-loop-impedance-calculator',
          title: 'Earth Loop Impedance Calculator',
          description:
            'Calculate Zs values and verify disconnection times for circuits protected by MCBs, fuses, and RCDs.',
          icon: Zap,
          category: 'Calculators',
        },
        {
          href: '/guides/earthing-arrangements',
          title: 'Earthing Arrangements Guide',
          description:
            'Complete guide to TN-S, TN-C-S, and TT earthing systems with BS 7671 requirements explained.',
          icon: BookOpen,
          category: 'Guides',
        },
        {
          href: '/tools/prospective-fault-current-calculator',
          title: 'Prospective Fault Current Calculator',
          description:
            'Calculate PSCC at the origin and at each distribution board for BS 7671 compliance.',
          icon: Zap,
          category: 'Calculators',
        },
        {
          href: '/tools/eicr-certificate',
          title: 'EICR Certificate',
          description:
            'Complete digital EICRs with automatic BS 7671 validation and earth electrode resistance recording.',
          icon: FileCheck2,
          category: 'Certificates',
        },
        {
          href: '/tools/rcd-testing-guide',
          title: 'RCD Testing Guide',
          description:
            'How to test RCDs correctly — trip times, test currents, and recording results on certificates.',
          icon: Shield,
          category: 'Guides',
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
      ctaHeading="Calculate earth rod resistance in seconds"
      ctaSubheading="Join UK electricians using Elec-Mate's 50+ calculators on every TT installation. 7-day free trial, cancel anytime."
      toolPath="/tools/earth-rod-resistance-calculator"
    />
  );
}
