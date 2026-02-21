import {
  ArrowLeft,
  Smile,
  CheckCircle,
  BookOpen,
  Lightbulb,
  HelpCircle,
  Target,
  Brain,
  BarChart3,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'ei-definition',
    question: 'Who first coined the term "emotional intelligence" in an academic journal in 1990?',
    options: ['Daniel Goleman', 'Peter Salovey and John Mayer', 'Reuven Bar-On', 'Howard Gardner'],
    correctIndex: 1,
    explanation:
      'Peter Salovey and John Mayer first defined emotional intelligence in their 1990 journal article. Daniel Goleman later popularised the concept in his 1995 bestselling book.',
  },
  {
    id: 'ei-vs-iq',
    question:
      'According to TalentSmart research, what percentage of job performance is accounted for by emotional intelligence?',
    options: ['28%', '42%', '58%', '75%'],
    correctIndex: 2,
    explanation:
      "TalentSmart's research across more than 500,000 people found that EQ accounts for 58% of performance across all types of jobs, making it the strongest predictor of workplace performance.",
  },
  {
    id: 'ei-four-branch',
    question:
      'In the four-branch model of emotional intelligence, what is the highest (most complex) branch?',
    options: [
      'Perceiving emotions',
      'Using emotions to facilitate thought',
      'Understanding emotions',
      'Managing emotions',
    ],
    correctIndex: 3,
    explanation:
      "Managing emotions is the highest branch in Salovey and Mayer's four-branch model. The branches build hierarchically: you must first perceive emotions, then use them, understand them, and finally manage them effectively.",
  },
];

