import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Shield, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "trust-foundation",
    question: "According to Patrick Lencioni's 'The Five Dysfunctions of a Team', what is the foundational dysfunction that undermines everything else?",
    options: [
      "Fear of conflict between team members",
      "Absence of trust among the team",
      "Lack of commitment to shared goals",
      "Avoidance of accountability for results"
    ],
    correctIndex: 1,
    explanation: "Lencioni identifies absence of trust as the foundational dysfunction at the base of his pyramid. Without trust, team members will not engage in open conflict, commit to decisions, hold each other accountable, or focus on collective results. On a construction site, this means people will not speak up about hazards or admit mistakes if they do not trust their supervisor."
  },
  {
    id: "trust-equation",
    question: "In the Trust Equation from 'The Trusted Advisor' (Maister, Green, Galford), which factor sits in the denominator and REDUCES trustworthiness when it increases?",
    options: [
      "Credibility — your expertise and qualifications",
      "Reliability — whether you do what you say you will do",
      "Intimacy — the safety people feel sharing with you",
      "Self-Orientation — how much you focus on yourself vs others"
    ],
    correctIndex: 3,
    explanation: "The Trust Equation is (Credibility + Reliability + Intimacy) / Self-Orientation. Self-Orientation is the only factor in the denominator, meaning the more self-focused you are, the less trustworthy you appear. A supervisor who is visibly focused on their own career advancement rather than the welfare of their team will struggle to earn trust, no matter how skilled or reliable they are."
  },
  {
    id: "earned-respect",
    question: "What is the key difference between positional authority and earned respect?",
    options: [
      "Positional authority gets the best work from people; earned respect only gets compliance",
      "Earned respect requires a management qualification; positional authority does not",
      "Positional authority gets minimum compliance; earned respect gets people's best effort",
      "There is no meaningful difference — both produce the same results on site"
    ],
    correctIndex: 2,
    explanation: "Positional authority (your job title, your rank) can compel people to do the minimum required to avoid consequences. Earned respect — built through consistent actions, competence, fairness, and genuine care — motivates people to give their best effort, go the extra mile, and actively support the team's goals. The most effective site leaders combine both, but earned respect is far more powerful."
  }
];

