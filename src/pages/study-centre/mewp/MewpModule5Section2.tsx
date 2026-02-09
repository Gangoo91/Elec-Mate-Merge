import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Shield,
  Wrench,
  Settings,
  Gauge,
  BookOpen,
  CircleDot,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'mewp-ground-controls-override',
    question:
      'A MEWP operator becomes incapacitated at height and a ground rescue person activates the ground controls. What happens to the platform controls when ground controls are activated?',
    options: [
      'Both sets of controls work simultaneously',
      'Ground controls are OVERRIDDEN by platform controls',
      'Platform controls are usually OVERRIDDEN by ground controls',
      'The machine shuts down completely and cannot be operated',
    ],
    correctIndex: 2,
    explanation:
      'On most MEWPs, activating the ground controls OVERRIDES the platform controls. This is a critical safety feature — it ensures the ground rescue person has full, unimpeded control of the machine during an emergency, even if the incapacitated operator is inadvertently leaning on a platform control.',
  },
  {
    id: 'mewp-manual-lowering-valve',
    question:
      'The main engine on a boom lift has failed completely, and the auxiliary power unit battery is flat. Which emergency lowering method would work in this situation?',
    options: [
      'Use the primary platform controls to lower',
      'Activate the auxiliary power unit (APU)',
      'Pull the manual lowering valve handle at the base of the machine',
      'Use the engine override procedure',
    ],
    correctIndex: 2,
    explanation:
      'The manual lowering valve is a purely mechanical system that works even with total electrical and engine failure. It opens a valve that allows hydraulic fluid to bypass the control system, and gravity (the weight of the boom and platform) provides the lowering force. It does not require any electrical power or engine operation.',
  },
  {
    id: 'mewp-familiarisation-emergency',
    question:
      'Before elevating the platform on any MEWP, which of the following should you have already confirmed during familiarisation?',
    options: [
      'The colour of the emergency lowering handle',
      'The location and operation of the ground controls, emergency lowering valve, APU, and hand pump for that specific machine',
      'That the machine has been painted recently',
      'The name of the hire company that supplied the machine',
    ],
    correctIndex: 1,
    explanation:
      'Familiarisation MUST cover the emergency lowering procedures for the specific make and model. You need to know where the ground controls are, how they are activated, where the emergency lowering valve is, whether the machine has an APU, and where the hand pump is located — BEFORE you elevate the platform. Every machine is different.',
  },
];

