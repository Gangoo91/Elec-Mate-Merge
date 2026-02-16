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
    title: 'Time Fundamentals',
    slug: 'fundamentals',
    icon: '⏰',
    colour: 'text-blue-400',
    border: 'border-blue-500/30',
    readTime: '7 min read',
  },
  {
    title: 'Schedule Planning',
    slug: 'scheduling',
    icon: '📅',
    colour: 'text-green-400',
    border: 'border-green-500/30',
    readTime: '7 min read',
  },
  {
    title: 'Stress & Wellbeing',
    slug: 'stress',
    icon: '💚',
    colour: 'text-orange-400',
    border: 'border-orange-500/30',
    readTime: '8 min read',
  },
  {
    title: 'Work-Life Balance',
    slug: 'balance',
    icon: '⚖️',
    colour: 'text-purple-400',
    border: 'border-purple-500/30',
    readTime: '6 min read',
  },
  {
    title: 'Productivity Tools',
    slug: 'productivity',
    icon: '🔧',
    colour: 'text-amber-400',
    border: 'border-amber-500/30',
    readTime: '6 min read',
  },
  {
    title: 'Interactive Tools',
    slug: 'interactive',
    icon: '📊',
    colour: 'text-red-400',
    border: 'border-red-500/30',
    readTime: '5 min read',
  },
];

const TimeManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Time Management
        </h1>
      </div>

      {/* Intro Card */}
      <Card className="border-elec-yellow/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Work Smarter, Not Harder
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Balancing a 4-year apprenticeship with study, travel, and personal
            life is a real challenge. Good time management is not about cramming
            more in — it is about making space for{' '}
            <span className="font-bold text-elec-yellow">what matters</span>.
            These skills will serve you throughout your entire career.
          </p>

          <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
            <h3 className="text-elec-yellow font-semibold text-sm mb-3">
              Quick Facts
            </h3>
            <ul className="space-y-2">
              {[
                '20% of your time must be off-the-job training',
                '40+ hours per week between work and college',
                'Planning weekly saves hours of wasted time',
                'Rest and recovery are essential, not optional',
                'These skills are valued by every employer',
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
                `/apprentice/toolbox/time-management/${section.slug}`
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

      {/* Footer */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <p className="text-white text-xs leading-relaxed">
            Effective time management is a life skill that goes far beyond your
            apprenticeship. The habits you build now will benefit you throughout
            your career and personal life.
          </p>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
            <p className="text-white text-xs">
              <strong className="text-purple-400">Need support?</strong> If you
              are struggling with workload or stress, talk to your training
              provider or visit our Mental Health section for professional
              support options. Asking for help is a sign of strength.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeManagement;
