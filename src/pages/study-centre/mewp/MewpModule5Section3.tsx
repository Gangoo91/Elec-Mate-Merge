import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  ListChecks,
  Shield,
  Radio,
  UserCheck,
  Zap,
  HeartPulse,
  ClipboardList,
  Phone,
  Users,
  TriangleAlert,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'mewp-rescue-option-b',
    question:
      'The ground controls on a MEWP are not responding and the operator is stranded at height. You have confirmed that no APU is fitted. What is the NEXT step?',
    options: [
      'Call the fire brigade immediately',
      'Locate the emergency/manual lowering handle or valve at the base of the machine',
      'Climb a ladder to reach the operator',
      'Wait for the hire company to send an engineer',
    ],
    correctIndex: 1,
    explanation:
      'When ground controls are inoperable and no APU is available, the next step is to locate and use the emergency or manual lowering system. This is typically a handle or valve at the base of the machine that allows the platform to lower under gravity in a controlled manner. Calling emergency services (Option C) is only used when ALL mechanical means have failed. Never climb to the operator — this is an untrained rescue from height.',
  },
  {
    id: 'mewp-ground-rescue-person',
    question: 'Which of the following is NOT a requirement for the nominated ground rescue person?',
    options: [
      'Must be physically present at ground level during elevated operations',
      'Must hold a current IPAF operator licence for the same machine category',
      "Must be familiar with the specific machine's ground controls",
      'Must not be assigned other duties that would prevent immediate response',
    ],
    correctIndex: 1,
    explanation:
      "The ground rescue person does not need to hold an IPAF operator licence. They need to be competent with the specific machine's ground controls and emergency lowering systems, which requires familiarisation and practice — but this is a different competence from operating the machine from the platform. They must be physically present, familiar with the machine, and free from conflicting duties.",
  },
  {
    id: 'mewp-rescue-drill-frequency',
    question: 'How often should rescue drill practice be carried out as a minimum recommendation?',
    options: ['Monthly', 'Every 3 months', 'Every 6 months', 'Annually'],
    correctIndex: 2,
    explanation:
      'Rescue drills should be practised at least every 6 months. This ensures that all personnel involved remain competent and confident with the procedures, the equipment works correctly, and any issues are identified before a real emergency occurs. More frequent drills may be appropriate where personnel change regularly or new machine types are introduced.',
  },
];

