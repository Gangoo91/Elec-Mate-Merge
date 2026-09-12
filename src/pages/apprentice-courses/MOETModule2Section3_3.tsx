/**
 * MOET · Module 2 · Section 2.3 · Subsection 3 — Synchronous Motors and
 * Generators
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
 *   · "Electrical. Principles of single phase and three-phase equipment,
 *     plant, and systems, the operation of motors and generators, and the
 *     use…"
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import { ACGenerator, FlemingsRightHandRule } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Synchronous Motors and Generators - MOET Module 2.3.3';
const DESCRIPTION =
  'Understand synchronous machines: synchronous speed, excitation, power factor control, alternators, frequency-pole relationships, parallel operation, and applications for electrical maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'sync-speed-calc',
    question:
      'A synchronous motor has 6 poles and operates on a 50Hz supply. What is its running speed?',
    options: ['750 rev/min', '1,500 rev/min', '1,000 rev/min', '3,000 rev/min'],
    correctIndex: 2,
    explanation:
      'Synchronous speed = (120 x f) / p = (120 x 50) / 6 = 1,000 rev/min. Unlike induction motors, a synchronous motor runs at exactly synchronous speed — there is no slip. The rotor locks into step with the rotating stator field.',
  },
  {
    id: 'excitation-pf',
    question:
      'How does adjusting the DC excitation current of a synchronous motor affect its power factor?',
    options: [
      'Changing excitation has no effect on power factor — only the mechanical load does',
      'Reducing excitation below the normal value forces the motor to a leading power factor',
      'Increasing excitation beyond the normal value causes the motor to operate at a leading power factor',
      'Increasing excitation always drives the power factor towards unity regardless of level',
    ],
    correctIndex: 2,
    explanation:
      "A synchronous motor's power factor is controlled by its DC field excitation. Under-excited: lagging power factor (absorbs reactive power like an inductor). Normal excitation: unity power factor. Over-excited: leading power factor (generates reactive power like a capacitor). This is why synchronous motors are sometimes used as synchronous condensers for power factor correction.",
  },
  {
    id: 'parallel-gen-requirements',
    question:
      'Before connecting an alternator in parallel with the grid, which parameters must be matched?',
    options: [
      'Voltage magnitude, frequency, phase sequence, and phase angle',
      'Voltage magnitude and frequency only — phase angle adjusts itself',
      'Power factor, load current, winding temperature, and earth resistance',
      'Frequency and phase angle only — voltage is matched after closing',
    ],
    correctIndex: 0,
    explanation:
      'All four parameters must be matched: voltage magnitude (adjust field excitation), frequency (adjust prime mover speed), phase sequence (check once during commissioning), and phase angle (use a synchroscope or synchronising lamps to close the breaker at the exact moment of synchronism). Failure to synchronise correctly causes massive surge currents that can damage the generator and associated equipment.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the fundamental difference between a synchronous motor and an induction motor?',
    options: [
      'A synchronous motor has no rotor windings, relying entirely on the stator field',
      'A synchronous motor runs at exactly synchronous speed with no slip, using DC excitation on the rotor',
      'A synchronous motor always runs faster than synchronous speed when loaded',
      'A synchronous motor can only operate on a DC supply, not on AC',
    ],
    correctAnswer: 1,
    explanation:
      "The key difference is that a synchronous motor has a DC-excited rotor field that locks into step with the rotating stator field, running at exactly synchronous speed (zero slip). An induction motor's rotor relies on induced currents and always runs below synchronous speed.",
  },
  {
    id: 2,
    question: 'The frequency of the output voltage of an alternator is determined by:',
    options: [
      'The DC field excitation current and the load power factor',
      'The terminal voltage and the cross-sectional area of the stator windings',
      'The rotor speed and the number of poles: f = (p x N) / 120',
      'The connected load and the rated kVA of the machine',
    ],
    correctAnswer: 2,
    explanation:
      'The frequency is determined by the speed of rotation (N, in rev/min) and the number of poles (p): f = (p x N) / 120. For a 50Hz output: a 2-pole alternator must run at 3,000 rev/min, a 4-pole at 1,500 rev/min, etc. The prime mover speed must be precisely controlled to maintain correct frequency.',
  },
  {
    id: 3,
    question: "What is a 'synchronous condenser'?",
    options: [
      'A capacitor bank that is switched in step with the supply frequency',
      'A device that converts the AC excitation supply into smooth DC for the rotor',
      'A synchronous generator driven faster than synchronous speed to export power',
      'A synchronous motor running without mechanical load, used solely for power factor correction by varying its excitation',
    ],
    correctAnswer: 3,
    explanation:
      'A synchronous condenser is a synchronous motor running at no load (or very light load) with its excitation adjusted to generate reactive power (leading power factor). Over-excited, it behaves like a large capacitor connected to the supply, providing power factor correction. They are used at large industrial sites and grid substations.',
  },
  {
    id: 4,
    question: 'Why does a synchronous motor require special starting arrangements?',
    options: [
      'Because it has no starting torque of its own — the rotor must be brought close to synchronous speed before it can lock into step with the rotating field',
      'Because the DC field winding draws a dangerously high inrush current at standstill',
      'Because the stator windings cannot be energised until the rotor is already turning',
      'Because the supply frequency must be reversed before the rotor will accelerate',
    ],
    correctAnswer: 0,
    explanation:
      'A synchronous motor has no inherent starting torque because the DC-excited rotor cannot accelerate from standstill to synchronous speed before the rotating field moves past it. Starting methods include: amortisseur (damper) windings on the rotor (which provide induction motor starting torque), a small pony motor, or a variable frequency drive that ramps up the supply frequency.',
  },
  {
    id: 5,
    question: 'In a three-phase alternator, the three stator windings are displaced by:',
    options: [
      '90 electrical degrees',
      '120 electrical degrees',
      '60 electrical degrees',
      '180 electrical degrees',
    ],
    correctAnswer: 1,
    explanation:
      'The three stator windings of a three-phase alternator are physically displaced by 120 electrical degrees around the stator bore. As the rotor (field) rotates past each winding in turn, it generates three sinusoidal voltages displaced by 120 degrees — the balanced three-phase supply.',
  },
  {
    id: 6,
    question: "What is the 'pull-out torque' of a synchronous motor?",
    options: [
      'The torque produced by the damper windings during starting from standstill',
      'The minimum torque needed to pull the rotor into synchronism at start-up',
      'The maximum torque the motor can develop while remaining in synchronism — exceeding this causes the motor to lose synchronism and stall',
      'The torque lost to friction and windage when the motor runs unloaded',
    ],
    correctAnswer: 2,
    explanation:
      'Pull-out torque is the maximum torque a synchronous motor can produce while maintaining synchronous speed. If the mechanical load exceeds the pull-out torque, the rotor falls out of step with the stator field (loses synchronism), and the motor stalls. Pull-out torque is typically 1.5 to 2.5 times rated torque and depends on the excitation level.',
  },
  {
    id: 7,
    question:
      'A steam turbine generator has 2 poles and must produce 50Hz. What speed must the turbine operate at?',
    options: ['1,500 rev/min', '1,000 rev/min', '750 rev/min', '3,000 rev/min'],
    correctAnswer: 3,
    explanation:
      'N = (120 x f) / p = (120 x 50) / 2 = 3,000 rev/min. Steam turbines are high-speed machines, so they typically drive 2-pole generators at 3,000 rev/min for 50Hz output. By contrast, a hydroelectric generator with many poles (e.g., 40 poles) runs at only 150 rev/min.',
  },
  {
    id: 8,
    question:
      "What is the purpose of 'damper windings' (amortisseur windings) on a synchronous motor rotor?",
    options: [
      'To provide starting torque (by induction motor action) and to damp oscillations during load changes',
      'To supply the DC excitation current directly to the main field poles',
      'To increase the pull-out torque so the motor can carry heavier overloads',
      'To regulate the output voltage as the mechanical load on the motor changes',
    ],
    correctAnswer: 0,
    explanation:
      'Damper windings are short-circuited copper or aluminium bars embedded in the rotor pole faces — similar to a squirrel cage. At starting, with the DC field de-energised, they provide induction motor starting torque. During running, they damp out hunting oscillations that occur when the load changes suddenly.',
  },
  {
    id: 9,
    question:
      'When an alternator is operating in parallel with the grid, increasing the prime mover fuel input causes:',
    options: [
      'The output frequency to rise above the grid frequency',
      'The real power (kW) output to increase — the grid holds the frequency constant',
      'The reactive power (kVAr) output to increase while real power stays fixed',
      'The terminal voltage to rise while the power output stays unchanged',
    ],
    correctAnswer: 1,
    explanation:
      'When paralleled with a large grid (effectively an infinite bus), the grid controls the frequency and voltage. Increasing the prime mover power input increases the rotor angle (load angle) relative to the grid, which increases the real power (kW) output. To change reactive power (kVAr), you adjust the field excitation instead.',
  },
  {
    id: 10,
    question:
      'What instrument is used to determine the exact moment for closing the paralleling breaker when synchronising an alternator?',
    options: [
      'A tachometer — it confirms the rotor has reached synchronous speed',
      'A power factor meter — it confirms the machine is at unity power factor',
      'A synchroscope — it shows the frequency difference and phase angle between the incoming machine and the busbar',
      'A phase rotation meter — it confirms the phase sequence matches the busbar',
    ],
    correctAnswer: 2,
    explanation:
      "A synchroscope is a rotating pointer instrument that indicates the frequency difference and relative phase angle between the incoming alternator and the busbar. The breaker should be closed when the pointer is at the 12 o'clock position (zero phase angle) and rotating slowly in the 'fast' direction. Modern digital synchronisers automate this process.",
  },
  {
    id: 11,
    question: 'Hunting in a synchronous motor refers to:',
    options: [
      'The gradual rise in winding temperature when the motor runs at full load',
      'The search for the correct excitation level to achieve unity power factor',
      'The momentary surge of current drawn the instant the motor is switched on',
      'Oscillation of the rotor about its equilibrium position, caused by sudden load changes or supply disturbances',
    ],
    correctAnswer: 3,
    explanation:
      'Hunting is the oscillation of the rotor angle about its steady-state position following a sudden load change, supply disturbance, or cyclic torque variation. The rotor swings back and forth about synchronous speed, causing current and power pulsations. Damper windings help suppress hunting by generating opposing torques during oscillation.',
  },
  {
    id: 12,
    question:
      'What type of prime mover is typically used with a high-pole-number (e.g., 40-pole) synchronous generator?',
    options: [
      'A hydroelectric turbine at low speed (e.g., 150 rev/min)',
      'A steam turbine at high speed (e.g., 3,000 rev/min)',
      'A gas turbine at high speed (e.g., 3,000 rev/min)',
      'A high-speed two-pole aero-derivative turbine',
    ],
    correctAnswer: 0,
    explanation:
      'Hydroelectric generators typically use many poles because the water turbine operates at low speed. For 50Hz with 40 poles: N = (120 x 50) / 40 = 150 rev/min. The large-diameter, low-speed design suits the high torque, low speed characteristics of water turbines. By contrast, steam and gas turbines are high-speed, low-pole machines.',
  },
];

const faqs = [
  {
    question: 'Why are synchronous motors less common than induction motors in industry?',
    answer:
      'Synchronous motors require a DC excitation supply (from a separate exciter or through brushless excitation), have more complex construction, higher initial cost, require special starting arrangements, and need more skilled maintenance. However, they are preferred for large drives (above about 1 MW) where their ability to operate at unity or leading power factor, provide precise constant speed, and deliver high efficiency at full load justifies the additional complexity and cost.',
  },
  {
    question: 'What happens if a synchronous motor loses its DC excitation while running?',
    answer:
      'If excitation is lost, the motor loses its synchronous torque. Depending on the load, it may continue to run as an induction motor using the damper windings, but at reduced torque and with high stator currents. The motor will slow down (slip increases) and draw excessive current, causing overheating. Protection systems should detect loss of excitation and trip the motor. If the load is too high, the motor will stall.',
  },
  {
    question: 'What is the difference between a salient pole and a cylindrical rotor?',
    answer:
      'A salient pole rotor has projecting poles with concentrated windings — used for low-speed machines with many poles (e.g., hydroelectric generators). A cylindrical (round) rotor has the field winding distributed in slots machined into a solid steel forging — used for high-speed 2-pole and 4-pole machines driven by steam or gas turbines. The cylindrical rotor is mechanically stronger and better balanced at high speeds.',
  },
  {
    question: 'Can a synchronous generator operate at leading power factor?',
    answer:
      'Yes. When a synchronous generator is under-excited (reduced DC field current), it operates at a leading power factor, absorbing reactive power from the system. When over-excited, it operates at a lagging power factor, generating reactive power. This ability to control reactive power exchange is one of the key advantages of synchronous machines for grid voltage regulation.',
  },
  {
    question: 'What maintenance is specific to synchronous machines compared to induction motors?',
    answer:
      'In addition to standard motor maintenance (bearings, insulation, alignment), synchronous machines require: brush and slip ring inspection and maintenance (for brush-type excitation), exciter inspection and testing, field winding insulation resistance testing, damper winding bar inspection, and checking synchronising equipment. For generators: AVR (automatic voltage regulator) calibration, protection relay testing, and regular load bank testing of standby sets.',
  },
];

const MOETModule2Section3_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.3 · Subsection 3"
        title="Synchronous Motors and Generators"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Synchronous speed, DC excitation, power factor control, alternators, and parallel
            operation for electrical maintenance.
          </p>

          <TLDR
            points={[
              'Speed: runs at exactly synchronous speed — zero slip.',
              'Excitation: DC field on the rotor locks it to the stator rotating field.',
              'Power factor: controllable — under/over excitation adjusts leading/lagging PF.',
              'Generators: frequency = (p x N) / 120 — must synchronise before paralleling.',
            ]}
          />

          <ConceptBlock title="Why this matters">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Power generation:</strong> every power station uses synchronous generators.
              </li>
              <li>
                <strong>Large drives:</strong> used for drives above ~1 MW (compressors, mills,
                pumps).
              </li>
              <li>
                <strong>PF correction:</strong> synchronous condensers correct site power factor.
              </li>
              <li>
                <strong>ST1426:</strong> understand synchronous machine principles and maintenance.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the principle of synchronous motor operation and how it differs from an induction motor',
              'Describe the relationship between frequency, speed, and number of poles in synchronous machines',
              'Explain how DC excitation controls power factor in a synchronous motor',
              'Describe the construction and operation of alternators (synchronous generators)',
              'State the requirements for paralleling a generator with the grid or another generator',
              'Identify maintenance requirements specific to synchronous machines',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Synchronous motor principles</ContentEyebrow>

          <ConceptBlock title="Locked into step with the rotating field">
            <p>
              A synchronous motor operates at exactly synchronous speed — the speed of the rotating
              magnetic field produced by the stator windings. Unlike an induction motor, where the
              rotor always lags behind the field (slip), a synchronous motor's rotor locks into step
              with the rotating field and rotates at the same speed. This is achieved by providing a
              separate DC excitation to the rotor, creating fixed magnetic poles that are attracted
              to the rotating stator field and pulled along with it.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key characteristics">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded border border-blue-500/20 bg-blue-500/10 p-3">
                <p className="mb-2 text-sm font-medium text-blue-400">Synchronous Motor</p>
                <ul className="list-disc space-y-1.5 pl-5 marker:text-blue-400/70">
                  <li>Runs at exactly synchronous speed</li>
                  <li>Zero slip under all load conditions</li>
                  <li>Requires DC excitation on rotor</li>
                  <li>Power factor controllable</li>
                  <li>No inherent starting torque</li>
                  <li>More expensive and complex</li>
                </ul>
              </div>
              <div className="rounded border border-purple-500/20 bg-purple-500/10 p-3">
                <p className="mb-2 text-sm font-medium text-purple-400">
                  Induction Motor (comparison)
                </p>
                <ul className="list-disc space-y-1.5 pl-5 marker:text-purple-400/70">
                  <li>Runs below synchronous speed</li>
                  <li>Slip increases with load (3-6%)</li>
                  <li>No external excitation needed</li>
                  <li>Always operates at lagging PF</li>
                  <li>Self-starting</li>
                  <li>Simpler, cheaper, more robust</li>
                </ul>
              </div>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Starting a synchronous motor">
            <p>
              A synchronous motor cannot start from standstill under its own synchronous torque —
              the rotating field moves past the stationary rotor too quickly for the DC-excited
              poles to lock on. Special starting arrangements are required:
            </p>
            <div className="space-y-3">
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-white">
                  Damper (Amortisseur) Winding Starting
                </p>
                <p className="text-xs text-white">
                  The most common method. Short-circuited bars embedded in the rotor pole faces act
                  as a squirrel cage, providing induction motor starting torque. The motor
                  accelerates to near synchronous speed with the DC field de-energised, then the
                  field is energised and the rotor pulls into synchronism.
                </p>
              </div>
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-white">Pony Motor Starting</p>
                <p className="text-xs text-white">
                  A small auxiliary motor (pony motor) mechanically coupled to the synchronous motor
                  shaft accelerates it to near synchronous speed. The DC field is then energised and
                  the motor synchronises. The pony motor is then disconnected or declutched.
                </p>
              </div>
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-white">
                  Variable Frequency Drive (VFD) Starting
                </p>
                <p className="text-xs text-white">
                  The supply frequency is started at a very low value and gradually increased,
                  bringing the synchronous motor up to speed without the rotor ever falling out of
                  step. This is the modern preferred method for large synchronous motors.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <ConceptBlock title="The load angle">
            <p>
              When a synchronous motor is loaded, the rotor poles do not align exactly with the
              stator field poles — the rotor lags behind by an angle called the load angle (delta).
              As mechanical load increases, the load angle increases. At the pull-out torque
              (typically 1.5 to 2.5 times rated torque), the load angle reaches a critical value
              (typically about 90 degrees for a cylindrical rotor). If the load exceeds this, the
              motor loses synchronism and stalls.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Power factor control and excitation</ContentEyebrow>

          <ConceptBlock title="A capability no induction motor possesses">
            <p>
              One of the most valuable characteristics of a synchronous motor is its ability to
              operate at a controllable power factor. By adjusting the DC excitation current, the
              motor can be made to operate at unity, lagging, or leading power factor — a capability
              that no induction motor possesses.
            </p>
          </ConceptBlock>

          <ConceptBlock title="V-curves — excitation vs stator current">
            <p>
              The relationship between DC excitation and stator current for a synchronous motor at
              constant load produces a characteristic V-shaped curve:
            </p>
            <div className="space-y-3">
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-amber-400">
                  Under-Excited (low DC field current)
                </p>
                <p className="text-xs text-white">
                  The motor operates at a lagging power factor — it absorbs reactive power from the
                  supply, similar to an induction motor. Stator current is relatively high.
                </p>
              </div>
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-green-400">
                  Normal Excitation (unity power factor)
                </p>
                <p className="text-xs text-white">
                  At the correct excitation level, the motor operates at unity power factor — stator
                  current is at its minimum for a given load. This is the bottom of the V-curve.
                </p>
              </div>
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-blue-400">
                  Over-Excited (high DC field current)
                </p>
                <p className="text-xs text-white">
                  The motor operates at a leading power factor — it generates reactive power, acting
                  like a capacitor connected to the supply. Stator current increases again. This
                  mode is used for power factor correction.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Synchronous condensers">
            <div className="rounded-lg border-l-2 border-green-500/50 bg-green-500/10 p-4">
              <p className="mb-3 text-sm text-white">
                A synchronous condenser is a synchronous motor running at no mechanical load,
                operated in the over-excited condition solely to generate reactive power for power
                factor correction.
              </p>
              <ul className="list-disc space-y-1.5 pl-5 marker:text-green-400/70">
                <li>Continuously variable reactive power output (unlike fixed capacitor banks)</li>
                <li>Can both generate and absorb reactive power (adjusting excitation)</li>
                <li>Used at large industrial sites and grid substations</li>
                <li>
                  Being reintroduced to provide grid inertia as conventional generators are replaced
                  by renewables
                </li>
                <li>
                  Maintenance: bearings, brushes/slip rings, exciter, cooling — similar to any
                  synchronous machine
                </li>
              </ul>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Excitation systems">
            <div className="space-y-3">
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-white">Brushless Excitation</p>
                <p className="text-xs text-white">
                  An AC exciter (small alternator) mounted on the same shaft has its output
                  rectified by rotating diodes and fed directly to the main field winding. No
                  brushes or slip rings — reduced maintenance. Controlled by the automatic voltage
                  regulator (AVR) which adjusts the exciter field current.
                </p>
              </div>
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-white">
                  Static Excitation (Brush-Type)
                </p>
                <p className="text-xs text-white">
                  DC from a controlled rectifier is fed to the rotor field winding through slip
                  rings and brushes. Faster response than brushless systems but requires brush
                  maintenance. Used on many older and some modern large machines.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Alternators (synchronous generators)</ContentEyebrow>

          <ConceptBlock title="Every power station uses one">
            <p>
              An alternator is a synchronous generator that converts mechanical energy from a prime
              mover (turbine, engine, or wind turbine) into three-phase AC electrical energy. Every
              power station, every standby generator, and every wind turbine uses a synchronous
              generator. Understanding alternator principles is essential for maintenance
              technicians working with standby power systems.
            </p>
          </ConceptBlock>

          <ACGenerator />

          <ConceptBlock title="Frequency and pole relationship">
            <div className="rounded bg-black/30 p-3 text-sm text-white">
              <p className="font-mono">f = (p x N) / 120</p>
              <p className="mt-2 text-xs text-white">
                Where: f = frequency (Hz), p = number of poles, N = speed (rev/min)
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Prime Mover</th>
                    <th className="py-2 pr-4 font-medium text-white">Typical Poles</th>
                    <th className="py-2 pr-4 font-medium text-white">Speed for 50Hz</th>
                    <th className="py-2 font-medium text-white">Rotor Type</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Steam turbine</td>
                    <td className="py-2 pr-4">2</td>
                    <td className="py-2 pr-4">3,000 rev/min</td>
                    <td className="py-2">Cylindrical</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Gas turbine</td>
                    <td className="py-2 pr-4">2 or 4</td>
                    <td className="py-2 pr-4">3,000 or 1,500</td>
                    <td className="py-2">Cylindrical</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Diesel engine</td>
                    <td className="py-2 pr-4">4 to 8</td>
                    <td className="py-2 pr-4">1,500 to 750</td>
                    <td className="py-2">Salient pole</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Hydro turbine</td>
                    <td className="py-2 pr-4">12 to 80+</td>
                    <td className="py-2 pr-4">500 to 75</td>
                    <td className="py-2">Salient pole</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <FlemingsRightHandRule />

          <ConceptBlock title="Voltage regulation">
            <p>
              The output voltage of an alternator varies with load due to the armature reaction
              effect and the impedance voltage drop in the stator windings. The automatic voltage
              regulator (AVR) continuously adjusts the DC field excitation to maintain constant
              output voltage as the load changes.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Resistive load:</strong> moderate voltage drop — AVR increases excitation
                slightly
              </li>
              <li>
                <strong>Inductive load (lagging PF):</strong> large voltage drop — AVR must increase
                excitation significantly
              </li>
              <li>
                <strong>Capacitive load (leading PF):</strong> voltage may rise — AVR reduces
                excitation
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Rotor construction">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded border border-blue-500/20 bg-blue-500/10 p-3">
                <p className="mb-2 text-sm font-medium text-blue-400">Salient Pole Rotor</p>
                <ul className="list-disc space-y-1 pl-4 text-xs marker:text-blue-400/70">
                  <li>Projecting poles with concentrated field coils</li>
                  <li>Large diameter, short axial length</li>
                  <li>4 or more poles — used for low-speed machines</li>
                  <li>Hydro generators, diesel generator sets</li>
                  <li>Damper bars fitted in pole face slots</li>
                </ul>
              </div>
              <div className="rounded border border-purple-500/20 bg-purple-500/10 p-3">
                <p className="mb-2 text-sm font-medium text-purple-400">
                  Cylindrical (Round) Rotor
                </p>
                <ul className="list-disc space-y-1 pl-4 text-xs marker:text-purple-400/70">
                  <li>Distributed field winding in machined slots</li>
                  <li>Small diameter, long axial length</li>
                  <li>2 or 4 poles — used for high-speed machines</li>
                  <li>Steam turbine and gas turbine generators</li>
                  <li>Solid steel forging — high mechanical strength</li>
                </ul>
              </div>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Parallel operation and synchronisation</ContentEyebrow>

          <ConceptBlock title="Synchronised before paralleling">
            <p>
              In many installations — power stations, data centres, hospitals, and industrial plants
              — multiple generators operate in parallel to share the electrical load. Before a
              generator can be connected in parallel with the grid or another running generator, it
              must be synchronised to prevent catastrophic damage.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Synchronising requirements — all four must be matched">
            <div className="rounded-lg border-l-2 border-red-500/50 bg-red-500/10 p-4">
              <div className="space-y-3">
                <div className="rounded bg-black/30 p-3">
                  <p className="mb-1 text-sm font-medium text-white">1. Voltage Magnitude</p>
                  <p className="text-xs text-white">
                    The incoming generator's terminal voltage must match the busbar voltage.
                    Adjusted by varying the DC field excitation (AVR setpoint). A voltage mismatch
                    causes large circulating currents (reactive power flow) when the breaker closes.
                  </p>
                </div>
                <div className="rounded bg-black/30 p-3">
                  <p className="mb-1 text-sm font-medium text-white">2. Frequency</p>
                  <p className="text-xs text-white">
                    The incoming generator's frequency must closely match the busbar frequency.
                    Adjusted by varying the prime mover speed (governor setpoint). Ideally, the
                    incoming machine should be running very slightly fast (0.1-0.5Hz above busbar
                    frequency) so the breaker closes while the phase angle is slowly advancing.
                  </p>
                </div>
                <div className="rounded bg-black/30 p-3">
                  <p className="mb-1 text-sm font-medium text-white">3. Phase Sequence</p>
                  <p className="text-xs text-white">
                    The phase sequence (rotation direction of the three-phase system) of the
                    incoming generator must match the busbar. Verified once during commissioning
                    using a phase rotation meter. Incorrect phase sequence would result in a short
                    circuit when the breaker closes.
                  </p>
                </div>
                <div className="rounded bg-black/30 p-3">
                  <p className="mb-1 text-sm font-medium text-white">4. Phase Angle (In-Phase)</p>
                  <p className="text-xs text-white">
                    The breaker must close at the instant when the voltages of the incoming
                    generator and the busbar are exactly in phase (zero phase difference). Monitored
                    using a synchroscope or synchronising lamps. Modern automatic synchronisers
                    handle this precisely.
                  </p>
                </div>
              </div>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Load sharing between parallel generators">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Real power (kW) sharing:</strong> controlled by the governor droop settings
                — increasing fuel to one machine increases its share of the real power load
              </li>
              <li>
                <strong>Reactive power (kVAr) sharing:</strong> controlled by the AVR droop settings
                — increasing excitation on one machine increases its share of the reactive power
              </li>
              <li>
                <strong>Isochronous mode:</strong> one generator controls frequency (isochronous
                governor), others follow with droop — used in island mode (no grid connection)
              </li>
              <li>
                <strong>Grid parallel:</strong> the grid is effectively an infinite bus — it
                controls frequency and voltage; the generator's real and reactive power output are
                adjusted by governor and AVR
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="ST1426 maintenance competency">
            <p>
              The Level 3 apprenticeship standard requires you to understand the principles of
              synchronous machines, including starting methods, excitation systems, and the
              requirements for parallel operation. You should be able to assist with generator
              maintenance, interpret test results, and understand the safety implications of working
              on synchronous machines — particularly the risk of back-feed from generators and
              stored magnetic energy.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'A synchronous motor runs at exactly synchronous speed — zero slip — because a DC-excited rotor locks into step with the stator field.',
              'Synchronous speed and alternator frequency both follow N = (120 x f) / p (or f = (p x N) / 120).',
              'Under-excited: lagging power factor. Normal excitation: unity power factor. Over-excited: leading power factor.',
              'A synchronous motor has no inherent starting torque — damper windings, a pony motor, or a VFD are used to bring it up to speed.',
              'Before paralleling, all four parameters must be matched: voltage magnitude, frequency, phase sequence, and phase angle.',
              'Pull-out torque is the maximum torque a synchronous motor can develop while remaining in synchronism — typically 1.5 to 2.5 times rated torque.',
              'A synchronous condenser is a synchronous motor run at no load, over-excited solely to generate reactive power for power factor correction.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge — Synchronous Machines" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section3-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Induction Motors
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section3-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">DC Motors</div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section3_3;
