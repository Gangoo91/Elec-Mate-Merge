import { ArrowLeft, ShieldOff, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (InlineCheck — correctIndex, 0-indexed)      */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'gs-1-4-check1',
    question:
      'Angela Duckworth&rsquo;s research at the University of Pennsylvania defines &ldquo;grit&rdquo; as a combination of which two qualities?',
    options: [
      'Intelligence and talent &mdash; the raw abilities you are born with',
      'Passion and perseverance for long-term goals &mdash; sustained interest and effort over years',
      'Confidence and charisma &mdash; the ability to influence others and believe in yourself',
      'Speed and accuracy &mdash; completing tasks quickly and without error',
    ],
    correctIndex: 1,
    explanation:
      'Duckworth defines grit as the combination of passion (a deep, enduring interest in what you do) and perseverance (the ability to sustain effort and keep going through setbacks, plateaus, and boredom). Crucially, grit is about long-term goals &mdash; not short bursts of enthusiasm. A &ldquo;gritty&rdquo; electrician is not someone who works hard for a week and then loses interest; it is someone who commits to mastering their trade over years and decades, continuing to develop even when progress feels slow. Duckworth&rsquo;s research found that grit predicts achievement better than IQ, talent, or socioeconomic background in contexts ranging from West Point military cadets to National Spelling Bee contestants to salespeople and teachers. For electricians, this means that the apprentice who shows up every day, asks questions, practises deliberately, and refuses to give up on difficult topics will almost certainly outperform the &ldquo;naturally talented&rdquo; apprentice who coasts.',
  },
  {
    id: 'gs-1-4-check2',
    question:
      'Albert Bandura identified four sources of self-efficacy. Which of the following is considered the MOST powerful source?',
    options: [
      'Social persuasion &mdash; encouragement and positive feedback from others',
      'Vicarious experiences &mdash; watching someone similar to you succeed',
      'Mastery experiences &mdash; your own direct experience of succeeding at a task through effort',
      'Physiological states &mdash; feeling calm and physically well',
    ],
    correctIndex: 2,
    explanation:
      'Bandura&rsquo;s research consistently found that mastery experiences &mdash; your own direct, personal experience of succeeding at a task &mdash; are the most powerful source of self-efficacy. When you successfully complete a challenging task through your own effort, your belief in your ability to handle similar tasks in future increases significantly. This is why hands-on practice is so critical in electrical training: an apprentice who successfully terminates a consumer unit, tests a circuit, or traces a fault under supervision gains confidence that no amount of classroom theory or encouragement from others can match. The other three sources (vicarious experience, social persuasion, and physiological states) all contribute to self-efficacy, but none has the same impact as the direct experience of &ldquo;I did this, and it worked.&rdquo; For electricians at any career stage, the practical implication is clear: the best way to build confidence in a new area is to start doing it, even on a small scale.',
  },
  {
    id: 'gs-1-4-check3',
    question:
      'The comfort zone model describes four zones of experience. Which zone comes immediately after the fear zone, and what characterises it?',
    options: [
      'The growth zone &mdash; where you achieve mastery and set new, bigger goals',
      'The panic zone &mdash; where stress becomes overwhelming and shuts down learning',
      'The learning zone &mdash; where you acquire new skills, deal with challenges, and extend your comfort zone',
      'The comfort zone &mdash; where you return after the fear subsides',
    ],
    correctIndex: 2,
    explanation:
      'The comfort zone model consists of four concentric zones: Comfort Zone (where everything feels safe, familiar, and easy), Fear Zone (where anxiety, self-doubt, and excuses emerge), Learning Zone (where new skills are acquired, challenges are handled, and problems are solved), and Growth Zone (where purpose is found, new goals are set, and dreams are achieved). The learning zone comes immediately after the fear zone. This sequence is important because it tells us that fear and discomfort are not signs that you should retreat &mdash; they are signs that you are approaching the boundary of your current abilities and about to enter the space where real learning happens. For electricians, the fear zone might manifest as anxiety about starting a new qualification, nervousness about taking on unfamiliar work, or self-doubt when entering a new sector (e.g., moving from domestic to commercial). Pushing through the fear zone into the learning zone is where competence and confidence are built.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      'I work 50+ hours a week on site &mdash; how can I realistically find time to study and develop?',
    answer:
      'Time is the most commonly cited barrier for tradespeople, and it is a genuine constraint &mdash; not an excuse. However, the research on effective learning suggests that consistency matters more than volume. Even 20&ndash;30 minutes per day of focused, deliberate study can produce significant results over months. The key strategies are: (1) Micro-learning &mdash; use short study sessions during commutes, lunch breaks, or before bed. Apps like Elec-Mate are designed for exactly this. (2) Integration &mdash; connect study to work. If you installed an RCBO today, read the BS 7671 regulation behind it tonight. Learning in context is far more effective than abstract study. (3) Protected time &mdash; block out specific times in your week for development, even if it is only two 30-minute sessions. Treat it like a job commitment. (4) Audit your time honestly. Most people have more discretionary time than they think, often consumed by social media, television, or other low-value activities. Redirecting even one hour per day towards deliberate learning compounds enormously over a year.',
  },
  {
    question: 'What if I genuinely cannot afford to take courses or buy study materials?',
    answer:
      'Financial barriers are real, but there are more free and low-cost development options than most electricians realise. CITB grants can cover a significant portion of course costs for eligible employers and apprentices. Many manufacturers (Hager, Schneider, Eaton) offer free CPD training, both online and in-person at trade counters and training centres. The IET publishes free technical articles and webinars. YouTube channels dedicated to electrical training provide high-quality content at no cost. Your employer may fund training if you can demonstrate the business benefit &mdash; frame it as an investment that will allow you to take on more complex, higher-value work. Some colleges offer evening courses at reduced rates. The SJIB (in Scotland) and JIB (in England and Wales) offer funded training programmes. The key insight is that the biggest investment in your development is not money &mdash; it is time and effort. Many of the most effective learning strategies (deliberate practice, reflective learning, peer discussion, reading regulations) cost nothing.',
  },
  {
    question:
      'How do I deal with colleagues who mock me for wanting to improve or get more qualifications?',
    answer:
      'Trade culture can be one of the most significant barriers to growth, particularly the &ldquo;tall poppy syndrome&rdquo; where ambition is met with ridicule or resentment. Understand that this behaviour usually comes from others&rsquo; own insecurity, not from any genuine problem with your ambition. Strategies for handling it: (1) Don&rsquo;t announce your plans prematurely &mdash; let results speak. There is no need to broadcast that you are studying for the 2391 or planning to start your own business. (2) Find your tribe &mdash; connect with growth-oriented electricians through trade associations, online communities, or training courses. You are not the only one who wants more. (3) Reframe the mockery &mdash; if someone says &ldquo;who do you think you are?&rdquo;, recognise that this is their fixed mindset speaking, not reality. (4) Use it as fuel &mdash; many successful electricians, business owners, and trainers report that early ridicule from peers became a powerful motivator. (5) Remember that you will not be working with these people forever. Your career spans 40+ years. The opinions of one site crew at one point in time should not determine your trajectory.',
  },
  {
    question:
      'Is imposter syndrome normal when moving into inspection, design, or self-employment?',
    answer:
      'Absolutely &mdash; imposter syndrome is extremely common during career transitions, and it is particularly prevalent among electricians moving from installation into more technical or professional roles. The feeling of &ldquo;I don&rsquo;t belong here&rdquo; or &ldquo;someone will find out I don&rsquo;t know what I&rsquo;m doing&rdquo; affects an estimated 70% of people at some point in their careers (according to research by Clance and Imes, who first identified the phenomenon). For electricians, common imposter syndrome triggers include: attending a training course and feeling less knowledgeable than other attendees, issuing your first EICR and worrying about making a mistake, quoting for a job as a newly self-employed contractor, or being asked a technical question you cannot immediately answer. The important thing to understand is that imposter syndrome is a feeling, not a fact. It does not mean you are actually incompetent &mdash; it means you are in a new and challenging situation where you have not yet built full confidence. The cure is action: keep doing the work, keep learning, seek mentoring from experienced practitioners, and allow your confidence to build through accumulated mastery experiences (Bandura&rsquo;s most powerful source of self-efficacy). Every experienced inspector, designer, and business owner went through the same phase.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'Angela Duckworth&rsquo;s research at the University of Pennsylvania found that grit &mdash; passion and perseverance for long-term goals &mdash; predicted success more accurately than which other factor?',
    options: [
      'Physical fitness and health',
      'IQ and measured cognitive ability',
      'Socioeconomic background alone',
      'Years of formal education',
    ],
    correctAnswer: 1,
    explanation:
      'Duckworth&rsquo;s landmark research demonstrated that grit was a stronger predictor of success than IQ across multiple high-achievement contexts. At West Point Military Academy, grit predicted which cadets would complete the punishing &ldquo;Beast Barracks&rdquo; summer training programme better than SAT scores, class rank, or athletic ability. In the National Spelling Bee, grittier contestants outperformed those with higher verbal IQ. Among Ivy League undergraduates, grittier students achieved higher GPAs despite having lower SAT scores than their peers. This finding challenges the widespread belief that intelligence or natural talent is the primary driver of success. For the electrical trade, this research validates what many experienced electricians already know intuitively: the apprentice who sticks with it, keeps learning, and pushes through difficulty will almost always outperform the one who had early natural aptitude but lacked the persistence to develop it fully.',
  },
  {
    id: 2,
    question:
      'According to the Duckworth Grit Scale, which behaviour pattern most strongly indicates high grit?',
    options: [
      'Frequently starting new projects and exploring new interests to find your passion',
      'Working intensely on a goal for several weeks before moving to the next challenge',
      'Maintaining focus on a specific long-term goal for years, persisting through setbacks and periods of slow progress',
      'Choosing the most difficult available challenge at every opportunity, regardless of personal interest',
    ],
    correctAnswer: 2,
    explanation:
      'The Grit Scale measures two components: consistency of interest (passion) and perseverance of effort. High grit is characterised by long-term commitment to a specific direction &mdash; not just working hard in short bursts, but maintaining sustained focus over years. This distinguishes grit from mere conscientiousness or work ethic. A gritty person does not frequently abandon goals or switch interests; they stay the course even when progress is slow, when the work becomes tedious, or when more exciting alternatives present themselves. For electricians, high grit looks like: committing to achieving a specific career goal (such as becoming an approved inspector or starting a business), working towards it consistently over several years, continuing to study and develop even when motivation dips, and not abandoning the goal when obstacles arise. It does not mean never changing direction &mdash; but it does mean not changing direction every time things get hard.',
  },
  {
    id: 3,
    question:
      'Albert Bandura&rsquo;s self-efficacy theory states that your belief in your ability to succeed at a task directly affects:',
    options: [
      'Only your emotional state &mdash; how anxious or confident you feel',
      'Whether you attempt the task at all, how much effort you invest, how long you persist, and ultimately whether you succeed',
      'Only the quality of your work &mdash; higher confidence equals higher quality output',
      'Only your social interactions &mdash; confident people receive more help from others',
    ],
    correctAnswer: 1,
    explanation:
      'Bandura&rsquo;s self-efficacy theory is one of the most influential frameworks in psychology. It states that self-efficacy &mdash; your belief in your ability to succeed at a specific task &mdash; affects four critical outcomes: (1) Choice &mdash; whether you attempt the task at all. Low self-efficacy leads to avoidance. (2) Effort &mdash; how much energy and resources you invest. Higher self-efficacy leads to greater effort. (3) Persistence &mdash; how long you continue in the face of difficulty. Higher self-efficacy leads to greater persistence. (4) Outcome &mdash; whether you ultimately succeed. Because self-efficacy affects the first three factors, it has a powerful indirect effect on actual achievement. For electricians, this means that an electrician who believes they can learn inspection work is more likely to attempt the 2391 course, invest more study time, persist through initial failures, and ultimately qualify. An electrician with low self-efficacy in this area may never even try &mdash; not because they lack the ability, but because they lack the belief.',
  },
  {
    id: 4,
    question:
      'The comfort zone model identifies four zones. An electrician who has been doing domestic rewires for 15 years and feels anxious about taking on their first commercial project is most likely in which zone?',
    options: [
      'The comfort zone &mdash; they feel safe and unchallenged',
      'The fear zone &mdash; they are experiencing self-doubt, anxiety, and the urge to make excuses to avoid the challenge',
      'The learning zone &mdash; they are actively acquiring new commercial skills',
      'The growth zone &mdash; they are setting new goals and expanding their purpose',
    ],
    correctAnswer: 1,
    explanation:
      'The electrician is in the fear zone. They have moved beyond their comfort zone (domestic rewires, which they can do confidently and almost automatically) and are now experiencing the characteristic symptoms of the fear zone: anxiety, self-doubt, and the temptation to retreat to safety (&ldquo;maybe I should stick to what I know&rdquo;). The fear zone is a critical transition point. Many tradespeople reach this zone and turn back, returning to their comfort zone and missing the opportunity for growth. Those who push through the fear zone enter the learning zone, where they begin acquiring new skills (understanding commercial specifications, three-phase systems, containment methods) and building competence through practice and feedback. Eventually, commercial work becomes part of their expanded comfort zone, and they enter the growth zone where they set new, bigger goals. The key insight is that fear and anxiety are not reasons to retreat &mdash; they are evidence that you are at the boundary of growth.',
  },
  {
    id: 5,
    question:
      'Which of the following is an example of building self-efficacy through &ldquo;vicarious experience&rdquo; (one of Bandura&rsquo;s four sources)?',
    options: [
      'An apprentice successfully wires a consumer unit for the first time and gains confidence from the achievement',
      'An apprentice watches a fellow apprentice of similar ability successfully complete the AM2 practical assessment and thinks &ldquo;if they can do it, I can too&rdquo;',
      'A supervisor tells an apprentice &ldquo;I believe you can pass this exam if you put in the work&rdquo;',
      'An electrician feels calm and well-rested before an important assessment',
    ],
    correctAnswer: 1,
    explanation:
      'Vicarious experience is Bandura&rsquo;s second source of self-efficacy. It works through social comparison: when you see someone similar to you succeed at a task, your own belief that you can succeed increases. The key word is &ldquo;similar&rdquo; &mdash; the model must be someone you can identify with. An apprentice watching a fellow apprentice (similar age, similar ability, similar background) pass the AM2 gains more self-efficacy than watching a highly experienced electrician do it, because the experienced electrician&rsquo;s success can be attributed to their years of experience rather than to something the apprentice could replicate. This is why peer learning, mentoring by recent graduates, and sharing success stories within training groups are powerful strategies. Option A is a mastery experience (the most powerful source), Option C is social persuasion, and Option D relates to physiological states. All four sources contribute to self-efficacy, but understanding which is which helps you deliberately build confidence using multiple strategies.',
  },
  {
    id: 6,
    question:
      'Imposter syndrome &mdash; feeling like a fraud despite evidence of competence &mdash; is particularly common in electricians when they:',
    options: [
      'Have been in the trade for less than one year and are still learning basics',
      'Are transitioning from employed installation work to self-employment, inspection, or design roles where their professional identity is being redefined',
      'Work alongside other electricians of similar skill level on familiar projects',
      'Receive positive feedback from supervisors and clients on work they know they did well',
    ],
    correctAnswer: 1,
    explanation:
      'Imposter syndrome is most commonly triggered by transitions and role changes &mdash; situations where your professional identity is being redefined and you have not yet built the track record to feel fully confident. For electricians, the most common triggers are: moving from employed to self-employed (suddenly you are responsible for everything &mdash; quoting, customer relations, compliance, business administration), moving from installation to inspection (a fundamentally different skill set requiring new knowledge and judgement), moving from site work to design or consultancy, or taking on a training or mentoring role for the first time. In all these cases, the electrician has genuine competence built over years, but the new context makes them feel like a beginner again. This is normal and temporary. The cure is accumulated experience in the new role, combined with honest self-assessment (recognising what you do know, as well as what you still need to learn) and support from peers or mentors who have made similar transitions.',
  },
  {
    id: 7,
    question:
      'Anders Ericsson&rsquo;s research on deliberate practice distinguishes it from ordinary practice by which key characteristic?',
    options: [
      'Deliberate practice involves repeating tasks you are already good at to maintain fluency',
      'Deliberate practice involves pushing beyond your current ability level with focused effort, specific goals, and immediate feedback',
      'Deliberate practice requires at least four hours per day to be effective',
      'Deliberate practice must be done alone, without input from coaches or mentors',
    ],
    correctAnswer: 1,
    explanation:
      'Ericsson&rsquo;s research on expertise found that what separates elite performers from average performers is not just the quantity of practice, but the quality. Deliberate practice has several defining characteristics: (1) It targets specific weaknesses &mdash; you work on what you are worst at, not what you are best at. (2) It pushes beyond current ability &mdash; the task is just beyond your comfort zone, requiring concentrated effort. (3) It involves specific goals &mdash; each practice session has a clear objective. (4) It includes immediate feedback &mdash; you can tell whether your attempt was correct and adjust accordingly. (5) It requires full concentration &mdash; mindless repetition does not count. For electricians, deliberate practice might look like: practising cable terminations until you can achieve correct torque settings consistently, working through unfamiliar fault scenarios with a mentor providing real-time feedback, doing timed cable calculation exercises targeting your weakest areas, or practising inspection procedures on live installations with an experienced inspector reviewing your findings. Simply doing your job every day is not deliberate practice unless you are intentionally pushing beyond your current skill level.',
  },
  {
    id: 8,
    question:
      'An electrician earns &pound;45,000 per year doing domestic installation and feels comfortable. They have thought about getting the 2391 Inspection &amp; Testing qualification and moving into inspection work (which could earn &pound;55,000+), but keep finding reasons not to start. According to the concepts covered in this section, which combination of barriers is most likely operating?',
    options: [
      'Only financial barriers &mdash; the course fees are too expensive',
      'Comfort zone (earning well, why change?), fear of failure (what if I fail the exam?), imposter syndrome (I&rsquo;m an installer, not an inspector), and low self-efficacy (I don&rsquo;t believe I can do it)',
      'Only time barriers &mdash; they are too busy working to study',
      'Only cultural barriers &mdash; their colleagues would mock them for trying',
    ],
    correctAnswer: 1,
    explanation:
      'This scenario illustrates how multiple barriers typically operate together, creating a powerful resistance to change that feels impossible to overcome but is actually composed of several individually manageable obstacles. The comfort zone barrier (&ldquo;I earn well, why rock the boat?&rdquo;) reduces motivation to change. The fear of failure (&ldquo;what if I invest time and money and fail?&rdquo;) creates risk aversion. Imposter syndrome (&ldquo;I&rsquo;m an installer, not an inspector &mdash; that&rsquo;s for more academic people&rdquo;) challenges professional identity. Low self-efficacy (&ldquo;I don&rsquo;t think I could pass the exam or do the job well enough&rdquo;) undermines belief in the possibility of success. The most effective strategy is to address each barrier individually: break the comfort zone by honestly assessing where your career will be in 10 years without change, address fear of failure by reframing it as a learning opportunity, challenge imposter syndrome by talking to inspectors who made the same transition, and build self-efficacy by starting small (shadowing an inspector, reading GN3, taking a short course). No single barrier is insurmountable &mdash; it is the combination that creates inertia.',
  },
];

