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
    title: 'Study Fundamentals',
    slug: 'fundamentals',
    icon: '💡',
    colour: 'text-blue-400',
    border: 'border-blue-500/30',
    readTime: '8 min read',
  },
  {
    title: 'Exam Strategies',
    slug: 'exam-strategies',
    icon: '🎯',
    colour: 'text-green-400',
    border: 'border-green-500/30',
    readTime: '7 min read',
  },
  {
    title: 'Learning & Revision',
    slug: 'revision',
    icon: '🧠',
    colour: 'text-orange-400',
    border: 'border-orange-500/30',
    readTime: '8 min read',
  },
  {
    title: 'Study Time Management',
    slug: 'study-time',
    icon: '⏰',
    colour: 'text-purple-400',
    border: 'border-purple-500/30',
    readTime: '6 min read',
  },
  {
    title: 'Resources',
    slug: 'resources',
    icon: '📚',
    colour: 'text-amber-400',
    border: 'border-amber-500/30',
    readTime: '6 min read',
  },
  {
    title: 'Study Psychology',
    slug: 'psychology',
    icon: '❤️',
    colour: 'text-red-400',
    border: 'border-red-500/30',
    readTime: '7 min read',
  },
];

const StudyTips = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Study Hub
        </h1>
      </div>

      {/* Intro Card */}
      <Card className="border-elec-yellow/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Study Smarter, Not Harder
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Your complete study companion for electrical training success.
            Master the 18th Edition, Level 3, and all electrical qualifications
            with proven study strategies, revision techniques, and exam tips.
            Consistent daily study —{' '}
            <span className="font-bold text-elec-yellow">
              even just 30 minutes
            </span>{' '}
            — is more effective than weekend cramming.
          </p>

          <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
            <h3 className="text-elec-yellow font-semibold text-sm mb-3">
              Quick Facts
            </h3>
            <ul className="space-y-2">
              {[
                '8+ proven study methods tailored to electrical training',
                '30 minutes daily beats a 3-hour cram session',
                'Active recall is 3x more effective than re-reading',
                'Practice questions are the closest thing to the real exam',
                'Your mindset matters as much as your technique',
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
              navigate(`/apprentice/toolbox/study-tips/${section.slug}`)
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
        <CardContent className="p-4">
          <p className="text-white text-xs leading-relaxed">
            These study techniques are based on cognitive science research and
            adapted for electrical apprenticeship training. They work for the
            18th Edition, City & Guilds, EAL, AM2, and End Point Assessment
            preparation. Consistency is the single biggest factor in exam
            success.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyTips;
