import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Ear, Eye, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "al-levels",
    question: "According to the five levels of listening model, at which level do most workplace conversations operate?",
    options: [
      "Level 1 (Ignoring) — most people simply ignore each other at work",
      "Levels 2-3 (Pretend listening and selective listening) — nodding but not truly processing",
      "Level 4 (Attentive listening) — fully focused on the speaker",
      "Level 5 (Empathic listening) — seeking to understand the other person's perspective"
    ],
    correctIndex: 1,
    explanation: "Most workplace communication sits at levels 2-3: pretend listening (nodding while thinking about something else) and selective listening (hearing only what you want to hear). Leaders need to consciously operate at levels 4-5 to be truly effective communicators."
  },
  {
    id: "al-soler",
    question: "In Gerard Egan's SOLER model for active listening, what does the 'O' stand for?",
    options: [
      "Observe the speaker's body language carefully",
      "Open posture — arms uncrossed, body language receptive",
      "Offer advice and solutions promptly",
      "Organise your response while the other person is speaking"
    ],
    correctIndex: 1,
    explanation: "The SOLER model stands for: Sit/stand Squarely, Open posture (arms uncrossed, receptive body language), Lean slightly forward (showing interest), Eye contact (maintaining appropriate connection), and Relax (appearing calm and unhurried). Open posture signals that you are receptive to what the person is saying."
  },
  {
    id: "al-questions",
    question: "Which type of question should a leader generally AVOID using during a conversation with a team member?",
    options: [
      "Open questions that encourage fuller responses",
      "Probing questions that dig deeper into an issue",
      "Leading questions that suggest the answer you want to hear",
      "Closed questions that confirm specific facts"
    ],
    correctIndex: 2,
    explanation: "Leading questions ('You did check the isolations, didn't you?') should generally be avoided because they suggest the answer and put pressure on the person to agree rather than give an honest response. They can mask problems, discourage truthful reporting, and damage trust."
  }
];

