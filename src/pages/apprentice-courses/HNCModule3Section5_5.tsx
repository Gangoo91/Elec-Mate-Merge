/**
 * Module 3 · Section 5 · Subsection 5 — Synchronous Machines: Principles and Uses
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   Synchronous motors, alternators, PMSMs, synchronous condensers — speed locked
 *   to supply frequency, controllable pf via field excitation. Standby generation
 *   and PF correction in modern BSE installations.
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

const TITLE = 'Synchronous Machines - Principles and Uses - HNC Module 3 Section 5.5';
const DESCRIPTION =
  'Master synchronous machine principles for building services: synchronous speed calculations, excitation control, power factor correction, permanent magnet motors, and standby generator applications.';

const quickCheckQuestions = [
  {
    id: 'sync-speed',
    question: 'What is the synchronous speed of a 4-pole machine on a 50Hz supply?',
    options: [
      '1500 rev/min',
      '1000 rev/min',
      '3000 rev/min',
      '750 rev/min',
    ],
    correctIndex: 0,
    explanation:
      'Using ns = 120f/p: ns = (120 x 50) / 4 = 1500 rev/min. The rotor runs at exactly this speed with no slip.',
  },
  {
    id: 'overexcitation',
    question: 'What happens when a synchronous motor is over-excited?',
    options: [
      'It runs faster',
      'It draws lagging current',
      'It stalls',
      'It draws leading current',
    ],
    correctIndex: 3,
    explanation:
      'Over-excitation causes the motor to draw leading current, making it appear capacitive. This is how synchronous condensers correct lagging power factor.',
  },
  {
    id: 'damper-windings',
    question: 'What is the primary purpose of damper windings in a synchronous machine?',
    options: [
      'To damp hunting oscillations',
      'To improve power factor',
      'To increase efficiency',
      'To reduce starting current',
    ],
    correctIndex: 0,
    explanation:
      'Damper windings (amortisseur windings) damp out hunting oscillations and provide starting torque. They only carry current during transient conditions.',
  },
  {
    id: 'pmsm-advantage',
    question: 'What is a key advantage of permanent magnet synchronous motors (PMSMs)?',
    options: [
      'Voltage source in series with resistance',
      'Longer range and faster setup',
      'No rotor losses (higher efficiency)',
      'Expressing numbers as powers of 10',
    ],
    correctIndex: 2,
    explanation:
      'PMSMs have no rotor copper losses since there are no field windings. This results in higher efficiency, particularly important for variable speed drives.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the synchronous speed formula for an AC machine?',
    options: [
      'ns = 60f/p',
      'ns = 120f/p',
      'ns = f/p',
      'ns = 120p/f',
    ],
    correctAnswer: 1,
    explanation:
      'The synchronous speed formula is ns = 120f/p, where f is frequency (Hz), p is number of poles, and ns is in rev/min. The factor 120 converts from Hz to rev/min (60 seconds x 2 because speed relates to pole pairs).',
  },
  {
    id: 2,
    question: 'A 6-pole synchronous generator operates at 50Hz. What is its speed?',
    options: [
      '1500 rev/min',
      '500 rev/min',
      '1000 rev/min',
      '750 rev/min',
    ],
    correctAnswer: 2,
    explanation:
      'Using ns = 120f/p = (120 x 50) / 6 = 1000 rev/min. The generator must be driven at exactly this speed to produce 50Hz output.',
  },
  {
    id: 3,
    question: 'How does a synchronous motor differ from an induction motor at steady state?',
    options: [
      'To verify voltage at load is within acceptable limits',
      'Different light modes (paths) arriving at different times',
      'A reference cable at the far end for loss measurement',
      'It runs at exactly synchronous speed with zero slip',
    ],
    correctAnswer: 3,
    explanation:
      'A synchronous motor runs at exactly synchronous speed with zero slip because the rotor is locked to the rotating magnetic field. Induction motors always have some slip to induce rotor current.',
  },
  {
    id: 4,
    question: 'What is a synchronous condenser used for?',
    options: [
      'Power factor correction',
      'Frequency conversion',
      'Converting AC to DC',
      'Voltage transformation',
    ],
    correctAnswer: 0,
    explanation:
      'A synchronous condenser is an unloaded synchronous motor used solely for power factor correction. When over-excited, it draws leading current to correct lagging power factor from inductive loads.',
  },
  {
    id: 5,
    question: "Why can't a synchronous motor self-start?",
    options: [
      'Temperature, humidity, air movement, and radiant temperature',
      'The rotating field reverses too quickly for the heavy rotor to follow',
      'By trained personnel to evacuate people who cannot use stairs independently',
      'At least every 14 months, or every 6 months for certain specified processes',
    ],
    correctAnswer: 1,
    explanation:
      "The rotating magnetic field reverses direction 100 times per second (at 50Hz). The rotor's inertia prevents it from accelerating fast enough to lock on to the field, so auxiliary starting methods are needed.",
  },
  {
    id: 6,
    question: 'What determines the power factor of a synchronous motor?',
    options: [
      'Supply voltage',
      'Mechanical load',
      'Field excitation current',
      'Number of poles',
    ],
    correctAnswer: 2,
    explanation:
      'The field excitation current determines power factor. Under-excitation causes lagging pf, normal excitation gives unity pf, and over-excitation gives leading pf. This is shown by the V-curves.',
  },
  {
    id: 7,
    question: "What is 'hunting' in a synchronous machine?",
    options: [
      'Speed variation due to load changes',
      'Searching for synchronous speed',
      'Variation in excitation current',
      'Oscillation of rotor about its equilibrium position',
    ],
    correctAnswer: 3,
    explanation:
      'Hunting is the oscillation of the rotor about its equilibrium position, caused by sudden load changes or supply variations. Damper windings are fitted to suppress these oscillations.',
  },
  {
    id: 8,
    question: 'In a synchronous generator (alternator), what determines the output frequency?',
    options: [
      'Rotational speed and number of poles',
      'They provide high output from a compact size',
      'Supply air temperature control',
      'f = 1/(2 x pi x sqrt(L x C))',
    ],
    correctAnswer: 0,
    explanation:
      'Output frequency f = (p x n) / 120, where p is poles and n is speed in rev/min. For 50Hz output with 4 poles, the prime mover must maintain exactly 1500 rev/min.',
  },
  {
    id: 9,
    question: 'What type of motor is commonly used in modern variable speed HVAC drives?',
    options: [
      'Wound rotor induction motor',
      'Permanent magnet synchronous motor (PMSM)',
      'Synchronous reluctance motor',
      'Single-phase induction motor',
    ],
    correctAnswer: 1,
    explanation:
      "PMSMs are widely used in modern VSD applications due to their high efficiency, compact size, and excellent controllability. They're common in chillers, AHU fans, and pump drives.",
  },
  {
    id: 10,
    question:
      'For a standby generator in a building, what must be controlled when paralleling with the grid?',
    options: [
      'Immediately after the work is carried out',
      'Visual, audible, electrical, and thermal symptoms',
      'Voltage, frequency, phase sequence, and phase angle',
      'Designing infrastructure that can adapt to changing requirements',
    ],
    correctAnswer: 2,
    explanation:
      'Paralleling requires matching voltage magnitude, frequency, phase sequence (for three-phase), and phase angle. Automatic synchronising relays monitor all parameters before closing the paralleling breaker.',
  },
];

const faqs = [
  {
    question: 'Why are synchronous motors not self-starting?',
    answer:
      "The stator's rotating magnetic field rotates at synchronous speed immediately upon energisation. At 50Hz, this field reverses direction 100 times per second. The rotor's mechanical inertia prevents it from accelerating from standstill fast enough to lock on to this rapidly rotating field. Solutions include damper windings for induction starting, auxiliary starting motors, or variable frequency starting using a VSD.",
  },
  {
    question: 'How does a synchronous condenser improve power factor?',
    answer:
      'A synchronous condenser is an unloaded synchronous motor. When over-excited (high DC field current), it draws leading reactive current from the supply, appearing as a large capacitor. This leading current cancels the lagging current drawn by inductive loads (motors, transformers), improving the overall power factor and reducing supply current and losses.',
  },
  {
    question: 'What are the advantages of permanent magnet synchronous motors?',
    answer:
      'PMSMs offer higher efficiency (no rotor copper losses), higher power density (compact size), better dynamic response, and lower maintenance (no brushes or slip rings). Disadvantages include higher cost, risk of demagnetisation at high temperatures, and fixed field strength requiring sophisticated control algorithms.',
  },
  {
    question: 'Why do standby generators need synchronising equipment?',
    answer:
      'When paralleling a generator with the grid or another generator, mismatched conditions cause severe problems: voltage mismatch causes circulating currents, frequency mismatch causes power swings, and phase angle mismatch can cause destructive current surges. Synchronising equipment ensures all parameters match before connecting, and governors/AVRs maintain synchronism during operation.',
  },
  {
    question: 'What determines the reactive power output of a synchronous generator?',
    answer:
      'The field excitation current determines reactive power output. Increasing excitation causes the generator to export reactive power (supply VArs to the grid). Decreasing excitation causes the generator to import reactive power. This is used to control voltage on transmission systems - generators near load centres often operate over-excited to support voltage.',
  },
  {
    question: 'How do modern inverter-fed PMSMs start and run without sensors?',
    answer:
      "Sensorless control uses back-EMF estimation at higher speeds and various starting techniques (I/f control, high-frequency injection) at low speeds. The drive's microprocessor calculates rotor position from motor currents and voltages, eliminating the need for encoders or resolvers. This reduces cost and improves reliability in HVAC applications.",
  },
];

const HNCModule3Section5_5 = () => {
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
            eyebrow="Module 3 · Section 5 · Subsection 5"
            title="Synchronous machines – principles and uses"
            description="Understanding synchronous motors, generators, and their critical role in building services power systems"
            tone="purple"
          />

          <TLDR
            points={[
              'You apply n&#x209b; = 120f/p &mdash; synchronous machines lock to grid frequency, no slip, perfect for constant-speed drives like compressors above ~200 kW.',
              'You control pf via field excitation &mdash; over-excited synchronous motors deliver leading kVAr (synchronous condenser duty) and lift building pf.',
              'You specify standby alternators to BS 7698 / ISO 8528, with G99 protection relays for any installation that may run in parallel with the DNO.',
              'You compare PMSMs (rare-earth permanent magnets, no field winding, IE5 efficiency) for high-end variable-speed duty &mdash; chiller compressors, lift gear, EV-charger output stages.',
            ]}
          />

          <RegsCallout
            source="ENA Engineering Recommendation G99 — Requirements for the connection of generation equipment in parallel with public distribution networks"
            clause="The owner of any generating equipment that operates in parallel (synchronous or asynchronous) with the public distribution network shall provide protection arrangements to disconnect the generator from the network in the event of supply loss, voltage or frequency excursion outside agreed limits, or loss of mains."
            meaning={
              <>
                Any synchronous alternator on a BSE site that may parallel with the DNO
                (CHP, standby that runs across the changeover, embedded PV with a
                synchronous interface) is in scope of G99. As BSE designer you specify
                the protection relay (G99-compliant LoM, RoCoF, U/V, U/F, vector shift)
                and submit the connection application to the DNO. Failing to comply
                risks islanding hazards to DNO staff during supply outages and
                disconnection by the DNO if discovered.
              </>
            }
            cite="Source: ENA Engineering Recommendation G99; BS 7671:2018+A4:2026, Reg 551 (low-voltage generating sets); BS 7698 / ISO 8528 (alternators); BS EN 60034 (rotating machines)"
          />

          <LearningOutcomes
            outcomes={[
              "Calculate synchronous speed using ns = 120f/p",
              "Explain synchronous motor construction and excitation",
              "Describe power factor control through field current adjustment",
              "Understand synchronous condenser operation for PF correction",
              "Compare PMSMs with wound-field synchronous machines",
              "Explain hunting phenomena and damper winding function",
              "Describe alternator operation and synchronisation requirements",
              "Apply knowledge to standby generators and PF correction systems",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="In 30 seconds">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Synchronous speed:</strong> ns = 120f/p (no slip)</li>
              <li><strong>Excitation control:</strong> Adjusts power factor</li>
              <li><strong>Synchronous condensers:</strong> Large-scale PF correction</li>
              <li><strong>PMSMs:</strong> High-efficiency VSD applications</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Standby generators:</strong> Emergency power supply</li>
              <li><strong>PF correction:</strong> Large commercial/industrial sites</li>
              <li><strong>PMSM drives:</strong> Chillers, fans, pumps</li>
              <li><strong>Grid paralleling:</strong> CHP and renewable integration</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Synchronous Speed">
            <p>
              Synchronous machines operate at a fixed speed determined by the supply frequency and
              the number of poles. Unlike induction motors, there is no slip - the rotor is
              magnetically locked to the rotating field and runs at exactly synchronous speed.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                The Synchronous Speed Formula
              </p>
              <p><strong>
                n<sub>s</sub> = 120f / p
              </strong></p>

                <p>
                  Where: n<sub>s</sub> = synchronous speed (rev/min)
                </p>
                <p>f = supply frequency (Hz)</p>
                <p>p = number of poles</p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Synchronous Speeds at 50Hz (UK Supply)
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>2</strong> — 3000 rev/min — High-speed turbine generators</li>
              <li><strong>4</strong> — 1500 rev/min — Standard generators, large motors</li>
              <li><strong>6</strong> — 1000 rev/min — Medium-speed applications</li>
              <li><strong>8</strong> — 750 rev/min — Direct-drive applications</li>
              <li><strong>12</strong> — 500 rev/min — Low-speed hydro generators</li>
            </ul>

            <p>
              <strong>Key point:</strong> For a generator producing 50Hz, the prime mover must
              maintain exactly the synchronous speed. Any speed variation directly affects output
              frequency.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <ConceptBlock title="Synchronous Motor Construction">
            <p>
              A synchronous motor consists of a three-phase stator winding (similar to an induction
              motor) and a rotor with DC field windings or permanent magnets. The DC field creates
              poles that lock on to the rotating magnetic field produced by the stator.
            </p>

              
                <p className="text-sm font-medium text-elec-yellow/80">Stator Construction</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Laminated silicon steel core</li>
                  <li>Three-phase distributed winding</li>
                  <li>
                    Creates rotating magnetic field at n<sub>s</sub>
                  </li>
                  <li>Identical to induction motor stator</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Rotor Types</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Salient pole:</strong> Projecting poles, low speed
                  </li>
                  <li>
                    <strong>Cylindrical:</strong> Smooth rotor, high speed
                  </li>
                  <li>
                    <strong>Permanent magnet:</strong> No field windings
                  </li>
                  <li>Field winding fed via slip rings and brushes</li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Rotor Construction Comparison
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Construction</strong> — Projecting poles — Distributed winding in slots</li>
              <li><strong>Speed range</strong> — Low to medium — High speed</li>
              <li><strong>Pole number</strong> — 4 to many — Usually 2 or 4</li>
              <li><strong>Typical use</strong> — Hydro, diesel generators — Turbo-generators</li>
            </ul>

              <p className="text-sm font-medium text-white">Starting Methods</p>
              <p>
                Synchronous motors cannot self-start because the rotating field reverses too quickly
                for the rotor inertia. Common starting methods include:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Damper winding start:</strong> Acts as induction motor cage during
                  start-up
                </li>
                <li>
                  <strong>Auxiliary motor:</strong> Small induction motor brings rotor to
                  near-synchronous speed
                </li>
                <li>
                  <strong>VSD starting:</strong> Frequency gradually increased from zero
                </li>
                <li>
                  <strong>Reduced voltage:</strong> Star-delta or soft starter reduces starting
                  current
                </li>
              </ul>

            <p>
              <strong>Excitation requirement:</strong> DC field current is typically 1-5% of the
              rated stator current, supplied via slip rings or brushless exciter.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Excitation and Power Factor Control">
            <p>
              A unique feature of synchronous motors is the ability to control power factor by
              adjusting the DC field excitation. This makes them valuable for power factor
              correction as well as providing mechanical drive.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Effect of Field Excitation on Power Factor
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Under-excited</strong> — Lagging — Current lags voltage — Inductive (like a coil)</li>
              <li><strong>Normal excitation</strong> — Unity (1.0) — Current in phase with voltage — Resistive</li>
              <li><strong>Over-excited</strong> — Leading — Current leads voltage — Capacitive</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                V-Curves (Armature Current vs Field Current)
              </p>
              <p>
                The relationship between armature current and field current at constant load forms
                characteristic V-shaped curves. The minimum armature current occurs at unity power
                factor.
              </p>

                <pre className="text-xs text-white font-mono whitespace-pre overflow-x-auto">
                  {`    Armature
    Current
       |     Lagging pf        Leading pf
       |         \\              /
       |          \\    Unity   /
       |           \\    pf    /
       |            \\   |   /
       |             \\  |  /
       |              \\ | /
       |               \\|/
       |________________|________________
                        |
              Field Current (If)

         Under-excited  |  Over-excited`}
                </pre>

              <p className="text-xs text-white mt-2">
                Each curve represents a different mechanical load. Higher loads shift the entire
                curve upward.
              </p>

              <p className="text-sm font-medium text-white">Practical Excitation Control</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Manual control:</strong> Field rheostat adjusted by operator
                </li>
                <li>
                  <strong>Automatic voltage regulator (AVR):</strong> Maintains constant terminal
                  voltage
                </li>
                <li>
                  <strong>Power factor controller:</strong> Adjusts excitation to maintain target pf
                </li>
                <li>
                  <strong>Brushless exciter:</strong> Rotating rectifier eliminates slip rings
                </li>
              </ul>

            <p>
              <strong>Operating point:</strong> Running slightly over-excited (0.95 leading)
              provides a safety margin whilst contributing to site power factor correction.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="Synchronous Condensers for Power Factor Correction">
            <p>
              A synchronous condenser is an unloaded synchronous motor used solely for reactive
              power compensation. When over-excited, it draws leading current from the supply,
              appearing as a large variable capacitor.
            </p>

              
                <p className="text-sm font-medium text-elec-yellow/80">Advantages</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Continuously variable reactive power</li>
                  <li>Can absorb or generate VArs</li>
                  <li>Provides inertia to the system</li>
                  <li>High reliability and long life</li>
                  <li>No harmonic generation</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Disadvantages</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>High capital cost</li>
                  <li>Requires foundations and space</li>
                  <li>Mechanical maintenance (bearings, brushes)</li>
                  <li>Continuous losses (even unloaded)</li>
                  <li>Slower response than static compensators</li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Synchronous Condenser vs Static Capacitors
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Control</strong> — Continuously variable — Stepped (switched banks)</li>
              <li><strong>VAr direction</strong> — Generate or absorb — Generate only</li>
              <li><strong>Harmonics</strong> — None generated — Can amplify harmonics</li>
              <li><strong>Response time</strong> — Seconds — Milliseconds (thyristor-switched)</li>
              <li><strong>Cost</strong> — High capital, low running — Lower capital, minimal running</li>
            </ul>

              <p className="text-sm font-medium text-white">Modern Applications</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Grid stability:</strong> Providing inertia as rotating generation
                  decreases
                </li>
                <li>
                  <strong>Transmission support:</strong> Voltage control at strategic locations
                </li>
                <li>
                  <strong>Industrial sites:</strong> Large steelworks, chemical plants
                </li>
                <li>
                  <strong>Renewable integration:</strong> Compensating for variable generation
                </li>
              </ul>

            <p>
              <strong>Building services note:</strong> Static capacitor banks are more common for
              commercial buildings. Synchronous condensers are typically utility or heavy industrial
              scale.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Permanent Magnet Synchronous Motors (PMSMs)">
            <p>
              PMSMs use permanent magnets instead of DC field windings to create the rotor magnetic
              field. They offer superior efficiency and power density, making them ideal for modern
              variable speed drive applications in building services.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                PMSM Rotor Configurations
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Surface-mounted (SPM)</strong> — On rotor surface — Simple, good torque, speed limited</li>
              <li><strong>Interior (IPM)</strong> — Buried in rotor — Higher speed, field weakening possible</li>
              <li><strong>Spoke type</strong> — Radially arranged — Flux concentration, ferrite magnets</li>
            </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Advantages over Induction Motors
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>No rotor copper losses (2-5% higher efficiency)</li>
                  <li>Higher power density (smaller size)</li>
                  <li>Better dynamic response</li>
                  <li>Lower operating temperature</li>
                  <li>Quieter operation</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Considerations</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Higher initial cost (rare earth magnets)</li>
                  <li>Risk of demagnetisation at high temperature</li>
                  <li>Requires sophisticated drive control</li>
                  <li>Cannot adjust field strength</li>
                  <li>Magnet material sustainability concerns</li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                PMSM Efficiency Comparison (IE Classes)
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Standard induction (11kW)</strong> — 89-91% — IE2-IE3</li>
              <li><strong>Premium induction (11kW)</strong> — 91-93% — IE3-IE4</li>
              <li><strong>PMSM (11kW)</strong> — 94-96% — IE4-IE5</li>
            </ul>

              <p className="text-sm font-medium text-white">Building Services Applications</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Chiller compressors:</strong> Oil-free magnetic bearing designs
                </li>
                <li>
                  <strong>AHU supply/extract fans:</strong> Direct-drive eliminates belt losses
                </li>
                <li>
                  <strong>Circulation pumps:</strong> Integrated motor-pump units
                </li>
                <li>
                  <strong>Lift machines:</strong> Gearless direct-drive traction
                </li>
                <li>
                  <strong>Heat pump compressors:</strong> Variable speed for part-load efficiency
                </li>
              </ul>

            <p>
              <strong>ErP Directive:</strong> EU regulations increasingly mandate IE4+ efficiency
              for motors, driving PMSM adoption in new building services installations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <ConceptBlock title="Hunting and Damper Windings">
            <p>
              'Hunting' refers to oscillations of the rotor about its equilibrium position relative
              to the rotating magnetic field. These oscillations can cause mechanical stress,
              voltage fluctuations, and resonance problems if not controlled.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">Causes of Hunting</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Sudden load changes:</strong> Mechanical load torque variations
                </li>
                <li>
                  <strong>Supply variations:</strong> Voltage or frequency fluctuations
                </li>
                <li>
                  <strong>Pulsating loads:</strong> Reciprocating compressors, stamping presses
                </li>
                <li>
                  <strong>Prime mover variations:</strong> Diesel engine torque pulsations
                </li>
                <li>
                  <strong>System resonance:</strong> Mechanical-electrical natural frequencies
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Damper (Amortisseur) Windings
              </p>
              <p>
                Damper windings are short-circuited copper or aluminium bars embedded in the rotor
                pole faces, similar to a squirrel cage.
              </p>

                
                  <p className="text-xs font-medium text-white mb-1">How They Work:</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>At synchronous speed: no relative motion, no induced current</li>
                    <li>During hunting: relative motion induces currents</li>
                    <li>Induced currents create opposing torque</li>
                    <li>Oscillations are damped out</li>
                  </ul>

                
                  <p className="text-xs font-medium text-white mb-1">Additional Functions:</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Provide starting torque (induction motor action)</li>
                    <li>Protect field winding during asymmetrical faults</li>
                    <li>Reduce rotor surface losses</li>
                    <li>Improve transient stability</li>
                  </ul>

              

              <p className="text-sm font-medium text-white">Hunting Prevention Methods</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Damper windings:</strong> Standard on most synchronous machines
                </li>
                <li>
                  <strong>Flywheels:</strong> Increase rotor inertia for pulsating loads
                </li>
                <li>
                  <strong>Proper sizing:</strong> Avoid operation near natural frequency
                </li>
                <li>
                  <strong>Excitation control:</strong> Fast-acting AVR reduces electrical
                  disturbances
                </li>
                <li>
                  <strong>Power system stabilisers:</strong> On large generators
                </li>
              </ul>

            <p>
              <strong>Generator protection:</strong> Severe hunting can cause pole slipping, leading
              to large current surges and mechanical damage. Loss-of-synchronism protection
              disconnects the machine.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="Synchronous Generators (Alternators)">
            <p>
              A synchronous generator (alternator) converts mechanical energy to electrical energy.
              The prime mover (diesel engine, gas turbine, steam turbine) drives the rotor, and AC
              voltage is induced in the stator windings.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Generator Output Equations
              </p>

                <p>
                  <strong>Frequency:</strong> f = (p x n) / 120 Hz
                </p>
                <p>
                  <strong>EMF:</strong> E = 4.44 x f x N x phi x k<sub>w</sub> Volts
                </p>
                <p>
                  <strong>Three-phase power:</strong> P = sqrt(3) x V<sub>L</sub> x I<sub>L</sub> x
                  cos phi Watts
                </p>

              <p className="text-xs text-white mt-2">
                Where: p = poles, n = speed (rev/min), N = turns, phi = flux, k<sub>w</sub> =
                winding factor
              </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Generator Voltage Regulation
              </p>
              <p>
                Terminal voltage varies with load due to armature reaction and internal impedance.
                The Automatic Voltage Regulator (AVR) adjusts field current to maintain constant
                voltage.
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lagging (inductive)</strong> — Voltage drops significantly — Increase excitation</li>
              <li><strong>Unity</strong> — Moderate voltage drop — Moderate increase</li>
              <li><strong>Leading (capacitive)</strong> — Voltage may rise — Decrease excitation</li>
            </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Excitation Systems</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Static exciter:</strong> Thyristor-controlled DC from PT/CT
                  </li>
                  <li>
                    <strong>Brushless exciter:</strong> Rotating rectifier, no slip rings
                  </li>
                  <li>
                    <strong>PMG exciter:</strong> Permanent magnet pilot generator
                  </li>
                  <li>
                    <strong>Self-excited:</strong> Residual magnetism starts, shunt builds
                  </li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Generator Protection</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Differential:</strong> Internal fault detection
                  </li>
                  <li>
                    <strong>Overcurrent:</strong> External fault backup
                  </li>
                  <li>
                    <strong>Reverse power:</strong> Motoring protection
                  </li>
                  <li>
                    <strong>Loss of excitation:</strong> Field failure
                  </li>
                  <li>
                    <strong>Under/over voltage:</strong> AVR failure
                  </li>
                </ul>

            

            <p>
              <strong>Voltage regulation:</strong> Typically +/-0.5% for modern AVR-controlled
              generators, meeting BS EN 61000-2-2 compatibility requirements.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Building Services Applications">
            <p>
              Synchronous machines play critical roles in building services, from standby power
              generation to power factor correction on large commercial and industrial sites.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Standby Generator Systems
              </p>
              <p>
                Diesel generators provide emergency power for life safety systems, data centres,
                hospitals, and other critical facilities.
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Emergency lighting</strong> — 50-200 kVA — &lt;15 seconds — BS 5266</li>
              <li><strong>Hospital essential</strong> — 500-2000 kVA — &lt;15 seconds — HTM 06-01</li>
              <li><strong>Data centre Tier III</strong> — 1000-3000 kVA — &lt;10 seconds — Uptime Institute</li>
              <li><strong>Fire pump</strong> — 100-500 kVA — &lt;10 seconds — BS EN 12845</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Generator Paralleling Requirements
              </p>
              <p>
                When paralleling generators with each other or the grid, the following must match:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Voltage:</strong> Within +/-5% of nominal
                </li>
                <li>
                  <strong>Frequency:</strong> Within +/-0.5 Hz (incoming slightly faster)
                </li>
                <li>
                  <strong>Phase sequence:</strong> Must be identical (L1-L2-L3)
                </li>
                <li>
                  <strong>Phase angle:</strong> Within +/-10 degrees (synchronoscope or sync check
                  relay)
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Large-Scale Power Factor Correction
              </p>
              <p>
                For sites with large motor loads (industrial processes, multiple chillers),
                centralised PF correction is more economical than individual motor correction.
              </p>

                
                  <p className="text-xs font-medium text-white mb-1">
                    Capacitor Bank Installation:
                  </p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Automatic power factor controller</li>
                    <li>Stepped switching (contactor or thyristor)</li>
                    <li>Detuning reactors for harmonic-rich sites</li>
                    <li>Target pf typically 0.95-0.98 lagging</li>
                  </ul>

                
                  <p className="text-xs font-medium text-white mb-1">Benefits:</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Reduced reactive power charges</li>
                    <li>Lower distribution losses</li>
                    <li>Released transformer capacity</li>
                    <li>Improved voltage regulation</li>
                  </ul>

              

              <p className="text-sm font-medium text-elec-yellow/80">
                Combined Heat and Power (CHP)
              </p>
              <p>
                Synchronous generators in CHP systems can export power to the grid, requiring:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>G99 connection:</strong> DNO approval for embedded generation
                </li>
                <li>
                  <strong>Protection scheme:</strong> Loss of mains (ROCOF, vector shift)
                </li>
                <li>
                  <strong>Metering:</strong> Import/export kWh and kVArh
                </li>
                <li>
                  <strong>Synchronising:</strong> Automatic sync panel
                </li>
                <li>
                  <strong>Power quality:</strong> Harmonic limits per G5/4-1
                </li>
              </ul>

            <p>
              <strong>BS 7671 requirements:</strong> Standby generators must comply with Section 551
              (Low voltage generating sets) including earth fault loop impedance verification and
              RCD coordination.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
                Example 1: Synchronous Speed Calculation
              </p>
              <p>
                <strong>Question:</strong> A standby generator has 4 poles and must produce 50Hz.
                What speed must the diesel engine maintain?
              </p>

                <p>Using: f = (p x n) / 120</p>
                <p>Rearranging for n: n = (120 x f) / p</p>
                <p>
                  n = (120 x 50) / 4 = 6000 / 4 = <strong>1500 rev/min</strong>
                </p>
                <p>
                  The engine governor must maintain 1500 +/-0.5% for frequency stability
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 2: Generator Sizing for Building Load
              </p>
              <p>
                <strong>Question:</strong> A hospital has 800kW essential load at 0.85 pf lagging.
                Size the standby generator.
              </p>

                <p>Apparent power: S = P / cos phi</p>
                <p>
                  S = 800 / 0.85 = <strong>941 kVA</strong>
                </p>
                <p>Allow 20% margin for motor starting:</p>
                <p>Generator rating = 941 x 1.2 = 1129 kVA</p>
                <p>
                  Select: <strong>1250 kVA generator</strong> (standard size)
                </p>
                <p>Prime rated for continuous operation</p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 3: Power Factor Correction Calculation
              </p>
              <p>
                <strong>Question:</strong> A factory has 500kW load at 0.75 pf. Calculate kVAr
                required to improve to 0.95 pf.
              </p>

                <p>Original reactive power:</p>
                <p>Q1 = P x tan(cos^-1 0.75) = 500 x tan(41.4 deg) = 500 x 0.882 = 441 kVAr</p>
                <p>Target reactive power:</p>
                <p>Q2 = P x tan(cos^-1 0.95) = 500 x tan(18.2 deg) = 500 x 0.329 = 164 kVAr</p>
                <p>Capacitor bank required:</p>
                <p>
                  Qc = Q1 - Q2 = 441 - 164 = <strong>277 kVAr</strong>
                </p>
                <p>Install 300 kVAr automatic capacitor bank</p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 4: PMSM Energy Savings
              </p>
              <p>
                <strong>Question:</strong> A 30kW AHU fan motor runs 6000 hours/year. Compare IE3
                induction (91%) vs PMSM (95%) efficiency.
              </p>

                <p>IE3 induction motor input power:</p>
                <p>Pin = 30 / 0.91 = 33.0 kW</p>
                <p>PMSM input power:</p>
                <p>Pin = 30 / 0.95 = 31.6 kW</p>
                <p>Annual saving:</p>
                <p>
                  Delta E = (33.0 - 31.6) x 6000 = <strong>8,400 kWh/year</strong>
                </p>
                <p>
                  At GBP 0.15/kWh: <strong>GBP 1,260/year saving</strong>
                </p>
                <p>Payback typically 3-5 years on motor premium</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>ns = 120f / p</strong> - Synchronous speed
                </li>
                <li>
                  <strong>f = (p x n) / 120</strong> - Generator frequency
                </li>
                <li>
                  <strong>S = P / cos phi</strong> - Apparent power from real power
                </li>
                <li>
                  <strong>Q = P x tan phi</strong> - Reactive power
                </li>
                <li>
                  <strong>Qc = P x (tan phi1 - tan phi2)</strong> - Capacitor kVAr for PF correction
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Key Values to Remember
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  2-pole at 50Hz: <strong>3000 rev/min</strong>
                </li>
                <li>
                  4-pole at 50Hz: <strong>1500 rev/min</strong>
                </li>
                <li>
                  6-pole at 50Hz: <strong>1000 rev/min</strong>
                </li>
                <li>
                  PMSM efficiency advantage: <strong>2-5%</strong> over induction
                </li>
                <li>
                  Generator sizing margin: <strong>20-25%</strong> for motor starting
                </li>
              </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Confusing poles and pole pairs:</strong> Formula uses total poles, not
                  pairs
                </li>
                <li>
                  <strong>Ignoring motor starting:</strong> Generator must handle inrush currents
                </li>
                <li>
                  <strong>Over-correction of pf:</strong> Leading pf can cause voltage rise
                </li>
                <li>
                  <strong>Forgetting synchronising:</strong> Paralleling without matching causes
                  damage
                </li>
              </ul>
              </>
            }
            doInstead="Apply the formulas with care, verify with measured values where possible, and always cross-check against BS 7671 and equipment manufacturer data."
          />

          <SectionRule />

          <ConceptBlock title="Quick Reference">
            <p className="text-sm font-medium text-elec-yellow/80">Synchronous Machine Principles</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Synchronous speed: ns = 120f/p</li>
                  <li>Zero slip at steady state</li>
                  <li>Field excitation controls pf</li>
                  <li>Damper windings suppress hunting</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Building Services</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Standby generators: 4-pole, 1500 rev/min</li>
                  <li>PF correction: 0.95-0.98 target</li>
                  <li>PMSM: IE4-IE5 efficiency</li>
                  <li>G99 for grid-connected generation</li>
                </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Hospital essential-services standby alternator &mdash; G99 connection"
            situation={
              <>
                A hospital essential supply has a 1100 kVA diesel-driven synchronous
                alternator on a 30-second AMF (automatic mains failure) changeover. A
                proposed upgrade adds a 5 second &ldquo;test in synchronism&rdquo;
                routine that briefly parallels generator and DNO during weekly testing.
                This brings the installation into G99 scope.
              </>
            }
            whatToDo={
              <>
                Install a G99-compliant generator interface protection panel: under-/
                over-voltage relay (BS EN 60255), under-/over-frequency relay,
                rate-of-change-of-frequency (RoCoF) relay, vector-shift relay, and
                loss-of-mains protection. Submit the G99 connection application to the
                DNO with the protection settings, witness-test the interlocks before
                the first parallel run, and update the installation&rsquo;s O&amp;M
                manuals. Operate parallel only within DNO-agreed periods.
              </>
            }
            whyItMatters={
              <>
                Uncontrolled paralleling of a building generator with the DNO can
                back-feed an outage and electrocute DNO staff working on what they
                believe is dead network. G99 protection (or G98 for &le; 16 A
                single-phase / 16 A per phase 3-phase generators) is non-negotiable.
                The HNC engineer&rsquo;s sign-off on the protection scheme is the
                building&rsquo;s legal evidence.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Synchronous machine: rotor locked to supply frequency &mdash; n&#x209b; = 120f/p, no slip.',
              'Field excitation controls pf &mdash; under-excited absorbs kVAr (lagging), normally-excited unity, over-excited delivers kVAr (leading).',
              'Synchronous condenser: idling synchronous motor over-excited to deliver leading kVAr for grid-scale PF correction.',
              'PMSM (permanent-magnet synchronous): no field winding, no slip, IE4&ndash;IE5 efficiency &mdash; high-end variable-speed duty.',
              'Hunting: damped by amortisseur (cage) winding on the rotor &mdash; prevents oscillation around steady speed.',
              'Alternator synchronisation: equal voltage, equal frequency, equal phase, equal phase sequence &mdash; the four required matches before closing the breaker.',
              'BS 7671 Reg 551 governs LV generating sets &mdash; isolation, parallel operation, automatic disconnection.',
              'ENA G99 for parallel-running generators &gt; 16 A per phase; G98 for smaller; G100 for export limitation.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section5-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Induction motors (construction, operation, performance)
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section5-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                DC machines (types, control, applications)
              </div>
            </button>
          </div>

        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section5_5;
