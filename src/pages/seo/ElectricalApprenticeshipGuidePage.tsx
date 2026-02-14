import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  GraduationCap,
  BookOpen,
  Brain,
  Target,
  Award,
  ClipboardCheck,
  Clock,
  Briefcase,
  FileCheck2,
  PoundSterling,
  Users,
  Zap,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Electrical Apprenticeship Guide', href: '/guides/electrical-apprenticeship-guide' },
];

const tocItems = [
  { id: 'what-is-apprenticeship', label: 'What Is an Electrical Apprenticeship?' },
  { id: 'finding-apprenticeship', label: 'Finding an Apprenticeship' },
  { id: 'what-to-expect', label: 'What to Expect' },
  { id: 'pay-rates', label: 'Apprentice Pay Rates 2026' },
  { id: 'qualifications-earned', label: 'Qualifications Earned' },
  { id: 'end-point-assessment', label: 'End Point Assessment' },
  { id: 'career-after', label: 'Career After Your Apprenticeship' },
  { id: 'elecmate-for-apprentices', label: 'Elec-Mate for Apprentices' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An electrical apprenticeship in the UK typically lasts 3 to 4 years and combines on-the-job training with college-based study, leading to Level 2 and Level 3 diplomas plus the AM2 practical assessment.',
  'You must complete a minimum of 20% off-the-job training throughout your apprenticeship, including college days, online study, and structured workplace learning. Elec-Mate tracks these hours automatically.',
  'Apprentice pay starts at the National Apprentice Rate (currently around 6.40 pounds per hour in Year 1) and rises each year. Many employers pay above the minimum, especially from Year 2 onwards.',
  'The End Point Assessment (EPA) is the final independent assessment at the end of your apprenticeship. Elec-Mate has an EPA simulator with AI grading so you can practise all three components before the real thing.',
  'After completing your apprenticeship, you can apply for a JIB ECS Gold Card, join a competent person scheme (NICEIC, NAPIT), and begin working as a fully qualified electrician earning 35,000 to 45,000 pounds per year.',
];

const faqs = [
  {
    question: 'How long does an electrical apprenticeship take in the UK?',
    answer:
      'An electrical apprenticeship in the UK typically takes between 3 and 4 years to complete, depending on the training provider and the employer. The programme covers both Level 2 and Level 3 qualifications, with the first year or two focused on the Level 2 Diploma in Electrical Installation and the remaining years on the Level 3 Diploma. Some training providers offer accelerated routes for candidates who already hold related qualifications (for example, a Level 2 in a construction trade), but for most school leavers starting from scratch, 3 to 4 years is the standard duration. The apprenticeship finishes with the AM2 practical assessment and the End Point Assessment (EPA), both of which must be passed to achieve the full apprenticeship standard.',
  },
  {
    question: 'What qualifications do I need to start an electrical apprenticeship?',
    answer:
      'Most employers and training providers require a minimum of GCSEs at grade 4 (C) or above in English and Maths. Science is also highly valued, particularly physics, as electrical theory draws heavily on concepts such as Ohms law, voltage, current, resistance, and power. Some employers accept equivalent qualifications, such as functional skills at Level 2. Beyond academic qualifications, employers look for practical aptitude, a willingness to learn, reliability, and good communication skills. If you do not hold Level 2 in English and Maths when you start, you will need to achieve them during your apprenticeship, as they are gateway requirements for the End Point Assessment.',
  },
  {
    question: 'What is the difference between JTL and CITB for electrical apprenticeships?',
    answer:
      'JTL (formerly Joint Training Limited) and CITB (Construction Industry Training Board) are two of the main organisations that support electrical apprenticeships in the UK, but they serve different roles. JTL is a specialist electrical and plumbing apprenticeship provider. They recruit apprentices, match them with employers, deliver the off-the-job training (either at JTL training centres or partner colleges), and manage the apprenticeship from start to finish. JTL is the largest provider of electrical apprenticeships in England and Wales. CITB is the industry training board for the wider construction sector. They provide grants to employers who take on apprentices, fund training programmes, and support the construction workforce through levy funding. An employer might receive a CITB grant to help cover the costs of employing an electrical apprentice who is training through JTL or another provider. In short, JTL trains apprentices; CITB funds and supports the broader training ecosystem.',
  },
  {
    question: 'Can I do an electrical apprenticeship as a mature student or career changer?',
    answer:
      'Yes, there is no upper age limit for electrical apprenticeships in England. While the majority of apprentices start at 16 to 18, an increasing number of career changers enter the trade in their 20s, 30s, and even 40s. The main challenge for mature apprentices is the pay — the apprentice minimum wage applies regardless of age during the first year, though many employers pay above this for mature candidates. After the first year, you are entitled to the National Minimum Wage for your age group. Some mature candidates choose to self-fund a fast-track route through a training provider rather than doing a traditional apprenticeship, but the apprenticeship route is generally considered the best path because it combines hands-on experience with structured learning. Elec-Mate supports apprentices of all ages with the same tools — flashcards, mock exams, EPA simulator, and OJT hour tracker work regardless of your starting point.',
  },
  {
    question: 'What is the 20% off-the-job training requirement?',
    answer:
      'The 20% off-the-job training requirement means that at least 20% of your paid working hours must be spent on structured learning that is directly relevant to your apprenticeship. This includes college days or block release, online study and e-learning, manufacturer training and trade courses, mentoring and shadowing of experienced colleagues (when structured around specific learning outcomes), and study using platforms like Elec-Mate. Importantly, productive work on site does not count towards off-the-job training unless it is being done specifically as a structured learning activity with clear learning objectives. Your employer and training provider are jointly responsible for ensuring you meet the 20% requirement, and it is a gateway condition for the End Point Assessment. Elec-Mate automatically tracks study hours on the platform and logs them towards your off-the-job training target of 400 hours, making it easy to demonstrate compliance.',
  },
  {
    question: 'How much does an electrical apprenticeship cost?',
    answer:
      'For the apprentice, an electrical apprenticeship in England is free — the training costs are covered by government funding (for apprentices aged 16 to 18) or co-funded by the employer and the government through the apprenticeship levy system (for apprentices aged 19 and over). The employer pays the apprentice a wage throughout the apprenticeship and may also contribute to training costs depending on their levy status. Large employers (those with a payroll above 3 million pounds) pay the apprenticeship levy and draw down funding from their levy account. Smaller employers co-invest 5% of the training cost, with the government covering the remaining 95%. The total training cost for an electrical apprenticeship is typically between 15,000 and 27,000 pounds over the full duration, but this is paid by the employer and government, not by the apprentice. Additional costs for the apprentice may include tools (often a few hundred pounds for a basic kit) and test instruments (the AM2 requires your own calibrated multifunction tester).',
  },
];

const relatedPages = [
  {
    href: '/training/apprentice-training',
    title: 'Apprentice Training Hub',
    description:
      'Level 2 and Level 3 courses, flashcards, mock exams, and practice questions for electrical apprentices.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/am2-exam-tips',
    title: 'AM2 Exam Tips',
    description: 'What to expect on AM2 day, common failures, and how to pass first time.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/epa-preparation',
    title: 'EPA Preparation',
    description: 'End Point Assessment simulator with AI grading for all three EPA components.',
    icon: ClipboardCheck,
    category: 'Training',
  },
  {
    href: '/guides/level-2-electrical',
    title: 'Level 2 Electrical',
    description:
      'Everything you need to know about the Level 2 Diploma in Electrical Installation.',
    icon: BookOpen,
    category: 'Training',
  },
  {
    href: '/guides/level-3-electrical',
    title: 'Level 3 Electrical',
    description: 'Level 3 diploma content, exam preparation, and career progression.',
    icon: Award,
    category: 'Training',
  },
  {
    href: '/guides/electrical-qualifications-pathway',
    title: 'Qualifications Pathway',
    description:
      'Complete map from apprentice to master electrician — every qualification explained.',
    icon: Briefcase,
    category: 'Guide',
  },
];

const sections = [
  {
    id: 'what-is-apprenticeship',
    heading: 'What Is an Electrical Apprenticeship?',
    content: (
      <>
        <p>
          An electrical apprenticeship is a structured programme that trains you to become a fully
          qualified electrician over 3 to 4 years. It combines on-the-job learning (working for an
          electrical employer on real installations) with off-the-job training (college days, online
          study, and structured learning). By the end, you hold nationally recognised qualifications
          and have the practical competence to work independently.
        </p>
        <p>
          The apprenticeship follows the Installation Electrician / Maintenance Electrician standard
          (ST0215), published by the Institute for Apprenticeships and Technical Education (IfATE).
          This standard defines the knowledge, skills, and behaviours you must demonstrate by the
          end of the programme. It covers everything from basic electrical science and health and
          safety to BS 7671 wiring regulations, circuit design, inspection and testing, and fault
          diagnosis.
        </p>
        <p>
          The qualification pathway within the apprenticeship progresses through two main stages.
          You begin with the{' '}
          <SEOInternalLink href="/guides/level-2-electrical">
            Level 2 Diploma in Electrical Installation
          </SEOInternalLink>
          , which covers fundamental skills — cable installation, basic wiring, health and safety,
          and electrical science. Once Level 2 is complete, you move to the{' '}
          <SEOInternalLink href="/guides/level-3-electrical">
            Level 3 Diploma in Electrical Installation
          </SEOInternalLink>
          , which covers more advanced topics including circuit design, inspection and testing,
          fault diagnosis, and the application of BS 7671. The apprenticeship concludes with the AM2
          practical assessment and the End Point Assessment (EPA).
        </p>
        <p>
          Unlike university courses or college-only qualifications, the apprenticeship gives you
          real working experience from day one. You earn a wage while you train, you work on real
          installations with experienced electricians, and you build the practical skills that
          employers value most. This combination of theory and practice is why the apprenticeship
          route produces the most employable electricians.
        </p>
      </>
    ),
  },
  {
    id: 'finding-apprenticeship',
    heading: 'Finding an Electrical Apprenticeship',
    content: (
      <>
        <p>
          Finding an electrical apprenticeship requires persistence and a strategic approach. There
          are several routes to explore, and applying through multiple channels simultaneously gives
          you the best chance of success.
        </p>
        <p>
          <strong>JTL (Joint Training Limited):</strong> JTL is the largest provider of electrical
          apprenticeships in England and Wales. They recruit apprentices directly, match them with
          employers, and deliver the training. You can apply through the JTL website, and they will
          help you find an employer placement. JTL apprentices attend JTL training centres or
          partner colleges for their off-the-job training.
        </p>
        <p>
          <strong>Government Apprenticeship Service:</strong> The Find an Apprenticeship website
          (gov.uk) lists all available apprenticeship vacancies across England. Search for
          "electrician," "electrical installation," or "electrical maintenance" to find current
          openings. You can filter by location and apply directly to employers through the platform.
        </p>
        <p>
          <strong>Direct approach to employers:</strong> Many electrical contractors recruit
          apprentices directly through their own websites, social media, or word of mouth. Contact
          local electrical firms, ask if they take on apprentices, and express your interest. A
          well-written CV that highlights your enthusiasm, any relevant experience (even DIY or
          school projects), and your academic qualifications will help you stand out.
        </p>
        <p>
          <strong>Training providers:</strong> Colleges and private training providers such as BESC
          (Building Engineering Services Competence), EAL, and local FE colleges run electrical
          apprenticeship programmes. Some will help you find an employer, while others require you
          to have an employer lined up before you enrol. CITB (Construction Industry Training Board)
          also provides grants to employers who take on construction apprentices, which can make
          your application more attractive to potential employers.
        </p>
        <p>
          <strong>Tips for success:</strong> Apply early — many employers recruit 6 to 12 months
          ahead. Be prepared to attend interviews and practical assessments. Show genuine interest
          in the trade, not just the qualification. Any practical experience you can demonstrate
          (work experience placements, part-time site work, even rewiring a lamp) sets you apart
          from candidates with no hands-on background.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-expect',
    heading: 'What to Expect During Your Apprenticeship',
    content: (
      <>
        <p>
          The typical electrical apprenticeship involves a split between on-the-job learning and
          off-the-job training. The exact split varies by employer and training provider, but the
          minimum requirement is 20% off-the-job training throughout the programme.
        </p>
        <p>
          <strong>On-the-job learning:</strong> This is where you spend the majority of your time.
          You work alongside experienced electricians on real installations — domestic rewires,
          commercial fit-outs, industrial maintenance, or new-build housing. In the first year, you
          will mostly be assisting, carrying materials, running cables, and learning the basics. As
          you progress, you take on more responsibility: wiring circuits independently, terminating
          accessories, and eventually performing testing and inspection under supervision.
        </p>
        <p>
          <strong>Off-the-job training (college days):</strong> Most apprentices attend college one
          day per week or in block release (a week at a time, several times per year). College
          covers the theory: electrical science, BS 7671 wiring regulations, health and safety
          legislation, circuit design calculations, and the knowledge elements of the Level 2 and
          Level 3 diplomas. You will sit exams and practical assessments at college throughout the
          programme.
        </p>
        <p>
          <strong>Online study and self-directed learning:</strong> Increasingly, off-the-job
          training includes online platforms like Elec-Mate. Study sessions, practice questions,
          flashcard revision, and mock exams all count towards your 20% off-the-job hours. This
          flexibility means you can study on your phone between jobs, on the commute, or in the
          evenings — fitting learning around your working schedule.
        </p>
        <p>
          <strong>Portfolio building:</strong> Throughout the apprenticeship, you build a{' '}
          <SEOInternalLink href="/training/apprentice-portfolio">
            portfolio of evidence
          </SEOInternalLink>{' '}
          demonstrating your competence across the apprenticeship standard criteria. This includes
          photographs of completed work, reflective accounts, witness testimonies from your
          employer, and records of training activities. The portfolio is a gateway requirement for
          the End Point Assessment and forms the basis of the professional discussion.
        </p>
        <SEOAppBridge
          title="Track Your 20% Off-the-Job Hours Automatically"
          description="Elec-Mate logs every minute of study on the platform towards your OJT hour target of 400 hours. No manual timesheets. See your progress, identify gaps, and prove compliance at your EPA gateway review."
          icon={Clock}
        />
      </>
    ),
  },
  {
    id: 'pay-rates',
    heading: 'Apprentice Pay Rates 2026',
    content: (
      <>
        <p>
          Electrical apprentice pay varies depending on the employer, your age, and which year of
          the apprenticeship you are in. Here are the key pay benchmarks for 2026.
        </p>
        <p>
          <strong>Year 1:</strong> The National Apprentice Rate applies, which is currently
          approximately 6.40 pounds per hour. This rate applies to all apprentices aged 16 and over
          during their first year, regardless of age. Many electrical employers pay above the
          minimum, particularly JIB-registered companies, which follow the JIB National Working
          Rules pay grades for apprentices.
        </p>
        <p>
          <strong>Year 2 onwards:</strong> After the first year of the apprenticeship, you are
          entitled to the National Minimum Wage for your age group. For apprentices aged 18 to 20,
          this is significantly higher than the apprentice rate. Employers who follow JIB rates
          typically pay above the NMW, with pay increasing each year as you progress through the
          apprenticeship stages (Stage 1, Stage 2, Stage 3).
        </p>
        <p>
          <strong>JIB rates:</strong> The JIB publishes recommended pay rates for electrical
          apprentices at each stage. These are generally higher than the statutory minimums and are
          followed by most medium and large electrical contractors. JIB Stage 3 apprentices (final
          year) typically earn between 10 and 14 pounds per hour, depending on the employer and
          region.
        </p>
        <p>
          <strong>After qualification:</strong> Once you pass the AM2 and EPA and become a fully
          qualified electrician, your earning potential increases substantially. Starting salaries
          for newly qualified electricians are typically between 28,000 and 35,000 pounds per year,
          rising to 35,000 to 45,000 with experience. Self-employed electricians and those working
          overtime, on-call, or in specialised sectors (data centres, oil and gas, rail) can earn
          significantly more.
        </p>
        <p>
          <strong>Additional benefits:</strong> Beyond basic pay, many employers provide a company
          van (especially from Year 2 or 3), tool allowances, pension contributions, and paid
          college days. The total package is often worth considerably more than the hourly rate
          alone.
        </p>
      </>
    ),
  },
  {
    id: 'qualifications-earned',
    heading: 'Qualifications You Earn During the Apprenticeship',
    content: (
      <>
        <p>
          By the end of a complete electrical apprenticeship, you will hold several nationally
          recognised qualifications that together confirm your competence as a professional
          electrician.
        </p>
        <p>
          <strong>Level 2 Diploma in Electrical Installation (C&G 2365-02 or equivalent):</strong>{' '}
          This covers the fundamental knowledge and skills of electrical installation: health and
          safety, electrical science, wiring systems and enclosures, termination and connection of
          cables, and the principles of electrical installation. It is typically achieved in the
          first 12 to 18 months of the apprenticeship.
        </p>
        <p>
          <strong>Level 3 Diploma in Electrical Installation (C&G 2365-03 or equivalent):</strong>{' '}
          This is the advanced qualification covering circuit design, inspection and testing, fault
          diagnosis, BS 7671 application, and the science behind electrical installations. It builds
          on the Level 2 foundation and takes your theoretical knowledge to the standard expected of
          a qualified electrician.
        </p>
        <p>
          <strong>AM2 Assessment (Achievement Measurement 2):</strong> The{' '}
          <SEOInternalLink href="/guides/am2-exam-tips">AM2 practical assessment</SEOInternalLink>{' '}
          is a hands-on test administered by National Electrotechnical Training (NET) on behalf of
          the Joint Industry Board (JIB). It demonstrates that you can carry out electrical
          installation work safely and competently under timed conditions. Passing the AM2 is
          required for the JIB ECS Gold Card.
        </p>
        <p>
          <strong>18th Edition (BS 7671) qualification:</strong> Most training providers include the
          C&G 2382 (18th Edition Wiring Regulations) as part of the apprenticeship programme. This
          qualification confirms your understanding of the current edition of the IET Wiring
          Regulations and is required by most employers and competent person schemes.
        </p>
        <p>
          <strong>Functional Skills:</strong> If you do not already hold Level 2 English and Maths
          (or equivalent GCSEs), you will achieve these during the apprenticeship. They are
          mandatory gateway requirements for the End Point Assessment.
        </p>
        <SEOAppBridge
          title="2,000+ Practice Questions for Level 2 and Level 3"
          description="Elec-Mate has over 2,000 practice questions covering every topic in the Level 2 and Level 3 diplomas. Flashcards with spaced repetition, mock exams, and an AI study assistant that explains answers in plain English."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'end-point-assessment',
    heading: 'The End Point Assessment (EPA)',
    content: (
      <>
        <p>
          The End Point Assessment is the final independent assessment at the end of your
          apprenticeship. It is carried out by an approved End Point Assessment Organisation (EPAO),
          not by your training provider or employer. The EPA confirms that you have achieved the
          full range of knowledge, skills, and behaviours defined in the apprenticeship standard.
        </p>
        <p>
          Before you can attempt the EPA, you must pass through the "gateway." The gateway
          requirements include: completion of the Level 3 Diploma, achievement of the AM2 practical
          assessment, Level 2 Functional Skills in English and Maths, a comprehensive{' '}
          <SEOInternalLink href="/training/apprentice-portfolio">
            portfolio of evidence
          </SEOInternalLink>
          , meeting the 20% off-the-job training hours requirement, and agreement from both your
          employer and training provider that you are ready.
        </p>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/epa-preparation">
            EPA itself consists of three components
          </SEOInternalLink>
          : a practical assessment (similar to the AM2 but assessed by the EPAO), a knowledge test
          (covering the full breadth of the apprenticeship standard), and a professional discussion
          with portfolio review (a structured conversation about your on-the-job experiences). You
          must pass all three to achieve the apprenticeship, with grades of Pass, Distinction, or
          Fail.
        </p>
        <p>
          The professional discussion is the component that catches many apprentices off guard
          because it is unlike any exam format they have experienced. The assessor reviews your
          portfolio and asks open-ended questions about your experiences, your understanding of
          technical concepts, and your professional development. Practising this format beforehand
          is essential.
        </p>
        <SEOAppBridge
          title="EPA Simulator with AI Grading"
          description="Elec-Mate's EPA simulator replicates all three components of the End Point Assessment. The AI grades your responses against the ST0215 marking criteria and identifies weak areas before the real assessment. Practise the professional discussion until it feels like a comfortable conversation."
          icon={Target}
        />
      </>
    ),
  },
  {
    id: 'career-after',
    heading: 'Your Career After the Apprenticeship',
    content: (
      <>
        <p>
          Completing your electrical apprenticeship opens the door to a wide range of career
          opportunities. Here is what the first few years after qualification typically look like.
        </p>
        <p>
          <strong>JIB ECS Gold Card:</strong> After passing the AM2 and EPA, you can apply for the
          JIB ECS Installation Electrician card — the Gold Card. This is the industry-standard proof
          of competence recognised by employers and clients across the UK. You will need this card
          to work on most construction sites and for most electrical contractors.
        </p>
        <p>
          <strong>Gaining experience:</strong> Most newly qualified electricians spend 2 to 3 years
          working for an employer to build their experience across different types of installation:
          domestic, commercial, industrial, and specialist systems. This breadth of experience is
          valuable whether you plan to stay employed or go self-employed.
        </p>
        <p>
          <strong>Further qualifications:</strong> Many electricians pursue additional
          qualifications after the apprenticeship, including the{' '}
          <SEOInternalLink href="/guides/city-guilds-2391">
            C&G 2391 Inspection and Testing
          </SEOInternalLink>
          , C&G 2396 Design and Verification, and specialist courses in EV charging, solar PV, fire
          alarm systems, and data networking. Each additional qualification expands your
          capabilities and earning potential. Elec-Mate has{' '}
          <SEOInternalLink href="/guides/cpd-for-electricians">46+ courses</SEOInternalLink>{' '}
          covering all these specialisms.
        </p>
        <p>
          <strong>Competent person scheme:</strong> To self-certify notifiable electrical work under
          Part P of the Building Regulations, you need to join a competent person scheme such as
          NICEIC, NAPIT, or ELECSA. This is essential for domestic electricians working
          independently. Most schemes require the AM2, an inspection and testing qualification, and
          evidence of competence.
        </p>
        <p>
          <strong>Self-employment:</strong> Many electricians choose to go self-employed after
          gaining a few years of experience. Self-employed electricians typically earn more than
          employed electricians, with experienced sole traders earning 40,000 to 60,000 pounds per
          year and those running small teams earning considerably more. The trade-off is that you
          manage your own business, including quoting, invoicing, marketing, and administration.
        </p>
        <p>
          <strong>Specialisation:</strong> The electrical industry offers numerous specialist career
          paths: EV charger installation, solar PV systems, fire alarm and emergency lighting,
          building management systems (BMS), data and fibre optic cabling, industrial controls and
          automation, and electrical design engineering. See the full{' '}
          <SEOInternalLink href="/guides/electrical-qualifications-pathway">
            qualifications pathway
          </SEOInternalLink>{' '}
          for a complete map from apprentice to master electrician.
        </p>
      </>
    ),
  },
  {
    id: 'elecmate-for-apprentices',
    heading: 'How Elec-Mate Supports Your Apprenticeship',
    content: (
      <>
        <p>
          Elec-Mate was built with apprentices in mind. The Apprentice Hub brings together every
          tool you need to study, track your progress, prepare for assessments, and build your
          portfolio — all in one app on your phone.
        </p>
        <p>
          <strong>Flashcards with spaced repetition:</strong> Over 2,000 flashcards covering Level 2
          and Level 3 content. The spaced repetition algorithm shows you cards you are struggling
          with more frequently and cards you know well less often, making your study time more
          efficient.
        </p>
        <p>
          <strong>Mock exams:</strong> Timed mock exams for the AM2 practical assessment, Level 2
          exams, Level 3 exams, and the Level 4 HNC. Each exam mirrors the format and difficulty of
          the real thing, with detailed explanations for every answer.
        </p>
        <p>
          <strong>EPA simulator:</strong> AI-graded simulators for all three EPA components —
          practical assessment, knowledge test, and professional discussion. The AI identifies your
          weak areas and provides targeted feedback so you know exactly what to improve.
        </p>
        <p>
          <strong>OJT hour tracker:</strong> Automatically logs study time towards your 400-hour
          off-the-job training target. See your progress in real time and demonstrate compliance at
          your gateway review.
        </p>
        <p>
          <strong>Portfolio builder:</strong> Capture evidence on site, map it to apprenticeship
          standard criteria with AI assistance, and share with your employer and tutor for review.
          Export a formatted portfolio for your EPAO when you reach the gateway.
        </p>
        <p>
          <strong>Site diary with mood tracking:</strong> Log your daily activities, mood, and
          wellbeing. The AI coach identifies patterns and provides support when you need it. Mental
          health matters throughout the apprenticeship.
        </p>
        <p>
          <strong>BS 7671 run-through:</strong> Study the wiring regulations with guided content and
          practice questions. The AI study assistant answers regulation questions in plain English —
          no more struggling to interpret dense regulation text.
        </p>
        <SEOAppBridge
          title="The Complete Apprentice Toolkit"
          description="Flashcards, mock exams, EPA simulator, AM2 simulator, OJT tracker, portfolio builder, site diary, and BS 7671 run-through — all in one app. Join 430+ UK apprentices studying with Elec-Mate."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

export default function ElectricalApprenticeshipGuidePage() {
  return (
    <GuideTemplate
      title="Electrical Apprenticeship UK 2026 | Complete Guide"
      description="Complete guide to electrical apprenticeships in the UK for 2026. How to find one, what to expect, pay rates, qualifications earned, EPA preparation, and career pathways after qualification."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Hub Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          Electrical Apprenticeship UK 2026 —{' '}
          <span className="text-yellow-400">Complete Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about becoming an electrician through an apprenticeship in the UK. How to find one, what to expect week by week, pay rates by year, qualifications earned, End Point Assessment preparation, and career pathways after you qualify."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Apprenticeships"
      relatedPages={relatedPages}
      ctaHeading="Built for apprentices"
      ctaSubheading="Join 430+ UK apprentices using Elec-Mate for flashcards, mock exams, EPA preparation, and OJT tracking. 7-day free trial, cancel anytime."
    />
  );
}
