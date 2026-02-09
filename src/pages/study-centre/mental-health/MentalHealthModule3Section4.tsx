import {
  ArrowLeft,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  Phone,
  Heart,
  Users,
  MessageCircle,
  HandHeart,
  HeartHandshake,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-m3s4-asking-about-suicide",
    question:
      "A colleague has been withdrawn and made comments about 'not being around much longer'. You are concerned they may be suicidal. What is the best way to approach the conversation?",
    options: [
      "Avoid mentioning suicide directly — use phrases like 'doing something silly' so you don't upset them",
      "Wait until they bring it up themselves, as asking might plant the idea in their head",
      "Ask directly and calmly: 'Are you thinking about suicide?' — research shows direct questions save lives and do not increase risk",
      "Tell them to cheer up and remind them things could be worse",
    ],
    correctIndex: 2,
    explanation:
      "Research consistently shows that asking someone directly about suicide does NOT increase the risk of suicidal behaviour. In fact, asking directly gives the person permission to talk openly about what they are experiencing. Using euphemisms like 'doing something silly' minimises the seriousness of their feelings and can make it harder for them to be honest. Direct, compassionate questioning is a cornerstone of suicide first aid.",
  },
  {
    id: "mh-m3s4-tasc-model",
    question:
      "You are using the TASC model to support a colleague you believe may be suicidal. You have told them you are concerned and asked them directly about suicide. They confirm they have been having suicidal thoughts. What is the next step in the TASC model?",
    options: [
      "Call 999 immediately",
      "Leave them alone to process their feelings",
      "Help them create a safety plan — identifying warning signs, coping strategies, and people they can contact",
      "Tell their manager so the company can take action",
    ],
    correctIndex: 2,
    explanation:
      "The TASC model follows the sequence: Tell (express your concern), Ask (ask directly about suicide), Safety plan (help them create a safety plan), Call (call for professional support if needed). After asking and confirming suicidal thoughts, the next step is to collaborate with the person on a safety plan. This empowers them to identify their own warning signs, coping strategies, and support contacts. Calling for professional help is the final step, not the immediate next one — unless they are in immediate danger.",
  },
  {
    id: "mh-m3s4-when-to-call-999",
    question:
      "Which of the following scenarios requires an immediate 999 call rather than other crisis support options?",
    options: [
      "A colleague says they have been feeling low and occasionally thinks life isn't worth living",
      "A colleague has taken an overdose of tablets 20 minutes ago and is becoming drowsy",
      "A colleague mentions they spoke to the Samaritans last night and felt better",
      "A colleague asks you for the number of a counselling service",
    ],
    correctIndex: 1,
    explanation:
      "An active suicide attempt — in this case, an overdose with the person becoming drowsy — requires an immediate 999 call. This is a medical emergency where the person's life is in immediate danger. The other scenarios, while they all warrant attention and care, do not require emergency services. A person expressing occasional passive thoughts, someone who has already accessed support, or someone requesting counselling information can be supported through other channels such as helplines, safety planning, or referral to mental health services.",
  },
];