const faqs = [
  {
    question:
      'What is the difference between auxiliary platform controls and the auxiliary power unit (APU)?',
    answer:
      'These are two completely different systems. Auxiliary platform controls are backup controls located in the basket that the operator can use if the primary platform controls fail — they are essentially a second set of controls in the same location. The auxiliary power unit (APU) is an electric motor and hydraulic pump at the base of the machine that provides an independent power source if the main engine or motor fails. The APU is typically operated from ground level, not from the platform.',
  },
  {
    question: 'How do I know which emergency lowering methods my specific MEWP has?',
    answer:
      "The manufacturer's operator manual — which MUST be present on the machine — will detail every emergency lowering method available on that specific make and model. During familiarisation, you must read the relevant sections and physically locate each system on the machine. Not all MEWPs have all four systems. For example, smaller scissor lifts may not have an APU, and some machines may not have auxiliary platform controls. The manual is the definitive source.",
  },
  {
    question:
      'Can the manual lowering valve be used to move the platform sideways (slew) or drive the machine?',
    answer:
      'No. The manual lowering valve typically only allows the platform to descend. It works by opening a bypass valve that lets hydraulic fluid return to the tank under the force of gravity acting on the boom and platform weight. It cannot raise, slew, telescope, or drive the machine. If the platform needs to be moved laterally before lowering (for example, to clear an obstruction), you would need to use the ground controls with the APU or main power to achieve this before using the manual lowering valve.',
  },
  {
    question: 'What should I do if none of the emergency lowering systems work?',
    answer:
      'If all on-machine emergency lowering methods have been exhausted and the platform cannot be lowered, this becomes a rescue situation requiring the emergency services. Call 999 immediately. Do not attempt improvised rescue methods such as climbing down the boom or using ropes unless you are specifically trained in industrial rope rescue. The operator should remain in the basket with their harness attached and wait for the fire and rescue service, who have specialist equipment for high-level rescue from MEWPs.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'How many distinct control systems can a MEWP be fitted with for redundancy?',
    options: [
      'Two — platform controls and ground controls only',
      'Three — platform, ground, and emergency lowering',
      'Four — primary platform, primary ground, auxiliary platform, and emergency/auxiliary lowering',
      'Five — including a remote control system',
    ],
    correctAnswer: 2,
    explanation:
      'MEWPs can be fitted with up to four distinct control systems: (1) primary platform controls, (2) primary ground controls, (3) auxiliary platform controls (not on all machines), and (4) emergency/auxiliary lowering systems. This layered redundancy ensures that if one system fails, alternative methods are available to bring the platform safely to the ground.',
  },
  {
    id: 2,
    question: 'Where are the primary ground controls typically located on a MEWP?',
    options: [
      'Inside the platform basket alongside the primary platform controls',
      'At the base of the machine, usually behind a lockable panel',
      'On a separate remote control unit kept in the site office',
      'On the underside of the chassis',
    ],
    correctAnswer: 1,
    explanation:
      'Primary ground controls are located at the base of the machine, usually behind a lockable panel. They are typically key-operated or require a specific activation sequence. They provide the same functions as the platform controls (raise, lower, slew, telescope, drive) and are designed to be used by a ground rescue person in an emergency.',
  },
  {
    id: 3,
    question: 'What powers the auxiliary power unit (APU) on a MEWP?',
    options: [
      'The main diesel or petrol engine',
      'An external mains electricity connection',
      "The machine's battery, driving an electric motor connected to a small hydraulic pump",
      'A manual hand crank operated by the ground rescue person',
    ],
    correctAnswer: 2,
    explanation:
      "The APU is an electric motor powered by the machine's battery, connected to a small hydraulic pump. It is independent of the main engine or motor, allowing it to operate key hydraulic functions even if the main power system has failed. However, the battery must have sufficient charge for the APU to work.",
  },
  {
    id: 4,
    question:
      'The manual lowering valve works even with total electrical and engine failure because:',
    options: [
      'It has its own battery backup',
      'It is a purely mechanical system that uses gravity and the weight of the boom/platform',
      'It connects to the mains electricity supply',
      'It uses compressed air stored in a tank',
    ],
    correctAnswer: 1,
    explanation:
      'The manual lowering valve is a purely mechanical system. Pulling the handle opens a valve that allows hydraulic fluid to bypass the control system. The weight of the boom and platform provides the lowering force, assisted by gravity. No electrical power, engine, or battery is required — making it effective even with total system failure.',
  },
  {
    id: 5,
    question: 'A hand pump is best described as:',
    options: [
      'A powered electric pump that operates automatically',
      'A manual hydraulic pump where the operator physically pumps a lever to generate hydraulic pressure',
      'A pneumatic pump that uses compressed air',
      'A water pump used to clean the machine',
    ],
    correctAnswer: 1,
    explanation:
      'A hand pump is a manual hydraulic pump, usually located at the base of the machine, where the operator physically pumps a lever to generate hydraulic pressure. It is very slow but works with total power failure. It is used as a last-resort method when the APU and manual lowering valve are unavailable.',
  },
  {
    id: 6,
    question:
      'During familiarisation on a specific MEWP, which of the following questions about emergency lowering must you answer?',
    options: [
      'Only where the ground controls are located',
      'Only whether the machine has an APU',
      'Where the ground controls are, how they are activated, where the emergency lowering valve is, whether it has an APU, where the hand pump is, and the engine override procedure',
      'Only the colour of the emergency lowering handle',
    ],
    correctAnswer: 2,
    explanation:
      "Familiarisation must cover ALL emergency lowering systems for that specific make and model: the location and activation of ground controls, the emergency lowering valve location, whether the machine has an APU, the hand pump location, and the engine override procedure. Every machine is different, and all answers should be in the manufacturer's operator manual.",
  },
  {
    id: 7,
    question:
      'Why is it important that the ground rescue person activating ground controls can OVERRIDE the platform controls?',
    options: [
      'It makes the machine go faster',
      'It prevents the incapacitated operator from inadvertently interfering with the rescue',
      'It saves battery power',
      'It is not important — both sets of controls should work simultaneously',
    ],
    correctAnswer: 1,
    explanation:
      "Ground control override is a critical safety feature. If the operator is incapacitated (unconscious, injured, or suffering a medical episode), they may be slumped against the platform controls. If both sets of controls worked simultaneously, the platform controls could interfere with the ground rescue person's attempts to lower the platform. Override ensures the ground rescue person has full, unimpeded control.",
  },
  {
    id: 8,
    question:
      "The manufacturer's operator manual MUST be present on the MEWP at all times because:",
    options: [
      'It is required for insurance purposes only',
      'It contains the specific emergency lowering procedures, control locations, and limitations for that exact make and model',
      'The hire company needs it for billing',
      'It is only needed during the annual service',
    ],
    correctAnswer: 1,
    explanation:
      'The operator manual contains critical information specific to that exact make and model, including emergency lowering procedures, control locations, limitations, and warnings. Every machine has different procedures, and the manual is the definitive reference. Without it, the operator and ground rescue person cannot confirm the correct emergency procedures. If the manual is missing, the machine must not be used.',
  },
];

