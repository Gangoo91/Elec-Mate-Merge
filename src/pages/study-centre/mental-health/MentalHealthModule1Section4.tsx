import {
  ArrowLeft,
  Brain,
  CheckCircle,
  AlertTriangle,
  MessageCircle,
  Ear,
  HandHeart,
  Users,
  Globe,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Quick-check questions (InlineCheck)                                */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "mh-soler-model",
    question:
      "In the SOLER model for active listening, what does the 'L' stand for?",
    options: [
      "Look away to give space",
      "Lean in slightly towards the speaker",
      "Listen without responding",
      "Lower your voice when speaking",
    ],
    correctIndex: 1,
    explanation:
      "The 'L' in the SOLER model stands for 'Lean in' — leaning slightly towards the person you are speaking with shows attentiveness and genuine interest in what they are saying. It signals that you are engaged and present in the conversation without being physically intrusive.",
  },
  {
    id: "mh-non-judgemental",
    question:
      "Which of the following is a judgemental response that should be avoided when someone discloses a mental health difficulty?",
    options: [
      '"That sounds really difficult — thank you for telling me."',
      '"Have you tried just not thinking about it?"',
      "\"I'm here for you — take your time.\"",
      '"How long have you been feeling this way?"',
    ],
    correctIndex: 1,
    explanation:
      "Saying 'Have you tried just not thinking about it?' is a minimising and judgemental response. It implies the person has not tried hard enough to help themselves and reduces a complex mental health experience to a simple act of willpower. Supportive alternatives acknowledge the person's feelings and encourage them to share at their own pace.",
  },
  {
    id: "mh-open-questions",
    question:
      "Which of the following is an example of a good open question to use in a mental health conversation?",
    options: [
      '"Are you feeling OK?"',
      '"Did something happen at work?"',
      '"What has been going on for you lately?"',
      '"Do you want me to call someone?"',
    ],
    correctIndex: 2,
    explanation:
      "'What has been going on for you lately?' is an open question because it cannot be answered with a simple 'yes' or 'no'. It invites the person to share their experience in their own words, at their own pace. The other options are closed questions that limit the response to a single word or short phrase.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs                                                               */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      "What should I do if someone becomes very distressed during a conversation?",
    answer:
      "Stay calm and grounded. Lower your voice, slow your speech, and use short, reassuring phrases such as 'I'm here with you' or 'You're safe'. Do not try to stop them from crying or expressing emotion — allow them the space to feel what they are feeling. If they are hyperventilating, gently encourage slow breathing. Do not leave them alone unless they explicitly ask for space and you are confident they are safe. If you believe they are in immediate danger of harming themselves, stay with them and contact emergency services on 999.",
  },
  {
    question:
      "How do I start a conversation about mental health with a colleague on site?",
    answer:
      "Choose a private moment away from others — a quiet corner of the welfare cabin, a walk to the van, or during a tea break when you can speak without being overheard. Use 'I' statements such as 'I've noticed you seem a bit quiet lately' or 'I've been a bit worried about you'. Avoid assumptions — you are opening a door, not making a diagnosis. Let them know there is no pressure to talk, but that you are there if they want to. Sometimes simply saying 'How are you doing — really?' with genuine interest is enough to start the conversation.",
  },
  {
    question:
      "Is it appropriate to share my own mental health experiences when supporting someone?",
    answer:
      "Brief, relevant self-disclosure can sometimes help normalise the conversation and reduce the other person's sense of isolation. For example, saying 'I went through a tough time a few years back, so I understand a bit of what you might be feeling' can be reassuring. However, keep it brief and always bring the focus back to them. Do not make the conversation about yourself, compete with their experience, or share graphic details of your own difficulties. The aim is to show empathy and reduce stigma, not to shift the focus.",
  },
  {
    question:
      "What if someone asks me not to tell anyone about what they have shared?",
    answer:
      "Confidentiality is important and should be respected wherever possible. However, you must be honest from the start — explain that you will keep what they say private unless you believe they or someone else is at serious risk of harm. In that situation, you have a duty of care to involve appropriate support, such as a mental health professional, their GP, or emergency services. Never promise absolute confidentiality, as this can put you in an impossible position if a safeguarding concern arises. You can say: 'I'll keep this between us unless I'm worried about your safety — in that case I'd need to make sure you get the right help.'",
  },
  {
    question:
      "How can I support a colleague whose first language is not English?",
    answer:
      "Speak slowly and clearly, using simple language and short sentences. Avoid idioms, slang, and jargon — phrases like 'feeling blue' or 'at the end of your tether' may not translate. Use visual aids or translation apps if available. Check understanding regularly by asking them to repeat back what they have understood. If possible, arrange for a colleague who speaks their language to help with the conversation, but only with the person's consent. Be patient — the effort to communicate across a language barrier shows genuine care.",
  },
];

