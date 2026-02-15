import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import InteractiveToolsTab from '@/components/apprentice/time-management/InteractiveToolsTab';

const InteractivePage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Interactive Tools
        </h1>
      </div>

      <Card className="border-red-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Practice & Self-Assessment
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Use these interactive tools to assess your current time management
            skills, identify areas for improvement, and practise techniques
            that will help you stay on top of your apprenticeship demands.
          </p>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h3 className="text-red-400 font-semibold text-sm mb-3">
              Included
            </h3>
            <ul className="space-y-2">
              {[
                'Time audit — where does your time actually go?',
                'Priority matrix — urgent vs important',
                'Weekly planner template',
                'Goal-setting frameworks',
                'Progress tracking tools',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <InteractiveToolsTab />
    </div>
  );
};

export default InteractivePage;
