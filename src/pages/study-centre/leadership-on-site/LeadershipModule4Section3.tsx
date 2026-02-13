import { ArrowLeft, CheckCircle, AlertTriangle, Users, Shield, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "ld-tki-competing",
    question: "According to Thomas-Kilmann's model, which conflict mode should be used for safety non-negotiables?",
    options: [
      "Collaborating — work together to find a win-win",
      "Compromising — split the difference quickly",
      "Competing — assertive, non-cooperative, 'I win, you lose'",
      "Accommodating — put their needs first"
    ],
    correctIndex: 2,
    explanation: "The Competing mode (high assertiveness, low cooperativeness) is appropriate when the issue is a safety non-negotiable. When someone wants to take a shortcut that compromises safety, this is not a situation for compromise or collaboration — the answer is no, clearly and firmly. The Competing mode is 'I win, you lose,' which is the correct stance on safety matters."
  },
  {
    id: "ld-deescalation",
    question: "When conflict gets heated on site, the FIRST thing you should do is:",
    options: [
      "Raise your voice to take control of the situation",
      "Immediately escalate to the site manager",
      "Lower your voice and move to a private space",
      "Tell the other person to calm down"
    ],
    correctIndex: 2,
    explanation: "When conflict escalates, lower your voice — do not match their energy. Then move to a private space because conflict should never be resolved in front of others. Telling someone to 'calm down' typically has the opposite effect. Raising your voice only escalates further. Escalation to management may be needed later, but your first priority is to de-escalate the immediate situation."
  },
  {
    id: "ld-acas",
    question: "ACAS recommends that the first approach to workplace conflict should be:",
    options: [
      "Formal disciplinary proceedings",
      "Mediation by a neutral third party",
      "Early, informal resolution through voluntary conversation",
      "Written warning followed by a review period"
    ],
    correctIndex: 2,
    explanation: "ACAS (the Advisory, Conciliation and Arbitration Service) strongly recommends early, informal resolution as the first approach to workplace conflict. A voluntary conversation between the parties, facilitated by the line manager if needed, resolves most issues before they escalate. Formal procedures, mediation, and disciplinary action are later steps if informal resolution fails."
  }
];

