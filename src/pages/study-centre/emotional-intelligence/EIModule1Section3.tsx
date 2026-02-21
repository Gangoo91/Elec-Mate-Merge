import {
  ArrowLeft,
  Shield,
  CheckCircle,
  AlertTriangle,
  Users,
  TrendingDown,
  Heart,
  Award,
  Target,
  BarChart3,
  HardHat,
  Lightbulb,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'ei-safety-link',
    question:
      'How does higher collective emotional intelligence on a construction site contribute to improved safety outcomes?',
    options: [
      'Workers with high EI complete tasks faster, reducing exposure time',
      'Emotionally aware workers notice when colleagues are distracted or stressed and intervene before incidents occur',
      'High EI teams ignore safety rules because they trust each other more',
      'EI only affects office workers, not those on construction sites',
    ],
    correctIndex: 1,
    explanation:
      'Higher collective EI improves safety because emotionally aware workers can read the emotional states of those around them. They notice when a colleague is distracted, stressed, or not functioning normally, and they intervene — whether by checking in, suggesting a break, or raising a concern — before the situation leads to an incident.',
  },
  {
    id: 'hse-standards',
    question:
      'How many Management Standards does the HSE identify for tackling work-related stress?',
    options: ['Three', 'Four', 'Six', 'Eight'],
    correctIndex: 2,
    explanation:
      'The HSE identifies six Management Standards for tackling work-related stress: Demands, Control, Support, Relationships, Role, and Change. Most of these standards directly involve emotional intelligence competencies — particularly Support, Relationships, and Change.',
  },
  {
    id: 'mates-in-mind',
    question: 'What is the primary focus of the Mates in Mind charity?',
    options: [
      'Providing financial advice to construction workers',
      'Improving and supporting mental health in the construction and related industries',
      'Training construction workers in first aid',
      'Lobbying for higher wages in the construction sector',
    ],
    correctIndex: 1,
    explanation:
      'Mates in Mind is a UK charity specifically focused on improving and supporting mental health in the construction and related industries. It provides training, resources, and a framework for organisations to address mental health and wellbeing in the workplace.',
  },
];

