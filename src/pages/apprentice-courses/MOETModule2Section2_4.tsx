/**
 * MOET · Module 2 · Section 2.2 · Subsection 4 — Frequency and Waveforms
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Electrical. Electrical engineering principles: circuit terminology,
 *     Ohm’s Law, transformer theory, and power calculations."
 *   · "Electrical. Principles of single phase and three-phase equipment,
 *     plant, and systems, the operation of motors and generators, and the
 *     use…"
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * Diagram note: only SineWave is wired here (frequency/period). The spec's
 * HalfWaveRectified/FullWaveRectified pairing for this subsection does not
 * match what this page teaches — it is about harmonics, not rectification —
 * so those two are left out rather than forced in. See conversion report.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import { SineWave } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Frequency and Waveforms - MOET Module 2.2.4';
const DESCRIPTION =
  'Comprehensive guide to frequency, harmonics and waveform distortion for maintenance technicians: 50 Hz UK supply, angular frequency, harmonic orders (3rd, 5th, 7th), THD, non-linear loads (VSDs, LED drivers), effects of harmonics (neutral overload, transformer heating), harmonic filters and oscilloscope use under BS 7671 and ST1426.';

const quickCheckQuestions = [
  {
    id: 'harmonic-order',
    question: 'The third harmonic of the 50 Hz UK supply has a frequency of:',
    options: ['200 Hz', '100 Hz', '250 Hz', '150 Hz'],
    correctIndex: 3,
    explanation:
      'The nth harmonic is n times the fundamental frequency. The third harmonic of 50 Hz is 3 x 50 = 150 Hz. Similarly, the 5th harmonic is 250 Hz, the 7th is 350 Hz, and so on. Odd harmonics are the most significant in power systems because most non-linear loads produce symmetrical waveform distortion.',
  },
  {
    id: 'thd-meaning',
    question: 'Total Harmonic Distortion (THD) is a measure of:',
    options: [
      'The total power consumed by all the non-linear loads on a circuit',
      'How much the waveform deviates from a pure sine wave due to harmonic content',
      'The phase difference between the supply voltage and current',
      'The peak value of the supply voltage relative to its RMS value',
    ],
    correctIndex: 1,
    explanation:
      'THD expresses the ratio of the RMS value of all harmonic components to the RMS value of the fundamental component, usually as a percentage. A THD of 0% means a perfect sine wave. A THD of 5% is typical for a lightly loaded modern installation. A THD above 8% generally requires investigation and possible remediation.',
  },
  {
    id: 'triplen-harmonics',
    question:
      'Triplen harmonics (3rd, 9th, 15th, etc.) are particularly problematic in three-phase systems because:',
    options: [
      'They add arithmetically in the neutral conductor, potentially overloading it',
      'They cancel out completely in the neutral conductor of a balanced load',
      'They increase the supply frequency above the nominal 50 Hz',
      'They only affect single-phase circuits and never three-phase systems',
    ],
    correctIndex: 0,
    explanation:
      'Triplen harmonics (multiples of 3) are zero-sequence harmonics. Unlike the fundamental 50 Hz currents (which cancel in a balanced neutral), triplen harmonics from all three phases are in phase with each other and add arithmetically in the neutral conductor. This can cause the neutral current to exceed the line current — a serious overloading risk, particularly in older installations with reduced neutral conductors.',
  },
  {
    id: 'oscilloscope-use',
    question:
      'When using an oscilloscope to measure a 50 Hz waveform, what timebase setting would show approximately two complete cycles on the screen?',
    options: [
      '10 ms/div with 10 divisions = 100 ms total',
      '50 ms/div with 10 divisions = 500 ms total',
      '5 ms/div with 10 divisions = 50 ms total',
      '1 ms/div with 10 divisions = 10 ms total',
    ],
    correctIndex: 2,
    explanation:
      'One complete cycle at 50 Hz takes 20 ms (T = 1/f = 1/50 = 0.02 s). To display two complete cycles requires 40 ms of time on screen. With 10 horizontal divisions, a timebase of 5 ms/div gives 50 ms total — enough to display 2.5 cycles, clearly showing approximately two complete cycles.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The angular frequency of the UK 50 Hz supply is approximately:',
    options: ['50 rad/s', '314 rad/s', '157 rad/s', '628 rad/s'],
    correctAnswer: 1,
    explanation:
      'Angular frequency ω = 2πf = 2 x π x 50 = 100π ≈ 314 rad/s. Angular frequency is used in calculations of inductive reactance (XL = ωL) and capacitive reactance (XC = 1/ωC). It represents the rate of rotation of the phasor in radians per second.',
  },
  {
    id: 2,
    question:
      'Which of the following loads is most likely to produce significant harmonic distortion?',
    options: [
      'A tungsten filament heater element',
      'A standard incandescent lighting circuit',
      'A variable speed drive (VSD) with a six-pulse rectifier input',
      'A purely resistive immersion heater',
    ],
    correctAnswer: 2,
    explanation:
      'Variable speed drives with six-pulse rectifier inputs are among the most significant sources of harmonic distortion in industrial installations. They draw current in short pulses at the peaks of the voltage waveform, producing a characteristic current waveform rich in 5th (250 Hz), 7th (350 Hz), 11th and 13th harmonics. Resistive loads and incandescent lamps draw sinusoidal current and produce no harmonics.',
  },
  {
    id: 3,
    question:
      'A six-pulse rectifier (as found in many VSDs) produces characteristic harmonics of order:',
    options: [
      '3rd, 9th, 15th (triplen harmonics)',
      '2nd, 4th, 6th, 8th (even harmonics)',
      'All harmonics equally',
      '5th, 7th, 11th, 13th (h = 6n ± 1)',
    ],
    correctAnswer: 3,
    explanation:
      'A six-pulse rectifier produces harmonics of order h = 6n ± 1, where n = 1, 2, 3... This gives 5th, 7th, 11th, 13th, 17th, 19th, etc. The magnitude decreases with harmonic order (approximately 1/h). A twelve-pulse rectifier eliminates the 5th and 7th, producing mainly 11th and 13th — this is one method of harmonic reduction.',
  },
  {
    id: 4,
    question: 'What effect do harmonics have on transformers?',
    options: [
      'Increased eddy current and hysteresis losses, causing additional heating',
      'A reduction in the core temperature due to lower magnetising current',
      'No effect, because transformers only respond to the fundamental frequency',
      'An automatic improvement in efficiency at higher harmonic orders',
    ],
    correctAnswer: 0,
    explanation:
      "Harmonics cause additional heating in transformers through two mechanisms: eddy current losses increase as the square of the frequency (a 250 Hz 5th harmonic produces 25 times the eddy current losses of the 50 Hz fundamental), and hysteresis losses increase approximately linearly with frequency. This is why transformers supplying harmonic-rich loads must be derated or specified as 'K-rated' transformers designed for harmonic duty.",
  },
  {
    id: 5,
    question: 'The BS EN 61000-3-2 standard limits harmonic currents for:',
    options: [
      'Only three-phase equipment rated above 75 A per phase',
      'Equipment with rated current up to 16 A per phase (Class A, B, C, D equipment)',
      'High-voltage transmission equipment operating above 11 kV',
      'Only domestic appliances connected by a 13 A plug',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 61000-3-2 sets limits on harmonic current emissions for equipment with a rated input current of up to 16 A per phase. It classifies equipment into four classes (A, B, C, D) with different limits for each. For larger equipment, BS EN 61000-3-12 applies (up to 75 A per phase). These standards are part of the EMC Directive requirements.',
  },
  {
    id: 6,
    question:
      'An oscilloscope displays a waveform with a flattened top. This is most likely caused by:',
    options: [
      'A purely resistive load drawing a sinusoidal current',
      'The supply frequency drifting below 50 Hz',
      'Voltage distortion from harmonic-producing loads (flat-topping)',
      'An open-circuit fault on the neutral conductor',
    ],
    correctAnswer: 2,
    explanation:
      'Flat-topping of the voltage waveform is caused by non-linear loads drawing current in short pulses at the voltage peaks. The high peak current demand causes a voltage drop at the peaks (due to source impedance), flattening the top of the voltage sine wave. This is a very common observation in modern commercial buildings with high concentrations of IT equipment and LED lighting.',
  },
  {
    id: 7,
    question:
      'Which harmonic mitigation technique involves connecting two rectifiers with a 30-degree phase shift?',
    options: [
      'Passive harmonic filter',
      'Active harmonic filter',
      'K-rated transformer',
      'Twelve-pulse rectification',
    ],
    correctAnswer: 3,
    explanation:
      'Twelve-pulse rectification uses two six-pulse rectifiers fed from transformer secondaries with a 30-degree phase shift (typically one star and one delta secondary). The 5th and 7th harmonics from the two rectifiers are 180 degrees out of phase and cancel each other, leaving mainly 11th and 13th harmonics. This can reduce total current THD from approximately 30% to approximately 10%.',
  },
  {
    id: 8,
    question: "The 'skin effect' at harmonic frequencies causes:",
    options: [
      'Increased effective AC resistance of conductors',
      'A reduction in conductor temperature under load',
      'The current to flow only in the centre of the conductor',
      'An increase in the conductor cross-sectional area',
    ],
    correctAnswer: 0,
    explanation:
      'The skin effect causes AC current to flow preferentially on the surface of a conductor. The depth of penetration decreases with increasing frequency. At harmonic frequencies (250 Hz, 350 Hz, etc.), the skin effect is more pronounced than at 50 Hz, reducing the effective cross-sectional area and increasing the AC resistance. This causes additional heating in conductors carrying harmonic currents and may require conductor derating.',
  },
  {
    id: 9,
    question: 'An active harmonic filter works by:',
    options: [
      'Disconnecting the load whenever harmonics exceed a set threshold',
      'Injecting equal and opposite harmonic currents to cancel the harmonics',
      'Increasing the supply voltage to dilute the harmonic content',
      'Providing a tuned LC path that diverts a single fixed harmonic',
    ],
    correctAnswer: 1,
    explanation:
      'An active harmonic filter (AHF) monitors the load current in real time, analyses the harmonic content, and injects equal and opposite harmonic currents into the supply. The harmonic currents from the load and the filter cancel each other, resulting in a near-sinusoidal current drawn from the supply. AHFs are the most effective and flexible harmonic mitigation solution but are also the most expensive.',
  },
  {
    id: 10,
    question:
      'A power quality analyser shows voltage THD of 12% on a distribution board. According to BS EN 50160, the recommended limit for voltage THD on LV systems is:',
    options: ['1%', '5%', '8%', '15%'],
    correctAnswer: 2,
    explanation:
      'BS EN 50160 (voltage characteristics of electricity supplied by public distribution systems) states that voltage THD should not exceed 8% under normal operating conditions, measured over 10-minute intervals. Individual harmonic voltages also have specific limits. A THD of 12% exceeds this limit and investigation is warranted — the source of harmonics should be identified and mitigation measures considered.',
  },
  {
    id: 11,
    question:
      'When connecting an oscilloscope probe to measure a 400 V three-phase supply, you should:',
    options: [
      'Connect the probe earth lead directly to one of the live phases',
      'Use any standard x1 probe rated for low-voltage signals',
      'Disconnect the oscilloscope mains earth before connecting',
      'Use an appropriately rated high-voltage differential probe or voltage attenuator',
    ],
    correctAnswer: 3,
    explanation:
      "Standard oscilloscope probes are typically rated for a maximum of 300-600 V (CAT II). For 400 V three-phase measurements, a high-voltage differential probe (with appropriate CAT III or CAT IV rating) must be used. A differential probe measures the voltage between two points without connecting either to the oscilloscope's ground — this is essential because the oscilloscope ground is typically connected to mains earth, and connecting it to a live conductor would create a dangerous short circuit.",
  },
  {
    id: 12,
    question:
      'In a building with many VSD-controlled motors, which of the following is NOT a typical symptom of harmonic distortion?',
    options: [
      'Increased supply frequency above 50 Hz',
      'Incorrect readings on average-responding meters',
      'Unexplained overheating of neutral conductors',
      'Premature failure of power factor correction capacitors',
    ],
    correctAnswer: 0,
    explanation:
      'Harmonics do not change the supply frequency — the fundamental remains at 50 Hz. Harmonics are additional frequency components superimposed on the fundamental. The other three options are all genuine symptoms of harmonic distortion: neutral overloading from triplen harmonics, PFC capacitor failure from harmonic resonance and overcurrent, and incorrect meter readings because average-responding meters assume a pure sine wave.',
  },
];

const faqs = [
  {
    question: 'Are harmonics a new problem in electrical installations?',
    answer:
      'Harmonics have always existed to some degree (fluorescent lighting with magnetic ballasts produced 3rd harmonics), but the problem has become much more significant with the proliferation of electronic loads. Switch-mode power supplies in computers, LED drivers, variable speed drives and EV chargers all draw non-sinusoidal current. In a modern office building, harmonic current can account for 30-40% of the total current. BS 7671 now requires designers to consider harmonics when sizing neutral conductors and selecting equipment.',
  },
  {
    question: 'Can harmonics damage my equipment?',
    answer:
      'Yes. Harmonics can cause premature failure of numerous types of equipment. Transformers overheat due to increased eddy current and hysteresis losses. Power factor correction capacitors can be destroyed by harmonic resonance, which amplifies harmonic currents through the capacitors. Motors experience additional heating, vibration and reduced efficiency. Sensitive electronic equipment may malfunction due to voltage distortion. Circuit breakers may trip unexpectedly or, conversely, fail to trip when they should.',
  },
  {
    question: 'How do I measure harmonics on site?',
    answer:
      "Harmonics are measured using a power quality analyser (PQA) — a specialised instrument that captures the voltage and current waveforms and performs a Fourier analysis to break them down into their individual harmonic components. The PQA displays the magnitude of each harmonic order, the total harmonic distortion (THD), and often the waveform shape. An oscilloscope can show waveform distortion visually but doesn't quantify individual harmonics. A true-RMS meter will measure the total RMS value correctly but won't identify the harmonic content.",
  },
  {
    question: 'What is the difference between passive and active harmonic filters?',
    answer:
      'A passive harmonic filter consists of tuned LC (inductor-capacitor) circuits designed to provide a low-impedance path for specific harmonic frequencies, diverting them away from the supply. They are relatively inexpensive but only target specific harmonics and can interact with the system impedance, potentially causing resonance problems. An active harmonic filter monitors the load current in real time and injects compensating currents to cancel the harmonics. Active filters are more expensive but more effective, more flexible, and adapt automatically to changing load conditions.',
  },
  {
    question: 'Why do VSDs cause harmonics and what can be done about it?',
    answer:
      'Standard VSDs use a six-pulse diode bridge rectifier on the input that draws current in short, sharp pulses at the peaks of the voltage waveform. This non-sinusoidal current is rich in 5th, 7th, 11th and 13th harmonics. Mitigation options include: input line reactors (chokes) that broaden the current pulses and reduce harmonics by 30-50%; DC link chokes inside the VSD; twelve-pulse or eighteen-pulse rectifier front-ends; active front-end (AFE) drives that draw near-sinusoidal current; and external active harmonic filters. The cost-effectiveness of each solution depends on the drive size and the severity of the harmonic problem.',
  },
];

const MOETModule2Section2_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.2 · Subsection 4"
        title="Frequency and Waveforms"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Understanding harmonics, waveform distortion and their effects on electrical
            maintenance.
          </p>

          <TLDR
            points={[
              '50 Hz UK — one cycle every 20 ms, ω = 314 rad/s.',
              'Harmonics — multiples of 50 Hz caused by non-linear loads.',
              'THD — total harmonic distortion, should be below 8% voltage.',
              'Triplen harmonics — add in the neutral, causing overloading.',
            ]}
          />

          <ConceptBlock title="Common harmonic sources">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>VSDs:</strong> 5th, 7th, 11th, 13th harmonics (6-pulse).
              </li>
              <li>
                <strong>IT equipment:</strong> 3rd harmonic dominant.
              </li>
              <li>
                <strong>LED drivers:</strong> 3rd and 5th harmonics.
              </li>
              <li>
                <strong>UPS systems:</strong> Rectifier input harmonics.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the significance of the 50 Hz UK supply frequency and angular frequency',
              'Define harmonics and identify the dominant harmonic orders from common non-linear loads',
              'Calculate harmonic frequencies and understand the concept of THD',
              'Describe the effects of harmonics on transformers, cables, motors and neutral conductors',
              'Identify harmonic mitigation techniques including passive filters, active filters and multi-pulse rectifiers',
              'Use an oscilloscope to identify waveform distortion and interpret power quality measurements',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Frequency fundamentals</ContentEyebrow>

          <ConceptBlock title="A precisely maintained 50 Hz">
            <p>
              The UK public electricity supply operates at a nominal frequency of 50 Hz — meaning
              the AC waveform completes 50 full cycles every second. This frequency is maintained
              with great precision by National Grid, which continuously balances generation and
              demand to keep the frequency within ±1% of 50 Hz under normal conditions. Frequency is
              a fundamental parameter that affects every AC device and circuit in the installation.
            </p>
            <p>
              The choice of 50 Hz represents a practical engineering compromise. Lower frequencies
              would require larger, heavier transformers and generators. Higher frequencies would
              increase transmission losses due to skin effect and dielectric losses, and would
              increase the reactive effects of cable capacitance. The 50 Hz standard (adopted across
              Europe, most of Asia, Africa and Australasia) provides a good balance between
              equipment size, efficiency and transmission characteristics.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Frequency, period and angular frequency">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Frequency (f):</strong> 50 Hz — 50 complete cycles per second.
              </li>
              <li>
                <strong>Period (T):</strong> T = 1/f = 1/50 = 0.02 s = 20 ms per cycle.
              </li>
              <li>
                <strong>Angular frequency (ω):</strong> ω = 2πf = 2π x 50 = 100π ≈ 314 rad/s.
              </li>
              <li>
                <strong>Half-cycle duration:</strong> T/2 = 10 ms (relevant for RCD disconnection
                times and zero-crossing behaviour).
              </li>
              <li>
                <strong>Worldwide comparison:</strong> USA/Canada use 60 Hz (T = 16.67 ms, ω = 377
                rad/s).
              </li>
            </ul>
          </ConceptBlock>

          <SineWave />

          <ConceptBlock title="Frequency control and grid stability">
            <p>
              Supply frequency is directly related to the rotational speed of generators. When
              demand exceeds generation, generators slow down and frequency drops. When generation
              exceeds demand, generators speed up and frequency rises.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Normal range:</strong> 49.95-50.05 Hz (under tight frequency response).
              </li>
              <li>
                <strong>Operational limits:</strong> 49.5-50.5 Hz (statutory limits under Grid
                Code).
              </li>
              <li>
                <strong>Low frequency demand disconnection (LFDD):</strong> At 48.8 Hz, automatic
                load shedding begins to prevent cascade failure.
              </li>
              <li>
                <strong>Standby generators:</strong> Must synchronise to 50 Hz (voltage, frequency
                and phase) before paralleling with the supply. Auto-synchronising relays are used
                for this purpose.
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> Equipment rated for 50 Hz must not be operated at
              significantly different frequencies. A transformer designed for 50 Hz will draw
              excessive magnetising current and overheat if operated below approximately 47 Hz.
              Motors will run at incorrect speeds if the frequency deviates. VSDs deliberately vary
              frequency to control motor speed — this is a controlled application, not an
              uncontrolled deviation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Harmonics and waveform distortion</ContentEyebrow>

          <ConceptBlock title="Integer multiples of the fundamental">
            <p>
              Harmonics are sinusoidal voltages or currents at frequencies that are integer
              multiples of the fundamental supply frequency (50 Hz). A non-linear load draws current
              that is not proportional to the applied voltage — the resulting current waveform is
              distorted and, by Fourier analysis, can be decomposed into a series of sinusoidal
              components at the fundamental frequency and its harmonics.
            </p>
            <p>
              In an ideal power system, all voltages and currents would be pure sine waves at 50 Hz.
              In practice, the proliferation of electronic loads has made harmonic distortion one of
              the most significant power quality issues in modern installations. Understanding
              harmonics is essential for maintenance technicians because harmonic-related faults are
              increasingly common and can be difficult to diagnose without the appropriate knowledge
              and instruments.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common harmonic orders and their sources">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Harmonic</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Sequence</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Primary Sources</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">3rd</td>
                    <td className="border border-white/10 px-3 py-2">150 Hz</td>
                    <td className="border border-white/10 px-3 py-2">Zero</td>
                    <td className="border border-white/10 px-3 py-2">
                      Switch-mode PSUs, LED drivers, electronic ballasts
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">5th</td>
                    <td className="border border-white/10 px-3 py-2">250 Hz</td>
                    <td className="border border-white/10 px-3 py-2">Negative</td>
                    <td className="border border-white/10 px-3 py-2">
                      VSDs (6-pulse), UPS rectifiers, thyristor drives
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">7th</td>
                    <td className="border border-white/10 px-3 py-2">350 Hz</td>
                    <td className="border border-white/10 px-3 py-2">Positive</td>
                    <td className="border border-white/10 px-3 py-2">
                      VSDs (6-pulse), UPS rectifiers, thyristor drives
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">9th</td>
                    <td className="border border-white/10 px-3 py-2">450 Hz</td>
                    <td className="border border-white/10 px-3 py-2">Zero</td>
                    <td className="border border-white/10 px-3 py-2">
                      Same as 3rd (triplen harmonic)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">11th</td>
                    <td className="border border-white/10 px-3 py-2">550 Hz</td>
                    <td className="border border-white/10 px-3 py-2">Negative</td>
                    <td className="border border-white/10 px-3 py-2">
                      12-pulse rectifiers, large VSDs
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">13th</td>
                    <td className="border border-white/10 px-3 py-2">650 Hz</td>
                    <td className="border border-white/10 px-3 py-2">Positive</td>
                    <td className="border border-white/10 px-3 py-2">
                      12-pulse rectifiers, large VSDs
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Total Harmonic Distortion (THD)">
            <p>
              THD quantifies the overall level of harmonic distortion as a single percentage figure:
            </p>
            <div className="rounded bg-white/5 p-3 text-center font-mono text-sm">
              THD = √(V₂² + V₃² + V₄² + ... + Vₙ²) / V₁ x 100%
            </div>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Voltage THD &lt; 5%:</strong> Generally acceptable for most installations.
              </li>
              <li>
                <strong>Voltage THD 5-8%:</strong> May require investigation — some sensitive
                equipment affected.
              </li>
              <li>
                <strong>Voltage THD &gt; 8%:</strong> Exceeds BS EN 50160 limit — remediation
                recommended.
              </li>
              <li>
                <strong>Current THD:</strong> Can be much higher (30-80% for individual non-linear
                loads). Current distortion causes voltage distortion through the supply impedance.
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> Harmonic sequence determines the effect on three-phase
              systems. Positive sequence harmonics (7th, 13th) create a forward-rotating magnetic
              field. Negative sequence harmonics (5th, 11th) create a backward-rotating field
              (causing motor heating and vibration). Zero sequence harmonics (3rd, 9th) do not
              produce a rotating field but add in the neutral conductor.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Effects of harmonics on electrical systems</ContentEyebrow>

          <ConceptBlock title="Harmonics affect virtually every component">
            <p>
              Harmonics affect virtually every component in an electrical installation. As a
              maintenance technician, you will encounter harmonic-related problems with increasing
              frequency as modern electronic loads proliferate. Recognising the symptoms of harmonic
              distortion is an important fault-finding skill.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Neutral conductor overloading"
            whatHappens={
              <>
                <p>
                  This is the most dangerous harmonic effect in three-phase four-wire systems. Under
                  balanced conditions with linear loads, the neutral current is zero. With
                  non-linear loads, triplen harmonics (3rd, 9th, 15th) from all three phases add
                  arithmetically in the neutral, and neutral current can reach up to 1.73 times the
                  line current. The neutral conductor has no overcurrent protection (it must not be
                  fused in TN systems), and older installations often used reduced-size neutral
                  conductors (50% of line CSA) — the result is neutral conductor overheating,
                  insulation degradation and potential fire.
                </p>
              </>
            }
            doInstead={
              <>
                Size neutral conductors at 100% of line conductor CSA where harmonic currents are
                expected. Apply correction factors from BS 7671 Appendix 4 Table 4C3.
              </>
            }
          />

          <ConceptBlock title="Effects on specific equipment">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Transformers:</strong> Increased eddy current losses (proportional to f²),
                increased hysteresis losses, additional heating. Derate by 10-30% or use K-rated
                transformers. K-factor indicates the transformer&apos;s ability to withstand
                harmonic heating.
              </li>
              <li>
                <strong>Cables:</strong> Increased AC resistance due to skin effect and proximity
                effect at harmonic frequencies. Additional heating. May require derating or
                upsizing. Neutral conductor particularly affected.
              </li>
              <li>
                <strong>Motors:</strong> Negative sequence harmonics (5th, 11th) produce a
                backward-rotating magnetic field, causing additional losses, overheating, vibration,
                noise and reduced efficiency. Motor temperature rise may exceed design limits.
              </li>
              <li>
                <strong>PFC capacitors:</strong> Capacitive reactance decreases with frequency (XC =
                1/2πfC). At harmonic frequencies, capacitors present a low impedance and can absorb
                excessive harmonic currents. Resonance between PFC capacitors and transformer
                inductance can amplify specific harmonics dramatically, causing capacitor
                overheating and failure.
              </li>
              <li>
                <strong>Circuit breakers:</strong> Harmonic currents increase the RMS current
                without a proportional increase in peak current. This can cause thermal tripping
                without magnetic tripping, or conversely, prevent tripping under fault conditions.
              </li>
              <li>
                <strong>Meters and instruments:</strong> Average-responding meters give incorrect
                readings on distorted waveforms. Only true-RMS instruments give accurate
                measurements in the presence of harmonics.
              </li>
            </ul>
            <p>
              <strong>Maintenance tip:</strong> If you encounter unexplained overheating of cables,
              transformers or neutral conductors, or premature failure of PFC capacitors, consider
              harmonics as a possible cause. A simple check is to measure the neutral current in a
              three-phase four-wire circuit — if it is significantly non-zero with a balanced load,
              triplen harmonics are present.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Harmonic mitigation and oscilloscope use</ContentEyebrow>

          <ConceptBlock title="Choosing a mitigation technique">
            <p>
              When harmonics exceed acceptable levels, mitigation measures must be implemented. The
              choice of mitigation technique depends on the harmonic orders present, the severity of
              distortion, the available budget and the installation characteristics. Additionally,
              the oscilloscope is an invaluable tool for visualising waveform distortion and
              diagnosing harmonic-related problems.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Harmonic mitigation techniques">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Line reactors (chokes):</strong> Series inductors that broaden the current
                pulses drawn by rectifiers, reducing harmonic content by 30-50%. Simple,
                inexpensive, robust. Commonly used with VSDs (3-5% impedance reactors).
              </li>
              <li>
                <strong>Passive tuned filters:</strong> LC circuits tuned to specific harmonic
                frequencies (typically 5th and 7th). Provide a low-impedance path for harmonics,
                diverting them away from the supply. Must be carefully designed to avoid resonance
                problems.
              </li>
              <li>
                <strong>Active harmonic filters (AHF):</strong> Electronic devices that inject
                compensating currents in real time to cancel harmonics. The most effective solution
                — can reduce THD to less than 5%. Self-adapting to changing loads. More expensive
                than passive solutions.
              </li>
              <li>
                <strong>Multi-pulse rectifiers:</strong> 12-pulse (eliminates 5th, 7th) or 18-pulse
                (eliminates 5th, 7th, 11th, 13th) rectifier configurations. Require specialised
                transformers. Commonly used in large VSD installations.
              </li>
              <li>
                <strong>Active front-end (AFE) drives:</strong> VSDs with IGBT-based rectifiers that
                draw near-sinusoidal current. Expensive but provide excellent harmonic performance
                and regenerative braking capability.
              </li>
              <li>
                <strong>K-rated transformers:</strong> Designed with enhanced cooling, reduced eddy
                current losses and oversized neutral connections to withstand harmonic heating.
                K-factor ratings: K-4 (light harmonic duty), K-13 (moderate), K-20 (heavy).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Using an oscilloscope for waveform analysis">
            <p>
              An oscilloscope displays voltage (or current) as a function of time, allowing you to
              see the actual shape of the waveform. For maintenance technicians, a portable
              oscilloscope or a multimeter with waveform display is invaluable for diagnosing power
              quality issues.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Flat-topped voltage:</strong> Indicates voltage distortion from non-linear
                loads — the peaks are clipped by the high peak current demand. Very common in
                commercial buildings.
              </li>
              <li>
                <strong>Notched voltage:</strong> V-shaped notches in the waveform caused by
                thyristor commutation in DC drives and controlled rectifiers.
              </li>
              <li>
                <strong>Current spikes:</strong> Sharp, narrow current pulses indicate rectifier
                input current — typical of switch-mode power supplies and basic VSD inputs.
              </li>
              <li>
                <strong>Timebase setting:</strong> For 50 Hz, set the timebase to 5 ms/div to
                display 2-3 complete cycles. Use 2 ms/div for detailed waveform analysis.
              </li>
              <li>
                <strong>Safety:</strong> Always use appropriately rated probes (CAT III or CAT IV
                for distribution work). Use differential probes for phase-to-phase measurements.
                Never connect the oscilloscope earth lead to a live conductor.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Maintenance of harmonic filters">
            <p>
              Harmonic filters require regular maintenance to ensure continued effectiveness.
              Passive filter capacitors degrade over time and should be thermographically surveyed
              annually. Check for signs of swelling, leaking dielectric, or discolouration. Measure
              the capacitance and compare to the rated value — a decrease of more than 5% indicates
              degradation. Active harmonic filters should have their performance verified using a
              power quality analyser quarterly. Check that the THD at the point of common coupling
              (PCC) remains within acceptable limits. Keep firmware updated and maintain adequate
              cooling for the power electronics.
            </p>
            <p>
              <strong>ST1426 link:</strong> The maintenance technician standard requires an
              understanding of power quality issues including harmonics, their causes and effects.
              The ability to identify harmonic distortion using appropriate instruments and
              recommend mitigation measures is an increasingly important maintenance competency.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Equipment rated for 50 Hz must not be operated at significantly different frequencies — a transformer will overheat below approximately 47 Hz.',
              'Positive sequence harmonics (7th, 13th) create a forward-rotating field; negative sequence (5th, 11th) create a backward-rotating field; zero sequence (3rd, 9th) do not rotate but add in the neutral.',
              'Size neutral conductors at 100% of line conductor CSA where harmonic currents are expected — triplen harmonics can push neutral current to 1.73 times the line current.',
              'If you encounter unexplained overheating of cables, transformers or neutral conductors, or premature PFC capacitor failure, consider harmonics as a possible cause.',
              'The ability to identify harmonic distortion using appropriate instruments and recommend mitigation measures is an increasingly important maintenance competency.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge — Frequency and Waveforms" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section2-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Single-Phase vs Three-Phase Systems
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section2-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Reactance, Impedance and Power Factor
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section2_4;
