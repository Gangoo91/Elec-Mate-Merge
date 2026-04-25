import { Eye, Calendar, FileText, Smartphone } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Pre-use visual checks',
    icon: Eye,
    description:
      'Who can check, what to inspect, pass/fail criteria and reporting procedures.',
  },
  {
    id: 2,
    title: 'Formal 7-day inspections',
    icon: Calendar,
    description:
      'WAHR Schedule 5, competent person, inspection triggers and retention requirements.',
  },
  {
    id: 3,
    title: 'Records & documentation',
    icon: FileText,
    description:
      'Schedule 5 requirements, PASMA checklist, photographic evidence and digital vs paper records.',
  },
  {
    id: 4,
    title: 'TowerSure app & digital inspection',
    icon: Smartphone,
    description:
      'What TowerSure is, how it works, benefits vs paper and a setup guide.',
  },
];

export default function PasmaModule5() {
  useSEO({
    title: 'Module 5: Inspection & compliance | PASMA towers for users | Elec-Mate',
    description:
      'Pre-use visual checks, formal 7-day inspections, documentation requirements and the TowerSure digital inspection app.',
  });

  return (
    <ModuleShell
      backTo="../pasma-course"
      backLabel="PASMA towers for users"
      moduleNumber={5}
      title="Inspection & compliance"
      description="Visual checks, formal inspections, documentation requirements and digital inspection tools for tower safety."
      tone="blue"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../pasma-module-4"
      prevModuleLabel="Dismantling, moving & storage"
      nextModuleHref="../pasma-module-6"
      nextModuleLabel="Safety, hazards & rescue"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../pasma-module-5-section-${section.id}`}
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
