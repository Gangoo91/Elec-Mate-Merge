import {
  ArrowLeft,
  CheckCircle,
  Flame,
  Lightbulb,
  HelpCircle,
  BookOpen,
  AlertTriangle,
  ThermometerSun,
  HeartPulse,
  ShieldAlert,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (placed between content sections)            */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'rsm-5-3-qc1',
    question: 'What are the three dimensions of burnout identified by Maslach and Leiter?',
    options: [
      'Tiredness, boredom, and frustration',
      'Emotional exhaustion, depersonalisation, and reduced personal accomplishment',
      'Physical pain, mental fatigue, and social withdrawal',
      'Anxiety, depression, and insomnia',
    ],
    correctIndex: 1,
    explanation:
      'Christina Maslach and Michael Leiter identified three core dimensions of burnout: emotional exhaustion ("I am completely drained"), depersonalisation ("I do not care anymore about the work or the people"), and reduced personal accomplishment ("Nothing I do matters or makes a difference"). All three dimensions must be present to a significant degree for the condition to be classified as burnout, distinguishing it from ordinary stress or temporary fatigue.',
  },
  {
    id: 'rsm-5-3-qc2',
    question: 'What is the key difference between stress and burnout?',
    options: [
      'Stress is a physical condition while burnout is a mental condition',
      'Stress involves too much pressure in the short term; burnout is the result of sustained pressure over a long period with no adequate recovery',
      'Stress only affects managers; burnout affects all workers equally',
      'There is no meaningful difference — they are the same thing described in different words',
    ],
    correctIndex: 1,
    explanation:
      'The critical distinction is one of duration and recovery. Stress is the response to short-term pressure — it can actually be productive and energising in small doses. Burnout is what happens when that pressure continues for too long without adequate recovery. Stressed people feel that if they could just get on top of things, they would be fine. Burnt-out people feel that nothing will help because the fundamental problem is not workload but the loss of meaning, energy, and capacity to cope.',
  },
  {
    id: 'rsm-5-3-qc3',
    question: 'Why does recovery from burnout typically take months rather than days?',
    options: [
      'Because employers are slow to arrange time off',
      'Because burnout involves deep physiological and psychological depletion that cannot be restored by a short break — the nervous system, hormonal balance, and cognitive patterns need extended time to reset',
      'Because the NHS waiting list for therapy is long',
      'Because people with burnout are too lazy to recover quickly',
    ],
    correctIndex: 1,
    explanation:
      'Burnout is not ordinary tiredness that can be fixed by a good weekend or a week off. It involves chronic cortisol dysregulation, depletion of neurotransmitters (particularly serotonin and dopamine), and deeply ingrained patterns of negative thinking and emotional withdrawal. Restoring the hormonal balance, rebuilding emotional capacity, and changing the thought patterns that led to burnout requires weeks to months of genuine recovery, often supported by professional therapy. A week off may provide temporary relief, but without deeper change, the person returns to the same conditions and burns out again.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Is burnout a medical condition? Can my GP sign me off work for it?',
    answer:
      'Burnout was officially recognised by the World Health Organisation (WHO) in 2019 as an "occupational phenomenon" in the International Classification of Diseases (ICD-11). It is classified as a syndrome resulting from chronic workplace stress that has not been successfully managed. While it is not classified as a standalone medical condition in the UK, the symptoms of burnout — depression, anxiety, chronic fatigue, insomnia — are diagnosable medical conditions. Your GP can sign you off work for stress, anxiety, or depression, and can refer you for counselling, cognitive-behavioural therapy (CBT), or other appropriate treatment. Do not wait until you are in crisis to seek help — GPs are increasingly aware of burnout as a serious occupational health issue, particularly in construction.',
  },
  {
    question: 'I think a colleague might be burning out. What should I do?',
    answer:
      'The most important thing is to raise your concern with care and without judgement. Choose a private moment — perhaps a quiet tea break or a walk to the van — and express what you have noticed in non-clinical terms. You might say: "You do not seem yourself lately. Is everything alright?" or "I have noticed you seem really tired and you have not been as into the work. Anything going on?" Do not diagnose them or tell them they have burnout. Just open the door for a conversation. If they do open up, listen without trying to fix it. Offer to help them find support — suggest the Lighthouse Club helpline (0345 605 1956), Mates in Mind, or their GP. Sometimes just knowing that someone has noticed and cares is enough to help a person take the first step toward getting help.',
  },
  {
    question: 'Can you burn out from a job you love?',
    answer:
      'Absolutely. In fact, people who are most passionate about their work are often the most vulnerable to burnout. This is sometimes called the "burnout paradox" — the very qualities that make someone a dedicated professional (pride in their work, high standards, willingness to go the extra mile, emotional investment) are the same qualities that lead them to overcommit, neglect recovery, and push past their limits. An electrician who loves the trade, takes enormous pride in their work, and always says yes to extra jobs is at higher risk than someone who treats it as just a job. Passion without boundaries is a recipe for burnout. The solution is not to care less — it is to protect the things you care about by managing your energy and recovery deliberately.',
  },
  {
    question: 'What is the difference between burnout and depression?',
    answer:
      'Burnout and depression share many symptoms — fatigue, loss of motivation, difficulty concentrating, sleep problems, social withdrawal — which is why they are often confused. The key difference is specificity: burnout is workplace-specific, meaning it originates from and is primarily triggered by work-related stress, whereas depression is pervasive and affects all areas of life regardless of their connection to work. However, untreated burnout frequently develops into clinical depression as the exhaustion and hopelessness generalise beyond the workplace. If you are experiencing persistent low mood, loss of interest in things you normally enjoy (not just work), changes in appetite or sleep, or thoughts of self-harm, please seek professional help immediately. Your GP, the Samaritans (116 123, free, 24/7), or the Construction Industry Helpline (0345 605 1956) are all available.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'Which of the following is a dimension of burnout as defined by Maslach and Leiter?',
    options: [
      'Physical injury',
      'Emotional exhaustion',
      'Financial insecurity',
      'Skill obsolescence',
    ],
    correctAnswer: 1,
    explanation:
      'Emotional exhaustion is one of the three core dimensions of burnout identified by Christina Maslach and Michael Leiter. It refers to the feeling of being completely drained — emotionally, mentally, and physically — with nothing left to give. The other two dimensions are depersonalisation (detachment and cynicism) and reduced personal accomplishment (feeling that nothing you do matters).',
  },
  {
    id: 2,
    question: 'What does "depersonalisation" mean in the context of burnout?',
    options: [
      'Forgetting your own name due to extreme fatigue',
      'A growing emotional detachment from your work and the people you work with, often expressed as cynicism or indifference',
      'A medical condition where you feel disconnected from your own body',
      'The process of losing your individual identity within a large organisation',
    ],
    correctAnswer: 1,
    explanation:
      'In the burnout model, depersonalisation refers to emotional detachment — a protective mechanism where you mentally distance yourself from your work and the people involved (clients, colleagues, the job itself). It often manifests as cynicism ("What is the point?"), callousness toward clients, or treating people as objects rather than individuals. It is the brain\'s way of protecting itself from further emotional demands when emotional resources are depleted.',
  },
  {
    id: 3,
    question: 'What is the key difference between ordinary stress and burnout?',
    options: [
      'Stress is caused by work; burnout is caused by relationships',
      'Stress involves too much pressure; burnout is too much pressure for too long without adequate recovery',
      'Stress affects the body; burnout only affects the mind',
      'They are identical conditions with different names',
    ],
    correctAnswer: 1,
    explanation:
      'Stress is a short-term response to excessive demands — it can be unpleasant but is also temporary and even productive in small doses. Burnout is the chronic, cumulative result of sustained stress without adequate recovery. The stressed person believes that if they could get on top of things, they would be fine. The burnt-out person has lost that belief — they feel fundamentally depleted and hopeless.',
  },
  {
    id: 4,
    question: 'Which of the following is a warning sign of burnout in an electrician?',
    options: [
      'Feeling energised by a challenging new project',
      'Taking pride in a neatly wired distribution board',
      'Dreading Monday morning and losing pride in the quality of their work',
      'Asking for help with a complex calculation',
    ],
    correctAnswer: 2,
    explanation:
      'Dreading Monday morning and losing pride in workmanship are classic warning signs of burnout. The loss of pride is particularly significant because it indicates reduced personal accomplishment — one of the three core dimensions. An electrician who used to take photos of their neatly dressed boards but now just wants to get the job done and leave is showing signs of burnout.',
  },
  {
    id: 5,
    question: 'Why does a one-week holiday rarely resolve burnout?',
    options: [
      'Because holidays are boring and do not help with stress',
      'Because burnout involves deep physiological and psychological depletion that requires extended recovery, genuine change in working conditions, and often professional support',
      'Because one week is not enough time to finish all the DIY jobs at home',
      'Because employers do not allow long enough holidays',
    ],
    correctAnswer: 1,
    explanation:
      'Burnout involves chronic cortisol dysregulation, neurotransmitter depletion, and deeply ingrained patterns of negative thinking. A single week off may provide temporary relief — cortisol drops, sleep improves, mood lifts — but without addressing the underlying conditions (excessive workload, lack of autonomy, poor recovery habits), the person returns to the same environment and the burnout re-establishes itself within days. Recovery from genuine burnout typically requires weeks to months of reduced activity, professional support, and genuine change in the conditions that caused it.',
  },
  {
    id: 6,
    question: 'When should an electrician seek professional help for potential burnout?',
    options: [
      'Only when they have been signed off work by a doctor',
      'When symptoms persist for more than two weeks, sleep is consistently disrupted, or they are making unusual mistakes at work',
      'Only if they are having thoughts of self-harm',
      'Professional help is never needed — burnout resolves on its own',
    ],
    correctAnswer: 1,
    explanation:
      'Professional help should be sought when burnout symptoms persist for more than two weeks despite attempting self-care strategies, when sleep is consistently poor, when work performance is noticeably declining, or when the person feels unable to cope. You do not need to be in crisis to see your GP — early intervention makes recovery faster and easier. Waiting until the situation is severe makes recovery longer and harder.',
  },
  {
    id: 7,
    question:
      'Which organisation specifically supports construction workers with mental health and wellbeing?',
    options: [
      'The Automobile Association (AA)',
      'The Lighthouse Club',
      'The Royal Horticultural Society',
      'The British Computer Society',
    ],
    correctAnswer: 1,
    explanation:
      'The Lighthouse Club is a charity specifically dedicated to supporting the construction industry with emotional, physical, and financial wellbeing. Their 24/7 helpline (0345 605 1956) provides free, confidential support for construction workers experiencing stress, burnout, financial difficulty, or mental health challenges. Mates in Mind is another construction-specific organisation focused on improving mental health awareness in the sector.',
  },
  {
    id: 8,
    question:
      'An experienced electrician who used to love the trade now dreads every job, has stopped caring about the quality of their work, and feels that nothing they do makes any difference. Which burnout dimensions are present?',
    options: [
      'Only emotional exhaustion',
      'Only depersonalisation',
      'All three: emotional exhaustion, depersonalisation, and reduced personal accomplishment',
      'None — this is just a bad week',
    ],
    correctAnswer: 2,
    explanation:
      'This scenario describes all three dimensions of burnout. Dreading every job indicates emotional exhaustion (drained of energy and emotional resources). Stopping caring about quality indicates depersonalisation (emotional detachment and cynicism). Feeling that nothing they do makes a difference indicates reduced personal accomplishment (loss of professional efficacy and meaning). When all three dimensions are present to this degree, it represents full burnout and requires serious intervention.',
  },
];

