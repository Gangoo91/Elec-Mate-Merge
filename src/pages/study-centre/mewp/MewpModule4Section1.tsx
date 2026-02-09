import {
  ArrowLeft,
  Gauge,
  CheckCircle,
  AlertTriangle,
  Joystick,
  ShieldAlert,
  OctagonX,
  ClipboardCheck,
  ListOrdered,
  Info,
  Wrench,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'mewp-m4s1-deadman',
    question:
      'What type of control system requires the operator to continuously hold the lever or button for the machine to move?',
    options: [
      'Proportional control',
      'Deadman (hold-to-run) control',
      'Toggle lock control',
      'Cruise control',
    ],
    correctIndex: 1,
    explanation:
      'Deadman (hold-to-run) controls require continuous operator input. When the lever or button is released, the machine function stops immediately. This prevents uncontrolled movement if the operator becomes incapacitated.',
  },
  {
    id: 'mewp-m4s1-ground-override',
    question:
      'When the ground controls are activated on a MEWP, what typically happens to the platform controls?',
    options: [
      'Both sets of controls operate simultaneously',
      'The platform controls are overridden by the ground controls',
      'The platform controls lock the ground controls out',
      'An alarm sounds but both sets remain active',
    ],
    correctIndex: 1,
    explanation:
      'Activating the ground controls typically overrides the platform controls. This is a critical safety feature that allows the ground rescue person to take full control of the machine in an emergency, even if the platform operator is incapacitated.',
  },
  {
    id: 'mewp-m4s1-estop-lower',
    question: 'What happens to the platform when an emergency stop button is pressed?',
    options: [
      'The platform automatically lowers to ground level',
      'All machine functions stop immediately — the platform does NOT lower',
      'The platform locks at its current height and an alarm sounds',
      'The boom retracts to its stowed position',
    ],
    correctIndex: 1,
    explanation:
      'Pressing the emergency stop halts ALL machine functions immediately. It does NOT lower the platform — it simply stops all movement. To lower the platform after an emergency stop, the button must be reset and the auxiliary/emergency lowering system used if normal controls are unavailable.',
  },
];

