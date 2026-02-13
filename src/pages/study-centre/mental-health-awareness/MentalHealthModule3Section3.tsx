import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Ear, Heart, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh3s3-soler-model",
    question: "What does the SOLER model stand for in active listening?",
    options: [
      "Speak, Observe, Listen, Empathise, Respond",
      "Sit squarely, Open posture, Lean in, Eye contact, Relax",
      "Stop, Open up, Look around, Evaluate, React",
      "Stand close, Offer advice, Lean back, Express sympathy, Repeat"
    ],
    correctIndex: 1,
    explanation: "The SOLER model, developed by Gerard Egan, provides a framework for physically showing that you are listening: Sit squarely (face the person), Open posture (uncrossed arms and legs), Lean in slightly (showing interest), Eye contact (comfortable, not intense), and Relax (be natural, not stiff or anxious). These physical cues communicate attentiveness and openness even before you say a word."
  },
  {
    id: "mh3s3-empathy-vs-sympathy",
    question: "What is the key difference between empathy and sympathy in a mental health conversation?",
    options: [
      "Empathy and sympathy are the same thing — both mean feeling sorry for someone",
      "Empathy means trying to understand and share the person's feelings from their perspective; sympathy means feeling pity or sorrow for them from the outside",
      "Sympathy is more professional than empathy, so it should always be used in a workplace",
      "Empathy means agreeing with everything the person says; sympathy means disagreeing constructively"
    ],
    correctIndex: 1,
    explanation: "This is a crucial distinction. Empathy involves making the effort to understand someone's experience from their perspective — stepping into their shoes, even briefly. It communicates: 'I am trying to understand what this is like for you.' Sympathy, by contrast, involves feeling pity or sorrow for someone from the outside — looking down on their situation. It communicates: 'I feel bad for you.' In a mental health conversation, empathy connects and validates; sympathy can inadvertently create distance and a sense of being pitied."
  },
  {
    id: "mh3s3-common-mistake",
    question: "Which of the following is the MOST common listening mistake people make during mental health conversations?",
    options: [
      "Maintaining too much eye contact with the other person",
      "Asking too many questions about the person's childhood",
      "Jumping to solutions and advice instead of simply listening and allowing the person to feel heard",
      "Using too many clinical or medical terms during the conversation"
    ],
    correctIndex: 2,
    explanation: "The most common listening mistake — especially among construction workers who are natural problem-solvers — is jumping straight to solutions. When someone shares that they are struggling, the instinct is to fix it: 'Have you tried...?', 'You should...', 'What you need to do is...' While well-intentioned, this response often makes the person feel that their feelings are being dismissed or that their problem is being trivialised. Most people, when they open up about their mental health, need to feel heard and understood first. Solutions can come later."
  }
];

