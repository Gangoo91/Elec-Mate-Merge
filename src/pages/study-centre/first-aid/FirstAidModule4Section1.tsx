import { ArrowLeft, HeartPulse, CheckCircle, AlertTriangle, Clock, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'fa-heart-attack-position',
    question:
      'What is the recommended position for a casualty experiencing a suspected heart attack?',
    options: [
      'Lying flat on their back with legs elevated',
      'Seated with knees bent, leaning against a wall or chair for support (the W or cardiac position)',
      'Standing upright and walking slowly to improve circulation',
      'Recovery position on their left side',
    ],
    correctIndex: 1,
    explanation:
      'The recommended position is seated with knees bent (the W or cardiac position), leaning against a wall or chair for support. This reduces strain on the heart. The casualty should never be encouraged to walk around during a suspected heart attack.',
  },
  {
    id: 'fa-angina-vs-heart-attack',
    question: 'What is the key indicator that distinguishes angina from a heart attack?',
    options: [
      'Angina only affects women; heart attacks only affect men',
      'Angina causes pain in the left arm; heart attacks cause chest pain',
      'Angina pain is relieved by rest and GTN spray within 3 to 5 minutes; heart attack pain is NOT relieved by GTN',
      'Angina always requires hospitalisation; heart attacks can be treated at home',
    ],
    correctIndex: 2,
    explanation:
      'The critical difference is that angina pain is typically relieved by rest and GTN spray within 3 to 5 minutes. If GTN does not relieve the pain within 5 minutes, you should treat the casualty as having a heart attack and call 999 immediately.',
  },
  {
    id: 'fa-stroke-fast',
    question: "In the FAST stroke test, what does the letter 'T' stand for?",
    options: [
      "Temperature &mdash; check the casualty's body temperature",
      'Tongue &mdash; check whether the tongue is swollen',
      'Time &mdash; time to call 999 if any single sign is present',
      'Touch &mdash; test whether the casualty can feel touch on both sides',
    ],
    correctIndex: 2,
    explanation:
      'T stands for Time &mdash; time to call 999 immediately if any single sign of stroke is present. Time is critical in stroke treatment because clot-busting medication (thrombolysis) must be administered within 4.5 hours of symptom onset, and noting the exact time symptoms started is vital for treatment decisions.',
  },
];