const faqs = [
  {
    question: 'Is there hard data linking EI to safety outcomes in construction?',
    answer:
      "While large-scale, construction-specific randomised controlled trials on EI and safety are still emerging, there is strong evidence from adjacent research. Studies in high-risk industries (aviation, healthcare, nuclear power) consistently show that human factors — particularly communication, situational awareness, and team coordination — are the primary determinants of safety outcomes, not technical competence alone. The HSE's own research into human factors in construction safety identifies many EI-related competencies (communication, stress management, decision-making under pressure) as critical to accident prevention. The CITB's behavioural competency framework was developed precisely because the industry recognised that technical skills alone do not prevent incidents.",
  },
  {
    question: 'What are the CITB behavioural competencies and where can I access them?',
    answer:
      'The CITB (Construction Industry Training Board) has developed a behavioural competency framework that identifies the key interpersonal and self-management skills needed for effective performance in construction. These competencies include communication, teamwork, leadership, problem-solving, and personal effectiveness — all of which overlap significantly with emotional intelligence. The framework is available through the CITB website and is used in NVQ assessments, supervisory qualifications (SSSTS, SMSTS), and management development programmes. If you are working towards any CITB-accredited qualification, you are already being assessed on EI-related competencies.',
  },
  {
    question: 'How does low EI cost the construction industry money?',
    answer:
      'Low EI costs the construction industry through multiple channels. Conflict between trades and teams causes delays and rework — estimated to cost UK construction billions annually. Poor communication leads to errors that require correction. High staff turnover (driven by toxic workplace cultures and poor management) means constant recruitment and training costs. Sickness absence related to stress, anxiety, and depression accounts for millions of lost working days. Safety incidents — many of which have human factors (EI-related) root causes — generate direct costs (compensation, fines, project delays) and indirect costs (reputational damage, insurance increases). The Chartered Institute of Building estimates that poor mental health alone costs the UK construction industry approximately £1.2 billion per year.',
  },
  {
    question: 'Is EI really a career advantage in a technical trade like electrical work?',
    answer:
      'Absolutely. While technical competence is the entry requirement for the electrical trade, career progression beyond a certain level is almost entirely determined by interpersonal skills. The electricians who become supervisors, project managers, contracts managers, and business owners are not necessarily the most technically gifted — they are the ones who can communicate effectively, manage teams, handle clients, resolve conflicts, and lead under pressure. Every successful electrical contractor will tell you that the skills that built their business were people skills, not just wiring skills. EI is the formal framework for understanding and developing those people skills.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following best describes the relationship between emotional intelligence and safety on construction sites?',
    options: [
      'EI has no measurable impact on safety',
      'Higher collective EI leads to better hazard awareness, communication, and intervention before incidents occur',
      'EI only matters for health and safety officers, not general workers',
      'Technical training alone is sufficient to prevent all safety incidents',
    ],
    correctAnswer: 1,
    explanation:
      'Higher collective EI leads to better safety outcomes because emotionally aware workers notice changes in colleagues, communicate concerns more effectively, and intervene before situations become dangerous. Research consistently shows that human factors — many of which are EI-related — are the primary cause of workplace incidents.',
  },
  {
    id: 2,
    question:
      'Which UK body developed a behavioural competency framework that includes EI-related skills for the construction industry?',
    options: [
      'The Health and Safety Executive (HSE)',
      'The Construction Industry Training Board (CITB)',
      'The Royal Institute of British Architects (RIBA)',
      'The Joint Industry Board (JIB)',
    ],
    correctAnswer: 1,
    explanation:
      'The CITB developed a behavioural competency framework that includes communication, teamwork, leadership, problem-solving, and personal effectiveness — all of which overlap significantly with emotional intelligence competencies.',
  },
  {
    id: 3,
    question:
      'How many Management Standards has the HSE established for tackling work-related stress?',
    options: ['Four', 'Five', 'Six', 'Eight'],
    correctAnswer: 2,
    explanation:
      'The HSE has established six Management Standards: Demands, Control, Support, Relationships, Role, and Change. These represent the primary sources of work-related stress, and most of them directly involve emotional intelligence competencies.',
  },
  {
    id: 4,
    question:
      'Which HSE Management Standard specifically addresses the quality of workplace relationships and the management of conflict?',
    options: ['Demands', 'Control', 'Relationships', 'Change'],
    correctAnswer: 2,
    explanation:
      'The Relationships standard specifically addresses the quality of interpersonal relationships at work and the management of conflict. It requires that employees are not subjected to unacceptable behaviours and that systems exist for addressing conflict — both of which require emotional intelligence.',
  },
  {
    id: 5,
    question:
      'According to estimates, approximately how much does poor mental health cost the UK construction industry per year?',
    options: ['£200 million', '£600 million', '£1.2 billion', '£5 billion'],
    correctAnswer: 2,
    explanation:
      'The Chartered Institute of Building estimates that poor mental health costs the UK construction industry approximately £1.2 billion per year through absenteeism, presenteeism, staff turnover, and reduced productivity.',
  },
  {
    id: 6,
    question: 'What is the primary mission of Mates in Mind?',
    options: [
      'Providing technical training for construction workers',
      'Improving and supporting mental health in the construction and related industries',
      'Negotiating pay rates for construction unions',
      'Certifying construction site safety standards',
    ],
    correctAnswer: 1,
    explanation:
      'Mates in Mind is a UK charity specifically focused on improving and supporting mental health in the construction and related industries. It works with organisations to provide training, raise awareness, and create frameworks for addressing mental health at work.',
  },
  {
    id: 7,
    question:
      'Which of the following is an example of how low EI directly impacts construction projects?',
    options: [
      'Using higher-quality materials than specified',
      'Conflict between trades causing delays and rework',
      'Completing projects ahead of schedule',
      'Having too many qualified workers on site',
    ],
    correctAnswer: 1,
    explanation:
      "Conflict between trades is a direct result of low collective EI — poor communication, inability to manage frustration, lack of empathy for others' constraints, and ineffective conflict resolution. These conflicts cause delays, rework, and damaged working relationships that affect project timelines and costs.",
  },
  {
    id: 8,
    question: 'Why is EI considered a career advantage in the electrical trade?',
    options: [
      'Because employers pay more for electricians with high IQ',
      'Because EI replaces the need for technical qualifications',
      'Because progression to supervisory, management, and business ownership roles depends heavily on interpersonal skills',
      'Because EI is required for the AM2 assessment',
    ],
    correctAnswer: 2,
    explanation:
      'While technical competence is essential, career progression beyond a certain level in the electrical trade depends heavily on interpersonal skills — communication, team management, client handling, conflict resolution, and leadership. These are all EI competencies. The electricians who become supervisors, project managers, and business owners are distinguished by their people skills, not just their wiring skills.',
  },
];

