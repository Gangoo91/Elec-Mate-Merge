import {
  ArrowLeft,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  Radio,
  Clock,
  FileText,
  Flame,
  Zap,
  Wind,
  HeartPulse,
  Truck,
  Ban,
  ListChecks,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'mewp-m5s1-rescue-scenarios',
    question:
      'Which of the following is NOT typically listed as an emergency scenario that a MEWP rescue plan must address?',
    options: [
      'Operator medical emergency such as a heart attack',
      "The operator's lunch break overrunning",
      'Hydraulic failure stranding the platform at height',
      'Fire on or near the machine',
    ],
    correctIndex: 1,
    explanation:
      'A rescue plan must address genuine emergency scenarios that could strand or endanger personnel at height. An overrunning lunch break is not an emergency scenario. Operator medical emergencies, hydraulic failures, and fire are all scenarios that require specific planned responses.',
  },
  {
    id: 'mewp-m5s1-communication',
    question:
      'What is the universally recognised emergency signal when visual communication is required from a MEWP platform?',
    options: [
      'One arm raised above the head',
      'Both arms waving above the head',
      'Pointing downwards with one hand',
      'Tapping the top of the hard hat',
    ],
    correctIndex: 1,
    explanation:
      'The internationally recognised emergency signal from a MEWP platform is both arms waving above the head. This means EMERGENCY STOP and is universally understood. All communication methods and signals must be agreed before work begins.',
  },
  {
    id: 'mewp-m5s1-review',
    question: 'How often should rescue plan practice drills be carried out as a minimum?',
    options: [
      'Once every two years',
      'Only after an accident has occurred',
      'At least every six months',
      'Only when the HSE requests it',
    ],
    correctIndex: 2,
    explanation:
      'Rescue drills should be practised at least every six months to ensure all personnel remain competent and confident in their roles. A rescue plan that has never been practised is significantly less likely to succeed in a real emergency.',
  },
];

