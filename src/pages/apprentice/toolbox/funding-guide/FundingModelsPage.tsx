/**
 * Funding · FundingModelsPage — editorial guide to apprenticeship funding models.
 *
 * Three funding models (Levy, Co-Investment, Levy Transfer), DAS flow,
 * funding band breakdown, payment timeline, end-of-programme, and the
 * upcoming Growth & Skills Levy changes.
 */

import { motion } from 'framer-motion';
import {
  CheckCircle2,
  AlertTriangle,
  Workflow,
  Coins,
  HandCoins,
  ArrowRightLeft,
  CalendarDays,
} from 'lucide-react';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { Eyebrow, SectionHeader } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

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
  'Government has announced full funding for under-25s at small and medium employers — check the DfE funding rules for whether it applies to your start date',
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
  'Announced in 2024 to replace the Apprenticeship Levy, and being introduced in stages rather than on one date',
  'Minimum apprenticeship duration cut from 12 months to 8 months for starts from 1 August 2025',
  'Foundation apprenticeships for young people introduced from August 2025',
  'Level 7 apprenticeships lose public funding for new starters aged 22 and over from January 2026',
  'Full funding announced for under-25s at small and medium employers — check the current rules for the start date and conditions',
  'Shorter fundable courses are planned alongside full apprenticeships — Skills England is working through what qualifies',
  'Apprentices already on programme are not moved onto new rules mid-way',
  'The DfE apprenticeship funding rules for the year you start are the authoritative text — everything here is a summary',
];

const keyDates = [
  {
    date: 'Aug 2025',
    event:
      'Minimum apprenticeship duration drops to 8 months. Foundation apprenticeships launch. Off-the-job training becomes a fixed number of hours set by each standard.',
  },
  {
    date: 'Jan 2026',
    event: 'Level 7 apprenticeships lose public funding for new starters aged 22 and over.',
  },
  {
    date: '2026–27',
    event:
      'Further Growth & Skills Levy changes roll out — the DfE apprenticeship funding rules 2026 to 2027 set the detail, including support for under-25s at smaller employers.',
  },
];

