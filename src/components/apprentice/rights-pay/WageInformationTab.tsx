// Imports trimmed for editorial restraint redesign
import { UK_MINIMUM_WAGE, JIB_RATES_2026 } from '@/data/ukRates';

const WageInformationTab = () => {
  const currentRates = {
    apprenticeMinimum: UK_MINIMUM_WAGE.apprentice,
    under18: UK_MINIMUM_WAGE.under18,
    age18to20: UK_MINIMUM_WAGE.age18to20,
    nationalLivingWage: UK_MINIMUM_WAGE.nlw21Plus,
    period: '2026/27 (from 1 April 2026)',
  };

  const ageBasedRates = [
    {
      age: 'Apprentice (any age, Year 1)',
      rate: UK_MINIMUM_WAGE.apprentice,
      description: 'First year of apprenticeship or under 19',
    },
    {
      age: 'Under 18 (non-apprentice)',
      rate: UK_MINIMUM_WAGE.under18,
      description: 'Same as apprentice rate',
    },
    {
      age: '18-20',
      rate: UK_MINIMUM_WAGE.age18to20,
      description: 'Applies after first year if aged 18-20',
    },
    {
      age: '21+ (National Living Wage)',
      rate: UK_MINIMUM_WAGE.nlw21Plus,
      description: 'Applies after first year if aged 21+',
    },
  ];

  const regionalVariations = [
    {
      region: 'London',
      averageWage: '£20,000 - £25,000',
      description: 'Higher cost of living adjustments common',
    },
    {
      region: 'South East',
      averageWage: '£18,000 - £22,000',
      description: 'Competitive market with good opportunities',
    },
    {
      region: 'Scotland',
      averageWage: '£17,000 - £20,000',
      description: 'Strong electrical sector, especially renewables',
    },
    {
      region: 'North West',
      averageWage: '£16,000 - £19,000',
      description: 'Industrial heritage with modern opportunities',
    },
    {
      region: 'Yorkshire',
      averageWage: '£16,000 - £19,000',
      description: 'Growing manufacturing and construction sectors',
    },
    {
      region: 'Other regions',
      averageWage: '£15,000 - £18,000',
      description: 'Varies by local economic conditions',
    },
  ];

  const progressionPath = [
    {
      stage: 'Year 1 Apprentice',
      wage: '£8.00/hr minimum (JIB Stage 1: £8.16)',
      annual: '~£15,600',
      description: 'Learning fundamentals',
    },
    {
      stage: 'Year 2-4 Apprentice (21+)',
      wage: '£12.71/hr NLW (JIB Stages 2-4: £10.60-£14.03)',
      annual: '~£24,800',
      description: 'NLW applies after year 1 if 21+',
    },
    {
      stage: 'Newly Qualified',
      wage: '£15-18/hour',
      annual: '£30,000-36,000',
      description: 'Basic competency achieved',
    },
    {
      stage: 'Experienced (2-5 years)',
      wage: '£18-25/hour',
      annual: '£36,000-50,000',
      description: 'Proven track record',
    },
    {
      stage: 'Senior/Specialist',
      wage: '£25-40/hour',
      annual: '£50,000-80,000+',
      description: 'Leadership or specialisation',
    },
  ];

  const payFactors = [
    {
      factor: 'Company Size',
      impact: 'Large contractors typically pay 10-20% more than small firms',
      examples: 'Major M&E contractors vs local electrical companies',
    },
    {
      factor: 'Sector Type',
      impact: 'Industrial and commercial work often pays more than domestic',
      examples: 'Power generation, data centres, hospitals vs house wiring',
    },
    {
      factor: 'Location',
      impact: 'London weighting can add £2,000-5,000 annually',
      examples: 'Central London vs rural areas significant difference',
    },
    {
      factor: 'Qualifications',
      impact: 'Additional certifications can increase pay by 15-25%',
      examples: '18th Edition, Testing & Inspection, COMPEX, etc.',
    },
    {
      factor: 'Overtime/Call-out',
      impact: 'Can add 20-40% to base salary in some roles',
      examples: 'Emergency response, weekend work, night shifts',
    },
  ];

  const jibGrades = [
    {
      grade: 'Apprentice (Stage 1-4)',
      jibRate: `£${JIB_RATES_2026.apprentice.stage1.national.toFixed(2)} - £${JIB_RATES_2026.apprentice.stage4.national.toFixed(2)}`,
      description: `JIB national standard rates from 5 January 2026 (£${JIB_RATES_2026.apprentice.stage1.london.toFixed(2)} - £${JIB_RATES_2026.apprentice.stage4.london.toFixed(2)} in the JIB London area). Stage rises are linked to passing qualifications.`,
    },
    {
      grade: 'Electrical Improver',
      jibRate: `£${JIB_RATES_2026.graded.electricalImprover.toFixed(2)}`,
      description: 'Recently qualified, gaining experience. Typically 6-12 months after completing apprenticeship.',
    },
    {
      grade: 'Electrician',
      jibRate: `£${JIB_RATES_2026.graded.electrician.toFixed(2)}`,
      description: 'Fully qualified with ECS Gold Card (NVQ Level 3 + AM2).',
    },
    {
      grade: 'Approved Electrician',
      jibRate: `£${JIB_RATES_2026.graded.approvedElectrician.toFixed(2)}`,
      description: 'Experienced and additionally qualified (e.g. inspection & testing). Can work independently and sign off own work.',
    },
    {
      grade: 'Site / Installation Technician',
      jibRate: `£${JIB_RATES_2026.graded.technician.toFixed(2)}`,
      description: 'Advanced qualifications (Testing & Inspection, Design). Higher technical responsibility.',
    },
  ];

  const payslipBreakdown = [
    { item: 'Gross Pay', description: 'Your total earnings before any deductions. Includes basic hours, overtime, and allowances.' },
    { item: 'Income Tax (PAYE)', description: 'Collected by your employer via Pay As You Earn. You pay 0% on the first £12,570, then 20% on earnings up to £50,270.' },
    { item: 'National Insurance (NI)', description: 'Contributions towards state pension and benefits. 8% on earnings between £12,570 and £50,270 per year.' },
    { item: 'Pension', description: 'Auto-enrolled after 3 months if eligible. Minimum 5% employee + 3% employer contribution.' },
    { item: 'Student Loan', description: 'Only if you have one. Plan 2: 9% on earnings above £27,295/year. Plan 5: 9% above £25,000.' },
    { item: 'Net Pay', description: 'What you actually receive in your bank account after all deductions. This is your take-home pay.' },
  ];

  const overtimeRates = [
    { type: 'Standard Overtime', rate: 'Time and a quarter (x1.25)', when: 'Weekday evenings beyond normal hours' },
    { type: 'Weekend Overtime', rate: 'Time and a half (x1.5)', when: 'Saturday working' },
    { type: 'Sunday/Bank Holiday', rate: 'Double time (x2.0)', when: 'Sunday and public holiday working' },
    { type: 'Emergency Call-out', rate: 'Minimum 4 hours at x1.5', when: 'After-hours emergency response' },
    { type: 'Travel Time', rate: 'Varies (often basic rate)', when: 'Travel to sites beyond normal base — check your contract' },
    { type: 'Lodge/Away Allowance', rate: '£40-£60 per night typical', when: 'Working away from home overnight' },
  ];

  const negotiationTips = [
    'Research typical rates for your area and experience level before the conversation',
    'Time your request after a successful project or positive review',
    'Highlight specific achievements — installations completed, qualifications gained, positive feedback',
    'Know the JIB recommended rates and use them as a benchmark',
    'Ask about the full package — not just hourly rate but overtime, van, fuel card, pension, training',
    'If a pay rise is not possible now, agree a review date and specific targets to hit',
    'Get any agreed increases in writing — verbal promises are hard to enforce',
    'If you are consistently underpaid compared to the market, it may be time to look elsewhere',
  ];

  const Section = ({
    eyebrow,
    children,
    accent = 'neutral',
  }: {
    eyebrow: string;
    children: React.ReactNode;
    accent?: 'neutral' | 'yellow' | 'red';
  }) => {
    const containerClass =
      accent === 'red'
        ? 'rounded-xl border border-red-500/30 bg-red-500/[0.04]'
        : accent === 'yellow'
          ? 'rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04]'
          : 'rounded-xl border border-white/[0.06] bg-white/[0.02]';
    const eyebrowClass =
      accent === 'red'
        ? 'text-red-300'
        : accent === 'yellow'
          ? 'text-elec-yellow/85'
          : 'text-white/55';
    return (
      <div className={`${containerClass} p-4 sm:p-5 space-y-3`}>
        <span
          className={`text-[10px] font-medium uppercase tracking-[0.18em] ${eyebrowClass}`}
        >
          {eyebrow}
        </span>
        {children}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Section eyebrow="Important" accent="yellow">
        <p className="text-[14px] text-white/85 leading-relaxed">
          Rates shown are the legal minimum — many employers pay above these. Current 2025/26 rates
          apply until 31 March 2026, then new rates take effect.
        </p>
      </Section>

      <Section eyebrow="UK minimum wage rates for apprentices">
        <div className="space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Current rates (from 1 April 2026)
          </span>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 flex justify-between items-center">
            <span className="text-[14px] text-white/85">Apprentice rate (Year 1 / Under 19)</span>
            <span className="font-mono text-elec-yellow text-[13px]">
              £{currentRates.apprenticeMinimum}/hr
            </span>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 flex justify-between items-center">
            <span className="text-[14px] text-white/85">After Year 1, aged 21+ (NLW)</span>
            <span className="font-mono text-elec-yellow text-[13px]">
              £{currentRates.nationalLivingWage}/hr
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            All age-based rates
          </span>
          <div className="rounded-lg border border-white/[0.06] overflow-hidden">
            <div className="grid grid-cols-2 gap-0 text-[12px] p-2 bg-white/[0.04] text-white/85">
              <span>Age group</span>
              <span className="text-center">Rate (from 1 Apr 2026)</span>
            </div>
            {ageBasedRates.map((rate, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-0 text-[12px] p-2 border-t border-white/[0.06]"
              >
                <span className="text-white/85">{rate.age}</span>
                <span className="text-center font-mono text-elec-yellow">
                  £{rate.rate.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Career progression & expected wages">
        <div className="space-y-3">
          {progressionPath.map((stage, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
            >
              <div>
                <h4 className="text-[16px] font-semibold text-white">{stage.stage}</h4>
                <p className="text-[13px] text-white/70 mt-1">{stage.description}</p>
              </div>
              <div className="text-center">
                <div className="text-[14px] font-semibold text-white">{stage.wage}</div>
              </div>
              <div className="text-right">
                <div className="text-[14px] font-semibold text-elec-yellow">{stage.annual}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Regional wage variations">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {regionalVariations.map((region, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
            >
              <div className="flex justify-between items-start gap-2">
                <h4 className="text-[14px] font-semibold text-white">{region.region}</h4>
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] whitespace-nowrap">
                  {region.averageWage}
                </span>
              </div>
              <p className="text-[13px] text-white/70 leading-relaxed">{region.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Factors affecting your pay">
        <div className="space-y-3">
          {payFactors.map((factor, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1"
            >
              <h4 className="text-[14px] font-semibold text-white">{factor.factor}</h4>
              <p className="text-[14px] text-white/85 leading-relaxed">{factor.impact}</p>
              <p className="text-[12px] text-white/55 leading-relaxed">{factor.examples}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="JIB grading & industry pay rates">
        <p className="text-[14px] text-white/85 leading-relaxed">
          The Joint Industry Board (JIB) sets recommended pay grades for the electrical contracting
          industry. JIB-registered employers typically pay these rates, which are significantly
          higher than legal minimums. These are hourly base rates — overtime is additional.
        </p>
        <div className="space-y-3">
          {jibGrades.map((grade, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1"
            >
              <div className="flex justify-between items-start gap-2">
                <h4 className="text-[14px] font-semibold text-white">{grade.grade}</h4>
                <span className="text-[12px] font-mono text-elec-yellow px-2 py-0.5 rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] whitespace-nowrap">
                  {grade.jibRate}/hr
                </span>
              </div>
              <p className="text-[13px] text-white/70 leading-relaxed">{grade.description}</p>
            </div>
          ))}
        </div>
        <p className="text-[12px] text-white/55 leading-relaxed">
          JIB rates are reviewed annually and typically exceed legal minimums. Not all employers are
          JIB-registered — ask at interview whether they follow JIB grading.
        </p>
      </Section>

      <Section eyebrow="Overtime, call-out & additional pay">
        <p className="text-[14px] text-white/85 leading-relaxed">
          Overtime rates vary by employer, but these are typical in the electrical industry. Your
          contract should specify your exact rates — check before you start.
        </p>
        <div className="space-y-3">
          {overtimeRates.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
            >
              <div className="flex justify-between items-start gap-2">
                <h4 className="text-[14px] font-semibold text-white">{item.type}</h4>
                <span className="text-[12px] text-elec-yellow px-2 py-0.5 rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] whitespace-nowrap">
                  {item.rate}
                </span>
              </div>
              <p className="text-[13px] text-white/70 leading-relaxed">{item.when}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Understanding your payslip">
        <p className="text-[14px] text-white/85 leading-relaxed">
          Your employer must provide an itemised payslip every pay period. Here is what each
          section means:
        </p>
        <div className="space-y-3">
          {payslipBreakdown.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
            >
              <h4 className="text-[14px] font-semibold text-white">{item.item}</h4>
              <p className="text-[13px] text-white/85 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
            Tax code tips
          </span>
          <p className="text-[13px] text-white/85 leading-relaxed">
            Most apprentices will be on tax code 1257L, meaning you can earn £12,570 before paying
            any income tax. If your tax code looks wrong (e.g. BR which means you pay tax on
            everything), contact HMRC on 0300 200 3300 to get it corrected. Wrong tax codes are
            common when starting a new job and can cost you hundreds of pounds.
          </p>
        </div>
      </Section>

      <Section eyebrow="Negotiating a pay rise">
        <p className="text-[14px] text-white/85 leading-relaxed">
          Many apprentices assume they cannot negotiate pay. While Year 1 rates are often fixed,
          from Year 2 onwards many employers are open to paying above the minimum — especially if
          you are productive, reliable, and progressing well.
        </p>
        <ul className="space-y-1.5">
          {negotiationTips.map((tip, index) => (
            <li
              key={index}
              className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="What to do if you are underpaid" accent="red">
        <p className="text-[14px] text-white/85 leading-relaxed">
          Being paid below the legal minimum wage is a criminal offence. If you suspect you are
          being underpaid, follow these steps:
        </p>
        <div className="space-y-3">
          {[
            {
              step: '1',
              title: 'Check your payslips',
              desc:
                'Calculate your hourly rate by dividing gross pay by hours worked. Include all hours — travel between sites, training time, and overtime.',
            },
            {
              step: '2',
              title: 'Check which rate applies to you',
              desc:
                'Under 19 or in your first year = apprentice rate (£8.00 from 1 April 2026). Over 21 and past first year = NLW (£12.71 from 1 April 2026).',
            },
            {
              step: '3',
              title: 'Talk to your employer first',
              desc:
                'It may be a genuine payroll mistake. Raise it in writing (email) so there is a record.',
            },
            {
              step: '4',
              title: 'Contact ACAS',
              desc:
                'Free, confidential advice on 0300 123 1100. They can help mediate if your employer will not resolve it.',
            },
            {
              step: '5',
              title: 'Report to HMRC',
              desc:
                'Call the NMW helpline on 0300 123 1100 or use the online complaint form. HMRC can investigate and enforce back-pay.',
            },
            {
              step: '6',
              title: 'Keep records',
              desc:
                'Save all payslips, timesheets, rotas, and any written communication. These are your evidence.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center flex-shrink-0 text-[12px] font-mono text-white">
                  {item.step}
                </span>
                <h4 className="text-[14px] font-semibold text-white">{item.title}</h4>
              </div>
              <p className="text-[13px] text-white/85 leading-relaxed ml-8">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Important" accent="yellow">
        <p className="text-[14px] text-white/85 leading-relaxed">
          Many electrical apprentices earn above minimum wage. Research typical rates in your area
          and don't be afraid to negotiate, especially if you have prior experience or additional
          qualifications.
        </p>
      </Section>
    </div>
  );
};

export default WageInformationTab;
