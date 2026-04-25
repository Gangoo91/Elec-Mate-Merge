import { Eye, FileSearch, Wrench, FolderOpen } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Pre-use visual checks',
    icon: Eye,
    description:
      'Daily checks before each use — component damage, missing parts, castor brakes, stabilisers, guardrails and ground conditions.',
  },
  {
    id: 2,
    title: 'Formal inspections',
    icon: FileSearch,
    description:
      '7-day statutory inspections under WAHR Schedule 7, competent person requirements and written report obligations.',
  },
  {
    id: 3,
    title: 'Common defects & component care',
    icon: Wrench,
    description:
      'Identifying bent frames, cracked welds, worn castors, cleaning, storage, transport and condemning equipment.',
  },
  {
    id: 4,
    title: 'Documentation & record keeping',
    icon: FolderOpen,
    description:
      'Tower inspection records, retention periods, PASMA TowerSure app, handover procedures and RIDDOR reporting.',
  },
];

export default function IpafModule4() {
  useSEO({
    title: 'Module 4: Inspection & Maintenance | IPAF | Elec-Mate',
    description:
      'Pre-use checks, formal inspections, common defects, component care and documentation for mobile access towers.',
  });

  return (
    <ModuleShell
      backTo="../ipaf-course"
      backLabel="IPAF mobile scaffold training"
      moduleNumber={4}
      title="Inspection & maintenance"
      description="Pre-use checks, formal inspections, common defects and documentation requirements for mobile access towers."
      tone="emerald"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../ipaf-module-3"
      prevModuleLabel="Assembly & dismantling"
      nextModuleHref="../ipaf-module-5"
      nextModuleLabel="Hazards, risk assessment & rescue"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../ipaf-module-4-section-${section.id}`}
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
