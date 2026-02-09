import {
  ArrowLeft,
  Users,
  CheckCircle,
  AlertTriangle,
  Heart,
  Phone,
  MessageCircle,
  Shield,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'fa-panic-attack-breathing',
    question:
      'A colleague on site is experiencing a panic attack with rapid breathing, chest tightness, and tingling in their hands. What breathing technique should you encourage?',
    options: [
      'Breathe as fast as possible to get more oxygen',
      'Hold their breath for as long as they can',
      'Slow breathing: in for 4 seconds, hold for 4 seconds, out for 4 seconds',
      'Breathe into a paper bag to increase carbon dioxide levels',
    ],
    correctIndex: 2,
    explanation:
      "The recommended technique is slow, controlled breathing: in for 4 seconds, hold for 4 seconds, out for 4 seconds. This activates the parasympathetic nervous system, helping to calm the body's fight-or-flight response. Breathing into a paper bag is no longer recommended as it can reduce oxygen levels dangerously. A panic attack usually passes within 20 to 30 minutes.",
  },
  {
    id: 'fa-suicide-question',
    question:
      'A colleague tells you they have been thinking about ending their life. What is the correct first response?',
    options: [
      'Change the subject to avoid making them feel worse',
      'Tell them to think about their family and how it would affect them',
      'Take it seriously, stay with them, and ask directly: "Are you thinking about suicide?"',
      'Leave them alone so they have time to calm down and think clearly',
    ],
    correctIndex: 2,
    explanation:
      'You must take ALL mentions of suicide seriously. Ask directly: "Are you thinking about suicide?" Research consistently shows that asking directly does NOT increase the risk of suicide &mdash; it opens the door for honest conversation and shows the person you are taking them seriously. Do NOT leave the person alone. Listen without judgement, and if there is immediate risk, call 999. Samaritans: 116 123 (free, 24/7). Text SHOUT to 85258.',
  },
  {
    id: 'fa-critical-incident-stress',
    question:
      'After attending a serious incident on site where a colleague was fatally injured, a first aider is experiencing flashbacks, difficulty sleeping, and emotional numbness two weeks later. What should they understand?',
    options: [
      'These symptoms mean they are not suited to being a first aider',
      'They should ignore the symptoms and focus on getting back to normal',
      'These are normal reactions to an abnormal event &mdash; most people recover naturally, but they should seek help if symptoms persist beyond 4 to 6 weeks',
      'They need to take medication immediately to prevent PTSD',
    ],
    correctIndex: 2,
    explanation:
      'Flashbacks, difficulty sleeping, and emotional numbness are NORMAL reactions to an ABNORMAL event. Most people recover naturally within a few weeks. However, if symptoms persist beyond 4 to 6 weeks, are getting worse rather than better, or are affecting daily life, work, or relationships, the person should seek professional support through occupational health, their GP, or an Employee Assistance Programme.',
  },
];

