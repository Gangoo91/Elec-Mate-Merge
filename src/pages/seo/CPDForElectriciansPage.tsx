import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  BookOpen,
  GraduationCap,
  Award,
  Clock,
  Brain,
  ClipboardCheck,
  Zap,
  Sun,
  Flame,
  ShieldCheck,
  Briefcase,
  BarChart3,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'CPD for Electricians', href: '/guides/cpd-for-electricians' },
];

const tocItems = [
  { id: 'what-is-cpd', label: 'What Is CPD?' },
  { id: 'why-cpd-matters', label: 'Why CPD Matters' },
  { id: 'cpd-hours-required', label: 'How Many Hours Do You Need?' },
  { id: 'types-of-cpd', label: 'Types of CPD' },
  { id: 'popular-cpd-courses', label: 'Popular CPD Courses' },
  { id: 'recording-cpd', label: 'Recording and Evidencing CPD' },
  { id: 'making-cpd-count', label: 'How to Make CPD Count' },
  { id: 'elecmate-cpd', label: 'CPD with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'CPD (Continuing Professional Development) is a requirement for all electricians registered with competent person schemes. NICEIC requires a minimum of 35 hours per year. NAPIT and other schemes have similar requirements.',
  'CPD covers much more than formal courses — it includes self-study, on-the-job learning, manufacturer training, trade events, mentoring, and online platforms like Elec-Mate. All count towards your annual hours.',
  'The most valuable CPD topics for 2026 include BS 7671:2018+A3:2024 updates, EV charging installation, solar PV systems, fire alarm design, battery storage, and energy efficiency regulations.',
  'Recording CPD is essential. You need evidence of what you studied, when, how long, and what you learned. Elec-Mate tracks study hours automatically and generates CPD records you can show at your scheme assessment.',
  'Elec-Mate has 46+ courses across apprentice, professional upskilling, general upskilling, and personal development categories. Study on your phone between jobs — every minute counts towards your CPD hours.',
];

const faqs = [
  {
    question: 'How many CPD hours do electricians need per year?',
    answer:
      'The exact requirement depends on your competent person scheme. NICEIC requires a minimum of 35 hours of CPD per year for registered contractors and qualifying supervisors. NAPIT has a similar requirement. Other schemes may specify different hour targets or use a points-based system. Regardless of the exact number, the principle is the same: you must demonstrate that you are keeping your knowledge and skills current. In practice, 35 hours per year works out to less than one hour per week, which is very achievable through a combination of online study, self-directed reading, manufacturer training, and attending trade events. Many electricians exceed the minimum requirement without even realising it — the challenge is usually recording the hours, not completing them.',
  },
  {
    question: 'What counts as CPD for electricians?',
    answer:
      'CPD for electricians includes any structured learning activity that develops your professional knowledge and skills. Formal CPD includes accredited courses (such as the 18th Edition update, C&G 2391 Inspection and Testing, EV charging qualifications, solar PV training), manufacturer training on specific products, and attendance at trade conferences and exhibitions. Informal CPD includes self-directed study using platforms like Elec-Mate, reading technical publications (IET Wiring Matters, IET On-Site Guide updates, BS 7671 amendments), mentoring less experienced colleagues, participating in professional forums and discussions, and structured on-the-job learning where you develop new skills. The key criterion is that the activity must be relevant to your professional role and you must be able to describe what you learned from it.',
  },
  {
    question: 'Do I need CPD if I am not registered with a competent person scheme?',
    answer:
      'If you are not registered with a competent person scheme (such as NICEIC, NAPIT, or ELECSA), there is no legal requirement for CPD. However, CPD is strongly recommended for all electricians regardless of scheme membership. The electrical industry is constantly evolving — BS 7671 is amended regularly (Amendment 3 was issued in 2024, Amendment 4 is expected in 2026), new technologies such as EV charging and battery storage are creating demand for new skills, and health and safety regulations are updated frequently. An electrician who does not keep their knowledge current risks making errors, using outdated practices, and losing work to competitors who can demonstrate up-to-date competence. Even without a formal requirement, CPD makes you a better, safer, and more employable electrician.',
  },
  {
    question: 'What happens if I do not complete my CPD hours?',
    answer:
      'If you are registered with a competent person scheme and fail to complete the required CPD hours, the consequences depend on the scheme. NICEIC may place you under enhanced monitoring, require you to complete additional training, or in persistent cases, remove you from the register. NAPIT and other schemes have similar escalation processes. During your periodic scheme assessment (which typically occurs every 1 to 3 years, depending on your scheme and grade), the assessor will review your CPD records. If you cannot demonstrate sufficient CPD activity, this will be flagged and you will be given a timeframe to rectify it. In the worst case, failure to maintain CPD can result in loss of registration, which means you can no longer self-certify notifiable electrical work under Part P of the Building Regulations.',
  },
  {
    question: 'Can online study count towards CPD hours?',
    answer:
      'Yes. Online study is a fully accepted form of CPD, and it is increasingly the most practical way for working electricians to accumulate CPD hours. Platforms like Elec-Mate, IET-accredited online courses, manufacturer e-learning modules, and webinars all count towards your CPD hours, provided you can evidence the learning. The evidence should include: the date and duration of the study session, the topic covered, the provider or platform name, and a brief description of what you learned or how it will influence your practice. Elec-Mate automatically logs all study sessions with timestamps, durations, topics, and course names, making it easy to demonstrate your CPD activity at your scheme assessment. This is often more reliable than trying to recall in-person training sessions or self-study from memory.',
  },
  {
    question: 'How do I record CPD for my scheme assessment?',
    answer:
      'CPD records should include: the date of each CPD activity, the type of activity (formal course, self-study, conference, manufacturer training, etc.), the duration in hours, the topic covered, the provider or source, and a brief note on what you learned or how it will influence your work. Most schemes accept CPD records in any format — a spreadsheet, a logbook, certificates of completion, or digital records from a learning platform. The most effective approach is to record CPD as you go rather than trying to reconstruct it at the end of the year. Elec-Mate generates a complete CPD report showing all study activity with dates, durations, and topics, which you can download or print for your scheme assessment. This removes the administrative burden of maintaining a separate CPD log.',
  },
];

const relatedPages = [
  {
    href: '/training/eighteenth-edition-course',
    title: '18th Edition Course',
    description: 'BS 7671:2018+A3:2024 wiring regulations course with practice exams.',
    icon: BookOpen,
    category: 'Course',
  },
  {
    href: '/training/inspection-testing-course',
    title: 'Inspection and Testing',
    description: 'C&G 2391 preparation with testing sequence guides and practice questions.',
    icon: ClipboardCheck,
    category: 'Course',
  },
  {
    href: '/guides/ev-charger-certificate',
    title: 'EV Charging Course',
    description: 'EV charger installation training covering OZEV grant requirements.',
    icon: Zap,
    category: 'Course',
  },
  {
    href: '/guides/fire-alarm-certificate',
    title: 'Fire Alarm Course',
    description: 'BS 5839 fire alarm design, installation, and commissioning.',
    icon: Flame,
    category: 'Course',
  },
  {
    href: '/guides/solar-pv-certificate',
    title: 'Solar PV Course',
    description: 'Solar PV installation and commissioning for domestic and commercial systems.',
    icon: Sun,
    category: 'Course',
  },
  {
    href: '/guides/electrical-qualifications-pathway',
    title: 'Qualifications Pathway',
    description: 'Complete map of electrical qualifications from apprentice to master.',
    icon: Award,
    category: 'Guide',
  },
];

const sections = [
  {
    id: 'what-is-cpd',
    heading: 'What Is CPD for Electricians?',
    content: (
      <>
        <p>
          Continuing Professional Development (CPD) is the ongoing process of keeping your
          professional knowledge and skills up to date throughout your career. For electricians, CPD
          covers everything from staying current with BS 7671 amendments and new installation
          methods to developing specialist skills in emerging technologies such as EV charging,
          solar PV, and battery storage systems.
        </p>
        <p>
          CPD is not a one-off event — it is a continuous commitment to learning that begins when
          you qualify and continues throughout your working life. The electrical industry evolves
          rapidly: regulations are amended, new technologies emerge, working practices change, and
          health and safety requirements are updated. An electrician who qualified five years ago
          and has not engaged in any CPD since is working with outdated knowledge — which is both a
          safety risk and a competitive disadvantage.
        </p>
        <p>
          For electricians registered with competent person schemes such as NICEIC, NAPIT, or
          ELECSA, CPD is a formal requirement with a minimum annual hours target. For all other
          electricians, CPD is strongly recommended as a professional best practice. Whether or not
          it is mandatory for you, the benefits are clear: better technical knowledge, safer working
          practices, ability to offer more services, higher earning potential, and greater
          confidence on every job.
        </p>
      </>
    ),
  },
  {
    id: 'why-cpd-matters',
    heading: 'Why CPD Matters for Your Career',
    content: (
      <>
        <p>
          CPD is not just a box-ticking exercise for your scheme assessment. When done well, it
          directly improves your ability to do your job safely and profitably. Here is why it
          matters.
        </p>
        <p>
          <strong>Regulatory changes:</strong>{' '}
          <SEOInternalLink href="/training/eighteenth-edition-course">BS 7671</SEOInternalLink> is
          amended regularly. Amendment 3 was issued in July 2024, adding requirements for
          bidirectional and unidirectional devices (Regulation 530.3.201). Amendment 4 is expected
          in 2026. Each amendment changes how installations must be designed, installed, and tested.
          If you are not aware of the changes, you risk non-compliant work — which can fail scheme
          inspections, invalidate certificates, and create liability issues.
        </p>
        <p>
          <strong>New technologies:</strong> The growth of EV charging, solar PV, battery storage,
          and smart home systems is creating demand for electricians with specialist skills. Clients
          are increasingly asking for these services, and the electricians who can offer them
          command higher rates and win more work. CPD in these areas is a direct investment in your
          earning potential.
        </p>
        <p>
          <strong>Scheme requirements:</strong> NICEIC, NAPIT, and other competent person schemes
          require registered contractors and qualifying supervisors to complete a minimum number of
          CPD hours each year. Failure to meet this requirement can result in enhanced monitoring,
          remedial action, or loss of registration.
        </p>
        <p>
          <strong>Professional reputation:</strong> Clients, main contractors, and employers
          increasingly expect electricians to demonstrate ongoing learning. CPD records show that
          you take your profession seriously, stay current with industry developments, and are
          committed to delivering high-quality work. This is particularly important for electricians
          who tender for larger contracts or work with public-sector clients.
        </p>
        <p>
          <strong>Safety:</strong> At its core, CPD is about keeping people safe. Electrical work is
          inherently dangerous, and the regulations that govern it exist to prevent injuries and
          fatalities. Staying current with safety practices, test procedures, isolation methods, and
          risk assessment techniques is a professional responsibility that protects both you and the
          people who will use the installations you create.
        </p>
      </>
    ),
  },
  {
    id: 'cpd-hours-required',
    heading: 'How Many CPD Hours Do You Need?',
    content: (
      <>
        <p>
          The specific CPD requirement depends on your competent person scheme. Here are the key
          benchmarks.
        </p>
        <p>
          <strong>NICEIC:</strong> A minimum of 35 hours of CPD per year for qualifying supervisors.
          This is assessed during your periodic scheme inspection (typically every 1 to 3 years,
          depending on your grade). The 35 hours can be made up from any combination of formal and
          informal CPD activities.
        </p>
        <p>
          <strong>NAPIT:</strong> Similar annual CPD requirements, typically 35 hours. NAPIT also
          offers its own CPD courses and webinars that count towards the target.
        </p>
        <p>
          <strong>ELECSA:</strong> Operates under similar principles, with CPD reviewed at periodic
          assessment visits.
        </p>
        <p>
          <strong>In practice:</strong> 35 hours per year works out to approximately 40 minutes per
          week. This is very achievable — a single 15-minute study session on your phone during a
          tea break, three times a week, puts you close to the target. Add in any manufacturer
          training days, trade events, or formal courses and you will exceed it comfortably. The
          challenge for most electricians is not completing the hours — it is recording them. This
          is where an automatic tracking system like Elec-Mate is invaluable.
        </p>
        <SEOAppBridge
          title="CPD Hours Tracked Automatically"
          description="Every minute of study on Elec-Mate is automatically logged with timestamps, topics, and durations. Download your complete CPD report for your scheme assessment — no manual tracking needed."
          icon={Clock}
        />
      </>
    ),
  },
  {
    id: 'types-of-cpd',
    heading: 'Types of CPD for Electricians',
    content: (
      <>
        <p>
          CPD is broader than most electricians realise. It is not limited to sitting in a classroom
          for a day. Here are the main types of CPD activity, all of which count towards your annual
          hours.
        </p>
        <p>
          <strong>Formal courses and qualifications:</strong> Accredited courses such as the 18th
          Edition update (C&G 2382), Inspection and Testing (C&G 2391), Design and Verification (C&G
          2396), EV charging qualifications, solar PV installation courses, and fire alarm design
          courses. These carry the most weight because they result in a recognised qualification or
          certificate of attendance.
        </p>
        <p>
          <strong>Online learning platforms:</strong> Structured online courses and study
          programmes. Elec-Mate offers 46+ courses across four categories: apprentice training,
          professional upskilling, general upskilling, and personal development. Online learning is
          ideal for fitting CPD around your working schedule — study on your phone between jobs,
          during lunch breaks, or in the evening.
        </p>
        <p>
          <strong>Self-directed study:</strong> Reading technical publications such as IET Wiring
          Matters, studying BS 7671 amendments, reviewing Guidance Notes, and researching new
          products and installation methods. This is CPD that you can do anywhere, anytime. Keep a
          record of what you read and what you learned.
        </p>
        <p>
          <strong>Manufacturer training:</strong> Product-specific training from manufacturers such
          as Hager, Schneider Electric, Legrand, ABB, and others. Many manufacturers offer free
          training sessions — both in-person and online — that cover new product ranges,
          installation techniques, and compliance requirements. These are valuable CPD and often
          include a certificate of attendance.
        </p>
        <p>
          <strong>Trade events and conferences:</strong> Attending trade shows (such as EI Live,
          Elex, or the IET electrical conferences), industry seminars, and local trade association
          meetings. These events provide exposure to new products, industry trends, and networking
          opportunities.
        </p>
        <p>
          <strong>Mentoring and coaching:</strong> Mentoring apprentices or less experienced
          colleagues counts as CPD because teaching reinforces and deepens your own understanding.
          Being mentored by a more experienced electrician or specialist also counts.
        </p>
        <p>
          <strong>On-the-job learning:</strong> Working on a new type of installation for the first
          time (for example, your first EV charger installation or your first commercial three-phase
          board) counts as CPD, provided you can describe the learning that took place and how it
          developed your competence.
        </p>
      </>
    ),
  },
  {
    id: 'popular-cpd-courses',
    heading: 'Most Popular CPD Courses for Electricians in 2026',
    content: (
      <>
        <p>
          The most in-demand CPD courses for UK electricians in 2026 reflect the industry trends:
          regulation updates, green energy, and specialist systems. Here are the courses that will
          have the biggest impact on your career.
        </p>
        <p>
          <strong>BS 7671:2018+A3:2024 Update:</strong> If you qualified before Amendment 3 was
          issued in July 2024, you need to understand the changes — including the new requirements
          for bidirectional and unidirectional devices. The{' '}
          <SEOInternalLink href="/training/eighteenth-edition-course">
            18th Edition course on Elec-Mate
          </SEOInternalLink>{' '}
          covers the full regulations including all amendments.
        </p>
        <p>
          <strong>EV Charging Installation:</strong> The UK government's push towards electric
          vehicles is creating massive demand for qualified EV charger installers. The C&G 2919-01
          or equivalent qualification is increasingly expected by OZEV (Office for Zero Emission
          Vehicles) and by consumers choosing installers.
        </p>
        <p>
          <strong>Solar PV Installation:</strong> Domestic and commercial solar PV installations are
          growing rapidly. Understanding PV system design, DC wiring, inverter selection, AC
          connection, and G98/G99 notification requirements is essential for electricians entering
          this market.
        </p>
        <p>
          <strong>Fire Alarm Systems (BS 5839):</strong> Fire alarm design, installation, and
          commissioning to BS 5839. Many electrical contractors are expanding into fire alarm work
          as clients increasingly want one contractor for all fire and electrical services.
        </p>
        <p>
          <strong>Inspection and Testing Update:</strong> If you hold the{' '}
          <SEOInternalLink href="/guides/city-guilds-2391">C&G 2391</SEOInternalLink> and want to
          stay current with testing practices, a refresher course covers the latest requirements,
          common EICR issues, and changes introduced by Amendment 3.
        </p>
        <p>
          <strong>Emergency Lighting (BS 5266):</strong> Emergency lighting design, installation,
          testing, and certification. A natural complement to fire alarm work and increasingly
          requested by commercial clients.
        </p>
        <p>
          <strong>Health and safety courses:</strong> IPAF (powered access), PASMA (mobile towers),
          First Aid at Work, COSHH, CDM awareness, Working at Height, Manual Handling, Confined
          Spaces, and Asbestos Awareness. These are often required for site access and are valuable
          CPD in their own right.
        </p>
        <SEOAppBridge
          title="46+ Courses on One Platform"
          description="From BS 7671 updates to EV charging, solar PV, fire alarm, and health and safety courses — Elec-Mate has 46+ courses across 4 categories. Study on your phone between jobs. Every minute tracked as CPD."
          icon={BookOpen}
        />
      </>
    ),
  },
  {
    id: 'recording-cpd',
    heading: 'Recording and Evidencing Your CPD',
    content: (
      <>
        <p>
          Recording CPD is just as important as completing it. If you cannot evidence your CPD hours
          at your scheme assessment, it is as though you did not do them. Here is what you need to
          record and how.
        </p>
        <p>
          <strong>What to record for each CPD activity:</strong> The date, the type of activity
          (formal course, self-study, online learning, manufacturer training, etc.), the duration in
          hours, the specific topic covered, the provider or source, and a brief note on what you
          learned or how it will influence your practice.
        </p>
        <p>
          <strong>Evidence types:</strong> Certificates of completion from formal courses.
          Screenshots or exports from online learning platforms showing completed modules and
          durations. Notes from self-study sessions with dates and topics. Attendance records from
          trade events. Records of mentoring sessions. Photographs of manufacturer training
          materials with dates.
        </p>
        <p>
          <strong>Common mistakes:</strong> The biggest mistake is not recording CPD as you go.
          Trying to reconstruct a year's worth of CPD activity from memory for your scheme
          assessment is stressful, inaccurate, and often results in missing hours. The second
          biggest mistake is not keeping evidence — completing a course but not saving the
          certificate, or attending a training day but not noting what was covered.
        </p>
        <p>
          <strong>Automatic tracking:</strong> The easiest way to solve the recording problem is to
          use a platform that tracks CPD automatically. Elec-Mate logs every study session with the
          date, duration, topic, and course name. At the end of the year — or whenever your scheme
          assessment is due — you download a complete CPD report showing all your activity. No
          manual tracking, no spreadsheets, no guesswork.
        </p>
      </>
    ),
  },
  {
    id: 'making-cpd-count',
    heading: 'How to Make Your CPD Count',
    content: (
      <>
        <p>
          Not all CPD is equally valuable. Here is how to make your CPD hours genuinely useful
          rather than just ticking a box.
        </p>
        <p>
          <strong>Align CPD with your career goals:</strong> If you want to move into EV charging
          installation, prioritise EV-related courses. If you are preparing for an inspection and
          testing qualification, focus on testing procedures and BS 7671 application. If you are
          building a commercial electrical business, invest in health and safety courses that give
          you site access. Scattered, unfocused CPD is less valuable than a coherent programme
          aligned with where you want your career to go.
        </p>
        <p>
          <strong>Mix formal and informal CPD:</strong> A combination of accredited courses (which
          carry the most weight) and regular self-study (which is the most practical) gives you both
          depth and consistency. Aim for at least one formal course per year, supplemented by
          regular online study.
        </p>
        <p>
          <strong>Apply what you learn:</strong> CPD is most effective when you can apply it on the
          next job. If you study solar PV installation methods, seek out an opportunity to assist on
          a PV project. If you refresh your insulation resistance testing knowledge, pay extra
          attention to your IR readings on the next EICR. The connection between learning and doing
          is what makes CPD genuinely developmental.
        </p>
        <p>
          <strong>Study consistently, not in bursts:</strong> A 15-minute study session three times
          a week is more effective than a single 8-hour session once a quarter. Spaced repetition —
          the technique used by Elec-Mate's flashcard system — shows that regular, short review
          sessions produce better long-term retention than intensive cramming.
        </p>
        <p>
          <strong>Stay ahead of regulatory changes:</strong> When a new BS 7671 amendment is
          published, study it immediately rather than waiting for your next scheme assessment. The
          electricians who adopt new requirements early avoid the rush, avoid non-compliant work
          during the transition period, and demonstrate proactive professionalism.
        </p>
      </>
    ),
  },
  {
    id: 'elecmate-cpd',
    heading: 'CPD with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate has 46+ courses across four categories, designed specifically for UK
          electricians. Every course counts towards your CPD hours, and every minute of study is
          tracked automatically.
        </p>
        <p>
          <strong>Apprentice training:</strong> Level 2 and Level 3 courses, AM2 preparation, EPA
          simulator, flashcards, and 2,000+ practice questions. Ideal for electricians supporting
          apprentices or refreshing their own foundational knowledge.
        </p>
        <p>
          <strong>Professional upskilling:</strong> BS 7671 18th Edition (including A3:2024),
          Inspection and Testing, EV Charging installation, Solar PV systems, Fire Alarm design (BS
          5839), Emergency Lighting (BS 5266), and BMS fundamentals. These are the specialist
          courses that expand your service offering and increase your earning potential.
        </p>
        <p>
          <strong>General upskilling:</strong> IPAF, PASMA, First Aid at Work, COSHH, CDM Awareness,
          Working at Height, Manual Handling, Confined Spaces, and Asbestos Awareness. Essential
          health and safety courses that are often required for site access and always valuable for
          on-site safety.
        </p>
        <p>
          <strong>Personal development:</strong> Leadership, Mental Health Awareness, CSCS Card
          preparation, and business management skills. These courses develop the professional
          behaviours and soft skills that complement your technical expertise.
        </p>
        <p>
          <strong>AI study assistant:</strong> Every course is supported by the AI study assistant,
          which can answer questions about the material, explain complex concepts in plain English,
          test your understanding, and provide additional context from BS 7671 and related
          standards.
        </p>
        <p>
          <strong>Automatic CPD records:</strong> Elec-Mate tracks every study session with date,
          duration, topic, and course name. Download a complete CPD report for your scheme
          assessment at any time — no manual tracking, no spreadsheets, no forgotten hours.
        </p>
        <SEOAppBridge
          title="46+ CPD Courses on Your Phone"
          description="Study between jobs with courses covering BS 7671, EV charging, solar PV, fire alarm, health and safety, and more. Every minute tracked as CPD. Generate scheme-ready reports in one tap."
          icon={Brain}
        />
      </>
    ),
  },
];

export default function CPDForElectriciansPage() {
  return (
    <GuideTemplate
      title="CPD for Electricians UK 2026 | Continuing Professional Development"
      description="Complete guide to CPD for UK electricians in 2026. How many hours you need, what counts as CPD, popular courses, recording CPD for your scheme assessment, and 46+ courses on Elec-Mate."
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="CPD Guide"
      badgeIcon={Award}
      heroTitle={
        <>
          CPD for Electricians UK 2026 —{' '}
          <span className="text-yellow-400">Continuing Professional Development</span>
        </>
      }
      heroSubtitle="Everything you need to know about CPD as a UK electrician. How many hours you need, what types of learning count, the most valuable courses for 2026, how to record CPD for your scheme assessment, and how Elec-Mate tracks it all automatically."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About CPD for Electricians"
      relatedPages={relatedPages}
      ctaHeading="CPD tracked automatically"
      ctaSubheading="Join 430+ UK electricians studying with Elec-Mate. 46+ courses, automatic CPD tracking, and scheme-ready reports. 7-day free trial, cancel anytime."
    />
  );
}
