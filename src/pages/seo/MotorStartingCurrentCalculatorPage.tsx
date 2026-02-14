import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Gauge,
  Zap,
  Activity,
  Calculator,
  BarChart3,
  Shield,
  Cable,
  Settings,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Lightbulb,
} from 'lucide-react';

export default function MotorStartingCurrentCalculatorPage() {
  return (
    <ToolTemplate
      title="Motor Starting Current Calculator | DOL & Star-Delta"
      description="Calculate motor starting current for DOL, star-delta, soft starter, and VFD starting methods. Determine the impact on supply voltage, protective device selection, and cable sizing. Part of 50+ free electrical calculators in Elec-Mate."
      datePublished="2026-02-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        {
          label: 'Motor Starting Current Calculator',
          href: '/tools/motor-starting-current-calculator',
        },
      ]}
      tocItems={[
        { id: 'what-is-starting-current', label: 'What Is Motor Starting Current?' },
        { id: 'dol-starting', label: 'DOL Starting (Direct-On-Line)' },
        { id: 'star-delta-starting', label: 'Star-Delta Starting' },
        { id: 'soft-starter', label: 'Soft Starter' },
        { id: 'vfd-starting', label: 'VFD (Variable Frequency Drive)' },
        { id: 'impact-on-supply', label: 'Impact on Supply and Voltage Drop' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Motor Calculations"
      badgeIcon={Gauge}
      heroTitle={
        <>
          <span className="text-yellow-400">Motor Starting Current Calculator</span> — DOL,
          Star-Delta, Soft Starter & VFD
        </>
      }
      heroSubtitle="Enter the motor kW rating, full load current, and starting method. The calculator determines the starting current, the duration of the inrush, and the impact on supply voltage. Select the correct protective device and cable size for any motor installation."
      heroFeaturePills={[
        { icon: Gauge, label: 'Starting Current' },
        { icon: Activity, label: 'DOL & Star-Delta' },
        { icon: Settings, label: 'Soft Starter & VFD' },
        { icon: Cable, label: 'Cable Sizing' },
      ]}
      readingTime={11}
      toolPath="/tools/motor-starting-current-calculator"
      keyTakeaways={[
        'Direct-on-line (DOL) motor starting draws 6-8 times the full load current (FLC) — a 30A motor draws 180-240A during DOL starting, lasting 2-10 seconds depending on the load.',
        'Star-delta starting reduces the starting current to approximately one-third of DOL starting current, but also reduces the starting torque to one-third — suitable for low-torque loads like centrifugal pumps and fans.',
        'Soft starters ramp the voltage gradually from 30-70% to 100%, limiting the starting current to 2-4 times FLC with adjustable ramp time.',
        'Variable Frequency Drives (VFDs) provide the gentlest start, limiting current to 100-150% FLC by controlling both voltage and frequency — but they introduce harmonic distortion.',
        'The motor starting method affects protective device selection, cable sizing, voltage drop, and transformer capacity — Elec-Mate calculates all of these on your phone.',
      ]}
      sections={[
        {
          id: 'what-is-starting-current',
          heading: 'What Is Motor Starting Current?',
          content: (
            <>
              <p>
                When an induction motor is first energised, it draws a starting current (also called
                inrush current or locked rotor current) that is significantly higher than its normal
                running current. This happens because at the moment of starting, the rotor is
                stationary and the motor acts almost like a short circuit — the back-EMF that
                normally limits the current has not yet developed.
              </p>
              <p>
                The starting current typically ranges from 6 to 8 times the full load current (FLC)
                for a standard induction motor with direct-on-line (DOL) starting. As the motor
                accelerates and the rotor begins to turn, the back-EMF increases and the current
                gradually reduces to the normal running level. The starting period typically lasts 2
                to 10 seconds for most commercial motors, depending on the motor size and the
                mechanical load being driven.
              </p>
              <p>
                This high starting current has significant implications for the electrical
                installation. The{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable must be sized
                </SEOInternalLink>{' '}
                to carry the starting current without excessive voltage drop, the protective device
                must be selected so it does not trip during the starting period, and the supply
                transformer must have sufficient capacity to deliver the starting current without
                excessive voltage dip affecting other equipment on the same supply.
              </p>
            </>
          ),
        },
        {
          id: 'dol-starting',
          heading: 'DOL Starting (Direct-On-Line)',
          content: (
            <>
              <p>
                Direct-on-line (DOL) starting is the simplest and most common method of starting a
                three-phase induction motor. The full supply voltage is applied directly to the
                motor terminals through a contactor. The motor draws its full starting current and
                produces its full starting torque.
              </p>
              <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-3">DOL Starting Characteristics</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Starting current:</strong> 6 to 8 times full load current (FLC). A
                      motor with a FLC of 50A will draw 300-400A during starting.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Starting torque:</strong> 100-200% of full load torque. DOL produces
                      the highest starting torque of any starting method.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Starting duration:</strong> typically 2-10 seconds for most commercial
                      motors. Larger motors or high-inertia loads take longer.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>MCB type:</strong> Type C (5-10x trip) or Type D (10-20x trip) MCBs
                      are required to avoid nuisance tripping during DOL starting.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                DOL starting is suitable for small to medium motors (typically up to 7.5kW to 15kW,
                depending on the supply capacity). For larger motors, the high starting current can
                cause unacceptable voltage drop on the supply, disturbing other equipment connected
                to the same network. The DNO may also restrict DOL starting of large motors if the
                supply is limited.
              </p>
            </>
          ),
        },
        {
          id: 'star-delta-starting',
          heading: 'Star-Delta Starting',
          content: (
            <>
              <p>
                Star-delta starting is a reduced-voltage starting method that uses a switching
                arrangement to connect the motor windings in star (Y) during starting and then
                switch to delta after the motor has accelerated. This reduces the starting current
                to approximately one-third of the DOL starting current.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">
                  Star-Delta Starting Characteristics
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Starting current:</strong> approximately 2 to 2.7 times FLC (one-third
                      of DOL starting current). A motor with 50A FLC draws approximately 100-135A in
                      star.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Starting torque:</strong> approximately 33% of full load torque
                      (one-third of DOL starting torque). This limits star-delta to low-torque
                      starting applications.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Transition current spike:</strong> when switching from star to delta,
                      there is a transient current spike that can be 10-14 times FLC for a fraction
                      of a second. This must be considered for protective device coordination.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Wiring requirement:</strong> the motor must have all six winding
                      terminals accessible (U1, V1, W1, U2, V2, W2). Six cables are needed between
                      the starter and the motor.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Star-delta starting is suitable for applications where the load torque is low during
                starting — centrifugal pumps, fans, compressors running unloaded, and similar
                equipment. It is not suitable for applications requiring high starting torque, such
                as conveyors with a loaded belt, crushers, or mixers.
              </p>
            </>
          ),
        },
        {
          id: 'soft-starter',
          heading: 'Soft Starter',
          content: (
            <>
              <p>
                A soft starter uses thyristors (silicon controlled rectifiers) to gradually increase
                the voltage applied to the motor from a set initial level (typically 30-70% of full
                voltage) to 100% over an adjustable ramp time. This provides a smooth, controlled
                start with limited starting current.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Soft Starter Characteristics</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Starting current:</strong> typically 2 to 4 times FLC, adjustable by
                      setting the initial voltage and ramp time. Much lower than DOL.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Starting torque:</strong> proportional to the square of the applied
                      voltage. At 50% voltage, torque is 25% of DOL torque. Adjustable via initial
                      voltage setting.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Ramp time:</strong> adjustable from 1 to 60 seconds typically. Longer
                      ramp times give gentler starts but may cause the motor to overheat during
                      extended acceleration.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Soft stop:</strong> many soft starters also provide a soft stop
                      function, gradually reducing voltage to decelerate the motor — useful for
                      preventing water hammer in pump applications.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Soft starters are widely used for pump and fan applications where the reduced
                mechanical stress of a gradual start extends the life of bearings, couplings, and
                driven equipment. They are simpler and less expensive than VFDs, making them a
                cost-effective solution when variable speed control is not required.
              </p>
            </>
          ),
        },
        {
          id: 'vfd-starting',
          heading: 'VFD (Variable Frequency Drive) Starting',
          content: (
            <>
              <p>
                A Variable Frequency Drive (VFD), also known as an inverter or variable speed drive
                (VSD), provides the most controlled method of motor starting. The VFD converts the
                fixed-frequency mains supply to a variable-frequency, variable-voltage output,
                allowing the motor speed to be controlled from zero to full speed and beyond.
              </p>
              <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-3">VFD Starting Characteristics</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Starting current:</strong> typically 100-150% of FLC — essentially no
                      inrush current. The VFD ramps the frequency and voltage together, maintaining
                      a constant V/f ratio.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Starting torque:</strong> up to 150% of full load torque available
                      from zero speed, making VFDs suitable for high-torque starting applications.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Speed control:</strong> provides continuous variable speed control
                      from 0 to 100% (and often above 100% in constant power mode), enabling energy
                      savings on variable-torque loads.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Harmonic distortion:</strong> VFDs draw non-sinusoidal current from
                      the supply, creating harmonic distortion. This must be considered for{' '}
                      <SEOInternalLink href="/tools/transformer-sizing-calculator">
                        transformer sizing
                      </SEOInternalLink>{' '}
                      and cable derating.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                VFDs offer the most flexible motor control but at a higher cost than DOL,
                star-delta, or soft starters. They are essential for applications requiring variable
                speed control — HVAC fans and pumps, conveyor speed adjustment, process control, and
                energy-saving applications where reducing motor speed significantly reduces energy
                consumption (the cube law: halving the speed of a centrifugal pump reduces power
                consumption to one-eighth).
              </p>
            </>
          ),
          appBridge: {
            title: 'Motor starting calculations on your phone',
            description:
              "Elec-Mate's motor starting calculator covers DOL, star-delta, soft starter, and VFD starting methods. Enter the motor rating and get the starting current, protective device recommendation, and cable size. Works offline on site.",
            icon: Gauge,
          },
        },
        {
          id: 'impact-on-supply',
          heading: 'Impact on Supply and Voltage Drop',
          content: (
            <>
              <p>
                Motor starting current creates a transient voltage drop on the supply that affects
                all other equipment connected to the same circuit, distribution board, or
                transformer. Excessive voltage drop during motor starting can cause:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Lighting flicker</strong> — visible flicker in lighting circuits,
                      especially noticeable with incandescent and halogen lamps. LED lamps may also
                      flicker depending on their driver design.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Equipment malfunction</strong> — sensitive electronic equipment
                      (computers, PLCs, control systems) may reset or malfunction if the voltage dip
                      exceeds their tolerance.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Other motor stalling</strong> — motors already running on the same
                      supply may stall if the voltage drops below approximately 80% of nominal.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Contactor dropout</strong> — contactors may release if the voltage dip
                      causes the coil voltage to fall below the hold-in threshold.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                BS 7671 Regulation 525 limits the voltage drop from the origin of the installation
                to any load point to 5% for motor circuits. However, the transient voltage dip
                during starting is a separate consideration — a dip greater than 10-15% at the point
                of common coupling is generally considered unacceptable. The{' '}
                <SEOInternalLink href="/tools/voltage-drop-calculator">
                  voltage drop calculator
                </SEOInternalLink>{' '}
                can help assess the steady-state voltage drop, while the motor starting current
                calculator determines the transient inrush that causes the momentary dip.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Determine the motor full load current',
          text: 'Find the full load current (FLC) from the motor nameplate or manufacturer datasheet. For three-phase motors, this can also be calculated from the rated kW, voltage, power factor, and efficiency using the formula: FLC = kW x 1000 / (root 3 x V x PF x efficiency).',
        },
        {
          name: 'Select the starting method',
          text: 'Choose the starting method based on the application requirements — DOL for simple small motors, star-delta for reduced current on low-torque loads, soft starter for smooth acceleration, or VFD for variable speed control.',
        },
        {
          name: 'Calculate the starting current',
          text: 'Apply the starting current multiplier for the chosen method: DOL = 6-8x FLC, star-delta = 2-2.7x FLC, soft starter = 2-4x FLC, VFD = 1-1.5x FLC. Use the actual motor data where available.',
        },
        {
          name: 'Check the voltage drop during starting',
          text: 'Calculate the voltage drop at the motor terminals during starting. The cable impedance and supply impedance both contribute to the voltage dip. If the dip exceeds 10-15%, consider a reduced-voltage starting method.',
        },
        {
          name: 'Select the protective device',
          text: 'Choose an MCB or MCCB type that will not trip during the starting period. Type B MCBs (3-5x trip) are not suitable for motor circuits. Type C (5-10x) suits soft starter and VFD applications. Type D (10-20x) is needed for DOL and star-delta starting.',
        },
        {
          name: 'Size the cable',
          text: 'Size the cable for the full load running current (not the starting current), applying BS 7671 correction factors. However, verify the cable can withstand the thermal effects of the starting current for the duration of the start.',
        },
      ]}
      howToHeading="How to Calculate Motor Starting Current"
      howToDescription="Follow these six steps to determine the starting current for any motor installation and select the correct protective device and cable size."
      features={[
        {
          icon: Gauge,
          title: 'All Starting Methods',
          description:
            'Calculate starting current for DOL, star-delta, soft starter, and VFD starting. Each method displays the current multiplier, starting torque, and typical duration.',
        },
        {
          icon: Activity,
          title: 'Voltage Dip Analysis',
          description:
            'Enter the supply impedance and cable impedance to calculate the voltage dip during motor starting. Flags results that exceed acceptable limits.',
        },
        {
          icon: Cable,
          title: 'Cable Sizing Integration',
          description:
            'Automatically determines the cable size required for the motor circuit, considering the full load current, starting current thermal effects, and voltage drop.',
        },
        {
          icon: Shield,
          title: 'MCB/MCCB Selection',
          description:
            'Recommends the correct protective device type (B, C, or D curve) and rating based on the motor FLC and starting current. Avoids nuisance tripping during starting.',
        },
        {
          icon: Calculator,
          title: 'Three-Phase & Single-Phase',
          description:
            'Handles both three-phase and single-phase motor calculations. Enter the motor rating and supply details to get the starting current for any configuration.',
        },
        {
          icon: BarChart3,
          title: 'Starting Current Profile',
          description:
            'Visual display of the current profile during starting — peak inrush, acceleration period, and transition to running current. Helps visualise the impact on the supply.',
        },
      ]}
      featuresHeading="Motor Starting Current Calculator Features"
      featuresSubheading="Purpose-built for UK electricians working on motor installations in commercial and industrial premises."
      faqs={[
        {
          question: 'Why does a motor draw so much current when starting?',
          answer:
            'When a motor is first energised, the rotor is stationary. The stator windings produce a rotating magnetic field that induces a voltage in the rotor conductors, causing current to flow and producing torque to accelerate the rotor. At standstill, the relative speed between the rotating field and the stationary rotor is at its maximum (this is called 100% slip). The high slip means a large voltage is induced in the rotor, drawing a large current from the supply through the stator. As the motor accelerates and the rotor speed approaches the synchronous speed of the rotating field, the slip decreases, the induced rotor voltage decreases, and the current falls to the normal running level. The locked rotor current (at 100% slip) is typically 6-8 times the full load current.',
        },
        {
          question: 'What MCB type should I use for motor circuits?',
          answer:
            'The MCB type depends on the starting method and the ratio of starting current to full load current. Type B MCBs (trip at 3-5 times rated current) are generally not suitable for motor circuits because the starting current will exceed the trip threshold. Type C MCBs (trip at 5-10 times rated current) are suitable for motors with soft starters or VFDs, where the starting current is limited to 2-4 times FLC. Type D MCBs (trip at 10-20 times rated current) are required for DOL starting, where the starting current is 6-8 times FLC, and for star-delta starting, where the transition spike can reach 10-14 times FLC momentarily. Always verify that the MCB will not trip during the starting period by comparing the starting current and duration against the MCB time-current characteristic.',
        },
        {
          question: 'When should I use star-delta starting instead of DOL?',
          answer:
            'Star-delta starting should be considered when the DOL starting current would cause unacceptable voltage drop on the supply, when the supply authority (DNO) restricts the maximum starting current, or when the mechanical shock of DOL starting could damage the driven equipment (couplings, gearboxes, belts). However, star-delta is only suitable for loads that require low starting torque — centrifugal pumps, fans, and compressors running unloaded. The starting torque in star is only one-third of the DOL starting torque, so loads that require high breakaway torque (conveyors, crushers, mixers) cannot be started in star. The motor must also have all six winding terminals accessible — motors wound for a single voltage (delta only) cannot be star-delta started.',
        },
        {
          question: 'How do VFDs affect the electrical installation?',
          answer:
            'VFDs have several effects on the electrical installation that must be considered. They draw non-sinusoidal current from the supply, creating harmonic distortion — typically the 5th and 7th harmonics are the most significant. This can cause overheating in cables and transformers, requiring derating or oversizing. The output waveform from a VFD contains high-frequency switching noise that can interfere with sensitive equipment and communication cables — screened motor cables and EMC filters may be required. VFDs also generate common-mode voltages that can cause bearing currents in the motor, leading to premature bearing failure — shaft grounding rings or insulated bearings may be needed for larger motors. Finally, the cable length between the VFD and motor is limited due to reflected wave effects from the high-frequency switching — typically 50-100 metres maximum without an output filter.',
        },
        {
          question: 'Can I use this calculator for single-phase motors?',
          answer:
            'Yes. The Elec-Mate motor starting current calculator handles both three-phase and single-phase motors. Single-phase induction motors (capacitor-start, capacitor-run, or split-phase) have different starting characteristics to three-phase motors. The starting current is typically 5-7 times FLC for capacitor-start motors and 3-5 times FLC for capacitor-start-capacitor-run motors. The calculator adjusts the starting current multiplier based on the motor type and starting configuration you select.',
        },
      ]}
      faqHeading="Frequently Asked Questions About Motor Starting Current"
      relatedPages={[
        {
          href: '/tools/transformer-sizing-calculator',
          title: 'Transformer Sizing Calculator',
          description:
            'Calculate transformer kVA rating considering motor starting current and load diversity for commercial installations.',
          icon: Zap,
          category: 'Tool',
        },
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'Size cables to BS 7671 with correction factors, voltage drop, and fault current verification for motor circuits.',
          icon: Cable,
          category: 'Tool',
        },
        {
          href: '/tools/three-phase-power-calculator',
          title: 'Three-Phase Power Calculator',
          description:
            'Calculate three-phase power, current, and voltage for motor loads with star and delta configurations.',
          icon: Activity,
          category: 'Tool',
        },
        {
          href: '/tools/voltage-drop-calculator',
          title: 'Voltage Drop Calculator',
          description:
            'Calculate voltage drop for motor circuits including the impact of starting current on long cable runs.',
          icon: BarChart3,
          category: 'Tool',
        },
        {
          href: '/tools/circuit-breaker-sizing-calculator',
          title: 'Circuit Breaker Sizing Calculator',
          description:
            'Select the correct MCB type (B, C, or D) and rating for motor circuits with Ib, In, Iz coordination.',
          icon: Shield,
          category: 'Tool',
        },
        {
          href: '/tools/busbar-sizing-calculator',
          title: 'Busbar Sizing Calculator',
          description:
            'Size busbars for distribution boards feeding motor loads, considering continuous current and short-time ratings.',
          icon: Building2,
          category: 'Tool',
        },
      ]}
      ctaHeading="Motor Calculations in Seconds on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site calculations. DOL, star-delta, soft starter, and VFD starting current calculations plus 50+ other calculators. 7-day free trial."
    />
  );
}
