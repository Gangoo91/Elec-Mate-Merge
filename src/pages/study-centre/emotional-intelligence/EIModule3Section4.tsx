import {
  ArrowLeft,
  ArrowRight,
  Handshake,
  CheckCircle,
  HelpCircle,
  Shield,
  Scale,
  AlertTriangle,
  Heart,
  Eye,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'trust-equation',
    question:
      'In the Trust Equation (Maister, Green, Galford), what is the denominator — the factor that reduces trust?',
    options: ['Credibility', 'Reliability', 'Intimacy', 'Self-Orientation'],
    correctIndex: 3,
    explanation:
      "The Trust Equation is: Trust = (Credibility + Reliability + Intimacy) / Self-Orientation. Self-Orientation is the denominator — the higher your self-orientation (the more you appear to be focused on your own interests rather than the other person's), the more it divides and reduces the total trust. Even high credibility, reliability, and intimacy cannot overcome the perception that you are primarily looking out for yourself.",
  },
  {
    id: 'ownership-vs-blame',
    question:
      'What is the key difference between a blame culture and an accountability culture on a construction site?',
    options: [
      'Blame culture is more efficient because problems are identified faster',
      'In a blame culture, the focus is on who is at fault; in an accountability culture, the focus is on what happened, why, and how to prevent recurrence',
      'Accountability culture means nobody is ever held responsible for mistakes',
      'There is no practical difference — both achieve the same safety outcomes',
    ],
    correctIndex: 1,
    explanation:
      "The critical distinction is the focus. A blame culture asks 'Who did this?' — which creates fear, hiding, and defensive behaviour. An accountability culture asks 'What happened, why did it happen, and how do we prevent it happening again?' — which creates learning, transparency, and continuous improvement. Accountability does not mean there are no consequences; it means the primary goal is learning and prevention rather than punishment.",
  },
  {
    id: 'brene-brown',
    question:
      "According to Brene Brown's research, what is the relationship between vulnerability and accountability?",
    options: [
      'Vulnerability is a weakness that undermines accountability',
      'Being accountable means never showing vulnerability',
      'Vulnerability is the courage to be honest about mistakes, which is the foundation of genuine accountability',
      'Vulnerability and accountability are unrelated concepts',
    ],
    correctIndex: 2,
    explanation:
      "Brene Brown's research demonstrates that vulnerability is not weakness — it is the courage to show up honestly, admit mistakes, ask for help, and take responsibility even when it is uncomfortable. This courage is the foundation of genuine accountability because true accountability requires the willingness to be seen clearly, including your failures. People who cannot be vulnerable cannot be truly accountable because they will always deflect, minimise, or hide their mistakes.",
  },
];

