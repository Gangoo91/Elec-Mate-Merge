import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import WorkLifeBalanceTab from '@/components/apprentice/time-management/WorkLifeBalanceTab';

const BalancePage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Work-Life Balance
        </h1>
      </div>

      <Card className="border-purple-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Balancing Work, Study, and Life
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Your apprenticeship is a 4-year commitment, and you cannot
            sustain it if you burn out. Finding the right balance between
            work demands, study obligations, and personal life is essential
            for your long-term success and wellbeing.
          </p>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h3 className="text-purple-400 font-semibold text-sm mb-3">
              Balance Strategies
            </h3>
            <ul className="space-y-2">
              {[
                'Set boundaries — work stays at work where possible',
                'Protect your weekends for rest and personal time',
                'Stay connected with friends and family',
                'Find hobbies and activities outside of work',
                'Remember: a rested apprentice is a better apprentice',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <WorkLifeBalanceTab />
    </div>
  );
};

export default BalancePage;