const faqs = [
  {
    question: 'Is emotional intelligence the same as being emotional?',
    answer:
      'No. Emotional intelligence is about understanding and managing emotions effectively, not about being more emotional. People with high EI can be calm and measured precisely because they understand their emotions and have developed strategies for regulating them. Being emotionally intelligent means you can recognise what you are feeling, understand why, and choose how to respond rather than simply reacting. In fact, some of the most emotionally intelligent people you will meet on site are those who remain composed under pressure, defuse tense situations, and communicate clearly even when things go wrong.',
  },
  {
    question:
      'Can emotional intelligence really be developed, or is it something you are born with?',
    answer:
      "Research conclusively shows that emotional intelligence can be developed at any age. Reuven Bar-On's EQ-i studies demonstrate measurable improvement through targeted training and practice. Unlike IQ, which is relatively stable after early adulthood, EI continues to grow throughout life — particularly when you actively work on it. Neuroplasticity research confirms that the brain can form new neural pathways at any age, meaning the emotional regulation skills and social awareness that underpin EI can be strengthened through deliberate practice. This course is designed to help you do exactly that.",
  },
  {
    question: "How is EI different from 'people skills' or 'common sense'?",
    answer:
      "Emotional intelligence is a specific, measurable set of competencies backed by decades of peer-reviewed research. While people skills and common sense overlap with some aspects of EI, Goleman's model identifies 25 distinct competencies across five domains — each of which can be assessed, developed, and improved. Common sense is a broad, informal concept, whereas EI provides a structured framework with validated psychometric tools (such as Bar-On's EQ-i and the MSCEIT) that can quantify your abilities and track your progress. Think of it this way: common sense tells you to be nice to people, but EI teaches you how to recognise when someone is struggling, regulate your own frustration, and communicate in a way that builds trust.",
  },
  {
    question: 'Why should electricians and construction workers care about emotional intelligence?',
    answer:
      'TalentSmart data shows emotional intelligence matters in every job type — it accounts for 58% of performance regardless of role or industry. In construction specifically, higher EI leads to better safety outcomes because emotionally aware workers notice when colleagues are distracted or stressed. Team coordination improves because people with high EI communicate more effectively and resolve conflicts before they escalate. Client relationships strengthen because emotionally intelligent tradespeople read situations accurately and respond appropriately. Career progression accelerates because the skills that separate a good electrician from a great one are often interpersonal — winning work, managing apprentices, leading teams, and building a reputation that attracts referrals.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which researchers first coined the term "emotional intelligence" in 1990?',
    options: [
      'Daniel Goleman and Howard Gardner',
      'Peter Salovey and John Mayer',
      'Reuven Bar-On and Travis Bradberry',
      'Paul Ekman and Martin Seligman',
    ],
    correctAnswer: 1,
    explanation:
      'Peter Salovey and John Mayer published the first academic paper defining emotional intelligence in 1990. Goleman later popularised the concept in his 1995 book, but Salovey and Mayer were the original researchers.',
  },
  {
    id: 2,
    question:
      'According to TalentSmart research across 500,000+ people, EQ accounts for what percentage of job performance?',
    options: ['28%', '42%', '58%', '75%'],
    correctAnswer: 2,
    explanation:
      "TalentSmart's landmark study of more than 500,000 people found that emotional intelligence accounts for 58% of performance across all types of jobs, making it the single strongest predictor of workplace performance.",
  },
  {
    id: 3,
    question: "What was the title of Daniel Goleman's 1995 bestselling book?",
    options: [
      'Working with Emotional Intelligence',
      'Emotional Intelligence: Why It Can Matter More Than IQ',
      'The EQ Edge',
      'Social Intelligence',
    ],
    correctAnswer: 1,
    explanation:
      'Goleman\'s 1995 book was titled "Emotional Intelligence: Why It Can Matter More Than IQ". It spent over a year on the New York Times bestseller list and brought the concept of EI to a global audience. "Working with Emotional Intelligence" was his 1998 follow-up.',
  },
  {
    id: 4,
    question: 'In the four-branch model, which branch is the foundation (lowest level)?',
    options: [
      'Managing emotions',
      'Understanding emotions',
      'Using emotions to facilitate thought',
      'Perceiving emotions',
    ],
    correctAnswer: 3,
    explanation:
      "Perceiving emotions is the foundation of Salovey and Mayer's four-branch model. You must first be able to accurately perceive emotions in yourself and others before you can use, understand, or manage them. The branches build hierarchically from this base.",
  },
  {
    id: 5,
    question: "Bar-On's EQ-i model is significant because it demonstrated that EI:",
    options: [
      'Cannot be changed after childhood',
      'Is identical to IQ',
      'Can be measured through validated psychometric tools',
      'Only applies to leadership roles',
    ],
    correctAnswer: 2,
    explanation:
      "Reuven Bar-On's 1997 Emotional Quotient Inventory (EQ-i) was groundbreaking because it demonstrated that emotional intelligence can be measured through validated psychometric assessment. This proved that EI is not just a vague concept but a quantifiable set of competencies that can be assessed and developed.",
  },
  {
    id: 6,
    question:
      'Which of the following is the best example of emotional intelligence on a construction site?',
    options: [
      'Completing work ahead of schedule',
      'Noticing an apprentice is withdrawn and checking in with them',
      'Having a higher NVQ level than colleagues',
      'Knowing all the BS 7671 regulations by heart',
    ],
    correctAnswer: 1,
    explanation:
      'Noticing that an apprentice is withdrawn and proactively checking in with them demonstrates emotional intelligence — specifically the ability to perceive emotions in others and respond with empathy. Technical knowledge and speed of work, while valuable, are cognitive skills rather than emotional competencies.',
  },
  {
    id: 7,
    question: 'What distinguishes EI from IQ according to the research?',
    options: [
      'EI is more important than IQ in every situation',
      'IQ can be developed but EI cannot',
      'EI can be developed throughout life whereas IQ is relatively fixed',
      'They measure the same thing using different scales',
    ],
    correctAnswer: 2,
    explanation:
      'Research consistently shows that IQ is relatively stable after early adulthood, whereas emotional intelligence can be developed and improved throughout life. This is one of the most important distinctions — it means that regardless of where you start, you can increase your EI through practice and training.',
  },
  {
    id: 8,
    question: "How many composite scales does Bar-On's EQ-i model contain?",
    options: ['Three', 'Four', 'Five', 'Six'],
    correctAnswer: 2,
    explanation:
      "Bar-On's EQ-i model contains five composite scales: intrapersonal (self-awareness and self-expression), interpersonal (social awareness and relationships), stress management (emotional regulation and impulse control), adaptability (change management and problem-solving), and general mood (optimism and happiness).",
  },
];