const faqs = [
  {
    question: 'What should I do if the operator is unconscious and I cannot communicate with them?',
    answer:
      'Use the ground controls (Option A) to lower the platform to ground level. Ground controls override platform controls, so the operator does not need to be conscious or able to assist. Lower slowly and smoothly, monitoring for any obstructions. Call 999 immediately — do not wait until the platform reaches ground level. Once at ground level, provide first aid, place the operator in the recovery position if breathing, and wait for the ambulance. Do not attempt to climb to the operator or use a ladder.',
  },
  {
    question: 'Can the ground rescue person also be the site supervisor or banksman?',
    answer:
      "The ground rescue person must not be assigned other duties that would take them away from the vicinity of the machine or prevent immediate response to an emergency. If the site supervisor or banksman can remain at ground level near the machine for the entire duration of elevated operations — and they are competent with the machine's ground controls — they may fulfil the role. However, if their other duties require them to leave the area, attend meetings, or manage operations elsewhere on site, they cannot also be the ground rescue person. A separate, dedicated person should be nominated.",
  },
  {
    question: 'What is suspension trauma and why is it relevant to MEWP rescue?',
    answer:
      'Suspension trauma (also called harness-induced pathology) occurs when a person is suspended motionless in a harness for an extended period. Blood pools in the legs because the harness straps restrict venous return. This can lead to unconsciousness within 15 to 20 minutes and can be fatal. It is relevant to MEWP rescue because if the operator has fallen within the platform and is hanging in their harness, or if the platform has tilted and the operator is suspended, time is critical. The rescue must be completed as quickly as possible, and the operator should be encouraged to move their legs and maintain circulation while awaiting rescue.',
  },
  {
    question:
      'If the operator has been electrocuted while on the platform, can I use the ground controls to lower them?',
    answer:
      'No. If the electrocution has been caused by contact with live overhead cables or conductors, the machine itself may be energised. Touching the ground controls or any part of the machine could electrocute you as well. You must call 999 AND the electricity distribution company immediately. Do not approach the machine until power has been confirmed as isolated by the electricity company. Only then can you use the ground controls to lower the platform. The fire and rescue service will have specialist equipment and training for this scenario.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the PRIMARY (first) rescue method that should be attempted when an operator is stranded at height in a MEWP?',
    options: [
      'Call the fire brigade',
      'Use the emergency/manual lowering valve',
      'Lower the platform using the ground controls',
      'Use a ladder to reach the operator',
    ],
    correctAnswer: 2,
    explanation:
      'The PRIMARY rescue method is Option A — lowering the platform using the ground controls. This should be the FIRST method attempted because it is the quickest, simplest, and safest approach. Ground controls override the platform controls and work in most situations. Emergency lowering (Option B) is only used if ground controls fail. Emergency services (Option C) are called when ALL mechanical means have failed.',
  },
  {
    id: 2,
    question:
      'During a rescue using ground controls, what must the ground rescue person confirm BEFORE lowering the platform?',
    options: [
      'That the operator has removed their harness',
      'That the site manager has given written authorisation',
      'That the area above and below the platform is clear of obstructions',
      'That the hire company has been notified',
    ],
    correctAnswer: 2,
    explanation:
      'Before lowering the platform, the ground rescue person must visually confirm that the area above and below the platform is clear of obstructions. Lowering onto an obstruction could cause further injury to the operator, damage the machine, or create a crushing hazard for anyone below. The operator should keep their harness on throughout the rescue.',
  },
  {
    id: 3,
    question: 'When using emergency lowering (Option B), what causes the platform to descend?',
    options: [
      'The APU drives the hydraulics in reverse',
      'The operator uses the platform controls in emergency mode',
      'Gravity — controlled by the manual lowering valve',
      'A backup electric motor lowers the boom',
    ],
    correctAnswer: 2,
    explanation:
      'When the manual lowering valve is opened, the platform descends under gravity. The valve controls the rate of descent by restricting the flow of hydraulic fluid. This is a passive system that does not require any power source — it works even when all electrical and hydraulic power has failed. The rate of descent is controlled by how far the valve is opened.',
  },
  {
    id: 4,
    question:
      'An operator on a MEWP has become trapped between the platform guardrail and a structural beam. What is the correct immediate action?',
    options: [
      'Use the ground controls to reverse the movement that caused the entrapment',
      'Call 999 and use ground controls to GENTLY move the platform AWAY from the obstruction',
      'Climb up and attempt to free the operator manually',
      'Switch off the machine and wait for an ambulance',
    ],
    correctAnswer: 1,
    explanation:
      'For entrapment, you must call 999 immediately and use the ground controls to GENTLY move the platform AWAY from the obstruction. You must NOT reverse the movement that caused the entrapment — this may worsen the injury by releasing pressure on a wound that is currently being compressed, or by moving the operator further into the obstruction. Never climb to the operator or attempt an untrained rescue.',
  },
  {
    id: 5,
    question:
      'Which of the following is a mandatory requirement for the nominated ground rescue person?',
    options: [
      'Must hold a full IPAF operator licence',
      'Must be a qualified first aider',
      'Must be physically present at ground level during ALL elevated operations',
      'Must have at least 5 years of construction experience',
    ],
    correctAnswer: 2,
    explanation:
      "The ground rescue person must be physically present at ground level during ALL elevated operations. They must not leave the vicinity and must not be assigned other duties that would prevent immediate response. They do not need an IPAF licence, but they must be competent with the specific machine's ground controls. First aid training is beneficial but not a mandatory requirement for the role.",
  },
  {
    id: 6,
    question:
      'A MEWP is in contact with overhead power lines and the operator is unconscious on the platform. What must the ground rescue person do FIRST?',
    options: [
      'Use the ground controls to lower the platform away from the cables',
      'Call 999 AND the electricity distribution company — do NOT touch the machine',
      'Attempt to push the machine away from the cables using a wooden pole',
      "Turn off the machine's ignition to cut power",
    ],
    correctAnswer: 1,
    explanation:
      'If the machine is in contact with live overhead cables, it may be fully energised. Touching any part of the machine — including the ground controls — could be fatal. You must call 999 AND the electricity company immediately and keep everyone away from the machine until power has been confirmed as isolated. Only after isolation can any rescue be attempted.',
  },
  {
    id: 7,
    question: 'How often should rescue drills be practised, and what must be recorded?',
    options: [
      'Annually — record participants only',
      'Every 6 months minimum — record date, participants, scenario, time taken, and issues identified',
      'Monthly — record pass or fail result',
      'Only when new staff join — no formal record required',
    ],
    correctAnswer: 1,
    explanation:
      'Rescue drills should be practised every 6 months as a minimum. Each drill must be recorded with the date, participants, scenario practised, time taken, and any issues identified. A debrief should follow every drill to discuss what went well and what needs improvement. New personnel must participate in a drill before being assigned as ground rescue person.',
  },
  {
    id: 8,
    question:
      'A MEWP begins to tilt while the operator is at height. What is the correct action for the ground rescue person?',
    options: [
      'Run to the outriggers and attempt to stabilise the machine',
      'Use the ground controls to lower the platform as quickly as possible',
      'Evacuate the area immediately — do NOT attempt to stabilise the machine — call 999',
      'Instruct the operator to jump clear of the platform',
    ],
    correctAnswer: 2,
    explanation:
      'If a MEWP is tilting or overturning, the ground rescue person must evacuate the area immediately and call 999. Do NOT attempt to stabilise the machine — a tilting MEWP weighing several tonnes cannot be stopped by a person, and the attempt would place you directly in the crush zone. The operator should brace inside the platform and keep their harness connected. Fire and rescue services have specialist equipment for this scenario.',
  },
];

