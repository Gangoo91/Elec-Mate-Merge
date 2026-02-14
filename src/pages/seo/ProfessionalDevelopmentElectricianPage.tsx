import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Award,
  GraduationCap,
  Users,
  BookOpen,
  TrendingUp,
  ClipboardCheck,
  Calendar,
  Building2,
  Lightbulb,
  Target,
  Brain,
  FileCheck2,
  Briefcase,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career', href: '/guides/how-to-become-electrician' },
  { label: 'Professional Development', href: '/guides/professional-development-electrician' },
];

const tocItems = [
  { id: 'why-cpd', label: 'Why CPD Matters' },
  { id: 'cpd-requirements', label: 'CPD Requirements' },
  { id: 'upskilling-options', label: 'Upskilling Options' },
  { id: 'conferences-events', label: 'Conferences and Events' },
  { id: 'industry-memberships', label: 'Industry Memberships' },
  { id: 'recording-cpd', label: 'Recording Your CPD' },
  { id: 'self-employed-cpd', label: 'CPD for Self-Employed Electricians' },
  { id: 'elecmate-cpd', label: 'CPD on Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Continuing Professional Development (CPD) is a requirement for maintaining registration with competent person schemes such as NICEIC, NAPIT, and ELECSA — it is not optional for registered electricians.',
  'CPD covers formal learning (courses, qualifications), informal learning (reading technical publications, attending events), and reflective learning (applying knowledge gained on the job).',
  'Upskilling into specialist areas — EV charging, solar PV, battery storage, fire alarm systems, data cabling — increases your earning potential and protects against market changes.',
  'Recording CPD properly is as important as doing it. Competent person scheme assessments will ask for evidence of CPD activity, and poor records can affect your registration status.',
  'Elec-Mate includes structured CPD courses, a CPD recording tool, and tracks your learning hours automatically — making it easy to demonstrate compliance at your next assessment.',
];

const faqs = [
  {
    question: 'How many CPD hours do electricians need per year?',
    answer:
      'The specific requirement depends on your competent person scheme. NICEIC requires a minimum of 35 hours of CPD per year for qualified supervisors (the person who holds the scheme registration). NAPIT and ELECSA have similar requirements. The IET recommends a minimum of 30 hours per year for its members. These hours can include formal training courses, self-directed study, attending conferences and seminars, reading technical publications, manufacturer training, and on-the-job learning that is documented and reflected upon. The key is that the CPD must be relevant to your work and that you can demonstrate what you learned and how you applied it. Simply attending a course is not enough — you need to show the learning outcome.',
  },
  {
    question: 'What counts as valid CPD activity?',
    answer:
      'Valid CPD activity covers a wide range of learning: attending accredited training courses (18th Edition update courses, inspection and testing refreshers, EV charging installation training); completing online learning modules; reading technical publications (IET Wiring Matters, Electrical Contracting News); attending manufacturer product training; participating in industry conferences and seminars; attending local IET branch meetings; studying for new qualifications; mentoring apprentices (structured mentoring with documented reflection); and self-directed study on new regulations or technologies. The common thread is that the activity must be relevant to your professional role and you must be able to articulate what you learned. Watching a YouTube video about wiring can count if you document what you learned and how you applied it — but you need to show evidence.',
  },
  {
    question: 'What happens if I do not do my CPD?',
    answer:
      'If you are registered with a competent person scheme, failure to demonstrate adequate CPD at your periodic assessment can result in conditions being placed on your registration, additional assessment requirements, or in serious cases, suspension or withdrawal of your registration. Losing your scheme registration means you can no longer self-certify notifiable work under Part P of the Building Regulations — you would need to use building control for every job that requires notification, adding cost and delay. Beyond scheme requirements, failing to keep your knowledge current creates practical risks: regulations change, new technologies emerge, and best practices evolve. An electrician who qualified in 2010 and has not updated their knowledge is working to outdated standards.',
  },
  {
    question: 'Is the 18th Edition update course CPD?',
    answer:
      'Yes, completing the 18th Edition update course (C&G 2382) counts as formal CPD. When amendments to BS 7671 are issued — such as Amendment 2 (2022) or Amendment 3 (2024) — attending the update course is one of the most valuable CPD activities you can do, because it directly affects your daily work. The course typically takes 1 to 3 days depending on the provider, and the resulting qualification is valid evidence of CPD. However, do not treat the 18th Edition course as your only CPD activity for the year — competent person schemes expect a broader range of learning activities across the full CPD period.',
  },
  {
    question: 'Can online courses count as CPD?',
    answer:
      'Yes, online and e-learning courses count as valid CPD provided they are from a recognised provider and you can demonstrate the learning outcome. Accredited courses from organisations like the IET, City & Guilds approved centres, and manufacturer training platforms are widely accepted. Elec-Mate training courses are designed as CPD-eligible content — each course has clear learning objectives, covers the relevant regulations and standards, and can be logged in your CPD record with the hours tracked automatically. Online learning is particularly convenient for self-employed electricians who cannot easily take time off during working hours to attend classroom-based courses.',
  },
  {
    question: 'Do I need CPD if I am self-employed?',
    answer:
      'Yes. CPD requirements apply regardless of your employment status. If you are registered with a competent person scheme (NICEIC, NAPIT, ELECSA), you must demonstrate CPD at your periodic assessment whether you are employed, self-employed, or a sole trader. In fact, CPD is arguably more important for self-employed electricians because there is no employer to arrange training for you — you are responsible for your own development. Self-employed electricians should factor CPD time and costs into their annual business planning. Elec-Mate makes this easier by providing CPD-eligible training content that you can access on your phone between jobs or in the evening, without needing to book classroom courses or travel to training centres.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/cpd-for-electricians',
    title: 'CPD for Electricians',
    description:
      'Detailed guide to CPD requirements, acceptable activities, and recording evidence for scheme assessments.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/18th-edition-course',
    title: '18th Edition Course',
    description:
      'Study for the C&G 2382 18th Edition qualification with structured training content.',
    icon: BookOpen,
    category: 'Training',
  },
  {
    href: '/guides/city-and-guilds-2391',
    title: 'C&G 2391 Guide',
    description: 'Everything you need to know about the inspection and testing qualification.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation',
    description:
      'Guide to EV charging point installation — one of the fastest-growing upskilling areas.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK 2026',
    description: 'Current salary data for employed and self-employed electricians across the UK.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-qualifications-pathway',
    title: 'Electrical Qualifications Pathway',
    description: 'The complete qualification pathway from apprentice to master electrician.',
    icon: GraduationCap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-cpd',
    heading: 'Why CPD Matters for Electricians',
    content: (
      <>
        <p>
          Continuing Professional Development (CPD) is the process of maintaining and developing
          your professional knowledge, skills, and competence throughout your career. For
          electricians, CPD is not a vague aspiration — it is a concrete requirement tied to your
          registration, your legal ability to self-certify work, and your professional credibility.
        </p>
        <p>
          The electrical industry evolves constantly. BS 7671 is amended every few years. New
          technologies — EV charging, solar PV, battery storage, smart home systems — create new
          work opportunities but require new knowledge. Building regulations change. Health and
          safety legislation updates. Manufacturer products are revised. An electrician who
          qualified ten years ago and has not engaged in CPD is working to outdated standards.
        </p>
        <p>
          Beyond regulatory compliance, CPD directly affects your earning potential. Electricians
          who invest in upskilling command higher rates because they can take on specialist work
          that others cannot. An electrician qualified in{' '}
          <SEOInternalLink href="/guides/ev-charger-installation">
            EV charger installation
          </SEOInternalLink>{' '}
          or fire alarm systems has access to work streams that a generalist does not.
        </p>
        <p>
          CPD is also about professional reputation. Clients, main contractors, and other trades
          respect electricians who are visibly invested in staying current. It signals competence,
          reliability, and pride in the profession.
        </p>
      </>
    ),
  },
  {
    id: 'cpd-requirements',
    heading: 'CPD Requirements: What You Must Do',
    content: (
      <>
        <p>
          The specific CPD requirements depend on your competent person scheme and professional
          memberships. The main schemes all require documented CPD:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC</strong> — requires a minimum of 35 hours of CPD per year for the
                Qualified Supervisor. CPD records are reviewed at periodic assessments (typically
                annual). Evidence of CPD must be documented and available for the assessor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT</strong> — requires documented CPD as part of the membership renewal
                process. Members must demonstrate ongoing learning relevant to their registered
                competence areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ELECSA</strong> — requires CPD as a condition of registration. CPD
                activities must be logged and evidence retained for assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IET</strong> — recommends a minimum of 30 hours of CPD per year for members.
                IET membership grades (MIET, FIET) require demonstrated commitment to professional
                development.
              </span>
            </li>
          </ul>
        </div>
        <p>
          CPD is typically categorised into three types: formal learning (accredited courses,
          qualifications), informal learning (reading, conferences, self-study), and reflective
          learning (applying new knowledge on the job and documenting the outcome). A good CPD
          portfolio includes all three types.
        </p>
      </>
    ),
  },
  {
    id: 'upskilling-options',
    heading: 'Upskilling Options: Where to Focus',
    content: (
      <>
        <p>
          The most valuable CPD is upskilling that opens new revenue streams. Here are the
          specialist areas with the strongest demand and growth potential in 2026:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              EV Charger Installation
            </h3>
            <p className="text-white text-sm leading-relaxed">
              The UK government has committed to banning the sale of new petrol and diesel cars.
              Demand for domestic and commercial EV charger installations is growing rapidly. The
              IET Code of Practice for Electric Vehicle Charging Equipment Installation is the key
              reference. Courses are typically 1 to 2 days.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              Solar PV and Battery Storage
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Renewable energy installations are booming. Solar PV design, installation, and
              commissioning require specific competences beyond standard domestic wiring. MCS
              certification opens access to the highest-value work in this sector.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-red-400" />
              Fire Alarm Systems
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Fire detection and alarm systems to BS 5839 are specialist work that commands premium
              rates. The FIA (Fire Industry Association) offers accredited training courses.
              Commercial and HMO properties all require compliant fire alarm systems.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-blue-400" />
              Inspection and Testing (C&G 2391)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              If you qualified through the installation route and do not hold{' '}
              <SEOInternalLink href="/guides/city-and-guilds-2391">C&G 2391</SEOInternalLink>,
              adding this qualification opens up periodic inspection work — a steady, recurring
              income stream, particularly landlord EICRs.
            </p>
          </div>
        </div>
        <p>
          Other valuable upskilling areas include: data and structured cabling, building management
          systems (BMS), emergency lighting design and testing, uninterruptible power supply (UPS)
          systems, and industrial control systems.
        </p>
      </>
    ),
  },
  {
    id: 'conferences-events',
    heading: 'Conferences and Industry Events',
    content: (
      <>
        <p>
          Attending industry events is a valuable form of CPD that combines technical learning with
          networking. Key events for UK electricians include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ELEX Show</strong> — the leading trade show for electrical installers in the
                UK. Free to attend, with live demonstrations, manufacturer stands, and CPD seminars.
                Held at multiple venues across the country throughout the year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IET Local Branch Meetings</strong> — regular evening meetings at IET
                branches across the UK. Free for IET members. Topics range from regulation updates
                to emerging technologies. Excellent networking opportunities with local
                professionals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Manufacturer Training Days</strong> — companies like Hager, Schneider
                Electric, and Eaton regularly run free or low-cost training days at their centres.
                These cover new product ranges, installation techniques, and relevant regulation
                changes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar and Storage Live</strong> — the UK's leading renewable energy
                exhibition. Essential if you are upskilling into solar PV, battery storage, or EV
                charging.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When attending events, document what you learned and how you plan to apply it. Take notes,
          collect resources, and write a brief reflection afterwards. This turns attendance into
          documented CPD evidence that you can present at your next scheme assessment.
        </p>
      </>
    ),
  },
  {
    id: 'industry-memberships',
    heading: 'Industry Memberships Worth Having',
    content: (
      <>
        <p>
          Professional memberships enhance your credibility, provide access to resources and events,
          and are themselves evidence of professional commitment. The key memberships for UK
          electricians are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IET (Institution of Engineering and Technology)</strong> — the professional
                body that publishes BS 7671 and the associated guidance notes. Membership provides
                access to Wiring Matters magazine, technical resources, local branch events, and the
                ability to use post-nominal letters (MIET, FIET). Annual subscription applies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECA (Electrical Contractors' Association)</strong> — the trade association
                for electrical contractors. Provides business support, legal advice, technical
                helpline, and contract documentation. Membership is primarily for contracting
                businesses rather than individual electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELECT (Scotland)</strong> — the trade association for the electrical
                industry in Scotland. Equivalent to the ECA for Scotland, providing similar services
                including technical support and training.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>JIB (Joint Industry Board)</strong> — administers the grading and employment
                standards for the electrical contracting industry. Holds your ECS (Electrotechnical
                Certification Scheme) card, which confirms your qualifications and competence grade.
              </span>
            </li>
          </ul>
        </div>
        <p>
          At a minimum, every qualified electrician should hold IET membership and a valid ECS card.
          These are widely recognised as the baseline professional credentials in the industry.
        </p>
      </>
    ),
  },
  {
    id: 'recording-cpd',
    heading: 'Recording Your CPD: The Evidence That Matters',
    content: (
      <>
        <p>
          Doing CPD is only half the job. Recording it properly is equally important. When your
          competent person scheme assessor visits, they will ask to see your CPD records. If you
          cannot demonstrate your CPD activity with evidence, it is as though you did not do it.
        </p>
        <p>For each CPD activity, record:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Date and duration</strong> — when you did it and how long it took.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Description of activity</strong> — what the course, event, or study session
                covered.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Learning outcome</strong> — what you learned. Be specific: not "attended
                18th Edition update" but "learned about Amendment 3 changes to Regulation 530.3.201
                regarding bidirectional devices."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Application</strong> — how you have applied or plan to apply the learning in
                your work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Evidence</strong> — certificates, attendance records, course notes,
                screenshots of completed online modules.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Many electricians struggle with CPD recording because they do it retrospectively — trying
          to remember what they did months later. The solution is to record it as you go, ideally
          using a tool that does the recording for you.
        </p>
        <SEOAppBridge
          title="CPD recording that does itself"
          description="Elec-Mate automatically logs your training hours as you complete courses, tracks your total CPD, and generates a professional CPD record you can show to your scheme assessor. No spreadsheets, no filing."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'self-employed-cpd',
    heading: 'CPD for Self-Employed Electricians',
    content: (
      <>
        <p>
          Self-employed electricians face unique challenges with CPD. There is no employer to
          arrange training, no company training budget, and every hour spent on CPD is an hour not
          earning. The temptation is to let it slip — but this is a false economy.
        </p>
        <p>Practical approaches for self-employed electricians:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Budget for CPD annually.</strong> Set aside a fixed amount each year for
                training costs and lost earnings. Treat it as a business expense — because it is.
                CPD costs are tax-deductible for{' '}
                <SEOInternalLink href="/guides/electrician-self-employed">
                  self-employed electricians
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use online learning.</strong> Online courses let you study in the evenings
                or on quieter days without losing a full day of work. Elec-Mate courses are
                accessible on your phone between jobs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Attend free events.</strong> Manufacturer training days and trade shows like
                ELEX are free to attend. Plan ahead and book into the CPD seminars.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Document on-the-job learning.</strong> Working on an unfamiliar installation
                type, researching a regulation you have not applied before, or solving an unusual
                fault — these all count as CPD if you document the learning outcome.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'elecmate-cpd',
    heading: 'CPD on the Elec-Mate Platform',
    content: (
      <>
        <p>
          Elec-Mate is designed to make CPD easy, accessible, and automatic for working
          electricians. Here is what the platform offers:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Structured CPD Courses</h4>
                <p className="text-white text-sm leading-relaxed">
                  50+ training modules covering BS 7671 updates, testing procedures, special
                  locations, EV charging, solar PV, and more. Each course has clear learning
                  objectives and is broken into bite-sized sections you can complete between jobs.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Automatic CPD Recording</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every course you complete, every flashcard session, every training module — your
                  hours are logged automatically. Generate a professional CPD record for your scheme
                  assessor with one tap. No spreadsheets, no manual logging.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Regulation Assistant</h4>
                <p className="text-white text-sm leading-relaxed">
                  Got a question about a regulation, a testing requirement, or a design decision?
                  Ask the AI and get a clear, BS 7671-referenced answer. Using the AI assistant to
                  research technical questions counts as self-directed CPD.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Make CPD effortless"
          description="Structured courses, automatic hour tracking, and a professional CPD record you can generate for your scheme assessor. Join 430+ electricians managing their CPD on Elec-Mate. 7-day free trial."
          icon={Award}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ProfessionalDevelopmentElectricianPage() {
  return (
    <GuideTemplate
      title="Professional Development for Electricians | CPD Guide"
      description="Complete guide to CPD for electricians. Requirements for NICEIC, NAPIT, ELECSA registration. Upskilling options, conferences, industry memberships, and how to record CPD properly."
      datePublished="2025-05-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Award}
      heroTitle={
        <>
          Professional Development for Electricians:{' '}
          <span className="text-yellow-400">Your Complete CPD Guide</span>
        </>
      }
      heroSubtitle="CPD is not optional — it is a requirement for maintaining your competent person scheme registration and staying current with evolving regulations and technologies. This guide covers what counts as CPD, how many hours you need, upskilling options, and how to record everything properly."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician CPD"
      relatedPages={relatedPages}
      ctaHeading="Manage Your CPD on Your Phone"
      ctaSubheading="Structured courses, automatic hour tracking, and a professional CPD record for your scheme assessor. Join 430+ electricians doing CPD the easy way. 7-day free trial, cancel anytime."
    />
  );
}
