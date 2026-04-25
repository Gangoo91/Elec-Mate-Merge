import { ClipboardCheck, Search, Wrench, Lightbulb } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The TILE framework in depth',
    icon: ClipboardCheck,
    description:
      'Detailed Task, Individual, Load and Environment factor analysis for manual handling operations.',
  },
  {
    id: 2,
    title: 'Identifying manual handling hazards',
    icon: Search,
    description:
      'Workplace observation, task analysis, injury data review and worker consultation.',
  },
  {
    id: 3,
    title: 'Mechanical aids & equipment',
    icon: Wrench,
    description: 'Trolleys, sack trucks, hoists, pallet trucks, conveyors and vacuum lifters.',
  },
  {
    id: 4,
    title: 'Designing out manual handling',
    icon: Lightbulb,
    description: 'Elimination, substitution, automation, delivery planning and storage design.',
  },
];

export default function ManualHandlingModule3() {
  useSEO({
    title: 'Module 3: Risk Assessment & Reduction | Manual Handling | Elec-Mate',
    description:
      'The TILE framework, identifying hazards, mechanical aids and designing out manual handling risks.',
  });

  return (
    <ModuleShell
      backTo="../manual-handling-course"
      backLabel="Manual handling"
      moduleNumber={3}
      title="Risk assessment & reduction"
      description="The TILE framework in depth, identifying hazards, mechanical aids and designing out manual handling risks."
      tone="emerald"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../manual-handling-module-2"
      prevModuleLabel="Principles of safe lifting"
      nextModuleHref="../manual-handling-module-4"
      nextModuleLabel="Workplace-specific handling"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../manual-handling-module-3-section-${section.id}`}
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
