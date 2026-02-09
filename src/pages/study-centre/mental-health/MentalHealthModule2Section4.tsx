import { ArrowLeft, HeartHandshake, CheckCircle, AlertTriangle, MessageCircle, ThumbsUp, ThumbsDown, Stethoscope, Brain, Pill, Activity, Users, BookOpen, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ─── Quick Check Questions ─── */
const quickCheckQuestions = [
  {
    id: "algee-first-step",
    question: "A colleague has been unusually withdrawn for weeks, barely speaking at break times, and you've noticed they look exhausted every day. You want to approach them using the ALGEE action plan. What should your FIRST step be?",
    options: [
      "Tell them you've noticed they seem depressed and suggest they see a GP",
      "Approach them in a quiet, private moment and ask how they're doing in an open, non-judgemental way",
      "Send them a text message with a link to the NHS Talking Therapies website",
      "Speak to their supervisor and ask them to arrange an occupational health referral"
    ],
    correctIndex: 1,
    explanation: "The first step in ALGEE is 'Approach, assess and assist with any crisis.' This means choosing a quiet, private moment to have a conversation. Start by simply asking how they are in an open, non-judgemental way. Do not jump straight to suggesting professional help or diagnose them — listen first. Speaking to a supervisor without their knowledge could breach trust and make the situation worse."
  },
  {
    id: "harmful-phrases",
    question: "A colleague tells you they've been diagnosed with depression. Which of the following responses would be MOST harmful?",
    options: [
      "\"That must be really difficult. I'm glad you felt you could tell me.\"",
      "\"I don't really know much about depression, but I'm here if you want to talk.\"",
      "\"But you don't look depressed — you're always smiling at work!\"",
      "\"Is there anything I can do to support you?\""
    ],
    correctIndex: 2,
    explanation: "Saying 'you don't look depressed' invalidates the person's experience and reinforces the stigma that depression must be visibly obvious. Many people with depression mask their symptoms, particularly at work. This kind of comment can make them feel their condition isn't taken seriously and discourage them from opening up again. The other responses are all supportive — they acknowledge the situation, offer presence, and avoid judgement."
  },
  {
    id: "gp-referral",
    question: "You've encouraged a colleague to see their GP about their anxiety. They're nervous about the appointment. What would be MOST helpful to tell them?",
    options: [
      "\"The GP will probably just give you medication — it's really straightforward.\"",
      "\"You can describe your symptoms, the GP will assess you, and they might suggest talking therapy, medication, or both. You can also self-refer to NHS Talking Therapies.\"",
      "\"Just tell the GP you need a sick note and some time off work.\"",
      "\"Don't worry about it — the GP has seen much worse than your anxiety.\""
    ],
    correctIndex: 1,
    explanation: "The most helpful response gives honest, practical information without minimising their experience. Explaining the GP process — that they can describe symptoms, the GP will assess them, and there are various treatment options — helps reduce the fear of the unknown. Mentioning self-referral to NHS Talking Therapies empowers them with an alternative route. Saying 'the GP has seen much worse' minimises their experience, and assuming medication will be prescribed is inaccurate."
  }
];

/* ─── FAQs ─── */
const faqs = [
  {
    question: "What is the difference between feeling down and clinical depression?",
    answer: "Everyone feels low or sad at times — this is a normal human response to difficult life events and usually passes within a few days or weeks. Clinical depression (major depressive disorder) is a persistent low mood lasting at least two weeks that significantly impacts daily functioning. It involves a cluster of symptoms including loss of interest in activities, changes in sleep and appetite, difficulty concentrating, fatigue, feelings of worthlessness, and sometimes thoughts of self-harm. If low mood persists beyond two weeks and interferes with work, relationships, or daily activities, it warrants professional assessment."
  },
  {
    question: "Can I self-refer to NHS Talking Therapies, or do I need a GP referral?",
    answer: "You can absolutely self-refer to NHS Talking Therapies (formerly known as IAPT — Improving Access to Psychological Therapies). You do NOT need a GP referral. Simply search 'NHS Talking Therapies' online and find your local service, or visit the NHS website. You'll be asked to complete a short assessment, and the service will recommend the most appropriate therapy for your situation. Waiting times vary by area but are typically 6 to 18 weeks. You can also ask your GP to refer you if you'd prefer, but self-referral is often faster."
  },
  {
    question: "Are antidepressants addictive?",
    answer: "No, antidepressants such as SSRIs and SNRIs are not addictive in the way that drugs like benzodiazepines or opioids are. You will not develop a craving for them or need increasingly higher doses to feel the same effect. However, if you stop taking them suddenly (particularly after taking them for a long period), you may experience 'discontinuation symptoms' or 'withdrawal effects' such as dizziness, nausea, anxiety, flu-like symptoms, and sleep disturbance. This is why GPs always recommend reducing the dose gradually under medical supervision rather than stopping abruptly."
  },
  {
    question: "What should I do if someone tells me they are having suicidal thoughts?",
    answer: "Stay calm and take them seriously — do not dismiss or minimise what they are telling you. Listen without judgement and thank them for trusting you. Ask directly: 'Are you thinking about suicide?' (asking does NOT increase risk — it can provide relief). If they are in immediate danger, call 999 or take them to A&E. If they are not in immediate danger, encourage them to contact their GP, call Samaritans (116 123, free, 24/7), or text SHOUT to 85258. Do not leave them alone if you believe they are at immediate risk. As a Mental Health First Aider, you do not need to 'fix' the situation — your role is to listen, support, and connect them with professional help."
  },
  {
    question: "How long does CBT typically take?",
    answer: "A typical course of CBT through the NHS involves 6 to 20 sessions, usually weekly, each lasting around 50 to 60 minutes. For mild to moderate depression or anxiety, a shorter course of 6 to 12 sessions may be sufficient. For more complex or severe conditions, 12 to 20 sessions may be recommended. CBT is a structured, time-limited therapy — unlike some other approaches, it is designed to give you skills and tools you can continue using after the therapy ends. Your therapist will agree the number of sessions with you at the start of treatment and review progress regularly."
  },
  {
    question: "Can exercise really help with depression and anxiety?",
    answer: "Yes, there is strong clinical evidence that regular exercise is effective for mild to moderate depression, and NICE guidelines recommend it as a treatment option. Exercise increases the production of endorphins, serotonin, and noradrenaline — the same neurotransmitters targeted by antidepressant medication. The NHS recommends 150 minutes of moderate-intensity exercise per week (such as brisk walking, cycling, or swimming). For construction workers, the physical nature of the job can help, but dedicated exercise outside of work — particularly activities that are enjoyable and social — provides additional mental health benefits. Even a 10-minute walk has measurable mood-boosting effects."
  }
];

/* ─── Quiz Questions ─── */
const quizQuestions = [
  {
    id: 1,
    question: "What does ALGEE stand for in the Mental Health First Aid action plan?",
    options: [
      "Assess, Listen, Guide, Encourage, Educate",
      "Approach, Listen, Give reassurance, Encourage professional help, Encourage other supports",
      "Ask, Learn, Guide, Empathise, Evaluate",
      "Approach, Locate, Get help, Escort, Evaluate"
    ],
    correctAnswer: 1,
    explanation: "ALGEE stands for: Approach, assess and assist with any crisis; Listen non-judgementally; Give reassurance and information; Encourage appropriate professional help; Encourage other supports. This is the core action plan taught in MHFA courses worldwide and provides a structured framework for supporting someone experiencing a mental health problem."
  },
  {
    id: 2,
    question: "Which of the following is a HARMFUL thing to say to someone with depression?",
    options: [
      "\"I'm here for you — you don't have to go through this alone.\"",
      "\"That sounds really difficult. Thank you for telling me.\"",
      "\"Just think positive — there are people much worse off than you.\"",
      "\"I may not fully understand what you're going through, but I care.\""
    ],
    correctAnswer: 2,
    explanation: "Telling someone to 'think positive' or that 'others have it worse' minimises their experience and implies their depression is a choice or a matter of perspective. Depression is a clinical condition, not a lack of gratitude. These comments can increase shame and guilt, making the person less likely to seek help. Supportive responses acknowledge the difficulty without trying to fix or dismiss it."
  },
  {
    id: 3,
    question: "What is the FIRST thing a GP is likely to do when someone presents with depression or anxiety symptoms?",
    options: [
      "Prescribe antidepressant medication immediately",
      "Refer the patient to a psychiatrist",
      "Carry out an assessment using validated tools such as the PHQ-9 (depression) or GAD-7 (anxiety)",
      "Recommend the patient takes time off work"
    ],
    correctAnswer: 2,
    explanation: "A GP will first carry out a structured assessment using validated screening tools. The PHQ-9 (Patient Health Questionnaire) is used for depression and the GAD-7 (Generalised Anxiety Disorder Assessment) for anxiety. These questionnaires help determine the severity of the condition and guide treatment decisions. Medication is not always the first-line treatment — for mild to moderate cases, the GP may recommend talking therapy, guided self-help, or exercise first."
  },
  {
    id: 4,
    question: "NHS Talking Therapies (formerly IAPT) offers several evidence-based treatments. Which therapy is MOST commonly offered as a first-line treatment for anxiety and depression?",
    options: [
      "EMDR (Eye Movement Desensitisation and Reprocessing)",
      "Psychoanalysis",
      "CBT (Cognitive Behavioural Therapy)",
      "Hypnotherapy"
    ],
    correctAnswer: 2,
    explanation: "CBT (Cognitive Behavioural Therapy) is the most widely recommended and commonly offered first-line psychological treatment for depression and anxiety through NHS Talking Therapies. It is recommended by NICE guidelines and has a strong evidence base. CBT focuses on identifying and changing unhelpful patterns of thinking and behaviour. EMDR is primarily used for PTSD. Psychoanalysis and hypnotherapy are not standard NHS Talking Therapies treatments."
  },
  {
    id: 5,
    question: "SSRIs (Selective Serotonin Reuptake Inhibitors) are the most commonly prescribed antidepressants in the UK. How do they work?",
    options: [
      "They increase the production of dopamine in the brain",
      "They block serotonin from being reabsorbed by nerve cells, making more serotonin available in the brain",
      "They sedate the central nervous system to reduce anxiety",
      "They stimulate the production of new brain cells"
    ],
    correctAnswer: 1,
    explanation: "SSRIs work by blocking the reuptake (reabsorption) of serotonin by nerve cells in the brain. This means more serotonin remains available in the synaptic gap between nerve cells, which can improve mood, emotion, and sleep. Common SSRIs include sertraline, fluoxetine, and citalopram. They typically take 2 to 4 weeks to start working and are not sedatives — they do not numb emotions or make you 'high'."
  },
  {
    id: 6,
    question: "When supporting someone with depression or anxiety, what is the role of a Mental Health First Aider regarding medication?",
    options: [
      "Advise the person on which medication might be best for their symptoms",
      "Encourage them to try natural remedies before medication",
      "Understand what the person may be going through but NEVER advise on medication — that is exclusively the role of medical professionals",
      "Suggest they stop taking medication if they report side effects"
    ],
    correctAnswer: 2,
    explanation: "A Mental Health First Aider's role regarding medication is to understand what someone may be going through (e.g., side effects, waiting for medication to take effect, withdrawal symptoms) but NEVER to advise on medication. You must not recommend starting, stopping, changing, or adjusting medication — that is exclusively the role of doctors and pharmacists. If someone reports concerning side effects, encourage them to speak to their GP."
  },
  {
    id: 7,
    question: "Which of the following self-help strategies has the STRONGEST evidence base for helping with mild to moderate depression?",
    options: [
      "Taking vitamin supplements",
      "Watching motivational videos",
      "Regular physical exercise (150 minutes per week of moderate-intensity activity)",
      "Keeping a gratitude journal"
    ],
    correctAnswer: 2,
    explanation: "Regular physical exercise has the strongest evidence base for mild to moderate depression and is recommended by NICE as a treatment option. The NHS recommends 150 minutes of moderate-intensity exercise per week. Exercise increases endorphins, serotonin, and noradrenaline production. While gratitude journaling and other strategies may help some people, exercise is the only self-help intervention with sufficient clinical evidence to be included in NICE depression guidelines as a standalone treatment recommendation."
  },
  {
    id: 8,
    question: "You've been supporting a colleague with anxiety. They tell you they've self-referred to NHS Talking Therapies. What is the typical waiting time they should expect?",
    options: [
      "They should be seen within 48 hours",
      "Typically 6 to 18 weeks, though it varies by area",
      "There is no waiting time — treatment starts immediately after self-referral",
      "At least 12 months in most parts of the UK"
    ],
    correctAnswer: 1,
    explanation: "Typical waiting times for NHS Talking Therapies are 6 to 18 weeks, although this varies significantly by area. The NHS constitution target is that 75% of people should begin treatment within 6 weeks, and 95% within 18 weeks. While waiting, the person may be offered guided self-help materials, online CBT courses, or signposted to other resources. It's helpful to prepare your colleague for this wait and encourage them to use self-help strategies in the meantime."
  }
];

/* ─── Component ─── */
const MentalHealthModule2Section4 = () => {
  useSEO({
    title: "Supporting Someone with Depression or Anxiety | Mental Health Module 2 Section 4",
    description: "Learn how to apply the ALGEE action plan, what to say and what not to say, how to encourage professional help, and understand talking therapies, medication, and self-help strategies.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../mental-health-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-600/20 border border-purple-500/30 mb-4">
            <HeartHandshake className="h-7 w-7 text-purple-400" />
          </div>
          <div className="inline-block bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-purple-400">MODULE 2</span>
            <span className="text-white/40 mx-2">&middot;</span>
            <span className="text-white/60">SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Supporting Someone with Depression or Anxiety
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Practical skills for approaching, supporting, and guiding colleagues towards professional help using the ALGEE action plan
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="font-semibold text-purple-400 mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Approach:</strong> choose a private moment, ask open questions, listen without judgement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Language matters:</strong> supportive phrases build trust; dismissive ones cause harm</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Professional help:</strong> GP assessment, NHS Talking Therapies (self-referral available), medication</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Your role:</strong> listen, support, signpost &mdash; do NOT diagnose or advise on medication</span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="font-semibold text-purple-400/90 mb-2">ALGEE Action Plan</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-purple-300">A</strong> &mdash; Approach, assess and assist with any crisis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-purple-300">L</strong> &mdash; Listen non-judgementally</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-purple-300">G</strong> &mdash; Give reassurance and information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-purple-300">E</strong> &mdash; Encourage appropriate professional help</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-purple-300">E</strong> &mdash; Encourage other supports</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-white/70 mb-4">By the end of this section, you will be able to:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Apply the ALGEE action plan specifically for depression and anxiety, including choosing the right time, place, and approach",
              "Use supportive language and avoid harmful phrases when speaking to someone about their mental health",
              "Explain the GP assessment process and what treatment options may be offered, including talking therapies and medication",
              "Describe the main types of talking therapy available on the NHS including CBT, counselling, IPT, and EMDR",
              "Understand how SSRIs and SNRIs work at a basic level and the Mental Health First Aider's role regarding medication",
              "Signpost someone to self-help strategies including exercise, sleep hygiene, mindfulness, peer support, and trusted online resources"
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-purple-400/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ────────────────────────────────────────────────────── */}
        {/* Section 01: ALGEE in Practice */}
        {/* ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">01</span>
              ALGEE in Practice
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                ALGEE is the core action plan of Mental Health First Aid. While you may have learned the framework
                in earlier modules, this section focuses on applying it <strong className="text-white">specifically for depression and anxiety</strong> in
                a workplace context. Knowing the letters is not enough &mdash; what matters is how you put them
                into practice when a colleague is struggling.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-purple-400">Step-by-Step: Applying ALGEE</h3>
                <div className="space-y-4">
                  {[
                    {
                      letter: "A",
                      title: "Approach, assess and assist with any crisis",
                      detail: "Choose the right time and place. A noisy canteen or busy site is not appropriate. Wait for a quiet moment — perhaps at the end of the day, during a break when others are not around, or offer to go for a walk. Approach with warmth, not urgency. If you believe someone is in immediate danger of harming themselves, treat this as a crisis — do not leave them alone and seek emergency help."
                    },
                    {
                      letter: "L",
                      title: "Listen non-judgementally",
                      detail: "Give them your full attention. Put your phone away. Use open body language. Do not interrupt, offer solutions, or tell them about your own experiences. Let silences happen — they often need space to find the right words. Reflect back what they say: 'It sounds like you've been feeling overwhelmed for a while.' This shows you are listening and not judging."
                    },
                    {
                      letter: "G",
                      title: "Give reassurance and information",
                      detail: "Reassure them that depression and anxiety are common, treatable conditions — not a sign of weakness. Let them know that 1 in 4 people in the UK will experience a mental health problem each year. Share that effective treatments exist and that recovery is possible. Do not diagnose them — simply normalise their experience and reduce shame."
                    },
                    {
                      letter: "E",
                      title: "Encourage appropriate professional help",
                      detail: "Gently suggest speaking to their GP as a good first step. Mention that NHS Talking Therapies offers free self-referral — they do not need a GP referral. If they are resistant, do not push — plant the seed and let them know the option is always there. Offer practical help: 'Would it help if I sat with you while you made the call?'"
                    },
                    {
                      letter: "E",
                      title: "Encourage other supports",
                      detail: "Encourage them to maintain social connections, stay physically active, use self-help resources, and lean on trusted friends or family. Signpost charities such as Mind, Samaritans, and Anxiety UK. Suggest apps like Calm or Headspace for guided meditation. The key is to help them build a network of support rather than relying on one person alone."
                    }
                  ].map(({ letter, title, detail }) => (
                    <div key={letter + title} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-purple-400 text-sm font-bold">{letter}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{title}</p>
                        <p className="text-white/60 text-sm">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Shield className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-purple-300">Privacy Considerations</h3>
                </div>
                <p className="text-white/70 text-sm">
                  Everything someone shares with you in confidence should remain private unless there is an
                  immediate risk to life. Do <strong className="text-white">not</strong> discuss their situation with
                  other colleagues, supervisors, or managers without their explicit permission. If you believe
                  someone is at risk of harming themselves or others, you may need to break confidentiality —
                  but you should tell the person what you are doing and why. On construction sites, privacy can
                  be difficult to find. Consider using a parked van, a quiet corner away from the main works, or
                  even suggesting meeting after work at a neutral location.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────── */}
        {/* Section 02: What to Say (and What NOT to Say) */}
        {/* ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">02</span>
              What to Say (and What NOT to Say)
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The words you choose when speaking to someone about their mental health can either open a door
                or slam it shut. Many people are afraid to talk about depression or anxiety because they fear being
                judged, dismissed, or misunderstood. Your language can make the difference between someone
                seeking help and someone suffering in silence.
              </p>

              {/* ─── Styled Comparison Diagram: What to Say vs What NOT to Say ─── */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-4 text-center flex items-center justify-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Supportive vs Harmful Language
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Supportive — green */}
                  <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                    <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                      <ThumbsUp className="h-5 w-5" />
                      What TO Say
                    </h4>
                    <div className="space-y-3 text-sm">
                      {[
                        { phrase: "\"I'm here for you.\"", why: "Simple, powerful, shows presence without pressure" },
                        { phrase: "\"That sounds really difficult.\"", why: "Validates their experience without trying to fix it" },
                        { phrase: "\"It's OK to not be OK.\"", why: "Normalises struggle, reduces shame" },
                        { phrase: "\"You don't have to go through this alone.\"", why: "Offers connection and support" },
                        { phrase: "\"Thank you for telling me.\"", why: "Acknowledges their courage in opening up" },
                        { phrase: "\"How can I best support you?\"", why: "Empowers them to say what they need" },
                        { phrase: "\"There's no rush — take your time.\"", why: "Removes pressure, gives space" }
                      ].map(({ phrase, why }, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-green-300 font-medium">{phrase}</p>
                            <p className="text-white/50 text-xs">{why}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Harmful — red */}
                  <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                    <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                      <ThumbsDown className="h-5 w-5" />
                      What NOT to Say
                    </h4>
                    <div className="space-y-3 text-sm">
                      {[
                        { phrase: "\"Just cheer up.\"", why: "Implies depression is a choice — it is not" },
                        { phrase: "\"Everyone feels like that sometimes.\"", why: "Minimises a clinical condition to a normal emotion" },
                        { phrase: "\"You don't look depressed.\"", why: "Invalidates their experience; many mask symptoms" },
                        { phrase: "\"There are people worse off than you.\"", why: "Guilt-trips them; pain is not a competition" },
                        { phrase: "\"Have you tried just not worrying about it?\"", why: "Reduces anxiety disorder to a simple habit" },
                        { phrase: "\"You just need to think positive.\"", why: "Implies they're choosing to be ill" },
                        { phrase: "\"Man up\" / \"Pull yourself together.\"", why: "Reinforces toxic stigma; extremely damaging" }
                      ].map(({ phrase, why }, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-red-300 font-medium">{phrase}</p>
                            <p className="text-white/50 text-xs">{why}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
                  <p className="text-white/70 text-sm text-center">
                    <strong className="text-purple-300">Why this matters:</strong> In the construction industry, men are
                    3 times more likely to die by suicide than women. Language that dismisses mental health
                    struggles reinforces the stigma that prevents people from seeking help. Choosing your words
                    carefully can literally save lives.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-2">The Art of Active Listening</h3>
                <p className="text-white/70 text-sm mb-3">
                  What you say matters, but <strong className="text-white">how you listen</strong> matters even more. Active listening means:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div><strong className="text-white">Giving full attention</strong> — put your phone away, face them, make appropriate eye contact</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div><strong className="text-white">Reflecting back</strong> — &ldquo;It sounds like you&rsquo;ve been feeling overwhelmed&rdquo;</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div><strong className="text-white">Tolerating silence</strong> — do not rush to fill gaps; silence gives space to process</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div><strong className="text-white">Asking open questions</strong> — &ldquo;How have you been feeling?&rdquo; not &ldquo;Are you OK?&rdquo;</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div><strong className="text-white">Avoiding the &lsquo;fix-it&rsquo; urge</strong> — your job is to listen, not to solve their problem</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ────────────────────────────────────────────────────── */}
        {/* Section 03: Encouraging Professional Help */}
        {/* ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">03</span>
              Encouraging Professional Help
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                One of the most important things a Mental Health First Aider can do is gently encourage someone
                to seek professional help. For many people &mdash; particularly in the construction industry &mdash;
                the idea of speaking to a doctor about their mental health feels daunting, embarrassing, or unnecessary.
                Understanding the process and being able to explain it can help reduce fear.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-purple-400 flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  How to Suggest Seeing a GP
                </h3>
                <div className="space-y-2 text-sm text-white/70">
                  <p>Bringing up the idea of professional help requires sensitivity. Here are approaches that work well:</p>
                  <div className="flex items-start gap-3 mt-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">&ldquo;Have you thought about speaking to your GP?&rdquo;</strong> — a gentle, open question that plants the seed without pressure</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">&ldquo;Your GP can help with exactly this kind of thing.&rdquo;</strong> — normalises seeking help for mental health as you would for a physical injury</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">&ldquo;Would it help if I went with you, or sat with you while you rang?&rdquo;</strong> — offers practical support that removes barriers</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">&ldquo;You can also self-refer to talking therapy without needing to see a GP.&rdquo;</strong> — gives an alternative route for those who resist seeing a doctor</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-3">Overcoming Resistance</h3>
                <p className="text-white/70 text-sm mb-3">
                  It is common for someone to resist the idea of professional help. Here are typical objections and
                  how you might respond:
                </p>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 p-3 rounded">
                    <p className="text-red-300 font-medium mb-1">&ldquo;I don&rsquo;t need a doctor — I&rsquo;m not crazy.&rdquo;</p>
                    <p className="text-white/60">&rarr; &ldquo;Seeing a GP about your mental health is exactly like seeing them about a bad back. It&rsquo;s just your brain that needs some support, not your spine.&rdquo;</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded">
                    <p className="text-red-300 font-medium mb-1">&ldquo;I don&rsquo;t want to be put on medication.&rdquo;</p>
                    <p className="text-white/60">&rarr; &ldquo;The GP won&rsquo;t force medication on you. They&rsquo;ll talk through your options — therapy is often the first recommendation. You&rsquo;re always in control of your treatment.&rdquo;</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded">
                    <p className="text-red-300 font-medium mb-1">&ldquo;I can&rsquo;t take time off work for appointments.&rdquo;</p>
                    <p className="text-white/60">&rarr; &ldquo;Many GP surgeries offer early morning, evening, or telephone appointments. NHS Talking Therapies also offer evening and weekend sessions. It&rsquo;s worth asking about flexible options.&rdquo;</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-purple-400">The GP Appointment Process</h3>
                <p className="text-white/70 text-sm mb-3">
                  If someone has never spoken to a GP about mental health, explaining what to expect can reduce anxiety about the appointment:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      step: 1,
                      title: "Book the appointment",
                      detail: "Request a standard or double appointment. Many surgeries allow you to specify 'mental health' when booking so the GP can prepare. Telephone and video consultations are also available."
                    },
                    {
                      step: 2,
                      title: "Describe your symptoms",
                      detail: "The GP will ask about symptoms, how long they've lasted, and how they affect daily life. It can help to write symptoms down beforehand. Be as honest as possible — GPs are bound by strict confidentiality."
                    },
                    {
                      step: 3,
                      title: "Assessment",
                      detail: "The GP may use validated screening tools: the PHQ-9 for depression (a 9-question scoring system) and the GAD-7 for anxiety (a 7-question scoring system). These help determine severity — mild, moderate, or severe."
                    },
                    {
                      step: 4,
                      title: "Treatment plan",
                      detail: "Based on severity, the GP may recommend: guided self-help and lifestyle changes (mild), talking therapy such as CBT (mild–moderate), medication such as SSRIs (moderate–severe), or a combination. They may also refer to a Community Mental Health Team for severe cases."
                    },
                    {
                      step: 5,
                      title: "Follow-up",
                      detail: "The GP will typically arrange a follow-up appointment in 2–4 weeks to review progress. If medication is prescribed, follow-up is essential as SSRIs take 2–4 weeks to take effect and side effects may need monitoring."
                    }
                  ].map(({ step, title, detail }) => (
                    <div key={step} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-purple-400 text-sm font-bold">{step}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{title}</p>
                        <p className="text-white/60 text-sm">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-2 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  NHS Talking Therapies (Self-Referral)
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Formerly known as IAPT (Improving Access to Psychological Therapies), NHS Talking Therapies is
                  a free NHS service offering evidence-based treatments for depression and anxiety. Crucially,
                  <strong className="text-white"> you can self-refer without seeing a GP</strong>.
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>Search &ldquo;NHS Talking Therapies&rdquo; online and find your local service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>Complete a short online or telephone assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>The service recommends the most appropriate therapy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>Typical waiting time: 6&ndash;18 weeks (varies by area)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>Sessions available face-to-face, online, by telephone, or in groups</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ────────────────────────────────────────────────────── */}
        {/* Section 04: Talking Therapies */}
        {/* ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">04</span>
              Talking Therapies
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                &ldquo;Talking therapy&rdquo; is the umbrella term for psychological treatments where a trained
                therapist helps you work through mental health difficulties by talking. Several different types
                of talking therapy are available on the NHS, each with a different approach. Understanding the
                basics of each can help you explain options to someone who is unsure about seeking help.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* CBT */}
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <h3 className="text-purple-300 font-medium mb-2 flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    CBT (Cognitive Behavioural Therapy)
                  </h3>
                  <p className="text-white/70 text-sm mb-2">
                    <strong className="text-white">Most commonly offered for depression and anxiety.</strong> CBT
                    is based on the idea that thoughts, feelings, and behaviours are interconnected. By identifying
                    and challenging unhelpful thought patterns, you can change how you feel and behave.
                  </p>
                  <ul className="text-white/60 space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span><strong className="text-white/80">Duration:</strong> typically 6&ndash;20 sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span><strong className="text-white/80">Format:</strong> structured, goal-oriented, includes &ldquo;homework&rdquo;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span><strong className="text-white/80">Access:</strong> NHS Talking Therapies, GP referral, or private</span>
                    </li>
                  </ul>
                </div>

                {/* Counselling */}
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <h3 className="text-purple-300 font-medium mb-2 flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Counselling
                  </h3>
                  <p className="text-white/70 text-sm mb-2">
                    <strong className="text-white">A safe space to explore feelings.</strong> Counselling is less
                    structured than CBT. A trained counsellor helps you talk through problems and feelings in
                    a supportive, confidential environment. It does not focus on changing thought patterns
                    but on understanding and processing emotions.
                  </p>
                  <ul className="text-white/60 space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span><strong className="text-white/80">Duration:</strong> typically 6&ndash;12 sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span><strong className="text-white/80">Format:</strong> person-centred, non-directive</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span><strong className="text-white/80">Access:</strong> NHS, GP referral, charities, or private</span>
                    </li>
                  </ul>
                </div>

                {/* IPT */}
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <h3 className="text-purple-300 font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    IPT (Interpersonal Therapy)
                  </h3>
                  <p className="text-white/70 text-sm mb-2">
                    <strong className="text-white">Focuses on relationships and social roles.</strong> IPT is based
                    on the idea that mental health problems are closely linked to our relationships with others.
                    It helps identify patterns in relationships that contribute to depression and develop
                    healthier ways of relating to people.
                  </p>
                  <ul className="text-white/60 space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span><strong className="text-white/80">Duration:</strong> typically 12&ndash;16 sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span><strong className="text-white/80">Format:</strong> structured, focuses on 4 key areas (grief, disputes, role transitions, isolation)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span><strong className="text-white/80">Access:</strong> NHS Talking Therapies or private</span>
                    </li>
                  </ul>
                </div>

                {/* EMDR */}
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <h3 className="text-purple-300 font-medium mb-2 flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    EMDR (Eye Movement Desensitisation &amp; Reprocessing)
                  </h3>
                  <p className="text-white/70 text-sm mb-2">
                    <strong className="text-white">Primarily for trauma and PTSD.</strong> EMDR uses bilateral
                    stimulation (typically guided eye movements) while recalling traumatic memories. This
                    helps the brain reprocess the memory so it becomes less distressing. It can also be
                    effective for anxiety and depression linked to trauma.
                  </p>
                  <ul className="text-white/60 space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span><strong className="text-white/80">Duration:</strong> typically 8&ndash;12 sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span><strong className="text-white/80">Format:</strong> structured 8-phase protocol</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span><strong className="text-white/80">Access:</strong> NHS (for PTSD), GP referral, or private</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Group Therapy */}
              <div className="bg-white/5 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-2 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Group Therapy
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Group therapy involves a therapist working with a small group of people (usually 6&ndash;12)
                  who share similar difficulties. It is particularly effective because participants realise
                  they are not alone, learn from others&rsquo; experiences, and practise social skills in a
                  safe environment.
                </p>
                <div className="grid sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded">
                    <p className="text-purple-300 font-medium text-xs mb-1">Duration</p>
                    <p className="text-white/70">8&ndash;12 weekly sessions, typically 90 minutes each</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded">
                    <p className="text-purple-300 font-medium text-xs mb-1">Best for</p>
                    <p className="text-white/70">Social anxiety, depression, bereavement, anger management</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded">
                    <p className="text-purple-300 font-medium text-xs mb-1">Access</p>
                    <p className="text-white/70">NHS Talking Therapies, charities (Mind, SANE), or private</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-2">Accessing Therapy: NHS vs Private</h3>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-purple-300 font-medium mb-2">NHS (Free)</p>
                    <ul className="text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Self-refer via NHS Talking Therapies or GP referral</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Waiting times: typically 6&ndash;18 weeks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Limited number of sessions (usually up to 20)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Evidence-based therapies only (CBT, IPT, counselling, EMDR)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-purple-300 font-medium mb-2">Private</p>
                    <ul className="text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>No waiting list — typically begin within 1&ndash;2 weeks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Cost: &pound;40&ndash;&pound;100+ per session</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>More choice of therapist and therapy type</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Check qualifications: BACP, UKCP, or BPS registered</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────── */}
        {/* Section 05: Medication Awareness */}
        {/* ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">05</span>
              Medication Awareness
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                As a Mental Health First Aider, you will <strong className="text-white">never</strong> advise someone
                on medication. That is exclusively the role of doctors and pharmacists. However, understanding the
                basics of how antidepressants work helps you support someone who may be taking them, experiencing
                side effects, or anxious about starting medication.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Critical Boundary</h3>
                </div>
                <p className="text-white/70 text-sm">
                  Your role as a Mental Health First Aider is to <strong className="text-white">understand</strong> what
                  someone may be going through, <strong className="text-white">not</strong> to advise on medication. Never
                  recommend starting, stopping, increasing, decreasing, or changing medication. Never suggest
                  alternatives to prescribed medication. If someone reports concerning side effects, encourage
                  them to speak to their GP or pharmacist — do not tell them to stop taking their medication.
                </p>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-purple-400 flex items-center gap-2">
                  <Pill className="h-5 w-5" />
                  SSRIs (Selective Serotonin Reuptake Inhibitors)
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  SSRIs are the <strong className="text-white">most commonly prescribed antidepressants</strong> in the
                  UK. Common examples include sertraline, fluoxetine (Prozac), citalopram, escitalopram, and
                  paroxetine.
                </p>
                <div className="space-y-2 text-sm text-white/70">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">How they work:</strong> SSRIs block the reuptake (reabsorption) of serotonin by nerve cells in the brain. This means more serotonin is available in the gap between nerve cells, which can improve mood, sleep, and emotional regulation.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Onset:</strong> SSRIs typically take 2&ndash;4 weeks to start working. This is a difficult period for patients and is important for a MHFA to understand — the person may feel no better (or even slightly worse) initially.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Common side effects:</strong> nausea, headaches, dizziness, drowsiness or insomnia, reduced appetite, increased anxiety initially, sexual dysfunction. Most side effects reduce after 1&ndash;2 weeks.</div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-purple-400 flex items-center gap-2">
                  <Pill className="h-5 w-5" />
                  SNRIs (Serotonin &amp; Noradrenaline Reuptake Inhibitors)
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  SNRIs such as venlafaxine and duloxetine work similarly to SSRIs but also affect noradrenaline.
                  They may be prescribed when SSRIs have not been effective or for certain types of anxiety.
                </p>
                <div className="space-y-2 text-sm text-white/70">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">How they work:</strong> block the reuptake of both serotonin AND noradrenaline, increasing the availability of both neurotransmitters in the brain. Noradrenaline affects alertness, energy, and attention.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Side effects:</strong> similar to SSRIs, plus potential for increased blood pressure and sweating. Regular monitoring by the GP is important.</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-3">Not Addictive — but Withdrawal Effects Are Real</h3>
                <p className="text-white/70 text-sm mb-3">
                  Antidepressants are <strong className="text-white">not addictive</strong> in the way that substances
                  like opioids or benzodiazepines are. You will not crave them or need increasing doses. However,
                  stopping them suddenly &mdash; particularly after long-term use &mdash; can cause
                  <strong className="text-white"> discontinuation symptoms</strong>:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <ul className="text-white/70 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Dizziness and light-headedness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Nausea and stomach upset</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>&ldquo;Brain zaps&rdquo; (electric shock sensations)</span>
                    </li>
                  </ul>
                  <ul className="text-white/70 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Flu-like symptoms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Anxiety and irritability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Sleep disturbance and vivid dreams</span>
                    </li>
                  </ul>
                </div>
                <p className="text-white/50 text-xs mt-3 italic">
                  This is why GPs always recommend tapering (gradually reducing the dose) rather than stopping
                  abruptly. If someone tells you they have stopped taking their medication suddenly, encourage
                  them to contact their GP as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ────────────────────────────────────────────────────── */}
        {/* Section 06: Self-Help and Other Supports */}
        {/* ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">06</span>
              Self-Help and Other Supports
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Professional help is vital, but self-help strategies and other supports play a crucial
                complementary role in recovery from depression and anxiety. As a Mental Health First Aider,
                being able to signpost someone to evidence-based self-help options empowers them to take
                active steps towards improving their wellbeing.
              </p>

              {/* Exercise */}
              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-purple-400 flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Exercise — The Strongest Evidence Base
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Regular physical exercise is recommended by <strong className="text-white">NICE guidelines</strong> as
                  a treatment for mild to moderate depression. The evidence is so strong that some GP surgeries
                  now offer &ldquo;exercise on prescription&rdquo; through local leisure centres.
                </p>
                <div className="space-y-2 text-sm text-white/70">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">NHS recommendation:</strong> 150 minutes per week of moderate-intensity exercise (brisk walking, cycling, swimming)</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">How it helps:</strong> increases endorphins, serotonin, and noradrenaline &mdash; the same neurotransmitters targeted by antidepressant medication</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Quick wins:</strong> even a 10-minute brisk walk has measurable mood-boosting effects. Exercising outdoors (&ldquo;green exercise&rdquo;) provides additional benefits</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">For construction workers:</strong> the physical demands of the job help, but dedicated exercise outside of work &mdash; particularly enjoyable, social activities &mdash; provides additional mental health benefits</div>
                  </div>
                </div>
              </div>

              {/* Sleep Hygiene */}
              <div className="bg-white/5 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-3">Sleep Hygiene</h3>
                <p className="text-white/70 text-sm mb-3">
                  Poor sleep is both a symptom and a driver of depression and anxiety. Improving sleep habits
                  (&ldquo;sleep hygiene&rdquo;) can break this cycle:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div><strong className="text-white">Consistent schedule:</strong> go to bed and wake up at the same time every day, including weekends</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div><strong className="text-white">Screen-free wind-down:</strong> avoid phones, tablets, and laptops for at least 30 minutes before bed</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div><strong className="text-white">Limit caffeine:</strong> avoid caffeine after 2pm (including tea and energy drinks common on site)</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div><strong className="text-white">Cool, dark room:</strong> ideal sleeping temperature is 16&ndash;18&deg;C with blackout curtains or an eye mask</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div><strong className="text-white">Limit alcohol:</strong> alcohol disrupts sleep quality even when it helps you fall asleep initially</div>
                  </li>
                </ul>
              </div>

              {/* Mindfulness and Meditation */}
              <div className="bg-white/5 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-3">Mindfulness and Meditation</h3>
                <p className="text-white/70 text-sm mb-3">
                  Mindfulness-Based Cognitive Therapy (MBCT) is recommended by NICE for preventing relapse
                  in recurrent depression. Even informal mindfulness practice can help reduce anxiety and
                  improve emotional regulation.
                </p>
                <div className="space-y-2 text-sm text-white/70">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">What it involves:</strong> paying deliberate, non-judgemental attention to the present moment &mdash; noticing thoughts, feelings, and physical sensations without trying to change them</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Getting started:</strong> guided meditation apps (Calm, Headspace) offer 5&ndash;10 minute beginner sessions that can be done anywhere, including on a break</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Evidence:</strong> reduces rumination (repetitive negative thinking), lowers cortisol (stress hormone), and improves sleep quality</div>
                  </div>
                </div>
              </div>

              {/* Peer Support Groups */}
              <div className="bg-white/5 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-3">Peer Support Groups</h3>
                <p className="text-white/70 text-sm mb-3">
                  Peer support brings together people with shared experiences. It reduces isolation,
                  provides practical coping strategies, and normalises mental health struggles. Construction-specific
                  groups are available through charities such as the Lighthouse Construction Industry Charity
                  and Mates in Mind.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded">
                    <p className="text-purple-300 font-medium text-xs mb-1">In-person groups</p>
                    <p className="text-white/70">Mind local groups, Andy&rsquo;s Man Club (free, men-only), local IAPT groups</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded">
                    <p className="text-purple-300 font-medium text-xs mb-1">Online communities</p>
                    <p className="text-white/70">Mind Side by Side, Anxiety UK forums, Big White Wall (now Togetherall)</p>
                  </div>
                </div>
              </div>

              {/* Online Resources */}
              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Trusted Online Resources
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Signposting someone to reliable, evidence-based resources is a valuable part of your role
                  as a Mental Health First Aider. Here are the most trusted UK sources:
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-violet-400 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Every Mind Matters (NHS)</strong>
                      <span className="text-white/50"> — personalised mental health action plan, free self-help tools, quizzes and videos</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-violet-400 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Mind</strong>
                      <span className="text-white/50"> — comprehensive information on every mental health condition, local services, legal rights at work, helpline</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-violet-400 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Anxiety UK</strong>
                      <span className="text-white/50"> — specialist charity for anxiety disorders, helpline, therapy access, self-help resources</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-violet-400 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Samaritans (116 123)</strong>
                      <span className="text-white/50"> — free, confidential, 24/7 listening service for anyone in distress, not just those who are suicidal</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-violet-400 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Mates in Mind</strong>
                      <span className="text-white/50"> — construction-industry-specific mental health charity, workplace training, resources for employers and workers</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Apps */}
              <div className="bg-white/5 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-3">Recommended Apps</h3>
                <p className="text-white/70 text-sm mb-3">
                  Digital tools can complement professional treatment. These apps are evidence-informed
                  and widely recommended by NHS professionals:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded">
                    <p className="text-purple-300 font-medium mb-1">Calm</p>
                    <p className="text-white/60">Guided meditation, sleep stories, breathing exercises. Free tier available.</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded">
                    <p className="text-purple-300 font-medium mb-1">Headspace</p>
                    <p className="text-white/60">Structured mindfulness courses, animations explaining mental health. Free basics.</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded">
                    <p className="text-purple-300 font-medium mb-1">NHS Every Mind Matters</p>
                    <p className="text-white/60">Free personalised action plan. Completely free, evidence-based, NHS-developed.</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded">
                    <p className="text-purple-300 font-medium mb-1">Togetherall</p>
                    <p className="text-white/60">Monitored peer support community with self-help courses. Free via many NHS trusts.</p>
                  </div>
                </div>
              </div>

              {/* Social Connection */}
              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-purple-400">Social Connection — The Foundation</h3>
                <p className="text-white/70 text-sm">
                  Human connection is one of the most powerful protections against depression and anxiety.
                  Isolation amplifies mental health problems; connection reduces them. Encourage someone who
                  is struggling to maintain their social relationships, even when they feel like withdrawing.
                  This could be as simple as having lunch with a colleague rather than eating alone, sending a
                  text to a friend, attending a sports club, or volunteering. On construction sites, small
                  gestures matter enormously &mdash; checking in on someone during a tea break, including them
                  in conversation, or simply asking &ldquo;How are you doing — really?&rdquo; can make a significant
                  difference.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Quiz ─── */}
        <div className="mt-12">
          <Quiz
            title="Supporting Someone with Depression or Anxiety — Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* ─── Bottom Navigation ─── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../mental-health-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-purple-500 text-white hover:bg-purple-500/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../mental-health-module-3">
              Next: Module 3 — Substance Use &amp; Mental Health
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MentalHealthModule2Section4;
