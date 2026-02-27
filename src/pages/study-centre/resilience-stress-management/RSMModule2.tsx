import { ArrowLeft, RefreshCw, Atom, ShieldCheck, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What Is Resilience?',
    icon: RefreshCw,
    description:
      'APA definition, resilience as a learnable skill, bouncing back vs bouncing forward, and common myths',
  },
  {
    id: 2,
    title: 'The Science of Resilience',
    icon: Atom,
    description:
      'Neuroplasticity, growth mindset, post-traumatic growth, learned optimism, and the 3 Ps',
  },
  {
    id: 3,
    title: 'Resilience Factors & Protective Resources',
    icon: ShieldCheck,
    description:
      'The 7 resilience abilities, protective factors, risk factors, and the resilience bucket metaphor',
  },
  {
    id: 4,
    title: 'Self-Assessment & Knowing Your Triggers',
    icon: ClipboardList,
    description:
      'Identifying personal triggers, stress diaries, body awareness, energy audits, and resilience baselines',
  },
];

export default function RSMModule2() {
  useSEO({
    title: 'Module 2: Understanding Resilience | Resilience & Stress Management',
    description:
      'What resilience is, the science behind it, protective factors, and knowing your triggers.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 2</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Understanding Resilience
            </h1>
            <p className="text-white text-sm sm:text-base">
              What resilience really means, the science behind it, and how to build a personal
              resilience baseline
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../rsm-module-2-section-${section.id}`}
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
