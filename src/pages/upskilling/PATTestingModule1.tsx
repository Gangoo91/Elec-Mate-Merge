import { FileText, AlertTriangle, Tag, Clock, UserCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'What is PAT testing and why it is required', icon: FileText, description: 'PAT testing fundamentals and legal requirements.' },
  { id: 2, title: 'Legal duties (EAWR, PUWER, H&S at Work Act)', icon: AlertTriangle, description: 'The legal framework and obligations.' },
  { id: 3, title: 'Types of equipment covered by PAT', icon: Tag, description: 'Classification of equipment requiring PAT testing.' },
  { id: 4, title: 'Frequency of inspection and testing', icon: Clock, description: 'Determining appropriate testing intervals.' },
  { id: 5, title: 'User checks vs formal inspection and testing', icon: UserCheck, description: 'Different levels of electrical safety checks.' },
];

export default function PATTestingModule1() {
  useSEO({
    title: 'Module 1: Introduction to PAT Testing | PAT Testing | Elec-Mate',
    description: 'PAT testing fundamentals, legal duties under EAWR/PUWER, equipment covered, inspection frequency and user checks.',
  });

  return (
    <ModuleShell
      backTo="../pat-testing-course"
      backLabel="PAT testing certification"
      moduleNumber={1}
      title="Introduction to portable appliance testing"
      description="Why PAT exists, the legal duties behind it and the types of equipment that need testing."
      tone="yellow"
      sectionsCount={sections.length}
      duration="40 mins"
      nextModuleHref="../pat-testing-module-2"
      nextModuleLabel="Class I, II and III appliances"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../pat-testing-module-1-section-${section.id}`}
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
