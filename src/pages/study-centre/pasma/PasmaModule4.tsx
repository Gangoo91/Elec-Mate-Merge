import { ArrowDownToLine, Move, PackageOpen, Search } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Dismantling procedure',
    icon: ArrowDownToLine,
    description:
      'Reverse of assembly, 3T and AGR dismantling, component lowering and common errors.',
  },
  {
    id: 2,
    title: 'Moving & repositioning',
    icon: Move,
    description:
      'Pre-move conditions, push at base, post-move verification and zero-tolerance rules.',
  },
  {
    id: 3,
    title: 'Storage & maintenance',
    icon: PackageOpen,
    description:
      'Clean before storage, indoor dry storage, component segregation and maintenance schedule.',
  },
  {
    id: 4,
    title: 'Post-use inspection',
    icon: Search,
    description:
      'Why it matters, what to check, defect reporting, tagging system and record keeping.',
  },
];

export default function PasmaModule4() {
  useSEO({
    title: 'Module 4: Dismantling, moving & storage | PASMA towers for users | Elec-Mate',
    description:
      'Safe dismantling procedures, moving and repositioning, storage and maintenance, and post-use inspection for mobile access towers.',
  });

  return (
    <ModuleShell
      backTo="../pasma-course"
      backLabel="PASMA towers for users"
      moduleNumber={4}
      title="Dismantling, moving & storage"
      description="Safe dismantling procedures, repositioning rules, correct storage practices and post-use inspection requirements."
      tone="blue"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../pasma-module-3"
      prevModuleLabel="Assembly methods"
      nextModuleHref="../pasma-module-5"
      nextModuleLabel="Inspection & compliance"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../pasma-module-4-section-${section.id}`}
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
