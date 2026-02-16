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
    title: 'Mistake Categories',
    slug: 'categories',
    icon: '⚠️',
    colour: 'text-orange-400',
    border: 'border-orange-500/30',
    readTime: '8 min read',
  },
  {
    title: 'Recovery Strategies',
    slug: 'recovery',
    icon: '🎯',
    colour: 'text-blue-400',
    border: 'border-blue-500/30',
    readTime: '7 min read',
  },
  {
    title: 'Building Resilience',
    slug: 'resilience',
    icon: '🧠',
    colour: 'text-purple-400',
    border: 'border-purple-500/30',
    readTime: '7 min read',
  },
  {
    title: 'Case Studies',
    slug: 'case-studies',
    icon: '📋',
    colour: 'text-green-400',
    border: 'border-green-500/30',
    readTime: '9 min read',
  },
  {
    title: 'Prevention Strategies',
    slug: 'prevention',
    icon: '🛡',
    colour: 'text-amber-400',
    border: 'border-amber-500/30',
    readTime: '6 min read',
  },
  {
    title: 'Support Systems',
    slug: 'support',
    icon: '🤝',
    colour: 'text-red-400',
    border: 'border-red-500/30',
    readTime: '5 min read',
  },
];

const LearningFromMistakes = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Learning From Mistakes
        </h1>
      </div>

      {/* Intro Card */}
      <Card className="border-purple-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Mistakes Are How You Grow
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Every successful electrician has made mistakes along the way. What
            sets the best apart is not avoiding mistakes entirely — it is how
            they{' '}
            <span className="font-bold text-purple-400">
              respond, recover, and learn
            </span>{' '}
            from them. This guide will help you turn setbacks into stepping
            stones for your career.
          </p>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h3 className="text-purple-400 font-semibold text-sm mb-3">
              Key Takeaways
            </h3>
            <ul className="space-y-2">
              {[
                'Mistakes are a normal part of learning any trade',
                'Owning your mistakes earns respect, not criticism',
                'Every mistake is a learning opportunity in disguise',
                'Resilience is a skill you can build over time',
                'A strong support network makes all the difference',
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
                `/apprentice/toolbox/learning-from-mistakes/${section.slug}`
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
        <CardContent className="p-4">
          <p className="text-white text-xs leading-relaxed">
            These guides are based on real experiences from electrical
            apprentices and qualified electricians across the industry. Remember:
            the most experienced professionals will tell you that their biggest
            growth came from their biggest challenges.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningFromMistakes;
