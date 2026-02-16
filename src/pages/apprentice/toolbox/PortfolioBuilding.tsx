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
    title: 'Getting Started',
    slug: 'getting-started',
    icon: '📖',
    colour: 'text-blue-400',
    border: 'border-blue-500/30',
    readTime: '8 min read',
  },
  {
    title: 'Structure & Planning',
    slug: 'structure',
    icon: '🗂',
    colour: 'text-green-400',
    border: 'border-green-500/30',
    readTime: '7 min read',
  },
  {
    title: 'Evidence Collection',
    slug: 'evidence',
    icon: '📸',
    colour: 'text-orange-400',
    border: 'border-orange-500/30',
    readTime: '9 min read',
  },
  {
    title: 'Reflective Practice',
    slug: 'reflective-practice',
    icon: '✍️',
    colour: 'text-purple-400',
    border: 'border-purple-500/30',
    readTime: '7 min read',
  },
  {
    title: 'Industry Guidance',
    slug: 'industry-guidance',
    icon: '🏗',
    colour: 'text-amber-400',
    border: 'border-amber-500/30',
    readTime: '8 min read',
  },
];

const PortfolioBuilding = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Portfolio Building Guide
        </h1>
      </div>

      {/* Intro Card */}
      <Card className="border-green-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Your Portfolio is Your Proof
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Your apprenticeship portfolio is the most important document you
            will create during your training. It proves your competence, maps
            to the KSBs in ST0152, and is essential for your End Point
            Assessment. Start from{' '}
            <span className="font-bold text-green-400">day one</span> and
            build it consistently throughout your 4-year programme.
          </p>

          {/* Quick Facts sub-card */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h3 className="text-green-400 font-semibold text-sm mb-3">
              Quick Facts
            </h3>
            <ul className="space-y-2">
              {[
                'Required for EPA gateway sign-off',
                'Maps to Knowledge, Skills & Behaviours (KSBs)',
                '6 main evidence types to collect',
                'Reviewed during Professional Discussion',
                'Start early — do not leave it until Year 4',
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
                `/apprentice/toolbox/portfolio-building/${section.slug}`
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
            Based on the Level 3 Installation Electrician / Maintenance
            Electrician apprenticeship standard (ST0152 v1.2) and current EPAO
            requirements. Your training provider may have specific portfolio
            formats — always check their guidance alongside this guide.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioBuilding;