const faqs = [
  {
    question: "I am not a naturally good listener. Can I learn this skill?",
    answer: "Absolutely. Active listening, empathic responding, and non-judgemental presence are all learnable skills — they are not innate talents. Like any skill, they improve with practice. Start by being more intentional in your everyday conversations: put your phone away, make eye contact, ask follow-up questions, and resist the urge to talk about yourself. You might feel awkward at first, but that is completely normal. The more you practise, the more natural it becomes. Many people find that improving their listening skills also improves their relationships at home, their effectiveness at work, and their own sense of connection with others."
  },
  {
    question: "What if I find it hard to stay silent and feel the urge to fill every pause?",
    answer: "This is extremely common, especially in Western cultures where silence in conversation can feel uncomfortable. The key is to reframe what silence means. In a mental health conversation, silence is not emptiness — it is space. Space for the person to think, to feel, to summon courage, to process emotions, or to decide what to share next. When you feel the urge to fill a pause, try counting slowly to five in your head before speaking. Often, the person will fill the silence themselves with something deeper and more meaningful than what came before. If the silence continues, a gentle prompt like 'Take your time' or 'I am here, no rush' can be enough."
  },
  {
    question: "How do I listen without judgement when I genuinely disagree with what someone is doing?",
    answer: "Non-judgemental listening does not mean you agree with everything the person says or does. It means you prioritise understanding their experience over expressing your opinion. You can disagree internally while still creating a safe space for someone to share. For example, if a colleague tells you they have been drinking heavily to cope with anxiety, you do not need to say 'that is fine.' But you also should not respond with 'well, drinking is stupid.' Instead, you might say: 'It sounds like the anxiety has been really tough, and you have been finding ways to cope.' This validates the feeling without endorsing the behaviour. There will be time later to gently explore healthier coping strategies."
  },
  {
    question: "Is it possible to listen too much? When should I move from listening to suggesting help?",
    answer: "It is rare to listen too much in a first conversation. Most people err on the side of not listening enough, not listening too much. However, there are times to move from listening to gently suggesting next steps: when the person seems to have shared everything they need to share and the emotional intensity has reduced; when the person explicitly asks for advice or direction; when you are concerned about the person's safety; or when the conversation has been going for an extended period and you need to wrap up. A good transition phrase is: 'Thank you for sharing all of this with me. Is there anything I can do to help, or would it be useful to look at what support is available?' This shifts the conversation naturally without cutting the person off."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Carl Rogers identified three core conditions for a therapeutic relationship. Which of the following is one of those conditions?",
    options: [
      "Technical expertise — knowing the right diagnostic criteria to apply",
      "Unconditional positive regard — accepting the person without judgement or conditions",
      "Professional distance — maintaining clear emotional boundaries at all times",
      "Directive guidance — telling the person exactly what they need to do to recover"
    ],
    correctAnswer: 1,
    explanation: "Carl Rogers, the founder of person-centred therapy, identified three core conditions: empathy (understanding the person's experience from their perspective), congruence (being genuine and authentic), and unconditional positive regard (accepting the person fully, without judgement or conditions). These conditions create the psychological safety that allows people to open up, explore their feelings, and begin to heal. While Rogers developed these for therapy, they apply powerfully to any supportive conversation."
  },
  {
    id: 2,
    question: "In the SOLER model, what does 'Open posture' specifically mean?",
    options: [
      "Standing with your arms raised to appear welcoming",
      "Keeping your arms and legs uncrossed, which communicates openness, receptivity, and willingness to listen",
      "Opening a door so the person can leave if they want to",
      "Keeping your mouth open to show you are ready to speak"
    ],
    correctAnswer: 1,
    explanation: "In Gerard Egan's SOLER model, 'Open posture' means keeping your arms and legs uncrossed. Crossed arms can unconsciously communicate defensiveness, discomfort, or being closed off, even if you are genuinely listening. An open posture — arms at your sides or resting naturally, legs uncrossed — communicates receptivity, warmth, and willingness to hear what the person has to say. This is a simple physical adjustment that can make a significant difference to how safe the person feels."
  },
  {
    id: 3,
    question: "Why is silence described as 'powerful' in a mental health conversation?",
    options: [
      "Because it creates an awkward atmosphere that forces the person to speak faster",
      "Because it gives the person space to think, process emotions, and choose what to share next — often leading to deeper, more meaningful sharing",
      "Because it shows the listener is bored and wants the conversation to end",
      "Because professional therapists are required to be silent for at least 50% of every session"
    ],
    correctAnswer: 1,
    explanation: "Silence in a mental health conversation is not empty space — it is active, purposeful, and often where the most important processing happens. When you allow silence, you give the person time to think about what they have said, process the emotions that have come up, summon courage to share something deeper, or simply breathe. Many of the most powerful moments in supportive conversations happen during or immediately after a period of silence. The listener's willingness to sit in silence communicates patience, respect, and a lack of agenda."
  },
  {
    id: 4,
    question: "Which of the following is an example of an empathic response?",
    options: [
      "'I completely understand — the same thing happened to me last year'",
      "'That sounds really overwhelming. It makes sense that you would feel that way given everything you have been dealing with'",
      "'I feel so sorry for you — that is terrible'",
      "'You need to stop worrying about it and focus on the positive things in your life'"
    ],
    correctAnswer: 1,
    explanation: "An empathic response demonstrates that you are trying to understand the person's experience from their perspective. 'That sounds really overwhelming. It makes sense that you would feel that way...' validates their emotional experience, normalises their reaction, and communicates understanding. The other options represent common pitfalls: relating everything back to yourself, expressing sympathy (pity) rather than empathy, or dismissing the person's feelings with toxic positivity."
  },
  {
    id: 5,
    question: "What is 'reflecting back' or 'paraphrasing' in active listening?",
    options: [
      "Repeating the person's exact words back to them like a mirror",
      "Summarising what you have heard in your own words to show understanding and check you have grasped the meaning correctly",
      "Reflecting on your own similar experiences and sharing them",
      "Writing down what the person says and reading it back to them at the end"
    ],
    correctAnswer: 1,
    explanation: "Reflecting back (or paraphrasing) means restating what you have heard in your own words to demonstrate that you have understood the person's meaning and to give them the opportunity to correct any misunderstanding. For example, if someone says 'I just cannot face going into work any more — every morning I feel sick with dread,' you might reflect: 'It sounds like the thought of going to work is causing you real physical distress every morning.' This shows you have listened carefully, understood the emotional content, and not just the words."
  },
  {
    id: 6,
    question: "Which of the following responses would be classified as 'toxic positivity'?",
    options: [
      "'That sounds really tough. What has it been like for you?'",
      "'Everything happens for a reason — just stay positive and good things will come!'",
      "'I can see why you would feel that way. Thank you for telling me.'",
      "'Would it help to talk about what support is available?'"
    ],
    correctAnswer: 1,
    explanation: "Toxic positivity is the excessive and misguided belief that people should maintain a positive mindset regardless of what they are going through. 'Everything happens for a reason — just stay positive!' invalidates the person's genuine suffering, implies they are wrong to feel the way they do, and shuts down the conversation. It may be well-intentioned, but it effectively says: 'Your feelings are inconvenient and I would prefer you to be happy.' Genuine support acknowledges the reality of the person's pain while offering hope and presence."
  },
  {
    id: 7,
    question: "A colleague is telling you about their struggles with anxiety. Midway through, your phone buzzes with a message. What is the BEST response?",
    options: [
      "Quickly glance at the phone to check if it is urgent, then return to listening",
      "Ignore the phone completely — do not look at it, acknowledge it, or let it break your attention",
      "Pause the conversation to reply to the message, then ask the person to continue",
      "Tell the person 'hold on a second' while you check the message"
    ],
    correctAnswer: 1,
    explanation: "When someone is opening up about their mental health, your undivided attention is one of the most powerful things you can offer. Looking at your phone — even for a moment — sends the message that something else is more important. The best response is to ignore the phone completely. If possible, put it on silent or face-down before the conversation starts. If you forgot and it buzzes, simply let it go without acknowledgement. The message can wait. The person in front of you cannot."
  },
  {
    id: 8,
    question: "A colleague tells you: 'I have been feeling really low lately — some days I do not even want to get out of bed.' Which response demonstrates the BEST listening skills?",
    options: [
      "'You should try exercising in the morning — that always helps me feel better'",
      "'Lots of people feel like that — it is nothing to worry about'",
      "'That sounds really difficult. How long have you been feeling this way? I am glad you are telling me about it.'",
      "'When I was feeling low last year, I found that positive thinking really helped'"
    ],
    correctAnswer: 2,
    explanation: "This response demonstrates three key listening skills: validation ('That sounds really difficult' — acknowledging the emotion), an open question ('How long have you been feeling this way?' — inviting more sharing without being intrusive), and reassurance ('I am glad you are telling me about it' — encouraging them to continue and reinforcing that they did the right thing by opening up). The other responses jump to solutions, minimise, or shift the focus to the listener's own experience."
  }
];

