/**
 * Module 8 · Section 4 · Subsection 2 — Starting Methods
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   DOL, star-delta, autotransformer, soft starters and starting current considerations
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Starting Methods - HNC Module 8 Section 4.2';
const DESCRIPTION =
  'Master motor starting methods for HVAC applications: DOL starting, star-delta starters, autotransformer starters, soft starters, starting current considerations and voltage drop calculations for building services.';

const quickCheckQuestions = [
  {
    id: 'dol-current',
    question:
      'What is the typical starting current for a DOL (Direct On Line) starter expressed as a multiple of Full Load Current (FLC)?',
    options: [
      '6-8 times FLC',
      '2-3 times FLC',
      '10-12 times FLC',
      '4-5 times FLC',
    ],
    correctIndex: 0,
    explanation:
      'DOL starters apply full voltage directly to the motor terminals, resulting in starting currents typically 6-8 times the Full Load Current (FLC). This high inrush current can cause voltage dips on the supply system and may exceed supply authority limits.',
  },
  {
    id: 'star-delta-reduction',
    question:
      'By what factor does star-delta starting reduce the starting current compared to DOL starting?',
    options: [
      'Reduces by 75% (one-quarter)',
      'Reduces by 50% (half)',
      'Reduces by 67% (one-third)',
      'Reduces by 25% (three-quarters)',
    ],
    correctIndex: 2,
    explanation:
      'Star-delta starting reduces the starting current to approximately one-third (33%) of the DOL starting current. This is because the line current in star connection is 1/√3 times the delta current, and this reduction applies twice during the voltage transformation.',
  },
  {
    id: 'soft-starter-principle',
    question: 'How does a soft starter reduce motor starting current?',
    options: [
      'By switching between star and delta connections',
      'By inserting resistance in the motor circuit',
      'By gradually increasing the applied voltage using thyristors',
      'By using an autotransformer to reduce voltage',
    ],
    correctIndex: 2,
    explanation:
      'Soft starters use thyristor (SCR) technology to gradually increase the voltage applied to the motor from a reduced initial value to full voltage. This controlled voltage ramp limits the starting current whilst providing smooth acceleration.',
  },
  {
    id: 'voltage-drop-limit',
    question:
      'What is the typical maximum permissible voltage drop during motor starting according to BS 7671 guidance?',
    options: [
      '2%',
      '4%',
      '10%',
      '6%',
    ],
    correctIndex: 3,
    explanation:
      'BS 7671 recommends that voltage drop during motor starting should not exceed 6% to prevent disturbance to other connected equipment. Some supply authorities may impose stricter limits depending on the installation location and supply characteristics.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the main disadvantage of DOL (Direct On Line) starting for large motors?',
    options: [
      'It provides too little starting torque to move the load',
      'High starting current causing voltage dips and supply disturbance',
      'It requires six accessible motor terminals that may not be available',
      'It generates excessive heat in the thyristors during starting',
    ],
    correctAnswer: 1,
    explanation:
      'DOL starting draws 6-8 times FLC, which can cause significant voltage dips affecting other equipment and may exceed supply authority limits for larger motors.',
  },
  {
    id: 2,
    question:
      'In a star-delta starter, during the star connection phase, the voltage applied to each motor winding is:',
    options: [
      'Full line voltage (approximately 400V)',
      'Line voltage multiplied by √3 (approximately 690V)',
      'Line voltage divided by √3 (approximately 230V)',
      'Half the line voltage (approximately 200V)',
    ],
    correctAnswer: 2,
    explanation:
      'In star connection, each winding receives line voltage divided by √3 (VL/√3 = 400/1.732 = 231V), reducing both voltage and current to approximately 58% of delta values.',
  },
  {
    id: 3,
    question:
      'What is the starting torque reduction when using star-delta starting compared to DOL?',
    options: [
      'Starting torque is reduced to one-quarter',
      'Starting torque is reduced to one-half',
      'Starting torque remains the same',
      'Starting torque is reduced to one-third',
    ],
    correctAnswer: 3,
    explanation:
      'Star-delta starting reduces starting torque to approximately one-third of DOL torque, as torque is proportional to voltage squared. This limits its use to applications with low starting torque requirements.',
  },
  {
    id: 4,
    question: 'What happens during the transition from star to delta in a star-delta starter?',
    options: [
      'A brief current spike occurs as the motor reconnects in delta',
      'The motor smoothly accelerates without interruption',
      'The motor decelerates before resuming acceleration',
      'The starting current gradually increases',
    ],
    correctAnswer: 0,
    explanation:
      'During star-delta transition, there is a momentary disconnection causing a current transient (spike) as the motor reconnects in delta. Closed-transition starters can minimise this effect.',
  },
  {
    id: 5,
    question:
      'An autotransformer starter set to 65% tap will reduce the starting current to approximately:',
    options: [
      '65% of DOL starting current',
      '42% of DOL starting current',
      '85% of DOL starting current',
      '35% of DOL starting current',
    ],
    correctAnswer: 1,
    explanation:
      'The starting current reduction with an autotransformer is proportional to the square of the tap setting. At 65% tap: (0.65)² = 0.42 or 42% of DOL starting current.',
  },
  {
    id: 6,
    question:
      'Which starting method provides the smoothest acceleration and is most suitable for pumps and fans?',
    options: [
      'DOL starter',
      'Star-delta starter',
      'Soft starter',
      'Autotransformer starter',
    ],
    correctAnswer: 2,
    explanation:
      'Soft starters provide continuously variable voltage control, resulting in smooth, stepless acceleration ideal for pumps (preventing water hammer) and fans (reducing mechanical stress).',
  },
  {
    id: 7,
    question:
      'What is the typical starting current range when using a properly configured soft starter?',
    options: [
      '1.5-2 times FLC',
      '6-8 times FLC',
      '5-6 times FLC',
      '2-4 times FLC',
    ],
    correctAnswer: 3,
    explanation:
      'Soft starters typically limit starting current to 2-4 times FLC by controlling the voltage ramp. The exact value depends on the load characteristics and acceleration time setting.',
  },
  {
    id: 8,
    question:
      'For a 75kW motor with FLC of 140A, what would be the approximate starting current with DOL starting?',
    options: [
      '840-1120A',
      '1400-1680A',
      '280-420A',
      '420-700A',
    ],
    correctAnswer: 0,
    explanation:
      'DOL starting current = 6-8 × FLC = 6-8 × 140A = 840A to 1120A. This high current may require reduced voltage starting methods for larger installations.',
  },
  {
    id: 9,
    question:
      'Which factor determines the maximum motor size that can be started DOL on a given supply?',
    options: [
      'The number of accessible terminals on the motor',
      'The supply capacity and permissible voltage drop on starting',
      'The colour of the cores in the motor supply cable',
      'The ambient temperature of the plant room',
    ],
    correctAnswer: 1,
    explanation:
      "The maximum DOL motor size is limited by the supply's ability to handle the starting current without excessive voltage drop and by supply authority agreements regarding maximum starting current.",
  },
  {
    id: 10,
    question:
      'What advantage does closed-transition star-delta starting offer over open-transition?',
    options: [
      'It removes the need for a star-delta timer entirely',
      'It allows the motor to start with full starting torque',
      'Reduced current spike during star-delta transition',
      'It permits the use of a motor with only three terminals',
    ],
    correctAnswer: 2,
    explanation:
      'Closed-transition star-delta starters maintain motor connection through resistors or capacitors during transition, reducing the current spike that occurs in open-transition starters.',
  },
  {
    id: 11,
    question: 'When would an autotransformer starter be preferred over star-delta starting?',
    options: [
      'When the motor has 6 accessible terminals',
      'When minimum cost is the priority',
      'When the motor runs continuously at light load',
      'When the motor has only 3 terminals available',
    ],
    correctAnswer: 3,
    explanation:
      'Autotransformer starters work with any three-phase motor regardless of terminal configuration, whereas star-delta requires 6 accessible terminals. This makes autotransformer starters suitable for motors with internal connections.',
  },
  {
    id: 12,
    question:
      'What is the primary consideration when selecting a starting method for centrifugal pumps?',
    options: [
      'Prevention of water hammer through gradual acceleration',
      'Achieving the maximum possible breakaway torque',
      'Minimising the number of contactors in the starter panel',
      'Ensuring the motor reaches full speed in under one second',
    ],
    correctAnswer: 0,
    explanation:
      'Centrifugal pumps benefit from gradual acceleration to prevent water hammer (pressure surges) in pipework. Soft starters are ideal for this application due to their smooth, adjustable acceleration profile.',
  },
];

const faqs = [
  {
    question: 'When should I use DOL starting versus reduced voltage starting?',
    answer:
      'DOL starting is appropriate for small motors (typically up to 7.5kW on most supplies) where the starting current does not cause excessive voltage drop or exceed supply authority limits. Reduced voltage starting (star-delta, autotransformer, or soft starter) should be used for larger motors, when voltage drop is a concern, when smooth acceleration is required, or when the supply authority imposes starting current restrictions. Always verify with the supply authority for motors exceeding 5.5kW to confirm acceptable starting arrangements.',
  },
  {
    question: 'How do I calculate voltage drop during motor starting?',
    answer:
      'Voltage drop during starting can be estimated using: ΔV% = (Istart × Zcable × 100) / Vsupply, where Istart is the starting current, Zcable is the total cable impedance to the motor, and Vsupply is the nominal supply voltage. For accurate calculations, include the source impedance (transformer and supply cable). BS 7671 recommends keeping starting voltage drop below 6% to prevent disturbance to other equipment. Software tools and manufacturer data can provide more precise calculations for complex installations.',
  },
  {
    question: 'What are the advantages of soft starters over star-delta starters?',
    answer:
      'Soft starters offer several advantages: adjustable starting current and acceleration time, smooth acceleration without transition current spikes, built-in motor protection features (thermal, phase loss, earth fault), soft stop capability to prevent water hammer in pump applications, reduced mechanical stress on drive components, and smaller physical size. However, soft starters are more expensive and generate heat during starting due to thyristor conduction losses. Star-delta remains cost-effective for simple applications where the transition transient is acceptable.',
  },
  {
    question: 'Can I retrofit a soft starter to an existing DOL installation?',
    answer:
      'Yes, soft starters can often retrofit existing DOL installations with minimal modifications. The soft starter replaces the existing contactor arrangement, using the same cable and motor. Key considerations include: physical space in the panel (soft starters require adequate cooling), thermal derating for enclosed panels, compatibility with existing protection systems, and programming for the specific load characteristics. Many modern soft starters include bypass contactors to eliminate running losses after the motor reaches full speed.',
  },
  {
    question: 'How does motor starting affect power factor?',
    answer:
      'During starting, motors draw high reactive current at a poor power factor (typically 0.3-0.4 lagging). This reactive current increases apparent power demand and can affect power factor correction equipment. With DOL starting, the poor power factor period is short but intense. Reduced voltage starting methods extend the starting period but at lower current magnitude. For installations with power factor correction capacitors, ensure capacitors are not switched during motor starting to prevent resonance and voltage transients.',
  },
  {
    question: 'What starting method is best for HVAC applications?',
    answer:
      'HVAC applications typically benefit from soft starters due to: smooth acceleration reducing mechanical stress on fans and belts, prevention of water hammer in chilled water and heating systems, adjustable acceleration times matching system requirements, energy monitoring capabilities for building management integration, and reduced electrical stress on the supply. For smaller HVAC motors (up to 4kW), DOL is acceptable. Star-delta can be used for larger fans and pumps where the reduced starting torque is sufficient, but soft starters are increasingly preferred for their additional features and smoother operation.',
  },
];

const HNCModule8Section4_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section4")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 4 · Subsection 2"
            title="Starting Methods"
            description="DOL, star-delta, autotransformer, soft starters and starting current considerations"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Explain the operating principles of DOL, star-delta and autotransformer starters",
              "Calculate starting currents for different starting methods",
              "Describe soft starter operation and thyristor voltage control",
              "Assess voltage drop impact on supply systems during motor starting",
              "Select appropriate starting methods for HVAC applications",
              "Apply BS 7671 requirements for motor starting considerations",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Direct On Line (DOL) Starting">
            <p>Direct On Line (DOL) starting is the simplest and most economical method of starting three-phase induction motors. The motor is connected directly to the full supply voltage at the instant of starting, resulting in maximum starting torque but also maximum starting current.</p>
            <p><strong>DOL Starting Characteristics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Starting current:</strong> 6-8 times Full Load Current (FLC) - this high inrush occurs because motor impedance is low at standstill</li>
              <li><strong>Starting torque:</strong> 150-300% of Full Load Torque (FLT) - maximum available torque for any starting method</li>
              <li><strong>Acceleration time:</strong> Typically 2-10 seconds depending on motor and load inertia</li>
              <li><strong>Application limit:</strong> Usually restricted to motors up to 7.5kW on standard supplies</li>
            </ul>
            <p><strong>Advantages</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Simple construction and low cost</li>
              <li>Maximum starting torque available</li>
              <li>Compact panel space requirement</li>
              <li>Easy maintenance and troubleshooting</li>
              <li>No transition disturbance</li>
            </ul>
            <p><strong>Disadvantages</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>High starting current (6-8× FLC)</li>
              <li>Voltage dip on supply system</li>
              <li>Mechanical shock to driven equipment</li>
              <li>May exceed supply authority limits</li>
              <li>Limited to smaller motors</li>
            </ul>
            <p><strong>Starting Current Calculation</strong></p>
            <p><strong>DOL starting current = Motor FLC × Starting current multiplier</strong></p>
            <p>Example: 15kW motor with FLC of 28A and 7× starting multiplier:</p>
            <p>I<sub>start</sub> = 28A × 7 = <strong>196A</strong></p>
            <p>This current flows until the motor reaches approximately 80% of full speed.</p>
            <p><strong>DOL Starter Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Main contactor:</strong> Switches motor supply on/off — AC-3 rated for motor FLC</li>
              <li><strong>Thermal overload:</strong> Protects against sustained overload — Set to motor FLC (trip class 10-30)</li>
              <li><strong>Short circuit device:</strong> Protects against fault currents — MCCB or fuses (type gG or aM)</li>
              <li><strong>Isolator:</strong> Safe isolation for maintenance — Rated for motor FLC minimum</li>
            </ul>
            <p><strong>Supply authority requirements:</strong> For motors exceeding 5.5kW, always check with the Distribution Network Operator (DNO) regarding acceptable starting arrangements. They may impose restrictions on starting current magnitude and frequency.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Star-Delta Starting">
            <p>Star-delta starting is a widely used reduced voltage starting method that reduces starting current to approximately one-third of DOL values. The motor windings are initially connected in star configuration, then switched to delta for normal running.</p>
            <p><strong>Operating Principle</strong></p>
            <p><strong>Star Connection (Starting)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Winding voltage = V<sub>L</sub>/√3 (230V from 400V supply)</li>
              <li>Line current = Phase current</li>
              <li>Starting current ≈ 33% of DOL starting current</li>
              <li>Starting torque ≈ 33% of DOL starting torque</li>
            </ul>
            <p><strong>Delta Connection (Running)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Winding voltage = V<sub>L</sub> (400V)</li>
              <li>Line current = √3 × Phase current</li>
              <li>Full voltage applied to windings</li>
              <li>Normal running performance achieved</li>
            </ul>
            <p><strong>Star-Delta Mathematics</strong></p>
            <p>Current reduction factor:</p>
            <p>I<sub>star</sub> = I<sub>DOL</sub> × (1/√3)² = I<sub>DOL</sub> ×  <strong>1/3</strong></p>
            <p>Torque reduction factor:</p>
            <p>T<sub>star</sub> = T<sub>DOL</sub> × (V<sub>star</sub>/V<sub>delta</sub>)² = T <sub>DOL</sub> × <strong>1/3</strong></p>
            <p>Example: Motor with 7× DOL starting current:</p>
            <p>Star starting current = 7 × FLC × 1/3 = <strong>2.33 × FLC</strong></p>
            <p><strong>Transition Types</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Open transition:</strong> Motor disconnected briefly during changeover — High spike (can reach 8-10× FLC)</li>
              <li><strong>Closed transition:</strong> Resistors maintain connection during changeover — Reduced spike (2-4× FLC)</li>
            </ul>
            <p><strong>Suitable Applications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Centrifugal pumps and fans (low starting torque)</li>
              <li>Compressors with unloaded start</li>
              <li>Motors with light starting loads</li>
              <li>Applications where 1/3 torque is sufficient</li>
            </ul>
            <p><strong>Unsuitable Applications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Conveyor belts (high breakaway torque)</li>
              <li>Crushers and mills (loaded start)</li>
              <li>Positive displacement pumps</li>
              <li>Any load requiring &gt;33% starting torque</li>
            </ul>
            <p><strong>Motor Requirements</strong></p>
            <p>Star-delta starting requires motors with <strong>6 accessible terminals</strong>  (both ends of each winding brought out). The motor must be rated for delta connection at the supply voltage (e.g., 400V delta for a 400V supply). Motors wound for 400V star/690V delta cannot be used with star-delta starting on a 400V supply.</p>
            <p><strong>Timing consideration:</strong> The star-delta transition timer should be set to allow the motor to reach at least 75-80% of full speed before switching to delta. Too early transition causes high current spikes; too late wastes energy and extends acceleration time.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Autotransformer Starting">
            <p>Autotransformer starters provide reduced voltage starting using tapped autotransformers to supply the motor at a reduced voltage during starting. This method offers flexibility in selecting the voltage reduction level and works with any three-phase motor.</p>
            <p><strong>Operating Principle</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Three-phase autotransformer connected during starting</li>
              <li>Typical voltage taps: 50%, 65%, 80% of line voltage</li>
              <li>Motor receives reduced voltage from transformer secondary</li>
              <li>After acceleration, transformer bypassed and full voltage applied</li>
            </ul>
            <p><strong>Current and Torque Relationships</strong></p>
            <p>Line current reduction (from supply):</p>
            <p>I<sub>line</sub> = I<sub>DOL</sub> × (Tap setting)²</p>
            <p>Motor current (at reduced voltage):</p>
            <p>I<sub>motor</sub> = I<sub>DOL</sub> × Tap setting</p>
            <p>Starting torque:</p>
            <p>T<sub>start</sub> = T<sub>DOL</sub> × (Tap setting)²</p>
            <p>Example at 65% tap:</p>
            <p>Line current = DOL × 0.65² = <strong>42% of DOL</strong></p>
            <p>Starting torque = DOL × 0.65² = <strong>42% of DOL</strong></p>
            <p><strong>Common Tap Settings</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>50%:</strong> 25% of DOL — 25% of DOL — Very light starting loads</li>
              <li><strong>65%:</strong> 42% of DOL — 42% of DOL — Fans, centrifugal pumps</li>
              <li><strong>80%:</strong> 64% of DOL — 64% of DOL — Moderate starting loads</li>
            </ul>
            <p><strong>Advantages</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Works with any 3-terminal motor</li>
              <li>Adjustable voltage reduction (tap selection)</li>
              <li>Higher starting torque than star-delta at same current</li>
              <li>Lower line current than motor current</li>
            </ul>
            <p><strong>Disadvantages</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Higher cost than star-delta</li>
              <li>Larger physical size (transformers)</li>
              <li>Transition current spike (open transition)</li>
              <li>More complex than DOL or star-delta</li>
            </ul>
            <p><strong>Design tip:</strong> Autotransformer starters are particularly useful when retrofitting reduced voltage starting to existing motors that have only 3 terminals (internal star or delta connection) and cannot use star-delta starting.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Soft Starters">
            <p>Soft starters use power electronics (thyristors/SCRs) to provide continuously variable voltage control during motor starting and stopping. This technology offers superior control over starting characteristics compared to electromechanical methods.</p>
            <p><strong>Operating Principle</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Thyristor control:</strong> Back-to-back thyristor pairs in each phase control voltage by phase-angle firing</li>
              <li><strong>Voltage ramp:</strong> Applied voltage gradually increases from initial value (typically 30-50%) to full voltage</li>
              <li><strong>Ramp time:</strong> Adjustable from 1-60 seconds depending on application requirements</li>
              <li><strong>Current limiting:</strong> Maximum starting current can be set (typically 2-4× FLC)</li>
              <li><strong>Soft stop:</strong> Gradual voltage reduction for controlled deceleration</li>
            </ul>
            <p><strong>Key Parameters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Initial voltage:</strong> 30-70% of V<sub>L</sub> — Starting point for voltage ramp</li>
              <li><strong>Ramp time:</strong> 1-60 seconds — Duration of voltage increase</li>
              <li><strong>Current limit:</strong> 150-500% FLC — Maximum starting current allowed</li>
              <li><strong>Soft stop time:</strong> 0-60 seconds — Controlled deceleration period</li>
            </ul>
            <p><strong>Advantages</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Smooth, stepless acceleration</li>
              <li>Adjustable starting current and time</li>
              <li>Soft stop prevents water hammer</li>
              <li>Built-in motor protection features</li>
              <li>No transition current spikes</li>
              <li>Compact compared to autotransformers</li>
            </ul>
            <p><strong>Considerations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Higher initial cost than star-delta</li>
              <li>Heat generation during starting</li>
              <li>Requires cooling considerations</li>
              <li>Harmonics during starting phase</li>
              <li>Reduced starting torque at low voltage</li>
              <li>Programming required for optimisation</li>
            </ul>
            <p><strong>HVAC Applications</strong></p>
            <p><strong>Centrifugal pumps:</strong> Soft start (5-15 seconds) prevents water hammer, soft stop (10-30 seconds) prevents reverse flow surge. Current limit typically 300-350% FLC.</p>
            <p><strong>Supply fans:</strong> Extended ramp time (10-20 seconds) reduces belt stress and prevents duct pressure surges. Initial voltage 40-50% for smooth breakaway.</p>
            <p><strong>Chillers:</strong> Soft starters enable staggered starting of multiple compressors, managing electrical demand and preventing simultaneous inrush.</p>
            <p><strong>Bypass Contactors</strong></p>
            <p>Many soft starters include internal or external bypass contactors that engage once the motor reaches full speed. This removes the thyristors from the circuit during running, eliminating conduction losses (typically 1-2% of motor power) and reducing heat generation. The soft starter remains ready to provide soft stop when required.</p>
            <p><strong>Selection tip:</strong> When specifying soft starters, consider the duty cycle (starts per hour), ambient temperature, and enclosure type. Derate the soft starter capacity for high-frequency starting or elevated ambient temperatures.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Starting Current Impact and Voltage Drop">
            <p>High motor starting currents cause voltage drops in the supply system that can affect other connected equipment. Understanding and calculating these effects is essential for selecting appropriate starting methods and ensuring system compatibility.</p>
            <p><strong>Effects of Excessive Voltage Drop</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lighting:</strong> Visible flicker causing occupant complaints</li>
              <li><strong>IT equipment:</strong> Potential data corruption or system resets</li>
              <li><strong>Other motors:</strong> Reduced torque, possible stalling</li>
              <li><strong>Control systems:</strong> Contactor dropout, relay malfunction</li>
              <li><strong>Starting motor:</strong> Extended acceleration time, possible failure to start</li>
            </ul>
            <p><strong>Voltage Drop Calculation</strong></p>
            <p>Simplified voltage drop formula:</p>
            <p>ΔV = I<sub>start</sub> × Z<sub>total</sub></p>
            <p>Percentage voltage drop:</p>
            <p>ΔV% = (I<sub>start</sub> × Z<sub>total</sub> × 100) / V<sub>supply</sub></p>
            <p>Where Z<sub>total</sub> includes:</p>
            <p>- Supply transformer impedance</p>
            <p>- Distribution cable impedance</p>
            <p>- Final circuit cable impedance</p>
            <p><strong>Voltage Drop Limits</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BS 7671 guidance:</strong> 6% maximum — Transient condition during starting</li>
              <li><strong>DNO requirements:</strong> 3-6% (varies) — Check with local DNO</li>
              <li><strong>Sensitive equipment:</strong> &lt;3% — IT, medical, process control</li>
            </ul>
            <p><strong>Worked Example: Voltage Drop Assessment</strong></p>
            <p>Given:</p>
            <p>22kW motor, FLC = 42A, 7× starting current multiplier</p>
            <p>Supply: 400V, transformer 500kVA, 4% impedance</p>
            <p>Cable: 50m of 16mm² (Z = 0.022Ω/m)</p>
            <p>Calculate DOL starting voltage drop:</p>
            <p>I<sub>start</sub> = 42 × 7 = 294A</p>
            <p>Z<sub>transformer</sub> = (400² × 0.04) / 500,000 = 0.0128Ω</p>
            <p>Z<sub>cable</sub> = 50 × 0.022 = 1.1Ω (simplified)</p>
            <p>ΔV = 294 × (0.0128 + 0.0011) = 4.1V from transformer</p>
            <p>ΔV% at motor = approx. <strong>5-7%</strong> (detailed calc. required)</p>
            <p>Result: Reduced voltage starting recommended</p>
            <p><strong>Starting Method Selection Based on Current</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>&lt;7.5kW:</strong> DOL — 6-8× FLC</li>
              <li><strong>7.5-30kW:</strong> Star-delta or Soft starter — 2-4× FLC</li>
              <li><strong>30-75kW:</strong> Soft starter preferred — 2-3× FLC</li>
              <li><strong>&gt;75kW:</strong> Soft starter or VSD — 1.5-2.5× FLC</li>
            </ul>
            <p><strong>Design consideration:</strong> For critical installations, perform detailed voltage drop calculations including supply impedance data from the DNO. Consider power factor correction and its interaction with motor starting currents.</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Comparing Starting Methods</strong>
            </p>
            <p><strong>Scenario:</strong> Compare starting currents for a 37kW motor (FLC = 70A, 7× DOL multiplier) using different starting methods.</p>
            <p>DOL Starting:</p>
            <p>I<sub>start</sub> = 70A × 7 = <strong>490A</strong></p>
            <p>Star-Delta Starting:</p>
            <p>I<sub>start</sub> = 490A × 1/3 = <strong>163A</strong></p>
            <p>Autotransformer (65% tap):</p>
            <p>I<sub>start</sub> = 490A × 0.65² = <strong>207A</strong></p>
            <p>Soft Starter (300% limit):</p>
            <p>I<sub>start</sub> = 70A × 3 = <strong>210A</strong></p>
            <p>All reduced voltage methods achieve significant current reduction</p>
            <p>
              <strong>Example 2: Pump Starting Method Selection</strong>
            </p>
            <p><strong>Scenario:</strong> Select starting method for a 15kW chilled water pump. Requirements: prevent water hammer, supply authority limits starting current to 100A.</p>
            <p>Motor data:</p>
            <p>15kW, FLC = 28A, DOL starting = 7× = 196A</p>
            <p>Assessment:</p>
            <p>DOL: 196A &gt; 100A limit - NOT SUITABLE</p>
            <p>Star-delta: 196/3 = 65A &lt; 100A - Current OK</p>
            <p>But: Open transition spike, no soft stop for water hammer</p>
            <p>Soft starter assessment:</p>
            <p>Set current limit to 350%: 28 × 3.5 = 98A &lt; 100A</p>
            <p>Soft stop capability prevents water hammer</p>
            <p>Ramp time 10-15 seconds for smooth acceleration</p>
            <p>Recommendation: Soft starter with 350% current limit, 15s ramp, 20s soft stop</p>
            <p>
              <strong>Example 3: Supply Assessment for Multiple Motors</strong>
            </p>
            <p><strong>Scenario:</strong> HVAC plant room with 3 × 22kW motors. Can they all start DOL on a 200kVA transformer with 5% impedance?</p>
            <p>Motor data (each):</p>
            <p>22kW, FLC = 42A, Starting = 7 × 42 = 294A</p>
            <p>Transformer capacity:</p>
            <p>200kVA at 400V = 289A rated current</p>
            <p>Single motor starting (294A) exceeds transformer rating!</p>
            <p>Solution options:</p>
            <p>1. Upgrade transformer to 400kVA minimum</p>
            <p>2. Use soft starters with 200% current limit (84A each)</p>
            <p>3. Implement sequential starting with time delays</p>
            <p>4. Star-delta starting (98A each)</p>
            <p>Recommended: Soft starters with staggered starting sequence (60s intervals)</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Starting Method Selection Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Determine motor size and FLC from nameplate or manufacturer data</li>
              <li>Calculate DOL starting current (typically 6-8× FLC)</li>
              <li>Check supply authority requirements for maximum starting current</li>
              <li>Assess voltage drop impact on other connected equipment</li>
              <li>Consider load characteristics (starting torque requirement)</li>
              <li>Evaluate need for soft stop (pumps, conveyors)</li>
              <li>Check motor terminal configuration (3 or 6 terminals)</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>DOL starting current: <strong>6-8× FLC</strong></li>
              <li>Star-delta current reduction: <strong>1/3 of DOL</strong></li>
              <li>Star-delta torque reduction: <strong>1/3 of DOL</strong></li>
              <li>Autotransformer reduction: <strong>(tap%)² of DOL</strong></li>
              <li>Soft starter typical limit: <strong>2-4× FLC</strong></li>
              <li>Maximum starting voltage drop: <strong>6%</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Wrong motor winding:</strong> Using star-delta with 400V star motor on 400V supply</li>
                <li><strong>Premature transition:</strong> Star-delta timer set too short causing high spike</li>
                <li><strong>Insufficient torque:</strong> Using star-delta for high-torque loads</li>
                <li><strong>Ignoring soft stop:</strong> Not utilising soft stop for pump applications</li>
                <li><strong>Under-sizing soft starter:</strong> Not accounting for starting duty cycle</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section4-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Motor fundamentals
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section4-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Variable speed drives
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section4_2;
