import { ArrowLeft, Brain, RotateCw, Hourglass, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The Science of Habit Formation',
    icon: Brain,
    description:
      "James Clear's Atomic Habits, the habit loop, the 4 Laws of Behaviour Change, identity-based habits, and the 1% rule",
  },
  {
    id: 2,
    title: 'Creating Routines That Work',
    icon: RotateCw,
    description:
      'Morning routines, pre-work checklists, end-of-day routines, weekly and monthly routines, and building flexibility into structure',
  },
  {
    id: 3,
    title: 'Overcoming Procrastination',
    icon: Hourglass,
    description:
      'Why we procrastinate, common triggers, the just-5-minutes rule, eating the frog, and administrative procrastination',
  },
  {
    id: 4,
    title: 'Your Personal Productivity Action Plan',
    icon: ClipboardCheck,
    description:
      'Bringing it all together: time audit results, SMART action planning, non-negotiable routines, quick wins, and review schedule',
  },
];

export default function TMOModule5() {
  useSEO({
    title: 'Module 5: Building Lasting Habits | Time Management & Organisation',
    description:
      'The science of habit formation, creating routines, overcoming procrastination, and your personal productivity action plan.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 5</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Building Lasting Habits
            </h1>
            <p className="text-white text-sm sm:text-base">
              The science behind habit formation, practical routines for tradespeople, beating
              procrastination, and creating your personal productivity action plan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../tmo-module-5-section-${section.id}`}
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
