import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  SectionHeader,
  itemVariants,
} from '@/components/college/primitives';

const WagesPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice/rights-and-pay')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
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
        <Card className="border-white/10 bg-[hsl(0_0%_10%)]">
          <CardContent className="p-5 space-y-3">
            {[
              { age: 'Apprentice rate (Year 1, any age)', rate: '£8.00/hr' },
              { age: 'Under 18 (after Year 1)', rate: '£8.00/hr' },
              { age: '18–20 (after Year 1)', rate: 'Age-band NMW' },
              { age: '21+ (after Year 1)', rate: 'Adult NMW' },
            ].map((item) => (
              <div
                key={item.age}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]"
              >
                <span className="text-white text-sm">{item.age}</span>
                <span className="text-elec-yellow font-bold text-sm tabular-nums">
                  {item.rate}
                </span>
              </div>
            ))}
            <p className="text-[11.5px] text-white/60 leading-relaxed">
              After Year 1 you move to the National Minimum Wage for your age band — figures change
              each April. Check gov.uk for the current rate before you sign anything.
            </p>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-4">
        <SectionHeader eyebrow="Entitlements" title="What you should be paid for" />
        <Card className="border-white/10 bg-[hsl(0_0%_10%)]">
          <CardContent className="p-5 space-y-2">
            <ul className="space-y-2.5">
              {[
                'All hours worked on site, including travel between sites during the day',
                'Time at college or off-the-job training (minimum 20% of your contracted hours)',
                'Study time and coursework when it falls inside your working hours',
                'Overtime at your agreed contract rate',
                '28 days paid holiday per year (including bank holidays, pro-rata)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/85 leading-relaxed">
                  <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-4">
        <SectionHeader eyebrow="Red Flags" title="When something is wrong" />
        <Card className="border-red-500/20 bg-red-500/[0.04]">
          <CardContent className="p-5 space-y-2">
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
              provider, the JIB, or ACAS before you let it slide.
            </p>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-4">
        <SectionHeader eyebrow="JIB rates" title="The industry-standard scale" />
        <Card className="border-elec-yellow/20 bg-elec-yellow/[0.04]">
          <CardContent className="p-5 space-y-3">
            <p className="text-[13px] text-white/80 leading-relaxed">
              The Joint Industry Board (JIB) sets recommended pay rates for the UK electrical
              industry. Many employers follow JIB grading, which is typically above the legal
              minimum. Ask your employer whether they're a JIB member.
            </p>
            <div className="space-y-2">
              {[
                { stage: 'Stage 1 Apprentice', rate: '£7.86–£9.50/hr (employer dependent)' },
                { stage: 'Stage 2 Apprentice', rate: '£9.50–£12.00/hr (employer dependent)' },
                { stage: 'Stage 3 Apprentice', rate: '£12.00–£14.50/hr (employer dependent)' },
              ].map((item) => (
                <div
                  key={item.stage}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]"
                >
                  <span className="text-white text-sm">{item.stage}</span>
                  <span className="text-elec-yellow font-medium text-[12px] tabular-nums">
                    {item.rate}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11.5px] text-white/60 leading-relaxed">
              JIB rates are updated annually. The figures above are indicative ranges — check the
              latest JIB National Working Rules for the current week's rate.
            </p>
          </CardContent>
        </Card>
      </motion.section>
    </PageFrame>
  );
};

export default WagesPage;