export default function MewpModule5Section3() {
  useSEO({
    title: 'Rescue Procedures Step by Step | MEWP Module 5.3',
    description:
      'Step-by-step MEWP rescue procedures: Option A ground controls, Option B emergency lowering, Option C emergency services, ground rescue person role, scenario guidance, and rescue drill practice.',
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
            <Link to="../mewp-module-5">
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
            <ListChecks className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">
              MODULE 5 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Rescue Procedures Step by Step
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Three rescue options in priority order, the role of the nominated ground rescue person,
            scenario-specific guidance, and rescue drill practice
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Option A:</strong> Lower using ground controls (PRIMARY)
              </li>
              <li>
                <strong>Option B:</strong> Emergency lowering if ground controls fail
              </li>
              <li>
                <strong>Option C:</strong> Call 999 if ALL mechanical means fail
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Ground Rescue Person:</strong> Present at all times
              </li>
              <li>
                <strong>Drills:</strong> Every 6&nbsp;months minimum
              </li>
              <li>
                <strong>Never:</strong> Attempt untrained rescue from height
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Carry out Option A rescue using ground controls step by step',
              'Carry out Option B rescue using emergency lowering systems',
              'Know when to implement Option C and what information to provide to emergency services',
              'Describe the role, responsibilities, and requirements of the nominated ground rescue person',
              'Apply correct rescue procedures for specific emergency scenarios',
              'Plan, conduct, and record rescue drill practice sessions',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Option A — Lower Using Ground Controls */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Option A &mdash; Lower Using Ground Controls
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">
                    PRIMARY Rescue Method &mdash; Try This First
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  This is the first option that should be attempted in any rescue situation. Ground
                  controls override platform controls and work even when the operator is unconscious
                  or incapacitated. The ground rescue person must have practised this procedure
                  before being assigned the role.
                </p>
              </div>

              <p>
                The ground control panel is typically located at the base of the machine, protected
                by a lockable cover. It provides full control of all platform movements &mdash;
                raise, lower, extend, retract, slew, and drive. In an emergency, the ground rescue
                person uses these controls to bring the platform safely to ground level.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-4">Step-by-Step Procedure</p>
                <div className="space-y-3">
                  {[
                    {
                      step: '1',
                      text: 'Trained ground rescue person approaches the ground control panel at the base of the machine',
                    },
                    {
                      step: '2',
                      text: 'Activates ground controls using the key or switch — this overrides the platform controls',
                    },
                    {
                      step: '3',
                      text: 'Visually confirms the platform area is clear above AND below — checks for obstructions in the descent path',
                    },
                    {
                      step: '4',
                      text: 'Uses ground controls to lower the platform to ground level — slowly and smoothly, avoiding sudden movements',
                    },
                    {
                      step: '5',
                      text: 'Checks for obstructions CONTINUOUSLY during lowering — stops immediately if any obstruction is detected',
                    },
                    {
                      step: '6',
                      text: 'Once at ground level: makes the platform safe, provides first aid if needed, calls emergency services if medical assistance is required',
                    },
                    {
                      step: '7',
                      text: 'Secures the machine (ignition off, keys removed, barriers if needed) and reports the incident to the site manager and employer',
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                        <span className="text-green-400 text-xs font-bold">{item.step}</span>
                      </div>
                      <p className="text-sm text-white/80 pt-1">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> Option A should be the
                  FIRST option attempted in every rescue scenario. It works in the majority of
                  situations, including when the operator is unconscious, because the ground
                  controls override the platform controls. The ground rescue person must have
                  practised this procedure and be familiar with the specific machine&rsquo;s ground
                  control panel layout.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Option B — Ground Controls Inoperable */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Option B &mdash; Ground Controls Inoperable, Use Emergency Lowering
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If the primary ground controls do not work &mdash; due to electrical failure,
                hydraulic system fault, or damage to the control panel &mdash; the next step is to
                use the machine&rsquo;s emergency or manual lowering systems. These are designed to
                function independently of the main power and control systems.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-4">Step-by-Step Procedure</p>
                <div className="space-y-3">
                  {[
                    {
                      step: '1',
                      text: 'Attempt the APU (Auxiliary Power Unit) if fitted — activate the APU switch and try the ground controls again using the APU power supply',
                    },
                    {
                      step: '2',
                      text: "If APU fails or is not fitted: locate the emergency/manual lowering handle or valve at the base of the machine — refer to the machine's decals and operating manual for exact location",
                    },
                    {
                      step: '3',
                      text: 'Check below the platform for obstructions — the descent path must be completely clear',
                    },
                    {
                      step: '4',
                      text: "Activate manual lowering — pull the handle or open the valve as indicated on the machine's emergency procedures decal",
                    },
                    {
                      step: '5',
                      text: 'The platform will lower under gravity — the rate of descent is controlled by the valve restricting hydraulic fluid flow',
                    },
                    {
                      step: '6',
                      text: 'Monitor the descent continuously — be prepared to close the valve if an obstruction appears or the descent rate is too fast',
                    },
                    {
                      step: '7',
                      text: 'If the manual valve fails: use the hand pump (if fitted) to manually pump hydraulic fluid and lower the platform',
                    },
                    {
                      step: '8',
                      text: 'Provide first aid and call emergency services as needed once the platform reaches ground level',
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                        <span className="text-purple-400 text-xs font-bold">{item.step}</span>
                      </div>
                      <p className="text-sm text-white/80 pt-1">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Important Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  Emergency lowering procedures vary between manufacturers and machine models.
                  Always check the{' '}
                  <strong className="text-white">manufacturer&rsquo;s specific procedure</strong>{' '}
                  for the machine you are using. The emergency lowering decal on the machine shows
                  the exact location and operation of the manual lowering system. Familiarise
                  yourself with this <strong className="text-white">before</strong> work begins
                  &mdash; not during an emergency.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Emergency Lowering Systems Summary
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-white/5 p-3 rounded-lg text-center">
                    <p className="text-sm font-medium text-purple-400 mb-1">APU</p>
                    <p className="text-xs text-white/70">
                      Backup power unit &mdash; powers ground controls when main engine fails
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg text-center">
                    <p className="text-sm font-medium text-purple-400 mb-1">Manual Valve</p>
                    <p className="text-xs text-white/70">
                      Gravity descent &mdash; opens hydraulic circuit to allow controlled lowering
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg text-center">
                    <p className="text-sm font-medium text-purple-400 mb-1">Hand Pump</p>
                    <p className="text-xs text-white/70">
                      Manual hydraulic pump &mdash; last mechanical resort before calling 999
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Option C — All Mechanical Means Failed */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Option C &mdash; All Mechanical Means Failed
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If the machine cannot be lowered by ANY on-site method &mdash; ground controls, APU,
                manual lowering valve, and hand pump have all been attempted and failed &mdash; you
                must call the emergency services immediately. Do not delay. Do not attempt
                improvised solutions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-4">Step-by-Step Procedure</p>
                <div className="space-y-3">
                  {[
                    {
                      step: '1',
                      text: 'Call emergency services immediately — dial 999',
                      highlight: true,
                    },
                    {
                      step: '2',
                      text: 'Provide clear information: exact location (postcode/what3words), type and model of machine, height of the platform, number of persons on the platform, nature and severity of any injuries, what rescue methods have already been attempted',
                    },
                    {
                      step: '3',
                      text: 'Fire and rescue services have specialist high-rise rescue capabilities — they are trained and equipped for this scenario',
                    },
                    {
                      step: '4',
                      text: 'Keep the operator calm and monitored — maintain radio or visual contact at all times',
                    },
                    {
                      step: '5',
                      text: 'If the operator is wearing a harness and is conscious: ensure they maintain a comfortable position and keep moving their legs to avoid suspension trauma',
                    },
                    {
                      step: '6',
                      text: 'Do NOT attempt untrained rescue from height — no ladders, no climbing, no improvised methods',
                    },
                    {
                      step: '7',
                      text: 'Protect and cordon off the area below the platform — prevent anyone from entering the drop zone',
                    },
                    {
                      step: '8',
                      text: "Meet the emergency services on arrival — brief them on the situation, machine type, what has been tried, and the operator's condition",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                          item.highlight
                            ? 'bg-red-500/30 border border-red-500/50'
                            : 'bg-teal-500/20 border border-teal-500/40'
                        }`}
                      >
                        <span
                          className={`text-xs font-bold ${
                            item.highlight ? 'text-red-400' : 'text-teal-400'
                          }`}
                        >
                          {item.step}
                        </span>
                      </div>
                      <p className="text-sm text-white/80 pt-1">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-500/10 border-2 border-red-500/40 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TriangleAlert className="h-6 w-6 text-red-400" />
                  <p className="text-base font-bold text-red-400">
                    NEVER Attempt Untrained Rescue From Height
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Do NOT use ladders to reach a stranded operator &mdash; ladders cannot safely
                      access a MEWP platform at height
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Do NOT climb the boom, scissor stack, or machine structure &mdash; these are
                      not designed for climbing and there is no fall protection
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Do NOT use a second MEWP to bridge across to the stranded platform unless
                      specifically trained in platform-to-platform transfer procedures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      An untrained rescue attempt is likely to result in additional casualties
                      &mdash; wait for the fire and rescue service
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="h-5 w-5 text-teal-400" />
                  <p className="text-sm font-medium text-teal-400">Information for the 999 Call</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/80">
                  {[
                    'Exact location (address, postcode, what3words)',
                    'Type and model of MEWP',
                    'Height of platform above ground',
                    'Number of persons on the platform',
                    'Nature and severity of injuries',
                    'What rescue methods have been attempted',
                    'Any special hazards (overhead cables, chemicals)',
                    'Best access route for emergency vehicles',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: The Nominated Ground Rescue Person */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            The Nominated Ground Rescue Person
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The nominated ground rescue person is the individual responsible for initiating and
                carrying out the rescue of a stranded operator. This is a critical role &mdash;
                without a competent ground rescue person physically present, elevated operations
                must not take place.
              </p>

              {/* Role Card */}
              <div className="bg-white/5 border-2 border-elec-yellow/30 rounded-lg overflow-hidden">
                <div className="bg-elec-yellow/10 px-4 py-3 border-b border-elec-yellow/20">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-elec-yellow" />
                    <p className="text-base font-semibold text-elec-yellow">
                      Ground Rescue Person &mdash; Role Card
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    {
                      label: 'Presence',
                      text: 'Must be physically present at ground level during ALL elevated operations',
                      colour: 'text-green-400',
                      bg: 'bg-green-500/10',
                      border: 'border-green-500/30',
                    },
                    {
                      label: 'Competence',
                      text: "Must be competent with the specific machine's ground controls — familiarised and practised",
                      colour: 'text-blue-400',
                      bg: 'bg-blue-500/10',
                      border: 'border-blue-500/30',
                    },
                    {
                      label: 'Identification',
                      text: 'Must be identified TO THE OPERATOR before elevated work begins — both parties must know each other',
                      colour: 'text-purple-400',
                      bg: 'bg-purple-500/10',
                      border: 'border-purple-500/30',
                    },
                    {
                      label: 'Practice',
                      text: 'Must practise rescue drills regularly — at least every 6 months',
                      colour: 'text-amber-400',
                      bg: 'bg-amber-500/10',
                      border: 'border-amber-500/30',
                    },
                    {
                      label: 'Site Awareness',
                      text: 'Must understand site constraints and hazards — exclusion zones, traffic routes, overhead hazards',
                      colour: 'text-teal-400',
                      bg: 'bg-teal-500/10',
                      border: 'border-teal-500/30',
                    },
                    {
                      label: 'Communication',
                      text: 'Must maintain communication with the platform operator throughout elevated operations (radio, hand signals, voice)',
                      colour: 'text-cyan-400',
                      bg: 'bg-cyan-500/10',
                      border: 'border-cyan-500/30',
                    },
                  ].map((item, i) => (
                    <div key={i} className={`${item.bg} border ${item.border} p-3 rounded-lg`}>
                      <p className={`text-xs font-semibold ${item.colour} mb-1`}>{item.label}</p>
                      <p className="text-sm text-white/80">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Must NOT:</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Leave the vicinity</strong> during elevated
                      operations &mdash; they must remain at ground level near the machine at all
                      times
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Be assigned other duties</strong> that would
                      prevent immediate response to an emergency &mdash; the rescue role takes
                      priority over all other tasks
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Remember:</strong> If the ground rescue
                  person needs to leave the area for any reason, elevated operations must cease
                  until a replacement ground rescue person is in position and has been identified to
                  the operator. There must never be a gap in ground rescue coverage.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Rescue from Specific Emergency Scenarios */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Rescue from Specific Emergency Scenarios
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Different emergency scenarios require different approaches. While the three-option
                framework (A, B, C) provides the structure, the specific circumstances of each
                emergency determine the exact actions required. The following scenarios cover the
                most common situations encountered on site.
              </p>

              {/* Scenario: Medical — Conscious */}
              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HeartPulse className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-semibold text-green-400">
                    Medical Emergency &mdash; Operator Conscious
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      Use <strong className="text-white">Option A</strong> &mdash; lower the
                      platform using ground controls
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>Call an ambulance if the condition requires medical attention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      Provide first aid at ground level &mdash; do not attempt first aid on the
                      elevated platform
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      Communicate with the operator throughout &mdash; reassure them and monitor
                      their condition during descent
                    </span>
                  </li>
                </ul>
              </div>

              {/* Scenario: Medical — Unconscious */}
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HeartPulse className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-semibold text-amber-400">
                    Medical Emergency &mdash; Operator Unconscious
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Use <strong className="text-white">Option A</strong> &mdash; ground controls
                      override platform controls, so they work even when the operator cannot assist
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Call 999 immediately</strong> &mdash; do not
                      wait until the platform reaches the ground
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Lower with extreme care &mdash; the unconscious operator cannot brace or
                      protect themselves from sudden movements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Begin first aid immediately at ground level &mdash; recovery position if
                      breathing, CPR if not
                    </span>
                  </li>
                </ul>
              </div>

              {/* Scenario: Entrapment */}
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-semibold text-red-400">Entrapment (Crushing)</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">DO NOT reverse the movement</strong> that
                      caused the entrapment &mdash; this may worsen the injury by releasing pressure
                      on a wound or moving the operator further into the obstruction
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Use ground controls to <strong className="text-white">GENTLY</strong> move the
                      platform AWAY from the obstruction
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Call 999</strong> immediately &mdash;
                      entrapment injuries can be life-threatening
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Once freed, lower the platform using Option A and provide first aid at ground
                      level
                    </span>
                  </li>
                </ul>
              </div>

              {/* Scenario: Electrocution */}
              <div className="bg-yellow-500/10 border-2 border-yellow-500/40 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <p className="text-sm font-semibold text-yellow-400">
                    Electrocution (Contact with Live Conductors)
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        DO NOT touch the machine or the operator
                      </strong>{' '}
                      &mdash; the entire machine may be energised
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Call 999 AND the electricity distribution company
                      </strong>{' '}
                      immediately
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span>
                      Evacuate everyone to at least 10&nbsp;metres from the machine &mdash;
                      electricity can arc across gaps
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Wait for power to be isolated</strong> before
                      approaching the machine or attempting any rescue
                    </span>
                  </li>
                </ul>
              </div>

              {/* Scenario: Tilting/Overturning */}
              <div className="bg-red-500/10 border-2 border-red-500/40 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TriangleAlert className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-semibold text-red-400">
                    Machine Tilting or Overturning
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Evacuate the area immediately</strong> &mdash;
                      a tilting MEWP weighing several tonnes cannot be stopped by a person
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">DO NOT attempt to stabilise</strong> the
                      machine &mdash; you will be in the crush zone
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Call 999</strong> immediately
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      The operator should brace inside the platform and keep their harness connected
                      &mdash; do NOT jump
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Rescue Drill Practice */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Rescue Drill Practice
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A rescue plan is only effective if the people responsible for carrying it out have
                practised the procedure. Without regular practice, even well-written plans fail
                under the pressure of a real emergency. Drills must be realistic, documented, and
                reviewed.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> Rescue drills should be
                  practised at least every <strong>6&nbsp;months</strong> as a minimum. More
                  frequent practice may be needed where personnel change regularly, new machine
                  types are introduced, or previous drills identified issues that required
                  corrective action.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">
                    What the Drill Should Simulate
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-elec-yellow flex-shrink-0" />
                    <span>
                      Activating the ground controls &mdash; locating the panel, operating the
                      key/switch, and controlling all movements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-elec-yellow flex-shrink-0" />
                    <span>
                      Lowering the platform from working height to ground level using ground
                      controls
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-elec-yellow flex-shrink-0" />
                    <span>
                      Using emergency lowering systems &mdash; APU activation, manual lowering
                      valve, and hand pump where fitted
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-elec-yellow flex-shrink-0" />
                    <span>
                      Communication procedures &mdash; radio use, calling 999, briefing emergency
                      services
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-elec-yellow flex-shrink-0" />
                    <span>
                      First aid response &mdash; basic assessment and actions at ground level
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Radio className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">Recording the Drill</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Every drill must be formally recorded. The record should include:
                </p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/80">
                  {[
                    'Date and time of the drill',
                    'Names of all participants and their roles',
                    'Scenario practised (e.g. Option A, Option B, specific emergency)',
                    'Machine type and model used',
                    'Time taken to complete the rescue',
                    'Issues identified during the drill',
                    'Corrective actions required',
                    'Name of person who supervised the drill',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-teal-400" />
                  <p className="text-sm font-medium text-teal-400">
                    Debrief &amp; Continuous Improvement
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                    <span>
                      Debrief after each drill &mdash; discuss what went well, what went wrong, and
                      what needs improvement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                    <span>
                      Update the rescue plan if the drill reveals gaps, ambiguities, or unrealistic
                      assumptions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                    <span>Track response times &mdash; are they improving with practice?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                    <span>
                      Share lessons learnt with all MEWP operators and ground rescue persons on site
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">New Personnel</p>
                </div>
                <p className="text-sm text-white/80">
                  New personnel must participate in a rescue drill{' '}
                  <strong className="text-white">before</strong> being assigned as the ground rescue
                  person. Reading the rescue plan alone is not sufficient &mdash; they must
                  physically practise the procedure on the actual machine they will be responsible
                  for. This includes locating the ground controls, operating the emergency lowering
                  system, and demonstrating competence to a supervisor.
                </p>
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

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
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-5-section-4">
              Next: Post-Incident Procedures, RIDDOR &amp; Lessons Learnt
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