export default function RSMModule5Section3() {
  useSEO({
    title: 'Recognising & Managing Burnout | RSM Module 5.3',
    description:
      "Maslach's three dimensions of burnout, the difference between stress and burnout, warning signs, recovery timelines, and when to seek professional help for construction workers.",
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
            <Link to="../rsm-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Flame className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Recognising &amp; Managing Burnout
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the three dimensions of burnout, spotting the warning signs early, and
            knowing when to seek help
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Three dimensions:</strong> Emotional exhaustion, depersonalisation, reduced
                accomplishment
              </li>
              <li>
                <strong>Not the same as stress:</strong> Stress is too much; burnout is too much for
                too long
              </li>
              <li>
                <strong>Warning signs:</strong> Dreading work, loss of pride, cynicism, unusual
                mistakes
              </li>
              <li>
                <strong>Recovery:</strong> Takes months, not days &mdash; requires genuine change
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Prevalence:</strong> Construction has one of the highest burnout rates of
                any UK industry
              </li>
              <li>
                <strong>Safety:</strong> Burnt-out workers make more mistakes with dangerous
                consequences
              </li>
              <li>
                <strong>Careers:</strong> Unmanaged burnout drives skilled workers out of the trade
                permanently
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define burnout using Maslach and Leiter's three-dimensional model",
              'Distinguish between ordinary workplace stress and genuine burnout',
              'Identify the early warning signs of burnout in yourself and colleagues',
              'Explain why recovery from burnout takes months and requires genuine change',
              'List the professional support options available for construction workers',
              'Apply practical strategies to prevent burnout from developing in the first place',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is Burnout? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            What Is Burnout? The Maslach Model
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Burnout is not just being tired. It is not having a bad week or feeling fed up on a
                Monday morning. Burnout is a specific, well-researched psychological syndrome that
                develops when workplace stress continues for a prolonged period without adequate
                recovery. The most widely accepted definition comes from psychologists{' '}
                <strong>Christina Maslach</strong> and <strong>Michael Leiter</strong>, who
                identified three core dimensions that together define the burnout syndrome.
              </p>

              <div className="space-y-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Emotional Exhaustion: &ldquo;I Am Completely Drained&rdquo;
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    This is the most obvious dimension &mdash; the feeling of being utterly
                    depleted. Not just physically tired (although that is part of it), but
                    emotionally and mentally empty. You wake up exhausted even after a full
                    night&rsquo;s sleep. You feel like you have nothing left to give &mdash; no
                    energy, no enthusiasm, no capacity to care.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> The electrician who used
                      to arrive early, full of energy, now drags themselves out of bed and sits in
                      the van for 10 minutes before they can face walking onto site. They feel
                      exhausted by 10am. The idea of another day of wiring, another difficult
                      client, another coordination meeting fills them with dread rather than
                      purpose.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Depersonalisation: &ldquo;I Do Not Care Anymore&rdquo;
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Depersonalisation is a psychological defence mechanism. When emotional resources
                    are depleted, the brain protects itself by disconnecting emotionally from the
                    source of the stress &mdash; the work, the clients, the colleagues. This
                    manifests as cynicism, detachment, callousness, and a loss of empathy.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> The sparky who used to
                      patiently explain options to domestic clients now mutters &ldquo;they are all
                      idiots&rdquo; and just does the minimum. The one who used to help apprentices
                      now snaps &ldquo;work it out yourself.&rdquo; The foreman who used to mediate
                      disputes now says &ldquo;sort it out between yourselves, I don&rsquo;t
                      care.&rdquo; These are not personality flaws &mdash; they are symptoms of
                      emotional depletion.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Reduced Personal Accomplishment: &ldquo;Nothing I Do Matters&rdquo;
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    The final dimension is a collapse in the sense of professional efficacy and
                    meaning. The burnt-out person feels that their work does not matter, that they
                    are not making a difference, and that their skills and efforts are worthless.
                    This is particularly devastating for skilled tradespeople whose professional
                    identity is closely tied to the quality of their work.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> The electrician who used
                      to photograph their neatly dressed boards and show them to colleagues with
                      pride now just wants the job finished. They have stopped caring about cable
                      dressing. They feel like &ldquo;what is the point &mdash; the client does not
                      even notice, the inspector will find something wrong anyway, and next week
                      there will be another job exactly the same.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <p>
                When all three dimensions are present &mdash; the person is exhausted, detached, and
                feels that nothing they do matters &mdash; that is burnout. It is not a temporary
                rough patch. It is a serious occupational syndrome that, left untreated, can lead to
                clinical depression, anxiety disorders, physical illness, substance misuse, and in
                the worst cases, suicidal ideation.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Burnout vs Stress */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Burnout Is Not the Same as Stress
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                People often use the words &ldquo;stress&rdquo; and &ldquo;burnout&rdquo;
                interchangeably, but they are fundamentally different conditions with different
                causes, different symptoms, and different solutions. Understanding the distinction
                matters because the remedies for stress (take a break, manage your workload, use
                coping techniques) are insufficient for burnout, which requires deeper and more
                sustained intervention.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <ThermometerSun className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-white">Stress</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Characterised by <strong className="text-white">over-engagement</strong>{' '}
                        &mdash; too much energy, too much urgency
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Emotions are <strong className="text-white">overreactive</strong> &mdash;
                        anxiety, panic, frustration
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        The person feels that{' '}
                        <strong className="text-white">
                          if they could just get on top of things
                        </strong>
                        , they would be fine
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Primary damage is <strong className="text-white">physical</strong> &mdash;
                        headaches, muscle tension, high blood pressure
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Can be <strong className="text-white">productive</strong> in small doses
                        (eustress)
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Flame className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Burnout</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Characterised by <strong className="text-white">disengagement</strong>{' '}
                        &mdash; emotional shutdown, withdrawal
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Emotions are <strong className="text-white">blunted</strong> &mdash;
                        numbness, emptiness, hopelessness
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        The person feels that{' '}
                        <strong className="text-white">nothing will help</strong> &mdash; the
                        situation is hopeless
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Primary damage is <strong className="text-white">emotional</strong> &mdash;
                        loss of meaning, motivation, and identity
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Is <strong className="text-white">never productive</strong> &mdash; it is
                        purely destructive
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                A useful analogy: stress is like a river flowing too fast. It is powerful and
                potentially dangerous, but there is still movement, energy, and direction. Burnout
                is like a river that has dried up completely. There is no flow, no energy, no
                direction &mdash; just an empty bed where water used to be. You cannot fix a dry
                riverbed by making the water flow faster. You have to wait for the rain.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Warning Signs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Warning Signs: Catching Burnout Early
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Burnout does not arrive overnight. It develops gradually, often over months or even
                years, which is why it is so easy to miss until it becomes severe. The early warning
                signs are subtle and easily dismissed as &ldquo;just being a bit tired&rdquo; or
                &ldquo;having a rough patch.&rdquo; Learning to recognise these signs &mdash; in
                yourself and in your colleagues &mdash; is one of the most valuable resilience
                skills you can develop.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Early Warning Signs of Burnout
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Dreading Monday morning:</strong> A persistent,
                      heavy feeling of dread that starts on Sunday evening and intensifies on Monday
                      morning. Not just preferring the weekend &mdash; genuinely dreading the
                      thought of another working week.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Loss of pride in workmanship:</strong> An
                      electrician who used to take pride in neat cable dressing, accurate
                      terminations, and tidy boards but now just wants the job finished and does not
                      care how it looks.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cynicism about clients and colleagues:</strong>{' '}
                      Increasingly negative, dismissive, or contemptuous attitudes toward clients
                      (&ldquo;they are all time-wasters&rdquo;), other trades (&ldquo;useless, the
                      lot of them&rdquo;), or the industry itself (&ldquo;this trade is a
                      joke&rdquo;).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Making unusual mistakes:</strong> Errors that
                      you would not normally make &mdash; wrong cable in the wrong terminal,
                      forgetting to isolate, miscalculating a volt drop, leaving tools behind. The
                      brain is too depleted to maintain its usual level of accuracy.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Physical symptoms that do not resolve:</strong>{' '}
                      Persistent headaches, back pain, stomach problems, frequent colds, or general
                      aches that do not improve with rest. Chronic stress suppresses the immune
                      system and creates physical symptoms.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Withdrawal from colleagues:</strong> Eating
                      lunch alone when you used to sit with the team, avoiding tea breaks, not
                      engaging in banter, leaving site immediately without chatting. Social
                      withdrawal is both a symptom and an accelerator of burnout.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cutting corners:</strong> Doing the minimum to
                      get by rather than the thorough, careful work you are capable of. Not because
                      you are lazy, but because you genuinely do not have the mental or emotional
                      energy to do more.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Increased reliance on alcohol or substances:
                      </strong>{' '}
                      Needing a drink to &ldquo;wind down&rdquo; every evening, using more caffeine
                      to get through the day, or using other substances to cope with the emotional
                      weight of work.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Construction Example:</strong> An experienced
                  electrician with 20 years in the trade used to love his work. He took pride in
                  every installation, mentored apprentices patiently, and was known for his
                  thoroughness. Over the course of a year on a demanding, understaffed commercial
                  project with an aggressive programme, he gradually changed. He started dreading
                  the drive to site. He snapped at his apprentice for asking basic questions. He
                  stopped checking his work properly. He began drinking three or four pints every
                  evening &ldquo;just to switch off.&rdquo; His wife said he was &ldquo;like a
                  different person.&rdquo; He dismissed it as &ldquo;just a rough patch&rdquo; for
                  months before finally seeing his GP, who recognised the signs of burnout and
                  referred him for CBT therapy.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Recovery from Burnout */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Recovery from Burnout
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most important things to understand about burnout is that{' '}
                <strong>recovery takes months, not days</strong>. A week off will not fix it. A
                fortnight in Spain will not fix it. The reason is that burnout is not ordinary
                fatigue &mdash; it is deep physiological and psychological depletion that has
                developed over months or years. The body&rsquo;s stress-response system (the
                hypothalamic-pituitary-adrenal axis) has been running on overdrive for so long that
                it cannot simply be switched off. Cortisol regulation is disrupted.
                Neurotransmitters (serotonin, dopamine, norepinephrine) are depleted. Neural
                pathways for negative thinking and emotional withdrawal are deeply grooved.
              </p>

              <p>
                This is why the colleague who takes a week off &ldquo;for stress&rdquo; and comes
                back looking just as exhausted has not recovered &mdash; they have had a temporary
                respite, but the underlying depletion remains. Genuine burnout recovery requires
                three things:
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">1. Extended Rest</p>
                  <p className="text-sm text-white/80">
                    Not a week &mdash; typically 4 to 12 weeks of significantly reduced activity.
                    This does not necessarily mean complete bed rest, but it does mean stepping away
                    from the conditions that caused the burnout. For some, this means being signed
                    off work. For self-employed electricians, it may mean scaling back to minimal,
                    low-stress work while the body and mind recover. During this period, sleep,
                    nutrition, gentle exercise, and social connection are the priorities.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    2. Genuine Change in Conditions
                  </p>
                  <p className="text-sm text-white/80">
                    If the person returns to exactly the same conditions that caused the burnout,
                    they will burn out again. Recovery requires identifying what caused the burnout
                    and making genuine changes: reducing working hours, setting clearer boundaries,
                    changing the type of work, delegating more effectively, or in some cases
                    changing employers or moving to a different sector within the trade. Simply
                    resting and then going back to the same 60-hour weeks is not recovery &mdash; it
                    is a pause before the next crisis.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">3. Professional Support</p>
                  <p className="text-sm text-white/80">
                    For moderate to severe burnout, professional support significantly accelerates
                    recovery and reduces the risk of relapse. Cognitive-behavioural therapy (CBT)
                    helps restructure the negative thought patterns that burnout creates.
                    Counselling provides a safe space to process the emotional impact. Occupational
                    health assessments can identify workplace changes that need to be made. Your GP
                    is the first point of contact and can refer you to appropriate services.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Construction Example:</strong> A sparky who was
                  signed off with burnout after two years on back-to-back high-pressure commercial
                  projects found that his first week off felt amazing &mdash; he slept, read books,
                  went fishing. By week two, he felt restless and wanted to go back. His therapist
                  warned him that this was the &ldquo;honeymoon phase&rdquo; &mdash; the initial
                  relief of removing the stressor. Sure enough, by week three, the exhaustion hit
                  him like a wall. He spent another month feeling far more tired than he had while
                  working, as his body finally allowed itself to experience the accumulated fatigue
                  it had been suppressing. Full recovery took four months. When he returned to work,
                  he set firm boundaries: no more than 45 hours a week, every other weekend off, and
                  a two-week break between major projects. Three years later, he is thriving.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: When to Seek Professional Help */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            When to Seek Professional Help
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There is no shame in seeking professional help for burnout. In fact, recognising
                that you need support and acting on it is one of the strongest things you can do.
                The construction industry has historically had a culture of &ldquo;toughing it
                out&rdquo; and &ldquo;getting on with it,&rdquo; but this attitude has contributed
                to construction having one of the highest suicide rates of any UK industry. Getting
                help early is not weakness &mdash; it is professional risk management.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldAlert className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Seek Help When:</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Symptoms have persisted for{' '}
                      <strong className="text-white">more than two weeks</strong> despite attempts
                      at self-care
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Sleep is consistently disrupted</strong>{' '}
                      &mdash; difficulty falling asleep, waking in the night, or waking exhausted
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      You are{' '}
                      <strong className="text-white">making unusual mistakes at work</strong> that
                      could have safety implications
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      You are <strong className="text-white">using alcohol or substances</strong> to
                      cope with work stress
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Your <strong className="text-white">relationships are suffering</strong>{' '}
                      &mdash; increased conflict at home, withdrawal from friends and family
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      You have <strong className="text-white">thoughts of self-harm</strong> or feel
                      that things would be better if you were not here
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HeartPulse className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Where to Get Help</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Your GP:</strong> The first port of call. They
                      can assess your mental health, sign you off work if needed, prescribe
                      medication if appropriate, and refer you for counselling or CBT.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Lighthouse Club:</strong> 0345 605 1956 (24/7).
                      Free, confidential support specifically for the construction industry.
                      Financial, emotional, and wellbeing support.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Mates in Mind:</strong> A construction industry
                      charity focused on improving mental health awareness and providing support
                      across the sector.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Samaritans:</strong> 116 123 (free, 24/7). For
                      anyone struggling to cope or having thoughts of self-harm.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        CALM (Campaign Against Living Miserably):
                      </strong>{' '}
                      0800 58 58 58 (5pm to midnight). Specifically for men experiencing emotional
                      distress.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Andy&rsquo;s Man Club:</strong> Free, weekly
                      peer-support groups for men in locations across the UK. Monday evenings, 7pm.
                      No referral needed.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Key Takeaways */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Key Takeaways
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Burnout is not a sign of personal failure. It is a predictable consequence of
                sustained pressure without adequate recovery. The most dedicated, hardworking, and
                passionate electricians are often the most vulnerable &mdash; because they care the
                most, they give the most, and they are the least likely to stop and rest.
                Recognising burnout early, understanding it properly, and having the courage to seek
                help when you need it is not weakness. It is the ultimate expression of professional
                resilience.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Takeaway</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Burnout has three dimensions:</strong> emotional exhaustion,
                      depersonalisation, and reduced personal accomplishment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Burnout is not the same as stress:</strong> stress is too much
                      pressure; burnout is too much for too long without recovery.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Warning signs include:</strong> dreading work, loss of pride,
                      cynicism, unusual mistakes, physical symptoms, and social withdrawal.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Recovery takes months,</strong> not days, and requires extended rest,
                      genuine change in conditions, and often professional support.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Help is available:</strong> GP, Lighthouse Club, Mates in Mind,
                      Samaritans, CALM, Andy&rsquo;s Man Club. Use them.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In the final section, we will bring everything together into a personal resilience
                action plan &mdash; a practical document that captures your commitments, your
                support network, your early warning signs, and your recovery strategies. This plan
                will serve as your personal resilience toolkit for the rest of your career.
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
                <div className="flex items-start gap-2 mb-1">
                  <HelpCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <h3 className="text-sm font-medium text-white">{faq.question}</h3>
                </div>
                <p className="text-sm text-white leading-relaxed pl-6">{faq.answer}</p>
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
            <Link to="../rsm-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-5-section-4">
              Next: Your Personal Resilience Action Plan
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
