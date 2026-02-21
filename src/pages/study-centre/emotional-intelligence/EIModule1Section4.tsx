import {
  ArrowLeft,
  Layers,
  CheckCircle,
  Eye,
  ShieldCheck,
  Flame,
  Heart,
  Users,
  Target,
  Lightbulb,
  BarChart3,
  GitCompareArrows,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'five-domains',
    question:
      "Which of the following correctly lists all five of Goleman's EI domains in the order they build?",
    options: [
      'Empathy, social skills, motivation, self-regulation, self-awareness',
      'Self-awareness, self-regulation, motivation, empathy, social skills',
      'Social skills, empathy, motivation, self-regulation, self-awareness',
      'Self-regulation, self-awareness, empathy, motivation, social skills',
    ],
    correctIndex: 1,
    explanation:
      "Goleman's five domains build sequentially: self-awareness (the foundation), self-regulation, motivation, empathy, and social skills (the capstone). You must understand your own emotions before you can manage them, and you must manage yourself before you can effectively relate to others.",
  },
  {
    id: 'self-awareness',
    question: 'Why is self-awareness considered the foundation of all emotional intelligence?',
    options: [
      'Because it is the easiest domain to develop',
      'Because you cannot manage, motivate, or empathise effectively without first understanding your own emotions',
      'Because it was the first domain Goleman discovered',
      'Because self-awareness is the only domain that matters in construction',
    ],
    correctIndex: 1,
    explanation:
      'Self-awareness is the foundation because every other EI competency depends on it. You cannot regulate emotions you do not recognise (self-regulation). You cannot sustain motivation without understanding what drives you. You cannot empathise with others if you cannot first identify emotions in yourself. And you cannot use social skills effectively without awareness of your own impact on others.',
  },
  {
    id: 'model-comparison',
    question:
      "What is the main difference between Goleman's model and Salovey & Mayer's four-branch model?",
    options: [
      "Goleman's model includes only cognitive abilities, while Salovey & Mayer include personality traits",
      'They are identical models with different names',
      "Salovey & Mayer focus on EI as a cognitive ability, while Goleman's model is broader, including motivation and social competencies",
      "Goleman's model is scientifically validated, while Salovey & Mayer's is not",
    ],
    correctIndex: 2,
    explanation:
      "Salovey and Mayer's four-branch model treats EI as a specific set of cognitive abilities (perceiving, using, understanding, managing emotions). Goleman's model is broader, encompassing not only abilities but also motivational factors and social competencies. Both are scientifically grounded, but they approach EI from different angles — Salovey & Mayer from a pure ability perspective, Goleman from a workplace competency perspective.",
  },
];

