import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Users, Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mate-manager-hardest",
    question: "According to this section, what is often described as the single hardest part of the mate-to-manager transition?",
    options: [
      "Learning new technical skills required for the supervisory role",
      "Handling underperformance in people who are your friends",
      "Completing the additional paperwork that comes with management",
      "Adjusting to earlier start times and longer working hours"
    ],
    correctIndex: 1,
    explanation: "Handling underperformance in people who are your friends is widely regarded as the single hardest part of the mate-to-manager transition. When someone you have shared breaks, lifts, and after-work drinks with starts turning up late or cutting corners, having that difficult conversation feels like a betrayal of the friendship. But avoiding the conversation is a betrayal of your role — and of the rest of the team who are doing their jobs properly."
  },
  {
    id: "mate-manager-boundaries",
    question: "When setting boundaries as a new supervisor, what is the recommended approach?",
    options: [
      "Wait a few months until you feel settled before changing anything",
      "Set clear, explicit boundaries from day one and apply them equally to everyone",
      "Only set boundaries with team members who are causing problems",
      "Let the team decide the boundaries through a group vote"
    ],
    correctIndex: 1,
    explanation: "The recommended approach is to set clear, explicit boundaries from day one and apply them equally to everyone. Waiting creates ambiguity that is much harder to correct later. Setting boundaries only for some people creates perceived favouritism. The phrase 'the same for everyone' must become your guiding principle. Have the conversation early: 'I know this is different. It is different for me too. But these are the standards, and they apply to all of us equally.'"
  },
  {
    id: "mate-manager-respect",
    question: "What should a new supervisor aim for when building relationships with their former peers?",
    options: [
      "Being the most popular person on the team",
      "Being feared so that nobody questions their authority",
      "Being respected and fair, even if that means not always being liked",
      "Being invisible — letting the team manage themselves entirely"
    ],
    correctIndex: 2,
    explanation: "The goal is to be respected and fair, not to be liked. Popularity-seeking leads to inconsistency and avoidance of difficult decisions. Fear-based leadership destroys trust and morale. Invisible leadership creates chaos and resentment. Respect comes from fairness, consistency, competence, and keeping your word. You can be firm when needed and supportive always — the two are not mutually exclusive."
  }
];

