import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import PreventionTab from '@/components/apprentice/learning-mistakes/PreventionTab';

const PreventionPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Prevention Strategies
        </h1>
      </div>

      <Card className="border-amber-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Preventing Mistakes Before They Happen
          </h2>
          <p className="text-white text-sm leading-relaxed">
            The best approach to mistakes is preventing them in the first
            place. These strategies cover pre-work checks, systematic
            approaches, and habits that dramatically reduce the chance of
            errors on site and in your studies.
          </p>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <h3 className="text-amber-400 font-semibold text-sm mb-3">
              Prevention Methods
            </h3>
            <ul className="space-y-2">
              {[
                'Pre-work checklists and planning routines',
                'Double-checking techniques for critical tasks',
                'Asking questions when unsure (it is never wrong to ask)',
                'Using reference materials — BS 7671, On-Site Guide',
                'Learning from near-misses before they become incidents',
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

      <PreventionTab />
    </div>
  );
};

export default PreventionPage;
