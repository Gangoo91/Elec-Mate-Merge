import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  Zap,
  BookOpen,
  PoundSterling,
  Briefcase,
  TrendingUp,
  Wrench,
  ShieldCheck,
  FileCheck2,
  Users,
  Award,
  Clock,
  Brain,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career', href: '/guides/how-to-become-electrician' },
  { label: 'School Leavers', href: '/guides/electrical-careers-school-leavers' },
];

const tocItems = [
  { id: 'why-electrical', label: 'Why Choose an Electrical Career?' },
  { id: 'gcse-requirements', label: 'GCSE Requirements' },
  { id: 'apprenticeship-route', label: 'The Apprenticeship Route' },
  { id: 'what-the-job-involves', label: 'What the Job Involves' },
  { id: 'earning-potential', label: 'Earning Potential' },
  { id: 'career-progression', label: 'Career Progression' },
  { id: 'how-to-apply', label: 'How to Apply' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'You do not need a degree to become an electrician. The standard route is a Level 3 apprenticeship lasting 3-4 years, combining on-the-job training with college study.',
  'Most employers ask for GCSEs (or equivalent) at grade 4 or above in Maths, English, and a Science. Some accept functional skills qualifications instead.',
  'Apprentice electricians in England earn at least the apprentice minimum wage (currently £7.55/hour from April 2025), but many employers pay more — typically £14,000 to £20,000 in the first year, rising each year.',
  'A qualified electrician in the UK earns £30,000 to £45,000 employed, or £40,000 to £70,000+ self-employed. Specialist areas like EV charging, solar PV, and data centres command higher rates.',
  'Elec-Mate includes a full Study Centre with structured courses for Level 2 and Level 3 apprentices — covering electrical theory, BS 7671 regulations, and practical skills. Study on your phone between jobs.',
];

const faqs = [
  {
    question: 'What GCSEs do I need to become an electrician?',
    answer:
      "Most employers and training providers require GCSEs (or equivalent) at grade 4 (old grade C) or above in Maths, English Language, and a Science subject (ideally Physics or Combined Science). Some employers are flexible and accept Functional Skills Level 2 in Maths and English instead of GCSEs. Maths is the most important — you will use it every day for calculations involving Ohm's Law, cable sizing, voltage drop, and maximum demand. If your Maths GCSE is below grade 4, consider retaking it or completing Functional Skills Level 2 before applying for apprenticeships. Some training providers offer a pre-apprenticeship programme that includes Functional Skills alongside an introduction to electrical work.",
  },
  {
    question: 'How long does it take to become a qualified electrician?',
    answer:
      'The standard route is a Level 3 Electrotechnical Apprenticeship, which takes 3 to 4 years. During this time, you work on site with a qualified electrician (your employer) and attend college on a day-release or block-release basis. At the end, you complete an End Point Assessment (EPA) that tests your practical skills, knowledge, and professional behaviours. After qualifying, you can apply for an ECS card (the industry identity card) and register with a competent person scheme such as NICEIC or NAPIT. Some people complete additional qualifications alongside the apprenticeship — such as the 18th Edition (C&G 2382) and Inspection and Testing (C&G 2391) — to be fully qualified for all types of work from day one. From the point of leaving school to being a fully qualified, independently working electrician, expect 4 to 5 years.',
  },
  {
    question: 'How much do apprentice electricians earn?',
    answer:
      'Apprentice electricians are entitled to at least the apprentice minimum wage, which is currently £7.55 per hour (from April 2025). However, many employers pay significantly more, especially after the first year. The JIB (Joint Industry Board) recommends higher training allowances for electrical apprentices. Typical apprentice pay ranges are: Year 1: £14,000-£18,000, Year 2: £16,000-£20,000, Year 3: £18,000-£24,000, Year 4: £22,000-£28,000. London and the South East tend to pay higher rates. Some employers also provide a van, tools, or a tool allowance. Remember that as an apprentice, you are earning while others your age are paying for university — and you will have no student debt when you qualify.',
  },
  {
    question: 'What does an electrician actually do day-to-day?',
    answer:
      'The work varies hugely depending on the sector. A domestic electrician might spend a Monday rewiring a Victorian terrace house, a Tuesday fitting a new consumer unit, and a Wednesday doing an EICR for a landlord. A commercial electrician might be fitting out an office building, installing containment systems, pulling cables, and wiring distribution boards. An industrial electrician works on motor control panels, PLCs, three-phase systems, and heavy plant. Common tasks across all sectors include: reading drawings and specifications, installing cables and containment (trunking, conduit, cable tray), terminating cables at accessories (sockets, switches, distribution boards), testing and inspecting completed installations, and fault finding on existing installations. The work is physical — expect to be on your feet, climbing ladders, working in lofts and under floors, and using hand and power tools all day.',
  },
  {
    question: 'Can I become an electrician without an apprenticeship?',
    answer:
      'Yes, but the apprenticeship route is the most recognised and the most common. Alternative routes include: completing a full-time college course (Level 2 Electrical Installation followed by Level 3 Electrotechnical), then gaining supervised work experience to build your practical competence, and completing the AM2 practical assessment. This route typically takes 2-3 years of college plus 1-2 years of supervised work. Some people also enter the trade later in life through adult retraining programmes — typically an intensive course covering Level 2 and Level 3 qualifications over 1-2 years, followed by the AM2 assessment. Whatever the route, you need the same qualifications to be a competent electrician: Level 3 NVQ (or equivalent), 18th Edition (C&G 2382), and ideally Inspection and Testing (C&G 2391). The AM2 practical assessment is required for registration with a competent person scheme.',
  },
  {
    question: 'Is being an electrician a good career in 2026?',
    answer:
      'Demand for qualified electricians in the UK has never been higher. The push towards net zero — including EV charger installations, solar PV systems, battery storage, and heat pump installations — is creating enormous demand for electricians with the right skills. The construction industry continues to grow, and the existing workforce is ageing (the average age of a UK electrician is over 45), meaning there are more experienced electricians retiring than new apprentices qualifying. This supply-demand imbalance pushes wages up. A qualified electrician with 5 years of experience can realistically earn £35,000-£45,000 employed or £50,000-£70,000 self-employed. Specialists in EV charging, solar, data centres, or fire alarm systems can earn more. The work is varied, physical, and mentally stimulating — no two days are the same. And unlike many office-based careers, you can see the direct results of your work every day.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/how-to-become-electrician',
    title: 'How to Become an Electrician',
    description:
      'Complete guide to all routes into the electrical trade — apprenticeship, college, and adult retraining.',
    icon: GraduationCap,
    category: 'Career',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description: 'Everything you need to know about the Level 3 Electrotechnical Apprenticeship.',
    icon: BookOpen,
    category: 'Career',
  },
  {
    href: '/guides/apprentice-salary-uk',
    title: 'Apprentice Salary UK',
    description:
      'What apprentice electricians earn in each year, by region, with JIB rates and real data.',
    icon: PoundSterling,
    category: 'Career',
  },
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK',
    description:
      'What qualified electricians earn — employed, self-employed, and specialist roles.',
    icon: PoundSterling,
    category: 'Career',
  },
  {
    href: '/guides/what-to-expect-as-apprentice',
    title: 'What to Expect as an Apprentice',
    description: 'Day-to-day reality of life as an electrical apprentice — from first day to EPA.',
    icon: Wrench,
    category: 'Career',
  },
  {
    href: '/guides/electrical-career-progression',
    title: 'Electrical Career Progression',
    description:
      'Where your career can go after qualifying — specialisms, management, and self-employment.',
    icon: TrendingUp,
    category: 'Career',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-electrical',
    heading: 'Why Choose an Electrical Career?',
    content: (
      <>
        <p>
          If you are leaving school and thinking about what to do next, an electrical career
          deserves serious consideration. Here is why thousands of school leavers choose this route
          every year:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earn while you learn.</strong> As an apprentice, you earn a wage from day
                one. No student debt. No three years of unpaid study. You are getting paid, gaining
                experience, and building a career — all at the same time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High demand, rising wages.</strong> The UK needs more electricians. The push
                towards net zero (EV chargers, solar panels, heat pumps, battery storage) is driving
                unprecedented demand. Qualified electricians are earning more than ever.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Job security.</strong> Every home, office, shop, factory, and hospital needs
                electrical installations. Every installation needs maintaining and inspecting. The
                work is not going away — it is growing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Variety.</strong> No two days are the same. You might be wiring a new
                kitchen extension on Monday, fault-finding on a commercial installation on Tuesday,
                and installing an{' '}
                <SEOInternalLink href="/guides/ev-charger-installation-guide">
                  EV charger
                </SEOInternalLink>{' '}
                on Wednesday. The work is physical, mental, and hands-on.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Be your own boss.</strong> Many electricians go self-employed after a few
                years. You set your own hours, choose your own jobs, and build your own business.
                The earning potential is significantly higher than employment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'gcse-requirements',
    heading: 'GCSE Requirements: What You Need to Get Started',
    content: (
      <>
        <p>
          You do not need a stack of qualifications to become an electrician. The entry requirements
          are straightforward:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maths — grade 4 (C) or above.</strong> This is the most important one. You
                will use maths daily — Ohm's Law, cable sizing calculations, voltage drop, power
                formulas, percentages, and basic trigonometry for conduit bending. If your Maths
                GCSE is below grade 4, retake it or complete Functional Skills Level 2 in Maths.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>English Language — grade 4 (C) or above.</strong> You need to read technical
                documents (BS 7671, specifications, drawings) and write reports (EICR observations,
                risk assessments, method statements). Clear written communication matters.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Science — grade 4 (C) or above (desirable).</strong> Physics is ideal
                because it covers electricity, magnetism, and energy — all directly relevant. But
                Combined Science is fine. Some employers do not require Science if your Maths and
                English are strong.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you do not have these GCSEs yet, do not worry. You can retake GCSEs, complete
          Functional Skills qualifications, or find a pre-apprenticeship programme that includes the
          necessary Maths and English alongside an introduction to electrical work. The key is to
          show employers that you have the foundation to learn.
        </p>
      </>
    ),
  },
  {
    id: 'apprenticeship-route',
    heading: 'The Apprenticeship Route: How It Works',
    content: (
      <>
        <p>
          The most common route into the electrical trade is the{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            Level 3 Installation Electrician / Maintenance Electrician Apprenticeship
          </SEOInternalLink>
          . Here is how it works:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duration: 3-4 years.</strong> The standard length is 42 months. Some
                employers complete it in 36 months. You are employed full-time by a company
                (domestic, commercial, or industrial) and attend college one day per week or in
                block-release periods.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>College study.</strong> You work towards Level 2 and Level 3 qualifications
                in electrical installation. This covers electrical theory (Ohm's Law, AC theory,
                three-phase), health and safety, BS 7671 regulations, and practical skills
                (terminating cables, installing containment, testing).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>On-the-job training.</strong> You spend most of your time on site with a
                qualified electrician, learning by doing. You will start with basic tasks (chasing
                walls, pulling cables, fitting back boxes) and progress to more complex work
                (terminating at distribution boards, first fix, second fix, testing).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>End Point Assessment (EPA).</strong> At the end of the apprenticeship, you
                complete an independent assessment that tests your practical skills, technical
                knowledge, and professional behaviours. Pass the EPA and you are a qualified
                electrician. See our{' '}
                <SEOInternalLink href="/guides/epa-what-to-expect">
                  EPA preparation guide
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AM2 Assessment.</strong> The AM2 is a two-day practical assessment at a
                purpose-built centre. You install, test, and fault-find on realistic installations.
                It is required for registration with a competent person scheme (NICEIC, NAPIT). See
                our <SEOInternalLink href="/guides/am2-exam-tips">AM2 exam tips</SEOInternalLink>.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Study for your apprenticeship on your phone"
          description="Elec-Mate's Study Centre covers everything you need for Level 2 and Level 3 — electrical theory, BS 7671 regulations, practical guidance, and exam preparation. Short, focused sections you can study between jobs."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'what-the-job-involves',
    heading: 'What the Job Involves: Day-to-Day Reality',
    content: (
      <>
        <p>
          Being an electrician is not sitting at a desk. It is physical, varied, and hands-on. Here
          is what a typical week might look like for a domestic electrician:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Monday: Kitchen Rewire</h4>
                <p className="text-white text-sm leading-relaxed">
                  First fix on a kitchen extension. Chase walls for cables, install back boxes, run
                  cables from the consumer unit to new socket and lighting positions. Fit
                  containment where needed. Physically demanding — drilling, chiselling, pulling
                  cables through tight spaces.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Tuesday: EICR for a Landlord</h4>
                <p className="text-white text-sm leading-relaxed">
                  Periodic inspection and testing of a 3-bedroom rental property. Visual inspection,
                  dead testing (continuity, insulation resistance), live testing (earth fault loop
                  impedance, RCD operation). Write up the{' '}
                  <SEOInternalLink href="/guides/eicr-for-landlords">EICR report</SEOInternalLink>{' '}
                  and send it to the landlord.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Wednesday: Consumer Unit Upgrade</h4>
                <p className="text-white text-sm leading-relaxed">
                  Replace an old rewirable fuse board with a modern consumer unit. Isolate the
                  supply, remove the old board, install the new metal consumer unit with RCBOs,
                  reconnect all circuits, test everything, and issue an EIC (Electrical Installation
                  Certificate).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Thursday: EV Charger Installation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Install a 7kW home{' '}
                  <SEOInternalLink href="/guides/ev-charger-installation-guide">
                    EV charger
                  </SEOInternalLink>
                  . Run a dedicated circuit from the consumer unit to the garage, fit an isolator
                  and the charge point, test, commission, and certify. This is one of the
                  fastest-growing areas of work for electricians.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Friday: Second Fix and Fault Finding</h4>
                <p className="text-white text-sm leading-relaxed">
                  Morning: second fix on the kitchen extension from Monday — fit sockets, switches,
                  and light fittings. Afternoon: fault-finding call — a customer's RCD keeps
                  tripping. Systematic testing to identify a faulty immersion heater element as the
                  cause. Replace it, test, done.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'earning-potential',
    heading: 'Earning Potential: What Electricians Really Earn',
    content: (
      <>
        <p>
          One of the biggest advantages of the electrical trade is the earning potential. Here is a
          realistic breakdown based on 2026 UK data:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Apprentice (Year 1-4):</strong> £12,000-£26,000 per year, rising each year.
                No student debt. You are earning from day one.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Newly qualified (employed):</strong> £28,000-£35,000 per year. Your earning
                power increases rapidly as you gain experience and can work independently. See{' '}
                <SEOInternalLink href="/guides/electrician-salary-uk">
                  full salary data
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experienced (employed, 5+ years):</strong> £35,000-£45,000 per year. Senior
                electricians, project managers, and those with specialist skills earn more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-employed:</strong> £40,000-£70,000+ per year. Your income depends on
                how hard you work, how efficiently you operate, and what you charge. Many
                self-employed electricians earn £200-£350 per day. See{' '}
                <SEOInternalLink href="/guides/going-self-employed-electrician">
                  going self-employed
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist areas:</strong> EV charger installers, solar PV engineers, data
                centre electricians, and fire alarm specialists can command premium rates —
                £300-£500+ per day in some cases.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Compare this to the average UK graduate salary of about £27,000 — with £40,000+ of student
          debt. By the time a university graduate is starting their career, a qualified electrician
          has been earning for 3-4 years and is already on a higher salary with no debt.
        </p>
      </>
    ),
  },
  {
    id: 'career-progression',
    heading: 'Career Progression: Where Can You Go?',
    content: (
      <>
        <p>
          Becoming a qualified electrician is the starting point, not the end. The trade offers
          multiple routes for progression:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection and Testing (C&G 2391).</strong> Allows you to carry out EICRs
                and initial verification. Opens up a steady stream of periodic inspection work — a
                recurring revenue source.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialisation.</strong>{' '}
                <SEOInternalLink href="/guides/electrical-specialisations">
                  Specialist areas
                </SEOInternalLink>{' '}
                include EV charger installation, solar PV, battery storage, fire alarm systems,
                emergency lighting, data cabling, building management systems (BMS), and industrial
                controls. Each specialism commands higher rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-employment.</strong> Start your own business, set your own rates, and
                build your own client base. Many electricians go self-employed within 3-5 years of
                qualifying.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Management.</strong> Site supervisor, contracts manager, project manager,
                electrical manager. These roles combine technical knowledge with leadership and are
                well paid.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design and consultancy.</strong> With further qualifications (such as a BEng
                or HNC in electrical engineering), you can move into electrical design, building
                services engineering, or consultancy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Teaching and assessing.</strong> Experienced electricians can become college
                lecturers, training centre instructors, or EPA assessors — passing their knowledge
                to the next generation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-to-apply',
    heading: 'How to Apply for an Electrical Apprenticeship',
    content: (
      <>
        <p>Ready to start? Here is how to find and apply for an electrical apprenticeship:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Search for vacancies.</strong> Check the Government's Find an Apprenticeship
              website (gov.uk), Indeed, Reed, and local electrical contractor websites. Also contact
              local electrical companies directly — many do not advertise but are open to
              applications.
            </li>
            <li>
              <strong>Prepare your CV.</strong> Highlight your Maths, English, and Science GCSEs.
              Mention any practical experience — even DIY, school technology projects, or part-time
              jobs that show reliability and work ethic. See our{' '}
              <SEOInternalLink href="/guides/electrician-cv-guide">
                electrician CV guide
              </SEOInternalLink>
              .
            </li>
            <li>
              <strong>Write a strong cover letter.</strong> Explain why you want to become an
              electrician (not just "I like working with my hands" — mention the career prospects,
              the variety, and any genuine interest in electrical work). Show you have researched
              the company.
            </li>
            <li>
              <strong>Prepare for the interview.</strong> Expect questions about why you want to be
              an electrician, what you know about the trade, your Maths ability, and how you handle
              working in a team. Be honest, enthusiastic, and punctual. See our{' '}
              <SEOInternalLink href="/guides/electrician-interview-questions">
                interview questions guide
              </SEOInternalLink>
              .
            </li>
            <li>
              <strong>Apply to multiple companies.</strong> Do not pin all your hopes on one
              application. Apply to 10-20 companies. Follow up if you do not hear back within two
              weeks. Persistence matters.
            </li>
          </ol>
        </div>
        <p>
          The best time to apply is September to November for the following year's intake, but
          electrical companies recruit year-round. Do not wait for the "perfect" vacancy — get your
          application out there.
        </p>
        <SEOAppBridge
          title="Start studying before your apprenticeship begins"
          description="Get ahead with Elec-Mate's Study Centre. Cover the basics of electrical theory, health and safety, and BS 7671 before your first day on site. Structured courses, AI tutor, and practice questions — all on your phone."
          icon={Brain}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalCareersForSchoolLeaversPage() {
  return (
    <GuideTemplate
      title="Electrical Careers for School Leavers | How to Start"
      description="Complete guide to starting an electrical career from school. GCSE requirements, how to apply for an apprenticeship, what the job involves, earning potential from apprentice to self-employed, and career progression routes."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          Electrical Careers for School Leavers:{' '}
          <span className="text-yellow-400">How to Start Your Journey</span>
        </>
      }
      heroSubtitle="No degree needed. Earn while you learn. High demand, rising wages, and a career with real progression. This guide covers everything a school leaver needs to know about becoming an electrician — from GCSE requirements to earning £50,000+ as a qualified spark."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Careers"
      relatedPages={relatedPages}
      ctaHeading="Start Your Electrical Career With Elec-Mate"
      ctaSubheading="Structured study courses for apprentices, AI tutor, practice questions, and exam preparation. Everything you need to ace your college work and stand out on site. 7-day free trial."
    />
  );
}