export default function MentalHealthModule3Section3() {
  useSEO({
    title: "Listening Without Judgement | Mental Health Module 3.3",
    description: "Master the art of non-judgemental listening — active listening skills, empathic responding, the power of silence, and common mistakes to avoid in mental health conversations.",
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
            <Ear className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Listening Without Judgement
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The single most powerful skill in mental health support &mdash; how to truly listen, create a safe space, and help someone feel heard without being evaluated or judged
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Hearing vs listening:</strong> Hearing is passive; listening is active and intentional</li>
              <li><strong>SOLER model:</strong> Sit squarely, Open posture, Lean in, Eye contact, Relax</li>
              <li><strong>Empathy not sympathy:</strong> Understand, do not pity</li>
              <li><strong>Silence is powerful:</strong> Give space, do not fill every gap</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Feeling heard:</strong> Reduces distress more than any advice ever could</li>
              <li><strong>Safe space:</strong> People only open up when they feel they will not be judged</li>
              <li><strong>Common mistakes:</strong> Fixing, minimising, relating back to yourself</li>
              <li><strong>Your gift:</strong> Full, undivided attention is the most valuable thing you can offer</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain what non-judgemental listening really means and why it matters",
              "Apply the SOLER model to demonstrate physical attentiveness in a conversation",
              "Use reflecting, paraphrasing, and summarising to show understanding",
              "Understand why silence is valuable and how to be comfortable with it",
              "Distinguish between empathy and sympathy, and respond empathically",
              "Identify and avoid common listening mistakes that undermine mental health conversations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Non-Judgemental Listening Really Means */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            What Non-Judgemental Listening Really Means
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Non-judgemental listening is at the very heart of effective mental health support. It is the
                skill that makes the difference between a conversation that helps and a conversation that
                hinders. But what does it actually mean? At its core, non-judgemental listening means
                <strong> suspending your own opinions, beliefs, reactions, and solutions</strong> in order
                to create a space where the other person feels safe enough to share their truth without
                fear of being evaluated, criticised, corrected, or dismissed.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Carl Rogers&rsquo; Person-Centred Approach</p>
                <p className="text-base text-white leading-relaxed">
                  The foundations of non-judgemental listening were laid by <strong>Carl Rogers</strong>
                  (1902&ndash;1987), the American psychologist who revolutionised the field of counselling
                  and psychotherapy. Rogers identified three core conditions that create the psychological
                  safety needed for people to open up, explore their feelings, and begin to heal:
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Rogers&rsquo; Three Core Conditions</p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-1">1. Empathy</p>
                    <p className="text-sm text-white">The ability to understand the other person&rsquo;s experience from their perspective &mdash; to step into their shoes, even briefly, and see the world as they see it. This is not about agreeing with them. It is about genuinely trying to understand what it is like to be them in this moment.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-1">2. Congruence (Genuineness)</p>
                    <p className="text-sm text-white">Being real and authentic in the conversation &mdash; not wearing a professional mask, not pretending to understand when you do not, not hiding behind platitudes. If you are moved by what someone shares, it is OK to show that. If you do not know what to say, it is OK to say: &ldquo;I am not sure what to say, but I am really glad you told me.&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-1">3. Unconditional Positive Regard</p>
                    <p className="text-sm text-white">Accepting the person fully, without conditions, without judgement, and without requiring them to be different from how they are in order to receive your support. This does not mean you approve of everything they do &mdash; it means you accept them as a person, regardless of their choices, behaviours, or situation.</p>
                  </div>
                </div>
              </div>

              <p>
                There is a profound difference between <strong>hearing and listening</strong>. Hearing is
                passive &mdash; sound enters your ears whether you want it to or not. Listening is active,
                intentional, and effortful. It means focusing your full attention on the other person,
                processing not just their words but their emotions, their body language, and what they are
                not saying. On a construction site, where distractions are everywhere &mdash; noise, movement,
                time pressure, phone notifications &mdash; giving someone your full, undivided attention is
                one of the most powerful gifts you can offer.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Creating a Safe Space</p>
                <p className="text-sm text-white mb-3">
                  A &ldquo;safe space&rdquo; in a mental health context does not mean a physical room (though privacy
                  helps). It means an <strong>emotional environment</strong> where the person feels they can be honest
                  without negative consequences. You create this through:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Your body language</strong> &mdash; open, relaxed, attentive, turned towards the person</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Your tone of voice</strong> &mdash; calm, warm, unhurried, non-confrontational</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Your responses</strong> &mdash; validating, non-judgemental, focused on understanding rather than evaluating</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Your behaviour</strong> &mdash; phone away, no distractions, no time pressure (or at least the impression of none)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Your confidentiality</strong> &mdash; the assurance that what they share will be treated with respect and will not become site gossip</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Active Listening Skills for Mental Health Conversations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Active Listening Skills for Mental Health Conversations
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Active listening is a set of specific, learnable techniques that demonstrate to the other
                person that you are fully engaged, genuinely interested, and working to understand their
                experience. These are not tricks or manipulation &mdash; they are the outward expression
                of genuine care and attention.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The SOLER Model (Gerard Egan)</p>
                <p className="text-sm text-white mb-3">
                  Developed by counselling theorist Gerard Egan, the SOLER model provides a simple framework
                  for the physical aspects of active listening. Your body speaks before your mouth does:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">S &mdash; Sit Squarely</p>
                    <p>Face the person directly. This communicates: &ldquo;I am here for you. You have my full attention.&rdquo; On a construction site, this might mean turning your body towards them rather than standing side-on.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">O &mdash; Open Posture</p>
                    <p>Keep your arms and legs uncrossed. Crossed arms can unconsciously signal defensiveness or being closed off. An open posture says: &ldquo;I am receptive to what you are telling me.&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">L &mdash; Lean In</p>
                    <p>A slight lean towards the person shows interest and engagement. Not so close that it is uncomfortable, but enough to communicate that you are drawn in and paying attention.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">E &mdash; Eye Contact</p>
                    <p>Maintain comfortable, natural eye contact. Not a fixed stare (which can feel aggressive) but regular, gentle eye contact that shows you are present. It is fine to look away occasionally &mdash; that is natural.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg col-span-1 sm:col-span-2">
                    <p className="text-white font-medium mb-1">R &mdash; Relax</p>
                    <p>Be natural and at ease. If you are tense, the person will pick up on it and may become more guarded. Take a breath. Relax your shoulders. Let your concern for the person be genuine rather than performed. Authenticity is more powerful than technique.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Verbal Listening Skills</p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-1">Reflecting and Paraphrasing</p>
                    <p className="text-sm text-white">Restate what you have heard in your own words. This shows you have understood and gives the person the chance to correct you. <strong>Example:</strong> They say: &ldquo;I just feel like I cannot keep going like this.&rdquo; You respond: &ldquo;It sounds like you have reached a point where things feel really unsustainable.&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-1">Summarising</p>
                    <p className="text-sm text-white">After the person has shared for a while, pull together the main threads. <strong>Example:</strong> &ldquo;So it sounds like work pressure has been building, things at home are difficult, and you have been struggling to sleep. That is a lot to deal with.&rdquo; This shows you have been tracking the whole picture, not just the last thing they said.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-1">Minimal Encouragers</p>
                    <p className="text-sm text-white">Small verbal cues that keep the conversation flowing without interrupting: &ldquo;I see,&rdquo; &ldquo;Go on,&rdquo; &ldquo;Mm-hmm,&rdquo; &ldquo;Tell me more,&rdquo; &ldquo;Right,&rdquo; &ldquo;And then?&rdquo; These communicate: &ldquo;I am here, I am listening, keep going.&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-1">Checking Understanding</p>
                    <p className="text-sm text-white">Periodically check that you have understood correctly: &ldquo;Am I right in thinking that...?&rdquo; &ldquo;When you say X, do you mean...?&rdquo; This prevents misunderstandings and shows the person that you are working hard to get it right.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Power of Silence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The Power of Silence
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                For many people &mdash; and especially for those in construction, where chat, banter, and
                constant verbal communication are the norm &mdash; <strong>silence feels uncomfortable</strong>.
                A pause in conversation can feel like a void that needs to be filled. But in a mental health
                conversation, silence is not a problem. It is one of your most powerful tools.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Why Silence Is Valuable</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Silence in a supportive conversation is not empty &mdash; it is full of activity that
                  you cannot see:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Processing time</strong> &mdash; the person is making sense of what they have just said, or what you have asked. Emotions take time to process, especially when they are being expressed for the first time.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Courage-gathering</strong> &mdash; the person may be working up to sharing something deeper, more painful, or more difficult. Filling the silence can cut off this process.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Emotional release</strong> &mdash; sometimes people need a moment to cry, to breathe, to let a wave of emotion pass. Rushing past this denies them the release they need.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Permission to go deeper</strong> &mdash; when you do not rush to fill the gap, you are implicitly saying: &ldquo;There is no hurry. You can share as much or as little as you want. I am not going anywhere.&rdquo;</span>
                  </li>
                </ul>
              </div>

              <p>
                Resisting the urge to fill silence is one of the hardest things about listening. Your brain
                will scream at you to say something &mdash; anything &mdash; to break the tension. But
                <strong> the most meaningful sharing often comes immediately after a period of silence</strong>.
                The person has been thinking, gathering courage, or processing, and when they speak again,
                it is often something more honest and more vulnerable than what came before.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Practical Tips for Comfortable Silence</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Count to five</strong> &mdash; when a silence falls, count slowly to five in your head before speaking. Most of the time, the person will fill the silence before you reach five.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Maintain your body language</strong> &mdash; keep your open, attentive posture during silence. This shows you are still present and listening, even though neither of you is speaking.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Use gentle prompts if needed</strong> &mdash; if the silence extends and you sense the person is stuck, a quiet &ldquo;Take your time&rdquo; or &ldquo;I am here&rdquo; can be helpful without being intrusive.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Be aware of cultural differences</strong> &mdash; comfort with silence varies across cultures. Some people need more verbal encouragement; others appreciate long, contemplative pauses. Follow the person&rsquo;s lead.</span>
                  </li>
                </ul>
              </div>

              <p>
                On a construction site, where the environment is noisy and conversations are typically rapid-fire,
                the experience of someone simply sitting quietly with you and not rushing to fill the gaps can be
                <strong> profoundly different from normal interaction</strong>. That difference itself communicates
                something powerful: &ldquo;This conversation is not normal small talk. I am here for you, fully,
                and I am not going anywhere until you are ready.&rdquo;
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Empathic Responding */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Empathic Responding
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Empathy is the beating heart of non-judgemental listening. It is the quality that transforms
                a conversation from a mere exchange of words into a genuine human connection. But empathy is
                widely misunderstood, so let us be clear about what it is &mdash; and, equally importantly,
                what it is not.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Empathy IS and What It Is NOT</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-400 font-medium mb-2">Empathy IS...</p>
                    <p><strong>Trying to understand</strong> the other person&rsquo;s feelings from their perspective</p>
                    <p className="mt-1"><strong>Connecting</strong> with their emotional experience, even if you have never been in their exact situation</p>
                    <p className="mt-1"><strong>Communicating</strong> that understanding back to them: &ldquo;I can see why you would feel that way&rdquo;</p>
                    <p className="mt-1"><strong>Validating</strong> their emotions as real and understandable, given their circumstances</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-medium mb-2">Empathy is NOT...</p>
                    <p><strong>Sympathy</strong> &mdash; feeling pity or sorrow for someone from the outside (&ldquo;You poor thing&rdquo;)</p>
                    <p className="mt-1"><strong>Agreement</strong> &mdash; you do not have to agree with their actions or views to empathise with their feelings</p>
                    <p className="mt-1"><strong>Fixing</strong> &mdash; empathy is about understanding, not solving. Solutions come later, if at all</p>
                    <p className="mt-1"><strong>Performing</strong> &mdash; it must be genuine. People can detect fake empathy instantly, and it destroys trust</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Empathic Statements That Work</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Here are some empathic responses you can use in mental health conversations, along with
                  why they work:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;That sounds really tough.&rdquo;</strong> &mdash; simple, genuine, validates the difficulty without pretending to understand the specific details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;I can understand why you would feel that way.&rdquo;</strong> &mdash; normalises their emotional response and communicates that their reaction is rational and valid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;That is a lot to carry on your own.&rdquo;</strong> &mdash; acknowledges the weight of what they are going through and implicitly says: &ldquo;You do not have to carry it alone any more&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;I cannot imagine how difficult that must be.&rdquo;</strong> &mdash; honest about the limits of your understanding while acknowledging the severity of their experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;It makes complete sense that you are feeling this way.&rdquo;</strong> &mdash; powerfully normalising, especially for people who feel ashamed of their emotions</span>
                  </li>
                </ul>
              </div>

              <p>
                An important nuance: <strong>empathy validates emotions without necessarily validating harmful
                behaviours</strong>. If a colleague tells you they have been drinking excessively to cope with
                anxiety, you can empathise with the anxiety (&ldquo;Anxiety is exhausting &mdash; I can see why
                you would look for ways to take the edge off&rdquo;) without endorsing the drinking. You are
                validating the feeling, not the coping mechanism.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Emotional Attunement</p>
                <p className="text-sm text-white">
                  Emotional attunement means being attuned to the person&rsquo;s emotional state and matching
                  your response appropriately. If someone is quietly tearful, respond gently and softly. If
                  someone is frustrated and angry, acknowledge that energy: &ldquo;I can see you are really
                  frustrated about this.&rdquo; If someone is numb and detached, do not try to force emotion
                  out of them &mdash; match their pace and let them lead. Attunement communicates: &ldquo;I
                  am paying attention to how you feel, not just what you say.&rdquo; It is one of the
                  hallmarks of truly skilled listening.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Common Listening Mistakes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Common Listening Mistakes
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Even with the best intentions, listeners can fall into patterns that undermine the conversation.
                Being aware of these common mistakes is the first step towards avoiding them. All of these
                come from a <strong>good place</strong> &mdash; they are attempts to help &mdash; but they
                can unintentionally shut the conversation down or make the person feel worse.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Six Most Common Mistakes</p>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-2">1. Jumping to Solutions</p>
                    <p className="text-sm text-white mb-2">
                      <strong>What it sounds like:</strong> &ldquo;Have you tried yoga?&rdquo; &ldquo;You should see a
                      doctor.&rdquo; &ldquo;What you need to do is...&rdquo;
                    </p>
                    <p className="text-sm text-white mb-2">
                      <strong>Why it is harmful:</strong> It implies the problem is simple and easily solved, which makes the
                      person feel that their struggle is being trivialised. It also shifts the focus from their
                      emotional experience to a practical task list.
                    </p>
                    <p className="text-sm text-white">
                      <strong>Instead:</strong> Listen first. Let them feel heard. If appropriate, later ask: &ldquo;Would
                      it be helpful to talk about what support might be available?&rdquo;
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-2">2. Minimising</p>
                    <p className="text-sm text-white mb-2">
                      <strong>What it sounds like:</strong> &ldquo;Could be worse.&rdquo; &ldquo;Other people have it much
                      harder.&rdquo; &ldquo;At least you have got your health.&rdquo; &ldquo;First-world problems, eh?&rdquo;
                    </p>
                    <p className="text-sm text-white mb-2">
                      <strong>Why it is harmful:</strong> It invalidates their pain by comparing it to others or suggesting
                      they should not feel the way they do. Suffering is not a competition.
                    </p>
                    <p className="text-sm text-white">
                      <strong>Instead:</strong> &ldquo;What you are going through sounds genuinely difficult.&rdquo; Validate
                      the experience on its own terms.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-2">3. Relating Everything Back to Yourself</p>
                    <p className="text-sm text-white mb-2">
                      <strong>What it sounds like:</strong> &ldquo;When I was depressed...&rdquo; &ldquo;I know exactly how you
                      feel because...&rdquo; &ldquo;That happened to me too &mdash; let me tell you what I did...&rdquo;
                    </p>
                    <p className="text-sm text-white mb-2">
                      <strong>Why it is harmful:</strong> It hijacks the conversation and shifts focus from the person who is
                      struggling to you. Even if your intention is to show solidarity, it can make them feel
                      that their experience is not unique or important.
                    </p>
                    <p className="text-sm text-white">
                      <strong>Instead:</strong> Keep the focus on them. If you want to normalise, say: &ldquo;You are
                      definitely not alone in feeling this way.&rdquo;
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-2">4. Interrogating</p>
                    <p className="text-sm text-white mb-2">
                      <strong>What it sounds like:</strong> Rapid-fire questions: &ldquo;When did this start? How long? Have
                      you seen a doctor? What about medication? Does your family know?&rdquo;
                    </p>
                    <p className="text-sm text-white mb-2">
                      <strong>Why it is harmful:</strong> It feels like an interview or a medical assessment rather than a
                      supportive conversation. It removes the person&rsquo;s control over what they share and when.
                    </p>
                    <p className="text-sm text-white">
                      <strong>Instead:</strong> Ask one open question at a time. Let the person lead. Follow their pace, not yours.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-2">5. Being Distracted</p>
                    <p className="text-sm text-white mb-2">
                      <strong>What it looks like:</strong> Checking your phone, looking around the room, appearing restless,
                      thinking about what you are going to say next instead of listening to what they are saying now.
                    </p>
                    <p className="text-sm text-white mb-2">
                      <strong>Why it is harmful:</strong> Nothing communicates &ldquo;I do not really care&rdquo; more
                      powerfully than divided attention. If someone has summoned the courage to open up and they
                      see you glancing at your phone, they will shut down immediately.
                    </p>
                    <p className="text-sm text-white">
                      <strong>Instead:</strong> Put your phone on silent and out of sight. Give them your complete,
                      undivided attention. It is the most valuable thing you can offer.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-2">6. Toxic Positivity</p>
                    <p className="text-sm text-white mb-2">
                      <strong>What it sounds like:</strong> &ldquo;Just think positive!&rdquo; &ldquo;Everything happens for a
                      reason.&rdquo; &ldquo;Good vibes only!&rdquo; &ldquo;Look on the bright side.&rdquo;
                    </p>
                    <p className="text-sm text-white mb-2">
                      <strong>Why it is harmful:</strong> It invalidates genuine suffering by insisting on a positive frame.
                      It tells the person their pain is unwelcome and that they should mask it with a smile.
                      People who experience toxic positivity are less likely to open up in future.
                    </p>
                    <p className="text-sm text-white">
                      <strong>Instead:</strong> &ldquo;It is OK to not be OK right now. I am here for you, whatever you are
                      feeling.&rdquo; Acknowledge the reality before looking for any silver lining.
                    </p>
                  </div>
                </div>
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
                This section has equipped you with the core listening skills that underpin all effective
                mental health conversations. These skills are not just for crisis situations &mdash;
                they will improve every conversation you have, at work and at home. The key points to
                carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Non-judgemental listening</strong> means suspending your own opinions and reactions to create a safe space where the person feels heard without being evaluated.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Carl Rogers&rsquo; three conditions</strong> &mdash; empathy, congruence, and unconditional positive regard &mdash; are the foundation of all supportive conversations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>The SOLER model</strong> &mdash; Sit squarely, Open posture, Lean in, Eye contact, Relax &mdash; ensures your body communicates attentiveness.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Silence is powerful</strong> &mdash; resist the urge to fill every gap. The most meaningful sharing often follows a period of silence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Empathy connects; sympathy creates distance</strong> &mdash; try to understand their perspective rather than pitying them from yours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Avoid common traps</strong> &mdash; jumping to solutions, minimising, relating to yourself, interrogating, being distracted, and toxic positivity.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 4, we will put everything together
                  with practical scripts for what to say &mdash; and what not to say. You will learn specific
                  opening lines, helpful phrases, harmful phrases to avoid, the importance of person-first
                  language, and how to navigate the difficult responses that can come up when someone opens
                  up about their mental health.
                </p>
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
          title="Section 3 Knowledge Check"
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
            <Link to="../mental-health-module-3-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: The ALGEE Action Plan
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-3-section-4">
              Next: What to Say and What Not to Say
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
