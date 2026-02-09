import { ArrowLeft, RotateCcw, CheckCircle, AlertTriangle, Eye, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quiz questions (8)                                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'A casualty does not respond to your voice but pulls their arm away when you squeeze the trapezius muscle. What is their AVPU level?',
    options: ['A — Alert', 'V — Voice', 'P — Pain', 'U — Unresponsive'],
    correctAnswer: 2,
    explanation:
      "The casualty responds only to a painful stimulus (trapezius squeeze), not to voice. This places them at 'P' on the AVPU scale. They are not alert, they do not respond to verbal commands, but they are not fully unresponsive either.",
  },
  {
    id: 2,
    question: 'When should the recovery position be used?',
    options: [
      'Whenever a casualty is lying down',
      'When a casualty is unresponsive but breathing normally',
      'When a casualty is not breathing',
      'Only when a spinal injury is suspected',
    ],
    correctAnswer: 1,
    explanation:
      'The recovery position is used when a casualty is unresponsive BUT breathing normally. If they are not breathing, you must start CPR instead. If a spinal injury is suspected, maintain manual inline stabilisation rather than rolling them.',
  },
  {
    id: 3,
    question: 'In the recovery position, why is the head tilted back?',
    options: [
      'To allow the casualty to see their surroundings',
      'To keep the airway open and allow drainage from the mouth',
      'To reduce blood flow to the brain',
      'To prevent the casualty from rolling onto their back',
    ],
    correctAnswer: 1,
    explanation:
      'Tilting the head back maintains the airway in an open position by lifting the tongue away from the back of the throat. The downward-facing position of the mouth also allows any fluids (vomit, blood, saliva) to drain freely rather than blocking the airway.',
  },
  {
    id: 4,
    question: 'How often should you check the breathing of a casualty in the recovery position?',
    options: [
      'Every 5 minutes',
      'Every 10 minutes',
      'Every minute',
      'Only once, when first placed in position',
    ],
    correctAnswer: 2,
    explanation:
      "Resuscitation Council UK guidelines state you should check the casualty's breathing at least every minute while they are in the recovery position. Their condition can deteriorate rapidly, and you must be prepared to start CPR immediately if breathing stops.",
  },
  {
    id: 5,
    question:
      'A person who has fainted does not recover consciousness within 2 minutes. What should you do?',
    options: [
      'Continue to wait — fainting can take up to 10 minutes to resolve',
      'Splash cold water on their face',
      'Call 999 — failure to recover within 2 minutes suggests a more serious cause',
      'Sit them upright and give them a hot drink',
    ],
    correctAnswer: 2,
    explanation:
      'Simple fainting (vasovagal syncope) typically resolves within 1-2 minutes. If the casualty does not regain consciousness within 2 minutes, you should call 999 as this suggests a more serious underlying cause such as a cardiac event, stroke, or significant head injury.',
  },
  {
    id: 6,
    question: 'Why is the left lateral (recovery) position preferred for a pregnant casualty?',
    options: [
      'It is easier to roll a pregnant person onto their left side',
      'It prevents the weight of the uterus compressing the inferior vena cava, which could reduce blood return to the heart',
      'It reduces morning sickness',
      'It is only a preference — either side is equally safe',
    ],
    correctAnswer: 1,
    explanation:
      'In later pregnancy, the weight of the uterus can compress the inferior vena cava (the large vein returning blood to the heart) when the casualty lies on their back or right side. Placing them on their left side relieves this compression and maintains adequate blood flow to both the mother and the baby.',
  },
  {
    id: 7,
    question:
      'Which of the following is a cause of unconsciousness that may require urgent blood sugar treatment?',
    options: [
      'Epileptic seizure',
      'Hypoglycaemia (low blood sugar)',
      'Fainting from prolonged standing',
      'Hypothermia',
    ],
    correctAnswer: 1,
    explanation:
      'Hypoglycaemia (low blood sugar) in a diabetic casualty requires urgent treatment. If the casualty is still conscious enough to swallow, give them a fast-acting sugar source (glucose tablets, sugary drink, fruit juice). If they become unresponsive, place in the recovery position and call 999.',
  },
  {
    id: 8,
    question:
      'A casualty with a suspected spinal injury is unresponsive but breathing normally. What is the correct action?',
    options: [
      'Place them in the recovery position immediately',
      'Maintain manual inline stabilisation of the head and neck — only use the recovery position if you must leave to get help',
      'Start CPR regardless of breathing',
      'Sit them upright and support the head',
    ],
    correctAnswer: 1,
    explanation:
      'With a suspected spinal injury, you should maintain manual inline stabilisation (holding the head, neck and spine in alignment) rather than rolling them. The recovery position should only be used if you absolutely must leave the casualty unattended to summon help, as the risk of airway obstruction then outweighs the risk of spinal movement.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quick-check questions (3) — placed after sections 2, 4, 6         */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'avpu-scale-check',
    question:
      'A casualty opens their eyes when you speak to them loudly but cannot tell you their name and appears confused. What is their AVPU level?',
    options: [
      'A — Alert',
      'V — Voice (responds to verbal stimulus but is confused)',
      'P — Pain',
      'U — Unresponsive',
    ],
    correctIndex: 1,
    explanation:
      "The casualty responds to your voice (opens eyes, shows some awareness) but is confused. This places them at 'V' — Voice on the AVPU scale. They are not fully alert (would need to be orientated and talking) and they respond to voice, so they have not deteriorated to Pain or Unresponsive.",
  },
  {
    id: 'recovery-position-check',
    question:
      'After placing a casualty in the recovery position, their breathing becomes very shallow and then stops. What should you do?',
    options: [
      'Continue to monitor — breathing may restart on its own',
      'Roll them onto their back immediately and begin CPR',
      'Call 999 and wait for paramedics',
      'Tilt their head further back to open the airway',
    ],
    correctIndex: 1,
    explanation:
      'If a casualty in the recovery position stops breathing, you must roll them onto their back immediately and begin CPR (30 compressions to 2 rescue breaths). Call 999 if not already done. Do not wait — every second without circulation causes further damage to the brain and vital organs.',
  },
  {
    id: 'fainting-management-check',
    question:
      'A colleague faints at work. They regain consciousness after about 30 seconds. What is the most appropriate immediate action?',
    options: [
      'Tell them to stand up and get back to work',
      'Keep them lying flat, raise their legs 15-30 cm, loosen tight clothing, and ensure fresh air',
      'Place them in the recovery position',
      'Give them a hot cup of tea immediately',
    ],
    correctIndex: 1,
    explanation:
      'After a simple faint, keep the casualty lying flat with legs raised 15-30 cm to help blood return to the brain. Loosen any tight clothing (collar, tie, belt) and ensure adequate fresh air. Once they are fully conscious and feeling better, they can sit up slowly. Advise them to see their GP if this is the first episode or if it recurs.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Can the recovery position cause harm to someone with a spinal injury?',
    answer:
      'Yes, rolling a casualty with a spinal injury can potentially worsen the damage. This is why manual inline stabilisation is preferred when a spinal injury is suspected. However, if the casualty is at risk of airway obstruction (e.g. vomiting) or you must leave them to get help, the recovery position should be used because maintaining the airway takes priority over spinal protection. The Resuscitation Council UK states that a blocked airway will kill faster than a spinal injury.',
  },
  {
    question: 'How long can someone safely remain in the recovery position?',
    answer:
      'There is no strict time limit, but prolonged pressure on the lower arm can cause nerve damage or reduce circulation. Resuscitation Council UK guidelines recommend that if the casualty needs to remain in the recovery position for more than 30 minutes, you should carefully roll them onto the opposite side to relieve pressure on the lower arm. Continue to check breathing at least every minute regardless of how long they have been in position.',
  },
  {
    question: 'What is the difference between fainting and cardiac arrest?',
    answer:
      'Fainting (vasovagal syncope) is a temporary loss of consciousness caused by a brief drop in blood pressure and blood flow to the brain. The casualty typically recovers within 1-2 minutes and will be breathing normally throughout. Cardiac arrest is the complete cessation of heart function — the casualty will be unresponsive, not breathing normally (or showing agonal gasps only), and will die without immediate CPR and defibrillation. If in any doubt, treat as cardiac arrest and start CPR.',
  },
  {
    question: 'Should I put someone in the recovery position after an epileptic seizure?',
    answer:
      'Yes — once the seizure has stopped and the casualty is unresponsive but breathing normally, place them in the recovery position. Do NOT attempt to restrain them or put anything in their mouth during the seizure. Time the seizure: if it lasts more than 5 minutes, or if this is their first seizure, or if they have repeated seizures without regaining consciousness between them (status epilepticus), call 999 immediately.',
  },
];

