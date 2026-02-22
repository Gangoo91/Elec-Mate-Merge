import { ArrowLeft, HardHat, CheckCircle, AlertTriangle, Scale, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'rsm-1-3-hse-stats',
    question:
      'According to HSE data, which UK industry sector has the highest rate of suicide among male workers?',
    options: ['Financial services', 'Healthcare', 'Construction', 'Agriculture'],
    correctIndex: 2,
    explanation:
      'Construction has the highest rate of suicide among male workers of any UK industry sector. Research by the Office for National Statistics (ONS) has consistently shown that male construction workers are at significantly elevated risk. This is attributed to a combination of factors including job insecurity, financial pressures of self-employment, long working hours, physical demands, a male-dominated culture that discourages talking about mental health, and high rates of substance use. Understanding this statistic is the starting point for taking mental health in construction seriously.',
  },
  {
    id: 'rsm-1-3-management-standards',
    question:
      'The HSE Management Standards identify six key areas of work design that, if not properly managed, can lead to work-related stress. Which of the following is NOT one of the six areas?',
    options: [
      'Demands \u2014 workload, work patterns, and the working environment',
      'Salary \u2014 pay levels, bonuses, and financial benefits',
      'Control \u2014 how much say the person has in the way they do their work',
      'Relationships \u2014 promoting positive working relationships and avoiding conflict',
    ],
    correctIndex: 1,
    explanation:
      "The six HSE Management Standards areas are: Demands, Control, Support, Relationships, Role, and Change. Salary is not one of the six areas \u2014 although financial stress is a significant factor in construction workers' mental health, it falls outside the Management Standards framework, which focuses on work design and management practices that employers can directly control. The standards provide a framework for employers to assess and manage the risk of work-related stress.",
  },
  {
    id: 'rsm-1-3-legal-duty',
    question:
      'Under the Health and Safety at Work etc. Act 1974, Section 2, employers have a duty to ensure, so far as is reasonably practicable, the health, safety, and welfare of employees. Does this duty include mental health?',
    options: [
      'No \u2014 the 1974 Act only covers physical safety hazards',
      'Yes \u2014 the term "health" includes both physical and mental health',
      'Only if the employee has a pre-existing diagnosed mental health condition',
      'Only in industries specifically listed in the Act, which does not include construction',
    ],
    correctIndex: 1,
    explanation:
      'Yes. The Health and Safety at Work etc. Act 1974 (HSWA) Section 2 duty to ensure the health, safety, and welfare of employees includes mental health. The term "health" is not limited to physical health \u2014 it encompasses psychological and mental wellbeing. This has been confirmed through case law and HSE guidance. Employers who fail to assess and manage the risk of work-related stress are potentially in breach of their legal duties under both the HSWA 1974 and the Management of Health and Safety at Work Regulations 1999, Regulation 3 (duty to carry out suitable and sufficient risk assessment).',
  },
];

