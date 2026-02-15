import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import SchedulePlanningTab from '@/components/apprentice/time-management/SchedulePlanningTab';

const SchedulingPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Schedule Planning
        </h1>
      </div>

      <Card className="border-green-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Creating Your Weekly Schedule
          </h2>
          <p className="text-white text-sm leading-relaxed">
            A well-planned schedule is your best tool for balancing
            apprenticeship demands. Learn how to structure your week around
            work, college, study, and personal time — and how to adjust when
            things do not go to plan.
          </p>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h3 className="text-green-400 font-semibold text-sm mb-3">
              Planning Tips
            </h3>
            <ul className="space-y-2">
              {[
                'Block out fixed commitments first (work, college)',
                'Schedule study time like an appointment',
                'Include travel time in your planning',
                'Build in breaks and personal time',
                'Review and adjust weekly — plans need flexibility',
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

      <SchedulePlanningTab />
    </div>
  );
};

export default SchedulingPage;
