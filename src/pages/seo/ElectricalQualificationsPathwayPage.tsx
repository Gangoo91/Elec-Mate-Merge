import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Award,
  BookOpen,
  GraduationCap,
  Target,
  ClipboardCheck,
  Zap,
  Sun,
  Flame,
  ShieldCheck,
  Briefcase,
  Brain,
  ArrowUpRight,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Electrical Qualifications Pathway', href: '/guides/electrical-qualifications-pathway' },
];

const tocItems = [
  { id: 'overview', label: 'Qualification Map Overview' },
  { id: 'level-1-foundation', label: 'Level 1 Foundation' },
  { id: 'level-2-diploma', label: 'Level 2 Diploma' },
  { id: 'level-3-diploma', label: 'Level 3 Diploma' },
  { id: 'am2-assessment', label: 'AM2 Assessment' },
  { id: 'eighteenth-edition', label: '18th Edition (C&G 2382)' },
  { id: 'inspection-testing', label: 'Inspection and Testing (C&G 2391)' },
  { id: 'design-verification', label: 'Design and Verification (C&G 2396)' },
  { id: 'specialisms', label: 'Specialist Qualifications' },
  { id: 'career-progression', label: 'Career Progression Routes' },
  { id: 'elecmate-every-stage', label: 'Elec-Mate at Every Stage' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The UK electrical qualifications pathway runs from Level 1 Foundation through Level 2 and Level 3 Diplomas, AM2 practical assessment, 18th Edition (C&G 2382), Inspection and Testing (C&G 2391), and specialist qualifications in EV, solar PV, fire alarm, and more.',
  'The AM2 practical assessment and JIB ECS Gold Card mark the point where you are recognised as a fully qualified electrician. From there, the C&G 2391 Inspection and Testing qualification opens the door to EICR work and competent person scheme registration.',
  'Career progression routes include domestic installer, approved contractor, design engineer, contracts manager, and business owner. Each step builds on the qualifications below it.',
  'Specialist qualifications in EV charging, solar PV, fire alarm (BS 5839), emergency lighting (BS 5266), and building management systems are increasingly valuable as the industry diversifies.',
  'Elec-Mate covers every stage of the pathway — from apprentice flashcards and mock exams through AM2 and EPA simulators to 18th Edition, Inspection and Testing, EV, solar PV, and fire alarm courses. One platform from apprentice to master.',
];

const faqs = [
  {
    question: 'What is the minimum qualification to work as an electrician in the UK?',
    answer:
      'There is no single legally mandated minimum qualification to call yourself an electrician in the UK — the electrical trade is not a regulated profession in the same way as medicine or law. However, in practice, the industry standard is the Level 3 NVQ/SVQ in Electrotechnical Services (or the Level 3 Diploma in Electrical Installation), plus the AM2 practical assessment and a current 18th Edition qualification (C&G 2382). These qualifications together are required for the JIB ECS Installation Electrician card (Gold Card), which is the standard industry proof of competence. Without these qualifications, you will find it extremely difficult to gain employment with reputable contractors, access construction sites, or register with a competent person scheme. For self-certification of notifiable electrical work under Part P of the Building Regulations, you must be registered with a competent person scheme, which requires these qualifications plus an inspection and testing qualification such as the C&G 2391.',
  },
  {
    question: 'Do I need the C&G 2391 to be a qualified electrician?',
    answer:
      'The C&G 2391 (Inspection and Testing of Electrical Installations) is not strictly required to be called a qualified electrician or to hold the JIB ECS Gold Card. The Gold Card requires the Level 3 qualification, AM2, and 18th Edition. However, the C&G 2391 is effectively essential for several important reasons. First, it is required by all major competent person schemes (NICEIC, NAPIT, ELECSA) for registration, which you need to self-certify notifiable work. Second, it is required to issue EICRs (Electrical Installation Condition Reports) — the periodic inspection reports that landlords must have every 5 years. Third, it is required for the Approved Electrician grade on the JIB ECS card, which is the next step above the Gold Card. In practice, most electricians obtain the C&G 2391 within a year or two of qualifying, and many apprenticeship programmes now include it as standard.',
  },
  {
    question: 'What is the difference between C&G 2391 and C&G 2396?',
    answer:
      'The C&G 2391 (Inspection and Testing of Electrical Installations) and C&G 2396 (Design and Verification of Electrical Installations) are two separate qualifications that cover different aspects of electrical work. The 2391 focuses on inspection, testing, and reporting — it covers the correct testing sequence, how to use test instruments, how to interpret test results, how to identify defects, and how to complete EICs and EICRs. It is the essential qualification for anyone carrying out inspection and testing work. The 2396 focuses on design — it covers circuit design calculations, cable sizing, protective device selection, discrimination, voltage drop, and the application of BS 7671 to the design of electrical installations. It is most relevant for electricians who design installations rather than just installing them. Some electricians hold both, particularly those in design-and-build roles or those working towards senior positions. The C&G 2394 was the older Initial Verification qualification (now withdrawn and replaced by the 2391-52).',
  },
  {
    question: 'How long does it take to go from complete beginner to fully qualified electrician?',
    answer:
      'From complete beginner to fully qualified electrician (holding the Level 3 diploma, AM2, and 18th Edition) typically takes 3 to 4 years through the apprenticeship route. The apprenticeship covers Level 2 and Level 3 diplomas, the AM2 practical assessment, the 18th Edition qualification, and the End Point Assessment. Some candidates achieve this in 3 years; others take 4, depending on the training provider and the pace of progression. After qualifying, most electricians spend a further 1 to 2 years gaining experience and obtaining additional qualifications (C&G 2391 Inspection and Testing, specialist courses) before registering with a competent person scheme and working fully independently. So from zero to fully independent, self-certifying electrician is typically a 5 to 6 year journey. This is comparable to other skilled professions and reflects the depth of knowledge and practical competence required.',
  },
  {
    question: 'What qualifications do I need to join NICEIC or NAPIT?',
    answer:
      'To register with NICEIC as a Domestic Installer, you need: the Level 3 NVQ/SVQ or equivalent qualification, the AM2 (or equivalent practical assessment), a current 18th Edition qualification (C&G 2382), and the C&G 2391 or equivalent inspection and testing qualification. You must also demonstrate relevant experience, provide evidence of recent work (typically 5 to 10 examples of installations with certificates), and pass a technical assessment conducted by a NICEIC assessor. NAPIT has similar requirements. For Approved Contractor status (which allows you to certify all types of electrical work, not just domestic), additional experience and evidence requirements apply. Both schemes also require public liability insurance, appropriate test instruments with valid calibration, and a commitment to ongoing CPD. The application process typically takes 4 to 8 weeks from initial application to approval. Elec-Mate helps you prepare by covering the 18th Edition and Inspection and Testing courses, plus providing the ongoing CPD tracking that schemes require.',
  },
  {
    question: 'Can I become an electrician without doing an apprenticeship?',
    answer:
      'Yes, it is possible to qualify as an electrician without a traditional apprenticeship, though the apprenticeship route is generally considered the best option because it combines theoretical learning with real on-the-job experience. Alternative routes include: full-time college courses (completing the Level 2 and Level 3 diplomas as a full-time student over 1 to 2 years, then finding employment to gain practical experience), the Experienced Worker Assessment (for people with substantial electrical experience but no formal qualifications — assessed by observation and portfolio review), and adult fast-track programmes offered by private training providers (typically 6 to 12 months of intensive training, though these are expensive and still require subsequent work experience). Whichever route you choose, you must eventually pass the AM2, hold the 18th Edition, and demonstrate practical competence to obtain the JIB ECS Gold Card and register with a competent person scheme. The apprenticeship route remains the most employer-friendly path because it produces electricians with genuine, verifiable on-the-job experience.',
  },
  {
    question: 'What specialist qualifications are most in demand for electricians?',
    answer:
      'The most in-demand specialist qualifications for UK electricians in 2026 are EV charger installation (C&G 2919-01 or equivalent, increasingly required for OZEV-funded installations), solar PV installation (covering DC wiring, inverter selection, and G98/G99 grid notification), fire alarm systems (BS 5839 design, installation, and commissioning), emergency lighting (BS 5266 design, installation, and testing), battery storage systems (a rapidly growing market linked to solar PV), building management systems (BMS — controls and automation for commercial buildings), and data and fibre optic cabling (structured cabling for commercial and industrial applications). Each of these specialisms commands a premium rate and opens new revenue streams. Electricians who hold multiple specialist qualifications can offer a broader service and are more attractive to clients and main contractors looking for one-stop-shop capabilities. Elec-Mate offers courses in EV charging, solar PV, fire alarm, and emergency lighting, along with the foundational qualifications they build upon.',
  },
];

const relatedPages = [
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Apprenticeship Guide',
    description:
      'Complete guide to starting and completing an electrical apprenticeship in the UK.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/am2-exam-tips',
    title: 'AM2 Exam Tips',
    description: 'What to expect, common failures, and how to pass the AM2 first time.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/training/eighteenth-edition-course',
    title: '18th Edition Course',
    description: 'BS 7671:2018+A3:2024 wiring regulations course with practice exams.',
    icon: BookOpen,
    category: 'Course',
  },
  {
    href: '/guides/city-guilds-2391',
    title: 'C&G 2391 Guide',
    description: 'Inspection and Testing qualification — what it covers and how to prepare.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/level-2-electrical',
    title: 'Level 2 Electrical',
    description: 'Level 2 Diploma in Electrical Installation — content and exam preparation.',
    icon: BookOpen,
    category: 'Training',
  },
  {
    href: '/guides/level-3-electrical',
    title: 'Level 3 Electrical',
    description: 'Level 3 Diploma — advanced electrical theory, design, and testing.',
    icon: Award,
    category: 'Training',
  },
];

