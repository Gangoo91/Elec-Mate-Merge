/**
 * Module 3 · Section 5 · Subsection 7 — Starting and Speed Control Methods for Motors
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   DOL, star-delta, autotransformer, soft starter, VSD &mdash; the spectrum of
 *   motor-starting / speed-control technology, the affinity laws that drive HVAC
 *   energy savings, and harmonic mitigation that comes with VSDs.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Starting and Speed Control Methods for Motors - HNC Module 3 Section 5.7';
const DESCRIPTION =
  'Motor starting techniques including DOL, star-delta, soft starters and VSDs. Variable frequency drives, V/f control, vector control and energy-efficient pump/fan applications in building services.';

const quickCheckQuestions = [
  {
    id: 'dol-starting',
    question:
      'What is the typical starting current for a DOL (direct-on-line) starter compared to full load current?',
    options: [
      '2-3 times FLC',
      'Equal to FLC',
      '10-12 times FLC',
      '4-8 times FLC',
    ],
    correctIndex: 3,
    explanation:
      'DOL starting draws 4-8 times full load current (typically 6-7 times). This high inrush can cause voltage dips affecting other equipment, which is why DOL is limited to smaller motors (typically under 7.5kW in commercial buildings).',
  },
  {
    id: 'star-delta',
    question:
      'By what factor does star-delta starting reduce the starting current compared to DOL?',
    options: [
      '1/√3 (58%)',
      '1/4 (25%)',
      '1/3 (33%)',
      '1/2 (50%)',
    ],
    correctIndex: 2,
    explanation:
      'Star-delta starting reduces both starting current AND starting torque to 1/3 (33%) of DOL values. In star, line voltage is applied across two windings in series (V/√3 per winding), reducing current to 1/3.',
  },
  {
    id: 'vfd-frequency',
    question:
      'A 4-pole motor connected to a 50Hz VSD is operated at 25Hz. What is the synchronous speed?',
    options: [
      '750 rpm',
      '1500 rpm',
      '375 rpm',
      '3000 rpm',
    ],
    correctIndex: 0,
    explanation:
      'Synchronous speed Ns = (120 × f) / p = (120 × 25) / 4 = 750 rpm. Halving the frequency halves the speed. The actual rotor speed will be slightly less due to slip.',
  },
  {
    id: 'pump-affinity',
    question:
      'According to the pump affinity laws, if pump speed is halved, power consumption becomes:',
    options: [
      'Half (50%)',
      'Quarter (25%)',
      'One-eighth (12.5%)',
      'One-sixteenth (6.25%)',
    ],
    correctIndex: 2,
    explanation:
      'Power is proportional to speed cubed: P2/P1 = (N2/N1)³. Halving speed: P2 = P1 × (0.5)³ = 0.125 × P1 = 12.5%. This is why VSDs offer massive energy savings on pumps and fans.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'For a standard induction motor, what is the relationship between a reduced-voltage start and starting torque?',
    options: [
      'Torque is unaffected because it depends only on frequency',
      'Reduced voltage cuts torque in proportion to voltage squared',
      'Torque increases as the starting voltage is reduced',
      'Torque falls in direct proportion to the voltage reduction',
    ],
    correctAnswer: 1,
    explanation:
      'For standard induction motors, torque is proportional to voltage squared. Any method that reduces voltage (and hence current) also reduces starting torque - star-delta reduces both to 1/3, soft starters reduce both proportionally.',
  },
  {
    id: 2,
    question: 'What is the main advantage of a soft starter over star-delta starting?',
    options: [
      'It allows full variable-speed control after starting',
      'It requires only a three-terminal motor connection',
      'Smooth, adjustable acceleration without current transients',
      'It draws no harmonic current during the start ramp',
    ],
    correctAnswer: 2,
    explanation:
      "Soft starters use thyristors to gradually increase voltage, providing smooth acceleration without the current spike that occurs at star-delta changeover. Starting current and time are adjustable, and there's no mechanical switching.",
  },
  {
    id: 3,
    question:
      'A VFD operating in V/f control maintains a constant ratio of voltage to frequency. Why is this necessary?',
    options: [
      'To reduce harmonic distortion',
      'To maintain constant motor current',
      'To comply with BS 7671 requirements',
      'To maintain constant magnetic flux in the motor',
    ],
    correctAnswer: 3,
    explanation:
      'Motor flux is proportional to V/f. Maintaining constant V/f ratio keeps flux constant, ensuring full torque capability across the speed range. Reducing frequency without reducing voltage would cause magnetic saturation and excessive current.',
  },
  {
    id: 4,
    question:
      'What is the typical energy saving when a fan running at 80% speed compared to throttling at full speed?',
    options: [
      '49%',
      '36%',
      '20%',
      '80%',
    ],
    correctAnswer: 0,
    explanation:
      'Using the fan affinity law: Power = Speed³. At 80% speed, power = (0.8)³ = 0.512 = 51.2% of full speed power. Savings = 100% - 51.2% = 48.8% ≈ 49%. Throttling wastes energy as heat in the damper/valve.',
  },
  {
    id: 5,
    question:
      'Which motor starting method is most suitable for a large chiller compressor requiring full load starting?',
    options: [
      'Star-delta (low starting torque acceptable)',
      'VFD (variable speed operation beneficial)',
      'DOL (if supply can handle inrush)',
      'Soft starter (smooth start preferred)',
    ],
    correctAnswer: 1,
    explanation:
      'Large chiller compressors benefit most from VFDs: soft starting prevents mechanical shock, variable speed matches capacity to load, and energy savings are substantial. Modern chillers often have integral VFDs.',
  },
  {
    id: 6,
    question: 'What is the main disadvantage of star-delta starting?',
    options: [
      'It cannot be used on any three-phase motor',
      'It draws a higher inrush current than DOL starting',
      'Current spike at changeover and reduced starting torque',
      'It provides no overload protection for the motor',
    ],
    correctAnswer: 2,
    explanation:
      'Star-delta has two issues: (1) starting torque is only 33% of DOL - may not start high-inertia loads, and (2) a current transient occurs at changeover from star to delta, potentially causing mechanical stress.',
  },
  {
    id: 7,
    question:
      'A building BMS requests a pump to run at 40% flow. Using a VSD, what percentage of full speed power is consumed?',
    options: [
      '40%',
      '16%',
      '2.6%',
      '6.4%',
    ],
    correctAnswer: 3,
    explanation:
      'Flow is proportional to speed, so 40% flow = 40% speed. Power = (0.4)³ = 0.064 = 6.4% of full speed power. This demonstrates the massive energy savings VSDs provide for variable flow applications.',
  },
  {
    id: 8,
    question: 'What type of control does a VFD use for precise torque control at low speeds?',
    options: [
      'Vector control (FOC)',
      'PWM control',
      'V/f control',
      'Scalar control',
    ],
    correctAnswer: 0,
    explanation:
      'Vector control (Field Oriented Control) independently controls flux and torque-producing currents, enabling precise torque control even at standstill. V/f (scalar) control is simpler but has poor low-speed torque performance.',
  },
  {
    id: 9,
    question: 'Why must VFDs be installed with input line reactors or filters?',
    options: [
      'To increase starting torque',
      'To reduce harmonics fed back to the supply',
      'To improve motor efficiency',
      'To enable regenerative braking',
    ],
    correctAnswer: 1,
    explanation:
      'VFD rectifiers draw non-sinusoidal current, generating harmonics (5th, 7th, 11th, 13th) that pollute the supply and can affect other equipment. Line reactors or active filters reduce THD to acceptable levels (typically <8% per G5/4).',
  },
  {
    id: 10,
    question:
      'An escalator motor runs continuously at constant speed. Which starting method is most appropriate?',
    options: [
      'DOL - simple and reliable for constant speed',
      'Star-delta - reduced starting current',
      'VFD - energy saving in standby mode',
      'Soft starter - smooth passenger experience',
    ],
    correctAnswer: 2,
    explanation:
      'Modern escalators use VFDs to enable standby mode (slow speed when unoccupied), regenerative braking on descent, and smooth starting/stopping. Energy savings of 30-50% are typical compared to fixed-speed operation.',
  },
];

const faqs = [
  {
    question: 'When should I use DOL starting versus reduced voltage starting?',
    answer:
      'Use DOL for motors up to approximately 7.5kW where the supply can handle 6-8× FLC inrush without excessive voltage drop (<3% at the motor terminals). For larger motors, or where voltage dips affect other sensitive equipment, use reduced voltage starting (star-delta, soft starter, or VFD). Check with the DNO for motors above 5.5kW on single-phase or 11kW on three-phase.',
  },
  {
    question: 'What is the difference between a soft starter and a VFD?',
    answer:
      'A soft starter only controls starting and stopping - the motor runs at full speed once started. A VFD (Variable Frequency Drive) can control speed continuously. Soft starters are cheaper and simpler when variable speed is not required. VFDs provide energy savings, precise speed control, and often better motor protection, but cost more and generate harmonics.',
  },
  {
    question: 'Can any motor be used with a VFD?',
    answer:
      'Standard induction motors can be used but may need derating at low speeds due to reduced cooling. For continuous operation below 20Hz, use an inverter-duty motor with independent cooling (IC416) or fit a force-cooling fan. Motor insulation must withstand VFD voltage spikes - Class H insulation or inverter-duty rated is recommended.',
  },
  {
    question: 'What are the harmonic issues with VFDs and how are they addressed?',
    answer:
      'VFD rectifiers draw non-sinusoidal current, generating odd harmonics (5th, 7th, 11th, 13th). Solutions include: input line reactors (3-5% impedance reduces THD), passive harmonic filters (for specific harmonics), active front-end drives (lowest THD, regenerative), or 12/18-pulse rectifiers for large drives. UK standard G5/4 limits harmonic distortion.',
  },
  {
    question: 'How do I calculate energy savings from fitting a VFD to a pump?',
    answer:
      'Use the affinity laws: Power ∝ Speed³. If a pump currently throttled to 70% flow is converted to VFD control at 70% speed, power reduces to (0.7)³ = 0.343 = 34.3% of original. Annual savings = hours × kW × (1 - 0.343) × £/kWh. Typical payback for HVAC pumps and fans is 1-3 years.',
  },
  {
    question: 'What is sensorless vector control?',
    answer:
      'Sensorless vector control estimates rotor position and speed from motor current and voltage measurements, eliminating the need for an encoder. It provides better torque control than V/f at low speeds but not as precise as closed-loop vector control with encoder feedback. Suitable for most HVAC applications where precise positioning is not required.',
  },
];

const HNCModule3Section5_7 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 5 · Subsection 7"
            title="Starting and speed control methods for motors"
            description="From DOL starters to variable frequency drives - controlling motor starting current and speed for building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You apply the spectrum: DOL (small motors &lt; 7.5 kW where inrush is acceptable) &rarr; star-delta (legacy) &rarr; soft starter (no speed control) &rarr; VSD (speed + soft start + energy saving).',
              'You apply the cube affinity law (P &prop; n&sup3;) to fan and pump duty &mdash; running at 80 % speed cuts power demand to 51 %, the headline VSD energy-saving figure.',
              'You specify VSDs to IES2 efficiency (Ecodesign Reg 2019/1781) and add line reactor / EMC filter / harmonic mitigation against G5/5 limits.',
              'You design out star-delta on new installations &mdash; replaced by soft starter or VSD which are now the BSE default for fan / pump / compressor duties.',
            ]}
          />

          <RegsCallout
            source="Commission Regulation (EU) 2019/1781 (retained as UK law) — Ecodesign requirements for electric motors and variable speed drives"
            clause="Variable speed drives placed on the EU/UK market from 1 July 2021 within the scope of the regulation shall meet IES2 efficiency level. The combined motor+drive package efficiency shall be assessed and declared per IEC 61800-9 series."
            meaning={
              <>
                The retained Ecodesign regulation places VSDs on the same legal footing as
                motors &mdash; IES2 minimum efficiency, declared per IEC 61800-9 packaged
                drive standard. As BSE designer specifying fan / pump VSDs you must
                verify the IES2 declaration on the manufacturer&rsquo;s submission and
                document compliance for the SBEM / Part L 2021 evidence.
              </>
            }
            cite="Source: Commission Regulation (EU) 2019/1781 (retained UK law); BS EN 61800-9 series (drive efficiency); BS EN 61800-3 (EMC for adjustable-speed drives); ENA G5/5 (harmonic limits at the PCC)"
          />

          <LearningOutcomes
            outcomes={[
              "Compare DOL, star-delta, auto-transformer and soft starter methods",
              "Explain VFD operation, V/f control and vector control principles",
              "Calculate energy savings using pump and fan affinity laws",
              "Select appropriate starting methods for building services loads",
              "Understand harmonic issues and mitigation techniques",
              "Apply speed control to escalators, conveyors and HVAC systems",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="In 30 seconds">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>DOL:</strong> Simple but high inrush (6-8× FLC) - small motors only</li>
              <li><strong>Star-delta:</strong> Reduces current to 1/3 but also torque to 1/3</li>
              <li><strong>Soft starters:</strong> Smooth ramp-up, adjustable current limit</li>
              <li><strong>VFDs:</strong> Variable speed, massive energy savings on pumps/fans</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>HVAC:</strong> AHU fans, chilled water pumps, cooling towers</li>
              <li><strong>Pumps:</strong> Affinity laws - P ∝ Speed³ (huge savings)</li>
              <li><strong>Escalators:</strong> VFDs for standby mode, regen braking</li>
              <li><strong>BMS:</strong> Speed control via 0-10V or Modbus signals</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Direct-On-Line (DOL) Starting">
            <p>
              DOL starting is the simplest method - the motor is connected directly to the full
              supply voltage via a contactor. While straightforward, the high starting current
              (typically 6-8 times full load current) limits its use to smaller motors.
            </p>

              <p className="text-sm font-medium text-white">DOL Starter Components:</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Main contactor:</strong> Switches all three phases simultaneously
                </li>
                <li>
                  <strong>Overload relay:</strong> Thermal or electronic, trips on sustained
                  overcurrent
                </li>
                <li>
                  <strong>Control circuit:</strong> Start/stop pushbuttons, auxiliary contacts
                </li>
                <li>
                  <strong>Protection:</strong> MCB or fuses sized for starting current
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                DOL Starting Characteristics
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Starting current</strong> — 6-8 × FLC — Can be 4-10× depending on motor</li>
              <li><strong>Starting torque</strong> — 100-200% FLT — Full torque available from start</li>
              <li><strong>Voltage at motor</strong> — 100% — Full line voltage applied</li>
              <li><strong>Typical max size</strong> — 7.5-11kW — Depends on supply capacity</li>
              <li><strong>Cost</strong> — Lowest — Simple, few components</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">When to Use DOL</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  Small motors (typically under 7.5kW in commercial buildings)
                </li>
                <li>
                  Supply can handle inrush without excessive voltage drop (&lt;3%)
                </li>
                <li>Load can tolerate sudden mechanical shock at start</li>
                <li>Infrequent starting (voltage dips acceptable)</li>
              </ul>

            <p>
              <strong>DNO notification:</strong> Motors above 5.5kW single-phase or 11kW three-phase
              may require DNO approval due to starting current impact on the local network.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <ConceptBlock title="Star-Delta Starting">
            <p>
              Star-delta starting reduces starting current by initially connecting motor windings in
              star configuration, then switching to delta once the motor approaches running speed.
              This requires a motor with six terminals (both ends of each winding accessible).
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Star vs Delta Configuration
              </p>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Star (Y) Connection</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Voltage per winding = VL / √3 = 230V</li>
                    <li>Current per winding = Line current</li>
                    <li>Power = 1/3 of delta power</li>
                    <li>Torque = 1/3 of delta torque</li>
                  </ul>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Delta (Δ) Connection</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Voltage per winding = VL = 400V</li>
                    <li>Current per winding = IL / √3</li>
                    <li>Full rated power</li>
                    <li>Full rated torque</li>
                  </ul>

              

              <p className="text-sm font-medium text-elec-yellow/80">
                Star-Delta Starting Sequence
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Start</strong> — Star (Y) — 33% of DOL — 33% of DOL</li>
              <li><strong>2. Accelerate</strong> — Star (Y) — Decreasing — Accelerating load</li>
              <li><strong>3. Changeover</strong> — Open → Delta — Current spike — Torque spike</li>
              <li><strong>4. Run</strong> — Delta (Δ) — FLC — 100% FLT</li>
            </ul>

              <p className="text-sm font-medium text-white">Advantages and Disadvantages:</p>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Advantages</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Starting current reduced to 1/3 of DOL</li>
                    <li>Simple, robust, proven technology</li>
                    <li>No electronics - suitable for harsh environments</li>
                    <li>Lower cost than soft starters/VFDs</li>
                  </ul>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Disadvantages</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Starting torque also reduced to 1/3</li>
                    <li>Current transient at changeover</li>
                    <li>Fixed reduction - not adjustable</li>
                    <li>Requires 6-terminal motor</li>
                  </ul>

              

            <p>
              <strong>Application note:</strong> Star-delta is suitable for low-inertia loads that
              can accelerate to near running speed in star. High-inertia loads may stall or
              experience severe changeover transients.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="Auto-transformer and Soft Starters">
            <p>
              Auto-transformer starters and soft starters both provide reduced voltage starting with
              more flexibility than star-delta. Auto-transformers use tapped windings, while soft
              starters use power electronics for smooth, adjustable control.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Auto-transformer Starting
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  Uses tapped auto-transformer (typically 50%, 65%, 80% taps)
                </li>
                <li>
                  Starting current = (tap%)² × DOL current (e.g., 65% tap = 42% current)
                </li>
                <li>Starting torque = (tap%)² × DOL torque</li>
                <li>Line current is further reduced by transformer action</li>
                <li>
                  Used for large motors where star-delta torque is insufficient
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">Soft Starter Operation</p>
              <p>
                Soft starters use back-to-back thyristors (SCRs) or triacs to control the voltage
                applied to the motor by phase-angle control. Voltage ramps up gradually from a
                preset initial value to full voltage over an adjustable time period.
              </p>

                
                  <p className="font-bold text-elec-yellow mb-1">Ramp Time</p>
                  <p className="text-white text-xs">1-60 seconds typical</p>

                
                  <p className="font-bold text-elec-yellow mb-1">Initial Voltage</p>
                  <p className="text-white text-xs">30-70% adjustable</p>

                
                  <p className="font-bold text-elec-yellow mb-1">Current Limit</p>
                  <p className="text-white text-xs">200-500% FLC settable</p>

              

              <p className="text-sm font-medium text-elec-yellow/80">Soft Starter Features</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Adjustable ramp time</strong> — Match acceleration to load requirements</li>
              <li><strong>Current limiting</strong> — Precise control of maximum starting current</li>
              <li><strong>Soft stop</strong> — Prevents water hammer in pump systems</li>
              <li><strong>Kick start</strong> — Pulse of higher voltage to break static friction</li>
              <li><strong>Motor protection</strong> — Overload, phase loss, phase imbalance, stall</li>
              <li><strong>Bypass contactor</strong> — Thyristors bypassed at full speed (reduces losses)</li>
            </ul>

              <p className="text-sm font-medium text-orange-300 mb-2">
                Important: Soft Starter Limitations
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Runs at fixed speed once started - no speed control</li>
                <li>Starting torque still reduced with reduced voltage</li>
                <li>Generates harmonics during ramp (phase-angle control)</li>
                <li>Heat dissipation required - adequate ventilation essential</li>
              </ul>
          </ConceptBlock>

          <ConceptBlock title="Variable Frequency Drives (VFDs/VSDs)">
            <p>
              Variable Frequency Drives (also called Variable Speed Drives, VSDs, or inverters)
              convert fixed-frequency AC to variable-frequency AC, enabling precise speed control of
              induction motors. They are now the standard for HVAC applications.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">VFD Power Circuit</p>

                
                  <p className="font-bold text-white mb-1">Rectifier</p>
                  <p className="text-white text-xs">AC → DC</p>
                  <p className="text-white text-xs mt-1">Diode bridge or active front end</p>

                
                  <p className="font-bold text-white mb-1">DC Link</p>
                  <p className="text-white text-xs">Energy storage</p>
                  <p className="text-white text-xs mt-1">Capacitors, smooth DC bus</p>

                
                  <p className="font-bold text-white mb-1">Inverter</p>
                  <p className="text-white text-xs">DC → Variable AC</p>
                  <p className="text-white text-xs mt-1">IGBT PWM switching</p>

              

              <p className="text-sm font-medium text-white">VFD Speed Control Principle:</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  Motor speed is proportional to supply frequency: N<sub>s</sub> = 120f/p
                </li>
                <li>VFD varies output frequency from 0-50Hz (or higher)</li>
                <li>
                  Voltage must be varied with frequency to maintain flux (V/f control)
                </li>
                <li>
                  PWM (Pulse Width Modulation) creates sinusoidal current in motor
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">VFD Operating Range</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>0-50Hz (base speed)</strong> — 0-400V (constant V/f) — Constant torque region</li>
              <li><strong>50-100Hz (field weakening)</strong> — 400V (constant) — Constant power, reduced torque</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                VFD Advantages for Building Services
              </p>

                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Precise speed control (0.1% accuracy)</li>
                  <li>Soft starting without current spikes</li>
                  <li>Controlled stopping and positioning</li>
                  <li>Regenerative braking (active front end)</li>
                </ul>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Massive energy savings on pumps/fans</li>
                  <li>Power factor correction (near unity pf)</li>
                  <li>Comprehensive motor protection</li>
                  <li>BMS integration via Modbus/BACnet</li>
                </ul>

            

            <p>
              <strong>Low speed operation:</strong> Standard motors overheat below 20Hz due to
              reduced cooling. Use inverter-duty motors with independent cooling (IC416) or limit
              minimum speed to 20% for standard motors.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="V/f Control and Vector Control">
            <p>
              VFDs use different control strategies depending on application requirements. V/f
              (scalar) control is simpler and suitable for most HVAC applications. Vector control
              provides superior dynamic performance for demanding applications.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                V/f (Volts/Hertz) Control
              </p>

                <p>
                  Also called scalar control, V/f maintains a constant ratio of voltage to
                  frequency. This keeps motor flux approximately constant, ensuring rated torque is
                  available across the speed range.
                </p>
                <p><strong>V/f = 400V / 50Hz = 8 V/Hz = constant</strong></p>
                <p>
                  At 25Hz, voltage would be: 25 × 8 = 200V. At low frequencies (&lt;5Hz), voltage is
                  boosted above the V/f line to compensate for stator resistance voltage drop.
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                V/f vs Vector Control Comparison
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Control method</strong> — Voltage and frequency — Flux and torque currents</li>
              <li><strong>Low speed torque</strong> — Poor (voltage boost helps) — Excellent (full torque at zero speed)</li>
              <li><strong>Dynamic response</strong> — Slow (100-200ms) — Fast (5-10ms)</li>
              <li><strong>Speed accuracy</strong> — ±1-3% (open loop) — ±0.01% (with encoder)</li>
              <li><strong>Setup complexity</strong> — Simple — Requires motor auto-tune</li>
              <li><strong>Typical applications</strong> — Fans, pumps, conveyors — Hoists, cranes, winders</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">Vector Control Types</p>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Sensorless Vector</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Estimates rotor position from motor currents</li>
                    <li>No encoder required</li>
                    <li>Good torque down to ~1Hz</li>
                    <li>Suitable for most HVAC applications</li>
                  </ul>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Closed-Loop Vector (FOC)</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Uses encoder for rotor position feedback</li>
                    <li>Full torque at zero speed</li>
                    <li>Precise positioning capability</li>
                    <li>Required for lifts, hoists, servo applications</li>
                  </ul>

              

            <p>
              <strong>HVAC applications:</strong> V/f or sensorless vector control is adequate for
              pumps and fans. Closed-loop vector is only needed for lifts, escalators requiring
              precise speed control, or positioning applications.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Energy Savings with Variable Speed Drives">
            <p>
              The most compelling reason to use VSDs in building services is energy savings. For
              centrifugal loads like pumps and fans, reducing speed reduces power consumption
              dramatically due to the affinity laws (also called fan/pump laws).
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Pump and Fan Affinity Laws
              </p>

                
                  <p><strong>Q ∝ N</strong></p>
                  <p className="text-sm text-white mt-1">Flow</p>
                  <p>proportional to speed</p>

                
                  <p><strong>H ∝ N²</strong></p>
                  <p className="text-sm text-white mt-1">Head/Pressure</p>
                  <p>proportional to speed²</p>

                
                  <p><strong>P ∝ N³</strong></p>
                  <p className="text-sm text-white mt-1">Power</p>
                  <p>proportional to speed³</p>

              

              <p className="text-sm font-medium text-elec-yellow/80">
                Power vs Speed - The Cube Law Effect
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>100%</strong> — 100% — 100% — 100% — 0%</li>
              <li><strong>80%</strong> — 80% — 64% — 51.2% — 48.8%</li>
              <li><strong>60%</strong> — 60% — 36% — 21.6% — 78.4%</li>
              <li><strong>50%</strong> — 50% — 25% — 12.5% — 87.5%</li>
              <li><strong>40%</strong> — 40% — 16% — 6.4% — 93.6%</li>
            </ul>

              <p className="text-sm font-medium text-white">
                VSD vs Traditional Flow Control:
              </p>

                
                  <p className="font-medium text-red-300 mb-1">Throttling/Dampers</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Motor runs at full speed</li>
                    <li>Energy wasted as heat in valve/damper</li>
                    <li>Valve wear, noise, maintenance</li>
                    <li>Poor control accuracy</li>
                  </ul>

                
                  <p className="font-medium text-green-300 mb-1">VSD Speed Control</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Motor speed matches demand</li>
                    <li>Energy savings follow cube law</li>
                    <li>Reduced mechanical wear</li>
                    <li>Precise BMS control</li>
                  </ul>

              

              <p className="text-sm font-medium text-green-300 mb-2">Typical VSD Payback Periods</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>HVAC fans (AHUs):</strong> 1-2 years (often operate at part load)
                </li>
                <li>
                  <strong>Chilled water pumps:</strong> 1-3 years (variable cooling demand)
                </li>
                <li>
                  <strong>Condenser water pumps:</strong> 2-3 years (seasonal variation)
                </li>
                <li>
                  <strong>Cooling tower fans:</strong> 1-2 years (temperature dependent)
                </li>
              </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <ConceptBlock title="Building Services Applications">
            <p className="text-sm font-medium text-elec-yellow/80">
                Pump Control Applications
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>LTHW heating</strong> — ΔP control (constant pressure) — 30-50%</li>
              <li><strong>CHW cooling</strong> — ΔT control or ΔP control — 40-60%</li>
              <li><strong>Condenser water</strong> — Temperature control — 20-40%</li>
              <li><strong>Booster sets</strong> — Pressure control, duty/assist — 30-50%</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Fan Control Applications
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>AHU supply fans</strong> — Duct static pressure or CO₂ — 40-60%</li>
              <li><strong>AHU extract fans</strong> — Track supply or pressure control — 40-60%</li>
              <li><strong>Cooling tower fans</strong> — Condenser water temperature — 30-50%</li>
              <li><strong>Car park ventilation</strong> — CO level control, jet fans — 50-70%</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Escalators and Moving Walkways
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Speed control:</strong> Slow/standby when unoccupied, full speed when in
                  use
                </li>
                <li>
                  <strong>Detection:</strong> PIR sensors or pressure mats trigger acceleration
                </li>
                <li>
                  <strong>Regeneration:</strong> Descending escalators feed energy back to supply
                </li>
                <li>
                  <strong>Savings:</strong> 30-50% compared to constant-speed operation
                </li>
                <li>
                  <strong>Standards:</strong> EN 115 covers safety and speed requirements
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">Conveyor Systems</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Soft starting:</strong> Prevents belt slip and material spillage
                </li>
                <li>
                  <strong>Speed matching:</strong> Multiple conveyors synchronised
                </li>
                <li>
                  <strong>Load sensing:</strong> Speed varies with product flow
                </li>
                <li>
                  <strong>Regeneration:</strong> Downhill or braking energy recovered
                </li>
                <li>
                  <strong>Applications:</strong> Baggage handling, distribution centres,
                  manufacturing
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">BMS Integration</p>
              <p>
                Modern VSDs integrate with Building Management Systems for optimised control:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Analogue:</strong> 0-10V or 4-20mA speed reference from BMS
                </li>
                <li>
                  <strong>Modbus RTU/TCP:</strong> Digital communication, full parameter access
                </li>
                <li>
                  <strong>BACnet:</strong> Native building automation protocol
                </li>
                <li>
                  <strong>Feedback:</strong> Speed, current, power, fault status to BMS
                </li>
              </ul>
          </ConceptBlock>

          <ConceptBlock title="Harmonic Considerations">
            <p>
              VFDs with standard diode rectifiers draw non-sinusoidal current from the supply,
              generating harmonics that can affect other equipment. Understanding and mitigating
              harmonics is essential for VFD installations.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Typical Harmonic Content
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>5th</strong> — 250Hz — 30-40% — Motor heating, vibration</li>
              <li><strong>7th</strong> — 350Hz — 15-25% — Motor heating, vibration</li>
              <li><strong>11th, 13th</strong> — 550Hz, 650Hz — 5-10% — Cable heating, interference</li>
            </ul>

              <p className="text-sm font-medium text-white">Harmonic Mitigation Methods:</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Line reactors (3-5%):</strong> Simple, reduce THD from 80% to 35-40%
                </li>
                <li>
                  <strong>DC link choke:</strong> Smooths DC bus, reduces harmonics
                </li>
                <li>
                  <strong>Passive filters:</strong> Tuned LC circuits for specific harmonics
                </li>
                <li>
                  <strong>Active filters:</strong> Electronic cancellation, best THD reduction
                </li>
                <li>
                  <strong>12/18-pulse rectifiers:</strong> Phase shifting cancels lower harmonics
                </li>
                <li>
                  <strong>Active front end:</strong> Regenerative, near-sinusoidal current, unity pf
                </li>
              </ul>

            <p>
              <strong>UK Standard:</strong> Engineering Recommendation G5/4 sets limits for harmonic
              distortion. For larger VFD installations (&gt;100kVA), harmonic assessment and
              mitigation may be required.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
                Example 1: Star-Delta Starting Current
              </p>
              <p>
                <strong>Question:</strong> A 15kW motor has a DOL starting current of 180A. What is
                the starting current with star-delta starting?
              </p>

                <p>Star-delta reduces starting current to 1/3 of DOL</p>
                <p>
                  I<sub>start(Y-Δ)</sub> = I<sub>start(DOL)</sub> × 1/3
                </p>
                <p>
                  I<sub>start(Y-Δ)</sub> = 180A × 1/3 = <strong>60A</strong>
                </p>
                <p>Note: Starting torque is also reduced to 1/3</p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 2: VFD Speed and Power Calculation
              </p>
              <p>
                <strong>Question:</strong> A 4-pole AHU fan motor runs at 1440 rpm at 50Hz. The BMS
                requests 70% airflow. Calculate the new frequency, speed, and power as a percentage
                of full load.
              </p>

                <p>Flow is proportional to speed, so 70% flow = 70% speed</p>
                <p>
                  New speed = 1440 × 0.7 = <strong>1008 rpm</strong>
                </p>
                <p>Frequency proportional to speed:</p>
                <p>
                  New frequency = 50Hz × 0.7 = <strong>35Hz</strong>
                </p>
                <p>Power proportional to speed cubed:</p>
                <p>
                  Power = (0.7)³ = <strong>0.343 = 34.3%</strong>
                </p>
                <p className="mt-2 text-green-400">
                  Energy saving = 100% - 34.3% = <strong>65.7%</strong>
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 3: Annual Energy Savings
              </p>
              <p>
                <strong>Question:</strong> A 22kW pump runs 4000 hours/year. Currently throttled to
                60% flow. Calculate annual savings if converted to VSD control at 60% speed.
                Electricity costs £0.15/kWh.
              </p>

                <p>Current consumption (throttled, full speed):</p>
                <p>Energy = 22kW × 4000h = 88,000 kWh/year</p>
                <p>
                  Cost = 88,000 × £0.15 = <strong>£13,200/year</strong>
                </p>
                <p>With VSD at 60% speed:</p>
                <p>Power = 22kW × (0.6)³ = 22 × 0.216 = 4.75kW</p>
                <p>Energy = 4.75kW × 4000h = 19,000 kWh/year</p>
                <p>
                  Cost = 19,000 × £0.15 = <strong>£2,850/year</strong>
                </p>
                <p className="mt-2 text-green-400">
                  Annual saving = £13,200 - £2,850 = <strong>£10,350</strong>
                </p>
                <p className="text-green-400">
                  If VSD costs ~£3,000, payback = <strong>3-4 months</strong>
                </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">
                Starting Method Selection Guide
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Small pump &lt;7.5kW</strong> — DOL — Simple, adequate supply capacity</li>
              <li><strong>Large pump, constant speed</strong> — Soft starter — Smooth start, prevents water hammer</li>
              <li><strong>HVAC pump, variable flow</strong> — VFD — Energy savings, BMS control</li>
              <li><strong>AHU fan</strong> — VFD — VAV control, major savings</li>
              <li><strong>Escalator</strong> — VFD — Standby mode, regeneration</li>
              <li><strong>Chiller compressor</strong> — VFD (integral) — Capacity control, efficiency</li>
              <li><strong>Fire pump</strong> — DOL or Star-delta — Simplicity, reliability critical</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                VFD Installation Considerations
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Cable length:</strong> Long motor cables need output filters (dV/dt or
                  sine wave)
                </li>
                <li>
                  <strong>Motor insulation:</strong> Use inverter-duty motors for best reliability
                </li>
                <li>
                  <strong>Bearing currents:</strong> Install shaft grounding rings on larger motors
                </li>
                <li>
                  <strong>EMC:</strong> Screened motor cable, proper earthing, input filters
                </li>
                <li>
                  <strong>Cooling:</strong> Ensure adequate ventilation, derate for high ambient
                </li>
                <li>
                  <strong>Harmonics:</strong> Assess impact, fit line reactors as minimum
                </li>
              </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Undersizing VFD:</strong> Allow for starting duty and derating factors
                </li>
                <li>
                  <strong>No input protection:</strong> Always fit line reactor or RFI filter
                </li>
                <li>
                  <strong>Ignoring minimum speed:</strong> Standard motors overheat below 20Hz
                </li>
                <li>
                  <strong>Wrong control mode:</strong> Use V/f for fans/pumps, vector for lifts
                </li>
                <li>
                  <strong>Poor earthing:</strong> Causes EMC issues and bearing damage
                </li>
              </ul>
              </>
            }
            doInstead="Apply the formulas with care, verify with measured values where possible, and always cross-check against BS 7671 and equipment manufacturer data."
          />

          <SectionRule />

          <ConceptBlock title="Quick Reference">
            <p className="text-sm font-medium text-elec-yellow/80">Starting Methods Comparison</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>DOL: 100% voltage, 6-8× FLC, 100% torque</li>
                  <li>Star-delta: 33% current, 33% torque</li>
                  <li>Auto-transformer: (tap%)² current and torque</li>
                  <li>Soft starter: Adjustable ramp, current limit</li>
                  <li>VFD: Full control, soft start, variable speed</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Affinity Laws (Pumps/Fans)</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Flow Q ∝ Speed N</li>
                  <li>Head H ∝ N²</li>
                  <li>Power P ∝ N³</li>
                  <li>80% speed = 51% power</li>
                  <li>50% speed = 12.5% power</li>
                </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Constant-speed AHU fan retrofit to VSD &mdash; cube-law saving calculation"
            situation={
              <>
                A 30 kW supply fan in an office AHU runs constantly at full speed via a
                DOL starter, controlled by inlet vanes. The BMS data shows actual airflow
                demand averages 65 % of design over occupied hours, with morning peak at
                90 % and overnight at 40 %. You evaluate retrofitting a VSD with BMS
                speed control via 0&ndash;10 V or BACnet.
              </>
            }
            whatToDo={
              <>
                Apply cube affinity: P/P&#x2080; = (n/n&#x2080;)&sup3;. At 65 % speed the
                power = 0.65&sup3; = 0.275 (~27.5 % of design power). For a 30 kW fan
                that&rsquo;s 8.25 kW absorbed instead of ~30 kW &mdash; 21.75 kW saving
                during typical operation. Annualised over 4500 occupied hours: ~98,000
                kWh/year, ~&pound;19,600 at 20 p/kWh + ~13.6 t CO&#x2082;. Specify a
                30 kW VSD (IES2, 5 % line reactor, EMC filter for residential / commercial
                area), open IO-Bus to the BMS, payback typically &lt; 18 months. Document
                in the Part L log book.
              </>
            }
            whyItMatters={
              <>
                VSD-on-fan is the highest-leverage energy-efficiency intervention on
                most existing commercial buildings. The HNC engineer&rsquo;s ability to
                run the cube-law arithmetic and choose the right VSD package (with
                harmonic mitigation appropriate to the upstream supply) is the
                difference between a successful retrofit and one that causes power-quality
                problems on the busbar.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'DOL: 6&ndash;8&times; FLC inrush, 100 % torque &mdash; small motors only.',
              'Star-delta: 1/3 inrush, 1/3 torque &mdash; legacy method, replaced by soft starter or VSD.',
              'Autotransformer starter: variable tap (typically 50/65/80 %) &mdash; mid-size motors where soft starter not available.',
              'Soft starter: gradual ramp via SCR phase angle &mdash; reduces inrush, no speed control, lowest-cost VSD alternative.',
              'VSD (variable-frequency drive): full speed control + soft start + energy saving via cube law on fan/pump duty.',
              'Affinity laws for centrifugal loads: Q &prop; n, P &prop; n&sup3;, H &prop; n&sup2; &mdash; the basis of every VSD energy-saving calculation.',
              'Ecodesign Reg 2019/1781 &mdash; VSDs IES2 minimum since 2021, declared per IEC 61800-9.',
              'VSDs need harmonic mitigation (line reactor / DC link choke / active filter) against G5/5 limits + EMC filter to BS EN 61800-3.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section5-6")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                DC machines (types, control, applications)
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section5-8")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Maintenance, testing and fault diagnosis
              </div>
            </button>
          </div>

        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section5_7;