const faqs = [
  {
    question: 'Can I give aspirin to someone I suspect is having a heart attack?',
    answer:
      'Yes, provided certain conditions are met. You should give a single 300mg aspirin tablet, chewed (not swallowed whole), to speed absorption into the bloodstream. However, you must only give aspirin if the casualty is conscious and able to swallow, is not allergic to aspirin, is not under 16 years of age, is not currently taking anticoagulant medication (such as warfarin), and it is a genuine aspirin tablet (not ibuprofen or paracetamol). If in any doubt, do not give aspirin &mdash; wait for the ambulance crew.',
  },
  {
    question: 'Why should I NOT give aspirin or food and drink to a stroke casualty?',
    answer:
      "There are two types of stroke: ischaemic (caused by a clot) and haemorrhagic (caused by a bleed). If the stroke is haemorrhagic, aspirin would worsen the bleeding because it is an antiplatelet medication. Since you cannot determine the type of stroke in a first aid setting, aspirin must be avoided until medical professionals have confirmed the cause. Food and drink must also be avoided because a stroke may affect the casualty's ability to swallow (dysphagia), creating a serious choking and aspiration risk.",
  },
  {
    question: 'What is the difference between a stroke and a TIA?',
    answer:
      'A stroke causes permanent brain damage due to a blockage (ischaemic) or bleed (haemorrhagic) in the blood vessels supplying the brain. Symptoms persist and may be permanent. A TIA (transient ischaemic attack), often called a &lsquo;mini-stroke&rsquo;, produces the same symptoms but they resolve completely within 24 hours, usually within minutes to a few hours. Despite being temporary, a TIA is a serious warning sign &mdash; approximately 1 in 10 people who have a TIA will go on to have a full stroke within 90 days. Anyone who experiences TIA symptoms must be assessed by a medical professional urgently, ideally within 24 hours.',
  },
  {
    question: 'How do heart attack symptoms differ in women?',
    answer:
      'Women are more likely to experience atypical heart attack symptoms compared with men. While some women do have the classic crushing central chest pain, others may present with jaw pain, nausea, unexplained fatigue, back pain, shortness of breath, or abdominal discomfort &mdash; and may not experience noticeable chest pain at all. This can lead to delayed recognition and treatment. As a first aider, always consider the possibility of a heart attack in any person (regardless of sex) who presents with unexplained pain in the chest, jaw, back, or arms, especially if accompanied by sweating, breathlessness, or nausea.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the primary cause of a heart attack (myocardial infarction)?',
    options: [
      'A temporary narrowing of the coronary arteries due to stress',
      'A blockage in one or more coronary arteries cutting off blood supply to the heart muscle',
      'An irregular heartbeat caused by electrical disturbance',
      'A tear in the wall of the aorta',
    ],
    correctAnswer: 1,
    explanation:
      'A heart attack (myocardial infarction) occurs when one or more of the coronary arteries becomes blocked, usually by a blood clot forming on a fatty plaque. This cuts off the blood supply to part of the heart muscle, which begins to die if the blockage is not cleared quickly.',
  },
  {
    id: 2,
    question:
      'Why should a 300mg aspirin tablet be chewed rather than swallowed whole during a suspected heart attack?',
    options: [
      'Chewing makes it easier to swallow without water',
      'Chewing speeds up absorption into the bloodstream so it can begin working faster',
      'Chewing reduces the risk of an allergic reaction',
      'Chewing prevents the tablet from causing stomach irritation',
    ],
    correctAnswer: 1,
    explanation:
      'Chewing the aspirin breaks it into smaller particles, dramatically increasing the surface area and allowing it to be absorbed into the bloodstream much faster than if swallowed whole. In a heart attack, speed is critical &mdash; the aspirin acts as an antiplatelet agent, helping to prevent further clotting in the blocked artery.',
  },
  {
    id: 3,
    question: 'What percentage of strokes are ischaemic (caused by a clot)?',
    options: ['50%', '65%', '75%', '85%'],
    correctAnswer: 3,
    explanation:
      'Approximately 85% of all strokes are ischaemic, caused by a blood clot blocking a blood vessel in the brain. The remaining 15% are haemorrhagic, caused by a bleed from a ruptured blood vessel in the brain.',
  },
  {
    id: 4,
    question:
      'If a casualty uses their GTN spray for chest pain and the pain is not relieved within 5 minutes, what should you do?',
    options: [
      'Give a second dose of GTN and wait another 10 minutes',
      'Assume the pain is muscular and apply a cold compress',
      'Treat as a heart attack &mdash; call 999 immediately',
      'Give ibuprofen for pain relief instead',
    ],
    correctAnswer: 2,
    explanation:
      'If GTN does not relieve the chest pain within 5 minutes, you must treat the casualty as having a heart attack and call 999 immediately. Angina pain is typically relieved by rest and GTN within 3 to 5 minutes; if it persists beyond this, a heart attack should be suspected.',
  },
  {
    id: 5,
    question: "In the FAST test, what does the 'A' stand for, and what are you checking?",
    options: [
      'Alertness &mdash; is the casualty alert and oriented?',
      'Arms &mdash; can the casualty raise both arms and keep them there?',
      "Airway &mdash; is the casualty's airway clear?",
      'Aspirin &mdash; has the casualty taken aspirin?',
    ],
    correctAnswer: 1,
    explanation:
      'A stands for Arms. You are checking whether the casualty can raise both arms and keep them raised. Arm weakness (inability to raise one or both arms, or one arm drifting downwards) is a key sign of stroke.',
  },
  {
    id: 6,
    question: 'Why is noting the time of stroke symptom onset so important?',
    options: [
      'It determines which hospital the casualty should be taken to',
      'It tells the ambulance crew how fast to drive',
      'It determines eligibility for thrombolysis (clot-busting treatment within 4.5 hours) and thrombectomy (clot removal within 24 hours)',
      'It is required for the accident book entry',
    ],
    correctAnswer: 2,
    explanation:
      'The time of symptom onset is critical because clot-busting medication (thrombolysis) can only be administered within 4.5 hours of symptoms starting, and mechanical clot removal (thrombectomy) within 24 hours. Knowing the exact time helps hospital teams make life-saving treatment decisions quickly.',
  },
  {
    id: 7,
    question: 'What position should an unconscious, breathing stroke casualty be placed in?',
    options: [
      'Flat on their back with legs elevated',
      'Seated upright in the W position',
      'Recovery position on the affected side, so the unaffected side is uppermost',
      'Prone (face down) with head turned to one side',
    ],
    correctAnswer: 2,
    explanation:
      'An unconscious, breathing stroke casualty should be placed in the recovery position on their affected (weak) side. This means the unaffected side is uppermost, allowing the stronger side of the body to maintain posture and keeping the airway clear.',
  },
  {
    id: 8,
    question:
      'A TIA (transient ischaemic attack) is a warning sign. Approximately what proportion of TIA patients will have a full stroke within 90 days?',
    options: ['1 in 100', '1 in 50', '1 in 10', '1 in 5'],
    correctAnswer: 2,
    explanation:
      'Approximately 1 in 10 people who experience a TIA will go on to have a full stroke within 90 days. This is why a TIA must never be dismissed &mdash; the casualty should be assessed by a medical professional urgently, ideally within 24 hours, to receive preventative treatment.',
  },
];

