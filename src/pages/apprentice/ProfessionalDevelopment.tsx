import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
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
    title: 'Career Pathways',
    slug: 'career-pathways',
    icon: '📈',
    colour: 'text-blue-400',
    border: 'border-blue-500/30',
    readTime: '10 min read',
  },
  {
    title: 'Certifications & Qualifications',
    slug: 'certifications',
    icon: '🏅',
    colour: 'text-yellow-400',
    border: 'border-yellow-500/30',
    readTime: '12 min read',
  },
  {
    title: 'Professional Skills',
    slug: 'professional-skills',
    icon: '💡',
    colour: 'text-green-400',
    border: 'border-green-500/30',
    readTime: '10 min read',
  },
  {
    title: 'Continuing Education',
    slug: 'continuing-education',
    icon: '📚',
    colour: 'text-purple-400',
    border: 'border-purple-500/30',
    readTime: '12 min read',
  },
  {
    title: 'Industry Networking',
    slug: 'industry-networking',
    icon: '🤝',
    colour: 'text-orange-400',
    border: 'border-orange-500/30',
    readTime: '8 min read',
  },
];

const ProfessionalDevelopment = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">Professional Development</h1>
      </div>

      {/* Intro Card */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-white">Build Your Future</h2>
          <p className="text-white text-sm leading-relaxed">
            Technical skills get you the job — professional skills help you build a career. Explore
            pathways, understand certifications, develop essential skills, and build the industry
            connections that will shape your future as an electrical professional.
          </p>
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
            onClick={() => navigate(`/apprentice/professional-development/${section.slug}`)}
            className={`w-full flex items-center gap-3 p-4 rounded-lg bg-white/5 ${section.border} border
              touch-manipulation active:scale-[0.98] transition-transform min-h-[44px] text-left`}
          >
            <span className="text-xl flex-shrink-0">{section.icon}</span>
            <div className="flex-1 min-w-0">
              <span className={`font-medium text-sm ${section.colour}`}>{section.title}</span>
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
            Based on UK industry data, ESFA guidance, and IET/ECA professional standards. Career and
            salary information reflects current UK electrical industry averages and may vary by
            region, employer, and experience level.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalDevelopment;
