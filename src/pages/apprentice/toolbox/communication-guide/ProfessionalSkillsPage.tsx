import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import ProfessionalSkillsTab from '@/components/apprentice/communication-skills/ProfessionalSkillsTab';

const ProfessionalSkillsPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Professional Skills
        </h1>
      </div>

      {/* Intro Card */}
      <Card className="border-green-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Building Professional Communication
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Professional communication goes beyond just talking. It includes
            active listening, body language, written communication, and knowing
            how to express yourself clearly. These skills set top electricians
            apart and are essential for career progression.
          </p>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h3 className="text-green-400 font-semibold text-sm mb-3">
              Core Skills Covered
            </h3>
            <ul className="space-y-2">
              {[
                'Active listening — hear what is actually being said',
                'Clear speaking — get your point across effectively',
                'Body language — non-verbal communication matters',
                'Written communication — emails, reports, and site notes',
                'Professional language — choosing the right words',
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

      {/* Main Content */}
      <ProfessionalSkillsTab />
    </div>
  );
};

export default ProfessionalSkillsPage;