export default function FirstAidModule4Section1() {
  useSEO({
    title: 'Heart Attack, Angina & Stroke | First Aid Module 4.1',
    description:
      'Heart attack recognition and treatment, 300mg aspirin administration, angina comparison, FAST stroke test, ischaemic vs haemorrhagic stroke, TIA warning signs, and time-critical emergency response for UK first aiders.',
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
            <HeartPulse className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Heart Attack, Angina &amp; Stroke
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Recognising and responding to the three most common cardiovascular and cerebrovascular
            emergencies &mdash; heart attack, angina, and stroke &mdash; in a first aid setting
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Heart attack:</strong> Blocked artery &rarr; call 999, cardiac position,
                chew 300mg aspirin
              </li>
              <li>
                <strong>Angina:</strong> Narrowed artery &rarr; rest + GTN spray &rarr; if no relief
                in 5 min, treat as heart attack
              </li>
              <li>
                <strong>Stroke:</strong> FAST test &rarr; call 999, note the time, never give
                aspirin
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Heart attack:</strong> 999, W position, aspirin (if safe), monitor for CPR
              </li>
              <li>
                <strong>Stroke:</strong> FAST check, 999, note time, no food/drink/aspirin
              </li>
              <li>
                <strong>TIA:</strong> Same symptoms, resolves in 24h &mdash; still urgent, 1 in 10
                stroke risk
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Recognise the signs and symptoms of a heart attack, including atypical presentation in women',
              'Provide appropriate first aid treatment for a heart attack, including aspirin administration',
              'Distinguish between angina and a heart attack and explain the significance of GTN response',
              'Perform the FAST stroke test and explain what each letter represents',
              'Describe the difference between ischaemic and haemorrhagic stroke and why treatment differs',
              'Explain the significance of a TIA and why urgent medical assessment is required',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================= */}
        {/* Section 01: What Is a Heart Attack? */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            What Is a Heart Attack?
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>heart attack</strong> (myocardial infarction) occurs when a blockage
                &mdash; usually a blood clot forming on a fatty plaque &mdash; develops in one or
                more of the coronary arteries, the blood vessels that supply oxygen-rich blood to
                the heart muscle itself. When the blood supply is cut off, the heart muscle
                downstream of the blockage begins to die. The longer the blockage remains, the
                greater the damage to the heart muscle, which is why speed of treatment is
                absolutely critical.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Definition:</strong> &ldquo;Myocardial
                  infarction&rdquo; literally means death of heart muscle tissue. &ldquo;Myo&rdquo;
                  = muscle, &ldquo;cardial&rdquo; = heart, &ldquo;infarction&rdquo; = tissue death
                  due to loss of blood supply. A heart attack is always a{' '}
                  <strong>medical emergency</strong> &mdash; call 999 immediately.
                </p>
              </div>

              <p>
                Heart attacks can range in severity from relatively minor (a small area of muscle
                affected) to catastrophic (a large portion of the heart wall). In the worst cases, a
                heart attack can cause the heart to stop beating altogether (cardiac arrest), which
                is why constant monitoring of the casualty and readiness to perform CPR are
                essential parts of heart attack first aid.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HeartPulse className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Heart Attack Recognition</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Crushing, heavy, central chest pain</strong>{' '}
                      &mdash; may feel like a tight band around the chest, intense pressure, or a
                      squeezing sensation. Often described as &ldquo;like an elephant sitting on my
                      chest&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Radiating pain</strong> &mdash; the pain may
                      spread to the left arm, right arm, jaw, neck, back, or abdomen
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Shortness of breath</strong> &mdash; difficulty
                      breathing, feeling of not being able to get enough air
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Sweating</strong> &mdash; cold, clammy sweat,
                      often profuse and unrelated to exertion or ambient temperature
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Nausea and/or vomiting</strong> &mdash; the
                      casualty may feel sick or actually vomit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Feeling of impending doom</strong> &mdash; a
                      powerful, overwhelming sense that something terrible is happening; the
                      casualty may say &ldquo;I feel like I&rsquo;m going to die&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pale, grey skin</strong> &mdash; ashen or grey
                      pallor, especially noticeable around the face and lips
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Dizziness or lightheadedness</strong> &mdash;
                      may feel faint or unsteady
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">
                    Atypical Presentation in Women
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Heart attack symptoms may present differently in women. Women are more likely to
                  experience <strong>jaw pain</strong>, <strong>nausea</strong>,{' '}
                  <strong>unexplained fatigue</strong>, <strong>back pain</strong>, and{' '}
                  <strong>shortness of breath</strong> &mdash; and may not experience the classic
                  crushing central chest pain at all. This can lead to delayed recognition and
                  treatment. As a first aider, always consider the possibility of a heart attack in
                  any person who presents with unexplained upper body pain, sweating, nausea, or
                  breathlessness, regardless of whether classic chest pain is present.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* Section 02: Heart Attack Treatment */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            Heart Attack Treatment
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If you suspect a casualty is having a heart attack, you must act immediately. Every
                minute that passes without treatment increases the amount of heart muscle damage.
                Your actions as a first aider can be life-saving.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Step 1: Call 999 Immediately</p>
                </div>
                <p className="text-sm text-white/80">
                  Call 999 (or 112) immediately and tell the operator: &ldquo;I think this person is
                  having a heart attack.&rdquo; Give the operator your location, the
                  casualty&rsquo;s age and sex if known, and a description of their symptoms. Stay
                  on the line and follow any instructions given by the operator. Do NOT hang up
                  until told to do so.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HeartPulse className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Step-by-Step Heart Attack Treatment
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white">1. Call 999 Immediately</p>
                    <p className="text-sm text-white/80">
                      State clearly that you suspect a heart attack. Give your exact location,
                      including floor level and nearest access point if on a construction site. Ask
                      someone else to make the call if you need to stay with the casualty.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      2. Help Into a Comfortable Position
                    </p>
                    <p className="text-sm text-white/80">
                      Help the casualty into the <strong>W position (cardiac position)</strong>{' '}
                      &mdash; seated on the ground with their knees bent, leaning against a wall,
                      chair, or other support. This position reduces the workload on the heart by
                      decreasing the volume of blood returning to it. Do NOT allow the casualty to
                      stand, walk, or lie flat.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      3. Give 300mg Aspirin &mdash; Chewed
                    </p>
                    <p className="text-sm text-white/80">
                      Give the casualty a single 300mg aspirin tablet and ask them to{' '}
                      <strong>chew it</strong> (not swallow whole). Chewing breaks the tablet into
                      smaller pieces, vastly increasing the surface area and speeding absorption
                      into the bloodstream. Aspirin is an <strong>antiplatelet medication</strong>{' '}
                      &mdash; it helps prevent the blood clot from growing larger while the
                      ambulance crew are on their way.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      4. Help With GTN Spray (If Available)
                    </p>
                    <p className="text-sm text-white/80">
                      If the casualty has their own GTN (glyceryl trinitrate) spray prescribed by
                      their doctor, help them use it. GTN is sprayed or placed under the tongue
                      (sublingual) where it is rapidly absorbed. GTN works by relaxing and widening
                      the blood vessels, which can relieve angina pain. If the chest pain is due to
                      a heart attack, GTN will usually NOT relieve it.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">5. Monitor Constantly</p>
                    <p className="text-sm text-white/80">
                      Stay with the casualty at all times. Monitor their level of consciousness,
                      breathing, and skin colour. A heart attack can deteriorate into cardiac arrest
                      at any point, so you must be ready to begin CPR immediately if the casualty
                      becomes unresponsive and stops breathing normally.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">6. Reassure and Keep Warm</p>
                    <p className="text-sm text-white/80">
                      Keep the casualty calm and reassured. Anxiety increases heart rate and oxygen
                      demand, worsening the situation. Cover them with a coat or blanket to prevent
                      heat loss. Do NOT allow them to eat, drink (other than sips of water to take
                      the aspirin), or walk around.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Aspirin Safety Checks:</strong> Only give
                  aspirin if <strong>all</strong> of the following conditions are met: the casualty
                  is <strong>conscious</strong> and able to swallow; they are{' '}
                  <strong>not allergic</strong> to aspirin; they are{' '}
                  <strong>not under 16 years of age</strong>; they are{' '}
                  <strong>not taking anticoagulant medication</strong> (such as warfarin or
                  rivaroxaban); and the tablet is <strong>genuine aspirin</strong> (not ibuprofen or
                  paracetamol). If in any doubt, do not give aspirin &mdash; wait for the ambulance
                  crew.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================= */}
        {/* Section 03: Angina vs Heart Attack */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Angina vs Heart Attack
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Angina and heart attacks share many of the same symptoms, particularly chest pain,
                but they are fundamentally different conditions with very different levels of
                urgency. As a first aider, understanding the distinction is critical to providing
                the right treatment and knowing when to escalate to emergency services.
              </p>

              <p>
                <strong>Angina pectoris</strong> is temporary chest pain caused by the coronary
                arteries becoming <strong>narrowed</strong> (but not completely blocked). The heart
                muscle receives less oxygen than it needs, usually during exertion, stress, or cold
                weather, causing pain. When the person rests and the demand on the heart decreases,
                the pain typically eases within 3 to 5 minutes, often aided by GTN spray.
              </p>

              <p>
                A <strong>heart attack</strong>, by contrast, involves a complete or near-complete{' '}
                <strong>blockage</strong> of a coronary artery. The pain occurs at rest, is not
                relieved by GTN, lasts longer than 15 minutes, and the heart muscle is actively
                dying. A heart attack is always a medical emergency.
              </p>

              {/* Angina vs Heart Attack Comparison Grid */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <HeartPulse className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Angina</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Cause:</strong> Temporary narrowing of the
                        coronary arteries &mdash; reduced blood flow, not complete blockage
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Trigger:</strong> Usually comes on with
                        physical exertion, emotional stress, or exposure to cold
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Pain relief:</strong> Relieved by rest and
                        GTN spray within 3 to 5 minutes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Duration:</strong> Typically lasts less than
                        15 minutes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Urgency:</strong> Not usually an emergency
                        (unless it is a new or worsening pattern &mdash; unstable angina)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Heart muscle:</strong> No permanent damage
                        &mdash; blood flow is restored when the person rests
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <HeartPulse className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Heart Attack</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Cause:</strong> Complete or near-complete
                        blockage of a coronary artery &mdash; blood supply is cut off
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Trigger:</strong> Can occur at rest &mdash;
                        no exertion needed
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Pain relief:</strong> NOT relieved by rest or
                        GTN spray
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Duration:</strong> Lasts longer than 15
                        minutes, often much longer
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Urgency:</strong> ALWAYS a medical emergency
                        &mdash; call 999 immediately
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Heart muscle:</strong> Permanent damage
                        &mdash; heart muscle is dying and cannot be reversed
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">The 5-Minute Rule</p>
                </div>
                <p className="text-sm text-white/80">
                  If the casualty uses their GTN spray and the pain is{' '}
                  <strong>not relieved within 5 minutes</strong>, treat it as a heart attack. Call
                  999 immediately, place the casualty in the cardiac (W) position, give 300mg
                  aspirin (chewed), and monitor constantly. Do not wait to see if the pain improves
                  further &mdash; 5 minutes is the threshold.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================= */}
        {/* Section 04: The FAST Stroke Test */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            The FAST Stroke Test
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>FAST test</strong> is the nationally recognised method for quickly
                assessing whether someone may be having a stroke. It was developed by the Stroke
                Association and is used by the NHS, ambulance services, and first aiders across the
                United Kingdom. If <strong>any single FAST sign</strong> is present, call 999
                immediately.
              </p>

              {/* FAST Stroke Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-4 text-center">
                  FAST Stroke Recognition Test
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {/* F */}
                  <div className="flex flex-col items-center text-center p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/20 border-2 border-rose-400 mb-3">
                      <span className="text-rose-400 text-xl font-bold">F</span>
                    </div>
                    <p className="text-sm font-semibold text-rose-400 mb-1">Face</p>
                    <p className="text-xs text-white/70">
                      Has their face fallen on one side? Can they smile evenly?
                    </p>
                  </div>
                  {/* A */}
                  <div className="flex flex-col items-center text-center p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/20 border-2 border-rose-400 mb-3">
                      <span className="text-rose-400 text-xl font-bold">A</span>
                    </div>
                    <p className="text-sm font-semibold text-rose-400 mb-1">Arms</p>
                    <p className="text-xs text-white/70">
                      Can they raise both arms and keep them there?
                    </p>
                  </div>
                  {/* S */}
                  <div className="flex flex-col items-center text-center p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/20 border-2 border-rose-400 mb-3">
                      <span className="text-rose-400 text-xl font-bold">S</span>
                    </div>
                    <p className="text-sm font-semibold text-rose-400 mb-1">Speech</p>
                    <p className="text-xs text-white/70">
                      Is their speech slurred or jumbled? Can they speak clearly?
                    </p>
                  </div>
                  {/* T */}
                  <div className="flex flex-col items-center text-center p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/20 border-2 border-rose-400 mb-3">
                      <span className="text-rose-400 text-xl font-bold">T</span>
                    </div>
                    <p className="text-sm font-semibold text-rose-400 mb-1">Time</p>
                    <p className="text-xs text-white/70">
                      Time to call 999 if any single sign is present
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Point:</strong> You do not need all three
                  signs (Face, Arms, Speech) to be present. If <strong>any single one</strong> of
                  these signs is detected, the casualty may be having a stroke and you should call
                  999 immediately. Do not wait for more symptoms to appear.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* Section 05: Stroke — Recognition & Treatment */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Stroke &mdash; Recognition &amp; Treatment
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>stroke</strong> (cerebrovascular accident or CVA) occurs when the blood
                supply to part of the brain is disrupted, either by a <strong>blockage</strong>{' '}
                (ischaemic stroke) or a <strong>bleed</strong> (haemorrhagic stroke). Without
                oxygen, brain cells begin to die within minutes, which is why stroke treatment is so
                time-critical. The phrase <strong>&ldquo;time is brain&rdquo;</strong> is used by
                medical professionals to emphasise that every minute of delay leads to further,
                irreversible brain damage.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Ischaemic Stroke (85% of strokes)
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Caused by a <strong className="text-white">blood clot</strong> blocking a
                        blood vessel in the brain
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Accounts for approximately 85% of all strokes in the UK</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        May be treated with <strong className="text-white">thrombolysis</strong>{' '}
                        (clot-busting medication) if given within 4.5 hours of symptom onset
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        May be treated with <strong className="text-white">thrombectomy</strong>{' '}
                        (mechanical clot removal) if performed within 24 hours
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">
                      Haemorrhagic Stroke (15% of strokes)
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Caused by a <strong className="text-white">blood vessel rupturing</strong>{' '}
                        and bleeding into or around the brain
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Accounts for approximately 15% of all strokes but has a higher mortality
                        rate
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Aspirin or antiplatelet medication would{' '}
                        <strong className="text-white">worsen the bleeding</strong> &mdash; this is
                        why you must NEVER give aspirin for a suspected stroke
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Treatment may involve surgery to repair the ruptured vessel and relieve
                        pressure on the brain
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    FAST Test &mdash; Detailed Recognition
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Face (facial weakness):</strong> One side of
                      the face may droop, the mouth or eye may droop, the smile may be uneven, and
                      the casualty may drool from one side of the mouth. Ask them to smile and check
                      for symmetry.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Arms (arm weakness):</strong> The casualty may
                      be unable to raise one or both arms, or one arm may drift downwards when they
                      try to hold both arms up. Ask them to raise both arms to shoulder height and
                      hold them there.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Speech (speech difficulty):</strong> Speech may
                      be slurred, jumbled, or the casualty may be completely unable to speak. They
                      may also be unable to understand what you are saying. Ask them to repeat a
                      simple sentence such as &ldquo;The sky is blue.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Time (call 999):</strong> If{' '}
                      <strong>any single one</strong> of the above signs is present, call 999
                      immediately. Note the exact time the symptoms started &mdash; this is critical
                      information for the hospital team.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Additional Stroke Signs (Beyond FAST)
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Sudden severe headache:</strong> Often
                      described as the worst headache they have ever experienced, with no obvious
                      cause
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Sudden confusion:</strong> Difficulty
                      understanding what is happening, disorientation, or bewilderment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Sudden visual loss:</strong> Loss of vision in
                      one or both eyes, blurred vision, or double vision that comes on suddenly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Sudden loss of balance or coordination:
                      </strong>{' '}
                      Difficulty walking, stumbling, or unexplained dizziness
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Sudden numbness or weakness on one side:
                      </strong>{' '}
                      Weakness, numbness, or tingling affecting one side of the body (face, arm,
                      leg, or all three)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HeartPulse className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Stroke Treatment &mdash; Step by Step
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white">1. Call 999 Immediately</p>
                    <p className="text-sm text-white/80">
                      Tell the operator you suspect a stroke. Time is critical &mdash; &ldquo;time
                      is brain&rdquo;. Every minute of delay increases the extent of brain damage.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      2. Note the Time of Symptom Onset
                    </p>
                    <p className="text-sm text-white/80">
                      This is one of the most important things you can do. Record the exact time the
                      symptoms started (or the time the casualty was last seen well). This
                      determines whether the casualty is eligible for thrombolysis (within 4.5
                      hours) or thrombectomy (within 24 hours). Tell the ambulance crew immediately
                      on their arrival.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      3. Support in a Comfortable Position
                    </p>
                    <p className="text-sm text-white/80">
                      If conscious, help the casualty into a comfortable position, typically seated
                      or semi-reclined with their head and shoulders slightly raised and supported.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      4. Do NOT Give Food, Drink, or Aspirin
                    </p>
                    <p className="text-sm text-white/80">
                      Do not give the casualty anything to eat or drink &mdash; a stroke may impair
                      swallowing (dysphagia), creating a choking and aspiration risk. Do not give
                      aspirin &mdash; the stroke may be haemorrhagic, in which case aspirin would
                      worsen the bleeding.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      5. Monitor, Reassure, Prepare for Deterioration
                    </p>
                    <p className="text-sm text-white/80">
                      Stay with the casualty. Monitor their consciousness, breathing, and
                      responsiveness. Reassure them calmly. A stroke casualty may deteriorate
                      rapidly, so be prepared to manage an unconscious casualty and start CPR if
                      necessary.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      6. If Unconscious and Breathing &mdash; Recovery Position
                    </p>
                    <p className="text-sm text-white/80">
                      Place the casualty in the recovery position on their{' '}
                      <strong>affected (weak) side</strong>, so the unaffected side is uppermost.
                      This allows the stronger side to maintain posture and keeps the airway clear.
                      Continue to monitor breathing until the ambulance arrives.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Time-Critical Treatment Windows
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white/80">
                    <strong className="text-white">Thrombolysis (clot-busting):</strong> Must be
                    administered within <strong>4.5 hours</strong> of symptom onset. This
                    intravenous medication dissolves the blood clot and restores blood flow to the
                    brain. It can only be used for ischaemic strokes, which is why hospital imaging
                    (CT scan) is performed first to confirm the type of stroke.
                  </p>
                  <p className="text-sm text-white/80">
                    <strong className="text-white">Thrombectomy (mechanical clot removal):</strong>{' '}
                    Can be performed within <strong>24 hours</strong> of symptom onset in some
                    cases. A catheter is threaded through the blood vessels to physically remove the
                    clot from the brain. Available at specialist stroke centres.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================= */}
        {/* Section 06: TIA — Transient Ischaemic Attack */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            TIA &mdash; Transient Ischaemic Attack
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>TIA (transient ischaemic attack)</strong>, often referred to as a
                &ldquo;mini-stroke&rdquo;, occurs when the blood supply to part of the brain is
                temporarily disrupted, usually by a small blood clot that dissolves on its own. The
                symptoms of a TIA are identical to those of a full stroke &mdash; facial weakness,
                arm weakness, speech difficulty &mdash; but they resolve completely within 24 hours,
                often within minutes to a few hours.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Definition:</strong> A TIA is a{' '}
                  <strong>temporary</strong> disruption to the blood supply of the brain. Unlike a
                  full stroke, it does not cause permanent brain damage. However, it is a serious{' '}
                  <strong>warning sign</strong> that the person is at high risk of having a full
                  stroke in the near future.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    TIA Is a Warning &mdash; Not a Relief
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Despite the symptoms resolving, a TIA must <strong>never</strong> be dismissed or
                  ignored. Approximately <strong>1 in 10</strong> people who experience a TIA will
                  go on to have a full stroke within <strong>90 days</strong>. The risk is highest
                  in the first few days and weeks after the TIA. Anyone who experiences TIA symptoms
                  must be assessed by a medical professional urgently &mdash; ideally{' '}
                  <strong>within 24 hours</strong> &mdash; so that preventative treatment (such as
                  antiplatelet medication, blood pressure management, and lifestyle changes) can be
                  started promptly.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">TIA &mdash; What to Know</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Symptoms are identical to stroke:</strong>{' '}
                      facial drooping, arm weakness, slurred speech &mdash; use the FAST test in
                      exactly the same way
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Symptoms resolve within 24 hours:</strong>{' '}
                      Usually within minutes to a few hours, with no lasting damage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        You cannot tell the difference at the scene:
                      </strong>{' '}
                      When symptoms first appear, there is no way to know whether it is a TIA or a
                      full stroke. Always treat it as a stroke and call 999
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        1 in 10 will have a full stroke within 90 days:
                      </strong>{' '}
                      This makes urgent medical assessment and preventative treatment essential
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Medical assessment within 24 hours:</strong>{' '}
                      Even if symptoms have completely resolved, the person must see a medical
                      professional within 24 hours for investigation and preventative treatment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Common risk factors:</strong> High blood
                      pressure, atrial fibrillation, smoking, diabetes, high cholesterol, obesity,
                      and family history of stroke or TIA
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">
                    First Aid Response to a Suspected TIA
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  When symptoms first appear, treat exactly as you would a stroke &mdash; use the
                  FAST test, call 999, note the time, and do not give food, drink, or aspirin. If
                  the symptoms resolve before the ambulance arrives, do not cancel the ambulance
                  &mdash; the casualty still needs urgent medical assessment. If the person declines
                  an ambulance because their symptoms have resolved, strongly advise them to see
                  their GP or attend A&amp;E within the same day. A TIA is a serious medical warning
                  that requires investigation.
                </p>
              </div>

              <p>
                On a construction site or in any workplace, if a colleague reports that they
                &ldquo;had a funny turn&rdquo; where one side of their face dropped, an arm went
                weak, or their speech went slurred &mdash; even if the symptoms have now resolved
                &mdash; this should be treated as a potential TIA. They must not continue working
                and should be advised to seek urgent medical attention. Record the incident in the
                accident book, including the time of onset and which symptoms were observed.
              </p>
            </div>
          </div>
        </section>

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
            <Link to="../first-aid-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-4-section-2">
              Next: Seizures, Diabetes &amp; Anaphylaxis
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
