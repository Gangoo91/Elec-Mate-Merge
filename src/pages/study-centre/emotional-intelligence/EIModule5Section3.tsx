import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Crown,
  Lightbulb,
  HelpCircle,
  Target,
  Users,
  Heart,
  BookOpen,
  Zap,
  Star,
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
      'According to Goleman, which four leadership styles typically create a POSITIVE emotional climate?',
    options: [
      'Visionary, Coaching, Democratic, Commanding',
      'Visionary, Coaching, Affiliative, Democratic',
      'Coaching, Affiliative, Pace-Setting, Commanding',
      'Visionary, Affiliative, Pace-Setting, Democratic',
    ],
    correctIndex: 1,
    explanation:
      "Goleman's research found that the Visionary, Coaching, Affiliative, and Democratic styles typically create a positive emotional climate. The Pace-Setting and Commanding styles, while useful in specific situations, tend to create a negative climate when overused because they rely on pressure and compliance rather than inspiration and empowerment.",
  },
  {
    question: 'What is the key difference between a resonant leader and a dissonant leader?',
    options: [
      'Resonant leaders are louder; dissonant leaders are quieter',
      "Resonant leaders are in tune with others' emotions and drive positive feelings; dissonant leaders are out of touch and create negativity",
      'Resonant leaders avoid conflict; dissonant leaders embrace it',
      'There is no meaningful difference — both terms describe the same thing',
    ],
    correctIndex: 1,
    explanation:
      'Resonant leaders are attuned to the emotions of those around them and create an emotional climate that drives positive feelings — hope, compassion, and inspiration. Dissonant leaders are out of touch with the emotional needs of their team and create toxic environments characterised by fear, anxiety, and resentment.',
  },
  {
    question: 'Servant leadership, as defined by Robert Greenleaf, begins with:',
    options: [
      'The desire to be in charge and give orders',
      'The natural feeling of wanting to serve first, which then leads to aspiring to lead',
      'A management qualification or formal appointment',
      'Being the most technically skilled person on the team',
    ],
    correctIndex: 1,
    explanation:
      'Greenleaf defined servant leadership as beginning with "the natural feeling that one wants to serve, to serve first. Then conscious choice brings one to aspire to lead." This inverts the traditional model where leadership comes first and service is a by-product. The servant leader\'s primary motivation is the growth and wellbeing of the people they lead.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Is there a real difference between leadership and management?',
    answer:
      'Yes, though the two overlap significantly. Management is about organising, planning, budgeting, and controlling — ensuring that things run smoothly and that targets are met. Leadership is about setting direction, inspiring people, and creating change. The key distinction in EI terms is that management can operate largely through systems and processes, while leadership operates primarily through emotions and relationships. A site manager who produces excellent Gantt charts but cannot motivate or inspire their team is a good manager but not necessarily a good leader. The most effective people in construction combine both — they manage the programme and the budget while simultaneously leading the people.',
  },
  {
    question: 'Is the commanding style always bad?',
    answer:
      'No — Goleman is clear that the commanding style has its place. In genuine emergencies, when immediate compliance is needed for safety, a direct "do this now" approach is not only appropriate but essential. The problem arises when commanding becomes the default style. A foreman who uses "do what I tell you" as their only approach will eventually drain motivation, stifle initiative, and drive good people away. The EI skill is reserving the commanding style for situations that genuinely require it and using the other five styles for everything else. Research shows that leaders who can access at least four of the six styles create significantly better climates than those who rely on only one or two.',
  },
  {
    question: 'How do I lead people who are much older or more experienced than me?',
    answer:
      'This is a common challenge for young supervisors and project managers in construction, and EI is the key to navigating it successfully. First, show genuine respect for their experience — ask for their input, acknowledge their expertise, and learn from them. Second, lead with competence in your own role — if you are a good planner, communicator, and problem-solver, experienced tradespeople will respect that even if you have fewer years on the tools. Third, use the Coaching and Democratic styles rather than Commanding — experienced workers respond well to being consulted and having their expertise valued, and poorly to being given orders by someone with less site experience. Fourth, be honest about what you do not know: "I have not done as many years as you on the tools, but I can see what needs to happen on the programme side. Let us work together."',
  },
  {
    question: 'Can I be a leader without being bossy?',
    answer:
      'Absolutely — in fact, the best leaders in construction are rarely "bossy". The Affiliative style (people come first), Coaching style (developing others), and Democratic style (involving people in decisions) are all highly effective leadership approaches that involve zero bossiness. Leadership through EI means influencing through trust, respect, and emotional intelligence rather than through authority, threats, or micromanagement. The foreman who earns loyalty through empathy, fairness, and genuine concern for the team will always outperform the one who rules through fear. As Goleman puts it, leadership is ultimately about the emotional impact you have on those you lead.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'Which of Goleman\'s six leadership styles is characterised by "come with me" and focuses on long-term vision and direction?',
    options: ['Coaching', 'Visionary', 'Affiliative', 'Democratic'],
    correctAnswer: 1,
    explanation:
      'The Visionary style (also called Authoritative) is characterised by "come with me". The leader articulates a compelling vision and inspires people to move toward it, while giving them freedom to choose their own route. It requires self-confidence, empathy, and the ability to act as a change catalyst.',
  },
  {
    id: 2,
    question: 'The Pace-Setting leadership style is most likely to create a negative climate when:',
    options: [
      'Used briefly to meet a critical deadline',
      'Used as the primary, default leadership approach over an extended period',
      'Combined with the Coaching style',
      'Applied to a highly motivated, self-directed team',
    ],
    correctAnswer: 1,
    explanation:
      'The Pace-Setting style ("do as I do, now") can be effective in short bursts with a highly competent, self-motivated team. However, when used as the default approach over time, it creates anxiety, exhaustion, and the feeling that nothing is ever good enough. Team members burn out trying to match the leader\'s relentless standards, and morale collapses.',
  },
  {
    id: 3,
    question: 'In Goleman, Boyatzis & McKee\'s "Primal Leadership", what does "primal" refer to?',
    options: [
      "The leader's primitive instincts",
      'The first and most fundamental job of leadership: driving the emotional climate',
      'Being the strongest or most dominant person in the group',
      "The leader's technical expertise",
    ],
    correctAnswer: 1,
    explanation:
      'The "primal" in "Primal Leadership" refers to the idea that the first and most fundamental act of leadership is emotional. Before any strategy, planning, or decision-making, the leader\'s most basic job is to drive the collective emotions in a positive direction. The emotional climate a leader creates has more impact on performance than the specific decisions they make.',
  },
  {
    id: 4,
    question: 'A servant leader in construction would most likely:',
    options: [
      'Do everything themselves rather than delegating',
      "Prioritise their team's development, remove obstacles, and protect them from unreasonable demands",
      'Avoid making decisions and defer to the team on everything',
      'Focus exclusively on their own career advancement',
    ],
    correctAnswer: 1,
    explanation:
      'Servant leadership means putting the needs, growth, and wellbeing of the team first. In construction, this looks like a project manager who shields the team from unnecessary client pressure, a foreman who ensures apprentices get proper training and support, or a supervisor who removes obstacles so the team can do their best work.',
  },
  {
    id: 5,
    question: 'What does it mean to "lead without a title"?',
    options: [
      'Pretending to be a manager when you are not',
      'Influencing through example, emotional tone, and relationships regardless of formal position',
      'Refusing to accept any formal leadership responsibility',
      'Only leading when your actual manager is not present',
    ],
    correctAnswer: 1,
    explanation:
      'Leading without a title means exercising leadership through your behaviour, attitude, and emotional impact rather than through formal authority. An experienced electrician who mentors apprentices, a team member who keeps morale up during tough weeks, or a colleague who always speaks up about safety issues — all of these are leadership acts that require no title or position.',
  },
  {
    id: 6,
    question:
      'Which leadership style is characterised by "what do you think?" and builds buy-in through participation?',
    options: ['Commanding', 'Pace-Setting', 'Democratic', 'Visionary'],
    correctAnswer: 2,
    explanation:
      'The Democratic style is characterised by "what do you think?" The leader builds consensus through participation, listens genuinely to input, and values collaboration. It is most effective when the leader is uncertain about the best direction and needs the team\'s expertise, or when buy-in is more important than speed.',
  },
  {
    id: 7,
    question: 'The concept of "emotional wake" in leadership refers to:',
    options: [
      'The morning meeting where leaders set the emotional tone for the day',
      'The lasting emotional impact a leader leaves behind after every interaction',
      'The process of waking up the team when they are disengaged',
      'A technique for emotional regulation before a difficult meeting',
    ],
    correctAnswer: 1,
    explanation:
      'The "emotional wake" is the trail of emotions a leader leaves behind after every interaction — positive or negative. Just as a boat leaves a wake in water, a leader leaves an emotional impression on everyone they interact with. A resonant leader leaves people feeling energised, valued, and motivated. A dissonant leader leaves people feeling drained, anxious, and undervalued.',
  },
  {
    id: 8,
    question: 'A leadership style flexer is someone who:',
    options: [
      'Changes their leadership style based on what is popular at the time',
      'Matches their leadership style to the specific situation, switching between styles as needed',
      'Has no consistent leadership identity and confuses their team',
      'Only uses the Commanding style but with varying intensity',
    ],
    correctAnswer: 1,
    explanation:
      "A leadership style flexer deliberately matches their approach to the specific situation, the needs of the team, and the demands of the moment. Goleman's research shows that leaders who can access at least four of the six styles — and switch fluidly between them — create the best emotional climates and achieve the highest performance outcomes.",
  },
];

