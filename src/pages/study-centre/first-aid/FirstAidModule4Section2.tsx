import { ArrowLeft, Brain, CheckCircle, AlertTriangle, Clock, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'seizure-management',
    question:
      'A colleague falls to the ground and begins jerking rhythmically. What is the FIRST thing you should do?',
    options: [
      'Hold them down firmly to stop the jerking',
      'Place something between their teeth to prevent them biting their tongue',
      'Clear the space around them and protect them from injury',
      'Immediately call 999 and begin CPR',
    ],
    correctIndex: 2,
    explanation:
      'The first action when someone has a seizure is to clear the space around them and protect them from injury — move furniture, sharp objects, and anything they could hit. Never restrain the casualty or put anything in their mouth. They will NOT swallow their tongue. Only call 999 if the seizure lasts more than 5 minutes, it is their first seizure, or other specific criteria are met.',
  },
  {
    id: 'hypo-recognition',
    question:
      'A diabetic colleague becomes shaky, sweaty, pale, and confused at work. Their blood sugar reading is 3.2 mmol/L. What should you give them?',
    options: [
      'A glass of water and tell them to rest',
      'Fast-acting sugar such as glucose tablets or a sugary drink, followed by slow-release carbohydrate',
      'Their insulin injection — they clearly need more insulin',
      'Nothing by mouth — call 999 immediately',
    ],
    correctIndex: 1,
    explanation:
      'A blood sugar of 3.2 mmol/L is below the 4 mmol/L threshold and confirms hypoglycaemia. Treatment for a conscious casualty is fast-acting sugar first (glucose tablets, sugary drink, fruit juice, sweets) to rapidly raise blood glucose, followed by slow-release carbohydrate (sandwich, cereal bar) to maintain levels. Never give insulin for a hypo — insulin lowers blood sugar further. Only withhold food/drink if the casualty is unconscious.',
  },
  {
    id: 'status-epilepticus',
    question:
      'A casualty has been having a continuous seizure for 7 minutes with no signs of stopping. What is this condition called, and what should you do?',
    options: [
      'Post-ictal phase — wait for them to recover naturally',
      'Absence seizure — monitor and reassure',
      'Status epilepticus — call 999 immediately, this is a medical emergency',
      'Febrile seizure — cool the casualty down with cold water',
    ],
    correctIndex: 2,
    explanation:
      'Status epilepticus is defined as a seizure lasting longer than 5 minutes, or repeated seizures without recovery between them. It is a life-threatening medical emergency requiring immediate 999 activation. The prolonged seizure activity can cause brain damage, respiratory failure, and cardiac arrest. Some casualties carry prescribed buccal midazolam (Buccolam) for this situation.',
  },
];

