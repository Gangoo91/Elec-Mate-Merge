import { ArrowLeft, Focus, Calendar, Award, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The SMART Framework for Trade Careers',
    icon: Focus,
    description:
      'Specific, Measurable, Achievable, Relevant, Time-bound goals for apprentices, qualified electricians, and business owners',
  },
  {
    id: 2,
    title: 'Short, Medium &amp; Long-Term Goal Planning',
    icon: Calendar,
    description:
      'Three horizons framework, goal cascading, planning fallacy, seasonal planning, review cycles',
  },
  {
    id: 3,
    title: 'Career Goals for Electricians',
    icon: Award,
    description:
      'JIB pathway, ECS cards, City &amp; Guilds qualifications, professional registration, competent person schemes, specialisation paths',
  },
  {
    id: 4,
    title: 'Creating Your Personal Goal Map',
    icon: Map,
    description:
      'Personal mission statement, wheel of life, goal prioritisation, 5-step goal writing, commitment devices',
  },
];

export default function GSModule2() {
  useSEO({
    title: 'Module 2: Setting Effective Goals | Goal Setting & Growth',
    description:
      'SMART framework for trade careers, short/medium/long-term goal planning, career goals for electricians, and creating your personal goal map.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../goal-setting-growth">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Goal Setting &amp; Growth
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3">
              <span className="text-rose-400 text-xs font-semibold">MODULE 2</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Setting Effective Goals
            </h1>
            <p className="text-white text-sm sm:text-base">
              The SMART framework, short/medium/long-term planning, career pathways for
              electricians, and building your personal goal map
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../gs-module-2-section-${section.id}`}
                sectionNumber={section.id}
                title={section.title}
                description={section.description}
                icon={section.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
