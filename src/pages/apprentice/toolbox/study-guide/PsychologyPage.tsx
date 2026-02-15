import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import StudyPsychologyTab from '@/components/apprentice/study-tips/StudyPsychologyTab';

const PsychologyPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Study Psychology
        </h1>
      </div>

      <Card className="border-red-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            The Mental Side of Studying
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Your mindset has a massive impact on how effectively you learn.
            Understanding motivation, dealing with procrastination, managing
            study anxiety, and building confidence are just as important as
            the study techniques themselves.
          </p>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h3 className="text-red-400 font-semibold text-sm mb-3">
              Topics Covered
            </h3>
            <ul className="space-y-2">
              {[
                'Overcoming procrastination — why we avoid studying',
                'Building motivation when you feel like giving up',
                'Managing exam anxiety and performance pressure',
                'Growth mindset — believing you can improve',
                'Celebrating progress and staying positive',
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

      <StudyPsychologyTab />
    </div>
  );
};

export default PsychologyPage;
