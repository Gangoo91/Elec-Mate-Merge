import { useState } from 'react';
import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { OTJ_STANDARDS, OTJ_HOURS_FLOOR } from '@/data/otjStandards';
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
} from 'lucide-react';

/* Figures come from src/data/otjStandards.ts — DfE Apprenticeship funding
   rules 2025/2026, Annex C (v3, 10 December 2025). Never hard-code them here:
   a second copy is how the page and the app drift apart. */

const fieldCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] ' +
  'bg-transparent px-1 text-base font-medium text-white transition-colors ' +
  'caret-elec-yellow hover:border-white/[0.3] focus:border-elec-yellow ' +
  'focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

const labelCn = 'mb-1 block text-[12px] font-medium text-white';

const cardCn =
  '-mx-5 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5';

const tableWrapCn =
  '-mx-5 sm:mx-0 overflow-x-auto border-y border-white/10 sm:rounded-2xl sm:border sm:border-white/10';

function OTJHoursCalculator() {
  const [standardCode, setStandardCode] = useState('ST0152');
  const [durationMonths, setDurationMonths] = useState(48);
  const [holidayWeeks, setHolidayWeeks] = useState(5.6);

  const standard = OTJ_STANDARDS.find((s) => s.code === standardCode) ?? OTJ_STANDARDS[0];
  const totalOTJHours = standard.otjHours;
  const workingWeeks = Math.max(1, Math.round((durationMonths / 12) * (52 - holidayWeeks)));
  const suggestedWeekly = totalOTJHours / workingWeeks;

  return (
    <div className={cardCn}>
      <h3 className="text-[15px] font-semibold tracking-tight text-white">
        Off-the-job hours calculator
      </h3>
      <p className="mt-1 text-sm text-white">
        Fixed-hours rule — for apprenticeships starting on or after 1 August 2025.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="otj-standard" className={labelCn}>
            Apprenticeship standard
          </label>
          <select
            id="otj-standard"
            value={standardCode}
            onChange={(e) => setStandardCode(e.target.value)}
            className={fieldCn}
          >
            {OTJ_STANDARDS.map((s) => (
              <option key={s.code} value={s.code} className="bg-neutral-900">
                {s.name} (L{s.level})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="otj-months" className={labelCn}>
            Programme length (months)
          </label>
          <input
            id="otj-months"
            type="number"
            inputMode="numeric"
            min={12}
            max={72}
            step={1}
            value={durationMonths}
            onChange={(e) => setDurationMonths(Number(e.target.value))}
            className={fieldCn}
          />
        </div>
        <div>
          <label htmlFor="otj-holiday" className={labelCn}>
            Holiday weeks per year
          </label>
          <input
            id="otj-holiday"
            type="number"
            inputMode="decimal"
            min={0}
            max={12}
            step={0.2}
            value={holidayWeeks}
            onChange={(e) => setHolidayWeeks(Number(e.target.value))}
            className={fieldCn}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4 text-center">
          <p className="text-xs text-white">Total off-the-job requirement</p>
          <p className="mt-1 text-3xl font-bold text-elec-yellow">
            {totalOTJHours.toLocaleString()}
          </p>
          <p className="mt-0.5 text-xs text-white">hours for the whole apprenticeship</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4 text-center">
          <p className="text-xs text-white">Suggested weekly pace</p>
          <p className="mt-1 text-3xl font-bold text-white">{suggestedWeekly.toFixed(1)}</p>
          <p className="mt-0.5 text-xs text-white">
            hours per week over {workingWeeks} working weeks
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-white">
        {standard.code} · DfE Annex C. The total is a fixed figure set for your apprenticeship
        standard — a target to complete, not a perpetual weekly quota. The weekly figure is only a
        suggested pace (total ÷ working weeks); you can front-load hours. If your apprenticeship
        started before 1 August 2025 the older 20% rule applies for the whole programme — 6 hours a
        week on a 30-hour contract, 7.5 hours on a 37.5-hour contract.
      </p>
    </div>
  );
}

const howToSteps = [
  {
    name: 'Confirm your start date',
    text: 'Off-the-job rules follow your apprenticeship start date for the whole programme. If you started on or after 1 August 2025 the fixed-hours rule applies. If you started before that date, the older 20% of paid working hours rule applies throughout — 6 hours a week on a 30-hour contract, 7.5 hours on a 37.5-hour contract.',
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
    text: 'Divide the total by the number of working weeks in your programme. UK statutory holiday is 5.6 weeks, so a full year is about 46 working weeks. The hours can be front-loaded; once you have banked the full total your provider may stop recording further hours while the apprenticeship runs on to gateway and End Point Assessment.',
  },
];

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Off-the-Job Training Hours', href: '/guides/off-the-job-training-hours' },
];

const tocItems = [
  { id: 'hours-by-standard', label: 'Hours by Apprenticeship Standard' },
  { id: 'rules-changed', label: 'Which Rule Applies to You' },
  { id: 'what-is-otj', label: 'What Is Off-the-Job Training?' },
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
  'The Installation & Maintenance Electrician standard (ST0152) requires 1,066 off-the-job training hours across the whole apprenticeship. Domestic Electrician (ST1017) requires 626. Each standard carries its own fixed total set by the DfE in Annex C of the funding rules.',
  'The rules changed on 1 August 2025, and the rule that applies to you is fixed by your apprenticeship start date for the whole programme: starts from August 2025 follow the fixed total per standard; starts before that date keep the older 20% of paid working hours rule.',
  'The fixed total is a target to complete, not a perpetual weekly quota — hours can be front-loaded, and once the total is banked your provider may stop recording further hours.',
  'Off-the-job training means learning new knowledge, skills and behaviours related to your apprenticeship — not just college. College days, online learning, shadowing experienced electricians, mentoring, manufacturer training, industry visits, directed study and supervised practice of new skills all count.',
  'What does not count: performing normal work duties you already know how to do, English and maths qualifications up to Level 2, and any training not directly relevant to the apprenticeship standard.',
];

const faqs = [
  {
    question: 'How many off-the-job hours does an electrical apprentice need?',
    answer:
      'For apprenticeships starting from 1 August 2025 it is a fixed total set for each apprenticeship standard by the Department for Education in Annex C of the funding rules. The Installation & Maintenance Electrician standard (ST0152) — the standard most electrical apprentices are on — requires 1,066 hours across the whole apprenticeship. Domestic Electrician (ST1017) requires 626 hours, Electrical/Electronic Product Service & Installation Engineer (ST0150) requires 787 hours, Electrical Power Networks Engineer (ST0475) requires 744 hours, and Electrical Power Protection & Plant Commissioning Engineer (ST0157) requires 1,114 hours. If your apprenticeship started before 1 August 2025, the older rule applies instead: at least 20% of your paid working hours, which is 6 hours a week on a 30-hour contract and 7.5 hours on a 37.5-hour contract. Your college or training provider holds the authoritative figure for your programme.',
  },
  {
    question: 'Does off-the-job training have to happen at college?',
    answer:
      'No. Off-the-job training is not limited to college attendance. While your weekly college day is the most obvious form of off-the-job training, many other activities qualify. Directed study at home or on the employer premises, online learning through platforms like Elec-Mate, shadowing experienced electricians on new types of work, manufacturer training events, industry visits, toolbox talks that teach new knowledge, and supervised practice of skills you have not yet mastered all count as off-the-job training. The critical test is whether the activity is teaching you new knowledge, skills, or behaviours directly relevant to the apprenticeship standard. Normal productive work — tasks you already know how to do and are doing as part of your regular job duties — does not count, even if it relates to electrical installation.',
  },
  {
    question: 'What happens if I do not meet the off-the-job training requirement?',
    answer:
      'Off-the-job training is a condition of the apprenticeship funding, so falling short has real consequences. If you do not complete the required hours, your training provider may be unable to confirm that you have met the apprenticeship requirements at the gateway stage, which means you cannot progress to the End Point Assessment. Funding can also be clawed back from the training provider, which is why providers monitor and enforce the requirement closely. Ofsted checks off-the-job training records during provider inspections. The simplest approach is to track your hours consistently throughout the apprenticeship so you always know where you stand rather than discovering a shortfall near gateway.',
  },
  {
    question: 'How do I record off-the-job training hours?',
    answer:
      'Off-the-job training hours must be recorded with enough detail to show what activity was carried out, when, for how long, and how it relates to the apprenticeship standard. Traditional methods include paper logs or spreadsheets where you manually enter each activity with dates, times, descriptions, and links to the standard criteria — workable, but tedious and easy to fall behind on. Elec-Mate automates most of it: study time on the platform is tracked for you, and you can add manual entries for off-platform activities (college days, site-based training, manufacturer events) in a few taps. Each entry is categorised by activity type and can be mapped to the apprenticeship standard, and the tracker keeps a running total, weekly average and percentage against your standard fixed total.',
  },
  {
    question: 'Does studying on Elec-Mate count as off-the-job training?',
    answer:
      'Yes, studying on Elec-Mate counts as off-the-job training provided it meets the official definition: it must be teaching you new knowledge, skills, or behaviours directly relevant to the apprenticeship standard, and it must happen during your paid working hours. Completing course modules, taking practice quizzes, using flashcards for new topics, practising mock exams, using the EPA Simulator, and studying BS 7671 content through the platform all qualify. Elec-Mate tracks the time you spend on these activities, so your off-the-job hours build up without manual effort. If training happens outside your normal working hours, your employer should agree it in advance — the funding rules expect off-the-job training to sit inside paid time.',
  },
  {
    question: 'Is the off-the-job requirement based on total hours or weekly hours?',
    answer:
      'For apprenticeships starting from 1 August 2025 the requirement is a fixed total number of hours for the whole programme — for example 1,066 hours on the Installation & Maintenance Electrician standard (ST0152) — not a strict weekly percentage. Because it is a total, you can have some weeks with more off-the-job training (for example, a block-release college week) and some with less (for example, during a busy project), as long as you reach the fixed total by gateway. Once the total is banked your provider may stop recording further hours. Funding rules still expect off-the-job training to be spread reasonably across the programme rather than crammed in at the end, and the practical training period must run for at least eight months. Your provider monitors progress at regular reviews.',
  },
  {
    question: 'Can my employer refuse to give me off-the-job training time?',
    answer:
      'No. Providing off-the-job training time is a contractual obligation your employer agreed to when they signed the apprenticeship agreement. Employers must release apprentices for the required off-the-job training as a condition of the apprenticeship funding, and this training must take place within paid working hours. If your employer is consistently not providing this time — by not releasing you for college, by requiring you to work through study periods, or by expecting you to do all training in your own unpaid time — they are in breach of the apprenticeship agreement. Raise the issue first with your training provider, who has a responsibility to ensure the employer meets their obligations. If the training provider cannot resolve it, the Department for Education runs an apprenticeship helpline for exactly this. Document every instance where off-the-job training time was denied — that evidence will support your case.',
  },
  {
    question: 'What is the difference between on-the-job and off-the-job training?',
    answer:
      'On-the-job training is learning that happens through doing your normal job — carrying out installations, testing circuits, fixing faults, and working alongside experienced electricians on tasks you are already somewhat familiar with. It is valuable and essential for developing practical competence, but it does not count towards the off-the-job requirement. Off-the-job training is learning new knowledge, skills, or behaviours that you have not yet acquired. The key distinction is the word "new". If you are practising a skill you have already learned (for example, wiring a socket outlet for the hundredth time), that is on-the-job training. If you are learning a skill for the first time (for example, being shown how to wire a two-way switching circuit by your supervisor), that is off-the-job training, even though it is happening on site. College attendance, online courses, directed study, and manufacturer training are clearly off-the-job. Activities on the employer premises can also qualify if they are teaching you something new.',
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
    href: '/apprentice-portfolio-guide',
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

/** Activities that count / do not count — rendered as plain typographic blocks. */
const COUNTS = [
  {
    title: 'College or training provider days',
    body: 'All time spent at college or with your training provider — lectures, workshops, practical sessions, tutorials, and assessments. This is the most straightforward form of off-the-job training and typically accounts for one day per week.',
  },
  {
    title: 'Online learning and study',
    body: 'Studying courses, completing quizzes, using flashcards, and practising mock exams on platforms like Elec-Mate. Self-directed study of BS 7671, textbooks, and technical resources also counts. The key is that it must be learning new knowledge or skills.',
  },
  {
    title: 'Shadowing and mentoring',
    body: 'Observing or being taught by experienced electricians on types of work you have not done before, and being mentored on new skills, techniques, or approaches. This counts even when it happens on the employer premises — the test is whether you are learning something new rather than doing your usual work.',
  },
  {
    title: 'Manufacturer training and industry visits',
    body: 'Manufacturer training days — a new consumer unit range, EV charger installation, a smart home system — plus trade shows, exhibitions, and industry events. These develop knowledge directly relevant to your role.',
  },
  {
    title: 'Supervised practice of new skills',
    body: 'Practising new skills in a supervised environment: safe isolation, testing techniques, or two-way switching wiring at the workshop. Using the Elec-Mate AM2 Simulator or EPA Simulator to practise assessment-related skills counts too.',
  },
];

const DOES_NOT_COUNT = [
  {
    title: 'Normal work duties',
    body: 'Installation, testing, or maintenance work that you already know how to do as part of your regular job. Even where it is directly relevant to the apprenticeship standard, it is on-the-job training. The distinction is whether you are learning something new or repeating something you already know.',
  },
  {
    title: 'English and maths qualifications',
    body: 'Time spent studying for English and maths qualifications up to Level 2 does not count towards off-the-job training. These are funded and tracked separately under the apprenticeship funding rules.',
  },
  {
    title: 'Training not relevant to the standard',
    body: 'Training that is not directly relevant to your apprenticeship standard — general company induction, non-technical training, or training for activities outside the scope of ST0152 — does not count.',
  },
  {
    title: 'Progress reviews',
    body: 'Regular progress review meetings with your training provider or employer are not normally counted as off-the-job training unless they include structured learning content.',
  },
];

const sections = [
  {
    id: 'hours-by-standard',
    heading: 'Off-the-Job Hours by Apprenticeship Standard',
    content: (
      <>
        <p>
          <strong>
            Installation &amp; Maintenance Electrician (ST0152) — 1,066 hours across the whole
            apprenticeship.
          </strong>{' '}
          That is the figure most electrical apprentices need, for anyone starting on or after 1
          August 2025. Every standard carries its own fixed total, set by the Department for
          Education in Annex C of the apprenticeship funding rules.
        </p>
        <div className={tableWrapCn}>
          <table className="w-full min-w-[34rem] text-sm">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold text-white">Apprenticeship standard</th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-white">Code</th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-white">Level</th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-white">
                  OTJ hours
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {OTJ_STANDARDS.map((s) => {
                const isCore = s.code === 'ST0152';
                return (
                  <tr
                    key={s.code}
                    className={
                      isCore ? 'bg-gradient-to-b from-white/[0.08] to-white/[0.04]' : undefined
                    }
                  >
                    <td className="px-4 py-3 text-white">
                      {isCore ? <strong>{s.name}</strong> : s.name}
                    </td>
                    <td className="px-4 py-3 text-white">{s.code}</td>
                    <td className="px-4 py-3 text-white">{s.level}</td>
                    <td
                      className={`px-4 py-3 text-right font-semibold ${
                        isCore ? 'text-elec-yellow' : 'text-white'
                      }`}
                    >
                      {s.otjHours.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-white">
          Source: DfE apprenticeship funding rules 2025/2026, Annex C. Figures are the minimum
          off-the-job hours for the whole apprenticeship. If you are a college-linked apprentice,
          your provider holds the authoritative required-hours figure for your programme — always
          use theirs if it differs.
        </p>
      </>
    ),
  },
  {
    id: 'rules-changed',
    heading: 'Which Rule Applies to You',
    content: (
      <>
        <p>
          On <strong>1 August 2025</strong> the way off-the-job training is measured changed. The
          long-standing 20% model was replaced with a{' '}
          <strong>fixed total number of hours set for each apprenticeship standard</strong>. Which
          rule applies to you is decided by your apprenticeship start date — and it stays fixed for
          the whole programme, so nothing changes mid-apprenticeship.
        </p>
        <div className="my-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white">
              Started before 1 Aug 2025
            </p>
            <h3 className="mb-1.5 text-base font-bold text-white">The old 20% rule still applies</h3>
            <p className="text-sm leading-relaxed text-white">
              At least 20% of your paid working hours go on off-the-job training for the whole
              apprenticeship — 6 hours a week on a 30-hour contract, 7.5 hours on a 37.5-hour
              contract. Your provider keeps tracking it that way until you reach gateway.
            </p>
          </div>
          <div className="rounded-2xl border border-elec-yellow/40 bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-elec-yellow">
              Starts from 1 Aug 2025
            </p>
            <h3 className="mb-1.5 text-base font-bold text-white">A fixed total per standard</h3>
            <p className="text-sm leading-relaxed text-white">
              Each standard carries its own fixed off-the-job total (DfE Annex C). For Installation
              &amp; Maintenance Electrician (ST0152) that total is 1,066 hours across the
              apprenticeship. It is a target to complete, not a weekly quota.
            </p>
          </div>
        </div>
        <p>
          A few details matter under the current rules. The practical training period must run for a
          minimum of <strong>eight months</strong>, and there is an absolute floor of{' '}
          <strong>{OTJ_HOURS_FLOOR} hours</strong> below which off-the-job training can never be
          evidenced for any standard. Standards that started between August and December 2025 used
          lower transitional figures; from <strong>1 January 2026</strong> the full Annex C total is
          mandatory for new starts.
        </p>
        <p>
          Because the total is fixed, apprentices can front-load their hours. Once the full total is
          banked, the provider may stop recording further off-the-job time while the apprenticeship
          continues to gateway and the{' '}
          <SEOInternalLink href="/guides/epa-what-to-expect">End Point Assessment</SEOInternalLink>.
        </p>
      </>
    ),
  },
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
          The purpose is to guarantee dedicated learning time — time specifically set aside for
          acquiring new knowledge, skills, and behaviours relevant to the apprenticeship standard.
          Without it, there would be a risk that apprentices simply work as cheap labour without
          receiving the structured training that distinguishes an apprenticeship from ordinary
          employment.
        </p>
        <p>
          For electrical apprentices on the Installation &amp; Maintenance Electrician standard
          (ST0152), off-the-job training covers everything from formal college attendance to online
          study, manufacturer training, supervised practice of new skills, and directed research. It
          is broader than most apprentices realise — and understanding what counts (and what does
          not) is what makes the requirement manageable.
        </p>
        <p>
          Meeting the requirement is also a gateway condition for the{' '}
          <SEOInternalLink href="/guides/epa-what-to-expect">End Point Assessment</SEOInternalLink>.
          If you cannot demonstrate that you have completed sufficient off-the-job training hours,
          you cannot progress to the EPA and complete your apprenticeship.
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
          applies to you for the whole programme — so this section still matters for a large number
          of current apprentices. Under it, at least 20% of an apprentice&apos;s paid working hours
          are spent on off-the-job training, calculated across the total duration of the
          apprenticeship rather than policed week by week.
        </p>
        <p>
          <strong>What 20% means in practice:</strong> on a 30-hour contract that is 6 hours a week;
          on a 37.5-hour contract it is 7.5 hours a week. Unlike the current rules, there is no
          published programme-total figure for this method — your training provider holds the target
          that applies to your programme, and theirs is the figure to work to.
        </p>
        <p>
          <strong>Flexibility:</strong> the 20% is an average over the entire apprenticeship. Some
          weeks you may do more (block-release college weeks), some less (intensive project periods
          at work). As long as the overall average reaches 20% by the time you approach gateway you
          are compliant — but the expectation is that off-the-job training is spread reasonably
          throughout the programme rather than left to the final few months.
        </p>
        <p>
          <strong>Who tracks it:</strong> both you and your training provider. Your provider reviews
          your hours at progress meetings (typically every 6 to 12 weeks) and flags any shortfall.
          You are responsible for recording activities that happen outside formal college sessions —
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
          The official definition is learning undertaken outside of the normal day-to-day working
          environment that leads towards the achievement of an apprenticeship. It can be delivered
          at the apprentice&apos;s normal place of work provided it is clearly distinct from normal
          work duties. These activities count:
        </p>
        <div className="my-6 divide-y divide-white/10 border-y border-white/10">
          {COUNTS.map((item) => (
            <div key={item.title} className="py-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white">{item.body}</p>
            </div>
          ))}
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
          Understanding the exclusions matters just as much — logging hours that will later be
          stripped out is how apprentices end up short at gateway.
        </p>
        <div className="my-6 divide-y divide-white/10 border-y border-white/10">
          {DOES_NOT_COUNT.map((item) => (
            <div key={item.title} className="py-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white">{item.body}</p>
            </div>
          ))}
        </div>
        <p>
          The grey area between learning something new and doing your normal work can be confusing.
          A good rule of thumb: if you could not do this task before the training session, and it is
          relevant to the apprenticeship standard, it counts. If you are repeating a task you
          already know how to do, it does not — even if you are getting better at it through
          repetition.
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
          For apprenticeships starting from 1 August 2025, working out your requirement is simpler
          than it used to be — you read it off your standard rather than calculating a percentage.
        </p>
        <p>
          <strong>Step 1 — Confirm your start date.</strong> Off-the-job rules follow your start
          date for the whole programme. Started before 1 August 2025? Use the older 20% rule (6
          hours a week on a 30-hour contract, 7.5 hours on a 37.5-hour contract). Started from
          August 2025? Use the fixed-hours method below.
        </p>
        <p>
          <strong>Step 2 — Find your standard&apos;s fixed total.</strong> On Installation &amp;
          Maintenance Electrician (ST0152) it is 1,066 hours for the whole apprenticeship; on
          Domestic Electrician (ST1017) it is 626 hours. The table above lists the main electrical
          standards, and your provider can confirm which one you are on.
        </p>
        <p>
          <strong>Step 3 — Set a weekly pace.</strong> Divide your total by the number of working
          weeks in your programme. UK statutory holiday is 5.6 weeks, so a full year is about 46
          working weeks. That makes 1,066 hours over a four-year programme (roughly 186 working
          weeks) about 5.7 hours a week — and you can front-load it and bank the total early.
        </p>
        <p>
          <strong>What you record.</strong> Your college or training-provider days usually make up a
          large share of the total and are logged centrally by the provider. Your job is to capture
          everything else — online study, shadowing on new work, manufacturer training, toolbox
          talks that teach something new, and directed practice — so your full total is evidenced.
        </p>
        <p>
          <strong>Do not drift.</strong> Because it is a single total to reach, the danger is
          quietly falling behind without noticing. A couple of study sessions, a toolbox talk, or an
          hour of directed reading each week adds up quickly.
        </p>
        <SEOAppBridge
          title="Automatic off-the-job hour tracking"
          description="Elec-Mate tracks your off-the-job hours against your standard's fixed total, so you always know how many remain."
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
          Recording off-the-job hours is not just about keeping a total — it is about evidencing
          that the training happened, what it covered, and how it relates to the apprenticeship
          standard. This evidence is reviewed by your training provider at progress reviews, checked
          at gateway before the{' '}
          <SEOInternalLink href="/guides/epa-what-to-expect">EPA</SEOInternalLink>, and may be
          inspected by Ofsted.
        </p>
        <p>
          <strong>What to record for each activity:</strong> the date and time; the duration in
          hours; a description of what you did; the new knowledge, skills, or behaviours you gained;
          how it links to the apprenticeship standard criteria; and any supporting evidence
          (certificates, screenshots, notes, photographs).
        </p>
        <p>
          <strong>Traditional methods.</strong> Many apprentices use a paper log or spreadsheet
          provided by their training provider. These work, but they are tedious to maintain, easy to
          fall behind on, and difficult to verify. If you lose the log or forget to update it for
          several weeks, reconstructing your hours from memory produces unreliable records.
        </p>
        <p>
          <strong>Digital tracking.</strong> Elec-Mate records on-platform study automatically and
          lets you add off-platform activities in a few taps, then attaches your evidence —
          photographs, certificates, quiz results, mentoring notes — to each entry. That evidence
          strengthens your OTJ record and feeds straight into your{' '}
          <SEOInternalLink href="/apprentice-portfolio-guide">
            apprentice portfolio
          </SEOInternalLink>
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
          provider is ensuring apprentices receive their required off-the-job training time.
        </p>
        <p>
          <strong>What Ofsted looks for:</strong> evidence that off-the-job training is planned,
          delivered, and documented; that it is meaningful and directly relevant to the
          apprenticeship standard rather than box-ticking; that apprentices can articulate what they
          have learned from it; that employers are providing the required time; and that the
          provider monitors compliance and intervenes when apprentices fall behind.
        </p>
        <p>
          <strong>Why it matters to you.</strong> If your provider receives a poor Ofsted rating
          partly because of inadequate off-the-job records, it reflects on the quality of your
          apprenticeship, and employers or assessors may question how robust your training was.
          Well-documented records do the opposite — they support your credibility and demonstrate
          your commitment to professional development.
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
          optional — they are conditions of the apprenticeship funding agreement your employer
          signed.
        </p>
        <p>
          <strong>Providing time.</strong> Your employer must release you for the off-the-job
          training your apprenticeship requires, within paid working hours. That includes college or
          training-provider sessions, time for directed study, and support for learning activities
          on the employer premises.
        </p>
        <p>
          <strong>Paying for training time.</strong> All off-the-job training time must be paid at
          your normal{' '}
          <SEOInternalLink href="/guides/apprentice-electrician-salary">
            hourly rate
          </SEOInternalLink>
          . Your employer cannot deduct pay for college days or study time that forms part of the
          off-the-job requirement.
        </p>
        <p>
          <strong>Supporting learning on site.</strong> Good employers go beyond the minimum. They
          expose apprentices to a variety of work types, pair them with experienced electricians for
          mentoring, encourage attendance at manufacturer training events, and create a culture
          where asking questions and seeking feedback is normal.
        </p>
        <p>
          <strong>Monitoring and review.</strong> Your employer should take part in regular progress
          reviews with the training provider, covering your off-the-job hours, the quality of your
          learning, and any barriers to meeting the requirement. If work pressures are preventing
          you from getting enough time, employer and provider should agree a plan to fix it.
        </p>
        <p>
          <strong>If your employer is not meeting their obligations.</strong> Talk to your training
          provider first — they have a contractual relationship with your employer and a
          responsibility to ensure the apprenticeship agreement is followed. If the provider cannot
          resolve it, the Department for Education runs an apprenticeship helpline for apprentices
          in exactly this position. Document specific instances where off-the-job time was denied or
          pay was deducted for training days.
        </p>
      </>
    ),
  },
  {
    id: 'elecmate-otj-tracker',
    heading: 'Tracking Hours with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate&apos;s off-the-job tracker was built for electrical apprentices. It keeps your
          hours, your evidence and your standard&apos;s fixed total in one place, so you always know
          where you stand.
        </p>
        <p>
          <strong>Automatic logging.</strong> Time you spend studying on Elec-Mate — courses,
          quizzes, flashcards, mock exams, BS 7671 content, the EPA Simulator and the AM2 Simulator
          — is tracked for you, with no manual entry for on-platform activity.
        </p>
        <p>
          <strong>Manual entries for everything else.</strong> Add college days, toolbox talks,
          manufacturer training, shadowing sessions, industry visits and directed study in a few
          taps. Each entry captures the date, duration, description and activity category.
        </p>
        <p>
          <strong>Activity categories.</strong> Hours are organised by type — college and training
          provider, online learning, practical skills, shadowing and mentoring, manufacturer
          training, industry visits, directed study — which gives a clear picture of the breadth of
          your off-the-job experience, exactly what a tutor or inspector wants to see.
        </p>
        <p>
          <strong>Compliance forecast.</strong> See your total hours, percentage against your
          standard&apos;s fixed total, weekly average and projected position at gateway. A
          traffic-light indicator shows whether you are on track, slightly behind, or significantly
          behind.
        </p>
        <p>
          <strong>Joined up with the rest of your record.</strong> Hours feed your{' '}
          <SEOInternalLink href="/apprentice-portfolio-guide">portfolio</SEOInternalLink>, link to
          the relevant apprenticeship standard criteria, and appear in the gateway readiness view —
          so when your employer, tutor or an inspector asks, it is all in one place.
        </p>
        <SEOAppBridge
          title="Never fall behind on off-the-job hours"
          description="Automatic study logging, activity categories, evidence attachments, and a running total against your standard's fixed requirement."
          icon={BarChart3}
        />
      </>
    ),
  },
];

export default function OffJobTrainingHoursPage() {
  return (
    <GuideTemplate
      title="Off-the-Job Training Hours: 1,066 on ST0152"
      description="Off-the-job training hours for electrical apprentices: 1,066 hours on ST0152 under the 2025 fixed-hours rule, what counts, and how to log evidence."
      datePublished="2025-10-15"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={ClipboardCheck}
      heroTitle={
        <>
          Off-the-Job Training Hours —{' '}
          <span className="text-elec-yellow">1,066 Hours on ST0152</span>
        </>
      }
      heroSubtitle="Every electrical apprentice must complete off-the-job training. Since 1 August 2025 that means a fixed number of hours set per standard — 1,066 on Installation & Maintenance Electrician (ST0152). Earlier starts keep the 20% rule. This guide gives the figures for every electrical standard, what activities count, and how to record your hours."
      readingTime={14}
      answerBox={{
        question: 'How many off-the-job training hours does an electrical apprentice need?',
        answer:
          'It depends on your start date. For apprenticeships starting from 1 August 2025 it is a fixed total set per standard — 1,066 hours for Installation & Maintenance Electrician (ST0152) across the whole apprenticeship, and 626 hours for Domestic Electrician (ST1017). For starts before that date the older rule applies: at least 20% of paid working hours, which is 6 hours a week on a 30-hour contract and 7.5 hours on a 37.5-hour contract.',
      }}
      embeddedTool={<OTJHoursCalculator />}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="How to Work Out Your Off-the-Job Training Hours"
      howToDescription="Four steps to your off-the-job requirement — fixed hours for starts from August 2025, or the older 20% rule for earlier starts."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Off-the-Job Training"
      relatedPages={relatedPages}
      ctaHeading="Track your off-the-job hours effortlessly"
      ctaSubheading="Join UK apprentices tracking off-the-job training hours with Elec-Mate. Automatic study logging, compliance forecasting, and evidence-backed records. 7-day free trial, cancel anytime."
    />
  );
}
