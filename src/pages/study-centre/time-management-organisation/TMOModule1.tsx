import { ArrowLeft, Search, Grid3X3, AlertTriangle, ListOrdered } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Where Does Your Time Go?',
    icon: Search,
    description:
      "Time audits, the busy-but-not-productive trap, Parkinson's Law, hidden time sinks for tradespeople, and the planning fallacy",
  },
  {
    id: 2,
    title: 'The Eisenhower Matrix',
    icon: Grid3X3,
    description:
      'Urgent vs important, the 4 quadrants, moving from reactive to proactive, and practical prioritisation',
  },
  {
    id: 3,
    title: 'Common Time Traps in Construction',
    icon: AlertTriangle,
    description:
      'Saying yes to everything, perfectionism, context switching, underquoting time, and the WhatsApp trap',
  },
  {
    id: 4,
    title: 'Setting Priorities That Stick',
    icon: ListOrdered,
    description:
      "Covey's Big Rocks, the 80/20 Rule, Most Important Tasks, and building a weekly priority system",
  },
];

export default function TMOModule1() {
  useSEO({
    title: 'Module 1: Understanding Time Management | Time Management & Organisation',
    description:
      'Where your time goes, the Eisenhower Matrix, common time traps, and setting priorities that stick.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 1</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Understanding Time Management
            </h1>
            <p className="text-white text-sm sm:text-base">
              Where your time actually goes, how to prioritise effectively, the traps that steal
              hours from your day, and frameworks that help you take control
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../tmo-module-1-section-${section.id}`}
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
