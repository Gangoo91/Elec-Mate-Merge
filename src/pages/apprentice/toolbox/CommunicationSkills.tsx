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
    title: 'Workplace Communication',
    slug: 'workplace',
    icon: '👷',
    colour: 'text-blue-400',
    border: 'border-blue-500/30',
    readTime: '10 min read',
  },
  {
    title: 'Professional Skills',
    slug: 'professional-skills',
    icon: '💬',
    colour: 'text-green-400',
    border: 'border-green-500/30',
    readTime: '10 min read',
  },
  {
    title: 'Difficult Situations',
    slug: 'difficult-situations',
    icon: '⚡',
    colour: 'text-orange-400',
    border: 'border-orange-500/30',
    readTime: '12 min read',
  },
  {
    title: 'Tools & Tips',
    slug: 'tools-tips',
    icon: '🛠',
    colour: 'text-purple-400',
    border: 'border-purple-500/30',
    readTime: '12 min read',
  },
];

const CommunicationSkills = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Communication Skills
        </h1>
      </div>

      {/* Intro Card */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Communication Keeps You Safe
          </h2>
          <p className="text-white text-sm leading-relaxed">
            In the electrical trade, clear communication is not just
            professional — it is a{' '}
            <span className="font-bold text-blue-400">safety requirement</span>.
            Misunderstood instructions on site can lead to dangerous situations.
            Good communication also builds trust with clients, helps you learn
            faster from experienced colleagues, and opens doors to career
            advancement.
          </p>

          {/* Quick Facts sub-card */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-400 font-semibold text-sm mb-3">
              Why It Matters
            </h3>
            <ul className="space-y-2">
              {[
                'Prevents dangerous misunderstandings on site',
                'Builds trust and lasting client relationships',
                'Essential for working effectively in teams',
                'Valued by employers for career progression',
                'Required for EPA professional discussion',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />
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
                `/apprentice/toolbox/communication-skills/${section.slug}`
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
            Communication skills are assessed as part of the Professional
            Discussion component of your End Point Assessment (EPA). Practising
            these skills throughout your apprenticeship will prepare you for
            success. These guides are based on industry best practice for the
            electrical contracting sector.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunicationSkills;
