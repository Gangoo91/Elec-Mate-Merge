import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Target, Users, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "delegation-skillwill",
    question: "In the Skill-Will Matrix, an experienced electrician who has the technical ability but seems disengaged and unmotivated falls into which quadrant?",
    options: [
      "High Will, Low Skill — needs guiding and coaching",
      "High Will, High Skill — can be fully delegated to",
      "Low Will, High Skill — needs exciting and motivating",
      "Low Will, Low Skill — needs directing and close supervision"
    ],
    correctIndex: 2,
    explanation: "An experienced but disengaged worker has high skill but low will — they know HOW to do the work but have lost the motivation. The correct approach is to EXCITE them: find out what has caused the disengagement, reconnect them with meaningful work, give them ownership, and reignite their interest. Giving them more instruction (which they do not need) will only increase frustration."
  },
  {
    id: "delegation-levels",
    question: "According to Jurgen Appelo's Seven Levels of Delegation, Level 4 'Agree' means:",
    options: [
      "Tell the person exactly what to do with no discussion",
      "You decide but explain your reasons to gain buy-in",
      "You and the team member decide together as equals",
      "The team member decides independently without reporting back"
    ],
    correctIndex: 2,
    explanation: "Level 4 'Agree' means the decision is made jointly — you and the team member discuss the options and reach agreement together. This is the midpoint of the delegation spectrum, appropriate for decisions where both parties bring valuable perspective and shared ownership of the outcome is beneficial. It builds trust while maintaining involvement."
  },
  {
    id: "delegation-smart",
    question: "A supervisor tells an apprentice 'Sort out area B when you get a chance.' What SMART delegation principle is most obviously missing?",
    options: [
      "Specific — 'sort out' is vague and could mean anything",
      "Achievable — the task is impossible for an apprentice",
      "Relevant — area B has nothing to do with the project",
      "Time-bound — 'when you get a chance' has no deadline"
    ],
    correctIndex: 0,
    explanation: "While 'when you get a chance' also lacks a deadline (Time-bound), the most obviously missing element is Specific. 'Sort out area B' could mean tidy up, complete the first fix, do the testing, move materials — it is completely vague. Good delegation would specify exactly what needs doing: 'Complete the first fix wiring in area B, connecting all socket outlets to the distribution board per the drawing.'"
  }
];

