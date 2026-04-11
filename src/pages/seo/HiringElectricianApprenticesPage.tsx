import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  PoundSterling,
  Users,
  ClipboardCheck,
  CheckCircle2,
  Building2,
  Briefcase,
  BookOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business Guides', href: '/guides/electrical-business-growth' },
  { label: 'Hiring Electrical Apprentices', href: '/hiring-electrical-apprentices' },
];

const tocItems = [
  { id: 'how-apprenticeships-work', label: 'How Apprenticeships Work' },
  { id: 'esfa-funding', label: 'ESFA Funding Explained' },
  { id: 'levy-vs-non-levy', label: 'Levy vs Non-Levy Employers' },
  { id: 'apprentice-wages', label: 'Apprentice Wages' },
  { id: 'choosing-training-provider', label: 'Choosing a Training Provider' },
  { id: 'jib-paperwork', label: 'JIB Paperwork' },
  { id: 'mentoring', label: 'Your Mentoring Responsibility' },
  { id: 'for-electricians', label: 'Managing Your Apprentice' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Education & Skills Funding Agency (ESFA) funds up to 95% of apprenticeship training costs for non-levy paying employers and 100% (via levy funds) for levy-paying employers with large payrolls.',
  'Electrical apprenticeships in England follow the Level 3 Electrician Apprenticeship Standard (ST0145), which replaced the older framework and includes end-point assessment (EPA).',
  'The National Minimum Wage for apprentices is £6.40 per hour (April 2024 rate), but most electrical employers pay above this — the JIB recommends age-related scales aligned with apprentice year.',
  'You must register your apprentice with the Joint Industry Board (JIB) within the first few weeks of employment to establish their grading and entitlement to JIB benefits.',
  'Non-levy employers pay just 5% of training costs (capped at the funding band maximum), with the ESFA contributing the remaining 95% directly to the training provider.',
];

const faqs = [
  {
    question: 'How much does it cost to hire an electrical apprentice?',
    answer:
      "For non-levy employers (annual payroll below £3 million), the employer contribution is 5% of the training costs, up to the funding band maximum. For the Level 3 Electrician Apprenticeship Standard (ST0145), the funding band maximum is £27,000 over the full apprenticeship. Your contribution is therefore around £1,350 over three to four years, or roughly £400 per year. You also pay the apprentice's wages, National Insurance contributions, and any personal protective equipment or tool costs. Levy-paying employers pay nothing from their own pocket — all costs are drawn from their Digital Apprenticeship Service (DAS) account.",
  },
  {
    question: 'What is the ESFA and how does it fund apprenticeships?',
    answer:
      'The Education & Skills Funding Agency (ESFA) is the government body responsible for funding apprenticeships in England. For non-levy employers, the ESFA pays 95% of training costs directly to the approved training provider. Levy-paying employers (payroll over £3 million) pay the Apprenticeship Levy at 0.5% of their annual wage bill (with a £15,000 annual allowance), and these funds sit in a Digital Apprenticeship Service account from which training costs are drawn. Employers must use an ESFA-registered training provider to access any government funding.',
  },
  {
    question: 'What qualifications does an electrical apprentice work towards?',
    answer:
      'Under the Level 3 Electrician Apprenticeship Standard (ST0145), apprentices work towards the Level 3 Diploma in Installing Electrotechnical Systems and Equipment (City & Guilds 2357) or equivalent, the Level 3 Certificate in Electrotechnical Technology (C&G 2357 Part B), and the End-Point Assessment (EPA) which includes a practical task and professional discussion. On completion, apprentices typically hold the qualifications required for JIB Approved Electrician grade and can apply for ECS Gold Card (Electrotechnical Certification Scheme).',
  },
  {
    question: 'What is the apprentice National Minimum Wage?',
    answer:
      'The National Minimum Wage for apprentices is £6.40 per hour from April 2024. This rate applies to all apprentices in their first year and to those under 19 years old in any year. Once an apprentice is 19 or older AND has completed their first year, they are entitled to the National Minimum Wage for their age band (e.g., £11.44 per hour for those aged 21+). Most electrical employers pay above the minimum — the JIB recommends year-by-year scales: Year 1: 40% of Approved Electrician rate; Year 2: 50%; Year 3: 65%; Year 4: 75%.',
  },
  {
    question: 'Do I need to register my apprentice with the JIB?',
    answer:
      "Yes. If you are a JIB-registered employer (which most NICEIC and NAPIT members are), you must register your apprentice with the Joint Industry Board (JIB) at the start of their employment. Registration establishes the apprentice's grade (Apprentice Year 1), entitles them to JIB benefits (such as the Welfare Benefit Scheme and ECS Card), and creates their employment record which is used for future grading assessments. Registration is done online through the JIB portal and costs a small annual fee.",
  },
  {
    question: 'Can I take on an apprentice if I am a sole trader?',
    answer:
      'Yes. Sole traders can hire apprentices and access ESFA funding. You must have a Digital Apprenticeship Service (DAS) account (free to set up at gov.uk), choose an ESFA-registered training provider, and sign an apprenticeship agreement with the apprentice. As a non-levy employer you pay 5% of training costs. Bear in mind that as the sole employer you will personally be responsible for all mentoring and supervision — you cannot take on an apprentice if you cannot guarantee adequate on-site supervision throughout their training.',
  },
  {
    question: 'What happens if my business cannot keep the apprentice for the full term?',
    answer:
      'If you need to end the apprenticeship early, you must notify the training provider and the ESFA. The apprentice may be able to transfer to another employer and continue their apprenticeship from where they left off — this is called an apprenticeship transfer. The JIB and some training providers maintain lists of employers willing to take on transferred apprentices. You should only end an apprenticeship as a last resort, and you must follow standard employment law procedures including notice periods and, where applicable, redundancy rules.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-business-growth',
    title: 'Growing Your Electrical Business',
    description:
      'Strategies for scaling from sole trader to employer in the UK electrical industry.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/managing-electrical-subcontractors',
    title: 'Managing Electrical Subcontractors',
    description: 'How to check competency, set up contracts, and manage subcontractor quality.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/electrical-salary-benchmarking',
    title: 'Electrician Salary Benchmarking',
    description: 'JIB grade rates, London weighting, and how to benchmark pay in 2025.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/job-scheduling',
    title: 'Job Scheduling App',
    description:
      'Schedule your apprentice alongside your regular jobs with drag-and-drop planning.',
    icon: ClipboardCheck,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'how-apprenticeships-work',
    heading: 'How Electrical Apprenticeships Work for Employers',
    content: (
      <>
        <p>
          Taking on an electrical apprentice is one of the most cost-effective ways to grow your
          workforce. You recruit the apprentice directly, sign an apprenticeship agreement, and the
          government (via the ESFA) funds the vast majority of their training costs at college or
          with a training provider.
        </p>
        <p>
          In England, electrical apprenticeships follow the{' '}
          <strong>Level 3 Electrician Apprenticeship Standard (ST0145)</strong>, introduced to
          replace the older framework apprenticeships. The standard typically lasts three to four
          years for school leavers, or can be compressed for mature entrants with prior electrical
          knowledge.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Off-the-job training</strong> — at least 20% of the apprentice's paid
                working hours must be spent in off-the-job training (college, online learning, or
                structured workplace training). This is a legal requirement and is monitored by the
                ESFA. Your training provider will help you track and record this time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>End-point assessment (EPA)</strong> — at the end of the apprenticeship, the
                apprentice is assessed by an independent end-point assessment organisation (EPAO).
                The EPA includes a practical task, knowledge test, and professional discussion.
                Passing the EPA is required to complete the apprenticeship standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Apprenticeship agreement</strong> — you must sign a written apprenticeship
                agreement with the apprentice setting out the terms of employment, training, and the
                apprenticeship standard being followed. This is a legal requirement under the
                Apprenticeships, Skills, Children and Learning Act 2009.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commitment statement</strong> — you, the training provider, and the
                apprentice must all sign a commitment statement at the start of the apprenticeship.
                This sets out the planned content, schedule, and expectations of all three parties.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Apprenticeships are employment contracts, not just training arrangements. Your apprentice
          is a full employee with all associated employment rights — holiday pay, sick pay, pension
          auto-enrolment (once eligible), and protection from unfair dismissal after two years.
        </p>
      </>
    ),
  },
  {
    id: 'esfa-funding',
    heading: 'ESFA Funding: How the Government Pays for Training',
    content: (
      <>
        <p>
          The <strong>Education & Skills Funding Agency (ESFA)</strong> administers apprenticeship
          funding in England. The amount of government support depends on whether your business pays
          the Apprenticeship Levy.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Funding band maximum</strong> — the ESFA sets a maximum funding band for
                each apprenticeship standard. For the Level 3 Electrician Standard (ST0145) this is
                £27,000. Training costs must not exceed this cap. Your training provider will agree
                a price within the band.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional payments</strong> — if your apprentice is aged 16 to 18 at the
                start of their apprenticeship, the ESFA pays an additional £1,000 to you (the
                employer) and £1,000 to the training provider. This is to encourage employers to
                take on younger apprentices who require more support.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Digital Apprenticeship Service (DAS)</strong> — all employers must manage
                their apprenticeships through the DAS account on gov.uk. This is where you find
                approved training providers, approve training costs, and manage payments. Setting up
                a DAS account is free and straightforward.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What funding does NOT cover</strong> — ESFA funding covers training and
                assessment costs only. It does not cover apprentice wages, PPE, tools, travel, or
                any other employment costs. These are entirely your responsibility as the employer.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'levy-vs-non-levy',
    heading: 'Levy vs Non-Levy Employers',
    content: (
      <>
        <p>
          The Apprenticeship Levy was introduced in April 2017. Whether your business pays it
          determines how apprenticeship training costs are funded.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Levy-paying employers</strong> — businesses with an annual wage bill above
                £3 million pay the Apprenticeship Levy at 0.5% of their payroll, minus a £15,000
                annual allowance. These funds accumulate in a DAS account and must be used for
                apprenticeship training within 24 months or they expire. Large electrical
                contractors and M&E firms are typically levy payers. Levy funds can be transferred
                to supply chain partners (including small subcontractors) up to 25% of total levy
                funds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-levy employers</strong> — businesses with a wage bill below £3 million
                (the vast majority of independent electrical contractors) pay just 5% of training
                costs as a co-investment. The ESFA pays 95% directly to the training provider. For a
                £20,000 training programme, your contribution is £1,000 spread over three to four
                years — typically invoiced quarterly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Levy transfer</strong> — if you are a small non-levy employer and have a
                good relationship with a large M&E contractor who is a levy payer, ask whether they
                can transfer levy funds to cover your training costs entirely. Large employers can
                transfer up to 25% of their levy pot to other employers, and many are incentivised
                to do so to prevent funds expiring unused.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'apprentice-wages',
    heading: 'Apprentice Wages: Minimum Rates and JIB Recommendations',
    content: (
      <>
        <p>
          Apprentice wages are your responsibility as the employer. The statutory minimum is low,
          but most electrical employers — especially JIB members — pay considerably more to attract
          and retain good apprentices.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>National Minimum Wage (apprentice rate)</strong> — £6.40 per hour from April
                2024. This applies to all apprentices in their first year, and to apprentices under
                19 in any year. Once an apprentice is 19 or older and past Year 1, the age-band NMW
                applies (£11.44 per hour for those aged 21+).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>JIB recommended scales</strong> — the Joint Industry Board recommends
                apprentice pay as a percentage of the Approved Electrician (AE) rate. Year 1: 40% of
                AE rate; Year 2: 50%; Year 3: 65%; Year 4: 75%. At the 2025 JIB AE rate of
                approximately £20.00/hour, this equates to roughly £8.00, £10.00, £13.00, and £15.00
                per hour across the four years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Travel time and expenses</strong> — under the JIB Working Rule Agreement
                (WRA), apprentices are entitled to travel time and travel allowances on the same
                basis as qualified electricians. Make sure your payroll reflects this, especially
                for apprentices travelling to college days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pension auto-enrolment</strong> — apprentices must be auto-enrolled into a
                workplace pension once they meet the age and earnings criteria (aged 22+, earnings
                above £10,000/year). Most electrical apprentices will meet these thresholds before
                the end of their apprenticeship.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-training-provider',
    heading: 'Choosing a Training Provider',
    content: (
      <>
        <p>
          Your training provider delivers the off-the-job learning and prepares the apprentice for
          their end-point assessment. Choosing the right provider significantly affects the quality
          of your apprentice's training.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ESFA registered providers</strong> — you must use a provider on the ESFA
                Register of Apprenticeship Training Providers (RoATP). Search the Find
                Apprenticeship Training service at gov.uk to find providers delivering ST0145 in
                your area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ofsted rating</strong> — check the provider's most recent Ofsted inspection
                rating. Good or Outstanding-rated providers deliver better outcomes. Inadequate or
                Requires Improvement providers should be avoided — ESFA may also withdraw their
                registration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Achievement rates</strong> — ask providers for their achievement rates for
                electrical apprenticeships. The national average is around 55 to 65%. A provider
                with achievement rates significantly below this warrants further scrutiny.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Location and delivery model</strong> — consider travel time for your
                apprentice on college days. Some providers offer day-release, block-release
                (residential), or blended online/on-site models. Day-release (one day per week at
                college) is the most common for electrical apprenticeships.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'jib-paperwork',
    heading: 'JIB Paperwork and Registration',
    content: (
      <>
        <p>
          The Joint Industry Board (JIB) is the industry body that manages grading, employment
          conditions, and benefits for electricians working in England, Wales, and Northern Ireland.
          Most employers who are NICEIC or NAPIT registered are also JIB employers and must follow
          the JIB Working Rule Agreement.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Apprentice registration</strong> — register your apprentice with the JIB
                online within the first few weeks of employment. You will need: the apprentice's
                personal details, NI number, start date, training provider details, and your JIB
                employer registration number.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS Apprentice Card</strong> — once registered, the apprentice applies for
                an Electrotechnical Certification Scheme (ECS) Apprentice Card. This must be carried
                on site and proves they are a registered apprentice. Many principal contractors will
                not allow unregistered apprentices on site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual registration renewal</strong> — JIB apprentice registration must be
                renewed annually. The training provider usually handles this in conjunction with the
                employer. Failure to renew means the apprentice may not be covered by the JIB
                Welfare Benefit Scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grading on completion</strong> — on successful completion of the
                apprenticeship standard and EPA, submit the apprentice's grading application to the
                JIB for Approved Electrician status. This entitles them to an ECS Gold Card and the
                full Approved Electrician rate under the Working Rule Agreement.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mentoring',
    heading: 'Your Mentoring Responsibility',
    content: (
      <>
        <p>
          As an employer, you are legally and morally responsible for the on-site development of
          your apprentice. The ESFA requires that apprentices receive adequate supervision and
          mentoring throughout their apprenticeship.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Designated mentor</strong> — appoint a named, qualified electrician as the
                apprentice's workplace mentor. This person should ideally hold an Approved
                Electrician or Technician grade and have some experience of working with
                apprentices. A mentoring award (such as City & Guilds 6317) is not mandatory but is
                beneficial.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regular reviews</strong> — you must participate in regular progress reviews
                with the apprentice and training provider, typically every 12 weeks. These reviews
                assess the apprentice's development against the apprenticeship standard and identify
                any support needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Varied work experience</strong> — expose your apprentice to a range of
                electrical work throughout their training: domestic, commercial, industrial, first
                fix, second fix, testing, and commissioning. The end-point assessment expects
                apprentices to demonstrate broad competence, not just one type of work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pastoral care</strong> — apprentices, particularly school leavers, may face
                personal challenges during their training. As the employer, you have a duty of care.
                Be approachable, address issues early, and signpost support services (such as the
                JIB Welfare Benefit Scheme which provides mental health support) when needed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Managing Your Apprentice Day-to-Day with Elec-Mate',
    content: (
      <>
        <p>
          Once your apprentice is on board, the practical challenge is keeping your business running
          smoothly while delivering the varied work experience and supervision they need.
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/job-scheduling">job scheduling tools</SEOInternalLink> make
          it easier to plan apprentice-appropriate work alongside your regular jobs.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Schedule College Days Automatically</h4>
                <p className="text-white text-sm leading-relaxed">
                  Block out your apprentice's college day in the{' '}
                  <SEOInternalLink href="/tools/job-scheduling">
                    Elec-Mate scheduler
                  </SEOInternalLink>{' '}
                  so jobs are never booked that require them on their training day. Fewer scheduling
                  conflicts means fewer awkward calls to clients.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Track Varied Work for EPA Evidence</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use job records in Elec-Mate to log the types of work your apprentice has assisted
                  with. This creates a useful evidence base for progress reviews and end-point
                  assessment preparation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage your apprentice alongside your business with Elec-Mate"
          description="Scheduling, job management, certificates, and invoicing in one app. Join 1,000+ UK electricians using Elec-Mate to run their business more efficiently. 7-day free trial."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HiringElectricianApprenticesPage() {
  return (
    <GuideTemplate
      title="Hiring Electrical Apprentices UK | Employer Guide to Apprenticeships"
      description="Complete employer guide to hiring electrical apprentices in the UK. ESFA funding explained (up to 95–100% of training costs), levy vs non-levy employers, JIB registration, apprentice wages, choosing a training provider, and mentoring responsibilities."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Employer Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          Hiring Electrical Apprentices UK:{' '}
          <span className="text-yellow-400">Employer Guide 2025</span>
        </>
      }
      heroSubtitle="Everything you need to know about taking on an electrical apprentice — ESFA funding (up to 95% of training costs), levy vs non-levy rules, JIB paperwork, apprentice wages, choosing a training provider, and your mentoring responsibilities."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Hiring Electrical Apprentices"
      relatedPages={relatedPages}
      ctaHeading="Run your electrical business and manage your apprentice with Elec-Mate"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for job scheduling, electrical certificates, quoting, and invoicing. 7-day free trial, cancel anytime."
    />
  );
}