const faqs = [
  {
    question: "I'm new to supervision and the team doesn't seem to respect me yet. What should I do?",
    answer: "This is completely normal and expected. Respect is not automatic — it must be earned through consistent actions over time. Focus on the basics: learn everyone's name, be visible on site (not hiding in the cabin), keep your promises even on small things, admit when you don't know something, and back your team when they need support. Avoid trying to assert authority through your title. The first 90 days are critical — under-promise and over-deliver. Most experienced tradespeople will give you a fair chance if you show competence, consistency, and genuine respect for their skills."
  },
  {
    question: "What if I've already damaged trust with my team? Can it be rebuilt?",
    answer: "Trust can be rebuilt, but it takes significantly longer than it took to build in the first place. The process requires genuine acknowledgement of what went wrong (not excuses), a clear commitment to change, and then sustained, visible action over time. You cannot simply apologise and expect things to reset. Every interaction becomes a test. Be prepared for scepticism — your team will be watching closely to see if the change is real. Consistency is everything. If you slip back into old behaviours even once, it can undo months of rebuilding. It is hard work, but it is possible."
  },
  {
    question: "How do I balance being approachable with maintaining authority?",
    answer: "This is one of the most common tensions new supervisors face. The key insight is that approachability and authority are not opposites — they reinforce each other. A supervisor who is approachable gets better information (people tell them about problems early), which leads to better decisions, which builds credibility and authority. Set clear boundaries and standards, be consistent in enforcing them, but be human in how you do it. You can be firm on standards while being kind to people. The supervisors who struggle most are those who try to be either everyone's best mate (losing authority) or a dictator (losing trust)."
  },
  {
    question: "Does servant leadership mean I should let my team do whatever they want?",
    answer: "Absolutely not. Servant leadership (Robert Greenleaf's concept) does not mean being passive or avoiding difficult decisions. It means that the primary purpose of leadership is to serve the needs of the team so they can do their best work. This includes providing clear direction, removing obstacles, ensuring they have the right tools and materials, developing their skills, and protecting them from unnecessary interference. It also means making tough calls when needed — including holding people accountable. The 'servant' part is about motivation and focus (serving others' growth), not about abdicating responsibility."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Patrick Lencioni identifies five dysfunctions of a team. Which dysfunction sits at the base of the pyramid, undermining all others?",
    options: [
      "Inattention to results",
      "Avoidance of accountability",
      "Absence of trust",
      "Fear of conflict"
    ],
    correctAnswer: 2,
    explanation: "Absence of trust is the foundational dysfunction in Lencioni's model. Without trust, teams cannot engage in healthy conflict, commit to decisions, hold each other accountable, or focus on collective results."
  },
  {
    id: 2,
    question: "The Trust Equation from 'The Trusted Advisor' is calculated as:",
    options: [
      "Credibility x Reliability x Intimacy x Self-Orientation",
      "(Credibility + Reliability + Intimacy) / Self-Orientation",
      "Self-Orientation / (Credibility + Reliability + Intimacy)",
      "(Credibility + Reliability) / (Intimacy + Self-Orientation)"
    ],
    correctAnswer: 1,
    explanation: "The Trust Equation is (Credibility + Reliability + Intimacy) / Self-Orientation. The three numerator factors increase trust, while self-orientation (the denominator) decreases it. A supervisor focused on their own interests rather than the team's will always struggle with trust."
  },
  {
    id: 3,
    question: "Which of the following behaviours is most likely to BUILD trust on site?",
    options: [
      "Telling the team you are in charge and expect full compliance",
      "Consistently doing what you say you will do, even on small things",
      "Always agreeing with the team to avoid any conflict",
      "Keeping information to yourself so people come to you for answers"
    ],
    correctAnswer: 1,
    explanation: "Consistency between words and actions is the single most powerful trust-builder. When a supervisor reliably follows through on commitments — even small ones like returning a borrowed tool or passing on a message — the team learns they can be depended upon. This reliability is a core component of the Trust Equation."
  },
  {
    id: 4,
    question: "Robert Greenleaf's concept of 'servant leadership' means:",
    options: [
      "The leader should do whatever the team asks",
      "The leader's primary role is to serve the team so they can do their best work",
      "The leader should avoid making difficult decisions",
      "The team should take turns being in charge"
    ],
    correctAnswer: 1,
    explanation: "Servant leadership means the leader's primary purpose is to serve the needs of their team — providing direction, removing obstacles, developing skills, and creating conditions for success. It does not mean being passive or avoiding accountability. A servant leader still makes tough calls but does so with the team's welfare as the primary focus."
  },
  {
    id: 5,
    question: "What is the key difference between positional authority and earned respect?",
    options: [
      "Positional authority produces better results than earned respect",
      "Earned respect is only possible after five or more years of experience",
      "Positional authority gets compliance; earned respect gets people's best effort",
      "There is no practical difference between the two"
    ],
    correctAnswer: 2,
    explanation: "Positional authority can compel minimum compliance — people do what they must to avoid consequences. Earned respect motivates people to give their best, take initiative, and actively support the team. The most effective leaders combine positional authority with earned respect."
  },
  {
    id: 6,
    question: "Which of the following is a common trust-destroyer on a construction site?",
    options: [
      "Admitting openly that you made a mistake",
      "Saying one thing to the team and doing another",
      "Asking the team for their input before making a decision",
      "Learning every team member's name in the first week"
    ],
    correctAnswer: 1,
    explanation: "Saying one thing and doing another — inconsistency between words and actions — is one of the fastest ways to destroy trust. If a supervisor promises something and fails to deliver, or says they value safety but cuts corners, the team quickly learns that the supervisor's words cannot be trusted."
  },
  {
    id: 7,
    question: "When building trust with a new team, the most critical period is typically:",
    options: [
      "The first day on site",
      "The first 90 days",
      "The first full year",
      "Trust cannot be built — people either like you or they don't"
    ],
    correctAnswer: 1,
    explanation: "The first 90 days are widely recognised as the critical window for establishing trust with a new team. Early actions set the tone for the entire working relationship. Being visible, learning names, keeping promises, and demonstrating competence during this period creates a strong foundation. First impressions are powerful and difficult to change later."
  },
  {
    id: 8,
    question: "A supervisor who 'leads from the front' on a construction site would typically:",
    options: [
      "Spend most of their time in the site cabin doing paperwork",
      "Help carry materials, work alongside the team, and be visible on site",
      "Stand at the site entrance checking people arrive on time",
      "Send instructions to the team via text message from the office"
    ],
    correctAnswer: 1,
    explanation: "Leading from the front means being visible, present, and willing to get your hands dirty alongside the team. A supervisor who helps carry materials, checks on progress in person, and demonstrates they are not above the physical work earns far more respect than one who remains in the cabin giving orders from a distance."
  }
];

