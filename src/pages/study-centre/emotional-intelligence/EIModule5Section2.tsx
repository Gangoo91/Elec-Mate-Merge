import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Swords,
  Lightbulb,
  HelpCircle,
  Target,
  Users,
  Shield,
  AlertTriangle,
  BookOpen,
  Scale,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (placed between content sections)            */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    question:
      'In the Thomas-Kilmann model, which conflict mode involves high assertiveness AND high cooperativeness?',
    options: ['Competing', 'Avoiding', 'Compromising', 'Collaborating'],
    correctIndex: 3,
    explanation:
      "Collaborating is the only mode that is both highly assertive (you pursue your own concerns) and highly cooperative (you also pursue the other person's concerns). It seeks a win-win solution that fully satisfies both parties. Competing is high assertiveness but low cooperativeness. Accommodating is the opposite — high cooperativeness but low assertiveness.",
  },
  {
    question: 'According to Patrick Lencioni, what does "fear of conflict" lead to in a team?',
    options: [
      'Increased productivity due to fewer arguments',
      'Artificial harmony where real issues are never addressed',
      'Better decision-making because there is less noise',
      'Stronger team bonds because nobody disagrees',
    ],
    correctIndex: 1,
    explanation:
      "Lencioni identified fear of conflict as the second dysfunction in his model. When team members are afraid to disagree openly, the result is artificial harmony — a surface-level peace that masks unresolved issues. Problems fester, decisions are made without genuine debate, and the team's performance suffers because the best ideas never surface.",
  },
  {
    question:
      "Amy Edmondson's concept of psychological safety means that team members feel safe to:",
    options: [
      'Never be criticised for any reason',
      'Avoid all risk and challenge',
      'Take interpersonal risks such as admitting mistakes, asking questions, or raising concerns',
      'Do whatever they want without consequences',
    ],
    correctIndex: 2,
    explanation:
      'Psychological safety is the belief that you will not be punished, humiliated, or marginalised for speaking up with questions, concerns, mistakes, or ideas. It does not mean the absence of accountability or standards — it means the interpersonal environment is safe enough for people to be honest about problems and uncertainties.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Is it ever acceptable to simply avoid conflict?',
    answer:
      'Yes — the Thomas-Kilmann model recognises that avoiding is sometimes the right choice. Avoiding is appropriate when the issue is genuinely trivial and not worth the energy, when you need time to cool down before engaging constructively, when you have no power to change the outcome, or when the potential damage of engaging outweighs the benefits. The problem arises when avoiding becomes your default response to all conflict, because important issues never get addressed, resentment builds, and your needs are consistently unmet. The EI skill is distinguishing between strategic avoidance (choosing when to walk away) and habitual avoidance (never engaging because you fear conflict).',
  },
  {
    question: 'How do I deal with someone who is being genuinely aggressive on site?',
    answer:
      'Safety comes first. If someone is physically threatening or violent, remove yourself from the situation immediately and report it to the site manager. For verbal aggression — shouting, swearing, personal insults — the de-escalation techniques in this section apply: lower your own voice, use open body language, validate the emotion without accepting the behaviour ("I can see you are frustrated, and I want to resolve this, but I need you to stop shouting before we can talk"), and create space. Do not match their energy — that escalates. If they will not calm down, say clearly: "I am happy to discuss this when we can both talk calmly. I am going to walk away now and come back in twenty minutes." Always document aggressive incidents and report them through proper channels.',
  },
  {
    question: 'When should I escalate a conflict rather than trying to resolve it myself?',
    answer:
      'Escalation is appropriate when the conflict involves a safety risk that could harm someone, when there is a significant power imbalance (e.g., a manager bullying a subordinate), when you have tried to resolve it directly and the other person refuses to engage, when the dispute involves contractual or commercial matters that are above your pay grade, or when the behaviour crosses the line into harassment, discrimination, or bullying. Escalating is not a failure of EI — it is a recognition that some conflicts require someone with more authority, more neutrality, or more expertise to resolve fairly.',
  },
  {
    question: 'How do I handle conflict between two other people on my team?',
    answer:
      'If you are a supervisor, team leader, or simply a respected colleague, you can act as an informal mediator. The key principles are: remain neutral (do not take sides), listen to both perspectives separately first, then bring both parties together if appropriate. Focus on interests not positions — ask "What do you actually need?" rather than "Who is right?" Use the DESC model to help each person express their concerns respectfully. If the conflict is beyond your ability to resolve, escalate it to someone with more authority or bring in a formal mediation process. The worst thing you can do is ignore it and hope it goes away — unresolved conflict between team members poisons the entire team.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'In the Thomas-Kilmann model, which conflict mode is characterised by LOW assertiveness and LOW cooperativeness?',
    options: ['Competing', 'Accommodating', 'Avoiding', 'Collaborating'],
    correctAnswer: 2,
    explanation:
      "Avoiding is the conflict mode where you neither pursue your own concerns (low assertiveness) nor the other person's (low cooperativeness). You sidestep, postpone, or withdraw from the conflict entirely. While sometimes appropriate, chronic avoidance leaves important issues unresolved.",
  },
  {
    id: 2,
    question: 'Which of the following is the BEST example of the collaborating conflict mode?',
    options: [
      "Giving in to the other person's demands to keep the peace",
      "Both parties working together to find a creative solution that meets everyone's core needs",
      'Splitting the difference so neither party gets exactly what they wanted',
      'Refusing to discuss the issue until tempers have cooled',
    ],
    correctAnswer: 1,
    explanation:
      'Collaborating involves both parties working together to find a solution that fully satisfies both sets of needs. Unlike compromising (splitting the difference), collaborating seeks to expand the pie rather than divide it. It takes more time and requires high trust, but it produces the best outcomes and strengthens the relationship.',
  },
  {
    id: 3,
    question:
      "According to Lencioni's Five Dysfunctions of a Team, what is the foundation dysfunction that all others build upon?",
    options: [
      'Fear of conflict',
      'Lack of commitment',
      'Absence of trust',
      'Avoidance of accountability',
    ],
    correctAnswer: 2,
    explanation:
      'Absence of trust is the foundation of all five dysfunctions. Without trust, team members will not feel safe engaging in healthy conflict. Without healthy conflict, decisions lack genuine buy-in (lack of commitment). Without commitment, people will not hold each other accountable. Without accountability, results suffer (inattention to results).',
  },
  {
    id: 4,
    question:
      'Which de-escalation technique involves repeating the same calm request regardless of how the other person responds?',
    options: [
      'Active listening',
      'The broken record technique',
      'Validating emotions',
      'Creating physical space',
    ],
    correctAnswer: 1,
    explanation:
      'The broken record technique involves calmly and firmly repeating your position or request without getting drawn into arguments, justifications, or emotional escalation. For example: "I understand you are frustrated, but I need you to put your hard hat back on." Repeat calmly each time they push back, without adding new arguments or raising your voice.',
  },
  {
    id: 5,
    question:
      "Google's Project Aristotle found that the number one factor in high-performing teams was:",
    options: [
      'Having the smartest individuals',
      'Psychological safety',
      'Strong hierarchical leadership',
      'Working the longest hours',
    ],
    correctAnswer: 1,
    explanation:
      "Google's two-year study of 180 teams (Project Aristotle) found that psychological safety was by far the most important factor in team effectiveness, more important than team composition, individual talent, or any other variable. Teams where members felt safe to take risks and be vulnerable with each other consistently outperformed those where they did not.",
  },
  {
    id: 6,
    question:
      'What is the key principle of ACAS conflict resolution that distinguishes it from adversarial approaches?',
    options: [
      'Always escalating disputes to a tribunal',
      'Focusing on interests rather than positions',
      'Ensuring the more senior person always wins',
      'Avoiding all direct communication between parties',
    ],
    correctAnswer: 1,
    explanation:
      'ACAS emphasises focusing on underlying interests rather than stated positions. A position is what someone says they want; an interest is why they want it. Two people may have opposing positions but compatible interests. By understanding the "why" behind each person\'s demands, a mediator can often find solutions that satisfy both parties\' genuine needs.',
  },
  {
    id: 7,
    question: 'How does emotional intelligence contribute to psychological safety?',
    options: [
      'By ensuring nobody ever disagrees',
      'By helping leaders respond to vulnerability with respect rather than punishment',
      'By eliminating all negative emotions from the workplace',
      'By making sure everyone agrees with the manager',
    ],
    correctAnswer: 1,
    explanation:
      "Psychological safety is created when leaders and colleagues respond to vulnerability — mistakes, questions, concerns — with respect, curiosity, and support rather than blame, ridicule, or punishment. This requires empathy (understanding the other person's risk), self-regulation (managing your own frustration), and social skill (responding in a way that encourages future openness).",
  },
  {
    id: 8,
    question: 'Which conflict mode is most appropriate in an immediate safety situation on site?',
    options: [
      'Collaborating — work together to find a safe solution',
      'Compromising — meet the worker halfway',
      'Avoiding — ignore it until the situation changes',
      'Competing — assert your position firmly and immediately',
    ],
    correctAnswer: 3,
    explanation:
      'In an immediate safety situation, competing (asserting firmly) is the correct approach. When someone is about to step into a live zone or work without PPE, there is no time for collaboration, compromise, or discussion. You need to give a clear, direct instruction: "Stop. Put your gloves on now." Competing is rarely the ideal mode, but safety emergencies are the textbook appropriate use case.',
  },
];

