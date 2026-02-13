import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Heart, MessageCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh3s1-bystander-effect",
    question: "What is the 'bystander effect' in the context of mental health conversations?",
    options: [
      "A medical condition that causes bystanders to feel dizzy when someone is unwell",
      "The phenomenon where everyone assumes someone else will start the conversation, so nobody does",
      "A legal requirement for bystanders to provide first aid on construction sites",
      "The tendency for bystanders to overreact when they notice someone struggling"
    ],
    correctIndex: 1,
    explanation: "The bystander effect is a well-documented psychological phenomenon where the presence of other people reduces each individual's sense of personal responsibility to act. In mental health, this means that when several colleagues notice someone is struggling, each person assumes someone else — a closer friend, a supervisor, a mental health first aider — will start the conversation. The result is that nobody does, and the person suffers in silence."
  },
  {
    id: "mh3s1-early-intervention",
    question: "Why is early intervention so important for mental health problems?",
    options: [
      "Because mental health conditions are only treatable if caught in the first week",
      "Because the earlier someone receives support, the better the outcome — preventing escalation from manageable distress to crisis",
      "Because employers are legally required to intervene within 24 hours of noticing symptoms",
      "Because early intervention is cheaper for the NHS than late intervention"
    ],
    correctIndex: 1,
    explanation: "Research consistently shows that early intervention leads to significantly better outcomes for mental health conditions. Most mental health problems are treatable and many are highly responsive to early support. When someone receives help early — whether that is a supportive conversation, a GP visit, or counselling — they are far more likely to recover quickly and fully. Without early support, manageable distress can escalate into crisis, requiring more intensive and longer-term treatment."
  },
  {
    id: "mh3s1-perfect-words",
    question: "When starting a mental health conversation with a colleague, which of the following is MOST accurate?",
    options: [
      "You must use clinically approved language or you could make things worse",
      "You should wait until you have completed a mental health first aid course before approaching anyone",
      "You do not need to say the perfect thing — showing you care and are willing to listen matters far more than having the right words",
      "You should only start the conversation if you are confident you can solve their problem"
    ],
    correctIndex: 2,
    explanation: "One of the biggest barriers to starting mental health conversations is the belief that you need to say the perfect thing. In reality, what matters most is that you show genuine care and a willingness to listen. Research from the Samaritans and Mind consistently shows that simply being present, showing concern, and listening without judgement is far more powerful than having the 'right' words. An imperfect conversation that happens is always better than a perfect conversation that never takes place."
  }
];