const faqs = [
  {
    question: 'Do I need to be strong in all five domains to have high emotional intelligence?',
    answer:
      'No one is equally strong in all five domains — and that is perfectly normal. Most people have natural strengths in some areas and development needs in others. A site foreman might have excellent empathy and social skills but struggle with self-regulation under pressure. An apprentice might be highly self-aware but still developing their social skills. The five-domain framework is not about perfection — it is about understanding where you are strong, where you have room to grow, and having a roadmap for development. This course will help you assess your own profile and create a targeted development plan.',
  },
  {
    question:
      "Why does Goleman's model have five domains while Salovey & Mayer's has four branches?",
    answer:
      "The models approach emotional intelligence from different perspectives. Salovey and Mayer's four-branch model treats EI as a pure cognitive ability — the capacity to process emotional information accurately. Their four branches (perceiving, using, understanding, managing) are all about mental processing. Goleman's model takes a broader, more workplace-oriented approach. He includes not only the cognitive abilities but also motivational factors (internal drive, optimism, commitment) and interpersonal competencies (empathy, social skills) that predict real-world performance. Think of Salovey and Mayer as the scientific foundation and Goleman as the practical application framework.",
  },
  {
    question: 'Can I develop all five domains at the same time, or should I work on them in order?',
    answer:
      'While you can work on multiple domains simultaneously, there is a logical sequence that makes development more effective. Self-awareness should come first because it underpins everything else. Self-regulation builds on self-awareness (you cannot manage what you do not recognise). Motivation draws on both self-awareness and self-regulation. Empathy extends your awareness outward to others. Social skills integrate all previous domains into effective interpersonal behaviour. This course follows this sequence deliberately. However, in practice, developing one domain naturally strengthens the others — they are interconnected, not isolated.',
  },
  {
    question: 'Which EI model is the best one?',
    answer:
      "There is no single 'best' model — each has strengths for different purposes. Salovey and Mayer's four-branch model is the most academically rigorous and is preferred in research settings. Goleman's five-domain model is the most practical for workplace development and is widely used in corporate training. Bar-On's EQ-i model is the most useful for measurement and assessment. In this course, we draw on all three. Salovey and Mayer give us the scientific foundation. Goleman gives us the practical framework for development. Bar-On gives us the evidence that EI can be measured and improved. Together, they provide a comprehensive approach to understanding and developing emotional intelligence.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "How many domains does Goleman's emotional intelligence model contain?",
    options: ['Three', 'Four', 'Five', 'Six'],
    correctAnswer: 2,
    explanation:
      "Goleman's model contains five domains: self-awareness, self-regulation, motivation, empathy, and social skills. These are further broken down into 25 specific competencies.",
  },
  {
    id: 2,
    question:
      "Which domain is considered the foundation of emotional intelligence in Goleman's model?",
    options: ['Self-regulation', 'Self-awareness', 'Empathy', 'Social skills'],
    correctAnswer: 1,
    explanation:
      'Self-awareness is the foundation because all other EI competencies depend on it. You cannot regulate emotions you do not recognise, empathise effectively without understanding your own emotional states, or use social skills without awareness of your impact on others.',
  },
  {
    id: 3,
    question:
      "In Goleman's model, which two domains are considered 'personal competencies' (focused inward)?",
    options: [
      'Empathy and social skills',
      'Self-awareness and self-regulation',
      'Motivation and empathy',
      'Self-regulation and social skills',
    ],
    correctAnswer: 1,
    explanation:
      'Self-awareness and self-regulation are the personal competencies — they are focused inward on understanding and managing your own emotions. Empathy and social skills are the social competencies — they are focused outward on understanding and influencing others. Motivation bridges the two.',
  },
  {
    id: 4,
    question: 'Which of the following is a key competency within the self-regulation domain?',
    options: [
      'Emotional self-awareness',
      'Impulse control and trustworthiness',
      'Reading the room',
      'Building rapport',
    ],
    correctAnswer: 1,
    explanation:
      "Impulse control and trustworthiness are key competencies within self-regulation. Emotional self-awareness belongs to self-awareness. 'Reading the room' relates to empathy. Building rapport is a social skill.",
  },
  {
    id: 5,
    question:
      "How many specific competencies does Goleman's full model identify across the five domains?",
    options: ['10', '15', '20', '25'],
    correctAnswer: 3,
    explanation:
      "Goleman's full model identifies 25 specific competencies distributed across the five domains. These range from emotional self-awareness and accurate self-assessment (self-awareness) to influence, communication, and teamwork (social skills).",
  },
  {
    id: 6,
    question:
      'Which EI model was the first to provide a validated psychometric tool for measuring emotional intelligence?',
    options: [
      "Goleman's five-domain model",
      "Salovey & Mayer's four-branch model",
      "Bar-On's EQ-i model",
      "Ekman's emotional taxonomy",
    ],
    correctAnswer: 2,
    explanation:
      "Bar-On's EQ-i (Emotional Quotient Inventory), published in 1997, was the first scientifically validated psychometric tool for measuring emotional intelligence. While Salovey & Mayer later developed the MSCEIT, Bar-On's tool was the first to demonstrate that EI could be quantified through standardised assessment.",
  },
  {
    id: 7,
    question:
      'A construction foreman notices rising tension between two subcontractor teams and arranges a coordination meeting before conflict erupts. Which two EI domains is the foreman primarily using?',
    options: [
      'Self-awareness and self-regulation',
      'Empathy and social skills',
      'Motivation and self-awareness',
      'Self-regulation and motivation',
    ],
    correctAnswer: 1,
    explanation:
      "The foreman is using empathy (perceiving the emotional state of the teams and understanding the potential for conflict) and social skills (taking proactive action to manage the situation through communication and conflict resolution). This is a perfect example of the outward-facing 'social competencies' in action.",
  },
  {
    id: 8,
    question: 'Why are Goleman\'s five domains described as "building sequentially"?',
    options: [
      'Because you can only develop one domain per year',
      'Because each domain builds on and depends upon the domains that come before it',
      'Because Goleman published them in five separate books over five years',
      'Because they correspond to five stages of career development',
    ],
    correctAnswer: 1,
    explanation:
      "The domains build sequentially because each depends on the ones before it. Self-awareness is the foundation — you cannot regulate emotions you don't recognise. Self-regulation builds on self-awareness. Motivation draws on both. Empathy extends awareness outward. Social skills integrate everything. Skipping a foundational domain undermines the ones above it.",
  },
];