export default function MewpModule5Section2() {
  useSEO({
    title: 'Emergency Lowering Systems & Ground Controls | MEWP Module 5.2',
    description:
      'MEWP emergency lowering systems including ground controls, auxiliary power units, manual lowering valves, hand pumps, and engine overrides for safe rescue operations.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/30 mb-4">
            <Settings className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">
              MODULE 5 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Emergency Lowering Systems &amp; Ground Controls
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the multiple control systems and emergency lowering methods built into
            every MEWP &mdash; and knowing how to use them on YOUR specific machine
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>4 control systems</strong> for layered redundancy
              </li>
              <li>
                <strong>Ground controls</strong> override platform controls
              </li>
              <li>
                <strong>Manual lowering valve</strong> works with zero power
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Familiarise:</strong> locate EVERY emergency system before elevating
              </li>
              <li>
                <strong>Manual:</strong> manufacturer&rsquo;s operator manual MUST be on the machine
              </li>
              <li>
                <strong>Every machine is different:</strong> never assume
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-white/70 mb-4">By the end of this section, you will be able to:</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Identify the four control systems fitted to MEWPs for redundancy',
              'Describe the location, activation, and override function of ground controls',
              'Explain how the auxiliary power unit (APU) works and its limitations',
              'Describe the manual lowering valve and when it is used',
              'Explain the purpose and operation of the hand pump and engine override',
              'State the familiarisation questions that must be answered before elevating',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ================================================================ */}
        {/* Section 01: The Four Control Systems                             */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Four Control Systems
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                MEWPs are fitted with <strong>multiple control systems</strong> that provide layered
                redundancy. If one system fails, the next is available. If that fails, there is
                another. This hierarchy exists for one reason: to ensure the platform and its
                occupant can <strong>always</strong> be brought safely to the ground.
              </p>

              <p>
                Not every MEWP has all four systems &mdash; smaller machines may omit the auxiliary
                platform controls or the APU. But every MEWP will have at least the primary controls
                and an emergency lowering method. Understanding the full hierarchy is essential for
                any operator or ground rescue person.
              </p>

              {/* ============================================ */}
              {/* DIAGRAM: Four Control Systems                */}
              {/* ============================================ */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-5 text-center">
                  MEWP Control System Hierarchy
                </h3>

                <div className="relative max-w-lg mx-auto space-y-3">
                  {/* System 1 — Primary Platform Controls */}
                  <div className="relative">
                    <div className="bg-green-500/10 border-2 border-green-400/50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 border border-green-400/50 flex-shrink-0">
                          <span className="text-green-300 text-sm font-bold">1</span>
                        </div>
                        <div>
                          <p className="text-green-300 font-semibold text-sm">
                            Primary Platform Controls
                          </p>
                          <p className="text-white/60 text-xs mt-1">
                            Normal operator controls in the basket. Used during routine operation.
                            First line of control.
                          </p>
                          <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/10 border border-green-400/30">
                            <CircleDot className="h-3 w-3 text-green-400" />
                            <span className="text-green-300 text-[10px] font-semibold uppercase tracking-wide">
                              In the basket
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Connector arrow */}
                    <div className="flex justify-center py-1">
                      <div className="w-[2px] h-4 bg-white/20" />
                    </div>
                  </div>

                  {/* System 2 — Primary Ground Controls */}
                  <div className="relative">
                    <div className="bg-blue-500/10 border-2 border-blue-400/50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/50 flex-shrink-0">
                          <span className="text-blue-300 text-sm font-bold">2</span>
                        </div>
                        <div>
                          <p className="text-blue-300 font-semibold text-sm">
                            Primary Ground Controls
                          </p>
                          <p className="text-white/60 text-xs mt-1">
                            Full set of controls at the base of the machine. Used by a ground rescue
                            person. Overrides platform controls.
                          </p>
                          <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-400/30">
                            <CircleDot className="h-3 w-3 text-blue-400" />
                            <span className="text-blue-300 text-[10px] font-semibold uppercase tracking-wide">
                              At the base
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center py-1">
                      <div className="w-[2px] h-4 bg-white/20" />
                    </div>
                  </div>

                  {/* System 3 — Auxiliary Platform Controls */}
                  <div className="relative">
                    <div className="bg-purple-500/10 border-2 border-purple-400/50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/50 flex-shrink-0">
                          <span className="text-purple-300 text-sm font-bold">3</span>
                        </div>
                        <div>
                          <p className="text-purple-300 font-semibold text-sm">
                            Auxiliary Platform Controls
                          </p>
                          <p className="text-white/60 text-xs mt-1">
                            Backup controls in the basket if the primary platform controls fail. Not
                            fitted to all machines.
                          </p>
                          <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-400/30">
                            <CircleDot className="h-3 w-3 text-purple-400" />
                            <span className="text-purple-300 text-[10px] font-semibold uppercase tracking-wide">
                              In the basket (backup)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center py-1">
                      <div className="w-[2px] h-4 bg-white/20" />
                    </div>
                  </div>

                  {/* System 4 — Emergency/Auxiliary Lowering Systems */}
                  <div className="relative">
                    <div className="bg-red-500/10 border-2 border-red-400/50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 border border-red-400/50 flex-shrink-0">
                          <span className="text-red-300 text-sm font-bold">4</span>
                        </div>
                        <div>
                          <p className="text-red-300 font-semibold text-sm">
                            Emergency / Auxiliary Lowering Systems
                          </p>
                          <p className="text-white/60 text-xs mt-1">
                            Last-resort methods to bring the platform to the ground: APU, manual
                            lowering valve, hand pump, engine override.
                          </p>
                          <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/10 border border-red-400/30">
                            <AlertTriangle className="h-3 w-3 text-red-400" />
                            <span className="text-red-300 text-[10px] font-semibold uppercase tracking-wide">
                              Last resort &mdash; at the base
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-green-400/40 border border-green-400/60" />
                      <span className="text-white/50">Normal operation</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-blue-400/40 border border-blue-400/60" />
                      <span className="text-white/50">Ground rescue</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-purple-400/40 border border-purple-400/60" />
                      <span className="text-white/50">Backup (if fitted)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400/40 border border-red-400/60" />
                      <span className="text-white/50">Emergency last resort</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Principle:</strong> The hierarchy moves
                  from normal operation (platform controls) through ground-level intervention
                  (ground controls) to mechanical and manual last-resort methods (emergency
                  lowering). Each layer is designed to work <strong>independently</strong> of the
                  one above it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* Section 02: Ground Controls in Detail                            */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">02</span>
            Ground Controls in Detail
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Ground controls are located at the <strong>base of the machine</strong>, usually
                behind a lockable panel or cover. They are typically key-operated or require a
                specific activation sequence to prevent unauthorised use. They provide the{' '}
                <strong>same functions</strong> as the platform controls: raise, lower, slew,
                telescope, and drive.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Safety Feature</p>
                </div>
                <p className="text-sm text-white/80">
                  Activating ground controls usually{' '}
                  <strong className="text-white">OVERRIDES platform controls</strong>. This is
                  essential &mdash; if the operator is incapacitated and slumped against a platform
                  control, the ground rescue person must have full, unimpeded authority over the
                  machine. Without override, the rescue could be impossible.
                </p>
              </div>

              <p>
                The ground rescue person{' '}
                <strong>
                  must be familiar with the specific machine&rsquo;s ground controls BEFORE work
                  begins
                </strong>
                . This is not something to learn during an emergency. During familiarisation, both
                the operator and the designated ground person should locate the ground control
                panel, practise the activation sequence, and confirm they understand the layout.
              </p>

              <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">Ground Control Procedure</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-blue-300">
                        Locate the Ground Control Panel
                      </p>
                      <p className="text-sm text-white/70">
                        Usually at the base of the machine, behind a lockable cover or panel. The
                        location should have been identified during familiarisation.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-blue-300">
                        Activate Using Key or Switch
                      </p>
                      <p className="text-sm text-white/70">
                        Insert the key or follow the activation sequence specified in the operator
                        manual. This transfers control authority from the platform to the ground.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-blue-300">
                        Lower the Platform Smoothly
                      </p>
                      <p className="text-sm text-white/70">
                        Use the ground controls to lower the platform in a controlled manner.
                        Continuously check for obstructions both <strong>above and below</strong>{' '}
                        the platform as it descends.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Ground Controls Typically Provide:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Raise / Lower',
                    'Slew left / right',
                    'Telescope in / out',
                    'Drive forward / reverse',
                    'Steer left / right',
                    'Emergency stop',
                  ].map((fn, i) => (
                    <div key={i} className="bg-white/5 rounded px-3 py-2 text-center">
                      <span className="text-white/70 text-xs">{fn}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ================================================================ */}
        {/* Section 03: Auxiliary Power Unit (APU)                           */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-teal-400/80 text-sm font-normal">03</span>
            Auxiliary Power Unit (APU)
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The auxiliary power unit is an{' '}
                <strong>electric motor powered by the machine&rsquo;s battery</strong>, connected to
                a small hydraulic pump. It is completely <strong>independent</strong> of the main
                engine or motor, meaning it can operate key hydraulic functions even if the main
                power system has failed entirely.
              </p>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Gauge className="h-5 w-5 text-teal-400" />
                  <p className="text-sm font-medium text-teal-400">APU Operation Procedure</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-teal-500/20 text-teal-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-teal-300">Activate the APU Switch</p>
                      <p className="text-sm text-white/70">
                        Usually located at ground level, often near or within the ground control
                        panel. Follow the manufacturer&rsquo;s instructions for the specific
                        activation sequence.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-teal-500/20 text-teal-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-teal-300">
                        Use Ground Controls to Operate Boom/Scissor
                      </p>
                      <p className="text-sm text-white/70">
                        With the APU providing hydraulic pressure, use the ground controls to
                        operate the boom or scissor mechanism as needed.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-teal-500/20 text-teal-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-teal-300">Lower Platform to Ground</p>
                      <p className="text-sm text-white/70">
                        Lower the platform smoothly and controllably to the stowed position. Check
                        for obstructions throughout the descent.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">APU Limitations</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Slower than normal operation</strong> &mdash;
                      the small hydraulic pump produces less flow than the main system
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Battery must have sufficient charge</strong>{' '}
                      &mdash; if the battery is flat, the APU cannot operate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">May not operate all functions</strong> &mdash;
                      check the manufacturer&rsquo;s manual for which functions the APU can power on
                      your specific machine
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Not fitted to all machines</strong> &mdash;
                      smaller or simpler MEWPs may not have an APU
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* Section 04: Manual Lowering Valve                                */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-red-400/80 text-sm font-normal">04</span>
            Manual Lowering Valve
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The manual lowering valve is a <strong>purely mechanical system</strong> that works
                even with total electrical and engine failure. It is activated by pulling a handle
                at the base of the machine, which opens a valve allowing hydraulic fluid to bypass
                the normal control system.
              </p>

              <p>
                <strong>Gravity does the work.</strong> The weight of the boom and platform provides
                the lowering force, pushing hydraulic fluid back through the bypass valve and into
                the reservoir. The platform descends slowly and controllably &mdash; there is no
                sudden drop.
              </p>

              <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    How the Manual Lowering Valve Works
                  </p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <span>
                      Locate the manual lowering handle at the base of the machine (position
                      identified during familiarisation)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <span>
                      <strong className="text-white">Check below the platform</strong> for
                      obstructions and people before activating &mdash; the platform will descend
                      once the valve is opened
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <span>
                      Pull the handle to open the bypass valve &mdash; hydraulic fluid flows past
                      the control system and the platform begins to lower under its own weight
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <span>
                      The platform descends slowly and controllably until it reaches the stowed
                      position
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Why It Always Works:</strong> The manual
                  lowering valve requires <strong>no electrical power</strong>,{' '}
                  <strong>no engine</strong>, <strong>no battery</strong>, and{' '}
                  <strong>no hydraulic pump</strong>. It is a purely mechanical system that uses
                  gravity and the existing hydraulic fluid in the system. This makes it the most
                  reliable emergency lowering method on any MEWP.
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Limitation</p>
                </div>
                <p className="text-sm text-white/80">
                  The manual lowering valve typically{' '}
                  <strong className="text-white">only lowers</strong> the platform. It cannot raise,
                  slew, telescope, or drive the machine. If the platform needs to be moved laterally
                  before lowering (for example, to clear a building edge), another method such as
                  the APU with ground controls must be used first. The operator must also check
                  below for obstructions before activating, as the descent cannot easily be stopped
                  once started.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ================================================================ */}
        {/* Section 05: Hand Pump and Engine Override                        */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">05</span>
            Hand Pump &amp; Engine Override
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When the APU and manual lowering valve are unavailable or insufficient, two further
                last-resort methods may be available depending on the machine: the{' '}
                <strong>hand pump</strong> and the <strong>engine override</strong>. These are the
                final on-machine options before calling the emergency services.
              </p>

              {/* Hand Pump */}
              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">Hand Pump</p>
                </div>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    A <strong>manual hydraulic pump</strong>, usually located at the base of the
                    machine. The operator physically pumps a lever back and forth to generate
                    hydraulic pressure, which can then be directed to the boom or scissor mechanism
                    to lower (or in some cases raise) the platform.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Very slow</strong> &mdash; each pump stroke
                        generates a small amount of hydraulic pressure; lowering a fully extended
                        boom can take considerable time and effort
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Works with total power failure</strong>{' '}
                        &mdash; no electrical power, engine, or battery required
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Used when APU and manual lowering valve are unavailable
                        </strong>{' '}
                        &mdash; for example, if the hydraulic fluid has been lost or the lowering
                        valve is jammed
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Engine Override */}
              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">Engine Override</p>
                </div>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    Engine override is the ability to{' '}
                    <strong>bypass normal electronic control circuits</strong> and operate the
                    engine and hydraulic pump directly. This is used when the electronic control
                    system has failed but the engine itself is still functional.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Usually requires a{' '}
                        <strong className="text-white">specific procedure</strong> documented in the
                        operator&rsquo;s manual
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        May involve physical switches, jumpers, or a specific key sequence at the
                        ground control panel
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Should only be attempted by a person who has read and understood the
                        manufacturer&rsquo;s procedure for that specific machine
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Both Are Last-Resort Methods</p>
                </div>
                <p className="text-sm text-white/80">
                  The hand pump and engine override are the final on-machine options. If these
                  methods are also unavailable or fail to bring the platform to the ground, the
                  situation becomes a{' '}
                  <strong className="text-white">rescue requiring the emergency services</strong>.
                  Call <strong>999</strong> immediately. The operator should remain in the basket
                  with their harness attached and wait for the fire and rescue service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* Section 06: Knowing YOUR Machine                                 */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Knowing YOUR Machine
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>EVERY machine has different emergency lowering procedures.</strong> The
                controls may be in different locations, the activation sequences may differ, and the
                available emergency systems vary between makes and models. What works on one machine
                may not exist on another.
              </p>

              <p>
                This is why the{' '}
                <strong>familiarisation process MUST cover emergency lowering</strong> for the
                specific make and model you are about to operate. It is not enough to know the
                general principles &mdash; you must know the exact procedures for the machine in
                front of you.
              </p>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">
                    Key Questions for Familiarisation
                  </p>
                </div>
                <p className="text-sm text-white/60 mb-3">
                  You must be able to answer ALL of these for the specific machine before you
                  elevate the platform:
                </p>
                <div className="space-y-2">
                  {[
                    'Where are the ground controls?',
                    'How are the ground controls activated (key, switch, sequence)?',
                    'Where is the emergency lowering handle/valve?',
                    'Does this machine have an auxiliary power unit (APU)?',
                    'Where is the hand pump located?',
                    'What is the engine override procedure?',
                  ].map((q, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm text-white/80">{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">The Operator Manual:</strong> All answers
                  should be in the <strong>manufacturer&rsquo;s operator manual</strong> &mdash;
                  which <strong>MUST</strong> be present on the machine at all times. If the manual
                  is missing, the machine must not be used. During familiarisation, physically
                  locate the relevant sections in the manual and read them.
                </p>
              </div>

              {/* Before You Elevate Checklist */}
              <div className="bg-gradient-to-br from-elec-yellow/10 to-amber-600/10 border-2 border-elec-yellow/40 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-elec-yellow" />
                  <p className="text-base font-semibold text-elec-yellow">
                    Before You Elevate &mdash; Emergency Systems Checklist
                  </p>
                </div>
                <p className="text-sm text-white/60 mb-4">
                  Confirm all of the following before operating the platform at height:
                </p>
                <div className="space-y-2">
                  {[
                    'I have located the ground control panel and know how to activate it',
                    'I have confirmed which functions the ground controls operate on this machine',
                    'I have identified the emergency/manual lowering valve and know how to use it',
                    'I know whether this machine has an APU and where it is activated',
                    'I have located the hand pump (if fitted) and understand its operation',
                    'I know the engine override procedure for this machine (or confirmed it is not applicable)',
                    "The manufacturer's operator manual is present on the machine and I have read the emergency procedures",
                    'The designated ground person knows the location and operation of ALL emergency systems on this machine',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-elec-yellow font-mono text-xs mt-0.5">&#9744;</span>
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-elec-yellow/20">
                  <p className="text-xs text-white/50 italic">
                    If you cannot tick every box, do not elevate the platform until you can. Take
                    the time to familiarise yourself properly &mdash; it could save your life or a
                    colleague&rsquo;s life.
                  </p>
                </div>
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
                <h3 className="text-sm font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <div className="mt-12">
          <Quiz
            title="Emergency Lowering Systems & Ground Controls Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-5-section-3">
              Next: Rescue Procedures Step by Step
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
