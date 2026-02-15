import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import RecoveryStrategiesTab from '@/components/apprentice/learning-mistakes/RecoveryStrategiesTab';

const RecoveryPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Recovery Strategies
        </h1>
      </div>

      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            How to Recover From a Mistake
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Everyone makes mistakes — what matters is how you respond. These
            recovery strategies will help you handle mistakes professionally,
            learn from them effectively, and come back stronger. The best
            electricians are not the ones who never make mistakes — they are
            the ones who recover well.
          </p>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-400 font-semibold text-sm mb-3">
              Key Recovery Steps
            </h3>
            <ul className="space-y-2">
              {[
                'Own the mistake immediately — do not hide it',
                'Assess the impact and make it safe',
                'Report it to the right person',
                'Identify what went wrong and why',
                'Put a plan in place to prevent it happening again',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <RecoveryStrategiesTab />
    </div>
  );
};

export default RecoveryPage;