/* ------------------------------------------------------------------ */
/*  End-of-section quiz                                                */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "What does the 'S' in the SOLER active listening model stand for?",
    options: [
      "Speak clearly and slowly",
      "Sit squarely — face the person",
      "Stay silent until they finish",
      "Summarise what they have said",
    ],
    correctAnswer: 1,
    explanation:
      "The 'S' in SOLER stands for 'Sit squarely', meaning you should position yourself facing the person to show that you are giving them your full attention. This does not mean sitting rigidly — it means orienting your body towards them in an open, engaged posture.",
  },
  {
    id: 2,
    question:
      "Which psychologist is most closely associated with the concept of 'unconditional positive regard'?",
    options: [
      "Sigmund Freud",
      "Carl Rogers",
      "Aaron Beck",
      "B.F. Skinner",
    ],
    correctAnswer: 1,
    explanation:
      "Carl Rogers (1902–1987) developed the concept of unconditional positive regard as one of the three core conditions for therapeutic change. It means accepting and valuing a person without judgement, regardless of what they say or do. In a mental health first aid context, this means treating the person with warmth and respect even if you do not understand or agree with their behaviour.",
  },
  {
    id: 3,
    question:
      "A colleague tells you they have been feeling very low. Which response best demonstrates active listening?",
    options: [
      '"You should probably see your GP about that."',
      "\"Don't worry, everyone feels like that sometimes.\"",
      '"It sounds like things have been really tough for you recently."',
      '"Have you tried going for a run? Exercise really helps."',
    ],
    correctAnswer: 2,
    explanation:
      "'It sounds like things have been really tough for you recently' is a reflecting statement that demonstrates active listening. It shows you have heard what the person said, acknowledges their feelings, and invites them to continue. The other options offer premature advice, minimise their experience, or redirect the conversation away from their feelings.",
  },
  {
    id: 4,
    question:
      "Which of the following is NOT a feature of a non-judgemental approach?",
    options: [
      "Suspending your own opinions and biases",
      "Telling the person what they should do to feel better",
      "Validating the person's emotions as real and important",
      "Accepting the person's experience without trying to fix it",
    ],
    correctAnswer: 1,
    explanation:
      "Telling someone what they should do is directive and judgemental — it implies you know better than them how to manage their own experience. A non-judgemental approach involves listening, validating, and accepting without trying to fix, advise, or direct. You can offer information about available support, but the decision to act must remain with the person.",
  },
  {
    id: 5,
    question:
      "What is the 'funnelling technique' in the context of asking questions?",
    options: [
      "Asking the same question repeatedly until you get an answer",
      "Starting with broad, open questions and gradually narrowing to more specific ones",
      "Using only closed questions to get factual information quickly",
      "Avoiding questions altogether and letting the person lead",
    ],
    correctAnswer: 1,
    explanation:
      "The funnelling technique involves starting a conversation with broad, open questions (such as 'How have you been feeling?') and gradually moving to more specific questions (such as 'When did you first notice these feelings?') as the person becomes more comfortable. This approach feels natural and non-intrusive, and allows the person to share at their own pace.",
  },
  {
    id: 6,
    question:
      "Which opening phrase is most appropriate when starting a difficult conversation about someone's mental health?",
    options: [
      '"You seem really depressed — are you OK?"',
      "\"Everyone's noticed you've not been yourself.\"",
      "\"I've noticed you seem a bit different lately, and I wanted to check in.\"",
      '"You need to talk to someone about your problems."',
    ],
    correctAnswer: 2,
    explanation:
      "'I've noticed you seem a bit different lately, and I wanted to check in' uses a gentle 'I' statement, avoids labelling or diagnosing, and opens the door without pressure. The other options either use diagnostic language ('depressed'), invoke social pressure ('everyone's noticed'), or are directive ('you need to').",
  },
  {
    id: 7,
    question:
      "Why is silence sometimes beneficial during a mental health conversation?",
    options: [
      "It makes the other person uncomfortable, which forces them to talk",
      "It gives both people time to process emotions and gather thoughts",
      "It shows that you are not interested in what they are saying",
      "It is a technique used only by professional counsellors",
    ],
    correctAnswer: 1,
    explanation:
      "Comfortable silence allows the person time to process their emotions, gather their thoughts, and decide what they want to say next. Many people need a few moments to articulate difficult feelings. Rushing to fill silence with words can feel pressuring. Sitting quietly, maintaining gentle eye contact, and showing through your body language that you are present is a powerful form of support.",
  },
  {
    id: 8,
    question:
      "When supporting someone from a different cultural background, which of the following is MOST important?",
    options: [
      "Assuming their culture does not recognise mental health problems",
      "Treating them exactly the same as everyone else without any adaptation",
      "Asking respectful questions and adapting your approach without stereotyping",
      "Avoiding the topic of culture altogether to prevent offence",
    ],
    correctAnswer: 2,
    explanation:
      "Cultural sensitivity means being aware that people from different backgrounds may express distress differently, have different beliefs about mental health, and have different expectations of support. The best approach is to ask respectful questions, listen without assuming, and adapt your communication style. Avoiding culture entirely ignores an important part of someone's identity, while stereotyping reduces them to assumptions about their background.",
  },
];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
export default function MentalHealthModule1Section4() {
  useSEO({
    title:
      "Communication Skills & Active Listening | Mental Health Module 1.4",
    description:
      "Active listening, the SOLER model, non-judgemental communication, open questions, having difficult conversations, and cultural sensitivity in mental health first aid.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ── Sticky Header ────────────────────────────────────────── */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ── Page Title ─────────────────────────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-400/20 border border-purple-500/30 mb-4">
            <MessageCircle className="h-7 w-7 text-purple-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 mx-auto">
            <span className="text-purple-400 text-xs font-semibold">
              MODULE 1 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Communication Skills &amp; Active Listening
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The SOLER model, non-judgemental language, open questions, having
            difficult conversations, and cultural sensitivity in mental health
            first aid
          </p>
        </header>

        {/* ── Quick Summary Boxes ────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Active listening:</strong> Fully focusing on the speaker
                &mdash; not just hearing
              </li>
              <li>
                <strong>SOLER:</strong> Sit squarely, Open posture, Lean in, Eye
                contact, Relax
              </li>
              <li>
                <strong>Non-judgemental:</strong> Accept feelings without trying
                to fix them
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400/90 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Start with:</strong> &ldquo;I&rsquo;ve noticed&hellip;&rdquo;
                or &ldquo;I&rsquo;m a bit worried about you&rdquo;
              </li>
              <li>
                <strong>Use:</strong> Open questions &mdash; &ldquo;How&rdquo;
                and &ldquo;What&rdquo;
              </li>
              <li>
                <strong>Remember:</strong> Silence is OK &mdash; don&rsquo;t
                rush to fill gaps
              </li>
            </ul>
          </div>
        </div>

        {/* ── Learning Outcomes ──────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why effective communication is critical in mental health first aid",
              "Demonstrate the SOLER model for active listening",
              "Describe the principles of a non-judgemental approach including unconditional positive regard",
              "Differentiate between open and closed questions and know when to use each",
              "Initiate and navigate difficult conversations about mental health",
              "Adapt communication for cultural, linguistic, and neurodiverse contexts",
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
        {/*  01 — Why Communication Matters in MHFA                      */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">01</span>
            Why Communication Matters in MHFA
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A single conversation can change a life. Research by the
                Samaritans shows that the simple act of being listened to
                &mdash; truly listened to, without judgement or interruption
                &mdash; can reduce feelings of isolation, hopelessness, and
                suicidal ideation. In a mental health first aid context, the way
                you communicate is more important than the words you use.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-2">
                  The Construction Context
                </p>
                <p className="text-sm text-white/80">
                  The construction industry has one of the highest suicide rates
                  of any occupation in the UK. Male construction workers are
                  approximately <strong className="text-white">three times</strong>{" "}
                  more likely to die by suicide than the male national average
                  (ONS, 2023). A culture of toughness, &ldquo;getting on with
                  it&rdquo;, and reluctance to discuss feelings creates
                  significant barriers to help-seeking. Breaking through these
                  barriers starts with how we talk to each other.
                </p>
              </div>

              <p>
                Common barriers to talking about mental health on construction
                sites include fear of being seen as weak, concern about job
                security, lack of privacy, banter culture that discourages
                vulnerability, and simply not knowing how to start the
                conversation. As a mental health first aider, your role is to
                create a space where someone feels safe enough to talk.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  What Good Communication Achieves
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Builds trust:</strong> The
                      person feels safe to share what they are experiencing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reduces isolation:
                      </strong>{" "}
                      Knowing someone cares enough to listen can be profoundly
                      powerful
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Encourages help-seeking:
                      </strong>{" "}
                      A supportive conversation may be the first step towards
                      professional support
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Prevents escalation:
                      </strong>{" "}
                      Early conversations can prevent a crisis from developing
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">
                    Key Principle
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  You do not need to have the answers. You do not need to be a
                  counsellor. The most powerful thing you can do is{" "}
                  <strong className="text-white">be present</strong>,{" "}
                  <strong className="text-white">listen without judgement</strong>,
                  and{" "}
                  <strong className="text-white">
                    show that you genuinely care
                  </strong>
                  . That alone can make a life-changing difference.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  02 — Active Listening                                       */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">02</span>
            Active Listening
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Active listening is a conscious, deliberate effort to fully
                concentrate on what someone is saying, understand their message,
                and respond thoughtfully. It is fundamentally different from
                passive listening, where you hear words but your mind is
                elsewhere &mdash; thinking about what to say next, checking your
                phone, or waiting for a gap to offer advice.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Active vs Passive Listening
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-green-400 mb-2">
                      Active Listening
                    </p>
                    <ul className="text-xs text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Full attention on the speaker</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Reflecting feelings back</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Paraphrasing to check understanding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Comfortable with silence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Body language shows engagement</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-red-400 mb-2">
                      Passive Listening
                    </p>
                    <ul className="text-xs text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Distracted, mind wandering</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Planning your response while they talk</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Interrupting or finishing sentences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Uncomfortable with pauses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Closed or distracted body language</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* ── SOLER Model Styled Diagram ───────────────────── */}
              <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/30 rounded-lg p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Ear className="h-5 w-5 text-purple-400" />
                  <p className="text-base font-semibold text-purple-400">
                    The SOLER Model &mdash; Gerard Egan
                  </p>
                </div>
                <p className="text-sm text-white/70 mb-5">
                  Developed by psychologist Gerard Egan, the SOLER model
                  provides a simple framework for non-verbal communication that
                  shows attentiveness and respect during face-to-face
                  conversations.
                </p>

                <div className="grid gap-3">
                  {/* S */}
                  <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex-shrink-0">
                      <span className="text-lg font-bold text-purple-400">
                        S
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Sit Squarely
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        Face the person directly. This conveys the message
                        &ldquo;I am here with you and I am available to
                        you.&rdquo; Angle your body towards them rather than
                        turning away.
                      </p>
                    </div>
                  </div>
                  {/* O */}
                  <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex-shrink-0">
                      <span className="text-lg font-bold text-purple-400">
                        O
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Open Posture
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        Keep your arms and legs uncrossed. An open posture
                        signals that you are receptive and non-defensive. Crossed
                        arms can unconsciously communicate a barrier.
                      </p>
                    </div>
                  </div>
                  {/* L */}
                  <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex-shrink-0">
                      <span className="text-lg font-bold text-purple-400">
                        L
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Lean In
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        Lean slightly towards the speaker. This shows interest
                        and engagement. Leaning back or slouching can suggest
                        boredom or disinterest. Be natural &mdash; do not invade
                        personal space.
                      </p>
                    </div>
                  </div>
                  {/* E */}
                  <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex-shrink-0">
                      <span className="text-lg font-bold text-purple-400">
                        E
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Eye Contact
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        Maintain comfortable, natural eye contact. This
                        communicates sincerity and interest. Avoid staring
                        &mdash; look away occasionally to keep it natural. Be
                        aware that cultural norms around eye contact vary.
                      </p>
                    </div>
                  </div>
                  {/* R */}
                  <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex-shrink-0">
                      <span className="text-lg font-bold text-purple-400">
                        R
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Relax</p>
                      <p className="text-xs text-white/70 mt-1">
                        Be at ease. If you appear tense or anxious, the other
                        person will pick up on it and may become more guarded.
                        Take a breath, settle your body, and be present. Your
                        calm demeanour will help them feel safe.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Beyond body language, active listening involves three key verbal
                skills: <strong>paraphrasing</strong> (restating what the person
                has said in your own words to check understanding),{" "}
                <strong>reflecting feelings</strong> (naming the emotion you
                sense behind their words, e.g. &ldquo;It sounds like you are
                feeling really overwhelmed&rdquo;), and{" "}
                <strong>summarising</strong> (bringing together the key points
                of what they have shared to show you have been listening).
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-2">
                  Verbal Cues That Show You Are Listening
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Minimal encouragers: &ldquo;Mm-hmm&rdquo;,
                      &ldquo;Go on&rdquo;, &ldquo;I see&rdquo;,
                      &ldquo;Tell me more&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Paraphrasing: &ldquo;So what I&rsquo;m hearing is&hellip;&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Reflecting: &ldquo;It sounds like that made you feel
                      really angry&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Summarising: &ldquo;So overall, you&rsquo;ve been dealing
                      with&hellip;&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  03 — Non-Judgemental Approach                               */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">03</span>
            Non-Judgemental Approach
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A non-judgemental approach means suspending your own opinions,
                beliefs, and assumptions so that you can fully accept the other
                person&rsquo;s experience as valid and real. It does not mean you
                have to agree with everything they say &mdash; it means you
                create a space where they feel safe to be honest without fear of
                criticism, dismissal, or being told they are wrong to feel the
                way they do.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <HandHeart className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Unconditional Positive Regard &mdash; Carl Rogers
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Psychologist Carl Rogers (1902&ndash;1987) identified{" "}
                  <strong className="text-white">
                    unconditional positive regard
                  </strong>{" "}
                  as one of the three core conditions for a therapeutic
                  relationship (alongside empathy and congruence). It means
                  offering warmth, acceptance, and respect to a person
                  regardless of what they say, do, or feel. In mental health
                  first aid, this means valuing the person as a human being
                  &mdash; even if their behaviour, choices, or circumstances are
                  difficult to understand.
                </p>
              </div>

              <p>
                Judgement often comes through unconsciously, in the words we
                choose and the tone we use. Even well-intentioned responses can
                be minimising or dismissive if we are not careful. The table
                below shows common judgemental phrases and their supportive
                alternatives.
              </p>

              {/* Judgemental vs Supportive table */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-purple-500/10 border-b border-white/10 p-3">
                  <p className="text-sm font-medium text-purple-400">
                    Judgemental vs Supportive Language
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-0 border-b border-white/10 text-xs font-semibold">
                  <div className="p-2 sm:p-3 text-red-400">
                    Avoid (Judgemental)
                  </div>
                  <div className="p-2 sm:p-3 text-green-400 border-l border-white/10">
                    Use Instead (Supportive)
                  </div>
                </div>

                {[
                  {
                    avoid: '"Just cheer up — it could be worse."',
                    use: '"I can see this is really affecting you."',
                  },
                  {
                    avoid: '"Everyone gets stressed — you just need to toughen up."',
                    use: "\"It sounds like you're under a lot of pressure right now.\"",
                  },
                  {
                    avoid: '"Have you tried not thinking about it?"',
                    use: '"What do you think might help you feel a bit better?"',
                  },
                  {
                    avoid: "\"You don't look depressed to me.\"",
                    use: '"Thank you for trusting me enough to tell me."',
                  },
                  {
                    avoid: '"Other people have it much worse."',
                    use: "\"Your feelings are valid — what you're going through matters.\"",
                  },
                  {
                    avoid: '"You should just get some exercise / go for a walk."',
                    use: '"What kind of support do you think would help you most?"',
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-2 gap-0 text-xs sm:text-sm ${
                      i % 2 === 0 ? "bg-white/[0.02]" : ""
                    } ${i < 5 ? "border-b border-white/5" : ""}`}
                  >
                    <div className="p-2 sm:p-3 text-white/70">{row.avoid}</div>
                    <div className="p-2 sm:p-3 text-white/70 border-l border-white/5">
                      {row.use}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Validating Emotions
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Validation means acknowledging that someone&rsquo;s feelings
                  are real and understandable, even if you would feel differently
                  in the same situation. Validation is not agreement &mdash; it
                  is respect.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Name the emotion:</strong>{" "}
                      &ldquo;It sounds like you&rsquo;re feeling really
                      frustrated&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Acknowledge the context:
                      </strong>{" "}
                      &ldquo;Given everything you&rsquo;ve been dealing with,
                      it&rsquo;s completely understandable&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Avoid the word &ldquo;but&rdquo;:
                      </strong>{" "}
                      Saying &ldquo;I understand, but&hellip;&rdquo; negates
                      everything before it. Use &ldquo;and&rdquo; instead
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  04 — Open Questions                                         */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">04</span>
            Open Questions
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The questions you ask shape the conversation. Open questions
                invite the person to share their thoughts and feelings in their
                own words, while closed questions limit them to a &ldquo;yes&rdquo;
                or &ldquo;no&rdquo; response. In mental health conversations,
                open questions are almost always more useful because they
                encourage the person to explore and express what they are
                experiencing.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">
                    Open Questions (Preferred)
                  </p>
                  <ul className="text-xs text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>
                        &ldquo;How have you been feeling lately?&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>
                        &ldquo;What has been on your mind?&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>
                        &ldquo;Tell me more about what&rsquo;s been going
                        on.&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>
                        &ldquo;What would be most helpful for you right
                        now?&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>
                        &ldquo;How is this affecting your day-to-day life?&rdquo;
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">
                    Closed Questions (Limited Use)
                  </p>
                  <ul className="text-xs text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>&ldquo;Are you OK?&rdquo; (likely answer: &ldquo;Yeah, fine&rdquo;)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>&ldquo;Did something happen?&rdquo;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>&ldquo;Do you want to talk about it?&rdquo;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>&ldquo;Have you seen your GP?&rdquo;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>&ldquo;Is it work that&rsquo;s the problem?&rdquo;</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-2">
                  The &ldquo;How&rdquo; and &ldquo;What&rdquo; Approach
                </p>
                <p className="text-sm text-white/80">
                  Questions beginning with <strong className="text-white">&ldquo;How&rdquo;</strong> and{" "}
                  <strong className="text-white">&ldquo;What&rdquo;</strong> tend to produce
                  the most helpful responses. They invite reflection and
                  description without feeling confrontational. Be cautious with{" "}
                  <strong className="text-white">&ldquo;Why&rdquo;</strong> questions
                  (e.g. &ldquo;Why do you feel like that?&rdquo;) as they can
                  feel accusatory and put someone on the defensive.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The Funnelling Technique
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Funnelling means starting with broad, general questions and
                  gradually narrowing down to more specific ones as the person
                  becomes comfortable sharing. This feels natural and
                  non-intrusive.
                </p>
                <div className="space-y-2">
                  {[
                    {
                      step: "1. Broad",
                      example:
                        '"How have things been going for you recently?"',
                    },
                    {
                      step: "2. Narrowing",
                      example:
                        "\"You mentioned feeling stressed — what's been contributing to that?\"",
                    },
                    {
                      step: "3. Specific",
                      example:
                        '"When did you first start noticing these feelings?"',
                    },
                    {
                      step: "4. Focused",
                      example:
                        '"What kind of support do you think would help the most?"',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-white/[0.03] p-3 rounded-lg"
                    >
                      <span className="text-xs font-semibold text-purple-400 whitespace-nowrap mt-0.5">
                        {item.step}
                      </span>
                      <span className="text-xs text-white/70 italic">
                        {item.example}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-2">
                  When Closed Questions Are Appropriate
                </p>
                <p className="text-sm text-white/80">
                  Closed questions do have their place. They are useful for
                  clarifying specific facts (&ldquo;Are you taking any
                  medication at the moment?&rdquo;), assessing immediate safety
                  (&ldquo;Are you having thoughts of harming yourself?&rdquo;),
                  and confirming understanding (&ldquo;So what you&rsquo;re
                  saying is&hellip; is that right?&rdquo;). Use them
                  purposefully, not as a default.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  05 — Having Difficult Conversations                         */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">05</span>
            Having Difficult Conversations
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Starting a conversation about someone&rsquo;s mental health can
                feel daunting, but it is one of the most important things you
                can do as a mental health first aider. Most people who are
                struggling will not initiate the conversation themselves &mdash;
                they are waiting for someone to notice, to ask, and to show they
                care enough to listen.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">
                  Starting the Conversation
                </p>
                <p className="text-sm text-white/60 mb-3">
                  Use &ldquo;I&rdquo; statements to open the door without
                  pressure or accusation:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      &ldquo;I&rsquo;ve noticed you&rsquo;ve seemed a bit
                      quieter than usual &mdash; how are you doing?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      &ldquo;I&rsquo;m concerned about you &mdash; I wanted to
                      check in and see how you are.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      &ldquo;I care about you and I&rsquo;ve noticed something
                      seems different &mdash; is there anything you&rsquo;d like
                      to talk about?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      &ldquo;No pressure at all, but I&rsquo;m here if you ever
                      want to chat.&rdquo;
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Responding to Disclosures
                </p>
                <p className="text-sm text-white/80 mb-3">
                  When someone opens up about their mental health, how you
                  respond in the first few seconds sets the tone for the entire
                  conversation:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Thank them:</strong>{" "}
                      &ldquo;Thank you for telling me &mdash; I know that
                      wasn&rsquo;t easy.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Acknowledge:</strong>{" "}
                      &ldquo;That sounds really difficult.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Reassure:</strong>{" "}
                      &ldquo;You&rsquo;re not alone in this &mdash; there is
                      support available.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Give space:</strong>{" "}
                      &ldquo;Take your time &mdash; there&rsquo;s no
                      rush.&rdquo;
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">
                    If Someone Becomes Distressed
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Stay calm &mdash; your composure helps regulate their
                      emotional state
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Do not try to stop them from crying &mdash; tears are a
                      healthy release
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Use short, grounding phrases: &ldquo;I&rsquo;m right
                      here&rdquo;, &ldquo;You&rsquo;re safe&rdquo;,
                      &ldquo;Take your time&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Offer water and suggest slow breathing if they are
                      hyperventilating
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Do not leave them alone unless they ask &mdash; and even
                      then, stay nearby
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">
                  What NOT to Say
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      &ldquo;I know exactly how you feel&rdquo; &mdash; you do
                      not, and this can feel dismissive
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      &ldquo;At least&hellip;&rdquo; &mdash; minimises their
                      pain by comparing it to something else
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      &ldquo;You should&hellip;&rdquo; &mdash; unsolicited
                      advice rarely helps and can feel controlling
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      &ldquo;Snap out of it&rdquo; &mdash; implies the person is
                      choosing to feel this way
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      &ldquo;Think positive&rdquo; &mdash; invalidates their
                      experience and oversimplifies recovery
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">
                    Silence Is OK
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  One of the hardest things about having a mental health
                  conversation is resisting the urge to fill every silence. But
                  silence is not emptiness &mdash; it is processing time.
                  When someone pauses, they may be gathering the courage to say
                  something important, or simply organising their thoughts.
                  Sit with the silence. Maintain gentle eye contact. Let them
                  know through your body language that you are still there and
                  that there is no rush. Some of the most powerful moments in
                  a conversation happen in the silences between words.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Showing Empathy
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Empathy is not the same as sympathy. Sympathy says &ldquo;I
                  feel sorry for you&rdquo;; empathy says &ldquo;I am trying to
                  understand what it feels like to be you.&rdquo; You can show
                  empathy by:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Reflecting their feelings: &ldquo;That must feel
                      incredibly lonely&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Using your tone of voice to convey warmth and care
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Matching their emotional register &mdash; do not be
                      cheerful if they are in pain
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Being genuine &mdash; people can sense when someone is
                      going through the motions
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  06 — Cultural Sensitivity                                   */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">06</span>
            Cultural Sensitivity
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mental health is experienced and expressed differently across
                cultures, communities, and individuals. What is considered a
                normal expression of distress in one culture may be unfamiliar
                in another. As a mental health first aider, cultural sensitivity
                means being aware of these differences and adapting your
                approach without making assumptions or stereotyping.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Cultural Differences in Mental Health Expression
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Somatic expressions:
                      </strong>{" "}
                      In many cultures, emotional distress manifests as physical
                      symptoms &mdash; headaches, stomach pain, fatigue &mdash;
                      rather than being described in psychological terms
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Stigma and shame:
                      </strong>{" "}
                      Some communities carry deep stigma around mental illness,
                      viewing it as a personal weakness, a curse, or a source of
                      family shame
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Emotional expression norms:
                      </strong>{" "}
                      Some cultures encourage open emotional expression while
                      others value stoicism and restraint &mdash; neither is
                      right or wrong
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Help-seeking behaviour:
                      </strong>{" "}
                      Some communities prefer to seek support from religious
                      leaders, elders, or family members rather than from
                      healthcare professionals
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-2">
                  Language Barriers
                </p>
                <p className="text-sm text-white/80">
                  When working with someone whose first language is not English,
                  speak slowly, use simple sentences, and avoid idioms and slang.
                  Phrases like &ldquo;feeling under the weather&rdquo; or
                  &ldquo;at the end of your tether&rdquo; may not translate.
                  Check understanding regularly, use visual aids or translation
                  tools if available, and be patient. If possible and with
                  consent, involve a bilingual colleague. The effort you make
                  to communicate across a language barrier is itself an act of
                  care.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Religious &amp; Spiritual Perspectives
                </p>
                <p className="text-sm text-white/80 mb-3">
                  For many people, religious faith or spiritual beliefs are
                  central to how they understand and cope with mental distress.
                  Some may view their experience through a spiritual lens or
                  prefer prayer, meditation, or guidance from a religious leader
                  as their primary support.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Respect their beliefs &mdash; do not dismiss spiritual
                      explanations as &ldquo;wrong&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Ask what would be most helpful for them &mdash; they may
                      want both spiritual and professional support
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Be aware that some religious communities may discourage
                      seeking professional mental health treatment
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-violet-500/10 border border-violet-500/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-violet-400" />
                    <p className="text-sm font-medium text-violet-400">
                      LGBTQ+ Considerations
                    </p>
                  </div>
                  <ul className="text-xs text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        LGBTQ+ individuals are at higher risk of anxiety,
                        depression, and suicidal ideation due to discrimination
                        and minority stress
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Use inclusive language and avoid assumptions about
                        relationships or identity
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        The construction industry can be a particularly hostile
                        environment &mdash; be mindful of this context
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Respect pronouns and names &mdash; if unsure, ask:
                        &ldquo;How would you like me to refer to you?&rdquo;
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-violet-500/10 border border-violet-500/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="h-5 w-5 text-violet-400" />
                    <p className="text-sm font-medium text-violet-400">
                      Neurodiversity
                    </p>
                  </div>
                  <ul className="text-xs text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Autistic individuals, those with ADHD, dyslexia, or
                        other neurodiverse conditions may communicate and process
                        emotions differently
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Eye contact may be uncomfortable &mdash; adapt the SOLER
                        model accordingly
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Be clear and direct in your language &mdash; avoid
                        figurative speech and ambiguity
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Allow extra processing time and do not rush responses
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Adapting Without Stereotyping
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Cultural sensitivity is about{" "}
                  <strong className="text-white">awareness</strong> and{" "}
                  <strong className="text-white">flexibility</strong>, not about
                  making assumptions based on someone&rsquo;s background. The
                  best approach is always to ask: &ldquo;Is there anything about
                  your background or beliefs that it would be helpful for me to
                  know?&rdquo; or &ldquo;How can I best support you?&rdquo;
                  Treat each person as an individual. Their culture is part of
                  their identity, not a script that dictates their behaviour.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ── FAQ Section ────────────────────────────────────────── */}
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

        {/* ── Quiz ───────────────────────────────────────────────── */}
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* ── Bottom Navigation ──────────────────────────────────── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-purple-500 text-white hover:bg-purple-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-2">
              Next: Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