const faqs = [
  {
    question: 'Does asking someone directly about suicide increase their risk?',
    answer:
      'No. This is one of the most persistent myths about suicide, and extensive research has consistently shown it to be false. Asking someone directly &ldquo;Are you thinking about suicide?&rdquo; does NOT plant the idea or increase the risk. In fact, asking directly shows the person that you take them seriously, that you are not afraid to talk about it, and that they are not alone. It opens the door for honest conversation and can be the first step towards getting help. Avoiding the subject, changing the topic, or using euphemisms can make the person feel more isolated and less likely to seek support.',
  },
  {
    question: 'What should I do if a colleague is having a psychotic episode on site?',
    answer:
      'Stay calm and speak slowly and clearly. Do not argue with their delusions or try to convince them that what they are experiencing is not real &mdash; this can escalate agitation. Create a safe space by removing any hazards and asking other people to give space. Maintain a safe distance and avoid sudden movements. Do not restrain them unless there is an immediate risk of serious harm to themselves or others. Call 999 if there is any risk to the person or to others. When speaking to the emergency operator, explain that the person appears to be experiencing a mental health crisis and describe their behaviour.',
  },
  {
    question: 'Why are construction workers at such high risk of suicide?',
    answer:
      'Construction workers in the UK are 3.7 times more likely to die by suicide than the national average. Multiple factors contribute: the industry is male-dominated, and traditional masculinity norms discourage admitting vulnerability or seeking help. Site culture often promotes a &ldquo;tough it out&rdquo; mentality. Job insecurity and financial pressure are common, particularly among self-employed workers. The transient nature of the workforce &mdash; moving between sites and employers &mdash; means workers may lack continuity of support and stable workplace relationships. Physical pain from the demands of the job, combined with easy access to means (working at height, around machinery), also contributes. Initiatives such as Mates in Mind, the Construction Industry Helpline, and the Building Mental Health charter are working to change the culture and improve access to support.',
  },
  {
    question:
      'As a first aider, how do I look after my own mental health after a traumatic incident?',
    answer:
      'First aiders are not immune to the psychological impact of traumatic incidents. After any significant event, you should have access to an operational debrief (what happened, what went well, lessons learned) ideally within 72 hours, and emotional support (an opportunity to talk about how the experience affected you). Talk to someone you trust &mdash; a colleague, friend, family member, or professional. Recognise that your reactions are normal. Maintain physical health through exercise, sleep, and nutrition. Set boundaries &mdash; you are a first aider, not a therapist. If symptoms such as flashbacks, nightmares, irritability, or emotional numbness persist beyond 4 to 6 weeks, seek professional support through your GP, occupational health, or your employer&rsquo;s Employee Assistance Programme (EAP). Your employer has a duty to support the wellbeing of their first aiders.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A colleague is experiencing a panic attack on site. Which of the following is the MOST appropriate response?',
    options: [
      'Tell them to stop being silly and get back to work',
      'Move them to a calm environment, stay with them, and guide them through slow breathing (in for 4, hold for 4, out for 4)',
      'Give them a paper bag to breathe into and leave them to recover',
      'Call 999 immediately &mdash; all panic attacks require an ambulance',
    ],
    correctAnswer: 1,
    explanation:
      'The most appropriate response is to move the person to a calm, quiet environment, stay with them, and guide them through slow, controlled breathing: in for 4 seconds, hold for 4, out for 4. Reassure them calmly and let them know the feeling will pass. Panic attacks usually resolve within 20 to 30 minutes. Breathing into a paper bag is no longer recommended. An ambulance is not usually required unless you suspect a medical cause or the person requests it.',
  },
  {
    id: 2,
    question:
      'Which of the following is the correct approach when someone tells you they are thinking about suicide?',
    options: [
      'Avoid talking about it directly &mdash; you might make things worse',
      'Ask directly: "Are you thinking about suicide?" &mdash; listen without judgement, do not leave them alone, and call 999 if there is immediate risk',
      'Tell them to think positively and focus on the good things in their life',
      'Refer them to their GP and move on with your day',
    ],
    correctAnswer: 1,
    explanation:
      'The correct approach is to ask directly, listen without judgement, and not leave them alone. Asking "Are you thinking about suicide?" does NOT increase the risk &mdash; research consistently confirms this. Telling someone to "think positively" minimises their feelings. While a GP referral is appropriate, the immediate priority is to ensure their safety. If there is immediate risk (they have a plan and/or means), call 999.',
  },
  {
    id: 3,
    question:
      'Construction workers in the UK are how many times more likely to die by suicide than the national average?',
    options: ['1.5 times', '2.3 times', '3.7 times', '5.1 times'],
    correctAnswer: 2,
    explanation:
      'Construction workers in the UK are 3.7 times more likely to die by suicide than the national average. Approximately 2 construction workers take their own lives every working day in the UK. Factors include the male-dominated culture, stigma around mental health, job insecurity, the transient workforce, and a "tough it out" mentality that discourages seeking help.',
  },
  {
    id: 4,
    question:
      'Which of the following is an example of good communication during a mental health crisis?',
    options: [
      '"Pull yourself together &mdash; others have it much worse."',
      '"Are you OK?" (closed question expecting a yes/no answer)',
      '"I can see you\'re struggling. How are you feeling?" (non-judgemental, open question)',
      '"You need to calm down right now." (direct instruction)',
    ],
    correctAnswer: 2,
    explanation:
      'Good communication in a mental health crisis uses non-judgemental language and open questions. "I can see you\'re struggling. How are you feeling?" acknowledges their distress without minimising it and invites them to share. "Pull yourself together" is dismissive and harmful. "Are you OK?" is a closed question that usually gets a "yes" even when someone is not OK. Telling someone to "calm down" can increase agitation.',
  },
  {
    id: 5,
    question:
      'After a traumatic incident, a first aider is experiencing flashbacks and difficulty sleeping. These symptoms have been present for 10 days. What is the most accurate statement?',
    options: [
      'They are developing PTSD and need immediate psychiatric treatment',
      'These are normal reactions to an abnormal event &mdash; most people recover naturally within weeks',
      'They should not be allowed to continue as a first aider',
      'These symptoms are a sign of personal weakness',
    ],
    correctAnswer: 1,
    explanation:
      'Flashbacks, difficulty sleeping, irritability, and emotional numbness are NORMAL reactions to ABNORMAL events such as witnessing serious injury or death. Most people recover naturally within a few weeks. A diagnosis of PTSD is not usually considered until symptoms have persisted for at least 4 to 6 weeks and are not improving. Professional support should be sought if symptoms persist, worsen, or significantly affect daily life.',
  },
  {
    id: 6,
    question: 'When should you call 999 for a mental health emergency?',
    options: [
      'Only if the person specifically asks you to call an ambulance',
      'If the person is crying or visibly upset',
      'If there is immediate risk to self (actively suicidal with means/plan), immediate risk to others, or a psychotic episode with agitation',
      'You should never call 999 for mental health &mdash; it is not a physical emergency',
    ],
    correctAnswer: 2,
    explanation:
      'Call 999 when there is immediate risk to self (the person is actively suicidal and has means or a plan), immediate risk to others, a psychotic episode involving agitation or aggression, self-harm requiring medical treatment, or severe intoxication with altered consciousness. Mental health emergencies are real emergencies. When in doubt, call 999 &mdash; the operator can advise you.',
  },
  {
    id: 7,
    question:
      'Which of the following is a key barrier to construction workers seeking mental health support?',
    options: [
      'Lack of available services in the UK',
      'Fear of losing work if seen as unfit, combined with the industry\'s "tough it out" culture',
      'Mental health problems are rare in construction',
      'Most construction workers have easy access to workplace counselling',
    ],
    correctAnswer: 1,
    explanation:
      'Key barriers include: traditional masculinity norms in a male-dominated industry, site culture that promotes a "tough it out" mentality, fear of losing work if seen as unfit, and the transient nature of the workforce (moving between sites with no continuity of support). Mental health problems are not rare in construction &mdash; the industry has one of the highest suicide rates of any sector in the UK.',
  },
  {
    id: 8,
    question:
      'An employer has a duty to provide what for first aiders after a significant incident?',
    options: [
      'A pay bonus for attending the incident',
      'Access to debriefing, emotional support, and professional help if needed',
      'A week off work with no questions asked',
      'Written confirmation that they will not face legal action',
    ],
    correctAnswer: 1,
    explanation:
      'Employers have a duty to support the wellbeing of their first aiders. After a significant incident, this should include an operational debrief (ideally within 72 hours), emotional support and the opportunity to talk, peer support from colleagues, and access to professional support such as occupational health, counselling, or an Employee Assistance Programme (EAP). First aiders should not be expected to simply carry on without acknowledgement of the psychological impact.',
  },
];

