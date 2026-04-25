import { Link2, CircleDot, Cable, Gauge, FileCheck, Zap } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Protective conductor continuity (R1+R2)',
    description:
      'Testing the combined resistance of line and circuit protective conductors.',
    icon: CircleDot,
  },
  {
    id: 2,
    title: 'Ring final circuit continuity',
    description: 'The three-step testing method for verifying ring final circuit integrity.',
    icon: Cable,
  },
  {
    id: 3,
    title: 'Main bonding conductor testing',
    description: 'Verifying continuity of main protective bonding connections.',
    icon: Link2,
  },
  {
    id: 4,
    title: 'Supplementary bonding verification',
    description: 'Testing supplementary equipotential bonding in special locations.',
    icon: Zap,
  },
  {
    id: 5,
    title: 'Low resistance measurement techniques',
    description: 'Accurate methods for measuring very low resistance values.',
    icon: Gauge,
  },
  {
    id: 6,
    title: 'Interpreting continuity results',
    description: 'Analysing continuity test results and identifying common faults.',
    icon: FileCheck,
  },
];

export default function InspectionTestingModule3() {
  useSEO({
    title: 'Module 3: Continuity Testing | Inspection & Testing',
    description:
      'R1+R2, ring final circuits, bonding conductor verification and low-resistance measurement techniques.',
  });

  return (
    <ModuleShell
      backTo="../inspection-testing"
      backLabel="Inspection & testing"
      moduleNumber={3}
      title="Continuity testing"
      description="Verify electrical continuity in protective conductors, ring circuits and bonding connections."
      tone="purple"
      sectionsCount={sections.length}
      duration="55 mins"
      prevModuleHref="../inspection-testing/module-2"
      prevModuleLabel="Safe isolation procedures"
      nextModuleHref="../inspection-testing/module-4"
      nextModuleLabel="Insulation resistance testing"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../inspection-testing/module-3/section-${section.id}`}
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