const FundingModelsPage = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Funding"
        title="Funding models"
        backTo="/apprentice/toolbox/apprenticeship-funding"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          {
            'How apprenticeship training is paid for in England — the three funding models, the DAS flow, what the £23,000 covers, and the changes coming with the Growth & Skills Levy.'
          }
        </p>

        {/* ── Intro ───────────────────────────────────────────────── */}
        <motion.div variants={itemVariants}>
          <div
            className={cn(
              'rounded-2xl border border-elec-yellow/35 p-4 sm:p-5 space-y-2',
              CARD_SURFACE
            )}
          >
            <Eyebrow>How it works</Eyebrow>
            <p className="text-[13.5px] text-white leading-relaxed">
              Apprenticeship training in England is funded by the Department for Education (DfE) —
              which absorbed the former Education and Skills Funding Agency when it closed in March
              2025. Skills England — which replaced IfATE in June 2025 — sets the standards and
              funding bands. Three main models determine how training costs are paid.
            </p>
            <p className="text-[12px] text-white leading-relaxed pt-2 border-t border-white/[0.06]">
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
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-elec-yellow/25 bg-white/[0.05]">
                <Workflow className="h-4 w-4 text-elec-yellow" />
              </span>
            }
          />
          <div
            className={cn(
              'rounded-2xl border border-elec-yellow/35 p-4 sm:p-5 space-y-3',
              CARD_SURFACE
            )}
          >
            <ol className="space-y-2">
              {dasFlow.map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-md border border-elec-yellow/25 bg-white/[0.05] text-[11px] font-mono font-semibold tabular-nums text-elec-yellow flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-[12.5px] text-white leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
            <div className="rounded-md border border-elec-yellow/20 bg-white/[0.05] p-3">
              <p className="text-[12.5px] text-white leading-relaxed">
                <span className="font-semibold text-elec-yellow">Key point:</span> money never
                passes through the apprentice. The Department for Education pays the training
                provider directly, and the employer pays any co-investment share directly to the
                provider.
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
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-elec-yellow/25 bg-white/[0.05]">
                <Coins className="h-4 w-4 text-elec-yellow" />
              </span>
            }
          />
          <div
            className={cn(
              'rounded-2xl border border-elec-yellow/35 p-4 sm:p-5 space-y-3',
              CARD_SURFACE
            )}
          >
            <ul className="space-y-1.5">
              {levyFacts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-2 text-[12.5px] text-white leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-md border border-elec-yellow/20 bg-white/[0.05] p-3 space-y-1.5">
              <Eyebrow className="text-elec-yellow/85">Worked example · £5m payroll</Eyebrow>
              <ul className="space-y-0.5 text-[11.5px] sm:text-[12.5px] text-white font-mono tabular-nums">
                <li>Annual payroll: £5,000,000</li>
                <li>Levy charge (0.5%): £25,000</li>
                <li>− £15,000 allowance = £10,000 actual levy paid</li>
                <li>+ 10% top-up = £1,000</li>
                <li className="font-semibold text-elec-yellow pt-1 border-t border-elec-yellow/15">
                  Total available for training: £11,000/year
                </li>
              </ul>
              <p className="text-[11.5px] text-white leading-relaxed pt-1">
                Enough to fund approximately one Level 3 electrical apprentice every two years at
                the £23,000 band.
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
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-elec-yellow/25 bg-white/[0.05]">
                <HandCoins className="h-4 w-4 text-elec-yellow" />
              </span>
            }
          />
          <div
            className={cn(
              'rounded-2xl border border-elec-yellow/35 p-4 sm:p-5 space-y-3',
              CARD_SURFACE
            )}
          >
            <ul className="space-y-1.5">
              {coInvestmentFacts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-2 text-[12.5px] text-white leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-md border border-elec-yellow/20 bg-white/[0.05] p-3 space-y-1.5">
              <Eyebrow className="text-elec-yellow/85">
                Worked example · SME taking on L3 apprentice
              </Eyebrow>
              <ul className="space-y-0.5 text-[11.5px] sm:text-[12.5px] text-white font-mono tabular-nums">
                <li>Agreed training price: £23,000 (full funding band)</li>
                <li>Government pays (95%): £21,850</li>
                <li>Employer pays (5%): £1,150</li>
                <li>Spread over 4 years: ~£24/month</li>
                <li className="font-semibold text-elec-yellow pt-1 border-t border-elec-yellow/15">
                  Apprentice pays: £0
                </li>
              </ul>
              <p className="text-[11.5px] text-white leading-relaxed pt-1">
                Most small electrical contractors are non-levy and pay the 5% co-investment (a
                maximum of £1,150 on the £23,000 band). Full funding for under-25s at smaller
                employers has been announced — the DfE funding rules confirm when it applies.
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
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-elec-yellow/25 bg-white/[0.05]">
                <ArrowRightLeft className="h-4 w-4 text-elec-yellow" />
              </span>
            }
          />
          <div
            className={cn(
              'rounded-2xl border border-elec-yellow/35 p-4 sm:p-5 space-y-3',
              CARD_SURFACE
            )}
          >
            <ul className="space-y-1.5">
              {levyTransferFacts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-2 text-[12.5px] text-white leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-md border border-elec-yellow/20 bg-white/[0.05] p-3 space-y-2">
              <Eyebrow className="text-elec-yellow/85">How to find a levy transfer</Eyebrow>
              <ol className="space-y-1.5">
                {findTransfer.map((tip, i) => (
                  <li
                    key={tip}
                    className="flex items-start gap-2 text-[12.5px] text-white leading-relaxed"
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
          <div
            className={cn(
              'rounded-2xl border border-elec-yellow/35 p-4 sm:p-5 space-y-4',
              CARD_SURFACE
            )}
          >
            <div className="space-y-1">
              <p className="text-[32px] sm:text-[36px] font-mono font-semibold tabular-nums text-elec-yellow leading-none">
                £23,000
              </p>
              <p className="text-[12.5px] text-white leading-relaxed">
                Maximum funding for Level 3 Installation / Maintenance Electrician (ST0152 v1.2)
              </p>
            </div>
            <div className="rounded-md border border-elec-yellow/20 bg-white/[0.05] p-3 space-y-1">
              <Eyebrow className="text-elec-yellow/85">What's a funding band?</Eyebrow>
              <p className="text-[12.5px] text-white leading-relaxed">
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
                    className="flex items-start gap-2 text-[12.5px] text-white leading-relaxed"
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
                    className="flex items-start gap-2 text-[12.5px] text-white leading-relaxed"
                  >
                    <AlertTriangle className="h-3.5 w-3.5 text-white flex-shrink-0 mt-0.5" />
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
          <div className={cn('rounded-2xl border border-elec-yellow/35 p-4 sm:p-5', CARD_SURFACE)}>
            <ul className="space-y-1.5">
              {paymentTimeline.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[12.5px] text-white leading-relaxed"
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
                className={cn('rounded-2xl border border-elec-yellow/35 p-4 sm:p-5', CARD_SURFACE)}
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-elec-yellow/30 bg-white/[0.05] text-[12px] font-mono font-semibold tabular-nums text-elec-yellow flex-shrink-0">
                    {item.step}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-[14px] font-semibold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-white leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div className="rounded-md border border-elec-yellow/20 bg-white/[0.05] p-3">
            <p className="text-[12.5px] text-white leading-relaxed">
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
            eyebrow="What changed in 2026"
            title="Growth & Skills Levy — what is changing"
            meta="The biggest change to apprenticeship funding in a decade"
          />
          <div className="rounded-xl border border-red-500/25 bg-red-500/[0.04] p-4 sm:p-5">
            <ul className="space-y-1.5">
              {growthLevyChanges.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[12.5px] text-white leading-relaxed"
                >
                  <AlertTriangle className="h-3.5 w-3.5 text-red-300 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={cn(
              'rounded-2xl border border-elec-yellow/35 p-4 sm:p-5 space-y-3',
              CARD_SURFACE
            )}
          >
            <Eyebrow>Key dates to watch</Eyebrow>
            <ul className="space-y-2">
              {keyDates.map((item) => (
                <li key={item.date} className="flex items-start gap-3">
                  <CalendarDays className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <span className="text-[12px] font-mono uppercase tracking-[0.14em] text-elec-yellow min-w-[80px] flex-shrink-0">
                    {item.date}
                  </span>
                  <span className="text-[12.5px] text-white leading-relaxed">{item.event}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      </HubBody>
    </HubPage>
  );
};

export default FundingModelsPage;
