import {
  ArrowLeft,
  Scissors,
  CheckCircle,
  AlertTriangle,
  Shield,
  Heart,
  Phone,
  HandHeart,
  Brain,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Quick Check Questions (inline knowledge checks between sections)  */
/* ------------------------------------------------------------------ */

const quickCheckQuestions = [
  {
    id: "mh-selfharm-coping",
    question:
      "A colleague confides that they have been deliberately hurting themselves. They say it is the only way they can cope with overwhelming feelings. What is the MOST appropriate initial response?",
    options: [
      "Tell them they must stop immediately because it is dangerous",
      "React with visible shock and tell them you had no idea people did that",
      "Listen without judgement, validate their feelings, and ask what they need from you right now",
      "Ignore what they said and change the subject to avoid making them uncomfortable",
    ],
    correctIndex: 2,
    explanation:
      "A non-judgemental response is critical when someone discloses self-harm. Insisting they stop immediately can increase distress and remove their current coping mechanism without offering an alternative. Reacting with shock or disgust may cause shame and make them regret disclosing. Ignoring the disclosure dismisses their trust. The correct approach is to listen calmly, validate that their feelings are real and understandable, and ask what support they need.",
  },
  {
    id: "mh-selfharm-firstaid",
    question:
      "You discover that a colleague has taken an overdose of paracetamol approximately two hours ago. They appear conscious and alert. What should you do?",
    options: [
      "Since they seem fine, advise them to drink plenty of water and monitor themselves at home",
      "Induce vomiting immediately to remove the tablets from their stomach",
      "Call 999 immediately, do not induce vomiting, keep any packaging, and stay with them",
      "Wait to see if symptoms develop before taking any action",
    ],
    correctIndex: 2,
    explanation:
      "Paracetamol overdose is a medical emergency even when the person appears well. Paracetamol causes delayed liver damage that may not produce symptoms for 24\u201372 hours, by which time irreversible damage may have occurred. Call 999 immediately. Do NOT induce vomiting. Keep any packaging or remaining tablets to give to paramedics. The casualty needs hospital treatment (N-acetylcysteine) as soon as possible, ideally within 8 hours of ingestion.",
  },
  {
    id: "mh-selfharm-support",
    question:
      "According to NICE guidelines, which talking therapy is considered particularly effective for people who self-harm?",
    options: [
      "Psychoanalysis",
      "Dialectical Behaviour Therapy (DBT)",
      "Hypnotherapy",
      "Eye Movement Desensitisation and Reprocessing (EMDR)",
    ],
    correctIndex: 1,
    explanation:
      "Dialectical Behaviour Therapy (DBT) is specifically recommended by NICE for people who self-harm, particularly those with borderline personality disorder or emotional dysregulation. DBT teaches skills in four key areas: mindfulness, distress tolerance, emotional regulation, and interpersonal effectiveness. It provides alternative coping strategies to replace self-harm and has a strong evidence base for reducing self-harming behaviour.",
  },
];

/* ------------------------------------------------------------------ */
/*  Frequently Asked Questions                                        */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    question:
      "Is self-harm always a sign that someone wants to end their life?",
    answer:
      "No. While self-harm and suicide are related (people who self-harm are at higher risk of suicide), many people who self-harm do not intend to die. Self-harm is most commonly used as a coping mechanism for overwhelming emotional pain \u2014 a way to release tension, feel in control, or express distress that cannot be put into words. However, it is important to take all self-harm seriously and to ask the person directly whether they have any thoughts of suicide, because the two can co-exist.",
  },
  {
    question:
      "Should I remove sharp objects or other means of self-harm from someone\u2019s environment?",
    answer:
      "This is a nuanced issue. For someone in immediate crisis, reducing access to means of harm can be a helpful safety measure \u2014 similar to means restriction in suicide prevention. However, taking away someone\u2019s belongings without their consent can feel controlling and may damage the trust between you. The best approach is to discuss this collaboratively with the person: explain your concern, ask how they feel about it, and agree on safety measures together. A mental health professional can help develop a formal safety plan.",
  },
  {
    question:
      "What should I do if I accidentally see self-harm scars or fresh injuries on a colleague at work?",
    answer:
      "If you notice scars or injuries, avoid staring or drawing attention to them in front of others. Choose a private, quiet moment to gently let the person know you have noticed and that you care. You might say something like: \u201cI\u2019ve noticed some marks on your arms. I\u2019m not here to judge \u2014 I just want you to know I\u2019m here if you ever want to talk.\u201d Respect their response. They may not be ready to talk, and that is their right. Do not share what you have noticed with other colleagues without the person\u2019s consent.",
  },
  {
    question:
      "Is it true that talking about self-harm can encourage people to start doing it?",
    answer:
      "No. This is a common myth. Research consistently shows that asking about self-harm or discussing it in an appropriate, sensitive way does NOT encourage people to start self-harming. In fact, creating a safe space for open conversation makes it more likely that someone who is struggling will seek help. Silence and stigma around self-harm are far more harmful than open, compassionate discussion. This is why Mental Health First Aid training covers these topics directly.",
  },
  {
    question:
      "What is the harm minimisation approach, and is it appropriate?",
    answer:
      "Harm minimisation (or harm reduction) acknowledges that some people may not be able or ready to stop self-harming immediately. Rather than demanding abstinence, it focuses on reducing the physical risk \u2014 for example, using clean implements, knowing how to care for wounds, understanding when injuries need medical attention, and having a safety plan for crisis moments. This approach is supported by some NHS services and charities. It does not mean condoning self-harm \u2014 it means keeping the person as safe as possible while they work towards recovery.",
  },
  {
    question:
      "As a Mental Health First Aider, am I expected to provide ongoing support to someone who self-harms?",
    answer:
      "No. Your role as a Mental Health First Aider is to provide initial support, listen non-judgementally, offer reassurance, and guide the person towards appropriate professional help. You are not a counsellor or therapist, and you should not attempt to take on that role. Ongoing support for self-harm requires trained professionals. However, you can be a consistent, compassionate presence \u2014 checking in, being available, and maintaining the relationship of trust \u2014 while the person accesses professional support.",
  },
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz                                               */
/* ------------------------------------------------------------------ */

