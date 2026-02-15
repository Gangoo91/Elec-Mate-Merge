import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import DifficultSituationsTab from '@/components/apprentice/communication-skills/DifficultSituationsTab';

const DifficultSituationsPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Difficult Situations
        </h1>
      </div>

      {/* Intro Card */}
      <Card className="border-orange-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Handling Challenging Conversations
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Every electrician will face difficult conversations — disagreements
            with supervisors, unhappy clients, or workplace conflicts. How you
            handle these situations defines your professionalism and can make
            the difference between escalation and resolution.
          </p>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <h3 className="text-orange-400 font-semibold text-sm mb-3">
              What You Will Learn
            </h3>
            <ul className="space-y-2">
              {[
                'De-escalation techniques that actually work',
                'How to disagree professionally with your supervisor',
                'Managing client expectations and complaints',
                'Resolving workplace conflicts constructively',
                'Knowing when and how to escalate an issue',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-orange-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-white text-xs">
                <strong className="text-red-400">Safety first:</strong> If a
                situation involves safety concerns (e.g. being asked to work
                live), you have the legal right to refuse. See the Your Rights
                section for more detail.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <DifficultSituationsTab />
    </div>
  );
};

export default DifficultSituationsPage;
