import { ArrowLeft, CheckCircle, AlertTriangle, Target, Brain, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "ld-ooda-loop",
    question: "In the OODA Loop, what does the 'Orient' stage involve?",
    options: [
      "Walking the job and checking progress",
      "Making sense of what you have observed through experience and context",
      "Choosing a specific course of action",
      "Executing your decision and monitoring the result"
    ],
    correctIndex: 1,
    explanation: "The Orient stage involves making sense of the raw data you have gathered during the Observe stage. You filter it through your experience, training, and understanding of the situation to build a picture of what is actually happening. For example, a supervisor might observe that a cable delivery is late, the ceiling is going in tomorrow, and three electricians are idle — and orient by understanding this is a critical sequencing problem."
  },
  {
    id: "ld-70-percent-rule",
    question: "What is the 70% Rule in decision-making?",
    options: [
      "You should delegate 70% of your decisions to the team",
      "If you have 70% of the information you need, make the decision",
      "70% of site decisions are safety-critical",
      "Supervisors should spend 70% of their time planning"
    ],
    correctIndex: 1,
    explanation: "The 70% Rule states that if you have approximately 70% of the information you need, you should make the decision rather than waiting for perfect information. On a construction site, conditions change rapidly and a good decision now is almost always better than a perfect decision too late. However, this rule does NOT apply to safety-critical decisions, where you must get it right regardless of time pressure."
  },
  {
    id: "ld-decision-traps",
    question: "A supervisor continues with a failing programme approach because significant time and money have already been invested. Which decision trap is this?",
    options: [
      "Analysis paralysis",
      "Confirmation bias",
      "Sunk cost fallacy",
      "Groupthink"
    ],
    correctIndex: 2,
    explanation: "The sunk cost fallacy occurs when someone continues with a course of action because of the resources already invested, rather than evaluating whether it is still the best option going forward. The time and money already spent are 'sunk' — they cannot be recovered regardless of the decision. Good decision-makers evaluate options based on future costs and benefits, not past investment."
  }
];

