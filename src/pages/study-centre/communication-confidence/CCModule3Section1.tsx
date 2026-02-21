import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle,
  HelpCircle,
  Target,
  Eye,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'bandura-mastery',
    question:
      "According to Bandura's self-efficacy theory, which source of confidence has the strongest and most lasting effect?",
    options: [
      'Vicarious experiences (watching others succeed)',
      'Social persuasion (encouragement from others)',
      'Mastery experiences (your own successes)',
      'Emotional and physiological states (how you feel physically)',
    ],
    correctIndex: 2,
    explanation:
      "Bandura's research consistently found that mastery experiences &mdash; your own direct successes &mdash; are the most powerful source of self-efficacy. When you personally accomplish something challenging, it creates a deep, lasting belief in your capability that no amount of encouragement or observation can replicate. Each successful task completion builds a foundation of evidence that you can draw on in future challenges.",
  },
  {
    id: 'imposter-syndrome',
    question: 'Who first identified and named the imposter phenomenon in their 1978 research?',
    options: [
      'Albert Bandura',
      'Carol Dweck',
      'Pauline Rose Clance and Suzanne Imes',
      'Daniel Goleman',
    ],
    correctIndex: 2,
    explanation:
      'Pauline Rose Clance and Suzanne Imes first described the imposter phenomenon in their 1978 paper published in Psychotherapy: Theory, Research & Practice. Their original research focused on high-achieving women who, despite objective evidence of accomplishment, persisted in believing they were not genuinely capable and feared being exposed as frauds. Subsequent research has confirmed that imposter feelings affect people across all demographics and professions.',
  },
  {
    id: 'growth-mindset',
    question:
      "In Carol Dweck's research, what is the key difference between a fixed mindset and a growth mindset?",
    options: [
      'Fixed mindset people work harder; growth mindset people are naturally talented',
      'Fixed mindset believes ability is innate and unchangeable; growth mindset believes ability can be developed through effort',
      'Growth mindset means being positive; fixed mindset means being negative',
      'Fixed mindset applies to academic subjects only; growth mindset applies to physical skills',
    ],
    correctIndex: 1,
    explanation:
      "Dweck's research showed that people with a fixed mindset believe their abilities, intelligence, and talents are static traits that cannot be meaningfully changed. People with a growth mindset believe these qualities can be developed through dedication, effort, and learning from mistakes. The mindset you hold fundamentally shapes how you respond to challenges, setbacks, and feedback &mdash; which directly affects your confidence over time.",
  },
];