const faqs = [
  {
    question: "I find it quicker to just do things myself rather than explaining them to someone else. Is that OK?",
    answer: "This is the most common trap new supervisors fall into, and it is understandable — in the short term, doing it yourself IS faster. But this approach has three serious consequences: (1) you become a bottleneck, because everything depends on you, (2) you burn out, because you are doing the work AND managing, (3) your team does not develop, because they never get the chance to learn. Delegation is an investment: it takes more time upfront but pays back exponentially. An hour spent teaching someone a task saves you hundreds of hours over the following months. Your role as a supervisor is to multiply output through others, not to be the best individual worker."
  },
  {
    question: "What should I do when I delegate something and the person does it differently to how I would have done it?",
    answer: "Ask yourself one question: did they achieve the required outcome to the required standard? If yes, then their method is valid — even if it differs from yours. One of the hardest transitions from tradesperson to supervisor is accepting that there are multiple ways to achieve a good result. Insisting everyone does things exactly your way is micromanagement, and it stifles development and initiative. Only intervene if the method is unsafe, non-compliant with regulations, or produces a substandard result. Otherwise, let people develop their own approaches. You may even learn something."
  },
  {
    question: "How do I delegate to someone who is more experienced than me?",
    answer: "This is a common situation, especially for newly promoted supervisors. The key is to delegate at a high level — use Level 5 (Advise), Level 6 (Inquire), or Level 7 (Delegate) from Appelo's model. You might say: 'Dave, I need the containment run in corridor C completed by Thursday. You know the spec better than I do — how do you want to approach it?' This acknowledges their expertise, gives clear expectations (what and when), and trusts them with the how. Avoid telling experienced people how to do tasks they know better than you — it destroys trust instantly."
  },
  {
    question: "What is the 'monkey on the back' concept and why does it matter?",
    answer: "The 'monkey on the back' is a famous concept from a Harvard Business Review article by William Oncken Jr. and Donald Wass. The 'monkey' is the next action on a task. When you delegate a task, the monkey is on the other person's back. But if they come back with a problem and you say 'Leave it with me, I will sort it,' the monkey jumps back onto YOUR back. Before you know it, you have dozens of monkeys (tasks) that you took back from people. The solution: when someone brings you a problem with a delegated task, ask 'What do you think we should do?' and help them solve it rather than taking it back. Keep the monkey on their back."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The biggest mistake new supervisors typically make with delegation is:",
    options: [
      "Delegating too many tasks to their team",
      "Trying to do everything themselves instead of delegating",
      "Delegating only to the most experienced team members",
      "Asking for too much feedback on delegated tasks"
    ],
    correctAnswer: 1,
    explanation: "The most common mistake is trying to do the work themselves rather than leading through others. New supervisors often feel they can do tasks faster and better, but this creates a bottleneck, leads to burnout, and prevents the team from developing."
  },
  {
    id: 2,
    question: "In the Skill-Will Matrix, a new apprentice who is enthusiastic but lacks technical skills should be:",
    options: [
      "Delegated to — given full autonomy with no supervision",
      "Excited — given motivational talks and recognition",
      "Guided — given coaching, support, and gradually increasing responsibility",
      "Directed — given strict instructions with no explanation"
    ],
    correctAnswer: 2,
    explanation: "A new apprentice with high will but low skill falls into the GUIDE quadrant. They need coaching, clear instruction, and supported practice — not full autonomy (they lack skills) and not just motivation (they already have that). Guiding combines teaching with encouragement."
  },
  {
    id: 3,
    question: "Jurgen Appelo's Seven Levels of Delegation range from Level 1 (Tell) to Level 7 (Delegate). Level 1 means:",
    options: [
      "You and the team member decide together",
      "The team member decides and does not need to report back",
      "You make the decision and tell the person exactly what to do",
      "You give your opinion but let the person decide"
    ],
    correctAnswer: 2,
    explanation: "Level 1 (Tell) means you make the decision and communicate it clearly: 'Do this, exactly this way.' It is appropriate for safety-critical tasks, emergencies, or situations where there is only one acceptable method. Using Level 1 for every task is micromanagement, but it has its place."
  },
  {
    id: 4,
    question: "The 'S' in SMART delegation stands for:",
    options: [
      "Simple — the task should be easy to understand",
      "Specific — exactly what needs to be done should be clearly defined",
      "Supervised — the person should be watched while doing the task",
      "Strategic — the task should align with business goals"
    ],
    correctAnswer: 1,
    explanation: "Specific means the task is clearly defined — what exactly needs to be done, what the deliverable looks like, and what 'done' means. 'Sort out area B' is not specific. 'Complete the first fix wiring in area B to drawing E-101, connecting all socket outlets to DB-3' IS specific."
  },
  {
    id: 5,
    question: "Which is the WORST delegation mistake according to research?",
    options: [
      "Delegating boring tasks as well as interesting ones",
      "Following up on delegated tasks regularly",
      "Micromanaging after you have delegated — not letting go",
      "Explaining why the task matters to the project"
    ],
    correctAnswer: 2,
    explanation: "Micromanaging after delegating is widely regarded as the worst delegation mistake. It undermines trust, signals that you do not believe in the person's ability, removes their sense of ownership, and defeats the purpose of delegating in the first place. If you cannot let go, you have not truly delegated."
  },
  {
    id: 6,
    question: "The 'monkey on the back' concept (Harvard Business Review) describes:",
    options: [
      "The weight of responsibility that supervisors carry",
      "How delegated tasks jump back to the supervisor when they take problems back",
      "The natural progression of career development in management",
      "How stress accumulates during busy project phases"
    ],
    correctAnswer: 1,
    explanation: "The 'monkey' is the next action on a task. When a supervisor takes back a problem from someone they delegated to ('Leave it with me'), the monkey jumps from the team member's back onto the supervisor's. Effective leaders help people solve problems rather than taking the problems back."
  },
  {
    id: 7,
    question: "For a highly skilled, highly motivated electrician, the most appropriate delegation level would be:",
    options: [
      "Level 1 (Tell) — give exact instructions for every task",
      "Level 3 (Consult) — ask for their input before you decide",
      "Level 6 or 7 (Inquire/Delegate) — let them decide with minimal oversight",
      "Level 4 (Agree) — always make decisions jointly"
    ],
    correctAnswer: 2,
    explanation: "A high-skill, high-will team member (the 'Delegate' quadrant of the Skill-Will Matrix) should be given maximum autonomy. Levels 6 (Inquire: you decide, just tell me about it) and 7 (Delegate: you decide, no need to tell me) are appropriate. Using lower levels would be demotivating and signal a lack of trust."
  },
  {
    id: 8,
    question: "When you delegate without giving the person the authority to make decisions about the task, this is called:",
    options: [
      "SMART delegation",
      "Servant leadership",
      "Delegating without authority",
      "The skill-will approach"
    ],
    correctAnswer: 2,
    explanation: "Delegating without authority means giving someone responsibility for a task but not the power to make decisions about how to complete it. For example, asking someone to coordinate a task but requiring them to check every decision with you first. This creates frustration and bottlenecks — if you delegate the task, delegate the authority to complete it."
  }
];

