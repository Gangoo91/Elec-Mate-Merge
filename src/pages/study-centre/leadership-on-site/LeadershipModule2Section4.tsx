import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, MessageSquare, Target, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "sbi-model",
    question: "In the SBI feedback model (Situation, Behaviour, Impact), what does the 'B' (Behaviour) focus on?",
    options: [
      "The person's attitude and personality traits",
      "What you observed the person actually do or say — factual and specific",
      "What you believe the person's intentions were",
      "How the person's behaviour compares to their colleagues"
    ],
    correctIndex: 1,
    explanation: "The 'B' in SBI stands for Behaviour — what you actually OBSERVED the person do or say, not your interpretation of it. It must be factual, specific, and free from judgement. Not 'you were being disrespectful' (interpretation) but 'you interrupted Dave twice during the toolbox talk' (observable behaviour). This keeps feedback objective and defensible."
  },
  {
    id: "grow-model",
    question: "In the GROW coaching model (Sir John Whitmore), what does the 'W' stand for?",
    options: [
      "Wish — what the person would like to happen ideally",
      "Work — the practical tasks that need to be completed",
      "Will — a firm commitment to specific action with a deadline",
      "Worry — identifying potential obstacles and concerns"
    ],
    correctIndex: 2,
    explanation: "Whitmore was emphatic that 'W' stands for WILL — a firm commitment to action, not a vague wish. The question is 'What WILL you do? By when?' It converts a coaching conversation into concrete, committed action. Without a genuine commitment to a specific action and timeline, the conversation has been interesting but nothing will change."
  },
  {
    id: "feedback-sandwich",
    question: "Research has identified several problems with the 'feedback sandwich' (praise-criticism-praise). Which of the following is one of them?",
    options: [
      "It gives too much negative feedback and damages confidence",
      "It takes too long and is not practical in a busy workplace",
      "It conditions people to hear praise as a warning signal that criticism is coming",
      "It focuses too much on future actions rather than past behaviour"
    ],
    correctIndex: 2,
    explanation: "One of the key research-based problems with the feedback sandwich is that it conditions praise as a warning signal. When people learn that praise is always followed by criticism, they stop trusting positive feedback — every time you say something nice, they brace for the 'but.' This undermines both the praise AND the critical feedback, making the entire approach counterproductive."
  }
];

