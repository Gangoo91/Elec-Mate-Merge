import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import CaseStudiesTab from '@/components/apprentice/learning-mistakes/CaseStudiesTab';

const CaseStudiesPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Case Studies
        </h1>
      </div>

      <Card className="border-green-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Real-World Learning Examples
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Learn from real scenarios that apprentice electricians have faced.
            Each case study walks through what happened, what went wrong, how
            it was resolved, and the lessons learned. These stories show that
            mistakes are part of the journey — not the end of it.
          </p>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h3 className="text-green-400 font-semibold text-sm mb-3">
              Case Study Topics
            </h3>
            <ul className="space-y-2">
              {[
                'Technical errors on real installations',
                'Safety near-misses and how they were handled',
                'Communication breakdowns and their consequences',
                'Failed assessments turned into pass marks',
                'Career setbacks that became turning points',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <CaseStudiesTab />
    </div>
  );
};

export default CaseStudiesPage;