export default function EIModule1Section1() {
  useSEO({
    title: 'What Is Emotional Intelligence? | EI Module 1.1',
    description:
      "Defining emotional intelligence using Salovey & Mayer's academic framework, Goleman's popularised model, EI vs IQ research, the four-branch model, and Bar-On's EQ-i — with construction-specific examples.",
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
            <Link to="../ei-module-1">
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
            <Smile className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What Is Emotional Intelligence?
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding how emotional intelligence was defined, why it matters more than IQ for
            workplace success, and how it applies to your career in construction
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Definition:</strong> EI = perceiving, using, understanding and managing
                emotions
              </li>
              <li>
                <strong>Research:</strong> TalentSmart &mdash; 58% of job performance is EQ
              </li>
              <li>
                <strong>Key fact:</strong> EI is measurable and developable at any age
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Safety:</strong> Emotionally aware workers spot risks others miss
              </li>
              <li>
                <strong>Teams:</strong> Higher EI = better communication and fewer conflicts
              </li>
              <li>
                <strong>Career:</strong> EI is the strongest predictor of career progression
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define emotional intelligence using Salovey & Mayer's academic definition",
              'Explain how Goleman popularised EI in his 1995 bestseller',
              'Distinguish between EI and IQ using TalentSmart research findings',
              "Describe Bar-On's EQ-i model and why EI is measurable",
              'Outline the four-branch model of emotional intelligence',
              'Give construction-specific examples of EI in action',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Defining Emotional Intelligence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Defining Emotional Intelligence
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Emotional intelligence is a concept that has transformed our understanding of human
                performance, leadership and workplace success. It describes our ability to
                recognise, understand and manage emotions &mdash; both our own and those of the
                people around us. Unlike technical knowledge, which tells you <em>what</em> to do,
                emotional intelligence determines <em>how well</em> you do it, particularly when
                working with others, handling pressure, or navigating conflict.
              </p>

              <p>
                The term &ldquo;emotional intelligence&rdquo; was first coined in an academic
                journal in 1990 by two American psychologists, <strong>Peter Salovey</strong> (Yale
                University) and <strong>John D. Mayer</strong> (University of New Hampshire). In
                their seminal paper published in the journal{' '}
                <em>Imagination, Cognition and Personality</em>, they defined emotional intelligence
                as:
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Salovey &amp; Mayer (1990):</strong>{' '}
                  <em>
                    &ldquo;The ability to monitor one&rsquo;s own and others&rsquo; feelings and
                    emotions, to discriminate among them and to use this information to guide
                    one&rsquo;s thinking and actions.&rdquo;
                  </em>
                </p>
              </div>

              <p>
                This academic definition established emotional intelligence as a legitimate area of
                psychological study. It framed EI not as a personality trait or a vague &ldquo;soft
                skill&rdquo;, but as a specific set of cognitive abilities that could be studied,
                measured and developed. Salovey and Mayer&rsquo;s work laid the scientific
                foundation upon which all subsequent EI research has been built.
              </p>

              <p>
                However, it was <strong>Daniel Goleman</strong>, a science journalist and
                psychologist, who brought emotional intelligence to the mainstream. His 1995 book{' '}
                <em>&ldquo;Emotional Intelligence: Why It Can Matter More Than IQ&rdquo;</em> became
                a global bestseller, spending more than a year on the New York Times bestseller list
                and selling over five million copies worldwide. Goleman argued that emotional
                intelligence was at least as important as traditional cognitive intelligence (IQ) in
                determining life success, and he defined it in more accessible terms:
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Goleman (1995):</strong>{' '}
                  <em>
                    &ldquo;The capacity for recognising our own feelings and those of others, for
                    motivating ourselves, and for managing emotions well in ourselves and in our
                    relationships.&rdquo;
                  </em>
                </p>
              </div>

              <p>
                There is an important distinction between these two definitions. Salovey and
                Mayer&rsquo;s academic definition focuses on EI as a{' '}
                <strong>cognitive ability</strong> &mdash; a set of mental skills for processing
                emotional information. Goleman&rsquo;s popularised definition is broader,
                encompassing not just abilities but also{' '}
                <strong>motivations, self-regulation and social competencies</strong>. Both
                perspectives are valuable, and both inform the way we understand and develop
                emotional intelligence today.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Distinctions:</p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Salovey &amp; Mayer:</strong> EI as a cognitive
                      ability &mdash; processing emotional information accurately
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Goleman:</strong> EI as a broad competency
                      framework &mdash; self-awareness, self-regulation, motivation, empathy, social
                      skills
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Bar-On:</strong> EI as measurable traits
                      &mdash; can be assessed through validated psychometric tools
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">All three agree:</strong> EI is real,
                      measurable, and can be developed throughout life
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                For the purposes of this course, we will draw on all three models. Salovey and Mayer
                give us the rigorous academic framework. Goleman gives us the practical,
                workplace-focused competency model. Bar-On gives us the evidence that EI can be
                measured and improved. Together, they provide a comprehensive understanding of what
                emotional intelligence is and how you can develop it.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: EI vs IQ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            EI vs IQ: What the Research Shows
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most compelling arguments for developing emotional intelligence comes
                from the research comparing EI and IQ as predictors of workplace performance. For
                decades, IQ was considered the gold standard for predicting success &mdash; in
                education, in careers, and in life. The assumption was simple: smarter people
                perform better. But the research tells a very different story.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Research Finding</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-rose-400">58%</p>
                    <p className="text-sm text-white">
                      of job performance is predicted by emotional intelligence, according to
                      TalentSmart&rsquo;s research across more than 500,000 people. EQ was found to
                      be the strongest predictor of performance, outperforming IQ, experience, and
                      technical skill.
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-rose-400">90%</p>
                    <p className="text-sm text-white">
                      of top performers have high emotional intelligence. Conversely, only 20% of
                      bottom performers have high EQ. High IQ alone does not guarantee high
                      performance.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Dr Travis Bradberry, co-founder of TalentSmart and co-author of{' '}
                <em>Emotional Intelligence 2.0</em>, conducted one of the largest studies ever
                undertaken on emotional intelligence in the workplace. His team tested the EQ of
                more than 500,000 people alongside their job performance ratings. The findings were
                striking: EQ was the single strongest predictor of performance, accounting for 58%
                of success in all types of jobs &mdash; from entry-level roles to senior leadership.
              </p>

              <p>
                Perhaps even more importantly, the research showed that{' '}
                <strong>IQ is relatively fixed</strong> after early adulthood. Your cognitive
                intelligence is largely determined by genetics and early development, and it does
                not change significantly throughout your working life. Emotional intelligence, by
                contrast, <strong>can be developed at any age</strong>. The neural pathways
                associated with emotional regulation, empathy and social awareness can be
                strengthened through deliberate practice &mdash; a concept known as{' '}
                <strong>neuroplasticity</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Two Electricians
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Consider two electricians who both hold an NVQ Level 3, both have the same
                  technical qualifications, and both passed their AM2 assessment. On paper, they are
                  identical. But their careers take very different paths:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-2">
                      Electrician A (Lower EI)
                    </p>
                    <ul className="text-sm text-white space-y-1">
                      <li>Loses temper when plans change on site</li>
                      <li>Struggles to communicate with main contractors</li>
                      <li>Apprentices dread working with them</li>
                      <li>Clients do not request them back</li>
                      <li>Career plateaus at the same level for years</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-2">
                      Electrician B (Higher EI)
                    </p>
                    <ul className="text-sm text-white space-y-1">
                      <li>Adapts calmly when plans change on site</li>
                      <li>Builds strong working relationships</li>
                      <li>Apprentices thrive under their supervision</li>
                      <li>Clients specifically request them for future work</li>
                      <li>Progresses to supervisor, then project manager</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-white mt-3">
                  The difference is not technical knowledge &mdash; it is emotional intelligence.
                  Electrician B can read situations, manage their own reactions, communicate
                  effectively, and build the relationships that drive career success.
                </p>
              </div>

              <p>
                This does not mean IQ does not matter. Cognitive intelligence is essential for
                technical tasks, problem-solving, and learning new skills. But once you have met the
                baseline cognitive requirements for a role (which most qualified electricians have),
                it is emotional intelligence that determines how far you go. Bradberry summarises it
                well: <em>&ldquo;Your IQ gets you hired, but your EQ gets you promoted.&rdquo;</em>
              </p>

              <p>
                The practical implication is powerful: even if you cannot change your IQ, you{' '}
                <strong>can</strong> significantly improve your emotional intelligence. Every
                section of this course is designed to help you do exactly that &mdash; with
                strategies, techniques, and practice exercises grounded in the research.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Four-Branch Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            The Four-Branch Model
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Salovey and Mayer did not just define emotional intelligence &mdash; they also
                developed a structured model for understanding how it works. Their{' '}
                <strong>four-branch model</strong> (also known as the ability model) organises
                emotional intelligence into four distinct but interconnected abilities, arranged in
                a hierarchy from the most basic to the most complex.
              </p>

              <p>
                The key insight of this model is that the branches are <strong>hierarchical</strong>{' '}
                &mdash; each one builds on the ones below it. You cannot effectively manage emotions
                (the highest branch) if you cannot first perceive, use and understand them. This is
                why developing EI is a progressive journey, not a single skill to be learned.
              </p>

              {/* Four-Branch Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">Perceiving Emotions</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    The foundation. The ability to accurately identify emotions in yourself and
                    others through facial expressions, tone of voice, body language and other cues.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> Noticing that a normally
                      talkative apprentice has gone quiet, or recognising the tension in a
                      subcontractor&rsquo;s voice during a phone call.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Using Emotions to Facilitate Thought
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    The ability to harness emotions to aid cognitive processes such as
                    problem-solving, creativity and decision-making. Different emotional states can
                    enhance different types of thinking.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> Using the focus that comes
                      from mild anxiety to double-check a complex DB installation, or channelling
                      enthusiasm to motivate a team during a push to meet a deadline.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">Understanding Emotions</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    The ability to comprehend emotional language, recognise how emotions evolve over
                    time, and understand the relationships between different emotions. This includes
                    knowing what causes specific emotions and how they blend together.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> Understanding that a
                      colleague&rsquo;s anger about a design change might actually stem from fear of
                      falling behind schedule, or that frustration often masks underlying anxiety.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm font-medium text-rose-400">Managing Emotions</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    The highest branch. The ability to regulate emotions in yourself and influence
                    them in others. This includes staying open to both pleasant and unpleasant
                    feelings and choosing how to respond rather than simply reacting.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> Remaining calm when a
                      client questions your workmanship, or helping to de-escalate a heated
                      disagreement between trades on a busy site.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Hierarchical Structure:</strong> Think of the
                  four branches as a building. Perceiving emotions is the foundation &mdash; without
                  it, the rest cannot stand. Using emotions is the ground floor. Understanding
                  emotions is the first floor. Managing emotions is the top floor. You need all four
                  levels for a complete, functional building &mdash; and you build from the bottom
                  up.
                </p>
              </div>

              <p>
                The four-branch model is particularly useful because it shows that emotional
                intelligence is not a single skill but a set of interconnected abilities. You may be
                strong in one branch but weaker in another. For example, many people in the trades
                are excellent at perceiving emotions (they can read a room instantly) but may
                struggle with managing emotions (they react impulsively when frustrated). The model
                helps you identify where your strengths lie and where you have room to develop.
              </p>

              <p>
                In later modules of this course, you will work on each of these branches
                systematically &mdash; building from the foundation of perceiving emotions all the
                way up to the advanced skill of managing emotions in yourself and others.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Bar-On's EQ-i Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Bar-On&rsquo;s EQ-i Model
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While Salovey and Mayer provided the academic framework and Goleman brought EI to
                the mainstream, it was <strong>Reuven Bar-On</strong>, an Israeli psychologist, who
                made a breakthrough that transformed how we think about emotional intelligence: he
                proved it could be <strong>measured</strong>.
              </p>

              <p>
                In 1997, Bar-On published the <strong>Emotional Quotient Inventory (EQ-i)</strong>,
                the first scientifically validated tool for measuring emotional intelligence. Just
                as IQ tests measure cognitive intelligence, the EQ-i measures emotional and social
                intelligence through a self-report questionnaire. It was a landmark moment because
                it moved EI from a theoretical concept to a practical, quantifiable construct.
              </p>

              <p>
                Bar-On&rsquo;s model organises emotional intelligence into five composite scales,
                each containing specific sub-components:
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Intrapersonal (Self-Awareness &amp; Self-Expression)
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Understanding your own emotions, being aware of your strengths and limitations,
                    and expressing your feelings effectively. This includes self-regard, emotional
                    self-awareness, assertiveness, independence and self-actualisation.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Interpersonal (Social Awareness &amp; Relationships)
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Understanding others&rsquo; emotions, maintaining satisfying relationships, and
                    contributing positively to your social group. This includes empathy, social
                    responsibility, and interpersonal relationships.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Stress Management (Emotional Regulation)
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Managing and controlling your emotions effectively, particularly under pressure.
                    This includes stress tolerance and impulse control &mdash; both critical on a
                    construction site where pressure is constant and the consequences of losing
                    control can be serious.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Adaptability (Change Management)
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Coping with change, adjusting your emotions and behaviour to new situations, and
                    solving problems effectively. This includes reality-testing, flexibility, and
                    problem-solving. In construction, where no two days are the same and plans
                    change constantly, adaptability is essential.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      General Mood (Optimism &amp; Self-Motivation)
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Your overall emotional outlook &mdash; the capacity to be optimistic, to find
                    satisfaction in life and work, and to maintain a positive attitude even when
                    facing difficulties. This includes optimism and happiness, which act as both
                    outcomes of high EI and drivers that sustain it.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The key insight from Bar-On:</strong> Emotional
                  intelligence is not fixed &mdash; it can be measured, trained, and improved at any
                  age. His research demonstrated that targeted interventions (like the training in
                  this course) produce measurable improvements in EQ-i scores. This is one of the
                  most empowering findings in the field: wherever you are starting from, you can get
                  better.
                </p>
              </div>

              <p>
                The EQ-i has been translated into more than 30 languages and used in research across
                more than 50 countries. It has been applied in clinical settings, education,
                corporate development, and military contexts. Its widespread adoption demonstrates
                that emotional intelligence is not a Western cultural concept but a universal aspect
                of human functioning that applies across cultures and industries &mdash; including
                construction.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: EI in the Construction Context */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            EI in the Construction Context
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Emotional intelligence is not an abstract academic concept &mdash; it is something
                you use every day on site, whether you realise it or not. Every interaction with a
                colleague, every conversation with a client, every moment of frustration with a
                design change, and every decision to check in on someone who seems off &mdash; all
                of these involve emotional intelligence.
              </p>

              <p>
                The difference between someone with developed EI and someone without it is not
                whether they experience emotions, but whether they can{' '}
                <strong>recognise, understand and respond to them effectively</strong>. Here are
                some examples of what emotional intelligence looks like in everyday construction
                work:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">EI in Action on Site</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Sensing when an apprentice is struggling but not saying anything
                      </p>
                      <p className="text-sm text-white">
                        A first-year apprentice has been making more mistakes than usual and has
                        stopped asking questions. Rather than criticising their work, you recognise
                        the behavioural change, pull them aside at break, and ask if everything is
                        alright. It turns out they are dealing with problems at home. Your awareness
                        and approach prevent the situation from escalating.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Reading tension between subcontractor teams before it escalates
                      </p>
                      <p className="text-sm text-white">
                        The plumbing team and the electrical team are both trying to route their
                        services through the same ceiling void. You can feel the frustration
                        building. Rather than waiting for a confrontation, you suggest a quick
                        coordination meeting to agree on routing before anyone loses their temper.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Noticing your own frustration rising during a difficult client conversation
                      </p>
                      <p className="text-sm text-white">
                        A client is questioning why the job is taking longer than they expected. You
                        feel your chest tighten and your tone becoming defensive. Instead of
                        snapping back, you take a breath, acknowledge their concern, and calmly
                        explain the situation. The client feels heard, and the relationship stays
                        intact.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Managing the emotional impact of working away from family
                      </p>
                      <p className="text-sm text-white">
                        You are on a three-week contract away from home. The loneliness and
                        disconnection start to affect your mood and motivation. Rather than bottling
                        it up or turning to alcohol, you recognise what you are feeling, video-call
                        your family regularly, stay physically active, and talk to a colleague you
                        trust.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                None of these examples require a psychology degree. They require{' '}
                <strong>awareness</strong> (noticing emotions), <strong>understanding</strong>{' '}
                (knowing what those emotions mean), and <strong>skill</strong> (responding
                effectively). These are the core competencies of emotional intelligence, and they
                are as practical and important on a construction site as knowing how to wire a
                consumer unit.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Construction Industry Reality:</strong>{' '}
                  Construction is a high-pressure, high-stakes environment. Deadlines are tight,
                  budgets are squeezed, conditions are tough, and the workforce is under constant
                  physical and mental strain. In this context, emotional intelligence is not a
                  luxury &mdash; it is a survival skill. The electricians, foremen, and project
                  managers who thrive in construction are almost always those with high emotional
                  intelligence, regardless of whether they have ever heard the term.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Why This Course Matters for You */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Why This Course Matters for You
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Everything you have learned in this section &mdash; the definitions, the research,
                the models &mdash; points to one conclusion: emotional intelligence is the single
                biggest predictor of workplace performance, it can be developed at any age, and
                developing it will have a direct, measurable impact on your career in construction.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Takeaway</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Emotional intelligence is not a vague &ldquo;soft skill&rdquo; &mdash; it is a
                  specific, measurable, developable set of competencies that accounts for 58% of job
                  performance across all industries and roles. In construction, where teamwork,
                  communication and pressure management are daily requirements, EI is arguably even
                  more important.
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>EI is real and backed by decades of research</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>It can be measured through validated tools like the EQ-i</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>It can be developed and improved at any age</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>It predicts performance more accurately than IQ or experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>This course will teach you how to develop it systematically</span>
                  </li>
                </ul>
              </div>

              <p>
                Over the five modules of this course, you will work through each of Goleman&rsquo;s
                five domains in depth:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Lies Ahead</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm text-white">
                      <strong>Understanding Emotional Intelligence</strong> &mdash; This module. The
                      foundations, the science, and why it matters.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm text-white">
                      <strong>Self-Awareness</strong> &mdash; Recognising your emotions, triggers,
                      strengths and blind spots.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm text-white">
                      <strong>Self-Regulation</strong> &mdash; Managing your reactions, impulse
                      control, and accountability.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm text-white">
                      <strong>Motivation &amp; Empathy</strong> &mdash; Internal drive, resilience,
                      understanding others, and perspective-taking.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <p className="text-sm text-white">
                      <strong>Social Skills &amp; Applying EI</strong> &mdash; Communication,
                      conflict management, leadership, and your personal development plan.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Each module builds on the previous one, just as the four-branch model builds
                hierarchically. By the end of this course, you will have a comprehensive
                understanding of emotional intelligence and, more importantly, a practical toolkit
                for applying it every day on site, with clients, and in your personal life.
              </p>

              <p>
                Let us begin by exploring the science behind emotions in the next section &mdash;
                because understanding <em>how</em> emotions work in the brain is the first step to
                managing them effectively.
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
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
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
            <Link to="../ei-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-1-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