const faqs = [
  {
    question:
      "Will asking someone about suicide put the idea in their head?",
    answer:
      "No. This is one of the most persistent and dangerous myths about suicide. Decades of research from institutions including the World Health Organisation, the National Institute for Health and Care Excellence (NICE), and the Samaritans all confirm that asking someone about suicide does not increase the risk of suicidal ideation or suicidal behaviour. In fact, the opposite is true — asking directly gives the person permission to talk about what they are experiencing, which often brings relief. Many people who are suicidal feel isolated by their thoughts, and a direct, compassionate question can be the first step toward getting help.",
  },
  {
    question:
      "What should I do if someone discloses suicidal thoughts but asks me not to tell anyone?",
    answer:
      "This is a challenging situation, but your priority must always be keeping the person safe. Be honest with them — explain that you care about them and that their safety comes first. You might say: 'I hear you, and I understand you want to keep this private. But because I care about you, I can't promise to keep this completely between us if I believe your life is at risk.' Where possible, involve them in decisions about who to tell and what support to access. Encourage them to contact a helpline (such as Samaritans on 116 123) or their GP. If they are in immediate danger, you must call 999 regardless of their wishes — a person's life always takes priority over confidentiality.",
  },
  {
    question:
      "I supported someone through a suicidal crisis and now I can't stop thinking about it. Is this normal?",
    answer:
      "Absolutely. Supporting someone through a suicidal crisis is one of the most emotionally demanding things a person can do. It is entirely normal to experience a range of reactions afterwards, including anxiety, difficulty sleeping, replaying the conversation, feeling emotionally drained, guilt (wondering if you did enough), or even anger. These responses are signs that you are a compassionate human being, not signs of weakness. Seek debriefing from a supervisor, mentor, or mental health professional. Talk to someone you trust. Do not bottle it up. Organisations like the Samaritans (116 123) are available for anyone who needs to talk — including people who have been supporting others.",
  },
  {
    question:
      "How is a safety plan different from a crisis plan or a no-suicide contract?",
    answer:
      "A safety plan is a collaborative, evidence-based tool developed with the person at risk. It follows a stepped approach — starting with personal coping strategies and escalating through social contacts, professional resources, and environmental safety measures. It is practical, personalised, and empowers the person to take action during a crisis. A 'no-suicide contract' (where a person promises not to attempt suicide) is NOT recommended — research shows these contracts do not reduce suicide risk and can actually discourage people from being honest about their feelings. A safety plan is fundamentally different because it provides practical, actionable steps rather than relying on a promise.",
  },
  {
    question:
      "What if I try to help someone and say the wrong thing?",
    answer:
      "The most important thing is that you are there and that you care. There is no perfect script for supporting someone in a suicidal crisis. What matters most is showing genuine concern, listening without judgement, and being willing to stay with the person. Even if your words are imperfect, the act of asking, listening, and being present communicates that you care and that they are not alone. The biggest risk is not saying the wrong thing — it is saying nothing at all. If you are unsure what to say, simple statements like 'I'm here for you', 'You don't have to go through this alone', and 'Let's get some help together' are powerful.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following is the correct way to ask someone if they are thinking about suicide?",
    options: [
      "'You're not thinking of doing anything silly, are you?'",
      "'Are you thinking about suicide?'",
      "'You wouldn't do anything stupid, would you?'",
      "'You don't want to hurt yourself, do you?'",
    ],
    correctAnswer: 1,
    explanation:
      "The correct approach is to use direct, clear language: 'Are you thinking about suicide?' or 'Are you having thoughts of ending your life?' Using euphemisms like 'doing something silly' or 'doing anything stupid' minimises the person's experience, implies judgement, and makes it harder for them to respond honestly. Phrasing the question as a negative ('You wouldn't...', 'You don't...') leads the person toward saying 'no' even when the answer is 'yes'. Direct language shows you take them seriously and gives them permission to be honest.",
  },
  {
    id: 2,
    question:
      "What does the 'T' stand for in the TASC model of suicide first aid?",
    options: [
      "Time — take time to assess the situation",
      "Tell — tell the person you are concerned about them",
      "Talk — talk to a professional before approaching the person",
      "Triage — determine the level of risk",
    ],
    correctAnswer: 1,
    explanation:
      "In the TASC model, 'T' stands for Tell — tell the person you are concerned about them. This is the first step: expressing your genuine concern in a non-judgemental way. For example: 'I've noticed you've been very quiet lately and I'm worried about you.' This opens the door to a conversation and shows the person that someone has noticed and cares. The full model is: Tell, Ask, Safety plan, Call.",
  },
  {
    id: 3,
    question:
      "A safety plan typically includes six key components. Which of the following is NOT one of them?",
    options: [
      "Warning signs that a crisis may be developing",
      "A written promise not to attempt suicide",
      "Internal coping strategies the person can use alone",
      "Professional contacts who can help in a crisis",
    ],
    correctAnswer: 1,
    explanation:
      "A written promise not to attempt suicide (a 'no-suicide contract') is NOT a component of an evidence-based safety plan. Research shows that no-suicide contracts do not reduce risk and can actually discourage people from being honest about their feelings. The six components of a safety plan are: (1) warning signs, (2) internal coping strategies, (3) people and social settings that provide distraction, (4) people to contact for help, (5) professionals and agencies to contact in crisis, and (6) making the environment safe (reducing access to means).",
  },
  {
    id: 4,
    question:
      "Which of the following scenarios would require an immediate 999 call?",
    options: [
      "A colleague says they have been feeling depressed for several weeks",
      "A colleague tells you they have a plan to jump from a building and have gone to the roof",
      "A colleague mentions they saw their GP last week about low mood",
      "A colleague says they sometimes wish they could go to sleep and not wake up",
    ],
    correctAnswer: 1,
    explanation:
      "A person who has a specific plan, has access to the means, and is actively moving toward carrying out their plan (in this case, going to the roof) is in immediate danger. This requires an immediate 999 call. The other scenarios all warrant care and concern, but they represent lower levels of immediate risk. A person expressing passive thoughts ('wish I could go to sleep and not wake up') needs support and monitoring, but is not in the same level of immediate danger as someone actively preparing to act.",
  },
  {
    id: 5,
    question:
      "What is the Samaritans' phone number and when are they available?",
    options: [
      "0800 58 58 58 — available 5pm to midnight",
      "116 123 — available 24 hours a day, 7 days a week, free to call",
      "0345 605 1956 — available Monday to Friday, 9am to 5pm",
      "0800 068 4141 — available 9am to midnight",
    ],
    correctAnswer: 1,
    explanation:
      "The Samaritans can be reached on 116 123. The line is free to call from any phone and is available 24 hours a day, 7 days a week, 365 days a year. Samaritans provide confidential emotional support for anyone experiencing feelings of distress, despair, or suicidal thoughts. You do not have to be suicidal to call — they are there for anyone who needs to talk. The other numbers listed are: CALM (0800 58 58 58, 5pm–midnight), Lighthouse Club (0345 605 1956), and Papyrus HOPELINEUK (0800 068 4141).",
  },
  {
    id: 6,
    question:
      "When calling 999 for a person who is suicidal, what key information should you provide to the operator?",
    options: [
      "Only the person's name — they will find the rest",
      "Your location, the nature of the emergency, whether the person has made an attempt, whether they have access to means, and whether they are conscious and breathing",
      "The person's full medical history and GP details",
      "Only the location — the operator will ask no further questions",
    ],
    correctAnswer: 1,
    explanation:
      "When calling 999, you should provide: your exact location (including postcode if possible), the nature of the emergency (a person is suicidal or has made a suicide attempt), whether an attempt has been made and what method was used, whether the person has access to means of harm, and the person's current state (conscious, breathing, responsive). This information helps the ambulance service prioritise the call and send the right resources. Stay on the line — the operator will guide you through what to do while help is on the way.",
  },
  {
    id: 7,
    question:
      "Which helpline is specifically designed for people under 35 who are experiencing suicidal thoughts?",
    options: [
      "Samaritans (116 123)",
      "CALM — Campaign Against Living Miserably (0800 58 58 58)",
      "Papyrus HOPELINEUK (0800 068 4141)",
      "SHOUT (text 85258)",
    ],
    correctAnswer: 2,
    explanation:
      "Papyrus HOPELINEUK (0800 068 4141) is specifically designed for people under 35 who are experiencing thoughts of suicide, and for anyone concerned about a young person. They provide practical advice, support, and information. They can be contacted by phone, text (07860 039967), or email (pat@papyrus-uk.org). While all the helplines listed provide valuable crisis support, Papyrus is the only one with a specific focus on young people.",
  },
  {
    id: 8,
    question:
      "After supporting a colleague through a suicidal crisis, which of the following is the most important thing for the first aider to do?",
    options: [
      "Immediately return to normal duties and try not to think about it",
      "Post about the experience on social media to raise awareness",
      "Seek debriefing or supervision, talk to someone they trust, and actively look after their own wellbeing",
      "Avoid the colleague in future to prevent re-traumatising them",
    ],
    correctAnswer: 2,
    explanation:
      "Supporting someone through a suicidal crisis is emotionally demanding, and the first aider must actively look after their own wellbeing afterwards. This includes seeking debriefing or supervision from a manager, mental health lead, or professional; talking to someone they trust about how they feel (without breaching the person's confidentiality); and practising self-care. Trying to suppress or ignore the experience can lead to burnout, compassion fatigue, or secondary traumatic stress. Posting on social media would breach confidentiality, and avoiding the colleague could damage the relationship and leave them feeling abandoned.",
  },
];

