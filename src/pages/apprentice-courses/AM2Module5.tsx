import { Bug, Search, Settings, CheckCircle, RotateCcw, FileText } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Typical faults set in the AM2 assessment', icon: Bug, description: 'Common fault scenarios you will encounter on the day.' },
  { id: 2, title: 'Logical fault-finding process', icon: Search, description: 'A systematic, repeatable approach to fault diagnosis.' },
  { id: 3, title: 'Using test equipment efficiently', icon: Settings, description: 'Effective use of test instruments for fault finding.' },
  { id: 4, title: 'Proving and recording rectification', icon: CheckCircle, description: 'Demonstrating and documenting the fault rectification.' },
  { id: 5, title: 'Re-testing procedures', icon: RotateCcw, description: 'Post-rectification testing and verification.' },
  { id: 6, title: 'Quick-reference fault diagnosis sheet', icon: FileText, description: 'Essential reference guide for AM2 fault-finding.' },
];

export default function AM2Module5() {
  useSEO({
    title: 'Module 5: Fault Diagnosis and Rectification | AM2 | Elec-Mate',
    description: 'Systematic fault-finding, test equipment use, rectification and re-testing procedures for the AM2.',
  });

  return (
    <ModuleShell
      backTo="../am2"
      backLabel="AM2 preparation & guidance"
      moduleNumber={5}
      title="Fault diagnosis and rectification"
      description="Systematic fault-finding, test equipment use and rectification procedures — the section that decides most AM2 results."
      tone="yellow"
      sectionsCount={sections.length}
      duration="2h"
      prevModuleHref="../module4"
      prevModuleLabel="Inspection and testing"
      nextModuleHref="../module6"
      nextModuleLabel="Online knowledge test"
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
