import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import TimeManagementTab from '@/components/apprentice/study-tips/TimeManagementTab';

const StudyTimePage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Study Time Management
        </h1>
      </div>

      <Card className="border-purple-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Finding Time to Study
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Balancing a full-time apprenticeship with study can feel
            overwhelming. Between early starts, long days on site, and college
            commitments, finding time to revise is a real challenge. These
            strategies will help you make the most of the time you have.
          </p>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h3 className="text-purple-400 font-semibold text-sm mb-3">
              Key Strategies
            </h3>
            <ul className="space-y-2">
              {[
                'Use commute time for audio learning or flashcards',
                'Study in 25-minute focused blocks (Pomodoro technique)',
                'Create a weekly study schedule and stick to it',
                'Prioritise quality over quantity — 30 min focused beats 2 hrs distracted',
                'Use dead time on site (waiting for deliveries, etc.)',
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

      <TimeManagementTab />
    </div>
  );
};

export default StudyTimePage;
