import { ArrowLeft, Flower2, Timer, Lightbulb, Crosshair } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Mindfulness-Based Stress Reduction',
    icon: Flower2,
    description:
      "Kabat-Zinn's MBSR programme, what mindfulness is (and is not), the evidence base, and core practices",
  },
  {
    id: 2,
    title: 'Practical Mindfulness Techniques',
    icon: Timer,
    description:
      '3-Minute Breathing Space, Box Breathing, 5-4-3-2-1 Grounding, Body Scan, and the mindful commute',
  },
  {
    id: 3,
    title: 'Cognitive Strategies & Reframing',
    icon: Lightbulb,
    description:
      "Beck's CBT, cognitive distortions, Ellis's ABC Model, reframing techniques, and thought records",
  },
  {
    id: 4,
    title: 'Problem-Focused vs Emotion-Focused Coping',
    icon: Crosshair,
    description:
      "Lazarus & Folkman's two coping strategies, when to use which, and avoiding avoidant coping",
  },
];

export default function RSMModule3() {
  useSEO({
    title: 'Module 3: Coping Strategies & Mindfulness | Resilience & Stress Management',
    description:
      'MBSR techniques, practical mindfulness, cognitive reframing, and coping strategies.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 3</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Coping Strategies &amp; Mindfulness
            </h1>
            <p className="text-white text-sm sm:text-base">
              Evidence-based techniques for managing stress, from mindfulness practices to cognitive
              reframing and choosing the right coping strategy
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../rsm-module-3-section-${section.id}`}
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
