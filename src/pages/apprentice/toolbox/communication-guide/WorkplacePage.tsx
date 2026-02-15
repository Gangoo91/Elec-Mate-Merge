import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import WorkplaceCommunicationTab from '@/components/apprentice/communication-skills/WorkplaceCommunicationTab';

const WorkplacePage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Workplace Communication
        </h1>
      </div>

      {/* Intro Card */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Communicating on Site
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Good communication on site keeps everyone safe, prevents costly
            mistakes, and builds your professional reputation. Whether you are
            talking to your supervisor, working alongside colleagues, or dealing
            with clients, how you communicate matters.
          </p>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-400 font-semibold text-sm mb-3">
              Key Principles
            </h3>
            <ul className="space-y-2">
              {[
                'Be clear and specific — avoid vague descriptions',
                'Confirm instructions by repeating them back',
                'Ask questions if anything is unclear',
                'Use the right communication method for the situation',
                'Stay calm and professional, even under pressure',
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

      {/* Main Content */}
      <WorkplaceCommunicationTab />
    </div>
  );
};

export default WorkplacePage;
