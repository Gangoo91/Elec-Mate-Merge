import { Zap, Gauge, TestTube, Cpu, FileCheck, Wrench } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Principles of insulation testing',
    description:
      'Insulation resistance fundamentals and why testing is essential for electrical safety.',
    icon: Gauge,
  },
  {
    id: 2,
    title: 'Test voltages and applications',
    description:
      'Selecting the correct test voltage for each circuit type and voltage rating.',
    icon: Zap,
  },
  {
    id: 3,
    title: 'Testing procedure (phase-phase, phase-earth)',
    description:
      'Step-by-step procedures for insulation resistance tests between conductors.',
    icon: TestTube,
  },
  {
    id: 4,
    title: 'Testing sensitive equipment (SERDs)',
    description:
      'Protecting surge protective devices and sensitive electronics during insulation testing.',
    icon: Cpu,
  },
  {
    id: 5,
    title: 'Interpreting results and minimum values',
    description: 'Acceptable insulation resistance values and BS 7671 minimum requirements.',
    icon: FileCheck,
  },
  {
    id: 6,
    title: 'Troubleshooting low insulation',
    description: 'Diagnosing and locating insulation faults using systematic testing techniques.',
    icon: Wrench,
  },
];

export default function InspectionTestingModule4() {
  useSEO({
    title: 'Module 4: Insulation Resistance Testing | Inspection & Testing',
    description:
      'Test voltages, phase-phase and phase-earth procedures, SERDs, interpreting results and troubleshooting low insulation.',
  });

  return (
    <ModuleShell
      backTo="../inspection-testing"
      backLabel="Inspection & testing"
      moduleNumber={4}
      title="Insulation resistance testing"
      description="Perform insulation resistance tests correctly, interpret results and troubleshoot to BS 7671."
      tone="purple"
      sectionsCount={sections.length}
      duration="55 mins"
      prevModuleHref="../inspection-testing/module-3"
      prevModuleLabel="Continuity testing"
      nextModuleHref="../inspection-testing/module-5"
      nextModuleLabel="Earth fault loop impedance"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../inspection-testing/module-4/section-${section.id}`}
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
