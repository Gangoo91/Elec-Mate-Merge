import { useState } from 'react';
import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  ClipboardCheck,
  GraduationCap,
  BookOpen,
  Clock,
  Target,
  Award,
  Calendar,
  FolderOpen,
  BarChart3,
  Brain,
  CheckCircle,
  AlertTriangle,
  Calculator,
} from 'lucide-react';

const OTJ_STANDARD_OPTIONS = [
  { code: 'ST0152', name: 'Installation & Maintenance Electrician (L3)', hours: 1066 },
  { code: 'ST1017', name: 'Domestic Electrician (L3)', hours: 626 },
  { code: 'ST0150', name: 'Electrical/Electronic Product Service & Installation Engineer (L3)', hours: 787 },
  { code: 'ST0475', name: 'Electrical Power Networks Engineer (L4)', hours: 744 },
  { code: 'ST0157', name: 'Electrical Power Protection & Plant Commissioning Engineer (L4)', hours: 1114 },
];

function OTJHoursCalculator() {
  const [standardCode, setStandardCode] = useState('ST0152');
  const [durationMonths, setDurationMonths] = useState(48);
  const [holidayWeeks, setHolidayWeeks] = useState(5.6);

  const standard = OTJ_STANDARD_OPTIONS.find((s) => s.code === standardCode) ?? OTJ_STANDARD_OPTIONS[0];
  const totalOTJHours = standard.hours;
  const workingWeeks = Math.max(1, Math.round((durationMonths / 12) * (52 - holidayWeeks)));
  const suggestedWeekly = totalOTJHours / workingWeeks;

  return (
    <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-5 sm:p-7">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-yellow-500/15 flex items-center justify-center shrink-0">
          <Calculator className="w-5 h-5 text-yellow-400" />
        </div>
        <div>
          <h3 className="font-bold text-white text-base leading-tight">OTJ Hours Calculator</h3>
          <p className="text-white/60 text-xs mt-0.5">Fixed-hours rule — for starts from 1 Aug 2025</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="sm:col-span-3">
          <label className="block text-xs font-medium text-white/70 mb-1.5">
            Apprenticeship standard
          </label>
          <select
            value={standardCode}
            onChange={(e) => setStandardCode(e.target.value)}
            className="w-full h-11 rounded-lg bg-white/[0.07] border border-white/20 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 px-3 text-white text-base touch-manipulation"
          >
            {OTJ_STANDARD_OPTIONS.map((s) => (
              <option key={s.code} value={s.code} className="bg-neutral-900">
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1.5">
            Programme length (months)
          </label>
          <input
            type="number"
            min={12}
            max={72}
            step={1}
            value={durationMonths}
            onChange={(e) => setDurationMonths(Number(e.target.value))}
            className="w-full h-11 rounded-lg bg-white/[0.07] border border-white/20 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 px-3 text-white text-base touch-manipulation"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1.5">
            Holiday weeks / year
          </label>
          <input
            type="number"
            min={0}
            max={12}
            step={0.2}
            value={holidayWeeks}
            onChange={(e) => setHolidayWeeks(Number(e.target.value))}
            className="w-full h-11 rounded-lg bg-white/[0.07] border border-white/20 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 px-3 text-white text-base touch-manipulation"
          />
        </div>
        <div className="flex items-end">
          <p className="text-[11px] text-white/40 leading-relaxed">
            Code {standard.code} · DfE Annex C
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/[0.06] border border-white/10 p-4 text-center">
          <p className="text-xs text-white/60 mb-1">Total OTJ requirement</p>
          <p className="text-3xl font-bold text-yellow-400">{totalOTJHours.toLocaleString()}</p>
          <p className="text-xs text-white/50 mt-0.5">hours for the whole apprenticeship</p>
        </div>
        <div className="rounded-xl bg-white/[0.06] border border-white/10 p-4 text-center">
          <p className="text-xs text-white/60 mb-1">Suggested weekly pace</p>
          <p className="text-3xl font-bold text-yellow-400">{suggestedWeekly.toFixed(1)}</p>
          <p className="text-xs text-white/50 mt-0.5">hours / week ({workingWeeks} working weeks)</p>
        </div>
      </div>
      <p className="mt-4 text-[11px] text-white/40 leading-relaxed">
        The total is a fixed figure set by the DfE for your apprenticeship standard — it is a target
        to complete, not a perpetual weekly quota. The weekly figure is just a suggested pace (total
        ÷ working weeks); you can front-load hours. If your apprenticeship started before 1 August
        2025 the older 20% / six-hours-per-week rule still applies for the whole programme.
      </p>
    </div>
  );
}

const howToSteps = [
  {
    name: 'Confirm your start date',
    text: 'Off-the-job rules follow your apprenticeship start date for the whole programme. If you started on or after 1 August 2025 the fixed-hours rule applies. If you started before that date, the older 20% (about six hours per paid working week) rule applies throughout.',
  },
  {
    name: 'Identify your apprenticeship standard',
    text: 'Your college or training provider assigns you to a standard. Most electrical apprentices are on the Installation & Maintenance Electrician standard (ST0152). Each standard carries its own fixed off-the-job total set by the DfE in Annex C of the funding rules.',
  },
  {
    name: 'Read off your total off-the-job hours',
    text: 'For starts from August 2025 the Installation & Maintenance Electrician standard (ST0152) requires 1,066 off-the-job training hours across the whole apprenticeship. Domestic Electrician (ST1017) requires 626 hours. This is a total to complete, not a weekly percentage.',
  },
  {
    name: 'Set a comfortable weekly pace',
    text: 'Divide the total by the number of working weeks in your programme to get a suggested weekly pace. The hours can be front-loaded; once you have banked the full total your provider may stop recording further hours while the apprenticeship runs on to gateway and End Point Assessment.',
  },
];

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Off-the-Job Training Hours', href: '/guides/off-the-job-training-hours' },
];

const tocItems = [
  { id: 'what-is-otj', label: 'What Is Off-the-Job Training?' },
  { id: 'rules-changed', label: 'The 2025 Rule Change' },
  { id: 'hours-by-standard', label: 'Hours by Apprenticeship Standard' },
  { id: 'twenty-percent-rule', label: 'The Old 20% Rule (Pre-Aug 2025)' },
  { id: 'what-counts', label: 'What Counts as Off-the-Job Training' },
  { id: 'what-doesnt-count', label: 'What Does Not Count' },
  { id: 'calculating-hours', label: 'How to Calculate Your Hours' },
  { id: 'recording-evidence', label: 'Recording and Evidencing Hours' },
  { id: 'ofsted-inspections', label: 'Ofsted and OTJ Records' },
  { id: 'employer-responsibilities', label: 'Employer Responsibilities' },
  { id: 'elecmate-otj-tracker', label: 'Tracking Hours with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The off-the-job rules changed on 1 August 2025. The rule that applies to you is fixed by your apprenticeship start date for the whole programme: starts from August 2025 follow a fixed total of hours set per standard; starts before that date keep the older 20% (about six hours per paid working week) rule.',
  'Under the current rules each apprenticeship standard carries its own fixed off-the-job total. The Installation & Maintenance Electrician standard (ST0152) requires 1,066 off-the-job training hours across the whole apprenticeship. It is a target to complete, not a perpetual weekly quota — hours can be front-loaded.',
  'Off-the-job training means learning new knowledge, skills and behaviours related to your apprenticeship — not just college. Activities that count include college days, online learning, shadowing experienced electricians, mentoring, manufacturer training, industry visits, directed study and supervised practice of new skills.',
  'Activities that do not count include performing normal work duties you already know how to do, English and maths functional skills study, and any training not directly relevant to the apprenticeship standard.',
  'Elec-Mate OJT Tracker automatically logs your off-the-job hours against your standard’s fixed total. It categorises activities, tracks your completion percentage in real time, collects evidence, and generates Ofsted-ready records effortlessly.',
];

const faqs = [
  {
    question: 'Does off-the-job training have to happen at college?',
    answer:
      'No. Off-the-job training is not limited to college attendance. While your weekly college day is the most obvious form of off-the-job training, many other activities qualify. Directed study at home or on the employer premises, online learning through platforms like Elec-Mate, shadowing experienced electricians on new types of work, manufacturer training events, industry visits, toolbox talks that teach new knowledge, and supervised practice of skills you have not yet mastered all count as off-the-job training. The critical test is whether the activity is teaching you new knowledge, skills, or behaviours directly relevant to the apprenticeship standard. Normal productive work — tasks you already know how to do and are doing as part of your regular job duties — does not count, even if it relates to electrical installation.',
  },
  {
    question: 'What happens if I do not meet the off-the-job training requirement?',
    answer:
      'Failing to meet the off-the-job training requirement can have serious consequences. Off-the-job training is a condition of the apprenticeship funding. If you do not complete the required hours, your training provider may be unable to confirm that you have met the apprenticeship requirements at the gateway stage, which means you cannot progress to the End Point Assessment. In extreme cases, funding can be clawed back from the training provider, which creates a strong incentive for providers to monitor and enforce the requirement. Ofsted also checks off-the-job training records during provider inspections. If your provider is rated poorly partly due to insufficient off-the-job training across their apprentices, it reflects badly on the quality of your apprenticeship. The simplest approach is to track your hours consistently throughout the apprenticeship so you always know where you stand.',
  },
  {
    question: 'How do I record off-the-job training hours?',
    answer:
      'Off-the-job training hours must be recorded with sufficient detail to demonstrate what activity was carried out, when, for how long, and how it relates to the apprenticeship standard. Traditional methods include paper logs or spreadsheets where you manually enter each activity with dates, times, descriptions, and links to the standard criteria. However, manual tracking is tedious and error-prone. Elec-Mate OJT Tracker automates this process: every study session on the platform is automatically logged, and you can add manual entries for off-platform activities (college days, site-based training, manufacturer events) with a few taps. Each entry is categorised by activity type and mapped to the apprenticeship standard. The tracker calculates your total hours, percentage towards your standard’s fixed total, and weekly average, giving you a real-time view of your progress.',
  },
  {
    question: 'Does studying on Elec-Mate count as off-the-job training?',
    answer:
      'Yes, studying on Elec-Mate counts as off-the-job training provided it meets the official definition: it must be teaching you new knowledge, skills, or behaviours directly relevant to the apprenticeship standard, and it must happen during your paid working hours (or be recognised by your employer as contributing to your paid hours). Completing course modules, taking practice quizzes, using flashcards for new topics, practising mock exams, using the EPA Simulator, and studying BS 7671 content through the platform all qualify. Elec-Mate automatically logs the time you spend on these activities, so your off-the-job hours are tracked without any manual effort. If your employer agrees that evening or weekend study contributes to your apprenticeship, that time can also be counted — but this must be agreed with your employer in advance.',
  },
  {
    question: 'Is the off-the-job requirement based on total hours or weekly hours?',
    answer:
      'For apprenticeships starting from 1 August 2025 the requirement is a fixed total number of hours for the whole programme — for example 1,066 hours on the Installation & Maintenance Electrician standard (ST0152) — not a strict weekly percentage. Because it is a total, you can have some weeks with more off-the-job training (for example, a block-release college week) and some with less (for example, during a busy project), as long as you reach the fixed total by gateway. Once the total is banked your provider may stop recording further hours. Funding rules still expect off-the-job training to be spread reasonably across the programme rather than crammed in at the end, and the practical period must run for at least eight months. Your provider monitors progress at regular reviews. Elec-Mate OJT Tracker shows your running total, weekly average and projected completion, so you always know whether you are on track.',
  },
  {
    question: 'Can my employer refuse to give me off-the-job training time?',
    answer:
      'No. Providing off-the-job training time is a contractual obligation your employer agreed to when they signed the apprenticeship agreement. Employers must release apprentices for the required off-the-job training as a condition of the apprenticeship funding, and this training must take place within paid working hours. If your employer is consistently not providing this time — for example, by not releasing you for college, by requiring you to work through study periods, or by expecting you to do all training in your own unpaid time — they are in breach of the apprenticeship agreement. Raise the issue first with your training provider, who has a responsibility to ensure the employer meets their obligations. If the training provider cannot resolve it, you can contact the ESFA apprenticeship helpline. Document every instance where off-the-job training time was denied — this evidence will support your case.',
  },
  {
    question: 'What is the difference between on-the-job and off-the-job training?',
    answer:
      'On-the-job training is learning that happens through doing your normal job — carrying out installations, testing circuits, fixing faults, and working alongside experienced electricians on tasks you are already somewhat familiar with. It is valuable and essential for developing practical competence, but it does not count towards the off-the-job requirement. Off-the-job training is learning new knowledge, skills, or behaviours that you have not yet acquired. The key distinction is the word "new." If you are practising a skill you have already learned (for example, wiring a socket outlet for the hundredth time), that is on-the-job training. If you are learning a skill for the first time (for example, being shown how to wire a two-way switching circuit by your supervisor), that is off-the-job training, even though it is happening on site. College attendance, online courses, directed study, and manufacturer training are clearly off-the-job. Activities on the employer premises can also qualify if they are teaching you something new.',
  },
];

const relatedPages = [
  {
    href: '/guides/epa-what-to-expect',
    title: 'EPA What to Expect',
    description: 'End Point Assessment explained — components, grading, and preparation.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/training/apprentice-portfolio',
    title: 'Apprentice Portfolio Guide',
    description: 'Digital evidence tracking and AI-powered criteria mapping for your portfolio.',
    icon: FolderOpen,
    category: 'Guide',
  },
  {
    href: '/guides/site-diary-for-apprentices',
    title: 'Site Diary for Apprentices',
    description: 'How to keep a daily log that supports your OTJ evidence and portfolio.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/year-1-apprentice-guide',
    title: 'Year 1 Apprentice Guide',
    description: 'What to expect in your first year as an electrical apprentice.',
    icon: Calendar,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description: 'Complete guide to starting and completing an electrical apprenticeship.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-electrician-salary',
    title: 'Apprentice Electrician Salary',
    description: 'Pay rates, JIB grades, and how pay increases through your apprenticeship.',
    icon: Target,
    category: 'Guide',
  },
];

const sections = [
  {
    id: 'what-is-otj',
    heading: 'What Is Off-the-Job Training?',
    content: (
      <>
        <p>
          Off-the-job training (OTJ or OJT) is learning that happens away from your normal
          day-to-day work duties. It is a mandatory component of every apprenticeship in England and
          a condition of the apprenticeship funding your employer receives.
        </p>
        <p>
          The purpose of off-the-job training is to ensure that apprentices receive dedicated
          learning time — time specifically set aside for acquiring new knowledge, skills, and
          behaviours relevant to the apprenticeship standard. Without this requirement, there would
          be a risk that apprentices simply work as cheap labour without receiving the structured
          training that distinguishes an apprenticeship from ordinary employment.
        </p>
        <p>
          For electrical apprentices on the Installation & Maintenance Electrician
          standard (ST0152), off-the-job training encompasses everything from formal college
          attendance to online study, manufacturer training, supervised practice of new skills, and
          directed research. It is broader than most apprentices realise — and understanding what
          counts (and what does not) is essential for meeting the requirement without stress.
        </p>
        <p>
          Meeting the off-the-job training requirement is also a gateway condition for the{' '}
          <SEOInternalLink href="/guides/epa-what-to-expect">End Point Assessment</SEOInternalLink>.
          If you cannot demonstrate that you have completed sufficient off-the-job training hours,
          you cannot progress to the EPA and complete your apprenticeship.
        </p>
      </>
    ),
  },
  {
    id: 'rules-changed',
    heading: 'The 2025 Rule Change',
    content: (
      <>
        <p>
          On <strong>1 August 2025</strong> the way off-the-job training is measured changed. The
          long-standing "20% of paid hours" model was replaced with a <strong>fixed total number of
          hours set for each apprenticeship standard</strong> by the Department for Education (DfE).
          Which rule applies to you is determined by your apprenticeship start date — and it stays
          fixed for the whole programme.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 my-6">
          <div className="rounded-2xl bg-blue-900/30 border border-blue-700/40 p-5">
            <p className="text-xs font-semibold text-blue-300 uppercase tracking-wide mb-2">
              Started before 1 Aug 2025
            </p>
            <h3 className="font-bold text-white text-base mb-1.5">The old 20% rule still applies</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Off-the-job training is at least 20% of your paid working hours — roughly six hours per
              week on a typical contract — for the whole apprenticeship. Your provider continues to
              track it this way until you reach gateway.
            </p>
          </div>
          <div className="rounded-2xl bg-green-900/25 border border-green-700/40 p-5">
            <p className="text-xs font-semibold text-green-300 uppercase tracking-wide mb-2">
              Starts from 1 Aug 2025
            </p>
            <h3 className="font-bold text-white text-base mb-1.5">A fixed total per standard</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Each standard carries its own fixed off-the-job total (DfE Annex C). For the
              Installation &amp; Maintenance Electrician standard (ST0152) that total is 1,066 hours
              across the apprenticeship. It is a target to complete, not a weekly quota.
            </p>
          </div>
        </div>
        <p>
          A few details matter under the current rules. The practical training period must run for a
          minimum of <strong>eight months</strong>, and there is an absolute floor of{' '}
          <strong>187 hours</strong> below which off-the-job training can never be evidenced for any
          standard. Standards that started during August to December 2025 used lower transitional
          figures; from <strong>1 January 2026</strong> the full Annex C total is mandatory for new
          starts. Because the total is fixed, apprentices can front-load their hours — once the full
          total is banked, the provider may stop recording further off-the-job time while the
          apprenticeship continues to gateway and the{' '}
          <SEOInternalLink href="/guides/epa-what-to-expect">End Point Assessment</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'hours-by-standard',
    heading: 'Off-the-Job Hours by Apprenticeship Standard',
    content: (
      <>
        <p>
          For apprenticeships starting from 1 August 2025, the DfE sets a fixed minimum number of
          off-the-job training hours for each standard in Annex C of the apprenticeship funding
          rules. Below are the figures for the main electrical standards. Your college or training
          provider assigns you to a standard — if you are unsure which one applies, ask them.
        </p>
        <div className="my-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold text-white">Apprenticeship Standard</th>
                <th className="px-4 py-3 font-semibold text-white whitespace-nowrap">Code</th>
                <th className="px-4 py-3 font-semibold text-white whitespace-nowrap">Level</th>
                <th className="px-4 py-3 font-semibold text-white whitespace-nowrap text-right">
                  OTJ hours
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr className="bg-yellow-500/[0.06]">
                <td className="px-4 py-3 text-white font-medium">
                  Installation &amp; Maintenance Electrician
                </td>
                <td className="px-4 py-3 text-white/70">ST0152</td>
                <td className="px-4 py-3 text-white/70">3</td>
                <td className="px-4 py-3 text-yellow-400 font-bold text-right">1,066</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white">Domestic Electrician</td>
                <td className="px-4 py-3 text-white/70">ST1017</td>
                <td className="px-4 py-3 text-white/70">3</td>
                <td className="px-4 py-3 text-white font-semibold text-right">626</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white">
                  Electrical/Electronic Product Service &amp; Installation Engineer
                </td>
                <td className="px-4 py-3 text-white/70">ST0150</td>
                <td className="px-4 py-3 text-white/70">3</td>
                <td className="px-4 py-3 text-white font-semibold text-right">787</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white">Electrical Power Networks Engineer</td>
                <td className="px-4 py-3 text-white/70">ST0475</td>
                <td className="px-4 py-3 text-white/70">4</td>
                <td className="px-4 py-3 text-white font-semibold text-right">744</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white">
                  Electrical Power Protection &amp; Plant Commissioning Engineer
                </td>
                <td className="px-4 py-3 text-white/70">ST0157</td>
                <td className="px-4 py-3 text-white/70">4</td>
                <td className="px-4 py-3 text-white font-semibold text-right">1,114</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-white/60 text-sm">
          Source: DfE Apprenticeship funding rules 2025/2026, Annex C. Figures are the minimum
          off-the-job hours for the whole apprenticeship. If you are a college-linked apprentice,
          your provider holds the authoritative required-hours figure for your programme.
        </p>
      </>
    ),
  },
  {
    id: 'twenty-percent-rule',
    heading: 'The Old 20% Rule (Pre-August 2025 Starts)',
    content: (
      <>
        <p>
          If your apprenticeship started <strong>before 1 August 2025</strong>, the older 20% rule
          applies to you for the whole programme — so this section still matters for many current
          apprentices. Under it, at least 20% of an apprentice's paid working hours are spent on
          off-the-job training, calculated over the total duration of the apprenticeship rather than
          on a strict week-by-week basis.
        </p>
        <p>
          <strong>What 20% means in practice:</strong> If you work a standard 37.5-hour week, 20%
          equals 7.5 hours per week. If your contract is 30 hours per week, 20% equals 6 hours per
          week. Over a 4-year apprenticeship on a 37.5-hour week (approximately 48 working weeks per
          year, accounting for holidays), this works out at roughly 1,440 hours across the
          programme.
        </p>
        <p>
          <strong>Flexibility:</strong> The 20% is an average over the entire apprenticeship. Some
          weeks you may do more (for example, during block-release college weeks), and some weeks
          less (for example, during intensive project periods at work). As long as the overall total
          reaches 20% by the time you approach the gateway, you are compliant — but the expectation
          is that off-the-job training is spread reasonably throughout the programme rather than left
          to the final few months.
        </p>
        <p>
          <strong>Who tracks it:</strong> Both you and your training provider are responsible for
          tracking off-the-job training hours. Your provider will review your hours at regular
          progress review meetings (typically every 6 to 12 weeks) and flag any shortfall. You are
          responsible for recording activities that happen outside of formal college sessions —
          online study, shadowing, manufacturer training, and directed reading.
        </p>
      </>
    ),
  },
  {
    id: 'what-counts',
    heading: 'What Counts as Off-the-Job Training',
    content: (
      <>
        <p>
          The official definition of off-the-job training is: learning which is undertaken outside
          of the normal day-to-day working environment and leads towards the achievement of an
          apprenticeship. It can be delivered at the apprentice's normal place of work (the employer
          premises) provided it is clearly distinct from normal work duties.
        </p>
        <p>The following activities count as off-the-job training for electrical apprentices:</p>
        <div className="space-y-3 my-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">
                College or Training Provider Days
              </h3>
              <p className="text-white text-sm leading-relaxed">
                All time spent at college or with your training provider — lectures, workshops,
                practical sessions, tutorials, and assessments. This is the most straightforward
                form of OTJ training and typically accounts for one day per week.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Online Learning and Study</h3>
              <p className="text-white text-sm leading-relaxed">
                Studying courses, completing quizzes, using flashcards, and practising mock exams on
                platforms like Elec-Mate. Self-directed study of BS 7671, textbooks, and technical
                resources also counts. The key is that it must be learning new knowledge or skills.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Shadowing and Mentoring</h3>
              <p className="text-white text-sm leading-relaxed">
                Observing or being taught by experienced electricians on types of work you have not
                done before. Being mentored on new skills, techniques, or approaches. This counts
                even when it happens on the employer's premises — the test is whether you are
                learning something new rather than doing your usual work.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">
                Manufacturer Training and Industry Visits
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Attending manufacturer training days (for example, learning about a new consumer
                unit range, EV charger installation, or smart home system). Visiting trade shows,
                exhibitions, and industry events. These activities develop knowledge directly
                relevant to your role.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">
                Practice and Skills Development
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Practising new skills in a supervised environment — for example, practising safe
                isolation, testing techniques, or two-way switching wiring at the workshop. Using
                the Elec-Mate AM2 Simulator or EPA Simulator to practise assessment-related skills.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'what-doesnt-count',
    heading: 'What Does Not Count as Off-the-Job Training',
    content: (
      <>
        <p>
          Understanding what does not count is equally important. The following activities are
          excluded from the off-the-job training calculation:
        </p>
        <div className="space-y-3 my-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Normal Work Duties</h3>
              <p className="text-white text-sm leading-relaxed">
                Carrying out installation, testing, or maintenance work that you already know how to
                do as part of your regular job duties. Even if this work is directly relevant to the
                apprenticeship standard, it is on-the-job training, not off-the-job. The distinction
                is whether you are learning something new or practising something you already know.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">English and Maths Study</h3>
              <p className="text-white text-sm leading-relaxed">
                Time spent studying for Level 2 Functional Skills in English and maths does not
                count towards the off-the-job training requirement. These are separate
                requirements under the apprenticeship funding rules and are tracked independently.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">
                Training Not Relevant to the Standard
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Training that is not directly relevant to the apprenticeship standard — for example,
                general company induction, non-technical training, or training for activities
                outside the scope of the ST0152 standard — does not count.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Progress Reviews</h3>
              <p className="text-white text-sm leading-relaxed">
                Regular progress review meetings with your training provider or employer — while
                valuable — are typically not counted as off-the-job training unless they include
                structured learning content.
              </p>
            </div>
          </div>
        </div>
        <p>
          The grey area between "learning something new" and "doing your normal work" can sometimes
          be confusing. A good rule of thumb: if you could not do this task before your
          apprenticeship started (or before this training session), and it is relevant to the
          apprenticeship standard, then it counts. If you are repeating a task you already know how
          to do, it does not count — even if you are getting better at it through repetition.
        </p>
      </>
    ),
  },
  {
    id: 'calculating-hours',
    heading: 'How to Calculate Your Hours',
    content: (
      <>
        <p>
          For apprenticeships starting from 1 August 2025, working out your off-the-job requirement
          is simpler than it used to be — you read it off your standard rather than calculating a
          percentage.
        </p>
        <p>
          <strong>Step 1 — Confirm your start date:</strong> Off-the-job rules follow your start
          date for the whole programme. If you started before 1 August 2025, use the older 20% rule
          (about 7.5 hours per week on a 37.5-hour contract). If you started from August 2025, use
          the fixed-hours method below.
        </p>
        <p>
          <strong>Step 2 — Find your standard's fixed total:</strong> Each standard has its own
          off-the-job total set by the DfE. On the Installation &amp; Maintenance Electrician
          standard (ST0152) it is 1,066 hours for the whole apprenticeship; on the Domestic
          Electrician standard (ST1017) it is 626 hours. Your provider can confirm which standard you
          are on.
        </p>
        <p>
          <strong>Step 3 — Set a weekly pace:</strong> Divide your total by the number of working
          weeks in your programme to get a comfortable pace. For example, 1,066 hours over a 4-year
          programme with roughly 48 working weeks per year (about 192 working weeks) is around 5.5
          hours per week — but you can front-load this and bank it early.
        </p>
        <p>
          <strong>What you record:</strong> Your college or training-provider days usually make up a
          large share of the total and are logged centrally by the provider. Your job is to capture
          everything else — online study, shadowing on new work, manufacturer training, toolbox
          talks that teach something new, and directed practice — so your full total is evidenced.
        </p>
        <p>
          <strong>Don't lose track:</strong> Because it is a single total to reach, the danger is
          quietly drifting behind without realising it. A couple of study sessions on Elec-Mate, a
          toolbox talk, or an hour of directed reading each week adds up quickly — and the tracker
          keeps a running tally so you always know how many hours remain.
        </p>
        <SEOAppBridge
          title="Automatic OJT Hour Tracking"
          description="Elec-Mate OJT Tracker logs your off-the-job hours automatically. Every study session on the platform is recorded."
          icon={Clock}
        />
      </>
    ),
  },
  {
    id: 'recording-evidence',
    heading: 'Recording and Evidencing Your Hours',
    content: (
      <>
        <p>
          Recording off-the-job training hours is not just about keeping a total — it is about
          providing evidence that the training happened, what it covered, and how it relates to the
          apprenticeship standard. This evidence is reviewed by your training provider at progress
          reviews, checked at the gateway stage before the{' '}
          <SEOInternalLink href="/guides/epa-what-to-expect">EPA</SEOInternalLink>, and may be
          inspected by Ofsted.
        </p>
        <p>
          <strong>What to record for each activity:</strong> Date and time of the activity. Duration
          (how many hours). Description of what you did. What new knowledge, skills, or behaviours
          you gained. How the activity links to the apprenticeship standard criteria. Any evidence
          (certificates, screenshots, notes, photographs).
        </p>
        <p>
          <strong>Traditional methods:</strong> Many apprentices use a paper log or spreadsheet
          provided by their training provider. These work but are tedious to maintain, easy to fall
          behind on, and difficult to verify. If you lose the log or forget to update it for several
          weeks, reconstructing your hours from memory produces unreliable records.
        </p>
        <p>
          <strong>Digital tracking with Elec-Mate:</strong> Elec-Mate's OJT Tracker eliminates the
          tedium of manual recording. On-platform activities (courses, quizzes, flashcards, mock
          exams, EPA Simulator sessions) are logged automatically with timestamps and descriptions.
          Off-platform activities (college days, site-based training, manufacturer events) can be
          added manually with a few taps. Each entry is categorised by activity type and can be
          tagged to apprenticeship standard criteria. The tracker calculates your running total,
          weekly average, completion percentage against your standard's fixed total, and projects
          when you will reach 100% at your current pace.
        </p>
        <p>
          <strong>Evidence collection:</strong> Beyond the hours log, Elec-Mate allows you to attach
          evidence to each entry — a photograph from a training session, a certificate from a
          manufacturer course, a screenshot of a completed quiz, or a note from a mentoring session.
          This evidence strengthens your OTJ record and links naturally to your{' '}
          <SEOInternalLink href="/training/apprentice-portfolio">apprentice portfolio</SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'ofsted-inspections',
    heading: 'Ofsted and Off-the-Job Training Records',
    content: (
      <>
        <p>
          Ofsted inspects apprenticeship training providers and pays specific attention to
          off-the-job training. During an inspection, Ofsted may review individual apprentice OTJ
          records, interview apprentices about their training experience, and assess whether the
          training provider is ensuring that apprentices receive their required off-the-job
          training time.
        </p>
        <p>
          <strong>What Ofsted looks for:</strong> Evidence that off-the-job training is planned,
          delivered, and documented. That the training is meaningful and directly relevant to the
          apprenticeship standard — not just box-ticking. That apprentices can articulate what they
          have learned through their off-the-job training. That employers are providing the required
          time. That the training provider monitors OTJ compliance and intervenes when apprentices
          fall behind.
        </p>
        <p>
          <strong>Why it matters to you:</strong> If your training provider receives a poor Ofsted
          rating partly due to inadequate off-the-job training records, it reflects on the quality
          of your apprenticeship. Employers and future assessors may question the robustness of your
          training. Conversely, well-documented OTJ records support your credibility and demonstrate
          your commitment to professional development.
        </p>
        <p>
          <strong>Ofsted-ready records:</strong> Elec-Mate OJT Tracker generates records that meet
          the standard Ofsted expects: detailed activity descriptions, links to apprenticeship
          standard criteria, timestamps, evidence attachments, and compliance tracking. If your
          training provider or Ofsted asks to see your OTJ evidence, you can produce a
          comprehensive, organised record in seconds rather than scrambling through incomplete
          spreadsheets.
        </p>
      </>
    ),
  },
  {
    id: 'employer-responsibilities',
    heading: 'Employer Responsibilities',
    content: (
      <>
        <p>
          Your employer has specific responsibilities regarding off-the-job training. These are not
          optional — they are conditions of the apprenticeship funding agreement that your employer
          signed.
        </p>
        <p>
          <strong>Providing time:</strong> Your employer must release you for the off-the-job
          training your apprenticeship requires, within paid working hours. This includes releasing
          you for college or
          training provider sessions, allowing time for directed study, and supporting learning
          activities on the employer premises.
        </p>
        <p>
          <strong>Paying for training time:</strong> All off-the-job training time must be paid at
          your normal{' '}
          <SEOInternalLink href="/guides/apprentice-electrician-salary">
            hourly rate
          </SEOInternalLink>
          . Your employer cannot deduct pay for college days or study time that forms part of the
          off-the-job requirement.
        </p>
        <p>
          <strong>Supporting learning on site:</strong> Good employers go beyond the minimum
          requirement. They expose apprentices to a variety of work types, pair them with
          experienced electricians for mentoring, encourage attendance at manufacturer training
          events, and create a learning culture where asking questions and seeking feedback is
          normal and encouraged.
        </p>
        <p>
          <strong>Monitoring and review:</strong> Your employer should participate in regular
          progress reviews with the training provider, discussing your off-the-job training hours,
          the quality of your learning, and any barriers to meeting the off-the-job requirement. If work
          pressures are preventing you from getting enough OTJ time, your employer and training
          provider should agree a plan to address this.
        </p>
        <p>
          <strong>If your employer is not meeting their obligations:</strong> Talk to your training
          provider first. They have a contractual relationship with your employer and a
          responsibility to ensure the apprenticeship agreement is being followed. If the training
          provider cannot resolve the issue, contact the ESFA apprenticeship helpline or the
          National Apprenticeship Service for advice. Document specific instances where OTJ time was
          denied or pay was deducted for training days.
        </p>
      </>
    ),
  },
  {
    id: 'elecmate-otj-tracker',
    heading: 'Tracking Hours with Elec-Mate OJT Tracker',
    content: (
      <>
        <p>
          Elec-Mate's OJT Tracker was purpose-built for electrical apprentices. It takes the hassle
          out of off-the-job training hour tracking and ensures you always know where you stand
          against your standard's fixed total.
        </p>
        <p>
          <strong>Automatic logging:</strong> Every minute you spend studying on Elec-Mate —
          courses, quizzes, flashcards, mock exams, BS 7671 run-through, EPA Simulator, AM2
          Simulator — is automatically logged as off-the-job training time. No manual entry needed
          for on-platform activities.
        </p>
        <p>
          <strong>Manual entries for off-platform activities:</strong> Add college days, toolbox
          talks, manufacturer training, shadowing sessions, industry visits, and directed study with
          a few taps. Each entry captures the date, duration, description, and activity category.
        </p>
        <p>
          <strong>Activity categories:</strong> The tracker organises your hours into categories:
          college/training provider, online learning, practical skills practice,
          shadowing/mentoring, manufacturer training, industry events, directed study, and other.
          This categorisation provides a clear picture of the breadth of your off-the-job training
          experience.
        </p>
        <p>
          <strong>Compliance dashboard:</strong> See your total hours, percentage against your
          standard's fixed total, weekly average, and projected completion date at a glance. A
          traffic-light indicator shows green (on track), amber (slightly behind), or red
          (significantly behind). Weekly notifications remind you to log any unrecorded off-platform
          activities.
        </p>
        <p>
          <strong>Evidence attachments:</strong> Attach photographs, certificates, screenshots, or
          notes to any entry. This evidence feeds into your{' '}
          <SEOInternalLink href="/training/apprentice-portfolio">portfolio</SEOInternalLink> and
          creates Ofsted-ready documentation.
        </p>
        <p>
          <strong>Integration with other Elec-Mate features:</strong> OJT hours from the tracker are
          automatically reflected in your portfolio, linked to the relevant apprenticeship standard
          criteria, and included in the gateway readiness dashboard. When your employer and training
          provider review your progress, everything is in one place.
        </p>
        <SEOAppBridge
          title="Never Fall Behind on OJT Hours"
          description="Elec-Mate OJT Tracker automatically logs on-platform study time, categorises activities, tracks completion against your standard's fixed total in real time…"
          icon={BarChart3}
        />
      </>
    ),
  },
];

export default function OffJobTrainingHoursPage() {
  return (
    <GuideTemplate
      title="Off-the-Job Training Hours | 20% Requirement Explained"
      description="Off-the-job training hours for UK electrical apprentices: the 2025 fixed-hours rule (1,066h on ST0152), the old 20% rule, what counts, how to log evidence, employer duties."
      datePublished="2025-10-15"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={ClipboardCheck}
      heroTitle={
        <>
          Off-the-Job Training Hours —{' '}
          <span className="text-yellow-400">The 20% Requirement Explained</span>
        </>
      }
      heroSubtitle="Every electrical apprentice must complete off-the-job training. Since 1 August 2025 that means a fixed number of hours set per standard (1,066 on ST0152); earlier starts keep the 20% rule. This guide explains both, what activities count, how to record your hours, and how Elec-Mate's OJT Tracker makes it effortless."
      readingTime={15}
      answerBox={{
        question: 'How many off-the-job training hours does an electrical apprentice need?',
        answer:
          'It depends on your start date. For apprenticeships starting from 1 August 2025 it is a fixed total set per standard — 1,066 hours for the Installation & Maintenance Electrician standard (ST0152) across the whole apprenticeship. For starts before that date the older rule applies: at least 20% of paid working hours, about 7.5 hours per week on a 37.5-hour contract.',
      }}
      embeddedTool={<OTJHoursCalculator />}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="How to Work Out Your Off-the-Job Training Hours"
      howToDescription="Use these steps to find your off-the-job training requirement — fixed hours for starts from August 2025, or the older 20% rule for earlier starts."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Off-the-Job Training"
      relatedPages={relatedPages}
      ctaHeading="Track your OJT hours effortlessly"
      ctaSubheading="Join 1,000+ UK apprentices tracking off-the-job training hours with Elec-Mate. Automatic logging, compliance tracking, and Ofsted-ready records. 7-day free trial, cancel anytime."
    />
  );
}