const faqs = [
  {
    question: 'Is confidence something you are born with, or can it be developed?',
    answer:
      "Confidence is overwhelmingly a developed skill, not an innate trait. Bandura's decades of research demonstrate that self-efficacy &mdash; the belief in your ability to succeed &mdash; is built through experience, observation, feedback, and managing your emotional state. Some people may have temperamental advantages (such as lower baseline anxiety), but the vast majority of what we call 'confidence' is constructed through repeated exposure to challenges and the accumulation of evidence that you can handle them. Every qualified electrician was once an apprentice who did not know how to wire a socket. Confidence came from doing, not from genetics.",
  },
  {
    question:
      'I have been qualified for years but still feel like a fraud sometimes. Is that normal?',
    answer:
      "Completely normal. Clance and Imes' research found that imposter feelings are extremely common among high-achieving professionals &mdash; and subsequent studies have confirmed this across all industries and experience levels. In the electrical trade, the sheer breadth of regulations, technologies, and installation types means there is always something you do not know, which can trigger imposter feelings. The key is recognising that feeling uncertain about some aspects of your work does not mean you are a fraud &mdash; it means you are aware of the complexity of your profession. True incompetence rarely worries about being incompetent.",
  },
  {
    question: 'How do I build confidence when I keep making mistakes?',
    answer:
      "Mistakes are not the opposite of confidence &mdash; they are the raw material from which confidence is built. Dweck's growth mindset research shows that people who view mistakes as learning opportunities develop stronger, more resilient confidence than those who view mistakes as evidence of inadequacy. The key is to analyse what went wrong, understand why, and apply that understanding next time. An apprentice who makes a wiring error, understands the fault, and corrects it properly has learned something that reading a textbook alone could never teach. Over time, this cycle of mistake, reflection, and correction builds a deep competence that translates into genuine confidence.",
  },
  {
    question: 'What is the difference between confidence and arrogance on site?',
    answer:
      "Confidence is grounded in evidence and remains open to learning. A confident electrician knows what they know, acknowledges what they do not, and is willing to ask questions or seek help when needed. Arrogance, by contrast, is a defensive posture that refuses to admit uncertainty or accept feedback. Confident people say 'I have done this before and I know the process.' Arrogant people say 'I do not need to check &mdash; I know what I am doing' and then refuse to verify. On a construction site, this distinction can be safety-critical. True confidence includes the confidence to say 'I am not sure &mdash; let me check the regulations before I proceed.'",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is NOT one of Bandura's four sources of self-efficacy?",
    options: [
      'Mastery experiences',
      'Financial reward',
      'Vicarious experiences',
      'Social persuasion',
    ],
    correctAnswer: 1,
    explanation:
      'Bandura identified four sources of self-efficacy: mastery experiences (your own successes), vicarious experiences (watching others succeed), social persuasion (encouragement and feedback from others), and emotional/physiological states (how you feel physically and emotionally). Financial reward is not one of the four sources, although external rewards may contribute indirectly to motivation.',
  },
  {
    id: 2,
    question:
      'In the context of construction, which of the following is the best example of a mastery experience building confidence?',
    options: [
      'Your supervisor tells you that you are doing well',
      'You watch a YouTube video of someone completing a consumer unit change',
      'You successfully complete your first solo consumer unit change and it passes inspection',
      'You feel calm and relaxed before starting a new job',
    ],
    correctAnswer: 2,
    explanation:
      'A mastery experience is your own direct, personal success at a task. Completing a consumer unit change yourself and having it pass inspection provides the strongest possible evidence that you are capable &mdash; far stronger than being told you are good (social persuasion), watching someone else do it (vicarious experience), or feeling calm (physiological state).',
  },
  {
    id: 3,
    question: 'Clance and Imes (1978) originally described the imposter phenomenon in which group?',
    options: [
      'Construction apprentices in their first year',
      'High-achieving women in professional and academic settings',
      'People with clinical anxiety disorders',
      'Students who had failed exams multiple times',
    ],
    correctAnswer: 1,
    explanation:
      "Clance and Imes' original 1978 research focused on high-achieving women who, despite significant objective evidence of success (degrees, publications, professional recognition), continued to believe they were not genuinely intelligent and feared being exposed as frauds. Later research extended these findings to show that imposter feelings affect people of all genders, backgrounds, and professions.",
  },
  {
    id: 4,
    question:
      "According to Dweck's growth mindset research, how does someone with a fixed mindset typically respond to failure?",
    options: [
      'They analyse the failure and develop a new strategy',
      'They see it as evidence that they lack ability and are likely to avoid similar challenges in the future',
      'They ask for help and try again immediately',
      'They become more motivated to prove themselves next time',
    ],
    correctAnswer: 1,
    explanation:
      "Dweck's research found that people with a fixed mindset interpret failure as confirmation that they lack the necessary ability &mdash; and since they believe ability is fixed and cannot be changed, they tend to avoid similar challenges in the future to protect themselves from further 'proof' of inadequacy. This avoidance behaviour limits growth and, over time, erodes confidence further.",
  },
  {
    id: 5,
    question: 'What is the confidence-competence loop?',
    options: [
      'A negative cycle where low confidence causes mistakes which reduce confidence further',
      'A positive feedback cycle where competence builds confidence, which encourages more practice, which builds more competence',
      'A theory that confidence and competence are the same thing',
      'A training method where you alternate between learning theory and practical work',
    ],
    correctAnswer: 1,
    explanation:
      'The confidence-competence loop is a positive feedback cycle: as you develop competence through practice and learning, your confidence increases. That increased confidence makes you more willing to take on new challenges and practise more, which builds further competence, which increases confidence further. Understanding this loop helps you recognise that confidence is not a prerequisite for action &mdash; it is a result of it.',
  },
  {
    id: 6,
    question:
      'A newly qualified electrician is about to run their first job solo. According to the principles in this section, what is the most effective approach to building confidence for this challenge?',
    options: [
      'Avoid taking on the job until they feel completely confident',
      'Tell themselves they are the best electrician on site to boost their self-belief',
      'Draw on previous mastery experiences, prepare thoroughly, and accept that some anxiety is normal and does not mean they are not ready',
      'Watch experienced electricians run jobs and wait until they feel they could do it equally well',
    ],
    correctAnswer: 2,
    explanation:
      "The most effective approach combines multiple evidence-based strategies: drawing on previous mastery experiences (Bandura), recognising that discomfort is part of growth not evidence of inadequacy (Dweck), and accepting that physiological anxiety does not mean you are not competent (Bandura's fourth source). Avoiding the challenge (fixed mindset) or relying on empty affirmations (not evidence-based) would be less effective.",
  },
  {
    id: 7,
    question:
      "Which of Bandura's four sources of self-efficacy is most likely at work when an apprentice gains confidence after watching their mentor successfully complete a complex installation?",
    options: [
      'Mastery experiences',
      'Vicarious experiences',
      'Social persuasion',
      'Emotional and physiological states',
    ],
    correctAnswer: 1,
    explanation:
      "Vicarious experiences involve building self-efficacy by observing someone you identify with succeed at a task. When an apprentice watches their mentor &mdash; someone they can relate to as a fellow electrician &mdash; complete a complex installation, it creates the belief 'if they can do it, I can learn to do it too.' The closer the model is to the observer in terms of perceived ability, the stronger the vicarious effect.",
  },
  {
    id: 8,
    question:
      'An experienced electrician has been working domestically for years and is about to start their first commercial project. They feel anxious and doubt whether they are capable. According to the imposter phenomenon research, what should they recognise?',
    options: [
      'Their anxiety proves they are not ready for commercial work and should stick to domestic',
      'Imposter feelings are common during transitions to new environments and do not reflect actual competence &mdash; their domestic skills provide a strong foundation',
      'They should suppress their anxiety and pretend to be confident',
      'They need to get a commercial qualification before they can feel confident',
    ],
    correctAnswer: 1,
    explanation:
      "Clance and Imes' research, along with subsequent studies, confirms that imposter feelings are particularly common during transitions &mdash; moving to a new environment, taking on a new role, or working in an unfamiliar context. The electrician's years of domestic experience provide genuine competence that transfers significantly to commercial work. Recognising imposter feelings for what they are (a normal psychological response to new challenges, not evidence of inadequacy) is the first step to managing them effectively.",
  },
];