const faqs = [
  {
    question:
      'What should I do if I am unfamiliar with the specific make and model of MEWP on site?',
    answer:
      'You must complete a familiarisation session on that specific machine before operating it. Even if you hold a valid PAL card for the correct category, every make and model has different control layouts, emergency lowering procedures, and operating characteristics. The site supervisor or machine owner should provide familiarisation, and you should not operate the machine until you are confident with all controls and emergency systems.',
  },
  {
    question:
      'Can I skip the function test if the machine was used by another operator earlier the same day?',
    answer:
      'No. Every operator must complete their own pre-start checks and function test before working at height, regardless of whether another operator has already used the machine that day. Conditions may have changed, a fault may have developed, or the previous operator may not have identified an issue. The function test is your personal verification that the machine is safe for you to use.',
  },
  {
    question: 'What is the difference between an emergency stop and the emergency lowering system?',
    answer:
      'The emergency stop (red mushroom-head button) halts all machine functions immediately but does NOT lower the platform. It is a stop mechanism, not a lowering mechanism. The emergency lowering system (APU, manual lowering valve, hand pump, or engine override) is a separate system specifically designed to bring the platform back to ground level when normal controls have failed or the operator is incapacitated.',
  },
  {
    question: 'Who is responsible for knowing the emergency lowering procedure?',
    answer:
      'Both the platform operator AND the nominated ground rescue person must know the emergency lowering procedure for the specific machine in use. The ground rescue person must be trained on the ground controls and emergency lowering system before the operator begins working at height. If there is no competent ground rescue person present, work must not commence.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'How many steps are in the recommended pre-start procedure before operating a MEWP?',
    options: ['5', '8', '11', '15'],
    correctAnswer: 2,
    explanation:
      'The recommended pre-start procedure has 11 steps, starting with confirming your competence (valid PAL card) and ending with donning the correct PPE.',
  },
  {
    id: 2,
    question: 'What is the recommended minimum exclusion zone radius around a MEWP operating area?',
    options: ['3 metres', '5 metres', '10 metres', '15 metres'],
    correctAnswer: 2,
    explanation:
      'The recommended exclusion zone is a minimum of 10 metres radius around the MEWP operating area. This zone prevents unauthorised persons from entering the danger area during operation.',
  },
  {
    id: 3,
    question: 'What type of control returns to neutral when the operator releases the lever?',
    options: [
      'Toggle control',
      'Deadman (hold-to-run) control',
      'Latching control',
      'Cruise control',
    ],
    correctAnswer: 1,
    explanation:
      'Deadman (hold-to-run) controls automatically return to the neutral position when released, stopping all movement. This is a fundamental safety feature on MEWP controls.',
  },
  {
    id: 4,
    question: 'Who is permitted to use the MEWP ground controls during normal operation?',
    options: [
      'Any person on site',
      'Only the platform operator',
      'The nominated ground rescue person, or during setup, positioning, and familiarisation',
      'Only the site manager',
    ],
    correctAnswer: 2,
    explanation:
      'Ground controls are used by the nominated ground rescue person in an emergency, during machine setup and positioning, and during familiarisation and testing. The ground rescue person must be specifically trained on those controls.',
  },
  {
    id: 5,
    question:
      'Which of the following is NOT a type of emergency/auxiliary lowering system found on MEWPs?',
    options: [
      'Auxiliary Power Unit (APU)',
      'Manual lowering valve',
      'Automatic gravity descent',
      'Hand pump',
    ],
    correctAnswer: 2,
    explanation:
      "The four types of emergency lowering system are: Auxiliary Power Unit (APU), manual lowering valve, hand pump, and engine override. There is no 'automatic gravity descent' system — all emergency lowering requires deliberate activation by a trained person.",
  },
  {
    id: 6,
    question:
      'After pressing an emergency stop button, what must you do before the machine can be operated again?',
    options: [
      'Wait 60 seconds for the system to reset automatically',
      "Pull or twist the button to release it, then re-activate the machine per manufacturer's instructions",
      'Turn the ignition off and on again',
      'Press the emergency stop button a second time',
    ],
    correctAnswer: 1,
    explanation:
      "Emergency stop buttons are mechanically latched when pressed. To reset, you must pull or twist the button to release it, then re-activate the machine following the manufacturer's specific instructions.",
  },
  {
    id: 7,
    question:
      'At what height should you test ALL platform controls before proceeding to working height?',
    options: [
      'At ground level only',
      'At approximately 1 metre',
      'At half the maximum working height',
      'At the full working height',
    ],
    correctAnswer: 1,
    explanation:
      'You should raise the platform to approximately 1 metre and test all directional controls, boom functions, and both emergency stops (platform and ground). Testing at low height minimises risk if a fault is discovered during testing.',
  },
  {
    id: 8,
    question:
      'What must be confirmed about the ground rescue person BEFORE the operator begins working at height?',
    options: [
      'They hold a CSCS card',
      'They are present on site and trained on the specific ground controls of the machine in use',
      'They have a first aid certificate',
      'They have operated a MEWP within the last 12 months',
    ],
    correctAnswer: 1,
    explanation:
      'The nominated ground rescue person must be present, competent, and specifically trained on the ground controls and emergency lowering procedure for the exact machine in use. Generic MEWP knowledge is not sufficient — they must know the specific machine.',
  },
];