const faqs = [
  {
    question: "I hate confrontation. How do I give critical feedback without it turning into an argument?",
    answer: "The SBI model is specifically designed for this. By anchoring your feedback in a specific situation, describing observable behaviour (not your interpretation), and explaining the impact, you remove most of the emotional charge. You are not attacking the person — you are describing what happened and its effect. Start with 'I noticed...' rather than 'You always...' or 'You never...'. Ask a genuine question at the end: 'Can you help me understand what was going on?' This opens a conversation rather than triggering defensiveness. Most importantly, give feedback privately — never in front of others. Public criticism destroys trust and guarantees confrontation."
  },
  {
    question: "Should I give positive feedback as well, or just focus on what needs improving?",
    answer: "Absolutely give positive feedback — and give it more often than corrective feedback. Research by Gottman and Losada suggests a ratio of roughly 5:1 (five positive interactions for every negative one) for high-performing relationships. Positive feedback using SBI is just as powerful: 'During the testing today (Situation), you spotted that loose connection in the DB and flagged it immediately (Behaviour), which prevented a potential fault that could have been really difficult to find later (Impact). That was excellent.' Specific positive feedback reinforces good behaviour far more effectively than vague praise like 'good job.'"
  },
  {
    question: "What if someone gets defensive when I give them feedback?",
    answer: "Defensiveness is normal — it is the brain's natural response to perceived threat. Do not escalate. Stay calm, stick to the facts (this is where SBI protects you — you are describing observed behaviour, not making accusations), and acknowledge their feelings: 'I can see this is difficult to hear.' If the conversation is getting heated, pause it: 'Let us take a break and come back to this in an hour.' Never give feedback when either of you is angry. If someone consistently becomes defensive, consider whether there is a trust issue that needs addressing first (see Section 1 on Building Trust)."
  },
  {
    question: "How often should I give feedback to my team?",
    answer: "Far more often than you probably think. The annual appraisal model is largely discredited — by the time you give feedback on something that happened months ago, it is too late to be useful. Aim for regular, informal feedback in the moment or very shortly after. A brief SBI observation after a toolbox talk, a quick word of recognition when someone does quality work, a private conversation when you spot something that needs correcting. The goal is to make feedback so normal and routine that it stops being a big, stressful event. When feedback is rare, it feels like a formal occasion and triggers anxiety. When it is frequent, it feels like a normal part of working together."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The SBI feedback model stands for:",
    options: [
      "Summary, Belief, Instruction",
      "Situation, Behaviour, Impact",
      "Standard, Benchmark, Improvement",
      "Specific, Brief, Immediate"
    ],
    correctAnswer: 1,
    explanation: "SBI stands for Situation (when and where), Behaviour (what you observed), Impact (the effect it had). Developed by the Center for Creative Leadership, it provides a factual, non-judgemental structure for giving both positive and corrective feedback."
  },
  {
    id: 2,
    question: "Which of the following is an example of GOOD SBI feedback?",
    options: [
      "'You are always late and it is really unprofessional.'",
      "'During the toolbox talk this morning, you interrupted Dave twice, which meant the lads did not get the full safety briefing.'",
      "'You need to improve your attitude — everyone has noticed.'",
      "'You did well today. Keep it up.'"
    ],
    correctAnswer: 1,
    explanation: "Option B follows the SBI model: Situation (during the toolbox talk this morning), Behaviour (you interrupted Dave twice), Impact (the lads did not get the full safety briefing). It is specific, factual, and describes observable behaviour rather than making vague judgements about attitude or character."
  },
  {
    id: 3,
    question: "In the GROW coaching model, the four stages are:",
    options: [
      "Goals, Resources, Outcomes, Wins",
      "Guidance, Review, Objectives, Willpower",
      "Goal, Reality, Options, Will",
      "Gather, Reflect, Organise, Work"
    ],
    correctAnswer: 2,
    explanation: "GROW stands for Goal (what do you want to achieve?), Reality (what is happening now?), Options (what could you do?), Will (what WILL you do, and by when?). Developed by Sir John Whitmore, it is the most widely used coaching model globally, adopted by organisations including Google."
  },
  {
    id: 4,
    question: "Why does the feedback sandwich (praise-criticism-praise) not work according to research?",
    options: [
      "It gives too much positive feedback and people become complacent",
      "It takes too long to deliver and is impractical on a busy site",
      "The critical message gets lost, praise becomes a warning signal, and it is perceived as manipulative",
      "It only works with experienced workers, not with apprentices"
    ],
    correctAnswer: 2,
    explanation: "Research identifies multiple problems: the critical message gets lost due to primacy/recency effects (people remember the first and last things said), praise becomes conditioned as a warning signal ('here comes the but'), it is perceived as manipulative and formulaic, it undermines the corrective message, and there is no empirical evidence supporting its effectiveness."
  },
  {
    id: 5,
    question: "Marshall Goldsmith's 'Feedforward' approach focuses on:",
    options: [
      "Detailed analysis of what went wrong in the past",
      "Future-focused suggestions for improvement rather than critique of past behaviour",
      "Written feedback delivered via email to avoid face-to-face confrontation",
      "Giving feedback only after a formal review process"
    ],
    correctAnswer: 1,
    explanation: "Feedforward is future-focused: instead of critiquing what went wrong (which cannot be changed), it asks for suggestions about what to do differently next time. 'Tomorrow's toolbox talk — what two things could you do to make sure everyone is clear?' The only reply allowed is 'thank you.' It is particularly effective with experienced people who resist being told what they did wrong."
  },
  {
    id: 6,
    question: "Sir John Whitmore was emphatic that the 'W' in GROW means 'Will', not 'Wish'. The key difference is:",
    options: [
      "'Will' means the supervisor tells the person what to do; 'Wish' means the person decides",
      "'Will' requires a firm commitment to specific action with a deadline; 'Wish' is vague",
      "'Will' focuses on positive outcomes; 'Wish' focuses on avoiding negative ones",
      "'Will' applies to short-term goals; 'Wish' applies to long-term aspirations"
    ],
    correctAnswer: 1,
    explanation: "Whitmore emphasised that 'Will' means a genuine commitment to concrete action: 'What WILL you do? By when? What might get in the way? How will you overcome that?' A 'wish' is a vague intention ('I will try to do better') with no specific action or timeline. Without firm commitment, coaching conversations produce interesting discussions but no change."
  },
  {
    id: 7,
    question: "When using the SBI model for POSITIVE feedback, the most effective approach is:",
    options: [
      "Keep it vague and general — 'Good job today, well done.'",
      "Be just as specific as with corrective feedback — describe the situation, behaviour, and positive impact",
      "Only give positive feedback in group settings to maximise its motivational effect",
      "Save positive feedback for annual performance reviews to make it more meaningful"
    ],
    correctAnswer: 1,
    explanation: "Positive feedback is most effective when it follows the same SBI structure as corrective feedback: specific situation, observable behaviour, and the positive impact. 'During the testing today, you spotted that loose connection and flagged it immediately, which prevented a potential fault' is far more powerful than 'good job' because the person knows exactly what they did well and why it mattered."
  },
  {
    id: 8,
    question: "The best time to give feedback is:",
    options: [
      "During the annual performance review",
      "At the end of each month in a formal meeting",
      "As close to the event as possible, informally and regularly",
      "Only when there is a serious problem that needs addressing"
    ],
    correctAnswer: 2,
    explanation: "Feedback is most effective when given as close to the event as possible — while the details are fresh and the person can connect the feedback to their actions. Regular, informal feedback (both positive and corrective) normalises the process and removes the anxiety associated with rare, formal feedback events. Waiting months for an annual review makes feedback far less useful."
  }
];

