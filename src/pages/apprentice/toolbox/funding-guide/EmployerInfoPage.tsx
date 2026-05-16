/**
 * Funding · EmployerInfoPage — editorial guide for employers.
 *
 * Levy vs non-levy, DAS registration, choosing a training provider,
 * year-by-year cost & return, wage rates, common concerns, supervision
 * requirements, apprentice vs hiring comparison, case study, industry
 * stats.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Users,
} from 'lucide-react';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import { cn } from '@/lib/utils';

const levyFacts = [
  'Annual payroll over £3 million',
  'Pay 0.5% of payroll as Apprenticeship Levy',
  'Funds available in DAS account',
  'Government adds 10% top-up (ending April 2026)',
  'Use it or lose it — funds expire after 24 months (changing to 12 months)',
  'Can transfer up to 50% to supply chain or other employers',
  'Funds appear monthly in arrears — can plan spending ahead',
];

const smeFacts = [
  'Annual payroll under £3 million (most electrical contractors)',
  'Pay only 5% of training costs — government pays 95%',
  'Maximum £1,150 for a Level 3 Electrical apprenticeship',
  '100% funded for under-25s at non-levy employers (from August 2026)',
  'Can receive levy transfer for 100% funded training — zero cost',
  'Reserve funding through the apprenticeship service portal',
  'Co-investment paid monthly — approximately £24/month',
];

const dasSteps = [
  'Go to apprenticeships.education.gov.uk and create an account',
  'Add your organisation using your Companies House or charity number',
  'Add your PAYE scheme(s) — links payroll for levy calculations',
  'Accept the employer agreement (terms and conditions for funding)',
  'Search for and select a training provider',
  'Add your apprentice(s) with their details and chosen standard',
  'Approve the apprenticeship — funding is now reserved',
];

const providerCriteria = [
  'Ofsted rating: Good or Outstanding (check reports.ofsted.gov.uk)',
  'Specialises in electrical apprenticeships — not just general construction',
  'Offers the full ST0152 v1.2 standard with AM2 preparation',
  'Location: reasonable travel for your apprentice (or block release)',
  'Good achievement rates: check National Achievement Rate Tables',
  'Provides regular progress reviews and clear employer communication',
  'Has a dedicated employer liaison or account manager',
  'Offers levy transfer matching if you\'re a non-levy employer',
  'Includes EPA preparation and mock assessments',
  'Ask other local employers for recommendations',
];

interface YearCost {
  year: number;
  phase: string;
  rows: { label: string; value: string; positive?: boolean }[];
  narrative: string;
}

const yearByYear: YearCost[] = [
  {
    year: 1,
    phase: 'Investment phase',
    rows: [
      { label: 'Apprentice wages (NMW)', value: '~£12,500' },
      { label: 'Co-investment share', value: '~£288' },
      { label: 'CITB grant received', value: '−£2,500', positive: true },
      { label: 'Age incentive (if eligible)', value: '−£1,000', positive: true },
    ],
    narrative:
      'Apprentice is mostly learning in Year 1 — college days, basic site tasks, and shadowing. Limited productive output but building foundation skills.',
  },
  {
    year: 2,
    phase: 'Growing productivity',
    rows: [
      { label: 'Apprentice wages (NMW/age rate)', value: '~£14,500' },
      { label: 'Co-investment share', value: '~£288' },
      { label: 'CITB grant received', value: '−£2,500', positive: true },
    ],
    narrative:
      'Apprentice becomes productive — first fix, containment, basic testing assistance. Can work with reduced supervision on familiar tasks.',
  },
  {
    year: 3,
    phase: 'Significant productivity',
    rows: [
      { label: 'Apprentice wages (NMW/age rate)', value: '~£17,000' },
      { label: 'Co-investment share', value: '~£288' },
      { label: 'CITB grant received', value: '−£2,500', positive: true },
    ],
    narrative:
      'Apprentice handles most installation work independently. Second fix, consumer unit changes, testing under supervision. High productive value.',
  },
  {
    year: 4,
    phase: 'Near-qualified',
    rows: [
      { label: 'Apprentice wages (NMW/age rate)', value: '~£20,000' },
      { label: 'Co-investment share', value: '~£288' },
      { label: 'CITB grant received', value: '−£2,500', positive: true },
      { label: 'CITB completion bonus', value: '−£3,500', positive: true },
    ],
    narrative:
      'Apprentice completes EPA. Working at near-qualified level — installation, testing, inspection with minimal supervision. Ready for full duties on completion.',
  },
];

const wageRates = [
  { label: 'Apprentice rate (Year 1 or under 19)', value: '£7.55/hr' },
  { label: 'Age 18–20 (after Year 1)', value: '£10.00/hr' },
  { label: 'Age 21+ (after Year 1)', value: '£12.21/hr' },
];

const concerns = [
  {
    question: '"What if they leave after qualifying?"',
    answer:
      '92% of apprentices stay with their training employer. Loyalty built over 4 years is stronger than any contract. Even if they do leave, you\'ve had 3+ years of productive work at apprentice rates and your CITB grants back.',
  },
  {
    question: '"We\'re too busy to supervise an apprentice"',
    answer:
      'Apprentices become productive from Year 2. Supervision required decreases each year. Think of the apprentice as an investment — they take work off your qualified staff as they develop.',
  },
  {
    question: '"College days mean lost productivity"',
    answer:
      'College is typically one day per week (or block release). The remaining 4 days your apprentice is on site, learning and contributing. The training they receive at college directly improves their on-site work quality.',
  },
  {
    question: '"What about quiet periods?"',
    answer:
      'Quiet periods are ideal for training — structured learning, mock tests, portfolio work, skills practice. Your apprentice must be paid and employed throughout, but slower periods accelerate their development.',
  },
  {
    question: '"The paperwork is too complicated"',
    answer:
      'Your training provider handles nearly all the paperwork — DAS registration, ILR submissions, progress reviews, EPA arrangements. You just sign the apprenticeship agreement and submit CITB claims quarterly.',
  },
];

const supervisionRequirements = [
  'Assign a named workplace mentor or supervisor',
  'Ensure the apprentice works under appropriate supervision at all times',
  'Supervision level decreases as competence increases over the 4 years',
  'Release the apprentice for college/training as agreed (typically 1 day/week)',
  'Provide a range of work experiences across the standard requirements',
  'Support progress reviews (minimum every 12 weeks with training provider)',
  'Allow time for portfolio evidence collection and on-the-job training',
  'Provide appropriate PPE, tools, and site access',
];

const hireComparison = [
  'Recruitment fees: £4,000–£8,000 per hire',
  'Qualified salary: £35,000–£42,000 per year',
  'Retraining to your standards: £2,000–£5,000',
  'Higher turnover risk — experienced staff move for higher pay',
  'No CITB grants available for hiring qualified staff',
  'No government training subsidy — employer pays full cost',
];

const caseStudyBullets = [
  'Training cost: £0 (secured a levy transfer through training provider)',
  'CITB grants received over 4 years: £13,500',
  'Age incentive received: £1,000',
  'NI savings over 4 years: approximately £8,000',
  'Total apprentice wages paid over 4 years: approximately £64,000',
  'Net cost after grants and savings: approximately £42,000',
  'Result: a fully qualified electrician trained to their exact standards',
  'Equivalent hire would cost: £35k salary + £5k recruitment + £3k retraining = £43k in year one alone',
];

const stats = [
  { value: '25,000+', label: 'Electricians needed annually in the UK' },
  { value: '92%', label: 'Apprentices stay with their training employer' },
  { value: '£23k', label: 'Training cost savings vs hiring qualified' },
  { value: '4 years', label: 'To a fully trained, qualified electrician' },
  { value: '47%', label: 'Of UK electricians are over 45 — retirement wave coming' },
  { value: '£13.5k', label: 'CITB grants available per apprentice' },
];

const EmployerInfoPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox/apprenticeship-funding')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Funding"
          title="Employer information"
          description="The business case for apprentices — how funding works, what it costs and returns year by year, common concerns answered, and how the maths actually stacks up vs hiring qualified."
          tone="yellow"
        />
      </motion.div>

      {/* ── Intro ───────────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2">
          <Eyebrow>Made for employers</Eyebrow>
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            This section helps employers understand apprenticeship funding and
            make the business case. Share it with employers who are unfamiliar
            with how funding works or need convincing that taking on an
            apprentice is a smart investment.
          </p>
        </div>
      </motion.div>

      {/* ── Levy vs Non-Levy ────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Levy vs non-levy"
          title="Two paths to fund apprentice training"
          meta="Your payroll size decides which one"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <FactsCard
            label="Levy-paying employers"
            sublabel="Annual payroll over £3m"
            items={levyFacts}
            tip="If you're not using all your levy funds, consider transferring up to 50% to supply chain partners or other employers. Many smaller firms are actively seeking levy transfers — builds goodwill and develops your talent pipeline."
          />
          <FactsCard
            label="Non-levy employers (SMEs)"
            sublabel="Annual payroll under £3m"
            items={smeFacts}
            tip="Ask your training provider about levy transfer opportunities — many large employers have unused funds available. A levy transfer means you pay nothing at all for training."
          />
        </div>
      </motion.section>

      {/* ── DAS registration ────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="How to register on DAS"
          title="Digital Apprenticeship Service setup"
          meta="apprenticeships.education.gov.uk · 7 steps"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <ol className="space-y-2">
            {dasSteps.map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06] text-[11px] font-mono font-semibold tabular-nums text-elec-yellow flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-[12.5px] text-white/85 leading-relaxed">
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              <span className="font-semibold text-elec-yellow">Note:</span> Most
              training providers walk you through this for free. Many will set
              up the account on your behalf with your permission.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── Provider criteria ───────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Choosing a training provider"
          title="10 things to check before you commit"
          meta="The provider has a massive impact on your apprentice's success"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
          <ul className="space-y-1.5">
            {providerCriteria.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ── Year-by-year ────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Year-by-year cost & return"
          title="Investment in Y1, return from Y2"
          meta="Productivity rises each year while wages stay below qualified rates"
        />
        <ul className="space-y-2.5">
          {yearByYear.map((y) => (
            <li
              key={y.year}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3"
            >
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <h3 className="text-[14px] font-semibold text-elec-yellow tracking-tight">
                  Year {y.year} — {y.phase}
                </h3>
              </div>
              <ul className="space-y-1.5">
                {y.rows.map((row) => (
                  <li
                    key={row.label}
                    className="flex items-start justify-between gap-3 text-[12.5px] text-white/85"
                  >
                    <span>{row.label}</span>
                    <span
                      className={cn(
                        'font-mono tabular-nums font-semibold flex-shrink-0',
                        row.positive ? 'text-elec-yellow' : 'text-white'
                      )}
                    >
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[12.5px] text-white/70 leading-relaxed pt-1 border-t border-white/[0.04]">
                {y.narrative}
              </p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Wage rates ──────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Apprentice wage rates · 2025/26"
          title="Minimum hourly rates"
          meta="JIB-graded employers typically pay above minimum"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <ul className="space-y-1.5">
            {wageRates.map((rate) => (
              <li
                key={rate.label}
                className="flex items-start justify-between gap-3 text-[12.5px] text-white/85"
              >
                <span>{rate.label}</span>
                <span className="font-mono tabular-nums font-semibold text-elec-yellow flex-shrink-0">
                  {rate.value}
                </span>
              </li>
            ))}
          </ul>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              <span className="font-semibold text-elec-yellow">Note:</span> Many
              electrical employers pay above minimum from Year 2 onwards.
              JIB-graded employers follow JIB recommended rates which are
              typically higher.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── Common concerns ─────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Common employer concerns"
          title="Five worries — answered"
          meta="The questions that come up in every conversation"
        />
        <ul className="space-y-2">
          {concerns.map((c) => (
            <li
              key={c.question}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-1.5"
            >
              <h3 className="text-[14px] font-semibold text-elec-yellow tracking-tight">
                {c.question}
              </h3>
              <p className="text-[13px] text-white/85 leading-relaxed">{c.answer}</p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Supervision ─────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Supervision requirements"
          title="What's expected of the employer"
          meta="Decreases as competence increases"
          action={
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06]">
              <Users className="h-4 w-4 text-elec-yellow" />
            </span>
          }
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
          <ul className="space-y-1.5">
            {supervisionRequirements.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ── Apprentice vs hire ──────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Apprentice vs hiring qualified"
          title="The maths on hiring instead"
          meta="What it actually costs to skip the apprenticeship"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <p className="text-[13px] text-white/85 leading-relaxed">
            Hiring a qualified electrician typically costs:
          </p>
          <ul className="space-y-1.5">
            {hireComparison.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
              >
                <AlertTriangle className="h-3.5 w-3.5 text-white/55 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              An apprentice costs significantly less in Year 1–2, becomes
              productive from Year 2, and is fully qualified by Year 4 —
              trained exactly to your standards, loyal to your business, at a
              fraction of the total cost.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── Case study ──────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Case study"
          title="Typical SME electrical contractor"
          meta="6-person firm · £180k payroll · non-levy · 17-yo apprentice on L3"
          action={
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06]">
              <Building2 className="h-4 w-4 text-elec-yellow" />
            </span>
          }
        />
        <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5">
          <ul className="space-y-1.5">
            {caseStudyBullets.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ── Industry stats ──────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Industry statistics"
          title="Six numbers worth knowing"
          meta="The macro case for apprenticeships in UK electrical"
        />
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-3 sm:p-4 text-center space-y-1.5"
            >
              <p className="text-[20px] sm:text-[24px] font-mono font-semibold tabular-nums text-elec-yellow leading-none">
                {stat.value}
              </p>
              <p className="text-[11px] text-white/70 leading-snug">{stat.label}</p>
            </li>
          ))}
        </ul>
      </motion.section>
    </PageFrame>
  );
};

/* ─────────────────── Facts card helper ─────────────────── */

function FactsCard({
  label,
  sublabel,
  items,
  tip,
}: {
  label: string;
  sublabel: string;
  items: string[];
  tip: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
      <div className="space-y-0.5">
        <h3 className="text-[15px] font-semibold text-elec-yellow tracking-tight">
          {label}
        </h3>
        <Eyebrow>{sublabel}</Eyebrow>
      </div>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
        <p className="text-[12px] text-white/85 leading-relaxed">
          <span className="font-semibold text-elec-yellow">Tip: </span>
          {tip}
        </p>
      </div>
    </div>
  );
}

export default EmployerInfoPage;
