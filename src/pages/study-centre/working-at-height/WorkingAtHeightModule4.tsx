import { CalendarCheck, FileCheck, FileText, Cloud } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Planning & organising',
    icon: CalendarCheck,
    description:
      'Competent person requirements, weather limits, task duration, supervision and equipment condition checks.',
  },
  {
    id: 2,
    title: 'Permit-to-work systems',
    icon: FileCheck,
    description:
      'When PTW is required, permit content, issuer/holder roles and the permit lifecycle.',
  },
  {
    id: 3,
    title: 'Method statements & rescue plans',
    icon: FileText,
    description:
      'Method statement content, rescue plan requirements, self/assisted/technical rescue and practice drills.',
  },
  {
    id: 4,
    title: 'Weather, environment & site conditions',
    icon: Cloud,
    description:
      'Beaufort scale thresholds, rain, ice, lightning, ground conditions, overhead power lines and public protection.',
  },
];

export default function WorkingAtHeightModule4() {
  useSEO({
    title: 'Module 4: Safe Systems of Work | Working at Height | Elec-Mate',
    description:
      'Planning, permit-to-work systems, method statements, rescue plans and weather considerations for safe working at height.',
  });

  return (
    <ModuleShell
      backTo="../working-at-height-course"
      backLabel="Working at height"
      moduleNumber={4}
      title="Safe systems of work"
      description="Planning, permit-to-work systems, method statements, rescue plans and environmental considerations for safe working at height."
      tone="amber"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../working-at-height-module-3"
      prevModuleLabel="Fall protection & prevention"
      nextModuleHref="../working-at-height-module-5"
      nextModuleLabel="Incident response & responsibilities"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../working-at-height-module-4-section-${section.id}`}
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