export default function FirstAidModule5Section4() {
  useSEO({
    title: 'Mental Health Crises, Communication & First Aider Wellbeing | First Aid Module 5.4',
    description:
      'Mental health emergencies on site, panic attacks, suicidal ideation, communication skills for first aiders, barriers to seeking help in construction, critical incident stress, debriefing and self-care for UK workplace first aiders.',
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
            <Link to="../first-aid-module-5">
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
            <Users className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Mental Health Crises, Communication &amp; First Aider Wellbeing
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Recognising and responding to mental health emergencies on site, effective communication
            skills, understanding barriers to seeking help in construction, and looking after your
            own wellbeing as a first aider
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Panic attack:</strong> Calm environment, slow breathing (4-4-4), reassure,
                stay with them
              </li>
              <li>
                <strong>Suicidal ideation:</strong> Take seriously, ask directly, do NOT leave
                alone, 999 if immediate risk
              </li>
              <li>
                <strong>Psychosis:</strong> Stay calm, don&rsquo;t argue with delusions, call 999 if
                risk
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Communicate:</strong> Calm voice, open questions, non-judgemental language
              </li>
              <li>
                <strong>Construction:</strong> 3.7x suicide rate, 2 deaths every working day
              </li>
              <li>
                <strong>Self-care:</strong> Debrief after incidents, know your limits, talk to
                someone
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Recognise and respond to mental health emergencies including panic attacks, severe anxiety, suicidal ideation, and acute psychosis',
              'Demonstrate effective communication skills for supporting someone in a mental health crisis',
              'Explain the barriers to seeking help in the construction industry and why the sector has elevated suicide rates',
              'Describe the signs of critical incident stress and when to seek professional support',
              "Explain the importance of debriefing after significant incidents and the employer's duty of care to first aiders",
              'Identify self-care strategies for first aiders and know when to refer to professional services',
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
        {/* Section 01: Mental Health Emergencies on Site */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            Mental Health Emergencies on Site
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mental health emergencies are real emergencies. They can be just as life-threatening
                as physical injuries and require the same level of urgency and compassion from first
                aiders. On a construction site, you may encounter colleagues experiencing acute
                mental health crises &mdash; recognising the signs and knowing how to respond can
                save lives.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Principle:</strong> You do not need to be a
                  mental health professional to help someone in crisis. Your role as a first aider
                  is to <strong>recognise</strong> the signs, <strong>respond</strong> with
                  compassion and calm, and <strong>refer</strong> to appropriate professional
                  support. This is sometimes called the <strong>&ldquo;3 Rs&rdquo;</strong> of
                  mental health first aid.
                </p>
              </div>

              {/* Panic Attacks */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Panic Attacks</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  A panic attack is a sudden episode of intense fear or anxiety that triggers severe
                  physical reactions, even when there is no real danger or apparent cause. They can
                  be extremely frightening for the person experiencing them and can mimic the
                  symptoms of a heart attack.
                </p>
                <p className="text-sm font-medium text-white mb-2">Recognition:</p>
                <ul className="text-sm text-white/80 space-y-2 mb-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Sudden onset of intense fear or anxiety, often feeling overwhelming and
                      uncontrollable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Racing heart (palpitations), pounding or irregular heartbeat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Chest tightness or chest pain &mdash; may be mistaken for a heart attack
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Difficulty breathing, hyperventilation, or feeling of being unable to get
                      enough air
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Tingling or numbness in the hands, fingers, or face</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Feeling of losing control, &ldquo;going mad&rdquo;, or fear of dying
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Sweating, trembling, nausea, dizziness, or feeling faint</span>
                  </li>
                </ul>
                <p className="text-sm font-medium text-white mb-2">Treatment:</p>
                <div className="space-y-2">
                  {[
                    'Move the person to a calm, quiet environment away from crowds and noise',
                    'Stay with them \u2014 do not leave them alone',
                    'Speak calmly and reassuringly: \u201CYou\u2019re safe. This will pass.\u201D',
                    'Guide slow breathing: in for 4 seconds, hold for 4 seconds, out for 4 seconds (repeat)',
                    'Reassure them that a panic attack is not dangerous and will pass, usually within 20 to 30 minutes',
                    'Do not tell them to \u201Ccalm down\u201D or \u201Cstop panicking\u201D \u2014 this is unhelpful and dismissive',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm text-white/80">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Severe Anxiety */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Severe Anxiety</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Severe anxiety goes beyond normal worry. It is persistent, overwhelming anxiety
                  that significantly affects a person&rsquo;s ability to function, think clearly, or
                  carry out their work safely. On a construction site, a severely anxious worker may
                  be at increased risk of accidents due to impaired concentration and
                  decision-making.
                </p>
                <p className="text-sm font-medium text-white mb-2">Signs to look for:</p>
                <ul className="text-sm text-white/80 space-y-2 mb-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Persistent, excessive worry that is out of proportion to the situation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Physical symptoms: trembling, sweating, nausea, palpitations, dry mouth,
                      muscle tension
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Difficulty concentrating, making decisions, or completing tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Irritability, restlessness, or being easily startled</span>
                  </li>
                </ul>
                <p className="text-sm font-medium text-white mb-2">How to help:</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Acknowledge their feelings: &ldquo;I can see you&rsquo;re having a difficult
                      time&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Offer support without pressure &mdash; do not force them to talk if they are
                      not ready
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Suggest professional help: GP, occupational health, Employee Assistance
                      Programme
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      If they are too anxious to work safely, they should not continue working
                      &mdash; remove them from the hazardous environment
                    </span>
                  </li>
                </ul>
              </div>

              {/* Suicidal Ideation */}
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Suicidal Ideation</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Suicidal ideation means thinking about, considering, or planning suicide. It can
                  range from fleeting thoughts (&ldquo;I wish I wasn&rsquo;t here&rdquo;) to
                  detailed planning with intent and means. As a first aider, you must take{' '}
                  <strong>ALL</strong> mentions of suicide seriously, regardless of how they are
                  expressed.
                </p>
                <div className="space-y-2 mb-3">
                  {[
                    'Take it seriously \u2014 EVERY mention of suicide matters. Do not dismiss it as attention-seeking',
                    'Do NOT leave the person alone \u2014 stay with them at all times',
                    'Listen without judgement \u2014 let them talk, do not interrupt or try to \u201Cfix\u201D them',
                    'Ask directly: \u201CAre you thinking about suicide?\u201D \u2014 asking does NOT increase the risk',
                    'Call 999 if there is immediate risk (they have a plan, have access to means, or are in immediate danger)',
                    'Connect them with support: Samaritans 116 123 (24/7, free), text SHOUT to 85258',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm text-white/80">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                  <p className="text-sm text-red-300 font-medium">
                    Warning signs to look for: talking about wanting to die or being a burden,
                    withdrawing from colleagues, giving away possessions, sudden calmness after a
                    period of depression, increased alcohol or drug use, reckless behaviour, saying
                    goodbye or &ldquo;tying up loose ends&rdquo;.
                  </p>
                </div>
              </div>

              {/* Acute Psychosis */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Acute Psychosis</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Acute psychosis involves a loss of contact with reality. The person may experience
                  hallucinations (seeing or hearing things that are not there), delusions (firmly
                  held false beliefs), confused or disorganised thinking, and agitated or
                  unpredictable behaviour. This can be caused by mental illness, substance use, or
                  extreme stress.
                </p>
                <p className="text-sm font-medium text-white mb-2">How to respond:</p>
                <ul className="text-sm text-white/80 space-y-2 mb-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Stay calm</strong> &mdash; your calmness will
                      help reduce their agitation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Speak slowly and clearly</strong> &mdash; use
                      simple, short sentences
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Do NOT argue with delusions</strong> &mdash; do
                      not try to convince them that what they are experiencing is not real
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Create a safe space</strong> &mdash; remove
                      hazards, ask others to give space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Maintain a safe distance</strong> &mdash; do
                      not crowd or corner them
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Call 999</strong> if there is any risk to the
                      person themselves or to others
                    </span>
                  </li>
                </ul>
                <div className="bg-orange-500/10 border border-orange-500/30 p-3 rounded-lg">
                  <p className="text-sm text-orange-300">
                    <strong>Important:</strong> Do not physically restrain the person unless there
                    is an immediate, serious risk of harm. Restraint can escalate the situation and
                    cause injury to both the person and the rescuer. Wait for emergency services
                    unless intervention is absolutely necessary.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================= */}
        {/* Section 02: Communication Skills for First Aiders */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            Communication Skills for First Aiders
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                How you communicate during a mental health crisis can make the difference between
                someone feeling supported and someone feeling dismissed, judged, or more isolated.
                Effective communication is not about having all the answers &mdash; it is about
                being present, listening, and showing that you care.
              </p>

              {/* Communication Tips Box */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Communication Skills &mdash; Practical Tips
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">Calm, Clear Voice</p>
                    <p className="text-xs text-white/80">
                      Lower your tone. Speak slowly and clearly. A calm voice signals safety and
                      helps reduce the person&rsquo;s agitation. Match their pace &mdash; do not
                      rush them.
                    </p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">Active Listening</p>
                    <p className="text-xs text-white/80">
                      Give your full attention. Maintain appropriate eye contact. Nod to show you
                      are listening. Reflect back what you hear: &ldquo;It sounds like you&rsquo;re
                      feeling&hellip;&rdquo;
                    </p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">
                      Non-Judgemental Language
                    </p>
                    <p className="text-xs text-white/80">
                      Say &ldquo;I can see you&rsquo;re struggling&rdquo; not &ldquo;Pull yourself
                      together.&rdquo; Acknowledge their feelings as valid. Avoid minimising or
                      dismissing what they are experiencing.
                    </p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">Open Questions</p>
                    <p className="text-xs text-white/80">
                      Ask &ldquo;How are you feeling?&rdquo; rather than &ldquo;Are you OK?&rdquo;
                      Open questions invite a real answer and show genuine interest. Closed
                      questions get &ldquo;yes&rdquo; or &ldquo;fine&rdquo; even when things are not
                      fine.
                    </p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">Body Language</p>
                    <p className="text-xs text-white/80">
                      Open posture &mdash; uncrossed arms, facing them. Appropriate distance &mdash;
                      do not crowd. Get to the same level &mdash; kneel or sit if they are on the
                      ground. Show you are present and engaged.
                    </p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">Avoid Minimising</p>
                    <p className="text-xs text-white/80">
                      Do not say &ldquo;It could be worse&rdquo;, &ldquo;Others have it
                      harder&rdquo;, or &ldquo;Man up.&rdquo; These phrases are harmful, invalidate
                      the person&rsquo;s experience, and make them less likely to seek help in
                      future.
                    </p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">Confidentiality</p>
                    <p className="text-xs text-white/80">
                      Respect their privacy. What they tell you should be kept confidential.
                      However, explain the limits: you have a duty to report if there is a risk of
                      harm to themselves or others.
                    </p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">Cultural Sensitivity</p>
                    <p className="text-xs text-white/80">
                      Be aware that attitudes to mental health vary across cultures. Language
                      barriers may make communication difficult. Religious and cultural
                      considerations may affect how a person understands and responds to mental
                      distress.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">What Not to Say:</strong> Avoid phrases that
                  dismiss, minimise, or judge: &ldquo;Just get over it&rdquo;, &ldquo;You
                  don&rsquo;t look depressed&rdquo;, &ldquo;Everyone feels like that
                  sometimes&rdquo;, &ldquo;Have you tried just being more positive?&rdquo;,
                  &ldquo;At least you&rsquo;ve got a job&rdquo;, &ldquo;Real men don&rsquo;t
                  cry.&rdquo; These phrases shut down conversation, reinforce stigma, and can cause
                  real harm.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================= */}
        {/* Section 03: Barriers to Seeking Help in Construction */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Barriers to Seeking Help in Construction
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The construction industry has one of the highest suicide rates of any sector in the
                United Kingdom. Understanding why construction workers are at such elevated risk is
                essential for first aiders working in the industry, because it helps you recognise
                the cultural and structural barriers that prevent people from seeking help.
              </p>

              {/* Statistics Highlight Box */}
              <div className="bg-red-500/10 border border-red-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Construction &amp; Suicide &mdash; The Statistics
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-red-500/5 border border-red-500/20 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-red-400 mb-1">3.7x</p>
                    <p className="text-xs text-white/80">
                      Construction workers are 3.7 times more likely to die by suicide than the
                      national average
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-red-400 mb-1">2 per day</p>
                    <p className="text-xs text-white/80">
                      Approximately 2 construction workers take their own lives every working day in
                      the UK
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Barriers</p>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Male-dominated industry:</strong> Traditional
                      masculinity norms discourage admitting vulnerability, expressing emotions, or
                      asking for help. Many men in the industry have been socialised to believe that
                      struggling with mental health is a sign of weakness.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Site culture:</strong> A &ldquo;tough it
                      out&rdquo; mentality prevails on many sites. Workers may fear being mocked,
                      excluded, or seen as weak if they admit to mental health difficulties. Banter
                      can cross the line into bullying.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Job insecurity:</strong> Many construction
                      workers are self-employed or on short-term contracts. Fear of losing work if
                      they are perceived as unfit or unreliable can prevent them from disclosing
                      mental health problems or taking time off to seek help.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Transient workforce:</strong> Workers
                      frequently move between sites, employers, and locations. This lack of
                      continuity means they may not develop stable workplace relationships, miss out
                      on consistent support, and fall through the gaps between different
                      employers&rsquo; wellbeing provisions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Physical demands and pain:</strong> The
                      physical demands of construction work can contribute to chronic pain, fatigue,
                      and reduced quality of life, all of which are linked to poorer mental health.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Financial pressure:</strong> Irregular income,
                      especially for self-employed workers, combined with long hours away from home,
                      can create significant financial and relationship stress.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Industry Initiatives */}
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Industry Initiatives &amp; Support
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Mates in Mind:</strong> A UK charity working to
                      improve mental health in the construction industry through awareness,
                      training, and support programmes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Construction Industry Helpline:</strong> 0345
                      605 1956 &mdash; free, confidential support for construction workers and their
                      families
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Building Mental Health Charter:</strong> A
                      framework for construction companies to commit to improving mental health
                      support in the workplace
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Mental Health First Aiders:</strong> A growing
                      number of construction companies are training designated mental health first
                      aiders alongside physical first aiders
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* Section 04: Critical Incident Stress */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Critical Incident Stress
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Critical incident stress</strong> refers to the stress reactions experienced
                by first aiders and other responders after a traumatic incident, such as attending a
                serious injury, a fatality, or a distressing scene. These reactions are{' '}
                <strong>normal responses to abnormal events</strong> and do not indicate weakness,
                failure, or unsuitability for the first aider role.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Normal Reactions After a Traumatic Incident
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Flashbacks:</strong> Vivid, intrusive memories
                      of the incident that feel as though it is happening again
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Nightmares:</strong> Disturbing dreams related
                      to the incident, often disrupting sleep
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Difficulty sleeping:</strong> Insomnia,
                      restless sleep, or waking early
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Irritability:</strong> Being more easily
                      frustrated or angered than usual
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Emotional numbness:</strong> Feeling
                      disconnected, flat, or unable to feel emotions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Guilt:</strong> Feeling responsible,
                      questioning whether you did enough, or replaying &ldquo;what if&rdquo;
                      scenarios
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Anxiety:</strong> Heightened worry,
                      hypervigilance, or feeling on edge
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Avoidance:</strong> Wanting to avoid places,
                      people, or situations that remind you of the incident
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">
                    These are NORMAL reactions to ABNORMAL events.
                  </strong>{' '}
                  Most people who experience critical incident stress recover naturally within a few
                  weeks. The symptoms gradually decrease in frequency and intensity as the brain
                  processes the traumatic experience. You are not &ldquo;going mad&rdquo; &mdash;
                  your brain is doing what brains do after trauma.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">
                    When to Seek Professional Help
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-2">
                  While most people recover naturally, you should seek professional support if:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Symptoms persist beyond <strong className="text-white">4 to 6 weeks</strong>{' '}
                      without improvement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Symptoms are <strong className="text-white">getting worse</strong> rather than
                      better over time
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      They are significantly{' '}
                      <strong className="text-white">
                        affecting daily life, work, or relationships
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      You are using <strong className="text-white">alcohol or drugs to cope</strong>{' '}
                      with the symptoms
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      You are having{' '}
                      <strong className="text-white">thoughts of self-harm or suicide</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================= */}
        {/* Section 05: First Aider Debriefing */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            First Aider Debriefing
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                After any significant incident, first aiders should have access to debriefing
                &mdash; both operational (what happened and what can be learned) and emotional (how
                the experience affected them). Debriefing is not a sign of weakness; it is a
                professional practice that supports wellbeing, improves future response, and helps
                prevent long-term psychological harm.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Types of Debriefing</p>
                <div className="space-y-3">
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">Operational Debrief</p>
                    <p className="text-sm text-white/80">
                      What happened? What went well? What could be improved? What lessons can be
                      learned? This should take place ideally within <strong>72 hours</strong> of
                      the incident. It focuses on facts and process, not on emotions, and helps the
                      organisation improve its emergency response.
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">Emotional Support</p>
                    <p className="text-sm text-white/80">
                      An opportunity for the first aider to talk about how the experience affected
                      them emotionally. This is not therapy &mdash; it is simply providing a safe
                      space to acknowledge what happened and how they feel. It should be offered,
                      not forced. Some people prefer to process things privately, and that is valid.
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">Peer Support</p>
                    <p className="text-sm text-white/80">
                      Talking to colleagues who understand &mdash; particularly other first aiders
                      who have been through similar experiences. Peer support can be incredibly
                      valuable because it normalises the emotional response and reduces feelings of
                      isolation.
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">Professional Support</p>
                    <p className="text-sm text-white/80">
                      Access to occupational health, counselling, or an Employee Assistance
                      Programme (EAP). Many employers provide free, confidential counselling through
                      an EAP &mdash; first aiders should be made aware of this service and
                      encouraged to use it if they feel it would help.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Employer&rsquo;s Duty of Care:</strong>{' '}
                  Employers have a legal and moral duty to support the wellbeing of their first
                  aiders. A first aider who attends a serious incident should not simply be expected
                  to carry on with their day as if nothing happened. Providing access to debriefing,
                  time to recover, and professional support if needed is not optional &mdash; it is
                  part of the employer&rsquo;s responsibility under health and safety legislation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* Section 06: Self-Care for First Aiders */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Self-Care for First Aiders
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                First aiders are often so focused on helping others that they neglect their own
                wellbeing. However, you cannot effectively help others if you are struggling
                yourself. Self-care is not selfish &mdash; it is essential for sustaining your
                ability to be an effective first aider over the long term.
              </p>

              {/* Self-Care Checklist */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Self-Care Checklist for First Aiders
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      title: 'Recognise your own limits',
                      description:
                        'It is OK to step back if you are overwhelmed. You are not failing by acknowledging that you need support. If you are not in the right state to help, step aside and let someone else take over.',
                    },
                    {
                      title: 'Talk to someone',
                      description:
                        'Do not bottle up your feelings after a difficult incident. Talk to a trusted colleague, friend, family member, or professional. Expressing what you experienced helps your brain process the event.',
                    },
                    {
                      title: 'Maintain physical health',
                      description:
                        'Regular exercise, adequate sleep, and proper nutrition all contribute to mental resilience. Physical and mental health are closely connected \u2014 looking after your body supports your mind.',
                    },
                    {
                      title: 'Set boundaries',
                      description:
                        'You are a first aider, not a therapist. You are not expected to provide ongoing mental health support, counselling, or therapy. Know where your role ends and professional support begins.',
                    },
                    {
                      title: 'Continuing development',
                      description:
                        'Regular refresher training maintains your confidence and competence. Confidence reduces anxiety in emergency situations, and competence ensures you provide the best possible care.',
                    },
                    {
                      title: 'Know when to refer',
                      description:
                        'You do not have to fix everything. Recognise when a situation is beyond your training and refer to professionals. This is not failure \u2014 it is good practice.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-rose-400/70 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="text-sm text-white/80">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Remember:</strong> Looking after yourself is not
                  optional &mdash; it is a professional responsibility. A first aider who is
                  overwhelmed, burnt out, or suffering from unresolved trauma is less effective and
                  may make errors that could affect casualty outcomes. Self-care is part of being a
                  good first aider.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Helpline Numbers Info Box */}
        <section className="mb-10">
          <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="h-5 w-5 text-rose-400" />
              <p className="text-lg font-semibold text-rose-400">
                Helpline Numbers &mdash; Keep These Visible
              </p>
            </div>
            <p className="text-sm text-white/80 mb-4">
              These numbers should be displayed on site and known by all first aiders. They are
              free, confidential, and available to anyone.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg text-center">
                <p className="text-lg font-bold text-rose-400 mb-1">116 123</p>
                <p className="text-sm font-medium text-white mb-1">Samaritans</p>
                <p className="text-xs text-white/60">
                  Free, 24 hours a day, 7 days a week. Available to anyone who is struggling, not
                  just those who are suicidal.
                </p>
              </div>
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg text-center">
                <p className="text-lg font-bold text-rose-400 mb-1">Text SHOUT to 85258</p>
                <p className="text-sm font-medium text-white mb-1">Shout Crisis Text Line</p>
                <p className="text-xs text-white/60">
                  Free, 24/7 text-based support for anyone in crisis. Useful if the person cannot or
                  prefers not to speak on the phone.
                </p>
              </div>
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg text-center">
                <p className="text-lg font-bold text-rose-400 mb-1">0345 605 1956</p>
                <p className="text-sm font-medium text-white mb-1">
                  Construction Industry Helpline
                </p>
                <p className="text-xs text-white/60">
                  Free, confidential support specifically for construction workers and their
                  families. Covers mental health, financial, and legal support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* When to Call 999 for Mental Health */}
        <section className="mb-10">
          <div className="bg-red-500/10 border border-red-500/30 p-4 sm:p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <h2 className="text-lg font-semibold text-red-400">
                When to Call 999 for Mental Health
              </h2>
            </div>
            <p className="text-sm text-white/80 mb-4">
              Mental health emergencies are real emergencies. Call 999 in any of the following
              situations:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  situation: 'Immediate risk to self',
                  detail: 'The person is actively suicidal with means and/or a plan',
                },
                {
                  situation: 'Immediate risk to others',
                  detail: "The person's behaviour poses a serious threat to the safety of others",
                },
                {
                  situation: 'Psychotic episode with agitation',
                  detail:
                    'Loss of contact with reality combined with agitation, aggression, or unpredictable behaviour',
                },
                {
                  situation: 'Self-harm requiring medical treatment',
                  detail:
                    'The person has injured themselves and needs medical attention for the wound',
                },
                {
                  situation: 'Severe intoxication',
                  detail:
                    'Altered consciousness from alcohol or drugs combined with mental health crisis',
                },
                {
                  situation: 'When in doubt',
                  detail:
                    'If you are unsure whether the situation is an emergency, call 999 \u2014 the operator can advise you',
                },
              ].map((item, i) => (
                <div key={i} className="bg-red-500/5 border border-red-500/20 p-3 rounded-lg">
                  <p className="text-sm font-medium text-red-300 mb-1">{item.situation}</p>
                  <p className="text-xs text-white/70">{item.detail}</p>
                </div>
              ))}
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-6">
              Next: Module 6 &mdash; Mock Exam
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