const faqs = [
  {
    question: "I'm not a natural listener — I tend to jump in with solutions. How can I improve?",
    answer: "This is extremely common, especially among practical, problem-solving people like electricians and supervisors. The key is to consciously practise pausing before responding. When someone speaks, count to three in your head before you say anything. Use phrases like 'Tell me more about that' or 'What happened next?' to keep them talking while you resist the urge to fix the problem immediately. It takes practice, but the more you do it, the more natural it becomes. You will also find that people often arrive at their own solutions when given space to talk through the issue."
  },
  {
    question: "How do I balance active listening with the need to get on with the job?",
    answer: "Active listening does not mean every conversation needs to be a counselling session. Most site conversations are brief, and the listening skills apply just as much to a two-minute exchange as a twenty-minute discussion. The key is quality, not duration. When someone approaches you with a concern, give them your full attention for the time it takes — put down the phone, stop what you are doing, make eye contact, and listen properly. Two minutes of genuine attention is worth more than twenty minutes of distracted half-listening. If the issue requires more time than you can give right now, say so honestly: 'I want to hear this properly — can we grab five minutes at the break?'"
  },
  {
    question: "What is the best way to deal with someone who is upset or emotional on site?",
    answer: "First, move to a private or semi-private location if possible — nobody wants to show vulnerability in front of the whole team. Then, simply listen. Do not try to fix the problem, minimise their feelings, or tell them to 'man up'. Use empathic listening: 'I can see this is really bothering you' or 'That sounds like a tough situation.' Let them talk. Often, being heard is enough to take the edge off. Once they have said their piece, ask 'What would be most helpful right now?' rather than assuming you know what they need. Sometimes they want advice, sometimes they just needed to vent, sometimes they need practical help. Ask, don't assume."
  },
  {
    question: "Why is 'Are you alright, mate?' considered construction's most important question?",
    answer: "The construction industry has one of the highest suicide rates of any sector in the UK. Mental health struggles, financial pressures, relationship breakdowns, substance misuse, and the pressure of physical, demanding work all take their toll. Many workers suffer in silence because the culture has historically discouraged talking about struggles. A simple, genuine 'Are you alright, mate?' — asked because you have noticed something is off, not as a throwaway greeting — can be the thing that opens a door. It tells someone that they have been noticed, that someone cares, and that it is safe to talk. It does not require you to be a counsellor. It just requires you to be human."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Stephen Covey's observation about listening states that most people:",
    options: [
      "Listen with the intent to understand the other person's perspective",
      "Listen with the intent to reply rather than to understand",
      "Are naturally skilled listeners who need no training",
      "Prefer written communication to verbal conversations"
    ],
    correctAnswer: 1,
    explanation: "Stephen Covey observed that 'Most people do not listen with the intent to understand; they listen with the intent to reply.' This means most people are formulating their response while the other person is still talking, rather than genuinely trying to understand what is being said."
  },
  {
    id: 2,
    question: "In the five levels of listening model, 'empathic listening' means:",
    options: [
      "Feeling sorry for the person who is speaking",
      "Agreeing with everything the speaker says to avoid conflict",
      "Seeking to understand the other person's perspective and feelings",
      "Listening only when the topic is emotionally charged"
    ],
    correctAnswer: 2,
    explanation: "Empathic listening (Level 5) means actively seeking to understand the other person's perspective, feelings, and underlying needs — not just their words. It goes beyond attentive listening by trying to see the situation through their eyes. It does not require you to agree with them, only to understand them."
  },
  {
    id: 3,
    question: "The SOLER model for active listening was developed by:",
    options: [
      "Stephen Covey",
      "Gerard Egan",
      "Daniel Goleman",
      "Simon Sinek"
    ],
    correctAnswer: 1,
    explanation: "The SOLER model was developed by Gerard Egan as a framework for effective active listening body language: Sit/stand Squarely, Open posture, Lean slightly forward, Eye contact, and Relax."
  },
  {
    id: 4,
    question: "Which of the following is an example of 'reflecting feelings' in active listening?",
    options: [
      "'You should try doing it differently next time.'",
      "'It sounds like that situation really frustrated you.'",
      "'Let me tell you about a similar thing that happened to me.'",
      "'Right, so what's the next step then?'"
    ],
    correctAnswer: 1,
    explanation: "Reflecting feelings means acknowledging the emotion behind what someone is saying. 'It sounds like that situation really frustrated you' names the feeling and shows you are listening to more than just the factual content. This builds trust and encourages the person to share more."
  },
  {
    id: 5,
    question: "An open question is characterised by:",
    options: [
      "Having a simple yes or no answer",
      "Suggesting the answer you want to hear",
      "Encouraging a fuller, more detailed response",
      "Being used only in formal meetings"
    ],
    correctAnswer: 2,
    explanation: "Open questions encourage fuller, more detailed responses by beginning with words like 'how', 'what', 'why', 'tell me about', or 'describe'. For example, 'How did you approach the cable routing?' invites a detailed answer, whereas the closed version 'Did you route the cable correctly?' only invites yes or no."
  },
  {
    id: 6,
    question: "A leading question such as 'You did check the isolations, didn't you?' is problematic because:",
    options: [
      "It takes too long to ask",
      "It suggests the answer and pressures the person to agree rather than respond honestly",
      "It is too informal for use on a construction site",
      "It focuses on safety rather than productivity"
    ],
    correctAnswer: 1,
    explanation: "Leading questions suggest the desired answer and put pressure on the person to confirm rather than give an honest response. This is particularly dangerous in safety-critical contexts — a worker may say 'yes' to avoid embarrassment or conflict, even if the truth is 'no'. This can mask genuine hazards."
  },
  {
    id: 7,
    question: "Which of the following is a sign that a team member may be struggling with a personal or mental health issue?",
    options: [
      "Consistently arriving early and volunteering for extra tasks",
      "Withdrawal, irritability, drop in work quality, and changes in timekeeping",
      "Asking for clarification on technical procedures",
      "Requesting additional training on new equipment"
    ],
    correctAnswer: 1,
    explanation: "Withdrawal from the team, increased irritability, a noticeable drop in work quality, and changes in timekeeping (arriving late, leaving early, increased absence) are common signs that someone may be struggling. These behavioural changes often indicate underlying issues that the person may not feel able to raise directly."
  },
  {
    id: 8,
    question: "When paraphrasing during active listening, the purpose is to:",
    options: [
      "Repeat exactly what the person said word for word",
      "Show that you have understood the key message by restating it in your own words",
      "Correct any factual errors in what the person said",
      "Speed up the conversation by summarising quickly"
    ],
    correctAnswer: 1,
    explanation: "Paraphrasing means restating the speaker's key message in your own words to confirm understanding. For example, 'So what you're saying is the access route isn't safe because of the excavation.' This shows you have listened, gives the speaker a chance to correct any misunderstanding, and builds rapport."
  }
];

