import { ClipboardList, Tag, Table, FileCheck, FileText } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Initial visual inspection checklist',
    description:
      'A systematic approach to visual inspection before testing, covering all BS 7671 requirements.',
    icon: ClipboardList,
  },
  {
    id: 2,
    title: 'Identification and labelling',
    description:
      'Requirements for circuit identification, warning labels and equipment marking.',
    icon: Tag,
  },
  {
    id: 3,
    title: 'Schedule of test results',
    description:
      'Recording and presenting test results in the correct format for certification.',
    icon: Table,
  },
  {
    id: 4,
    title: 'Electrical installation certificates',
    description:
      'Completing EICs for new installations including design, construction and inspection details.',
    icon: FileCheck,
  },
  {
    id: 5,
    title: 'Minor works certificates and PIR',
    description: 'Documentation requirements for minor works and periodic inspection reports.',
    icon: FileText,
  },
];

export default function InspectionTestingModule8() {
  useSEO({
    title: 'Module 8: Visual Inspection & Documentation | Inspection & Testing',
    description:
      'Visual inspection procedures and certification documentation including EICs, minor works and PIRs.',
  });

  return (
    <ModuleShell
      backTo="../inspection-testing"
      backLabel="Inspection & testing"
      moduleNumber={8}
      title="Visual inspection & documentation"
      description="Systematic visual inspection and the documentation required for electrical installation certification."
      tone="purple"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../inspection-testing/module-7"
      prevModuleLabel="Polarity & functional testing"
      nextModuleHref="../inspection-testing-mock-exam"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../inspection-testing/module-8/section-${section.id}`}
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
