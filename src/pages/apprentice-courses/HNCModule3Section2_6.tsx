/**
 * Module 3 · Section 2 · Subsection 6 — Resonance in RLC Circuits and Practical Issues
 * HNC Electrical Engineering for Building Services (Pearson U4019 — Electrical & Electronic Principles)
 *   What happens when X_L = X_C — useful in tuned filters, dangerous in unintentional
 *   PFC-vs-supply-impedance resonance with harmonic-rich loads.
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

const TITLE = 'Resonance in RLC Circuits and Practical Issues - HNC Module 3 Section 2.6';
const DESCRIPTION =
  'Master resonance phenomena in RLC circuits for building services: series and parallel resonance, quality factor Q, bandwidth, voltage and current magnification, capacitor switching transients, and harmonic resonance problems with PFC capacitors.';

const quickCheckQuestions = [
  {
    id: 'resonant-frequency',
    question: 'What is the resonant frequency of a circuit with L = 10mH and C = 100uF?',
    options: ['15.9 Hz', '50 Hz', '159 Hz', '500 Hz'],
    correctIndex: 2,
    explanation:
      'Using f0 = 1/(2pi x sqrt(LC)): f0 = 1/(2pi x sqrt(0.01 x 0.0001)) = 1/(2pi x 0.001) = 159 Hz. This is where XL = XC and the circuit is at resonance.',
  },
  {
    id: 'series-resonance-impedance',
    question: 'At resonance in a series RLC circuit, the impedance equals:',
    options: ['Zero', 'R only', 'XL + XC', 'Maximum value'],
    correctIndex: 1,
    explanation:
      'At series resonance, XL = XC and they cancel out (being 180 degrees out of phase), leaving only the resistance R. This gives minimum impedance and maximum current.',
  },
  {
    id: 'quality-factor',
    question:
      'A series RLC circuit has XL = 500 ohms at resonance and R = 10 ohms. What is the Q factor?',
    options: ['5', '50', '500', '5000'],
    correctIndex: 1,
    explanation:
      'Q = XL/R = 500/10 = 50. This high Q factor means the voltage across L or C will be 50 times the supply voltage at resonance - a significant magnification.',
  },
  {
    id: 'harmonic-resonance',
    question:
      'PFC capacitors are most at risk of failure when the system resonant frequency coincides with which harmonic?',
    options: ['Fundamental (50 Hz)', '3rd harmonic', '5th or 7th harmonic', '11th harmonic'],
    correctIndex: 2,
    explanation:
      'The 5th (250 Hz) and 7th (350 Hz) harmonics are typically the strongest in non-linear loads. If PFC capacitors tune the system to resonate at these frequencies, severe overcurrents and capacitor failure can result.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the formula for resonant frequency in an LC circuit?',
    options: ['f0 = 2pi x sqrt(LC)', 'f0 = 1/(2pi x sqrt(LC))', 'f0 = LC/(2pi)', 'f0 = sqrt(L/C)'],
    correctAnswer: 1,
    explanation:
      'The resonant frequency f0 = 1/(2pi x sqrt(LC)). At this frequency, the inductive reactance equals the capacitive reactance (XL = XC), creating resonance.',
  },
  {
    id: 2,
    question: 'In a series RLC circuit at resonance, what happens to the current?',
    options: [
      'Current is minimum',
      'Current is maximum',
      'Current is zero',
      'Current equals the voltage',
    ],
    correctAnswer: 1,
    explanation:
      "At series resonance, impedance is minimum (Z = R only), so current reaches its maximum value. This is why series resonance is sometimes called 'acceptor' resonance.",
  },
  {
    id: 3,
    question: 'What is the dynamic impedance of a parallel resonant circuit?',
    options: ['Zd = R', 'Zd = L/(CR)', 'Zd = LC/R', 'Zd = R/(LC)'],
    correctAnswer: 1,
    explanation:
      "The dynamic impedance Zd = L/(CR) represents the very high impedance at parallel resonance. For practical circuits, this can be several kilohms, making parallel resonance a 'rejector' circuit.",
  },
  {
    id: 4,
    question: 'A circuit has Q = 25 and resonant frequency 200 Hz. What is the bandwidth?',
    options: ['5 Hz', '8 Hz', '25 Hz', '50 Hz'],
    correctAnswer: 1,
    explanation:
      'Bandwidth B = f0/Q = 200/25 = 8 Hz. The bandwidth extends from f1 to f2 where the response falls to 0.707 (-3dB) of its maximum value.',
  },
  {
    id: 5,
    question:
      'In a series resonant circuit with Q = 30 and supply voltage 230V, what is the voltage across the capacitor at resonance?',
    options: ['230V', '2300V', '6900V', '7.67V'],
    correctAnswer: 2,
    explanation:
      'At series resonance, VC = Q x VS = 30 x 230 = 6900V. This voltage magnification is why series resonance can be dangerous in power systems.',
  },
  {
    id: 6,
    question: 'What characterises parallel resonance in a practical circuit?',
    options: [
      'Maximum current from supply',
      'Minimum impedance',
      'Minimum current from supply (maximum impedance)',
      'Unity power factor',
    ],
    correctAnswer: 2,
    explanation:
      'Parallel resonance gives maximum impedance and minimum supply current. The circulating current between L and C can be Q times larger than the supply current.',
  },
  {
    id: 7,
    question: 'Why are detuning reactors used with PFC capacitor banks?',
    options: [
      'To increase power factor',
      'To reduce harmonic currents',
      'To prevent harmonic resonance by shifting the resonant frequency below dominant harmonics',
      'To increase the capacitance',
    ],
    correctAnswer: 2,
    explanation:
      'Detuning reactors (typically 7% or 14% of capacitor reactance) shift the system resonant frequency below the 5th harmonic (250 Hz), preventing dangerous amplification of harmonic currents.',
  },
  {
    id: 8,
    question:
      'When capacitors are switched onto a supply, what causes the inrush current transient?',
    options: [
      'Power factor correction',
      'The capacitor charging through low source impedance with minimal damping',
      'Magnetic saturation',
      'Thermal effects',
    ],
    correctAnswer: 1,
    explanation:
      'The discharged capacitor acts as a short circuit initially, drawing high inrush current limited only by source impedance. Peak currents can be 20-30 times rated current without pre-insertion resistors.',
  },
  {
    id: 9,
    question: 'What is the relationship between Q factor and selectivity in a resonant circuit?',
    options: [
      'Higher Q means broader bandwidth',
      'Higher Q means sharper (narrower) frequency response',
      'Q has no effect on selectivity',
      'Lower Q means sharper frequency response',
    ],
    correctAnswer: 1,
    explanation:
      'Higher Q means narrower bandwidth (B = f0/Q), giving sharper frequency selectivity. In power systems, this means harmonic currents within a narrow band are heavily amplified.',
  },
  {
    id: 10,
    question:
      'A 400V three-phase system has 200 kVAr PFC capacitors and transformer inductance creating a resonant frequency of 350 Hz. What is the risk?',
    options: [
      'No risk - 350 Hz is above supply frequency',
      'The system may resonate with 7th harmonic (350 Hz) causing capacitor overload',
      'The capacitors will improve power factor more efficiently',
      'Only a risk at fundamental frequency',
    ],
    correctAnswer: 1,
    explanation:
      '350 Hz is exactly the 7th harmonic (7 x 50 Hz). VSD drives and non-linear loads generate significant 7th harmonic current, which will be amplified by resonance, potentially destroying the capacitors.',
  },
  {
    id: 11,
    question: 'What is the half-power bandwidth of a resonant circuit?',
    options: [
      'The frequency range where power is maximum',
      'The frequency range between -3dB points (f2 - f1)',
      'Half the resonant frequency',
      'The frequency where Q = 0.5',
    ],
    correctAnswer: 1,
    explanation:
      'The half-power bandwidth is the frequency range between the points where power falls to half its maximum value (-3dB). These are the frequencies where current/voltage is 0.707 of maximum.',
  },
  {
    id: 12,
    question:
      'In building services, which scenario most commonly leads to harmonic resonance problems?',
    options: [
      'Installing LED lighting',
      'Adding PFC capacitors to systems with VSD drives',
      'Using resistive heating loads',
      'Operating at unity power factor',
    ],
    correctAnswer: 1,
    explanation:
      'VSD drives generate significant 5th and 7th harmonics. Adding PFC capacitors can tune the system to resonate at these frequencies, causing severe harmonic current amplification and capacitor failure.',
  },
];

const faqs = [
  {
    question: 'Why does resonance only occur at one specific frequency?',
    answer:
      'Resonance occurs when XL = XC. Since XL = 2(pi)fL (increases with frequency) and XC = 1/(2(pi)fC) (decreases with frequency), they can only be equal at one frequency: f0 = 1/(2(pi)(sqrt)LC). Above this frequency XL > XC (inductive), below it XL < XC (capacitive).',
  },
  {
    question: 'What is the difference between series and parallel resonance effects?',
    answer:
      'Series resonance gives minimum impedance and maximum current (acceptor circuit) - dangerous for power systems as it amplifies currents. Parallel resonance gives maximum impedance and minimum supply current (rejector circuit) - the circulating current between L and C can be very high even though supply current is low.',
  },
  {
    question: 'How do I know if my PFC installation is at risk of harmonic resonance?',
    answer:
      'Calculate the system resonant frequency: fr = f1 x sqrt(Ssc/Qc) where Ssc is the short-circuit power and Qc is the capacitor kVAr. If fr is close to 250 Hz (5th), 350 Hz (7th), or 550 Hz (11th), resonance risk exists. Use detuned capacitors or harmonic filters if VSD drives or non-linear loads are present.',
  },
  {
    question: 'Why do capacitor banks sometimes explode or fail prematurely?',
    answer:
      'Harmonic resonance amplifies harmonic currents through the capacitors, causing overheating. The capacitor dielectric is also stressed by high peak voltages. Additionally, capacitor switching transients create high inrush currents that stress the dielectric. These combined effects lead to premature ageing and potentially catastrophic failure.',
  },
  {
    question: 'What is a detuning reactor and how does it prevent resonance?',
    answer:
      'A detuning reactor is an inductor connected in series with PFC capacitors, typically sized at 7% or 14% of the capacitor reactance. This shifts the system resonant frequency below 200 Hz (below the 4th harmonic), ensuring no resonance with common harmonics (5th, 7th, 11th). The 7% reactor detunes to approximately 189 Hz, the 14% reactor to approximately 134 Hz.',
  },
  {
    question: 'How does Q factor affect the danger of resonance in power systems?',
    answer:
      'Higher Q means sharper resonance with greater current/voltage amplification. Power systems typically have Q values of 10-50. At Q = 30, harmonic currents at resonance are amplified 30 times, and voltages can reach 30 times the harmonic voltage. Lower resistance (higher Q) makes resonance more severe.',
  },
];

const HNCModule3Section2_6 = () => {
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
            eyebrow="Module 3 · Section 2 · Subsection 6"
            title="Resonance in RLC Circuits and Practical Issues"
            description="Understanding resonance phenomena and avoiding dangerous conditions in building electrical systems"
            tone="purple"
          />

          <TLDR
            points={[
              'You can compute the resonant frequency f₀ = 1 / (2π√(LC)) of any RLC network and explain why X_L = X_C at that point.',
              'You can describe series resonance (Z minimum, current peak) and parallel resonance (Z maximum, current minimum) and apply each in tuned filters.',
              'You can quantify the quality factor Q = ω₀L / R = 1 / (ω₀CR) and use it to predict bandwidth and the sharpness of the response.',
              'You can spot the risk of unintentional resonance between an under-detuned PFC capacitor bank and the supply transformer reactance, especially in the presence of 5th and 7th harmonics from VFDs.',
              'You can use resonance principles when specifying detuning reactors (BS EN 61921) and harmonic filters on a building services switchboard.',
            ]}
          />

          <RegsCallout
            source="IEEE 519 — Recommended Practice for Harmonic Control in Electric Power Systems"
            clause="Total voltage harmonic distortion (V_THD) at the point of common coupling shall not exceed 5 % for general industrial and commercial systems, and individual harmonic limits apply by harmonic order. Capacitor installations shall be designed with sufficient margin against series and parallel resonance with system impedance."
            meaning={
              <>
                IEEE 519 is the international reference for harmonic limits at the point of
                common coupling. The capacitor-resonance clause is exactly why building
                services PFC banks are detuned — a plain capacitor on a system with
                meaningful harmonic content can resonate with the supply impedance, push
                THD beyond 5 % and cook the capacitors.
              </>
            }
            cite="Source: IEEE Std 519 (latest edition); BS EN 61000-3-2 / -3-12 for emission limits."
          />

          <LearningOutcomes
            outcomes={[
              'Calculate resonant frequency using f0 = 1/(2pi x sqrt(LC))',
              'Distinguish between series and parallel resonance effects',
              'Apply Q factor to determine bandwidth and magnification',
              'Understand voltage magnification dangers in series resonance',
              'Analyse harmonic resonance risks with PFC capacitors',
              'Specify detuning reactors to avoid resonance problems',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="Resonance happens when XL = XC; series resonance amplifies voltage, parallel amplifies circulating current."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Resonant frequency:</strong> f0 = 1/(2pi x sqrt(LC)) where XL = XC
              </li>
              <li>
                <strong>Series resonance:</strong> Minimum impedance, maximum current
              </li>
              <li>
                <strong>Parallel resonance:</strong> Maximum impedance, minimum current
              </li>
              <li>
                <strong>Q factor:</strong> Determines sharpness and magnification
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PFC hazards:</strong> Harmonic resonance with capacitor banks
              </li>
              <li>
                <strong>VSD drives:</strong> Generate harmonics that excite resonance
              </li>
              <li>
                <strong>Detuning reactors:</strong> Prevent dangerous resonance
              </li>
              <li>
                <strong>Switching transients:</strong> Capacitor inrush protection
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Series Resonance - The Acceptor Circuit">
            <p>
              Series resonance occurs when a resistor, inductor, and capacitor are connected in
              series and the supply frequency matches the circuit's natural resonant frequency. At
              resonance, the inductive and capacitive reactances are equal and opposite, leaving
              only resistance to limit current.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">The Resonant Frequency Formula</p>
            <p>
              f<sub>0</sub> = 1 / (2pi x sqrt(LC)) — Where L is inductance (H) and C is capacitance (F)
            </p>
            <p className="text-sm font-medium text-white">At series resonance:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>XL = XC</strong> - Reactances are equal and cancel</li>
              <li><strong>Z = R</strong> - Impedance is minimum (purely resistive)</li>
              <li><strong>I = V/R</strong> - Current is maximum</li>
              <li><strong>Phase angle = 0 degrees</strong> - Voltage and current in phase (unity pf)</li>
              <li><strong>VL = VC</strong> - Equal voltages across L and C (but 180 degrees opposed)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Series Resonance Characteristics
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Below resonance:</strong> Capacitive (XC &gt; XL). Impedance higher than R. Current less than maximum. Current leads voltage.
              </li>
              <li>
                <strong>At resonance:</strong> Resistive (XL = XC). Impedance minimum = R. Current maximum = V/R. Phase angle 0 degrees (in phase).
              </li>
              <li>
                <strong>Above resonance:</strong> Inductive (XL &gt; XC). Impedance higher than R. Current less than maximum. Current lags voltage.
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Critical Warning: Voltage Magnification
            </p>
            <p>
              At series resonance, the voltage across the inductor or capacitor can be many times
              greater than the supply voltage: <strong>VL = VC = Q x VS</strong>. With Q factors
              of 20-50 common in power circuits, a 230V supply can create over 10,000V across
              components, causing insulation breakdown and catastrophic failure.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Series resonance is called the "acceptor" circuit because
              at resonance it readily accepts current (minimum opposition). This makes it dangerous
              in power systems where harmonic currents can be greatly amplified.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Parallel Resonance and Quality Factor">
            <p>
              Parallel resonance occurs when an inductor and capacitor are connected in parallel. At
              resonance, the circuit presents maximum impedance to the supply, drawing minimum
              current. However, a large circulating current flows between the inductor and capacitor
              internally.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Dynamic Impedance (Parallel Resonance)
            </p>
            <p>
              Z<sub>d</sub> = L / (CR) — Where R is the coil resistance (the capacitor is assumed ideal)
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Parallel Resonance Characteristics
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Impedance is maximum (Zd)</li>
              <li>Supply current is minimum</li>
              <li>Power factor is unity</li>
              <li>Circulating current = Q x supply current</li>
              <li>Also called "rejector" circuit</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Practical Values</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Zd can reach several kilohms</li>
              <li>Power system Q: typically 10-50</li>
              <li>Radio frequency Q: can exceed 100</li>
              <li>Higher Q = sharper resonance</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Quality Factor (Q)</p>
            <p>
              The quality factor Q indicates how "sharp" or selective the resonance is. Higher Q
              means narrower bandwidth and greater magnification of voltages or currents at
              resonance.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>From reactance:</strong> Q = XL/R = XC/R — At resonance (XL = XC)
              </li>
              <li>
                <strong>From L and C:</strong> Q = (1/R) x sqrt(L/C) — Component values known
              </li>
              <li>
                <strong>From resonance:</strong> Q = omega0 x L/R = 1/(omega0 x CR) — Angular frequency known
              </li>
              <li>
                <strong>From bandwidth:</strong> Q = f0/B — Bandwidth measured
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Bandwidth and Selectivity</p>
            <p>
              Bandwidth B = f<sub>0</sub>/Q = f<sub>2</sub> - f<sub>1</sub> — Where f1 and f2 are the half-power (-3dB) frequencies
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Q = 10:</strong> B = 5 Hz (at 50 Hz)</li>
              <li><strong>Q = 25:</strong> B = 2 Hz (at 50 Hz)</li>
              <li><strong>Q = 50:</strong> B = 1 Hz (at 50 Hz)</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Design insight:</strong> High Q circuits are more selective but also more
              dangerous - they amplify signals within a very narrow frequency band by a very large
              factor. In power systems, we generally want lower Q to reduce the risk of severe
              resonance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Voltage and Current Magnification">
            <p>
              One of the most important and potentially dangerous aspects of resonance is
              magnification. At resonance, voltages or currents within the circuit can be many times
              larger than the source values - a critical consideration for power system design.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Series Resonance: Voltage Magnification
            </p>
            <p>
              V<sub>L</sub> = V<sub>C</sub> = Q x V<sub>S</sub> — Voltage across L or C is Q times supply voltage
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Parallel Resonance: Current Magnification
            </p>
            <p>
              I<sub>L</sub> = I<sub>C</sub> = Q x I<sub>S</sub> — Circulating current is Q times supply current
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Magnification Examples</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Q = 10, supply 230V:</strong> Component voltage 2,300V — Moderate risk</li>
              <li><strong>Q = 25, supply 230V:</strong> Component voltage 5,750V — High risk</li>
              <li><strong>Q = 50, supply 230V:</strong> Component voltage 11,500V — Extreme risk</li>
              <li><strong>Q = 30, supply 400V (3-ph):</strong> Component voltage 12,000V — Extreme risk</li>
            </ul>
            <p className="text-sm font-medium text-white">
              Why magnification is dangerous in power systems:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Insulation breakdown:</strong> Component voltages exceed design ratings
              </li>
              <li>
                <strong>Capacitor failure:</strong> Dielectric stress causes premature ageing or
                explosion
              </li>
              <li>
                <strong>Overcurrent:</strong> Harmonic currents amplified beyond conductor ratings
              </li>
              <li>
                <strong>Heating:</strong> I squared R losses increase dramatically at elevated
                currents
              </li>
              <li>
                <strong>Protection maloperation:</strong> Unexpected tripping or failure to trip
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Harmonic Magnification</p>
            <p>
              When a system resonates at a harmonic frequency, that specific harmonic is amplified
              by the Q factor. A 5th harmonic voltage of just 5V could become 5V x 30 = 150V if Q
              = 30. This adds to the fundamental, distorting the waveform and stressing equipment.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>Critical point:</strong> Always check if the system resonant frequency
              coincides with any significant harmonic present in the installation. Even small
              harmonic sources can cause major problems when amplified by resonance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Practical Resonance Issues in Building Services">
            <p>
              Building electrical systems face several resonance-related challenges, particularly
              where power factor correction capacitors interact with transformer and cable
              inductance in the presence of harmonic-producing loads like VSD drives and LED
              drivers.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              System Resonant Frequency Calculation
            </p>
            <p>
              f<sub>r</sub> = f<sub>1</sub> x sqrt(S<sub>sc</sub> / Q<sub>c</sub>) — Where f1 = 50 Hz, Ssc = short-circuit power (MVA), Qc = capacitor rating (MVAr)
            </p>
            <p>
              <strong>Example:</strong> With Ssc = 25 MVA and Qc = 0.5 MVAr: fr = 50 x
              sqrt(25/0.5) = 50 x sqrt(50) = 50 x 7.07 = <strong>354 Hz</strong> (near 7th
              harmonic!)
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Common Harmonic Sources in Buildings
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>VSD drives (6-pulse):</strong> 5th, 7th, 11th, 13th — 250, 350, 550, 650 Hz
              </li>
              <li>
                <strong>UPS systems:</strong> 5th, 7th, 11th — 250, 350, 550 Hz
              </li>
              <li>
                <strong>LED drivers:</strong> 3rd, 5th, 7th — 150, 250, 350 Hz
              </li>
              <li>
                <strong>Computer loads:</strong> 3rd, 5th — 150, 250 Hz
              </li>
              <li>
                <strong>Fluorescent lighting:</strong> 3rd — 150 Hz
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Capacitor Switching Transients
            </p>
            <p>
              Switching PFC capacitors onto a supply creates severe transient conditions that can
              damage equipment and disturb sensitive loads.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inrush current:</strong> Can reach 20-30x rated current without limiting
              </li>
              <li>
                <strong>Voltage transients:</strong> Up to 2x peak voltage on energisation
              </li>
              <li>
                <strong>Back-to-back switching:</strong> Even worse when switching with other
                capacitors online
              </li>
              <li>
                <strong>High frequency oscillation:</strong> kHz-range transients stress
                insulation
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Solutions: Detuning Reactors
            </p>
            <p>
              Detuning reactors prevent harmonic resonance by shifting the system resonant
              frequency below the lowest significant harmonic.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>7% reactor:</strong> Tuning frequency 189 Hz (3.78th) — Standard, below 5th harmonic
              </li>
              <li>
                <strong>14% reactor:</strong> Tuning frequency 134 Hz (2.68th) — Heavy harmonics, below 3rd
              </li>
              <li>
                <strong>5.67% reactor:</strong> Tuning frequency 210 Hz (4.2th) — Low harmonics, just below 5th
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              When to Use Detuned Capacitors
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>VSD drives exceed 20% of transformer capacity</li>
              <li>Total harmonic distortion (THD) exceeds 5%</li>
              <li>LED lighting forms a significant load</li>
              <li>UPS systems or data centre loads present</li>
              <li>Previous capacitor failures or nuisance tripping</li>
              <li>Capacitor bank total exceeds 30% of transformer kVA</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Real-World Failure Scenario</p>
            <p>
              A commercial building installed 150 kVAr of standard (non-detuned) PFC capacitors.
              With VSD drives on the HVAC system, the 5th harmonic current was amplified by
              resonance. Within 6 months, all capacitors failed due to overheating. The solution
              required detuned capacitors with 7% reactors, at 40% higher cost but with reliable
              operation thereafter.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Always conduct a harmonic study before installing PFC
              capacitors in buildings with significant non-linear loads. The cost of detuned
              capacitors is far less than the cost of failures and replacements.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 1: Series Resonant Frequency
            </p>
            <p>
              <strong>Question:</strong> Calculate the resonant frequency of a series circuit with
              L = 50mH and C = 20uF. Also determine the Q factor if R = 5 ohms.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Calculate resonant frequency</li>
              <li>f0 = 1/(2pi x sqrt(LC))</li>
              <li>f0 = 1/(2pi x sqrt(0.05 x 0.00002))</li>
              <li>f0 = 1/(2pi x sqrt(0.000001))</li>
              <li>f0 = 1/(2pi x 0.001) = 1/0.00628</li>
              <li>f0 = <strong>159.2 Hz</strong></li>
              <li>Step 2: Calculate XL at resonance</li>
              <li>XL = 2pi x f0 x L = 2pi x 159.2 x 0.05 = <strong>50 ohms</strong></li>
              <li>Step 3: Calculate Q factor</li>
              <li>Q = XL/R = 50/5 = <strong>Q = 10</strong></li>
              <li>Bandwidth B = f0/Q = 159.2/10 = 15.9 Hz</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 2: Voltage Magnification
            </p>
            <p>
              <strong>Question:</strong> A series RLC circuit has Q = 25 and is connected to a
              230V supply at resonance. Calculate the voltage across the capacitor and assess the
              risk.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Voltage magnification at resonance:</li>
              <li>VC = Q x VS</li>
              <li>VC = 25 x 230V</li>
              <li>VC = <strong>5,750V</strong></li>
              <li>Assessment:</li>
              <li>- This voltage far exceeds LV ratings</li>
              <li>- Standard capacitors rated 400-450V would fail</li>
              <li>- Insulation breakdown likely</li>
              <li>EXTREME RISK - resonance must be avoided</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 3: System Resonance with PFC
            </p>
            <p>
              <strong>Question:</strong> A 1000 kVA transformer has Uk = 6% and supplies 200 kVAr
              of PFC capacitors. Calculate the system resonant frequency and assess the risk.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Calculate short-circuit power</li>
              <li>Ssc = S x (100/Uk%) = 1000 x (100/6)</li>
              <li>Ssc = <strong>16,667 kVA = 16.67 MVA</strong></li>
              <li>Step 2: Calculate resonant frequency</li>
              <li>fr = f1 x sqrt(Ssc/Qc)</li>
              <li>fr = 50 x sqrt(16667/200)</li>
              <li>fr = 50 x sqrt(83.3) = 50 x 9.13</li>
              <li>fr = <strong>456 Hz</strong></li>
              <li>Step 3: Assess harmonic risk</li>
              <li>456 Hz / 50 Hz = 9.1 (near 9th harmonic)</li>
              <li>MODERATE RISK - 9th harmonic is less common</li>
              <li>but if VSD drives present, use detuned capacitors</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 4: Detuning Reactor Sizing
            </p>
            <p>
              <strong>Question:</strong> A 100 kVAr capacitor bank operates at 400V. Size a 7%
              detuning reactor and verify the tuning frequency.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Calculate capacitor current</li>
              <li>IC = Qc/(sqrt(3) x V) = 100,000/(1.732 x 400)</li>
              <li>IC = <strong>144.3 A</strong></li>
              <li>Step 2: Calculate capacitive reactance</li>
              <li>XC = V/(sqrt(3) x IC) = 400/(1.732 x 144.3)</li>
              <li>XC = <strong>1.60 ohms per phase</strong></li>
              <li>Step 3: Calculate reactor reactance (7%)</li>
              <li>XL = 0.07 x XC = 0.07 x 1.60</li>
              <li>XL = <strong>0.112 ohms</strong></li>
              <li>Step 4: Verify tuning frequency</li>
              <li>Tuning factor p = sqrt(XL/XC) = sqrt(0.07) = 0.265</li>
              <li>fr = f1/p = 50/0.265 = <strong>189 Hz</strong></li>
              <li>Safely below 5th harmonic (250 Hz)</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>f0 = 1/(2pi x sqrt(LC))</strong> - Resonant frequency</li>
              <li><strong>Q = XL/R = XC/R</strong> - Quality factor</li>
              <li><strong>B = f0/Q</strong> - Bandwidth</li>
              <li><strong>VL = VC = Q x VS</strong> - Series voltage magnification</li>
              <li><strong>Zd = L/(CR)</strong> - Parallel dynamic impedance</li>
              <li><strong>fr = f1 x sqrt(Ssc/Qc)</strong> - System resonant frequency</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Values to Remember</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>5th harmonic: <strong>250 Hz</strong> (most common)</li>
              <li>7th harmonic: <strong>350 Hz</strong> (significant with VSDs)</li>
              <li>7% reactor tunes to: <strong>189 Hz</strong></li>
              <li>14% reactor tunes to: <strong>134 Hz</strong></li>
              <li>Power system Q: typically <strong>10-50</strong></li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              PFC Capacitor Selection Guidelines
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Standard capacitors:</strong> Only for linear loads (resistive heating, incandescent)
              </li>
              <li>
                <strong>7% detuned:</strong> VSDs less than 40% of load, moderate harmonics
              </li>
              <li>
                <strong>14% detuned:</strong> VSDs greater than 40% of load, high harmonics, LED lighting
              </li>
              <li>
                <strong>Active filters:</strong> Very high harmonic content, strict THD limits
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common resonance mistakes"
            whatHappens={
              <>
                Installing standard PFC with VSD loads creates harmonic resonance risk. Ignoring
                harmonic assessment before PFC installation. Undersizing detuning reactors so they
                cannot handle harmonic currents. Wrong units in calculations (L in Henrys, C in
                Farads). Forgetting capacitor voltage rating must be higher with detuning.
              </>
            }
            doInstead={
              <>
                Always conduct a harmonic study before specifying PFC. Use 7% or 14% detuned
                reactors when VSDs or significant non-linear loads are present. Size detuning
                reactors for full harmonic current spectrum. Convert all units to base SI for
                resonance calculations. Specify capacitors with uplifted voltage rating to suit
                the detuning factor.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Diagnosing capacitor failures on a PFC bank in a VFD-rich workshop"
            situation={
              <>
                A workshop with eight 22 kW VFD-driven extract fans has a 200 kVAr plain
                capacitor bank that has failed twice in 18 months — swollen cans, blown
                in-line fuses, evidence of sustained over-current on the bank ammeter. The
                supply impedance and the bank capacitance happen to resonate near the 5th
                harmonic (250 Hz) of the 50 Hz supply.
              </>
            }
            whatToDo={
              <>
                Compute the system resonant frequency: f₀ = 1 / (2π√(L_supply
                × C_bank)). If f₀ sits at or near 250 Hz (5th) or 350 Hz (7th), the
                supply impedance and the bank are forming a parallel resonant circuit that
                amplifies the harmonic current pulled from the VFDs into the capacitors.
                Replace the bank with a detuned bank to BS EN 61921 — typically 7 %
                series reactor (tunes around 134 Hz, well below 250 Hz) so the bank looks
                inductive at the harmonic frequencies and presents low impedance only at the
                fundamental 50 Hz. Re-measure THD and capacitor current after commissioning;
                expect both to drop sharply.
              </>
            }
            whyItMatters={
              <>
                Unintentional resonance is the classic mistake when adding bulk PFC to a
                modern non-linear load. Knowing the resonance theory (X_L = X_C at f₀)
                turns a mysterious recurring fault into an obvious design defect with a
                standard fix.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Resonance occurs when X_L = X_C — reactive components cancel and impedance is determined by R alone.',
              'Resonant frequency: f₀ = 1 / (2π√(LC)). Above f₀ the circuit is inductive; below f₀ it is capacitive.',
              'Series resonance: Z minimum, current maximum, voltage across L and C can far exceed source voltage — used in series tuned filters.',
              'Parallel resonance: Z maximum, current minimum, circulating current between L and C can far exceed line current — the mechanism behind unintentional PFC resonance.',
              'Quality factor Q = X_L / R = X_C / R — high Q means narrow bandwidth and sharp resonance; low Q means broad response.',
              'Bandwidth BW = f₀ / Q — the frequency span between the two −3 dB points.',
              'The classic building services hazard: plain PFC bank + supply impedance + 5th-harmonic VFD current = unintentional parallel resonance → capacitor failure.',
              'Mitigation: detuning reactors per BS EN 61921 push the resonant frequency below the harmonic spectrum, protecting the bank and limiting THD to the IEEE 519 5 % target.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section2-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Power Factor Correction
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section2-7')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                AC Circuit Analysis
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section2_6;
