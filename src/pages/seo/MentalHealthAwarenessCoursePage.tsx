import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  GraduationCap,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Layers,
  FileCheck2,
  ShieldCheck,
  Heart,
  Users,
  MessageCircle,
  HandHeart,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Mental Health Awareness Course | Construction Industry';
const PAGE_DESCRIPTION =
  'Mental health awareness training for UK electricians and construction workers. Recognise the signs, start conversations, support colleagues, and look after your own mental health. 4 modules with video lessons, quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'Mental Health Awareness', href: '/training/mental-health-awareness' },
];

const tocItems = [
  { id: 'mental-health-in-construction', label: 'Mental Health in Construction' },
  { id: 'recognising-the-signs', label: 'Recognising the Signs' },
  { id: 'starting-conversations', label: 'Starting Conversations' },
  { id: 'supporting-yourself', label: 'Supporting Your Own Mental Health' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Construction workers are disproportionately affected by mental health problems — male construction workers in the UK are three times more likely to take their own life than the national male average, and suicide is the leading cause of death for men under 45 in the industry.',
  'The most common mental health conditions in construction are depression, anxiety, and stress — often triggered or worsened by long working hours, job insecurity, time away from family, financial pressure, and a culture that discourages talking about feelings.',
  'Recognising the signs of mental health problems in colleagues — withdrawal, irritability, changes in work quality, increased absence, loss of interest, and changes in appearance — is the first step towards offering support.',
  'You do not need to be a mental health professional to help — simply asking "are you okay?" and listening without judgement can make a significant difference to someone who is struggling.',
  'Looking after your own mental health is equally important — maintaining a routine, staying physically active, limiting alcohol, staying connected with friends and family, and seeking professional help when needed are all evidence-based strategies.',
];

const faqs = [
  {
    question: 'Why is mental health such a problem in the construction industry?',
    answer:
      'Construction has one of the highest rates of mental health problems and suicide of any UK industry. Male construction workers are 3.7 times more likely to die by suicide than the national male average. Several factors contribute: long and unpredictable working hours, physical exhaustion, job insecurity (particularly for self-employed workers and sub-contractors), time away from family on distant sites, financial pressure from feast-and-famine work patterns, a macho workplace culture that stigmatises talking about emotions, and high-risk working conditions that create constant background stress. The industry also has higher rates of alcohol and substance misuse, which are both causes and consequences of poor mental health.',
  },
  {
    question: 'Is mental health awareness training a requirement for construction workers?',
    answer:
      'While there is no single regulation mandating mental health awareness training for construction workers, the Health and Safety at Work etc. Act 1974 places a general duty on employers to ensure the health (including mental health) and safety of employees as far as reasonably practicable. The Management of Health and Safety at Work Regulations 1999 require employers to assess all risks to health, which includes stress and psychosocial risks. Many principal contractors now require mental health awareness training as part of their site induction, and organisations such as the Construction Industry Training Board (CITB) and Mates in Mind actively promote mental health training across the sector.',
  },
  {
    question: 'How can I tell if a colleague is struggling with their mental health?',
    answer:
      "Changes in behaviour are the most reliable indicators. Watch for: withdrawal from social interaction (eating lunch alone, avoiding conversation, not joining in banter that they normally would), increased irritability or short temper, decline in work quality or productivity, increased absence or lateness, loss of interest in work or activities they usually enjoy, neglecting personal appearance, increased alcohol consumption or substance use, talking about feeling hopeless or worthless, and giving away possessions. None of these signs alone confirms a mental health problem, but a pattern of change from someone's normal behaviour should prompt concern. The course teaches you how to notice these signs and respond appropriately.",
  },
  {
    question: 'What should I say to a colleague I think is struggling?',
    answer:
      'The most important thing is to start the conversation. Choose a private, quiet moment — not in front of others on site. A simple "Are you alright, mate? You haven\'t seemed yourself recently" is enough to open the door. Listen without judgement, do not try to diagnose or fix the problem, and avoid minimising their feelings ("just man up" or "everyone gets stressed"). Let them know you have noticed and you care. If they open up, ask what would help rather than telling them what to do. If they are in crisis, encourage them to contact the Samaritans (116 123, free, 24 hours) or their GP. You do not need to be a counsellor — being a compassionate listener is enough.',
  },
  {
    question: 'How long does the mental health awareness course take?',
    answer:
      'The course contains 4 modules and typically takes around 4 hours to complete. It covers the scale of mental health problems in construction, recognising the signs in colleagues and yourself, how to start supportive conversations, looking after your own mental health, and signposting to professional support services. The course is self-paced and accessible on any device. Each module includes video content, real-world scenarios from construction settings, and reflective exercises. On completion, you receive a downloadable CPD certificate.',
  },
  {
    question: 'Where can I get immediate help if I or someone else is in crisis?',
    answer:
      'If someone is in immediate danger, call 999. For crisis support: the Samaritans are available 24 hours a day, 365 days a year on 116 123 (free) or by email (jo@samaritans.org). The Construction Industry Helpline (0345 605 1956) provides support specifically for construction workers. CALM (Campaign Against Living Miserably) offers support for men on 0800 58 58 58 (5pm-midnight). Shout is a free text service — text SHOUT to 85258 for 24/7 crisis support. Mates in Mind (www.matesinmind.org) provides construction-specific mental health resources. Your GP can refer you to NHS talking therapies (formerly IAPT) for free counselling and CBT.',
  },
];

const modules = [
  {
    title: 'Understanding Mental Health in Construction',
    description:
      'The scale of the problem: suicide statistics, prevalence of depression, anxiety, and stress in construction. Contributing factors: culture, working conditions, financial insecurity, and stigma. Why electricians and tradespeople are disproportionately affected.',
  },
  {
    title: 'Recognising the Signs',
    description:
      'How to spot changes in behaviour that may indicate mental health problems. Depression, anxiety, stress, and substance misuse — what they look like on a building site. The difference between a bad day and a pattern of concern.',
  },
  {
    title: 'Starting Supportive Conversations',
    description:
      'How to approach a colleague you are concerned about. Choosing the right time and place, opening the conversation, active listening, responding without judgement, and knowing when to signpost to professional help. Practical role-play scenarios.',
  },
  {
    title: 'Looking After Your Own Mental Health',
    description:
      'Evidence-based strategies for maintaining your own mental wellbeing: routine, physical activity, sleep, social connection, limiting alcohol, and seeking help early. Building resilience in a demanding industry. Professional support services and how to access them.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any mental health awareness question in plain English. Get guidance on recognising signs, starting conversations, and accessing support services.',
  },
  {
    icon: MessageCircle,
    title: 'Conversation Scenarios',
    description:
      'Practise starting supportive conversations through realistic, construction-specific scenarios. Build confidence in your ability to reach out to a colleague who may be struggling.',
  },
  {
    icon: ClipboardCheck,
    title: 'Reflective Exercises',
    description:
      'Guided self-reflection exercises help you assess your own mental health, identify your support network, and develop a personal wellbeing plan.',
  },
  {
    icon: Clock,
    title: 'Study Anywhere',
    description:
      'Complete the course on your phone, tablet, or desktop. Study during breaks on site, at home, or on the commute. Progress syncs across all your devices automatically.',
  },
  {
    icon: HandHeart,
    title: 'Support Signposting',
    description:
      'Comprehensive directory of support services including the Samaritans, Construction Industry Helpline, CALM, Mates in Mind, and NHS talking therapies.',
  },
  {
    icon: FileCheck2,
    title: 'CPD Certificate',
    description:
      'Downloadable CPD certificate on successful completion of all four modules. Automatically recorded in your Elec-Mate CPD portfolio.',
  },
];

const sections = [
  {
    id: 'mental-health-in-construction',
    heading: 'Mental Health in the Construction Industry',
    content: (
      <>
        <p>
          The construction industry has a mental health crisis. In the UK, two construction workers
          take their own lives every working day. Male construction workers are 3.7 times more
          likely to die by suicide than the national male average, making suicide the leading cause
          of death for men under 45 in the industry. Behind these statistics are real people —
          colleagues, friends, fathers, brothers, and sons.
        </p>
        <p>
          Depression, anxiety, and work-related stress affect an estimated one in four construction
          workers at any given time. Yet the industry's traditional culture — one that values
          toughness, self-reliance, and "getting on with it" — creates powerful barriers to seeking
          help. Many workers feel that admitting to mental health problems would be seen as
          weakness, that they would be treated differently by colleagues, or that it could affect
          their employment.
        </p>
        <p>
          Electricians face specific pressures. The technical complexity of the work, the constant
          need to stay current with changing regulations like{' '}
          <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">BS 7671</SEOInternalLink>, the
          physical demands of the job, irregular hours, and the financial uncertainty that comes
          with self-employment or sub-contracting all take their toll. Add in the responsibility of
          working with potentially lethal electrical systems, and the background stress levels can
          be significant.
        </p>
        <p>
          This course does not ask you to become a mental health professional. It asks you to be a
          decent colleague — to notice when someone is not themselves, to ask if they are okay, and
          to know where to point them for help. That simple act of noticing and asking can save a
          life.
        </p>
      </>
    ),
  },
  {
    id: 'recognising-the-signs',
    heading: 'Recognising the Signs of Mental Health Problems',
    content: (
      <>
        <p>
          You do not need clinical training to notice when a colleague is struggling. What you need
          is awareness of the common signs and the willingness to pay attention to changes in the
          people you work with.
        </p>
        <p>
          <strong>Behavioural changes</strong> are often the most visible. A colleague who normally
          joins in with banter suddenly becomes quiet and withdrawn. Someone who is usually reliable
          starts arriving late or missing days. A normally careful worker begins making
          uncharacteristic mistakes or taking unnecessary risks. Work quality declines for no
          obvious reason.
        </p>
        <p>
          <strong>Emotional changes</strong> may be harder to spot but are equally significant.
          Increased irritability, snapping at colleagues over minor issues, emotional outbursts that
          seem disproportionate to the situation, or expressions of hopelessness ("what is the
          point?") should prompt concern. Some people mask depression with humour — dark jokes about
          not wanting to be here can be genuine cries for help disguised as banter.
        </p>
        <p>
          <strong>Physical signs</strong> include neglecting personal appearance, significant weight
          loss or gain, looking exhausted despite adequate sleep, increased alcohol consumption
          (particularly drinking alone or drinking to cope), and physical complaints such as
          persistent headaches, stomach problems, or unexplained pain that may have a psychological
          rather than physical cause.
        </p>
        <p>
          <strong>Social withdrawal</strong> is one of the most reliable warning signs. If someone
          who usually eats lunch with the team starts eating alone, stops responding to messages
          outside work, or seems to be isolating themselves, it is worth checking in. Electricians
          working alone on domestic jobs or in isolated parts of large commercial sites may find it
          easier to withdraw without anyone noticing — which makes it even more important to stay
          connected with your{' '}
          <SEOInternalLink href="/training/first-aid">first aid trained</SEOInternalLink> colleagues
          and your wider team.
        </p>
        <SEOAppBridge
          title="Real-world scenarios from construction settings"
          description="The Elec-Mate mental health awareness course includes realistic scenarios set on construction sites and in electrical contracting businesses. Practise identifying signs and deciding how to respond in a safe learning environment."
          icon={Heart}
        />
      </>
    ),
  },
  {
    id: 'starting-conversations',
    heading: 'Starting Supportive Conversations',
    content: (
      <>
        <p>
          The biggest barrier to supporting a colleague with mental health problems is not knowing
          what to say. Many people worry about saying the wrong thing, making the situation worse,
          or overstepping boundaries. The reality is that simply asking someone if they are okay —
          and genuinely listening to the answer — is one of the most powerful things you can do.
        </p>
        <p>
          <strong>Choose the right moment.</strong> A private, quiet setting away from other workers
          is essential. The tea break room when it is empty, a walk to the van together, or a quiet
          moment on site are all suitable. Never raise the topic in front of others or in a way that
          could embarrass the person.
        </p>
        <p>
          <strong>Keep it simple and genuine.</strong> You do not need a script. "Are you alright,
          mate? You have not seemed yourself recently" or "I have noticed you seem a bit down — is
          everything okay?" are natural, non-threatening openers. Use your own words and tone —
          forced formality makes people more uncomfortable, not less.
        </p>
        <p>
          <strong>Listen without judgement.</strong> If the person opens up, let them talk. Resist
          the urge to offer solutions, compare their problems to your own, or minimise what they are
          feeling. Phrases like "just man up," "everyone gets stressed," or "it could be worse" shut
          down the conversation and reinforce the stigma. Instead, validate their feelings: "That
          sounds really tough" or "I can understand why you are finding it hard."
        </p>
        <p>
          <strong>Know when to signpost.</strong> You are not expected to be a therapist. If a
          colleague is in crisis, encourage them to contact the Samaritans on 116 123 (free, 24
          hours) or the Construction Industry Helpline on 0345 605 1956. For longer-term support,
          their GP can refer them to NHS talking therapies. Your role is to open the door — not to
          walk through it with them unless they ask you to.
        </p>
        <p>
          Whether you are a{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship">
            first-year apprentice
          </SEOInternalLink>{' '}
          or a veteran electrician, you have the power to make a difference. Site supervisors
          completing{' '}
          <SEOInternalLink href="/training/cscs-card">CSCS card training</SEOInternalLink> should
          consider mental health awareness an equally important part of their role. Looking out for
          your mates is not soft — it is professional, it is decent, and it saves lives.
        </p>
      </>
    ),
  },
  {
    id: 'supporting-yourself',
    heading: 'Looking After Your Own Mental Health',
    content: (
      <>
        <p>
          Supporting others starts with looking after yourself. If your own mental health is poor,
          you are less able to notice when colleagues are struggling, less patient, and more likely
          to make mistakes on site. Self-care is not selfish — it is professional competence.
        </p>
        <p>
          <strong>Maintain a routine.</strong> Regular sleep, meals, and exercise create a stable
          foundation for mental wellbeing. The irregularity of construction work — early starts,
          late finishes, changing sites, weekend work — makes routine harder, but even small
          consistencies help. Go to bed at the same time, eat a proper breakfast, and protect your
          days off.
        </p>
        <p>
          <strong>Stay physically active.</strong> Exercise is one of the most effective treatments
          for mild to moderate depression and anxiety. You do not need a gym — walking, running,
          cycling, or any activity that gets your heart rate up for 30 minutes most days
          significantly reduces symptoms. The physical nature of electrical work helps, but targeted
          exercise provides additional benefits.
        </p>
        <p>
          <strong>Limit alcohol.</strong> Alcohol is a depressant. While it may seem to help in the
          short term, regular heavy drinking worsens depression and anxiety, disrupts sleep, and
          impairs judgement. If you find yourself drinking to cope with stress or feelings, that is
          a sign that something needs to change.
        </p>
        <p>
          <strong>Stay connected.</strong> Social isolation is both a symptom and a cause of poor
          mental health. Maintain relationships with friends and family. Talk about how you are
          feeling — not necessarily about mental health specifically, but about your day, your
          worries, your plans. Human connection is protective. Recording your professional
          development through{' '}
          <SEOInternalLink href="/guides/cpd-for-electricians">CPD training</SEOInternalLink> also
          provides a sense of progress and purpose.
        </p>
        <p>
          <strong>Seek help early.</strong> If you are struggling, talk to your GP. NHS talking
          therapies (cognitive behavioural therapy, counselling) are free and effective. The earlier
          you seek help, the easier it is to recover. Waiting until crisis point makes recovery
          harder and longer. There is no shame in asking for help — it is the strongest thing you
          can do.
        </p>
        <SEOAppBridge
          title="Personal wellbeing plan builder"
          description="The Elec-Mate course includes a guided personal wellbeing plan where you identify your stress triggers, your support network, your coping strategies, and your early warning signs. A practical tool you can use beyond the course."
          icon={HandHeart}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/training/first-aid',
    title: 'First Aid Course',
    description:
      'First aid training includes mental health first aid awareness and crisis response skills.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/manual-handling',
    title: 'Manual Handling Course',
    description: 'Physical wellbeing and injury prevention contribute to overall mental health.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/working-at-height',
    title: 'Working at Height Course',
    description: 'Site safety training reduces background stress and supports mental wellbeing.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/electrical-apprenticeship',
    title: 'Electrical Apprenticeship Guide',
    description:
      'Apprentices face unique mental health challenges including exam stress and workplace pressure.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/cpd-for-electricians',
    title: 'CPD for Electricians',
    description:
      'Mental health awareness counts towards your CPD requirements for competent person schemes.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-become-electrician',
    title: 'How to Become an Electrician',
    description:
      'Understanding the career path helps manage expectations and reduce career-related anxiety.',
    icon: ShieldCheck,
    category: 'Guide',
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Mental Health Awareness Course — Construction Industry',
    description: PAGE_DESCRIPTION,
    provider: {
      '@type': 'Organization',
      name: 'Elec-Mate',
      url: 'https://elec-mate.com',
    },
    educationalLevel: 'Beginner',
    inLanguage: 'en-GB',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT4H',
    },
    offers: {
      '@type': 'Offer',
      price: '4.99',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      description: '7-day free trial, then from £4.99/month',
    },
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MentalHealthAwarenessCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-09-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Wellbeing Training"
      badgeIcon={Heart}
      heroTitle={
        <>
          Mental Health Awareness: <span className="text-yellow-400">Construction Industry</span>
        </>
      }
      heroSubtitle="Essential mental health awareness training for UK electricians and construction workers. Understand the scale of the problem, recognise the signs in colleagues and yourself, learn to start supportive conversations, and know where to get help. 4 modules with video content, reflective exercises, and scenario-based learning."
      readingTime={10}
      courseDuration="4 hours"
      courseLevel="Beginner"
      coursePrerequisites="No prerequisites — suitable for all construction workers, apprentices, supervisors, and managers"
      courseModules={4}
      courseCertification="CPD certificate on completion — valid for NICEIC, NAPIT, ELECSA, and CITB portfolios."
      courseWhoIsItFor="All electricians, electrical apprentices, site supervisors, managers, and anyone working in the construction industry who wants to support colleagues and protect their own mental health"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Look out for your mates — it could save a life"
      ctaSubheading="Join 430+ UK electricians training smarter with Elec-Mate. 4 essential modules, real-world scenarios, and CPD certificate. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/mental-health-awareness"
    />
  );
}