const faqs = [
  {
    question: "My best mate on the crew is now my direct report. How do I handle that?",
    answer: "This is one of the most common and most difficult situations in the mate-to-manager transition. The key is to have an honest, direct conversation early — ideally in private, within your first week. Acknowledge that the dynamic has changed: 'Look, we are still mates, but I have a responsibility to the whole team now. I need to hold everyone to the same standard, including you. If anything, I need to be more careful with you, not less, because everyone will be watching for favouritism.' Most genuine friends will understand and respect this. The friendship does not have to end — but it does need to evolve. You can still have a beer after work, but during work hours, the professional relationship has to take priority. If your friend cannot accept this, that tells you something important about the friendship."
  },
  {
    question: "The team does not take me seriously because I was one of them last week. What do I do?",
    answer: "This is extremely common and it takes time to resolve. Do not try to force authority through aggression or power plays — that will backfire. Instead, focus on demonstrating competence, fairness, and consistency every single day. Make good decisions. Follow through on what you say. Hold everyone to the same standard without exception. Seek small wins early: solve a problem the team has been frustrated by, remove an obstacle, advocate for them with management. Over time, consistent, fair behaviour builds credibility faster than any title. Also remember: you were chosen for this role for a reason. Trust the decision that was made and back yourself."
  },
  {
    question: "I feel completely isolated — I am not one of the lads any more, but management does not see me as one of them either. Is this normal?",
    answer: "Yes, this is completely normal and it is one of the most commonly reported feelings among new supervisors. The loss of belonging is a genuine emotional challenge. You were part of a crew — that meant camaraderie, shared jokes, mutual support, and a clear identity. Now you are in a middle space that can feel lonely. The solution is twofold: first, accept that your relationships with the crew will be different, not necessarily worse, but different. Second, actively build a new support network — connect with other supervisors, find a mentor, use your line manager. You are not alone in feeling alone, and over time, you will find your place in this new role."
  },
  {
    question: "Someone on the team has started openly undermining me in front of others. How should I respond?",
    answer: "This requires swift, calm, and private action. Do not confront the person in front of the team — that turns it into a public power struggle that nobody wins. Instead, take them aside privately at the first opportunity. Be direct: 'I have noticed that you have been challenging my decisions in front of the team. I am happy to hear your concerns — I genuinely want your input — but I need you to raise them with me privately, not in front of everyone. When it happens publicly, it undermines the whole team's confidence in the direction we are going.' If the behaviour continues after this conversation, it becomes a formal performance issue and should be escalated to your manager. Document the incidents. Do not let it fester — unaddressed undermining will spread."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The mate-to-manager transition is considered especially difficult in construction because:",
    options: [
      "Construction workers are less intelligent than workers in other industries",
      "Crew culture is tight, relationships are deep, and the social dynamic changes overnight",
      "There are no formal training programmes available for new supervisors",
      "Construction companies do not pay supervisors enough to justify the stress"
    ],
    correctAnswer: 1,
    explanation: "The mate-to-manager transition is especially difficult in construction because crew culture is typically very tight. Teams work physically close together, share breaks, lifts, and often socialise outside work. When one person is promoted from within, every relationship changes overnight. The people you confided in, complained to, and relied on are suddenly your direct reports. This social upheaval is more intense in construction than in many other industries."
  },
  {
    id: 2,
    question: "Which of the following is NOT one of the seven core challenges of the mate-to-manager transition?",
    options: [
      "Relationship recalibration",
      "Learning entirely new technical trade skills",
      "Perceived favouritism",
      "Confidentiality shift"
    ],
    correctAnswer: 1,
    explanation: "Learning entirely new technical trade skills is not one of the seven core challenges. The seven challenges are: (1) Relationship recalibration, (2) Resentment and jealousy from peers, (3) Handling underperformance in friends, (4) Letting go of 'doing', (5) Perceived favouritism, (6) Loss of belonging, and (7) Confidentiality shift. The transition is primarily about people and relationships, not about acquiring new technical knowledge."
  },
  {
    id: 3,
    question: "The principle of 'letting go of doing' means that a new supervisor should:",
    options: [
      "Stop doing any physical work on site immediately",
      "Focus on making others great at the trade rather than doing everything themselves",
      "Delegate all responsibilities and spend most of their time in the site office",
      "Only do tasks that nobody else on the team is willing to do"
    ],
    correctAnswer: 1,
    explanation: "Letting go of 'doing' means shifting your focus from personal productivity to team productivity. You were promoted because you are excellent at the trade — but your job now is to make OTHERS excellent. This does not mean you never pick up a tool again, but it does mean that your primary value is no longer in what you produce with your own hands. It is in what you enable the entire team to produce through your leadership, planning, and support."
  },
  {
    id: 4,
    question: "When a new supervisor says 'I know this is weird. It is weird for me too' to their former peers, they are:",
    options: [
      "Showing weakness that will undermine their authority",
      "Acknowledging the transition honestly, which builds trust and reduces tension",
      "Making excuses for not being able to do the job properly",
      "Trying to avoid taking responsibility for difficult decisions"
    ],
    correctAnswer: 1,
    explanation: "Acknowledging the awkwardness honestly is one of the most effective things a new supervisor can do. It shows authenticity, builds trust, and reduces the tension that everyone is feeling. Pretending the transition is not awkward when everyone knows it is actually undermines credibility. Saying 'I know this is different, and I am figuring it out too' is not weakness — it is honest leadership."
  },
  {
    id: 5,
    question: "A new supervisor discovers that a close friend on the team has been consistently arriving 15 minutes late. The best approach is to:",
    options: [
      "Ignore it because addressing it could damage the friendship",
      "Mention it casually during a break to keep things informal",
      "Address it privately, directly, and apply the same standard as for any other team member",
      "Ask another team member to have the conversation on your behalf"
    ],
    correctAnswer: 2,
    explanation: "The correct approach is to address it privately, directly, and to the same standard you would apply to any other team member. Ignoring it creates a double standard that the rest of the team will notice instantly. Mentioning it casually lacks the seriousness the situation requires. Delegating the conversation to someone else undermines your authority. A private, direct conversation — 'I need to talk to you about timekeeping. The expectation is the same for everyone, and that includes you' — is fair, professional, and respectful."
  },
  {
    id: 6,
    question: "The 'loss of belonging' challenge refers to:",
    options: [
      "Being physically moved to a different work location",
      "Losing your technical skills because you are no longer practising the trade daily",
      "Feeling that you no longer belong to the crew but are not fully accepted by management either",
      "Being excluded from team social events by resentful colleagues"
    ],
    correctAnswer: 2,
    explanation: "The loss of belonging is the feeling of being caught in the middle — no longer truly one of the crew (because your role has changed and you have information and responsibilities they do not), but not yet accepted by senior management as one of their own. This in-between space can feel deeply isolating. It is one of the most emotionally challenging aspects of the transition, and building a support network of other supervisors and mentors is essential for managing it."
  },
  {
    id: 7,
    question: "According to this section, respect as a new supervisor comes primarily from:",
    options: [
      "The job title and the authority that comes with it",
      "Being the most technically skilled person on the team",
      "Fairness, consistency, competence, and keeping your word",
      "Being strict and punishing any rule-breaking immediately"
    ],
    correctAnswer: 2,
    explanation: "Respect comes from fairness (treating everyone equally), consistency (applying the same standards every day, not just when you feel like it), competence (knowing your stuff and making good decisions), and keeping your word (doing what you say you will do). A title gives you authority, but it does not give you respect. Technical skill is important but insufficient on its own. Strictness without fairness breeds fear, not respect."
  },
  {
    id: 8,
    question: "Building a support network as a new supervisor should include:",
    options: [
      "Only relying on your team for emotional and professional support",
      "Finding a mentor, connecting with other supervisors, and using your line manager",
      "Keeping all challenges to yourself to project strength and confidence",
      "Spending more time with the management team and less time with the crew"
    ],
    correctAnswer: 1,
    explanation: "An effective support network includes finding a mentor (someone who has been through the transition before), connecting with other supervisors (who understand the unique challenges of the role), and using your line manager (who should be there to support your development). Relying only on your team creates an unhealthy dependency. Bottling up challenges leads to burnout and poor decision-making. The construction industry needs to break the taboo around discussing leadership challenges openly."
  }
];

