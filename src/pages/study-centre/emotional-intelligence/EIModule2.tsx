import { ArrowLeft, Heart, Zap, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Understanding Your Emotions',
    icon: Heart,
    description:
      "Goleman's self-awareness competencies, Lisa Feldman Barrett's emotional granularity, Plutchik's wheel, physical signals of emotions",
  },
  {
    id: 2,
    title: 'Recognising Emotional Triggers',
    icon: Zap,
    description:
      'Stimulus-thought-emotion-behaviour chain, common workplace triggers, Albert Ellis ABC model, event vs interpretation',
  },
  {
    id: 3,
    title: 'Strengths, Weaknesses & Blind Spots',
    icon: Search,
    description:
      "Johari Window, SBI feedback model, Dunning-Kruger effect, Carol Dweck's growth mindset",
  },
  {
    id: 4,
    title: 'Building Self-Awareness Habits',
    icon: Sparkles,
    description:
      "Daily emotional check-ins, body scanning, Gibbs' Reflective Cycle, three-minute breathing space, Viktor Frankl",
  },
];

export default function EIModule2() {
  useSEO({
    title: 'Module 2: Self-Awareness | Emotional Intelligence',
    description:
      'Understanding your emotions, recognising triggers, identifying strengths and blind spots, and building self-awareness as a daily habit.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 2</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Self-Awareness</h1>
            <p className="text-white text-sm sm:text-base">
              Understanding your emotions, recognising triggers, identifying strengths and blind
              spots, and building self-awareness as a daily habit
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../ei-module-2-section-${section.id}`}
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
