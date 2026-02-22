import { ArrowLeft, Brain, TrendingUp, HardHat, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What Is Stress?',
    icon: Brain,
    description:
      "Selye's General Adaptation Syndrome, eustress vs distress, Lazarus & Folkman's Transactional Model, and fight-flight-freeze",
  },
  {
    id: 2,
    title: 'The Stress-Performance Curve',
    icon: TrendingUp,
    description:
      'The Yerkes-Dodson Law, the inverted-U, optimal arousal, and individual differences in stress response',
  },
  {
    id: 3,
    title: 'Stress in the Construction Industry',
    icon: HardHat,
    description:
      'HSE statistics, common stressors, the 6 Management Standards, site culture, and legal duties',
  },
  {
    id: 4,
    title: 'Recognising the Signs',
    icon: Search,
    description:
      'Physical, emotional, behavioural, and cognitive symptoms of stress in yourself and others',
  },
];

export default function RSMModule1() {
  useSEO({
    title: 'Module 1: Understanding Stress | Resilience & Stress Management',
    description:
      'What stress is, the stress-performance curve, stress in construction, and recognising the signs.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../resilience-stress-management">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Resilience &amp; Stress Management
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3">
              <span className="text-rose-400 text-xs font-semibold">MODULE 1</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Understanding Stress</h1>
            <p className="text-white/60 text-sm sm:text-base">
              What stress is, how it affects performance, why construction workers are particularly
              vulnerable, and how to spot the warning signs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../rsm-module-1-section-${section.id}`}
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