const faqs = [
  {
    question: "How do I make good decisions when I do not have all the information?",
    answer: "This is the reality of site supervision — you will rarely have complete information. The 70% Rule provides useful guidance: if you have roughly 70% of the information you need, make the decision. Waiting for 100% means the opportunity has passed. Use the OODA Loop to cycle quickly through available data, orient yourself, decide, and act. Then observe the results and adjust. The key is to make the best decision you can with the information available, not to wait for perfect information that may never come. Document your reasoning so you can explain it later if needed."
  },
  {
    question: "What should I do when I realise I have made the wrong decision?",
    answer: "Admit it quickly and openly. Say 'I got that wrong, here is what I am going to do about it.' The longer you delay acknowledging a bad decision, the worse the consequences become and the more trust you lose. Analyse what went wrong — was it the information, the reasoning, or the execution? Learn from it and move on. Never blame the team for a decision you made, and never pretend you did not make the call. Everyone makes wrong decisions — the mark of a leader is how they respond."
  },
  {
    question: "How do I avoid analysis paralysis on site?",
    answer: "Set a time limit for yourself. For routine decisions, decide within minutes. For more complex decisions, give yourself a clear deadline — 'I will decide by lunchtime.' Use the OODA Loop to structure your thinking rather than going round in circles. Write down the options and their likely outcomes to make the choice concrete. Remember that indecision is itself a decision — and usually the worst one, because it leaves the team waiting and work stalled. If two options seem equally good, just pick one and commit to it. You can always adjust later."
  },
  {
    question: "Should I always consult the team before making a decision?",
    answer: "Not always — it depends on the situation. For safety-critical decisions, the supervisor must decide quickly and clearly. For decisions affecting how the team works, getting input improves buy-in and often produces better solutions. For technical decisions, consult those with the most relevant expertise. The key is matching your approach to the situation: urgent and safety-related decisions need fast, clear leadership; complex problems benefit from team input; routine decisions should be delegated where possible. What you must never do is consult everyone every time — this leads to paralysis and undermines your authority."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In the OODA Loop developed by Colonel John Boyd, the four stages in order are:",
    options: [
      "Observe, Organise, Decide, Act",
      "Observe, Orient, Decide, Act",
      "Outline, Orient, Determine, Act",
      "Observe, Orient, Deploy, Assess"
    ],
    correctAnswer: 1,
    explanation: "The OODA Loop consists of Observe (gather data), Orient (make sense of it), Decide (choose a course of action), and Act (execute). Originally developed for military combat by USAF Colonel John Boyd, it is now widely used in business and emergency response."
  },
  {
    id: 2,
    question: "The 70% Rule in decision-making states that:",
    options: [
      "70% of site decisions should be delegated to the team",
      "You should aim for 70% accuracy in your decisions",
      "If you have 70% of the information needed, make the decision",
      "70% of decisions on site are routine and require no analysis"
    ],
    correctAnswer: 2,
    explanation: "The 70% Rule states that if you have approximately 70% of the information you need, you should make the decision. Waiting for 100% of the information means the opportunity has passed. On a construction site, conditions change rapidly and a good decision now is better than a perfect decision too late."
  },
  {
    id: 3,
    question: "Which decision trap involves continuing with a course of action because of resources already invested?",
    options: [
      "Anchoring bias",
      "Groupthink",
      "Confirmation bias",
      "Sunk cost fallacy"
    ],
    correctAnswer: 3,
    explanation: "The sunk cost fallacy occurs when someone continues with a failing approach because of the time, money, or effort already invested, rather than evaluating the best path forward. The resources already spent cannot be recovered regardless of the decision made."
  },
  {
    id: 4,
    question: "A supervisor who only seeks opinions from people who agree with them is demonstrating:",
    options: [
      "Effective delegation",
      "Confirmation bias",
      "The OODA Loop",
      "Analysis paralysis"
    ],
    correctAnswer: 1,
    explanation: "Confirmation bias is the tendency to seek out, interpret, and remember information that confirms what you already believe. A supervisor who only consults people they know will agree is filtering information to support their existing view, rather than genuinely testing their assumptions."
  },
  {
    id: 5,
    question: "When should the 70% Rule NOT be applied?",
    options: [
      "When making programme sequencing decisions",
      "When deciding resource allocation for the week",
      "When making safety-critical decisions",
      "When choosing between two equally viable approaches"
    ],
    correctAnswer: 2,
    explanation: "Safety-critical decisions are the exception to the 70% Rule. For decisions that could affect the safety of workers or the public, there is no acceptable shortcut — you must get it right, even if it takes longer. Speed is valuable for operational decisions, but never at the expense of safety."
  },
  {
    id: 6,
    question: "The key advantage in the OODA Loop goes to the person who:",
    options: [
      "Spends the most time in the Orient stage",
      "Gathers the most data in the Observe stage",
      "Cycles through the loop fastest",
      "Makes the fewest mistakes in the Decide stage"
    ],
    correctAnswer: 2,
    explanation: "Colonel Boyd's key insight was that the advantage goes to whoever can cycle through the OODA Loop fastest. By observing, orienting, deciding, and acting more quickly than the situation changes, a leader stays ahead of events rather than constantly reacting to them."
  },
  {
    id: 7,
    question: "When a leader makes a wrong decision, the most effective response is to:",
    options: [
      "Explain why external factors caused the failure",
      "Admit it quickly, learn from it, and move on",
      "Consult the team before acknowledging the error",
      "Wait to see if the situation resolves itself"
    ],
    correctAnswer: 1,
    explanation: "Admitting mistakes quickly and honestly builds trust faster than pretending to be perfect. The mark of a leader is how they handle being wrong: admit it, learn from it, move on. Never blame the team for a decision you made and never pretend you did not make the call. Accountability builds trust; deflection destroys it."
  },
  {
    id: 8,
    question: "Analysis paralysis is best described as:",
    options: [
      "Making decisions too quickly without proper analysis",
      "Delegating all analysis to the team",
      "Overthinking a decision until the moment to act has passed",
      "Relying too heavily on the first piece of information received"
    ],
    correctAnswer: 2,
    explanation: "Analysis paralysis occurs when a leader overthinks a decision, considering every possible angle and outcome until the window of opportunity closes. On a construction site, conditions change rapidly and delay often makes the situation worse. Setting time limits for decisions and using structured frameworks like the OODA Loop helps prevent this trap."
  }
];

