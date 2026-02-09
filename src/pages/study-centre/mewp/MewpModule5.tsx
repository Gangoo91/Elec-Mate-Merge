import { ArrowLeft, LifeBuoy, ArrowDownToLine, ListChecks, FileWarning } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Emergency Scenarios & Rescue Plan Requirements',
    icon: LifeBuoy,
    description:
      'Legal requirement for rescue plans, emergency scenarios, rescue plan components, communication methods',
  },
  {
    id: 2,
    title: 'Emergency Lowering Systems & Ground Controls',
    icon: ArrowDownToLine,
    description:
      'Four control systems, auxiliary power units, manual lowering valves, hand pumps, engine override procedures',
  },
  {
    id: 3,
    title: 'Rescue Procedures Step by Step',
    icon: ListChecks,
    description:
      'Option A (ground controls), Option B (emergency lowering), Option C (emergency services), nominated ground rescue person',
  },
  {
    id: 4,
    title: 'Post-Incident Procedures, RIDDOR & Lessons Learnt',
    icon: FileWarning,
    description:
      'Post-incident actions, RIDDOR reporting, near-miss reporting, accident investigation, 2024 IPAF statistics',
  },
];

export default function MewpModule5() {
  useSEO({
    title: 'Module 5: Emergency Procedures, Rescue & Reporting | MEWP Operator Training',
    description:
      'MEWP emergency procedures, rescue plans, lowering systems, step-by-step rescue, RIDDOR reporting and accident statistics.',
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
              <Link to="../mewp-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to MEWP Course
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
              <span className="text-elec-yellow text-xs font-semibold">MODULE 5</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Emergency Procedures, Rescue &amp; Reporting
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              What to do when things go wrong &mdash; emergency lowering, rescue procedures, the
              ground rescue person, and post-incident reporting
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../mewp-module-5-section-${section.id}`}
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
