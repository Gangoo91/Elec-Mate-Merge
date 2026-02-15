import { Card, CardContent } from '@/components/ui/card';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const WagesPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Wages & Pay
        </h1>
      </div>

      {/* Intro */}
      <Card className="border-green-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Your Apprenticeship Wage Entitlements
          </h2>
          <p className="text-white text-sm leading-relaxed">
            As an apprentice electrician, you are entitled to at least the National
            Minimum Wage for apprentices. Many employers pay above this rate. Understanding
            your pay rights helps you spot problems early and ensures you are treated fairly.
          </p>
        </CardContent>
      </Card>

      {/* Current Rates */}
      <Card className="border-green-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-green-400">
            Current Apprentice Wage Rates (2025/26)
          </h2>

          <div className="space-y-3">
            {[
              { age: 'Apprentice rate (year 1, any age)', rate: '\u00a37.55/hr' },
              { age: 'Under 18 (after year 1)', rate: '\u00a37.55/hr' },
              { age: '18-20 (after year 1)', rate: '\u00a310.00/hr' },
              { age: '21+ (after year 1)', rate: '\u00a312.21/hr' },
            ].map((item) => (
              <div
                key={item.age}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
              >
                <span className="text-white text-sm">{item.age}</span>
                <span className="text-green-400 font-bold text-sm">{item.rate}</span>
              </div>
            ))}
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
            <p className="text-white text-xs">
              <strong className="text-elec-yellow">From April 2026:</strong> The apprentice
              rate rises to {'\u00a3'}8.00/hr. After your first year, you move to the standard
              National Minimum Wage for your age group.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* What Should Be Paid */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-blue-400">
            What You Should Be Paid For
          </h2>
          <ul className="space-y-2">
            {[
              'All hours worked on site, including travel between sites during the day',
              'Time spent at college or in off-the-job training (minimum 20% of your hours)',
              'Study time and coursework during working hours',
              'Overtime at your agreed rate (check your contract)',
              '28 days paid holiday per year (including bank holidays)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Red Flags */}
      <Card className="border-red-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-red-400">
            {"Red Flags \u2014 When Something Is Wrong"}
          </h2>
          <ul className="space-y-2">
            {[
              'Being asked to pay for your own training, tools, or college fees',
              'Not being paid for college days or study time',
              'Being paid less than the legal minimum wage',
              'Deductions from wages without your written agreement',
              'Not receiving payslips showing hours worked and deductions',
              'Being told you are "self-employed" while working fixed hours for one employer',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white">
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* JIB Rates */}
      <Card className="border-elec-yellow/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-elec-yellow">
            JIB Industry Rates
          </h2>
          <p className="text-white text-sm leading-relaxed">
            The Joint Industry Board (JIB) sets recommended pay rates for the electrical
            industry. Many employers follow JIB rates, which are typically higher than the
            legal minimum. Check with your employer whether they follow JIB grading.
          </p>
          <div className="space-y-3">
            {[
              { stage: 'Stage 1 Apprentice', rate: '\u00a37.86 - \u00a39.50/hr (varies by employer)' },
              { stage: 'Stage 2 Apprentice', rate: '\u00a39.50 - \u00a312.00/hr (varies by employer)' },
              { stage: 'Stage 3 Apprentice', rate: '\u00a312.00 - \u00a314.50/hr (varies by employer)' },
            ].map((item) => (
              <div
                key={item.stage}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
              >
                <span className="text-white text-sm">{item.stage}</span>
                <span className="text-elec-yellow font-bold text-xs">{item.rate}</span>
              </div>
            ))}
          </div>
          <p className="text-white text-xs">
            JIB rates are updated annually. Always check the latest JIB National Working
            Rules for current figures.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WagesPage;