export default function LeadershipModule2Section2() {
  useSEO({
    title: "Delegating Effectively | Leadership Module 2.2",
    description: "The Skill-Will Matrix, Seven Levels of Delegation, SMART delegation framework, and common delegation mistakes for construction site leaders.",
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
            <Link to="../leadership-module-2-section-1">
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
            <Target className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Delegating Effectively
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Why delegation is a core leadership skill, how to match your approach to each person, and how to avoid the most common mistakes that new supervisors make
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Core truth:</strong> Delegation is not dumping work &mdash; it is strategic development</li>
              <li><strong>Skill-Will Matrix:</strong> Match your approach to each person&rsquo;s ability and motivation</li>
              <li><strong>7 Levels:</strong> From &ldquo;Tell&rdquo; to full &ldquo;Delegate&rdquo; (Appelo)</li>
              <li><strong>Biggest mistake:</strong> Micromanaging after you have delegated</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">For Site Leaders</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>SMART tasks:</strong> Specific, Measurable, Achievable, Relevant, Time-bound</li>
              <li><strong>New apprentice:</strong> Guide &mdash; high support, clear instruction</li>
              <li><strong>Experienced spark:</strong> Delegate &mdash; set outcome, trust the method</li>
              <li><strong>Keep the monkey:</strong> Help people solve problems, do not take tasks back</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain why effective delegation is essential for supervisory success",
              "Apply the Skill-Will Matrix to determine the right approach for each team member",
              "Describe the Seven Levels of Delegation and select the appropriate level",
              "Use the SMART framework to delegate tasks clearly and effectively",
              "Identify and avoid the six most common delegation mistakes",
              "Apply the 'monkey on the back' concept to maintain team ownership of tasks"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Delegation Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Why Delegation Matters
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                You cannot do everything yourself. This is the first and most important lesson for any new
                supervisor. Trying to do it all leads to three inevitable outcomes: <strong>burnout</strong>
                (you work longer and harder until you break), <strong>bottleneck</strong> (everything stalls
                because it all flows through you), and <strong>undeveloped team</strong> (nobody else grows
                because they never get the chance).
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Fundamental Shift</p>
                <p className="text-base text-white leading-relaxed">
                  Delegation is not dumping work on other people. It is the <strong>strategic allocation of
                  tasks</strong> to develop your team AND get better outcomes. When you were a tradesperson,
                  you were measured on your own output. As a supervisor, you are measured on the
                  <strong> team&rsquo;s output</strong>. Your job is to multiply performance through others,
                  not to be the best individual worker.
                </p>
              </div>

              <p>
                The biggest mistake new supervisors make is trying to do the technical work themselves instead
                of leading. It is understandable &mdash; you were promoted because you were good at the work,
                and doing the work feels productive. But every hour you spend on the tools is an hour you are
                not planning, coordinating, developing people, or solving the problems that only a supervisor
                can solve.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Why Supervisors Resist Delegating</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;I can do it faster myself&rdquo;</strong> &mdash; True in the short term, catastrophic in the long term. You become a bottleneck.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;They won&rsquo;t do it as well as me&rdquo;</strong> &mdash; Maybe not the first time. But they never will if they never get the chance to practise.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;It&rsquo;s quicker to just do it&rdquo;</strong> &mdash; Teaching takes longer upfront but saves thousands of hours over time.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;I feel guilty giving work to others&rdquo;</strong> &mdash; Delegation is not laziness. It is your job. Failing to delegate is failing to lead.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;What if they mess it up?&rdquo;</strong> &mdash; People learn by doing. Mistakes are part of development. Set guardrails, check in at milestones, but let people learn.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;I miss being on the tools&rdquo;</strong> &mdash; Natural and common. But your value has shifted from doing the work to enabling others to do it. Your impact multiplies through the team.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Bottleneck Test</p>
                </div>
                <p className="text-sm text-white/80">
                  Ask yourself: &ldquo;If I were off sick for a week, would the work continue?&rdquo; If
                  the answer is no &mdash; if everything would grind to a halt because only you know how to
                  do certain things or make certain decisions &mdash; then you have a delegation problem.
                  <strong className="text-white"> A well-led team should be able to function (not perfectly,
                  but adequately) in the leader&rsquo;s absence.</strong> If it cannot, you have made
                  yourself a single point of failure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Skill-Will Matrix */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Skill-Will Matrix
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Skill-Will Matrix is a practical framework for deciding how to delegate to different
                people. It uses two axes: <strong>Skill</strong> (technical ability, from low to high)
                and <strong>Will</strong> (motivation and engagement, from low to high). This creates four
                quadrants, each requiring a different leadership approach.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">The Four Quadrants</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold mb-1">High Will, Low Skill &rarr; GUIDE</p>
                    <p className="text-white/80 text-xs mb-2">The enthusiastic beginner. Motivated and keen but lacks technical ability.</p>
                    <p className="text-white text-xs"><strong>Example:</strong> A new apprentice on their first site. Eager to learn, asks lots of questions, but needs close instruction on methods and standards.</p>
                    <p className="text-white text-xs mt-1"><strong>Approach:</strong> Coach, teach, demonstrate, set clear expectations, give regular feedback, gradually increase responsibility.</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                    <p className="text-blue-400 font-semibold mb-1">High Will, High Skill &rarr; DELEGATE</p>
                    <p className="text-white/80 text-xs mb-2">The dream team member. Skilled, experienced, and motivated.</p>
                    <p className="text-white text-xs"><strong>Example:</strong> An experienced electrician who takes pride in their work, keeps up with regulations, and actively looks for ways to improve.</p>
                    <p className="text-white text-xs mt-1"><strong>Approach:</strong> Set the outcome, trust the method, give autonomy, check in lightly, recognise their contribution.</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold mb-1">Low Will, High Skill &rarr; EXCITE</p>
                    <p className="text-white/80 text-xs mb-2">Skilled but disengaged. Knows the work but has lost motivation.</p>
                    <p className="text-white text-xs"><strong>Example:</strong> A qualified electrician with years of experience who has become disengaged &mdash; does the minimum, seems bored, no longer takes pride in quality.</p>
                    <p className="text-white text-xs mt-1"><strong>Approach:</strong> Find out what demotivated them, give meaningful challenges, provide ownership, recognise expertise, listen.</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold mb-1">Low Will, Low Skill &rarr; DIRECT</p>
                    <p className="text-white/80 text-xs mb-2">Lacks both ability and motivation. Needs the most support.</p>
                    <p className="text-white text-xs"><strong>Example:</strong> A labourer with no electrical background who has been told to help but does not want to be there and does not know what to do.</p>
                    <p className="text-white text-xs mt-1"><strong>Approach:</strong> Clear instructions, close supervision, set small achievable goals, build confidence, address motivational barriers.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Critical Insight</p>
                </div>
                <p className="text-sm text-white/80">
                  The most common mistake is treating an &ldquo;Excite&rdquo; person (high skill, low will) like
                  a &ldquo;Guide&rdquo; (high will, low skill) &mdash; giving them instruction when what they
                  actually need is motivation and meaning. Telling an experienced electrician how to do something
                  they have done a thousand times is insulting and will make disengagement worse. Instead, ask
                  them what would make the work more interesting, give them ownership of a section, or involve
                  them in mentoring apprentices.
                </p>
              </div>

              <p>
                People also move between quadrants over time. An enthusiastic apprentice (Guide) develops
                skills and becomes Delegate material. An experienced worker who suffers burnout or personal
                problems might shift from Delegate to Excite. <strong>Reassess regularly</strong> &mdash;
                the approach that worked last month may not work this month if circumstances have changed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Spotting the Quadrants on Site</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span><strong>Guide signs:</strong> Asks lots of questions, volunteers for tasks, makes mistakes through inexperience not carelessness, eager to learn</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong>Delegate signs:</strong> Produces consistent quality, takes initiative, solves problems independently, others go to them for help</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong>Excite signs:</strong> Technically competent but doing the bare minimum, seems bored, watches the clock, quality has dropped from their known capability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong>Direct signs:</strong> Unsure what to do, reluctant to start tasks, needs constant checking, may seem withdrawn or anxious</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Seven Levels of Delegation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The Seven Levels of Delegation (Jurgen Appelo)
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Jurgen Appelo&rsquo;s Management 3.0 framework describes <strong>seven levels of
                delegation</strong>, ranging from the leader making all decisions to the team having complete
                autonomy. Effective delegation is not binary (delegate or don&rsquo;t) &mdash; it is a
                spectrum, and the right level depends on the person, the task, and the consequences of
                getting it wrong.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Seven Levels</p>
                <div className="space-y-3 text-sm">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-white font-medium">Level 1: Tell</p>
                    <p className="text-white/80 text-xs">&ldquo;Do this exactly as I say.&rdquo; You make the decision, no discussion. Use for: safety-critical tasks, emergencies, regulatory compliance.</p>
                    <p className="text-white text-xs mt-1"><strong>Site example:</strong> &ldquo;Isolate that circuit now using the lock-off procedure. Do not energise until I have verified it personally.&rdquo;</p>
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-lg">
                    <p className="text-white font-medium">Level 2: Sell</p>
                    <p className="text-white/80 text-xs">&ldquo;Do this, and here is why.&rdquo; You make the decision but explain your reasoning to gain buy-in.</p>
                    <p className="text-white text-xs mt-1"><strong>Site example:</strong> &ldquo;We are switching to containment-first installation because it reduces rework. Here is how it helped on the last project.&rdquo;</p>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg">
                    <p className="text-white font-medium">Level 3: Consult</p>
                    <p className="text-white/80 text-xs">&ldquo;I need your input before I decide.&rdquo; You seek opinions but retain the final decision.</p>
                    <p className="text-white text-xs mt-1"><strong>Site example:</strong> &ldquo;I am thinking about the cable route for the new distribution board. What are your thoughts on running through the ceiling void versus surface?&rdquo;</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-white font-medium">Level 4: Agree</p>
                    <p className="text-white/80 text-xs">&ldquo;Let us decide together.&rdquo; The decision is made jointly as equals.</p>
                    <p className="text-white text-xs mt-1"><strong>Site example:</strong> &ldquo;We need to plan the second fix sequence for floors 3 and 4. Let us sit down together and work out the best approach.&rdquo;</p>
                  </div>
                  <div className="bg-teal-500/10 border border-teal-500/20 p-3 rounded-lg">
                    <p className="text-white font-medium">Level 5: Advise</p>
                    <p className="text-white/80 text-xs">&ldquo;I will give my opinion, but you decide.&rdquo; You offer guidance but the person owns the decision.</p>
                    <p className="text-white text-xs mt-1"><strong>Site example:</strong> &ldquo;My suggestion would be to start with the emergency lighting, but it is your call &mdash; you know that floor best.&rdquo;</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg">
                    <p className="text-white font-medium">Level 6: Inquire</p>
                    <p className="text-white/80 text-xs">&ldquo;You decide, but tell me about it.&rdquo; Full autonomy on the decision, with a reporting requirement.</p>
                    <p className="text-white text-xs mt-1"><strong>Site example:</strong> &ldquo;You are running the testing programme for this section. Handle it however you think best &mdash; just let me know the results.&rdquo;</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded-lg">
                    <p className="text-white font-medium">Level 7: Delegate</p>
                    <p className="text-white/80 text-xs">&ldquo;You decide. No need to tell me.&rdquo; Complete autonomy and ownership. Maximum trust.</p>
                    <p className="text-white text-xs mt-1"><strong>Site example:</strong> &ldquo;You are responsible for the whole first fix on wing B. I trust your judgement completely.&rdquo;</p>
                  </div>
                </div>
              </div>

              <p>
                The key principle is to <strong>match the level to the person and the task</strong>. Use
                lower levels (1&ndash;3) for less experienced workers or high-risk tasks. Use higher levels
                (5&ndash;7) for experienced, trusted team members on tasks within their competence. Over time,
                the goal is to move people up the levels as their skill and trust grow.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Matching Levels to Situations</p>
                </div>
                <p className="text-sm text-white/80">
                  The same person may require different delegation levels for different tasks. An experienced
                  electrician might be at Level 7 for first fix wiring (their core competence) but Level 2
                  for a new fire alarm system they have not worked with before. Similarly, safety-critical
                  tasks may always require Level 1 regardless of the person&rsquo;s experience &mdash;
                  &ldquo;Isolate that circuit now&rdquo; is not a discussion point. <strong className="text-white">
                  The level follows the task AND the person, not just the person.</strong>
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Development Path</p>
                <p className="text-sm text-white/80 mb-2">
                  Over time, your goal is to progressively move people up the delegation levels:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Week 1:</strong> Level 1&ndash;2 (Tell/Sell) &mdash; clear instructions with explanations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Month 1:</strong> Level 3&ndash;4 (Consult/Agree) &mdash; involving them in decisions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Month 3:</strong> Level 5&ndash;6 (Advise/Inquire) &mdash; they lead, you support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Month 6+:</strong> Level 7 (Delegate) &mdash; full ownership and autonomy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: SMART Delegation in Practice */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            SMART Delegation in Practice
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When you delegate a task, clarity is everything. Vague instructions produce vague results.
                The <strong>SMART framework</strong> ensures every delegated task is crystal clear.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">SMART Delegation Framework</p>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold mb-1">S &mdash; Specific</p>
                    <p className="text-white/80 text-xs">Exactly what needs doing. Not &ldquo;sort out area B&rdquo; but &ldquo;complete the first fix wiring in area B, connecting all socket outlets to DB-3 per drawing E-101.&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold mb-1">M &mdash; Measurable</p>
                    <p className="text-white/80 text-xs">How you will know it is done correctly. &ldquo;All 24 socket outlets connected, containment complete, cables labelled, ready for inspection.&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold mb-1">A &mdash; Achievable</p>
                    <p className="text-white/80 text-xs">The person has the skills, tools, materials, and authority to complete it. Do not delegate a task if the person lacks what they need to succeed.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold mb-1">R &mdash; Relevant</p>
                    <p className="text-white/80 text-xs">The person understands why this task matters to the project. &ldquo;This area is on the critical path &mdash; plasterers need access by Friday.&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold mb-1">T &mdash; Time-bound</p>
                    <p className="text-white/80 text-xs">A clear deadline. Not &ldquo;when you get a chance&rdquo; but &ldquo;completed by 14:00 on Thursday.&rdquo;</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-2">Poor Delegation</p>
                    <p className="text-sm text-white/80">&ldquo;Can you sort out the wiring in area B sometime this week? Cheers.&rdquo;</p>
                    <p className="text-xs text-white/80 mt-2">Not specific (what wiring?), not measurable (how will we know it is done?), no deadline (sometime this week?), no context (why does it matter?).</p>
                  </div>
                  <div>
                    <p className="text-green-400 font-semibold text-sm mb-2">SMART Delegation</p>
                    <p className="text-sm text-white/80">&ldquo;Complete the first fix wiring for all 24 socket outlets in area B to drawing E-101. Materials are in the store. Plasterers need access by Friday, so I need this done by Thursday at 14:00. Can you manage that?&rdquo;</p>
                    <p className="text-xs text-white/80 mt-2">Specific, measurable, achievable (materials available), relevant (plasterers waiting), time-bound (Thursday 14:00).</p>
                  </div>
                </div>
              </div>

              <p>
                Notice the final question in the SMART example: &ldquo;Can you manage that?&rdquo; This is
                not a formality. It gives the person an opportunity to raise concerns, flag resource issues,
                or negotiate the timeline. Effective delegation is a <strong>two-way conversation</strong>,
                not a one-way instruction. If the person identifies a genuine barrier (missing materials,
                conflicting priorities, lack of a specific skill), it is far better to know that upfront than
                to discover it on Thursday afternoon.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Check-In, Not the Check-Up</p>
                </div>
                <p className="text-sm text-white/80">
                  After delegating a SMART task, schedule a brief check-in at the midpoint. This is not
                  micromanaging &mdash; it is responsible follow-up. A two-minute conversation on Tuesday
                  (&ldquo;How is area B going? Anything you need from me?&rdquo;) catches problems early
                  while respecting autonomy. <strong className="text-white">The difference between a check-in
                  and a check-up is intent</strong>: a check-in offers support, a check-up expresses doubt.
                  Your tone and approach make the difference.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Common Delegation Mistakes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Common Delegation Mistakes
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Even when supervisors understand the importance of delegation, they often fall into
                predictable traps. Being aware of these common mistakes helps you avoid them.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Six Most Common Delegation Mistakes</p>
                <ul className="text-sm text-white space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>1. Micromanaging after delegating</strong> &mdash; The worst one. You hand over a task then constantly check up, question every decision, and hover. This signals you do not actually trust the person, kills their motivation, and defeats the entire purpose of delegating.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>2. Delegating without authority</strong> &mdash; Giving someone a task but not the power to make decisions about it. &ldquo;You are in charge of this area, but check with me before you do anything.&rdquo; This creates frustration and bottlenecks.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>3. Only delegating boring tasks</strong> &mdash; If you only delegate the tedious work and keep the interesting, developmental tasks for yourself, people quickly notice. Delegate a mix including tasks that stretch and develop people.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>4. Not following up at all</strong> &mdash; The opposite of micromanaging. Delegating then completely forgetting about it. No check-ins, no support, no recognition when complete. People feel abandoned.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>5. Taking back tasks at the first sign of difficulty</strong> &mdash; When someone struggles, resisting the urge to say &ldquo;Give it here, I will do it.&rdquo; This is the &ldquo;monkey on the back&rdquo; problem &mdash; help them solve it, do not take it back.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>6. Not being clear about expectations</strong> &mdash; Assuming people know what you mean without being explicit. Then being frustrated when the result is not what you wanted. If you did not make it clear, that is your failure, not theirs.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Monkey on the Back (Harvard Business Review)</p>
                </div>
                <p className="text-sm text-white/80">
                  William Oncken Jr. and Donald Wass described how every time a supervisor takes back a
                  delegated task (&ldquo;Leave it with me&rdquo;), the <strong className="text-white">&ldquo;monkey&rdquo;
                  (the next action) jumps from the team member&rsquo;s back onto the supervisor&rsquo;s
                  </strong>. Soon the supervisor is overwhelmed with dozens of monkeys they have collected,
                  while the team stands idle. The solution: when someone brings you a problem, ask &ldquo;What
                  do you think we should do?&rdquo; Help them solve it &mdash; do not solve it for them.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Keeping the Monkey &mdash; Practical Phrases</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;What do you think we should do?&rdquo;</strong> &mdash; Forces the person to think through the problem rather than passing it to you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;What options have you considered?&rdquo;</strong> &mdash; Develops their problem-solving skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;If you had to decide right now, what would you do?&rdquo;</strong> &mdash; Builds confidence in their own judgement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;Try that approach and let me know how it goes.&rdquo;</strong> &mdash; Gives permission to act, keeping the monkey on their back</span>
                  </li>
                </ul>
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
                This section has covered the why, what, and how of effective delegation &mdash; one of the
                most important skills any site leader can develop. The key points to remember are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Delegation is leadership:</strong> Your job is to multiply output through others, not to be the best individual worker</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Skill-Will Matrix:</strong> Guide (high will, low skill), Delegate (high both), Excite (low will, high skill), Direct (low both)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Seven Levels:</strong> Tell &rarr; Sell &rarr; Consult &rarr; Agree &rarr; Advise &rarr; Inquire &rarr; Delegate &mdash; match the level to the person and the risk</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>SMART delegation:</strong> Specific, Measurable, Achievable, Relevant, Time-bound &mdash; vague instructions produce vague results</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Worst mistake:</strong> Micromanaging after delegating &mdash; it destroys trust and defeats the purpose</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Keep the monkey:</strong> Help people solve problems rather than taking tasks back onto your own shoulders</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Next:</strong> In Section 3, we will explore
                  <strong> Motivating Your Team</strong> &mdash; Maslow&rsquo;s Hierarchy of Needs,
                  Herzberg&rsquo;s Two-Factor Theory, McGregor&rsquo;s Theory X and Y, and Dan Pink&rsquo;s
                  Drive model, all applied to managing electricians on site.
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
            <Link to="../leadership-module-2-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-2-section-3">
              Next: Motivating Your Team
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
