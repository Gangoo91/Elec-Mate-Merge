import { ArrowLeft, Flame, Sun, Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Internal Motivation & Drive',
    icon: Flame,
    description:
      "Goleman's motivation competencies, Daniel Pink's Drive model, self-determination theory, flow states and Csikszentmihalyi",
  },
  {
    id: 2,
    title: 'Optimism & Resilience',
    icon: Sun,
    description:
      "Seligman's learned optimism, the three Ps, ABCDE model, pessimistic vs optimistic explanatory styles, realistic optimism",
  },
  {
    id: 3,
    title: 'Understanding Empathy',
    icon: Heart,
    description:
      "Goleman's empathy competencies, three types of empathy, empathy vs sympathy, mirror neurons, Brene Brown",
  },
  {
    id: 4,
    title: 'Reading People & Perspective-Taking',
    icon: Eye,
    description:
      "Ekman's micro-expressions, body language, active listening, perspective-taking exercises, cultural sensitivity",
  },
];

export default function EIModule4() {
  useSEO({
    title: 'Module 4: Motivation & Empathy | Emotional Intelligence',
    description:
      'Internal drive, optimism and resilience, understanding and practising empathy, reading people and taking different perspectives.',
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
              <Link to="../emotional-intelligence">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Emotional Intelligence
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3">
              <span className="text-rose-400 text-xs font-semibold">MODULE 4</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Motivation &amp; Empathy
            </h1>
            <p className="text-white text-sm sm:text-base">
              Internal drive, optimism and resilience, understanding and practising empathy, reading
              people and taking different perspectives
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../ei-module-4-section-${section.id}`}
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