const faqs = [
  {
    question: 'Who is responsible for creating the rescue plan for MEWP operations?',
    answer:
      'The duty holder (typically the employer or principal contractor) is responsible for ensuring a suitable rescue plan is in place before any MEWP work at height begins. This responsibility is set out in the Work at Height Regulations 2005. In practice, the rescue plan may be prepared by the site supervisor, safety officer, or a competent person with knowledge of the specific MEWP, the site conditions, and the work being carried out. However, regardless of who prepares it, the duty holder retains legal responsibility for its adequacy.',
  },
  {
    question: 'Does a rescue plan need to be written down, or can it be verbal?',
    answer:
      'A rescue plan must be documented in writing. A verbal plan is not sufficient because it cannot be reliably communicated to all personnel, reviewed, audited, or updated. The written plan must be available on site, communicated to all relevant personnel before elevation begins, and accessible for reference during an emergency. Under WAHR 2005, the plan must be proportionate to the level of risk — but for any MEWP operation, a written plan is the minimum acceptable standard.',
  },
  {
    question: 'What is suspension trauma, and why does it affect rescue plan timeframes?',
    answer:
      'Suspension trauma (also called harness hang syndrome) occurs when a person is suspended motionless in a harness after a fall. The harness straps compress the blood vessels in the legs, causing blood to pool in the lower limbs. This reduces blood flow to the heart and brain and can lead to loss of consciousness and death within 15 to 30 minutes if the casualty is not rescued and placed in a suitable position. This is why rescue plans must specify realistic timeframes and why rapid rescue capability is essential for any MEWP operation where harnesses are worn.',
  },
  {
    question: 'Can we rely on the emergency services (999) as our rescue plan?',
    answer:
      'No. While calling 999 should always be part of the emergency response, it cannot be the entire rescue plan. Emergency services may take 15 minutes or more to arrive, and they may not have the specialist equipment or training to rescue someone from a MEWP platform at height. The rescue plan must include provisions for immediate on-site rescue using trained personnel and appropriate equipment. Calling 999 should happen early in any emergency, but the site must have the capability to initiate rescue independently.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under which regulation is a rescue plan mandatory before anyone is elevated in a MEWP?',
    options: [
      'The Electricity at Work Regulations 1989',
      'The Work at Height Regulations 2005',
      'The Environmental Protection Act 1990',
      'The Building Regulations 2010',
    ],
    correctAnswer: 1,
    explanation:
      'The Work at Height Regulations 2005 (WAHR) require that a rescue plan is in place before any work at height begins. LOLER 1998, the Management of Health and Safety at Work Regulations 1999, and CDM 2015 also place duties relating to rescue planning, but WAHR 2005 is the primary regulation requiring a documented rescue plan.',
  },
  {
    id: 2,
    question: 'A rescue plan must be communicated to relevant personnel at what point?',
    options: [
      'After the first elevation of the day',
      'Before any elevation begins',
      'Only when an emergency occurs',
      'At the weekly site meeting',
    ],
    correctAnswer: 1,
    explanation:
      'The rescue plan must be communicated to ALL relevant personnel BEFORE any elevation begins. Every person involved must understand their role, the procedures, and the communication methods before the MEWP is operated at height.',
  },
  {
    id: 3,
    question:
      'Which of the following is a scenario that a MEWP rescue plan must specifically address?',
    options: [
      'The operator forgetting their PPE in the site cabin',
      'Platform entrapment against a structure',
      'A delay in the delivery of materials to site',
      'The operator needing a comfort break',
    ],
    correctAnswer: 1,
    explanation:
      'Platform entrapment against a structure is a recognised emergency scenario that can strand the operator at height. The rescue plan must include a specific response procedure for this scenario, including how to free the platform or rescue the operator by alternative means.',
  },
  {
    id: 4,
    question:
      'What is the primary method of communication recommended between platform and ground during MEWP operations?',
    options: ['Mobile phone', 'Hand signals only', 'Two-way radio', 'Shouting'],
    correctAnswer: 2,
    explanation:
      'Two-way radio is the recommended primary method of communication between the platform and ground level. Mobile phones are a backup but are not always reliable at height. Hand signals and audible alerts supplement radio communication but cannot replace it as the primary method.',
  },
  {
    id: 5,
    question: 'Suspension trauma can become life-threatening within what timeframe?',
    options: ['1 to 5 minutes', '15 to 30 minutes', '1 to 2 hours', '4 to 6 hours'],
    correctAnswer: 1,
    explanation:
      'Suspension trauma (harness hang syndrome) can become life-threatening within 15 to 30 minutes. The harness straps compress blood vessels in the legs, causing blood to pool and reducing flow to the heart and brain. This makes rapid rescue essential.',
  },
  {
    id: 6,
    question: 'How often should a rescue plan be reviewed as a minimum?',
    options: [
      'Every five years',
      'Only when an accident occurs',
      'At least annually',
      'Only when the HSE visits',
    ],
    correctAnswer: 2,
    explanation:
      'A rescue plan must be reviewed at least annually. It must also be updated following any fall or emergency incident, change in equipment, change in site conditions, change in operational details, or change in personnel. It is a living document that must be kept current.',
  },
  {
    id: 7,
    question: 'When should emergency services (999) be called during a MEWP emergency?',
    options: [
      'Only after all other rescue options have been exhausted',
      'Only if the operator is visibly injured',
      'Early — do not wait until all other options have failed',
      'Only if the site supervisor authorises the call',
    ],
    correctAnswer: 2,
    explanation:
      'Emergency services should be called EARLY in any MEWP emergency. Do not wait until all other rescue options have been tried and failed. Ambulance response times can be significant, so calling early ensures medical assistance arrives as quickly as possible while on-site rescue procedures are carried out simultaneously.',
  },
  {
    id: 8,
    question: 'Which of the following must be identified BY NAME or ROLE in the rescue plan?',
    options: [
      "The MEWP manufacturer's sales representative",
      'Trained rescue personnel',
      'The site security guard',
      "The client's project manager",
    ],
    correctAnswer: 1,
    explanation:
      'The rescue plan must identify trained rescue personnel by name and/or role. In an emergency, there must be no ambiguity about who is responsible for carrying out the rescue. These individuals must be present on site, trained, and competent to execute the rescue procedures.',
  },
];

