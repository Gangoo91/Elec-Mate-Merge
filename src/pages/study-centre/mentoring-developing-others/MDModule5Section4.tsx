import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Lightbulb,
  HelpCircle,
  Target,
  Users,
  BookOpen,
  RefreshCw,
  Award,
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
      "In Kolb's experiential learning cycle, what are the four stages in the correct order?",
    options: [
      'Plan, Do, Check, Act',
      'Concrete Experience, Reflective Observation, Abstract Conceptualisation, Active Experimentation',
      'Unconscious Incompetence, Conscious Incompetence, Conscious Competence, Unconscious Competence',
      'Forming, Storming, Norming, Performing',
    ],
    correctIndex: 1,
    explanation:
      "Kolb's experiential learning cycle (1984) has four stages: Concrete Experience (something happens), Reflective Observation (you think about what happened), Abstract Conceptualisation (you draw conclusions and form theories), and Active Experimentation (you try a new approach based on what you learned). Applied to mentoring, this means: you have a mentoring experience, you reflect on it, you identify what you would do differently, and you try the new approach next time.",
  },
  {
    question:
      'A mentor asks their apprentice: "How am I doing as your mentor? Is there anything I could do differently to help you learn better?" This is an example of:',
    options: [
      'A sign of weakness — mentors should not ask for feedback from learners',
      'Good practice — seeking feedback from the mentee is one of the most valuable sources of information about your mentoring effectiveness',
      'Inappropriate — it puts the apprentice in an uncomfortable position',
      "Unnecessary — the apprentice's progress is the only measure of mentoring quality",
    ],
    correctIndex: 1,
    explanation:
      'Seeking feedback from the mentee is one of the most powerful things a mentor can do for their own development. The apprentice is the person who directly experiences your mentoring, and their perspective provides insights that no self-reflection or external observation can match. Far from being a sign of weakness, it demonstrates confidence, humility, and a genuine commitment to improvement — exactly the qualities you want to model for your apprentice.',
  },
  {
    question:
      'Which of the following qualifications is specifically designed for people who mentor and coach others in the workplace?',
    options: [
      'City & Guilds 2382 (18th Edition)',
      'ILM Level 3 Certificate in Coaching and Mentoring',
      'CITB Site Supervisors Safety Training Scheme (SSSTS)',
      'NVQ Level 3 in Electrotechnical Services',
    ],
    correctIndex: 1,
    explanation:
      'The ILM (Institute of Leadership and Management) Level 3 Certificate in Coaching and Mentoring is specifically designed for people who mentor or coach others in the workplace. It covers mentoring theory, practical skills, and reflective practice. For electricians who mentor apprentices, this qualification formalises and develops the skills they are already using, and it is recognised across all industries. It is an excellent CPD pathway for those who want to develop their mentoring practice.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      'I have been mentoring apprentices for years without any formal training. Is it worth getting a qualification now?',
    answer:
      'Absolutely. Experienced mentors often have excellent instinctive practice, but formal training adds two things that experience alone cannot provide: a theoretical framework that helps you understand why your instincts work (and when they might not), and a recognised credential that opens doors. The ILM Level 3 Certificate in Coaching and Mentoring, for example, takes your existing experience and gives you the language, models, and evidence base to take it to the next level. It also demonstrates to employers, training providers, and awarding organisations that you take mentoring seriously as a professional skill, not just something you do alongside your "real" job. Many experienced mentors who complete formal training say their biggest takeaway was discovering the names for things they were already doing — and identifying the gaps they did not know they had.',
  },
  {
    question: 'How do I find time for reflective practice when I am busy on site all day?',
    answer:
      'Reflective practice does not require hours of journalling. Even five minutes at the end of the day, asking yourself three questions, is enough: "What went well today in my mentoring? What did not go as well? What will I do differently tomorrow?" You can do this in the van on the way home, during a quiet moment at the end of the day, or as a brief note on your phone. The key is consistency, not volume. Some mentors keep a simple notes file on their phone where they jot down one or two sentences each day. Over time, these brief reflections accumulate into a powerful record of your development and a resource for your mentoring portfolio.',
  },
  {
    question: 'What should I include in a mentoring portfolio?',
    answer:
      'A mentoring portfolio is a collection of evidence that demonstrates your development and effectiveness as a mentor. It might include: a reflective journal or log entries, feedback from mentees (anonymised if appropriate), feedback from colleagues or managers, records of mentoring sessions and outcomes, evidence of CPD (courses, reading, conferences), examples of learning plans you have created, assessment records you have completed, and any formal qualifications or certificates related to mentoring. The portfolio is not just for others — it is primarily a tool for your own development, helping you track your progress, identify patterns, and plan your continued improvement.',
  },
  {
    question: 'Can mentoring experience help with career progression in the electrical trade?',
    answer:
      'Very much so. Mentoring demonstrates leadership, communication, and people management skills — exactly the competencies required for progression to supervisory and management roles. The ECS (Electrotechnical Certification Scheme) Technician card, for example, requires evidence of leadership and management capabilities, which mentoring provides. Many electrical contractors also look for mentoring experience when promoting to site supervisor, contracts manager, or training coordinator roles. Beyond formal progression, mentoring builds your reputation in the industry as someone who develops others, which opens doors to opportunities that pure technical competence alone does not. The best mentors are often the first people considered for leadership roles because they have already demonstrated that they can develop and lead others.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'Which learning theorist developed the experiential learning cycle that underpins reflective practice?',
    options: ['David Kolb', 'Carol Dweck', 'Abraham Maslow', 'B.F. Skinner'],
    correctAnswer: 0,
    explanation:
      'David Kolb published his experiential learning cycle in 1984. The cycle — Concrete Experience, Reflective Observation, Abstract Conceptualisation, and Active Experimentation — provides a systematic framework for learning from experience. It is the foundation of most reflective practice models used in professional development, including mentoring.',
  },
  {
    id: 2,
    question: 'In Kolb\'s cycle, "Abstract Conceptualisation" means:',
    options: [
      'Having the experience in the first place',
      'Thinking about what happened',
      'Drawing conclusions and forming theories about what you would do differently',
      'Trying a new approach based on your conclusions',
    ],
    correctAnswer: 2,
    explanation:
      'Abstract Conceptualisation is the third stage of Kolb\'s cycle, where you move from reflecting on what happened (Reflective Observation) to drawing conclusions, identifying patterns, and forming theories about why it happened and what you would do differently. It is the "so what?" stage — turning raw experience into usable knowledge that can guide future action.',
  },
  {
    id: 3,
    question:
      'What is the primary benefit of seeking feedback from your mentee about your mentoring practice?',
    options: [
      'It makes the mentee feel important',
      'It provides direct insight into how your mentoring is experienced by the person who matters most — the learner',
      'It shifts responsibility for the mentoring relationship onto the mentee',
      'It is a formal requirement of all mentoring qualifications',
    ],
    correctAnswer: 1,
    explanation:
      'The mentee is the person who directly experiences your mentoring, which makes their feedback uniquely valuable. Self-reflection tells you what you think you are doing; mentee feedback tells you what you are actually doing and how it is being received. The gap between intention and impact is often significant, and only the mentee can reveal it. This feedback is the most direct route to improving your practice.',
  },
  {
    id: 4,
    question:
      'Which of the following is NOT a benefit of keeping a reflective journal as a mentor?',
    options: [
      'It helps you identify patterns in your mentoring practice over time',
      'It provides evidence for a mentoring portfolio or CPD record',
      'It guarantees that all your future mentoring decisions will be correct',
      'It encourages you to learn from both successes and mistakes',
    ],
    correctAnswer: 2,
    explanation:
      'Reflective journalling helps you learn from experience, identify patterns, generate evidence, and improve over time — but it does not guarantee perfect decisions. Mentoring is complex and context-dependent, and even the most reflective practitioner will sometimes get things wrong. The value of reflection is not perfection; it is continuous improvement. Each cycle of experience and reflection makes you a slightly better mentor than you were before.',
  },
  {
    id: 5,
    question: 'The ILM Level 3 Certificate in Coaching and Mentoring is:',
    options: [
      'An electrical qualification that includes a mentoring module',
      'A standalone qualification specifically for people who mentor or coach others in the workplace',
      'A mandatory requirement for anyone mentoring an apprentice',
      'Only available to people in management positions',
    ],
    correctAnswer: 1,
    explanation:
      'The ILM Level 3 Certificate in Coaching and Mentoring is a standalone qualification designed for anyone who mentors or coaches others in the workplace, regardless of their industry or position. It covers mentoring theory, practical skills, and reflective practice. It is not mandatory for mentoring apprentices, but it is a valuable CPD pathway that formalises and develops mentoring skills. It is recognised across all industries and is available to anyone, not just managers.',
  },
  {
    id: 6,
    question:
      'A mentor who has successfully developed five apprentices through their qualifications applies for a site supervisor role. How does their mentoring experience support this application?',
    options: [
      'It does not — mentoring and site supervision are completely different skills',
      'It demonstrates leadership, communication, and people management skills that are directly relevant to supervision',
      'It only helps if they have a formal mentoring qualification',
      'It shows they prefer mentoring to practical work, which may count against them',
    ],
    correctAnswer: 1,
    explanation:
      'Mentoring directly develops and demonstrates the core skills required for supervisory and management roles: leadership (guiding others toward goals), communication (giving clear instructions and constructive feedback), people management (adapting your approach to different individuals), problem-solving (handling difficult situations), and developing others (building team capability). These are exactly the competencies that employers look for when promoting to site supervisor, and mentoring experience provides concrete evidence of them.',
  },
  {
    id: 7,
    question: 'What is the "ripple effect" in the context of mentoring?',
    options: [
      'The negative impact that a bad mentoring experience has on an apprentice',
      'The idea that good mentoring creates future mentors — each person you develop well goes on to develop others in turn',
      'The way that mentoring feedback ripples through an organisation',
      'The financial impact of mentoring on company profitability',
    ],
    correctAnswer: 1,
    explanation:
      "The ripple effect describes the multiplying impact of good mentoring. When you mentor an apprentice well, you do not just develop one electrician — you develop someone who, when they become experienced enough, will go on to mentor the next generation in the same thoughtful, effective way. Your influence extends far beyond the apprentices you personally work with; it echoes through every person they develop in turn. This is the mentor's true legacy: not just the work they did, but the people they created.",
  },
  {
    id: 8,
    question:
      'Which of the following best describes the purpose of 360-degree feedback in mentor development?',
    options: [
      'Gathering feedback from the mentee only',
      'Gathering feedback from multiple perspectives — mentees, peers, managers, and others who observe your mentoring',
      'Rotating through 360 different mentoring techniques',
      'Completing a full year of mentoring before gathering any feedback',
    ],
    correctAnswer: 1,
    explanation:
      '360-degree feedback gathers perspectives from multiple sources: the mentee (who experiences your mentoring directly), peers (who observe how you interact with learners), managers (who see the outcomes of your mentoring), and potentially other stakeholders like college tutors or assessors. Each perspective reveals different aspects of your practice. The mentee knows how your mentoring feels; peers notice things you might not see in yourself; managers assess the overall impact. Together, they provide a comprehensive picture that is far more accurate than any single viewpoint.',
  },
];

