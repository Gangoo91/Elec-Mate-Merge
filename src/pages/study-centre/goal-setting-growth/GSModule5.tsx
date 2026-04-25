import { Puzzle, CalendarDays, RefreshCw, Flame } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Pulling it all together',
    icon: Puzzle,
    description:
      'Review of the 4 building blocks, system thinking, 4DX for tradespeople, intrinsic motivation and connecting to your why.',
  },
  {
    id: 2,
    title: 'Creating your 90-day plan',
    icon: CalendarDays,
    description:
      'Why 90 days, the 5-step plan structure, worked examples, the weekly planning ritual and obstacle planning.',
  },
  {
    id: 3,
    title: 'Annual review & goal resetting',
    icon: RefreshCw,
    description:
      'Annual review process, persist vs pivot vs stop, career progression calendar, tax deadlines and exam windows.',
  },
  {
    id: 4,
    title: 'Staying motivated long-term',
    icon: Flame,
    description:
      "The motivation myth, Pink's framework for tradespeople, the messy middle, dealing with demotivation and growth identity.",
  },
];

export default function GSModule5() {
  useSEO({
    title: 'Module 5: Your growth action plan | Goal Setting & Growth',
    description:
      'Pulling it all together, creating your 90-day plan, annual review and goal resetting, and staying motivated long-term.',
  });

  return (
    <ModuleShell
      backTo="../goal-setting-growth"
      backLabel="Goal setting & continuous growth"
      moduleNumber={5}
      title="Your growth action plan"
      description="Pull everything together into a practical system, create your 90-day plan, set up annual reviews and build sustainable long-term motivation."
      tone="purple"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../gs-module-4"
      prevModuleLabel="Tracking progress & continuous improvement"
      nextModuleHref="../gs-module-6"
      nextModuleLabel="Mock exam"
    >
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
    </ModuleShell>
  );
}