export default function LeadershipModule4Section1() {
  useSEO({
    title: "Making Decisions Under Pressure | Leadership Module 4.1",
    description: "The OODA Loop, the 70% Rule, owning decisions, and avoiding common decision traps for site supervisors and electrical leaders.",
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
            <Link to="../leadership-module-4">
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
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Making Decisions Under Pressure
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How effective site leaders make good decisions quickly, own the outcomes, and avoid the traps that derail decision-making
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Framework:</strong> The OODA Loop &mdash; Observe, Orient, Decide, Act</li>
              <li><strong>Speed:</strong> The 70% Rule &mdash; decide with 70% of the information</li>
              <li><strong>Ownership:</strong> Never blame the team for your decisions</li>
              <li><strong>Awareness:</strong> Know the five common decision traps</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">For Site Leaders</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Reality:</strong> Dozens of decisions every day, some critical</li>
              <li><strong>Danger:</strong> Indecision is itself a decision &mdash; and usually the worst</li>
              <li><strong>Exception:</strong> Safety-critical decisions &mdash; always get it right</li>
              <li><strong>Trust:</strong> Accountability builds it; deflection destroys it</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain why decision-making is a core leadership skill on construction sites",
              "Describe the four stages of the OODA Loop and apply them to site scenarios",
              "Apply the 70% Rule to operational decisions and recognise when it should not be used",
              "Demonstrate accountability by owning decisions and their outcomes",
              "Identify the five common decision traps and explain how to avoid each one",
              "Distinguish between decisions that require speed and those that require accuracy"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Decision-Making Is a Core Leadership Skill */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Why Decision-Making Is a Core Leadership Skill
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every day on site, supervisors make dozens of decisions &mdash; some minor, some
                critical. What order do tasks get done? Who works where? Is this method safe? Do we
                stop work because of weather? Do we accept that delivery or reject it? The ability to
                make good decisions quickly, especially under pressure, separates effective leaders
                from ineffective ones.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Cost of Indecision</p>
                <p className="text-sm text-white/80">
                  Indecision is itself a decision &mdash; and usually the worst one. When a supervisor
                  fails to decide, work stalls, the team loses confidence, and the problem often gets
                  worse. A team waiting for direction is a team not working. On a construction site
                  where labour costs hundreds of pounds per hour, every minute of indecision has a
                  real financial cost &mdash; and the reputational cost can be even higher.
                </p>
              </div>

              <p>
                The challenge is that site decisions rarely come with perfect information. You are
                making choices under time pressure, with incomplete data, competing priorities, and
                real consequences for getting it wrong. This is not a classroom exercise &mdash; the
                decisions you make affect safety, programme, cost, quality, and the working lives of
                your team.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Types of Site Decisions</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Routine Decisions</p>
                    <p>Daily task allocation, material ordering, sequence adjustments, welfare
                      arrangements. These should be made quickly and confidently &mdash; do not
                      overthink them. They form the bulk of your daily output.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Tactical Decisions</p>
                    <p>Responding to programme changes, resolving clashes between trades, dealing
                      with defects, managing late deliveries. These need structured thinking but
                      timely action &mdash; hours, not days.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Safety-Critical Decisions</p>
                    <p>Stop-work calls, method changes, permit decisions, emergency response. These
                      must be right &mdash; take the time needed, consult others, and never
                      compromise safety for programme or cost.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">People Decisions</p>
                    <p>Addressing poor performance, resolving conflicts, managing welfare issues,
                      recognising good work. These require emotional intelligence, careful thought,
                      and often a private conversation.</p>
                  </div>
                </div>
              </div>

              <p>
                The best site leaders do not agonise over every decision. They have <strong>
                frameworks</strong> &mdash; mental models that help them process information quickly,
                weigh options, and commit to a course of action. The following sections introduce the
                most effective of these frameworks and explain how to apply them on site.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Principle</p>
                </div>
                <p className="text-sm text-white/80">
                  Decision-making is a <strong className="text-white">skill, not a talent</strong>.
                  Some people seem naturally decisive, but what they actually have is experience and
                  frameworks. The good news is that both can be learned. Every decision you make
                  &mdash; right or wrong &mdash; builds your experience and improves your judgement
                  for the next one.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The OODA Loop */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The OODA Loop (Colonel John Boyd)
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The OODA Loop was developed by <strong>United States Air Force Colonel John Boyd</strong>
                for military combat decision-making. Boyd observed that the pilot who could cycle through
                the decision loop fastest would gain the advantage in a dogfight &mdash; not the pilot
                with the better aircraft. The framework is now widely used in business, emergency
                response, law enforcement, and project management.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Four Stages of the OODA Loop</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-lg font-bold text-rose-400">O &mdash; Observe</p>
                    <p className="text-white/80 text-xs mt-1">Gather raw data. Walk the job, check progress against programme, talk to the team, read the reports, look at the weather forecast. What is actually happening right now? Not what you assumed would happen &mdash; what is actually happening.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-lg font-bold text-rose-400">O &mdash; Orient</p>
                    <p className="text-white/80 text-xs mt-1">Make sense of the data through experience and context. &ldquo;Cable delivery is late, ceiling going in tomorrow, three electricians idle.&rdquo; This is where experience matters most &mdash; the ability to see patterns and implications quickly.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-lg font-bold text-rose-400">D &mdash; Decide</p>
                    <p className="text-white/80 text-xs mt-1">Choose a course of action from the options available. Commit to a direction. Do not hedge or half-commit &mdash; a clear decision, communicated clearly, is what the team needs from you.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-lg font-bold text-rose-400">A &mdash; Act</p>
                    <p className="text-white/80 text-xs mt-1">Execute the decision, then immediately loop back to Observe. Did it work? What has changed? The loop is iterative &mdash; you cycle through it continuously, refining your approach with each pass.</p>
                  </div>
                </div>
              </div>

              <p>
                The critical insight from Boyd is that <strong>the advantage goes to whoever cycles
                through the loop fastest</strong>. On a construction site, the supervisor who observes
                a problem early, orients quickly through experience, decides promptly, and acts
                decisively will stay ahead of events rather than constantly reacting to them.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">OODA Loop &mdash; Site Example</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Observe:</strong> You walk the second floor and see the ceiling grid going up, but your cable routes are not installed yet in that zone. Three of your team are working on the ground floor.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Orient:</strong> If the ceiling closes before cables are in, you will need to cut out access panels later &mdash; that means rework, cost, delay, and a conversation with the project manager you do not want to have.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Decide:</strong> Pull two electricians from the ground floor (which is less urgent) and prioritise second-floor cable routes today. The ground floor can wait until Wednesday.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Act:</strong> Brief the team, reallocate resources, inform the main contractor you are prioritising that zone. Check progress at midday and again at three o&rsquo;clock &mdash; then observe again.</span>
                  </li>
                </ul>
              </div>

              <p>
                The loop is <strong>iterative, not linear</strong>. After acting, you immediately
                return to observing. Did the reallocation work? Is the ceiling team still on schedule?
                Have new problems emerged on the ground floor? Each cycle refines your understanding
                and keeps you ahead of the situation rather than behind it.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Why Orient Is the Most Important Stage</p>
                <p className="text-sm text-white/80 mb-2">
                  Boyd considered Orient the most critical stage because it is where experience,
                  training, culture, and previous observations combine to create meaning from raw
                  data. Two supervisors can observe the same situation and orient completely
                  differently based on their experience.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Experienced supervisor:</strong> Sees
                      the ceiling going up, immediately recognises the sequencing clash, and begins
                      thinking about resource reallocation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Inexperienced supervisor:</strong> Sees
                      the same ceiling work but does not connect it to the electrical programme
                      until someone else raises the alarm</span>
                  </li>
                </ul>
                <p className="text-sm text-white/80 mt-2">
                  This is why experience matters so much in supervision &mdash; and why every
                  decision you make, right or wrong, builds your ability to orient faster next time.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Common OODA Mistake</p>
                </div>
                <p className="text-sm text-white/80">
                  The most common mistake is getting stuck in the <strong className="text-white">
                  Observe</strong> stage &mdash; endlessly gathering data without moving to Orient
                  and Decide. On a construction site, you will never have complete information. The
                  OODA Loop is designed for imperfect information &mdash; the speed of cycling matters
                  more than the completeness of any single stage.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Speed vs Accuracy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Speed vs Accuracy &mdash; The 70% Rule
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the greatest tensions in decision-making is between <strong>speed</strong> and
                <strong> accuracy</strong>. Wait too long and the opportunity passes. Decide too quickly
                and you may get it wrong. The 70% Rule, attributed to various military leaders,
                provides a practical framework for navigating this tension on site.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The 70% Rule</p>
                <p className="text-base text-white leading-relaxed">
                  If you have <strong>70% of the information</strong> you need, make the decision.
                  Waiting for 100% means the opportunity has passed. A good decision now is
                  almost always better than a perfect decision too late.
                </p>
              </div>

              <p>
                On a construction site, conditions change rapidly. The information you are waiting
                for may be irrelevant by the time you get it because the situation has already moved
                on. Programmes shift, deliveries change, weather intervenes, other trades alter their
                sequence. The supervisor who waits for perfect information will constantly be behind
                the curve, reacting to yesterday&rsquo;s problems while today&rsquo;s get worse.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">When Speed Matters vs When Accuracy Matters</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-rose-400 font-semibold text-sm mb-2">Speed Wins (70% Rule Applies)</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Programme sequencing and daily task allocation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Resource reallocation in response to changes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Dealing with minor clashes between trades</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Choosing between similar material alternatives</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Responding to client requests for minor changes</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-blue-400 font-semibold text-sm mb-2">Accuracy Wins (Get It Right)</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Safety-critical method statements and permits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Isolation procedures and live working decisions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Design changes with regulatory implications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Contractual decisions with financial consequences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Personnel decisions affecting someone&rsquo;s livelihood</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Safety Exception</p>
                </div>
                <p className="text-sm text-white/80">
                  For <strong className="text-white">safety-critical decisions, there is no rush
                  &mdash; get it right.</strong> If you are unsure whether a method is safe, stop work
                  and investigate. If a permit does not look right, do not authorise it. If there is
                  any doubt about an isolation, verify it. The 70% Rule applies to operational and
                  programme decisions &mdash; never to safety. Nobody was ever disciplined for stopping
                  work over a genuine safety concern. But people have been seriously injured because a
                  supervisor felt pressured to keep working when they should have stopped.
                </p>
              </div>

              <p>
                The practical skill is <strong>categorising each decision quickly</strong>: is this a
                speed decision or an accuracy decision? Routine and tactical decisions benefit from
                speed. Safety and contractual decisions demand accuracy. Getting this categorisation
                right is itself a leadership skill that improves with experience.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Owning Your Decisions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Owning Your Decisions
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every decision you make as a supervisor will be scrutinised &mdash; by your team, by
                the main contractor, by the client, and sometimes by yourself at three o&rsquo;clock in
                the morning. Some of your decisions will be wrong. This is inevitable. The mark of a
                leader is not whether they make mistakes, but <strong>how they handle being wrong</strong>.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Accountability Principle</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>Admit it, learn from it, move on.</strong> Never blame the team for a
                  decision you made. Never pretend you did not make the call. Accountability builds
                  trust; deflection destroys it.
                </p>
              </div>

              <p>
                When you get a decision right, share the credit with the team &mdash; &ldquo;we made
                the right call.&rdquo; When you get a decision wrong, own it personally &mdash;
                &ldquo;I got that wrong, here is what I am going to do about it.&rdquo; This is one
                of the most powerful things a leader can say, because it demonstrates integrity,
                builds trust, and shows the team that it is safe to be honest about mistakes.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">How to Own a Wrong Decision</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Acknowledge it quickly</strong> &mdash; the longer you delay, the worse it gets and the more trust you lose with every passing hour</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Be specific</strong> &mdash; say what went wrong and why, not vague generalities like &ldquo;things did not go to plan&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Present the fix</strong> &mdash; come with a solution, not just the problem. &ldquo;Here is what I am going to do differently&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Learn publicly</strong> &mdash; share what you learned so the team benefits from the experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Move on</strong> &mdash; do not dwell on it or let it paralyse your future decisions. One wrong call does not define you.</span>
                  </li>
                </ul>
              </div>

              <p>
                Contrast this with <strong>blame culture</strong>, where nobody admits anything, every
                mistake becomes a witch hunt, and the same errors keep happening because nobody talks
                about them honestly. In blame culture, people hide problems until they become crises.
                In accountability culture, problems surface early when they are still manageable.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Decision Documentation</p>
                </div>
                <p className="text-sm text-white/80">
                  For significant decisions, document your reasoning &mdash; even briefly. A note in
                  your site diary explaining what you decided, why, and what information you had at the
                  time protects you if the decision is later questioned. It also helps you learn from
                  the outcome, whether the decision turns out to be right or wrong. &ldquo;Decided to
                  prioritise Zone B cable routes over Zone C due to ceiling programme. Based on
                  conversation with MC site manager at 08:15.&rdquo; That takes 30 seconds to write
                  and could save you hours of difficulty later.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Common Decision Traps */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Common Decision Traps
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Even experienced leaders fall into predictable decision-making traps. These are not
                signs of incompetence &mdash; they are cognitive biases that affect all human beings.
                Being aware of them is the first step to avoiding them. The following five are the
                most common and the most damaging in a construction environment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Five Decision Traps</p>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">1. Analysis Paralysis</p>
                    <p className="text-white/80">Overthinking a decision until the moment to act has passed. The supervisor who needs &ldquo;just one more piece of information&rdquo; before committing, while the team stands idle and the programme slips. <strong className="text-white">Defence:</strong> Set time limits for decisions and stick to them. Ask: &ldquo;What is the cost of not deciding right now?&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">2. Groupthink</p>
                    <p className="text-white/80">Going along with the consensus even when you suspect it is wrong. On site, this happens in progress meetings where nobody wants to be the one who raises the awkward question. <strong className="text-white">Defence:</strong> Actively invite dissent: &ldquo;What could go wrong with this plan?&rdquo; Reward people who challenge assumptions.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">3. Confirmation Bias</p>
                    <p className="text-white/80">Seeking information that supports what you already believe and ignoring evidence that contradicts it. If you have already decided the subcontractor is the problem, you will only see evidence confirming that view. <strong className="text-white">Defence:</strong> Deliberately seek out information that challenges your assumption. Ask someone who disagrees with you.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">4. Sunk Cost Fallacy</p>
                    <p className="text-white/80">Continuing with a failing approach because you have already invested time, money, or effort. &ldquo;We have spent three weeks on this method, we cannot change now.&rdquo; The three weeks are gone regardless. <strong className="text-white">Defence:</strong> Evaluate the best path forward from where you are now, not from where you started.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">5. Anchoring</p>
                    <p className="text-white/80">Over-relying on the first piece of information you receive. If the first estimate says the job will take four weeks, every subsequent estimate is mentally compared to that anchor, even if the original was wrong. <strong className="text-white">Defence:</strong> Seek multiple independent sources of information before committing to a view.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Practical defence:</strong> Before making a
                  significant decision, ask yourself three questions: (1) Am I overthinking this or
                  am I stalling? (2) Am I only seeing what I want to see? (3) Am I sticking with this
                  because I have already invested in it, rather than because it is still the best
                  option? If the answer to any of these is yes, pause and reconsider your approach.
                </p>
              </div>

              <p>
                The goal is not to eliminate these biases &mdash; that is impossible. The goal is to
                build <strong>self-awareness</strong> so that you catch yourself before acting on a
                biased judgement. Over time, this awareness becomes instinctive, and your
                decision-making quality improves significantly.
              </p>
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
                Effective decision-making under pressure is not about being right every time &mdash;
                it is about having a structured approach, acting decisively, and owning the outcomes.
                The key points from this section are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Decision-making is core:</strong> Supervisors make dozens of decisions daily &mdash; indecision is itself a decision, and usually the worst one</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">The OODA Loop:</strong> Observe, Orient, Decide, Act &mdash; cycle through as fast as possible to stay ahead of events on site</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">The 70% Rule:</strong> If you have 70% of the information, decide now &mdash; but never apply this to safety-critical decisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Own your decisions:</strong> Admit mistakes quickly, learn from them, and never blame the team for your calls</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Five decision traps:</strong> Analysis paralysis, groupthink, confirmation bias, sunk cost fallacy, and anchoring &mdash; awareness is your defence</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Skill, not talent:</strong> Decision-making improves with experience, frameworks, and self-awareness &mdash; every decision builds your capability</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Next:</strong> In Section 2, we examine
                  systematic problem-solving on site &mdash; the 5 Whys technique, the DECIDE model,
                  root cause vs symptom analysis, fishbone diagrams, and how to tackle people problems
                  differently from technical ones.
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
          title="Section 1 Knowledge Check"
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
            <Link to="../leadership-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-4-section-2">
              Next: Problem-Solving on Site
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