export default function LeadershipModule2Section4() {
  useSEO({
    title: "Giving Feedback That Sticks | Leadership Module 2.4",
    description: "The SBI feedback model, GROW coaching model, why the feedback sandwich fails, and Marshall Goldsmith's feedforward approach for construction site leaders.",
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
            <Link to="../leadership-module-2-section-3">
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
            <MessageSquare className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Giving Feedback That Sticks
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Four evidence-based feedback and coaching models that turn conversations into real behaviour change on site
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>SBI Model:</strong> Situation &rarr; Behaviour &rarr; Impact (factual, specific)</li>
              <li><strong>GROW Model:</strong> Goal &rarr; Reality &rarr; Options &rarr; Will (coaching)</li>
              <li><strong>Sandwich:</strong> Does NOT work &mdash; five research-based reasons why</li>
              <li><strong>Feedforward:</strong> Future suggestions, not past critique (Goldsmith)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">For Site Leaders</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Be specific:</strong> &ldquo;You interrupted Dave twice&rdquo; not &ldquo;bad attitude&rdquo;</li>
              <li><strong>Give it early:</strong> As close to the event as possible</li>
              <li><strong>5:1 ratio:</strong> Five positive interactions for every corrective one</li>
              <li><strong>Make it normal:</strong> Frequent, informal feedback beats annual reviews</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain why regular, honest feedback is one of the highest-impact leadership actions",
              "Use the SBI model to give both positive and corrective feedback effectively",
              "Apply the GROW coaching model to develop team members through structured conversations",
              "Explain why the feedback sandwich does not work and what to use instead",
              "Use Marshall Goldsmith's feedforward approach with experienced team members",
              "Select the right feedback model for different situations and individuals"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Feedback Is a Leadership Superpower */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Why Feedback Is a Leadership Superpower
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Regular, honest feedback is one of the <strong>highest-impact things a leader can
                do</strong>. Without feedback, people do not know where they stand, cannot improve, and
                gradually lose motivation. They are flying blind &mdash; unsure if their work is good
                enough, uncertain about expectations, and unable to develop.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Feedback Gap</p>
                <p className="text-base text-white leading-relaxed">
                  Most new supervisors either <strong>avoid giving feedback entirely</strong> (because it
                  feels uncomfortable, especially corrective feedback) or <strong>do it badly</strong>
                  (vague, emotional, judgemental, or poorly timed). Both approaches fail. Avoiding feedback
                  allows poor performance to continue and good performance to go unrecognised. Bad feedback
                  damages relationships and creates defensiveness.
                </p>
              </div>

              <p>
                The good news is that effective feedback is a <strong>learnable skill</strong>. The four
                models in this section provide structured approaches that take the guesswork out of
                feedback conversations. They work because they are based on research, focus on observable
                facts rather than subjective judgements, and create clear paths to improvement.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Effective Feedback Achieves</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Reinforces good behaviour</strong> &mdash; people repeat actions that are recognised and valued</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Corrects problems early</strong> &mdash; small issues get fixed before they become major problems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Builds trust</strong> &mdash; honest feedback signals respect (you care enough to tell the truth)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Develops people</strong> &mdash; feedback is the primary mechanism for growth and improvement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Sets standards</strong> &mdash; consistent feedback makes expectations clear to everyone</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Cost of No Feedback</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold text-xs mb-1">When Problems Go Unaddressed</p>
                    <ul className="text-white/80 text-xs space-y-1">
                      <li>Poor workmanship continues and becomes normalised</li>
                      <li>Good workers become resentful when poor performers face no consequences</li>
                      <li>Small safety issues grow into serious incidents</li>
                      <li>Problems that were easy to fix early become expensive to fix later</li>
                    </ul>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold text-xs mb-1">When Good Work Goes Unrecognised</p>
                    <ul className="text-white/80 text-xs space-y-1">
                      <li>People stop going the extra mile because nobody notices</li>
                      <li>Motivation drops to minimum compliance levels</li>
                      <li>Best workers leave for employers who value them</li>
                      <li>Standards gradually decline across the whole team</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The SBI Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The SBI Model (Center for Creative Leadership)
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The SBI model, developed by the <strong>Center for Creative Leadership</strong>, is
                one of the most widely used feedback frameworks in the world. It works because it keeps
                feedback <strong>factual, specific, and free from judgement</strong> &mdash; reducing
                defensiveness and increasing the chance of behaviour change.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Three Components</p>
                <div className="space-y-3 text-sm">
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                    <p className="text-blue-400 font-semibold mb-1">S &mdash; Situation</p>
                    <p className="text-white/80 text-xs">Anchor the feedback in a specific time and place. This prevents the conversation from becoming vague or generalised.</p>
                    <p className="text-white text-xs mt-1"><strong>Example:</strong> &ldquo;During the toolbox talk this morning...&rdquo; or &ldquo;When you were working on the DB in corridor C yesterday afternoon...&rdquo;</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
                    <p className="text-purple-400 font-semibold mb-1">B &mdash; Behaviour</p>
                    <p className="text-white/80 text-xs">Describe what you actually OBSERVED — what the person did or said. Not your interpretation of it, not their attitude, not their personality. Observable, factual behaviour.</p>
                    <p className="text-white text-xs mt-1"><strong>Example:</strong> &ldquo;...you interrupted Dave twice while he was explaining the isolation procedure...&rdquo; (NOT &ldquo;you were being rude and disrespectful&rdquo;)</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold mb-1">I &mdash; Impact</p>
                    <p className="text-white/80 text-xs">Explain the effect the behaviour had — on you, the team, the project, safety, or the person themselves.</p>
                    <p className="text-white text-xs mt-1"><strong>Example:</strong> &ldquo;...which meant the lads did not get the full safety briefing and two of them looked confused about the procedure afterwards.&rdquo;</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Extended SBII &mdash; Adding Intent</p>
                <p className="text-sm text-white/80">
                  The extended model adds a fourth element: <strong className="text-white">Intent</strong>.
                  After describing the situation, behaviour, and impact, ask a genuine question: &ldquo;Can
                  you help me understand what was going on?&rdquo; This opens a dialogue, shows you are
                  interested in their perspective, and often reveals context you were not aware of. Perhaps
                  they interrupted because they spotted an error in the procedure. Perhaps they were having
                  a terrible day. The intent question turns feedback from a one-way lecture into a two-way
                  conversation.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key SBI Principles</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Give it privately</strong> &mdash; never give corrective feedback in front of others. Public criticism humiliates people and guarantees defensiveness. Pull them aside.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Give it promptly</strong> &mdash; as close to the event as possible. Feedback about something that happened three weeks ago is far less useful and harder to remember.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Describe, do not judge</strong> &mdash; &ldquo;you interrupted Dave twice&rdquo; is factual. &ldquo;You were being disrespectful&rdquo; is your interpretation. Stick to what you observed.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Avoid &ldquo;always&rdquo; and &ldquo;never&rdquo;</strong> &mdash; these words trigger defensiveness immediately because they are rarely accurate. Use specific examples instead.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Focus on one thing at a time</strong> &mdash; do not save up multiple issues and dump them all at once. Address the most important one and follow up on others separately.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-2">Corrective SBI Example</p>
                    <p className="text-sm text-white/80">
                      <strong className="text-white">S:</strong> &ldquo;During the toolbox talk this morning...&rdquo;<br />
                      <strong className="text-white">B:</strong> &ldquo;...you interrupted Dave twice while he was explaining the isolation procedure...&rdquo;<br />
                      <strong className="text-white">I:</strong> &ldquo;...which meant the lads did not get the full safety briefing.&rdquo;<br />
                      <strong className="text-white">I (Intent):</strong> &ldquo;Can you help me understand what was going on?&rdquo;
                    </p>
                  </div>
                  <div>
                    <p className="text-green-400 font-semibold text-sm mb-2">Positive SBI Example</p>
                    <p className="text-sm text-white/80">
                      <strong className="text-white">S:</strong> &ldquo;During the inspection today...&rdquo;<br />
                      <strong className="text-white">B:</strong> &ldquo;...you spotted that the earthing conductor was undersized on the new circuit and flagged it before it was concealed...&rdquo;<br />
                      <strong className="text-white">I:</strong> &ldquo;...which saved us from a major non-compliance and potentially hours of rework. That was excellent attention to detail.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The GROW Coaching Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The GROW Coaching Model (Sir John Whitmore)
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The GROW model is the <strong>most widely used coaching model globally</strong>, adopted
                by organisations including Google. Developed by Sir John Whitmore, it provides a structured
                framework for coaching conversations that help people find their own solutions rather than
                being told what to do.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">The Four Stages</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                    <p className="text-blue-400 font-semibold mb-1">G &mdash; Goal</p>
                    <p className="text-white/80 text-xs">&ldquo;What do you want to achieve?&rdquo; Define the specific outcome the person is working towards.</p>
                    <p className="text-white text-xs mt-1"><strong>Site example:</strong> An apprentice struggling with cable calculations. Goal: &ldquo;I want to be able to do voltage drop calculations confidently without needing to check every time.&rdquo;</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold mb-1">R &mdash; Reality</p>
                    <p className="text-white/80 text-xs">&ldquo;What is happening now?&rdquo; Explore the current situation honestly — where they are, what they have tried, what is getting in the way.</p>
                    <p className="text-white text-xs mt-1"><strong>Site example:</strong> &ldquo;Where do you get stuck? Is it the formula, the tables, or applying it to real circuits? How are you practising?&rdquo;</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold mb-1">O &mdash; Options</p>
                    <p className="text-white/80 text-xs">&ldquo;What could you do?&rdquo; Brainstorm possible actions — without judging them. The more options generated, the better.</p>
                    <p className="text-white text-xs mt-1"><strong>Site example:</strong> &ldquo;What options do you see? Extra practice with the guide? Working through examples with a qualified electrician? Online tutorials? A study group?&rdquo;</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
                    <p className="text-purple-400 font-semibold mb-1">W &mdash; Will</p>
                    <p className="text-white/80 text-xs">&ldquo;What WILL you do? By when?&rdquo; Convert the conversation into a firm commitment to specific action with a deadline.</p>
                    <p className="text-white text-xs mt-1"><strong>Site example:</strong> &ldquo;So what are you going to do? When will you start? What might get in the way? How will you handle that? Let us check in on Friday.&rdquo;</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Will, Not Wish</p>
                </div>
                <p className="text-sm text-white/80">
                  Whitmore was emphatic that <strong className="text-white">W = Will (commitment), not
                  Wish</strong>. The difference is crucial. A wish is: &ldquo;I will try to do better.&rdquo;
                  A will is: &ldquo;I will spend 30 minutes every evening this week working through voltage
                  drop examples from the guide, and I will bring three completed examples to show you on
                  Friday.&rdquo; Without a specific action, a specific timeline, and genuine commitment,
                  the coaching conversation produces no change.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">GROW in Action &mdash; Full Construction Example</p>
                <div className="space-y-2 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-blue-400 font-semibold text-xs mb-1">G &mdash; Goal</p>
                    <p className="text-white/80 text-xs">Supervisor: &ldquo;What would you like to be able to do?&rdquo; Apprentice: &ldquo;I want to be confident enough to do a full EICR inspection on my own without needing to ask for help at every stage.&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold text-xs mb-1">R &mdash; Reality</p>
                    <p className="text-white/80 text-xs">Supervisor: &ldquo;Where are you with that right now?&rdquo; Apprentice: &ldquo;I can do the testing OK, but I struggle with coding the observations and I am not confident with the Zs readings.&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold text-xs mb-1">O &mdash; Options</p>
                    <p className="text-white/80 text-xs">Supervisor: &ldquo;What could you do to get more confident?&rdquo; Apprentice: &ldquo;I could shadow Dave on his next three inspections, I could study the coding guidelines, or I could practise on the empty flats before handover.&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-purple-400 font-semibold text-xs mb-1">W &mdash; Will</p>
                    <p className="text-white/80 text-xs">Supervisor: &ldquo;Which of those WILL you do? By when?&rdquo; Apprentice: &ldquo;I will shadow Dave on Monday and Wednesday, study the codes Tuesday evening, and do a practice inspection on flat 4B by Thursday. I will show you the results Friday morning.&rdquo;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Why the Feedback Sandwich Doesn't Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Why the Feedback Sandwich Does Not Work
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The &ldquo;feedback sandwich&rdquo; (praise-criticism-praise) is probably the most
                commonly taught feedback technique. It is also one of the least effective. Research has
                identified <strong>five significant problems</strong> with this approach.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Five Research-Based Problems</p>
                <ul className="text-sm text-white space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>1. Primacy/recency effects</strong> &mdash; People remember the first and last things said most clearly. The critical message in the middle gets lost between two pieces of praise. The person walks away remembering the praise, not the corrective feedback.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>2. Conditions praise as a warning signal</strong> &mdash; When praise is always followed by &ldquo;but...&rdquo;, people learn to distrust positive feedback. Every time you say something nice, they brace for the criticism. This undermines ALL your positive feedback, even when it is genuine.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>3. Perceived as manipulative</strong> &mdash; Most people see through it immediately. It feels formulaic and insincere. Once someone recognises the pattern, they dismiss the praise as tactical rather than genuine and focus on the criticism with resentment.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>4. Undermines the corrective message</strong> &mdash; By softening the criticism with praise on both sides, the urgency and importance of the corrective message is diluted. If you need someone to change their behaviour, be direct about it.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>5. No empirical support</strong> &mdash; Despite its popularity, there is no robust research evidence that the feedback sandwich improves performance or behaviour change compared to direct, specific feedback.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">What to Use Instead</p>
                <p className="text-sm text-white/80">
                  Use direct, kind, specific feedback using the SBI model. You do not need to &ldquo;sugar
                  coat&rdquo; corrective feedback with praise. You need to be <strong className="text-white">
                  honest, specific, and respectful</strong>. Give positive feedback separately and frequently
                  so it stands on its own merit. Give corrective feedback directly when it is needed. Both are
                  more effective when they are not mixed together.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-2">Feedback Sandwich</p>
                    <p className="text-sm text-white/80">&ldquo;Your containment work was really neat this morning. But the cable runs in area C were messy and need redoing. Anyway, you are doing a great job overall.&rdquo;</p>
                    <p className="text-xs text-white/80 mt-2">The person hears: &ldquo;neat containment&rdquo; and &ldquo;great job overall.&rdquo; The critical message about area C is lost in the middle.</p>
                  </div>
                  <div>
                    <p className="text-green-400 font-semibold text-sm mb-2">Direct SBI Instead</p>
                    <p className="text-sm text-white/80">&ldquo;When you were running the cables in area C this morning, the runs were not up to the standard we agreed. It means we will need to redo them before inspection. Can you help me understand what happened?&rdquo;</p>
                    <p className="text-xs text-white/80 mt-2">Clear, specific, factual, non-judgemental. Opens a dialogue. No mixed messages. Give separate positive SBI about the neat containment at a different time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Feedforward (Marshall Goldsmith) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Feedforward (Marshall Goldsmith)
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Executive coach Marshall Goldsmith developed the <strong>feedforward</strong> concept
                based on a simple insight: we can change the future but we cannot change the past. Instead
                of giving feedback on what went wrong (which often triggers defensiveness), feedforward asks
                for <strong>suggestions for the future</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">How Feedforward Works</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">The Approach</p>
                    <p className="text-white/80 text-xs">Instead of: &ldquo;Your toolbox talk this morning was disorganised and people switched off halfway through.&rdquo;</p>
                    <p className="text-white text-xs mt-1">Try: &ldquo;Tomorrow&rsquo;s toolbox talk &mdash; what two things could you do to make sure everyone is engaged and clear on the key messages?&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">The Rules</p>
                    <ul className="text-white/80 text-xs space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span><strong className="text-white">Future-focused</strong> &mdash; only discuss what to do going forward, not what went wrong</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span><strong className="text-white">No personal critique</strong> &mdash; it is about improvement, not blame</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span><strong className="text-white">The only reply is &ldquo;thank you&rdquo;</strong> &mdash; no defending, no explaining, just listen and accept</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-amber-400 mb-2">When to Use Feedforward</p>
                <p className="text-sm text-white/80">
                  Feedforward is particularly effective with <strong className="text-white">experienced
                  people who resist being told what they did wrong</strong>. A seasoned electrician with 20
                  years on the tools is unlikely to respond well to &ldquo;here is what you did wrong.&rdquo;
                  But &ldquo;what two things could you do differently on the next install to get an even
                  better finish?&rdquo; invites them to use their expertise to improve without feeling
                  criticised. It preserves dignity while still driving improvement.
                </p>
              </div>

              <p>
                Goldsmith reports that feedforward is almost universally received more positively than
                traditional feedback. People enjoy giving and receiving suggestions for the future much
                more than discussing past failures. It also tends to produce more creative and practical
                solutions, because the person is thinking forward rather than defending the past.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Feedforward Examples on Site</p>
                <div className="space-y-2 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white/80 text-xs"><strong className="text-white">Instead of:</strong> &ldquo;Your toolbox talk was disorganised and people lost interest.&rdquo;</p>
                    <p className="text-white text-xs mt-1"><strong>Feedforward:</strong> &ldquo;For tomorrow&rsquo;s toolbox talk, what two things could you do to keep everyone engaged from start to finish?&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white/80 text-xs"><strong className="text-white">Instead of:</strong> &ldquo;Your cable runs on floor 2 were messy and needed rework.&rdquo;</p>
                    <p className="text-white text-xs mt-1"><strong>Feedforward:</strong> &ldquo;On floor 3, what could you do differently with the cable runs to get a really clean finish first time?&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white/80 text-xs"><strong className="text-white">Instead of:</strong> &ldquo;You did not follow the isolation procedure properly last week.&rdquo;</p>
                    <p className="text-white text-xs mt-1"><strong>Feedforward:</strong> &ldquo;Next time you are isolating, what steps will you take to make sure the procedure is followed completely?&rdquo;</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCw className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">When NOT to Use Feedforward</p>
                </div>
                <p className="text-sm text-white/80">
                  Feedforward is not appropriate for everything. <strong className="text-white">Safety
                  violations require direct, immediate corrective feedback</strong> &mdash; you cannot simply
                  ask &ldquo;what would you do differently next time?&rdquo; when someone has just created a
                  serious hazard. Similarly, repeated performance issues that have already been discussed need
                  clear, documented feedback using the SBI model. Use feedforward for development and
                  improvement conversations, not for serious disciplinary matters.
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
                This section has covered four evidence-based models for giving feedback and coaching your
                team. Each has its place, and the best leaders use all of them depending on the situation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">When to Use Each Model</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>SBI:</strong> Day-to-day feedback (both positive and corrective). Your default tool. Use it for specific incidents or behaviours.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>GROW:</strong> Longer coaching conversations about development, performance improvement, or career goals. Takes 15&ndash;30 minutes.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Feedforward:</strong> With experienced people, for ongoing improvement, or when someone is resistant to traditional feedback.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Sandwich:</strong> Do not use it. Use direct, specific SBI feedback instead.</span>
                  </div>
                </div>
              </div>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>SBI model:</strong> Situation &rarr; Behaviour &rarr; Impact &mdash; factual, specific, non-judgemental feedback</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>GROW model:</strong> Goal &rarr; Reality &rarr; Options &rarr; Will &mdash; structured coaching for development</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Feedback sandwich:</strong> Five research-based reasons why it fails &mdash; use direct SBI instead</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Feedforward:</strong> Future-focused suggestions, particularly effective with experienced people</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Give feedback regularly:</strong> Make it normal, informal, and frequent rather than rare and formal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>5:1 ratio:</strong> Five positive interactions for every corrective one to maintain trust and motivation</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Next:</strong> In Module 3, we move to
                  <strong> Communication for Leaders</strong> &mdash; how to communicate clearly with your
                  team, run effective toolbox talks, manage upward communication with project managers, and
                  handle difficult conversations on site.
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
            <Link to="../leadership-module-2-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-3">
              Next: Module 3 &mdash; Communication
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