const faqs = [
  {
    question: "Is it true that some conflict is actually good for a team?",
    answer: "Yes. Healthy disagreement — what Patrick Lencioni calls 'productive ideological conflict' — drives better decisions, surfaces hidden problems, and prevents groupthink. When team members feel safe to challenge ideas, question methods, and voice concerns, the quality of decision-making improves significantly. The key distinction is between task conflict (disagreeing about work methods, priorities, or approaches) and relationship conflict (personal attacks, resentment, hostility). Task conflict is healthy and should be encouraged. Relationship conflict is destructive and must be managed. As a leader, your role is to create an environment where people can disagree on the work without it becoming personal."
  },
  {
    question: "What should I do if two team members refuse to work together?",
    answer: "First, speak to each person individually to understand their perspective. Use active listening and do not take sides at this stage. Then bring them together for a facilitated conversation — set ground rules (one person speaks at a time, no personal attacks, focus on the issue), acknowledge both perspectives, and look for common ground. If they cannot resolve it between themselves, you may need to act as mediator or bring in someone neutral. In the short term, you may need to separate them physically (different zones, different shifts) but make it clear this is a temporary measure while the issue is resolved. Long term, avoidance is not a solution — the conflict will resurface unless addressed."
  },
  {
    question: "How do I handle a conflict between my team and another trade on site?",
    answer: "Inter-trade conflicts often stem from sequencing disagreements, perceived quality issues, or competition for shared resources. First, establish the facts — speak to both sides separately. Then arrange a meeting with the other trade's supervisor to discuss the issue professionally. Focus on the practical problem (sequencing, access, quality standard) rather than blame. If you cannot resolve it between you, escalate to the site manager or main contractor — that is what coordination meetings are for. Never let inter-trade friction fester, as it damages the working environment for everyone and slows the project."
  },
  {
    question: "When should I escalate a conflict rather than trying to resolve it myself?",
    answer: "Escalate when: (1) There is a risk of physical violence — this is a safety issue and must be dealt with immediately by site management and potentially the police. (2) The conflict involves allegations of discrimination, harassment, or bullying — these require formal investigation. (3) You have tried informal resolution and it has failed after genuine effort. (4) The conflict involves contractual or commercial disputes beyond your authority. (5) You are personally involved in the conflict and cannot be impartial. In all these cases, escalation is not a failure — it is the right professional response."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to Patrick Lencioni, fear of conflict is the second dysfunction of a team, coming after:",
    options: [
      "Absence of accountability",
      "Inattention to results",
      "Absence of trust",
      "Avoidance of commitment"
    ],
    correctAnswer: 2,
    explanation: "In Lencioni's Five Dysfunctions of a Team, fear of conflict is the second dysfunction, and it follows directly from the first: absence of trust. When team members do not trust each other, they avoid honest debate and conflict — leading to artificial harmony where problems go unaddressed."
  },
  {
    id: 2,
    question: "Thomas-Kilmann's conflict model has two axes. These are:",
    options: [
      "Speed and accuracy",
      "Assertiveness and cooperativeness",
      "Urgency and importance",
      "Task focus and relationship focus"
    ],
    correctAnswer: 1,
    explanation: "Thomas-Kilmann's model plots five conflict-handling modes on two axes: Assertiveness (the extent to which you try to satisfy your own concerns) and Cooperativeness (the extent to which you try to satisfy the other person's concerns). The five modes — Competing, Collaborating, Compromising, Avoiding, and Accommodating — represent different combinations of these two dimensions."
  },
  {
    id: 3,
    question: "The Collaborating conflict mode (high assertiveness, high cooperativeness) is best described as:",
    options: [
      "I win, you lose — my way or nothing",
      "Let us split the difference and move on",
      "Win-win — working together to find a solution that satisfies both sides",
      "I will back down this time to preserve the relationship"
    ],
    correctAnswer: 2,
    explanation: "Collaborating is a win-win approach where both parties work together to find a solution that fully satisfies both sets of concerns. It requires time, trust, and genuine willingness to problem-solve together. It is the ideal mode for complex issues where both parties' concerns are too important to compromise on."
  },
  {
    id: 4,
    question: "When de-escalating a heated conflict on site, you should NOT:",
    options: [
      "Lower your voice and speak calmly",
      "Move to a private space away from others",
      "Match their energy to show you are taking it seriously",
      "Acknowledge their feelings before addressing the issue"
    ],
    correctAnswer: 2,
    explanation: "Matching their energy (raising your voice, mirroring aggression) will escalate the conflict further. Instead, lower your voice, move to a private space, acknowledge their feelings, use their name, and ask open questions. The goal is to bring the emotional temperature down so rational discussion can happen."
  },
  {
    id: 5,
    question: "ACAS stands for:",
    options: [
      "Advisory Council for Arbitration Services",
      "Advisory, Conciliation and Arbitration Service",
      "Association of Construction and Allied Services",
      "Approved Code of Administrative Standards"
    ],
    correctAnswer: 1,
    explanation: "ACAS is the Advisory, Conciliation and Arbitration Service — the UK's statutory body for workplace relations. It provides guidance on resolving workplace conflict, offers mediation services, and publishes codes of practice on disciplinary and grievance procedures that employment tribunals consider."
  },
  {
    id: 6,
    question: "The Avoiding conflict mode (low assertiveness, low cooperativeness) is appropriate when:",
    options: [
      "The issue is a safety non-negotiable",
      "Both parties have complex, important concerns",
      "The issue is trivial or emotions are too high for productive discussion",
      "You need to build goodwill with the other party"
    ],
    correctAnswer: 2,
    explanation: "Avoiding — stepping back from the conflict — is appropriate when the issue is genuinely trivial and not worth the effort, or when emotions are so high that productive discussion is impossible. In the latter case, it is a temporary tactic ('Let us come back to this in 10 minutes') not a permanent solution. Overusing the Avoiding mode allows problems to fester."
  },
  {
    id: 7,
    question: "When resolving a dispute about the quality of another trade's work, the recommended first step is:",
    options: [
      "Report it immediately to the main contractor",
      "Refuse to start your work until it is fixed",
      "Establish the facts by speaking to both sides separately",
      "Document the defect and issue a formal complaint"
    ],
    correctAnswer: 2,
    explanation: "The recommended first step is to establish the facts — what exactly is the issue, what standard was it supposed to meet, and what does the other trade's supervisor say about it? Only after understanding both perspectives can you decide the best course of action. Jumping straight to formal complaints or work refusal damages working relationships unnecessarily."
  },
  {
    id: 8,
    question: "The key problem with defaulting to one conflict mode for every situation is:",
    options: [
      "It makes the leader appear indecisive",
      "Different situations require different approaches and no single mode is always correct",
      "It takes too long to apply the same approach every time",
      "The team will learn to predict your response and manipulate it"
    ],
    correctAnswer: 1,
    explanation: "No single conflict mode is appropriate for every situation. A leader who always competes alienates the team. A leader who always avoids lets problems fester. A leader who always accommodates gets walked over. Effective leaders select the mode that fits the situation — competing for safety, collaborating for complex issues, compromising for quick resolutions, accommodating to build relationships, and avoiding only when appropriate."
  }
];

