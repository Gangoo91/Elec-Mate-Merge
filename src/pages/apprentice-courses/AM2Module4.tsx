import { ListChecks, Wrench, FileCheck, Activity, AlertTriangle, Timer } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Full test sequence and order of tests', icon: ListChecks, description: 'The correct testing sequence and methodology for the AM2.' },
  { id: 2, title: 'Safe use of test instruments (GS38 compliance)', icon: Wrench, description: 'Using test equipment safely and to GS38 requirements.' },
  { id: 3, title: 'Recording test results on certification', icon: FileCheck, description: 'Accurate completion of the test certificate paperwork.' },
  { id: 4, title: 'Functional and operational testing', icon: Activity, description: 'Proving the install works under load and in normal operation.' },
  { id: 5, title: 'Identifying and reporting non-compliances', icon: AlertTriangle, description: 'Finding installation defects and recording them properly.' },
  { id: 6, title: 'Time management during testing', icon: Timer, description: 'Efficient testing under exam time constraints.' },
];

export default function AM2Module4() {
  useSEO({
    title: 'Module 4: Inspection and Testing | AM2 | Elec-Mate',
    description: 'Test sequence, instrument use, certification, functional testing and reporting non-compliances on the AM2.',
  });

  return (
    <ModuleShell
      backTo="../am2"
      backLabel="AM2 preparation & guidance"
      moduleNumber={4}
      title="Inspection and testing"
      description="The complete test sequence, instrument use, certification and reporting non-compliances for the AM2."
      tone="yellow"
      sectionsCount={sections.length}
      duration="3h"
      prevModuleHref="../module3"
      prevModuleLabel="Installation tasks"
      nextModuleHref="../module5"
      nextModuleLabel="Fault diagnosis and rectification"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`section${section.id}`}
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