export default function MDModule5Section4() {
  useSEO({
    title: 'Your Development as a Mentor | MD Module 5.4',
    description:
      "Reflective practice using Kolb's cycle, seeking feedback, CPD pathways including ILM qualifications, building a mentoring portfolio, and the ripple effect of good mentoring.",
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
            <Link to="../md-module-5">
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
            <TrendingUp className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Your Development as a Mentor
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Reflective practice, seeking feedback, CPD pathways, and building a mentoring legacy
            that extends far beyond any single apprentice
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Reflective practice:</strong> Kolb&rsquo;s cycle applied to your own
                mentoring &mdash; experience, reflect, conceptualise, experiment
              </li>
              <li>
                <strong>Feedback:</strong> Seek it from mentees, peers, and managers &mdash;
                360-degree perspectives reveal your blind spots
              </li>
              <li>
                <strong>CPD:</strong> ILM Level 3, CITB courses, professional reading, mentoring
                networks
              </li>
              <li>
                <strong>Legacy:</strong> Good mentoring creates the next generation of mentors
                &mdash; the ripple effect
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Continuous improvement:</strong> A mentor who stops developing stops being
                effective &mdash; the same principle applies to you as it does to your apprentice
              </li>
              <li>
                <strong>Career progression:</strong> Mentoring demonstrates leadership skills that
                open doors to supervisory and management roles
              </li>
              <li>
                <strong>Industry impact:</strong> Every apprentice you develop well strengthens the
                entire electrical trade
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply Kolb's experiential learning cycle to your own mentoring experiences",
              'Develop a simple reflective practice habit that fits into a busy work schedule',
              'Identify and use multiple sources of feedback to improve your mentoring practice',
              'Describe CPD pathways available for mentor development, including ILM qualifications',
              'Explain the concept of a mentoring portfolio and what to include in it',
              'Articulate the ripple effect and how your mentoring creates a lasting legacy in the trade',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Reflective Practice */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Reflective Practice
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Throughout this course, we have applied learning theories to help you develop your
                apprentices. Now it is time to turn those same tools on yourself. If you expect your
                apprentices to learn from experience, to reflect on mistakes, and to continuously
                improve, then you must model that behaviour in your own mentoring practice. This is{' '}
                <strong>reflective practice</strong> &mdash; the deliberate habit of examining your
                own experiences to learn from them.
              </p>

              <p>
                The most widely used framework for reflective practice is{' '}
                <strong>Kolb&rsquo;s Experiential Learning Cycle</strong> (David Kolb, 1984), which
                we first encountered in Module 2. Applied to your development as a mentor, the cycle
                works like this:
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Kolb&rsquo;s Cycle Applied to Mentoring
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-rose-400">Concrete Experience</p>
                      <p className="text-sm text-white">
                        Something happens in your mentoring practice. Perhaps a conversation with
                        your apprentice did not go as planned, or a teaching method worked
                        unexpectedly well, or you lost your patience during a demonstration.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-rose-400">Reflective Observation</p>
                      <p className="text-sm text-white">
                        You think about what happened. What went well? What did not go well? How did
                        the apprentice respond? How did you feel? What were you trying to achieve,
                        and did you achieve it?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-rose-400">
                        Abstract Conceptualisation
                      </p>
                      <p className="text-sm text-white">
                        You draw conclusions. Why did it go that way? What theory or principle might
                        explain what happened? What would you do differently? You form a hypothesis:
                        &ldquo;Next time, I will try X instead of Y.&rdquo;
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-rose-400">Active Experimentation</p>
                      <p className="text-sm text-white">
                        You try your new approach in practice. This becomes the next concrete
                        experience, and the cycle continues. Each rotation makes you a slightly more
                        effective mentor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Practical Example: A Mentoring Reflection
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Experience:</strong> I demonstrated SWA
                    termination to my apprentice today. Halfway through, she started to look
                    confused and disengaged. I got frustrated and said &ldquo;just watch&rdquo; more
                    firmly than I intended. She went quiet for the rest of the afternoon.
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Reflection:</strong> She was struggling to
                    follow because I was demonstrating too fast and explaining the &ldquo;how&rdquo;
                    without the &ldquo;why.&rdquo; My frustration was about my own time pressure,
                    not about her ability. My tone shut down her willingness to ask questions.
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Conceptualisation:</strong> I need to slow
                    down my demonstrations, check understanding at each step, and manage my own
                    frustration better when I am under pressure. The apprentice&rsquo;s confusion is
                    information, not a personal failing.
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Experimentation:</strong> Tomorrow, I will
                    break the SWA termination into five smaller steps, demonstrate each one
                    separately, and ask her to repeat each step before moving on. I will also start
                    with a brief apology for my tone today.
                  </p>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">The Five-Minute Reflection:</strong> You do
                  not need to write essays. At the end of each day (or each week), ask yourself
                  three questions: <strong>(1) What went well in my mentoring today?</strong>{' '}
                  <strong>(2) What did not go as well?</strong>{' '}
                  <strong>(3) What will I do differently next time?</strong> A few sentences in a
                  notes app on your phone is enough. The habit matters more than the volume.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Seeking Feedback */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Seeking Feedback on Your Mentoring
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Self-reflection is valuable, but it has a fundamental limitation: you can only see
                yourself from your own perspective. Your <em>intention</em> and your <em>impact</em>{' '}
                are not always the same thing. You may think you are being supportive when the
                apprentice perceives you as overbearing. You may think you are giving them
                independence when they feel abandoned. The only way to close the gap between
                intention and impact is to seek feedback from the people who experience your
                mentoring.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  360-Degree Feedback for Mentors
                </p>
                <p className="text-sm text-white mb-3">
                  360-degree feedback gathers perspectives from multiple sources, each revealing
                  different aspects of your practice:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      M
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Mentee Feedback</p>
                      <p className="text-sm text-white">
                        The most important source. The apprentice experiences your mentoring
                        directly. Ask: &ldquo;How am I doing as your mentor? What helps you learn
                        best? Is there anything I do that does not work well for you?&rdquo;
                        Consider making this anonymous if possible &mdash; a short written form or a
                        conversation facilitated by a third party can encourage honesty.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      P
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Peer Feedback</p>
                      <p className="text-sm text-white">
                        Other experienced electricians who observe you with your apprentice. They
                        notice things you might not see: your body language, your tone, how you
                        respond under pressure, how you balance guidance with independence. Ask a
                        trusted colleague to observe a mentoring session and give you honest
                        feedback.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      L
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Line Manager or Employer Feedback
                      </p>
                      <p className="text-sm text-white">
                        Your manager sees the outcomes of your mentoring: apprentice retention,
                        qualification completion rates, the quality of work produced by your
                        apprentices, and how well they integrate into the team. This big-picture
                        perspective complements the detailed feedback from mentees and peers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Seeking feedback requires vulnerability and courage. It is not comfortable to hear
                that something you thought you were doing well is actually not landing as intended.
                But this discomfort is exactly what drives growth. If you model the ability to
                receive feedback openly and use it constructively, you are teaching your apprentice
                one of the most important professional skills there is.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">How to Receive Feedback Well</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Listen without defending.</strong> Your first instinct will be to
                      explain or justify. Resist it. Just listen.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Thank the person.</strong> Giving honest feedback is uncomfortable for
                      them too. Acknowledge their courage.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Ask clarifying questions.</strong> &ldquo;Can you give me a specific
                      example?&rdquo; or &ldquo;What would have worked better for you?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Reflect before responding.</strong> Take time to process the feedback
                      before deciding what to do with it.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Act on it visibly.</strong> The fastest way to encourage future
                      feedback is to show that you used the last piece.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: CPD Pathways */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            CPD Pathways
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Continuing Professional Development (CPD) is not just for your electrical skills
                &mdash; it applies to your mentoring practice too. The best mentors treat mentoring
                as a skill that requires ongoing investment, just like staying current with BS 7671
                amendments or new installation methods. There are several pathways available for
                developing your mentoring expertise.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Formal Qualifications</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      ILM Level 3 Certificate in Coaching and Mentoring
                    </p>
                    <p className="text-sm text-white">
                      The industry-recognised qualification for workplace mentoring. Covers
                      mentoring theory, practical skills, ethics, and reflective practice. Delivered
                      by many training providers, often through blended learning (online modules
                      plus face-to-face sessions). Typically takes 3-6 months part-time. Accredited
                      by the Institute of Leadership and Management, a division of City &amp;
                      Guilds.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">CITB Mentoring Courses</p>
                    <p className="text-sm text-white">
                      The Construction Industry Training Board offers specific mentoring courses
                      designed for the construction sector. These are shorter and more focused than
                      ILM qualifications, covering the practical aspects of mentoring apprentices on
                      construction sites. Available through CITB-approved training providers.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      City &amp; Guilds Assessor Qualifications
                    </p>
                    <p className="text-sm text-white">
                      If your mentoring role includes assessing apprentices against NVQ or
                      competence standards, the Level 3 Award in Assessing Competence in the Work
                      Environment (formerly D32/D33/A1) formalises your assessment skills and is
                      required by many awarding organisations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Informal CPD</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Professional Reading</p>
                    <p className="text-sm text-white">
                      Key texts include: <em>The Coaching Habit</em> by Michael Bungay Stanier
                      (practical questioning techniques), <em>Mindset</em> by Carol Dweck (growth
                      mindset), <em>Flow</em> by Mihaly Csikszentmihalyi (engagement and
                      motivation), and <em>Emotional Intelligence</em> by Daniel Goleman
                      (self-awareness and empathy in leadership).
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      Mentoring Networks and Communities
                    </p>
                    <p className="text-sm text-white">
                      Connecting with other mentors provides peer support, shared learning, and
                      fresh perspectives. Look for construction industry mentoring forums, employer
                      mentoring groups, or professional networks through the CITB, JIB, or ECA.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Observation and Shadowing</p>
                    <p className="text-sm text-white">
                      If possible, observe another experienced mentor working with their apprentice.
                      Watching someone else&rsquo;s approach can reveal techniques and strategies
                      you have never considered, and comparing their practice to yours is a powerful
                      learning experience.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Building a Mentoring Portfolio
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  A mentoring portfolio is a structured collection of evidence that documents your
                  development as a mentor. It serves two purposes: it is a tool for your own ongoing
                  reflection, and it provides evidence of your mentoring competence for
                  qualifications, job applications, and CPD records.
                </p>
                <p className="text-sm text-white mb-2">A strong mentoring portfolio includes:</p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Reflective journal entries (regular, not just after problems)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Feedback from mentees (anonymised where appropriate)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Feedback from peers and managers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Records of mentoring sessions and learning plans created</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Evidence of CPD: courses attended, books read, conferences, workshops
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Outcomes: apprentice qualification completions, progression records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Certificates and formal qualifications related to mentoring</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: The Ripple Effect */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            The Ripple Effect
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                We end this course where every good mentoring relationship should eventually point:
                toward the future. The true measure of a mentor is not just the apprentice they
                develop, but the <strong>ripple effect</strong> that development creates across the
                trade.
              </p>

              <p>
                When you mentor an apprentice well, you do not just produce one competent
                electrician. You produce someone who has experienced what good mentoring looks and
                feels like. When that person, five or ten years from now, has their own apprentice,
                they will draw on their experience of being mentored by you. If you were patient,
                they will be patient. If you explained the &ldquo;why&rdquo; behind the
                &ldquo;what,&rdquo; they will do the same. If you held high standards with
                compassion, they will carry that forward.
              </p>

              <p>
                Your influence extends far beyond the apprentices you personally work with. It
                echoes through every person they develop in turn, and every person those people
                develop after that. This is the ripple effect, and it is the most powerful impact
                any mentor can have.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Career Progression Through Mentoring
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Mentoring does not just benefit your apprentice &mdash; it actively develops the
                  skills you need for career progression in the electrical trade:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>ECS Technician card:</strong> Requires evidence of leadership and
                      management capabilities. Mentoring provides direct, demonstrable evidence of
                      these skills.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Site supervisor roles:</strong> Mentoring develops exactly the skills
                      needed for supervision &mdash; giving clear instructions, providing feedback,
                      managing different personalities, maintaining standards.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Contracts manager:</strong> The ability to develop teams, communicate
                      effectively, and solve people problems is the foundation of contracts
                      management.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Training and assessment roles:</strong> Experienced mentors with
                      formal qualifications (ILM, assessor awards) can move into dedicated training
                      and assessment positions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Industry reputation:</strong> A mentor who is known for developing
                      good apprentices builds a reputation that opens doors across the industry.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Your Legacy in the Trade</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Consider this: every experienced electrician today was once an apprentice.
                  Somewhere along the way, someone took the time to teach them, to be patient with
                  their mistakes, to explain the &ldquo;why&rdquo; behind the &ldquo;what,&rdquo;
                  and to set high standards while supporting them through the difficult times. That
                  mentor&rsquo;s influence lives on in every circuit that electrician installs,
                  every apprentice they train, and every standard they uphold.
                </p>
                <p className="text-sm text-white">
                  That is the opportunity in front of you. Your mentoring is not a side task that
                  you fit in around your &ldquo;real&rdquo; work. It <em>is</em> some of the most
                  important work you will ever do. Years from now, long after the specific
                  installations you worked on have been refurbished or replaced, the electricians
                  you developed will still be working, still upholding the standards you taught
                  them, and still passing on what you gave them to the next generation.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Final Thought:</strong> The electrical trade
                  is built on a chain of knowledge that stretches back generations. Every mentor is
                  a link in that chain. When you mentor well, you strengthen the chain. When you
                  develop an apprentice who goes on to mentor others, you add new links. Your legacy
                  is not just the work you do &mdash; it is the people you create.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Key Takeaways */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Key Takeaways
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Your development as a mentor is a lifelong journey, not a destination. The same
                principles of continuous improvement that you teach your apprentices apply to your
                own practice. Reflect, seek feedback, invest in CPD, and build a portfolio that
                documents your growth.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Takeaways</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Reflective practice:</strong> Use Kolb&rsquo;s cycle to learn from
                      your own mentoring experiences. Even five minutes of daily reflection makes a
                      difference.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Seek feedback:</strong> The gap between your intention and your impact
                      can only be revealed by others. Ask mentees, peers, and managers for honest
                      feedback.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>CPD pathways:</strong> Invest in your mentoring skills through ILM
                      qualifications, CITB courses, professional reading, and mentoring networks.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Build a portfolio:</strong> Document your reflections, feedback, CPD,
                      and outcomes as evidence of your development as a mentor.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>The ripple effect:</strong> Good mentoring creates the next generation
                      of mentors. Your legacy is not just the circuits you install &mdash; it is the
                      electricians you create.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                You have now completed all five modules of the Mentoring &amp; Developing Others
                course. The next step is the mock exam, which will test your knowledge across all
                modules and prepare you for any formal assessment. Good luck &mdash; and thank you
                for investing in becoming a better mentor. The trade needs people like you.
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-6">
              Mock Exam
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
