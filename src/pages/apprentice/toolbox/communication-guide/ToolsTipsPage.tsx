import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import InteractiveToolsTab from '@/components/apprentice/communication-skills/InteractiveToolsTab';

const ToolsTipsPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Tools & Tips
        </h1>
      </div>

      {/* Intro Card */}
      <Card className="border-purple-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Communication Frameworks & Practice
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Use these proven frameworks and practice scenarios to build your
            communication confidence. The STAR method, CLEAR communication
            model, and real-world practice scenarios will help you handle any
            situation on site.
          </p>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h3 className="text-purple-400 font-semibold text-sm mb-3">
              Included
            </h3>
            <ul className="space-y-2">
              {[
                'STAR Method — structure your responses clearly',
                'CLEAR Communication — 5-step model for any situation',
                'Practice scenarios with real electrical context',
                'Tips for phone, face-to-face, written, and urgent comms',
                'Difficult conversation scripts and approaches',
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

      {/* Main Content */}
      <InteractiveToolsTab />
    </div>
  );
};

export default ToolsTipsPage;
