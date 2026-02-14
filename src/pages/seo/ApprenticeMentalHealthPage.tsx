import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Heart,
  GraduationCap,
  BookOpen,
  Brain,
  Users,
  ShieldCheck,
  Phone,
  Clock,
  Target,
  FolderOpen,
  ClipboardCheck,
  MessageSquare,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/guides/electrical-apprenticeship-guide' },
  { label: 'Mental Health', href: '/guides/apprentice-mental-health' },
];

const tocItems = [
  { id: 'why-mental-health-matters', label: 'Why Mental Health Matters' },
  { id: 'common-pressures', label: 'Common Pressures Apprentices Face' },
  { id: 'site-culture', label: 'Site Culture and Stigma' },
  { id: 'recognising-signs', label: 'Recognising the Signs' },
  { id: 'seeking-help', label: 'How to Seek Help' },
  { id: 'employer-duties', label: 'Employer Duties' },
  { id: 'building-resilience', label: 'Building Resilience' },
  { id: 'resources', label: 'Resources and Support' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Construction and electrical trades have some of the highest rates of mental health problems and suicide in the UK. Apprentices are especially vulnerable due to the combined pressures of work and study.',
  'Common pressures include financial stress on apprentice wages, exam anxiety, long commutes, physically demanding work, difficult site culture, and the challenge of balancing college and work commitments.',
  'Recognising the signs early is critical: persistent low mood, irritability, loss of motivation, poor sleep, withdrawing from friends and family, and increased use of alcohol or drugs.',
  'Your employer has a legal duty of care under the Health and Safety at Work Act 1974 and the Management of Health and Safety at Work Regulations 1999, which includes mental health.',
  'Elec-Mate supports apprentice wellbeing through structured learning that reduces exam anxiety, an AI tutor available 24/7, and study tools that help you feel prepared and in control.',
];

const faqs = [
  {
    question: 'Is mental health a real problem in the electrical trade?',
    answer:
      'Yes. The construction and trades sector has one of the highest suicide rates of any industry in the UK. According to the Office for National Statistics (ONS), male construction workers are approximately three times more likely to die by suicide than the national average for men. Electrical workers fall within this broader construction category. The reasons are well-documented: physically demanding work, long hours, time away from home, job insecurity (particularly for self-employed workers), a culture that discourages talking about feelings, and financial pressures. For apprentices, these industry-wide pressures are compounded by the stress of studying, sitting exams, building a portfolio, and preparing for the EPA while working on site. Recognising that mental health is a genuine occupational risk, not a personal weakness, is the first step to addressing it.',
  },
  {
    question: 'What should I do if I am struggling with my mental health as an apprentice?',
    answer:
      'The most important step is to talk to someone. This could be your employer, your supervisor, your training provider, a family member, a friend, or a professional. You are not expected to handle it alone, and asking for help is a sign of strength, not weakness. Practical steps include: speak to your employer or HR department about the pressures you are facing; contact your training provider, as they often have welfare support or can adjust your programme to reduce pressure; call a helpline such as the Samaritans (116 123, free and available 24/7), the Electrical Industries Charity (0800 652 0000), or SHOUT (text SHOUT to 85258); visit your GP, who can provide referrals for counselling, therapy, or medication if appropriate; and speak to your college tutor if academic pressures are contributing to your difficulties. Many employers also offer Employee Assistance Programmes (EAPs) that provide free, confidential counselling.',
  },
  {
    question: 'Can I take time off for mental health reasons?',
    answer:
      "Yes. Mental health conditions are treated the same as physical health conditions under UK employment law. If you are too unwell to work due to a mental health condition (such as anxiety, depression, or stress), you can take sick leave. You should follow your employer's normal sickness absence procedure, which usually involves notifying your employer and providing a fit note from your GP if the absence lasts more than 7 days. Under the Equality Act 2010, if you have a mental health condition that has a substantial and long-term effect on your ability to carry out normal day-to-day activities, it may qualify as a disability. In that case, your employer has a legal duty to make reasonable adjustments, such as flexible working hours, reduced workload, or additional support. As an apprentice, you also have the protection of your apprenticeship agreement, and your training provider should be involved in supporting your return to learning.",
  },
  {
    question: 'What are the signs that a colleague might be struggling with mental health?',
    answer:
      'Changes in behaviour are the most common indicator. Look for: a colleague who was previously outgoing becoming withdrawn or quiet; increased irritability, anger, or short temper; a noticeable drop in the quality of their work or increased mistakes; frequent absences or lateness; comments about feeling hopeless, worthless, or trapped; changes in appearance or hygiene; increased use of alcohol or drugs; avoiding social situations they previously enjoyed; and expressing physical symptoms like headaches, stomach problems, or fatigue that do not have a clear medical cause. If you notice these signs in a colleague, you do not need to be a counsellor. Simply asking "Are you alright?" in a genuine, private way can make a significant difference. Let them know you have noticed they seem different and that you are there to listen if they want to talk. You can also point them towards resources like the Samaritans, the Electrical Industries Charity, or their GP.',
  },
  {
    question: 'Does exam stress count as a mental health issue?',
    answer:
      "Exam stress is a normal experience, but when it becomes persistent, overwhelming, or starts to affect your daily life, it crosses into an anxiety condition that should be taken seriously. Normal exam stress motivates you to prepare and perform. Harmful exam anxiety paralyses you: you cannot concentrate, cannot sleep, cannot eat, feel physically sick before exams, or avoid studying altogether because the thought of failure is too distressing. For electrical apprentices, the exam burden is significant: Level 3 qualification, 18th Edition (C&G 2382), Inspection and Testing (C&G 2391), AM2, and EPA. That is a lot of high-stakes assessment over the course of 4 years. If you are experiencing exam anxiety that is affecting your ability to function, speak to your training provider. They can arrange additional support, extra study time, or access arrangements (such as extra time or a separate room) if you have a diagnosed condition. Using structured study tools like Elec-Mate's flashcards and mock exams can also help by making preparation feel manageable and systematic rather than overwhelming.",
  },
  {
    question: 'What is the Electrical Industries Charity and how can they help?',
    answer:
      'The Electrical Industries Charity (EIC, formerly the Electrical Industries Benevolent Association) is a UK charity specifically for people working in the electrical and energy sectors. They provide free, confidential support for mental health and financial difficulties. Their services include: a 24/7 helpline (0800 652 0000) staffed by trained advisors; access to professional counselling; financial assistance for people in the electrical industry facing hardship; career advice and support; and resources specifically tailored to the challenges of working in the electrical trade. They understand the specific pressures of the industry, including site culture, long hours, exam stress, and the financial challenges faced by apprentices. If you are an electrical apprentice or electrician experiencing mental health difficulties, financial problems, or any other personal crisis, the EIC is one of the best specialist resources available.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description: 'Complete overview of the electrical apprenticeship from start to finish.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-assessment-guide',
    title: 'Assessment Guide',
    description: 'What to expect at on-programme assessment, gateway, and EPA.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/on-the-job-training-guide',
    title: 'On-the-Job Training Guide',
    description: 'Making every day on site count for your apprenticeship development.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-portfolio-guide',
    title: 'Portfolio Building Guide',
    description: 'Build a comprehensive portfolio without the last-minute stress.',
    icon: FolderOpen,
    category: 'Guide',
  },
  {
    href: '/guides/epa-preparation',
    title: 'EPA Preparation Guide',
    description: 'Reduce exam anxiety with structured EPA preparation strategies.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/site-diary-for-apprentices',
    title: 'Site Diary Guide',
    description: 'Daily diary keeping that builds confidence through visible progress.',
    icon: BookOpen,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-mental-health-matters',
    heading: 'Why Mental Health Matters for Electrical Apprentices',
    content: (
      <>
        <p>
          The UK construction industry, which includes electrical installation, has one of the worst
          mental health records of any sector. According to the Office for National Statistics
          (ONS), male construction workers are approximately three times more likely to die by
          suicide than the average for men in England and Wales. The Samaritans report that
          construction workers are also more likely to experience depression and anxiety than
          workers in most other industries.
        </p>
        <p>
          Electrical apprentices are particularly at risk because they face a unique combination of
          pressures: the physical demands and culture of construction sites, the academic pressure
          of studying for multiple qualifications, the financial strain of low apprentice wages, and
          the developmental challenges of transitioning from education to the workplace. All of this
          happens during a period of life (typically ages 16 to 22) when people are most vulnerable
          to developing mental health problems.
        </p>
        <p>
          Talking about mental health in the electrical trade is not easy. Site culture often
          discourages vulnerability, and many apprentices feel they need to appear tough, capable,
          and unfazed. But ignoring mental health does not make the problems go away. It makes them
          worse. This guide is about recognising the pressures, knowing the signs, understanding
          your rights, and finding the support you need.
        </p>
      </>
    ),
  },
  {
    id: 'common-pressures',
    heading: 'Common Pressures Electrical Apprentices Face',
    content: (
      <>
        <p>
          Understanding the specific pressures is the first step to managing them. These are the
          most commonly reported sources of stress among electrical apprentices in the UK.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Financial stress</strong> — apprentice wages are significantly lower than
                qualified electrician rates. Managing rent, travel costs, tool purchases, and daily
                living on apprentice pay is genuinely difficult, especially in high-cost areas. The
                national minimum wage for apprentices in 2026 is well below the living wage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Exam anxiety</strong> — the{' '}
                <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
                  electrical apprenticeship
                </SEOInternalLink>{' '}
                involves multiple high-stakes qualifications: Level 3, 18th Edition, C&G 2391, AM2,
                and EPA. The volume of exams and assessments is relentless, and failing any one of
                them can feel catastrophic.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Difficult site culture</strong> — some construction sites have a culture of
                bullying, banter that crosses the line, or dismissive attitudes towards apprentices.
                Being the youngest and least experienced person on site can feel isolating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Work-life balance</strong> — early starts, long commutes, physical tiredness
                after a day on site, and then having to study or complete coursework in the evening.
                There is often very little time left for socialising, hobbies, or rest.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Imposter syndrome</strong> — feeling like everyone else understands the work
                and you are the only one struggling. This is extremely common among apprentices and
                is almost always inaccurate. Most of your peers feel the same way.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Relationship strain</strong> — the demands of the apprenticeship can put
                pressure on personal relationships. Partners, friends, and family may not fully
                understand the workload, and the apprentice may feel guilty about the time they
                cannot spend with loved ones.
              </span>
            </li>
          </ul>
        </div>
        <p>
          None of these pressures are unusual. They are a normal part of the apprenticeship
          experience, and most apprentices feel them to some degree. The problem is not the
          pressures themselves; it is when they accumulate without relief, without support, and
          without anyone to talk to.
        </p>
      </>
    ),
  },
  {
    id: 'site-culture',
    heading: 'Site Culture and the Stigma Around Mental Health',
    content: (
      <>
        <p>
          Construction sites have traditionally been environments where showing vulnerability is
          discouraged. Phrases like "man up," "get on with it," and "everyone goes through it" are
          still common. For many apprentices, the idea of telling their supervisor or colleagues
          that they are struggling feels impossible.
        </p>
        <p>
          The good news is that this is changing. Organisations like Mates in Mind, the Lighthouse
          Construction Industry Charity, and the Electrical Industries Charity are working to shift
          attitudes. Many larger contractors now have mental health first aiders on site, and
          awareness campaigns are reaching more workers every year. But progress is slow, and on
          many sites, the old culture persists.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">What You Can Do</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                You do not have to disclose your mental health to everyone on site. But find at
                least one person you trust — a supervisor, a colleague, a friend outside work — and
                talk to them.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                If you witness bullying, harassment, or behaviour that crosses the line from banter
                to cruelty, report it. Your employer has a legal duty to address it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                If a colleague seems to be struggling, check in with them. A simple "You alright,
                mate?" said privately and genuinely can make a bigger difference than you think.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                Remember that the people who dismiss mental health are usually the ones most afraid
                of confronting their own. Their attitude says nothing about you.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'recognising-signs',
    heading: 'Recognising the Signs',
    content: (
      <>
        <p>
          Mental health problems do not always announce themselves obviously. They often build
          gradually, and it can be hard to recognise when normal stress has tipped into something
          more serious. Watch for these signs in yourself and in your colleagues:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Persistent low mood</strong> — feeling sad, empty, or hopeless most of the
                day, most days, for more than two weeks. Not just a bad day, but a sustained period
                of feeling low.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loss of interest or motivation</strong> — activities you used to enjoy feel
                pointless. You cannot motivate yourself to study, go to work, or spend time with
                people. Everything feels like effort.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sleep problems</strong> — difficulty falling asleep, waking up in the night,
                or sleeping excessively. Feeling exhausted even after a full night's sleep.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Irritability and anger</strong> — snapping at colleagues, family, or friends
                over small things. Feeling on edge or easily frustrated. Overreacting to minor
                problems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Physical symptoms</strong> — headaches, stomach problems, chest tightness,
                muscle tension, or frequent illness. Anxiety and depression can manifest physically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Withdrawal</strong> — avoiding social situations, not answering messages,
                calling in sick more often, or isolating yourself. Feeling like nobody understands
                or that you are a burden.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Increased substance use</strong> — drinking more, using drugs, or relying on
                substances to cope with stress or to sleep. This is a coping mechanism, not a
                solution.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you recognise several of these signs in yourself and they have been present for more
          than two weeks, it is time to seek support. You do not need to wait until you are in
          crisis. Early intervention is always more effective than waiting until things get worse.
        </p>
      </>
    ),
  },
  {
    id: 'seeking-help',
    heading: 'How to Seek Help',
    content: (
      <>
        <p>
          Seeking help is the most important thing you can do. It is also the hardest step for many
          people, especially in an industry that has traditionally discouraged vulnerability. Here
          are practical options:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Talk to someone you trust</strong> — a family member, friend, partner,
                supervisor, or colleague. You do not need to have all the answers. Just saying "I am
                not doing great" is enough to start the conversation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contact your training provider</strong> — colleges and training providers
                have welfare and pastoral support teams. They can adjust your programme, provide
                extra support, or refer you to specialist services. This is confidential.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>See your GP</strong> — your doctor can provide referrals for talking
                therapies (such as CBT through the NHS), prescribe medication if appropriate, and
                sign you off work if you need time to recover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call a helpline</strong> — Samaritans (116 123, free, 24/7), Electrical
                Industries Charity (0800 652 0000), SHOUT crisis text line (text SHOUT to 85258), or
                CALM (Campaign Against Living Miserably, 0800 58 58 58).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use your employer's EAP</strong> — if your employer has an Employee
                Assistance Programme, you can access free, confidential counselling. Ask your HR
                department or manager.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you or someone you know is in immediate danger, call 999. If you are having thoughts of
          suicide, call the Samaritans immediately on 116 123. You do not need to be at the point of
          crisis to call. They are there for anyone who is struggling.
        </p>
      </>
    ),
  },
  {
    id: 'employer-duties',
    heading: 'Employer Duties: Your Rights as an Apprentice',
    content: (
      <>
        <p>
          Your employer has legal responsibilities regarding your mental health. These are not
          optional; they are part of UK health and safety law.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and Safety at Work Act 1974</strong> — employers must ensure, so far
                as is reasonably practicable, the health, safety, and welfare of all employees.
                "Health" includes mental health.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Management of Health and Safety at Work Regulations 1999</strong> —
                employers must assess and manage risks to health, including stress and mental health
                risks. Work related stress is a recognised occupational hazard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equality Act 2010</strong> — if you have a mental health condition that
                qualifies as a disability, your employer must make reasonable adjustments. This
                could include flexible hours, adjusted workload, or additional support.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duty of care to apprentices</strong> — as an apprentice, you have additional
                protections under your apprenticeship agreement. Your employer must provide a safe
                and supportive working environment and ensure your wellbeing is considered.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, this means your employer should: not expose you to excessive working hours or
          unreasonable workloads; address bullying and harassment promptly; provide support when you
          raise concerns about your wellbeing; allow time off for medical appointments; and not
          penalise you for being open about mental health difficulties.
        </p>
        <p>
          If your employer is not meeting these duties, you can raise a concern with your training
          provider, contact ACAS (Advisory, Conciliation and Arbitration Service) on 0300 123 1100,
          or seek advice from a trade union if you are a member.
        </p>
      </>
    ),
  },
  {
    id: 'building-resilience',
    heading: 'Building Resilience: Practical Strategies',
    content: (
      <>
        <p>
          Resilience is not about being tough or pretending everything is fine. It is about
          developing habits and strategies that help you manage pressure, recover from setbacks, and
          maintain your wellbeing over the long term. Here are evidence-based strategies that work:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Break study into small chunks</strong> — do not try to revise for 4 hours
                straight. Use 25-minute focused sessions with 5-minute breaks (the Pomodoro
                technique). Elec-Mate's flashcards and mock exams are designed for short, focused
                sessions that you can fit into bus journeys, lunch breaks, and quiet evenings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Talk regularly</strong> — do not wait until you are in crisis. Make a habit
                of checking in with someone about how you are feeling. It could be a friend, a
                partner, a family member, or a fellow apprentice. Regular conversation prevents
                problems from building up silently.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protect your sleep</strong> — aim for 7 to 9 hours. Avoid screens for 30
                minutes before bed. Keep a consistent sleep schedule, even on weekends. Sleep is the
                single most important factor in mental health recovery.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stay physically active</strong> — you are already physically active on site,
                but structured exercise (even a 20-minute walk or a gym session) has a proven
                positive effect on mood, anxiety, and sleep quality.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Set realistic goals</strong> — do not try to do everything at once. Set one
                or two achievable goals per week for your apprenticeship. Celebrate progress, even
                small progress. Completing one flashcard session is better than planning to complete
                ten and doing none.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Reduce exam anxiety with structured study"
          description="Elec-Mate's 46+ courses, flashcards, and mock exams break the apprenticeship syllabus into manageable daily sessions. See your progress build over time. Feel prepared, not overwhelmed."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'resources',
    heading: 'Resources and Support Organisations',
    content: (
      <>
        <p>
          These organisations provide free, confidential support. Save these numbers in your phone.
          You may not need them today, but knowing they are there can make a difference when you do.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Samaritans</h4>
                <p className="text-white text-sm leading-relaxed">
                  Call 116 123 (free, 24 hours a day, 7 days a week). You can also email
                  jo@samaritans.org. Available to anyone who is struggling, not just those in
                  crisis.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Electrical Industries Charity</h4>
                <p className="text-white text-sm leading-relaxed">
                  Call 0800 652 0000 (free). Specialist support for people in the electrical and
                  energy industries. Mental health support, financial assistance, and career advice.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">SHOUT Crisis Text Line</h4>
                <p className="text-white text-sm leading-relaxed">
                  Text SHOUT to 85258 (free, 24/7). If you prefer texting to calling, SHOUT connects
                  you with a trained crisis counsellor via text message.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  CALM (Campaign Against Living Miserably)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Call 0800 58 58 58 (free, 5pm to midnight). Webchat available at thecalmzone.net.
                  Specifically aimed at men, who make up the majority of construction workers.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Mates in Mind</h4>
                <p className="text-white text-sm leading-relaxed">
                  A charity focused on mental health in the construction industry. Resources,
                  training, and employer toolkits at matesinmind.org.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          You are not alone. Thousands of electrical apprentices in the UK are dealing with the same
          pressures. Asking for help is not weakness. It is the most competent thing you can do.
        </p>
        <SEOAppBridge
          title="Study tools that work around your life"
          description="Elec-Mate's apprentice hub gives you 46+ courses, flashcards, mock exams, EPA and AM2 simulators, site diary, OJT tracker, and an AI tutor. Study in short sessions on your phone. Build confidence one step at a time."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ApprenticeMentalHealthPage() {
  return (
    <GuideTemplate
      title="Mental Health for Electrical Apprentices | Support Guide"
      description="Mental health support guide for UK electrical apprentices. Common pressures, recognising the signs, site culture, employer duties, building resilience, and specialist resources including the Electrical Industries Charity."
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Wellbeing Guide"
      badgeIcon={Heart}
      heroTitle={
        <>
          Mental Health for Electrical Apprentices:{' '}
          <span className="text-yellow-400">You Are Not Alone</span>
        </>
      }
      heroSubtitle="The electrical trade has some of the highest rates of mental health problems in the UK. Apprentices face unique pressures: low pay, exam stress, physically demanding work, and a culture that discourages talking about feelings. This guide covers common pressures, warning signs, employer duties, support resources, and practical strategies for building resilience."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Apprentice Mental Health"
      relatedPages={relatedPages}
      ctaHeading="Study Tools That Reduce the Pressure"
      ctaSubheading="Elec-Mate breaks the apprenticeship syllabus into manageable daily sessions. 46+ courses, flashcards, mock exams, EPA simulator, portfolio builder, and AI tutor. Study at your own pace. 7-day free trial."
    />
  );
}
