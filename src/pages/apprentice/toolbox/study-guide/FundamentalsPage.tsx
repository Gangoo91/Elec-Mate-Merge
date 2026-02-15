import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import StudyFundamentalsTab from '@/components/apprentice/study-tips/StudyFundamentalsTab';

const FundamentalsPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Study Fundamentals
        </h1>
      </div>

      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Building Strong Study Habits
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Success in electrical training starts with good study habits.
            Whether you are preparing for the 18th Edition exam, AM2 practical,
            or college assessments, these fundamentals will help you study more
            effectively and retain information longer.
          </p>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-400 font-semibold text-sm mb-3">
              Key Principles
            </h3>
            <ul className="space-y-2">
              {[
                '30 minutes daily beats a 3-hour weekend cram',
                'Active recall is more effective than re-reading',
                'Study in short, focused blocks (25 min on, 5 min off)',
                'Mix up topics to strengthen connections',
                'Test yourself regularly with practice questions',
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

      <StudyFundamentalsTab />
    </div>
  );
};

export default FundamentalsPage;
