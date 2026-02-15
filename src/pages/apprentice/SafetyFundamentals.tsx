import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ChevronRight, AlertTriangle } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

interface Section {
  title: string;
  slug: string;
  icon: string;
  colour: string;
  border: string;
  readTime: string;
}

const sections: Section[] = [
  {
    title: 'Safe Isolation',
    slug: 'safe-isolation',
    icon: '🔒',
    colour: 'text-red-400',
    border: 'border-red-500/30',
    readTime: '12 min read',
  },
  {
    title: 'PPE & Equipment',
    slug: 'ppe-equipment',
    icon: '🦺',
    colour: 'text-blue-400',
    border: 'border-blue-500/30',
    readTime: '10 min read',
  },
  {
    title: 'Working at Height',
    slug: 'working-at-height',
    icon: '🪜',
    colour: 'text-orange-400',
    border: 'border-orange-500/30',
    readTime: '10 min read',
  },
  {
    title: 'Emergency Procedures',
    slug: 'emergency-procedures',
    icon: '🚨',
    colour: 'text-red-400',
    border: 'border-red-500/30',
    readTime: '12 min read',
  },
  {
    title: 'Risk Assessment & RAMS',
    slug: 'risk-assessment',
    icon: '📋',
    colour: 'text-green-400',
    border: 'border-green-500/30',
    readTime: '10 min read',
  },
  {
    title: 'Site Safety Rules',
    slug: 'site-safety-rules',
    icon: '🏗',
    colour: 'text-purple-400',
    border: 'border-purple-500/30',
    readTime: '10 min read',
  },
];

const SafetyFundamentals = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Safety Fundamentals
        </h1>
      </div>

      {/* Critical Warning */}
      <Card className="border-red-500/30 bg-red-500/10">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
            <h2 className="text-lg font-semibold text-red-400">
              Electricity Can Kill
            </h2>
          </div>
          <p className="text-white text-sm leading-relaxed">
            These are not just guidelines — they are the difference between going
            home safely and not going home at all. As an apprentice electrician, safety
            is your{' '}
            <span className="font-bold text-red-400">number one priority</span>.
            Never compromise on safety, no matter what anyone tells you. You have the
            legal right to refuse unsafe work.
          </p>
        </CardContent>
      </Card>

      {/* Intro Card */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Your Safety Knowledge Base
          </h2>
          <p className="text-white text-sm leading-relaxed">
            This guide covers everything you need to know about staying safe on site
            as an electrical apprentice. From safe isolation procedures to emergency
            response, risk assessment to PPE requirements — this is your go-to
            reference for safety on the job.
          </p>

          {/* Quick Facts */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-400 font-semibold text-sm mb-3">
              Key Safety Facts
            </h3>
            <ul className="space-y-2">
              {[
                'Around 30 electrical deaths at work in the UK over the past 5 years',
                'Safe isolation prevents the majority of electrical accidents',
                'You must NEVER work on live systems without formal authorisation',
                'PPE is your last line of defence — not your first',
                'Every worker has a legal duty to report unsafe conditions',
                'RIDDOR requires reporting of serious workplace incidents to the HSE',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Section Header */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-elec-yellow" />
        <h2 className="text-base font-semibold text-white">Explore Sections</h2>
      </div>

      {/* Section Cards */}
      <div className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.slug}
            onClick={() =>
              navigate(
                `/apprentice/safety-fundamentals/${section.slug}`
              )
            }
            className={`w-full flex items-center gap-3 p-4 rounded-lg bg-white/5 ${section.border} border
              touch-manipulation active:scale-[0.98] transition-transform min-h-[44px] text-left`}
          >
            <span className="text-xl flex-shrink-0">{section.icon}</span>
            <div className="flex-1 min-w-0">
              <span className={`font-medium text-sm ${section.colour}`}>
                {section.title}
              </span>
              <p className="text-white text-xs mt-0.5">{section.readTime}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
          </button>
        ))}
      </div>

      {/* Emergency Contacts Quick Reference */}
      <Card className="border-red-500/20 bg-red-500/5">
        <CardContent className="p-4 space-y-3">
          <h3 className="text-sm font-semibold text-red-400">
            Emergency Numbers — Save These
          </h3>
          <div className="space-y-2">
            {[
              { label: 'Emergency Services', number: '999', note: 'Life-threatening emergencies' },
              { label: 'HSE Incident Contact Centre', number: '0345 300 9923', note: 'Report serious incidents' },
              { label: 'National Gas Emergency', number: '0800 111 999', note: 'If you hit a gas pipe' },
              { label: 'Electrical Safety First', number: '020 3463 5100', note: 'Electrical safety advice' },
            ].map((contact) => (
              <div key={contact.label} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-white text-sm font-medium">{contact.label}</p>
                  <p className="text-white text-xs">{contact.note}</p>
                </div>
                <span className="text-red-400 font-bold text-sm">{contact.number}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="p-4">
          <p className="text-white text-xs leading-relaxed">
            Safety information based on BS 7671:2018+A2:2022, the Health and Safety
            at Work Act 1974, the Electricity at Work Regulations 1989, HSE Guidance
            Note GS38, and current industry best practice. Always follow your
            employer's specific safety procedures and risk assessments. If in doubt,
            stop work and ask your supervisor.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyFundamentals;
