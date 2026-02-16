import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PoundSterling, TrendingUp, Calculator, Info, AlertTriangle } from 'lucide-react';

const WageInformationTab = () => {
  const currentRates = {
    apprenticeMinimum: 7.55,
    under18: 7.55,
    age18to20: 10.18,
    nationalLivingWage: 12.21,
    period: '2025/26 (current)',
  };

  const aprilRates = {
    apprenticeMinimum: 8.0,
    under18: 8.0,
    age18to20: 10.85,
    nationalLivingWage: 12.71,
    period: 'From 1 April 2026',
  };

  const ageBasedRates = [
    {
      age: 'Apprentice (any age, Year 1)',
      current: 7.55,
      april: 8.0,
      description: 'First year of apprenticeship or under 19',
    },
    {
      age: 'Under 18 (non-apprentice)',
      current: 7.55,
      april: 8.0,
      description: 'Same as apprentice rate',
    },
    {
      age: '18-20',
      current: 10.18,
      april: 10.85,
      description: 'Applies after first year if aged 18-20',
    },
    {
      age: '21+ (National Living Wage)',
      current: 12.21,
      april: 12.71,
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
      wage: '£7.55/hr (current) → £8.00 from Apr 2026',
      annual: '~£15,100 → ~£16,000',
      description: 'Learning fundamentals',
    },
    {
      stage: 'Year 2-4 Apprentice (21+)',
      wage: '£12.21/hr (current) → £12.71 from Apr 2026',
      annual: '~£24,400 → ~£25,400',
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
      grade: 'Apprentice (Year 1-4)',
      jibRate: '£7.55 - £12.21',
      description: 'Current 2025/26 legal minimums. Rates rise to £8.00 - £12.71 from April 2026. JIB employers typically pay above these.',
    },
    {
      grade: 'Electrical Improver',
      jibRate: '£14.01',
      description: 'Recently qualified, gaining experience. Typically 6-12 months after completing apprenticeship.',
    },
    {
      grade: 'Approved Electrician',
      jibRate: '£17.54',
      description: 'Fully qualified with ECS Gold Card. Can work independently and sign off own work.',
    },
    {
      grade: 'Technician',
      jibRate: '£19.24',
      description: 'Advanced qualifications (Testing & Inspection, Design). Higher technical responsibility.',
    },
    {
      grade: 'Foreman / Supervisor',
      jibRate: '£20.50+',
      description: 'Managing teams and projects. Requires leadership skills and experience.',
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

  return (
    <div className="space-y-6">
      <Alert className="border-green-500/50 bg-green-500/10">
        <PoundSterling className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-white">
          <strong>Important:</strong> Rates shown are the legal minimum — many employers pay above
          these. Current 2025/26 rates apply until 31 March 2026, then new rates take effect.
        </AlertDescription>
      </Alert>

      <Card className="border-elec-yellow/20 bg-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <Calculator className="h-5 w-5" />
            UK Minimum Wage Rates for Apprentices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Rates */}
          <div className="space-y-3">
            <h4 className="font-semibold text-green-400 text-sm">Current Rates (2025/26)</h4>
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
              <div className="flex justify-between items-center">
                <span className="font-medium text-white">Apprentice Rate (Year 1 / Under 19)</span>
                <Badge className="bg-green-500/20 text-green-400">
                  £{currentRates.apprenticeMinimum}/hr
                </Badge>
              </div>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
              <div className="flex justify-between items-center">
                <span className="font-medium text-white">After Year 1, aged 21+ (NLW)</span>
                <Badge className="bg-green-500/20 text-green-400">
                  £{currentRates.nationalLivingWage}/hr
                </Badge>
              </div>
            </div>
          </div>

          {/* April 2026 Rates */}
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-400 text-sm">From 1 April 2026</h4>
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <div className="flex justify-between items-center">
                <span className="font-medium text-white">Apprentice Rate (Year 1 / Under 19)</span>
                <Badge className="bg-blue-500/20 text-blue-400">
                  £{aprilRates.apprenticeMinimum.toFixed(2)}/hr
                </Badge>
              </div>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <div className="flex justify-between items-center">
                <span className="font-medium text-white">After Year 1, aged 21+ (NLW)</span>
                <Badge className="bg-blue-500/20 text-blue-400">
                  £{aprilRates.nationalLivingWage}/hr
                </Badge>
              </div>
            </div>
          </div>

          {/* Full Age-Based Table */}
          <div className="space-y-2 mt-4">
            <h4 className="font-medium text-white text-sm">All Age-Based Rates:</h4>
            <div className="border border-white/10 rounded-lg overflow-hidden">
              <div className="grid grid-cols-3 gap-0 text-xs p-2 bg-white/10 font-medium text-white">
                <span>Age Group</span>
                <span className="text-center">Current</span>
                <span className="text-center">Apr 2026</span>
              </div>
              {ageBasedRates.map((rate, index) => (
                <div key={index} className="grid grid-cols-3 gap-0 text-xs p-2 border-t border-white/5">
                  <span className="text-white">{rate.age}</span>
                  <span className="text-center text-green-400 font-medium">£{rate.current.toFixed(2)}</span>
                  <span className="text-center text-blue-400 font-medium">£{rate.april.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <TrendingUp className="h-5 w-5" />
            Career Progression & Expected Wages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {progressionPath.map((stage, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 bg-blue-500/5 rounded-lg border border-blue-500/20"
              >
                <div className="md:col-span-1">
                  <h4 className="font-medium text-blue-300 text-lg">{stage.stage}</h4>
                  <p className="text-sm text-white mt-1">{stage.description}</p>
                </div>
                <div className="md:col-span-1 text-center">
                  <div className="text-base font-semibold text-blue-300">{stage.wage}</div>
                </div>
                <div className="md:col-span-1 text-right">
                  <div className="text-base font-semibold text-blue-300">{stage.annual}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/20 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Info className="h-5 w-5" />
            Regional Wage Variations (Annual Apprentice Salaries)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {regionalVariations.map((region, index) => (
              <div
                key={index}
                className="p-3 bg-purple-500/5 rounded-lg border border-purple-500/20"
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-purple-300">{region.region}</h4>
                  <Badge className="bg-purple-500/20 text-purple-300 text-xs">
                    {region.averageWage}
                  </Badge>
                </div>
                <p className="text-xs text-white">{region.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500/20 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <AlertTriangle className="h-5 w-5" />
            Factors Affecting Your Pay
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payFactors.map((factor, index) => (
              <div key={index} className="border border-orange-500/20 rounded-lg p-4">
                <h4 className="font-medium text-orange-300 mb-2">{factor.factor}</h4>
                <p className="text-sm text-white mb-1">{factor.impact}</p>
                <p className="text-xs text-white">{factor.examples}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* JIB Grading System */}
      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <PoundSterling className="h-5 w-5" />
            JIB Grading & Industry Pay Rates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white mb-4">
            The Joint Industry Board (JIB) sets recommended pay grades for the electrical contracting
            industry. JIB-registered employers typically pay these rates, which are significantly higher
            than legal minimums. These are hourly base rates — overtime is additional.
          </p>
          <div className="space-y-3">
            {jibGrades.map((grade, index) => (
              <div key={index} className="border border-green-500/20 rounded-lg p-4">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-green-300">{grade.grade}</h4>
                  <Badge className="bg-green-500/20 text-green-400 text-xs">
                    {grade.jibRate}/hr
                  </Badge>
                </div>
                <p className="text-xs text-white">{grade.description}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-white mt-3">
            JIB rates are reviewed annually and typically exceed legal minimums. Not all employers
            are JIB-registered — ask at interview whether they follow JIB grading.
          </p>
        </CardContent>
      </Card>

      {/* Overtime & Additional Pay */}
      <Card className="border-elec-yellow/20 bg-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <Calculator className="h-5 w-5" />
            Overtime, Call-out & Additional Pay
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white mb-4">
            Overtime rates vary by employer, but these are typical in the electrical industry.
            Your contract should specify your exact rates — check before you start.
          </p>
          <div className="space-y-3">
            {overtimeRates.map((item, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-3">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-elec-yellow text-sm">{item.type}</h4>
                  <Badge className="bg-elec-yellow/20 text-elec-yellow text-xs">
                    {item.rate}
                  </Badge>
                </div>
                <p className="text-xs text-white">{item.when}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Understanding Your Payslip */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Info className="h-5 w-5" />
            Understanding Your Payslip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white mb-4">
            Your employer must provide an itemised payslip every pay period. Here is what each
            section means:
          </p>
          <div className="space-y-3">
            {payslipBreakdown.map((item, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-3">
                <h4 className="font-medium text-blue-300 text-sm mb-1">{item.item}</h4>
                <p className="text-xs text-white">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h4 className="font-medium text-blue-300 text-sm mb-2">Tax Code Tips</h4>
            <p className="text-xs text-white">
              Most apprentices will be on tax code 1257L, meaning you can earn £12,570 before paying
              any income tax. If your tax code looks wrong (e.g. BR which means you pay tax on everything),
              contact HMRC on 0300 200 3300 to get it corrected. Wrong tax codes are common when starting
              a new job and can cost you hundreds of pounds.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Negotiating Your Pay */}
      <Card className="border-purple-500/20 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <TrendingUp className="h-5 w-5" />
            Negotiating a Pay Rise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white mb-4">
            Many apprentices assume they cannot negotiate pay. While Year 1 rates are often fixed,
            from Year 2 onwards many employers are open to paying above the minimum — especially
            if you are productive, reliable, and progressing well.
          </p>
          <ul className="space-y-2">
            {negotiationTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-white">
                <span className="text-purple-400 flex-shrink-0 mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* What to Do If Underpaid */}
      <Card className="border-red-500/20 bg-red-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            What to Do If You Are Underpaid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-white">
              Being paid below the legal minimum wage is a criminal offence. If you suspect you are
              being underpaid, follow these steps:
            </p>
            {[
              { step: '1', title: 'Check your payslips', desc: 'Calculate your hourly rate by dividing gross pay by hours worked. Include all hours — travel between sites, training time, and overtime.' },
              { step: '2', title: 'Check which rate applies to you', desc: 'Under 19 or in your first year = apprentice rate (£7.55 current, £8.00 from April 2026). Over 21 and past first year = NLW (£12.21 current, £12.71 from April 2026).' },
              { step: '3', title: 'Talk to your employer first', desc: 'It may be a genuine payroll mistake. Raise it in writing (email) so there is a record.' },
              { step: '4', title: 'Contact ACAS', desc: 'Free, confidential advice on 0300 123 1100. They can help mediate if your employer will not resolve it.' },
              { step: '5', title: 'Report to HMRC', desc: 'Call the NMW helpline on 0300 123 1100 or use the online complaint form. HMRC can investigate and enforce back-pay.' },
              { step: '6', title: 'Keep records', desc: 'Save all payslips, timesheets, rotas, and any written communication. These are your evidence.' },
            ].map((item, index) => (
              <div key={index} className="border border-red-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400 text-xs font-bold">{item.step}</span>
                  </div>
                  <h4 className="font-medium text-red-300 text-sm">{item.title}</h4>
                </div>
                <p className="text-xs text-white ml-8">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert className="border-yellow-500/50 bg-yellow-500/10">
        <Info className="h-4 w-4 text-yellow-400" />
        <AlertDescription className="text-white">
          <strong>Important:</strong> Many electrical apprentices earn above minimum wage. Research
          typical rates in your area and don't be afraid to negotiate, especially if you have prior
          experience or additional qualifications.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default WageInformationTab;
