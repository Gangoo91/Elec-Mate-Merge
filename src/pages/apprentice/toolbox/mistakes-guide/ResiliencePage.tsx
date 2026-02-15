import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import ResilienceTab from '@/components/apprentice/learning-mistakes/ResilienceTab';

const ResiliencePage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Building Resilience
        </h1>
      </div>

      <Card className="border-purple-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Developing Mental Toughness
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Resilience is your ability to bounce back from setbacks. In the
            electrical trade, you will face challenges — failed assessments,
            difficult days on site, criticism from supervisors. Building
            resilience helps you handle these situations without losing
            confidence or motivation.
          </p>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h3 className="text-purple-400 font-semibold text-sm mb-3">
              What You Will Learn
            </h3>
            <ul className="space-y-2">
              {[
                'Growth mindset — seeing challenges as opportunities',
                'Self-talk techniques to stay positive',
                'How to handle criticism constructively',
                'Building confidence through small wins',
                'When to seek support and how to ask for it',
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

      <ResilienceTab />
    </div>
  );
};

export default ResiliencePage;
