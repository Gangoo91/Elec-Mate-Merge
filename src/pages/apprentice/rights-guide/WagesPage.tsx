import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import { PageFrame, PageHero, SectionHeader, itemVariants } from '@/components/college/primitives';
import { DEFAULT_OTJ_STANDARD } from '@/data/otjStandards';

const WagesPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/rights-and-pay')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Rights"
          title="Wages & pay"
          description="At least the National Minimum Wage applies. Many employers pay above. Knowing your entitlements helps you spot problems early — and gives you the words for a conversation when something looks off."
          tone="yellow"
        />
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-4">
        <SectionHeader eyebrow="Current rates" title="From April 2026" />
        <div className="border-0 bg-transparent sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)]">
          <div className="py-4 sm:p-5 space-y-3">
            {[
              { age: 'Apprentice rate (Year 1, any age)', rate: '£8.00/hr' },
              { age: 'Under 18 (after Year 1)', rate: '£8.00/hr' },
              { age: '18–20 (after Year 1)', rate: '£10.85/hr' },
              { age: '21+ (after Year 1, National Living Wage)', rate: '£12.71/hr' },
            ].map((item) => (
              <div
                key={item.age}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]"
              >
                <span className="text-white text-sm">{item.age}</span>
                <span className="text-elec-yellow font-bold text-sm tabular-nums">{item.rate}</span>
              </div>
            ))}
            <p className="text-[11.5px] text-white/60 leading-relaxed">
              The apprentice rate (£8.00/hr from 1 April 2026) applies in Year 1 at any age. After
              that you move to the National Minimum Wage for your age band, and apprentices aged 21
              and over must be paid at least the National Living Wage. Rates change each April —
              check gov.uk before you sign anything.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-4">
        <SectionHeader eyebrow="Entitlements" title="What you should be paid for" />
        <div className="border-0 bg-transparent sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)]">
          <div className="py-4 sm:p-5 space-y-2">
            <ul className="space-y-2.5">
              {[
                'All hours worked on site, including travel between sites during the day',
                `Time at college or off-the-job training (a fixed number of hours set by your standard — ${DEFAULT_OTJ_STANDARD.otjHours.toLocaleString('en-GB')} hours for the ${DEFAULT_OTJ_STANDARD.name}, ${DEFAULT_OTJ_STANDARD.code}, delivered over the apprenticeship)`,
                'Study time and coursework when it falls inside your working hours',
                'Overtime at your agreed contract rate',
                '28 days paid holiday per year (including bank holidays, pro-rata)',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[13px] text-white/85 leading-relaxed"
                >
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-4">
        <SectionHeader eyebrow="Red Flags" title="When something is wrong" />
        <div className="border-0 bg-transparent sm:rounded-xl sm:border sm:border-red-500/25 sm:bg-red-500/[0.04]">
          <div className="py-4 sm:p-5 space-y-2">
            <ul className="space-y-2.5">
              {[
                'Being asked to pay for your own training, tools, or college fees',
                'Not being paid for college days or study time',
                'Being paid less than the legal minimum wage',
                'Deductions from wages without your written agreement',
                'Not receiving payslips showing hours worked and deductions',
                'Being told you are "self-employed" while working fixed hours for one employer',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[13px] text-white/85 leading-relaxed"
                >
                  <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11.5px] text-red-200/80 leading-relaxed">
              If two or more of these apply to you, that's not normal. Talk to your training
              provider, the JIB, or ACAS before you let it slide. You can check whether you're being
              underpaid with the government's apprentice pay checker at
              checkyourpay.campaign.gov.uk, and report National Minimum Wage underpayment to HMRC —
              they enforce arrears, including back-pay you're owed.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-4">
        <SectionHeader eyebrow="JIB rates" title="The industry-standard scale" />
        <div className="border-0 bg-transparent sm:rounded-xl sm:border sm:border-elec-yellow/25 sm:bg-elec-yellow/[0.04]">
          <div className="py-4 sm:p-5 space-y-3">
            <p className="text-[13px] text-white/80 leading-relaxed">
              The Joint Industry Board (JIB) sets the national pay rates for the UK electrical
              industry — a single rate per stage, not an employer-dependent range. Many employers
              follow JIB grading, which is typically above the legal minimum. Ask your employer
              whether they're a JIB member.
            </p>
            <div className="space-y-2">
              {[
                { stage: 'Stage 1 Apprentice', rate: '£8.16/hr' },
                { stage: 'Stage 2 Apprentice', rate: '£10.60/hr' },
                { stage: 'Stage 3 Apprentice', rate: '£13.05/hr' },
                { stage: 'Stage 4 Apprentice', rate: '£14.03/hr' },
              ].map((item) => (
                <div
                  key={item.stage}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]"
                >
                  <span className="text-white text-sm">{item.stage}</span>
                  <span className="text-elec-yellow font-bold text-sm tabular-nums">
                    {item.rate}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11.5px] text-white/60 leading-relaxed">
              National rates effective 5 January 2026. A London premium adds roughly £0.98 to
              £1.69/hr depending on stage. Whatever the JIB stage rate, an apprentice aged 21 or
              over must receive at least the National Living Wage (£12.71/hr from April 2026) where
              it's higher. Check the latest JIB National Working Rules for the current figures.
            </p>
          </div>
        </div>
      </motion.section>
    </PageFrame>
  );
};

export default WagesPage;
