import { ArrowLeft, Dumbbell, Users, ShieldOff, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Physical Wellbeing & Recovery',
    icon: Dumbbell,
    description:
      'Sleep hygiene, nutrition on site, structured exercise, substance awareness, and sustained energy',
  },
  {
    id: 2,
    title: 'Social Connection & Peer Support',
    icon: Users,
    description:
      'Mates in Mind, the power of talking, peer support models, professional help, and key helplines',
  },
  {
    id: 3,
    title: 'Healthy Boundaries & Workload Management',
    icon: ShieldOff,
    description:
      'Saying no, Working Time Regulations, client expectations, digital boundaries, and the overwork trap',
  },
  {
    id: 4,
    title: 'Financial Stress & Practical Problem-Solving',
    icon: Wallet,
    description:
      'Emergency funds, CIS tax planning, debt management, insurance, and financial support signposting',
  },
];

export default function RSMModule4() {
  useSEO({
    title: 'Module 4: Building Daily Resilience | Resilience & Stress Management',
    description:
      'Physical wellbeing, social connection, healthy boundaries, and managing financial stress.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 4</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Building Daily Resilience
            </h1>
            <p className="text-white text-sm sm:text-base">
              Practical habits for physical health, social connection, workload management, and
              financial stability that build resilience day by day
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../rsm-module-4-section-${section.id}`}
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