const faqs = [
  {
    question: "What should I do if I don't know whether a diabetic emergency is a hypo or a hyper?",
    answer:
      'If you are unsure whether the casualty is experiencing hypoglycaemia (low blood sugar) or hyperglycaemia (high blood sugar), always treat as hypoglycaemia and give sugar. If it is a hypo, the sugar will help quickly. If it is a hyper, the small amount of sugar you give will not make a significant difference to their already elevated blood glucose. Hyperglycaemia develops over hours or days, so a few glucose tablets will not materially worsen the situation. However, withholding sugar from a hypoglycaemic casualty can be life-threatening, as their brain is being starved of glucose.',
  },
  {
    question: 'Can a person swallow their tongue during a seizure?',
    answer:
      "No. It is physically impossible to swallow your tongue — it is anchored to the floor of the mouth by the frenulum. This is one of the most persistent myths in first aid. Never put anything in a seizing casualty's mouth — not your fingers, not a spoon, not a wallet, not a rolled-up cloth. Doing so risks breaking their teeth, injuring their jaw, causing them to vomit and aspirate, or injuring your own fingers. After the seizure stops, open the airway using a head tilt-chin lift and place them in the recovery position.",
  },
  {
    question: 'What is the difference between a tonic-clonic seizure and an absence seizure?',
    answer:
      "A tonic-clonic seizure (previously called grand mal) involves loss of consciousness, the body going rigid (tonic phase), followed by rhythmic jerking of the limbs (clonic phase). It is the most recognisable type of seizure and typically lasts 1 to 3 minutes. An absence seizure (previously called petit mal) is much more subtle — the person appears to 'blank out' or stare vacantly for a few seconds (typically 5-30 seconds). They may blink rapidly or make small repetitive movements. Absence seizures are most common in children and may not be immediately obvious to onlookers. They do not usually require first aid intervention beyond monitoring and reassurance.",
  },
  {
    question: 'If someone with diabetes is unconscious, can I rub glucose gel inside their cheek?',
    answer:
      'Current UK first aid guidelines advise against placing anything in the mouth of an unconscious casualty due to the risk of aspiration (inhaling it into the lungs). While glucose gel used to be recommended for this purpose, the Resuscitation Council UK now recommends calling 999 and placing the casualty in the recovery position. If the casualty carries a prescribed glucagon injection kit and you have been trained to use it, you may administer it by injecting into the outer thigh muscle. Glucagon stimulates the liver to release stored glucose into the bloodstream without requiring the casualty to swallow anything.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "During a tonic-clonic seizure, what does the 'tonic' phase involve?",
    options: [
      'Rhythmic jerking of the limbs and body',
      'Sudden loss of consciousness and the body going rigid',
      'Confusion and drowsiness after the seizure',
      'Brief staring episodes lasting a few seconds',
    ],
    correctAnswer: 1,
    explanation:
      'The tonic phase is the first stage of a tonic-clonic seizure. The casualty suddenly loses consciousness and their body goes rigid — all muscles contract simultaneously. They may fall to the ground, cry out (air being forced through the vocal cords), and their jaw may clench. This phase typically lasts 10 to 20 seconds before progressing to the clonic (jerking) phase.',
  },
  {
    id: 2,
    question: 'Which of the following is a reason to call 999 for a seizure?',
    options: [
      'The seizure lasts less than 2 minutes',
      'The casualty is a known epileptic who recovers quickly',
      'The seizure lasts longer than 5 minutes',
      'The casualty bites their tongue during the seizure',
    ],
    correctAnswer: 2,
    explanation:
      "A seizure lasting longer than 5 minutes is classified as status epilepticus — a medical emergency requiring immediate 999 activation. Other reasons to call 999 include: it is the casualty's first known seizure, they do not regain consciousness within 5 minutes of the seizure stopping, they have repeated seizures without recovery, they are injured, you are unsure if they have epilepsy, or the seizure occurred in water.",
  },
  {
    id: 3,
    question: 'What is the blood sugar threshold below which hypoglycaemia is diagnosed?',
    options: ['Below 6 mmol/L', 'Below 5 mmol/L', 'Below 4 mmol/L', 'Below 3 mmol/L'],
    correctAnswer: 2,
    explanation:
      "Hypoglycaemia is defined as a blood glucose level below 4 mmol/L. This is sometimes remembered as the '4 is the floor' rule. Normal blood glucose ranges between 4 and 7 mmol/L when fasting, and up to 11 mmol/L after meals. Below 4 mmol/L, the brain begins to be deprived of glucose, leading to the characteristic symptoms of shaking, sweating, confusion, and irritability.",
  },
  {
    id: 4,
    question:
      'A conscious hypoglycaemic casualty has been given glucose tablets and their symptoms have improved. What should you do next?',
    options: [
      'Nothing further — they are fine now',
      'Give them more glucose tablets immediately',
      'Give them a slow-release carbohydrate such as a sandwich or cereal bar',
      'Call 999 as they still need hospital treatment',
    ],
    correctAnswer: 2,
    explanation:
      'After treating hypoglycaemia with fast-acting sugar (glucose tablets, sugary drink), it is essential to follow up with a slow-release carbohydrate — a sandwich, cereal bar, toast, or biscuits. The fast-acting sugar raises blood glucose quickly but the effect is temporary. The slow-release carbohydrate provides sustained glucose release to prevent the blood sugar dropping again. Without this follow-up, the casualty may become hypoglycaemic again within 30 to 60 minutes.',
  },
  {
    id: 5,
    question: 'Which of the following is a sign of hyperglycaemia rather than hypoglycaemia?',
    options: [
      'Shaking and sweating',
      'Fruity or acetone-smelling breath',
      'Sudden onset of confusion within minutes',
      'Pale, cold, clammy skin',
    ],
    correctAnswer: 1,
    explanation:
      'Fruity or acetone-smelling breath is a classic sign of hyperglycaemia and indicates the presence of ketones in the blood — a hallmark of diabetic ketoacidosis (DKA). When cells cannot access glucose (due to lack of insulin), the body breaks down fat for energy, producing ketones as a by-product. Shaking, sweating, sudden confusion, and pale clammy skin are all signs of hypoglycaemia, which develops rapidly over minutes.',
  },
  {
    id: 6,
    question: 'What is buccal midazolam (Buccolam) used for?',
    options: [
      'Treating hypoglycaemia in unconscious diabetic casualties',
      'Treating status epilepticus — a seizure lasting more than 5 minutes',
      'Reversing the effects of anaphylaxis',
      'Providing pain relief after a seizure',
    ],
    correctAnswer: 1,
    explanation:
      "Buccal midazolam (brand name Buccolam) is a prescribed emergency medication for status epilepticus — a seizure lasting more than 5 minutes or repeated seizures without recovery. It is administered by squeezing the liquid into the buccal cavity (between the cheek and gum) where it is absorbed through the oral mucosa. It should only be administered if it is the casualty's own prescribed medication and the first aider has been trained to use it.",
  },
  {
    id: 7,
    question: 'What type of breathing pattern is associated with diabetic ketoacidosis (DKA)?',
    options: [
      'Agonal breathing — irregular gasps with long pauses',
      'Kussmaul breathing — deep, rapid, laboured breathing',
      'Cheyne-Stokes breathing — alternating deep and shallow breaths',
      'Apnoeic episodes — periods of no breathing',
    ],
    correctAnswer: 1,
    explanation:
      "Kussmaul breathing is a deep, rapid, laboured breathing pattern characteristic of diabetic ketoacidosis (DKA). It is the body's compensatory mechanism to 'blow off' excess carbon dioxide and correct the metabolic acidosis caused by high levels of ketones in the blood. The deep breaths also give the casualty's breath a distinctive fruity or acetone smell. Kussmaul breathing is a late and serious sign — call 999 immediately.",
  },
  {
    id: 8,
    question:
      'After a tonic-clonic seizure has stopped, the casualty is confused and drowsy. What is this phase called and what should you do?',
    options: [
      'The tonic phase — restrain them to prevent further injury',
      'The clonic phase — give them glucose tablets',
      'The post-ictal phase — check airway, place in recovery position, stay with them and reassure',
      'Status epilepticus — call 999 immediately',
    ],
    correctAnswer: 2,
    explanation:
      'The post-ictal phase follows a seizure and is characterised by confusion, drowsiness, headache, muscle aches, and sometimes temporary memory loss. It can last from a few minutes to several hours. During this phase, check the airway, place the casualty in the recovery position, stay with them, and provide calm reassurance. Do not give food or drink until they are fully alert and can swallow safely. Let them rest and recover at their own pace.',
  },
];

