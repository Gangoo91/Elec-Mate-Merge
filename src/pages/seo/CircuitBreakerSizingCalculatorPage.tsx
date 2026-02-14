import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calculator,
  Shield,
  Zap,
  BookOpen,
  Cable,
  Activity,
  FileCheck2,
  Gauge,
  Settings,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
} from 'lucide-react';

export default function CircuitBreakerSizingCalculatorPage() {
  return (
    <ToolTemplate
      title="Circuit Breaker Sizing Calculator | MCB Selection"
      description="Calculate the correct circuit breaker size for any circuit to BS 7671. Verify the Ib ≤ In ≤ Iz relationship, select the right MCB type (B, C, or D), and coordinate with cable current carrying capacity. Part of 50+ free electrical calculators."
      datePublished="2026-01-25"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        {
          label: 'Circuit Breaker Sizing Calculator',
          href: '/tools/circuit-breaker-sizing-calculator',
        },
      ]}
      tocItems={[
        { id: 'what-is-mcb-sizing', label: 'What Is MCB Sizing?' },
        { id: 'ib-in-iz-relationship', label: 'The Ib ≤ In ≤ Iz Rule' },
        { id: 'mcb-trip-curves', label: 'MCB Trip Curves: B, C, and D' },
        { id: 'cable-coordination', label: 'Cable and MCB Coordination' },
        { id: 'common-mcb-ratings', label: 'Common MCB Ratings and Uses' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="BS 7671 Compliant"
      badgeIcon={Shield}
      heroTitle={
        <>
          <span className="text-yellow-400">Circuit Breaker Sizing Calculator</span> — Select the
          Right MCB Every Time
        </>
      }
      heroSubtitle="Enter the design current, cable type, and installation conditions. The calculator selects the correct MCB rating, verifies the Ib ≤ In ≤ Iz coordination requirement, and confirms the cable is adequately protected to BS 7671. No more guesswork on protective device selection."
      heroFeaturePills={[
        { icon: Shield, label: 'MCB Selection' },
        { icon: Calculator, label: 'Ib ≤ In ≤ Iz Check' },
        { icon: Cable, label: 'Cable Coordination' },
        { icon: Settings, label: 'Type B, C & D' },
      ]}
      readingTime={10}
      keyTakeaways={[
        'The fundamental BS 7671 coordination rule is Ib ≤ In ≤ Iz — the design current must not exceed the MCB rating, which must not exceed the cable current carrying capacity.',
        'Type B MCBs trip at 3-5 times rated current and are used for resistive loads such as socket outlets, lighting, and immersion heaters.',
        'Type C MCBs trip at 5-10 times rated current and are suitable for circuits with moderate inrush current such as motors, fluorescent lighting, and small transformers.',
        'Type D MCBs trip at 10-20 times rated current and are used for high inrush loads such as X-ray machines, large motors, and welding equipment.',
        'The I2 ≤ 1.45 x Iz condition must also be satisfied — the fusing current of the MCB must not exceed 1.45 times the cable current carrying capacity to prevent overheating.',
      ]}
      sections={[
        {
          id: 'what-is-mcb-sizing',
          heading: 'What Is Circuit Breaker Sizing?',
          content: (
            <>
              <p>
                Circuit breaker sizing is the process of selecting a miniature circuit breaker (MCB)
                with the correct nominal current rating and trip curve for a given circuit. The MCB
                must be large enough to carry the normal load current without nuisance tripping, yet
                small enough to protect the cable from overcurrent and to disconnect the supply
                rapidly under fault conditions.
              </p>
              <p>
                BS 7671:2018+A3:2024 sets out the requirements for overload protection in
                Regulations 432 and 433. The protective device must satisfy two fundamental
                conditions: the nominal rating (In) must be at least equal to the design current
                (Ib) of the circuit, and the cable's current carrying capacity (Iz) must be at least
                equal to the nominal rating. This ensures the cable is never subjected to a
                sustained current above its safe operating limit.
              </p>
              <p>
                Selecting the wrong MCB rating can lead to two types of problems. If the MCB is too
                small, it will trip under normal load conditions, causing disruption to the circuit
                and the equipment it supplies. If the MCB is too large, it will fail to protect the
                cable from overload, allowing sustained currents that exceed the cable's thermal
                rating — leading to insulation degradation, overheating, and potentially fire. The{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                and circuit breaker sizing calculator work together to ensure both components are
                correctly matched.
              </p>
            </>
          ),
          appBridge: {
            title: 'Size Your MCB in Seconds',
            description:
              'Enter the design current and cable details. The calculator recommends the correct MCB rating, verifies Ib ≤ In ≤ Iz, and checks the I2 condition automatically.',
            icon: Shield,
          },
        },
        {
          id: 'ib-in-iz-relationship',
          heading: 'The Ib ≤ In ≤ Iz Rule Explained',
          content: (
            <>
              <p>
                The most fundamental coordination requirement in BS 7671 is expressed by the
                inequality Ib ≤ In ≤ Iz. This simple rule governs the relationship between the load,
                the protective device, and the cable:
              </p>
              <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">
                        Ib ≤ In — Device must carry the load
                      </p>
                      <p className="text-white text-sm">
                        The design current (Ib) must not exceed the nominal rating (In) of the
                        protective device. If Ib is 28A, the MCB must be at least 32A.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">
                        In ≤ Iz — Cable must carry the device rating
                      </p>
                      <p className="text-white text-sm">
                        The nominal rating of the protective device must not exceed the current
                        carrying capacity (Iz) of the cable after applying{' '}
                        <SEOInternalLink href="/tools/cable-derating-calculator">
                          correction factors
                        </SEOInternalLink>
                        . A 32A MCB requires a cable with Iz of at least 32A.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                There is also a second condition that must be checked: I2 ≤ 1.45 x Iz, where I2 is
                the current causing effective operation of the protective device. For MCBs to BS EN
                60898, I2 = 1.45 x In, which means this condition is automatically satisfied when In
                ≤ Iz. However, for BS 3036 semi-enclosed fuses, I2 can be up to 2 x In, which is why
                the Cf factor of 0.725 must be applied to ensure the cable is adequately protected.
              </p>
              <p>
                The Elec-Mate calculator checks both conditions automatically and flags any circuits
                where the coordination requirements are not met.
              </p>
            </>
          ),
        },
        {
          id: 'mcb-trip-curves',
          heading: 'MCB Trip Curves: Type B, C, and D',
          content: (
            <>
              <p>
                MCBs have two protection mechanisms: a thermal element for overload protection
                (which responds to sustained overcurrents) and a magnetic element for short circuit
                protection (which responds to high fault currents). The trip curve defines the
                magnetic tripping threshold — the instantaneous current at which the MCB trips
                immediately.
              </p>
              <div className="grid gap-4 sm:grid-cols-3 my-4">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <h4 className="font-bold text-yellow-400 text-lg mb-2">Type B</h4>
                  <p className="text-white text-2xl font-bold mb-2">3-5 x In</p>
                  <p className="text-white text-sm">
                    Trips magnetically at 3-5 times the rated current. Used for resistive loads:
                    socket outlets, lighting, immersion heaters, storage heaters.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <h4 className="font-bold text-yellow-400 text-lg mb-2">Type C</h4>
                  <p className="text-white text-2xl font-bold mb-2">5-10 x In</p>
                  <p className="text-white text-sm">
                    Trips magnetically at 5-10 times the rated current. Used for moderate inrush
                    loads: motors, fluorescent lighting, small transformers, air conditioning.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <h4 className="font-bold text-yellow-400 text-lg mb-2">Type D</h4>
                  <p className="text-white text-2xl font-bold mb-2">10-20 x In</p>
                  <p className="text-white text-sm">
                    Trips magnetically at 10-20 times the rated current. Used for very high inrush:
                    large motors, X-ray machines, welding equipment, UPS systems.
                  </p>
                </div>
              </div>
              <p>
                In UK domestic installations, Type B MCBs are used for virtually all circuits. Type
                C is reserved for circuits supplying equipment with significant inrush current.
                Using a Type C where a Type B would suffice means the MCB requires a higher fault
                current to trip magnetically, which affects the maximum permitted earth fault loop
                impedance and the{' '}
                <SEOInternalLink href="/tools/disconnection-time-calculator">
                  disconnection time
                </SEOInternalLink>{' '}
                verification.
              </p>
            </>
          ),
        },
        {
          id: 'cable-coordination',
          heading: 'Cable and MCB Coordination',
          content: (
            <>
              <p>
                Correct coordination between the MCB and the cable is essential for safety. The MCB
                must protect the cable from both sustained overload and short circuit fault current.
                For overload protection, the Ib ≤ In ≤ Iz rule ensures the cable is never subjected
                to a continuous current above its rating.
              </p>
              <p>
                For short circuit protection, the cable must be able to withstand the thermal
                effects of the fault current for the time it takes the MCB to disconnect. This is
                verified using the adiabatic equation from BS 7671 Regulation 434:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <p className="font-mono text-white text-center mb-3">S ≥ √(I²t) / k</p>
                <p className="text-white text-sm">
                  Where S is the minimum conductor CSA, I²t is the energy let-through of the MCB
                  (from manufacturer data), and k is a constant for the conductor and insulation
                  type (115 for copper/PVC, 143 for copper/XLPE). If the installed cable CSA is
                  greater than or equal to S, the cable is adequately protected.
                </p>
              </div>
              <p>
                In practice, for most domestic circuits, the standard cable sizes (1.5mm², 2.5mm²,
                4mm², 6mm², 10mm²) easily satisfy the adiabatic equation when protected by standard
                MCB ratings. The check becomes more critical on long cable runs, circuits with high
                prospective fault current, or where the cable CSA has been minimised. The{' '}
                <SEOInternalLink href="/tools/adiabatic-equation-calculator">
                  adiabatic equation calculator
                </SEOInternalLink>{' '}
                in Elec-Mate performs this verification automatically.
              </p>
            </>
          ),
          appBridge: {
            title: 'MCB Sizing with Full Cable Coordination',
            description:
              'The circuit breaker calculator checks Ib ≤ In ≤ Iz, verifies the adiabatic equation, and confirms disconnection times — all in one calculation.',
            icon: Settings,
          },
        },
        {
          id: 'common-mcb-ratings',
          heading: 'Common MCB Ratings and Typical Uses',
          content: (
            <>
              <p>
                Standard MCB ratings follow a preferred range defined in BS EN 60898: 6A, 10A, 16A,
                20A, 25A, 32A, 40A, 50A, and 63A. The rating you select depends on the design
                current of the circuit. Common domestic and commercial applications include:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">6A Type B:</strong> Lighting circuits
                      (domestic and commercial), small fixed loads.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">16A Type B:</strong> Immersion heaters,
                      towel rails, small radial circuits, outdoor sockets.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">20A Type B:</strong> Radial socket
                      circuits (up to 50m² floor area), water heaters, dedicated appliance circuits.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">32A Type B:</strong> Ring final circuits,
                      electric cookers up to 7kW, large shower circuits.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">40A Type B:</strong> Electric cookers over
                      7kW, large instantaneous electric showers (9-10.5kW).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">32A Type C:</strong> EV charger circuits
                      (7kW single-phase), air source heat pumps.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                The Elec-Mate calculator suggests the appropriate MCB rating based on the design
                current you enter, and recommends the correct trip curve based on the load type. It
                also flags situations where the next standard rating up may be needed — for example,
                when the design current is very close to a standard rating and there is a risk of
                nuisance tripping under normal operating conditions.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Calculate the design current (Ib)',
          text: 'Determine the maximum sustained current the circuit will carry. For resistive loads, Ib = Power / Voltage. For motor loads, use the full load current from the manufacturer. For discharge lighting, multiply lamp wattage by 1.8.',
        },
        {
          name: 'Select the MCB rating (In)',
          text: 'Choose the next standard MCB rating equal to or greater than the design current. Standard ratings are 6A, 10A, 16A, 20A, 25A, 32A, 40A, 50A, and 63A. Ensure In ≥ Ib.',
        },
        {
          name: 'Select the MCB type (B, C, or D)',
          text: 'Choose Type B for resistive loads (sockets, lighting, heaters), Type C for moderate inrush loads (motors, fluorescent lighting), or Type D for high inrush loads (welding, X-ray, large motors).',
        },
        {
          name: 'Verify cable coordination',
          text: 'Check that the cable current carrying capacity (Iz) after applying correction factors is at least equal to the MCB rating (In). If Iz < In, increase the cable size until the coordination requirement is met.',
        },
        {
          name: 'Check the I2 condition',
          text: 'Verify that I2 ≤ 1.45 x Iz, where I2 is the fusing current of the MCB. For MCBs to BS EN 60898, I2 = 1.45 x In, so this is automatically satisfied when In ≤ Iz.',
        },
      ]}
      howToHeading="How to Size a Circuit Breaker"
      howToDescription="Five steps to select the correct MCB rating and type for any circuit to BS 7671."
      features={[
        {
          icon: Calculator,
          title: 'Automatic MCB Selection',
          description:
            'Enter the design current and load type. The calculator recommends the correct MCB rating and trip curve, with alternatives if the primary selection is marginal.',
        },
        {
          icon: Shield,
          title: 'Ib ≤ In ≤ Iz Verification',
          description:
            'Automatically checks the fundamental coordination requirement. Flags any circuit where the MCB rating exceeds the cable capacity or is below the design current.',
        },
        {
          icon: Settings,
          title: 'Type B, C, and D Selection',
          description:
            'Recommends the appropriate trip curve based on the load characteristics. Explains why each type is selected and the implications for disconnection time.',
        },
        {
          icon: Cable,
          title: 'Cable Coordination Check',
          description:
            'Verifies the cable is adequately protected by the selected MCB. Checks both overload (Ib ≤ In ≤ Iz) and short circuit (adiabatic equation) protection.',
        },
        {
          icon: BookOpen,
          title: 'BS 7671:2018+A3:2024 Data',
          description:
            'All standard MCB ratings, trip curves, and coordination requirements from the current edition of BS 7671 including Amendment 3.',
        },
        {
          icon: Gauge,
          title: 'Works Offline on Site',
          description:
            'Size circuit breakers anywhere with no internet connection. All MCB data and cable tables are stored locally on your device.',
        },
      ]}
      featuresHeading="Circuit Breaker Sizing Features"
      featuresSubheading="Everything you need to select the right MCB for any circuit, with full BS 7671 coordination checks."
      faqs={[
        {
          question: 'What does Ib ≤ In ≤ Iz mean?',
          answer:
            'This is the fundamental protective device coordination rule from BS 7671. Ib is the design current — the maximum current the circuit will carry in normal service. In is the nominal rating of the protective device (MCB). Iz is the current carrying capacity of the cable after applying correction factors. The rule states that the MCB rating must be at least as large as the design current (so the MCB does not nuisance trip) and no larger than the cable capacity (so the cable is protected from overload). For example, if Ib = 28A and the cable Iz = 36A, you would select a 32A MCB: 28 ≤ 32 ≤ 36.',
        },
        {
          question: 'When should I use a Type C MCB instead of Type B?',
          answer:
            'Use a Type C MCB when the circuit supplies equipment with moderate inrush current — typically 5 to 10 times the normal running current. This includes induction motors, fluorescent lighting with magnetic ballasts, small transformers, and air conditioning compressors. The higher magnetic trip threshold (5-10 x In vs 3-5 x In for Type B) prevents the MCB from tripping on the startup inrush current. However, note that Type C MCBs have a lower maximum permitted Zs for disconnection time compliance, so you must verify that the earth fault loop impedance is low enough.',
        },
        {
          question: 'Can I use a 32A MCB on a 2.5mm² cable?',
          answer:
            'It depends on the installation method and correction factors. A 2.5mm² twin and earth cable has a tabulated Iz of 27A under Reference Method C (clipped direct) from Table 4D5. Since 32A exceeds 27A, this would not satisfy In ≤ Iz for a single radial circuit. However, for a ring final circuit, the ring configuration effectively puts the cable in parallel, allowing 2.5mm² to be used with a 32A MCB — this is the standard arrangement for domestic ring circuits. For a radial circuit requiring 32A protection, you would need to increase the cable to 4mm² (Iz = 36A under Reference Method C).',
        },
        {
          question: 'What is the breaking capacity of a domestic MCB?',
          answer:
            'MCBs to BS EN 60898 have a rated short circuit capacity (breaking capacity) of either 6kA, 10kA, or 15kA, marked on the device. Most domestic MCBs are rated at 6kA (6000A), which means they can safely interrupt a fault current of up to 6000A. The prospective short circuit current at the installation must not exceed the breaking capacity of the MCB. For the vast majority of UK domestic installations, the prospective fault current is well below 6kA. However, installations very close to a substation transformer may have higher fault levels, requiring MCBs with 10kA or higher breaking capacity.',
        },
        {
          question: 'How do I choose between an MCB and an RCBO?',
          answer:
            'An MCB provides overcurrent protection only (overload and short circuit). An RCBO combines overcurrent protection with residual current (earth leakage) protection in a single device. BS 7671 now requires 30mA RCD protection for all socket outlets up to 32A in domestic premises and for many other circuit types. If you use individual MCBs, you need a separate RCD upstream (typically a split-load or dual-RCD board arrangement). If you use RCBOs, each circuit has its own independent RCD protection, which means a fault on one circuit does not trip other circuits. RCBOs are more expensive per circuit but provide better discrimination and are increasingly the preferred choice for new installations.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'Size cables to BS 7671 with automatic correction factors, voltage drop, and fault withstand checks.',
          icon: Cable,
          category: 'Calculators',
        },
        {
          href: '/tools/cable-derating-calculator',
          title: 'Cable Derating Calculator',
          description:
            'Apply Ca, Cg, Ci, and Cf correction factors to determine the required cable current carrying capacity.',
          icon: Activity,
          category: 'Calculators',
        },
        {
          href: '/tools/disconnection-time-calculator',
          title: 'Disconnection Time Calculator',
          description:
            'Verify 0.4s and 5s disconnection time requirements for MCBs and fuses in TN and TT systems.',
          icon: AlertTriangle,
          category: 'Calculators',
        },
        {
          href: '/tools/adiabatic-equation-calculator',
          title: 'Adiabatic Equation Calculator',
          description: 'Verify cable fault current withstand using the BS 7671 adiabatic equation.',
          icon: BarChart3,
          category: 'Calculators',
        },
        {
          href: '/guides/consumer-unit-regulations',
          title: 'Consumer Unit Regulations',
          description:
            'Complete guide to consumer unit requirements under BS 7671 and Part P building regulations.',
          icon: BookOpen,
          category: 'Guides',
        },
        {
          href: '/tools/eicr-certificate',
          title: 'EICR Certificate',
          description:
            'Full EICR with AI board scanner, voice test entry, and automatic BS 7671 validation.',
          icon: FileCheck2,
          category: 'Certificates',
        },
      ]}
      ctaHeading="Size circuit breakers with confidence"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for MCB selection and cable coordination. 7-day free trial, cancel anytime."
      toolPath="/tools/circuit-breaker-sizing-calculator"
    />
  );
}
