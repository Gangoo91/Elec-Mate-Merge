import { FileCheck, HelpCircle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Mock exam',
    icon: FileCheck,
    description: 'Complete practice examination under timed conditions covering all BS 7671 requirements.',
    to: '../bs7671-mock-exam',
  },
  {
    id: 2,
    title: 'Hints and tips',
    icon: HelpCircle,
    description: 'Essential guidance, best practices and expert tips for successful exam completion.',
    to: '../bs7671-exam-guide',
  },
];

export default function BS7671Module9() {
  useSEO({
    title: 'Module 9: Mock Exam | BS 7671 | Elec-Mate',
    description:
      'Comprehensive practice examination plus hints and tips for the BS 7671 18th Edition assessment.',
  });

  return (
    <ModuleShell
      backTo="../bs7671-course"
      backLabel="18th edition (BS 7671)"
      moduleNumber={9}
      title="Mock exam"
      description="Comprehensive practice examination to test your knowledge of BS 7671."
      tone="yellow"
      sectionsCount={sections.length}
      duration="90 mins"
      prevModuleHref="../bs7671-module-8"
      prevModuleLabel="Reference materials and Amendment 3"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={section.to}
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
