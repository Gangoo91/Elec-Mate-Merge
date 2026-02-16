import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ChevronRight } from 'lucide-react';
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
    title: 'Funding Models',
    slug: 'funding-models',
    icon: '💷',
    colour: 'text-blue-400',
    border: 'border-blue-500/30',
    readTime: '8 min read',
  },
  {
    title: 'Grants & Incentives',
    slug: 'grants',
    icon: '🏗',
    colour: 'text-orange-400',
    border: 'border-orange-500/30',
    readTime: '7 min read',
  },
  {
    title: 'Employer Information',
    slug: 'employer-info',
    icon: '📊',
    colour: 'text-purple-400',
    border: 'border-purple-500/30',
    readTime: '6 min read',
  },
  {
    title: 'Your Rights',
    slug: 'your-rights',
    icon: '🛡',
    colour: 'text-red-400',
    border: 'border-red-500/30',
    readTime: '5 min read',
  },
  {
    title: 'FAQs & Glossary',
    slug: 'faqs',
    icon: '❓',
    colour: 'text-amber-400',
    border: 'border-amber-500/30',
    readTime: '5 min read',
  },
];

const ApprenticeshipFunding = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Apprenticeship Funding
        </h1>
      </div>

      {/* Intro Card */}
      <Card className="border-green-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Your Training is Free
          </h2>
          <p className="text-white text-sm leading-relaxed">
            You should NEVER pay for your apprenticeship training. The government
            funds your training through the Apprenticeship Levy or co-investment
            scheme. The current funding band for Level 3 Installation Electrician /
            Maintenance Electrician is{' '}
            <span className="font-bold text-green-400">£23,000</span>.
          </p>

          {/* Quick Facts sub-card */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h3 className="text-green-400 font-semibold text-sm mb-3">
              Quick Facts
            </h3>
            <ul className="space-y-2">
              {[
                '£23,000 funding band (Level 3)',
                '£0 cost to you as an apprentice',
                'Up to £13,500 in CITB grants for employers',
                '4-year fully funded programme',
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
                `/apprentice/toolbox/apprenticeship-funding/${section.slug}`
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

      {/* Footer Disclaimer */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="p-4">
          <p className="text-white text-xs leading-relaxed">
            Based on ESFA funding rules (August 2025) and Skills England guidance.
            Funding rules change regularly — always verify current amounts with
            your training provider or employer. Skills England replaced IfATE in
            June 2025 as the body responsible for apprenticeship standards.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApprenticeshipFunding;
