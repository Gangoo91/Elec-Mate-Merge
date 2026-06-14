/**
 * Funding · FundingModelsPage — editorial guide to apprenticeship funding models.
 *
 * Three funding models (Levy, Co-Investment, Levy Transfer), DAS flow,
 * funding band breakdown, payment timeline, end-of-programme, and the
 * upcoming Growth & Skills Levy changes.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Workflow,
  Coins,
  HandCoins,
  ArrowRightLeft,
  CalendarDays,
} from 'lucide-react';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import { Eyebrow, SectionHeader } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const dasFlow = [
  'Employer creates a DAS account and adds their PAYE scheme',
  'Employer selects a training provider and agrees a price (up to the funding band max)',
  'Employer adds the apprentice with start date and standard details',
  'Training provider confirms the apprentice on their side',
  'The Department for Education pays the training provider monthly in arrears (around 80% over the programme, the balance on completion)',
  'EPA costs come from a ring-fenced portion of the funding band, released when the apprentice enters gateway',
];

const levyFacts = [
  '0.5% of annual payroll over £3 million',
  '£15,000 annual allowance offset against levy',
  'Government adds 10% top-up (ending 1 August 2026 — existing balances keep it; new contributions are not topped up)',
  'Funds currently expire after 24 months (changing to 12 months April 2026)',
  'Can transfer up to 50% of annual levy to other employers',
  'Funds appear in DAS account monthly, one month in arrears',
  'Oldest funds are used first (first in, first out)',
];

const coInvestmentFacts = [
  'Current split for non-levy SMEs: 95% government / 5% employer',
  '100% funded for under-25s at non-levy employers (from August 2026)',
  'From August 2026 the 25% co-investment applies to levy payers once their levy is exhausted — non-levy SMEs stay at 95% / 5%',
  'Max employer contribution for Level 3 Electrical: £1,150 (5% of £23,000)',
  'Employer uses the apprenticeship service to reserve funding',
  'Employer co-investment paid directly to the training provider',
  'Monthly payments spread across the duration of the apprenticeship',
];

const levyTransferFacts = [
  '100% funded for the receiving employer — zero cost',
  '50% transfer allowance (increased from 25% in April 2024)',
  'Growing availability — more large employers offering transfers',
  'Receiving employer pays nothing towards training costs',
  'Training provider often helps arrange the transfer agreement',
  'Transfer must be set up before the apprenticeship starts',
  'Sending employer can choose to fund specific standards or sectors',
];

const findTransfer = [
  'Ask your training provider — they often have relationships with levy-paying employers',
  'Check the gov.uk levy transfer matching service',
  'Contact large employers in your supply chain (main contractors, house builders)',
  'Speak to your local Chamber of Commerce or LEP',
  'Many training providers offer a free levy transfer matching service',
];

const fundingCovers = [
  'All training delivery by your training provider (classroom, workshop, online)',
  'End Point Assessment fees paid to the EPAO — for ST0152 this is the integrated AM2S run by NET (practical plus embedded knowledge test)',
  'EAL or City & Guilds qualification registration and certification',
  'Functional Skills (English and Maths) delivery and exams if needed',
  'Learning materials provided by the training provider',
  'Initial assessment and diagnostic testing',
  'Progress reviews and tripartite meetings',
  'Internal quality assurance and verification',
];

const fundingDoesntCover = [
  'Apprentice wages (paid by employer — minimum apprentice wage or NMW by age)',
  'Travel to college or training centre (some CITB support available)',
  'Personal tools, equipment, and PPE (employer responsibility)',
  'Additional qualifications beyond the standard (e.g. 18th Edition if not required)',
  'Accommodation during block release training (CITB may cover 80%)',
  'Time spent on normal productive work (only OJT is funded activity)',
];

const paymentTimeline = [
  'Monthly payments — 80% of the agreed price paid in equal monthly instalments over the planned duration',
  'Completion payment — 20% held back, paid when the apprentice completes EPA',
  'EPA funding — a portion of the band is ring-fenced for EPA costs',
  'Payments made in arrears — provider delivers training first, then claims',
  'If an apprentice withdraws early, funding stops and is recalculated pro-rata',
  'Break in learning — funding pauses and resumes when the apprentice returns',
];

const endOfProgramme = [
  {
    step: 1,
    title: 'Gateway meeting',
    description: "Your employer, training provider, and you agree you're ready for EPA.",
  },
  {
    step: 2,
    title: 'EPA registration',
    description: 'Training provider registers you with the EPAO and EPA funding is released.',
  },
  {
    step: 3,
    title: 'EPA delivery',
    description:
      'You complete the integrated AM2S — a practical assessment with an embedded online multiple-choice knowledge test.',
  },
  {
    step: 4,
    title: 'Completion payment',
    description: 'The held-back completion portion is released to the training provider.',
  },
  {
    step: 5,
    title: 'Certificate',
    description:
      'Your apprenticeship completion certificate is issued by the Department for Education.',
  },
];

const growthLevyChanges = [
  'Levy funds will expire after 12 months (currently 24 months)',
  'The 10% government top-up ends from 1 August 2026 (existing balances keep it)',
  'New fundable "apprenticeship units" — short modules of roughly 30–140 hours, up to half of a levy pot',
  'Levy will also fund non-apprenticeship training for the first time',
  'Skills England will decide which non-apprenticeship courses qualify',
  'From August 2026, levy payers who exhaust their levy pay 25% co-investment (non-levy SMEs stay at 95% / 5%)',
  '100% funding for under-25s at non-levy employers (from August 2026)',
  'From April 2026, Level 7 apprenticeships are unfunded for new starters aged 22 and over',
  'Existing apprentices already on programme will not be affected mid-way',
  'New starts from April 2026 will be under the new rules',
];

const keyDates = [
  {
    date: 'Apr 2026',
    event:
      'Growth & Skills Levy replaces Apprenticeship Levy. 12-month fund expiry begins. Level 7 apprenticeships become unfunded for new starters aged 22+.',
  },
  {
    date: 'Aug 2026',
    event:
      '10% top-up ends for new contributions. Levy payers who exhaust their levy pay 25% co-investment; non-levy SMEs stay at 95% / 5% and under-25s become 100% funded.',
  },
  {
    date: '2026–27',
    event:
      'Skills England to publish list of approved non-apprenticeship courses fundable under Growth & Skills Levy.',
  },
];

const FundingModelsPage = () => {
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
          title="Funding models"
          description="How apprenticeship training is paid for in England — the three funding models, the DAS flow, what the £23,000 covers, and the changes coming with the Growth & Skills Levy."
          tone="yellow"
        />
      </motion.div>

      {/* ── Intro ───────────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2">
          <Eyebrow>How it works</Eyebrow>
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            Apprenticeship training in England is funded by the Department for Education (DfE) —
            which absorbed the former Education and Skills Funding Agency when it closed in March
            2025. Skills England — which replaced IfATE in June 2025 — sets the standards and
            funding bands. Three main models determine how training costs are paid.
          </p>
          <p className="text-[12px] text-white/65 leading-relaxed pt-2 border-t border-white/[0.06]">
            This is the England system. Wales, Scotland and Northern Ireland fund apprenticeships
            differently — there's no Digital Apprenticeship Service or £23,000 band, so check your
            nation's scheme if you're outside England.
          </p>
        </div>
      </motion.div>

      {/* ── DAS flow ────────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="How DAS works"
          title="The Digital Apprenticeship Service"
          meta="All funding flows through apprenticeships.education.gov.uk"
          action={
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06]">
              <Workflow className="h-4 w-4 text-elec-yellow" />
            </span>
          }
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <ol className="space-y-2">
            {dasFlow.map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06] text-[11px] font-mono font-semibold tabular-nums text-elec-yellow flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-[12.5px] text-white/85 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              <span className="font-semibold text-elec-yellow">Key point:</span> money never passes
              through the apprentice. The Department for Education pays the training provider
              directly, and the employer pays any co-investment share directly to the provider.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── Model 1: Apprenticeship Levy ────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Model 1 — Apprenticeship Levy"
          title="For large employers (>£3m payroll)"
          meta="0.5% of payroll, sits in a DAS account, funds training"
          action={
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06]">
              <Coins className="h-4 w-4 text-elec-yellow" />
            </span>
          }
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <ul className="space-y-1.5">
            {levyFacts.map((fact) => (
              <li
                key={fact}
                className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-1.5">
            <Eyebrow className="text-elec-yellow/85">Worked example · £5m payroll</Eyebrow>
            <ul className="space-y-0.5 text-[11.5px] sm:text-[12.5px] text-white/85 font-mono tabular-nums">
              <li>Annual payroll: £5,000,000</li>
              <li>Levy charge (0.5%): £25,000</li>
              <li>− £15,000 allowance = £10,000 actual levy paid</li>
              <li>+ 10% top-up = £1,000</li>
              <li className="font-semibold text-elec-yellow pt-1 border-t border-elec-yellow/15">
                Total available for training: £11,000/year
              </li>
            </ul>
            <p className="text-[11.5px] text-white/70 leading-relaxed pt-1">
              Enough to fund approximately one Level 3 electrical apprentice every two years at the
              £23,000 band.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── Model 2: Co-Investment ──────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Model 2 — Government co-investment"
          title="For SMEs under £3m payroll"
          meta="Most common model for small electrical contractors"
          action={
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06]">
              <HandCoins className="h-4 w-4 text-elec-yellow" />
            </span>
          }
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <ul className="space-y-1.5">
            {coInvestmentFacts.map((fact) => (
              <li
                key={fact}
                className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-1.5">
            <Eyebrow className="text-elec-yellow/85">
              Worked example · SME taking on L3 apprentice
            </Eyebrow>
            <ul className="space-y-0.5 text-[11.5px] sm:text-[12.5px] text-white/85 font-mono tabular-nums">
              <li>Agreed training price: £23,000 (full funding band)</li>
              <li>Government pays (95%): £21,850</li>
              <li>Employer pays (5%): £1,150</li>
              <li>Spread over 4 years: ~£24/month</li>
              <li className="font-semibold text-elec-yellow pt-1 border-t border-elec-yellow/15">
                Apprentice pays: £0
              </li>
            </ul>
            <p className="text-[11.5px] text-white/70 leading-relaxed pt-1">
              The 25% co-investment coming in August 2026 applies to levy payers once their levy is
              exhausted — most small electrical contractors are non-levy and stay at 5% (£1,150),
              with under-25s 100% funded.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── Model 3: Levy Transfer ──────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Model 3 — Levy transfer"
          title="The best deal for small employers"
          meta="100% funded — receiving employer pays nothing"
          action={
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06]">
              <ArrowRightLeft className="h-4 w-4 text-elec-yellow" />
            </span>
          }
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <ul className="space-y-1.5">
            {levyTransferFacts.map((fact) => (
              <li
                key={fact}
                className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-2">
            <Eyebrow className="text-elec-yellow/85">How to find a levy transfer</Eyebrow>
            <ol className="space-y-1.5">
              {findTransfer.map((tip, i) => (
                <li
                  key={tip}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <span className="text-elec-yellow font-mono tabular-nums mt-0.5">{i + 1}.</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </motion.section>

      {/* ── Funding band detail ─────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Funding band detail"
          title="£23,000 for Level 3"
          meta="Increased from £21,000 on 20 July 2025"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <div className="space-y-1">
            <p className="text-[32px] sm:text-[36px] font-mono font-semibold tabular-nums text-elec-yellow leading-none">
              £23,000
            </p>
            <p className="text-[12.5px] text-white/70 leading-relaxed">
              Maximum funding for Level 3 Installation / Maintenance Electrician (ST0152 v1.2)
            </p>
          </div>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-1">
            <Eyebrow className="text-elec-yellow/85">What's a funding band?</Eyebrow>
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              The maximum amount the government will contribute towards training. Employers and
              providers can agree a price below the band, but never above. If a provider charges
              more, the employer pays the difference from their own funds — rare for standard L3
              electrical programmes.
            </p>
          </div>
          <div className="space-y-2">
            <Eyebrow>What funding covers</Eyebrow>
            <ul className="space-y-1.5">
              {fundingCovers.map((item) => (
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
            <Eyebrow>What funding doesn't cover</Eyebrow>
            <ul className="space-y-1.5">
              {fundingDoesntCover.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <AlertTriangle className="h-3.5 w-3.5 text-white/55 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* ── Payment timeline ────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Payment timeline"
          title="80 / 20 split, monthly in arrears"
          meta="When and how funding is paid to your provider"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
          <ul className="space-y-1.5">
            {paymentTimeline.map((item) => (
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

      {/* ── End of programme ────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="End of programme"
          title="Five steps from Gateway to certificate"
          meta="What happens when you reach the end of your planned training"
        />
        <ol className="space-y-2">
          {endOfProgramme.map((item) => (
            <li
              key={item.step}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[12px] font-mono font-semibold tabular-nums text-elec-yellow flex-shrink-0">
                  {item.step}
                </span>
                <div className="space-y-1">
                  <h3 className="text-[14px] font-semibold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-white/85 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
          <p className="text-[12.5px] text-white/85 leading-relaxed">
            <span className="font-semibold text-elec-yellow">Important:</span> If your
            apprenticeship takes longer than planned (common for L3 electrical), funding continues
            as long as you remain on programme. Total paid won't exceed the funding band, but
            monthly payments may be recalculated over the extended period.
          </p>
        </div>
      </motion.section>

      {/* ── Growth & Skills Levy ────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Upcoming changes"
          title="Growth & Skills Levy — April 2026"
          meta="Biggest change to apprenticeship funding in a decade"
        />
        <div className="rounded-xl border border-red-500/25 bg-red-500/[0.04] p-4 sm:p-5">
          <ul className="space-y-1.5">
            {growthLevyChanges.map((item) => (
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
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <Eyebrow>Key dates to watch</Eyebrow>
          <ul className="space-y-2">
            {keyDates.map((item) => (
              <li key={item.date} className="flex items-start gap-3">
                <CalendarDays className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span className="text-[12px] font-mono uppercase tracking-[0.14em] text-elec-yellow min-w-[80px] flex-shrink-0">
                  {item.date}
                </span>
                <span className="text-[12.5px] text-white/85 leading-relaxed">{item.event}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>
    </PageFrame>
  );
};

export default FundingModelsPage;
