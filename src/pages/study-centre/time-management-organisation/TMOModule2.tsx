import { ArrowLeft, Inbox, CalendarRange, Calculator, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The GTD Method for Tradespeople',
    icon: Inbox,
    description:
      "David Allen's Getting Things Done: capture, clarify, organise, reflect, engage — adapted for sole traders and electricians",
  },
  {
    id: 2,
    title: 'Weekly Planning & Job Scheduling',
    icon: CalendarRange,
    description:
      'The weekly plan as the cornerstone of time management, buffer time, blocking admin time, and visual scheduling',
  },
  {
    id: 3,
    title: 'Quoting, Estimating & Time Allocation',
    icon: Calculator,
    description:
      'Accurate time estimation, reference times, quoting frameworks, scope creep, and tracking actuals vs estimates',
  },
  {
    id: 4,
    title: 'Managing Multiple Jobs',
    icon: Layers,
    description:
      'Job pipeline stages, tracking systems, managing client expectations, work-in-progress limits, and handling cancellations',
  },
];

export default function TMOModule2() {
  useSEO({
    title: 'Module 2: Planning & Scheduling | Time Management & Organisation',
    description:
      'The GTD method, weekly planning, quoting and estimating, and managing multiple jobs.',
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
              <Link to="../time-management-organisation">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Time Management &amp; Organisation
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
              Planning &amp; Scheduling
            </h1>
            <p className="text-white text-sm sm:text-base">
              From capturing every commitment to scheduling your week, quoting accurately, and
              keeping multiple jobs on track without dropping anything
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../tmo-module-2-section-${section.id}`}
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
