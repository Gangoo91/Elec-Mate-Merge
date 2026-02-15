import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import ResourcesTab from '@/components/apprentice/study-tips/ResourcesTab';

const ResourcesPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Study Resources
        </h1>
      </div>

      <Card className="border-amber-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Essential Resources for Electrical Training
          </h2>
          <p className="text-white text-sm leading-relaxed">
            The right resources make all the difference. From textbooks and
            online platforms to practice exam sites and video tutorials, here
            is everything you need to support your electrical apprenticeship
            studies.
          </p>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <h3 className="text-amber-400 font-semibold text-sm mb-3">
              Resource Categories
            </h3>
            <ul className="space-y-2">
              {[
                'Essential textbooks (BS 7671, On-Site Guide, Guidance Notes)',
                'Online learning platforms and practice exams',
                'Video tutorials and YouTube channels',
                'Mobile apps for on-the-go revision',
                'Free and paid resources compared',
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

      <ResourcesTab />
    </div>
  );
};

export default ResourcesPage;