export default function EIModule5Section2() {
  useSEO({
    title: 'Conflict Management & Teamwork | EI Module 5.2',
    description:
      "Thomas-Kilmann conflict model, Lencioni's fear of conflict, de-escalation techniques, psychological safety, and ACAS principles — with construction-specific examples and exercises.",
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
            <Link to="../ei-module-5">
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
            <Swords className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Conflict Management &amp; Teamwork
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding conflict styles, overcoming fear of healthy conflict, de-escalation,
            building psychological safety, and applying ACAS principles on site
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Thomas-Kilmann:</strong> Five conflict modes &mdash; competing,
                accommodating, avoiding, compromising, collaborating
              </li>
              <li>
                <strong>Lencioni:</strong> Fear of conflict creates artificial harmony and worse
                outcomes
              </li>
              <li>
                <strong>De-escalation:</strong> Lower voice, open body language, validate the
                emotion
              </li>
              <li>
                <strong>Psychological safety:</strong> The number one factor in high-performing
                teams
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Conflict is inevitable:</strong> How you handle it defines your professional
                reputation
              </li>
              <li>
                <strong>Safety:</strong> Psychologically safe teams have fewer accidents and
                near-misses
              </li>
              <li>
                <strong>Performance:</strong> Teams that engage in healthy conflict make better
                decisions
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Identify the five Thomas-Kilmann conflict modes and when each is appropriate',
              "Explain Lencioni's concept of fear of conflict and artificial harmony",
              'Apply at least three de-escalation techniques to a confrontational situation',
              "Define psychological safety using Edmondson's research and explain its impact",
              'Describe ACAS conflict resolution principles and apply them to site disputes',
              'Distinguish between healthy conflict and destructive conflict in a team setting',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Thomas-Kilmann Conflict Mode Instrument */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Thomas-Kilmann Conflict Mode Instrument
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 1974, Kenneth Thomas and Ralph Kilmann developed the{' '}
                <strong>Thomas-Kilmann Conflict Mode Instrument (TKI)</strong>, which has become the
                most widely used framework for understanding how people respond to conflict. The
                model maps conflict behaviour along two dimensions: <strong>assertiveness</strong>{' '}
                (the degree to which you pursue your own concerns) and{' '}
                <strong>cooperativeness</strong> (the degree to which you pursue the other
                person&rsquo;s concerns).
              </p>

              <p>
                These two dimensions create five distinct conflict-handling modes. No single mode is
                inherently &ldquo;right&rdquo; or &ldquo;wrong&rdquo; &mdash; each is appropriate in
                certain situations. The EI skill is recognising which mode you are using,
                understanding why, and being able to deliberately switch modes when the situation
                requires it.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">Competing</p>
                  </div>
                  <p className="text-xs text-white mb-1">High assertiveness, low cooperativeness</p>
                  <p className="text-sm text-white mb-2">
                    You pursue your own concerns at the other person&rsquo;s expense. Win-lose.
                    Power-oriented. Uses whatever authority or advantage you have.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">When appropriate:</strong> Safety
                      emergencies (&ldquo;Put your harness on now&rdquo;), when a quick decisive
                      action is needed, when you know you are right on a critical technical issue.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded mt-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Construction example:</strong> A worker is
                      about to work on a live circuit without isolation. You compete: &ldquo;Stop.
                      Isolate that board right now. This is non-negotiable.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">Accommodating</p>
                  </div>
                  <p className="text-xs text-white mb-1">Low assertiveness, high cooperativeness</p>
                  <p className="text-sm text-white mb-2">
                    You neglect your own concerns to satisfy the other person&rsquo;s. You yield,
                    give in, or go along with what they want.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">When appropriate:</strong> When the issue
                      matters much more to the other person than to you, when preserving the
                      relationship is more important than the specific outcome, when you realise you
                      are wrong.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded mt-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Construction example:</strong> A colleague
                      wants the radio on a different station. It does not matter much to you, so you
                      accommodate: &ldquo;No problem, put on whatever you like.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">Avoiding</p>
                  </div>
                  <p className="text-xs text-white mb-1">Low assertiveness, low cooperativeness</p>
                  <p className="text-sm text-white mb-2">
                    You neither pursue your own concerns nor the other person&rsquo;s. You sidestep,
                    postpone, or withdraw from the conflict entirely.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">When appropriate:</strong> When the issue is
                      trivial, when you need time to cool down, when you have no power to change the
                      outcome, when the potential damage of engaging outweighs the benefits.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded mt-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Construction example:</strong> A colleague
                      makes a sarcastic comment when they are clearly having a bad day. You choose
                      not to engage: you let it go rather than starting an argument.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm font-medium text-rose-400">Compromising</p>
                  </div>
                  <p className="text-xs text-white mb-1">
                    Moderate assertiveness, moderate cooperativeness
                  </p>
                  <p className="text-sm text-white mb-2">
                    You try to find a middle ground &mdash; a solution that partially satisfies both
                    parties. Each person gives up something.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">When appropriate:</strong> When time is
                      limited and a quick solution is needed, when both parties have equal power,
                      when collaboration has been tried and failed.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded mt-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Construction example:</strong> Two teams
                      clash over scheduling. The electrical team wants to start first fix on Monday;
                      the plumbers need the same zone. Compromise: electricians take the east wing
                      on Monday, plumbers take the west wing, and they swap on Wednesday.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <p className="text-sm font-medium text-rose-400">Collaborating</p>
                  </div>
                  <p className="text-xs text-white mb-1">
                    High assertiveness, high cooperativeness
                  </p>
                  <p className="text-sm text-white mb-2">
                    You work with the other person to find a creative solution that fully satisfies
                    both parties&rsquo; concerns. Win-win. Requires high trust and time.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">When appropriate:</strong> When the concerns
                      of both parties are too important to compromise, when you want to build a
                      long-term working relationship, when creative solutions are possible.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded mt-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Construction example:</strong> Cable routing
                      clashes with ductwork in a ceiling void. Instead of one trade giving way, both
                      teams sit down with the drawings, redesign the void layout together, and find
                      a solution that gives both trades their preferred route and reduces overall
                      installation time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The EI Connection:</strong> Most people have a
                  default conflict mode they revert to under stress. Some people always avoid;
                  others always compete. The emotionally intelligent response is to{' '}
                  <strong>choose your mode deliberately</strong> based on the situation, rather than
                  defaulting to the same mode every time. This requires self-awareness (recognising
                  your default), self-regulation (overriding the default when necessary), and
                  empathy (understanding what the situation and the other person need from you).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Fear of Conflict and Artificial Harmony */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Fear of Conflict and Artificial Harmony
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Patrick Lencioni, in his influential 2002 book{' '}
                <em>The Five Dysfunctions of a Team</em>, identified a hierarchy of team
                dysfunctions that cascade from a single foundation:{' '}
                <strong>absence of trust</strong>. The second dysfunction, built directly on that
                foundation, is <strong>fear of conflict</strong>.
              </p>

              <p>Lencioni&rsquo;s five dysfunctions, in order from the base to the top, are:</p>

              <div className="space-y-2">
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">1. Absence of Trust</strong> &mdash; Team
                    members are unwilling to be vulnerable with each other, which means they hide
                    mistakes, cover up weaknesses, and do not ask for help.
                  </p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">2. Fear of Conflict</strong> &mdash; Without
                    trust, team members avoid disagreement entirely. The result is{' '}
                    <strong>artificial harmony</strong>: a surface-level peace where everyone nods
                    along in meetings but complains in the car park afterwards.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">3. Lack of Commitment</strong> &mdash; Because
                    real issues were never debated, people do not genuinely buy into decisions. They
                    comply on the surface but do not commit.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">4. Avoidance of Accountability</strong>{' '}
                    &mdash; Without genuine commitment, team members do not hold each other
                    accountable for behaviours and performance.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">5. Inattention to Results</strong> &mdash;
                    Without accountability, individual egos and personal agendas take priority over
                    collective results.
                  </p>
                </div>
              </div>

              <p>
                The critical insight for construction teams is that{' '}
                <strong>
                  avoiding conflict does not prevent negative outcomes &mdash; it causes them
                </strong>
                . When team members are afraid to raise safety concerns because they do not want to
                be &ldquo;that person&rdquo;, accidents happen. When subcontractors do not challenge
                unrealistic programme timelines because they fear losing the contract, quality
                suffers and projects overrun. When apprentices do not ask questions because they are
                afraid of looking stupid, they make mistakes that could have been prevented.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: The Team That Avoids Raising Safety Concerns
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  A site team has a culture where challenging the foreman is frowned upon. Everyone
                  keeps their heads down and gets on with the work. One morning, an electrician
                  notices that a temporary supply board is not properly earthed, but says nothing
                  because &ldquo;it&rsquo;s not my job&rdquo; and &ldquo;nobody likes a
                  complainer&rdquo;.
                </p>
                <p className="text-sm text-white mb-3">
                  Later that week, a labourer receives an electric shock from that board. The
                  investigation reveals that at least three people noticed the issue but none of
                  them raised it. This is artificial harmony in its most dangerous form: the surface
                  looks calm, but underneath, known risks are being left unaddressed because the
                  team culture punishes people for speaking up.
                </p>
                <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">The healthy alternative:</strong> A team with
                    genuine trust and healthy conflict norms would have addressed this immediately.
                    Someone would have said: &ldquo;That board doesn&rsquo;t look right &mdash; has
                    anyone checked the earthing?&rdquo; And the response would have been &ldquo;Good
                    spot, let&rsquo;s check it now&rdquo; rather than &ldquo;Mind your own
                    business.&rdquo;
                  </p>
                </div>
              </div>

              <p>
                <strong>Healthy conflict</strong> is not shouting, personal attacks, or power
                struggles. It is passionate, unfiltered debate about ideas, plans, and decisions. It
                is people challenging each other&rsquo;s thinking because they care about the
                outcome. It is an apprentice saying &ldquo;I think there might be a better way to
                route this cable&rdquo; and being listened to rather than dismissed. Healthy
                conflict makes teams smarter, safer, and more effective.
              </p>

              <p>
                <strong>Destructive conflict</strong>, by contrast, is personal, disrespectful, and
                focused on winning rather than finding the best answer. It attacks people rather
                than ideas. It shuts others down rather than drawing them in. The EI skill is
                encouraging the first while preventing the second &mdash; and that requires the
                ability to disagree respectfully, listen actively, and manage your own emotional
                reactions.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: De-Escalation Techniques */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            De-Escalation Techniques
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When a conflict has already escalated &mdash; voices are raised, emotions are
                running high, and the conversation is heading toward a confrontation &mdash; you
                need de-escalation skills. De-escalation is the art of reducing emotional intensity
                in a situation so that rational conversation becomes possible again. It is one of
                the most valuable EI skills on a construction site, where tempers can flare quickly
                under pressure, fatigue, and the physical demands of the work.
              </p>

              <p>
                De-escalation draws on all four EI domains: self-awareness (recognising your own
                rising emotions), self-regulation (keeping yourself calm), empathy (understanding
                the other person&rsquo;s emotional state), and social skill (choosing the right
                words and actions to bring the temperature down).
              </p>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">Lower Your Voice</p>
                  </div>
                  <p className="text-sm text-white">
                    This is the single most effective de-escalation technique. When someone raises
                    their voice, the instinct is to match or exceed their volume. Resist this.
                    Instead, deliberately <strong>lower</strong> your voice. Speak slowly, calmly,
                    and at a lower pitch than normal. This has a powerful neurological effect: it
                    signals to the other person&rsquo;s amygdala that there is no threat, which
                    helps their fight-or-flight response begin to subside. People unconsciously
                    mirror the emotional tone of the person they are speaking to &mdash; so by
                    lowering your tone, you pull them down with you.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">Open Body Language</p>
                  </div>
                  <p className="text-sm text-white">
                    Uncross your arms. Keep your hands visible and relaxed (not clenched or
                    pointing). Turn your body slightly to the side rather than squaring up
                    face-to-face, which can feel confrontational. Maintain a calm, neutral facial
                    expression. Nod occasionally to show you are listening. Open body language
                    signals that you are not a threat and that you are receptive to what the other
                    person is saying.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Validate the Emotion Without Agreeing With the Position
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    This is a crucial distinction. Validating someone&rsquo;s emotion does not mean
                    agreeing with their position or accepting blame. It means acknowledging that
                    their feelings are real and understandable. &ldquo;I can see you&rsquo;re really
                    frustrated about this&rdquo; is validation. &ldquo;Yes, you&rsquo;re right,
                    it&rsquo;s all our fault&rdquo; is capitulation. The first one de-escalates; the
                    second one rewards aggressive behaviour. When people feel heard, the intensity
                    of their emotion reduces &mdash; this is the &ldquo;name it to tame it&rdquo;
                    principle from Module 2 applied to someone else&rsquo;s emotions.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Create Space (Physical and Temporal)
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    If tensions are very high, suggest a break. &ldquo;Let&rsquo;s take ten minutes
                    and come back to this with fresh heads.&rdquo; Physical separation gives the
                    amygdala time to calm down and the prefrontal cortex time to re-engage.
                    Sometimes the simple act of making a cup of tea creates enough of a pause for
                    emotions to settle. If the other person is in your personal space, take a step
                    back. Do not retreat dramatically &mdash; just create a comfortable distance.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <p className="text-sm font-medium text-rose-400">The Broken Record Technique</p>
                  </div>
                  <p className="text-sm text-white">
                    When someone is being persistently aggressive or trying to draw you into an
                    argument, the broken record technique is remarkably effective. Choose your key
                    message and repeat it calmly, without variation, regardless of what the other
                    person says. For example: &ldquo;I understand you&rsquo;re frustrated. I want to
                    help resolve this, but I need us to talk calmly.&rdquo; Repeat this exact
                    message each time they escalate. Do not add new arguments, justifications, or
                    counter-attacks. The repetition is calming because it demonstrates that you are
                    not going to be provoked, and it gives the other person a clear, consistent
                    message about what needs to happen next.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: De-Escalating a Confrontation Between Subcontractors
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Two subcontractor foremen are arguing loudly in the corridor about who has
                  priority access to a riser cupboard. Both teams are under programme pressure and
                  tempers have flared. You are the electrical supervisor.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Step 1:</strong> Approach calmly, lower your
                    voice. &ldquo;Lads, can I have a word with both of you?&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Step 2:</strong> Validate both. &ldquo;I can
                    see you&rsquo;re both under pressure to get your sections finished. I get
                    it.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Step 3:</strong> Create space.
                    &ldquo;Let&rsquo;s grab a tea and look at the programme together. Five minutes
                    away from the riser won&rsquo;t hurt either of us.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Step 4:</strong> Reframe as a shared problem.
                    &ldquo;We all need to get through this riser. Let&rsquo;s work out a schedule
                    that works for both teams rather than fighting over it every morning.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Psychological Safety */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Psychological Safety
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 1999, Amy Edmondson, a professor at Harvard Business School, published a
                groundbreaking paper defining <strong>psychological safety</strong> as &ldquo;a
                shared belief held by members of a team that the team is safe for interpersonal
                risk-taking.&rdquo; In simpler terms, it means feeling confident that you will not
                be punished, humiliated, or marginalised for speaking up with questions, concerns,
                mistakes, or ideas.
              </p>

              <p>
                This concept gained global attention in 2015 when Google published the results of{' '}
                <strong>Project Aristotle</strong>, their two-year study of what makes teams
                effective. After analysing 180 teams across the organisation, the researchers found
                that psychological safety was <strong>by far the most important factor</strong> in
                team performance &mdash; more important than team composition, individual talent,
                workload, or any other variable they measured.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">What Psychological Safety Is NOT:</strong>{' '}
                  Psychological safety does not mean lowering standards, avoiding accountability, or
                  pretending everything is fine when it is not. It does not mean people are never
                  challenged or that poor performance is tolerated. It means that the{' '}
                  <strong>interpersonal environment</strong> is safe enough for people to be honest
                  about problems, uncertainties, and mistakes without fear of personal
                  repercussions. In fact, psychologically safe teams hold each other to{' '}
                  <em>higher</em> standards because people feel safe enough to give and receive
                  honest feedback.
                </p>
              </div>

              <p>
                In construction, psychological safety has direct safety implications. Research by
                the Health and Safety Executive (HSE) and industry bodies consistently shows that
                sites with strong reporting cultures &mdash; where workers feel safe to report
                near-misses, hazards, and unsafe conditions &mdash; have significantly fewer serious
                accidents. Conversely, sites where workers are afraid to speak up have more
                incidents because known risks go unreported.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    How EI Creates Psychological Safety
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Self-Awareness in Leaders</p>
                    <p className="text-sm text-white">
                      Leaders who are self-aware recognise how their own behaviour affects others.
                      They notice when their frustration is shutting people down, and they adjust. A
                      foreman who notices apprentices have stopped asking questions asks himself:
                      &ldquo;Have I been dismissive? Have I made it seem like questions are
                      unwelcome?&rdquo;
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      Self-Regulation in Responses
                    </p>
                    <p className="text-sm text-white">
                      When someone reports a mistake or raises a concern, the leader&rsquo;s
                      immediate reaction sets the tone. If they respond with anger or blame, people
                      will never report again. If they respond with curiosity (&ldquo;Tell me what
                      happened&rdquo;) and appreciation (&ldquo;Thanks for flagging that &mdash;
                      better to catch it now&rdquo;), they reinforce the safety of speaking up.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Empathy in Understanding</p>
                    <p className="text-sm text-white">
                      Empathetic leaders understand that admitting a mistake or raising a concern
                      takes courage, especially in a hierarchical, macho-culture environment like
                      construction. They acknowledge this courage and make it easier for the next
                      person to speak up.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Social Skill in Modelling</p>
                    <p className="text-sm text-white">
                      The most powerful way to create psychological safety is to model vulnerability
                      yourself. A supervisor who says &ldquo;I made a mistake on the schedule
                      yesterday &mdash; here&rsquo;s what I&rsquo;ve done to fix it&rdquo; gives
                      everyone else permission to be honest about their own errors.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Examples of Psychological Safety in Action
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Reporting near-misses:</strong> An apprentice almost dropped a
                      distribution board from a scaffold. Instead of hiding it, they report it in
                      the toolbox talk. The supervisor thanks them and discusses how to prevent it
                      next time.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Admitting you do not know:</strong> A second-year apprentice is asked
                      to wire a three-phase motor. They have not done one before. Instead of
                      pretending and potentially making a dangerous mistake, they say: &ldquo;I have
                      not done one of these before &mdash; can you show me?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Asking for help:</strong> An experienced electrician is struggling
                      with a fault they cannot find. Rather than spending three hours in
                      frustration, they ask a colleague: &ldquo;Can you have a look at this? I have
                      been going round in circles for an hour.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Challenging a decision:</strong> A qualified electrician disagrees
                      with the foreman&rsquo;s cable sizing for a long run. They raise it
                      respectfully: &ldquo;I have run the calculation and I think we need to go up a
                      size on this run. Can we check it together?&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: ACAS Conflict Resolution Principles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            ACAS Conflict Resolution Principles
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Advisory, Conciliation and Arbitration Service (ACAS)</strong> is the
                UK&rsquo;s leading body for workplace dispute resolution. While ACAS is most
                commonly associated with employment tribunals and formal grievance procedures, their
                core principles are applicable to everyday conflict resolution on construction
                sites. Understanding these principles equips you with a professional, evidence-based
                framework for handling disputes at any level.
              </p>

              <div className="space-y-3">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Early Intervention</p>
                  </div>
                  <p className="text-sm text-white">
                    ACAS emphasises that conflicts should be addressed as early as possible, before
                    they escalate into formal grievances. The longer a dispute festers, the more
                    entrenched both parties become and the harder it is to resolve. On site, this
                    means addressing tensions when they are small &mdash; a quiet word after a
                    disagreement, a five-minute conversation at the end of the day &mdash; rather
                    than waiting until the situation becomes a full-blown confrontation.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Impartiality</p>
                  </div>
                  <p className="text-sm text-white">
                    When mediating a dispute, remain genuinely neutral. Do not take sides, do not
                    bring your own biases to the table, and do not pre-judge the outcome. Listen to
                    both perspectives fully before forming any view. On site, this is particularly
                    challenging if one of the parties is a friend or colleague you work closely with
                    &mdash; but impartiality is essential for a fair resolution and for maintaining
                    trust with both parties.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Focus on Interests, Not Positions
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    This is perhaps the most powerful ACAS principle. A <strong>position</strong> is
                    what someone says they want. An <strong>interest</strong> is why they want it.
                    Two people may have opposing positions but compatible interests. By moving the
                    conversation from positions to interests, solutions become possible that were
                    invisible when both parties were stuck on their demands.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Confidentiality and Respect</p>
                  </div>
                  <p className="text-sm text-white">
                    Discussions in mediation or conflict resolution should be confidential. What is
                    said in the room stays in the room. Both parties must be treated with respect
                    throughout the process, regardless of how the dispute began. On site, this means
                    not gossiping about the conflict with other workers and not publicly shaming
                    either party.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Resolving a Scope Dispute
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  A subcontractor claims that additional lighting in the car park was not in their
                  original scope and should be a variation. The main contractor insists it was
                  always included. Positions are entrenched: the subcontractor says
                  &ldquo;It&rsquo;s a variation, pay me extra&rdquo;; the main contractor says
                  &ldquo;It&rsquo;s in your contract, do the work.&rdquo;
                </p>
                <p className="text-sm text-white mb-2">
                  <strong className="text-rose-400">Applying ACAS principles:</strong>
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-white">
                    <strong>1. Interests behind the positions:</strong> The subcontractor&rsquo;s
                    interest is not to be out of pocket on work they did not price. The main
                    contractor&rsquo;s interest is to keep the project on budget and on programme.
                  </p>
                  <p className="text-sm text-white">
                    <strong>2. Potential resolution:</strong> Review the contract wording together
                    with both parties. If genuinely ambiguous, the main contractor acknowledges the
                    ambiguity and offers a fair rate for the additional work, while the
                    subcontractor agrees to prioritise it to avoid programme delay. Both interests
                    are met.
                  </p>
                  <p className="text-sm text-white">
                    <strong>3. Key EI skill:</strong> Both parties need to move from defending their
                    positions (ego-driven) to exploring their underlying interests
                    (solution-driven). This requires empathy from both sides and the willingness to
                    be vulnerable enough to say: &ldquo;What I actually need is...&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Key Takeaways */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Key Takeaways
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Conflict is inevitable in construction &mdash; multiple trades, tight programmes,
                budget pressure, and diverse personalities guarantee it. The question is never
                whether conflict will arise, but{' '}
                <strong>how you will handle it when it does</strong>. Your response to conflict
                defines your professional reputation more than almost any other single behaviour.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Takeaway</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Thomas-Kilmann:</strong> Five conflict modes (competing,
                      accommodating, avoiding, compromising, collaborating) &mdash; the EI skill is
                      choosing the right mode for the situation, not defaulting to the same one
                      every time.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Lencioni:</strong> Fear of conflict creates artificial harmony.
                      Healthy teams engage in passionate debate about ideas while maintaining
                      respect for people.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>De-escalation:</strong> Lower your voice, open body language, validate
                      the emotion (not the position), create space, and use the broken record
                      technique for persistent aggression.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Psychological safety:</strong> The number one factor in team
                      effectiveness (Google&rsquo;s Project Aristotle). Created by leaders who
                      respond to vulnerability with respect, not punishment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>ACAS principles:</strong> Early intervention, impartiality, focus on
                      interests not positions, confidentiality, and respect.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In the next section, we will explore how emotional intelligence applies to
                leadership &mdash; whether you hold a formal leadership title or not. The conflict
                management skills you have learned here are the foundation of effective leadership,
                because the ability to navigate disagreements, build trust, and create safe
                environments for your team is what separates managers from leaders.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <div className="flex items-start gap-2 mb-1">
                  <HelpCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <h3 className="text-sm font-medium text-white">{faq.question}</h3>
                </div>
                <p className="text-sm text-white leading-relaxed pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-5-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Communication &amp; Influence
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-5-section-3">
              Leadership Through EI
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