/* ------------------------------------------------------------------ */
/*  Border colours for alternating sections                            */
/* ------------------------------------------------------------------ */
const borderColours = [
  'border-rose-500/50', // 01
  'border-blue-500/50', // 02
  'border-green-500/50', // 03
  'border-purple-500/50', // 04
  'border-cyan-500/50', // 05
  'border-amber-500/50', // 06
];

const numColours = [
  'text-rose-400/80',
  'text-blue-400/80',
  'text-green-400/80',
  'text-purple-400/80',
  'text-cyan-400/80',
  'text-amber-400/80',
];

const headingColours = [
  'text-rose-300',
  'text-blue-300',
  'text-green-300',
  'text-purple-300',
  'text-cyan-300',
  'text-amber-300',
];

/* ------------------------------------------------------------------ */
/*  AVPU scale data                                                    */
/* ------------------------------------------------------------------ */
const avpuLevels = [
  {
    letter: 'A',
    label: 'Alert',
    colour: 'green',
    borderClass: 'border-green-400/30',
    bgClass: 'bg-green-400/10',
    textClass: 'text-green-400',
    detail:
      'Eyes open spontaneously, talking, aware of surroundings. The casualty is orientated to person, place and time. They can tell you their name, where they are, and what happened.',
  },
  {
    letter: 'V',
    label: 'Voice',
    colour: 'blue',
    borderClass: 'border-blue-400/30',
    bgClass: 'bg-blue-400/10',
    textClass: 'text-blue-400',
    detail:
      "Responds to verbal commands or questions. May open eyes when spoken to, may make sounds or attempt to speak, but is often confused or disorientated. Does not meet the criteria for 'Alert'.",
  },
  {
    letter: 'P',
    label: 'Pain',
    colour: 'amber',
    borderClass: 'border-amber-400/30',
    bgClass: 'bg-amber-400/10',
    textClass: 'text-amber-400',
    detail:
      'Responds only to a painful stimulus such as a trapezius squeeze or earlobe pinch. May groan, flinch, or attempt to push your hand away. Does not respond to voice alone.',
  },
  {
    letter: 'U',
    label: 'Unresponsive',
    colour: 'red',
    borderClass: 'border-red-400/30',
    bgClass: 'bg-red-400/10',
    textClass: 'text-red-400',
    detail:
      'No response to voice or pain. The casualty is completely unresponsive. This is the most serious level and requires immediate assessment of the airway and breathing.',
  },
];