const sections = [
  {
    id: 'overview',
    heading: 'The Complete Electrical Qualifications Map',
    content: (
      <>
        <p>
          The UK electrical qualifications pathway is a structured progression from entry-level
          foundation courses through to advanced specialist qualifications. Each stage builds on the
          one below it, and together they define the route from complete beginner to master
          electrician.
        </p>
        <p>
          Understanding the full map is important for two reasons. First, it helps you plan your
          career — knowing which qualifications are needed at each stage means you can prioritise
          your training and avoid costly detours. Second, it shows clients, employers, and competent
          person schemes that you have a structured, progressive body of qualifications that
          demonstrates genuine competence at every level.
        </p>
        <p>
          The core pathway runs: Level 1 Foundation, Level 2 Diploma, Level 3 Diploma, AM2
          Assessment, 18th Edition (C&G 2382), Inspection and Testing (C&G 2391), and then
          specialist qualifications. Beyond the core pathway, career progression routes include
          domestic installer, approved contractor, design engineer, contracts manager, and business
          owner.
        </p>
        <p>
          This guide covers every stage in detail, from the first day of Level 1 to competent person
          scheme registration and specialist career paths. Whether you are a school leaver
          considering an{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            electrical apprenticeship
          </SEOInternalLink>
          , a career changer entering the trade, or a qualified electrician planning your next
          qualification, this is the complete map.
        </p>
      </>
    ),
  },
  {
    id: 'level-1-foundation',
    heading: 'Level 1: Foundation',
    content: (
      <>
        <p>
          The Level 1 Diploma in Electrical Installation (C&G 2365-01 or equivalent) is the entry
          point for anyone with no prior electrical experience. It introduces the fundamental
          concepts of electrical work: basic electrical science (voltage, current, resistance, Ohms
          law), health and safety awareness, basic wiring practices, use of hand tools and power
          tools, and an introduction to electrical circuits and components.
        </p>
        <p>
          Level 1 is not always a standalone qualification — some training providers integrate it
          into the first term of the Level 2 programme. Others offer it as a separate course for
          candidates who need a slower introduction before committing to the full apprenticeship.
          School leavers aged 14 to 16 sometimes complete Level 1 as part of a pre-apprenticeship
          programme.
        </p>
        <p>
          <strong>Duration:</strong> Typically 12 to 20 weeks as a standalone course, or the first
          term of a combined Level 1/2 programme.
        </p>
        <p>
          <strong>What it leads to:</strong> The Level 2 Diploma in Electrical Installation. Level 1
          alone does not qualify you to work as an electrician, but it provides the foundation
          knowledge needed to progress.
        </p>
      </>
    ),
  },
  {
    id: 'level-2-diploma',
    heading: 'Level 2: Diploma in Electrical Installation',
    content: (
      <>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/level-2-electrical">
            Level 2 Diploma in Electrical Installation
          </SEOInternalLink>{' '}
          (C&G 2365-02 or equivalent) covers the core knowledge and practical skills of electrical
          installation. It is the first substantial qualification in the pathway and forms the
          foundation for everything that follows.
        </p>
        <p>
          <strong>Key topics:</strong> Electrical science and principles (Ohms law, power formula,
          magnetism, inductance, capacitance), health and safety (Electricity at Work Regulations
          1989, Health and Safety at Work Act 1974, risk assessment, safe isolation), installation
          methods and practices (cable types, wiring systems, containment, accessory installation),
          connection and termination of cables, and the principles of BS 7671 application.
        </p>
        <p>
          <strong>Assessment:</strong> A combination of written exams (multiple-choice and
          short-answer) and practical assessments carried out at college or a training centre. You
          must demonstrate both theoretical understanding and practical competence.
        </p>
        <p>
          <strong>Duration:</strong> Typically 12 to 18 months within an apprenticeship, or 6 to 12
          months as a full-time college course.
        </p>
        <p>
          <strong>What it leads to:</strong> The Level 3 Diploma. Level 2 alone does not qualify you
          as an electrician — it demonstrates that you have the foundational knowledge and can carry
          out basic installation work under supervision.
        </p>
        <SEOAppBridge
          title="Level 2 Study Materials in Elec-Mate"
          description="Flashcards, practice questions, and mock exams covering every Level 2 topic. The AI study assistant explains electrical science concepts in plain English. Spaced repetition ensures long-term retention."
          icon={BookOpen}
        />
      </>
    ),
  },
  {
    id: 'level-3-diploma',
    heading: 'Level 3: Diploma in Electrical Installation',
    content: (
      <>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/level-3-electrical">
            Level 3 Diploma in Electrical Installation
          </SEOInternalLink>{' '}
          (C&G 2365-03 or equivalent) is the advanced qualification that takes your knowledge to the
          standard expected of a qualified electrician. It builds significantly on Level 2 and
          covers the design, inspection, testing, and fault-finding skills needed for independent
          professional work.
        </p>
        <p>
          <strong>Key topics:</strong> Circuit design and calculation (cable sizing, voltage drop,
          fault current, protective device selection, discrimination), BS 7671 application (detailed
          interpretation and application of the 18th Edition wiring regulations including all
          amendments), inspection and testing procedures (the GN3 testing sequence, test instrument
          use, results interpretation), fault diagnosis methodology (systematic fault finding,
          logical deduction, use of test instruments to identify faults), and electrical science at
          a deeper level (three-phase systems, power factor, harmonics, earthing arrangements).
        </p>
        <p>
          <strong>Assessment:</strong> Written exams including scenario-based questions that require
          you to apply BS 7671 to real-world situations, plus practical assessments covering
          installation, testing, and fault diagnosis.
        </p>
        <p>
          <strong>Duration:</strong> Typically 18 to 24 months within an apprenticeship (after
          completing Level 2), or 6 to 12 months as a full-time course.
        </p>
        <p>
          <strong>What it leads to:</strong> The AM2 practical assessment and the End Point
          Assessment (EPA). Level 3 is the academic foundation that the AM2 builds upon practically.
        </p>
      </>
    ),
  },
  {
    id: 'am2-assessment',
    heading: 'AM2 Assessment: Proving Practical Competence',
    content: (
      <>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/am2-exam-tips">
            AM2 (Achievement Measurement 2)
          </SEOInternalLink>{' '}
          is the practical assessment that demonstrates you can safely and competently carry out
          electrical installation work to the standard of a qualified electrician. It is a full-day,
          hands-on assessment covering consumer unit installation, ring final circuit, lighting
          circuit wiring (one-way and two-way), fault finding, and inspection and testing.
        </p>
        <p>
          The AM2 is administered by National Electrotechnical Training (NET) on behalf of the Joint
          Industry Board (JIB) and is carried out at approved assessment centres across the UK. The
          pass rate is approximately 60 to 70 percent on first attempt — the most common causes of
          failure being time management, safe isolation errors, and two-way switching mistakes.
        </p>
        <p>
          Passing the AM2 is the milestone that marks you as a qualified electrician. It is required
          for the JIB ECS Gold Card and is a gateway requirement for the End Point Assessment on the
          apprenticeship standard. After passing, you can apply for the Gold Card and begin working
          as a fully qualified Installation Electrician.
        </p>
        <SEOAppBridge
          title="AM2 Simulator in Elec-Mate"
          description="Timed exercises replicating every AM2 task: consumer unit build, ring final, lighting circuit, and fault finding. AI feedback identifies your weak areas before the real assessment. Candidates who complete 3+ mock assessments report significantly higher pass rates."
          icon={Target}
        />
      </>
    ),
  },
  {
    id: 'eighteenth-edition',
    heading: '18th Edition: BS 7671 (C&G 2382)',
    content: (
      <>
        <p>
          The C&G 2382 (Requirements for Electrical Installations — BS 7671) is the qualification
          that confirms your understanding of the IET Wiring Regulations. It is commonly referred to
          as the "18th Edition" qualification and is one of the most important qualifications in the
          electrical pathway.
        </p>
        <p>
          <strong>What it covers:</strong> The{' '}
          <SEOInternalLink href="/training/eighteenth-edition-course">
            18th Edition course
          </SEOInternalLink>{' '}
          covers the scope, objectives, and fundamental principles of BS 7671:2018 including all
          amendments (A1:2020, A2:2022, A3:2024). Key topics include earthing arrangements (TN-S,
          TN-C-S, TT, IT), circuit protection and discrimination, cable selection and sizing,
          special installations and locations, inspection and testing requirements, and the
          appendices (including the onerous calculations in Appendix 4).
        </p>
        <p>
          <strong>Assessment:</strong> A two-hour, open-book exam with multiple-choice and
          scenario-based questions. You may use your copy of BS 7671 during the exam, so knowing how
          to navigate the regulations quickly is as important as knowing the content.
        </p>
        <p>
          <strong>Why it matters:</strong> The 18th Edition qualification is required by all major
          employers, most competent person schemes, and the JIB ECS card scheme. It is also required
          for insurance purposes by many insurers. When BS 7671 is amended (as it was with A3:2024),
          an updated version of the C&G 2382 is issued, and electricians should refresh their
          qualification to stay current.
        </p>
        <p>
          <strong>Duration:</strong> The course is typically 3 to 5 days of classroom study, though
          online and self-study options are available. The exam is a single sitting.
        </p>
      </>
    ),
  },
  {
    id: 'inspection-testing',
    heading: 'Inspection and Testing: C&G 2391',
    content: (
      <>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/city-guilds-2391">
            C&G 2391 (Inspection and Testing of Electrical Installations)
          </SEOInternalLink>{' '}
          is the qualification that enables you to carry out periodic inspection and testing of
          existing electrical installations and issue EICRs (Electrical Installation Condition
          Reports). It is effectively essential for any electrician who wants to carry out
          inspection work or register with a competent person scheme.
        </p>
        <p>
          <strong>What it covers:</strong> The correct testing sequence from IET Guidance Note 3,
          use of test instruments (continuity, insulation resistance, loop impedance, RCD testing),
          interpretation of test results, identification and classification of defects using
          observation codes (C1, C2, C3, FI), completion of EICs and EICRs, and the legal and
          regulatory framework for inspection and testing.
        </p>
        <p>
          <strong>Assessment:</strong> Written exams plus a practical assessment where you must
          carry out a full inspection and test on a real installation, record the results, and
          produce a completed EICR or EIC. The practical assessment is demanding — you must
          demonstrate that you can test correctly, interpret results accurately, and complete the
          documentation properly.
        </p>
        <p>
          <strong>Why it matters:</strong> The 2391 is required for competent person scheme
          registration (NICEIC, NAPIT, ELECSA), which is needed to self-certify notifiable
          electrical work under Part P. It is also required to carry out periodic inspection work,
          which is a significant revenue stream — landlords in England must have an EICR every 5
          years, and all commercial properties need periodic inspections at the intervals specified
          in GN3.
        </p>
        <p>
          <strong>Duration:</strong> Typically 1 to 2 weeks of study plus the practical assessment.
          Most candidates prepare using a combination of classroom training and self-study.
        </p>
      </>
    ),
  },
  {
    id: 'design-verification',
    heading: 'Design and Verification: C&G 2396',
    content: (
      <>
        <p>
          The C&G 2396 (Design and Verification of Electrical Installations) is the design-focused
          qualification that covers the calculations and decision-making processes behind electrical
          installation design. It is the natural progression after the 2391 for electricians who
          want to take on design responsibility.
        </p>
        <p>
          <strong>What it covers:</strong> Cable sizing calculations (current-carrying capacity,
          voltage drop, thermal constraints), protective device selection and discrimination,
          prospective fault current calculations, earthing system design, circuit design for
          specific applications (domestic, commercial, industrial), and verification of designs
          against BS 7671 requirements.
        </p>
        <p>
          <strong>Who needs it:</strong> Electricians working in design-and-build roles, those
          aspiring to become design engineers, and anyone who wants to sign the "designer" section
          of the EIC with full confidence. The 2396 is not required for competent person scheme
          registration at the basic level, but it demonstrates a higher level of competence and is
          valued by employers and clients.
        </p>
        <p>
          <strong>Duration:</strong> Typically 1 to 2 weeks of study. The qualification involves a
          combination of written exams and design exercises.
        </p>
      </>
    ),
  },
  {
    id: 'specialisms',
    heading: 'Specialist Qualifications',
    content: (
      <>
        <p>
          Beyond the core pathway, a range of specialist qualifications allows you to diversify your
          services and increase your earning potential. Here are the most valuable specialisms for
          UK electricians in 2026.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">EV Charging Installation</h3>
                <p className="text-white text-sm leading-relaxed">
                  The C&G 2919-01 or equivalent covers domestic and commercial EV charger
                  installation, including site assessment, cable sizing for high-current dedicated
                  circuits, earthing arrangements, load management, and OZEV grant requirements.
                  Demand for qualified EV installers is growing rapidly as the UK moves towards the
                  2035 petrol/diesel vehicle ban.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Solar PV Systems</h3>
                <p className="text-white text-sm leading-relaxed">
                  Solar PV installation covers DC wiring, string design, inverter selection and
                  installation, AC connection to the consumer unit, G98/G99 grid notification, MCS
                  certification requirements, and safety considerations specific to PV systems (DC
                  isolation, arc fault detection, and fire service access).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Fire Alarm Systems (BS 5839)</h3>
                <p className="text-white text-sm leading-relaxed">
                  Fire alarm design, installation, commissioning, and maintenance to BS 5839-1
                  (commercial) and BS 5839-6 (domestic). Covers system categories (L1 to L5, P1 to
                  P2), detector selection and siting, cable specifications, panel programming, and
                  cause-and-effect documentation. A natural addition for electricians expanding into
                  fire safety services.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Emergency Lighting (BS 5266)</h3>
                <p className="text-white text-sm leading-relaxed">
                  Emergency lighting design, installation, testing, and certification to BS 5266.
                  Covers system types (maintained, non-maintained, sustained), lux level
                  calculations, battery duration requirements, testing schedules, and emergency
                  lighting certificates. Often combined with fire alarm work.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Data and Structured Cabling</h3>
                <p className="text-white text-sm leading-relaxed">
                  Structured cabling for voice and data networks, fibre optic installation, Cat 6A
                  and Cat 7 termination, network cabinet installation, and testing with cable
                  certifiers. Increasingly valuable as smart buildings and IoT systems expand the
                  scope of electrical work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          <strong>Level 4 HNC in Electrical and Electronic Engineering:</strong> For electricians
          who want to move into engineering or management roles, the Level 4 HNC provides a higher
          academic qualification covering advanced electrical theory, project management, and
          engineering principles. This is the stepping stone to degree-level qualifications and
          professional engineering registration.
        </p>
      </>
    ),
  },
  {
    id: 'career-progression',
    heading: 'Career Progression Routes',
    content: (
      <>
        <p>
          The qualifications pathway maps directly onto a career progression ladder. Here are the
          main routes from newly qualified electrician to senior professional.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Domestic Installer</h3>
                <p className="text-white text-sm leading-relaxed">
                  <strong>Qualifications needed:</strong> Level 3, AM2, 18th Edition, C&G 2391,
                  competent person scheme registration (NICEIC Domestic Installer or NAPIT
                  equivalent). <strong>Typical work:</strong> Domestic rewires, consumer unit
                  replacements, additional circuits, periodic inspections, landlord EICRs.{' '}
                  <strong>Earnings:</strong> 35,000 to 50,000 pounds per year (self-employed).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Approved Contractor</h3>
                <p className="text-white text-sm leading-relaxed">
                  <strong>Qualifications needed:</strong> All of the above, plus C&G 2396
                  (recommended), NICEIC Approved Contractor status (or NAPIT equivalent), and
                  evidence of competence in commercial/industrial work.{' '}
                  <strong>Typical work:</strong> Commercial fit-outs, industrial installations,
                  new-build housing for developers, and periodic inspections of larger
                  installations. <strong>Earnings:</strong> 40,000 to 60,000+ pounds per year.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Design Engineer</h3>
                <p className="text-white text-sm leading-relaxed">
                  <strong>Qualifications needed:</strong> Level 3, 18th Edition, C&G 2396, and
                  ideally a Level 4 HNC or higher. <strong>Typical work:</strong> Designing
                  electrical installations for commercial and industrial buildings, producing
                  drawings, specifications, and cable schedules, and liaising with architects and
                  building services engineers. <strong>Earnings:</strong> 40,000 to 55,000 pounds
                  per year (employed).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Contracts Manager</h3>
                <p className="text-white text-sm leading-relaxed">
                  <strong>Qualifications needed:</strong> Broad technical qualifications plus
                  project management skills, commercial awareness, and leadership experience.{' '}
                  <strong>Typical work:</strong> Managing multiple electrical projects, supervising
                  teams of electricians, client liaison, procurement, and programme management.{' '}
                  <strong>Earnings:</strong> 50,000 to 70,000+ pounds per year.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Each progression route builds on the qualifications below it. The electrician who invests
          in a structured programme of qualifications — not just collecting certificates randomly —
          progresses faster and earns more at every stage.
        </p>
      </>
    ),
  },
  {
    id: 'elecmate-every-stage',
    heading: 'Elec-Mate at Every Stage of Your Career',
    content: (
      <>
        <p>
          Elec-Mate is designed to support electricians at every point on the qualifications pathway
          — from first-year apprentice to experienced professional.
        </p>
        <p>
          <strong>Apprentice stage:</strong> The Apprentice Hub provides flashcards with spaced
          repetition, 2,000+ practice questions, mock exams for Level 2 and Level 3, the AM2
          Simulator with timed exercises and AI feedback, the EPA Simulator with AI grading for all
          three components, OJT hour tracking towards the 400-hour target, and the portfolio builder
          with AI-powered criteria mapping.
        </p>
        <p>
          <strong>Newly qualified stage:</strong> The 18th Edition course covers BS 7671:2018
          including all amendments. The{' '}
          <SEOInternalLink href="/training/inspection-testing-course">
            Inspection and Testing course
          </SEOInternalLink>{' '}
          prepares you for the C&G 2391 exam. The BS 7671 run-through provides guided regulation
          study with practice questions.
        </p>
        <p>
          <strong>Experienced professional stage:</strong> 46+ courses covering EV charging, solar
          PV, fire alarm systems, emergency lighting, IPAF, PASMA, health and safety, and personal
          development. Automatic{' '}
          <SEOInternalLink href="/guides/cpd-for-electricians">CPD tracking</SEOInternalLink> with
          scheme-ready reports. AI study assistant for complex regulation questions.
        </p>
        <p>
          One platform, one subscription, every stage of your career. From the first flashcard on
          day one of your apprenticeship to the specialist courses that keep you ahead of the
          competition 20 years later.
        </p>
        <SEOAppBridge
          title="One Platform from Apprentice to Master"
          description="Flashcards, mock exams, AM2 simulator, EPA simulator, OJT tracker, 18th Edition course, Inspection and Testing course, EV charging, solar PV, fire alarm, and 30+ more courses. Every stage covered. Every CPD hour tracked."
          icon={Award}
        />
      </>
    ),
  },
];

export default function ElectricalQualificationsPathwayPage() {
  return (
    <GuideTemplate
      title="Electrical Qualifications Pathway UK | From Apprentice to Master"
      description="Complete map of UK electrical qualifications from Level 1 to specialist certifications. Level 2, Level 3, AM2, 18th Edition, C&G 2391, C&G 2396, EV, solar PV, fire alarm, and career progression routes."
      datePublished="2025-07-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Hub Guide"
      badgeIcon={Award}
      heroTitle={
        <>
          Electrical Qualifications Pathway —{' '}
          <span className="text-yellow-400">From Apprentice to Master</span>
        </>
      }
      heroSubtitle="The complete qualification map for UK electricians. Every qualification from Level 1 Foundation to specialist certifications, explained in plain English with career progression routes, earning potential at each stage, and how Elec-Mate supports every step of the journey."
      readingTime={20}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Qualifications"
      relatedPages={relatedPages}
      ctaHeading="Every qualification, one platform"
      ctaSubheading="Join 430+ UK electricians and apprentices using Elec-Mate for training, exam preparation, and CPD tracking. 7-day free trial, cancel anytime."
    />
  );
}
