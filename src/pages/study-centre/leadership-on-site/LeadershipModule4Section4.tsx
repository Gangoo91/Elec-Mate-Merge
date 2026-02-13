import { ArrowLeft, CheckCircle, AlertTriangle, Shield, Eye, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "ld-resp-vs-account",
    question: "What is the key difference between responsibility and accountability?",
    options: [
      "Responsibility is for managers; accountability is for the team",
      "Responsibility is who does the task; accountability is who answers for the outcome",
      "They mean the same thing in a workplace context",
      "Accountability can be delegated but responsibility cannot"
    ],
    correctIndex: 1,
    explanation: "Responsibility refers to who performs the task — it can be delegated. Accountability refers to who answers for the outcome — it cannot be delegated. As a supervisor, you can give someone responsibility for installing a distribution board, but you remain accountable for the result. This is a fundamental principle of leadership."
  },
  {
    id: "ld-ladder-inference",
    question: "The Ladder of Inference describes how people:",
    options: [
      "Climb through the management hierarchy over their career",
      "Move from observable data to action through mental steps, often unconsciously",
      "Escalate workplace complaints from informal to formal processes",
      "Develop leadership skills from basic to advanced levels"
    ],
    correctIndex: 1,
    explanation: "Chris Argyris's Ladder of Inference describes the unconscious mental process we go through from observing raw data to taking action: we select data, add meaning, make assumptions, draw conclusions, adopt beliefs, and finally act. The danger is the 'reflexive loop' — our beliefs influence what data we notice next, creating confirmation bias. The lesson for leaders: check your assumptions before acting."
  },
  {
    id: "ld-just-culture",
    question: "In Sidney Dekker's Just Culture model, 'at-risk behaviour' should be addressed by:",
    options: [
      "Formal disciplinary action",
      "Consolation and support",
      "Coaching to help the person understand and change the behaviour",
      "Immediate dismissal"
    ],
    correctIndex: 2,
    explanation: "Just Culture distinguishes three types of behaviour: human error (unintentional mistakes — console the person), at-risk behaviour (taking shortcuts or risky actions, often normalised — coach them to understand the risk), and reckless behaviour (deliberate disregard for known risks — discipline). The key insight is that not every mistake is a disciplinary matter — the appropriate response depends on the nature of the behaviour."
  }
];