export default function LeadershipModule4Section3() {
  useSEO({
    title: "Managing Conflict | Leadership Module 4.3",
    description: "Thomas-Kilmann conflict modes, de-escalation techniques, ACAS principles, and practical approaches to common site conflicts.",
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
            <Link to="../leadership-module-4-section-2">
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
            <Users className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Managing Conflict
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Why conflict is normal, five ways to handle it, how to de-escalate heated situations, and the UK framework for workplace resolution
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Reality:</strong> Conflict is normal &mdash; and sometimes healthy</li>
              <li><strong>Framework:</strong> Thomas-Kilmann &mdash; five modes of handling conflict</li>
              <li><strong>Skill:</strong> De-escalation &mdash; lower voice, private space, acknowledge</li>
              <li><strong>UK standard:</strong> ACAS &mdash; early, informal resolution first</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">For Site Leaders</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Goal:</strong> Manage conflict constructively, not eliminate it</li>
              <li><strong>Danger:</strong> Defaulting to one mode for every situation</li>
              <li><strong>Never:</strong> Resolve conflict in front of others</li>
              <li><strong>Always:</strong> Focus on the issue, not the person</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain why some conflict is healthy and necessary for effective teams",
              "Describe Thomas-Kilmann's five conflict modes and when to use each one",
              "Apply de-escalation techniques to manage heated situations on site",
              "Outline the ACAS approach to workplace conflict resolution",
              "Select the appropriate conflict mode for common site disputes",
              "Recognise when to escalate a conflict rather than resolving it yourself"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Conflict Is Normal — And Sometimes Healthy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Conflict Is Normal &mdash; And Sometimes Healthy
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not all conflict is bad. In fact, the absence of conflict is often a warning sign.
                When nobody ever disagrees, it usually means people are not being honest, concerns
                are being suppressed, and bad decisions are going unchallenged. This is far more
                dangerous than open disagreement.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Patrick Lencioni &mdash; The Five Dysfunctions</p>
                <p className="text-sm text-white/80">
                  In his influential work on team dynamics, Patrick Lencioni identified <strong
                  className="text-white">fear of conflict</strong> as the second dysfunction of a
                  team, following directly from the first (absence of trust). Teams that cannot engage
                  in honest, productive debate default to artificial harmony &mdash; where real
                  problems go unaddressed, better ideas go unheard, and poor decisions go unchallenged.
                </p>
              </div>

              <p>
                Healthy disagreement drives better decisions, surfaces hidden problems, and prevents
                groupthink. When an electrician says &ldquo;I think that method is wrong and here is
                why,&rdquo; that is not a problem &mdash; that is a team member contributing their
                expertise. The goal is not to eliminate conflict but to <strong>manage it
                constructively</strong> so that disagreement about ideas does not become personal
                hostility.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Artificial Harmony Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  If your team never disagrees, that is not a sign of good leadership &mdash; it is
                  a warning sign. Artificial harmony means people have stopped voicing concerns,
                  stopped challenging decisions, and stopped contributing their best thinking. The
                  result is poor decisions that nobody questioned, safety hazards that nobody raised,
                  and a team that looks compliant but is actually disengaged. <strong className="text-white">
                  Your job is to create an environment where people can disagree safely,</strong> not
                  one where they feel they cannot speak up.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Healthy Conflict vs Destructive Conflict</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-green-400 font-semibold text-sm mb-2">Healthy (Task) Conflict</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Focuses on ideas, methods, and approaches</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Both parties listen and consider the other view</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Leads to better decisions and solutions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Strengthens trust and respect over time</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-2">Destructive (Relationship) Conflict</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Focuses on personalities and personal attacks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Parties talk past each other or refuse to engage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Creates resentment, hostility, and division</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Erodes trust and damages team cohesion</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Thomas-Kilmann's Five Conflict Modes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Thomas-Kilmann&rsquo;s Five Conflict Modes
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Kenneth Thomas and Ralph Kilmann identified five distinct ways people handle conflict,
                plotted on two axes: <strong>Assertiveness</strong> (how strongly you try to satisfy
                your own concerns) and <strong>Cooperativeness</strong> (how strongly you try to
                satisfy the other person&rsquo;s concerns). No single mode is always right &mdash;
                the problem is <strong>defaulting to one mode for every situation</strong>.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Scale className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Five Conflict Modes</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">1. Competing <span className="text-white/80 font-normal">(High Assert, Low Coop)</span></p>
                    <p className="text-white/80">&ldquo;I win, you lose.&rdquo; Asserting your position at the other party&rsquo;s expense. <strong className="text-white">Use for:</strong> Safety non-negotiables, urgent decisions where you have authority, protecting the team from unreasonable demands.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">2. Collaborating <span className="text-white/80 font-normal">(High Assert, High Coop)</span></p>
                    <p className="text-white/80">&ldquo;Win-win.&rdquo; Working together to find a solution that fully satisfies both parties. <strong className="text-white">Use for:</strong> Complex issues where both concerns are important, when you have time, building long-term relationships.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">3. Compromising <span className="text-white/80 font-normal">(Medium Assert, Medium Coop)</span></p>
                    <p className="text-white/80">&ldquo;Split the difference.&rdquo; Both parties give up something to reach a quick, workable solution. <strong className="text-white">Use for:</strong> Moderately important issues, time pressure, when collaboration is not practical.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">4. Avoiding <span className="text-white/80 font-normal">(Low Assert, Low Coop)</span></p>
                    <p className="text-white/80">&ldquo;Later.&rdquo; Sidestepping or postponing the conflict. <strong className="text-white">Use for:</strong> Trivial issues, when emotions are too high for productive discussion, buying time to gather information.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">5. Accommodating <span className="text-white/80 font-normal">(Low Assert, High Coop)</span></p>
                    <p className="text-white/80">&ldquo;Your needs first.&rdquo; Giving in to the other party&rsquo;s concerns. <strong className="text-white">Use for:</strong> When the relationship matters more than the issue, when you are wrong, building goodwill for future negotiations.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Defaulting Trap</p>
                </div>
                <p className="text-sm text-white/80">
                  Most people have a default conflict mode &mdash; the one they reach for instinctively.
                  A supervisor who always competes alienates the team and creates resentment. One who
                  always avoids lets problems fester until they explode. One who always accommodates
                  gets walked over. <strong className="text-white">Effective leaders consciously
                  select the mode that fits the situation</strong> rather than defaulting to their
                  natural preference every time.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Quick Reference &mdash; Matching Mode to Situation</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Safety non-negotiable?</strong> Compete. No discussion needed &mdash; the answer is no.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Complex issue, time available?</strong> Collaborate. Invest the time for a win-win solution.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Moderate importance, need a quick result?</strong> Compromise. Split the difference and move on.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Trivial issue or emotions too high?</strong> Avoid temporarily. Come back when heads are cooler.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">You are wrong, or relationship matters more?</strong> Accommodate. Concede gracefully and build goodwill.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: De-escalation Techniques */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            De-escalation Techniques
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When conflict gets heated on site &mdash; and it will &mdash; your ability to
                de-escalate the situation is critical. An angry exchange in front of the team damages
                everyone&rsquo;s credibility and makes resolution harder. These seven techniques work
                because they reduce the emotional temperature so rational discussion can happen.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Seven De-escalation Techniques</p>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">1. Lower Your Voice</p>
                    <p className="text-white/80">Do not match their energy. When they raise their voice, lower yours. This is counterintuitive but highly effective &mdash; it forces them to lower theirs to hear you, and it signals calm authority rather than reactive aggression.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">2. Move to a Private Space</p>
                    <p className="text-white/80">Never resolve conflict in front of others. An audience adds pressure, embarrassment, and the need to save face. Say &ldquo;Let us step over here for a minute&rdquo; and move away from the team.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">3. Acknowledge Their Feelings</p>
                    <p className="text-white/80">&ldquo;I can see you are frustrated&rdquo; or &ldquo;I understand this is annoying.&rdquo; This is not agreeing with them &mdash; it is showing you recognise their emotional state. People need to feel heard before they can listen.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">4. Use Their Name</p>
                    <p className="text-white/80">Using someone&rsquo;s first name personalises the conversation and signals respect. It moves the dynamic from confrontation to dialogue.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">5. Ask Open Questions</p>
                    <p className="text-white/80">&ldquo;What happened from your perspective?&rdquo; or &ldquo;Help me understand what the issue is.&rdquo; Open questions invite them to explain rather than defend, shifting from confrontation to problem-solving.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">6. Focus on the Issue, Not the Person</p>
                    <p className="text-white/80">&ldquo;The cable route is clashing with the ductwork&rdquo; not &ldquo;You have installed it wrong.&rdquo; Separating the problem from the person reduces defensiveness and opens the door to solutions.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">7. Take a Break if Needed</p>
                    <p className="text-white/80">&ldquo;Let us come back to this in 10 minutes.&rdquo; Sometimes the best thing is a short cooling-off period. This is not avoiding the conflict &mdash; it is ensuring you address it when both parties can think clearly.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">What NOT to do:</strong> Never tell someone to
                  &ldquo;calm down&rdquo; &mdash; this almost always has the opposite effect and
                  comes across as dismissive. Never walk away without explanation. Never use
                  sarcasm or ridicule. Never threaten consequences in the heat of the moment. And
                  above all, never resolve a conflict publicly &mdash; an audience turns a
                  disagreement into a performance where saving face matters more than finding a
                  solution.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: The ACAS Approach */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            The ACAS Approach to Conflict Resolution
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>ACAS</strong> (the Advisory, Conciliation and Arbitration Service) is the
                UK&rsquo;s statutory body for workplace relations. Their guidance on managing conflict
                is considered the gold standard and is referenced by employment tribunals across the
                country.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">ACAS Key Principles</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">Early Resolution Is Critical</p>
                    <p className="text-white/80">Catch conflict before it escalates. Small disagreements, if ignored, grow into entrenched positions that are far harder to resolve. The earlier you intervene, the more options you have.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">Informal First</p>
                    <p className="text-white/80">Start with a voluntary conversation, not a formal process. Most workplace conflicts can be resolved through an honest, facilitated discussion between the parties. Formal grievance and disciplinary procedures should be a last resort, not a first response.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">Mediation When Needed</p>
                    <p className="text-white/80">If informal resolution fails, mediation uses a neutral third party to facilitate dialogue. The mediator is impartial, does not take sides, and does not impose solutions &mdash; they help the parties find their own resolution. This is voluntary and confidential.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">Line Manager Capability</p>
                    <p className="text-white/80">ACAS emphasises that training line managers and supervisors in conflict resolution skills is essential. Most workplace conflict is resolved (or should be) at the supervisor level. You are the first line of defence &mdash; which is why these skills matter.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Goal Is Dialogue, Not Punishment</p>
                </div>
                <p className="text-sm text-white/80">
                  ACAS is clear that the purpose of conflict resolution is <strong className="text-white">
                  restoring a productive working relationship</strong>, not assigning blame or imposing
                  punishment. The question is not &ldquo;who was wrong?&rdquo; but &ldquo;how do we
                  move forward and work together effectively?&rdquo; Disciplinary action is only
                  appropriate where there has been genuine misconduct &mdash; not simply because two
                  people disagreed.
                </p>
              </div>

              <p>
                As a supervisor, you are the first line of defence for conflict resolution. Most
                workplace conflict should be resolved at your level, informally, before it escalates
                to formal processes. ACAS research consistently shows that early, informal
                intervention produces better outcomes for everyone involved &mdash; the individuals,
                the team, and the organisation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The ACAS Resolution Pathway</p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold text-xs mt-0.5 flex-shrink-0">STEP 1</span>
                    <span>Early intervention &mdash; speak to the parties informally as soon as
                      you become aware of the conflict. Most issues resolve here.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold text-xs mt-0.5 flex-shrink-0">STEP 2</span>
                    <span>Facilitated conversation &mdash; bring the parties together with clear
                      ground rules. Focus on finding a way forward, not apportioning blame.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold text-xs mt-0.5 flex-shrink-0">STEP 3</span>
                    <span>Mediation &mdash; if direct resolution fails, a neutral third party
                      facilitates dialogue. Voluntary, confidential, and non-binding.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold text-xs mt-0.5 flex-shrink-0">STEP 4</span>
                    <span>Formal procedures &mdash; grievance or disciplinary processes. Only when
                      all informal options have been genuinely exhausted.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Common Site Conflicts */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Common Site Conflicts and How to Handle Them
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Certain types of conflict recur on construction sites with predictable regularity.
                Having a prepared approach for each type means you can respond calmly and effectively
                rather than reacting in the moment. The following are the six most common and how to
                handle them using the Thomas-Kilmann framework.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Pre-emption Is Better Than Resolution</p>
                </div>
                <p className="text-sm text-white/80">
                  Many site conflicts can be prevented by clear communication, agreed sequences, and
                  regular coordination. If you are constantly resolving the same types of conflict,
                  the root cause is probably a <strong className="text-white">process or
                  communication gap</strong> that needs addressing. Use the problem-solving tools
                  from Section 2 to identify and fix the underlying issue, rather than resolving the
                  same conflict every week.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Six Common Site Conflicts</p>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">1. Sequencing Disagreements Between Trades</p>
                    <p className="text-white/80"><strong className="text-white">Recommended mode:</strong> Collaborating or Compromising. Focus on the programme, not personalities. Use the coordination meeting to establish a shared sequence. <strong className="text-white">Mistake to avoid:</strong> Competing aggressively &mdash; you need these relationships tomorrow.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">2. Disputes About Quality of Work</p>
                    <p className="text-white/80"><strong className="text-white">Recommended mode:</strong> Collaborating. Establish facts first, reference specifications, keep it objective. <strong className="text-white">Mistake to avoid:</strong> Making it personal &mdash; criticise the work, not the person.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">3. Personality Clashes Between Team Members</p>
                    <p className="text-white/80"><strong className="text-white">Recommended mode:</strong> Collaborating with mediation. Speak to each person individually first, then facilitate a joint conversation. <strong className="text-white">Mistake to avoid:</strong> Avoiding indefinitely &mdash; it will get worse.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">4. Complaints About Favouritism or Unfairness</p>
                    <p className="text-white/80"><strong className="text-white">Recommended mode:</strong> Collaborating. Listen carefully, review your allocation decisions honestly, and explain your reasoning transparently. <strong className="text-white">Mistake to avoid:</strong> Dismissing the concern &mdash; perceived unfairness destroys trust.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">5. Disagreements with Main Contractor or Client</p>
                    <p className="text-white/80"><strong className="text-white">Recommended mode:</strong> Collaborating or Compromising. Stay professional, reference the contract, propose solutions not just problems. <strong className="text-white">Mistake to avoid:</strong> Accommodating everything &mdash; your team relies on you to advocate for fair treatment.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">6. Pay Disputes</p>
                    <p className="text-white/80"><strong className="text-white">Recommended mode:</strong> Collaborating. Document everything, check the agreement, involve HR or contracts if needed. <strong className="text-white">Mistake to avoid:</strong> Making promises you cannot keep or dismissing legitimate concerns.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">General Principles for All Site Conflicts</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Act early</strong> &mdash; the longer you
                      leave a conflict unaddressed, the harder it becomes to resolve and the more
                      damage it does to the working environment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Stay neutral</strong> &mdash; even if you
                      have a personal opinion, your role is to facilitate a fair resolution, not
                      to take sides</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Document it</strong> &mdash; keep a record
                      of what was discussed and what was agreed. This protects everyone and
                      provides a reference if the conflict resurfaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Follow up</strong> &mdash; check in with
                      both parties a few days later to ensure the resolution is holding and the
                      working relationship has genuinely improved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Learn from it</strong> &mdash; if the same
                      type of conflict keeps recurring, there is a systemic cause that needs
                      addressing at a process level, not just a relationship level</span>
                  </li>
                </ul>
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
                Conflict is an inevitable part of working on construction sites. Your effectiveness
                as a leader depends not on avoiding it, but on managing it constructively. The key
                points from this section are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Conflict is normal:</strong> Healthy task conflict drives better decisions; destructive relationship conflict must be managed</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Five modes:</strong> Competing, Collaborating, Compromising, Avoiding, Accommodating &mdash; each appropriate in different situations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">De-escalation:</strong> Lower voice, private space, acknowledge feelings, use their name, open questions, issue not person, take a break</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">ACAS approach:</strong> Early resolution, informal first, mediation if needed, and line manager capability</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">No default mode:</strong> Effective leaders select the conflict mode that fits the situation, not their comfort zone</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Know when to escalate:</strong> Violence risk, discrimination, failed informal resolution, or personal involvement</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Next:</strong> In Section 4, we examine
                  accountability and responsibility &mdash; the Ladder of Inference, owning your
                  mistakes, holding others accountable fairly, and building a culture of responsibility
                  through Just Culture and psychological safety.
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
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-4-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-4-section-4">
              Next: Accountability
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
