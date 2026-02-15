import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import ProductivityToolsTab from '@/components/apprentice/time-management/ProductivityToolsTab';

const ProductivityPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Productivity Tools
        </h1>
      </div>

      <Card className="border-amber-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Tools to Boost Your Productivity
          </h2>
          <p className="text-white text-sm leading-relaxed">
            The right tools and techniques can dramatically improve how much
            you get done in the time you have. From apps and planners to
            proven productivity methods, find what works for you.
          </p>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <h3 className="text-amber-400 font-semibold text-sm mb-3">
              Productivity Methods
            </h3>
            <ul className="space-y-2">
              {[
                'Pomodoro Technique — 25 min focus, 5 min break',
                'To-do lists — write it down, tick it off',
                'The 2-minute rule — if it takes 2 min, do it now',
                'Batch similar tasks together for efficiency',
                'Digital tools — calendars, reminders, note apps',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <ProductivityToolsTab />
    </div>
  );
};

export default ProductivityPage;