export default function EIModule1Section3() {
  useSEO({
    title: 'Why EI Matters in Construction | EI Module 1.3',
    description:
      'Understanding the link between emotional intelligence and safety, CITB behavioural competencies, HSE Management Standards, the cost of low EI, Mates in Mind, and EI as a career advantage in construction.',
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
            <Shield className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Why EI Matters in Construction
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The business case for emotional intelligence &mdash; from safety outcomes and industry
            frameworks to the financial cost of low EI and career progression
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Safety:</strong> Higher collective EI = fewer incidents on site
              </li>
              <li>
                <strong>Industry:</strong> CITB behavioural framework includes EI competencies
              </li>
              <li>
                <strong>Cost:</strong> Low EI costs the industry millions in conflict and turnover
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Performance:</strong> EI directly impacts safety, productivity and retention
              </li>
              <li>
                <strong>Wellbeing:</strong> Mates in Mind champions EI in construction
              </li>
              <li>
                <strong>Career:</strong> EI separates good electricians from great ones
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the link between emotional intelligence and safety outcomes',
              'Identify EI-related competencies in the CITB behavioural framework',
              'Describe the six HSE Management Standards and their EI connection',
              'Calculate the business cost of low emotional intelligence',
              'Explain the role of Mates in Mind in industry wellbeing',
              'Give practical examples of how EI improves construction outcomes',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: EI and Safety */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            EI and Safety
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction remains one of the most dangerous industries in the United Kingdom.
                Despite significant improvements in physical safety measures over the past decades
                &mdash; better PPE, improved site management, stricter regulations &mdash; incidents
                continue to occur. The reason is that the majority of workplace incidents are not
                caused by equipment failure or inadequate safety systems. They are caused by{' '}
                <strong>human factors</strong>.
              </p>

              <p>
                The Health and Safety Executive&rsquo;s research consistently identifies human
                factors as the primary contributor to construction accidents. These include poor
                communication, failure to notice warning signs, impaired decision-making under
                stress, complacency, and failure to speak up about concerns. Every one of these
                factors is directly related to emotional intelligence.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HardHat className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    How EI Improves Safety Outcomes
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Situational Awareness</p>
                      <p className="text-sm text-white">
                        Workers with high EI are better at reading the emotional state of those
                        around them. They notice when a colleague is distracted, fatigued, or upset
                        &mdash; all of which increase accident risk. This awareness allows them to
                        intervene before an incident occurs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Communication</p>
                      <p className="text-sm text-white">
                        Safety depends on clear, effective communication. Workers with high EI
                        communicate safety concerns more effectively, adapt their communication
                        style to their audience, and create an environment where others feel safe
                        raising issues.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Stress Management</p>
                      <p className="text-sm text-white">
                        Stress impairs cognitive function, narrows attention, and increases
                        risk-taking behaviour. Workers who can manage their stress levels maintain
                        better focus and make safer decisions, even under pressure.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Speaking Up Culture</p>
                      <p className="text-sm text-white">
                        On sites with high collective EI, workers feel psychologically safe to raise
                        concerns, report near-misses, and challenge unsafe behaviour without fear of
                        ridicule or retaliation. This creates a proactive safety culture rather than
                        a reactive one.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Human Factors Connection:</strong> Research
                  from high-reliability industries (aviation, nuclear power, healthcare) shows that
                  when teams develop stronger interpersonal skills &mdash; communication, mutual
                  monitoring, assertiveness, situational awareness &mdash; incident rates drop
                  significantly. Construction is beginning to adopt these principles through
                  programmes like &ldquo;behavioural safety&rdquo; and &ldquo;human factors
                  training&rdquo;, both of which are essentially EI training by another name.
                </p>
              </div>

              <p>
                The implications are clear: investing in emotional intelligence development is not a
                &ldquo;soft&rdquo; initiative. It is a safety initiative. Every improvement in a
                team&rsquo;s collective EI reduces the probability of the human errors that cause
                incidents. It is arguably more cost-effective than many physical safety measures
                because it addresses the root cause of most accidents: how people think, feel,
                communicate and behave under pressure.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: CITB Behavioural Competencies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            CITB Behavioural Competencies Framework
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Construction Industry Training Board (CITB)</strong> has long recognised
                that technical skills alone are insufficient for effective performance in
                construction. Their behavioural competency framework identifies the key
                interpersonal and self-management skills that complement technical ability. These
                competencies map directly onto emotional intelligence.
              </p>

              <p>
                The CITB framework is embedded in NVQ assessments, supervisory qualifications
                (SSSTS, SMSTS), and management development programmes. If you are pursuing any
                CITB-accredited qualification, you are already being assessed on EI-related
                competencies &mdash; you may simply not have called them that.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    CITB Behavioural Competencies &amp; Their EI Equivalents
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white">Communication</p>
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">EI link:</strong> Expressing thoughts and
                      feelings clearly, active listening, adapting communication style, reading
                      non-verbal cues &mdash; all require empathy and social skills (Goleman&rsquo;s
                      domains 4 and 5).
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white">Teamwork</p>
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">EI link:</strong> Cooperating with others,
                      valuing diverse perspectives, managing conflict constructively, supporting
                      colleagues &mdash; requires empathy, social skills, and self-regulation.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white">Leadership</p>
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">EI link:</strong> Inspiring and motivating
                      others, providing constructive feedback, making decisions under pressure,
                      taking responsibility &mdash; requires all five of Goleman&rsquo;s domains.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white">Problem-Solving</p>
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">EI link:</strong> Staying calm under
                      pressure, thinking clearly when stressed, seeking input from others, managing
                      frustration when solutions are not immediate &mdash; requires self-regulation
                      and using emotions to facilitate thought.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white">Personal Effectiveness</p>
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">EI link:</strong> Self-motivation,
                      resilience, adaptability, managing your own development, maintaining
                      professionalism under pressure &mdash; requires self-awareness,
                      self-regulation, and motivation.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The overlap is not coincidental. The CITB developed this framework because industry
                feedback consistently showed that the most effective construction professionals
                &mdash; from site operatives to project directors &mdash; were distinguished not by
                their technical knowledge but by their ability to work effectively with people.
                Emotional intelligence is the academic and research-backed framework for
                understanding and developing these same capabilities.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: HSE Management Standards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            HSE Management Standards
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Health and Safety Executive (HSE)</strong> has established six{' '}
                <strong>Management Standards</strong> for tackling work-related stress. These
                standards represent the conditions that, if not properly managed, are associated
                with poor health and wellbeing, lower productivity, and increased sickness absence.
                Crucially, most of these standards directly involve emotional intelligence
                competencies.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">Demands</p>
                  </div>
                  <p className="text-sm text-white mb-1">
                    Workload, work patterns and the working environment. Employees should be able to
                    cope with the demands of their jobs.
                  </p>
                  <p className="text-xs text-white">
                    <strong className="text-rose-400">EI connection:</strong> Self-regulation and
                    stress management help individuals cope with high demands. Managers with EI
                    recognise when demands are becoming excessive and intervene.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">Control</p>
                  </div>
                  <p className="text-sm text-white mb-1">
                    How much say employees have in the way they do their work. Having some degree of
                    control reduces stress and increases engagement.
                  </p>
                  <p className="text-xs text-white">
                    <strong className="text-rose-400">EI connection:</strong> Managers with high EI
                    delegate effectively and give workers appropriate autonomy. Workers with high EI
                    communicate their need for control constructively.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">Support</p>
                  </div>
                  <p className="text-sm text-white mb-1">
                    The encouragement, sponsorship and resources provided by the organisation, line
                    management and colleagues.
                  </p>
                  <p className="text-xs text-white">
                    <strong className="text-rose-400">EI connection:</strong> Providing support
                    requires empathy (recognising when someone needs help), social skills (offering
                    help in an appropriate way), and self-awareness (knowing your own limits as a
                    supporter).
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm font-medium text-rose-400">Relationships</p>
                  </div>
                  <p className="text-sm text-white mb-1">
                    Promoting positive working to avoid conflict and dealing with unacceptable
                    behaviour. Employees should not be subjected to bullying or harassment.
                  </p>
                  <p className="text-xs text-white">
                    <strong className="text-rose-400">EI connection:</strong> This standard is
                    almost entirely about EI &mdash; managing conflict, maintaining respectful
                    relationships, addressing bullying, and creating a psychologically safe
                    environment.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <p className="text-sm font-medium text-rose-400">Role</p>
                  </div>
                  <p className="text-sm text-white mb-1">
                    Whether people understand their role within the organisation and whether the
                    organisation ensures they do not have conflicting roles.
                  </p>
                  <p className="text-xs text-white">
                    <strong className="text-rose-400">EI connection:</strong> Managers with high EI
                    communicate roles clearly and recognise when role confusion is causing stress.
                    Workers with high self-awareness recognise and communicate when their role is
                    unclear.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      6
                    </span>
                    <p className="text-sm font-medium text-rose-400">Change</p>
                  </div>
                  <p className="text-sm text-white mb-1">
                    How organisational change is managed and communicated. Employees should be
                    engaged and consulted during periods of change.
                  </p>
                  <p className="text-xs text-white">
                    <strong className="text-rose-400">EI connection:</strong> Managing change
                    effectively requires adaptability (Bar-On&rsquo;s model), empathy for how change
                    affects others, and clear communication &mdash; all core EI competencies.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Insight:</strong> The HSE Management
                  Standards are not optional guidelines &mdash; they represent legal duties under
                  the Health and Safety at Work etc. Act 1974 and the Management of Health and
                  Safety at Work Regulations 1999. Organisations that fail to manage these standards
                  are not only risking their employees&rsquo; wellbeing but are also exposed to
                  legal liability. Emotional intelligence training directly supports compliance with
                  these standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: The Cost of Low EI */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            The Cost of Low EI in Construction
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Low emotional intelligence is not an abstract problem &mdash; it has a direct,
                measurable financial impact on construction businesses. The costs manifest through
                multiple channels, most of which are well-documented by industry research.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Financial Impact</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-2xl sm:text-3xl font-bold text-rose-400">&pound;1.2bn</p>
                      <p className="text-sm text-white">
                        Estimated annual cost of poor mental health to UK construction (CIOB)
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl sm:text-3xl font-bold text-rose-400">&pound;56bn</p>
                      <p className="text-sm text-white">
                        Annual cost of poor mental health to all UK employers (Deloitte 2022)
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-2xl sm:text-3xl font-bold text-rose-400">&pound;5.30</p>
                      <p className="text-sm text-white">
                        Return for every &pound;1 invested in mental health support (Deloitte 2022)
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl sm:text-3xl font-bold text-rose-400">70M</p>
                      <p className="text-sm text-white">
                        Working days lost per year to mental health conditions in the UK (HSE)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Where the Costs Come From</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Conflict and Rework</p>
                      <p className="text-sm text-white">
                        Poor communication and unmanaged conflict between trades leads to
                        misunderstandings, errors, and rework. The Construction Industry Council
                        estimates that rework alone accounts for up to 15% of project costs. Much of
                        this is preventable with better interpersonal skills.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Staff Turnover</p>
                      <p className="text-sm text-white">
                        Toxic workplace cultures and poor management drive talented workers away.
                        Recruiting and training a replacement electrician costs an employer
                        thousands of pounds. The most common reason people leave a job is not the
                        job itself but their relationship with their immediate supervisor &mdash; a
                        clear EI issue.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Sickness Absence</p>
                      <p className="text-sm text-white">
                        Stress, anxiety and depression &mdash; all exacerbated by low-EI
                        environments &mdash; are among the leading causes of sickness absence in
                        construction. Each day of absence costs the employer in lost productivity,
                        temporary cover, and project delays.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Safety Incidents</p>
                      <p className="text-sm text-white">
                        Incidents with human-factor root causes generate direct costs (compensation
                        claims, HSE fines, project delays) and indirect costs (insurance premium
                        increases, reputational damage, loss of future contracts). A single serious
                        incident can cost a small contractor their entire business.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Presenteeism</p>
                      <p className="text-sm text-white">
                        Workers who are physically present but mentally disengaged due to stress,
                        conflict, or low morale. Presenteeism is harder to measure than absence but
                        is estimated to cost even more. Deloitte&rsquo;s research found it accounts
                        for the largest share of mental health-related costs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The business case is clear: developing emotional intelligence across your workforce
                is not a cost &mdash; it is an investment with a measurable return. Deloitte&rsquo;s
                finding that every &pound;1 invested in mental health support returns &pound;5.30
                makes EI development one of the best investments a construction business can make.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Mates in Mind */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Mates in Mind and Industry Wellbeing
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Mates in Mind</strong> is a UK charity launched in 2017 with a specific
                mission: to improve and support mental health in the construction and related
                industries. It was established because industry leaders recognised that construction
                workers face unique mental health challenges and that existing support systems were
                not reaching the people who needed them most.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">What Mates in Mind Does</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white">
                      <strong>Raises awareness</strong> of mental health issues within construction
                      through campaigns, events, and resources
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white">
                      <strong>Provides training</strong> for organisations, managers, and
                      individuals on how to support mental health at work
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white">
                      <strong>Offers a framework</strong> for organisations to assess and improve
                      their approach to mental health and wellbeing
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white">
                      <strong>Signposts support services</strong> including the Construction
                      Industry Helpline (0345 605 1956), the Samaritans (116 123), and specialist
                      counselling
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white">
                      <strong>Partners with major contractors</strong> and industry bodies to embed
                      mental health awareness into standard practice
                    </span>
                  </div>
                </div>
              </div>

              <p>
                The work of Mates in Mind is directly relevant to emotional intelligence because it
                recognises that mental health in construction cannot be improved through top-down
                policies alone. It requires changes in culture, behaviour, and interpersonal skills
                at every level &mdash; from site operatives to board directors. This is EI in
                practice: creating workplaces where people feel safe to talk about their struggles,
                where colleagues notice when someone is not okay, and where support is available
                without stigma.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Other Key Organisations</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white">Construction Industry Helpline</p>
                    <p className="text-sm text-white">
                      Free, confidential service available 24/7 on{' '}
                      <strong className="text-rose-400">0345 605 1956</strong>. Provides emotional,
                      financial, and practical support for anyone working in construction and their
                      families.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Lighthouse Charity</p>
                    <p className="text-sm text-white">
                      Provides financial and emotional support to construction workers and their
                      families who are dealing with illness, injury, or bereavement. Also runs the
                      Construction Industry Helpline.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Samaritans</p>
                    <p className="text-sm text-white">
                      Available 24/7, free to call on{' '}
                      <strong className="text-rose-400">116 123</strong>. For anyone who is
                      struggling or needs someone to talk to.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: EI as a Career Advantage */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            EI as a Career Advantage
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If the safety, wellbeing and financial arguments have not yet convinced you of
                EI&rsquo;s importance, consider the career argument. In the electrical trade &mdash;
                and in construction more broadly &mdash; emotional intelligence is the single
                biggest differentiator between those who stay at the same level for decades and
                those who progress to supervisory, management, and business ownership roles.
              </p>

              <p>
                Technical competence is the <strong>entry requirement</strong>. Every qualified
                electrician has an NVQ Level 3, has passed their AM2, and has the technical
                knowledge to do the job. What separates those who progress is not more technical
                knowledge &mdash; it is the ability to lead teams, communicate with clients, manage
                conflicts, handle pressure, and build a reputation that generates repeat business
                and referrals.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">EI at Each Career Stage</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Apprentice / Improver</p>
                      <p className="text-sm text-white">
                        EI helps you learn faster (you ask better questions and take feedback well),
                        build relationships with experienced colleagues, manage the stress of
                        training, and demonstrate the professional attitude that gets you kept on
                        after your apprenticeship.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Qualified Electrician</p>
                      <p className="text-sm text-white">
                        EI enables you to work effectively with other trades, handle difficult
                        clients, manage your time and stress, and build a reputation as someone
                        people want to work with. Clients and contractors remember how you made them
                        feel, not just the quality of your wiring.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Supervisor / Foreman</p>
                      <p className="text-sm text-white">
                        At this level, EI is essential. You are managing people, resolving
                        conflicts, coordinating with multiple stakeholders, and setting the
                        emotional tone for your team. The foreman&rsquo;s mood sets the mood for the
                        site &mdash; emotional contagion means your EI affects everyone.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Manager / Business Owner</p>
                      <p className="text-sm text-white">
                        EI is the core competency. You are leading an organisation, making strategic
                        decisions under pressure, building a culture, retaining talent, and managing
                        client relationships at the highest level. Goleman&rsquo;s research shows
                        that EI accounts for nearly 90% of the competencies that distinguish
                        outstanding leaders from average ones.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Career Equation</p>
                </div>
                <p className="text-sm text-white">
                  <strong>Technical skills</strong> get you qualified.{' '}
                  <strong>Emotional intelligence</strong> gets you promoted, wins you repeat
                  clients, earns you referrals, helps you manage teams effectively, and enables you
                  to build a business. The most successful people in the electrical trade invest in
                  both. This course is your investment in the second half of that equation.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-1-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-1-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