export default function MewpModule5Section1() {
  useSEO({
    title: 'Emergency Scenarios & Rescue Plan Requirements | MEWP Module 5.1',
    description:
      'MEWP rescue plan requirements, emergency scenarios, communication methods, time-critical factors, and rescue plan maintenance for MEWP operator training.',
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 mb-4">
            <ShieldAlert className="h-7 w-7 text-red-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">
              MODULE 5 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Emergency Scenarios &amp; Rescue Plan Requirements
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the legal requirements for rescue plans, the emergency scenarios you must
            plan for, and how to maintain a rescue plan as a living document
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50">
            <p className="text-red-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Rescue plan:</strong> Mandatory before ANY elevation
              </li>
              <li>
                <strong>Scope:</strong> Every foreseeable emergency scenario
              </li>
              <li>
                <strong>Time:</strong> Rescue within 15&ndash;30 mins critical
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50">
            <p className="text-red-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Communicate:</strong> All personnel briefed before work
              </li>
              <li>
                <strong>Practise:</strong> Drills every 6 months minimum
              </li>
              <li>
                <strong>Review:</strong> At least annually, after any incident
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the legal requirement for a rescue plan before elevation',
              'Identify the emergency scenarios a rescue plan must address',
              'List the essential components of a MEWP rescue plan',
              'Describe communication methods for emergency situations',
              'Explain the time-critical factors affecting rescue outcomes',
              'Describe how to maintain and review a rescue plan',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Legal Requirement for Rescue Plans */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Legal Requirement for Rescue Plans
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A documented rescue plan is <strong>MANDATORY</strong> before anyone is elevated in
                a MEWP. This is not guidance or best practice &mdash; it is a legal requirement.
                Without a rescue plan in place, no MEWP operation may begin.
              </p>

              <p>
                The requirement for a rescue plan is established under multiple pieces of
                legislation:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Legislation Requiring Rescue Plans:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Work at Height Regulations 2005 (WAHR)</strong>{' '}
                      &mdash; Regulation 4 requires that work at height is properly planned,
                      including planning for emergencies and rescue
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Lifting Operations and Lifting Equipment Regulations 1998 (LOLER)
                      </strong>{' '}
                      &mdash; requires that lifting operations are properly planned and supervised,
                      including emergency procedures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Management of Health and Safety at Work Regulations 1999
                      </strong>{' '}
                      &mdash; requires employers to assess risks and put in place arrangements for
                      emergencies, including rescue
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Construction (Design and Management) Regulations 2015 (CDM)
                      </strong>{' '}
                      &mdash; requires principal contractors to plan, manage, and monitor
                      construction work, including emergency procedures
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The rescue plan must identify how the MEWP will be returned to ground level or how
                personnel will be brought to a safe area in every foreseeable emergency scenario. It
                must be <strong>communicated to ALL personnel</strong> before any elevation begins
                &mdash; not just to the operator, but to ground-level rescue personnel, supervisors,
                and anyone else who may be involved.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white mb-3">
                  <strong className="text-elec-yellow">Key Definition:</strong>
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Rescue Plan</p>
                    <p className="text-sm text-white/80">
                      A documented set of procedures that details how personnel will be rescued from
                      a MEWP in every foreseeable emergency scenario. It must be written,
                      site-specific, communicated to all relevant personnel, and practised
                      regularly. It is NOT just a document filed in the office &mdash; it must be
                      actively used, understood, and rehearsed.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Competent Rescue Person</p>
                    <p className="text-sm text-white/80">
                      A named individual on site who has been trained and assessed as competent to
                      carry out the rescue procedures detailed in the plan. They must be present on
                      site whenever the MEWP is in use at height and must have access to all
                      necessary rescue equipment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Requirement</p>
                </div>
                <p className="text-sm text-white/80">
                  A rescue plan is <strong className="text-white">not just a document</strong>. It
                  must be practised and understood by every person who has a role in it. A plan that
                  exists only on paper and has never been rehearsed is unlikely to succeed in a real
                  emergency, where stress, time pressure, and unfamiliar conditions can cause
                  trained procedures to fail.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Emergency Scenarios to Plan For */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Emergency Scenarios to Plan For
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The rescue plan must address <strong>every foreseeable emergency scenario</strong>{' '}
                that could occur during MEWP operations. Each scenario requires a{' '}
                <strong>specific response procedure</strong> &mdash; a generic &ldquo;call for
                help&rdquo; approach is not acceptable.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {/* Fuel / Battery */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Ban className="h-4 w-4 text-amber-400 flex-shrink-0" />
                    <p className="text-sm font-medium text-amber-400">
                      Fuel Depletion / Low Battery
                    </p>
                  </div>
                  <p className="text-sm text-white/80">
                    Power loss stranding the platform at height. Pre-use checks should minimise this
                    risk, but the plan must address it.
                  </p>
                </div>

                {/* Equipment Malfunction */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0" />
                    <p className="text-sm font-medium text-orange-400">Equipment Malfunction</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Hydraulic failure, electrical failure, or control failure preventing normal
                    descent. Emergency lowering procedures must be specified.
                  </p>
                </div>

                {/* Entrapment */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Ban className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <p className="text-sm font-medium text-red-400">Platform Entrapment</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Platform trapped against a structure, preventing normal retraction or descent.
                    May require ground-level override or alternative rescue method.
                  </p>
                </div>

                {/* Overload */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                    <p className="text-sm font-medium text-yellow-400">Platform Overload</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Load-sensing system activated, stranding occupants at height with all functions
                    locked out. Requires controlled load reduction or ground-level override.
                  </p>
                </div>

                {/* Medical Emergency */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <HeartPulse className="h-4 w-4 text-pink-400 flex-shrink-0" />
                    <p className="text-sm font-medium text-pink-400">Operator Medical Emergency</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Heart attack, seizure, loss of consciousness, or other medical event rendering
                    the operator incapable of self-rescue. Ground-level rescue essential.
                  </p>
                </div>

                {/* Crushing */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <p className="text-sm font-medium text-red-400">
                      Operator Entrapment / Crushing
                    </p>
                  </div>
                  <p className="text-sm text-white/80">
                    Operator trapped or crushed between the platform and a fixed structure. Requires
                    immediate emergency stop and controlled release.
                  </p>
                </div>

                {/* Electrocution */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                    <p className="text-sm font-medium text-cyan-400">
                      Electrocution / Electric Shock
                    </p>
                  </div>
                  <p className="text-sm text-white/80">
                    Contact with overhead power lines or live electrical equipment. Requires
                    isolation of the electrical source before any rescue attempt.
                  </p>
                </div>

                {/* Overturn */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="h-4 w-4 text-orange-400 flex-shrink-0" />
                    <p className="text-sm font-medium text-orange-400">
                      Machine Overturned / Tipping
                    </p>
                  </div>
                  <p className="text-sm text-white/80">
                    Machine overturned or in danger of overturning. Occupants must remain in the
                    platform. Specialist recovery equipment likely required.
                  </p>
                </div>

                {/* Extreme Weather */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <p className="text-sm font-medium text-blue-400">Extreme Weather Onset</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Sudden high winds, lightning, or severe weather conditions making continued
                    elevation dangerous. Requires immediate controlled descent.
                  </p>
                </div>

                {/* Fire */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <p className="text-sm font-medium text-red-400">Fire On or Near the Machine</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Fire risk to the MEWP, its occupants, or surrounding area. Requires immediate
                    descent and evacuation. Fire extinguisher must be accessible.
                  </p>
                </div>

                {/* Collision */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg sm:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="h-4 w-4 text-purple-400 flex-shrink-0" />
                    <p className="text-sm font-medium text-purple-400">
                      Collision with Vehicle or Other Plant
                    </p>
                  </div>
                  <p className="text-sm text-white/80">
                    Impact from a vehicle or other plant equipment on site. May destabilise the MEWP
                    or cause structural damage. Requires immediate assessment and potentially
                    specialist recovery.
                  </p>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Every Scenario Needs a Specific Response
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  A generic rescue plan is not acceptable. Each of the above scenarios presents
                  different hazards, requires different equipment, and demands different response
                  procedures. The rescue plan must detail the{' '}
                  <strong className="text-white">specific steps, equipment, and personnel</strong>{' '}
                  required for each scenario encountered on that particular site.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Rescue Plan Components */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Rescue Plan Components
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A compliant rescue plan must be comprehensive and site-specific. It is not
                sufficient to have a generic template &mdash; the plan must be tailored to the
                specific MEWP, the specific site, and the specific work being carried out.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ListChecks className="h-5 w-5 text-teal-400" />
                  <p className="text-sm font-medium text-teal-400">Rescue Plan Checklist</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Equipment specifications and storage locations
                      </strong>{' '}
                      &mdash; what rescue equipment is available, its specifications, and exactly
                      where it is stored on site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Equipment configuration for different scenarios
                      </strong>{' '}
                      &mdash; how rescue equipment is set up and deployed for each specific
                      emergency scenario
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Service and inspection schedules</strong>{' '}
                      &mdash; when rescue equipment was last inspected, when the next inspection is
                      due, and who is responsible
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Rescue kit contents and locations</strong>{' '}
                      &mdash; detailed list of what is in each rescue kit and its exact location on
                      site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Anchor point identification</strong> &mdash;
                      identified anchor points for rope rescue if needed, with load ratings
                      confirmed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Weather limitations</strong> &mdash; maximum
                      wind speeds, temperature limits, and conditions under which the MEWP must not
                      be operated or must be immediately lowered
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Trained rescue personnel (by name/role)
                      </strong>{' '}
                      &mdash; who is designated to carry out rescue, their training and competence,
                      and confirmation they are present on site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Emergency medical assistance contacts</strong>{' '}
                      &mdash; contact details for 999, nearest A&amp;E, site first aider, and the
                      procedure for summoning medical help
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Ground and auxiliary/emergency lowering procedures
                      </strong>{' '}
                      &mdash; step-by-step instructions for using the emergency lowering system from
                      both platform and ground level
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Communication methods</strong> &mdash; primary
                      and backup communication between platform and ground, including agreed signals
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Site-specific considerations</strong> &mdash;
                      access routes for emergency services, gate codes, meeting points, and any
                      site-specific hazards that could affect rescue operations
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Remember:</strong> The rescue plan must be{' '}
                  <strong>available on site at all times</strong> during MEWP operations. It must
                  not be locked in the site office or stored digitally without a means of access in
                  an emergency. A printed copy should be immediately accessible to the designated
                  rescue personnel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Communication During Emergencies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Communication During Emergencies
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Effective communication between the platform and the ground is essential during any
                emergency. The communication plan must be <strong>agreed BEFORE work starts</strong>{' '}
                &mdash; not improvised during a crisis.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Radio className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Communication Methods</p>
                </div>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Two-way radio (PRIMARY)</strong> &mdash; the
                      recommended primary communication method. Reliable, hands-free capable, works
                      in noisy environments, and does not depend on mobile network coverage. Must be
                      tested before work begins.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Mobile phone (BACKUP)</strong> &mdash; a
                      secondary backup. Not always reliable at height due to signal issues, and
                      requires the operator to use their hands. Should not be the sole communication
                      method.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hand signals (VISUAL)</strong> &mdash;
                      pre-agreed visual signals for situations where radio communication fails or is
                      impractical. Requires direct line of sight between platform and ground.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Whistle / horn (AUDITORY ALERT)</strong>{' '}
                      &mdash; used to attract attention in noisy environments or where visual
                      contact is intermittent. Supplements rather than replaces radio communication.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Universal Emergency Signal</p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    Both arms waving above the head = EMERGENCY STOP.
                  </strong>{' '}
                  This is the universally recognised emergency signal from a MEWP platform. All
                  personnel on site must know and recognise this signal. When seen, all MEWP
                  operations must cease immediately and the rescue procedure must be initiated.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Communication Requirements:</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The ground rescue person must maintain{' '}
                      <strong className="text-white">
                        visual and/or radio contact at all times
                      </strong>{' '}
                      while the platform is elevated
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      In noisy environments (construction sites, industrial settings), radio
                      communication is <strong className="text-white">essential</strong> &mdash;
                      voice alone will not carry
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      For multi-lingual workforces, ensure signals and emergency procedures are
                      understood by <strong className="text-white">all personnel</strong> regardless
                      of language. Use visual aids, translated briefings, or demonstrate procedures
                      physically
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      All communication equipment must be{' '}
                      <strong className="text-white">tested before each shift</strong> to confirm it
                      is working correctly and batteries are charged
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: The Time Factor */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            The Time Factor
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Rescue must be achievable within a <strong>realistic timeframe</strong>. Time is the
                single most critical factor in most MEWP emergency scenarios. A rescue plan that
                cannot be executed quickly enough is not a rescue plan &mdash; it is a false sense
                of security.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Suspension Trauma &mdash; The 15&ndash;30 Minute Window
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">Suspension trauma (harness hang syndrome)</strong>{' '}
                  can become life-threatening within{' '}
                  <strong className="text-white">15 to 30 minutes</strong> if an operator is
                  suspended in a harness after a fall. The harness straps compress blood vessels in
                  the legs, causing blood to pool in the lower limbs and reducing flow to the heart
                  and brain. Without rescue and proper positioning, loss of consciousness and death
                  can follow. This means that any rescue plan for a harness-wearing operator must be
                  executable <strong className="text-white">well within this timeframe</strong>.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Time-Critical Factors:</p>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Medical emergencies</strong> &mdash; heart
                      attack, stroke, and severe bleeding require immediate response. Every minute
                      of delay reduces the chance of survival and recovery
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cold weather</strong> &mdash; reduces the time
                      an incapacitated operator can survive at height. Hypothermia onset is
                      accelerated by wind chill, wet conditions, and immobility
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fire or chemical exposure</strong> &mdash;
                      rapidly escalating situations where seconds matter. Immediate descent is
                      essential
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Electrocution</strong> &mdash; the source must
                      be isolated before rescue, but the casualty may be in cardiac arrest and
                      require immediate CPR once safely lowered
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The rescue plan must specify <strong>expected rescue timeframes</strong> for each
                scenario. These timeframes must be realistic and based on actual practice drills,
                not theoretical estimates. If a practice drill reveals that rescue cannot be
                completed within the required timeframe, the plan must be revised &mdash; additional
                personnel, different equipment, or an alternative rescue method may be needed.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Call 999 EARLY</p>
                </div>
                <p className="text-sm text-white/80">
                  Emergency services (999) should be called{' '}
                  <strong className="text-white">EARLY</strong> in any MEWP emergency &mdash;{' '}
                  <strong className="text-white">
                    do not wait until all other options have failed
                  </strong>
                  . Ambulance response times can be significant, especially in rural areas or on
                  large construction sites with restricted access. Calling early ensures medical
                  assistance is on its way while on-site rescue procedures are being carried out
                  simultaneously.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Rescue Plan Maintenance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Rescue Plan Maintenance
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A rescue plan is a <strong>&ldquo;living document&rdquo;</strong> &mdash; it must
                not be filed away and forgotten. It requires active management, regular review, and
                ongoing practice to remain effective.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Review &amp; Update Requirements
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Review at least annually</strong> &mdash; even
                      if no incidents have occurred, the plan must be formally reviewed at least
                      once per year
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">After any fall or emergency incident</strong>{' '}
                      &mdash; any incident triggers an immediate review to identify what worked,
                      what failed, and what needs to change
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Change in equipment</strong> &mdash; new or
                      different MEWP, new rescue equipment, or changes to the MEWP configuration
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Change in site conditions</strong> &mdash; new
                      structures, changed access routes, new overhead hazards, or altered ground
                      conditions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Change in operational details</strong> &mdash;
                      different work activities, different working heights, or different areas of
                      the site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Change in personnel</strong> &mdash; new
                      operators, new rescue personnel, or personnel leaving the site. Named
                      individuals in the plan must be updated
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Practice Drills:</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Rescue drills must be practised{' '}
                      <strong className="text-white">
                        regularly &mdash; at least every 6 months
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Drills should simulate realistic scenarios, not just demonstrate procedures at
                      ground level
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      All personnel involved in rescue must participate &mdash; not just the
                      designated rescue person
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Drill results must be recorded, including time taken, issues identified, and
                      actions to improve
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Practical Summary</p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    A rescue plan is only as good as the people who know it and the drills that have
                    tested it. The key principles are:
                  </p>
                  <ul className="space-y-1.5 mt-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Written</strong> &mdash; documented and
                        available on site
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Communicated</strong> &mdash; briefed to all
                        personnel before work starts
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Practised</strong> &mdash; drills at least
                        every 6 months
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Reviewed</strong> &mdash; at least annually
                        and after any incident or change
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Understood</strong> &mdash; every person
                        knows their role
                      </span>
                    </li>
                  </ul>
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
            <Link to="../mewp-module-5-section-2">
              Next: Emergency Lowering Systems &amp; Ground Controls
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
