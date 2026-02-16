import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ChevronRight, Zap } from 'lucide-react';
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
    title: 'EPA Components',
    slug: 'components',
    icon: '📋',
    colour: 'text-blue-400',
    border: 'border-blue-500/30',
    readTime: '10 min read',
  },
  {
    title: 'Grading & Results',
    slug: 'grading',
    icon: '🏆',
    colour: 'text-amber-400',
    border: 'border-amber-500/30',
    readTime: '8 min read',
  },
  {
    title: 'Preparation Guide',
    slug: 'preparation',
    icon: '📖',
    colour: 'text-green-400',
    border: 'border-green-500/30',
    readTime: '10 min read',
  },
  {
    title: 'Gateway & Readiness',
    slug: 'gateway',
    icon: '🚪',
    colour: 'text-purple-400',
    border: 'border-purple-500/30',
    readTime: '8 min read',
  },
  {
    title: 'Mistakes, Tips & FAQs',
    slug: 'tips',
    icon: '💡',
    colour: 'text-red-400',
    border: 'border-red-500/30',
    readTime: '7 min read',
  },
];

const EndPointAssessment = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          End Point Assessment
        </h1>
      </div>

      {/* Intro Card */}
      <Card className="border-elec-yellow/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Your Final Assessment
          </h2>
          <p className="text-white text-sm leading-relaxed">
            End Point Assessment (EPA) is the independent final assessment of
            your apprenticeship. Conducted by an EPAO, it confirms you have
            achieved the Knowledge, Skills, and Behaviours required by the Level
            3 Installation Electrician / Maintenance Electrician standard
            (ST0152).
          </p>

          {/* Quick Facts */}
          <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
            <h3 className="text-elec-yellow font-semibold text-sm mb-3">
              Key Facts
            </h3>
            <ul className="space-y-2">
              {[
                '3 assessment components',
                '3-month assessment window',
                'Graded: Pass, Merit, or Distinction',
                'Must pass Gateway before EPA begins',
                'AM2 practical assessment required before Gateway',
                'Funded within the £23,000 funding band',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* EPA Simulator CTA */}
      <button
        onClick={() => navigate('/apprentice/epa-simulator')}
        className="w-full flex items-center gap-3 p-4 rounded-lg bg-purple-500/10 border border-purple-500/30
          touch-manipulation active:scale-[0.98] transition-transform min-h-[44px] text-left"
      >
        <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
          <Zap className="h-6 w-6 text-purple-400" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-medium text-sm text-purple-400">
            EPA Readiness Simulator
          </span>
          <p className="text-white text-xs mt-0.5">
            AI-powered mock discussions, knowledge tests & readiness dashboard
          </p>
        </div>
        <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
      </button>

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
                `/apprentice/toolbox/end-point-assessment/${section.slug}`
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
            Electrician apprenticeship standard (ST0152 v1.2) and current EPA
            assessment plans. Assessment details may vary by EPAO — always
            confirm specific requirements with your training provider and
            assessment organisation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EndPointAssessment;
