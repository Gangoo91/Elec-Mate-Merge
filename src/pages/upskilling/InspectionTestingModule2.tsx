import { Shield, Lock, Tag, Zap, Power, RotateCw } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Principles of safe isolation',
    description:
      'The fundamental principles of safe isolation and why it underpins every electrical task.',
    icon: Shield,
  },
  {
    id: 2,
    title: 'Isolation equipment and PPE',
    description:
      'The essential equipment and personal protective equipment required for safe isolation.',
    icon: Lock,
  },
  {
    id: 3,
    title: 'Lock-off and tag-out procedures',
    description:
      'Lock-off and tag-out procedures that keep circuits isolated for the duration of the work.',
    icon: Tag,
  },
  {
    id: 4,
    title: 'Proving dead techniques',
    description:
      'Correct methods for proving circuits dead before any conductive work begins.',
    icon: Zap,
  },
  {
    id: 5,
    title: 'Working on isolated systems',
    description:
      'Best practice and safety considerations when working on isolated electrical systems.',
    icon: Power,
  },
  {
    id: 6,
    title: 'Re-energisation procedures',
    description:
      'Safely re-energising circuits once the work has been completed and verified.',
    icon: RotateCw,
  },
];

export default function InspectionTestingModule2() {
  useSEO({
    title: 'Module 2: Safe Isolation Procedures | Inspection & Testing',
    description:
      'Lock-off and tag-out, proving dead techniques and safe re-energisation across single- and three-phase systems.',
  });

  return (
    <ModuleShell
      backTo="../inspection-testing"
      backLabel="Inspection & testing"
      moduleNumber={2}
      title="Safe isolation procedures"
      description="Master the procedures for safely isolating electrical circuits before any work begins."
      tone="purple"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../inspection-testing/module-1"
      prevModuleLabel="Introduction to inspection & testing"
      nextModuleHref="../inspection-testing/module-3"
      nextModuleLabel="Continuity testing"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../inspection-testing/module-2/section-${section.id}`}
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
