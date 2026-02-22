import { ArrowLeft, Lightbulb, Target, Layers, ShieldOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Fixed vs Growth Mindset',
    icon: Lightbulb,
    description:
      'Carol Dweck&rsquo;s Stanford research, neural plasticity, fixed mindset triggers in the trades, the power of &ldquo;yet&rdquo;',
  },
  {
    id: 2,
    title: 'Why Goal Setting Matters for Tradespeople',
    icon: Target,
    description:
      'Locke &amp; Latham Goal Setting Theory, the goal-performance link, why most tradespeople don&rsquo;t set formal goals',
  },
  {
    id: 3,
    title: 'Types of Goals',
    icon: Layers,
    description:
      'SMART goals (Doran 1981), outcome vs process vs identity goals, short/medium/long-term horizons',
  },
  {
    id: 4,
    title: 'Overcoming Barriers to Growth',
    icon: ShieldOff,
    description:
      'Angela Duckworth&rsquo;s Grit research, common barriers for tradespeople, comfort zone model, building resilience',
  },
];

export default function GSModule1() {
  useSEO({
    title: 'Module 1: Understanding Goals & Growth Mindset | Goal Setting & Growth',
    description:
      'Fixed vs growth mindset, why goal setting matters for tradespeople, types of goals, and overcoming barriers to growth.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 1</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Understanding Goals &amp; Growth Mindset
            </h1>
            <p className="text-white text-sm sm:text-base">
              How your mindset shapes your potential, why goals work, what types of goals exist, and
              how to overcome the barriers that hold tradespeople back
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../gs-module-1-section-${section.id}`}
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
