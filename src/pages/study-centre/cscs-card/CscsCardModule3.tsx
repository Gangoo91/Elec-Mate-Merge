import { ArrowUpFromLine, Wrench, PackageOpen, Shield } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Working at height regulations',
    icon: ArrowUpFromLine,
    description:
      'The Work at Height Regulations 2005, hierarchy of controls, duty holders, and when work at height applies.',
  },
  {
    id: 2,
    title: 'Access equipment',
    icon: Wrench,
    description:
      'Ladders, stepladders, scaffolding, mobile towers, MEWPs, podium steps, and selection criteria for each.',
  },
  {
    id: 3,
    title: 'Manual handling assessment',
    icon: PackageOpen,
    description:
      'The Manual Handling Operations Regulations 1992, TILEO factors, ergonomic risk assessment, and reducing risk.',
  },
  {
    id: 4,
    title: 'Fall protection & safe lifting',
    icon: Shield,
    description:
      'Guard rails, personal fall protection, fragile surfaces, safe lifting techniques and team handling.',
  },
];

export default function CscsCardModule3() {
  useSEO({
    title: 'Module 3: Working at Height & Manual Handling | CSCS Card Preparation | Elec-Mate',
    description:
      'Working at height regulations, access equipment, manual handling assessment and fall protection for the CSCS HS&E test.',
  });

  return (
    <ModuleShell
      backTo="../cscs-card-course"
      backLabel="CSCS card preparation"
      moduleNumber={3}
      title="Working at height & manual handling"
      description="The Work at Height Regulations, selecting appropriate access equipment, carrying out manual handling assessments, and applying fall protection and safe lifting techniques."
      tone="green"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../cscs-card-module-2"
      prevModuleLabel="General health & safety"
      nextModuleHref="../cscs-card-module-4"
      nextModuleLabel="Hazardous substances & environmental"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../cscs-card-module-3-section-${section.id}`}
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