const faqs = [
  {
    question: "If I am accountable for everything my team does, does that mean I should do everything myself?",
    answer: "Absolutely not. Accountability does not mean doing everything yourself — it means you answer for the outcomes. You must delegate responsibility to your team members; this is how they develop and how work gets done efficiently. But you remain accountable for the quality, safety, and timeliness of the work. Your role is to set clear expectations, provide the right resources and support, check progress, and address shortfalls. If something goes wrong, you answer for it — not by saying 'it was Dave's fault' but by saying 'I am responsible for what happened on my watch and here is what I am doing about it.'"
  },
  {
    question: "How do I hold people accountable without creating a blame culture?",
    answer: "The key is distinguishing between accountability and blame. Accountability is forward-looking: 'We agreed on a standard, it was not met, how do we fix it and prevent it recurring?' Blame is backward-looking: 'Whose fault is this?' Focus on the gap between the expected standard and the actual result, not on punishing the person. Use Just Culture principles — was it an honest mistake (console), a risky shortcut (coach), or deliberate recklessness (discipline)? Apply consequences consistently across the team. If you only hold some people accountable, the system breaks down faster than having no accountability at all."
  },
  {
    question: "What is the Ladder of Inference and why does it matter for supervisors?",
    answer: "The Ladder of Inference, developed by Chris Argyris, describes the unconscious mental process we use to move from raw observation to action. We observe data, select what we notice, add our own meaning, make assumptions, draw conclusions, adopt beliefs, and then act. The problem is the 'reflexive loop' — our existing beliefs influence what data we select, creating confirmation bias. For supervisors, this matters because you might see a worker on their phone, assume they are not working, and give them a bollocking — when they were actually checking the drawing. The practical lesson: check your assumptions before acting on them."
  },
  {
    question: "What is psychological safety and how do I create it?",
    answer: "Psychological safety, a concept developed by Harvard professor Amy Edmondson, means that team members feel safe to speak up, ask questions, admit mistakes, and raise concerns without fear of punishment or humiliation. You create it by: (1) responding constructively when people report errors rather than punishing them, (2) admitting your own mistakes openly, (3) thanking people who raise concerns even when inconvenient, (4) never humiliating someone in front of the team, and (5) following through — if someone reports a near miss and nothing changes, they will not report the next one. Psychological safety is not about being soft — it is about creating an environment where the truth surfaces quickly."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The fundamental difference between responsibility and accountability is:",
    options: [
      "Responsibility is more important than accountability",
      "Accountability is only for senior managers",
      "Responsibility can be delegated but accountability cannot",
      "They are interchangeable terms with the same meaning"
    ],
    correctAnswer: 2,
    explanation: "You can delegate responsibility (who does the task) but you cannot delegate accountability (who answers for the outcome). A supervisor can assign tasks to team members but remains accountable for everything the team produces. This is a fundamental principle of leadership at every level."
  },
  {
    id: 2,
    question: "Chris Argyris's Ladder of Inference describes:",
    options: [
      "The steps in a formal disciplinary process",
      "How people move from observable data to action through unconscious mental steps",
      "The hierarchy of leadership skills from basic to advanced",
      "The stages of team development from forming to performing"
    ],
    correctAnswer: 1,
    explanation: "The Ladder of Inference describes the unconscious mental process from observation to action: observable data, select data, add meaning, make assumptions, draw conclusions, adopt beliefs, take action. The reflexive loop means our beliefs influence what data we select, creating confirmation bias."
  },
  {
    id: 3,
    question: "A supervisor sees a worker sitting in the welfare cabin during working hours and assumes they are lazy. This is an example of:",
    options: [
      "Effective observation and the OODA Loop",
      "Climbing the Ladder of Inference without checking assumptions",
      "Appropriate accountability for team performance",
      "Using the Thomas-Kilmann Competing mode correctly"
    ],
    correctAnswer: 1,
    explanation: "The supervisor has climbed the Ladder of Inference: observed data (person in cabin), selected it as significant, added meaning (should not be there), made an assumption (lazy), and is about to act on it — without checking. The person might be on a legitimate break, feeling unwell, completing paperwork, or taking a call from the office. The lesson: check your assumptions before acting."
  },
  {
    id: 4,
    question: "In Sidney Dekker's Just Culture model, the three categories of behaviour are:",
    options: [
      "Minor, moderate, and serious misconduct",
      "Acceptable, borderline, and unacceptable behaviour",
      "Human error, at-risk behaviour, and reckless behaviour",
      "Compliant, non-compliant, and negligent behaviour"
    ],
    correctAnswer: 2,
    explanation: "Just Culture distinguishes between human error (unintentional mistakes — console), at-risk behaviour (conscious choices where risk is not appreciated or has become normalised — coach), and reckless behaviour (conscious disregard of a known, substantial risk — discipline). Each requires a different response from the supervisor."
  },
  {
    id: 5,
    question: "When a leader admits a mistake quickly and honestly, the typical effect on team trust is:",
    options: [
      "Trust decreases because the team sees the leader as weak",
      "Trust is unaffected because the team does not care about mistakes",
      "Trust increases because it demonstrates integrity and creates safety for honesty",
      "Trust decreases because the team expects leaders to be right all the time"
    ],
    correctAnswer: 2,
    explanation: "Admitting mistakes quickly and honestly builds trust faster than pretending to be perfect. It demonstrates integrity, shows the team it is safe to be honest about errors, and models the accountability you want from others. 'I got that wrong, here is what I am going to do about it' is one of the most powerful things a leader can say."
  },
  {
    id: 6,
    question: "The worst thing a supervisor can do when holding the team accountable is:",
    options: [
      "Setting clear standards before the work starts",
      "Following up to check whether standards were met",
      "Holding some people accountable but letting others slide",
      "Addressing shortfalls promptly and directly"
    ],
    correctAnswer: 2,
    explanation: "Inconsistent accountability — holding some people to account while letting others get away with the same behaviour — destroys team trust faster than almost anything. If the team sees that standards only apply to some people, they will lose respect for the supervisor, resent the perceived favouritism, and disengage from the standards entirely."
  },
  {
    id: 7,
    question: "Amy Edmondson's concept of psychological safety means:",
    options: [
      "The physical workspace is free from hazards",
      "Team members feel safe to speak up, admit mistakes, and raise concerns without fear",
      "The team is protected from criticism by management",
      "Workers are guaranteed job security regardless of performance"
    ],
    correctAnswer: 1,
    explanation: "Psychological safety means team members feel safe to take interpersonal risks — speaking up, asking questions, admitting mistakes, raising concerns — without fear of punishment, humiliation, or negative consequences. It is the foundation of learning organisations. When people hide mistakes because they fear the consequences, the same errors keep repeating."
  },
  {
    id: 8,
    question: "An electrician accidentally connects a circuit incorrectly but immediately reports the error. Under Just Culture principles, the appropriate response is to:",
    options: [
      "Issue a formal written warning for the mistake",
      "Console the person and work together to fix the error and prevent recurrence",
      "Coach them on the risks of making errors",
      "Remove them from electrical work pending retraining"
    ],
    correctAnswer: 1,
    explanation: "Under Just Culture, an honest human error — an unintentional mistake reported promptly — calls for consolation and support, not punishment. The focus should be on fixing the error, understanding how it happened, and implementing changes (better lighting, clearer drawings, checking process) to prevent recurrence. Punishing honest mistakes ensures people will hide them next time."
  }
];