const faqs = [
  {
    question: 'If I admit mistakes, will people lose confidence in me?',
    answer:
      "Research consistently shows the opposite. When you admit a mistake quickly, honestly, and with a clear plan for resolution, people's confidence in you actually increases. This is because most people already know (or will find out) when something has gone wrong — the question is whether you address it proactively or try to hide it. Proactive honesty signals competence and integrity. Hiding mistakes signals untrustworthiness. Dr Brene Brown's research at the University of Houston found that leaders who demonstrate vulnerability through honest accountability are rated as more trustworthy and more competent by their teams, not less. In construction, admitting a mistake and fixing it is respected; being caught hiding one is career-damaging.",
  },
  {
    question: 'How do I hold others accountable without damaging the relationship?',
    answer:
      "The key is to separate the person from the behaviour. Focus on what happened (the specific action or outcome), not on who they are as a person. Use observations rather than judgements: 'I noticed the earthing was not connected on those circuits' rather than 'You are careless.' Be specific, be factual, and be direct — but also be private (never in front of others), be respectful, and be curious about context ('Was there something about the drawings that was unclear?'). Accountability delivered with respect builds trust; accountability delivered with contempt destroys it.",
  },
  {
    question: 'What if my workplace has a strong blame culture?',
    answer:
      "You cannot change an entire organisational culture single-handedly, but you can model a different approach within your sphere of influence. When you make a mistake, own it openly and focus on the solution rather than getting defensive. When others make mistakes, ask 'What can we learn from this?' rather than joining the blame. Over time, the people around you will notice and begin to mirror the behaviour. If the blame culture is severe enough to create safety risks (people hiding near-misses or errors), that is a serious concern that may need escalating. A culture where people are afraid to report problems is a culture where problems get worse.",
  },
  {
    question: 'Is it possible to rebuild trust once it has been broken?',
    answer:
      "Yes, but it takes time and consistent action. The Trust Equation provides the framework: you need to rebuild credibility (demonstrating competence), reliability (consistently delivering on promises), and intimacy (showing genuine care for the other person's interests), while reducing self-orientation (proving you are not just looking out for yourself). The most important factor in rebuilding trust is consistency — a single grand gesture will not do it. It is the accumulation of many small, reliable actions over time that rebuilds what was broken. Acknowledge what happened, take clear responsibility, communicate what you are doing differently, and then demonstrate it through sustained behaviour change.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What are the four components of the Trust Equation (Maister, Green, Galford)?',
    options: [
      'Competence, Consistency, Communication, Character',
      'Credibility, Reliability, Intimacy, Self-Orientation',
      'Honesty, Integrity, Openness, Commitment',
      'Skills, Experience, Reputation, Results',
    ],
    correctAnswer: 1,
    explanation:
      'The Trust Equation developed by David Maister, Charles Green, and Robert Galford consists of four components: Credibility (do they believe what you say?), Reliability (do they believe you will follow through?), Intimacy (do they feel safe sharing with you?), and Self-Orientation (do they believe you care about them, not just yourself?). Trust = (C + R + I) / S.',
  },
  {
    id: 2,
    question: 'In the Trust Equation, which element has the greatest mathematical impact on trust?',
    options: [
      'Credibility, because technical knowledge is the most important factor',
      'Reliability, because consistent delivery matters most',
      'Self-Orientation, because as the denominator it divides the entire numerator',
      'Intimacy, because relationships drive all business',
    ],
    correctAnswer: 2,
    explanation:
      "Self-Orientation has the greatest mathematical impact because it is the denominator — it divides the sum of the other three factors. Even if your credibility, reliability, and intimacy are all high (say 10 + 10 + 10 = 30), a high self-orientation of 10 gives a trust score of just 3. Reducing self-orientation to 1 gives a trust score of 30. This means that reducing self-orientation (showing you genuinely care about the other person's interests) has a disproportionately large effect on trust.",
  },
  {
    id: 3,
    question:
      'An electrician misreads a drawing and installs a section of containment in the wrong position. The most accountable response is:',
    options: [
      'Blame the architect for an unclear drawing',
      'Hope nobody notices and move on to the next section',
      'Acknowledge the error, inform the relevant parties, propose a solution, and take steps to prevent recurrence',
      'Wait for someone else to discover the issue and deal with it then',
    ],
    correctAnswer: 2,
    explanation:
      'True accountability involves four elements: acknowledge (own the error without deflection), inform (tell the relevant parties promptly), solve (propose and implement a solution), and prevent (identify what caused the mistake and put measures in place to stop it happening again). This response builds trust because it demonstrates integrity, transparency, and a commitment to quality. The other options all involve some form of avoidance, deflection, or concealment.',
  },
  {
    id: 4,
    question:
      "According to Brene Brown's research in 'Dare to Lead', vulnerability in the workplace is best described as:",
    options: [
      'A weakness that should be hidden to maintain professional credibility',
      'Sharing all personal problems and emotions with colleagues',
      'The courage to show up honestly, admit uncertainty, ask for help, and take responsibility for mistakes',
      'Only appropriate for managers and leaders, not for tradespeople',
    ],
    correctAnswer: 2,
    explanation:
      "Brown defines vulnerability as 'uncertainty, risk, and emotional exposure' — and she argues that it is the birthplace of courage, innovation, and genuine human connection. In the workplace, this means having the courage to say 'I made a mistake', 'I don't know', 'I need help', or 'I was wrong'. It is not about oversharing or being weak; it is about the strength required to be honest and transparent in a professional context.",
  },
  {
    id: 5,
    question: 'Why is honest near-miss reporting important for construction safety?',
    options: [
      'It helps management identify who to blame when accidents occur',
      'Near-misses are early warning signals — honest reporting allows hazards to be addressed before someone is injured',
      'It is a legal requirement with no practical safety benefit',
      'It only matters on large commercial projects, not domestic work',
    ],
    correctAnswer: 1,
    explanation:
      'Near-misses are free lessons — they reveal hazards, system failures, and risk patterns without anyone being injured. Research consistently shows that for every serious accident, there are hundreds of near-misses that could have provided early warning. Honest, blame-free reporting creates a feedback loop where hazards are identified and eliminated before they cause harm. A culture where near-misses are hidden (due to fear of blame) is a culture heading towards a serious accident.',
  },
  {
    id: 6,
    question:
      'What does consistency between words and actions mean in the context of professional trustworthiness?',
    options: [
      'Always agreeing with what others say',
      'Never changing your mind once you have made a decision',
      'Ensuring that your behaviour aligns with your stated values and commitments — doing what you say you will do',
      'Saying the same thing to every person regardless of context',
    ],
    correctAnswer: 2,
    explanation:
      'Consistency between words and actions — often called integrity — means that your behaviour matches your stated values and commitments. If you say quality matters, your work reflects it. If you promise something, you deliver it. If you set a standard, you meet it yourself before expecting it of others. This alignment is the foundation of trust because people learn to predict your behaviour based on your words, creating a sense of reliability and safety.',
  },
  {
    id: 7,
    question:
      'Which of the following best describes the difference between blame-free reporting and negligence?',
    options: [
      'There is no difference — blame-free reporting means nobody is ever held responsible',
      'Blame-free reporting means honest mistakes and system failures are treated as learning opportunities, while negligence (reckless disregard for safety) still carries consequences',
      'Blame-free reporting only applies to apprentices, not qualified electricians',
      'Negligence is not possible if a risk assessment has been completed',
    ],
    correctAnswer: 1,
    explanation:
      'Blame-free reporting applies to honest mistakes, unexpected system failures, and genuine near-misses — situations where someone was acting in good faith but something went wrong. Negligence, by contrast, involves reckless disregard for known safety requirements, deliberate shortcuts that endanger others, or repeated failure to follow established procedures. The distinction is crucial: blame-free reporting encourages transparency about honest errors (which improves safety for everyone), while still maintaining accountability for reckless or negligent behaviour.',
  },
  {
    id: 8,
    question:
      "Using the Trust Equation as a self-assessment tool, an electrician who consistently delivers excellent work but never remembers clients' names or personal details would score:",
    options: [
      'High on all four elements',
      'High on Credibility and Reliability, but low on Intimacy',
      'Low on Self-Orientation, which maximises overall trust',
      'High on Self-Orientation, which would reduce overall trust',
    ],
    correctAnswer: 1,
    explanation:
      "An electrician who delivers excellent work scores high on Credibility (they know their trade) and Reliability (they consistently deliver). However, if they never remember clients' names or personal details, their Intimacy score (the degree to which clients feel known and cared about as individuals) is low. This is a common pattern for technically excellent professionals — they are trusted to do the work, but the overall trust relationship is limited because the personal connection element is underdeveloped.",
  },
];