export default function LeadershipModule3Section2() {
  useSEO({
    title: "Active Listening and Asking Questions | Leadership Module 3.2",
    description: "The five levels of listening, SOLER model, open vs closed questions, and reading non-verbal cues — essential communication skills for site leaders.",
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
            <Link to="../leadership-module-3-section-1">
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
            <BookOpen className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Active Listening and Asking Questions
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How to truly hear what your team is telling you, ask questions that reveal the real picture, and read the signals people send without words
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Core skill:</strong> Active listening is deliberate and conscious</li>
              <li><strong>5 levels:</strong> From ignoring to empathic listening</li>
              <li><strong>SOLER model:</strong> Squarely, Open, Lean, Eye contact, Relax</li>
              <li><strong>Key fact:</strong> Poor listening causes mistakes and missed hazards</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">For Site Leaders</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Questions:</strong> Open questions reveal more than closed ones</li>
              <li><strong>Avoid:</strong> Leading questions that suggest the &ldquo;right&rdquo; answer</li>
              <li><strong>Non-verbal:</strong> Body language often says more than words</li>
              <li><strong>Courage:</strong> &ldquo;Are you alright, mate?&rdquo; saves lives</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Distinguish between hearing and active listening as a deliberate leadership skill",
              "Identify and describe the five levels of listening from ignoring to empathic",
              "Apply the SOLER model and key active listening techniques in site conversations",
              "Use open, closed, and probing questions appropriately while avoiding leading questions",
              "Recognise non-verbal cues and behavioural changes that signal someone is struggling",
              "Demonstrate the courage to ask 'Are you alright?' when you notice warning signs"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Difference Between Hearing and Listening */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Difference Between Hearing and Listening
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Most people <strong>hear</strong> but do not truly <strong>listen</strong>. Hearing is
                passive &mdash; it happens automatically when sound waves reach your ears. Listening is
                active &mdash; it is a deliberate, conscious skill that requires focus, attention, and
                the intention to understand.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-2">Stephen Covey on Listening</p>
                <p className="text-base text-white leading-relaxed">
                  <em>&ldquo;Most people do not listen with the intent to understand; they listen with
                  the intent to reply.&rdquo;</em> &mdash; Stephen Covey, <strong>The 7 Habits of
                  Highly Effective People</strong>
                </p>
              </div>

              <p>
                This observation cuts to the heart of the problem. When someone is talking to you, the
                natural tendency is to start preparing your response before they have finished speaking.
                You are filtering their words through your own experience, forming judgements, and
                constructing your reply &mdash; all while they are still talking. The result? You miss
                nuance, misunderstand intent, and respond to what you <em>think</em> they said rather
                than what they <em>actually</em> said.
              </p>

              <p>
                On a construction site, <strong>poor listening causes real problems</strong>. Instructions
                are misunderstood, leading to rework. Hazards are reported but not acted upon because
                the supervisor was not truly paying attention. Concerns are raised but dismissed, so the
                worker stops raising them. Relationships deteriorate because people do not feel heard.
                In safety-critical environments, the consequences can be severe &mdash; a missed warning,
                a misunderstood instruction, an ignored concern can all lead to serious incidents.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Ear className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Leadership Difference</p>
                </div>
                <p className="text-sm text-white/80">
                  Active listening is one of the most powerful leadership tools available to you. When
                  you genuinely listen to a team member, you learn what is really happening on the
                  ground. You build trust. You make people feel valued. And you get better information,
                  which leads to better decisions. <strong className="text-white">Leaders who listen well
                  get told the truth. Leaders who listen poorly get told what people think they want to
                  hear.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Five Levels of Listening */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Five Levels of Listening
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not all listening is equal. The five-level model provides a useful framework for
                understanding the quality of your listening and identifying where you need to improve.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Five Levels</p>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold mb-1">Level 1 &mdash; Ignoring</p>
                    <p className="text-white/80">Not listening at all. Making no effort to hear or engage with the speaker. On site, this might look like continuing to text on your phone while someone is reporting a concern.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold mb-1">Level 2 &mdash; Pretend Listening</p>
                    <p className="text-white/80">Nodding and making listening noises (&ldquo;mmm&rdquo;, &ldquo;yeah&rdquo;) while thinking about something else entirely. The body is present; the mind is elsewhere. Very common on busy sites.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold mb-1">Level 3 &mdash; Selective Listening</p>
                    <p className="text-white/80">Hearing only what you want to hear or what you expect to hear. Filtering information through your own biases and assumptions. You catch the bits that confirm what you already think and miss the rest.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold mb-1">Level 4 &mdash; Attentive Listening</p>
                    <p className="text-white/80">Fully focused on the speaker. Processing their words, following their logic, and trying to understand the content of what they are saying. This is good listening &mdash; but it focuses primarily on facts and information.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold mb-1">Level 5 &mdash; Empathic Listening</p>
                    <p className="text-white/80">Seeking to understand the other person&rsquo;s perspective, feelings, and underlying needs &mdash; not just their words. You are trying to see the situation through their eyes. This is the deepest, most powerful form of listening.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Workplace Reality</p>
                </div>
                <p className="text-sm text-white/80">
                  Most workplace communication sits at <strong className="text-white">levels 2 and 3</strong>.
                  People pretend to listen or selectively hear what suits them. Leaders need to
                  consciously operate at <strong className="text-white">levels 4 and 5</strong>. This
                  does not happen naturally &mdash; it requires deliberate practice, self-awareness,
                  and the discipline to give people your genuine, undivided attention.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Active Listening Techniques */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Active Listening Techniques
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Active listening is a set of specific, practicable techniques. The most widely used
                framework is Gerard Egan&rsquo;s <strong>SOLER model</strong>, which focuses on the
                physical behaviours that demonstrate attentive listening.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The SOLER Model (Egan)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-bold text-lg mb-1">S</p>
                    <p className="text-white font-medium mb-1">Sit/Stand Squarely</p>
                    <p>Face the person directly. This signals that you are giving them your full attention. Turning away or angling your body suggests you have one foot out the door.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-bold text-lg mb-1">O</p>
                    <p className="text-white font-medium mb-1">Open Posture</p>
                    <p>Arms uncrossed, body language receptive. Crossed arms signal defensiveness or impatience. An open posture says &ldquo;I am ready to hear what you have to say.&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-bold text-lg mb-1">L</p>
                    <p className="text-white font-medium mb-1">Lean Slightly Forward</p>
                    <p>A slight lean towards the speaker shows engagement and interest. Leaning back or slouching suggests boredom or disengagement.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-bold text-lg mb-1">E</p>
                    <p className="text-white font-medium mb-1">Eye Contact</p>
                    <p>Maintain comfortable eye contact. Not a fixed stare, but regular, natural eye contact that shows you are focused on them, not on your phone or the site around you.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg sm:col-span-2">
                    <p className="text-rose-400 font-bold text-lg mb-1">R</p>
                    <p className="text-white font-medium mb-1">Relax</p>
                    <p>Appear calm and unhurried, even if you are busy. Tension, fidgeting, or obvious impatience tells the speaker they are an inconvenience. Relaxed body language creates a safe space for honest communication.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Verbal Active Listening Techniques</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Paraphrasing</strong> &mdash; &ldquo;So what you&rsquo;re saying is the access route isn&rsquo;t safe because of the excavation?&rdquo; Restating in your own words confirms understanding.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Reflecting feelings</strong> &mdash; &ldquo;It sounds like that situation really frustrated you.&rdquo; Naming the emotion shows you are listening beyond just the facts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Summarising</strong> &mdash; &ldquo;So the main issues are X, Y, and Z. Have I got that right?&rdquo; Drawing together the key points and checking for accuracy.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Clarifying questions</strong> &mdash; &ldquo;When you say the board wasn&rsquo;t right, what specifically was wrong with it?&rdquo; Seeking clarity rather than making assumptions.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-2">What to Avoid</p>
                <p className="text-sm text-white/80">
                  <strong className="text-white">Do not interrupt.</strong> Do not finish their sentences.
                  Do not jump to solutions before they have finished explaining the problem. Each of these
                  behaviours tells the speaker that what you have to say is more important than what they
                  are saying. It shuts down communication and discourages people from coming to you in future.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Open vs Closed Questions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Open vs Closed Questions
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The questions you ask shape the answers you receive. Understanding the different types
                of questions &mdash; and when to use each &mdash; is a <strong>powerful leadership
                tool</strong> that directly affects the quality of information you get from your team.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Types of Questions</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Closed Questions</p>
                    <p className="mb-2">Invite yes/no or short factual answers. Useful for confirming specific facts.</p>
                    <p className="text-rose-400 text-xs">&ldquo;Did you isolate the supply?&rdquo;</p>
                    <p className="text-rose-400 text-xs">&ldquo;Was the permit signed?&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Open Questions</p>
                    <p className="mb-2">Encourage fuller responses and reveal more information. Start with how, what, why, tell me.</p>
                    <p className="text-rose-400 text-xs">&ldquo;How did you approach the cable routing?&rdquo;</p>
                    <p className="text-rose-400 text-xs">&ldquo;What concerns do you have about tomorrow&rsquo;s work?&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Probing Questions</p>
                    <p className="mb-2">Dig deeper into an issue. Follow up on initial answers to get more detail.</p>
                    <p className="text-rose-400 text-xs">&ldquo;Tell me more about what happened next.&rdquo;</p>
                    <p className="text-rose-400 text-xs">&ldquo;What made you decide to do it that way?&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Leading Questions (AVOID)</p>
                    <p className="mb-2">Suggest the answer you want to hear. Put pressure on the person to agree.</p>
                    <p className="text-red-400 text-xs">&ldquo;You did check the isolations, didn&rsquo;t you?&rdquo;</p>
                    <p className="text-red-400 text-xs">&ldquo;That scaffold looks fine to you, doesn&rsquo;t it?&rdquo;</p>
                  </div>
                </div>
              </div>

              <p>
                The right question at the right time reveals the real picture. A closed question
                confirms a fact: &ldquo;Did you isolate?&rdquo; An open question reveals the
                process: &ldquo;Talk me through how you isolated.&rdquo; The second question tells
                you far more, because it shows whether the person actually understands the procedure
                or just knows the expected answer.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Danger of Leading Questions</p>
                </div>
                <p className="text-sm text-white/80">
                  Leading questions are <strong className="text-white">particularly dangerous in safety-critical
                  environments</strong>. &ldquo;You did check the isolations, didn&rsquo;t you?&rdquo; is
                  not really a question &mdash; it is a statement disguised as a question. The worker feels
                  pressured to say &ldquo;yes&rdquo; even if the honest answer is &ldquo;no&rdquo; or
                  &ldquo;I&rsquo;m not sure.&rdquo; This can mask genuine hazards and prevent honest reporting.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Reading Between the Lines */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Reading Between the Lines
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                What people <strong>do not say</strong> is often as important as what they do say.
                Research consistently shows that a large proportion of communication is non-verbal
                &mdash; conveyed through body language, tone of voice, facial expressions, and
                behaviour rather than words.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Non-Verbal Cues to Watch For</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Body language</strong> &mdash; crossed arms (defensive), turned away (disengaged), hunched shoulders (stressed or defeated), clenched fists (anger or tension)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Tone of voice</strong> &mdash; flat tone (low mood), raised voice (frustration), hesitation (uncertainty or fear), sarcasm (resentment)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Facial expressions</strong> &mdash; furrowed brow (confusion or concern), avoiding eye contact (discomfort or dishonesty), forced smile (masking true feelings)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Fidgeting</strong> &mdash; restlessness, tapping, inability to keep still can indicate anxiety, impatience, or discomfort with the topic being discussed</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Signs Someone Is Struggling</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Withdrawal</strong> &mdash; becoming quieter, eating alone, avoiding team interaction, not joining in banter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Irritability</strong> &mdash; snapping at colleagues, overreacting to minor issues, increased conflict</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Drop in quality</strong> &mdash; making uncharacteristic mistakes, forgetting things, lower standard of work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Changes in timekeeping</strong> &mdash; arriving late, leaving early, increased absence or sickness</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-2">Construction&rsquo;s Most Important Question</p>
                <p className="text-sm text-white/80">
                  The courage to say <strong className="text-white">&ldquo;Are you alright, mate?&rdquo;</strong>
                  might be the most important thing you ever do as a leader. The construction industry has
                  one of the highest suicide rates of any sector. Many workers struggle in silence. A
                  simple, genuine question &mdash; asked because you have noticed something is off, not
                  as a passing greeting &mdash; can open a door that saves a life. You do not need to be
                  a counsellor. You just need to notice, and care enough to ask.
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
                Active listening and effective questioning are not soft skills &mdash; they are
                essential leadership competencies that directly impact safety, productivity, and
                team wellbeing. The key takeaways from this section are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Hearing vs listening:</strong> Hearing is passive and automatic. Active listening is deliberate, conscious, and requires genuine intention to understand</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Five levels:</strong> Most workplace communication operates at levels 2-3 (pretend and selective listening). Leaders must operate at levels 4-5 (attentive and empathic)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">SOLER model:</strong> Squarely, Open posture, Lean forward, Eye contact, Relax &mdash; the physical framework for demonstrating active listening</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Question types:</strong> Use open questions to explore, closed questions to confirm, probing questions to dig deeper. Avoid leading questions that suggest the answer</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Non-verbal cues:</strong> Body language, tone, facial expressions, and behavioural changes often communicate more than words</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Courage to ask:</strong> &ldquo;Are you alright, mate?&rdquo; is construction&rsquo;s most important question. Notice the signs and have the courage to ask</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Next:</strong> In Section 3, we tackle the
                  conversations that most leaders dread &mdash; having difficult conversations.
                  You will learn the DESC model, how to prepare, and how to handle the most common
                  challenging situations that arise on site.
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
          title="Section 2 Knowledge Check"
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
            <Link to="../leadership-module-3-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-3-section-3">
              Next: Difficult Conversations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}