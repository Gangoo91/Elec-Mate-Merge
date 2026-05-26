/**
 * Module 3 · Section 2 · Subsection 5 — Power Factor Correction Methods
 * HNC Electrical Engineering for Building Services (Pearson U4019 — Electrical & Electronic Principles)
 *   Static, switched and active PFC — the engineering choices behind a real switchroom
 *   capacitor bank, including detuning to handle harmonic-rich loads (LED drivers, VFDs).
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

const TITLE = 'Power Factor Correction Methods - HNC Module 3 Section 2.5';
const DESCRIPTION =
  'Master power factor correction techniques for building services: capacitor bank sizing, automatic switching, star vs delta connections, individual vs group correction, APFC, harmonic considerations, and detuned reactors.';

const quickCheckQuestions = [
  {
    id: 'capacitor-formula',
    question: 'What is the formula for calculating the required reactive power for PFC?',
    options: [
      'Qc = P(tan phi1 - tan phi2)',
      'Qc = P(cos phi1 - cos phi2)',
      'Qc = P(sin phi1 - sin phi2)',
      'Qc = P x power factor',
    ],
    correctIndex: 0,
    explanation:
      'The correct formula is Qc = P(tan phi1 - tan phi2), where P is the real power, phi1 is the original phase angle and phi2 is the target phase angle. This calculates the kVAr of capacitance needed.',
  },
  {
    id: 'automatic-vs-fixed',
    question: 'When should automatic power factor correction be used instead of fixed capacitors?',
    options: [
      'When load is constant',
      'When only lighting loads exist',
      'When power factor is already 0.95',
      'When load varies significantly',
    ],
    correctIndex: 3,
    explanation:
      'Automatic PFC systems are essential when loads vary significantly. The controller monitors power factor continuously and switches capacitor stages on/off to maintain target pf. Fixed capacitors risk leading power factor during light loads.',
  },
  {
    id: 'delta-connection',
    question: 'What is the advantage of delta-connected capacitors over star-connected?',
    options: [
      'Each capacitor sees line voltage, providing 3x more kVAr per unit',
      'Isolation arrangements to prevent parallel operation with supply',
      'Being regularly reviewed, communicated, and implemented',
      'Proactively identifying and addressing risks and opportunities',
    ],
    correctIndex: 0,
    explanation:
      'Delta-connected capacitors see line voltage (400V) rather than phase voltage (230V). Since Q = V squared / Xc, the higher voltage means each capacitor provides approximately 3 times more reactive power than the same capacitor in star connection.',
  },
  {
    id: 'harmonic-detuning',
    question: 'What is the purpose of detuned reactors in PFC systems?',
    options: [
      'Knowledge, skills and safety understanding',
      'Ceiling height and wall material',
      'A point where two or more components connect',
      'Prevent harmonic resonance with capacitors',
    ],
    correctIndex: 3,
    explanation:
      'Detuned reactors shift the resonant frequency of the capacitor bank below dominant harmonic frequencies (typically 189Hz or 135Hz). This prevents dangerous resonance that could amplify harmonics and damage capacitors in systems with significant harmonic content.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A factory has a 200kW load operating at 0.75 power factor. What capacitor bank size is needed to improve to 0.95 pf?',
    options: [
      '75 kVAr',
      '113 kVAr',
      '100 kVAr',
      '88 kVAr',
    ],
    correctAnswer: 1,
    explanation:
      'Qc = P(tan phi1 - tan phi2). At 0.75 pf, phi1 = 41.4 degrees, tan phi1 = 0.882. At 0.95 pf, phi2 = 18.2 degrees, tan phi2 = 0.329. Qc = 200 x (0.882 - 0.329) = 200 x 0.553 = 110.6 kVAr. Nearest standard size would be 112.5 or 120 kVAr, so 113 kVAr is the best answer.',
  },
  {
    id: 2,
    question:
      'What is the relationship between kVAr rating of a capacitor connected in star versus delta?',
    options: [
      'Approximately 25% of the end-to-end reading',
      'It heats the air while removing moisture',
      'Delta provides approximately 3x more kVAr',
      'Causes degradation and brittleness',
    ],
    correctAnswer: 2,
    explanation:
      'Q = V squared / Xc. In delta, capacitors see 400V; in star, they see 230V. (400/230) squared = 1.74 squared is approximately 3. Therefore delta connection provides approximately 3 times the reactive power for the same capacitor.',
  },
  {
    id: 3,
    question: 'What is the typical target power factor for commercial buildings in the UK?',
    options: [
      '0.90 lagging',
      '0.85 lagging',
      'Unity (1.0)',
      '0.95 lagging or better',
    ],
    correctAnswer: 3,
    explanation:
      'UK DNOs (Distribution Network Operators) typically require 0.95 lagging or better to avoid reactive power charges. Over-correction to unity or leading is avoided as it can cause voltage rise issues.',
  },
  {
    id: 4,
    question: 'Individual motor correction involves:',
    options: [
      'Capacitors fitted directly at each motor',
      'One large capacitor bank at the main switchboard',
      'Capacitors at each distribution board',
      'External automatic PFC equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Individual correction places capacitors directly at each motor, switched with the motor contactor. This provides the most effective correction as reactive current is reduced at source, minimising cable losses throughout the installation.',
  },
  {
    id: 5,
    question: 'Why might fixed capacitor banks cause problems with variable loads?',
    options: [
      'It can damage conductors and reduce connection integrity',
      'They can cause leading power factor during light load periods',
      'Valid, Authentic, Current, Sufficient, Reliable',
      'The bill of quantities or material schedule',
    ],
    correctAnswer: 1,
    explanation:
      'Fixed capacitors provide constant reactive power. When loads reduce (light load periods), the capacitive kVAr may exceed the inductive kVAr, causing leading power factor. This can cause voltage rise and penalties from the DNO.',
  },
  {
    id: 6,
    question: 'What is the tuning frequency typically used for 7% detuned reactors?',
    options: [
      '50 Hz',
      '135 Hz',
      '189 Hz',
      '250 Hz',
    ],
    correctAnswer: 2,
    explanation:
      '7% detuned reactors tune the capacitor circuit to 189Hz (50Hz x root(1/0.07) is approximately 189Hz). This is below the 5th harmonic (250Hz), preventing resonance with common harmonic frequencies in electrical systems.',
  },
  {
    id: 7,
    question: 'Active Power Factor Correction (APFC) in building services typically refers to:',
    options: [
      'Capacitors fitted directly at each motor',
      'They can cause leading power factor during light load periods',
      'Delta provides approximately 3x more kVAr',
      'Using active filters to inject compensating current',
    ],
    correctAnswer: 3,
    explanation:
      'APFC in modern building services uses power electronics (active filters) to inject current that cancels reactive and harmonic currents. Unlike passive capacitors, active filters can correct power factor and eliminate harmonics simultaneously.',
  },
  {
    id: 8,
    question:
      'For a 45kW motor with 0.8 power factor, what approximate capacitor size would correct to 0.95 pf?',
    options: [
      '20 kVAr',
      '25 kVAr',
      '10 kVAr',
      '15 kVAr',
    ],
    correctAnswer: 0,
    explanation:
      'Qc = P(tan phi1 - tan phi2) = 45 x (tan 36.9 degrees - tan 18.2 degrees) = 45 x (0.75 - 0.329) = 45 x 0.421 = 19 kVAr. Nearest standard size is 20 kVAr.',
  },
  {
    id: 9,
    question: 'What is the main disadvantage of central power factor correction?',
    options: [
      'They prevent the platform from being elevated unless all outriggers are correctly deployed',
      'Reactive current still flows through all cables between loads and central capacitors',
      'The willingness to try new experiences, take appropriate risks, and connect with others for support',
      'Document the change, get written approval, and issue a variation or change order',
    ],
    correctAnswer: 1,
    explanation:
      'Central correction only reduces reactive current from the incoming supply. Reactive current still flows through all cables from the central capacitor bank to the individual loads, maintaining I squared R losses in the internal distribution system.',
  },
  {
    id: 10,
    question:
      'Fluorescent lighting with magnetic ballasts typically requires PFC capacitors rated at:',
    options: [
      '1-2 microF per lamp',
      'No capacitor needed',
      '5-8 microF per 58W lamp',
      '15-20 microF per lamp',
    ],
    correctAnswer: 2,
    explanation:
      'Traditional fluorescent fittings with magnetic ballasts have poor power factor (0.5-0.6). A 5-8 microF capacitor per 58W lamp typically improves this to 0.85-0.95. Modern electronic ballasts have built-in PFC and do not require additional capacitors.',
  },
  {
    id: 11,
    question:
      'What percentage of total harmonic distortion (THD) typically indicates the need for detuned capacitors?',
    options: [
      'THD below 5%',
      'Any THD requires detuning',
      'THD above 50%',
      'THD above 10-15%',
    ],
    correctAnswer: 3,
    explanation:
      'When THD exceeds 10-15%, standard capacitors risk resonance with harmonic frequencies. Detuned reactor-capacitor combinations should be specified to prevent harmonic amplification and capacitor damage.',
  },
  {
    id: 12,
    question:
      'A building has 150kW lighting (pf 0.95), 100kW heating (pf 1.0), and 200kW motors (pf 0.8). What is the overall power factor?',
    options: [
      '0.91',
      '0.93',
      '0.85',
      '0.88',
    ],
    correctAnswer: 0,
    explanation:
      'Total P = 450kW. Lighting Q = 150 x tan(18.2 degrees) = 49.4 kVAr. Heating Q = 0. Motors Q = 200 x tan(36.9 degrees) = 150 kVAr. Total Q = 199.4 kVAr. S = root(450 squared + 199.4 squared) = 492.2 kVA. Overall pf = 450/492.2 = 0.914 which rounds to 0.91',
  },
];

const faqs = [
  {
    question: 'What happens if power factor is over-corrected to leading?',
    answer:
      'Leading power factor (where capacitive kVAr exceeds inductive kVAr) causes voltage rise at the point of connection, potentially damaging equipment. DNOs may impose penalties for leading power factor as it can affect network stability. Automatic PFC systems prevent this by reducing capacitance as load decreases.',
  },
  {
    question: 'How do electronic LED drivers affect power factor correction?',
    answer:
      'Modern LED drivers typically include active PFC circuits achieving 0.95+ power factor. However, they also generate harmonic currents. While individual correction is not usually needed, buildings with large LED installations may require harmonic filters. Always check the driver specifications for power factor and THD values.',
  },
  {
    question: "Why can't standard capacitors be used in systems with VFDs?",
    answer:
      'Variable Frequency Drives (VFDs) generate significant harmonic currents, particularly 5th and 7th harmonics. Standard capacitors can resonate with system inductance at harmonic frequencies, amplifying harmonics and causing capacitor failure or fire. Detuned reactors (typically 7% or 14%) must be used to shift resonance below the 5th harmonic.',
  },
  {
    question: 'What is the difference between kVAr and capacitance (microF)?',
    answer:
      'kVAr (reactive power) is the useful rating for PFC as it directly relates to power factor improvement. Capacitance (microF) depends on voltage: Qc = 2 x pi x f x C x V squared. A 25 kVAr capacitor at 400V has different microF than the same kVAr rating at 230V. Always specify PFC capacitors by kVAr rating at the system voltage.',
  },
  {
    question: 'When should synchronous motors be considered for power factor correction?',
    answer:
      'Large over-excited synchronous motors (typically above 500kW) can provide leading reactive power, acting as rotating capacitors. They are considered where: constant large loads exist, motor replacement is planned anyway, or harmonic-rich environments make capacitors problematic. The motor must be slightly oversized and run in over-excited mode.',
  },
  {
    question: 'How do I size an automatic PFC system?',
    answer:
      'Measure reactive power demand over a representative period (minimum one week) using a power quality analyser. Size the total kVAr for maximum demand plus 10-20% margin. Choose step sizes based on load variation - typically 6-12 steps. Smaller steps provide finer control but increase cost and complexity.',
  },
];

const HNCModule3Section2_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 2 · Subsection 5"
            title="Power Factor Correction Methods"
            description="Techniques for improving power factor in commercial and industrial installations using capacitors, automatic systems, and active correction"
            tone="purple"
          />

          <TLDR
            points={[
              'You can choose between static (always-on), switched (stepped contactor-controlled) and active (IGBT-based) PFC for a building services switchroom.',
              'You can size each capacitor step from the building load curve and place steps to track demand smoothly without overcorrection.',
              'You can spot when detuned PFC (with series reactor, typically 7 % or 14 % tuned below the 5th harmonic) is needed instead of plain capacitors.',
              'You can compare central / bulk PFC at the main board against local PFC at individual motors, and pick the right strategy for the loading pattern.',
              'You can reference the right standards for the capacitor cans (BS EN 60831-1) and for the assembled bank (BS EN 61921 / BS EN 61439-1).',
            ]}
          />

          <RegsCallout
            source="BS EN 61921 — Power capacitors. Low-voltage power factor correction banks"
            clause="Detuned reactors shall be selected to provide a tuning frequency below the lowest harmonic present (typically 134 Hz for 7 % detuning or 189 Hz for 14 % detuning) to prevent series resonance with system harmonics and to limit current distortion in the capacitor."
            meaning={
              <>
                Plain capacitor banks on a system with significant harmonic content can
                resonate with the supply impedance, dramatically over-stressing the cans and
                blowing fuses. Detuning shifts the resonant frequency below the harmonic
                spectrum, protecting the bank and acting as a partial harmonic filter —
                standard on any modern building services PFC retrofit.
              </>
            }
            cite="Source: BS EN 61921 (latest edition); BS EN 60831-1 for capacitor cans."
          />

          <LearningOutcomes
            outcomes={[
              'Calculate capacitor bank sizing using Qc = P(tan phi1 - tan phi2)',
              'Compare fixed versus automatic switching capacitor banks',
              'Understand star and delta capacitor connections',
              'Apply individual, group, and central correction strategies',
              'Specify active power factor correction systems',
              'Design PFC systems for harmonic-rich environments',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="Add capacitors sized to Qc = P(tan phi1 - tan phi2) to cancel inductive reactive power and lift power factor."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Capacitor sizing:</strong> Qc = P(tan phi1 - tan phi2) in kVAr
              </li>
              <li>
                <strong>Connection:</strong> Delta gives 3x kVAr vs star
              </li>
              <li>
                <strong>Automatic PFC:</strong> Essential for variable loads
              </li>
              <li>
                <strong>Harmonics:</strong> Use detuned reactors with VFDs
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Target pf:</strong> 0.95 lagging minimum for UK DNOs
              </li>
              <li>
                <strong>Motors:</strong> Individual or group correction
              </li>
              <li>
                <strong>Lighting:</strong> Electronic ballasts have built-in PFC
              </li>
              <li>
                <strong>HVAC:</strong> Detuned PFC for VFD chillers/AHUs
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Capacitor Bank Sizing and Calculation">
            <p>
              Power factor correction capacitors provide leading reactive power (kVAr) to offset the
              lagging reactive power drawn by inductive loads. The key to effective PFC is
              calculating the correct capacitor size to achieve the target power factor without
              over-correction.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">The Fundamental PFC Formula</p>
            <p>
              Q<sub>c</sub> = P (tan phi<sub>1</sub> - tan phi<sub>2</sub>)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Q<sub>c</sub> = required capacitor reactive power (kVAr)</li>
              <li>P = real power (kW)</li>
              <li>phi<sub>1</sub> = original phase angle (cos inverse of original pf)</li>
              <li>phi<sub>2</sub> = target phase angle (cos inverse of target pf)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Power Factor Conversion Table
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>0.70 pf:</strong> Phase angle 45.6 degrees, tan phi 1.020, kVAr/kW 1.020</li>
              <li><strong>0.75 pf:</strong> Phase angle 41.4 degrees, tan phi 0.882, kVAr/kW 0.882</li>
              <li><strong>0.80 pf:</strong> Phase angle 36.9 degrees, tan phi 0.750, kVAr/kW 0.750</li>
              <li><strong>0.85 pf:</strong> Phase angle 31.8 degrees, tan phi 0.620, kVAr/kW 0.620</li>
              <li><strong>0.90 pf:</strong> Phase angle 25.8 degrees, tan phi 0.484, kVAr/kW 0.484</li>
              <li><strong>0.95 pf (target):</strong> Phase angle 18.2 degrees, tan phi 0.329, kVAr/kW 0.329</li>
              <li><strong>1.00 pf:</strong> Phase angle 0 degrees, tan phi 0.000, kVAr/kW 0.000</li>
            </ul>
            <p className="text-sm font-medium text-white">Key sizing considerations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Standard capacitor sizes: 5, 10, 12.5, 15, 20, 25, 30, 50, 75, 100 kVAr</li>
              <li>Select the nearest standard size above calculated value</li>
              <li>Avoid over-sizing - leading pf causes voltage rise issues</li>
              <li>Consider demand variation when sizing - measure over representative period</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>UK DNO requirement:</strong> Most Distribution Network Operators require power
              factor of 0.95 lagging or better. Below 0.95, reactive power charges apply.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Fixed vs Automatic Switching Capacitor Banks">
            <p>
              The choice between fixed and automatic PFC systems depends on load characteristics.
              Fixed capacitors suit constant loads, while variable loads demand automatic switching
              to prevent over-correction during light load periods.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Fixed Capacitor Banks</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single kVAr value, always connected</li>
              <li>Lowest cost installation</li>
              <li>No control equipment needed</li>
              <li>Suitable for constant loads (base load)</li>
              <li>Risk of leading pf at light loads</li>
            </ul>
            <p>Typical use: Individual motor correction, continuous process loads</p>
            <p className="text-sm font-medium text-elec-yellow/80">Automatic Switching Banks</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Multiple stages switched by controller</li>
              <li>PF relay monitors and controls steps</li>
              <li>Maintains target pf across load range</li>
              <li>Prevents leading power factor</li>
              <li>Higher capital cost, lower running cost</li>
            </ul>
            <p>Typical use: Main switchboard, variable industrial loads</p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Automatic PFC Controller Features
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Target pf (cos phi):</strong> Desired power factor setpoint — typically 0.95 - 0.98 lag
              </li>
              <li>
                <strong>C/k ratio:</strong> Step size relative to CT ratio — manufacturer specific
              </li>
              <li>
                <strong>Switching delay:</strong> Time between step changes — 30-60 seconds
              </li>
              <li>
                <strong>Discharge time:</strong> Capacitor discharge before reconnection — 60-90 seconds
              </li>
              <li>
                <strong>Number of steps:</strong> Stages of capacitor banks — 6-12 typical
              </li>
            </ul>
            <p className="text-sm font-medium text-white">Step configurations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Equal steps:</strong> All stages same kVAr (e.g., 6 x 25 kVAr = 150 kVAr)
              </li>
              <li>
                <strong>Binary steps:</strong> 1:2:4:8 ratio for fine control (e.g., 12.5, 25, 50,
                100 = 187.5 kVAr in 15 combinations)
              </li>
              <li>
                <strong>Mixed steps:</strong> Smaller first stage for fine tuning (e.g., 10, 25,
                25, 50, 50 kVAr)
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Capacitor switching:</strong> Contactors must be rated for capacitor duty
              (high inrush current). Use special capacitor-switching contactors or current-limiting
              reactors.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Connection Methods and Correction Strategies">
            <p>
              Capacitors can be connected in star or delta configurations, each with distinct
              advantages. The location of correction - individual, group, or central - affects both
              efficiency and cost.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Star vs Delta Connection</p>
            <p className="text-sm font-medium text-white">Star (Y) Connection</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Capacitors see phase voltage (230V)</li>
              <li>Lower voltage stress on capacitors</li>
              <li>Less kVAr per capacitor</li>
              <li>Neutral required</li>
              <li>Safer for maintenance</li>
            </ul>
            <p className="text-sm font-medium text-white">Delta (triangle) Connection</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Capacitors see line voltage (400V)</li>
              <li>3x kVAr per capacitor (V squared relationship)</li>
              <li>More economical for same kVAr</li>
              <li>No neutral needed</li>
              <li>Higher fault current if capacitor fails</li>
            </ul>
            <p>
              Q = V squared / Xc. Since (400/230) squared is approximately 3, delta provides
              approximately 3x the kVAr for the same capacitor.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Correction Strategies</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Individual:</strong> At each load (motor terminals). Maximum cable loss reduction, precise correction. Highest cost, maintenance at multiple locations.
              </li>
              <li>
                <strong>Group:</strong> Distribution board level. Good balance of cost and efficiency. Reactive current in final circuits.
              </li>
              <li>
                <strong>Central:</strong> Main switchboard / intake. Lowest capital cost, easy maintenance. Reactive current flows throughout building.
              </li>
              <li>
                <strong>Hybrid:</strong> Combination of above. Optimised for specific installation. More complex design.
              </li>
            </ul>
            <p className="text-sm font-medium text-white">Individual motor correction:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Capacitor switched with motor contactor (parallel connection)</li>
              <li>Size capacitor to correct no-load magnetising current only</li>
              <li>Typically 30-40% of motor kVA rating</li>
              <li>
                <strong>Never exceed motor no-load magnetising current</strong> - risk of
                self-excitation on DOL start
              </li>
              <li>For soft-start or VFD motors, use separate capacitor switching</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Combine central automatic PFC for bulk correction with
              individual capacitors on large constant-running motors for maximum efficiency.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Active PFC and Harmonic Considerations">
            <p>
              Modern building services increasingly use Variable Frequency Drives (VFDs), LED
              drivers, and other non-linear loads that generate harmonics. Standard capacitors can
              resonate with system inductance at harmonic frequencies, requiring detuned solutions
              or active filtering.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Harmonic Resonance Warning</p>
            <p>
              Capacitors reduce system impedance at resonant frequency fr = 1/(2 x pi x root(LC)).
              If fr coincides with a harmonic frequency (250Hz, 350Hz, etc.), harmonics are
              amplified dramatically. This causes capacitor overheating, failure, and potentially
              fire. Always assess harmonic content before specifying standard capacitors.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Detuned Reactor-Capacitor Systems
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>5.67% (p = 0.0567):</strong> Resonant frequency 210 Hz (4.2 x 50Hz). Light harmonic pollution.
              </li>
              <li>
                <strong>7% (p = 0.07):</strong> Resonant frequency 189 Hz (3.78 x 50Hz). Standard for VFD applications.
              </li>
              <li>
                <strong>14% (p = 0.14):</strong> Resonant frequency 134 Hz (2.68 x 50Hz). Heavy harmonic pollution (DC drives).
              </li>
            </ul>
            <p>Resonant frequency: fr = fn / root(p) where fn = 50Hz and p = detuning factor</p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Active Power Factor Correction (APFC)
            </p>
            <p>
              Active filters use power electronics to inject compensating current, cancelling both
              reactive and harmonic currents. They offer advantages in challenging environments
              but at higher cost.
            </p>
            <p className="text-sm font-medium text-white">Advantages</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Corrects pf and harmonics simultaneously</li>
              <li>Fast response to load changes</li>
              <li>No resonance risk</li>
              <li>Compact compared to passive filters</li>
              <li>Programmable for different targets</li>
            </ul>
            <p className="text-sm font-medium text-white">Considerations</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Higher capital cost than passive</li>
              <li>Standing losses (power electronics)</li>
              <li>More complex maintenance</li>
              <li>Limited to rated current capacity</li>
              <li>Requires specialist commissioning</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Building Services Applications
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DOL induction motors:</strong> Typical pf 0.75-0.85, low harmonics — Standard capacitors
              </li>
              <li>
                <strong>VFD-controlled motors:</strong> 0.95+ (VFD input), high harmonics (5th, 7th) — 7% detuned or active filter
              </li>
              <li>
                <strong>Fluorescent (magnetic):</strong> 0.5-0.6, moderate harmonics (3rd) — Individual capacitors (5-8 microF)
              </li>
              <li>
                <strong>LED drivers (with PFC):</strong> 0.90-0.98, low-moderate harmonics — Usually not required
              </li>
              <li>
                <strong>UPS systems:</strong> 0.80-0.95, high harmonics — Active filter or input filter
              </li>
              <li>
                <strong>Chillers (VFD):</strong> 0.95+, high harmonics — 7% detuned at main DB
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Harmonic assessment:</strong> Conduct power quality survey before specifying
              PFC. If THD exceeds 10-15%, use detuned reactors. If THD exceeds 20% or critical
              systems involved, consider active filters.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">Example 1: Central PFC Sizing</p>
            <p>
              <strong>Question:</strong> A commercial building has measured demand of 350kW at
              0.78 power factor. Calculate the capacitor bank required to achieve 0.95 pf.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Find phase angles</li>
              <li>phi1 = cos inverse(0.78) = 38.7 degrees</li>
              <li>phi2 = cos inverse(0.95) = 18.2 degrees</li>
              <li>Step 2: Calculate tan values</li>
              <li>tan phi1 = tan(38.7 degrees) = 0.802</li>
              <li>tan phi2 = tan(18.2 degrees) = 0.329</li>
              <li>Step 3: Apply formula</li>
              <li>Qc = P(tan phi1 - tan phi2)</li>
              <li>Qc = 350 x (0.802 - 0.329)</li>
              <li>Qc = 350 x 0.473 = <strong>165.6 kVAr</strong></li>
              <li>Specify 175 kVAr automatic PFC bank (next standard size)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 2: Individual Motor Correction
            </p>
            <p>
              <strong>Question:</strong> A 30kW motor operates at 0.82 power factor. Calculate the
              capacitor size for individual correction to 0.95 pf. Verify the capacitor does not
              exceed the motor's magnetising current.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Calculate required kVAr</li>
              <li>tan phi1 = tan(cos inverse 0.82) = tan(34.9 degrees) = 0.698</li>
              <li>tan phi2 = tan(cos inverse 0.95) = tan(18.2 degrees) = 0.329</li>
              <li>Qc = 30 x (0.698 - 0.329) = 30 x 0.369 = <strong>11.1 kVAr</strong></li>
              <li>Step 2: Verify against magnetising current</li>
              <li>Motor kVA = 30 / 0.82 = 36.6 kVA</li>
              <li>Max capacitor = 30-40% of motor kVA</li>
              <li>Max = 0.35 x 36.6 = 12.8 kVAr</li>
              <li>11.1 kVAr is less than 12.8 kVAr - safe for individual correction</li>
              <li>Specify 12.5 kVAr capacitor (nearest standard)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 3: Automatic PFC Stepped Bank Design
            </p>
            <p>
              <strong>Question:</strong> Design an automatic PFC system for a site with demand
              varying between 100kW and 400kW. Existing pf is 0.75, target is 0.95.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Calculate kVAr range</li>
              <li>tan phi1 = 0.882, tan phi2 = 0.329</li>
              <li>At minimum (100kW): Qc = 100 x 0.553 = 55.3 kVAr</li>
              <li>At maximum (400kW): Qc = 400 x 0.553 = 221.2 kVAr</li>
              <li>Step 2: Design step configuration</li>
              <li>Total required: 225 kVAr (with margin)</li>
              <li>Minimum step: approximately 55 kVAr for base load</li>
              <li>Option A - Equal steps: 9 x 25 kVAr = 225 kVAr</li>
              <li>Option B - Mixed steps (recommended): 1 x 12.5 kVAr + 2 x 25 kVAr + 4 x 37.5 kVAr = 212.5 kVAr</li>
              <li>Option B provides finer control at low loads</li>
              <li>Use 7% detuned if VFDs present</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 4: Star vs Delta kVAr Comparison
            </p>
            <p>
              <strong>Question:</strong> A 50 microF capacitor is available. Calculate its kVAr
              rating when connected in star and delta on a 400V three-phase system.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Capacitor reactance: Xc = 1/(2 x pi x f x C)</li>
              <li>Xc = 1/(2 x pi x 50 x 50 x 10 to power -6) = 63.7 ohms</li>
              <li><strong>Star connection:</strong></li>
              <li>Voltage across each capacitor = 400 / root3 = 230V</li>
              <li>Q per capacitor = V squared / Xc = 230 squared / 63.7 = 830 VAr</li>
              <li>Total Q (3 capacitors) = 3 x 830 = <strong>2.49 kVAr</strong></li>
              <li><strong>Delta connection:</strong></li>
              <li>Voltage across each capacitor = 400V</li>
              <li>Q per capacitor = V squared / Xc = 400 squared / 63.7 = 2,512 VAr</li>
              <li>Total Q (3 capacitors) = 3 x 2,512 = <strong>7.54 kVAr</strong></li>
              <li>Delta provides 7.54 / 2.49 = 3.03x the kVAr</li>
              <li>This confirms the (400/230) squared is approximately 3 relationship</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Qc = P(tan phi1 - tan phi2)</strong> - Required capacitor kVAr</li>
              <li><strong>Q = V squared / Xc = 2 x pi x f x C x V squared</strong> - Capacitor reactive power</li>
              <li><strong>fr = fn / root(p)</strong> - Detuned resonant frequency</li>
              <li><strong>Delta kVAr is approximately 3 x Star kVAr</strong> - Connection comparison</li>
              <li><strong>Max motor cap = 0.35 x motor kVA</strong> - Individual correction limit</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Specification Checklist</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Survey load profile before sizing - minimum one week data</li>
              <li>Measure THD% - if above 10%, specify detuned reactors</li>
              <li>Check for VFDs, UPS, large LED installations - harmonic sources</li>
              <li>Verify supply transformer short-circuit level for resonance calculation</li>
              <li>Allow 10-20% margin on total kVAr capacity</li>
              <li>Specify discharge resistors (50V in 1 minute per IEC)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Installation Requirements</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Capacitor-rated contactors for automatic switching</li>
              <li>HRC fuses sized for inrush (typically 1.5x capacitor current)</li>
              <li>Ventilation - capacitors generate heat, especially detuned types</li>
              <li>CT location - current measurement upstream of capacitor connection</li>
              <li>Cable sizing for harmonic currents if detuned/filtered</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common PFC mistakes"
            whatHappens={
              <>
                Oversizing individual motor capacitors causing self-excitation and overvoltage.
                Using standard capacitors with VFDs creating harmonic resonance risk. Fixing
                capacitors on variable loads results in leading pf at light load. Ignoring
                discharge time and reconnecting before 50V causes voltage transients. Wrong CT
                connection means controller measures wrong current direction.
              </>
            }
            doInstead={
              <>
                Limit individual motor capacitors to 30-40% of motor kVA. Always use 7% (or 14%)
                detuned reactors with VFDs or significant THD. Use automatic switching for
                variable loads. Wait for full discharge (60-90 s) before reconnection. Verify CT
                location upstream of capacitor and correct polarity at commissioning.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Specifying a stepped PFC bank for a mixed motor + LED office building"
            situation={
              <>
                You are picking the PFC strategy for a 1.6 MVA office-and-warehouse with a
                25 % VFD-driven motor load (chillers, AHUs), 60 % active-PFC LED lighting and
                small-power load, and 15 % miscellaneous heating / IT. Average PF measured at
                the supply is 0.78 lagging, target is 0.97. Site electrical engineer wants
                detuned bank because of the VFD harmonic content.
              </>
            }
            whatToDo={
              <>
                Calculate Q_C from the load profile across the day, picking step size to
                match the smallest motor block (typically 25–50 kVAr per step). Specify
                a stepped (contactor-switched) bank with 6–8 steps to track load
                smoothly. Add 7 % series detuning reactors to BS EN 61921, capacitors to
                BS EN 60831-1, assembled enclosure to BS EN 61439-1. Locate at the main
                LV switchboard rather than at each motor (load is too dynamic for fixed
                local PFC). Specify thyristor switching (instead of contactors) only if
                load varies faster than once per minute. Document the bank in the
                single-line diagram and on the Part L energy submission.
              </>
            }
            whyItMatters={
              <>
                The choice between static / stepped / active PFC, central vs local, and
                plain vs detuned, drives both capital cost and operating performance for the
                next 25 years. Get it wrong and you either over-spend on hardware or
                under-correct and continue paying penalties — your design decisions need
                to defend against both.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Static PFC (always-on capacitor bank): cheapest, used where the inductive load is roughly constant — risk of over-correction at low load.',
              'Stepped PFC (multiple capacitor stages switched by contactor): standard for buildings with variable load — 6–8 steps to track demand.',
              'Active PFC (IGBT-based, fast electronics): smooth correction down to small kVAr, also corrects harmonics — used where load is highly variable or non-linear.',
              'Central / bulk PFC at the main board: best where load is dynamic or distributed — simpler maintenance, single point of control.',
              'Local PFC at the motor: best where the inductive load is large, constant and a long way from the source — cuts cable losses upstream.',
              'Detuned PFC (7 % typical, 14 % for heavy harmonic content) shifts the bank’s resonant frequency below the harmonic spectrum, protecting capacitors against resonance.',
              'BS EN 60831-1 governs the capacitor cans. BS EN 61921 governs the assembled PFC equipment. BS EN 61439-1 governs the enclosure.',
              'Discharge resistors are mandatory — stored ½CV² energy in a large bank is lethal, so always wait the declared discharge time before touching terminals.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section2-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Power Factor - Causes and Effects
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section2-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 2.6
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section2_5;