export default function EIModule5Section3() {
  useSEO({
    title: 'Leadership Through Emotional Intelligence | EI Module 5.3',
    description:
      "Goleman's six leadership styles, resonant vs dissonant leadership, servant leadership through EI, leading without a title, and the leadership style flexer — with construction-specific examples.",
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
            <Crown className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Leadership Through Emotional Intelligence
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding how emotional intelligence transforms leadership effectiveness, from
            formal management roles to everyday influence on site
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Six styles:</strong> Goleman identified six EI-based leadership styles, four
                positive and two situational
              </li>
              <li>
                <strong>Resonant leadership:</strong> Leaders who are attuned to emotions create
                positive climates
              </li>
              <li>
                <strong>Servant leadership:</strong> Serving first, leading second &mdash; powered
                by empathy and EI
              </li>
              <li>
                <strong>No title needed:</strong> Leadership through EI is available at every level
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Climate matters:</strong> A leader&rsquo;s emotional impact accounts for up
                to 70% of workplace climate
              </li>
              <li>
                <strong>Retention:</strong> People leave managers, not companies &mdash; EI
                determines who stays
              </li>
              <li>
                <strong>Safety:</strong> Teams with emotionally intelligent leaders have fewer
                accidents
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe Goleman's six leadership styles and when each is most effective",
              'Distinguish between resonant and dissonant leadership using Goleman, Boyatzis & McKee',
              "Explain servant leadership through an EI lens using Greenleaf's framework",
              'Identify leadership opportunities that exist without a formal title or position',
              'Match leadership styles to specific construction scenarios using the flexer approach',
              'Give construction-specific examples of emotionally intelligent leadership at every level',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Goleman's Six Leadership Styles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Goleman&rsquo;s Six Leadership Styles
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In his landmark 2000 article in the <em>Harvard Business Review</em>, Daniel Goleman
                identified six distinct leadership styles, each rooted in different emotional
                intelligence competencies. Based on research with over 3,000 executives, Goleman
                found that the most effective leaders do not rely on a single style &mdash; they
                master multiple styles and switch fluidly between them based on the situation.
              </p>

              <p>
                Critically, Goleman&rsquo;s research showed that leadership style has a{' '}
                <strong>direct, measurable impact on workplace climate</strong>, and that climate
                accounts for up to 30% of financial performance. In construction terms, the way you
                lead does not just affect how people feel &mdash; it affects how safely they work,
                how efficiently they perform, and how likely they are to stay on your team.
              </p>

              <div className="space-y-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Visionary &mdash; &ldquo;Come with me&rdquo;
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    The visionary leader articulates a compelling long-term direction and inspires
                    people to move toward it, while giving them freedom to innovate and find their
                    own route. This style is most effective when a new direction is needed or when
                    the team needs a sense of purpose.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded mb-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">EI competencies required:</strong>{' '}
                      Self-confidence, empathy, acting as a change catalyst.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Construction example:</strong> A project
                      manager rallies the team at the start of a challenging hospital refurbishment:
                      &ldquo;This is a complex job, but when we are finished, this hospital will
                      serve patients for the next 30 years. Every cable we install, every board we
                      wire, contributes to that. Let us make it something we are proud of.&rdquo;
                    </p>
                  </div>
                  <p className="text-xs text-white mt-2">
                    <strong className="text-rose-400">Climate impact:</strong> Most strongly
                    positive
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Coaching &mdash; &ldquo;Try this&rdquo;
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    The coaching leader focuses on developing individuals for the future. They help
                    people identify their strengths and weaknesses, set development goals, and grow.
                    This style builds long-term capability and loyalty.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded mb-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">EI competencies required:</strong> Empathy,
                      emotional awareness, developing others.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Construction example:</strong> A qualified
                      electrician working with an apprentice on a complex DB installation:
                      &ldquo;You have got the main connections right. Now, try wiring the RCBO
                      circuit yourself &mdash; I will watch and give you feedback. If you get stuck,
                      I am right here.&rdquo;
                    </p>
                  </div>
                  <p className="text-xs text-white mt-2">
                    <strong className="text-rose-400">Climate impact:</strong> Highly positive
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Affiliative &mdash; &ldquo;People come first&rdquo;
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    The affiliative leader prioritises relationships, creates emotional bonds, and
                    focuses on harmony. This style is most effective when the team needs healing
                    after a setback, when trust needs to be rebuilt, or when morale is low.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded mb-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">EI competencies required:</strong> Empathy,
                      building relationships, communication.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Construction example:</strong> After a
                      colleague is seriously injured on site, the foreman gathers the team: &ldquo;I
                      know today has been tough for everyone. Dave is in hospital and he is being
                      looked after. I want to check in with each of you before we go home. Nobody
                      should feel they have to bottle this up.&rdquo;
                    </p>
                  </div>
                  <p className="text-xs text-white mt-2">
                    <strong className="text-rose-400">Climate impact:</strong> Positive
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Democratic &mdash; &ldquo;What do you think?&rdquo;
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    The democratic leader builds consensus through participation, genuine listening,
                    and shared decision-making. This style is most effective when the leader needs
                    input from the team, when buy-in is critical, or when the team has more
                    expertise than the leader in a specific area.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded mb-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">EI competencies required:</strong>{' '}
                      Collaboration, team leadership, communication.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Construction example:</strong> A supervisor
                      planning the second fix sequence: &ldquo;We have got three floors to get
                      through this week. I have got a plan, but some of you have worked this
                      building type before and I have not. What sequence do you think will work
                      best?&rdquo;
                    </p>
                  </div>
                  <p className="text-xs text-white mt-2">
                    <strong className="text-rose-400">Climate impact:</strong> Positive
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <p className="text-sm font-medium text-white">
                      Pace-Setting &mdash; &ldquo;Do as I do, now&rdquo;
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    The pace-setter sets extremely high performance standards and models them
                    personally. They expect others to match their pace and can become impatient with
                    those who do not. Effective in short bursts with a highly competent team, but
                    creates burnout and anxiety when overused.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded mb-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">EI competencies required:</strong>{' '}
                      Conscientiousness, drive to achieve, initiative.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Construction example:</strong> The final
                      push before handover &mdash; the foreman works alongside the team, matching
                      their output: &ldquo;Three more rooms to go. I will take Room 14, you take 15,
                      and we will all help with 16. Let us finish this today.&rdquo;
                    </p>
                  </div>
                  <p className="text-xs text-white mt-2">
                    <strong className="text-rose-400">Climate impact:</strong> Negative when
                    overused
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      6
                    </span>
                    <p className="text-sm font-medium text-white">
                      Commanding &mdash; &ldquo;Do what I tell you&rdquo;
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    The commanding leader demands immediate compliance. This style is effective only
                    in genuine crises, emergencies, or when dealing with problem employees after
                    other approaches have failed. Chronic use destroys morale, initiative, and
                    trust.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded mb-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">EI competencies required:</strong> Drive to
                      achieve, initiative, self-control.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Construction example:</strong> A fire alarm
                      during an active installation: &ldquo;Everyone down tools now. Leave your
                      equipment. Assembly point B. Move.&rdquo; No discussion needed; immediate
                      compliance required.
                    </p>
                  </div>
                  <p className="text-xs text-white mt-2">
                    <strong className="text-rose-400">Climate impact:</strong> Most negative when
                    overused
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Research Finding:</strong> Leaders who
                  mastered four or more styles &mdash; especially the Visionary, Coaching,
                  Affiliative, and Democratic styles &mdash; created the best workplace climates and
                  achieved the highest business results. The most effective leaders switch fluidly
                  between styles based on what the situation demands.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Resonant vs Dissonant Leadership */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Resonant vs Dissonant Leadership
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 2002, Goleman, along with Richard Boyatzis and Annie McKee, published{' '}
                <em>Primal Leadership: Realizing the Power of Emotional Intelligence</em>. The
                central argument of the book is that a leader&rsquo;s most fundamental job is not
                strategic, operational, or financial &mdash; it is <strong>emotional</strong>. The
                word &ldquo;primal&rdquo; in the title means &ldquo;first&rdquo; or &ldquo;most
                fundamental&rdquo;: before anything else, the leader&rsquo;s task is to drive the
                collective emotions in a positive direction.
              </p>

              <p>
                The authors distinguish between two types of leaders based on their emotional
                impact:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Resonant Leaders</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Resonant leaders are <strong>in tune</strong> with the emotions of those around
                    them. They create an emotional climate that drives positive feelings &mdash;
                    hope, compassion, excitement, and a sense of purpose.
                  </p>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>They sense what people are feeling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>They articulate shared values and purpose</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>They adapt their approach to the emotional needs of the moment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>They leave people feeling energised and valued</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Their teams are more engaged, creative, and loyal</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-white" />
                    <p className="text-sm font-medium text-white">Dissonant Leaders</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Dissonant leaders are <strong>out of touch</strong> with the emotions of those
                    around them. They create toxic emotional climates characterised by fear,
                    anxiety, resentment, and disengagement.
                  </p>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>They are oblivious to how people are feeling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>They focus only on tasks, never on people</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>They use the same approach regardless of the situation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>They leave people feeling drained and undervalued</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Their teams have higher turnover and more conflict</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                The concept of the <strong>emotional wake</strong> is central to this framework.
                Just as a boat leaves a wake in water that affects everything behind it, a leader
                leaves an emotional wake after every interaction. Every conversation, every meeting,
                every decision &mdash; each one leaves an emotional impression on the people
                involved. A resonant leader&rsquo;s wake is positive: people walk away feeling
                motivated, valued, and clear about their purpose. A dissonant leader&rsquo;s wake is
                negative: people walk away feeling anxious, frustrated, or demoralised.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Two Site Managers
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-white mb-2">Resonant Site Manager</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>Starts each day with a brief team check-in</li>
                      <li>Acknowledges good work publicly and specifically</li>
                      <li>Addresses problems calmly and constructively</li>
                      <li>Asks &ldquo;How are you doing?&rdquo; and means it</li>
                      <li>Adapts their approach to the individual</li>
                      <li>Team morale is high even during tough weeks</li>
                      <li>People volunteer for overtime and future projects</li>
                    </ul>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-white mb-2">Dissonant Site Manager</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>Communicates only through criticism and demands</li>
                      <li>Never acknowledges effort or achievement</li>
                      <li>Shouts when things go wrong</li>
                      <li>Shows no interest in people as individuals</li>
                      <li>Uses only the Commanding and Pace-Setting styles</li>
                      <li>Team dreads Monday mornings</li>
                      <li>High turnover; good people leave first</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                The powerful insight from <em>Primal Leadership</em> is that resonance is not a
                personality trait &mdash; it is a set of EI skills that can be developed. A leader
                who is currently dissonant can learn to become resonant by developing
                self-awareness, self-regulation, empathy, and social skills. This is not about
                changing who you are &mdash; it is about expanding your emotional repertoire so you
                can connect with and inspire the people you lead.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Servant Leadership Through an EI Lens */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Servant Leadership Through an EI Lens
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 1970, Robert Greenleaf, a retired AT&amp;T executive, published{' '}
                <em>The Servant as Leader</em>, an essay that challenged the fundamental assumption
                of traditional leadership. Rather than the leader sitting at the top of a pyramid
                and being served by those below, Greenleaf proposed that the most effective leaders
                are those who <strong>serve first and lead second</strong>.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Greenleaf&rsquo;s Definition:</strong>{' '}
                  <em>
                    &ldquo;The servant-leader is servant first. It begins with the natural feeling
                    that one wants to serve, to serve first. Then conscious choice brings one to
                    aspire to lead. The difference manifests itself in the care taken by the
                    servant-first to make sure that other people&rsquo;s highest priority needs are
                    being served.&rdquo;
                  </em>
                </p>
              </div>

              <p>
                Servant leadership and emotional intelligence are deeply intertwined. The core
                behaviours of a servant leader &mdash; listening, empathy, awareness, stewardship,
                and commitment to the growth of others &mdash; are all EI competencies. You cannot
                serve effectively without being emotionally intelligent, and you cannot be
                emotionally intelligent in a leadership role without some element of service.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Servant Leadership Behaviours and Their EI Roots
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Listening (EI: Empathy)</p>
                    <p className="text-sm text-white">
                      The servant leader listens deeply and receptively. Not just to words, but to
                      the feelings and needs behind them. On site, this means genuinely hearing an
                      apprentice&rsquo;s concerns rather than dismissing them, or understanding why
                      a team member is underperforming before jumping to conclusions.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Empathy (EI: Empathy)</p>
                    <p className="text-sm text-white">
                      The servant leader strives to understand and empathise with others. People
                      need to be accepted and recognised for their unique spirits. Assuming the best
                      about people, even when they make mistakes, creates an environment where
                      growth is possible.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      Stewardship (EI: Self-Awareness + Social Skill)
                    </p>
                    <p className="text-sm text-white">
                      Servant leaders see their role as stewards &mdash; holding their position in
                      trust for the greater good, not for personal benefit. In construction, this
                      means a foreman who protects the team&rsquo;s interests, advocates for their
                      welfare, and makes decisions that serve the project and the people, not just
                      their own reputation.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      Commitment to Growth (EI: Coaching + Motivation)
                    </p>
                    <p className="text-sm text-white">
                      The servant leader is deeply committed to the personal and professional growth
                      of every team member. They invest time in developing people, even when it
                      would be faster to do the work themselves. On site, this is the electrician
                      who takes the time to teach an apprentice properly rather than just getting
                      the job done.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Some people question whether servant leadership can work in the hierarchical,
                sometimes macho environment of construction. The answer is yes &mdash; but it
                requires courage. Servant leadership is not about being weak or letting people walk
                all over you. It is about being strong enough to put others first, to admit when you
                are wrong, and to prioritise the team&rsquo;s needs over your own ego. In fact, some
                of the most respected and effective leaders in construction are classic servant
                leaders, even if they have never heard the term.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Examples of Servant Leadership
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>The foreman who carries materials:</strong> When the team is under
                      pressure, the foreman rolls up their sleeves and helps shift cable drums
                      rather than sitting in the office. The message is: &ldquo;I am not above this
                      work.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>The PM who shields the team:</strong> A client is making unreasonable
                      demands for scope changes without additional time or money. The project
                      manager handles the difficult conversation with the client directly,
                      protecting the team from the stress and allowing them to focus on the work.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>The supervisor who ensures proper training:</strong> Rather than
                      throwing apprentices in at the deep end, the supervisor ensures each one
                      receives proper instruction, has opportunities to practise, and gets
                      constructive feedback on their progress.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Leading Without a Title */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Leading Without a Title
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most important insights in the EI literature is that{' '}
                <strong>leadership is not a position &mdash; it is a behaviour</strong>. You do not
                need to be a manager, supervisor, or foreman to exercise leadership. Every time you
                influence someone&rsquo;s behaviour, set an example that others follow, or
                contribute to the emotional tone of your team, you are leading.
              </p>

              <p>
                This is particularly relevant in construction, where formal hierarchies exist but
                informal influence is often what really drives day-to-day behaviour on site. The
                experienced electrician who everyone goes to for advice is a leader. The apprentice
                who keeps spirits up during a tough week is a leader. The colleague who always
                speaks up about safety, even when it is unpopular, is a leader.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">EI Leadership at Every Level</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">First-Year Apprentice</p>
                    <p className="text-sm text-white">
                      Leadership looks like: asking thoughtful questions that help the whole team
                      think; maintaining a positive attitude that lifts those around you; being
                      willing to do the unglamorous tasks without complaint; reporting hazards
                      promptly even when others ignore them.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      Qualified Electrician (3-10 Years)
                    </p>
                    <p className="text-sm text-white">
                      Leadership looks like: mentoring apprentices and new starters; setting
                      standards of workmanship that others aspire to; mediating disputes between
                      colleagues; influencing other trades through credibility and rapport; speaking
                      up when something is wrong.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      Experienced Electrician (10+ Years)
                    </p>
                    <p className="text-sm text-white">
                      Leadership looks like: being the calm presence when things go wrong; sharing
                      knowledge freely rather than hoarding it; supporting younger workers through
                      challenges; using your reputation and credibility to influence outcomes;
                      modelling the behaviour you want to see.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Any Level</p>
                    <p className="text-sm text-white">
                      Leadership looks like: checking in on a colleague who seems off; de-escalating
                      a tense situation; offering help without being asked; admitting your own
                      mistakes honestly; treating everyone with respect regardless of their role.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Insight:</strong> The emotional tone of a
                  construction team is not set solely by the foreman or site manager. It is a
                  collective product of everyone&rsquo;s emotional contributions. One person with
                  high EI can shift the entire team&rsquo;s atmosphere &mdash; for better or worse.
                  When you choose to be the person who stays calm, who listens, who encourages, who
                  raises concerns respectfully &mdash; you are leading, whether your job title says
                  so or not.
                </p>
              </div>

              <p>
                Leading without a title also means being willing to follow well. Emotionally
                intelligent followers support their leaders, provide honest feedback, challenge
                constructively when needed, and contribute positively to the team&rsquo;s emotional
                climate. Good followership is not passive or submissive &mdash; it is active,
                engaged, and essential.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: The Leadership Style Flexer */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            The Leadership Style Flexer
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The ultimate EI leadership skill is the ability to <strong>flex your style</strong>{' '}
                to match the situation. No single leadership style works everywhere, and the most
                effective leaders are those who can read the emotional needs of the moment and
                respond with the appropriate approach.
              </p>

              <p>
                Style-flexing requires all five domains of emotional intelligence: self-awareness
                (knowing your default style and when it is not working), self-regulation (overriding
                your default when necessary), motivation (committing to the effort of adapting),
                empathy (reading what the situation and the people need), and social skill
                (executing the chosen style effectively).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Situation &rarr; Style &rarr; EI Skills Needed
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">Safety Emergency</p>
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Style:</strong> Commanding.{' '}
                      <strong className="text-rose-400">EI:</strong> Self-control, decisiveness.
                      &ldquo;Stop. Everyone off that scaffold now. No discussion.&rdquo;
                    </p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">Coaching an Apprentice</p>
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Style:</strong> Coaching.{' '}
                      <strong className="text-rose-400">EI:</strong> Empathy, developing others,
                      patience. &ldquo;Try running the cable this way &mdash; I will watch and give
                      you feedback.&rdquo;
                    </p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">Team Decision on Sequence</p>
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Style:</strong> Democratic.{' '}
                      <strong className="text-rose-400">EI:</strong> Collaboration, active
                      listening, valuing diverse input. &ldquo;What order do you think we should
                      tackle these floors?&rdquo;
                    </p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">Tight Deadline Push</p>
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Style:</strong> Pace-Setting + Visionary.{' '}
                      <strong className="text-rose-400">EI:</strong> Drive, initiative, inspiration.
                      &ldquo;We can finish this today if we all push. I am going to start on the
                      ground floor &mdash; let us get it done.&rdquo;
                    </p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">
                      Team Morale Low After Setback
                    </p>
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Style:</strong> Affiliative.{' '}
                      <strong className="text-rose-400">EI:</strong> Empathy, building
                      relationships, emotional awareness. &ldquo;I know this week has been tough.
                      How is everyone doing?&rdquo;
                    </p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">Starting a New Project</p>
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Style:</strong> Visionary.{' '}
                      <strong className="text-rose-400">EI:</strong> Self-confidence, inspiration,
                      change catalyst. &ldquo;This is going to be a landmark building. Here is our
                      part in making it happen.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The key to effective style-flexing is <strong>practice and self-reflection</strong>.
                After challenging situations, ask yourself: &ldquo;Which style did I use? Was it the
                right one? What would have happened if I had used a different style?&rdquo; Over
                time, you will develop the intuition to read situations quickly and choose the most
                effective approach instinctively.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Common Trap:</strong> Many leaders in
                  construction default to the Commanding or Pace-Setting styles because that is what
                  was modelled for them. They grew up on sites where foremen shouted and led by
                  example through relentless effort. While both styles have their place, using them
                  exclusively creates a negative climate that drives away talent and reduces
                  performance. Expanding your repertoire to include Visionary, Coaching,
                  Affiliative, and Democratic styles is one of the highest-impact changes you can
                  make as a leader.
                </p>
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
                Leadership is not about authority &mdash; it is about influence. And influence is
                built on emotional intelligence. Whether you are a first-year apprentice or a
                30-year veteran, a labourer or a project director, you have the opportunity to lead
                through the emotional impact you have on those around you.
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
                      <strong>Goleman&rsquo;s six styles:</strong> Visionary, Coaching, Affiliative,
                      and Democratic create positive climates. Pace-Setting and Commanding are
                      useful situationally but damaging when overused.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Resonant leadership:</strong> The leader&rsquo;s most fundamental job
                      is driving the collective emotions in a positive direction. Every interaction
                      leaves an emotional wake.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Servant leadership:</strong> Serving first, leading second. EI is the
                      mechanism through which servant leadership operates.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>No title needed:</strong> Leadership is a behaviour, not a position.
                      You lead through example, influence, and emotional tone at every level.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Style flexing:</strong> The most effective leaders master multiple
                      styles and switch fluidly based on the situation. This is EI in its highest
                      application.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In the final section of this module &mdash; and the final content section of this
                course &mdash; you will create your personal EI development plan. You will take
                everything you have learned across all five modules and translate it into a
                concrete, actionable plan for continued growth. This is where the course moves from
                knowledge to action.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-5-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Conflict Management &amp; Teamwork
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-5-section-4">
              Your EI Development Plan
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