/* ------------------------------------------------------------------ */
/*  Recovery position steps (for diagram)                              */
/* ------------------------------------------------------------------ */
const recoverySteps = [
  {
    step: 1,
    title: 'Near arm at right angle',
    instruction:
      'Kneel beside the casualty. Place the arm nearest to you at a right angle to their body, elbow bent with palm facing upwards.',
    armNear: 'Right angle, palm up',
    armFar: 'By their side',
    legs: 'Both straight',
  },
  {
    step: 2,
    title: 'Far arm across chest',
    instruction:
      'Bring the far arm across the chest and hold the back of their hand against their near cheek. Keep holding it there.',
    armNear: 'Right angle, palm up',
    armFar: 'Across chest, hand on cheek',
    legs: 'Both straight',
  },
  {
    step: 3,
    title: 'Far leg bent, pull to roll',
    instruction:
      'With your other hand, grasp the far leg just above the knee and pull it up, keeping the foot flat on the ground. Pull the knee towards you to roll the casualty onto their side.',
    armNear: 'Right angle (now underneath)',
    armFar: 'Hand under cheek',
    legs: 'Upper leg bent at 90 degrees',
  },
  {
    step: 4,
    title: 'Tilt head, open airway',
    instruction:
      'Adjust the upper leg so both hip and knee are bent at right angles. Tilt the head back to ensure the airway remains open. Adjust the hand under the cheek to keep the head tilted and mouth facing downwards for drainage.',
    armNear: 'Supporting body (underneath)',
    armFar: 'Hand supporting head',
    legs: 'Upper leg at 90 degrees, stable',
  },
];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
const FirstAidModule2Section3 = () => {
  useSEO({
    title: 'Unconsciousness & the Recovery Position | First Aid Module 2 Section 3',
    description:
      'Causes of unconsciousness, AVPU scale, recovery position technique step-by-step, monitoring, fainting (vasovagal syncope), and when NOT to use the recovery position.',
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* -- Header ------------------------------------------------- */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* -- Main Content ------------------------------------------- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 mb-4">
            <RotateCcw className="h-8 w-8 text-rose-400" />
          </div>
          <div>
            <span className="inline-block bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
              MODULE 2 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Unconsciousness &amp; the Recovery Position
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            How to assess levels of consciousness using the AVPU scale and safely place an
            unresponsive, breathing casualty into the recovery position
          </p>
        </div>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4 text-center">
            <Eye className="h-6 w-6 text-rose-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold text-sm mb-1">Assess Response</h3>
            <p className="text-white/70 text-xs">
              Use the AVPU scale to determine the casualty&rsquo;s level of consciousness quickly
              and accurately
            </p>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4 text-center">
            <RotateCcw className="h-6 w-6 text-rose-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold text-sm mb-1">Recovery Position</h3>
            <p className="text-white/70 text-xs">
              Protect the airway of an unresponsive but breathing casualty by placing them on their
              side
            </p>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4 text-center">
            <Activity className="h-6 w-6 text-rose-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold text-sm mb-1">Monitor Continuously</h3>
            <p className="text-white/70 text-xs">
              Check breathing every minute and be prepared to start CPR immediately if breathing
              stops
            </p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-rose-500/30 rounded-lg p-4 sm:p-6 mb-10">
          <h2 className="text-lg font-semibold text-rose-300 mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Learning Outcomes
          </h2>
          <p className="text-white/60 text-sm mb-3">
            By the end of this section you will be able to:
          </p>
          <ul className="space-y-2 text-sm text-white">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
              <span>List common causes of unconsciousness in the workplace</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
              <span>Use the AVPU scale to assess a casualty&rsquo;s level of response</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
              <span>
                Demonstrate the correct technique for placing a casualty in the recovery position
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
              <span>Explain when NOT to use the recovery position and what to do instead</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
              <span>
                Recognise and manage fainting (vasovagal syncope) including when to call 999
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
              <span>Monitor a casualty in the recovery position and respond to deterioration</span>
            </li>
          </ul>
        </div>

        {/* -------------------------------------------------------- */}
        {/* SECTION 01 — Causes of Unconsciousness                    */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[0]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[0]} text-sm font-normal`}>01</span>
              Causes of Unconsciousness
            </h2>

            <div className="space-y-4 text-white">
              <p>
                Unconsciousness occurs when the brain&rsquo;s normal function is disrupted,
                resulting in a reduced or absent level of awareness. It can be caused by a wide
                range of conditions, some immediately life-threatening, others relatively benign. As
                a first aider, you do not need to diagnose the cause &mdash; but understanding the
                common causes helps you anticipate what may happen next and respond appropriately.
              </p>

              <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[0]} font-medium mb-3`}>Common Causes</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      cause: 'Head injury',
                      detail:
                        'Trauma to the skull causing concussion, bleeding or swelling within the brain',
                    },
                    {
                      cause: 'Stroke',
                      detail:
                        'Blocked or burst blood vessel in the brain (use FAST to recognise: Face, Arms, Speech, Time)',
                    },
                    {
                      cause: 'Poisoning',
                      detail:
                        'Ingestion, inhalation or absorption of toxic substances including carbon monoxide',
                    },
                    {
                      cause: 'Diabetes (hypo/hyperglycaemia)',
                      detail:
                        'Dangerously low or high blood sugar levels — hypoglycaemia is more commonly associated with sudden collapse',
                    },
                    {
                      cause: 'Epilepsy',
                      detail:
                        'Seizure activity disrupts normal brain function; post-ictal state may follow',
                    },
                    {
                      cause: 'Cardiac arrest',
                      detail: 'Heart stops pumping — brain is starved of oxygen within seconds',
                    },
                    {
                      cause: 'Fainting (vasovagal syncope)',
                      detail:
                        'Temporary drop in blood pressure and blood flow to the brain, usually brief',
                    },
                    {
                      cause: 'Drug/alcohol intoxication',
                      detail:
                        'Depressant substances suppress the central nervous system and reduce consciousness',
                    },
                    {
                      cause: 'Shock',
                      detail:
                        'Insufficient blood flow to vital organs — hypovolaemic, cardiogenic, anaphylactic or septic',
                    },
                    {
                      cause: 'Hypothermia',
                      detail:
                        'Core body temperature drops below 35 degrees C, progressively depressing brain function',
                    },
                    {
                      cause: 'Lack of oxygen (hypoxia)',
                      detail:
                        'Obstruction, choking, drowning, smoke inhalation, or confined space atmosphere',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <h4 className="text-white font-semibold text-sm mb-1">{item.cause}</h4>
                      <p className="text-white/70 text-xs leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">Key Point</h3>
                <p className="text-white/80 text-sm">
                  Regardless of the cause, your priorities as a first aider remain the same:{' '}
                  <strong>
                    ensure safety, assess response, open the airway, check breathing, and act
                    accordingly.
                  </strong>{' '}
                  The cause may become apparent, but managing the airway and breathing always comes
                  first.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* SECTION 02 — Levels of Response: The AVPU Scale           */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[1]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[1]} text-sm font-normal`}>02</span>
              Levels of Response &mdash; The AVPU Scale
            </h2>

            <div className="space-y-4 text-white">
              <p>
                The <strong>AVPU scale</strong> is a rapid, simple tool used by first aiders and
                emergency services to assess a casualty&rsquo;s level of consciousness. It takes
                only a few seconds to apply and provides a consistent way to communicate the
                casualty&rsquo;s condition to the ambulance service.
              </p>

              {/* AVPU cards — 4 coloured boxes */}
              <div className="grid sm:grid-cols-2 gap-4">
                {avpuLevels.map((level) => (
                  <div
                    key={level.letter}
                    className={`${level.bgClass} border ${level.borderClass} rounded-lg p-4`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${level.bgClass} border ${level.borderClass}`}
                      >
                        <span className={`font-bold text-xl ${level.textClass}`}>
                          {level.letter}
                        </span>
                      </div>
                      <span className={`font-semibold text-lg ${level.textClass}`}>
                        {level.label}
                      </span>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">{level.detail}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[1]} font-medium mb-2`}>How to Apply AVPU</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-400/20 border border-green-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-300 text-xs font-mono font-bold">1</span>
                    </div>
                    <div>
                      <strong>Approach and speak:</strong> &ldquo;Hello, can you hear me? Open your
                      eyes.&rdquo; If they respond fully &mdash; <strong>Alert (A)</strong>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-400/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-300 text-xs font-mono font-bold">2</span>
                    </div>
                    <div>
                      <strong>Speak louder, give a command:</strong> &ldquo;Squeeze my hand!&rdquo;
                      If they respond to this &mdash; <strong>Voice (V)</strong>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-mono font-bold">3</span>
                    </div>
                    <div>
                      <strong>Apply a painful stimulus:</strong> Trapezius squeeze or earlobe pinch.
                      If they respond &mdash; <strong>Pain (P)</strong>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-400/20 border border-red-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-mono font-bold">4</span>
                    </div>
                    <div>
                      <strong>No response at all:</strong> The casualty is{' '}
                      <strong>Unresponsive (U)</strong> &mdash; immediately open the airway and
                      check breathing
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Critical Action</h3>
                </div>
                <p className="text-white/80 text-sm">
                  If the casualty scores <strong>P or U</strong>, they are at risk of airway
                  obstruction because their muscle tone is reduced and the tongue may fall back and
                  block the throat.{' '}
                  <strong>Open the airway immediately using head tilt, chin lift.</strong> Then
                  check for normal breathing for up to 10 seconds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* -------------------------------------------------------- */}
        {/* SECTION 03 — The Recovery Position: When & How            */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[2]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[2]} text-sm font-normal`}>03</span>
              The Recovery Position &mdash; When &amp; How
            </h2>

            <div className="space-y-4 text-white">
              <p>
                The recovery position is used when a casualty is{' '}
                <strong>unresponsive but breathing normally</strong>. Its purpose is to maintain an
                open airway and allow any fluids (vomit, blood, saliva) to drain from the mouth
                rather than entering the lungs. It also provides a stable position that prevents the
                casualty from rolling onto their back.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className={`${headingColours[2]} font-medium mb-2`}>
                  When to Use the Recovery Position
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Casualty is <strong>unresponsive</strong> (P or U on AVPU)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Casualty is <strong>breathing normally</strong> (you have checked for at least
                      10 seconds)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>No suspected spinal injury</strong> (unless you must leave to get
                      help)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Recovery Position Diagram — 4-step visual */}
              <div className="bg-white/5 border border-green-400/30 rounded-lg p-4 sm:p-6">
                <h3 className="text-green-300 font-semibold mb-4 flex items-center gap-2">
                  <RotateCcw className="h-5 w-5" />
                  Recovery Position &mdash; Step-by-Step Diagram
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {recoverySteps.map((s) => (
                    <div
                      key={s.step}
                      className="bg-[#1a1a1a] border border-white/10 rounded-lg p-4 relative"
                    >
                      {/* Step number badge */}
                      <div className="absolute -top-3 -left-2 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{s.step}</span>
                      </div>

                      <h4 className="text-green-300 font-semibold text-sm mb-2 ml-4">{s.title}</h4>

                      {/* Simplified body diagram */}
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-center min-h-[100px] relative">
                          {/* Body outline */}
                          <div className="relative w-40 h-24">
                            {/* Torso */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-lg border-2 border-white/30 bg-white/5" />
                            {/* Head */}
                            <div
                              className={`absolute left-1/2 -translate-x-1/2 -top-1 w-6 h-6 rounded-full border-2 ${
                                s.step === 4
                                  ? 'border-green-400 bg-green-400/20'
                                  : 'border-white/30 bg-white/5'
                              }`}
                            />
                            {/* Near arm */}
                            <div
                              className={`absolute top-4 border-2 rounded-full h-1 ${
                                s.step >= 1
                                  ? 'left-0 w-8 border-rose-400 bg-rose-400/20'
                                  : 'left-2 w-6 border-white/30'
                              }`}
                              style={
                                s.step >= 1
                                  ? { transform: 'rotate(-90deg)', transformOrigin: 'right center' }
                                  : undefined
                              }
                            />
                            {/* Far arm */}
                            <div
                              className={`absolute top-4 border-2 rounded-full h-1 ${
                                s.step >= 2
                                  ? 'right-2 w-10 border-blue-400 bg-blue-400/20'
                                  : 'right-0 w-8 border-white/30'
                              }`}
                              style={
                                s.step >= 2
                                  ? { transform: 'rotate(45deg)', transformOrigin: 'left center' }
                                  : undefined
                              }
                            />
                            {/* Far leg */}
                            <div
                              className={`absolute bottom-0 right-4 border-2 rounded-full h-1 ${
                                s.step >= 3
                                  ? 'w-10 border-amber-400 bg-amber-400/20'
                                  : 'w-8 border-white/30'
                              }`}
                              style={
                                s.step >= 3
                                  ? { transform: 'rotate(-45deg)', transformOrigin: 'left center' }
                                  : undefined
                              }
                            />
                            {/* Near leg */}
                            <div className="absolute bottom-0 left-4 w-8 border-2 border-white/30 rounded-full h-1" />
                          </div>
                        </div>

                        {/* Limb key */}
                        <div className="grid grid-cols-2 gap-1 mt-2 text-xs">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-1 bg-rose-400 rounded-full" />
                            <span className="text-white/60">Near arm</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-1 bg-blue-400 rounded-full" />
                            <span className="text-white/60">Far arm</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-1 bg-white/30 rounded-full" />
                            <span className="text-white/60">Near leg</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-1 bg-amber-400 rounded-full" />
                            <span className="text-white/60">Far leg</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-white/80 text-xs leading-relaxed">{s.instruction}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed step-by-step technique */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-300 font-medium mb-3">
                  Recovery Position &mdash; Detailed Technique
                </h3>
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      1
                    </span>
                    <span>
                      <strong>Kneel beside the casualty</strong> at roughly waist level. Remove
                      spectacles if worn. Check pockets for bulky objects (keys, phone) that might
                      cause discomfort or injury when rolled.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      2
                    </span>
                    <span>
                      <strong>Place the arm nearest to you at a right angle</strong> to their body,
                      elbow bent with the palm facing upwards. This arm will act as a stop to
                      prevent the casualty rolling too far.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      3
                    </span>
                    <span>
                      <strong>Bring the far arm across the chest</strong> and hold the back of their
                      hand against the casualty&rsquo;s near cheek. Keep your hand there to support
                      the head during the roll.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      4
                    </span>
                    <span>
                      <strong>With your other hand, grasp the far leg just above the knee</strong>{' '}
                      and pull it up, keeping the foot flat on the ground.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      5
                    </span>
                    <span>
                      <strong>
                        Keeping their hand pressed against their cheek, pull on the far leg
                      </strong>{' '}
                      to roll the casualty towards you onto their side. Use a smooth, controlled
                      movement &mdash; do not let them fall.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      6
                    </span>
                    <span>
                      <strong>
                        Adjust the upper leg so both hip and knee are bent at right angles.
                      </strong>{' '}
                      This provides stability and prevents the casualty from rolling onto their
                      front.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      7
                    </span>
                    <span>
                      <strong>Tilt the head back to ensure the airway remains open.</strong> Use the
                      head tilt, chin lift manoeuvre. The tongue will fall forward, clearing the
                      back of the throat.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      8
                    </span>
                    <span>
                      <strong>Adjust the hand under the cheek if necessary</strong> to keep the head
                      tilted and the mouth facing downwards. This allows any fluids to drain freely
                      from the mouth rather than entering the airway.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* SECTION 04 — Monitoring in the Recovery Position          */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[3]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[3]} text-sm font-normal`}>04</span>
              Monitoring in the Recovery Position
            </h2>

            <div className="space-y-4 text-white">
              <p>
                Placing a casualty in the recovery position is not the end of your care. Continuous
                monitoring is essential because the casualty&rsquo;s condition can change rapidly
                &mdash; they may regain consciousness, or they may stop breathing and require CPR.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[3]} font-medium mb-2`}>Monitoring Checklist</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-400/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-300 text-xs font-mono font-bold">1</span>
                    </div>
                    <div>
                      <strong>Check breathing every minute:</strong> Look for chest movement, listen
                      for breath sounds at the mouth, feel for air on your cheek
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-400/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-300 text-xs font-mono font-bold">2</span>
                    </div>
                    <div>
                      <strong>Monitor for deterioration:</strong> Check skin colour, breathing rate,
                      and level of response. Note any changes and report them to the ambulance
                      service
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-400/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-300 text-xs font-mono font-bold">3</span>
                    </div>
                    <div>
                      <strong>Be prepared to start CPR:</strong> If breathing stops or becomes
                      abnormal (agonal gasps only), roll the casualty onto their back and begin CPR
                      immediately (30:2)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-400/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-300 text-xs font-mono font-bold">4</span>
                    </div>
                    <div>
                      <strong>Note the time:</strong> Record when the casualty was found, when 999
                      was called, when they were placed in the recovery position, and any changes in
                      condition. This information is vital for the ambulance crew
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-400/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-300 text-xs font-mono font-bold">5</span>
                    </div>
                    <div>
                      <strong>Change sides after 30 minutes if still in position:</strong> Prolonged
                      pressure on the lower arm can cause nerve damage. Carefully roll onto the
                      opposite side if the wait is extended
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Warning Signs of Deterioration</h3>
                </div>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Breathing becomes noisy, laboured, or stops:
                      </strong>{' '}
                      Recheck airway position. If breathing stops, start CPR
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Skin becomes pale, grey, or blue (cyanosis):
                      </strong>{' '}
                      Indicates inadequate oxygen. Check airway and breathing immediately
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Vomiting:</strong> The recovery position should
                      allow drainage, but if copious, you may need to clear the mouth and reposition
                      the head
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Seizure activity:</strong> Protect from injury.
                      Once the seizure ends, recheck airway and breathing
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* -------------------------------------------------------- */}
        {/* SECTION 05 — When NOT to Use the Recovery Position &      */}
        {/*              Modifications                                */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[4]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[4]} text-sm font-normal`}>05</span>
              When NOT to Use the Recovery Position &amp; Modifications
            </h2>

            <div className="space-y-4 text-white">
              <p>
                The recovery position is not always appropriate. There are specific situations where
                an alternative approach is safer, and modifications may be needed for certain
                casualties.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    When NOT to Use the Recovery Position
                  </h3>
                </div>
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Suspected spinal injury:</strong> Maintain manual inline stabilisation
                      (hold the head, neck, and spine in alignment) rather than rolling the
                      casualty. Only use the recovery position if you{' '}
                      <strong>must leave the casualty unattended</strong> to summon help, as the
                      risk of airway obstruction then outweighs the risk of spinal movement
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Not breathing:</strong> If the casualty is not breathing normally
                      (absent or agonal gasps only), start CPR immediately &mdash; the recovery
                      position is for breathing casualties only
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Serious injuries preventing positioning:</strong> Multiple fractures,
                      impaled objects, or injuries to the pelvis or femur may make it impossible to
                      safely roll the casualty. Maintain the airway by other means (head tilt, chin
                      lift; jaw thrust if trained)
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[4]} font-medium mb-3`}>
                  Modifications for Special Circumstances
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <h4 className="text-cyan-300 font-semibold text-sm mb-1">Pregnant Casualty</h4>
                    <p className="text-white/80 text-sm">
                      Place on the <strong>left side</strong> (left lateral position). In later
                      pregnancy, the weight of the uterus can compress the inferior vena cava if the
                      casualty lies on their back or right side, reducing blood return to the heart.
                      The left lateral position relieves this compression and maintains circulation
                      to both mother and baby.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <h4 className="text-cyan-300 font-semibold text-sm mb-1">
                      Large or Heavy Casualty
                    </h4>
                    <p className="text-white/80 text-sm">
                      You may need <strong>assistance from a second person</strong> to safely roll a
                      large or heavy casualty. One person controls the head and shoulders while the
                      other controls the hips and legs. Do not attempt to roll a very heavy casualty
                      alone if it could result in you losing control of the movement.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <h4 className="text-cyan-300 font-semibold text-sm mb-1">
                      Casualty on a Slope
                    </h4>
                    <p className="text-white/80 text-sm">
                      Ideally, position the casualty so their <strong>head is uphill</strong> to
                      prevent blood pooling in the head. If this is not possible, place them in the
                      recovery position on whichever side allows the best airway management and
                      drainage, and monitor closely for any tendency to slide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* SECTION 06 — Fainting (Vasovagal Syncope) & Recovery     */}
        {/*              from Unconsciousness                         */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[5]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[5]} text-sm font-normal`}>06</span>
              Fainting (Vasovagal Syncope) &amp; Recovery from Unconsciousness
            </h2>

            <div className="space-y-4 text-white">
              <p>
                Fainting is one of the most common causes of brief unconsciousness in the workplace.
                It is caused by a temporary drop in blood pressure that reduces blood flow to the
                brain. Although usually harmless, it can result in injury from the fall and must be
                managed correctly.
              </p>

              <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[5]} font-medium mb-3`}>Causes of Fainting</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    'Prolonged standing, especially in hot environments',
                    'Heat and poor ventilation',
                    'Emotional stress, shock or distressing sights',
                    'Dehydration and inadequate food intake',
                    'Severe or sudden pain',
                    'Standing up too quickly (postural hypotension)',
                  ].map((cause, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                      <span className="text-white/80">{cause}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-amber-300 font-medium mb-2">Recognition</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Before fainting:</strong> Pale, sweaty, lightheaded, complains of
                      feeling &ldquo;dizzy&rdquo; or &ldquo;faint&rdquo;, may have blurred vision or
                      ringing in the ears
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>During the faint:</strong> Briefly unresponsive, pale, may have brief
                      muscle twitching (not a seizure), slow pulse
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Recovery:</strong> Usually regains consciousness within 1&ndash;2
                      minutes, may feel nauseous, clammy, and tired
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="text-amber-300 font-medium mb-2">Treatment</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      1
                    </span>
                    <span>
                      <strong>Lie the casualty flat</strong> on their back. If they are about to
                      faint and still conscious, help them sit or lie down safely before they fall
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      2
                    </span>
                    <span>
                      <strong>Raise their legs 15&ndash;30 cm</strong> (approximately 6&ndash;12
                      inches) to help blood return to the brain. Support on a chair, box, or your
                      knees
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      3
                    </span>
                    <span>
                      <strong>Loosen tight clothing</strong> &mdash; collar, tie, belt, overalls
                      &mdash; anything that may restrict breathing or circulation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      4
                    </span>
                    <span>
                      <strong>Ensure fresh air</strong> &mdash; open windows, move bystanders away,
                      create space around the casualty
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      5
                    </span>
                    <span>
                      <strong>Once fully conscious, offer a sip of water</strong> &mdash; only if
                      they can swallow safely. Do not give food or drink to a casualty who is not
                      fully alert
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">When to Call 999</h3>
                </div>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Casualty does not recover within <strong>2 minutes</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Casualty <strong>hit their head</strong> when they fell
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Casualty is <strong>pregnant</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Casualty has a <strong>known heart condition</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Repeated episodes</strong> of fainting
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Casualty had a <strong>seizure</strong> during or after the faint
                    </span>
                  </li>
                </ul>
              </div>

              {/* Recovery from unconsciousness */}
              <div className="bg-white/5 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">Recovery from Unconsciousness</h3>
                <p className="text-white/80 text-sm mb-3">
                  When a casualty begins to regain consciousness, follow these steps:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      1
                    </span>
                    <span>
                      <strong>Reassure them:</strong> Speak calmly and clearly. Tell them who you
                      are, where they are, and that help is on the way
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      2
                    </span>
                    <span>
                      <strong>Explain what happened:</strong> Briefly tell them they were
                      unconscious and what you have done. Do not overwhelm them with detail
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      3
                    </span>
                    <span>
                      <strong>Monitor:</strong> Continue to observe them closely. They may
                      deteriorate again. Do not leave them alone until you are confident they are
                      stable
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      4
                    </span>
                    <span>
                      <strong>Advise medical follow-up:</strong> Any loss of consciousness should be
                      reviewed by a GP or at hospital. Even if the casualty feels well, advise them
                      to seek medical advice and not to drive or operate machinery until cleared
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 06 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* -------------------------------------------------------- */}
        {/* FAQs                                                      */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-rose-400/80 text-sm font-normal">07</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* Quiz                                                      */}
        {/* -------------------------------------------------------- */}
        <div className="mt-12">
          <Quiz title="Unconsciousness & the Recovery Position Quiz" questions={quizQuestions} />
        </div>

        {/* -------------------------------------------------------- */}
        {/* Navigation                                                */}
        {/* -------------------------------------------------------- */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-2-section-4">
              Next: Choking Management
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default FirstAidModule2Section3;
