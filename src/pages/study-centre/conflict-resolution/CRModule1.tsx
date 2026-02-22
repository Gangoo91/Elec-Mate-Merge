import { ArrowLeft, HelpCircle, LayoutGrid, AlertTriangle, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What Conflict Actually Is',
    icon: HelpCircle,
    description:
      'Constructive vs destructive conflict, the cost of unresolved conflict, why tradespeople avoid it, and conflict as information',
  },
  {
    id: 2,
    title: 'The Five Conflict Styles',
    icon: LayoutGrid,
    description:
      'Thomas-Kilmann Conflict Mode Instrument: competing, collaborating, compromising, avoiding, and accommodating',
  },
  {
    id: 3,
    title: 'Common Conflict Triggers in Construction',
    icon: AlertTriangle,
    description:
      'Money disputes, scope disagreements, programme clashes, quality disputes, territory, and power imbalances',
  },
  {
    id: 4,
    title: 'Understanding Your Default Response',
    icon: UserCheck,
    description:
      'Fight, flight, or freeze, the ladder of inference, cognitive distortions, and self-assessment',
  },
];

export default function CRModule1() {
  useSEO({
    title: 'Module 1: Understanding Conflict | Conflict Resolution & Difficult Conversations',
    description:
      'What conflict is, the five conflict styles (Thomas-Kilmann), common triggers in construction, and understanding your default response.',
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
              <Link to="../conflict-resolution">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Conflict Resolution
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
              Understanding Conflict
            </h1>
            <p className="text-white text-sm sm:text-base">
              What conflict actually is, how different people handle it, the triggers that cause it
              on construction sites, and how to understand your own default response
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../cr-module-1-section-${section.id}`}
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
