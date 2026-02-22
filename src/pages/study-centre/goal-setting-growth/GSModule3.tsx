import { ArrowLeft, Zap, HardHat, XCircle, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The Science of Habit Formation',
    icon: Zap,
    description:
      'Habit loop, 66-day research, Fogg Behavior Model, 4 Laws of Behavior Change, compound effect, willpower limits',
  },
  {
    id: 2,
    title: 'Building Professional Habits on Site',
    icon: HardHat,
    description:
      'Morning routines, tool management, safety habits, admin discipline, CPD habits, health on site',
  },
  {
    id: 3,
    title: 'Breaking Bad Habits &amp; Overcoming Resistance',
    icon: XCircle,
    description:
      'Inverting the 4 Laws, common trade bad habits, resistance cycle, temptation bundling, dealing with relapse',
  },
  {
    id: 4,
    title: 'Habit Stacking &amp; Environment Design',
    icon: Layers,
    description:
      'Habit stacking formula, complete trade day stack, environment design, 20-second rule, visual cues, keystone habits',
  },
];

export default function GSModule3() {
  useSEO({
    title: 'Module 3: Building Habits That Stick | Goal Setting & Growth',
    description:
      'The science of habit formation, building professional habits on site, breaking bad habits, habit stacking, and environment design.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 3</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Building Habits That Stick
            </h1>
            <p className="text-white text-sm sm:text-base">
              The science of habit formation, professional habits for electricians, breaking bad
              patterns, and designing your environment for success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../gs-module-3-section-${section.id}`}
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
