/**
 * Funding · GrantsPage — editorial grants & incentives guide.
 *
 * CITB grants (attendance + completion), travel & accommodation, age
 * incentive, care leaver bursary, learning support, NI relief, other
 * industry grants, and the full 4-year financial summary.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, AlertTriangle, Banknote, Award, PiggyBank } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import { Eyebrow, SectionHeader } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const citbBreakdown = [
  'Year 1 attendance grant: £2,500 (paid quarterly every 13 weeks)',
  'Year 2 attendance grant: £2,500 (paid quarterly every 13 weeks)',
  'Year 3 attendance grant: £2,500 (paid quarterly every 13 weeks)',
  'Year 4 attendance grant: £2,500 (paid quarterly every 13 weeks)',
  'Completion bonus: £3,500 (paid on successful completion)',
  'Total: £13,500 over full programme',
];

const citbEligibility = [
  'Employer must be registered with CITB',
  'Employer must be paying the CITB levy (separate from Apprenticeship Levy)',
  'Apprentice must be on an approved construction apprenticeship programme',
  'Claims must be submitted within 52 weeks of the qualifying date',
  'Apprentice must meet minimum attendance requirements',
  'Employer must be up to date with CITB levy payments',
];

const citbClaimSteps = [
  'Log in to the CITB grants portal at citb.co.uk',
  'Register the apprentice within 12 weeks of their start date',
  'Upload the apprenticeship agreement and commitment statement',
  'Submit attendance evidence every 13 weeks (training provider confirms)',
  'Claim is verified and paid within 20 working days',
  'Submit completion claim once the apprentice passes their EPA',
];

const citbMistakes = [
  'Late registration — register within 12 weeks of start date',
  'Missing quarterly claim deadlines (52-week window)',
  'Not having up-to-date CITB levy payments',
  'Forgetting to submit the completion claim after EPA',
  'Not keeping evidence of attendance on file',
];

const travelFacts = [
  'CITB covers 80% of eligible travel and accommodation costs',
  'Applies when the training centre is over 50 miles from home or workplace',
  'Also applies to block release training requiring overnight stays',
  'Employer claims through the same CITB grants portal',
  'Receipts and evidence of travel required for claims',
  "Doesn't cover daily commuting to a local college",
];

const ageIncentive = [
  '£1,000 for apprentices aged 16–18 at the start',
  '£1,000 for apprentices aged 19–24 with an EHC plan or care leaver status',
  'Paid in two £500 instalments (commonly at day 90 and day 365)',
  'Paid by government to the training provider, who passes the full £1,000 to the employer',
  'Meant to help with the costs of supporting the apprentice',
  'Automatic — no separate claim needed once registered on DAS',
];

const careLeaverFacts = [
  '£1,000 paid directly to the apprentice',
  'Must be aged 16–24 and a care leaver',
  'Paid by the training provider from government (DfE) funding',
  'Separate from the £1,000 age incentive paid to employers',
  'Can be used for travel, equipment, clothing, or other costs',
];

const learningSupportFacts = [
  'Up to £150 per month additional learning support funding',
  'Covers specialist equipment, software, or adapted materials',
  'One-to-one support workers or learning assistants',
  'Available for dyslexia, ADHD, autism, physical disabilities, and other needs',
  'Claimed by the training provider on top of the funding band',
  "Doesn't reduce the £23,000 available for training",
  'Requires an initial assessment and evidence of need',
];

const taxBenefits = [
  'Employer NI relief: zero employer NI contributions for apprentices under 25',
  'Saves approximately £2,000–£3,000 per year depending on wages',
  'Apprenticeship training costs are an allowable business expense',
  'CITB levy payments are also tax-deductible',
  'Apprentice wages are deductible as normal employment costs',
];

const otherGrants = [
  {
    title: 'JIB member support',
    description:
      'The JIB (and its welfare and benefit schemes) supports registered electrical operatives and employers — check jib.org.uk for current member support, as terms change.',
  },
  {
    title: 'ECA training support',
    description:
      'Varies — available to Electrical Contractors Association members. Training subsidies, mentoring support, and access to ECA training events. Check eca.co.uk for current terms.',
  },
  {
    title: 'Local authority grants',
    description:
      'Varies by area — some local authorities offer additional grants of £500–£2,000 for employers taking on apprentices in skills-shortage areas.',
  },
  {
    title: 'Regional skills fund',
    description:
      'Up to £1,000 in certain regions — availability depends on your area. Combined authorities (Greater Manchester, West Midlands) often run their own schemes.',
  },
  {
    title: 'Local Youth Hub support',
    description:
      'Some areas run youth employment hubs providing additional support — travel, work clothing, and tools. Ask your training provider or local Jobcentre Plus.',
  },
];

const employerReceives = [
  { label: 'Government-funded training', value: '£23,000' },
  { label: 'CITB attendance grants (4 years)', value: '£10,000' },
  { label: 'CITB completion bonus', value: '£3,500' },
  { label: 'Age incentive (if 16–18)', value: '£1,000' },
  { label: 'NI relief (approx. over 4 years)', value: '£8,000+' },
];

const employerPays = [
  { label: 'Co-investment (5% of £23k)', value: '£1,150' },
  { label: 'Apprentice wages (4 years approx.)', value: '£64,000' },
];

const GrantsPage = () => {
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
          title="Grants & incentives"
          description="Beyond the £23,000 training fund — CITB grants, travel support, age incentives, care leaver bursary, learning support, NI relief, and other industry grants."
          tone="yellow"
        />
      </motion.div>

      {/* ── Headline number ─────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2">
          <Eyebrow className="text-elec-yellow/85">Total potential funding</Eyebrow>
          <p className="text-[36px] sm:text-[42px] font-mono font-semibold tabular-nums text-elec-yellow leading-none">
            £14,500+
          </p>
          <p className="text-[13px] text-white/85 leading-relaxed">
            Available to eligible employers on top of the £23,000 apprenticeship training fund —
            CITB grants, age incentives, and tax savings combined.
          </p>
        </div>
      </motion.div>

      {/* ── What you can claim (apprentice) ─────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="What you can claim"
          title="Support aimed at you, not the employer"
          meta="Most grants on this page go to the employer — these are yours"
          action={
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06]">
              <PiggyBank className="h-4 w-4 text-elec-yellow" />
            </span>
          }
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
          <ul className="space-y-1.5">
            {[
              'Care leaver bursary — £1,000 paid directly to you if you are a care leaver aged 16–24 (see below)',
              '16 to 19 Bursary Fund — help with travel, kit or meals for under-19s on some study programmes; ask your college',
              'Additional learning support — adjustments and equipment if you have a disability or learning need (claimed by your provider)',
              "Travel to college is usually the employer's or CITB's call rather than a grant you claim — ask your employer first",
            ].map((item) => (
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

      {/* ── CITB grants ─────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="CITB grants"
          title="£13,500 over 4 years"
          meta="Construction Industry Training Board attendance + completion"
          action={
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06]">
              <Banknote className="h-4 w-4 text-elec-yellow" />
            </span>
          }
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <ul className="space-y-1.5">
            {citbBreakdown.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-1">
            <Eyebrow className="text-elec-yellow/85">Quarterly payment schedule (per year)</Eyebrow>
            <ul className="text-[12.5px] font-mono tabular-nums text-white/85 space-y-0.5">
              <li>Q1 (weeks 1–13): £625</li>
              <li>Q2 (weeks 14–26): £625</li>
              <li>Q3 (weeks 27–39): £625</li>
              <li>Q4 (weeks 40–52): £625</li>
              <li className="font-semibold text-elec-yellow pt-1 border-t border-elec-yellow/15">
                Annual total: £2,500
              </li>
            </ul>
            <p className="text-[11.5px] text-white/70 leading-relaxed pt-1">
              Payments made after each 13-week period, subject to attendance requirements and a
              valid claim.
            </p>
          </div>
          <div className="space-y-2 pt-2 border-t border-white/[0.04]">
            <Eyebrow>Eligibility</Eyebrow>
            <ul className="space-y-1.5">
              {citbEligibility.map((item) => (
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
          <div className="space-y-2 pt-2 border-t border-white/[0.04]">
            <Eyebrow>How to claim — step by step</Eyebrow>
            <ol className="space-y-1.5">
              {citbClaimSteps.map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <span className="text-elec-yellow font-mono tabular-nums mt-0.5">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-md border border-red-500/25 bg-red-500/[0.04] p-3 space-y-2">
            <Eyebrow className="text-red-300">Common claim mistakes to avoid</Eyebrow>
            <ul className="space-y-1.5">
              {citbMistakes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <AlertTriangle className="h-3.5 w-3.5 text-red-300 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* ── CITB Travel ─────────────────────────────────────────── */}
      <FundingCard
        eyebrow="CITB travel & accommodation"
        title="Up to 80% covered for distant training"
        meta="50+ miles or block release with overnight stays"
        items={travelFacts}
      />

      {/* ── Age incentive ──────────────────────────────────────── */}
      <FundingCard
        eyebrow="Age incentive"
        title="£1,000 for under-19s + EHC / care leavers"
        meta="Two £500 instalments, passed to the employer"
        items={ageIncentive}
      />

      {/* ── Care leaver bursary ─────────────────────────────────── */}
      <FundingCard
        eyebrow="Care leaver bursary"
        title="£1,000 paid directly to the apprentice"
        meta="Separate from the employer age incentive"
        items={careLeaverFacts}
      />

      {/* ── Learning support ────────────────────────────────────── */}
      <FundingCard
        eyebrow="Additional learning support"
        title="Up to £150/month for additional needs"
        meta="Dyslexia, ADHD, autism, physical disabilities, more"
        items={learningSupportFacts}
      />

      {/* ── Tax benefits ────────────────────────────────────────── */}
      <FundingCard
        eyebrow="Tax benefits for employers"
        title="NI relief + allowable expenses"
        meta="Saves £2,000–£3,000/year for under-25 apprentices"
        items={taxBenefits}
        icon={PiggyBank}
      />

      {/* ── Other industry grants ───────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Other industry grants"
          title="Five lesser-known funding routes"
          meta="JIB · ECA · local authorities · regional · youth hubs"
        />
        <ul className="space-y-2">
          {otherGrants.map((grant) => (
            <li
              key={grant.title}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5"
            >
              <div className="flex items-start gap-2.5">
                <Award className="h-4 w-4 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-[14px] font-semibold text-elec-yellow tracking-tight">
                    {grant.title}
                  </h3>
                  <p className="text-[13px] text-white/85 leading-relaxed">{grant.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Full financial summary ──────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Full financial summary"
          title="4-year Level 3 electrical — the maths"
          meta="What the employer receives vs what the employer pays"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <div className="space-y-2">
            <Eyebrow className="text-elec-yellow/85">Employer receives</Eyebrow>
            <ul className="space-y-1.5">
              {employerReceives.map((row) => (
                <li
                  key={row.label}
                  className="flex items-start justify-between gap-3 text-[12.5px] text-white/85"
                >
                  <span className="min-w-0">{row.label}</span>
                  <span className="font-mono tabular-nums text-elec-yellow font-semibold flex-shrink-0">
                    {row.value}
                  </span>
                </li>
              ))}
              <li className="flex items-start justify-between gap-3 text-[13.5px] text-white pt-1.5 border-t border-elec-yellow/15">
                <span className="font-semibold">Total value</span>
                <span className="font-mono tabular-nums text-elec-yellow font-bold">£45,500+</span>
              </li>
            </ul>
          </div>
          <div className="space-y-2 pt-2 border-t border-white/[0.04]">
            <Eyebrow>Employer pays</Eyebrow>
            <ul className="space-y-1.5">
              {employerPays.map((row) => (
                <li
                  key={row.label}
                  className="flex items-start justify-between gap-3 text-[12.5px] text-white/85"
                >
                  <span className="min-w-0">{row.label}</span>
                  <span className="font-mono tabular-nums text-white font-semibold flex-shrink-0">
                    {row.value}
                  </span>
                </li>
              ))}
              <li className="flex items-start justify-between gap-3 text-[13.5px] text-white pt-1.5 border-t border-white/[0.06]">
                <span className="font-semibold">Total cost</span>
                <span className="font-mono tabular-nums text-white font-bold">£65,150</span>
              </li>
            </ul>
          </div>
          <div className="rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.04] p-3">
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              <span className="font-semibold text-elec-yellow">Net result:</span> After grants and
              tax relief, the true cost of a 4-year apprentice is approximately{' '}
              <span className="font-mono text-elec-yellow">£20,000</span> — and you gain a fully
              qualified electrician trained to your standards. Compared to hiring at £35k+ salary
              plus £5k+ recruitment fees, apprenticeships are significantly better value.
            </p>
          </div>
        </div>
      </motion.section>
    </PageFrame>
  );
};

/* ─────────────────── Funding card helper ─────────────────── */

function FundingCard({
  eyebrow,
  title,
  meta,
  items,
  icon: Icon = Banknote,
}: {
  eyebrow: string;
  title: string;
  meta: string;
  items: string[];
  icon?: LucideIcon;
}) {
  return (
    <motion.section variants={itemVariants} className="space-y-3">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        meta={meta}
        action={
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06]">
            <Icon className="h-4 w-4 text-elec-yellow" />
          </span>
        }
      />
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
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
      </div>
    </motion.section>
  );
}

export default GrantsPage;