export default function LeadershipModule4Section4() {
  useSEO({
    title: "Taking Responsibility and Accountability | Leadership Module 4.4",
    description: "Responsibility vs accountability, the Ladder of Inference, owning mistakes, holding others accountable fairly, and building a Just Culture.",
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
            <Link to="../leadership-module-4-section-3">
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
            <Shield className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Taking Responsibility and Accountability
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The difference between responsibility and accountability, checking your assumptions, owning your mistakes, and building a culture where people learn from errors
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Responsibility:</strong> Who does the task &mdash; can be delegated</li>
              <li><strong>Accountability:</strong> Who answers for the outcome &mdash; cannot be delegated</li>
              <li><strong>Assumptions:</strong> The Ladder of Inference &mdash; check before acting</li>
              <li><strong>Culture:</strong> Just Culture &mdash; console, coach, or discipline</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">For Site Leaders</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Own it:</strong> Admit mistakes quickly &mdash; it builds trust, not weakness</li>
              <li><strong>Consistency:</strong> Hold everyone to the same standard, no exceptions</li>
              <li><strong>Safety:</strong> Create an environment where people report errors freely</li>
              <li><strong>Learning:</strong> If people hide mistakes, the same errors keep repeating</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Distinguish clearly between responsibility and accountability in a leadership context",
              "Describe the Ladder of Inference and explain how it leads to flawed assumptions",
              "Demonstrate effective approaches to admitting and learning from mistakes",
              "Apply fair and consistent accountability standards across a team",
              "Explain Just Culture principles and when to console, coach, or discipline",
              "Describe psychological safety and its importance for team learning and error reporting"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Responsibility vs Accountability */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Difference Between Responsibility and Accountability
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                These two words are often used interchangeably, but they mean fundamentally
                different things in a leadership context. Understanding the distinction is essential
                for every supervisor.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">The Core Distinction</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-lg font-bold text-rose-400">Responsibility</p>
                    <p className="text-white/80 mt-1">Who <strong className="text-white">does</strong> the task. Responsibility <strong className="text-white">can be delegated</strong>. You assign an electrician to install a distribution board &mdash; they are responsible for carrying out the installation.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-lg font-bold text-rose-400">Accountability</p>
                    <p className="text-white/80 mt-1">Who <strong className="text-white">answers for the outcome</strong>. Accountability <strong className="text-white">cannot be delegated</strong>. As the supervisor, you are accountable for the quality, safety, and timeliness of that installation &mdash; even though someone else did the work.</p>
                  </div>
                </div>
              </div>

              <p>
                This is a fundamental principle of leadership: <strong>you can delegate responsibility
                but you cannot delegate accountability</strong>. As a supervisor, you are accountable
                for everything your team does &mdash; even tasks you did not personally perform.
                When something goes wrong, you cannot say &ldquo;that was Dave&rsquo;s job, not
                mine.&rdquo; Dave was responsible for doing the work. You are accountable for the
                outcome.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What This Means in Practice</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">You set the standards</strong> &mdash; if you do not make expectations clear, you cannot hold anyone accountable for not meeting them</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">You provide the resources</strong> &mdash; if the team does not have the tools, materials, or training they need, the failure is yours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">You check the work</strong> &mdash; accountability means following up, not just assigning and hoping for the best</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">You answer for the outcome</strong> &mdash; when the site manager asks why the programme is behind, you answer, not your team</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Accountability Failures</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">&ldquo;That was Dave&rsquo;s job&rdquo;</strong> &mdash; blaming the person you delegated to instead of owning the outcome as their supervisor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">&ldquo;Nobody told me&rdquo;</strong> &mdash; as a supervisor, it is your job to find out, not to wait to be told</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">&ldquo;It was not in my scope&rdquo;</strong> &mdash; even if technically true, leaders find ways to solve problems rather than hide behind boundaries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">&ldquo;I did not know&rdquo;</strong> &mdash; as the person accountable, knowing is your responsibility</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Delegation Trap</p>
                </div>
                <p className="text-sm text-white/80">
                  Some supervisors confuse delegation with abdication. <strong className="text-white">
                  Delegation</strong> means assigning a task with clear expectations, providing the
                  right support, and following up to check progress. <strong className="text-white">
                  Abdication</strong> means handing over and walking away without any follow-up
                  or support. When you delegate, you remain accountable for the outcome. Effective
                  delegation includes clear instructions, the right level of support for the
                  individual&rsquo;s experience level, defined check points at agreed intervals,
                  and a feedback loop &mdash; not just &ldquo;get on with it.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Ladder of Inference */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Ladder of Inference (Chris Argyris)
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Ladder of Inference, developed by organisational psychologist <strong>Chris
                Argyris</strong>, describes how we move from observable data to action through a
                series of mental steps &mdash; often unconsciously and at great speed. Understanding
                this process is critical for leaders because it explains how we arrive at flawed
                conclusions and unfair judgements.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Seven Rungs (Bottom to Top)</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white"><strong>1. Observable Data</strong> &mdash; The raw facts available to everyone. What a camera would record.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white"><strong>2. Select Data</strong> &mdash; You unconsciously filter what you notice. You cannot process everything, so your brain selects what seems relevant.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white"><strong>3. Add Meaning</strong> &mdash; You interpret what you have noticed through your own lens &mdash; your experience, culture, values, and assumptions.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white"><strong>4. Make Assumptions</strong> &mdash; Based on your interpretation, you fill in the gaps with assumptions about what is happening and why.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white"><strong>5. Draw Conclusions</strong> &mdash; You reach a conclusion about the situation based on your assumptions.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white"><strong>6. Adopt Beliefs</strong> &mdash; Your conclusion becomes a belief that shapes how you see this person or situation going forward.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-rose-500/30">
                    <p className="text-white"><strong>7. Take Action</strong> &mdash; You act based on your beliefs, which may be completely wrong because they rest on filtered data and unchecked assumptions.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Reflexive Loop &mdash; Construction Example</p>
                <p className="text-sm text-white/80 mb-3">
                  A supervisor sees a worker on their phone during working hours. They assume the
                  worker is not working. They give them a bollocking. But the worker was checking the
                  drawing on the project app. The supervisor&rsquo;s <strong className="text-white">
                  beliefs influenced what data they selected</strong> (the reflexive loop) &mdash; if
                  they already believe the worker is lazy, they interpret the phone use negatively.
                </p>
                <p className="text-sm text-white font-medium">
                  The lesson: CHECK YOUR ASSUMPTIONS before acting. Ask: &ldquo;What are you looking
                  at?&rdquo; before assuming the worst.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Owning Your Mistakes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Owning Your Mistakes
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every leader makes mistakes. The question is what you do next. Admitting mistakes
                quickly and honestly builds trust faster than pretending to be perfect. Trying to
                hide errors or shift blame is not only dishonest &mdash; it is counterproductive,
                because the team always knows.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Power Statement</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>&ldquo;I got that wrong. Here is what I am going to do about it.&rdquo;</strong>
                  <br /><br />
                  This is one of the most powerful things a leader can say. It demonstrates integrity,
                  builds trust, and shows the team that it is safe to be honest about mistakes.
                </p>
              </div>

              <p>
                Contrast this with <strong>blame culture</strong>, where nobody admits anything,
                every mistake becomes a witch hunt, and the same errors keep happening because nobody
                talks about them honestly. In blame culture, people hide problems until they become
                crises. In accountability culture, problems surface early when they are still
                manageable.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Owning Mistakes Looks Like in Practice</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">In the toolbox talk:</strong> &ldquo;Yesterday I made a call to prioritise Zone C over Zone B. That turned out to be wrong because the plastering overran. Today we are correcting that &mdash; here is the revised plan.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">In the progress meeting:</strong> &ldquo;We lost a day because I underestimated the cable pulling time. I have adjusted the forecast and here is how we recover.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">With your manager:</strong> &ldquo;I made the wrong call on the material order. It is going to cost us an extra day. I have already sourced an alternative and we can recover by Thursday.&rdquo;</span>
                  </li>
                </ul>
                <p className="text-sm text-white/80 mt-2">
                  Notice the pattern: acknowledge the error, state the impact, present the solution.
                  This is how leaders communicate when things go wrong &mdash; concisely, honestly,
                  and with a clear path forward.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Blame Culture vs Accountability Culture</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-2">Blame Culture</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>People hide mistakes until they become crises</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Near misses go unreported &mdash; nobody learns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Same errors repeat because the cause is never addressed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Creativity and initiative are suppressed by fear</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-green-400 font-semibold text-sm mb-2">Accountability Culture</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Problems surface early when they are still manageable</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Near misses are reported and lessons shared</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Root causes are found and systemic improvements made</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>People take ownership and suggest improvements</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Holding Others Accountable — Fairly */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Holding Others Accountable &mdash; Fairly
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Accountability is not about blame &mdash; it is about setting clear expectations
                and following through consistently. The steps are straightforward, but the consistency
                is where most supervisors fail.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Five Steps of Fair Accountability</p>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">1. Set Clear Standards</p>
                    <p className="text-white/80">People cannot meet expectations they do not know about. Be explicit about what &ldquo;good&rdquo; looks like &mdash; quality, timescale, safety requirements, and documentation. Vague standards produce vague results.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">2. Communicate Them</p>
                    <p className="text-white/80">Ensure the team genuinely understands the standards, not just that they were told once. Check understanding: &ldquo;Can you talk me through what you are going to do?&rdquo; is more effective than &ldquo;Do you understand?&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">3. Follow Up</p>
                    <p className="text-white/80">Check whether the standards are being met. Walk the job, inspect the work, review progress. Accountability without follow-up is meaningless &mdash; people quickly learn which supervisors check and which do not.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">4. Address Shortfalls Promptly</p>
                    <p className="text-white/80">When standards are not met, address it immediately and directly. Delay makes the conversation harder and sends the message that the standard is optional. Be specific about the gap and what needs to change.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">5. Apply Consequences Consistently</p>
                    <p className="text-white/80">The same standards, the same follow-up, and the same consequences for everyone. No favourites, no exceptions. This is the hardest step and the most important.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Consistency Principle</p>
                </div>
                <p className="text-sm text-white/80">
                  The worst thing you can do is hold some people accountable while letting others
                  slide. This destroys team trust faster than almost anything. If two electricians
                  produce the same quality of work but only one gets pulled up, the message is clear:
                  standards do not matter &mdash; favouritism does. <strong className="text-white">
                  Consistent accountability, applied fairly to everyone, is the foundation of team
                  respect.</strong>
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Accountability Conversations &mdash; A Practical Approach</p>
                <p className="text-sm text-white/80 mb-2">
                  When you need to address a shortfall, keep the conversation structured:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">State the standard:</strong> &ldquo;We agreed that all terminations would be tested before glanding off.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">State the gap:</strong> &ldquo;I have checked three junction boxes and none were tested before being closed up.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Ask for their perspective:</strong> &ldquo;Help me understand what happened.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Agree the fix:</strong> &ldquo;What are we going to do differently from tomorrow?&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Follow up:</strong> Check within 24 hours that the new approach is being followed.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Building a Culture of Responsibility */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Building a Culture of Responsibility
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A culture of responsibility does not happen by accident &mdash; it is built
                deliberately through the way leaders respond to errors, the systems they create, and
                the environment they foster. Two research-based frameworks provide the foundation:
                <strong> Just Culture</strong> and <strong>Psychological Safety</strong>.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Just Culture (Sidney Dekker)</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Not every mistake is a disciplinary matter. Just Culture provides a framework for
                  responding appropriately to different types of behaviour:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-green-400 font-medium mb-1">Human Error</p>
                    <p className="text-white/80 text-xs">Unintentional mistakes &mdash; slips, lapses, misunderstandings. The person did not intend to make an error.</p>
                    <p className="text-green-400 text-xs font-semibold mt-2">Response: CONSOLE</p>
                    <p className="text-white/80 text-xs">Support the person, fix the error, improve the system to prevent recurrence.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-amber-400 font-medium mb-1">At-Risk Behaviour</p>
                    <p className="text-white/80 text-xs">Conscious choices where the risk is not appreciated or has become normalised. Taking shortcuts that &ldquo;everyone does.&rdquo;</p>
                    <p className="text-amber-400 text-xs font-semibold mt-2">Response: COACH</p>
                    <p className="text-white/80 text-xs">Help the person understand the risk, why the shortcut is dangerous, and change the behaviour.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-red-400 font-medium mb-1">Reckless Behaviour</p>
                    <p className="text-white/80 text-xs">Deliberate, conscious disregard of a known, substantial risk. The person knew the risk and chose to proceed anyway.</p>
                    <p className="text-red-400 text-xs font-semibold mt-2">Response: DISCIPLINE</p>
                    <p className="text-white/80 text-xs">Formal action is appropriate. This is the only category where punishment is the right response.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Psychological Safety (Amy Edmondson)</p>
                <p className="text-sm text-white/80 mb-3">
                  Harvard professor Amy Edmondson&rsquo;s research shows that <strong className="text-white">
                  psychological safety</strong> &mdash; the belief that you will not be punished or
                  humiliated for speaking up, asking questions, or admitting mistakes &mdash; is the
                  foundation of learning organisations and high-performing teams.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">If people hide mistakes</strong>, the same errors repeat because the organisation never learns from them</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">If people fear speaking up</strong>, safety hazards go unreported, near misses are concealed, and avoidable accidents happen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">If people feel safe to speak</strong>, errors are caught early, ideas improve, and the team continuously learns and improves</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Building it daily:</strong> Psychological safety
                  is not a policy &mdash; it is a set of daily behaviours. Thank people who raise
                  concerns. Respond constructively to error reports. Admit your own mistakes. Never
                  humiliate someone in front of the team. If someone reports a near miss and nothing
                  changes, they will not report the next one. Your response to the first reported
                  error determines whether the second one ever surfaces.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Accountability is the bedrock of effective leadership. It is not about being
                perfect &mdash; it is about owning outcomes, checking assumptions, and creating an
                environment where the whole team takes responsibility. The key points from this
                section are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Responsibility vs accountability:</strong> You can delegate who does the task, but you cannot delegate who answers for the outcome</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Ladder of Inference:</strong> We move from data to action through unconscious mental steps &mdash; always check your assumptions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Own your mistakes:</strong> &ldquo;I got that wrong, here is what I am going to do about it&rdquo; &mdash; admit fast, learn, move on</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Fair accountability:</strong> Set standards, communicate, follow up, address shortfalls, apply consequences consistently</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Just Culture:</strong> Human error (console), at-risk behaviour (coach), reckless behaviour (discipline)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Psychological safety:</strong> People must feel safe to speak up, report errors, and raise concerns without fear</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Next:</strong> Module 5 &mdash; Leading on Site.
                  We move from the theory of leadership to the daily practice: running effective
                  toolbox talks, managing your first week as supervisor, building relationships with
                  other trades, and developing your leadership style through experience.
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
            <Link to="../leadership-module-4-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-5">
              Next: Module 5 &mdash; Leading on Site
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
