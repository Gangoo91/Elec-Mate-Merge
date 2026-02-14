import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  PoundSterling,
  Shield,
  Users,
  Award,
  FolderOpen,
  Target,
  CheckCircle,
  AlertTriangle,
  Scale,
  Briefcase,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/guides/electrical-apprenticeship-guide' },
  { label: 'Rights & Pay', href: '/guides/apprentice-rights-pay-uk' },
];

const tocItems = [
  { id: 'apprentice-pay-rates', label: 'Apprentice Pay Rates 2026' },
  { id: 'nmw-explained', label: 'National Minimum Wage Explained' },
  { id: 'holiday-entitlement', label: 'Holiday Entitlement' },
  { id: 'sick-pay', label: 'Sick Pay' },
  { id: 'working-hours', label: 'Working Hours and Breaks' },
  { id: 'redundancy-rights', label: 'Redundancy Rights' },
  { id: 'discrimination-protection', label: 'Discrimination Protection' },
  { id: 'know-your-contract', label: 'Know Your Contract' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The National Minimum Wage for apprentices aged under 19 (or in the first year of the apprenticeship at any age) is currently £7.55 per hour (April 2025 rate). After you turn 19 and have completed the first year, you are entitled to the NMW for your age group — which is significantly higher.',
  'You are entitled to at least 20 days of paid annual leave plus 8 bank holidays (5.6 weeks total for full-time workers). Your employer cannot reduce this because you are an apprentice.',
  'Your employer must pay you for your college or training days. These are paid working hours and count towards your contracted hours. If your employer deducts pay for college attendance, they are breaking the law.',
  'Apprentices have the same employment rights as any other employee — protection against unfair dismissal (after two years), redundancy pay, protection against discrimination, and the right to a safe working environment.',
  'If you believe your rights are being violated, speak to your training provider first. They have a relationship with your employer and can often resolve issues informally. If that fails, ACAS, Citizens Advice, and the ESFA apprenticeship helpline can all help.',
];

const faqs = [
  {
    question: 'What is the apprentice minimum wage in 2026?',
    answer:
      'The apprentice rate of the National Minimum Wage is set annually by the government, typically changing in April. From April 2025, the apprentice rate is £7.55 per hour. This rate applies to apprentices aged under 19 and to apprentices aged 19 or over who are in the first year of their apprenticeship. After you turn 19 and have completed your first year, you are entitled to the higher NMW rate for your age group. For 2025, those rates are: £10.00 per hour for ages 18 to 20, £12.21 per hour for ages 21 and over. The 2026 rates will be announced in the Autumn Budget and typically take effect the following April. Many electrical employers pay above the minimum wage, particularly JIB-graded companies, which have their own pay scales for apprentices at each year of the programme.',
  },
  {
    question: 'Does my employer have to pay me for college days?',
    answer:
      'Yes. Your college or training provider days are part of your contracted working hours. Your employer must pay you at your normal hourly rate for all time spent at college, including travel time if your employment contract covers it. This is a condition of the apprenticeship funding agreement signed between your employer and the ESFA. If your employer deducts pay for college attendance, reduces your hours to exclude college days, or expects you to attend college in your own time, they are in breach of the agreement and potentially breaking National Minimum Wage law. Raise the issue with your training provider in the first instance.',
  },
  {
    question: 'Can I be made redundant as an apprentice?',
    answer:
      'Yes, apprentices can be made redundant, but your employer must follow the same redundancy procedures as for any other employee. If you have been employed for less than two years, your employer can dismiss you with the appropriate notice period (usually one week). If you have been employed for two years or more, you are entitled to statutory redundancy pay. When an apprentice is made redundant, the ESFA Redundancy Support Service for Apprentices can help you find a new employer to continue your apprenticeship. Your training provider also has a responsibility to support you in finding a new placement. You do not have to restart your apprenticeship from the beginning — your existing learning and OJT hours carry over to the new employer.',
  },
  {
    question: 'How much holiday am I entitled to as an apprentice?',
    answer:
      'You are entitled to the same statutory holiday as any other employee: 5.6 weeks per year for full-time workers, which equals 28 days (including bank holidays) if you work a 5-day week. Your employer may choose to offer more than the statutory minimum. If you work part-time, your entitlement is calculated pro-rata. Holiday pay should be at your normal rate of pay. Your employer cannot force you to take your holiday during college closures (although many do align holiday with college term dates for convenience). You accrue holiday from your first day of employment, and unused holiday at the end of the year should either be carried over or paid out, depending on your contract terms.',
  },
  {
    question: 'What are my rights if my employer is treating me unfairly?',
    answer:
      'Apprentices have the same employment rights as any other employee. You are protected against discrimination on the grounds of age, race, sex, disability, religion, sexual orientation, and other protected characteristics under the Equality Act 2010. You have the right to a safe working environment under the Health and Safety at Work etc. Act 1974. You have the right to be paid at least the National Minimum Wage. You have the right to statutory holiday and sick pay. If your employer is treating you unfairly, document specific instances with dates and details. Speak to your training provider first — they can often resolve issues informally with the employer. If that does not work, contact ACAS (the Advisory, Conciliation and Arbitration Service) for free advice, or Citizens Advice for guidance on your specific situation.',
  },
  {
    question: 'Am I entitled to sick pay as an apprentice?',
    answer:
      'Yes. You are entitled to Statutory Sick Pay (SSP) on the same basis as any other employee. To qualify, you must earn at least the lower earnings limit (currently £123 per week), have been ill for at least 4 consecutive days (including non-working days), and have notified your employer as required. SSP is currently £116.75 per week and is paid for up to 28 weeks. Some employers offer enhanced sick pay above the statutory minimum — check your employment contract. If you are off sick for an extended period, your training provider should work with you and your employer to adjust your training plan. Your apprenticeship can be extended to account for significant periods of absence.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/what-to-expect-electrical-apprentice',
    title: 'What to Expect as an Apprentice',
    description: 'The honest reality of day-to-day life as an electrical apprentice.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/year-1-electrical-apprentice',
    title: 'Year 1 Apprentice Guide',
    description: 'What to expect in your first year on site as an electrical apprentice.',
    icon: Calendar,
    category: 'Guide',
  },
  {
    href: '/guides/off-job-training-hours',
    title: 'Off-the-Job Training Hours',
    description: 'The 20% requirement — what counts and how to track your hours.',
    icon: Clock,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-electrician-salary',
    title: 'Apprentice Electrician Salary',
    description: 'Pay rates, JIB grades, and how pay increases through your apprenticeship.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/epa-what-to-expect',
    title: 'EPA What to Expect',
    description: 'End Point Assessment components, grading, and preparation.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description: 'Complete guide to starting and completing an electrical apprenticeship.',
    icon: GraduationCap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'apprentice-pay-rates',
    heading: 'Apprentice Pay Rates in 2026',
    content: (
      <>
        <p>
          Understanding your pay entitlements is one of the most important things you can do as an
          apprentice. Many apprentices are paid more than the legal minimum, but knowing the floor
          ensures you can recognise if you are being underpaid.
        </p>
        <p>
          The National Minimum Wage (NMW) for apprentices is set by the government and typically
          changes every April. The current rates (from April 2025) are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Apprentice rate: £7.55/hour</strong> — applies if you are under 19, or if
                you are 19 or over and in the first year of your apprenticeship
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Age 18-20: £10.00/hour</strong> — applies after you turn 19 and have
                completed the first year of your apprenticeship
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Age 21+: £12.21/hour</strong> — the National Living Wage, applies after you
                turn 21 and have completed the first year of your apprenticeship
              </span>
            </li>
          </ul>
        </div>
        <p>
          <strong>JIB pay rates:</strong> If your employer is a JIB (Joint Industry Board) member,
          apprentice pay rates are typically higher than the NMW. JIB grading provides structured
          pay increases at each stage of the apprenticeship, with rates reviewed annually. Check
          with your employer whether they follow JIB pay scales — most reputable electrical
          contractors do. For more detail on pay progression, see our{' '}
          <SEOInternalLink href="/guides/apprentice-electrician-salary">
            apprentice salary guide
          </SEOInternalLink>
          .
        </p>
        <p>
          <strong>2026 rates:</strong> The 2026 NMW rates will be announced in the Autumn Budget
          2025 and typically take effect from April 2026. The Low Pay Commission recommends rates to
          the government each year. Historically, the apprentice rate has increased by 10-20% per
          year in recent years.
        </p>
      </>
    ),
  },
  {
    id: 'nmw-explained',
    heading: 'National Minimum Wage: Know the Rules',
    content: (
      <>
        <p>
          The National Minimum Wage applies to all apprentices. There are specific rules you should
          understand:
        </p>
        <div className="space-y-3 my-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">College Days Are Paid</h3>
              <p className="text-white text-sm leading-relaxed">
                All time spent at college or with your training provider is paid working time. Your
                employer must pay you at your normal hourly rate for college days. If your contract
                states 37.5 hours per week and you spend one day at college, all 37.5 hours are paid
                — including the college day.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Study Time Is Paid</h3>
              <p className="text-white text-sm leading-relaxed">
                If your employer directs you to study during working hours (which they should, to
                meet the{' '}
                <SEOInternalLink href="/guides/off-job-training-hours">
                  20% off-the-job training
                </SEOInternalLink>{' '}
                requirement), that study time is paid. Your employer cannot deduct pay for
                off-the-job training activities that happen during your contracted hours.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">The First-Year Rule</h3>
              <p className="text-white text-sm leading-relaxed">
                The apprentice NMW rate applies for the entire first year of your apprenticeship,
                regardless of your age. Once you have completed one full year and are aged 19 or
                over, you automatically move to the higher NMW rate for your age group. If your
                employer does not increase your pay at this point, they are breaking the law.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">If You Are Being Underpaid</h3>
              <p className="text-white text-sm leading-relaxed">
                If your employer is paying you below the NMW, this is illegal. Contact HMRC's
                National Minimum Wage helpline (0800 917 2368) or use the online complaint form.
                HMRC can investigate and enforce back-payments. You can also contact ACAS or
                Citizens Advice for guidance. Your training provider can also intervene on your
                behalf.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'holiday-entitlement',
    heading: 'Holiday Entitlement',
    content: (
      <>
        <p>
          As an apprentice, you have the same holiday entitlement as any other employee. The
          statutory minimum for full-time workers is 5.6 weeks per year, which equals 28 days
          (including bank holidays) if you work a 5-day week.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>20 days annual leave + 8 bank holidays</strong> = 28 days total for
                full-time workers on a 5-day week
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pro-rata for part-time:</strong> If you work fewer than 5 days per week,
                your holiday entitlement is calculated proportionally
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Holiday pay at normal rate:</strong> Holiday pay must be at your normal
                hourly rate. Overtime-only payments may also need to be included if overtime is
                regular and guaranteed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accrual from day one:</strong> You start accruing holiday from your first
                day of employment. You do not need to wait for a probation period to end.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Many construction employers align holiday dates with the industry shutdown periods
          (typically two weeks around Christmas and one week in summer). Check your employment
          contract for details. Your employer can require you to take holiday at specific times, but
          they must give you adequate notice — at least twice the length of the holiday being
          imposed.
        </p>
      </>
    ),
  },
  {
    id: 'sick-pay',
    heading: 'Sick Pay',
    content: (
      <>
        <p>
          You are entitled to Statutory Sick Pay (SSP) on the same basis as any other employee. Here
          is how it works:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SSP rate:</strong> Currently £116.75 per week (2025/26 rate), paid from the
                fourth consecutive day of illness
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifying earnings:</strong> You must earn at least £123 per week (before
                tax) to qualify for SSP
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duration:</strong> SSP is paid for up to 28 weeks. After that, you may be
                eligible for Employment and Support Allowance (ESA)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notification:</strong> You must notify your employer of your absence as
                required by their sickness policy — typically on the first day of absence
              </span>
            </li>
          </ul>
        </div>
        <p>
          Some employers offer enhanced sick pay above the statutory minimum — check your employment
          contract. If you are off sick for an extended period, your training provider should work
          with you and your employer to adjust your training plan. Your apprenticeship can be
          extended to account for significant periods of absence, so you do not lose the progress
          you have already made.
        </p>
      </>
    ),
  },
  {
    id: 'working-hours',
    heading: 'Working Hours and Breaks',
    content: (
      <>
        <p>
          Your working hours are governed by the Working Time Regulations 1998. As an apprentice,
          you have the following rights:
        </p>
        <div className="space-y-3 my-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Clock className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Maximum Working Hours</h3>
              <p className="text-white text-sm leading-relaxed">
                You cannot be required to work more than 48 hours per week on average (calculated
                over a 17-week period). You can voluntarily opt out of this limit, but your employer
                cannot force you to. For apprentices under 18, the maximum is 40 hours per week with
                no opt-out.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Clock className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Rest Breaks</h3>
              <p className="text-white text-sm leading-relaxed">
                You are entitled to an uninterrupted break of at least 20 minutes if your working
                day is longer than 6 hours. For apprentices under 18, the break must be at least 30
                minutes if the working day is longer than 4.5 hours. This break is usually unpaid
                unless your contract states otherwise.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Clock className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Daily and Weekly Rest</h3>
              <p className="text-white text-sm leading-relaxed">
                You are entitled to at least 11 consecutive hours of rest between working days and
                at least one full day off per week (or two full days off per fortnight). For workers
                under 18, the daily rest is 12 hours and the weekly rest is 2 consecutive days.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Clock className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Night Work</h3>
              <p className="text-white text-sm leading-relaxed">
                Apprentices under 18 cannot work between 10pm and 6am (with some exceptions). Adult
                apprentices can work nights, but there are limits on the average hours and a
                requirement for free health assessments if night work is regular.
              </p>
            </div>
          </div>
        </div>
        <p>
          Early starts are common on construction sites — 7am or 7:30am is typical. Make sure your
          contract reflects your actual working hours and that your breaks are included. If you are
          regularly asked to work beyond your contracted hours without additional pay, raise it with
          your employer and training provider.
        </p>
      </>
    ),
  },
  {
    id: 'redundancy-rights',
    heading: 'Redundancy Rights',
    content: (
      <>
        <p>
          The construction industry is cyclical, and some apprentices do face redundancy during
          their training. It is important to understand your rights if this happens:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notice period:</strong> You are entitled to at least one week's notice if
                you have been employed for at least one month. After two years, the notice period
                increases by one week for each additional year of service, up to a maximum of 12
                weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Statutory redundancy pay:</strong> If you have been employed for two years
                or more, you are entitled to statutory redundancy pay based on your age, length of
                service, and weekly pay.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ESFA Redundancy Support:</strong> The ESFA runs a Redundancy Support Service
                for Apprentices, which helps you find a new employer to continue your
                apprenticeship. Your training provider also has a responsibility to support you.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Your progress carries over:</strong> If you are made redundant and find a
                new employer, you do not restart your apprenticeship from the beginning. Your
                existing learning, qualifications, OJT hours, and portfolio evidence all carry over
                to the new employer.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Being made redundant is not a reflection of your ability. It happens in the construction
          industry due to project completions, contract losses, and economic downturns. The
          important thing is to find a new placement quickly and continue your training. Your
          training provider should be your first point of contact.
        </p>
      </>
    ),
  },
  {
    id: 'discrimination-protection',
    heading: 'Discrimination Protection',
    content: (
      <>
        <p>
          Apprentices are fully protected under the Equality Act 2010. This means you cannot be
          treated less favourably because of any protected characteristic:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Age, disability, gender reassignment, marriage and civil partnership, pregnancy and
                maternity, race, religion or belief, sex, and sexual orientation
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, this means your employer cannot refuse to hire you, pay you less, deny you
          training opportunities, subject you to harassment, or dismiss you because of any protected
          characteristic. The construction industry has historically had a poor reputation for
          diversity, but the legal protections are clear and enforceable.
        </p>
        <p>
          <strong>Bullying and harassment:</strong> Being an apprentice can sometimes mean being the
          target of "banter" or hazing behaviour on site. There is a line between friendly workplace
          culture and bullying or harassment. If the behaviour makes you feel uncomfortable,
          distressed, or unsafe, it has crossed the line. Document specific incidents, report them
          to your supervisor or employer, and inform your training provider. If the behaviour
          relates to a protected characteristic, it may constitute unlawful harassment under the
          Equality Act.
        </p>
        <p>
          <strong>Where to get help:</strong> Your training provider, ACAS (0300 123 1100), Citizens
          Advice, and the Equality Advisory Support Service (0808 800 0082) can all provide guidance
          and support. You should not have to tolerate discriminatory treatment or bullying in the
          workplace.
        </p>
        <SEOAppBridge
          title="Focus on Learning, Not Worrying"
          description="Elec-Mate's apprentice hub gives you the study tools, portfolio builder, and OJT tracker you need to make the most of your apprenticeship. 46+ courses, flashcards, mock exams, AI tutor, and more. 7-day free trial."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'know-your-contract',
    heading: 'Know Your Contract',
    content: (
      <>
        <p>
          Every apprentice should have an employment contract and an apprenticeship agreement. These
          are separate documents:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Employment Contract</h3>
            <p className="text-white text-sm leading-relaxed">
              Your employment contract covers your terms and conditions of employment: job title,
              hours of work, pay rate, holiday entitlement, notice period, sickness policy, and
              grievance/disciplinary procedures. You must receive a written statement of employment
              particulars on or before your first day of work.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Apprenticeship Agreement</h3>
            <p className="text-white text-sm leading-relaxed">
              The apprenticeship agreement is a separate document signed by you, your employer, and
              your training provider. It sets out the details of the apprenticeship: the standard
              being followed (ST0215 for electrical), the training plan, the duration, the
              off-the-job training commitment, and the assessment arrangements. This agreement is
              the basis for the apprenticeship funding.
            </p>
          </div>
        </div>
        <p>
          Read both documents carefully. If anything is unclear, ask your employer or training
          provider to explain it. Keep copies of both documents in a safe place. If a dispute arises
          about your pay, hours, training, or other terms, these documents are the reference point.
        </p>
        <SEOAppBridge
          title="Track Everything in One Place"
          description="Elec-Mate's portfolio builder, OJT tracker, and site diary keep all your apprenticeship evidence organised and accessible. If you ever need to demonstrate what training you have received, the records are there."
          icon={Briefcase}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ApprenticeRightsPayPage() {
  return (
    <GuideTemplate
      title="Apprentice Rights & Pay UK 2026 | Know Your Entitlements"
      description="Complete guide to apprentice rights and pay in the UK. National Minimum Wage rates, holiday entitlement, sick pay, working hours, redundancy rights, discrimination protection, and where to get help if your rights are violated."
      datePublished="2025-12-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Apprentice Rights and Pay: <span className="text-yellow-400">Know Your Entitlements</span>
        </>
      }
      heroSubtitle="Every apprentice in the UK has clear legal rights — pay, holiday, sick leave, working hours, and protection against discrimination. This guide explains your entitlements so you know exactly what you are owed and where to get help if your employer falls short."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Apprentice Rights and Pay"
      relatedPages={relatedPages}
      ctaHeading="Focus on Your Apprenticeship, Not Your Worries"
      ctaSubheading="Join 430+ UK apprentices using Elec-Mate's apprentice hub. 46+ courses, flashcards, mock exams, AI tutor, portfolio builder, and OJT tracker. 7-day free trial, cancel anytime."
    />
  );
}