export default function CCModule3Section1() {
  useSEO({
    title: 'Understanding Confidence | CC Module 3.1',
    description:
      "Bandura's self-efficacy theory, Clance & Imes imposter syndrome, Carol Dweck growth mindset, confidence-competence loop, and practical construction applications.",
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
            <Link to="../cc-module-3">
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
            <Brain className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Understanding Confidence
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The psychology of self-belief, where confidence really comes from, and why feeling like
            a fraud does not mean you are one
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Framework:</strong> Bandura&rsquo;s four sources of self-efficacy explain
                where confidence comes from
              </li>
              <li>
                <strong>Research:</strong> Clance &amp; Imes (1978) identified imposter syndrome
                &mdash; feeling like a fraud despite evidence of competence
              </li>
              <li>
                <strong>Mindset:</strong> Dweck&rsquo;s growth mindset shows confidence is built
                through effort, not born
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Career:</strong> Confidence determines whether you take on challenges or
                stay in your comfort zone
              </li>
              <li>
                <strong>Communication:</strong> How you carry yourself shapes how clients,
                colleagues, and site managers perceive you
              </li>
              <li>
                <strong>Progression:</strong> Moving from apprentice to qualified to running jobs
                solo requires deliberate confidence building
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain Bandura's four sources of self-efficacy with construction-specific examples",
              'Describe the imposter phenomenon as identified by Clance and Imes (1978) and recognise its signs',
              "Distinguish between Dweck's fixed mindset and growth mindset and apply the concepts to trade skills",
              'Explain the confidence-competence loop and how to use it to accelerate professional development',
              'Identify which confidence-building strategies are most relevant at different career stages',
              'Recognise common confidence barriers in construction and apply evidence-based strategies to overcome them',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is Confidence? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            What Is Confidence?
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Confidence is one of the most misunderstood concepts in professional life. It is
                often treated as a personality trait &mdash; something you either have or you do not
                &mdash; when in reality, confidence is a <strong>psychological state</strong> that
                is built, maintained, and sometimes lost through specific, identifiable processes.
                Understanding these processes gives you the power to develop genuine confidence
                rather than waiting for it to appear on its own.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Core Principle:</strong> Confidence is not a
                  prerequisite for action &mdash; it is a <em>result</em> of action. You do not wait
                  until you feel confident before attempting something difficult. You attempt
                  difficult things, and the confidence follows from the evidence of your own
                  capability. This is one of the most important ideas in this entire section,
                  because it reverses the common assumption that holds so many people back.
                </p>
              </div>

              <p>
                In the construction industry, confidence matters enormously. It affects whether you
                speak up when you see a safety issue, whether you take on challenging installations,
                whether you communicate effectively with clients, and whether you progress in your
                career. A lack of confidence does not just limit your communication &mdash; it
                limits every aspect of your professional life. Conversely, the kind of confidence
                that is grounded in genuine competence and self-awareness is one of the most
                powerful assets any electrician can possess.
              </p>

              <p>
                Let us be clear about what genuine confidence is <em>not</em>. It is not arrogance,
                bravado, or the absence of doubt. Genuine confidence includes the ability to say
                &ldquo;I do not know&rdquo;, to ask questions, and to acknowledge mistakes. A truly
                confident electrician does not bluff their way through a job &mdash; they have the
                self-assurance to admit uncertainty and the drive to find the correct answer.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Confidence in Construction: Three Critical Moments
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>First day on a new site:</strong> Everything is unfamiliar &mdash; the
                      people, the layout, the expectations. Confidence at this stage means trusting
                      your training and asking the right questions rather than pretending you
                      already know everything.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Moving from apprentice to qualified:</strong> The transition from
                      working under supervision to signing off your own work is one of the biggest
                      confidence challenges in the trade. Suddenly, you are responsible. Your name
                      is on the certificate.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Running jobs solo:</strong> Managing a job from start to finish
                      &mdash; client communication, material ordering, time management,
                      problem-solving &mdash; requires a level of confidence that only comes from
                      experience and deliberate development.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Bandura's Four Sources of Self-Efficacy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Bandura&rsquo;s Four Sources of Self-Efficacy
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Albert Bandura</strong>, one of the most cited psychologists in history,
                developed the concept of <strong>self-efficacy</strong> &mdash; the belief in your
                own ability to succeed in specific situations or accomplish specific tasks.
                Self-efficacy is not general self-esteem (&ldquo;I am a good person&rdquo;) but
                targeted self-belief (&ldquo;I can complete this consumer unit change
                correctly&rdquo;). It is task-specific, context-dependent, and &mdash; critically
                &mdash; it can be deliberately built.
              </p>

              <p>
                Bandura identified <strong>four sources</strong> from which self-efficacy is
                constructed. Understanding these sources gives you a practical framework for
                building confidence in any area of your work, at any stage of your career.
              </p>

              <div className="space-y-3">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Mastery Experiences (Enactive Attainment)
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    The most powerful source of self-efficacy. When you personally succeed at a
                    task, especially one that required effort and persistence, it provides direct,
                    undeniable evidence that you are capable. Each success builds on the last,
                    creating a progressively stronger foundation of confidence. Conversely, repeated
                    failures &mdash; particularly early on, before a sense of efficacy is
                    established &mdash; can undermine it.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Construction example:</strong> The first
                      time you complete a full board change on your own and it passes EICR testing,
                      that experience creates a powerful internal reference point. The next time you
                      face a similar job, you are not guessing whether you can do it &mdash; you
                      have proof. Each successful board change after that strengthens the belief
                      further.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Vicarious Experiences (Social Modelling)
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Watching someone you identify with succeed at a task builds your belief that you
                    can do the same. The closer the model is to you in terms of perceived ability,
                    age, experience, or background, the stronger the effect. Seeing someone
                    &ldquo;like you&rdquo; accomplish something challenging sends a clear message:
                    &ldquo;If they can do it, I can learn to do it too.&rdquo;
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Construction example:</strong> As a
                      second-year apprentice, you watch a recently qualified electrician &mdash;
                      someone only two years ahead of you &mdash; confidently run a rewire and deal
                      with an awkward client. Because they were in your position not long ago, their
                      success feels achievable. This is far more powerful than watching a 30-year
                      veteran, because the gap between you and the model feels smaller.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Social Persuasion (Verbal Encouragement)
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Encouragement, feedback, and verbal support from people you respect can
                    strengthen self-efficacy &mdash; particularly when it is specific and credible.
                    General praise (&ldquo;good job&rdquo;) has limited impact, but specific,
                    evidence-based feedback (&ldquo;your cable management on that board was really
                    neat &mdash; that shows real attention to detail&rdquo;) can meaningfully boost
                    confidence because it highlights a concrete skill.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Construction example:</strong> Your
                      supervising electrician reviews your first fix and says: &ldquo;That routing
                      is solid. The clips are evenly spaced, the bends are clean, and you have left
                      enough slack at each point. That is the kind of work clients notice.&rdquo;
                      This specific feedback gives you concrete evidence of your developing
                      competence, far more effective than a vague &ldquo;looks fine.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Emotional &amp; Physiological States
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    How you feel physically and emotionally directly influences your confidence.
                    Anxiety, fatigue, stress, and physical tension are often interpreted as signs of
                    inability (&ldquo;I feel nervous, therefore I must not be ready&rdquo;).
                    Bandura&rsquo;s research shows that learning to interpret these states
                    accurately &mdash; recognising that nervousness is a normal response to
                    challenge, not evidence of incompetence &mdash; is a critical component of
                    building self-efficacy.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Construction example:</strong> You arrive at
                      a new commercial site on your first day and your stomach is in knots, your
                      palms are sweating, and your mind is racing. A person with low self-efficacy
                      interprets this as: &ldquo;I am not ready for this.&rdquo; A person with high
                      self-efficacy interprets the same physical sensations as: &ldquo;This is a big
                      job and my body is gearing up for it. I have felt like this before and
                      performed well.&rdquo; Same sensations, completely different interpretation
                      &mdash; and completely different outcomes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    Practical Application: Building Your Self-Efficacy Portfolio
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  You can deliberately use all four sources to build confidence in any area of your
                  work:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Mastery:</strong> Seek out progressively challenging tasks. Start with
                      what you know, then stretch slightly beyond your current comfort zone.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Vicarious:</strong> Find role models who are slightly ahead of you,
                      not decades ahead. Watch how they handle the challenges you are about to face.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Social:</strong> Seek specific feedback, not just general praise. Ask
                      your supervisor: &ldquo;What specifically did I do well and what should I
                      improve?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Physiological:</strong> Learn to reinterpret anxiety as activation,
                      not inadequacy. Prepare physically (good sleep, nutrition, hydration) to give
                      yourself the best platform.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Imposter Phenomenon — Clance & Imes (1978) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            The Imposter Phenomenon &mdash; Clance &amp; Imes (1978)
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 1978, psychologists <strong>Pauline Rose Clance</strong> and{' '}
                <strong>Suzanne Imes</strong> published a landmark paper in{' '}
                <em>Psychotherapy: Theory, Research &amp; Practice</em> describing what they called
                the <strong>imposter phenomenon</strong> &mdash; a pattern they observed in
                high-achieving women who, despite significant objective evidence of their
                accomplishments, persisted in believing that they were not genuinely intelligent or
                capable and feared being exposed as &ldquo;frauds.&rdquo;
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Clance &amp; Imes (1978):</strong>{' '}
                  <em>
                    &ldquo;Despite outstanding academic and professional accomplishments, women who
                    experience the imposter phenomenon persist in believing that they are really not
                    bright and have fooled anyone who thinks otherwise.&rdquo;
                  </em>
                </p>
              </div>

              <p>
                While the original research focused on women in academic and professional settings,
                subsequent studies over the following decades have confirmed that imposter feelings
                affect people of <strong>all genders, ages, backgrounds, and professions</strong>.
                Research estimates suggest that up to 70% of people will experience imposter
                feelings at some point in their lives. It is not a clinical disorder &mdash; it is a
                common psychological pattern that becomes particularly acute during transitions, new
                challenges, and periods of heightened scrutiny.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Recognising Imposter Feelings: The Five Core Patterns
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Clance later developed the Clance Imposter Phenomenon Scale, which identifies five
                  characteristic patterns:
                </p>
                <div className="space-y-2">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">1. The Fraud Cycle:</strong> Believing your
                      success is due to luck, timing, or deception rather than genuine ability.
                      &ldquo;I only got that job because no one else was available.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">2. Discounting Success:</strong> Attributing
                      achievements to external factors and minimising your own contribution.
                      &ldquo;The job went well because it was straightforward, not because I did
                      anything special.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">3. Fear of Exposure:</strong> Persistent
                      anxiety that someone will discover you are not as competent as they think.
                      &ldquo;If the inspector really looks closely, they will find something
                      wrong.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">4. Overworking as Compensation:</strong>{' '}
                      Working excessively hard to ensure no one discovers your perceived inadequacy.
                      Over-preparing, double-checking everything obsessively, spending far more time
                      than necessary on tasks because you do not trust your own judgement.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">5. Avoiding Challenge:</strong> Turning down
                      opportunities because you believe you will be &ldquo;found out.&rdquo; Staying
                      in your comfort zone because stepping outside it feels too risky.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Imposter Feelings in the Electrical Trade
                </p>
                <p className="text-sm text-white mb-3">
                  The construction industry is particularly fertile ground for imposter feelings.
                  Consider these common scenarios:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>The newly qualified electrician:</strong> You have your AM2 and your
                      qualification, but signing off your first certificate feels terrifying. You
                      keep thinking: &ldquo;What if I have missed something? What if I am not really
                      ready?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>The domestic sparky going commercial:</strong> You have done hundreds
                      of domestic jobs, but the first commercial contract feels like starting over.
                      Different regulations, different scale, different people. The imposter voice
                      says: &ldquo;You are out of your depth.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>The experienced electrician in a new technology area:</strong> Smart
                      home systems, EV chargers, battery storage &mdash; the industry is changing
                      rapidly. Even experienced electricians can feel like imposters when working
                      with unfamiliar technology, despite having decades of core competence.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Insight:</strong> Imposter feelings are not
                  evidence of actual incompetence &mdash; in fact, they are more common among
                  competent people than incompetent ones. The truly incompetent rarely worry about
                  their competence (a phenomenon known as the Dunning-Kruger effect). If you are
                  worried about whether you are good enough, that very concern suggests you have the
                  self-awareness and standards that are the hallmarks of a conscientious
                  professional.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Carol Dweck's Growth Mindset */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Carol Dweck&rsquo;s Growth Mindset
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Stanford psychologist <strong>Carol Dweck</strong> spent decades researching how
                people&rsquo;s beliefs about their own abilities shape their behaviour, motivation,
                and achievement. Her research, published most notably in her 2006 book{' '}
                <em>Mindset: The New Psychology of Success</em>, identifies two fundamental belief
                systems that profoundly affect confidence: the <strong>fixed mindset</strong> and
                the <strong>growth mindset</strong>.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                  <p className="text-xs font-medium text-red-400 mb-2">Fixed Mindset</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Believes ability is innate and largely unchangeable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Sees challenges as threats to self-image</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Avoids difficulty to prevent &ldquo;looking stupid&rdquo;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Interprets failure as proof of lack of ability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Gives up when progress feels slow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Feels threatened by others&rsquo; success</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                  <p className="text-xs font-medium text-green-400 mb-2">Growth Mindset</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Believes ability can be developed through effort and learning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Sees challenges as opportunities to grow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Embraces difficulty as the path to improvement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Interprets failure as information about what to work on next</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Persists through setbacks because effort leads to mastery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Finds inspiration in others&rsquo; success</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                Dweck&rsquo;s research demonstrated that these mindsets are not fixed personality
                traits &mdash; they can be shifted through awareness and deliberate practice. The
                critical finding for confidence is this: people with a growth mindset develop{' '}
                <strong>more resilient confidence</strong> because their self-belief is not
                dependent on always succeeding. They can fail, learn, and try again without their
                confidence collapsing, because they do not interpret failure as a reflection of
                their fundamental worth or ability.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Growth Mindset in Construction: Practical Applications
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Failing a test at college:</strong> Fixed
                      mindset says: &ldquo;I am not clever enough for this.&rdquo; Growth mindset
                      says: &ldquo;I did not study the right material &mdash; I need to change my
                      revision approach.&rdquo; The fixed mindset leads to avoidance; the growth
                      mindset leads to a better strategy.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Getting corrected by a supervisor:</strong>{' '}
                      Fixed mindset hears: &ldquo;You are not good enough.&rdquo; Growth mindset
                      hears: &ldquo;Here is something I can improve.&rdquo; The fixed mindset
                      creates defensiveness; the growth mindset creates a learning moment.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Struggling with a new technology:</strong>{' '}
                      Fixed mindset says: &ldquo;I am too old to learn this smart home stuff.&rdquo;
                      Growth mindset says: &ldquo;This is new and I need time to learn it, just like
                      everything else I have mastered in this trade.&rdquo; The fixed mindset leads
                      to being left behind; the growth mindset leads to new skills and new revenue.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">
                        Comparing yourself to a more experienced colleague:
                      </strong>{' '}
                      Fixed mindset says: &ldquo;I will never be that good.&rdquo; Growth mindset
                      says: &ldquo;They have had more years of practice. If I keep developing, I
                      will reach that level too.&rdquo; The fixed mindset creates envy; the growth
                      mindset creates a role model.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  The Power of &ldquo;Not Yet&rdquo;
                </p>
                <p className="text-sm text-white">
                  One of Dweck&rsquo;s most practical insights is the concept of{' '}
                  <strong>&ldquo;not yet.&rdquo;</strong> Instead of saying &ldquo;I cannot do
                  three-phase installations,&rdquo; a growth mindset reframes this as &ldquo;I
                  cannot do three-phase installations <em>yet</em>.&rdquo; This single word
                  transforms a statement of permanent limitation into a statement of current
                  progress. It acknowledges where you are without defining where you will always be.
                  In construction, where you are constantly encountering new installation types, new
                  regulations, and new technologies, the ability to say &ldquo;not yet&rdquo; rather
                  than &ldquo;I cannot&rdquo; is one of the most powerful confidence tools
                  available.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: The Confidence-Competence Loop */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            The Confidence-Competence Loop
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The concepts covered so far &mdash; Bandura&rsquo;s self-efficacy, Clance and
                Imes&rsquo; imposter phenomenon, and Dweck&rsquo;s growth mindset &mdash; all
                converge on a single, powerful mechanism: the{' '}
                <strong>confidence-competence loop</strong>. Understanding this loop is essential
                because it explains not only how confidence is built, but why it can spiral in both
                directions &mdash; upwards into increasing capability and self-belief, or downwards
                into avoidance and stagnation.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Positive Loop</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm text-white">
                        <strong>You attempt a task</strong> &mdash; even though you are not fully
                        confident. You accept the challenge despite the uncertainty.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm text-white">
                        <strong>You develop competence</strong> &mdash; through the process of doing
                        the work, you learn, adapt, and build skill. Even if it is not perfect, you
                        gain real-world knowledge.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm text-white">
                        <strong>Competence builds confidence</strong> &mdash; your success (mastery
                        experience) provides evidence that you are capable. Your self-efficacy
                        increases.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm text-white">
                        <strong>Confidence encourages more action</strong> &mdash; with increased
                        self-belief, you are more willing to take on the next challenge, which
                        starts the cycle again at a higher level.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The critical insight is that the loop{' '}
                <strong>starts with action, not confidence</strong>. If you wait until you feel
                confident before acting, you will never enter the loop. The first step is always
                taken with uncertainty &mdash; and that is not a sign of insufficient confidence, it
                is the normal, healthy starting point of the process.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  The Negative Loop: What Happens When Confidence Stalls
                </p>
                <p className="text-sm text-white mb-3">
                  The loop can also work in reverse. When avoidance takes over, the consequences
                  compound:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>You avoid the challenge</strong> because you do not feel confident
                      enough
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Without practice, competence does not develop</strong> &mdash; the
                      skill gap stays the same or widens
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>The lack of competence reinforces low confidence</strong> &mdash; you
                      have no new mastery experiences to draw on
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Low confidence leads to more avoidance</strong> &mdash; and the
                      downward spiral continues
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  The Loop in Action: From Apprentice to Running Jobs Solo
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Year 1 (Apprentice):</strong> You watch your
                      supervisor wire a board (vicarious experience). You assist with components
                      under guidance. Your first independent connection is checked and confirmed
                      correct. Small mastery experience. Confidence grows slightly.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Year 2-3 (Developing):</strong> You take on
                      more of the work independently. You make mistakes, learn from them, and
                      develop competence in increasingly complex tasks. Each corrected error and
                      each successful completion feeds the loop. Your supervisor gives specific,
                      positive feedback (social persuasion).
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Newly Qualified:</strong> You pass your AM2
                      and get your qualification. Imposter feelings are at their peak &mdash; you
                      have the certificate but question whether you are really ready. You take on
                      your first solo job despite the doubt. It goes well. The confidence-competence
                      loop accelerates.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Running Jobs Solo:</strong> After dozens of
                      successful jobs, your confidence is grounded in a substantial portfolio of
                      mastery experiences. You still encounter new challenges, but you approach them
                      with a growth mindset: &ldquo;I have not done this before, but I have learned
                      every other skill in this trade through practice, and I will learn this
                      too.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The confidence-competence loop is not a theory to memorise &mdash; it is a process
                to deliberately engage with. Every time you take on something that stretches you,
                even slightly, you are feeding the positive loop. Every time you avoid something
                because you &ldquo;do not feel ready yet,&rdquo; ask yourself: am I protecting
                myself from failure, or am I preventing myself from growth?
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Key Takeaways */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Key Takeaways
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Summary:</strong> Confidence is not a gift you
                  are born with &mdash; it is a skill you build through action, learning, and
                  self-awareness. The psychology is clear: your past successes, the models around
                  you, the feedback you receive, and how you interpret your own emotions all
                  contribute to your self-belief. Imposter feelings are normal and do not reflect
                  reality. A growth mindset turns every challenge into a confidence-building
                  opportunity.
                </p>
              </div>

              <p>
                In this section, you have explored the foundational psychology of confidence. Let us
                consolidate the key concepts before you move on to the next section on overcoming
                speaking anxiety.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Core Concepts to Remember</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Bandura&rsquo;s four sources</strong> &mdash; mastery experiences,
                      vicarious experiences, social persuasion, and emotional/physiological states
                      &mdash; are the building blocks of self-efficacy. Mastery experiences are the
                      most powerful
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>The imposter phenomenon</strong> (Clance &amp; Imes, 1978) &mdash;
                      feeling like a fraud despite objective evidence of competence &mdash; affects
                      up to 70% of people and is especially common during career transitions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Dweck&rsquo;s growth mindset</strong> &mdash; believing ability can be
                      developed through effort &mdash; creates more resilient confidence than a
                      fixed mindset because failure is interpreted as information, not verdict
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>The confidence-competence loop</strong> &mdash; action builds
                      competence, which builds confidence, which encourages more action. The loop
                      starts with action, not confidence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Confidence is not arrogance</strong> &mdash; genuine confidence
                      includes the ability to say &ldquo;I do not know&rdquo;, to ask questions, and
                      to acknowledge mistakes. It is grounded in evidence, not ego
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Every electrician started with zero confidence</strong> in their trade
                      skills. What you have now was built through the exact processes described in
                      this section &mdash; and it can continue to be built deliberately
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In the next section, we will build on this foundation by exploring speaking anxiety
                specifically &mdash; the fear of speaking up in meetings, delivering toolbox talks,
                and communicating confidently with clients and colleagues on site.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">A Note on Starting:</strong> If you recognise
                  yourself in the imposter phenomenon descriptions, or if you notice a fixed mindset
                  in how you talk to yourself about your abilities, that recognition is the first
                  step. Awareness is where change begins. You do not need to transform your entire
                  belief system overnight &mdash; just start noticing when you are avoiding a
                  challenge because of self-doubt, and ask yourself: &ldquo;What would a growth
                  mindset response look like here?&rdquo; That one question, applied consistently,
                  will begin to shift the pattern.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-3-section-2">
              Next Section
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