const faqs = [
  {
    question: 'Is stress really that bad in construction compared to other industries?',
    answer:
      'The data is unequivocal. Construction consistently ranks among the worst industries for mental health outcomes in the UK. Male construction workers are at significantly higher risk of suicide than the general male population. HSE Labour Force Survey data regularly shows that construction workers report high levels of work-related stress, anxiety, and depression. The combination of factors is particularly toxic: physically demanding work, job insecurity (especially for the self-employed and those on CIS), tight deadlines, long hours, extended periods away from home, a male-dominated culture that stigmatises mental health discussion, and financial pressures from the feast-and-famine cycle of project work. Other industries face stress too, but the specific constellation of stressors in construction creates unique and severe risks.',
  },
  {
    question: 'What are the HSE Management Standards and are they legally enforceable?',
    answer:
      "The HSE Management Standards for work-related stress cover six areas: Demands, Control, Support, Relationships, Role, and Change. They represent the HSE's approach to managing the risk of stress at work. While the Management Standards themselves are not regulations (they are guidance), the underlying legal duties are enforceable. Under the Management of Health and Safety at Work Regulations 1999, Regulation 3, employers must carry out a suitable and sufficient risk assessment of all risks to health \u2014 including the risk of work-related stress. The HSE Management Standards provide the framework for conducting that assessment. An employer who fails to assess and manage stress risks could face enforcement action, improvement notices, or prosecution.",
  },
  {
    question: 'What does the Working Time Regulations 1998 have to do with stress?',
    answer:
      "The Working Time Regulations 1998 set limits on working hours (a maximum of 48 hours per week averaged over 17 weeks, though workers can opt out), require rest breaks (20 minutes for every 6 hours worked), daily rest (11 consecutive hours between working days), and weekly rest (one uninterrupted 24-hour period per week). These regulations exist partly to protect workers from the health effects of excessive working hours \u2014 including stress, fatigue, and burnout. In construction, where long hours and overtime are common, these regulations are frequently breached or circumvented through opt-out agreements. While the opt-out is legal, it does not remove the employer's duty under HSWA 1974 to protect workers' health. Excessive hours remain a significant stress and safety risk.",
  },
  {
    question: 'Why is the "man up" culture so harmful?',
    answer:
      'The "man up" or "get on with it" culture in construction creates a toxic cycle. When someone is struggling with stress, anxiety, or depression, the cultural message is that talking about it is weakness, that real workers just push through, that asking for help is a sign of failure. This means people suffer in silence, often for months or years. They may turn to alcohol or other substances to cope. They may isolate themselves. Their work quality may decline. Their relationships may deteriorate. And because nobody talks about it, they believe they are the only one struggling \u2014 when in reality, many of their colleagues are experiencing similar difficulties. The "man up" culture does not make people stronger; it prevents them from accessing help, and at its worst, it contributes to the tragic suicide statistics in the industry.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following is a key reason why construction workers are at elevated risk of stress-related harm?',
    options: [
      'Construction is a low-skilled industry that does not require concentration',
      'Construction workers are genetically predisposed to higher stress levels',
      'A combination of job insecurity, physical demands, tight deadlines, financial pressures, and a culture that discourages discussing mental health',
      'Construction sites are always indoors, which prevents workers from getting fresh air and sunlight',
    ],
    correctAnswer: 2,
    explanation:
      'Construction workers face a unique combination of stressors: physical demands, job insecurity (especially for CIS/self-employed workers), tight deadlines and programme pressures, financial feast-and-famine cycles, long commutes, time away from family, and a male-dominated culture that stigmatises talking about mental health. It is this combination \u2014 not any single factor \u2014 that creates the elevated risk. The industry is highly skilled and demanding, not low-skilled.',
  },
  {
    id: 2,
    question:
      'The HSE Management Standards identify six areas of work design that can cause stress. "Demands" refers to:',
    options: [
      'The salary and financial benefits offered to employees',
      'The amount of say a worker has in how they do their work',
      'Workload, work patterns, and the working environment',
      'The level of support available from managers and colleagues',
    ],
    correctAnswer: 2,
    explanation:
      '"Demands" in the HSE Management Standards refers to workload, work patterns, and the working environment. The standard states that employees should be able to cope with the demands of their jobs, that systems should be in place to respond to concerns about work demands, and that the organisation should provide achievable demands in relation to the agreed hours of work. In construction, excessive demands are one of the most common sources of stress: too many tasks, unrealistic deadlines, insufficient resources, and poor planning all increase demand beyond manageable levels.',
  },
  {
    id: 3,
    question: 'In the HSE Management Standards framework, "Control" refers to:',
    options: [
      "The employer's ability to control employee behaviour through disciplinary procedures",
      'How much say the person has in the way they do their work',
      'The use of CCTV and monitoring equipment on construction sites',
      'Financial controls such as budgets and spending limits',
    ],
    correctAnswer: 1,
    explanation:
      '"Control" refers to how much autonomy and influence a worker has over the way they do their work. The standard states that employees should have a say in how they do their work, be encouraged to develop new skills, and have a degree of control over their working pace. Lack of control is a significant stressor \u2014 being told exactly what to do, how to do it, and when, with no input or flexibility, is inherently more stressful than having some autonomy. In construction, control issues arise when workers have no say in scheduling, methods, or priorities.',
  },
  {
    id: 4,
    question: 'Under the Health and Safety at Work etc. Act 1974, Section 2, employers must:',
    options: [
      'Only protect employees from physical hazards such as falls, electrocution, and machinery',
      'Ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all employees \u2014 including mental health',
      'Provide free counselling to any employee who asks for it',
      'Guarantee that no employee will ever experience stress at work',
    ],
    correctAnswer: 1,
    explanation:
      'Section 2 of the HSWA 1974 places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all their employees. "Health" includes mental health. This does not mean employers must guarantee a stress-free workplace (that would be impossible), but they must assess the risks \u2014 including psychosocial risks \u2014 and take reasonably practicable steps to manage them. Combined with the Management of Health and Safety at Work Regulations 1999, Regulation 3 (risk assessment), this creates a clear legal framework for managing workplace stress.',
  },
  {
    id: 5,
    question:
      'Which of the following construction-specific stressors is most associated with the CIS (Construction Industry Scheme) and self-employment?',
    options: [
      'Exposure to asbestos and hazardous materials',
      'Feast-and-famine work cycles, financial insecurity, lack of sick pay, and no holiday pay',
      'Noise levels exceeding the action values in the Control of Noise at Work Regulations 2005',
      'Working in confined spaces such as ceiling voids and ducts',
    ],
    correctAnswer: 1,
    explanation:
      'The CIS (Construction Industry Scheme) and self-employment bring specific financial stressors that employed workers do not face: unpredictable income, feast-and-famine work cycles (too much work one month, nothing the next), no sick pay, no holiday pay, late payment by clients and main contractors, the cost of running a van and buying tools, and the constant pressure to find the next job. These financial stressors are chronic and pervasive \u2014 they do not switch off at the end of the working day. Research consistently links financial insecurity to elevated levels of stress, anxiety, and depression.',
  },
  {
    id: 6,
    question: 'The "man up" culture in construction is harmful because:',
    options: [
      'It makes construction workers physically tougher, which increases injury risk',
      'It discourages workers from talking about stress and mental health, leading to silent suffering, substance use, and delayed help-seeking',
      'It only affects apprentices and young workers, not experienced tradespeople',
      'It has no measurable impact on mental health outcomes in the industry',
    ],
    correctAnswer: 1,
    explanation:
      'The "man up" culture creates a toxic silence around mental health. When workers believe that admitting to stress, anxiety, or depression is a sign of weakness, they suffer in silence. They may turn to alcohol or substance use as a coping mechanism. They avoid seeking professional help. Their condition worsens over time. And because the culture suppresses discussion, they believe they are alone in their struggles. This culture affects workers at all levels and all ages \u2014 not just apprentices. Changing this culture is one of the most important things the construction industry can do to reduce mental health harm.',
  },
  {
    id: 7,
    question:
      'The Management of Health and Safety at Work Regulations 1999, Regulation 3, requires employers to:',
    options: [
      'Provide free gym membership to all employees',
      'Carry out a suitable and sufficient assessment of risks to the health and safety of employees \u2014 including psychosocial risks such as stress',
      'Pay for private counselling for any employee diagnosed with a stress-related condition',
      'Appoint a dedicated mental health officer on every construction site',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 3 of the Management of Health and Safety at Work Regulations 1999 requires employers to carry out a suitable and sufficient risk assessment of all risks to the health and safety of their employees. This includes psychosocial risks such as work-related stress. The HSE Management Standards provide the framework for conducting this assessment. An employer who fails to assess stress risks is potentially in breach of Regulation 3, regardless of whether any employee has actually suffered harm.',
  },
  {
    id: 8,
    question:
      'A self-employed electrician has been working 60-hour weeks for three months to keep up with demand. They have not taken a holiday. They are exhausted, irritable, and their work quality has dropped. Which HSE Management Standard area is MOST directly relevant?',
    options: [
      'Relationships \u2014 promoting positive working relationships',
      'Role \u2014 whether people understand their role in the organisation',
      'Demands \u2014 workload, work patterns, and the working environment',
      'Change \u2014 how organisational change is managed and communicated',
    ],
    correctAnswer: 2,
    explanation:
      'This scenario is primarily a "Demands" issue. The workload (60-hour weeks), work pattern (three months without a break), and the resulting exhaustion all fall within the Demands area of the HSE Management Standards. The standard states that employees should be able to cope with the demands of their jobs and that the organisation should provide achievable demands in relation to agreed hours. While the electrician is self-employed (and therefore technically not covered by the Management Standards in an employer-employee relationship), the principle applies: their workload demands are unsustainable and are causing harm.',
  },
];

export default function RSMModule1Section3() {
  useSEO({
    title: 'Stress in the Construction Industry | Resilience & Stress Management Module 1.3',
    description:
      'HSE statistics on construction mental health, common stressors, the 6 Management Standards applied to construction, site culture, and legal duties.',
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
            <Link to="../rsm-module-1">
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
            <HardHat className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Stress in the Construction Industry
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Why construction workers face unique and severe stress risks, what the data shows, and
            what the law requires
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Statistics:</strong> Construction has the highest male suicide rate of any
                UK sector
              </li>
              <li>
                <strong>Stressors:</strong> Deadlines, finances, job insecurity, physical demands,
                culture
              </li>
              <li>
                <strong>Framework:</strong> HSE Management Standards cover 6 key areas
              </li>
              <li>
                <strong>Legal:</strong> HSWA 1974 and MHSWR 1999 impose clear duties on employers
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Lives:</strong> People are dying &mdash; this is not an abstract discussion
              </li>
              <li>
                <strong>Culture:</strong> &ldquo;Man up&rdquo; attitudes prevent help-seeking
              </li>
              <li>
                <strong>Duty:</strong> Employers have a legal obligation to manage stress risk
              </li>
              <li>
                <strong>Action:</strong> Understanding the problem is the first step to changing it
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Describe the scale of the mental health crisis in the UK construction industry',
              'Identify the common stressors that construction workers face',
              'Apply the HSE Management Standards six areas to construction scenarios',
              'Explain how site culture contributes to stress and prevents help-seeking',
              'Describe employer duties under HSWA 1974 Section 2 and MHSWR 1999 Regulation 3',
              'Understand the relevance of the Working Time Regulations 1998 to stress management',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Scale of the Problem */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Scale of the Problem
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before we discuss specific stressors and frameworks, it is important to understand
                the scale of the mental health crisis in UK construction. These are not abstract
                statistics &mdash; they represent real people, real suffering, and real loss.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Statistics</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Construction has the highest suicide rate
                      </strong>{' '}
                      of any UK industry sector among male workers. ONS data consistently shows that
                      male construction workers are at significantly elevated risk compared to the
                      general male working population.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        More construction workers die by suicide
                      </strong>{' '}
                      each year than from all site accidents combined. While the industry rightly
                      focuses on physical safety, the mental health crisis is killing more people.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">HSE Labour Force Survey data</strong> shows
                      that construction workers report significant levels of work-related stress,
                      depression, and anxiety, with many working days lost each year to
                      stress-related absence.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">The construction workforce</strong> is
                      approximately 87% male. Research consistently shows that men are less likely
                      to seek help for mental health problems, less likely to talk about their
                      feelings, and more likely to use harmful coping mechanisms such as alcohol and
                      substance use.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                These numbers represent colleagues, friends, family members, and fellow
                tradespeople. Every electrician, plumber, bricklayer, and labourer who takes their
                own life leaves behind devastated families, traumatised colleagues, and a workplace
                that will never be quite the same. The cost of inaction is measured not in pounds
                but in lives.
              </p>

              <p>
                Understanding why construction workers are at such elevated risk requires examining
                the specific stressors that characterise the industry, the cultural factors that
                prevent help-seeking, and the legal framework that should &mdash; but often does not
                &mdash; protect workers from harm.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Common Stressors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Common Stressors in Construction
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction workers face a unique combination of stressors that distinguishes the
                industry from most other sectors. These stressors interact and compound each other,
                creating a cumulative burden that can overwhelm coping resources.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Industry-Specific Stressors</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Tight Deadlines</p>
                    <p className="text-sm text-white/80">
                      Programme pressures, penalty clauses, liquidated damages, and the constant
                      push to complete work faster and cheaper. Main contractors squeeze
                      subcontractors, who squeeze their workers. The pressure cascades down.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Financial Insecurity</p>
                    <p className="text-sm text-white/80">
                      CIS self-employment means no sick pay, no holiday pay, unpredictable income,
                      late payments, and the constant pressure to find the next job. The
                      feast-and-famine cycle &mdash; overwhelmed with work one month, nothing the
                      next &mdash; creates chronic financial anxiety.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Physical Demands</p>
                    <p className="text-sm text-white/80">
                      Heavy lifting, working in awkward positions (ceiling voids, under floors),
                      exposure to weather, noise, dust, and vibration. Physical fatigue compounds
                      psychological stress and reduces the body&rsquo;s capacity to cope.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Job Insecurity</p>
                    <p className="text-sm text-white/80">
                      Short-term contracts, project-based work, the threat of redundancy when a
                      project ends, and the knowledge that you are only as good as your last job. No
                      work means no income, and there is often no safety net.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Long Commutes &amp; Time Away</p>
                    <p className="text-sm text-white/80">
                      Construction work is where the project is, not where you live. Long commutes,
                      working away from home during the week, and missing family events all create
                      strain on relationships and reduce recovery time.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Safety Risks</p>
                    <p className="text-sm text-white/80">
                      Working at height, working with electricity, confined spaces, moving plant
                      &mdash; the knowledge that a mistake could kill you or someone else is a
                      background stressor that never fully switches off. Near-misses and incidents
                      can cause lasting psychological impact.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Construction Scenario</p>
                <p className="text-sm text-white/80">
                  Consider a self-employed electrician working on CIS. They have two active jobs and
                  are quoting for a third. One client is withholding payment on a completed job
                  because of a disputed snag. Their van insurance is due next week. They are working
                  12-hour days to keep up, commuting 90 minutes each way. Their partner is
                  frustrated because they are never home. They have not taken a day off in six
                  weeks. They know they should see the doctor about persistent headaches, but they
                  cannot afford to take a day off.{' '}
                  <strong className="text-white">
                    Every stressor compounds every other stressor, and there is no single
                    &ldquo;fix&rdquo; because the problems are structural, financial, and cultural.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: HSE Management Standards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The HSE Management Standards &mdash; Applied to Construction
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Health and Safety Executive (HSE) developed the{' '}
                <strong>Management Standards</strong> approach to help employers assess and manage
                the risk of work-related stress. The framework identifies{' '}
                <strong>six key areas of work design</strong> that, if not properly managed, are
                associated with poor health outcomes, lower productivity, and increased sickness
                absence.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">The Six Management Standards</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white font-medium mb-1">1. Demands</p>
                    <p className="text-sm text-white/80">
                      Workload, work patterns, and the working environment. Workers should be able
                      to cope with the demands of their jobs. In construction: unrealistic
                      deadlines, undermanning, excessive overtime, physically demanding conditions,
                      and the expectation to &ldquo;just get it done&rdquo; regardless of resources.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white font-medium mb-1">2. Control</p>
                    <p className="text-sm text-white/80">
                      How much say the person has in the way they do their work. Workers should have
                      some autonomy and influence over their tasks. In construction: being told
                      exactly what to do and when, with no input into methods, scheduling, or
                      priorities. Micromanagement and rigid hierarchies reduce workers&rsquo; sense
                      of control.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white font-medium mb-1">3. Support</p>
                    <p className="text-sm text-white/80">
                      The encouragement, sponsorship, and resources provided by the organisation,
                      line management, and colleagues. In construction: lack of mentoring for
                      apprentices, absent or unsupportive supervisors, no access to occupational
                      health services, and the attitude that people should &ldquo;sort themselves
                      out.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white font-medium mb-1">4. Relationships</p>
                    <p className="text-sm text-white/80">
                      Promoting positive working relationships and dealing with unacceptable
                      behaviour. In construction: bullying by site managers, conflict between
                      trades, aggressive communication styles, discrimination, and
                      &ldquo;banter&rdquo; that crosses the line into harassment.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white font-medium mb-1">5. Role</p>
                    <p className="text-sm text-white/80">
                      Whether people understand their role within the organisation and whether the
                      organisation ensures that conflicting roles are avoided. In construction:
                      unclear scope of work, being asked to do tasks outside your competence or
                      contract, conflicting instructions from different supervisors, and ambiguity
                      about responsibilities.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white font-medium mb-1">6. Change</p>
                    <p className="text-sm text-white/80">
                      How organisational change is managed and communicated. In construction: sudden
                      programme changes, variations to scope with no notice, teams being broken up
                      and reformed, company restructures, and changes to working conditions imposed
                      without consultation.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                When these six areas are well-managed, people are more likely to be healthy,
                productive, and engaged. When they are poorly managed, the risk of work-related
                stress increases significantly. The Management Standards provide both a{' '}
                <strong>diagnostic tool</strong> (what is causing stress in our organisation?) and a
                <strong> framework for action</strong> (what can we do about it?).
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Site Culture */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Site Culture &mdash; The Silent Barrier
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Even when support services exist, many construction workers do not use them. The
                reason is <strong>culture</strong>. The construction industry has deeply embedded
                cultural norms that act as barriers to talking about mental health, seeking help,
                and showing vulnerability.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Cultural Barriers to Help-Seeking
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">&ldquo;Man up&rdquo; attitude</strong> &mdash;
                      the pervasive belief that real workers do not talk about their feelings, do
                      not complain, and do not ask for help. Admitting to stress or mental health
                      difficulties is seen as weakness.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Reluctance to talk</strong> &mdash; even when
                      workers recognise they are struggling, many do not know how to start the
                      conversation. They fear being judged, ridiculed, or seen as unreliable. They
                      worry it could affect their employment or reputation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Presenteeism</strong> &mdash; turning up to
                      work even when physically or mentally unwell, because the alternative (no
                      work, no pay, potential loss of the contract) feels worse than the illness.
                      Self-employed workers face this most acutely &mdash; every day off is a day
                      without income.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Normalisation of harmful behaviours</strong>{' '}
                      &mdash; excessive drinking, substance use, overwork, and aggressive behaviour
                      are sometimes normalised or even celebrated in construction culture. These are
                      often symptoms of underlying stress, not healthy coping.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Transient workforce</strong> &mdash; workers
                      move between sites, companies, and contracts frequently. This makes it harder
                      to build the kind of trust-based relationships where people feel comfortable
                      opening up about personal difficulties.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Construction Scenario</p>
                <p className="text-sm text-white/80">
                  A main contractor squeezes margins on an electrical subcontract, forcing the
                  subcontractor to understaff the job. The electrical team is working 10-hour days,
                  six days a week, to hit an unrealistic programme. One of the electricians has been
                  having panic attacks in his van before work each morning. He has not told anyone
                  because his mate said &ldquo;just crack on, we&rsquo;ve all been there.&rdquo; He
                  is self-medicating with alcohol in the evenings to switch off. His quality of work
                  is declining. His marriage is under strain.{' '}
                  <strong className="text-white">
                    The stressors are structural (programme, resources), financial (subcontract
                    squeeze), and cultural (&ldquo;man up&rdquo;). All three must be addressed.
                  </strong>
                </p>
              </div>

              <p>
                Changing site culture is slow, difficult work &mdash; but it is happening.
                Organisations such as Mates in Mind, the Lighthouse Construction Industry Charity,
                and CALM (Campaign Against Living Miserably) are working to normalise conversations
                about mental health in construction. Many major contractors now have mental health
                first aiders on site and promote awareness campaigns. The challenge is extending
                these efforts to the smaller subcontractors and sole traders who make up the
                majority of the industry.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: Legal Duties */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Legal Duties &mdash; What the Law Requires
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Managing work-related stress is not just morally right &mdash; it is a{' '}
                <strong>legal obligation</strong>. Several pieces of legislation create duties on
                employers to assess and manage psychosocial risks, including stress.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Scale className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Key Legislation</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      Health and Safety at Work etc. Act 1974 (HSWA) &mdash; Section 2
                    </p>
                    <p className="text-sm text-white/80">
                      The general duty: employers must ensure, so far as is reasonably practicable,
                      the health, safety, and welfare at work of all their employees. The term
                      &ldquo;health&rdquo; includes mental health. This means employers must
                      consider psychosocial hazards (including stress) as part of their overall
                      approach to health and safety.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      Management of Health and Safety at Work Regulations 1999 (MHSWR) &mdash;
                      Regulation 3
                    </p>
                    <p className="text-sm text-white/80">
                      Employers must carry out a suitable and sufficient assessment of the risks to
                      the health and safety of their employees. This includes the risk of
                      work-related stress. The HSE Management Standards provide the framework for
                      conducting this assessment. An employer who has not assessed stress risks is
                      potentially in breach of Regulation 3.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white font-medium mb-1">Working Time Regulations 1998</p>
                    <p className="text-sm text-white/80">
                      Sets maximum working hours (48 hours per week averaged over 17 weeks, with an
                      opt-out), requires rest breaks (20 minutes for every 6 hours worked), daily
                      rest (11 consecutive hours), and weekly rest (24 consecutive hours per week).
                      These limits exist partly to protect against the health effects of excessive
                      working hours, including stress and fatigue. In construction, opt-out
                      agreements and self-employment often mean these protections are not effective
                      in practice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Important Note</p>
                </div>
                <p className="text-sm text-white/80">
                  The legal framework is clear: employers have a duty to assess and manage the risk
                  of work-related stress. But enforcement in practice is weak, particularly for
                  small subcontractors and self-employed workers who fall outside the scope of many
                  regulations. This does not diminish the duty &mdash; it means that workers and
                  their representatives need to be aware of their rights and be willing to raise
                  concerns.{' '}
                  <strong className="text-white">
                    Knowing the law empowers you to challenge unsafe working conditions, including
                    conditions that damage mental health.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has examined why construction workers face unique and severe stress
                risks. The key points are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">The statistics are stark:</strong> Construction
                    has the highest male suicide rate of any UK sector. More workers die by suicide
                    than from site accidents.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Common stressors</strong> include tight
                    deadlines, financial insecurity, physical demands, job insecurity, long
                    commutes, and safety risks. These interact and compound each other.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">The HSE Management Standards</strong> provide a
                    framework covering Demands, Control, Support, Relationships, Role, and Change.
                    All six are relevant to construction.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Site culture</strong> &mdash; the &ldquo;man
                    up&rdquo; attitude, reluctance to talk, presenteeism &mdash; acts as a barrier
                    to help-seeking and perpetuates suffering in silence.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">The law is clear:</strong> HSWA 1974 Section 2
                    and MHSWR 1999 Regulation 3 impose duties on employers to assess and manage
                    stress risks. The Working Time Regulations 1998 set limits on hours.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Change is possible:</strong> Organisations like
                    Mates in Mind and the Lighthouse Charity are leading the way. But the work needs
                    to reach every site, every subcontractor, and every sole trader.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 4, we will learn how
                  to recognise the signs of stress &mdash; in yourself and in others. Early
                  recognition is the key to early intervention, and early intervention saves lives.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-1-section-4">
              Next: Recognising the Signs
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