export default function GSModule1Section4() {
  useSEO({
    title: 'Overcoming Barriers to Growth | Goal Setting & Growth Module 1.4',
    description:
      'Angela Duckworth&rsquo;s grit research, self-efficacy theory, the comfort zone model, imposter syndrome, and practical strategies for overcoming barriers to growth in the electrical trade.',
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
            <Link to="../gs-module-1">
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
            <ShieldOff className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Overcoming Barriers to Growth
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Angela Duckworth&rsquo;s grit research, self-efficacy theory, the comfort zone model,
            imposter syndrome, and practical strategies for breaking through the barriers that hold
            electricians back
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Grit</strong> = passion + perseverance &mdash; it predicts success better
                than IQ or talent
              </li>
              <li>
                <strong>Self-efficacy</strong> &mdash; your belief in your ability to succeed
                determines whether you even try
              </li>
              <li>
                <strong>Comfort zone model:</strong> Comfort &rarr; Fear &rarr; Learning &rarr;
                Growth
              </li>
              <li>
                <strong>Imposter syndrome</strong> is normal during career transitions &mdash; it is
                a feeling, not a fact
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Time, money, confidence:</strong> Every tradesperson faces real barriers
                &mdash; but each can be addressed
              </li>
              <li>
                <strong>Trade culture:</strong> Mockery of ambition is fixed mindset in disguise
              </li>
              <li>
                <strong>Deliberate practice:</strong> Pushing beyond current ability is how experts
                are made
              </li>
              <li>
                <strong>Environment matters:</strong> Surround yourself with growth-oriented people
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Define grit according to Angela Duckworth&rsquo;s research and explain why it predicts success',
              'Identify the six common barriers to growth for tradespeople and strategies to overcome each',
              'Describe the comfort zone model and its four zones',
              'Explain Albert Bandura&rsquo;s self-efficacy theory and the four sources of self-efficacy',
              'Recognise imposter syndrome and understand why it is especially common during career transitions',
              'Apply Anders Ericsson&rsquo;s deliberate practice framework to electrical skill development',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Grit — Angela Duckworth's Research */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Grit &mdash; Angela Duckworth&rsquo;s Research
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Angela Duckworth, Professor of Psychology at the University of Pennsylvania, has
                spent over two decades studying why some people succeed and others don&rsquo;t. Her
                conclusion, supported by extensive empirical research, is captured in a single word:
                <strong> grit</strong>. Duckworth defines grit as the combination of{' '}
                <strong>passion</strong> (a deep, enduring interest in your work) and{' '}
                <strong>perseverance</strong> (the ability to sustain effort towards long-term
                goals, especially in the face of setbacks, plateaus, and boredom). Grit is not about
                short-term intensity &mdash; it is about long-term consistency.
              </p>

              <p>
                Duckworth&rsquo;s research began at West Point Military Academy, one of the most
                selective institutions in the United States. Each year, roughly 14,000 applicants
                compete for 1,200 places. Those admitted are among the most talented, physically
                fit, and academically accomplished young people in the country. Yet every year, a
                significant number of cadets drop out during the first summer &mdash; a brutal
                seven-week training programme called &ldquo;Beast Barracks&rdquo;. Duckworth found
                that the cadets who made it through Beast Barracks were not the strongest, smartest,
                or most athletic. They were the grittiest. Her Grit Scale &mdash; a simple
                questionnaire measuring consistency of interest and perseverance of effort &mdash;
                predicted completion better than any other factor, including SAT scores, class rank,
                physical fitness tests, and leadership potential ratings.
              </p>

              <p>
                She found the same pattern in every context she studied. In the National Spelling
                Bee, grittier contestants practised more hours and advanced further in competition,
                regardless of IQ. Among Ivy League undergraduates, grittier students achieved higher
                grade-point averages despite often having lower SAT scores than their peers. Among
                salespeople, grittier individuals were more likely to stay in their jobs and hit
                their targets. Among teachers in disadvantaged schools, grittier teachers were more
                effective at improving student outcomes. The consistent finding: grit predicts
                achievement over and above talent, intelligence, and socioeconomic background.
              </p>

              <p>
                This is a profoundly important finding for the electrical trade. Electrical work
                requires a broad and deep set of skills that take years to develop: practical
                installation skills, theoretical knowledge, regulation awareness, testing
                competence, fault-finding ability, customer management, business acumen. No
                apprentice arrives with all of these skills. Success in the trade is determined not
                by initial aptitude but by the willingness to persist through difficulty over the
                long term &mdash; exactly what Duckworth means by grit.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Grit Scale &mdash; Key Questions
                </p>
                <p className="text-base text-white leading-relaxed">
                  Duckworth&rsquo;s Grit Scale includes items such as: &ldquo;I have overcome
                  setbacks to conquer an important challenge&rdquo;, &ldquo;I finish whatever I
                  begin&rdquo;, &ldquo;Setbacks don&rsquo;t discourage me &mdash; I don&rsquo;t give
                  up easily&rdquo;, and &ldquo;I have been obsessed with a certain idea or project
                  for a short time but later lost interest&rdquo; (reverse-scored). High grit
                  individuals score high on perseverance and consistency. They don&rsquo;t flit
                  between goals &mdash; they dig in. For electricians, honestly answering these
                  questions about your career development can reveal whether grit is a strength or
                  an area for growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Grit Applied to the Electrical Trade */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Grit Applied to the Electrical Trade
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The electrical trade is, in many ways, a natural testing ground for grit. The path
                from apprentice to competent electrician is long (typically 3&ndash;4 years of
                formal training, plus years of post-qualification experience), demanding (combining
                hands-on physical work with complex theoretical knowledge), and punctuated by
                setbacks (failed exams, difficult installations, on-site mistakes, demanding
                clients). Those who succeed are not necessarily the most naturally talented &mdash;
                they are the ones who persist.
              </p>

              <p>
                Consider the typical journey of an electrical apprentice. In the first year,
                everything is new and often overwhelming: learning to strip cables, terminate
                accessories, read drawings, understand basic circuit theory, and navigate the social
                dynamics of a construction site. Some apprentices find certain aspects easier than
                others &mdash; one might have a natural feel for practical work but struggle with
                maths, while another might grasp theory quickly but be clumsy with tools. Initial
                aptitude varies. But by the end of a four-year apprenticeship, the differences in
                initial aptitude have largely been eclipsed by differences in effort, persistence,
                and willingness to learn from mistakes. The apprentice who struggled with maths but
                practised cable calculations every evening catches up. The apprentice who was slow
                with conduit bending but asked for extra practice sessions develops fluency. The
                apprentice who was &ldquo;naturally gifted&rdquo; but never studied theory or
                reflected on their practice plateaus.
              </p>

              <p>
                Post-qualification, grit becomes even more important. The electricians who build
                successful, fulfilling careers are those who continue developing after getting their
                Gold Card or JIB card. They pursue additional qualifications: 2391 Inspection &amp;
                Testing, 2396 Electrical Design, HNC/HND, BSc Electrical Engineering. They
                specialise: fire alarm systems, emergency lighting, EV charging, solar PV, data
                cabling, industrial controls. They build businesses: learning to quote, manage
                customers, handle accounts, market themselves. They become inspectors, trainers,
                consultants, contract managers. Every one of these steps requires pushing through
                discomfort, learning new skills, and persisting through the inevitable setbacks.
                Grit is the common thread.
              </p>

              <p>
                Duckworth&rsquo;s research also identifies a crucial component of grit that is often
                overlooked: <strong>passion</strong>. In this context, passion does not mean
                intense, fleeting excitement. It means a deep, sustained interest in your work
                &mdash; a sense that what you do matters and connects to something larger. For
                electricians, this might mean a genuine fascination with how electrical systems
                work, a commitment to safety and compliance, pride in the quality of your
                installations, or a desire to train and develop the next generation. Passion without
                perseverance is just enthusiasm. Perseverance without passion is just stubbornness.
                Grit requires both: caring deeply about your work AND being willing to push through
                difficulty over the long term.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Signs of Grit in Electricians</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>They study outside work hours</strong> &mdash; not because they have
                      to, but because they want to understand their trade more deeply
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>They treat failures as data</strong> &mdash; a failed exam or a
                      mistake on site prompts analysis and strategy change, not self-blame or giving
                      up
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>They seek feedback</strong> &mdash; from supervisors, inspectors,
                      peers, and clients &mdash; and use it to improve
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>They have long-term career goals</strong> &mdash; not just &ldquo;get
                      through this week&rdquo; but &ldquo;where do I want to be in five
                      years?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>They keep going when motivation fades</strong> &mdash; recognising
                      that motivation is temporary but discipline and habit sustain progress
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Common Barriers to Growth for Tradespeople */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Common Barriers to Growth for Tradespeople
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding the barriers that prevent growth is the first step to overcoming them.
                Research on adult learning and career development, combined with the lived
                experience of thousands of electricians, reveals six major barriers that
                consistently hold tradespeople back. Most people face several of these
                simultaneously, which is why change feels so difficult. Let us examine each one in
                detail.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Barrier 1: Time &mdash; &ldquo;I&rsquo;m too busy working to study&rdquo;
              </h3>
              <p>
                This is the most commonly cited barrier, and it is genuine. Many electricians work
                10&ndash;12 hour days on site, commute for an hour or more each way, and arrive home
                physically exhausted. The idea of then sitting down to study for a qualification or
                read regulation updates feels impossible. Weekends are consumed by family
                responsibilities, household tasks, and the need to recover. Time is finite, and
                electrical work is physically and mentally demanding.
              </p>
              <p>
                However, research on effective learning suggests that consistency matters more than
                volume. Just 20&ndash;30 minutes of focused study per day &mdash; on the commute,
                during lunch, or before bed &mdash; adds up to 150+ hours per year. That is enough
                to complete most electrical qualifications with spare capacity. The key is making
                study a habit rather than an event. Micro-learning (short, focused sessions) is more
                effective than marathon study sessions for long-term retention. The real question is
                usually not &ldquo;Do I have time?&rdquo; but &ldquo;Am I willing to use the time I
                have differently?&rdquo;
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Barrier 2: Money &mdash; Course Fees, Lost Earnings, and Tool Investment
              </h3>
              <p>
                Financial barriers are real. A 2391 Inspection &amp; Testing course can cost
                &pound;800&ndash;&pound;1,500. A City &amp; Guilds 2396 Design course is similar. An
                HNC or BSc involves thousands of pounds and several years. Beyond tuition, there are
                opportunity costs: days spent in training are days not earning. Tools and test
                equipment for new specialisms require significant investment. For electricians with
                mortgages, families, and van payments, these costs can feel prohibitive.
              </p>
              <p>
                Yet the return on investment for electrical qualifications is typically excellent.
                An electrician with the 2391 qualification can charge significantly more per hour
                for inspection work than for installation. A specialist in EV charging, fire alarms,
                or solar PV commands premium rates. Self-employment opens the door to higher
                earnings. The financial barrier is often a problem of short-term thinking: the
                course costs &pound;1,200 now, but the additional earning capacity over a 30-year
                career could be &pound;200,000 or more. CITB grants, employer-funded training,
                manufacturer CPD (often free), and tax deductions for professional development can
                all reduce the upfront cost significantly.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Barrier 3: Confidence &mdash; &ldquo;I&rsquo;m not academic&rdquo;
              </h3>
              <p>
                Many electricians left school at 16 with limited formal qualifications and carry a
                deep-seated belief that they are &ldquo;not academic&rdquo;. This belief, which is a
                textbook fixed mindset statement, becomes a powerful barrier when they consider
                pursuing further qualifications. The thought of sitting exams, writing assignments,
                or studying complex theory triggers anxiety rooted in negative school experiences.
                Imposter syndrome compounds this: &ldquo;I don&rsquo;t belong in a classroom, I
                belong on site.&rdquo;
              </p>
              <p>
                The reality is that the vast majority of electrical qualifications are practically
                focused and directly relevant to the work electricians already do. They are not
                abstract academic exercises. An electrician who can read BS 7671, perform complex
                fault-finding, understand three-phase power distribution, and calculate cable sizes
                is already demonstrating significant intellectual capability &mdash; they just
                don&rsquo;t label it as &ldquo;academic&rdquo;. The gap between what mature learners
                think they can do and what they actually can do is enormous. Adult learners bring
                focus, motivation, life experience, and contextual understanding that school-age
                students lack. Most electricians who overcome the initial confidence barrier and
                start a qualification discover that they are far more capable than they believed.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Barrier 4: Culture &mdash; &ldquo;Who do you think you are?&rdquo;
              </h3>
              <p>
                Trade culture can be one of the most insidious barriers to growth. In many
                workplaces, ambition is met with suspicion or mockery. An apprentice who studies
                during lunch is told to &ldquo;put the books away and get back to the real
                world&rdquo;. An electrician who announces they are studying for the 2391 is met
                with &ldquo;what do you want to do that for?&rdquo; or &ldquo;you think you&rsquo;re
                better than us?&rdquo;. This is tall poppy syndrome &mdash; the cultural tendency to
                cut down anyone who stands out or tries to rise above the group.
              </p>
              <p>
                This behaviour is a collective expression of fixed mindset. When someone in the
                group pursues growth, it implicitly highlights the stagnation of those who
                don&rsquo;t, creating discomfort. The easiest way to resolve this discomfort is not
                to reflect on their own choices but to discourage the person who is growing.
                Understanding this dynamic is essential: the mockery is about them, not about you.
                It does not reflect reality &mdash; it reflects insecurity. The most successful
                electricians learn to quietly pursue their goals, find growth-oriented peers outside
                their immediate work environment, and let their results speak over time.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Barrier 5: Comfort Zone &mdash; &ldquo;Why change? I&rsquo;m doing alright&rdquo;
              </h3>
              <p>
                The comfort zone is perhaps the most dangerous barrier because it doesn&rsquo;t feel
                like a barrier at all. An electrician earning &pound;40,000&ndash;&pound;50,000 per
                year doing familiar work with a reliable employer can feel genuinely content. There
                is no crisis, no immediate pressure to change. The problem is that comfort breeds
                complacency, and complacency breeds vulnerability. Industries change. Technologies
                evolve. Regulations update. Younger, more qualified electricians enter the market.
                The comfortable electrician who stopped developing at 30 may find themselves
                increasingly uncompetitive at 50.
              </p>
              <p>
                The comfort zone is also where career regret begins. Research on regret consistently
                finds that people regret inaction more than action &mdash; the things they
                didn&rsquo;t do rather than the things they did. The electrician who stays
                comfortable for 20 years and then looks back wondering &ldquo;what if I had gone for
                the inspection qualification?&rdquo; or &ldquo;what if I had started my own
                business?&rdquo; experiences a type of regret that cannot be undone. Growth requires
                voluntarily leaving comfort, and this is always uncomfortable in the short term.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Barrier 6: Information &mdash; Not Knowing What Options Exist
              </h3>
              <p>
                Many electricians are unaware of the full range of career paths, qualifications, and
                development opportunities available to them. The default narrative in the trade is
                simple: do your apprenticeship, get your qualification, work on site, maybe go
                self-employed. But the electrical industry offers far more: inspection and testing
                (2391), electrical design (2396), building services engineering (HNC/HND/BSc), fire
                alarm design and installation, emergency lighting, solar PV, battery storage, EV
                charging, smart building technology, energy management, electrical safety
                consultancy, training and education, contract management, estimating, building
                regulations compliance, and more.
              </p>
              <p>
                The information barrier is compounded by the fact that many employers have limited
                interest in developing their employees beyond the skills immediately needed for
                current projects. Career guidance for electricians is minimal compared to other
                professions. Many electricians stumble into specialisms by accident rather than
                choosing them strategically. Addressing this barrier starts with research: talking
                to electricians in different roles, attending trade shows and CPD events, joining
                professional bodies (IET, ECA, NAPIT, NICEIC), reading trade publications, and
                engaging with online communities where a wider range of career paths are visible.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Key Insight: Barriers Combine
                </p>
                <p className="text-base text-white leading-relaxed">
                  Most electricians face several barriers simultaneously: &ldquo;I don&rsquo;t have
                  time (I work 50 hours a week), I can&rsquo;t afford the course, I&rsquo;m not
                  academic enough, my mates will take the mick, I&rsquo;m comfortable where I am,
                  and I don&rsquo;t really know what the options are.&rdquo; This combination
                  creates powerful inertia. The strategy is not to solve all barriers at once but to
                  identify the one or two that are most significant for you personally and address
                  those first. Often, overcoming one barrier creates momentum that makes the others
                  easier to tackle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: The Comfort Zone Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            The Comfort Zone Model
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The comfort zone model provides a visual framework for understanding why growth
                feels uncomfortable and why that discomfort is necessary. The model describes four
                concentric zones that individuals move through when taking on new challenges.
              </p>

              <p>
                <strong>Zone 1: The Comfort Zone.</strong> This is where everything feels safe,
                familiar, and easy. You know what you are doing, you feel confident, and there is no
                anxiety. For an experienced domestic electrician, the comfort zone might include
                rewires, consumer unit upgrades, additional sockets and lights, and other tasks they
                have done hundreds of times. There is nothing inherently wrong with the comfort zone
                &mdash; it is where you perform at your current best and where you recover from
                challenges. The problem is when you never leave it. Staying permanently in your
                comfort zone means zero growth, gradual skill erosion (as the industry moves on
                without you), and vulnerability to market changes.
              </p>

              <p>
                <strong>Zone 2: The Fear Zone.</strong> Immediately outside the comfort zone lies
                the fear zone. This is where anxiety, self-doubt, and excuses emerge. The fear zone
                is characterised by thoughts like: &ldquo;What if I fail?&rdquo;, &ldquo;What will
                people think?&rdquo;, &ldquo;I&rsquo;m not ready for this&rdquo;, &ldquo;Maybe I
                should stick to what I know&rdquo;. Physically, you might experience a racing heart,
                sweaty palms, or a tight stomach. Psychologically, you begin generating reasons not
                to proceed: &ldquo;It&rsquo;s not the right time&rdquo;, &ldquo;I can&rsquo;t afford
                it&rdquo;, &ldquo;I&rsquo;ll do it next year&rdquo;. The fear zone is where most
                people turn back. They retreat to the comfort zone and tell themselves they made a
                sensible decision. In reality, they made a fear-driven decision that preserved
                short-term comfort at the expense of long-term growth.
              </p>

              <p>
                <strong>Zone 3: The Learning Zone.</strong> If you push through the fear zone, you
                enter the learning zone. This is where genuine development happens. The learning
                zone is characterised by: acquiring new skills, dealing with unfamiliar challenges,
                solving problems you have not encountered before, receiving feedback, making
                mistakes and correcting them, and feeling the gradual build of competence. The
                learning zone is uncomfortable but productive. An electrician in the learning zone
                might be: attending their first 2391 course and feeling out of their depth, carrying
                out their first commercial installation and checking every connection twice, or
                learning to use new test equipment and making errors before finding the correct
                procedure. The learning zone is where Ericsson&rsquo;s deliberate practice operates
                and where Bandura&rsquo;s mastery experiences are built.
              </p>

              <p>
                <strong>Zone 4: The Growth Zone.</strong> After sustained time in the learning zone,
                you enter the growth zone. This is where you discover new purpose, set bigger goals,
                and achieve things you previously thought impossible. Your comfort zone has expanded
                to include the new skills. What once felt terrifying is now routine. The growth zone
                is characterised by: increased confidence, a broader skill set, new career
                opportunities, a sense of purpose and direction, and the motivation to tackle the
                next challenge. The growth zone is not a permanent destination &mdash; it is a
                launching pad. From here, you identify the next area of growth, step outside your
                (now larger) comfort zone, and begin the cycle again.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The Four Zones &mdash; An Electrician&rsquo;s Example
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Comfort Zone:</strong> Domestic rewires, consumer unit upgrades,
                      additional circuits &mdash; work you can do almost on autopilot
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Fear Zone:</strong> &ldquo;I&rsquo;ve been thinking about doing the
                      2391 but I&rsquo;m not sure I&rsquo;m ready... maybe next year&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>Learning Zone:</strong> Enrolled on the 2391 course, struggling with
                      documentation requirements but persisting, shadowing an experienced inspector
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong>Growth Zone:</strong> Passed the 2391, completed 50+ EICRs, now
                      considering the 2396 Design qualification as the next challenge
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Albert Bandura's Self-Efficacy Theory */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Albert Bandura&rsquo;s Self-Efficacy Theory
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Albert Bandura, one of the most influential psychologists of the 20th century,
                developed the concept of <strong>self-efficacy</strong> &mdash; your belief in your
                ability to succeed at a specific task or in a specific situation. Self-efficacy is
                not the same as general self-confidence or self-esteem. It is task-specific: you
                might have high self-efficacy for domestic wiring (you believe you can do it well)
                but low self-efficacy for inspection work (you doubt your ability to identify
                defects and complete the documentation correctly). Bandura&rsquo;s central insight
                is that self-efficacy is a critical determinant of behaviour: it affects whether you
                attempt a task, how much effort you invest, how long you persist when things get
                difficult, and ultimately whether you succeed.
              </p>

              <p>
                Bandura identified <strong>four sources of self-efficacy</strong>, ranked in order
                of their power to influence your beliefs:
              </p>

              <p>
                <strong>1. Mastery Experiences (the most powerful source).</strong> Your own direct
                experience of succeeding at a task is the strongest builder of self-efficacy. When
                you successfully terminate a consumer unit, trace a fault, or pass an exam, your
                brain registers: &ldquo;I can do this.&rdquo; Each success builds on the last,
                creating a track record that strengthens your belief in your ability. Conversely,
                repeated failure &mdash; particularly early failure before a sense of efficacy is
                established &mdash; can undermine self-efficacy. This is why graded challenges are
                important in apprentice training: start with simpler tasks, build success, then
                gradually increase complexity. For experienced electricians moving into new areas,
                the same principle applies: start with supervised work, build a track record of
                successful outcomes, and let confidence grow from evidence.
              </p>

              <p>
                <strong>2. Vicarious Experiences (social modelling).</strong> Watching someone
                similar to you succeed at a task increases your belief that you can do it too. The
                key word is &ldquo;similar&rdquo; &mdash; the model must be someone you can identify
                with. An apprentice watching a fellow apprentice (same age, similar background,
                similar ability level) pass the AM2 gains more self-efficacy than watching a 30-year
                veteran do it, because the veteran&rsquo;s success can be attributed to decades of
                experience rather than something the apprentice could replicate. This is why peer
                learning, mentoring by recent graduates, and sharing success stories within training
                groups are powerful strategies. When you see someone like you achieve something, the
                implicit message is: &ldquo;If they can do it, so can I.&rdquo;
              </p>

              <p>
                <strong>3. Social Persuasion (verbal encouragement).</strong> Encouragement from
                trusted, credible people can boost self-efficacy. A respected supervisor saying
                &ldquo;I think you&rsquo;re ready to take on inspection work &mdash; you&rsquo;ve
                got the knowledge and the attention to detail&rdquo; can have a significant impact
                on an electrician&rsquo;s belief in their ability. However, social persuasion is
                less powerful than mastery or vicarious experiences because words alone cannot
                override strong beliefs formed through direct experience. If you have repeatedly
                failed at something, being told &ldquo;you can do it&rdquo; may not be enough.
                Social persuasion is most effective when it is specific, credible, and backed up by
                opportunities to build mastery.
              </p>

              <p>
                <strong>4. Physiological and Emotional States (the weakest source).</strong> How you
                feel physically and emotionally affects your self-efficacy in the moment. If you are
                well-rested, calm, and physically comfortable, you are more likely to believe you
                can handle a challenging task. If you are exhausted, anxious, or unwell, your
                self-efficacy drops. This is why preparation matters before high-stakes situations
                (exams, interviews, first-day-on-a-new-site): getting adequate sleep, arriving
                early, having your tools and materials organised, and using breathing techniques to
                manage anxiety can all positively influence your self-efficacy.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Building Self-Efficacy in the Electrical Trade &mdash; Practical Strategies
                </p>
                <p className="text-base text-white leading-relaxed mb-3">
                  <strong>Mastery:</strong> Seek out progressively challenging work. Volunteer for
                  tasks that stretch your ability. Keep a record of successful completions to build
                  your evidence base.
                </p>
                <p className="text-base text-white leading-relaxed mb-3">
                  <strong>Vicarious:</strong> Connect with electricians who have made transitions
                  similar to the one you want to make. Ask them about their journey. If they started
                  from a similar position, their success is evidence that yours is possible.
                </p>
                <p className="text-base text-white leading-relaxed mb-3">
                  <strong>Social persuasion:</strong> Seek feedback from people you respect. If a
                  trusted colleague or trainer says you are ready for the next step, take it
                  seriously. Avoid spending too much time with people who consistently undermine
                  your confidence.
                </p>
                <p className="text-base text-white leading-relaxed">
                  <strong>Physiological:</strong> Prepare properly for high-stakes situations. Get
                  enough sleep. Manage your physical health. Learn simple anxiety management
                  techniques (deep breathing, progressive muscle relaxation).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Imposter Syndrome */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Imposter Syndrome &mdash; Feeling Like a Fraud
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Imposter syndrome was first identified by psychologists Pauline Clance and Suzanne
                Imes in 1978. It describes the persistent feeling that you are a fraud &mdash; that
                your success is due to luck, timing, or other people&rsquo;s low expectations, and
                that sooner or later someone will &ldquo;find you out&rdquo;. Despite its name,
                imposter syndrome is not a clinical disorder or a personality flaw. It is a common
                psychological experience that affects an estimated 70% of people at some point in
                their careers. It is particularly prevalent among high achievers and people in
                transitional phases of their career.
              </p>

              <p>
                For electricians, imposter syndrome is especially common during several key
                transitions: <strong>moving from apprentice to qualified electrician</strong> (you
                have the card but you still feel like you are learning),{' '}
                <strong>moving from employed to self-employed</strong> (suddenly you are the expert,
                the business owner, the person clients are trusting with their safety),{' '}
                <strong>moving from installation to inspection</strong> (you are now the one signing
                off other people&rsquo;s work),{' '}
                <strong>starting a training or mentoring role</strong> (you are now the authority
                figure, expected to know everything), or{' '}
                <strong>moving into a specialist area</strong> (EV charging, fire alarms, solar PV)
                where you feel less experienced than your previous specialism.
              </p>

              <p>
                The imposter syndrome experience typically includes: attributing your success to
                external factors (&ldquo;I only passed because the exam was easy&rdquo;, &ldquo;I
                only got that job because no one else applied&rdquo;), dismissing positive feedback
                (&ldquo;they&rsquo;re just being polite&rdquo;, &ldquo;they don&rsquo;t know what
                good work really looks like&rdquo;), over-preparing to compensate for perceived
                inadequacy (studying obsessively, checking work multiple times, arriving hours
                early), fear of being &ldquo;found out&rdquo; (avoiding questions, pretending to
                know things you don&rsquo;t, declining opportunities that would expose your
                perceived weakness), and comparing yourself to the most accomplished person in the
                room rather than to your own previous performance.
              </p>

              <p>
                The critical thing to understand about imposter syndrome is that it is a{' '}
                <strong>feeling, not a fact</strong>. It does not mean you are actually incompetent.
                In fact, research suggests that people who experience imposter syndrome are often
                more competent than average &mdash; less competent people tend not to question their
                own ability (this is known as the Dunning-Kruger effect). The feeling of being a
                fraud is a normal response to being in a new, challenging environment where you have
                not yet built the track record to feel fully confident. It fades with accumulated
                mastery experiences.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Fear of Failure vs Fear of Success
              </h3>
              <p>
                Fear of failure is widely recognised: the anxiety that you will try something and
                fail, confirming your worst beliefs about yourself. But there is a less discussed
                barrier that is equally powerful: <strong>fear of success</strong>. Some
                electricians unconsciously avoid growth because success would change their identity,
                relationships, and daily life in ways that feel threatening. Becoming a business
                owner means leaving the camaraderie of site work. Getting a management position
                means being &ldquo;the boss&rdquo; rather than &ldquo;one of the lads&rdquo;.
                Becoming highly qualified might create distance from friends and colleagues who are
                less qualified.
              </p>
              <p>
                Fear of success is rooted in the same fixed mindset that drives fear of failure: the
                belief that change threatens identity. A growth mindset reframe recognises that
                identity is not fixed &mdash; you can be both a tradesperson and a business owner,
                both practical and academic, both experienced and still learning. Growth does not
                mean leaving behind who you are. It means adding to who you are.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Strategies for Managing Imposter Syndrome
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Name it:</strong> Simply recognising &ldquo;this is imposter
                      syndrome&rdquo; when it happens reduces its power. It is a known psychological
                      pattern, not a personal deficiency.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Keep an evidence file:</strong> Record your qualifications, positive
                      feedback, successful projects, and resolved challenges. When imposter syndrome
                      strikes, review the evidence.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Talk about it:</strong> Share your feelings with trusted peers or
                      mentors. You will almost certainly discover that they have experienced the
                      same thing.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Separate feeling from fact:</strong> &ldquo;I feel like a fraud&rdquo;
                      is a feeling. &ldquo;I have passed my exams, completed my training, and
                      received positive feedback&rdquo; is a fact. Facts outweigh feelings.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Accept that you don&rsquo;t need to know everything:</strong> Even the
                      most experienced inspectors, designers, and consultants encounter situations
                      where they need to check the regulations or ask a colleague. Not knowing
                      everything is not imposter syndrome &mdash; it is normal professional
                      practice.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Practical Strategies for Overcoming Each Barrier */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Practical Strategies for Overcoming Each Barrier
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding barriers intellectually is only half the battle. You need concrete,
                actionable strategies to overcome them. Here is a practical toolkit, drawing on the
                research of Duckworth, Bandura, Ericsson, and others.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Overcoming the Time Barrier
              </h3>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Audit your time:</strong> Track how you spend your non-working hours for
                    one week. Most people discover 1&ndash;2 hours per day consumed by social media,
                    television, or aimless browsing. Redirecting even 30 minutes per day to learning
                    gives you 180+ hours per year.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Use micro-learning:</strong> Study in short, focused blocks (15&ndash;30
                    minutes) during commutes, lunch breaks, or before bed. Apps, flashcards, and
                    short video tutorials are designed for this.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Integrate learning with work:</strong> After each job, spend five
                    minutes reviewing the relevant BS 7671 regulation. Learning in context is more
                    effective than abstract study.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Block protected time:</strong> Schedule two or three specific 30-minute
                    study sessions per week. Treat them like appointments that cannot be moved.
                  </span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Overcoming the Money Barrier
              </h3>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Explore funded options:</strong> CITB grants, employer training budgets,
                    SJIB/JIB funded programmes, and apprenticeship levy funds can significantly
                    reduce or eliminate course costs.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Use free resources:</strong> Manufacturer CPD (Hager, Schneider, Eaton),
                    IET webinars, YouTube training channels, BS 7671 study groups, and online forums
                    provide significant learning at no cost.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Calculate the ROI:</strong> A &pound;1,200 course that enables you to
                    charge &pound;5 more per hour for inspection work pays for itself in 240 hours
                    &mdash; roughly three months of work.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Tax deductions:</strong> Many training costs for sole traders and
                    limited company directors are tax-deductible business expenses.
                  </span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Overcoming the Confidence Barrier
              </h3>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Start small:</strong> You don&rsquo;t have to enrol on a degree
                    programme tomorrow. Start with a free online module, a manufacturer CPD session,
                    or reading one chapter of a guidance note. Build momentum.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Reframe &ldquo;academic&rdquo;:</strong> If you can read BS 7671,
                    calculate cable sizes, understand three-phase theory, and trace complex faults,
                    you are already performing intellectually demanding work. You are more
                    &ldquo;academic&rdquo; than you think.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Build mastery experiences:</strong> Bandura&rsquo;s most powerful source
                    of self-efficacy. Complete small challenges, accumulate successes, and let your
                    evidence base grow.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Talk to others who have done it:</strong> Every qualified inspector,
                    designer, and business owner started where you are now. Their stories normalise
                    the journey (vicarious experience).
                  </span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Overcoming the Culture Barrier
              </h3>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Find your tribe:</strong> Seek out growth-oriented electricians through
                    trade associations, online communities, training courses, and CPD events. You
                    are not alone in wanting more.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Don&rsquo;t announce prematurely:</strong> You do not need to tell
                    everyone on site that you are studying for a new qualification. Let results
                    speak when they come.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Understand the mockery:</strong> When colleagues mock ambition, it is
                    their fixed mindset speaking. It is about their insecurity, not your decision.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Think long-term:</strong> Your career spans 40+ years. The opinions of
                    one site crew at one point in time should not determine your trajectory.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Role of Environment</p>
                <p className="text-base text-white leading-relaxed">
                  Research consistently shows that your environment &mdash; the people you spend
                  time with, the conversations you have, the standards you are exposed to &mdash;
                  has an enormous influence on your behaviour and beliefs. Jim Rohn&rsquo;s famous
                  observation that &ldquo;you are the average of the five people you spend the most
                  time with&rdquo; is supported by social psychology research on conformity and
                  social influence. If you spend your time with electricians who mock ambition,
                  avoid development, and settle for the minimum, you will unconsciously absorb those
                  norms. If you spend time with electricians who pursue qualifications, share
                  knowledge, discuss career goals, and push each other to improve, you will absorb
                  those norms instead. Actively choosing your professional environment is one of the
                  most powerful strategies for growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Anders Ericsson's Deliberate Practice */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">08</span>
            Anders Ericsson&rsquo;s Deliberate Practice
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Anders Ericsson, a psychologist at Florida State University, spent his career
                studying how people become experts. His research, spanning elite musicians, chess
                grandmasters, athletes, and professionals across many fields, culminated in a
                concept that has transformed our understanding of skill development:{' '}
                <strong>deliberate practice</strong>. Ericsson&rsquo;s work showed that what we
                commonly call &ldquo;natural talent&rdquo; is almost always the result of thousands
                of hours of highly specific, structured practice that the observer never sees. The
                violinist who plays effortlessly, the surgeon who operates with precision, the
                electrician who can trace a fault in minutes &mdash; all of them have engaged in far
                more focused, intentional practice than their less skilled peers.
              </p>

              <p>
                Deliberate practice is not the same as ordinary practice or simply &ldquo;doing the
                job&rdquo;. It has five defining characteristics that distinguish it from repetitive
                work:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>It targets specific weaknesses:</strong> Deliberate practice focuses on
                    the aspects of performance that are weakest, not on repeating what you are
                    already good at. An electrician who is strong at first fix but weak at testing
                    should dedicate practice time to testing sequences, instrument techniques, and
                    documentation &mdash; not more first fix work.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>It pushes beyond current ability:</strong> The task must be just beyond
                    your comfort zone &mdash; difficult enough to require concentrated effort but
                    not so difficult that it is overwhelming. This is the &ldquo;sweet spot&rdquo;
                    where neural plasticity operates most effectively.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>It involves specific, clear goals:</strong> Each practice session has a
                    defined objective. Not &ldquo;I&rsquo;ll study tonight&rdquo; but &ldquo;I will
                    work through five cable calculation problems targeting voltage drop until I can
                    complete them accurately in under three minutes each.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>It includes immediate feedback:</strong> You must be able to assess
                    whether your performance was correct and adjust accordingly. This might come
                    from a mentor, an answer key, a test instrument reading, or a comparison with a
                    known correct method.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>It requires full concentration:</strong> Deliberate practice is mentally
                    demanding. You cannot do it on autopilot. This is why deliberate practice
                    sessions are typically shorter (1&ndash;2 hours) than general work sessions
                    &mdash; the level of concentration required cannot be sustained for eight hours.
                  </span>
                </li>
              </ul>

              <p>
                For electricians, the distinction between ordinary practice and deliberate practice
                is crucial. An electrician who has installed 500 consumer units is not necessarily
                better than one who has installed 200 &mdash; if the first electrician installed all
                500 on autopilot using the same method without reflection, while the second
                electrician treated each one as an opportunity to improve technique, try different
                approaches, check torque settings precisely, and review the quality of their
                terminations critically. The quantity of practice matters far less than the quality
                and intentionality of practice.
              </p>

              <p>
                Ericsson&rsquo;s research also challenged the popular &ldquo;10,000 hours
                rule&rdquo; (attributed to Malcolm Gladwell&rsquo;s popularisation in Outliers).
                Ericsson emphasised that it is not 10,000 hours of any practice that produces
                expertise &mdash; it is 10,000 hours of <strong>deliberate</strong> practice. An
                electrician with 10 years of experience who has done the same domestic rewires
                without reflection has far less expertise than an electrician with five years of
                experience who has deliberately sought out diverse, challenging work and practised
                their weak areas systematically. Experience alone does not produce expertise.
                Deliberate, reflective, effortful practice produces expertise.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Deliberate Practice for Electricians &mdash; Examples
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Fault finding:</strong> Set up practice fault scenarios on a training
                      board. Time yourself. Get feedback from a mentor. Repeat with different fault
                      types until you can diagnose systematically and quickly.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Cable calculations:</strong> Work through 10 problems per day
                      targeting your weakest area (voltage drop, grouping factors, thermal
                      insulation). Check answers immediately. Analyse errors and redo incorrect
                      problems.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Inspection:</strong> Practise visual inspection on real installations
                      with a checklist. Compare your findings with an experienced inspector&rsquo;s
                      findings. Identify what you missed and why.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>BS 7671 knowledge:</strong> Test yourself on specific regulations.
                      Don&rsquo;t just read &mdash; actively recall. Cover the regulation, state
                      what it says, then check. Active recall is a form of deliberate practice that
                      dramatically improves retention.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">09</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has examined the barriers that prevent electricians from growing and
                the psychological frameworks that explain how to overcome them. The key points to
                carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Grit</strong> (passion + perseverance) predicts success better than IQ
                    or talent. Duckworth&rsquo;s research at the University of Pennsylvania
                    demonstrates that sustained effort towards long-term goals is the single most
                    important factor in achievement.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Six common barriers</strong> &mdash; time, money, confidence, culture,
                    comfort zone, and information &mdash; hold tradespeople back. Each can be
                    addressed with specific, practical strategies.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The comfort zone model</strong> (Comfort &rarr; Fear &rarr; Learning
                    &rarr; Growth) explains why growth feels uncomfortable and why pushing through
                    discomfort is necessary for development.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Self-efficacy</strong> (Bandura) &mdash; your belief in your ability to
                    succeed &mdash; directly affects whether you attempt a task, how hard you try,
                    and whether you persist. It is built through mastery experiences, vicarious
                    experience, social persuasion, and physiological readiness.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Imposter syndrome</strong> is a feeling, not a fact. It is normal during
                    career transitions and affects approximately 70% of people. It fades with
                    accumulated mastery experiences.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Deliberate practice</strong> (Ericsson) &mdash; focused, effortful
                    practice targeting weaknesses with clear goals and immediate feedback &mdash; is
                    what produces expertise. Simply &ldquo;doing the job&rdquo; for years does not
                    guarantee improvement.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Environment matters:</strong> Surrounding yourself with growth-oriented
                    people is one of the most powerful strategies for sustained development.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Module 2, we will move from
                  understanding growth to taking action. You will learn how to set effective goals
                  using research-backed frameworks, including SMART goals, Locke &amp;
                  Latham&rsquo;s Goal Setting Theory, and implementation intentions. You will create
                  concrete goals for your electrical career and build a system for tracking and
                  achieving them.
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
            <Link to="../gs-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-2">
              Next Module: Setting Effective Goals
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
