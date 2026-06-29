/**
 * Module 3 · Section 2 · Subsection 7 — AC Applications in Lighting, HVAC and Motors
 * HNC Electrical Engineering for Building Services (Pearson U4019 — Electrical & Electronic Principles)
 *   The full AC theory toolkit applied to the three big load groups in a real building —
 *   lighting drivers, HVAC fan / pump motors and the fixed-speed compressors / heaters that sit alongside.
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

const TITLE = 'Applications in Lighting, HVAC and Motors - HNC Module 3 Section 2.7';
const DESCRIPTION =
  'Practical application of reactive component principles in building services: motor circuits, lighting ballasts, LED drivers, HVAC equipment, variable speed drives and cable sizing for reactive loads in UK commercial installations.';

const quickCheckQuestions = [
  {
    id: 'motor-starting-current',
    question:
      'What is the typical starting current of a direct-on-line (DOL) induction motor compared to full load current?',
    options: [
      '1-2 times FLC',
      '6-8 times FLC',
      '3-4 times FLC',
      '10-12 times FLC',
    ],
    correctIndex: 1,
    explanation:
      'DOL starting typically draws 6-8 times full load current (FLC). This high inrush affects cable sizing, protective device selection, and can cause voltage dips affecting other equipment on the same supply.',
  },
  {
    id: 'electronic-ballast-pf',
    question:
      'What is the typical power factor of a modern electronic ballast for fluorescent lighting?',
    options: [
      '0.5 lagging',
      '0.85 lagging',
      '0.95 or better',
      'Unity (1.0)',
    ],
    correctIndex: 2,
    explanation:
      'Modern electronic ballasts achieve power factors of 0.95 or better through active power factor correction (PFC) circuits. This compares favourably with older magnetic ballasts which typically had power factors of 0.5-0.6 lagging.',
  },
  {
    id: 'vsd-harmonics',
    question: 'Which harmonic orders are most significant in six-pulse variable speed drives?',
    options: [
      '2nd, 4th, 6th',
      '3rd, 9th, 15th',
      'All even harmonics',
      '5th, 7th, 11th, 13th',
    ],
    correctIndex: 3,
    explanation:
      'Six-pulse VSDs produce characteristic harmonics of order h = 6n ± 1 (where n = 1, 2, 3...), giving 5th, 7th, 11th, 13th etc. These are the dominant harmonics that require mitigation in large VSD installations.',
  },
  {
    id: 'slip-calculation',
    question: 'A 4-pole motor operates at 1440 rpm on a 50Hz supply. What is the slip?',
    options: [
      '2%',
      '8%',
      '6%',
      '4%',
    ],
    correctIndex: 3,
    explanation:
      'Synchronous speed = (120 × f) / p = (120 × 50) / 4 = 1500 rpm. Slip = (Ns - Nr) / Ns = (1500 - 1440) / 1500 = 0.04 = 4%. This is typical for a loaded induction motor.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Why does an induction motor draw such high starting current?',
    options: [
      'The winding resistance is very low at start',
      'At standstill, slip = 1 and rotor impedance is at minimum',
      'The magnetic field collapses at start',
      'Power factor is unity at starting',
    ],
    correctAnswer: 1,
    explanation:
      'At standstill, slip s = 1, meaning the rotor frequency equals supply frequency. This results in minimum rotor impedance (R₂/s is at its lowest), causing maximum current draw. As the motor accelerates, slip decreases and current falls.',
  },
  {
    id: 2,
    question:
      'A 7.5kW motor operates at 0.85 power factor on 400V three-phase. What is the line current?',
    options: [
      '15.4A',
      '10.8A',
      '12.7A',
      '18.1A',
    ],
    correctAnswer: 2,
    explanation:
      'Using P = √3 × VL × IL × cos φ: IL = P / (√3 × VL × cos φ) = 7500 / (1.732 × 400 × 0.85) = 7500 / 589 = 12.7A',
  },
  {
    id: 3,
    question:
      'What is the main advantage of electronic ballasts over magnetic ballasts in fluorescent lighting?',
    options: [
      'Higher operating frequency eliminates flicker and improves efficacy',
      'They are significantly heavier due to a larger iron core',
      'They draw a lower power factor of around 0.5 lagging',
      'They operate the lamp at the 50 Hz mains frequency',
    ],
    correctAnswer: 0,
    explanation:
      'Electronic ballasts operate at 25-40 kHz, eliminating the visible 100Hz flicker of magnetic ballasts. The high frequency also improves lamp efficacy by 10-15% and enables dimming. They include PFC for high power factor.',
  },
  {
    id: 4,
    question:
      'What power factor would you expect from a basic LED driver without power factor correction?',
    options: [
      '0.95 lagging',
      '0.95 leading',
      '0.5-0.6 lagging',
      'Unity',
    ],
    correctAnswer: 2,
    explanation:
      'Basic LED drivers use simple rectifier-capacitor circuits which draw current in sharp peaks, resulting in poor power factor (0.5-0.6) and high harmonic distortion. Quality LED drivers include active PFC to achieve >0.9 power factor.',
  },
  {
    id: 5,
    question: 'In an induction motor equivalent circuit, what does R₂/s represent?',
    options: [
      'The stator winding copper losses only',
      'Mechanical load and rotor losses',
      'The magnetising reactance of the air gap',
      'The iron (core) losses in the stator',
    ],
    correctAnswer: 1,
    explanation:
      'R₂/s in the equivalent circuit represents both the actual rotor resistance losses (R₂) and the mechanical power converted. As slip decreases (motor speeds up), R₂/s increases, representing the mechanical load being driven.',
  },
  {
    id: 6,
    question:
      'A fan motor draws 15A at 0.7 power factor lagging on a 400V three-phase supply. What capacitive kVAr is needed to correct to 0.95?',
    options: [
      '2.4 kVAr',
      '7.4 kVAr',
      '3.2 kVAr',
      '5.0 kVAr',
    ],
    correctAnswer: 3,
    explanation:
      'At 400V three-phase: S = √3 × 400 × 15 = 10.4 kVA. P = 10.4 × 0.7 = 7.28 kW. Q₁ = 7.28 × tan(cos⁻¹0.7) = 7.43 kVAr. Q₂ = 7.28 × tan(cos⁻¹0.95) = 2.39 kVAr. Correction required = Q₁ − Q₂ = 7.43 − 2.39 = 5.04 kVAr ≈ 5.0 kVAr.',
  },
  {
    id: 7,
    question: 'What is the synchronous speed of a 6-pole motor on a 50Hz supply?',
    options: [
      '750 rpm',
      '3000 rpm',
      '1500 rpm',
      '1000 rpm',
    ],
    correctAnswer: 3,
    explanation:
      'Synchronous speed Ns = (120 × f) / p = (120 × 50) / 6 = 1000 rpm. The actual running speed will be slightly less due to slip (typically 2-5% at full load).',
  },
  {
    id: 8,
    question: 'Why do VSDs cause harmonic currents in the supply?',
    options: [
      'The rectifier input draws non-sinusoidal current',
      'The output PWM frequency is audible',
      'The motor windings are non-linear',
      'The DC link capacitors are too small',
    ],
    correctAnswer: 0,
    explanation:
      'The input rectifier of a VSD conducts only when the supply voltage exceeds the DC link voltage, drawing current in short pulses rather than sinusoidally. This non-linear behaviour produces harmonic currents, predominantly 5th, 7th, 11th and 13th orders.',
  },
  {
    id: 9,
    question: 'What is transformer inrush current typically measured as?',
    options: [
      'Equal to full load current',
      '10-15 times full load current',
      '2-3 times full load current',
      '50-100 times full load current',
    ],
    correctAnswer: 1,
    explanation:
      'Transformer inrush current can reach 10-15 times full load current for the first few cycles when energised at an unfavourable point on the voltage waveform. This must be considered when selecting upstream protection devices.',
  },
  {
    id: 10,
    question:
      'When sizing cables for motor circuits, which current value determines the minimum cable size?',
    options: [
      'The locked-rotor starting current, multiplied by 8',
      'The no-load magnetising current of the motor',
      'Full load current with appropriate factors applied',
      'The prospective short-circuit current at the motor terminals',
    ],
    correctAnswer: 2,
    explanation:
      "Cable sizing uses the motor full load current with appropriate factors (ambient temperature, grouping, installation method). Starting current is short-duration and doesn't determine continuous cable rating, but affects voltage drop calculations and protective device selection.",
  },
  {
    id: 11,
    question:
      'A 22kW pump motor has efficiency of 92% and power factor of 0.88. What is the input power?',
    options: [
      '20.2 kW',
      '27.2 kW',
      '25.0 kW',
      '23.9 kW',
    ],
    correctAnswer: 3,
    explanation:
      'Input power = Output power / Efficiency = 22 kW / 0.92 = 23.9 kW. The power factor affects the current drawn but not the real power input calculation when output power and efficiency are known.',
  },
  {
    id: 12,
    question: 'What effect does reducing motor load have on power factor?',
    options: [
      'Power factor becomes leading',
      'Power factor increases towards unity',
      'Power factor remains constant',
      'Power factor decreases significantly',
    ],
    correctAnswer: 3,
    explanation:
      'At light load, the magnetising current (reactive) remains nearly constant while the load current (resistive) reduces. This increases the proportion of reactive current, reducing power factor. A motor at 25% load might have pf of 0.5 compared to 0.85 at full load.',
  },
];

const faqs = [
  {
    question: 'Why do motors have such poor power factor at light load?',
    answer:
      "The magnetising current that creates the rotating magnetic field is essentially constant regardless of load - it's determined by the motor's magnetic circuit design. At light load, the load (in-phase) current reduces but the magnetising (lagging) current stays the same, so the proportion of reactive current increases and power factor falls. A motor at 25% load might have a power factor of only 0.4-0.5 compared to 0.85-0.9 at full load.",
  },
  {
    question: 'How do I size cables for motor circuits with high starting currents?',
    answer:
      "Cable sizing is based on the motor's full load current (not starting current), with factors applied for installation conditions. However, you must verify that voltage drop during starting doesn't cause problems for the motor or other equipment. BS 7671 allows higher voltage drop during motor starting (typically up to 15% momentarily) than during normal running. The protective device must be selected to allow the starting current without tripping.",
  },
  {
    question: "What's the difference between a constant torque and variable torque load?",
    answer:
      'Constant torque loads (conveyors, hoists, positive displacement pumps) require the same torque regardless of speed - power is proportional to speed. Variable torque loads (centrifugal fans and pumps) follow the affinity laws where torque varies with speed squared and power with speed cubed. This makes VSDs particularly effective for variable torque loads - reducing fan speed by 20% reduces power consumption by nearly 50%.',
  },
  {
    question: 'Why are harmonics from VSDs a concern in building services?',
    answer:
      'VSD harmonics can cause overheating of cables and transformers, interference with sensitive equipment, nuisance tripping of RCDs, increased neutral currents in three-phase systems, and resonance with power factor correction capacitors. Mitigation methods include DC link chokes, line reactors, active front ends, and harmonic filters. The concern increases with the proportion of VSD load in an installation.',
  },
  {
    question: 'How does an electronic ballast achieve high power factor?',
    answer:
      'Modern electronic ballasts use active power factor correction (PFC) circuits - typically a boost converter between the rectifier and main converter stage. This shapes the input current to follow the voltage waveform, achieving power factors of 0.95-0.99 and THD below 10%. Basic LED drivers without PFC can have power factors as low as 0.5, which is why quality drivers with PFC are important for commercial installations.',
  },
  {
    question: 'What determines transformer inrush current magnitude?',
    answer:
      'Inrush current depends on the point-on-wave at which the transformer is energised and any residual flux in the core. Worst case is when energised at voltage zero crossing with maximum residual flux of opposite polarity - this can cause core saturation and currents of 10-15 times rated current. Inrush decays over several cycles as the transient flux component dissipates. Protective devices must be selected to ride through this inrush.',
  },
];

const HNCModule3Section2_7 = () => {
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
            eyebrow="Module 3 · Section 2 · Subsection 7"
            title="Applications in Lighting, HVAC and Motors"
            description="Practical application of reactive component principles in building services equipment and systems"
            tone="purple"
          />

          <TLDR
            points={[
              'You can size cable, MCB and PFC for an LED lighting circuit, distinguishing drivers with active PFC (PF > 0.9, true) from cheaper drivers with passive PF that need bulk correction.',
              'You can apply AC analysis to single- and three-phase induction motors — starting current, running impedance, slip, full-load efficiency and PF at part load.',
              'You can compare DOL, star-delta, soft-start and VFD starting methods on the basis of inrush current, voltage dip and harmonic content.',
              'You can size a VFD, choose between motor-mounted and panel-mounted PFC, and decide where harmonic mitigation is needed.',
              'You can map AC theory to BMS metering: real, reactive, apparent power and PF on each phase of every distribution board.',
            ]}
          />

          <RegsCallout
            source="BS EN 60034-30-1 — Rotating electrical machines: Efficiency classes (IE1–IE4) for AC induction motors"
            clause="Single-speed three-phase 50 Hz cage induction motors rated 0.12 kW to 1000 kW shall be classified into efficiency classes from IE1 (Standard) through IE2, IE3 (Premium) to IE4 (Super-Premium), with mandated minimum efficiency depending on rated power and pole number."
            meaning={
              <>
                Building services HVAC motors above 0.75 kW must meet IE3 minimum (or IE2 if
                fed from a VFD) under the EU MEPS regulation — still in force in UK
                building services specs. Pick efficiency class against the load profile,
                because IE3/IE4 motors run cooler, draw less line current, have better PF
                and recover their cost premium quickly on annual energy bills.
              </>
            }
            cite="Source: BS EN 60034-30-1 (latest edition); UK Ecodesign for Energy-Related Products Regulations 2010 (as amended)."
          />

          <LearningOutcomes
            outcomes={[
              'Calculate motor starting currents and understand their impact on system design',
              'Analyse induction motor equivalent circuits and slip characteristics',
              'Compare magnetic and electronic ballast performance characteristics',
              'Evaluate LED driver power quality and power factor correction',
              'Apply the affinity laws to fan and pump motor selection',
              'Understand VSD operation and harmonic mitigation strategies',
              'Account for transformer inrush and magnetising current',
              'Size cables correctly for reactive motor and lighting loads',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="Real building loads (motors, lighting, HVAC) are largely reactive and harmonic-rich; size circuits and PFC for reality, not nameplates."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motor starting:</strong> 6-8x FLC, poor power factor until running
              </li>
              <li>
                <strong>Electronic ballasts:</strong> High frequency, PFC for &gt;0.95 pf
              </li>
              <li>
                <strong>VSDs:</strong> Energy savings but produce harmonics
              </li>
              <li>
                <strong>Cable sizing:</strong> Must account for reactive loads
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>HVAC motors:</strong> Major reactive load in buildings
              </li>
              <li>
                <strong>LED drivers:</strong> Quality PFC essential for commercial
              </li>
              <li>
                <strong>Transformer sizing:</strong> Inrush current considerations
              </li>
              <li>
                <strong>Harmonic mitigation:</strong> Filters and line reactors
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Motor Circuits and Starting Current">
            <p>
              Induction motors are the workhorses of building services, driving fans, pumps,
              compressors and lifts. Understanding their electrical characteristics - particularly
              the high starting current and variable power factor - is essential for correct circuit
              design.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Induction Motor Starting Current
            </p>
            <p>
              When an induction motor starts, it draws very high current because the rotor is
              stationary (slip = 1) and rotor impedance is at minimum. As the motor accelerates,
              slip decreases and current falls to the running value.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Direct-on-line (DOL):</strong> Starting current 6-8 × FLC, starting torque 100% — Small motors up to ~7.5kW
              </li>
              <li>
                <strong>Star-delta:</strong> Starting current 2-3 × FLC, starting torque 33% — Fans, pumps (low starting torque)
              </li>
              <li>
                <strong>Soft starter:</strong> Starting current 2-4 × FLC, adjustable torque — Pumps, conveyors
              </li>
              <li>
                <strong>VSD (variable speed):</strong> Starting current 1-1.5 × FLC, 150%+ torque possible — Variable speed applications
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Power Factor Variation with Load
            </p>
            <p>
              Motor power factor varies significantly with load. The magnetising current
              (reactive) remains nearly constant, but load current (resistive) changes with
              mechanical load.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>100% (Full load):</strong> Power factor 0.85 - 0.90, efficiency 90 - 95%</li>
              <li><strong>75%:</strong> Power factor 0.80 - 0.85, efficiency 89 - 94%</li>
              <li><strong>50%:</strong> Power factor 0.70 - 0.75, efficiency 85 - 90%</li>
              <li><strong>25%:</strong> Power factor 0.45 - 0.55, efficiency 75 - 82%</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Oversized motors operating at light load have poor power
              factor and efficiency. Select motors to operate near 75-100% of rated load for best
              performance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Induction Motor Equivalent Circuit and Slip">
            <p>
              The induction motor equivalent circuit provides a model for analysing motor
              performance. Understanding slip is fundamental to this analysis and explains why motor
              characteristics change with load.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Slip Definition</p>
            <p>
              s = (N<sub>s</sub> - N<sub>r</sub>) / N<sub>s</sub> — Where Ns = synchronous speed, Nr = rotor speed
            </p>
            <p>
              N<sub>s</sub> = (120 × f) / p — Where f = frequency (Hz), p = number of poles
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Synchronous Speeds at 50Hz
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>2 poles:</strong> Synchronous 3000 rpm, running 2850-2950 rpm — Fans, small pumps
              </li>
              <li>
                <strong>4 poles:</strong> Synchronous 1500 rpm, running 1420-1480 rpm — Most HVAC applications
              </li>
              <li>
                <strong>6 poles:</strong> Synchronous 1000 rpm, running 950-980 rpm — Large fans, cooling towers
              </li>
              <li>
                <strong>8 poles:</strong> Synchronous 750 rpm, running 710-740 rpm — Low-speed applications
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Equivalent Circuit Components
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>R₁:</strong> Stator winding resistance - causes I²R losses
              </li>
              <li>
                <strong>X₁:</strong> Stator leakage reactance - flux not linking rotor
              </li>
              <li>
                <strong>Xm:</strong> Magnetising reactance - creates rotating field
              </li>
              <li>
                <strong>Rc:</strong> Core loss resistance - represents iron losses
              </li>
              <li>
                <strong>R₂/s:</strong> Rotor resistance/slip - represents mechanical power + rotor
                losses
              </li>
              <li>
                <strong>X₂:</strong> Rotor leakage reactance - referred to stator
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Key Insight: R₂/s Variation
            </p>
            <p>
              At standstill (s = 1), R₂/s = R₂, giving minimum impedance and maximum current. As
              the motor accelerates and slip decreases (say s = 0.04), R₂/s = 25R₂, representing
              the mechanical load being driven. This is why current drops as the motor reaches
              running speed.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Slip is typically 2-5% at full load for standard motors.
              Higher efficiency motors have lower slip due to reduced rotor resistance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Lighting Ballasts and LED Driver Circuits">
            <p>
              Lighting equipment represents significant reactive loads in commercial buildings.
              Understanding the differences between magnetic ballasts, electronic ballasts, and LED
              drivers is essential for correct circuit design and power quality assessment.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Magnetic vs Electronic Ballasts
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Operating frequency:</strong> Magnetic 50 Hz (mains) — Electronic 25-40 kHz
              </li>
              <li>
                <strong>Power factor (uncorrected):</strong> Magnetic 0.5 lagging — Electronic 0.95+ (with PFC)
              </li>
              <li>
                <strong>Flicker:</strong> Magnetic 100 Hz visible flicker — Electronic none (imperceptible)
              </li>
              <li>
                <strong>Efficacy improvement:</strong> Magnetic baseline — Electronic 10-15% better
              </li>
              <li>
                <strong>Weight:</strong> Magnetic heavy (iron core) — Electronic light
              </li>
              <li>
                <strong>Dimming capability:</strong> Magnetic limited — Electronic excellent (DALI, 1-10V)
              </li>
              <li>
                <strong>Harmonic distortion:</strong> Magnetic low — Electronic low with good PFC
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              LED Driver Power Quality
            </p>
            <p>
              LED drivers convert AC mains to the low-voltage DC required by LEDs. Driver quality
              significantly affects power factor and harmonic distortion.
            </p>
            <p className="text-sm font-medium text-white">Basic Driver (no PFC)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Simple rectifier-capacitor input</li>
              <li>Power factor: 0.5-0.6</li>
              <li>THD: 100%+ possible</li>
              <li>Draws current in sharp peaks</li>
              <li>Suitable only for small loads</li>
            </ul>
            <p className="text-sm font-medium text-white">Quality Driver (with PFC)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Active power factor correction</li>
              <li>Power factor: 0.95+</li>
              <li>THD: &lt;10%</li>
              <li>Near-sinusoidal input current</li>
              <li>Required for commercial installations</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              EN 61000-3-2 Harmonic Limits
            </p>
            <p>
              Lighting equipment over 25W must comply with Class C harmonic limits. Key
              requirements:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>3rd harmonic: ≤ 30 × circuit power factor %</li>
              <li>5th harmonic: ≤ 10%</li>
              <li>7th harmonic: ≤ 7%</li>
              <li>9th harmonic: ≤ 5%</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Specification tip:</strong> Always specify LED drivers with power factor ≥0.9
              and THD ≤20% for commercial projects. Check EN 61000-3-2 compliance on datasheets.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="HVAC Equipment, VSDs and Cable Sizing">
            <p>
              HVAC systems typically represent the largest electrical loads in commercial buildings,
              with fans, pumps and chillers accounting for 40-60% of total consumption. Variable
              speed drives offer major energy savings but introduce harmonic considerations.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              The Affinity Laws (Fan and Pump Laws)
            </p>
            <p>
              These fundamental relationships govern centrifugal fans and pumps, making them ideal
              for variable speed control.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Q ∝ N:</strong> Flow proportional to speed</li>
              <li><strong>H ∝ N²:</strong> Head proportional to speed²</li>
              <li><strong>P ∝ N³:</strong> Power proportional to speed³</li>
            </ul>
            <p>
              Example: Reducing fan speed by 20% reduces power consumption by 1 - 0.8³ = 49%
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Variable Speed Drive Harmonics
            </p>
            <p>
              Standard six-pulse VSDs produce characteristic harmonic currents that can cause
              problems in electrical installations.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>5th (250 Hz):</strong> 25-40% of fundamental — Negative sequence, motor heating
              </li>
              <li>
                <strong>7th (350 Hz):</strong> 15-25% of fundamental — Positive sequence
              </li>
              <li>
                <strong>11th (550 Hz):</strong> 7-12% of fundamental — Additional heating
              </li>
              <li>
                <strong>13th (650 Hz):</strong> 5-10% of fundamental — Voltage distortion
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Harmonic Mitigation Methods
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Line reactors (3-5%):</strong> Simple, reduces THD to ~35%
              </li>
              <li>
                <strong>DC link chokes:</strong> Smooth DC, reduce input harmonics
              </li>
              <li>
                <strong>12-pulse rectifiers:</strong> Cancel 5th and 7th harmonics
              </li>
              <li>
                <strong>Active front end:</strong> Near-sinusoidal input, THD &lt;5%
              </li>
              <li>
                <strong>Passive filters:</strong> Tuned to specific harmonics
              </li>
              <li>
                <strong>Active filters:</strong> Real-time harmonic cancellation
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Transformer Considerations
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inrush current:</strong> 10-15 × rated current for first few cycles
              </li>
              <li>
                <strong>Magnetising current:</strong> Typically 2-5% of rated, highly inductive
              </li>
              <li>
                <strong>K-factor rating:</strong> Required for non-linear loads (K-13 typical for
                VSD loads)
              </li>
              <li>
                <strong>Derating:</strong> Standard transformers derated 15-20% for harmonic loads
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Cable Sizing for Motor Circuits
            </p>
            <p>Key considerations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use motor full load current (FLC) from nameplate or BS 7671 tables</li>
              <li>Apply correction factors: Ca (ambient), Cg (grouping), Ci (insulation)</li>
              <li>Check voltage drop at both running and starting conditions</li>
              <li>For VSD-fed motors, consider additional derating for harmonics (~5-10%)</li>
              <li>Protective device must allow starting current without nuisance tripping</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> VSD output cables see high-frequency PWM voltages. Use
              cables rated for this duty and keep motor cable lengths within manufacturer limits to
              avoid reflected wave voltage spikes.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 1: Motor Starting Current and Protection
            </p>
            <p>
              <strong>Question:</strong> A 15kW, 400V three-phase motor has efficiency 91% and
              power factor 0.87 at full load. Calculate the full load current and expected DOL
              starting current.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Input power = Output / Efficiency = 15000 / 0.91 = 16484W</li>
              <li>Full load current:</li>
              <li>IL = P / (√3 × VL × cos φ)</li>
              <li>IL = 16484 / (1.732 × 400 × 0.87)</li>
              <li>IL = 16484 / 602.7 = <strong>27.4A</strong></li>
              <li>DOL starting current (assuming 7× FLC):</li>
              <li>Istart = 7 × 27.4 = <strong>192A</strong></li>
              <li>→ Protection device must allow 192A for ~5 seconds without tripping</li>
              <li>→ Consider Type D MCB or MCCB with adjustable magnetic trip</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 2: Fan Energy Savings with VSD
            </p>
            <p>
              <strong>Question:</strong> A supply fan with 11kW motor normally runs at full speed.
              If a VSD reduces speed to 75% for 60% of operating hours, calculate annual energy
              savings.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Power at 75% speed (affinity law):</li>
              <li>P = 11kW × 0.75³ = 11 × 0.422 = <strong>4.64kW</strong></li>
              <li>Assuming 4000 operating hours per year:</li>
              <li>Hours at full speed: 4000 × 0.4 = 1600h</li>
              <li>Hours at 75% speed: 4000 × 0.6 = 2400h</li>
              <li>Without VSD: 11kW × 4000h = 44,000 kWh</li>
              <li>With VSD: (11 × 1600) + (4.64 × 2400) = 17,600 + 11,136 = 28,736 kWh</li>
              <li>Annual saving = 44,000 - 28,736 = <strong>15,264 kWh</strong></li>
              <li>Percentage saving = <strong>34.7%</strong></li>
              <li>At £0.15/kWh: £2,290 annual saving</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 3: LED Driver Power Factor Assessment
            </p>
            <p>
              <strong>Question:</strong> A lighting installation has 100 LED fittings, each with a
              45W driver. Compare the supply current with drivers having (a) pf = 0.55 and (b) pf
              = 0.95.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total power = 100 × 45W = 4500W = 4.5kW</li>
              <li>(a) With poor power factor (0.55):</li>
              <li>Apparent power S = P / pf = 4500 / 0.55 = 8182 VA</li>
              <li>Current I = S / V = 8182 / 230 = <strong>35.6A</strong></li>
              <li>(b) With good power factor (0.95):</li>
              <li>Apparent power S = P / pf = 4500 / 0.95 = 4737 VA</li>
              <li>Current I = S / V = 4737 / 230 = <strong>20.6A</strong></li>
              <li>Good PFC reduces current by 42%, enabling smaller cables and potentially fewer circuits</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 4: Motor Slip and Speed Calculation
            </p>
            <p>
              <strong>Question:</strong> A 4-pole induction motor operates on 50Hz supply with
              3.5% slip at full load. Calculate the synchronous speed and actual running speed.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Synchronous speed:</li>
              <li>Ns = (120 × f) / p = (120 × 50) / 4 = <strong>1500 rpm</strong></li>
              <li>Actual speed:</li>
              <li>Nr = Ns × (1 - s) = 1500 × (1 - 0.035)</li>
              <li>Nr = 1500 × 0.965 = <strong>1447.5 rpm</strong></li>
              <li>Nameplate would typically show 1450 rpm or 1440 rpm</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ns = (120 × f) / p</strong> — Synchronous speed (rpm)</li>
              <li><strong>s = (Ns - Nr) / Ns</strong> — Slip</li>
              <li><strong>P = √3 × VL × IL × cos φ × η</strong> — Motor input power</li>
              <li><strong>P ∝ N³</strong> — Fan/pump affinity law for power</li>
              <li><strong>h = 6n ± 1</strong> — Characteristic harmonics (6-pulse VSD)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Values to Remember</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>DOL starting current: <strong>6-8 × FLC</strong></li>
              <li>Star-delta starting current: <strong>2-3 × FLC</strong> (33% torque)</li>
              <li>Electronic ballast power factor: <strong>≥0.95</strong></li>
              <li>Typical motor slip at full load: <strong>2-5%</strong></li>
              <li>Transformer inrush: <strong>10-15 × rated current</strong></li>
              <li>K-factor for VSD loads: <strong>K-13 typical</strong></li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Motor Circuit Design Checklist
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Obtain motor FLC from nameplate or calculate from kW rating</li>
              <li>Apply installation correction factors to determine cable size</li>
              <li>Check voltage drop at running current (max 5% typically)</li>
              <li>Verify voltage drop during starting is acceptable (15% momentarily)</li>
              <li>Select protection device allowing starting current without tripping</li>
              <li>Consider power factor correction if multiple motors</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common motor and lighting mistakes"
            whatHappens={
              <>
                Using output power as input (forgetting efficiency). Ignoring starting current
                when selecting protection. Specifying poor LED drivers leading to excessive
                current and harmonics. Forgetting VSD harmonics affect other equipment and
                protection. Oversizing motors causing poor power factor and efficiency. Ignoring
                transformer inrush which can trip upstream protection.
              </>
            }
            doInstead={
              <>
                Always divide output kW by efficiency to get input. Size protection for starting
                inrush (Type D MCB or MCCB). Specify LED drivers with PFC ≥0.9 and THD ≤20%.
                Conduct harmonic study for VSD-rich installations. Right-size motors to run at
                75-100% load. Allow ride-through margin for transformer energisation.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Picking starting method for a 22 kW chiller compressor on a tight supply"
            situation={
              <>
                A 22 kW three-phase chiller compressor needs to start on a 1000 kVA supply
                serving a small mixed-use building with sensitive IT load. DOL inrush would be
                roughly 6 × FLC ≈ 240 A, dipping the supply voltage by 6–7 % —
                outside the 4 % limit the IT supplier insists on for clean operation.
              </>
            }
            whatToDo={
              <>
                Compare the three realistic options. (1) Star-delta: cuts starting current to
                roughly 1/3 (≈80 A), but needs the motor to be specifically wound for it
                and gives a torque dip on transition. (2) Soft-starter: smooth thyristor-based
                ramp, peak typically 3 × FLC, no harmonic content during run. (3) VFD:
                full speed control, peak start typically 1 × FLC, also gives part-load
                energy savings on a chiller, but needs harmonic mitigation per IEEE 519. For
                this compressor and supply, a VFD is the right pick — it solves both the
                starting dip and the part-load efficiency problem, and the harmonic mitigation
                is a known cost line.
              </>
            }
            whyItMatters={
              <>
                Picking the starting method is a direct application of AC theory —
                starting impedance, voltage drop, harmonic content. The wrong choice causes
                rolling brownouts on adjacent loads, premature compressor failure, or both.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'LED lighting drivers with active PFC: true PF ≥ 0.9, low THD, no bulk PFC needed downstream. Cheap drivers (no active PFC) need attention or bulk correction.',
              'Three-phase induction motors are inductive loads — PF lags worse at part load (often 0.6 at 25 % load vs 0.85 at full load).',
              'DOL starting current is typically 5–7 × FLC — sized by blocked-rotor impedance, not running impedance.',
              'Star-delta starting: ≈1/3 of DOL inrush, requires motor designed for it and a transition torque dip.',
              'Soft-starter (thyristor): smooth ramp, peak ≈3 × FLC during start, no permanent control during run — best for fixed-speed pumps and compressors.',
              'VFD: full speed control, peak start ≈1 × FLC, large part-load energy savings on variable-torque loads (fans, pumps), needs harmonic mitigation per IEEE 519.',
              'Motor efficiency class to BS EN 60034-30-1 — IE3 minimum for most building services motors above 0.75 kW. IE4 / IE5 for high-runtime applications.',
              'BMS metering should report P (kW), Q (kVAr), S (kVA) and PF per phase — the AC theory in this section is what makes those readings interpretable on the dashboard.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section2-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Resonance in RLC Circuits
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 3
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section2_7;
