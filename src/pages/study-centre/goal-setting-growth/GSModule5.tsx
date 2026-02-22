import { ArrowLeft, Puzzle, CalendarDays, RefreshCw, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Pulling It All Together',
    icon: Puzzle,
    description:
      'Review 4 building blocks, system thinking, 4DX for tradespeople, intrinsic motivation, connecting to your why',
  },
  {
    id: 2,
    title: 'Creating Your 90-Day Plan',
    icon: CalendarDays,
    description:
      'Why 90 days, 5-step plan structure, worked examples, weekly planning ritual, obstacles planning',
  },
  {
    id: 3,
    title: 'Annual Review &amp; Goal Resetting',
    icon: RefreshCw,
    description:
      'Annual review process, persist vs pivot vs stop, career progression calendar, tax deadlines, exam windows',
  },
  {
    id: 4,
    title: 'Staying Motivated Long-Term',
    icon: Flame,
    description:
      'Motivation myth, Pink&rsquo;s framework for tradespeople, messy middle, dealing with demotivation, growth identity',
  },
];

export default function GSModule5() {
  useSEO({
    title: 'Module 5: Your Growth Action Plan | Goal Setting & Growth',
    description:
      'Pulling it all together, creating your 90-day plan, annual review and goal resetting, and staying motivated long-term.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 5</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Your Growth Action Plan
            </h1>
            <p className="text-white text-sm sm:text-base">
              Pull everything together into a practical system, create your 90-day plan, set up
              annual reviews, and build sustainable long-term motivation
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../gs-module-5-section-${section.id}`}
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