const faqs = [
  {
    question: "What if I try to start a conversation and the person gets angry or defensive?",
    answer: "This is a very common concern, but it is important to understand that anger or defensiveness is often a sign that you have touched on something real. Many people — especially in construction — have been taught to hide their feelings, so being asked about them can feel threatening. If someone reacts defensively, do not take it personally. Simply say something like: 'That is OK — I just wanted you to know I am here if you ever want to chat.' Then leave the door open. Many people will come back to you later when they have had time to process. The fact that you cared enough to ask plants a seed, even if the immediate response is negative."
  },
  {
    question: "Is it my responsibility to help colleagues with their mental health?",
    answer: "You are not responsible for anyone else's mental health — that is an important boundary. What you are responsible for is being a decent human being and a supportive colleague. Starting a conversation is not the same as becoming someone's therapist. It simply means noticing when someone is struggling, showing that you care, and pointing them towards professional help if needed. Think of it like physical first aid: if a colleague cut their hand, you would not walk past and say 'not my problem.' You would help them clean it up and suggest they see a medic if it was serious. Mental health conversations work the same way."
  },
  {
    question: "How do I know if someone is struggling if they seem fine on the surface?",
    answer: "Many people — particularly in construction — are skilled at hiding their feelings behind a mask of normality or even humour. Look for changes rather than states: someone who was chatty becoming quiet, someone reliable becoming forgetful, someone calm becoming irritable, someone social becoming withdrawn. Other signs include changes in appearance or hygiene, increased use of alcohol or substances, dark or self-deprecating humour, frequent absences, or seeming distracted or 'not there.' You do not need to be certain someone is struggling to ask if they are OK. If your gut tells you something is off, trust it."
  },
  {
    question: "What if I start a conversation and the person tells me something I cannot handle?",
    answer: "This is a valid concern, but remember: your role is to listen and signpost, not to solve. If someone discloses something serious — such as suicidal thoughts, abuse, or a crisis — you do not need to handle it alone. Listen calmly, take them seriously, and help them connect with professional support. Key numbers to have: Samaritans (116 123, free, 24/7), Construction Industry Helpline (0345 605 1956), or in an emergency, call 999. You can also speak to your site mental health first aider, your supervisor, or your occupational health team. After the conversation, make sure you look after your own wellbeing too — supporting someone through a disclosure can be emotionally draining."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to mental health statistics, approximately how many people will experience a mental health problem in any given year?",
    options: [
      "1 in 20 — it is relatively rare",
      "1 in 10 — about 10% of the population",
      "1 in 4 — approximately 25% of the population",
      "1 in 2 — about half of all people"
    ],
    correctAnswer: 2,
    explanation: "Research from Mind and the NHS consistently shows that approximately 1 in 4 people in the UK will experience a mental health problem in any given year. This means that on a construction site with 20 workers, at least 5 are likely to be experiencing a mental health problem right now. This statistic highlights why mental health conversations are not a niche concern — they are relevant to every workplace and every team."
  },
  {
    id: 2,
    question: "What is the MOST significant barrier that prevents people from starting a mental health conversation with a struggling colleague?",
    options: [
      "Lack of access to a private room on site",
      "Not having a formal qualification in mental health support",
      "Fear of saying the wrong thing or making the situation worse",
      "Company policy prohibiting personal conversations during work hours"
    ],
    correctAnswer: 2,
    explanation: "Research consistently identifies the fear of saying the wrong thing as the single biggest barrier to starting mental health conversations. People worry that they might make things worse, use insensitive language, or not know what to do with the response. This fear is understandable but misplaced — the evidence overwhelmingly shows that a caring but imperfect conversation is far better than silence. The real harm comes from saying nothing at all."
  },
  {
    id: 3,
    question: "Why are construction workers described as being 'especially good at hiding' mental health problems?",
    options: [
      "Because construction workers have fewer mental health problems than other professions",
      "Because of the industry's culture of toughness, stoicism, and 'getting on with it' that discourages showing vulnerability",
      "Because construction workers receive special training in concealing emotions",
      "Because construction sites are too noisy for anyone to notice changes in behaviour"
    ],
    correctAnswer: 1,
    explanation: "The construction industry has a deeply embedded culture of toughness, resilience, and stoicism. Workers are often expected to 'man up,' 'crack on,' and never show weakness. This culture — while it can build camaraderie and resilience in some contexts — creates a powerful barrier to opening up about mental health. Many construction workers become experts at wearing a mask, hiding their struggles behind humour, bravado, or simply staying quiet. This is a significant factor in the industry's tragically high suicide rate."
  },
  {
    id: 4,
    question: "When someone says 'it is not my business' as a reason for not starting a mental health conversation, what is the most helpful reframe?",
    options: [
      "They are correct — mental health is a private matter and should never be discussed at work",
      "They should be formally disciplined for failing to support a colleague",
      "While respecting privacy is important, showing concern for a colleague's wellbeing is not intrusion — it is basic human decency and good teamwork",
      "They should report their concerns to HR and let professionals handle it"
    ],
    correctAnswer: 2,
    explanation: "The 'it is not my business' response comes from a genuine desire to respect someone's privacy, which is admirable. However, the reframe is this: noticing that someone is struggling and expressing concern is not the same as prying into their private life. You would not walk past a colleague who had fallen off a ladder and say 'not my business.' Showing concern for someone's wellbeing is part of being a good colleague and teammate. You can respect someone's privacy while still letting them know you have noticed and you care."
  },
  {
    id: 5,
    question: "Research shows that a single supportive conversation can significantly reduce someone's distress. Why is this?",
    options: [
      "Because talking cures all mental health conditions permanently",
      "Because feeling heard and understood reduces the isolation that amplifies mental health problems, and the person realises they are not alone",
      "Because the listener can always provide the correct medical advice",
      "Because once someone has talked about their problems, the problems automatically disappear"
    ],
    correctAnswer: 1,
    explanation: "One of the most damaging aspects of mental health problems is the isolation they create. When someone is struggling, they often feel alone, abnormal, and ashamed. A single supportive conversation breaks through that isolation. It tells the person: 'You are not alone. Someone has noticed. Someone cares.' Research from the Samaritans shows that feeling heard and understood — even briefly — can significantly reduce distress and suicidal ideation. The conversation does not need to fix anything; it simply needs to make the person feel less alone."
  },
  {
    id: 6,
    question: "What does 'the escalation cycle' refer to in the context of mental health at work?",
    options: [
      "The process by which someone gets progressively angrier during a disagreement",
      "The disciplinary escalation process for poor performance at work",
      "The pattern where untreated mental health problems worsen over time — from manageable stress to distress to crisis — when no one intervenes",
      "The increase in mental health awareness campaigns in the construction industry"
    ],
    correctAnswer: 2,
    explanation: "The escalation cycle describes how mental health problems tend to worsen when left unaddressed. What begins as manageable stress or low mood can escalate to persistent anxiety or depression, then to crisis, self-harm, or suicidal thoughts. At each stage, intervention becomes more difficult and recovery takes longer. A 5-minute conversation early in the cycle can prevent a 5-month crisis later. This is why early intervention — even an informal 'Are you OK?' — is so valuable."
  },
  {
    id: 7,
    question: "Which of the following is TRUE about starting a mental health conversation?",
    options: [
      "You need to be a trained counsellor or mental health professional to have the conversation",
      "The conversation must take place in a formal, clinical setting to be effective",
      "You do not need to fix anything — simply showing you care and are willing to listen is what matters most",
      "You should avoid the conversation unless you are absolutely certain the person has a diagnosed mental health condition"
    ],
    correctAnswer: 2,
    explanation: "The most important thing about a mental health conversation is not your qualifications, the setting, or your ability to diagnose or fix. It is simply the act of showing genuine care and willingness to listen. Research consistently shows that people who are struggling value being heard and understood far more than receiving advice or solutions. You do not need to be a counsellor. You do not need to have all the answers. You just need to care enough to ask and listen."
  },
  {
    id: 8,
    question: "A colleague on your construction site has become noticeably withdrawn over the past few weeks. You want to approach them but are worried about saying the wrong thing. What is the BEST course of action?",
    options: [
      "Wait and hope the problem resolves itself — it is probably just a bad week",
      "Report your concerns to their supervisor and let them handle it",
      "Approach them privately and gently, acknowledging you have noticed a change and offering to listen — even if you do not have the perfect words",
      "Send them a text message with the Samaritans number and avoid face-to-face conversation"
    ],
    correctAnswer: 2,
    explanation: "The best course of action is to approach the person directly, privately, and with genuine care. Waiting and hoping is the most common response, but it allows the situation to worsen. Reporting to a supervisor without speaking to the person first can feel like a betrayal. A text with a helpline number, while well-intentioned, lacks the personal connection that makes the difference. The most effective approach is a face-to-face, private conversation where you acknowledge what you have noticed, express concern, and offer to listen. Your words do not need to be perfect — your presence and care are what matter."
  }
];