const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following BEST describes self-harm?",
    options: [
      "A failed suicide attempt",
      "Deliberate injury to oneself, often used as a coping mechanism for overwhelming emotions",
      "A behaviour found only in teenagers",
      "Attention-seeking behaviour that should be ignored",
    ],
    correctAnswer: 1,
    explanation:
      "Self-harm is the deliberate act of injuring oneself. It is most commonly used as a way of coping with overwhelming emotional pain, not as a suicide attempt (although the two can co-exist). Self-harm affects all ages, genders, and backgrounds, and should never be dismissed as attention-seeking.",
  },
  {
    id: 2,
    question:
      "Which of the following is recognised as a form of self-harm?",
    options: [
      "Only cutting",
      "Only cutting and burning",
      "Cutting, burning, hitting, poisoning, hair pulling, skin picking, excessive exercise, and deliberate recklessness",
      "Only behaviours that leave visible scars",
    ],
    correctAnswer: 2,
    explanation:
      "Self-harm takes many forms beyond the most commonly recognised methods. The range includes cutting, burning, hitting or punching oneself, poisoning or overdose, hair pulling (trichotillomania), skin picking (dermatillomania), excessive exercise, deliberate recklessness, and substance misuse used as a form of self-injury. The range is far broader than many people realise.",
  },
  {
    id: 3,
    question:
      "A colleague discloses that they self-harm. Which response follows MHFA principles?",
    options: [
      "\"You need to stop doing that immediately \u2014 it\u2019s really dangerous.\"",
      "\"I can\u2019t believe you would do that to yourself.\"",
      "\"Thank you for trusting me with this. I\u2019m not here to judge. Can you tell me what you need right now?\"",
      "\"You should be grateful for what you have \u2014 other people have it much worse.\"",
    ],
    correctAnswer: 2,
    explanation:
      "The correct response validates the person\u2019s trust, is non-judgemental, and asks what they need. Demanding they stop removes their coping mechanism without offering an alternative. Expressing disbelief causes shame. Comparing their situation to others dismisses their pain. The MHFA approach uses ALGEE: Approach, Listen, Give reassurance, Encourage professional help, Encourage self-help.",
  },
  {
    id: 4,
    question:
      "In the ALGEE framework, what does the second \u2018E\u2019 stand for?",
    options: [
      "Evaluate the situation",
      "Encourage self-help and other support strategies",
      "Establish a treatment plan",
      "Escalate to management immediately",
    ],
    correctAnswer: 1,
    explanation:
      "ALGEE stands for: Approach, assess, and assist with any crisis; Listen non-judgementally; Give reassurance and information; Encourage appropriate professional help; Encourage self-help and other support strategies. The second E reminds the first aider to support the person in developing their own coping strategies and accessing peer support, self-help resources, and community services.",
  },
  {
    id: 5,
    question:
      "Someone has taken a deliberate overdose of medication. They currently appear well and are fully conscious. What should you do?",
    options: [
      "Monitor them for a few hours and only call for help if symptoms appear",
      "Call 999 immediately, do not induce vomiting, keep any packaging, and stay with them until help arrives",
      "Give them milk to dilute the medication in their stomach",
      "Drive them to the nearest pharmacy for advice",
    ],
    correctAnswer: 1,
    explanation:
      "A deliberate overdose is ALWAYS a medical emergency, even when the person appears well. Many substances (including paracetamol) cause delayed organ damage that may not produce symptoms for hours or days. Call 999 immediately. Do NOT induce vomiting. Keep any packaging, bottles, or remaining medication for the paramedics. Stay with the casualty and monitor their level of consciousness.",
  },
  {
    id: 6,
    question:
      "Why should you NOT insist that someone stops self-harming immediately?",
    options: [
      "Because it is not your responsibility",
      "Because self-harm is their personal choice and none of your business",
      "Because removing their coping mechanism without an alternative in place can increase distress and risk",
      "Because stopping self-harm is easy and they will do it when they are ready",
    ],
    correctAnswer: 2,
    explanation:
      "Self-harm often serves as a coping mechanism for overwhelming emotional pain. If the person\u2019s only way of coping is removed without helping them develop safer alternatives first, their distress may increase, potentially leading to more dangerous behaviour or suicidal thoughts. The goal is to support the person towards professional help where they can develop healthier coping strategies over time.",
  },
  {
    id: 7,
    question:
      "Which organisation provides a specific helpline for young people under 35 who are experiencing thoughts of suicide or self-harm?",
    options: [
      "Mind",
      "Samaritans",
      "Papyrus (HOPELINEUK)",
      "Rethink Mental Illness",
    ],
    correctAnswer: 2,
    explanation:
      "Papyrus operates HOPELINEUK (0800 068 4141), a helpline specifically for young people under 35 who are experiencing thoughts of suicide or self-harm, and for anyone concerned about a young person. Samaritans (116 123) supports all ages. Mind provides general mental health information and support. All are valuable services, but Papyrus has the specific age-related focus described in the question.",
  },
  {
    id: 8,
    question:
      "According to NICE guidelines, which therapy is recommended as particularly effective for reducing self-harm?",
    options: [
      "Cognitive Behavioural Therapy (CBT) only",
      "Counselling only",
      "Dialectical Behaviour Therapy (DBT)",
      "Art therapy only",
    ],
    correctAnswer: 2,
    explanation:
      "Dialectical Behaviour Therapy (DBT) is specifically recommended by NICE for people who self-harm, particularly those with emotional dysregulation or borderline personality disorder. DBT combines cognitive-behavioural techniques with mindfulness and teaches four core skill sets: mindfulness, distress tolerance, emotional regulation, and interpersonal effectiveness. While CBT and other therapies may also be helpful, DBT has the strongest evidence base for self-harm specifically.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function MentalHealthModule3Section2() {
  useSEO({
    title: "Self-Harm | Mental Health First Aid Module 3.2",
    description:
      "Understanding self-harm, types and prevalence, why people self-harm, how to respond using MHFA principles, first aid for self-harm injuries, and long-term support pathways.",
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
            <Link to="../mental-health-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-400/20 border border-purple-500/30 mb-4">
            <Scissors className="h-7 w-7 text-purple-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 mx-auto">
            <span className="text-purple-400 text-xs font-semibold">
              MODULE 3 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Self-Harm
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding self-harm, recognising different forms, responding
            with compassion, providing first aid for injuries, and supporting
            recovery through appropriate services
          </p>
        </header>

        {/* Sensitive Topic Notice */}
        <div className="mb-8 p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
          <div className="flex items-start gap-3">
            <Heart className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-purple-400 mb-1">
                Sensitive Content Notice
              </p>
              <p className="text-sm text-white/80 leading-relaxed">
                This section covers self-harm, which some learners may find
                distressing. The content is presented with care and is designed
                to equip you with the knowledge to help others. If you are
                personally affected by any of the topics discussed, please
                reach out to the{" "}
                <strong className="text-white">Samaritans</strong> on{" "}
                <strong className="text-white">116 123</strong> (free, 24/7)
                or text <strong className="text-white">SHOUT</strong> to{" "}
                <strong className="text-white">85258</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Self-harm:</strong> Deliberate injury to oneself
                &mdash; NOT always a suicide attempt
              </li>
              <li>
                <strong>Response:</strong> Non-judgemental listening, validate
                feelings, use ALGEE
              </li>
              <li>
                <strong>First aid:</strong> Treat injuries, call 999 for
                overdose or deep wounds
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400/90 text-base font-medium mb-2">
              Key Principle
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Do NOT</strong> react with shock, disgust, or anger
              </li>
              <li>
                <strong>Do NOT</strong> insist they stop immediately
              </li>
              <li>
                <strong>DO</strong> ask what they need and encourage professional
                help
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define self-harm and explain why it is not always linked to suicidal intent",
              "Identify the range of self-harming behaviours beyond cutting and burning",
              "Explain the emotional and psychological reasons why people self-harm",
              "Demonstrate a non-judgemental response to a self-harm disclosure using the ALGEE framework",
              "Provide appropriate first aid for self-harm injuries including overdose",
              "Identify appropriate long-term support pathways and professional services",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-purple-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/* Section 01: Understanding Self-Harm                          */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">01</span>
            Understanding Self-Harm
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Self-harm is the deliberate act of injuring oneself. It is
                sometimes called <strong>non-suicidal self-injury (NSSI)</strong>{" "}
                when the intention is not to end one&rsquo;s life. It is
                important to understand from the outset that{" "}
                <strong className="text-purple-400">
                  self-harm is not always a suicide attempt
                </strong>. While self-harm and suicide are related &mdash; and
                people who self-harm are at higher statistical risk of suicide
                &mdash; the motivations behind self-harm are often quite
                different from suicidal intent.
              </p>

              <p>
                For many people, self-harm is a{" "}
                <strong>coping mechanism</strong> for overwhelming emotional
                pain. When feelings become too intense to bear &mdash; grief,
                anxiety, shame, anger, numbness, or trauma &mdash; some
                individuals find that physical pain provides a temporary release
                or sense of control. Understanding this is essential for anyone
                providing Mental Health First Aid, because it shapes how we
                respond.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">Prevalence:</strong>{" "}
                  Research suggests that approximately{" "}
                  <strong>1 in 4 young people</strong> in the UK have
                  self-harmed at some point. However, self-harm is not
                  limited to young people &mdash; it affects{" "}
                  <strong>all ages, genders, and backgrounds</strong>. There is
                  increasing recognition that self-harm in adults, particularly
                  adult males, is significantly under-reported. In the
                  construction industry, where mental health stigma remains
                  high and emotional expression is often discouraged, the
                  true prevalence may be higher than reported figures suggest.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Facts About Self-Harm
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Self-harm is{" "}
                      <strong className="text-white">not attention-seeking</strong>{" "}
                      &mdash; most people who self-harm go to great lengths to
                      hide it. Many feel deep shame about their behaviour
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Self-harm is a <strong className="text-white">sign of
                      emotional distress</strong>, not a character flaw, moral
                      failing, or choice made for drama
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      The UK has one of the{" "}
                      <strong className="text-white">highest rates of
                      self-harm in Europe</strong>, with hospital admissions
                      for self-harm injuries rising in recent years
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Many people who self-harm{" "}
                      <strong className="text-white">never present to
                      hospital</strong> &mdash; they treat their injuries
                      privately, meaning the true scale is much larger than
                      official figures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Recovery is possible</strong>{" "}
                      &mdash; with the right support, people can and do find
                      healthier ways to cope with emotional pain
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Construction Industry Context
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The construction industry has a culture where emotional
                  vulnerability is often stigmatised. Workers may self-harm
                  in private and never disclose it to colleagues or
                  supervisors. As a Mental Health First Aider on site, you
                  may be the first person someone trusts enough to tell.
                  Your response in that moment can make a significant
                  difference to their willingness to seek help.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 02: Types of Self-Harm                               */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">02</span>
            Types of Self-Harm
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When people think of self-harm, they most commonly think of
                cutting. However, the range of self-harming behaviours is{" "}
                <strong>much broader than many people realise</strong>. As a
                Mental Health First Aider, it is important to recognise the
                full spectrum so that you do not overlook signs that someone
                may be hurting themselves.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-400 mb-2">
                    Physical Injury
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Cutting the skin</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Burning (with cigarettes, lighters, heated objects)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Hitting, punching, or banging oneself against surfaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Scratching or pinching the skin severely</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-400 mb-2">
                    Ingestion &amp; Poisoning
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Deliberate overdose of medication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Ingesting harmful substances</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Swallowing objects</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-400 mb-2">
                    Repetitive Behaviours
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Hair pulling (trichotillomania)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Compulsive skin picking (dermatillomania)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Biting the inside of the mouth or lips</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-400 mb-2">
                    Indirect / Behavioural
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Excessive exercise to the point of injury</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Deliberate recklessness (dangerous driving, unsafe behaviour)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Substance misuse used as a form of self-injury</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Deliberate starvation or restriction of food and water</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">Important:</strong>{" "}
                  Some of these behaviours &mdash; such as excessive exercise,
                  substance misuse, or reckless behaviour &mdash; may not be
                  immediately recognised as self-harm by the person doing them,
                  or by those around them. On a construction site, a worker who
                  is deliberately taking unnecessary risks or consistently
                  ignoring safety procedures may be engaging in a form of
                  self-harm. This does not mean every risk-taker is
                  self-harming, but it is worth considering as a possibility,
                  particularly if combined with other signs of emotional
                  distress.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 03: Why People Self-Harm                             */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">03</span>
            Why People Self-Harm
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding <em>why</em> someone self-harms is essential
                for responding with empathy rather than judgement. There is no
                single reason &mdash; people self-harm for many different
                reasons, and an individual may have more than one motivation.
                Each reason is valid and must be taken seriously.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-violet-400" />
                    <p className="text-sm font-medium text-violet-400">
                      Emotional Regulation
                    </p>
                  </div>
                  <p className="text-sm text-white/80">
                    The most commonly reported reason. When emotional pain
                    becomes unbearable, physical pain can provide a temporary
                    release of tension. Some describe it as &ldquo;letting the
                    pressure out&rdquo; or &ldquo;turning emotional pain into
                    something physical that I can deal with.&rdquo; The body
                    also releases endorphins in response to physical injury,
                    which can create a brief period of calm.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-violet-400" />
                    <p className="text-sm font-medium text-violet-400">
                      Communication of Distress
                    </p>
                  </div>
                  <p className="text-sm text-white/80">
                    Some people find it impossible to put their emotional pain
                    into words. Self-harm can be a way of communicating the
                    depth of their suffering when language fails them. This is
                    not &ldquo;attention-seeking&rdquo; &mdash; it is a
                    desperate attempt to make internal pain visible and
                    understood.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-violet-400" />
                    <p className="text-sm font-medium text-violet-400">
                      Self-Punishment
                    </p>
                  </div>
                  <p className="text-sm text-white/80">
                    People who experience intense feelings of guilt, shame, or
                    self-hatred may use self-harm as a way of punishing
                    themselves. This is particularly common in people who have
                    experienced abuse, where they may have internalised a belief
                    that they deserve to be hurt.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <HandHeart className="h-4 w-4 text-violet-400" />
                    <p className="text-sm font-medium text-violet-400">
                      Feeling in Control
                    </p>
                  </div>
                  <p className="text-sm text-white/80">
                    When life feels chaotic and out of control, self-harm can
                    provide a sense of agency. The person controls when, where,
                    and how the pain happens. In environments where individuals
                    feel powerless &mdash; whether due to work stress, financial
                    pressure, relationship breakdown, or other circumstances
                    &mdash; this sense of control can feel important.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-violet-400" />
                    <p className="text-sm font-medium text-violet-400">
                      Feeling &ldquo;Real&rdquo; / Grounding
                    </p>
                  </div>
                  <p className="text-sm text-white/80">
                    Some people experience emotional numbness, dissociation, or
                    a sense of being &ldquo;disconnected&rdquo; from reality.
                    Physical pain can serve as a way to &ldquo;feel
                    something&rdquo; and reconnect with their body and the
                    present moment. This is particularly associated with
                    experiences of trauma or post-traumatic stress disorder.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-violet-400" />
                    <p className="text-sm font-medium text-violet-400">
                      Coping with Trauma or Abuse
                    </p>
                  </div>
                  <p className="text-sm text-white/80">
                    Self-harm is strongly associated with a history of trauma,
                    including childhood abuse, sexual violence, neglect, and
                    bullying. It may develop as a survival mechanism during or
                    after traumatic experiences. Understanding this context is
                    vital for responding with compassion rather than judgement.
                  </p>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Every Reason is Valid:
                  </strong>{" "}
                  As a Mental Health First Aider, you do not need to fully
                  understand <em>why</em> someone is self-harming in order to
                  help them. What matters most is that you accept their
                  experience without judgement, acknowledge their pain as real,
                  and support them towards professional help. Never dismiss or
                  minimise someone&rsquo;s reasons for self-harming.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/* Section 04: How to Respond                                   */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">04</span>
            How to Respond
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                How you respond when someone discloses self-harm can have a
                profound impact on whether they seek help or withdraw further
                into isolation. Your reaction in that moment matters enormously.
                The following principles should guide your response as a Mental
                Health First Aider.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    What NOT to Do
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Do NOT react with shock, horror, or disgust
                      </strong>{" "}
                      &mdash; even if you are shocked, keep your expression and
                      tone calm. An extreme reaction can cause shame and make
                      the person regret telling you
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Do NOT insist they stop immediately
                      </strong>{" "}
                      &mdash; demanding that someone stop self-harming removes
                      their coping mechanism without offering an alternative,
                      which can increase distress and risk
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Do NOT minimise or dismiss
                      </strong>{" "}
                      &mdash; avoid saying things like &ldquo;it could be
                      worse&rdquo;, &ldquo;just think positive&rdquo;, or
                      &ldquo;other people have real problems&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Do NOT make promises you cannot keep
                      </strong>{" "}
                      &mdash; do not promise complete confidentiality if you
                      believe there is a risk to life, as you may need to
                      involve emergency services
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Do NOT try to be their therapist
                      </strong>{" "}
                      &mdash; your role is to provide initial support, not
                      ongoing treatment. Encourage professional help
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  What TO Do &mdash; Non-Judgemental Response
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Stay calm</strong> &mdash;
                      your calm, measured response signals safety. Take a
                      breath before you speak
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Thank them for trusting you
                      </strong>{" "}
                      &mdash; acknowledge the courage it took to disclose.
                      &ldquo;Thank you for telling me. That must have been
                      difficult.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Listen without judgement
                      </strong>{" "}
                      &mdash; give them space to talk at their own pace. Do not
                      interrupt, interrogate, or cross-examine. Use open
                      questions: &ldquo;Can you tell me more about what&rsquo;s
                      been happening?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Validate their feelings
                      </strong>{" "}
                      &mdash; &ldquo;It sounds like you&rsquo;ve been dealing
                      with a lot. Your feelings are completely valid.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Ask what they need
                      </strong>{" "}
                      &mdash; &ldquo;What would be most helpful for you right
                      now?&rdquo; This empowers the person and avoids
                      assumptions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Gently ask about safety
                      </strong>{" "}
                      &mdash; &ldquo;Are you having any thoughts of ending your
                      life?&rdquo; This direct question is important. Asking
                      about suicide does NOT increase risk &mdash; it opens
                      the door for honest conversation
                    </span>
                  </li>
                </ul>
              </div>

              {/* ======================================================== */}
              {/* ALGEE Response Diagram                                    */}
              {/* ======================================================== */}
              <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/30 p-5 sm:p-6 rounded-xl">
                <h3 className="text-base font-semibold text-white mb-1 text-center">
                  MHFA Response to Self-Harm Disclosure
                </h3>
                <p className="text-xs text-white/50 mb-5 text-center">
                  The ALGEE Framework
                </p>

                <div className="space-y-3">
                  {/* Step A */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center">
                      <span className="text-purple-400 font-bold text-sm">A</span>
                    </div>
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-medium text-purple-400 mb-0.5">
                        Approach, Assess &amp; Assist
                      </p>
                      <p className="text-xs text-white/70">
                        Find a private, safe space. Assess any immediate
                        physical injuries. If there is a medical emergency
                        (overdose, deep wound), call 999 first. Check for
                        suicidal thoughts.
                      </p>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className="flex items-center pl-5">
                    <div className="w-px h-3 bg-purple-500/30" />
                  </div>

                  {/* Step L */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center">
                      <span className="text-purple-400 font-bold text-sm">L</span>
                    </div>
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-medium text-purple-400 mb-0.5">
                        Listen Non-Judgementally
                      </p>
                      <p className="text-xs text-white/70">
                        Give your full attention. Let them speak at their own
                        pace. Do not react with shock or try to &ldquo;fix&rdquo;
                        them. Use open questions. Reflect back what you hear.
                        Silence is okay.
                      </p>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className="flex items-center pl-5">
                    <div className="w-px h-3 bg-purple-500/30" />
                  </div>

                  {/* Step G */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center">
                      <span className="text-purple-400 font-bold text-sm">G</span>
                    </div>
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-medium text-purple-400 mb-0.5">
                        Give Reassurance &amp; Information
                      </p>
                      <p className="text-xs text-white/70">
                        &ldquo;You are not alone. Self-harm is more common than
                        you might think, and there is support available.&rdquo;
                        Normalise without minimising. Share that recovery is
                        possible. Do not promise confidentiality you cannot
                        keep.
                      </p>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className="flex items-center pl-5">
                    <div className="w-px h-3 bg-purple-500/30" />
                  </div>

                  {/* Step E1 */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-500/20 border border-violet-400/40 flex items-center justify-center">
                      <span className="text-violet-400 font-bold text-sm">E</span>
                    </div>
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-medium text-violet-400 mb-0.5">
                        Encourage Professional Help
                      </p>
                      <p className="text-xs text-white/70">
                        Suggest speaking with a GP as a first step. Mention
                        NHS crisis services (111, option 2). Offer to help
                        them make the appointment. Provide helpline numbers
                        (Samaritans 116 123, Papyrus 0800 068 4141). Do not
                        force &mdash; plant the seed.
                      </p>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className="flex items-center pl-5">
                    <div className="w-px h-3 bg-purple-500/30" />
                  </div>

                  {/* Step E2 */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-500/20 border border-violet-400/40 flex items-center justify-center">
                      <span className="text-violet-400 font-bold text-sm">E</span>
                    </div>
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-medium text-violet-400 mb-0.5">
                        Encourage Self-Help &amp; Other Supports
                      </p>
                      <p className="text-xs text-white/70">
                        Discuss healthy coping strategies (exercise, talking to
                        trusted friends, creative outlets, mindfulness). Share
                        apps like Calm Harm or Distract. Encourage peer support
                        groups. Follow up &mdash; check in with them in the
                        coming days.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Summary bar */}
                <div className="mt-5 bg-purple-500/20 border border-purple-400/30 rounded-lg p-3 text-center">
                  <p className="text-xs text-white/80">
                    <strong className="text-purple-400">Remember:</strong>{" "}
                    You do not need to have all the answers. Your role is to
                    provide compassionate initial support and bridge the gap
                    to professional help.
                  </p>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Practical First Aid for Injuries:
                  </strong>{" "}
                  If someone has self-harm injuries that need attention,
                  provide physical first aid calmly and without judgement.
                  Treat the wounds as you would any other injury. The person
                  may feel embarrassed &mdash; your matter-of-fact, caring
                  approach to wound care will help reduce their shame.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/* Section 05: First Aid for Self-Harm Injuries                 */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">05</span>
            First Aid for Self-Harm Injuries
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                As a Mental Health First Aider, you may encounter situations
                where someone has self-harm injuries that need physical first
                aid. Treat these injuries with the same care and
                professionalism you would apply to any wound, while being
                mindful of the emotional context.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">
                      Treating Cuts &amp; Lacerations
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Wear <strong className="text-white">nitrile gloves</strong>{" "}
                        before touching any wound
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Clean the wound</strong>{" "}
                        gently under running tap water
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Apply pressure</strong>{" "}
                        with a clean sterile pad to stop bleeding
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Apply an appropriate{" "}
                        <strong className="text-white">sterile dressing</strong>{" "}
                        once bleeding is controlled
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        For minor cuts, wound closure strips may be appropriate
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Advise the person to see a GP if the wound shows
                        signs of infection (redness, swelling, warmth, pus)
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">
                      When to Call 999
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Deep wounds</strong>{" "}
                        that will not stop bleeding, or wounds that expose
                        muscle, fat, or bone
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Overdose</strong> of any
                        medication or substance &mdash; even if the person
                        appears well
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Unconsciousness</strong>{" "}
                        or reduced level of consciousness
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Difficulty breathing</strong>{" "}
                        or any signs of anaphylaxis
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        The person expresses{" "}
                        <strong className="text-white">suicidal intent</strong>{" "}
                        or has a plan to end their life
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Burns</strong> that are
                        larger than the person&rsquo;s hand or on the face,
                        hands, feet, or joints
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Poisoning &amp; Overdose Response
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Call 999 immediately</strong>{" "}
                      &mdash; do not wait for symptoms to appear
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Do NOT induce vomiting
                      </strong>{" "}
                      &mdash; this can cause additional harm, particularly with
                      corrosive substances
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Keep the packaging</strong>{" "}
                      &mdash; save any containers, packaging, or remaining
                      tablets to give to paramedics. Note the time of
                      ingestion and the estimated amount taken
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      If the person becomes{" "}
                      <strong className="text-white">unconscious but
                      breathing</strong>, place them in the{" "}
                      <strong className="text-white">recovery position</strong>{" "}
                      to protect their airway
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      If the person stops breathing, begin{" "}
                      <strong className="text-white">CPR</strong> and continue
                      until paramedics arrive
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Stay with the person
                      </strong>{" "}
                      at all times &mdash; do not leave them alone
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    A Note on Tone:
                  </strong>{" "}
                  When providing first aid for self-harm injuries, be calm,
                  gentle, and matter-of-fact. Avoid making comments about the
                  injuries themselves (such as &ldquo;why would you do this to
                  yourself?&rdquo;). Focus on treating the wound and ensuring
                  the person&rsquo;s physical safety. Your compassionate,
                  non-judgemental approach to their injuries is itself a form
                  of mental health support &mdash; it demonstrates that they
                  are worthy of care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 06: Long-Term Support                                */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">06</span>
            Long-Term Support
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mental Health First Aid is initial support &mdash; the first
                response, not the ongoing treatment. Once you have provided
                immediate support, it is important to guide the person towards
                professional services that can provide the sustained help they
                need. The following pathways are available in the UK.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-400 mb-1">
                    GP Referral
                  </p>
                  <p className="text-sm text-white/80">
                    A GP appointment is the recommended first step for
                    accessing mental health support on the NHS. The GP can
                    assess the person, provide initial treatment, and refer to
                    specialist services. They can also prescribe medication if
                    appropriate and arrange urgent psychiatric assessment if
                    needed. Encourage the person to be honest with their GP
                    about the self-harm &mdash; GPs are trained to respond
                    sensitively.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-400 mb-1">
                    NHS Crisis Services
                  </p>
                  <p className="text-sm text-white/80">
                    For urgent mental health crises, NHS 111 (press option 2
                    for mental health crisis) provides 24/7 access to local
                    crisis teams. Many areas also have crisis cafes, safe
                    spaces, and crisis houses where people can go for immediate
                    support without needing a hospital admission. A&amp;E
                    departments also have mental health liaison teams available
                    around the clock for people in acute crisis.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-400 mb-1">
                    NICE Guidelines for Self-Harm
                  </p>
                  <p className="text-sm text-white/80">
                    The National Institute for Health and Care Excellence (NICE)
                    publishes clinical guidelines for the assessment and
                    management of self-harm. Key recommendations include:
                    treating all self-harm episodes with the same care as any
                    other medical condition; conducting a psychosocial
                    assessment before discharge from hospital; offering
                    therapeutic interventions tailored to the individual; and
                    involving the person in decisions about their care. NICE
                    emphasises that people who self-harm must be treated with
                    compassion, dignity, and respect at every stage.
                  </p>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-400 mb-2">
                    Talking Therapies
                  </p>
                  <p className="text-sm text-white/80 mb-3">
                    Several evidence-based talking therapies are effective for
                    self-harm. They can be accessed via GP referral, NHS
                    self-referral (IAPT / Talking Therapies), or privately.
                  </p>
                  <div className="space-y-2">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-sm font-medium text-violet-400 mb-0.5">
                        Dialectical Behaviour Therapy (DBT)
                      </p>
                      <p className="text-xs text-white/70">
                        Specifically designed for emotional dysregulation and
                        self-harm. Teaches four core skill sets: mindfulness,
                        distress tolerance, emotional regulation, and
                        interpersonal effectiveness. Recommended by NICE as
                        particularly effective for reducing self-harming
                        behaviour.
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-sm font-medium text-violet-400 mb-0.5">
                        Cognitive Behavioural Therapy (CBT)
                      </p>
                      <p className="text-xs text-white/70">
                        Helps identify and change unhelpful thought patterns
                        and behaviours. Widely available through NHS Talking
                        Therapies (formerly IAPT). Self-referral is possible
                        in most areas without needing a GP appointment.
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-sm font-medium text-violet-400 mb-0.5">
                        Mentalisation-Based Therapy (MBT)
                      </p>
                      <p className="text-xs text-white/70">
                        Focuses on helping the person understand their own
                        thoughts, feelings, and motivations, and those of
                        others. Particularly effective for people whose
                        self-harm is linked to relationship difficulties or
                        borderline personality disorder.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-400 mb-1">
                    Harm Minimisation Approach
                  </p>
                  <p className="text-sm text-white/80">
                    Harm minimisation (or harm reduction) is an approach that
                    acknowledges recovery from self-harm is a process, not
                    an overnight change. Rather than demanding immediate
                    abstinence, it focuses on reducing the physical risk
                    associated with self-harm while the person works towards
                    recovery. This may include wound care education, safer
                    alternatives during moments of crisis (such as holding ice
                    cubes, snapping a rubber band, or drawing on the skin with
                    a red pen), and developing a personal safety plan. This
                    approach is supported by several NHS services and
                    charities.
                  </p>
                </div>
              </div>

              {/* Helplines Box */}
              <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/30 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="h-5 w-5 text-purple-400" />
                  <h3 className="text-base font-semibold text-white">
                    Key Helplines &amp; Services
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white">Samaritans</p>
                    <p className="text-xs text-purple-400 font-semibold">116 123</p>
                    <p className="text-xs text-white/60 mt-0.5">
                      Free, 24/7, for anyone in distress. All ages.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white">
                      Papyrus HOPELINEUK
                    </p>
                    <p className="text-xs text-purple-400 font-semibold">
                      0800 068 4141
                    </p>
                    <p className="text-xs text-white/60 mt-0.5">
                      For under-35s experiencing thoughts of self-harm or
                      suicide, and anyone concerned about a young person.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white">
                      Childline
                    </p>
                    <p className="text-xs text-purple-400 font-semibold">
                      0800 1111
                    </p>
                    <p className="text-xs text-white/60 mt-0.5">
                      Free, confidential, for under-19s. Available 24/7.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white">
                      NHS Crisis Line
                    </p>
                    <p className="text-xs text-purple-400 font-semibold">
                      111 (option 2)
                    </p>
                    <p className="text-xs text-white/60 mt-0.5">
                      24/7 mental health crisis support. Connects to local
                      crisis team.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white">
                      SHOUT Crisis Text Line
                    </p>
                    <p className="text-xs text-purple-400 font-semibold">
                      Text SHOUT to 85258
                    </p>
                    <p className="text-xs text-white/60 mt-0.5">
                      Free, confidential, 24/7 text-based support for anyone
                      in crisis.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white">
                      Self-Injury Support
                    </p>
                    <p className="text-xs text-purple-400 font-semibold">
                      selfinjurysupport.org.uk
                    </p>
                    <p className="text-xs text-white/60 mt-0.5">
                      Specialist support for women and girls affected by
                      self-harm. Online resources, text line, and webchat.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Supporting Recovery Without Enabling:
                  </strong>{" "}
                  Supporting someone who self-harms means being consistent,
                  compassionate, and patient. It does{" "}
                  <strong>not</strong> mean taking responsibility for their
                  behaviour, covering for them, or becoming their sole source
                  of support. Maintain your own boundaries, look after your own
                  wellbeing, and encourage the person towards professional
                  services. Recovery from self-harm takes time &mdash; setbacks
                  are normal and do not mean that treatment has failed.
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Looking After Yourself
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Supporting someone who self-harms can be emotionally
                  demanding. It is normal to feel worried, helpless, or
                  distressed yourself. Make sure you access support for your
                  own wellbeing &mdash; talk to a colleague you trust, speak
                  with your own GP, or use one of the helplines listed above.
                  You cannot pour from an empty cup. As a Mental Health First
                  Aider, looking after yourself is not optional &mdash; it is
                  essential.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/* FAQ Section                                                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* Quiz                                                         */}
        {/* ============================================================ */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* ============================================================ */}
        {/* Bottom Navigation                                            */}
        {/* ============================================================ */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-purple-500 text-white hover:bg-purple-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-3-section-3">
              Next: Suicide Awareness &amp; Prevention
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
