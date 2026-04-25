import { FileText, Clock } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Mock exams',
    icon: FileText,
    description: 'Full practice papers that simulate the real Level 2 exam conditions and timing.',
    href: 'section1',
  },
  {
    id: 2,
    title: 'How to pass exams — tips and techniques',
    icon: Clock,
    description: 'Exam strategy, time management and proven techniques to maximise your score.',
    href: 'section2',
  },
];

export default function Module8() {
  useSEO({
    title: 'Module 8: Mock Examinations and Assessment | Level 2 Electrical | Elec-Mate',
    description:
      'Practice exam papers and exam technique tips to build confidence for the Level 2 electrical installation assessment.',
  });

  return (
    <ModuleShell
      backTo=".."
      backLabel="Level 2 electrical installation"
      moduleNumber={8}
      title="Mock examinations and assessment"
      description="Practice papers and exam technique tips to build confidence for the real assessment."
      tone="emerald"
      sectionsCount={sections.length}
      prevModuleHref="../module7"
      prevModuleLabel="Electrical fault finding and diagnosis"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={section.href}
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