export default function MentalHealthModule3Section1() {
  useSEO({
    title: "Why Conversations Matter | Mental Health Module 3.1",
    description: "Understand why starting mental health conversations is vital in construction, overcome common barriers, and learn how a single conversation can change everything.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <MessageCircle className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Why Conversations Matter
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            How one conversation can change everything, why silence is the real danger, and how you can overcome the barriers that stop people reaching out
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>1 in 4:</strong> At least 5 people on a 20-person site are struggling right now</li>
              <li><strong>One conversation:</strong> Feeling heard reduces distress significantly</li>
              <li><strong>You don&rsquo;t need to fix:</strong> Just showing you care is enough</li>
              <li><strong>Silence hurts:</strong> Saying nothing is worse than saying something imperfect</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Construction:</strong> Highest suicide rate of any industry in the UK</li>
              <li><strong>Culture:</strong> Toughness culture means people hide their pain</li>
              <li><strong>Early help:</strong> A 5-minute chat can prevent a 5-month crisis</li>
              <li><strong>Your role:</strong> You do not need to be a professional to make a difference</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain why starting a mental health conversation matters in a construction context",
              "Describe the 1-in-4 reality and its implications for every construction team",
              "Understand why early intervention leads to significantly better outcomes",
              "Identify the common barriers that prevent people from starting conversations",
              "Recognise the bystander effect and how it operates on construction sites",
              "Build confidence to approach someone you are concerned about"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Power of a Single Conversation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Power of a Single Conversation
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There is a moment &mdash; a single, quiet moment &mdash; that can change the entire trajectory
                of someone&rsquo;s mental health. It is not a prescription. It is not a therapy session. It is
                not a referral to a specialist. It is the moment when someone looks another person in the eye
                and says: <strong>&ldquo;I&rsquo;ve noticed you don&rsquo;t seem yourself lately. Are you OK?&rdquo;</strong>
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">What the Research Says</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>&ldquo;Feeling heard and understood is one of the most powerful antidotes to psychological distress.&rdquo;</strong>
                </p>
                <p className="text-sm text-white/80 mt-2">
                  Research from the Samaritans, Mind, and numerous academic studies consistently shows that feeling
                  listened to and understood &mdash; even briefly &mdash; can significantly reduce distress,
                  hopelessness, and suicidal ideation. The listener does not need to be a professional. They
                  simply need to be present, genuine, and caring.
                </p>
              </div>

              <p>
                Think of a supportive conversation as the <strong>connective tissue between noticing and helping</strong>.
                You might notice that your colleague has been quieter than usual. You might spot that someone
                who always had a joke is now keeping to themselves. You might realise that the apprentice who
                was always keen is now constantly distracted. Noticing is the first step &mdash; but it means
                nothing if it does not lead to a conversation. The conversation is what bridges the gap between
                &ldquo;I think something is wrong&rdquo; and &ldquo;How can I help?&rdquo;
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">You Do Not Need to Fix Anything</p>
                <p className="text-sm text-white leading-relaxed mb-3">
                  One of the most common misconceptions about mental health conversations is that you need to
                  have solutions. You do not. In fact, jumping straight to solutions can sometimes be unhelpful
                  because it can make the person feel that their feelings are being dismissed or minimised.
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Your role is not to diagnose</strong> &mdash; you are not a doctor, and you do not need to be</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Your role is not to treat</strong> &mdash; you are not a therapist, and nobody expects you to be</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Your role is not to fix</strong> &mdash; some problems do not have quick fixes, and that is OK</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Your role IS to care</strong> &mdash; to notice, to ask, to listen, and to show that someone matters</span>
                  </li>
                </ul>
              </div>

              <p>
                The Samaritans describe this beautifully: <strong>&ldquo;You don&rsquo;t have to be an expert
                to support someone. Just being there and listening can make a huge difference.&rdquo;</strong>
                On construction sites across the UK, stories emerge every year of how one conversation &mdash;
                often an informal chat over a cup of tea, or a quiet word at the end of the day &mdash;
                changed everything for someone who was on the edge. These conversations are not dramatic.
                They are not complicated. They are simply human beings caring about each other.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Real Impact</p>
                </div>
                <p className="text-sm text-white">
                  A study by the Construction Industry Helpline found that <strong>78% of callers</strong> said
                  they had not spoken to anyone about their problems before making the call. For many, the call
                  was their first experience of being heard. Imagine if a colleague had started that conversation
                  earlier. Imagine the weeks or months of silent suffering that could have been prevented by a
                  simple: <strong>&ldquo;Are you alright, mate?&rdquo;</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The 1-in-4 Reality */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The 1-in-4 Reality
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The statistic is stark and unavoidable: <strong>1 in 4 people in the UK will experience a mental
                health problem in any given year</strong>. That is not a lifetime figure &mdash; that is every
                single year. It means that on a construction site with 20 workers, at least 5 are likely
                experiencing a mental health problem right now. On a large project with 200 people, that
                number rises to at least 50.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">The Numbers on Your Site</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Small Team (8 people)</p>
                    <p>At least 2 people are experiencing a mental health problem. That could be anyone &mdash; the quietest person on the team or the loudest. The newest apprentice or the most experienced hand.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Medium Site (40 people)</p>
                    <p>At least 10 people are affected. That is enough to fill an entire section of a site. Walking through the canteen at break, you are sitting near several people who are struggling in silence.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Large Project (200 people)</p>
                    <p>At least 50 people. Fifty colleagues dealing with anxiety, depression, grief, addiction, relationship breakdown, financial stress, or other mental health challenges &mdash; often alone.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">The Construction Industry</p>
                    <p>With over 2.1 million workers in UK construction, approximately 525,000 are experiencing a mental health problem at any given time. The industry also has the highest male suicide rate of any sector.</p>
                  </div>
                </div>
              </div>

              <p>
                These are not just numbers. These are your colleagues, your mates, the people you share a
                van with, eat lunch with, and work alongside every day. And here is the thing that makes these
                statistics even more important: <strong>you cannot always tell by looking</strong>.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Hidden Nature of Mental Illness</p>
                </div>
                <p className="text-sm text-white">
                  Unlike a broken bone or a visible injury, mental health problems are largely invisible. Someone
                  can be experiencing crippling anxiety, deep depression, or suicidal thoughts while appearing
                  completely &ldquo;normal&rdquo; to everyone around them. In construction, the culture of
                  toughness and stoicism means that workers become <strong>especially skilled at hiding their pain</strong>.
                  The person cracking jokes in the canteen might be the one struggling most. The worker who
                  never misses a day might be fighting just to get out of bed every morning.
                </p>
              </div>

              <p>
                Construction workers are particularly good at hiding mental health problems for several reasons.
                The industry has traditionally valued toughness, resilience, and &ldquo;getting on with it.&rdquo;
                Showing vulnerability has historically been seen as weakness. The banter culture, while often
                enjoyable, can make it difficult to switch from joking to serious conversation. And the transient
                nature of construction work &mdash; moving from site to site, working with different teams &mdash;
                means that deep relationships can be harder to form. All of this creates an environment where
                people suffer in silence because they believe nobody would understand, nobody would care, or
                that speaking up would damage their reputation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Signs Someone Might Be Struggling</p>
                <p className="text-sm text-white mb-3">
                  Even though people hide their pain, changes in behaviour can be clues. Look for patterns
                  rather than single incidents:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Withdrawal</strong> &mdash; someone who was sociable becoming quiet and keeping to themselves</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Irritability</strong> &mdash; someone normally calm becoming short-tempered or aggressive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Concentration</strong> &mdash; making unusual mistakes, seeming distracted or &ldquo;miles away&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Attendance</strong> &mdash; frequent absences, arriving late, leaving early</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Appearance</strong> &mdash; changes in hygiene, weight loss or gain, looking tired</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Humour</strong> &mdash; dark or self-deprecating jokes, &ldquo;joking&rdquo; about not wanting to be here</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Early Intervention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Early Intervention
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The evidence is overwhelming and unambiguous: <strong>the earlier someone receives support for a
                mental health problem, the better the outcome</strong>. This is true across virtually every
                mental health condition &mdash; from anxiety and depression to more serious conditions like
                psychosis and bipolar disorder. Early support leads to faster recovery, less severe symptoms,
                shorter treatment duration, and a significantly lower risk of crisis.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Escalation Cycle</p>
                <p className="text-sm text-white mb-3">
                  When no one intervenes, mental health problems tend to follow a predictable pattern of
                  escalation. Understanding this cycle helps illustrate why early conversations are so critical:
                </p>
                <div className="space-y-3">
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold text-sm mb-1">Stage 1: Manageable Stress</p>
                    <p className="text-sm text-white">The person is under pressure but coping. They might seem a bit tired or preoccupied. <strong>A simple &ldquo;How are you doing?&rdquo; at this stage can make all the difference.</strong> The person feels seen, supported, and less alone.</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold text-sm mb-1">Stage 2: Growing Distress</p>
                    <p className="text-sm text-white">Without support, stress compounds. Sleep is affected. Concentration drops. Irritability increases. The person starts withdrawing. <strong>At this stage, a supportive conversation and encouragement to see their GP can halt the decline.</strong></p>
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/30 p-3 rounded-lg">
                    <p className="text-orange-400 font-semibold text-sm mb-1">Stage 3: Significant Difficulty</p>
                    <p className="text-sm text-white">The person is now struggling significantly. Work performance drops. Relationships are affected. They may be using alcohol or other substances to cope. <strong>Intervention is still very effective here but requires more courage to initiate.</strong></p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold text-sm mb-1">Stage 4: Crisis</p>
                    <p className="text-sm text-white">Without any support, the person reaches crisis point. This might mean a mental health breakdown, self-harm, suicidal thoughts or attempts, or complete inability to function. <strong>Recovery from this stage is still possible but takes much longer and requires professional intervention.</strong></p>
                  </div>
                </div>
              </div>

              <p>
                The key message is this: <strong>a 5-minute conversation at Stage 1 can prevent a 5-month
                crisis at Stage 4</strong>. Most mental health conditions are highly treatable, especially
                when caught early. Depression responds well to therapy and medication. Anxiety can be managed
                with techniques and support. Even serious conditions like PTSD and bipolar disorder have
                significantly better outcomes when intervention occurs early.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Construction Context</p>
                <p className="text-sm text-white">
                  In construction, the consequences of late intervention are especially severe. A worker in
                  crisis is a safety risk &mdash; to themselves and to others. Distracted, exhausted, or
                  impaired workers operating heavy machinery, working at height, or handling live electrical
                  systems are in danger. Beyond the immediate safety implications, late intervention means
                  time off work, lost income (especially for self-employed workers), damaged relationships,
                  and a much longer road to recovery. Early conversations are not just kind &mdash;
                  <strong> they are a safety intervention</strong>.
                </p>
              </div>

              <p>
                The NHS estimates that the cost of treating mental health problems increases by a factor of
                five for every stage of escalation that passes without intervention. But more importantly
                than the cost, think about the human impact. Every week of unnecessary suffering is a week
                that could have been different if someone had cared enough to ask a simple question.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Why People Don't Start the Conversation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Why People Don&rsquo;t Start the Conversation
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If conversations are so powerful, why do so few people start them? The answer lies in a series
                of deeply human fears and assumptions that create invisible barriers. Understanding these
                barriers is the first step towards overcoming them.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Six Most Common Barriers</p>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-2">1. Fear of Saying the Wrong Thing</p>
                    <p className="text-sm text-white">
                      This is the number one barrier, cited in virtually every study on the subject. People
                      worry that they will use the wrong words, accidentally offend, trivialise the person&rsquo;s
                      experience, or make things worse. This fear is understandable but misplaced. The evidence
                      is clear: <strong>an imperfect conversation that happens is infinitely better than a perfect
                      conversation that never takes place</strong>. The person will remember that you cared
                      enough to ask, not whether your words were textbook-perfect.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-2">2. &ldquo;It&rsquo;s Not My Business&rdquo;</p>
                    <p className="text-sm text-white">
                      Many people avoid mental health conversations because they feel it is not their place to
                      ask about someone&rsquo;s personal life. While respecting boundaries is important, this
                      barrier confuses intrusion with concern. <strong>Asking someone if they are OK is not
                      prying &mdash; it is caring.</strong> You would not walk past a colleague who had fallen
                      and say &ldquo;not my business.&rdquo; Mental health deserves the same basic human
                      response.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-2">3. Not Knowing What to Do With the Answer</p>
                    <p className="text-sm text-white">
                      &ldquo;What if they tell me something awful and I do not know what to do?&rdquo; This is
                      a genuine concern, but the reality is that most mental health conversations do not involve
                      dramatic disclosures. Most of the time, the person will simply appreciate being asked and
                      may share that they are going through a tough time. Your job is to listen and signpost to
                      help if needed &mdash; not to be a therapist. And even if they do disclose something
                      serious, <strong>you are not alone &mdash; helplines, mental health first aiders,
                      GPs, and other support services exist for exactly this reason</strong>.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-2">4. Fear of Making Things Worse</p>
                    <p className="text-sm text-white">
                      Some people worry that raising the subject of mental health could somehow make the
                      person feel worse or even &ldquo;put ideas in their head.&rdquo; This is a myth.
                      Research consistently shows that <strong>asking someone about their mental health &mdash;
                      including directly asking about suicidal thoughts &mdash; does not increase risk</strong>.
                      In fact, it reduces risk by making the person feel less isolated and more supported.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-2">5. Worrying About Confidentiality</p>
                    <p className="text-sm text-white">
                      &ldquo;What if they tell me something I am supposed to report?&rdquo; or &ldquo;What if
                      word gets around?&rdquo; Confidentiality is important, and the person needs to trust
                      that what they share will be treated with respect. A good approach is to be honest from
                      the start: <strong>&ldquo;Anything you tell me stays between us, unless I am worried
                      about your safety or someone else&rsquo;s safety.&rdquo;</strong> This sets a clear,
                      honest boundary while still creating a safe space.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-2">6. The Bystander Effect</p>
                    <p className="text-sm text-white">
                      The bystander effect is a well-documented psychological phenomenon: when multiple people
                      witness someone in need, each individual is <strong>less likely to help because they assume
                      someone else will</strong>. On a construction site, this translates to: &ldquo;His mates
                      will look after him,&rdquo; &ldquo;The supervisor will notice,&rdquo; &ldquo;The mental
                      health first aider will deal with it.&rdquo; The result? Everyone assumes someone else
                      will start the conversation, and nobody does.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Harsh Truth</p>
                </div>
                <p className="text-sm text-white">
                  Every one of these barriers is understandable. Every one of them is human. And every one
                  of them, if left unchallenged, contributes to a culture of silence that costs lives.
                  In the construction industry, <strong>two workers take their own lives every single working
                  day</strong>. Behind that devastating statistic are real people who felt they had nobody to
                  talk to, that nobody had noticed, or that nobody cared enough to ask.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Overcoming Your Own Barriers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Overcoming Your Own Barriers
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Now that we have named the barriers, let us dismantle them one by one. The good news is that
                starting a mental health conversation is <strong>much simpler than you think</strong>. You do
                not need special training. You do not need to be a counsellor. You do not need to have all
                the answers. You just need to care, to be willing to listen, and to take that first step.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Reframing Your Role</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>You are not a counsellor</strong> &mdash; you are a colleague who cares. That is enough.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>The conversation does not have to be perfect</strong> &mdash; it just has to happen. Stumbling over your words while genuinely trying is better than smooth silence.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>It is worse to say nothing</strong> &mdash; than to say something imperfect. The only truly wrong thing to say is nothing at all.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>You do not need all the answers</strong> &mdash; you just need to know where to point people. Key numbers: Samaritans 116 123, Construction Industry Helpline 0345 605 1956.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Asking about mental health does not make things worse</strong> &mdash; it is a myth. Asking shows care and reduces isolation.</span>
                  </li>
                </ul>
              </div>

              <p>
                Building your confidence to approach someone is a process, and like any skill, it gets easier
                with practice. Here are some practical strategies to help you build your confidence:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Practical Confidence-Building Strategies</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Start With Low-Stakes Conversations</p>
                    <p>Practise asking &ldquo;How are you really doing?&rdquo; with people you are close to &mdash; friends, family, colleagues you trust. Get comfortable with the question before using it with someone who may be struggling.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Prepare a Few Opening Lines</p>
                    <p>Having two or three go-to phrases ready reduces anxiety. &ldquo;I have noticed you seem a bit different lately &mdash; is everything OK?&rdquo; is simple, non-intrusive, and opens the door without forcing it.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Choose the Right Moment</p>
                    <p>You do not need to have the conversation in front of everyone. A quiet word at break, walking to the van, or at the end of the day is ideal. Privacy reduces pressure for both of you.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Accept That It Might Be Awkward</p>
                    <p>The first time you do this, it will probably feel a bit uncomfortable. That is normal. Awkwardness is not a reason to avoid the conversation &mdash; it is simply the price of doing something courageous.</p>
                  </div>
                </div>
              </div>

              <p>
                Remember: courage is not the absence of fear &mdash; it is taking action despite the fear.
                Every time you start a mental health conversation, you are doing something brave. You are
                choosing to prioritise someone else&rsquo;s wellbeing over your own discomfort. And that is
                exactly what construction workers do every day in other contexts &mdash; working at height,
                handling hazardous materials, operating under pressure. If you can do that, you can
                absolutely have a conversation about how someone is feeling.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Think of It Like Physical First Aid</p>
                <p className="text-sm text-white">
                  If a colleague on site cut their hand badly, you would not walk past. You would not think
                  &ldquo;I am not a doctor, so I should not get involved.&rdquo; You would not worry about
                  getting the bandaging technique wrong. You would help. You would do what you could with
                  what you knew, and then you would get them to someone who could do more. <strong>Mental
                  health first aid works exactly the same way.</strong> Notice. Ask. Listen. Signpost.
                  You do not need to be an expert. You just need to be human.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has established why starting conversations about mental health matters so much,
                particularly in the construction industry. The key points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>One conversation can change everything</strong> &mdash; feeling heard reduces distress, breaks isolation, and can alter the trajectory of someone&rsquo;s mental health.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>1 in 4 people</strong> are affected in any given year &mdash; on your site, right now, people are struggling in silence. You cannot always tell by looking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Early intervention works</strong> &mdash; a 5-minute conversation at Stage 1 can prevent a 5-month crisis at Stage 4. Most conditions are treatable.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Common barriers are real but surmountable</strong> &mdash; fear of saying the wrong thing, the bystander effect, and &ldquo;it&rsquo;s not my business&rdquo; all stop people from acting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>You do not need to be a professional</strong> &mdash; you just need to care enough to notice, ask, and listen. An imperfect conversation beats perfect silence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Confidence builds with practice</strong> &mdash; start with low-stakes conversations, prepare opening lines, and accept that a little awkwardness is the price of courage.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 2, we will explore the ALGEE
                  Action Plan &mdash; Mental Health First Aid&rsquo;s evidence-based, 5-step framework for
                  supporting someone experiencing a mental health problem. You will learn a structured approach
                  that gives you confidence to act, from the initial approach through to encouraging
                  professional help.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Helplines</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Samaritans:</strong> 116 123 (free, 24/7, 365 days a year)</li>
                  <li><strong>Construction Industry Helpline:</strong> 0345 605 1956</li>
                  <li><strong>Mind Infoline:</strong> 0300 123 3393</li>
                  <li><strong>Emergency:</strong> 999</li>
                </ul>
              </div>
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
        <Quiz
          title="Section 1 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-3-section-2">
              Next: The ALGEE Action Plan
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
