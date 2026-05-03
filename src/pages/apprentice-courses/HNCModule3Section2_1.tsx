/**
 * Module 3 · Section 2 · Subsection 1 — Principles of Inductance and Capacitance
 * HNC Electrical Engineering for Building Services (Pearson U4019 — Electrical & Electronic Principles)
 *   The two reactive elements that show up everywhere on a building services job — motor
 *   windings, transformers, lighting drivers, PFC capacitor banks and surge-protection devices.
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

const TITLE = 'Principles of Inductance and Capacitance - HNC Module 3 Section 2.1';
const DESCRIPTION =
  'Master electromagnetic induction, self and mutual inductance, capacitance principles and energy storage for building services: motor windings, power factor correction, lighting ballasts.';

const quickCheckQuestions = [
  {
    id: 'induced-emf',
    question: "According to Faraday's law, what induces an EMF in a coil?",
    options: [
      'Constant magnetic flux',
      'Changing magnetic flux',
      'Electric current alone',
      'Static magnetic field',
    ],
    correctIndex: 1,
    explanation:
      "Faraday's law states that an EMF is induced when the magnetic flux linking a coil changes. The rate of change of flux determines the magnitude of the induced EMF: e = -N(dPhi/dt).",
  },
  {
    id: 'inductance-formula',
    question: 'What is the unit of inductance?',
    options: ['Farad', 'Ohm', 'Henry', 'Weber'],
    correctIndex: 2,
    explanation:
      'Inductance is measured in Henrys (H), named after Joseph Henry. 1 Henry means that a current change of 1 A/s induces an EMF of 1 Volt in the coil.',
  },
  {
    id: 'capacitance-increase',
    question: 'How can the capacitance of a parallel plate capacitor be increased?',
    options: [
      'Increase plate separation',
      'Decrease plate area',
      'Use a higher permittivity dielectric',
      'Reduce the dielectric constant',
    ],
    correctIndex: 2,
    explanation:
      'Capacitance C = epsilon A/d. Increasing the dielectric permittivity (epsilon), increasing plate area (A), or decreasing separation (d) all increase capacitance.',
  },
  {
    id: 'energy-inductor',
    question: 'An inductor of 0.5H carries 4A. What energy is stored?',
    options: ['1J', '2J', '4J', '8J'],
    correctIndex: 2,
    explanation:
      'Energy stored in an inductor E = 1/2 LI squared = 1/2 x 0.5 x 4 squared = 1/2 x 0.5 x 16 = 4J. The energy increases with the square of current.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is electromagnetic induction?',
    options: [
      'The production of current flow by constant magnetic field',
      'The production of EMF by changing magnetic flux',
      'The alignment of magnetic domains in iron',
      'The heating effect of electric current',
    ],
    correctAnswer: 1,
    explanation:
      'Electromagnetic induction is the production of an electromotive force (EMF) across a conductor when it is exposed to a changing magnetic flux. This is the principle behind generators, transformers, and inductors.',
  },
  {
    id: 2,
    question: "Lenz's law states that the direction of induced EMF always:",
    options: [
      'Assists the change producing it',
      'Is perpendicular to the magnetic field',
      'Opposes the change producing it',
      'Is parallel to the current flow',
    ],
    correctAnswer: 2,
    explanation:
      "Lenz's law states that the induced EMF opposes the change in flux that produces it. This is why the formula includes a negative sign: e = -N(dPhi/dt). This opposition is fundamental to energy conservation.",
  },
  {
    id: 3,
    question:
      'A coil with 500 turns has a flux of 20mWb passing through it. What is the flux linkage?',
    options: ['0.01 Wb-turns', '0.1 Wb-turns', '10 Wb-turns', '25 Wb-turns'],
    correctAnswer: 2,
    explanation:
      'Flux linkage (lambda) = N x Phi = 500 x 0.020Wb = 10 Wb-turns. Flux linkage represents the total flux linking all turns of the coil.',
  },
  {
    id: 4,
    question: 'If L = NPhi/I, what happens to inductance when the number of turns doubles?',
    options: [
      'Inductance halves',
      'Inductance doubles',
      'Inductance quadruples',
      'Inductance remains unchanged',
    ],
    correctAnswer: 2,
    explanation:
      'Inductance is proportional to N squared. If N doubles, the flux Phi also roughly doubles (for the same current), so L = NPhi/I quadruples. This is why motor windings have many turns.',
  },
  {
    id: 5,
    question: 'What is mutual inductance?',
    options: [
      'The inductance of a single coil',
      'The coupling between two magnetically linked coils',
      'The resistance of an inductor',
      'The capacitance between coil windings',
    ],
    correctAnswer: 1,
    explanation:
      "Mutual inductance (M) describes the magnetic coupling between two coils where changing current in one induces an EMF in the other. It's the principle behind transformers: e2 = -M(di1/dt).",
  },
  {
    id: 6,
    question: 'A 100 microfarad capacitor is charged to 230V. What energy does it store?',
    options: ['1.15J', '2.65J', '11.5J', '26.5J'],
    correctAnswer: 1,
    explanation:
      'E = 1/2 CV squared = 1/2 x 100x10 to the minus 6 x 230 squared = 1/2 x 100x10 to the minus 6 x 52900 = 2.645J, approximately 2.65J',
  },
  {
    id: 7,
    question: 'What is the function of a capacitor in power factor correction?',
    options: [
      'To increase the real power',
      'To store energy for backup',
      'To supply leading reactive current to offset lagging motor current',
      'To reduce the supply voltage',
    ],
    correctAnswer: 2,
    explanation:
      'Power factor correction capacitors supply leading reactive current (kVAr) that cancels the lagging reactive current drawn by inductive loads like motors. This reduces the total current drawn from the supply.',
  },
  {
    id: 8,
    question:
      'The capacitance of a parallel plate capacitor is given by C = epsilon A/d. If the plate separation is halved:',
    options: [
      'Capacitance halves',
      'Capacitance doubles',
      'Capacitance quadruples',
      'Capacitance remains the same',
    ],
    correctAnswer: 1,
    explanation:
      'Since C is inversely proportional to d (C = epsilon A/d), halving the separation doubles the capacitance. This is why high-value capacitors use very thin dielectric films.',
  },
  {
    id: 9,
    question: 'In a fluorescent lighting ballast, the inductor serves to:',
    options: [
      'Store energy for lamp starting only',
      'Limit current and provide starting voltage',
      'Convert DC to AC',
      'Improve power factor to unity',
    ],
    correctAnswer: 1,
    explanation:
      'Magnetic ballasts use inductors to limit the lamp current (since discharge lamps have negative resistance characteristics) and to provide a voltage kick during starting when the current suddenly changes.',
  },
  {
    id: 10,
    question:
      'An HVAC motor draws 50A at 0.7 power factor lagging. What capacitor kVAr is needed to improve to 0.95?',
    options: ['8.2 kVAr', '12.4 kVAr', '15.8 kVAr', '20.1 kVAr'],
    correctAnswer: 2,
    explanation:
      'At 400V 3-phase: kVA = root 3 x 400 x 50 / 1000 = 34.6 kVA. kW = 34.6 x 0.7 = 24.2 kW. At pf 0.7: kVAr1 = 24.7 kVAr. At pf 0.95: kVAr2 = 8.0 kVAr. Required = 24.7 - 8.0 = approximately 16.7 kVAr (closest answer 15.8 kVAr accounting for rounding).',
  },
  {
    id: 11,
    question: 'What determines the energy stored in an inductor?',
    options: ['E = 1/2 LV squared', 'E = 1/2 LI squared', 'E = LI', 'E = L/I squared'],
    correctAnswer: 1,
    explanation:
      'Energy stored in an inductor is E = 1/2 LI squared, where L is inductance in Henrys and I is current in Amperes. The energy is stored in the magnetic field around the inductor.',
  },
  {
    id: 12,
    question: 'Why do motors cause a lagging power factor?',
    options: [
      'They generate harmonics',
      'They have high resistance',
      'Their windings are inductive, causing current to lag voltage',
      'They operate at high frequency',
    ],
    correctAnswer: 2,
    explanation:
      'Motor windings are primarily inductive. In an inductor, current lags voltage by up to 90 degrees. This lagging current creates reactive power (kVAr) that must be supplied but does no useful work, reducing the power factor.',
  },
];

const faqs = [
  {
    question: 'Why do we need power factor correction capacitors in buildings?',
    answer:
      'Inductive loads like motors, transformers and fluorescent ballasts draw reactive current that lags the voltage. This increases the total current without doing useful work, causing higher I squared R losses in cables, larger cable sizes, and potential supply penalties. Capacitors provide leading reactive current that cancels the lagging component, reducing total current and improving efficiency.',
  },
  {
    question: 'What happens when you switch off an inductive load suddenly?',
    answer:
      "The inductor tries to maintain current flow (Lenz's law). The rapid change in current (di/dt) creates a high voltage spike (v = L x di/dt) that can damage contacts or semiconductor switches. This is why contactors for motor circuits include arc suppression, and electronic drives use snubber circuits or freewheeling diodes.",
  },
  {
    question: 'How do electronic ballasts differ from magnetic ballasts?',
    answer:
      "Magnetic ballasts use a simple iron-cored inductor operating at 50Hz, which is heavy and has losses. Electronic ballasts convert 50Hz to high frequency (20-50kHz), requiring much smaller inductors due to v = L x di/dt - higher frequency means smaller L for the same voltage. They're lighter, more efficient, and eliminate flicker.",
  },
  {
    question: 'Why are capacitors rated in kVAr rather than Farads for power factor correction?',
    answer:
      'kVAr directly indicates the reactive power the capacitor can supply at its rated voltage and frequency. The relationship is Q = V squared omega C = 2 pi fCV squared. For a 400V, 50Hz system, a 100 microfarad capacitor provides Q = 2 pi x 50 x 100x10 to the minus 6 x 400 squared = 5.03 kVAr. Rating in kVAr simplifies system design calculations.',
  },
  {
    question: 'What is the coupling coefficient in mutual inductance?',
    answer:
      'The coupling coefficient k (0 to 1) indicates how much of the flux from one coil links the other. M = k root(L1 L2). k = 1 means perfect coupling (all flux links both coils), typical in well-designed transformers. k less than 0.5 indicates loose coupling. Air-cored coils have low k; iron cores increase k towards unity.',
  },
];

const HNCModule3Section2_1 = () => {
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
            eyebrow="Module 3 · Section 2 · Subsection 1"
            title="Principles of Inductance and Capacitance"
            description="Understanding electromagnetic induction and electrostatic energy storage for building services applications"
            tone="purple"
          />

          <TLDR
            points={[
              'You can define inductance (L, henries) and capacitance (C, farads) and compute their reactance at 50 Hz: X_L = 2πfL and X_C = 1/(2πfC).',
              'You can apply Faraday’s and Lenz’s laws to explain back-EMF in motor windings, voltage spikes on switching, and snubber design.',
              'You can spot the CIVIL mnemonic: Capacitor → I leads V; Inductor → V leads I — the basis of every phase-shift in an AC circuit.',
              'You can size a PFC capacitor bank from the inductive kVAr it has to compensate, picking the C value that gives the right reactance at 50 Hz.',
              'You can recognise stored energy in inductors (½LI²) and capacitors (½CV²) — the basis of MOV surge clamping, motor inrush and capacitor-discharge hazards.',
            ]}
          />

          <RegsCallout
            source="BS EN 60831-1 — Shunt power capacitors of the self-healing type for a.c. systems"
            clause="Capacitors used for power factor correction shall comply with this standard for thermal stability, voltage withstand, capacitance tolerance, and discharge resistor performance (residual voltage ≤ 75 V within 3 minutes of disconnection)."
            meaning={
              <>
                Every PFC capacitor in a building services switchroom is built to BS EN
                60831-1. The discharge-resistor clause is the reason you wait 3 minutes before
                touching the terminals after isolation — the stored ½CV² energy in a
                large bank can be lethal otherwise.
              </>
            }
            cite="Source: BS EN 60831-1 (latest edition); BS EN 61921 PFC equipment design rules."
          />

          <LearningOutcomes
            outcomes={[
              "Explain electromagnetic induction and Faraday's law",
              'Define self-inductance and mutual inductance with formulae',
              'Calculate energy stored in inductors using E = 1/2 LI squared',
              'Understand electric fields and parallel plate capacitors',
              'Apply the capacitance formula C = epsilon A/d',
              'Calculate energy stored in capacitors using E = 1/2 CV squared',
              'Analyse building services applications of L and C',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="Inductors store energy in magnetic fields and oppose current change. Capacitors store energy in electric fields. Both are central to AC building services systems."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inductance (L):</strong> Opposition to current change, stores energy in magnetic fields
              </li>
              <li>
                <strong>Capacitance (C):</strong> Ability to store charge, stores energy in electric fields
              </li>
              <li>
                <strong>Faraday's Law:</strong> EMF = -N(dPhi/dt) — changing flux induces voltage
              </li>
              <li>
                <strong>Energy:</strong> E = ½LI² (inductor), E = ½CV² (capacitor)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motor windings:</strong> Inductive loads causing lagging pf
              </li>
              <li>
                <strong>PFC capacitors:</strong> Improving power factor to reduce costs
              </li>
              <li>
                <strong>Lighting ballasts:</strong> Current limiting for discharge lamps
              </li>
              <li>
                <strong>Transformers:</strong> Mutual inductance for voltage conversion
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Magnetic Fields and Electromagnetic Induction">
            <p>
              Electromagnetic induction is the fundamental principle behind generators,
              transformers, and inductors. When a conductor experiences a changing magnetic field,
              an electromotive force (EMF) is induced.
            </p>
            <p className="text-sm font-medium text-white">Magnetic field fundamentals:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Magnetic flux (Phi):</strong> Total magnetic field passing through an area, measured in Webers (Wb)
              </li>
              <li>
                <strong>Flux density (B):</strong> Flux per unit area, B = Phi/A, measured in Tesla (T)
              </li>
              <li>
                <strong>Flux linkage (lambda):</strong> Total flux linking a coil, lambda = N Phi, in Weber-turns
              </li>
              <li>
                <strong>Permeability (mu):</strong> Ability of a material to support magnetic flux
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Faraday's Law of Electromagnetic Induction</p>
            <p>
              <strong>e = -N × (dPhi/dt)</strong> — Where e = induced EMF (V), N = number of turns,
              dPhi/dt = rate of change of flux (Wb/s).
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Key Principles</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Faraday's Law:</strong> EMF proportional to rate of flux change — magnitude of induced voltage
              </li>
              <li>
                <strong>Lenz's Law:</strong> Induced EMF opposes the change causing it — direction of induced current (negative sign)
              </li>
              <li>
                <strong>Fleming's Right Hand:</strong> Motion, Field, EMF perpendicular — generator action direction
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Building services application:</strong> When a motor starts, the changing
              current creates changing flux in the windings, inducing back-EMF that limits inrush
              current as the motor accelerates.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Inductance — Self and Mutual">
            <p>
              Inductance is the property of a circuit that opposes changes in current. It's caused
              by the magnetic field created by current flow inducing a voltage that opposes the
              current change.
            </p>
            <p className="text-sm font-medium text-white">Self-inductance (L):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Self-induced EMF opposes current change in the same coil</li>
              <li>Symbol: L, Unit: Henry (H)</li>
              <li>1 Henry = 1 Wb/A = 1 V s/A</li>
              <li>Typical motor winding: 10-500 mH</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Self-Inductance Formula</p>
            <p>
              <strong>L = N Phi / I</strong> — L = inductance (H), N = turns, Phi = flux (Wb), I =
              current (A).
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Induced EMF</p>
            <p>
              <strong>e = -L × (dI/dt)</strong> — Voltage opposes rate of current change.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Mutual Inductance (M)</p>
            <p>
              When two coils are magnetically coupled, changing current in one induces EMF in the
              other. This is the operating principle of transformers.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>M = k √(L1 × L2)</strong> — k = coupling coefficient (0 to 1), typically 0.95-0.99 for power transformers
              </li>
              <li>
                <strong>e2 = -M × (dI1/dt)</strong> — EMF in secondary due to primary current change
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Energy Stored in an Inductor</p>
            <p>
              <strong>E = ½ L I²</strong> — Energy (Joules) = ½ × Inductance (H) × Current² (A²).
              Energy is stored in the magnetic field. This stored energy must dissipate when the
              circuit opens, causing voltage spikes that can damage contacts.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Inductance Values in Building Services</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Small motor winding:</strong> 10-50 mH — Fan motors, pumps
              </li>
              <li>
                <strong>Large motor winding:</strong> 50-500 mH — AHU motors, chillers
              </li>
              <li>
                <strong>Magnetic ballast:</strong> 0.5-2 H — Fluorescent lighting
              </li>
              <li>
                <strong>Choke filter:</strong> 1-10 mH — Harmonic filtering
              </li>
              <li>
                <strong>Contactor coil:</strong> 50-200 mH — Motor control
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> Inductive loads draw current that lags voltage,
              reducing power factor. A motor with 100mH inductance at 50Hz has XL = 2 pi fL = 31.4 Ω
              of inductive reactance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Electric Fields and Capacitance">
            <p>
              Capacitance is the ability to store electric charge. A capacitor consists of two
              conducting plates separated by an insulating dielectric material.
            </p>
            <p className="text-sm font-medium text-white">Electric field fundamentals:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electric field (E):</strong> Force per unit charge, E = V/d (V/m)
              </li>
              <li>
                <strong>Permittivity (epsilon):</strong> Ability of material to store electric field energy
              </li>
              <li>
                <strong>epsilon = epsilon0 × epsilonr:</strong> Absolute permittivity = free space × relative
              </li>
              <li>
                <strong>epsilon0 = 8.854 × 10⁻¹² F/m:</strong> Permittivity of free space
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Parallel Plate Capacitor</p>
            <p>
              <strong>C = epsilon0 epsilonr A / d = epsilon A / d</strong> — C = capacitance (F),
              epsilon = permittivity, A = plate area (m²), d = separation (m).
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Factors Affecting Capacitance</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Plate area (A) increases:</strong> C increases — Larger capacitors need more material
              </li>
              <li>
                <strong>Separation (d) increases:</strong> C decreases — Thin dielectrics = high C but lower voltage rating
              </li>
              <li>
                <strong>Permittivity (epsilonr) increases:</strong> C increases — Ceramic εr = 1000-10000 vs air εr = 1
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Common Dielectric Materials</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Air/Vacuum:</strong> εr = 1.0 — Variable capacitors, reference
              </li>
              <li>
                <strong>Polypropylene:</strong> εr = 2.2 — PFC capacitors, film capacitors
              </li>
              <li>
                <strong>Polyester (PET):</strong> εr = 3.3 — General purpose, timing circuits
              </li>
              <li>
                <strong>Ceramic (X7R):</strong> εr = 2000-3000 — Bypass, decoupling
              </li>
              <li>
                <strong>Electrolytic:</strong> εr = 8-10 (Al2O3) — DC filtering, high capacitance
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Energy Stored in a Capacitor</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>E = ½ C V²</strong> — From voltage
              </li>
              <li>
                <strong>E = ½ Q V</strong> — From charge
              </li>
              <li>
                <strong>E = Q² / 2C</strong> — From charge only
              </li>
              <li>Where Q = CV (charge in Coulombs)</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Safety note:</strong> Large capacitors can store lethal energy. A 1000
              microfarad capacitor at 400V stores E = ½ × 0.001 × 400² = 80J — enough to cause
              severe burns or cardiac arrest. Always discharge before working.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Building Services Applications">
            <p>
              Inductance and capacitance are fundamental to many building services systems, from
              motor control to power quality and lighting.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Motor Windings and Inductive Loads</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Motor windings are primarily inductive — current lags voltage</li>
              <li>Inductive reactance XL = 2 pi fL limits starting current</li>
              <li>Back-EMF reduces effective voltage as motor speeds up</li>
              <li>Typical motor power factor: 0.7-0.85 lagging</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Power Factor Correction (PFC)</p>
            <p>
              Capacitors supply leading reactive power (kVAr) to cancel lagging reactive power from motors:
            </p>
            <p>
              <strong>Qc = P × (tan φ1 - tan φ2)</strong> — Qc = required kVAr, P = real power (kW),
              φ1 = original angle, φ2 = target angle.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>0.70 → 0.95 pf:</strong> 0.69 kVAr per kW
              </li>
              <li>
                <strong>0.75 → 0.95 pf:</strong> 0.55 kVAr per kW
              </li>
              <li>
                <strong>0.80 → 0.95 pf:</strong> 0.42 kVAr per kW
              </li>
              <li>
                <strong>0.85 → 0.95 pf:</strong> 0.29 kVAr per kW
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Lighting Ballasts</p>
            <p className="text-sm font-medium text-white">Magnetic Ballasts</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Iron-cored inductor at 50Hz</li>
              <li>Limits lamp current (negative resistance)</li>
              <li>Provides starting voltage kick</li>
              <li>Causes lagging pf (add capacitor)</li>
              <li>Heavy, audible hum, losses around 10W</li>
            </ul>
            <p className="text-sm font-medium text-white">Electronic Ballasts</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>High frequency (20-50kHz) operation</li>
              <li>Smaller inductors due to higher frequency</li>
              <li>Built-in PFC, pf greater than 0.95</li>
              <li>Efficient, silent, no flicker</li>
              <li>Losses around 2-5W, dimmable options</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Transformers (Mutual Inductance)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Distribution transformers:</strong> 11kV/400V for building supplies
              </li>
              <li>
                <strong>Control transformers:</strong> 230V/24V for control circuits
              </li>
              <li>
                <strong>Isolation transformers:</strong> 230V/230V for sensitive equipment
              </li>
              <li>
                <strong>Current transformers:</strong> For metering and protection
              </li>
            </ul>
            <p>
              <strong>Transformer Voltage Ratio:</strong> V1/V2 = N1/N2 — primary/secondary voltage
              ratio equals turns ratio.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">HVAC Motor Applications</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>AHU supply fan:</strong> 15-75kW — pf 0.80-0.85 — individual PFC capacitor bank
              </li>
              <li>
                <strong>Chilled water pump:</strong> 5-30kW — pf 0.80-0.85 — VSD often provides unity pf
              </li>
              <li>
                <strong>FCU fan motor:</strong> 50-200W — pf 0.60-0.75 — capacitor start/run common
              </li>
              <li>
                <strong>Compressor:</strong> 5-200kW — pf 0.75-0.85 — central PFC for multiple units
              </li>
            </ul>
            <p className="text-sm text-white italic">
              <strong>Economic impact:</strong> Poor power factor increases maximum demand charges.
              Improving from 0.7 to 0.95 reduces apparent power (kVA) by 26%, potentially saving
              thousands annually on large sites.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">Example 1: Induced EMF in Motor Winding</p>
            <p>
              <strong>Question:</strong> A motor winding with 200 turns experiences a flux change
              from 50mWb to 30mWb in 10ms. Calculate the induced EMF.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Using Faraday's Law: e = -N × (dPhi/dt)</li>
              <li>Flux change: dPhi = 30 - 50 = -20mWb = -0.020 Wb; Time: dt = 10ms = 0.010 s</li>
              <li>e = -200 × (-0.020 / 0.010) = -200 × (-2) = <strong>+400V</strong></li>
              <li>The positive sign indicates EMF opposes the flux reduction</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 2: Energy Stored in Motor Winding</p>
            <p>
              <strong>Question:</strong> An AHU motor winding has inductance of 150mH and carries
              25A at full load. Calculate the stored energy.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>E = ½ × 0.150H × (25A)² = ½ × 0.150 × 625 = <strong>46.9 J</strong></li>
              <li>This energy must dissipate safely when motor is switched off</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 3: Capacitor for Power Factor Correction</p>
            <p>
              <strong>Question:</strong> A 30kW motor load operates at 0.75 power factor. Calculate
              the kVAr required to improve to 0.95 pf.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>At pf = 0.75: φ1 = cos⁻¹(0.75) = 41.4° → tan = 0.882</li>
              <li>At pf = 0.95: φ2 = cos⁻¹(0.95) = 18.2° → tan = 0.329</li>
              <li>Qc = 30 × (0.882 - 0.329) = 30 × 0.553 = <strong>16.6 kVAr</strong></li>
              <li>Select a 20 kVAr capacitor bank (nearest standard size)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 4: Capacitance Calculation</p>
            <p>
              <strong>Question:</strong> A PFC capacitor uses polypropylene dielectric (εr = 2.2)
              with plates of 0.5m² separated by 25 micrometres. Calculate the capacitance.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>C = epsilon0 epsilonr A / d = (8.854 × 10⁻¹² × 2.2 × 0.5) / (25 × 10⁻⁶)</li>
              <li>C = (9.74 × 10⁻¹²) / (25 × 10⁻⁶) = <strong>0.39 µF</strong></li>
              <li>Multiple plates in parallel are used to achieve higher values</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 5: Capacitor Energy Storage</p>
            <p>
              <strong>Question:</strong> A 470 microfarad electrolytic capacitor in a VSD DC link is
              charged to 650V. Calculate the stored energy.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>E = ½ × 470 × 10⁻⁶ × (650)² = ½ × 470 × 10⁻⁶ × 422500 = <strong>99.3 J</strong></li>
              <li>Warning: this is potentially lethal stored energy</li>
              <li>Always verify discharge before working on VSD DC bus</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulae</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>e = -N(dPhi/dt)</strong> — Faraday's law of induction
              </li>
              <li>
                <strong>L = N Phi/I</strong> — Self-inductance definition
              </li>
              <li>
                <strong>E = ½ L I²</strong> — Energy in inductor
              </li>
              <li>
                <strong>C = epsilon A/d</strong> — Parallel plate capacitance
              </li>
              <li>
                <strong>E = ½ C V²</strong> — Energy in capacitor
              </li>
              <li>
                <strong>Qc = P(tan φ1 - tan φ2)</strong> — PFC sizing
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Values to Remember</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>epsilon0 = <strong>8.854 × 10⁻¹² F/m</strong> (permittivity of free space)</li>
              <li>XL = <strong>2 pi fL</strong> (inductive reactance at frequency f)</li>
              <li>XC = <strong>1/(2 pi fC)</strong> (capacitive reactance)</li>
              <li>Target power factor: <strong>0.95 lagging</strong> (avoid leading)</li>
              <li>Polypropylene εr ≈ <strong>2.2</strong> (PFC capacitors)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Safety Considerations</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Inductors generate voltage spikes when switched — use arc suppression</li>
              <li>Capacitors store energy indefinitely — discharge through resistor before working</li>
              <li>PFC capacitors have internal discharge resistors but may take minutes</li>
              <li>Failed capacitors can explode — ensure adequate ventilation</li>
              <li>Polarity matters for electrolytic capacitors — incorrect connection causes failure</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common L and C mistakes"
            whatHappens={
              <>
                Unit confusion (mH→H, µF→F, mWb→Wb). Over-correction of pf into leading territory
                (causes voltage rise). Forgetting the squared term in energy formulas. Not
                discharging a charged capacitor before working. Designing PFC without checking for
                harmonic resonance.
              </>
            }
            doInstead={
              <>
                Convert all to base SI units before substituting. Target 0.95 lagging, never
                leading. Remember energy ∝ I² or V². Always verify discharge with a meter. Check
                the resonance frequency f₀ = 1/(2π√LC) sits well away from supply harmonics.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Sizing a PFC capacitor for a fan-coil motor"
            situation={
              <>
                A 7.5 kW single-phase fan-coil motor on a 230 V 50 Hz supply has a measured
                power factor of 0.72 lagging. The tenant has been hit with a power-factor
                penalty on the utility bill and you need to fit a local capacitor at the motor
                to bring PF up to 0.95.
              </>
            }
            whatToDo={
              <>
                Compute the required reactive correction: kVAr = P × (tan φ₁ −
                tan φ₂) = 7.5 × (tan(cos⁻¹ 0.72) − tan(cos⁻¹ 0.95)) ≈ 7.5
                × (0.964 − 0.329) ≈ 4.76 kVAr. Convert to capacitance at 50 Hz:
                C = Q / (2πfV²) = 4760 / (2π × 50 × 230²) ≈ 286 µF. Pick
                the next standard value above (typically 300 µF at 250 V AC), to BS EN
                60831-1, fitted with discharge resistors.
              </>
            }
            whyItMatters={
              <>
                Local PFC at the motor cuts the line current the cable has to carry, reduces
                I²R losses, and removes the supplier’s reactive penalty. The capacitance
                calculation is a direct application of inductive vs capacitive reactance —
                get the value wrong and you either under-correct or over-correct into a
                leading PF (which the supplier may also penalise).
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Inductance (L, henries) opposes change in current — produces a voltage by Faraday’s law: v = L × di/dt.',
              'Capacitance (C, farads) opposes change in voltage — stores charge: i = C × dv/dt.',
              'At 50 Hz: X_L = 2πfL = 314 × L. X_C = 1/(2πfC) = 1/(314 × C).',
              'CIVIL: Capacitor → I leads V by 90°. Inductor → V leads I by 90°. The mnemonic that fixes phase angles in your head.',
              'Stored energy: inductor = ½LI², capacitor = ½CV² — basis of motor inrush, capacitor-discharge hazard and surge-protection device action.',
              'Lenz’s law: induced current always opposes the change that produced it — the source of back-EMF in motors and inrush in transformers.',
              'BS EN 60831-1 governs PFC capacitor design — self-healing dielectric, discharge resistor (≤ 75 V in 3 min), thermal stability.',
              'PFC sizing: Q_C (kVAr) = P (kW) × (tan φ₁ − tan φ₂). Convert kVAr to µF via C = Q / (2πfV²).',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section1-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Building services applications
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section2-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Reactance and impedance in AC circuits
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section2_1;
