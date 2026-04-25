import { Scale, FileText, Wrench, Shield, ClipboardList } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Purpose and legal requirements',
    description:
      'Why inspection and testing matter, duties under the Electricity at Work Regulations and your duty of care.',
    icon: Scale,
  },
  {
    id: 2,
    title: 'BS 7671 testing requirements overview',
    description:
      'How initial verification and periodic inspection are structured under BS 7671.',
    icon: FileText,
  },
  {
    id: 3,
    title: 'Test equipment and calibration',
    description:
      'Essential test instruments, their specifications and how to verify calibration and accuracy.',
    icon: Wrench,
  },
  {
    id: 4,
    title: 'Safety during testing',
    description:
      'Safe isolation, PPE, risk assessment and safe working practices throughout the test sequence.',
    icon: Shield,
  },
  {
    id: 5,
    title: 'Test sequence and documentation',
    description:
      'The correct order of tests and how to record results on installation certificates.',
    icon: ClipboardList,
  },
];

export default function InspectionTestingModule1() {
  useSEO({
    title: 'Module 1: Introduction to Inspection & Testing | Elec-Mate',
    description:
      'Foundations of inspection and testing — legal duties, BS 7671, test equipment, safety and the test sequence.',
  });

  return (
    <ModuleShell
      backTo="../inspection-testing"
      backLabel="Inspection & testing"
      moduleNumber={1}
      title="Introduction to inspection & testing"
      description="The foundational knowledge required to inspect and test electrical installations safely and to BS 7671."
      tone="purple"
      sectionsCount={sections.length}
      duration="45 mins"
      nextModuleHref="../inspection-testing/module-2"
      nextModuleLabel="Safe isolation procedures"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../inspection-testing/module-1/section-${section.id}`}
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