export default function FirstAidModule4Section2() {
  useSEO({
    title: 'Seizures, Diabetes & Anaphylaxis | First Aid Module 4.2',
    description:
      'Tonic-clonic seizure management, status epilepticus, hypoglycaemia and hyperglycaemia recognition and treatment, diabetic emergencies, and severe allergic reaction recap for first aiders.',
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
            <Link to="../first-aid-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Brain className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Seizures, Diabetes &amp; Anaphylaxis
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Managing tonic-clonic seizures, recognising diabetic emergencies, treating hypoglycaemia
            and hyperglycaemia, and understanding status epilepticus
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Seizures:</strong> Protect from injury, do NOT restrain, nothing in the
                mouth
              </li>
              <li>
                <strong>Hypo (low sugar):</strong> Give fast sugar, then slow-release carbohydrate
              </li>
              <li>
                <strong>Status epilepticus:</strong> Seizure &gt;5 mins &mdash; call 999 immediately
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">Key Numbers</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>4 mmol/L:</strong> Blood sugar below this = hypoglycaemia
              </li>
              <li>
                <strong>5 minutes:</strong> Seizure lasting longer = status epilepticus
              </li>
              <li>
                <strong>Unsure hypo or hyper?</strong> Always give sugar &mdash; it could save a
                life
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Describe the three phases of a tonic-clonic seizure and manage each phase appropriately',
              'List the criteria for calling 999 during or after a seizure, including recognition of status epilepticus',
              'Differentiate between Type 1 and Type 2 diabetes and explain why hypoglycaemia is the most common diabetic emergency',
              'Recognise and treat hypoglycaemia in both conscious and unconscious casualties',
              'Identify the signs of hyperglycaemia and diabetic ketoacidosis and explain when to call 999',
              'Apply the rule: if unsure whether hypo or hyper, treat as hypoglycaemia',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Epilepsy & Seizures — An Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            Epilepsy &amp; Seizures &mdash; An Overview
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Epilepsy is a neurological condition that causes recurrent seizures due to abnormal
                electrical activity in the brain. It affects approximately 1 in 100 people in the UK
                &mdash; around 600,000 individuals &mdash; making it one of the most common
                neurological conditions you may encounter as a first aider. A seizure occurs when
                there is a sudden burst of intense electrical activity in the brain, disrupting the
                normal way brain cells communicate with each other.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Important Distinction:</strong> Not all seizures
                  are caused by epilepsy. Seizures can also result from head injuries, low blood
                  sugar (hypoglycaemia), drug or alcohol withdrawal, heatstroke, eclampsia in
                  pregnancy, poisoning, and febrile convulsions in children. As a first aider, your
                  management of the seizure itself is the same regardless of the underlying cause.
                </p>
              </div>

              <p>
                The most recognisable type of seizure is the <strong>tonic-clonic seizure</strong>,
                previously known as a &ldquo;grand mal&rdquo; seizure. This is the type most people
                picture when they think of a seizure, and it is the one most likely to require first
                aid intervention. However, there are many other types of seizure, and understanding
                the range will help you recognise less obvious presentations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Other Types of Seizure</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Absence seizures</strong> (previously
                      &ldquo;petit mal&rdquo;) &mdash; brief staring episodes lasting 5&ndash;30
                      seconds. The person appears to &ldquo;blank out&rdquo; or daydream. Most
                      common in children. They may blink rapidly or make small lip-smacking
                      movements. The person usually has no memory of the episode.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Focal seizures</strong> (previously
                      &ldquo;partial seizures&rdquo;) &mdash; affect one specific area of the brain.
                      Symptoms depend on which part is affected and may include twitching of one arm
                      or leg, unusual sensations (tingling, d&eacute;j&agrave; vu, strange tastes or
                      smells), or confusion. The person may or may not lose awareness.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Febrile seizures</strong> &mdash; seizures
                      triggered by a high fever (temperature) in young children, typically between 6
                      months and 5 years of age. They are usually brief (under 5 minutes) and the
                      child recovers fully. While frightening to witness, they are generally not
                      harmful. Cool the child gently after the seizure has stopped and seek medical
                      advice.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Tonic-Clonic Seizure — Three Phases */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            The Tonic-Clonic Seizure &mdash; Three Phases
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A tonic-clonic seizure progresses through three distinct phases. Understanding each
                phase helps you recognise what is happening, predict what will happen next, and
                respond appropriately at each stage. The entire seizure typically lasts between 1
                and 3 minutes, though it can feel much longer to witnesses.
              </p>

              {/* Seizure Phases Box — 3-step */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Three Phases of a Tonic-Clonic Seizure
                </p>
                <div className="flex flex-col items-center gap-0">
                  {/* Phase 1: Tonic */}
                  <div className="w-full max-w-md bg-gradient-to-r from-red-500/20 to-red-400/20 border border-red-500/40 rounded-xl p-4 text-center">
                    <p className="text-lg font-bold text-red-400">Phase 1</p>
                    <p className="text-sm font-semibold text-white">Tonic Phase</p>
                    <p className="text-xs text-white/70 mt-1">
                      Sudden loss of consciousness. The body goes rigid as all muscles contract. The
                      casualty may fall to the ground and cry out as air is forced through the vocal
                      cords. The jaw clenches. Lasts{' '}
                      <strong className="text-white">10&ndash;20 seconds</strong>.
                    </p>
                  </div>
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-3 bg-white/30" />
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/30" />
                  </div>

                  {/* Phase 2: Clonic */}
                  <div className="w-full max-w-md bg-gradient-to-r from-amber-500/20 to-amber-400/20 border border-amber-500/40 rounded-xl p-4 text-center">
                    <p className="text-lg font-bold text-amber-400">Phase 2</p>
                    <p className="text-sm font-semibold text-white">Clonic Phase</p>
                    <p className="text-xs text-white/70 mt-1">
                      Rhythmic jerking movements of the limbs and body. The casualty may bite their
                      tongue, froth at the mouth, or lose bladder or bowel control. Breathing may be
                      irregular or temporarily absent. Typically lasts{' '}
                      <strong className="text-white">1&ndash;3 minutes</strong>.
                    </p>
                  </div>
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-3 bg-white/30" />
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/30" />
                  </div>

                  {/* Phase 3: Post-ictal */}
                  <div className="w-full max-w-md bg-gradient-to-r from-blue-500/20 to-blue-400/20 border border-blue-500/40 rounded-xl p-4 text-center">
                    <p className="text-lg font-bold text-blue-400">Phase 3</p>
                    <p className="text-sm font-semibold text-white">Post-Ictal Phase</p>
                    <p className="text-xs text-white/70 mt-1">
                      Jerking stops. The casualty may be confused, drowsy, disorientated, or have a
                      headache. They may have no memory of the seizure. May last{' '}
                      <strong className="text-white">minutes to hours</strong>. Check airway, place
                      in recovery position, stay and reassure.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Post-Ictal Care:</strong> The post-ictal phase
                  is often overlooked but is critically important. The casualty will be confused and
                  may try to get up and walk away before they are fully recovered. Stay with them,
                  speak calmly and reassuringly, and do not rush them. Do not give food or drink
                  until they are fully alert and can swallow safely. Let them rest. Some people feel
                  exhausted for hours or even a full day after a seizure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Seizure Management */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Seizure Management
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The primary goal of seizure first aid is to protect the casualty from injury during
                the seizure and ensure their airway is clear once the jerking has stopped. Most
                seizures are self-limiting and will stop on their own within 1 to 3 minutes. Your
                role is protective, not interventional.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">During the Seizure</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Protect from injury</strong> &mdash; clear the
                      space around the casualty. Move furniture, tools, sharp objects, and anything
                      they could strike during the jerking movements.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cushion the head</strong> &mdash; place
                      something soft under the head if possible (a folded jacket, blanket, jumper)
                      to prevent head injury from repeated contact with the ground.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Note the time</strong> &mdash; check the time
                      when the seizure started. If it lasts longer than 5 minutes, call 999. Timing
                      is critical for determining whether status epilepticus is developing.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Stay calm</strong> &mdash; reassure bystanders
                      and ask them to give the casualty space and privacy. Seizures can be
                      distressing to witness, but they are usually self-limiting.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    What NOT to Do During a Seizure
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span>
                      <strong className="text-white">Do NOT restrain the casualty</strong> &mdash;
                      do not hold them down or try to stop the jerking movements. Restraint can
                      cause muscle tears, fractures, or dislocations and does not shorten the
                      seizure.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span>
                      <strong className="text-white">Do NOT put anything in their mouth</strong>{' '}
                      &mdash; they will NOT swallow their tongue. Inserting objects risks breaking
                      teeth, injuring the jaw, causing vomiting and aspiration, or injuring your own
                      fingers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span>
                      <strong className="text-white">Do NOT move the casualty</strong> &mdash;
                      unless they are in immediate danger (e.g. on a road, near the edge of a
                      height, next to machinery).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span>
                      <strong className="text-white">Do NOT give food or drink</strong> &mdash; wait
                      until the seizure has stopped and the casualty is fully alert before offering
                      anything by mouth.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">After the Seizure Stops</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Check the airway</strong> &mdash; open the
                      airway using a head tilt-chin lift. Look for any obstructions (blood, vomit,
                      broken teeth).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Place in the recovery position</strong> &mdash;
                      once the jerking has completely stopped, roll the casualty onto their side to
                      allow fluids to drain from the mouth and keep the airway clear.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Stay with them</strong> &mdash; remain with the
                      casualty throughout the post-ictal phase. Reassure them calmly. They may be
                      confused and frightened.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Monitor breathing</strong> &mdash; continue to
                      monitor their breathing until they are fully recovered. Be prepared to begin
                      CPR if they stop breathing.
                    </span>
                  </li>
                </ul>
              </div>

              {/* When to Call 999 Warning Box */}
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">When to Call 999 for a Seizure</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      It is the casualty&rsquo;s{' '}
                      <strong className="text-white">first known seizure</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      The seizure lasts{' '}
                      <strong className="text-white">longer than 5 minutes</strong> (status
                      epilepticus)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      The casualty does{' '}
                      <strong className="text-white">not regain consciousness</strong> within 5
                      minutes of the seizure stopping
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Repeated seizures</strong> without recovery
                      between them
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      The casualty is <strong className="text-white">injured</strong> during the
                      seizure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      You are{' '}
                      <strong className="text-white">unsure whether they have epilepsy</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      The seizure occurred <strong className="text-white">in water</strong>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Status Epilepticus</p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Status epilepticus is defined as a seizure lasting{' '}
                    <strong className="text-white">longer than 5 minutes</strong>, or{' '}
                    <strong className="text-white">
                      repeated seizures without the casualty regaining consciousness between them
                    </strong>
                    . It is a life-threatening medical emergency. Call 999 immediately.
                  </p>
                  <p>
                    Prolonged seizure activity can cause brain damage due to oxygen deprivation,
                    respiratory failure, aspiration, metabolic disturbances, and cardiac arrest. The
                    longer the seizure continues, the harder it becomes to stop and the greater the
                    risk of permanent harm.
                  </p>
                  <p>
                    Some casualties with known epilepsy carry{' '}
                    <strong className="text-white">buccal midazolam (Buccolam)</strong> prescribed
                    specifically for this situation. It is administered by squeezing the pre-filled
                    syringe into the <strong className="text-white">buccal cavity</strong> (the
                    space between the cheek and the gum), where it is absorbed through the oral
                    mucosa.{' '}
                    <strong className="text-rose-300">
                      Only administer buccal midazolam if you have been trained to do so AND it is
                      the casualty&rsquo;s own prescribed medication.
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04: Diabetes — Understanding the Condition */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Diabetes &mdash; Understanding the Condition
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Diabetes is a condition where the body cannot properly regulate blood glucose
                (sugar) levels. Over 4.9 million people in the UK live with diabetes, and many more
                are undiagnosed. As a first aider, you are likely to encounter diabetic emergencies
                in the workplace, particularly hypoglycaemia. Understanding the difference between
                Type 1 and Type 2 diabetes helps you recognise why these emergencies occur and how
                best to respond.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-2">Type 1 Diabetes</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                      <span>
                        Autoimmune condition &mdash; the immune system destroys the
                        insulin-producing beta cells in the pancreas
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                      <span>
                        The body produces <strong className="text-white">no insulin at all</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                      <span>
                        Always managed with{' '}
                        <strong className="text-white">insulin injections</strong> or an insulin
                        pump
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                      <span>
                        Typically diagnosed in{' '}
                        <strong className="text-white">childhood or young adulthood</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                      <span>
                        Accounts for approximately <strong className="text-white">8%</strong> of all
                        diabetes cases
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                      <span>
                        At risk of{' '}
                        <strong className="text-white">diabetic ketoacidosis (DKA)</strong> if
                        insulin is missed
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Type 2 Diabetes</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400/60 flex-shrink-0" />
                      <span>
                        The body becomes{' '}
                        <strong className="text-white">resistant to insulin</strong> or the pancreas
                        produces insufficient insulin
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400/60 flex-shrink-0" />
                      <span>
                        May be managed with{' '}
                        <strong className="text-white">diet, tablets, or insulin</strong> (or a
                        combination)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400/60 flex-shrink-0" />
                      <span>
                        Typically diagnosed in <strong className="text-white">adulthood</strong>{' '}
                        (though increasingly seen in younger people)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400/60 flex-shrink-0" />
                      <span>
                        Accounts for approximately <strong className="text-white">90%</strong> of
                        all diabetes cases
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400/60 flex-shrink-0" />
                      <span>
                        Risk factors include{' '}
                        <strong className="text-white">obesity, inactivity, family history</strong>,
                        and ethnicity
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400/60 flex-shrink-0" />
                      <span>
                        Can develop{' '}
                        <strong className="text-white">
                          hyperosmolar hyperglycaemic state (HHS)
                        </strong>{' '}
                        as a complication
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Role of Insulin:</strong> Insulin is a
                  hormone produced by the pancreas that allows glucose to enter cells from the
                  bloodstream. Without insulin, glucose builds up in the blood (hyperglycaemia)
                  while the cells starve. Too much insulin (or not enough food) causes glucose
                  levels to drop too low (hypoglycaemia). Both extremes are dangerous, but
                  hypoglycaemia develops much more rapidly and is the diabetic emergency you are
                  most likely to encounter as a first aider.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Hypoglycaemia & Hyperglycaemia */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Hypoglycaemia &amp; Hyperglycaemia
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The two main diabetic emergencies are hypoglycaemia (low blood sugar) and
                hyperglycaemia (high blood sugar). As a first aider, <strong>hypoglycaemia</strong>{' '}
                is the emergency you will encounter most frequently because it develops rapidly
                &mdash; often within minutes &mdash; and requires immediate treatment.
                Hyperglycaemia develops more slowly over hours or days and is less likely to present
                as an acute workplace emergency, but you must still be able to recognise it.
              </p>

              {/* Hypo vs Hyper Comparison — 2-column grid */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Hypoglycaemia vs Hyperglycaemia
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Hypo Column */}
                  <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <p className="text-sm font-semibold text-amber-400">
                        Hypoglycaemia (Low Sugar)
                      </p>
                    </div>
                    <p className="text-xs text-white/60 mb-2">
                      Blood glucose &lt;4 mmol/L &mdash; rapid onset (minutes)
                    </p>
                    <p className="text-xs font-medium text-white mb-1.5">Causes:</p>
                    <ul className="text-xs text-white/80 space-y-1 mb-3">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-amber-400/60 flex-shrink-0" />
                        <span>Too much insulin</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-amber-400/60 flex-shrink-0" />
                        <span>Missed or delayed meal</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-amber-400/60 flex-shrink-0" />
                        <span>Excessive exercise</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-amber-400/60 flex-shrink-0" />
                        <span>Alcohol consumption</span>
                      </li>
                    </ul>
                    <p className="text-xs font-medium text-white mb-1.5">Signs &amp; Symptoms:</p>
                    <ul className="text-xs text-white/80 space-y-1">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-amber-400/60 flex-shrink-0" />
                        <span>Shaking, trembling</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-amber-400/60 flex-shrink-0" />
                        <span>Sweating, pale, cold, clammy</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-amber-400/60 flex-shrink-0" />
                        <span>Hungry, irritable, confused</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-amber-400/60 flex-shrink-0" />
                        <span>Palpitations, tingling lips</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-amber-400/60 flex-shrink-0" />
                        <span>Blurred vision, weakness</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-amber-400/60 flex-shrink-0" />
                        <span>May appear drunk</span>
                      </li>
                    </ul>
                  </div>

                  {/* Hyper Column */}
                  <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-purple-400" />
                      <p className="text-sm font-semibold text-purple-400">
                        Hyperglycaemia (High Sugar)
                      </p>
                    </div>
                    <p className="text-xs text-white/60 mb-2">
                      Blood glucose significantly elevated &mdash; slow onset (hours/days)
                    </p>
                    <p className="text-xs font-medium text-white mb-1.5">Causes:</p>
                    <ul className="text-xs text-white/80 space-y-1 mb-3">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                        <span>Missed insulin dose</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                        <span>Illness or infection</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                        <span>Stress</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                        <span>Excessive carbohydrate intake</span>
                      </li>
                    </ul>
                    <p className="text-xs font-medium text-white mb-1.5">Signs &amp; Symptoms:</p>
                    <ul className="text-xs text-white/80 space-y-1">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                        <span>Excessive thirst</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                        <span>Frequent urination</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                        <span>Fruity/acetone breath (ketones)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                        <span>Nausea, abdominal pain</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                        <span>Drowsiness, warm dry skin</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                        <span>Deep rapid breathing (Kussmaul)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">
                      Treating Hypoglycaemia &mdash; Conscious Casualty
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-3">
                    If the casualty is conscious, alert, and able to swallow safely, give
                    fast-acting sugar immediately, followed by slow-release carbohydrate:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg">
                      <p className="text-sm font-medium text-amber-400 mb-1">
                        Step 1: Fast-Acting Sugar
                      </p>
                      <ul className="text-xs text-white/80 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>Glucose tablets (3&ndash;5 tablets)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>
                            Sugary drink &mdash; <strong className="text-white">not</strong> diet or
                            sugar-free
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>Fruit juice (150&ndash;200 ml)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>Sweets (jelly babies, sugar lumps)</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-400 mb-1">
                        Step 2: Slow-Release Carbohydrate
                      </p>
                      <ul className="text-xs text-white/80 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>Sandwich (bread, toast)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>Cereal bar or flapjack</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>Biscuits, crackers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>Bowl of cereal, banana</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">
                      Treating Hypoglycaemia &mdash; Unconscious Casualty
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                      <span>
                        <strong className="text-white">Do NOT give food or drink</strong> &mdash; an
                        unconscious casualty cannot swallow safely and will aspirate (inhale
                        food/liquid into the lungs)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Call 999 immediately</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Place in the recovery position</strong> to
                        maintain the airway
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>
                        If the casualty carries a prescribed{' '}
                        <strong className="text-white">glucagon injection</strong> and you are
                        trained to use it, inject into the outer thigh muscle. Glucagon stimulates
                        the liver to release stored glucose
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Monitor breathing</strong> continuously until
                        help arrives
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">Treating Hyperglycaemia</p>
                  </div>
                  <div className="text-sm text-white/80 space-y-2">
                    <p>
                      Hyperglycaemia develops over hours or days and is less likely to present as an
                      acute emergency. However, if left untreated, it can progress to
                      life-threatening complications:
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Diabetic ketoacidosis (DKA)</strong>{' '}
                          &mdash; a life-threatening complication most common in Type 1 diabetes.
                          The body breaks down fat for energy, producing ketones that make the blood
                          acidic. Signs include fruity breath, Kussmaul breathing, nausea, abdominal
                          pain, and eventual loss of consciousness.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Hyperosmolar hyperglycaemic state (HHS)
                          </strong>{' '}
                          &mdash; more common in Type 2 diabetes. Extremely high blood sugar without
                          significant ketone production. Causes severe dehydration and can lead to
                          coma.
                        </span>
                      </li>
                    </ul>
                    <p>
                      <strong className="text-white">Treatment:</strong> Call 999 if the casualty is
                      drowsy, confused, vomiting, or has abnormal breathing. Monitor the casualty.
                      Place in the recovery position if they become unconscious. Do not attempt to
                      administer insulin &mdash; this is a clinical decision for paramedics and
                      hospital teams.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Golden Rule: Unsure? Give Sugar
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  If you are unsure whether a diabetic casualty is experiencing hypoglycaemia or
                  hyperglycaemia,{' '}
                  <strong className="text-white">
                    always treat as hypoglycaemia and give sugar
                  </strong>
                  . The reasoning is simple: if it is a hypo, the sugar could save their life. If it
                  is a hyper, the small amount of sugar you give will not make a significant
                  difference to their already elevated blood glucose level. Hyperglycaemia develops
                  over hours or days, so a few glucose tablets will not meaningfully worsen the
                  situation. Withholding sugar from a hypoglycaemic casualty, however, can be fatal.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06: Severe Allergic Reactions — Brief Recap */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Severe Allergic Reactions &mdash; Brief Recap
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Anaphylaxis was covered in detail in <strong>Module 3, Section 4</strong>. Here we
                provide a brief recap of the key points as anaphylaxis is a medical emergency that
                can overlap with the conditions covered in this section &mdash; for example,
                confusion and altered consciousness can occur in both anaphylaxis and diabetic
                emergencies, and seizures can sometimes occur during severe anaphylaxis.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Anaphylaxis &mdash; Key Reminders
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Recognition:</strong> Rapid onset of widespread
                      skin changes (rash, flushing, urticaria), swelling of the airway (tongue,
                      throat, lips), breathing difficulty (wheeze, stridor), and/or circulatory
                      collapse (low blood pressure, dizziness, loss of consciousness)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Treatment:</strong> Call 999 immediately. If
                      the casualty carries an adrenaline auto-injector (EpiPen, Jext, or Emerade),
                      help them use it or administer it into the outer thigh. Position the casualty
                      appropriately &mdash; sitting up if breathing difficulty is the main problem,
                      lying flat with legs raised if circulatory collapse is dominant
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Timing:</strong> Anaphylaxis is time-critical.
                      Adrenaline must be given as early as possible. A second dose can be given
                      after 5 minutes if there is no improvement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Common triggers:</strong> Insect stings (bees,
                      wasps), foods (nuts, shellfish, eggs, dairy), medications (antibiotics,
                      NSAIDs), latex. On construction sites, insect stings are a particular risk
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Cross-Reference:</strong> For the full
                  anaphylaxis management protocol, including detailed information on adrenaline
                  auto-injector use, positioning, and biphasic reactions, refer to{' '}
                  <strong>
                    Module 3, Section 4 &mdash; Severe Allergic Reactions &amp; Anaphylaxis
                  </strong>
                  .
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Differentiating Medical Emergencies
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Several medical emergencies can present with similar symptoms. Use these
                  distinguishing features to help guide your assessment:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Seizure:</strong> Sudden onset, loss of
                      consciousness with jerking movements, post-ictal confusion. Check for medical
                      alert jewellery indicating epilepsy.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hypoglycaemia:</strong> Gradual onset of
                      confusion, shaking, sweating, pallor. Often preceded by hunger and
                      irritability. Check for diabetic medical alert jewellery, blood glucose meter,
                      or insulin pen.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Anaphylaxis:</strong> Rapid onset following
                      exposure to a known or suspected allergen. Look for widespread skin changes,
                      airway swelling, and breathing difficulty as key distinguishing features.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Stroke:</strong> Sudden onset of facial
                      weakness, arm weakness, and/or speech problems (FAST test). No jerking
                      movements. No skin changes.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Workplace Considerations</p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    As an electrician, you should be aware that some of these medical emergencies
                    have specific workplace implications:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        A colleague with diabetes who works at height, in confined spaces, or with
                        live electrical systems should have a management plan in place with their
                        employer
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Someone experiencing a seizure while working at height is at extreme risk of
                        a fall &mdash; this is a dual emergency requiring both seizure management
                        and fall injury assessment
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Hypoglycaemia can mimic intoxication &mdash; never assume a confused
                        colleague is drunk; always consider a medical cause
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Know where colleagues keep their emergency medication (auto-injectors,
                        glucose tablets, glucagon, buccal midazolam) and ensure it is accessible on
                        site
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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-4-section-3">
              Next: Electric Shock &amp; Electrical Injuries
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
