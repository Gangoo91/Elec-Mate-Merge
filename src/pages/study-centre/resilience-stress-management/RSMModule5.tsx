import { ArrowLeft, Battery, Power, Flame, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The Importance of Recovery',
    icon: Battery,
    description:
      'The performance-recovery cycle, micro/meso/macro recovery, Working Time Regulations, and why recovery is not laziness',
  },
  {
    id: 2,
    title: 'Switching Off After Work',
    icon: Power,
    description:
      'Transition rituals, digital detox, breaking rumination cycles, and creating end-of-day routines',
  },
  {
    id: 3,
    title: 'Recognising & Managing Burnout',
    icon: Flame,
    description:
      "Maslach's 3 dimensions, burnout vs stress, warning signs, recovery timelines, and seeking help",
  },
  {
    id: 4,
    title: 'Your Personal Resilience Action Plan',
    icon: FileCheck,
    description:
      'SMART action planning, non-negotiable practices, support networks, early warning systems, and monthly reviews',
  },
];

export default function RSMModule5() {
  useSEO({
    title: 'Module 5: Switching Off & Sustaining Wellbeing | Resilience & Stress Management',
    description:
      'The importance of recovery, switching off after work, recognising burnout, and creating your personal resilience action plan.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 5</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Switching Off &amp; Sustaining Wellbeing
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Why recovery matters, how to switch off after work, spotting burnout before it hits,
              and building a personal action plan that sticks
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../rsm-module-5-section-${section.id}`}
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