export default function MewpModule4Section1() {
  useSEO({
    title: 'Pre-Start Checks & Operating Controls | MEWP Module 4.1',
    description:
      'The 11-step pre-start procedure, platform controls, ground controls, auxiliary and emergency systems, emergency stop operation, and function testing before working at height.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/30 mb-4">
            <Gauge className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">
              MODULE 4 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Pre-Start Checks &amp; Operating Controls
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The 11-step pre-start procedure, platform and ground controls, auxiliary and emergency
            systems, emergency stops, and function testing before working at height
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Pre-Start:</strong> 11 steps before ANY operation
              </li>
              <li>
                <strong>Controls:</strong> Platform, ground &amp; emergency
              </li>
              <li>
                <strong>E-Stop:</strong> Stops ALL movement, does NOT lower
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Before:</strong> Complete all 11 steps, no shortcuts
              </li>
              <li>
                <strong>Test:</strong> All controls at low height (~1m) first
              </li>
              <li>
                <strong>Always:</strong> Know YOUR machine&rsquo;s emergency lowering procedure
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Complete the 11-step pre-start procedure in the correct order',
              'Identify and explain the primary platform controls',
              'Explain the purpose and operation of ground controls',
              'Describe the four types of emergency lowering system',
              'Explain how the emergency stop system works',
              'Carry out a full function test at low height before working',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ──────────────────────────────────────────────────────
            Section 01: The 11-Step Pre-Start Procedure
        ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The 11-Step Pre-Start Procedure
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before starting <strong>any</strong> MEWP operation, you must work through all 11
                steps of the pre-start procedure in order. This is not a shortcut-friendly process
                &mdash; every step exists because skipping it has directly contributed to serious
                incidents and fatalities. Completing these steps should become second nature, but
                must never become complacent routine.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ListOrdered className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">
                    The 11-Step Pre-Start Procedure
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      step: 1,
                      title: 'Confirm Competence',
                      desc: 'Valid PAL card for the machine category you are about to operate.',
                    },
                    {
                      step: 2,
                      title: 'Familiarisation',
                      desc: 'Complete familiarisation on the specific make and model if not previously completed.',
                    },
                    {
                      step: 3,
                      title: 'Review Risk Assessment & Method Statement',
                      desc: 'Read and understand the site-specific risk assessment and method statement for the task.',
                    },
                    {
                      step: 4,
                      title: 'Check Rescue Plan',
                      desc: 'Confirm the rescue plan is in place, documented, and communicated to all relevant persons.',
                    },
                    {
                      step: 5,
                      title: 'Confirm Ground Rescue Person',
                      desc: 'Nominated ground rescue person is present on site and competent with the ground controls of this specific machine.',
                    },
                    {
                      step: 6,
                      title: 'Complete Pre-Use Inspection',
                      desc: 'Carry out a thorough pre-use visual and functional inspection as covered in Module 3.',
                    },
                    {
                      step: 7,
                      title: 'Assess Ground Conditions',
                      desc: 'Check the ground at the work area for firmness, level, underground services, slopes, and obstructions.',
                    },
                    {
                      step: 8,
                      title: 'Check for Overhead Hazards',
                      desc: 'Look up! Identify power lines, structures, beams, pipes, lighting rigs, and any other overhead obstacles.',
                    },
                    {
                      step: 9,
                      title: 'Establish Exclusion Zones',
                      desc: 'Set up barriers and signage. Recommended minimum 10 metre radius around the operating area.',
                    },
                    {
                      step: 10,
                      title: 'Check Weather Conditions',
                      desc: "Assess wind speed (check manufacturer's limits), rain, ice, lightning risk, and visibility.",
                    },
                    {
                      step: 11,
                      title: 'Don Correct PPE',
                      desc: 'Full-body harness with short lanyard, hard hat (with chin strap), hi-vis vest, safety boots, and gloves as required.',
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">
                        {item.step}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="text-sm text-white/80">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">No Shortcuts</p>
                </div>
                <p className="text-sm text-white/80">
                  If <strong>any</strong> step cannot be completed satisfactorily &mdash; for
                  example, no ground rescue person is available, the rescue plan has not been
                  communicated, or the ground conditions are unsuitable &mdash;{' '}
                  <strong>do not proceed</strong> with the operation. Report the issue to your
                  supervisor immediately. No task is so urgent that it justifies bypassing safety.
                </p>
              </div>

              <p>
                This procedure aligns with IPAF best practice and the requirements of the Work at
                Height Regulations 2005. Each step addresses a specific hazard or legal duty, and
                together they form a comprehensive barrier against the most common causes of MEWP
                incidents.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────
            Section 02: Platform Controls (Primary)
        ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Platform Controls (Primary)
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The platform controls are located in the basket (work platform) and are the
                operator&rsquo;s primary controls during normal operation. These are the controls
                you will use most frequently, and you must be thoroughly familiar with their layout
                and function on every machine you operate.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Joystick className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Typical Platform Control Functions
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Boom / scissor raise and lower</strong> &mdash;
                      controls the vertical position of the platform
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Boom telescope in / out</strong> &mdash;
                      extends or retracts the boom (boom-type MEWPs only)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Slew left / right</strong> &mdash; rotates the
                      boom on its turntable (boom-type MEWPs only)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Drive forward / reverse</strong> &mdash; drives
                      the entire machine from the platform
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Steer left / right</strong> &mdash; directional
                      steering while driving
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Emergency stop button</strong> &mdash; red
                      mushroom-head button, halts all functions instantly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Horn</strong> &mdash; audible warning to alert
                      ground-level personnel
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">
                  Deadman &amp; Proportional Controls
                </p>
                <p className="text-sm text-white/80 mb-3">
                  All MEWP controls operate on a{' '}
                  <strong className="text-white">deadman (hold-to-run)</strong> principle: the
                  control must be actively held by the operator for the machine to move. When the
                  lever or button is released, it returns to neutral and movement stops immediately.
                </p>
                <p className="text-sm text-white/80">
                  Many modern machines also feature{' '}
                  <strong className="text-white">proportional controls</strong>: the further you
                  push the lever, the faster the movement. A gentle input produces slow, precise
                  movement; a full input produces maximum speed. This allows fine positioning when
                  working close to structures.
                </p>
              </div>

              <p>
                Control layouts vary between manufacturers and models, which is why familiarisation
                (Step 2 of the pre-start procedure) is essential. Never assume the controls are in
                the same position as the last machine you used. Always locate and identify every
                control &mdash; including the emergency stop &mdash; before operating.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ──────────────────────────────────────────────────────
            Section 03: Ground Controls (Primary)
        ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Ground Controls (Primary)
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every MEWP has a full set of controls at the base of the machine. These ground
                controls mirror the platform controls in function and provide complete operational
                capability from ground level. Understanding when and how these controls are used is
                critical to safe MEWP operations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-teal-400 mb-3">
                  When Ground Controls Are Used
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Emergency rescue</strong> &mdash; the ground
                      rescue person uses them to lower an incapacitated or stranded operator
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Setup and positioning</strong> &mdash; moving
                      the machine into position before the operator enters the basket
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Familiarisation and testing</strong> &mdash;
                      during pre-start function checks and operator training
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> Activating the ground
                  controls typically <strong>overrides the platform controls</strong>. This is a
                  deliberate safety feature. If the platform operator is incapacitated or
                  unresponsive, the ground rescue person can take full control of the machine from
                  ground level without needing the platform operator to release their controls.
                </p>
              </div>

              <p>
                The ground control panel is usually protected by a lockable cover and requires a key
                or a specific activation sequence to operate. This prevents unauthorised use. On
                most machines, a selector switch determines whether the platform or ground controls
                are active.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Requirement</p>
                </div>
                <p className="text-sm text-white/80">
                  The nominated ground rescue person{' '}
                  <strong className="text-white">
                    MUST be trained on the specific ground controls of the machine in use
                  </strong>
                  . Generic MEWP training is not sufficient. Ground control layouts differ between
                  manufacturers and models, and in an emergency there is no time to figure out
                  unfamiliar controls. The ground rescue person must be able to lower the platform
                  quickly and confidently.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────
            Section 04: Auxiliary and Emergency Controls
        ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Auxiliary and Emergency Controls
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In addition to the primary platform and ground controls, MEWPs are equipped with
                auxiliary and emergency systems designed to bring the platform back to ground level
                when normal controls have failed. Some machines also have auxiliary platform
                controls &mdash; backup controls in the basket that operate independently of the
                primary system &mdash; though not all machines include these.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">
                  Four Types of Emergency / Auxiliary Lowering System
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Different MEWP types use different emergency lowering methods. You must know which
                  system is fitted to YOUR machine before you begin work.
                </p>
              </div>

              {/* Comparison Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="h-4 w-4 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">
                      1. Auxiliary Power Unit (APU)
                    </p>
                  </div>
                  <p className="text-sm text-white/80">
                    An electric motor powered by the machine&rsquo;s battery, connected to a small
                    hydraulic pump. Provides powered lowering when the main engine or hydraulic
                    system has failed. Activated from the ground control panel.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="h-4 w-4 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">2. Manual Lowering Valve</p>
                  </div>
                  <p className="text-sm text-white/80">
                    A valve at the base of the machine that, when activated by pulling a handle,
                    allows gravity-assisted lowering. The hydraulic fluid is released in a
                    controlled manner, allowing the boom or scissor mechanism to descend under its
                    own weight.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="h-4 w-4 text-green-400" />
                    <p className="text-sm font-medium text-green-400">3. Hand Pump</p>
                  </div>
                  <p className="text-sm text-white/80">
                    A manual hydraulic pump, typically located at the base of the machine, that
                    allows a person to manually pump hydraulic fluid to lower the platform. Slow but
                    reliable &mdash; does not depend on any electrical or engine power.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="h-4 w-4 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">4. Engine Override</p>
                  </div>
                  <p className="text-sm text-white/80">
                    The ability to bypass the normal control circuits and operate the hydraulics
                    directly from the engine. Used when the electronic control system has failed but
                    the engine and hydraulics are still functional.
                  </p>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Know YOUR Machine</p>
                </div>
                <p className="text-sm text-white/80">
                  Each machine type has different emergency lowering procedures, and the location of
                  controls varies between manufacturers.{' '}
                  <strong className="text-white">
                    ALWAYS identify and understand the emergency lowering system for the specific
                    machine you are about to operate
                  </strong>{' '}
                  as part of your familiarisation. In a genuine emergency, you will not have time to
                  read the manual.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-white/60" />
                  <p className="text-sm font-medium text-white">Auxiliary Platform Controls</p>
                </div>
                <p className="text-sm text-white/80">
                  Some MEWPs &mdash; particularly larger boom-type machines &mdash; have auxiliary
                  controls in the basket that operate independently of the primary platform
                  controls. These provide a backup if the primary control system fails while the
                  operator is elevated. Not all machines have these, so check during
                  familiarisation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ──────────────────────────────────────────────────────
            Section 05: Emergency Stop Systems
        ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Emergency Stop Systems
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every MEWP is fitted with emergency stop buttons on the platform{' '}
                <strong>and</strong> at ground level. These are immediately recognisable: large,
                red, mushroom-head buttons designed to be struck quickly in an emergency.
                Understanding what they do &mdash; and what they do <strong>not</strong> do &mdash;
                is essential.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <OctagonX className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">How Emergency Stops Work</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Press</p>
                      <p className="text-sm text-white/80">
                        Pressing ANY emergency stop button immediately halts ALL machine functions.
                        All hydraulic, electrical, and drive systems are disabled.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Reset</p>
                      <p className="text-sm text-white/80">
                        To reset, pull or twist the button to release the mechanical latch. The
                        button will pop back out to its normal position.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Re-activate</p>
                      <p className="text-sm text-white/80">
                        Follow the manufacturer&rsquo;s specific re-activation procedure to restore
                        normal operation. This varies between machines.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Understanding</p>
                </div>
                <p className="text-sm text-white/80">
                  Emergency stops <strong className="text-white">do NOT lower the platform</strong>.
                  They simply stop all movement. The platform will remain at whatever height it was
                  at when the button was pressed. This is a deliberate safety feature &mdash;
                  uncontrolled lowering could be more dangerous than remaining stationary. To bring
                  the platform down, you must use the normal controls (after resetting the e-stop)
                  or the emergency/auxiliary lowering system.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Points to Remember</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Emergency stop buttons are located on the platform AND at ground level
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Pressing ANY e-stop halts ALL functions &mdash; you do not need to press both
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The button mechanically latches in the pressed position and must be manually
                      released
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Use the e-stop for genuine emergencies &mdash; it is not a substitute for the
                      normal stop function on the control levers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Test both emergency stops (platform and ground) during your function test at
                      low height
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────
            Section 06: Function Testing Before Work
        ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Function Testing Before Work
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                After completing the pre-use inspection (Module 3) and the 11-step pre-start
                procedure, there is one final step before proceeding to working height: a
                comprehensive function test of all controls at low height. This test verifies that
                every system is working correctly before you rely on it at elevation.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Function Test Procedure</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Raise to ~1 Metre</p>
                      <p className="text-sm text-white/80">
                        Raise the platform to approximately 1 metre above ground level. This is high
                        enough to test all functions but low enough to minimise risk if a fault is
                        found.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Test All Directional Controls
                      </p>
                      <p className="text-sm text-white/80">
                        Drive forward, reverse, steer left, steer right. Confirm smooth response and
                        correct direction.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Test All Boom / Scissor Functions
                      </p>
                      <p className="text-sm text-white/80">
                        Raise, lower, telescope in/out, slew left/right (as applicable). Confirm all
                        movements are smooth and responsive.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Test Emergency Stop (Platform)
                      </p>
                      <p className="text-sm text-white/80">
                        Press the platform emergency stop while a control is active. Confirm all
                        movement stops instantly. Reset and re-activate.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Test Emergency Stop (Ground)</p>
                      <p className="text-sm text-white/80">
                        Have the ground rescue person press the ground-level emergency stop. Confirm
                        all movement stops instantly. Reset and re-activate.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">
                      6
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Test Emergency / Auxiliary Lowering
                      </p>
                      <p className="text-sm text-white/80">
                        Lower the platform and test the emergency/auxiliary lowering system from the
                        ground. Confirm it functions correctly.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">
                      7
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Confirm &amp; Proceed</p>
                      <p className="text-sm text-white/80">
                        Confirm all functions are smooth, responsive, and without unusual noise or
                        vibration. Only then proceed to working height.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">If Any Function Fails</p>
                </div>
                <p className="text-sm text-white/80">
                  If <strong>any</strong> control does not respond correctly, if movement is jerky
                  or uneven, or if you hear unusual noises or feel abnormal vibrations,{' '}
                  <strong>do not proceed</strong>. Lower the platform, shut down the machine, tag it
                  as defective, and report the fault to your supervisor. Never work at height in a
                  machine that has failed its function test.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">What You Are Looking For</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Smooth, proportional response from all control inputs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Correct direction of travel matching the control input</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Immediate stop when controls are released (deadman function)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>No unusual noises — grinding, squealing, knocking, or hissing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>No abnormal vibrations through the platform or controls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Both emergency stops function correctly and can be reset</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Emergency/auxiliary lowering system operates as expected</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-4-section-2">
              Next: Travelling, Elevating &amp; Platform Loading
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