export default function EIModule3Section4() {
  useSEO({
    title: 'Accountability & Trustworthiness | EI Module 3.4',
    description:
      'The Trust Equation, ownership vs blame, consistency between words and actions, Brene Brown on vulnerability, and building trustworthiness in construction.',
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
            <Link to="../ei-module-3">
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
            <Handshake className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Accountability &amp; Trustworthiness
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding how trust is built and broken, taking ownership of your actions, and
            developing the integrity that defines a respected professional
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Framework:</strong> Trust = (Credibility + Reliability + Intimacy) /
                Self-Orientation
              </li>
              <li>
                <strong>Principle:</strong> Ownership of mistakes builds trust; blame destroys it
              </li>
              <li>
                <strong>Research:</strong> Brene Brown &mdash; vulnerability is courage, not
                weakness
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Career:</strong> Trust is the currency of construction &mdash; it determines
                who gets hired and rehired
              </li>
              <li>
                <strong>Safety:</strong> Blame-free reporting saves lives; hidden near-misses cost
                them
              </li>
              <li>
                <strong>Relationships:</strong> Integrity is the foundation of every professional
                relationship
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the Trust Equation and identify which elements are strongest and weakest in your professional practice',
              'Distinguish between accountability and blame culture using research evidence and construction examples',
              'Describe how consistency between words and actions builds or destroys trust over time',
              "Apply Brene Brown's research on vulnerability to professional accountability in construction",
              'Explain why honest near-miss reporting improves safety and distinguish it from negligence',
              'Use the Trust Equation as a self-assessment tool for continuous professional development',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Trust Equation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            The Trust Equation
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 2000, <strong>David Maister</strong>, <strong>Charles Green</strong>, and{' '}
                <strong>Robert Galford</strong> published <em>The Trusted Advisor</em>, in which
                they introduced one of the most practical and widely used frameworks for
                understanding trust: the <strong>Trust Equation</strong>.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg text-center">
                <p className="text-lg sm:text-xl font-bold text-rose-400 mb-3">
                  Trust = (Credibility + Reliability + Intimacy) / Self-Orientation
                </p>
                <p className="text-sm text-white">
                  The numerator (top) represents three factors that build trust. The denominator
                  (bottom) represents one factor that destroys it. The key insight: even high scores
                  on credibility, reliability, and intimacy are undermined by high self-orientation.
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      C
                    </span>
                    <p className="text-sm font-medium text-rose-400">Credibility (Words)</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Do people believe what you say? Credibility comes from demonstrated knowledge,
                    qualifications, track record, and the accuracy of your statements. When you say
                    something about electrical installations, regulations, or safety, do people
                    trust that you know what you are talking about?
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Construction example:</strong> An
                      electrician who consistently provides accurate technical advice, holds
                      relevant qualifications, and stays current with regulation changes has high
                      credibility. An electrician who frequently guesses, gets facts wrong, or
                      bluffs when they do not know has low credibility.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      R
                    </span>
                    <p className="text-sm font-medium text-rose-400">Reliability (Actions)</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Do people believe you will do what you say you will do? Reliability is
                    demonstrated through consistent follow-through on commitments. It is built over
                    time through repeated delivery and destroyed instantly by broken promises. In
                    construction, reliability is one of the most valued qualities because the entire
                    project depends on trades delivering on time and to specification.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Construction example:</strong> You say you
                      will be on site at 7:30am &mdash; you are there at 7:25am. You say the first
                      fix will be done by Friday &mdash; it is done by Thursday afternoon. You say
                      you will send the quote by Monday &mdash; it arrives on Monday morning. Each
                      delivered promise increases your reliability score.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      I
                    </span>
                    <p className="text-sm font-medium text-rose-400">Intimacy (Safety)</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Do people feel safe sharing with you? Intimacy in the Trust Equation is not
                    personal intimacy &mdash; it is the sense of emotional safety and discretion
                    that makes people willing to be open, honest, and vulnerable with you.
                    High-intimacy professionals are people you can confide in without fear of
                    judgement, gossip, or breach of confidence.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Construction example:</strong> An apprentice
                      feels comfortable telling you they are struggling with a personal issue
                      because they know you will listen without judgement and keep it confidential.
                      A client shares their real budget constraints because they trust you will not
                      exploit the information.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      S
                    </span>
                    <p className="text-sm font-medium text-rose-400">Self-Orientation (Focus)</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Are you focused on your own interests or the other person&rsquo;s? This is the
                    denominator &mdash; the trust destroyer. High self-orientation means people
                    perceive that you are primarily concerned with your own benefit, status, fee, or
                    convenience rather than their needs and interests. Because it is the
                    denominator, it has a disproportionately large effect: even high scores on the
                    other three factors cannot compensate for the perception that you are in it for
                    yourself.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Construction example:</strong> An
                      electrician who always upsells unnecessary work, never recommends a
                      cost-effective option, rushes through jobs to get to the next one, or talks
                      about themselves more than they listen to the client has high self-orientation
                      &mdash; and low trust, regardless of how technically competent they are.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Scale className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Mathematics of Trust: A Worked Example
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Consider two electricians, both rated out of 10 on each element:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-medium text-white mb-1">Electrician A</p>
                    <p className="text-xs text-white">
                      Credibility: 9 | Reliability: 8 | Intimacy: 4 | Self-Orientation: 8
                    </p>
                    <p className="text-xs text-white mt-1">
                      Trust = (9 + 8 + 4) / 8 = <strong className="text-red-400">2.6</strong>
                    </p>
                    <p className="text-xs text-white mt-1">
                      Technically excellent but clearly self-interested. Clients trust the work but
                      not the person.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-medium text-white mb-1">Electrician B</p>
                    <p className="text-xs text-white">
                      Credibility: 7 | Reliability: 8 | Intimacy: 7 | Self-Orientation: 2
                    </p>
                    <p className="text-xs text-white mt-1">
                      Trust = (7 + 8 + 7) / 2 = <strong className="text-green-400">11.0</strong>
                    </p>
                    <p className="text-xs text-white mt-1">
                      Good (not exceptional) technical skills but genuine care for clients. Clients
                      trust both the work and the person.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white mt-3">
                  Electrician B is the one who gets the repeat business, the referrals, and the
                  long-term relationships &mdash; despite being slightly less technically advanced.
                  The maths makes it clear: reducing self-orientation is the single most powerful
                  lever for building trust.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Ownership of Mistakes vs Blame */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Ownership of Mistakes vs Blame
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The way you respond when things go wrong reveals more about your character than how
                you behave when things go right. Everyone can be professional when the job is
                running smoothly. It is in the moments of failure, error, and difficulty that
                accountability is truly tested.
              </p>

              <p>
                There is a fundamental distinction between <strong>accountability</strong> and{' '}
                <strong>blame</strong>, and confusing the two creates toxic workplace cultures that
                damage safety, relationships, and performance.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                  <p className="text-xs font-medium text-red-400 mb-2">Blame Culture</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Asks: &ldquo;Who did this?&rdquo;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Focus is on punishment and fault-finding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>People hide mistakes, cover up errors, and deflect</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Problems repeat because root causes are not addressed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Trust erodes, morale drops, staff turnover increases</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                  <p className="text-xs font-medium text-green-400 mb-2">Accountability Culture</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>
                        Asks: &ldquo;What happened? Why? How do we prevent recurrence?&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Focus is on learning and prevention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>People report mistakes openly and promptly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Root causes are identified and systemic improvements made</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>
                        Trust builds, morale improves, continuous improvement becomes the norm
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    Construction Example: The Misread Drawing
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  You realise you have misread a drawing and installed distribution boards in the
                  wrong position on two floors. It is going to be costly and time-consuming to
                  rectify. Compare two responses:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-1">Blame Response</p>
                    <p className="text-sm text-white">
                      &ldquo;The drawing was unclear. The architect used different symbols to the
                      last job. Nobody told me about the revision. The site manager should have
                      checked before we started.&rdquo;
                    </p>
                    <p className="text-xs text-white mt-1">
                      Result: Others see deflection. Trust drops. The same mistake is likely to
                      happen again because the root cause (not checking revision status) has not
                      been addressed.
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-1">
                      Accountability Response
                    </p>
                    <p className="text-sm text-white">
                      &ldquo;I misread the drawing. I should have verified the revision before
                      starting. Here is my plan to rectify it, here is the cost and time impact, and
                      going forward I will implement a revision check on all drawings before
                      installation begins.&rdquo;
                    </p>
                    <p className="text-xs text-white mt-1">
                      Result: Others see integrity and professionalism. Trust increases. A new
                      process prevents recurrence.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Taking ownership is uncomfortable. It requires the courage to say &ldquo;I got this
                wrong&rdquo; when every instinct tells you to protect your ego. But the paradox of
                accountability is that admitting mistakes actually <em>increases</em> your
                professional standing, while hiding them <em>destroys</em> it &mdash; because the
                truth almost always comes out eventually, and how you handled it is what people
                remember.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Consistency Between Words and Actions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Consistency Between Words and Actions
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Integrity, at its core, means <strong>alignment</strong> &mdash; alignment between
                what you say and what you do, between what you believe and how you behave, between
                the standards you set and the standards you meet. When words and actions are
                aligned, trust grows naturally. When they are misaligned, trust collapses &mdash;
                and it collapses faster than almost any other form of trust breach because
                inconsistency between words and actions is perceived as hypocrisy.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Principle:</strong> People do not judge you
                  by your intentions. They judge you by your actions. You may intend to be reliable,
                  honest, and consistent, but if your behaviour does not match those intentions, it
                  is the behaviour that defines you in other people&rsquo;s eyes. The gap between
                  stated values and demonstrated behaviour is the space where trust goes to die.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Integrity Gaps in Construction
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>
                        Saying quality matters, then cutting corners when under time pressure:
                      </strong>{' '}
                      If you talk about quality but take shortcuts when it is inconvenient, people
                      learn that quality is conditional &mdash; and so is their trust in your work.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>
                        Demanding punctuality from others while arriving late yourself:
                      </strong>{' '}
                      Double standards are the fastest way to lose respect. Leaders, supervisors,
                      and experienced professionals are held to a higher standard, not a lower one.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Promising to call back and not doing it:</strong> A seemingly small
                      thing, but it is pure reliability erosion. Every broken promise &mdash; no
                      matter how minor &mdash; reduces the reliability component of the Trust
                      Equation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Talking about safety while not wearing PPE yourself:</strong> Nothing
                      undermines a safety culture faster than seeing the person who enforces the
                      rules ignoring them. Your actions set the standard, not your words.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>
                        Saying you value teamwork while taking credit for others&rsquo; work:
                      </strong>{' '}
                      This destroys intimacy (people stop trusting you with information) and
                      increases perceived self-orientation (you appear to be in it for yourself).
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Building integrity is not about being perfect &mdash; it is about being{' '}
                <strong>consistent</strong>. When your behaviour consistently matches your stated
                values, people learn to trust you because they can predict what you will do. This
                predictability is the foundation of professional trust. It does not mean you never
                make mistakes; it means that your overall pattern of behaviour aligns with your
                stated standards.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Integrity Test:</strong> Before making any
                  decision or taking any action, ask yourself: &ldquo;Is this consistent with what I
                  say I stand for?&rdquo; If the answer is no, reconsider. If the answer is
                  &ldquo;nobody will know&rdquo;, that is even more reason to act with integrity
                  &mdash; because integrity is not about what you do when people are watching. It is
                  about what you do when nobody is.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Brene Brown on Vulnerability and Accountability */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Brene Brown on Vulnerability and Accountability
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Dr Brene Brown</strong>, a research professor at the University of Houston,
                has spent over 20 years studying vulnerability, courage, empathy, and shame. Her
                research, compiled in books including <em>Daring Greatly</em> (2012) and{' '}
                <em>Dare to Lead</em> (2018), challenges one of the most deeply held assumptions in
                industries like construction: that vulnerability is weakness.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Brown&rsquo;s Definition of Vulnerability
                  </p>
                </div>
                <p className="text-sm text-white">
                  <em>
                    &ldquo;Vulnerability is not winning or losing; it is having the courage to show
                    up and be seen when we have no control over the outcome. Vulnerability is not
                    weakness; it is our greatest measure of courage.&rdquo;
                  </em>
                </p>
              </div>

              <p>In a workplace context, vulnerability means having the courage to:</p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Say &ldquo;I made a mistake&rdquo;</strong> &mdash; rather than
                      deflecting, minimising, or hiding the error
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Say &ldquo;I do not know&rdquo;</strong> &mdash; rather than bluffing
                      or guessing to appear competent
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Say &ldquo;I need help&rdquo;</strong> &mdash; rather than struggling
                      alone and potentially making things worse
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Say &ldquo;I was wrong&rdquo;</strong> &mdash; rather than doubling
                      down on a position you know is incorrect
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Say &ldquo;I am struggling&rdquo;</strong> &mdash; rather than
                      suppressing difficulties until they become crises
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Brown&rsquo;s research found that leaders who demonstrate vulnerability are rated as{' '}
                <strong>more trustworthy and more competent</strong> by their teams, not less. This
                is counterintuitive for many people, especially in industries like construction
                where the culture has traditionally equated emotional openness with weakness. But
                the data is clear: people trust those who are honest about their limitations far
                more than those who pretend to be infallible.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    Construction Example: Vulnerability in Practice
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  A qualified electrician with 15 years of experience is asked about a smart home
                  system they have not worked with before. Compare two responses:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-1">Avoidant Response</p>
                    <p className="text-sm text-white">
                      &ldquo;Yeah, I know that system. Leave it with me.&rdquo; (They then spend
                      hours trying to figure it out on site, make mistakes, and the client loses
                      confidence.)
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-1">Vulnerable Response</p>
                    <p className="text-sm text-white">
                      &ldquo;I have not worked with that specific system before. I am going to
                      review the documentation and contact the manufacturer before I give you a
                      quote, so I can make sure it is done right.&rdquo;
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white mt-3">
                  The vulnerable response is more honest, more professional, and builds more trust.
                  The client knows they are dealing with someone who will get it right rather than
                  someone who will wing it. Vulnerability, in this context, is a competitive
                  advantage.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Declaring Near-Misses Honestly */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Declaring Near-Misses Honestly
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A near-miss is an event that could have resulted in injury, damage, or harm but did
                not &mdash; this time. Near-misses are, by their nature, free lessons: they reveal
                hazards, system failures, and risk patterns without anyone being hurt. How an
                organisation handles near-miss reporting is one of the clearest indicators of its
                safety culture and, by extension, its culture of accountability and trust.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Heinrich&rsquo;s Triangle: The Iceberg of Incidents
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Safety research, originating with Herbert William Heinrich&rsquo;s 1931 study and
                  refined by subsequent researchers, shows a consistent ratio between incident
                  types:
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      For every <strong>1 serious accident</strong>, there are approximately{' '}
                      <strong>10 minor injuries</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      For every <strong>10 minor injuries</strong>, there are approximately{' '}
                      <strong>30 property damage incidents</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      For every <strong>30 property damage incidents</strong>, there are
                      approximately <strong>600 near-misses</strong>
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  This means that the 600 near-misses are <strong>early warning signals</strong>
                  &mdash; opportunities to identify and eliminate hazards before anyone is injured.
                  But they only serve this purpose if they are <strong>reported honestly</strong>.
                </p>
              </div>

              <p>
                The barrier to near-miss reporting is almost always <strong>fear of blame</strong>.
                If people believe that reporting a near-miss will result in punishment, criticism,
                or being labelled as careless, they will not report. This creates a deadly feedback
                loop: hazards go unidentified, risks accumulate, and eventually a serious accident
                occurs that could have been prevented.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Blame-Free Reporting vs Negligence: The Essential Distinction
                </p>
                <p className="text-sm text-white mb-3">
                  Blame-free reporting does not mean there are no consequences for anything. There
                  is a clear distinction:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-medium text-rose-400 mb-1">Blame-Free (Learning)</p>
                    <ul className="text-xs text-white space-y-1">
                      <li>Honest mistakes made in good faith</li>
                      <li>System failures and process gaps</li>
                      <li>Unexpected hazards not previously identified</li>
                      <li>Errors resulting from poor communication</li>
                      <li>Mistakes during training or skill development</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-1">
                      Accountable (Consequences)
                    </p>
                    <ul className="text-xs text-white space-y-1">
                      <li>Reckless disregard for known safety requirements</li>
                      <li>Deliberate shortcuts that endanger others</li>
                      <li>Repeated failure to follow established procedures</li>
                      <li>Working under the influence of drugs or alcohol</li>
                      <li>Intentional concealment of safety hazards</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Construction Example: Honest Near-Miss Reporting
                </p>
                <p className="text-sm text-white">
                  While working on a distribution board, you accidentally bridge live and neutral
                  momentarily with a tool, causing a brief flash. Nobody is injured and no damage is
                  done, but it could have been serious. In a blame culture, you would say nothing
                  and hope nobody noticed. In an accountability culture, you report it, identify the
                  cause (inadequate isolation, working too quickly, wrong tool selection), and help
                  implement a preventive measure (revised isolation procedure, tool check before
                  working live-adjacent). Your honest report may prevent a colleague from being
                  seriously injured by the same hazard next week. That is the power of blame-free
                  near-miss reporting &mdash; it transforms individual mistakes into collective
                  learning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Building Your Trustworthiness */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Building Your Trustworthiness
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Summary:</strong> Trust is not a single quality
                  &mdash; it is the cumulative result of consistent, accountable behaviour over
                  time. The Trust Equation gives you a practical framework for understanding and
                  developing each component. Accountability is the courage to own your actions.
                  Integrity is the alignment between your words and your behaviour. Vulnerability is
                  the strength to be honest about your limitations. Together, they create the kind
                  of professional reputation that earns long-term success.
                </p>
              </div>

              <p>
                The Trust Equation is not just a theoretical framework &mdash; it is a
                self-assessment tool that you can use regularly to evaluate and develop your
                professional trustworthiness.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Trust Equation Self-Assessment</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Rate yourself honestly out of 10 on each component. Then use the equation to
                  calculate your trust score. Identify your weakest area and focus your development
                  efforts there:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Low Credibility?</strong> Invest in training, stay current with
                      regulations, read guidance notes, attend CPD events, and stop guessing when
                      you do not know.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Low Reliability?</strong> Only make commitments you can keep. Under-
                      promise and over-deliver. Track your commitments and follow up on every one.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Low Intimacy?</strong> Listen more than you talk. Remember names and
                      personal details. Be discreet with confidential information. Show genuine
                      interest in others.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>High Self-Orientation?</strong> Ask more questions before making
                      recommendations. Offer options that serve the client&rsquo;s interest even
                      when a more expensive option would benefit you. Listen to understand, not just
                      to respond.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Your Accountability and Trust Toolkit
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>The Trust Equation:</strong> Trust = (Credibility + Reliability +
                      Intimacy) / Self-Orientation. Use it as a regular self-assessment tool.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Own Your Mistakes:</strong> Acknowledge, inform, solve, prevent. Every
                      owned mistake builds trust; every hidden one erodes it.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Align Words and Actions:</strong> Integrity is demonstrated daily
                      through consistency. Ask: &ldquo;Am I doing what I say I stand for?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Be Vulnerable:</strong> Have the courage to say &ldquo;I do not
                      know&rdquo;, &ldquo;I made a mistake&rdquo;, and &ldquo;I need help&rdquo;.
                      This is strength, not weakness.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Report Honestly:</strong> Near-misses are free lessons. Honest
                      reporting protects everyone. Blame-free culture saves lives.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Reduce Self-Orientation:</strong> The single most powerful lever for
                      building trust. Focus on others&rsquo; needs, not your own.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                This is the final section of Module 3: Self-Regulation. You have now covered the
                four pillars of self-regulation: managing your reactions, controlling your impulses,
                adapting to change, and building accountability and trustworthiness. Together, these
                skills give you the capacity to respond to any professional challenge with
                composure, integrity, and effectiveness.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Moving to Module 4:</strong> In the next module,
                  you will explore Motivation and Empathy &mdash; the internal drive that sustains
                  your professional development, and the ability to understand and connect with the
                  people around you. These are the competencies that transform technical skill into
                  genuine leadership and lasting career success. The self-regulation skills you have
                  developed in Module 3 provide the essential foundation for what comes next.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-rose-400" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
                <h3 className="text-sm font-medium text-rose-400 mb-2">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-4">
              Continue to Module 4
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
