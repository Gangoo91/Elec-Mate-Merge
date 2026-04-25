import { AlertTriangle, ClipboardCheck, LifeBuoy, HeartPulse } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Common hazards',
    icon: AlertTriangle,
    description:
      'Falls from height, tower collapse, electrocution, falling objects and manual handling.',
  },
  {
    id: 2,
    title: 'Risk assessment',
    icon: ClipboardCheck,
    description:
      'HSE 5-step process, tower-specific hazards, likelihood x severity and control measures.',
  },
  {
    id: 3,
    title: 'Rescue procedures',
    icon: LifeBuoy,
    description:
      'PASMA rescue hierarchy, written rescue plan, suspension trauma and first aid at height.',
  },
  {
    id: 4,
    title: 'Physical fitness & safe working',
    icon: HeartPulse,
    description:
      'PASMA fitness requirements, 3-point contact, manual handling and adverse weather.',
  },
];

export default function PasmaModule6() {
  useSEO({
    title: 'Module 6: Safety, hazards & rescue | PASMA towers for users | Elec-Mate',
    description:
      'Common hazards, risk assessment, rescue procedures and physical fitness requirements for safe mobile tower work.',
  });

  return (
    <ModuleShell
      backTo="../pasma-course"
      backLabel="PASMA towers for users"
      moduleNumber={6}
      title="Safety, hazards & rescue"
      description="Identifying hazards, carrying out risk assessments, rescue planning and maintaining physical fitness for safe tower work."
      tone="blue"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../pasma-module-5"
      prevModuleLabel="Inspection & compliance"
      nextModuleHref="../pasma-module-7"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../pasma-module-6-section-${section.id}`}
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