export default function MentalHealthModule3Section4() {
  useSEO({
    title: "Suicide First Aid & Crisis Response | Mental Health Module 3.4",
    description:
      "How to ask about suicide, the TASC model, safety planning, when to call 999, key helplines and resources, and post-crisis support for mental health first aiders.",
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
            <ShieldAlert className="h-7 w-7 text-purple-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 mx-auto">
            <span className="text-purple-400 text-xs font-semibold">
              MODULE 3 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Suicide First Aid &amp; Crisis Response
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Practical skills for asking about suicide, using the TASC model,
            creating safety plans, knowing when to call 999, key UK helplines,
            and looking after yourself as a mental health first aider
          </p>
        </header>

        {/* Sensitive Content Notice */}
        <div className="mb-8 p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
          <div className="flex items-start gap-3">
            <Heart className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-purple-400 mb-1">
                Before You Begin
              </p>
              <p className="text-sm text-white/80">
                This section covers suicide and crisis response. The content is
                sensitive but essential for anyone in a mental health first aider
                role. If you are personally affected by any of the topics
                discussed, the Samaritans are available 24/7 on{" "}
                <strong className="text-white">116 123</strong> (free to call).
                You can also text SHOUT to{" "}
                <strong className="text-white">85258</strong>. Take breaks as
                needed.
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
                <strong>Ask directly:</strong> &ldquo;Are you thinking about
                suicide?&rdquo; &mdash; this saves lives
              </li>
              <li>
                <strong>TASC model:</strong> Tell, Ask, Safety plan, Call
              </li>
              <li>
                <strong>999:</strong> Active attempt, means + intent, or loss
                of consciousness
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400/90 text-base font-medium mb-2">
              Key Numbers
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Samaritans:</strong> 116 123 (24/7, free)
              </li>
              <li>
                <strong>SHOUT:</strong> Text 85258
              </li>
              <li>
                <strong>Lighthouse Club:</strong> 0345 605 1956
                (construction)
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
              "Explain why asking directly about suicide is safe and saves lives",
              "Apply the TASC model to a suicide first aid conversation",
              "Describe the six steps of a collaborative safety plan",
              "Identify situations that require an immediate 999 call",
              "Name the key UK helplines and construction-specific resources",
              "Recognise the impact of crisis support on the first aider and describe self-care strategies",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-purple-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: How to Ask About Suicide */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">01</span>
            How to Ask About Suicide
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most powerful things you can do as a mental health
                first aider is to ask someone directly if they are thinking
                about suicide. For many people, this feels terrifying &mdash;
                you may worry about making things worse, saying the wrong thing,
                or &ldquo;planting the idea&rdquo; in someone&rsquo;s head. But
                decades of research have consistently shown that{" "}
                <strong>
                  asking about suicide does not increase the risk of suicidal
                  behaviour
                </strong>
                . In fact, it often has the opposite effect &mdash; it brings
                relief, reduces isolation, and opens the door to getting help.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">
                  What the Research Says
                </p>
                <p className="text-sm text-white/80 mb-3">
                  A systematic review published in the{" "}
                  <em>British Journal of Psychiatry</em> examined whether
                  asking about suicide increases suicidal ideation. The
                  conclusion was unequivocal: there is{" "}
                  <strong className="text-white">no evidence</strong> that
                  asking about suicide causes or worsens suicidal thoughts.
                  The World Health Organisation, NICE, the Samaritans, and
                  every major mental health organisation in the UK support
                  direct questioning as a safe and effective intervention.
                </p>
                <p className="text-sm text-white/80">
                  Many people who are suicidal describe feeling{" "}
                  <strong className="text-white">relieved</strong> when someone
                  finally asks. The thoughts have been building in silence, and
                  a direct question communicates: &ldquo;I see you. I take this
                  seriously. You can talk to me.&rdquo;
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-white">
                    How to Phrase the Question
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Use clear, direct language. Do not use euphemisms. The goal
                  is to be unambiguous so the person knows exactly what you
                  are asking.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-2">
                      Direct Language (Use These)
                    </p>
                    <ul className="text-xs text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>
                          &ldquo;Are you thinking about suicide?&rdquo;
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>
                          &ldquo;Are you having thoughts of ending your
                          life?&rdquo;
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>
                          &ldquo;Are you thinking about killing
                          yourself?&rdquo;
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>
                          &ldquo;Sometimes when people feel like this, they
                          think about suicide. Is that happening for
                          you?&rdquo;
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-2">
                      Euphemisms (Avoid These)
                    </p>
                    <ul className="text-xs text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          &ldquo;You&rsquo;re not thinking of doing anything
                          silly, are you?&rdquo;
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          &ldquo;You wouldn&rsquo;t do anything stupid, would
                          you?&rdquo;
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          &ldquo;You don&rsquo;t want to hurt yourself, do
                          you?&rdquo;
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          &ldquo;You&rsquo;re not thinking of checking out, are
                          you?&rdquo;
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Euphemisms are problematic for several reasons. They{" "}
                <strong>minimise</strong> the seriousness of the
                person&rsquo;s experience (&ldquo;silly&rdquo; and
                &ldquo;stupid&rdquo; carry judgement). They are{" "}
                <strong>ambiguous</strong> &mdash; the person may not realise
                you are actually asking about suicide. And they{" "}
                <strong>lead the answer</strong> &mdash; phrasing a question
                as &ldquo;You wouldn&rsquo;t... would you?&rdquo; pressures
                the person to say &ldquo;no&rdquo; even when the answer is
                &ldquo;yes&rdquo;.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Overcoming Your Own Fear of Asking
                </p>
                <p className="text-sm text-white/80 mb-3">
                  It is entirely normal to feel anxious about asking someone
                  about suicide. You might worry about:
                </p>
                <ul className="text-sm text-white/80 space-y-1.5 mb-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Making things worse (you won&rsquo;t &mdash; research
                      confirms this)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Not knowing what to say if they answer
                      &ldquo;yes&rdquo; (listen, stay calm, follow TASC)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Getting it wrong (an imperfect question asked with care
                      is infinitely better than silence)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Being responsible for the outcome (you are not &mdash;
                      your role is to support, not to fix)
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white/80">
                  Remember: the biggest risk is{" "}
                  <strong className="text-white">not asking at all</strong>.
                  A person who is suicidal and feels that nobody has noticed
                  or cares is in a far more dangerous position than someone
                  who has been asked directly and given the chance to talk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The TASC Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">02</span>
            The TASC Model
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>TASC model</strong> provides a clear, memorable
                framework for responding when you believe someone may be
                suicidal. It gives you a structured sequence of steps so that
                even under pressure, you know what to do next. TASC stands
                for: <strong>Tell</strong>, <strong>Ask</strong>,{" "}
                <strong>Safety plan</strong>, <strong>Call</strong>.
              </p>

              {/* TASC Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-semibold text-purple-300 text-center mb-6">
                  The TASC Model &mdash; Four Steps
                </p>
                <div className="grid sm:grid-cols-4 gap-4">
                  <div className="relative bg-purple-500/15 border border-purple-500/40 rounded-xl p-4 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/30 border-2 border-purple-400/60 mb-3">
                      <span className="text-purple-300 text-xl font-bold">
                        T
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-purple-300 mb-1">
                      Tell
                    </p>
                    <p className="text-xs text-white/70">
                      Tell the person you are concerned about them. Express
                      genuine care without judgement.
                    </p>
                    <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-purple-400/50 text-lg">
                      &rarr;
                    </div>
                  </div>
                  <div className="relative bg-violet-500/15 border border-violet-500/40 rounded-xl p-4 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet-500/30 border-2 border-violet-400/60 mb-3">
                      <span className="text-violet-300 text-xl font-bold">
                        A
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-violet-300 mb-1">
                      Ask
                    </p>
                    <p className="text-xs text-white/70">
                      Ask directly about suicide. Use clear, unambiguous
                      language. Listen to the response.
                    </p>
                    <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-violet-400/50 text-lg">
                      &rarr;
                    </div>
                  </div>
                  <div className="relative bg-purple-500/15 border border-purple-500/40 rounded-xl p-4 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/30 border-2 border-purple-400/60 mb-3">
                      <span className="text-purple-300 text-xl font-bold">
                        S
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-purple-300 mb-1">
                      Safety Plan
                    </p>
                    <p className="text-xs text-white/70">
                      Help them create a safety plan with coping strategies,
                      contacts, and reasons for living.
                    </p>
                    <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-purple-400/50 text-lg">
                      &rarr;
                    </div>
                  </div>
                  <div className="bg-violet-500/15 border border-violet-500/40 rounded-xl p-4 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet-500/30 border-2 border-violet-400/60 mb-3">
                      <span className="text-violet-300 text-xl font-bold">
                        C
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-violet-300 mb-1">
                      Call
                    </p>
                    <p className="text-xs text-white/70">
                      Call for support &mdash; a helpline, GP, mental health
                      service, or 999 if in immediate danger.
                    </p>
                  </div>
                </div>
              </div>

              {/* TASC Detailed Steps */}
              <div className="space-y-4">
                {/* T - Tell */}
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/30 text-purple-300 font-bold text-sm flex-shrink-0">
                      T
                    </span>
                    <p className="text-sm font-medium text-purple-400">
                      Tell &mdash; Express Your Concern
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-3">
                    Start by telling the person you have noticed something and
                    that you are worried about them. Be specific about what you
                    have observed &mdash; this shows you are paying attention
                    and that your concern is genuine.
                  </p>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-purple-300 mb-2">
                      Example Phrases
                    </p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>
                        &ldquo;I&rsquo;ve noticed you&rsquo;ve been very quiet
                        lately and I&rsquo;m worried about you.&rdquo;
                      </li>
                      <li>
                        &ldquo;You mentioned feeling like a burden last week,
                        and I haven&rsquo;t stopped thinking about it.&rdquo;
                      </li>
                      <li>
                        &ldquo;I can see you&rsquo;re going through a really
                        tough time. I want to check in with you.&rdquo;
                      </li>
                    </ul>
                  </div>
                </div>

                {/* A - Ask */}
                <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/30 text-violet-300 font-bold text-sm flex-shrink-0">
                      A
                    </span>
                    <p className="text-sm font-medium text-violet-400">
                      Ask &mdash; Ask Directly About Suicide
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-3">
                    Ask the question directly. Use the word
                    &ldquo;suicide&rdquo;. Do not beat around the bush. If
                    they say yes, stay calm, listen without judgement, and
                    thank them for telling you. Do not panic, do not
                    immediately try to &ldquo;fix&rdquo; things, and do not
                    minimise what they are feeling.
                  </p>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-violet-300 mb-2">
                      If They Say Yes
                    </p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>
                        Stay calm &mdash; your calmness will help them feel
                        safer
                      </li>
                      <li>
                        &ldquo;Thank you for telling me. That must have been
                        really hard to say.&rdquo;
                      </li>
                      <li>
                        &ldquo;I&rsquo;m glad you told me. You don&rsquo;t have
                        to go through this alone.&rdquo;
                      </li>
                      <li>
                        Listen. Do not rush to solutions. Let them talk.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* S - Safety Plan */}
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/30 text-purple-300 font-bold text-sm flex-shrink-0">
                      S
                    </span>
                    <p className="text-sm font-medium text-purple-400">
                      Safety Plan &mdash; Help Create a Safety Plan
                    </p>
                  </div>
                  <p className="text-sm text-white/80">
                    Work with the person to create a safety plan (covered in
                    detail in Section 03 below). This is a collaborative
                    process &mdash; you are helping them identify their own
                    resources, not telling them what to do. The safety plan
                    gives them practical steps they can take when suicidal
                    thoughts return.
                  </p>
                </div>

                {/* C - Call */}
                <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/30 text-violet-300 font-bold text-sm flex-shrink-0">
                      C
                    </span>
                    <p className="text-sm font-medium text-violet-400">
                      Call &mdash; Call for Support
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-3">
                    Connect the person with professional support. This could
                    be a helpline, their GP, a mental health service, or
                    &mdash; if they are in immediate danger &mdash; 999. Where
                    possible, help them make the call rather than just giving
                    them a number. Offer to sit with them while they call, or
                    ask permission to call on their behalf.
                  </p>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-violet-300 mb-2">
                      Connecting to Support
                    </p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>
                        &ldquo;Would you like me to sit with you while you call
                        the Samaritans?&rdquo;
                      </li>
                      <li>
                        &ldquo;Can I help you make an appointment with your
                        GP?&rdquo;
                      </li>
                      <li>
                        &ldquo;I think we should call 999 together &mdash;
                        I&rsquo;ll stay right here with you.&rdquo;
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Safety Planning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">03</span>
            Safety Planning
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>safety plan</strong> is a personalised, written
                document that a person at risk of suicide creates
                collaboratively with support from a trained helper. It
                identifies warning signs, coping strategies, and resources
                that the person can use when suicidal thoughts return. Unlike
                a &ldquo;no-suicide contract&rdquo; (which research has shown
                to be ineffective), a safety plan is a practical,
                evidence-based tool that empowers the person to take specific
                actions during a crisis.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">
                  Why Safety Plans Work
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      They are created <strong className="text-white">with</strong>{" "}
                      the person, not <strong className="text-white">for</strong>{" "}
                      them &mdash; this builds ownership and agency
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      They provide concrete, actionable steps for a moment of
                      crisis when thinking clearly is difficult
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      They follow a stepped approach, starting with self-help
                      and escalating to professional support
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Research published in <em>JAMA Psychiatry</em> shows that
                      safety planning reduces suicide attempts by approximately
                      43%
                    </span>
                  </li>
                </ul>
              </div>

              {/* The 6 Steps */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-semibold text-white mb-4">
                  The Six Steps of a Safety Plan
                </p>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Warning Signs",
                      desc: "Help the person identify the thoughts, feelings, images, moods, situations, or behaviours that signal a crisis may be developing. These are personal and unique to each individual. Examples: 'When I start thinking everyone would be better off without me', 'When I can't sleep for more than two nights in a row', 'When I start drinking alone after work'.",
                    },
                    {
                      step: "2",
                      title: "Internal Coping Strategies",
                      desc: "Identify things the person can do on their own, without contacting anyone, to take their mind off their problems or resist suicidal urges. These are distraction and self-soothing techniques. Examples: going for a walk, exercising, listening to music, taking a shower, deep breathing, playing with a pet, watching a favourite film.",
                    },
                    {
                      step: "3",
                      title: "People and Social Settings That Provide Distraction",
                      desc: "List people the person can contact or places they can go for social interaction and distraction — without necessarily discussing the crisis. The purpose is to break isolation. Examples: visiting a friend, going to a coffee shop, calling a family member to chat about everyday things, going to the gym.",
                    },
                    {
                      step: "4",
                      title: "People to Contact for Help",
                      desc: "Identify specific people the person trusts enough to tell they are in crisis and ask for help. Include their names, phone numbers, and when they are usually available. This is different from Step 3 — here, the person would actually disclose that they are struggling.",
                    },
                    {
                      step: "5",
                      title: "Professionals and Agencies to Contact in Crisis",
                      desc: "List professional resources: GP, mental health crisis team, Samaritans (116 123), SHOUT (text 85258), CALM (0800 58 58 58), NHS 111 (option 2), A&E, 999. Include phone numbers and opening hours. If the person has a care coordinator or therapist, include their details.",
                    },
                    {
                      step: "6",
                      title: "Making the Environment Safe",
                      desc: "Collaboratively discuss reducing access to means of self-harm. This might include asking a trusted person to hold medication, removing sharp objects, avoiding bridges or heights, or locking away tools. This is one of the most evidence-based suicide prevention strategies — reducing access to means saves lives. Also identify the person's reasons for living (family, pets, goals, responsibilities) and write them down.",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">
                        {item.step}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {item.title}
                        </p>
                        <p className="text-sm text-white/80">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-3">
                    Keeping the Plan Accessible
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>
                        Keep a physical copy in an easily accessible place
                        (wallet, bedside table)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>
                        Save a digital copy on the person&rsquo;s phone
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>
                        Share a copy with a trusted person if the individual
                        consents
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>
                        The plan must be available at the moment of crisis
                        &mdash; not locked away
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-violet-400 mb-3">
                    Reviewing the Plan
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        Review after any crisis episode &mdash; what worked?
                        What didn&rsquo;t?
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        Update as circumstances change (new contacts, new
                        coping strategies)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        Review regularly even when things are going well
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        A safety plan is a living document, not a one-off
                        exercise
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: When to Call 999 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">04</span>
            When to Call 999
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not every suicidal crisis requires an immediate 999 call, but
                there are clear situations where calling emergency services is
                essential and should not be delayed. Understanding when to
                escalate to 999 is a critical skill for any mental health
                first aider. When in doubt, always err on the side of
                calling &mdash; it is better to call and find it was not
                needed than to hesitate and lose a life.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Call 999 Immediately If:
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      title: "Active suicide attempt",
                      desc: "The person has taken an overdose, cut themselves severely, is about to jump, or has otherwise begun an attempt on their life. This is a medical emergency.",
                    },
                    {
                      title: "Person has means AND intent",
                      desc: "The person has a specific plan and has access to the means to carry it out — for example, they have obtained tablets, a ligature, or are near a height. The combination of a plan, means, and expressed intent is extremely high risk.",
                    },
                    {
                      title: "Immediate danger to self",
                      desc: "The person is in immediate physical danger — standing on a ledge, in traffic, or has access to lethal means and is stating they intend to use them now.",
                    },
                    {
                      title: "Person is severely intoxicated and suicidal",
                      desc: "Alcohol and drugs significantly increase impulsivity and reduce the person's ability to think clearly or use coping strategies. A suicidal person who is heavily intoxicated is at substantially higher risk of acting on their thoughts.",
                    },
                    {
                      title: "Loss of consciousness",
                      desc: "The person has taken an overdose or harmed themselves and is losing or has lost consciousness. This is a life-threatening medical emergency requiring immediate paramedic intervention.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {item.title}
                        </p>
                        <p className="text-sm text-white/80">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    What to Say to the 999 Operator
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  When you call 999, the operator will guide you. Provide the
                  following information as clearly as you can:
                </p>
                <div className="space-y-2">
                  {[
                    "Your exact location — including postcode, building name, floor, and any access instructions",
                    "The nature of the emergency — 'A person is suicidal' or 'A person has attempted suicide'",
                    "Whether an attempt has been made and the method used (overdose, self-harm, hanging, etc.)",
                    "Whether the person has access to means of harm right now",
                    "The person's current state — conscious, breathing, responsive, or deteriorating",
                    "Any known medical conditions, medications, or substances taken",
                  ].map((info, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm text-white/80"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>{info}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-white/60" />
                  <p className="text-sm font-medium text-white">
                    Staying with the Person
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Do not leave them alone
                      </strong>{" "}
                      while waiting for emergency services. Your presence is
                      protective.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Stay calm and speak in a steady, reassuring tone. Your
                      calmness will help regulate their distress.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      If safe to do so, gently remove or distance any means of
                      harm (e.g., move tablets away, close windows).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      If the person has taken an overdose, try to identify what
                      they took, how much, and when &mdash; the paramedics will
                      need this information.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Keep the 999 operator on the line if possible &mdash; they
                      can provide real-time guidance until the ambulance arrives.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Key Helplines and Resources */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">05</span>
            Key Helplines &amp; Resources
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Knowing the key helplines and resources is essential for any
                mental health first aider. You should be able to recall these
                numbers confidently and share them without hesitation. The
                following are the most important UK crisis support services
                relevant to the construction and electrical trades.
              </p>

              {/* National Helplines */}
              <div className="space-y-3">
                {/* Samaritans */}
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-green-400">
                      Samaritans
                    </p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-500/20 text-green-300 text-xs font-bold">
                      24/7
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-lg font-bold text-white">
                      116 123
                    </span>
                    <span className="text-xs text-white/50">(free to call)</span>
                  </div>
                  <p className="text-sm text-white/80">
                    Available 24 hours a day, 7 days a week, 365 days a year.
                    Confidential emotional support for anyone experiencing
                    feelings of distress, despair, or suicidal thoughts. You do
                    not need to be suicidal to call. Also available by email:
                    jo@samaritans.org (response within 24 hours).
                  </p>
                </div>

                {/* SHOUT */}
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-blue-400">
                      SHOUT Crisis Text Line
                    </p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-xs font-bold">
                      24/7
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <MessageCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <span className="text-lg font-bold text-white">
                      Text SHOUT to 85258
                    </span>
                    <span className="text-xs text-white/50">(free)</span>
                  </div>
                  <p className="text-sm text-white/80">
                    Free, confidential, 24/7 text-based support. Particularly
                    useful for people who find it difficult to talk on the phone
                    or who cannot make a call in their current environment (e.g.,
                    on a noisy building site or in a shared space).
                  </p>
                </div>

                {/* CALM */}
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-purple-400">
                      CALM &mdash; Campaign Against Living Miserably
                    </p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-xs font-bold">
                      5PM&ndash;MIDNIGHT
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="h-4 w-4 text-purple-400 flex-shrink-0" />
                    <span className="text-lg font-bold text-white">
                      0800 58 58 58
                    </span>
                    <span className="text-xs text-white/50">(free)</span>
                  </div>
                  <p className="text-sm text-white/80">
                    Open 5pm to midnight, 365 days a year. CALM provides
                    support for anyone who is struggling, with a particular
                    focus on men who are at risk of suicide. Also offers a
                    webchat service at thecalmzone.net.
                  </p>
                </div>

                {/* Papyrus HOPELINEUK */}
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-amber-400">
                      Papyrus HOPELINEUK
                    </p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-bold">
                      UNDER 35s
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="h-4 w-4 text-amber-400 flex-shrink-0" />
                    <span className="text-lg font-bold text-white">
                      0800 068 4141
                    </span>
                    <span className="text-xs text-white/50">
                      (9am&ndash;midnight)
                    </span>
                  </div>
                  <p className="text-sm text-white/80">
                    Specifically for people under 35 who are experiencing
                    suicidal thoughts, and for anyone concerned about a young
                    person. Available by phone, text (07860 039967), and email
                    (pat@papyrus-uk.org). Particularly relevant for
                    apprentices and younger workers in the trade.
                  </p>
                </div>

                {/* NHS 111 */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-white">
                      NHS 111 &mdash; Mental Health Crisis
                    </p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-white/20 text-white/80 text-xs font-bold">
                      24/7
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="h-4 w-4 text-white/60 flex-shrink-0" />
                    <span className="text-lg font-bold text-white">
                      111 &mdash; Option 2
                    </span>
                    <span className="text-xs text-white/50">(free)</span>
                  </div>
                  <p className="text-sm text-white/80">
                    Dialling 111 and selecting option 2 connects you to the
                    local mental health crisis team. This is appropriate when
                    someone needs urgent mental health support but is not in
                    immediate physical danger.
                  </p>
                </div>
              </div>

              {/* Construction-Specific Resources */}
              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">
                  Construction-Specific Support
                </p>
                <div className="space-y-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <HandHeart className="h-4 w-4 text-purple-400" />
                      <p className="text-xs font-medium text-purple-300">
                        Lighthouse Club
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="h-3 w-3 text-white/50" />
                      <span className="text-sm font-bold text-white">
                        0345 605 1956
                      </span>
                    </div>
                    <p className="text-xs text-white/70">
                      The construction industry charity providing emotional,
                      physical, and financial wellbeing support for construction
                      workers and their families. They understand the unique
                      pressures of the industry &mdash; long hours, time away
                      from home, physical demands, job insecurity, and the
                      culture of &ldquo;getting on with it&rdquo;.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <HeartHandshake className="h-4 w-4 text-purple-400" />
                      <p className="text-xs font-medium text-purple-300">
                        Mates in Mind
                      </p>
                    </div>
                    <p className="text-xs text-white/70">
                      A UK charity focused on improving and promoting positive
                      mental health in the construction industry. They provide
                      training, toolkits, and resources specifically designed
                      for the culture and environment of construction and
                      related trades. Their website offers free resources for
                      both individuals and employers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Reference Card */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-purple-500/20 border-b border-purple-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-purple-300">
                    Quick Reference &mdash; Crisis Numbers
                  </p>
                </div>
                <div className="grid grid-cols-3 text-xs sm:text-sm">
                  <div className="p-3 bg-white/10 font-medium text-white border-b border-white/10">
                    Service
                  </div>
                  <div className="p-3 bg-white/10 font-medium text-white border-b border-l border-white/10">
                    Number
                  </div>
                  <div className="p-3 bg-white/10 font-medium text-white border-b border-l border-white/10">
                    Hours
                  </div>

                  <div className="p-3 text-green-300 border-b border-white/10">
                    Samaritans
                  </div>
                  <div className="p-3 text-white/80 font-medium border-b border-l border-white/10">
                    116 123
                  </div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10">
                    24/7
                  </div>

                  <div className="p-3 text-blue-300 border-b border-white/10">
                    SHOUT
                  </div>
                  <div className="p-3 text-white/80 font-medium border-b border-l border-white/10">
                    Text 85258
                  </div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10">
                    24/7
                  </div>

                  <div className="p-3 text-purple-300 border-b border-white/10">
                    CALM
                  </div>
                  <div className="p-3 text-white/80 font-medium border-b border-l border-white/10">
                    0800 58 58 58
                  </div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10">
                    5pm&ndash;midnight
                  </div>

                  <div className="p-3 text-amber-300 border-b border-white/10">
                    Papyrus
                  </div>
                  <div className="p-3 text-white/80 font-medium border-b border-l border-white/10">
                    0800 068 4141
                  </div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10">
                    9am&ndash;midnight
                  </div>

                  <div className="p-3 text-white/80 border-b border-white/10">
                    NHS 111
                  </div>
                  <div className="p-3 text-white/80 font-medium border-b border-l border-white/10">
                    111 (opt. 2)
                  </div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10">
                    24/7
                  </div>

                  <div className="p-3 text-purple-300">Lighthouse</div>
                  <div className="p-3 text-white/80 font-medium border-l border-white/10">
                    0345 605 1956
                  </div>
                  <div className="p-3 text-white/80 border-l border-white/10">
                    Mon&ndash;Fri
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Post-Crisis Support and Impact on the First Aider */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">06</span>
            Post-Crisis Support &amp; Impact on the First Aider
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Supporting someone through a suicidal crisis is one of the
                most emotionally intense experiences a person can have. After
                the immediate crisis has passed, two important things need
                attention: following up with the person you supported, and
                looking after your own wellbeing as the first aider.
              </p>

              {/* What Happens After a Crisis */}
              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">
                  What Happens After a Crisis
                </p>
                <p className="text-sm text-white/80 mb-3">
                  After the immediate danger has passed and professional
                  support has been engaged, the situation does not simply
                  &ldquo;go back to normal&rdquo;. The person who was in crisis
                  may feel:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      feeling: "Embarrassment or shame",
                      detail:
                        "They may regret disclosing their feelings and worry about being judged or treated differently.",
                    },
                    {
                      feeling: "Relief",
                      detail:
                        "Many people feel a genuine sense of relief that someone knows and that they are no longer carrying the burden alone.",
                    },
                    {
                      feeling: "Fear",
                      detail:
                        "Worry about what happens next — will they be sectioned? Will their employer find out? Will people treat them differently?",
                    },
                    {
                      feeling: "Gratitude",
                      detail:
                        "Often expressed later, sometimes much later. The person may not thank you immediately, but your intervention mattered profoundly.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-purple-400 mb-1">
                        {item.feeling}
                      </p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Following Up */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-white/60" />
                  <p className="text-sm font-medium text-white">
                    Following Up Appropriately
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Check in within 24&ndash;48 hours
                      </strong>{" "}
                      &mdash; a brief, low-pressure message: &ldquo;Just wanted
                      to check in. I&rsquo;m here if you need
                      anything.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Respect their boundaries
                      </strong>{" "}
                      &mdash; if they do not want to talk about it, do not
                      force the conversation. Simply let them know you are
                      available.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Do not treat them differently
                      </strong>{" "}
                      &mdash; avoid walking on eggshells or constantly asking
                      if they are OK. Treat them normally whilst remaining
                      available and attentive.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Maintain confidentiality
                      </strong>{" "}
                      &mdash; do not discuss the person&rsquo;s crisis with
                      colleagues or others unless it is necessary for their
                      safety or agreed with the person.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Gently encourage professional support
                      </strong>{" "}
                      &mdash; ask if they have been able to contact their GP,
                      a counsellor, or a helpline. Offer practical help:
                      &ldquo;Would you like me to come with you to the
                      appointment?&rdquo;
                    </span>
                  </li>
                </ul>
              </div>

              {/* Impact on the First Aider */}
              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">
                    The Impact on You as the First Aider
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  It is entirely normal and expected to be affected by
                  supporting someone through a suicidal crisis. Being affected
                  is not a sign of weakness &mdash; it is a sign that you are
                  a compassionate human being. Common reactions include:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      reaction: "Emotional exhaustion",
                      detail:
                        "Feeling drained, tearful, or emotionally flat. The adrenaline from the crisis has subsided and the emotional cost becomes apparent.",
                    },
                    {
                      reaction: "Replaying the conversation",
                      detail:
                        "Going over what was said again and again, wondering if you said the right thing or missed something important.",
                    },
                    {
                      reaction: "Anxiety and hypervigilance",
                      detail:
                        "Worrying about the person constantly, checking your phone, feeling on edge that something might happen.",
                    },
                    {
                      reaction: "Sleep disturbance",
                      detail:
                        "Difficulty falling asleep, waking during the night, or having vivid dreams related to the experience.",
                    },
                    {
                      reaction: "Guilt",
                      detail:
                        "Wondering if you did enough, said the right things, or responded quickly enough. This is common even when you did everything right.",
                    },
                    {
                      reaction: "Anger or frustration",
                      detail:
                        "Feeling angry at the situation, at the system, or even at the person — these are normal responses to an overwhelming experience.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-violet-400 mb-1">
                        {item.reaction}
                      </p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Incident Stress */}
              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">
                  Critical Incident Stress
                </p>
                <p className="text-sm text-white/80 mb-3">
                  If a suicide attempt occurs on site, or if you are involved
                  in a particularly traumatic crisis response, you may
                  experience <strong className="text-white">critical
                  incident stress</strong>. This is a normal response to an
                  abnormal event and can include:
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Flashbacks or intrusive images of the event
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Emotional numbness or feeling disconnected from others
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Difficulty concentrating on work or daily tasks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Physical symptoms: headaches, stomach problems,
                      muscle tension
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Increased use of alcohol or other substances to cope
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white/80 mt-3">
                  If these symptoms persist for more than a few weeks, or if
                  they significantly interfere with your daily life, seek
                  support from your GP or a mental health professional. You
                  may benefit from a formal debriefing or trauma-focused
                  therapy.
                </p>
              </div>

              {/* Seeking Supervision & Self-Care */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-3">
                    Seeking Debriefing &amp; Supervision
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>
                        Speak to your line manager, MHFA coordinator, or
                        occupational health team
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>
                        Request a formal debrief if one is not offered
                        automatically
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>
                        Use your organisation&rsquo;s Employee Assistance
                        Programme (EAP) if available
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>
                        Consider peer support &mdash; talking with another
                        trained MHFA about the experience (maintaining
                        confidentiality)
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-400 mb-3">
                    Looking After Yourself
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        It is OK to be affected &mdash; this does not mean you
                        are not cut out for the role
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Talk to someone you trust about how you feel (without
                        breaching confidentiality)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Maintain your routine &mdash; eat, sleep, exercise,
                        connect with people you care about
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Remember: helplines are for helpers too. Call
                        Samaritans on 116 123 if you need to talk.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">
                    A Final Word
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  You cannot pour from an empty cup. As a mental health first
                  aider, your willingness to sit with someone in their darkest
                  moment is extraordinary. But you must also protect your own
                  wellbeing. Seeking support is not a sign of failure &mdash;
                  it is a sign that you take your role seriously and understand
                  that looking after yourself is essential to being able to
                  look after others. You are not responsible for another
                  person&rsquo;s choices or outcomes. Your role is to listen,
                  to care, to connect them with support, and to be there. That
                  is enough. That matters more than you know.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quiz */}
        <Quiz
          title="Section 4 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
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
            <Link to="../mental-health-module-4">
              Next: Module 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