export default function LeadershipModule2Section1() {
  useSEO({
    title: "Building Trust and Earning Respect | Leadership Module 2.1",
    description: "Why trust is the foundation of effective leadership on site, how to build and maintain trust, the difference between positional authority and earned respect, and servant leadership principles.",
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
            <Link to="../leadership-module-2">
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
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Building Trust and Earning Respect
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Why trust is the foundation of all effective leadership, how it is built and destroyed, and the difference between demanding compliance and earning genuine respect
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Foundation:</strong> Trust is the base of all team performance (Lencioni)</li>
              <li><strong>Equation:</strong> Credibility + Reliability + Intimacy / Self-Orientation</li>
              <li><strong>Key fact:</strong> Trust takes months to build, seconds to destroy</li>
              <li><strong>On site:</strong> Without trust, people won&rsquo;t report hazards or admit mistakes</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">For Site Leaders</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Earned respect:</strong> Gets people&rsquo;s best effort, not just compliance</li>
              <li><strong>Servant leadership:</strong> Your role is to serve the team, not the reverse</li>
              <li><strong>First 90 days:</strong> Critical window when trust is established or lost</li>
              <li><strong>Lead from front:</strong> Be visible, available, and willing to graft</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain why trust is the foundation of effective site leadership",
              "Describe the Trust Equation and apply it to workplace scenarios",
              "Distinguish between positional authority and earned respect",
              "Identify the key behaviours that build and destroy trust on site",
              "Explain the principles of servant leadership in a construction context",
              "Plan a trust-building approach for the critical first 90 days with a new team"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Trust Is the Foundation of Leadership */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Why Trust Is the Foundation of Leadership
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Without trust, nothing else in leadership works. You can have the best technical knowledge,
                the most efficient programme, and the clearest plans &mdash; but if your team does not trust
                you, none of it will translate into performance. Trust is not a &ldquo;soft skill&rdquo; or
                a nice-to-have. It is the <strong>operational foundation</strong> upon which every other
                leadership capability is built.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Lencioni&rsquo;s Five Dysfunctions of a Team</p>
                <p className="text-base text-white leading-relaxed">
                  Patrick Lencioni&rsquo;s influential model identifies <strong>absence of trust</strong> as
                  the foundational dysfunction &mdash; the base of a pyramid. Without trust, teams cannot engage
                  in productive conflict, commit to decisions, hold each other accountable, or focus on collective
                  results. Every dysfunction above depends on solving the one below it.
                </p>
              </div>

              <p>
                On a construction site, trust is directly linked to <strong>safety</strong>. If people do not
                trust their supervisor, they will not speak up about hazards they have spotted. They will not
                admit when they have made a mistake. They will not ask for help when they are unsure. They
                will not raise concerns about unrealistic timescales. Every one of these silences creates risk
                &mdash; risk of injury, risk of defective work, risk of costly rework.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Trust Enables on Site</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Open communication</strong> &mdash; people tell you problems early, before they become crises</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Safety reporting</strong> &mdash; near misses and hazards get flagged, not hidden</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Honest feedback</strong> &mdash; your team will tell you when a plan is not working</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Collaboration</strong> &mdash; people help each other rather than protecting their own patch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Discretionary effort</strong> &mdash; people go beyond the minimum because they want to, not because they have to</span>
                  </li>
                </ul>
              </div>

              <p>
                Research by Google&rsquo;s Project Aristotle &mdash; a major study into what makes teams
                effective &mdash; found that <strong>psychological safety</strong> (a concept closely related
                to trust) was the single most important factor in team performance. Teams where members felt
                safe to take risks and be vulnerable outperformed those with more talent but less trust.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Lencioni&rsquo;s Five Dysfunctions &mdash; The Pyramid</p>
                <div className="space-y-2 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium">5. Inattention to Results</p>
                    <p className="text-white/80 text-xs">Team members put individual goals (ego, career, recognition) ahead of collective outcomes.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium">4. Avoidance of Accountability</p>
                    <p className="text-white/80 text-xs">Team members do not hold each other to high standards or call out poor behaviour.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium">3. Lack of Commitment</p>
                    <p className="text-white/80 text-xs">Without genuine buy-in from healthy debate, people do not commit to decisions.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium">2. Fear of Conflict</p>
                    <p className="text-white/80 text-xs">Without trust, people avoid honest disagreement, leading to artificial harmony and poor decisions.</p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium">1. Absence of Trust &mdash; THE FOUNDATION</p>
                    <p className="text-white/80 text-xs">Without vulnerability-based trust, nothing above can function. This is where leaders must start.</p>
                  </div>
                </div>
              </div>

              <p>
                The message is clear: trust is not just one of many leadership priorities. It is
                <strong> the</strong> priority. Everything else &mdash; delegation, motivation, feedback,
                communication, performance management &mdash; depends on it. A team without trust is not
                really a team at all. It is a group of individuals who happen to be on the same site.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: How Trust Is Built */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            How Trust Is Built
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Trust is earned through <strong>consistent actions over time</strong>, not through words,
                announcements, or job titles. You cannot declare yourself trustworthy. You demonstrate it
                through hundreds of small interactions, day after day, until the pattern becomes clear to
                those around you.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">The Trust Equation (Maister, Green &amp; Galford)</p>
                <div className="bg-white/5 rounded-lg p-4 mb-3">
                  <p className="text-center text-lg font-bold text-white">
                    Trust = (Credibility + Reliability + Intimacy) / Self-Orientation
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">Credibility</p>
                    <p className="text-white/80 text-xs">Your expertise, qualifications, and knowledge. Do people believe you know what you are talking about? On site: do you understand the technical work, the regulations, the programme?</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">Reliability</p>
                    <p className="text-white/80 text-xs">Do you do what you say you will do? Consistently? On time? Every time? On site: if you promise materials will arrive Monday, do they? If you say you will raise an issue with the PM, do you?</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">Intimacy</p>
                    <p className="text-white/80 text-xs">How safe people feel sharing with you. Will you keep confidences? Can people be honest without fear? On site: can someone tell you they are struggling without it being held against them?</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">Self-Orientation (denominator)</p>
                    <p className="text-white/80 text-xs">How focused you are on yourself vs others. The MORE self-oriented you are, the LESS trustworthy you appear. On site: is the supervisor focused on their bonus, or on the team&rsquo;s success?</p>
                  </div>
                </div>
              </div>

              <p>
                The critical insight of the Trust Equation is that self-orientation sits in the
                <strong> denominator</strong>. Even if your credibility, reliability, and intimacy are all
                high, excessive self-focus will divide them all down. A supervisor who is clearly focused on
                their own career, their own comfort, or their own reputation will struggle to earn trust no
                matter how competent they are.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Trust-Building Behaviours on Site</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Keep promises</strong> &mdash; even small ones. If you say you will chase the materials order, chase it. Every kept promise is a deposit in the trust bank.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Be consistent</strong> &mdash; apply the same standards to everyone, including yourself. Nothing destroys trust faster than double standards.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Admit mistakes</strong> &mdash; saying &ldquo;I got that wrong&rdquo; shows strength, not weakness. It gives permission for others to be honest too.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Share credit</strong> &mdash; when the job goes well, credit the team publicly. Take the blame privately when things go wrong.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Back your team</strong> &mdash; defend your people when they are challenged unfairly. A supervisor who throws their team under the bus will never be trusted.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Be transparent</strong> &mdash; explain the reasons behind decisions. People do not need to agree with every decision, but they need to understand the reasoning.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Earned Respect vs Positional Authority */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Earned Respect vs Positional Authority
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                You can demand compliance, but you cannot demand respect. This is one of the most important
                distinctions in leadership. <strong>Positional authority</strong> &mdash; the power that comes
                from your job title &mdash; can get people to do the minimum. <strong>Earned respect</strong>
                gets people to give their best.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-2">Positional Authority</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Comes from your job title and organisational chart</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Gets minimum compliance &mdash; people do what they must</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Works through fear of consequences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Disappears the moment you leave the room</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-green-400 font-semibold text-sm mb-2">Earned Respect</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Comes from consistent actions, competence, and fairness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Gets discretionary effort &mdash; people give their best</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Works through genuine influence and admiration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Continues whether you are present or not</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                On a construction site, the difference is stark. Consider two supervisors: one who sits in
                the cabin issuing instructions, never picks up a tool, and pulls rank when challenged. The
                other who is on the tools alongside the team when needed, helps carry materials without being
                asked, knows every person&rsquo;s name, and earns the right to lead through visible competence
                and fairness. Which one will the team follow when things get difficult?
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">Servant Leadership (Robert Greenleaf)</p>
                </div>
                <p className="text-sm text-white/80">
                  Robert Greenleaf introduced the concept of <strong className="text-white">servant
                  leadership</strong> in 1970. The core idea: the leader&rsquo;s primary role is to serve the
                  team, not the other way around. A servant leader asks: &ldquo;What do my people need from
                  me to do their best work?&rdquo; This might mean clearing obstacles, fighting for resources,
                  protecting the team from unnecessary interference, or simply ensuring welfare facilities are
                  adequate. It is not about being passive &mdash; it is about placing the team&rsquo;s needs
                  above your own ego.
                </p>
              </div>

              <p>
                The most effective site leaders combine positional authority with earned respect. They use
                their formal authority when necessary (safety decisions, programme commitments, quality
                standards), but they lead primarily through the respect they have earned from their team. This
                combination creates leaders who can both <strong>direct</strong> when urgency demands it and
                <strong> inspire</strong> when sustained effort is needed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Construction Site Reality Check</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>The cabin supervisor</strong> &mdash; sits in the office, sends instructions via radio, pulls rank when questioned, never gets their hands dirty. The team do exactly what is asked and not a fraction more.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>The front-line leader</strong> &mdash; walks the job every morning, helps move cable drums without being asked, knows every person by name, explains the &ldquo;why&rdquo; behind decisions, fights for proper materials. The team would run through walls for them.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>The difference</strong> &mdash; both supervisors have the same positional authority (same title, same organisational chart). The difference is entirely in earned respect. The second supervisor gets 40% more productive output from the same team, with fewer defects and zero safety incidents.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: What Destroys Trust — And How Quickly */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            What Destroys Trust &mdash; And How Quickly
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Trust takes months to build and <strong>seconds to destroy</strong>. A single act of
                dishonesty, betrayal, or inconsistency can undo months of careful trust-building. This
                asymmetry is one of the most important things to understand about trust &mdash; it is far
                easier to lose than it is to earn.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">Common Trust-Destroyers on Site</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">Saying One Thing, Doing Another</p>
                    <p className="text-white/80 text-xs">The single biggest trust-destroyer. If you promise something and do not deliver, if you say you value safety but cut corners, if you claim to be fair but play favourites &mdash; people notice every time.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">Playing Favourites</p>
                    <p className="text-white/80 text-xs">Giving better tasks, overlooking mistakes, or offering overtime selectively based on personal preference rather than fairness. The rest of the team will see it immediately and resent it deeply.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">Taking Credit for Others&rsquo; Work</p>
                    <p className="text-white/80 text-xs">Presenting the team&rsquo;s achievements as your own to senior management. This gets back to the team very quickly and destroys any goodwill you had built.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">Breaking Confidences</p>
                    <p className="text-white/80 text-xs">If someone tells you something in confidence and you share it, you will never be trusted with sensitive information again. On site, this could involve personal issues, health concerns, or honest feedback.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">Undermining People Behind Their Backs</p>
                    <p className="text-white/80 text-xs">Criticising team members to others when they are not present. If you talk about people behind their backs, everyone assumes you do the same about them.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">Inconsistent Standards</p>
                    <p className="text-white/80 text-xs">Enforcing rules strictly one day and ignoring them the next. Applying different standards to different people. People need to know where they stand.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Rebuilding Broken Trust</p>
                </div>
                <p className="text-sm text-white/80">
                  Once trust is broken, rebuilding it requires <strong className="text-white">sustained,
                  visible change over time</strong>. A simple apology is not enough. The person or team must
                  see a consistent pattern of new behaviour before they will begin to trust again. This can
                  take months or even years. Some breaches of trust are so severe that recovery is not possible
                  &mdash; a new start with a different team may be the only option.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Building Trust in a New Team */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Building Trust in a New Team
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Starting with a new team is one of the most challenging situations in leadership. Nobody
                knows you. They do not know if you are competent, fair, or reliable. They may have had bad
                experiences with previous supervisors. First impressions matter enormously, and the
                <strong> first 90 days</strong> are widely recognised as the critical window for
                establishing trust.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The First 90 Days &mdash; Trust-Building Actions</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Be visible</strong> &mdash; spend your time on the work face, not in the cabin. Be where the work is happening. Walk the site every morning.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Be available</strong> &mdash; make it clear that your door (or hard hat) is always open. Respond to requests promptly. Do not make people wait unnecessarily.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Learn names</strong> &mdash; this sounds basic but it is surprisingly powerful. Learning everyone&rsquo;s name within the first week shows you see them as individuals, not just labour.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Understand strengths</strong> &mdash; take time to learn what each person is good at, what they enjoy, what they want to develop. This shows genuine interest and helps with delegation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Under-promise, over-deliver</strong> &mdash; do not make grand promises you cannot keep. Promise less, then deliver more. Each small exceeded expectation builds trust.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Listen before you change</strong> &mdash; resist the urge to change everything in week one. Understand how things work first. The team may be doing things for good reasons you do not yet know.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Early Actions Set the Tone</p>
                </div>
                <p className="text-sm text-white/80">
                  Your earliest actions as a new leader are watched more closely than anything you will do
                  later. If your first act is to crack down on timekeeping, the team learns you are a
                  clock-watcher. If your first act is to sort out the welfare facilities, the team learns you
                  care about their wellbeing. If your first act is to ask for their input, the team learns
                  you value their experience. <strong className="text-white">Choose your early actions
                  deliberately</strong> &mdash; they send a message about who you are.
                </p>
              </div>

              <p>
                Do not expect instant trust. Experienced tradespeople have often seen supervisors come and
                go, and many have been let down before. They will give you a fair chance, but they will be
                watching. Consistency is what converts initial scepticism into genuine trust. It is not about
                one big gesture &mdash; it is about dozens of small, consistent actions that demonstrate who
                you really are.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Mistakes in the First 90 Days</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Changing everything immediately</strong> &mdash; coming in and overhauling processes before understanding why they exist. The team feels their experience is being dismissed.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Pulling rank</strong> &mdash; using your title to win arguments. &ldquo;Because I said so&rdquo; might work once, but it destroys trust permanently.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Making promises you cannot keep</strong> &mdash; over-promising on pay, overtime, or conditions and then failing to deliver. Better to say &ldquo;I will look into it&rdquo; than to promise something you cannot control.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Being invisible</strong> &mdash; spending all your time in meetings, on the phone, or in the cabin. If your team does not see you, they cannot trust you.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Trying to be everyone&rsquo;s mate</strong> &mdash; being overly friendly to gain approval, rather than earning respect through competence and fairness. The team can tell the difference.</span>
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
                This section has explored why trust is the non-negotiable foundation of effective site
                leadership, how it is built and destroyed, and the critical distinction between positional
                authority and earned respect. The key points to remember are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Trust is foundational:</strong> Without trust, teams cannot function effectively &mdash; Lencioni places it at the base of all team performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>The Trust Equation:</strong> (Credibility + Reliability + Intimacy) / Self-Orientation &mdash; self-focus is the biggest trust-reducer</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Earned respect beats positional authority:</strong> Compliance gets the minimum; respect gets people&rsquo;s best</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Servant leadership:</strong> The leader&rsquo;s role is to serve the team&rsquo;s needs so they can do their best work</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Trust is fragile:</strong> It takes months to build and seconds to destroy &mdash; consistency is everything</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>First 90 days:</strong> Be visible, learn names, keep promises, listen first, and under-promise and over-deliver</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Next:</strong> In Section 2, we will examine
                  <strong> Delegating Effectively</strong> &mdash; the Skill-Will Matrix, the Seven Levels
                  of Delegation, SMART delegation, and the most common delegation mistakes that new
                  supervisors make.
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
            <Link to="../leadership-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-2-section-2">
              Next: Delegating Effectively
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