export default function EIModule1Section4() {
  useSEO({
    title: "Goleman's Five Domains Overview | EI Module 1.4",
    description:
      "Understanding Goleman's five emotional intelligence domains — self-awareness, self-regulation, motivation, empathy and social skills — the 25 competencies, why they build sequentially, and how they compare to Bar-On and Salovey & Mayer.",
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
            <Layers className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Goleman&rsquo;s Five Domains Overview
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            A comprehensive overview of the five emotional intelligence domains, their 25
            competencies, why they build sequentially, and how Goleman&rsquo;s model compares to
            other leading frameworks
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>5 domains:</strong> Self-awareness, self-regulation, motivation, empathy,
                social skills
              </li>
              <li>
                <strong>25 competencies:</strong> Specific skills within each domain
              </li>
              <li>
                <strong>Sequential:</strong> Each domain builds on the ones before it
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Roadmap:</strong> The framework gives you a clear development pathway
              </li>
              <li>
                <strong>Assessment:</strong> You can identify your strengths and gaps
              </li>
              <li>
                <strong>Action:</strong> Each competency is specific and developable
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Name and describe Goleman's five EI domains",
              'Explain why the domains build sequentially',
              'List key competencies within each domain',
              "Compare Goleman's model with Bar-On and Salovey & Mayer",
              'Give a construction-specific example for each domain',
              'Identify which domains are your current strengths and development areas',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Five Domain Framework */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            The Five Domain Framework
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In his 1995 book and subsequent work, Daniel Goleman organised emotional
                intelligence into <strong>five domains</strong> (sometimes called dimensions or
                pillars). These domains represent the major areas of emotional competence, and each
                contains a set of specific, learnable skills. Together, they form a comprehensive
                framework for understanding and developing emotional intelligence in the workplace.
              </p>

              <p>
                Goleman later refined the five domains into 25 specific competencies, creating the{' '}
                <strong>Emotional Competence Framework</strong> that is now used in corporate
                training, education and leadership development worldwide. The five domains are
                divided into two categories:
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  The Five Domains at a Glance
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-rose-400 mb-2">
                      PERSONAL COMPETENCIES (Focused Inward)
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 flex-shrink-0">
                          <Eye className="h-4 w-4 text-rose-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">1. Self-Awareness</p>
                          <p className="text-xs text-white">
                            Knowing what you feel and why. Recognising how your emotions affect your
                            performance. Accurate self-assessment of strengths and limitations.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 flex-shrink-0">
                          <ShieldCheck className="h-4 w-4 text-rose-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">2. Self-Regulation</p>
                          <p className="text-xs text-white">
                            Managing your emotional reactions. Impulse control. Trustworthiness,
                            adaptability and accountability. Choosing how to respond rather than
                            simply reacting.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 flex-shrink-0">
                          <Flame className="h-4 w-4 text-rose-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">3. Motivation</p>
                          <p className="text-xs text-white">
                            Internal drive that goes beyond external rewards. Achievement
                            orientation, commitment, initiative and optimism. The fuel that keeps
                            you going when things get difficult.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-rose-400 mb-2">
                      SOCIAL COMPETENCIES (Focused Outward)
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 flex-shrink-0">
                          <Heart className="h-4 w-4 text-rose-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">4. Empathy</p>
                          <p className="text-xs text-white">
                            Understanding others&rsquo; emotions and perspectives. Reading the room.
                            Service orientation. Leveraging diversity. Political awareness of group
                            dynamics and power structures.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 flex-shrink-0">
                          <Users className="h-4 w-4 text-rose-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">5. Social Skills</p>
                          <p className="text-xs text-white">
                            Influencing, communicating, managing conflict, leading, building bonds,
                            collaboration, and creating team synergy. The capstone domain that
                            integrates all others.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The most important structural feature of the framework is that the domains{' '}
                <strong>build sequentially</strong>. Self-awareness is the foundation &mdash;
                without it, the others cannot function effectively. Self-regulation depends on
                self-awareness (you cannot manage emotions you do not recognise). Motivation draws
                on both. Empathy extends your awareness outward to others. Social skills integrate
                everything into effective interpersonal behaviour. This sequential structure is why
                this course follows the same order.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Self-Awareness */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Self-Awareness: The Foundation
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Self-awareness is the <strong>cornerstone of emotional intelligence</strong>. It is
                the ability to recognise and understand your own emotions as they occur, to know
                your strengths and limitations, and to understand how your emotional state affects
                your behaviour and the people around you. Without self-awareness, every other EI
                domain is built on unstable ground.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Key Competencies Within Self-Awareness
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white">Emotional Self-Awareness</p>
                    <p className="text-xs text-white">
                      Recognising your emotions and their effects. Knowing what you are feeling and
                      why. Understanding the link between your feelings and your thoughts, words and
                      actions.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white">Accurate Self-Assessment</p>
                    <p className="text-xs text-white">
                      Knowing your strengths and limitations. Being open to honest feedback and new
                      perspectives. Having a sense of humour about yourself.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white">Self-Confidence</p>
                    <p className="text-xs text-white">
                      A strong sense of your self-worth and capabilities. The confidence to make
                      unpopular decisions, speak up in a group, and stand by your convictions when
                      challenged.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Self-Awareness in Action
                  </p>
                </div>
                <p className="text-sm text-white">
                  You are working on a complex DB installation when the client arrives and starts
                  asking questions about the timeline. You notice your jaw tightening and your
                  responses becoming shorter. A self-aware electrician recognises this: &ldquo;I am
                  feeling pressured and it is making me irritable. The client is not being
                  unreasonable &mdash; they are just anxious about their project. I need to take a
                  breath and respond professionally.&rdquo; Without self-awareness, you would just
                  react &mdash; snapping at the client and damaging the relationship.
                </p>
              </div>

              <p>
                Self-awareness is not about constant introspection or navel-gazing. It is about
                developing a <strong>real-time awareness</strong> of your emotional state so that
                you can make conscious choices about how to respond. Think of it as an emotional
                dashboard &mdash; a constant readout that tells you what is happening internally so
                you can adjust accordingly. Module 2 of this course is entirely dedicated to
                developing this critical foundation.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Self-Regulation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Self-Regulation: Managing Your Inner World
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Self-regulation is the ability to manage your emotional reactions effectively. It
                builds directly on self-awareness &mdash; once you can recognise what you are
                feeling, self-regulation gives you the tools to choose how you respond. It is the
                difference between being controlled by your emotions and being in control of your
                responses.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Key Competencies Within Self-Regulation
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white">Self-Control</p>
                    <p className="text-xs text-white">
                      Managing disruptive emotions and impulses. Staying composed under pressure.
                      Thinking clearly when stressed. The ability to pause between stimulus and
                      response.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white">Trustworthiness</p>
                    <p className="text-xs text-white">
                      Maintaining standards of honesty and integrity. Being consistent and reliable.
                      Doing what you say you will do. Taking responsibility for your mistakes rather
                      than blaming others.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white">Conscientiousness</p>
                    <p className="text-xs text-white">
                      Taking responsibility for your own performance. Being organised and careful in
                      your work. Following through on commitments.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white">Adaptability</p>
                    <p className="text-xs text-white">
                      Flexibility in handling change. Adjusting your approach when circumstances
                      shift. Remaining effective when plans change &mdash; which on a construction
                      site is a daily occurrence.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white">Innovation</p>
                    <p className="text-xs text-white">
                      Being open to new ideas and approaches. Seeking creative solutions rather than
                      defaulting to &ldquo;the way it has always been done&rdquo;. Tolerating the
                      discomfort of ambiguity and uncertainty.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Self-Regulation in Action
                  </p>
                </div>
                <p className="text-sm text-white">
                  The architect has changed the lighting layout for the third time, requiring you to
                  re-route cabling that took two days to install. Your first reaction is fury
                  &mdash; you want to call the site manager and let rip. A self-regulated response:
                  you acknowledge the frustration internally (&ldquo;I am angry and that is
                  understandable&rdquo;), take 10 minutes before responding, then communicate the
                  impact calmly and professionally &mdash; explaining the time and cost implications
                  without personal attacks. The outcome is far more likely to be positive.
                </p>
              </div>

              <p>
                Self-regulation does not mean suppressing your emotions or pretending you are not
                frustrated. It means <strong>choosing your response</strong> rather than letting the
                emotion choose it for you. It is the domain that prevents amygdala hijacks from
                derailing your professionalism. Module 3 will teach you specific techniques for
                developing this crucial skill.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Motivation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Motivation: The Drive Within
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In Goleman&rsquo;s model, motivation is not about external rewards (pay, promotions,
                bonuses) but about the <strong>internal drive</strong> that pushes you to achieve,
                to improve, to persist in the face of setbacks, and to maintain optimism when things
                get difficult. It is the bridge between the personal competencies (self-awareness,
                self-regulation) and the social competencies (empathy, social skills).
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Key Competencies Within Motivation
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white">Achievement Drive</p>
                    <p className="text-xs text-white">
                      Striving to improve or meet a standard of excellence. Setting challenging
                      goals and taking calculated risks to achieve them. The internal satisfaction
                      that comes from doing good work, regardless of external recognition.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white">Commitment</p>
                    <p className="text-xs text-white">
                      Aligning with the goals of the group or organisation. Being willing to make
                      personal sacrifices for the team&rsquo;s objectives. Loyalty that goes beyond
                      contractual obligation.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white">Initiative</p>
                    <p className="text-xs text-white">
                      Readiness to act on opportunities. Proactive rather than reactive. Doing what
                      needs to be done without being asked. Anticipating problems and addressing
                      them before they escalate.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white">Optimism</p>
                    <p className="text-xs text-white">
                      Persistence in pursuing goals despite obstacles and setbacks. The belief that
                      difficulties are temporary and can be overcome through effort. Maintaining a
                      positive outlook that energises yourself and others.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Motivation in Action
                  </p>
                </div>
                <p className="text-sm text-white">
                  It is Thursday afternoon on a job that has been plagued by problems &mdash;
                  delayed materials, design changes, and poor weather. The rest of the team is ready
                  to give up and coast through to the weekend. A motivated electrician rallies the
                  group: &ldquo;Look, I know this week has been tough, but we are close to finishing
                  the first fix. If we push through today and tomorrow, we will be ahead of schedule
                  for next week. Let us get it done.&rdquo; This intrinsic motivation &mdash; and
                  the optimism behind it &mdash; is contagious and lifts the entire team.
                </p>
              </div>

              <p>
                Motivation in the EI sense is different from general enthusiasm. It is the deep,
                resilient drive that sustains performance through difficulty, rejection and setback.
                It is what keeps you studying for your 18th Edition update when you would rather be
                watching television. It is what makes you fix something properly instead of taking a
                shortcut that no one would notice. Module 4 will explore motivation and empathy in
                depth.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Empathy & Social Skills */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Empathy &amp; Social Skills: The Outward Domains
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The final two domains &mdash; empathy and social skills &mdash; represent the{' '}
                <strong>social competencies</strong>. While self-awareness, self-regulation and
                motivation are focused inward (understanding and managing yourself), empathy and
                social skills are focused outward (understanding and influencing others). These are
                the domains that determine how effectively you work with people.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Empathy</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    The ability to understand and share the feelings of others. It is not about
                    agreeing with someone or even liking them &mdash; it is about accurately
                    perceiving their emotional state and understanding their perspective.
                  </p>
                  <div className="space-y-2">
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <p className="text-xs font-medium text-white">Understanding Others</p>
                      <p className="text-xs text-white">
                        Sensing others&rsquo; feelings and perspectives. Taking an active interest
                        in their concerns.
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <p className="text-xs font-medium text-white">Service Orientation</p>
                      <p className="text-xs text-white">
                        Anticipating, recognising and meeting the needs of clients and colleagues.
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <p className="text-xs font-medium text-white">Leveraging Diversity</p>
                      <p className="text-xs text-white">
                        Valuing different perspectives and working effectively with people from
                        diverse backgrounds.
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <p className="text-xs font-medium text-white">Political Awareness</p>
                      <p className="text-xs text-white">
                        Reading group dynamics, power relationships, and organisational politics
                        accurately.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Social Skills</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    The capstone domain. The ability to influence, communicate, manage conflict,
                    lead, and build productive relationships. Social skills integrate all four
                    previous domains into effective action.
                  </p>
                  <div className="space-y-2">
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <p className="text-xs font-medium text-white">Influence</p>
                      <p className="text-xs text-white">
                        Persuading and inspiring others. Using effective tactics for building
                        consensus.
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <p className="text-xs font-medium text-white">Communication</p>
                      <p className="text-xs text-white">
                        Listening openly and sending clear, convincing messages. Adapting your style
                        to your audience.
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <p className="text-xs font-medium text-white">Conflict Management</p>
                      <p className="text-xs text-white">
                        Negotiating and resolving disagreements. Finding win-win solutions.
                        De-escalating tense situations.
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <p className="text-xs font-medium text-white">
                        Leadership &amp; Collaboration
                      </p>
                      <p className="text-xs text-white">
                        Inspiring and guiding individuals and groups. Creating group synergy.
                        Working towards shared goals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Construction Examples</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white">
                    <strong>Empathy:</strong> An experienced electrician notices that a new team
                    member from another country seems hesitant to ask questions. Rather than
                    interpreting this as disinterest, they recognise it might be cultural or
                    language-related anxiety. They make a point of checking in regularly and
                    creating opportunities for the new team member to ask questions privately.
                  </p>
                  <p className="text-sm text-white">
                    <strong>Social Skills:</strong> Two subcontractor teams are in a standoff about
                    who should move their services first in a ceiling void. A socially skilled
                    electrician facilitates a brief meeting, listens to both sides, acknowledges
                    each team&rsquo;s constraints, and proposes a phased approach that works for
                    everyone. The conflict is resolved in 15 minutes rather than escalating into a
                    week-long dispute.
                  </p>
                </div>
              </div>

              <p>
                Empathy and social skills are covered in depth in Modules 4 and 5 of this course.
                They represent the outward application of everything you learn in the earlier
                modules &mdash; taking your internal emotional awareness and regulation skills and
                applying them to build better relationships, lead more effectively, and create
                positive working environments.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: How the Models Compare */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            How the Models Compare
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Throughout Module 1, you have encountered three major models of emotional
                intelligence: <strong>Salovey &amp; Mayer&rsquo;s four-branch model</strong>,{' '}
                <strong>Goleman&rsquo;s five-domain model</strong>, and{' '}
                <strong>Bar-On&rsquo;s EQ-i model</strong>. Each approaches emotional intelligence
                from a different angle, and understanding how they relate to each other gives you a
                more complete picture.
              </p>

              {/* Comparison Table */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="p-3 bg-rose-500/10 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <GitCompareArrows className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Three Models Compared</p>
                  </div>
                </div>
                <div className="divide-y divide-white/5">
                  {/* Header Row */}
                  <div className="grid grid-cols-4 p-3 text-xs font-medium">
                    <div className="text-white">Aspect</div>
                    <div className="text-rose-400">Salovey &amp; Mayer</div>
                    <div className="text-rose-400">Goleman</div>
                    <div className="text-rose-400">Bar-On</div>
                  </div>
                  {/* Data Rows */}
                  <div className="grid grid-cols-4 p-3 text-xs">
                    <div className="text-white font-medium">Year</div>
                    <div className="text-white">1990</div>
                    <div className="text-white">1995</div>
                    <div className="text-white">1997</div>
                  </div>
                  <div className="grid grid-cols-4 p-3 text-xs">
                    <div className="text-white font-medium">Approach</div>
                    <div className="text-white">Ability model</div>
                    <div className="text-white">Competency model</div>
                    <div className="text-white">Trait model</div>
                  </div>
                  <div className="grid grid-cols-4 p-3 text-xs">
                    <div className="text-white font-medium">Components</div>
                    <div className="text-white">4 branches</div>
                    <div className="text-white">5 domains, 25 competencies</div>
                    <div className="text-white">5 composite scales</div>
                  </div>
                  <div className="grid grid-cols-4 p-3 text-xs">
                    <div className="text-white font-medium">Focus</div>
                    <div className="text-white">Processing emotional information</div>
                    <div className="text-white">Workplace performance</div>
                    <div className="text-white">Emotional and social functioning</div>
                  </div>
                  <div className="grid grid-cols-4 p-3 text-xs">
                    <div className="text-white font-medium">Assessment tool</div>
                    <div className="text-white">MSCEIT</div>
                    <div className="text-white">ESCI (360 feedback)</div>
                    <div className="text-white">EQ-i 2.0</div>
                  </div>
                  <div className="grid grid-cols-4 p-3 text-xs">
                    <div className="text-white font-medium">Best for</div>
                    <div className="text-white">Research</div>
                    <div className="text-white">Workplace development</div>
                    <div className="text-white">Individual assessment</div>
                  </div>
                </div>
              </div>

              <p>
                These three models are not competing theories &mdash; they are{' '}
                <strong>complementary perspectives</strong> on the same phenomenon. Salovey and
                Mayer tell us what EI <em>is</em> at a cognitive level. Goleman tells us how EI{' '}
                <em>manifests in the workplace</em>. Bar-On tells us how EI{' '}
                <em>can be measured and tracked</em>.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    How This Course Uses All Three
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white">
                      <strong>Salovey &amp; Mayer</strong> provide the scientific rigour &mdash; the
                      evidence that EI is a real, measurable form of intelligence
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white">
                      <strong>Goleman</strong> provides the practical framework &mdash; the five
                      domains and 25 competencies that structure your development
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white">
                      <strong>Bar-On</strong> provides the evidence that EI can be measured,
                      trained, and improved &mdash; the foundation for the practical exercises
                      throughout this course
                    </span>
                  </div>
                </div>
              </div>

              <p>
                As you progress through the remaining modules, you will encounter all three models
                referenced where relevant. Goleman&rsquo;s five-domain framework provides the
                primary structure for the course, but the scientific foundations of Salovey &amp;
                Mayer and the measurement principles of Bar-On inform everything you will learn and
                practise.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Self-Reflection: Your Starting Point
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Before you move on, take a moment to consider where you think your current
                  strengths and development areas lie across Goleman&rsquo;s five domains:
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-white">
                    <strong>Self-Awareness:</strong> How well do you recognise your emotions as they
                    occur? Do you understand your triggers?
                  </p>
                  <p className="text-sm text-white">
                    <strong>Self-Regulation:</strong> Can you manage your reactions effectively,
                    especially under pressure? Or do you tend to react impulsively?
                  </p>
                  <p className="text-sm text-white">
                    <strong>Motivation:</strong> Are you driven by internal standards of excellence,
                    or do you need external motivation? How do you handle setbacks?
                  </p>
                  <p className="text-sm text-white">
                    <strong>Empathy:</strong> How good are you at reading other people&rsquo;s
                    emotions and perspectives? Do colleagues feel understood by you?
                  </p>
                  <p className="text-sm text-white">
                    <strong>Social Skills:</strong> How effective are you at influencing,
                    communicating, resolving conflict, and building relationships?
                  </p>
                </div>
                <p className="text-sm text-white mt-3">
                  There are no right or wrong answers. The purpose is simply to establish a baseline
                  awareness that you can build on throughout the course. You will return to this
                  self-assessment in Module 2.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

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
            <Link to="../ei-module-1-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-1">
              Back to Module 1
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