export default function LeadershipModule1Section4() {
  useSEO({
    title: "The Mate-to-Manager Transition | Leadership Module 1.4",
    description: "Navigate the most challenging leadership transition — moving from being one of the crew to leading the crew. The seven core challenges, boundary setting, earning respect, and building your support network.",
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
            <Link to="../leadership-module-1">
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
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Mate-to-Manager Transition
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The single most challenging leadership transition in any career &mdash; moving from being one of the crew to leading the crew, and how to navigate it without losing yourself or your relationships
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>The shift:</strong> Coworkers become direct reports overnight</li>
              <li><strong>7 challenges:</strong> From relationship recalibration to confidentiality</li>
              <li><strong>Boundaries:</strong> The same for everyone, from day one</li>
              <li><strong>Goal:</strong> Respected and fair &mdash; not liked</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Hardest part:</strong> Addressing underperformance in friends</li>
              <li><strong>Key shift:</strong> From doing the work to making others great</li>
              <li><strong>Isolation:</strong> Neither one of the lads nor management</li>
              <li><strong>Support:</strong> You cannot do this alone &mdash; build your network</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain why the mate-to-manager transition is uniquely difficult in construction",
              "Identify and describe the seven core challenges of moving from peer to supervisor",
              "Apply practical strategies for setting clear, fair boundaries from day one",
              "Distinguish between being respected and being liked as a new leader",
              "Develop approaches for handling underperformance in friends and former peers",
              "Build a support network to sustain you through the transition and beyond"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why This Transition Is So Hard */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Why This Transition Is So Hard
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Of all the transitions you will make in your career, moving from being one of the team
                to leading the team is almost certainly the hardest. It is not a promotion in the
                traditional sense &mdash; it is a <strong>fundamental rewiring of every professional
                relationship you have</strong>. The coworkers you once confided in, complained to,
                and relied on for support are now your direct reports. Every relationship changes
                overnight, whether you want it to or not.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Core Reality</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>&ldquo;Yesterday you were sharing a brew and having a laugh at the morning
                  toolbox talk. Today you are the one delivering it &mdash; and the person who used
                  to be your equal is now the person whose timekeeping you are responsible for.&rdquo;</strong>
                </p>
              </div>

              <p>
                This transition is especially brutal in <strong>construction</strong>. Crew culture
                on a building site is tight in a way that office-based industries rarely experience.
                You work physically close together, often in demanding and sometimes dangerous
                conditions. You share van rides, carry materials together, eat lunch on the same
                scaffold deck, and often socialise after work. The bonds are real. They are forged
                through shared hardship, mutual reliance, and genuine camaraderie.
              </p>

              <p>
                When one person in that crew is promoted from within, the social fabric tears. Not
                because anyone did anything wrong &mdash; but because the <strong>power dynamic has
                shifted</strong>. You now have authority over people who were your equals. You have
                access to information they do not. You are expected to make decisions that affect
                their working lives. And they know it.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Changes Overnight</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Conversations stop when you walk in</strong> &mdash; the team were complaining about the project manager. They see you coming. Silence. You are now associated with management, even if you do not feel like it.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Jokes land differently</strong> &mdash; the banter you used to share now carries a different weight. A throwaway comment from you can be interpreted as a directive. Sarcasm you meant as humour can sound like criticism.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Information becomes sensitive</strong> &mdash; you now know about upcoming redundancies, disciplinary issues, pay decisions, and project problems that you cannot share with the team. The openness you once had with your mates is now constrained.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Trust is tested</strong> &mdash; people who trusted you as a peer may now distrust you as a supervisor. They wonder whose side you are on. They watch to see if you will favour your mates or treat everyone equally.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Your identity shifts</strong> &mdash; you defined yourself by what you could do with your hands. Now your value is measured by what you can get others to do. That is a profound identity change that many new supervisors underestimate.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Uncomfortable Truth</p>
                </div>
                <p className="text-sm text-white/80">
                  Nobody fully prepares you for this. Most new supervisors in construction receive
                  little or no formal training in managing the human side of the transition. You are
                  expected to figure it out on the job &mdash; and many people struggle in silence,
                  believing that admitting the difficulty is a sign of weakness. <strong className="text-white">It
                  is not.</strong> Recognising that this transition is genuinely hard is the first
                  step to navigating it successfully.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Seven Core Challenges */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Seven Core Challenges
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Research and experience consistently identify <strong>seven core challenges</strong> that
                new supervisors face when promoted from within their team. Understanding these challenges
                before they hit you is significantly better than discovering them through painful trial
                and error.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold mb-1">1. Relationship Recalibration</p>
                    <p className="text-white/80 text-xs mb-2">Every relationship on the team must be renegotiated. Some will get stronger, some will get weaker, and some will break entirely. The mates who respected you as a peer may resent you as a boss. The quiet ones who never said much may become your most reliable allies.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> You and Dave have been best mates for three years. Now you are his supervisor. He still wants to joke around all morning. You need him focused. The recalibration starts here.</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold mb-1">2. Resentment and Jealousy from Peers</p>
                    <p className="text-white/80 text-xs mb-2">Not everyone will be happy for you. Some colleagues who wanted the role will feel passed over. Others may believe they deserved it more. This resentment can manifest as passive-aggressive behaviour, open challenges to your authority, or subtle undermining behind your back.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> Mark has ten years more experience than you. He applied for the supervisor role and did not get it. He is now making pointed comments about &ldquo;people who got the job because of who they know.&rdquo;</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold mb-1">3. Handling Underperformance in Friends</p>
                    <p className="text-white/80 text-xs mb-2">This is widely regarded as the <strong className="text-white">single hardest challenge</strong>. When your mate starts cutting corners, arriving late, or not pulling their weight, you have to address it &mdash; and you have to address it the same way you would with anyone else. The temptation to look the other way is enormous. The consequences of doing so are worse.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> Your best mate on site has started leaving 20 minutes early every day. The rest of the team has noticed. They are watching to see what you do. If you do nothing, you have told the entire team that the rules do not apply to your mates.</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                    <p className="text-blue-400 font-semibold mb-1">4. Letting Go of &ldquo;Doing&rdquo;</p>
                    <p className="text-white/80 text-xs mb-2">You were promoted because you are brilliant at the trade. You are the fastest cable installer, the neatest terminator, the person everyone goes to when something is tricky. But your job now is not to do the work &mdash; it is to <strong className="text-white">make others great at the work</strong>. This is the most counterintuitive shift in the entire transition.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> You see an apprentice struggling with a termination. Your instinct screams &ldquo;move aside, let me do it.&rdquo; The right response is to teach, coach, and let them develop &mdash; even if it takes three times longer.</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
                    <p className="text-purple-400 font-semibold mb-1">5. Perceived Favouritism</p>
                    <p className="text-white/80 text-xs mb-2">Even if you treat everyone identically, people will look for favouritism. They will scrutinise who you give the best tasks to, who you spend breaks with, who you let off early, and who you allocate overtime to. Perception is reality &mdash; if the team believes there is favouritism, the damage is done regardless of your intentions.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> You allocate a rewarding task to your mate because he genuinely has the right skills. The team sees something different: the new boss giving the good work to his best mate. You need to be able to explain every decision transparently.</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold mb-1">6. Loss of Belonging</p>
                    <p className="text-white/80 text-xs mb-2">You are no longer one of the lads. The crew conversations go quiet when you approach. You are not invited to the WhatsApp group any more. But you are not one of the management team either &mdash; they see you as a junior newcomer. You are caught in a <strong className="text-white">no-man&rsquo;s land</strong> between the two groups, and it can feel deeply isolating.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> Lunchtime used to be the best part of the day. Now you sit with the lads and the conversation feels forced. You sit in the office and feel like an imposter. Neither space feels like home.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-semibold mb-1">7. Confidentiality Shift</p>
                    <p className="text-white/80 text-xs mb-2">As a supervisor, you will have access to sensitive information: planned redundancies, disciplinary actions, pay grades, performance reviews, and management decisions that have not been announced. You can no longer share everything with your mates. This creates an invisible wall that can strain relationships.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> You learn that the project is being scaled back and two lads will be let go next month. Your best mate asks you casually: &ldquo;Heard any rumours about the project?&rdquo; You cannot tell him. That silence creates distance.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key insight:</strong> These seven challenges are not
                  problems to be solved once and forgotten. They are <strong>ongoing tensions</strong> that
                  you will manage throughout your time as a supervisor. The goal is not to eliminate them
                  &mdash; it is to develop the awareness and skills to navigate them effectively, consistently,
                  and with integrity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Setting Clear Boundaries */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Setting Clear Boundaries
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Boundaries are the single most important tool you have in the mate-to-manager transition.
                Without clear boundaries, you will be pulled in every direction &mdash; torn between
                being a mate and being a manager, between being lenient and being firm, between being
                popular and being effective. The answer is simple, even if it is not easy:
                <strong> &ldquo;The same for everyone, from day one.&rdquo;</strong>
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Boundary Conversation</p>
                </div>
                <p className="text-base text-white leading-relaxed">
                  <strong>&ldquo;I know this is weird. It is weird for me too. But I have a job to
                  do now, and that job includes making sure we all hit the same standard. I am not
                  going to treat anyone differently &mdash; not better and not worse. If you have
                  got a problem, come and talk to me. But the rules are the rules, and they are the
                  same for everyone.&rdquo;</strong>
                </p>
              </div>

              <p>
                This conversation &mdash; or something like it &mdash; should happen <strong>within
                your first week</strong>. Not when the first problem arises. Not after three months
                of ambiguity. From the start. The longer you wait, the harder it becomes, because
                people will have already established expectations based on how you behaved in the
                grey zone.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Practical Boundary-Setting Strategies</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Be explicit, not implied</strong> &mdash; do not assume people know the boundaries. State them clearly. &ldquo;Start time is 7:30. I expect everyone on site, kitted up, and ready to work at 7:30. Not 7:35, not 7:40.&rdquo; Vague expectations create room for interpretation, and interpretation creates conflict.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Apply rules equally and visibly</strong> &mdash; if you pull up one person for poor timekeeping, you must pull up everyone. If you let your mate slide on something you challenged someone else about, you have lost the entire team&rsquo;s respect in a single moment. Consistency is everything.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Separate the personal and the professional</strong> &mdash; you can still be friendly, but you have to be professional first. This means that during working hours, the professional relationship takes priority. You can have a beer together after work, but on site, the standards apply.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Address boundary breaches immediately</strong> &mdash; when someone tests the boundary (and they will), address it privately, calmly, and promptly. The longer you leave it, the more the boundary erodes. Every unaddressed breach tells the team that the boundary is optional.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Hold yourself to the same standard</strong> &mdash; if you expect the team on site at 7:30, you need to be there at 7:20. If you expect clean workmanship, your own work must be immaculate. If you expect honesty, you must model it. You cannot enforce standards you do not live by.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Boundary Mistakes</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold text-xs mb-1">Trying to Stay &ldquo;One of the Lads&rdquo;</p>
                    <p className="text-white/80 text-xs">Continuing to behave exactly as you did before the promotion. Joining in with complaints about management. Sharing information you should not. Letting things slide because &ldquo;we are all mates.&rdquo; This feels comfortable but destroys your credibility.</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold text-xs mb-1">Swinging to the Opposite Extreme</p>
                    <p className="text-white/80 text-xs">Becoming cold, distant, and authoritarian overnight. Some new supervisors overcompensate by removing all warmth from their interactions. This is just as damaging &mdash; it alienates the team and makes them feel that the promotion has changed you as a person.</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold text-xs mb-1">Selective Enforcement</p>
                    <p className="text-white/80 text-xs">Enforcing rules for some people and not others. Letting your close mates get away with things you would challenge in someone else. This is the fastest way to lose the team&rsquo;s respect and create resentment.</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold text-xs mb-1">Avoiding Difficult Conversations</p>
                    <p className="text-white/80 text-xs">Hoping that problems will resolve themselves. They will not. Unaddressed issues grow. A timekeeping problem left for a week becomes a culture problem left for a month. Have the conversation early, privately, and directly.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Remember:</strong> Setting boundaries is not about
                  being harsh. It is about being <strong>fair</strong>. When the rules are clear and
                  applied equally, everyone knows where they stand. That creates safety, predictability,
                  and trust. Ambiguity is the enemy &mdash; clear expectations are the foundation of
                  an effective team.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Earning Respect Without Being a Dictator */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Earning Respect Without Being a Dictator
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There is a trap that many new supervisors fall into: believing that leadership is a
                choice between being liked and being respected. In reality, the best leaders are
                <strong> respected AND liked</strong> &mdash; but when those two things conflict,
                respect must always win. Your goal is to be <strong>&ldquo;respected and
                fair&rdquo;</strong>, not &ldquo;liked by everyone.&rdquo;
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Four Pillars of Earned Respect</p>
                <p className="text-sm text-white/80">
                  Respect cannot be demanded &mdash; it can only be earned. And it is earned through
                  four things that you must demonstrate <strong className="text-white">consistently,
                  every single day</strong>, not just when you feel like it.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold mb-1">1. Fairness</p>
                    <p className="text-white/80 text-xs mb-2">Treating everyone by the same standard, without exception. Fairness does not mean treating everyone identically &mdash; different people may need different support &mdash; but it means applying the same expectations, consequences, and opportunities to all.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">In practice:</strong> If two people are late, both get the same conversation. If overtime is available, it is offered to everyone, not just your mates. If someone does exceptional work, they get recognised regardless of whether you like them personally.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-blue-400 font-semibold mb-1">2. Consistency</p>
                    <p className="text-white/80 text-xs mb-2">Being the same person on Monday as you are on Friday. The same person when things are going well and when they are going badly. Teams cannot function if they never know which version of the supervisor they are going to get.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">In practice:</strong> Your standards do not flex based on your mood. A bad morning at home does not turn into a bad morning for the team. The expectations you set in week one are the same in week twenty.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-purple-400 font-semibold mb-1">3. Competence</p>
                    <p className="text-white/80 text-xs mb-2">Knowing your stuff. Making good decisions. Being able to solve technical problems and give sound guidance. Competence does not mean knowing everything &mdash; it means being honest about what you know and what you do not, and being resourceful enough to find answers.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">In practice:</strong> When the team hits a problem, you help find the solution. You do not pretend to know something you do not. You make well-reasoned decisions and explain your thinking. You are willing to say &ldquo;I do not know, but I will find out.&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold mb-1">4. Keeping Your Word</p>
                    <p className="text-white/80 text-xs mb-2">Doing what you say you will do, every time. If you promise to raise something with management, raise it. If you say you will look into a problem, look into it. If you commit to a deadline, meet it. Broken promises destroy trust faster than almost anything else.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">In practice:</strong> Never make promises you cannot keep. If you are not sure, say &ldquo;I will try&rdquo; not &ldquo;I will.&rdquo; If something changes and you cannot deliver what you promised, go back and explain why. Transparency protects trust.</p>
                  </div>
                </div>
              </div>

              <p>
                A critical distinction to understand is the difference between being <strong>firm</strong> and
                being <strong>aggressive</strong>. Firm leadership means holding clear standards, following
                through on expectations, and not backing down when challenged. Aggressive leadership means
                shouting, threatening, belittling, and using fear as a tool. The first builds respect. The
                second destroys it.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Firm vs. Aggressive &mdash; The Difference</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-green-400 font-semibold text-sm mb-2">Firm Leadership</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>&ldquo;The standard is 7:30 start. I need you here on time.&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>&ldquo;This workmanship is not acceptable. Let me show you what I expect.&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>&ldquo;I have made the decision and I am going to explain my reasoning.&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Calm, direct, respectful. Addresses the behaviour, not the person.</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-2">Aggressive Leadership</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>&ldquo;You are taking the mick. Sort it out or there will be consequences.&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>&ldquo;This is rubbish. What were you thinking?&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>&ldquo;I am the supervisor. Just do what I say.&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Raised voice, personal attacks, public humiliation, pulling rank.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Respect Test</p>
                </div>
                <p className="text-sm text-white/80">
                  Ask yourself this: if the team were talking about you when you were not there,
                  what would you want them to say? The answer should be something like: <strong className="text-white">&ldquo;He
                  is fair. He is tough when he needs to be, but he has got your back. You know where
                  you stand with him.&rdquo;</strong> Not &ldquo;He is a pushover&rdquo; and not
                  &ldquo;He is a tyrant.&rdquo; The middle ground &mdash; respected and fair &mdash;
                  is where effective leadership lives.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Building Your Support Network */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Building Your Support Network
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The mate-to-manager transition is not something you should try to navigate alone.
                Yet in construction, there is a deeply ingrained culture of <strong>&ldquo;just get
                on with it&rdquo;</strong> that discourages people from seeking help, admitting
                difficulty, or talking about the emotional challenges of leadership. This needs to
                change &mdash; and it starts with you building a deliberate support network.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Your Support Network &mdash; Four Key Sources</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold mb-1">1. Find a Mentor</p>
                    <p className="text-white/80 text-xs mb-2">A mentor is someone who has been through the mate-to-manager transition and can give you the benefit of their experience. They have made the mistakes you are about to make and can help you avoid the worst of them.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">How to find one:</strong> Look for experienced supervisors or managers in your company or on your site. Approach them informally: &ldquo;You have been doing this a while. Would you mind if I picked your brain occasionally?&rdquo; Most people are flattered to be asked. A good mentor does not tell you what to do &mdash; they help you think through your options.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-blue-400 font-semibold mb-1">2. Use Your Line Manager</p>
                    <p className="text-white/80 text-xs mb-2">Your line manager is there to support your development, not just to check your programme. Regular one-to-one meetings give you a structured opportunity to discuss challenges, seek guidance, and get feedback on how you are doing.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">What to discuss:</strong> Specific situations you are finding difficult. Decisions you are unsure about. Feedback you have received. Skills you want to develop. A good manager will help you think, not just direct you.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold mb-1">3. Connect with Other Supervisors</p>
                    <p className="text-white/80 text-xs mb-2">Other supervisors understand the unique pressures of the role in a way that nobody else can. They are navigating the same challenges, making the same difficult decisions, and dealing with the same isolation.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">How to connect:</strong> If you work for a larger company, there may be supervisor meetings or forums. If not, seek out supervisors on other sites, at industry events, or through professional networks. Even an informal WhatsApp group of people in similar roles can be enormously valuable.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold mb-1">4. Do Not Bottle Up Stress</p>
                    <p className="text-white/80 text-xs mb-2">Construction has one of the highest rates of mental health issues of any industry. The transition to management adds additional pressure. If you are struggling, talk to someone &mdash; a friend, a partner, a professional. Silence is not strength.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">Remember:</strong> Seeking support is not a sign of weakness. It is a sign of intelligence and self-awareness. The strongest leaders are the ones who know when they need help and have the courage to ask for it.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Breaking the Taboo</p>
                </div>
                <p className="text-sm text-white/80">
                  The construction industry has historically discouraged open discussion about leadership
                  challenges, emotional difficulty, and the personal toll of management. The expectation
                  has been to &ldquo;man up and get on with it.&rdquo; This attitude causes real harm.
                  New supervisors suffer in silence, make avoidable mistakes, and burn out. <strong className="text-white">By
                  building a support network and talking openly about the challenges you face, you are
                  not just helping yourself &mdash; you are helping to change the culture for everyone
                  who comes after you.</strong>
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Warning Signs You Need Support</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Dreading going to work</strong> &mdash; if you used to enjoy the job but now wake up with a knot in your stomach, that is a signal that something needs to change.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Making decisions to avoid conflict rather than because they are right</strong> &mdash; if you are choosing the easy path over the right path to avoid difficult conversations, you need support to build confidence.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Feeling like an imposter</strong> &mdash; if you constantly believe you are not good enough for the role and that people will find you out, talk to someone. Imposter syndrome is extremely common among new leaders.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Taking work stress home consistently</strong> &mdash; if you cannot switch off, cannot sleep, or are snapping at family members because of work pressure, that is a clear sign you need to talk to someone.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Feeling completely alone in the role</strong> &mdash; if you believe nobody understands what you are going through, you need to actively build connections with people who do.</span>
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
                The mate-to-manager transition is the single most challenging leadership transition
                you will face. It is not just a change of role &mdash; it is a change of identity,
                relationships, and the way you see yourself in the team. The key points to take
                forward are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Every relationship changes:</strong> The coworkers you confided in are now your direct reports. Expect this and prepare for it rather than hoping it will not happen.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Seven core challenges:</strong> Relationship recalibration, peer resentment, handling underperformance in friends, letting go of doing, perceived favouritism, loss of belonging, and confidentiality shift.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Boundaries from day one:</strong> Clear, explicit, applied equally. &ldquo;The same for everyone&rdquo; is your guiding principle. Do not wait for problems to set expectations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Respected and fair, not liked:</strong> Respect comes from fairness, consistency, competence, and keeping your word. Be firm when needed, supportive always.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Build your support network:</strong> Find a mentor, use your manager, connect with other supervisors. Do not try to do this alone and do not bottle up the stress.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">It gets easier:</strong> The first three to six months are the hardest. With consistent, fair leadership and a strong support network, you will find your footing and build a team that respects and trusts you.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Module 2, we move from the internal
                  challenges of becoming a leader to the external skills of <strong>Leading Your Team</strong>.
                  You will learn how to motivate, delegate, communicate, and manage performance &mdash; the
                  practical day-to-day skills that turn a new supervisor into an effective leader.
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
            <Link to="../leadership-module-1-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-2">
              Next: Leading Your Team
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
